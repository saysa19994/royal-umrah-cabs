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
  X,
  Send,
  Zap,
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

const AVAILABLE_ROUTES = [
  { id: 'jeddah-airport-to-makkah', label: 'Jeddah Airport (KAIA) → Makkah Hotel' },
  { id: 'makkah-to-jeddah-airport', label: 'Makkah Hotel → Jeddah Airport (KAIA)' },
  { id: 'jeddah-to-madinah', label: 'Jeddah Airport (KAIA) → Madinah Hotel' },
  { id: 'makkah-to-madinah', label: 'Makkah Hotel → Madinah Hotel (Via Bir Ali Miqat)' },
  { id: 'madinah-to-makkah', label: 'Madinah Hotel → Makkah Hotel (Via Bir Ali Miqat)' },
  { id: 'madinah-airport-to-hotel', label: 'Madinah Airport (MED) → Madinah Hotel' },
  { id: 'ziyarat-tour', label: 'Makkah / Madinah Holy Sites Ziyarat Tour' },
  { id: 'makkah-to-taif', label: 'Makkah Hotel → Taif Mountain Resort' },
  { id: 'taif-to-makkah', label: 'Taif Mountain Resort → Makkah Hotel' },
  { id: 'jeddah-to-taif', label: 'Jeddah Airport → Taif Resort' },
  { id: 'riyadh-airport-transfer', label: 'Riyadh Airport (KKIA) → Riyadh City' },
  { id: 'riyadh-to-makkah', label: 'Riyadh → Makkah VIP Transfer' },
  { id: 'riyadh-to-madinah', label: 'Riyadh → Madinah VIP Transfer' },
  { id: 'hourly-standard', label: 'Private Chauffeur by the Hour (Standard)' },
  { id: 'hourly-4h', label: 'Private Chauffeur 4-Hour Service' },
  { id: 'group-coaster', label: 'VIP Group Charter (Toyota Coaster)' },
];

