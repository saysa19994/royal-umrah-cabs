'use client';

import React, { useState, useEffect } from 'react';
import {
  Save,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Sparkles,
  Plus,
  Sliders,
  DollarSign,
} from 'lucide-react';

interface RouteRow {
  id: string;
  title: string;
  camry: number;
  staria: number;
  yukon: number;
  hiace: number;
  coaster: number;
}

interface SeasonalMultiplier {
  id: string;
  name: string;
  multiplier: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

const DEFAULT_ROWS: RouteRow[] = [
  { id: 'jeddah-airport-to-makkah', title: 'Jeddah Airport (KAIA) → Makkah Hotel', camry: 200, staria: 260, yukon: 380, hiace: 340, coaster: 650 },
  { id: 'makkah-to-jeddah-airport', title: 'Makkah Hotel → Jeddah Airport (KAIA)', camry: 200, staria: 260, yukon: 380, hiace: 340, coaster: 650 },
  { id: 'makkah-to-madinah', title: 'Makkah → Madinah Al-Munawwarah', camry: 450, staria: 500, yukon: 750, hiace: 650, coaster: 1200 },
  { id: 'madinah-to-makkah', title: 'Madinah → Makkah (With Miqat Bir Ali Stop)', camry: 450, staria: 500, yukon: 750, hiace: 650, coaster: 1200 },
  { id: 'madinah-airport-to-hotel', title: 'Madinah Airport (MED) → Central Hotel', camry: 150, staria: 190, yukon: 280, hiace: 250, coaster: 550 },
  { id: 'jeddah-to-madinah', title: 'Jeddah City / Airport → Madinah Hotel', camry: 680, staria: 750, yukon: 980, hiace: 850, coaster: 1600 },
];

export default function AdminPricingPage() {
  const [rows, setRows] = useState<RouteRow[]>(DEFAULT_ROWS);
  const [seasons, setSeasons] = useState<SeasonalMultiplier[]>([]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // New Season Form
  const [showAddSeason, setShowAddSeason] = useState(false);
  const [seasonName, setSeasonName] = useState('');
  const [seasonMult, setSeasonMult] = useState(1.25);
  const [seasonStart, setSeasonStart] = useState('');
  const [seasonEnd, setSeasonEnd] = useState('');
  const [savingSeason, setSavingSeason] = useState(false);

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

  const fetchPrices = async () => {
    try {
      const res = await fetch('/api/admin/pricing');
      const data = await res.json();
      if (res.ok && data.prices && Array.isArray(data.prices) && data.prices.length > 0) {
        setRows((prevRows) => {
          return prevRows.map((row) => {
            const updatedRow = { ...row };
            for (const p of data.prices) {
              if (p.route_id === row.id && p.vehicle_id in updatedRow) {
                (updatedRow as any)[p.vehicle_id] = p.price_sar;
              }
            }
            return updatedRow;
          });
        });
      }
    } catch (e) {
      console.error('Error fetching prices from DB:', e);
    }
  };

  useEffect(() => {
    fetchSeasons();
    fetchPrices();
  }, []);

  const handleChange = (routeId: string, vehicle: keyof Omit<RouteRow, 'id' | 'title'>, value: string) => {
    const num = Number(value) || 0;
    setRows((prev) =>
      prev.map((r) => (r.id === routeId ? { ...r, [vehicle]: num } : r))
    );
  };

  const handleSave = async (route: RouteRow) => {
    setSaving(true);
    setSuccess(false);
    try {
      const vehicles: (keyof Omit<RouteRow, 'id' | 'title'>)[] = ['camry', 'staria', 'yukon', 'hiace', 'coaster'];
      for (const v of vehicles) {
        const res = await fetch('/api/admin/pricing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            route_id: route.id,
            vehicle_id: v,
            price_sar: route[v],
          }),
        });
        if (!res.ok) {
          throw new Error(`Failed to save price for ${v} on route ${route.id}`);
        }
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      console.error('Save error:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleSeason = async (id: string, currentState: boolean) => {
    const nextState = !currentState;
    try {
      const res = await fetch('/api/admin/pricing/seasons', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: nextState }),
      });
      if (res.ok) {
        setSeasons((prev) =>
          prev.map((s) => (s.id === id ? { ...s, is_active: nextState } : s))
        );
      }
    } catch (e) {
      console.error('Error toggling season:', e);
    }
  };

  const handleCreateSeason = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seasonName || !seasonStart || !seasonEnd) return;
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
        }),
      });
      const data = await res.json();
      if (data.success && data.season) {
        setSeasons((prev) => [...prev, data.season]);
        setShowAddSeason(false);
        setSeasonName('');
      }
    } catch (e) {
      console.error('Error creating season:', e);
    } finally {
      setSavingSeason(false);
    }
  };

  return (
    <div className="space-y-10 text-start">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-[#FAF9F6]">
          Pricing Matrix &amp; High Season Fares
        </h1>
        <p className="text-xs text-[#A0A6B2] mt-1 font-light">
          Set base guaranteed fares per vehicle class and configure automated peak season multipliers
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Fares updated successfully in database!</span>
        </div>
      )}

      {/* BASE ROUTE MATRIX */}
      <div className="bg-[#14171C] border border-[#262B33] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-[#262B33] flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-lg text-[#FAF9F6]">
              Standard Base Route Fares (SAR)
            </h2>
            <p className="text-xs text-[#A0A6B2]">
              Direct chauffeur rates displayed on public website and instant price cards
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start border-collapse">
            <thead>
              <tr className="bg-[#101317] border-b border-[#262B33] text-[#A0A6B2] font-semibold">
                <th className="py-3.5 px-4 text-start">Route</th>
                <th className="py-3.5 px-3 text-center">Camry (SAR)</th>
                <th className="py-3.5 px-3 text-center">Staria VIP (SAR)</th>
                <th className="py-3.5 px-3 text-center">Yukon XL (SAR)</th>
                <th className="py-3.5 px-3 text-center">HiAce (SAR)</th>
                <th className="py-3.5 px-3 text-center">Coaster (SAR)</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262B33]">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-[#1A1F26] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#FAF9F6] max-w-xs">
                    {row.title}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <input
                      type="number"
                      value={row.camry}
                      onChange={(e) => handleChange(row.id, 'camry', e.target.value)}
                      className="w-20 h-9 px-2 text-center text-xs font-mono font-bold rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                    />
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <input
                      type="number"
                      value={row.staria}
                      onChange={(e) => handleChange(row.id, 'staria', e.target.value)}
                      className="w-20 h-9 px-2 text-center text-xs font-mono font-bold rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#D9A031] focus:border-[#D9A031] outline-none"
                    />
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <input
                      type="number"
                      value={row.yukon}
                      onChange={(e) => handleChange(row.id, 'yukon', e.target.value)}
                      className="w-20 h-9 px-2 text-center text-xs font-mono font-bold rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                    />
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <input
                      type="number"
                      value={row.hiace}
                      onChange={(e) => handleChange(row.id, 'hiace', e.target.value)}
                      className="w-20 h-9 px-2 text-center text-xs font-mono font-bold rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                    />
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <input
                      type="number"
                      value={row.coaster}
                      onChange={(e) => handleChange(row.id, 'coaster', e.target.value)}
                      className="w-20 h-9 px-2 text-center text-xs font-mono font-bold rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                    />
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleSave(row)}
                      disabled={saving}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D9A031] hover:bg-[#B8821F] text-[#0D0F12] font-bold text-xs transition-colors disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEASONAL MULTIPLIERS SECTION */}
      <div className="bg-[#14171C] border border-[#262B33] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-[#262B33] flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-lg text-[#FAF9F6] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D9A031]" />
              <span>Seasonal Multipliers (Ramadan, Hajj &amp; Peak Dates)</span>
            </h2>
            <p className="text-xs text-[#A0A6B2]">
              Automatically adjusts calculated fares when a booking date falls within the designated holiday window
            </p>
          </div>
          <button
            onClick={() => setShowAddSeason(!showAddSeason)}
            className="px-3.5 py-1.5 rounded-xl bg-[#D9A031] text-[#0D0F12] text-xs font-bold hover:bg-[#B8821F] flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Peak Season</span>
          </button>
        </div>

        {/* ADD SEASON FORM */}
        {showAddSeason && (
          <form onSubmit={handleCreateSeason} className="p-5 bg-[#0D0F12] border-b border-[#262B33] space-y-4">
            <h4 className="text-xs font-bold text-[#FAF9F6] uppercase tracking-wider">
              Define Peak Multiplier Window
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] text-[#A0A6B2] mb-1">Season Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramadan 2026 Peak"
                  value={seasonName}
                  onChange={(e) => setSeasonName(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#14171C] border border-[#262B33] text-[#FAF9F6] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#A0A6B2] mb-1">Multiplier (e.g. 1.25 = +25%)</label>
                <input
                  type="number"
                  step="0.05"
                  min="1.0"
                  max="3.0"
                  required
                  value={seasonMult}
                  onChange={(e) => setSeasonMult(Number(e.target.value))}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#14171C] border border-[#262B33] text-[#FAF9F6] outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#A0A6B2] mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={seasonStart}
                  onChange={(e) => setSeasonStart(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#14171C] border border-[#262B33] text-[#FAF9F6] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#A0A6B2] mb-1">End Date</label>
                <input
                  type="date"
                  required
                  value={seasonEnd}
                  onChange={(e) => setSeasonEnd(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#14171C] border border-[#262B33] text-[#FAF9F6] outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddSeason(false)}
                className="px-4 py-2 rounded-xl text-xs text-[#A0A6B2] hover:text-[#FAF9F6]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingSeason}
                className="px-5 py-2 rounded-xl bg-[#D9A031] text-[#0D0F12] text-xs font-bold hover:bg-[#B8821F]"
              >
                {savingSeason ? 'Saving...' : 'Add Season'}
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="border-b border-[#262B33] bg-[#101317] text-[#A0A6B2]">
                <th className="py-3 px-4 font-semibold">Season Name</th>
                <th className="py-3 px-4 font-semibold">Multiplier Factor</th>
                <th className="py-3 px-4 font-semibold">Effective Dates</th>
                <th className="py-3 px-4 font-semibold text-end">Active Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262B33]">
              {seasons.map((s) => (
                <tr key={s.id} className="hover:bg-[#1A1F26] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#FAF9F6]">
                    {s.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#D9A031]">
                    +{Math.round((s.multiplier - 1) * 100)}% ({s.multiplier}x)
                  </td>
                  <td className="py-3.5 px-4 text-[#A0A6B2]">
                    {s.start_date} → {s.end_date}
                  </td>
                  <td className="py-3.5 px-4 text-end">
                    <button
                      onClick={() => handleToggleSeason(s.id, s.is_active)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                        s.is_active
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                          : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                      }`}
                    >
                      {s.is_active ? 'Active Now' : 'Disabled'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
