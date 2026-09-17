import { BookCheck, BookOpen, Layers3 } from "lucide-react";

export default function CourseProgress({ stats }) {
  const cards = [
    {
      label: "Lessons Completed",
      value: stats.lessonsCompleted,
      icon: BookCheck,
    },
    {
      label: "Lessons Remaining",
      value: stats.lessonsRemaining,
      icon: BookOpen,
    },
    {
      label: "Courses in Progress",
      value: stats.coursesInProgress,
      icon: Layers3,
    },
  ];

  return (
    <section>
      <div className="mb-5">
        <p className="text-sm font-medium tracking-wide text-neutral-400">
          Learning stats
        </p>
        <h2 className="mt-1 text-xl font-semibold text-neutral-900">
          Course Progress
        </h2>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-neutral-700">
              Overall Progress
            </span>
            <span className="font-semibold text-neutral-900">
              {stats.overallProgress}%
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full bg-neutral-900 transition-all"
              style={{ width: `${stats.overallProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-neutral-100 bg-neutral-50 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xl font-semibold text-neutral-900">
                  {value}
                </p>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-neutral-600 ring-1 ring-neutral-200">
                  <Icon size={16} />
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
