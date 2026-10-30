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
  ShieldCheck,
  Calendar,
  Crown,
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
  const [currentDateFormatted, setCurrentDateFormatted] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Live Makkah Time clock (Asia/Riyadh, GMT+3)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Riyadh',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(now);
        setMakkahTime(timeStr);

        const dateStr = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA' : 'en-GB', {
          timeZone: 'Asia/Riyadh',
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }).format(now);
        setCurrentDateFormatted(dateStr);
      } catch {
        setMakkahTime('10:24 AM');
        setCurrentDateFormatted('Mon, 27 Oct 2025');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  const isRtl = lang === 'ar';

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0B0F17] border-b border-[#1F2C42] shadow-xs px-4 md:px-8 flex items-center justify-between gap-4 transition-colors">
      {/* LEFT: MOBILE TOGGLE & WELCOME GREETING (Faithful to Reference Image 1) */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <button
          onClick={onOpenMobile}
          aria-label="Open navigation menu"
          className="lg:hidden p-2 rounded-lg bg-[#101726] border border-[#1F2C42] text-white hover:bg-[#151D2C] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[#101726] border border-[#1F2C42] flex items-center justify-center text-[#C9A24B] shrink-0">
            <Crown className="w-4 h-4 text-[#A97B27]" />
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="text-xs md:text-sm font-bold text-white flex items-center gap-1.5 truncate">
              <span>{lang === 'ar' ? 'مرحبًا بك، الإدارة' : 'Welcome back, Admin'}</span>
            </h1>
            <span className="text-[11px] text-[#8E9CAE] hidden sm:inline truncate">
              {lang === 'ar' ? 'رحلات ميسرة • أوقات مباركة' : 'Smooth Journeys • Blessed Moments'}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT: LIVE MAKKAHTIME CLOCK, NOTIFICATIONS, SEARCH, LANG & PROFILE */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Real-time Makkah Clock Pill (Matching Image 1) */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#101726] border border-[#1F2C42] text-white">
          <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" />
          <div className="flex flex-col text-start leading-tight">
            <span className="text-[10px] text-[#8E9CAE] font-medium">{currentDateFormatted || 'Mon, 27 Oct 2025'}</span>
            <span className="text-[11px] font-bold text-white font-mono">{makkahTime || '10:24 AM'}</span>
          </div>
        </div>

        {/* Quick Search Shortcut (Ctrl+K) */}
        <button
          onClick={onOpenSearch}
          aria-label="Quick search"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#101726] hover:bg-[#151D2C] border border-[#1F2C42] text-xs text-[#8E9CAE] transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'بحث سريع' : 'Search'}</span>
          <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-[#101726] border border-[#1F2C42] text-white font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Bell with Pill */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            aria-label="Notifications"
            className="relative p-2 rounded-xl bg-[#101726] hover:bg-[#151D2C] border border-[#1F2C42] text-white transition-colors"
          >
            <Bell className="w-4 h-4 text-[#C9A24B]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center shadow-xs">
              3
            </span>
          </button>

          {showNotifications && (
            <div className={`absolute top-full mt-2 w-72 md:w-80 rounded-2xl bg-[#101726] border border-[#1F2C42] shadow-xl p-3 z-50 ${isRtl ? 'left-0' : 'right-0'}`}>
              <div className="flex items-center justify-between pb-2 border-b border-[#F0ECE1] mb-2">
                <span className="font-bold text-xs text-white">{lang === 'ar' ? 'تنبيهات النظام اللحظية' : 'System Alerts'}</span>
                <span className="text-[10px] text-[#C9A24B] font-semibold">{lang === 'ar' ? '3 جديدة' : '3 New'}</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-xl bg-[#101726] border border-[#1F2C42]">
                  <span className="font-semibold text-rose-600 block text-[11px]">{lang === 'ar' ? 'تأخر رحلة #TR-458' : 'Trip #TR-458 Delayed'}</span>
                  <span className="text-[10px] text-[#8E9CAE] block">{lang === 'ar' ? 'تأخر 20 دقيقة على طريق الهجرة' : 'Delayed by 20m on Highway'}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#101726] border border-[#1F2C42]">
                  <span className="font-semibold text-[#C9A24B] block text-[11px]">{lang === 'ar' ? 'استفسار جديد من معتمر VIP' : 'New VIP Pilgrim Inquiry'}</span>
                  <span className="text-[10px] text-[#8E9CAE] block">{lang === 'ar' ? 'أحمد القحطاني • مطار جدة' : 'Ahmed Al-Qahtani • JED Airport'}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#101726] border border-[#1F2C42]">
                  <span className="font-semibold text-[#1B6349] block text-[11px]">{lang === 'ar' ? 'وصول الرحلة #TR-452' : 'Trip #TR-452 Completed'}</span>
                  <span className="text-[10px] text-[#8E9CAE] block">{lang === 'ar' ? 'تم الوصول إلى فندق برج الساعة' : 'Arrived at Clock Tower Hotel'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Language Switcher (AR / EN) with IBM Plex Sans Arabic */}
        <button
          onClick={onToggleLang}
          aria-label="Toggle language"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#101726] hover:bg-[#151D2C] border border-[#1F2C42] text-xs font-bold text-[#C9A24B] transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-[#C9A24B]" />
          <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
        </button>

        {/* View Public Live Site */}
        <Link
          href={`/${lang}`}
          target="_blank"
          title={lang === 'ar' ? 'معاينة الموقع الحي' : 'View Public Live Site'}
          className="p-2 rounded-xl bg-[#101726] hover:bg-[#151D2C] border border-[#1F2C42] text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-[#8E9CAE]" />
        </Link>

        {/* Admin Profile Pill (Matching Reference Image 1) */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#1F2C42] rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-2">
          <div className="w-8 h-8 rounded-full bg-[#173D35] text-[#F5F3EE] flex items-center justify-center font-bold text-xs shadow-xs">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="hidden xl:flex flex-col text-start">
            <span className="text-xs font-bold text-white leading-tight">
              {currentUser?.name || 'Sayed Saed'}
            </span>
            <span className="text-[10px] text-[#8E9CAE] leading-tight">
              {currentUser?.role === 'owner' ? (lang === 'ar' ? 'مدير النظام المعتمد' : 'System Manager') : currentUser?.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
