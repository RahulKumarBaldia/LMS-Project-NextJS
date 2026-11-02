"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

/**
 * Explicit "back to catalog" action — clears last-open course so Courses
 * no longer restores the previous detail page.
 */
export default function AllCoursesLink({ className = "" }) {
  const router = useRouter();
  const { isAuthenticated, refreshUser } = useAuth();
  const [pending, setPending] = useState(false);

  async function handleClick(event) {
    event.preventDefault();
    if (pending) return;

    setPending(true);

    try {
      if (isAuthenticated) {
        await fetch("/api/courses/last-open", {
          method: "DELETE",
          credentials: "include",
        });
        await refreshUser();
      }
    } catch {
      // Still send them to the catalog
    } finally {
      router.push("/courses?view=catalog");
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className={
        className ||
        "inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700 disabled:opacity-60"
      }
    >
      <ArrowLeft size={16} />
      All courses
    </button>
  );
}
