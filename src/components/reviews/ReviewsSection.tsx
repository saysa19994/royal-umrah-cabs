'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Star,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  MapPin,
  Car,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  PlusCircle,
  ThumbsUp,
} from 'lucide-react';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { PublicCustomerReview, ReviewStatistics } from '@/types/reviews';
import { ReviewSubmissionForm } from './ReviewSubmissionForm';

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
  const isAr = locale === 'ar';

  const [reviews, setReviews] = useState<PublicCustomerReview[]>(initialReviews);
  const [statistics, setStatistics] = useState<ReviewStatistics>(initialStats);
  const [loading, setLoading] = useState(initialReviews.length === 0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sort, setSort] = useState<'newest' | 'highest'>('newest');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = useCallback(async (pageNum: number = 1, sortMode: 'newest' | 'highest' = sort, append: boolean = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const params = new URLSearchParams({
        sort: sortMode,
        page: pageNum.toString(),
        limit: '6',
      });

      const res = await fetch(`/api/reviews?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        if (append) {
          setReviews((prev) => [...prev, ...(data.reviews || [])]);
        } else {
          setReviews(data.reviews || []);
        }
        if (data.statistics) {
          setStatistics(data.statistics);
        }
        setHasMore(Boolean(data.hasMore));
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [sort]);

  useEffect(() => {
    fetchReviews(1, sort, false);
  }, [fetchReviews, sort]);

  const handleSortChange = (newSort: 'newest' | 'highest') => {
    if (newSort === sort) return;
    setSort(newSort);
    setPage(1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchReviews(nextPage, sort, true);
  };

  const hasReviews = reviews.length > 0;
  const avgRating = statistics.averageRating > 0 ? statistics.averageRating : 5.0;

  return (
    <section
      id="reviews"
      className={`relative overflow-hidden ${
        isStandalone ? 'py-12 md:py-20 bg-[#060A14]' : 'py-20 md:py-28 bg-[#060A14] border-t border-white/5'
      }`}
    >
      {/* Decorative Golden Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-xs font-bold text-gold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{t.badge}</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 tracking-tight">
            {t.heading}
          </h2>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
            {t.subheading}
          </p>

          {/* Genuine Aggregate Rating Card */}
          {statistics.totalPublished > 0 ? (
            <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3.5 rounded-2xl bg-[#0B1120] border border-gold/30 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-display text-white">
                  {avgRating.toFixed(1)}
                </span>
                <div className="flex items-center text-[#D4AF37]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(avgRating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="w-1 h-1 rounded-full bg-slate-500" />
              <span className="text-xs font-semibold text-slate-300">
                {isAr
                  ? `بناءً على ${statistics.totalPublished} تقييم معتمد`
                  : `Based on ${statistics.totalPublished} verified reviews`}
              </span>
            </div>
          ) : null}
        </div>

        {/* Action and Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          {/* Sorting tabs */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-[#0B1120] border border-white/10 text-xs font-semibold">
            <button
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
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-hover text-ink text-xs font-bold uppercase tracking-wider transition-all shadow-gold"
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
        ) : !hasReviews ? (
          /* Honest Empty State when zero published reviews exist */
          <div className="p-12 md:p-16 rounded-3xl bg-[#0B1120] border border-gold/20 text-center max-w-xl mx-auto space-y-4">
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
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 md:p-7 rounded-3xl bg-[#0B1120] border border-white/10 hover:border-gold/40 transition-all flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-gold/5 group"
              >
                <div className="space-y-4">
                  {/* Top Bar: Stars & Verified Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center text-[#D4AF37]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= rev.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    {rev.is_verified_booking && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{t.verifiedPilgrim}</span>
                      </span>
                    )}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-light">
                    "{rev.comment}"
                  </p>

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

                  <span className="text-[11px] text-slate-500">
                    {new Date(rev.created_at).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

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
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Loading...</span>
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
