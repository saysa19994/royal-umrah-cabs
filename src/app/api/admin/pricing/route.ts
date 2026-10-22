import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';
import { getDynamicTransferRates, setDynamicTransferRate } from '@/lib/dynamic-pricing-store';

export async function GET(request: Request) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const dynamicRates = getDynamicTransferRates();
    const pricesList: Array<{ id: string; route_id: string; vehicle_id: string; price_sar: number }> = [];

    try {
      const serviceClient = createServiceClient();
      const { data, error } = await serviceClient.from('prices').select('*');

      if (!error && data && data.length > 0) {
        const dbKeySet = new Set(data.map((p: any) => `${p.route_id}:${p.vehicle_id}`));
        for (const p of data) {
          pricesList.push({
            id: p.id || `${p.route_id}_${p.vehicle_id}`,
            route_id: p.route_id,
            vehicle_id: p.vehicle_id,
            price_sar: Number(p.price_sar),
          });
        }
        for (const [route_id, vehicleMap] of Object.entries(dynamicRates)) {
          for (const [vehicle_id, price_sar] of Object.entries(vehicleMap)) {
            if (!dbKeySet.has(`${route_id}:${vehicle_id}`)) {
              pricesList.push({
                id: `${route_id}_${vehicle_id}`,
                route_id,
                vehicle_id,
                price_sar: Number(price_sar),
              });
            }
          }
        }
        return NextResponse.json({ prices: pricesList });
      }
    } catch (dbErr) {
      console.warn('Database query fallback to dynamic matrix:', dbErr);
    }

    // Default: populate all rates from dynamic matrix
    for (const [route_id, vehicleMap] of Object.entries(dynamicRates)) {
      for (const [vehicle_id, price_sar] of Object.entries(vehicleMap)) {
        pricesList.push({
          id: `${route_id}_${vehicle_id}`,
          route_id,
          vehicle_id,
          price_sar: Number(price_sar),
        });
      }
    }

    return NextResponse.json({ prices: pricesList });
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

    // 1. Save immediately to dynamic pricing store
    setDynamicTransferRate(route_id, vehicle_id, roundedPrice);

    // 2. Attempt to persist to Supabase if available
    let dbRecordId = `${route_id}_${vehicle_id}`;
    try {
      const serviceClient = createServiceClient();

      // Ensure route exists
      try {
        await serviceClient
          .from('routes')
          .upsert(
            {
              id: route_id,
              origin_city: route_id.split('-to-')[0] || route_id,
              destination_city: route_id.split('-to-')[1] || route_id,
              is_active: true,
            },
            { onConflict: 'id' }
          );
      } catch {}

      // Ensure vehicle exists
      try {
        await serviceClient
          .from('vehicles')
          .upsert(
            {
              id: vehicle_id,
              name: vehicle_id.toUpperCase(),
              category: 'standard',
              seats: vehicle_id === 'hiace' ? 10 : vehicle_id === 'coaster' ? 21 : 7,
              bags: vehicle_id === 'hiace' ? 10 : vehicle_id === 'coaster' ? 20 : 6,
              is_active: true,
            },
            { onConflict: 'id' }
          );
      } catch {}

      // Upsert price
      const { data: upsertData, error: upsertErr } = await serviceClient
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
        .maybeSingle();

      if (upsertErr) {
        console.error('Price upsert DB error:', upsertErr);
        return NextResponse.json({
          success: false,
          error: `تعذر حفظ السعر في قاعدة بيانات Supabase: (${upsertErr.message || 'RLS Policy Block'}). لحفظ الأسعار بشكل دائم، يلزم إضافة مفتاح SUPABASE_SERVICE_ROLE_KEY في Vercel أو تشغيل كود تعطيل RLS في Supabase.`,
          code: upsertErr.code,
        }, { status: 400 });
      }

      if (upsertData?.id) {
        dbRecordId = upsertData.id;
      }
    } catch (dbErr: any) {
      console.warn('Notice persisting price to Supabase:', dbErr);
      return NextResponse.json({
        success: false,
        error: `خطأ أثناء الاتصال بقاعدة البيانات: ${dbErr?.message || 'DB Error'}`,
      }, { status: 500 });
    }

    // 3. Log audit event
    try {
      await logAuditEvent({
        userEmail: currentUser.email,
        userRole: currentUser.role,
        action: 'price_upsert',
        resource: 'pricing',
        resourceId: dbRecordId,
        newValues: { route_id, vehicle_id, price_sar: roundedPrice },
        ip: clientIp,
      });
    } catch (auditErr) {
      console.warn('Notice logging audit event:', auditErr);
    }

    // 4. Invalidate cache tags so public site updates immediately
    try {
      revalidateTag('site_prices');
      revalidateTag('site_settings');
      revalidatePath('/', 'layout');
    } catch (revalErr) {
      console.warn('Notice revalidating cache:', revalErr);
    }

    return NextResponse.json({
      success: true,
      price: {
        id: dbRecordId,
        route_id,
        vehicle_id,
        price_sar: roundedPrice,
      },
    });
  } catch (err: any) {
    console.error('Admin pricing POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
