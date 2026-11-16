import React from 'react';
import type { Metadata } from 'next';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { BookingEngine } from '@/components/booking/BookingEngine';
import { BookingWizard } from '@/components/booking/BookingWizard';
import { Spotlight } from '@/components/ui/luxury/Spotlight';
import { ShieldCheck, Plane, Banknote } from 'lucide-react';
import { getDbPricesCached } from '@/lib/pricing-db';
import { getBookingDraft } from '@/lib/booking-draft-store';

interface BookingPageProps {
  params: Promise<{
    locale: Locale;
  }>;
  searchParams: Promise<{
    draft?: string;
    route?: string;
    vehicle?: string;
    date?: string;
    time?: string;
    passengers?: string;
    luggage?: string;
    type?: string;
    duration?: string;
    pickup?: string;
    dropoff?: string;
  }>;
}

const PAGE_TEXT: Record<Locale, { badge: string; title: string; subtitle: string; trust1: string; trust2: string; trust3: string }> = {
  en: {
    badge: 'Direct VIP Chauffeur Reservation',
    title: 'Reserve Your Private Chauffeur',
    subtitle:
      'Guaranteed fixed fares. Cash paid to the driver after the journey is completed and the customer reaches the requested destination (SAR or USD) — zero advance payment or deposit required.',
    trust1: "Cash paid after the completed journey · No deposit",
    trust2: "24/7 flight tracking",
    trust3: "VAT, fuel, tolls & airport parking included",
  },
  ar: {
    badge: 'حجز مباشر لسائق VIP خاص',
    title: 'احجز رحلتك الخاصة وسائقك الشخصي',
    subtitle:
      'أسعار ثابتة ومحددة بدقة. الدفع نقداً مباشرة للسائق عند الوصول (بالريال السعودي أو الدولار الأمريكي) — لا يلزم أي دفع مسبق أو عربون.',
    trust1: "الدفع نقدًا للسائق بعد اكتمال الرحلة · دون عربون",
    trust2: "متابعة الرحلات الجوية على مدار الساعة",
    trust3: "الضريبة والوقود ورسوم الطرق ومواقف المطار مشمولة",
  },
  fr: {
    badge: 'Réservation Directe de Chauffeur VIP',
    title: 'Réservez Votre Chauffeur Privé',
    subtitle:
      "Tarifs fixes garantis. Paiement direct au chauffeur à l'arrivée en espèces (SAR ou USD) — aucun paiement d'avance ni caution requis.",
    trust1: "Paiement en espèces après le trajet · Sans acompte",
    trust2: "Suivi des vols 24 h/24",
    trust3: "TVA, carburant, péages et parking aéroport inclus",
  },
  es: {
    badge: 'Reserva Directa de Chofer VIP',
    title: 'Reserve Su Chofer Privado',
    subtitle:
      'Tarifas fijas garantizadas. Pago directo al chofer a la llegada en efectivo (SAR o USD) — sin pagos por adelantado ni depósitos.',
    trust1: "Pago en efectivo tras completar el viaje · Sin depósito",
    trust2: "Seguimiento de vuelos 24/7",
    trust3: "IVA, combustible, peajes y estacionamiento incluidos",
  },
  id: {
    badge: 'Pemesanan Langsung Sopir VIP',
    title: 'Pesan Sopir Privat Anda',
    subtitle:
      'Tarif pasti transparan. Bayar tunai langsung ke sopir saat tiba (SAR atau USD) — tanpa uang muka atau deposit sama sekali.',
    trust1: "Bayar tunai setelah perjalanan selesai · Tanpa deposit",
    trust2: "Pemantauan penerbangan 24/7",
    trust3: "Pajak, bahan bakar, tol dan parkir bandara termasuk",
  },
  hi: {
    badge: 'सीधा वीआईपी चौफर आरक्षण',
    title: 'अपना निजी चौफर बुक करें',
    subtitle:
      'निश्चित गारंटीकृत किराया। पहुंचने पर सीधे ड्राइवर को नकद (SAR या USD) भुगतान करें — कोई अग्रिम भुगतान या जमा राशि आवश्यक नहीं है।',
    trust1: "यात्रा पूरी होने के बाद नकद भुगतान · कोई जमा नहीं",
    trust2: "24/7 उड़ान निगरानी",
    trust3: "कर, ईंधन, टोल और हवाई अड्डे की पार्किंग शामिल",
  },
  de: {
    badge: 'Direkte VIP-Chauffeur-Reservierung',
    title: 'Reservieren Sie Ihren Privatchauffeur',
    subtitle:
      'Garantierte Festpreise. Zahlung direkt beim Fahrer bei Ankunft in bar (SAR oder USD) — keinerlei Vorauszahlung oder Kaution erforderlich.',
    trust1: "Barzahlung nach Fahrtende · Keine Anzahlung",
    trust2: "Flugüberwachung rund um die Uhr",
    trust3: "MwSt., Kraftstoff, Maut und Flughafenparkplatz inklusive",
  },
  ur: {
    badge: 'براہ راست وی آئی پی ڈرائیور بکنگ',
    title: 'اپنا پرائیویٹ ڈرائیور بک کریں',
    subtitle:
      'طے شدہ اور شفاف کرائے۔ آمد پر ڈرائیور کو نقد (سعودی ریال یا امریکی ڈالر) براہ راست ادائیگی — کسی پیشگی رقم یا ایڈوانس کی قطعاً ضرورت نہیں۔',
    trust1: "سفر مکمل ہونے کے بعد نقد ادائیگی · بغیر پیشگی رقم",
    trust2: "پرواز کی نگرانی 24 گھنٹے",
    trust3: "ٹیکس، ایندھن، ٹول اور ایئرپورٹ پارکنگ شامل ہیں",
  },
  ms: {
    badge: 'Tempahan Terus Pemandu VIP',
    title: 'Tempah Pemandu Peribadi Anda',
    subtitle:
      'Kadar tetap terjamin. Bayar tunai terus kepada pemandu semasa tiba (SAR atau USD) — tiada bayaran pendahuluan atau deposit diperlukan.',
    trust1: "Bayar tunai selepas perjalanan selesai · Tiada deposit",
    trust2: "Penjejakan penerbangan 24/7",
    trust3: "Cukai, bahan api, tol dan parkir lapangan terbang termasuk",
  },
  tr: {
    badge: 'Doğrudan VIP Şoför Rezervasyonu',
    title: 'Özel Şoförünüzü Ayırtın',
    subtitle:
      'Garantili sabit fiyatlar. Varışta şoföre doğrudan nakit (SAR veya USD) ödeme yapın — ön ödeme veya depozito gerekmez.',
    trust1: "Yolculuk tamamlandıktan sonra nakit ödeme · Kapora yok",
    trust2: "7/24 uçuş takibi",
    trust3: "KDV, yakıt, geçiş ücretleri ve havalimanı otoparkı dahil",
  },
};

