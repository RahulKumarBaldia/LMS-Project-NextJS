"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import PayPalCheckout from "@/components/PayPalCheckout";

export default function EnrollBtn({ courseId, startHref, price = 0 }) {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [enrolled, setEnrolled] = useState(false);
  const [checkedCourseId, setCheckedCourseId] = useState(null);
  const [loading, setLoading] = useState(false);

  const isPaid = Number(price) > 0;

  // Login hai aur is course ka status abhi check nahi hua toh "checking" hai
  const checking =
    authLoading || (isAuthenticated && checkedCourseId !== courseId);

  // Pehle se enrolled hai ya nahi
  useEffect(() => {
    if (authLoading || !isAuthenticated) return;

    let cancelled = false;

    async function checkEnrollment() {
      try {
        const res = await fetch(
          `/api/enrollment/status?courseId=${courseId}`,
          { credentials: "include" }
        );
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setEnrolled(Boolean(data.enrolled));
        }
      } catch {
        // check fail ho toh bhi button dikhne do
      } finally {
        if (!cancelled) setCheckedCourseId(courseId);
      }
    }

    checkEnrollment();

    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthenticated, courseId]);

  // Free course ke liye seedha enroll
  const handleFreeEnroll = async () => {
    if (!isAuthenticated) {
      router.push("/auth");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/enrollment", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setEnrolled(true);
        return;
      }

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

  if (checking) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white opacity-60"
      >
        <LoaderCircle size={16} className="animate-spin" />
        Loading...
      </button>
    );
  }

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

  // Paid course: PayPal se kharidna padega
  if (isPaid) {
    if (!isAuthenticated) {
      return (
        <button
          type="button"
          onClick={() => router.push("/auth")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg"
        >
          Login to Buy
        </button>
      );
    }

    return (
      <div className="space-y-3">
        <PayPalCheckout
          key={courseId}
          courseId={courseId}
          onSuccess={() => setEnrolled(true)}
        />
        <p className="text-center text-xs text-neutral-500">
          Pay securely with PayPal. Test mode, no real money.
        </p>
      </div>
    );
  }

  // Free course
  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleFreeEnroll}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
    >
      {loading ? (
        <>
          <LoaderCircle size={16} className="animate-spin" />
          Enrolling...
        </>
      ) : !isAuthenticated ? (
        "Login to Enroll"
      ) : (
        "Enroll Now"
      )}
    </button>
  );
}