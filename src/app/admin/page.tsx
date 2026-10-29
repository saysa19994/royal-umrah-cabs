'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Clock,
  DollarSign,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  MessageCircle,
  UserCheck,
  AlertCircle,
  Car,
  Plane,
  RefreshCw,
  ExternalLink,
  Sparkles,
  TrendingUp,
  MapPin,
  Shield,
  Star,
  Layers,
  ArrowUpRight,
  Phone,
  Eye,
  Sliders,
  Check,
} from 'lucide-react';

interface BookingRecord {
  id: string;
  reference: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string | null;
  pickup_datetime: string;
  pickup_location: string;
  dropoff_location: string;
  passengers_count: number;
  flight_number?: string | null;
  vehicle_id: string;
  status: 'new' | 'confirmed' | 'driver_assigned' | 'en_route' | 'completed' | 'cancelled';
  final_price_sar: number;
  currency_charged: string;
  final_price_currency: number;
  special_notes?: string | null;
  language: string;
  driver_name?: string | null;
  driver_phone?: string | null;
  vehicle_plate?: string | null;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [unattendedLeadsCount, setUnattendedLeadsCount] = useState(0);

  // Driver Assignment Modal State
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [savingDriver, setSavingDriver] = useState(false);

  const [currentUser, setCurrentUser] = useState<any>(null);

  // Load current user profile from localStorage or session
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vip_staff_profile');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const bookingsUrl = `/api/admin/bookings?status=${statusFilter}`;
      const leadsUrl = `/api/admin/leads?status=new`;

      const [bookingsRes, leadsRes] = await Promise.all([
        fetch(bookingsUrl).catch(() => null),
        fetch(leadsUrl).catch(() => null),
      ]);

      if (bookingsRes && bookingsRes.ok) {
        const bData = await bookingsRes.json();
        if (bData.bookings) setBookings(bData.bookings);
      }

