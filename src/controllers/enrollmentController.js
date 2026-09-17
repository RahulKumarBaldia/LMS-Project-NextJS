import { createEnrollment } from "@/services/enrollmentService";


export const enrollUserController = async (userId, courseId) => {
    return await createEnrollment(userId, courseId);
}