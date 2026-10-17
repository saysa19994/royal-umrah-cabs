import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const whatsappNumber = searchParams.get('whatsapp_number');

    const supabase = createClient();
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }
    if (whatsappNumber) {
      query = query.eq('whatsapp_number', whatsappNumber);
    }

    const { data: leads, error } = await query;

    if (error) {
      console.error('Error fetching leads:', error);
      return NextResponse.json({ success: true, leads: [] });
    }

    return NextResponse.json({ success: true, leads: leads || [] });
  } catch (error: any) {
    console.error('Leads GET exception:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes, assigned_operator_id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
    }

    const supabase = createClient();

    // 1. Fetch current lead
    const { data: currentLead } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (status !== undefined) updates.status = status;
    if (notes !== undefined) updates.notes = notes;
    if (assigned_operator_id !== undefined) updates.assigned_operator_id = assigned_operator_id;

    const { data, error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating lead:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // 2. Audit log
    await supabase.from('audit_log').insert({
      entity_type: 'lead',
      entity_id: id,
      action: 'status_change',
      old_values: currentLead ? { status: currentLead.status, notes: currentLead.notes } : null,
      new_values: updates,
      performed_by: 'admin_user',
    });

    return NextResponse.json({ success: true, lead: data });
  } catch (error: any) {
    console.error('Leads PATCH exception:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
