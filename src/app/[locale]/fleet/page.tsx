import React from 'react';
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
  en: 'Explore our luxury modern private Umrah fleet: Mercedes-Maybach, GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce, and Toyota Coaster. 100% Cash on arrival.',
  ar: 'استكشف أسطولنا الملكي الفاخر لنقل ضيوف الرحمن: مرسيدس مايباخ، جي إم سي يوكون، هيونداي ستاريا، كامري، وتويوتا هايس وكوستر. الدفع نقداً عند الوصول.',
  ms: 'Terokai armada mewah moden kami untuk Umrah: Mercedes-Maybach, GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce, dan Coaster. Bayar tunai semasa tiba.',
  id: 'Jelajahi armada mewah privat kami untuk Umrah: Mercedes-Maybach, GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce, dan Coaster. Bayar tunai saat tiba.',
  ur: 'عمرہ زائرین کے لیے ہمارا شاہی لگژری بیڑا دریافت کریں: مرسڈیز میباخ، جی ایم سی یوکون، ہیونڈائی اسٹاریا، ٹویوٹا کیمری، ہائی ایس اور کوسٹر۔',
  fr: 'Découvrez notre flotte privée de luxe pour la Omra : Mercedes-Maybach, GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce et Coaster. Paiement à l\'arrivée.',
  es: 'Descubra nuestra flota privada de lujo para Umrah: Mercedes-Maybach, GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce y Coaster. Pago a la llegada.',
  de: 'Entdecken Sie unsere luxuriöse Privatflotte für die Umrah: Mercedes-Maybach, GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce und Coaster. Barzahlung bei Ankunft.',
  hi: 'उमरा के लिए हमारे निजी लक्जरी बेड़े का अन्वेषण करें: मर्सिडीज-मेबैक, जीएमसी युकोन, हुंडई स्टारिया, टोयोटा कैमरी, हाईऐस और कोस्टर। आगमन पर नकद भुगतान।',
  tr: 'Umre için lüks özel araç filomuzu keşfedin: Mercedes-Maybach, GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce ve Coaster. Varışta nakit ödeme.',
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
  const vehicles = await getDbVehiclesCached();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const isAr = locale === 'ar';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : 'Home',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isAr ? 'أسطولنا الملكي' : 'Our Fleet',
        item: `${baseUrl}/${locale}/fleet`,
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isAr ? 'أسطول ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP Fleet Collection',
    itemListElement: vehicles.map((v, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: v.name[locale] || v.name.en,
        description: v.desc[locale] || v.desc.en,
        image: `${baseUrl}${v.gallery?.[0]?.src || `/assets/images/vehicles/${v.slug}/exterior-studio.webp`}`,
        url: `${baseUrl}/${locale}/fleet/${v.slug}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'SAR',
          price: v.startingPriceSAR,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#F7F5F0]">
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
