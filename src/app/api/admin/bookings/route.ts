import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Initial in-memory mock store for demo if Supabase table is empty or offline
let memoryBookings = [
  {
    id: 'b1',
    reference: 'RUC-7419',
    customer_name: 'Dr. Zulkifli bin Ismail',
    customer_phone: '+60123456789',
    customer_email: 'zulkifli@example.my',
    pickup_datetime: new Date(Date.now() + 86400000 * 2).toISOString(),
    pickup_location: 'King Abdulaziz International Airport (KAIA Terminal 1)',
    dropoff_location: 'Swissôtel Al Maqam Makkah',
    passengers_count: 4,
    flight_number: 'SV-832',
    vehicle_id: 'staria',
    status: 'driver_assigned',
    final_price_sar: 260,
    currency_charged: 'MYR',
    final_price_currency: 307,
    special_notes: 'Family with 4 large suitcases. Need booster seat.',
    language: 'ms',
    driver_name: 'Captain Tariq Al-Ghamdi',
    driver_phone: '+966567588261',
    vehicle_plate: 'KSA 4819 HTR',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'b2',
    reference: 'RUC-9281',
    customer_name: 'Ahmad Al-Sayed',
    customer_phone: '+966501234567',
    customer_email: 'ahmad.sayed@example.sa',
    pickup_datetime: new Date(Date.now() + 86400000).toISOString(),
    pickup_location: 'Makkah Clock Royal Tower',
    dropoff_location: 'Madinah Al-Rawda Hotel',
    passengers_count: 5,
    flight_number: null,
    vehicle_id: 'yukon',
    status: 'confirmed',
    final_price_sar: 750,
    currency_charged: 'SAR',
    final_price_currency: 750,
    special_notes: 'Stop at Masjid Miqat Bir Ali requested for Ihram.',
    language: 'ar',
    driver_name: null,
    driver_phone: null,
    vehicle_plate: null,
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'b3',
    reference: 'RUC-3104',
    customer_name: 'Mohammed Farooq',
    customer_phone: '+447911123456',
    customer_email: 'm.farooq@example.co.uk',
    pickup_datetime: new Date(Date.now() + 86400000 * 3).toISOString(),
    pickup_location: 'Prince Mohammad Bin Abdulaziz Airport (MED)',
    dropoff_location: 'The Oberoi Madinah',
    passengers_count: 2,
    flight_number: 'TK-104',
    vehicle_id: 'camry',
    status: 'new',
    final_price_sar: 150,
    currency_charged: 'GBP',
    final_price_currency: 32,
    special_notes: 'First time visiting Madinah.',
    language: 'en',
    driver_name: null,
    driver_phone: null,
    vehicle_plate: null,
    created_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');
    const whatsappFilter = searchParams.get('whatsapp_number');

    try {
      const supabase = createClient();
      let query = supabase.from('bookings').select('*').order('created_at', { ascending: false });

      if (statusFilter && statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (whatsappFilter) {
        query = query.eq('driver_phone', whatsappFilter);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return NextResponse.json({ bookings: data });
      }
    } catch (e) {
      console.warn('Admin bookings DB query fallback:', e);
    }

    let filtered = memoryBookings;
    if (statusFilter && statusFilter !== 'all') {
      filtered = memoryBookings.filter((b) => b.status === statusFilter);
    }
    if (whatsappFilter) {
      filtered = filtered.filter((b) => b.driver_phone === whatsappFilter);
    }

    return NextResponse.json({ bookings: filtered });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, reference, status, driver_name, driver_phone, vehicle_plate, updated_by } = body;

    try {
      const supabase = createClient();
      const updateData: any = {};
      if (status) updateData.status = status;
      if (driver_name !== undefined) updateData.driver_name = driver_name;
      if (driver_phone !== undefined) updateData.driver_phone = driver_phone;
      if (vehicle_plate !== undefined) updateData.vehicle_plate = vehicle_plate;

      let query = supabase.from('bookings').update(updateData);
      if (id) {
        query = query.eq('id', id);
      } else if (reference) {
        query = query.eq('reference', reference);
      }

      const { data, error } = await query.select().single();
      if (!error && data) {
        return NextResponse.json({ success: true, booking: data });
      }
    } catch (e) {
      console.warn('Admin bookings DB update fallback:', e);
    }

    // Memory update
    const idx = memoryBookings.findIndex((b) => b.id === id || b.reference === reference);
    if (idx !== -1) {
      if (status) memoryBookings[idx].status = status;
      if (driver_name !== undefined) memoryBookings[idx].driver_name = driver_name;
      if (driver_phone !== undefined) memoryBookings[idx].driver_phone = driver_phone;
      if (vehicle_plate !== undefined) memoryBookings[idx].vehicle_plate = vehicle_plate;
      return NextResponse.json({ success: true, booking: memoryBookings[idx] });
    }

    return NextResponse.json({ success: true, updated: body });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
