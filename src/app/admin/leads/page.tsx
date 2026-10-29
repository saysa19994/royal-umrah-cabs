'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  MessageCircle,
  ArrowRight,
  RefreshCw,
  Clock,
  Sparkles,
  DollarSign,
  Calendar,
  Car,
  FileEdit,
  Check,
  TrendingUp,
  AlertTriangle,
  Phone,
  Compass,
  ArrowUpRight,
  Copy,
} from 'lucide-react';

interface LeadRecord {
  id: string;
  ref_code: string;
  reference?: string;
  whatsapp_number: string;
  page: string;
  language: string;
  route_id?: string | null;
  vehicle_id?: string | null;
  pickup_date?: string | null;
  passengers?: number | null;
  price_sar?: number | null;
  customer_name?: string | null;
  customer_phone?: string | null;
  source_utm?: any;
  status: 'new' | 'replied' | 'confirmed' | 'completed' | 'lost';
  assigned_operator_id?: string | null;
  notes?: string | null;
  created_at: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedRef, setCopiedRef] = useState<string | null>(null);

  // Note Modal
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [editingNotes, setEditingNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [convertingId, setConvertingId] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ruc_admin_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/leads?status=${statusFilter}`;
      if (currentUser?.role === 'operator' && currentUser?.assigned_whatsapp_number) {
        url += `&whatsapp_number=${encodeURIComponent(currentUser.assigned_whatsapp_number)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, currentUser]);

  const updateLeadStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus as any } : l))
        );
      }
    } catch (err) {
      console.error('Error updating lead status:', err);
    }
  };

  const handleSaveNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    setSavingNotes(true);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedLead.id, notes: editingNotes }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: editingNotes } : l))
        );
        setSelectedLead(null);
      }
    } catch (err) {
      console.error('Error saving notes:', err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleConvertToBooking = async (lead: LeadRecord) => {
    const leadRef = lead.ref_code || lead.reference;
    if (!confirm(`Convert lead ${leadRef} into an official confirmed booking in the dispatch radar?`)) return;
    setConvertingId(lead.id);
    try {
      const res = await fetch('/api/admin/leads/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: lead.id }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Lead ${leadRef} successfully converted to official booking ${data.booking.reference}!`);
        setLeads((prev) =>
          prev.map((l) => (l.id === lead.id ? { ...l, status: 'confirmed' } : l))
        );
      } else {
        alert(data.error || 'Failed to convert lead into booking.');
      }
    } catch (err: any) {
      alert(err.message || 'Error converting lead.');
    } finally {
      setConvertingId(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedRef(text);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  const filteredLeads = leads.filter((l) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const leadRef = l.ref_code || l.reference || '';
    return (
      leadRef.toLowerCase().includes(q) ||
      l.customer_name?.toLowerCase().includes(q) ||
      l.customer_phone?.includes(q) ||
      l.route_id?.toLowerCase().includes(q) ||
      l.whatsapp_number?.includes(q)
    );
  });

  const totalLeads = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const confirmedLeadsCount = leads.filter((l) => l.status === 'confirmed').length;
  const totalValueSAR = leads.reduce((acc, l) => acc + (Number(l.price_sar) || 0), 0);
  const conversionRate = totalLeads > 0 ? Math.round((confirmedLeadsCount / totalLeads) * 100) : 0;

  const now = Date.now();
  const unattendedLeads = leads.filter(
    (l) => l.status === 'new' && (now - new Date(l.created_at).getTime()) > 15 * 60 * 1000
  );
  const unattendedLeadsCount = unattendedLeads.length;

  return (
    <div className="space-y-6 text-start">
      {/* 1. EXECUTIVE COMMAND HERO BAR */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#121724] via-[#0E121B] to-[#0A0D14] border border-[#232B3E] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {/* Subtle decorative champagne gold glow in corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D9A031]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A031]/15 border border-[#D9A031]/30 text-xs font-bold text-[#E5B842]">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A031]" />
              <span>Duyuf Alrahman VIP • Inquiries &amp; WhatsApp Tracking Hub</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#FAF9F6] tracking-tight">
              Lead Inquiries &amp; Multi-Channel Routing
            </h1>

            <p className="text-xs sm:text-sm text-[#9DA6B8] font-light max-w-2xl leading-relaxed">
              Every customer WhatsApp engagement, booking form draft, and custom fare inquiry logged in real time with high-entropy audit trails and fast-track booking conversion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-xs font-bold text-[#0A0D14] transition-all shadow-[0_0_15px_rgba(217,160,49,0.3)] hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Inquiries</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. OPERATIONAL URGENT ATTENTION BANNER */}
      {unattendedLeadsCount > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-[#181119] to-rose-950/30 border border-rose-500/35 shadow-[0_4px_25px_rgba(244,63,94,0.18)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-rose-200 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
            </span>
            <div>
              <strong className="text-white">Attention Required:</strong> {unattendedLeadsCount} {unattendedLeadsCount === 1 ? 'pilgrim inquiry has' : 'pilgrim inquiries have'} been waiting over 15 minutes for a response!
            </div>
          </div>
          <button
            onClick={() => setStatusFilter('new')}
            className="px-3.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-bold text-xs border border-rose-500/40 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0"
          >
            <span>Filter New Leads ({unattendedLeadsCount})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {currentUser?.role === 'operator' && currentUser?.assigned_whatsapp_number && (
        <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/35 text-emerald-300 text-xs flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong>Scoped Operator Channel:</strong> Showing only leads routed to your assigned WhatsApp line (+{currentUser.assigned_whatsapp_number}).
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Operator Access
          </span>
        </div>
      )}

      {/* 3. EXECUTIVE KPI METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Leads */}
        <div
          onClick={() => setStatusFilter('all')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'all'
              ? 'bg-[#151C2C] border-[#3B4863] ring-1 ring-[#D9A031]/40 shadow-lg'
              : 'bg-[#10141E] border-[#1F2737] hover:border-[#2C384E]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9DA6B8]">Total Leads</span>
            <span className="w-7 h-7 rounded-lg bg-[#182030] flex items-center justify-center text-[#9DA6B8]">
              <Users className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-display text-2xl md:text-3xl font-bold text-[#FAF9F6]">{totalLeads}</span>
            <span className="text-xs text-[#6C7584]">logged</span>
          </div>
        </div>

        {/* New / Unanswered */}
        <div
          onClick={() => setStatusFilter('new')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'new'
              ? 'bg-amber-950/25 border-amber-500/50 ring-1 ring-amber-500/40 shadow-lg'
              : 'bg-[#10141E] border-[#1F2737] hover:border-amber-500/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>New / Unanswered</span>
            </span>
            {unattendedLeadsCount > 0 && (
              <span className="text-[10px] font-bold text-rose-300 bg-rose-500/20 border border-rose-500/30 px-1.5 py-0.5 rounded animate-pulse">
                {unattendedLeadsCount} &gt;15m
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-display text-2xl md:text-3xl font-bold text-amber-400">{newLeadsCount}</span>
            <span className="text-xs text-[#6C7584]">require reply</span>
          </div>
        </div>

        {/* Converted to Bookings */}
        <div
          onClick={() => setStatusFilter('confirmed')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'confirmed'
              ? 'bg-emerald-950/25 border-emerald-500/50 ring-1 ring-emerald-500/40 shadow-lg'
              : 'bg-[#10141E] border-[#1F2737] hover:border-emerald-500/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3" />
              <span>Converted</span>
            </span>
            <span className="text-[10px] text-emerald-400/80 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
              {conversionRate}% Rate
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-display text-2xl md:text-3xl font-bold text-emerald-400">{confirmedLeadsCount}</span>
            <span className="text-xs text-[#6C7584]">confirmed</span>
          </div>
        </div>

        {/* Quoted Pipeline */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#121724] to-[#0A0D14] border border-[#232B3E] shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D9A031] flex items-center gap-1.5">
              <DollarSign className="w-3 h-3" />
              <span>Quoted Pipeline</span>
            </span>
            <span className="text-[10px] text-[#A0A6B2] font-mono">
              ~${Math.round(totalValueSAR * 0.266).toLocaleString()}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-display text-2xl md:text-3xl font-bold text-[#FAF9F6]">
              {totalValueSAR.toLocaleString()}
            </span>
            <span className="text-xs text-[#D9A031] font-bold">SAR</span>
          </div>
        </div>
      </div>

      {/* 4. LUXURY FILTERS & SEARCH */}
      <div className="p-4 rounded-2xl bg-[#10141E] border border-[#1F2737] flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by Ref (REF-A- / RUC-), Name, Phone, Route..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-3 text-xs rounded-xl bg-[#0A0D14] border border-[#1F2737] text-[#FAF9F6] focus:border-[#D9A031] focus:ring-1 focus:ring-[#D9A031] outline-none"
          />
          <Search className="w-4 h-4 text-[#6C7584] absolute left-3 top-3 pointer-events-none" />
        </div>

        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {['all', 'new', 'replied', 'confirmed', 'completed', 'lost'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-gradient-to-r from-[#D9A031] to-[#B8821D] text-[#0A0D14] shadow-sm font-bold'
                  : 'bg-[#0A0D14] text-[#9DA6B8] hover:text-[#FAF9F6] border border-[#1F2737]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* 5. LUXURY LEADS DATA TABLE */}
      <div className="rounded-2xl border border-[#1F2737] overflow-hidden bg-[#10141E] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="border-b border-[#1F2737] bg-[#0A0D14] text-[#9DA6B8]">
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-[10px]">Ref Code</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-[10px]">Pilgrim / Contact</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-[10px]">Route &amp; Vehicle</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-[10px]">Date &amp; Pax</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-[10px]">Est. Fare</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-[10px]">Status</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-[10px]">Lang</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-[10px]">Logged At</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-[10px] text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2737]">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-[#6C7584]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-6 h-6 text-[#D9A031] animate-spin" />
                      <span className="text-xs">Loading inquiry radar...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-[#6C7584]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Users className="w-8 h-8 text-[#283244]" />
                      <span className="text-xs font-semibold text-[#FAF9F6]">No lead inquiries found</span>
                      <span className="text-[11px] text-[#6C7584]">Try clearing search filters or refreshing.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const cleanPhone = (lead.customer_phone || lead.whatsapp_number || '').replace(/[^0-9]/g, '');
                  const isUnattended =
                    lead.status === 'new' &&
                    now - new Date(lead.created_at).getTime() > 15 * 60 * 1000;
                  const refString = lead.ref_code || lead.reference || 'REF';

                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-[#141A28] transition-colors ${
                        isUnattended ? 'bg-rose-950/10' : ''
                      }`}
                    >
                      {/* Ref Code */}
                      <td className="py-4 px-4 font-mono font-bold text-[#E5B842]">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <span className="hover:underline cursor-pointer" onClick={() => copyToClipboard(refString)}>
                              {refString}
                            </span>
                            <button
                              onClick={() => copyToClipboard(refString)}
                              className="text-[#6C7584] hover:text-[#FAF9F6] p-0.5 rounded transition-colors"
                              title="Copy Ref Code"
                            >
                              {copiedRef === refString ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          {isUnattended && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse w-fit font-sans">
                              ⚠️ &gt;15m Unattended
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Pilgrim / Contact */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-[#FAF9F6] flex items-center gap-1.5">
                          <span>{lead.customer_name || 'Pilgrim Inquiry'}</span>
                        </div>
                        <div className="text-[11px] font-mono text-[#9DA6B8] flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-[#D9A031]" />
                          <span>
                            {lead.customer_phone || (lead.whatsapp_number ? `Line: ${lead.whatsapp_number === '966567588261' ? 'Main (261)' : 'Secondary (971)'}` : 'Web Lead')}
                          </span>
                        </div>
                      </td>

                      {/* Route & Vehicle */}
                      <td className="py-4 px-4">
                        <div className="text-[#FAF9F6] font-medium flex items-center gap-1.5">
                          <Compass className="w-3 h-3 text-[#D9A031]" />
                          <span>{lead.route_id || 'Custom Transfer'}</span>
                        </div>
                        <div className="text-[11px] text-[#9DA6B8] capitalize flex items-center gap-1 mt-0.5">
                          <Car className="w-3 h-3 text-[#6C7584]" />
                          <span>{lead.vehicle_id || 'Standard Fleet'}</span>
                        </div>
                      </td>

                      {/* Date & Pax */}
                      <td className="py-4 px-4">
                        <div className="text-[#FAF9F6] flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#6C7584]" />
                          <span>{lead.pickup_date || 'Flexible'}</span>
                        </div>
                        <div className="text-[11px] text-[#9DA6B8] mt-0.5">
                          {lead.passengers || 2} Passengers
                        </div>
                      </td>

                      {/* Est. Fare */}
                      <td className="py-4 px-4 font-bold text-[#FAF9F6]">
                        {lead.price_sar ? (
                          <span className="text-[#E5B842]">{lead.price_sar} SAR</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-[#182030] text-[#9DA6B8] text-[10px]">Quote</span>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border outline-none cursor-pointer bg-[#0A0D14] transition-colors ${
                            lead.status === 'new'
                              ? 'text-amber-400 border-amber-400/40'
                              : lead.status === 'replied'
                              ? 'text-blue-400 border-blue-400/40'
                              : lead.status === 'confirmed'
                              ? 'text-emerald-400 border-emerald-400/40'
                              : lead.status === 'completed'
                              ? 'text-purple-400 border-purple-400/40'
                              : 'text-rose-400 border-rose-400/40'
                          }`}
                        >
                          <option value="new">● New</option>
                          <option value="replied">● Replied</option>
                          <option value="confirmed">● Confirmed</option>
                          <option value="completed">● Completed</option>
                          <option value="lost">● Lost</option>
                        </select>
                      </td>

                      {/* Language */}
                      <td className="py-4 px-4 font-mono uppercase text-[10px] text-[#9DA6B8]">
                        <span className="px-1.5 py-0.5 rounded bg-[#161C2A] border border-[#232B3E]">
                          {lead.language}
                        </span>
                      </td>

                      {/* Logged At */}
                      <td className="py-4 px-4 text-[#6C7584] text-[11px] whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-end">
                        <div className="flex items-center justify-end gap-2">
                          {/* Direct WhatsApp */}
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                `Assalamu Alaikum ${lead.customer_name || 'Pilgrim'}, this is Duyuf Alrahman VIP dispatch regarding Ref [${lead.ref_code || lead.reference}]. How may we serve your Umrah journey?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all hover:scale-105"
                              title="Chat with Pilgrim on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* Notes */}
                          <button
                            onClick={() => {
                              setSelectedLead(lead);
                              setEditingNotes(lead.notes || '');
                            }}
                            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                              lead.notes
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 hover:bg-amber-500/25'
                                : 'bg-[#182030] text-[#9DA6B8] border-[#283246] hover:text-[#FAF9F6]'
                            }`}
                            title={lead.notes ? `Notes: ${lead.notes}` : 'Add Notes'}
                          >
                            <FileEdit className="w-3.5 h-3.5" />
                          </button>

                          {/* Convert to Booking */}
                          {lead.status !== 'confirmed' && (
                            <button
                              onClick={() => handleConvertToBooking(lead)}
                              disabled={convertingId === lead.id}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-[#0A0D14] text-[11px] font-bold transition-all shadow-[0_0_10px_rgba(217,160,49,0.25)] hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                              title="Convert directly to Confirmed Booking"
                            >
                              <span>Convert</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. LUXURY NOTES MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#10141E] border border-[#232B3E] rounded-2xl p-6 max-w-md w-full shadow-2xl text-start animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-lg text-[#FAF9F6] flex items-center gap-2">
                <FileEdit className="w-4 h-4 text-[#D9A031]" />
                <span>Lead Notes: {selectedLead.ref_code || selectedLead.reference}</span>
              </h3>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#9DA6B8] mb-4">
              Add internal operational notes, pilgrim special requests, flight numbers, or dispatch instructions.
            </p>
            <form onSubmit={handleSaveNotes} className="space-y-4">
              <textarea
                rows={4}
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                placeholder="e.g. Arriving on Qatar Airways flight QR1180, requested child seat, prefers Malay-speaking driver..."
                className="w-full p-3.5 text-xs rounded-xl bg-[#0A0D14] border border-[#232B3E] text-[#FAF9F6] focus:border-[#D9A031] outline-none resize-none leading-relaxed"
              />
              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 rounded-xl border border-[#232B3E] text-xs text-[#9DA6B8] hover:text-[#FAF9F6] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingNotes}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-[#0A0D14] font-bold text-xs transition-all shadow-[0_0_12px_rgba(217,160,49,0.3)] hover:scale-[1.02] cursor-pointer"
                >
                  {savingNotes ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
