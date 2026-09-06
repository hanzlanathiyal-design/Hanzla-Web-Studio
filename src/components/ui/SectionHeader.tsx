import React from "react";
import { Badge } from "./Badge";
import { cn } from "../../utils";

export interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: "navy" | "gold" | "zinc" | "blue" | "emerald" | "amber" | "rose";
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = "navy",
  title,
  subtitle,
  centered = true,
  className,
}) => {
  return (
    <div className={cn("max-w-3xl mb-12 sm:mb-16", centered && "mx-auto text-center", className)}>
      {badge && (
        <div className="mb-3">
          <Badge variant={badgeVariant} dot>{badge}</Badge>
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1726] tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#111827]/70 text-sm sm:text-base mt-4 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};
