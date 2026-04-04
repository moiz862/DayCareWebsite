import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const programsTable = sqliteTable("programs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  ageRange: text("age_range").notNull(),
  description: text("description").notNull(),
  schedule: text("schedule").notNull(),
  monthlyFee: real("monthly_fee").notNull(),
  capacity: integer("capacity").notNull(),
  enrolled: integer("enrolled").notNull().default(0),
  imageUrl: text("image_url"),
  features: text("features", { mode: 'json' }).$type<string[]>().notNull().default([]),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const insertProgramSchema = createInsertSchema(programsTable).omit({ id: true, createdAt: true });
export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type Program = typeof programsTable.$inferSelect;
