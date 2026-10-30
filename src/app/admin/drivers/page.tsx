'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  UserCheck,
  Phone,
  Car,
  CheckCircle2,
  XCircle,
  PlusCircle,
  RefreshCw,
  Search,
  Edit3,
  Trash2,
  Globe,
  Save,
  X,
  AlertTriangle,
  Clock,
  Shield,
  Sparkles,
  Award,
} from 'lucide-react';

interface DriverRecord {
  id: string;
  name: string;
  phone: string;
  vehicle_plate: string;
  vehicle_model: string;
  spoken_languages: string[];
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

const VEHICLE_OPTIONS = [
  'GMC Yukon XL VIP',
  'Hyundai Staria VIP',
  'Toyota Camry VIP',
  'Toyota HiAce VIP',
  'Toyota Coaster VIP',
];

const AVAILABLE_LANGUAGES = ['Arabic', 'English', 'Urdu', 'Malay', 'Indonesian', 'French', 'Turkish'];

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState<DriverRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<DriverRecord>>({});
  const [saving, setSaving] = useState(false);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/drivers');
      const data = await res.json();
      if (res.ok && data.drivers) {
        setDrivers(data.drivers);
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to fetch drivers' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error fetching drivers' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQ =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.phone.includes(q) ||
        d.vehicle_model.toLowerCase().includes(q) ||
        d.vehicle_plate.toLowerCase().includes(q);

      const matchS =
        statusFilter === 'all' ||
        (statusFilter === 'active' && d.is_active) ||
        (statusFilter === 'inactive' && !d.is_active);

      return matchQ && matchS;
    });
  }, [drivers, searchQuery, statusFilter]);

  const handleOpenEdit = (driver: DriverRecord) => {
    setFormData({ ...driver });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      phone: '+966',
      vehicle_plate: 'KSA 0000 VIP',
      vehicle_model: 'GMC Yukon XL VIP',
      spoken_languages: ['Arabic', 'English'],
      is_active: true,
    });
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setIsCreating(false);
    setFormData({});
  };

  const handleSaveDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.phone?.trim()) {
      setFeedback({ type: 'error', message: 'Name and phone are required.' });
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      const endpoint = '/api/admin/drivers';
      const method = isCreating ? 'POST' : 'PATCH';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to save driver');
      }

      setFeedback({
        type: 'success',
        message: isCreating
          ? `VIP Chauffeur ${formData.name} successfully registered.`
          : `Driver profile for ${formData.name} updated.`,
      });

      handleCloseModal();
      fetchDrivers();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDriver = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove chauffeur ${name}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/drivers?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete driver');
      }
      setFeedback({ type: 'success', message: `Chauffeur ${name} removed.` });
      fetchDrivers();
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message });
    }
  };

  const toggleLanguage = (lang: string) => {
    const current = formData.spoken_languages || [];
    if (current.includes(lang)) {
      setFormData({ ...formData, spoken_languages: current.filter((l) => l !== lang) });
    } else {
      setFormData({ ...formData, spoken_languages: [...current, lang] });
    }
  };

  const activeCount = drivers.filter((d) => d.is_active).length;

  return (
    <div className="space-y-6 text-start">
      {/* 1. EXECUTIVE HEADER BAR */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#121724] via-[#0E121B] to-[#0A0D14] border border-[#232B3E] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D9A031]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A031]/15 border border-[#D9A031]/30 text-xs font-bold text-[#E5B842]">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A031]" />
              <span>Duyuf Alrahman VIP • Chauffeur Protocol &amp; Dispatch Fleet</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#FAF9F6] tracking-tight">
              VIP Chauffeur Operations Directory
            </h1>

            <p className="text-xs sm:text-sm text-[#9DA6B8] font-light max-w-2xl leading-relaxed">
              Vetted Saudi chauffeurs assigned to VIP pilgrim arrivals. Direct WhatsApp dispatch links, vehicle plate registry, multilingual competencies, and real-time duty status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-xs font-bold text-[#0A0D14] transition-all shadow-[0_0_15px_rgba(217,160,49,0.3)] hover:scale-[1.02] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register Chauffeur</span>
            </button>

            <button
              onClick={fetchDrivers}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#171D2B] hover:bg-[#1E2536] text-xs font-bold text-[#D2D8E4] border border-[#283246] transition-all hover:border-[#D9A031]/40 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#D9A031]' : ''}`} />
              <span>Refresh Roster</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. FEEDBACK BANNER */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs font-medium animate-fadeIn ${
            feedback.type === 'success'
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. METRIC PODS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="rounded-2xl bg-[#10141E] border border-[#1F2737] p-4 relative overflow-hidden group hover:border-[#D9A031]/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-[#9DA6B8]">Total Roster</span>
            <UserCheck className="w-4 h-4 text-[#D9A031]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#FAF9F6]">{drivers.length}</div>
          <div className="mt-1 text-[11px] text-[#7C879B]">Vetted VIP Drivers</div>
        </div>

        <div className="rounded-2xl bg-[#10141E] border border-[#1F2737] p-4 relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-emerald-400">Active on Duty</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{activeCount}</div>
          <div className="mt-1 text-[11px] text-emerald-400/80">Available for Dispatch</div>
        </div>

        <div className="rounded-2xl bg-[#10141E] border border-[#1F2737] p-4 relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-blue-400">Assigned Fleet</span>
            <Car className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-400">{drivers.length}</div>
          <div className="mt-1 text-[11px] text-[#7C879B]">Sedan &amp; Luxury Vans</div>
        </div>

        <div className="rounded-2xl bg-[#10141E] border border-[#1F2737] p-4 relative overflow-hidden group hover:border-[#D9A031]/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-[#D9A031]">Protocol Rating</span>
            <Award className="w-4 h-4 text-[#D9A031]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#FAF9F6]">4.98 ★</div>
          <div className="mt-1 text-[11px] text-[#7C879B]">Pilgrim Satisfaction</div>
        </div>
      </div>

      {/* 4. CONTROLS BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#10141E] p-3 sm:p-4 rounded-xl border border-[#1F2737]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, vehicle plate, or model..."
            className="w-full bg-[#161C2A] text-xs text-[#FAF9F6] pl-9 pr-4 py-2.5 rounded-lg border border-[#232B3E] focus:outline-none focus:border-[#D9A031] transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {['all', 'active', 'inactive'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                statusFilter === s
                  ? 'bg-[#D9A031] text-[#0A0D14]'
                  : 'bg-[#161C2A] text-[#8E99AF] hover:text-[#FAF9F6] border border-[#232B3E]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* 5. DRIVERS ROSTER CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDrivers.map((driver) => (
          <div
            key={driver.id}
            className="rounded-2xl bg-[#10141E] border border-[#1F2737] hover:border-[#D9A031]/40 transition-all p-5 shadow-lg flex flex-col justify-between group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1C2333] to-[#121724] border border-[#2B354D] flex items-center justify-center text-[#D9A031] font-bold text-lg">
                    {driver.name.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#FAF9F6] group-hover:text-[#E5B842] transition-colors">
                      {driver.name}
                    </h3>
                    <div className="text-[11px] text-[#7C879B] flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-[#D9A031]" />
                      <a
                        href={`https://wa.me/${driver.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline text-gray-300 font-mono"
                      >
                        {driver.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    driver.is_active
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {driver.is_active ? 'Active' : 'Off Duty'}
                </span>
              </div>

              {/* Vehicle Assignment */}
              <div className="bg-[#141A26] rounded-xl p-3 border border-[#1F2738] mb-3">
                <div className="text-[10px] text-[#7C879B] uppercase tracking-wider mb-1">Assigned VIP Vehicle</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FAF9F6] flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#D9A031]" />
                    {driver.vehicle_model}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#D9A031] bg-[#D9A031]/10 px-2 py-0.5 rounded border border-[#D9A031]/20">
                    {driver.vehicle_plate}
                  </span>
                </div>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <div className="text-[10px] text-[#7C879B] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-cyan-400" />
                  <span>Languages</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(driver.spoken_languages || ['Arabic', 'English']).map((lang) => (
                    <span
                      key={lang}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#1B2333] text-gray-300 border border-[#28334A]"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-3 border-t border-[#1C2333] flex items-center justify-between">
              <a
                href={`https://wa.me/${driver.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `السلام عليكم كابتن ${driver.name}، تحياتنا من إدارة عمليات ضيوف الرحمن VIP.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>WhatsApp Chauffeur</span>
              </a>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(driver)}
                  className="p-1.5 rounded-lg bg-[#161C2A] hover:bg-[#1E2536] text-gray-300 hover:text-[#D9A031] border border-[#232B3E] transition-colors cursor-pointer"
                  title="Edit Chauffeur Profile"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteDriver(driver.id, driver.name)}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                  title="Remove Driver"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDrivers.length === 0 && !loading && (
        <div className="text-center py-12 bg-[#10141E] rounded-2xl border border-[#1F2737] text-gray-400">
          <UserCheck className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <p className="text-sm font-medium">No chauffeurs match your filter criteria.</p>
        </div>
      )}

      {/* 6. CREATE / EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0E131F] border border-[#232B3E] rounded-2xl p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#1F2737] pb-3">
              <h2 className="text-base font-bold text-[#FAF9F6] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D9A031]" />
                <span>{isCreating ? 'Register VIP Chauffeur' : 'Edit Chauffeur Profile'}</span>
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDriver} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Captain Ahmad Al-Harbi"
                  className="w-full bg-[#161C2A] text-xs text-white px-3 py-2 rounded-lg border border-[#232B3E] focus:outline-none focus:border-[#D9A031]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">WhatsApp Phone</label>
                  <input
                    type="text"
                    required
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+9665xxxxxxxx"
                    className="w-full bg-[#161C2A] text-xs text-white px-3 py-2 rounded-lg border border-[#232B3E] focus:outline-none focus:border-[#D9A031] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Vehicle License Plate</label>
                  <input
                    type="text"
                    required
                    value={formData.vehicle_plate || ''}
                    onChange={(e) => setFormData({ ...formData, vehicle_plate: e.target.value })}
                    placeholder="e.g. KSA 7777 VIP"
                    className="w-full bg-[#161C2A] text-xs text-white px-3 py-2 rounded-lg border border-[#232B3E] focus:outline-none focus:border-[#D9A031] font-mono uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Assigned VIP Vehicle Model</label>
                <select
                  value={formData.vehicle_model || VEHICLE_OPTIONS[0]}
                  onChange={(e) => setFormData({ ...formData, vehicle_model: e.target.value })}
                  className="w-full bg-[#161C2A] text-xs text-white px-3 py-2 rounded-lg border border-[#232B3E] focus:outline-none focus:border-[#D9A031]"
                >
                  {VEHICLE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">Languages Spoken</label>
                <div className="flex flex-wrap gap-1.5">
                  {AVAILABLE_LANGUAGES.map((lang) => {
                    const selected = (formData.spoken_languages || []).includes(lang);
                    return (
                      <button
                        type="button"
                        key={lang}
                        onClick={() => toggleLanguage(lang)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                          selected
                            ? 'bg-[#D9A031] text-[#0A0D14] font-bold'
                            : 'bg-[#161C2A] text-gray-400 border border-[#232B3E] hover:text-white'
                        }`}
                      >
                        {lang}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="driver_active"
                  checked={formData.is_active !== false}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="rounded border-[#232B3E] bg-[#161C2A] text-[#D9A031] focus:ring-[#D9A031]"
                />
                <label htmlFor="driver_active" className="text-xs text-gray-300 font-medium cursor-pointer">
                  Chauffeur is active and available for passenger assignment
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#1F2737]">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:bg-[#161C2A] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-xs font-bold text-[#0A0D14] transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Saving...' : 'Save Chauffeur'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
