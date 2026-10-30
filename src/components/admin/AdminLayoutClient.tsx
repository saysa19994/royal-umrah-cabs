'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { CommandPalette } from './CommandPalette';
import { UserProfile } from '@/types/auth';

export interface AdminLayoutClientProps {
  currentUser?: UserProfile | null;
  children: React.ReactNode;
}

export function AdminLayoutClient({ currentUser, children }: AdminLayoutClientProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'ar'>('ar');

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedCollapsed = localStorage.getItem('vip_admin_sidebar_collapsed');
      if (savedCollapsed !== null) {
        setCollapsed(savedCollapsed === 'true');
      }
      const savedLang = localStorage.getItem('vip_admin_lang') as 'en' | 'ar';
      if (savedLang === 'en' || savedLang === 'ar') {
        setLang(savedLang);
      }
    } catch {}
  }, []);

  // Update document direction when lang changes
  useEffect(() => {
    try {
      const html = document.documentElement;
      if (lang === 'ar') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
      } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
      }
    } catch {}
  }, [lang]);

  // Global Ctrl+K / Cmd+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('vip_admin_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  const handleToggleLang = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'ar' : 'en';
      try {
        localStorage.setItem('vip_admin_lang', next);
      } catch {}
      return next;
    });
  };

  const isRtl = lang === 'ar';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#0B0F17] text-[#F3F4F6] flex flex-col selection:bg-[#C9A24B]/20 selection:text-[#E6C773] antialiased ${
        isRtl ? 'font-arabic' : 'font-sans'
      }`}
      style={{
        fontFamily: isRtl
          ? 'var(--font-ibm-plex-arabic), var(--font-cairo), sans-serif'
          : 'var(--font-inter), sans-serif',
      }}
    >
      {/* SIDEBAR NAVIGATION */}
      <AdminSidebar
        currentUser={currentUser}
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        lang={lang}
      />

      {/* MAIN VIEWPORT (OFFSET BY SIDEBAR WIDTH) */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          isRtl
            ? collapsed ? 'lg:pr-20' : 'lg:pr-72'
            : collapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        {/* COMPACT TOP BAR */}
        <AdminTopBar
          currentUser={currentUser}
          onOpenMobile={() => setMobileOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          lang={lang}
          onToggleLang={handleToggleLang}
        />

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 p-4 md:p-8 max-w-[1680px] w-full mx-auto">
          {children}
        </main>

        {/* LUXURY EDITORIAL ENTERPRISE FOOTER */}
        <footer className="border-t border-[#E3DFD5] py-4 px-6 md:px-8 bg-[#EFECE5] text-xs text-[#5C6B64] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#173D35] shadow-[0_0_8px_rgba(23,61,53,0.4)]" />
            <span className="font-semibold text-[#173D35]">
              {lang === 'ar'
                ? 'لوحة تحكم ضيوف الرحمن VIP • وصول آمن ومشفر'
                : 'Duyuf Alrahman VIP • Luxury Command Platform'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[12px] text-[#5C6B64]">
            <span>{lang === 'ar' ? 'قاعدة بيانات PostgreSQL مباشرة ومحدثة' : 'PostgreSQL Live Sync'}</span>
            <span>•</span>
            <span className="text-[#A97B27] font-semibold">{lang === 'ar' ? '10 لغات مفعلة' : '10 Locales Active'}</span>
          </div>
        </footer>
      </div>

      {/* QUICK SEARCH COMMAND PALETTE (CTRL+K) */}
      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        lang={lang}
      />
    </div>
  );
}
