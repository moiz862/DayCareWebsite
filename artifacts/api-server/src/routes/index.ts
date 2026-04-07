import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import programsRouter from "./programs.js";
import enrollmentsRouter from "./enrollments.js";
import staffRouter from "./staff.js";
import galleryRouter from "./gallery.js";
import testimonialsRouter from "./testimonials.js";
import eventsRouter from "./events.js";
import contactRouter from "./contact.js";
import statsRouter from "./stats.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(programsRouter);
router.use(enrollmentsRouter);
router.use(staffRouter);
router.use(galleryRouter);
router.use(testimonialsRouter);
router.use(eventsRouter);
router.use(contactRouter);
router.use(statsRouter);

export default router;
