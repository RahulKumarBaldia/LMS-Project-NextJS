import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "@/lib/auth";
import connectToDb from "@/lib/db";
import User from "@/models/User";
import Course from "@/models/Course";
import CoursesCatalog from "@/components/courses/CoursesCatalog";

export const dynamic = "force-dynamic";

async function getLastOpenSlug() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;

    const decoded = verifyToken(token);
    await connectToDb();

    const user = await User.findById(decoded.userId)
      .select("lastOpenCourseSlug")
      .lean();

    const slug = user?.lastOpenCourseSlug;
    if (!slug) return null;

    const course = await Course.findOne({ slug }).select("slug").lean();
    if (!course) {
      await User.findByIdAndUpdate(decoded.userId, {
        lastOpenCourseSlug: null,
      });
      return null;
    }

    return course.slug;
  } catch {
    return null;
  }
}

export default async function CoursesPage({ searchParams }) {
  const params = await searchParams;
  const wantsCatalog =
    params?.view === "catalog" ||
    Boolean(params?.search) ||
    Boolean(params?.category) ||
    Boolean(params?.difficulty);

  if (!wantsCatalog) {
    const lastSlug = await getLastOpenSlug();
    if (lastSlug) {
      redirect(`/courses/${lastSlug}`);
    }
  }

  return <CoursesCatalog />;
}
