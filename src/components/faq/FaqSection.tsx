'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  CalendarCheck,
} from 'lucide-react';

export interface FaqSectionProps {
  locale: Locale;
  dict: Dictionary;
  settings?: SiteSettings;
  items?: Array<{ q: string; a: string }>;
  id?: string;
  className?: string;
  showCta?: boolean;
}


const FAQ_TRUST_I18N: Record<Locale, {
  payTitle: string;
  paySub: string;
  cancelTitle: string;
  cancelSub: string;
  supportTitle: string;
  supportSub: string;
}> = {
  ar: {
    payTitle: 'الدفع نقدًا بعد انتهاء الرحلة',
    paySub: 'الدفع نقدًا للسائق بعد وصول الوجهة',
    cancelTitle: 'إلغاء مجاني مرن',
    cancelSub: 'تعديل الرحلة بدون غرامات',
    supportTitle: 'دعم متواصل واتساب',
    supportSub: 'متابعة وتأكيد فوري لرحلتك',
  },
  en: {
    payTitle: 'Cash Paid After Journey Completion',
    paySub: 'Paid to driver at destination',
    cancelTitle: 'Free 24h Cancellation',
    cancelSub: 'Zero penalties prior to 24h',
    supportTitle: 'WhatsApp Support',
    supportSub: 'Instant live coordination',
  },
  ms: {
    payTitle: 'Bayaran Tunai Selepas Perjalanan Selesai',
    paySub: 'Dibayar kepada pemandu di destinasi',
    cancelTitle: 'Pembatalan Percuma 24 Jam',
    cancelSub: 'Tiada penalti sebelum 24 jam',
    supportTitle: 'Sokongan WhatsApp',
    supportSub: 'Penyelarasan langsung serta-merta',
  },
  id: {
    payTitle: 'Pembayaran Tunai Setelah Perjalanan Selesai',
    paySub: 'Dibayar kepada pengemudi di tujuan',
    cancelTitle: 'Pembatalan Gratis 24 Jam',
    cancelSub: 'Bebas denda sebelum 24 jam',
    supportTitle: 'Layanan WhatsApp',
    supportSub: 'Koordinasi langsung cepat',
  },
  ur: {
    payTitle: 'سفر مکمل ہونے کے بعد نقد ادائیگی',
    paySub: 'منزل پر پہنچنے پر ڈرائیور کو ادائیگی',
    cancelTitle: '24 گھنٹے مفت منسوخی',
    cancelSub: '24 گھنٹے قبل بلا معاوضہ تبدیلی',
    supportTitle: 'واٹس ایپ سپورٹ',
    supportSub: 'فوری اور لائیو رابطہ',
  },
  fr: {
    payTitle: 'Paiement en Espèces en Fin de Trajet',
    paySub: 'Payé au chauffeur à destination',
    cancelTitle: 'Annulation Gratuite 24h',
    cancelSub: 'Sans pénalité avant 24h',
    supportTitle: 'Assistance WhatsApp',
    supportSub: 'Coordination immédiate en direct',
  },
  es: {
    payTitle: 'Pago en Efectivo al Finalizar el Viaje',
    paySub: 'Pagado al chófer en el destino',
    cancelTitle: 'Cancelación Gratuita 24h',
    cancelSub: 'Sin penalizaciones antes de 24h',
    supportTitle: 'Soporte WhatsApp',
    supportSub: 'Coordinación directa al instante',
  },
  de: {
    payTitle: 'Barzahlung nach Beendigung der Fahrt',
    paySub: 'Zahlung an den Fahrer am Zielort',
    cancelTitle: 'Kostenlose Stornierung 24h',
    cancelSub: 'Keine Gebühren bis 24 Std. vorher',
    supportTitle: 'WhatsApp-Support',
    supportSub: 'Sofortige Live-Koordination',
  },
  tr: {
    payTitle: 'Yolculuk Tamamlandıktan Sonra Nakit Ödeme',
    paySub: 'Varış noktasında şoföre ödenir',
    cancelTitle: '24 Saat Ücretsiz İptal',
    cancelSub: '24 saat öncesine kadar cezasız',
    supportTitle: 'WhatsApp Desteği',
    supportSub: 'Anında canlı koordinasyon',
  },
  hi: {
    payTitle: 'यात्रा पूरी होने के बाद नकद भुगतान',
    paySub: 'गंतव्य पर ड्राइवर को भुगतान',
    cancelTitle: '24 घंटे नि:शुल्क रद्दीकरण',
    cancelSub: '24 घंटे पहले कोई शुल्क नहीं',
    supportTitle: 'व्हाट्सएप सहायता',
    supportSub: 'तत्काल लाइव समन्वय',
  },
};

