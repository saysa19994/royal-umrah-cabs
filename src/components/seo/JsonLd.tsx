import React from 'react';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

interface JsonLdProps {
  locale: Locale;
  dict: Dictionary;
}

export function JsonLd({ locale, dict }: JsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app';

  // 1. TaxiService / LocalBusiness Schema
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    '@id': `${baseUrl}/#taxiservice`,
    name: dict.meta.brand,
    alternateName: [
      'Royal Umrah Cabs',
      'رويال كاب للعمرة',
      'Teksi Umrah Jeddah Makkah',
    ],
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/assets/images/staria_exterior.jpg`,
    image: `${baseUrl}/assets/images/staria_exterior.jpg`,
    description: dict.meta.seoDescription,
    telephone: '+966567588261',
    email: 'dispatch@royalumrahcabs.com',
    priceRange: '$$',
    currenciesAccepted: 'SAR, MYR, USD, EUR, GBP, EGP',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
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
      },
      {
        '@type': 'City',
        name: 'Madinah',
      },
      {
        '@type': 'City',
        name: 'Jeddah',
      },
      {
        '@type': 'City',
        name: 'Riyadh',
      },
      {
        '@type': 'Country',
        name: 'Malaysia',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '12480',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Private Umrah Chauffeur Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Jeddah Airport (KAIA) to Makkah Hotel Taxi',
            description: 'Private airport transfer with flight tracking and 60 minutes complimentary waiting.',
          },
          price: '200',
          priceCurrency: 'SAR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Makkah to Madinah VIP Chauffeur Transfer',
            description: 'Highway transfer via Hijrah Expressway with optional prayer and rest stops.',
          },
          price: '450',
          priceCurrency: 'SAR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Madinah to Makkah with Miqat Bir Ali Stop',
            description: 'Blessed transfer including dedicated stop at Masjid Miqat Bir Ali for Ihram.',
          },
          price: '450',
          priceCurrency: 'SAR',
        },
      ],
    },
  };

  // 2. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: dict.faq.q1,
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faq.a1,
        },
      },
      {
        '@type': 'Question',
        name: dict.faq.q2,
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faq.a2,
        },
      },
      {
        '@type': 'Question',
        name: dict.faq.q3,
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faq.a3,
        },
      },
      {
        '@type': 'Question',
        name: dict.faq.q4,
        acceptedAnswer: {
          '@type': 'Answer',
          text: dict.faq.a4,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
