import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock3,
  ListVideo,
} from "lucide-react";

import LessonProgress from "@/components/learning/LessonProgress";
import LessonSidebar from "@/components/learning/LessonSidebar";
import { getCategoryTheme } from "@/lib/courseThemes";
import { getCourseBySlug } from "@/services/courseService";
import {
  getLessonBySlugs,
  getLessonNavigation,
  getLessonsByCourse,
} from "@/services/lessonService";

function getVideoEmbedUrl(url = "") {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    if (parsed.hostname === "youtu.be") {
      const videoId = parsed.pathname.replace("/", "");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
  } catch {
    return url;
  }

  return url;
}

function NotFoundState({ title, message, href = "/courses" }) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-neutral-50 px-6">
      <div className="max-w-md rounded-3xl border border-neutral-200 bg-white px-8 py-12 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>
        <p className="mt-2 text-neutral-500">{message}</p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          <ArrowLeft size={16} />
          Back to courses
        </Link>
      </div>
    </main>
  );
}

export default async function LearningPage({ params }) {
  const { courseSlug, lessonSlug } = await params;

  let course;
  let lesson;
  let lessons = [];
  let navigation = {
    previousLesson: null,
    nextLesson: null,
  };

  try {
    course = await getCourseBySlug(courseSlug);

    if (!course) {
      return (
        <NotFoundState
          title="Course not found"
          message="The course for this lesson does not exist."
        />
      );
    }

    [lesson, lessons, navigation] = await Promise.all([
      getLessonBySlugs(courseSlug, lessonSlug),
      getLessonsByCourse(courseSlug),
      getLessonNavigation(courseSlug, lessonSlug),
    ]);
  } catch {
    return (
      <NotFoundState
        title="Something went wrong"
        message="We could not load this lesson. Please try again."
      />
    );
  }

  if (!lesson || navigation?.notFound === "lesson") {
    return (
      <NotFoundState
        title="Lesson not found"
        message="The lesson you are looking for does not exist."
        href={`/courses/${courseSlug}`}
      />
    );
  }

  const videoSrc = getVideoEmbedUrl(lesson.videoUrl);
  const isYouTube = videoSrc.includes("youtube.com/embed/");
  const theme = getCategoryTheme(course.category);
  const Icon = theme.icon;
  const currentIndex = lessons.findIndex((item) => item.slug === lessonSlug);
  const lessonNumber = currentIndex >= 0 ? currentIndex + 1 : null;
  const plainLessons = lessons.map((item) => ({
    title: item.title,
    slug: item.slug,
    duration: item.duration,
  }));

  return (
    <main className="min-h-screen w-full bg-neutral-50">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="min-w-0">
            <Link
              href={`/courses/${courseSlug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-neutral-900"
            >
              <ArrowLeft size={16} />
              Back to course
            </Link>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-lg text-white bg-gradient-to-br ${theme.cover}`}
              >
                <Icon size={14} strokeWidth={2} />
              </span>
              <p className="truncate text-sm font-semibold text-neutral-900">
                {course.title}
              </p>
            </div>
          </div>

          {lessonNumber ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-600">
              <ListVideo size={15} />
              Lesson {lessonNumber} of {lessons.length}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8 lg:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium tracking-wide text-neutral-400">
                    Now learning
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                    {lesson.title}
                  </h1>
                </div>

                {lesson.duration != null ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-semibold text-neutral-600">
                    <Clock3 size={13} />
                    {lesson.duration} min
                  </span>
                ) : null}
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl bg-neutral-900 shadow-inner">
                <div className="aspect-video w-full">
                  {isYouTube ? (
                    <iframe
                      src={videoSrc}
                      title={lesson.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : lesson.videoUrl ? (
                    <video
                      src={lesson.videoUrl}
                      controls
                      className="h-full w-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                      Video unavailable
                    </div>
                  )}
                </div>
              </div>
            </div>

            {lesson.content ? (
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                    <BookOpen size={16} />
                  </span>
                  <h2 className="text-lg font-semibold text-neutral-900">
                    Lesson Content
                  </h2>
                </div>
                <p className="text-base leading-8 text-neutral-600">
                  {lesson.content}
                </p>
              </div>
            ) : null}

            <LessonProgress
              courseId={lesson.course.toString()}
              lessonId={lesson._id.toString()}
            />

            <div className="flex flex-col gap-3 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
              {navigation?.previousLesson?.slug ? (
                <Link
                  href={`/learn/${courseSlug}/${navigation.previousLesson.slug}`}
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
                >
                  <ArrowLeft
                    size={16}
                    className="transition group-hover:-translate-x-0.5"
                  />
                  <span className="max-w-[180px] truncate">
                    {navigation.previousLesson.title || "Previous"}
                  </span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}

              {navigation?.nextLesson?.slug ? (
                <Link
                  href={`/learn/${courseSlug}/${navigation.nextLesson.slug}`}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg"
                >
                  <span className="max-w-[180px] truncate">
                    {navigation.nextLesson.title || "Next Lesson"}
                  </span>
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-0.5"
                  />
                </Link>
              ) : (
                <Link
                  href={`/courses/${courseSlug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                >
                  Back to course
                </Link>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <LessonSidebar
                courseSlug={courseSlug}
                courseTitle={course.title}
                lessons={plainLessons}
                currentSlug={lessonSlug}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
