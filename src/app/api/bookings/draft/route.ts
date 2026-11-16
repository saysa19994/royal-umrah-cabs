import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { createBookingDraft, getBookingDraft } from '@/lib/booking-draft-store';

export const dynamic = 'force-dynamic';

const DraftSchema = z.object({
  routeId: z.string().min(1).max(120).optional(),
  vehicleId: z.string().min(1).max(120),
  pickupDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  pickupTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
  passengers: z.coerce.number().int().min(1).max(50).optional(),
  luggage: z.coerce.number().int().min(0).max(50).optional(),
  bookingType: z.enum(['transfer', 'hourly', 'ziyarat', 'group_bus']).optional(),
  pickupLocation: z.string().max(200).optional(),
  dropoffLocation: z.string().max(200).optional(),
  flightNumber: z.string().max(20).optional(),
  durationHours: z.coerce.number().int().min(2).max(24).optional(),
  currency: z.string().max(5).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const rl = await rateLimit(`booking_draft:${getClientIp(req)}`, 15, 60, { failClosed: true });
    if (!rl.success) {
      return NextResponse.json({ success: false, error: 'Too many draft requests' }, { status: rl.serviceError ? 503 : 429 });
    }
    const parsed = DraftSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid booking draft details' }, { status: 400 });
    }
    const { routeId, vehicleId, pickupDate, pickupTime, passengers, luggage, bookingType, pickupLocation, dropoffLocation, flightNumber, durationHours, currency } = parsed.data;

    const draft = await createBookingDraft({
      routeId: routeId || 'jeddah-airport-to-makkah',
      vehicleId,
      bookingType: bookingType || 'transfer',
      pickupDate: pickupDate || new Date().toISOString().split('T')[0],
      pickupTime: pickupTime || '14:00',
      passengers: passengers ?? 1,
      luggage: luggage ?? 0,
      pickupLocation,
      dropoffLocation,
      flightNumber,
      durationHours,
      currency: currency || 'SAR',
    });

    return NextResponse.json({ success: true, draftId: draft.id, draft });
  } catch (err: any) {
    console.error('[Draft API Error]', err);
    return NextResponse.json({ success: false, error: 'Failed to create booking draft' }, { status: 503 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Draft ID is required' }, { status: 400 });
    }

    const draft = await getBookingDraft(id);
    if (!draft) {
      return NextResponse.json({ success: false, error: 'Draft session has expired or is invalid' }, { status: 404 });
    }

    return NextResponse.json({ success: true, draft });
  } catch (err: any) {
    console.error('[Draft GET Error]', err);
    return NextResponse.json({ success: false, error: 'Draft storage temporarily unavailable' }, { status: 503 });
  }
}
