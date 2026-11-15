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

const THEME_LABELS: Record<
  Locale,
  {
    toDark: string;
    toLight: string;
    lightShort: string;
    darkShort: string;
  }
> = {
  ar: {
    toDark: 'التبديل إلى الوضع الداكن',
    toLight: 'التبديل إلى الوضع الفاتح',
    lightShort: 'نهاري',
    darkShort: 'ليلي',
  },
  en: {
    toDark: 'Switch to Dark Mode',
    toLight: 'Switch to Light Mode',
    lightShort: 'Light',
    darkShort: 'Dark',
  },
  ms: {
    toDark: 'Tukar ke Mod Gelap',
    toLight: 'Tukar ke Mod Cerah',
    lightShort: 'Cerah',
    darkShort: 'Gelap',
  },
  id: {
    toDark: 'Beralih ke Mode Gelap',
    toLight: 'Beralih ke Mode Terang',
    lightShort: 'Terang',
    darkShort: 'Gelap',
  },
  ur: {
    toDark: 'ڈارک موڈ میں تبدیل کریں',
    toLight: 'لائٹ موڈ میں تبدیل کریں',
    lightShort: 'لائٹ',
    darkShort: 'ڈارک',
  },
  fr: {
    toDark: 'Passer en mode sombre',
    toLight: 'Passer en mode clair',
    lightShort: 'Clair',
    darkShort: 'Sombre',
  },
  es: {
    toDark: 'Cambiar a modo oscuro',
    toLight: 'Cambiar a modo claro',
    lightShort: 'Claro',
    darkShort: 'Oscuro',
  },
  de: {
    toDark: 'In den Dunkelmodus wechseln',
    toLight: 'In den Hellmodus wechseln',
    lightShort: 'Hell',
    darkShort: 'Dunkel',
  },
  tr: {
    toDark: 'Koyu Temaya Geç',
    toLight: 'Açık Temaya Geç',
    lightShort: 'Açık',
    darkShort: 'Koyu',
  },
  hi: {
    toDark: 'डार्क मोड पर स्विच करें',
    toLight: 'लाइट मोड पर स्विच करें',
    lightShort: 'लाइट',
    darkShort: 'डार्क',
  },
};

export function ThemeToggle({ locale = 'en', className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme, isLoaded } = useTheme();
  const labels = THEME_LABELS[locale] || THEME_LABELS.en;
  const currentLabel = theme === 'dark' ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={currentLabel}
      aria-pressed={theme === 'dark'}
      title={currentLabel}
      data-theme-toggle="true"
      className={`relative inline-flex items-center justify-center gap-2 min-h-[44px] h-11 px-3 rounded-xl text-xs font-semibold transition-colors duration-200 border border-[var(--border-stone)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] ${className}`}
    >
      <span className="relative w-4 h-4 flex items-center justify-center shrink-0">
        {/* Sun Icon for switching to light (shown in dark mode) */}
        <Sun
          className={`w-4 h-4 text-[var(--duyuf-copper)] transition-all duration-300 absolute inset-0 ${
            !isLoaded || theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
          }`}
          aria-hidden="true"
        />
        {/* Moon Icon for switching to dark (shown in light mode) */}
        <Moon
          className={`w-4 h-4 text-[var(--duyuf-copper)] transition-all duration-300 absolute inset-0 ${
            isLoaded && theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-50 pointer-events-none'
          }`}
          aria-hidden="true"
        />
      </span>

      {showLabel && (
        <span className="truncate tracking-wide">
          {theme === 'dark' ? labels.lightShort : labels.darkShort}
        </span>
      )}
    </button>
  );
}
