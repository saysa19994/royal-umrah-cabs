'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale, LOCALE_CONFIG } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { MessageCircle, ArrowUp, CalendarDays } from 'lucide-react';
import { TurnstileWidget } from '@/components/common/TurnstileWidget';
import { trackEvent } from '@/lib/analytics';

interface FloatingUIProps {
  locale: Locale;
  dict: Dictionary;
  whatsappNumber: string;
}

export function FloatingUI({ locale, dict, whatsappNumber }: FloatingUIProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent({
      event: 'whatsapp_handoff_initiated',
      source: 'floating_ui',
    });
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: typeof window !== 'undefined' ? window.location.pathname : '/',
          language: locale,
          'cf-turnstile-response': turnstileToken || undefined,
          source_utm: {
            referrer: typeof document !== 'undefined' ? document.referrer : '',
            url: typeof window !== 'undefined' ? window.location.href : '',
            trigger: 'floating_button',
          },
        }),
      });
      const data = await res.json();
      if (data?.whatsapp_url) {
        window.open(data.whatsapp_url, '_blank');
        return;
      }
    } catch (err) {
      console.error('Lead error:', err);
    }
    const fallbackRef = 'VIP-' + Math.floor(10000 + Math.random() * 90000);
    const fallbackMsg = encodeURIComponent(`${LOCALE_CONFIG[locale].whatsappGreeting} [Ref: ${fallbackRef}]`);
    window.open(`https://wa.me/${whatsappNumber}?text=${fallbackMsg}`, '_blank');
  };

  return (
    <>
      {/* FLOATING ACTION BUTTONS (DESKTOP & TABLET: BOTTOM-RIGHT/LEFT ACCORDING TO DIR) */}
      <aside
        aria-label="Quick Actions"
        className="fixed bottom-20 md:bottom-6 right-4 rtl:right-auto rtl:left-4 z-40 flex flex-col items-center gap-3 pointer-events-auto"
      >
        {/* BACK TO TOP BUTTON */}
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={dict.floating.backToTop}
            className="w-11 h-11 rounded-full bg-surface border-2 border-gold-dark text-ink shadow-md flex items-center justify-center hover:bg-gold-soft transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ArrowUp className="w-5 h-5 text-gold-dark" />
          </button>
        )}

        {/* FLOATING WHATSAPP BUTTON (DESKTOP) */}
        <button
          type="button"
          onClick={handleWhatsAppClick}
          aria-label={dict.floating.whatsappTooltip}
          className="hidden md:flex w-14 h-14 rounded-full bg-whatsapp hover:bg-whatsapp-hover text-white shadow-lg items-center justify-center hover:scale-105 transition-all duration-200 group relative focus-visible:ring-2 focus-visible:ring-whatsapp"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="sr-only">{dict.floating.whatsappTooltip}</span>

          {/* TOOLTIP ON HOVER (DESKTOP) */}
          <span className="hidden group-hover:block absolute right-16 rtl:right-auto rtl:left-16 whitespace-nowrap bg-charcoal text-white text-xs px-3 py-1.5 rounded-md shadow-md">
            {dict.floating.whatsappTooltip}
          </span>
        </button>
      </aside>

      {/* MOBILE STICKY BOTTOM BAR (ACCOUNTS FOR SAFE-AREA INSET) */}
      <nav
        aria-label="Mobile Quick Booking"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border px-4 pt-3 flex items-center gap-3 shadow-lg"
      >
        <button
          type="button"
          onClick={handleWhatsAppClick}
          aria-label="WhatsApp Contact"
          className="flex items-center justify-center min-w-[48px] w-12 min-h-[48px] h-12 rounded-btn bg-whatsapp text-white shrink-0 shadow-xs focus-visible:ring-2 focus-visible:ring-whatsapp active:scale-95 transition-transform"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        <Link
          href={`/${locale}/booking`}
          className="flex-1 min-h-[48px] h-12 rounded-btn bg-gold text-ink font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs hover:bg-gold-hover transition-colors focus-visible:ring-2 focus-visible:ring-gold active:scale-95"
        >
          <CalendarDays className="w-4 h-4" />
          <span>{dict.nav.bookNow}</span>
        </Link>
      </nav>

      {/* BACKGROUND TURNSTILE VERIFICATION */}
      <div className="hidden" aria-hidden="true">
        <TurnstileWidget
          locale={locale}
          onSuccess={(t) => setTurnstileToken(t)}
          onExpire={() => setTurnstileToken('')}
        />
      </div>
    </>
  );
}
