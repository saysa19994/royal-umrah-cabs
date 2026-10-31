import { revalidateSite } from '@/lib/cache-revalidate';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

/**
 * Retrieves the complete fleet catalog.
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin', 'operator', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('vehicles')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Fleet DB error:', error);
      return NextResponse.json({ error: 'Failed to retrieve fleet from database' }, { status: 500 });
    }

    return NextResponse.json({ fleet: data || [] });
  } catch (err: any) {
    console.error('Fleet GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Updates vehicle specifications, capacities, photos, or status.
 */
export async function PATCH(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const { id, is_active, seats, bags, name, category, display_order, photos, features, translations } = body;

    if (!id) {
      return NextResponse.json({ error: 'Vehicle ID required' }, { status: 400 });
    }

    const serviceClient = createServiceClient();
    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (is_active !== undefined) updates.is_active = is_active;
    if (seats !== undefined) updates.seats = Math.max(1, Number(seats));
    if (bags !== undefined) updates.bags = Math.max(0, Number(bags));
    if (name !== undefined) updates.name = name.trim();
    if (category !== undefined) updates.category = category.trim();
    if (display_order !== undefined) updates.display_order = Number(display_order);
    if (photos !== undefined) updates.photos = photos;
    if (features !== undefined) updates.features = features;
    if (translations !== undefined) updates.translations = translations;

    const { data, error } = await serviceClient
      .from('vehicles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('Fleet update DB error:', error);
      return NextResponse.json({ error: 'Failed to update vehicle in database' }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'vehicle_updated',
      resource: 'fleet',
      resourceId: id,
      newValues: updates,
      ip: clientIp,
    });

    try {
      revalidateTag('site_fleet');
      revalidateTag('site_prices');
      revalidatePath('/[locale]', 'page');
      revalidatePath('/[locale]/fleet', 'page');
    } catch {}

    return NextResponse.json({ success: true, vehicle: data });
  } catch (err: any) {
    console.error('Fleet PATCH error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Creates a new vehicle record.
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
    const { id, name, category, seats, bags, photos, features, translations } = body;

    if (!id || !name) {
      return NextResponse.json({ error: 'Vehicle ID and Name are required' }, { status: 400 });
    }

    const serviceClient = createServiceClient();
    const newVehicle = {
      id: id.toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
      name: name.trim(),
      category: category || 'VIP Chauffeur',
      seats: Number(seats) || 4,
      bags: Number(bags) || 3,
      is_active: true,
      display_order: 10,
      photos: photos || {
        exterior: '/assets/images/vehicles/toyota-camry/exterior-studio.webp',
        interior: '/assets/images/vehicles/toyota-camry/interior.webp',
        gallery: []
      },
      features: features || ['Dual Zone Climate Control', 'Chilled Refreshments', 'VIP Reclining Seats'],
      translations: translations || { ar: { name: name.trim() }, en: { name: name.trim() } },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data, error } = await serviceClient
      .from('vehicles')
      .insert(newVehicle)
      .select()
      .single();

    if (error) {
      console.error('Fleet insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'vehicle_created',
      resource: 'fleet',
      resourceId: newVehicle.id,
      newValues: newVehicle,
      ip: clientIp,
    });

    try {
      revalidateTag('site_fleet');
      revalidatePath('/[locale]', 'page');
      revalidatePath('/[locale]/fleet', 'page');
    } catch {}

    return NextResponse.json({ success: true, vehicle: data }, { status: 201 });
  } catch (err: any) {
    console.error('Fleet POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * Safely removes a vehicle.
 */
export async function DELETE(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Vehicle ID required' }, { status: 400 });
    }

    // Safety guard against deleting core active vehicles
    const coreVehicles = ['camry', 'staria', 'yukon', 'hiace', 'coaster'];
    if (coreVehicles.includes(id)) {
      return NextResponse.json({
        error: `Core fleet vehicle [${id}] is required for operational bookings. You may deactivate it instead of deleting.`
      }, { status: 400 });
    }

    const serviceClient = createServiceClient();
    const { error } = await serviceClient
      .from('vehicles')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Fleet delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'vehicle_deleted',
      resource: 'fleet',
      resourceId: id,
      ip: clientIp,
    });

    try {
      revalidateTag('site_fleet');
      revalidatePath('/[locale]', 'page');
      revalidatePath('/[locale]/fleet', 'page');
    } catch {}

    return NextResponse.json({ success: true, message: 'Vehicle deleted successfully' });
  } catch (err: any) {
    console.error('Fleet DELETE error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
