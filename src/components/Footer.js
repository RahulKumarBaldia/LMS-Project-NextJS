import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              Brand<span className="text-neutral-500">.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Practical, project-based courses to help you learn, build, and grow
              your skills with confidence.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Quick Links
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-300 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-neutral-800 pt-6 sm:flex-row">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Brand. All rights reserved.
          </p>
          <Link
            href="/auth"
            className="text-xs font-medium text-neutral-400 transition hover:text-white"
          >
            Sign in to continue learning →
          </Link>
        </div>
      </div>
    </footer>
  );
}
