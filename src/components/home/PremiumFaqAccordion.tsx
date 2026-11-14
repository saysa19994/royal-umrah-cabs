'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import {
  ChevronDown,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Banknote,
} from 'lucide-react';

interface PremiumFaqAccordionProps {
  locale: Locale;
  dict: Dictionary;
  settings?: SiteSettings;
}

const UI_STRINGS: Record<Locale, {
  guaranteeBadge: string;
  featureCash: string;
  featureWait: string;
  featureSupport: string;
  showAll: string;
  showLess: string;
  directAssistance: string;
}> = {
  ar: {
    guaranteeBadge: 'ضمانات الخدمة الملكية',
    featureCash: '0% دفعة مقدمة • السداد 100% نقداً عند الوصول',
    featureWait: '60 دقيقة انتظار مجاني بالمطار مع تتبع الرحلات',
    featureSupport: 'إشراف وتنسيق لحظي على مدار 24 ساعة عبر الواتساب',
    showAll: 'عرض كافة الأسئلة الشائعة (12 سؤالاً)',
    showLess: 'عرض الأسئلة الأساسية فقط',
    directAssistance: 'هل لديك استفسار خاص لم تجد إجابته هنا؟',
  },
  en: {
    guaranteeBadge: 'Sovereign Service Guarantees',
    featureCash: '0% Prepayment • 100% Cash-on-Arrival',
    featureWait: '60-Min Complimentary Airport Waiting & Flight Tracking',
    featureSupport: '24/7 Direct WhatsApp Dispatch Coordination',
    showAll: 'View All 12 Questions',
    showLess: 'Show Core Questions Only',
    directAssistance: 'Have a specific question not listed here?',
  },
  ms: {
    guaranteeBadge: 'Jaminan Perkhidmatan Diraja',
    featureCash: '0% Pendahuluan • 100% Tunai Setibanya',
    featureWait: '60 Minit Menunggu Percuma & Penjejakan Penerbangan',
    featureSupport: 'Koordinasi WhatsApp 24/7 Sepanjang Masa',
    showAll: 'Papar Semua 12 Soalan',
    showLess: 'Papar Soalan Utama Sahaja',
    directAssistance: 'Ada soalan khusus yang tidak tersenarai di sini?',
  },
  id: {
    guaranteeBadge: 'Jaminan Layanan VIP',
    featureCash: '0% Uang Muka • 100% Bayar Tunai Saat Tiba',
    featureWait: 'Gratis 60 Menit Waktu Tunggu Bandara & Radar Penerbangan',
    featureSupport: 'Koordinasi WhatsApp Langsung 24/7',
    showAll: 'Lihat Semua 12 Pertanyaan',
    showLess: 'Tampilkan Pertanyaan Utama Saja',
    directAssistance: 'Memiliki pertanyaan khusus yang belum terjawab?',
  },
  ur: {
    guaranteeBadge: 'شاہی سروس کی ضمانتیں',
    featureCash: '0% پیشگی رقم • 100% آمد پر نقد ادائیگی',
    featureWait: 'ایئرپورٹ پر 60 منٹ مفت انتظار اور فلائٹ ٹریکنگ',
    featureSupport: 'واٹس ایپ پر 24 گھنٹے براہ راست فوری رہنمائی',
    showAll: 'تمام 12 سوالات دیکھیں',
    showLess: 'صرف بنیادی سوالات دیکھیں',
    directAssistance: 'کیا آپ کا کوئی مخصوص سوال ہے جس کا جواب یہاں نہیں ملا؟',
  },
  fr: {
    guaranteeBadge: 'Garanties de Service Royal',
    featureCash: '0% Acompte • 100% Espèces à l\'Arrivée',
    featureWait: '60 Mins d\'Attente Gratuite à l\'Aéroport & Suivi Radar',
    featureSupport: 'Assistance Dédiée 24/7 via WhatsApp',
    showAll: 'Afficher les 12 Questions',
    showLess: 'Afficher Uniquement les Questions Clés',
    directAssistance: 'Vous avez une question spécifique non répertoriée ?',
  },
  es: {
    guaranteeBadge: 'Garantías de Servicio VIP',
    featureCash: '0% Pago Anticipado • 100% Efectivo a la Llegada',
    featureWait: '60 Min de Espera Gratuita en Aeropuerto y Radar de Vuelos',
    featureSupport: 'Coordinación Inmediata 24/7 vía WhatsApp',
    showAll: 'Ver las 12 Preguntas',
    showLess: 'Ver Solo Preguntas Principales',
    directAssistance: '¿Tiene alguna consulta específica no resuelta aquí?',
  },
  de: {
    guaranteeBadge: 'Königliche Servicegarantien',
    featureCash: '0% Anzahlung • 100% Barzahlung bei Ankunft',
    featureWait: '60 Min. kostenlose Airport-Wartezeit & Flugüberwachung',
    featureSupport: '24/7 WhatsApp-Koordination & Betreuung',
    showAll: 'Alle 12 Fragen anzeigen',
    showLess: 'Nur Hauptfragen anzeigen',
    directAssistance: 'Haben Sie eine Frage, die hier nicht beantwortet wurde?',
  },
  tr: {
    guaranteeBadge: 'Kusursuz Hizmet Taahhütleri',
    featureCash: '%0 Ön Ödeme • Varışta %100 Nakit Ödeme',
    featureWait: 'Havalimanında 60 Dakika Ücretsiz Bekleme & Radar Takibi',
    featureSupport: '7/24 Kesintisiz Canlı WhatsApp Koordinasyonu',
    showAll: 'Tüm 12 Soruyu Görüntüle',
    showLess: 'Sadece Temel Soruları Göster',
    directAssistance: 'Burada cevabını bulamadığınız özel bir sorunuz mu var?',
  },
  hi: {
    guaranteeBadge: 'शाही सेवा की गारंटी',
    featureCash: '0% अग्रिम • आगमन पर 100% नकद भुगतान',
    featureWait: 'हवाई अड्डे पर 60 मिनट निःशुल्क प्रतीक्षा व लाइव ट्रैकिंग',
    featureSupport: 'व्हाट्सएप पर 24/7 समर्पित त्वरित सहायता',
    showAll: 'सभी 12 प्रश्न देखें',
    showLess: 'केवल मुख्य प्रश्न देखें',
    directAssistance: 'क्या आपका कोई ऐसा प्रश्न है जो यहाँ सूचीबद्ध नहीं है?',
  },
};

