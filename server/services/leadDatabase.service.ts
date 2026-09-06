import { Lead, LeadStatus } from "@prisma/client";
import { getPrisma, isPostgresConfigured } from "../db/prisma";
import { db } from "../db/store";
import { logger } from "../utils/logger";

export interface CreateLeadDto {
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  businessType?: string;
  projectType: string;
  budget?: string;
  message: string;
}

export interface LeadFilterOptions {
  status?: LeadStatus;
  search?: string;
  limit?: number;
  skip?: number;
}

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  closed: number;
}

export class LeadDatabaseService {
  /**
   * Persists a new lead securely to PostgreSQL via Prisma.
   * Does NOT store unnecessary personal information (e.g. no IP, no telemetry).
   */
  public async createLead(data: CreateLeadDto): Promise<Lead> {
    const prisma = getPrisma();

    if (prisma) {
      try {
        const newLead = await prisma.lead.create({
          data: {
            name: data.name,
            businessName: data.businessName,
            email: data.email,
            phone: data.phone || null,
            businessType: data.businessType || null,
            projectType: data.projectType,
            budget: data.budget || null,
            message: data.message,
            status: LeadStatus.NEW,
          },
        });

        logger.info("Lead successfully persisted to PostgreSQL via Prisma", {
          leadId: newLead.id,
          businessName: newLead.businessName,
          projectType: newLead.projectType,
        });

        return newLead;
      } catch (err) {
        logger.error("Error creating lead in PostgreSQL with Prisma, falling back to local store", err);
      }
    }

    // Fallback store if DATABASE_URL is not yet provisioned in preview
    const fallbackRecord = await db.addLead({
      name: data.name,
      businessName: data.businessName,
      email: data.email,
      phone: data.phone,
      businessType: data.businessType || "General Business",
      projectType: data.projectType,
      budget: data.budget || "Flexible",
      message: data.message,
    });

    return {
      id: fallbackRecord.id,
      name: fallbackRecord.name,
      businessName: fallbackRecord.businessName,
      email: fallbackRecord.email,
      phone: fallbackRecord.phone || null,
      businessType: fallbackRecord.businessType || null,
      projectType: fallbackRecord.projectType,
      budget: fallbackRecord.budget || null,
      message: fallbackRecord.message,
      status: LeadStatus.NEW,
      createdAt: new Date(fallbackRecord.createdAt),
      updatedAt: new Date(fallbackRecord.createdAt),
    };
  }

  /**
   * Retrieve a lead by unique ID.
   */
  public async getLeadById(id: string): Promise<Lead | null> {
    const prisma = getPrisma();
    if (prisma) {
      try {
        return await prisma.lead.findUnique({
          where: { id },
        });
      } catch (err) {
        logger.error(`Failed to find lead by ID ${id} in PostgreSQL`, err);
      }
    }

    const leads = await db.getLeads(100);
    const found = leads.find((l) => l.id === id);
    if (!found) return null;

    let statusEnum: LeadStatus = LeadStatus.NEW;
    const upper = (found.status || "NEW").toUpperCase();
    if (upper === "CONTACTED") statusEnum = LeadStatus.CONTACTED;
    else if (upper === "QUALIFIED") statusEnum = LeadStatus.QUALIFIED;
    else if (upper === "CLOSED") statusEnum = LeadStatus.CLOSED;

    return {
      id: found.id,
      name: found.name,
      businessName: found.businessName,
      email: found.email,
      phone: found.phone || null,
      businessType: found.businessType || null,
      projectType: found.projectType,
      budget: found.budget || null,
      message: found.message,
      status: statusEnum,
      createdAt: new Date(found.createdAt),
      updatedAt: new Date(found.createdAt),
    };
  }

  /**
   * Fetch leads with optional status filter, search query, and pagination.
   * Utilizes database indexes for high performance.
   */
  public async getLeads(options: LeadFilterOptions = {}): Promise<Lead[]> {
    const { status, search, limit = 20, skip = 0 } = options;
    const prisma = getPrisma();

    if (prisma) {
      try {
        const whereClause: any = {};
        if (status) {
          whereClause.status = status;
        }
        if (search && search.trim().length > 0) {
          const q = search.trim();
          whereClause.OR = [
            { name: { contains: q, mode: "insensitive" } },
            { businessName: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
            { projectType: { contains: q, mode: "insensitive" } },
          ];
        }

        return await prisma.lead.findMany({
          where: whereClause,
          orderBy: { createdAt: "desc" },
          take: limit,
          skip: skip,
        });
      } catch (err) {
        logger.error("Failed to query leads from PostgreSQL", err);
      }
    }

    let fallback = await db.getLeads(100);
    if (status) {
      fallback = fallback.filter((l) => l.status.toUpperCase() === status.toUpperCase());
    }
    if (search && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      fallback = fallback.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.businessName.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.projectType.toLowerCase().includes(q)
      );
    }

    const paged = fallback.slice(skip, skip + limit);
    return paged.map((l) => {
      let statusEnum: LeadStatus = LeadStatus.NEW;
      const upper = (l.status || "NEW").toUpperCase();
      if (upper === "CONTACTED") statusEnum = LeadStatus.CONTACTED;
      else if (upper === "QUALIFIED") statusEnum = LeadStatus.QUALIFIED;
      else if (upper === "CLOSED") statusEnum = LeadStatus.CLOSED;

      return {
        id: l.id,
        name: l.name,
        businessName: l.businessName,
        email: l.email,
        phone: l.phone || null,
        businessType: l.businessType || null,
        projectType: l.projectType,
        budget: l.budget || null,
        message: l.message,
        status: statusEnum,
        createdAt: new Date(l.createdAt),
        updatedAt: new Date(l.createdAt),
      };
    });
  }

