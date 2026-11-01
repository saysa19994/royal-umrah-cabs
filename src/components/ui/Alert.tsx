import React from 'react';
import { ShieldCheck, Info, AlertTriangle, CheckCircle2, X } from 'lucide-react';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'royal';
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  icon,
  onClose,
  className = '',
}) => {
  const variantStyles = {
    info: 'bg-[#F7F5F0] border-[#E8E3DA] text-[#182235]',
    success: 'bg-[#188567]/10 border-[#188567]/30 text-[#188567]',
    warning: 'bg-[#B7791F]/10 border-[#B7791F]/30 text-[#B7791F]',
    royal: 'bg-[#101827] border-[#C5A15D]/40 text-[#F7F5F0] shadow-md',
  };

  const defaultIcons = {
    info: <Info className="w-5 h-5 text-[#C5A15D] shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-[#188567] shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#B7791F] shrink-0" />,
    royal: <ShieldCheck className="w-5 h-5 text-[#D7B76C] shrink-0" />,
  };

  return (
    <div
      role="alert"
      className={`rounded-2xl border p-4 sm:p-5 flex items-start gap-3.5 transition-all ${variantStyles[variant]} ${className}`}
    >
      <div className="mt-0.5">{icon || defaultIcons[variant]}</div>
      <div className="flex-1 text-start">
        {title && (
          <h4
            className={`font-bold text-sm sm:text-base mb-1 ${
              variant === 'royal' ? 'text-[#F7F5F0]' : 'text-[#182235]'
            }`}
          >
            {title}
          </h4>
        )}
        <div
          className={`text-xs sm:text-sm font-light leading-relaxed ${
            variant === 'royal' ? 'text-[#E8E3DA]/85' : 'text-[#687386]'
          }`}
        >
          {children}
        </div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-[#687386] hover:text-[#182235] p-1 rounded-lg transition-colors cursor-pointer"
          aria-label="Close Alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
