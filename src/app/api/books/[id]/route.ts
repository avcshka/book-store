'use server';

import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { db } from "../../../../../drizzle/db/db";
import { BooksTable } from "../../../../../drizzle/db/schema";
import { IdParams } from "@/app/helpers/types/type";

export async function PUT(req: Request, { params }: IdParams) {
  const { id } = await params;
  const body = await req.json();

  await db.update(BooksTable).set(body).where(eq(BooksTable.id, Number(id)));

  return NextResponse.json({ success: true });
}

export async function DELETE(_: Request, { params }: IdParams) {
  const { id } = await params;
  await db.delete(BooksTable).where(eq(BooksTable.id, Number(id)));

  return NextResponse.json({ success: true });
}

export async function GET(_: Request, { params }: IdParams) {
  const { id } = await params;
  const [book] = await db.select().from(BooksTable).where(eq(BooksTable.id, Number(id)));

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}