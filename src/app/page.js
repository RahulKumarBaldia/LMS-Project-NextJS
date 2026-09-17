import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CourseCard from "@/components/CourseCard";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";

const featuredCourses = [
  {
    title: "React JS for Beginners",
    description:
      "Learn the fundamentals of React — components, props, state, and hooks — by building real projects.",
    difficulty: "Beginner",
    category: "React",
    instructor: "Rohan Mehta",
    rating: 4.9,
    href: "/courses/reactjs",
  },
  {
    title: "Node.js & Express Crash Course",
    description:
      "Build REST APIs from scratch using Node.js, Express, and MongoDB with a practical, hands-on approach.",
    difficulty: "Intermediate",
    category: "Backend",
    instructor: "Sanya Kapoor",
    rating: 4.6,
    href: "/courses/node-js-express",
  },
  {
    title: "System Design Basics",
    description:
      "Understand scalability, load balancing, caching, and database design through real-world examples.",
    difficulty: "Advanced",
    category: "Backend",
    instructor: "Sanya Kapoor",
    rating: 4.8,
    href: "/courses/system-design-basics",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="w-full bg-neutral-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium tracking-wide text-neutral-400">
                Start here
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                Featured Courses
              </h2>
              <p className="mt-3 max-w-lg text-base text-neutral-500">
                Hand-picked courses to help you build real skills, fast.
              </p>
            </div>

            <Link
              href="/courses"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 transition hover:gap-2.5"
            >
              Browse all
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.href} {...course} />
            ))}
          </div>
        </div>
      </section>

      <Categories />
      <Footer />
    </>
  );
}
