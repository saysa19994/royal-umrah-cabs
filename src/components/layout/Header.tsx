'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { DuyufSignature } from '@/components/brand/DuyufSignature';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, LOCALES, LOCALE_CONFIG, CURRENCIES, CurrencyCode } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { useCurrency } from '@/context/CurrencyContext';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Globe, Menu, X, ArrowUpRight, CalendarDays, ChevronDown } from 'lucide-react';

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
  settings?: SiteSettings;
}

const HEADER_I18N: Record<
  Locale,
  {
    blog: string;
    bookOnline: string;
    ziyarat: string;
    selectLang: string;
    selectCurrency: string;
    navigation: string;
  }
> = {
  ar: {
    blog: 'المدونة',
    bookOnline: 'احجز أونلاين',
    ziyarat: 'المزارات',
    selectLang: 'اللغة',
    selectCurrency: 'العملة',
    navigation: 'القائمة الرئيسية',
  },
  en: {
    blog: 'Blog',
    bookOnline: 'Book Online',
    ziyarat: 'Ziyarat',
    selectLang: 'Language',
    selectCurrency: 'Currency',
    navigation: 'Main Navigation',
  },
  ms: {
    blog: 'Blog',
    bookOnline: 'Tempah Dalam Talian',
    ziyarat: 'Ziarah',
    selectLang: 'Bahasa',
    selectCurrency: 'Mata Wang',
    navigation: 'Navigasi Utama',
  },
  id: {
    blog: 'Blog',
    bookOnline: 'Pesan Online',
    ziyarat: 'Ziarah',
    selectLang: 'Bahasa',
    selectCurrency: 'Mata Uang',
    navigation: 'Navigasi Utama',
  },
  ur: {
    blog: 'بلاگ',
    bookOnline: 'آن لائن بک کریں',
    ziyarat: 'زیارات',
    selectLang: 'زبان',
    selectCurrency: 'کرنسی',
    navigation: 'مین مینو',
  },
  fr: {
    blog: 'Blog',
    bookOnline: 'Réserver en Ligne',
    ziyarat: 'Ziyarat',
    selectLang: 'Langue',
    selectCurrency: 'Devise',
    navigation: 'Navigation Principale',
  },
  es: {
    blog: 'Blog',
    bookOnline: 'Reservar Online',
    ziyarat: 'Ziyarat',
    selectLang: 'Idioma',
    selectCurrency: 'Moneda',
    navigation: 'Navegación Principal',
  },
  de: {
    blog: 'Blog',
    bookOnline: 'Online Buchen',
    ziyarat: 'Ziyarat',
    selectLang: 'Sprache',
    selectCurrency: 'Währung',
    navigation: 'Hauptnavigation',
  },
  tr: {
    blog: 'Blog',
    bookOnline: 'Online Rezervasyon',
    ziyarat: 'Ziyaret',
    selectLang: 'Dil',
    selectCurrency: 'Para Birimi',
    navigation: 'Ana Menü',
  },
  hi: {
    blog: 'ब्लॉग',
    bookOnline: 'ऑनलाइन बुक करें',
    ziyarat: 'ज़ियारत',
    selectLang: 'भाषा',
    selectCurrency: 'मुद्रा',
    navigation: 'मुख्य मेन्यू',
  },
};

