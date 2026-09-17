import { getEnrolledCoursesController, getCompletedCoursesController } from "@/controllers/dashboardController";
import { isAuthenticated } from "@/middleware/authMiddleware";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const auth = await isAuthenticated(request);

    if (!auth.authenticated) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const enrolledCourses = await getEnrolledCoursesController(auth.user.id);
    const completedCourses = await getCompletedCoursesController(auth.user.id);
    return NextResponse.json(
      {
        message: "Dashboard data fetched successfully",
        enrolledCourses,
        completedCourses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get enrolled or completed courses error:", error);

    return NextResponse.json(
      {
        message: "Failed to get enrolled or completed courses",
      },
      { status: 500 }
    );
  }
}