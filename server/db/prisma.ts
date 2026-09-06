import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger";

declare global {
  // Prevent multiple instances of Prisma Client in development / module reload
  var __prismaClientInstance: PrismaClient | undefined;
}

/**
 * Lazy initialization of Prisma Client.
 * Reads DATABASE_URL strictly from environment variables - never hardcoded.
 */
export function getPrisma(): PrismaClient | null {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    return null;
  }

  if (!global.__prismaClientInstance) {
    try {
      global.__prismaClientInstance = new PrismaClient({
        datasources: {
          db: {
            url: databaseUrl,
          },
        },
        log:
          process.env.NODE_ENV === "development"
            ? [
                { emit: "event", level: "warn" },
                { emit: "event", level: "error" },
              ]
            : [{ emit: "event", level: "error" }],
      });

      logger.info("Prisma PostgreSQL client initialized successfully (lazy loaded)");
    } catch (err) {
      logger.error("Failed to initialize Prisma Client", err);
      return null;
    }
  }

  return global.__prismaClientInstance;
}

/**
 * Check if the PostgreSQL database connection string is available in environment.
 */
export function isPostgresConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0);
}
