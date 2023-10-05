ALTER TABLE user ADD `email` text(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user_key` DROP COLUMN `email`;