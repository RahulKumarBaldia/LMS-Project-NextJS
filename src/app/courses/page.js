"use client";

import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CourseSearch from "@/components/courses/CourseSearch";
import CategoryFilter from "@/components/courses/CategoryFilter";
import DifficultyFilter from "@/components/courses/DifficultyFilter";
import CourseGrid from "@/components/courses/CourseGrid";

function CoursesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "All";
  const selectedDifficulty =
    searchParams.get("difficulty") || "All";

  const isAllSelected =
    selectedCategory === "All" && selectedDifficulty === "All";

  const updateParams = useCallback(
    (key, value) => {
      const params = new URLSearchParams(queryString);

      if (!value || value === "All") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      const nextQuery = params.toString();
      router.replace(nextQuery ? `/courses?${nextQuery}` : "/courses");
    },
    [router, queryString]
  );

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams(queryString);
    params.delete("category");
    params.delete("difficulty");

    const nextQuery = params.toString();
    router.replace(nextQuery ? `/courses?${nextQuery}` : "/courses");
  }, [router, queryString]);

  return (
    <main className="min-h-screen w-full bg-neutral-50">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center sm:py-16">
          <p className="text-sm font-medium tracking-wide text-neutral-400">
            Course catalog
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Explore Courses
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-neutral-500">
            Practical, project-based courses to help you learn and grow at
            your own pace.
          </p>

          <div className="mt-8">
            <CourseSearch
              value={searchTerm}
              onSearch={(value) => updateParams("search", value)}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={clearFilters}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isAllSelected
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "bg-white text-neutral-600 ring-1 ring-neutral-200 hover:text-neutral-900 hover:ring-neutral-400"
                }`}
              >
                All
              </button>

              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={(value) =>
                  updateParams("category", value)
                }
              />
            </div>

            <div className="border-t border-neutral-100 pt-4">
              <DifficultyFilter
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={(value) =>
                  updateParams("difficulty", value)
                }
              />
            </div>
          </div>
        </div>

        <CourseGrid
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
        />
      </div>
    </main>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={null}>
      <CoursesPageContent />
    </Suspense>
  );
}
