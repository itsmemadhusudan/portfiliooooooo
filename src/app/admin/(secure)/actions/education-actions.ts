"use server";

import { desc, eq } from "drizzle-orm";
import { assertAdminSession } from "@/app/admin/auth-actions";
import { revalidatePortfolioPaths } from "@/app/admin/(secure)/actions/revalidate-site";
import { education } from "@/db/schema";
import { getDb } from "@/lib/db";
import { z } from "zod";

export async function addEducationAction(formData: FormData) {
  await assertAdminSession();
  const row = z
    .object({
      degree: z.string().min(1),
      institution: z.string().min(1),
      duration: z.string().min(1),
    })
    .parse({
      degree: formData.get("degree"),
      institution: formData.get("institution"),
      duration: formData.get("duration"),
    });
  const db = getDb();
  const [last] = await db.select().from(education).orderBy(desc(education.sortOrder)).limit(1);
  const next = (last?.sortOrder ?? -1) + 1;
  await db.insert(education).values({ ...row, sortOrder: next });
  await revalidatePortfolioPaths();
}

export async function deleteEducationAction(formData: FormData) {
  await assertAdminSession();
  const id = z.coerce.number().int().parse(formData.get("id"));
  const db = getDb();
  await db.delete(education).where(eq(education.id, id));
  await revalidatePortfolioPaths();
}
