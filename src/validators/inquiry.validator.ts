import { InquiryPayload } from "../types";

export interface ValidationError {
  field: string;
  message: string;
}

export function validateInquiryPayload(payload: Partial<InquiryPayload>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!payload.name || payload.name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!payload.email || !emailRegex.test(payload.email.trim())) {
    errors.push({ field: "email", message: "Please enter a valid work email address" });
  }

  if (!payload.industry || payload.industry.trim().length === 0) {
    errors.push({ field: "industry", message: "Please select an industry" });
  }

  if (!payload.projectType || payload.projectType.trim().length === 0) {
    errors.push({ field: "projectType", message: "Please select a project type" });
  }

  if (!payload.budget || payload.budget.trim().length === 0) {
    errors.push({ field: "budget", message: "Please select an estimated budget" });
  }

  return errors;
}
