import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryTheme } from "@/lib/courseThemes";

export default function ContinueLearning({ course }) {
  if (!course) return null;

  const canContinue = course.currentLessonSlug && course.slug;
  const theme = getCategoryTheme(course.category);
  const Icon = theme.icon;

  return (
    <section>
      <div className="mb-5">
        <p className="text-sm font-medium tracking-wide text-neutral-400">
          Pick up where you left off
        </p>
        <h2 className="mt-1 text-xl font-semibold text-neutral-900">
          Continue Learning
        </h2>
      </div>

      <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row">
          <div
            className={`relative flex min-h-44 items-end bg-gradient-to-br p-6 sm:w-2/5 sm:min-h-full ${theme.cover}`}
          >
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10"
              aria-hidden="true"
            />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20">
              <Icon size={22} strokeWidth={1.75} />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-4 p-6 sm:p-8">
            <span className="w-fit rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white">
              Currently Learning
            </span>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900">
                {course.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {course.description}
              </p>
            </div>

            <p className="text-sm text-neutral-600">
              Current lesson:{" "}
              <span className="font-medium text-neutral-900">
                {course.currentLesson}
              </span>
            </p>

            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs text-neutral-500">
                <span>Progress</span>
                <span>{Math.round(course.progress)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-neutral-900 transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {canContinue ? (
              <Link
                href={`/learn/${course.slug}/${course.currentLessonSlug}`}
                className="group inline-flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg"
              >
                Continue Learning
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-0.5"
                />
              </Link>
            ) : (
              <span className="w-fit rounded-full bg-neutral-100 px-6 py-3 text-sm font-medium text-neutral-500">
                Course Completed
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
