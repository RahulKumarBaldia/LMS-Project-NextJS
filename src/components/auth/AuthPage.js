"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, ChartNoAxesColumn, Clock3 } from "lucide-react";
import AuthToggle from "./AuthToggle";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const highlights = [
  { icon: Clock3, label: "Learn at your own pace" },
  { icon: BookOpen, label: "Practical project lessons" },
  { icon: ChartNoAxesColumn, label: "Track your progress" },
];

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode =
    searchParams.get("mode") === "signup" ? "signup" : "login";

  function setMode(nextMode) {
    const href =
      nextMode === "signup" ? "/auth?mode=signup" : "/auth";
    router.replace(href);
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-neutral-50">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(23,23,23,0.05),_transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-sky-100/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-2 lg:gap-16">
        <div className="hidden lg:block">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-neutral-900"
          >
            Brand<span className="text-neutral-400">.</span>
          </Link>

          <h1 className="mt-10 max-w-md text-4xl font-semibold leading-tight tracking-tight text-neutral-900">
            {mode === "login"
              ? "Welcome back to your learning journey."
              : "Create an account and start building skills."}
          </h1>

          <p className="mt-4 max-w-md text-base leading-7 text-neutral-500">
            Practical, project-based courses designed to help you learn, build,
            and grow with confidence.
          </p>

          <div className="mt-10 space-y-4">
            {highlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 text-sm text-neutral-600"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-800 shadow-sm ring-1 ring-neutral-200">
                  <Icon size={15} />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-8 text-center lg:text-left">
              <Link
                href="/"
                className="text-lg font-semibold tracking-tight text-neutral-900 lg:hidden"
              >
                Brand<span className="text-neutral-400">.</span>
              </Link>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 lg:mt-0">
                {mode === "login" ? "Log in" : "Create account"}
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                {mode === "login"
                  ? "Welcome back — log in to continue learning."
                  : "Create an account and start learning today."}
              </p>
            </div>

            <AuthToggle mode={mode} setMode={setMode} />
            {mode === "login" ? <LoginForm /> : <SignupForm />}

            <p className="mt-8 text-center text-sm text-neutral-500">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="font-semibold text-neutral-900 hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="font-semibold text-neutral-900 hover:underline"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
