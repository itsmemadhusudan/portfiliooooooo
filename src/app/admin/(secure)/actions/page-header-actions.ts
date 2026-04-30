"use server";

import { eq } from "drizzle-orm";
import { assertAdminSession } from "@/app/admin/auth-actions";
import { revalidatePortfolioPaths } from "@/app/admin/(secure)/actions/revalidate-site";
import { pageHeaders } from "@/db/schema";
import { getDb } from "@/lib/db";
import { z } from "zod";

export async function updatePageHeaderAction(formData: FormData) {
  await assertAdminSession();
  const row = z
    .object({
      slug: z.string().min(1),
      title: z.string().min(1),
      description: z.string().min(1),
    })
    .parse({
      slug: formData.get("slug"),
      title: formData.get("title"),
      description: formData.get("description"),
    });
  const db = getDb();
  await db
    .update(pageHeaders)
    .set({ title: row.title, description: row.description })
    .where(eq(pageHeaders.slug, row.slug));
  await revalidatePortfolioPaths();
}