export async function generateMetadata(
  props: {
    params: Promise<{ locale: Locale }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  return {
    title: dict.nav.bookNow,
    description: PAGE_TEXT[locale]?.subtitle || PAGE_TEXT.en.subtitle,
    alternates: getLocalizedAlternates(locale, '/booking'),
  };
}

const VEHICLE_SLUG_NORMALIZER: Record<string, string> = {
  'toyota-camry': 'camry',
  camry: 'camry',
  'hyundai-staria': 'staria',
  staria: 'staria',
  'gmc-yukon-xl': 'yukon',
  yukon: 'yukon',
  'toyota-hiace': 'hiace',
  hiace: 'hiace',
  'toyota-coaster': 'coaster',
  coaster: 'coaster',
  'mercedes-maybach': 'maybach',
  maybach: 'maybach',
  'hyundai-h1': 'h1',
  h1: 'h1',
};

export default async function BookingPage(props: BookingPageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { locale } = params;

  const dict = getDictionary(locale);
  const settings = await getSiteSettings();
  const pageText = PAGE_TEXT[locale] || PAGE_TEXT.en;

  const initialType = (['transfer', 'hourly', 'ziyarat', 'group_bus'].includes(searchParams.type || '')
    ? searchParams.type
    : 'transfer') as 'transfer' | 'hourly' | 'ziyarat' | 'group_bus';

  let resolvedRoute = searchParams.route;
  let resolvedVehicle = searchParams.vehicle
    ? VEHICLE_SLUG_NORMALIZER[searchParams.vehicle.toLowerCase()] || searchParams.vehicle
    : undefined;
  let resolvedDate = searchParams.date;
  let resolvedTime = searchParams.time;
  let resolvedPassengers = searchParams.passengers;
  let resolvedLuggage = searchParams.luggage;
  let resolvedType = initialType;
  let resolvedDuration = searchParams.duration;
  let resolvedPickup = searchParams.pickup;
  let resolvedDropoff = searchParams.dropoff;

  if (searchParams.draft) {
    const draft = await getBookingDraft(searchParams.draft);
    if (draft) {
      resolvedRoute = draft.routeId || resolvedRoute;
      resolvedVehicle = draft.vehicleId || resolvedVehicle;
      resolvedDate = draft.pickupDate || resolvedDate;
      resolvedTime = draft.pickupTime || resolvedTime;
      resolvedPassengers = draft.passengers ? String(draft.passengers) : resolvedPassengers;
      resolvedLuggage = draft.luggage ? String(draft.luggage) : resolvedLuggage;
      resolvedType = draft.bookingType || resolvedType;
      resolvedDuration = draft.durationHours ? String(draft.durationHours) : resolvedDuration;
      resolvedPickup = draft.pickupLocation || resolvedPickup;
      resolvedDropoff = draft.dropoffLocation || resolvedDropoff;
    }
  }

  return (
    <div className="duyuf-booking-page relative py-10 md:py-16 min-h-screen overflow-hidden">
      {/* Luxury Golden Ambient Illumination */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#D6A13A" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section A: Booking Page Header */}
        <div className="duyuf-booking-intro text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-4 shadow-xs">
            <span>{pageText.badge}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {pageText.title}
          </h1>
          <p className="mt-3 text-ink-muted text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {pageText.subtitle}
          </p>

          {/* Luxury Executive Trust Badges */}
          <div className="duyuf-booking-trust mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border text-ink font-medium shadow-2xs">
              <Banknote className="w-3.5 h-3.5 text-emerald-600" />
              <span>{pageText.trust1}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border text-ink font-medium shadow-2xs">
              <Plane className="w-3.5 h-3.5 text-gold-dark" />
              <span>{pageText.trust2}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-border text-ink font-medium shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
              <span>{pageText.trust3}</span>
            </span>
          </div>
        </div>

        {/* Booking Engine & Real-Time Booking Summary */}
        <div className="duyuf-booking-wizard">
        <BookingWizard
          locale={locale}
          dict={dict}
          settings={settings}
          initialRoute={resolvedRoute}
          initialVehicle={resolvedVehicle}
          initialDate={resolvedDate}
          initialTime={resolvedTime}
          initialPassengers={resolvedPassengers}
          initialLuggage={resolvedLuggage}
          initialType={resolvedType}
          initialDuration={resolvedDuration}
          initialPickup={resolvedPickup}
          initialDropoff={resolvedDropoff}
          initialRates={await getDbPricesCached()}
        />
        </div>
      </div>
    </div>
  );
}
