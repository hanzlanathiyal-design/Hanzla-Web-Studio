import React from "react";
import { cn } from "../../utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: "rectangle" | "circle" | "text";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "rectangle",
  ...props
}) => {
  const variantStyles = {
    rectangle: "rounded-lg",
    circle: "rounded-full",
    text: "rounded h-4 w-full",
  };

  return (
    <div
      className={cn(
        "animate-shimmer bg-zinc-200/80",
        variantStyles[variant],
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
};
