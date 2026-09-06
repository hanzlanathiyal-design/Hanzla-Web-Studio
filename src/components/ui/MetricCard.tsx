import React from "react";
import { cn } from "../../utils";

interface MetricCardProps {
  value: string;
  label: string;
  subtext?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ value, label, subtext, className }) => {
  return (
    <div className={cn("p-5 rounded-2xl bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(11,23,38,0.04)]", className)}>
      <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1726] tracking-tight">
        {value}
      </div>
      <div className="text-xs font-semibold text-[#111827] mt-1">{label}</div>
      {subtext && <div className="text-[11px] text-[#111827]/60 mt-0.5">{subtext}</div>}
    </div>
  );
};
