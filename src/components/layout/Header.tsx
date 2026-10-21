'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, LOCALES, LOCALE_CONFIG, CURRENCIES, CurrencyCode } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import { Globe, Menu, X, ArrowUpRight, CalendarDays, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { currency, setCurrency } = useCurrency();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
    { href: `/${locale}/guides`, label: dict.nav.guides },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <div className="sticky top-0 z-50">
      {/* 1) EXECUTIVE ANNOUNCEMENT BAR */}
      <div className="bg-[#0A0F1D] text-gold text-xs py-2 px-4 border-b border-gold/20 text-center font-medium shadow-xs">
        <div className="container mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0" />
            {locale === 'ar'
              ? 'أسعار موسم العمرة 2026 ثابتة ومعتمدة • إلغاء مجاني حتى 24 ساعة قبل موعد الوصول'
              : 'Fixed 2026 Umrah Season Rates Available • Free Cancellation up to 24h Before Arrival'}
          </span>
          <Link
            href={`/${locale}/booking`}
            className="text-white hover:text-gold-hover underline font-bold inline-flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-gold text-xs"
          >
            <span>{locale === 'ar' ? 'احجز أونلاين' : 'Book Online'}</span>
            <span aria-hidden="true" className="rtl:rotate-180">→</span>
          </Link>
        </div>
      </div>

      {/* 2) STICKY HEADER */}
      <header
        role="banner"
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/95 backdrop-blur-md shadow-xs border-b border-border py-2.5 sm:py-3'
            : 'bg-surface/90 backdrop-blur-sm border-b border-border/60 py-3 sm:py-4'
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
          {/* WORDMARK LOGO */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 sm:gap-3 group focus-visible:ring-2 focus-visible:ring-gold rounded-lg p-1 -m-1"
            aria-label="Duyuf Alrahman VIP - ضيوف الرحمن VIP"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-gold/25 via-gold/10 to-[#0A0F1D] border border-gold/40 flex items-center justify-center text-lg sm:text-xl shadow-xs group-hover:scale-105 transition-transform shrink-0">
              🕋
            </div>
            <div className="flex flex-col text-start">
              <span className="font-display font-bold text-base sm:text-lg md:text-xl tracking-wide uppercase text-ink group-hover:text-gold-dark transition-colors leading-tight">
                {locale === 'ar' ? 'ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP'}
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-gold-dark tracking-[0.14em] uppercase leading-none mt-0.5">
                {locale === 'ar' ? 'Duyuf Alrahman VIP • نقل معتمد' : 'ضيوف الرحمن VIP • Executive Chauffeur'}
              </span>
            </div>
          </Link>

          {/* DESKTOP CENTER NAVIGATION */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 font-medium text-sm text-body">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-gold-dark transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold-dark after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT CONTROLS: CURRENCY, LANGUAGE, CTAS */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* CURRENCY SELECTOR */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                aria-label="Currency Selector"
                className="h-10 px-2 sm:px-2.5 pr-5 rtl:pr-2 sm:rtl:pr-2.5 rtl:pl-5 text-xs font-semibold rounded-btn border border-border-strong bg-surface text-ink cursor-pointer hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold appearance-none"
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c}>
                    {c} ({CURRENCIES[c as CurrencyCode].symbol.trim()})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-1 sm:px-1.5 text-ink-muted">
                <span className="text-[9px]">▼</span>
              </div>
            </div>

            {/* LANGUAGE SELECTOR */}
            <div className="relative">
              <select
                value={locale}
                onChange={(e) => handleLanguageChange(e.target.value as Locale)}
                aria-label="Language Selector"
                className="h-10 px-2 sm:px-2.5 pr-7 rtl:pr-2 sm:rtl:pr-2.5 rtl:pl-7 text-xs font-semibold rounded-btn border border-border-strong bg-surface text-ink cursor-pointer hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold appearance-none flex items-center"
              >
                {LOCALES.map((l) => (
                  <option key={l} value={l}>
                    {LOCALE_CONFIG[l].nativeName}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-1.5 sm:px-2 text-ink-muted">
                <Globe className="w-3.5 h-3.5 text-gold-dark" />
              </div>
            </div>

            {/* BOOK NOW CTA */}
            <Link
              href={`/${locale}/booking`}
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-4 text-xs font-bold uppercase tracking-wider rounded-btn bg-gold text-ink hover:bg-gold-hover hover:text-white transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span>{locale === 'ar' ? 'احجز أونلاين' : 'Book Online'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* MOBILE MENU TOGGLE */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              className="lg:hidden w-10 h-10 rounded-btn border border-border text-ink hover:bg-bg-alt transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-gold"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE EXPANDED MENU */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            ref={menuRef}
            className="lg:hidden px-4 pt-3 pb-6 border-t border-border mt-3 bg-surface shadow-lg animate-fadeIn"
          >
            <div className="flex flex-col gap-1 font-medium text-base text-ink">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] flex items-center px-2 py-2 border-b border-border/40 hover:text-gold-dark transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2.5">
                <Link
                  href={`/${locale}/booking`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full min-h-[46px] flex items-center justify-center font-bold text-sm uppercase rounded-btn bg-gold text-ink hover:bg-gold-hover transition-colors shadow-xs"
                >
                  <CalendarDays className="w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  <span>{locale === 'ar' ? 'احجز أونلاين' : 'Book Online'}</span>
                </Link>
                <div className="flex items-center justify-between text-xs text-ink-muted pt-2 px-1">
                  <Link
                    href={`/${locale}/track-booking`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center hover:text-gold-dark underline"
                  >
                    {dict.nav.trackBooking}
                  </Link>
                  <Link
                    href={`/${locale}/partners`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center hover:text-gold-dark underline"
                  >
                    {dict.nav.account}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
