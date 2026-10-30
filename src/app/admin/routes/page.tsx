'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
  Compass,
  Clock,
  Navigation,
  CheckCircle2,
  XCircle,
  PlusCircle,
  RefreshCw,
  Search,
  Edit3,
  Sparkles,
  Save,
  X,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

interface RouteRecord {
  id: string;
  origin_city: string;
  destination_city: string;
  origin_code?: string;
  destination_code?: string;
  estimated_duration_minutes: number;
  distance_km: number;
  miqat_stop_allowed: boolean;
  is_active: boolean;
  display_order: number;
  translations?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export default function AdminRoutesPage() {
  const [routes, setRoutes] = useState<RouteRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<RouteRecord>>({});
  const [saving, setSaving] = useState(false);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/routes');
      const data = await res.json();
      if (res.ok && data.routes) {
        setRoutes(data.routes);
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to fetch routes' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error fetching routes' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const filteredRoutes = useMemo(() => {
    return routes.filter((r) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.origin_city.toLowerCase().includes(q) ||
        r.destination_city.toLowerCase().includes(q);

      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && r.is_active) ||
        (statusFilter === 'inactive' && !r.is_active);

      return matchQuery && matchStatus;
    });
  }, [routes, searchQuery, statusFilter]);

  const toggleStatus = async (route: RouteRecord) => {
    const updatedStatus = !route.is_active;
    setRoutes((prev) => prev.map((r) => (r.id === route.id ? { ...r, is_active: updatedStatus } : r)));

    try {
      const res = await fetch('/api/admin/routes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: route.id, is_active: updatedStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({
          type: 'success',
          message: `Route ${route.origin_city} → ${route.destination_city} status updated.`,
        });
      } else {
        setRoutes((prev) => prev.map((r) => (r.id === route.id ? { ...r, is_active: !updatedStatus } : r)));
        setFeedback({ type: 'error', message: data.error || 'Failed to update route' });
      }
    } catch {
      setRoutes((prev) => prev.map((r) => (r.id === route.id ? { ...r, is_active: !updatedStatus } : r)));
      setFeedback({ type: 'error', message: 'Network error updating route' });
    }
  };

  const handleOpenEdit = (route: RouteRecord) => {
    setFormData({ ...route });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleOpenCreate = () => {
    setFormData({
      id: '',
      origin_city: '',
      destination_city: '',
      origin_code: '',
      destination_code: '',
      estimated_duration_minutes: 60,
      distance_km: 100,
      miqat_stop_allowed: true,
      is_active: true,
      display_order: (routes.length + 1) * 10,
    });
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleSaveRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.origin_city || !formData.destination_city) {
      setFeedback({ type: 'error', message: 'Route ID, origin, and destination are required' });
      return;
    }

    setSaving(true);
    try {
      const method = isCreating ? 'POST' : 'PATCH';
      const res = await fetch('/api/admin/routes', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedback({
          type: 'success',
          message: `Route ${formData.origin_city} → ${formData.destination_city} saved successfully.`,
        });
        setIsEditing(false);
        fetchRoutes();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to save route' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error saving route' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* 1. HERO HEADER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#101725] via-[#090D15] to-[#141D2C] border border-[#1F2C42] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.65)]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A13A]/15 border border-[#D6A13A]/30 text-xs font-bold text-[#D6A13A]">
              <Compass className="w-3.5 h-3.5" />
              <span>Duyuf Alrahman VIP • Regional Corridors Command</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F4F1E9] tracking-tight">
              Routes &amp; Travel Corridors
            </h1>

            <p className="text-xs sm:text-sm text-[#A5B0C2] font-light max-w-2xl leading-relaxed">
              Manage all 16 intercity pilgrimage routes across Jeddah KAIA, Makkah Haram, Madinah Nabawi, Taif, Riyadh, and historic Ziyarat sites. Controls Miqat stop allowances, travel distances, and duration buffers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchRoutes()}
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
              <span>Add Route</span>
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

      {/* 3. SEARCH & CONTROLS */}
      <div className="p-4 rounded-2xl bg-[#101725] border border-[#1F2C42] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#090D15] border border-[#1F2C42]">
          {(['all', 'active', 'inactive'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                statusFilter === tab
                  ? 'bg-gradient-to-r from-[#D6A13A] to-[#A97B27] text-[#090D15]'
                  : 'text-[#A5B0C2] hover:text-[#F4F1E9]'
              }`}
            >
              {tab === 'all' ? `All Routes (${routes.length})` : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A5B0C2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search route by city or ID..."
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9] focus:outline-none focus:border-[#D6A13A]"
          />
        </div>
      </div>

      {/* 4. ROUTES TABLE */}
      <div className="rounded-2xl bg-[#101725] border border-[#1F2C42] overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-[#090D15] border-b border-[#1F2C42] text-[10px] uppercase font-bold tracking-wider text-[#A5B0C2]">
              <tr>
                <th className="py-3.5 px-4 text-start">Route Corridor</th>
                <th className="py-3.5 px-4 text-start">Origin / Dest</th>
                <th className="py-3.5 px-4 text-start">Est. Duration</th>
                <th className="py-3.5 px-4 text-start">Distance</th>
                <th className="py-3.5 px-4 text-start">Miqat Stop</th>
                <th className="py-3.5 px-4 text-start">Status</th>
                <th className="py-3.5 px-4 text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2C42]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#A5B0C2]">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#D6A13A]" />
                    <span>Loading routes from database...</span>
                  </td>
                </tr>
              ) : filteredRoutes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#A5B0C2]">
                    No routes found matching current filter.
                  </td>
                </tr>
              ) : (
                filteredRoutes.map((route) => (
                  <tr key={route.id} className="hover:bg-[#141D2C] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#D6A13A]">
                      {route.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 font-bold text-[#F4F1E9]">
                        <span>{route.origin_city}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D6A13A]" />
                        <span>{route.destination_city}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#A5B0C2]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D6A13A]" />
                        <span>{route.estimated_duration_minutes} min</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-[#A5B0C2]">
                      <div className="flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5 text-[#D6A13A]" />
                        <span>{route.distance_km} km</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          route.miqat_stop_allowed
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-[#A5B0C2]'
                        }`}
                      >
                        {route.miqat_stop_allowed ? 'Allowed (Complimentary)' : 'None'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleStatus(route)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                          route.is_active
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}
                      >
                        {route.is_active ? '● Active' : '○ Disabled'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-end">
                      <button
                        onClick={() => handleOpenEdit(route)}
                        className="p-1.5 rounded-lg bg-[#090D15] hover:bg-[#1A2538] border border-[#1F2C42] text-[#D6A13A] transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
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
            className="w-full max-w-xl rounded-2xl bg-[#101725] border border-[#1F2C42] shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F2C42] bg-[#090D15]">
              <h3 className="font-display font-bold text-base text-[#F4F1E9]">
                {isCreating ? 'Create Regional Route Corridor' : `Edit Route • ${formData.id}`}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-[#A5B0C2] hover:text-[#F4F1E9]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRoute} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1">
                  Route ID (Permanent slug)
                </label>
                <input
                  type="text"
                  disabled={!isCreating}
                  value={formData.id || ''}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="e.g. jeddah-to-makkah"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs font-mono text-[#F4F1E9] disabled:opacity-50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1">
                    Origin City
                  </label>
                  <input
                    type="text"
                    value={formData.origin_city || ''}
                    onChange={(e) => setFormData({ ...formData, origin_city: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1">
                    Destination City
                  </label>
                  <input
                    type="text"
                    value={formData.destination_city || ''}
                    onChange={(e) => setFormData({ ...formData, destination_city: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.estimated_duration_minutes || 60}
                    onChange={(e) => setFormData({ ...formData, estimated_duration_minutes: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1">
                    Distance (KM)
                  </label>
                  <input
                    type="number"
                    value={formData.distance_km || 100}
                    onChange={(e) => setFormData({ ...formData, distance_km: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#090D15] border border-[#1F2C42]">
                <input
                  type="checkbox"
                  id="miqat_check"
                  checked={formData.miqat_stop_allowed ?? true}
                  onChange={(e) => setFormData({ ...formData, miqat_stop_allowed: e.target.checked })}
                  className="w-4 h-4 rounded text-[#D6A13A] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="miqat_check" className="text-xs text-[#F4F1E9] cursor-pointer">
                  Allow Complimentary Miqat Stop on this route
                </label>
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
                  {saving ? 'Saving...' : 'Save Corridor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