export function PremiumFaqAccordion({ locale, dict, settings }: PremiumFaqAccordionProps) {
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';
  const shouldReduceMotion = useReducedMotion();
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;
  const faqData = dict.faq;

  // Single-open accordion state (index of currently open question, or null)
  // Default first question open for immediate visual discovery
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAllQuestions, setShowAllQuestions] = useState<boolean>(false);

  const toggleItem = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const whatsappNumber =
    settings?.whatsapp_number || '966567588261';
  const whatsappMsg = isAr
    ? encodeURIComponent('السلام عليكم، أود الاستفسار عن تفاصيل خدمات النقل لضيوف الرحمن VIP')
    : encodeURIComponent('Hello, I would like to inquire about Duyuf Al Rahman VIP private transfer services.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  // Complete list of 12 verified FAQs from authoritative dictionary
  const allFaqItems = [
    { q: faqData.q1, a: faqData.a1, id: 'faq-1' },
    { q: faqData.q2, a: faqData.a2, id: 'faq-2' },
    { q: faqData.q3, a: faqData.a3, id: 'faq-3' },
    { q: faqData.q4, a: faqData.a4, id: 'faq-4' },
    { q: faqData.q5, a: faqData.a5, id: 'faq-5' },
    { q: faqData.q9, a: faqData.a9, id: 'faq-9' }, // Cancellation & flexibility (core high-demand question)
    { q: faqData.q6, a: faqData.a6, id: 'faq-6' }, // Fleet & capacity
    { q: faqData.q7, a: faqData.a7, id: 'faq-7' }, // Cities & destinations
    { q: faqData.q8, a: faqData.a8, id: 'faq-8' }, // Miqat stop
    { q: faqData.q10, a: faqData.a10, id: 'faq-10' }, // Child seats & accessibility
    { q: faqData.q11, a: faqData.a11, id: 'faq-11' }, // Contact & support channels
    { q: faqData.q12, a: faqData.a12, id: 'faq-12' }, // Confirmation & dispatch message
  ];

  // Core 6 vs Full 12
  const visibleFaqItems = showAllQuestions ? allFaqItems : allFaqItems.slice(0, 6);

  return (
    <section
      id="faq"
      className="relative z-10 bg-[#0A0E17] py-16 sm:py-24 border-t border-b border-[rgba(255,255,255,0.06)] overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
      aria-label={faqData.heading}
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/4 -start-40 w-96 h-96 bg-[radial-gradient(circle,rgba(214,161,58,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-10 -end-40 w-96 h-96 bg-[radial-gradient(circle,rgba(214,161,58,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN (START COLUMN): Supporting Photo & Concierge Card
          ────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden bg-[#101725] border border-[rgba(255,255,255,0.09)] shadow-2xl group transition-all duration-300 hover:border-[#D6A13A]/40">
              
              {/* Visual Photograph Header */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <Image
                  src="/assets/images/cinematic/home/faq-umrah-peace.jpg"
                  alt={faqData.ctaTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority={false}
                />
                {/* Gradient Overlays for Luxury Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101725] via-[#101725]/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#101725]/40 via-transparent to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute top-4 start-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0E1420]/80 backdrop-blur-md border border-[#D6A13A]/40 text-xs font-semibold text-[#D6A13A] shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D6A13A]" />
                  <span>{ui.guaranteeBadge}</span>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 sm:p-7 pt-2">
                <h3 className="font-playfair font-serif text-xl sm:text-2xl font-bold text-[#F6F3ED] leading-tight mb-2">
                  {faqData.ctaTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#AEB7C4] leading-relaxed font-light mb-6">
                  {faqData.ctaSubtitle}
                </p>

                {/* Key Commitments Checklist */}
                <div className="space-y-3 mb-6 pt-4 border-t border-white/5">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D6A13A] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#F6F3ED] font-medium leading-snug">
                      {ui.featureCash}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#D6A13A] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#AEB7C4] leading-snug">
                      {ui.featureWait}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#AEB7C4] leading-snug">
                      {ui.featureSupport}
                    </span>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Primary: Online Booking */}
                  <Link
                    href={`/${locale}/booking`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#D6A13A] via-[#E5B558] to-[#D6A13A] text-[#0E1420] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
                  >
                    <span>{faqData.ctaButton}</span>
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </Link>

                  {/* Secondary: WhatsApp Concierge */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#141D2C] border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 font-medium text-xs sm:text-sm transition-all shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{faqData.ctaWhatsapp}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN (END COLUMN): Premium Interactive Accordion
          ────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            {/* Section Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141D2C] border border-[#D6A13A]/40 text-xs font-bold text-[#D6A13A] uppercase tracking-wider mb-3 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D6A13A]" />
                <span>{faqData.sectionPill}</span>
              </div>

              <h2 className="font-playfair font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#F6F3ED] tracking-tight leading-tight mb-3">
                {faqData.heading}
              </h2>

              <p className="text-xs sm:text-sm text-[#AEB7C4] leading-relaxed font-light max-w-2xl">
                {faqData.subtitle}
              </p>
            </div>

            {/* Accordion Items List */}
            <div className="space-y-3.5" role="presentation">
              {visibleFaqItems.map((item, idx) => {
                const isOpen = openIndex === idx;
                const buttonId = `faq-trigger-${item.id}`;
                const panelId = `faq-panel-${item.id}`;

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl bg-[#101725] border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'border-[#D6A13A]/60 shadow-[0_8px_25px_rgba(0,0,0,0.4)]'
                        : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(214,161,58,0.3)] shadow-sm'
                    }`}
                  >
                    {/* Accessible Interactive Trigger Button */}
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(idx)}
                      className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A13A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101725] transition-colors group cursor-pointer"
                    >
                      <span
                        className={`text-sm sm:text-base font-semibold leading-snug transition-colors ${
                          isOpen ? 'text-[#D6A13A]' : 'text-[#F6F3ED] group-hover:text-[#F6F3ED]'
                        }`}
                      >
                        {item.q}
                      </span>

                      {/* Expand / Collapse Indicator */}
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#D6A13A] border-[#D6A13A] text-[#0E1420] rotate-180'
                            : 'bg-[#141D2C] border-white/10 text-[#AEB7C4] group-hover:border-[#D6A13A]/50 group-hover:text-[#D6A13A]'
                        }`}
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                      </span>
                    </button>

                    {/* Accessible Expandable Panel with Framer Motion Height Transition */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          animate={shouldReduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.28,
                            ease: [0.04, 0.62, 0.23, 0.98],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-xs sm:text-sm text-[#AEB7C4] leading-relaxed border-t border-white/5 font-light">
                            <p className="whitespace-pre-line">{item.a}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Show All / Show Less Toggle Button */}
            <div className="mt-6 pt-2 flex items-center justify-between flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setShowAllQuestions((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#141D2C] border border-[#D6A13A]/30 text-xs sm:text-sm font-semibold text-[#D6A13A] hover:bg-[#D6A13A]/10 active:scale-[0.98] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A13A]"
              >
                <span>{showAllQuestions ? ui.showLess : ui.showAll}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showAllQuestions ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Direct WhatsApp Prompt Footer */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#AEB7C4] hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>{ui.directAssistance}</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
