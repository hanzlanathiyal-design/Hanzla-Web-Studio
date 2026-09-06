import { Request, Response, NextFunction } from "express";
import { auditService } from "../services";

export class AuditController {
  public async analyze(req: Request, res: Response, next: NextFunction) {
    try {
      const auditResult = await auditService.generateAudit(req.body);
      return res.json({
        success: true,
        audit: auditResult,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const auditController = new AuditController();
