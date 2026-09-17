"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function EnrollBtn({ courseId, startHref }) {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (authLoading) return;

    if (!isAuthenticated) {
      router.push("/auth");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/enrollment", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Enrollment failed");
      }

      setEnrolled(true);

      if (startHref) {
        router.push(startHref);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (enrolled) {
    return (
      <div className="space-y-3">
        <div className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
          <CheckCircle2 size={16} />
          Enrolled
        </div>
        {startHref ? (
          <button
            type="button"
            onClick={() => router.push(startHref)}
            className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Continue Learning
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={loading || authLoading}
      onClick={handleEnroll}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
    >
      {loading ? (
        <>
          <LoaderCircle size={16} className="animate-spin" />
          Enrolling...
        </>
      ) : !isAuthenticated && !authLoading ? (
        "Login to Enroll"
      ) : (
        "Enroll Now"
      )}
    </button>
  );
}
