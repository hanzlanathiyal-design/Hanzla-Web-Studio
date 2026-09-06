import { db } from "../db";
import { InquiryInput } from "../validators";
import { InquiryEntity } from "../db/schema";

export class InquiryService {
  public async createInquiry(input: InquiryInput): Promise<InquiryEntity> {
    const payload = {
      name: input.name,
      email: input.email,
      company: input.businessName || input.company || "Independent Business",
      industry: input.businessType || input.industry || "General Business",
      projectType: input.projectType,
      budget: input.budgetRange || input.budget || "Flexible / Need Advice",
      timeline: input.timeline || "Flexible",
      message: input.phoneOrWhatsApp
        ? `[WhatsApp / Phone: ${input.phoneOrWhatsApp}] ${input.message}`
        : input.message,
    };
    return await db.addInquiry(payload);
  }

  public async getPublicStats() {
    const inquiries = await db.getInquiries(5);
    const count = await db.getInquiriesCount();

    return {
      totalProjectsInitiated: count + 38,
      activeClientSprints: 4,
      recentInquiries: inquiries.map((inq) => ({
        id: inq.id,
        company: inq.company || inq.name.split(" ")[0] + "'s Project",
        industry: inq.industry,
        projectType: inq.projectType,
        createdAt: inq.createdAt,
        status: inq.status,
      })),
    };
  }
}

export const inquiryService = new InquiryService();
