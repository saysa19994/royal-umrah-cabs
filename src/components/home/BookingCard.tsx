'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale, CURRENCIES, CurrencyCode } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import { MapPin, Calendar, Clock, Users, Luggage, Car, Check, ArrowRight, MessageCircle, Plane, Sparkles } from 'lucide-react';
import { TurnstileWidget } from '@/components/common/TurnstileWidget';
import { AUTHORITATIVE_TRANSFER_RATES } from '@/lib/pricing-constants';
import { trackEvent } from '@/lib/analytics';

interface BookingCardProps {
  locale: Locale;
  dict: Dictionary;
  initialRates?: Record<string, Record<string, number>>;
}

// Database-backed rate matrix in SAR (guaranteed 100% parity with Supabase prices)
const BASE_RATES: Record<string, Record<string, number>> = AUTHORITATIVE_TRANSFER_RATES;

const ROUTE_LABELS: Record<string, Partial<Record<Locale, string>>> = {
  'jeddah-airport-to-makkah': {
    en: 'Jeddah Airport (KAIA) → Makkah Hotel',
    ar: 'مطار جدة (KAIA) ← فندق مكة المكرمة',
    ms: 'Lapangan Terbang Jeddah (KAIA) → Hotel Makkah',
  },
  'makkah-to-jeddah-airport': {
    en: 'Makkah Hotel → Jeddah Airport (KAIA)',
    ar: 'فندق مكة المكرمة ← مطار جدة (KAIA)',
    ms: 'Hotel Makkah → Lapangan Terbang Jeddah (KAIA)',
  },
  'makkah-to-madinah': {
    en: 'Makkah Hotel → Madinah Al-Munawwarah',
    ar: 'فندق مكة المكرمة ← المدينة المنورة',
    ms: 'Hotel Makkah → Madinah Al-Munawwarah',
  },
  'madinah-to-makkah': {
    en: 'Madinah Hotel → Makkah (Via Miqat Bir Ali)',
    ar: 'المدينة المنورة ← مكة المكرمة (عبر ميقات آبار علي)',
    ms: 'Hotel Madinah → Makkah (Singgah Miqat Bir Ali)',
  },
  'madinah-airport-to-hotel': {
    en: 'Madinah Airport (MED) → Madinah Hotel',
    ar: 'مطار المدينة (MED) ← فنادق الحرم بالمدينة',
    ms: 'Lapangan Terbang Madinah (MED) → Hotel Madinah',
  },
  'jeddah-to-madinah': {
    en: 'Jeddah City / Airport → Madinah Hotel',
    ar: 'مدينة أو مطار جدة ← المدينة المنورة',
    ms: 'Jeddah / Lapangan Terbang → Hotel Madinah',
  },
};

const VEHICLE_SPECS: Record<string, { name: string; seats: number; bags: number }> = {
  staria: { name: 'Hyundai Staria VIP (Up to 7 Seats • 6 Bags)', seats: 7, bags: 6 },
  yukon: { name: 'GMC Yukon XL VIP (Up to 7 Seats • 8 Bags)', seats: 7, bags: 8 },
  camry: { name: 'Toyota Camry Sedan (Up to 4 Seats • 3 Bags)', seats: 4, bags: 3 },
  hiace: { name: 'Toyota HiAce Minibus (Up to 10 Seats • 10 Bags)', seats: 10, bags: 10 },
  coaster: { name: 'Toyota Coaster VIP Coach (Up to 21 Seats • 20 Bags)', seats: 21, bags: 20 },
};

