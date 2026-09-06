export interface AuditResult {
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

export interface InquiryPayload {
  name: string;
  businessName?: string;
  email: string;
  phone?: string;
  phoneOrWhatsApp?: string;
  businessType?: string;
  company?: string;
  industry?: string;
  projectType: string;
  budgetRange?: string;
  budget?: string;
  timeline?: string;
  message: string;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  referenceId: string;
  inquiry?: any;
  errors?: Array<{ message: string; path?: string[] }>;
}

export interface InquiryStatsResponse {
  totalProjectsInitiated: number;
  activeClientSprints: number;
  recentInquiries: Array<{
    id: string;
    company: string;
    industry: string;
    projectType: string;
    createdAt: string;
    status: string;
  }>;
}

export interface AuditRequestPayload {
  url: string;
  industry: string;
  primaryGoal?: string;
}

export interface AuditResponse {
  success: boolean;
  audit: AuditResult;
  message?: string;
}

export interface SchedulePayload {
  name: string;
  email: string;
  date: string;
  timeSlot: string;
  projectBrief?: string;
}

export interface ScheduleResponse {
  success: boolean;
  bookingId: string;
  message: string;
  details?: any;
}
