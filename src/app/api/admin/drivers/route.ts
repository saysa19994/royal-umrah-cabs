import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin', 'operator']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const serviceClient = createServiceClient();
    const { data: drivers, error } = await serviceClient
      .from('drivers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Drivers GET error:', error);
      return NextResponse.json({ error: 'Failed to retrieve drivers' }, { status: 500 });
    }

    return NextResponse.json({ success: true, drivers: drivers || [] });
  } catch (err: any) {
    console.error('Drivers GET exception:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const { full_name, phone, license_number, vehicle_id, languages, status } = body;

    if (!full_name || !phone) {
      return NextResponse.json({ error: 'Full name and phone number are required' }, { status: 400 });
    }

    const newDriver = {
      full_name: full_name.trim(),
      phone: phone.trim(),
      license_number: license_number?.trim() || null,
      vehicle_id: vehicle_id || null,
      languages: languages || ['ar', 'en'],
      status: status || 'available',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('drivers')
      .insert(newDriver)
      .select('*')
      .single();

    if (error) {
      console.error('Driver insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'driver_created',
      resource: 'drivers',
      resourceId: data.id,
      newValues: newDriver,
      ip: clientIp,
    });

    return NextResponse.json({ success: true, driver: data }, { status: 201 });
  } catch (err: any) {
    console.error('Driver POST exception:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin', 'operator']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const { id, full_name, phone, license_number, vehicle_id, languages, status } = body;

    if (!id) {
      return NextResponse.json({ error: 'Driver ID is required' }, { status: 400 });
    }

    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (full_name !== undefined) updates.full_name = full_name.trim();
    if (phone !== undefined) updates.phone = phone.trim();
    if (license_number !== undefined) updates.license_number = license_number?.trim();
    if (vehicle_id !== undefined) updates.vehicle_id = vehicle_id;
    if (languages !== undefined) updates.languages = languages;
    if (status !== undefined) updates.status = status;

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('drivers')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Driver update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'driver_updated',
      resource: 'drivers',
      resourceId: id,
      newValues: updates,
      ip: clientIp,
    });

    return NextResponse.json({ success: true, driver: data });
  } catch (err: any) {
    console.error('Driver PATCH exception:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Driver ID required' }, { status: 400 });
    }

    const serviceClient = createServiceClient();
    const { error } = await serviceClient
      .from('drivers')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Driver delete error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'driver_deleted',
      resource: 'drivers',
      resourceId: id,
      ip: clientIp,
    });

    return NextResponse.json({ success: true, message: 'Driver removed successfully' });
  } catch (err: any) {
    console.error('Driver DELETE exception:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
