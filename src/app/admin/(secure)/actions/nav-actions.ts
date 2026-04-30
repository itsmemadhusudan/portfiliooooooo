"use server";

import { desc, eq } from "drizzle-orm";
import { assertAdminSession } from "@/app/admin/auth-actions";
import { revalidatePortfolioPaths } from "@/app/admin/(secure)/actions/revalidate-site";
import { navLinks } from "@/db/schema";
import { getDb } from "@/lib/db";
import { z } from "zod";

export async function addNavLinkAction(formData: FormData) {
  await assertAdminSession();
  const row = z
    .object({
      label: z.string().min(1),
      href: z.string().min(1),
    })
    .parse({
      label: formData.get("label"),
      href: formData.get("href"),
    });
  const db = getDb();
  const [last] = await db.select().from(navLinks).orderBy(desc(navLinks.sortOrder)).limit(1);
  const next = (last?.sortOrder ?? -1) + 1;
  await db.insert(navLinks).values({ ...row, sortOrder: next, visible: true });
  await revalidatePortfolioPaths();
}

export async function updateNavLinkAction(formData: FormData) {
  await assertAdminSession();
  const id = z.coerce.number().int().parse(formData.get("id"));
  const row = z
    .object({
      label: z.string().min(1),
      href: z.string().min(1),
      sortOrder: z.coerce.number().int(),
    })
    .parse({
      label: formData.get("label"),
      href: formData.get("href"),
      sortOrder: formData.get("sortOrder"),
    });
  const visible = formData.get("visible") === "on";
  const db = getDb();
  await db
    .update(navLinks)
    .set({
      label: row.label,
      href: row.href,
      sortOrder: row.sortOrder,
      visible,
    })
    .where(eq(navLinks.id, id));
  await revalidatePortfolioPaths();
}

export async function deleteNavLinkAction(formData: FormData) {
  await assertAdminSession();
  const id = z.coerce.number().int().parse(formData.get("id"));
  const db = getDb();
  await db.delete(navLinks).where(eq(navLinks.id, id));
  await revalidatePortfolioPaths();
}
