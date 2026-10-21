import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { createClient } from '@/lib/supabase/server';
import { logAuditEvent } from '@/lib/audit';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  totpCode: z.string().trim().regex(/^\d{6}$/, 'TOTP code must be 6 digits'),
});

/**
 * POST /api/admin/account/password
 * Owner-only password change protected with Current Password + AAL2 TOTP.
 */
export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;

    // Rate limit: 5 attempts per 15 minutes
    const rl = await rateLimit(`owner_pwd_change:${clientIp}:${currentUser.id}`, 5, 900);
    if (!rl.success) {
      return NextResponse.json({ error: 'Too many password change attempts. Please wait 15 minutes.' }, { status: 429 });
    }

    const body = await request.json();
    const parseResult = ChangePasswordSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors[0]?.message || 'Invalid input data' },
        { status: 400 }
      );
    }

    const { currentPassword, newPassword, totpCode } = parseResult.data;
    const supabase = createClient();
    const serviceClient = createServiceClient();

    // 1. Verify AAL2: Verify TOTP Factor
    let mfaVerified = false;
    try {
      const { data: factorsData, error: factorsErr } = await supabase.auth.mfa.listFactors();
      const verifiedFactor = factorsData?.totp?.find((f) => f.status === 'verified');

      if (verifiedFactor) {
        const challengeRes = await supabase.auth.mfa.challengeAndVerify({
          factorId: verifiedFactor.id,
          code: totpCode,
        });
        if (challengeRes.data && !challengeRes.error) {
          mfaVerified = true;
        }
      } else {
        // Fallback test verification in development if no factor is yet enrolled
        if (process.env.NODE_ENV !== 'production' && (totpCode === '123456' || totpCode === '000000')) {
          mfaVerified = true;
        }
      }
    } catch (mfaErr) {
      console.warn('MFA challenge error:', mfaErr);
    }

    if (!mfaVerified) {
      return NextResponse.json(
        { error: 'Invalid two-factor authentication (AAL2) code. Please check your authenticator app.' },
        { status: 401 }
      );
    }

    // 2. Re-authenticate Current Password to verify knowledge
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: currentUser.email,
      password: currentPassword,
    });

    if (signInError) {
      return NextResponse.json(
        { error: 'Current password verification failed. Please verify your current password.' },
        { status: 401 }
      );
    }

    // 3. Update Password via Admin Service Client
    const { error: updateError } = await serviceClient.auth.admin.updateUserById(
      currentUser.id,
      { password: newPassword }
    );

    if (updateError) {
      console.error('Failed to update owner password:', updateError);
      return NextResponse.json(
        { error: 'Failed to update password: ' + updateError.message },
        { status: 500 }
      );
    }

    // 4. Log Audit Event
    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: 'owner',
      action: 'owner_password_changed',
      resource: 'account',
      resourceId: currentUser.id,
      newValues: { message: 'Owner password changed successfully with AAL2 verification' },
      ip: clientIp,
    });

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully. Your new credentials are now active.',
    });
  } catch (err: any) {
    console.error('Change password error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
