import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export async function GET(request: Request) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('seasonal_multipliers')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) {
      console.error('Seasons DB error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to retrieve seasonal multipliers from database' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, seasons: data || [] });
  } catch (err: any) {
    console.error('Admin seasons GET error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const { name, multiplier, start_date, end_date } = await request.json();

    if (!name || !multiplier || !start_date || !end_date) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('seasonal_multipliers')
      .insert({
        name,
        multiplier: Number(multiplier),
        start_date,
        end_date,
        is_active: true,
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Failed to insert seasonal multiplier:', error);
      return NextResponse.json({ success: false, error: 'Failed to save season' }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'season_created',
      resource: 'pricing_seasons',
      resourceId: data.id,
      newValues: { name, multiplier },
      ip: clientIp,
    });

    return NextResponse.json({ success: true, season: data });
  } catch (err: any) {
    console.error('Admin seasons POST error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const { id, is_active, multiplier } = await request.json();
    if (!id) {
      return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
    }

    const serviceClient = createServiceClient();
    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (is_active !== undefined) updates.is_active = is_active;
    if (multiplier !== undefined) updates.multiplier = Number(multiplier);

    const { data, error } = await serviceClient
      .from('seasonal_multipliers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('Failed to update seasonal multiplier:', error);
      return NextResponse.json({ success: false, error: 'Failed to update season' }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'season_updated',
      resource: 'pricing_seasons',
      resourceId: id,
      newValues: updates,
      ip: clientIp,
    });

    return NextResponse.json({ success: true, season: data });
  } catch (err: any) {
    console.error('Admin seasons PATCH error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
