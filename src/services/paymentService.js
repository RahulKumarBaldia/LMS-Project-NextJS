import Payment from "@/models/Payment";
import Course from "@/models/Course";
import Enrollment from "@/models/Enrollment";
import connectToDb from "@/lib/db";
import { createOrder, captureOrder } from "@/services/paypal.service";
import { createEnrollment } from "@/services/enrollmentService";

export const createCoursePayment = async (userId, courseId) => {
  await connectToDb();

  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }
  if (!course.price || course.price <= 0) {
    throw new Error("This course has no price set");
  }

  const alreadyEnrolled = await Enrollment.findOne({ user: userId, course: courseId });
  if (alreadyEnrolled) {
    throw new Error("You are already enrolled in this course");
  }

  // Price DB se aati hai, frontend se nahi
  const order = await createOrder(course.price);

  await Payment.create({
    user: userId,
    course: courseId,
    paypalOrderId: order.id,
    amount: course.price,
  });

  return order;
};

export const captureCoursePayment = async (userId, orderId) => {
  await connectToDb();

  const payment = await Payment.findOne({ paypalOrderId: orderId, user: userId });
  if (!payment) {
    throw new Error("Payment not found");
  }

  // Dobara capture na ho
  if (payment.status === "completed") {
    return { status: "COMPLETED", payment };
  }

  const result = await captureOrder(orderId);

  if (result.status !== "COMPLETED") {
    payment.status = "failed";
    await payment.save();
    throw new Error("Payment was not completed");
  }

  payment.status = "completed";
  await payment.save();

  try {
    await createEnrollment(userId, payment.course);
  } catch (error) {
    if (error.message !== "Enrollment already exists") {
      throw error;
    }
  }

  return { status: "COMPLETED", payment };
};