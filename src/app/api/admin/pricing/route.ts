import { revalidateSite } from '@/lib/cache-revalidate';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';
import { getAllAdminRoutesWithPrices, upsertRouteWithPricesAdmin, toggleOrDeleteRouteAdmin } from '@/lib/routes-service';
import { setDynamicTransferRate } from '@/lib/dynamic-pricing-store';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode');

    // Return structured full routes catalog with vehicle prices, active status and USD calculations
    if (mode === 'routes') {
      const routes = await getAllAdminRoutesWithPrices();
      return NextResponse.json({ success: true, routes });
    }

    // Default legacy flat prices array for backward compatibility
    const routes = await getAllAdminRoutesWithPrices();
    const pricesList: Array<{ id: string; route_id: string; vehicle_id: string; price_sar: number }> = [];

    routes.forEach((r) => {
      Object.entries(r.rates).forEach(([vId, sar]) => {
        pricesList.push({
          id: `${r.id}_${vId}`,
          route_id: r.id,
          vehicle_id: vId,
          price_sar: sar,
        });
      });
    });

    return NextResponse.json({ prices: pricesList, routes });
  } catch (err: any) {
    console.error('Pricing GET error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error retrieving pricing' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }
    const { user: currentUser } = authResult;
    const body = await request.json();

    // Route-level upsert (with multi-vehicle prices)
    if (body.route) {
      const result = await upsertRouteWithPricesAdmin(body.route, currentUser.email, currentUser.role, clientIp);
      return NextResponse.json(result);
    }

    // Single route-vehicle price update
    const { route_id, vehicle_id, price_sar } = body;
    if (!route_id || !vehicle_id || price_sar === undefined) {
      return NextResponse.json({ error: 'Missing required pricing fields' }, { status: 400 });
    }

    const numericPrice = Number(price_sar);
    if (isNaN(numericPrice) || numericPrice < 0) {
      return NextResponse.json({ error: 'Invalid price value' }, { status: 400 });
    }

    // Persist first: never report success when Supabase rejects the update.
    let persistedPrice;
    try {
      const serviceClient = createServiceClient();
      const { data, error } = await serviceClient.from('prices').upsert(
        {
          route_id,
          vehicle_id,
          price_sar: numericPrice,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'route_id,vehicle_id' }
      ).select('route_id,vehicle_id,price_sar').single();
      if (error || !data) {
        console.error('Price persistence failed:', error);
        return NextResponse.json({ error: 'Price was not saved. Please retry.' }, { status: 503 });
      }
      persistedPrice = data;
    } catch (dbErr) {
      console.error('Price persistence unavailable:', dbErr);
      return NextResponse.json({ error: 'Price was not saved. Please retry.' }, { status: 503 });
    }

    // Update the local fallback only after the database confirms persistence.
    setDynamicTransferRate(route_id, vehicle_id, persistedPrice.price_sar);

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'price_upsert',
      resource: 'pricing',
      resourceId: `${route_id}:${vehicle_id}`,
      newValues: { route_id, vehicle_id, price_sar: numericPrice },
      ip: clientIp,
    });

    revalidateTag('site_prices');
    revalidateTag('site_settings');
    revalidatePath('/[locale]/pricing', 'page');

    return NextResponse.json({
      success: true,
      price: {
        id: `${route_id}_${vehicle_id}`,
        route_id,
        vehicle_id,
        price_sar: numericPrice,
      },
    });
  } catch (err: any) {
    console.error('Pricing POST error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error saving pricing' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }
    const { user: currentUser } = authResult;
    const { searchParams } = new URL(request.url);
    const routeId = searchParams.get('routeId');
    const action = searchParams.get('action') === 'delete' ? 'delete' : 'toggle';

    if (!routeId) {
      return NextResponse.json({ success: false, error: 'Route ID is required' }, { status: 400 });
    }

    const result = await toggleOrDeleteRouteAdmin(routeId, action, currentUser.email, currentUser.role, clientIp);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Pricing DELETE error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error managing route' }, { status: 500 });
  }
}
