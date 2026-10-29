'use client';

import React, { useState, useEffect } from 'react';
import {
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  DollarSign,
  Compass,
} from 'lucide-react';
import { AdminRouteData } from '@/types/content';

interface SeasonalMultiplier {
  id: string;
  name: string;
  multiplier: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

const SAR_TO_USD = 0.266;

export default function AdminPricingPage() {
  const [routes, setRoutes] = useState<AdminRouteData[]>([]);
  const [seasons, setSeasons] = useState<SeasonalMultiplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingRouteId, setSavingRouteId] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Currency display toggle (SAR or Both SAR/USD)
  const [showUsd, setShowUsd] = useState(true);

  // Add Route Modal state
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [newRouteId, setNewRouteId] = useState('');
  const [newOrigin, setNewOrigin] = useState('');
  const [newDestination, setNewDestination] = useState('');
  const [newDistance, setNewDistance] = useState(100);
  const [newDuration, setNewDuration] = useState(90);
  const [newRates, setNewRates] = useState({ camry: 0, staria: 0, yukon: 0, hiace: 0, coaster: 0 });

  // New Season Form
  const [showAddSeason, setShowAddSeason] = useState(false);
  const [seasonName, setSeasonName] = useState('');
  const [seasonMult, setSeasonMult] = useState(1.25);
  const [seasonStart, setSeasonStart] = useState('');
  const [seasonEnd, setSeasonEnd] = useState('');
  const [savingSeason, setSavingSeason] = useState(false);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/pricing?mode=routes');
      const data = await res.json();
      if (data.success && data.routes) {
        setRoutes(data.routes);
      }
    } catch (e) {
      console.error('Error fetching routes:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchSeasons = async () => {
    try {
      const res = await fetch('/api/admin/pricing/seasons');
      const data = await res.json();
      if (data.seasons) {
        setSeasons(data.seasons);
      }
    } catch (e) {
      console.error('Error fetching seasons:', e);
    }
  };

  useEffect(() => {
    fetchRoutes();
    fetchSeasons();
  }, []);

  const handleRateChange = (routeId: string, vehicle: keyof AdminRouteData['rates'], value: string) => {
    const num = Math.max(0, Number(value) || 0);
    setRoutes((prev) =>
      prev.map((r) => {
        if (r.id !== routeId) return r;
        const updatedRates = { ...r.rates, [vehicle]: num };
        const updatedUsd = {
          camry: Math.round(updatedRates.camry * SAR_TO_USD),
          staria: Math.round(updatedRates.staria * SAR_TO_USD),
          yukon: Math.round(updatedRates.yukon * SAR_TO_USD),
          hiace: Math.round(updatedRates.hiace * SAR_TO_USD),
          coaster: Math.round(updatedRates.coaster * SAR_TO_USD),
        };
        return { ...r, rates: updatedRates, rates_usd: updatedUsd };
      })
    );
  };

  const handleSaveRoute = async (route: AdminRouteData) => {
    setSavingRouteId(route.id);
    setSaveMessage(null);
    setSaveError(null);

    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ route }),
      });
      const data = await res.json();

      if (data.success) {
        setSaveMessage(`Rates for "${route.title}" saved & published!`);
      } else {
        setSaveError(data.error || 'Failed to save route rates');
      }
    } catch (err: any) {
      setSaveError(err.message || 'Network error saving route');
    } finally {
      setSavingRouteId(null);
    }
  };

  const handleToggleRoute = async (routeId: string) => {
    try {
      const res = await fetch(`/api/admin/pricing?routeId=${routeId}&action=toggle`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchRoutes();
      }
    } catch (e) {
      console.error('Error toggling route:', e);
    }
  };

  const handleAddRouteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRouteId.trim() || !newOrigin.trim() || !newDestination.trim()) {
      alert('Please fill out all route identifiers.');
      return;
    }

    const payload: AdminRouteData = {
      id: newRouteId.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      origin_city: newOrigin.trim(),
      destination_city: newDestination.trim(),
      title: `${newOrigin.trim()} → ${newDestination.trim()}`,
      distance_km: Number(newDistance),
      estimated_duration_minutes: Number(newDuration),
      miqat_stop_allowed: false,
      is_active: true,
      display_order: routes.length + 1,
      rates: newRates,
      rates_usd: {
        camry: Math.round(newRates.camry * SAR_TO_USD),
        staria: Math.round(newRates.staria * SAR_TO_USD),
        yukon: Math.round(newRates.yukon * SAR_TO_USD),
        hiace: Math.round(newRates.hiace * SAR_TO_USD),
        coaster: Math.round(newRates.coaster * SAR_TO_USD),
      },
    };

    const res = await fetch('/api/admin/pricing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ route: payload }),
    });

    const data = await res.json();
    if (data.success) {
      setShowAddRoute(false);
      setNewRouteId('');
      setNewOrigin('');
      setNewDestination('');
      fetchRoutes();
    } else {
      alert(data.error || 'Failed to create route');
    }
  };

  const handleCreateSeason = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSeason(true);
    try {
      const res = await fetch('/api/admin/pricing/seasons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: seasonName,
          multiplier: seasonMult,
          start_date: seasonStart,
          end_date: seasonEnd,
          is_active: true,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddSeason(false);
        setSeasonName('');
        fetchSeasons();
      } else {
        alert(data.error || 'Failed to create season');
      }
    } catch (e: any) {
      alert('Error creating season');
    } finally {
      setSavingSeason(false);
    }
  };

  const handleToggleSeason = async (id: string, currentState: boolean) => {
    try {
      await fetch('/api/admin/pricing/seasons', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: !currentState }),
      });
      fetchSeasons();
    } catch (e) {
      console.error('Error toggling season:', e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D9A031]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A031]">Pricing &amp; Catalog</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-[#FAF9F6]">
            Pricing Matrix &amp; Route Management
          </h1>
          <p className="text-sm text-[#A0A6B2] mt-0.5">
            Database single source of truth for all routes, vehicle classes, SAR/USD rates, and seasonal multipliers.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowUsd(!showUsd)}
            className="px-3 py-2 rounded-xl bg-[#121622] border border-[#232A3B] text-xs font-semibold text-[#FAF9F6] hover:border-[#D9A031]/40 transition-colors flex items-center gap-1.5"
          >
            <DollarSign className="w-3.5 h-3.5 text-[#D9A031]" />
            <span>{showUsd ? 'Show SAR Only' : 'Show SAR & USD'}</span>
          </button>
          <button
            onClick={() => setShowAddRoute(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D9A031] hover:bg-[#B88422] text-[#0D0F12] text-xs font-bold transition-colors shadow-lg shadow-[#D9A031]/10"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Route</span>
          </button>
          <button
            onClick={fetchRoutes}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1F26] border border-[#232A3B] text-xs font-semibold text-[#FAF9F6] hover:bg-[#20252D] hover:border-[#D9A031]/40 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#D9A031]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {saveMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{saveMessage}</span>
        </div>
      )}

      {saveError && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Routes & Pricing Table */}
      <div className="bg-[#121622] border border-[#232A3B] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#FAF9F6]">
            <thead className="bg-[#0D0F12] border-b border-[#232A3B] text-[11px] uppercase tracking-wider text-[#A0A6B2]">
              <tr>
                <th className="py-3.5 px-4 font-bold">Route Name &amp; ID</th>
                <th className="py-3.5 px-3 font-bold text-center">Status</th>
                <th className="py-3.5 px-3 font-bold text-right">Camry</th>
                <th className="py-3.5 px-3 font-bold text-right">Staria VIP</th>
                <th className="py-3.5 px-3 font-bold text-right">Yukon XL</th>
                <th className="py-3.5 px-3 font-bold text-right">HiAce</th>
                <th className="py-3.5 px-3 font-bold text-right">Coaster</th>
                <th className="py-3.5 px-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262B33]/60">
              {routes.map((route) => {
                const isSaving = savingRouteId === route.id;
                return (
                  <tr key={route.id} className={`hover:bg-[#1A1F26]/50 transition-colors ${!route.is_active ? 'opacity-60 bg-red-950/5' : ''}`}>
                    <td className="py-3 px-4">
                      <div className="font-bold text-sm text-[#FAF9F6]">{route.title}</div>
                      <div className="text-[10px] text-[#A0A6B2] font-mono mt-0.5">{route.id}</div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleToggleRoute(route.id)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          route.is_active
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {route.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>

                    {(['camry', 'staria', 'yukon', 'hiace', 'coaster'] as const).map((v) => (
                      <td key={v} className="py-3 px-2 text-right">
                        <div className="flex flex-col items-end gap-0.5">
                          <input
                            type="number"
                            min="0"
                            value={route.rates[v] || 0}
                            onChange={(e) => handleRateChange(route.id, v, e.target.value)}
                            className="w-20 px-2 py-1 rounded-lg bg-[#0D0F12] border border-[#232A3B] text-right text-xs font-bold text-[#FAF9F6] focus:border-[#D9A031] focus:outline-none"
                          />
                          {showUsd && (
                            <span className="text-[10px] text-[#A0A6B2] font-mono">
                              ${route.rates_usd?.[v] || Math.round((route.rates[v] || 0) * SAR_TO_USD)} USD
                            </span>
                          )}
                        </div>
                      </td>
                    ))}

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleSaveRoute(route)}
                        disabled={isSaving}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D9A031]/15 hover:bg-[#D9A031] text-[#D9A031] hover:text-[#0D0F12] font-bold text-xs transition-all"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{isSaving ? '...' : 'Save'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seasonal Multipliers Section */}
      <div className="bg-[#121622] border border-[#232A3B] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#232A3B] pb-3">
          <div>
            <h2 className="text-base font-bold text-[#FAF9F6] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D9A031]" />
              <span>Seasonal Multipliers &amp; Demand Surges</span>
            </h2>
            <p className="text-xs text-[#A0A6B2] mt-0.5">
              Seasonal surge multipliers dynamically scale base rates during Ramadan and Hajj peaks.
            </p>
          </div>
          <button
            onClick={() => setShowAddSeason(true)}
            className="px-3 py-1.5 rounded-xl bg-[#1A1F26] border border-[#232A3B] text-xs font-bold text-[#FAF9F6] hover:border-[#D9A031]/40 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-[#D9A031]" />
            <span>Add Season</span>
          </button>
        </div>

        {seasons.length === 0 ? (
          <p className="text-xs text-[#A0A6B2] py-4">No active seasonal multipliers configured.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {seasons.map((s) => (
              <div key={s.id} className="p-4 rounded-xl bg-[#0D0F12] border border-[#232A3B] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#FAF9F6]">{s.name}</span>
                  <button
                    onClick={() => handleToggleSeason(s.id, s.is_active)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      s.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {s.is_active ? 'Active' : 'Disabled'}
                  </button>
                </div>
                <div className="text-lg font-bold text-[#D9A031] font-mono">{s.multiplier}x</div>
                <div className="text-[10px] text-[#A0A6B2]">
                  {s.start_date || 'Ongoing'} → {s.end_date || 'Indefinite'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Route Modal */}
      {showAddRoute && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121622] border border-[#232A3B] max-w-lg w-full rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#232A3B] pb-3">
              <h3 className="font-bold text-sm text-[#FAF9F6]">Add New Route to Catalog</h3>
              <button onClick={() => setShowAddRoute(false)} className="text-[#A0A6B2] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddRouteSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Route Identifier (Slug)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. jeddah-to-yanbu"
                  value={newRouteId}
                  onChange={(e) => setNewRouteId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Origin City / Station</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jeddah KAIA"
                    value={newOrigin}
                    onChange={(e) => setNewOrigin(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Destination City / Hotel</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yanbu Port"
                    value={newDestination}
                    onChange={(e) => setNewDestination(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
                  />
                </div>
              </div>

              <div className="border-t border-[#232A3B] pt-3">
                <span className="block text-xs font-bold text-[#D9A031] mb-2">Base Rates in SAR (0 = Inactive / Quote only)</span>
                <div className="grid grid-cols-5 gap-2">
                  {(['camry', 'staria', 'yukon', 'hiace', 'coaster'] as const).map((v) => (
                    <div key={v}>
                      <span className="block text-[10px] uppercase font-bold text-[#A0A6B2] mb-1">{v}</span>
                      <input
                        type="number"
                        min="0"
                        value={newRates[v]}
                        onChange={(e) => setNewRates({ ...newRates, [v]: Number(e.target.value) || 0 })}
                        className="w-full px-2 py-1.5 rounded-lg bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] text-right"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddRoute(false)}
                  className="px-4 py-2 rounded-xl bg-[#1A1F26] text-xs font-semibold text-[#FAF9F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D9A031] text-xs font-bold text-[#0D0F12]"
                >
                  Create Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Season Modal */}
      {showAddSeason && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121622] border border-[#232A3B] max-w-md w-full rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#232A3B] pb-3">
              <h3 className="font-bold text-sm text-[#FAF9F6]">Add Seasonal Multiplier</h3>
              <button onClick={() => setShowAddSeason(false)} className="text-[#A0A6B2] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateSeason} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Season Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramadan Last 10 Days"
                  value={seasonName}
                  onChange={(e) => setSeasonName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Multiplier (e.g. 1.25 = +25%)</label>
                <input
                  type="number"
                  step="0.05"
                  min="1"
                  max="3"
                  required
                  value={seasonMult}
                  onChange={(e) => setSeasonMult(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Start Date</label>
                  <input
                    type="date"
                    value={seasonStart}
                    onChange={(e) => setSeasonStart(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">End Date</label>
                  <input
                    type="date"
                    value={seasonEnd}
                    onChange={(e) => setSeasonEnd(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#232A3B] text-xs text-[#FAF9F6] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSeason(false)}
                  className="px-4 py-2 rounded-xl bg-[#1A1F26] text-xs font-semibold text-[#FAF9F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingSeason}
                  className="px-5 py-2 rounded-xl bg-[#D9A031] text-xs font-bold text-[#0D0F12]"
                >
                  {savingSeason ? 'Saving...' : 'Save Season'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
