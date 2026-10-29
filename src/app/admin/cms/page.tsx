'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Globe,
  Search,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Locale, LOCALES, LOCALE_CONFIG } from '@/i18n/config';
import { CmsPageRecord } from '@/types/content';

const PAGES_LIST = [
  { id: 'home', title: 'Homepage (/)' },
  { id: 'about', title: 'About Us (/about)' },
  { id: 'fleet', title: 'Fleet Showcase (/fleet)' },
  { id: 'pricing', title: 'Pricing & Calculator (/pricing)' },
  { id: 'routes', title: 'VIP Routes (/routes)' },
  { id: 'services', title: 'Chauffeur Services (/services)' },
  { id: 'contact', title: 'Contact & Dispatch (/contact)' },
  { id: 'riyadh', title: 'Riyadh Hub (/riyadh)' },
  { id: 'taif', title: 'Taif Hub (/taif)' },
  { id: 'ziyarat', title: 'Holy Ziyarat Tours (/ziyarat)' },
];

export default function AdminCmsPage() {
  const [selectedPage, setSelectedPage] = useState<string>('home');
  const [selectedLocale, setSelectedLocale] = useState<Locale>('en');
  const [pages, setPages] = useState<CmsPageRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Active editor form state
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [h1, setH1] = useState('');
  const [contentJson, setContentJson] = useState('{}');

  const fetchCmsPages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/cms');
      const data = await res.json();
      if (data.success && data.pages) {
        setPages(data.pages);
      }
    } catch (err) {
      console.error('Failed to load CMS pages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCmsPages();
  }, []);

  // Sync editor fields whenever selectedPage or selectedLocale changes
  useEffect(() => {
    const existing = pages.find((p) => p.page_key === selectedPage && p.language === selectedLocale);
    if (existing) {
      setSeoTitle(existing.seo_title || '');
      setSeoDescription(existing.seo_description || '');
      setH1(existing.h1 || '');
      setContentJson(JSON.stringify(existing.content_blocks || {}, null, 2));
    } else {
      setSeoTitle('');
      setSeoDescription('');
      setH1('');
      setContentJson('{}');
    }
  }, [selectedPage, selectedLocale, pages]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    let parsedBlocks = {};
    try {
      parsedBlocks = JSON.parse(contentJson || '{}');
    } catch {
      setFeedback({ type: 'error', message: 'Invalid JSON syntax in Content Blocks' });
      setSaving(false);
      return;
    }

    try {
      const payload: CmsPageRecord = {
        page_key: selectedPage,
        language: selectedLocale,
        seo_title: seoTitle.trim(),
        seo_description: seoDescription.trim(),
        h1: h1.trim(),
        content_blocks: parsedBlocks,
      };

      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({ type: 'success', message: 'CMS Page content successfully saved and revalidated!' });
        fetchCmsPages();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to save CMS content' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Network error saving CMS content' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D9A031]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A031]">Content &amp; SEO Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-[#FAF9F6]">
            Page Content &amp; CMS
          </h1>
          <p className="text-sm text-[#A0A6B2] mt-0.5">
            Manage meta tags, headings, guides, and localized copy across all 10 supported languages.
          </p>
        </div>

        <button
          onClick={fetchCmsPages}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1F26] border border-[#262B33] text-xs font-semibold text-[#FAF9F6] hover:bg-[#20252D] hover:border-[#D9A031]/40 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#D9A031]' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-medium animate-in fade-in duration-200 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/40 border-red-500/40 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-white/60 hover:text-white transition-colors">
            ✕
          </button>
        </div>
      )}

      {/* Main Grid: Sidebar pages + Main Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Page Selector List */}
        <div className="space-y-2 lg:col-span-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A0A6B2] px-1">Select Page</span>
          <div className="space-y-1 bg-[#14171C] border border-[#262B33] p-2 rounded-2xl">
            {PAGES_LIST.map((p) => {
              const isSelected = selectedPage === p.id;
              const hasEn = pages.some((page) => page.page_key === p.id && page.language === 'en');
              const hasAr = pages.some((page) => page.page_key === p.id && page.language === 'ar');

              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPage(p.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-[#D9A031]/15 text-[#D9A031] border border-[#D9A031]/30 font-bold'
                      : 'text-[#FAF9F6] hover:bg-[#1A1F26] border border-transparent'
                  }`}
                >
                  <span className="truncate">{p.title}</span>
                  <div className="flex items-center gap-1">
                    {hasEn && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" title="English Ready" />}
                    {hasAr && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Arabic Ready" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Editor Panel */}
        <div className="lg:col-span-3 space-y-5 bg-[#14171C] border border-[#262B33] p-6 rounded-2xl">
          {/* Language Tabs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A0A6B2]">Language Locale</span>
              <span className="text-[11px] text-[#D9A031] font-mono">Editing: {LOCALE_CONFIG[selectedLocale].nativeName} ({selectedLocale})</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 bg-[#0D0F12] p-1.5 rounded-xl border border-[#262B33]">
              {LOCALES.map((loc) => {
                const isActive = selectedLocale === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocale(loc)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#D9A031] text-[#0D0F12] font-bold shadow-sm'
                        : 'text-[#A0A6B2] hover:text-[#FAF9F6] hover:bg-[#1A1F26]'
                    }`}
                  >
                    {LOCALE_CONFIG[loc].nativeName} ({loc.toUpperCase()})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                SEO Page Title (Title Tag) <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="e.g. VIP Umrah Taxi & Chauffeur Services Jeddah to Makkah | Duyuf Alrahman VIP"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                SEO Meta Description <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={2}
                required
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Meta description for search engines and social cards..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                Primary H1 Heading
              </label>
              <input
                type="text"
                value={h1}
                onChange={(e) => setH1(e.target.value)}
                placeholder="e.g. Premium VIP Chauffeur Transfer for Umrah Pilgrims"
                className="w-full px-4 py-2.5 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                Content Blocks (JSON format for structured paragraphs, lists &amp; guides)
              </label>
              <textarea
                rows={6}
                value={contentJson}
                onChange={(e) => setContentJson(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0D0F12] border border-[#262B33] font-mono text-xs text-amber-200/90 focus:outline-none focus:border-[#D9A031]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D9A031] hover:bg-[#B88422] text-[#0D0F12] font-bold text-xs transition-colors shadow-lg shadow-[#D9A031]/10"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save & Publish to Database'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
