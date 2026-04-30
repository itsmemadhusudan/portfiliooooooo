import { portfolioSeedData } from "@/db/seed-source";
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

async function clearAll() {
  const db = getDb();
  await db.delete(galleryImages);
  await db.delete(galleryAlbums);
  await db.delete(projectHighlights);
  await db.delete(projects);
  await db.delete(experiencePoints);
  await db.delete(experiences);
  await db.delete(skills);
  await db.delete(skillCategories);
  await db.delete(currentWorkHighlights);
  await db.delete(aboutParagraphs);
  await db.delete(education);
  await db.delete(achievements);
  await db.delete(focusAreas);
  await db.delete(currentlyLearning);
  await db.delete(services);
  await db.delete(metrics);
  await db.delete(strengths);
  await db.delete(languages);
  await db.delete(interests);
  await db.delete(navLinks);
  await db.delete(pageHeaders);
  await db.delete(profile);
}

const SEED_PAGE_HEADERS: { slug: string; title: string; description: string }[] = [
  { slug: "about", title: "About Me", description: "My summary, education, and key achievements." },
  { slug: "skills", title: "Skills & Tools", description: "Technical and professional skills I use to deliver real projects." },
  {
    slug: "projects",
    title: "Projects & Experience",
    description: "Selected projects and practical experience from academic and real-world builds.",
  },
  { slug: "resume", title: "Resume", description: "One-page CV; your name and details appear in the sheet below." },
  {
    slug: "contact",
    title: "Contact",
    description: "Let's connect for backend roles, freelance projects, and collaborations.",
  },
  { slug: "gallery", title: "Gallery", description: "Photo albums and project snapshots." },
];

const SEED_NAV_LINKS: { label: string; href: string; sortOrder: number }[] = [
  { label: "Home", href: "/", sortOrder: 0 },
  { label: "About", href: "/about", sortOrder: 1 },
  { label: "Skills", href: "/skills", sortOrder: 2 },
  { label: "Projects", href: "/projects", sortOrder: 3 },
  { label: "Gallery", href: "/gallery", sortOrder: 4 },
  { label: "Resume", href: "/resume", sortOrder: 5 },
  { label: "Contact", href: "/contact", sortOrder: 6 },
];


async function main() {
  const db = getDb();
  const s = portfolioSeedData;

  await clearAll();

  const [p] = await db
    .insert(profile)
    .values({
      name: s.name,
      designation: s.designation,
      tagline: s.tagline,
      summary: s.summary,
      availability: s.availability,
      phone: s.contact.phone,
      email: s.contact.email,
      linkedin: s.contact.linkedin,
      github: s.contact.github,
      location: s.contact.location,
      totalProjectsLabel: s.totalProjectsLabel,
      cwCompany: s.currentWork.company,
      cwRole: s.currentWork.role,
      cwStatus: s.currentWork.status,
      heroEyebrow: "Backend Developer Portfolio",
      heroImageSrc: "/profile/138767859-removebg-preview.png",
      heroImageAlt: `${s.name} profile`,
      heroStackLine: "Laravel | Node.js | Nest.js | Python",
      siteTitle: `${s.name} | Backend Developer`,
      siteDescription:
        "Backend-focused portfolio featuring skills, projects, and contact — Laravel, Node.js, Nest.js, Python, React, Next.js.",
      ogTitle: null,
      ogDescription: null,
      sectionEyebrow: "Portfolio Section",
    })
    .returning({ id: profile.id });

  const profileId = p!.id;

  await db.insert(pageHeaders).values(SEED_PAGE_HEADERS);
  await db.insert(navLinks).values(SEED_NAV_LINKS.map((r) => ({ ...r, visible: true })));

  await db.insert(currentWorkHighlights).values(
    s.currentWork.highlights.map((text, i) => ({
      profileId,
      text,
      sortOrder: i,
    })),
  );

  await db.insert(aboutParagraphs).values(
    s.about.map((text, i) => ({ text, sortOrder: i })),
  );

  await db.insert(education).values(
    s.education.map((e, i) => ({
      degree: e.degree,
      institution: e.institution,
      duration: e.duration,
      sortOrder: i,
    })),
  );

  const catDefs = [
    { slug: "backend", title: "Backend", sortOrder: 0 },
    { slug: "frontend", title: "Frontend", sortOrder: 1 },
    { slug: "related", title: "Related", sortOrder: 2 },
    { slug: "soft", title: "Professional Skills", sortOrder: 3 },
  ] as const;

  const insertedCats = await db
    .insert(skillCategories)
    .values(catDefs.map((c) => ({ slug: c.slug, title: c.title, sortOrder: c.sortOrder })))
    .returning({ id: skillCategories.id, slug: skillCategories.slug });

  const slugToId = new Map(insertedCats.map((c) => [c.slug, c.id]));

  const skillInserts: { categoryId: number; name: string; sortOrder: number }[] = [];
  for (const slug of ["backend", "frontend", "related", "soft"] as const) {
    const cid = slugToId.get(slug)!;
    const names = s.skills[slug];
    names.forEach((name, i) => skillInserts.push({ categoryId: cid, name, sortOrder: i }));
  }
  if (skillInserts.length) await db.insert(skills).values(skillInserts);

  await db.insert(currentlyLearning).values(
    s.currentlyLearning.map((name, i) => ({ name, sortOrder: i })),
  );

  for (let i = 0; i < s.projects.length; i++) {
    const proj = s.projects[i]!;
    const [pr] = await db
      .insert(projects)
      .values({
        name: proj.name,
        stack: proj.stack,
        description: proj.description,
        sortOrder: i,
      })
      .returning({ id: projects.id });
    await db.insert(projectHighlights).values(
      proj.highlights.map((text, j) => ({
        projectId: pr!.id,
        text,
        sortOrder: j,
      })),
    );
  }

  for (let i = 0; i < s.experiences.length; i++) {
    const ex = s.experiences[i]!;
    const [er] = await db
      .insert(experiences)
      .values({
        role: ex.role,
        duration: ex.duration,
        sortOrder: i,
      })
      .returning({ id: experiences.id });
    await db.insert(experiencePoints).values(
      ex.points.map((text, j) => ({
        experienceId: er!.id,
        text,
        sortOrder: j,
      })),
    );
  }

  await db.insert(achievements).values(
    s.achievements.map((text, i) => ({ text, sortOrder: i })),
  );
  await db.insert(focusAreas).values(
    s.focusAreas.map((text, i) => ({ text, sortOrder: i })),
  );
  await db.insert(services).values(s.services.map((text, i) => ({ text, sortOrder: i })));
  await db.insert(metrics).values(
    s.metrics.map((m, i) => ({
      label: m.label,
      value: m.value,
      sortOrder: i,
    })),
  );
  await db.insert(strengths).values(
    s.strengths.map((st, i) => ({
      title: st.title,
      description: st.description,
      sortOrder: i,
    })),
  );
  await db.insert(languages).values(
    s.languages.map((name, i) => ({ name, sortOrder: i })),
  );
  await db.insert(interests).values(
    s.interests.map((text, i) => ({ text, sortOrder: i })),
  );

  console.log("Seed complete. Profile id:", profileId);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
