import Course from "@/models/Course";
import connectToDb from "@/lib/db";

// GET ALL COURSES
export const getAllCourses = async ({
  search = "",
  category = "",
  difficulty = "",
} = {}) => {
  try {
    await connectToDb();

    const query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    const courses = await Course.find(query).sort({
      createdAt: -1,
    });

    return courses;
  } catch (error) {
    throw new Error("Failed to get courses");
  }
};

// GET COURSE BY SLUG
export const getCourseBySlug = async (slug = "") => {
  try {
    await connectToDb();

    const course = await Course.findOne({ slug });

    return course;
  } catch (error) {
    throw new Error("Failed to get course by slug");
  }
};

// CREATE COURSE
export const createCourse = async (courseData) => {
  const {
    title,
    description,
    category,
    price,
    instructor,
    thumbnail,
    difficulty,
    userId,
  } = courseData;

  try {
    await connectToDb();

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const course = await Course.create({
      title,
      slug,
      description,
      category,
      price,
      instructor,
      thumbnail,
      difficulty,
      createdBy: userId,
      rating: 0,
    });

    return course;
  } catch (error) {
    throw new Error("Failed to create course");
  }
};

// UPDATE COURSE
export const updateCourse = async (slug, courseData) => {
  try {
    await connectToDb();

    const course = await Course.findOne({ slug });

    if (!course) {
      throw new Error("Course not found");
    }

    const updatedCourse = await Course.findOneAndUpdate(
      { slug },
      courseData,
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedCourse;
  } catch (error) {
    throw new Error(error.message);
  }
};

// DELETE COURSE
export const deleteCourse = async (slug) => {
  try {
    await connectToDb();

    const course = await Course.findOne({ slug });

    if (!course) {
      throw new Error("Course not found");
    }

    await Course.findOneAndDelete({ slug });

    return {
      message: "Course deleted successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};