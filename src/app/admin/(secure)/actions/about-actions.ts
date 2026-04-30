"use server";

import { assertAdminSession } from "@/app/admin/auth-actions";
import { revalidatePortfolioPaths } from "@/app/admin/(secure)/actions/revalidate-site";
import { aboutParagraphs } from "@/db/schema";
import { getDb } from "@/lib/db";

export async function saveAboutParagraphsAction(formData: FormData) {
  await assertAdminSession();
  const text = String(formData.get("paragraphs") ?? "");
  const paragraphs = text
    .split(/\n\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const db = getDb();
  await db.delete(aboutParagraphs);
  if (paragraphs.length) {
    await db.insert(aboutParagraphs).values(
      paragraphs.map((p, i) => ({ text: p, sortOrder: i })),
    );
  }
  await revalidatePortfolioPaths();
}
