import { Router } from "express";
import { scheduleController } from "../controllers";
import { validateBody } from "../middleware";
import { ScheduleSchema } from "../validators";

const router = Router();

router.post("/", validateBody(ScheduleSchema), (req, res, next) => scheduleController.book(req, res, next));
router.get("/", (req, res, next) => scheduleController.list(req, res, next));

export const scheduleRoutes = router;
