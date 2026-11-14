'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { Locale } from '@/i18n/config';

interface ThemeToggleProps {
  locale?: Locale;
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ locale = 'en', className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme, isLoaded } = useTheme();
  const isAr = locale === 'ar' || locale === 'ur';

  const labelToDark = isAr ? 'التبديل إلى الوضع الداكن' : 'Switch to Dark Mode';
  const labelToLight = isAr ? 'التبديل إلى الوضع الفاتح' : 'Switch to Light Mode';
  const currentLabel = theme === 'dark' ? labelToLight : labelToDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={currentLabel}
      title={currentLabel}
      className={`relative inline-flex items-center justify-center gap-2 min-h-[40px] h-10 px-3 rounded-full text-xs font-medium transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A0783E] ${
        theme === 'dark'
          ? 'bg-[#131C28] hover:bg-[#1A2534] text-[#F7F5F0] border-[#222E40] shadow-sm'
          : 'bg-[#FFFFFF] hover:bg-[#F2EDE4] text-[#111824] border-[#E8E2D6] shadow-sm'
      } ${className}`}
    >
      <span className="relative w-4 h-4 flex items-center justify-center shrink-0">
        {/* Sun Icon for switching to light (shown in dark mode) */}
        <Sun
          className={`w-4 h-4 text-[#B88B4E] transition-all duration-300 absolute inset-0 ${
            !isLoaded || theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
          }`}
          aria-hidden="true"
        />
        {/* Moon Icon for switching to dark (shown in light mode) */}
        <Moon
          className={`w-4 h-4 text-[#A0783E] transition-all duration-300 absolute inset-0 ${
            isLoaded && theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-50 pointer-events-none'
          }`}
          aria-hidden="true"
        />
      </span>

      {showLabel && (
        <span className="truncate tracking-wide">
          {theme === 'dark' ? (isAr ? 'نهاري' : 'Light') : (isAr ? 'ليلي' : 'Dark')}
        </span>
      )}
    </button>
  );
}
