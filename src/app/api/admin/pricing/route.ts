import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

let memoryPrices: Record<string, Record<string, number>> = {
  'jeddah-airport-to-makkah': { camry: 200, staria: 260, yukon: 380, hiace: 340, coaster: 650 },
  'makkah-to-jeddah-airport': { camry: 200, staria: 260, yukon: 380, hiace: 340, coaster: 650 },
  'makkah-to-madinah': { camry: 450, staria: 500, yukon: 750, hiace: 650, coaster: 1200 },
  'madinah-to-makkah': { camry: 450, staria: 500, yukon: 750, hiace: 650, coaster: 1200 },
  'madinah-airport-to-hotel': { camry: 150, staria: 200, yukon: 300, hiace: 270, coaster: 550 },
  'jeddah-to-madinah': { camry: 680, staria: 750, yukon: 1050, hiace: 900, coaster: 1600 },
};

export async function GET() {
  try {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('prices').select('*');
      if (!error && data && data.length > 0) {
        return NextResponse.json({ prices: data });
      }
    } catch (e) {
      console.warn('Prices DB fallback:', e);
    }
    return NextResponse.json({ prices: memoryPrices });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { route_id, vehicle_id, price_sar } = await request.json();

    if (!route_id || !vehicle_id || price_sar === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('prices')
        .upsert({
          route_id,
          vehicle_id,
          price_sar: Number(price_sar),
        })
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ success: true, price: data });
      }
    } catch (e) {
      console.warn('Price upsert DB fallback:', e);
    }

    if (memoryPrices[route_id]) {
      memoryPrices[route_id][vehicle_id] = Number(price_sar);
    }

    return NextResponse.json({ success: true, route_id, vehicle_id, price_sar: Number(price_sar) });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
