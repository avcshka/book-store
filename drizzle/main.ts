import { BooksTable } from "./db/schema";
import { db } from "./db/db";
import booksData from "./static/bookstore_real_books.json";

interface IRawJsonData {
  author: string,
  country: string,
  imageLink: string,
  language: string,
  link: string,
  pages: number,
  title: string,
  year: number,
  description: string,
}

async function main() {
  const books: IRawJsonData[] = booksData.Books.map((book: IRawJsonData) => book);

  await db.insert(BooksTable).values(books).then(() => {
    console.log("Db inserted successfully.");
  });
}

main().catch((err) => {
  console.error("Error on inserting:", err);
});