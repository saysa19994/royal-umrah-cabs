import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

/**
 * Admin API for reviews moderation.
 * Accessible exclusively to authorized staff with 'owner' or 'admin' roles.
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

    // 1. Fetch counts breakdown with backward-compatibility for status column
    let allRows: any[] = [];
    const countsQuery = await supabase
      .from('reviews')
      .select('status, is_approved, rating');

    if (countsQuery.error) {
      // Fallback if status column does not exist yet before migration 004
      const legacyCountsQuery = await supabase
        .from('reviews')
        .select('is_approved, rating');
      allRows = legacyCountsQuery.data || [];
    } else {
      allRows = countsQuery.data || [];
    }

    const counts = {
      all: 0,
      pending: 0,
      published: 0,
      rejected: 0,
    };

    let totalRatingSum = 0;
    let publishedCount = 0;

    allRows.forEach((row) => {
      counts.all++;
      const s = row.status || (row.is_approved ? 'published' : 'pending');
      if (s === 'published') {
        counts.published++;
        publishedCount++;
        totalRatingSum += Number(row.rating) || 5;
      } else if (s === 'rejected') {
        counts.rejected++;
      } else {
        counts.pending++;
      }
    });

    const averageRating = publishedCount > 0
      ? Math.round((totalRatingSum / publishedCount) * 10) / 10
      : 0;

    // 2. Query paginated list with filters
    let query = supabase
      .from('reviews')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      if (status === 'published') {
        query = query.or('status.eq.published,is_approved.eq.true');
      } else if (status === 'rejected') {
        query = query.eq('status', 'rejected');
      } else if (status === 'pending') {
        query = query.or('status.eq.pending,status.is.null,and(is_approved.eq.false,status.neq.rejected)');
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

    let { data: reviews, count, error } = await query;

    // Fallback if query failed (e.g. status filter on legacy schema without status column)
    if (error && status && status !== 'all') {
      let fallbackQuery = supabase
        .from('reviews')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (status === 'published') {
        fallbackQuery = fallbackQuery.eq('is_approved', true);
      } else if (status === 'pending') {
        fallbackQuery = fallbackQuery.eq('is_approved', false);
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

      if (rating && rating !== 'all') {
        fallbackQuery = fallbackQuery.eq('rating', parseInt(rating, 10));
      }

      fallbackQuery = fallbackQuery.range(offset, offset + limit - 1);
      const fallbackRes = await fallbackQuery;
      if (!fallbackRes.error) {
        reviews = fallbackRes.data;
        count = fallbackRes.count;
        error = null;
      }
    }

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

    if (counts.all === 0 && normalizedReviews.length > 0) {
      normalizedReviews.forEach((row: any) => {
        counts.all++;
        if (row.status === 'published') {
          counts.published++;
          publishedCount++;
          totalRatingSum += Number(row.rating) || 5;
        } else if (row.status === 'rejected') {
          counts.rejected++;
        } else {
          counts.pending++;
        }
      });
    }

    const effectiveAverageRating = publishedCount > 0
      ? Math.round((totalRatingSum / publishedCount) * 10) / 10
      : averageRating;

    return NextResponse.json({
      success: true,
      reviews: normalizedReviews,
      counts,
      averageRating: effectiveAverageRating,
      total: count ?? normalizedReviews.length,
      page,
      limit,
    });
  } catch (err: any) {
    console.error('Admin reviews GET exception:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Moderates a review (approve/publish, reject, edit, add notes).
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
    const { id, status, admin_notes, is_verified_booking, customer_name, comment, route } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Review ID is required' }, { status: 400 });
    }

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (status) {
      if (!['pending', 'published', 'rejected'].includes(status)) {
        return NextResponse.json({ success: false, error: 'Invalid moderation status' }, { status: 400 });
      }
      updates.status = status;
      updates.is_approved = status === 'published';
    }

    if (typeof admin_notes !== 'undefined') {
      updates.admin_notes = admin_notes;
    }

    if (typeof is_verified_booking === 'boolean') {
      updates.is_verified_booking = is_verified_booking;
    }

    if (customer_name) updates.customer_name = customer_name.trim();
    if (comment) updates.comment = comment.trim();
    if (route) updates.route = route.trim();

    const supabase = createServiceClient();
    
    // 1. Attempt update with extended columns
    let updateResult = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    // 2. If column error occurs (prior to migration 004 execution in Supabase Dashboard), fallback to legacy columns
    if (updateResult.error) {
      console.warn('Initial admin review update failed, retrying with legacy schema:', updateResult.error.message);

      const legacyUpdates: Record<string, any> = {};
      if (typeof updates.is_approved !== 'undefined') {
        legacyUpdates.is_approved = updates.is_approved;
      }
      if (customer_name) legacyUpdates.customer_name = customer_name.trim();
      if (comment) legacyUpdates.comment = comment.trim();
      if (route) legacyUpdates.route = route.trim();

      const fallbackResult = await supabase
        .from('reviews')
        .update(legacyUpdates)
        .eq('id', id)
        .select('*')
        .maybeSingle();

      if (fallbackResult.error) {
        console.error('Admin review fallback update error:', fallbackResult.error);
        return NextResponse.json({
          success: false,
          error: `Failed to update review in database: ${fallbackResult.error.message || 'unknown error'}`
        }, { status: 500 });
      }

      updateResult = fallbackResult;
    }

    const rawUpdated = updateResult.data;
    const updatedReview = rawUpdated
      ? {
          ...rawUpdated,
          status: rawUpdated.status || (rawUpdated.is_approved ? 'published' : (status === 'rejected' ? 'rejected' : 'pending')),
        }
      : rawUpdated;

    try {
      revalidateTag('site_reviews');
      revalidateTag('site_settings');
    } catch (tagErr) {
      console.warn('Review cache tag revalidation notice:', tagErr);
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
      action: 'review_moderation',
      resource: 'reviews',
      resourceId: id,
      newValues: {
        new_status: status,
        updated_fields: Object.keys(updates),
      },
      ip: clientIp,
    });

    return NextResponse.json({ success: true, review: updatedReview });
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
