import Link from "next/link";
import { Search } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-20 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
        <Search size={18} />
      </div>
      <h3 className="text-base font-semibold text-neutral-900">
        No courses found
      </h3>
      <p className="max-w-sm text-sm text-neutral-500">
        Try adjusting your search or selecting a different category.
      </p>
      <Link
        href="/courses"
        className="mt-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
      >
        Clear filters
      </Link>
    </div>
  );
}
