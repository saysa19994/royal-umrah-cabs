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
  Compass,
  PlusCircle,
  Radio,
  Navigation,
  Copy,
  Zap,
  FileText,
  Printer,
  X} from 'lucide-react';

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
  const [copiedRef, setCopiedRef] = useState<string | null>(null);
  const [currencyView, setCurrencyView] = useState<'SAR' | 'USD'>('SAR');
  const [availableDrivers, setAvailableDrivers] = useState<any[]>([]);
  const [voucherBooking, setVoucherBooking] = useState<BookingRecord | null>(null);

  // Driver Assignment Modal State
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [savingDriver, setSavingDriver] = useState(false);

  // Quick Manual Booking Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creatingBooking, setCreatingBooking] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newRoute, setNewRoute] = useState('Jeddah Airport (JED) → Makkah Hotel');
  const [newVehicle, setNewVehicle] = useState('camry');
  const [newDateTime, setNewDateTime] = useState('');
  const [newPriceSar, setNewPriceSar] = useState('200');
  const [newFlightNo, setNewFlightNo] = useState('');
  const [newLang, setNewLang] = useState('ar');

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

      const [bookingsRes, leadsRes, driversRes] = await Promise.all([
        fetch(bookingsUrl).catch(() => null),
        fetch(leadsUrl).catch(() => null),
        fetch('/api/admin/drivers').catch(() => null),
      ]);

      if (driversRes && driversRes.ok) {
        const dData = await driversRes.json();
        if (dData.drivers) setAvailableDrivers(dData.drivers);
      }



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

  const handleCreateManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim() || !newCustPhone.trim()) {
      alert('Please provide customer name and phone number.');
      return;
    }
    setCreatingBooking(true);
    try {
      const pickupParts = newRoute.split('→');
      const pickupLoc = pickupParts[0]?.trim() || 'Jeddah Airport (JED)';
      const dropoffLoc = pickupParts[1]?.trim() || 'Makkah Hotel';

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: newCustName.trim(),
          customer_phone: newCustPhone.trim(),
          pickup_location: pickupLoc,
          dropoff_location: dropoffLoc,
          pickup_datetime: newDateTime || new Date(Date.now() + 3600000).toISOString(),
          vehicle_id: newVehicle,
          passengers_count: 2,
          flight_number: newFlightNo.trim() || undefined,
          language: newLang,
          booking_type: 'transfer',
          currency: 'SAR',
          bypass_captcha_internal: true,
        }),
      });

      const data = await res.json();
      if (data.success || data.booking) {
        alert('VIP Booking registered successfully!');
        setShowCreateModal(false);
        fetchDashboardData();
      } else {
        alert(data.error || 'Failed to create booking.');
      }
    } catch (err: any) {
      alert('Error creating booking: ' + err.message);
    } finally {
      setCreatingBooking(false);
    }
  };

  const copyRef = (refText: string) => {
    navigator.clipboard?.writeText(refText);
    setCopiedRef(refText);
    setTimeout(() => setCopiedRef(null), 2000);
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
      {/* 1. EXECUTIVE COMMAND HERO BAR */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#121724] via-[#0E121B] to-[#0A0D14] border border-[#232B3E] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        {/* Subtle decorative gold glow in corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D9A031]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9A031]/15 border border-[#D9A031]/30 text-xs font-bold text-[#E5B842]">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A031]" />
              <span>Duyuf Alrahman VIP • Chauffeur Dispatch Radar &amp; Operations Command</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#FAF9F6] tracking-tight">
              Fleet Operations &amp; Chauffeur Dispatch Radar
            </h1>

            <p className="text-xs sm:text-sm text-[#9DA6B8] font-light max-w-2xl leading-relaxed">
              Real-time pilgrim arrivals radar, automated chauffeur assignment, and multi-channel WhatsApp dispatch across Makkah, Madinah, Jeddah, Taif &amp; Riyadh.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-xs font-bold text-[#0A0D14] transition-all shadow-[0_0_15px_rgba(217,160,49,0.3)] hover:scale-[1.02] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create VIP Booking</span>
            </button>

            <Link
              href="/admin/leads"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#171D2B] hover:bg-[#1E2536] text-xs font-bold text-[#D2D8E4] border border-[#283246] transition-all hover:border-[#D9A031]/40 shadow-sm"
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
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#171D2B] hover:bg-[#1E2536] text-xs font-bold text-[#D2D8E4] border border-[#283246] transition-all hover:border-[#D9A031]/40 shadow-sm cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#D9A031]' : ''}`} />
              <span>Refresh Control</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. REGIONAL CORRIDORS TELEMETRY BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Jeddah KAIA Corridor */}
        <div className="p-3.5 rounded-xl bg-[#10141E] border border-[#1F2737] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#161C2A] border border-[#232B3E] flex items-center justify-center text-[#D9A031]">
              <Plane className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs font-bold text-[#FAF9F6]">Jeddah KAIA Hub</div>
              <div className="text-[10px] text-[#7C879B]">Terminals 1 &amp; North • 60m Wait</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active</span>
          </span>
        </div>

        {/* Makkah Haramain Corridor */}
        <div className="p-3.5 rounded-xl bg-[#10141E] border border-[#1F2737] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#161C2A] border border-[#232B3E] flex items-center justify-center text-[#D9A031]">
              <Compass className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs font-bold text-[#FAF9F6]">Makkah Clock Corridor</div>
              <div className="text-[10px] text-[#7C879B]">Haram Drop-offs &amp; Hotels</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Priority</span>
          </span>
        </div>

        {/* Madinah High-Speed Link */}
        <div className="p-3.5 rounded-xl bg-[#10141E] border border-[#1F2737] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#161C2A] border border-[#232B3E] flex items-center justify-center text-[#D9A031]">
              <Car className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs font-bold text-[#FAF9F6]">Madinah Highway Link</div>
              <div className="text-[10px] text-[#7C879B]">Bir Ali Miqat Stop Included</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Clear</span>
          </span>
        </div>

        {/* Taif & Riyadh VIP Hub */}
        <div className="p-3.5 rounded-xl bg-[#10141E] border border-[#1F2737] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#161C2A] border border-[#232B3E] flex items-center justify-center text-[#D9A031]">
              <Shield className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs font-bold text-[#FAF9F6]">Intercity VIP Hubs</div>
              <div className="text-[10px] text-[#7C879B]">Taif Resort &amp; Riyadh Transfers</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-[10px] font-bold">
            <span>On Demand</span>
          </span>
        </div>
      </div>

      {/* 3. OPERATIONAL ALERT BANNER (If unattended leads exist) */}
      {unattendedLeadsCount > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-[#181119] to-rose-950/30 border border-rose-500/30 shadow-[0_4px_20px_rgba(244,63,94,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-rose-200">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
            </span>
            <div>
              <strong className="text-white">Attention Required:</strong> {unattendedLeadsCount} {unattendedLeadsCount === 1 ? 'pilgrim inquiry has' : 'pilgrim inquiries have'} been waiting over 15 minutes for a WhatsApp reply.
            </div>
          </div>
          <Link
            href="/admin/leads?status=new"
            className="px-3.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-bold text-xs border border-rose-500/40 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <span>View Unattended Leads ({unattendedLeadsCount})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 4. LUXURY 6-KPI METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {/* Card 1: Total Reservations */}
        <div className="rounded-2xl bg-[#10141E] border border-[#1F2737] p-4 relative overflow-hidden group hover:border-[#D9A031]/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-[#9DA6B8]">Total Bookings</span>
            <Calendar className="w-4 h-4 text-[#D9A031]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#FAF9F6]">{bookings.length}</div>
          <div className="mt-1.5 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>{confirmedCount} Confirmed</span>
          </div>
        </div>

        {/* Card 2: Pending Inquiries */}
        <div className="rounded-2xl bg-[#10141E] border border-[#1F2737] p-4 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-amber-400">Pending Action</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">{pendingCount}</div>
          <div className="mt-1.5 text-[11px] text-[#8E99AF] font-light">Needs Dispatch</div>
        </div>

        {/* Card 3: Assigned Drivers */}
        <div className="rounded-2xl bg-[#10141E] border border-[#1F2737] p-4 relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-blue-400">Dispatched Drivers</span>
            <Car className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-blue-400">{assignedCount}</div>
          <div className="mt-1.5 text-[11px] text-[#8E99AF] font-light">Chauffeurs en route</div>
        </div>

        {/* Card 4: Expected Revenue (SAR / USD) */}
        <div className="rounded-2xl bg-gradient-to-br from-[#121724] to-[#0A0D14] border border-[#232B3E] p-4 relative overflow-hidden group hover:border-[#D9A031]/50 transition-all shadow-md col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-[#D9A031]">Expected Revenue</span>
            <div className="flex items-center gap-1 text-[10px] font-mono">
              <button
                onClick={() => setCurrencyView('SAR')}
                className={`px-1 rounded ${currencyView === 'SAR' ? 'bg-[#D9A031] text-[#0A0D14] font-bold' : 'text-[#7C879B]'}`}
              >
                SAR
              </button>
              <button
                onClick={() => setCurrencyView('USD')}
                className={`px-1 rounded ${currencyView === 'USD' ? 'bg-[#D9A031] text-[#0A0D14] font-bold' : 'text-[#7C879B]'}`}
              >
                USD
              </button>
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[#E5B842]">
            {currencyView === 'SAR' ? `${totalRev.toLocaleString()} SAR` : `$${totalRevUsd.toLocaleString()} USD`}
          </div>
          <div className="mt-1.5 text-[10px] text-[#8E99AF] truncate font-light">
            Cash to driver after journey completion
          </div>
        </div>

        {/* Card 5: Fleet Status */}
        <div className="rounded-2xl bg-[#10141E] border border-[#1F2737] p-4 relative overflow-hidden group hover:border-emerald-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-emerald-400">VIP Fleet Models</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">5 Classes</div>
          <div className="mt-1.5 text-[11px] text-[#8E99AF] truncate font-light">Camry, Staria, Yukon VIP</div>
        </div>

        {/* Card 6: Database & Sync */}
        <div className="rounded-2xl bg-[#10141E] border border-[#1F2737] p-4 relative overflow-hidden group hover:border-purple-500/40 transition-all shadow-md">
          <div className="flex items-center justify-between text-[#8E99AF] mb-2 text-xs">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-purple-400">Sync Engine</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          </div>
          <div className="text-lg font-bold font-mono text-[#FAF9F6]">Live DB</div>
          <div className="mt-1 text-[11px] text-[#8E99AF] font-light">10 Locales Active</div>
        </div>
      </div>

      {/* 5. SEARCH, FILTER PILLS & DISPATCH CONTROLS */}
      <div className="rounded-2xl bg-[#10141E] border border-[#1F2737] p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search booking ref, pilgrim, phone, flight #..."
            className="w-full h-10 pl-9 pr-3 text-xs rounded-xl border border-[#1F2737] bg-[#0A0D14] text-[#FAF9F6] focus:border-[#D9A031] outline-none transition-colors placeholder:text-[#5F6B82]"
          />
          <Search className="w-3.5 h-3.5 text-[#5F6B82] absolute left-3 top-3.5 pointer-events-none" />
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

      {/* 6. LUXURY EXECUTIVE BOOKINGS TABLE OR READY RADAR */}
      <div className="rounded-2xl bg-[#10141E] border border-[#1F2737] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start border-collapse">
            <thead>
              <tr className="bg-[#0A0D14] border-b border-[#1F2737] text-[#8E99AF] font-bold text-[10px] uppercase tracking-wider">
                <th className="py-4 px-4 text-start">Reference Code</th>
                <th className="py-4 px-4 text-start">Pilgrim / Contact</th>
                <th className="py-4 px-4 text-start">Journey Itinerary</th>
                <th className="py-4 px-4 text-start">Date &amp; Flight</th>
                <th className="py-4 px-4 text-start">VIP Vehicle</th>
                <th className="py-4 px-4 text-start">Fixed Fare</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4 text-center">Assigned Chauffeur</th>
                <th className="py-4 px-4 text-center">Quick Dispatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2737]">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-[#8E99AF]">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-[#D9A031]" />
                      <span className="text-xs">Connecting to Dispatch Radar...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 px-6 text-center">
                    <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-4">
                      {/* Golden Radar Compass Emblem */}
                      <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#D9A031]/20 via-[#D9A031]/10 to-transparent border border-[#D9A031]/40 flex items-center justify-center text-[#D9A031] shadow-[0_0_30px_rgba(217,160,49,0.2)]">
                        <Compass className="w-8 h-8 animate-pulse" />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-display font-bold text-lg text-[#FAF9F6]">
                          Fleet Radar Active • All Corridors Standby
                        </h3>
                        <p className="text-xs text-[#9DA6B8] leading-relaxed">
                          There are currently no active reservations under filter "{statusFilter}". New bookings submitted via WhatsApp, web forms, or phone dispatch will stream here in real time.
                        </p>
                      </div>

                      {/* 3 Quick Action Command Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-2">
                        <Link
                          href="/admin/leads"
                          className="p-3.5 rounded-xl bg-[#141926] hover:bg-[#1A2234] border border-[#232B3E] hover:border-[#D9A031]/40 transition-all text-start group"
                        >
                          <div className="flex items-center justify-between text-[#D9A031] mb-1">
                            <Users className="w-4 h-4" />
                            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <div className="font-bold text-xs text-[#FAF9F6]">Review Leads</div>
                          <div className="text-[10px] text-[#7C879B]">
                            {unattendedLeadsCount > 0 ? `${unattendedLeadsCount} inquiries waiting` : 'Check WhatsApp quotes'}
                          </div>
                        </Link>

                        <button
                          onClick={() => setShowCreateModal(true)}
                          className="p-3.5 rounded-xl bg-[#141926] hover:bg-[#1A2234] border border-[#232B3E] hover:border-[#D9A031]/40 transition-all text-start group cursor-pointer"
                        >
                          <div className="flex items-center justify-between text-[#D9A031] mb-1">
                            <PlusCircle className="w-4 h-4" />
                            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <div className="font-bold text-xs text-[#FAF9F6]">Manual Booking</div>
                          <div className="text-[10px] text-[#7C879B]">Register telephone transfer</div>
                        </button>

                        <Link
                          href="/admin/pricing"
                          className="p-3.5 rounded-xl bg-[#141926] hover:bg-[#1A2234] border border-[#232B3E] hover:border-[#D9A031]/40 transition-all text-start group"
                        >
                          <div className="flex items-center justify-between text-[#D9A031] mb-1">
                            <DollarSign className="w-4 h-4" />
                            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <div className="font-bold text-xs text-[#FAF9F6]">Live Tariffs</div>
                          <div className="text-[10px] text-[#7C879B]">Inspect seasonal rates</div>
                        </Link>
                      </div>
                    </div>
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
                    <tr key={b.id} className="hover:bg-[#141A28] transition-colors">
                      {/* Reference */}
                      <td className="py-4 px-4 font-mono font-bold text-[#E5B842]">
                        <div className="flex items-center gap-1.5">
                          <span className="hover:underline cursor-pointer" onClick={() => copyRef(b.reference)}>
                            {b.reference}
                          </span>
                          <button
                            onClick={() => copyRef(b.reference)}
                            className="text-[#6C7584] hover:text-[#FAF9F6] p-0.5 rounded transition-colors"
                            title="Copy Booking Reference"
                          >
                            {copiedRef === b.reference ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Passenger */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-[#FAF9F6]">{b.customer_name}</div>
                        <div className="text-[11px] text-[#8E99AF] font-mono">{b.customer_phone}</div>
                        <span className="inline-block mt-0.5 px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#171D2B] text-[#D9A031] uppercase border border-[#283246]">
                          {b.language}
                        </span>
                      </td>

                      {/* Itinerary */}
                      <td className="py-4 px-4 max-w-xs">
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
                      <td className="py-4 px-4">
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
                      <td className="py-4 px-4">
                        <div className="text-[#FAF9F6] font-semibold capitalize flex items-center gap-1.5">
                          <Car className="w-3.5 h-3.5 text-[#D9A031]" />
                          <span>{b.vehicle_id.replace('_', ' ')}</span>
                        </div>
                        <div className="text-[10px] text-[#8E99AF] mt-0.5">
                          {b.passengers_count} Passengers
                        </div>
                      </td>

                      {/* Fare */}
                      <td className="py-4 px-4 font-mono font-bold text-[#E5B842]">
                        <div>{b.final_price_sar} SAR</div>
                        <div className="text-[9px] text-[#8E99AF] font-sans">Cash to driver</div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg border outline-none bg-[#0A0D14] cursor-pointer ${
                            statusColors[b.status] || 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          <option value="new">● New</option>
                          <option value="confirmed">● Confirmed</option>
                          <option value="driver_assigned">● Assigned</option>
                          <option value="en_route">● En Route</option>
                          <option value="completed">● Completed</option>
                          <option value="cancelled">● Cancelled</option>
                        </select>
                      </td>

                      {/* Chauffeur Assignment */}
                      <td className="py-4 px-4 text-center">
                        {b.driver_name ? (
                          <div className="flex flex-col items-center">
                            <span className="font-semibold text-[#FAF9F6] text-[11px]">{b.driver_name}</span>
                            <span className="text-[10px] text-[#8E99AF] font-mono">{b.vehicle_plate || 'VIP'}</span>
                            <button
                              onClick={() => {
                                setSelectedBooking(b);
                                setDriverName(b.driver_name || '');
                                setDriverPhone(b.driver_phone || '');
                                setVehiclePlate(b.vehicle_plate || '');
                              }}
                              className="text-[10px] text-[#D9A031] hover:underline mt-0.5 cursor-pointer"
                            >
                              Edit Captain
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
                            className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 border border-blue-500/30 text-[10px] font-bold transition-colors cursor-pointer"
                          >
                            Assign Captain
                          </button>
                        )}
                      </td>

                      {/* WhatsApp Dispatch */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => openWhatsAppDispatch(b)}
                          className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all hover:scale-105 cursor-pointer"
                          title="Send Chauffeur Dispatch Details via WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
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

      {/* 7. DRIVER ASSIGNMENT MODAL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#10141E] border border-[#232B3E] rounded-2xl p-6 max-w-md w-full shadow-2xl text-start animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-lg text-[#FAF9F6] flex items-center gap-2">
                <Car className="w-4 h-4 text-[#D9A031]" />
                <span>Assign VIP Chauffeur: {selectedBooking.reference}</span>
              </h3>
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#9DA6B8] mb-4">
              Enter official chauffeur credentials. These will be automatically formatted into the WhatsApp dispatch confirmation message.
            </p>

            <form onSubmit={handleSaveDriver} className="space-y-4">
              {availableDrivers.length > 0 && (
                <div>
                  <label className="block text-[11px] font-bold text-[#D9A031] mb-1">Select Vetted VIP Chauffeur</label>
                  <select
                    onChange={(e) => {
                      const drv = availableDrivers.find((d) => d.id === e.target.value);
                      if (drv) {
                        setDriverName(drv.name);
                        setDriverPhone(drv.phone);
                        setVehiclePlate(`${drv.vehicle_plate} (${drv.vehicle_model})`);
                      }
                    }}
                    className="w-full h-10 px-3 text-xs rounded-xl bg-[#0A0D14] border border-[#D9A031]/40 text-[#FAF9F6] focus:border-[#D9A031] outline-none mb-3"
                  >
                    <option value="">-- Choose Vetted Captain ({availableDrivers.length} Available) --</option>
                    {availableDrivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} • {d.vehicle_model} ({d.vehicle_plate})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="block text-[11px] font-bold text-[#9DA6B8] mb-1">Chauffeur Full Name</label>
                <input
                  type="text"
                  required
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="e.g. Captain Tariq Al-Ghamdi"
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#0A0D14] border border-[#232B3E] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#9DA6B8] mb-1">Chauffeur Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  placeholder="e.g. +966501234567"
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#0A0D14] border border-[#232B3E] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#9DA6B8] mb-1">Vehicle Plate / Fleet Number</label>
                <input
                  type="text"
                  required
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  placeholder="e.g. 7824 VIP (Yukon XL)"
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#0A0D14] border border-[#232B3E] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 rounded-xl border border-[#232B3E] text-xs text-[#9DA6B8] hover:text-[#FAF9F6] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingDriver}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-[#0A0D14] font-bold text-xs transition-all shadow-[0_0_12px_rgba(217,160,49,0.3)] hover:scale-[1.02] cursor-pointer"
                >
                  {savingDriver ? 'Saving...' : 'Confirm Driver Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. MANUAL BOOKING CREATION MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#10141E] border border-[#232B3E] rounded-2xl p-6 max-w-lg w-full shadow-2xl text-start animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-bold text-lg text-[#FAF9F6] flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-[#D9A031]" />
                <span>Create VIP Chauffeur Transfer</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#9DA6B8] mb-4">
              Register a telephone, VIP corporate, or walk-in pilgrimage booking directly into the dispatch radar.
            </p>

            <form onSubmit={handleCreateManualBooking} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#9DA6B8] mb-1">Pilgrim Full Name</label>
                  <input
                    type="text"
                    required
                    value={newCustName}
                    onChange={(e) => setNewCustName(e.target.value)}
                    placeholder="e.g. Haji Ahmad Fauzi"
                    className="w-full h-10 px-3 text-xs rounded-xl bg-[#0A0D14] border border-[#232B3E] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#9DA6B8] mb-1">Pilgrim WhatsApp Phone</label>
                  <input
                    type="tel"
                    required
                    value={newCustPhone}
                    onChange={(e) => setNewCustPhone(e.target.value)}
                    placeholder="e.g. +60123456789"
                    className="w-full h-10 px-3 text-xs rounded-xl bg-[#0A0D14] border border-[#232B3E] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#9DA6B8] mb-1">Pilgrimage Corridor / Route</label>
                <select
                  value={newRoute}
                  onChange={(e) => setNewRoute(e.target.value)}
                  className="w-full h-10 px-3 text-xs rounded-xl bg-[#0A0D14] border border-[#232B3E] text-[#FAF9F6] focus:border-[#D9A031] outline-none cursor-pointer"
                >
                  <option value="Jeddah Airport (JED) → Makkah Hotel">Jeddah Airport (JED) → Makkah Hotel (200 SAR)</option>
                  <option value="Makkah Hotel → Madinah Hotel">Makkah Hotel → Madinah Hotel (Bir Ali Miqat included) (450 SAR)</option>
                  <option value="Madinah Airport (MED) → Madinah Hotel">Madinah Airport (MED) → Madinah Hotel (150 SAR)</option>
                  <option value="Makkah Hotel → Jeddah Airport (JED)">Makkah Hotel → Jeddah Airport (JED) (200 SAR)</option>
                  <option value="Jeddah Airport (JED) → Madinah Hotel">Jeddah Airport (JED) → Madinah Hotel (450 SAR)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#9DA6B8] mb-1">Vehicle Category</label>
                  <select
                    value={newVehicle}
                    onChange={(e) => setNewVehicle(e.target.value)}
                    className="w-full h-10 px-3 text-xs rounded-xl bg-[#0A0D14] border border-[#232B3E] text-[#FAF9F6] focus:border-[#D9A031] outline-none cursor-pointer"
                  >
                    <option value="camry">Toyota Camry (Sedan)</option>
                    <option value="staria">Hyundai Staria VIP (7 Seats)</option>
                    <option value="yukon">GMC Yukon XL VIP (7 Seats + Luggage)</option>
                    <option value="hiace">Toyota HiAce (11 Seats)</option>
                    <option value="coaster">Toyota Coaster VIP (Minibus)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#9DA6B8] mb-1">Fixed Fare (SAR)</label>
                  <input
                    type="number"
                    value={newPriceSar}
                    onChange={(e) => setNewPriceSar(e.target.value)}
                    className="w-full h-10 px-3 text-xs rounded-xl bg-[#0A0D14] border border-[#232B3E] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#9DA6B8] mb-1">Flight Number (Optional)</label>
                  <input
                    type="text"
                    value={newFlightNo}
                    onChange={(e) => setNewFlightNo(e.target.value)}
                    placeholder="e.g. SV1024 or MH150"
                    className="w-full h-10 px-3 text-xs rounded-xl bg-[#0A0D14] border border-[#232B3E] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#9DA6B8] mb-1">Language</label>
                  <select
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value)}
                    className="w-full h-10 px-3 text-xs rounded-xl bg-[#0A0D14] border border-[#232B3E] text-[#FAF9F6] focus:border-[#D9A031] outline-none cursor-pointer"
                  >
                    <option value="ar">العربية (Arabic)</option>
                    <option value="en">English</option>
                    <option value="ms">Bahasa Melayu</option>
                    <option value="id">Bahasa Indonesia</option>
                    <option value="ur">اردو (Urdu)</option>
                    <option value="fr">Français</option>
                    <option value="tr">Türkçe</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#232B3E] text-xs text-[#9DA6B8] hover:text-[#FAF9F6] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingBooking}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-[#0A0D14] font-bold text-xs transition-all shadow-[0_0_12px_rgba(217,160,49,0.3)] hover:scale-[1.02] cursor-pointer"
                >
                  {creatingBooking ? 'Registering...' : 'Confirm & Dispatch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* 9. PRINTABLE VIP VOUCHER MODAL */}
      {voucherBooking && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0E131F] border border-[#D9A031]/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-start animate-scaleUp space-y-5">
            <div className="flex items-center justify-between border-b border-[#232B3E] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D9A031] to-[#B8821D] flex items-center justify-center font-bold text-[#0A0D14] text-lg font-serif">
                  VIP
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#FAF9F6] tracking-tight">DUYUF ALRAHMAN VIP</h3>
                  <div className="text-[10px] text-[#D9A031] tracking-widest uppercase">Official VIP Journey Voucher</div>
                </div>
              </div>
              <button onClick={() => setVoucherBooking(null)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#141A26] rounded-xl p-4 border border-[#1F2737] space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#232B3E] pb-2">
                <span className="text-gray-400 font-sans">Booking Ref:</span>
                <span className="font-bold text-[#D9A031] text-sm">{voucherBooking.reference}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-sans">Pilgrim Name:</span>
                <span className="font-bold text-white font-sans">{voucherBooking.customer_name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-sans">Contact Phone:</span>
                <span className="text-white">{voucherBooking.customer_phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-sans">Origin:</span>
                <span className="text-white font-sans">{voucherBooking.pickup_location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-sans">Destination:</span>
                <span className="text-white font-sans">{voucherBooking.dropoff_location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-sans">Pickup Schedule:</span>
                <span className="text-[#E5B842]">{new Date(voucherBooking.pickup_datetime).toLocaleString()}</span>
              </div>
              {voucherBooking.flight_number && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-sans">Flight Number:</span>
                  <span className="text-cyan-300">{voucherBooking.flight_number}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-gray-400 font-sans">Vehicle Class:</span>
                <span className="text-white font-sans uppercase">{voucherBooking.vehicle_id}</span>
              </div>
              {voucherBooking.driver_name && (
                <div className="flex items-center justify-between border-t border-[#232B3E] pt-2">
                  <span className="text-gray-400 font-sans">Assigned Captain:</span>
                  <span className="text-emerald-400 font-sans">{voucherBooking.driver_name} ({voucherBooking.vehicle_plate})</span>
                </div>
              )}
              <div className="flex items-center justify-between border-t border-[#232B3E] pt-2">
                <span className="text-gray-400 font-sans">Fixed Total Fare:</span>
                <span className="font-bold text-[#E5B842] text-base">{voucherBooking.final_price_sar} SAR</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#D9A031]/10 border border-[#D9A031]/30 text-xs text-[#E5B842] leading-relaxed">
              <strong>Strict Cash Policy:</strong> The customer pays the driver in cash upon arrival after journey completion in SAR or USD.
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#1F2737]">
              <button
                onClick={() => setVoucherBooking(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D9A031] to-[#B8821D] hover:from-[#E5B842] hover:to-[#C69225] text-[#0A0D14] text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save Voucher PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
  </div>
);
}
