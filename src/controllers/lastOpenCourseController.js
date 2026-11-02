import {
  clearLastOpenCourse,
  getLastOpenCourse,
  setLastOpenCourse,
} from "@/services/lastOpenCourseService";

export async function setLastOpenCourseController(userId, slug) {
  return setLastOpenCourse(userId, slug);
}

export async function clearLastOpenCourseController(userId) {
  return clearLastOpenCourse(userId);
}

export async function getLastOpenCourseController(userId) {
  return getLastOpenCourse(userId);
}
