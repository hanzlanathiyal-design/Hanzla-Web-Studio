import React, { useState } from "react";
import {
  X,
  Building2,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  DollarSign,
  FileText,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import { AdminLead, AdminLeadStatus, updateLeadStatus } from "../../services/adminApi.service";

interface LeadDetailsModalProps {
  lead: AdminLead | null;
  onClose: () => void;
  onStatusUpdated: (updatedLead: AdminLead) => void;
  onRequestDelete: (lead: AdminLead) => void;
}

const STATUS_CONFIG: Record<
  AdminLeadStatus,
  { label: string; bg: string; text: string; border: string; desc: string }
> = {
  NEW: {
    label: "New Lead",
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-500/30",
    desc: "Awaiting initial engineer review & response SLA",
  },
  CONTACTED: {
    label: "Contacted",
    bg: "bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-500/30",
    desc: "Initial outreach or discovery scheduled",
  },
  QUALIFIED: {
    label: "Qualified",
    bg: "bg-purple-500/10",
    text: "text-purple-700 dark:text-purple-400",
    border: "border-purple-500/30",
    desc: "Scope & budget aligned, proposal in review",
  },
  CLOSED: {
    label: "Closed / Won",
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-500/30",
    desc: "Retained for production or archived project",
  },
};

export const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({
  lead,
  onClose,
  onStatusUpdated,
  onRequestDelete,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  if (!lead) return null;

  const currentStatus = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW;

  const handleStatusChange = async (newStatus: AdminLeadStatus) => {
    if (newStatus === lead.status || isUpdating) return;
    setIsUpdating(true);
    setUpdateError(null);
    try {
      const res = await updateLeadStatus(lead.id, newStatus);
      onStatusUpdated(res.lead);
    } catch (err: any) {
      setUpdateError(err?.message || "Failed to update lead status");
    } finally {
      setIsUpdating(false);
    }
  };

  const formattedDate = new Date(lead.createdAt).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#0B1726] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-gray-500 dark:text-gray-400 font-semibold">
              ID: {lead.id}
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentStatus.bg} ${currentStatus.text} ${currentStatus.border}`}
            >
              {currentStatus.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto px-6 py-5 space-y-6 flex-1">
          {/* Client Title Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-white/5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {lead.name}
              </h2>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1.5 mt-0.5">
                <Building2 className="w-4 h-4 text-[#D4A72C]" />
                {lead.businessName}
              </p>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Received {formattedDate}</span>
            </div>
          </div>

          {/* Contact & Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Email Address
              </span>
              <a
                href={`mailto:${lead.email}`}
                className="text-sm font-semibold text-[#0B1726] dark:text-white hover:text-[#D4A72C] flex items-center gap-1.5 break-all transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
                {lead.email}
                <ExternalLink className="w-3 h-3 text-gray-400 shrink-0 ml-1" />
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Direct Phone / WhatsApp
              </span>
              {lead.phone ? (
                <a
                  href={`tel:${lead.phone}`}
                  className="text-sm font-semibold text-[#0B1726] dark:text-white hover:text-[#D4A72C] flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  {lead.phone}
                </a>
              ) : (
                <span className="text-sm text-gray-400 italic">Not provided</span>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Requested Package / Service
              </span>
              <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#D4A72C] shrink-0" />
                {lead.projectType}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-1">
                Budget Allocation
              </span>
              <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                {lead.budget || "Flexible / Need Advice"}
              </p>
            </div>
          </div>

          {/* Project Brief / Message */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#D4A72C]" />
              Client Project Brief
            </span>
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/5 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
              {lead.message}
            </div>
          </div>

          {/* Status Pipeline Controller */}
          <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4A72C]" />
                Update Lead Status Pipeline
              </span>
              {isUpdating && (
                <span className="text-xs text-blue-500 font-medium animate-pulse">
                  Updating status...
                </span>
              )}
            </div>

            {updateError && (
              <p className="text-xs text-red-500 mb-2 font-medium">{updateError}</p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["NEW", "CONTACTED", "QUALIFIED", "CLOSED"] as AdminLeadStatus[]).map(
                (statusKey) => {
                  const isCurrent = lead.status === statusKey;
                  const item = STATUS_CONFIG[statusKey];
                  return (
                    <button
                      key={statusKey}
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleStatusChange(statusKey)}
                      className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                        isCurrent
                          ? `${item.bg} ${item.text} ${item.border} ring-2 ring-offset-1 ring-current shadow-sm`
                          : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                      }`}
                    >
                      {isCurrent && <CheckCircle2 className="w-3 h-3" />}
                      {item.label}
                    </button>
                  );
                }
              )}
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-2 italic">
              {currentStatus.desc}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02]">
          <button
            type="button"
            onClick={() => onRequestDelete(lead)}
            className="px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Lead
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-white/15 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
