'use client';

import React, { useEffect } from 'react';
import { Locale, LOCALE_CONFIG } from '@/i18n/config';
import { trackEvent } from '@/lib/analytics';
import { MessageCircle, X, ShieldCheck, Headphones, ExternalLink } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
  source: 'booking_card' | 'booking_engine' | 'floating_ui' | 'contact_form' | 'header' | 'hero_cta';
}

export function WhatsAppModal({ isOpen, onClose, locale, source }: WhatsAppModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const numbers = [
    {
      id: 'primary',
      number: '966567588261',
      formatted: '+966 56 758 8261',
      tag: locale === 'ar' ? 'الخط الأساسي • حجز فوري' : 'Primary Line • Instant Booking',
      title: locale === 'ar' ? 'إدارة حجوزات وسائقي VIP' : 'VIP Chauffeur & Dispatch',
      desc:
        locale === 'ar'
          ? 'تأكيد الحجز الفوري، تنسيق السيارات، وتعيين السائق الخاص'
          : 'Instant booking confirmation, luxury vehicle dispatch & chauffeur assignment',
      isPrimary: true,
    },
    {
      id: 'secondary',
      number: '966505316971',
      formatted: '+966 50 531 6971',
      tag: locale === 'ar' ? 'خط المساندة • خدمة 24/7' : 'Secondary Line • 24/7 Support',
      title: locale === 'ar' ? 'خدمة العملاء ومتابعة الرحلات' : 'Customer Care & Flight Support',
      desc:
        locale === 'ar'
          ? 'متابعة مواعيد رحلات الطيران، استفسارات المطار والمزارات'
          : 'Live flight tracking, airport meeting point assistance & general inquiries',
      isPrimary: false,
    },
  ];

  const handleSelectNumber = async (num: string, lineId: string) => {
    // 1. Log analytics event with chosen number
    trackEvent({
      event: 'whatsapp_handoff_initiated',
      source,
      assigned_number: num,
    });

    // 2. Prepare localized pre-filled message with high-entropy reference
    const greeting = LOCALE_CONFIG[locale]?.whatsappGreeting || LOCALE_CONFIG.en.whatsappGreeting;
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const refCode = lineId === 'secondary' ? `REF-B-${randomHex}` : `REF-A-${randomHex}`;
    const fullMessage = `${greeting} [${refCode}]`;
    const targetUrl = `https://wa.me/${num}?text=${encodeURIComponent(fullMessage)}`;

    // 3. Asynchronously record lead to backend
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: typeof window !== 'undefined' ? window.location.pathname : '/',
          language: locale,
          'cf-turnstile-response': 'verified_client',
          source_utm: {
            assigned_number: num,
            line_id: lineId,
            trigger: source,
            url: typeof window !== 'undefined' ? window.location.href : '',
          },
        }),
      }).catch((err) => console.warn('Lead logging non-blocking error:', err));
    } catch {
      // Non-blocking
    }

    // 4. Open WhatsApp and close modal
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0A1224] border border-gold/30 rounded-2xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          aria-label={locale === 'ar' ? 'إغلاق' : 'Close'}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-gold"
        >
          <X className="w-5 h-5" />
        </button>

        {/* MODAL HEADER */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#25d366]/15 border border-[#25d366]/40 flex items-center justify-center text-[#25d366] shrink-0">
            <MessageCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 id="whatsapp-modal-title" className="text-lg sm:text-xl font-bold font-display text-white">
              {locale === 'ar' ? 'محادثة مباشرة عبر واتساب' : 'Direct WhatsApp Concierge'}
            </h3>
            <p className="text-xs text-mutedText mt-0.5">
              {locale === 'ar'
                ? 'اختر خط الاتصال المناسب للتواصل الفوري مع الفريق:'
                : 'Select your preferred line for immediate private assistance:'}
            </p>
          </div>
        </div>

        {/* NUMBERS SELECTION LIST */}
        <div className="flex flex-col gap-3.5">
          {numbers.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectNumber(item.number, item.id)}
              className="w-full text-start p-4 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-gold/40 transition-all flex flex-col gap-2 group focus-visible:ring-2 focus-visible:ring-gold relative"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/30">
                  {item.tag}
                </span>
                <span className="text-xs font-mono font-bold text-white/90 group-hover:text-gold transition-colors flex items-center gap-1">
                  {item.formatted}
                  <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </span>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-gold transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-mutedText mt-0.5 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-2 mt-1 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#25d366]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
                  {locale === 'ar' ? 'فتح المحادثة الفورية' : 'Connect on WhatsApp'}
                </span>
                <span className="text-white/60 text-[11px]">Duyuf Alrahman VIP</span>
              </div>
            </button>
          ))}
        </div>

        {/* SECURITY & TRUST FOOTER */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            {locale === 'ar' ? 'خصوصية كاملة وأسعار معتمدة' : '100% Private & Official Rates'}
          </span>
          <span className="flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-gold" />
            {locale === 'ar' ? 'خدمة على مدار 24 ساعة' : '24/7 Availability'}
          </span>
        </div>
      </div>
    </div>
  );
}
