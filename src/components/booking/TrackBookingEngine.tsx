'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Search, MapPin, Calendar, Clock, Plane, User, Phone, Car, MessageCircle, AlertCircle, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface TrackBookingEngineProps {
  locale: Locale;
  dict: Dictionary;
}

interface TrackedBooking {
  reference: string;
  customerName: string;
  pickupDatetime: string;
  pickupLocation: string;
  dropoffLocation: string;
  passengersCount: number;
  flightNumber?: string | null;
  vehicleId: string;
  status: 'new' | 'confirmed' | 'driver_assigned' | 'en_route' | 'completed' | 'cancelled';
  finalPriceSAR: number;
  currencyCharged: string;
  finalPriceCurrency: number;
  driver?: {
    name: string;
    phone: string;
    vehicle_plate?: string;
    vehicle_model?: string;
  } | null;
}

export function TrackBookingEngine({ locale, dict }: TrackBookingEngineProps) {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const [reference, setReference] = useState(initialRef);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<TrackedBooking | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBooking = async (refVal: string, phoneVal: string) => {
    if (!refVal && !phoneVal) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/bookings/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: refVal, phone: phoneVal }),
      });
      const data = await res.json();
      if (!res.ok || !data.booking) {
        setError(dict.page_track.notFound);
        setBooking(null);
      } else {
        setBooking(data.booking);
      }
    } catch {
      setError(dict.page_track.notFound);
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialRef) {
      fetchBooking(initialRef, '');
    }
  }, [initialRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooking(reference, phone);
  };

  const getStatusText = (st: string) => {
    switch (st) {
      case 'new': return dict.page_track.statusNew;
      case 'confirmed': return dict.page_track.statusConfirmed;
      case 'driver_assigned': return dict.page_track.statusAssigned;
      case 'en_route': return dict.page_track.statusEnRoute;
      case 'completed': return dict.page_track.statusCompleted;
      case 'cancelled': return dict.page_track.statusCancelled;
      default: return st;
    }
  };

  const getStatusColor = (st: string) => {
    switch (st) {
      case 'new': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'confirmed': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'driver_assigned': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'en_route': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'cancelled': return 'bg-rose-100 text-rose-800 border-rose-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Lookup Form */}
      <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs text-start">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                {dict.page_track.refLabel}
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder={dict.page_track.refPlaceholder}
                className="w-full h-11 px-3.5 text-xs font-mono uppercase font-bold rounded-lg border border-border bg-surface text-ink focus:ring-1 focus:ring-gold-dark"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                {dict.page_track.phoneLabel}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={dict.page_track.phonePlaceholder}
                className="w-full h-11 px-3.5 text-xs rounded-lg border border-border bg-surface text-ink focus:ring-1 focus:ring-gold-dark"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-gold-dark hover:bg-gold-hover text-surface font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{dict.page_track.btnSearch}</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3 text-start">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Booking Details Card */}
      {booking && (
        <div className="bg-surface rounded-2xl border border-border shadow-xs overflow-hidden text-start space-y-6 p-6 md:p-8">
          {/* Header Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-border">
            <div>
              <span className="text-xs text-ink-muted block mb-1">
                {dict.page_track.refLabel}
              </span>
              <span className="font-mono text-xl font-bold text-ink">
                {booking.reference}
              </span>
            </div>
            <span
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(
                booking.status
              )}`}
            >
              {getStatusText(booking.status)}
            </span>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold py-2">
            <div
              className={`p-2 rounded-lg border ${
                ['new', 'confirmed', 'driver_assigned', 'completed'].includes(booking.status)
                  ? 'bg-gold-soft border-gold-line text-gold-dark'
                  : 'bg-surface-muted text-ink-muted'
              }`}
            >
              1. {dict.page_track.statusNew}
            </div>
            <div
              className={`p-2 rounded-lg border ${
                ['confirmed', 'driver_assigned', 'completed'].includes(booking.status)
                  ? 'bg-gold-soft border-gold-line text-gold-dark'
                  : 'bg-surface-muted text-ink-muted'
              }`}
            >
              2. {dict.page_track.statusConfirmed}
            </div>
            <div
              className={`p-2 rounded-lg border ${
                ['driver_assigned', 'completed'].includes(booking.status)
                  ? 'bg-gold-soft border-gold-line text-gold-dark'
                  : 'bg-surface-muted text-ink-muted'
              }`}
            >
              3. {dict.page_track.statusAssigned}
            </div>
          </div>

          {/* Assigned Driver Card (If assigned) */}
          {booking.driver && (
            <div className="p-5 rounded-xl bg-gold-soft/40 border border-gold-line space-y-3">
              <div className="flex items-center gap-2 text-gold-dark font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>{dict.page_track.driverDetails}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-ink-muted block mb-0.5">{dict.page_track.driverName}</span>
                  <span className="font-bold text-ink text-sm">{booking.driver.name}</span>
                </div>
                <div>
                  <span className="text-ink-muted block mb-0.5">{dict.page_track.vehiclePlate}</span>
                  <span className="font-bold text-ink text-sm">
                    {booking.driver.vehicle_plate || 'VIP Luxury Fleet'} - {booking.driver.vehicle_model || ''}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <a
                  href={`tel:${booking.driver.phone}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface border border-border text-ink font-bold text-xs hover:border-gold-dark transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{dict.page_track.callDriver}</span>
                </a>
                <a
                  href={`https://wa.me/${booking.driver.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{dict.page_track.whatsappDriver}</span>
                </a>
              </div>
            </div>
          )}

          {/* Journey Summary */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              {dict.page_track.journeySummary}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <span className="text-ink-muted block">Pickup</span>
                  <span className="font-semibold text-ink">{booking.pickupLocation}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <span className="text-ink-muted block">Destination</span>
                  <span className="font-semibold text-ink">{booking.dropoffLocation}</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <span className="text-ink-muted block">{dict.page_track.pickupTime}</span>
                  <span className="font-semibold text-ink">
                    {new Date(booking.pickupDatetime).toLocaleString()}
                  </span>
                </div>
              </div>
              {booking.flightNumber && (
                <div className="flex items-start gap-2.5">
                  <Plane className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                  <div>
                    <span className="text-ink-muted block">{dict.page_track.flightNumber}</span>
                    <span className="font-mono font-bold text-ink">{booking.flightNumber}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Price & Actions */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-ink-muted block">{dict.page_track.totalFare}</span>
              <span className="text-xl font-bold text-gold-dark">
                {booking.finalPriceCurrency} {booking.currencyCharged}
              </span>
            </div>

            <Link
              href={`/${locale}/manage-booking?ref=${booking.reference}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-surface hover:bg-surface-muted text-ink font-bold text-xs transition-colors"
            >
              <span>{dict.page_track.manageBookingBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
