"use client";

import { Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CourseSearch from "@/components/courses/CourseSearch";
import CategoryFilter from "@/components/courses/CategoryFilter";
import DifficultyFilter from "@/components/courses/DifficultyFilter";
import CourseGrid from "@/components/courses/CourseGrid";

function CoursesCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "All";
  const selectedDifficulty = searchParams.get("difficulty") || "All";

  const isAllSelected =
    selectedCategory === "All" && selectedDifficulty === "All";

  const updateParams = useCallback(
    (key, value) => {
      const params = new URLSearchParams(queryString);

      // Stay in catalog mode so last-open restore does not kick in
      params.set("view", "catalog");

      if (!value || value === "All") {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      router.replace(`/courses?${params.toString()}`);
    },
    [router, queryString]
  );

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams();
    params.set("view", "catalog");

    const search = new URLSearchParams(queryString).get("search");
    if (search) {
      params.set("search", search);
    }

    router.replace(`/courses?${params.toString()}`);
  }, [router, queryString]);

  return (
    <main className="min-h-screen w-full bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center sm:py-16">
          <p className="section-eyebrow">Course catalog</p>
          <h1 className="mt-2 page-heading">Explore Courses</h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-neutral-500">
            Practical, project-based courses to help you learn and grow at your
            own pace.
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
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={clearFilters}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isAllSelected
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-900 hover:ring-blue-200"
                }`}
              >
                All
              </button>

              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={(value) => updateParams("category", value)}
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

export default function CoursesCatalog() {
  return (
    <Suspense fallback={null}>
      <CoursesCatalogContent />
    </Suspense>
  );
}
