'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { LOCALE_CONFIG, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { trackEvent } from '@/lib/analytics';

interface FloatingWhatsAppConciergeProps {
  locale: Locale;
  dict: Dictionary;
  whatsappNumber: string;
  showBackToTop?: boolean;
  onScrollToTop?: () => void;
  mobileAboveDock?: boolean;
  hideOnMobile?: boolean;
  isHiddenExternal?: boolean;
}

export function formatWhatsappNumberLabel(rawDigits: string): string {
  if (!rawDigits) return '';
  if (rawDigits.startsWith('966') && rawDigits.length === 12) {
    return `+${rawDigits.slice(0, 3)} ${rawDigits.slice(3, 5)} ${rawDigits.slice(5, 8)} ${rawDigits.slice(8)}`;
  }
  return `+${rawDigits}`;
}

export function FloatingWhatsAppConcierge({
  locale,
  dict,
  whatsappNumber,
  showBackToTop = false,
  onScrollToTop,
  mobileAboveDock = false,
  hideOnMobile = false,
  isHiddenExternal = false,
}: FloatingWhatsAppConciergeProps) {
  const pathname = usePathname() || '';
  const isRtl = locale === 'ar' || locale === 'ur';
  const dir = isRtl ? 'rtl' : 'ltr';
  const wc = dict.whatsapp_concierge;

  const [wizardStep, setWizardStep] = useState<number | null>(null);

  // Listen to BookingWizard / BookingEngine step changes to hide on Step 4 final submission
  useEffect(() => {
    if (!pathname.includes('/booking')) {
      setWizardStep(null);
      return;
    }

    const domStep = Number(document.documentElement.dataset.bookingWizardStep);
    if (!Number.isNaN(domStep) && domStep >= 1 && domStep <= 4) {
      setWizardStep(domStep);
    }

    const onStepEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ step?: number }>;
      const step = customEvent?.detail?.step;
      if (typeof step === 'number') {
        setWizardStep(step);
      }
    };

    const observer = new MutationObserver(() => {
      const nextStep = Number(document.documentElement.dataset.bookingWizardStep);
      if (!Number.isNaN(nextStep) && nextStep >= 1 && nextStep <= 4) {
        setWizardStep(nextStep);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-booking-wizard-step'],
    });

    window.addEventListener('booking-wizard-step', onStepEvent);
    return () => {
      window.removeEventListener('booking-wizard-step', onStepEvent);
      observer.disconnect();
    };
  }, [pathname]);

  const cleanDigits = (whatsappNumber || '').replace(/[^\d]/g, '');
  if (!cleanDigits) return null;

  const isBookingFinalStep = pathname.includes('/booking') && wizardStep === 4;
  const isSuppressedRoute =
    pathname.includes('/confirmation') || pathname.startsWith('/admin');

  if (isHiddenExternal || isBookingFinalStep || isSuppressedRoute) {
    return null;
  }

  const formattedNumber = formatWhatsappNumberLabel(cleanDigits);
  const greeting =
    LOCALE_CONFIG[locale]?.whatsappGreeting || LOCALE_CONFIG.en.whatsappGreeting;
  const whatsappUrl = `https://wa.me/${cleanDigits}?text=${encodeURIComponent(greeting)}`;

  const handleConciergeClick = () => {
    trackEvent({
      event: 'whatsapp_handoff_initiated',
      source: 'floating_ui',
      assigned_number: cleanDigits,
    });
  };

  // Safe corner placement respecting iOS safe areas, mobile bottom dock, and RTL mirror
  const cornerPositionClasses = isRtl
    ? 'left-[max(0.75rem,env(safe-area-inset-left,0px))] md:left-[max(1rem,env(safe-area-inset-left,0px))] items-start'
    : 'right-[max(0.75rem,env(safe-area-inset-right,0px))] md:right-[max(1rem,env(safe-area-inset-right,0px))] items-end';

  const bottomPositionClass = mobileAboveDock
    ? 'bottom-[calc(max(0.75rem,env(safe-area-inset-bottom,0px))+7.25rem)] md:bottom-[calc(env(safe-area-inset-bottom,0px)+1.5rem)]'
    : 'bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] md:bottom-[calc(env(safe-area-inset-bottom,0px)+1.5rem)]';

  const visibilityClass = hideOnMobile || pathname.includes('/booking')
    ? 'hidden md:flex'
    : 'flex';

  return (
    <aside
      aria-label={wc.ariaLabel}
      dir={dir}
      data-whatsapp-concierge="true"
      className={`fixed ${bottomPositionClass} ${cornerPositionClasses} z-40 ${visibilityClass} flex-col gap-2.5 pointer-events-none`}
    >
      {/* Back to Top Control (Desktop/Tablet) */}
      {showBackToTop && onScrollToTop && (
        <button
          type="button"
          onClick={onScrollToTop}
          aria-label={dict.floating.backToTop}
          className="pointer-events-auto hidden md:flex w-10 h-10 rounded-full bg-[#101827]/95 backdrop-blur-md border border-[#E5E0D6]/30 hover:border-[#A77B3E] text-[#A77B3E] shadow-[0_8px_24px_rgba(9,13,21,0.35)] items-center justify-center transition-all duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A77B3E]"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </button>
      )}

      {/* Floating Deep Navy & Muted Bronze WhatsApp Concierge Pill */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleConciergeClick}
        aria-label={wc.ariaLabel}
        className="pointer-events-auto group inline-flex items-center gap-2 md:gap-2.5 min-h-[44px] h-11 md:h-auto ps-2 pe-2.5 md:ps-2.5 md:pe-3 md:py-2 rounded-full bg-[#101827]/95 hover:bg-[#243247] backdrop-blur-md border border-[#E5E0D6]/30 hover:border-[#A77B3E] text-[#F7F5F0] shadow-[0_14px_38px_rgba(9,13,21,0.45)] transition-all duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A77B3E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101827]"
      >
        {/* Approved Kaaba Geometric Brand Mark Avatar */}
        <span className="relative w-7 h-7 md:w-9 md:h-9 rounded-full bg-[#101827] border border-[#E5E0D6]/30 flex items-center justify-center shrink-0">
          <Image
            src="/logo.png"
            alt=""
            width={26}
            height={26}
            className="w-5 h-5 md:w-6 md:h-6 object-contain"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-0.5 -end-0.5 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-[#101827]"
          />
        </span>

        {/* Compact Mobile Label */}
        <span className="md:hidden text-xs font-bold text-[#F7F5F0] whitespace-nowrap tracking-wide">
          {wc.mobileLabel}
        </span>

        {/* Desktop Concierge Copy + Configured Phone Label */}
        <span className="hidden md:flex flex-col text-start min-w-0">
          <span className="text-xs font-bold text-[#F7F5F0] leading-tight whitespace-nowrap">
            {wc.title}
          </span>
          <span
            dir="ltr"
            className="text-[11px] font-semibold text-[#A77B3E] leading-tight whitespace-nowrap tabular-nums"
          >
            {formattedNumber || wc.subtitleFallback}
          </span>
        </span>

        {/* WhatsApp Action Badge */}
        <span
          aria-hidden="true"
          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none"
        >
          <MessageCircle className="w-4 h-4" />
        </span>
      </a>
    </aside>
  );
}
