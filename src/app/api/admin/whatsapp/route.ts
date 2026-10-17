import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { FALLBACK_WHATSAPP_NUMBERS } from '@/lib/whatsapp-routing';

export async function GET() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('whatsapp_numbers')
      .select('*')
      .order('priority', { ascending: true });

    if (error || !data || data.length === 0) {
      return NextResponse.json({ success: true, numbers: FALLBACK_WHATSAPP_NUMBERS });
    }

    return NextResponse.json({ success: true, numbers: data });
  } catch (err: any) {
    return NextResponse.json({ success: true, numbers: FALLBACK_WHATSAPP_NUMBERS });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, is_active, label, number, routing_rule, priority, assigned_languages } = body;

    const supabase = createClient();

    if (id) {
      // Update individual record
      const updates: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };
      if (is_active !== undefined) updates.is_active = is_active;
      if (label !== undefined) updates.label = label;
      if (number !== undefined) updates.number = number;
      if (routing_rule !== undefined) updates.routing_rule = routing_rule;
      if (priority !== undefined) updates.priority = priority;
      if (assigned_languages !== undefined) updates.assigned_languages = assigned_languages;

      const { data, error } = await supabase
        .from('whatsapp_numbers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating whatsapp_number:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      await supabase.from('audit_log').insert({
        entity_type: 'whatsapp_number',
        entity_id: id,
        action: 'update',
        new_values: updates,
        performed_by: 'admin_user',
      });

      return NextResponse.json({ success: true, updated: data });
    } else if (routing_rule) {
      // Update routing rule globally across all active records
      const { error } = await supabase
        .from('whatsapp_numbers')
        .update({ routing_rule, updated_at: new Date().toISOString() })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      await supabase.from('audit_log').insert({
        entity_type: 'whatsapp_routing',
        entity_id: 'global',
        action: 'rule_change',
        new_values: { routing_rule },
        performed_by: 'admin_user',
      });

      return NextResponse.json({ success: true, message: `Routing rule updated to ${routing_rule}` });
    }

    return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { label, number, priority = 3, routing_rule = 'main_with_fallback', assigned_languages = ['en'] } = body;

    if (!label || !number) {
      return NextResponse.json({ success: false, error: 'label and number are required' }, { status: 400 });
    }

    const cleanNumber = number.replace(/[^0-9]/g, '');
    const supabase = createClient();

    const { data, error } = await supabase
      .from('whatsapp_numbers')
      .insert({
        label,
        number: cleanNumber,
        priority,
        routing_rule,
        assigned_languages,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    await supabase.from('audit_log').insert({
      entity_type: 'whatsapp_number',
      entity_id: data.id,
      action: 'create',
      new_values: { label, number: cleanNumber },
      performed_by: 'admin_user',
    });

    return NextResponse.json({ success: true, created: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
