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
    if (isNaN(numPrice) || numPrice <= 0) {
      return NextResponse.json({ error: 'Invalid price value' }, { status: 400 });
    }

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('prices')
      .upsert({
        route_id,
        vehicle_id,
        price_sar: numPrice,
        updated_at: new Date().toISOString(),
      })
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
