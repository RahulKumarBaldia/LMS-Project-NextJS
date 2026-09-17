import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getCategoryTheme } from "@/lib/courseThemes";

function CompletedCourseCard({ course }) {
  const theme = getCategoryTheme(course.category);
  const Icon = theme.icon;

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`relative flex aspect-[16/10] items-end bg-gradient-to-br p-5 ${theme.cover}`}
      >
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
          <CheckCircle2 size={12} />
          Completed
        </span>
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
          <Icon size={18} strokeWidth={1.75} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-base font-semibold text-neutral-900">
          {course.title}
        </h3>
        <p className="text-sm text-neutral-500">{course.instructor}</p>

        <Link
          href={course.slug ? `/courses/${course.slug}` : "/courses"}
          className="mt-auto rounded-full border border-neutral-200 px-4 py-2.5 text-center text-sm font-semibold text-neutral-800 transition hover:border-neutral-900 hover:bg-neutral-50"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}

function EmptyCompletedState() {
  return (
    <div className="rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center">
      <p className="text-sm font-medium text-neutral-900">
        No completed courses yet
      </p>
      <p className="mt-1 text-sm text-neutral-500">
        Finish a course to see it here.
      </p>
    </div>
  );
}

export default function CompletedCourses({ courses = [] }) {
  return (
    <section>
      <div className="mb-5">
        <p className="text-sm font-medium tracking-wide text-neutral-400">
          Achievements
        </p>
        <h2 className="mt-1 text-xl font-semibold text-neutral-900">
          Completed Courses
        </h2>
      </div>

      {courses.length === 0 ? (
        <EmptyCompletedState />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CompletedCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
