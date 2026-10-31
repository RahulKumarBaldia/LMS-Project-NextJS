import { NextResponse } from "next/server";
import { isAuthenticated } from "@/middleware/authMiddleware";
import { capturePaymentController } from "@/controllers/paymentController";

export async function POST(request) {
  try {
    const auth = await isAuthenticated(request);

    if (!auth.authenticated) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { message: "Order ID is required" },
        { status: 400 }
      );
    }

    const result = await capturePaymentController(auth.user.id, orderId);

    return NextResponse.json({ status: result.status });
  } catch (error) {
    if (error.message === "Payment not found") {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }

    if (error.message === "Payment was not completed") {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    console.error("Capture order error:", error);
    return NextResponse.json(
      { message: "Failed to capture payment" },
      { status: 500 }
    );
  }
}