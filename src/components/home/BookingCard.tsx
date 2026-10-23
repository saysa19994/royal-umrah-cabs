'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Locale, CURRENCIES, CurrencyCode } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Luggage,
  Car,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Plane,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Edit2,
  Phone,
  User,
} from 'lucide-react';
import { TurnstileWidget } from '@/components/common/TurnstileWidget';
import { AUTHORITATIVE_TRANSFER_RATES } from '@/lib/pricing-constants';
import { trackEvent } from '@/lib/analytics';

interface BookingCardProps {
  locale: Locale;
  dict: Dictionary;
  initialRates?: Record<string, Record<string, number>>;
}

const BASE_RATES: Record<string, Record<string, number>> = AUTHORITATIVE_TRANSFER_RATES;

const ROUTE_LABELS: Record<string, Partial<Record<Locale, string>>> = {
  'jeddah-airport-to-makkah': {
    en: 'Jeddah Airport (KAIA) → Makkah Hotel',
    ar: 'مطار جدة (KAIA) ← فندق مكة المكرمة',
    ms: 'Lapangan Terbang Jeddah (KAIA) → Hotel Makkah',
    tr: 'Cidde Havalimanı (KAIA) → Mekke Oteli',
    id: 'Bandara Jeddah (KAIA) → Hotel Makkah',
    ur: 'جدہ ایئرپورٹ (KAIA) ← مکہ ہوٹل',
  },
  'makkah-to-jeddah-airport': {
    en: 'Makkah Hotel → Jeddah Airport (KAIA)',
    ar: 'فندق مكة المكرمة ← مطار جدة (KAIA)',
    ms: 'Hotel Makkah → Lapangan Terbang Jeddah (KAIA)',
    tr: 'Mekke Oteli → Cidde Havalimanı (KAIA)',
    id: 'Hotel Makkah → Bandara Jeddah (KAIA)',
    ur: 'مکہ ہوٹل ← جدہ ایئرپورٹ (KAIA)',
  },
  'makkah-to-madinah': {
    en: 'Makkah Hotel → Madinah Al-Munawwarah',
    ar: 'فندق مكة المكرمة ← المدينة المنورة',
    ms: 'Hotel Makkah → Madinah Al-Munawwarah',
    tr: 'Mekke Oteli → Medine-i Münevvere',
    id: 'Hotel Makkah → Madinah Al-Munawwarah',
    ur: 'مکہ ہوٹل ← مدینہ منورہ',
  },
  'madinah-to-makkah': {
    en: 'Madinah Hotel → Makkah (Via Miqat Bir Ali)',
    ar: 'المدينة المنورة ← مكة المكرمة (عبر ميقات آبار علي)',
    ms: 'Hotel Madinah → Makkah (Singgah Miqat Bir Ali)',
    tr: 'Medine Oteli → Mekke (Zülhuleyfe Mikat Noktası)',
    id: 'Hotel Madinah → Makkah (Via Miqat Bir Ali)',
    ur: 'مدینہ ہوٹل ← مکہ مکرمہ (براستہ میقات بئر علی)',
  },
  'madinah-airport-to-hotel': {
    en: 'Madinah Airport (MED) → Madinah Hotel',
    ar: 'مطار المدينة (MED) ← فنادق الحرم بالمدينة',
    ms: 'Lapangan Terbang Madinah (MED) → Hotel Madinah',
    tr: 'Medine Havalimanı (MED) → Medine Oteli',
    id: 'Bandara Madinah (MED) → Hotel Madinah',
    ur: 'مدینہ ایئرپورٹ (MED) ← مدینہ ہوٹل',
  },
  'jeddah-to-madinah': {
    en: 'Jeddah City / Airport → Madinah Hotel',
    ar: 'مدينة أو مطار جدة ← المدينة المنورة',
    ms: 'Jeddah / Lapangan Terbang → Hotel Madinah',
    tr: 'Cidde Şehir / Havalimanı → Medine Oteli',
    id: 'Kota / Bandara Jeddah → Hotel Madinah',
    ur: 'جدہ شہر / ایئرپورٹ ← مدینہ ہوٹل',
  },
};

