/**
 * Safe post-login redirect. Only allows same-origin relative paths.
 */
export function getSafeNextPath(next, fallback = "/dashboard") {
  if (typeof next !== "string" || !next.startsWith("/") || next.startsWith("//")) {
    return fallback;
  }
  return next;
}

export function resolveAuthRedirect(user, next) {
  if (user?.role === "admin") {
    return "/admin";
  }
  return getSafeNextPath(next, "/dashboard");
}
