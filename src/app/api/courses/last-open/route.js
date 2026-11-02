import { NextResponse } from "next/server";
import { isAuthenticated } from "@/middleware/authMiddleware";
import {
  clearLastOpenCourseController,
  getLastOpenCourseController,
  setLastOpenCourseController,
} from "@/controllers/lastOpenCourseController";

export async function GET(request) {
  try {
    const auth = await isAuthenticated(request);

    if (!auth.authenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const course = await getLastOpenCourseController(auth.user.id);
    return NextResponse.json({ course });
  } catch (error) {
    console.error("Last open course GET error:", error);
    return NextResponse.json(
      { message: "Failed to load last open course" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const auth = await isAuthenticated(request);

    if (!auth.authenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const slug = typeof body?.slug === "string" ? body.slug.trim() : "";

    if (!slug) {
      return NextResponse.json(
        { message: "Course slug is required" },
        { status: 400 }
      );
    }

    const result = await setLastOpenCourseController(auth.user.id, slug);
    return NextResponse.json({ message: "Saved", course: result });
  } catch (error) {
    if (error.message === "Course not found") {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    console.error("Last open course PUT error:", error);
    return NextResponse.json(
      { message: "Failed to save last open course" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const auth = await isAuthenticated(request);

    if (!auth.authenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await clearLastOpenCourseController(auth.user.id);
    return NextResponse.json({ message: "Cleared" });
  } catch (error) {
    console.error("Last open course DELETE error:", error);
    return NextResponse.json(
      { message: "Failed to clear last open course" },
      { status: 500 }
    );
  }
}
