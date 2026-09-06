import React from "react";
import { cn } from "../../utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "subtle" | "accent" | "navy";
  isInteractive?: boolean;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      isInteractive = false,
      hover = false,
      padding,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "bg-white border border-[#E5E7EB] shadow-[0_1px_3px_rgba(11,23,38,0.04)]",
      elevated: "bg-white border border-[#E5E7EB] shadow-[0_8px_20px_-4px_rgba(11,23,38,0.06)]",
      outlined: "bg-transparent border border-[#E5E7EB]",
      subtle: "bg-[#F7F7F5] border border-[#E5E7EB]",
      navy: "bg-[#0B1726] text-[#F7F7F5] border border-[#0B1726] shadow-sm",
      accent: "bg-white border border-[#D4A72C]/40 shadow-xs",
    };

    const paddingStyles = {
      none: "p-0",
      sm: "p-3 sm:p-4",
      md: "p-4 sm:p-6",
      lg: "p-6 sm:p-8",
    };

    const hasHoverEffect = hover || isInteractive;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-200",
          variantStyles[variant],
          padding && paddingStyles[padding],
          hasHoverEffect &&
            "cursor-pointer hover:border-[#D4A72C]/50 hover:shadow-md active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => (
  <div className={cn("p-5 sm:p-6 pb-2 sm:pb-3 flex flex-col gap-1.5", className)} {...props}>
    {children}
  </div>
);

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4" | "h5";
  className?: string;
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  as: Component = "h3",
  className,
  children,
  ...props
}) => (
  <Component
    className={cn("font-display text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight", className)}
    {...props}
  >
    {children}
  </Component>
);

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: React.ReactNode;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  className,
  children,
  ...props
}) => (
  <p className={cn("text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal", className)} {...props}>
    {children}
  </p>
);

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => (
  <div className={cn("p-5 sm:p-6 pt-2 sm:pt-3", className)} {...props}>
    {children}
  </div>
);

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className, children, ...props }) => (
  <div
    className={cn(
      "p-5 sm:p-6 pt-0 border-t border-zinc-100 flex items-center justify-between gap-4 mt-auto",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