interface FleetOption {
  id: string;
  name: string;
  category: string;
  seats: number;
  bags: number;
  img: string;
  features: string[];
}

const FLEET_OPTIONS: FleetOption[] = [
  {
    id: 'camry',
    name: 'Toyota Camry Executive',
    category: 'Executive Sedan',
    seats: 4,
    bags: 3,
    img: '/assets/images/camry_exterior.webp',
    features: ['Up to 4 Passengers', '3 Luggage Bags', 'Dual-Zone A/C', 'Economic & Smooth'],
  },
  {
    id: 'staria',
    name: 'Hyundai Staria VIP',
    category: 'Executive VIP Van',
    seats: 7,
    bags: 6,
    img: '/assets/images/staria_exterior.webp',
    features: ['Up to 7 Passengers', '6 Large Bags', 'Captain Seats', 'Panoramic Privacy Glass'],
  },
  {
    id: 'yukon',
    name: 'GMC Yukon XL VIP',
    category: 'American Luxury SUV',
    seats: 7,
    bags: 8,
    img: '/assets/images/yukon_exterior.webp',
    features: ['Up to 7 Passengers', '8 Large Bags', 'Extended Wheelbase', 'Acoustic Glass'],
  },
  {
    id: 'hiace',
    name: 'Toyota HiAce VIP',
    category: 'High-Roof Minibus',
    seats: 10,
    bags: 10,
    img: '/assets/images/hiace_exterior.webp',
    features: ['Up to 10 Passengers', '10 Large Bags', 'High-Roof Headroom', 'Rear Climate Controls'],
  },
  {
    id: 'coaster',
    name: 'Toyota Coaster VIP Coach',
    category: 'Executive VIP Coach',
    seats: 21,
    bags: 20,
    img: '/assets/images/coaster_exterior.webp',
    features: ['Up to 21 Passengers', '20 Large Bags', 'Executive Coach Seating', 'Individual Air Vents'],
  },
];

