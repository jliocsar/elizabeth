CREATE TABLE `thingies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `thingies_name_unique` ON `thingies` (`name`);