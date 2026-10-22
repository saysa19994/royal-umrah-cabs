import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { logAuditEvent } from '@/lib/audit';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { generateTotpSecret, generateTotpUri, verifyTotp } from '@/lib/auth/totp';

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

    let factorId = 'totp-factor-owner';
    let secret = '';
    let uri = '';

    // Attempt Supabase MFA enrollment if active session exists
    try {
      const supabase = createClient();
      const enrollRes = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: `Duyuf Alrahman VIP (${user.email})`,
      });
      if (enrollRes.data?.totp) {
        factorId = enrollRes.data.id;
        secret = enrollRes.data.totp.secret;
        uri = enrollRes.data.totp.uri;
      }
    } catch (e) {
      console.warn('Notice from Supabase MFA enroll:', e);
    }

    // High-entropy standard RFC 6238 fallback
    if (!secret) {
      secret = generateTotpSecret(20);
      uri = generateTotpUri(user.email, secret, 'Duyuf Alrahman VIP');
    }

    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(uri)}`;

    return NextResponse.json({
      success: true,
      factorId,
      secret,
      qrPayload: uri,
      uri,
      qrImageUrl,
      instructions: 'Scan the QR code with Google Authenticator or enter the secret key manually, then enter the 6-digit confirmation code.',
    });
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
    const { factorId, code, secret } = await request.json();
    const cleanCode = (code || '').trim();

    if (!cleanCode || cleanCode.length !== 6) {
      return NextResponse.json({ error: 'Please enter a valid 6-digit verification code' }, { status: 400 });
    }

    let verified = false;

    // 1. Verify via RFC 6238 TOTP if secret was provided
    if (secret && verifyTotp(cleanCode, secret)) {
      verified = true;
    }

    // 2. Also try Supabase MFA verify if valid factorId
    if (!verified && factorId && factorId !== 'totp-factor-owner') {
      try {
        const supabase = createClient();
        const challengeRes = await supabase.auth.mfa.challenge({ factorId });
        if (challengeRes.data?.id) {
          const verifyRes = await supabase.auth.mfa.verify({
            factorId,
            challengeId: challengeRes.data.id,
            code: cleanCode,
          });
          if (verifyRes.data) {
            verified = true;
          }
        }
      } catch (mfaErr) {
        console.warn('Notice from Supabase MFA verify:', mfaErr);
      }
    }

    if (!verified) {
      return NextResponse.json(
        { error: 'Confirmation code does not match. Please verify the time on your phone and try again.' },
        { status: 400 }
      );
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
        .eq('email', user.email);
    } catch (dbErr) {
      console.warn('Notice updating profile TOTP status:', dbErr);
    }

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
      message: 'Two-Factor Authentication (AAL2) has been successfully activated on your account.',
    });
  } catch (err: any) {
    console.error('setup-2fa PUT error:', err);
    return NextResponse.json({ error: 'Failed to activate 2FA' }, { status: 500 });
  }
}
