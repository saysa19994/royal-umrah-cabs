import { revalidateSite } from '@/lib/cache-revalidate';
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';
import { getAllAdminRoutesWithPrices, upsertRouteWithPricesAdmin, toggleOrDeleteRouteAdmin } from '@/lib/routes-service';
import { publishFares } from '@/lib/published-fares';

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
      return NextResponse.json(result, {status:result.success?200:503});
    }

    // Single route-vehicle price update
    const { route_id, vehicle_id, price_sar } = body;
    if (!route_id || !vehicle_id || price_sar === undefined) {
      return NextResponse.json({ error: 'Missing required pricing fields' }, { status: 400 });
    }

    // Avoid silently converting blank strings, nulls, booleans or arrays to 0/1.
    const priceIsNumericInput = typeof price_sar === 'number' ||
      (typeof price_sar === 'string' && price_sar.trim().length > 0);
    const numericPrice = priceIsNumericInput ? Number(price_sar) : NaN;
    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return NextResponse.json({ error: 'Invalid price value' }, { status: 400 });
    }

    // One approved-fare row is the sole source of truth for this edit.
    // No legacy price row is silently promoted or overwritten.
    if (numericPrice <= 0) return NextResponse.json({ error: 'Published fares must be greater than zero' }, { status: 400 });
    try {
      await publishFares([{route_id,vehicle_id,price_sar:numericPrice}]);
    } catch (e) {
      console.error('Fare publish failed',e);
      return NextResponse.json({ error: 'Approved price could not be published' }, { status: 503 });
    }

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
    revalidatePath('/[locale]/routes/[slug]', 'page');
    revalidatePath('/[locale]/routes', 'page');

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
    return NextResponse.json(result, { status: result.success ? 200 : 503 });
  } catch (err: any) {
    console.error('Pricing DELETE error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error managing route' }, { status: 500 });
  }
}
