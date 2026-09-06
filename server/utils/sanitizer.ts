/**
 * Input sanitization utility to protect against XSS, control-character injection,
 * and malicious payload formatting.
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== "string") {
    return "";
  }

  return input
    // Strip HTML tags and script elements
    .replace(/<[^>]*>/g, "")
    // Escape residual HTML special characters to prevent HTML/XSS injection
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    // Remove control characters (except newline, carriage return, and tab)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim();
}

export function sanitizeEmail(email: unknown): string {
  if (typeof email !== "string") {
    return "";
  }
  return email.trim().toLowerCase();
}

export function maskIpAddress(ip: string | undefined): string {
  if (!ip) return "unknown";
  const parts = ip.split(".");
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
  }
  if (ip === "::1" || ip === "127.0.0.1") return "127.0.0.xxx";
  return ip.substring(0, Math.min(ip.length, 8)) + "...";
}
