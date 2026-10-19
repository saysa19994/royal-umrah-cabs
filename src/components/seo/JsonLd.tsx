import React from 'react';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';

interface JsonLdProps {
  locale: Locale;
  dict: Dictionary;
  settings?: SiteSettings;
  includeFaq?: boolean;
}

export function JsonLd({ locale, dict, settings, includeFaq = false }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app';

  // 1. TaxiService / LocalBusiness Schema
  const businessSchema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    '@id': `${baseUrl}/#taxiservice`,
    name: dict.meta.brand,
    alternateName: [
      'Royal Umrah Cabs',
      'رويال كاب للعمرة',
      'Teksi Umrah VIP Jeddah Makkah',
    ],
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/assets/images/og-image.jpg`,
    description: dict.meta.seoDescription,
    telephone: settings?.phone || '+966567588261',
    email: settings?.email || 'info@royalumrahcabs.com',
    priceRange: '$$',
    currenciesAccepted: 'SAR, USD, EUR, GBP, MYR, IDR, INR, PKR, EGP',
    paymentAccepted: 'Cash, Pay Upon Arrival, Bank Transfer',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.4225,
      longitude: 39.8262,
    },
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
    areaServed: [
      {
        '@type': 'City',
        name: 'Makkah',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 21.4225,
          longitude: 39.8262,
        },
      },
      {
        '@type': 'City',
        name: 'Madinah',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 24.4672,
          longitude: 39.6111,
        },
      },
      {
        '@type': 'City',
        name: 'Jeddah',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 21.5433,
          longitude: 39.1728,
        },
      },
    ],
  };

  // Only include aggregateRating if real verified reviews exist in site_settings
  if (settings && settings.google_reviews_count > 0 && settings.google_reviews_rating > 0) {
    businessSchema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: settings.google_reviews_rating.toFixed(1),
      reviewCount: settings.google_reviews_count.toString(),
      bestRating: '5',
      worstRating: '1',
    };
  }

  // 2. FAQPage Schema (All 12 localized questions)
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

  // 3. BreadcrumbList Schema
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
      {includeFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }}
      />
    </>
  );
}

export function HomepageFaqJsonLd({ dict }: { dict: Dictionary }) {
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
