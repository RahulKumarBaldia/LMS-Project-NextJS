import Link from "next/link";
import {
  Atom,
  Braces,
  Code2,
  Database,
  Server,
  ArrowUpRight,
  BookOpen,
  Star,
} from "lucide-react";

const difficultyStyles = {
  Beginner: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Intermediate: "bg-amber-50 text-amber-700 ring-amber-200",
  Advanced: "bg-rose-50 text-rose-700 ring-rose-200",
};

const categoryThemes = {
  "Web Development": {
    icon: Code2,
    cover: "from-neutral-800 via-neutral-700 to-neutral-600",
  },
  JavaScript: {
    icon: Braces,
    cover: "from-amber-700 via-amber-600 to-orange-500",
  },
  React: {
    icon: Atom,
    cover: "from-sky-700 via-sky-600 to-cyan-500",
  },
  Backend: {
    icon: Server,
    cover: "from-teal-800 via-teal-700 to-emerald-600",
  },
  Database: {
    icon: Database,
    cover: "from-stone-700 via-stone-600 to-neutral-500",
  },
};

const defaultTheme = {
  icon: BookOpen,
  cover: "from-neutral-800 via-neutral-700 to-neutral-600",
};

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
  const theme = categoryThemes[category] || defaultTheme;
  const Icon = theme.icon;
  const lessonCount = Array.isArray(lessons) ? lessons.length : null;

  return (
    <Link
      href={courseHref}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg"
    >
      <div
        className={`relative flex aspect-[16/10] items-end overflow-hidden bg-gradient-to-br ${theme.cover} p-5`}
      >
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-10 top-8 h-16 w-16 rounded-full bg-white/5"
          aria-hidden="true"
        />

        <div className="relative flex w-full items-end justify-between gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/20">
            <Icon size={20} strokeWidth={1.75} />
          </div>

          {category ? (
            <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {category}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-neutral-700">
            {title}
          </h3>

          {difficulty ? (
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${
                difficultyStyles[difficulty] ||
                "bg-neutral-50 text-neutral-600 ring-neutral-200"
              }`}
            >
              {difficulty}
            </span>
          ) : null}
        </div>

        {description ? (
          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
            {description}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-4 text-xs text-neutral-500">
          <div className="flex items-center gap-3">
            {instructor ? <span>{instructor}</span> : null}
            {rating ? (
              <span className="inline-flex items-center gap-1">
                <Star
                  size={12}
                  className="fill-amber-400 text-amber-400"
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
            className="text-neutral-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-700"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
