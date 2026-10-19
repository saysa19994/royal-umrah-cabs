import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { Role } from '@/types/auth';

export interface AuthenticatedStaff {
  id: string;
  auth_user_id: string;
  email: string;
  name: string;
  role: Role;
  assigned_whatsapp_number?: string | null;
  is_suspended: boolean;
  totp_enabled: boolean;
  aal: 'aal1' | 'aal2';
}

/**
 * Server-side role requirement helper for API Route Handlers.
 * Verifies Supabase Auth session from httpOnly cookies, loads profile with service-role client strictly via auth_user_id.
 *
 * Security Hardening Round 2:
 * 1. For 'owner' and 'admin', ALWAYS requires AAL2 (Supabase MFA / TOTP), regardless of profile.totp_enabled.
 * 2. Checks authenticator assurance level strictly via supabase.auth.mfa.getAuthenticatorAssuranceLevel()
 *    (removes reliance on client-controllable app_metadata.aal).
 * 3. Enforces forced TOTP enrollment: if owner/admin has not enrolled TOTP yet, returns 403 with code 'MFA_ENROLLMENT_REQUIRED',
 *    allowing only the setup-2fa enrollment endpoint.
 */
export async function requireRole(
  request: Request,
  allowedRoles: Role[] = ['owner', 'admin', 'operator'],
  options: { allowEnrollmentFlow?: boolean } = {}
): Promise<{ user: AuthenticatedStaff; errorResponse?: never } | { user?: never; errorResponse: NextResponse }> {
  try {
    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError || !authData?.user) {
      return {
        errorResponse: NextResponse.json(
          { error: 'Unauthorized: Valid server session required' },
          { status: 401 }
        ),
      };
    }

    const authUser = authData.user;

    // Fetch user profile using secure service-role client STRICTLY by auth_user_id
    const serviceClient = createServiceClient();
    let { data: profile, error: profileError } = await serviceClient
      .from('user_profiles')
      .select('id, auth_user_id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled')
      .eq('auth_user_id', authUser.id)
      .maybeSingle();

    // Auto-link auth_user_id on first authenticated session if initially invited by email
    // ONLY permitted if authUser.email_confirmed_at is present to prevent account pre-takeover
    if (!profile) {
      if (!authUser.email_confirmed_at) {
        return {
          errorResponse: NextResponse.json(
            { error: 'Forbidden: Email address must be confirmed before profile linking' },
            { status: 403 }
          ),
        };
      }

      const userEmail = (authUser.email || '').trim().toLowerCase();
      const { data: unlinked } = await serviceClient
        .from('user_profiles')
        .select('id, auth_user_id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled')
        .eq('email', userEmail)
        .is('auth_user_id', null)
        .maybeSingle();

      if (unlinked) {
        await serviceClient
          .from('user_profiles')
          .update({ auth_user_id: authUser.id, updated_at: new Date().toISOString() })
          .eq('id', unlinked.id);
        profile = { ...unlinked, auth_user_id: authUser.id };
      }
    }

    if (profileError || !profile) {
      return {
        errorResponse: NextResponse.json(
          { error: 'Forbidden: No authorized staff profile associated with this account' },
          { status: 403 }
        ),
      };
    }

    if (profile.is_suspended) {
      return {
        errorResponse: NextResponse.json(
          { error: 'Forbidden: Account has been suspended' },
          { status: 403 }
        ),
      };
    }

    const userRole = profile.role as Role;
    if (!allowedRoles.includes(userRole)) {
      return {
        errorResponse: NextResponse.json(
          { error: `Forbidden: Insufficient privileges for role '${userRole}'` },
          { status: 403 }
        ),
      };
    }

    // Check Authenticator Assurance Level (AAL) directly from Supabase MFA API (NO app_metadata fallback)
    const { data: aalData, error: aalError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    const currentAal: 'aal1' | 'aal2' = (aalData?.currentLevel === 'aal2') ? 'aal2' : 'aal1';
    const nextAal = aalData?.nextLevel || 'aal1';

    // For owner, admin, or any account with totp_enabled: require AAL2 MFA
    const requiresMfa = userRole === 'owner' || userRole === 'admin' || profile.totp_enabled === true;
    if (requiresMfa) {
      // If owner/admin has not enrolled TOTP factors yet
      if ((userRole === 'owner' || userRole === 'admin') && nextAal !== 'aal2' && !profile.totp_enabled) {
        if (!options.allowEnrollmentFlow) {
          return {
            errorResponse: NextResponse.json(
              {
                error: 'MFA Enrollment Required: Owner and Admin accounts must complete 2FA setup before accessing portal resources.',
                code: 'MFA_ENROLLMENT_REQUIRED',
                require2faEnrollment: true,
              },
              { status: 403 }
            ),
          };
        }
      } else if (currentAal !== 'aal2') {
        // Enrolled but not yet challenged/verified in this session
        return {
          errorResponse: NextResponse.json(
            {
              error: 'MFA Verification Required: Access requires Authenticator Assurance Level 2 (AAL2).',
              code: 'MFA_VERIFICATION_REQUIRED',
              require2fa: true,
            },
            { status: 403 }
          ),
        };
      }
    }

    const staff: AuthenticatedStaff = {
      id: profile.id,
      auth_user_id: authUser.id,
      email: profile.email,
      name: profile.name,
      role: userRole,
      assigned_whatsapp_number: profile.assigned_whatsapp_number,
      is_suspended: profile.is_suspended,
      totp_enabled: profile.totp_enabled,
      aal: currentAal,
    };

    return { user: staff };
  } catch (err: any) {
    console.error('requireRole server error:', err);
    return {
      errorResponse: NextResponse.json(
        { error: 'Internal server error validating credentials' },
        { status: 500 }
      ),
    };
  }
}
