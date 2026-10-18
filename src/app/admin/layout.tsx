import React from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';

export const metadata = {
  title: 'Admin Operations Portal | Royal Umrah Cabs',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const currentPath = headerList.get('x-pathname') || '';
  const isLoginPage = currentPath === '/admin/login' || currentPath.startsWith('/admin/login');

  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  // 1. Redirect unauthenticated users (except /admin/login) to /admin/login on the server
  if (!authData?.user) {
    if (!isLoginPage) {
      redirect('/admin/login');
    }
    return <>{children}</>;
  }

  // 2. Fetch staff profile strictly by auth_user_id (NO .or() queries)
  const serviceClient = createServiceClient();
  let { data: profile } = await serviceClient
    .from('user_profiles')
    .select('id, auth_user_id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled, created_at')
    .eq('auth_user_id', authData.user.id)
    .maybeSingle();

  if (!profile) {
    // Auto-link auth_user_id on first login if unlinked
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
    return <>{children}</>;
  }

  // 3. For owner and admin: ALWAYS require AAL2 MFA before granting access to portal pages
  if (profile.role === 'owner' || profile.role === 'admin') {
    const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (aalData?.currentLevel !== 'aal2') {
      if (!isLoginPage) {
        redirect('/admin/login?mfa=required');
      }
      return <>{children}</>;
    }
  }

  // 4. Authenticated users with completed MFA visiting login page get redirected to portal
  if (isLoginPage) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#F3EEE6] flex flex-col font-sans">
      <AdminNavbar initialUser={profile} />
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <footer className="border-t border-[#262B33] py-4 px-6 text-center text-xs text-[#6C7584]">
        <span>Royal Umrah Cabs Operations Portal • Protected with RBAC &amp; Mandatory TOTP</span>
      </footer>
    </div>
  );
}
