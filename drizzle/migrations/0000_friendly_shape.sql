CREATE TABLE `books_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`author` varchar(255) DEFAULT '',
	`country` varchar(255) DEFAULT '',
	`imageLink` varchar(255) DEFAULT '',
	`language` varchar(255) DEFAULT '',
	`link` varchar(255) DEFAULT '',
	`pages` int DEFAULT 0,
	`title` varchar(255) DEFAULT '',
	`description` text DEFAULT (''),
	`year` int DEFAULT 0,
	CONSTRAINT `books_table_id` PRIMARY KEY(`id`)
);
