import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { reference, phone } = await request.json();

    if (!reference) {
      return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
    }

    const cleanRef = reference.trim().toUpperCase();

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('bookings')
        .select('id, reference, pickup_datetime, status')
        .eq('reference', cleanRef)
        .maybeSingle();

      if (data) {
        const pickupTime = new Date(data.pickup_datetime).getTime();
        const now = Date.now();
        const diffHours = (pickupTime - now) / (1000 * 60 * 60);

        if (diffHours < 24) {
          return NextResponse.json(
            {
              error: 'Late cancellation',
              allowed: false,
              message: 'Pickup is scheduled within less than 24 hours. Please contact dispatch via WhatsApp for assistance.',
            },
            { status: 400 }
          );
        }

        const { error: updateError } = await supabase
          .from('bookings')
          .update({ status: 'cancelled' })
          .eq('reference', cleanRef);

        if (updateError) {
          throw updateError;
        }

        return NextResponse.json({
          success: true,
          message: 'Booking cancelled successfully',
        });
      }
      return NextResponse.json(
        { error: 'Booking not found', message: 'No active booking found with this reference number. Please check your reference or contact dispatch via WhatsApp.' },
        { status: 404 }
      );
    } catch (e: any) {
      console.warn('Supabase cancel error:', e);
      return NextResponse.json({ error: e.message || 'Database error' }, { status: 500 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
