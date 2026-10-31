import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import connectToDb from "@/lib/db";
import Course from "@/models/Course";
import Enrollment from "@/models/Enrollment";

const MODELS = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-2.5-flash"];
const MAX_STEPS = 4;
const TIMEOUT_MS = 25000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SYSTEM_INSTRUCTION = `You are a friendly course advisor for an online learning platform.
Rules:
- Only recommend courses returned by the search_courses tool. Never invent courses, prices or details.
- Prices are in USD.
- When you need more than one tool, call them together in the same turn instead of one by one.
- If you are unsure what to search for, call search_courses with an empty query to list courses.
- Call get_my_enrollments so you do not recommend a course the student already owns.
- If no course fits the student's budget, say so and show the closest options instead of searching again and again.
- First recommend 1-3 courses and ask which one the student wants. Call show_checkout only after the student clearly says they want to buy or enroll in a specific course. You cannot charge anyone: the student pays by pressing the PayPal button.
- Write plain text only. Do not use markdown, asterisks or bullet symbols.
- Keep replies short and clear. Reply in the same language the student uses.`;

const functionDeclarations = [
  {
    name: "search_courses",
    description:
      "Searches the platform's paid courses by keywords and optional maximum price in USD. Returns up to 5 courses.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        query: {
          type: Type.STRING,
          description:
            "Keywords such as a topic, skill or category, e.g. 'backend node'. Can be empty.",
        },
        maxPrice: {
          type: Type.NUMBER,
          description: "Maximum price in USD. Optional.",
        },
      },
    },
  },
  {
    name: "get_my_enrollments",
    description: "Lists the courses the current student is already enrolled in.",
    parameters: { type: Type.OBJECT, properties: {} },
  },
  {
    name: "show_checkout",
    description:
      "Shows a checkout card for one course so the student can pay with PayPal. It does not charge anything.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        courseId: {
          type: Type.STRING,
          description: "The id of the course, taken from search_courses results.",
        },
      },
      required: ["courseId"],
    },
  },
];

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Ek model par ek call (thinking low + timeout)
async function generateOnce(ai, params, model) {
  const config = {
    ...params.config,
    abortSignal: AbortSignal.timeout(TIMEOUT_MS),
  };

  // Thinking level sirf Gemini 3 models ke liye (2.5 mein ye alag chalta hai)
  if (model.startsWith("gemini-3")) {
    config.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
  }

  return ai.models.generateContent({ ...params, model, config });
}

const isRetryable = (error) =>
  error?.name === "TimeoutError" ||
  error?.name === "AbortError" ||
  [429, 500, 503].includes(error?.status);

async function generateWithFallback(ai, params, state) {
  // Is request mein model pehle chal chuka hai toh usi par raho.
  // 503 ya timeout par 1.5 second baad ek baar dobara try karo.
  if (state.model) {
    try {
      return await generateOnce(ai, params, state.model);
    } catch (error) {
      if (!isRetryable(error) || error?.status === 429) throw error;
      await sleep(1500);
      return await generateOnce(ai, params, state.model);
    }
  }

  // Pehla call: models ki list mein se jo chale
  let lastError;
  for (const model of MODELS) {
    try {
      const response = await generateOnce(ai, params, model);
      state.model = model;
      return response;
    } catch (error) {
      lastError = error;
      if (!isRetryable(error)) throw error;
    }
  }

  throw lastError;
}

async function executeTool(name, args, userId, state) {
  if (name === "search_courses") {
    const words = String(args.query || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 5);

    const filter = { price: { $gt: 0 } };

    if (Number.isFinite(Number(args.maxPrice)) && Number(args.maxPrice) > 0) {
      filter.price.$lte = Number(args.maxPrice);
    }

    if (words.length > 0) {
      filter.$or = words.flatMap((word) => {
        const re = new RegExp(escapeRegex(word), "i");
        return [{ title: re }, { description: re }, { category: re }];
      });
    }

    const courses = await Course.find(filter)
      .sort({ rating: -1 })
      .limit(5)
      .lean();

    return courses.map((course) => ({
      courseId: course._id.toString(),
      title: course.title,
      instructor: course.instructor,
      category: course.category,
      difficulty: course.difficulty,
      rating: course.rating,
      priceUSD: course.price,
      lessons: course.lessons?.length || 0,
      description: course.description.slice(0, 200),
    }));
  }

  if (name === "get_my_enrollments") {
    const enrollments = await Enrollment.find({ user: userId })
      .populate("course", "title")
      .lean();

    return enrollments.map((item) => ({
      courseId: item.course?._id?.toString(),
      title: item.course?.title,
    }));
  }

  if (name === "show_checkout") {
    let course;
    try {
      course = await Course.findById(args.courseId).lean();
    } catch {
      return { ok: false, error: "Invalid course id" };
    }

    if (!course) return { ok: false, error: "Course not found" };
    if (!course.price || course.price <= 0) {
      return { ok: false, error: "This course has no price set" };
    }

    const alreadyEnrolled = await Enrollment.findOne({
      user: userId,
      course: course._id,
    });
    if (alreadyEnrolled) {
      return { ok: false, error: "Student is already enrolled in this course" };
    }

    state.checkout = {
      courseId: course._id.toString(),
      title: course.title,
      price: course.price,
    };
    return { ok: true, message: "Checkout card is now shown to the student." };
  }

  return { ok: false, error: "Unknown tool" };
}

export const runCourseAgent = async (userId, messages) => {
  await connectToDb();

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const contents = messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.text }],
  }));

  const state = { checkout: null, model: null };
  const activity = [];

  for (let step = 0; step < MAX_STEPS; step++) {
    const response = await generateWithFallback(
      ai,
      {
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ functionDeclarations }],
        },
      },
      state
    );

    const calls = response.functionCalls;

    if (!calls || calls.length === 0) {
      return {
        reply: response.text || "Sorry, I could not answer that.",
        checkout: state.checkout,
        activity,
      };
    }

    // Model ka poora turn history mein wapas daalo
    contents.push(response.candidates[0].content);

    // Saare tools ek saath chalao (sequential nahi)
    const responseParts = await Promise.all(
      calls.map(async (call) => {
        const args = call.args || {};
        const result = await executeTool(call.name, args, userId, state);
        activity.push({ tool: call.name, args });
        return {
          functionResponse: {
            id: call.id,
            name: call.name,
            response: { result },
          },
        };
      })
    );

    // Checkout card ban gaya toh aakhri Gemini call bachao
    if (state.checkout) {
      return {
        reply: `Here is your checkout card for "${state.checkout.title}" ($${state.checkout.price} USD). Press the PayPal button when you are ready to pay.`,
        checkout: state.checkout,
        activity,
      };
    }

    contents.push({ role: "user", parts: responseParts });
  }

  return {
    reply:
      "I need a bit more detail to help. Could you tell me what you want to learn?",
    checkout: state.checkout,
    activity,
  };
};