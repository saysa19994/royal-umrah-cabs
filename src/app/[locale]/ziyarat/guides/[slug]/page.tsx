import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { ZIYARAT_GUIDES } from '@/data/ziyarat';
import { Clock, Calendar, ArrowRight, Car, Compass, MessageCircle, ShieldCheck } from 'lucide-react';

interface GuideDetailPageProps {
  params: {
    locale: Locale;
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.values(ZIYARAT_GUIDES).map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({
  params: { locale, slug },
}: GuideDetailPageProps): Promise<Metadata> {
  const g = ZIYARAT_GUIDES[slug];
  if (!g) return {};
  const isAr = locale === 'ar';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app';

  return {
    title: isAr ? g.titleAr : g.titleEn,
    description: isAr ? g.metaDescAr : g.metaDescEn,
    alternates: {
      canonical: `${baseUrl}/${locale}/ziyarat/guides/${slug}`,
    },
  };
}

export default function GuideDetailPage({ params: { locale, slug } }: GuideDetailPageProps) {
  const g = ZIYARAT_GUIDES[slug];
  if (!g) {
    notFound();
  }

  const isAr = locale === 'ar';
  const currentUrl = `https://royal-umrah-cabs.vercel.app/${locale}/ziyarat/guides/${slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isAr ? g.titleAr : g.titleEn,
    description: isAr ? g.metaDescAr : g.metaDescEn,
    dateModified: '2026-10-18',
    mainEntityOfPage: currentUrl,
    author: {
      '@type': 'Organization',
      name: 'Royal Umrah Cabs Dispatch Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Royal Umrah Cabs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://royal-umrah-cabs.vercel.app/logo.png',
      },
    },
  };

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-start">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="container mx-auto px-4 max-w-3xl">
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
          <span className="text-ink font-semibold truncate">
            {isAr ? g.titleAr : g.titleEn}
          </span>
        </div>

        {/* HEADER */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-gold-dark font-semibold mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>{isAr ? `آخر تحديث: ${g.lastUpdated}` : `Last Updated: ${g.lastUpdated}`}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight mb-4">
            {isAr ? g.titleAr : g.titleEn}
          </h1>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed font-light">
            {isAr ? g.summaryAr : g.summaryEn}
          </p>
        </div>

        {/* CONTENT SECTIONS */}
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-10 mb-10 shadow-xs space-y-6">
          {(isAr ? g.contentAr : g.contentEn).map((para, idx) => (
            <p key={idx} className="text-xs md:text-sm text-ink-light leading-relaxed font-light">
              {para}
            </p>
          ))}
        </div>

        {/* CTA BOX */}
        <div className="bg-bg-alt rounded-2xl border border-border p-8 text-center">
          <h2 className="font-display font-bold text-xl text-ink mb-2">
            {isAr ? 'هل ترغب في حجز سيارة خاصة لجولة المزارات؟' : 'Ready to Plan Your Private Ziyarat Tour?'}
          </h2>
          <p className="text-xs text-ink-muted max-w-lg mx-auto font-light mb-6">
            {isAr
              ? 'احجز سيارتك الفارهة الآن مع سائق خاص خبير بأسعار ثابتة تبدأ من 250 ريال فقط شاملة الانتظار.'
              : 'Secure your private luxury car and chauffeur with guaranteed fixed fares starting from 250 SAR.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${locale}/booking?service=ziyarat`}
              className="h-11 px-8 rounded-btn bg-gold hover:bg-gold-hover hover:text-white text-ink text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-gold transition-all"
            >
              <Car className="w-4 h-4" />
              <span>{isAr ? 'احجز سيارة المزارات' : 'Book Ziyarat Car'}</span>
            </Link>
            <Link
              href={`/${locale}/ziyarat`}
              className="h-11 px-6 rounded-btn border border-border-strong text-ink hover:text-gold-dark text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <span>{isAr ? 'عرض كافة الجولات' : 'View All Tours'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
