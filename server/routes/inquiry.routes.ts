import { Router } from "express";
import { inquiryController } from "../controllers";
import { validateBody } from "../middleware";
import { InquirySchema } from "../validators";

const router = Router();

router.post("/", validateBody(InquirySchema), (req, res, next) => inquiryController.create(req, res, next));
router.get("/", (req, res, next) => inquiryController.getStats(req, res, next));

export const inquiryRoutes = router;
