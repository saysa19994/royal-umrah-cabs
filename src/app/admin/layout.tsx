import React from 'react';
import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { manrope } from '@/app/fonts';
import { OWNER_EMAIL, verifyOwnerSessionToken } from '@/lib/auth/owner-session';
import { UserProfile } from '@/types/auth';

export const metadata = {
  title: 'Admin Operations Portal | Duyuf Alrahman VIP',
  robots: {
    index: false,
    follow: false,
  },
};

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={manrope.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-[#0D0F12] text-[#FAF9F6] antialiased">
        {children}
      </body>
    </html>
  );
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const currentPath = headerList.get('x-pathname') || '';
  const isLoginPage = currentPath === '/admin/login' || currentPath.startsWith('/admin/login');

  // Check Direct Owner Master Session
  const cookieStore = await cookies();
  const ownerSessionToken = cookieStore.get('vip_owner_session')?.value;
  const isDirectOwner = verifyOwnerSessionToken(ownerSessionToken);

  if (isDirectOwner) {
    if (isLoginPage) {
      redirect('/admin');
    }

    const ownerProfile: UserProfile = {
      id: 'owner-master-id',
      email: OWNER_EMAIL,
      name: 'Sayed (Owner)',
      role: 'owner',
      is_suspended: false,
      totp_enabled: false,
      created_at: new Date().toISOString(),
    };

    return (
      <AdminShell>
        <div className="min-h-screen bg-[#0D0F12] text-[#F3EEE6] flex flex-col font-sans">
          <AdminNavbar initialUser={ownerProfile} />
          <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
          <footer className="border-t border-[#262B33] py-4 px-6 text-center text-xs text-[#6C7584]">
            <span>Duyuf Alrahman VIP Operations Portal • Protected Root Access</span>
          </footer>
        </div>
      </AdminShell>
    );
  }

  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  // 1. Redirect unauthenticated users (except /admin/login) to /admin/login on the server
  if (!authData?.user) {
    if (!isLoginPage) {
      redirect('/admin/login');
    }
    return <AdminShell>{children}</AdminShell>;
  }

  // 2. Fetch staff profile strictly by auth_user_id (NO .or() queries)
  const serviceClient = createServiceClient();
  let { data: profile } = await serviceClient
    .from('user_profiles')
    .select('id, auth_user_id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled, created_at')
    .eq('auth_user_id', authData.user.id)
    .maybeSingle();

  if (!profile) {
    // Auto-link auth_user_id on first login if unlinked ONLY when email is confirmed
    if (!authData.user.email_confirmed_at) {
      if (!isLoginPage) {
        redirect('/admin/login?error=unconfirmed_email');
      }
      return <AdminShell>{children}</AdminShell>;
    }

    const { data: unlinked } = await serviceClient
      .from('user_profiles')
      .select('id, auth_user_id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled, created_at')
      .eq('email', (authData.user.email || '').toLowerCase())
      .is('auth_user_id', null)
      .maybeSingle();

    if (unlinked) {
      await serviceClient
        .from('user_profiles')
        .update({ auth_user_id: authData.user.id, updated_at: new Date().toISOString() })
        .eq('id', unlinked.id);
      profile = { ...unlinked, auth_user_id: authData.user.id };
    }
  }

  if (!profile || profile.is_suspended) {
    if (!isLoginPage) {
      redirect('/admin/login?error=unauthorized');
    }
    return <AdminShell>{children}</AdminShell>;
  }

  // 3. For owner, admin, or ANY staff account with totp_enabled: ALWAYS require AAL2 MFA before granting access to portal pages
  const requiresMfa = profile.role === 'owner' || profile.role === 'admin' || profile.totp_enabled === true;
  if (requiresMfa) {
    const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (aalData?.currentLevel !== 'aal2') {
      if (!isLoginPage) {
        redirect('/admin/login?mfa=required');
      }
      return <AdminShell>{children}</AdminShell>;
    }
  }

  // 4. Authenticated users with completed MFA visiting login page get redirected to portal
  if (isLoginPage) {
    redirect('/admin');
  }

  // 5. Block non-owners from /admin/account root management page
  if (profile.role !== 'owner') {
    if (currentPath === '/admin/account' || currentPath.startsWith('/admin/account/')) {
      redirect('/admin');
    }
  }

  // 6. Block operator and other non-admin roles from restricted management pages
  if (profile.role !== 'owner' && profile.role !== 'admin') {
    const restrictedPaths = [
      '/admin/pricing',
      '/admin/fleet',
      '/admin/whatsapp',
      '/admin/users',
      '/admin/roles',
      '/admin/audit-log',
      '/admin/settings',
    ];
    const isAccessingRestricted = restrictedPaths.some((p) =>
      currentPath === p || currentPath.startsWith(`${p}/`)
    );
    if (isAccessingRestricted) {
      redirect('/admin');
    }
  }

  return (
    <AdminShell>
      <div className="min-h-screen bg-[#0D0F12] text-[#F3EEE6] flex flex-col font-sans">
        <AdminNavbar initialUser={profile} />
        {/* TURNSTILE CONFIGURATION WARNING IN PRODUCTION */}
        {process.env.NODE_ENV === 'production' && (!process.env.TURNSTILE_SECRET_KEY || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || process.env.TURNSTILE_SECRET_KEY.includes('placeholder')) && (
          <div className="bg-amber-950/80 border-b border-amber-600/50 px-4 py-3 text-amber-200 text-xs text-center flex items-center justify-center gap-2">
            <span>⚠️ <strong>Security Notice:</strong> Cloudflare Turnstile keys (NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY) are missing or set to placeholder. Public booking and tracking APIs are in fail-closed 503 mode until valid production keys are configured.</span>
          </div>
        )}
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <footer className="border-t border-[#262B33] py-4 px-6 text-center text-xs text-[#6C7584]">
          <span>Duyuf Alrahman VIP Operations Portal • Protected with RBAC &amp; Mandatory TOTP</span>
        </footer>
      </div>
    </AdminShell>
  );
}
