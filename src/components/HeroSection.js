import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChartNoAxesColumn,
  Clock3,
  Sparkles,
} from "lucide-react";
import HeroAdvisorLink from "@/components/HeroAdvisorLink";

const highlights = [
  {
    icon: Clock3,
    label: "Learn at your own pace",
  },
  {
    icon: BookOpen,
    label: "Practical lessons",
  },
  {
    icon: ChartNoAxesColumn,
    label: "Track your progress",
  },
  {
    icon: Sparkles,
    label: "AI course advisor",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(79,70,229,0.08),_transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center sm:py-24">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-[11px] font-bold text-white">
            S
          </span>
          <span>
            Learn. <span className="font-semibold text-slate-900">Build.</span>{" "}
            <span className="font-semibold text-blue-700">Grow.</span>
          </span>
        </div>

        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
          Master skills on{" "}
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Skillwern
          </span>
          .
          <br />
          <span className="text-slate-500">Build your future.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
          Master in-demand skills through practical courses designed to help you
          learn, build, and grow with confidence.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <Link href="/courses?view=catalog" className="btn-primary group">
            Explore Courses
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>

          <HeroAdvisorLink />

          <Link href="/auth?mode=signup" className="btn-secondary">
            Create Account
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {highlights.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 text-sm text-slate-500"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <Icon size={14} strokeWidth={1.75} />
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
