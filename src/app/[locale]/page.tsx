import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { HomepageFaqJsonLd } from '@/components/seo/JsonLd';
import SignatureFusionHomepage from '@/components/fusion/SignatureFusionHomepage';
import { getDbPricesCached } from '@/lib/pricing-db';
import { getSiteSettings } from '@/lib/settings';
import { getPublishedRouteStatusCached } from '@/lib/public-route-availability';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [rates, settings, routeStatus] = await Promise.all([getDbPricesCached(), getSiteSettings(), getPublishedRouteStatusCached()]);
  return (
    <>
      <HomepageFaqJsonLd dict={dict} />
      <SignatureFusionHomepage
        locale={locale}
        rates={rates}
        routeStatus={routeStatus}
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
