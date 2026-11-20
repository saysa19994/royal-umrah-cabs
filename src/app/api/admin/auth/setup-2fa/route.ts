import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { logAuditEvent } from '@/lib/audit';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
const noStore = { 'Cache-Control': 'private, no-store' };

/**
 * Supabase Auth is the ONLY MFA authority. Do not create local-only
 * TOTP secrets, accept client-supplied secrets, or send otpauth URIs to
 * third-party QR services; those approaches cannot establish AAL2.
 */
export async function POST(request: Request) {
  const authResult = await requireRole(request, ['owner', 'admin', 'operator'], { allowEnrollmentFlow: true });
  if (authResult.errorResponse) return authResult.errorResponse;

  const ip = getClientIp(request);
  const limited = await rateLimit('mfa_enroll:' + ip + ':' + authResult.user.auth_user_id, 5, 300, { failClosed: true });
  if (!limited.success) return NextResponse.json({ error: 'Too many enrollment attempts' }, { status: 429, headers: noStore });

  try {
    const supabase = createClient();
    const factors = await supabase.auth.mfa.listFactors();
    if (factors.error) return NextResponse.json({ error: 'Unable to verify current MFA enrollment' }, { status: 503, headers: noStore });
    if (factors.data?.all?.some(f => f.factor_type === 'totp' && f.status === 'verified')) {
      return NextResponse.json({ error: 'A verified authenticator is already enrolled' }, { status: 409, headers: noStore });
    }

    // A TOTP setup key can be exposed or entered incorrectly. Always revoke
    // unfinished TOTP factors in the signed-in account before generating a new
    // one. Never attempt to unenroll verified factors at AAL1.
    for (const factor of factors.data?.all || []) {
      if (factor.factor_type !== 'totp' || factor.status !== 'unverified') continue;
      const { error: removeError } = await supabase.auth.mfa.unenroll({ factorId: factor.id });
      if (removeError) {
        console.error('Unable to revoke unfinished MFA enrollment:', removeError.message);
        return NextResponse.json({
          error: 'Unable to revoke the previous unfinished authenticator. Contact the administrator.',
        }, { status: 503, headers: noStore });
      }
    }

    const enrolled = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'Duyuf Alrahman VIP',
    });
    if (enrolled.error || !enrolled.data?.totp?.secret || !enrolled.data.totp.uri) {
      console.error('Supabase MFA enroll error:', enrolled.error?.message);
      return NextResponse.json({ error: 'Secure authenticator enrollment unavailable' }, { status: 503, headers: noStore });
    }

    // Supabase returns the QR itself as SVG. Render it locally through an
    // image data URI; never transmit the TOTP URI to an external QR service.
    const qrCode = enrolled.data.totp.qr_code;
    const qrImageUrl = typeof qrCode === 'string' && qrCode.startsWith('<svg')
      ? 'data:image/svg+xml;base64,' + Buffer.from(qrCode, 'utf8').toString('base64')
      : (typeof qrCode === 'string' && qrCode.startsWith('data:image/svg+xml;')
        ? qrCode : null);
    return NextResponse.json({
      success: true,
      factorId: enrolled.data.id,
      secret: enrolled.data.totp.secret,
      qrImageUrl,
      instructions: 'Scan the new QR in an authenticator app, use its current time-based six-digit code, and never share your QR or setup key.',
    }, { headers: noStore });
  } catch (err) {
    console.error('Supabase MFA enroll failed:', err);
    return NextResponse.json({ error: 'Secure enrollment failed' }, { status: 503, headers: noStore });
  }
}

export async function PUT(request: Request) {
  const authResult = await requireRole(request, ['owner', 'admin', 'operator'], { allowEnrollmentFlow: true });
  if (authResult.errorResponse) return authResult.errorResponse;

  const clientIp = getClientIp(request);
  const limited = await rateLimit('mfa_verify_enroll:' + clientIp + ':' + authResult.user.auth_user_id, 5, 300, { failClosed: true });
  if (!limited.success) return NextResponse.json({ error: 'Too many verification attempts' }, { status: 429, headers: noStore });

  const body = await request.json().catch(() => null);
  const factorId = body?.factorId;
  const code = body?.code;
  if (typeof factorId !== 'string' || !/^[0-9a-f-]{36}$/i.test(factorId) ||
      typeof code !== 'string' || !/^\d{6}$/.test(code)) {
    return NextResponse.json({ error: 'Valid factor and six-digit code required' }, { status: 400, headers: noStore });
  }
  try {
    const supabase = createClient();
    const challenge = await supabase.auth.mfa.challenge({ factorId });
    if (challenge.error || !challenge.data?.id) {
      return NextResponse.json({ error: 'Unable to create MFA verification challenge' }, { status: 400, headers: noStore });
    }
    const verification = await supabase.auth.mfa.verify({ factorId, challengeId: challenge.data.id, code });
    if (verification.error || !verification.data) {
      // Do not log the code or the TOTP seed; expose a useful but generic error.
      return NextResponse.json({
        error: 'Code was rejected. Use the newest authenticator entry, check automatic phone date/time and enter a fresh six-digit code.',
      }, { status: 400, headers: noStore });
    }
    const assurance = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (assurance.error || assurance.data?.currentLevel !== 'aal2') {
      return NextResponse.json({ error: 'MFA verification did not establish AAL2' }, { status: 503, headers: noStore });
    }

    // Update the UI hint only after Supabase itself has verified AAL2.
    const saved = await createServiceClient().from('user_profiles')
      .update({ totp_enabled: true, updated_at: new Date().toISOString() })
      .eq('auth_user_id', authResult.user.auth_user_id).select('id').maybeSingle();
    if (saved.error || !saved.data) {
      console.error('MFA profile synchronization error:', saved.error?.message);
      return NextResponse.json({ error: 'MFA verified but profile synchronization failed; contact support' },
        { status: 503, headers: noStore });
    }
    try {
      await logAuditEvent({
        userEmail: authResult.user.email, userRole: authResult.user.role,
        action: '2fa_enabled_confirmed', resource: 'auth', resourceId: authResult.user.auth_user_id,
        oldValues: null, newValues: { totp_enabled: true, assurance: 'aal2' }, ip: clientIp,
      });
    } catch (auditError) {
      console.error('MFA audit write failed after verified enrollment:', auditError);
    }

    return NextResponse.json({ success: true, message: 'Authenticator verified by Supabase (AAL2).' }, { headers: noStore });
  } catch (error) {
    console.error('Supabase MFA verification failed:', error);
    return NextResponse.json({ error: 'Unable to verify authenticator' }, { status: 503, headers: noStore });
  }
}
