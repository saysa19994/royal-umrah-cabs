import Link from 'next/link';
'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  RefreshCw,
  Star,
  Clock,
  Save,
  ShieldAlert,
  ShieldCheck,
  Key,
  Sliders,
  Bell,
  CreditCard,
  Car,
  Droplets,
  Plane,
  HeartHandshake,
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
  const [sendingTestEmail, setSendingTestEmail] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [purgingCache, setPurgingCache] = useState(false);
  const [cacheSyncResult, setCacheSyncResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handlePurgeCache = async () => {
    setPurgingCache(true);
    setCacheSyncResult(null);
    try {
      const res = await fetch('/api/admin/sync', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        setCacheSyncResult({
          type: 'success',
          message: `All ${data.revalidatedTags?.length || 7} cache tags purged and resynced across all 10 locales!`,
        });
      } else {
        setCacheSyncResult({
          type: 'error',
          message: data.error || 'Failed to purge cache tags',
        });
      }
    } catch {
      setCacheSyncResult({
        type: 'error',
        message: 'Network error communicating with cache sync engine',
      });
    } finally {
      setPurgingCache(false);
    }
  };

  const handleSendTestEmail = async () => {
    setSendingTestEmail(true);
    setTestEmailResult(null);
    try {
      const res = await fetch('/api/admin/email/test', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestEmailResult({ type: 'success', message: data.message || 'Test email dispatched successfully!' });
      } else {
        setTestEmailResult({ type: 'error', message: data.error || 'Failed to dispatch test email' });
      }
    } catch {
      setTestEmailResult({ type: 'error', message: 'Network error triggering test email' });
    } finally {
      setSendingTestEmail(false);
    }
  };

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
      <div className="py-20 text-center text-[#76828B]">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#93652D]" />
        <span>Loading production settings...</span>
      </div>
    );
  }

  return (
    <div className="vip-internal-editorial space-y-8 text-start max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#193341]">
            Business &amp; Operations Settings
          </h1>
          <p className="text-xs text-[#63727C] mt-1 font-light">
            Dynamic platform configuration for Duyuf Alrahman VIP. Changes update the database, revalidate caches, and propagate globally.
          </p>
        </div>
        <button
          onClick={fetchSettings}
          className="px-4 py-2 rounded-xl bg-[#FFFBF6] border border-[#E5D6C0] hover:border-[#C49A61]/40 text-[#193341] text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reload</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Settings successfully updated and cached globally!</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 text-xs font-bold flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!resendConfigured && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block text-amber-800">
              Notice: RESEND_API_KEY environment variable is not configured
            </span>
            <p className="text-amber-200/80 leading-relaxed font-light">
              Transactional security notifications and alert emails require <code className="bg-[#F7EFE4] px-1.5 py-0.5 rounded text-amber-800 font-mono">RESEND_API_KEY</code> in environment variables.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="vip-internal-editorial space-y-6">
        {/* SECTION 1: CORE CONTACT & MULTI-WHATSAPP */}
        <div className="bg-[#FFFBF6] rounded-2xl border border-[#E5D6C0] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5D6C0]">
            <Phone className="w-4 h-4 text-[#93652D]" />
            <h2 className="font-display font-bold text-base text-[#193341]">
              Contact Channels &amp; Dual WhatsApp Dispatch
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#63727C] mb-1.5">
                Primary WhatsApp Number (Line 1 - Operations)
              </label>
              <input
                type="text"
                required
                value={settings.whatsapp_number || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                placeholder="966567588261"
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#F7EFE4] border border-[#E5D6C0] text-[#193341] outline-none font-mono"
              />
              <span className="text-[10px] text-[#76828B] mt-1 block">
                Digits only (e.g. 966567588261)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#63727C] mb-1.5">
                Secondary WhatsApp Number (Line 2 - Dispatch)
              </label>
              <input
                type="text"
                required
                value={settings.whatsapp_number_secondary || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp_number_secondary: e.target.value })}
                placeholder="966505316971"
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#F7EFE4] border border-[#E5D6C0] text-[#193341] outline-none font-mono"
              />
              <span className="text-[10px] text-[#76828B] mt-1 block">
                Digits only (e.g. 966505316971)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#63727C] mb-1.5">
                Direct Voice Calling Number
              </label>
              <input
                type="text"
                required
                value={settings.phone || ''}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+966 50 531 6971"
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#F7EFE4] border border-[#E5D6C0] text-[#193341] outline-none font-mono"
              />
              <span className="text-[10px] text-[#76828B] mt-1 block">
                Displayed in Contact cards (distinct from WhatsApp Line 1)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#63727C] mb-1.5">
                Official Inquiry Email
              </label>
              <input
                type="email"
                required
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="info@duyufalrahmanvip.com"
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#F7EFE4] border border-[#E5D6C0] text-[#193341] outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: OPERATIONAL POLICIES & AIRPORT WAITING TIME */}
        <div className="bg-[#FFFBF6] rounded-2xl border border-[#E5D6C0] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5D6C0]">
            <Clock className="w-4 h-4 text-[#93652D]" />
            <h2 className="font-display font-bold text-base text-[#193341]">
              Operational Policies &amp; Airport Waiting
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#63727C] mb-1.5">
                Airport Complimentary Waiting Time (Minutes)
              </label>
              <input
                type="number"
                min={15}
                max={180}
                value={settings.airport_waiting_minutes ?? 60}
                onChange={(e) => setSettings({ ...settings, airport_waiting_minutes: Number(e.target.value) })}
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#F7EFE4] border border-[#E5D6C0] text-[#193341] outline-none font-mono"
              />
              <span className="text-[10px] text-[#76828B] mt-1 block">
                Standardised across public site (default 60 minutes)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#63727C] mb-1.5">
                Free Cancellation Deadline (Hours Before Pickup)
              </label>
              <input
                type="number"
                min={0}
                max={168}
                value={settings.free_cancellation_hours ?? 24}
                onChange={(e) => setSettings({ ...settings, free_cancellation_hours: Number(e.target.value) })}
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#F7EFE4] border border-[#E5D6C0] text-[#193341] outline-none font-mono"
              />
              <span className="text-[10px] text-[#76828B] mt-1 block">
                Hours allowed before pickup for 100% free cancellation (default 24h)
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 3: PROMO ANNOUNCEMENT BAR */}
        <div className="bg-[#FFFBF6] rounded-2xl border border-[#E5D6C0] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5D6C0]">
            <Bell className="w-4 h-4 text-[#93652D]" />
            <h2 className="font-display font-bold text-base text-[#193341]">
              Top Executive Announcement Bar
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#F7EFE4] border border-[#E5D6C0]">
              <div>
                <span className="font-bold text-sm text-[#193341] block">
                  Enable Announcement Bar
                </span>
                <p className="text-xs text-[#63727C] mt-0.5">
                  Display the gold announcement ribbon at the top of every page
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.promo_banner_enabled ?? true}
                  onChange={(e) => setSettings({ ...settings, promo_banner_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#F2E6D7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#086064]"></div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#63727C] mb-1.5">
                Announcement Message Text (English / Default)
              </label>
              <input
                type="text"
                value={settings.promo_banner_text || ''}
                onChange={(e) => setSettings({ ...settings, promo_banner_text: e.target.value })}
                placeholder="Fixed 2026 Umrah Season Rates Available • Free Cancellation up to 24h Before Arrival"
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#F7EFE4] border border-[#E5D6C0] text-[#193341] outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: FEATURE FLAGS & VERIFIABLE INCLUSIONS */}
        <div className="bg-[#FFFBF6] rounded-2xl border border-[#E5D6C0] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5D6C0]">
            <Sliders className="w-4 h-4 text-[#93652D]" />
            <h2 className="font-display font-bold text-base text-[#193341]">
              Feature Flags &amp; Service Inclusions (Default False)
            </h2>
          </div>
          <p className="text-xs text-[#63727C]">
            Toggle features on or off without touching code. Gated features only appear on the public site when explicitly enabled by the owner.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Flight tracking */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7EFE4] border border-[#E5D6C0]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#193341] block">Flight Radar Tracking</span>
                <span className="text-[10px] text-[#76828B]">Live arrival delay tracking</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.flight_tracking_enabled)}
                  onChange={(e) => setSettings({ ...settings, flight_tracking_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#F2E6D7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#086064]"></div>
              </label>
            </div>

            {/* Complimentary Water */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7EFE4] border border-[#E5D6C0]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#193341] block">Complimentary Cold Water</span>
                <span className="text-[10px] text-[#76828B]">Free chilled water bottles</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.complimentary_water)}
                  onChange={(e) => setSettings({ ...settings, complimentary_water: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#F2E6D7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#086064]"></div>
              </label>
            </div>

            {/* Zamzam Water */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7EFE4] border border-[#E5D6C0]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#193341] block">Zamzam Water Provision</span>
                <span className="text-[10px] text-[#76828B]">Blessed Zamzam onboard</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.zamzam_water)}
                  onChange={(e) => setSettings({ ...settings, zamzam_water: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#F2E6D7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#086064]"></div>
              </label>
            </div>

            {/* Child Seat */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7EFE4] border border-[#E5D6C0]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#193341] block">Complimentary Child Seat</span>
                <span className="text-[10px] text-[#76828B]">Free infant/toddler seat</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.complimentary_child_seat)}
                  onChange={(e) => setSettings({ ...settings, complimentary_child_seat: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#F2E6D7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#086064]"></div>
              </label>
            </div>

            {/* Malay-speaking Chauffeur */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7EFE4] border border-[#E5D6C0]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#193341] block">Malay-Speaking Chauffeur</span>
                <span className="text-[10px] text-[#76828B]">Dedicated option for Southeast Asia</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.malay_speaking_chauffeur)}
                  onChange={(e) => setSettings({ ...settings, malay_speaking_chauffeur: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#F2E6D7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#086064]"></div>
              </label>
            </div>

            {/* Free Miqat Stop */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7EFE4] border border-[#E5D6C0]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#193341] block">Free Miqat Stop</span>
                <span className="text-[10px] text-[#76828B]">Ihram stop without surcharge</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.free_miqat_stop)}
                  onChange={(e) => setSettings({ ...settings, free_miqat_stop: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#F2E6D7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#086064]"></div>
              </label>
            </div>

            {/* Online Card Gateway */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7EFE4] border border-[#E5D6C0]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#193341] block">Online Card Gateway</span>
                <span className="text-[10px] text-[#76828B]">Mada / Visa / Mastercard online</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.online_card_payment_enabled)}
                  onChange={(e) => setSettings({ ...settings, online_card_payment_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#F2E6D7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#086064]"></div>
              </label>
            </div>

            {/* Bank Transfer */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7EFE4] border border-[#E5D6C0]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#193341] block">Saudi Bank Transfer</span>
                <span className="text-[10px] text-[#76828B]">Direct IBAN wire transfer</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.bank_transfer_payment_enabled)}
                  onChange={(e) => setSettings({ ...settings, bank_transfer_payment_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#F2E6D7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#086064]"></div>
              </label>
            </div>

            {/* Coaster Fleet */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7EFE4] border border-[#E5D6C0]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#193341] block">Toyota Coaster Fleet</span>
                <span className="text-[10px] text-[#76828B]">20-passenger minibus booking</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.coaster_enabled)}
                  onChange={(e) => setSettings({ ...settings, coaster_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#F2E6D7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#086064]"></div>
              </label>
            </div>

            {/* Riyadh Chauffeur Area */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7EFE4] border border-[#E5D6C0]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#193341] block">Riyadh Hub &amp; Routes</span>
                <span className="text-[10px] text-[#76828B]">Riyadh airport &amp; intercity routes</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.riyadh_enabled)}
                  onChange={(e) => setSettings({ ...settings, riyadh_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#F2E6D7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#086064]"></div>
              </label>
            </div>

            {/* Taif Chauffeur Area */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F7EFE4] border border-[#E5D6C0]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#193341] block">Taif Hub &amp; Routes</span>
                <span className="text-[10px] text-[#76828B]">Taif mountain &amp; intercity routes</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.taif_enabled)}
                  onChange={(e) => setSettings({ ...settings, taif_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#F2E6D7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#086064]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* SECTION 5: GOOGLE REVIEWS SETTINGS */}
        <div className="bg-[#FFFBF6] rounded-2xl border border-[#E5D6C0] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5D6C0]">
            <Star className="w-4 h-4 text-[#93652D]" />
            <h2 className="font-display font-bold text-base text-[#193341]">
              Verified Google Reviews Integration
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#63727C] mb-1.5">
                Official Google Reviews Link
              </label>
              <input
                type="url"
                value={settings.google_reviews_link || ''}
                onChange={(e) => setSettings({ ...settings, google_reviews_link: e.target.value })}
                placeholder="https://g.page/r/..."
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#F7EFE4] border border-[#E5D6C0] text-[#193341] outline-none"
              />
              <span className="text-[10px] text-[#76828B] mt-1 block">
                Leave empty to completely hide reviews section until official link is confirmed
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#63727C] mb-1.5">
                Approved Reviews Count
              </label>
              <input
                type="number"
                value={settings.google_reviews_count ?? 0}
                onChange={(e) => setSettings({ ...settings, google_reviews_count: Number(e.target.value) })}
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#F7EFE4] border border-[#E5D6C0] text-[#193341] outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 6: CACHE REVALIDATION & PROPAGATION */}
        <div className="bg-[#FFFBF6] rounded-2xl border border-[#E5D6C0] p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E5D6C0]">
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-[#93652D] shrink-0" />
              <div>
                <h2 className="font-display font-bold text-base text-[#193341]">
                  Single Source of Truth &amp; Cache Engine
                </h2>
                <p className="text-xs text-[#63727C] mt-0.5">
                  Force on-demand revalidation of database tags across all 10 locales and edge ISR within seconds.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePurgeCache}
              disabled={purgingCache}
              className="px-4 py-2 rounded-xl bg-[#F4EADC] hover:bg-[#F4E9DC] border border-[#C49A61]/40 text-[#92612E] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all disabled:opacity-50 self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${purgingCache ? 'animate-spin' : ''}`} />
              <span>{purgingCache ? 'Purging Cache...' : 'Purge & Resync Stale Cache'}</span>
            </button>
          </div>

          {cacheSyncResult && (
            <div
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
                cacheSyncResult.type === 'success'
                  ? 'bg-emerald-50 border-emerald-500/40 text-emerald-700'
                  : 'bg-red-50 border-red-500/40 text-red-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{cacheSyncResult.message}</span>
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-[#086064] hover:bg-[#064D52] text-[#FFF7EA] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Updating Database...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
