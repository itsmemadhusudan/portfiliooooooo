"use server";

import { asc, eq } from "drizzle-orm";
import { assertAdminSession } from "@/app/admin/auth-actions";
import { revalidatePortfolioPaths } from "@/app/admin/(secure)/actions/revalidate-site";
import { currentlyLearning, skillCategories, skills } from "@/db/schema";
import { getDb } from "@/lib/db";
import { z } from "zod";

export async function addSkillAction(formData: FormData) {
  await assertAdminSession();
  const row = z
    .object({
      categorySlug: z.enum(["backend", "frontend", "related", "soft"]),
      name: z.string().min(1),
    })
    .parse({
      categorySlug: formData.get("categorySlug"),
      name: formData.get("name"),
    });
  const db = getDb();
  const [cat] = await db
    .select({ id: skillCategories.id })
    .from(skillCategories)
    .where(eq(skillCategories.slug, row.categorySlug));
  if (!cat) throw new Error("Category not found");
  const existing = await db
    .select({ sortOrder: skills.sortOrder })
    .from(skills)
    .where(eq(skills.categoryId, cat.id))
    .orderBy(asc(skills.sortOrder));
  const next = (existing[existing.length - 1]?.sortOrder ?? -1) + 1;
  await db.insert(skills).values({ categoryId: cat.id, name: row.name, sortOrder: next });
  await revalidatePortfolioPaths();
}

export async function deleteSkillAction(formData: FormData) {
  await assertAdminSession();
  const id = z.coerce.number().int().parse(formData.get("id"));
  const db = getDb();
  await db.delete(skills).where(eq(skills.id, id));
  await revalidatePortfolioPaths();
}

export async function saveCurrentlyLearningAction(formData: FormData) {
  await assertAdminSession();
  const text = String(formData.get("lines") ?? "");
  const lines = text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const db = getDb();
  await db.delete(currentlyLearning);
  if (lines.length) {
    await db.insert(currentlyLearning).values(lines.map((name, i) => ({ name, sortOrder: i })));
  }
  await revalidatePortfolioPaths();
}
