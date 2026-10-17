import { NextResponse } from 'next/server';
import { getRolePermissions, DEFAULT_PERMISSIONS_MATRIX } from '@/lib/auth/rbac';
import { logAuditEvent } from '@/lib/audit';
import { createClient } from '@/lib/supabase/server';
import { RolePermission } from '@/types/auth';

let dynamicPermissions: RolePermission[] = [...DEFAULT_PERMISSIONS_MATRIX];

export async function GET() {
  try {
    try {
      const dbPermissions = await getRolePermissions();
      if (dbPermissions && dbPermissions.length > 0) {
        return NextResponse.json({ permissions: dbPermissions });
      }
    } catch (e) {
      console.warn('Roles GET fallback:', e);
    }
    return NextResponse.json({ permissions: dynamicPermissions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { role, resource, can_view, can_create, can_edit, can_delete, can_publish, can_export } = body;

    if (!role || !resource) {
      return NextResponse.json({ error: 'Role and resource are required.' }, { status: 400 });
    }

    if (role === 'owner') {
      return NextResponse.json({ error: 'Owner permissions are permanently full-access and cannot be restricted.' }, { status: 403 });
    }

    const idx = dynamicPermissions.findIndex((p) => p.role === role && p.resource === resource);
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

    if (idx >= 0) {
      dynamicPermissions[idx] = updated;
    } else {
      dynamicPermissions.push(updated);
    }

    try {
      const supabase = createClient();
      await supabase.from('role_permissions').upsert(updated, { onConflict: 'role,resource' });
    } catch (e) {
      console.warn('DB role upsert fallback:', e);
    }

    await logAuditEvent({
      userEmail: 'owner@royalumrahcabs.com',
      userRole: 'owner',
      action: 'permission_matrix_updated',
      resource: 'roles',
      resourceId: `${role}:${resource}`,
      newValues: updated,
    });

    return NextResponse.json({ success: true, permission: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
