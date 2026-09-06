import { Request, Response, NextFunction } from "express";
import {
  AdminLoginSchema,
  AdminLeadsQuerySchema,
  UpdateLeadStatusSchema,
  LeadIdParamSchema,
} from "../validators/admin.validator";
import {
  getAdminEmail,
  getAdminPasswordHash,
  verifyPassword,
  generateAdminToken,
} from "../utils/auth";
import { leadDatabaseService, LeadStatus } from "../services/leadDatabase.service";
import { AuthenticatedAdminRequest } from "../middleware/adminAuth";
import { logger } from "../utils/logger";
import { ZodError } from "zod";

export class AdminController {
  /**
   * POST /api/admin/auth/login
   * Authenticates admin credentials server-side and issues signed JWT.
   * HTTP 200 on success, 400 on validation error, 401 on bad credentials.
   */
  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const parseResult = AdminLoginSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid login parameters",
          errors: parseResult.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        });
      }

      const { email, password } = parseResult.data;
      const expectedEmail = getAdminEmail();

      // Constant-time-like flow to avoid timing leaks
      const expectedHash = await getAdminPasswordHash();
      const emailMatches = email.toLowerCase().trim() === expectedEmail;
      const passwordMatches = await verifyPassword(password, expectedHash);

      if (!emailMatches || !passwordMatches) {
        logger.warn("Failed admin login attempt", {
          attemptedEmail: email,
          ip: req.socket.remoteAddress,
        });

        return res.status(401).json({
          success: false,
          message: "Invalid credentials. Please verify your administrative email and password.",
        });
      }

      const token = generateAdminToken(expectedEmail);
      logger.info("Admin logged in successfully", { email: expectedEmail });

      return res.status(200).json({
        success: true,
        message: "Authentication successful. Welcome to the private management area.",
        token,
        admin: {
          email: expectedEmail,
          role: "super_admin",
        },
      });
    } catch (error: any) {
      const errorId = logger.error("Unexpected error during admin login", error);
      return res.status(500).json({
        success: false,
        message: "An unexpected error occurred during authentication.",
        errorId,
      });
    }
  }

  /**
   * GET /api/admin/auth/me
   * Validates active admin session.
   */
  public async getCurrentAdmin(req: AuthenticatedAdminRequest, res: Response) {
    return res.status(200).json({
      success: true,
      admin: req.admin,
    });
  }

  /**
   * POST /api/admin/auth/logout
   */
  public async logout(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }

  /**
   * GET /api/admin/leads
   * Returns paginated list of leads with optional search & status filter.
   */
  public async getLeads(req: AuthenticatedAdminRequest, res: Response) {
    try {
      const queryValidation = AdminLeadsQuerySchema.safeParse(req.query);
      if (!queryValidation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid query parameters",
          errors: queryValidation.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        });
      }

      const { status, search, page, limit } = queryValidation.data;
      const skip = (page - 1) * limit;

      const filterStatus =
        status && status !== "ALL" ? (status as LeadStatus) : undefined;

      const [leads, total, stats] = await Promise.all([
        leadDatabaseService.getLeads({
          status: filterStatus,
          search,
          limit,
          skip,
        }),
        leadDatabaseService.countLeads({
          status: filterStatus,
          search,
        }),
        leadDatabaseService.getLeadStats(),
      ]);

      const totalPages = Math.ceil(total / limit) || 1;

      return res.status(200).json({
        success: true,
        leads,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
        stats,
      });
    } catch (error: any) {
      const errorId = logger.error("Failed to query leads for admin", error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve leads from database.",
        errorId,
      });
    }
  }

  /**
   * GET /api/admin/leads/:id
   * View detailed lead information.
   */
  public async getLeadById(req: AuthenticatedAdminRequest, res: Response) {
    try {
      const paramValidation = LeadIdParamSchema.safeParse(req.params);
      if (!paramValidation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid lead ID parameter",
        });
      }

      const { id } = paramValidation.data;
      const lead = await leadDatabaseService.getLeadById(id);

      if (!lead) {
        return res.status(404).json({
          success: false,
          message: `Lead with ID '${id}' not found.`,
        });
      }

      return res.status(200).json({
        success: true,
        lead,
      });
    } catch (error: any) {
      const errorId = logger.error(`Failed to get lead ${req.params.id}`, error);
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve lead details.",
        errorId,
      });
    }
  }

  /**
   * PATCH /api/admin/leads/:id/status
   * Updates lead pipeline status (NEW, CONTACTED, QUALIFIED, CLOSED).
   */
  public async updateLeadStatus(req: AuthenticatedAdminRequest, res: Response) {
    try {
      const paramValidation = LeadIdParamSchema.safeParse(req.params);
      if (!paramValidation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid lead ID parameter",
        });
      }

      const bodyValidation = UpdateLeadStatusSchema.safeParse(req.body);
      if (!bodyValidation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid status value",
          errors: bodyValidation.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        });
      }

      const { id } = paramValidation.data;
      const { status } = bodyValidation.data;

      const updated = await leadDatabaseService.updateLeadStatus(id, status as LeadStatus);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: `Lead with ID '${id}' not found.`,
        });
      }

      logger.info(`Admin updated lead ${id} status to ${status}`, {
        admin: req.admin?.email,
        leadId: id,
        newStatus: status,
      });

      return res.status(200).json({
        success: true,
        message: `Lead status successfully updated to ${status}`,
        lead: updated,
      });
    } catch (error: any) {
      const errorId = logger.error(`Failed to update lead status ${req.params.id}`, error);
      return res.status(500).json({
        success: false,
        message: "Failed to update lead status.",
        errorId,
      });
    }
  }

  /**
   * DELETE /api/admin/leads/:id
   * Permanently removes lead record from database.
   */
  public async deleteLead(req: AuthenticatedAdminRequest, res: Response) {
    try {
      const paramValidation = LeadIdParamSchema.safeParse(req.params);
      if (!paramValidation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid lead ID parameter",
        });
      }

      const { id } = paramValidation.data;
      const deleted = await leadDatabaseService.deleteLead(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: `Lead with ID '${id}' not found or could not be removed.`,
        });
      }

      logger.info(`Admin deleted lead ${id}`, {
        admin: req.admin?.email,
        leadId: id,
      });

      return res.status(200).json({
        success: true,
        message: `Lead record ${id} has been permanently deleted.`,
      });
    } catch (error: any) {
      const errorId = logger.error(`Failed to delete lead ${req.params.id}`, error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete lead record.",
        errorId,
      });
    }
  }
}

export const adminController = new AdminController();
