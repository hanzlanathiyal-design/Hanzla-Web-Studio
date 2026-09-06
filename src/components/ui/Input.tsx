import React, { useId } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "../../utils";
import { Spinner } from "./Spinner";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      isLoading,
      leftIcon,
      rightIcon,
      className,
      containerClassName,
      id: customId,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <div className={cn("flex flex-col gap-1.5 w-full text-left", containerClassName)}>
        {label && (
          <label htmlFor={id} className="text-xs font-bold text-zinc-900 flex items-center justify-between">
            <span>
              {label} {required && <span className="text-rose-600 font-bold" aria-hidden="true">*</span>}
              {required && <span className="sr-only">(required)</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-zinc-500">
              {leftIcon}
            </div>
          )}

          <input
            id={id}
            ref={ref}
            disabled={disabled || isLoading}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              "w-full h-11 sm:h-10 text-sm bg-white text-zinc-900 placeholder:text-zinc-500 rounded-xl border transition-all duration-150 outline-none",
              leftIcon ? "pl-10" : "pl-3.5",
              rightIcon || error || success || isLoading ? "pr-10" : "pr-3.5",
              // Error state
              error
                ? "border-rose-500 focus-visible:border-rose-600 focus-visible:ring-2 focus-visible:ring-rose-500/30 bg-rose-50/30"
                : success
                ? "border-emerald-500 focus-visible:border-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/30"
                : "border-[#E5E7EB] hover:border-[#D1D5DB] focus-visible:border-[#0B1726] focus-visible:ring-2 focus-visible:ring-[#0B1726]",
              disabled && "bg-[#F7F7F5] text-zinc-500 cursor-not-allowed border-[#E5E7EB]",
              className
            )}
            {...props}
          />

          {/* Trailing Icon / Status Indicator */}
          <div className="absolute right-3.5 flex items-center pointer-events-none">
            {isLoading ? (
              <Spinner size="xs" variant="primary" />
            ) : error ? (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            ) : success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : rightIcon ? (
              <span className="text-zinc-500">{rightIcon}</span>
            ) : null}
          </div>
        </div>

        {/* Feedback Messages */}
        {error ? (
          <p id={errorId} role="alert" aria-live="polite" className="text-[11px] font-semibold text-rose-700 flex items-center gap-1 mt-0.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-[11px] text-zinc-600 mt-0.5">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
