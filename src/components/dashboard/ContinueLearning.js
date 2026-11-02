import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CourseThumbnail from "@/components/courses/CourseThumbnail";

export default function ContinueLearning({ course }) {
  if (!course) return null;

  const canContinue = course.currentLessonSlug && course.slug;

  return (
    <section>
      <div className="mb-5">
        <p className="section-eyebrow">Pick up where you left off</p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          Continue Learning
        </h2>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/40">
        <div className="flex flex-col sm:flex-row">
          <CourseThumbnail
            title={course.title}
            category={course.category}
            size="strip"
            className="sm:w-2/5"
          />

          <div className="flex flex-1 flex-col justify-center gap-4 p-6 sm:p-8">
            <span className="w-fit rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white">
              Currently Learning
            </span>

            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                {course.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {course.description}
              </p>
            </div>

            <p className="text-sm text-slate-600">
              Current lesson:{" "}
              <span className="font-medium text-slate-900">
                {course.currentLesson}
              </span>
            </p>

            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                <span>Progress</span>
                <span>{Math.round(course.progress)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-800 transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {canContinue ? (
              <Link
                href={`/learn/${course.slug}/${course.currentLessonSlug}`}
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Continue Learning
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-0.5"
                />
              </Link>
            ) : (
              <span className="w-fit rounded-full bg-slate-100 px-6 py-3 text-sm font-medium text-slate-500">
                Course Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
