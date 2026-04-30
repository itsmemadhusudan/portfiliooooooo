import { randomBytes } from "crypto";
import fs from "fs/promises";
import path from "path";
import { asc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { galleryImages } from "@/db/schema";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-session";
import { getAdminSessionSecret } from "@/lib/admin-config";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 8 * 1024 * 1024;

const extByMime: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export async function POST(request: Request) {
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  let secret: string;
  try {
    secret = getAdminSessionSecret();
  } catch {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 503 });
  }
  if (!verifyAdminSession(token, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const albumIdRaw = formData.get("albumId");
  if (!(file instanceof File) || typeof albumIdRaw !== "string") {
    return NextResponse.json({ error: "Missing file or albumId" }, { status: 400 });
  }
  const albumId = Number(albumIdRaw);
  if (!Number.isInteger(albumId) || albumId < 1) {
    return NextResponse.json({ error: "Invalid album" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Invalid image type" }, { status: 400 });
  }
  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > MAX_BYTES) {
    return NextResponse.json({ error: "File too large" }, { status: 400 });
  }

  const ext = extByMime[file.type] ?? ".bin";
  const name = `${randomBytes(16).toString("hex")}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads", "gallery");
  await fs.mkdir(dir, { recursive: true });
  const diskPath = path.join(dir, name);
  await fs.writeFile(diskPath, buf);

  const publicPath = `/uploads/gallery/${name}`;
  const db = getDb();
  const existing = await db
    .select({ sortOrder: galleryImages.sortOrder })
    .from(galleryImages)
    .where(eq(galleryImages.albumId, albumId))
    .orderBy(asc(galleryImages.sortOrder));
  const nextOrder = existing.length ? Math.max(...existing.map((r) => r.sortOrder)) + 1 : 0;

  await db.insert(galleryImages).values({
    albumId,
    filePath: publicPath,
    caption: null,
    sortOrder: nextOrder,
  });

  return NextResponse.json({ ok: true, path: publicPath });
}
