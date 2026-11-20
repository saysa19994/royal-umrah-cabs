import React from 'react';
import '@/styles/admin-cinematic.css';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';
import { createClient } from '@/lib/supabase/server';
import { createServiceClient } from '@/lib/supabase/service';
import { inter, cairo, ibmPlexArabic } from '@/app/fonts';
import { UserProfile } from '@/types/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'VIP Operations Command Center | Duyuf Alrahman VIP',
  robots: {
    index: false,
    follow: false,
  },
};

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${ibmPlexArabic.variable} ${cairo.variable}`}>
      <body className="min-h-screen bg-[#0B0F17] text-[#F3F4F6] antialiased selection:bg-[#C9A24B]/20 selection:text-[#E6C773] font-sans">
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

  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  // 1. Redirect unauthenticated users (except /admin/login) to /admin/login on the server
  if (!authData?.user) {
    if (!isLoginPage) {
      redirect('/admin/login');
    }
    return <AdminShell>{children}</AdminShell>;
  }

  // 2. Fetch staff profile strictly by auth_user_id
  const serviceClient = createServiceClient();
  let { data: profile } = await serviceClient
    .from('user_profiles')
    .select('id, auth_user_id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled, created_at')
    .eq('auth_user_id', authData.user.id)
    .maybeSingle();

  if (!profile) {
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

  // 3. MFA verification
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

  if (isLoginPage) {
    redirect('/admin');
  }

  // 4. Role restrictions
  if (profile.role !== 'owner') {
    if (currentPath === '/admin/account' || currentPath.startsWith('/admin/account/')) {
      redirect('/admin');
    }
  }

  if (profile.role !== 'owner' && profile.role !== 'admin') {
    const restrictedPaths = [
      '/admin/pricing',
      '/admin/fleet',
      '/admin/routes',
      '/admin/drivers',
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
      <AdminLayoutClient currentUser={profile}>
        {children}
      </AdminLayoutClient>
    </AdminShell>
  );
}
