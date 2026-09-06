/**
 * Typed Request/Response structures for clean API boundaries.
 */

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message?: string;
  data?: T;
  [key: string]: any;
}

export interface ApiFieldError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: ApiFieldError[];
  errorId?: string;
  retryAfterSeconds?: number;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/* ==========================================================================
   Contact / Lead API Types (POST /api/contact)
   ========================================================================== */

export interface ContactSubmitRequest {
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  businessType?: string;
  projectType: string;
  budget?: string;
  message: string;
}

export interface ContactLeadDto {
  referenceId: string;
  name: string;
  businessName: string;
  email: string;
  projectType: string;
  receivedAt: string;
  status: string;
}

export interface ContactSubmitResponse {
  success: true;
  message: string;
  referenceId: string;
  lead: ContactLeadDto;
}

/* ==========================================================================
   Portfolio Projects API Types (GET /api/projects, GET /api/projects/:slug)
   ========================================================================== */

export interface ProjectSummary {
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  projectType: string;
  tagline: string;
  year: string;
  techStack: string[];
  thumbnailUrl: string;
  badge: string;
}

export interface ProjectDetail extends ProjectSummary {
  shortDescription: string;
  challenge: string;
  solution: string;
  features: string[];
  desktopMockupUrl?: string;
  mobileMockupUrl?: string;
}

export interface ProjectsListResponse {
  success: true;
  count: number;
  projects: ProjectSummary[];
}

export interface ProjectDetailResponse {
  success: true;
  project: ProjectDetail;
}
