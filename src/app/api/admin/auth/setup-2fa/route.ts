import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { logAuditEvent } from '@/lib/audit';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

/**
 * Setup 2FA:
 * POST: Requires authenticated staff session (owner/admin/operator). Generates real Supabase MFA TOTP enrollment.
 * PUT: Confirms enrollment with real TOTP code. Removes any bypass.
 */

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin', 'operator']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user } = authResult;
    const rl = await rateLimit(`setup_2fa:${clientIp}:${user.email}`, 5, 300);
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many requests. Please wait.' }, { status: 429 });
    }

    const supabase = createClient();
    // Enroll Supabase TOTP MFA factor
    const enrollRes = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: `Royal Umrah Cabs (${user.email})`,
    });

    if (enrollRes.error || !enrollRes.data) {
      return NextResponse.json(
        { error: enrollRes.error?.message || 'Failed to initiate 2FA enrollment' },
        { status: 500 }
      );
    }

    const { id: factorId, totp } = enrollRes.data;

    return NextResponse.json({
      factorId,
      secret: totp.secret,
      qrPayload: totp.uri,
      uri: totp.uri,
      instructions: 'Scan the QR code or enter the secret key into Google Authenticator, then enter the 6-digit confirmation code.',
    });
  } catch (err: any) {
    console.error('setup-2fa POST error:', err);
    return NextResponse.json({ error: 'Failed to initiate 2FA setup' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin', 'operator']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user } = authResult;
    const { factorId, code } = await request.json();
    const cleanCode = (code || '').trim();

    if (!factorId || !cleanCode) {
      return NextResponse.json({ error: 'Missing factorId or verification code' }, { status: 400 });
    }

    const supabase = createClient();
    // Verify challenge in Supabase MFA (No 123456 bypass)
    const challengeRes = await supabase.auth.mfa.challenge({ factorId });
    if (challengeRes.error || !challengeRes.data?.id) {
      return NextResponse.json(
        { error: challengeRes.error?.message || 'Failed to generate MFA challenge' },
        { status: 400 }
      );
    }

    const verifyRes = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challengeRes.data.id,
      code: cleanCode,
    });

    if (verifyRes.error || !verifyRes.data) {
      return NextResponse.json(
        { error: 'Confirmation code does not match. Please verify your clock and try again.' },
        { status: 400 }
      );
    }

    // Update user profile in database via service-role client
    const serviceClient = createServiceClient();
    await serviceClient
      .from('user_profiles')
      .update({
        totp_enabled: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    await logAuditEvent({
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
      message: '2FA has been successfully configured and activated on your account.',
    });
  } catch (err: any) {
    console.error('setup-2fa PUT error:', err);
    return NextResponse.json({ error: 'Failed to activate 2FA' }, { status: 500 });
  }
}
