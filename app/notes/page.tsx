"use client";

import { useState, useEffect } from "react";

type Note = {
  id: number;
  text: string | null;
  createdAt: Date | null;
};

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/notes");
      const data = await response.json();

      // Check if data is an array, otherwise set empty array
      if (Array.isArray(data)) {
        setNotes(data);
      } else {
        console.error("Received non-array data:", data);
        setNotes([]);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setNotes([]);
    }
  };

  // Add note
  const addNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newNote }),
      });

      if (response.ok) {
        setNewNote("");
        await fetchNotes();
      }
    } catch (error) {
      console.error("Failed to add note:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete note
  const deleteNote = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchNotes();
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Notes</h1>

        {/* Add Note Form */}
        <form onSubmit={addNote} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Enter a new note..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newNote.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </form>

        {/* Notes List */}
        <div className="space-y-3">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No notes yet. Add your first note above!
            </p>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <p className="text-gray-800">{note.text}</p>
                  {note.createdAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(note.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  disabled={loading}
                  className="ml-4 px-3 py-1 text-red-500 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
