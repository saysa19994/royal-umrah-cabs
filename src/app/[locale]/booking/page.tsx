import React from 'react';
import Image from 'next/image';
import styles from './booking-atrium.module.css';
import './booking-editorial.css';
import './booking-reference-redesign.css';
import type { Metadata } from 'next';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getSiteSettings } from '@/lib/settings';
import { BookingWizard } from '@/components/booking/BookingWizard';
import { ShieldCheck, Plane, Banknote } from 'lucide-react';
import { getDbPricesCached } from '@/lib/pricing-db';
import { getBookingDraft } from '@/lib/booking-draft-store';
import { getSiteImagesCached } from '@/lib/site-images';

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
 const images = await getSiteImagesCached();
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
  let draftRestoreFailed = false;

  if (searchParams.draft) {
    let draft = null;
    try {
      draft = await getBookingDraft(searchParams.draft);
    } catch (error) {
      console.error('Booking draft lookup unavailable:', error);
    }
    if (!draft) draftRestoreFailed = true;
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

  // Reframe the journey entrance; booking validation and persistence stay in BookingWizard.
  return (
    <div className={styles.page} data-booking-design="luxury-reference" dir={locale==='ar'||locale==='ur'?'rtl':'ltr'}>
      <header className={styles.intro} aria-labelledby="duyuf-booking-heading">
        <div className={styles.introCopy}>
          <div className={styles.serial}>{pageText.badge}</div>
          <h1 id="duyuf-booking-heading">{locale === 'ar' ? <>احجز <span>رحلتك</span> بسهولة وأمان</> : pageText.title}</h1>
          <a className={styles.startLink} href="#booking-reservation">{dict.nav.bookNow}</a>
        </div>
        <div className={styles.introMedia}>
          <Image src={images.booking_haram} fill
            priority sizes="(max-width:767px) 100vw, 48vw"
            alt={locale === 'ar' ? 'المسجد الحرام في مكة المكرمة' : 'The Grand Mosque in Makkah'}/>
          <div className="duyuf-booking-hero-vehicle" aria-hidden="true">
            <Image src={images.booking_vehicle} fill sizes="(max-width:767px) 160px, 240px" alt="" />
          </div>
          <div className={styles.photoLabel}><span>DUYUF AL RAHMAN VIP</span><span>{dict.nav.bookNow}</span></div>
        </div>
      </header>
      <div className={styles.operationalLine} aria-label={pageText.trust1}>
        <div><Banknote size={20} aria-hidden="true"/><span>{pageText.trust1}</span></div>
        <div><Plane size={20} aria-hidden="true"/><span>{pageText.trust2}</span></div>
        <div><ShieldCheck size={20} aria-hidden="true"/><span>{pageText.trust3}</span></div>
      </div>
      <section id="booking-reservation" className={'duyuf-booking-page duyuf-booking-editorial duyuf-luxury-booking '+styles.reservationDesk} aria-label={dict.nav.bookNow}>
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {draftRestoreFailed && (
          <div role="status" className="mx-auto mb-6 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-center text-sm font-medium text-amber-900">
            {({
              ar: 'تعذر استعادة اختيارات الحجز السابقة. يرجى اختيار الرحلة والسيارة من جديد؛ لن يتم حفظ أي حجز أو خصم أي مبلغ تلقائيًا.',
              en: 'We could not restore your previous booking selections. Please choose your journey and vehicle again. No booking or payment was made automatically.',
              ms: 'Pilihan tempahan anda yang terdahulu tidak dapat dipulihkan. Sila pilih perjalanan dan kenderaan semula. Tiada tempahan atau bayaran dibuat secara automatik.',
              id: 'Pilihan pemesanan sebelumnya tidak dapat dipulihkan. Silakan pilih perjalanan dan kendaraan kembali. Tidak ada pemesanan atau pembayaran otomatis.',
              ur: 'آپ کی پچھلی بکنگ کی تفصیلات بحال نہیں ہو سکیں۔ براہ کرم سفر اور گاڑی دوبارہ منتخب کریں۔ کوئی بکنگ یا ادائیگی خود بخود نہیں ہوئی۔',
              fr: 'Impossible de restaurer votre sélection précédente. Veuillez choisir à nouveau votre trajet et votre véhicule. Aucune réservation ni aucun paiement automatique.',
              es: 'No se pudo recuperar tu selección anterior. Vuelve a elegir el trayecto y el vehículo. No se realizó ninguna reserva ni pago automático.',
              de: 'Ihre vorherige Auswahl konnte nicht wiederhergestellt werden. Bitte wählen Sie Fahrt und Fahrzeug erneut. Es wurde keine Buchung oder Zahlung automatisch durchgeführt.',
              tr: 'Önceki rezervasyon seçimleriniz geri yüklenemedi. Lütfen güzergâhı ve aracı yeniden seçin. Otomatik rezervasyon veya ödeme yapılmadı.',
              hi: 'पिछले बुकिंग विकल्प वापस नहीं मिल सके। कृपया यात्रा और वाहन फिर चुनें। कोई बुकिंग या भुगतान अपने आप नहीं हुआ।',
            } as Record<Locale, string>)[locale]}
          </div>
        )}

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
      </section>
    </div>
  );
}
