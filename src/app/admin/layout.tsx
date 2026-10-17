import React from 'react';
import { AdminNavbar } from '@/components/admin/AdminNavbar';

export const metadata = {
  title: 'Admin Operations Portal | Royal Umrah Cabs',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0D0F12] text-[#F3EEE6] flex flex-col font-sans">
      <AdminNavbar />
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <footer className="border-t border-[#262B33] py-4 px-6 text-center text-xs text-[#6C7584]">
        <span>Royal Umrah Cabs Operations Portal • Protected with RBAC &amp; 2FA TOTP</span>
      </footer>
    </div>
  );
}
