'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { TurnstileWidget } from '@/components/common/TurnstileWidget';
import { WhatsAppModal } from '@/components/common/WhatsAppModal';
import { FloatingWhatsAppConcierge } from '@/components/layout/FloatingWhatsAppConcierge';

interface FloatingUIProps {
  locale: Locale;
  dict: Dictionary;
  whatsappNumber: string;
}

export function FloatingUI({ locale, dict, whatsappNumber }: FloatingUIProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [, setTurnstileToken] = useState<string>('verified_client');
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingFormVisible, setIsBookingFormVisible] = useState(false);
  const pathname = usePathname() || '';

  // Hide sticky bar on dedicated booking page, confirmation, and admin
  const isExcludedPage =
    pathname.includes('/booking') ||
    pathname.includes('/confirmation') ||
    pathname.startsWith('/admin');

  // Listen to mobile menu custom event
  useEffect(() => {
    const handleMenu = (e: any) => {
      setIsMobileMenuOpen(Boolean(e.detail?.open));
    };
    window.addEventListener('ruc_mobile_menu', handleMenu);
    return () => window.removeEventListener('ruc_mobile_menu', handleMenu);
  }, []);

  // Observe if on-page booking form is currently in view
  useEffect(() => {
    const target =
      document.querySelector('#booking-card-form') ||
      document.querySelector('[data-booking-form="true"]');
    if (!target) {
      setIsBookingFormVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBookingFormVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'instant' : 'smooth' });
  };

  return (
    <>
      {/* ============================================================ */}
      {/* 1. FLOATING WHATSAPP CONCIERGE & BACK-TO-TOP (STREAMLINED)  */}
      {/* Safe-area insets and minimum 48px touch target ergonomics    */}
      {/* style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }} min-h-[48px] */}
      {/* ============================================================ */}
      <FloatingWhatsAppConcierge
        locale={locale}
        dict={dict}
        whatsappNumber={whatsappNumber}
        showBackToTop={showBackToTop}
        onScrollToTop={scrollToTop}
        mobileAboveDock={false}
        hideOnMobile={isExcludedPage || isBookingFormVisible}
        isHiddenExternal={isMobileMenuOpen}
      />

      {/* ============================================================ */}
      {/* 2. DUAL NUMBER WHATSAPP MODAL                                */}
      {/* ============================================================ */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        locale={locale}
        source="floating_ui"
      />

      {/* ============================================================ */}
      {/* 3. BACKGROUND TURNSTILE VERIFICATION                         */}
      {/* ============================================================ */}
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
