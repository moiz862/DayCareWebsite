import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const galleryTable = sqliteTable("gallery", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  caption: text("caption").notNull(),
  category: text("category").notNull(),
});

export const insertGallerySchema = createInsertSchema(galleryTable).omit({ id: true });
export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type Gallery = typeof galleryTable.$inferSelect;
