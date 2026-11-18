import { NextResponse } from 'next/server';
import { z } from 'zod';
import { BOOKING_TIME_PATTERN, isBookingDate } from '@/lib/booking-flight';
import { calculateServerPrice } from '@/lib/pricing-server';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { SUPPORTED_CURRENCY_CODES } from '@/types/booking';

const QuoteSchema = z.object({
  bookingType: z.enum(['transfer', 'hourly', 'ziyarat', 'group_bus']),
  routeId: z.string().max(100).nullable(),
  vehicleId: z.enum(['camry', 'staria', 'yukon', 'hiace', 'coaster']),
  currency: z.enum(SUPPORTED_CURRENCY_CODES),
  durationHours: z.number().int().min(2).max(24).optional(),
  pickupDate: z.string().refine(isBookingDate),
  pickupTime: z.string().regex(BOOKING_TIME_PATTERN),
  passengersCount: z.number().int().min(1).max(50),
  luggageCount: z.number().int().min(0).max(50),
});

export async function POST(request: Request) {
  const limit = await rateLimit(`booking_quote:${getClientIp(request)}`, 30, 600);
  if (!limit.success) {
    return NextResponse.json({ success: false }, { status: 429 });
  }

  const input = QuoteSchema.safeParse(await request.json().catch(() => null));
  if (!input.success) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const { pickupDate, pickupTime, ...pricingInput } = input.data;
  const pickupDatetime = `${pickupDate}T${pickupTime}:00+03:00`;
  if (Date.parse(pickupDatetime) < Date.now() + 60 * 60 * 1000) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    const price = await calculateServerPrice({ ...pricingInput, pickupDatetime });
    return NextResponse.json({ success: true, finalPriceSAR: price.finalPriceSAR });
  } catch {
    return NextResponse.json({ success: false }, { status: 422 });
  }
}
