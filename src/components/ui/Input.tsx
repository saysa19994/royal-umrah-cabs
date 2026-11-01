import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required = false,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = '',
      containerClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs sm:text-sm font-bold text-[#182235] mb-1.5 tracking-wide select-none"
          >
            <span>{label}</span>
            {required && <span className="text-red-500 ms-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute start-3.5 flex items-center justify-center text-[#687386] pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`w-full min-h-[48px] px-4 py-3 rounded-xl border text-sm text-[#182235] bg-[#FFFFFF] placeholder:text-[#687386]/70 transition-all duration-200 focus:outline-none ${
              leftIcon ? 'ps-11' : ''
            } ${rightIcon ? 'pe-11' : ''} ${
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-[#E8E3DA] focus:border-[#C5A15D] focus:ring-2 focus:ring-[#C5A15D]/20 shadow-xs hover:border-[#C5A15D]/60'
            } ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute end-3.5 flex items-center justify-center text-[#687386]">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
            <span>{error}</span>
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

Input.displayName = 'Input';
