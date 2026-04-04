import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, galleryTable } from "@workspace/db";
import { ListGalleryResponse } from "@workspace/api-zod";
import multer from "multer";
import path from "path";
import fs from "fs";

const router: IRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

router.get("/gallery", async (_req, res): Promise<void> => {
  const photos = await db.select().from(galleryTable).orderBy(galleryTable.id);
  res.json(ListGalleryResponse.parse(photos));
});

router.post("/gallery", upload.single('image'), async (req, res): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "Image file is required" });
    return;
  }
  
  const { caption, category } = req.body;
  if (!caption || !category) {
    res.status(400).json({ error: "Caption and category are required" });
    return;
  }

  const url = `/api/uploads/${req.file.filename}`;

  const [photo] = await db.insert(galleryTable).values({
    url,
    caption,
    category
  }).returning();
  
  res.status(201).json(photo);
});

router.delete("/gallery/:id", async (req, res): Promise<void> => {
  const idValue = parseInt(req.params.id, 10);
  if (isNaN(idValue)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  // Find the photo first to get its URL for deletion from disk
  const [photo] = await db.select().from(galleryTable).where(eq(galleryTable.id, idValue));
  
  if (!photo) {
    res.status(404).json({ error: "Photo not found" });
    return;
  }

  // Delete from database
  const [deletedPhoto] = await db.delete(galleryTable).where(eq(galleryTable.id, idValue)).returning();
  
  // If deletion from DB was successful, delete the physical file
  if (deletedPhoto) {
    const filename = deletedPhoto.url.split("/").pop();
    if (filename) {
      const filePath = path.join(process.cwd(), "uploads", filename);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.error("Failed to delete physical file:", filePath, err);
        // We still return 204 because the DB entry is gone
      }
    }
  }

  res.status(204).send();
});

export default router;
