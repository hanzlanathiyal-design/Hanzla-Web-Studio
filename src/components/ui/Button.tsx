import React from "react";
import { cn } from "../../utils";
import { Spinner } from "./Spinner";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "gold" | "outline" | "ghost" | "danger" | "subtle";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles: Focus visible ring, transitions, cursor, inline-flex center
    const baseStyles =
      "relative inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-150 select-none outline-none focus-visible:ring-2 focus-visible:ring-[#0B1726] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    // Size variants ensuring 44px min touch target on mobile for 'md' and 'lg'
    const sizeStyles = {
      sm: "text-[11px] px-3.5 py-1.5 min-h-[36px] rounded-full gap-1.5",
      md: "text-xs px-5 py-2.5 min-h-[44px] rounded-full gap-2",
      lg: "text-xs sm:text-sm px-6 py-3 min-h-[48px] rounded-full gap-2.5",
    };

    // Color & surface variants strictly in Deep Navy #0B1726, Gold #D4A72C, Off White #F7F7F5, Dark Text #111827, Soft Gray #E5E7EB
    const variantStyles = {
      primary:
        "bg-[#0B1726] hover:bg-[#15253b] text-[#F7F7F5] shadow-xs active:bg-[#0B1726] border border-[#0B1726]",
      gold:
        "bg-[#D4A72C] hover:bg-[#C49622] text-[#0B1726] font-bold shadow-xs active:bg-[#B3871D] border border-[#D4A72C]",
      accent:
        "bg-[#D4A72C] hover:bg-[#C49622] text-[#0B1726] font-bold shadow-xs active:bg-[#B3871D] border border-[#D4A72C]",
      secondary:
        "bg-white hover:bg-[#F7F7F5] text-[#111827] border border-[#E5E7EB] hover:border-[#D1D5DB] active:bg-[#E5E7EB]",
      outline:
        "bg-transparent hover:bg-white text-[#111827] border border-[#E5E7EB] hover:border-[#0B1726] active:bg-[#E5E7EB]",
      ghost:
        "bg-transparent hover:bg-[#E5E7EB]/50 text-[#111827] border border-transparent",
      danger:
        "bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 active:bg-rose-200",
      subtle:
        "bg-[#0B1726]/5 hover:bg-[#0B1726]/10 text-[#0B1726] border border-[#0B1726]/10",
    };

    const isInteractionDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={props.type || "button"}
        disabled={isInteractionDisabled}
        aria-busy={isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner
              size={size === "sm" ? "xs" : "sm"}
              variant={variant === "primary" || variant === "accent" ? "white" : "primary"}
            />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children && <span>{children}</span>}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
