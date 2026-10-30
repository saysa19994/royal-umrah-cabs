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
    const { name, phone, vehicle_plate, vehicle_model, spoken_languages, is_active } = body;

    if (!name || !phone || !vehicle_plate || !vehicle_model) {
      return NextResponse.json(
        { error: 'Name, phone number, vehicle plate, and vehicle model are required' },
        { status: 400 }
      );
    }

    const newDriver = {
      name: name.trim(),
      phone: phone.trim(),
      vehicle_plate: vehicle_plate.trim(),
      vehicle_model: vehicle_model.trim(),
      spoken_languages: Array.isArray(spoken_languages) && spoken_languages.length > 0 ? spoken_languages : ['Arabic', 'English'],
      is_active: is_active !== false,
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
    const { id, name, phone, vehicle_plate, vehicle_model, spoken_languages, is_active } = body;

    if (!id) {
      return NextResponse.json({ error: 'Driver id is required' }, { status: 400 });
    }

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (name !== undefined) updates.name = name.trim();
    if (phone !== undefined) updates.phone = phone.trim();
    if (vehicle_plate !== undefined) updates.vehicle_plate = vehicle_plate.trim();
    if (vehicle_model !== undefined) updates.vehicle_model = vehicle_model.trim();
    if (spoken_languages !== undefined) updates.spoken_languages = spoken_languages;
    if (is_active !== undefined) updates.is_active = is_active;

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
      return NextResponse.json({ error: 'Driver id is required' }, { status: 400 });
    }

    const serviceClient = createServiceClient();
    const { error } = await serviceClient.from('drivers').delete().eq('id', id);

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

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Driver DELETE exception:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
