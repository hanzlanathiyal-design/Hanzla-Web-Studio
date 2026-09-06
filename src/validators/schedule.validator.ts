import { ValidationError } from "./inquiry.validator";

export function validateAuditUrl(url: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const trimmed = url.trim();

  if (!trimmed || trimmed.length < 3) {
    errors.push({ field: "url", message: "Please enter a valid website domain or URL" });
  }

  return errors;
}

export function validateSchedulePayload(data: { name: string; email: string; date: string; timeSlot: string }): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push({ field: "name", message: "Please provide your full name" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.push({ field: "email", message: "Please enter a valid email address" });
  }

  if (!data.date) {
    errors.push({ field: "date", message: "Please choose a preferred date" });
  }

  if (!data.timeSlot) {
    errors.push({ field: "timeSlot", message: "Please choose an available time slot" });
  }

  return errors;
}
