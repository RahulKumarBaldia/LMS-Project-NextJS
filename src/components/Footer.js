import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-blue-900 bg-blue-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <BrandLogo variant="inverse" />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Practical, project-based courses on Skillwern to help you learn,
              build, and grow your skills with confidence.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-300/80">
              Quick Links
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Skillwern. All rights reserved.
          </p>
          <Link
            href="/auth"
            className="text-xs font-medium text-blue-300 transition hover:text-white"
          >
            Sign in to continue learning →
          </Link>
        </div>
      </div>
    </footer>
  );
}
