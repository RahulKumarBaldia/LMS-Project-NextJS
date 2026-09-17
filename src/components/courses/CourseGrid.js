"use client";

import { useEffect, useState } from "react";
import EmptyState from "@/components/courses/EmptyState";
import CourseCard from "@/components/CourseCard";

export default function CourseGrid({
  searchTerm = "",
  selectedCategory = "All",
  selectedDifficulty = "All",
}) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        if (searchTerm) {
          params.set("search", searchTerm);
        }

        if (selectedCategory && selectedCategory !== "All") {
          params.set("category", selectedCategory);
        }

        if (selectedDifficulty && selectedDifficulty !== "All") {
          params.set("difficulty", selectedDifficulty);
        }

        const query = params.toString();
        const response = await fetch(
          query ? `/api/courses?${query}` : "/api/courses",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        setError(err.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => controller.abort();
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-neutral-200 bg-white"
          >
            <div className="aspect-[16/10] animate-pulse bg-neutral-200" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200" />
              <div className="h-3 w-full animate-pulse rounded bg-neutral-100" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <>
      {courses.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course._id} {...course} />
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState />
        </div>
      )}
    </>
  );
}
