import { createEnrollment } from "@/services/enrollmentService";
import Course from "@/models/Course";
import connectToDb from "@/lib/db";

export const PAID_COURSE_MESSAGE =
  "This course is paid. Please purchase it with PayPal.";

export const enrollUserController = async (userId, courseId) => {
  await connectToDb();

  // Paid course ko free mein enroll nahi karne denge
  const course = await Course.findById(courseId).select("price").lean();
  if (course && course.price > 0) {
    throw new Error(PAID_COURSE_MESSAGE);
  }

  return await createEnrollment(userId, courseId);
};