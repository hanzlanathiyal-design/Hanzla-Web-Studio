import React from "react";
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "../../utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "error" | "success" | "warning" | "info";
  title?: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  action?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  children,
  onClose,
  action,
  className,
  ...props
}) => {
  const config = {
    error: {
      container: "bg-rose-50 border-rose-200 text-rose-900",
      icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
      titleColor: "text-rose-900",
    },
    success: {
      container: "bg-emerald-50 border-emerald-200 text-emerald-900",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
      titleColor: "text-emerald-900",
    },
    warning: {
      container: "bg-amber-50 border-amber-200 text-amber-900",
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
      titleColor: "text-amber-900",
    },
    info: {
      container: "bg-[#0B1726]/5 border-[#0B1726]/15 text-[#0B1726]",
      icon: <Info className="w-5 h-5 text-[#0B1726] shrink-0" />,
      titleColor: "text-[#0B1726] font-bold",
    },
  };

  const current = config[variant];

  return (
    <div
      role="alert"
      className={cn(
        "p-4 rounded-xl border flex items-start gap-3 text-left transition-all duration-150",
        current.container,
        className
      )}
      {...props}
    >
      <div className="pt-0.5">{current.icon}</div>

      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={cn("text-xs font-bold uppercase tracking-wider mb-1", current.titleColor)}>
            {title}
          </h4>
        )}
        <div className="text-xs sm:text-sm leading-relaxed text-zinc-800">{children}</div>

        {action && <div className="mt-3 flex items-center gap-2">{action}</div>}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-md text-zinc-500 hover:text-zinc-800 hover:bg-black/5 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
