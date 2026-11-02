import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import CourseThumbnail from "@/components/courses/CourseThumbnail";

function CompletedCourseCard({ course }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10">
      <CourseThumbnail
        title={course.title}
        category={course.category}
        size="card"
        badge={
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/90 px-2.5 py-0.5 text-xs font-medium text-white ring-1 ring-white/20">
            <CheckCircle2 size={12} />
            Completed
          </span>
        }
      />

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
          {course.title}
        </h3>
        <p className="text-sm text-slate-500">{course.instructor}</p>

        <Link
          href={course.slug ? `/courses/${course.slug}` : "/courses"}
          className="mt-auto rounded-full border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}

function EmptyCompletedState() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <p className="text-sm font-medium text-slate-900">
        No completed courses yet
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Finish a course to see it here.
      </p>
    </div>
  );
}

export default function CompletedCourses({ courses = [] }) {
  return (
    <section>
      <div className="mb-5">
        <p className="section-eyebrow">Achievements</p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">
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
