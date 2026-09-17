import { isProduction } from "@/lib/env";

export function publicErrorPayload(message, error) {
  if (isProduction()) {
    return { message };
  }

  return {
    message,
    error: error?.message || String(error),
  };
}
