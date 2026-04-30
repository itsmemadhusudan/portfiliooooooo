import { asc, eq } from "drizzle-orm";
import type { PortfolioData } from "@/data/portfolio";

export { getPageCopy } from "@/data/portfolio";
import {
  aboutParagraphs,
  achievements,
  currentWorkHighlights,
  currentlyLearning,
  education,
  experiencePoints,
  experiences,
  focusAreas,
  galleryAlbums,
  galleryImages,
  interests,
  languages,
  metrics,
  navLinks,
  pageHeaders,
  profile,
  projectHighlights,
  projects,
  services,
  skillCategories,
  skills,
  strengths,
} from "@/db/schema";
import { getDb } from "@/lib/db";

export async function getPortfolioData(): Promise<PortfolioData> {
  const db = getDb();

  const [p] = await db.select().from(profile).limit(1);
  if (!p) {
    throw new Error(
      "Portfolio database is empty. Run: npm run db:migrate && npm run db:seed",
    );
  }

  const [
    aboutRows,
    eduRows,
    catRows,
    skillRows,
    learnRows,
    projRows,
    expRows,
    achRows,
    focusRows,
    svcRows,
    metRows,
    strRows,
    langRows,
    intRows,
    cwRows,
    hlRows,
    pointRows,
    phRows,
    navRows,
  ] = await Promise.all([
    db.select().from(aboutParagraphs).orderBy(asc(aboutParagraphs.sortOrder)),
    db.select().from(education).orderBy(asc(education.sortOrder)),
    db.select().from(skillCategories).orderBy(asc(skillCategories.sortOrder)),
    db.select().from(skills),
    db.select().from(currentlyLearning).orderBy(asc(currentlyLearning.sortOrder)),
    db.select().from(projects).orderBy(asc(projects.sortOrder)),
    db.select().from(experiences).orderBy(asc(experiences.sortOrder)),
    db.select().from(achievements).orderBy(asc(achievements.sortOrder)),
    db.select().from(focusAreas).orderBy(asc(focusAreas.sortOrder)),
    db.select().from(services).orderBy(asc(services.sortOrder)),
    db.select().from(metrics).orderBy(asc(metrics.sortOrder)),
    db.select().from(strengths).orderBy(asc(strengths.sortOrder)),
    db.select().from(languages).orderBy(asc(languages.sortOrder)),
    db.select().from(interests).orderBy(asc(interests.sortOrder)),
    db
      .select()
      .from(currentWorkHighlights)
      .where(eq(currentWorkHighlights.profileId, p.id))
      .orderBy(asc(currentWorkHighlights.sortOrder)),
    db
      .select()
      .from(projectHighlights)
      .orderBy(asc(projectHighlights.projectId), asc(projectHighlights.sortOrder)),
    db
      .select()
      .from(experiencePoints)
      .orderBy(asc(experiencePoints.experienceId), asc(experiencePoints.sortOrder)),
    db.select().from(pageHeaders),
    db
      .select()
      .from(navLinks)
      .where(eq(navLinks.visible, true))
      .orderBy(asc(navLinks.sortOrder)),
  ]);

  const highlightsByProject = new Map<number, string[]>();
  for (const h of hlRows) {
    const list = highlightsByProject.get(h.projectId) ?? [];
    list.push(h.text);
    highlightsByProject.set(h.projectId, list);
  }

  const skillsBySlug: Record<string, string[]> = {};
  for (const c of catRows) {
    skillsBySlug[c.slug] = skillRows
      .filter((s) => s.categoryId === c.id)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((s) => s.name);
  }

  const pointsByExp = new Map<number, string[]>();
  for (const pt of pointRows) {
    const list = pointsByExp.get(pt.experienceId) ?? [];
    list.push(pt.text);
    pointsByExp.set(pt.experienceId, list);
  }

  return {
    name: p.name,
    designation: p.designation,
    tagline: p.tagline,
    summary: p.summary,
    about: aboutRows.map((r) => r.text),
    education: eduRows.map((r) => ({
      id: r.id,
      degree: r.degree,
      institution: r.institution,
      duration: r.duration,
    })),
    skills: {
      backend: skillsBySlug.backend ?? [],
      frontend: skillsBySlug.frontend ?? [],
      related: skillsBySlug.related ?? [],
      soft: skillsBySlug.soft ?? [],
    },
    projects: projRows.map((r) => ({
      id: r.id,
      name: r.name,
      stack: r.stack,
      description: r.description,
      highlights: highlightsByProject.get(r.id) ?? [],
    })),
    experiences: expRows.map((r) => ({
      id: r.id,
      role: r.role,
      duration: r.duration,
      points: pointsByExp.get(r.id) ?? [],
    })),
    achievements: achRows.map((r) => r.text),
    focusAreas: focusRows.map((r) => r.text),
    currentlyLearning: learnRows.map((r) => r.name),
    currentWork: {
      company: p.cwCompany,
      role: p.cwRole,
      status: p.cwStatus,
      highlights: cwRows.map((r) => r.text),
    },
    contact: {
      phone: p.phone,
      email: p.email,
      linkedin: p.linkedin,
      github: p.github,
      location: p.location,
    },
    availability: p.availability,
    services: svcRows.map((r) => r.text),
    metrics: metRows.map((r) => ({ label: r.label, value: r.value })),
    strengths: strRows.map((r) => ({ id: r.id, title: r.title, description: r.description })),
    languages: langRows.map((r) => r.name),
    interests: intRows.map((r) => r.text),
    totalProjectsLabel: p.totalProjectsLabel,
    heroEyebrow: p.heroEyebrow,
    heroImageSrc: p.heroImageSrc,
    heroImageAlt: p.heroImageAlt,
    heroStackLine: p.heroStackLine,
    siteTitle: p.siteTitle,
    siteDescription: p.siteDescription,
    ogTitle: p.ogTitle,
    ogDescription: p.ogDescription,
    sectionEyebrow: p.sectionEyebrow,
    pageHeaders: phRows.map((r) => ({ slug: r.slug, title: r.title, description: r.description })),
    navLinks: navRows.map((r) => ({ id: r.id, label: r.label, href: r.href })),
  };
}

