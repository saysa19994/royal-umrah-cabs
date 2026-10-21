import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { Role } from '@/types/auth';
import { OWNER_EMAIL, verifyOwnerSessionToken } from '@/lib/auth/owner-session';

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
    // 0. Direct Owner Master Session check
    const cookieStore = await cookies();
    const ownerSessionToken = cookieStore.get('vip_owner_session')?.value;
    if (verifyOwnerSessionToken(ownerSessionToken)) {
      if (allowedRoles.includes('owner')) {
        const ownerUser: AuthenticatedStaff = {
          id: 'owner-master-id',
          auth_user_id: 'owner-master-id',
          email: OWNER_EMAIL,
          name: 'Sayed (Owner)',
          role: 'owner',
          is_suspended: false,
          totp_enabled: false,
          aal: 'aal2',
        };
        return { user: ownerUser };
      }
    }

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
            { error: 'Access denied: Email address must be confirmed before profile linking.' },
            { status: 403 }
          ),
        };
      }

      const { data: unlinkedProfile } = await serviceClient
        .from('user_profiles')
        .select('id, auth_user_id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled')
        .eq('email', (authUser.email || '').toLowerCase())
        .is('auth_user_id', null)
        .maybeSingle();

      if (unlinkedProfile) {
        await serviceClient
          .from('user_profiles')
          .update({
            auth_user_id: authUser.id,
            updated_at: new Date().toISOString(),
          })
          .eq('id', unlinkedProfile.id);

        profile = { ...unlinkedProfile, auth_user_id: authUser.id };
      }
    }

    if (profileError || !profile) {
      return {
        errorResponse: NextResponse.json(
          { error: 'Access denied: Administrative profile not found' },
          { status: 403 }
        ),
      };
    }

    if (profile.is_suspended) {
      return {
        errorResponse: NextResponse.json(
          { error: 'Access denied: Account has been suspended by executive owner' },
          { status: 403 }
        ),
      };
    }

    // Role check
    if (!allowedRoles.includes(profile.role)) {
      return {
        errorResponse: NextResponse.json(
          { error: `Forbidden: Required role [${allowedRoles.join(' or ')}]. Your role: [${profile.role}]` },
          { status: 403 }
        ),
      };
    }

    // Enforce AAL2 MFA for owner and admin, or any account with totp_enabled
    const isOwnerOrAdmin = profile.role === 'owner' || profile.role === 'admin';
    const requiresMfa = isOwnerOrAdmin || profile.totp_enabled;

    let currentAal: 'aal1' | 'aal2' = 'aal1';

    if (requiresMfa) {
      const { data: aalData, error: aalError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      if (aalError) {
        console.error('Error fetching assurance level:', aalError);
        return {
          errorResponse: NextResponse.json(
            { error: 'Security verification failed: Unable to verify MFA state' },
            { status: 500 }
          ),
        };
      }

      currentAal = aalData.currentLevel === 'aal2' ? 'aal2' : 'aal1';

      if (isOwnerOrAdmin && aalData.nextLevel !== 'aal2' && !profile.totp_enabled) {
        if (!options.allowEnrollmentFlow) {
          return {
            errorResponse: NextResponse.json(
              {
                error: 'Mandatory MFA enrollment required. Please set up your two-factor authenticator app.',
                code: 'MFA_ENROLLMENT_REQUIRED',
                require2faEnrollment: true,
              },
              { status: 403 }
            ),
          };
        }
      } else if (currentAal !== 'aal2') {
        return {
          errorResponse: NextResponse.json(
            {
              error: 'Multi-Factor Authentication (AAL2) required for this administrative operation. Please verify TOTP.',
              code: 'MFA_VERIFICATION_REQUIRED',
              require2fa: true,
            },
            { status: 403 }
          ),
        };
      }
    }

    return {
      user: {
        id: profile.id,
        auth_user_id: profile.auth_user_id,
        email: profile.email,
        name: profile.name,
        role: profile.role,
        assigned_whatsapp_number: profile.assigned_whatsapp_number,
        is_suspended: profile.is_suspended,
        totp_enabled: profile.totp_enabled,
        aal: currentAal,
      },
    };
  } catch (err: any) {
    console.error('Auth verification error:', err);
    return {
      errorResponse: NextResponse.json(
        { error: 'Internal security authentication error' },
        { status: 500 }
      ),
    };
  }
}
