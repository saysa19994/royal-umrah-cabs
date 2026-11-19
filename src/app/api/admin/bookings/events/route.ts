import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireRole } from '@/lib/auth/server-auth';
import { hasPermission } from '@/lib/auth/rbac';
import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const auth = await requireRole(request, ['owner', 'admin', 'operator']);
  if (auth.errorResponse) return auth.errorResponse;
  if (!(await hasPermission(auth.user.role, 'bookings', 'view'))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const id = new URL(request.url).searchParams.get('id');
  if (!z.string().uuid().safeParse(id).success) {
    return NextResponse.json({ error: 'Valid booking ID is required' }, { status: 400 });
  }
  const db = createServiceClient();
  let scoped = db.from('bookings').select('id,whatsapp_number').eq('id', id!);
  if (auth.user.role === 'operator') {
    if (!auth.user.assigned_whatsapp_number) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    scoped = scoped.eq('whatsapp_number', auth.user.assigned_whatsapp_number);
  }
  const { data: booking, error: bookingError } = await scoped.maybeSingle();
  if (bookingError) return NextResponse.json({ error: 'Booking unavailable' }, { status: 500 });
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

  const { data, error } = await db.from('audit_log')
    .select('action,created_at,performed_by,old_values,new_values')
    .in('entity_type', ['booking', 'bookings'])
    .eq('entity_id', booking.id)
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) return NextResponse.json({ error: 'Could not load booking history' }, { status: 500 });

  // Return only reviewed, non-sensitive event fields; exclude personal data and freeform payloads.
  const events = (data || []).map(entry => ({
    action: entry.action,
    created_at: entry.created_at,
    actor_type: entry.performed_by === 'customer_online' ? 'customer' : 'staff',
    old_status: typeof entry.old_values?.status === 'string' ? entry.old_values.status : null,
    new_status: typeof entry.new_values?.status === 'string' ? entry.new_values.status : null,
    cash_confirmed: entry.action === 'cash_collection_confirmed',
    driver_assigned: entry.action === 'driver_assigned',
  }));
  return NextResponse.json({ events }, { headers: { 'Cache-Control': 'private, no-store' } });
}
