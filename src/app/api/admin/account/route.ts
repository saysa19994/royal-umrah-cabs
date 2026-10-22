import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { createClient } from '@/lib/supabase/server';
import { getClientIp } from '@/lib/rate-limit';

/**
 * GET /api/admin/account
 * Strictly restricted to role: 'owner'
 * Returns owner profile details, MFA factors, and recent security logs.
 */
export async function GET(request: Request) {
  try {
    const authResult = await requireRole(request, ['owner']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const serviceClient = createServiceClient();
    const supabase = createClient();

    // 1. Fetch owner profile
    let activeProfile: any = null;
    try {
      const { data: profile } = await serviceClient
        .from('user_profiles')
        .select('id, auth_user_id, email, name, role, totp_enabled, created_at, updated_at')
        .eq('auth_user_id', currentUser.id)
        .maybeSingle();
      if (profile) activeProfile = profile;
    } catch (e) {
      console.warn('Notice querying user_profiles:', e);
    }

    if (!activeProfile) {
      activeProfile = {
        id: currentUser.id || 'owner-master-id',
        auth_user_id: currentUser.auth_user_id || 'owner-master-id',
        email: currentUser.email,
        name: currentUser.name || 'Sayed (Owner)',
        role: 'owner',
        totp_enabled: Boolean(currentUser.totp_enabled),
        created_at: '2026-10-01T00:00:00Z',
        updated_at: new Date().toISOString(),
      };
    }

    // 2. Fetch Supabase MFA factors for owner
    let mfaFactors: any[] = [];
    try {
      const { data: factorsData, error: factorsErr } = await supabase.auth.mfa.listFactors();
      if (!factorsErr && factorsData) {
        mfaFactors = factorsData.totp || [];
      }
    } catch (e) {
      console.warn('MFA listFactors warning:', e);
    }

    // 3. Fetch recent security audit log entries for owner
    const { data: securityLogs } = await serviceClient
      .from('audit_logs')
      .select('id, action, resource, ip_address, created_at')
      .eq('performed_by', currentUser.email)
      .order('created_at', { ascending: false })
      .limit(10);

    return NextResponse.json({
      success: true,
      profile: activeProfile,
      mfa: {
        totp_enabled: Boolean(activeProfile.totp_enabled),
        factors_count: mfaFactors.length,
        verified_factors: mfaFactors.filter((f) => f.status === 'verified').length,
      },
      security_logs: securityLogs || [],
    });
  } catch (err: any) {
    console.error('Account GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
