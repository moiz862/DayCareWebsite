import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const enrollmentsTable = sqliteTable("enrollments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  parentName: text("parent_name").notNull(),
  parentEmail: text("parent_email").notNull(),
  parentPhone: text("parent_phone").notNull(),
  childName: text("child_name").notNull(),
  childAge: integer("child_age").notNull(),
  childDateOfBirth: text("child_date_of_birth").notNull(),
  programId: integer("program_id").notNull(),
  programName: text("program_name").notNull(),
  startDate: text("start_date").notNull(),
  specialNeeds: text("special_needs"),
  status: text("status").notNull().default("pending"),
  createdAt: integer("created_at", { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const insertEnrollmentSchema = createInsertSchema(enrollmentsTable).omit({ id: true, createdAt: true });
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollmentsTable.$inferSelect;
