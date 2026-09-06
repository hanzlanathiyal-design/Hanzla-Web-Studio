import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Invalid request payload",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const statusCode = typeof err.status === "number" ? err.status : typeof err.statusCode === "number" ? err.statusCode : 500;

  // Redacted, safe server-side error logging
  const errorId = logger.error(`Unhandled error at ${req.method} ${req.originalUrl}`, err, {
    method: req.method,
    url: req.originalUrl,
    statusCode,
  });

  // In production or on 500 errors, never leak raw stack traces or internal implementation details
  const isSensitive =
    err.message &&
    /(password|secret|jwt|token|database|prisma|postgres|sql|select|insert|update|delete|table|column)/i.test(
      err.message
    );

  const safeMessage =
    statusCode >= 500 || (process.env.NODE_ENV === "production" && isSensitive)
      ? "An unexpected error occurred while processing your request. Please try again or contact support."
      : isSensitive
      ? "Database operation failed. Request could not be completed."
      : err.message || "Request could not be completed";

  return res.status(statusCode).json({
    success: false,
    message: safeMessage,
    errorId,
  });
};
