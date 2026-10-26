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
    <div className="space-y-8 text-start max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#FAF9F6]">
            Business &amp; Operations Settings
          </h1>
          <p className="text-xs text-[#A0A6B2] mt-1 font-light">
            Dynamic platform configuration for Duyuf Alrahman VIP. Changes update the database, revalidate caches, and propagate globally.
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
          <span>Settings successfully updated and cached globally!</span>
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
              Notice: RESEND_API_KEY environment variable is not configured
            </span>
            <p className="text-amber-200/80 leading-relaxed font-light">
              Transactional security notifications and alert emails require <code className="bg-[#0D0F12] px-1.5 py-0.5 rounded text-amber-300 font-mono">RESEND_API_KEY</code> in environment variables.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: CORE CONTACT & MULTI-WHATSAPP */}
        <div className="bg-[#14171C] rounded-2xl border border-[#262B33] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#262B33]">
            <Phone className="w-4 h-4 text-[#D9A031]" />
            <h2 className="font-display font-bold text-base text-[#FAF9F6]">
              Contact Channels &amp; Dual WhatsApp Dispatch
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Primary WhatsApp Number (Line 1 - Operations)
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
                Digits only (e.g. 966567588261)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Secondary WhatsApp Number (Line 2 - Dispatch)
              </label>
              <input
                type="text"
                required
                value={settings.whatsapp_number_secondary || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp_number_secondary: e.target.value })}
                placeholder="966505316971"
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
              />
              <span className="text-[10px] text-[#6C7584] mt-1 block">
                Digits only (e.g. 966505316971)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Direct Voice Calling Number
              </label>
              <input
                type="text"
                required
                value={settings.phone || ''}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+966 50 531 6971"
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
              />
              <span className="text-[10px] text-[#6C7584] mt-1 block">
                Displayed in Contact cards (distinct from WhatsApp Line 1)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Official Inquiry Email
              </label>
              <input
                type="email"
                required
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="info@duyufalrahmanvip.com"
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: OPERATIONAL POLICIES & AIRPORT WAITING TIME */}
        <div className="bg-[#14171C] rounded-2xl border border-[#262B33] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#262B33]">
            <Clock className="w-4 h-4 text-[#D9A031]" />
            <h2 className="font-display font-bold text-base text-[#FAF9F6]">
              Operational Policies &amp; Airport Waiting
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Airport Complimentary Waiting Time (Minutes)
              </label>
              <input
                type="number"
                min={15}
                max={180}
                value={settings.airport_waiting_minutes ?? 60}
                onChange={(e) => setSettings({ ...settings, airport_waiting_minutes: Number(e.target.value) })}
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
              />
              <span className="text-[10px] text-[#6C7584] mt-1 block">
                Standardised across public site (default 60 minutes)
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Free Cancellation Deadline (Hours Before Pickup)
              </label>
              <input
                type="number"
                min={0}
                max={168}
                value={settings.free_cancellation_hours ?? 24}
                onChange={(e) => setSettings({ ...settings, free_cancellation_hours: Number(e.target.value) })}
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
              />
              <span className="text-[10px] text-[#6C7584] mt-1 block">
                Hours allowed before pickup for 100% free cancellation (default 24h)
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 3: PROMO ANNOUNCEMENT BAR */}
        <div className="bg-[#14171C] rounded-2xl border border-[#262B33] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#262B33]">
            <Bell className="w-4 h-4 text-[#D9A031]" />
            <h2 className="font-display font-bold text-base text-[#FAF9F6]">
              Top Executive Announcement Bar
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#0D0F12] border border-[#262B33]">
              <div>
                <span className="font-bold text-sm text-[#FAF9F6] block">
                  Enable Announcement Bar
                </span>
                <p className="text-xs text-[#A0A6B2] mt-0.5">
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
                <div className="w-11 h-6 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D9A031]"></div>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Announcement Message Text (English / Default)
              </label>
              <input
                type="text"
                value={settings.promo_banner_text || ''}
                onChange={(e) => setSettings({ ...settings, promo_banner_text: e.target.value })}
                placeholder="Fixed 2026 Umrah Season Rates Available • Free Cancellation up to 24h Before Arrival"
                className="w-full h-11 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: FEATURE FLAGS & VERIFIABLE INCLUSIONS */}
        <div className="bg-[#14171C] rounded-2xl border border-[#262B33] p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#262B33]">
            <Sliders className="w-4 h-4 text-[#D9A031]" />
            <h2 className="font-display font-bold text-base text-[#FAF9F6]">
              Feature Flags &amp; Service Inclusions (Default False)
            </h2>
          </div>
          <p className="text-xs text-[#A0A6B2]">
            Toggle features on or off without touching code. Gated features only appear on the public site when explicitly enabled by the owner.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Flight tracking */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0D0F12] border border-[#262B33]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#FAF9F6] block">Flight Radar Tracking</span>
                <span className="text-[10px] text-[#6C7584]">Live arrival delay tracking</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.flight_tracking_enabled)}
                  onChange={(e) => setSettings({ ...settings, flight_tracking_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D9A031]"></div>
              </label>
            </div>

            {/* Complimentary Water */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0D0F12] border border-[#262B33]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#FAF9F6] block">Complimentary Cold Water</span>
                <span className="text-[10px] text-[#6C7584]">Free chilled water bottles</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.complimentary_water)}
                  onChange={(e) => setSettings({ ...settings, complimentary_water: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D9A031]"></div>
              </label>
            </div>

            {/* Zamzam Water */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0D0F12] border border-[#262B33]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#FAF9F6] block">Zamzam Water Provision</span>
                <span className="text-[10px] text-[#6C7584]">Blessed Zamzam onboard</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.zamzam_water)}
                  onChange={(e) => setSettings({ ...settings, zamzam_water: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D9A031]"></div>
              </label>
            </div>

            {/* Child Seat */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0D0F12] border border-[#262B33]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#FAF9F6] block">Complimentary Child Seat</span>
                <span className="text-[10px] text-[#6C7584]">Free infant/toddler seat</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.complimentary_child_seat)}
                  onChange={(e) => setSettings({ ...settings, complimentary_child_seat: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D9A031]"></div>
              </label>
            </div>

            {/* Malay-speaking Chauffeur */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0D0F12] border border-[#262B33]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#FAF9F6] block">Malay-Speaking Chauffeur</span>
                <span className="text-[10px] text-[#6C7584]">Dedicated option for Southeast Asia</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.malay_speaking_chauffeur)}
                  onChange={(e) => setSettings({ ...settings, malay_speaking_chauffeur: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D9A031]"></div>
              </label>
            </div>

            {/* Free Miqat Stop */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0D0F12] border border-[#262B33]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#FAF9F6] block">Free Miqat Stop</span>
                <span className="text-[10px] text-[#6C7584]">Ihram stop without surcharge</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.free_miqat_stop)}
                  onChange={(e) => setSettings({ ...settings, free_miqat_stop: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D9A031]"></div>
              </label>
            </div>

            {/* Online Card Gateway */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0D0F12] border border-[#262B33]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#FAF9F6] block">Online Card Gateway</span>
                <span className="text-[10px] text-[#6C7584]">Mada / Visa / Mastercard online</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.online_card_payment_enabled)}
                  onChange={(e) => setSettings({ ...settings, online_card_payment_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D9A031]"></div>
              </label>
            </div>

            {/* Bank Transfer */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0D0F12] border border-[#262B33]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#FAF9F6] block">Saudi Bank Transfer</span>
                <span className="text-[10px] text-[#6C7584]">Direct IBAN wire transfer</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.bank_transfer_payment_enabled)}
                  onChange={(e) => setSettings({ ...settings, bank_transfer_payment_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D9A031]"></div>
              </label>
            </div>

            {/* Coaster Fleet */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0D0F12] border border-[#262B33]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#FAF9F6] block">Toyota Coaster Fleet</span>
                <span className="text-[10px] text-[#6C7584]">20-passenger minibus booking</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.coaster_enabled)}
                  onChange={(e) => setSettings({ ...settings, coaster_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D9A031]"></div>
              </label>
            </div>

            {/* Riyadh Chauffeur Area */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0D0F12] border border-[#262B33]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#FAF9F6] block">Riyadh Hub &amp; Routes</span>
                <span className="text-[10px] text-[#6C7584]">Riyadh airport &amp; intercity routes</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.riyadh_enabled)}
                  onChange={(e) => setSettings({ ...settings, riyadh_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D9A031]"></div>
              </label>
            </div>

            {/* Taif Chauffeur Area */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0D0F12] border border-[#262B33]">
              <div className="pr-3">
                <span className="font-semibold text-xs text-[#FAF9F6] block">Taif Hub &amp; Routes</span>
                <span className="text-[10px] text-[#6C7584]">Taif mountain &amp; intercity routes</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(settings.taif_enabled)}
                  onChange={(e) => setSettings({ ...settings, taif_enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-[#262B33] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D9A031]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* SECTION 5: GOOGLE REVIEWS SETTINGS */}
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
              <span className="text-[10px] text-[#6C7584] mt-1 block">
                Leave empty to completely hide reviews section until official link is confirmed
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#A0A6B2] mb-1.5">
                Approved Reviews Count
              </label>
              <input
                type="number"
                value={settings.google_reviews_count ?? 0}
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
            className="px-8 py-3 rounded-xl bg-[#D9A031] hover:bg-[#B8821F] text-[#0D0F12] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Updating Database...' : 'Save Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
