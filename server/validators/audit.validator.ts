import { z } from "zod";

export const AuditRequestSchema = z.object({
  url: z.string().min(3, "Please provide a website URL or company domain"),
  industry: z.string().default("General Business"),
  primaryGoal: z.string().default("Increase Conversions"),
});

export type AuditRequestInput = z.infer<typeof AuditRequestSchema>;
