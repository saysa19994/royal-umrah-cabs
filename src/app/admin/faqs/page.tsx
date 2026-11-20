'use client';

import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Plus,
  Save,
  X,
  FileText,
  Eye,
  EyeOff,
  RefreshCw,
  Trash2,
  Flag,
} from 'lucide-react';
import { FaqItem, ContentStatus } from '@/types/content';
import { Locale, LOCALES, LOCALE_CONFIG } from '@/i18n/config';

const FEATURE_FLAGS_OPTIONS = [
  { key: '', label: 'None (Always active / Independent)' },
  { key: 'flight_tracking_enabled', label: 'Flight Radar Tracking' },
  { key: 'free_miqat_stop', label: 'Free Miqat Stop' },
  { key: 'complimentary_child_seat', label: 'Complimentary Child Seat' },
  { key: 'complimentary_water', label: 'Complimentary Cold Water' },
  { key: 'zamzam_water', label: 'Zamzam Water Provision' },
  { key: 'malay_speaking_chauffeur', label: 'Malay-Speaking Chauffeur' },
  { key: 'coaster_enabled', label: 'Toyota Coaster Fleet' },
];

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [editorLocale, setEditorLocale] = useState<Locale>('en');
  const [saving, setSaving] = useState(false);
  const [faqLoaded, setFaqLoaded] = useState(false);
  const [faqLoadError, setFaqLoadError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchFaqs = async (): Promise<FaqItem[] | null> => {
    setLoading(true);
    setFaqLoaded(false);
    setFaqLoadError(null);
    try {
      const res = await fetch('/api/admin/faqs', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data.success || !Array.isArray(data.faqs)) {
        throw new Error(typeof data.error === 'string' ? data.error : 'Invalid FAQ registry response');
      }
      setFaqs(data.faqs);
      setFaqLoaded(true);
      return data.faqs as FaqItem[];
    } catch (err) {
      console.error('Failed to load FAQs:', err);
      const message = err instanceof Error ? err.message : 'Network error';
      setFaqLoadError(message);
      setFeedback({type:'error',message:'Unable to read saved FAQ questions. Editing is disabled to prevent accidental overwrites.'});
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq || !faqLoaded || loading || saving) {
      setFeedback({type:'error',message:'Load the FAQ registry before editing or publishing.'});
      return;
    }

    // Check placeholder
    const raw = JSON.stringify(editingFaq);
    if (/\[needs owner confirmation\]/i.test(raw) && editingFaq.status === 'published') {
      setFeedback({
        type: 'error',
        message: 'Cannot publish FAQ with "[needs owner confirmation]". Remove placeholder or save as Draft / Needs Owner Confirmation.',
      });
      return;
    }

    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingFaq),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const current = await fetchFaqs();
        const saved = current?.find((item) => item.id === editingFaq.id);
        // Supabase JSONB is allowed to reorder keys; compare localized values,
        // not the serialization order of the translation object.
        const sameTranslations = (a: Record<string, string | undefined>, b: Record<string, string | undefined>) =>
          Object.keys({...a, ...b}).every(key => a[key] === b[key]);
        if (saved && sameTranslations(saved.question_translations, editingFaq.question_translations) &&
            sameTranslations(saved.answer_translations, editingFaq.answer_translations) &&
            saved.status === editingFaq.status) {
          setFeedback({type:'success',message:'FAQ saved and verified in the database. Check the public preview to verify cache refresh.'});
          setEditingFaq(null);
        } else {
          setFeedback({type:'error',message:'Save was accepted but the stored question could not be verified. Check the record before further changes.'});
        }
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to save FAQ' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error saving FAQ' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!faqLoaded || loading) {
      setFeedback({type:'error',message:'FAQ records must load before hiding questions.'});
      return;
    }
    if (!confirm('Hide this FAQ from the website? Its previous content will be retained for recovery.')) return;
    try {
      const res = await fetch(`/api/admin/faqs?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        const current = await fetchFaqs();
        if (current && !current.some(faq => faq.id === id)) {
          setFeedback({type:'success',message:'FAQ hidden and verified in the database.'});
        } else {
          setFeedback({type:'error',message:'Hide request completed but the updated registry was not verified.'});
        }
      } else {
        setFeedback({type:'error',message:data.error || 'Unable to hide FAQ'});
      }
    } catch (e) {
      console.error('Delete FAQ error:', e);
      setFeedback({type:'error',message:'Network error while hiding FAQ'});
    }
  };

  const handleCreateNew = () => {
    if (!faqLoaded || loading) {
      setFeedback({type:'error',message:'Load FAQ records before adding a new question.'});
      return;
    }
    const newFaq: FaqItem = {
      id: `faq-${Date.now()}`,
      category: 'general',
      question_translations: { en: '', ar: '' },
      answer_translations: { en: '', ar: '' },
      feature_flag_key: null,
      answer_flag_off_translations: { en: '', ar: '' },
      status: 'draft',
      sort_order: faqs.length + 1,
      is_operational: true,
      last_verified_date: 'October 2026',
      source: 'Duyuf Alrahman VIP Charter',
    };
    setEditingFaq(newFaq);
    setEditorLocale('en');
  };

  const filteredFaqs = faqs.filter((f) => {
    const qEn = f.question_translations?.en || '';
    const qAr = f.question_translations?.ar || '';
    const matchesSearch =
      !search ||
      qEn.toLowerCase().includes(search.toLowerCase()) ||
      qAr.includes(search) ||
      f.id.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || f.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="vip-internal-editorial space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#0A6364]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#92612D]">Database Source of Truth</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-[#193746]">
            FAQ Content &amp; Verification Editor
          </h1>
          <p className="text-sm text-[#697984] mt-0.5">
            10-locale translation management, gated feature flag linkage, and source citation governance.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleCreateNew}
            disabled={loading || !faqLoaded}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A6364] hover:bg-[#065059] text-[#FFFAF2] text-xs font-bold transition-colors shadow-lg shadow-[#D9A031]/10"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add FAQ</span>
          </button>
          <button
            onClick={fetchFaqs}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F7EBDB] border border-[#E3D3BD] text-xs font-semibold text-[#193746] hover:bg-[#F3E7D7] hover:border-[#C29B65]/40 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#92612D]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
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

      {faqLoadError && (
        <p role="alert" className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          Saved questions could not be loaded ({faqLoadError}). Editing remains disabled until Refresh succeeds.
        </p>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3 bg-[#FFF9F1] border border-[#E3D3BD] p-3 rounded-2xl">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#697984]" />
          <input
            type="text"
            placeholder="Search FAQs by question or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#F6ECE0] border border-[#E3D3BD] text-xs text-[#193746] focus:outline-none focus:border-[#C29B65]"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#F6ECE0] border border-[#E3D3BD] text-xs text-[#193746] focus:outline-none w-full md:w-auto"
        >
          <option value="all">All Categories</option>
          <option value="home">Home / General</option>
          <option value="booking">Booking</option>
          <option value="cancellation">Cancellation</option>
          <option value="vehicles">Fleet / Vehicles</option>
          <option value="routes">Routes / Miqat</option>
          <option value="ziyarat">Ziyarat</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#F6ECE0] border border-[#E3D3BD] text-xs text-[#193746] focus:outline-none w-full md:w-auto"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="needs_owner_confirmation">Needs Confirmation</option>
        </select>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const qEn = faq.question_translations?.en || 'Untitled Question';
          const aEn = faq.answer_translations?.en || '';
          const hasPlaceholder = /\[needs owner confirmation\]/i.test(JSON.stringify(faq));

          return (
            <div
              key={faq.id}
              className={`p-5 rounded-2xl border transition-all ${
                hasPlaceholder
                  ? 'bg-amber-950/20 border-amber-500/40'
                  : faq.status === 'published'
                  ? 'bg-[#FFF9F1] border-[#E3D3BD]'
                  : 'bg-[#FFF9F1]/60 border-[#E3D3BD]/60 opacity-75'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#F6ECE0] text-[#92612D]">
                      {faq.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        faq.status === 'published'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : faq.status === 'needs_owner_confirmation'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {faq.status.replace(/_/g, ' ')}
                    </span>
                    {faq.feature_flag_key && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/15 text-blue-300 flex items-center gap-1">
                        <Flag className="w-2.5 h-2.5" />
                        <span>Flag: {faq.feature_flag_key}</span>
                      </span>
                    )}
                    {hasPlaceholder && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-black">
                        Placeholder Detected
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-[#193746]">{qEn}</h3>
                  <p className="text-xs text-[#697984] line-clamp-2 leading-relaxed">{aEn}</p>

                  <div className="text-[11px] text-[#79838A]">
                    Source Citation: <span className="text-[#697984]">{faq.source || 'Standard Policy'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-start">
                  <button
                    onClick={() => {
                      setEditingFaq(faq);
                      setEditorLocale('en');
                    }}
                    className="p-2 rounded-xl bg-[#F7EBDB] hover:bg-[#F3E7D7] text-[#92612D] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="p-2 rounded-xl bg-red-950/30 hover:bg-red-950/60 text-red-400 text-xs transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFF9F1] border border-[#E3D3BD] max-w-2xl w-full rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E3D3BD] pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#193746]">Edit FAQ: {editingFaq.id}</h3>
                <span className="text-[11px] text-[#697984]">Edit localized variants and feature-flag gates</span>
              </div>
              <button onClick={() => setEditingFaq(null)} className="text-[#697984] hover:text-white">✕</button>
            </div>

            {/* Language tabs */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[#697984]">Active Language</span>
              <div className="flex flex-wrap items-center gap-1 bg-[#F6ECE0] p-1.5 rounded-xl border border-[#E3D3BD]">
                {LOCALES.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setEditorLocale(loc)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      editorLocale === loc
                        ? 'bg-[#0A6364] text-[#FFFAF2] font-bold'
                        : 'text-[#697984] hover:text-[#193746]'
                    }`}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#697984] mb-1">
                  Question ({editorLocale.toUpperCase()}) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingFaq.question_translations?.[editorLocale] || ''}
                  onChange={(e) =>
                    setEditingFaq({
                      ...editingFaq,
                      question_translations: {
                        ...editingFaq.question_translations,
                        [editorLocale]: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#F6ECE0] border border-[#E3D3BD] text-xs text-[#193746] focus:outline-none focus:border-[#C29B65]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#697984] mb-1">
                  Answer When Flag is ON / Default ({editorLocale.toUpperCase()}) <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingFaq.answer_translations?.[editorLocale] || ''}
                  onChange={(e) =>
                    setEditingFaq({
                      ...editingFaq,
                      answer_translations: {
                        ...editingFaq.answer_translations,
                        [editorLocale]: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#F6ECE0] border border-[#E3D3BD] text-xs text-[#193746] focus:outline-none focus:border-[#C29B65]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-[#E3D3BD] pt-3">
                <div>
                  <label className="block text-xs font-semibold text-[#697984] mb-1">Linked Feature Flag</label>
                  <select
                    value={editingFaq.feature_flag_key || ''}
                    onChange={(e) =>
                      setEditingFaq({
                        ...editingFaq,
                        feature_flag_key: e.target.value || null,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#F6ECE0] border border-[#E3D3BD] text-xs text-[#193746] focus:outline-none"
                  >
                    {FEATURE_FLAGS_OPTIONS.map((opt) => (
                      <option key={opt.key} value={opt.key}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#697984] mb-1">Status</label>
                  <select
                    value={editingFaq.status}
                    onChange={(e: any) =>
                      setEditingFaq({
                        ...editingFaq,
                        status: e.target.value as ContentStatus,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#F6ECE0] border border-[#E3D3BD] text-xs text-[#193746] focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="needs_owner_confirmation">Needs Owner Confirmation</option>
                  </select>
                </div>
              </div>

              {editingFaq.feature_flag_key && (
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Neutral Answer When Feature Flag is OFF ({editorLocale.toUpperCase()})
                  </label>
                  <textarea
                    rows={2}
                    value={editingFaq.answer_flag_off_translations?.[editorLocale] || ''}
                    onChange={(e) =>
                      setEditingFaq({
                        ...editingFaq,
                        answer_flag_off_translations: {
                          ...(editingFaq.answer_flag_off_translations || {}),
                          [editorLocale]: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. Available upon request. Our team confirms availability and terms via WhatsApp before booking confirmation."
                    className="w-full px-3 py-2 rounded-xl bg-[#F6ECE0] border border-[#E3D3BD] text-xs text-[#193746] focus:outline-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#697984] mb-1">Source Citation</label>
                  <input
                    type="text"
                    value={editingFaq.source || ''}
                    onChange={(e) => setEditingFaq({ ...editingFaq, source: e.target.value })}
                    placeholder="e.g. Duyuf Alrahman VIP Charter"
                    className="w-full px-3 py-2 rounded-xl bg-[#F6ECE0] border border-[#E3D3BD] text-xs text-[#193746] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#697984] mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={editingFaq.sort_order}
                    onChange={(e) => setEditingFaq({ ...editingFaq, sort_order: Number(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F6ECE0] border border-[#E3D3BD] text-xs text-[#193746] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[#E3D3BD]">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 rounded-xl bg-[#F7EBDB] text-xs font-semibold text-[#193746]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || loading || !faqLoaded}
                  className="px-5 py-2 rounded-xl bg-[#0A6364] text-xs font-bold text-[#FFFAF2]"
                >
                  {saving ? 'Saving...' : 'Save & Revalidate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
