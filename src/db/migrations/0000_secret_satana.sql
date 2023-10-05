CREATE TABLE `user_key` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`user_id` text(15) NOT NULL,
	`email` text(255) NOT NULL,
	`hashed_password` text(255)
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text(127) PRIMARY KEY NOT NULL,
	`user_id` text(15) NOT NULL,
	`active_expires` integer NOT NULL,
	`idle_expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text(15) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `thingies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `thingies_name_unique` ON `thingies` (`name`);