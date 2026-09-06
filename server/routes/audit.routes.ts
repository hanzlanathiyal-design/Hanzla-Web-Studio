import { Router } from "express";
import { auditController } from "../controllers";
import { validateBody } from "../middleware";
import { AuditRequestSchema } from "../validators";

const router = Router();

router.post("/", validateBody(AuditRequestSchema), (req, res, next) => auditController.analyze(req, res, next));

export const auditRoutes = router;
