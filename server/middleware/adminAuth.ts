import { Request, Response, NextFunction } from "express";
import { verifyAdminToken, AdminJwtPayload } from "../utils/auth";
import { logger } from "../utils/logger";

export interface AuthenticatedAdminRequest extends Request {
  admin?: AdminJwtPayload;
}

/**
 * Server-side middleware requiring valid Admin JWT session.
 * Protects all private admin lead management APIs.
 * Returns HTTP 401 Unauthorized if missing, malformed, or expired.
 */
export function requireAdminAuth(
  req: AuthenticatedAdminRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7).trim();
    } else if (req.headers["x-admin-token"]) {
      token = String(req.headers["x-admin-token"]).trim();
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in to access the private lead management area.",
      });
    }

    const payload = verifyAdminToken(token);
    req.admin = payload;
    return next();
  } catch (err: any) {
    logger.warn("Admin authorization failed", {
      path: req.originalUrl,
      reason: err?.message || "Invalid or expired token",
    });

    return res.status(401).json({
      success: false,
      message: "Your admin session is invalid or has expired. Please log in again.",
    });
  }
}
