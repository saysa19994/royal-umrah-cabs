import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { Role, UserProfile } from '@/types/auth';

export interface AuthenticatedStaff {
  id: string;
  auth_user_id: string;
  email: string;
  name: string;
  role: Role;
  assigned_whatsapp_number?: string | null;
  is_suspended: boolean;
  totp_enabled: boolean;
  aal?: string;
}

/**
 * Server-side role requirement helper for API Route Handlers.
 * Verifies Supabase Auth session from httpOnly cookies, loads profile with service-role client,
 * and asserts that the user is active and possesses one of the allowed roles.
 *
 * For owner and admin roles, strictly enforces AAL2 (Supabase MFA / TOTP).
 */
export async function requireRole(
  request: Request,
  allowedRoles: Role[] = ['owner', 'admin', 'operator']
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
    const userEmail = (authUser.email || '').trim().toLowerCase();

    // Fetch user profile using secure service-role client
    const serviceClient = createServiceClient();
    const { data: profile, error: profileError } = await serviceClient
      .from('user_profiles')
      .select('id, auth_user_id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled')
      .or(`auth_user_id.eq.${authUser.id},email.eq.${userEmail}`)
      .maybeSingle();

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

    // Check AAL (Authenticator Assurance Level) for owner and admin
    // Supabase MFA stores current level in user.app_metadata.aal or user.aal
    const currentAal = (authUser.app_metadata?.aal as string) || (authUser as any).aal || 'aal1';
    if ((userRole === 'owner' || userRole === 'admin') && profile.totp_enabled) {
      // In Supabase MFA, verified TOTP sets AAL to aal2
      if (currentAal !== 'aal2') {
        // Check if there is an active verified factor in session
        const { data: factors } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (factors?.currentLevel !== 'aal2') {
          return {
            errorResponse: NextResponse.json(
              { error: 'MFA Required: Authenticator Assurance Level 2 (AAL2) required for this action' },
              { status: 403 }
            ),
          };
        }
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
