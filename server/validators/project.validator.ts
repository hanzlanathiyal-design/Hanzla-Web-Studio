import { z } from "zod";

export const ProjectSlugParamSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2, { message: "Slug must be at least 2 characters" })
    .max(60, { message: "Slug must not exceed 60 characters" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens",
    }),
});

export const ProjectQuerySchema = z.object({
  industry: z.string().trim().optional(),
  projectType: z.string().trim().optional(),
  limit: z.coerce.number().int().min(1).max(50).optional(),
});

export type ProjectSlugParam = z.infer<typeof ProjectSlugParamSchema>;
export type ProjectQuery = z.infer<typeof ProjectQuerySchema>;
