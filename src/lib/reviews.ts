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
  const {
    sort = 'newest',
    page = 1,
    limit = 6,
    route,
    language
  } = options;

  const validPage = Math.max(1, page);
  const validLimit = Math.min(Math.max(1, limit), 50);
  const offset = (validPage - 1) * validLimit;

  try {
    const supabase = createServiceClient();

    // 1. Fetch total published reviews and statistics
    let statsData: any[] | null = null;
    let statsError: any = null;

    try {
      const statsQuery = await supabase
        .from('reviews')
        .select('rating, is_approved, status')
        .or('status.eq.published,is_approved.eq.true');
      statsData = statsQuery.data;
      statsError = statsQuery.error;
    } catch (e: any) {
      statsError = e;
    }

    // Fallback if status column does not exist yet before migration 004 is applied:
    if (statsError) {
      try {
        const fallbackStats = await supabase
          .from('reviews')
          .select('rating, is_approved')
          .eq('is_approved', true);
        statsData = fallbackStats.data;
        statsError = fallbackStats.error;
      } catch (fallbackStatsErr) {
        // preserve statsError
      }
    }

    let totalPublished = 0;
    let sumRating = 0;
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    if (!statsError && statsData) {
      // Double check in code: ONLY include reviews where is_approved is true OR status is published
      const publishedRows = statsData.filter(r => r.is_approved === true || r.status === 'published');
      totalPublished = publishedRows.length;
      publishedRows.forEach(r => {
        const rating = Math.min(Math.max(Number(r.rating) || 5, 1), 5) as 1 | 2 | 3 | 4 | 5;
        distribution[rating] = (distribution[rating] || 0) + 1;
        sumRating += rating;
      });
    }

    const averageRating = totalPublished > 0
      ? Math.round((sumRating / totalPublished) * 10) / 10
      : 0;

    // 2. Fetch paginated list of published reviews
    let reviewsData: any[] | null = null;
    let reviewsError: any = null;

    try {
      let query = supabase
        .from('reviews')
        .select('id, customer_name, country, rating, comment, route, service_type, language, is_verified_booking, created_at')
        .or('status.eq.published,is_approved.eq.true');

      if (route && route !== 'all') {
        query = query.eq('route', route);
      }

      if (language && language !== 'all') {
        query = query.eq('language', language);
      }

      if (sort === 'highest') {
        query = query
          .order('rating', { ascending: false })
          .order('created_at', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      query = query.range(offset, offset + validLimit - 1);

      const res = await query;
      reviewsData = res.data;
      reviewsError = res.error;
    } catch (e: any) {
      reviewsError = e;
    }

    // Fallback if extended columns do not exist yet before migration 004 is applied:
    if (reviewsError) {
      try {
        let legacyQuery = supabase
          .from('reviews')
          .select('id, customer_name, country, rating, comment, route, language, created_at')
          .eq('is_approved', true);

        if (route && route !== 'all') {
          legacyQuery = legacyQuery.eq('route', route);
        }

        if (language && language !== 'all') {
          legacyQuery = legacyQuery.eq('language', language);
        }

        if (sort === 'highest') {
          legacyQuery = legacyQuery
            .order('rating', { ascending: false })
            .order('created_at', { ascending: false });
        } else {
          legacyQuery = legacyQuery.order('created_at', { ascending: false });
        }

        legacyQuery = legacyQuery.range(offset, offset + validLimit - 1);

        const legacyRes = await legacyQuery;
        if (!legacyRes.error) {
          reviewsData = legacyRes.data;
          reviewsError = null;
        }
      } catch (legacyErr) {
        // preserve reviewsError
      }
    }

    if (reviewsError) {
      console.warn('Notice: Error querying reviews from Supabase:', reviewsError.message);
      return {
        success: true,
        reviews: [],
        statistics: {
          totalPublished: 0,
          averageRating: 0,
          distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        },
        total: 0,
        page: validPage,
        limit: validLimit,
        hasMore: false,
      };
    }

    const cleanReviews: PublicCustomerReview[] = (reviewsData || []).map((row) => ({
      id: row.id,
      customer_name: row.customer_name,
      country: row.country || 'Saudi Arabia',
      rating: Number(row.rating) || 5,
      comment: row.comment,
      route: row.route || null,
      service_type: row.service_type || 'airport_transfer',
      language: row.language || 'en',
      is_verified_booking: Boolean(row.is_verified_booking),
      created_at: row.created_at,
    }));

    return {
      success: true,
      reviews: cleanReviews,
      statistics: {
        totalPublished,
        averageRating,
        distribution,
      },
      total: totalPublished,
      page: validPage,
      limit: validLimit,
      hasMore: offset + cleanReviews.length < totalPublished,
    };
  } catch (err: any) {
    console.error('Unhandled reviews error:', err);
    return {
      success: false,
      reviews: [],
      statistics: {
        totalPublished: 0,
        averageRating: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      },
      total: 0,
      page: validPage,
      limit: validLimit,
      hasMore: false,
      error: 'Unable to retrieve reviews at this time',
    };
  }
}
