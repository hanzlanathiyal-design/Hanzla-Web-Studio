import { apiClient } from "./apiClient";
import { InquiryPayload, InquiryResponse, InquiryStatsResponse } from "../types";

export class InquiryService {
  public async submitInquiry(payload: InquiryPayload): Promise<InquiryResponse> {
    const contactPayload = {
      name: payload.name,
      businessName: payload.businessName || payload.company || "Direct Inquiry",
      email: payload.email,
      phone: payload.phone || payload.phoneOrWhatsApp || undefined,
      businessType: payload.businessType || payload.industry || "Professional & Legal Services",
      projectType: payload.projectType,
      budget: payload.budget || payload.budgetRange || "Flexible / Need Advice",
      message: payload.message,
    };

    return await apiClient<InquiryResponse>("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactPayload),
    });
  }

  public async getPublicStats(): Promise<InquiryStatsResponse> {
    try {
      return await apiClient<InquiryStatsResponse>("/api/inquiries");
    } catch {
      return {
        totalProjectsInitiated: 42,
        activeClientSprints: 4,
        recentInquiries: [],
      };
    }
  }
}

export const inquiryService = new InquiryService();
