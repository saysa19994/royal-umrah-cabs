'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bell, CalendarDays, ExternalLink, Globe2, Menu, Search, ShieldCheck } from 'lucide-react';
import { UserProfile } from '@/types/auth';

export interface AdminTopBarProps {
  currentUser?: UserProfile | null;
  onOpenMobile: () => void;
  onOpenSearch: () => void;
  lang: 'en' | 'ar';
  onToggleLang: () => void;
}

export function AdminTopBar({
  currentUser, onOpenMobile, onOpenSearch, lang, onToggleLang,
}: AdminTopBarProps) {
  const [date, setDate] = useState('');

  useEffect(() => {
    const refresh = () => setDate(new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA' : 'en-GB', {
      timeZone: 'Asia/Riyadh', weekday: 'short', day: 'numeric',
      month: 'short', year: 'numeric',
    }).format(new Date()));
    refresh();
    const id = window.setInterval(refresh, 60000);
    return () => window.clearInterval(id);
  }, [lang]);

  return <header className="vip-admin-topbar sticky top-0 z-30 flex min-h-[67px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
    <div className="flex min-w-0 items-center gap-3">
      <button type="button" aria-label={lang === 'ar' ? 'افتح القائمة' : 'Open menu'}
        onClick={onOpenMobile} className="rounded-xl border border-[#d7ba89]/30 p-2.5 text-[#f5dfb2] lg:hidden">
        <Menu className="h-5 w-5"/>
      </button>
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#d2b17e]/30 bg-[#174452] text-[#e9c892] sm:flex">
          <ShieldCheck className="h-5 w-5"/>
        </span>
        <div className="min-w-0">
          <strong className="block truncate text-[12px] text-[#faf2e6] sm:text-sm">
            {lang === 'ar' ? 'منصة ضيوف الرحمن لإدارة العمليات' : 'Duyuf Al Rahman • Operations Portal'}
          </strong>
          <span className="hidden text-[11px] text-[#9db5bd] sm:block">
            {lang === 'ar' ? 'الحجوزات • الأسطول • متابعة الرحلات' : 'Bookings • Fleet • Dispatch'}
          </span>
        </div>
      </div>
    </div>

    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
      <div className="hidden items-center gap-2 rounded-xl border border-[#c49f6d]/25 bg-[#112e40] px-3 py-2 text-[11px] text-[#e6d6bc] lg:flex">
        <CalendarDays className="h-4 w-4 text-[#dbb879]"/>
        <span>{date || '—'}</span>
      </div>
      <button type="button" onClick={onOpenSearch} aria-label={lang === 'ar' ? 'بحث سريع' : 'Quick search'}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#c49f6d]/30 bg-[#112e40] text-[#e9d0a6] hover:bg-[#17475b]">
        <Search className="h-[18px] w-[18px]"/>
      </button>
      <Link href="/admin/leads" aria-label={lang === 'ar' ? 'الاستفسارات' : 'Inquiries'}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#c49f6d]/30 bg-[#112e40] text-[#e9d0a6] hover:bg-[#17475b]">
        <Bell className="h-[18px] w-[18px]"/>
      </Link>
      <button type="button" onClick={onToggleLang} aria-label="Change dashboard language"
        className="flex h-9 items-center gap-1 rounded-xl border border-[#c49f6d]/30 bg-[#112e40] px-2.5 text-xs font-bold text-[#e9d0a6] hover:bg-[#17475b]">
        <Globe2 className="h-4 w-4"/>{lang === 'ar' ? 'EN' : 'ع'}
      </button>
      <Link href={`/${lang}`} target="_blank" rel="noopener noreferrer"
        title={lang === 'ar' ? 'الموقع العام' : 'Public site'} aria-label="Public website"
        className="hidden h-9 w-9 items-center justify-center rounded-xl border border-[#c49f6d]/30 bg-[#112e40] text-[#e9d0a6] hover:bg-[#17475b] sm:flex">
        <ExternalLink className="h-[17px] w-[17px]"/>
      </Link>
      <div className="flex items-center gap-2 rounded-full border border-[#c49f6d]/35 bg-[#112e40] p-1.5 pe-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c7a06a] text-xs font-extrabold text-[#0d3040]">
          {currentUser?.name?.charAt(0)?.toUpperCase() || 'A'}
        </span>
        <span className="hidden max-w-[135px] truncate text-xs font-bold text-[#f4ecdf] xl:inline">
          {currentUser?.name || (lang === 'ar' ? 'الإدارة' : 'Admin')}
        </span>
      </div>
    </div>
  </header>;
}
