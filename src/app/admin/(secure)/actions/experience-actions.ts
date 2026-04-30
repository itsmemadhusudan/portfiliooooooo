"use server";

import { desc, eq } from "drizzle-orm";
import { assertAdminSession } from "@/app/admin/auth-actions";
import { revalidatePortfolioPaths } from "@/app/admin/(secure)/actions/revalidate-site";
import { experiencePoints, experiences } from "@/db/schema";
import { getDb } from "@/lib/db";
import { z } from "zod";

export async function addExperienceAction(formData: FormData) {
  await assertAdminSession();
  const row = z
    .object({
      role: z.string().min(1),
      duration: z.string().min(1),
      points: z.string(),
    })
    .parse({
      role: formData.get("role"),
      duration: formData.get("duration"),
      points: formData.get("points"),
    });
  const lines = row.points
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const db = getDb();
  const [last] = await db.select().from(experiences).orderBy(desc(experiences.sortOrder)).limit(1);
  const next = (last?.sortOrder ?? -1) + 1;

  await db.transaction(async (tx) => {
    const [ex] = await tx
      .insert(experiences)
      .values({ role: row.role, duration: row.duration, sortOrder: next })
      .returning({ id: experiences.id });
    if (lines.length && ex) {
      await tx.insert(experiencePoints).values(
        lines.map((text, i) => ({ experienceId: ex.id, text, sortOrder: i })),
      );
    }
  });
  await revalidatePortfolioPaths();
}

export async function updateExperienceAction(formData: FormData) {
  await assertAdminSession();
  const row = z
    .object({
      id: z.coerce.number().int(),
      role: z.string().min(1),
      duration: z.string().min(1),
      points: z.string(),
    })
    .parse({
      id: formData.get("id"),
      role: formData.get("role"),
      duration: formData.get("duration"),
      points: formData.get("points"),
    });
  const lines = row.points
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const db = getDb();
  await db.transaction(async (tx) => {
    await tx
      .update(experiences)
      .set({ role: row.role, duration: row.duration })
      .where(eq(experiences.id, row.id));
    await tx.delete(experiencePoints).where(eq(experiencePoints.experienceId, row.id));
    if (lines.length) {
      await tx.insert(experiencePoints).values(
        lines.map((text, i) => ({ experienceId: row.id, text, sortOrder: i })),
      );
    }
  });
  await revalidatePortfolioPaths();
}

export async function deleteExperienceAction(formData: FormData) {
  await assertAdminSession();
  const id = z.coerce.number().int().parse(formData.get("id"));
  const db = getDb();
  await db.delete(experiences).where(eq(experiences.id, id));
  await revalidatePortfolioPaths();
}
