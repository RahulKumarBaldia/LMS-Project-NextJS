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
          <p className="section-eyebrow">Your learning hub</p>
          <h1 className="mt-1 page-heading">Welcome back, {studentName}</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
            Continue your learning journey on Skillwern and keep making progress.
          </p>
        </div>

        <LogoutButton />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summary.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-2xl font-semibold text-slate-900">{value}</p>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Icon size={18} />
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
