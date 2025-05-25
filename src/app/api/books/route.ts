'use server'
import { db } from "../../../../drizzle/db/db";
import { NextResponse } from "next/server";
import { IBook } from "@/app/helpers/types/type";
import { BooksTable } from "../../../../drizzle/db/schema";
import { like, or } from "drizzle-orm";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchTerm = url.searchParams.get('search')?.toLowerCase() || '';

  let books: IBook[];

  if (searchTerm) {
    books = await db.select()
      .from(BooksTable)
      .where(
        or(
          like(BooksTable.title, `%${ searchTerm }%`),
        )
      );
  } else {
    books = await db.query.BooksTable.findMany();
  }

  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const body = await req.json();
  const [created] = await db.insert(BooksTable).values(body);

  return NextResponse.json(created);
}
