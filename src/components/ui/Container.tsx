import React from "react";
import { cn } from "../../utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "main" | "header" | "footer" | "article";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  children: React.ReactNode;
  noGutter?: boolean;
}

const sizeClasses = {
  sm: "max-w-3xl", // ~768px
  md: "max-w-5xl", // ~1024px
  lg: "max-w-7xl", // ~1280px
  xl: "max-w-[1440px]", // 1440px+
  full: "max-w-full",
};

export const Container: React.FC<ContainerProps> = ({
  as: Component = "div",
  size = "lg",
  className,
  children,
  noGutter = false,
  ...props
}) => {
  return (
    <Component
      className={cn(
        "w-full mx-auto",
        sizeClasses[size],
        !noGutter && "px-3.5 sm:px-5 md:px-6 lg:px-8 xl:px-12",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
