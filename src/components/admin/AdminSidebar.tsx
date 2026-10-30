'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
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
          href: '/admin/leads',
          labelEn: 'Lead Inquiries',
          labelAr: 'استفسارات المعتمرين',
          icon: Users,
          badge: { text: '12 New', variant: 'gold' },
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
          badge: { text: '6 Models', variant: 'emerald' },
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
          badge: { text: '16 Routes', variant: 'gold' },
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
          badge: { text: '2 Lines', variant: 'emerald' },
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
          badge: { text: '98%', variant: 'gold' },
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
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onCloseMobile}
                      title={collapsed ? (lang === 'ar' ? item.labelAr : item.labelEn) : undefined}
                      className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 select-none ${
                        isActive
                          ? 'bg-gradient-to-r from-[#C9A24B] to-[#E6C773] text-[#0B0F17] font-extrabold shadow-[0_4px_16px_rgba(201,162,75,0.35)]'
                          : 'text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#101726]/80 font-medium'
                      } ${collapsed ? 'justify-center px-0' : ''}`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive
                            ? 'text-[#E8BE6D]'
                            : 'text-[#64748B] group-hover:text-[#E8BE6D]'
                        }`}
                      />

                      {!collapsed && (
                        <div className="flex-1 flex items-center justify-between min-w-0">
                          <span className="text-xs truncate tracking-wide">
                            {lang === 'ar' ? item.labelAr : item.labelEn}
                          </span>

                          {item.badge && (
                            <span
                              className={`ml-2 px-1.5 py-0.5 text-[9px] font-bold rounded-md uppercase tracking-wider shrink-0 ${
                                item.badge.variant === 'gold'
                                  ? 'bg-[#D6A13A]/25 text-[#F0CF87] border border-[#D6A13A]/40'
                                  : item.badge.variant === 'emerald'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35'
                                  : item.badge.variant === 'amber'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/35'
                                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/35'
                              }`}
                            >
                              {item.badge.text}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* BOTTOM MOTIF CARD (Faithful to Reference Image 1) */}
        {!collapsed && (
          <div className="p-3 m-3 rounded-2xl bg-gradient-to-b from-[#173D35] to-[#0E2620] border border-[#1F2C42] text-center shadow-lg relative overflow-hidden">
            <div className="relative z-10 py-1">
              <span className="text-xs font-serif font-bold text-[#D6A13A] block mb-0.5">
                {lang === 'ar' ? 'رحلتكم .. أولويتنا' : 'Your Comfort · Our Priority'}
              </span>
              <span className="text-[10px] text-[#94A3B8] block">
                {lang === 'ar' ? 'خدمة متميزة تليق بضيوف الرحمن' : 'Executive Chauffeur Service'}
              </span>
            </div>
          </div>
        )}

        {/* BOTTOM USER PROFILE & LOGOUT FOOTER */}
        <div className="p-3 border-t border-[#1F2C42] bg-[#070A10]">
          {!collapsed ? (
            <div className="p-2 rounded-xl bg-[#101726] border border-[#1F2C42] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D6A13A] to-[#8C6415] p-0.5 shrink-0">
                  <div className="w-full h-full rounded-[6px] bg-[#070A10] flex items-center justify-center font-bold text-xs text-[#E8BE6D]">
                    {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#F3F4F6] truncate">
                      {currentUser?.name || 'Sayed Saed'}
                    </span>
                    <Crown className="w-3 h-3 text-[#D6A13A] shrink-0" />
                  </div>
                  <span className="text-[10px] text-[#94A3B8] truncate">
                    {currentUser?.role === 'owner' ? (lang === 'ar' ? 'المالك المعتمد' : 'System Manager') : currentUser?.role}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title={lang === 'ar' ? 'تسجيل الخروج' : 'Log out from Control Center'}
                className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-500/20 transition-colors shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              title={lang === 'ar' ? 'تسجيل الخروج' : 'Log out from Control Center'}
              className="w-full flex items-center justify-center p-2 rounded-xl text-rose-300 hover:text-white hover:bg-rose-500/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
