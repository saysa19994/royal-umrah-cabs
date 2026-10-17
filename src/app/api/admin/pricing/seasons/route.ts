import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export interface SeasonalMultiplier {
  id: string;
  name: string;
  multiplier: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

const DEFAULT_SEASONS: SeasonalMultiplier[] = [
  {
    id: 'ramadan-peak-2026',
    name: 'Ramadan Last 10 Nights',
    multiplier: 1.35,
    start_date: '2026-03-20',
    end_date: '2026-04-01',
    is_active: false,
  },
  {
    id: 'hajj-peak-2026',
    name: 'Hajj Sacred Season',
    multiplier: 1.50,
    start_date: '2026-05-24',
    end_date: '2026-06-05',
    is_active: false,
  },
  {
    id: 'winter-holidays',
    name: 'Winter Holiday High Season',
    multiplier: 1.15,
    start_date: '2026-12-15',
    end_date: '2027-01-10',
    is_active: false,
  },
];

export async function GET() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('seasonal_multipliers')
      .select('*')
      .order('start_date', { ascending: true });

    if (!error && data && data.length > 0) {
      return NextResponse.json({ success: true, seasons: data });
    }
    return NextResponse.json({ success: true, seasons: DEFAULT_SEASONS });
  } catch (err: any) {
    return NextResponse.json({ success: true, seasons: DEFAULT_SEASONS });
  }
}

export async function POST(request: Request) {
  try {
    const { name, multiplier, start_date, end_date } = await request.json();

    if (!name || !multiplier || !start_date || !end_date) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30);
    const supabase = createClient();

    const { data, error } = await supabase
      .from('seasonal_multipliers')
      .insert({
        id,
        name,
        multiplier: Number(multiplier),
        start_date,
        end_date,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    await supabase.from('audit_log').insert({
      entity_type: 'seasonal_multiplier',
      entity_id: id,
      action: 'create',
      new_values: { name, multiplier },
      performed_by: 'admin_user',
    });

    return NextResponse.json({ success: true, season: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, is_active, multiplier } = await request.json();
    if (!id) {
      return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
    }

    const supabase = createClient();
    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (is_active !== undefined) updates.is_active = is_active;
    if (multiplier !== undefined) updates.multiplier = Number(multiplier);

    const { data, error } = await supabase
      .from('seasonal_multipliers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    await supabase.from('audit_log').insert({
      entity_type: 'seasonal_multiplier',
      entity_id: id,
      action: 'update',
      new_values: updates,
      performed_by: 'admin_user',
    });

    return NextResponse.json({ success: true, season: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
