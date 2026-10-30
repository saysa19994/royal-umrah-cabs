'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Car,
  DollarSign,
  Image as ImageIcon,
  Globe,
  HelpCircle,
  Star,
  MessageSquare,
  Bot,
  UserCheck,
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
    variant: 'rose' | 'amber' | 'emerald' | 'blue';
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

  const navGroups: NavGroup[] = [
    {
      titleEn: 'OPERATIONS & DISPATCH',
      titleAr: 'العمليات والتشغيل',
      items: [
        {
          href: '/admin',
          labelEn: 'Control Center',
          labelAr: 'مركز التحكم المباشر',
          icon: LayoutDashboard,
        },
        {
          href: '/admin/bookings',
          labelEn: 'VIP Bookings',
          labelAr: 'حجوزات كبار الشخصيات',
          icon: CalendarCheck,
        },
        {
          href: '/admin/leads',
          labelEn: 'Pilgrim Inquiries',
          labelAr: 'استفسارات المعتمرين',
          icon: Users,
          badge: { text: '13', variant: 'rose' },
        },
      ],
    },
    {
      titleEn: 'FLEET & REVENUE',
      titleAr: 'الأسطول والتسعير',
      items: [
        {
          href: '/admin/fleet',
          labelEn: 'VIP Fleet Control',
          labelAr: 'إدارة أسطول VIP',
          icon: Car,
          adminOnly: true,
        },
        {
          href: '/admin/pricing',
          labelEn: 'Pricing & Route Matrix',
          labelAr: 'مصفوفة الأسعار والمواسم',
          icon: DollarSign,
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
      titleEn: 'CONTENT & REPUTATION',
      titleAr: 'المحتوى والسمعة',
      items: [
        {
          href: '/admin/cms',
          labelEn: '10-Locale CMS',
          labelAr: 'إدارة المحتوى (10 لغات)',
          icon: Globe,
          badge: { text: '10 Locales', variant: 'blue' },
          adminOnly: true,
        },
        {
          href: '/admin/faqs',
          labelEn: 'FAQ Knowledgebase',
          labelAr: 'قاعدة الأسئلة الشائعة',
          icon: HelpCircle,
          adminOnly: true,
        },
        {
          href: '/admin/reviews',
          labelEn: 'Reviews Moderation',
          labelAr: 'مراجعة آراء المعتمرين',
          icon: Star,
          badge: { text: '1 Pending', variant: 'amber' },
        },
      ],
    },
    {
      titleEn: 'GOVERNANCE & CHANNELS',
      titleAr: 'الحوكمة والقنوات',
      items: [
        {
          href: '/admin/whatsapp',
          labelEn: 'WhatsApp Routing',
          labelAr: 'توجيه خطوط الواتساب',
          icon: MessageSquare,
          badge: { text: '2 Lines', variant: 'emerald' },
          adminOnly: true,
        },
        {
          href: '/admin/chat',
          labelEn: 'AI Rafeeq Knowledgebot',
          labelAr: 'المساعد الذكي رفيق',
          icon: Bot,
          adminOnly: true,
        },
        {
          href: '/admin/users',
          labelEn: 'Staff & Chauffeurs',
          labelAr: 'الموظفون والسائقون',
          icon: UserCheck,
          adminOnly: true,
        },
        {
          href: '/admin/roles',
          labelEn: 'RBAC Roles Matrix',
          labelAr: 'مصفوفة الصلاحيات',
          icon: Shield,
          ownerOnly: true,
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
          labelEn: 'Global VIP Settings',
          labelAr: 'الإعدادات العامة للخدمة',
          icon: Settings,
          adminOnly: true,
        },
        {
          href: '/admin/account',
          labelEn: 'Owner Master Account',
          labelAr: 'حساب المالك الرئيسي',
          icon: ShieldAlert,
          ownerOnly: true,
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
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 z-50 flex flex-col bg-[#070A10] border-[#1A2234] transition-all duration-300 ease-in-out shadow-[0_0_35px_rgba(0,0,0,0.85)]
          ${isRtl ? 'right-0 border-l' : 'left-0 border-r'}
          ${collapsed ? 'w-20' : 'w-72'}
          ${mobileOpen ? 'translate-x-0' : (isRtl ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0')}
        `}
      >
        {/* BRAND HEADER */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-[#1A2234]/80 bg-gradient-to-b from-[#0D121F] to-[#070A10]">
          <Link
            href="/admin"
            className="flex items-center gap-3 group overflow-hidden"
            onClick={onCloseMobile}
          >
            {/* VIP Golden Crest Monogram */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#E2B755] via-[#C9982E] to-[#8C6415] p-0.5 shadow-[0_0_15px_rgba(217,160,49,0.35)] shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[10px] bg-[#0A0E17] flex items-center justify-center overflow-hidden">
                <Image
                  src="/icon-192.png"
                  alt="Duyuf Alrahman VIP"
                  width={28}
                  height={28}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#070A10]" title="Operational Online" />
            </div>

            {!collapsed && (
              <div className="flex flex-col min-w-0 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-sm tracking-wider text-[#FAF9F6] whitespace-nowrap">
                    DUYUF ALRAHMAN
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-black rounded bg-gradient-to-r from-[#D4AF37] to-[#B38728] text-black tracking-wider uppercase shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                    VIP
                  </span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#7C879B] whitespace-nowrap">
                  {lang === 'ar' ? 'بوابة الإدارة والتشغيل' : 'Operations Command'}
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse / Expand Button */}
          <button
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg bg-[#111726] border border-[#222C42] text-[#8C98AE] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors"
          >
            {collapsed ? (
              isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
            ) : (
              isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* SINGLE SOURCE OF TRUTH TELEMETRY PILL (Expanded Only) */}
        {!collapsed && (
          <div className="px-4 py-2.5 bg-[#0B0F19] border-b border-[#1A2234]/60">
            <div className="flex items-center justify-between text-[11px] text-[#8B98B0]">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{lang === 'ar' ? 'قاعدة البيانات المباشرة' : 'PostgreSQL Live'}</span>
              </span>
              <span className="font-mono text-[10px] text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                10 Locales
              </span>
            </div>
          </div>
        )}

        {/* SCROLLABLE NAVIGATION LIST */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-[#1C2538] scrollbar-track-transparent">
          {navGroups.map((group, groupIdx) => {
            // Filter items based on permissions
            const visibleItems = group.items.filter((item) => {
              if (item.ownerOnly && !isOwner) return false;
              if (item.adminOnly && isOperator) return false;
              return true;
            });

            if (visibleItems.length === 0) return null;

            return (
              <div key={groupIdx} className="space-y-1">
                {!collapsed && (
                  <div className="px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#5C6880] select-none flex items-center justify-between">
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
                          ? 'bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent text-[#FAF9F6] border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)] font-bold'
                          : 'text-[#9AA5B8] hover:text-[#FAF9F6] hover:bg-[#121826] border border-transparent font-medium'
                      } ${collapsed ? 'justify-center px-0' : ''}`}
                    >
                      {/* Active Left Indicator Bar */}
                      {isActive && (
                        <span
                          className={`absolute top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-gradient-to-b from-[#E2B755] to-[#AA7C11] ${
                            isRtl ? 'right-0' : 'left-0'
                          }`}
                        />
                      )}

                      <Icon
                        className={`w-5 h-5 shrink-0 transition-colors ${
                          isActive
                            ? 'text-[#E2B755] drop-shadow-[0_0_6px_rgba(217,160,49,0.5)]'
                            : 'text-[#7A879E] group-hover:text-[#D4AF37]'
                        }`}
                      />

                      {!collapsed && (
                        <div className="flex-1 flex items-center justify-between min-w-0">
                          <span className="text-xs truncate tracking-wide">
                            {lang === 'ar' ? item.labelAr : item.labelEn}
                          </span>

                          {item.badge && (
                            <span
                              className={`ml-2 px-1.5 py-0.5 text-[9px] font-black rounded-full uppercase tracking-wider shrink-0 ${
                                item.badge.variant === 'rose'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                                  : item.badge.variant === 'amber'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : item.badge.variant === 'emerald'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
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

        {/* BOTTOM USER PROFILE & LOGOUT FOOTER */}
        <div className="p-3 border-t border-[#1A2234] bg-[#0A0D15]/95">
          {!collapsed ? (
            <div className="p-2.5 rounded-xl bg-[#111624] border border-[#202A3E] flex items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#7A5812] p-0.5 shrink-0 shadow-[0_0_8px_rgba(212,175,55,0.3)]">
                  <div className="w-full h-full rounded-[6px] bg-[#0C101A] flex items-center justify-center font-bold text-xs text-[#E2B755]">
                    {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#FAF9F6] truncate">
                      {currentUser?.name || 'Sayed Saed'}
                    </span>
                    <Crown className="w-3 h-3 text-[#D4AF37] shrink-0" />
                  </div>
                  <span className="text-[10px] text-[#7C879B] truncate font-mono">
                    {currentUser?.role === 'owner' ? (lang === 'ar' ? 'المالك المعتمد' : 'VIP Owner') : currentUser?.role}
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title={lang === 'ar' ? 'تسجيل الخروج' : 'Log out from Control Center'}
                className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              title={lang === 'ar' ? 'تسجيل الخروج' : 'Log out from Control Center'}
              className="w-full flex items-center justify-center p-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
