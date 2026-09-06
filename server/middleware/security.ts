import { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import { logger } from "../utils/logger";

/**
 * Allowed origins resolution.
 * Supports APP_URL and CORS_ORIGIN from environment variables.
 */
const parseAllowedOrigins = (): string[] => {
  const origins = new Set<string>();
  origins.add("http://localhost:3000");
  origins.add("http://127.0.0.1:3000");

  if (process.env.APP_URL) {
    origins.add(process.env.APP_URL.trim().replace(/\/$/, ""));
  }
  if (process.env.CORS_ORIGIN) {
    process.env.CORS_ORIGIN.split(",")
      .map((s) => s.trim().replace(/\/$/, ""))
      .filter(Boolean)
      .forEach((o) => origins.add(o));
  }

  return Array.from(origins);
};

/**
 * Secure HTTP Headers configured via Helmet.
 * - Disables MIME-sniffing (X-Content-Type-Options: nosniff)
 * - Restricts referrer leakage (Referrer-Policy)
 * - Suppresses server fingerprinting (removes X-Powered-By)
 * - Enables HSTS in production environments
 * - Disables frameguard to support AI Studio preview iframe sandbox
 */
export const securityHeaders = helmet({
  contentSecurityPolicy: false, // Handled dynamically to allow Vite HMR/inline assets
  crossOriginEmbedderPolicy: false,
  frameguard: false, // Required for AI Studio container preview iframe
  xContentTypeOptions: true,
  dnsPrefetchControl: { allow: false },
  hidePoweredBy: true,
  hsts:
    process.env.NODE_ENV === "production"
      ? { maxAge: 31536000, includeSubDomains: true, preload: true }
      : false,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
});

/**
 * Robust CORS configuration.
 * Allows verified application URLs, local dev hosts, and cloud container domains.
 */
export const corsHandler = cors({
  origin: (origin, callback) => {
    // Allow non-browser agents (cURL, health checks, server-to-server) or same-origin
    if (!origin) {
      return callback(null, true);
    }

    const allowed = parseAllowedOrigins();
    const isCloudDomain =
      origin.endsWith(".run.app") ||
      origin.endsWith(".googleusercontent.com") ||
      origin.includes("localhost");

    if (allowed.includes(origin) || isCloudDomain || process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }

    logger.warn(`CORS blocked unauthorized origin request: ${origin}`);
    return callback(new Error("CORS request origin rejected by security policy"), false);
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "X-Admin-Token",
    "Accept",
  ],
  credentials: true,
  maxAge: 86400, // Cache preflight requests for 24 hours
});

/**
 * CSRF and Content-Type enforcement middleware for API endpoints.
 * Enforces JSON payload standards on mutating requests (POST, PATCH, PUT, DELETE).
 * Browsers executing cross-site form submissions cannot arbitrarily dispatch application/json,
 * providing robust protection alongside Bearer token headers.
 */
export function enforceApiCsrfProtection(req: Request, res: Response, next: NextFunction) {
  // Only check state-changing requests
  const mutatingMethods = ["POST", "PATCH", "PUT", "DELETE"];
  if (!mutatingMethods.includes(req.method)) {
    return next();
  }

  // Exempt empty payload routes if any, otherwise require application/json
  const contentType = req.headers["content-type"];
  const isJson = contentType && contentType.toLowerCase().includes("application/json");

  // If request has a body (or content-length > 0), verify JSON header
  const hasBody = req.headers["content-length"] && parseInt(req.headers["content-length"], 10) > 0;
  if (hasBody && !isJson) {
    return res.status(415).json({
      success: false,
      message: "Unsupported Media Type: Request payload must be JSON with 'Content-Type: application/json'.",
    });
  }

  // Cross-Origin Request Forgery check when Origin or Referer header is present
  const origin = req.headers.origin || req.headers.referer;
  if (origin && process.env.NODE_ENV === "production") {
    try {
      const originHost = new URL(origin).host;
      const host = req.headers.host;

      // Allow same host or valid cloud host
      if (host && originHost !== host && !originHost.endsWith(".run.app")) {
        const allowed = parseAllowedOrigins();
        const originUrl = new URL(origin).origin;
        if (!allowed.includes(originUrl)) {
          logger.warn(`CSRF protection blocked request from untrusted origin: ${origin}`);
          return res.status(403).json({
            success: false,
            message: "Request forbidden by CSRF protection policy.",
          });
        }
      }
    } catch {
      // Invalid URL in header
      return res.status(400).json({
        success: false,
        message: "Malformed Origin header provided.",
      });
    }
  }

  next();
}
