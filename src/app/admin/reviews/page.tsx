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
          message: `Review successfully updated to ${newStatus}`,
        });
        fetchReviews();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to update review status' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Failed to update review' });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this customer review?')) {
      return;
    }

    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setFeedback({ type: 'success', message: 'Review permanently deleted' });
        fetchReviews();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to delete review' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error deleting review' });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D9A031]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A031]">Moderation & Reputation</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-[#FAF9F6]">
            Customer Reviews Moderation
          </h1>
          <p className="text-sm text-[#A0A6B2] mt-0.5">
            Manage, verify, and publish genuine pilgrim reviews for Duyuf Alrahman VIP.
          </p>
        </div>

        <button
          onClick={() => fetchReviews()}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1F26] border border-[#262B33] text-xs font-semibold text-[#FAF9F6] hover:bg-[#20252D] hover:border-[#D9A031]/40 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#D9A031]' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-medium animate-in fade-in duration-200 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/40 border-red-500/40 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-white/60 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {/* Total */}
        <div className="p-4 rounded-2xl bg-[#14171C] border border-[#262B33] flex flex-col justify-between">
          <span className="text-xs text-[#A0A6B2] font-semibold">Total Reviews</span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-[#FAF9F6]">{counts.all}</span>
            <MessageSquare className="w-4 h-4 text-[#A0A6B2]" />
          </div>
        </div>

        {/* Pending */}
        <div
          onClick={() => { setStatusFilter('pending'); setPage(1); }}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'pending'
              ? 'bg-amber-500/10 border-amber-500/50'
              : 'bg-[#14171C] border-[#262B33] hover:border-amber-500/30'
          }`}
        >
          <span className="text-xs text-amber-400 font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Moderation</span>
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-amber-400">{counts.pending}</span>
            {counts.pending > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                Action Required
              </span>
            )}
          </div>
        </div>

        {/* Published */}
        <div
          onClick={() => { setStatusFilter('published'); setPage(1); }}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'published'
              ? 'bg-emerald-500/10 border-emerald-500/50'
              : 'bg-[#14171C] border-[#262B33] hover:border-emerald-500/30'
          }`}
        >
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Published</span>
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-emerald-400">{counts.published}</span>
            <span className="text-xs text-[#A0A6B2]">Live</span>
          </div>
        </div>

        {/* Rejected */}
        <div
          onClick={() => { setStatusFilter('rejected'); setPage(1); }}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'rejected'
              ? 'bg-red-500/10 border-red-500/50'
              : 'bg-[#14171C] border-[#262B33] hover:border-red-500/30'
          }`}
        >
          <span className="text-xs text-red-400 font-semibold flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" />
            <span>Rejected / Spam</span>
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-red-400">{counts.rejected}</span>
            <span className="text-xs text-[#A0A6B2]">Hidden</span>
          </div>
        </div>

        {/* Average Rating */}
        <div className="p-4 rounded-2xl bg-[#14171C] border border-[#262B33] col-span-2 md:col-span-1">
          <span className="text-xs text-[#D9A031] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Avg Rating</span>
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-[#D9A031]">
              {counts.published > 0 ? averageRating.toFixed(1) : 'N/A'}
            </span>
            {counts.published > 0 && (
              <div className="flex items-center text-[#D9A031]">
                {'★'.repeat(Math.round(averageRating))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#14171C] border border-[#262B33] flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0D0F12] border border-[#262B33] overflow-x-auto">
          {(['all', 'pending', 'published', 'rejected'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setStatusFilter(tab); setPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                statusFilter === tab
                  ? 'bg-[#20252D] text-[#D9A031] shadow-xs'
                  : 'text-[#A0A6B2] hover:text-[#FAF9F6]'
              }`}
            >
              {tab} ({counts[tab]})
            </button>
          ))}
        </div>

        {/* Rating and Search Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={ratingFilter}
              onChange={(e) => { setRatingFilter(e.target.value); setPage(1); }}
              className="px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] focus:outline-hidden focus:border-[#D9A031]"
            >
              <option value="all">All Star Ratings</option>
              <option value="5">5 Stars ★★★★★</option>
              <option value="4">4 Stars ★★★★☆</option>
              <option value="3">3 Stars ★★★☆☆</option>
              <option value="2">2 Stars ★★☆☆☆</option>
              <option value="1">1 Star ★☆☆☆☆</option>
            </select>
          </div>

          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6C7584]" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search name, route, comment..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] placeholder-[#6C7584] focus:outline-hidden focus:border-[#D9A031]"
            />
          </div>
        </div>
      </div>

      {/* Reviews Content Area */}
      {loading ? (
        <div className="p-16 rounded-2xl bg-[#14171C] border border-[#262B33] flex flex-col items-center justify-center gap-3 text-center">
          <RefreshCw className="w-6 h-6 text-[#D9A031] animate-spin" />
          <p className="text-xs text-[#A0A6B2]">Loading customer reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="p-16 rounded-2xl bg-[#14171C] border border-[#262B33] text-center flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#1A1F26] border border-[#262B33] flex items-center justify-center text-[#A0A6B2]">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#FAF9F6]">No Reviews Found</h3>
          <p className="text-xs text-[#A0A6B2] max-w-sm">
            {statusFilter !== 'all' || ratingFilter !== 'all' || search
              ? 'No reviews match your selected filters. Try clearing search or filter terms.'
              : 'There are currently no reviews submitted in the database. New customer submissions will appear here for moderation.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => {
            const currentStatus = review.status || (review.is_approved ? 'published' : 'pending');
            const isUpdating = updatingId === review.id;

            return (
              <div
                key={review.id}
                className={`p-5 rounded-2xl border transition-all ${
                  currentStatus === 'published'
                    ? 'bg-[#14171C] border-[#262B33]'
                    : currentStatus === 'pending'
                    ? 'bg-amber-950/15 border-amber-500/30'
                    : 'bg-red-950/10 border-red-500/20'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Review Content & Header */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Rating Stars */}
                      <div className="flex items-center text-[#D9A031]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating ? 'fill-[#D9A031] text-[#D9A031]' : 'text-[#262B33]'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Customer Name */}
                      <span className="font-bold text-[#FAF9F6] text-sm">
                        {review.customer_name}
                      </span>

                      {/* Country */}
                      {review.country && (
                        <span className="px-2 py-0.5 rounded-md bg-[#1A1F26] border border-[#262B33] text-[10px] text-[#A0A6B2] flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>{review.country}</span>
                        </span>
                      )}

                      {/* Route / Service */}
                      {review.route && (
                        <span className="px-2 py-0.5 rounded-md bg-[#20252D] text-[10px] font-medium text-[#D9A031] flex items-center gap-1">
                          <Car className="w-2.5 h-2.5" />
                          <span>{review.route}</span>
                        </span>
                      )}

                      {/* Verified Booking Badge */}
                      {review.is_verified_booking && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Verified Booking {review.booking_reference ? `(${review.booking_reference})` : ''}</span>
                        </span>
                      )}

                      {/* Language */}
                      <span className="px-1.5 py-0.5 rounded bg-[#0D0F12] text-[10px] text-[#6C7584] uppercase font-mono">
                        {review.language}
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-sm text-[#F3EEE6] leading-relaxed whitespace-pre-wrap">
                      "{review.comment}"
                    </p>

                    {/* Admin Notes / Creation Date */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#6C7584] pt-1">
                      <span>Submitted: {new Date(review.created_at).toLocaleDateString()} at {new Date(review.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {review.admin_notes && (
                        <span className="text-amber-300/80 italic">Notes: {review.admin_notes}</span>
                      )}
                    </div>
                  </div>

                  {/* Actions & Status Controls */}
                  <div className="flex md:flex-col items-center md:items-end justify-between gap-2.5 border-t md:border-t-0 pt-3 md:pt-0 border-[#262B33]">
                    {/* Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        currentStatus === 'published'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : currentStatus === 'pending'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-red-500/20 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {currentStatus}
                    </span>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      {currentStatus !== 'published' && (
                        <button
                          onClick={() => handleUpdateStatus(review.id, 'published')}
                          disabled={isUpdating}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      )}

                      {currentStatus !== 'rejected' && (
                        <button
                          onClick={() => handleUpdateStatus(review.id, 'rejected')}
                          disabled={isUpdating}
                          className="px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}

                      {currentStatus !== 'pending' && (
                        <button
                          onClick={() => handleUpdateStatus(review.id, 'pending')}
                          disabled={isUpdating}
                          className="px-2.5 py-1.5 rounded-lg bg-[#20252D] hover:bg-[#2A313C] text-amber-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                          title="Mark Pending"
                        >
                          <Clock className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(review.id)}
                        disabled={isUpdating}
                        className="p-1.5 rounded-lg bg-[#20252D] hover:bg-red-950 hover:text-red-400 text-[#A0A6B2] text-xs transition-colors"
                        title="Delete permanently"
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
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#14171C] border border-[#262B33] text-xs text-[#A0A6B2]">
              <span>
                Showing {(page - 1) * 20 + 1} to {Math.min(page * 20, total)} of {total} reviews
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#20252D] text-[#FAF9F6] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#2A313C] flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                <button
                  disabled={page * 20 >= total}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1.5 rounded-lg bg-[#20252D] text-[#FAF9F6] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#2A313C] flex items-center gap-1"
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
