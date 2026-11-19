import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { logAuditEvent } from '@/lib/audit';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin', 'operator'], { allowEnrollmentFlow: true });
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user } = authResult;
    const rl = await rateLimit(`setup_2fa:${clientIp}:${user.email}`, 10, 300);
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many requests. Please wait a moment.' }, { status: 429 });
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'Duyuf Al Rahman VIP',
    });
    if (error || !data?.id || !data?.totp?.secret) {
      console.error('Authenticator enrollment unavailable:', error?.message);
      return NextResponse.json({ error: 'Unable to register authenticator. Please retry.' }, { status: 503 });
    }

    // Supabase returns the QR as SVG; encode locally without third-party QR APIs.
    const qrImageUrl = data.totp.qr_code
      ? 'data:image/svg+xml;base64,' + Buffer.from(data.totp.qr_code, 'utf8').toString('base64')
      : null;

    return NextResponse.json({
      success: true,
      factorId: data.id,
      secret: data.totp.secret,
      qrImageUrl,
      instructions: 'Scan with an authenticator app or enter the setup key manually.',
    }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch (err: any) {
    console.error('setup-2fa POST error:', err);
    return NextResponse.json({ error: 'Failed to initiate 2FA setup' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin', 'operator'], { allowEnrollmentFlow: true });
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user } = authResult;
    const body = await request.json().catch(() => null);
    const factorId = body?.factorId;
    const code = body?.code;
    if (typeof factorId !== 'string' || factorId.length < 10 || factorId.length > 128 ||
        typeof code !== 'string' || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: 'Valid authenticator factor and six-digit code required' }, { status: 400 });
    }

    const supabase = createClient();
    const challengeRes = await supabase.auth.mfa.challenge({ factorId });
    if (challengeRes.error || !challengeRes.data?.id) {
      return NextResponse.json({ error: 'Authenticator challenge was not accepted' }, { status: 401 });
    }
    const verifyRes = await supabase.auth.mfa.verify({
      factorId, challengeId: challengeRes.data.id, code,
    });
    if (verifyRes.error || !verifyRes.data) {
      return NextResponse.json({ error: 'Invalid or expired authenticator code' }, { status: 401 });
    }
    const { data: assurance, error: assuranceError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (assuranceError || assurance?.currentLevel !== 'aal2') {
      return NextResponse.json({ error: 'Unable to confirm second-factor authentication' }, { status: 403 });
    }

    // Update profile in database if possible
    try {
      const serviceClient = createServiceClient();
      await serviceClient
        .from('user_profiles')
        .update({
          totp_enabled: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .eq('auth_user_id', user.auth_user_id);
    } catch (dbErr) {
      console.warn('Notice updating profile TOTP status:', dbErr);
    }

    if (process.env.VERCEL_ENV !== 'preview') await logAuditEvent({
      userEmail: user.email,
      userRole: user.role,
      action: '2fa_enabled_confirmed',
      resource: 'auth',
      oldValues: { totp_enabled: false },
      newValues: { totp_enabled: true },
      ip: clientIp,
    });

    return NextResponse.json({
      success: true,
      message: 'Two-Factor Authentication (AAL2) has been successfully activated on your account.',
    });
  } catch (err: any) {
    console.error('setup-2fa PUT error:', err);
    return NextResponse.json({ error: 'Failed to activate 2FA' }, { status: 500 });
  }
}
