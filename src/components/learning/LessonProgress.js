"use client";

import Link from "next/link";
import { CheckCircle2, LoaderCircle, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LessonProgress({ courseId, lessonId }) {
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      setProgress(0);
      setCompleted(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchProgress = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/progress?course=${courseId}`,
          {
            credentials: "include",
            signal: controller.signal,
          }
        );

        if (response.status === 401) {
          setProgress(0);
          setCompleted(false);
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          return;
        }

        setProgress(data.progressPercentage || 0);

        const isLessonCompleted = (data.completedLessons || []).some(
          (id) => id.toString() === lessonId.toString()
        );

        setCompleted(isLessonCompleted);
      } catch (error) {
        if (error.name === "AbortError") return;
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProgress();

    return () => controller.abort();
  }, [authLoading, isAuthenticated, courseId, lessonId]);

  const handleMarkComplete = async () => {
    if (!isAuthenticated) return;

    try {
      setMarking(true);

      const response = await fetch("/api/progress", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course: courseId,
          completedLessons: [{ _id: lessonId }],
        }),
      });

      if (response.status === 401) {
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        return;
      }

      setCompleted(true);

      const progressResponse = await fetch(
        `/api/progress?course=${courseId}`,
        { credentials: "include" }
      );

      if (!progressResponse.ok) {
        setProgress((prev) => prev);
        return;
      }

      const progressData = await progressResponse.json();
      setProgress(progressData.progressPercentage || 0);
    } catch {
      // Keep UI stable if progress save fails
    } finally {
      setMarking(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="h-4 w-32 animate-pulse rounded bg-neutral-200" />
        <div className="mt-4 h-2 animate-pulse rounded-full bg-neutral-100" />
        <div className="mt-5 h-11 w-40 animate-pulse rounded-full bg-neutral-100" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-neutral-900">
            Course Progress
          </span>
          <span className="text-sm font-semibold text-neutral-400">—</span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-neutral-100">
          <div className="h-full w-0 rounded-full bg-neutral-900" />
        </div>

        <p className="mt-4 text-sm text-neutral-500">
          Sign in to save your progress and mark lessons as complete.
        </p>

        <Link
          href="/auth"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg"
        >
          <Lock size={15} />
          Login to Track Progress
        </Link>
      </div>
    );
  }

  const roundedProgress = Math.round(progress);

  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-neutral-900">
          Course Progress
        </span>
        <span className="text-sm font-semibold text-neutral-500">
          {roundedProgress}%
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full bg-neutral-900 transition-all duration-500"
          style={{ width: `${roundedProgress}%` }}
        />
      </div>

      <button
        type="button"
        onClick={handleMarkComplete}
        disabled={completed || marking}
        className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed ${
          completed
            ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
            : "bg-neutral-900 text-white hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg disabled:hover:translate-y-0 disabled:hover:shadow-none"
        }`}
      >
        {completed ? (
          <>
            <CheckCircle2 size={16} />
            Lesson Completed
          </>
        ) : marking ? (
          <>
            <LoaderCircle size={16} className="animate-spin" />
            Saving...
          </>
        ) : (
          "Mark as Complete"
        )}
      </button>
    </div>
  );
}
