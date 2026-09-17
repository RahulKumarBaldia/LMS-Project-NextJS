export default function InstructorCard({ name, role = "Instructor" }) {
  const initial = name?.charAt(0)?.toUpperCase() || "I";

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
        {initial}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-neutral-900">
          {name}
        </p>
        <p className="text-sm text-neutral-500">{role}</p>
      </div>
    </div>
  );
}
