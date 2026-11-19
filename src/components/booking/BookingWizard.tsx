'use client';

/**
 * BookingWizard — Elegant Four-Step Luxury Booking Experience
 * Duyuf Al Rahman VIP
 *
 * Eliminates the old 3-column layout (300px sidebar) and replaces it with a clean
 * Horizontal 4-Step Stepper across Desktop/Tablet, and a compact Stepper on Mobile.
 *
 * Directly renders BookingEngine in a balanced 2-column layout on Desktop:
 * - Left (65% / 8 cols): Form Steps 1 to 4
 * - Right (35% / 4 cols): Sticky Trip Summary Card with 100% Cash-on-Arrival guarantee
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Locale, LOCALE_CONFIG } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { BookingEngine } from '@/components/booking/BookingEngine';
import {
  MapPin,
  Car,
  Clock,
  CheckCircle2,
  MessageCircle,
  Star,
} from 'lucide-react';

const WA_PRIMARY = '966567588261';
const WA_CONCIERGE = '966567588261';

function buildWhatsappUrl(number: string, text: string): string {
  const cleanNumber = number.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
}

interface BookingWizardProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
  initialRoute?: string;
  initialVehicle?: string;
  initialDate?: string;
  initialTime?: string;
  initialPassengers?: string;
  initialLuggage?: string;
  initialType?: 'transfer' | 'hourly' | 'ziyarat' | 'group_bus';
  initialDuration?: string;
  initialPickup?: string;
  initialDropoff?: string;
  initialRates?: Record<string, Record<string, number>>;
  vehicleOverrides?: Record<string,{name:string;category:string;seats:number;bags:number;img:string}>;
  routeImages?: Record<string,string>;
  routeOverrides?: Record<string,{label:string;baseSAR:number}>;
  disabledRouteIds?: string[];
  initialStep?: 1 | 2 | 3 | 4;
}

interface WizardStep {
  number: 1 | 2 | 3 | 4;
  iconEl: React.ReactNode;
  titleKey: keyof WizardUIText;
  descKey: keyof WizardUIText;
}

interface WizardUIText {
  heroTitle: string;
  heroSubtitle: string;
  whatsappLabel: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  progressLabel: string;
  stepOf: string;
  ariaStepAnnounce: string;
  conciergeTitle: string;
  conciergeDesc: string;
  conciergeBtn: string;
}

const WIZARD_UI: Record<Locale, WizardUIText> = {
  en: {
    heroTitle: 'Reserve Your Private Chauffeur',
    heroSubtitle: 'Luxury VIP transfers between Jeddah, Makkah & Madinah',
    whatsappLabel: 'WhatsApp Concierge',
    step1Title: 'Route & Service',
    step1Desc: 'Trip type & destinations',
    step2Title: 'Vehicle & Fare',
    step2Desc: 'Capacity & guaranteed price',
    step3Title: 'Schedule & Trip',
    step3Desc: 'Date, time & flight number',
    step4Title: 'Passenger & Details',
    step4Desc: 'Name, contact & zero-advance',
    progressLabel: 'Booking Steps',
    stepOf: 'Step',
    ariaStepAnnounce: 'Navigated to booking step',
    conciergeTitle: 'VIP Diplomatic & Bespoke Concierge',
    conciergeDesc: 'Need special arrangements, multi-vehicle motorcades, or presidential transport?',
    conciergeBtn: 'Inquire on WhatsApp',
  },
  ar: {
    heroTitle: 'احجز رحلتك وسائقك الخاص',
    heroSubtitle: 'تنقلات VIP فاخرة بين جدة ومكة والمدينة المنورة',
    whatsappLabel: 'كونسيرج واتساب',
    step1Title: 'مسار الرحلة والخدمة',
    step1Desc: 'نوع الرحلة والوجهات',
    step2Title: 'اختيار السيارة والسعر',
    step2Desc: 'سعة الركاب والسعر الثابت',
    step3Title: 'الموعد وتفاصيل الرحلة',
    step3Desc: 'التاريخ، الوقت، ورقم الرحلة',
    step4Title: 'بيانات الراكب والتأكيد',
    step4Desc: 'الاسم، الهاتف، وبدون عربون',
    progressLabel: 'مراحل الحجز',
    stepOf: 'الخطوة',
    ariaStepAnnounce: 'الانتقال إلى خطوة الحجز',
    conciergeTitle: 'كونسيرج الوفود الدبلوماسية والشخصيات المهمة',
    conciergeDesc: 'هل تحتاج ترتيبات خاصة، أسطولاً متعدد المركبات، أو استقبالاً رئاسياً؟',
    conciergeBtn: 'تواصل عبر واتساب',
  },
  ms: {
    heroTitle: 'Tempah Pemandu Peribadi VIP',
    heroSubtitle: 'Pengangkutan mewah antara Jeddah, Makkah & Madinah',
    whatsappLabel: 'Concierge WhatsApp',
    step1Title: 'Laluan & Perkhidmatan',
    step1Desc: 'Pilihan perjalanan',
    step2Title: 'Kenderaan & Tambang',
    step2Desc: 'Kapasiti & harga tetap',
    step3Title: 'Jadual & Butiran',
    step3Desc: 'Tarikh & masa pengambilan',
    step4Title: 'Maklumat & Pengesahan',
    step4Desc: 'Nama & bayaran semasa ketibaan',
    progressLabel: 'Langkah Tempahan',
    stepOf: 'Langkah',
    ariaStepAnnounce: 'Beralih ke langkah',
    conciergeTitle: 'Concierge VIP & Diplomatik',
    conciergeDesc: 'Perlukan kenderaan tambahan atau pengangkutan khas?',
    conciergeBtn: 'Tanya di WhatsApp',
  },
  id: {
    heroTitle: 'Pesan Sopir Pribadi VIP',
    heroSubtitle: 'Antar-jemput mewah antara Jeddah, Makkah & Madinah',
    whatsappLabel: 'Concierge WhatsApp',
    step1Title: 'Rute & Layanan',
    step1Desc: 'Pilihan perjalanan',
    step2Title: 'Kendaraan & Tarif',
    step2Desc: 'Kapasitas & harga pasti',
    step3Title: 'Jadwal & Detail',
    step3Desc: 'Tanggal & jam penjemputan',
    step4Title: 'Data & Konfirmasi',
    step4Desc: 'Nama & bayar tunai di tempat',
    progressLabel: 'Tahapan Pemesanan',
    stepOf: 'Langkah',
    ariaStepAnnounce: 'Pindah ke langkah',
    conciergeTitle: 'Concierge VIP & Rombongan',
    conciergeDesc: 'Butuh pengaturan khusus atau mobil tambahan?',
    conciergeBtn: 'Hubungi WhatsApp',
  },
  ur: {
    heroTitle: 'وی آئی پی پرائیویٹ ڈرائیور بک کریں',
    heroSubtitle: 'جدہ، مکہ اور مدینہ کے درمیان پرتعیش سفر',
    whatsappLabel: 'واٹس ایپ کونسیرج',
    step1Title: 'روٹ اور سروس',
    step1Desc: 'سفر کی نوعیت اور مقامات',
    step2Title: 'گاڑی اور کرایہ',
    step2Desc: 'نشستیں اور فکس ریٹ',
    step3Title: 'شیڈول اور تفصیلات',
    step3Desc: 'تاریخ، وقت اور فلائٹ نمبر',
    step4Title: 'مسافر کی معلومات اور تصدیق',
    step4Desc: 'نام، رابطہ اور کیش ادائیگی',
    progressLabel: 'بکنگ کے مراحل',
    stepOf: 'مرحلہ',
    ariaStepAnnounce: 'مرحلہ تبدیل ہوا',
    conciergeTitle: 'وی آئی پی ڈپلومیٹک کونسیرج',
    conciergeDesc: 'کیا آپ کو خصوصی پروٹوکول یا متعدد گاڑیوں کی ضرورت ہے؟',
    conciergeBtn: 'واٹس ایپ پر رابطہ کریں',
  },
  fr: {
    heroTitle: 'Réservez Votre Chauffeur Privé VIP',
    heroSubtitle: 'Transferts haut de gamme Djeddah, La Mecque & Médine',
    whatsappLabel: 'Conciergerie WhatsApp',
    step1Title: 'Trajet & Service',
    step1Desc: 'Itinéraire & destinations',
    step2Title: 'Véhicule & Tarif',
    step2Desc: 'Capacité & prix garanti',
    step3Title: 'Horaires & Détails',
    step3Desc: 'Date, heure & vol',
    step4Title: 'Passager & Confirmation',
    step4Desc: 'Coordonnées & sans acompte',
    progressLabel: 'Étapes de réservation',
    stepOf: 'Étape',
    ariaStepAnnounce: 'Passé à l’étape',
    conciergeTitle: 'Conciergerie Diplomatique & VIP',
    conciergeDesc: 'Besoins particuliers ou convoi de véhicules ?',
    conciergeBtn: 'Contacter sur WhatsApp',
  },
  es: {
    heroTitle: 'Reserve Su Chofer Privado VIP',
    heroSubtitle: 'Traslados de lujo entre Yeda, La Meca y Medina',
    whatsappLabel: 'Conserjería WhatsApp',
    step1Title: 'Ruta y Servicio',
    step1Desc: 'Trayecto y destinos',
    step2Title: 'Vehículo y Tarifa',
    step2Desc: 'Capacidad y precio fijo',
    step3Title: 'Horario y Detalles',
    step3Desc: 'Fecha, hora y vuelo',
    step4Title: 'Pasajero y Confirmación',
    step4Desc: 'Datos y pago en destino',
    progressLabel: 'Pasos de reserva',
    stepOf: 'Paso',
    ariaStepAnnounce: 'Paso de reserva',
    conciergeTitle: 'Conserjería Diplomática VIP',
    conciergeDesc: '¿Requiere arreglos presidenciales o múltiples vehículos?',
    conciergeBtn: 'Consultar por WhatsApp',
  },
  de: {
    heroTitle: 'Buchen Sie Ihren VIP-Chauffeur',
    heroSubtitle: 'Luxustransfers zwischen Dschidda, Mekka und Medina',
    whatsappLabel: 'WhatsApp Concierge',
    step1Title: 'Route & Service',
    step1Desc: 'Fahrtart & Ziele',
    step2Title: 'Fahrzeug & Tarif',
    step2Desc: 'Kapazität & Festpreis',
    step3Title: 'Zeitplan & Details',
    step3Desc: 'Datum, Zeit & Flug',
    step4Title: 'Passagier & Bestätigung',
    step4Desc: 'Kontaktdaten & Barzahlung',
    progressLabel: 'Buchungsschritte',
    stepOf: 'Schritt',
    ariaStepAnnounce: 'Zu Schritt gewechselt',
    conciergeTitle: 'VIP & Diplomaten Concierge',
    conciergeDesc: 'Besondere Wünsche oder Fuhrpark für Delegationen?',
    conciergeBtn: 'Per WhatsApp anfragen',
  },
  tr: {
    heroTitle: 'VIP Özel Şoförünüzü Ayırtın',
    heroSubtitle: 'Cidde, Mekke ve Medine arası lüks transferler',
    whatsappLabel: 'WhatsApp Danışmanı',
    step1Title: 'Güzergah & Hizmet',
    step1Desc: 'Yolculuk türü & varış noktası',
    step2Title: 'Araç & Fiyat',
    step2Desc: 'Kapasite & sabit fiyat',
    step3Title: 'Tarih & Detaylar',
    step3Desc: 'Tarih, saat & uçuş',
    step4Title: 'Yolcu & Onay',
    step4Desc: 'İletişim & varışta nakit',
    progressLabel: 'Rezervasyon Adımları',
    stepOf: 'Adım',
    ariaStepAnnounce: 'Adıma geçildi',
    conciergeTitle: 'VIP Diplomatik Danışmanlık',
    conciergeDesc: 'Özel heyet veya çoklu araç protokolü mü gerekiyor?',
    conciergeBtn: 'WhatsApp’tan Ulaşın',
  },
  hi: {
    heroTitle: 'अपना वीआईपी निजी चौफ़र बुक करें',
    heroSubtitle: 'जेद्दा, मक्का और मदीना के बीच आरामदायक यात्रा',
    whatsappLabel: 'व्हाट्सएप कंसीयज',
    step1Title: 'रूट एवं सेवा',
    step1Desc: 'यात्रा का प्रकार',
    step2Title: 'गाड़ी और किराया',
    step2Desc: 'क्षमता एवं निश्चित दर',
    step3Title: 'समय और विवरण',
    step3Desc: 'तारीख, समय और फ्लाइट',
    step4Title: 'यात्री विवरण एवं पुष्टि',
    step4Desc: 'संपर्क और नकद भुगतान',
    progressLabel: 'बुकिंग चरण',
    stepOf: 'चरण',
    ariaStepAnnounce: 'चरण पर पहुंचे',
    conciergeTitle: 'वीआईपी राजनयिक कंसीयज',
    conciergeDesc: 'विशेष व्यवस्था या कई गाड़ियों के काफिले की आवश्यकता है?',
    conciergeBtn: 'व्हाट्सएप पर संपर्क करें',
  },
};

const STEPS: WizardStep[] = [
  {
    number: 1,
    iconEl: <MapPin className="w-4 h-4" aria-hidden="true" />,
    titleKey: 'step1Title',
    descKey: 'step1Desc',
  },
  {
    number: 2,
    iconEl: <Car className="w-4 h-4" aria-hidden="true" />,
    titleKey: 'step2Title',
    descKey: 'step2Desc',
  },
  {
    number: 3,
    iconEl: <Clock className="w-4 h-4" aria-hidden="true" />,
    titleKey: 'step3Title',
    descKey: 'step3Desc',
  },
  {
    number: 4,
    iconEl: <CheckCircle2 className="w-4 h-4" aria-hidden="true" />,
    titleKey: 'step4Title',
    descKey: 'step4Desc',
  },
];

export function BookingWizard({
  locale,
  dict,
  settings,
  initialRoute,
  initialVehicle,
  initialDate,
  initialTime,
  initialPassengers,
  initialLuggage,
  initialType = 'transfer',
  initialDuration,
  initialPickup,
  initialDropoff,
  initialRates,
  vehicleOverrides,
  routeImages,
  routeOverrides,
  disabledRouteIds,
  initialStep = 1,
}: BookingWizardProps) {
  const ui = WIZARD_UI[locale] || WIZARD_UI.en;
  const isRtl = LOCALE_CONFIG[locale]?.dir === 'rtl';

  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  const liveRef = useRef<HTMLDivElement>(null);

  const announceStep = useCallback(
    (step: number) => {
      if (liveRef.current) {
        const stepKey = STEPS[step - 1]?.titleKey;
        const stepTitle = stepKey ? ui[stepKey] : '';
        liveRef.current.textContent = `${ui.ariaStepAnnounce} ${step}: ${stepTitle}`;
      }
    },
    [ui]
  );

  useEffect(() => {
    announceStep(currentStep);
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.bookingWizardStep = String(currentStep);
    }
  }, [currentStep, announceStep]);

  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        delete document.documentElement.dataset.bookingWizardStep;
      }
    };
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      setCurrentStep(step);
    },
    []
  );

  const currentStepData = STEPS[currentStep - 1];

  return (
    <div
      className={`duyuf-booking-wizard-shell w-full max-w-7xl mx-auto ${isRtl ? 'rtl' : 'ltr'}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ARIA LIVE REGION */}
      <div
        ref={liveRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Adapted from the owner's vip_vip.html booking desk: real four-step controller on a navy side rail. */}
      <div className="duyuf-prototype-booking-desk">
            {/* =====================================================================
          UNIFIED HORIZONTAL LUXURY STEPPER (Desktop & Tablet)
      ===================================================================== */}
      <div className="duyuf-booking-progress-desktop hidden md:block mb-8">
        <div className="duyuf-prototype-booking-kicker">DUYUF AL RAHMAN VIP <span> / 01—04</span></div>
        <h2 className="duyuf-prototype-booking-label">{ui.progressLabel}</h2>
        <div className="duyuf-booking-stepper bg-surface rounded-2xl border border-border p-4 sm:p-5 shadow-xs">
          <div className="grid grid-cols-4 gap-3 sm:gap-4" role="navigation" aria-label={ui.progressLabel}>
            {STEPS.map((step) => {
              const isActive = step.number === currentStep;
              const isDone = step.number < currentStep;

              return (
                <button
                  key={step.number}
                  type="button"
                  disabled={!isDone}
                  onClick={() => goToStep(step.number)}
                  className={`
                    duyuf-booking-step flex items-center gap-3 p-3 rounded-xl border text-start transition-all duration-200
                    ${
                      isActive
                        ? 'bg-gold-soft/50 border-gold shadow-xs'
                        : isDone
                        ? 'bg-surface border-border-strong hover:bg-bg-alt cursor-pointer'
                        : 'bg-bg-alt/40 border-border/60 opacity-65 cursor-default'
                    }
                  `}
                  aria-current={isActive ? 'step' : undefined}
                  data-step-state={isActive ? 'active' : isDone ? 'completed' : 'upcoming'}
                >
                  <div
                    className={`
                      duyuf-booking-step-index w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-all
                      ${
                        isActive
                          ? 'bg-gold-dark text-white shadow-xs'
                          : isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-surface text-ink-muted border border-border'
                      }
                    `}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-xs font-bold truncate ${isActive ? 'text-ink' : isDone ? 'text-ink' : 'text-ink-muted'}`}>
                      {ui[step.titleKey]}
                    </p>
                    <p className="text-[10px] text-ink-muted truncate hidden lg:block">
                      {ui[step.descKey]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          MOBILE COMPACT HEADER (< md)
      ===================================================================== */}
      <div className="duyuf-booking-progress-mobile md:hidden mb-6">
        <div className="duyuf-booking-mobile-rail rounded-2xl border border-border bg-surface p-4 shadow-xs">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-[10px] text-gold-dark uppercase tracking-wider font-bold">
                {ui.stepOf} {currentStep} / {STEPS.length}
              </p>
              <h2 className="text-sm font-bold text-ink mt-0.5">
                {currentStepData ? ui[currentStepData.titleKey] : ''}
              </h2>
            </div>
            {/* WhatsApp quick-link */}
            <a
              href={buildWhatsappUrl(WA_PRIMARY, LOCALE_CONFIG[locale]?.whatsappGreeting || '')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/20 transition-colors"
              aria-label={ui.whatsappLabel}
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{ui.whatsappLabel}</span>
            </a>
          </div>

          {/* Dots */}
          <div
            className={`flex items-center gap-2 justify-center ${isRtl ? 'flex-row-reverse' : ''}`}
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-valuenow={currentStep}
            aria-label={ui.progressLabel}
          >
            {STEPS.map((step) => {
              const isActive = step.number === currentStep;
              const isDone = step.number < currentStep;
              return (
                <div
                  key={step.number}
                  aria-hidden="true"
                  className={`
                    h-1.5 rounded-full transition-all duration-300
                    ${isActive ? 'w-8 bg-gold-dark' : isDone ? 'w-4 bg-emerald-600' : 'w-4 bg-border-strong'}
                  `}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          MAIN BOOKING WORKSPACE (2-Column Desktop: 65% Form / 35% Summary)
      ===================================================================== */}
      <div className="w-full">
        <BookingEngine
          locale={locale}
          dict={dict}
          settings={settings}
          initialRoute={initialRoute}
          initialVehicle={initialVehicle}
          initialDate={initialDate}
          initialTime={initialTime}
          initialPassengers={initialPassengers}
          initialLuggage={initialLuggage}
          initialType={initialType}
          initialDuration={initialDuration}
          initialPickup={initialPickup}
          initialDropoff={initialDropoff}
          initialRates={initialRates}
          vehicleOverrides={vehicleOverrides}
          routeImages={routeImages}
          routeOverrides={routeOverrides}
          disabledRouteIds={disabledRouteIds}
          hideInternalStepper={true}
          stepOverride={currentStep as 1 | 2 | 3 | 4}
          onStepChange={(s) => goToStep(s)}
        />
      </div>

      </div>
            {/* =====================================================================
          VIP CONCIERGE BANNER (Discreet footer strip)
      ===================================================================== */}
      <div className="mt-8 p-4 sm:p-5 rounded-2xl border border-gold-line bg-gold-soft/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark shrink-0">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-xs sm:text-sm text-ink">
              {ui.conciergeTitle}
            </p>
            <p className="text-[11px] text-ink-muted">
              {ui.conciergeDesc}
            </p>
          </div>
        </div>
        <a
          href={buildWhatsappUrl(WA_CONCIERGE, LOCALE_CONFIG[locale]?.whatsappGreeting || '')}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EB657] active:scale-95 transition-all shadow-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{ui.conciergeBtn}</span>
        </a>
      </div>
    </div>
  );
}

export default BookingWizard;
