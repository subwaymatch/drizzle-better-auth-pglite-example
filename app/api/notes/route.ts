import { db } from "@/lib/db";
import { notesTable } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

// GET all notes
export async function GET() {
  try {
    const notes = await db
      .select()
      .from(notesTable)
      .orderBy(desc(notesTable.createdAt));
    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

// POST - Create a new note
export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const newNote = await db.insert(notesTable).values({ text }).returning();

    return NextResponse.json(newNote[0], { status: 201 });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
