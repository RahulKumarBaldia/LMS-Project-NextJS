import {
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonsByCourse,
  getLessonBySlugs,
  getLessonNavigation,
} from "@/services/lessonService";
import { publicErrorPayload } from "@/lib/apiError";

export const createLessonController = async (request, courseSlug) => {
  try {
    const data = await request.json();

    const lesson = await createLesson(courseSlug, data);

    return Response.json(
      {
        message: "Lesson created successfully",
        lesson,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      publicErrorPayload("Failed to create lesson", error),
      { status: 500 }
    );
  }
};

export const getLessonsController = async (courseSlug) => {
  try {
    const lessons = await getLessonsByCourse(courseSlug);

    return Response.json(lessons, { status: 200 });
  } catch (error) {
    return Response.json(
      publicErrorPayload("Failed to get lessons", error),
      { status: 500 }
    );
  }
};

export const getLessonBySlugsController = async (courseSlug, lessonSlug) => {
  try {
    const lesson = await getLessonBySlugs(courseSlug, lessonSlug);

    if (!lesson) {
      return Response.json(
        { message: "Lesson not found" },
        { status: 404 }
      );
    }

    return Response.json(lesson, { status: 200 });
  } catch (error) {
    return Response.json(
      publicErrorPayload("Failed to get lesson", error),
      { status: 500 }
    );
  }
};

export const getLessonNavigationController = async (
  courseSlug,
  lessonSlug
) => {
  return await getLessonNavigation(courseSlug, lessonSlug);
};

export const updateLessonController = async (
  request,
  courseSlug,
  lessonSlug
) => {
  try {
    const data = await request.json();

    const lesson = await updateLesson(courseSlug, lessonSlug, data);

    return Response.json(
      {
        message: "Lesson updated successfully",
        lesson,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      publicErrorPayload("Failed to update lesson", error),
      { status: 500 }
    );
  }
};

export const deleteLessonController = async (courseSlug, lessonSlug) => {
  try {
    const result = await deleteLesson(courseSlug, lessonSlug);

    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json(
      publicErrorPayload("Failed to delete lesson", error),
      { status: 500 }
    );
  }
};
