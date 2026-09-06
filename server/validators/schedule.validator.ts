import { z } from "zod";

export const ScheduleSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  date: z.string().min(1, "Please select a date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  projectBrief: z.string().optional(),
});

export type ScheduleInput = z.infer<typeof ScheduleSchema>;
