import React from "react";
import { cn } from "../../utils";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "navy" | "gold" | "zinc" | "blue" | "emerald" | "amber" | "rose";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "navy",
  size = "md",
  dot = false,
  className,
}) => {
  const variantStyles = {
    navy: "bg-[#0B1726] text-[#F7F7F5] border-[#0B1726]",
    gold: "bg-[#D4A72C]/10 text-[#0B1726] border-[#D4A72C]/30",
    zinc: "bg-white text-[#111827] border-[#E5E7EB]",
    blue: "bg-[#0B1726] text-[#F7F7F5] border-[#0B1726]", // maps legacy blue calls to Deep Navy
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    rose: "bg-rose-50 text-rose-800 border-rose-200",
  };

  const dotColors = {
    navy: "bg-[#D4A72C]",
    gold: "bg-[#D4A72C]",
    zinc: "bg-[#0B1726]",
    blue: "bg-[#D4A72C]",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[9px]",
    md: "px-3 py-1 text-[10px]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-widest border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />}
      {children}
    </span>
  );
};
