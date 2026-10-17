'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Phone,
  Shield,
  CheckCircle2,
  AlertCircle,
  Plus,
  RefreshCw,
  Sliders,
  Sparkles,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

interface WhatsAppNumber {
  id: string;
  label: string;
  number: string;
  is_active: boolean;
  priority: number;
  routing_rule: 'all_to_main' | 'round_robin' | 'by_language' | 'by_working_hours' | 'main_with_fallback';
  assigned_languages: string[];
}

export default function AdminWhatsAppPage() {
  const [numbers, setNumbers] = useState<WhatsAppNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRule, setActiveRule] = useState<string>('main_with_fallback');
  const [savingRule, setSavingRule] = useState(false);

  // Add Number Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newPriority, setNewPriority] = useState(3);
  const [addingNumber, setAddingNumber] = useState(false);

  // Routing Test Simulator
  const [testLang, setTestLang] = useState('ar');
  const [simulatedResult, setSimulatedResult] = useState<string | null>(null);

  const fetchNumbers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/whatsapp');
      const data = await res.json();
      if (data.numbers) {
        setNumbers(data.numbers);
        if (data.numbers.length > 0) {
          setActiveRule(data.numbers[0].routing_rule || 'main_with_fallback');
        }
      }
    } catch (err) {
      console.error('Error fetching numbers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNumbers();
  }, []);

  const handleUpdateRule = async (rule: string) => {
    setActiveRule(rule);
    setSavingRule(true);
    try {
      const res = await fetch('/api/admin/whatsapp', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routing_rule: rule }),
      });
      if (res.ok) {
        setNumbers((prev) => prev.map((n) => ({ ...n, routing_rule: rule as any })));
      }
    } catch (err) {
      console.error('Error updating routing rule:', err);
    } finally {
      setSavingRule(false);
    }
  };

  const handleToggleActive = async (id: string, currentState: boolean) => {
    const newState = !currentState;
    try {
      const res = await fetch('/api/admin/whatsapp', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_active: newState }),
      });
      if (res.ok) {
        setNumbers((prev) =>
          prev.map((n) => (n.id === id ? { ...n, is_active: newState } : n))
        );
      }
    } catch (err) {
      console.error('Error toggling active state:', err);
    }
  };

  const handleAddNumber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newNumber) return;
    setAddingNumber(true);

    try {
      const res = await fetch('/api/admin/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: newLabel,
          number: newNumber,
          priority: Number(newPriority) || 3,
          routing_rule: activeRule,
          assigned_languages: ['en'],
        }),
      });

      const data = await res.json();
      if (data.success && data.created) {
        setNumbers((prev) => [...prev, data.created]);
        setNewLabel('');
        setNewNumber('');
        setShowAddForm(false);
      }
    } catch (err) {
      console.error('Error adding number:', err);
    } finally {
      setAddingNumber(false);
    }
  };

  const runSimulation = () => {
    const activeOnes = numbers.filter((n) => n.is_active);
    if (activeOnes.length === 0) {
      setSimulatedResult('No active numbers configured!');
      return;
    }

    const main = activeOnes.find((n) => n.priority === 1) || activeOnes[0];
    const secondary = activeOnes.find((n) => n.priority === 2) || activeOnes[1] || main;

    if (activeRule === 'all_to_main') {
      setSimulatedResult(`Routes to: ${main.label} (+${main.number}) via All to Main rule.`);
    } else if (activeRule === 'by_language') {
      const match = activeOnes.find((n) => n.assigned_languages.includes(testLang));
      if (match) {
        setSimulatedResult(`Routes to: ${match.label} (+${match.number}) matched by language [${testLang.toUpperCase()}].`);
      } else {
        setSimulatedResult(`Routes to: ${main.label} (+${main.number}) as primary language fallback.`);
      }
    } else if (activeRule === 'round_robin') {
      setSimulatedResult(`Round-robin active: alternately distributed between Main (+${main.number}) and Secondary (+${secondary.number}).`);
    } else {
      setSimulatedResult(`Routes to: ${main.label} (+${main.number}) with Secondary (+${secondary.number}) on standby.`);
    }
  };

  return (
    <div className="space-y-8 text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#FAF9F6]">
            WhatsApp Dispatch &amp; Operator Routing
          </h1>
          <p className="text-xs text-[#A0A6B2] mt-1 font-light">
            Manage operational numbers (966567588261 / 966505316971) and automated pilgrim lead distribution rules
          </p>
        </div>
        <button
          onClick={fetchNumbers}
          className="px-4 py-2 rounded-xl bg-[#14171C] border border-[#262B33] hover:border-[#D9A031]/40 text-[#FAF9F6] text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#D9A031]' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* SELECTABLE ROUTING RULES */}
      <div className="bg-[#14171C] rounded-2xl border border-[#262B33] p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-5 h-5 text-[#D9A031]" />
          <h2 className="font-display font-bold text-lg text-[#FAF9F6]">
            Active Lead Routing Rule
          </h2>
        </div>
        <p className="text-xs text-[#A0A6B2] mb-6 font-light">
          Choose how leads from the website, pricing cards, and contact form are distributed among your team:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'all_to_main',
              title: 'All to Main (100%)',
              desc: 'Directs all pilgrim clicks directly to the Main number (966567588261).',
            },
            {
              id: 'main_with_fallback',
              title: 'Main with Fallback',
              desc: 'Main number receives primary inquiries, with Secondary operator as immediate backup.',
            },
            {
              id: 'round_robin',
              title: 'Round-Robin (50 / 50)',
              desc: 'Alternates inquiries evenly between Main and Secondary operators for balanced workload.',
            },
            {
              id: 'by_language',
              title: 'By Pilgrim Language',
              desc: 'Routes visitors to the operator fluent in their specific language (Arabic, Malay, English).',
            },
          ].map((rule) => {
            const isSelected = activeRule === rule.id;
            return (
              <div
                key={rule.id}
                onClick={() => handleUpdateRule(rule.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#D9A031] bg-[#D9A031]/10 shadow-xs'
                    : 'border-[#262B33] bg-[#0D0F12] hover:border-[#D9A031]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-[#FAF9F6]">{rule.title}</span>
                    <input
                      type="radio"
                      checked={isSelected}
                      onChange={() => handleUpdateRule(rule.id)}
                      className="accent-[#D9A031]"
                    />
                  </div>
                  <p className="text-xs text-[#A0A6B2] leading-relaxed font-light">{rule.desc}</p>
                </div>
                {isSelected && (
                  <div className="mt-3 pt-2 border-t border-[#D9A031]/20 flex items-center gap-1.5 text-[11px] font-bold text-[#D9A031]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active Production Rule</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* REGISTERED WHATSAPP NUMBERS TABLE */}
      <div className="bg-[#14171C] rounded-2xl border border-[#262B33] overflow-hidden">
        <div className="p-5 border-b border-[#262B33] flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-[#FAF9F6]">
              Operator Numbers Directory
            </h3>
            <p className="text-xs text-[#A0A6B2]">
              All official numbers in rotation with their priority and language assignments
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-1.5 rounded-xl bg-[#D9A031] text-[#0D0F12] text-xs font-bold hover:bg-[#B8821F] flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Operator</span>
          </button>
        </div>

        {/* ADD NUMBER FORM */}
        {showAddForm && (
          <form onSubmit={handleAddNumber} className="p-5 bg-[#0D0F12] border-b border-[#262B33] space-y-4">
            <h4 className="text-xs font-bold text-[#FAF9F6] uppercase tracking-wider">
              Register New Dispatch Operator
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-[#A0A6B2] mb-1">Operator Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Night Shift Operator"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#14171C] border border-[#262B33] text-[#FAF9F6] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#A0A6B2] mb-1">WhatsApp Number (with country code)</label>
                <input
                  type="text"
                  required
                  placeholder="966501234567"
                  value={newNumber}
                  onChange={(e) => setNewNumber(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#14171C] border border-[#262B33] text-[#FAF9F6] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#A0A6B2] mb-1">Priority Rank (1 = Primary)</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={newPriority}
                  onChange={(e) => setNewPriority(Number(e.target.value))}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#14171C] border border-[#262B33] text-[#FAF9F6] outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl text-xs text-[#A0A6B2] hover:text-[#FAF9F6]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={addingNumber}
                className="px-5 py-2 rounded-xl bg-[#D9A031] text-[#0D0F12] text-xs font-bold hover:bg-[#B8821F]"
              >
                {addingNumber ? 'Registering...' : 'Save Operator'}
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="border-b border-[#262B33] bg-[#101317] text-[#A0A6B2]">
                <th className="py-3 px-4 font-semibold">Priority</th>
                <th className="py-3 px-4 font-semibold">Label</th>
                <th className="py-3 px-4 font-semibold">Number</th>
                <th className="py-3 px-4 font-semibold">Assigned Languages</th>
                <th className="py-3 px-4 font-semibold">Active Status</th>
                <th className="py-3 px-4 font-semibold text-end">Direct WhatsApp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262B33]">
              {numbers.map((n) => (
                <tr key={n.id} className="hover:bg-[#1A1F26] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#D9A031]">
                    #{n.priority}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#FAF9F6]">
                    {n.label}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#FAF9F6] dir-ltr">
                    +{n.number}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {n.assigned_languages?.map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-0.5 rounded bg-[#20252D] text-[10px] font-mono uppercase text-[#FAF9F6] border border-[#262B33]"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleActive(n.id, n.is_active)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                        n.is_active
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                          : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                      }`}
                    >
                      {n.is_active ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-end">
                    <a
                      href={`https://wa.me/${n.number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROUTING SIMULATOR WIDGET */}
      <div className="bg-[#14171C] rounded-2xl border border-[#262B33] p-6">
        <h3 className="font-display font-bold text-lg text-[#FAF9F6] mb-1">
          Live Routing Simulation Tester
        </h3>
        <p className="text-xs text-[#A0A6B2] mb-4">
          Test which operator number will receive the visitor given the active rule and selected language:
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={testLang}
            onChange={(e) => setTestLang(e.target.value)}
            className="h-10 px-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] outline-none"
          >
            <option value="ar">Arabic (/ar)</option>
            <option value="en">English (/en)</option>
            <option value="ms">Malay (/ms)</option>
            <option value="ur">Urdu (/ur)</option>
            <option value="id">Indonesian (/id)</option>
            <option value="fr">French (/fr)</option>
          </select>
          <button
            onClick={runSimulation}
            className="px-4 py-2 rounded-xl bg-[#D9A031] text-[#0D0F12] text-xs font-bold hover:bg-[#B8821F] transition-colors"
          >
            Simulate Route
          </button>
          {simulatedResult && (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{simulatedResult}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