export function FaqSection({
  locale,
  dict,
  settings,
  items,
  id = 'faq',
  className = '',
  showCta = true,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const isRtl = locale === 'ar' || locale === 'ur';

  // Extract all 12 questions and answers from dict.faq
  const fallbackItems = [
    { q: dict.faq.q1, a: dict.faq.a1 },
    { q: dict.faq.q2, a: dict.faq.a2 },
    { q: dict.faq.q3, a: dict.faq.a3 },
    { q: dict.faq.q4, a: dict.faq.a4 },
    { q: dict.faq.q5, a: dict.faq.a5 },
    { q: dict.faq.q6, a: dict.faq.a6 },
    { q: dict.faq.q7, a: dict.faq.a7 },
    { q: dict.faq.q8, a: dict.faq.a8 },
    { q: dict.faq.q9, a: dict.faq.a9 },
    { q: dict.faq.q10, a: dict.faq.a10 },
    { q: dict.faq.q11, a: dict.faq.a11 },
    { q: dict.faq.q12, a: dict.faq.a12 },
  ].filter((item) => Boolean(item.q && item.a));

  const faqItems = items && items.length > 0 ? items : fallbackItems;

  const whatsappNumber = settings?.whatsapp_number || '966567588261';

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`py-16 md:py-24 bg-alabaster border-t border-border text-start ${className}`}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>{dict.faq.sectionPill}</span>
          </div>

          <h2
            id={`${id}-heading`}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight"
          >
            {dict.faq.heading}
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-ink-muted font-light leading-relaxed">
            {dict.faq.subtitle}
          </p>
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-3.5 sm:space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const itemNumber = (index + 1).toString().padStart(2, '0');

            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-gold/50 bg-surface shadow-sm ring-1 ring-gold/20'
                    : 'border-border bg-surface hover:border-gold/30 hover:bg-gold/[0.01]'
                }`}
              >
                <button
                  type="button"
                  id={`faq-btn-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => toggleItem(index)}
                  className="w-full min-h-[64px] px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between gap-4 text-start group cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-2xl"
                >
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1">
                    <span
                      className={`text-xs sm:text-sm font-mono font-semibold px-2 py-0.5 rounded-md transition-colors shrink-0 mt-0.5 sm:mt-0 ${
                        isOpen
                          ? 'bg-gold text-ink font-bold'
                          : 'bg-bg-alt text-ink-muted group-hover:text-gold-dark'
                      }`}
                    >
                      {itemNumber}
                    </span>
                    <span
                      className={`font-display font-bold text-base sm:text-lg transition-colors leading-snug ${
                        isOpen ? 'text-gold-dark' : 'text-ink group-hover:text-gold-dark'
                      }`}
                    >
                      {item.q}
                    </span>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? 'bg-gold/15 text-gold-dark rotate-180'
                        : 'bg-bg-alt text-ink-muted group-hover:text-gold-dark group-hover:bg-gold/10'
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Smooth Expandable Content via CSS Grid transition */}
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-7 pb-6 pt-1 text-sm sm:text-base text-ink-muted leading-relaxed font-light border-t border-border/50">
                      <p className="pt-2">{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-10 pt-8 border-t border-border/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-start">
          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-xl bg-surface border border-border/50">
            <div className="w-9 h-9 rounded-full bg-gold-soft flex items-center justify-center shrink-0 text-gold-dark">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-ink">
                {(FAQ_TRUST_I18N[locale] || FAQ_TRUST_I18N.en).payTitle}
              </p>
              <p className="text-[11px] text-ink-muted">
                {(FAQ_TRUST_I18N[locale] || FAQ_TRUST_I18N.en).paySub}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-xl bg-surface border border-border/50">
            <div className="w-9 h-9 rounded-full bg-gold-soft flex items-center justify-center shrink-0 text-gold-dark">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-ink">
                {(FAQ_TRUST_I18N[locale] || FAQ_TRUST_I18N.en).cancelTitle}
              </p>
              <p className="text-[11px] text-ink-muted">
                {(FAQ_TRUST_I18N[locale] || FAQ_TRUST_I18N.en).cancelSub}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-xl bg-surface border border-border/50">
            <div className="w-9 h-9 rounded-full bg-gold-soft flex items-center justify-center shrink-0 text-gold-dark">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-ink">
                {(FAQ_TRUST_I18N[locale] || FAQ_TRUST_I18N.en).supportTitle}
              </p>
              <p className="text-[11px] text-ink-muted">
                {(FAQ_TRUST_I18N[locale] || FAQ_TRUST_I18N.en).supportSub}
              </p>
            </div>
          </div>
        </div>

        {/* Restrained Conversion CTA Card */}
        {showCta && (
          <div className="mt-12 sm:mt-16 rounded-3xl bg-navy text-white p-8 sm:p-10 border border-gold/30 shadow-xl relative overflow-hidden text-center">
            {/* Subtle radial ambient glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-xs font-bold text-gold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{dict.meta.brand}</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3">
                {dict.faq.ctaTitle}
              </h3>

              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed mb-8">
                {dict.faq.ctaSubtitle}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/${locale}/booking`}
                  className="inline-flex items-center justify-center gap-2 min-h-[50px] px-8 py-3.5 rounded-btn bg-gold text-ink font-bold text-sm tracking-wide hover:bg-gold-hover hover:text-white transition-all shadow-gold"
                >
                  <span>{dict.faq.ctaButton}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[50px] px-7 py-3.5 rounded-btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{dict.faq.ctaWhatsapp}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
