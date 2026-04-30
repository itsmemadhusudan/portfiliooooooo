"use server";

import { desc, eq } from "drizzle-orm";
import { assertAdminSession } from "@/app/admin/auth-actions";
import { revalidatePortfolioPaths } from "@/app/admin/(secure)/actions/revalidate-site";
import { projectHighlights, projects } from "@/db/schema";
import { getDb } from "@/lib/db";
import { z } from "zod";

export async function addProjectAction(formData: FormData) {
  await assertAdminSession();
  const row = z
    .object({
      name: z.string().min(1),
      stack: z.string().min(1),
      description: z.string().min(1),
      highlights: z.string(),
    })
    .parse({
      name: formData.get("name"),
      stack: formData.get("stack"),
      description: formData.get("description"),
      highlights: formData.get("highlights"),
    });
  const lines = row.highlights
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const db = getDb();
  const [last] = await db.select().from(projects).orderBy(desc(projects.sortOrder)).limit(1);
  const next = (last?.sortOrder ?? -1) + 1;

  await db.transaction(async (tx) => {
    const [pr] = await tx
      .insert(projects)
      .values({
        name: row.name,
        stack: row.stack,
        description: row.description,
        sortOrder: next,
      })
      .returning({ id: projects.id });
    if (lines.length && pr) {
      await tx.insert(projectHighlights).values(
        lines.map((text, i) => ({ projectId: pr.id, text, sortOrder: i })),
      );
    }
  });
  await revalidatePortfolioPaths();
}

export async function updateProjectAction(formData: FormData) {
  await assertAdminSession();
  const row = z
    .object({
      id: z.coerce.number().int(),
      name: z.string().min(1),
      stack: z.string().min(1),
      description: z.string().min(1),
      highlights: z.string(),
    })
    .parse({
      id: formData.get("id"),
      name: formData.get("name"),
      stack: formData.get("stack"),
      description: formData.get("description"),
      highlights: formData.get("highlights"),
    });
  const lines = row.highlights
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const db = getDb();
  await db.transaction(async (tx) => {
    await tx
      .update(projects)
      .set({
        name: row.name,
        stack: row.stack,
        description: row.description,
      })
      .where(eq(projects.id, row.id));
    await tx.delete(projectHighlights).where(eq(projectHighlights.projectId, row.id));
    if (lines.length) {
      await tx.insert(projectHighlights).values(
        lines.map((text, i) => ({ projectId: row.id, text, sortOrder: i })),
      );
    }
  });
  await revalidatePortfolioPaths();
}

export async function deleteProjectAction(formData: FormData) {
  await assertAdminSession();
  const id = z.coerce.number().int().parse(formData.get("id"));
  const db = getDb();
  await db.delete(projects).where(eq(projects.id, id));
  await revalidatePortfolioPaths();
}
