import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { hasPermission } from '@/lib/auth/rbac';
import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type BookingRow = {
  created_at: string; route_id: string | null; status: string;
  final_price_sar: number | string; payment_status: string; payment_method: string;
};
type LeadRow = { created_at: string; status: string; page: string | null };

const dayKsa = (value: string) => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(new Date(value));

export async function GET(request: Request) {
  const auth = await requireRole(request, ['owner', 'admin']);
  if (auth.errorResponse) return auth.errorResponse;
  if (!(await hasPermission(auth.user.role, 'bookings', 'view')) ||
      !(await hasPermission(auth.user.role, 'leads', 'view'))) {
    return NextResponse.json({ error: 'Insufficient reporting permission' }, { status: 403 });
  }

  const days = Number(new URL(request.url).searchParams.get('days') || '30');
  if (![7, 30, 90].includes(days)) {
    return NextResponse.json({ error: 'Allowed periods: 7, 30 or 90 days' }, { status: 400 });
  }
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const db = createServiceClient();
  const [bookingQuery, leadQuery] = await Promise.all([
    db.from('bookings')
      .select('created_at,route_id,status,final_price_sar,payment_status,payment_method', { count: 'exact' })
      .gte('created_at', since).order('created_at', { ascending: false }).limit(2000),
    db.from('leads')
      .select('created_at,status,page', { count: 'exact' })
      .gte('created_at', since).order('created_at', { ascending: false }).limit(2000),
  ]);
  if (bookingQuery.error || leadQuery.error) {
    console.error('Operations report failed', bookingQuery.error || leadQuery.error);
    return NextResponse.json({ error: 'Unable to calculate operational report' }, { status: 500 });
  }
  const bookings = (bookingQuery.data || []) as BookingRow[];
  const leads = (leadQuery.data || []) as LeadRow[];
  const incomplete = (bookingQuery.count ?? 0) > bookings.length || (leadQuery.count ?? 0) > leads.length;

  const byStatus: Record<string, number> = {};
  const byLeadStatus: Record<string, number> = {};
  const routeCounts: Record<string, number> = {};
  const daily: Record<string, { day: string; bookings: number; inquiries: number }> = {};

  let completedValueSAR = 0;
  let recordedCashSAR = 0;
  let awaitingCashSAR = 0;
  for (const b of bookings) {
    byStatus[b.status] = (byStatus[b.status] || 0) + 1;
    const route = b.route_id || 'custom';
    routeCounts[route] = (routeCounts[route] || 0) + 1;
    const date = dayKsa(b.created_at);
    if (!daily[date]) daily[date] = { day: date, bookings: 0, inquiries: 0 };
    daily[date].bookings++;
    if (b.status === 'completed') {
      const value = Number(b.final_price_sar || 0);
      if (Number.isFinite(value) && value >= 0) {
        completedValueSAR += value;
        if (b.payment_method === 'pay_upon_arrival') {
          if (b.payment_status === 'paid') recordedCashSAR += value;
          else awaitingCashSAR += value;
        }
      }
    }
  }
  for (const l of leads) {
    byLeadStatus[l.status] = (byLeadStatus[l.status] || 0) + 1;
    const date = dayKsa(l.created_at);
    if (!daily[date]) daily[date] = { day: date, bookings: 0, inquiries: 0 };
    daily[date].inquiries++;
  }

  return NextResponse.json({
    days, since, incomplete,
    bookingCount: bookingQuery.count ?? 0,
    leadCount: leadQuery.count ?? 0,
    byStatus, byLeadStatus,
    completedValueSAR: Number(completedValueSAR.toFixed(2)),
    recordedCashSAR: Number(recordedCashSAR.toFixed(2)),
    awaitingCashSAR: Number(awaitingCashSAR.toFixed(2)),
    daily: Object.values(daily).sort((a, b) => a.day.localeCompare(b.day)),
    topRoutes: Object.entries(routeCounts).sort((a, b) => b[1] - a[1])
      .slice(0, 7).map(([route, count]) => ({ route, count })),
    basis: 'Booking creation time, Saudi Arabia local calendar; value of completed trips, not booking requests.',
  }, { headers: { 'Cache-Control': 'private, no-store' } });
}
