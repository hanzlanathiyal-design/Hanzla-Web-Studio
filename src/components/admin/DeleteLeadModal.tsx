import React, { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { AdminLead, deleteLead } from "../../services/adminApi.service";

interface DeleteLeadModalProps {
  lead: AdminLead | null;
  onClose: () => void;
  onDeleted: (leadId: string) => void;
}

export const DeleteLeadModal: React.FC<DeleteLeadModalProps> = ({
  lead,
  onClose,
  onDeleted,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!lead) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteLead(lead.id);
      onDeleted(lead.id);
      onClose();
    } catch (err: any) {
      setError(err?.message || "Failed to delete lead. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#0B1726] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Delete Lead Record?
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
              Are you sure you want to permanently delete lead{" "}
              <strong className="text-gray-900 dark:text-white">{lead.name}</strong> from{" "}
              <strong className="text-gray-900 dark:text-white">{lead.businessName}</strong>?
            </p>
            <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-2 font-medium">
              This action permanently removes the record from the database and cannot be undone.
            </p>

            {error && (
              <div className="mt-3 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-xs text-rose-600 dark:text-rose-400">
                {error}
              </div>
            )}

            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                type="button"
                disabled={isDeleting}
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {isDeleting ? (
                  "Deleting..."
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    Confirm Delete
                  </>
                )}
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
