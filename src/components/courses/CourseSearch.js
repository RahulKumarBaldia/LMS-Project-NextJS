"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function CourseSearch({ value, onSearch }) {
  const [term, setTerm] = useState(value);

  useEffect(() => {
    setTerm(value);
  }, [value]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (term !== value) {
        onSearch(term);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [term, value, onSearch]);

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <Search
        size={18}
        strokeWidth={1.75}
        className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"
        aria-hidden="true"
      />

      <input
        type="search"
        placeholder="Search courses..."
        className="w-full rounded-2xl border border-neutral-200 bg-white py-3.5 pl-12 pr-5 text-sm text-neutral-900 shadow-sm outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 placeholder:text-neutral-400"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </div>
  );
}
