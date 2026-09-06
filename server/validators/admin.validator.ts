import { z } from "zod";

export const AdminLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid admin email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" }),
});

export const UpdateLeadStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "CLOSED"]),
});

export const AdminLeadsQuerySchema = z.object({
  status: z.enum(["ALL", "NEW", "CONTACTED", "QUALIFIED", "CLOSED"]).optional(),
  search: z.string().trim().max(100).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const LeadIdParamSchema = z.object({
  id: z.string().trim().min(2, { message: "Invalid lead ID parameter" }),
});

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;
export type UpdateLeadStatusInput = z.infer<typeof UpdateLeadStatusSchema>;
export type AdminLeadsQueryInput = z.infer<typeof AdminLeadsQuerySchema>;
export type LeadIdParam = z.infer<typeof LeadIdParamSchema>;
