import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

/**
 * Retrieves all routes from the database.
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin', 'operator', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const serviceClient = createServiceClient();
    const { data: routes, error } = await serviceClient
      .from('routes')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Routes query error:', error);
      return NextResponse.json({ error: 'Failed to retrieve routes from database' }, { status: 500 });
    }

    return NextResponse.json({ success: true, routes: routes || [] });
  } catch (err: any) {
    console.error('Routes GET exception:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Updates a route's status, duration, distance, Miqat allowance, or display order.
 */
export async function PATCH(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const {
      id,
      origin_city,
      destination_city,
      origin_code,
      destination_code,
      estimated_duration_minutes,
      distance_km,
      miqat_stop_allowed,
      is_active,
      display_order,
      translations,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Route ID is required' }, { status: 400 });
    }

    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (origin_city !== undefined) updates.origin_city = origin_city;
    if (destination_city !== undefined) updates.destination_city = destination_city;
    if (origin_code !== undefined) updates.origin_code = origin_code;
    if (destination_code !== undefined) updates.destination_code = destination_code;
    if (estimated_duration_minutes !== undefined) updates.estimated_duration_minutes = Number(estimated_duration_minutes);
    if (distance_km !== undefined) updates.distance_km = Number(distance_km);
    if (miqat_stop_allowed !== undefined) updates.miqat_stop_allowed = Boolean(miqat_stop_allowed);
    if (is_active !== undefined) updates.is_active = Boolean(is_active);
    if (display_order !== undefined) updates.display_order = Number(display_order);
    if (translations !== undefined) updates.translations = translations;

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('routes')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Route update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'route_updated',
      resource: 'routes',
      resourceId: id,
      newValues: updates,
      ip: clientIp,
    });

    try {
      revalidateTag('site_routes');
      revalidateTag('site_pricing');
    } catch {}

    return NextResponse.json({ success: true, route: data });
  } catch (err: any) {
    console.error('Route PATCH exception:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Creates a new route.
 */
export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const {
      id,
      origin_city,
      destination_city,
      origin_code,
      destination_code,
      estimated_duration_minutes,
      distance_km,
      miqat_stop_allowed,
      display_order,
      translations,
    } = body;

    if (!id || !origin_city || !destination_city) {
      return NextResponse.json({ error: 'Route ID, origin, and destination are required' }, { status: 400 });
    }

    const newRoute = {
      id: id.toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
      origin_city: origin_city.trim(),
      destination_city: destination_city.trim(),
      origin_code: (origin_code || origin_city.slice(0, 3)).toUpperCase(),
      destination_code: (destination_code || destination_city.slice(0, 3)).toUpperCase(),
      estimated_duration_minutes: Number(estimated_duration_minutes) || 60,
      distance_km: Number(distance_km) || 100,
      miqat_stop_allowed: Boolean(miqat_stop_allowed),
      is_active: true,
      display_order: Number(display_order) || 50,
      translations: translations || {
        en: { origin: origin_city, destination: destination_city },
        ar: { origin: origin_city, destination: destination_city },
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('routes')
      .insert(newRoute)
      .select('*')
      .single();

    if (error) {
      console.error('Route insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'route_created',
      resource: 'routes',
      resourceId: newRoute.id,
      newValues: newRoute,
      ip: clientIp,
    });

    try {
      revalidateTag('site_routes');
      revalidateTag('site_pricing');
    } catch {}

    return NextResponse.json({ success: true, route: data }, { status: 201 });
  } catch (err: any) {
    console.error('Route POST exception:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
