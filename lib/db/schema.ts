import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const notesTable = pgTable("notes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: varchar({ length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});
