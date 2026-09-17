"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks =
    user?.role === "admin"
      ? [...links, { href: "/admin", label: "Admin" }]
      : links;

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

  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  function isActive(href) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-neutral-900"
        >
          Brand<span className="text-neutral-400">.</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-neutral-100 text-neutral-900"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
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
                  className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800"
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
                  <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-52 rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-xl">
                    <Link
                      href="/auth"
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth?mode=signup"
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 hover:text-neutral-900"
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
                  className="inline-flex items-center gap-2.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 transition hover:bg-neutral-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="max-w-[120px] truncate text-sm font-semibold text-neutral-900">
                    {user?.name || "Account"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-neutral-400 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-52 rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-xl">
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                    {user?.role === "admin" ? (
                      <Link
                        href="/admin"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 hover:text-neutral-900"
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
                      className="flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition hover:bg-neutral-50 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive(link.href)
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="my-2 border-t border-neutral-100" />

            {!user ? (
              <>
                <Link
                  href="/auth"
                  className="rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  Login
                </Link>
                <Link
                  href="/auth?mode=signup"
                  className="rounded-xl bg-neutral-900 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Create Account
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  Dashboard
                </Link>
                {user?.role === "admin" ? (
                  <Link
                    href="/admin"
                    className="rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
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
                  className="rounded-xl px-4 py-3 text-left text-sm font-medium text-rose-600 hover:bg-rose-50"
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
