CREATE TABLE `conversion_daily` (
	`day` text NOT NULL,
	`event` text NOT NULL,
	`source` text NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	PRIMARY KEY(`day`, `event`, `source`)
);
--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`focus` text NOT NULL,
	`website` text NOT NULL,
	`message` text NOT NULL,
	`created_at` text NOT NULL,
	`notification_status` text DEFAULT 'pending' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `inquiries_email_created_idx` ON `inquiries` (`email`,`created_at`);