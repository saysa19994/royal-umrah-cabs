'use client';

import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, X, Send } from 'lucide-react';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';

interface ReviewSubmissionFormProps {
  locale: Locale;
  dict: Dictionary;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const POPULAR_ROUTES_OPTIONS = [
  { id: 'jeddah-airport-to-makkah', labelEn: 'Jeddah Airport (KAIA) → Makkah Hotel', labelAr: 'مطار جدة (KAIA) ← فندق مكة المكرمة' },
  { id: 'makkah-to-madinah', labelEn: 'Makkah Hotel → Madinah Al-Munawwarah', labelAr: 'فندق مكة المكرمة ← المدينة المنورة' },
  { id: 'madinah-to-makkah', labelEn: 'Madinah Hotel → Makkah (Via Miqat Bir Ali)', labelAr: 'المدينة المنورة ← مكة المكرمة (ميقات آبار علي)' },
  { id: 'makkah-to-jeddah-airport', labelEn: 'Makkah Hotel → Jeddah Airport (KAIA)', labelAr: 'فندق مكة المكرمة ← مطار جدة (KAIA)' },
  { id: 'madinah-airport-to-hotel', labelEn: 'Madinah Airport (MED) → Madinah Hotel', labelAr: 'مطار المدينة المنورة (MED) ← فندق المدينة' },
  { id: 'ziyarat-tour', labelEn: 'Sacred Makkah / Madinah Ziyarat Tour', labelAr: 'جولة المزارات التاريخية في مكة / المدينة' },
  { id: 'other', labelEn: 'Other VIP Chauffeur Transfer', labelAr: 'خدمة نقل خاصة أخرى' },
];

export function ReviewSubmissionForm({ locale, dict, onSuccess, onCancel }: ReviewSubmissionFormProps) {
  const t = dict.reviews;
  const isAr = locale === 'ar';

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [customerName, setCustomerName] = useState('');
  const [country, setCountry] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedName = customerName.trim();
    const trimmedComment = comment.trim();

    if (trimmedName.length < 2) {
      setErrorMsg(isAr ? 'يجب أن يتكون الاسم من حرفين على الأقل.' : 'Name must be at least 2 characters.');
      return;
    }

    if (trimmedComment.length < 10) {
      setErrorMsg(isAr ? 'يجب أن يحتوي التقييم على 10 أحرف على الأقل.' : 'Review must be at least 10 characters.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        customer_name: trimmedName,
        rating,
        comment: trimmedComment,
        route: selectedRoute || null,
        country: country.trim() || null,
        booking_reference: bookingRef.trim() || null,
        language: locale,
      };

      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
        if (onSuccess) {
          setTimeout(() => onSuccess(), 2500);
        }
      } else {
        setErrorMsg(data.error || (isAr ? 'حدث خطأ أثناء إرسال التقييم. يُرجى المحاولة لاحقاً.' : 'Failed to submit review. Please try again.'));
      }
    } catch (err: any) {
      console.error('Review submit network error:', err);
      setErrorMsg(isAr ? 'تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.' : 'Network connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 rounded-3xl bg-[#0B1120] border border-gold/40 text-center space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold font-display text-white">
          {t.successTitle}
        </h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          {t.successMsg}
        </p>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="mt-4 px-6 py-2.5 rounded-xl bg-gold/20 hover:bg-gold/30 text-gold text-xs font-bold uppercase tracking-wider transition-colors"
          >
            {t.closeForm}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-[#0B1120] border border-gold/30 shadow-2xl relative">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          aria-label={t.closeForm}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-1">
          {t.submitReviewTitle}
        </h3>
        <p className="text-xs md:text-sm text-slate-400">
          {t.submitReviewSubtitle}
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Rating Stars Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-2">
            {t.ratingLabel} *
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = hoverRating ? star <= hoverRating : star <= rating;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 rounded-lg hover:scale-110 transition-transform focus:outline-hidden focus-visible:ring-2 focus-visible:ring-gold"
                  aria-label={`${star} star${star > 1 ? 's' : ''}`}
                >
                  <Star
                    className={`w-7 h-7 md:w-8 md:h-8 transition-colors ${
                      active ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
            <span className="text-sm font-bold text-white ml-2 rtl:ml-0 rtl:mr-2">
              {rating} / 5
            </span>
          </div>
        </div>

        {/* Name and Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t.nameLabel} *
            </label>
            <input
              type="text"
              required
              minLength={2}
              maxLength={80}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-2.5 rounded-xl bg-[#060A14] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t.countryLabel}
            </label>
            <input
              type="text"
              maxLength={80}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder={t.countryPlaceholder}
              className="w-full px-4 py-2.5 rounded-xl bg-[#060A14] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Route and Booking Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {t.routeLabel}
            </label>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#060A14] border border-white/10 text-sm text-white focus:outline-hidden focus:border-gold transition-colors"
            >
              <option value="">{t.routePlaceholder}</option>
              {POPULAR_ROUTES_OPTIONS.map((opt) => (
                <option key={opt.id} value={isAr ? opt.labelAr : opt.labelEn}>
                  {isAr ? opt.labelAr : opt.labelEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>{t.bookingRefLabel}</span>
              <span className="text-[10px] text-emerald-400 font-normal">Optional</span>
            </label>
            <input
              type="text"
              maxLength={40}
              value={bookingRef}
              onChange={(e) => setBookingRef(e.target.value)}
              placeholder={t.bookingRefPlaceholder}
              className="w-full px-4 py-2.5 rounded-xl bg-[#060A14] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-gold transition-colors uppercase"
            />
            <p className="text-[10px] text-slate-400 mt-1">
              {t.bookingRefHelp}
            </p>
          </div>
        </div>

        {/* Review Comment */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-300">
              {t.commentLabel} *
            </label>
            <span className={`text-[10px] ${comment.trim().length >= 10 ? 'text-slate-400' : 'text-amber-400'}`}>
              {comment.trim().length}/1000
            </span>
          </div>
          <textarea
            required
            rows={4}
            minLength={10}
            maxLength={1000}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t.commentPlaceholder}
            className="w-full px-4 py-3 rounded-xl bg-[#060A14] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-gold transition-colors leading-relaxed resize-y"
          />
        </div>

        {/* Submit Button & Cancel */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-semibold transition-colors"
            >
              {t.closeForm}
            </button>
          )}

          <button
            type="submit"
            disabled={submitting || comment.trim().length < 10 || customerName.trim().length < 2}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gold hover:bg-gold-hover text-ink font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-gold"
          >
            {submitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>{t.submittingBtn}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 rtl:rotate-180" />
                <span>{t.submitBtn}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
