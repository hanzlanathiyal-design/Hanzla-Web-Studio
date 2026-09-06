import { ContactInput } from "../validators/contact.validator";
import { leadDatabaseService } from "./leadDatabase.service";
import { emailService } from "./email.service";
import { db } from "../db";
import { logger } from "../utils/logger";

export interface SafeLeadResponse {
  referenceId: string;
  name: string;
  businessName: string;
  email: string;
  projectType: string;
  receivedAt: string;
  status: string;
}

export class ContactService {
  /**
   * Securely saves and registers a validated, sanitized lead.
   * Delegates database persistence to leadDatabaseService (Prisma + PostgreSQL).
   * Does not store unnecessary personal information.
   */
  public async createLead(
    input: ContactInput
  ): Promise<{ lead: SafeLeadResponse; referenceId: string }> {
    // Persist lead into database via Prisma PostgreSQL database service
    const storedLead = await leadDatabaseService.createLead({
      name: input.name,
      businessName: input.businessName,
      email: input.email,
      phone: input.phone,
      businessType: input.businessType || "Professional & Legal Services",
      projectType: input.projectType,
      budget: input.budget || "Flexible / Need Advice",
      message: input.message,
    });

    // Mirror to inquiry store for unified telemetry
    await db.addInquiry({
      name: input.name,
      email: input.email,
      company: input.businessName,
      industry: input.businessType || "General Business",
      projectType: input.projectType,
      budget: input.budget || "Flexible / Need Advice",
      timeline: "Flexible",
      message: input.phone ? `[Phone: ${input.phone}] ${input.message}` : input.message,
    });

    logger.info("New lead securely stored and registered", {
      referenceId: storedLead.id,
      businessName: storedLead.businessName,
      email: storedLead.email,
      projectType: storedLead.projectType,
    });

    // Trigger email notification if provider credentials are configured in environment.
    // If not configured, gracefully skips without error or invented credentials.
    // Asynchronous dispatch guarantees fast client response times and protects persistence integrity.
    emailService
      .sendNewLeadNotification({
        referenceId: storedLead.id,
        name: storedLead.name,
        businessName: storedLead.businessName,
        email: storedLead.email,
        phone: storedLead.phone,
        businessType: storedLead.businessType,
        projectType: storedLead.projectType,
        budget: storedLead.budget,
        message: storedLead.message,
        createdAt: storedLead.createdAt,
      })
      .catch((err) => {
        logger.error("[ContactService] Background email dispatch caught error", err, {
          referenceId: storedLead.id,
        });
      });

    // Return safe data representation (never exposing raw internal flags or unmasked telemetry)
    const safeLead: SafeLeadResponse = {
      referenceId: storedLead.id,
      name: storedLead.name,
      businessName: storedLead.businessName,
      email: storedLead.email,
      projectType: storedLead.projectType,
      receivedAt: storedLead.createdAt.toISOString(),
      status: storedLead.status,
    };

    return {
      referenceId: storedLead.id,
      lead: safeLead,
    };
  }
}

export const contactService = new ContactService();
