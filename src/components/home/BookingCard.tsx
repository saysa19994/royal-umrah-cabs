'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale, CURRENCIES, CurrencyCode } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import { MapPin, Calendar, Clock, Users, Luggage, Car, Check, ArrowRight, MessageCircle } from 'lucide-react';

interface BookingCardProps {
  locale: Locale;
  dict: Dictionary;
}

// Database rate matrix in SAR
const BASE_RATES: Record<string, Record<string, number>> = {
  'jeddah-airport-to-makkah': { camry: 200, staria: 260, yukon: 380, hiace: 340, coaster: 650 },
  'makkah-to-jeddah-airport': { camry: 200, staria: 260, yukon: 380, hiace: 340, coaster: 650 },
  'makkah-to-madinah': { camry: 450, staria: 500, yukon: 750, hiace: 650, coaster: 1200 },
  'madinah-to-makkah': { camry: 450, staria: 500, yukon: 750, hiace: 650, coaster: 1200 },
  'madinah-airport-to-hotel': { camry: 150, staria: 200, yukon: 300, hiace: 270, coaster: 550 },
  'jeddah-to-madinah': { camry: 680, staria: 750, yukon: 1050, hiace: 900, coaster: 1600 },
};

const ROUTE_LABELS: Record<string, { en: string; ar: string; ms: string }> = {
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

const VEHICLE_NAMES: Record<string, string> = {
  staria: 'Hyundai Staria VIP (Up to 7 Seats)',
  yukon: 'GMC Yukon XL VIP (Up to 7 Seats)',
  camry: 'Toyota Camry Sedan (Up to 4 Seats)',
  hiace: 'Toyota HiAce Minibus (Up to 11 Seats)',
  coaster: 'Toyota Coaster Coach (Up to 19 Seats)',
};

export function BookingCard({ locale, dict }: BookingCardProps) {
  const router = useRouter();
  const { currency, setCurrency, formatPrice } = useCurrency();

  const [route, setRoute] = useState('jeddah-airport-to-makkah');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [passengers, setPassengers] = useState(3);
  const [luggage, setLuggage] = useState(3);
  const [vehicle, setVehicle] = useState('staria');

  // Calculate live price
  const baseSAR = BASE_RATES[route]?.[vehicle];

  const handleBookOnline = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      route,
      date,
      time,
      passengers: passengers.toString(),
      luggage: luggage.toString(),
      vehicle,
    });
    router.push(`/${locale}/booking?${params.toString()}`);
  };

  const handleWhatsApp = () => {
    const routeText = ROUTE_LABELS[route]?.[locale] || route;
    const vehicleText = VEHICLE_NAMES[vehicle] || vehicle;
    const priceText = baseSAR ? `${baseSAR} SAR` : 'Quote Requested';

    let msg = '';
    if (locale === 'ar') {
      msg =
        `السلام عليكم، أود حجز رحلة عمرة خاصة عبر رويال كاب للعمرة:\n` +
        `*المسار:* ${routeText}\n` +
        `*نوع السيارة:* ${vehicleText}\n` +
        (date ? `*التاريخ:* ${date} (${time})\n` : '') +
        `*عدد الركاب:* ${passengers} | *الحقائب:* ${luggage}\n` +
        `*السعر الثابت:* ${priceText}\n\n` +
        `يرجى تأكيد الحجز وإرسال بيانات السائق.`;
    } else if (locale === 'ms') {
      msg =
        `Salam sejahtera, saya ingin menempah kenderaan Umrah persendirian:\n` +
        `*Laluan:* ${routeText}\n` +
        `*Kenderaan:* ${vehicleText}\n` +
        (date ? `*Tarikh:* ${date} (${time})\n` : '') +
        `*Bilangan Penumpang:* ${passengers} | *Bagasi:* ${luggage}\n` +
        `*Kadar Tambang:* ${priceText}\n\n` +
        `Sila sahkan tempahan saya. Terima kasih.`;
    } else {
      msg =
        `Hello Royal Umrah Cabs dispatch,\n` +
        `I would like to reserve a private transfer:\n` +
        `*Route:* ${routeText}\n` +
        `*Vehicle:* ${vehicleText}\n` +
        (date ? `*Date & Time:* ${date} at ${time}\n` : '') +
        `*Passengers:* ${passengers} | *Luggage Bags:* ${luggage}\n` +
        `*Fixed Price:* ${priceText}\n\n` +
        `Please confirm availability. Thank you!`;
    }

    window.open(`https://wa.me/966567588261?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="relative z-30 px-4 -mt-16 sm:-mt-24 md:-mt-32 max-w-6xl mx-auto w-full">
      <div className="bg-surface rounded-2xl shadow-xl border border-border p-6 md:p-8">
        {/* Card Header & Currency Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-border text-start">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
              {dict.booking_card.title}
            </h2>
            <p className="text-xs md:text-sm text-ink-muted mt-0.5 font-light">
              {dict.booking_card.subtitle}
            </p>
          </div>

          {/* Quick Currency Selector */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto bg-surface-muted p-1 rounded-lg border border-border">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={`px-2 py-0.5 text-xs font-bold rounded transition-all ${
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

        <form onSubmit={handleBookOnline} className="space-y-4">
          {/* FIRST ROW: ROUTE, DATE, TIME */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* FROM & TO (ROUTE) */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-bold text-ink mb-1.5 text-start">
                {dict.booking_card.pickupLabel} ↔ {dict.booking_card.dropoffLabel}
              </label>
              <div className="relative">
                <select
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rtl:pr-10 rtl:pl-4 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold hover:border-gold-dark focus:outline-none focus:ring-1 focus:ring-gold-dark appearance-none cursor-pointer"
                >
                  {Object.keys(ROUTE_LABELS).map((key) => (
                    <option key={key} value={key}>
                      {ROUTE_LABELS[key][locale] || ROUTE_LABELS[key].en}
                    </option>
                  ))}
                </select>
                <MapPin className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* DATE */}
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5 text-start">
                {dict.booking_card.dateLabel}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium hover:border-gold-dark focus:outline-none focus:ring-1 focus:ring-gold-dark cursor-pointer"
                />
                <Calendar className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* TIME */}
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5 text-start">
                {dict.booking_card.timeLabel}
              </label>
              <div className="relative">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium hover:border-gold-dark focus:outline-none focus:ring-1 focus:ring-gold-dark cursor-pointer"
                />
                <Clock className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
              <div className="flex items-center justify-between w-full h-12 rounded-btn border border-border-strong bg-surface px-3">
                <button
                  type="button"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  aria-label="Decrease Passengers"
                  className="w-8 h-8 rounded flex items-center justify-center text-ink-muted hover:text-gold-dark hover:bg-bg-alt font-bold text-lg"
                >
                  −
                </button>
                <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                  <Users className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{passengers}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setPassengers(Math.min(25, passengers + 1))}
                  aria-label="Increase Passengers"
                  className="w-8 h-8 rounded flex items-center justify-center text-ink-muted hover:text-gold-dark hover:bg-bg-alt font-bold text-lg"
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
              <div className="flex items-center justify-between w-full h-12 rounded-btn border border-border-strong bg-surface px-3">
                <button
                  type="button"
                  onClick={() => setLuggage(Math.max(0, luggage - 1))}
                  aria-label="Decrease Luggage"
                  className="w-8 h-8 rounded flex items-center justify-center text-ink-muted hover:text-gold-dark hover:bg-bg-alt font-bold text-lg"
                >
                  −
                </button>
                <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                  <Luggage className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{luggage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLuggage(Math.min(25, luggage + 1))}
                  aria-label="Increase Luggage"
                  className="w-8 h-8 rounded flex items-center justify-center text-ink-muted hover:text-gold-dark hover:bg-bg-alt font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* VEHICLE CLASS SELECTOR */}
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-bold text-ink mb-1.5 text-start">
                {dict.booking_card.vehicleLabel}
              </label>
              <div className="relative">
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rtl:pr-10 rtl:pl-4 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold hover:border-gold-dark focus:outline-none focus:ring-1 focus:ring-gold-dark appearance-none cursor-pointer"
                >
                  <option value="staria">Hyundai Staria VIP (Up to 7 Seats • 6 Bags)</option>
                  <option value="yukon">GMC Yukon XL VIP (Up to 7 Seats • Luxury SUV)</option>
                  <option value="camry">Toyota Camry Sedan (Up to 4 Seats • 3 Bags)</option>
                  <option value="hiace">Toyota HiAce Minibus (Up to 11 Seats • 10 Bags)</option>
                  <option value="coaster">Toyota Coaster VIP Coach (Up to 19 Seats • 18 Bags)</option>
                </select>
                <Car className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* DYNAMIC PRICE DISPLAY & DUAL BUTTONS */}
          <div className="bg-surface-muted rounded-xl p-4 border border-border mt-3 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-start">
              <span className="text-xs text-ink-muted block mb-0.5">
                {dict.booking_card.totalFare}
              </span>
              {baseSAR ? (
                <div className="flex items-baseline gap-2 justify-center md:justify-start">
                  <span className="font-display text-3xl font-bold text-gold-dark">
                    {formatPrice(baseSAR)}
                  </span>
                  {currency !== 'SAR' && (
                    <span className="text-xs text-ink-muted font-mono font-medium">
                      ({baseSAR} SAR)
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-sm font-bold text-amber-700">
                  {dict.booking_card.quoteNeeded}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* BUTTON 1: BOOK ONLINE */}
              <button
                type="submit"
                className="w-full sm:w-auto h-12 px-7 rounded-btn bg-gold text-ink font-bold text-xs uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
              >
                <span>{dict.booking_card.bookOnline}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              {/* BUTTON 2: CONTINUE ON WHATSAPP */}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full sm:w-auto h-12 px-6 rounded-btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shrink-0 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{dict.booking_card.continueWhatsApp}</span>
              </button>
            </div>
          </div>

          {/* MICRO TRUST STRIP (4 ITEMS) */}
          <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5 text-gold-dark" />
              <span>{dict.booking_card.microCancellation}</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5 text-gold-dark" />
              <span>{dict.booking_card.microPayArrival}</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5 text-gold-dark" />
              <span>{dict.booking_card.microNoHidden}</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5 text-gold-dark" />
              <span>{dict.booking_card.microAllTolls}</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
