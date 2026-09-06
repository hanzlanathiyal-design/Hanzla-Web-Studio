import { Request, Response, NextFunction } from "express";
import { contactService } from "../services/contact.service";
import { logger } from "../utils/logger";
import { ZodError } from "zod";

export class ContactController {
  public async submitContact(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await contactService.createLead(req.body);

      return res.status(201).json({
        success: true,
        message:
          "Thank you! Your inquiry has been securely received. Lead engineer Hanzla Nathiyal will review your project and reply within 4 business hours.",
        referenceId: result.referenceId,
        lead: result.lead,
      });
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed on the submitted information.",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      // Safe server logging with redaction
      const errorId = logger.error("Failed to process contact submission", error, {
        path: req.originalUrl,
        method: req.method,
      });

      // Safe client response - no internal stack traces or database info leaked
      return res.status(500).json({
        success: false,
        message:
          "An unexpected server error occurred while processing your request. Please try again or reach out directly at hanzlanathiyal@gmail.com.",
        errorId,
      });
    }
  }
}

export const contactController = new ContactController();
