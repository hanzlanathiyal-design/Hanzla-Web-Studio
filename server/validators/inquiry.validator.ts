import { z } from "zod";

export const InquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  businessName: z.string().optional(),
  company: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phoneOrWhatsApp: z.string().optional(),
  businessType: z.string().optional(),
  industry: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budgetRange: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional().default("Flexible"),
  message: z.string().min(1, "Message is required"),
});

export type InquiryInput = z.infer<typeof InquirySchema>;
