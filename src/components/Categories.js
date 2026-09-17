import Link from "next/link";
import { ArrowRight, Code2, Braces, Atom, Server } from "lucide-react";

const categories = [
  {
    icon: Code2,
    title: "Web Development",
    description: "HTML, CSS, and the fundamentals of building for the web.",
    href: "/courses?category=Web%20Development",
    accent: "bg-neutral-900",
  },
  {
    icon: Braces,
    title: "JavaScript",
    description: "Core language concepts, DOM, ES6+, and modern JS patterns.",
    href: "/courses?category=JavaScript",
    accent: "bg-amber-600",
  },
  {
    icon: Atom,
    title: "React",
    description: "Components, hooks, state management, and real-world apps.",
    href: "/courses?category=React",
    accent: "bg-sky-600",
  },
  {
    icon: Server,
    title: "Backend",
    description: "APIs, databases, authentication, and server-side logic.",
    href: "/courses?category=Backend",
    accent: "bg-teal-700",
  },
];

export default function Categories() {
  return (
    <section className="w-full border-t border-neutral-200 bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium tracking-wide text-neutral-400">
              Browse by topic
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              Explore Categories
            </h2>
            <p className="mt-3 max-w-lg text-base text-neutral-500">
              Pick a path and start building real skills today.
            </p>
          </div>

          <Link
            href="/courses"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 transition hover:gap-2.5"
          >
            View all courses
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ icon: Icon, title, description, href, accent }) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:bg-white hover:shadow-lg"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-105 ${accent}`}
              >
                <Icon size={20} strokeWidth={1.75} />
              </div>

              <div>
                <h3 className="text-base font-semibold text-neutral-900">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                  {description}
                </p>
              </div>

              <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-neutral-800 transition-all duration-300 group-hover:gap-2">
                Browse
                <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
