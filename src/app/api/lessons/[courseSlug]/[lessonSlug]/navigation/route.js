import { NextResponse } from "next/server";
import { getLessonNavigationController } from "@/controllers/lessonController";

export async function GET(request, { params }) {
  try {
    const { courseSlug, lessonSlug } = await params;

    const navigation = await getLessonNavigationController(
      courseSlug,
      lessonSlug
    );

    if (navigation.notFound === "course") {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    if (navigation.notFound === "lesson") {
      return NextResponse.json(
        { message: "Lesson not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Lesson navigation fetched successfully",
        previousLesson: navigation.previousLesson,
        nextLesson: navigation.nextLesson,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get lesson navigation error:", error);

    return NextResponse.json(
      {
        message: "Failed to get lesson navigation",
      },
      { status: 500 }
    );
  }
}