import { int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

export const BooksTable = mysqlTable("books_table", {
  id: int('id').primaryKey().autoincrement(),
  author: varchar({ length: 255 }).notNull(),
  country: varchar({ length: 255 }).notNull(),
  imageLink: varchar({ length: 255 }).default(''),
  language: varchar({ length: 255 }).default(''),
  link: varchar({ length: 255 }).default(''),
  pages: int().default(0),
  title: varchar({ length: 255 }).notNull(),
  description: text().default('').notNull(),
  year: int().default(0),
});

export const schema = { BooksTable }