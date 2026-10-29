'use client';

import React, { useState, useEffect } from 'react';
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

  // Driver Assignment Modal State
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [savingDriver, setSavingDriver] = useState(false);

  const [currentUser, setCurrentUser] = useState<any>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const url = `/api/admin/bookings?status=${statusFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (e) {
      console.error('Error fetching bookings:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
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
          status: 'driver_assigned',
          driver_name: driverName,
          driver_phone: driverPhone,
          vehicle_plate: vehiclePlate,
        }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === selectedBooking.id
              ? {
                  ...b,
                  status: 'driver_assigned',
                  driver_name: driverName,
                  driver_phone: driverPhone,
                  vehicle_plate: vehiclePlate,
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

  // One-click WhatsApp message in customer's native language
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
        `\nالأجرة الإجمالية: *${b.final_price_sar} ريال سعودي* (الدفع عند الوصول للسائق).\n\n` +
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
        `\nJumlah Tambang: *${b.final_price_currency} ${b.currency_charged}* (Bayar terus kepada pemandu semasa tiba).\n\n` +
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
        `\nTotal Fixed Fare: *${b.final_price_sar} SAR* (Pay driver after journey completion).\n\n` +
        `Our team is tracking your schedule. Have a blessed journey!`;
    }

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.reference.toLowerCase().includes(q) ||
      b.customer_name.toLowerCase().includes(q) ||
      b.customer_phone.includes(q) ||
      (b.flight_number && b.flight_number.toLowerCase().includes(q))
    );
  });

  const totalRev = bookings.reduce((sum, b) => sum + (b.final_price_sar || 0), 0);
  const pendingCount = bookings.filter((b) => b.status === 'new').length;

  return (
    <div className="space-y-6 text-start">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-[#FAF9F6]">
            Dispatch &amp; Bookings Control
          </h1>
          <p className="text-xs text-[#A0A6B2] mt-1 font-light">
            Monitor real-time passenger arrivals, assign chauffeurs, and notify via WhatsApp.
          </p>
        </div>
        <button
          onClick={fetchBookings}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#20252D] hover:bg-[#2B313C] text-xs font-bold text-[#FAF9F6] border border-[#262B33] transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {currentUser?.role === 'operator' && currentUser?.assigned_whatsapp_number && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong>Scoped Dispatch Channel:</strong> Showing only bookings assigned to your WhatsApp channel (+{currentUser.assigned_whatsapp_number}).
            </span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300">
            Operator Access
          </span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#14171C] border border-[#262B33] rounded-xl p-4">
          <span className="text-xs text-[#A0A6B2] block mb-1">Total Reservations</span>
          <span className="text-2xl font-bold font-mono text-[#FAF9F6]">{bookings.length}</span>
        </div>
        <div className="bg-[#14171C] border border-[#262B33] rounded-xl p-4">
          <span className="text-xs text-[#A0A6B2] block mb-1">Pending Confirmation</span>
          <span className="text-2xl font-bold font-mono text-amber-400">{pendingCount}</span>
        </div>
        <div className="bg-[#14171C] border border-[#262B33] rounded-xl p-4">
          <span className="text-xs text-[#A0A6B2] block mb-1">Assigned Drivers</span>
          <span className="text-2xl font-bold font-mono text-blue-400">
            {bookings.filter((b) => b.status === 'driver_assigned').length}
          </span>
        </div>
        <div className="bg-[#14171C] border border-[#262B33] rounded-xl p-4">
          <span className="text-xs text-[#A0A6B2] block mb-1">Total Expected (SAR)</span>
          <span className="text-2xl font-bold font-mono text-[#D9A031]">
            {totalRev.toLocaleString()} SAR
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#14171C] border border-[#262B33] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ref, passenger, phone, flight #..."
            className="w-full h-10 pl-9 pr-3 text-xs rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
          />
          <Search className="w-3.5 h-3.5 text-[#6C7584] absolute left-3 top-3.5" />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {['all', 'new', 'confirmed', 'driver_assigned', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all capitalize ${
                statusFilter === st
                  ? 'bg-[#D9A031] text-[#0D0F12] border-[#D9A031]'
                  : 'bg-[#0D0F12] text-[#A0A6B2] border-[#262B33] hover:border-[#D9A031]/40'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-[#14171C] border border-[#262B33] rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start border-collapse">
            <thead>
              <tr className="bg-[#1C2027] border-b border-[#262B33] text-[#A0A6B2] font-semibold">
                <th className="py-3 px-4 text-start">Reference</th>
                <th className="py-3 px-4 text-start">Passenger</th>
                <th className="py-3 px-4 text-start">Pickup &amp; Destination</th>
                <th className="py-3 px-4 text-start">Date &amp; Flight</th>
                <th className="py-3 px-4 text-start">Vehicle</th>
                <th className="py-3 px-4 text-start">Fare</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Chauffeur</th>
                <th className="py-3 px-4 text-center">Dispatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262B33]">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#6C7584]">
                    No bookings found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#1A1F26] transition-colors">
                    {/* Reference */}
                    <td className="py-3 px-4 font-mono font-bold text-[#D9A031]">
                      {b.reference}
                    </td>

                    {/* Passenger */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#FAF9F6]">{b.customer_name}</div>
                      <div className="text-[11px] text-[#A0A6B2] font-mono">{b.customer_phone}</div>
                      <span className="inline-block mt-0.5 px-1.5 py-0.5 text-[10px] font-bold rounded bg-[#20252D] text-[#D9A031] uppercase">
                        {b.language}
                      </span>
                    </td>

                    {/* Pickup & Destination */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="text-[#FAF9F6] truncate">
                        <span className="text-[#A0A6B2]">From:</span> {b.pickup_location}
                      </div>
                      <div className="text-[#FAF9F6] truncate mt-0.5">
                        <span className="text-[#A0A6B2]">To:</span> {b.dropoff_location}
                      </div>
                    </td>

                    {/* Date & Flight */}
                    <td className="py-3 px-4">
                      <div className="text-[#FAF9F6] font-medium">
                        {new Date(b.pickup_datetime).toLocaleDateString()}
                      </div>
                      <div className="text-[11px] text-[#A0A6B2]">
                        {new Date(b.pickup_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      {b.flight_number && (
                        <div className="inline-flex items-center gap-1 mt-0.5 text-[11px] font-mono font-bold text-amber-300">
                          <Plane className="w-3 h-3" />
                          <span>{b.flight_number}</span>
                        </div>
                      )}
                    </td>

                    {/* Vehicle */}
                    <td className="py-3 px-4">
                      <span className="capitalize font-semibold text-[#FAF9F6]">
                        {b.vehicle_id}
                      </span>
                      <div className="text-[11px] text-[#A0A6B2]">{b.passengers_count} Pax</div>
                    </td>

                    {/* Fare */}
                    <td className="py-3 px-4 font-mono font-bold text-[#FAF9F6]">
                      {b.final_price_sar} SAR
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      <select
                        value={b.status}
                        onChange={(e) => updateStatus(b.id, e.target.value)}
                        className={`text-[11px] font-bold py-1 px-2 rounded-lg border bg-[#0D0F12] cursor-pointer outline-none ${
                          b.status === 'confirmed'
                            ? 'text-emerald-400 border-emerald-500/40'
                            : b.status === 'driver_assigned'
                            ? 'text-blue-400 border-blue-500/40'
                            : b.status === 'completed'
                            ? 'text-gray-400 border-gray-600'
                            : b.status === 'cancelled'
                            ? 'text-rose-400 border-rose-500/40'
                            : 'text-amber-400 border-amber-500/40'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="driver_assigned">Driver Assigned</option>
                        <option value="en_route">En Route</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Chauffeur */}
                    <td className="py-3 px-4 text-center">
                      {b.driver_name ? (
                        <div className="text-start">
                          <div className="font-bold text-[#FAF9F6]">{b.driver_name}</div>
                          <div className="text-[11px] text-[#A0A6B2]">{b.driver_phone}</div>
                          <button
                            onClick={() => {
                              setSelectedBooking(b);
                              setDriverName(b.driver_name || '');
                              setDriverPhone(b.driver_phone || '');
                              setVehiclePlate(b.vehicle_plate || '');
                            }}
                            className="text-[10px] text-[#D9A031] hover:underline block mt-0.5"
                          >
                            Edit Driver
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedBooking(b);
                            setDriverName('');
                            setDriverPhone('+966');
                            setVehiclePlate('');
                          }}
                          className="px-2.5 py-1 rounded bg-[#20252D] hover:bg-[#2C333E] text-xs font-bold text-[#D9A031] border border-[#262B33] transition-colors"
                        >
                          + Assign
                        </button>
                      )}
                    </td>

                    {/* WhatsApp Dispatch Button */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => openWhatsAppDispatch(b)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                        title="Send confirmation or driver details on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Notify</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Driver Assignment Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14171C] border border-[#262B33] rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262B33]">
              <h3 className="font-display font-bold text-lg text-[#FAF9F6]">
                Assign Chauffeur ({selectedBooking.reference})
              </h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-[#6C7584] hover:text-[#FAF9F6] text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDriver} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                  Chauffeur Full Name
                </label>
                <input
                  type="text"
                  required
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="e.g. Captain Tariq Al-Ghamdi"
                  className="w-full h-10 px-3 text-xs rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                  Chauffeur Phone (with Country Code)
                </label>
                <input
                  type="tel"
                  required
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  placeholder="e.g. +966 56 758 8261"
                  className="w-full h-10 px-3 text-xs rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">
                  Vehicle Plate &amp; Make
                </label>
                <input
                  type="text"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  placeholder="e.g. KSA 4819 HTR - Hyundai Staria 2025"
                  className="w-full h-10 px-3 text-xs rounded-lg border border-[#262B33] bg-[#0D0F12] text-[#FAF9F6] focus:border-[#D9A031] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 rounded-lg bg-[#20252D] text-xs font-bold text-[#A0A6B2] hover:text-[#FAF9F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingDriver}
                  className="px-5 py-2 rounded-lg bg-[#D9A031] hover:bg-[#B8821F] text-[#0D0F12] text-xs font-bold disabled:opacity-50"
                >
                  {savingDriver ? 'Saving...' : 'Confirm Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
