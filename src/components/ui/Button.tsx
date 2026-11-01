import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A15D] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]';

    const sizeStyles = {
      sm: 'min-h-[38px] px-4 py-1.5 text-xs rounded-full gap-1.5',
      md: 'min-h-[48px] px-7 py-3 text-xs sm:text-sm rounded-full gap-2',
      lg: 'min-h-[56px] px-9 py-4 text-sm sm:text-base rounded-full gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-[#C5A15D] via-[#D7B76C] to-[#C5A15D] bg-[length:200%_auto] text-[#101827] shadow-[0_4px_18px_rgba(197,161,93,0.28)] hover:shadow-[0_6px_24px_rgba(197,161,93,0.38)] hover:bg-[position:right_center] hover:brightness-[1.04]',
      secondary:
        'bg-[#101827] text-[#FFFFFF] border border-[#C5A15D]/40 hover:border-[#C5A15D] hover:bg-[#111C30] hover:text-[#D7B76C] shadow-md',
      outline:
        'bg-transparent text-[#182235] border border-[#E8E3DA] hover:border-[#C5A15D] hover:bg-[#F7F5F0] hover:text-[#101827]',
      ghost:
        'bg-transparent text-[#182235] hover:bg-[#F7F5F0] hover:text-[#101827]',
      whatsapp:
        'bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-[0_4px_18px_rgba(37,211,102,0.25)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.35)]',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0 rtl:rotate-180">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0 rtl:rotate-180">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
