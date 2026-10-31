import { createCoursePayment, captureCoursePayment } from "@/services/paymentService";

export const createPaymentController = async (userId, courseId) => {
  return await createCoursePayment(userId, courseId);
};

export const capturePaymentController = async (userId, orderId) => {
  return await captureCoursePayment(userId, orderId);
};