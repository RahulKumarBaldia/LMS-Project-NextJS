import Link from "next/link";
import { Play } from "lucide-react";

export default function LessonSidebar({
  courseSlug,
  lessons,
  currentSlug,
  courseTitle,
}) {
  return (
    <aside className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-100 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Curriculum
        </p>
        <h2 className="mt-1 line-clamp-2 text-sm font-semibold text-neutral-900">
          {courseTitle}
        </h2>
        <p className="mt-1 text-xs text-neutral-500">
          {lessons.length} lessons
        </p>
      </div>

      <nav className="max-h-[28rem] overflow-y-auto p-2 lg:max-h-[calc(100vh-12rem)]">
        {lessons.map((item, index) => {
          const active = item.slug === currentSlug;

          return (
            <Link
              key={item.slug}
              href={`/learn/${courseSlug}/${item.slug}`}
              className={`group mb-1 flex items-start gap-3 rounded-2xl px-3 py-3 transition ${
                active
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                  active
                    ? "bg-white/15 text-white"
                    : "bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200"
                }`}
              >
                {active ? <Play size={11} fill="currentColor" /> : index + 1}
              </span>

              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm font-medium ${
                    active ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {item.title}
                </p>
                <p
                  className={`mt-0.5 text-xs ${
                    active ? "text-white/65" : "text-neutral-400"
                  }`}
                >
                  {item.duration} min
                </p>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
