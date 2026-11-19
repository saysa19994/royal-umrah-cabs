import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { hasPermission } from '@/lib/auth/rbac';
import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';

/** Trusted selection options for manual reservation entry. */
export async function GET(request: Request) {
  const auth = await requireRole(request, ['owner', 'admin']);
  if (auth.errorResponse) return auth.errorResponse;
  if (!(await hasPermission(auth.user.role, 'bookings', 'create'))) {
    return NextResponse.json({ error: 'Insufficient permission' }, { status: 403 });
  }
  const db = createServiceClient();
  const [routes, vehicles, prices] = await Promise.all([
    db.from('routes').select('id,origin_city,destination_city,is_active').eq('is_active', true).order('display_order'),
    db.from('vehicles').select('id,name,seats,bags,is_active').eq('is_active', true).order('display_order'),
    db.from('prices').select('route_id,vehicle_id,price_sar').limit(300),
  ]);
  if (routes.error || vehicles.error || prices.error) {
    return NextResponse.json({ error: 'Unable to load reservation options' }, { status: 500 });
  }
  return NextResponse.json({
    routes: routes.data || [], vehicles: vehicles.data || [],
    basePrices: prices.data || [], pricesAreBaseOnly: true,
  }, { headers: { 'Cache-Control': 'private, no-store' } });
}
