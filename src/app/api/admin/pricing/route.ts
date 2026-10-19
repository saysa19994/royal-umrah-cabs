import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export async function GET(request: Request) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient.from('prices').select('*');

    if (error) {
      console.error('Prices DB query error:', error);
      return NextResponse.json({ error: 'Failed to retrieve prices from database' }, { status: 500 });
    }

    return NextResponse.json({ prices: data || [] });
  } catch (err: any) {
    console.error('Admin pricing GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const { route_id, vehicle_id, price_sar } = await request.json();

    if (!route_id || !vehicle_id || price_sar === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const numPrice = Number(price_sar);
    if (isNaN(numPrice) || numPrice < 1 || numPrice > 100000) {
      return NextResponse.json({ error: 'Price must be between 1 and 100,000 SAR' }, { status: 400 });
    }
    const roundedPrice = Math.round(numPrice * 100) / 100;

    const serviceClient = createServiceClient();

    // Verify route exists
    const { data: routeData, error: routeErr } = await serviceClient
      .from('routes')
      .select('id')
      .eq('id', route_id)
      .maybeSingle();

    if (routeErr || !routeData) {
      return NextResponse.json({ error: `Route '${route_id}' does not exist` }, { status: 400 });
    }

    // Verify vehicle exists
    const { data: vehicleData, error: vehicleErr } = await serviceClient
      .from('vehicles')
      .select('id')
      .eq('id', vehicle_id)
      .maybeSingle();

    if (vehicleErr || !vehicleData) {
      return NextResponse.json({ error: `Vehicle '${vehicle_id}' does not exist` }, { status: 400 });
    }

    const { data, error } = await serviceClient
      .from('prices')
      .upsert(
        {
          route_id,
          vehicle_id,
          price_sar: roundedPrice,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'route_id,vehicle_id' }
      )
      .select()
      .single();

    if (error || !data) {
      console.error('Price upsert DB error:', error);
      return NextResponse.json({ error: 'Failed to update price in database' }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'price_upsert',
      resource: 'pricing',
      resourceId: data.id,
      newValues: { route_id, vehicle_id, price_sar: numPrice },
      ip: clientIp,
    });

    return NextResponse.json({ success: true, price: data });
  } catch (err: any) {
    console.error('Admin pricing POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
