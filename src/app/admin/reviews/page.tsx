'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Star,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  User,
  MapPin,
  Car,
  Globe,
  Quote,
  Eye,
  Check,
  RotateCcw,
} from 'lucide-react';
import { CustomerReview } from '@/types/reviews';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'published' | 'rejected'>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState({ all: 0, pending: 0, published: 0, rejected: 0 });
  const [averageRating, setAverageRating] = useState(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (ratingFilter !== 'all') params.set('rating', ratingFilter);
      if (search.trim()) params.set('search', search.trim());
      params.set('page', page.toString());
      params.set('limit', '20');

      const res = await fetch(`/api/admin/reviews?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setReviews(data.reviews || []);
        setTotal(data.total || 0);
        if (data.counts) setCounts(data.counts);
        if (typeof data.averageRating === 'number') setAverageRating(data.averageRating);
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to load reviews' });
      }
    } catch (err: any) {
      console.error('Failed to fetch admin reviews:', err);
      setFeedback({ type: 'error', message: 'Network error loading reviews' });
    } finally {
      setLoading(false);
    }
  }, [statusFilter, ratingFilter, search, page]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleUpdateStatus = async (id: string, newStatus: 'pending' | 'published' | 'rejected') => {
    setUpdatingId(id);

    // Optimistic UI update for instantaneous responsiveness
    const previousReviews = [...reviews];
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus, is_approved: newStatus === 'published' } : r))
    );

    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({
          type: 'success',
          message: `Review #${id.slice(0, 8)} status successfully updated to "${newStatus}". Public site cache revalidated.`,
        });
        fetchReviews();
      } else {
        // Rollback on error
        setReviews(previousReviews);
        setFeedback({ type: 'error', message: data.error || 'Failed to update review status in database.' });
      }
    } catch (err) {
      setReviews(previousReviews);
      setFeedback({ type: 'error', message: 'Network error communicating with review moderation API.' });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this customer review from the database? This action cannot be undone.')) {
      return;
    }

    setUpdatingId(id);
    const previousReviews = [...reviews];
    setReviews((prev) => prev.filter((r) => r.id !== id));

    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({ type: 'success', message: 'Review permanently removed from database and public listings.' });
        fetchReviews();
      } else {
        setReviews(previousReviews);
        setFeedback({ type: 'error', message: data.error || 'Failed to delete review from database.' });
      }
    } catch {
      setReviews(previousReviews);
      setFeedback({ type: 'error', message: 'Network error deleting review.' });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* 1. EXECUTIVE COMMAND HERO BAR */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#121724] via-[#0E121B] to-[#0A0D14] border border-[#232B3E] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {/* Subtle decorative champagne gold glow in corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D9A031]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A031]/15 border border-[#D9A031]/30 text-xs font-bold text-[#E5B842]">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A031]" />
              <span>Duyuf Alrahman VIP • Pilgrim Reputation &amp; Trust Command</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#FAF9F6] tracking-tight">
              Customer Reviews Moderation
            </h1>

            <p className="text-xs sm:text-sm text-[#9DA6B8] font-light max-w-2xl leading-relaxed">
              Verify and moderate authentic pilgrim reviews. Submissions remain private until approved by an administrator, instantly updating the public website across all 10 locales with zero redeployments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => fetchReviews()}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-xs font-bold text-[#0A0D14] transition-all shadow-[0_0_15px_rgba(217,160,49,0.3)] hover:scale-[1.02] disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Reviews</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. FEEDBACK ALERT BANNER */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-xs font-medium animate-in fade-in duration-200 shadow-lg ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200 shadow-emerald-950/30'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200 shadow-rose-950/30'
          }`}
        >
          <div className="flex items-center gap-3">
            {feedback.type === 'success' ? (
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </span>
            ) : (
              <span className="w-6 h-6 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              </span>
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      )}

      {/* 3. EXECUTIVE KPI METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {/* Total Reviews */}
        <div
          onClick={() => { setStatusFilter('all'); setPage(1); }}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'all'
              ? 'bg-[#151C2C] border-[#3B4863] ring-1 ring-[#D9A031]/40 shadow-lg'
              : 'bg-[#10141E] border-[#1F2737] hover:border-[#2C384E]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9DA6B8]">Total Reviews</span>
            <span className="w-7 h-7 rounded-lg bg-[#182030] flex items-center justify-center text-[#9DA6B8]">
              <MessageSquare className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-display text-2xl md:text-3xl font-bold text-[#FAF9F6]">{counts.all}</span>
            <span className="text-xs text-[#6C7584]">logged</span>
          </div>
        </div>

        {/* Pending Moderation */}
        <div
          onClick={() => { setStatusFilter('pending'); setPage(1); }}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'pending'
              ? 'bg-amber-950/25 border-amber-500/50 ring-1 ring-amber-500/40 shadow-lg'
              : 'bg-[#10141E] border-[#1F2737] hover:border-amber-500/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>Pending</span>
            </span>
            {counts.pending > 0 && (
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="font-display text-2xl md:text-3xl font-bold text-amber-400">{counts.pending}</span>
            {counts.pending > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                Action Required
              </span>
            )}
          </div>
        </div>

        {/* Published Live */}
        <div
          onClick={() => { setStatusFilter('published'); setPage(1); }}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'published'
              ? 'bg-emerald-950/25 border-emerald-500/50 ring-1 ring-emerald-500/40 shadow-lg'
              : 'bg-[#10141E] border-[#1F2737] hover:border-emerald-500/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3" />
              <span>Published</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="font-display text-2xl md:text-3xl font-bold text-emerald-400">{counts.published}</span>
            <span className="text-xs text-emerald-300/80 font-medium">Live on Site</span>
          </div>
        </div>

        {/* Rejected / Spam */}
        <div
          onClick={() => { setStatusFilter('rejected'); setPage(1); }}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'rejected'
              ? 'bg-rose-950/25 border-rose-500/50 ring-1 ring-rose-500/40 shadow-lg'
              : 'bg-[#10141E] border-[#1F2737] hover:border-rose-500/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <XCircle className="w-3 h-3" />
              <span>Rejected / Spam</span>
            </span>
            <span className="text-[10px] text-[#6C7584]">Hidden</span>
          </div>
          <div className="flex items-baseline justify-between mt-3">
            <span className="font-display text-2xl md:text-3xl font-bold text-rose-400">{counts.rejected}</span>
            <span className="text-xs text-[#6C7584]">Blocked</span>
          </div>
        </div>

        {/* Average Pilgrim Rating */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#121724] to-[#0A0D14] border border-[#232B3E] col-span-2 md:col-span-1 shadow-md">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#D9A031] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Avg Rating</span>
          </span>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-display text-2xl md:text-3xl font-bold text-[#FAF9F6]">
              {counts.published > 0 ? averageRating.toFixed(1) : '5.0'}
            </span>
            <div className="flex items-center text-[#D9A031] drop-shadow-[0_0_6px_rgba(217,160,49,0.4)]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= Math.round(counts.published > 0 ? averageRating : 5)
                      ? 'fill-[#D9A031] text-[#D9A031]'
                      : 'text-[#283244]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. LUXURY FILTER & SEARCH BAR */}
      <div className="p-4 rounded-2xl bg-[#10141E] border border-[#1F2737] flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-sm">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0A0D14] border border-[#1F2737] overflow-x-auto">
          {(['all', 'pending', 'published', 'rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setStatusFilter(tab); setPage(1); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                statusFilter === tab
                  ? 'bg-gradient-to-r from-[#D9A031] to-[#B8821D] text-[#0A0D14] shadow-sm font-bold'
                  : 'text-[#9DA6B8] hover:text-[#FAF9F6] hover:bg-white/5'
              }`}
            >
              {tab === 'all' ? 'All Reviews' : tab} ({counts[tab]})
            </button>
          ))}
        </div>

        {/* Rating and Search Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={ratingFilter}
              onChange={(e) => { setRatingFilter(e.target.value); setPage(1); }}
              className="h-9 px-3 rounded-xl bg-[#0A0D14] border border-[#1F2737] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031] cursor-pointer"
            >
              <option value="all">All Star Ratings</option>
              <option value="5">5 Stars ★★★★★</option>
              <option value="4">4 Stars ★★★★☆</option>
              <option value="3">3 Stars ★★★☆☆</option>
              <option value="2">2 Stars ★★☆☆☆</option>
              <option value="1">1 Star ★☆☆☆☆</option>
            </select>
          </div>

          <div className="relative flex-1 sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6C7584]" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search pilgrim name, route, comments..."
              className="w-full h-9 pl-9 pr-3 rounded-xl bg-[#0A0D14] border border-[#1F2737] text-xs text-[#FAF9F6] placeholder-[#6C7584] focus:outline-none focus:border-[#D9A031]"
            />
          </div>
        </div>
      </div>

      {/* 5. REVIEWS STREAM */}
      {loading ? (
        <div className="p-16 rounded-2xl bg-[#10141E] border border-[#1F2737] flex flex-col items-center justify-center gap-3 text-center">
          <RefreshCw className="w-7 h-7 text-[#D9A031] animate-spin" />
          <p className="text-xs text-[#9DA6B8]">Retrieving pilgrim testimonials from database...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="p-16 rounded-2xl bg-[#10141E] border border-[#1F2737] text-center flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#151C2C] border border-[#232B3E] flex items-center justify-center text-[#9DA6B8]">
            <MessageSquare className="w-6 h-6 text-[#D9A031]" />
          </div>
          <h3 className="text-base font-bold text-[#FAF9F6]">No Reviews Found</h3>
          <p className="text-xs text-[#9DA6B8] max-w-sm">
            {statusFilter !== 'all' || ratingFilter !== 'all' || search
              ? 'No reviews match your selected filter criteria. Try adjusting your search query or status filter.'
              : 'There are currently no reviews in the queue. New pilgrim submissions will appear here for review.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => {
            const currentStatus = review.status || (review.is_approved ? 'published' : 'pending');
            const isUpdating = updatingId === review.id;
            const initials = (review.customer_name || 'Pilgrim')
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={review.id}
                className={`p-6 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                  currentStatus === 'published'
                    ? 'bg-gradient-to-br from-[#10141E] via-[#0E121B] to-[#0A0D14] border-[#1F2737] hover:border-[#2C384E]'
                    : currentStatus === 'pending'
                    ? 'bg-gradient-to-br from-amber-950/20 via-[#131119] to-[#0A0D14] border-amber-500/30 hover:border-amber-500/50'
                    : 'bg-gradient-to-br from-rose-950/15 via-[#131015] to-[#0A0D14] border-rose-500/25 hover:border-rose-500/40'
                }`}
              >
                {/* Status indicator bar on the side */}
                <div
                  className={`absolute top-0 left-0 bottom-0 w-1 ${
                    currentStatus === 'published'
                      ? 'bg-emerald-500'
                      : currentStatus === 'pending'
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                />

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-5 pl-2">
                  {/* Left: Pilgrim Details & Review Content */}
                  <div className="space-y-3 flex-1">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Avatar initials */}
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D9A031]/30 to-[#8C6415]/20 border border-[#D9A031]/40 flex items-center justify-center font-bold text-xs text-[#FAF9F6]">
                        {initials}
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#FAF9F6] text-sm">
                            {review.customer_name}
                          </span>

                          {/* Verified Booking Badge */}
                          {review.is_verified_booking && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Verified Pilgrim {review.booking_reference ? `(${review.booking_reference})` : ''}</span>
                            </span>
                          )}
                        </div>

                        {/* Country & Route metadata pills */}
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {review.country && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-[#9DA6B8]">
                              <MapPin className="w-3 h-3 text-[#D9A031]" />
                              <span>{review.country}</span>
                            </span>
                          )}

                          {review.route && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#161C2A] border border-[#232B3E] text-[10px] font-medium text-[#D9A031]">
                              <Car className="w-3 h-3" />
                              <span>{review.route}</span>
                            </span>
                          )}

                          {review.language && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#151A24] text-[9px] font-mono uppercase text-[#7C879B]">
                              <Globe className="w-2.5 h-2.5" />
                              <span>{review.language}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#141926] border border-[#232B3E]">
                        <div className="flex items-center text-[#D9A031]">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= review.rating ? 'fill-[#D9A031] text-[#D9A031]' : 'text-[#283244]'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-[#FAF9F6] ml-1">
                          {Number(review.rating).toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Review Body */}
                    <div className="relative pl-4 border-l-2 border-[#D9A031]/30 py-1">
                      <p className="text-sm text-[#F3EEE6] leading-relaxed whitespace-pre-wrap font-light">
                        "{review.comment}"
                      </p>
                    </div>

                    {/* Footer Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#6C7584]">
                      <span>Submitted: {new Date(review.created_at).toLocaleDateString()} at {new Date(review.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {review.admin_notes && (
                        <span className="text-amber-300/80 italic">Notes: {review.admin_notes}</span>
                      )}
                    </div>
                  </div>

                  {/* Right: Moderation Actions & Status */}
                  <div className="flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-[#1F2737] shrink-0">
                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          currentStatus === 'published'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(52,211,153,0.2)]'
                            : currentStatus === 'pending'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            currentStatus === 'published'
                              ? 'bg-emerald-400'
                              : currentStatus === 'pending'
                              ? 'bg-amber-400 animate-pulse'
                              : 'bg-rose-400'
                          }`}
                        />
                        <span>{currentStatus}</span>
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {currentStatus !== 'published' && (
                        <button
                          onClick={() => handleUpdateStatus(review.id, 'published')}
                          disabled={isUpdating}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-bold transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve &amp; Publish</span>
                        </button>
                      )}

                      {currentStatus !== 'rejected' && (
                        <button
                          onClick={() => handleUpdateStatus(review.id, 'rejected')}
                          disabled={isUpdating}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1A1F2B] hover:bg-rose-950/60 text-rose-300 hover:text-rose-200 border border-[#283246] hover:border-rose-500/40 text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          <span>Reject / Spam</span>
                        </button>
                      )}

                      {currentStatus !== 'pending' && (
                        <button
                          onClick={() => handleUpdateStatus(review.id, 'pending')}
                          disabled={isUpdating}
                          className="p-2 rounded-xl bg-[#1A1F2B] hover:bg-amber-950/50 text-amber-300 border border-[#283246] hover:border-amber-500/40 text-xs transition-colors disabled:opacity-50 cursor-pointer"
                          title="Reset to Pending"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(review.id)}
                        disabled={isUpdating}
                        className="p-2 rounded-xl bg-[#1A1F2B] hover:bg-rose-950 text-[#8C96A8] hover:text-rose-400 border border-[#283246] hover:border-rose-500/40 text-xs transition-colors disabled:opacity-50 cursor-pointer"
                        title="Delete permanently from database"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Pagination Controls */}
          {total > 20 && (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#10141E] border border-[#1F2737] text-xs text-[#9DA6B8]">
              <span>
                Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} reviews
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3.5 py-1.5 rounded-lg bg-[#182030] text-[#FAF9F6] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#202A3E] flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                <button
                  disabled={page * 20 >= total}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#182030] text-[#FAF9F6] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#202A3E] flex items-center gap-1 cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
