'use client';

import React, { useState } from 'react';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  Users,
  Luggage,
  Plane,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { TurnstileWidget } from '@/components/common/TurnstileWidget';
import { getEstimatedBasePriceSAR } from '@/lib/pricing-constants';
import { trackEvent } from '@/lib/analytics';

interface BookingEngineProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
  initialRoute?: string;
  initialVehicle?: string;
  initialDate?: string;
  initialTime?: string;
  initialPassengers?: string;
  initialLuggage?: string;
}

const VEHICLE_SPECS: Record<string, { name: string; seats: number; bags: number }> = {
  camry: { name: 'Toyota Camry Executive', seats: 4, bags: 3 },
  staria: { name: 'Hyundai Staria VIP', seats: 7, bags: 6 },
  yukon: { name: 'GMC Yukon XL VIP', seats: 7, bags: 8 },
  hiace: { name: 'Toyota HiAce VIP', seats: 10, bags: 10 },
  coaster: { name: 'Toyota Coaster Coach', seats: 21, bags: 20 },
};

const ROUTES: Record<string, { label: string; baseSAR: number }> = {
  'jeddah-airport-to-makkah': { label: 'Jeddah Airport (KAIA) → Makkah Hotel', baseSAR: 200 },
  'makkah-to-jeddah-airport': { label: 'Makkah Hotel → Jeddah Airport (KAIA)', baseSAR: 200 },
  'makkah-to-madinah': { label: 'Makkah Hotel → Madinah Hotel (Via Bir Ali)', baseSAR: 450 },
  'madinah-to-makkah': { label: 'Madinah Hotel → Makkah Hotel (Via Miqat)', baseSAR: 450 },
  'madinah-airport-to-hotel': { label: 'Madinah Airport (MED) → Madinah Hotel', baseSAR: 150 },
  'jeddah-to-madinah': { label: 'Jeddah Airport / Hotel → Madinah Hotel', baseSAR: 680 },
};

