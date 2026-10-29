export type ReviewStatus = 'pending' | 'published' | 'rejected';

export interface CustomerReview {
  id: string;
  customer_name: string;
  country: string;
  rating: number; // 1 to 5
  comment: string;
  route?: string | null;
  service_type?: string | null;
  language: string;
  status: ReviewStatus;
  is_approved: boolean;
  google_review_id?: string | null;
  booking_reference?: string | null;
  is_verified_booking?: boolean;
  admin_notes?: string | null;
  created_at: string;
  updated_at?: string;
}

/**
 * Public-safe review representation returned to unauthenticated visitors.
 * Strips admin notes, internal metadata, and guarantees status is published.
 */
export interface PublicCustomerReview {
  id: string;
  customer_name: string;
  country: string;
  rating: number;
  comment: string;
  route?: string | null;
  service_type?: string | null;
  language: string;
  is_verified_booking?: boolean;
  created_at: string;
}

export interface ReviewSubmissionPayload {
  customer_name: string;
  rating: number;
  comment: string;
  route?: string;
  service_type?: string;
  country?: string;
  booking_reference?: string;
  language?: string;
  turnstile_token?: string;
  'cf-turnstile-response'?: string;
}

export interface ReviewStatistics {
  totalPublished: number;
  averageRating: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface PublicReviewsResponse {
  success: boolean;
  reviews: PublicCustomerReview[];
  statistics: ReviewStatistics;
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  error?: string;
}
