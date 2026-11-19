import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { HomepageFaqJsonLd } from '@/components/seo/JsonLd';
import SignatureFusionHomepage from '@/components/fusion/SignatureFusionHomepage';
import { getDbPricesCached } from '@/lib/pricing-db';
import { getSiteSettings } from '@/lib/settings';
import { getSiteImagesCached } from '@/lib/site-images';
import { getHomeCopyOverridesCached } from '@/lib/home-copy';
import { getDbVehiclesCached } from '@/lib/fleet-db';
import { APPROVED_5_FLEET } from '@/data/approved-fleet-homepage';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [rates, settings, siteImages, activeVehicles, homeCopy] = await Promise.all([
    getDbPricesCached(), getSiteSettings(), getSiteImagesCached(), getDbVehiclesCached(), getHomeCopyOverridesCached(locale),
  ]);
  const curatedFleet = APPROVED_5_FLEET.filter(item =>
    activeVehicles.some(vehicle => vehicle.bookingVehicleId === ({'toyota-camry':'camry','hyundai-staria':'staria','gmc-yukon-xl':'yukon','toyota-hiace':'hiace','toyota-coaster':'coaster'} as Record<string,string>)[item.slug])
  ).map(item => {
    const id = ({'toyota-camry':'camry','hyundai-staria':'staria','gmc-yukon-xl':'yukon','toyota-hiace':'hiace','toyota-coaster':'coaster'} as Record<string,string>)[item.slug];
    const vehicle = activeVehicles.find(v=>v.bookingVehicleId===id);
    return {
      ...item,
      passengers: vehicle?.passengers ?? item.passengers,
      luggage: vehicle?.luggage ?? item.luggage,
      name: vehicle?.name ?? item.name,
      exteriorImage: vehicle?.gallery.find(v=>v.type==='exterior')?.src ?? item.exteriorImage,
      interiorImage: vehicle?.gallery.find(v=>v.type==='interior')?.src ?? item.interiorImage,
    };
  });
  return (
    <>
      <HomepageFaqJsonLd dict={dict} />
      <SignatureFusionHomepage
        locale={locale}
        rates={rates}
        siteImages={siteImages}
        homeCopy={homeCopy}
        fleetVehicles={curatedFleet.length ? curatedFleet : APPROVED_5_FLEET}
        dict={dict}
        regions={{ taif: settings.taif_enabled, riyadh: settings.riyadh_enabled }}
        policies={{
          airportWaiting: settings.airport_waiting_minutes,
          freeCancellation: settings.free_cancellation_hours,
        }}
      />
    </>
  );
}
