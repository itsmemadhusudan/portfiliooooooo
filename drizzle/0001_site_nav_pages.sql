CREATE TABLE `nav_links` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`label` text NOT NULL,
	`href` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`visible` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE `page_headers` (
	`slug` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `profile` ADD `hero_eyebrow` text NOT NULL DEFAULT 'Backend Developer Portfolio';
--> statement-breakpoint
ALTER TABLE `profile` ADD `hero_image_src` text NOT NULL DEFAULT '/profile/138767859-removebg-preview.png';
--> statement-breakpoint
ALTER TABLE `profile` ADD `hero_image_alt` text NOT NULL DEFAULT 'Profile photo';
--> statement-breakpoint
ALTER TABLE `profile` ADD `hero_stack_line` text NOT NULL DEFAULT 'Laravel | Node.js | Nest.js | Python';
--> statement-breakpoint
ALTER TABLE `profile` ADD `site_title` text NOT NULL DEFAULT 'Portfolio | Developer';
--> statement-breakpoint
ALTER TABLE `profile` ADD `site_description` text NOT NULL DEFAULT 'Developer portfolio: skills, projects, and contact.';
--> statement-breakpoint
ALTER TABLE `profile` ADD `og_title` text;
--> statement-breakpoint
ALTER TABLE `profile` ADD `og_description` text;
--> statement-breakpoint
ALTER TABLE `profile` ADD `section_eyebrow` text NOT NULL DEFAULT 'Portfolio Section';
--> statement-breakpoint
INSERT OR REPLACE INTO `page_headers` (`slug`, `title`, `description`) VALUES
	('about', 'About Me', 'My summary, education, and key achievements.'),
	('skills', 'Skills & Tools', 'Technical and professional skills I use to deliver real projects.'),
	('projects', 'Projects & Experience', 'Selected projects and practical experience from academic and real-world builds.'),
	('resume', 'Resume', 'One-page CV; your name and details appear in the sheet below.'),
	('contact', 'Contact', 'Let''s connect for backend roles, freelance projects, and collaborations.'),
	('gallery', 'Gallery', 'Photo albums and project snapshots.');
--> statement-breakpoint
INSERT INTO `nav_links` (`label`, `href`, `sort_order`, `visible`) VALUES
	('Home', '/', 0, 1),
	('About', '/about', 1, 1),
	('Skills', '/skills', 2, 1),
	('Projects', '/projects', 3, 1),
	('Gallery', '/gallery', 4, 1),
	('Resume', '/resume', 5, 1),
	('Contact', '/contact', 6, 1);
