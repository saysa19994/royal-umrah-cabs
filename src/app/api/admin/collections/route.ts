import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireRole } from '@/lib/auth/server-auth';
import { hasPermission } from '@/lib/auth/rbac';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
const CashSchema = z.object({
  booking_id: z.string().uuid(),
  received_cash: z.literal(true),
  currency: z.enum(['SAR', 'USD']),
}).strict();

export async function GET(request: Request) {
  const auth = await requireRole(request, ['owner', 'admin']);
  if (auth.errorResponse) return auth.errorResponse;
  if (!(await hasPermission(auth.user.role, 'bookings', 'view'))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const params = new URL(request.url).searchParams;
  const offset = Math.max(0, Number.parseInt(params.get('offset') || '0', 10) || 0);
  const limit = Math.min(50, Math.max(1, Number.parseInt(params.get('limit') || '20', 10) || 20));
  const db = createServiceClient();
  const { data, count, error } = await db.from('bookings')
    .select('id,reference,customer_name,pickup_datetime,final_price_sar,final_price_currency,currency_charged,payment_status,payment_method,status', { count: 'exact' })
    .eq('status', 'completed')
    .order('pickup_datetime', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) return NextResponse.json({ error: 'Unable to read completed journeys' }, { status: 500 });
  return NextResponse.json({ bookings: data || [], total: count || 0, limit, offset }, { headers: { 'Cache-Control': 'private, no-store' } });
}

/** Records an employee's explicit cash-received confirmation; no payment is initiated. */
export async function POST(request: Request) {
  const auth = await requireRole(request, ['owner', 'admin']);
  if (auth.errorResponse) return auth.errorResponse;
  if (!(await hasPermission(auth.user.role, 'bookings', 'edit'))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  let input: z.infer<typeof CashSchema>;
  try { input = CashSchema.parse(await request.json()); }
  catch { return NextResponse.json({ error: 'Confirmation and valid currency are required' }, { status: 400 }); }

  const db = createServiceClient();
  const { data: booking, error: lookupError } = await db.from('bookings')
    .select('id,reference,status,payment_status,payment_method,currency_charged,final_price_sar,final_price_currency')
    .eq('id', input.booking_id).maybeSingle();
  if (lookupError) return NextResponse.json({ error: 'Could not verify booking' }, { status: 500 });
  if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  if (booking.status !== 'completed' || booking.payment_method !== 'pay_upon_arrival') {
    return NextResponse.json({ error: 'Cash may only be recorded after a completed cash-on-arrival journey' }, { status: 409 });
  }
  if (booking.payment_status === 'paid') {
    return NextResponse.json({ error: 'Collection already recorded; duplicates are not allowed' }, { status: 409 });
  }
  if (booking.currency_charged !== input.currency) {
    return NextResponse.json({ error: 'Collection currency must match the confirmed booking currency' }, { status: 409 });
  }
  const { data: saved, error: updateError } = await db.from('bookings')
    .update({ payment_status: 'paid', updated_at: new Date().toISOString() })
    .eq('id', booking.id)
    .eq('status', 'completed')
    .eq('payment_method', 'pay_upon_arrival')
    .eq('payment_status', booking.payment_status)
    .select('id,reference,payment_status').maybeSingle();
  if (updateError) return NextResponse.json({ error: 'Unable to record cash collection' }, { status: 500 });
  if (!saved) return NextResponse.json({ error: 'Booking payment state changed; refresh and retry' }, { status: 409 });

  await logAuditEvent({
    userEmail: auth.user.email, userRole: auth.user.role,
    action: 'cash_collection_confirmed', resource: 'bookings', resourceId: booking.id,
    oldValues: { payment_status: booking.payment_status },
    newValues: {
      payment_status: 'paid', currency: input.currency,
      amount: input.currency === 'SAR' ? booking.final_price_sar : booking.final_price_currency,
      confirmation: 'employee_attested_cash_received',
    },
    ip: getClientIp(request),
  });
  return NextResponse.json({ success: true, booking: saved }, { headers: { 'Cache-Control': 'private, no-store' } });
}
