import {
  Atom,
  BookOpen,
  Braces,
  Code2,
  Database,
  Server,
} from "lucide-react";

export const difficultyStyles = {
  Beginner: "bg-blue-50 text-blue-700 ring-blue-200",
  Intermediate: "bg-blue-100 text-blue-800 ring-blue-300",
  Advanced: "bg-blue-200 text-blue-900 ring-blue-400",
};

export const categoryThemes = {
  "Web Development": {
    icon: Code2,
    cover: "from-slate-800 via-indigo-900 to-violet-800",
    soft: "bg-blue-50 text-blue-900 ring-1 ring-blue-100",
  },
  JavaScript: {
    icon: Braces,
    cover: "from-amber-800 via-amber-600 to-orange-500",
    soft: "bg-blue-50 text-blue-900 ring-1 ring-blue-100",
  },
  React: {
    icon: Atom,
    cover: "from-sky-800 via-blue-600 to-cyan-500",
    soft: "bg-blue-50 text-blue-900 ring-1 ring-blue-100",
  },
  Backend: {
    icon: Server,
    cover: "from-emerald-900 via-teal-700 to-cyan-600",
    soft: "bg-blue-50 text-blue-900 ring-1 ring-blue-100",
  },
  Database: {
    icon: Database,
    cover: "from-violet-900 via-purple-700 to-fuchsia-600",
    soft: "bg-blue-50 text-blue-900 ring-1 ring-blue-100",
  },
};

export const defaultTheme = {
  icon: BookOpen,
  cover: "from-indigo-900 via-indigo-700 to-violet-600",
  soft: "bg-blue-50 text-blue-900 ring-1 ring-blue-100",
};

export function getCategoryTheme(category) {
  return categoryThemes[category] || defaultTheme;
}

export function parseDurationMinutes(duration) {
  if (typeof duration === "number") return duration;
  const match = String(duration ?? "").match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

export function formatDuration(totalMinutes) {
  if (!totalMinutes) return "—";
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}
