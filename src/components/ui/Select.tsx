import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  options?: SelectOption[];
  containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      required = false,
      error,
      helperText,
      leftIcon,
      options,
      children,
      className = '',
      containerClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs sm:text-sm font-bold text-[#182235] mb-1.5 tracking-wide select-none"
          >
            <span>{label}</span>
            {required && <span className="text-red-500 ms-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute start-3.5 flex items-center justify-center text-[#687386] pointer-events-none z-10">
              {leftIcon}
            </div>
          )}

          <select
            ref={ref}
            id={selectId}
            className={`w-full min-h-[48px] px-4 py-3 pe-10 rounded-xl border text-sm text-[#182235] bg-[#FFFFFF] transition-all duration-200 appearance-none cursor-pointer focus:outline-none ${
              leftIcon ? 'ps-11' : ''
            } ${
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-[#E8E3DA] focus:border-[#C5A15D] focus:ring-2 focus:ring-[#C5A15D]/20 shadow-xs hover:border-[#C5A15D]/60'
            } ${className}`}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <div className="absolute end-3.5 flex items-center justify-center text-[#C5A15D] pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {error ? (
          <p className="mt-1.5 text-xs text-red-600 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-[#687386] font-light leading-relaxed">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
