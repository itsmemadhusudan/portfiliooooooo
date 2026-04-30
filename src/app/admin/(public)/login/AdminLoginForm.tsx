"use client";

import {
  loginAction,
  type LoginFormState,
} from "@/app/admin/auth-actions";
import { DEFAULT_ADMIN_USERNAME } from "@/lib/admin-config";
import { useActionState, useEffect, useLayoutEffect, useMemo, useState } from "react";

const LOCK_MS = 10_000;

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, null as LoginFormState);
  const [lockEndsAt, setLockEndsAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useLayoutEffect(() => {
    if (state?.error === "invalid" && typeof state.nonce === "number") {
      setLockEndsAt(Date.now() + LOCK_MS);
    }
  }, [state?.nonce]);

  useEffect(() => {
    if (lockEndsAt == null || Date.now() >= lockEndsAt) return;
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, [lockEndsAt]);

  const locked = lockEndsAt != null && now < lockEndsAt;
  const secondsLeft = useMemo(() => {
    if (lockEndsAt == null || !locked) return 0;
    return Math.max(1, Math.ceil((lockEndsAt - now) / 1000));
  }, [lockEndsAt, locked, now]);

  useEffect(() => {
    if (lockEndsAt != null && now >= lockEndsAt) {
      setLockEndsAt(null);
    }
  }, [lockEndsAt, now]);

  const showModal = Boolean(state?.error === "invalid" && lockEndsAt != null && locked);

  return (
    <>
      {showModal ? (
        <div className="adminLoginModalOverlay" role="presentation">
          <div
            className="adminLoginModalDialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="login-fail-desc"
          >
            <p id="login-fail-desc" className="adminLoginModalMessage">
              <span className="adminLoginModalEmoji" aria-hidden="true">
                😊{" "}
              </span>
              Credentials rejected. Try again before the server starts laughing.
            </p>
            <p className="adminLoginModalWait">Try again in {secondsLeft}s…</p>
          </div>
        </div>
      ) : null}

      <form action={formAction} className="adminLoginForm">
        <fieldset disabled={locked || pending} style={{ border: "none", margin: 0, padding: 0 }}>
          <label htmlFor="admin-username">
            Administrator ID
            <input
              id="admin-username"
              name="username"
              required
              autoComplete="username"
              placeholder={DEFAULT_ADMIN_USERNAME}
            />
          </label>
          <label htmlFor="admin-password">
            Password
            <input id="admin-password" type="password" name="password" required autoComplete="current-password" />
          </label>
          <button type="submit">{locked ? `Wait ${secondsLeft}s…` : pending ? "Signing in…" : "Continue to dashboard"}</button>
        </fieldset>
      </form>
    </>
  );
}
