import { Request, Response, NextFunction } from "express";
import { projectService } from "../services/project.service";
import { ProjectQuerySchema, ProjectSlugParamSchema } from "../validators/project.validator";
import { logger } from "../utils/logger";
import { ZodError } from "zod";

export class ProjectController {
  /**
   * GET /api/projects
   * Returns list of static portfolio projects.
   * HTTP 200
   */
  public async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const queryValidation = ProjectQuerySchema.safeParse(req.query);
      if (!queryValidation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid query parameters",
          errors: queryValidation.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      const projects = projectService.getProjects(queryValidation.data);

      return res.status(200).json({
        success: true,
        count: projects.length,
        projects,
      });
    } catch (error: any) {
      const errorId = logger.error("Failed to retrieve portfolio projects", error, {
        path: req.originalUrl,
      });

      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred while retrieving projects.",
        errorId,
      });
    }
  }

  /**
   * GET /api/projects/:slug
   * Returns details for a single portfolio project by slug.
   * HTTP 200 if found, 400 if invalid slug format, 404 if not found, 500 if server error.
   */
  public async getProjectBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const paramValidation = ProjectSlugParamSchema.safeParse(req.params);
      if (!paramValidation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid project slug parameter",
          errors: paramValidation.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      const { slug } = paramValidation.data;
      const project = projectService.getProjectBySlug(slug);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: `Portfolio project not found with slug '${slug}'`,
        });
      }

      return res.status(200).json({
        success: true,
        project,
      });
    } catch (error: any) {
      const errorId = logger.error(
        `Failed to retrieve project by slug '${req.params.slug}'`,
        error,
        { path: req.originalUrl }
      );

      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred while retrieving the project.",
        errorId,
      });
    }
  }
}

export const projectController = new ProjectController();
