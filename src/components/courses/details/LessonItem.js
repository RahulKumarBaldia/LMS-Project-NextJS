import Link from "next/link";
import { Clock3, PlayCircle } from "lucide-react";

export default function LessonItem({
  index,
  title,
  duration,
  href,
}) {
  const content = (
    <>
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-600 transition group-hover:bg-neutral-900 group-hover:text-white">
          {index + 1}
        </span>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-neutral-900">
            {title}
          </p>
          {href ? (
            <p className="mt-0.5 text-xs text-neutral-400 transition group-hover:text-neutral-500">
              Start lesson
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 text-sm text-neutral-400">
        <span className="inline-flex items-center gap-1.5">
          <Clock3 size={14} aria-hidden="true" />
          {typeof duration === "number" ? `${duration} min` : duration}
        </span>
        {href ? (
          <PlayCircle
            size={18}
            className="text-neutral-300 transition group-hover:text-neutral-900"
            aria-hidden="true"
          />
        ) : null}
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group flex items-center justify-between gap-4 border-b border-neutral-100 px-5 py-4 last:border-b-0 transition hover:bg-neutral-50"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b border-neutral-100 px-5 py-4 last:border-b-0">
      {content}
    </div>
  );
}
