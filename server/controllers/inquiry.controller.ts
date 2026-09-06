import { Request, Response, NextFunction } from "express";
import { inquiryService } from "../services";

export class InquiryController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const record = await inquiryService.createInquiry(req.body);
      return res.status(201).json({
        success: true,
        message: "Inquiry received successfully! Hanzla Nathiyal will review your project and reply within 4 business hours.",
        referenceId: record.id,
        inquiry: record,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await inquiryService.getPublicStats();
      return res.json(stats);
    } catch (error) {
      next(error);
    }
  }
}

export const inquiryController = new InquiryController();
