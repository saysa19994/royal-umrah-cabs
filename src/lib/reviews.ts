import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase/service';
import { createClient } from '@/lib/supabase/client';
import { PublicCustomerReview, ReviewStatistics, PublicReviewsResponse, CustomerReview } from '@/types/reviews';

/**
 * Sanitizes input string to prevent stored XSS and remove raw HTML tags.
 */
export function sanitizeReviewText(input: string): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/[<>'"]/g, (match) => {
      // escape dangerous entities
      switch (match) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#x27;';
        default: return match;
      }
    })
    .trim();
}

/**
 * Strict Zod validation schema for public customer review submission.
 * Rejects unknown fields strictly.
 */
export const ReviewSubmissionSchema = z
  .object({
    customer_name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(80, 'Name cannot exceed 80 characters'),
    rating: z
      .number()
      .int('Rating must be an integer')
      .min(1, 'Minimum rating is 1 star')
      .max(5, 'Maximum rating is 5 stars'),
    comment: z
      .string()
      .min(10, 'Review must be at least 10 characters')
      .max(1000, 'Review cannot exceed 1000 characters'),
    route: z.string().max(120).optional().nullable(),
    service_type: z.string().max(80).optional().nullable(),
    country: z.string().max(80).optional().nullable(),
    booking_reference: z.string().max(40).optional().nullable(),
    language: z.enum(['en', 'ar', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr']).default('en'),
    turnstile_token: z.string().max(2048).optional(),
    'cf-turnstile-response': z.string().max(2048).optional(),
  })
  .strict();

export interface GetReviewsOptions {
  sort?: 'newest' | 'highest';
  page?: number;
  limit?: number;
  route?: string;
  language?: string;
}

/**
 * Fetches published customer reviews with accurate statistics.
 * Strictly guarantees that pending or rejected reviews are never returned.
 */
export async function getPublishedReviews(options: GetReviewsOptions = {}): Promise<PublicReviewsResponse> {
  const { sort = 'newest', page = 1, limit = 6, route, language } = options;
  const validPage = Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1;
  const validLimit = Number.isFinite(limit) ? Math.min(Math.max(1, Math.floor(limit)), 50) : 6;
  const offset = (validPage - 1) * validLimit;
  const emptyDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  const failure = (): PublicReviewsResponse => ({
    success: false,
    reviews: [],
    statistics: { totalPublished: 0, averageRating: 0, distribution: { ...emptyDistribution } },
    total: 0,
    page: validPage,
    limit: validLimit,
    hasMore: false,
    error: 'Unable to retrieve reviews at this time',
  });

  try {
    const supabase = createServiceClient();

    // public.reviews in production uses the is_approved boolean, not a status column.
    // Avoid deliberately failing on missing extended columns before a legacy fallback.
    // Restrict publication at the database query level, not only in memory.
    const { data: statsRows, error: statsError } = await supabase
      .from('reviews')
      .select('rating')
      .eq('is_approved', true);
    if (statsError) {
      console.error('Published review statistics query failed:', statsError.message);
      return failure();
    }

    let query = supabase
      .from('reviews')
      .select('id, customer_name, country, rating, comment, route, language, created_at', { count: 'exact' })
      .eq('is_approved', true);

    if (route && route !== 'all') query = query.eq('route', route);
    if (language && language !== 'all') query = query.eq('language', language);
    query = sort === 'highest'
      ? query.order('rating', { ascending: false }).order('created_at', { ascending: false })
      : query.order('created_at', { ascending: false });

    const { data, count, error } = await query.range(offset, offset + validLimit - 1);
    if (error) {
      console.error('Published review list query failed:', error.message);
      return failure();
    }

    const distribution = { ...emptyDistribution };
    let ratingSum = 0;
    let ratedCount = 0;
    for (const row of statsRows || []) {
      const rating = Number(row.rating);
      if (!Number.isInteger(rating) || rating < 1 || rating > 5) continue;
      distribution[rating as keyof typeof distribution]++;
      ratingSum += rating;
      ratedCount++;
    }

    const reviews: PublicCustomerReview[] = (data || []).map(row => {
      const rating = Number(row.rating);
      return {
        id: row.id,
        customer_name: row.customer_name,
        country: row.country || '',
        rating: Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : 0,
        comment: row.comment,
        route: row.route || null,
        // Legacy production schema has no service_type or booking verification columns.
        // Never invent verification claims for anonymous visitors.
        service_type: null,
        language: row.language || 'en',
        is_verified_booking: false,
        created_at: row.created_at,
      };
    });

    const totalPublished = (statsRows || []).length;
    const filteredTotal = count ?? 0;
    return {
      success: true,
      reviews,
      statistics: {
        totalPublished,
        averageRating: ratedCount ? Math.round((ratingSum / ratedCount) * 10) / 10 : 0,
        distribution,
      },
      total: filteredTotal,
      page: validPage,
      limit: validLimit,
      hasMore: offset + reviews.length < filteredTotal,
    };
  } catch (err) {
    console.error('Unexpected published reviews error:', err);
    return failure();
  }
}
