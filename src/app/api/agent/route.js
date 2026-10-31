import { NextResponse } from "next/server";
import { isAuthenticated } from "@/middleware/authMiddleware";
import {
  agentChatController,
  getHistoryController,
  clearHistoryController,
} from "@/controllers/agentController";

export async function GET(request) {
  try {
    const auth = await isAuthenticated(request);

    if (!auth.authenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const history = await getHistoryController(auth.user.id);
    return NextResponse.json(history);
  } catch (error) {
    console.error("Agent history error:", error);
    return NextResponse.json(
      { message: "Failed to load chat" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const auth = await isAuthenticated(request);

    if (!auth.authenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { text } = await request.json();
    const message = typeof text === "string" ? text.trim().slice(0, 1000) : "";

    if (!message) {
      return NextResponse.json(
        { message: "Message is required" },
        { status: 400 }
      );
    }

    const result = await agentChatController(auth.user.id, message);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Agent error:", error);

    if (error?.status === 429 || error?.status === 503) {
      return NextResponse.json(
        { message: "The AI is busy right now. Please try again in a minute." },
        { status: 429 }
      );
    }

    return NextResponse.json({ message: "Agent failed" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const auth = await isAuthenticated(request);

    if (!auth.authenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await clearHistoryController(auth.user.id);
    return NextResponse.json({ message: "Chat cleared" });
  } catch (error) {
    console.error("Agent clear error:", error);
    return NextResponse.json(
      { message: "Failed to clear chat" },
      { status: 500 }
    );
  }
}