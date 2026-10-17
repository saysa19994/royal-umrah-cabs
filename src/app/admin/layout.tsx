import React from 'react';
import Link from 'next/link';
import { Shield, LayoutDashboard, DollarSign, Car, ExternalLink, LogOut, Users, MessageSquare, Settings } from 'lucide-react';

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
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#14171C]/95 backdrop-blur-md border-b border-[#262B33] px-4 md:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#D9A031]/20 border border-[#D9A031]/40 flex items-center justify-center text-base">
                🕋
              </span>
              <span className="font-display font-bold text-lg tracking-wider text-[#FAF9F6]">
                ROYAL UMRAH <span className="text-[#D9A031]">DISPATCH</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
              <Link
                href="/admin"
                className="px-3 py-1.5 rounded-lg hover:bg-[#20252D] text-[#D9A031] transition-colors flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Bookings</span>
              </Link>
              <Link
                href="/admin/leads"
                className="px-3 py-1.5 rounded-lg hover:bg-[#20252D] text-[#A0A6B2] hover:text-[#FAF9F6] transition-colors flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Leads</span>
              </Link>
              <Link
                href="/admin/pricing"
                className="px-3 py-1.5 rounded-lg hover:bg-[#20252D] text-[#A0A6B2] hover:text-[#FAF9F6] transition-colors flex items-center gap-1.5"
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Pricing &amp; Seasons</span>
              </Link>
              <Link
                href="/admin/fleet"
                className="px-3 py-1.5 rounded-lg hover:bg-[#20252D] text-[#A0A6B2] hover:text-[#FAF9F6] transition-colors flex items-center gap-1.5"
              >
                <Car className="w-3.5 h-3.5" />
                <span>Fleet</span>
              </Link>
              <Link
                href="/admin/whatsapp"
                className="px-3 py-1.5 rounded-lg hover:bg-[#20252D] text-[#A0A6B2] hover:text-[#FAF9F6] transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Routing</span>
              </Link>
              <Link
                href="/admin/settings"
                className="px-3 py-1.5 rounded-lg hover:bg-[#20252D] text-[#A0A6B2] hover:text-[#FAF9F6] transition-colors flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/en"
              target="_blank"
              className="text-xs text-[#A0A6B2] hover:text-[#FAF9F6] flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#262B33] hover:border-[#D9A031]/40 transition-colors"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              href="/admin/login"
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#262B33] py-4 text-center text-xs text-[#6C7584]">
        Royal Umrah Cabs Dispatch Operations &copy; 2026. Authorized internal access only.
      </footer>
    </div>
  );
}
