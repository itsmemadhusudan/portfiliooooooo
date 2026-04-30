import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";

export function signAdminSession(secret: string): string {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ exp, v: 1 })).toString("base64url");
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyAdminSession(token: string | undefined, secret: string | undefined): boolean {
  if (!token || !secret || secret.length < 16) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  try {
    if (sig.length !== expected.length) return false;
    if (!timingSafeEqual(Buffer.from(sig, "utf8"), Buffer.from(expected, "utf8"))) return false;
  } catch {
    return false;
  }
  try {
    const body = JSON.parse(Buffer.from(payload, "base64url").toString()) as { exp?: number };
    if (typeof body.exp !== "number" || body.exp < Date.now()) return false;
  } catch {
    return false;
  }
  return true;
}
