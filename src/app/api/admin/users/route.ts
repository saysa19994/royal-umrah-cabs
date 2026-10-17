import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logAuditEvent } from '@/lib/audit';
import { UserProfile, Role } from '@/types/auth';

let memoryUsers: UserProfile[] = [
  {
    id: 'usr-owner-1',
    email: 'owner@royalumrahcabs.com',
    name: 'Executive Owner',
    role: 'owner',
    assigned_whatsapp_number: '966567588261',
    is_suspended: false,
    totp_enabled: true,
    last_login_at: new Date(Date.now() - 3600000).toISOString(),
    created_at: '2026-10-01T00:00:00.000Z',
  },
  {
    id: 'usr-operator-1',
    email: 'operator@royalumrahcabs.com',
    name: 'Secondary Dispatcher (Friend)',
    role: 'operator',
    assigned_whatsapp_number: '966505316971',
    is_suspended: false,
    totp_enabled: false,
    last_login_at: new Date(Date.now() - 7200000).toISOString(),
    created_at: '2026-10-05T00:00:00.000Z',
  },
  {
    id: 'usr-admin-1',
    email: 'admin@royalumrahcabs.com',
    name: 'Operations Manager',
    role: 'admin',
    assigned_whatsapp_number: '966567588261',
    is_suspended: false,
    totp_enabled: true,
    last_login_at: null,
    created_at: '2026-10-06T00:00:00.000Z',
  },
];

export async function GET() {
  try {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.from('user_profiles').select('*').order('created_at');
      if (!error && data && data.length > 0) {
        return NextResponse.json({ users: data });
      }
    } catch (e) {
      console.warn('Supabase users fallback:', e);
    }
    return NextResponse.json({ users: memoryUsers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, assigned_whatsapp_number } = body;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!name || !cleanEmail || !role) {
      return NextResponse.json({ error: 'Name, email, and role are required' }, { status: 400 });
    }

    if (role === 'owner') {
      return NextResponse.json({ error: 'Direct creation of secondary owner is forbidden. Use ownership transfer.' }, { status: 403 });
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      name: name.trim(),
      role: role as Role,
      assigned_whatsapp_number: assigned_whatsapp_number || null,
      is_suspended: false,
      totp_enabled: false,
      last_login_at: null,
      created_at: new Date().toISOString(),
    };

    try {
      const supabase = createClient();
      await supabase.from('user_profiles').insert(newUser);
    } catch (e) {
      console.warn('DB insert fallback:', e);
    }

    memoryUsers.push(newUser);

    await logAuditEvent({
      userEmail: 'owner@royalumrahcabs.com',
      userRole: 'owner',
      action: 'user_invited',
      resource: 'users',
      resourceId: newUser.id,
      newValues: { name: newUser.name, email: newUser.email, role: newUser.role, scope: newUser.assigned_whatsapp_number },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, role, assigned_whatsapp_number, is_suspended } = body;

    const user = memoryUsers.find((u) => u.id === id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // STRICT OWNER PROTECTION:
    if (user.role === 'owner') {
      if (is_suspended === true) {
        return NextResponse.json({ error: 'Violation: The Owner cannot be suspended or locked out.' }, { status: 403 });
      }
      if (role && role !== 'owner') {
        return NextResponse.json({ error: 'Violation: The Owner cannot be demoted. Use ownership transfer flow.' }, { status: 403 });
      }
    }

    const oldValues = { role: user.role, is_suspended: user.is_suspended, scope: user.assigned_whatsapp_number };

    if (role) user.role = role as Role;
    if (assigned_whatsapp_number !== undefined) user.assigned_whatsapp_number = assigned_whatsapp_number;
    if (is_suspended !== undefined) user.is_suspended = Boolean(is_suspended);

    try {
      const supabase = createClient();
      await supabase.from('user_profiles').update({
        role: user.role,
        assigned_whatsapp_number: user.assigned_whatsapp_number,
        is_suspended: user.is_suspended,
        updated_at: new Date().toISOString(),
      }).eq('id', id);
    } catch (e) {
      console.warn('DB update fallback:', e);
    }

    await logAuditEvent({
      userEmail: 'owner@royalumrahcabs.com',
      userRole: 'owner',
      action: 'user_updated',
      resource: 'users',
      resourceId: user.id,
      oldValues,
      newValues: { role: user.role, is_suspended: user.is_suspended, scope: user.assigned_whatsapp_number },
    });

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const targetUser = memoryUsers.find((u) => u.id === id);
    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // STRICT PROTECTION: Owner CANNOT be deleted
    if (targetUser.role === 'owner') {
      return NextResponse.json({ error: 'Violation: The system Owner cannot be deleted under any circumstances.' }, { status: 403 });
    }

    memoryUsers = memoryUsers.filter((u) => u.id !== id);

    try {
      const supabase = createClient();
      await supabase.from('user_profiles').delete().eq('id', id);
    } catch (e) {
      console.warn('DB delete fallback:', e);
    }

    await logAuditEvent({
      userEmail: 'owner@royalumrahcabs.com',
      userRole: 'owner',
      action: 'user_revoked',
      resource: 'users',
      resourceId: id,
      oldValues: { email: targetUser.email, role: targetUser.role },
      newValues: null,
    });

    return NextResponse.json({ success: true, message: 'User access revoked successfully' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
