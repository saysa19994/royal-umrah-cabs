import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { UserProfile, Role } from '@/types/auth';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const body = await request.json();
    const { email, password } = body;
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanEmail || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Rate limiting: generous 50 attempts to avoid locking legitimate admin during credential setup
    const ipRate = await rateLimit(`login_ip:${clientIp}`, 50, 60);
    const accountRate = await rateLimit(`login_acc:${clientIp}:${cleanEmail}`, 50, 300);

    if (!ipRate.success || !accountRate.success) {
      const resetTime = Math.max(ipRate.reset, accountRate.reset);
      const retryAfterSeconds = Math.max(1, Math.ceil((resetTime - Date.now()) / 1000));
      return NextResponse.json(
        { error: 'Too many login attempts. Please wait a moment before trying again.' },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfterSeconds.toString(),
          },
        }
      );
    }

    // 1. Supabase Auth via cookie-based server client
    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (authError || !authData?.user) {
      console.error('Supabase auth signIn error:', authError?.message);
      await logAuditEvent({
        userEmail: cleanEmail,
        userRole: 'operator',
        action: 'login_failed',
        resource: 'auth',
        oldValues: null,
        newValues: { reason: authError?.message || 'Invalid email or password' },
        ip: clientIp,
      });

      return NextResponse.json(
        { error: authError?.message || 'Invalid credentials or user does not exist.' },
        { status: 401 }
      );
    }

    // 2. Fetch extended staff profile strictly by auth_user_id (service-role client)
    const serviceClient = createServiceClient();
    let { data: profileData, error: profileError } = await serviceClient
      .from('user_profiles')
      .select('id, auth_user_id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled, created_at')
      .eq('auth_user_id', authData.user.id)
      .maybeSingle();

    if (!profileData) {
      // Check if unlinked profile exists by email
      const { data: unlinked } = await serviceClient
        .from('user_profiles')
        .select('id, auth_user_id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled, created_at')
        .eq('email', cleanEmail)
        .is('auth_user_id', null)
        .maybeSingle();

      if (unlinked) {
        await serviceClient
          .from('user_profiles')
          .update({
            auth_user_id: authData.user.id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', unlinked.id);
        profileData = { ...unlinked, auth_user_id: authData.user.id };
      } else {
        // Auto-create owner profile on first authenticated login
        const { data: newProfile } = await serviceClient
          .from('user_profiles')
          .insert({
            auth_user_id: authData.user.id,
            email: cleanEmail,
            name: 'Sayed (Owner)',
            role: 'owner',
            is_suspended: false,
            totp_enabled: false,
          })
          .select()
          .maybeSingle();

        if (newProfile) {
          profileData = newProfile;
        }
      }
    }

    if (!profileData) {
      await supabase.auth.signOut();
      return NextResponse.json(
        { error: 'Access denied: Unable to initialize administrative profile for this account.' },
        { status: 403 }
      );
    }

    const userProfile = profileData as UserProfile;

    // 3. Check account suspension
    if (userProfile.is_suspended) {
      await supabase.auth.signOut();
      await logAuditEvent({
        userEmail: cleanEmail,
        userRole: userProfile.role,
        action: 'login_blocked_suspended',
        resource: 'auth',
        oldValues: null,
        newValues: { status: 'suspended' },
        ip: clientIp,
      });
      return NextResponse.json(
        { error: 'This account has been suspended. Please contact the executive owner.' },
        { status: 403 }
      );
    }

    // 4. Update last_login
    await serviceClient
      .from('user_profiles')
      .update({
        last_login_at: new Date().toISOString(),
        last_login_ip: clientIp,
        auth_user_id: authData.user.id,
      })
      .eq('id', userProfile.id);

    // 5. Enforce 2FA MFA TOTP for Owner and Admin, or any account with totp_enabled
    const isOwnerOrAdmin = userProfile.role === 'owner' || userProfile.role === 'admin';
    if (isOwnerOrAdmin || userProfile.totp_enabled) {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const totpFactor = factors?.totp?.find((f) => f.status === 'verified');
      const isEnrolled = Boolean(totpFactor);

      return NextResponse.json({
        require2fa: true,
        isEnrolled,
        factorId: totpFactor?.id || null,
        email: userProfile.email,
        role: userProfile.role,
        message: isEnrolled
          ? 'Two-Factor Authentication required. Enter the 6-digit code from your authenticator app.'
          : 'Mandatory Two-Factor Authentication enrollment required on first login.',
      });
    }

    // Scoped operator login complete
    await logAuditEvent({
      userEmail: cleanEmail,
      userRole: userProfile.role,
      action: 'login_success',
      resource: 'auth',
      oldValues: null,
      newValues: { role: userProfile.role, scope: userProfile.assigned_whatsapp_number },
      ip: clientIp,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: userProfile.id,
        email: userProfile.email,
        name: userProfile.name,
        role: userProfile.role,
        assigned_whatsapp_number: userProfile.assigned_whatsapp_number,
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'An unexpected authentication error occurred' },
      { status: 500 }
    );
  }
}
