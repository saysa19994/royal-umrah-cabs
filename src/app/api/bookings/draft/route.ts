import { NextRequest, NextResponse } from 'next/server';
import { createBookingDraft, getBookingDraft } from '@/lib/booking-draft-store';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { routeId, vehicleId, pickupDate, pickupTime, passengers, luggage, bookingType, pickupLocation, dropoffLocation, flightNumber, durationHours, currency } = body;

    if (!vehicleId) {
      return NextResponse.json({ success: false, error: 'Vehicle ID is required' }, { status: 400 });
    }

    const draft = await createBookingDraft({
      routeId: routeId || 'jeddah-airport-to-makkah',
      vehicleId,
      bookingType: bookingType || 'transfer',
      pickupDate: pickupDate || new Date().toISOString().split('T')[0],
      pickupTime: pickupTime || '14:00',
      passengers: Number(passengers) || 1,
      luggage: Number(luggage) || 0,
      pickupLocation,
      dropoffLocation,
      flightNumber,
      durationHours: durationHours ? Number(durationHours) : undefined,
      currency: currency || 'SAR',
    });

    return NextResponse.json({ success: true, draftId: draft.id, draft });
  } catch (err: any) {
    console.error('[Draft API Error]', err);
    return NextResponse.json({ success: false, error: err.message || 'Failed to create booking draft' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Draft ID is required' }, { status: 400 });
    }

    const draft = getBookingDraft(id);
    if (!draft) {
      return NextResponse.json({ success: false, error: 'Draft session has expired or is invalid' }, { status: 404 });
    }

    return NextResponse.json({ success: true, draft });
  } catch (err: any) {
    console.error('[Draft GET Error]', err);
    return NextResponse.json({ success: false, error: 'Internal server error retrieving draft' }, { status: 500 });
  }
}
