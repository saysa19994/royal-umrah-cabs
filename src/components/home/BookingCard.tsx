'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { MapPin, Calendar, Clock, Users, Car, Check, ArrowRight } from 'lucide-react';

interface BookingCardProps {
  locale: Locale;
  dict: Dictionary;
}

export function BookingCard({ locale, dict }: BookingCardProps) {
  const router = useRouter();
  const [pickup, setPickup] = useState('jeddah-airport-to-makkah');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [passengers, setPassengers] = useState(2);
  const [vehicle, setVehicle] = useState('staria');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      route: pickup,
      date,
      time,
      passengers: passengers.toString(),
      vehicle,
    });
    router.push(`/${locale}/booking?${params.toString()}`);
  };

  return (
    <div className="relative z-30 px-4 -mt-16 sm:-mt-24 md:-mt-32 max-w-6xl mx-auto w-full">
      <div className="bg-surface rounded-2xl shadow-lg border border-border p-6 md:p-8">
        <div className="mb-5 text-start">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">
            {dict.booking_card.title}
          </h2>
          <p className="text-xs md:text-sm text-ink-muted mt-1 font-light">
            {dict.booking_card.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* FROM & TO (ROUTE) */}
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-ink mb-1.5 text-start">
                {dict.booking_card.pickupLabel} ↔ {dict.booking_card.dropoffLabel}
              </label>
              <div className="relative">
                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rtl:pr-10 rtl:pl-4 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold hover:border-gold-dark focus:outline-none focus:ring-1 focus:ring-gold-dark appearance-none cursor-pointer"
                >
                  <option value="jeddah-airport-to-makkah">Jeddah Airport (KAIA) → Makkah Hotel</option>
                  <option value="makkah-to-jeddah-airport">Makkah Hotel → Jeddah Airport (KAIA)</option>
                  <option value="makkah-to-madinah">Makkah Hotel → Madinah Hotel (Via Bir Ali)</option>
                  <option value="madinah-to-makkah">Madinah Hotel → Makkah Hotel (Via Miqat)</option>
                  <option value="madinah-airport-to-hotel">Madinah Airport (MED) → Madinah Hotel</option>
                  <option value="jeddah-to-madinah">Jeddah Airport / Hotel → Madinah Hotel</option>
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
                  required
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
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium hover:border-gold-dark focus:outline-none focus:ring-1 focus:ring-gold-dark cursor-pointer"
                />
                <Clock className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* PASSENGERS STEPPER (- 2 +) */}
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
          </div>

          {/* SECOND ROW: VEHICLE SELECTION & GET PRICES BUTTON */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3.5 pt-1 items-end">
            <div className="lg:col-span-3">
              <label className="block text-xs font-bold text-ink mb-1.5 text-start">
                {dict.booking_card.vehicleLabel}
              </label>
              <div className="relative">
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rtl:pr-10 rtl:pl-4 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold hover:border-gold-dark focus:outline-none focus:ring-1 focus:ring-gold-dark appearance-none cursor-pointer"
                >
                  <option value="staria">Hyundai Staria VIP (Up to 7 Seats • Family Van)</option>
                  <option value="yukon">GMC Yukon XL VIP (Up to 7 Seats • Luxury SUV)</option>
                  <option value="camry">Toyota Camry Executive (Up to 4 Seats • Sedan)</option>
                  <option value="hiace">Toyota HiAce VIP (Up to 10 Seats • Mini Bus)</option>
                  <option value="coaster">Toyota Coaster Coach (Up to 21 Seats • Group Bus)</option>
                </select>
                <Car className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full h-12 rounded-btn bg-gold text-ink font-bold text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{dict.booking_card.buttonCalculate}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* MICRO TRUST STRIP */}
          <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-gold-dark" />
              <span>{dict.trust_strip.fixedPrices}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-gold-dark" />
              <span>{dict.trust_strip.freeCancellation}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-gold-dark" />
              <span>{dict.trust_strip.payOnArrival}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-gold-dark" />
              <span>{dict.trust_strip.noHiddenFees}</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
