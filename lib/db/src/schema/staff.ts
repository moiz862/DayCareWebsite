import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const staffTable = sqliteTable("staff", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  yearsExperience: integer("years_experience").notNull(),
  education: text("education").notNull(),
  imageUrl: text("image_url"),
  certifications: text("certifications", { mode: 'json' }).$type<string[]>().notNull().default([]),
});

export const insertStaffSchema = createInsertSchema(staffTable).omit({ id: true });
export type InsertStaff = z.infer<typeof insertStaffSchema>;
export type Staff = typeof staffTable.$inferSelect;
