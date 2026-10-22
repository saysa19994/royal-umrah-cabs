import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { ZIYARAT_TOURS } from '@/data/ziyarat';
import { ZiyaratTourJsonLd } from '@/components/seo/ZiyaratJsonLd';
import { Clock, ShieldCheck, Check, X, ArrowRight, Car, Users, Luggage, MessageCircle } from 'lucide-react';

interface TourDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return Object.values(ZIYARAT_TOURS).map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata(props: TourDetailPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const t = ZIYARAT_TOURS[slug];
  if (!t) return {};
  const isAr = locale === 'ar';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

  return {
    title: isAr ? t.titleAr : t.titleEn,
    description: isAr ? t.metaDescAr : t.metaDescEn,
    alternates: getLocalizedAlternates(locale, `/ziyarat/tours/${slug}`),
  };
}

export default async function TourDetailPage(props: TourDetailPageProps) {
  const params = await props.params;

  const {
    locale,
    slug
  } = params;

  const t = ZIYARAT_TOURS[slug];
  if (!t) {
    notFound();
  }

  const isAr = locale === 'ar';
  const isMakkah = t.city === 'makkah';
  const itinerary = isAr ? t.itineraryAr : t.itineraryEn;
  const currentUrl = `https://duyufalrahmanvip.com/${locale}/ziyarat/tours/${slug}`;

  const vehicles = [
    { id: 'camry', name: 'Toyota Camry Executive', seats: 4, bags: 3, price: t.basePriceSAR.camry },
    { id: 'staria', name: 'Hyundai Staria VIP', seats: 7, bags: 6, price: t.basePriceSAR.staria },
    { id: 'yukon', name: 'GMC Yukon XL VIP', seats: 7, bags: 8, price: t.basePriceSAR.yukon },
    { id: 'hiace', name: 'Toyota HiAce VIP', seats: 10, bags: 10, price: t.basePriceSAR.hiace },
    { id: 'coaster', name: 'Toyota Coaster VIP Bus', seats: 21, bags: 20, price: t.basePriceSAR.coaster },
  ];

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-start">
      <ZiyaratTourJsonLd tour={t} locale={locale} url={currentUrl} />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* BREADCRUMB */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted mb-6">
          <Link href={`/${locale}`} className="hover:text-gold-dark">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/ziyarat`} className="hover:text-gold-dark">
            {isAr ? 'المزارات' : 'Ziyarat'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/ziyarat/${t.city}`} className="hover:text-gold-dark">
            {isMakkah ? (isAr ? 'مكة المكرمة' : 'Makkah') : (isAr ? 'المدينة المنورة' : 'Madinah')}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold truncate">
            {isAr ? t.titleAr : t.titleEn}
          </span>
        </div>

        {/* HERO TITLE */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>{isAr ? t.durationAr : t.durationEn}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight mb-3">
            {isAr ? t.titleAr : t.titleEn}
          </h1>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed font-light">
            {isAr ? t.subtitleAr : t.subtitleEn}
          </p>
        </div>

        {/* 1. ITINERARY TABLE */}
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 mb-10 shadow-xs">
          <h2 className="font-display font-bold text-xl text-ink mb-6">
            {isAr ? 'جدول وخط سير الجولة (المحطات والأوقات)' : 'Tour Itinerary & Stop Breakdown'}
          </h2>
          <div className="space-y-4">
            {itinerary.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-bg-alt/60 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-gold/15 text-gold-dark font-display font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-ink mb-0.5">{step.stop}</h3>
                    <p className="text-xs text-ink-muted leading-relaxed font-light">{step.description}</p>
                  </div>
                </div>
                <div className="text-xs font-bold text-gold-dark shrink-0 sm:text-end pl-10 sm:pl-0">
                  {step.duration}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. VEHICLE OPTIONS & CAPACITIES (PRICING TABLE) */}
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 mb-10 shadow-xs">
          <h2 className="font-display font-bold text-xl text-ink mb-2">
            {isAr ? 'خيارات المركبات والأسعار الثابتة' : 'Vehicle Options & Guaranteed Fares'}
          </h2>
          <p className="text-xs text-ink-muted mb-6 font-light">
            {isAr
              ? 'الأسعار شاملة للسيارة بالكامل، السائق المخصص، والوقود ورسوم الانتظار. لا توجد أي مبالغ إضافية.'
              : 'Transparent fixed pricing per vehicle. All driver waiting fees, fuel, and tolls included.'}
          </p>

          <div className="space-y-3">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="p-4 rounded-xl border border-border hover:border-gold transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-display font-bold text-base text-ink mb-1">{v.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-ink-muted">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-gold-dark" />
                      <span>{v.seats} {isAr ? 'ركاب' : 'Seats'}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Luggage className="w-3.5 h-3.5 text-gold-dark" />
                      <span>{v.bags} {isAr ? 'حقائب' : 'Bags'}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-end">
                    <span className="text-[10px] text-ink-muted block">{isAr ? 'السعر الثابت' : 'Fixed Fare'}</span>
                    <span className="font-display font-bold text-xl text-ink">{v.price} SAR</span>
                  </div>
                  <Link
                    href={`/${locale}/booking?service=ziyarat&tour=${t.slug}&vehicle=${v.id}`}
                    className="h-10 px-5 rounded-btn bg-gold hover:bg-gold-hover hover:text-white text-ink text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-colors shadow-xs"
                  >
                    <span>{isAr ? 'اختيار' : 'Select'}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. INCLUDED / NOT INCLUDED & CANCELLATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-surface rounded-2xl border border-border p-6">
            <h3 className="font-display font-bold text-base text-ink mb-4 flex items-center gap-2">
              <Check className="w-4 h-4 text-whatsapp" />
              <span>{isAr ? 'الخدمات المشمولة' : 'What is Included'}</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-ink-light font-light">
              {(isAr ? t.includedAr : t.includedEn).map((inc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-whatsapp shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface rounded-2xl border border-border p-6">
            <h3 className="font-display font-bold text-base text-ink mb-4 flex items-center gap-2">
              <X className="w-4 h-4 text-red-500" />
              <span>{isAr ? 'غير مشمول' : 'Not Included'}</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-ink-light font-light">
              {(isAr ? t.notIncludedAr : t.notIncludedEn).map((nInc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <span>{nInc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CANCELLATION NOTICE */}
        <div className="bg-bg-alt/70 rounded-2xl border border-border p-6 mb-10 text-xs text-ink-muted flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-ink block mb-1">
              {isAr ? 'سياسة الإلغاء الشفافة:' : 'Flexible Cancellation Policy:'}
            </span>
            <p className="leading-relaxed font-light">
              {isAr ? t.cancellationPolicyAr : t.cancellationPolicyEn}
            </p>
          </div>
        </div>

        {/* 4. TOUR FAQS */}
        {t.faqsEn.length > 0 && (
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 mb-10 shadow-xs">
            <h2 className="font-display font-bold text-xl text-ink mb-6">
              {isAr ? 'الأسئلة الشائعة حول هذه الجولة' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {(isAr ? t.faqsAr : t.faqsEn).map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-bg-alt/50 border border-border">
                  <h3 className="font-bold text-xs md:text-sm text-ink mb-1.5">{faq.q}</h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-light">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border p-3 md:hidden shadow-lg">
        <div className="container mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-ink-muted block">{isAr ? 'سعر الجولة من' : 'Tour fare from'}</span>
            <span className="font-display font-bold text-base text-ink">{t.basePriceSAR.camry} SAR</span>
          </div>
          <Link
            href={`/${locale}/booking?service=ziyarat&tour=${t.slug}`}
            className="h-10 px-6 rounded-btn bg-gold hover:bg-gold-hover text-ink text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs"
          >
            <Car className="w-3.5 h-3.5" />
            <span>{isAr ? 'احجز الجولة' : 'Book Tour'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
