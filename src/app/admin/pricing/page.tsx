'use client';

import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

interface RouteRow {
  id: string;
  title: string;
  camry: number;
  staria: number;
  yukon: number;
  hiace: number;
  coaster: number;
}

const DEFAULT_ROWS: RouteRow[] = [
  { id: 'jeddah-airport-to-makkah', title: 'Jeddah Airport (KAIA) → Makkah Hotel', camry: 200, staria: 260, yukon: 380, hiace: 340, coaster: 650 },
  { id: 'makkah-to-jeddah-airport', title: 'Makkah Hotel → Jeddah Airport (KAIA)', camry: 200, staria: 260, yukon: 380, hiace: 340, coaster: 650 },
  { id: 'makkah-to-madinah', title: 'Makkah → Madinah Al-Munawwarah', camry: 450, staria: 500, yukon: 750, hiace: 650, coaster: 1200 },
  { id: 'madinah-to-makkah', title: 'Madinah → Makkah (With Miqat Bir Ali Stop)', camry: 450, staria: 500, yukon: 750, hiace: 650, coaster: 1200 },
  { id: 'madinah-airport-to-hotel', title: 'Madinah Airport (MED) → Central Hotel', camry: 150, staria: 200, yukon: 300, hiace: 270, coaster: 550 },
  { id: 'jeddah-to-madinah', title: 'Jeddah City / Airport → Madinah Hotel', camry: 680, staria: 750, yukon: 1050, hiace: 900, coaster: 1600 },
];

export default function AdminPricingPage() {
  const [rows, setRows] = useState<RouteRow[]>(DEFAULT_ROWS);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

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
        await fetch('/api/admin/pricing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            route_id: route.id,
            vehicle_id: v,
            price_sar: route[v],
          }),
        });
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      console.error('Save error:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-start">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-[#FAF9F6]">
          Pricing Matrix Editor (SAR)
        </h1>
        <p className="text-xs text-[#A0A6B2] mt-1 font-light">
          Set base guaranteed fares per vehicle class. Changes take effect on the public booking engine immediately.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Fares updated successfully!</span>
        </div>
      )}

      <div className="bg-[#14171C] border border-[#262B33] rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start border-collapse">
            <thead>
              <tr className="bg-[#1C2027] border-b border-[#262B33] text-[#A0A6B2] font-semibold">
                <th className="py-3 px-4 text-start">Route</th>
                <th className="py-3 px-3 text-center">Camry (SAR)</th>
                <th className="py-3 px-3 text-center">Staria (SAR)</th>
                <th className="py-3 px-3 text-center">Yukon XL (SAR)</th>
                <th className="py-3 px-3 text-center">HiAce (SAR)</th>
                <th className="py-3 px-3 text-center">Coaster (SAR)</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262B33]">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-[#1A1F26] transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#FAF9F6] max-w-xs">
                    {row.title}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <input
                      type="number"
                      value={row.camry}
                      onChange={(e) => handleChange(row.id, 'camry', e.target.value)}
                      className="w-20 h-9 px-2 text-center text-xs font-mono font-bold rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                    />
                  </td>
                  <td className="py-3 px-3 text-center">
                    <input
                      type="number"
                      value={row.staria}
                      onChange={(e) => handleChange(row.id, 'staria', e.target.value)}
                      className="w-20 h-9 px-2 text-center text-xs font-mono font-bold rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#D9A031] focus:border-[#D9A031] outline-none"
                    />
                  </td>
                  <td className="py-3 px-3 text-center">
                    <input
                      type="number"
                      value={row.yukon}
                      onChange={(e) => handleChange(row.id, 'yukon', e.target.value)}
                      className="w-20 h-9 px-2 text-center text-xs font-mono font-bold rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                    />
                  </td>
                  <td className="py-3 px-3 text-center">
                    <input
                      type="number"
                      value={row.hiace}
                      onChange={(e) => handleChange(row.id, 'hiace', e.target.value)}
                      className="w-20 h-9 px-2 text-center text-xs font-mono font-bold rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                    />
                  </td>
                  <td className="py-3 px-3 text-center">
                    <input
                      type="number"
                      value={row.coaster}
                      onChange={(e) => handleChange(row.id, 'coaster', e.target.value)}
                      className="w-20 h-9 px-2 text-center text-xs font-mono font-bold rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                    />
                  </td>
                  <td className="py-3 px-4 text-center">
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
    </div>
  );
}
