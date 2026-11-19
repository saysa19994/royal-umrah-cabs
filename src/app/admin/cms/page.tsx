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
  { id: 'booking', title: 'Booking Request (/booking)' },
  { id: 'faq', title: 'FAQ (/faq)' },
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
  // Never publish an edit until the current persisted CMS records were loaded.
  // Otherwise a temporary API failure could turn an existing page into a blank overwrite.
  const [cmsLoaded, setCmsLoaded] = useState(false);
  const [cmsLoadError, setCmsLoadError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Active editor form state
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [h1, setH1] = useState('');
  const [contentJson, setContentJson] = useState('{}');

  // Navigate from the site-control hub directly to the correct page and language.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    const locale = params.get('locale');
    if (page && PAGES_LIST.some(item=>item.id===page)) setSelectedPage(page);
    if (locale && LOCALES.includes(locale as Locale)) setSelectedLocale(locale as Locale);
  }, []);

  const fetchCmsPages = async (): Promise<CmsPageRecord[] | null> => {
    setLoading(true);
    setCmsLoaded(false);
    setCmsLoadError(null);
    try {
      const res = await fetch('/api/admin/cms', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data.success || !Array.isArray(data.pages)) {
        throw new Error(typeof data.error === 'string' ? data.error : 'Invalid CMS response');
      }
      const savedPages = data.pages as CmsPageRecord[];
      setPages(savedPages);
      setCmsLoaded(true);
      return savedPages;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error';
      console.error('Failed to load CMS pages:', err);
      setCmsLoadError(message);
      setFeedback({ type: 'error', message: 'Could not load CMS records. Saving is disabled to protect existing content.' });
      return null;
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
    if (!cmsLoaded || loading) {
      setFeedback({ type: 'error', message: 'Load existing CMS records successfully before saving.' });
      return;
    }
    if (selectedPage === 'home') {
      setFeedback({ type:'error', message:'Use Homepage Text in the sidebar to publish homepage changes. The generic CMS home entry does not update the homepage.' });
      return;
    }
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
    if (!parsedBlocks || typeof parsedBlocks !== 'object' || Array.isArray(parsedBlocks)) {
      setFeedback({ type: 'error', message: 'Content Blocks must be a JSON object.' });
      setSaving(false);
      return;
    }

    try {
      const existing = pages.find(p => p.page_key === selectedPage && p.language === selectedLocale);
      const payload: CmsPageRecord & { expected_updated_at: string | null } = {
        page_key: selectedPage,
        language: selectedLocale,
        seo_title: seoTitle.trim(),
        seo_description: seoDescription.trim(),
        h1: h1.trim(),
        content_blocks: parsedBlocks,
        // Compare-and-swap: reject a save if another admin published new edits.
        expected_updated_at: existing?.updated_at ?? null,
      };

      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Read back the durable row before claiming success. This does not replace
        // staging browser acceptance of the public page and its cache.
        const storedPages = await fetchCmsPages();
        const saved = storedPages?.find(p => p.page_key === payload.page_key && p.language === payload.language);
        const storedBlocks = saved?.content_blocks;
        // JSONB normalizes object key order; canonicalize nested blocks so a
        // successful real save is not falsely reported as a failed read-back.
        const canonicalJson = (value: unknown): string => {
          const normalize = (entry: unknown): unknown => {
            if (Array.isArray(entry)) return entry.map(normalize);
            if (entry !== null && typeof entry === 'object') {
              return Object.fromEntries(Object.entries(entry as Record<string, unknown>)
                .sort(([a], [b]) => a.localeCompare(b)).map(([key, part]) => [key, normalize(part)]));
            }
            return entry;
          };
          return JSON.stringify(normalize(value));
        };
        const blocksMatch = storedBlocks && typeof storedBlocks === 'object' && !Array.isArray(storedBlocks) &&
          canonicalJson(storedBlocks) === canonicalJson(payload.content_blocks);
        if (!saved || saved.seo_title !== payload.seo_title ||
            saved.seo_description !== payload.seo_description || saved.h1 !== payload.h1 || !blocksMatch) {
          setFeedback({ type: 'error', message: 'Save was accepted, but database read-back did not match. Review the saved record before making more changes.' });
        } else {
          setFeedback({ type: 'success', message: ['about','services','contact','fleet','pricing','routes','ziyarat','booking','faq'].includes(selectedPage) ? 'Saved and verified in the CMS database. Check the public Preview page to confirm cache refresh.' : 'Saved to CMS as a draft. This page is not connected to the public template yet.' });
        }
      } else {
        setFeedback({ type: 'error', message: res.status === 409 ? (data.error || 'Someone else changed this page. Review the latest saved version before trying again.') : (data.error || 'Failed to save CMS content') });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: 'Network error saving CMS content' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="vip-internal-editorial space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#0A6364]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#92612D]">Content &amp; SEO Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-[#193746]">
            Page Content &amp; CMS
          </h1>
          <p className="text-sm text-[#697984] mt-0.5">
            SEO title, H1 and selected editorial copy are connected across published pages. Booking fares and cash policy remain protected. Use the dedicated homepage editor for homepage text.
          </p>
        </div>

        <button
          onClick={fetchCmsPages}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F7EBDB] border border-[#E4D4BE] text-xs font-semibold text-[#193746] hover:bg-[#F3E7D7] hover:border-[#C29B65]/40 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#92612D]' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-medium animate-in fade-in duration-200 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-500/40 text-emerald-700'
              : 'bg-red-50 border-red-500/40 text-red-700'
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
          <button onClick={() => setFeedback(null)} className="text-[#697984] hover:text-[#193746] transition-colors" aria-label="Dismiss message">
            ✕
          </button>
        </div>
      )}

      {cmsLoadError && (
        <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          CMS data could not be loaded ({cmsLoadError}). The form is locked until Refresh succeeds.
        </div>
      )}

      {/* Main Grid: Sidebar pages + Main Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Page Selector List */}
        <div className="space-y-2 lg:col-span-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#697984] px-1">Select Page</span>
          <div className="space-y-1 bg-[#FFF9F1] border border-[#E4D4BE] p-2 rounded-2xl">
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
                      ? 'bg-[#0A6364]/15 text-[#92612D] border border-[#C29B65]/30 font-bold'
                      : 'text-[#193746] hover:bg-[#F7EBDB] border border-transparent'
                  }`}
                >
                  <span className="truncate">{p.title}</span>
                  <span className="ms-2 shrink-0 text-[9px] font-medium text-[#697984]">
                    {['about','services','contact','fleet','pricing','routes','ziyarat','booking','faq'].includes(p.id)?'Live CMS':'Dedicated / planned'}
                  </span>
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
        <div className="lg:col-span-3 space-y-5 bg-[#FFF9F1] border border-[#E4D4BE] p-6 rounded-2xl">
          {/* Language Tabs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#697984]">Language Locale</span>
              <span className="text-[11px] text-[#92612D] font-mono">Editing: {LOCALE_CONFIG[selectedLocale].nativeName} ({selectedLocale})</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 bg-[#F6ECE0] p-1.5 rounded-xl border border-[#E4D4BE]">
              {LOCALES.map((loc) => {
                const isActive = selectedLocale === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocale(loc)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0A6364] text-[#FFFAF2] font-bold shadow-sm'
                        : 'text-[#697984] hover:text-[#193746] hover:bg-[#F7EBDB]'
                    }`}
                  >
                    {LOCALE_CONFIG[loc].nativeName} ({loc.toUpperCase()})
                  </button>
                );
              })}
            </div>
          </div>

          {selectedPage === 'home' && (
            <a href="/admin/home-copy" className="inline-flex rounded-lg bg-[#0a6262] px-4 py-2 text-xs font-bold text-white">
              Open the connected Homepage Text editor
            </a>
          )}
          {/* Form */}
          <form onSubmit={handleSave} className="space-y-4">
          {['about','services','contact','fleet','pricing','routes','ziyarat','booking','faq'].includes(selectedPage) && (
            <section className="rounded-xl border border-[#dfc4a2] bg-white p-4">
              <h3 className="text-sm font-bold text-[#193746]">Editable page text</h3>
              <p className="mt-1 text-xs text-[#697984]">Only saved non-empty fields override the site's original translation. Use the dedicated homepage editor for homepage copy.</p>
              <div className="mt-3 grid gap-3">
                {(selectedPage==='about'?[
                  ['title','Page title'],['subtitle','Opening paragraph'],
                  ['storyTitle','Story heading'],['storyP1','Story paragraph 1'],
                  ['storyP2','Story paragraph 2'],['value1Title','Value 1 heading'],
                  ['value1Desc','Value 1 description'],['value2Title','Value 2 heading'],
                  ['value2Desc','Value 2 description'],['value3Title','Value 3 heading'],
                  ['value3Desc','Value 3 description'],
                ]:selectedPage==='services'?[
                  ['title','Page heading'],['subtitle','Page opening description'],
                ]:selectedPage==='contact'?[
                  ['title','Contact heading'],['subtitle','Contact introductory text'],
                  ['formTitle','Contact form title'],
                ]:selectedPage==='booking'?[
                  ['badge','Booking page eyebrow (not booking price or payment terms)'],
                ]:selectedPage==='faq'?[
                  ['subtitle','FAQ introduction shown below the heading'],
                ]:[
                  ['subtitle','Page introduction (editable, not the payment policy)'],
                ]).map(([field,label])=>{
                  let current='';
                  try{
                    const parsed=JSON.parse(contentJson||'{}');
                    if(parsed && typeof parsed[field]==='string')current=parsed[field];
                  }catch{}
                  return <label key={field} className="text-xs font-semibold text-[#193746]">
                    {label}
                    <textarea rows={field.toLowerCase().includes('title')?2:3}
                      value={current} onChange={event=>{
                        try {
                          const previous=JSON.parse(contentJson||'{}');
                          setContentJson(JSON.stringify({...previous,[field]:event.target.value},null,2));
                        } catch {
                          setFeedback({type:'error',message:'Fix the JSON syntax below before editing fields'});
                        }
                      }} className="mt-1 w-full rounded-lg border border-[#d9c5a7] bg-[#fffdf8] p-3 text-sm font-normal text-[#193746]"/>
                  </label>;
                })}
              </div>
            </section>
          )}

            <div>
              <label className="block text-xs font-semibold text-[#697984] mb-1">
                SEO Page Title (Title Tag) <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="e.g. VIP Umrah Taxi & Chauffeur Services Jeddah to Makkah | Duyuf Alrahman VIP"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F6ECE0] border border-[#E4D4BE] text-xs text-[#193746] focus:outline-none focus:border-[#C29B65]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#697984] mb-1">
                SEO Meta Description <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={2}
                required
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Meta description for search engines and social cards..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#F6ECE0] border border-[#E4D4BE] text-xs text-[#193746] focus:outline-none focus:border-[#C29B65]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#697984] mb-1">
                Primary H1 Heading
              </label>
              <input
                type="text"
                value={h1}
                onChange={(e) => setH1(e.target.value)}
                placeholder="e.g. Premium VIP Chauffeur Transfer for Umrah Pilgrims"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F6ECE0] border border-[#E4D4BE] text-xs text-[#193746] focus:outline-none focus:border-[#C29B65]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#697984] mb-1">
                Content Blocks (JSON format for structured paragraphs, lists &amp; guides)
              </label>
              <textarea
                rows={6}
                value={contentJson}
                onChange={(e) => setContentJson(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F6ECE0] border border-[#E4D4BE] font-mono text-xs text-[#193746] focus:outline-none focus:border-[#C29B65]"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving || loading || !cmsLoaded || selectedPage === 'home'}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0A6364] hover:bg-[#065059] text-[#FFFAF2] font-bold text-xs transition-colors shadow-lg shadow-[#D9A031]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : selectedPage === 'home' ? 'Use Homepage Text editor' : ['riyadh','taif'].includes(selectedPage) ? 'Save CMS draft (not published)' : 'Save page content'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
