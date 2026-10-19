import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { hasPermission } from '@/lib/auth/rbac';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';
import { z } from 'zod';

const ALLOWED_STAFF_ROLES = [
  'operator',
  'driver',
  'content_editor',
  'translator',
  'partner',
  'admin',
] as const;

const CreateUserSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(200),
  role: z.enum(ALLOWED_STAFF_ROLES, {
    errorMap: () => ({ message: 'Invalid role. Role must be operator, driver, content_editor, translator, partner, or admin' }),
  }),
  assigned_whatsapp_number: z
    .string()
    .trim()
    .regex(/^\d{8,15}$/, 'Assigned WhatsApp number must contain 8 to 15 digits only')
    .nullable()
    .optional(),
});

const UpdateUserSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  role: z.enum(ALLOWED_STAFF_ROLES, {
    errorMap: () => ({ message: 'Invalid role. Role must be operator, driver, content_editor, translator, partner, or admin' }),
  }).optional(),
  assigned_whatsapp_number: z
    .string()
    .trim()
    .regex(/^\d{8,15}$/, 'Assigned WhatsApp number must contain 8 to 15 digits only')
    .nullable()
    .optional(),
  is_suspended: z.boolean().optional(),
});

export async function GET(request: Request) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    if (!(await hasPermission(currentUser.role, 'users', 'view'))) {
      return NextResponse.json({ error: 'Forbidden: Insufficient permissions to view users' }, { status: 403 });
    }

    const serviceClient = createServiceClient();
    // NEVER expose totp_secret
    const { data, error } = await serviceClient
      .from('user_profiles')
      .select('id, auth_user_id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled, last_login_at, created_at')
      .order('created_at');

    if (error) {
      console.error('Supabase users error:', error);
      return NextResponse.json({ error: 'Failed to retrieve users from database' }, { status: 500 });
    }

    return NextResponse.json({ users: data || [] });
  } catch (err: any) {
    console.error('Admin users GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
    if (!(await hasPermission(currentUser.role, 'users', 'create'))) {
      return NextResponse.json({ error: 'Forbidden: Insufficient permissions to create users' }, { status: 403 });
    }
    const body = await request.json();

    if ((body.role as any) === 'owner') {
      return NextResponse.json(
        { error: 'Direct creation of owner is forbidden. Ownership changes happen only through /api/admin/ownership/transfer.' },
        { status: 400 }
      );
    }

    const parseResult = CreateUserSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0]?.message || 'Invalid user data' },
        { status: 400 }
      );
    }

    const { name, email, role, assigned_whatsapp_number } = parseResult.data;
    const cleanEmail = email.toLowerCase();

    // Only owner can create admin accounts
    if (role === 'admin' && currentUser.role !== 'owner') {
      return NextResponse.json(
        { error: 'Forbidden: Only the owner can appoint admin roles.' },
        { status: 403 }
      );
    }

    const serviceClient = createServiceClient();

    // 1. Send staff invitation via Supabase Auth Admin API
    let authUserId: string | null = null;
    try {
      const { data: inviteData, error: inviteError } = await serviceClient.auth.admin.inviteUserByEmail(
        cleanEmail,
        {
          data: {
            name: name.trim(),
            role,
          },
        }
      );
      if (inviteError) {
        console.warn('inviteUserByEmail warning:', inviteError.message);
      } else if (inviteData?.user) {
        authUserId = inviteData.user.id;
      }
    } catch (inviteErr) {
      console.warn('inviteUserByEmail call failed:', inviteErr);
    }

    const newUser = {
      auth_user_id: authUserId,
      email: cleanEmail,
      name: name.trim(),
      role,
      assigned_whatsapp_number: assigned_whatsapp_number || null,
      is_suspended: false,
      totp_enabled: false,
    };

    const { data, error } = await serviceClient
      .from('user_profiles')
      .insert(newUser)
      .select('id, auth_user_id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled, created_at')
      .single();

    if (error || !data) {
      console.error('Failed to create user in database:', error);
      return NextResponse.json({ error: 'Failed to create user profile in database' }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'user_invited',
      resource: 'users',
      resourceId: data.id,
      newValues: { name: data.name, email: data.email, role: data.role, scope: data.assigned_whatsapp_number },
      ip: clientIp,
    });

    return NextResponse.json({ success: true, user: data });
  } catch (err: any) {
    console.error('Admin users POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    if (!(await hasPermission(currentUser.role, 'users', 'edit'))) {
      return NextResponse.json({ error: 'Forbidden: Insufficient permissions to edit users' }, { status: 403 });
    }
    const body = await request.json();

    if ((body.role as any) === 'owner') {
      return NextResponse.json(
        { error: 'Direct role update to owner is forbidden. Ownership changes happen only through /api/admin/ownership/transfer.' },
        { status: 400 }
      );
    }

    const parseResult = UpdateUserSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0]?.message || 'Invalid user data' },
        { status: 400 }
      );
    }

    const { id, role, assigned_whatsapp_number, is_suspended } = parseResult.data;

    const serviceClient = createServiceClient();
    const { data: targetUser, error: findError } = await serviceClient
      .from('user_profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (findError || !targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // STRICT OWNER PROTECTION:
    if (targetUser.role === 'owner') {
      if (is_suspended === true) {
        return NextResponse.json({ error: 'Violation: The Owner cannot be suspended or locked out.' }, { status: 403 });
      }
      if (role) {
        return NextResponse.json({ error: 'Violation: The Owner cannot be demoted. Use ownership transfer flow.' }, { status: 403 });
      }
    }

    // Non-owners cannot promote someone to admin or modify admins
    if (currentUser.role !== 'owner' && (targetUser.role === 'admin' || role === 'admin')) {
      return NextResponse.json(
        { error: 'Forbidden: Only the owner can modify administrator accounts.' },
        { status: 403 }
      );
    }

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (role) updates.role = role;
    if (assigned_whatsapp_number !== undefined) updates.assigned_whatsapp_number = assigned_whatsapp_number;
    if (is_suspended !== undefined) updates.is_suspended = Boolean(is_suspended);

    const { data: updated, error: updateErr } = await serviceClient
      .from('user_profiles')
      .update(updates)
      .eq('id', id)
      .select('id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled, updated_at')
      .single();

    if (updateErr || !updated) {
      console.error('Failed to update user profile:', updateErr);
      return NextResponse.json({ error: 'Failed to update user in database' }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'user_updated',
      resource: 'users',
      resourceId: id,
      oldValues: { role: targetUser.role, is_suspended: targetUser.is_suspended, scope: targetUser.assigned_whatsapp_number },
      newValues: updates,
      ip: clientIp,
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (err: any) {
    console.error('Admin users PUT error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    if (!(await hasPermission(currentUser.role, 'users', 'delete'))) {
      return NextResponse.json({ error: 'Forbidden: Insufficient permissions to delete users' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const serviceClient = createServiceClient();
    const { data: targetUser, error: findError } = await serviceClient
      .from('user_profiles')
      .select('id, auth_user_id, email, role')
      .eq('id', id)
      .maybeSingle();

    if (findError || !targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (targetUser.role === 'owner') {
      return NextResponse.json({ error: 'Violation: The system Owner cannot be deleted under any circumstances.' }, { status: 403 });
    }

    // Delete user profile from database
    const { error: delError } = await serviceClient
      .from('user_profiles')
      .delete()
      .eq('id', id);

    if (delError) {
      console.error('Failed to delete user profile:', delError);
      return NextResponse.json({ error: 'Failed to delete user from database' }, { status: 500 });
    }

    // Terminate Supabase Auth account & active sessions immediately
    if (targetUser.auth_user_id) {
      try {
        await serviceClient.auth.admin.deleteUser(targetUser.auth_user_id);
      } catch (authDelErr) {
        console.warn('Failed to delete user from Supabase Auth:', authDelErr);
      }
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'user_revoked',
      resource: 'users',
      resourceId: id,
      oldValues: { email: targetUser.email, role: targetUser.role },
      newValues: null,
      ip: clientIp,
    });

    return NextResponse.json({ success: true, message: 'User access revoked successfully' });
  } catch (err: any) {
    console.error('Admin users DELETE error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
