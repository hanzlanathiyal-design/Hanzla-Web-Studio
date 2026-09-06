import { InquiryEntity, AuditEntity, BookingEntity, LeadEntity, LeadStatus } from "./schema.js";

class DatabaseStore {
  private leads: LeadEntity[] = [];
  private inquiries: InquiryEntity[] = [
    {
      id: "HWS-9021",
      name: "Marcus Vance",
      email: "m.vance@vanguardgoods.com",
      company: "Vanguard Retail Group",
      industry: "E-Commerce",
      projectType: "Full Headless Replatform",
      budget: "$15,000 - $25,000",
      timeline: "6-8 weeks",
      message: "Looking to migrate from sluggish monolithic Magento to Next.js + Shopify Plus.",
      createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      status: "proposal_sent",
    },
    {
      id: "HWS-8842",
      name: "Dr. Elena Rostova",
      email: "contact@aurahealth.clinic",
      company: "Aura Health & Longevity",
      industry: "Healthcare",
      projectType: "Custom Clinic Web Application",
      budget: "$10,000 - $18,000",
      timeline: "4-6 weeks",
      message: "Need HIPAA-conscious patient appointment funnel and provider profiles.",
      createdAt: new Date(Date.now() - 3600000 * 42).toISOString(),
      status: "reviewing",
    },
  ];

  private audits: AuditEntity[] = [];
  private bookings: BookingEntity[] = [];

  // Inquiries
  public async addInquiry(inquiry: Omit<InquiryEntity, "id" | "createdAt" | "status">): Promise<InquiryEntity> {
    const id = `HWS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: InquiryEntity = {
      ...inquiry,
      id,
      createdAt: new Date().toISOString(),
      status: "new",
    };
    this.inquiries.unshift(newRecord);
    return newRecord;
  }

  public async getInquiries(limit = 10): Promise<InquiryEntity[]> {
    return this.inquiries.slice(0, limit);
  }

  public async getInquiriesCount(): Promise<number> {
    return this.inquiries.length;
  }

  // Audits
  public async addAudit(audit: Omit<AuditEntity, "id" | "createdAt">): Promise<AuditEntity> {
    const id = `AUD-${Math.floor(10000 + Math.random() * 90000)}`;
    const record: AuditEntity = {
      ...audit,
      id,
      createdAt: new Date().toISOString(),
    };
    this.audits.unshift(record);
    return record;
  }

  public async getAudits(limit = 5): Promise<AuditEntity[]> {
    return this.audits.slice(0, limit);
  }

  // Bookings
  public async addBooking(booking: Omit<BookingEntity, "id" | "createdAt">): Promise<BookingEntity> {
    const id = `CALL-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: BookingEntity = {
      ...booking,
      id,
      createdAt: new Date().toISOString(),
    };
    this.bookings.unshift(record);
    return record;
  }

  public async getBookings(): Promise<BookingEntity[]> {
    return [...this.bookings];
  }

  // Leads
  public async addLead(lead: Omit<LeadEntity, "id" | "createdAt" | "status">): Promise<LeadEntity> {
    const id = `LEAD-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: LeadEntity = {
      ...lead,
      id,
      createdAt: new Date().toISOString(),
      status: "NEW",
    };
    this.leads.unshift(record);
    return record;
  }

  public async getLeads(limit = 10): Promise<LeadEntity[]> {
    return this.leads.slice(0, limit);
  }

  public async getLeadsCount(): Promise<number> {
    return this.leads.length;
  }

  public async findLeadById(id: string): Promise<LeadEntity | null> {
    const lead = this.leads.find((l) => l.id === id);
    return lead || null;
  }

  public async updateLeadStatus(id: string, status: LeadStatus): Promise<LeadEntity | null> {
    const lead = this.leads.find((l) => l.id === id);
    if (!lead) return null;
    lead.status = status;
    return lead;
  }

  public async deleteLead(id: string): Promise<boolean> {
    const initialLen = this.leads.length;
    this.leads = this.leads.filter((l) => l.id !== id);
    return this.leads.length < initialLen;
  }
}

export const db = new DatabaseStore();
