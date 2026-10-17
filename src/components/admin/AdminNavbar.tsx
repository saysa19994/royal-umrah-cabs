'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Car,
  MessageSquare,
  Settings,
  ShieldCheck,
  Shield,
  History,
  ExternalLink,
  LogOut,
  UserCheck,
} from 'lucide-react';
import { UserProfile } from '@/types/auth';

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ruc_admin_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      } else {
        // Default to owner view if directly opened in local admin
        setCurrentUser({
          id: 'usr-owner-1',
          email: 'owner@royalumrahcabs.com',
          name: 'Executive Owner',
          role: 'owner',
          is_suspended: false,
          totp_enabled: true,
          created_at: new Date().toISOString(),
        });
      }
    } catch {
      // fallback
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ruc_admin_authenticated');
    localStorage.removeItem('ruc_admin_user');
    router.push('/admin/login');
  };

  const isOperator = currentUser?.role === 'operator';
  const isOwner = currentUser?.role === 'owner';

  const navItems = [
    { href: '/admin', label: 'Bookings', icon: LayoutDashboard, show: true },
    { href: '/admin/leads', label: 'Leads', icon: Users, show: true },
    { href: '/admin/pricing', label: 'Pricing & Seasons', icon: DollarSign, show: !isOperator },
    { href: '/admin/fleet', label: 'Fleet', icon: Car, show: !isOperator },
    { href: '/admin/whatsapp', label: 'WhatsApp Routing', icon: MessageSquare, show: !isOperator },
    { href: '/admin/users', label: 'Users & Staff', icon: UserCheck, show: !isOperator },
    { href: '/admin/roles', label: 'Roles Matrix', icon: Shield, show: isOwner },
    { href: '/admin/audit-log', label: 'Audit Log', icon: History, show: !isOperator },
    { href: '/admin/settings', label: 'Settings', icon: Settings, show: !isOperator },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#14171C]/95 backdrop-blur-md border-b border-[#262B33] px-4 md:px-8 py-3">
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

          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold">
            {navItems
              .filter((item) => item.show)
              .map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#20252D] text-[#D9A031] font-bold'
                        : 'text-[#A0A6B2] hover:text-[#FAF9F6] hover:bg-[#1A1F26]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {currentUser && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[#FAF9F6] font-semibold">{currentUser.name.split(' ')[0]}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#D9A031]/20 text-[#D9A031]">
                {currentUser.role}
              </span>
              {currentUser.assigned_whatsapp_number && (
                <span className="text-[10px] text-emerald-400 font-mono">
                  +{currentUser.assigned_whatsapp_number}
                </span>
              )}
            </div>
          )}

          <Link
            href="/en"
            target="_blank"
            className="text-xs text-[#A0A6B2] hover:text-[#FAF9F6] flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#262B33] hover:border-[#D9A031]/40 transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={handleLogout}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
