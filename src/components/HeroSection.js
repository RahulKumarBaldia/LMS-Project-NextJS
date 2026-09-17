import Link from "next/link";
import { ArrowRight, BookOpen, ChartNoAxesColumn, Clock3 } from "lucide-react";

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
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(23,23,23,0.06),_transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-sky-100/50 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center sm:py-24">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-2 text-sm text-neutral-600 shadow-sm backdrop-blur">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-semibold text-white">
            B
          </span>
          <span>
            Learn. <span className="font-semibold text-neutral-900">Build.</span>{" "}
            <span className="font-semibold text-neutral-900">Grow.</span>
          </span>
        </div>

        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
          Learn Skills.
          <br />
          <span className="text-neutral-500">Build Your Future.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-500 sm:text-lg sm:leading-8">
          Master in-demand skills through practical courses designed to help you
          learn, build, and grow with confidence.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/courses"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg"
          >
            Explore Courses
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href="/auth?mode=signup"
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-900 hover:shadow-md"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {highlights.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 text-sm text-neutral-500"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
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
