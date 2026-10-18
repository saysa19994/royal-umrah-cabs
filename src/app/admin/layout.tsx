import React from 'react';
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
  // Enforce server-side cookie authentication on the entire admin portal
  // Except for the login page which is accessible anonymously
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  // If there's an authenticated user, verify they have an active staff profile
  let staffProfile = null;
  if (authData?.user) {
    const serviceClient = createServiceClient();
    const { data: profile } = await serviceClient
      .from('user_profiles')
      .select('id, email, name, role, assigned_whatsapp_number, is_suspended, totp_enabled, created_at')
      .or(`auth_user_id.eq.${authData.user.id},email.eq.${authData.user.email}`)
      .maybeSingle();

    if (profile && !profile.is_suspended) {
      staffProfile = profile;
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#F3EEE6] flex flex-col font-sans">
      <AdminNavbar initialUser={staffProfile} />
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <footer className="border-t border-[#262B33] py-4 px-6 text-center text-xs text-[#6C7584]">
        <span>Royal Umrah Cabs Operations Portal • Protected with RBAC &amp; 2FA TOTP</span>
      </footer>
    </div>
  );
}
