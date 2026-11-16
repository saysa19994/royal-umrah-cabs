import React from 'react';
import './fleet-editorial.css';
import type { Metadata } from 'next';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { FleetCatalog } from '@/components/fleet/FleetCatalog';
import { getDbVehiclesCached } from '@/lib/fleet-db';

interface FleetPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const LOCALIZED_DESCRIPTIONS: Record<Locale, string> = {
  en: 'Explore our luxury modern private Umrah fleet: GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce, Toyota Coaster, and VIP Concierge Mercedes-Maybach & Hyundai H1. Cash paid to driver after journey completion.',
  ar: 'استكشف أسطولنا الملكي الفاخر لنقل ضيوف الرحمن: جي إم سي يوكون، هيونداي ستاريا، كامري، تويوتا هايس وكوستر، مع مرسيدس مايباخ وهيونداي H1 عبر الكونسيرج. الدفع نقداً للسائق بعد إتمام الرحلة.',
  ms: 'Terokai armada mewah moden kami untuk Umrah: GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce, dan Coaster. Bayar tunai kepada pemandu selepas selesai perjalanan.',
  id: 'Jelajahi armada mewah privat kami untuk Umrah: GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce, dan Coaster. Bayar tunai ke sopir setelah perjalanan selesai.',
  ur: 'عمرہ زائرین کے لیے ہمارا شاہی لگژری بیڑا دریافت کریں: جی ایم سی یوکون، ہیونڈائی اسٹاریا، ٹویوٹا کیمری، ہائی ایس اور کوسٹر۔ سفر مکمل ہونے پر ڈرائیور کو نقد ادائیگی۔',
  fr: 'Découvrez notre flotte privée de luxe pour la Omra : GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce et Coaster. Paiement en espèces au chauffeur après le trajet.',
  es: 'Descubra nuestra flota privada de lujo para Umrah: GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce y Coaster. Pago en efectivo al chofer al finalizar el viaje.',
  de: 'Entdecken Sie unsere luxuriöse Privatflotte für die Umrah: GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce und Coaster. Barzahlung beim Fahrer nach Fahrtende.',
  hi: 'उमरा के लिए हमारे निजी लक्जरी बेड़े का अन्वेषण करें: जीएमसी युकोन, हुंडई स्टारिया, टोयोटा कैमरी, हाईऐस और कोस्टर। यात्रा पूरी होने के बाद ड्राइवर को नकद भुगतान।',
  tr: 'Umre için lüks özel araç filomuzu keşfedin: GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce ve Coaster. Yolculuk tamamlandığında şoföre nakit ödeme.',
};

export async function generateMetadata(props: FleetPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);

  return {
    title: `${dict.nav.fleet} | Duyuf Alrahman VIP`,
    description: LOCALIZED_DESCRIPTIONS[locale] || LOCALIZED_DESCRIPTIONS.en,
    alternates: getLocalizedAlternates(locale, '/fleet'),
  };
}

export default async function FleetPage(props: FleetPageProps) {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const vehicles = await getDbVehiclesCached();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: dict.nav.home,
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: dict.nav.fleet,
        item: `${baseUrl}/${locale}/fleet`,
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${dict.nav.fleet} — Duyuf Alrahman VIP`,
    itemListElement: vehicles.map((v, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Service',
        serviceType: 'Private driver transportation',
        name: v.name[locale] || v.name.en,
        description: v.desc[locale] || v.desc.en,
        image: `${baseUrl}${v.gallery?.[0]?.src || `/assets/images/vehicles/${v.slug}/exterior-studio.webp`}`,
        url: `${baseUrl}/${locale}/fleet/${v.slug}`,
        provider: { '@type': 'TravelAgency', name: 'Duyuf Al Rahman VIP', url: baseUrl },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-bg text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema).replace(/</g, '\\u003c') }}
      />
      <FleetCatalog vehicles={vehicles} locale={locale} />
    </main>
  );
}
