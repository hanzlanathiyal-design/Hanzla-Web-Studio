export type InquiryStatus = "new" | "reviewing" | "proposal_sent" | "closed";
export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED" | "new" | "reviewing" | "contacted" | "proposal_sent" | "archived";


export interface LeadEntity {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  businessType: string;
  projectType: string;
  budget?: string;
  message: string;
  createdAt: string;
  status: LeadStatus;
  ipMasked?: string;
}

export interface InquiryEntity {
  id: string;
  name: string;
  email: string;
  company?: string;
  industry: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  createdAt: string;
  status: InquiryStatus;
}

export interface AuditEntity {
  id: string;
  url: string;
  industry: string;
  score: {
    overall: number;
    performance: number;
    seo: number;
    ux: number;
    conversion: number;
  };
  keyFindings: string[];
  recommendedStack: string[];
  estimatedRevenueUplift: string;
  createdAt: string;
}

export interface BookingEntity {
  id: string;
  name: string;
  email: string;
  date: string;
  timeSlot: string;
  projectBrief?: string;
  createdAt: string;
}
