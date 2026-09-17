import { isProduction } from "@/lib/env";

const WEEK_SECONDS = 60 * 60 * 24 * 7;

export function getAuthCookieOptions(overrides = {}) {
  return {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    path: "/",
    ...overrides,
  };
}

export function getAuthTokenCookieOptions() {
  return getAuthCookieOptions({
    maxAge: WEEK_SECONDS,
  });
}

export function getClearedAuthCookieOptions() {
  return getAuthCookieOptions({
    expires: new Date(0),
    maxAge: 0,
  });
}
