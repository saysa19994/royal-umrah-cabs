import React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { Phone, MessageCircle, ShieldCheck, Clock, CheckCircle2, Headphones } from 'lucide-react';

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
}

export function Footer({ locale, dict, settings }: FooterProps) {
  const waUrl = `https://wa.me/${settings.whatsapp_number}`;
  const telUrl = `tel:${settings.phone}`;

  return (
    <footer className="bg-surface text-body border-t border-border mt-auto">
      {/* 5-COLUMN MAIN GRID */}
      <div className="container mx-auto px-4 max-w-7xl pt-12 pb-8 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 text-start">
          {/* COL 1: WORDMARK, SHORT TAGLINE, WHATSAPP & CALL BUTTONS */}
          <div className="space-y-4 lg:col-span-1">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2.5">
              <span className="text-2xl">🕋</span>
              <div className="flex flex-col text-start">
                <span className="font-display font-bold text-xl uppercase tracking-wide text-ink">
                  {dict.meta.brand}
                </span>
                <span className="text-[10px] font-bold text-gold-dark tracking-[0.16em] uppercase">
                  {dict.meta.brandSub}
                </span>
              </div>
            </Link>
            <p className="text-xs text-ink-muted leading-relaxed max-w-sm">
              {dict.footer.desc}
            </p>
            {/* WHATSAPP & CALL DIRECT BUTTONS */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-btn bg-gold text-ink text-xs font-bold hover:bg-gold-hover hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{dict.footer.whatsappBtn}</span>
              </a>
              <a
                href={telUrl}
                className="inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-btn border border-border-strong text-ink text-xs font-semibold hover:border-gold-dark hover:bg-bg-alt transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{dict.footer.callBtn}</span>
              </a>
            </div>
          </div>

          {/* COL 2: POPULAR ROUTES (ALL 6 EXACT ROUTES) */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink mb-3.5 font-display text-sm">
              {dict.footer.popularRoutes}
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-muted">
              <li>
                <Link href={`/${locale}/routes/jeddah-airport-to-makkah`} className="hover:text-gold-dark transition-colors">
                  Jeddah Airport to Makkah
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/makkah-to-madinah`} className="hover:text-gold-dark transition-colors">
                  Makkah to Madinah VIP
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/madinah-to-makkah`} className="hover:text-gold-dark transition-colors">
                  Madinah to Makkah (Miqat Stop)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/makkah-to-jeddah-airport`} className="hover:text-gold-dark transition-colors">
                  Makkah to Jeddah Airport
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/jeddah-to-madinah`} className="hover:text-gold-dark transition-colors">
                  Jeddah Airport to Madinah
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/routes/madinah-airport-to-hotel`} className="hover:text-gold-dark transition-colors">
                  Madinah Airport to Hotel
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3: SERVICES & FLEET */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink mb-3.5 font-display text-sm">
              {dict.footer.servicesFleet}
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-muted">
              <li>
                <Link href={`/${locale}/services`} className="hover:text-gold-dark transition-colors">
                  {dict.services_list.airportTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-gold-dark transition-colors">
                  {dict.services_list.intercityTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-gold-dark transition-colors">
                  {dict.services_list.hourlyTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-gold-dark transition-colors">
                  {dict.services_list.ziyaratTitle}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fleet/hyundai-staria`} className="hover:text-gold-dark transition-colors">
                  Hyundai Staria VIP (7 Seats)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fleet/gmc-yukon-xl`} className="hover:text-gold-dark transition-colors">
                  GMC Yukon XL (VIP SUV)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fleet/toyota-camry`} className="hover:text-gold-dark transition-colors">
                  Toyota Camry (Executive Sedan)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/fleet/toyota-hiace`} className="hover:text-gold-dark transition-colors">
                  Toyota HiAce (Family Mini Bus)
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4: COMPANY (ALL REAL PAGES) */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink mb-3.5 font-display text-sm">
              {dict.footer.company}
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-muted">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-gold-dark transition-colors">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/team`} className="hover:text-gold-dark transition-colors">
                  Our Team &amp; Chauffeurs
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/safety`} className="hover:text-gold-dark transition-colors">
                  Safety Standards &amp; Protocol
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#how-it-works`} className="hover:text-gold-dark transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/track-booking`} className="hover:text-gold-dark font-medium text-ink">
                  {dict.nav.trackBooking}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/manage-booking`} className="hover:text-gold-dark font-medium text-ink">
                  Manage Booking
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/partners`} className="hover:text-gold-dark font-medium text-gold-dark">
                  Travel Agency Partners
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-gold-dark transition-colors">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 5: LEGAL & HELP (ALL REAL PAGES) */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink mb-3.5 font-display text-sm">
              Legal &amp; Support
            </h4>
            <ul className="space-y-2.5 text-xs text-ink-muted">
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-gold-dark transition-colors">
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-gold-dark transition-colors">
                  {dict.footer.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cancellation`} className="hover:text-gold-dark transition-colors">
                  {dict.footer.refunds}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cookies`} className="hover:text-gold-dark transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#faq`} className="hover:text-gold-dark transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-gold-dark transition-colors">
                  Contact Support 24/7
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BEIGE TRUST STRIP */}
      <div className="border-y border-border bg-bg-alt py-3.5">
        <div className="container mx-auto px-4 max-w-7xl flex flex-wrap items-center justify-between gap-4 text-xs text-body">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
            <span>{dict.trust_strip.fixedPrices}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold-dark shrink-0" />
            <span>{dict.trust_strip.flightTracking}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-dark shrink-0" />
            <span>{dict.trust_strip.payOnArrival}</span>
          </div>
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-gold-dark shrink-0" />
            <span>{dict.trust_strip.support247}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM LEGAL & COPYRIGHT BAR */}
      <div className="container mx-auto px-4 max-w-7xl py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ink-muted">
        <p>{dict.footer.copyright}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href={`/${locale}/privacy`} className="hover:text-ink transition-colors">
            {dict.footer.privacy}
          </Link>
          <Link href={`/${locale}/terms`} className="hover:text-ink transition-colors">
            {dict.footer.terms}
          </Link>
          <Link href={`/${locale}/cancellation`} className="hover:text-ink transition-colors">
            {dict.footer.refunds}
          </Link>
          <Link href={`/${locale}/cookies`} className="hover:text-ink transition-colors">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
