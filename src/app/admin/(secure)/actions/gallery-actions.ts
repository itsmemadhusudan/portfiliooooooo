"use server";

import { eq } from "drizzle-orm";
import { assertAdminSession } from "@/app/admin/auth-actions";
import { revalidatePortfolioPaths } from "@/app/admin/(secure)/actions/revalidate-site";
import { galleryAlbums, galleryImages } from "@/db/schema";
import { getDb } from "@/lib/db";
import { z } from "zod";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || "album";
}

export async function createGalleryAlbumAction(formData: FormData) {
  await assertAdminSession();
  const title = z.string().min(1).parse(formData.get("title"));
  const description = z.string().optional().parse(formData.get("description") ?? undefined);
  const db = getDb();
  const base = slugify(title);
  let slug = base;
  let n = 0;
  while (true) {
    const [exists] = await db.select({ id: galleryAlbums.id }).from(galleryAlbums).where(eq(galleryAlbums.slug, slug));
    if (!exists) break;
    n += 1;
    slug = `${base}-${n}`;
  }
  const all = await db.select({ sortOrder: galleryAlbums.sortOrder }).from(galleryAlbums);
  const nextSort = all.length ? Math.max(...all.map((r) => r.sortOrder)) + 1 : 0;
  await db.insert(galleryAlbums).values({
    title,
    slug,
    description: description || null,
    sortOrder: nextSort,
    published: true,
  });
  await revalidatePortfolioPaths();
}

export async function updateGalleryAlbumAction(formData: FormData) {
  await assertAdminSession();
  const row = z
    .object({
      id: z.coerce.number().int(),
      title: z.string().min(1),
      description: z.string().optional(),
    })
    .parse({
      id: formData.get("id"),
      title: formData.get("title"),
      description: formData.get("description") || undefined,
    });
  const published = formData.get("published") === "on";
  const db = getDb();
  await db
    .update(galleryAlbums)
    .set({
      title: row.title,
      description: row.description ?? null,
      published,
    })
    .where(eq(galleryAlbums.id, row.id));
  await revalidatePortfolioPaths();
}

export async function deleteGalleryAlbumAction(formData: FormData) {
  await assertAdminSession();
  const id = z.coerce.number().int().parse(formData.get("id"));
  const db = getDb();
  await db.delete(galleryAlbums).where(eq(galleryAlbums.id, id));
  await revalidatePortfolioPaths();
}

export async function deleteGalleryImageAction(formData: FormData) {
  await assertAdminSession();
  const id = z.coerce.number().int().parse(formData.get("id"));
  const db = getDb();
  await db.delete(galleryImages).where(eq(galleryImages.id, id));
  await revalidatePortfolioPaths();
}

export async function updateGalleryImageCaptionAction(formData: FormData) {
  await assertAdminSession();
  const id = z.coerce.number().int().parse(formData.get("id"));
  const caption = String(formData.get("caption") ?? "").trim() || null;
  const db = getDb();
  await db.update(galleryImages).set({ caption }).where(eq(galleryImages.id, id));
  await revalidatePortfolioPaths();
}
