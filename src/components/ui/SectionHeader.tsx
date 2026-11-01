import React from 'react';
import { Sparkles } from 'lucide-react';

export interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  theme?: 'light' | 'navy';
  align?: 'center' | 'start';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeIcon,
  title,
  subtitle,
  theme = 'light',
  align = 'center',
  className = '',
}) => {
  const isNavy = theme === 'navy';
  const isCenter = align === 'center';

  return (
    <div
      className={`max-w-3xl mb-12 sm:mb-16 ${
        isCenter ? 'mx-auto text-center' : 'text-start'
      } ${className}`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 ${
            isNavy
              ? 'bg-[#111C30] border border-[#C5A15D]/40 text-[#D7B76C]'
              : 'bg-[#FFFFFF] border border-[#E8E3DA] text-[#C5A15D] shadow-xs'
          }`}
        >
          {badgeIcon ? badgeIcon : <Sparkles className="w-3.5 h-3.5 text-[#C5A15D]" />}
          <span>{badge}</span>
        </div>
      )}

      <h2
        className={`font-serif font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-4 ${
          isNavy ? 'text-[#F7F5F0]' : 'text-[#182235]'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`text-sm sm:text-base md:text-lg font-light leading-relaxed ${
            isNavy ? 'text-[#E8E3DA]/80' : 'text-[#687386]'
          } ${isCenter ? 'max-w-2xl mx-auto' : ''}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
