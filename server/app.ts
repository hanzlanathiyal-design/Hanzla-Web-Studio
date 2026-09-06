import express, { Express } from "express";
import { apiRouter } from "./routes";
import {
  errorHandler,
  requestLogger,
  securityHeaders,
  corsHandler,
  generalApiLimiter,
  enforceApiCsrfProtection,
} from "./middleware";
import { config } from "./config";

export function createApp(): Express {
  const app = express();

  // Trust reverse proxy for accurate client IP resolution (needed for rate limiting & secure cookies)
  app.set("trust proxy", 1);

  // Apply Secure HTTP Response Headers (Helmet)
  app.use(securityHeaders);

  // Apply Cross-Origin Resource Sharing (CORS) rules
  app.use(corsHandler);

  // Safe request body parsers with strict size limits to prevent memory exhaustion / DoS
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  // Audit logging for API requests
  app.use(requestLogger);

  // API-specific defenses: Rate Limiting & CSRF verification
  app.use(config.api.prefix, generalApiLimiter);
  app.use(config.api.prefix, enforceApiCsrfProtection);

  // Mount API routes
  app.use(config.api.prefix, apiRouter);

  // Centralized Error handling middleware (catches unhandled exceptions, suppresses stack traces)
  app.use(errorHandler);

  return app;
}
