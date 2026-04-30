"use server";

import { eq } from "drizzle-orm";
import { currentWorkHighlights, profile } from "@/db/schema";
import { assertAdminSession } from "@/app/admin/auth-actions";
import { revalidatePortfolioPaths } from "@/app/admin/(secure)/actions/revalidate-site";
import { getDb } from "@/lib/db";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(1),
  designation: z.string().min(1),
  tagline: z.string().min(1),
  summary: z.string().min(1),
  availability: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  linkedin: z.string().min(1),
  github: z.string().min(1),
  location: z.string().min(1),
  totalProjectsLabel: z.string().min(1),
  cwCompany: z.string().min(1),
  cwRole: z.string().min(1),
  cwStatus: z.string().min(1),
  highlights: z.string(),
  heroEyebrow: z.string().min(1),
  heroImageSrc: z.string().min(1),
  heroImageAlt: z.string().min(1),
  heroStackLine: z.string().min(1),
  siteTitle: z.string().min(1),
  siteDescription: z.string().min(1),
  ogTitle: z.string(),
  ogDescription: z.string(),
  sectionEyebrow: z.string().min(1),
});

export async function updateProfileAction(formData: FormData) {
  await assertAdminSession();
  const raw = profileSchema.parse({
    name: formData.get("name"),
    designation: formData.get("designation"),
    tagline: formData.get("tagline"),
    summary: formData.get("summary"),
    availability: formData.get("availability"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    linkedin: formData.get("linkedin"),
    github: formData.get("github"),
    location: formData.get("location"),
    totalProjectsLabel: formData.get("totalProjectsLabel"),
    cwCompany: formData.get("cwCompany"),
    cwRole: formData.get("cwRole"),
    cwStatus: formData.get("cwStatus"),
    highlights: formData.get("highlights"),
    heroEyebrow: formData.get("heroEyebrow"),
    heroImageSrc: formData.get("heroImageSrc"),
    heroImageAlt: formData.get("heroImageAlt"),
    heroStackLine: formData.get("heroStackLine"),
    siteTitle: formData.get("siteTitle"),
    siteDescription: formData.get("siteDescription"),
    ogTitle: formData.get("ogTitle"),
    ogDescription: formData.get("ogDescription"),
    sectionEyebrow: formData.get("sectionEyebrow"),
  });

  const ogTitle = raw.ogTitle.trim() || null;
  const ogDescription = raw.ogDescription.trim() || null;

  const db = getDb();
  const [p] = await db.select({ id: profile.id }).from(profile).limit(1);
  if (!p) throw new Error("No profile row");

  const lines = raw.highlights
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  await db.transaction(async (tx) => {
    await tx
      .update(profile)
      .set({
        name: raw.name,
        designation: raw.designation,
        tagline: raw.tagline,
        summary: raw.summary,
        availability: raw.availability,
        phone: raw.phone,
        email: raw.email,
        linkedin: raw.linkedin,
        github: raw.github,
        location: raw.location,
        totalProjectsLabel: raw.totalProjectsLabel,
        cwCompany: raw.cwCompany,
        cwRole: raw.cwRole,
        cwStatus: raw.cwStatus,
        heroEyebrow: raw.heroEyebrow,
        heroImageSrc: raw.heroImageSrc,
        heroImageAlt: raw.heroImageAlt,
        heroStackLine: raw.heroStackLine,
        siteTitle: raw.siteTitle,
        siteDescription: raw.siteDescription,
        ogTitle,
        ogDescription,
        sectionEyebrow: raw.sectionEyebrow,
      })
      .where(eq(profile.id, p.id));

    await tx.delete(currentWorkHighlights).where(eq(currentWorkHighlights.profileId, p.id));
    if (lines.length) {
      await tx.insert(currentWorkHighlights).values(
        lines.map((text, i) => ({ profileId: p.id, text, sortOrder: i })),
      );
    }
  });

  await revalidatePortfolioPaths();
}