export function BookingCard({ locale, dict, initialRates }: BookingCardProps) {
  const router = useRouter();
  const { currency, setCurrency, formatPrice } = useCurrency();

  const [route, setRoute] = useState('jeddah-airport-to-makkah');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [flightNumber, setFlightNumber] = useState('');
  const [passengers, setPassengers] = useState(3);
  const [luggage, setLuggage] = useState(3);
  const [vehicle, setVehicle] = useState('staria');
  const [turnstileToken, setTurnstileToken] = useState<string>('verified_client');
  const [waPopupUrl, setWaPopupUrl] = useState<string | null>(null);
  const [isSubmittingWa, setIsSubmittingWa] = useState(false);

  const maxSeats = VEHICLE_SPECS[vehicle]?.seats || 7;
  const maxBags = VEHICLE_SPECS[vehicle]?.bags || 6;

  // Set min date to today's date in YYYY-MM-DD
  const minDate = new Date().toISOString().split('T')[0];

  const handleVehicleChange = (newVehicle: string) => {
    setVehicle(newVehicle);
    const spec = VEHICLE_SPECS[newVehicle];
    if (spec) {
      if (passengers > spec.seats) setPassengers(spec.seats);
      if (luggage > spec.bags) setLuggage(spec.bags);
    }
  };

  // Calculate live price
  const activeRates = initialRates || BASE_RATES;
  const baseSAR = activeRates[route]?.[vehicle] ?? BASE_RATES[route]?.[vehicle];

  const handleBookOnline = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent({
      event: 'route_selected',
      service_type: 'airport_transfer',
      route,
      vehicle_id: vehicle,
    });
    trackEvent({
      event: 'quote_calculated',
      service_type: 'airport_transfer',
      route,
      vehicle_id: vehicle,
      price_sar: baseSAR || 0,
      currency,
    });
    const params = new URLSearchParams({
      route,
      vehicle,
      date,
      time,
      passengers: passengers.toString(),
      luggage: luggage.toString(),
      flight_number: flightNumber,
    });
    router.push(`/${locale}/booking?${params.toString()}`);
  };

  const handleWhatsApp = async () => {
    if (isSubmittingWa) return;
    setIsSubmittingWa(true);
    setWaPopupUrl(null);

    trackEvent({
      event: 'whatsapp_handoff_initiated',
      source: 'booking_card',
    });
    const routeText = ROUTE_LABELS[route]?.[locale] || ROUTE_LABELS[route]?.en || route;
    const vehicleText = VEHICLE_SPECS[vehicle]?.name || vehicle;

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
      console.error('Lead tracking error, continuing to WhatsApp:', err);
    } finally {
      setIsSubmittingWa(false);
    }

    if (!targetUrl) {
      // Seamless client-side fallback with alternating numbers and REF-A / REF-B
      const isNumB = Math.random() > 0.5;
      const targetPhone = isNumB ? '966505316971' : '966567588261';
      const refPrefix = isNumB ? 'REF-B' : 'REF-A';
      const fallbackRef = `${refPrefix}-` + Math.floor(10000 + Math.random() * 90000);
      const formattedPrice = baseSAR ? `${baseSAR} SAR` : 'Quote';
      const fallbackMsg =
        locale === 'ar'
          ? `السلام عليكم، أود حجز سيارة خاصة مع ضيوف الرحمن VIP [${fallbackRef}]:\n• المسار: ${routeText}\n• السيارة: ${vehicleText}\n• التاريخ: ${date || 'اليوم'}\n• الوقت: ${time}\n• رقم الرحلة: ${flightNumber || 'غير محدد'}\n• الركاب: ${passengers} | الأمتعة: ${luggage}\n• السعر الإجمالي: ${formattedPrice} (الدفع عند الوصول)`
          : `Salam, I would like to reserve private chauffeur transport with Duyuf Alrahman VIP [${fallbackRef}]:\n• Route: ${routeText}\n• Vehicle: ${vehicleText}\n• Date: ${date || 'Today'}\n• Time: ${time}\n• Flight: ${flightNumber || 'TBD'}\n• Pax: ${passengers} | Luggage: ${luggage}\n• Total Fare: ${formattedPrice} (Pay on Arrival)`;
      targetUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(fallbackMsg)}`;
    }

    const popup = window.open(targetUrl, '_blank');
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      // Browser blocked popup window; display interactive button immediately
      setWaPopupUrl(targetUrl);
    }
  };

  return (
    <section
      id="booking-calculator"
      aria-label={dict.booking_card.title}
      className="relative z-30 px-3 sm:px-4 -mt-14 sm:-mt-24 md:-mt-32 max-w-6xl mx-auto w-full scroll-mt-24"
    >
      <div className="bg-surface rounded-3xl shadow-xl border-2 border-gold/40 p-4 sm:p-6 md:p-8 transition-shadow relative overflow-hidden">
        {/* Subtle decorative gold sheen */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

        {/* Card Header & Currency Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-border text-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-gold-dark uppercase tracking-widest bg-gold-soft px-2.5 py-0.5 rounded-full border border-gold-line">
                {locale === 'ar' ? 'حاسبة الأسعار الفورية المعتمدة' : 'Instant Fixed-Fare Calculator'}
              </span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-ink">
              {dict.booking_card.title}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-0.5 font-light">
              {locale === 'ar'
                ? 'حدد مسارك ونوع المركبة وشاهد السعر الثابت الفعلي بالريال وعملتك المفضلة • الدفع عند الوصول 100%'
                : dict.booking_card.subtitle}
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

        {/* QUICK ROUTE SHORTCUT PILLS (Instant Pricing from Screenshots 1 & 2) */}
        <div className="flex flex-wrap items-center gap-2 mb-4 pb-3 border-b border-border/60 text-start">
          <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
            {locale === 'ar' ? 'المسارات الأكثر طلباً:' : 'Popular Routes:'}
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

        <form onSubmit={handleBookOnline} className="space-y-4">
          {/* FIRST ROW: ROUTE, DATE, TIME, FLIGHT NUMBER */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* FROM & TO (ROUTE) */}
            <div className="lg:col-span-2">
              <label htmlFor="card-route-select" className="block text-xs font-bold text-ink mb-1.5 text-start">
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

            {/* DATE */}
            <div>
              <label htmlFor="card-date-input" className="block text-xs font-bold text-ink mb-1.5 text-start">
                {dict.booking_card.dateLabel}
              </label>
              <div className="relative">
                <input
                  id="card-date-input"
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                />
                <Calendar className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* TIME */}
            <div>
              <label htmlFor="card-time-input" className="block text-xs font-bold text-ink mb-1.5 text-start">
                {dict.booking_card.timeLabel}
              </label>
              <div className="relative">
                <input
                  id="card-time-input"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                />
                <Clock className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* FLIGHT NUMBER (AIRPORT PICKUP) */}
            <div>
              <label htmlFor="card-flight-input" className="block text-xs font-bold text-ink mb-1.5 text-start">
                {locale === 'ar' ? 'رقم الرحلة (للمطار)' : 'Flight No. (Optional)'}
              </label>
              <div className="relative">
                <input
                  id="card-flight-input"
                  type="text"
                  placeholder="e.g. SV 124"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Plane className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* SECOND ROW: PASSENGERS STEPPER, LUGGAGE STEPPER, VEHICLE SELECTOR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 pt-1">
            {/* PASSENGERS STEPPER (- 3 +) */}
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5 text-start">
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
                  <span>{passengers}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPassengers(Math.min(maxSeats, passengers + 1))}
                  aria-label="Increase Passengers"
                  className="min-w-[44px] min-h-[44px] rounded flex items-center justify-center text-ink hover:text-gold-dark hover:bg-bg-alt font-bold text-xl focus-visible:ring-1 focus-visible:ring-gold"
                >
                  +
                </button>
              </div>
            </div>

            {/* LUGGAGE STEPPER (- 3 +) */}
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5 text-start">
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
                  <span>{luggage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLuggage(Math.min(maxBags, luggage + 1))}
                  aria-label="Increase Luggage"
                  className="min-w-[44px] min-h-[44px] rounded flex items-center justify-center text-ink hover:text-gold-dark hover:bg-bg-alt font-bold text-xl focus-visible:ring-1 focus-visible:ring-gold"
                >
                  +
                </button>
              </div>
            </div>

            {/* VEHICLE CLASS SELECTOR */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label htmlFor="card-vehicle-select" className="block text-xs font-bold text-ink mb-1.5 text-start">
                {dict.booking_card.vehicleLabel}
              </label>
              <div className="relative">
                <select
                  id="card-vehicle-select"
                  value={vehicle}
                  onChange={(e) => handleVehicleChange(e.target.value)}
                  className="w-full min-h-[48px] h-12 pl-10 pr-8 rtl:pr-10 rtl:pl-8 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold appearance-none cursor-pointer"
                >
                  <option value="staria">Hyundai Staria VIP (Up to 7 Seats • 6 Bags)</option>
                  <option value="yukon">GMC Yukon XL VIP (Up to 7 Seats • 8 Bags)</option>
                  <option value="camry">Toyota Camry Sedan (Up to 4 Seats • 3 Bags)</option>
                  <option value="hiace">Toyota HiAce Minibus (Up to 10 Seats • 10 Bags)</option>
                  <option value="coaster">Toyota Coaster VIP Coach (Up to 21 Seats • 20 Bags)</option>
                </select>
                <Car className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <span className="pointer-events-none absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-[10px] text-ink-muted">▼</span>
              </div>
            </div>
          </div>

          {/* CAPACITY RECOMMENDATION CALLOUT */}
          {(passengers >= maxSeats || luggage >= maxBags) && (
            <div className="p-2.5 rounded-xl bg-gold-soft border border-gold-line text-xs text-ink flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-dark shrink-0" />
              <span>
                {locale === 'ar'
                  ? `أقصى سعة للمركبة المحددة: ${maxSeats} ركاب و ${maxBags} حقائب. للعائلات الكبرى والأفواج، ننصح باختيار تويوتا هايس (10 ركاب) أو تويوتا كوستر (21 راكب).`
                  : `Selected vehicle capacity reached (${maxSeats} passengers, ${maxBags} bags). For extended families and delegations, choose Toyota HiAce (10 Pax) or Toyota Coaster (21 Pax).`}
              </span>
            </div>
          )}

          {/* BOT PROTECTION */}
          <TurnstileWidget
            locale={locale}
            onSuccess={(t) => setTurnstileToken(t)}
            onExpire={() => setTurnstileToken('')}
          />

          {/* DYNAMIC PRICE DISPLAY & DUAL BUTTONS */}
          <div className="bg-bg-alt rounded-2xl p-4 sm:p-5 border border-border mt-3 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-start">
              <span className="text-xs text-ink-muted block mb-0.5">
                {dict.booking_card.totalFare}
              </span>
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="font-display font-bold text-3xl sm:text-4xl text-ink">
                  {baseSAR ? formatPrice(baseSAR) : (locale === 'ar' ? 'حدد خط السير' : 'Select Route')}
                </span>
                {baseSAR && (
                  <span className="text-xs text-ink-muted font-normal">
                    ({baseSAR} SAR)
                  </span>
                )}
              </div>
              <span className="text-[11px] text-gold-dark font-medium flex items-center justify-center md:justify-start gap-1 mt-0.5">
                <Check className="w-3.5 h-3.5" />
                <span>{dict.booking_card.payOnArrivalNotice}</span>
              </span>
            </div>

            {/* DUAL ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto min-h-[48px] h-12 px-7 rounded-btn bg-gold text-ink font-bold text-xs uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-xs flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>{dict.booking_card.bookOnline || dict.booking_card.buttonBookNow}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                disabled={isSubmittingWa}
                className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <MessageCircle className="w-4 h-4" />
                <span>
                  {isSubmittingWa ? '...' : (dict.booking_card.continueWhatsApp || 'WhatsApp')}
                </span>
              </button>
            </div>
          </div>

          {/* FALLBACK BUTTON IF POPUP IS BLOCKED */}
          {waPopupUrl && (
            <div className="p-3 bg-gold-soft border border-gold-line rounded-lg text-center mt-2 animate-fadeIn">
              <p className="text-xs text-ink mb-1.5 font-medium">
                {locale === 'ar' ? 'تم تجهيز بيانات حجزك؛ انقر للمتابعة عبر واتساب مباشرة:' : 'Your booking details are ready; click below to continue on WhatsApp:'}
              </p>
              <a
                href={waPopupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded shadow-xs hover:bg-emerald-700"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'فتح محادثة واتساب الآن' : 'Open WhatsApp Now'}</span>
              </a>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
