import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { ZIYARAT_SITES, ZIYARAT_TOURS } from '@/data/ziyarat';
import { ZiyaratSiteJsonLd } from '@/components/seo/ZiyaratJsonLd';
import { MapPin, Clock, ShieldCheck, Check, ArrowRight, Car, Compass, AlertCircle, MessageCircle } from 'lucide-react';

interface SiteDetailPageProps {
  params: Promise<{
    locale: Locale;
    city: string;
    site: string;
  }>;
}

export function generateStaticParams() {
  return Object.values(ZIYARAT_SITES).map((s) => ({
    city: s.city,
    site: s.slug,
  }));
}

export async function generateMetadata(props: SiteDetailPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale,
    city,
    site
  } = params;

  const s = ZIYARAT_SITES[site];
  if (!s || s.city !== city) return {};
  const isAr = locale === 'ar';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

  return {
    title: isAr ? s.titleAr : s.titleEn,
    description: isAr ? s.metaDescAr : s.metaDescEn,
    alternates: {
      canonical: `${baseUrl}/${locale}/ziyarat/${city}/${site}`,
    },
  };
}

export default async function SiteDetailPage(props: SiteDetailPageProps) {
  const params = await props.params;

  const {
    locale,
    city,
    site
  } = params;

  const s = ZIYARAT_SITES[site];
  if (!s || s.city !== city) {
    notFound();
  }

  const isAr = locale === 'ar';
  const isMakkah = city === 'makkah';
  const relatedToursList = s.relatedTours.map((slug) => ZIYARAT_TOURS[slug]).filter(Boolean);
  const currentUrl = `https://duyufalrahmanvip.com/${locale}/ziyarat/${city}/${site}`;

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-start">
      <ZiyaratSiteJsonLd site={s} locale={locale} url={currentUrl} />

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
          <Link href={`/${locale}/ziyarat/${city}`} className="hover:text-gold-dark">
            {isMakkah ? (isAr ? 'مكة المكرمة' : 'Makkah') : (isAr ? 'المدينة المنورة' : 'Madinah')}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold truncate">
            {isAr ? s.titleAr : s.titleEn}
          </span>
        </div>

        {/* HERO TITLE */}
        <div className="mb-8">
          <span className="text-[11px] font-bold text-gold-dark uppercase tracking-widest block mb-2">
            {isMakkah ? (isAr ? 'معالم مكة المكرمة' : 'Makkah Holy Sanctuary') : (isAr ? 'معالم المدينة المنورة' : 'Madinah Prophetic Site')}
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight mb-3">
            {isAr ? s.titleAr : s.titleEn}
          </h1>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed font-light">
            {isAr ? s.subtitleAr : s.subtitleEn}
          </p>
        </div>

        {/* 1. ANSWER-FIRST QUICK OVERVIEW */}
        <div className="bg-surface rounded-2xl border-2 border-gold-line p-6 md:p-8 mb-8 shadow-xs">
          <h2 className="text-xs font-bold text-gold-dark uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Compass className="w-4 h-4" />
            <span>{isAr ? 'نظرة سريعة وإجابة مباشرة' : 'Quick Answer & Key Facts'}</span>
          </h2>
          <p className="text-sm md:text-base text-ink leading-relaxed font-normal">
            {isAr ? s.answerFirstAr : s.answerFirstEn}
          </p>
        </div>

        {/* 2. PRACTICAL VISIT SPECIFICATIONS TABLE */}
        <div className="bg-surface rounded-2xl border border-border p-6 mb-10 shadow-xs">
          <h3 className="font-display font-bold text-lg text-ink mb-4">
            {isAr ? 'بطاقة المعلومات العملية للزيارة' : 'Practical Visitor Factsheet'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-bg-alt/70 border border-border">
              <span className="text-ink-muted block mb-1 font-medium">{isAr ? 'المسافة من الحرم:' : 'Distance from Haram:'}</span>
              <span className="font-bold text-ink text-sm">{isAr ? s.distanceFromHaramAr : s.distanceFromHaramEn}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-bg-alt/70 border border-border">
              <span className="text-ink-muted block mb-1 font-medium">{isAr ? 'مدة الزيارة التقريبية:' : 'Typical Duration:'}</span>
              <span className="font-bold text-ink text-sm">{isAr ? s.typicalDurationAr : s.typicalDurationEn}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-bg-alt/70 border border-border">
              <span className="text-ink-muted block mb-1 font-medium">{isAr ? 'المشقة البدنية والمشي:' : 'Walking & Climbing Effort:'}</span>
              <span className="font-bold text-ink text-sm">{isAr ? s.walkingEffortAr : s.walkingEffortEn}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-bg-alt/70 border border-border">
              <span className="text-ink-muted block mb-1 font-medium">{isAr ? 'أفضل وقت للزيارة:' : 'Optimal Time to Visit:'}</span>
              <span className="font-bold text-ink text-sm">{isAr ? s.bestTimeAr : s.bestTimeEn}</span>
            </div>
          </div>
          <div className="mt-4 p-3.5 rounded-xl bg-bg-alt/70 border border-border text-xs">
            <span className="text-ink-muted block mb-1 font-medium">{isAr ? 'سهولة وصول كبار السن والكراسي المتحركة:' : 'Senior & Wheelchair Accessibility:'}</span>
            <p className="text-ink leading-relaxed font-light">{isAr ? s.accessibilityAr : s.accessibilityEn}</p>
          </div>
        </div>

        {/* 3. HISTORICAL CONTEXT & SCHOLARLY SOURCING */}
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 mb-10 shadow-xs">
          <h3 className="font-display font-bold text-xl text-ink mb-3">
            {isAr ? 'المكانة والأهمية التاريخية' : 'Historical & Spiritual Context'}
          </h3>
          <p className="text-xs md:text-sm text-ink-light leading-relaxed font-light mb-4">
            {isAr ? s.historyAr : s.historyEn}
          </p>
          <div className="p-3.5 rounded-xl bg-gold-soft/30 border border-gold-line text-[11px] text-ink-muted">
            <span className="font-bold text-gold-dark block mb-0.5">
              {isAr ? 'المصادر والتدقيق التاريخي:' : 'Historical Sourcing & Verification:'}
            </span>
            <p>{isAr ? s.historySourceAr : s.historySourceEn}</p>
          </div>
        </div>

        {/* 4. VISITING TIPS & ETIQUETTE */}
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 mb-10 shadow-xs">
          <h3 className="font-display font-bold text-xl text-ink mb-4">
            {isAr ? 'إرشادات وآداب الزيارة' : 'Visiting Tips & Sacred Etiquette'}
          </h3>
          <ul className="space-y-2.5 text-xs md:text-sm text-ink-light">
            {(isAr ? s.etiquetteAr : s.etiquetteEn).map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                <span className="leading-relaxed font-light">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 5. HOW TO VISIT WITH PRIVATE CHAUFFEUR */}
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 mb-10 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Car className="w-5 h-5 text-gold-dark" />
            <h3 className="font-display font-bold text-xl text-ink">
              {isAr ? 'كيف تزور هذا الموقع بسيارة خاصة وسائق؟' : 'How to Visit with a Private Chauffeur'}
            </h3>
          </div>
          <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light mb-6">
            {isAr ? s.carInstructionsAr : s.carInstructionsEn}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/${locale}/booking?service=ziyarat&site=${s.slug}`}
              className="h-11 px-6 rounded-btn bg-gold hover:bg-gold-hover hover:text-white text-ink text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold transition-all"
            >
              <Car className="w-4 h-4" />
              <span>{isAr ? 'احجز سيارة لزيارة هذا الموقع' : 'Book Chauffeur to This Site'}</span>
            </Link>
            <a
              href={`https://wa.me/966567588261?text=${encodeURIComponent(
                isAr
                  ? `السلام عليكم، أود حجز سيارة خاصة لزيارة ${s.titleAr}.`
                  : `Hello, I would like to book a private car to visit ${s.titleEn}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-6 rounded-btn border border-border-strong text-ink hover:text-gold-dark text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-whatsapp" />
              <span>{isAr ? 'تأكيد مباشر عبر واتساب' : 'Inquire on WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* 6. RELATED TOURS */}
        {relatedToursList.length > 0 && (
          <div className="mb-10">
            <h3 className="font-display font-bold text-xl text-ink mb-4">
              {isAr ? 'جولات تشمل هذا الموقع' : 'Curated Tours Featuring This Site'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedToursList.map((t) => (
                <Link
                  key={t.slug}
                  href={`/${locale}/ziyarat/tours/${t.slug}`}
                  className="p-5 rounded-xl bg-surface border border-border hover:border-gold transition-all block group"
                >
                  <span className="text-[10px] text-gold-dark font-bold uppercase tracking-wider block mb-1">
                    {isAr ? t.durationAr : t.durationEn}
                  </span>
                  <h4 className="font-display font-bold text-base text-ink group-hover:text-gold-dark transition-colors mb-1">
                    {isAr ? t.titleAr : t.titleEn}
                  </h4>
                  <p className="text-xs text-ink-muted line-clamp-2 font-light mb-3">
                    {isAr ? t.subtitleAr : t.subtitleEn}
                  </p>
                  <span className="text-xs font-bold text-ink">
                    {isAr ? 'يبدأ من' : 'From'} {t.basePriceSAR.camry} SAR
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 7. SITE FAQS */}
        {s.faqsEn.length > 0 && (
          <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 mb-10 shadow-xs">
            <h3 className="font-display font-bold text-xl text-ink mb-6">
              {isAr ? 'الأسئلة الشائعة حول الموقع' : 'Frequently Asked Questions'}
            </h3>
            <div className="space-y-4">
              {(isAr ? s.faqsAr : s.faqsEn).map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-bg-alt/50 border border-border">
                  <h4 className="font-bold text-xs md:text-sm text-ink mb-1.5">{faq.q}</h4>
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
            <span className="text-[10px] text-ink-muted block">{isAr ? 'زيارة خاصة مع سائق' : 'Private Chauffeur'}</span>
            <span className="font-display font-bold text-xs text-ink truncate max-w-[150px] block">
              {isAr ? s.titleAr : s.titleEn}
            </span>
          </div>
          <Link
            href={`/${locale}/booking?service=ziyarat&site=${s.slug}`}
            className="h-10 px-5 rounded-btn bg-gold hover:bg-gold-hover text-ink text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs shrink-0"
          >
            <Car className="w-3.5 h-3.5" />
            <span>{isAr ? 'احجز الآن' : 'Book Car'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
