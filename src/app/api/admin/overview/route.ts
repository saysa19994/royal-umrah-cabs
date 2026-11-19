import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { hasPermission } from '@/lib/auth/rbac';
import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const auth = await requireRole(request, ['owner', 'admin', 'operator']);
  if (auth.errorResponse) return auth.errorResponse;
  if (!(await hasPermission(auth.user.role, 'bookings', 'view'))) {
    return NextResponse.json({ error: 'Insufficient permission' }, { status: 403 });
  }

  if (auth.user.role === 'operator' && !auth.user.assigned_whatsapp_number) {
    return NextResponse.json({
      total: 0, new: 0, confirmed: 0, driver_assigned: 0,
      en_route: 0, completed: 0, cancelled: 0, today: 0,
    }, { headers: { 'Cache-Control': 'private, no-store' } });
  }

  const db = createServiceClient();
  const scopedCount = (status?: string, today?: boolean) => {
    let q = db.from('bookings').select('id', { count: 'exact', head: true });
    if (auth.user.role === 'operator') q = q.eq('whatsapp_number', auth.user.assigned_whatsapp_number!);
    if (status) q = q.eq('status', status);
    if (today) {
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit',
      });
      const day = formatter.format(new Date());
      const start = new Date(day + 'T00:00:00+03:00');
      const end = new Date(start.getTime() + 86400000);
      q = q.gte('pickup_datetime', start.toISOString()).lt('pickup_datetime', end.toISOString());
    }
    return q;
  };
  const keys = ['total', 'new', 'confirmed', 'driver_assigned', 'en_route', 'completed', 'cancelled', 'today'] as const;
  const results = await Promise.all(keys.map(key =>
    scopedCount(key === 'total' || key === 'today' ? undefined : key, key === 'today')
  ));
  const failed = results.find(r => r.error);
  if (failed) {
    console.error('Admin overview stats unavailable', failed.error);
    return NextResponse.json({ error: 'Failed to load actual booking totals' }, { status: 500 });
  }
  const metrics = Object.fromEntries(keys.map((key, i) => [key, results[i].count ?? 0]));
  return NextResponse.json(metrics, { headers: { 'Cache-Control': 'private, no-store' } });
}