export async function getAllNavLinksForAdmin() {
  const db = getDb();
  return db.select().from(navLinks).orderBy(asc(navLinks.sortOrder));
}

export async function getAllPageHeadersForAdmin() {
  const db = getDb();
  return db.select().from(pageHeaders).orderBy(asc(pageHeaders.slug));
}

export type GalleryAlbumWithImages = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  images: { id: number; src: string; caption: string | null }[];
};

export async function getPublishedGallery(): Promise<GalleryAlbumWithImages[]> {
  const db = getDb();
  const albums = await db
    .select()
    .from(galleryAlbums)
    .where(eq(galleryAlbums.published, true))
    .orderBy(asc(galleryAlbums.sortOrder));

  const imgs = await db
    .select()
    .from(galleryImages)
    .orderBy(asc(galleryImages.albumId), asc(galleryImages.sortOrder));

  return albums.map((a) => ({
    id: a.id,
    title: a.title,
    slug: a.slug,
    description: a.description,
    images: imgs
      .filter((i) => i.albumId === a.id)
      .map((i) => ({ id: i.id, src: i.filePath, caption: i.caption })),
  }));
}

export async function getAllGalleryAlbumsForAdmin() {
  const db = getDb();
  const albums = await db.select().from(galleryAlbums).orderBy(asc(galleryAlbums.sortOrder));
  const imgs = await db
    .select()
    .from(galleryImages)
    .orderBy(asc(galleryImages.albumId), asc(galleryImages.sortOrder));
  return albums.map((a) => ({
    ...a,
    images: imgs.filter((i) => i.albumId === a.id),
  }));
}
