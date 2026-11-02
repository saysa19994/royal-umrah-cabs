import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { RouteBasedPricingExperience } from '@/components/pricing/RouteBasedPricingExperience';
import { getDbPricesCached } from '@/lib/pricing-db';
import { getMergedSiteSettings } from '@/lib/dynamic-settings-store';
import { PRICING_PAGE_CONTENT } from '@/data/pricing-page-content';
import {
  Banknote,
  Car,
  Plane,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  MessageCircle,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface PricingPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: PricingPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const content = PRICING_PAGE_CONTENT[locale] || PRICING_PAGE_CONTENT.en;

  return {
    title: `${content.heroTitle} | Duyuf Alrahman VIP`,
    description: content.heroSubtitle,
    alternates: getLocalizedAlternates(locale, '/pricing'),
  };
}

export default async function PricingPage(props: PricingPageProps) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';
  const dict = getDictionary(locale);
  const content = PRICING_PAGE_CONTENT[locale] || PRICING_PAGE_CONTENT.en;
  const initialRates = await getDbPricesCached();
  const settings = getMergedSiteSettings();

  return (
    <div className="bg-[#F7F5F0] min-h-screen text-start text-[#182235] w-full max-w-full overflow-x-clip" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* 1. ROYAL LUXURY HERO SECTION — REFINED EDITORIAL */}
      <section className="relative pt-8 sm:pt-12 md:pt-16 pb-8 md:pb-12 border-b border-[#E8E3DA] bg-gradient-to-b from-white/60 to-[#F7F5F0]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#687386] mb-5 sm:mb-6">
            <Link href={`/${locale}`} className="hover:text-[#101827] transition-colors">
              {dict.nav.home}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-[#C5A15D]" />
            <span className="text-[#101827] font-semibold">{dict.nav.pricing}</span>
          </nav>

          {/* Hero Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C5A15D]/50 text-xs font-bold text-[#8C6D2D] uppercase tracking-wider mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A15D]" />
              <span>{content.badge}</span>
            </div>

            <h1 className="font-playfair font-serif text-2xl sm:text-4xl md:text-5xl text-[#101827] font-bold tracking-tight leading-tight sm:leading-[1.2] mb-4 break-words">
              {content.heroTitle}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#4B5565] font-light leading-relaxed mb-6">
              {content.heroSubtitle}
            </p>
          </div>

          {/* Single Unified Assurance Strip (Replaces 4 repetitive cards) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 pt-2">
            <div className="flex items-center gap-2.5 p-3 sm:p-4 rounded-xl bg-white border border-[#E8E3DA] shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] border border-[#C5A15D]/30 flex items-center justify-center shrink-0">
                <Banknote className="w-4 h-4 text-[#C5A15D]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#101827] block truncate">
                  {content.features.cashOnArrival.title}
                </span>
                <span className="text-[10px] text-[#687386] block truncate">
                  {content.features.cashOnArrival.badge}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 sm:p-4 rounded-xl bg-white border border-[#E8E3DA] shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] border border-[#C5A15D]/30 flex items-center justify-center shrink-0">
                <Car className="w-4 h-4 text-[#C5A15D]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#101827] block truncate">
                  {content.features.fixedPerVehicle.title}
                </span>
                <span className="text-[10px] text-[#687386] block truncate">
                  {content.features.fixedPerVehicle.badge}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 sm:p-4 rounded-xl bg-white border border-[#E8E3DA] shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] border border-[#C5A15D]/30 flex items-center justify-center shrink-0">
                <Plane className="w-4 h-4 text-[#C5A15D]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#101827] block truncate">
                  {content.features.flightTracking.title}
                </span>
                <span className="text-[10px] text-[#687386] block truncate">
                  {content.features.flightTracking.badge}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 sm:p-4 rounded-xl bg-white border border-[#E8E3DA] shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F0] border border-[#C5A15D]/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#C5A15D]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#101827] block truncate">
                  {content.features.vipAmenities.title}
                </span>
                <span className="text-[10px] text-[#687386] block truncate">
                  {content.features.vipAmenities.badge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 3-STEP ROYAL LUXURY PRICING & BOOKING EXPERIENCE */}
      <section className="py-6 sm:py-10 md:py-14">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <RouteBasedPricingExperience
            locale={locale}
            dict={dict}
            initialRates={initialRates}
            taifEnabled={settings.taif_enabled !== false}
            riyadhEnabled={settings.riyadh_enabled !== false}
          />
        </div>
      </section>

      {/* 3. BESPOKE FLEET CALLOUT (MAYBACH & H1 CONCIERGE) */}
      <section className="pb-10 sm:pb-14">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="rounded-2xl sm:rounded-3xl bg-[#101827] text-white p-6 sm:p-8 md:p-10 border border-[#C5A15D]/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center lg:text-start">
              <span className="text-[11px] font-extrabold text-[#C5A15D] uppercase tracking-widest block mb-2">
                BESPOKE VIP SERVICE • خدمة الكونسيرج الخاصة
              </span>
              <h2 className="font-playfair font-serif text-xl sm:text-2xl md:text-3xl text-white font-bold leading-tight mb-2.5">
                {content.bespokeNotice.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {content.bespokeNotice.description}
              </p>
            </div>
            <a
              href={`https://wa.me/966567588261?text=${encodeURIComponent(
                isAr
                  ? 'السلام عليكم، أود الاستفسار عن حجز سيارة خاصة فاخرة (مرسيدس مايباخ / هيونداي H1) مع سائق خاص.'
                  : 'Hello, I would like to inquire about booking a bespoke luxury chauffeur service (Mercedes-Maybach / Hyundai H1).'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d99f2b] to-[#f4c84f] text-[#0A0F1D] font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all shrink-0 active:scale-95 w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 text-[#0A0F1D]" />
              <span>{content.bespokeNotice.cta}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS SECTION */}
      <section className="pb-14 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#C5A15D]/30 text-xs font-bold text-[#8C6D2D] uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#C5A15D]" />
              <span>FAQ</span>
            </div>
            <h2 className="font-playfair font-serif text-2xl sm:text-3xl text-[#101827] font-bold">
              {content.faqTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#687386] mt-2">
              {content.faqSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {content.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E3DA] shadow-2xs hover:border-[#C5A15D]/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A15D] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-[#101827] mb-2 leading-snug">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-[#687386] leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
