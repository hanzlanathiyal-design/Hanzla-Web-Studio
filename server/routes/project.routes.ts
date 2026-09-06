import { Router } from "express";
import { projectController } from "../controllers/project.controller";

const router = Router();

/**
 * GET /api/projects
 * List all static portfolio projects
 */
router.get("/", (req, res, next) => projectController.getProjects(req, res, next));

/**
 * GET /api/projects/:slug
 * Retrieve a specific portfolio project by slug
 */
router.get("/:slug", (req, res, next) => projectController.getProjectBySlug(req, res, next));

export const projectRoutes = router;
