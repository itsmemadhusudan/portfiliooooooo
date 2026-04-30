import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const profile = sqliteTable("profile", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  designation: text("designation").notNull(),
  tagline: text("tagline").notNull(),
  summary: text("summary").notNull(),
  availability: text("availability").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  linkedin: text("linkedin").notNull(),
  github: text("github").notNull(),
  location: text("location").notNull(),
  totalProjectsLabel: text("total_projects_label").notNull().default("23+"),
  cwCompany: text("cw_company").notNull(),
  cwRole: text("cw_role").notNull(),
  cwStatus: text("cw_status").notNull(),
  /** Hero eyebrow line above the name */
  heroEyebrow: text("hero_eyebrow").notNull(),
  heroImageSrc: text("hero_image_src").notNull(),
  heroImageAlt: text("hero_image_alt").notNull(),
  heroStackLine: text("hero_stack_line").notNull(),
  siteTitle: text("site_title").notNull(),
  siteDescription: text("site_description").notNull(),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  sectionEyebrow: text("section_eyebrow").notNull(),
});

/** Per-route titles for inner pages (slug matches path segment, e.g. "about") */
export const pageHeaders = sqliteTable("page_headers", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

/** Main site navigation; only `visible` rows are shown publicly */
export const navLinks = sqliteTable("nav_links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  href: text("href").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  visible: integer("visible", { mode: "boolean" }).notNull().default(true),
});

export const currentWorkHighlights = sqliteTable("current_work_highlights", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  profileId: integer("profile_id")
    .notNull()
    .references(() => profile.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const aboutParagraphs = sqliteTable("about_paragraphs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  text: text("text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const education = sqliteTable("education", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  degree: text("degree").notNull(),
  institution: text("institution").notNull(),
  duration: text("duration").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const skillCategories = sqliteTable("skill_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const skills = sqliteTable("skills", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  categoryId: integer("category_id")
    .notNull()
    .references(() => skillCategories.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const currentlyLearning = sqliteTable("currently_learning", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  stack: text("stack").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const projectHighlights = sqliteTable("project_highlights", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const experiences = sqliteTable("experiences", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  role: text("role").notNull(),
  duration: text("duration").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const experiencePoints = sqliteTable("experience_points", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  experienceId: integer("experience_id")
    .notNull()
    .references(() => experiences.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const achievements = sqliteTable("achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  text: text("text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const focusAreas = sqliteTable("focus_areas", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  text: text("text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  text: text("text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const metrics = sqliteTable("metrics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  value: text("value").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const strengths = sqliteTable("strengths", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const languages = sqliteTable("languages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const interests = sqliteTable("interests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  text: text("text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const galleryAlbums = sqliteTable("gallery_albums", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
});

export const galleryImages = sqliteTable("gallery_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  albumId: integer("album_id")
    .notNull()
    .references(() => galleryAlbums.id, { onDelete: "cascade" }),
  filePath: text("file_path").notNull(),
  caption: text("caption"),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Extra CV blocks rendered in resume page (custom sections). */
export const cvComponents = sqliteTable("cv_components", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const profileRelations = relations(profile, ({ many }) => ({
  currentWorkHighlights: many(currentWorkHighlights),
}));

export const projectRelations = relations(projects, ({ many }) => ({
  highlights: many(projectHighlights),
}));

export const experienceRelations = relations(experiences, ({ many }) => ({
  points: many(experiencePoints),
}));

export const galleryAlbumRelations = relations(galleryAlbums, ({ many }) => ({
  images: many(galleryImages),
}));
