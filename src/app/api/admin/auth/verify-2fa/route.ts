import { NextResponse } from 'next/server';
import { logAuditEvent } from '@/lib/audit';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { Role } from '@/types/auth';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const { code, factorId } = await request.json();
    const cleanCode = (code || '').trim();

    if (!cleanCode) {
      return NextResponse.json(
        { error: '6-digit code is required.' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
      return NextResponse.json(
        { error: 'Session expired. Please log in again.' },
        { status: 401 }
      );
    }

    // Always use authenticated session email, NEVER trust request body
    const sessionEmail = (authData.user.email || '').trim().toLowerCase();

    // Rate limiting: 5 attempts per 5 minutes per IP + authenticated session email with failClosed
    const rl = await rateLimit(`2fa:${clientIp}:${sessionEmail}`, 5, 300, { failClosed: true });
    if (!rl.success) {
      const retryAfterSeconds = Math.max(1, Math.ceil((rl.reset - Date.now()) / 1000));
      return NextResponse.json(
        { error: 'Too many failed 2FA verification attempts. Please wait.' },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfterSeconds.toString(),
          },
        }
      );
    }

    const serviceClient = createServiceClient();
    const { data: profile } = await serviceClient
      .from('user_profiles')
      .select('id, name, role, totp_enabled')
      .eq('auth_user_id', authData.user.id)
      .maybeSingle();

    const userRole: Role = (profile?.role as Role) || 'admin';
    const userName = profile?.name || 'Authorized Staff';

    // Verify 2FA code via Supabase MFA challenge and verify
    let mfaSuccess = false;

    try {
      // Find active TOTP factor
      const { data: factorsData } = await supabase.auth.mfa.listFactors();
      const targetFactor = factorId
        ? factorsData?.totp?.find((f) => f.id === factorId)
        : factorsData?.totp?.find((f) => f.status === 'verified');

      if (targetFactor) {
        const challenge = await supabase.auth.mfa.challenge({ factorId: targetFactor.id });
        if (challenge.data?.id) {
          const verifyRes = await supabase.auth.mfa.verify({
            factorId: targetFactor.id,
            challengeId: challenge.data.id,
            code: cleanCode,
          });

          if (!verifyRes.error && verifyRes.data) {
            mfaSuccess = true;
          }
        }
      }
    } catch (mfaErr) {
      console.error('Supabase MFA verification error:', mfaErr);
    }

    if (!mfaSuccess) {
      await logAuditEvent({
        userEmail: sessionEmail,
        userRole,
        action: '2fa_failed',
        resource: 'auth',
        oldValues: null,
        newValues: { reason: 'Invalid or expired 6-digit MFA token' },
        ip: clientIp,
      });

      return NextResponse.json(
        { error: 'Invalid or expired 2FA code. Please verify the code on your authenticator app.' },
        { status: 401 }
      );
    }

    // Log success
    await logAuditEvent({
      userEmail: sessionEmail,
      userRole,
      action: '2fa_verified_login',
      resource: 'auth',
      oldValues: null,
      newValues: { message: '2FA TOTP passed successfully (AAL2 attained)' },
      ip: clientIp,
    });

    return NextResponse.json({
      success: true,
      user: {
        email: sessionEmail,
        name: userName,
        role: userRole,
        totp_verified: true,
      },
    });
  } catch (err: any) {
    console.error('2FA error:', err);
    return NextResponse.json(
      { error: 'An unexpected verification error occurred' },
      { status: 500 }
    );
  }
}
