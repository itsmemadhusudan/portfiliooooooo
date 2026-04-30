"use server";

import { assertAdminSession } from "@/app/admin/auth-actions";
import { revalidatePortfolioPaths } from "@/app/admin/(secure)/actions/revalidate-site";
import {
  achievements,
  focusAreas,
  interests,
  languages,
  metrics,
  services,
  strengths,
} from "@/db/schema";
import { getDb } from "@/lib/db";

export async function saveAchievementsAction(formData: FormData) {
  await assertAdminSession();
  const lines = String(formData.get("text") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const db = getDb();
  await db.delete(achievements);
  if (lines.length) {
    await db.insert(achievements).values(lines.map((text, i) => ({ text, sortOrder: i })));
  }
  await revalidatePortfolioPaths();
}

export async function saveFocusAreasAction(formData: FormData) {
  await assertAdminSession();
  const lines = String(formData.get("text") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const db = getDb();
  await db.delete(focusAreas);
  if (lines.length) {
    await db.insert(focusAreas).values(lines.map((text, i) => ({ text, sortOrder: i })));
  }
  await revalidatePortfolioPaths();
}

export async function saveServicesAction(formData: FormData) {
  await assertAdminSession();
  const lines = String(formData.get("text") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const db = getDb();
  await db.delete(services);
  if (lines.length) {
    await db.insert(services).values(lines.map((text, i) => ({ text, sortOrder: i })));
  }
  await revalidatePortfolioPaths();
}

export async function saveLanguagesAction(formData: FormData) {
  await assertAdminSession();
  const lines = String(formData.get("text") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const db = getDb();
  await db.delete(languages);
  if (lines.length) {
    await db.insert(languages).values(lines.map((name, i) => ({ name, sortOrder: i })));
  }
  await revalidatePortfolioPaths();
}

export async function saveInterestsAction(formData: FormData) {
  await assertAdminSession();
  const lines = String(formData.get("text") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const db = getDb();
  await db.delete(interests);
  if (lines.length) {
    await db.insert(interests).values(lines.map((text, i) => ({ text, sortOrder: i })));
  }
  await revalidatePortfolioPaths();
}

/** Each line: `value | label` (pipe-separated) */
export async function saveMetricsAction(formData: FormData) {
  await assertAdminSession();
  const lines = String(formData.get("text") ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const rows: { value: string; label: string; sortOrder: number }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const pipe = line.indexOf("|");
    if (pipe === -1) continue;
    const value = line.slice(0, pipe).trim();
    const label = line.slice(pipe + 1).trim();
    if (value && label) rows.push({ value, label, sortOrder: i });
  }
  const db = getDb();
  await db.delete(metrics);
  if (rows.length) await db.insert(metrics).values(rows);
  await revalidatePortfolioPaths();
}

/** Each block: title line, then description (paragraph); separate blocks with `---` on its own line */
export async function saveStrengthsAction(formData: FormData) {
  await assertAdminSession();
  const raw = String(formData.get("text") ?? "");
  const blocks = raw
    .split(/\r?\n---\r?\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  const rows: { title: string; description: string; sortOrder: number }[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const lines = blocks[i]!.split("\n");
    const title = (lines[0] ?? "").trim();
    const description = lines.slice(1).join("\n").trim();
    if (title && description) rows.push({ title, description, sortOrder: i });
  }
  const db = getDb();
  await db.delete(strengths);
  if (rows.length) await db.insert(strengths).values(rows);
  await revalidatePortfolioPaths();
}
