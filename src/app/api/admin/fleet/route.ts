import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

let memoryFleet = [
  { id: 'staria', name: 'Hyundai Staria VIP', category: 'Family Van', seats: 7, bags: 6, is_active: true },
  { id: 'yukon', name: 'GMC Yukon XL', category: 'Luxury VIP SUV', seats: 7, bags: 6, is_active: true },
  { id: 'camry', name: 'Toyota Camry Sedan', category: 'Standard Sedan', seats: 4, bags: 3, is_active: true },
  { id: 'hiace', name: 'Toyota HiAce Minibus', category: 'Group Minibus', seats: 11, bags: 10, is_active: true },
  { id: 'coaster', name: 'Toyota Coaster VIP', category: 'Luxury Bus', seats: 19, bags: 18, is_active: true },
];

export async function GET() {
  try {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('vehicles').select('*').order('display_order');
      if (!error && data && data.length > 0) {
        return NextResponse.json({ fleet: data });
      }
    } catch (e) {
      console.warn('Fleet DB fallback:', e);
    }
    return NextResponse.json({ fleet: memoryFleet });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, is_active, seats, bags } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Vehicle ID required' }, { status: 400 });
    }

    try {
      const supabase = createClient();
      const updates: any = {};
      if (is_active !== undefined) updates.is_active = is_active;
      if (seats !== undefined) updates.seats = seats;
      if (bags !== undefined) updates.bags = bags;

      const { data, error } = await supabase.from('vehicles').update(updates).eq('id', id).select().single();
      if (!error && data) {
        return NextResponse.json({ success: true, vehicle: data });
      }
    } catch (e) {
      console.warn('Fleet update DB fallback:', e);
    }

    const idx = memoryFleet.findIndex((v) => v.id === id);
    if (idx !== -1) {
      if (is_active !== undefined) memoryFleet[idx].is_active = is_active;
      if (seats !== undefined) memoryFleet[idx].seats = seats;
      if (bags !== undefined) memoryFleet[idx].bags = bags;
      return NextResponse.json({ success: true, vehicle: memoryFleet[idx] });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
