import { z } from "zod";
import { sanitizeString, sanitizeEmail } from "../utils/sanitizer";

export const ContactSchema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .transform(sanitizeString)
      .pipe(
        z
          .string()
          .min(1, "Name is required")
          .max(100, "Name cannot exceed 100 characters")
      ),
    businessName: z
      .string({ message: "Business name is required" })
      .transform(sanitizeString)
      .pipe(
        z
          .string()
          .min(1, "Business name is required")
          .max(120, "Business name cannot exceed 120 characters")
      ),
    email: z
      .string({ message: "Valid email is required" })
      .transform(sanitizeEmail)
      .pipe(
        z
          .string()
          .email("Please provide a valid email address (e.g. name@company.com)")
          .max(254, "Email cannot exceed 254 characters")
      ),
    phone: z
      .string()
      .optional()
      .transform((val) => (val ? sanitizeString(val) : undefined)),
    phoneOrWhatsApp: z
      .string()
      .optional()
      .transform((val) => (val ? sanitizeString(val) : undefined)),
    businessType: z
      .string()
      .optional()
      .transform((val) => (val ? sanitizeString(val) : "Professional & Legal Services")),
    projectType: z
      .string()
      .optional()
      .transform((val) => (val ? sanitizeString(val) : "Business Websites")),
    budget: z
      .string()
      .optional()
      .transform((val) => (val ? sanitizeString(val) : "Flexible / Need Advice")),
    budgetRange: z
      .string()
      .optional()
      .transform((val) => (val ? sanitizeString(val) : undefined)),
    message: z
      .string({ message: "Message is required" })
      .transform(sanitizeString)
      .pipe(
        z
          .string()
          .min(1, "Message is required")
          .max(3000, "Message cannot exceed 3000 characters")
      ),
  })
  .transform((data) => ({
    ...data,
    phone: data.phone || data.phoneOrWhatsApp,
    budget: data.budgetRange || data.budget || "Flexible / Need Advice",
  }));


export type ContactInput = z.infer<typeof ContactSchema>;
