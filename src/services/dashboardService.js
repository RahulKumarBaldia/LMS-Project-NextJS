import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course";
import Lesson from "@/models/Lesson";
import Progress from "@/models/Progress";
import connectToDb from "@/lib/db";

export const getEnrolledCourses = async (userId) => {
  try {
    await connectToDb();

    const enrollments = await Enrollment.find({
      user: userId,
    })
      .populate({
        path: "course",
        model: Course,
      })
      .sort({ createdAt: -1 });

    const courses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = enrollment.course;

        if (!course) {
          return null;
        }

        const lessons = await Lesson.find({
          course: course._id,
        }).sort({ order: 1 });

        const progress = await Progress.findOne({
          user: userId,
          course: course._id,
        });

        const completedLessonIds =
          progress?.completedLessons?.map((id) =>
            id.toString()
          ) || [];

        const totalLessons = lessons.length;

        const completedLessons = completedLessonIds.length;

        const progressPercentage =
          totalLessons > 0
            ? (completedLessons / totalLessons) * 100
            : 0;

        const nextLesson = lessons.find(
          (lesson) =>
            !completedLessonIds.includes(
              lesson._id.toString()
            )
        );

        return {
          id: course._id.toString(),
          thumbnail: course.thumbnail,
          title: course.title,
          description: course.description,
          instructor: course.instructor,
          difficulty: course.difficulty,
          category: course.category,
          rating: course.rating,
          slug: course.slug,

          progress: progressPercentage,

          currentLesson: nextLesson
            ? nextLesson.title
            : "Course Completed",

          currentLessonSlug: nextLesson
            ? nextLesson.slug
            : null,

          totalLessons,
          completedLessons,

          status:
            progressPercentage === 100
              ? "completed"
              : "active",
        };
      })
    );

    return courses.filter(Boolean);
  } catch (error) {
    console.error(
      "Error getting enrolled courses:",
      error
    );

    throw new Error(
      "Failed to get enrolled courses"
    );
  }
};

export const getCompletedCourses = async (userId) => {
  try {
    await connectToDb();

    const enrollments = await Enrollment.find({
      status: "completed",
      user: userId,
    })
      .populate({
        path: "course",
        model: Course,
      })
      .sort({ createdAt: -1 });

    const courses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = enrollment.course;

        if (!course) {
          return null;
        }

        const progress = await Progress.findOne({
          user: userId,
          course: course._id,
        });

        const lessons = await Lesson.countDocuments({
          course: course._id,
        });

        const completedLessons =
          progress?.completedLessons?.length || 0;

        const progressPercentage =
          lessons > 0
            ? (completedLessons / lessons) * 100
            : 0;

        return {
          id: course._id.toString(),
          thumbnail: course.thumbnail,
          title: course.title,
          description: course.description,
          instructor: course.instructor,
          difficulty: course.difficulty,
          category: course.category,
          rating: course.rating,
          slug: course.slug,
          progress: progressPercentage,
          status: "completed",
        };
      })
    );

    return courses.filter(Boolean);
  } catch (error) {
    console.error(
      "Error getting completed courses:",
      error
    );

    throw new Error(
      "Failed to get completed courses"
    );
  }
};