import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireRole } from '@/lib/auth/server-auth';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(12, 'Use at least 12 characters for the new password').max(128),
  totpCode: z.string().regex(/^\d{6}$/, 'A 6-digit authenticator code is required'),
});

/** Owner password change; no plaintext password storage and no master-password bypass. */
export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const auth = await requireRole(request, ['owner']);
    if (auth.errorResponse) return auth.errorResponse;
    const owner = auth.user;
    const limit = await rateLimit(`owner_pwd_change:${clientIp}:${owner.auth_user_id}`, 5, 900);
    if (!limit.success) return NextResponse.json({ error: 'Too many attempts.' }, { status: 429 });

    const parsed = ChangePasswordSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0]?.message || 'Invalid input' }, { status: 400 });
    const { currentPassword, newPassword, totpCode } = parsed.data;
    if (currentPassword === newPassword) return NextResponse.json({ error: 'Choose a different password.' }, { status: 400 });

    const supabase = createClient();
    // Fail closed if there is no active and verified authenticator factor.
    const { data: aal, error: aalError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (aalError || aal?.currentLevel !== 'aal2') return NextResponse.json({ error: 'Verified MFA session required.' }, { status: 403 });
    const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
    const verifiedFactor = factors?.totp?.find(f => f.status === 'verified');
    if (factorsError || !verifiedFactor) return NextResponse.json({ error: 'Enroll a TOTP authenticator first.' }, { status: 403 });
    const { error: challengeError } = await supabase.auth.mfa.challengeAndVerify({ factorId: verifiedFactor.id, code: totpCode });
    if (challengeError) return NextResponse.json({ error: 'Invalid authenticator code.' }, { status: 401 });

    // Verify the existing password on the verified owner's own Supabase account.
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: owner.email, password: currentPassword });
    if (signInError) return NextResponse.json({ error: 'Current password verification failed.' }, { status: 401 });

    const service = createServiceClient();
    const { error: updateError } = await service.auth.admin.updateUserById(owner.auth_user_id, { password: newPassword });
    if (updateError) return NextResponse.json({ error: 'Password update failed.' }, { status: 500 });

    await supabase.auth.signOut(); // require a new verified MFA sign-in
    await logAuditEvent({
      userEmail: owner.email,
      userRole: 'owner',
      action: 'owner_password_changed',
      resource: 'account',
      resourceId: owner.auth_user_id,
      newValues: { message: 'Owner changed password with AAL2 and TOTP verification' },
      ip: clientIp,
    });
    return NextResponse.json({ success: true, message: 'Password changed. Sign in again with MFA.' });
  } catch (err) {
    console.error('Owner password change failed', err);
    return NextResponse.json({ error: 'Password change failed' }, { status: 500 });
  }
}
