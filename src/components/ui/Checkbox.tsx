import React, { useId } from "react";
import { Check } from "lucide-react";
import { cn } from "../../utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  containerClassName?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      error,
      className,
      containerClassName,
      id: customId,
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;

    return (
      <div className={cn("flex items-start gap-3 select-none text-left", containerClassName)}>
        <div className="relative flex items-center pt-0.5">
          <input
            id={id}
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />

          <label
            htmlFor={id}
            className={cn(
              "w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-150 cursor-pointer",
              "border-[#E5E7EB] bg-white hover:border-[#D1D5DB]",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-[#0B1726] peer-focus-visible:ring-offset-2",
              "peer-checked:bg-[#0B1726] peer-checked:border-[#0B1726] peer-checked:text-[#D4A72C]",
              error && "border-rose-400 bg-rose-50/20",
              disabled && "cursor-not-allowed bg-zinc-100 border-zinc-200 opacity-60",
              className
            )}
          >
            <Check className="w-3.5 h-3.5 text-white stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
          </label>
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  "text-xs sm:text-sm font-medium text-zinc-900 cursor-pointer leading-tight",
                  disabled && "cursor-not-allowed text-zinc-400"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-[11px] text-zinc-500 leading-normal mt-0.5">{description}</p>
            )}
            {error && <p className="text-[11px] font-medium text-rose-600 mt-1">{error}</p>}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
