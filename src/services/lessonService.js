import Lesson from "@/models/Lesson";
import Course from "@/models/Course";
import connectToDb from "@/lib/db";

export const createLesson = async (courseSlug, lessonData) => {
  try {
    await connectToDb();

    const course = await Course.findOne({ slug: courseSlug });

    if (!course) {
      throw new Error("Course not found");
    }

    const lesson = await Lesson.create({
      ...lessonData,
      course: course._id,
    });

    return lesson;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateLesson = async (
  courseSlug,
  lessonSlug,
  lessonData
) => {
  try {
    await connectToDb();

    const course = await Course.findOne({ slug: courseSlug });

    if (!course) {
      throw new Error("Course not found");
    }

    const lesson = await Lesson.findOneAndUpdate(
      {
        course: course._id,
        slug: lessonSlug,
      },
      lessonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!lesson) {
      throw new Error("Lesson not found");
    }

    return lesson;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteLesson = async (courseSlug, lessonSlug) => {
  try {
    await connectToDb();

    const course = await Course.findOne({ slug: courseSlug });

    if (!course) {
      throw new Error("Course not found");
    }

    const lesson = await Lesson.findOneAndDelete({
      course: course._id,
      slug: lessonSlug,
    });

    if (!lesson) {
      throw new Error("Lesson not found");
    }

    return {
      message: "Lesson deleted successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLessonsByCourse = async (courseSlug) => {
  try {
    await connectToDb();

    const course = await Course.findOne({ slug: courseSlug });

    if (!course) {
      throw new Error("Course not found");
    }

    return await Lesson.find({ course: course._id }).sort({ order: 1 });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getLessonBySlugs = async (courseSlug, lessonSlug) => {
  await connectToDb();

  const course = await Course.findOne({ slug: courseSlug });

  if (!course) {
    return null;
  }

  const lesson = await Lesson.findOne({
    course: course._id,
    slug: lessonSlug,
  });

  return lesson;
};

export const getLessonNavigation = async (courseSlug, lessonSlug) => {
  await connectToDb();

  const course = await Course.findOne({ slug: courseSlug });

  if (!course) {
    return { notFound: "course" };
  }

  const lessons = await Lesson.find({ course: course._id }).sort({
    order: 1,
  });

  const index = lessons.findIndex((lesson) => lesson.slug === lessonSlug);

  if (index === -1) {
    return { notFound: "lesson" };
  }

  const previous = lessons[index - 1] || null;
  const next = lessons[index + 1] || null;

  return {
    previousLesson: previous
      ? { slug: previous.slug, title: previous.title }
      : null,
    nextLesson: next ? { slug: next.slug, title: next.title } : null,
  };
};