import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { verifyToken } from "@/lib/auth";
import connectToDb from "@/lib/db";
import User from "@/models/User.js";

import {
  getEnrolledCoursesController,
  getCompletedCoursesController,
} from "@/controllers/dashboardController";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EnrolledCourses from "@/components/dashboard/EnrolledCourses";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import CourseProgress from "@/components/dashboard/CourseProgress";
import CompletedCourses from "@/components/dashboard/CompletedCourses";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth");
  }

  let decoded;

  try {
    decoded = verifyToken(token);
  } catch {
    redirect("/auth");
  }

  await connectToDb();

  const user = await User.findById(decoded.userId)
    .select("-password")
    .lean();

  if (!user) {
    redirect("/auth");
  }

  if (user.role === "admin") {
    redirect("/admin");
  }

  const enrolledCourses = await getEnrolledCoursesController(
    decoded.userId
  );

  const completedCourses = await getCompletedCoursesController(
    decoded.userId
  );

  const activeCourses = enrolledCourses.filter(
    (course) => course.progress < 100
  );

  const continueCourse =
    activeCourses.length > 0 ? activeCourses[0] : null;

  const totalLessons = enrolledCourses.reduce(
    (total, course) => total + course.totalLessons,
    0
  );

  const completedLessons = enrolledCourses.reduce(
    (total, course) => total + course.completedLessons,
    0
  );

  const overallProgress =
    totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const stats = {
    enrolledCourses: enrolledCourses.length,
    completedCourses: completedCourses.length,
    overallProgress: Math.round(overallProgress),
  };

  const progressStats = {
    overallProgress: Math.round(overallProgress),
    lessonsCompleted: completedLessons,
    lessonsRemaining: totalLessons - completedLessons,
    coursesInProgress: activeCourses.length,
  };

  return (
    <main className="min-h-screen w-full bg-neutral-50">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <DashboardHeader studentName={user.name} stats={stats} />
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-10">
        <ContinueLearning course={continueCourse} />
        <EnrolledCourses courses={enrolledCourses} />
        <CourseProgress stats={progressStats} />
        <CompletedCourses courses={completedCourses} />
      </div>
    </main>
  );
}
