import { randomBytes } from "crypto";

/** Default admin login ID (override with ADMIN_USERNAME). */
export const DEFAULT_ADMIN_USERNAME = "madhusudantimalsina";

/** Default admin password (override with ADMIN_PASSWORD). */
export const DEFAULT_ADMIN_PASSWORD = "2925398627864619";

/**
 * Dev-only fallback so `/admin` works without .env.local.
 * In production you must set ADMIN_SESSION_SECRET (16+ chars).
 */
const DEV_FALLBACK_SESSION_SECRET =
  "madhusudantimalsina-portfolio-admin-session-secret-min-32-chars";

export function getExpectedAdminUsername(): string {
  const v = process.env.ADMIN_USERNAME?.trim();
  return v && v.length > 0 ? v : DEFAULT_ADMIN_USERNAME;
}

export function getExpectedAdminPassword(): string {
  const v = process.env.ADMIN_PASSWORD;
  return v != null && v !== "" ? v : DEFAULT_ADMIN_PASSWORD;
}

/**
 * Secret used to sign the admin session cookie. Must be 16+ characters.
 */
export function getAdminSessionSecret(): string {
  const fromEnv = process.env.ADMIN_SESSION_SECRET?.trim();
  if (fromEnv && fromEnv.length >= 16) return fromEnv;
  if (process.env.NODE_ENV !== "production") {
    return DEV_FALLBACK_SESSION_SECRET;
  }
  throw new Error(
    "Set ADMIN_SESSION_SECRET in the environment (at least 16 characters) before running in production.",
  );
}

/** For one-time .env file generation (seed:admin script). */
export function generateAdminSessionSecret(): string {
  return randomBytes(32).toString("hex");
}
