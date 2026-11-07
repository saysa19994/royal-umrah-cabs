import React from 'react';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { HomepageFaqJsonLd } from '@/components/seo/JsonLd';
import { getDbVehiclesCached } from '@/lib/fleet-db';
import { RoyalHomepageExperience } from '@/components/home/RoyalHomepageExperience';

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  const { locale } = params;

  const dict = getDictionary(locale);
  const settings = await getSiteSettings();
  const vehicles = await getDbVehiclesCached();

  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-[#090D15]">
      <HomepageFaqJsonLd dict={dict} />
      <RoyalHomepageExperience
        locale={locale}
        dict={dict}
        settings={settings}
        vehicles={vehicles}
      />
    </div>
  );
}

