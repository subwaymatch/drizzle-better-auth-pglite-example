import { db } from "@/lib/db";
import { notesTable } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// DELETE a note by ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const noteId = parseInt(id);

    if (isNaN(noteId)) {
      return NextResponse.json({ error: "Invalid note ID" }, { status: 400 });
    }

    await db.delete(notesTable).where(eq(notesTable.id, noteId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