const AVAILABLE_VEHICLES = [
  { id: 'camry', label: 'Toyota Camry VIP (4 Seats, 3 Bags)' },
  { id: 'staria', label: 'Hyundai Staria VIP (7 Seats, 6 Bags)' },
  { id: 'yukon', label: 'GMC Yukon XL VIP (7 Seats, 8 Bags)' },
  { id: 'hiace', label: 'Toyota HiAce VIP (10 Seats, 10 Bags)' },
  { id: 'coaster', label: 'Toyota Coaster VIP (21 Seats, 20 Bags)' },
];

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

  // Conversion Modal State
  const [conversionLead, setConversionLead] = useState<LeadRecord | null>(null);
  const [convertRoute, setConvertRoute] = useState('jeddah-airport-to-makkah');
  const [convertVehicle, setConvertVehicle] = useState('camry');
  const [convertDate, setConvertDate] = useState('');
  const [convertTime, setConvertTime] = useState('14:00');
  const [convertName, setConvertName] = useState('');
  const [convertPhone, setConvertPhone] = useState('');
  const [convertPax, setConvertPax] = useState('2');
  const [convertNotes, setConvertNotes] = useState('');
  const [converting, setConverting] = useState(false);

  // WhatsApp Quick Reply Modal
  const [replyLead, setReplyLead] = useState<LeadRecord | null>(null);

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

  const openConversionModal = (lead: LeadRecord) => {
    const todayStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    setConversionLead(lead);
    setConvertRoute(lead.route_id || 'jeddah-airport-to-makkah');
    setConvertVehicle(lead.vehicle_id || 'camry');
    setConvertDate(lead.pickup_date || todayStr);
    setConvertTime('14:00');
    setConvertName(lead.customer_name || '');
    setConvertPhone(lead.customer_phone || (lead.whatsapp_number ? `+${lead.whatsapp_number}` : ''));
    setConvertPax(String(lead.passengers || 2));
    setConvertNotes(lead.notes || '');
  };

  const executeConversion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!conversionLead) return;
    setConverting(true);

    try {
      const res = await fetch('/api/admin/leads/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: conversionLead.id,
          route_id: convertRoute,
          vehicle_id: convertVehicle,
          pickup_date: convertDate,
          pickup_time: convertTime,
          customer_name: convertName.trim(),
          customer_phone: convertPhone.trim(),
          passengers_count: Number(convertPax) || 2,
          special_notes: convertNotes.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.booking) {
        alert(
          `Success! Lead converted to confirmed VIP Booking:\nReference: ${data.booking.reference}\nFare: ${data.booking.final_price_sar} SAR (Cash to driver upon arrival)`
        );
        setLeads((prev) =>
          prev.map((l) => (l.id === conversionLead.id ? { ...l, status: 'confirmed' } : l))
        );
        setConversionLead(null);
      } else {
        alert(data.error || 'Failed to convert lead into booking.');
      }
    } catch (err: any) {
      alert(err.message || 'Error executing conversion.');
    } finally {
      setConverting(false);
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
    (l) => l.status === 'new' && now - new Date(l.created_at).getTime() > 15 * 60 * 1000
  );
  const unattendedLeadsCount = unattendedLeads.length;

  const buildWhatsAppMessage = (lead: LeadRecord) => {
    const ref = lead.ref_code || lead.reference || 'VIP';
    const lang = lead.language || 'ar';
    const name = lead.customer_name || '';

    if (lang === 'ar') {
      return (
        `السلام عليكم ورحمة الله وبركاته ${name ? 'أخي الكريم ' + name : 'أخي الكريم'}،\n` +
        `تحياتنا من إدارة عمليات ضيوف الرحمن VIP.\n` +
        `بخصوص استفساركم برقم مرجعي: *${ref}*\n\n` +
        `يسعدنا تأكيد توفير أحدث سيارات أسطولنا VIP مع سائقين سعوديين مؤهلين.\n` +
        `سياسة الدفع: نقدًا للسائق بعد وصولكم لوجهتكم المباركة بالسلامة.\n` +
        `هل يناسبكم تأكيد الحجز الآن؟`
      );
    } else if (lang === 'ms') {
      return (
        `Salam sejahtera ${name ? 'Tuan/Puan ' + name : 'Tuan/Puan'},\n` +
        `Salam ikhlas daripada operasi Duyuf Alrahman VIP.\n` +
        `Mengenai pertanyaan anda dengan rujukan: *${ref}*\n\n` +
        `Kami sedia menyediakan kenderaan VIP terkini untuk ibadah Umrah anda.\n` +
        `Bayaran: Tunai kepada pemandu selepas tiba di destinasi.\n` +
        `Boleh kami bantu sahkan tempahan anda sekarang?`
      );
    } else {
      return (
        `Greetings ${name ? name : 'Valued Pilgrim'},\n` +
        `This is Duyuf Alrahman VIP Operations regarding your transfer inquiry (Ref: *${ref}*).\n\n` +
        `We have luxury vehicles and professional chauffeurs ready for your arrival.\n` +
        `Payment Policy: Cash directly to your chauffeur upon reaching your destination.\n` +
        `May we proceed to confirm your VIP booking schedule?`
      );
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* 1. EXECUTIVE COMMAND HERO BAR */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#121724] via-[#0E121B] to-[#0A0D14] border border-[#232B3E] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D9A031]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A031]/15 border border-[#D9A031]/30 text-xs font-bold text-[#E5B842]">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A031]" />
              <span>Duyuf Alrahman VIP • Inquiries CRM &amp; Multi-Channel Routing</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#FAF9F6] tracking-tight">
              Lead Inquiries &amp; WhatsApp Tracking Hub
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

      {/* 3. EXECUTIVE KPI METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            <span className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-display text-2xl md:text-3xl font-bold text-amber-400">{newLeadsCount}</span>
            <span className="text-xs text-amber-400/70">needs reply</span>
          </div>
        </div>

        <div
          onClick={() => setStatusFilter('confirmed')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
            statusFilter === 'confirmed'
              ? 'bg-emerald-950/25 border-emerald-500/50 ring-1 ring-emerald-500/40 shadow-lg'
              : 'bg-[#10141E] border-[#1F2737] hover:border-emerald-500/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Confirmed Bookings</span>
            <span className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-display text-2xl md:text-3xl font-bold text-emerald-400">{confirmedLeadsCount}</span>
            <span className="text-xs text-emerald-400/70">{conversionRate}% conv</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#10141E] border border-[#1F2737]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D9A031]">Est. Pipeline Value</span>
            <span className="w-7 h-7 rounded-lg bg-[#D9A031]/15 flex items-center justify-center text-[#D9A031]">
              <DollarSign className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-display text-2xl md:text-3xl font-bold text-[#E5B842]">{totalValueSAR.toLocaleString()} SAR</span>
          </div>
        </div>
      </div>

      {/* 4. SEARCH & STATUS FILTER BAR */}
      <div className="rounded-2xl bg-[#10141E] border border-[#1F2737] p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ref code, pilgrim, route, phone..."
            className="w-full h-10 pl-9 pr-3 text-xs rounded-xl border border-[#1F2737] bg-[#0A0D14] text-[#FAF9F6] focus:border-[#D9A031] outline-none transition-colors placeholder:text-[#5F6B82]"
          />
          <Search className="w-3.5 h-3.5 text-[#5F6B82] absolute left-3 top-3.5 pointer-events-none" />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All' },
            { id: 'new', label: 'New' },
            { id: 'replied', label: 'Replied' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'completed', label: 'Completed' },
            { id: 'lost', label: 'Lost' },
          ].map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D9A031] to-[#B8821D] text-[#0A0D14] border-[#D9A031] shadow-[0_0_12px_rgba(217,160,49,0.3)]'
                    : 'bg-[#0A0D14] text-[#8E99AF] border-[#1F2737] hover:border-[#D9A031]/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. LEADS TABLE */}
      <div className="rounded-2xl bg-[#10141E] border border-[#1F2737] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start border-collapse">
            <thead>
              <tr className="bg-[#0A0D14] border-b border-[#1F2737] text-[#8E99AF] font-bold text-[10px] uppercase tracking-wider">
                <th className="py-4 px-4 text-start">Lead Ref</th>
                <th className="py-4 px-4 text-start">Pilgrim / Contact</th>
                <th className="py-4 px-4 text-start">Corridor &amp; Vehicle</th>
                <th className="py-4 px-4 text-start">Pickup Date</th>
                <th className="py-4 px-4 text-start">Est. Fare</th>
                <th className="py-4 px-4 text-start">Status</th>
                <th className="py-4 px-4 text-start">Lang</th>
                <th className="py-4 px-4 text-start">Logged</th>
                <th className="py-4 px-4 text-end">Dispatch Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2737]">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-[#8E99AF]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-[#D9A031]" />
                      <span className="text-xs">Loading Leads CRM...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-[#8E99AF]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Users className="w-8 h-8 text-[#3E495E]" />
                      <span className="text-sm font-medium text-[#FAF9F6]">No leads found matching current filter</span>
                      <span className="text-xs text-[#6C7584]">Incoming customer inquiries will appear here automatically.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const refString = lead.ref_code || lead.reference || lead.id.slice(0, 8);
                  const isUnattended =
                    lead.status === 'new' &&
                    now - new Date(lead.created_at).getTime() > 15 * 60 * 1000;
                  const cleanPhone = (lead.customer_phone || lead.whatsapp_number || '').replace(/[^0-9]/g, '');

                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-[#141A26] transition-colors ${
                        isUnattended ? 'bg-rose-950/10' : ''
                      }`}
                    >
                      {/* Ref */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-[#FAF9F6] bg-[#161C2A] px-2 py-0.5 rounded border border-[#232B3E]">
                              {refString}
                            </span>
                            <button
                              onClick={() => copyToClipboard(refString)}
                              className="p-1 rounded hover:bg-[#232B3E] text-[#8E99AF] hover:text-[#FAF9F6] cursor-pointer"
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
                        <div className="font-semibold text-[#FAF9F6]">
                          {lead.customer_name || 'Pilgrim Inquiry'}
                        </div>
                        <div className="text-[11px] font-mono text-[#9DA6B8] flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3 text-[#D9A031]" />
                          <span>
                            {lead.customer_phone ||
                              (lead.whatsapp_number ? `Line: +${lead.whatsapp_number}` : 'Web Lead')}
                          </span>
                        </div>
                      </td>

                      {/* Corridor & Vehicle */}
                      <td className="py-4 px-4">
                        <div className="text-[#FAF9F6] font-medium flex items-center gap-1.5">
                          <Compass className="w-3 h-3 text-[#D9A031]" />
                          <span>{lead.route_id || 'Custom Corridor'}</span>
                        </div>
                        <div className="text-[11px] text-[#9DA6B8] capitalize flex items-center gap-1 mt-0.5">
                          <Car className="w-3 h-3 text-[#6C7584]" />
                          <span>{lead.vehicle_id || 'Standard Fleet'}</span>
                        </div>
                      </td>

                      {/* Pickup Date */}
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
                          <span className="px-2 py-0.5 rounded bg-[#182030] text-[#9DA6B8] text-[10px]">
                            Custom Quote
                          </span>
                        )}
                      </td>

                      {/* Status */}
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

                      {/* Lang */}
                      <td className="py-4 px-4 font-mono uppercase text-[10px] text-[#9DA6B8]">
                        <span className="px-1.5 py-0.5 rounded bg-[#161C2A] border border-[#232B3E]">
                          {lead.language}
                        </span>
                      </td>

                      {/* Logged */}
                      <td className="py-4 px-4 text-[#6C7584] text-[11px] whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      {/* Dispatch Actions */}
                      <td className="py-4 px-4 text-end">
                        <div className="flex items-center justify-end gap-2">
                          {/* WhatsApp Responder */}
                          {cleanPhone && (
                            <button
                              onClick={() => setReplyLead(lead)}
                              className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all hover:scale-105 cursor-pointer"
                              title="Fast-Track WhatsApp Response"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>
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
                              onClick={() => openConversionModal(lead)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-[#0A0D14] text-[11px] font-bold transition-all shadow-[0_0_10px_rgba(217,160,49,0.25)] hover:scale-[1.02] cursor-pointer"
                              title="Convert to Confirmed VIP Booking"
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

      {/* 6. CONVERSION MODAL */}
      {conversionLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E131F] border border-[#232B3E] rounded-2xl p-6 max-w-xl w-full shadow-2xl text-start animate-scaleUp space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F2737] pb-3">
              <h3 className="font-display font-bold text-base text-[#FAF9F6] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D9A031]" />
                <span>Convert Lead to Confirmed VIP Booking</span>
              </h3>
              <button
                onClick={() => setConversionLead(null)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-[#9DA6B8]">
              Converting Lead Ref: <span className="font-mono text-[#E5B842] font-bold">{conversionLead.ref_code || conversionLead.id.slice(0, 8)}</span>. This will generate a cryptographic booking record in Supabase and enable chauffeur assignment.
            </div>

            <form onSubmit={executeConversion} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 mb-1">Customer / Pilgrim Name</label>
                  <input
                    type="text"
                    required
                    value={convertName}
                    onChange={(e) => setConvertName(e.target.value)}
                    placeholder="Pilgrim Full Name"
                    className="w-full bg-[#161C2A] text-xs text-white px-3 py-2 rounded-lg border border-[#232B3E] focus:outline-none focus:border-[#D9A031]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 mb-1">Customer WhatsApp Phone</label>
                  <input
                    type="text"
                    required
                    value={convertPhone}
                    onChange={(e) => setConvertPhone(e.target.value)}
                    placeholder="+9665xxxxxxxx"
                    className="w-full bg-[#161C2A] text-xs text-white px-3 py-2 rounded-lg border border-[#232B3E] focus:outline-none focus:border-[#D9A031] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 mb-1">Transfer Route / Corridor</label>
                <select
                  value={convertRoute}
                  onChange={(e) => setConvertRoute(e.target.value)}
                  className="w-full bg-[#161C2A] text-xs text-white px-3 py-2 rounded-lg border border-[#232B3E] focus:outline-none focus:border-[#D9A031]"
                >
                  {AVAILABLE_ROUTES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 mb-1">VIP Fleet Vehicle Class</label>
                <select
                  value={convertVehicle}
                  onChange={(e) => setConvertVehicle(e.target.value)}
                  className="w-full bg-[#161C2A] text-xs text-white px-3 py-2 rounded-lg border border-[#232B3E] focus:outline-none focus:border-[#D9A031]"
                >
                  {AVAILABLE_VEHICLES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 mb-1">Pickup Date</label>
                  <input
                    type="date"
                    required
                    value={convertDate}
                    onChange={(e) => setConvertDate(e.target.value)}
                    className="w-full bg-[#161C2A] text-xs text-white px-3 py-2 rounded-lg border border-[#232B3E] focus:outline-none focus:border-[#D9A031]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 mb-1">Pickup Time (KSA)</label>
                  <input
                    type="time"
                    required
                    value={convertTime}
                    onChange={(e) => setConvertTime(e.target.value)}
                    className="w-full bg-[#161C2A] text-xs text-white px-3 py-2 rounded-lg border border-[#232B3E] focus:outline-none focus:border-[#D9A031]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-300 mb-1">Passengers</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={convertPax}
                    onChange={(e) => setConvertPax(e.target.value)}
                    className="w-full bg-[#161C2A] text-xs text-white px-3 py-2 rounded-lg border border-[#232B3E] focus:outline-none focus:border-[#D9A031]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-300 mb-1">Special Notes / Flight Details</label>
                <input
                  type="text"
                  value={convertNotes}
                  onChange={(e) => setConvertNotes(e.target.value)}
                  placeholder="e.g. Flight SV1024, Zamzam water requested"
                  className="w-full bg-[#161C2A] text-xs text-white px-3 py-2 rounded-lg border border-[#232B3E] focus:outline-none focus:border-[#D9A031]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#141A26] border border-[#1F2737] flex items-center justify-between text-xs">
                <span className="text-[#8E99AF]">Payment Mode:</span>
                <span className="font-bold text-[#E5B842]">Cash to Chauffeur at Destination (SAR / USD)</span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1F2737]">
                <button
                  type="button"
                  onClick={() => setConversionLead(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={converting}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-[#0A0D14] text-xs font-bold transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{converting ? 'Converting...' : 'Confirm & Generate VIP Booking'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. WHATSAPP FAST-TRACK MODAL */}
      {replyLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E131F] border border-[#232B3E] rounded-2xl p-6 max-w-lg w-full shadow-2xl text-start animate-scaleUp space-y-4">
            <div className="flex items-center justify-between border-b border-[#1F2737] pb-3">
              <h3 className="font-display font-bold text-base text-[#FAF9F6] flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Fast-Track WhatsApp Reply</span>
              </h3>
              <button onClick={() => setReplyLead(null)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-[#9DA6B8]">
              Recipient: <span className="font-mono text-emerald-400 font-bold">{replyLead.customer_phone || replyLead.whatsapp_number}</span> ({replyLead.language.toUpperCase()})
            </div>

            <div className="p-3.5 rounded-xl bg-[#141A26] border border-[#1F2737] font-mono text-xs text-gray-200 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
              {buildWhatsAppMessage(replyLead)}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#1F2737]">
              <button
                onClick={() => setReplyLead(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <a
                href={`https://wa.me/${(replyLead.customer_phone || replyLead.whatsapp_number).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  buildWhatsAppMessage(replyLead)
                )}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  updateLeadStatus(replyLead.id, 'replied');
                  setReplyLead(null);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open WhatsApp &amp; Mark Replied</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 8. LUXURY NOTES MODAL */}
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
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors flex items-center justify-center text-xs cursor-pointer"
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
