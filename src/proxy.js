import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const PROTECTED_PREFIXES = ["/assistant"];

function isProtectedPath(pathname) {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function redirectToAuth(request, pathname) {
  const loginUrl = new URL("/auth", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return redirectToAuth(request, pathname);
  }

  try {
    verifyToken(token);
  } catch {
    return redirectToAuth(request, pathname);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/assistant", "/assistant/:path*"],
};
