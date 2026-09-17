import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  difficultyStyles,
  getCategoryTheme,
} from "@/lib/courseThemes";

function EnrolledCourseCard({ course }) {
  const theme = getCategoryTheme(course.category);
  const Icon = theme.icon;
  const progress = Math.round(course.progress || 0);

  const continueHref =
    course.slug && course.currentLessonSlug
      ? `/learn/${course.slug}/${course.currentLessonSlug}`
      : course.slug
        ? `/courses/${course.slug}`
        : "/courses";

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`relative flex aspect-[16/10] items-end bg-gradient-to-br p-5 ${theme.cover}`}
      >
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10"
          aria-hidden="true"
        />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
          <Icon size={18} strokeWidth={1.75} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-neutral-900">
            {course.title}
          </h3>
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${
              difficultyStyles[course.difficulty] ||
              "bg-neutral-50 text-neutral-600 ring-neutral-200"
            }`}
          >
            {course.difficulty}
          </span>
        </div>

        <p className="text-sm text-neutral-500">{course.instructor}</p>

        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs text-neutral-500">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full bg-neutral-900"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link
          href={continueHref}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Continue Learning
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function EmptyEnrolledState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
        ?
      </div>
      <p className="text-sm font-medium text-neutral-900">
        You haven&apos;t enrolled in any courses yet.
      </p>
      <p className="max-w-sm text-sm text-neutral-500">
        Explore the catalog and start building new skills today.
      </p>
      <Link
        href="/courses"
        className="mt-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
      >
        Explore Courses
      </Link>
    </div>
  );
}

export default function EnrolledCourses({ courses = [] }) {
  return (
    <section>
      <div className="mb-5">
        <p className="text-sm font-medium tracking-wide text-neutral-400">
          Your courses
        </p>
        <h2 className="mt-1 text-xl font-semibold text-neutral-900">
          My Enrolled Courses
        </h2>
      </div>

      {courses.length === 0 ? (
        <EmptyEnrolledState />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <EnrolledCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
