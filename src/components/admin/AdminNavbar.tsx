'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  HelpCircle,
  Bot,
  Star,
  FileText,
  Image as ImageIcon,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Layers,
  Sliders,
  Clock,
} from 'lucide-react';
import { UserProfile } from '@/types/auth';
import { createClient } from '@/lib/supabase/client';

export function AdminNavbar({ initialUser }: { initialUser?: UserProfile | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(initialUser || null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [makkahTime, setMakkahTime] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Live Makkah Time clock (GMT+3)
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

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {}
    router.push('/admin/login');
  };

  const isOperator = currentUser?.role === 'operator';
  const isOwner = currentUser?.role === 'owner';

  // Navigation Groups
  const coreItems = [
    { href: '/admin', label: 'Bookings', icon: LayoutDashboard },
    { href: '/admin/leads', label: 'Leads & Inquiries', icon: Users },
    { href: '/admin/pricing', label: 'Pricing & Seasons', icon: DollarSign, hideForOperator: true },
    { href: '/admin/fleet', label: 'Fleet Control', icon: Car, hideForOperator: true },
  ].filter((item) => !(isOperator && item.hideForOperator));

  const contentItems = [
    { href: '/admin/cms', label: 'Page Content & CMS', icon: FileText, desc: 'Manage localized headers, blocks & SEO' },
    { href: '/admin/media', label: 'Media Library', icon: ImageIcon, desc: 'Fleet gallery carousel & image assets' },
    { href: '/admin/faqs', label: 'FAQ Editor', icon: HelpCircle, desc: '10-locale Q&A and feature-flag rules' },
    { href: '/admin/reviews', label: 'Reviews Moderation', icon: Star, desc: 'Approve pilgrim testimonials' },
  ];

  const opsItems = [
    { href: '/admin/whatsapp', label: 'WhatsApp Routing', icon: MessageSquare, desc: 'Main (261) & Secondary (971) lines' },
    { href: '/admin/chat', label: 'AI Rafeeq Chatbot', icon: Bot, desc: 'Model prompts, grounding & intents' },
    { href: '/admin/audit-log', label: 'Security Audit Log', icon: History, desc: 'Immutable staff action audit trail' },
  ];

  const managementItems = [
    { href: '/admin/settings', label: 'Global Settings', icon: Settings, desc: 'Feature flags, pricing & buffer times' },
    { href: '/admin/users', label: 'Users & Staff', icon: UserCheck, desc: 'Staff directory & channel assignment' },
    { href: '/admin/roles', label: 'Roles Matrix', icon: Shield, desc: 'Granular resource RBAC permissions', ownerOnly: true },
    { href: '/admin/account', label: 'Owner Master Account', icon: ShieldCheck, desc: 'Root access & security credentials', ownerOnly: true },
  ].filter((item) => !(item.ownerOnly && !isOwner));

  const isContentActive = contentItems.some((i) => pathname === i.href);
  const isOpsActive = opsItems.some((i) => pathname === i.href);
  const isManagementActive = managementItems.some((i) => pathname === i.href);

  return (
    <header className="sticky top-0 z-50 bg-[#0C1017]/95 backdrop-blur-xl border-b border-[#202736] px-4 md:px-8 py-2.5 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* LOGO & BRAND */}
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D9A031]/30 to-[#8C6415]/20 border border-[#D9A031]/50 flex items-center justify-center p-1 overflow-hidden shadow-[0_0_12px_rgba(217,160,49,0.25)] group-hover:scale-105 transition-transform">
              <Image src="/icon-192.png" alt="Duyuf Alrahman VIP" width={24} height={24} className="rounded-md object-cover" />
            </span>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm sm:text-base tracking-wider text-[#FAF9F6] flex items-center gap-1.5 leading-tight">
                DUYUF ALRAHMAN <span className="text-[#D9A031] drop-shadow-[0_0_8px_rgba(217,160,49,0.3)]">VIP</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#7C879B]">
                Operations Command
              </span>
            </div>
          </Link>

          {/* DESKTOP CATEGORIZED NAVIGATION */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1 text-xs font-semibold">
            {/* Core Items */}
            {coreItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D9A031]/20 to-[#D9A031]/10 text-[#E5B842] border border-[#D9A031]/40 font-bold shadow-[0_0_12px_rgba(217,160,49,0.15)]'
                      : 'text-[#9DA6B8] hover:text-[#FAF9F6] hover:bg-[#161B26] border border-transparent'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {!isOperator && (
              <>
                {/* Content & Media Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'content' ? null : 'content')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      isContentActive
                        ? 'bg-gradient-to-r from-[#D9A031]/20 to-[#D9A031]/10 text-[#E5B842] border border-[#D9A031]/40 font-bold shadow-[0_0_12px_rgba(217,160,49,0.15)]'
                        : 'text-[#9DA6B8] hover:text-[#FAF9F6] hover:bg-[#161B26] border border-transparent'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Content &amp; Media</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'content' ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === 'content' && (
                    <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#121622] border border-[#232A3B] shadow-[0_12px_40px_rgba(0,0,0,0.7)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#6C7890]">
                        CMS &amp; Public Assets
                      </div>
                      {contentItems.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-start gap-2.5 p-2 rounded-xl transition-colors ${
                              isCurrent ? 'bg-[#D9A031]/15 text-[#E5B842]' : 'hover:bg-[#1A2130] text-[#D2D8E4]'
                            }`}
                          >
                            <span className="p-1.5 rounded-lg bg-[#19202E] border border-[#283246] text-[#D9A031] mt-0.5">
                              <Icon className="w-3.5 h-3.5" />
                            </span>
                            <div>
                              <div className="font-bold text-xs">{item.label}</div>
                              <div className="text-[10px] text-[#7C879B] font-light leading-snug">{item.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Operations & Channels Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'ops' ? null : 'ops')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      isOpsActive
                        ? 'bg-gradient-to-r from-[#D9A031]/20 to-[#D9A031]/10 text-[#E5B842] border border-[#D9A031]/40 font-bold shadow-[0_0_12px_rgba(217,160,49,0.15)]'
                        : 'text-[#9DA6B8] hover:text-[#FAF9F6] hover:bg-[#161B26] border border-transparent'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Channels &amp; AI</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'ops' ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === 'ops' && (
                    <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#121622] border border-[#232A3B] shadow-[0_12px_40px_rgba(0,0,0,0.7)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#6C7890]">
                        Dispatch &amp; Automation
                      </div>
                      {opsItems.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-start gap-2.5 p-2 rounded-xl transition-colors ${
                              isCurrent ? 'bg-[#D9A031]/15 text-[#E5B842]' : 'hover:bg-[#1A2130] text-[#D2D8E4]'
                            }`}
                          >
                            <span className="p-1.5 rounded-lg bg-[#19202E] border border-[#283246] text-[#D9A031] mt-0.5">
                              <Icon className="w-3.5 h-3.5" />
                            </span>
                            <div>
                              <div className="font-bold text-xs">{item.label}</div>
                              <div className="text-[10px] text-[#7C879B] font-light leading-snug">{item.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Management Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'mgmt' ? null : 'mgmt')}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      isManagementActive
                        ? 'bg-gradient-to-r from-[#D9A031]/20 to-[#D9A031]/10 text-[#E5B842] border border-[#D9A031]/40 font-bold shadow-[0_0_12px_rgba(217,160,49,0.15)]'
                        : 'text-[#9DA6B8] hover:text-[#FAF9F6] hover:bg-[#161B26] border border-transparent'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>System</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'mgmt' ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === 'mgmt' && (
                    <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-[#121622] border border-[#232A3B] shadow-[0_12px_40px_rgba(0,0,0,0.7)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-[#6C7890]">
                        Governance &amp; Staff Access
                      </div>
                      {managementItems.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-start gap-2.5 p-2 rounded-xl transition-colors ${
                              isCurrent ? 'bg-[#D9A031]/15 text-[#E5B842]' : 'hover:bg-[#1A2130] text-[#D2D8E4]'
                            }`}
                          >
                            <span className="p-1.5 rounded-lg bg-[#19202E] border border-[#283246] text-[#D9A031] mt-0.5">
                              <Icon className="w-3.5 h-3.5" />
                            </span>
                            <div>
                              <div className="font-bold text-xs">{item.label}</div>
                              <div className="text-[10px] text-[#7C879B] font-light leading-snug">{item.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </nav>
        </div>

        {/* RIGHT CONTROLS: MAKKAH CLOCK, USER PILL, PUBLIC SITE, LOGOUT */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Makkah Time Live Clock */}
          {makkahTime && (
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141924] border border-[#232A3B] text-[11px] font-mono text-[#D2D8E4]">
              <Clock className="w-3 h-3 text-[#D9A031]" />
              <span>{makkahTime}</span>
              <span className="text-[9px] text-[#7C879B] font-sans font-bold">AST</span>
            </div>
          )}

          {/* User Profile Pill */}
          {currentUser && (
            <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-xl bg-gradient-to-r from-[#141924] to-[#121622] border border-[#252E40] text-xs shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20 animate-pulse" />
              <span className="text-[#FAF9F6] font-semibold text-xs">{currentUser.name.split(' ')[0]}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                currentUser.role === 'owner'
                  ? 'bg-[#D9A031]/20 text-[#E5B842] border border-[#D9A031]/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {currentUser.role}
              </span>
            </div>
          )}

          {/* Public Site Link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#9DA6B8] hover:text-[#FAF9F6] transition-colors px-2.5 py-1 rounded-lg hover:bg-[#161B26] border border-transparent hover:border-[#232A3B]"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3 text-[#D9A031]" />
          </a>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Log out from Operations"
            className="flex items-center gap-1 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-[#161B26] border border-[#232A3B] text-[#D2D8E4] hover:text-[#FAF9F6]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-[#232A3B] space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#6C7890]">
              Operations
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {coreItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold ${
                      isActive ? 'bg-[#D9A031]/20 text-[#E5B842] border border-[#D9A031]/40' : 'bg-[#121622] text-[#D2D8E4]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#D9A031]" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {!isOperator && (
            <>
              <div>
                <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#6C7890]">
                  Content &amp; Assets
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {contentItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold ${
                          isActive ? 'bg-[#D9A031]/20 text-[#E5B842] border border-[#D9A031]/40' : 'bg-[#121622] text-[#D2D8E4]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-[#D9A031]" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#6C7890]">
                  Governance &amp; Automation
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[...opsItems, ...managementItems].map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold ${
                          isActive ? 'bg-[#D9A031]/20 text-[#E5B842] border border-[#D9A031]/40' : 'bg-[#121622] text-[#D2D8E4]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 text-[#D9A031]" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <div className="pt-2 border-t border-[#232A3B] flex items-center justify-between text-xs text-[#9DA6B8]">
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#E5B842]">
              <span>Visit Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            {makkahTime && <span>{makkahTime} Makkah</span>}
          </div>
        </div>
      )}
    </header>
  );
}
