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
} from 'lucide-react';

interface LeadRecord {
  id: string;
  reference: string;
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
    if (!confirm(`Convert lead ${lead.reference} into an official confirmed booking?`)) return;
    setConvertingId(lead.id);
    try {
      const res = await fetch('/api/admin/leads/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: lead.id }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Lead converted! New Booking Ref: ${data.booking.reference}`);
        setLeads((prev) =>
          prev.map((l) => (l.id === lead.id ? { ...l, status: 'confirmed' } : l))
        );
      } else {
        alert(data.error || 'Failed to convert lead');
      }
    } catch (err: any) {
      alert(err.message || 'Error converting lead');
    } finally {
      setConvertingId(null);
    }
  };

  const filteredLeads = leads.filter((l) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      l.reference?.toLowerCase().includes(q) ||
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

  return (
    <div className="space-y-6 text-start">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#FAF9F6]">
            Lead Inquiries &amp; WhatsApp Tracking
          </h1>
          <p className="text-xs text-[#A0A6B2] mt-1 font-light">
            Every WhatsApp click, contact form inquiry, and instant quote logged for accountability
          </p>
        </div>
        <button
          onClick={fetchLeads}
          className="px-4 py-2 rounded-xl bg-[#14171C] border border-[#262B33] hover:border-[#D9A031]/40 text-[#FAF9F6] text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#D9A031]' : ''}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {currentUser?.role === 'operator' && currentUser?.assigned_whatsapp_number && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong>Scoped Operator Channel:</strong> Showing only leads routed to your WhatsApp number (+{currentUser.assigned_whatsapp_number}).
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300">
            Operator Access
          </span>
        </div>
      )}

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#14171C] p-5 rounded-2xl border border-[#262B33]">
          <span className="text-[11px] font-bold text-[#A0A6B2] uppercase tracking-wider block mb-1">
            Total Leads
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-[#FAF9F6]">{totalLeads}</span>
            <span className="text-xs text-[#6C7584]">logged</span>
          </div>
        </div>

        <div className="bg-[#14171C] p-5 rounded-2xl border border-[#262B33]">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
            New / Unanswered
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-amber-400">{newLeadsCount}</span>
            <span className="text-xs text-[#6C7584]">require reply</span>
          </div>
        </div>

        <div className="bg-[#14171C] p-5 rounded-2xl border border-[#262B33]">
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
            Converted to Bookings
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-emerald-400">{confirmedLeadsCount}</span>
            <span className="text-xs text-[#6C7584]">confirmed</span>
          </div>
        </div>

        <div className="bg-[#14171C] p-5 rounded-2xl border border-[#262B33]">
          <span className="text-[11px] font-bold text-[#D9A031] uppercase tracking-wider block mb-1">
            Quoted Pipeline
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-[#D9A031]">{totalValueSAR.toLocaleString()}</span>
            <span className="text-xs text-[#6C7584]">SAR</span>
          </div>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-[#14171C] p-4 rounded-2xl border border-[#262B33] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by Ref (RUC-), Name, Phone, Route..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] focus:border-[#D9A031] focus:ring-1 focus:ring-[#D9A031] outline-none"
          />
          <Search className="w-4 h-4 text-[#6C7584] absolute left-3 top-3 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {['all', 'new', 'replied', 'confirmed', 'completed', 'lost'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#D9A031] text-[#0D0F12]'
                  : 'bg-[#0D0F12] text-[#A0A6B2] hover:text-[#FAF9F6] border border-[#262B33]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* LEADS TABLE */}
      <div className="bg-[#14171C] rounded-2xl border border-[#262B33] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="border-b border-[#262B33] bg-[#101317] text-[#A0A6B2]">
                <th className="py-3.5 px-4 font-semibold">Ref Code</th>
                <th className="py-3.5 px-4 font-semibold">Pilgrim / Contact</th>
                <th className="py-3.5 px-4 font-semibold">Route &amp; Vehicle</th>
                <th className="py-3.5 px-4 font-semibold">Date &amp; Pax</th>
                <th className="py-3.5 px-4 font-semibold">Est. Fare</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Lang</th>
                <th className="py-3.5 px-4 font-semibold">Logged At</th>
                <th className="py-3.5 px-4 font-semibold text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262B33]">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#6C7584]">
                    Loading lead records...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#6C7584]">
                    No leads found matching current filter.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const cleanPhone = (lead.customer_phone || lead.whatsapp_number || '').replace(/[^0-9]/g, '');
                  return (
                    <tr key={lead.id} className="hover:bg-[#1A1F26] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#D9A031]">
                        {lead.reference}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#FAF9F6]">
                          {lead.customer_name || 'Pilgrim Inquiry'}
                        </div>
                        <div className="text-[11px] font-mono text-[#A0A6B2]">
                          {lead.customer_phone || lead.whatsapp_number}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-[#FAF9F6] font-medium">
                          {lead.route_id || 'Custom Transfer'}
                        </div>
                        <div className="text-[11px] text-[#A0A6B2] capitalize">
                          {lead.vehicle_id || 'Standard'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-[#FAF9F6]">
                          {lead.pickup_date || 'Flexible'}
                        </div>
                        <div className="text-[11px] text-[#A0A6B2]">
                          {lead.passengers || 2} Pax
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#FAF9F6]">
                        {lead.price_sar ? `${lead.price_sar} SAR` : 'Quote'}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border outline-none cursor-pointer bg-[#0D0F12] ${
                            lead.status === 'new'
                              ? 'text-amber-400 border-amber-400/30'
                              : lead.status === 'replied'
                              ? 'text-blue-400 border-blue-400/30'
                              : lead.status === 'confirmed'
                              ? 'text-emerald-400 border-emerald-400/30'
                              : lead.status === 'completed'
                              ? 'text-purple-400 border-purple-400/30'
                              : 'text-rose-400 border-rose-400/30'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="replied">Replied</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="lost">Lost</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 font-mono uppercase text-[#A0A6B2]">
                        {lead.language}
                      </td>
                      <td className="py-3.5 px-4 text-[#6C7584] text-[11px]">
                        {new Date(lead.created_at).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3.5 px-4 text-end">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* DIRECT WHATSAPP */}
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                `Assalamu Alaikum ${lead.customer_name || 'Pilgrim'}, this is Royal Umrah Cabs dispatch regarding Ref [${lead.reference}].`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          )}

                          {/* EDIT NOTES */}
                          <button
                            onClick={() => {
                              setSelectedLead(lead);
                              setEditingNotes(lead.notes || '');
                            }}
                            className="p-1.5 rounded-lg bg-[#20252D] text-[#A0A6B2] hover:text-[#FAF9F6] transition-colors"
                            title="Notes"
                          >
                            <FileEdit className="w-4 h-4" />
                          </button>

                          {/* CONVERT TO BOOKING BUTTON */}
                          {lead.status !== 'confirmed' && (
                            <button
                              onClick={() => handleConvertToBooking(lead)}
                              disabled={convertingId === lead.id}
                              className="px-2.5 py-1 rounded-lg bg-[#D9A031]/15 text-[#D9A031] hover:bg-[#D9A031] hover:text-[#0D0F12] text-[11px] font-bold transition-all flex items-center gap-1"
                              title="Convert to Confirmed Booking"
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

      {/* NOTES MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14171C] border border-[#262B33] rounded-2xl p-6 max-w-md w-full shadow-2xl text-start">
            <h3 className="font-display font-bold text-lg text-[#FAF9F6] mb-1">
              Lead Notes: {selectedLead.reference}
            </h3>
            <p className="text-xs text-[#A0A6B2] mb-4">
              Add internal operational notes, pilgrim requests, or follow-up status.
            </p>
            <form onSubmit={handleSaveNotes} className="space-y-4">
              <textarea
                rows={4}
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                placeholder="e.g. Requested child seat, arriving on Qatar Airways flight QR1180..."
                className="w-full p-3 text-xs rounded-xl bg-[#0D0F12] border border-[#262B33] text-[#FAF9F6] focus:border-[#D9A031] outline-none resize-none"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 rounded-xl border border-[#262B33] text-xs text-[#A0A6B2] hover:text-[#FAF9F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingNotes}
                  className="px-5 py-2 rounded-xl bg-[#D9A031] text-[#0D0F12] font-bold text-xs hover:bg-[#B8821F] transition-colors"
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
