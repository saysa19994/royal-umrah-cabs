import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export async function GET(request: Request) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin', 'operator']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const serviceClient = createServiceClient();
    let query = serviceClient
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    // Scoped operator filter: strictly restrict to assigned WhatsApp number on server
    if (currentUser.role === 'operator') {
      if (!currentUser.assigned_whatsapp_number) {
        return NextResponse.json({ success: true, leads: [] });
      }
      query = query.eq('whatsapp_number', currentUser.assigned_whatsapp_number);
    }

    const { data: leads, error } = await query;
    if (error) {
      console.error('Error fetching leads:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch leads from database' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, leads: leads || [] });
  } catch (error: any) {
    console.error('Leads GET exception:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin', 'operator']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const { id, status, notes, assigned_operator_id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
    }

    const serviceClient = createServiceClient();

    // Fetch current lead
    const { data: currentLead, error: fetchErr } = await serviceClient
      .from('leads')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (fetchErr || !currentLead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    // Operator scope verification
    if (currentUser.role === 'operator') {
      if (currentLead.whatsapp_number !== currentUser.assigned_whatsapp_number) {
        return NextResponse.json(
          { success: false, error: 'Forbidden: Cannot modify leads outside your assigned scope' },
          { status: 403 }
        );
      }
    }

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (status !== undefined) updates.status = status;
    if (notes !== undefined) updates.notes = notes;
    if (assigned_operator_id !== undefined) updates.assigned_operator_id = assigned_operator_id;

    const { data, error } = await serviceClient
      .from('leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('Error updating lead:', error);
      return NextResponse.json({ success: false, error: 'Failed to update lead' }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'lead_status_change',
      resource: 'leads',
      resourceId: id,
      oldValues: { status: currentLead.status, notes: currentLead.notes },
      newValues: updates,
      ip: clientIp,
    });

    return NextResponse.json({ success: true, lead: data });
  } catch (error: any) {
    console.error('Leads PATCH exception:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
