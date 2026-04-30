"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, signAdminSession, verifyAdminSession } from "@/lib/admin-session";
import {
  getAdminSessionSecret,
  getExpectedAdminPassword,
  getExpectedAdminUsername,
} from "@/lib/admin-config";

/** Returned to the login UI on bad credentials (`useActionState`). */
export type LoginFormState = { error: "invalid"; nonce: number } | null;

/** Server action for admin login (`useActionState` passes previous state first). */
export async function loginAction(
  _prev: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  let secret: string;
  try {
    secret = getAdminSessionSecret();
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Missing ADMIN_SESSION_SECRET";
    throw new Error(msg);
  }

  const okUser = username === getExpectedAdminUsername();
  const okPass = password === getExpectedAdminPassword();
  if (!okUser || !okPass) {
    return { error: "invalid", nonce: Date.now() };
  }

  const token = signAdminSession(secret);
  const jar = await cookies();
  jar.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export async function assertAdminSession() {
  const jar = await cookies();
  const token = jar.get(ADMIN_SESSION_COOKIE)?.value;
  let secret: string;
  try {
    secret = getAdminSessionSecret();
  } catch {
    redirect("/admin/login");
    return;
  }
  if (!verifyAdminSession(token, secret)) {
    redirect("/admin/login");
  }
}