  /**
   * Count leads matching filter.
   */
  public async countLeads(options: Omit<LeadFilterOptions, "limit" | "skip"> = {}): Promise<number> {
    const { status, search } = options;
    const prisma = getPrisma();

    if (prisma) {
      try {
        const whereClause: any = {};
        if (status) {
          whereClause.status = status;
        }
        if (search && search.trim().length > 0) {
          const q = search.trim();
          whereClause.OR = [
            { name: { contains: q, mode: "insensitive" } },
            { businessName: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
            { projectType: { contains: q, mode: "insensitive" } },
          ];
        }
        return await prisma.lead.count({ where: whereClause });
      } catch (err) {
        logger.error("Failed to count leads from PostgreSQL", err);
      }
    }

    let fallback = await db.getLeads(100);
    if (status) {
      fallback = fallback.filter((l) => l.status.toUpperCase() === status.toUpperCase());
    }
    if (search && search.trim().length > 0) {
      const q = search.trim().toLowerCase();
      fallback = fallback.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.businessName.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.projectType.toLowerCase().includes(q)
      );
    }
    return fallback.length;
  }

  /**
   * Update lead status (NEW, CONTACTED, QUALIFIED, CLOSED).
   */
  public async updateLeadStatus(id: string, status: LeadStatus): Promise<Lead | null> {
    const prisma = getPrisma();
    if (prisma) {
      try {
        return await prisma.lead.update({
          where: { id },
          data: {
            status,
            updatedAt: new Date(),
          },
        });
      } catch (err) {
        logger.error(`Failed to update lead status for ${id} in PostgreSQL`, err);
        return null;
      }
    }

    const updated = await db.updateLeadStatus(id, status);
    if (!updated) return null;
    return {
      id: updated.id,
      name: updated.name,
      businessName: updated.businessName,
      email: updated.email,
      phone: updated.phone || null,
      businessType: updated.businessType || null,
      projectType: updated.projectType,
      budget: updated.budget || null,
      message: updated.message,
      status: status,
      createdAt: new Date(updated.createdAt),
      updatedAt: new Date(),
    };
  }

  /**
   * Delete lead permanently if required.
   */
  public async deleteLead(id: string): Promise<boolean> {
    const prisma = getPrisma();
    if (prisma) {
      try {
        await prisma.lead.delete({
          where: { id },
        });
        logger.info(`Lead ${id} successfully deleted from PostgreSQL`);
        return true;
      } catch (err) {
        logger.error(`Failed to delete lead ${id} from PostgreSQL`, err);
        return false;
      }
    }

    return await db.deleteLead(id);
  }

  /**
   * Aggregated lead metrics for CRM dashboard pipelines.
   */
  public async getLeadStats(): Promise<LeadStats> {
    const prisma = getPrisma();

    if (prisma) {
      try {
        const [total, newCount, contacted, qualified, closed] = await Promise.all([
          prisma.lead.count(),
          prisma.lead.count({ where: { status: LeadStatus.NEW } }),
          prisma.lead.count({ where: { status: LeadStatus.CONTACTED } }),
          prisma.lead.count({ where: { status: LeadStatus.QUALIFIED } }),
          prisma.lead.count({ where: { status: LeadStatus.CLOSED } }),
        ]);

        return {
          total,
          new: newCount,
          contacted,
          qualified,
          closed,
        };
      } catch (err) {
        logger.error("Failed to fetch lead stats from PostgreSQL", err);
      }
    }

    const allLeads = await db.getLeads(500);
    return {
      total: allLeads.length,
      new: allLeads.filter((l) => l.status.toUpperCase() === "NEW").length,
      contacted: allLeads.filter((l) => l.status.toUpperCase() === "CONTACTED").length,
      qualified: allLeads.filter((l) => l.status.toUpperCase() === "QUALIFIED").length,
      closed: allLeads.filter((l) => l.status.toUpperCase() === "CLOSED").length,
    };
  }

  /**
   * Check database connection state.
   */
  public isConnected(): boolean {
    return isPostgresConfigured();
  }
}

export const leadDatabaseService = new LeadDatabaseService();
export { LeadStatus };
