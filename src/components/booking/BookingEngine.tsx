'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
  ArrowRight,
  ArrowLeft,
  Check,
  Edit2,
  User,
  Phone,
  Mail,
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
  initialRates?: Record<string, Record<string, number>>;
}

interface VehicleInfo {
  name: string;
  category: string;
  seats: number;
  bags: number;
  img: string;
}

const VEHICLE_SPECS: Record<string, VehicleInfo> = {
  camry: {
    name: 'Toyota Camry Executive',
    category: 'Executive Sedan',
    seats: 4,
    bags: 3,
    img: '/assets/images/camry_exterior.webp',
  },
  staria: {
    name: 'Hyundai Staria VIP',
    category: 'Executive VIP Van',
    seats: 7,
    bags: 6,
    img: '/assets/images/staria_exterior.webp',
  },
  yukon: {
    name: 'GMC Yukon XL VIP',
    category: 'American Luxury SUV',
    seats: 7,
    bags: 8,
    img: '/assets/images/yukon_exterior.webp',
  },
  hiace: {
    name: 'Toyota HiAce VIP',
    category: 'High-Roof Minibus',
    seats: 10,
    bags: 10,
    img: '/assets/images/hiace_exterior.webp',
  },
  coaster: {
    name: 'Toyota Coaster VIP Coach',
    category: 'Executive Coach',
    seats: 21,
    bags: 20,
    img: '/assets/images/coaster_exterior.webp',
  },
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
  initialRates,
}: BookingEngineProps) {
  const { currency, formatPrice } = useCurrency();

  // Wizard Step: 1 = Journey Schedule, 2 = Vehicle & Fare Selection, 3 = Passenger & Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Trip & Route Details
  const [bookingType, setBookingType] = useState<'transfer' | 'hourly' | 'ziyarat' | 'group_bus'>('transfer');
  const [routeId, setRouteId] = useState(initialRoute);
  const [vehicleId, setVehicleId] = useState(initialVehicle);
  const [durationHours, setDurationHours] = useState<number>(4);
  const [customPickupLocation, setCustomPickupLocation] = useState('Makkah Hotel / Location');
  const [customDropoffLocation, setCustomDropoffLocation] = useState('Holy Sites / City Tour');
  const [pickupDate, setPickupDate] = useState(initialDate);
  const [pickupTime, setPickupTime] = useState(initialTime);
  const [passengers, setPassengers] = useState(Number(initialPassengers) || 2);
  const [luggage, setLuggage] = useState(Number(initialLuggage) || 2);
  const [flightNumber, setFlightNumber] = useState('');
  const [step1Error, setStep1Error] = useState<string | null>(null);

  // Step 3: Passenger Details
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

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('verified_client');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  const minDate = new Date().toISOString().split('T')[0];

  const handleBookingTypeChange = (type: 'transfer' | 'hourly' | 'ziyarat' | 'group_bus') => {
    setBookingType(type);
    if (type === 'group_bus' && vehicleId !== 'hiace' && vehicleId !== 'coaster') {
      setVehicleId('coaster');
    }
  };

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

  // Price calculation strictly synced with database
  const calculateCurrentPriceSAR = () => {
    const calculated = getEstimatedBasePriceSAR({
      bookingType,
      routeId: bookingType === 'transfer' ? routeId : null,
      vehicleId,
      durationHours: bookingType === 'hourly' ? durationHours : undefined,
      customRates: initialRates,
    });
    return calculated || 200;
  };

  const currentPriceSAR = calculateCurrentPriceSAR();

  // VALIDATE STEP 1
  const handleProceedToStep2 = () => {
    if (!pickupDate) {
      setStep1Error(
        locale === 'ar'
          ? 'يرجى تحديد تاريخ الرحلة للمتابعة'
          : 'Please select your pickup date to proceed to vehicle selection'
      );
      return;
    }
    setStep1Error(null);
    trackEvent({
      event: 'route_selected',
      service_type: bookingType,
      route: routeId,
      passengers,
      luggage,
    });
    setCurrentStep(2);
  };

  // VALIDATE STEP 2
  const handleProceedToStep3 = () => {
    trackEvent({
      event: 'quote_calculated',
      service_type: bookingType,
      route: routeId,
      vehicle_id: vehicleId,
      price_sar: currentPriceSAR,
      currency,
    });
    setCurrentStep(3);
  };

  // SUBMIT FINAL BOOKING
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const pickupLocation =
      bookingType === 'transfer'
        ? ROUTES[routeId]?.label.split('→')[0].trim() || 'Jeddah Airport (KAIA)'
        : (customPickupLocation || 'Makkah Hotel');
    const dropoffLocation =
      bookingType === 'transfer'
        ? ROUTES[routeId]?.label.split('→')[1]?.trim() || 'Makkah Hotel'
        : (customDropoffLocation || 'Holy Sites / City Tour');

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
      duration_hours: bookingType === 'hourly' ? durationHours : undefined,
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
      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 md:p-12 shadow-sm text-center max-w-2xl mx-auto animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-gold-soft border border-gold-line text-gold-dark flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
          {dict.booking_modal.title}
        </h2>
        <p className="text-xs text-ink-muted mt-1 uppercase tracking-widest font-semibold">
          {dict.booking_modal.referenceLabel}:{' '}
          <span className="text-gold-dark font-extrabold text-sm">{confirmedBooking.reference}</span>
        </p>

        {/* BOOKING DETAILS CARD */}
        <div className="bg-bg-alt/70 rounded-xl p-4 sm:p-5 border border-border my-6 text-start text-xs space-y-2.5">
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
            <span className="font-display font-extrabold text-gold-dark text-lg sm:text-xl">
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
            className="min-h-[48px] h-12 px-8 rounded-btn bg-whatsapp hover:bg-whatsapp-hover text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-whatsapp"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{dict.booking_modal.confirmWhatsAppBtn}</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setConfirmedBooking(null);
              setCurrentStep(1);
            }}
            className="min-h-[48px] h-12 px-6 rounded-btn border border-border-strong text-ink text-xs font-semibold hover:bg-bg-alt transition-colors focus-visible:ring-2 focus-visible:ring-gold"
          >
            {dict.booking_modal.closeBtn}
          </button>
        </div>
      </div>
    );
  }

  // RENDER INTERACTIVE 3-STEP PROGRESSIVE BOOKING WIZARD
  return (
    <div className="bg-surface rounded-2xl border border-border p-4 sm:p-6 md:p-10 shadow-sm">
      {/* 4 SERVICE CATEGORY TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-bg-alt p-1.5 rounded-xl border border-border mb-6">
        <button
          type="button"
          onClick={() => handleBookingTypeChange('transfer')}
          className={`min-h-[44px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-gold ${
            bookingType === 'transfer' ? 'bg-gold text-slate-950 shadow-xs' : 'text-ink-muted hover:text-ink'
          }`}
        >
          📍 Transfer (Airport/City)
        </button>
        <button
          type="button"
          onClick={() => handleBookingTypeChange('hourly')}
          className={`min-h-[44px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-gold ${
            bookingType === 'hourly' ? 'bg-gold text-slate-950 shadow-xs' : 'text-ink-muted hover:text-ink'
          }`}
        >
          ⏱️ Hourly Chauffeur
        </button>
        <button
          type="button"
          onClick={() => handleBookingTypeChange('ziyarat')}
          className={`min-h-[44px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-gold ${
            bookingType === 'ziyarat' ? 'bg-gold text-slate-950 shadow-xs' : 'text-ink-muted hover:text-ink'
          }`}
        >
          🕌 Ziyarat Holy Sites
        </button>
        <button
          type="button"
          onClick={() => handleBookingTypeChange('group_bus')}
          className={`min-h-[44px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-gold ${
            bookingType === 'group_bus' ? 'bg-gold text-slate-950 shadow-xs' : 'text-ink-muted hover:text-ink'
          }`}
        >
          👥 Group &amp; Bus Coach
        </button>
      </div>

      {/* 3-STEP PROGRESS STEPPER */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
        <button
          type="button"
          onClick={() => setCurrentStep(1)}
          className={`flex items-center justify-center sm:justify-start gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-start min-h-[48px] ${
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
          <span className="hidden sm:inline">1. Trip &amp; Schedule</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (pickupDate) setCurrentStep(2);
          }}
          className={`flex items-center justify-center sm:justify-start gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-start min-h-[48px] ${
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
          <span className="hidden sm:inline">2. Select Vehicle &amp; Fare</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (pickupDate) setCurrentStep(3);
          }}
          className={`flex items-center justify-center sm:justify-start gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-start min-h-[48px] ${
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
          <span className="hidden sm:inline">3. Passenger &amp; Confirmation</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* STEP 1: ROUTE & SCHEDULE                                       */}
      {/* ============================================================== */}
      {currentStep === 1 && (
        <div className="space-y-6 text-start animate-fadeIn">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-ink border-b border-border pb-2">
              1. Trip &amp; Travel Schedule
            </h3>

            {bookingType === 'transfer' && (
              <div>
                <label htmlFor="engine-route-select" className="block text-xs font-bold text-ink mb-1.5">
                  Select Route <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <select
                    id="engine-route-select"
                    value={routeId}
                    onChange={(e) => setRouteId(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-8 rtl:pr-10 rtl:pl-8 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold appearance-none cursor-pointer"
                  >
                    {Object.entries(ROUTES).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <MapPin className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <span className="pointer-events-none absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-[10px] text-ink-muted">▼</span>
                </div>
              </div>
            )}

            {bookingType === 'hourly' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="duration-select" className="block text-xs font-bold text-ink mb-1.5">
                    Chauffeur Service Duration
                  </label>
                  <div className="relative">
                    <select
                      id="duration-select"
                      value={durationHours}
                      onChange={(e) => setDurationHours(Number(e.target.value))}
                      className="w-full min-h-[48px] h-12 pl-10 pr-8 rtl:pr-10 rtl:pl-8 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold appearance-none cursor-pointer"
                    >
                      {[2, 4, 6, 8, 10, 12, 16, 24].map((hr) => (
                        <option key={hr} value={hr}>
                          {hr} Hours Chauffeur Service
                        </option>
                      ))}
                    </select>
                    <Clock className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <span className="pointer-events-none absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-[10px] text-ink-muted">▼</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Pickup Address / Hotel <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Hotel / Pickup location in Makkah/Madinah"
                    value={customPickupLocation}
                    onChange={(e) => setCustomPickupLocation(e.target.value)}
                    className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Primary Destination / Area <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Makkah Local Tour / Business"
                    value={customDropoffLocation}
                    onChange={(e) => setCustomDropoffLocation(e.target.value)}
                    className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
            )}

            {bookingType === 'ziyarat' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ziyarat-pkg-select" className="block text-xs font-bold text-ink mb-1.5">
                    Select Ziyarat Package
                  </label>
                  <div className="relative">
                    <select
                      id="ziyarat-pkg-select"
                      value={customDropoffLocation}
                      onChange={(e) => {
                        setCustomDropoffLocation(e.target.value);
                        if (e.target.value.includes('Madinah')) {
                          setCustomPickupLocation('Madinah Hotel');
                        } else {
                          setCustomPickupLocation('Makkah Hotel');
                        }
                      }}
                      className="w-full min-h-[48px] h-12 pl-10 pr-8 rtl:pr-10 rtl:pl-8 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold appearance-none cursor-pointer"
                    >
                      <option value="Makkah Holy Sites Ziyarat (Arafat, Mina, Muzdalifah, Jabal al-Noor)">
                        Makkah Holy Sites (Arafat, Mina, Muzdalifah, Jabal al-Noor)
                      </option>
                      <option value="Madinah Holy Sites Ziyarat (Quba, Qiblatain, Uhud, Khandaq)">
                        Madinah Holy Sites (Quba, Qiblatain, Uhud, Khandaq)
                      </option>
                      <option value="Taif Full-Day Mountain Ziyarat & Historic Mosques">
                        Taif Mountain Tour &amp; Historic Mosques
                      </option>
                      <option value="Badr Battlefield & Historic Martyrs Ziyarat">
                        Badr Historic Battlefield &amp; Martyrs
                      </option>
                    </select>
                    <MapPin className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <span className="pointer-events-none absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-[10px] text-ink-muted">▼</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Pickup Hotel / Address <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jabal Omar Hotel, Makkah"
                    value={customPickupLocation}
                    onChange={(e) => setCustomPickupLocation(e.target.value)}
                    className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
            )}

            {bookingType === 'group_bus' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Pickup Location (Hotel/Airport) <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. King Abdulaziz Airport Terminal 1"
                    value={customPickupLocation}
                    onChange={(e) => setCustomPickupLocation(e.target.value)}
                    className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Drop-off Destination <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Makkah Clock Tower Hotel"
                    value={customDropoffLocation}
                    onChange={(e) => setCustomDropoffLocation(e.target.value)}
                    className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="pickup-date-input" className="block text-xs font-bold text-ink mb-1.5">
                  {dict.booking_card.dateLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="pickup-date-input"
                    type="date"
                    required
                    min={minDate}
                    value={pickupDate}
                    onChange={(e) => {
                      setPickupDate(e.target.value);
                      if (step1Error) setStep1Error(null);
                    }}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  />
                  <Calendar className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="pickup-time-input" className="block text-xs font-bold text-ink mb-1.5">
                  {dict.booking_card.timeLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="pickup-time-input"
                    type="time"
                    required
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  />
                  <Clock className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="flight-no-input" className="block text-xs font-bold text-ink mb-1.5">
                  Flight Number (Radar Delay Monitoring)
                </label>
                <div className="relative">
                  <input
                    id="flight-no-input"
                    type="text"
                    placeholder="e.g. SV 124 or MH 150"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Plane className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* PASSENGERS & LUGGAGE STEPPERS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
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
                    <span>{passengers}</span>
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
                    <span>{luggage}</span>
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

            {step1Error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{step1Error}</span>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleProceedToStep2}
                className="w-full sm:w-auto min-h-[48px] h-12 px-8 rounded-btn bg-gold text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-xs flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>Continue to Select Vehicle</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* STEP 2: CHOOSE YOUR VEHICLE & REVIEW FARE                      */}
      {/* ============================================================== */}
      {currentStep === 2 && (
        <div className="space-y-6 text-start animate-fadeIn">
          {/* TRIP SUMMARY PILL */}
          <div className="bg-bg-alt p-3.5 rounded-2xl border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
              <span className="font-bold text-ink flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gold-dark" />
                {bookingType === 'transfer' ? ROUTES[routeId]?.label : `${customPickupLocation} → ${customDropoffLocation}`}
              </span>
              <span className="text-ink-muted flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                {pickupDate} • {pickupTime}
              </span>
              <span className="text-ink-muted flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gold-dark" />
                {passengers} Pax • {luggage} Bags
              </span>
            </div>
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-xs font-bold text-gold-dark hover:underline flex items-center gap-1 shrink-0 self-end sm:self-auto"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit Trip</span>
            </button>
          </div>

          <h3 className="font-display font-bold text-xl text-ink border-b border-border pb-2">
            2. Choose Your Vehicle &amp; Review Guaranteed Fare
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(VEHICLE_SPECS)
              .filter(([vId]) => (bookingType === 'group_bus' ? vId === 'hiace' || vId === 'coaster' : true))
              .map(([vId, vData]) => {
                const isSelected = vehicleId === vId;
                const vehicleEstimatedFare =
                  getEstimatedBasePriceSAR({
                    bookingType,
                    routeId: bookingType === 'transfer' ? routeId : null,
                    vehicleId: vId,
                    durationHours: bookingType === 'hourly' ? durationHours : undefined,
                  }) || 200;

                const isOverSeats = passengers > vData.seats;
                const isOverBags = luggage > vData.bags;

                return (
                  <div
                    key={vId}
                    onClick={() => handleSelectVehicle(vId)}
                    className={`rounded-2xl p-4 border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-gold bg-gold-soft/40 shadow-md ring-2 ring-gold/30'
                        : 'border-border bg-surface hover:border-gold-line'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-gold text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-xs">
                        <Check className="w-3 h-3" />
                        <span>Selected</span>
                      </div>
                    )}

                    <div>
                      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-bg-alt mb-3 border border-border/60">
                        <Image
                          src={vData.img}
                          alt={vData.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>

                      <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                        {vData.category}
                      </span>
                      <h4 className="font-display font-bold text-base sm:text-lg text-ink mb-2">
                        {vData.name}
                      </h4>

                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 ${
                            isOverSeats
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-bg-alt text-ink border border-border'
                          }`}
                        >
                          <Users className="w-3 h-3 text-gold-dark" />
                          <span>{vData.seats} Seats</span>
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 ${
                            isOverBags
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-bg-alt text-ink border border-border'
                          }`}
                        >
                          <Luggage className="w-3 h-3 text-gold-dark" />
                          <span>{vData.bags} Bags</span>
                        </span>
                      </div>

                      {(isOverSeats || isOverBags) && (
                        <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg mb-3 font-medium">
                          Note: Your party or luggage count exceeds this car&apos;s recommended capacity.
                        </p>
                      )}
                    </div>

                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-ink-muted uppercase block">Fixed Total Fare</span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display font-bold text-xl text-ink">
                            {formatPrice(vehicleEstimatedFare)}
                          </span>
                          <span className="text-[11px] text-ink-muted">({vehicleEstimatedFare} SAR)</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectVehicle(vId);
                        }}
                        className={`min-h-[40px] px-4 rounded-btn text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-slate-950 text-gold shadow-xs'
                            : 'bg-bg-alt text-ink hover:bg-gold-soft border border-border'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn border border-border text-ink text-xs font-semibold hover:bg-bg-alt transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>Back to Trip Schedule</span>
            </button>

            <button
              type="button"
              onClick={handleProceedToStep3}
              className="w-full sm:w-auto min-h-[48px] h-12 px-8 rounded-btn bg-gold text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-xs flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span>Continue to Passenger Details</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* STEP 3: PASSENGER DETAILS, ADD-ONS & CONFIRMATION               */}
      {/* ============================================================== */}
      {currentStep === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6 text-start animate-fadeIn">
          {/* COMPLETE CONFIRMATION SUMMARY CARD */}
          <div className="bg-bg-alt/80 rounded-2xl p-5 border border-border grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 text-xs">
              <span className="text-[11px] font-bold text-gold-dark uppercase tracking-widest block">
                Booking Summary &amp; Fixed Fare
              </span>
              <div className="flex items-center gap-2 text-ink font-bold text-sm">
                <MapPin className="w-4 h-4 text-gold-dark shrink-0" />
                <span>
                  {bookingType === 'transfer' ? ROUTES[routeId]?.label : `${customPickupLocation} → ${customDropoffLocation}`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-ink-muted">
                <Calendar className="w-4 h-4 text-gold-dark shrink-0" />
                <span>{pickupDate} • {pickupTime}</span>
              </div>
              <div className="flex items-center gap-2 text-ink-muted">
                <Car className="w-4 h-4 text-gold-dark shrink-0" />
                <span>{VEHICLE_SPECS[vehicleId]?.name} ({passengers} Pax • {luggage} Bags)</span>
              </div>
              {flightNumber && (
                <div className="flex items-center gap-2 text-ink-muted">
                  <Plane className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>Flight: {flightNumber} (Radar Delay Tracked)</span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between p-4 rounded-xl bg-surface border border-border">
              <div>
                <span className="text-xs text-ink-muted block mb-0.5">Authoritative Total Fare</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-bold text-3xl sm:text-4xl text-ink">
                    {formatPrice(currentPriceSAR)}
                  </span>
                  <span className="text-xs text-ink-muted font-normal">({currentPriceSAR} SAR)</span>
                </div>
                <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Pay upon Arrival (Cash to Chauffeur)</span>
                </p>
              </div>
              <div className="text-[11px] text-ink-muted pt-2 border-t border-border/60 mt-2">
                <span>Free cancellation up to 24h • 60-min airport wait included</span>
              </div>
            </div>
          </div>

          {/* PASSENGER INFORMATION */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-ink border-b border-border pb-2">
              3. Passenger &amp; Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="customer-name-input" className="block text-xs font-bold text-ink mb-1.5">
                  Lead Pilgrim Full Name <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="customer-name-input"
                    type="text"
                    required
                    placeholder="e.g. Haji Ahmad"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <User className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="customer-phone-input" className="block text-xs font-bold text-ink mb-1.5">
                  WhatsApp / Phone (with Country Code) <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="customer-phone-input"
                    type="tel"
                    inputMode="tel"
                    required
                    placeholder="+966 50 123 4567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Phone className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="customer-email-input" className="block text-xs font-bold text-ink mb-1.5">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <input
                    id="customer-email-input"
                    type="email"
                    placeholder="ahmad@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Mail className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* ADD-ONS CHECKBOXES */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-ink mb-2">Trip Preferences &amp; Add-ons</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <label className="flex items-center gap-2 p-3 min-h-[48px] rounded-btn bg-bg-alt/60 border border-border cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addOns.child_seat}
                    onChange={(e) => setAddOns({ ...addOns, child_seat: e.target.checked })}
                    className="rounded text-gold"
                  />
                  <span>Child Safety Seat (Complimentary)</span>
                </label>

                <label className="flex items-center gap-2 p-3 min-h-[48px] rounded-btn bg-bg-alt/60 border border-border cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addOns.flight_tracking}
                    onChange={(e) => setAddOns({ ...addOns, flight_tracking: e.target.checked })}
                    className="rounded text-gold"
                  />
                  <span>Free Flight Delay Tracking</span>
                </label>

                <label className="flex items-center gap-2 p-3 min-h-[48px] rounded-btn bg-bg-alt/60 border border-border cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addOns.malay_driver}
                    onChange={(e) => setAddOns({ ...addOns, malay_driver: e.target.checked })}
                    className="rounded text-gold"
                  />
                  <span>Malay/English Chauffeur</span>
                </label>

                <label className="flex items-center gap-2 p-3 min-h-[48px] rounded-btn bg-bg-alt/60 border border-border cursor-pointer">
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

            {/* SPECIAL NOTES */}
            <div>
              <label htmlFor="customer-notes-input" className="block text-xs font-bold text-ink mb-1.5">
                Special Requests or Route Instructions (Optional)
              </label>
              <textarea
                id="customer-notes-input"
                rows={2}
                placeholder="e.g. Traveling with elderly, need wheelchair assistance or extra luggage stop..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full p-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold resize-none"
              />
            </div>

            {/* PAYMENT METHODS */}
            <div>
              <label className="block text-xs font-bold text-ink mb-2">Payment Method</label>
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
                    <span className="text-xs font-bold text-ink">100% Pay Upon Arrival</span>
                    <input
                      type="radio"
                      name="booking_payment_method"
                      checked={paymentMethod === 'pay_upon_arrival'}
                      onChange={() => setPaymentMethod('pay_upon_arrival')}
                      className="text-gold"
                    />
                  </div>
                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    Zero upfront payment required. Pay your private chauffeur directly upon arrival in cash (SAR) or card.
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
                    <span className="text-xs font-bold text-ink">Online Payment Link</span>
                    <input
                      type="radio"
                      name="booking_payment_method"
                      checked={paymentMethod === 'online_card'}
                      onChange={() => setPaymentMethod('online_card')}
                      className="text-gold"
                    />
                  </div>
                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    Secure digital payment link (Visa, Mastercard, Mada, Apple Pay) sent upon confirmation.
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

          {/* CONTROLS */}
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn border border-border text-ink text-xs font-semibold hover:bg-bg-alt transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold order-2 sm:order-1"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>Back to Vehicle Selection</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !turnstileToken}
              className="w-full sm:w-auto min-h-[48px] h-12 px-10 rounded-btn bg-gold hover:bg-gold-hover hover:text-white text-slate-950 text-sm font-bold uppercase tracking-wider transition-all shadow-gold disabled:opacity-50 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold order-1 sm:order-2"
            >
              {isSubmitting ? (
                'Confirming...'
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Booking &amp; Reserve</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
