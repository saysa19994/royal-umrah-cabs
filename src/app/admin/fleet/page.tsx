'use client';

import React, { useState, useEffect } from 'react';
import { Car, CheckCircle2, XCircle, Save, Users, Luggage } from 'lucide-react';

interface VehicleRecord {
  id: string;
  name: string;
  category: string;
  seats: number;
  bags: number;
  is_active: boolean;
}

const DEFAULT_FLEET: VehicleRecord[] = [
  { id: 'staria', name: 'Hyundai Staria VIP', category: 'Family Van', seats: 7, bags: 6, is_active: true },
  { id: 'yukon', name: 'GMC Yukon XL', category: 'Luxury VIP SUV', seats: 7, bags: 8, is_active: true },
  { id: 'camry', name: 'Toyota Camry Sedan', category: 'Standard Sedan', seats: 4, bags: 3, is_active: true },
  { id: 'hiace', name: 'Toyota HiAce Minibus', category: 'Group Minibus', seats: 10, bags: 10, is_active: true },
  { id: 'coaster', name: 'Toyota Coaster VIP', category: 'Luxury Bus', seats: 21, bags: 20, is_active: true },
];

export default function AdminFleetPage() {
  const [fleet, setFleet] = useState<VehicleRecord[]>(DEFAULT_FLEET);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const toggleActive = (id: string) => {
    setFleet((prev) =>
      prev.map((v) => (v.id === id ? { ...v, is_active: !v.is_active } : v))
    );
  };

  const handleCapacityChange = (id: string, field: 'seats' | 'bags', val: string) => {
    const num = Number(val) || 0;
    setFleet((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: num } : v))
    );
  };

  const handleSave = async (veh: VehicleRecord) => {
    setSavingId(veh.id);
    setSuccess(false);
    try {
      await fetch('/api/admin/fleet', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(veh),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      console.error('Error saving fleet:', e);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-6 text-start">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-[#FAF9F6]">
          Fleet &amp; Capacity Manager
        </h1>
        <p className="text-xs text-[#A0A6B2] mt-1 font-light">
          Manage active vehicle classes, passenger capacities, and maximum luggage limits.
        </p>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Fleet configuration updated successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fleet.map((veh) => (
          <div
            key={veh.id}
            className={`bg-[#14171C] border rounded-2xl p-6 transition-all ${
              veh.is_active ? 'border-[#262B33]' : 'border-rose-900/40 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-lg text-[#FAF9F6]">
                  {veh.name}
                </h3>
                <span className="text-[11px] text-[#A0A6B2]">{veh.category}</span>
              </div>
              <button
                type="button"
                onClick={() => toggleActive(veh.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                  veh.is_active
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                {veh.is_active ? 'Active' : 'Inactive'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#0D0F12] border border-[#262B33] rounded-xl p-3">
                <span className="text-[11px] text-[#A0A6B2] flex items-center gap-1.5 mb-1.5">
                  <Users className="w-3.5 h-3.5 text-[#D9A031]" />
                  <span>Max Passengers</span>
                </span>
                <input
                  type="number"
                  value={veh.seats}
                  onChange={(e) => handleCapacityChange(veh.id, 'seats', e.target.value)}
                  className="w-full h-8 px-2 text-center text-xs font-mono font-bold rounded-lg border border-[#262B33] bg-[#14171C] text-[#FAF9F6] outline-none"
                />
              </div>

              <div className="bg-[#0D0F12] border border-[#262B33] rounded-xl p-3">
                <span className="text-[11px] text-[#A0A6B2] flex items-center gap-1.5 mb-1.5">
                  <Luggage className="w-3.5 h-3.5 text-[#D9A031]" />
                  <span>Max Luggage Bags</span>
                </span>
                <input
                  type="number"
                  value={veh.bags}
                  onChange={(e) => handleCapacityChange(veh.id, 'bags', e.target.value)}
                  className="w-full h-8 px-2 text-center text-xs font-mono font-bold rounded-lg border border-[#262B33] bg-[#14171C] text-[#FAF9F6] outline-none"
                />
              </div>
            </div>

            <button
              onClick={() => handleSave(veh)}
              disabled={savingId === veh.id}
              className="w-full h-10 rounded-xl bg-[#D9A031] hover:bg-[#B8821F] text-[#0D0F12] font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingId === veh.id ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