      if (leadsRes && leadsRes.ok) {
        const lData = await leadsRes.json();
        if (lData.leads) {
          const now = Date.now();
          const unattended = lData.leads.filter((l: any) => {
            return l.status === 'new' && now - new Date(l.created_at).getTime() > 15 * 60 * 1000;
          }).length;
          setUnattendedLeadsCount(unattended);
        }
      }
    } catch (e) {
      console.error('Error fetching dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [statusFilter]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus as any } : b))
        );
      }
    } catch (e) {
      console.error('Error updating status:', e);
    }
  };

  const handleSaveDriver = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setSavingDriver(true);

    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedBooking.id,
          driver_name: driverName.trim(),
          driver_phone: driverPhone.trim(),
          vehicle_plate: vehiclePlate.trim(),
          status: 'driver_assigned',
        }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === selectedBooking.id
              ? {
                  ...b,
                  driver_name: driverName.trim(),
                  driver_phone: driverPhone.trim(),
                  vehicle_plate: vehiclePlate.trim(),
                  status: 'driver_assigned',
                }
              : b
          )
        );
        setSelectedBooking(null);
      }
    } catch (e) {
      console.error('Error assigning driver:', e);
    } finally {
      setSavingDriver(false);
    }
  };

  const openWhatsAppDispatch = (b: BookingRecord) => {
    let msg = '';
    const cleanPhone = b.customer_phone.replace(/[^0-9]/g, '');

    if (b.language === 'ar') {
      msg =
        `السلام عليكم أخي الكريم ${b.customer_name}،\n` +
        `تحياتنا من فريق عمليات ضيوف الرحمن VIP.\n\n` +
        `نود تأكيد تفاصيل رحلتكم المباركة:\n` +
        `رقم الحجز: *${b.reference}*\n` +
        `المسار: من ${b.pickup_location} إلى ${b.dropoff_location}\n` +
        `الموعد: ${new Date(b.pickup_datetime).toLocaleString('ar-SA')}\n` +
        (b.flight_number ? `رقم الرحلة الجوية: ${b.flight_number}\n` : '') +
        (b.driver_name
          ? `\n*بيانات السائق المعتمد:*\nالكابتن: ${b.driver_name}\nجوال السائق: ${b.driver_phone}\nلوحة السيارة: ${b.vehicle_plate || 'VIP Fleet'}\n`
          : '') +
        `\nالأجرة الإجمالية: *${b.final_price_sar} ريال سعودي* (الدفع نقدًا للسائق بعد وصول العميل إلى وجهته المطلوبة وانتهاء الرحلة بالكامل).\n\n` +
        `تقبل الله طاعتكم ونتمنى لكم رحلة آمنة ومريحة.`;
    } else if (b.language === 'ms') {
      msg =
        `Salam sejahtera Tuan/Puan ${b.customer_name},\n` +
        `Salam ikhlas daripada pihak operasi Duyuf Alrahman VIP.\n\n` +
        `Berikut adalah butiran pengangkutan Umrah anda:\n` +
        `No. Rujukan: *${b.reference}*\n` +
        `Laluan: Dari ${b.pickup_location} ke ${b.dropoff_location}\n` +
        `Masa Pengambilan: ${new Date(b.pickup_datetime).toLocaleString()}\n` +
        (b.flight_number ? `No. Penerbangan: ${b.flight_number}\n` : '') +
        (b.driver_name
          ? `\n*Maklumat Pemandu Anda:*\nNama Pemandu: ${b.driver_name}\nNo. Telefon: ${b.driver_phone}\nNo. Plat Kereta: ${b.vehicle_plate || 'VIP'}\n`
          : '') +
        `\nJumlah Tambang: *${b.final_price_currency} ${b.currency_charged}* (Bayar tunai kepada pemandu selepas perjalanan selesai dan tiba di destinasi).\n\n` +
        `Semoga ibadah Umrah anda mabrur dan dipermudahkan.`;
    } else {
      msg =
        `Greetings ${b.customer_name},\n` +
        `This is Duyuf Alrahman VIP Operations confirming your private transfer:\n\n` +
        `Booking Ref: *${b.reference}*\n` +
        `Pickup: ${b.pickup_location}\n` +
        `Destination: ${b.dropoff_location}\n` +
        `Scheduled Time: ${new Date(b.pickup_datetime).toLocaleString()}\n` +
        (b.flight_number ? `Flight Number: ${b.flight_number}\n` : '') +
        (b.driver_name
          ? `\n*Assigned Chauffeur:*\nName: ${b.driver_name}\nPhone: ${b.driver_phone}\nVehicle Plate: ${b.vehicle_plate || 'VIP Luxury'}\n`
          : '') +
        `\nTotal Fixed Fare: *${b.final_price_sar} SAR* (Cash paid to the driver after the journey is completed and the customer reaches the requested destination).\n\n` +
        `Our team is tracking your schedule. Have a blessed journey!`;
    }

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        b.reference.toLowerCase().includes(q) ||
        b.customer_name.toLowerCase().includes(q) ||
        b.customer_phone.includes(q) ||
        (b.flight_number && b.flight_number.toLowerCase().includes(q)) ||
        b.pickup_location.toLowerCase().includes(q) ||
        b.dropoff_location.toLowerCase().includes(q)
      );
    });
  }, [bookings, searchQuery]);

  // Aggregate Metrics
  const totalRev = bookings.reduce((sum, b) => sum + (b.final_price_sar || 0), 0);
  const totalRevUsd = Math.round(totalRev * 0.266);
  const pendingCount = bookings.filter((b) => b.status === 'new').length;
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length;
  const assignedCount = bookings.filter((b) => b.status === 'driver_assigned' || b.status === 'en_route').length;

  return (
    <div className="space-y-6 text-start">
      {/* 1. EXECUTIVE HERO COMMAND BAR */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#121622] via-[#0E121B] to-[#0A0D14] border border-[#232A3B] p-5 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {/* Subtle decorative gold glow in corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D9A031]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A031]/15 border border-[#D9A031]/30 text-xs font-bold text-[#E5B842]">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A031]" />
              <span>Duyuf Alrahman VIP • Executive Operations Center</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#FAF9F6] tracking-tight">
              Dispatch &amp; Operations Command
            </h1>

            <p className="text-xs sm:text-sm text-[#9DA6B8] font-light max-w-2xl leading-relaxed">
              Real-time pilgrim arrivals radar, automated chauffeur assignment, and multi-channel WhatsApp dispatch across Makkah, Madinah, Jeddah, Taif &amp; Riyadh.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/pricing"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#171D2B] hover:bg-[#1E2536] text-xs font-bold text-[#D2D8E4] border border-[#283246] transition-all hover:border-[#D9A031]/40 shadow-sm"
            >
              <DollarSign className="w-3.5 h-3.5 text-[#D9A031]" />
              <span>Live Pricing</span>
            </Link>

            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#171D2B] hover:bg-[#1E2536] text-xs font-bold text-[#D2D8E4] border border-[#283246] transition-all hover:border-[#D9A031]/40 shadow-sm"
            >
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>Inquiries Hub</span>
              {unattendedLeadsCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30 animate-pulse">
                  {unattendedLeadsCount}
                </span>
              )}
            </Link>

            <button
              onClick={fetchDashboardData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-xs font-bold text-[#0A0D14] transition-all shadow-[0_0_15px_rgba(217,160,49,0.3)] hover:scale-[1.02]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Control</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. OPERATIONAL ALERT BANNER (If unattended leads exist) */}
      {unattendedLeadsCount > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-[#181119] to-rose-950/30 border border-rose-500/30 shadow-[0_4px_20px_rgba(244,63,94,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-rose-200">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
            </span>
            <div>
              <strong className="text-white">Attention Required:</strong> {unattendedLeadsCount} {unattendedLeadsCount === 1 ? 'pilgrim inquiry has' : 'pilgrim inquiries have'} been waiting over 15 minutes for WhatsApp reply.
            </div>
          </div>
          <Link
            href="/admin/leads?status=new"
            className="px-3.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-bold text-xs border border-rose-500/40 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>View Unattended Leads ({unattendedLeadsCount})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Scoped Operator Notice */}
      {currentUser?.role === 'operator' && currentUser?.assigned_whatsapp_number && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong>Scoped Operator Channel:</strong> Showing bookings assigned to line (+{currentUser.assigned_whatsapp_number}).
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Operator Access
          </span>
        </div>
      )}

      {/* 3. LUXURY 6-KPI METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {/* Card 1: Total Reservations */}
        <div className="rounded-2xl bg-[#121622] border border-[#232A3B] p-4 relative overflow-hidden group hover:border-[#D9A031]/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold">Total Bookings</span>
            <Calendar className="w-4 h-4 text-[#D9A031]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#FAF9F6]">{bookings.length}</div>
          <div className="mt-1.5 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>{confirmedCount} Confirmed</span>
          </div>
        </div>

        {/* Card 2: Pending Inquiries */}
        <div className="rounded-2xl bg-[#121622] border border-[#232A3B] p-4 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold">Pending Action</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">{pendingCount}</div>
          <div className="mt-1.5 text-[11px] text-[#8E99AF] font-light">Needs Confirmation</div>
        </div>

        {/* Card 3: Assigned Drivers */}
        <div className="rounded-2xl bg-[#121622] border border-[#232A3B] p-4 relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold">Dispatched Drivers</span>
            <Car className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-400">{assignedCount}</div>
          <div className="mt-1.5 text-[11px] text-[#8E99AF] font-light">Chauffeurs on duty</div>
        </div>

        {/* Card 4: Expected Revenue (SAR) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#121622] to-[#181C28] border border-[#232A3B] p-4 relative overflow-hidden group hover:border-[#D9A031]/50 transition-all shadow-md col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold">Expected Pipeline</span>
            <DollarSign className="w-4 h-4 text-[#D9A031]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#E5B842]">
            {totalRev.toLocaleString()} <span className="text-xs font-sans text-[#8E99AF]">SAR</span>
          </div>
          <div className="mt-1.5 text-[11px] text-[#8E99AF] font-mono">
            ≈ ${totalRevUsd.toLocaleString()} USD
          </div>
        </div>

        {/* Card 5: Fleet Status */}
        <div className="rounded-2xl bg-[#121622] border border-[#232A3B] p-4 relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold">VIP Fleet Models</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">7 Active</div>
          <div className="mt-1.5 text-[11px] text-[#8E99AF] truncate font-light">Maybach, Yukon, Staria</div>
        </div>

        {/* Card 6: Database & Sync */}
        <div className="rounded-2xl bg-[#121622] border border-[#232A3B] p-4 relative overflow-hidden group hover:border-purple-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold">Sync Engine</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <div className="text-lg font-bold font-mono text-[#FAF9F6]">Live DB</div>
          <div className="mt-1 text-[11px] text-[#8E99AF] font-light">10 Locales Synced</div>
        </div>
      </div>

      {/* 4. SEARCH, FILTER PILLS & DISPATCH CONTROLS */}
      <div className="rounded-2xl bg-[#121622] border border-[#232A3B] p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search booking ref, pilgrim, phone, flight #..."
            className="w-full h-10 pl-9 pr-3 text-xs rounded-xl border border-[#283246] bg-[#0E121B] text-[#FAF9F6] focus:border-[#D9A031] outline-none transition-colors placeholder:text-[#5F6B82]"
          />
          <Search className="w-3.5 h-3.5 text-[#5F6B82] absolute left-3 top-3.5" />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All Bookings' },
            { id: 'new', label: 'New / Pending' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'driver_assigned', label: 'Driver Assigned' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((tab) => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D9A031] to-[#B8821D] text-[#0A0D14] border-[#D9A031] shadow-[0_0_12px_rgba(217,160,49,0.3)]'
                    : 'bg-[#0E121B] text-[#8E99AF] border-[#252E40] hover:border-[#D9A031]/40 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. LUXURY EXECUTIVE BOOKINGS TABLE */}
      <div className="rounded-2xl bg-[#121622] border border-[#232A3B] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start border-collapse">
            <thead>
              <tr className="bg-[#161B26] border-b border-[#232A3B] text-[#8E99AF] font-semibold">
                <th className="py-3.5 px-4 text-start">Reference Code</th>
                <th className="py-3.5 px-4 text-start">Pilgrim / Contact</th>
                <th className="py-3.5 px-4 text-start">Journey Itinerary</th>
                <th className="py-3.5 px-4 text-start">Date &amp; Flight</th>
                <th className="py-3.5 px-4 text-start">VIP Vehicle</th>
                <th className="py-3.5 px-4 text-start">Fixed Fare</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Assigned Chauffeur</th>
                <th className="py-3.5 px-4 text-center">Quick Dispatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202736]">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-[#8E99AF]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin text-[#D9A031]" />
                      <span>Loading VIP reservations...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-[#8E99AF]">
                    No bookings found matching current filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => {
                  const statusColors: Record<string, string> = {
                    new: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
                    confirmed: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
                    driver_assigned: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
                    en_route: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                    completed: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
                    cancelled: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
                  };

                  return (
                    <tr key={b.id} className="hover:bg-[#161B26]/80 transition-colors">
                      {/* Reference */}
                      <td className="py-3.5 px-4 font-mono font-bold text-[#E5B842]">
                        <div className="flex items-center gap-1.5">
                          <span>{b.reference}</span>
                        </div>
                      </td>

                      {/* Passenger */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#FAF9F6]">{b.customer_name}</div>
                        <div className="text-[11px] text-[#8E99AF] font-mono">{b.customer_phone}</div>
                        <span className="inline-block mt-0.5 px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#171D2B] text-[#D9A031] uppercase border border-[#283246]">
                          {b.language}
                        </span>
                      </td>

                      {/* Itinerary */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="text-[#FAF9F6] truncate flex items-center gap-1">
                          <span className="text-[#8E99AF] text-[10px]">From:</span>
                          <span className="font-medium truncate">{b.pickup_location}</span>
                        </div>
                        <div className="text-[#FAF9F6] truncate flex items-center gap-1 mt-0.5">
                          <span className="text-[#8E99AF] text-[10px]">To:</span>
                          <span className="font-medium truncate">{b.dropoff_location}</span>
                        </div>
                      </td>

                      {/* Date & Flight */}
                      <td className="py-3.5 px-4">
                        <div className="text-[#FAF9F6] font-medium">
                          {new Date(b.pickup_datetime).toLocaleDateString()}
                        </div>
                        <div className="text-[11px] text-[#8E99AF]">
                          {new Date(b.pickup_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {b.flight_number && (
                          <div className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-cyan-300 font-mono bg-cyan-950/40 px-1.5 py-0.2 rounded border border-cyan-800/40">
                            <Plane className="w-2.5 h-2.5" />
                            <span>{b.flight_number}</span>
                          </div>
                        )}
                      </td>

                      {/* Vehicle */}
                      <td className="py-3.5 px-4">
                        <div className="text-[#FAF9F6] font-semibold capitalize flex items-center gap-1.5">
                          <Car className="w-3.5 h-3.5 text-[#D9A031]" />
                          <span>{b.vehicle_id.replace('_', ' ')}</span>
                        </div>
                        <div className="text-[10px] text-[#8E99AF]">{b.passengers_count} Pax</div>
                      </td>

                      {/* Fare */}
                      <td className="py-3.5 px-4">
                        <div className="text-[#E5B842] font-mono font-bold text-sm">
                          {b.final_price_sar} SAR
                        </div>
                        <div className="text-[9px] text-[#8E99AF] leading-tight">
                          Cash to driver
                        </div>
                      </td>

                      {/* Status Selector */}
                      <td className="py-3.5 px-4 text-center">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          aria-label="Update status"
                          className={`text-[10px] font-bold rounded-lg border px-2 py-1 bg-[#0E121B] cursor-pointer outline-none capitalize ${
                            statusColors[b.status] || 'bg-[#20252D] text-white border-transparent'
                          }`}
                        >
                          <option value="new">New / Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="driver_assigned">Driver Assigned</option>
                          <option value="en_route">En Route</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Chauffeur Assignment */}
                      <td className="py-3.5 px-4 text-center">
                        {b.driver_name ? (
                          <div className="space-y-0.5">
                            <div className="font-bold text-[#FAF9F6]">{b.driver_name}</div>
                            <div className="text-[10px] font-mono text-[#8E99AF]">{b.driver_phone}</div>
                            <button
                              onClick={() => {
                                setSelectedBooking(b);
                                setDriverName(b.driver_name || '');
                                setDriverPhone(b.driver_phone || '');
                                setVehiclePlate(b.vehicle_plate || '');
                              }}
                              className="text-[10px] text-[#D9A031] hover:underline block mx-auto"
                            >
                              Edit Chauffeur
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedBooking(b);
                              setDriverName('');
                              setDriverPhone('');
                              setVehiclePlate('');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#182030] hover:bg-[#202B40] text-[#D2D8E4] border border-[#2B374E] text-[10px] font-bold transition-colors inline-flex items-center gap-1"
                          >
                            <UserCheck className="w-3 h-3 text-[#D9A031]" />
                            <span>Assign Chauffeur</span>
                          </button>
                        )}
                      </td>

                      {/* Quick Dispatch */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => openWhatsAppDispatch(b)}
                          title="Open WhatsApp Confirmation Dispatch"
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold transition-all inline-flex items-center gap-1.5 hover:scale-105"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Dispatch</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. CHAUFFEUR ASSIGNMENT MODAL (VIP Dark Glassmorphism) */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121622] border border-[#283246] rounded-2xl max-w-md w-full p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#232A3B]">
              <div>
                <h3 className="font-display text-lg font-bold text-[#FAF9F6]">
                  Assign VIP Chauffeur
                </h3>
                <p className="text-xs text-[#8E99AF] mt-0.5">
                  Booking Ref: <span className="font-mono text-[#D9A031] font-bold">{selectedBooking.reference}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-[#8E99AF] hover:text-white p-1 rounded-lg hover:bg-[#1A2130]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDriver} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#8E99AF] font-semibold mb-1">
                  Chauffeur Name (الكابتن) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Captain Tariq Al-Ghamdi"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#283246] bg-[#0E121B] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#8E99AF] font-semibold mb-1">
                  Chauffeur Phone (رقم الجوال مع الرمز) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +966501234567"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#283246] bg-[#0E121B] text-[#FAF9F6] focus:border-[#D9A031] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-[#8E99AF] font-semibold mb-1">
                  Vehicle License Plate &amp; Color (لوحة السيارة ولونها)
                </label>
                <input
                  type="text"
                  placeholder="e.g. أ ب ج 1234 (Black VIP Staria)"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#283246] bg-[#0E121B] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 rounded-xl bg-[#161B26] hover:bg-[#1E2536] text-[#8E99AF] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingDriver}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-[#0A0D14] font-bold shadow-[0_0_12px_rgba(217,160,49,0.3)] disabled:opacity-50"
                >
                  {savingDriver ? 'Saving...' : 'Save & Confirm Chauffeur'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
