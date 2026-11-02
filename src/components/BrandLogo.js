import Link from "next/link";

/**
 * @param {{ href?: string; className?: string; variant?: "default" | "inverse"; asLink?: boolean }} props
 */
export default function BrandLogo({
  href = "/",
  className = "",
  variant = "default",
  asLink = true,
}) {
  const isInverse = variant === "inverse";

  const content = (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold shadow-sm ${
          isInverse
            ? "bg-white text-blue-700"
            : "bg-gradient-to-br from-blue-600 to-blue-800 text-white"
        }`}
        aria-hidden="true"
      >
        S
      </span>
      <span
        className={`text-xl font-semibold tracking-tight ${
          isInverse ? "text-white" : "text-slate-900"
        }`}
      >
        Skill
        <span className={isInverse ? "text-blue-300" : "text-blue-600"}>
          wern
        </span>
      </span>
    </span>
  );

  if (!asLink) {
    return content;
  }

  return (
    <Link href={href} className="transition-opacity hover:opacity-90">
      {content}
    </Link>
  );
}
