/**
 * Safe server-side logger that redacts sensitive personal information (PII)
 * and prevents leaking internal paths, keys, or stack traces.
 */
export const logger = {
  info(message: string, meta?: Record<string, any>) {
    console.log(`[INFO] [${new Date().toISOString()}] ${message}`, meta ? sanitizeLogMeta(meta) : "");
  },

  warn(message: string, meta?: Record<string, any>) {
    console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, meta ? sanitizeLogMeta(meta) : "");
  },

  error(message: string, error?: any, meta?: Record<string, any>): string {
    const errorId = `ERR-${Math.floor(100000 + Math.random() * 900000)}`;
    const safeErrorDetails = {
      errorId,
      message: error?.message || String(error),
      code: error?.code,
      name: error?.name,
      timestamp: new Date().toISOString(),
      ...(meta ? sanitizeLogMeta(meta) : {}),
    };
    console.error(`[ERROR] [${new Date().toISOString()}] ${message} [ErrorID: ${errorId}]:`, safeErrorDetails);
    return errorId;
  },
};

function sanitizeLogMeta(meta: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(meta)) {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes("email")) {
      sanitized[key] = typeof value === "string" ? maskEmail(value) : "[REDACTED]";
    } else if (
      lowerKey.includes("phone") ||
      lowerKey.includes("pass") ||
      lowerKey.includes("token") ||
      lowerKey.includes("secret") ||
      lowerKey.includes("key")
    ) {
      sanitized[key] = "[REDACTED]";
    } else if (lowerKey.includes("message") && typeof value === "string") {
      sanitized[key] = value.length > 60 ? `${value.substring(0, 60)}... [truncated]` : value;
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

function maskEmail(email: string): string {
  const parts = email.split("@");
  if (parts.length !== 2) return "[INVALID_EMAIL]";
  const [user, domain] = parts;
  const maskedUser = user.length > 2 ? `${user[0]}***${user[user.length - 1]}` : `${user[0]}***`;
  return `${maskedUser}@${domain}`;
}
