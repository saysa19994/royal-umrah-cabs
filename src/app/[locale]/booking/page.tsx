import React from 'react';
import type { Metadata } from 'next';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { BookingEngine } from '@/components/booking/BookingEngine';
import { getDbPricesCached } from '@/lib/pricing-db';

interface BookingPageProps {
  params: Promise<{
    locale: Locale;
  }>;
  searchParams: Promise<{
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

const PAGE_TEXT: Record<Locale, { badge: string; title: string; subtitle: string }> = {
  en: {
    badge: 'Direct VIP Chauffeur Reservation',
    title: 'Reserve Your Private Chauffeur',
    subtitle:
      'Guaranteed fixed fares. Cash paid to the driver after the journey is completed and the customer reaches the requested destination (SAR or USD) — zero advance payment or deposit required.',
  },
  ar: {
    badge: 'حجز مباشر لسائق VIP خاص',
    title: 'احجز رحلتك الخاصة وسائقك الشخصي',
    subtitle:
      'أسعار ثابتة ومحددة بدقة. الدفع نقداً مباشرة للسائق عند الوصول (بالريال السعودي أو الدولار الأمريكي) — لا يلزم أي دفع مسبق أو عربون.',
  },
  fr: {
    badge: 'Réservation Directe de Chauffeur VIP',
    title: 'Réservez Votre Chauffeur Privé',
    subtitle:
      "Tarifs fixes garantis. Paiement direct au chauffeur à l'arrivée en espèces (SAR ou USD) — aucun paiement d'avance ni caution requis.",
  },
  es: {
    badge: 'Reserva Directa de Chofer VIP',
    title: 'Reserve Su Chofer Privado',
    subtitle:
      'Tarifas fijas garantizadas. Pago directo al chofer a la llegada en efectivo (SAR o USD) — sin pagos por adelantado ni depósitos.',
  },
  id: {
    badge: 'Pemesanan Langsung Sopir VIP',
    title: 'Pesan Sopir Privat Anda',
    subtitle:
      'Tarif pasti transparan. Bayar tunai langsung ke sopir saat tiba (SAR atau USD) — tanpa uang muka atau deposit sama sekali.',
  },
  hi: {
    badge: 'सीधा वीआईपी चौफर आरक्षण',
    title: 'अपना निजी चौफर बुक करें',
    subtitle:
      'निश्चित गारंटीकृत किराया। पहुंचने पर सीधे ड्राइवर को नकद (SAR या USD) भुगतान करें — कोई अग्रिम भुगतान या जमा राशि आवश्यक नहीं है।',
  },
  de: {
    badge: 'Direkte VIP-Chauffeur-Reservierung',
    title: 'Reservieren Sie Ihren Privatchauffeur',
    subtitle:
      'Garantierte Festpreise. Zahlung direkt beim Fahrer bei Ankunft in bar (SAR oder USD) — keinerlei Vorauszahlung oder Kaution erforderlich.',
  },
  ur: {
    badge: 'براہ راست وی آئی پی ڈرائیور بکنگ',
    title: 'اپنا پرائیویٹ ڈرائیور بک کریں',
    subtitle:
      'طے شدہ اور شفاف کرائے۔ آمد پر ڈرائیور کو نقد (سعودی ریال یا امریکی ڈالر) براہ راست ادائیگی — کسی پیشگی رقم یا ایڈوانس کی قطعاً ضرورت نہیں۔',
  },
  ms: {
    badge: 'Tempahan Terus Pemandu VIP',
    title: 'Tempah Pemandu Peribadi Anda',
    subtitle:
      'Kadar tetap terjamin. Bayar tunai terus kepada pemandu semasa tiba (SAR atau USD) — tiada bayaran pendahuluan atau deposit diperlukan.',
  },
  tr: {
    badge: 'Doğrudan VIP Şoför Rezervasyonu',
    title: 'Özel Şoförünüzü Ayırtın',
    subtitle:
      'Garantili sabit fiyatlar. Varışta şoföre doğrudan nakit (SAR veya USD) ödeme yapın — ön ödeme veya depozito gerekmez.',
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

  return (
    <div className="py-10 md:py-16 bg-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section A: Booking Page Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{pageText.badge}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {pageText.title}
          </h1>
          <p className="mt-2 text-ink-muted text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {pageText.subtitle}
          </p>
        </div>

        {/* Booking Engine & Real-Time Booking Summary */}
        <BookingEngine
          locale={locale}
          dict={dict}
          settings={settings}
          initialRoute={searchParams.route}
          initialVehicle={searchParams.vehicle}
          initialDate={searchParams.date}
          initialTime={searchParams.time}
          initialPassengers={searchParams.passengers}
          initialLuggage={searchParams.luggage}
          initialType={initialType}
          initialDuration={searchParams.duration}
          initialPickup={searchParams.pickup}
          initialDropoff={searchParams.dropoff}
          initialRates={await getDbPricesCached()}
        />
      </div>
    </div>
  );
}
