'use client';

import React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import {
  MapPin,
  Car,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Banknote,
  MessageCircle,
} from 'lucide-react';

interface PremiumHowItWorksProps {
  locale: Locale;
  dict: Dictionary;
}

export function PremiumHowItWorks({ locale, dict }: PremiumHowItWorksProps) {
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const stepsData = [
    {
      number: '01',
      title: dict.steps.step1Title,
      desc: dict.steps.step1Desc,
      icon: <MapPin className="w-6 h-6 text-[#D6A13A]" />,
      actionText: isAr ? 'استكشف المسارات' : 'Explore Routes',
      actionHref: `/${locale}/pricing`,
      badge: isAr ? 'خطوة 1: المسار' : 'Step 1: Route',
    },
    {
      number: '02',
      title: dict.steps.step2Title,
      desc: dict.steps.step2Desc,
      icon: <Car className="w-6 h-6 text-[#D6A13A]" />,
      actionText: isAr ? 'استعرض الأسطول' : 'View Fleet',
      actionHref: `/${locale}#fleet`,
      badge: isAr ? 'خطوة 2: المركبة' : 'Step 2: Vehicle',
    },
    {
      number: '03',
      title: dict.steps.step3Title,
      desc: dict.steps.step3Desc,
      icon: <CheckCircle2 className="w-6 h-6 text-[#D6A13A]" />,
      actionText: isAr ? 'احجز رحلتك' : 'Book Journey',
      actionHref: `/${locale}/booking`,
      badge: isAr ? 'خطوة 3: التأكيد' : 'Step 3: Confirm',
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-16 sm:py-24 bg-[#090D15] text-[#F6F3ED] overflow-hidden border-t border-b border-white/10"
      dir={isRtl ? 'rtl' : 'ltr'}
      aria-label={dict.steps.heading}
    >
      {/* Background Luxury Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(214,161,58,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141D2C] border border-[#D6A13A]/40 text-xs font-bold text-[#D6A13A] uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D6A13A]" />
            <span>{dict.steps.sectionPill}</span>
          </div>

          <h2 className="font-playfair font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#F6F3ED] tracking-tight leading-[1.2] mb-4">
            {dict.steps.heading}{' '}
            <span className="text-[#D6A13A] font-light">
              {dict.steps.headingHighlight}
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#AEB7C4] font-light leading-relaxed">
            {dict.steps.subtitle}
          </p>
        </div>

        {/* 3 Steps Sequence Container */}
        <div className="relative">
          {/* Desktop Connecting Visual Line */}
          <div className="hidden lg:block absolute top-[68px] inset-x-24 h-[1px] bg-gradient-to-r from-transparent via-[#D6A13A]/40 to-transparent z-0" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            {stepsData.map((step, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#101725] border border-white/10 hover:border-[#D6A13A]/60 transition-all duration-300 shadow-xl hover:shadow-[0_12px_40px_rgba(214,161,58,0.08)]"
              >
                <div>
                  {/* Top Row: Refined Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    {/* Circle Icon Container with ambient glow */}
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-[#141D2C] border border-[#D6A13A]/40 flex items-center justify-center group-hover:scale-105 group-hover:border-[#D6A13A] transition-all duration-300 shadow-md">
                        {step.icon}
                      </div>
                      {/* Step index badge on mobile */}
                      <span className="lg:hidden absolute -top-2 -end-2 w-6 h-6 rounded-full bg-[#D6A13A] text-[#090D15] text-xs font-black flex items-center justify-center shadow-md">
                        {idx + 1}
                      </span>
                    </div>

                    {/* Refined Numbered Marker */}
                    <span className="font-playfair font-serif text-4xl sm:text-5xl font-bold text-[#D6A13A]/30 group-hover:text-[#D6A13A]/60 transition-colors select-none tracking-tighter">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Category Badge */}
                  <span className="inline-block text-[10px] font-bold text-[#D6A13A] uppercase tracking-wider bg-[#141D2C] px-2.5 py-0.5 rounded-full border border-white/10 mb-3">
                    {step.badge}
                  </span>

                  {/* Title & Description */}
                  <h3 className="font-playfair font-serif text-xl sm:text-2xl font-bold text-[#F6F3ED] mb-3 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#AEB7C4] leading-relaxed font-light mb-6">
                    {step.desc}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={step.actionHref}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#D6A13A] hover:text-[#F6F3ED] transition-colors group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                  >
                    <span>{step.actionText}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>

                  {idx === 2 && (
                    <span className="text-[10px] font-extrabold text-[#D6A13A] bg-[#141D2C] px-2 py-0.5 rounded-full border border-[#D6A13A]/30">
                      {isAr ? 'دفع عند الوصول' : 'Cash on Arrival'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Assurance & Direct Action Ribbon */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#101725] via-[#141D2C] to-[#101725] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-start">
            <div className="w-12 h-12 rounded-2xl bg-[#D6A13A]/10 border border-[#D6A13A]/40 flex items-center justify-center shrink-0 text-[#D6A13A]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-[#F6F3ED] mb-1">
                {dict.steps.noPrepayNotice}
              </h4>
              <p className="text-xs text-[#AEB7C4] leading-relaxed">
                {isAr
                  ? 'سداد نقدي 100% للسائق عند الوصول إلى فندقك بأمان. لا نطلب أي بطاقات ائتمانية أو مبالغ مسبقة.'
                  : '100% Cash payment to chauffeur upon safe hotel arrival. No advance credit card or deposit required.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0 justify-center">
            <Link
              href={`/${locale}/booking`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E5B14B] via-[#D6A13A] to-[#A97B27] text-[#090D15] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-98 transition-all"
            >
              <span>{dict.steps.ctaButton}</span>
              <ArrowIcon className="w-3.5 h-3.5 text-[#090D15]" />
            </Link>

            <a
              href="https://wa.me/966567588261"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#141D2C] hover:bg-[#18263e] text-[#25D366] border border-[#25D366]/40 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
