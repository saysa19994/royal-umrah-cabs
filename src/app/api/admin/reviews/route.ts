import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

/**
 * Admin API for reviews moderation.
 * Single source of truth: PostgreSQL public.reviews table.
 * Instant cache invalidation via revalidateTag('site_reviews').
 */
export async function GET(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const rating = searchParams.get('rating');
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '50', 10), 1), 100);
    const offset = (page - 1) * limit;

    const supabase = createServiceClient();

    // 1. Fetch counts breakdown
    const { data: allRows, error: countsErr } = await supabase
      .from('reviews')
      .select('is_approved, rating');

    const counts = {
      all: 0,
      pending: 0,
      published: 0,
      rejected: 0,
    };

    let totalRatingSum = 0;
    let publishedCount = 0;

    (allRows || []).forEach((row) => {
      counts.all++;
      if (row.is_approved) {
        counts.published++;
        publishedCount++;
        totalRatingSum += Number(row.rating) || 5;
      } else {
        counts.pending++;
      }
    });

    const averageRating = publishedCount > 0
      ? Math.round((totalRatingSum / publishedCount) * 10) / 10
      : 5.0;

    // 2. Query paginated list with filters
    let query = supabase
      .from('reviews')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      if (status === 'published') {
        query = query.eq('is_approved', true);
      } else if (status === 'pending') {
        query = query.eq('is_approved', false);
      } else if (status === 'rejected') {
        return NextResponse.json({
          success: true,
          reviews: [],
          counts,
          averageRating,
          total: 0,
          page,
          limit,
        });
      }
    }

    if (rating && rating !== 'all') {
      query = query.eq('rating', parseInt(rating, 10));
    }

    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      query = query.or(`customer_name.ilike.${term},comment.ilike.${term},route.ilike.${term}`);
    }

    query = query.range(offset, offset + limit - 1);

    const { data: reviews, count, error } = await query;

    if (error) {
      console.error('Admin reviews query error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to retrieve reviews from database' },
        { status: 500 }
      );
    }

    const normalizedReviews = (reviews || []).map((row: any) => ({
      ...row,
      status: row.status || (row.is_approved ? 'published' : 'pending'),
    }));

    return NextResponse.json({
      success: true,
      reviews: normalizedReviews,
      counts,
      averageRating,
      total: count || 0,
      page,
      limit,
    });
  } catch (err: any) {
    console.error('Admin reviews GET exception:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Moderates review status (approve/publish, pending, reject).
 */
export async function PATCH(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }
    const { user: currentUser } = authResult;
    const clientIp = getClientIp(req);

    const body = await req.json();
    const { id, status, is_approved, customer_name, comment, route } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Review ID is required' }, { status: 400 });
    }

    const updates: Record<string, any> = {};

    if (typeof is_approved === 'boolean') {
      updates.is_approved = is_approved;
    } else if (status) {
      updates.is_approved = status === 'published';
    }

    if (customer_name) updates.customer_name = customer_name.trim();
    if (comment) updates.comment = comment.trim();
    if (route) updates.route = route.trim();

    const supabase = createServiceClient();
    
    const { data: updatedData, error: updateError } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (updateError) {
      console.error('Admin review update error:', updateError);
      return NextResponse.json({
        success: false,
        error: `Failed to update review in database: ${updateError.message}`
      }, { status: 500 });
    }

    const normalizedReview = updatedData
      ? {
          ...updatedData,
          status: updatedData.status || (updatedData.is_approved ? 'published' : 'pending'),
        }
      : updatedData;

    // Instant multi-locale cache invalidation
    try {
      revalidateTag('site_reviews');
      revalidateTag('site_settings');
    } catch (tagErr) {
      console.warn('Review cache tag revalidation notice:', tagErr);
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'review_moderation',
      resource: 'reviews',
      resourceId: id,
      newValues: {
        new_status: status,
        is_approved: updates.is_approved,
      },
      ip: clientIp,
    });

    return NextResponse.json({ success: true, review: normalizedReview });
  } catch (err: any) {
    console.error('Admin review PATCH exception:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Permanently deletes a review.
 */
export async function DELETE(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }
    const { user: currentUser } = authResult;
    const clientIp = getClientIp(req);

    const { searchParams } = new URL(req.url);
    let id = searchParams.get('id');

    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch {}
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'Review ID is required' }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Admin review delete error:', error);
      return NextResponse.json({ success: false, error: 'Failed to delete review from database' }, { status: 500 });
    }

    try {
      revalidateTag('site_reviews');
      revalidateTag('site_settings');
    } catch (tagErr) {
      console.warn('Review delete cache tag revalidation notice:', tagErr);
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'review_deletion',
      resource: 'reviews',
      resourceId: id,
      ip: clientIp,
    });

    return NextResponse.json({ success: true, message: 'Review successfully deleted' });
  } catch (err: any) {
    console.error('Admin review DELETE exception:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
