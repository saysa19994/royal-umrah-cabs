'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Star,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  MapPin,
  Car,
  ChevronDown,
  RefreshCw,
  PlusCircle,
} from 'lucide-react';
import { Locale, LOCALE_CONFIG } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { PublicCustomerReview, ReviewStatistics } from '@/types/reviews';
import { ReviewSubmissionForm } from './ReviewSubmissionForm';
import styles from './ReviewsSection.module.css';

const REVIEW_UNAVAILABLE: Record<Locale, { message: string; retry: string }> = {
  ar: { message: 'يتعذر عرض التقييمات حاليًا.', retry: 'إعادة المحاولة' },
  en: { message: 'Reviews are temporarily unavailable.', retry: 'Try again' },
  ms: { message: 'Ulasan tidak tersedia buat sementara waktu.', retry: 'Cuba lagi' },
  id: { message: 'Ulasan untuk sementara tidak tersedia.', retry: 'Coba lagi' },
  ur: { message: 'جائزے فی الحال دستیاب نہیں ہیں۔', retry: 'دوبارہ کوشش کریں' },
  fr: { message: 'Les avis sont momentanément indisponibles.', retry: 'Réessayer' },
  es: { message: 'Las opiniones no están disponibles temporalmente.', retry: 'Volver a intentar' },
  de: { message: 'Bewertungen sind vorübergehend nicht verfügbar.', retry: 'Erneut versuchen' },
  tr: { message: 'Değerlendirmelere geçici olarak ulaşılamıyor.', retry: 'Tekrar deneyin' },
  hi: { message: 'समीक्षाएँ फिलहाल उपलब्ध नहीं हैं।', retry: 'दोबारा कोशिश करें' },
};

interface ReviewsSectionProps {
  locale: Locale;
  dict: Dictionary;
  isStandalone?: boolean;
  initialReviews?: PublicCustomerReview[];
  initialStats?: ReviewStatistics;
}

