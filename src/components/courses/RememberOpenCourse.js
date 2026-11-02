"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";

/**
 * Persists the current course detail page as the user's last-open course.
 */
export default function RememberOpenCourse({ slug }) {
  const { isAuthenticated, loading, refreshUser } = useAuth();
  const savedFor = useRef(null);

  useEffect(() => {
    if (loading || !isAuthenticated || !slug) return;
    if (savedFor.current === slug) return;

    savedFor.current = slug;

    fetch("/api/courses/last-open", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((res) => {
        if (res.ok) {
          return refreshUser();
        }
        savedFor.current = null;
      })
      .catch(() => {
        savedFor.current = null;
      });
  }, [slug, isAuthenticated, loading, refreshUser]);

  return null;
}
