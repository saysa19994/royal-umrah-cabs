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
} from 'lucide-react';

interface FaqItem {
  id: string;
  category: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  isOperational: boolean;
  needsOwnerConfirmation: boolean;
  status: 'published' | 'draft';
  lastVerifiedDate: string;
  source: string;
}

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

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
        setFeedback({ type: 'success', message: '✓ تم حفظ السؤال والإجابة بنجاح!' });
        setFaqs((prev) =>
          prev.map((f) => (f.id === editingFaq.id ? editingFaq : f))
        );
        setTimeout(() => {
          setEditingFaq(null);
          setFeedback(null);
        }, 1200);
      } else {
        setFeedback({ type: 'error', message: data.error || 'فشل في حفظ التعديل' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'خطأ أثناء الاتصال بالخادم' });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (item: FaqItem) => {
    const nextStatus: 'published' | 'draft' = item.status === 'published' ? 'draft' : 'published';
    const updated: FaqItem = { ...item, status: nextStatus };
    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setFaqs((prev) => prev.map((f) => (f.id === item.id ? updated : f)));
      }
    } catch (err) {
      console.error('Error toggling status:', err);
    }
  };

  const handleToggleConfirmation = async (item: FaqItem) => {
    const updated = { ...item, needsOwnerConfirmation: !item.needsOwnerConfirmation };
    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setFaqs((prev) => prev.map((f) => (f.id === item.id ? updated : f)));
      }
    } catch (err) {
      console.error('Error toggling confirmation:', err);
    }
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.questionEn.toLowerCase().includes(search.toLowerCase()) ||
      f.questionAr.includes(search) ||
      f.answerEn.toLowerCase().includes(search.toLowerCase()) ||
      f.answerAr.includes(search);
    const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#262B33]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="w-5 h-5 text-[#D9A031]" />
            <h1 className="text-xl font-bold text-[#FAF9F6]">إدارة وتدقيق الأسئلة الشائعة (FAQ CMS)</h1>
          </div>
          <p className="text-xs text-[#A0A6B2]">
            تعديل وتدقيق الأسئلة والأجوبة التشغيلية لجميع صفحات الموقع (الرئيسية، المسارات، الحجز، والمزارات).
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setEditingFaq({
              id: `faq-custom-${Date.now()}`,
              category: 'general',
              questionEn: '',
              questionAr: '',
              answerEn: '',
              answerAr: '',
              isOperational: true,
              needsOwnerConfirmation: true,
              status: 'published',
              lastVerifiedDate: 'October 2026',
              source: 'Admin Created',
            })
          }
          className="h-9 px-4 rounded-xl bg-[#D9A031] text-[#0D0F12] text-xs font-bold hover:bg-[#E5B24E] transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة سؤال جديد</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="بحث في الأسئلة أو الأجوبة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-[#13171F] border border-[#262B33] text-xs text-[#FAF9F6] focus:border-[#D9A031] outline-none"
          />
          <Search className="w-4 h-4 text-[#6C7584] absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 px-3 rounded-xl bg-[#13171F] border border-[#262B33] text-xs text-[#FAF9F6] focus:border-[#D9A031] outline-none"
        >
          <option value="all">جميع الأقسام (All Categories)</option>
          <option value="home">الرئيسية (Home)</option>
          <option value="booking">الحجز (Booking)</option>
          <option value="cancellation">الإلغاء (Cancellation)</option>
          <option value="vehicles">الأسطول (Vehicles & Luggage)</option>
          <option value="routes">المسارات والمطارات (Routes & Terminals)</option>
          <option value="ziyarat">المزارات (Ziyarat Tours)</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 px-3 rounded-xl bg-[#13171F] border border-[#262B33] text-xs text-[#FAF9F6] focus:border-[#D9A031] outline-none"
        >
          <option value="all">جميع الحالات (All Status)</option>
          <option value="published">منشور فقط (Published)</option>
          <option value="draft">مسودة فقط (Draft)</option>
        </select>
      </div>

      {/* FAQs List Table */}
      {loading ? (
        <div className="p-12 text-center text-xs text-[#6C7584]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#D9A031]" />
          <span>جاري تحميل الأسئلة الشائعة...</span>
        </div>
      ) : filteredFaqs.length === 0 ? (
        <div className="p-12 text-center text-xs text-[#6C7584] bg-[#13171F] rounded-2xl border border-[#262B33]">
          لا توجد نتائج تطابق معايير البحث.
        </div>
      ) : (
        <div className="bg-[#13171F] border border-[#262B33] rounded-2xl overflow-hidden divide-y divide-[#262B33]">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="p-4 sm:p-5 hover:bg-[#1A202C]/40 transition-colors space-y-3"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D9A031]/15 text-[#D9A031] text-[10px] font-bold uppercase tracking-wider">
                    {faq.category}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleStatus(faq)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                      faq.status === 'published'
                        ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25'
                        : 'bg-amber-500/15 text-amber-400 hover:bg-amber-500/25'
                    }`}
                  >
                    {faq.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{faq.status === 'published' ? 'منشور (Published)' : 'مسودة (Draft)'}</span>
                  </button>

                  {faq.needsOwnerConfirmation && (
                    <button
                      type="button"
                      onClick={() => handleToggleConfirmation(faq)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 text-[10px] font-bold hover:bg-rose-500/25 transition-colors"
                      title="اضغط للتبديل إذا تم التأكيد من المالك"
                    >
                      <AlertCircle className="w-3 h-3" />
                      <span>تحت تأكيد المالك (Needs Owner Confirmation)</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setEditingFaq(faq)}
                  className="h-7 px-3 rounded-lg bg-[#262B33] hover:bg-[#343B47] text-[#FAF9F6] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Edit2 className="w-3 h-3 text-[#D9A031]" />
                  <span>تعديل</span>
                </button>
              </div>

              {/* Questions preview */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#FAF9F6]">{faq.questionAr}</p>
                <p className="text-[11px] font-medium text-[#A0A6B2]">{faq.questionEn}</p>
              </div>

              {/* Answers preview */}
              <div className="space-y-1 pt-1 border-t border-[#262B33]/60 text-xs text-[#A0A6B2] font-light">
                <p className="line-clamp-2">{faq.answerAr}</p>
                <p className="line-clamp-2 text-[11px] text-[#6C7584]">{faq.answerEn}</p>
              </div>

              {/* Footer source badge */}
              <div className="text-[10px] text-[#6C7584] flex items-center gap-2">
                <span>المصدر: {faq.source}</span>
                <span>•</span>
                <span>آخر تدقيق: {faq.lastVerifiedDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#13171F] border border-[#262B33] rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262B33]">
              <h2 className="font-bold text-base text-[#FAF9F6]">
                {editingFaq.id.startsWith('faq-custom') ? 'إضافة سؤال جديد' : 'تعديل السؤال الشائع'}
              </h2>
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="text-[#A0A6B2] hover:text-[#FAF9F6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedback && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold ${
                  feedback.type === 'success'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                }`}
              >
                {feedback.message}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A0A6B2] mb-1">القسم (Category):</label>
                  <select
                    value={editingFaq.category}
                    onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none"
                  >
                    <option value="home">الرئيسية (Home)</option>
                    <option value="booking">الحجز (Booking)</option>
                    <option value="cancellation">الإلغاء (Cancellation)</option>
                    <option value="vehicles">الأسطول (Vehicles)</option>
                    <option value="routes">المسارات (Routes)</option>
                    <option value="ziyarat">المزارات (Ziyarat)</option>
                    <option value="general">عام (General)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A0A6B2] mb-1">الحالة (Status):</label>
                  <select
                    value={editingFaq.status}
                    onChange={(e) =>
                      setEditingFaq({ ...editingFaq, status: e.target.value as 'published' | 'draft' })
                    }
                    className="w-full h-9 px-3 rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none"
                  >
                    <option value="published">منشور (Published)</option>
                    <option value="draft">مسودة (Draft)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#A0A6B2] mb-1">السؤال بالعربية:</label>
                <input
                  type="text"
                  required
                  value={editingFaq.questionAr}
                  onChange={(e) => setEditingFaq({ ...editingFaq, questionAr: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#A0A6B2] mb-1">السؤال بالإنجليزية:</label>
                <input
                  type="text"
                  required
                  value={editingFaq.questionEn}
                  onChange={(e) => setEditingFaq({ ...editingFaq, questionEn: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#A0A6B2] mb-1">الإجابة بالعربية:</label>
                <textarea
                  rows={3}
                  required
                  value={editingFaq.answerAr}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answerAr: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[#A0A6B2] mb-1">الإجابة بالإنجليزية:</label>
                <textarea
                  rows={3}
                  required
                  value={editingFaq.answerEn}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answerEn: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-[#FAF9F6]">
                  <input
                    type="checkbox"
                    checked={editingFaq.needsOwnerConfirmation}
                    onChange={(e) =>
                      setEditingFaq({ ...editingFaq, needsOwnerConfirmation: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#D9A031]"
                  />
                  <span>تمييز كـ "تحت تأكيد المالك" (Needs Owner Confirmation)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#262B33]">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="h-9 px-4 rounded-xl bg-[#262B33] hover:bg-[#343B47] text-[#FAF9F6] transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="h-9 px-6 rounded-xl bg-[#D9A031] hover:bg-[#E5B24E] text-[#0D0F12] font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'جاري الحفظ...' : 'حفظ التعديلات'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