export function ReviewsSection({
  locale,
  dict,
  isStandalone = false,
  initialReviews = [],
  initialStats = { totalPublished: 0, averageRating: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } },
}: ReviewsSectionProps) {
  const t = dict.reviews;
  const unavailable = REVIEW_UNAVAILABLE[locale];
  const Heading = isStandalone ? 'h1' : 'h2';
  const localeTag = LOCALE_CONFIG[locale].dateFormat;
  const numbers = new Intl.NumberFormat(localeTag, { maximumFractionDigits: 1 });
  const five = numbers.format(5);

  const [reviews, setReviews] = useState<PublicCustomerReview[]>(initialReviews);
  const [statistics, setStatistics] = useState<ReviewStatistics>(initialStats);
  const [loading, setLoading] = useState(initialReviews.length === 0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sort, setSort] = useState<'newest' | 'highest'>('newest');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [failedPage, setFailedPage] = useState<number | null>(null);
  const activeRequest = useRef<AbortController | null>(null);

  const fetchReviews = useCallback(async (pageNum: number = 1, sortMode: 'newest' | 'highest' = sort, append: boolean = false) => {
    activeRequest.current?.abort();
    const request = new AbortController();
    activeRequest.current = request;
    setFailedPage(null);
    setLoadingMore(append);
    setLoading(!append);

    try {
      const params = new URLSearchParams({
        sort: sortMode,
        page: pageNum.toString(),
        limit: '6',
      });

      const res = await fetch(`/api/reviews?${params.toString()}`, { signal: request.signal });
      const data = await res.json();
      if (request.signal.aborted) return;

      if (res.ok && data.success) {
        if (append) {
          setReviews((prev) => [...prev, ...(data.reviews || [])]);
        } else {
          setReviews(data.reviews || []);
        }
        if (data.statistics) {
          setStatistics(data.statistics);
        }
        setHasMore(Boolean(data.hasMore));
        setPage(pageNum);
      } else {
        setFailedPage(pageNum);
      }
    } catch {
      if (!request.signal.aborted) setFailedPage(pageNum);
    } finally {
      if (!request.signal.aborted) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }, [sort]);

  useEffect(() => {
    void fetchReviews(1, sort, false);
    return () => activeRequest.current?.abort();
  }, [fetchReviews, sort]);

  const handleSortChange = (newSort: 'newest' | 'highest') => {
    if (newSort === sort) return;
    setSort(newSort);
    setPage(1);
  };

  const handleLoadMore = () => {
    void fetchReviews(page + 1, sort, true);
  };

  const hasReviews = reviews.length > 0;
  const avgRating = statistics.averageRating;

  return (
    <section
      id="reviews"
      aria-labelledby="review-section-heading"
      aria-busy={loading || loadingMore}
      className={`relative overflow-hidden ${
        isStandalone ? styles.journal : 'py-20 md:py-28 bg-[#060A14] border-t border-white/5'
      }`}
    >
      {/* Decorative Golden Ambient Radial Glow */}
      {!isStandalone && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent pointer-events-none" />}

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <header className={isStandalone ? styles.journalHeading : 'text-center max-w-3xl mx-auto mb-12 md:mb-16'}>
          {!isStandalone && <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-bold text-gold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{t.badge}</span>
          </div>}

          <Heading id="review-section-heading" className={isStandalone ? styles.title : 'font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 tracking-tight'}>
            {t.heading}
          </Heading>

          <p className={isStandalone ? styles.intro : 'text-sm md:text-base text-slate-300 leading-relaxed font-light'}>
            {t.subheading}
          </p>

          {/* Genuine Aggregate Rating Card */}
          {statistics.totalPublished > 0 && avgRating > 0 && (
            <div className={isStandalone ? styles.aggregate : 'mt-5 inline-flex items-center gap-4 text-white'}>
              <Star size={18} aria-hidden="true" fill="currentColor" />
              <strong aria-label={`${t.ratingLabel} ${numbers.format(avgRating)} / ${five}`}>
                {numbers.format(avgRating)} / {five}
              </strong>
              <span aria-label={`${t.heading} ${numbers.format(statistics.totalPublished)}`}>
                ({numbers.format(statistics.totalPublished)})
              </span>
            </div>
          )}
        </header>

        {/* Action and Sort Controls */}
        <div className={`flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b ${isStandalone ? styles.controls : 'border-white/10'}`}>
          {/* Sorting tabs */}
          <div className={isStandalone ? styles.sort : 'inline-flex items-center gap-1.5 p-1 rounded-xl bg-[#0B1120] border border-white/10 text-xs font-semibold'}>
            <button
              type="button"
              aria-pressed={sort === 'newest'}
              onClick={() => handleSortChange('newest')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                sort === 'newest'
                  ? 'bg-gold/20 text-gold border border-gold/30 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.sortNewest}
            </button>
            <button
              type="button"
              aria-pressed={sort === 'highest'}
              onClick={() => handleSortChange('highest')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                sort === 'highest'
                  ? 'bg-gold/20 text-gold border border-gold/30 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.sortHighest}
            </button>
          </div>

          {/* Write a review toggle */}
          <button
            type="button"
            onClick={() => setShowForm((open) => !open)}
            aria-expanded={showForm}
            className={isStandalone ? styles.primary : 'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-hover text-ink text-xs font-bold uppercase tracking-wider transition-all shadow-gold'}
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.writeReviewBtn}</span>
          </button>
        </div>

        {/* Collapsible Submission Form */}
        {showForm && (
          <div className="mb-12">
            <ReviewSubmissionForm
              locale={locale}
              dict={dict}
              onCancel={() => setShowForm(false)}
              onSuccess={() => {
                setShowForm(false);
                fetchReviews(1, sort, false);
              }}
            />
          </div>
        )}

        {/* Reviews Grid */}
        {failedPage !== null && (
          <div className={styles.error}>
            <p role="status">{unavailable.message}</p>
            <button type="button" onClick={() => void fetchReviews(failedPage, sort, failedPage > 1)}>
              {unavailable.retry}
            </button>
          </div>
        )}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((sk) => (
              <div
                key={sk}
                className="p-6 rounded-3xl bg-[#0B1120] border border-white/10 animate-pulse space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-24 h-4 bg-white/10 rounded" />
                  <div className="w-16 h-4 bg-white/10 rounded" />
                </div>
                <div className="w-full h-16 bg-white/5 rounded-xl" />
                <div className="w-32 h-3 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        ) : !hasReviews && failedPage === null ? (
          /* Honest Empty State when zero published reviews exist */
          <div className={isStandalone ? styles.empty : 'p-12 md:p-16 rounded-3xl bg-[#0B1120] border border-gold/20 text-center max-w-xl mx-auto space-y-4'}>
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mx-auto">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold font-display text-white">
              {t.emptyStateTitle}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t.emptyStateDesc}
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-hover text-ink text-xs font-bold uppercase tracking-wider transition-all shadow-gold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.writeReviewBtn}</span>
            </button>
          </div>
        ) : hasReviews ? (
          /* Cards Grid */
          <div className={isStandalone ? styles.entries : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
            {reviews.map((rev) => (
              <article
                key={rev.id}
                className={isStandalone ? styles.entry : 'p-6 md:p-7 rounded-3xl bg-[#0B1120] border border-white/10 hover:border-gold/40 transition-all flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-gold/5 group'}
              >
                <div className="space-y-4">
                  {/* Top Bar: Stars & Verified Badge */}
                  <div className="flex items-center justify-between gap-2">
                    {rev.rating > 0 && <div className="flex items-center text-[#D4AF37]" role="img" aria-label={`${t.ratingLabel} ${numbers.format(rev.rating)} / ${five}`}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= rev.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>}

                    {rev.is_verified_booking && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{t.verifiedPilgrim}</span>
                      </span>
                    )}
                  </div>

                  {/* Review Text */}
                  <blockquote className={isStandalone ? styles.quote : 'text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-light'} dir="auto">
                    {rev.comment}
                  </blockquote>

                  {/* Route Pill if present */}
                  {rev.route && (
                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#060A14] border border-white/10 text-[11px] font-medium text-gold">
                        <Car className="w-3 h-3 shrink-0" />
                        <span className="truncate max-w-[240px]">{rev.route}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Bar: Customer Name, Country, Date */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-sm">
                      {rev.customer_name}
                    </span>
                    {rev.country && (
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-gold/70" />
                        <span>{rev.country}</span>
                      </span>
                    )}
                  </div>

                  <time dateTime={rev.created_at} className="text-[11px] text-slate-500">
                    {new Date(rev.created_at).toLocaleDateString(localeTag, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#0B1120] hover:bg-[#10192C] border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {loadingMore ? (
                <>
                  <RefreshCw className="w-4 h-4 motion-safe:animate-spin" aria-hidden="true" />
                  <span>{t.loadMore}</span>
                </>
              ) : (
                <>
                  <span>{t.loadMore}</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
