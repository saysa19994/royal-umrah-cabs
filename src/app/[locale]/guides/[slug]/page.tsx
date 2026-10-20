import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale, getLocalizedAlternates, LOCALES } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { COMPREHENSIVE_GUIDES, GuideItem } from '@/data/comprehensive-guides';
import { AUTHORITATIVE_TRANSFER_RATES } from '@/lib/pricing-constants';
import {
  BookOpen,
  MapPin,
  Clock,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Car,
  ChevronDown,
} from 'lucide-react';

interface GuideSlugPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const guide of COMPREHENSIVE_GUIDES) {
      params.push({ locale, slug: guide.slug });
    }
  }
  return params;
}

export async function generateMetadata(props: GuideSlugPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;

  const guide = COMPREHENSIVE_GUIDES.find((g) => g.slug === slug);
  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  const title = guide.title[locale] || guide.title.en;
  const description = guide.subtitle[locale] || guide.summary[locale] || guide.subtitle.en;

  return {
    title: `${title} | Royal Umrah Cabs`,
    description,
    alternates: getLocalizedAlternates(locale, `/guides/${slug}`),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: '2026-10-20T00:00:00.000Z',
    },
  };
}

export default async function GuideDetailPage(props: GuideSlugPageProps) {
  const params = await props.params;
  const { locale, slug } = params;

  const guide = COMPREHENSIVE_GUIDES.find((g) => g.slug === slug);
  if (!guide) {
    notFound();
  }

  const dict = getDictionary(locale);
  const routePrices = AUTHORITATIVE_TRANSFER_RATES[guide.routeId] || AUTHORITATIVE_TRANSFER_RATES['jeddah-airport-to-makkah'];

  // Breadcrumbs JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: dict.nav.home || 'Home',
        item: `https://royal-umrah-cabs.vercel.app/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: dict.nav.guides || 'Guides',
        item: `https://royal-umrah-cabs.vercel.app/${locale}/guides`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title[locale] || guide.title.en,
        item: `https://royal-umrah-cabs.vercel.app/${locale}/guides/${slug}`,
      },
    ],
  };

  // FAQ Schema JSON-LD
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q[locale] || faq.q.en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a[locale] || faq.a.en,
      },
    })),
  };

  // WhatsApp random attribution
  const waNumber = Math.random() < 0.5 ? '966567588261' : '966505316971';
  const refCode = waNumber === '966567588261' ? `REF-A-${Math.floor(1000 + Math.random() * 9000)}` : `REF-B-${Math.floor(1000 + Math.random() * 9000)}`;
  const waText = encodeURIComponent(
    locale === 'ar'
      ? `السلام عليكم، قرأت دليل (${guide.title.ar}) وأرغب في الاستفسار والحجز. رمز الدليل: ${refCode}`
      : `Salam, I read the guide "${guide.title.en}" and would like to inquire about private transport. Ref: ${refCode}`
  );
  const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-start">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-muted mb-8">
          <Link href={`/${locale}`} className="hover:text-gold-dark transition-colors">
            {dict.nav.home}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/guides`} className="hover:text-gold-dark transition-colors">
            {dict.nav.guides || 'Guides'}
          </Link>
          <span>/</span>
          <span className="text-ink font-medium truncate max-w-xs md:max-w-md">
            {guide.categoryLabel[locale] || guide.categoryLabel.en}
          </span>
        </nav>

        {/* 1. CLEAR TITLE & SUBTITLE */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              {guide.categoryLabel[locale] || guide.categoryLabel.en}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
              <Clock className="w-3.5 h-3.5" />
              {guide.readTime}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
              <Calendar className="w-3.5 h-3.5" />
              {locale === 'ar' ? 'تم التحديث:' : 'Updated:'} {guide.updatedDate}
            </span>
          </div>

          <h1 className="font-display font-semibold text-2xl sm:text-3xl md:text-5xl text-ink tracking-tight leading-tight">
            {guide.title[locale] || guide.title.en}
          </h1>

          <p className="mt-4 text-base md:text-lg text-ink-muted font-light leading-relaxed">
            {guide.subtitle[locale] || guide.subtitle.en}
          </p>

          {/* 3. PRACTICAL METRICS BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 p-4 bg-surface rounded-2xl border border-border">
            {guide.distanceKm ? (
              <div className="text-start">
                <span className="text-[11px] uppercase tracking-wider text-ink-muted block font-semibold">
                  {locale === 'ar' ? 'المسافة التقريبية' : 'Distance'}
                </span>
                <span className="text-base font-bold text-ink">
                  {guide.distanceKm} {locale === 'ar' ? 'كم' : 'km'}
                </span>
              </div>
            ) : null}
            <div className="text-start">
              <span className="text-[11px] uppercase tracking-wider text-ink-muted block font-semibold">
                {locale === 'ar' ? 'مدة الانتقال' : 'Travel Time'}
              </span>
              <span className="text-base font-bold text-ink">
                {guide.travelTime[locale] || guide.travelTime.en}
              </span>
            </div>
            <div className="text-start">
              <span className="text-[11px] uppercase tracking-wider text-ink-muted block font-semibold">
                {locale === 'ar' ? 'نوع النقل' : 'Service Type'}
              </span>
              <span className="text-base font-bold text-gold-dark">
                {locale === 'ar' ? 'خاص ومباشر' : 'Private Direct'}
              </span>
            </div>
            <div className="text-start">
              <span className="text-[11px] uppercase tracking-wider text-ink-muted block font-semibold">
                {locale === 'ar' ? 'الدفع' : 'Payment'}
              </span>
              <span className="text-base font-bold text-ink">
                {locale === 'ar' ? 'عند الوصول' : 'On Arrival'}
              </span>
            </div>
          </div>
        </header>

        {/* 2. QUICK ANSWER CALLOUT BOX */}
        <section className="bg-charcoal text-white rounded-2xl p-6 md:p-8 mb-12 shadow-md relative overflow-hidden border border-gold-dark/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl" />
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center shrink-0 text-gold border border-gold/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-gold font-display font-bold text-lg mb-2">
                {locale === 'ar' ? 'الخلاصة السريعة' : 'Quick Answer for Pilgrims'}
              </h2>
              <p className="text-sm md:text-base text-cream/90 font-light leading-relaxed">
                {guide.summary[locale] || guide.summary.en}
              </p>
            </div>
          </div>
        </section>

        {/* 4. COMPARISON TABLE (IF AVAILABLE) */}
        {guide.comparisonTable && (
          <section className="mb-14">
            <div className="mb-4">
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink">
                {locale === 'ar' ? 'جدول المقارنة العملية والشاملة' : 'Head-to-Head Comparison Table'}
              </h2>
              <p className="text-xs md:text-sm text-ink-muted mt-1 font-light">
                {locale === 'ar'
                  ? 'مقارنة حيادية مبنية على تجربة المعتمرين مع الحقائب والعائلات'
                  : 'Objective breakdown based on family group dynamics and luggage handling'}
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-border shadow-xs bg-surface">
              <table className="w-full text-xs md:text-sm text-start">
                <thead className="bg-charcoal text-cream font-display text-xs uppercase tracking-wider">
                  <tr>
                    {guide.comparisonTable.headers.map((hdr, i) => (
                      <th
                        key={i}
                        className={`p-3.5 md:p-4 text-start font-semibold ${
                          i === 1 ? 'text-gold' : ''
                        }`}
                      >
                        {hdr[locale] || hdr.en}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {guide.comparisonTable.rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-surface' : 'bg-bg/40'}
                    >
                      <td className="p-3.5 md:p-4 font-bold text-ink whitespace-nowrap">
                        {row.feature[locale] || row.feature.en}
                      </td>
                      <td className="p-3.5 md:p-4 font-semibold text-gold-dark bg-gold-soft/30">
                        {row.privateTaxi[locale] || row.privateTaxi.en}
                      </td>
                      <td className="p-3.5 md:p-4 text-ink-muted">
                        {row.haramainTrain[locale] || row.haramainTrain.en}
                      </td>
                      <td className="p-3.5 md:p-4 text-ink-muted">
                        {row.saptcoBus[locale] || row.saptcoBus.en}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 5. AUTHORITATIVE LIVE PRICING CARD & CTA (POINT 5 & 8) */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border-2 border-gold-line shadow-xs mb-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-dark block mb-1">
                {locale === 'ar' ? 'الأسعار الرسمية المعتمدة' : 'Guaranteed Fixed Rates'}
              </span>
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink">
                {locale === 'ar' ? 'أسعار السيارات لهذا المسار' : 'Vehicle Rates for This Route'}
              </h2>
              <p className="text-xs text-ink-muted mt-1 font-light">
                {locale === 'ar'
                  ? 'السعر ثابت للمركبة بالكامل شامل السائق والوقود ورسوم الطرق والضرائب'
                  : 'Fixed rate per entire vehicle including chauffeur, fuel, road tolls, and taxes'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/${locale}/booking?route=${guide.routeId}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold hover:bg-gold-dark text-ink font-bold text-sm shadow-xs transition-colors"
              >
                <span>{locale === 'ar' ? 'احجز هذا المسار الآن' : 'Book This Route'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{locale === 'ar' ? 'تأكيد عبر واتساب' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-bg border border-border text-center">
              <span className="text-xs font-semibold text-ink-muted block">
                {locale === 'ar' ? 'تويوتا كامري' : 'Camry Sedan'}
              </span>
              <span className="text-xs text-ink-muted block mb-1">
                {locale === 'ar' ? 'حتى 3 ركاب' : 'Up to 3 pax'}
              </span>
              <span className="text-xl font-bold text-ink">
                {routePrices.camry} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gold-soft/40 border-2 border-gold-line text-center relative">
              <span className="absolute -top-2.5 right-2 rtl:right-auto rtl:left-2 text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-gold text-ink">
                VIP
              </span>
              <span className="text-xs font-semibold text-ink block">
                {locale === 'ar' ? 'هيونداي ستاريا' : 'Staria VIP'}
              </span>
              <span className="text-xs text-ink-muted block mb-1">
                {locale === 'ar' ? 'حتى 7 ركاب' : 'Up to 7 pax'}
              </span>
              <span className="text-xl font-bold text-gold-dark">
                {routePrices.staria} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-border text-center">
              <span className="text-xs font-semibold text-ink-muted block">
                {locale === 'ar' ? 'يوكون XL' : 'Yukon XL'}
              </span>
              <span className="text-xs text-ink-muted block mb-1">
                {locale === 'ar' ? 'حتى 7 VIP' : 'Up to 7 VIP'}
              </span>
              <span className="text-xl font-bold text-ink">
                {routePrices.yukon} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-border text-center">
              <span className="text-xs font-semibold text-ink-muted block">
                {locale === 'ar' ? 'تويوتا هايس' : 'HiAce Van'}
              </span>
              <span className="text-xs text-ink-muted block mb-1">
                {locale === 'ar' ? 'حتى 10 ركاب' : 'Up to 10 pax'}
              </span>
              <span className="text-xl font-bold text-ink">
                {routePrices.hiace} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>
          </div>
        </section>

        {/* DETAILED CONTENT SECTIONS */}
        <article className="space-y-8 mb-14">
          {guide.sections.map((sec, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs"
            >
              <h2 className="font-display font-bold text-lg md:text-xl text-ink mb-3">
                {sec.heading[locale] || sec.heading.en}
              </h2>
              <div className="text-sm md:text-base text-ink-light font-light leading-relaxed whitespace-pre-line">
                {sec.body[locale] || sec.body.en}
              </div>
              {sec.highlight && (
                <div className="mt-4 p-3.5 rounded-xl bg-gold-soft border border-gold-line text-xs md:text-sm font-medium text-ink flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>{sec.highlight[locale] || sec.highlight.en}</span>
                </div>
              )}
            </div>
          ))}
        </article>

        {/* 6. CONTEXTUAL FAQS (POINT 6) */}
        {guide.faqs && guide.faqs.length > 0 && (
          <section className="mb-14">
            <div className="mb-6">
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-gold-dark" />
                <span>{locale === 'ar' ? 'الأسئلة الشائعة حول هذا المسار' : 'Frequently Asked Questions'}</span>
              </h2>
            </div>

            <div className="space-y-4">
              {guide.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-surface rounded-2xl p-5 md:p-6 border border-border shadow-xs"
                >
                  <h3 className="font-display font-bold text-sm md:text-base text-ink mb-2">
                    {faq.q[locale] || faq.q.en}
                  </h3>
                  <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-light">
                    {faq.a[locale] || faq.a.en}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. RELATED ROUTES & ACTIONABLE NEXT STEPS */}
        <section className="p-6 md:p-8 bg-charcoal text-cream rounded-2xl border border-gold-dark/40 shadow-sm text-center">
          <h2 className="font-display font-bold text-xl md:text-2xl mb-2 text-gold">
            {locale === 'ar' ? 'جاهز لتنظيم رحلتك بأمان وراحة؟' : 'Ready to Experience Seamless Umrah Travel?'}
          </h2>
          <p className="text-xs md:text-sm text-cream/80 max-w-xl mx-auto mb-6 font-light">
            {locale === 'ar'
              ? 'احجز سيارتك الخاصة الآن بدون دفع مسبق مع تأكيد فوري عبر واتساب ومتابعة مباشرة لوصول رحلتك.'
              : 'Reserve your private chauffeur with zero prepayment, instant WhatsApp verification, and live flight radar tracking.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking?route=${guide.routeId}`}
              className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-dark text-ink font-bold text-sm shadow-xs transition-colors"
            >
              {locale === 'ar' ? 'الانتقال لنموذج الحجز' : 'Proceed to Booking'}
            </Link>
            <Link
              href={`/${locale}/guides`}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-cream font-bold text-sm border border-cream/20 transition-colors"
            >
              {locale === 'ar' ? 'العودة لجميع الأدلة' : 'Explore All Guides'}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
