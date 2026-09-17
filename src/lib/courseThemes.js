import {
  Atom,
  BookOpen,
  Braces,
  Code2,
  Database,
  Server,
} from "lucide-react";

export const difficultyStyles = {
  Beginner: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Intermediate: "bg-amber-50 text-amber-700 ring-amber-200",
  Advanced: "bg-rose-50 text-rose-700 ring-rose-200",
};

export const categoryThemes = {
  "Web Development": {
    icon: Code2,
    cover: "from-neutral-800 via-neutral-700 to-neutral-600",
    soft: "bg-neutral-100 text-neutral-700",
  },
  JavaScript: {
    icon: Braces,
    cover: "from-amber-700 via-amber-600 to-orange-500",
    soft: "bg-amber-50 text-amber-800",
  },
  React: {
    icon: Atom,
    cover: "from-sky-700 via-sky-600 to-cyan-500",
    soft: "bg-sky-50 text-sky-800",
  },
  Backend: {
    icon: Server,
    cover: "from-teal-800 via-teal-700 to-emerald-600",
    soft: "bg-teal-50 text-teal-800",
  },
  Database: {
    icon: Database,
    cover: "from-stone-700 via-stone-600 to-neutral-500",
    soft: "bg-stone-100 text-stone-700",
  },
};

export const defaultTheme = {
  icon: BookOpen,
  cover: "from-neutral-800 via-neutral-700 to-neutral-600",
  soft: "bg-neutral-100 text-neutral-700",
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
