CREATE TABLE `about_paragraphs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `achievements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `current_work_highlights` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`profile_id` integer NOT NULL,
	`text` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `profile`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `currently_learning` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `education` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`degree` text NOT NULL,
	`institution` text NOT NULL,
	`duration` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `experience_points` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`experience_id` integer NOT NULL,
	`text` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`experience_id`) REFERENCES `experiences`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `experiences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`role` text NOT NULL,
	`duration` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `focus_areas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `gallery_albums` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `gallery_albums_slug_unique` ON `gallery_albums` (`slug`);--> statement-breakpoint
CREATE TABLE `gallery_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`album_id` integer NOT NULL,
	`file_path` text NOT NULL,
	`caption` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `gallery_albums`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `interests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `languages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `metrics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`label` text NOT NULL,
	`value` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`designation` text NOT NULL,
	`tagline` text NOT NULL,
	`summary` text NOT NULL,
	`availability` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`linkedin` text NOT NULL,
	`github` text NOT NULL,
	`location` text NOT NULL,
	`total_projects_label` text DEFAULT '23+' NOT NULL,
	`cw_company` text NOT NULL,
	`cw_role` text NOT NULL,
	`cw_status` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `project_highlights` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer NOT NULL,
	`text` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`stack` text NOT NULL,
	`description` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `skill_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `skill_categories_slug_unique` ON `skill_categories` (`slug`);--> statement-breakpoint
CREATE TABLE `skills` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category_id` integer NOT NULL,
	`name` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `skill_categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `strengths` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
