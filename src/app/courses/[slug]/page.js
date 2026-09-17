import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Clock3,
  Layers3,
  Star,
} from "lucide-react";

import EnrollBtn from "@/components/courses/details/EnrollBtn";
import InstructorCard from "@/components/courses/details/InstructorCard";
import LessonItem from "@/components/courses/details/LessonItem";
import {
  difficultyStyles,
  formatDuration,
  getCategoryTheme,
  parseDurationMinutes,
} from "@/lib/courseThemes";
import { getCourseBySlug } from "@/services/courseService";
import { getLessonsByCourse } from "@/services/lessonService";

export default async function CourseDetailsPage({ params }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-neutral-50 px-6">
        <div className="max-w-md rounded-2xl border border-neutral-200 bg-white px-8 py-12 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Course not found
          </h1>
          <p className="mt-2 text-neutral-500">
            The course you are looking for does not exist.
          </p>
          <Link
            href="/courses"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            <ArrowLeft size={16} />
            Back to courses
          </Link>
        </div>
      </main>
    );
  }

  let detailedLessons = [];
  try {
    detailedLessons = await getLessonsByCourse(slug);
  } catch {
    detailedLessons = [];
  }

  const lessons =
    detailedLessons?.length > 0
      ? detailedLessons.map((lesson) => ({
          title: lesson.title,
          duration: lesson.duration,
          href: `/learn/${slug}/${lesson.slug}`,
        }))
      : (course.lessons || []).map((lesson) => ({
          title: lesson.title,
          duration: lesson.duration,
          href: null,
        }));

  const theme = getCategoryTheme(course.category);
  const Icon = theme.icon;
  const totalMinutes = lessons.reduce(
    (sum, lesson) => sum + parseDurationMinutes(lesson.duration),
    0
  );
  const startHref = lessons.find((lesson) => lesson.href)?.href || null;

  return (
    <main className="min-h-screen w-full bg-neutral-50">
      <section className="relative overflow-hidden border-b border-neutral-200 bg-white">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${theme.cover} opacity-[0.08]`}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-8 sm:py-10">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
          >
            <ArrowLeft size={16} />
            All courses
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
            <div className="lg:col-span-2">
              <div
                className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.cover} p-8 text-white shadow-lg sm:p-10`}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute bottom-8 right-16 h-24 w-24 rounded-full bg-white/5"
                  aria-hidden="true"
                />

                <div className="relative flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    {course.category}
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium ring-1 ring-white/25 backdrop-blur-sm">
                    {course.difficulty}
                  </span>
                </div>

                <div className="relative mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-sm">
                  <Icon size={26} strokeWidth={1.75} />
                </div>

                <h1 className="relative mt-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                  {course.title}
                </h1>

                <p className="relative mt-4 max-w-2xl text-base leading-relaxed text-white/80">
                  {course.description}
                </p>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-neutral-500">
                  Ready to start?
                </p>
                <h2 className="mt-1 text-xl font-semibold text-neutral-900">
                  Enroll in this course
                </h2>

                <div className="mt-6">
                  <EnrollBtn
                    courseId={course._id.toString()}
                    startHref={startHref}
                  />
                </div>

                <div className="mt-6 space-y-3 border-t border-neutral-100 pt-6 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-neutral-500">
                      <BookOpen size={16} />
                      Lessons
                    </span>
                    <span className="font-medium text-neutral-900">
                      {lessons.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-neutral-500">
                      <Clock3 size={16} />
                      Duration
                    </span>
                    <span className="font-medium text-neutral-900">
                      {formatDuration(totalMinutes)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 text-neutral-500">
                      <Layers3 size={16} />
                      Level
                    </span>
                    <span className="font-medium text-neutral-900">
                      {course.difficulty}
                    </span>
                  </div>
                  {course.rating ? (
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-neutral-500">
                        <Star size={16} />
                        Rating
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium text-neutral-900">
                        <Star
                          size={14}
                          className="fill-amber-400 text-amber-400"
                        />
                        {course.rating}
                      </span>
                    </div>
                  ) : null}
                </div>

                {course.instructor ? (
                  <div className="mt-6 border-t border-neutral-100 pt-6">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Instructor
                    </p>
                    <InstructorCard name={course.instructor} />
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-5">
              <p className="text-sm font-medium tracking-wide text-neutral-400">
                Curriculum
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">
                What you&apos;ll learn
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                {lessons.length} lessons · {formatDuration(totalMinutes)} total
              </p>
            </div>

            {lessons.length > 0 ? (
              <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
                {lessons.map((lesson, index) => (
                  <LessonItem
                    key={`${lesson.title}-${index}`}
                    index={index}
                    title={lesson.title}
                    duration={lesson.duration}
                    href={lesson.href}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
                <p className="text-sm font-medium text-neutral-900">
                  Curriculum coming soon
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  Lessons for this course will appear here.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-5 lg:col-span-1">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-neutral-900">
                Course overview
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                {course.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${theme.soft}`}
                >
                  {course.category}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${
                    difficultyStyles[course.difficulty] ||
                    "bg-neutral-50 text-neutral-600 ring-neutral-200"
                  }`}
                >
                  {course.difficulty}
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-neutral-900 p-6 text-white shadow-sm">
              <h3 className="text-base font-semibold">Start building today</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                Enroll to unlock the full curriculum and track your progress as
                you learn.
              </p>
              {startHref ? (
                <Link
                  href={startHref}
                  className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
                >
                  Preview first lesson
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
