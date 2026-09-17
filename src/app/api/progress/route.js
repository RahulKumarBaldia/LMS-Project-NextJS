import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  recordProgressController,
  getProgressController,
} from "@/controllers/progressController";
import { verifyToken } from "@/lib/auth";
import connectToDb from "@/lib/db";
import User from "@/models/User";
import { publicErrorPayload } from "@/lib/apiError";

async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = verifyToken(token);
    await connectToDb();
    return await User.findById(decoded.userId).select("-password");
  } catch {
    return null;
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { course, completedLessons } = body;

    if (!course || !completedLessons) {
      return NextResponse.json(
        {
          message: "Course and completedLessons are required",
        },
        { status: 400 }
      );
    }

    return await recordProgressController(
      user._id,
      course,
      completedLessons
    );
  } catch (error) {
    return NextResponse.json(
      publicErrorPayload("Failed to record progress", error),
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const course = searchParams.get("course");

    if (!course) {
      return NextResponse.json(
        { message: "Course is required" },
        { status: 400 }
      );
    }

    return await getProgressController(user._id, course);
  } catch (error) {
    return NextResponse.json(
      publicErrorPayload("Failed to get progress", error),
      { status: 500 }
    );
  }
}
