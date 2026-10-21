import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

/**
 * POST /api/admin/account/sessions
 * Revokes all other active sessions for the owner.
 */
export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const serviceClient = createServiceClient();

    // Sign out user globally across all other devices via Supabase admin API
    try {
      await serviceClient.auth.admin.signOut(currentUser.id, 'others');
    } catch (e: any) {
      console.warn('signOut others warning:', e);
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: 'owner',
      action: 'owner_sessions_revoked',
      resource: 'account',
      resourceId: currentUser.id,
      newValues: { message: 'Owner signed out of all other remote active sessions' },
      ip: clientIp,
    });

    return NextResponse.json({
      success: true,
      message: 'All other active sessions have been signed out successfully.',
    });
  } catch (err: any) {
    console.error('Sessions revoke error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
