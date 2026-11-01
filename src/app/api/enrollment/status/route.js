import { NextResponse } from "next/server";
import { isAuthenticated } from "@/middleware/authMiddleware";
import connectToDb from "@/lib/db";
import Enrollment from "@/models/Enrollment";

export async function GET(request) {
  try {
    const auth = await isAuthenticated(request);

    if (!auth.authenticated) {
      return NextResponse.json({ enrolled: false });
    }

    const courseId = new URL(request.url).searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      );
    }

    await connectToDb();

    const enrollment = await Enrollment.findOne({
      user: auth.user.id,
      course: courseId,
    })
      .select("_id")
      .lean();

    return NextResponse.json({ enrolled: Boolean(enrollment) });
  } catch (error) {
    console.error("Enrollment status error:", error);
    return NextResponse.json(
      { message: "Failed to check enrollment" },
      { status: 500 }
    );
  }
}