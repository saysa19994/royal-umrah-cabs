'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import {
  Calendar,
  Car,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  HeartHandshake,
  Plus,
  Minus,
  MessageCircle,
} from 'lucide-react';

interface HomeSectionsProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
}

export function HomeSections({ locale, dict, settings }: HomeSectionsProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: dict.faq.q1, a: dict.faq.a1 },
    { q: dict.faq.q2, a: dict.faq.a2 },
    { q: dict.faq.q3, a: dict.faq.a3 },
    { q: dict.faq.q4, a: dict.faq.a4 },
  ];

  return (
    <>
      {/* 3 SIMPLE STEPS SECTION */}
      <section id="how-it-works" className="py-16 md:py-24 bg-bg-alt/50 border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.steps.sectionPill}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {dict.steps.heading}{' '}
              <span className="text-gold-dark italic">{dict.steps.headingHighlight}</span>
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {dict.steps.subtitle}
            </p>
          </div>

          {/* 3 SQUARE ICON CARDS WITH GOLD NUMBER BADGES JOINED BY DASHED LINE */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* DASHED LINE CONNECTOR (DESKTOP) */}
            <div
              className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 border-t-2 border-dashed border-gold-line -z-0"
              aria-hidden="true"
            />

            {/* STEP 1 */}
            <div className="relative z-10 bg-surface rounded-2xl p-8 border border-border text-center shadow-xs flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-6 relative">
                <Calendar className="w-7 h-7" />
                <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center border-2 border-surface shadow-xs">
                  1
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                {dict.steps.step1Title}
              </h3>
              <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light">
                {dict.steps.step1Desc}
              </p>
            </div>

            {/* STEP 2 */}
            <div className="relative z-10 bg-surface rounded-2xl p-8 border border-border text-center shadow-xs flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-6 relative">
                <Car className="w-7 h-7" />
                <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center border-2 border-surface shadow-xs">
                  2
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                {dict.steps.step2Title}
              </h3>
              <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light">
                {dict.steps.step2Desc}
              </p>
            </div>

            {/* STEP 3 */}
            <div className="relative z-10 bg-surface rounded-2xl p-8 border border-border text-center shadow-xs flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark mb-6 relative">
                <CheckCircle className="w-7 h-7" />
                <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center border-2 border-surface shadow-xs">
                  3
                </span>
              </div>
              <h3 className="font-display font-bold text-xl text-ink mb-2">
                {dict.steps.step3Title}
              </h3>
              <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light">
                {dict.steps.step3Desc}
              </p>
            </div>
          </div>

          {/* CTA & CAPTION */}
          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center gap-2 h-12 px-8 rounded-btn bg-gold text-ink font-bold text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-sm"
            >
              <span>{dict.steps.ctaButton}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <p className="mt-3 text-xs md:text-sm text-ink-muted font-medium uppercase tracking-wider">
              {dict.steps.noPrepayNotice}
            </p>
          </div>
        </div>
      </section>

      {/* CORE SERVICES (3 IMAGE CARDS) */}
      <section id="services" className="py-16 md:py-24 bg-bg border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.services.sectionPill}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {dict.services.heading}{' '}
              <span className="text-gold-dark italic">{dict.services.headingHighlight}</span>
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {dict.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* SERVICE 1: INTERCITY */}
            <article className="group bg-surface rounded-2xl overflow-hidden border border-border shadow-xs hover:shadow-md transition-all flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/assets/images/yukon_exterior.jpg"
                  alt={dict.services.intercityTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-gold-soft/90 text-gold-dark text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-line">
                  Intercity VIP
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1 text-start">
                <h3 className="font-display font-bold text-2xl text-ink mb-2">
                  {dict.services.intercityTitle}
                </h3>
                <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light mb-4">
                  {dict.services.intercityDesc}
                </p>
                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-bold text-gold-dark">Makkah ↔ Madinah</span>
                  <Link
                    href={`/${locale}/services`}
                    className="text-xs font-bold uppercase text-ink hover:text-gold-dark flex items-center gap-1 transition-colors"
                  >
                    <span>{dict.services.viewDetails}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </article>

            {/* SERVICE 2: AIRPORT */}
            <article className="group bg-surface rounded-2xl overflow-hidden border border-border shadow-xs hover:shadow-md transition-all flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/assets/images/staria_exterior.jpg"
                  alt={dict.services.airportTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-gold-soft/90 text-gold-dark text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-line">
                  Airport Transfers
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1 text-start">
                <h3 className="font-display font-bold text-2xl text-ink mb-2">
                  {dict.services.airportTitle}
                </h3>
                <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light mb-4">
                  {dict.services.airportDesc}
                </p>
                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-bold text-gold-dark">JED / MED Airports</span>
                  <Link
                    href={`/${locale}/services`}
                    className="text-xs font-bold uppercase text-ink hover:text-gold-dark flex items-center gap-1 transition-colors"
                  >
                    <span>{dict.services.viewDetails}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </article>

            {/* SERVICE 3: ZIYARAT */}
            <article className="group bg-surface rounded-2xl overflow-hidden border border-border shadow-xs hover:shadow-md transition-all flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <img
                  src="/assets/images/hiace_exterior.jpg"
                  alt={dict.services.ziyaratTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-gold-soft/90 text-gold-dark text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-gold-line">
                  Holy Sites Ziyarat
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1 text-start">
                <h3 className="font-display font-bold text-2xl text-ink mb-2">
                  {dict.services.ziyaratTitle}
                </h3>
                <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light mb-4">
                  {dict.services.ziyaratDesc}
                </p>
                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-bold text-gold-dark">Makkah &amp; Madinah</span>
                  <Link
                    href={`/${locale}/services`}
                    className="text-xs font-bold uppercase text-ink hover:text-gold-dark flex items-center gap-1 transition-colors"
                  >
                    <span>{dict.services.viewDetails}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* WHY US (3 BORDERED CARDS WITH SOFT BEIGE CIRCULAR ICON HOLDERS) */}
      <section id="why-us" className="py-16 md:py-24 bg-bg-alt/40 border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.why_us.sectionPill}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {dict.why_us.heading}{' '}
              <span className="text-gold-dark italic">{dict.why_us.headingHighlight}</span>
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {dict.why_us.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* PILLAR 1 */}
            <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-bg-alt flex items-center justify-center text-gold-dark mb-6 border border-border-strong">
                <Shield className="w-9 h-9" />
              </div>
              <h3 className="font-display font-bold text-2xl text-ink mb-1">
                {dict.why_us.pillar1Title}
              </h3>
              <span className="text-xs font-bold text-gold-dark uppercase tracking-wider mb-3">
                {dict.why_us.pillar1Subtitle}
              </span>
              <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light">
                {dict.why_us.pillar1Desc}
              </p>
            </div>

            {/* PILLAR 2 */}
            <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-bg-alt flex items-center justify-center text-gold-dark mb-6 border border-border-strong">
                <Clock className="w-9 h-9" />
              </div>
              <h3 className="font-display font-bold text-2xl text-ink mb-1">
                {dict.why_us.pillar2Title}
              </h3>
              <span className="text-xs font-bold text-gold-dark uppercase tracking-wider mb-3">
                {dict.why_us.pillar2Subtitle}
              </span>
              <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light">
                {dict.why_us.pillar2Desc}
              </p>
            </div>

            {/* PILLAR 3 */}
            <div className="bg-surface rounded-2xl p-8 border border-border shadow-xs flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-bg-alt flex items-center justify-center text-gold-dark mb-6 border border-border-strong">
                <HeartHandshake className="w-9 h-9" />
              </div>
              <h3 className="font-display font-bold text-2xl text-ink mb-1">
                {dict.why_us.pillar3Title}
              </h3>
              <span className="text-xs font-bold text-gold-dark uppercase tracking-wider mb-3">
                {dict.why_us.pillar3Subtitle}
              </span>
              <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light">
                {dict.why_us.pillar3Desc}
              </p>
            </div>
          </div>

          {/* HONEST COMPARISON TABLE */}
          <div className="max-w-4xl mx-auto bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-xs">
            <h3 className="font-display font-bold text-2xl text-ink mb-6 text-center">
              {dict.why_us.comparisonTitle}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-border text-ink font-bold">
                    <th className="py-3 px-4 text-start">Feature</th>
                    <th className="py-3 px-4 text-gold-dark bg-gold-soft/40 font-extrabold text-start">
                      Royal Umrah Cabs
                    </th>
                    <th className="py-3 px-4 text-ink-muted text-start">Airport Street Taxis</th>
                    <th className="py-3 px-4 text-ink-muted text-start">Generic Apps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-body">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">Pricing Structure</td>
                    <td className="py-3.5 px-4 font-bold text-ink bg-gold-soft/20">
                      ✓ 100% Fixed, Zero Surge
                    </td>
                    <td className="py-3.5 px-4 text-ink-muted">May haggle or meter</td>
                    <td className="py-3.5 px-4 text-ink-muted">Surge pricing often applies</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">Terminal Meet &amp; Greet</td>
                    <td className="py-3.5 px-4 font-bold text-ink bg-gold-soft/20">
                      ✓ Dedicated Nameplate Pickup
                    </td>
                    <td className="py-3.5 px-4 text-ink-muted">Must queue outside</td>
                    <td className="py-3.5 px-4 text-ink-muted">Find driver in parking</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">Flight Delay Policy</td>
                    <td className="py-3.5 px-4 font-bold text-ink bg-gold-soft/20">
                      ✓ Free Flight Tracking + 60m Wait
                    </td>
                    <td className="py-3.5 px-4 text-ink-muted">No flight tracking</td>
                    <td className="py-3.5 px-4 text-ink-muted">Auto-cancellation after 10m</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">Miqat Stop for Ihram</td>
                    <td className="py-3.5 px-4 font-bold text-ink bg-gold-soft/20">
                      ✓ Scheduled without rush
                    </td>
                    <td className="py-3.5 px-4 text-ink-muted">Extra fees often requested</td>
                    <td className="py-3.5 px-4 text-ink-muted">Not supported on highway</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">Payment Method</td>
                    <td className="py-3.5 px-4 font-bold text-ink bg-gold-soft/20">
                      ✓ Cash or Card Upon Arrival
                    </td>
                    <td className="py-3.5 px-4 text-ink-muted">Cash only usually</td>
                    <td className="py-3.5 px-4 text-ink-muted">Card upfront only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="py-16 md:py-24 bg-bg border-t border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.reviews.sectionPill}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {dict.reviews.heading}{' '}
              <span className="text-gold-dark italic">{dict.reviews.headingHighlight}</span>
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {dict.reviews.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
            {/* REVIEW 1: MALAYSIA */}
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between text-start">
              <div>
                <div className="text-gold font-bold text-sm mb-3">★★★★★</div>
                <p className="text-xs md:text-sm text-body leading-relaxed italic mb-4 font-light">
                  "Alhamdulillah, perkhidmatan yang sangat memuaskan dari Lapangan Terbang Jeddah ke Makkah. Pemandu sangat sopan, kereta Staria yang luas dan bersih. Sangat disyorkan untuk jemaah dari Malaysia!"
                </p>
              </div>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-ink text-sm">Haji Zulkifli &amp; Keluarga</h4>
                  <span className="text-xs text-ink-muted">Kuala Lumpur, Malaysia 🇲🇾</span>
                </div>
                <span className="text-xs font-bold text-gold-dark">Staria VIP</span>
              </div>
            </div>

            {/* REVIEW 2: UK */}
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between text-start">
              <div>
                <div className="text-gold font-bold text-sm mb-3">★★★★★</div>
                <p className="text-xs md:text-sm text-body leading-relaxed italic mb-4 font-light">
                  "Booking from Birmingham was completely seamless. The driver was waiting at Terminal 1 with my name despite our flight delay. Spotless GMC Yukon XL. Truly respectful service."
                </p>
              </div>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-ink text-sm">Dr. Tariq Mahmood</h4>
                  <span className="text-xs text-ink-muted">Birmingham, United Kingdom 🇬🇧</span>
                </div>
                <span className="text-xs font-bold text-gold-dark">Yukon XL</span>
              </div>
            </div>

            {/* REVIEW 3: ARAB / GCC */}
            <div className="bg-surface rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between text-start">
              <div>
                <div className="text-gold font-bold text-sm mb-3">★★★★★</div>
                <p className="text-xs md:text-sm text-body leading-relaxed italic mb-4 font-light">
                  "خدمة ممتازة ودقة عالية في المواعيد بين مكة والمدينة. السيارة نظيفة والتكييف بارد وتوفر ماء زمزم بارد. جزاكم الله خيراً على حسن التعامل وأمانة السائقين."
                </p>
              </div>
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-ink text-sm">أبو عبدالرحمن الشمري</h4>
                  <span className="text-xs text-ink-muted">المملكة العربية السعودية 🇸🇦</span>
                </div>
                <span className="text-xs font-bold text-gold-dark">كامري بريميوم</span>
              </div>
            </div>
          </div>

          <div className="text-center flex flex-wrap items-center justify-center gap-4">
            <a
              href={settings.google_reviews_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-btn bg-gold text-ink font-bold text-xs uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-colors shadow-xs"
            >
              <span>{dict.reviews.writeReviewButton}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </a>
            <a
              href={settings.google_reviews_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-btn border border-border-strong text-ink font-semibold text-xs hover:bg-bg-alt transition-colors"
            >
              <span>{dict.reviews.readAllButton}</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section id="faq" className="py-16 md:py-24 bg-surface border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <span>{dict.faq.sectionPill}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {dict.faq.heading}
            </h2>
            <p className="mt-3 text-ink-muted text-base leading-relaxed font-light">
              {dict.faq.subtitle}
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-start font-display font-semibold text-lg md:text-xl text-ink py-2 hover:text-gold-dark transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="w-8 h-8 rounded-full bg-bg-alt flex items-center justify-center text-gold-dark font-bold shrink-0 ml-4 rtl:ml-0 rtl:mr-4">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pt-2 pb-3 text-xs md:text-sm text-ink-muted leading-relaxed font-light text-start">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LONG SEO ARTICLE BLOCK (NARROW CENTERED COLUMN ~900PX, H2/H3, BOLD KEYWORDS, GOLD INTERNAL LINKS) */}
      <article className="py-16 md:py-20 bg-bg border-t border-border">
        <div className="container mx-auto px-4 max-w-[900px] text-start prose prose-neutral">
          <h2 className="font-display font-bold text-2xl md:text-4xl text-ink mb-6">
            Private Umrah Transport Services: Reliable Chauffeur Transfers in Saudi Arabia
          </h2>
          <p className="text-sm md:text-base text-body leading-relaxed mb-4">
            Embarking on the sacred journey of Umrah or Hajj is a lifetime milestone. At{' '}
            <strong className="text-ink font-semibold">Royal Umrah Cabs</strong>, our dedicated chauffeur service is designed to deliver seamless, stress-free transfers connecting{' '}
            <Link href={`/${locale}/routes`} className="text-gold-dark font-semibold hover:underline">
              Jeddah Airport (King Abdulaziz International Airport KAIA)
            </Link>
            , hotels in <strong className="text-ink">Makkah Al-Mukarramah</strong>, and the central holy sanctuary of{' '}
            <Link href={`/${locale}/routes`} className="text-gold-dark font-semibold hover:underline">
              Madinah Al-Munawwarah
            </Link>
            .
          </p>

          <h3 className="font-display font-bold text-xl md:text-2xl text-ink mt-8 mb-4">
            Direct Private Fleet with Honest Fixed Rates
          </h3>
          <p className="text-sm md:text-base text-body leading-relaxed mb-4">
            Unlike traditional airport street taxis that rely on haggling or generic rideshare platforms with peak surge multipliers, our rates are 100% fixed and tax-inclusive. Our fleet features modern vehicles like the{' '}
            <Link href={`/${locale}/fleet`} className="text-gold-dark font-semibold hover:underline">
              Hyundai Staria VIP family van
            </Link>{' '}
            and the luxury{' '}
            <Link href={`/${locale}/fleet`} className="text-gold-dark font-semibold hover:underline">
              GMC Yukon XL
            </Link>
            , equipped with dual air conditioning, phone chargers, and chilled Zamzam water.
          </p>

          <h3 className="font-display font-bold text-xl md:text-2xl text-ink mt-8 mb-4">
            Dedicated Support for Pilgrims from Malaysia and Worldwide
          </h3>
          <p className="text-sm md:text-base text-body leading-relaxed mb-4">
            We provide specialized assistance for pilgrims flying from Malaysia (Kuala Lumpur KUL), the United Kingdom, the United States, and across the Muslim world. With 24/7 WhatsApp dispatch, automated flight delay monitoring, and our transparent{' '}
            <strong className="text-ink">"Pay Upon Arrival"</strong> policy, your sacred journey is in safe hands.
          </p>
        </div>
      </article>

      {/* DARK CTA BAND */}
      <section className="bg-charcoal text-white border-t border-charcoal/80 py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-display font-semibold text-3xl md:text-5xl text-white mb-4 leading-tight">
            {dict.cta_band.heading}{' '}
            <span className="text-gold italic">{dict.cta_band.headingHighlight}</span>
          </h2>
          <p className="text-sm md:text-lg text-white/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            {dict.cta_band.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking`}
              className="h-12 px-8 rounded-btn bg-gold text-ink font-bold text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-gold flex items-center justify-center gap-2"
            >
              <span>{dict.cta_band.buttonPrimary}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-7 rounded-btn border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-whatsapp" />
              <span>{dict.cta_band.buttonWhatsApp}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
