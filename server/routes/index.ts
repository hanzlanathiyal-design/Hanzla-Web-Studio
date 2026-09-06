import { Router } from "express";
import { contactRoutes } from "./contact.routes";
import { projectRoutes } from "./project.routes";
import { inquiryRoutes } from "./inquiry.routes";
import { auditRoutes } from "./audit.routes";
import { scheduleRoutes } from "./schedule.routes";
import { healthRoutes } from "./health.routes";
import { adminRoutes } from "./admin.routes";

const apiRouter = Router();

apiRouter.use("/health", healthRoutes);
apiRouter.use("/contact", contactRoutes);
apiRouter.use("/projects", projectRoutes);
apiRouter.use("/admin", adminRoutes);
apiRouter.use("/inquiries", inquiryRoutes);
apiRouter.use("/audit", auditRoutes);
apiRouter.use("/schedule", scheduleRoutes);

export { apiRouter };



