function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getJwtSecret() {
  return requireEnv("JWT_SECRET");
}

export function getMongoUri() {
  return requireEnv("MONGODB_URI");
}

export function isProduction() {
  return process.env.NODE_ENV === "production";
}

/**
 * Seed endpoints are dangerous in production (can wipe/reset data).
 * Allowed only when ALLOW_SEED=true.
 */
export function assertSeedAllowed() {
  if (!isProduction()) {
    return;
  }

  if (process.env.ALLOW_SEED !== "true") {
    const error = new Error(
      "Seed routes are disabled in production. Set ALLOW_SEED=true only for a one-time setup."
    );
    error.status = 403;
    throw error;
  }
}
