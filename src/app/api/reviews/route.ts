import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp, checkRequiredEnv } from '@/lib/rate-limit';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { createServiceClient } from '@/lib/supabase/service';
import { ReviewSubmissionSchema, sanitizeReviewText, getPublishedReviews } from '@/lib/reviews';

export const dynamic = 'force-dynamic';

/**
 * Public endpoint to fetch published customer reviews and real aggregate statistics.
 * Strictly filters out any pending or rejected reviews.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get('sort') === 'highest' ? 'highest' : 'newest';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '6', 10);
    const route = searchParams.get('route') || undefined;
    const language = searchParams.get('language') || undefined;

    const result = await getPublishedReviews({
      sort,
      page,
      limit,
      route,
      language,
    });

    // A failed database read is not a valid empty review list. Avoid caching
    // transient failures as successful responses for visitors and crawlers.
    return NextResponse.json(result, {
      status: result.success ? 200 : 503,
      headers: {
        'Cache-Control': result.success
          ? 'public, s-maxage=30, stale-while-revalidate=120'
          : 'private, no-store',
      },
    });
  } catch (err: any) {
    console.error('Reviews GET error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error while fetching reviews' },
      { status: 500 }
    );
  }
}

/**
 * Public endpoint for pilgrims to submit customer reviews.
 * Strictly forces status = 'pending' and is_approved = false.
 * Protected with Zod validation, text sanitization, rate limiting, and Turnstile.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Production environment fail-closed check
    const envCheck = checkRequiredEnv();
    if (!envCheck.ok && envCheck.response) {
      return envCheck.response;
    }

    const clientIp = getClientIp(req);

    // 2. Abuse protection: Max 5 reviews per 15 minutes per IP
    const rl = await rateLimit(`review_sub:${clientIp}`, 5, 900);
    if (!rl.success) {
      return NextResponse.json(
        { success: false, error: 'Too many submissions. Please wait before submitting another review.' },
        { status: 429 }
      );
    }

    let jsonBody;
    try {
      jsonBody = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed JSON payload' },
        { status: 400 }
      );
    }

    // 3. Strict schema validation
    const parsed = ReviewSubmissionSchema.safeParse(jsonBody);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input fields',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // 4. Cloudflare Turnstile Verification
    const turnstileToken = data['cf-turnstile-response'] || data.turnstile_token;
    const turnstileResult = await verifyTurnstileToken(turnstileToken, clientIp);
    if (!turnstileResult.success) {
      return NextResponse.json(
        { success: false, error: turnstileResult.error || 'Anti-bot verification failed' },
        { status: turnstileResult.status || 400 }
      );
    }

    // 5. Text Sanitization (Prevents XSS / injections)
    const sanitizedName = sanitizeReviewText(data.customer_name);
    const sanitizedComment = sanitizeReviewText(data.comment);
    const sanitizedRoute = data.route ? sanitizeReviewText(data.route) : null;
    const sanitizedCountry = data.country ? sanitizeReviewText(data.country) : 'Saudi Arabia';

    if (sanitizedName.length < 2 || sanitizedComment.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Sanitized input does not satisfy length constraints' },
        { status: 400 }
      );
    }

    // 6. Persist using the deployed public.reviews schema directly.
    // Extended fields (booking_reference, service_type, verified status) require an
    // independently reviewed migration; we must not claim that they were persisted.
    // All submissions remain unapproved until a privileged moderator approves them.
    const supabase = createServiceClient();
    const { data: insertedData, error: insertError } = await supabase
      .from('reviews')
      .insert({
        customer_name: sanitizedName,
        rating: data.rating,
        comment: sanitizedComment,
        route: sanitizedRoute,
        country: sanitizedCountry,
        language: data.language,
        is_approved: false,
      })
      .select('id')
      .maybeSingle();

    if (insertError) {
      console.error('Review insert failed:', insertError.message);
      return NextResponse.json({
        success: false,
        error: 'The review could not be saved. Please try again later.',
      }, { status: 503 });
    }

    const insertedId = insertedData?.id;
    if (!insertedId) {
      return NextResponse.json({ success: false, error: 'Could not verify that the review was saved.' }, { status: 503 });
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your review has been submitted successfully and will be published upon moderation.',
        reviewId: insertedId,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Review submission error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing review submission' },
      { status: 500 }
    );
  }
}
