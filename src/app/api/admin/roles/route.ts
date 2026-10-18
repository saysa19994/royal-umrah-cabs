import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';
import { RolePermission } from '@/types/auth';

export async function GET(request: Request) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient.from('role_permissions').select('*');

    if (error) {
      console.error('Roles GET error:', error);
      return NextResponse.json({ error: 'Failed to retrieve permissions from database' }, { status: 500 });
    }

    return NextResponse.json({ permissions: data || [] });
  } catch (err: any) {
    console.error('Roles GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const clientIp = getClientIp(request);
    // Strictly require OWNER session for updating permissions matrix
    const authResult = await requireRole(request, ['owner']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const { role, resource, can_view, can_create, can_edit, can_delete, can_publish, can_export } = body;

    if (!role || !resource) {
      return NextResponse.json({ error: 'Role and resource are required.' }, { status: 400 });
    }

    if (role === 'owner') {
      return NextResponse.json(
        { error: 'Owner permissions are permanently full-access and cannot be restricted.' },
        { status: 403 }
      );
    }

    const updated: RolePermission = {
      role,
      resource,
      can_view: Boolean(can_view),
      can_create: Boolean(can_create),
      can_edit: Boolean(can_edit),
      can_delete: Boolean(can_delete),
      can_publish: Boolean(can_publish),
      can_export: Boolean(can_export),
    };

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('role_permissions')
      .upsert(
        {
          ...updated,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'role,resource' }
      )
      .select()
      .single();

    if (error || !data) {
      console.error('Role upsert error:', error);
      return NextResponse.json({ error: 'Failed to update role permissions in database' }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'permission_matrix_updated',
      resource: 'roles',
      resourceId: `${role}:${resource}`,
      newValues: updated,
      ip: clientIp,
    });

    return NextResponse.json({ success: true, permission: data });
  } catch (err: any) {
    console.error('Roles PUT error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