export function BookingCard({ locale, dict, initialRates }: BookingCardProps) {
  const router = useRouter();
  const { currency, setCurrency, formatPrice } = useCurrency();

  // Wizard Step: 1 = Trip Details, 2 = Vehicle & Fare Selection, 3 = Confirmation & Contact
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Trip Info
  const [route, setRoute] = useState('jeddah-airport-to-makkah');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [flightNumber, setFlightNumber] = useState('');
  const [passengers, setPassengers] = useState(3);
  const [luggage, setLuggage] = useState(3);
  const [step1Error, setStep1Error] = useState<string | null>(null);

  // Step 2: Vehicle Selection
  const [vehicle, setVehicle] = useState('staria');

  // Step 3: Customer Details & Submission
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string>('verified_client');
  const [waPopupUrl, setWaPopupUrl] = useState<string | null>(null);
  const [isSubmittingWa, setIsSubmittingWa] = useState(false);

  // Helpers
  const minDate = new Date().toISOString().split('T')[0];
  const activeRates = initialRates || BASE_RATES;
  const currentVehicleSpec = FLEET_OPTIONS.find((v) => v.id === vehicle) || FLEET_OPTIONS[1];
  const baseSAR = activeRates[route]?.[vehicle] ?? BASE_RATES[route]?.[vehicle] ?? 260;

  const isAirportRoute = route.includes('airport');

  // STEP 1 VALIDATION & PROCEED
  const handleProceedToVehicles = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setStep1Error(
        locale === 'ar'
          ? 'يرجى اختيار تاريخ وموعد الرحلة للمتابعة'
          : 'Please select your pickup date to view available vehicles'
      );
      return;
    }
    setStep1Error(null);
    trackEvent({
      event: 'route_selected',
      service_type: 'airport_transfer',
      route,
      passengers,
      luggage,
    });
    setCurrentStep(2);
  };

  // STEP 2 PROCEED TO REVIEW
  const handleProceedToReview = () => {
    trackEvent({
      event: 'quote_calculated',
      service_type: 'airport_transfer',
      route,
      vehicle_id: vehicle,
      price_sar: baseSAR || 0,
      currency,
    });
    setCurrentStep(3);
  };

  // STEP 3: WHATSAPP HANDOFF (KISWAH-INSPIRED INSTANT LEAD DISPATCH)
  const handleWhatsApp = async () => {
    if (isSubmittingWa) return;
    setIsSubmittingWa(true);
    setWaPopupUrl(null);

    trackEvent({
      event: 'whatsapp_handoff_initiated',
      source: 'booking_card',
    });

    const routeText = ROUTE_LABELS[route]?.[locale] || ROUTE_LABELS[route]?.en || route;
    const vehicleText = currentVehicleSpec.name;

    let targetUrl = '';

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: typeof window !== 'undefined' ? window.location.pathname : '/',
          language: locale,
          route_id: route,
          route_title: routeText,
          vehicle_id: vehicle,
          vehicle_name: vehicleText,
          pickup_date: date,
          passengers,
          luggage,
          customer_name: customerName || undefined,
          customer_phone: customerPhone || undefined,
          notes: customerNotes || undefined,
          'cf-turnstile-response': turnstileToken,
          source_utm: {
            referrer: typeof document !== 'undefined' ? document.referrer : '',
            url: typeof window !== 'undefined' ? window.location.href : '',
          },
        }),
      });

      const data = await res.json();
      if (data?.whatsapp_url) {
        targetUrl = data.whatsapp_url;
      }
    } catch (err) {
      console.error('Lead tracking error, continuing to WhatsApp fallback:', err);
    } finally {
      setIsSubmittingWa(false);
    }

    if (!targetUrl) {
      const isNumB = Math.random() > 0.5;
      const targetPhone = isNumB ? '966505316971' : '966567588261';
      const refPrefix = isNumB ? 'REF-B' : 'REF-A';
      const fallbackRef = `${refPrefix}-` + Math.floor(10000 + Math.random() * 90000);
      const formattedPrice = baseSAR ? `${baseSAR} SAR` : 'Quote';
      const fallbackMsg =
        locale === 'ar'
          ? `السلام عليكم، أود حجز سيارة خاصة مع ضيوف الرحمن VIP [${fallbackRef}]:\n• المسار: ${routeText}\n• السيارة: ${vehicleText}\n• التاريخ: ${date || 'اليوم'}\n• الوقت: ${time}\n• رقم الرحلة: ${flightNumber || 'غير محدد'}\n• المسافر: ${customerName || 'غير مسجل'}\n• الركاب: ${passengers} | الأمتعة: ${luggage}\n• السعر الإجمالي: ${formattedPrice} (الدفع عند الوصول 100%)`
          : `Salam, I would like to reserve private chauffeur transport with Duyuf Alrahman VIP [${fallbackRef}]:\n• Route: ${routeText}\n• Vehicle: ${vehicleText}\n• Date: ${date || 'Today'}\n• Time: ${time}\n• Flight: ${flightNumber || 'TBD'}\n• Passenger: ${customerName || 'Guest'}\n• Pax: ${passengers} | Luggage: ${luggage}\n• Total Fare: ${formattedPrice} (100% Pay on Arrival)`;
      targetUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(fallbackMsg)}`;
    }

    const popup = window.open(targetUrl, '_blank');
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      setWaPopupUrl(targetUrl);
    }
  };

  // STEP 3: DIRECT ONLINE BOOKING SUBMIT (NAVIGATES TO FULL ENGINE PREFILLED)
  const handleFullOnlineBooking = () => {
    const params = new URLSearchParams({
      route,
      vehicle,
      date,
      time,
      passengers: passengers.toString(),
      luggage: luggage.toString(),
      flight_number: flightNumber,
      name: customerName,
      phone: customerPhone,
    });
    router.push(`/${locale}/booking?${params.toString()}`);
  };

  const routeTitle = ROUTE_LABELS[route]?.[locale] || ROUTE_LABELS[route]?.en || route;

  return (
    <section
      id="booking-calculator"
      aria-label={dict.booking_card.title}
      className="relative z-30 px-3 sm:px-4 -mt-14 sm:-mt-24 md:-mt-32 max-w-6xl mx-auto w-full scroll-mt-24"
    >
      <div className="bg-surface rounded-3xl shadow-xl border-2 border-gold/40 p-4 sm:p-6 md:p-8 transition-shadow relative overflow-hidden">
        {/* Subtle decorative gold sheen */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

        {/* TOP HEADER: TITLE & CURRENCY SWITCHER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border text-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-gold-dark uppercase tracking-widest bg-gold-soft px-2.5 py-0.5 rounded-full border border-gold-line">
                {locale === 'ar' ? 'حاسبة الأسعار وحجز الرحلة الفوري' : 'Instant Booking & Fixed-Fare Calculator'}
              </span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-ink">
              {dict.booking_card.title}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-0.5 font-light">
              {locale === 'ar'
                ? 'ثلاث خطوات يسيرة: أدخل تفاصيل الرحلة • اختر السيارة والسعر الثابت • أكد حجزك مع السائق فوراً'
                : '3 simple steps: enter trip details, choose your vehicle & fare, and confirm on WhatsApp.'}
            </p>
          </div>

          {/* Quick Currency Selector */}
          <div className="flex items-center gap-1 self-end sm:self-auto bg-bg-alt p-1 rounded-lg border border-border">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                aria-label={`Switch currency to ${c}`}
                className={`min-h-[32px] px-2.5 py-1 text-xs font-bold rounded transition-all focus-visible:ring-1 focus-visible:ring-gold ${
                  currency === c
                    ? 'bg-gold-dark text-white shadow-xs'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 3-STEP PROGRESS STEPPER (KISWAH-INSPIRED CUSTOMER JOURNEY) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
          {/* STEP 1 TAB */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`flex items-center justify-center sm:justify-start gap-2 p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-start min-h-[48px] ${
              currentStep === 1
                ? 'bg-gold text-slate-950 border-gold shadow-xs'
                : 'bg-bg-alt text-ink-muted hover:text-ink border-border'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                currentStep === 1 ? 'bg-slate-950 text-gold' : 'bg-surface border border-border text-ink-muted'
              }`}
            >
              {currentStep > 1 ? '✓' : '1'}
            </span>
            <span className="hidden sm:inline">
              {locale === 'ar' ? '1. تفاصيل الرحلة' : '1. Enter Trip'}
            </span>
          </button>

          {/* STEP 2 TAB */}
          <button
            type="button"
            onClick={() => {
              if (date) setCurrentStep(2);
            }}
            className={`flex items-center justify-center sm:justify-start gap-2 p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-start min-h-[48px] ${
              currentStep === 2
                ? 'bg-gold text-slate-950 border-gold shadow-xs'
                : 'bg-bg-alt text-ink-muted hover:text-ink border-border'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                currentStep === 2 ? 'bg-slate-950 text-gold' : 'bg-surface border border-border text-ink-muted'
              }`}
            >
              {currentStep > 2 ? '✓' : '2'}
            </span>
            <span className="hidden sm:inline">
              {locale === 'ar' ? '2. اختيار السيارة والسعر' : '2. Select Vehicle & Fare'}
            </span>
          </button>

          {/* STEP 3 TAB */}
          <button
            type="button"
            onClick={() => {
              if (date) setCurrentStep(3);
            }}
            className={`flex items-center justify-center sm:justify-start gap-2 p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-start min-h-[48px] ${
              currentStep === 3
                ? 'bg-gold text-slate-950 border-gold shadow-xs'
                : 'bg-bg-alt text-ink-muted hover:text-ink border-border'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                currentStep === 3 ? 'bg-slate-950 text-gold' : 'bg-surface border border-border text-ink-muted'
              }`}
            >
              3
            </span>
            <span className="hidden sm:inline">
              {locale === 'ar' ? '3. تأكيد الحجز' : '3. Customer & Confirm'}
            </span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* STEP 1: ENTER YOUR TRIP DETAILS                                */}
        {/* ============================================================== */}
        {currentStep === 1 && (
          <form onSubmit={handleProceedToVehicles} className="space-y-5 animate-fadeIn">
            {/* POPULAR ROUTE SHORTCUT PILLS */}
            <div className="flex flex-wrap items-center gap-2 pb-2 text-start">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                {locale === 'ar' ? 'المسارات الشائعة السريعة:' : 'Popular Routes:'}
              </span>
              <button
                type="button"
                onClick={() => setRoute('jeddah-airport-to-makkah')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  route === 'jeddah-airport-to-makkah'
                    ? 'bg-gold text-ink font-bold shadow-xs'
                    : 'bg-bg-alt text-ink hover:bg-gold-soft border border-border'
                }`}
              >
                {locale === 'ar' ? `مطار جدة ← مكة (${formatPrice(200)})` : `Jeddah KAIA → Makkah (${formatPrice(200)})`}
              </button>
              <button
                type="button"
                onClick={() => setRoute('makkah-to-madinah')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  route === 'makkah-to-madinah'
                    ? 'bg-gold text-ink font-bold shadow-xs'
                    : 'bg-bg-alt text-ink hover:bg-gold-soft border border-border'
                }`}
              >
                {locale === 'ar' ? `مكة ← المدينة (${formatPrice(450)})` : `Makkah → Madinah (${formatPrice(450)})`}
              </button>
              <button
                type="button"
                onClick={() => setRoute('madinah-airport-to-hotel')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  route === 'madinah-airport-to-hotel'
                    ? 'bg-gold text-ink font-bold shadow-xs'
                    : 'bg-bg-alt text-ink hover:bg-gold-soft border border-border'
                }`}
              >
                {locale === 'ar' ? `مطار المدينة ← الفندق (${formatPrice(150)})` : `Madinah Airport (${formatPrice(150)})`}
              </button>
              <button
                type="button"
                onClick={() => setRoute('jeddah-to-madinah')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  route === 'jeddah-to-madinah'
                    ? 'bg-gold text-ink font-bold shadow-xs'
                    : 'bg-bg-alt text-ink hover:bg-gold-soft border border-border'
                }`}
              >
                {locale === 'ar' ? `جدة ← المدينة (${formatPrice(680)})` : `Jeddah → Madinah (${formatPrice(680)})`}
              </button>
            </div>

            {/* ROUTE SELECTOR WITH DISTINCT PICKUP / DROPOFF VISUALS */}
            <div className="bg-bg-alt/60 p-4 rounded-2xl border border-border text-start">
              <label htmlFor="card-route-select" className="block text-xs font-bold text-ink mb-1.5">
                {dict.booking_card.pickupLabel} ↔ {dict.booking_card.dropoffLabel} <span className="text-gold-dark">*</span>
              </label>
              <div className="relative">
                <select
                  id="card-route-select"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="w-full min-h-[48px] h-12 pl-10 pr-8 rtl:pr-10 rtl:pl-8 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold appearance-none cursor-pointer"
                >
                  {Object.keys(ROUTE_LABELS).map((key) => (
                    <option key={key} value={key}>
                      {ROUTE_LABELS[key]?.[locale] || ROUTE_LABELS[key]?.en || key}
                    </option>
                  ))}
                </select>
                <MapPin className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <span className="pointer-events-none absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-[10px] text-ink-muted">▼</span>
              </div>
            </div>

            {/* SCHEDULE: DATE, TIME & FLIGHT NUMBER */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-start">
              {/* DATE */}
              <div>
                <label htmlFor="card-date-input" className="block text-xs font-bold text-ink mb-1.5">
                  {dict.booking_card.dateLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="card-date-input"
                    type="date"
                    required
                    min={minDate}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (step1Error) setStep1Error(null);
                    }}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  />
                  <Calendar className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* TIME */}
              <div>
                <label htmlFor="card-time-input" className="block text-xs font-bold text-ink mb-1.5">
                  {dict.booking_card.timeLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="card-time-input"
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  />
                  <Clock className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* FLIGHT NUMBER (FOR AIRPORT TRIPS) */}
              <div>
                <label htmlFor="card-flight-input" className="block text-xs font-bold text-ink mb-1.5">
                  {locale === 'ar' ? 'رقم الرحلة الجوية (تتبع المطار)' : 'Flight Number (Delay Tracking)'}
                </label>
                <div className="relative">
                  <input
                    id="card-flight-input"
                    type="text"
                    placeholder={isAirportRoute ? 'e.g. SV 124 / MH 150' : (locale === 'ar' ? 'اختياري' : 'Optional')}
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Plane className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* PASSENGERS & LUGGAGE STEPPERS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-start">
              {/* PASSENGERS STEPPER (- 3 +) */}
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  {dict.booking_card.passengersLabel}
                </label>
                <div className="flex items-center justify-between w-full min-h-[48px] h-12 rounded-btn border border-border-strong bg-surface px-2">
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    aria-label="Decrease Passengers"
                    className="min-w-[44px] min-h-[44px] rounded flex items-center justify-center text-ink hover:text-gold-dark hover:bg-bg-alt font-bold text-xl focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    −
                  </button>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                    <Users className="w-4 h-4 text-gold-dark" />
                    <span>{passengers} {dict.booking_card.passengersLabel}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.min(21, passengers + 1))}
                    aria-label="Increase Passengers"
                    className="min-w-[44px] min-h-[44px] rounded flex items-center justify-center text-ink hover:text-gold-dark hover:bg-bg-alt font-bold text-xl focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* LUGGAGE STEPPER (- 3 +) */}
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  {dict.booking_card.luggageLabel}
                </label>
                <div className="flex items-center justify-between w-full min-h-[48px] h-12 rounded-btn border border-border-strong bg-surface px-2">
                  <button
                    type="button"
                    onClick={() => setLuggage(Math.max(0, luggage - 1))}
                    aria-label="Decrease Luggage"
                    className="min-w-[44px] min-h-[44px] rounded flex items-center justify-center text-ink hover:text-gold-dark hover:bg-bg-alt font-bold text-xl focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    −
                  </button>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                    <Luggage className="w-4 h-4 text-gold-dark" />
                    <span>{luggage} {dict.booking_card.luggageLabel}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLuggage(Math.min(20, luggage + 1))}
                    aria-label="Increase Luggage"
                    className="min-w-[44px] min-h-[44px] rounded flex items-center justify-center text-ink hover:text-gold-dark hover:bg-bg-alt font-bold text-xl focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* ERROR FEEDBACK IF APPLICABLE */}
            {step1Error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{step1Error}</span>
              </div>
            )}

            {/* STEP 1 PRIMARY CTA */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto min-h-[48px] h-12 px-8 rounded-btn bg-gold text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-xs flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>{locale === 'ar' ? 'متابعة لاختيار السيارة وعرض الأسعار' : 'Continue to Vehicles & Fares'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </form>
        )}

        {/* ============================================================== */}
        {/* STEP 2: SELECT YOUR VEHICLE & REVIEW THE FARE (KISWAH PATTERN) */}
        {/* ============================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            {/* TRIP SUMMARY BAR */}
            <div className="bg-bg-alt p-3.5 rounded-2xl border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-start">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-ink">
                  <MapPin className="w-4 h-4 text-gold-dark" />
                  <span>{routeTitle}</span>
                </div>
                <div className="flex items-center gap-1.5 text-ink-muted">
                  <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{date} • {time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-ink-muted">
                  <Users className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{passengers} Pax • {luggage} Bags</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-gold-dark hover:underline flex items-center gap-1 shrink-0 self-end sm:self-auto"
              >
                <Edit2 className="w-3 h-3" />
                <span>{locale === 'ar' ? 'تعديل الرحلة' : 'Edit Trip'}</span>
              </button>
            </div>

            {/* VEHICLE SELECTION CARDS GRID (KISWAH-INSPIRED SIDE-BY-SIDE DISPLAY) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-start">
              {FLEET_OPTIONS.map((carOpt) => {
                const fareSAR = activeRates[route]?.[carOpt.id] ?? BASE_RATES[route]?.[carOpt.id] ?? 260;
                const isSelected = vehicle === carOpt.id;
                const isOverPax = passengers > carOpt.seats;
                const isOverBags = luggage > carOpt.bags;

                return (
                  <div
                    key={carOpt.id}
                    onClick={() => setVehicle(carOpt.id)}
                    className={`rounded-2xl p-4 border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-gold bg-gold-soft/50 shadow-md ring-2 ring-gold/30'
                        : 'border-border bg-surface hover:border-gold-line hover:shadow-xs'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-gold text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-xs">
                        <Check className="w-3 h-3" />
                        <span>{locale === 'ar' ? 'الخيار المحدد' : 'Selected'}</span>
                      </div>
                    )}

                    {/* PHOTO & BASIC SPECS */}
                    <div>
                      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-bg-alt mb-3 border border-border/60">
                        <Image
                          src={carOpt.img}
                          alt={carOpt.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider">
                          {carOpt.category}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base sm:text-lg text-ink leading-tight mb-2">
                        {carOpt.name}
                      </h4>

                      {/* CAPACITY PILLS */}
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 ${
                            isOverPax
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-bg-alt text-ink border border-border'
                          }`}
                        >
                          <Users className="w-3 h-3 text-gold-dark" />
                          <span>{carOpt.seats} {dict.booking_card.passengersLabel}</span>
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 ${
                            isOverBags
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-bg-alt text-ink border border-border'
                          }`}
                        >
                          <Luggage className="w-3 h-3 text-gold-dark" />
                          <span>{carOpt.bags} {dict.booking_card.luggageLabel}</span>
                        </span>
                      </div>

                      {/* WARNING IF PASSENGERS EXCEED CAPACITY */}
                      {(isOverPax || isOverBags) && (
                        <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg mb-3 font-medium">
                          {locale === 'ar'
                            ? `تنبيه: يتجاوز عدد الركاب/الحقائب المختار سعة هذه السيارة.`
                            : `Note: Your group or bag count exceeds this car's recommended capacity.`}
                        </p>
                      )}
                    </div>

                    {/* PRICE & SELECT BUTTON */}
                    <div className="pt-3 border-t border-border mt-2 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-ink-muted uppercase block">
                          {locale === 'ar' ? 'السعر الثابت شامل الضريبة' : 'Fixed Total Fare'}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display font-bold text-xl sm:text-2xl text-ink">
                            {formatPrice(fareSAR)}
                          </span>
                          <span className="text-[11px] text-ink-muted font-normal">
                            ({fareSAR} SAR)
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setVehicle(carOpt.id);
                        }}
                        className={`min-h-[40px] px-4 rounded-btn text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-slate-950 text-gold shadow-xs'
                            : 'bg-bg-alt text-ink hover:bg-gold-soft border border-border'
                        }`}
                      >
                        {isSelected ? (locale === 'ar' ? 'تم الاختيار' : 'Selected') : (locale === 'ar' ? 'اختيار' : 'Select')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* STEP 2 CONTROLS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn border border-border text-ink text-xs font-semibold hover:bg-bg-alt transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{locale === 'ar' ? 'الرجوع لتعديل الرحلة' : 'Back to Trip Details'}</span>
              </button>

              <button
                type="button"
                onClick={handleProceedToReview}
                className="w-full sm:w-auto min-h-[48px] h-12 px-8 rounded-btn bg-gold text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-xs flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>{locale === 'ar' ? 'متابعة لتفاصيل المسافر والتأكيد' : 'Continue to Booking Details'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 3: CUSTOMER DETAILS & BOOKING CONFIRMATION                */}
        {/* ============================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn text-start">
            {/* COMPLETE REVIEW SUMMARY CARD */}
            <div className="bg-bg-alt/80 rounded-2xl p-5 border border-border grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-xs">
                <span className="text-[11px] font-bold text-gold-dark uppercase tracking-widest block">
                  {locale === 'ar' ? 'ملخص الرحلة المعتمد' : 'Confirmed Journey Summary'}
                </span>
                <div className="flex items-center gap-2 text-ink font-bold text-sm">
                  <MapPin className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>{routeTitle}</span>
                </div>
                <div className="flex items-center gap-2 text-ink-muted">
                  <Calendar className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>{date} • {time}</span>
                </div>
                <div className="flex items-center gap-2 text-ink-muted">
                  <Car className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>{currentVehicleSpec.name} ({passengers} Pax • {luggage} Bags)</span>
                </div>
                {flightNumber && (
                  <div className="flex items-center gap-2 text-ink-muted">
                    <Plane className="w-4 h-4 text-gold-dark shrink-0" />
                    <span>Flight: {flightNumber} (Tracked)</span>
                  </div>
                )}
              </div>

              {/* CONFIRMED SAR PRICE BOX */}
              <div className="flex flex-col justify-between p-4 rounded-xl bg-surface border border-border">
                <div>
                  <span className="text-xs text-ink-muted block mb-0.5">
                    {dict.booking_card.totalFare}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-3xl sm:text-4xl text-ink">
                      {formatPrice(baseSAR)}
                    </span>
                    <span className="text-xs text-ink-muted font-normal">
                      ({baseSAR} SAR)
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{locale === 'ar' ? '100% الدفع عند الوصول نقداً للسائق' : '100% Pay upon arrival in cash to chauffeur'}</span>
                  </p>
                </div>
                <div className="text-[11px] text-ink-muted pt-2 border-t border-border/60 mt-2">
                  <span>{locale === 'ar' ? 'شامل رسوم الطرق السريعة ومواقف المطار والوقود • إلغاء مجاني' : 'Tolls, airport parking & fuel included • Free cancellation'}</span>
                </div>
              </div>
            </div>

            {/* CUSTOMER INFORMATION INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="card-cust-name" className="block text-xs font-bold text-ink mb-1.5">
                  {locale === 'ar' ? 'اسم المسافر / المتواصل' : 'Passenger Full Name'} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="card-cust-name"
                    type="text"
                    required
                    placeholder={locale === 'ar' ? 'الاسم بالكامل' : 'e.g. Abdullah Rahman'}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <User className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="card-cust-phone" className="block text-xs font-bold text-ink mb-1.5">
                  {locale === 'ar' ? 'رقم الواتساب مع مفتاح الدولة' : 'WhatsApp Number (with country code)'} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="card-cust-phone"
                    type="tel"
                    required
                    placeholder="+966 50 123 4567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Phone className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="card-cust-notes" className="block text-xs font-bold text-ink mb-1.5">
                {locale === 'ar' ? 'ملاحظات خاصة (مقعد طفل، مساعدة حقائب، إلخ)' : 'Special Requests (Child seat, luggage assistance, etc.)'}
              </label>
              <textarea
                id="card-cust-notes"
                rows={2}
                placeholder={locale === 'ar' ? 'أي متطلبات إضافية لرحلتك...' : 'Any additional requirements for your pilgrimage...'}
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full p-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold resize-none"
              />
            </div>

            {/* BOT PROTECTION */}
            <TurnstileWidget
              locale={locale}
              onSuccess={(t) => setTurnstileToken(t)}
              onExpire={() => setTurnstileToken('')}
            />

            {/* DUAL ACTION BUTTONS (WHATSAPP + ONLINE BOOKING) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn border border-border text-ink text-xs font-semibold hover:bg-bg-alt transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold order-3 sm:order-1"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{locale === 'ar' ? 'الرجوع لاختيار سيارة أخرى' : 'Back to Vehicles'}</span>
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
                {/* WHATSAPP CTA */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  disabled={isSubmittingWa}
                  className="w-full sm:w-auto min-h-[48px] h-12 px-7 rounded-btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {isSubmittingWa
                      ? '...'
                      : (locale === 'ar' ? 'تأكيد الحجز عبر واتساب' : 'Continue on WhatsApp')}
                  </span>
                </button>

                {/* ONLINE PORTAL BOOKING OPTION */}
                <button
                  type="button"
                  onClick={handleFullOnlineBooking}
                  className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn bg-gold text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-xs flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <span>{dict.booking_card.bookOnline || 'Book Online'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>

            {/* FALLBACK BUTTON IF POPUP IS BLOCKED */}
            {waPopupUrl && (
              <div className="p-3 bg-gold-soft border border-gold-line rounded-lg text-center mt-2 animate-fadeIn">
                <p className="text-xs text-ink mb-1.5 font-medium">
                  {locale === 'ar'
                    ? 'تم تجهيز بيانات حجزك بنجاح؛ انقر للمتابعة عبر واتساب مباشرة:'
                    : 'Your booking details are ready; click below to continue on WhatsApp:'}
                </p>
                <a
                  href={waPopupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded shadow-xs hover:bg-emerald-700"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'فتح محادثة واتساب الآن' : 'Open WhatsApp Now'}</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
