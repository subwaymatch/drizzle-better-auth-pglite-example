import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import * as schema from "./schema";

export const pglite = new PGlite();
export const db = drizzle(pglite, { schema });

// Initialize the database with tables
const initDb = async () => {
  try {
    // Create the notes table
    await pglite.exec(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        text VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
};

initDb();
