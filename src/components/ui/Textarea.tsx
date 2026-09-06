import React, { useId } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "../../utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  maxLength?: number;
  currentLength?: number;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      maxLength,
      currentLength,
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
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={id} className="text-xs font-bold text-zinc-900">
              {label} {required && <span className="text-rose-600 font-bold" aria-hidden="true">*</span>}
              {required && <span className="sr-only">(required)</span>}
            </label>
          )}
          {maxLength !== undefined && currentLength !== undefined && (
            <span className="text-[10px] text-zinc-500 font-mono" aria-hidden="true">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>

        <div className="relative">
          <textarea
            id={id}
            ref={ref}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              "w-full min-h-[100px] p-3 text-sm bg-white text-zinc-900 placeholder:text-zinc-500 rounded-xl border transition-all duration-150 outline-none resize-y",
              // Error state
              error
                ? "border-rose-500 focus-visible:border-rose-600 focus-visible:ring-2 focus-visible:ring-rose-500/30 bg-rose-50/30"
                : "border-[#E5E7EB] hover:border-[#D1D5DB] focus-visible:border-[#0B1726] focus-visible:ring-2 focus-visible:ring-[#0B1726]",
              disabled && "bg-[#F7F7F5] text-zinc-500 cursor-not-allowed border-[#E5E7EB]",
              className
            )}
            {...props}
          />
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

Textarea.displayName = "Textarea";