export function BookingEngine({
  locale,
  dict,
  settings,
  initialRoute = 'jeddah-airport-to-makkah',
  initialVehicle = 'staria',
  initialDate = '',
  initialTime = '14:00',
  initialPassengers = '2',
  initialLuggage = '2',
}: BookingEngineProps) {
  const { currency, formatPrice } = useCurrency();

  const [bookingType, setBookingType] = useState<'transfer' | 'hourly' | 'ziyarat' | 'group_bus'>('transfer');
  const [routeId, setRouteId] = useState(initialRoute);
  const [vehicleId, setVehicleId] = useState(initialVehicle);
  const [pickupDate, setPickupDate] = useState(initialDate);
  const [pickupTime, setPickupTime] = useState(initialTime);
  const [passengers, setPassengers] = useState(Number(initialPassengers) || 2);
  const [luggage, setLuggage] = useState(Number(initialLuggage) || 2);
  const [flightNumber, setFlightNumber] = useState('');

  const maxVehicleSeats = VEHICLE_SPECS[vehicleId]?.seats || 7;
  const maxVehicleBags = VEHICLE_SPECS[vehicleId]?.bags || 6;

  const handleSelectVehicle = (id: string) => {
    setVehicleId(id);
    const spec = VEHICLE_SPECS[id];
    if (spec) {
      if (passengers > spec.seats) setPassengers(spec.seats);
      if (luggage > spec.bags) setLuggage(spec.bags);
    }
  };

  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Add-ons
  const [addOns, setAddOns] = useState({
    child_seat: false,
    flight_tracking: true,
    malay_driver: false,
    zamzam_water: true,
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'pay_upon_arrival' | 'online_card' | 'bank_transfer'>('pay_upon_arrival');

  // State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  // Price calculation strictly synced with database
  const calculateCurrentPriceSAR = () => {
    const calculated = getEstimatedBasePriceSAR({
      bookingType,
      routeId: bookingType === 'transfer' ? routeId : null,
      vehicleId,
    });
    return calculated || 200;
  };

  const currentPriceSAR = calculateCurrentPriceSAR();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const pickupLocation =
      bookingType === 'transfer'
        ? ROUTES[routeId]?.label.split('→')[0].trim() || 'Jeddah Airport (KAIA)'
        : 'Makkah Hotel';
    const dropoffLocation =
      bookingType === 'transfer'
        ? ROUTES[routeId]?.label.split('→')[1]?.trim() || 'Makkah Hotel'
        : 'Holy Sites / City Tour';

    const payload = {
      booking_type: bookingType,
      route_id: bookingType === 'transfer' ? routeId : null,
      vehicle_id: vehicleId,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail || undefined,
      pickup_datetime: `${pickupDate} ${pickupTime}`,
      pickup_location: pickupLocation,
      dropoff_location: dropoffLocation,
      passengers_count: passengers,
      luggage_count: luggage,
      flight_number: flightNumber || undefined,
      add_ons: addOns,
      special_notes: specialNotes || undefined,
      payment_method: paymentMethod,
      currency: currency,
      language: locale,
      'cf-turnstile-response': turnstileToken,
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        trackEvent({
          event: 'booking_form_validation_failed',
          form: 'booking_engine',
          failed_fields: [data.error || 'submission_failed'],
        });
        throw new Error(data.error || 'Failed to submit booking');
      }

      trackEvent({
        event: 'booking_request_saved',
        booking_reference: data.booking?.reference,
        service_type: bookingType,
        payment_method: paymentMethod,
      });
      trackEvent({
        event: 'booking_confirmed',
        booking_reference: data.booking?.reference || '',
        service_type: bookingType,
        payment_method: paymentMethod,
        total_sar: data.booking?.finalPriceSAR || currentPriceSAR,
      });

      setConfirmedBooking(data.booking);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // IF CONFIRMED, RENDER CONFIRMATION VIEW
  if (confirmedBooking) {
    return (
      <div className="bg-surface rounded-2xl border border-border p-8 md:p-12 shadow-sm text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-gold-soft border border-gold-line text-gold-dark flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="font-display font-bold text-3xl text-ink">
          {dict.booking_modal.title}
        </h2>
        <p className="text-xs text-ink-muted mt-1 uppercase tracking-widest font-semibold">
          {dict.booking_modal.referenceLabel}:{' '}
          <span className="text-gold-dark font-extrabold text-sm">{confirmedBooking.reference}</span>
        </p>

        {/* BOOKING DETAILS CARD */}
        <div className="bg-bg-alt/70 rounded-xl p-5 border border-border my-6 text-start text-xs space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-ink-muted">{dict.booking_modal.routeLabel}:</span>
            <span className="font-bold text-ink">
              {confirmedBooking.pickup_location} → {confirmedBooking.dropoff_location}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ink-muted">{dict.booking_modal.vehicleLabel}:</span>
            <span className="font-bold text-ink capitalize">{confirmedBooking.vehicle_id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ink-muted">{dict.booking_modal.datetimeLabel}:</span>
            <span className="font-bold text-ink">{confirmedBooking.pickup_datetime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ink-muted">{dict.booking_card.passengersLabel} &amp; {dict.booking_card.luggageLabel}:</span>
            <span className="font-bold text-ink">
              {confirmedBooking.passengers_count || 1} {dict.booking_card.passengersLabel} • {confirmedBooking.luggage_count || 1} {dict.booking_card.luggageLabel}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border text-sm">
            <span className="font-bold text-ink">{dict.booking_modal.totalFareLabel}:</span>
            <span className="font-display font-extrabold text-gold-dark text-lg">
              {formatPrice(confirmedBooking.finalPriceSAR)}
            </span>
          </div>
        </div>

        <p className="text-xs text-ink-muted leading-relaxed mb-6 font-light">
          {dict.booking_modal.messageSentNotice}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={confirmedBooking.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent({
                event: 'whatsapp_handoff_initiated',
                source: 'booking_engine',
                booking_reference: confirmedBooking.reference,
              });
            }}
            className="h-12 px-8 rounded-btn bg-whatsapp hover:bg-whatsapp-hover text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{dict.booking_modal.confirmWhatsAppBtn}</span>
          </a>
          <button
            type="button"
            onClick={() => setConfirmedBooking(null)}
            className="h-12 px-6 rounded-btn border border-border-strong text-ink text-xs font-semibold hover:bg-bg-alt transition-colors"
          >
            {dict.booking_modal.closeBtn}
          </button>
        </div>
      </div>
    );
  }

  // RENDER INTERACTIVE BOOKING FORM
  return (
    <div className="bg-surface rounded-2xl border border-border p-6 md:p-10 shadow-sm">
      {/* 4 TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-bg-alt p-1.5 rounded-xl border border-border mb-8">
        <button
          type="button"
          onClick={() => setBookingType('transfer')}
          className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
            bookingType === 'transfer' ? 'bg-gold text-ink shadow-xs' : 'text-ink-muted hover:text-ink'
          }`}
        >
          📍 Transfer (Airport/City)
        </button>
        <button
          type="button"
          onClick={() => setBookingType('hourly')}
          className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
            bookingType === 'hourly' ? 'bg-gold text-ink shadow-xs' : 'text-ink-muted hover:text-ink'
          }`}
        >
          ⏱️ Hourly Chauffeur
        </button>
        <button
          type="button"
          onClick={() => setBookingType('ziyarat')}
          className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
            bookingType === 'ziyarat' ? 'bg-gold text-ink shadow-xs' : 'text-ink-muted hover:text-ink'
          }`}
        >
          🕌 Ziyarat Holy Sites
        </button>
        <button
          type="button"
          onClick={() => setBookingType('group_bus')}
          className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
            bookingType === 'group_bus' ? 'bg-gold text-ink shadow-xs' : 'text-ink-muted hover:text-ink'
          }`}
        >
          👥 Group &amp; Bus Coach
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-start">
        {/* STEP 1: ROUTE & SCHEDULE */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-xl text-ink border-b border-border pb-2">
            1. Trip &amp; Travel Schedule
          </h3>

          {bookingType === 'transfer' && (
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">Select Route</label>
              <div className="relative">
                <select
                  value={routeId}
                  onChange={(e) => setRouteId(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 rtl:pr-10 rtl:pl-4 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-gold-dark appearance-none cursor-pointer"
                >
                  {Object.entries(ROUTES).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <MapPin className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">{dict.booking_card.dateLabel}</label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gold-dark cursor-pointer"
                />
                <Calendar className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">{dict.booking_card.timeLabel}</label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gold-dark cursor-pointer"
                />
                <Clock className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">Flight Number (Optional)</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. SV 124 or MH 150"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gold-dark"
                />
                <Plane className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* PASSENGERS & LUGGAGE STEPPERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">{dict.booking_card.passengersLabel}</label>
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
                  onClick={() => setPassengers(Math.min(maxVehicleSeats, passengers + 1))}
                  aria-label="Increase Passengers"
                  className="w-8 h-8 rounded flex items-center justify-center text-ink-muted hover:text-gold-dark hover:bg-bg-alt font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">{dict.booking_card.luggageLabel}</label>
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
                  onClick={() => setLuggage(Math.min(maxVehicleBags, luggage + 1))}
                  aria-label="Increase Luggage"
                  className="w-8 h-8 rounded flex items-center justify-center text-ink-muted hover:text-gold-dark hover:bg-bg-alt font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2: VEHICLE CHOICE */}
        <div className="space-y-4 pt-4">
          <h3 className="font-display font-bold text-xl text-ink border-b border-border pb-2">
            2. Choose Your Vehicle
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(VEHICLE_SPECS).map(([vId, vData]) => {
              const isSelected = vehicleId === vId;
              const vehicleEstimatedFare =
                getEstimatedBasePriceSAR({
                  bookingType,
                  routeId: bookingType === 'transfer' ? routeId : null,
                  vehicleId: vId,
                }) || 200;
              return (
                <div
                  key={vId}
                  onClick={() => handleSelectVehicle(vId)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-gold bg-gold-soft/30 shadow-xs'
                      : 'border-border bg-surface hover:border-gold-line'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-ink">{vData.name}</span>
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => handleSelectVehicle(vId)}
                        className="text-gold"
                      />
                    </div>
                    <div className="text-xs text-ink-muted space-y-1">
                      <p>👥 Up to {vData.seats} Seats</p>
                      <p>🧳 {vData.bags} Luggage Bags</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-border flex items-baseline justify-between">
                    <span className="text-[11px] text-ink-muted">Estimated Fare:</span>
                    <span className="font-display font-bold text-base text-ink">
                      {formatPrice(vehicleEstimatedFare)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 3: CUSTOMER DETAILS & ADD-ONS */}
        <div className="space-y-4 pt-4">
          <h3 className="font-display font-bold text-xl text-ink border-b border-border pb-2">
            3. Passenger &amp; Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">Lead Pilgrim Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Haji Ahmad"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gold-dark"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">WhatsApp / Phone (with Country Code) *</label>
              <input
                type="tel"
                required
                placeholder="+60 12 345 6789 or +966..."
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gold-dark"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">Email Address (Optional)</label>
              <input
                type="email"
                placeholder="ahmad@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-1 focus:ring-gold-dark"
              />
            </div>
          </div>

          {/* ADD-ONS CHECKBOXES */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-ink mb-2">Trip Preferences &amp; Add-ons</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <label className="flex items-center gap-2 p-3 rounded-btn bg-bg-alt/60 border border-border cursor-pointer">
                <input
                  type="checkbox"
                  checked={addOns.child_seat}
                  onChange={(e) => setAddOns({ ...addOns, child_seat: e.target.checked })}
                  className="rounded text-gold"
                />
                <span>Child Safety Seat (Complimentary)</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-btn bg-bg-alt/60 border border-border cursor-pointer">
                <input
                  type="checkbox"
                  checked={addOns.flight_tracking}
                  onChange={(e) => setAddOns({ ...addOns, flight_tracking: e.target.checked })}
                  className="rounded text-gold"
                />
                <span>Free Flight Delay Tracking</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-btn bg-bg-alt/60 border border-border cursor-pointer">
                <input
                  type="checkbox"
                  checked={addOns.malay_driver}
                  onChange={(e) => setAddOns({ ...addOns, malay_driver: e.target.checked })}
                  className="rounded text-gold"
                />
                <span>Malay/English Chauffeur</span>
              </label>

              <label className="flex items-center gap-2 p-3 rounded-btn bg-bg-alt/60 border border-border cursor-pointer">
                <input
                  type="checkbox"
                  checked={addOns.zamzam_water}
                  onChange={(e) => setAddOns({ ...addOns, zamzam_water: e.target.checked })}
                  className="rounded text-gold"
                />
                <span>Chilled Zamzam Water</span>
              </label>
            </div>
          </div>

          {/* STEP 4: PAYMENT OPTIONS */}
          <div className="pt-6 border-t border-border">
            <h3 className="font-display font-bold text-lg text-ink mb-1">
              4. Payment Method / طريقة الدفع
            </h3>
            <p className="text-xs text-ink-muted mb-4 font-light">
              Select your preferred payment arrangement. Transparent guaranteed fixed fares.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => setPaymentMethod('pay_upon_arrival')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'pay_upon_arrival'
                    ? 'border-gold bg-gold-soft/40 shadow-sm ring-1 ring-gold'
                    : 'border-border bg-surface hover:border-border-strong'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-ink">Pay Upon Arrival</span>
                  <input
                    type="radio"
                    name="booking_payment_method"
                    checked={paymentMethod === 'pay_upon_arrival'}
                    onChange={() => setPaymentMethod('pay_upon_arrival')}
                    className="text-gold"
                  />
                </div>
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  No prepayment required. Pay cash (SAR, USD, MYR) or card directly to your chauffeur upon reaching your destination.
                </p>
              </div>

              <div
                onClick={() => setPaymentMethod('online_card')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'online_card'
                    ? 'border-gold bg-gold-soft/40 shadow-sm ring-1 ring-gold'
                    : 'border-border bg-surface hover:border-border-strong'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-ink">Online Card / Mada</span>
                  <input
                    type="radio"
                    name="booking_payment_method"
                    checked={paymentMethod === 'online_card'}
                    onChange={() => setPaymentMethod('online_card')}
                    className="text-gold"
                  />
                </div>
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  Secure digital payment link (Visa, Mastercard, Mada, Apple Pay) sent via WhatsApp / Email upon confirmation.
                </p>
              </div>

              <div
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-gold bg-gold-soft/40 shadow-sm ring-1 ring-gold'
                    : 'border-border bg-surface hover:border-border-strong'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-ink">Saudi Bank Transfer</span>
                  <input
                    type="radio"
                    name="booking_payment_method"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="text-gold"
                  />
                </div>
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  Direct transfer to verified Saudi corporate IBAN with instant official digital receipt.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ERROR DISPLAY */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* BOT PROTECTION */}
        <div className="py-2 border-t border-border">
          <TurnstileWidget
            locale={locale}
            onSuccess={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken('')}
          />
        </div>

        {/* SUBMISSION BAR */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-ink-muted block">{dict.booking_card.totalFare}</span>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl md:text-4xl text-ink">
                {formatPrice(currentPriceSAR)}
              </span>
              <span className="text-xs font-bold text-whatsapp bg-whatsapp/10 px-2.5 py-0.5 rounded-full">
                Guaranteed Fixed Fare
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="submit"
              disabled={isSubmitting || !turnstileToken}
              className="w-full sm:w-auto h-12 px-10 rounded-btn bg-gold hover:bg-gold-hover hover:text-white text-ink text-sm font-bold uppercase tracking-wider transition-all shadow-gold disabled:opacity-50"
            >
              {isSubmitting ? 'Confirming...' : dict.booking_card.buttonBookNow}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
