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
      titleAr: 'جدول الحجوزات والسائقين',
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
      categoryEn: 'Fleet & Pricing',
      categoryAr: 'الأسطول والتسعير',
      href: '/admin/fleet',
      icon: Car,
    },
    {
      id: 'pricing',
      titleEn: 'Pricing Matrix & Seasonal Multipliers',
      titleAr: 'مصفوفة التسعير والمواسم',
      categoryEn: 'Fleet & Pricing',
      categoryAr: 'الأسطول والتسعير',
      href: '/admin/pricing',
      icon: DollarSign,
    },
    {
      id: 'media',
      titleEn: 'Media Asset Vault & Vehicle Photos',
      titleAr: 'مكتبة وسائط الأسطول والصور',
      categoryEn: 'Fleet & Pricing',
      categoryAr: 'الأسطول والتسعير',
      href: '/admin/media',
      icon: ImageIcon,
    },
    {
      id: 'cms',
      titleEn: '10-Locale Content & SEO Manager',
      titleAr: 'إدارة نصوص الموقع والمحتوى (10 لغات)',
      categoryEn: 'Content & Reputation',
      categoryAr: 'المحتوى والسمعة',
      href: '/admin/cms',
      icon: Globe,
    },
    {
      id: 'faqs',
      titleEn: 'FAQ Knowledgebase & Policies',
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
      titleAr: 'توجيه خطوط واتساب الرئيسية والاحتياطية',
      categoryEn: 'Governance',
      categoryAr: 'الحوكمة',
      href: '/admin/whatsapp',
      icon: MessageSquare,
    },
    {
      id: 'chat',
      titleEn: 'AI Rafeeq Knowledgebot Tuning',
      titleAr: 'تخصيص مساعد الذكاء الاصطناعي رفيق',
      categoryEn: 'Governance',
      categoryAr: 'الحوكمة',
      href: '/admin/chat',
      icon: Bot,
    },
    {
      id: 'settings',
      titleEn: 'Global VIP Settings (Cash Policy & Buffers)',
      titleAr: 'الإعدادات العامة وسياسة الدفع',
      categoryEn: 'Governance',
      categoryAr: 'الحوكمة',
      href: '/admin/settings',
      icon: Settings,
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
        className="w-full max-w-2xl rounded-2xl bg-[#0C111C] border border-[#232F46] shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* INPUT HEADER */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1E283D] bg-[#0F1524]">
          <Search className="w-5 h-5 text-[#D4AF37] shrink-0" />
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
                ? 'ابحث عن أي قسم، سيارة، تسعير، أو إعداد... (أو اضغط Esc للإغلاق)'
                : 'Search any section, fleet, pricing, or setting... (or press Esc to close)'
            }
            className="flex-1 bg-transparent border-0 text-[#FAF9F6] text-sm placeholder:text-[#5E6D87] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#6C7B94] hover:text-[#FAF9F6] hover:bg-[#1A2234] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* RESULTS LIST */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#6C7B94]">
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
                      ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 text-[#FAF9F6] border border-[#D4AF37]/40 shadow-sm'
                      : 'text-[#9AA5B8] hover:bg-[#131A29] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-[#141A28] text-[#717F96]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold truncate">
                        {lang === 'ar' ? item.titleAr : item.titleEn}
                      </span>
                      <span className="text-[10px] text-[#6C7B94] uppercase tracking-wider">
                        {lang === 'ar' ? item.categoryAr : item.categoryEn}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#D4AF37] translate-x-1' : 'text-transparent'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* FOOTER */}
        <div className="px-4 py-2 border-t border-[#1E283D] bg-[#0A0E18] flex items-center justify-between text-[11px] text-[#6C7B94]">
          <span className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-[#161E30] text-[#9AA5B8] border border-[#27344D]">↑↓</kbd>
            <span>{lang === 'ar' ? 'للتنقل' : 'to navigate'}</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[#161E30] text-[#9AA5B8] border border-[#27344D]">↵</kbd>
            <span>{lang === 'ar' ? 'للاختيار' : 'to select'}</span>
          </span>
          <span className="font-mono text-[#D4AF37]">Duyuf Alrahman VIP</span>
        </div>
      </div>
    </div>
  );
}
