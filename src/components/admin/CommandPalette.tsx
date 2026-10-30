'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  LayoutDashboard,
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
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  lang: 'en' | 'ar';
}

interface CommandItem {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function CommandPalette({ open, onClose, lang }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const items: CommandItem[] = [
    {
      id: 'dashboard',
      titleEn: 'Operations Control Center',
      titleAr: 'مركز العمليات المباشر',
      categoryEn: 'Operations',
      categoryAr: 'العمليات',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      id: 'bookings',
      titleEn: 'VIP Bookings & Dispatch',
      titleAr: 'جدول الحجوزات وتوزيع السائقين',
      categoryEn: 'Operations',
      categoryAr: 'العمليات',
      href: '/admin/bookings',
      icon: CalendarCheck,
    },
    {
      id: 'leads',
      titleEn: 'Pilgrim Inquiries & Leads',
      titleAr: 'استفسارات المعتمرين والمتابعة',
      categoryEn: 'Operations',
      categoryAr: 'العمليات',
      href: '/admin/leads',
      icon: Users,
    },
    {
      id: 'fleet',
      titleEn: 'VIP Fleet Control (Camry, Staria, Yukon, HiAce, Coaster)',
      titleAr: 'إدارة أسطول VIP والسيارات',
      categoryEn: 'Fleet & Assets',
      categoryAr: 'الأسطول والوسائط',
      href: '/admin/fleet',
      icon: Car,
    },
    {
      id: 'drivers',
      titleEn: 'Chauffeurs & Drivers Directory',
      titleAr: 'دليل السائقين والمرافقين',
      categoryEn: 'Fleet & Assets',
      categoryAr: 'الأسطول والوسائط',
      href: '/admin/drivers',
      icon: UserCheck,
    },
    {
      id: 'media',
      titleEn: 'Media Asset Vault & Vehicle Photography',
      titleAr: 'مكتبة وسائط الأسطول والصور',
      categoryEn: 'Fleet & Assets',
      categoryAr: 'الأسطول والوسائط',
      href: '/admin/media',
      icon: ImageIcon,
    },
    {
      id: 'routes',
      titleEn: 'Routes & Travel Corridors (Jeddah, Makkah, Madinah, Taif, Riyadh)',
      titleAr: 'المسارات الإقليمية والمواقيت',
      categoryEn: 'Routes & Tariffs',
      categoryAr: 'المسارات والتسعير',
      href: '/admin/routes',
      icon: Compass,
    },
    {
      id: 'pricing',
      titleEn: 'Pricing Matrix & Seasonal Rates',
      titleAr: 'مصفوفة الأسعار والمواسم',
      categoryEn: 'Routes & Tariffs',
      categoryAr: 'المسارات والتسعير',
      href: '/admin/pricing',
      icon: DollarSign,
    },
    {
      id: 'cms',
      titleEn: '10-Locale Website Content Studio',
      titleAr: 'استوديو نصوص ومحتوى الموقع (10 لغات)',
      categoryEn: 'Content & Reputation',
      categoryAr: 'المحتوى والسمعة',
      href: '/admin/cms',
      icon: Globe,
    },
    {
      id: 'faqs',
      titleEn: 'FAQ Knowledgebase & Booking Policies',
      titleAr: 'الأسئلة الشائعة وسياسات الحجز',
      categoryEn: 'Content & Reputation',
      categoryAr: 'المحتوى والسمعة',
      href: '/admin/faqs',
      icon: HelpCircle,
    },
    {
      id: 'reviews',
      titleEn: 'Reviews Moderation & Verification',
      titleAr: 'مراجعة واعتماد تقييمات المعتمرين',
      categoryEn: 'Content & Reputation',
      categoryAr: 'المحتوى والسمعة',
      href: '/admin/reviews',
      icon: Star,
    },
    {
      id: 'whatsapp',
      titleEn: 'WhatsApp Line Dispatch & Fallback',
      titleAr: 'توجيه خطوط الواتساب الرئيسية والاحتياطية',
      categoryEn: 'Channels & Governance',
      categoryAr: 'القنوات والحوكمة',
      href: '/admin/whatsapp',
      icon: MessageSquare,
    },
    {
      id: 'chat',
      titleEn: 'AI Rafeeq Knowledgebot Tuning',
      titleAr: 'المساعد الذكي رفيق',
      categoryEn: 'Channels & Governance',
      categoryAr: 'القنوات والحوكمة',
      href: '/admin/chat',
      icon: Bot,
    },
    {
      id: 'settings',
      titleEn: 'Global VIP Settings (Cash Policy & Buffers)',
      titleAr: 'الإعدادات العامة وسياسة الدفع',
      categoryEn: 'Channels & Governance',
      categoryAr: 'القنوات والحوكمة',
      href: '/admin/settings',
      icon: Settings,
    },
    {
      id: 'account',
      titleEn: 'Owner Master Account & Security',
      titleAr: 'إدارة حساب المالك والمصادقة',
      categoryEn: 'Channels & Governance',
      categoryAr: 'القنوات والحوكمة',
      href: '/admin/account',
      icon: ShieldAlert,
    },
  ];

  const filtered = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.titleEn.toLowerCase().includes(q) ||
      item.titleAr.toLowerCase().includes(q) ||
      item.categoryEn.toLowerCase().includes(q) ||
      item.categoryAr.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [open]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex].href);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-[#101725] border border-[#1F2C42] shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* INPUT HEADER */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1F2C42] bg-[#090D15]">
          <Search className="w-5 h-5 text-[#D6A13A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              lang === 'ar'
                ? 'ابحث عن أي قسم، سيارة، تسعير، أو مسار... (أو اضغط Esc للإغلاق)'
                : 'Search any section, fleet, route, pricing, or setting... (or press Esc to close)'
            }
            className="flex-1 bg-transparent border-0 text-[#F4F1E9] text-sm placeholder:text-[#55637A] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#A5B0C2] hover:text-[#F4F1E9] hover:bg-[#141D2C] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* RESULTS LIST */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#A5B0C2]">
              {lang === 'ar' ? 'لا توجد نتائج مطابقة لبحثك' : 'No matching sections found'}
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#D6A13A]/20 to-[#D6A13A]/5 text-[#F4F1E9] border border-[#D6A13A]/40 shadow-sm'
                      : 'text-[#A5B0C2] hover:bg-[#141D2C] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-[#D6A13A]/20 text-[#D6A13A]' : 'bg-[#090D15] text-[#A5B0C2]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold truncate">
                        {lang === 'ar' ? item.titleAr : item.titleEn}
                      </span>
                      <span className="text-[10px] text-[#A5B0C2] uppercase tracking-wider">
                        {lang === 'ar' ? item.categoryAr : item.categoryEn}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#D6A13A] translate-x-1' : 'text-transparent'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="px-4 py-2 border-t border-[#1F2C42] bg-[#090D15] flex items-center justify-between text-[11px] text-[#A5B0C2]">
          <span className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-[#141D2C] text-[#F4F1E9] border border-[#1F2C42]">↑↓</kbd>
            <span>{lang === 'ar' ? 'للتنقل' : 'to navigate'}</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#141D2C] text-[#F4F1E9] border border-[#1F2C42]">↵</kbd>
            <span>{lang === 'ar' ? 'للاختيار' : 'to select'}</span>
          </span>
          <span className="font-mono text-[#D6A13A]">Duyuf Alrahman VIP</span>
        </div>
      </div>
    </div>
  );
}
