import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const testimonialsTable = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  parentName: text("parent_name").notNull(),
  childName: text("child_name").notNull(),
  rating: integer("rating").notNull(),
  review: text("review").notNull(),
  programName: text("program_name").notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const insertTestimonialSchema = createInsertSchema(testimonialsTable).omit({ id: true, createdAt: true });
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonialsTable.$inferSelect;
