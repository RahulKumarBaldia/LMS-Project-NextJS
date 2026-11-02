"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import BrandLogo from "@/components/BrandLogo";

function buildNavLinks(user) {
  const coursesHref = user?.lastOpenCourseSlug
    ? `/courses/${user.lastOpenCourseSlug}`
    : "/courses";

  const items = [
    { href: "/", label: "Home" },
    { href: coursesHref, label: "Courses", match: "/courses" },
  ];

  if (user) {
    items.push({ href: "/assistant", label: "AI Advisor" });
  }
  if (user?.role === "admin") {
    items.push({ href: "/admin", label: "Admin" });
  }
  return items;
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navLinks = buildNavLinks(user);

  const [openPath, setOpenPath] = useState(null);
  const [mobileOpenPath, setMobileOpenPath] = useState(null);
  const open = openPath === pathname;
  const mobileOpen = mobileOpenPath === pathname;

  function setOpen(value) {
    setOpenPath((current) => {
      const next = typeof value === "function" ? value(current === pathname) : value;
      return next ? pathname : null;
    });
  }

  function setMobileOpen(value) {
    setMobileOpenPath((current) => {
      const next = typeof value === "function" ? value(current === pathname) : value;
      return next ? pathname : null;
    });
  }

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  function isActive(link) {
    const matchPath = link.match || link.href;
    if (matchPath === "/") return pathname === "/";
    return pathname.startsWith(matchPath);
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <BrandLogo />

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link)
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div ref={dropdownRef} className="relative hidden sm:block">
            {!user ? (
              <>
                <button
                  type="button"
                  onClick={() => setOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Get Started
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-52 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-200/50">
                    <Link
                      href="/auth"
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth?mode=signup"
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 transition hover:border-blue-200 hover:bg-blue-50/50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-xs font-semibold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="max-w-[120px] truncate text-sm font-semibold text-slate-900">
                    {user?.name || "Account"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-52 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-200/50">
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                    {user?.role === "admin" ? (
                      <Link
                        href="/admin"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                      >
                        Admin
                      </Link>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-blue-700 transition hover:bg-blue-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive(link)
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-slate-100" />

            {!user ? (
              <>
                <Link
                  href="/auth"
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  href="/auth?mode=signup"
                  className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Create Account
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Dashboard
                </Link>
                {user?.role === "admin" ? (
                  <Link
                    href="/admin"
                    className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Admin
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium text-blue-700 hover:bg-blue-50"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
