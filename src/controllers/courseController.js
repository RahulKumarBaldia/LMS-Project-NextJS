import {
  getAllCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/services/courseService";
import { publicErrorPayload } from "@/lib/apiError";

// GET ALL
export const getAllCoursesController = async (filters = {}) => {
  try {
    const courses = await getAllCourses(filters);

    return Response.json(courses, {
      status: 200,
    });
  } catch (error) {
    return Response.json(publicErrorPayload("Failed to get courses", error), {
      status: 500,
    });
  }
};

// GET ONE
export const getCourseBySlugController = async (slug) => {
  try {
    const course = await getCourseBySlug(slug);

    if (!course) {
      return Response.json(
        {
          message: "Course not found",
        },
        { status: 404 }
      );
    }

    return Response.json(course, {
      status: 200,
    });
  } catch (error) {
    return Response.json(publicErrorPayload("Failed to get course", error), {
      status: 500,
    });
  }
};

// CREATE
export const createCourseController = async (request, user) => {
  try {
    const data = await request.json();

    const course = await createCourse({
      ...data,
      userId: user.id,
    });

    return Response.json(
      {
        message: "Course created successfully",
        course,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      publicErrorPayload("Failed to create course", error),
      { status: 500 }
    );
  }
};

// UPDATE
export const updateCourseController = async (request, slug) => {
  try {
    const data = await request.json();

    const course = await updateCourse(slug, data);

    return Response.json(
      {
        message: "Course updated successfully",
        course,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      publicErrorPayload("Failed to update course", error),
      { status: 500 }
    );
  }
};

// DELETE
export const deleteCourseController = async (slug) => {
  try {
    const result = await deleteCourse(slug);

    return Response.json(result, {
      status: 200,
    });
  } catch (error) {
    return Response.json(
      publicErrorPayload("Failed to delete course", error),
      { status: 500 }
    );
  }
};
