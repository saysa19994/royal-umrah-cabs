'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { AlertCircle, CheckCircle2, MessageCircle, ArrowLeft, ShieldCheck, XCircle } from 'lucide-react';

interface ManageBookingEngineProps {
  locale: Locale;
  dict: Dictionary;
}

export function ManageBookingEngine({ locale, dict }: ManageBookingEngineProps) {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const [reference, setReference] = useState(initialRef);
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [booking, setBooking] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (initialRef) {
      fetchBooking(initialRef);
    }
  }, [initialRef]);

  const fetchBooking = async (refVal: string) => {
    if (!refVal) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/bookings/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: refVal }),
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

  const handleCancel = async () => {
    if (!booking) return;
    setCancelling(true);
    try {
      const res = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: booking.reference }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCancelled(true);
        setBooking({ ...booking, status: 'cancelled' });
      } else {
        setError(data.message || 'Could not cancel booking.');
      }
    } catch {
      setError('An error occurred while cancelling.');
    } finally {
      setCancelling(false);
    }
  };

  // Check 24-hour window
  const isMoreThan24Hours = booking
    ? (new Date(booking.pickupDatetime).getTime() - Date.now()) / (1000 * 60 * 60) >= 24
    : false;

  return (
    <div className="space-y-6 max-w-2xl mx-auto text-start">
      {/* Search if not provided */}
      {!initialRef && !booking && (
        <div className="bg-surface rounded-2xl p-6 border border-border">
          <label className="block text-xs font-bold text-ink mb-1.5">
            {dict.page_track.refLabel}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="e.g. RUC-7821"
              className="flex-1 h-11 px-3.5 text-xs font-mono uppercase font-bold rounded-lg border border-border bg-surface text-ink"
            />
            <button
              onClick={() => fetchBooking(reference)}
              disabled={loading}
              className="px-6 h-11 rounded-lg bg-gold-dark hover:bg-gold-hover text-surface font-bold text-xs"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Cancellation Success */}
      {cancelled && (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-base text-emerald-700">
            <CheckCircle2 className="w-6 h-6" />
            <span>{dict.page_manage.cancelSuccess}</span>
          </div>
          <p className="text-xs text-emerald-800">
            Reference {booking?.reference} has been cancelled. No fees or cancellation charges apply.
          </p>
        </div>
      )}

      {/* Booking Card & Action */}
      {booking && (
        <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <span className="text-xs text-ink-muted block">{dict.page_track.refLabel}</span>
              <span className="font-mono text-xl font-bold text-ink">{booking.reference}</span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-surface-muted border border-border text-ink">
              {booking.status}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <p><strong>Pickup:</strong> {booking.pickupLocation}</p>
            <p><strong>Destination:</strong> {booking.dropoffLocation}</p>
            <p><strong>Scheduled Time:</strong> {new Date(booking.pickupDatetime).toLocaleString()}</p>
            <p><strong>Total Fare:</strong> {booking.finalPriceCurrency} {booking.currencyCharged}</p>
          </div>

          {booking.status !== 'cancelled' && (
            <div className="pt-4 border-t border-border space-y-4">
              {isMoreThan24Hours ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{dict.page_manage.cancelPolicyNotice}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="w-full h-11 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  >
                    {cancelling ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>{dict.page_manage.cancelBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                    <p className="font-semibold mb-1">Within 24 Hours Policy Notice</p>
                    <p className="text-amber-800 leading-relaxed font-light">
                      {dict.page_manage.cancelLateNotice}
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/966567588261?text=${encodeURIComponent(
                      `Hello, I would like to manage or reschedule my booking ${booking.reference}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{dict.page_manage.contactDispatch}</span>
                  </a>
                </div>
              )}
            </div>
          )}

          <div className="pt-2">
            <Link
              href={`/${locale}/track-booking?ref=${booking.reference}`}
              className="inline-flex items-center gap-2 text-xs font-bold text-gold-dark hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{dict.page_manage.backToTrack}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
