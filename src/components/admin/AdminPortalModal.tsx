import React, { useState, useEffect, useCallback } from "react";
import {
  Lock,
  X,
  Search,
  RefreshCw,
  LogOut,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Briefcase,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  adminLogin,
  adminVerifySession,
  adminLogout,
  fetchAdminLeads,
  updateLeadStatus,
  AdminLead,
  AdminLeadStatus,
  AdminStats,
} from "../../services/adminApi.service";
import { LeadDetailsModal } from "./LeadDetailsModal";
import { DeleteLeadModal } from "./DeleteLeadModal";

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_TABS = [
  { id: "ALL", label: "All Leads" },
  { id: "NEW", label: "New", color: "bg-amber-500" },
  { id: "CONTACTED", label: "Contacted", color: "bg-blue-500" },
  { id: "QUALIFIED", label: "Qualified", color: "bg-purple-500" },
  { id: "CLOSED", label: "Closed", color: "bg-emerald-500" },
];

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [isVerifyingSession, setIsVerifyingSession] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Leads list state
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    closed: 0,
  });
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);
  const [leadsError, setLeadsError] = useState<string | null>(null);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Modals for detail & delete
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<AdminLead | null>(null);
  const [selectedLeadForDelete, setSelectedLeadForDelete] = useState<AdminLead | null>(null);

  // Check existing session on mount
  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    setIsVerifyingSession(true);

    adminVerifySession()
      .then((admin) => {
        if (!isMounted) return;
        if (admin) {
          setIsAuthenticated(true);
          setAdminEmail(admin.email);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsAuthenticated(false);
      })
      .finally(() => {
        if (isMounted) setIsVerifyingSession(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Load leads when authenticated or filter/search changes
  const loadLeads = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoadingLeads(true);
    setLeadsError(null);

    try {
      const response = await fetchAdminLeads({
        status: activeStatus,
        search: searchTerm,
        page: currentPage,
        limit: 15,
      });

      setLeads(response.leads);
      setStats(response.stats);
      setTotalPages(response.pagination.totalPages);
    } catch (err: any) {
      if (err?.status === 401) {
        setIsAuthenticated(false);
        setLoginError("Your session has expired. Please log in again.");
      } else {
        setLeadsError(err?.message || "Failed to load leads from database");
      }
    } finally {
      setIsLoadingLeads(false);
    }
  }, [isAuthenticated, activeStatus, searchTerm, currentPage]);

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated, loadLeads]);

  // Handle Login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword) {
      setLoginError("Please enter both administrative email and password.");
      return;
    }

    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await adminLogin(loginEmail.trim(), loginPassword);
      setIsAuthenticated(true);
      setAdminEmail(res.admin.email);
      setLoginPassword("");
    } catch (err: any) {
      setLoginError(
        err?.message || "Invalid credentials. Please verify your administrative credentials."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await adminLogout();
    setIsAuthenticated(false);
    setLeads([]);
    setAdminEmail("");
  };

  // Handle Quick Status Update from Table
  const handleQuickStatusChange = async (leadId: string, newStatus: AdminLeadStatus) => {
    try {
      const res = await updateLeadStatus(leadId, newStatus);
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: res.lead.status } : l))
      );
      // Refresh stats quietly
      fetchAdminLeads({ status: activeStatus, search: searchTerm, page: currentPage, limit: 15 })
        .then((r) => setStats(r.stats))
        .catch(() => {});
    } catch (err: any) {
      alert(err?.message || "Failed to update status");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-6xl bg-[#FBFBFA] dark:bg-[#070E18] border border-gray-300 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[92vh] max-h-[900px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#0B1726]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#D4A72C]/15 border border-[#D4A72C]/30 text-[#D4A72C]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-gray-900 dark:text-white">
                  Studio Lead Management
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Private CRM
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Direct client pipeline & consultation requests
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-1.5 border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20"
                title="Log out from admin area"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Close admin portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {isVerifyingSession ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <RefreshCw className="w-6 h-6 text-[#D4A72C] animate-spin" />
                <p className="text-xs text-gray-500 font-medium">
                  Verifying server-side administrative session...
                </p>
              </div>
            </div>
          ) : !isAuthenticated ? (
            /* ==============================================================
               AUTHENTICATION GATE (Server-side password verification)
               ============================================================== */
            <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
              <div className="w-full max-w-md bg-white dark:bg-[#0B1726] border border-gray-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#D4A72C]/15 border border-[#D4A72C]/30 text-[#D4A72C] flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Private Administrative Access
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enter your authorized administrative credentials to manage prospective client leads.
                  </p>
                </div>

                {loginError && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="admin-email"
                      className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1.5"
                    >
                      Admin Email
                    </label>
                    <input
                      id="admin-email"
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="hanzlanathiyal@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4A72C] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="admin-password"
                      className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-1.5"
                    >
                      Password
                    </label>
                    <input
                      id="admin-password"
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4A72C] focus:border-transparent transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-[#0B1726] bg-[#D4A72C] hover:bg-[#c29623] disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  >
                    {isLoggingIn ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Authenticate & Enter
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 text-center">
                  <p className="text-[11px] text-gray-400">
                    Protected by server-side bcrypt password hashing and timed JWT authentication.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* ==============================================================
               AUTHENTICATED LEADS CRM DASHBOARD
               ============================================================== */
            <div className="flex-1 overflow-hidden flex flex-col p-4 sm:p-6 space-y-4">
              {/* Top Stats Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B1726] border border-gray-200 dark:border-white/10 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                    Total Leads
                  </span>
                  <span className="text-xl font-extrabold text-gray-900 dark:text-white mt-1 block">
                    {stats.total}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B1726] border border-amber-500/20 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                    New Inquiries
                  </span>
                  <span className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 block">
                    {stats.new}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B1726] border border-blue-500/20 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Contacted
                  </span>
                  <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 block">
                    {stats.contacted}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B1726] border border-purple-500/20 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                    Qualified
                  </span>
                  <span className="text-xl font-extrabold text-purple-600 dark:text-purple-400 mt-1 block">
                    {stats.qualified}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B1726] border border-emerald-500/20 shadow-xs col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                    Closed / Won
                  </span>
                  <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
                    {stats.closed}
                  </span>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-[#0B1726] p-3 rounded-xl border border-gray-200 dark:border-white/10">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search by client, business, email, or package..."
                    className="w-full pl-9 pr-8 py-2 rounded-lg text-xs bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4A72C]"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                  {STATUS_TABS.map((tab) => {
                    const isActive = activeStatus === tab.id;
                    const count =
                      tab.id === "ALL"
                        ? stats.total
                        : tab.id === "NEW"
                        ? stats.new
                        : tab.id === "CONTACTED"
                        ? stats.contacted
                        : tab.id === "QUALIFIED"
                        ? stats.qualified
                        : stats.closed;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveStatus(tab.id);
                          setCurrentPage(1);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                          isActive
                            ? "bg-[#0B1726] text-white dark:bg-white dark:text-[#0B1726] shadow-xs"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                        }`}
                      >
                        {tab.color && (
                          <span
                            className={`w-2 h-2 rounded-full ${tab.color} shrink-0`}
                          />
                        )}
                        <span>{tab.label}</span>
                        <span className="opacity-70 text-[10px]">({count})</span>
                      </button>
                    );
                  })}

                  <button
                    onClick={loadLeads}
                    disabled={isLoadingLeads}
                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    title="Refresh leads"
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 ${isLoadingLeads ? "animate-spin" : ""}`}
                    />
                  </button>
                </div>
              </div>

              {/* Leads Table Container */}
              <div className="flex-1 overflow-hidden bg-white dark:bg-[#0B1726] border border-gray-200 dark:border-white/10 rounded-xl flex flex-col">
                {isLoadingLeads ? (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="w-6 h-6 text-[#D4A72C] animate-spin" />
                      <p className="text-xs text-gray-400">Loading leads...</p>
                    </div>
                  </div>
                ) : leadsError ? (
                  <div className="flex-1 flex items-center justify-center p-8 text-center">
                    <div className="max-w-md">
                      <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-rose-600">{leadsError}</p>
                      <button
                        onClick={loadLeads}
                        className="mt-3 px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-gray-700 dark:text-white"
                      >
                        Retry Query
                      </button>
                    </div>
                  </div>
                ) : leads.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center p-8 text-center">
                    <div className="max-w-sm">
                      <Filter className="w-8 h-8 text-gray-400 mx-auto mb-2 opacity-50" />
                      <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        No Leads Found
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {searchTerm
                          ? `No leads matched your search for "${searchTerm}".`
                          : activeStatus !== "ALL"
                          ? `There are currently no leads in "${activeStatus}" status.`
                          : "No prospective client inquiries have been submitted yet."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 overflow-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50/70 dark:bg-white/[0.02] text-[11px] uppercase tracking-wider font-bold text-gray-500 dark:text-gray-400">
                          <th className="px-4 py-3">Client & Company</th>
                          <th className="px-4 py-3 hidden md:table-cell">Contact</th>
                          <th className="px-4 py-3 hidden lg:table-cell">Project Type</th>
                          <th className="px-4 py-3 hidden xl:table-cell">Budget</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3 hidden sm:table-cell">Date</th>
                          <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-xs">
                        {leads.map((lead) => {
                          const dateObj = new Date(lead.createdAt);
                          const dateFormatted = dateObj.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          });

                          return (
                            <tr
                              key={lead.id}
                              className="hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors"
                            >
                              {/* Client & Company */}
                              <td className="px-4 py-3">
                                <div>
                                  <span className="font-bold text-gray-900 dark:text-white block">
                                    {lead.name}
                                  </span>
                                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1 text-[11px] mt-0.5">
                                    <Building2 className="w-3 h-3 text-[#D4A72C] shrink-0" />
                                    {lead.businessName}
                                  </span>
                                </div>
                              </td>

                              {/* Contact */}
                              <td className="px-4 py-3 hidden md:table-cell">
                                <div className="space-y-0.5">
                                  <a
                                    href={`mailto:${lead.email}`}
                                    className="text-gray-700 dark:text-gray-300 hover:text-[#D4A72C] flex items-center gap-1 truncate max-w-[200px]"
                                  >
                                    <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                                    {lead.email}
                                  </a>
                                  {lead.phone && (
                                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1 text-[11px]">
                                      <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                                      {lead.phone}
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* Project Type */}
                              <td className="px-4 py-3 hidden lg:table-cell">
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                  {lead.projectType}
                                </span>
                              </td>

                              {/* Budget */}
                              <td className="px-4 py-3 hidden xl:table-cell text-gray-600 dark:text-gray-300">
                                {lead.budget || "Flexible"}
                              </td>

                              {/* Status Dropdown */}
                              <td className="px-4 py-3">
                                <select
                                  value={lead.status}
                                  onChange={(e) =>
                                    handleQuickStatusChange(
                                      lead.id,
                                      e.target.value as AdminLeadStatus
                                    )
                                  }
                                  className={`text-xs font-semibold py-1 px-2 rounded-lg border focus:outline-none cursor-pointer ${
                                    lead.status === "NEW"
                                      ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30"
                                      : lead.status === "CONTACTED"
                                      ? "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30"
                                      : lead.status === "QUALIFIED"
                                      ? "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30"
                                      : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30"
                                  }`}
                                >
                                  <option value="NEW">New</option>
                                  <option value="CONTACTED">Contacted</option>
                                  <option value="QUALIFIED">Qualified</option>
                                  <option value="CLOSED">Closed / Won</option>
                                </select>
                              </td>

                              {/* Date */}
                              <td className="px-4 py-3 hidden sm:table-cell text-gray-500 dark:text-gray-400 text-[11px] whitespace-nowrap">
                                {dateFormatted}
                              </td>

                              {/* Actions */}
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => setSelectedLeadForDetail(lead)}
                                    className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                    title="View full brief & details"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={() => setSelectedLeadForDelete(lead)}
                                    className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                                    title="Delete lead record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Table Footer with Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02] text-xs text-gray-500">
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="p-1 rounded border border-gray-200 dark:border-white/10 disabled:opacity-40"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        disabled={currentPage >= totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className="p-1 rounded border border-gray-200 dark:border-white/10 disabled:opacity-40"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLeadForDetail && (
        <LeadDetailsModal
          lead={selectedLeadForDetail}
          onClose={() => setSelectedLeadForDetail(null)}
          onStatusUpdated={(updated) => {
            setSelectedLeadForDetail(updated);
            setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
            loadLeads();
          }}
          onRequestDelete={(lead) => {
            setSelectedLeadForDetail(null);
            setSelectedLeadForDelete(lead);
          }}
        />
      )}

      {/* Delete Lead Modal */}
      {selectedLeadForDelete && (
        <DeleteLeadModal
          lead={selectedLeadForDelete}
          onClose={() => setSelectedLeadForDelete(null)}
          onDeleted={(deletedId) => {
            setLeads((prev) => prev.filter((l) => l.id !== deletedId));
            setSelectedLeadForDelete(null);
            loadLeads();
          }}
        />
      )}
    </div>
  );
};
