'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { MessageCircle, ArrowUp, CalendarDays } from 'lucide-react';
import { TurnstileWidget } from '@/components/common/TurnstileWidget';
import { WhatsAppModal } from '@/components/common/WhatsAppModal';

interface FloatingUIProps {
  locale: Locale;
  dict: Dictionary;
  whatsappNumber: string;
}

export function FloatingUI({ locale, dict }: FloatingUIProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('verified_client');
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

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

  const handleOpenWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWhatsAppModalOpen(true);
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
            className="w-11 h-11 rounded-full bg-surface border-2 border-gold text-ink shadow-md flex items-center justify-center hover:bg-gold-soft transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ArrowUp className="w-5 h-5 text-gold-dark" />
          </button>
        )}

        {/* FLOATING WHATSAPP BUTTON (DESKTOP WITH SOFT PULSE) */}
        <button
          type="button"
          onClick={handleOpenWhatsApp}
          aria-label={dict.floating.whatsappTooltip}
          className="hidden md:flex w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#1ebe5d] text-white shadow-[0_4px_25px_rgba(37,211,102,0.45)] items-center justify-center transition-all duration-300 group relative focus-visible:ring-2 focus-visible:ring-[#25d366] animate-pulse-soft-green"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="sr-only">{dict.floating.whatsappTooltip}</span>

          {/* TOOLTIP ON HOVER (DESKTOP) */}
          <span className="hidden group-hover:block absolute right-16 rtl:right-auto rtl:left-16 whitespace-nowrap bg-[#0A1224] border border-gold/30 text-white text-xs px-3 py-1.5 rounded-md shadow-md">
            {dict.floating.whatsappTooltip}
          </span>
        </button>
      </aside>

      {/* MOBILE STICKY BOTTOM BAR (ACCOUNTS FOR SAFE-AREA INSET) */}
      <nav
        aria-label="Mobile Quick Booking"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A1224]/95 backdrop-blur-md border-t border-gold/20 px-4 pt-3 flex items-center gap-3 shadow-lg"
      >
        <button
          type="button"
          onClick={handleOpenWhatsApp}
          aria-label="WhatsApp Contact"
          className="flex items-center justify-center min-w-[48px] w-12 min-h-[48px] h-12 rounded-[8px] bg-[#25d366] text-white shrink-0 shadow-xs focus-visible:ring-2 focus-visible:ring-[#25d366] active:scale-95 transition-transform animate-pulse-soft-green"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        <Link
          href={`/${locale}/booking`}
          className="flex-1 min-h-[48px] h-12 rounded-[8px] bg-gold text-[#0A1224] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs hover:bg-[#E8C766] transition-colors focus-visible:ring-2 focus-visible:ring-gold active:scale-95"
        >
          <CalendarDays className="w-4 h-4" />
          <span>{dict.nav.bookNow}</span>
        </Link>
      </nav>

      {/* DUAL NUMBER WHATSAPP MODAL */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        locale={locale}
        source="floating_ui"
      />

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
