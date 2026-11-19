import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { hasPermission } from '@/lib/auth/rbac';
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
    if (!(await hasPermission(currentUser.role, 'leads', 'view'))) {
      return NextResponse.json({ success: false, error: 'Forbidden: Insufficient permissions to view leads' }, { status: 403 });
    }
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '50', 10), 1), 100);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);

    const serviceClient = createServiceClient();
    let query = serviceClient
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    const allowedLeadStatuses = ['new', 'replied', 'confirmed', 'completed', 'lost'];
    if (status && status !== 'all') {
      if (!allowedLeadStatuses.includes(status)) {
        return NextResponse.json({ error: 'Invalid status filter' }, { status: 400 });
      }
      query = query.eq('status', status);
    }

    const search = (searchParams.get('q') || '').normalize('NFKC')
      .replace(/[^\p{L}\p{N} @+_-]/gu, '').trim().slice(0, 80);
    if (search) {
      query = query.or('ref_code.ilike.%' + search + '%,customer_name.ilike.%' + search +
        '%,customer_phone.ilike.%' + search + '%');
    }

    // Scoped operator filter: strictly restrict to assigned WhatsApp number on server
    if (currentUser.role === 'operator') {
      if (!currentUser.assigned_whatsapp_number) {
        return NextResponse.json({ success: true, leads: [], total: 0, limit, offset });
      }
      query = query.eq('whatsapp_number', currentUser.assigned_whatsapp_number);
    }

    query = query.range(offset, offset + limit - 1);

    const { data: leads, count, error } = await query;
    if (error) {
      console.error('Error fetching leads:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch leads from database' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, leads: leads || [], total: count ?? (leads?.length || 0), limit, offset });
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
    if (!(await hasPermission(currentUser.role, 'leads', 'edit'))) {
      return NextResponse.json({ success: false, error: 'Forbidden: Insufficient permissions to edit leads' }, { status: 403 });
    }
    const body = await request.json();
    const { id, status, notes, assigned_operator_id } = body;
    const allowedKeys = ['id', 'status', 'notes', 'assigned_operator_id'];
    if (Object.keys(body).some(key => !allowedKeys.includes(key))) {
      return NextResponse.json({ error: 'Unsupported update fields' }, { status: 400 });
    }
    if (status !== undefined && !['new', 'replied', 'confirmed', 'completed', 'lost'].includes(status)) {
      return NextResponse.json({ error: 'Invalid lead status' }, { status: 400 });
    }
    if (notes !== undefined && (typeof notes !== 'string' || notes.length > 2000)) {
      return NextResponse.json({ error: 'Notes must be text with a 2000 character limit' }, { status: 400 });
    }
    if (assigned_operator_id !== undefined &&
      assigned_operator_id !== null &&
      (typeof assigned_operator_id !== 'string' ||
       !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(assigned_operator_id))) {
      return NextResponse.json({ error: 'Invalid operator reference' }, { status: 400 });
    }

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

    // Operator scope verification & field restrictions
    if (currentUser.role === 'operator') {
      if (currentLead.whatsapp_number !== currentUser.assigned_whatsapp_number) {
        return NextResponse.json(
          { success: false, error: 'Forbidden: Cannot modify leads outside your assigned scope' },
          { status: 403 }
        );
      }
      if (assigned_operator_id !== undefined) {
        return NextResponse.json(
          { success: false, error: 'Forbidden: Operators cannot reassign leads' },
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

    if (Object.keys(updates).length === 1) {
      return NextResponse.json({ error: 'No editable fields provided' }, { status: 400 });
    }

    const { data, error } = await serviceClient
      .from('leads')
      .update(updates)
      .eq('id', id)
      .eq('status', currentLead.status)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error updating lead:', error);
      return NextResponse.json({ success: false, error: 'Failed to update lead' }, { status: 500 });
    }
    if (!data) return NextResponse.json({ error: 'Lead changed during update; refresh and retry' }, { status: 409 });

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
