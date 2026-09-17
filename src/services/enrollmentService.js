import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course";
import connectToDb from "@/lib/db";

export const createEnrollment = async (userId, courseId) => {
    await connectToDb();
    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error("Course not found");
    }
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
        throw new Error("Enrollment already exists");
    }
  
    const newEnrollment = await Enrollment.create({ user: userId, course: courseId });
    return newEnrollment;
}