export function Header({ locale, dict, settings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { currency, setCurrency } = useCurrency();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const menuRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === '/' || pathname === `/${locale}` || pathname === `/${locale}/`;
  const t = HEADER_I18N[locale] || HEADER_I18N.en;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on ESC key and prevent background scroll when open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('ruc_mobile_menu', { detail: { open: true } }));
      }
    } else {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('ruc_mobile_menu', { detail: { open: false } }));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Language switch handler that preserves the equivalent page path
  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === locale) return;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && LOCALES.includes(segments[0] as Locale)) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    const newPath = '/' + segments.join('/');
    router.push(newPath);
  };

  const primaryNavLinks = [
    { href: locale === 'en' ? '/' : `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/fleet`, label: dict.nav.fleet },
    { href: `/${locale}/pricing`, label: dict.nav.pricing },
    { href: `/${locale}/ziyarat`, label: t.ziyarat },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: '/' + locale + '/blog', label: t.blog },
    { href: `/${locale}/about`, label: dict.nav.about },
  ];

  const allNavLinks = [
    { href: `/${locale}/routes`, label: dict.nav.routes },
    { href: `/${locale}/fleet`, label: dict.nav.fleet },
    { href: `/${locale}/pricing`, label: dict.nav.pricing },
    { href: `/${locale}/ziyarat`, label: t.ziyarat },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/blog`, label: t.blog },
    { href: `/${locale}/guides`, label: dict.nav.guides },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const isTransparent = isHomePage && !isScrolled;

  const headerBgClass = isTransparent
    ? (isDark ? 'bg-[#0B111A]/40 backdrop-blur-md border-b border-white/10' : 'bg-[#FBF9F5]/70 backdrop-blur-md border-b border-black/5')
    : (isDark
        ? 'bg-[#0B111A]/95 backdrop-blur-lg border-b border-[#222E40] shadow-[0_4px_25px_rgba(0,0,0,0.4)]'
        : 'bg-[#FBF9F5]/95 backdrop-blur-lg border-b border-[#E8E2D6] shadow-[0_2px_15px_rgba(0,0,0,0.04)]');

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent ? 'py-3.5 sm:py-4' : 'py-2.5 sm:py-3'
      } ${headerBgClass}`}
    >
      {Boolean(settings?.promo_banner_enabled) && (
        <div className="bg-gradient-to-r from-[#A0783E] via-[#B88B4E] to-[#A0783E] text-white text-[11px] sm:text-xs font-bold py-1 px-3 text-center tracking-wide shadow-xs">
          <span>{settings?.announcement_translations?.[locale] || settings?.promo_banner_text || ''}</span>
        </div>
      )}
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl flex items-center justify-between">
        {/* DUYUF WORDMARK — legible in both color themes */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 group shrink-0 min-w-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)]"
          aria-label="Duyuf Alrahman VIP — ضيوف الرحمن VIP"
        >
          <DuyufSignature className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 shrink-0 text-[var(--text-primary)]" />
          <span className="flex min-w-0 flex-col text-start leading-tight">
            <strong className="text-[12px] sm:text-sm md:text-[15px] tracking-[0.025em] font-extrabold text-[var(--text-primary)] whitespace-nowrap">
              {locale === 'ar' || locale === 'ur' ? 'ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP'}
            </strong>
            <span className="mt-0.5 text-[9px] sm:text-[10px] font-semibold text-[var(--accent-primary)] whitespace-nowrap tracking-[0.025em]">
              {locale === 'ar' || locale === 'ur' ? 'DUYUF AL RAHMAN' : 'ضيوف الرحمن · PRIVATE TRANSFERS'}
            </span>
          </span>
        </Link>

        {/* DESKTOP CENTER NAVIGATION LINKS */}
        <nav aria-label={t.navigation} className="hidden lg:flex items-center gap-4 xl:gap-6 font-medium text-xs xl:text-sm">
          {primaryNavLinks.map((link) => {
            const isActive = pathname === link.href || pathname === `${link.href}/`;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 relative tracking-wide font-sans ${
                  isDark
                    ? (isActive ? 'text-[#B88B4E] font-semibold' : 'text-[#F7F5F0]/85 hover:text-[#B88B4E]')
                    : (isActive ? 'text-[#A0783E] font-semibold' : 'text-[#111824]/85 hover:text-[#A0783E]')
                } after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 ${
                  isDark ? 'after:bg-[#B88B4E]' : 'after:bg-[#A0783E]'
                } ${
                  isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                } after:transition-transform after:duration-300`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS: THEME SWITCHER, LANGUAGE, CURRENCY, BOOK ONLINE CTA, MOBILE TOGGLE */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* THEME SWITCHER (ALWAYS VISIBLE — MOBILE & DESKTOP) */}
          <div className="flex items-center">
            <ThemeToggle locale={locale} />
          </div>

          {/* CURRENCY SELECTOR (DESKTOP / TABLET ONLY — AVAILABLE IN MOBILE MENU DRAWER) */}
          <div className="relative hidden sm:block">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              aria-label={t.selectCurrency}
              className={`h-8 sm:h-9 px-1.5 sm:px-2.5 pr-4 rtl:pr-1.5 sm:rtl:pr-2.5 rtl:pl-4 text-[11px] sm:text-xs font-semibold rounded-lg border cursor-pointer focus:outline-none focus:ring-2 appearance-none backdrop-blur-md transition-colors max-w-[68px] sm:max-w-none truncate ${
                isDark
                  ? 'border-[#222E40] bg-[#131C28] hover:bg-[#1A2534] text-white hover:border-[#B88B4E] focus:ring-[#B88B4E]'
                  : 'border-[#E8E2D6] bg-white hover:bg-[#F2EDE4] text-[#111824] hover:border-[#A0783E] focus:ring-[#A0783E]'
              }`}
            >
              {Object.keys(CURRENCIES).map((c) => (
                <option key={c} value={c} className={isDark ? 'bg-[#0B111A] text-white' : 'bg-white text-[#111824]'}>
                  {c} ({CURRENCIES[c as CurrencyCode].symbol.trim()})
                </option>
              ))}
            </select>
            <div className={`pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-1 ${
              isDark ? 'text-[#B88B4E]' : 'text-[#A0783E]'
            }`}>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>

          {/* LANGUAGE SELECTOR (DESKTOP / TABLET ONLY — AVAILABLE IN MOBILE MENU DRAWER) */}
          <div className="relative hidden sm:block">
            <select
              value={locale}
              onChange={(e) => handleLanguageChange(e.target.value as Locale)}
              aria-label={t.selectLang}
              className={`h-8 sm:h-9 px-1.5 sm:px-2.5 pr-5 rtl:pr-1.5 sm:rtl:pr-2.5 rtl:pl-5 text-[11px] sm:text-xs font-semibold rounded-lg border cursor-pointer focus:outline-none focus:ring-2 appearance-none flex items-center backdrop-blur-md transition-colors max-w-[72px] sm:max-w-none truncate ${
                isDark
                  ? 'border-[#222E40] bg-[#131C28] hover:bg-[#1A2534] text-white hover:border-[#B88B4E] focus:ring-[#B88B4E]'
                  : 'border-[#E8E2D6] bg-white hover:bg-[#F2EDE4] text-[#111824] hover:border-[#A0783E] focus:ring-[#A0783E]'
              }`}
            >
              {LOCALES.map((l) => (
                <option key={l} value={l} className={isDark ? 'bg-[#0B111A] text-white' : 'bg-white text-[#111824]'}>
                  {LOCALE_CONFIG[l].nativeName}
                </option>
              ))}
            </select>
            <div className={`pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-1.5 ${
              isDark ? 'text-[#B88B4E]' : 'text-[#A0783E]'
            }`}>
              <Globe className="w-3 h-3" />
            </div>
          </div>

          {/* BRONZE BOOK ONLINE CTA (DESKTOP ONLY) */}
          <Link
            href={`/${locale}/booking`}
            className={`hidden sm:inline-flex items-center gap-1.5 h-8 sm:h-9 px-4 sm:px-5 text-[11px] sm:text-xs font-semibold rounded-full active:scale-[0.98] transition-all shadow-xs focus-visible:ring-2 text-white ${
              isDark
                ? 'bg-[#B88B4E] hover:bg-[#CDA062] focus-visible:ring-[#B88B4E]'
                : 'bg-[#A0783E] hover:bg-[#8A6530] focus-visible:ring-[#A0783E]'
            }`}
          >
            <span>{t.bookOnline}</span>
            <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-[-90deg]" />
          </Link>

          {/* MOBILE HAMBURGER BUTTON (w-10 h-10 touch target compliant) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-fullscreen"
            className={`lg:hidden w-10 h-10 min-w-[40px] rounded-lg border transition-colors flex items-center justify-center focus-visible:ring-2 backdrop-blur-md ${
              isDark
                ? 'border-[#222E40] bg-[#131C28] text-white focus-visible:ring-[#B88B4E]'
                : 'border-[#E8E2D6] bg-white text-[#111824] focus-visible:ring-[#A0783E]'
            }`}
          >
            <Menu className={`w-5 h-5 ${isDark ? 'text-[#B88B4E]' : 'text-[#A0783E]'}`} />
          </button>
        </div>
      </div>

      {/* MOBILE FULL-SCREEN DARK DRAWER */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-fullscreen"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.navigation}
          className={`lg:hidden fixed inset-0 z-50 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn ${
            isDark ? 'bg-[#0B111A]/98 text-[#F7F5F0]' : 'bg-[#FBF9F5]/98 text-[#111824]'
          }`}
        >
          {/* DRAWER TOP BAR: BRAND + CLOSE */}
          <div className={`flex items-center justify-between pb-4 border-b ${
            isDark ? 'border-white/15' : 'border-[#E8E2D6]'
          }`}>
            <Link
              href={locale === 'en' ? '/' : `/${locale}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-lg overflow-hidden border flex items-center justify-center shadow-xs ${
                isDark ? 'border-[#B88B4E]/60 bg-[#131C28]' : 'border-[#E8E2D6] bg-white'
              }`}>
                <DuyufSignature className={`h-9 w-9 ${isDark ? 'text-[#F4EDE0]' : 'text-[#173B45]'}`} />
              </div>
              <div className="flex flex-col text-start">
                <span className="font-serif font-bold text-lg uppercase leading-tight">
                  {locale === 'ar' ? 'ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP'}
                </span>
                <span className={`text-[10px] font-semibold ${isDark ? 'text-[#B88B4E]' : 'text-[#A0783E]'}`}>
                  {locale === 'ar' ? 'Duyuf Alrahman VIP' : 'ضيوف الرحمن VIP'}
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation Menu"
              className={`w-10 h-10 rounded-lg border transition-colors flex items-center justify-center focus-visible:ring-2 ${
                isDark
                  ? 'border-white/20 bg-white/10 text-white hover:text-[#B88B4E] focus-visible:ring-[#B88B4E]'
                  : 'border-[#E8E2D6] bg-white text-[#111824] hover:text-[#A0783E] focus-visible:ring-[#A0783E]'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* DRAWER NAVIGATION LINKS */}
          <nav aria-label={t.navigation} className={`flex flex-col py-4 divide-y ${
            isDark ? 'divide-white/10' : 'divide-[#E8E2D6]'
          }`}>
            {allNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`min-h-[44px] flex items-center justify-between text-base font-medium transition-colors px-2 py-2.5 ${
                  isDark ? 'text-white/90 hover:text-[#B88B4E]' : 'text-[#111824]/90 hover:text-[#A0783E]'
                }`}
              >
                <span>{link.label}</span>
                <span className={`text-sm rtl:rotate-180 ${isDark ? 'text-[#B88B4E]' : 'text-[#A0783E]'}`}>→</span>
              </Link>
            ))}
          </nav>

          {/* DRAWER CONTROLS: THEME SWITCHER + LANGUAGE & CURRENCY */}
          <div className={`py-4 border-t space-y-3 ${isDark ? 'border-white/10' : 'border-[#E8E2D6]'}`}>
            <div>
              <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${
                isDark ? 'text-white/60' : 'text-[#526072]'
              }`}>
                {isDark ? (locale === 'ar' ? 'مظهر الموقع' : 'Theme Mode') : (locale === 'ar' ? 'مظهر الموقع' : 'Theme Mode')}
              </label>
              <ThemeToggle locale={locale} showLabel={true} className="w-full h-11" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${
                  isDark ? 'text-white/60' : 'text-[#526072]'
                }`}>
                  {t.selectLang}
                </label>
                <select
                  value={locale}
                  onChange={(e) => {
                    handleLanguageChange(e.target.value as Locale);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full h-11 px-3 rounded-lg border text-xs font-semibold focus:outline-none focus:ring-2 ${
                    isDark
                      ? 'bg-[#131C28] border-white/20 text-white focus:ring-[#B88B4E]'
                      : 'bg-white border-[#E8E2D6] text-[#111824] focus:ring-[#A0783E]'
                  }`}
                >
                  {LOCALES.map((l) => (
                    <option key={l} value={l} className={isDark ? 'bg-[#0B111A] text-white' : 'bg-white text-[#111824]'}>
                      {LOCALE_CONFIG[l].nativeName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${
                  isDark ? 'text-white/60' : 'text-[#526072]'
                }`}>
                  {t.selectCurrency}
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className={`w-full h-11 px-3 rounded-lg border text-xs font-semibold focus:outline-none focus:ring-2 ${
                    isDark
                      ? 'bg-[#131C28] border-white/20 text-white focus:ring-[#B88B4E]'
                      : 'bg-white border-[#E8E2D6] text-[#111824] focus:ring-[#A0783E]'
                  }`}
                >
                  {Object.keys(CURRENCIES).map((c) => (
                    <option key={c} value={c} className={isDark ? 'bg-[#0B111A] text-white' : 'bg-white text-[#111824]'}>
                      {c} ({CURRENCIES[c as CurrencyCode].symbol.trim()})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* DRAWER FOOTER CONTROLS & CTA */}
          <div className="flex flex-col gap-3 pt-4 border-t border-white/15">
            <Link
              href={`/${locale}/booking`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-h-[48px] rounded-lg bg-gradient-to-r from-[#C5A15D] to-[#D7B76C] text-[#101827] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(197,161,93,0.4)] hover:brightness-105 transition-all"
            >
              <CalendarDays className="w-4 h-4" />
              <span>{t.bookOnline}</span>
            </Link>

            <div className="flex items-center justify-between text-xs text-white/60 px-1 pt-1">
              <Link
                href={`/${locale}/track-booking`}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center hover:text-[#C5A15D] underline"
              >
                {dict.nav.trackBooking}
              </Link>
              <Link
                href={`/${locale}/partners`}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center hover:text-[#C5A15D] underline"
              >
                {dict.nav.account}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
