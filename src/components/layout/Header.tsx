'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Locale, LOCALES, LOCALE_CONFIG, CURRENCIES, CurrencyCode } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import { Globe, Menu, X, ArrowUpRight, CalendarDays } from 'lucide-react';

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

  const isHomePage = pathname === '/' || pathname === `/${locale}` || pathname === `/${locale}/`;

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
    } else {
      document.body.style.overflow = '';
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
          ? 'bg-[#0A1224]/20 backdrop-blur-md border-b border-white/10 py-3.5 sm:py-4'
          : 'bg-[#0A1224]/95 backdrop-blur-lg border-b border-gold/20 shadow-[0_4px_25px_rgba(0,0,0,0.5)] py-2.5 sm:py-3'
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        {/* LOGO: DUYUF ALRAHMAN VIP MARK + ARABIC NAME */}
        <Link
          href={locale === 'en' ? '/' : `/${locale}`}
          className="flex items-center gap-2.5 sm:gap-3 group focus-visible:ring-2 focus-visible:ring-gold rounded-lg p-1 -m-1"
          aria-label="Duyuf Alrahman VIP - ضيوف الرحمن VIP"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden border border-gold/50 flex items-center justify-center shadow-[0_2px_10px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-transform shrink-0 bg-[#0A1224]">
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
            <span className="font-display font-bold text-base sm:text-lg md:text-xl tracking-wide uppercase text-white group-hover:text-gold transition-colors leading-tight">
              {locale === 'ar' ? 'ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP'}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-gold tracking-[0.12em] leading-none mt-0.5">
              {locale === 'ar' ? 'Duyuf Alrahman VIP' : 'ضيوف الرحمن VIP'}
            </span>
          </div>
        </Link>

        {/* DESKTOP CENTER NAVIGATION LINKS */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-6 font-medium text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/85 hover:text-gold transition-colors py-1 relative text-sm tracking-wide font-sans after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT CONTROLS: LANGUAGE, CURRENCY, BOOK ONLINE CTA, MOBILE TOGGLE */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* CURRENCY SELECTOR */}
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              aria-label="Currency Selector"
              className="h-9 sm:h-10 px-2 sm:px-2.5 pr-5 rtl:pr-2 sm:rtl:pr-2.5 rtl:pl-5 text-xs font-semibold rounded-[8px] border border-white/20 bg-white/10 hover:bg-white/15 text-white cursor-pointer hover:border-gold focus:outline-none focus:ring-2 focus:ring-gold appearance-none backdrop-blur-md transition-colors"
            >
              {Object.keys(CURRENCIES).map((c) => (
                <option key={c} value={c} className="bg-[#0A1224] text-white">
                  {c} ({CURRENCIES[c as CurrencyCode].symbol.trim()})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-1.5 text-gold">
              <span className="text-[8px]">▼</span>
            </div>
          </div>

          {/* LANGUAGE SELECTOR */}
          <div className="relative">
            <select
              value={locale}
              onChange={(e) => handleLanguageChange(e.target.value as Locale)}
              aria-label="Language Selector"
              className="h-9 sm:h-10 px-2 sm:px-2.5 pr-7 rtl:pr-2 sm:rtl:pr-2.5 rtl:pl-7 text-xs font-semibold rounded-[8px] border border-white/20 bg-white/10 hover:bg-white/15 text-white cursor-pointer hover:border-gold focus:outline-none focus:ring-2 focus:ring-gold appearance-none flex items-center backdrop-blur-md transition-colors"
            >
              {LOCALES.map((l) => (
                <option key={l} value={l} className="bg-[#0A1224] text-white">
                  {LOCALE_CONFIG[l].nativeName}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 flex items-center px-1.5 sm:px-2 text-gold">
              <Globe className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* GOLD BOOK ONLINE CTA */}
          <Link
            href={isHomePage ? '#booking-calculator' : `/${locale}/booking`}
            className="hidden sm:inline-flex items-center gap-1.5 h-9 sm:h-10 px-4 text-xs font-bold uppercase tracking-wider rounded-[8px] bg-gold text-[#0A1224] hover:bg-[#E8C766] hover:text-[#0A1224] transition-all shadow-[0_2px_14px_rgba(212,175,55,0.35)] focus-visible:ring-2 focus-visible:ring-gold"
          >
            <span>{locale === 'ar' ? 'احجز أونلاين' : 'Book Online'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-[-90deg]" />
          </Link>

          {/* MOBILE HAMBURGER BUTTON (w-10 h-10 touch target compliant) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-fullscreen"
            className="lg:hidden w-10 h-10 rounded-[8px] border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-gold backdrop-blur-md"
          >
            <Menu className="w-5 h-5 text-gold" />
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
          aria-label="Mobile Navigation"
          className="lg:hidden fixed inset-0 z-50 bg-[#0A1224]/98 backdrop-blur-2xl flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn"
        >
          {/* DRAWER TOP BAR: BRAND + CLOSE */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4">
            <Link
              href={locale === 'en' ? '/' : `/${locale}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-gold/50 flex items-center justify-center shadow-xs bg-[#0A1224]">
                <Image
                  src="/icon-192.png"
                  alt="Duyuf Alrahman VIP"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-start">
                <span className="font-display font-bold text-lg uppercase text-white leading-tight">
                  {locale === 'ar' ? 'ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP'}
                </span>
                <span className="text-[10px] font-semibold text-gold">
                  {locale === 'ar' ? 'Duyuf Alrahman VIP' : 'ضيوف الرحمن VIP'}
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Navigation Menu"
              className="w-10 h-10 rounded-[8px] border border-white/20 bg-white/10 text-white hover:text-gold transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-gold"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* DRAWER NAVIGATION LINKS */}
          <nav aria-label="Mobile Navigation Links" className="flex flex-col py-6 divide-y divide-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center justify-between text-base font-medium text-white/90 hover:text-gold transition-colors px-2 py-3"
              >
                <span>{link.label}</span>
                <span className="text-gold text-sm rtl:rotate-180">→</span>
              </Link>
            ))}
          </nav>

          {/* DRAWER FOOTER CONTROLS & CTA */}
          <div className="flex flex-col gap-4 pt-4 border-t border-white/15">
            <Link
              href={isHomePage ? '#booking-calculator' : `/${locale}/booking`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full min-h-[48px] rounded-[8px] bg-gold text-[#0A1224] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:bg-[#E8C766] transition-colors"
            >
              <CalendarDays className="w-4 h-4" />
              <span>{locale === 'ar' ? 'احجز أونلاين' : 'Book Online'}</span>
            </Link>

            <div className="flex items-center justify-between text-xs text-white/60 px-1 pt-1">
              <Link
                href={`/${locale}/track-booking`}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center hover:text-gold underline"
              >
                {dict.nav.trackBooking}
              </Link>
              <Link
                href={`/${locale}/partners`}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center hover:text-gold underline"
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
