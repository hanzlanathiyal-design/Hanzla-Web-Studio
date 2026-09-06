import { Request, Response, NextFunction } from "express";

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

/**
 * In-memory sliding window rate limiter per client IP.
 * Defaults to max 5 submissions per 10 minutes to protect against spam / DoS.
 */
export function createRateLimiter(options: {
  windowMs: number;
  maxRequests: number;
  message?: string;
}) {
  const ipStore = new Map<string, RateLimitRecord>();

  // Periodically clean up expired records
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipStore.entries()) {
      if (now > record.resetTime) {
        ipStore.delete(ip);
      }
    }
  }, 60000);

  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }

  return (req: Request, res: Response, next: NextFunction) => {
    // Determine client IP safely
    const forwardedHeader = req.headers["x-forwarded-for"];
    const forwardedIp = Array.isArray(forwardedHeader)
      ? forwardedHeader[0]
      : typeof forwardedHeader === "string"
      ? forwardedHeader.split(",")[0].trim()
      : null;

    const clientIp = forwardedIp || req.socket?.remoteAddress || "127.0.0.1";

    // Allow test suites and localhost dev verification to proceed without getting blocked by anti-spam limits
    if (process.env.NODE_ENV !== "production" && (req.headers["x-internal-test"] === "true" || clientIp === "127.0.0.1" || clientIp === "::1")) {
      return next();
    }

    const now = Date.now();
    let record = ipStore.get(clientIp);

    if (!record || now > record.resetTime) {
      record = {
        count: 1,
        resetTime: now + options.windowMs,
      };
      ipStore.set(clientIp, record);
    } else {
      record.count += 1;
    }

    const remaining = Math.max(0, options.maxRequests - record.count);
    const resetSeconds = Math.ceil((record.resetTime - now) / 1000);

    res.setHeader("X-RateLimit-Limit", options.maxRequests);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", resetSeconds);

    if (record.count > options.maxRequests) {
      res.setHeader("Retry-After", resetSeconds);
      return res.status(429).json({
        success: false,
        message:
          options.message ||
          "Rate limit exceeded: Too many requests from your network. Please wait a few minutes before trying again.",
        retryAfterSeconds: resetSeconds,
      });
    }

    next();
  };
}

/**
 * General API rate limiter (protects all /api endpoints from DoS).
 * 300 requests per 15 minutes per IP.
 */
export const generalApiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 300,
  message: "Too many requests to the studio API. Please wait a few minutes before trying again.",
});

/**
 * Strict contact inquiry submission limiter.
 * 5 submissions per 10 minutes per IP.
 */
export const contactSubmissionLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  maxRequests: 5,
  message:
    "Rate limit exceeded: Too many inquiry submissions from your network. Please wait 10 minutes before submitting again or reach out directly at hanzlanathiyal@gmail.com.",
});

/**
 * Strict admin authentication limiter to prevent credential stuffing / brute force attacks.
 * 5 attempts per 15 minutes per IP.
 */
export const adminLoginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
  message:
    "Too many administrative login attempts from this network. For security reasons, please wait 15 minutes before attempting again.",
});
