import { apiClient, ApiError } from "./apiClient";

const ADMIN_TOKEN_STORAGE_KEY = "hanzla_admin_jwt_session";

export type AdminLeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED";

export interface AdminLead {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone?: string | null;
  businessType?: string | null;
  projectType: string;
  budget?: string | null;
  message: string;
  status: AdminLeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AdminStats {
  total: number;
  new: number;
  contacted: number;
  qualified: number;
  closed: number;
}

export interface AdminPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdminLeadsResponse {
  success: true;
  leads: AdminLead[];
  pagination: AdminPagination;
  stats: AdminStats;
}

export interface AdminAuthResponse {
  success: true;
  message: string;
  token: string;
  admin: {
    email: string;
    role: string;
  };
}

export function getAdminToken(): string | null {
  try {
    return sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string): void {
  try {
    sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
  } catch {
    // Session storage fallback
  }
}

export function removeAdminToken(): void {
  try {
    sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
  } catch {
    // Session storage fallback
  }
}

function getAuthHeaders(): Record<string, string> {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Server-side Admin Authentication
 */
export async function adminLogin(email: string, password: string): Promise<AdminAuthResponse> {
  const response = await apiClient<AdminAuthResponse>("/api/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.token) {
    setAdminToken(response.token);
  }

  return response;
}

/**
 * Verify current active server session
 */
export async function adminVerifySession(): Promise<{ email: string; role: string } | null> {
  const token = getAdminToken();
  if (!token) return null;

  try {
    const res = await apiClient<{ success: boolean; admin: { email: string; role: string } }>(
      "/api/admin/auth/me",
      {
        headers: getAuthHeaders(),
      }
    );
    return res.admin;
  } catch {
    removeAdminToken();
    return null;
  }
}

/**
 * Log out server session & clear local token
 */
export async function adminLogout(): Promise<void> {
  try {
    await apiClient("/api/admin/auth/logout", {
      method: "POST",
      headers: getAuthHeaders(),
    });
  } finally {
    removeAdminToken();
  }
}

/**
 * Fetch leads with filter & search
 */
export async function fetchAdminLeads(params?: {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<AdminLeadsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.status && params.status !== "ALL") {
    searchParams.set("status", params.status);
  }
  if (params?.search && params.search.trim().length > 0) {
    searchParams.set("search", params.search.trim());
  }
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  const qs = searchParams.toString();
  const endpoint = qs ? `/api/admin/leads?${qs}` : "/api/admin/leads";

  return apiClient<AdminLeadsResponse>(endpoint, {
    headers: getAuthHeaders(),
  });
}

/**
 * Update lead status
 */
export async function updateLeadStatus(
  id: string,
  status: AdminLeadStatus
): Promise<{ success: true; lead: AdminLead }> {
  return apiClient<{ success: true; lead: AdminLead }>(`/api/admin/leads/${id}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
}

/**
 * Permanently delete lead
 */
export async function deleteLead(id: string): Promise<{ success: true; message: string }> {
  return apiClient<{ success: true; message: string }>(`/api/admin/leads/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
}
