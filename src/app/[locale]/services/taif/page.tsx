import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, getLocalizedAlternates, LOCALES } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { TAIF_SERVICE_DATA } from '@/data/services-cities-data';
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Car,
  Compass,
  MessageCircle,
  Sparkles,
  Mountain,
} from 'lucide-react';

interface TaifServicePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(props: TaifServicePageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const content = TAIF_SERVICE_DATA[locale] || TAIF_SERVICE_DATA.en;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

  return {
    title: `${content.metaTitle}`,
    description: content.metaDescription,
    alternates: getLocalizedAlternates(locale, '/services/taif'),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `${baseUrl}/${locale}/services/taif`,
      siteName: 'Duyuf Alrahman VIP',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/assets/images/routes/makkah-to-taif.jpg`,
          width: 1200,
          height: 630,
          alt: content.heroTitle,
        },
      ],
    },
  };
}

export default async function TaifServicePage(props: TaifServicePageProps) {
  const { locale } = await props.params;
  const content = TAIF_SERVICE_DATA[locale] || TAIF_SERVICE_DATA.en;
  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

  const isAr = locale === 'ar';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${baseUrl}/${locale}/services/taif#service`,
        name: content.heroTitle,
        description: content.metaDescription,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Duyuf Alrahman VIP',
          url: baseUrl,
          telephone: '+966565451670',
        },
        areaServed: [
          { '@type': 'City', name: 'Taif' },
          { '@type': 'City', name: 'Al Hada' },
          { '@type': 'City', name: 'Makkah' },
          { '@type': 'City', name: 'Jeddah' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Taif VIP Chauffeur Routes',
          itemListElement: content.routes.map((r, idx) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: r.title,
              description: r.description,
            },
            price: r.priceFromSAR,
            priceCurrency: 'SAR',
            position: idx + 1,
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/${locale}/services/taif#faq`,
        mainEntity: content.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  const FLEET_SHOWCASE = [
    {
      name: 'Toyota Camry Executive',
      type: isAr ? 'سيدان تنفيذية' : 'Executive Sedan',
      pax: 4,
      bags: 3,
      img: '/assets/images/camry_exterior.webp',
      priceSAR: 350,
    },
    {
      name: 'Hyundai Staria VIP',
      type: isAr ? 'فان عائلي فاخر' : 'VIP Family Van',
      pax: 7,
      bags: 6,
      img: '/assets/images/staria_exterior.webp',
      priceSAR: 450,
    },
    {
      name: 'GMC Yukon XL VIP',
      type: isAr ? 'دفع رباعي فاره' : 'American Luxury SUV',
      pax: 7,
      bags: 8,
      img: '/assets/images/yukon_exterior.webp',
      priceSAR: 600,
    },
    {
      name: 'Toyota HiAce VIP',
      type: isAr ? 'حافلة صغيرة سقف عالي' : 'High-Roof Minibus',
      pax: 10,
      bags: 10,
      img: '/assets/images/hiace_exterior.webp',
      priceSAR: 550,
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-ink-muted flex items-center gap-2">
          <Link href={`/${locale}`} className="hover:text-gold-dark transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/services`} className="hover:text-gold-dark transition-colors">
            {dict.nav.services}
          </Link>
          <span>/</span>
          <span className="text-gold-dark font-semibold">
            {isAr ? 'الطائف والهدا' : 'Taif & Al Hada'}
          </span>
        </nav>

        {/* HERO SECTION */}
        <div className="relative rounded-3xl bg-surface border border-gold-line/70 p-8 md:p-14 shadow-sm mb-12 overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-4">
              <Mountain className="w-3.5 h-3.5 text-gold-dark" />
              <span>{content.heroBadge}</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight mb-4 leading-tight">
              {content.heroTitle}
            </h1>
            <p className="text-ink-muted text-sm sm:text-base md:text-lg leading-relaxed font-light mb-8">
              {content.heroSubtitle}
            </p>

            {/* TRUST PILLS */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-ink-light mb-8">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-alt border border-border">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'دفع كامل للسائق عند الوصول (0 عربون)' : '100% Pay-the-Driver (Zero Deposit)'}</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-alt border border-border">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'توقف مجدول في الميقات للإحرام' : 'Dedicated Miqat Stop Included'}</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-alt border border-border">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'سائقون متمرسون بالطرق الجبلية' : 'Mountain-Certified Drivers'}</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/booking?route=makkah-to-taif`}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gold text-slate-950 font-bold text-sm shadow-md hover:bg-gold-light transition-all"
              >
                <span>{content.ctaBtn}</span>
                <ArrowRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:rotate-180" />
              </Link>
              <a
                href="https://wa.me/966565451670"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-whatsapp hover:bg-whatsapp-hover text-white font-bold text-sm shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 mr-2 rtl:ml-2" />
                <span>{content.ctaSecondaryBtn}</span>
              </a>
            </div>
          </div>
        </div>

        {/* OVERVIEW CONTENT */}
        <div className="bg-surface rounded-2xl border border-border p-8 md:p-12 mb-16 shadow-xs">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-ink mb-6">
            {content.overviewTitle}
          </h2>
          <div className="space-y-4 text-ink-muted text-sm md:text-base leading-relaxed font-light">
            {content.overviewParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        </div>

        {/* VERIFIED ROUTES MATRIX */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
              {content.routesTitle}
            </h2>
            <p className="text-ink-muted text-sm mt-2 font-light">
              {content.routesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.routes.map((r) => (
              <div
                key={r.id}
                className="bg-surface rounded-2xl border border-border p-6 shadow-xs hover:border-gold-dark transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gold-soft text-gold-dark border border-gold-line">
                      {r.badge}
                    </span>
                    <span className="text-xs font-semibold text-ink-muted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold-dark" />
                      {r.duration}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-ink mb-2">
                    {r.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed font-light mb-6">
                    {r.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-ink-muted uppercase tracking-wider block font-semibold">
                      {isAr ? 'السعر يبدأ من' : 'Starting From'}
                    </span>
                    <span className="font-display font-extrabold text-gold-dark text-xl">
                      {r.priceFromSAR} SAR
                    </span>
                  </div>
                  <Link
                    href={`/${locale}/booking?route=${r.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gold text-slate-950 font-bold text-xs hover:bg-gold-light transition-all"
                  >
                    <span>{isAr ? 'احجز' : 'Book'}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 rtl:mr-1 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FLEET SHOWCASE */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
              {content.fleetTitle}
            </h2>
            <p className="text-ink-muted text-sm mt-2 font-light">
              {content.fleetSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FLEET_SHOWCASE.map((vehicle, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-2xl border border-border p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 w-full rounded-xl overflow-hidden mb-4 bg-bg-alt">
                    <Image
                      src={vehicle.img}
                      alt={vehicle.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark">
                    {vehicle.type}
                  </span>
                  <h3 className="font-display font-bold text-base text-ink mb-2">
                    {vehicle.name}
                  </h3>
                  <div className="text-xs text-ink-muted space-y-1 mb-4 font-light">
                    <div>• {vehicle.pax} {isAr ? 'ركاب كحد أقصى' : 'Max Passengers'}</div>
                    <div>• {vehicle.bags} {isAr ? 'حقائب أمتعة كبيرة' : 'Large Bags'}</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <span className="font-extrabold text-gold-dark text-base">
                    {vehicle.priceSAR} SAR
                  </span>
                  <Link
                    href={`/${locale}/booking?route=makkah-to-taif`}
                    className="text-xs font-bold text-gold-dark hover:underline"
                  >
                    {isAr ? 'احجز الآن' : 'Select'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES GRID */}
        <div className="bg-surface rounded-2xl border border-border p-8 md:p-12 mb-16 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
              {content.featuresTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.features.map((feat, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-gold-soft border border-gold-line text-gold-dark flex items-center justify-center font-bold">
                  ✓
                </div>
                <h3 className="font-display font-bold text-base text-ink">
                  {feat.title}
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed font-light">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQS SECTION */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
              {content.faqsTitle}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {content.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-xl border border-border p-6 shadow-xs"
              >
                <h3 className="font-display font-bold text-base text-ink mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA BANNER */}
        <div className="rounded-3xl bg-surface border border-gold-line p-8 md:p-12 text-center max-w-3xl mx-auto shadow-sm">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
            {content.ctaTitle}
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted font-light mb-8 max-w-xl mx-auto">
            {content.ctaSubtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking?route=makkah-to-taif`}
              className="px-8 py-3.5 rounded-xl bg-gold text-slate-950 font-bold text-sm shadow-md hover:bg-gold-light transition-all"
            >
              {content.ctaBtn}
            </Link>
            <Link
              href={`/${locale}/routes/makkah-to-taif`}
              className="px-6 py-3.5 rounded-xl bg-bg-alt text-ink font-semibold text-sm border border-border hover:border-gold transition-all"
            >
              {isAr ? 'تفاصيل مسار مكة - الطائف' : 'View Makkah-Taif Route Details'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
