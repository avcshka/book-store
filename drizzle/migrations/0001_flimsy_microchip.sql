ALTER TABLE `books_table` MODIFY COLUMN `author` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `books_table` MODIFY COLUMN `country` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `books_table` MODIFY COLUMN `title` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `books_table` MODIFY COLUMN `description` text NOT NULL DEFAULT ('');