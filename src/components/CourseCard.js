import Link from "next/link";
import { ArrowUpRight, BookOpen, Star } from "lucide-react";
import CourseThumbnail from "@/components/courses/CourseThumbnail";
import { difficultyStyles } from "@/lib/courseThemes";

export default function CourseCard({
  title,
  description,
  difficulty,
  category,
  slug,
  href,
  instructor,
  rating,
  lessons,
}) {
  const courseHref = href || (slug ? `/courses/${slug}` : "/courses");
  const lessonCount = Array.isArray(lessons) ? lessons.length : null;

  return (
    <Link
      href={courseHref}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10"
    >
      <CourseThumbnail title={title} category={category} size="card" />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
            {title}
          </h3>

          {difficulty ? (
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${
                difficultyStyles[difficulty] ||
                "bg-slate-50 text-slate-600 ring-slate-200"
              }`}
            >
              {difficulty}
            </span>
          ) : null}
        </div>

        {description ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-3">
            {instructor ? <span>{instructor}</span> : null}
            {rating ? (
              <span className="inline-flex items-center gap-1">
                <Star
                  size={12}
                  className="fill-blue-400 text-blue-400"
                  aria-hidden="true"
                />
                {rating}
              </span>
            ) : null}
            {lessonCount ? (
              <span className="inline-flex items-center gap-1">
                <BookOpen size={12} aria-hidden="true" />
                {lessonCount} lessons
              </span>
            ) : null}
          </div>

          <ArrowUpRight
            size={16}
            className="text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
