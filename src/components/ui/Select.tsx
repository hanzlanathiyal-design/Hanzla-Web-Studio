import React, { useId } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";
import { cn } from "../../utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options?: SelectOption[];
  containerClassName?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      options,
      placeholder,
      className,
      containerClassName,
      id: customId,
      disabled,
      required,
      children,
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
          <select
            id={id}
            ref={ref}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              "w-full h-11 sm:h-10 pl-3.5 pr-10 text-sm bg-white text-zinc-900 rounded-xl border appearance-none transition-all duration-150 outline-none cursor-pointer",
              error
                ? "border-rose-500 focus-visible:border-rose-600 focus-visible:ring-2 focus-visible:ring-rose-500/30 bg-rose-50/30"
                : "border-[#E5E7EB] hover:border-[#D1D5DB] focus-visible:border-[#0B1726] focus-visible:ring-2 focus-visible:ring-[#0B1726]",
              disabled && "bg-[#F7F7F5] text-zinc-500 cursor-not-allowed border-[#E5E7EB]",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <div className="absolute right-3.5 pointer-events-none text-zinc-600 flex items-center">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

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

Select.displayName = "Select";
