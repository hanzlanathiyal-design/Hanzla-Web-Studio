import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "3000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  studio: {
    name: "Hanzla Web Studio",
    leadEngineer: "Hanzla Nathiyal",
    contactEmail: "hanzlanathiyal@gmail.com",
    responseSlaHours: 4,
    activeClientSlots: 2,
  },
  api: {
    prefix: "/api",
  },
  database: {
    url: process.env.DATABASE_URL,
    isConfigured: Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim().length > 0),
    provider: "postgresql" as const,
  },
  email: {
    apiKey: process.env.EMAIL_API_KEY,
    from: process.env.EMAIL_FROM || "notifications@your-domain.com",
    to: process.env.EMAIL_TO || "hanzlanathiyal@gmail.com",
    isConfigured: Boolean(process.env.EMAIL_API_KEY && process.env.EMAIL_API_KEY.trim().length > 0),
  },
};
