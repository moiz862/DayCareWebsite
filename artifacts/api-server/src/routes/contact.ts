import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, contactTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/contact", async (_req, res): Promise<void> => {
  const contacts = await db.select().from(contactTable).orderBy(contactTable.createdAt);
  res.json(contacts);
});

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [msg] = await db.insert(contactTable).values(parsed.data).returning();
  res.status(201).json(msg);
});

router.delete("/contact/:id", async (req, res): Promise<void> => {
  const idValue = parseInt(req.params.id, 10);
  if (isNaN(idValue)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [deletedMsg] = await db.delete(contactTable).where(eq(contactTable.id, idValue)).returning();
  if (!deletedMsg) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }
  res.status(204).send();
});

export default router;
