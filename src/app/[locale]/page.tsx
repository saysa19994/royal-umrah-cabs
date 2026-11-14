import React from 'react';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { HomepageFaqJsonLd } from '@/components/seo/JsonLd';
import { getDbVehiclesCached } from '@/lib/fleet-db';
import { SaudiHospitalityHomepage } from '@/components/home/SaudiHospitalityHomepage';

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  const { locale } = params;

  const dict = getDictionary(locale);
  const [settings, vehicles] = await Promise.all([
    getSiteSettings(),
    getDbVehiclesCached(),
  ]);

  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-[#F7F5F0] text-[#101827]">
      <HomepageFaqJsonLd dict={dict} />
      <SaudiHospitalityHomepage
        locale={locale}
        dict={dict}
        settings={settings}
        vehicles={vehicles}
      />
    </div>
  );
}
