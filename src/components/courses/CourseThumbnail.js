import { getCategoryTheme } from "@/lib/courseThemes";

/**
 * Uniform course thumbnail: category gradient, grid texture, prominent title.
 *
 * @param {{
 *   title: string;
 *   category?: string;
 *   size?: "card" | "hero" | "strip";
 *   badge?: React.ReactNode;
 *   className?: string;
 * }} props
 */
export default function CourseThumbnail({
  title,
  category,
  size = "card",
  badge = null,
  className = "",
}) {
  const theme = getCategoryTheme(category);
  const Icon = theme.icon;

  const sizeClasses = {
    card: "aspect-[16/10] p-5 sm:p-6",
    hero: "min-h-[220px] p-8 sm:min-h-[260px] sm:p-10",
    strip: "min-h-44 p-6 sm:min-h-full sm:p-8",
  };

  const titleClasses = {
    card: "text-lg font-bold leading-snug tracking-tight sm:text-xl",
    hero: "text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl",
    strip: "text-xl font-bold leading-snug tracking-tight sm:text-2xl",
  };

  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden bg-gradient-to-br ${theme.cover} ${sizeClasses[size]} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-[1px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-6 right-10 h-20 w-20 rounded-full bg-white/5"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {category ? (
            <span className="rounded-full bg-black/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/95 backdrop-blur-sm ring-1 ring-white/15">
              {category}
            </span>
          ) : null}
          {badge}
        </div>
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/90 ring-1 ring-white/20 backdrop-blur-sm sm:h-11 sm:w-11"
          aria-hidden="true"
        >
          <Icon size={20} strokeWidth={1.75} />
        </div>
      </div>

      <h3
        className={`relative mt-auto max-w-[95%] text-white drop-shadow-sm ${titleClasses[size]}`}
      >
        {title}
      </h3>
    </div>
  );
}
