import React from 'react';
import type { Metadata } from 'next';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { FleetSection } from '@/components/home/FleetSection';
import { getDbVehiclesCached } from '@/lib/fleet-db';

interface FleetPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: FleetPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);

  return {
    title: dict.nav.fleet,
    description:
      locale === 'ar'
        ? 'استكشف أسطولنا الملكي الفاخر لنقل ضيوف الرحمن: مرسيدس مايباخ، جي إم سي يوكون، هيونداي ستاريا، كامري، وتويوتا هايس وكوستر.'
        : 'Explore our luxury modern private Umrah fleet: Mercedes-Maybach, GMC Yukon XL, Hyundai Staria, Toyota Camry, Toyota HiAce, and Coaster.',
    alternates: getLocalizedAlternates(locale, '/fleet'),
  };
}

export default async function FleetPage(props: FleetPageProps) {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const vehicles = await getDbVehiclesCached();

  return (
    <main className="min-h-screen bg-[#0B0A0E] pt-20">
      <FleetSection locale={locale} dict={dict} vehicles={vehicles} />
    </main>
  );
}
