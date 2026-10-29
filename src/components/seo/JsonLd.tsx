import React from 'react';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { AUTHORITATIVE_TRANSFER_RATES } from '@/lib/pricing-constants';

interface JsonLdProps {
  locale: Locale;
  dict: Dictionary;
  settings?: SiteSettings;
  includeFaq?: boolean;
  includeBreadcrumbs?: boolean;
}

export function JsonLd({
  locale,
  dict,
  settings,
  includeFaq = false,
  includeBreadcrumbs = false,
}: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

  // 1. Single Authoritative TravelAgency Entity Schema (No storefront geo coordinates falsely placed at the Holy Mosque)
  const businessSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${baseUrl}/#organization`,
    name: dict.meta.brand || 'Duyuf Al Rahman VIP',
    alternateName: [
      'Duyuf Alrahman VIP',
      'ضيوف الرحمن VIP',
      'Duyuf Al-Rahman VIP',
    ],
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/assets/images/og-image.jpg`,
    description: dict.meta.seoDescription,
    telephone: settings?.phone || '+966567588261',
    email: settings?.email || 'info@duyufalrahmanvip.com',
    priceRange: '$',
    currenciesAccepted: 'SAR, USD',
    paymentAccepted: 'Cash upon arrival (SAR, USD)',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+966567588261',
        contactType: 'customer service',
        contactOption: 'WhatsApp',
        availableLanguage: [
          'Arabic',
          'English',
          'Malay',
          'Indonesian',
          'Urdu',
          'French',
          'Spanish',
          'German',
          'Turkish',
          'Hindi',
        ],
      },
      {
        '@type': 'ContactPoint',
        telephone: settings?.phone || '+966505316971',
        contactType: 'reservations',
        contactOption: 'WhatsApp',
        availableLanguage: ['Arabic', 'English', 'Urdu'],
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Makkah' },
      { '@type': 'City', name: 'Madinah' },
      { '@type': 'City', name: 'Jeddah' },
      { '@type': 'City', name: 'Taif' },
      { '@type': 'City', name: 'Riyadh' },
    ],
  };

  // 2. WebSite Schema linking to Organization
  const websiteSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Duyuf Al Rahman VIP',
    alternateName: 'ضيوف الرحمن VIP',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: ['ar', 'en', 'ms', 'id', 'ur', 'fr', 'es', 'de', 'tr', 'hi'],
  };

  // 3. FAQPage Schema (All 12 localized questions)
  const faqList = [
    { q: dict.faq.q1, a: dict.faq.a1 },
    { q: dict.faq.q2, a: dict.faq.a2 },
    { q: dict.faq.q3, a: dict.faq.a3 },
    { q: dict.faq.q4, a: dict.faq.a4 },
    { q: dict.faq.q5, a: dict.faq.a5 },
    { q: dict.faq.q6, a: dict.faq.a6 },
    { q: dict.faq.q7, a: dict.faq.a7 },
    { q: dict.faq.q8, a: dict.faq.a8 },
    { q: dict.faq.q9, a: dict.faq.a9 },
    { q: dict.faq.q10, a: dict.faq.a10 },
    { q: dict.faq.q11, a: dict.faq.a11 },
    { q: dict.faq.q12, a: dict.faq.a12 },
  ].filter((item) => Boolean(item.q && item.a));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  // 4. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: dict.nav.routes || 'Routes',
        item: `${baseUrl}/${locale}/routes`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: dict.nav.fleet || 'Fleet',
        item: `${baseUrl}/${locale}/fleet`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: dict.nav.pricing || 'Pricing',
        item: `${baseUrl}/${locale}/pricing`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: dict.nav.bookNow || 'Booking',
        item: `${baseUrl}/${locale}/booking`,
      },
    ],
  };

  function safeJsonLd(data: unknown): string {
    return JSON.stringify(data).replace(/</g, '\\u003c');
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
      />
      {includeBreadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
        />
      )}
      {includeFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
        />
      )}
    </>
  );
}

export const HomepageFaqJsonLd = FaqJsonLd;
export function FaqJsonLd({ dict }: { dict: Dictionary }) {
  const faqList = [
    { q: dict.faq.q1, a: dict.faq.a1 },
    { q: dict.faq.q2, a: dict.faq.a2 },
    { q: dict.faq.q3, a: dict.faq.a3 },
    { q: dict.faq.q4, a: dict.faq.a4 },
    { q: dict.faq.q5, a: dict.faq.a5 },
    { q: dict.faq.q6, a: dict.faq.a6 },
    { q: dict.faq.q7, a: dict.faq.a7 },
    { q: dict.faq.q8, a: dict.faq.a8 },
    { q: dict.faq.q9, a: dict.faq.a9 },
    { q: dict.faq.q10, a: dict.faq.a10 },
    { q: dict.faq.q11, a: dict.faq.a11 },
    { q: dict.faq.q12, a: dict.faq.a12 },
  ].filter((item) => Boolean(item.q && item.a));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
      }}
    />
  );
}

export function RoutePageJsonLd({
  route,
  locale,
  minPriceSAR,
  localizedContent,
}: {
  route: any;
  locale: Locale;
  minPriceSAR: number;
  localizedContent?: {
    seoTitle?: string;
    seoDescription?: string;
    h1?: string;
    faqs?: { question: string; answer: string }[];
  };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const isAr = locale === 'ar';
  const title = localizedContent?.h1 || (isAr ? route.titleAr : route.titleEn);
  const desc = localizedContent?.seoDescription || (isAr ? route.descriptionAr : route.descriptionEn);
  const pageUrl = `${baseUrl}/${locale}/routes/${route.id}`;

  const homeLabel = locale === 'ar' ? 'الرئيسية' : locale === 'ur' ? 'صفحۂ اول' : (locale === 'id' || locale === 'ms') ? 'Beranda' : locale === 'tr' ? 'Ana Sayfa' : locale === 'fr' ? 'Accueil' : locale === 'es' ? 'Inicio' : locale === 'de' ? 'Startseite' : locale === 'hi' ? 'होम' : 'Home';
  const routesLabel = locale === 'ar' ? 'المسارات' : locale === 'ur' ? 'راستے' : (locale === 'id' || locale === 'ms') ? 'Rute' : locale === 'tr' ? 'Güzergahlar' : locale === 'fr' ? 'Itinéraires' : locale === 'es' ? 'Rutas' : locale === 'de' ? 'Routen' : locale === 'hi' ? 'रूट्स' : 'Routes';

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: routesLabel,
        item: `${baseUrl}/${locale}/routes`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: pageUrl,
      },
    ],
  };

  const faqItems = localizedContent?.faqs && localizedContent.faqs.length > 0
    ? localizedContent.faqs
    : (route.faqs || []).map((f: any) => ({
        question: isAr ? f.questionAr : f.question,
        answer: isAr ? f.answerAr : f.answer,
      }));

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((f: any) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  // Service Schema (accurately represents passenger transportation service, not physical eCommerce product)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: title,
    description: desc,
    serviceType: 'Private Chauffeur Airport & Intercity Transfer',
    provider: {
      '@type': 'TravelAgency',
      '@id': `${baseUrl}/#organization`,
      name: 'Duyuf Al Rahman VIP',
      url: baseUrl,
      telephone: '+966567588261',
      priceRange: '$',
      image: `${baseUrl}/assets/images/og-image.jpg`,
    },
    areaServed: [
      { '@type': 'City', name: 'Jeddah' },
      { '@type': 'City', name: 'Makkah' },
      { '@type': 'City', name: 'Madinah' },
      ...(route.id?.includes('taif') ? [{ '@type': 'City', name: 'Taif' }] : []),
      ...(route.id?.includes('riyadh') ? [{ '@type': 'City', name: 'Riyadh' }] : []),
    ],
    offers: (() => {
      const routeFares = AUTHORITATIVE_TRANSFER_RATES[route.id]
        ? Object.values(AUTHORITATIVE_TRANSFER_RATES[route.id])
        : [minPriceSAR || 200];
      const lowPrice = Math.min(...routeFares);
      const highPrice = Math.max(...routeFares);
      const offerCount = routeFares.length;

      return {
        '@type': 'AggregateOffer',
        lowPrice,
        highPrice,
        offerCount,
        priceCurrency: 'SAR',
        availability: 'https://schema.org/InStock',
        url: pageUrl,
      };
    })(),
  };

  function safeJsonLd(data: unknown): string {
    return JSON.stringify(data).replace(/</g, '\\u003c');
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(serviceSchema) }}
      />
    </>
  );
}
