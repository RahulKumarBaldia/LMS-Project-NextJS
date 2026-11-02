import connectToDb from "@/lib/db";
import Course from "@/models/Course";
import User from "@/models/User";

export async function setLastOpenCourse(userId, slug) {
  await connectToDb();

  const course = await Course.findOne({ slug }).select("slug").lean();
  if (!course) {
    throw new Error("Course not found");
  }

  await User.findByIdAndUpdate(userId, {
    lastOpenCourseSlug: course.slug,
  });

  return { slug: course.slug };
}

export async function clearLastOpenCourse(userId) {
  await connectToDb();

  await User.findByIdAndUpdate(userId, {
    lastOpenCourseSlug: null,
  });

  return { cleared: true };
}

export async function getLastOpenCourse(userId) {
  await connectToDb();

  const user = await User.findById(userId).select("lastOpenCourseSlug").lean();
  const slug = user?.lastOpenCourseSlug;

  if (!slug) {
    return null;
  }

  const course = await Course.findOne({ slug })
    .select("title slug category difficulty")
    .lean();

  // Course was deleted — clear stale pointer
  if (!course) {
    await User.findByIdAndUpdate(userId, { lastOpenCourseSlug: null });
    return null;
  }

  return {
    slug: course.slug,
    title: course.title,
    category: course.category,
    difficulty: course.difficulty,
  };
}
