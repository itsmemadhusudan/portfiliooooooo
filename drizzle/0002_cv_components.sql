CREATE TABLE `cv_components` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
