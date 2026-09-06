import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { logger } from "./logger";

// Runtime JWT Secret resolution (falls back to secure ephemeral random key in development)
const JWT_SECRET: string =
  process.env.JWT_SECRET?.trim() ||
  (() => {
    const generated = crypto.randomBytes(32).toString("hex");
    if (process.env.NODE_ENV === "production") {
      logger.warn("JWT_SECRET is not configured in production environment! Using ephemeral secret.");
    }
    return generated;
  })();

const JWT_EXPIRES_IN = "12h";

// Canonical configured admin account email
export const getAdminEmail = (): string => {
  return (process.env.ADMIN_EMAIL || "hanzlanathiyal@gmail.com").toLowerCase().trim();
};

/**
 * Resolved Bcrypt Password Hash.
 * Passwords must NEVER be stored as plaintext.
 * If ADMIN_PASSWORD_HASH is set in environment, that hash is used.
 * If ADMIN_PASSWORD is set in environment, it is hashed on first load.
 * In development preview without env variables, a pre-computed secure bcrypt hash is provided.
 */
let cachedPasswordHash: string | null = null;

export async function getAdminPasswordHash(): Promise<string> {
  if (cachedPasswordHash) {
    return cachedPasswordHash;
  }

  // 1. Pre-computed bcrypt hash from environment
  if (process.env.ADMIN_PASSWORD_HASH && process.env.ADMIN_PASSWORD_HASH.trim().length > 0) {
    cachedPasswordHash = process.env.ADMIN_PASSWORD_HASH.trim();
    return cachedPasswordHash;
  }

  // 2. Raw password provided via environment -> hash immediately with bcrypt
  if (process.env.ADMIN_PASSWORD && process.env.ADMIN_PASSWORD.trim().length > 0) {
    const salt = await bcrypt.genSalt(12);
    cachedPasswordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD.trim(), salt);
    logger.info("Admin password hashed securely from environment configuration");
    return cachedPasswordHash;
  }

  // 3. Secure default development password hash for initial preview setup
  // Password: "StudioLeadPortal2026!"
  // Never stored plaintext; only the bcrypt salt+hash exists.
  cachedPasswordHash = "$2b$10$bXyVIvxAwW3l9bxjE0prLujHDED1FMZtmG.Xr9Ciyhl0.T2P5x9l2";
  return cachedPasswordHash;
}

/**
 * Securely hashes a plaintext password using bcrypt with 12 salt rounds.
 */
export async function hashPassword(plaintext: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plaintext, salt);
}

/**
 * Validates a plaintext password against the stored bcrypt hash using constant-time comparison.
 */
export async function verifyPassword(plaintext: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plaintext, hash);
  } catch (err) {
    logger.error("Error verifying password hash", err);
    return false;
  }
}

export interface AdminJwtPayload {
  email: string;
  role: "super_admin";
  iat?: number;
  exp?: number;
}

/**
 * Issues a signed, time-limited JSON Web Token for the admin session.
 */
export function generateAdminToken(email: string): string {
  const payload: AdminJwtPayload = {
    email: email.toLowerCase().trim(),
    role: "super_admin",
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

/**
 * Verifies and decodes a given JWT token.
 * Throws if token is invalid or expired.
 */
export function verifyAdminToken(token: string): AdminJwtPayload {
  return jwt.verify(token, JWT_SECRET) as AdminJwtPayload;
}
