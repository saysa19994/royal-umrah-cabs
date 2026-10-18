'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  CheckCircle2,
  RefreshCw,
  Star,
  Clock,
  DollarSign,
  Save,
  ShieldAlert,
} from 'lucide-react';
import { SiteSettings } from '@/lib/settings';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [resendConfigured, setResendConfigured] = useState<boolean>(true);
  const [resendFrom, setResendFrom] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data.settings) {
        setSettings(data.settings);
      }
      if (data.system_status) {
        setResendConfigured(Boolean(data.system_status.resend_configured));
        setResendFrom(data.system_status.resend_from || '');
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save settings');
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-[#6C7584]">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#D9A031]" />
        <span>Loading production settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-start max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#FAF9F6]">
            Business &amp; Operations Settings
          </h1>
          <p className="text-xs text-[#A0A6B2] mt-1 font-light">
            All values stored in database and propagated globally across public website, buttons, and booking flows
          </p>
        </div>
        <button
          onClick={fetchSettings}
          className="px-4 py-2 rounded-xl bg-[#14171C] border border-[#262B33] hover:border-[#D9A031]/40 text-[#FAF9F6] text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reload</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Settings successfully updated in database!</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!resendConfigured && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block text-amber-300">
              Warning: RESEND_API_KEY environment variable is not configured
            </span>
            <p className="text-amber-200/80 leading-relaxed font-light">
              Transactional security emails (such as executive ownership transfer confirmation tokens) cannot be dispatched via SMTP/API until <code className="bg-[#0D0F12] px-1.5 py-0.5 rounded text-amber-300 font-mono">RESEND_API_KEY</code> is set in your environment variables.
              {resendFrom && (
                <span> Configured sender domain: <code className="bg-[#0D0F12] px-1.5 py-0.5 rounded text-amber-300 font-mono">{resendFrom}</code></span>
              )}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: CORE CONTACT & WHATSAPP */}
        <div className="bg-[#14171C] rounded-2xl border border-[#262B33] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#262B33]">
            <Phone className="w-4 h-4 text-[#D9A031]" />
            <h2 className="font-display font-bold text-base text-[#FAF9F6]">
              Contact &amp; Primary WhatsApp Configuration
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Primary WhatsApp Number (Read everywhere)
              </label>
              <input
                type="text"
                required
                value={settings.whatsapp_number || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                placeholder="966567588261"
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
              />
              <span className="text-[10px] text-[#6C7584] mt-1 block">
                Digits with country code without plus sign (e.g. 966567588261)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Direct Call Phone Number
              </label>
              <input
                type="text"
                required
                value={settings.phone || ''}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+966 56 758 8261"
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Public Inquiry Email
              </label>
              <input
                type="email"
                required
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="info@royalumrahcabs.com"
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Free Cancellation Deadline (Hours)
              </label>
              <input
                type="number"
                min={0}
                max={72}
                value={settings.free_cancellation_hours || 24}
                onChange={(e) => setSettings({ ...settings, free_cancellation_hours: Number(e.target.value) })}
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: OPERATIONAL CITIES & RIYADH TOGGLE */}
        <div className="bg-[#14171C] rounded-2xl border border-[#262B33] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#262B33]">
            <MapPin className="w-4 h-4 text-[#D9A031]" />
            <h2 className="font-display font-bold text-base text-[#FAF9F6]">
              Operational Hubs &amp; Coverage Areas
            </h2>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-[#0D0F12] border border-[#262B33]">
            <div>
              <span className="font-bold text-sm text-[#FAF9F6] block">
                Riyadh Chauffeur Service Area
              </span>
              <p className="text-xs text-[#A0A6B2] mt-0.5">
                Toggle Riyadh availability on public forms and route selectors
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(settings.riyadh_enabled)}
                onChange={(e) => setSettings({ ...settings, riyadh_enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D9A031]"></div>
            </label>
          </div>
        </div>

        {/* SECTION 3: GOOGLE REVIEWS SETTINGS */}
        <div className="bg-[#14171C] rounded-2xl border border-[#262B33] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#262B33]">
            <Star className="w-4 h-4 text-[#D9A031]" />
            <h2 className="font-display font-bold text-base text-[#FAF9F6]">
              Verified Google Reviews Integration
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Official Google Reviews Link
              </label>
              <input
                type="url"
                value={settings.google_reviews_link || ''}
                onChange={(e) => setSettings({ ...settings, google_reviews_link: e.target.value })}
                placeholder="https://g.page/r/..."
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Approved Reviews Count
              </label>
              <input
                type="number"
                value={settings.google_reviews_count || 12480}
                onChange={(e) => setSettings({ ...settings, google_reviews_count: Number(e.target.value) })}
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-[#D9A031] hover:bg-[#B8821F] text-[#0D0F12] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Updating Database...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
