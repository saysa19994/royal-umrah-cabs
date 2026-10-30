'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Search,
  ExternalLink,
  Clock,
  Globe,
  Bell,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { UserProfile } from '@/types/auth';

export interface AdminTopBarProps {
  currentUser?: UserProfile | null;
  onOpenMobile: () => void;
  onOpenSearch: () => void;
  lang: 'en' | 'ar';
  onToggleLang: () => void;
}

export function AdminTopBar({
  currentUser,
  onOpenMobile,
  onOpenSearch,
  lang,
  onToggleLang,
}: AdminTopBarProps) {
  const pathname = usePathname();
  const [makkahTime, setMakkahTime] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Live Makkah Time clock (Asia/Riyadh, GMT+3)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Riyadh',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setMakkahTime(timeStr);
      } catch {
        setMakkahTime('');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getBreadcrumb = () => {
    const pathMapEn: Record<string, { section: string; title: string }> = {
      '/admin': { section: 'Operations', title: 'Live Control Center' },
      '/admin/bookings': { section: 'Operations', title: 'VIP Bookings Dispatch' },
      '/admin/leads': { section: 'Operations', title: 'Pilgrim Inquiries & Leads' },
      '/admin/fleet': { section: 'Fleet & Assets', title: 'VIP Fleet Management' },
      '/admin/drivers': { section: 'Fleet & Assets', title: 'Chauffeurs & Drivers' },
      '/admin/media': { section: 'Fleet & Assets', title: 'Media Asset Vault' },
      '/admin/routes': { section: 'Routes & Tariffs', title: 'Routes & Corridors' },
      '/admin/pricing': { section: 'Routes & Tariffs', title: 'Dynamic Pricing Matrix' },
      '/admin/cms': { section: 'Content & Reputation', title: '10-Locale Studio' },
      '/admin/faqs': { section: 'Content & Reputation', title: 'FAQ Knowledgebase' },
      '/admin/reviews': { section: 'Content & Reputation', title: 'Reviews Moderation' },
      '/admin/whatsapp': { section: 'Channels & Governance', title: 'WhatsApp Line Dispatch' },
      '/admin/chat': { section: 'Channels & Governance', title: 'AI Rafeeq Assistant' },
      '/admin/users': { section: 'Channels & Governance', title: 'Staff & Team' },
      '/admin/roles': { section: 'Channels & Governance', title: 'RBAC Roles Matrix' },
      '/admin/audit-log': { section: 'Channels & Governance', title: 'Security Audit Log' },
      '/admin/settings': { section: 'Channels & Governance', title: 'Global VIP Settings' },
      '/admin/account': { section: 'Channels & Governance', title: 'Owner Master Account' },
    };

    const pathMapAr: Record<string, { section: string; title: string }> = {
      '/admin': { section: 'العمليات', title: 'مركز العمليات المباشر' },
      '/admin/bookings': { section: 'العمليات', title: 'جدول الحجوزات وتوزيع السائقين' },
      '/admin/leads': { section: 'العمليات', title: 'استفسارات المعتمرين والمتابعة' },
      '/admin/fleet': { section: 'الأسطول والوسائط', title: 'إدارة أسطول VIP' },
      '/admin/drivers': { section: 'الأسطول والوسائط', title: 'دليل السائقين والمرافقين' },
      '/admin/media': { section: 'الأسطول والوسائط', title: 'مكتبة وسائط الأسطول' },
      '/admin/routes': { section: 'المسارات والتسعير', title: 'المسارات والمواقيت' },
      '/admin/pricing': { section: 'المسارات والتسعير', title: 'مصفوفة الأسعار والمواسم' },
      '/admin/cms': { section: 'المحتوى والسمعة', title: 'استوديو نصوص الموقع (10 لغات)' },
      '/admin/faqs': { section: 'المحتوى والسمعة', title: 'الأسئلة الشائعة وقواعد الحجز' },
      '/admin/reviews': { section: 'المحتوى والسمعة', title: 'مراجعة آراء المعتمرين' },
      '/admin/whatsapp': { section: 'القنوات والحوكمة', title: 'توجيه خطوط الواتساب' },
      '/admin/chat': { section: 'القنوات والحوكمة', title: 'المساعد الذكي رفيق' },
      '/admin/users': { section: 'القنوات والحوكمة', title: 'دليل الموظفين وفريق العمل' },
      '/admin/roles': { section: 'القنوات والحوكمة', title: 'مصفوفة الصلاحيات' },
      '/admin/audit-log': { section: 'القنوات والحوكمة', title: 'سجل تدقيق الأمان' },
      '/admin/settings': { section: 'القنوات والحوكمة', title: 'الإعدادات العامة وسياسة الدفع' },
      '/admin/account': { section: 'القنوات والحوكمة', title: 'إدارة حساب المالك والمصادقة' },
    };

    const map = lang === 'ar' ? pathMapAr : pathMapEn;
    const item = map[pathname] || { section: lang === 'ar' ? 'الرئيسية' : 'Portal', title: 'Dashboard' };
    return item;
  };

  const breadcrumb = getBreadcrumb();
  const isRtl = lang === 'ar';

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#090D15]/90 backdrop-blur-xl border-b border-[#1F2C42] px-4 md:px-8 flex items-center justify-between gap-4 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
      {/* Mobile menu trigger & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl bg-[#141D2C] border border-[#1F2C42] text-[#A5B0C2] hover:text-[#F4F1E9] transition-colors"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 text-xs select-none min-w-0">
          <span className="text-[#64748B] font-medium hidden sm:inline truncate">
            {breadcrumb.section}
          </span>
          <span className="text-[#334155] hidden sm:inline">
            {isRtl ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </span>
          <span className="font-bold text-[#F4F1E9] tracking-wide truncate">
            {breadcrumb.title}
          </span>
        </div>
      </div>

      {/* CENTER: SEARCH TRIGGER */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#101725] border border-[#1F2C42] text-[#A5B0C2] hover:text-[#D6A13A] hover:border-[#D6A13A]/40 transition-all text-xs group shadow-inner"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#D6A13A] transition-colors" />
            <span className="truncate">
              {lang === 'ar' ? 'بحث سريع عن رحلة، معتمر، سيارة... (Ctrl+K)' : 'Quick Search routes, pilgrims, fleet... (Ctrl+K)'}
            </span>
          </span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#141D2C] text-[#A5B0C2] rounded border border-[#1F2C42]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* RIGHT / LEFT: STATUS PILL, MAKKAH CLOCK, LANG SWITCHER, PREVIEW LINK */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* MAKKAH CLOCK */}
        {makkahTime && (
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#101725] border border-[#1F2C42] text-[11px] font-mono text-[#D6A13A] shadow-inner select-none">
            <span className="w-2 h-2 rounded-full bg-[#D6A13A] animate-pulse" />
            <span>🕋 {makkahTime}</span>
            <span className="text-[10px] text-[#64748B]">Makkah</span>
          </div>
        )}

        {/* LANGUAGE SWITCHER */}
        <button
          onClick={onToggleLang}
          title={lang === 'ar' ? 'Switch to English (LTR)' : 'التحويل إلى العربية (RTL)'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#101725] hover:bg-[#141D2C] border border-[#1F2C42] text-xs font-bold text-[#D6A13A] hover:border-[#D6A13A]/50 transition-all select-none shadow-sm"
        >
          <Globe className="w-3.5 h-3.5 text-[#D6A13A]" />
          <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
        </button>

        {/* NOTIFICATIONS BELL */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
            className="relative p-2 rounded-xl bg-[#101725] hover:bg-[#141D2C] border border-[#1F2C42] text-[#A5B0C2] hover:text-[#F4F1E9] transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#090D15] animate-pulse" />
          </button>

          {showNotifications && (
            <div
              className={`absolute top-full mt-2 w-80 rounded-2xl bg-[#101725] border border-[#1F2C42] shadow-[0_15px_45px_rgba(0,0,0,0.85)] p-3 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                isRtl ? 'left-0' : 'right-0'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#1F2C42]">
                <span className="text-xs font-bold text-[#F4F1E9]">
                  {lang === 'ar' ? 'تنبيهات النظام' : 'System Alerts'}
                </span>
                <span className="text-[10px] text-[#A5B0C2] font-medium">
                  {lang === 'ar' ? 'مباشر من الخادم' : 'Live from DB'}
                </span>
              </div>

              <div className="py-2 space-y-2">
                <Link
                  href="/admin/leads"
                  onClick={() => setShowNotifications(false)}
                  className="block p-2.5 rounded-xl bg-rose-950/30 border border-rose-900/40 hover:bg-rose-950/50 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-rose-300">
                    <span>{lang === 'ar' ? '13 استفسار غير مجاب' : '13 Unattended Leads'}</span>
                    <span className="text-[10px] text-rose-400 font-mono">&gt;15 min</span>
                  </div>
                  <p className="text-[11px] text-rose-200/70 mt-1">
                    {lang === 'ar'
                      ? 'يرجى الرد على المعتمرين عبر واتساب للحفاظ على سرعة الاستجابة.'
                      : 'Pilgrims waiting for confirmation. Reply via WhatsApp now.'}
                  </p>
                </Link>

                <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-900/30">
                  <div className="text-xs font-bold text-amber-300">
                    {lang === 'ar' ? 'سياسة الدفع: نقداً فقط' : 'Payment Policy: Strict Cash Only'}
                  </div>
                  <p className="text-[11px] text-amber-200/70 mt-1">
                    {lang === 'ar'
                      ? 'الدفع نقداً للسائق في نهاية الرحلة (SAR/USD). لا بطاقات أو تحويلات مسبقة.'
                      : 'Customer pays driver in cash at destination (SAR/USD). Zero advance card or transfers.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* VISIT PUBLIC SITE BUTTON */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D6A13A]/20 to-[#A97B27]/20 hover:from-[#D6A13A]/30 hover:to-[#A97B27]/30 border border-[#D6A13A]/50 text-xs font-bold text-[#F4F1E9] transition-all shadow-[0_0_12px_rgba(214,161,58,0.2)]"
        >
          <span className="hidden sm:inline">
            {lang === 'ar' ? 'عرض الموقع العام' : 'Public Site'}
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-[#D6A13A]" />
        </a>
      </div>
    </header>
  );
}
