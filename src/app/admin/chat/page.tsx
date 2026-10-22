'use client';

import React, { useState, useEffect } from 'react';
import {
  Bot,
  MessageSquare,
  Sparkles,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Shield,
  Clock,
  User,
  Power,
  Coins,
  Cpu,
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';
import type { ChatBotSettings, ChatSessionRecord } from '@/lib/chat-settings';

export default function AdminChatPage() {
  const [settings, setSettings] = useState<ChatBotSettings | null>(null);
  const [sessions, setSessions] = useState<ChatSessionRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'conversations' | 'settings'>('conversations');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [sessionFilter, setSessionFilter] = useState<'all' | 'handoffs'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/chat');
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        setSessions(data.sessions || []);
      }
    } catch (err) {
      console.error('Failed to load chat data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveSettings = async () => {
    if (!settings) return;
    setSaving(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/admin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        setFeedback({ type: 'success', message: 'تم حفظ إعدادات المساعد الذكي بنجاح' });
        setTimeout(() => setFeedback(null), 4000);
      } else {
        throw new Error(data.error);
      }
    } catch {
      setFeedback({ type: 'error', message: 'فشل حفظ الإعدادات، يرجى المحاولة لاحقاً' });
    } finally {
      setSaving(false);
    }
  };

  const filteredSessions = sessions.filter((s) => {
    if (sessionFilter === 'handoffs' && !s.handoffOccurred) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchMsg = s.lastUserMessage.toLowerCase().includes(q) || s.lastAssistantMessage.toLowerCase().includes(q);
      const matchRef = s.handoffRef?.toLowerCase().includes(q);
      return matchMsg || matchRef;
    }
    return true;
  });

  const totalHandoffs = sessions.filter((s) => s.handoffOccurred).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#14171C] via-[#1A1F26] to-[#14171C] border border-[#262B33]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#D9A031]/15 border border-[#D9A031]/30 flex items-center justify-center text-[#D9A031]">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-display font-bold text-[#FAF9F6]">
                إدارة المساعد الذكي (رفيق AI)
              </h1>
              {settings?.enabled ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  نشط ومفعّل
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  معطّل
                </span>
              )}
            </div>
            <p className="text-xs text-[#A0A6B2] mt-1">
              مراقبة المحادثات الحية، رصد التحويل إلى واتساب، وتخصيص هوية المساعد ونبرة الإجابة.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchData}
            disabled={loading}
            className="p-2.5 rounded-xl bg-[#20252D] hover:bg-[#262B33] text-[#A0A6B2] hover:text-[#FAF9F6] border border-[#262B33] transition-colors"
            title="تحديث البيانات"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <div className="flex rounded-xl bg-[#0D0F12] p-1 border border-[#262B33]">
            <button
              type="button"
              onClick={() => setActiveTab('conversations')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'conversations'
                  ? 'bg-[#D9A031] text-[#0D0F12]'
                  : 'text-[#A0A6B2] hover:text-[#FAF9F6]'
              }`}
            >
              سجل المحادثات والتحويلات ({sessions.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#D9A031] text-[#0D0F12]'
                  : 'text-[#A0A6B2] hover:text-[#FAF9F6]'
              }`}
            >
              إعدادات وتخصيص البوت
            </button>
          </div>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold ${
            feedback.type === 'success'
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* TAB 1: CONVERSATIONS & HANDOFFS */}
      {activeTab === 'conversations' && (
        <div className="space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#14171C] border border-[#262B33]">
              <span className="text-xs text-[#A0A6B2]">إجمالي جلسات المحادثة</span>
              <p className="text-2xl font-bold text-[#FAF9F6] mt-1">{sessions.length}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#14171C] border border-[#262B33]">
              <span className="text-xs text-[#A0A6B2]">تحويل مباشر إلى واتساب المشرف</span>
              <p className="text-2xl font-bold text-[#D9A031] mt-1">{totalHandoffs}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#14171C] border border-[#262B33]">
              <span className="text-xs text-[#A0A6B2]">متوسط التفاعل الذاتي</span>
              <p className="text-2xl font-bold text-emerald-400 mt-1">
                {sessions.length > 0 ? `${Math.round(((sessions.length - totalHandoffs) / sessions.length) * 100)}%` : '100%'}
              </p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl bg-[#14171C] border border-[#262B33]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute top-3 right-3 text-[#6C7584]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في نصوص المحادثات أو الكود المرجعي..."
                className="w-full h-10 pr-9 pl-4 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] placeholder-[#6C7584] focus:outline-none focus:border-[#D9A031]"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSessionFilter('all')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  sessionFilter === 'all'
                    ? 'bg-[#20252D] text-[#D9A031] border border-[#D9A031]/40'
                    : 'bg-[#0D0F12] text-[#A0A6B2] border border-[#262B33]'
                }`}
              >
                الكل ({sessions.length})
              </button>
              <button
                type="button"
                onClick={() => setSessionFilter('handoffs')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  sessionFilter === 'handoffs'
                    ? 'bg-[#20252D] text-[#D9A031] border border-[#D9A031]/40'
                    : 'bg-[#0D0F12] text-[#A0A6B2] border border-[#262B33]'
                }`}
              >
                تحويلات واتساب ({totalHandoffs})
              </button>
            </div>
          </div>

          {/* Sessions List */}
          <div className="space-y-3">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="p-5 rounded-2xl bg-[#14171C] border border-[#262B33] hover:border-[#38404E] transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#20252D] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#FAF9F6]">{session.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#262B33] text-[#A0A6B2]">
                      {session.locale}
                    </span>
                    {session.ipMasked && (
                      <span className="text-[10px] text-[#6C7584]">IP: {session.ipMasked}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {session.handoffOccurred ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        تحويل لواتساب ({session.handoffRef || 'مكتمل'})
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        مكتمل آلياً
                      </span>
                    )}
                    <span className="text-[11px] text-[#A0A6B2] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-[#0D0F12] border border-[#20252D] flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#D9A031] text-[#0D0F12] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      <User className="w-3 h-3" />
                    </span>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-[#A0A6B2] block mb-0.5">استفسار المعتمر:</span>
                      <p className="text-[#FAF9F6] font-medium leading-relaxed">{session.lastUserMessage}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#1A1F26] border border-[#20252D] flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-[#D9A031] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      <Bot className="w-3 h-3" />
                    </span>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-[#A0A6B2] block mb-0.5">إجابة رفيق AI:</span>
                      <p className="text-[#D1D5DB] font-light leading-relaxed whitespace-pre-wrap">{session.lastAssistantMessage}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SETTINGS & CUSTOMIZATION */}
      {activeTab === 'settings' && settings && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#14171C] border border-[#262B33] space-y-6">
            <h2 className="text-lg font-bold text-[#FAF9F6] border-b border-[#262B33] pb-3">
              التحكم العام وهوية المساعد
            </h2>

            {/* Enable / Disable Switch */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0D0F12] border border-[#262B33]">
              <div>
                <span className="text-sm font-bold text-[#FAF9F6] block">تفعيل المساعد الذكي في الموقع</span>
                <span className="text-xs text-[#A0A6B2]">
                  عند التعطيل، يختفي الزر العائم للمساعد الذكي من جميع صفحات الموقع فوراً.
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {/* Bot Name & Persona */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#A0A6B2] mb-1.5">اسم المساعد والعلامة التجارية</label>
                <input
                  type="text"
                  value={settings.botName}
                  onChange={(e) => setSettings({ ...settings, botName: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-[#0D0F12] border border-[#262B33] text-sm text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A0A6B2] mb-1.5">نبرة الحوار (AI Tone)</label>
                <select
                  value={settings.tone}
                  onChange={(e) => setSettings({ ...settings, tone: e.target.value as any })}
                  className="w-full h-11 px-4 rounded-xl bg-[#0D0F12] border border-[#262B33] text-sm text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                >
                  <option value="warm_vip">ضيافة VIP دافئة ومرحبة بضيوف الرحمن (موصى بها)</option>
                  <option value="concise_executive">تنفيذي ومختصر بالأرقام والأسعار</option>
                  <option value="hajj_umrah_focused">إرشادي متخصص بمناسك ومواقيت العمرة والزيارة</option>
                </select>
              </div>
            </div>

            {/* Multilingual Greetings */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[#FAF9F6]">رسائل الترحيب التلقائية</h3>
              <div>
                <label className="block text-xs text-[#A0A6B2] mb-1">الترحيب باللغة العربية:</label>
                <textarea
                  rows={2}
                  value={settings.greetingAr}
                  onChange={(e) => setSettings({ ...settings, greetingAr: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#A0A6B2] mb-1">الترحيب باللغة الإنجليزية:</label>
                <textarea
                  rows={2}
                  value={settings.greetingEn}
                  onChange={(e) => setSettings({ ...settings, greetingEn: e.target.value })}
                  className="w-full p-3 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
              </div>
            </div>

            {/* Quick Actions Toggles */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#FAF9F6]">أزرار الإجراءات السريعة المتاحة في النافذة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { key: 'getPrice', label: '💰 استعلام الأسعار الفورية' },
                  { key: 'bookTransfer', label: '🚕 حجز مشوار جديد' },
                  { key: 'hourlyDriver', label: '⏱️ حجز سائق بالساعة / اليوم' },
                  { key: 'trackBooking', label: '🔍 تتبع حالة الحجز' },
                  { key: 'talkAgent', label: '💬 التحدث مع المشرف (واتساب)' },
                  { key: 'faq', label: '❓ الأسئلة الشائعة والميقات' },
                ].map((action) => (
                  <label
                    key={action.key}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#0D0F12] border border-[#262B33] cursor-pointer hover:border-[#38404E]"
                  >
                    <span className="text-xs font-semibold text-[#FAF9F6]">{action.label}</span>
                    <input
                      type="checkbox"
                      checked={(settings.quickActions as any)[action.key]}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          quickActions: {
                            ...settings.quickActions,
                            [action.key]: e.target.checked,
                          },
                        })
                      }
                      className="rounded bg-[#262B33] border-[#38404E] text-[#D9A031] focus:ring-0"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Cost & Token Limits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#262B33] pt-4">
              <div>
                <label className="block text-xs font-bold text-[#A0A6B2] mb-1.5 flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-[#D9A031]" />
                  سقف التكلفة الشهري المقدر (USD Monthly Cap)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={settings.costCapMonthlyUsd}
                    onChange={(e) => setSettings({ ...settings, costCapMonthlyUsd: Number(e.target.value) })}
                    className="w-full h-11 px-4 rounded-xl bg-[#0D0F12] border border-[#262B33] text-sm text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                  />
                  <span className="absolute left-3 top-3 text-xs text-[#A0A6B2]">USD</span>
                </div>
                <span className="text-[10px] text-[#6C7584] mt-1 block">
                  عند تجاوز السقف يتم التحويل تلقائياً وبأمان إلى محادثة واتساب المباشرة دون انقطاع الخدمة.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#A0A6B2] mb-1.5 flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  الحد الأقصى للرموز في الرد الواحد (Max Tokens)
                </label>
                <input
                  type="number"
                  value={settings.maxTokens}
                  onChange={(e) => setSettings({ ...settings, maxTokens: Number(e.target.value) })}
                  className="w-full h-11 px-4 rounded-xl bg-[#0D0F12] border border-[#262B33] text-sm text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
                <span className="text-[10px] text-[#6C7584] mt-1 block">
                  الافتراضي: 800 رمز (يمنع الإجابات الطويلة غير الضرورية ويضمن السرعة الفائقة).
                </span>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-[#262B33]">
              <button
                type="button"
                onClick={handleSaveSettings}
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-[#D9A031] hover:bg-[#E5B24E] text-[#0D0F12] font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'جاري الحفظ...' : 'حفظ تعديلات المساعد الذكي'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
