import { NextResponse } from "next/server";
import { isAuthenticated } from "@/middleware/authMiddleware";
import { createPaymentController } from "@/controllers/paymentController";

export async function POST(request) {
  try {
    const auth = await isAuthenticated(request);

    if (!auth.authenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { courseId } = await request.json();

    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      );
    }

    const order = await createPaymentController(auth.user.id, courseId);

    return NextResponse.json(order);
  } catch (error) {
    if (error.message === "You are already enrolled in this course") {
      return NextResponse.json({ message: error.message }, { status: 409 });
    }

    if (
      error.message === "Course not found" ||
      error.message === "This course has no price set"
    ) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    console.error("Create order error:", error);
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}