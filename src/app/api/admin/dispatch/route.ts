import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { hasPermission } from '@/lib/auth/rbac';
import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const validDay = (day: string) => /^\d{4}-\d{2}-\d{2}$/.test(day) &&
  !Number.isNaN(new Date(day + 'T12:00:00Z').getTime()) &&
  new Date(day + 'T12:00:00Z').toISOString().slice(0, 10) === day;

function riyadhToday() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Riyadh', day: '2-digit', month: '2-digit', year: 'numeric',
  }).format(new Date());
}

/** Read-only dispatcher board. No fabricated trip or GPS data. */
export async function GET(request: Request) {
  const auth = await requireRole(request, ['owner', 'admin', 'operator']);
  if (auth.errorResponse) return auth.errorResponse;
  if (!(await hasPermission(auth.user.role, 'bookings', 'view'))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const day = new URL(request.url).searchParams.get('day') || riyadhToday();
  if (!validDay(day)) {
    return NextResponse.json({ error: 'Use a valid YYYY-MM-DD day' }, { status: 400 });
  }
  if (auth.user.role === 'operator' && !auth.user.assigned_whatsapp_number) {
    return NextResponse.json({ day, count: 0, truncated: false, bookings: [] }, {
      headers: { 'Cache-Control': 'private, no-store' },
    });
  }
  const start = new Date(day + 'T00:00:00+03:00');
  const end = new Date(start.getTime() + 24 * 3600 * 1000);
  const db = createServiceClient();

  let query = db.from('bookings').select(
    'id,reference,customer_name,pickup_datetime,pickup_location,dropoff_location,vehicle_id,passengers_count,status,driver_name,driver_id,flight_number,final_price_sar,whatsapp_number',
    { count: 'exact' }
  ).gte('pickup_datetime', start.toISOString())
    .lt('pickup_datetime', end.toISOString())
    .in('status', ['new', 'confirmed', 'driver_assigned', 'en_route'])
    .order('pickup_datetime', { ascending: true })
    .limit(200);

  if (auth.user.role === 'operator') {
    query = query.eq('whatsapp_number', auth.user.assigned_whatsapp_number!);
  }

  const { data, count, error } = await query;
  if (error) {
    console.error('Dispatch day query failed:', error);
    return NextResponse.json({ error: 'Unable to load dispatch schedule' }, { status: 500 });
  }
  return NextResponse.json({
    day, count: count ?? 0, truncated: (count ?? 0) > 200, bookings: data || [],
    // Driver location is intentionally NOT claimed: no verified GPS telemetry exists.
    gpsAvailable: false,
  }, { headers: { 'Cache-Control': 'private, no-store' } });
}
