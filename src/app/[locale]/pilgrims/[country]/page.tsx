import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale } from '@/i18n/config';
import { PILGRIM_COUNTRIES } from '@/data/pilgrims';
import { Plane, MapPin, Clock, ShieldCheck, Check, ArrowRight, Car, Users, Luggage, MessageCircle, CreditCard, HelpCircle } from 'lucide-react';

interface PilgrimCountryPageProps {
  params: Promise<{
    locale: Locale;
    country: string;
  }>;
}

export function generateStaticParams() {
  return Object.values(PILGRIM_COUNTRIES).map((c) => ({
    country: c.slug,
  }));
}

export async function generateMetadata(props: PilgrimCountryPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale,
    country
  } = params;

  const c = PILGRIM_COUNTRIES[country];
  if (!c) return {};
  if (country === 'greece' && locale !== 'en') {
    return { robots: { index: false, follow: false } };
  }
  const isMatchLocale = locale === c.primaryLanguage;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

  return {
    title: isMatchLocale ? c.titleNative : c.titleEn,
    description: isMatchLocale ? c.metaDescNative : c.metaDescEn,
    alternates: {
      canonical: `${baseUrl}/${locale}/pilgrims/${country}`,
    },
    ...(c.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function PilgrimCountryPage(props: PilgrimCountryPageProps) {
  const params = await props.params;

  const {
    locale,
    country
  } = params;

  const c = PILGRIM_COUNTRIES[country];
  if (!c || (country === 'greece' && locale !== 'en')) {
    notFound();
  }

  const isMatchLocale = locale === c.primaryLanguage;
  const isAr = locale === 'ar';
  const currentUrl = `https://duyufalrahmanvip.com/${locale}/pilgrims/${country}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isMatchLocale ? c.titleNative : c.titleEn,
    description: isMatchLocale ? c.metaDescNative : c.metaDescEn,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Royal Umrah Cabs',
      telephone: '+966567588261',
      url: 'https://duyufalrahmanvip.com',
      areaServed: [
        { '@type': 'Country', name: c.nameEn },
        { '@type': 'City', name: 'Jeddah' },
        { '@type': 'City', name: 'Makkah' },
        { '@type': 'City', name: 'Madinah' },
      ],
    },
    serviceType: 'Private Chauffeur Airport & Intercity Transport for Umrah Pilgrims',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'SAR',
      price: '200',
      description: 'Fixed rate door-to-door private chauffeur transfer from KAIA Jeddah to Makkah hotel.',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (isMatchLocale ? c.faqsNative : c.faqsEn).map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen text-start">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-ink-muted mb-6">
          <Link href={`/${locale}`} className="hover:text-gold-dark">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">
            {isMatchLocale ? c.nameNative : c.nameEn}
          </span>
        </div>

        {/* HERO TITLE */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-wider mb-4">
            <Plane className="w-3.5 h-3.5" />
            <span>
              {isMatchLocale
                ? `Jamaah & Pelancong ${c.nameNative}`
                : `Umrah Pilgrims from ${c.nameEn}`}
            </span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight mb-4">
            {isMatchLocale ? c.h1Native : c.h1En}
          </h1>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed font-light">
            {isMatchLocale ? c.introNative : c.introEn}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking`}
              className="h-12 px-8 rounded-btn bg-gold hover:bg-gold-hover hover:text-white text-ink text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-gold transition-all"
            >
              <Car className="w-4 h-4" />
              <span>{isMatchLocale ? 'Tempah Kereta Sekarang' : 'Book Your Chauffeur Now'}</span>
            </Link>
            <a
              href={`https://wa.me/966567588261?text=${encodeURIComponent(
                isMatchLocale
                  ? `Salam, saya jemaah dari ${c.nameNative}. Saya ingin bertanya tentang pengangkutan umrah peribadi.`
                  : `Hello, I am arriving from ${c.nameEn} and would like to inquire about private Umrah chauffeur transport.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-6 rounded-btn border border-border-strong text-ink hover:text-gold-dark text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-whatsapp" />
              <span>{isMatchLocale ? 'WhatsApp Rasmi' : 'Official WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* 1. FLIGHT HUBS & AIRLINES */}
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 mb-10 shadow-xs">
          <h2 className="font-display font-bold text-xl text-ink mb-4 flex items-center gap-2">
            <Plane className="w-5 h-5 text-gold-dark" />
            <span>
              {isMatchLocale
                ? `Lapangan Terbang Berlepas & Laluan Utama (${c.nameNative})`
                : `Key Departure Hubs & Airlines from ${c.nameEn}`}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <span className="font-bold text-ink block mb-2">
                {isMatchLocale ? 'Lapangan Terbang Berlepas:' : 'Departure Airports:'}
              </span>
              <ul className="space-y-1.5 text-ink-muted">
                {(isMatchLocale ? c.departureAirportsNative : c.departureAirportsEn).map((air, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-dark shrink-0" />
                    <span>{air}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-bold text-ink block mb-2">
                {isMatchLocale ? 'Syarikat Penerbangan Utama:' : 'Airlines Frequently Operating:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {c.airlinesEn.map((airl, i) => (
                  <span key={i} className="px-3 py-1 rounded-md bg-bg-alt border border-border text-ink-light">
                    {airl}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. RECOMMENDED VEHICLES */}
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 mb-10 shadow-xs">
          <h2 className="font-display font-bold text-xl text-ink mb-6">
            {isMatchLocale
              ? `Pilihan Kenderaan Disyorkan untuk Jemaah ${c.nameNative}`
              : `Recommended Fleet for Pilgrims from ${c.nameEn}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.recommendedVehicles.map((v, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-bg-alt/60 border border-border flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                    {v.groupType}
                  </span>
                  <h3 className="font-display font-bold text-base text-ink mb-2">{v.vehicleName}</h3>
                  <div className="flex items-center gap-4 text-xs text-ink-muted mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-gold-dark" />
                      <span>{v.seats} {isMatchLocale ? 'Tempat Duduk' : 'Seats'}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Luggage className="w-3.5 h-3.5 text-gold-dark" />
                      <span>{v.bags} {isMatchLocale ? 'Beg Bagasi' : 'Bags'}</span>
                    </span>
                  </div>
                  <p className="text-xs text-ink-light leading-relaxed font-light mb-4">
                    {isMatchLocale ? v.reasonNative : v.reasonEn}
                  </p>
                </div>
                <Link
                  href={`/${locale}/fleet/${v.vehicleSlug}`}
                  className="text-xs font-bold text-gold-dark hover:underline flex items-center gap-1"
                >
                  <span>{isMatchLocale ? 'Spesifikasi & Galeri' : 'Specs & Gallery'}</span>
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 3. LOCAL TRAVEL TIPS & PAYMENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs">
            <h3 className="font-display font-bold text-base text-ink mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-dark" />
              <span>{isMatchLocale ? 'Nasihat Penting Ketibaan' : 'Essential Arrival Advice'}</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-ink-light font-light">
              {(isMatchLocale ? c.localTravelTipsNative : c.localTravelTipsEn).map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface rounded-2xl border border-border p-6 shadow-xs">
            <h3 className="font-display font-bold text-base text-ink mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gold-dark" />
              <span>{isMatchLocale ? 'Mata Wang & Kaedah Bayaran' : 'Currency & Payment Terms'}</span>
            </h3>
            <p className="text-xs text-ink-light leading-relaxed font-light mb-4">
              {isMatchLocale ? c.paymentAndCurrencyNative : c.paymentAndCurrencyEn}
            </p>
            <div className="p-3.5 rounded-xl bg-gold-soft/30 border border-gold-line text-xs text-ink font-medium">
              <span>
                {isMatchLocale
                  ? `Mata wang tempatan anda: ${c.currencyCode} (${c.currencySymbol}) · Diterima bersama SAR.`
                  : `Your home currency: ${c.currencyCode} (${c.currencySymbol}) · Settle in SAR or Card.`}
              </span>
            </div>
          </div>
        </div>

        {/* 4. LINK TO ZIYARAT HUB */}
        <div className="bg-bg-alt rounded-2xl border border-border p-6 md:p-8 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-xl text-ink mb-1">
              {isMatchLocale
                ? 'Ingin Melawat Tempat Bersejarah (Ziarah)?'
                : 'Planning Historical Holy Site Visits (Ziyarat)?'}
            </h3>
            <p className="text-xs text-ink-muted font-light max-w-xl">
              {isMatchLocale
                ? 'Terokai Gua Hira, Jabal Tsur, Masjid Quba, dan Bukit Uhud dengan kereta persendirian bersama pemandu.'
                : 'Explore Cave Hira, Mount Thawr, Masjid Quba, and Mount Uhud with private family chauffeur tours.'}
            </p>
          </div>
          <Link
            href={`/${locale}/ziyarat`}
            className="h-11 px-6 rounded-btn bg-gold hover:bg-gold-hover hover:text-white text-ink text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 transition-colors shadow-xs"
          >
            <span>{isMatchLocale ? 'Lihat Pakej Ziarah' : 'Explore Ziyarat Tours'}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>

        {/* 5. COUNTRY FAQS */}
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 mb-10 shadow-xs">
          <h2 className="font-display font-bold text-xl text-ink mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-gold-dark" />
            <span>
              {isMatchLocale
                ? `Soalan Lazim Jemaah ${c.nameNative}`
                : `Frequently Asked Questions for ${c.nameEn} Pilgrims`}
            </span>
          </h2>
          <div className="space-y-4">
            {(isMatchLocale ? c.faqsNative : c.faqsEn).map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-bg-alt/50 border border-border">
                <h3 className="font-bold text-xs md:text-sm text-ink mb-1.5">{faq.q}</h3>
                <p className="text-xs text-ink-muted leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. GERMAN IMPRESSUM (IF REQUIRED) */}
        {c.impressumRequired && (
          <div className="p-6 rounded-2xl bg-surface border border-border text-xs text-ink-muted mb-10">
            <h4 className="font-bold text-ink mb-2">Impressum &amp; Rechtliche Angaben (für Pilger aus Deutschland)</h4>
            <p className="leading-relaxed font-light mb-2">
              Royal Umrah Cabs • Kingdom of Saudi Arabia • Chauffeur &amp; Ground Transportation Dispatch.
            </p>
            <p className="font-light">
              Kontakt: info@royalumrahcabs.com | WhatsApp: +966 56 758 8261. Vertreten durch die Geschäftsleitung.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
