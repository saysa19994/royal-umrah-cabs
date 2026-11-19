'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  Clock,
  BarChart3,
  Users,
  Car,
  Compass,
  DollarSign,
  UserCheck,
  Image as ImageIcon,
  Globe,
  HelpCircle,
  Star,
  MessageSquare,
  Bot,
  Shield,
  ShieldCheck,
  Key,
  History,
  Settings,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  ExternalLink,
  Crown,
  MapPin,
  Radio,
  Sliders,
} from 'lucide-react';
import { UserProfile } from '@/types/auth';
import { createClient } from '@/lib/supabase/client';
import { VipBrandMark } from './VipBrandMark';

export interface AdminSidebarProps {
  currentUser?: UserProfile | null;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  lang: 'en' | 'ar';
}

interface NavItem {
  href: string;
  labelEn: string;
  labelAr: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: {
    text: string;
    variant: 'gold' | 'emerald' | 'amber' | 'rose';
  };
  ownerOnly?: boolean;
  adminOnly?: boolean;
}

interface NavGroup {
  titleEn: string;
  titleAr: string;
  items: NavItem[];
}

export function AdminSidebar({
  currentUser,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  lang,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isOwner = currentUser?.role === 'owner';
  const isOperator = currentUser?.role === 'operator';

  // 10 Key Architectural Modules matching Reference Image 1 & 2
  const navGroups: NavGroup[] = [
    {
      titleEn: 'OPERATIONS RADAR',
      titleAr: 'مركز العمليات المباشر',
      items: [
        {
          href: '/admin',
          labelEn: 'Dashboard & Dispatch',
          labelAr: 'لوحة التحكم والعمليات',
          icon: LayoutDashboard,
          badge: { text: 'Live', variant: 'emerald' },
        },
        {
          href: '/admin/bookings',
          labelEn: 'VIP Bookings Control',
          labelAr: 'جدول الحجوزات والسائقين',
          icon: CalendarCheck,
        },
        {
          href: '/admin/dispatch',
          labelEn: 'Daily Dispatch',
          labelAr: 'مركز توزيع الرحلات',
          icon: Clock,
        },
        {
          href: '/admin/reports',
          labelEn: 'Operations Reports',
          labelAr: 'تقارير الحجوزات والتحصيل',
          icon: BarChart3,
          adminOnly: true,
        },
        {
          href: '/admin/collections',
          labelEn: 'Cash Collections',
          labelAr: 'التحصيل النقدي',
          icon: DollarSign,
          adminOnly: true,
        },
        {
          href: '/admin/leads',
          labelEn: 'Lead Inquiries',
          labelAr: 'استفسارات المعتمرين',
          icon: Users,
          // Live metrics are shown in the operations console, not hard-coded here.
        },
      ],
    },
    {
      titleEn: 'FLEET & MEDIA',
      titleAr: 'الأسطول والوسائط',
      items: [
        {
          href: '/admin/fleet',
          labelEn: 'VIP Fleet Control',
          labelAr: 'إدارة أسطول VIP',
          icon: Car,
          // Live metrics are shown in the operations console, not hard-coded here.
          adminOnly: true,
        },
        {
          href: '/admin/drivers',
          labelEn: 'Active Chauffeurs',
          labelAr: 'دليل السائقين والمرافقين',
          icon: UserCheck,
          adminOnly: true,
        },
        {
          href: '/admin/media',
          labelEn: 'Media Asset Vault',
          labelAr: 'مكتبة وسائط الأسطول',
          icon: ImageIcon,
          adminOnly: true,
        },
      ],
    },
    {
      titleEn: 'PRICING & CORRIDORS',
      titleAr: 'المسارات والتسعير',
      items: [
        {
          href: '/admin/routes',
          labelEn: 'Routes & Corridors',
          labelAr: 'مسارات ومواقيت الحرمين',
          icon: Compass,
          // Live metrics are shown in the operations console, not hard-coded here.
          adminOnly: true,
        },
        {
          href: '/admin/pricing',
          labelEn: 'Pricing & Route Matrix',
          labelAr: 'مصفوفة التسعير والمواسم',
          icon: DollarSign,
          adminOnly: true,
        },
      ],
    },
    {
      titleEn: 'CONTENT & DISPATCH CHANNELS',
      titleAr: 'المحتوى وقنوات التواصل',
      items: [
        {
          href: '/admin/whatsapp',
          labelEn: 'WhatsApp Routing',
          labelAr: 'توجيه محادثات الواتساب',
          icon: MessageSquare,
          // Live metrics are shown in the operations console, not hard-coded here.
          adminOnly: true,
        },
        {
          href: '/admin/blog',
          labelEn: 'Blog & Articles',
          labelAr: 'المقالات والمدونة',
          icon: BookOpen,
          badge: { text: 'Guides', variant: 'gold' },
          adminOnly: true,
        },
        {
          href: '/admin/cms',
          labelEn: 'Website Content (CMS)',
          labelAr: 'إدارة محتوى الموقع (CMS)',
          icon: Globe,
          badge: { text: '10 Locales', variant: 'gold' },
          adminOnly: true,
        },
        {
          href: '/admin/faqs',
          labelEn: 'FAQ Knowledgebase',
          labelAr: 'الأسئلة الشائعة وقواعد الحجز',
          icon: HelpCircle,
          adminOnly: true,
        },
        {
          href: '/admin/reviews',
          labelEn: 'Reviews Moderation',
          labelAr: 'مراجعة آراء المعتمرين',
          icon: Star,
          // Live metrics are shown in the operations console, not hard-coded here.
        },
      ],
    },
    {
      titleEn: 'GOVERNANCE & AUDIT',
      titleAr: 'الحوكمة والأمان',
      items: [
        {
          href: '/admin/users',
          labelEn: 'Staff & Team',
          labelAr: 'فريق العمل والصلاحيات',
          icon: UserCheck,
          adminOnly: true,
        },
        {
          href: '/admin/audit-log',
          labelEn: 'Security Audit Log',
          labelAr: 'سجل تدقيق الأمان',
          icon: History,
          adminOnly: true,
        },
        {
          href: '/admin/settings',
          labelEn: 'System Settings',
          labelAr: 'إعدادات النظام العامة',
          icon: Settings,
          adminOnly: true,
        },
      ],
    },
  ];

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {}
    router.push('/admin/login');
  };

  const isRtl = lang === 'ar';

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container: Deep Royal Green #122E27 with Champagne Borders */}
      <aside
        className={`fixed top-0 bottom-0 z-50 flex flex-col bg-[#0B0F17] text-[#F3F4F6] border-[#1F2C42] transition-all duration-300 ease-in-out shadow-[0_4px_30px_rgba(18,46,39,0.35)]
          ${isRtl ? 'right-0 border-l' : 'left-0 border-r'}
          ${collapsed ? 'w-20' : 'w-72'}
          ${mobileOpen ? 'translate-x-0' : isRtl ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{
          fontFamily: isRtl
            ? 'var(--font-ibm-plex-arabic), var(--font-cairo), sans-serif'
            : 'var(--font-inter), sans-serif',
        }}
      >
        {/* BRAND HEADER (Faithful to Image 1: VIP Guest Transport) */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-[#1F2C42]/80 bg-[#0B0F17]">
          <Link
            href="/admin"
            className="flex items-center gap-3 group overflow-hidden"
            onClick={onCloseMobile}
          >
            {/* Golden Kaaba / Crest Icon */}
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#E8BE6D] via-[#D6A13A] to-[#996F1D] p-0.5 shadow-[0_2px_12px_rgba(214,161,58,0.3)] shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[10px] bg-[#070A10] flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#E8BE6D]" fill="currentColor">
                  {/* Stylized Kaaba / Royal Cube */}
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#122E27]" title="Operational Online" />
            </div>

            {!collapsed && (
              <div className="flex flex-col min-w-0 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-wide text-[#F3F4F6] whitespace-nowrap">
                    VIP GUEST TRANSPORT
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D6A13A] whitespace-nowrap">
                  {lang === 'ar' ? 'ضيوف الرحمن • حج وعمرة' : 'Hajj & Umrah Luxury'}
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse / Expand Button */}
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg bg-[#101726] border border-[#1F2C42] text-[#C5A059] hover:text-white hover:border-[#D6A13A] transition-colors"
          >
            {collapsed ? (
              isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
            ) : (
              isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* SCROLLABLE NAVIGATION LIST */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {navGroups.map((group, groupIdx) => {
            const visibleItems = group.items.filter((item) => {
              if (item.ownerOnly && !isOwner) return false;
              if (item.adminOnly && isOperator) return false;
              return true;
            });

            if (visibleItems.length === 0) return null;

            return (
              <div key={groupIdx} className="space-y-1">
                {!collapsed && (
                  <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B] select-none">
                    <span>{lang === 'ar' ? group.titleAr : group.titleEn}</span>
                  </div>
                )}

                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === '/admin'
                      ? pathname === '/admin'
                      : pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
    <>
      {mobileOpen && <button type="button" aria-label="Close navigation"
        onClick={onCloseMobile} className="fixed inset-0 z-40 bg-[#071b2e]/65 backdrop-blur-sm lg:hidden"/>}
      <aside
        aria-label={lang === 'ar' ? 'القائمة الرئيسية للإدارة' : 'Admin navigation'}
        className={`vip-admin-sidebar fixed bottom-0 top-0 z-50 flex flex-col overflow-hidden text-[#f8f3e8] transition-all duration-300
          ${isRtl ? 'right-0 border-l' : 'left-0 border-r'}
          ${collapsed ? 'w-72 lg:w-20' : 'w-72'}
          ${mobileOpen ? 'translate-x-0' : isRtl ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex min-h-[156px] flex-col items-center justify-center border-b border-[#d8b77d]/30 px-4 text-center">
          <Link href="/admin" onClick={onCloseMobile} aria-label="Duyuf Al Rahman VIP - Admin Home"
            className="flex flex-col items-center gap-2">
            <VipBrandMark size={49} />
            <div className={collapsed ? 'lg:hidden' : ''}>
              <strong className="vip-brand-serif block text-[19px] leading-6 text-[#f9f2e5]">Duyuf Al Rahman VIP</strong>
              <span className="mt-1.5 block text-[10px] font-bold tracking-[.25em] text-[#e8bf7c]">CHAUFFEUR SERVICES</span>
            </div>
          </Link>
          {!collapsed && <div className="mt-4 flex items-center gap-2 text-[#d7a962]">
            <span className="h-px w-12 bg-current"/><span className="h-2 w-2 rotate-45 bg-current"/><span className="h-px w-12 bg-current"/>
          </div>}
          <button type="button" onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="absolute top-4 hidden h-7 w-7 items-center justify-center rounded-lg border border-[#cda969]/30 text-[#d9bf95] hover:bg-[#105164] lg:flex
              ${isRtl ? 'left-3' : 'right-3'}">
            {collapsed ? <ChevronRight className="h-4 w-4"/> : <ChevronLeft className="h-4 w-4"/>}
          </button>
        </div>

        <nav className="relative z-10 flex-1 space-y-6 overflow-y-auto px-3 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navGroups.map((group, idx) => {
            const allowed = group.items.filter(item =>
              (!item.ownerOnly || isOwner) && (!item.adminOnly || !isOperator)
            );
            if (allowed.length === 0) return null;
            return <div key={idx} className="space-y-1">
              <p className={`mb-1 px-3 text-[10px] font-bold uppercase tracking-[.13em] text-[#b29a73] ${collapsed ? 'lg:sr-only' : ''}`}>
                {lang === 'ar' ? group.titleAr : group.titleEn}
              </p>
              {allowed.map(item => {
                const Icon = item.icon;
                const active = item.href === '/admin'
                  ? pathname === '/admin' : pathname === item.href || pathname.startsWith(item.href + '/');
                return <Link key={item.href} href={item.href} onClick={onCloseMobile}
                  title={collapsed ? (lang === 'ar' ? item.labelAr : item.labelEn) : undefined}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative flex min-h-[43px] items-center gap-3 rounded-xl border px-3 py-2.5 text-[13px] font-semibold transition
                    ${active
                      ? 'border-[#d6ac67] bg-gradient-to-r from-[#0a6869] to-[#063f50] text-[#fff8e8] shadow-[0_5px_13px_rgba(0,0,0,.20)]'
                      : 'border-transparent text-[#deeced] hover:border-[#c29c60]/30 hover:bg-[#123b4d]'}
                    ${collapsed ? 'lg:justify-center lg:px-2' : ''}`}>
                  <Icon aria-hidden="true" className={`h-[18px] w-[18px] shrink-0 ${active ? 'text-[#f2bd6d]' : 'text-[#d7aa62] group-hover:text-[#ffe4b6]'}`}/>
                  <span className={`truncate ${collapsed ? 'lg:sr-only' : ''}`}>{lang === 'ar' ? item.labelAr : item.labelEn}</span>
                </Link>;
              })}
            </div>;
          })}
        </nav>

        <div className="relative z-10 border-t border-[#c9a66f]/25 bg-[#071925]/85 p-3">
          <div className={collapsed ? 'lg:hidden' : ''}>
            <p className="mb-3 text-center text-xs font-bold text-[#dbb879]">{lang === 'ar' ? 'رحلتكم تستحق عناية استثنائية' : 'Every Journey Deserves Excellence'}</p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-[#dfbe80]/15 bg-[#132e3f] p-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#b99458] font-bold text-[#112c3a]">
              {currentUser?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <div className={`min-w-0 flex-1 ${collapsed ? 'lg:hidden' : ''}`}>
              <p className="truncate text-xs font-bold">{currentUser?.name || (lang === 'ar' ? 'الإدارة' : 'Administrator')}</p>
              <p className="mt-0.5 text-[10px] text-[#c7b9a8]">{currentUser?.role || 'staff'}</p>
            </div>
            <button type="button" onClick={handleLogout} aria-label={lang === 'ar' ? 'تسجيل الخروج' : 'Sign out'}
              className="rounded-lg p-1.5 text-[#f2d49b] hover:bg-[#245062]">
              <LogOut className="h-4 w-4"/>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
