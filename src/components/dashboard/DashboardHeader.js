import {
  BookOpen,
  CheckCircle2,
  ChartNoAxesColumn,
} from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";

export default function DashboardHeader({ studentName, stats }) {
  const summary = [
    {
      label: "Enrolled Courses",
      value: stats.enrolledCourses,
      icon: BookOpen,
    },
    {
      label: "Courses Completed",
      value: stats.completedCourses,
      icon: CheckCircle2,
    },
    {
      label: "Overall Progress",
      value: `${stats.overallProgress}%`,
      icon: ChartNoAxesColumn,
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-neutral-400">
            Your learning hub
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Welcome back, {studentName}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-neutral-500 sm:text-base">
            Continue your learning journey and keep making progress.
          </p>
        </div>

        <LogoutButton />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summary.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-2xl font-semibold text-neutral-900">
                {value}
              </p>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-700">
                <Icon size={18} />
              </span>
            </div>
            <p className="mt-2 text-sm text-neutral-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
