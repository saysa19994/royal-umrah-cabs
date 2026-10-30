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
} from 'lucide-react';

interface DriverRecord {
  id: string;
  full_name: string;
  phone: string;
  license_number?: string | null;
  vehicle_id?: string | null;
  status: 'available' | 'on_trip' | 'off_duty';
  languages?: string[];
  created_at?: string;
  updated_at?: string;
}

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
        d.full_name.toLowerCase().includes(q) ||
        d.phone.includes(q) ||
        (d.vehicle_id && d.vehicle_id.toLowerCase().includes(q));

      const matchS = statusFilter === 'all' || d.status === statusFilter;
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
      full_name: '',
      phone: '+966',
      license_number: '',
      vehicle_id: 'camry',
      status: 'available',
      languages: ['ar', 'en'],
    });
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleSaveDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.phone) {
      setFeedback({ type: 'error', message: 'Full name and phone are required' });
      return;
    }

    setSaving(true);
    try {
      const method = isCreating ? 'POST' : 'PATCH';
      const res = await fetch('/api/admin/drivers', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedback({
          type: 'success',
          message: `Driver ${formData.full_name} saved successfully.`,
        });
        setIsEditing(false);
        fetchDrivers();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to save driver' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error saving driver' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDriver = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove driver ${name}?`)) return;

    try {
      const res = await fetch(`/api/admin/drivers?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: 'success', message: `Driver ${name} removed.` });
        fetchDrivers();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to delete driver' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error deleting driver' });
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* 1. HERO HEADER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#101725] via-[#090D15] to-[#141D2C] border border-[#1F2C42] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.65)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A13A]/15 border border-[#D6A13A]/30 text-xs font-bold text-[#D6A13A]">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Duyuf Alrahman VIP • Chauffeur Operations Command</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F4F1E9] tracking-tight">
              Drivers &amp; Chauffeurs Management
            </h1>

            <p className="text-xs sm:text-sm text-[#A5B0C2] font-light max-w-2xl leading-relaxed">
              Manage professional VIP chauffeurs, assigned vehicles, contact phone numbers, language capabilities (Arabic, English, Urdu, Malay), and real-time duty status.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchDrivers()}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141D2C] hover:bg-[#1A2538] border border-[#1F2C42] text-xs font-bold text-[#F4F1E9] transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A13A] to-[#A97B27] hover:from-[#E2B755] hover:to-[#B8872D] text-xs font-bold text-[#090D15] transition-all shadow-[0_0_20px_rgba(214,161,58,0.35)]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register Driver</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. FEEDBACK */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="p-1 text-white/60 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. FILTERS */}
      <div className="p-4 rounded-2xl bg-[#101725] border border-[#1F2C42] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#090D15] border border-[#1F2C42]">
          {(['all', 'available', 'on_trip', 'off_duty'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                statusFilter === tab
                  ? 'bg-gradient-to-r from-[#D6A13A] to-[#A97B27] text-[#090D15]'
                  : 'text-[#A5B0C2] hover:text-[#F4F1E9]'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A5B0C2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search driver by name, phone, or vehicle..."
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9] focus:outline-none focus:border-[#D6A13A]"
          />
        </div>
      </div>

      {/* 4. DRIVERS TABLE */}
      <div className="rounded-2xl bg-[#101725] border border-[#1F2C42] overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-[#090D15] border-b border-[#1F2C42] text-[10px] uppercase font-bold tracking-wider text-[#A5B0C2]">
              <tr>
                <th className="py-3.5 px-4 text-start">Chauffeur</th>
                <th className="py-3.5 px-4 text-start">Phone</th>
                <th className="py-3.5 px-4 text-start">Assigned Vehicle</th>
                <th className="py-3.5 px-4 text-start">License / Iqama</th>
                <th className="py-3.5 px-4 text-start">Languages</th>
                <th className="py-3.5 px-4 text-start">Duty Status</th>
                <th className="py-3.5 px-4 text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2C42]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#A5B0C2]">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#D6A13A]" />
                    <span>Loading drivers directory...</span>
                  </td>
                </tr>
              ) : filteredDrivers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#A5B0C2]">
                    No drivers found. Click "Register Driver" to add a new chauffeur.
                  </td>
                </tr>
              ) : (
                filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-[#141D2C] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#F4F1E9] text-sm">{driver.full_name}</div>
                      <div className="text-[10px] text-[#A5B0C2] font-mono">ID: {driver.id.slice(0, 8)}</div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[#D6A13A]">
                      <a href={`tel:${driver.phone}`} className="hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{driver.phone}</span>
                      </a>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#090D15] border border-[#1F2C42] font-mono text-[10px] text-[#F4F1E9] uppercase">
                        {driver.vehicle_id || 'Unassigned'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[#A5B0C2]">
                      {driver.license_number || '—'}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex gap-1">
                        {(driver.languages || ['ar', 'en']).map((lang) => (
                          <span
                            key={lang}
                            className="px-1.5 py-0.5 rounded bg-[#090D15] text-[9px] font-mono uppercase text-[#D6A13A]"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          driver.status === 'available'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : driver.status === 'on_trip'
                            ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                            : 'bg-slate-800 text-[#A5B0C2]'
                        }`}
                      >
                        {driver.status === 'available' ? '● Available' : driver.status === 'on_trip' ? '🚗 On Trip' : 'Off Duty'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(driver)}
                          className="p-1.5 rounded-lg bg-[#090D15] hover:bg-[#1A2538] border border-[#1F2C42] text-[#D6A13A]"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDriver(driver.id, driver.full_name)}
                          className="p-1.5 rounded-lg bg-[#090D15] hover:bg-rose-950/30 border border-[#1F2C42] text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODAL EDIT/CREATE */}
      {isEditing && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsEditing(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-[#101725] border border-[#1F2C42] shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F2C42] bg-[#090D15]">
              <h3 className="font-display font-bold text-base text-[#F4F1E9]">
                {isCreating ? 'Register VIP Chauffeur' : `Edit Driver • ${formData.full_name}`}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-[#A5B0C2] hover:text-[#F4F1E9]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDriver} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.full_name || ''}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="e.g. Tariq Al-Ghamdi"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1">
                  Phone (WhatsApp active)
                </label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+9665xxxxxxxx"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs font-mono text-[#F4F1E9]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1">
                    Assigned Vehicle
                  </label>
                  <select
                    value={formData.vehicle_id || 'camry'}
                    onChange={(e) => setFormData({ ...formData, vehicle_id: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9]"
                  >
                    <option value="camry">Toyota Camry VIP</option>
                    <option value="staria">Hyundai Staria VIP</option>
                    <option value="yukon">GMC Yukon XL VIP</option>
                    <option value="hiace">Toyota HiAce VIP</option>
                    <option value="coaster">Toyota Coaster VIP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status || 'available'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9]"
                  >
                    <option value="available">Available</option>
                    <option value="on_trip">On Trip</option>
                    <option value="off_duty">Off Duty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1">
                  Driver License / Iqama Reference
                </label>
                <input
                  type="text"
                  value={formData.license_number || ''}
                  onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                  placeholder="e.g. DL-SA-982341"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs font-mono text-[#F4F1E9]"
                />
              </div>

              <div className="pt-4 border-t border-[#1F2C42] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-[#141D2C] text-xs font-bold text-[#A5B0C2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D6A13A] to-[#A97B27] text-xs font-bold text-[#090D15]"
                >
                  {saving ? 'Saving...' : 'Save Driver'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
