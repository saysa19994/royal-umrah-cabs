import type { Locale } from '@/i18n/config';
import Link from 'next/link';
import { getDictionary } from '@/i18n/get-dictionary';
import { HomepageFaqJsonLd } from '@/components/seo/JsonLd';
import SignatureFusionHomepage from '@/components/fusion/SignatureFusionHomepage';
import { getDbPricesCached } from '@/lib/pricing-db';
import { getSiteSettings } from '@/lib/settings';
import { getSiteImagesCached } from '@/lib/site-images';
import { getHomeCopyOverridesCached } from '@/lib/home-copy';
import { getDbVehiclesCached } from '@/lib/fleet-db';
import { APPROVED_5_FLEET } from '@/data/approved-fleet-homepage';

const UNAVAILABLE_FLEET_COPY: Record<Locale,string> = {
  ar: 'لا تتوفر مركبات للحجز المباشر الآن. تواصل معنا لترتيب رحلتك الخاصة.',
  en: 'No vehicles are currently available for direct booking. Contact our team for an individual arrangement.',
  ms: 'Tiada kenderaan tersedia untuk tempahan terus buat masa ini. Hubungi pasukan kami untuk aturan perjalanan peribadi.',
  id: 'Saat ini tidak ada kendaraan untuk pemesanan langsung. Hubungi tim kami untuk pengaturan perjalanan pribadi.',
  ur: 'فی الحال براہ راست بکنگ کے لیے کوئی گاڑی دستیاب نہیں۔ نجی سفر کے انتظام کے لیے ہم سے رابطہ کریں۔',
  fr: 'Aucun véhicule n’est actuellement disponible à la réservation directe. Contactez notre équipe pour organiser votre trajet.',
  es: 'Actualmente no hay vehículos disponibles para reserva directa. Contacte con nuestro equipo para organizar su traslado.',
  de: 'Derzeit sind keine Fahrzeuge für eine direkte Buchung verfügbar. Kontaktieren Sie unser Team für eine individuelle Fahrt.',
  tr: 'Şu anda doğrudan rezervasyona açık araç bulunmuyor. Özel yolculuk düzenlemesi için ekibimizle iletişime geçin.',
  hi: 'इस समय सीधे बुकिंग के लिए कोई वाहन उपलब्ध नहीं है। अपनी निजी यात्रा की व्यवस्था हेतु हमारी टीम से संपर्क करें।',
};

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
  // Do not show static booked vehicles when all direct-booking cars are disabled.
  if(!curatedFleet.length) return <>
    <HomepageFaqJsonLd dict={dict} />
    <main className="relative min-h-[75vh] overflow-hidden bg-[#092b37] px-5 py-28 text-center text-white">
      <video className="absolute inset-0 h-full w-full object-cover opacity-40" autoPlay muted playsInline loop
        poster={siteImages.hero_poster}><source src="/assets/homepage-v2/hero.mp4" type="video/mp4"/></video>
      <div className="relative z-10 mx-auto max-w-2xl">
        <h1 className="text-4xl font-semibold">{dict.meta.brand}</h1>
        <p className="mt-6 text-lg">{UNAVAILABLE_FLEET_COPY[locale]}</p>
        <Link className="mt-9 inline-block rounded-lg bg-white px-7 py-3 font-bold text-[#092b37]" href={`/${locale}/contact`}>{dict.nav.contact}</Link>
      </div>
    </main>
  </>;
  return (
    <>
      <HomepageFaqJsonLd dict={dict} />
      <SignatureFusionHomepage
        locale={locale}
        rates={rates}
        siteImages={siteImages}
        homeCopy={homeCopy}
        fleetVehicles={curatedFleet}
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
