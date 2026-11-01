'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, LOCALES, LOCALE_CONFIG, CURRENCIES, CurrencyCode } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { useCurrency } from '@/context/CurrencyContext';
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

  const navLinks = [
    { href: `/${locale}/routes`, label: dict.nav.routes },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/fleet`, label: dict.nav.fleet },
    { href: `/${locale}/pricing`, label: dict.nav.pricing },
    { href: `/${locale}/ziyarat`, label: t.ziyarat },
    { href: `/${locale}/blog`, label: t.blog },
    { href: `/${locale}/guides`, label: dict.nav.guides },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const isTransparent = isHomePage && !isScrolled;

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-[#101827]/30 backdrop-blur-md border-b border-white/10 py-3.5 sm:py-4'
          : 'bg-[#101827]/95 backdrop-blur-lg border-b border-[#C5A15D]/25 shadow-[0_4px_25px_rgba(0,0,0,0.5)] py-2.5 sm:py-3'
      }`}
    >
      {Boolean(settings?.promo_banner_enabled) && (
        <div className="bg-gradient-to-r from-[#C5A15D] via-[#D7B76C] to-[#C5A15D] text-[#101827] text-[11px] sm:text-xs font-bold py-1 px-3 text-center tracking-wide shadow-sm">
          <span>{settings?.announcement_translations?.[locale] || settings?.promo_banner_text || ''}</span>
        </div>
      )}
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl flex items-center justify-between">
        {/* LOGO: DUYUF ALRAHMAN VIP MARK + BRAND NAME */}
        <Link
          href={locale === 'en' ? '/' : `/${locale}`}
          className="flex items-center gap-2.5 sm:gap-3 group focus-visible:ring-2 focus-visible:ring-[#C5A15D] rounded-lg p-1 -m-1 shrink-0"
          aria-label="Duyuf Alrahman VIP - ضيوف الرحمن VIP"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-[#C5A15D]/60 flex items-center justify-center shadow-[0_2px_10px_rgba(197,161,93,0.3)] group-hover:scale-105 transition-transform shrink-0 bg-[#111C30]">
            <Image
              src="/icon-192.png"
              alt="Duyuf Alrahman VIP"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col text-start">
            <span className="font-serif font-bold text-sm sm:text-base md:text-lg tracking-tight uppercase text-white group-hover:text-[#D7B76C] transition-colors leading-tight truncate max-w-[130px] sm:max-w-none">
              {locale === 'ar' ? 'ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP'}
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-[#C5A15D] tracking-wider leading-none mt-0.5 truncate max-w-[130px] sm:max-w-none">
              {locale === 'ar' ? 'Duyuf Alrahman VIP' : 'ضيوف الرحمن VIP'}
            </span>
          </div>
        </Link>

        {/* DESKTOP CENTER NAVIGATION LINKS */}
        <nav aria-label={t.navigation} className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-6 font-medium text-xs xl:text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname === `${link.href}/`;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 relative tracking-wide font-sans ${
                  isActive
                    ? 'text-[#D7B76C] font-semibold'
                    : 'text-white/85 hover:text-[#D7B76C]'
                } after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#C5A15D] ${
                  isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                } after:transition-transform after:duration-300`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS: LANGUAGE, CURRENCY, BOOK ONLINE CTA, MOBILE TOGGLE */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* CURRENCY SELECTOR */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              aria-label={t.selectCurrency}
              className="h-8 sm:h-9 px-1.5 sm:px-2.5 pr-4 rtl:pr-1.5 sm:rtl:pr-2.5 rtl:pl-4 text-[11px] sm:text-xs font-semibold rounded-lg border border-white/20 bg-white/10 hover:bg-white/15 text-white cursor-pointer hover:border-[#C5A15D] focus:outline-none focus:ring-2 focus:ring-[#C5A15D] appearance-none backdrop-blur-md transition-colors max-w-[68px] sm:max-w-none truncate"
            >
              {Object.keys(CURRENCIES).map((c) => (
                <option key={c} value={c} className="bg-[#101827] text-white">
                  {c} ({CURRENCIES[c as CurrencyCode].symbol.trim()})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-1 text-[#C5A15D]">
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>

          {/* LANGUAGE SELECTOR */}
          <div className="relative">
            <select
              value={locale}
              onChange={(e) => handleLanguageChange(e.target.value as Locale)}
              aria-label={t.selectLang}
              className="h-8 sm:h-9 px-1.5 sm:px-2.5 pr-5 rtl:pr-1.5 sm:rtl:pr-2.5 rtl:pl-5 text-[11px] sm:text-xs font-semibold rounded-lg border border-white/20 bg-white/10 hover:bg-white/15 text-white cursor-pointer hover:border-[#C5A15D] focus:outline-none focus:ring-2 focus:ring-[#C5A15D] appearance-none flex items-center backdrop-blur-md transition-colors max-w-[72px] sm:max-w-none truncate"
            >
              {LOCALES.map((l) => (
                <option key={l} value={l} className="bg-[#101827] text-white">
                  {LOCALE_CONFIG[l].nativeName}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-1.5 text-[#C5A15D]">
              <Globe className="w-3 h-3" />
            </div>
          </div>

          {/* GOLD BOOK ONLINE CTA */}
          <Link
            href={`/${locale}/booking`}
            className="hidden sm:inline-flex items-center gap-1.5 h-9 sm:h-9 px-3.5 sm:px-4 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-lg bg-gradient-to-r from-[#C5A15D] to-[#D7B76C] text-[#101827] hover:brightness-105 active:scale-[0.98] transition-all shadow-[0_2px_14px_rgba(197,161,93,0.35)] focus-visible:ring-2 focus-visible:ring-[#C5A15D]"
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
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 min-w-[36px] sm:min-w-[40px] rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C5A15D] backdrop-blur-md"
          >
            <Menu className="w-5 h-5 text-[#C5A15D]" />
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
          className="lg:hidden fixed inset-0 z-50 bg-[#101827]/98 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn"
        >
          {/* DRAWER TOP BAR: BRAND + CLOSE */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4">
            <Link
              href={locale === 'en' ? '/' : `/${locale}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#C5A15D]/60 flex items-center justify-center shadow-xs bg-[#111C30]">
                <Image
                  src="/icon-192.png"
                  alt="Duyuf Alrahman VIP"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-start">
                <span className="font-serif font-bold text-lg uppercase text-white leading-tight">
                  {locale === 'ar' ? 'ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP'}
                </span>
                <span className="text-[10px] font-semibold text-[#C5A15D]">
                  {locale === 'ar' ? 'Duyuf Alrahman VIP' : 'ضيوف الرحمن VIP'}
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation Menu"
              className="w-10 h-10 rounded-lg border border-white/20 bg-white/10 text-white hover:text-[#C5A15D] transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#C5A15D]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* DRAWER NAVIGATION LINKS */}
          <nav aria-label={t.navigation} className="flex flex-col py-4 divide-y divide-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center justify-between text-base font-medium text-white/90 hover:text-[#C5A15D] transition-colors px-2 py-2.5"
              >
                <span>{link.label}</span>
                <span className="text-[#C5A15D] text-sm rtl:rotate-180">→</span>
              </Link>
            ))}
          </nav>

          {/* DRAWER CONTROLS: LANGUAGE & CURRENCY SELECTORS */}
          <div className="py-4 border-t border-white/10 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1.5">
                {t.selectLang}
              </label>
              <select
                value={locale}
                onChange={(e) => {
                  handleLanguageChange(e.target.value as Locale);
                  setMobileMenuOpen(false);
                }}
                className="w-full h-11 px-3 rounded-lg bg-[#111C30] border border-white/20 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#C5A15D]"
              >
                {LOCALES.map((l) => (
                  <option key={l} value={l}>
                    {LOCALE_CONFIG[l].nativeName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-white/60 mb-1.5">
                {t.selectCurrency}
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="w-full h-11 px-3 rounded-lg bg-[#111C30] border border-white/20 text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#C5A15D]"
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c}>
                    {c} ({CURRENCIES[c as CurrencyCode].symbol.trim()})
                  </option>
                ))}
              </select>
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
