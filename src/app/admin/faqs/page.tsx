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
  { key: 'online_card_payment_enabled', label: 'Online Card Gateway' },
  { key: 'bank_transfer_payment_enabled', label: 'Saudi Bank Transfer' },
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
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchFaqs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/faqs');
      const data = await res.json();
      if (data.success && data.faqs) {
        setFaqs(data.faqs);
      }
    } catch (err) {
      console.error('Failed to load FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

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
        setFeedback({ type: 'success', message: 'FAQ successfully saved & revalidated live!' });
        fetchFaqs();
        setTimeout(() => {
          setEditingFaq(null);
          setFeedback(null);
        }, 1200);
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
    if (!confirm('Are you sure you want to permanently delete this FAQ?')) return;
    try {
      const res = await fetch(`/api/admin/faqs?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchFaqs();
      }
    } catch (e) {
      console.error('Delete FAQ error:', e);
    }
  };

  const handleCreateNew = () => {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D9A031]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A031]">Database Source of Truth</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-[#FAF9F6]">
            FAQ Content &amp; Verification Editor
          </h1>
          <p className="text-sm text-[#A0A6B2] mt-0.5">
            10-locale translation management, gated feature flag linkage, and source citation governance.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D9A031] hover:bg-[#B88422] text-[#0D0F12] text-xs font-bold transition-colors shadow-lg shadow-[#D9A031]/10"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add FAQ</span>
          </button>
          <button
            onClick={fetchFaqs}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1F26] border border-[#232A3B] text-xs font-semibold text-[#FAF9F6] hover:bg-[#20252D] hover:border-[#D9A031]/40 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#D9A031]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
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

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3 bg-[#121622] border border-[#232A3B] p-3 rounded-2xl">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A0A6B2]" />
          <input
            type="text"
            placeholder="Search FAQs by question or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none w-full md:w-auto"
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
          className="px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none w-full md:w-auto"
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
                  ? 'bg-[#121622] border-[#232A3B]'
                  : 'bg-[#121622]/60 border-[#232A3B]/60 opacity-75'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#0D0F12] text-[#D9A031]">
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

                  <h3 className="font-bold text-sm text-[#FAF9F6]">{qEn}</h3>
                  <p className="text-xs text-[#A0A6B2] line-clamp-2 leading-relaxed">{aEn}</p>

                  <div className="text-[11px] text-[#6C7584]">
                    Source Citation: <span className="text-[#A0A6B2]">{faq.source || 'Standard Policy'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-start">
                  <button
                    onClick={() => {
                      setEditingFaq(faq);
                      setEditorLocale('en');
                    }}
                    className="p-2 rounded-xl bg-[#1A1F26] hover:bg-[#20252D] text-[#D9A031] text-xs font-semibold flex items-center gap-1.5 transition-colors"
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
          <div className="bg-[#121622] border border-[#232A3B] max-w-2xl w-full rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#232A3B] pb-3">
              <div>
                <h3 className="font-bold text-sm text-[#FAF9F6]">Edit FAQ: {editingFaq.id}</h3>
                <span className="text-[11px] text-[#A0A6B2]">Edit localized variants and feature-flag gates</span>
              </div>
              <button onClick={() => setEditingFaq(null)} className="text-[#A0A6B2] hover:text-white">✕</button>
            </div>

            {/* Language tabs */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[#A0A6B2]">Active Language</span>
              <div className="flex flex-wrap items-center gap-1 bg-[#0D0F12] p-1.5 rounded-xl border border-[#232A3B]">
                {LOCALES.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setEditorLocale(loc)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      editorLocale === loc
                        ? 'bg-[#D9A031] text-[#0D0F12] font-bold'
                        : 'text-[#A0A6B2] hover:text-[#FAF9F6]'
                    }`}
                  >
                    {loc.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
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
                  className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
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
                  className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-[#232A3B] pt-3">
                <div>
                  <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Linked Feature Flag</label>
                  <select
                    value={editingFaq.feature_flag_key || ''}
                    onChange={(e) =>
                      setEditingFaq({
                        ...editingFaq,
                        feature_flag_key: e.target.value || null,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none"
                  >
                    {FEATURE_FLAGS_OPTIONS.map((opt) => (
                      <option key={opt.key} value={opt.key}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Status</label>
                  <select
                    value={editingFaq.status}
                    onChange={(e: any) =>
                      setEditingFaq({
                        ...editingFaq,
                        status: e.target.value as ContentStatus,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none"
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
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Source Citation</label>
                  <input
                    type="text"
                    value={editingFaq.source || ''}
                    onChange={(e) => setEditingFaq({ ...editingFaq, source: e.target.value })}
                    placeholder="e.g. Duyuf Alrahman VIP Charter"
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={editingFaq.sort_order}
                    onChange={(e) => setEditingFaq({ ...editingFaq, sort_order: Number(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[#232A3B]">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 rounded-xl bg-[#1A1F26] text-xs font-semibold text-[#FAF9F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#D9A031] text-xs font-bold text-[#0D0F12]"
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
