import { getEnrolledCourses, getCompletedCourses } from "@/services/dashboardService";

export const getEnrolledCoursesController = async (userId) => {
  const enrolledCourses = await getEnrolledCourses(userId);

  return enrolledCourses;
};

export const getCompletedCoursesController = async (userId) => {
  const completedCourses = await getCompletedCourses(userId);
  
  return completedCourses;
}