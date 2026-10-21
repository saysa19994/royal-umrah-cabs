import React from 'react';
import { ZiyaratSite, ZiyaratTour } from '@/data/ziyarat';

interface ZiyaratSiteSchemaProps {
  site: ZiyaratSite;
  locale: string;
  url: string;
}

interface ZiyaratTourSchemaProps {
  tour: ZiyaratTour;
  locale: string;
  url: string;
}

export function ZiyaratSiteJsonLd({ site, locale, url }: ZiyaratSiteSchemaProps) {
  const isArabic = locale === 'ar';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: isArabic ? site.titleAr : site.titleEn,
    alternateName: isArabic ? site.titleEn : site.titleAr,
    description: isArabic ? site.metaDescAr : site.metaDescEn,
    url,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.lat,
      longitude: site.lng,
    },
    isAccessibleForFree: true,
    publicAccess: true,
    touristType: ['Pilgrims', 'Religious Tourists', 'Cultural Visitors'],
    provider: {
      '@type': 'LocalBusiness',
      name: 'Royal Umrah Cabs',
      telephone: '+966567588261',
      url: 'https://duyufalrahmanvip.com',
      areaServed: [
        { '@type': 'City', name: 'Makkah' },
        { '@type': 'City', name: 'Madinah' },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (isArabic ? site.faqsAr : site.faqsEn).map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isArabic ? 'الرئيسية' : 'Home',
        item: `https://duyufalrahmanvip.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isArabic ? 'المزارات والمعالم التاريخية' : 'Ziyarat Holy Sites',
        item: `https://duyufalrahmanvip.com/${locale}/ziyarat`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: site.city === 'makkah' ? (isArabic ? 'مكة المكرمة' : 'Makkah') : (isArabic ? 'المدينة المنورة' : 'Madinah'),
        item: `https://duyufalrahmanvip.com/${locale}/ziyarat/${site.city}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: isArabic ? site.titleAr : site.titleEn,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export function ZiyaratTourJsonLd({ tour, locale, url }: ZiyaratTourSchemaProps) {
  const isArabic = locale === 'ar';
  const itinerary = isArabic ? tour.itineraryAr : tour.itineraryEn;

  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: isArabic ? tour.titleAr : tour.titleEn,
    description: isArabic ? tour.metaDescAr : tour.metaDescEn,
    touristType: ['Pilgrims', 'Families', 'Umrah Travelers'],
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: itinerary.length,
      itemListElement: itinerary.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.stop,
        description: item.description,
      })),
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'SAR',
      price: tour.basePriceSAR.camry.toString(),
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: tour.basePriceSAR.camry.toString(),
        priceCurrency: 'SAR',
        valueAddedTaxIncluded: true,
      },
      description: isArabic
        ? 'سعر ثابت للسيارة بالكامل (سيدان كامري حتى 4 ركاب). شامل الوقود والانتظار والضرائب.'
        : 'Fixed fare per vehicle (Camry Executive up to 4 passengers). All tolls and wait time included.',
      availability: 'https://schema.org/InStock',
      url,
    },
    provider: {
      '@type': 'LocalBusiness',
      name: 'Royal Umrah Cabs',
      telephone: '+966567588261',
      url: 'https://duyufalrahmanvip.com',
      areaServed: [
        { '@type': 'City', name: 'Makkah' },
        { '@type': 'City', name: 'Madinah' },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (isArabic ? tour.faqsAr : tour.faqsEn).map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
