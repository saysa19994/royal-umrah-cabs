'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  ChevronRight,
  ArrowRight,
  AlertTriangle,
  Send,
} from 'lucide-react';

interface FleetItem {
  id: string;
  name: string;
  passengers: number;
  luggage: number;
  status: 'available' | 'on_trip' | 'maintenance';
  image: string;
}

interface ActiveTripItem {
  id: string;
  route: string;
  vehicle: string;
  guests: number;
  status: 'on_track' | 'delayed' | 'completed';
  time: string;
  driver: string;
}

interface InquiryItem {
  id: number;
  name: string;
  service: string;
  vehicle: string;
  status: 'new' | 'pending' | 'completed';
  time: string;
  phone: string;
}

  // Real Fleet Data with high-quality studio photography matching Reference Image 1
  const DEFAULT_FLEET_DATA: FleetItem[] = [
    {
      id: 'camry',
      name: 'Toyota Camry',
      passengers: 4,
      luggage: 2,
      status: 'available',
      image: '/assets/images/vehicles/toyota-camry/exterior-studio.webp',
    },
    {
      id: 'staria',
      name: 'Hyundai Staria VIP',
      passengers: 7,
      luggage: 5,
      status: 'available',
      image: '/assets/images/vehicles/hyundai-staria/exterior-studio.webp',
    },
    {
      id: 'yukon',
      name: 'GMC Yukon XL',
      passengers: 7,
      luggage: 5,
      status: 'on_trip',
      image: '/assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp',
    },
    {
      id: 'hiace',
      name: 'Toyota HiAce',
      passengers: 14,
      luggage: 10,
      status: 'available',
      image: '/assets/images/vehicles/toyota-hiace/exterior-studio.webp',
    },
    {
      id: 'vclass',
      name: 'Mercedes-Benz V-Class VIP',
      passengers: 7,
      luggage: 5,
      status: 'available',
      image: '/assets/images/vehicles/mercedes-v-class/exterior-studio.webp',
    },
    {
      id: 'landcruiser',
      name: 'Toyota Land Cruiser 300 VIP',
      passengers: 7,
      luggage: 5,
      status: 'maintenance',
      image: '/assets/images/vehicles/land-cruiser-300/exterior-studio.webp',
    },
  ];


  // Recent Inquiries (Matching Reference Image 1)
  const DEFAULT_RECENT_INQUIRIES: InquiryItem[] = [
    {
      id: 1,
      name: 'Ahmed Al-Qahtani',
      service: 'Airport Pickup',
      vehicle: 'Camry',
      status: 'new',
      time: '10:12 AM',
      phone: '+966501234567',
    },
    {
      id: 2,
      name: 'Fatima Al-Zahra',
      service: 'City Tour (Ziyarat)',
      vehicle: 'HiAce',
      status: 'pending',
      time: '09:58 AM',
      phone: '+60123456789',
    },
    {
      id: 3,
      name: 'Mohammed Ali',
      service: 'Umrah Transfer',
      vehicle: 'Yukon XL',
      status: 'new',
      time: '09:45 AM',
      phone: '+447911123456',
    },
    {
      id: 4,
      name: 'Sara Abdullah',
      service: 'Ziyarat Tour',
      vehicle: 'Staria',
      status: 'completed',
      time: '09:32 AM',
      phone: '+628123456789',
    },
    {
      id: 5,
      name: 'Khalid Hassan',
      service: 'Airport Return',
      vehicle: 'Maybach VIP',
      status: 'pending',
      time: '09:20 AM',
      phone: '+966559876543',
    },
  ];


export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(false);
  const [inquiryTab, setInquiryTab] = useState<'new' | 'pending' | 'completed'>('new');
  const [currency, setCurrency] = useState<'USD' | 'SAR'>('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<string>('TR-1');
  const [liveFleet, setLiveFleet] = useState<FleetItem[]>(DEFAULT_FLEET_DATA);
  const [liveInquiries, setLiveInquiries] = useState<InquiryItem[]>(DEFAULT_RECENT_INQUIRIES);

  useEffect(() => {
    async function loadLiveDashboard() {
      try {
        const [fRes, lRes] = await Promise.all([
          fetch('/api/admin/fleet').then(r => r.json()).catch(() => null),
          fetch('/api/admin/leads').then(r => r.json()).catch(() => null),
        ]);
        if (fRes && fRes.fleet && fRes.fleet.length > 0) {
          setLiveFleet(fRes.fleet.slice(0, 6).map((v: any, idx: number) => ({
            id: v.id,
            name: v.name,
            passengers: Number(v.seats) || 4,
            luggage: Number(v.bags) || 3,
            status: idx === 2 ? 'on_trip' : idx === 5 ? 'maintenance' : 'available',
            image: v.photos?.exterior || '/assets/images/vehicles/toyota-camry/exterior-studio.webp',
          })));
        }
        if (lRes && lRes.leads && lRes.leads.length > 0) {
          setLiveInquiries(lRes.leads.map((l: any, idx: number) => ({
            id: idx + 1,
            name: l.customer_name || 'Pilgrim Lead',
            service: l.route_id ? l.route_id.replace(/-/g, ' ') : 'VIP Transfer',
            vehicle: l.vehicle_id || 'Luxury Fleet',
            status: l.status === 'confirmed' || l.status === 'completed' ? 'completed' : l.status === 'replied' ? 'pending' : 'new',
            time: new Date(l.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            phone: l.whatsapp_number || l.customer_phone || '+966567588261',
          })));
        }
      } catch {}
    }
    loadLiveDashboard();
  }, []);

  // Active Corridor Trips (Matching Reference Image 1)
  const activeTrips: ActiveTripItem[] = [
    {
      id: 'TR-1',
      route: 'Madinah → Makkah',
      vehicle: 'Toyota Camry',
      guests: 4,
      status: 'on_track',
      time: '10:15 AM',
      driver: 'Tariq Mansoor',
    },
    {
      id: 'TR-2',
      route: 'Jeddah Airport → Makkah',
      vehicle: 'Hyundai Staria',
      guests: 7,
      status: 'on_track',
      time: '10:42 AM',
      driver: 'Ibrahim S.',
    },
    {
      id: 'TR-3',
      route: 'Makkah → Jeddah',
      vehicle: 'GMC Yukon XL',
      guests: 7,
      status: 'delayed',
      time: '11:20 AM',
      driver: 'Omar K.',
    },
    {
      id: 'TR-4',
      route: 'Madinah → Jeddah',
      vehicle: 'Toyota HiAce',
      guests: 14,
      status: 'on_track',
      time: '12:05 PM',
      driver: 'Faisal M.',
    },
  ];

  const filteredInquiries = useMemo(() => {
    return liveInquiries.filter((item) => {
      if (inquiryTab === 'new') return item.status === 'new';
      if (inquiryTab === 'pending') return item.status === 'pending';
      return item.status === 'completed';
    });
  }, [inquiryTab]);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-300">
      {/* ============================================================== */}
      {/* 1. TOP 4 EDITORIAL KPI CARDS (Faithful to Reference Image 1)   */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* KPI 1: Total Fleet Vehicles */}
        <div className="p-5 rounded-2xl bg-[#101726] border border-[#1F2C42] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-11 h-11 rounded-xl bg-[#101726] border border-[#1F2C42] flex items-center justify-center text-[#C9A24B]">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#8E9CAE] block">Total Fleet Vehicles</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-extrabold text-white">12</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#8E9CAE] pt-2 border-t border-[#1F2C42]">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Active: <strong>11</strong></span>
            </span>
            <span className="text-[#C5A059]">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>Maintenance: <strong>1</strong></span>
            </span>
          </div>
        </div>

        {/* KPI 2: Active Drivers */}
        <div className="p-5 rounded-2xl bg-[#101726] border border-[#1F2C42] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-11 h-11 rounded-xl bg-[#101726] border border-[#1F2C42] flex items-center justify-center text-[#C9A24B]">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#8E9CAE] block">Active Drivers</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-extrabold text-white">24</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#8E9CAE] pt-2 border-t border-[#1F2C42]">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available: <strong>20</strong></span>
            </span>
            <span className="text-[#C5A059]">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D6A13A]" />
              <span>On Trip: <strong>4</strong></span>
            </span>
          </div>
        </div>

        {/* KPI 3: Today's Trips */}
        <div className="p-5 rounded-2xl bg-[#101726] border border-[#1F2C42] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="w-11 h-11 rounded-xl bg-[#101726] border border-[#1F2C42] flex items-center justify-center text-[#C9A24B]">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#8E9CAE] block">Today's Trips</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-extrabold text-white">18</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#8E9CAE] pt-2 border-t border-[#1F2C42]">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Completed: <strong>14</strong></span>
            </span>
            <span className="text-[#C5A059]">|</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#173D35]" />
              <span>Ongoing: <strong>4</strong></span>
            </span>
          </div>
        </div>

        {/* KPI 4: Estimated Revenue */}
        <div className="p-5 rounded-2xl bg-[#101726] border border-[#1F2C42] shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#FDF8EC] border border-[#E8DEC8] flex items-center justify-center text-[#A97B27]">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-[#8E9CAE] block">Estimated Revenue</span>
                <span className="text-2xl md:text-3xl font-extrabold text-white">
                  {currency === 'USD' ? '$12,480' : '46,800 SAR'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1F2C42]">
            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
              ↑ 12% vs yesterday
            </span>
            <button
              onClick={() => setCurrency(currency === 'USD' ? 'SAR' : 'USD')}
              className="text-[11px] font-bold text-[#C9A24B] hover:underline"
            >
              Toggle {currency === 'USD' ? 'SAR' : 'USD'}
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. MIDDLE GRID: LIVE FLEET OVERVIEW & ACTIVE TRIPS MAP         */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT (7 COLS): LIVE FLEET OVERVIEW (Card Grid from Image 1) */}
        <div className="lg:col-span-6 xl:col-span-7 rounded-2xl bg-[#101726] border border-[#1F2C42] shadow-xs p-5 md:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#173D35]" />
              <h2 className="text-base font-bold text-white">Live Fleet Overview</h2>
            </div>
            <Link
              href="/admin/fleet"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#C9A24B] hover:text-[#A97B27] transition-colors"
            >
              <span>View All Fleet</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          {/* 6 FLEET CARDS WITH REAL VEHICLE PHOTOGRAPHY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {liveFleet.map((car) => (
              <div
                key={car.id}
                className="group p-3.5 rounded-xl bg-[#101726] hover:bg-[#151D2C] border border-[#1F2C42] transition-all flex flex-col justify-between"
              >
                {/* Real Vehicle Studio Photo */}
                <div className="relative w-full aspect-[16/9] mb-3 rounded-lg overflow-hidden bg-white/70 flex items-center justify-center p-1">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div>
                  <h3 className="font-bold text-xs md:text-sm text-white mb-1.5 truncate">
                    {car.name}
                  </h3>

                  {/* Seat and Luggage Capacity */}
                  <div className="flex items-center gap-3 text-[11px] text-[#8E9CAE] mb-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#C9A24B]" />
                      <strong>{car.passengers}</strong>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <LuggageIcon className="w-3.5 h-3.5 text-[#C9A24B]" />
                      <strong>{car.luggage}</strong>
                    </span>
                  </div>
                </div>

                {/* Status Badge (Available, On Trip, Maintenance) */}
                <div>
                  {car.status === 'available' && (
                    <span className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <Check className="w-3 h-3" />
                      Available
                    </span>
                  )}
                  {car.status === 'on_trip' && (
                    <span className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                      <Clock className="w-3 h-3" />
                      On Trip
                    </span>
                  )}
                  {car.status === 'maintenance' && (
                    <span className="w-full inline-flex items-center justify-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                      <AlertTriangle className="w-3 h-3" />
                      Maintenance
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT (5 COLS): ACTIVE TRIPS & SAUDI HIGHWAY ROUTE MAP (Image 1) */}
        <div className="lg:col-span-6 xl:col-span-5 rounded-2xl bg-[#101726] border border-[#1F2C42] shadow-xs p-5 md:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A97B27]" />
              <h2 className="text-base font-bold text-white">Active Trips Radar</h2>
            </div>
            <Link
              href="/admin/bookings"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#C9A24B] hover:text-[#A97B27] transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          {/* HIGH-PRECISION HIGHWAY MAP DISPLAY (Faithful to Reference Image 1) */}
          <div className="relative rounded-xl overflow-hidden bg-[#0A1118] border border-[#1C2C3D] p-4 text-white mb-4">
            <div className="flex items-center justify-between text-xs text-[#E8BE6D] font-bold mb-3">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D6A13A]" />
                Madinah Al-Munawwarah
              </span>
              <span className="text-[10px] text-gray-400 font-mono">Hijrah Highway · 440 km</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#D6A13A]" />
                Makkah Al-Mukarramah
              </span>
            </div>

            {/* Stylized Curved Highway Route SVG with live Chauffeur Ping */}
            <div className="relative h-28 w-full flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 400 100" fill="none">
                {/* Background road glow */}
                <path
                  d="M 20 80 Q 150 20 230 60 T 380 30"
                  stroke="#173D35"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Active golden route trajectory */}
                <path
                  d="M 20 80 Q 150 20 230 60 T 380 30"
                  stroke="#D6A13A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray="6 4"
                />
                {/* Madinah Pin Node */}
                <circle cx="20" cy="80" r="6" fill="#D6A13A" stroke="#0A1118" strokeWidth="2" />
                {/* Bir Ali Miqat Stop */}
                <circle cx="110" cy="45" r="4.5" fill="#34D399" stroke="#0A1118" strokeWidth="1.5" />
                {/* Makkah Pin Node */}
                <circle cx="380" cy="30" r="6" fill="#D6A13A" stroke="#0A1118" strokeWidth="2" />
              </svg>

              {/* Pulsing Chauffeur Vehicle on Route */}
              <div className="absolute top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#122E27] border border-[#D6A13A] shadow-lg">
                <Car className="w-3.5 h-3.5 text-[#E8BE6D]" />
                <span className="text-[10px] font-bold text-white">TR-1 On Track</span>
              </div>
            </div>
          </div>

          {/* LIST OF ACTIVE CORRIDORS (Matching Image 1) */}
          <div className="space-y-2.5 overflow-y-auto max-h-[220px] pr-1">
            {activeTrips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => setSelectedTrip(trip.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedTrip === trip.id
                    ? 'bg-[#101726] border-[#173D35] shadow-xs'
                    : 'bg-[#101726] hover:bg-[#151D2C] border-[#1F2C42]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#1F2C42] flex items-center justify-center text-[#C9A24B]">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{trip.route}</span>
                    <span className="text-[11px] text-[#8E9CAE] block">
                      {trip.vehicle} • {trip.guests} Guests
                    </span>
                  </div>
                </div>

                <div className="text-end">
                  {trip.status === 'on_track' ? (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      On Track
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      Delayed 10m
                    </span>
                  )}
                  <span className="text-[10px] text-[#8E9CAE] block mt-0.5 font-mono">{trip.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. BOTTOM THREE-COLUMN GRID: INQUIRIES, REVENUE CHART, ALERTS  */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* RECENT INQUIRIES (5 COLS) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#101726] border border-[#1F2C42] shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C9A24B]" />
                Recent Pilgrim Inquiries
              </h3>
              <Link href="/admin/leads" className="text-xs font-bold text-[#C9A24B] hover:underline">
                View All
              </Link>
            </div>

            {/* Filter Tabs: Now, Pending, Completed (Matching Image 1) */}
            <div className="flex items-center gap-1.5 p-1 bg-[#101726] rounded-xl mb-4 border border-[#1F2C42]">
              <button
                onClick={() => setInquiryTab('new')}
                className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors ${
                  inquiryTab === 'new' ? 'bg-[#173D35] text-white shadow-xs' : 'text-[#8E9CAE] hover:text-white'
                }`}
              >
                Now (12)
              </button>
              <button
                onClick={() => setInquiryTab('pending')}
                className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors ${
                  inquiryTab === 'pending' ? 'bg-[#173D35] text-white shadow-xs' : 'text-[#8E9CAE] hover:text-white'
                }`}
              >
                Pending (3)
              </button>
              <button
                onClick={() => setInquiryTab('completed')}
                className={`flex-1 py-1 text-xs font-bold rounded-lg transition-colors ${
                  inquiryTab === 'completed' ? 'bg-[#173D35] text-white shadow-xs' : 'text-[#8E9CAE] hover:text-white'
                }`}
              >
                Completed (35)
              </button>
            </div>

            {/* Table of Inquiries */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start">
                <thead>
                  <tr className="border-b border-[#1F2C42] text-[#8E9CAE]">
                    <th className="pb-2 font-semibold">#</th>
                    <th className="pb-2 font-semibold">Guest Name</th>
                    <th className="pb-2 font-semibold">Service</th>
                    <th className="pb-2 font-semibold">Vehicle</th>
                    <th className="pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F3EE]">
                  {filteredInquiries.map((item) => (
                    <tr key={item.id} className="hover:bg-[#101726]/60 transition-colors">
                      <td className="py-2.5 font-mono text-[#8E9CAE]">{item.id}</td>
                      <td className="py-2.5 font-bold text-white">{item.name}</td>
                      <td className="py-2.5 text-[#8E9CAE]">{item.service}</td>
                      <td className="py-2.5 font-medium">{item.vehicle}</td>
                      <td className="py-2.5">
                        {item.status === 'new' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                            New
                          </span>
                        ) : item.status === 'pending' ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                            Pending
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Done
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* REVENUE & TRIPS 7-DAY DUAL METRIC CHART (4 COLS) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#101726] border border-[#1F2C42] shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#A97B27]" />
                Revenue & Trips (Last 7 Days)
              </h3>
              <span className="text-[11px] text-[#8E9CAE] font-medium">Daily Telemetry</span>
            </div>

            {/* SVG Visual Bar and Line Trend (Matching Image 1) */}
            <div className="h-36 w-full flex items-end gap-3 pt-6 pb-2 px-2 border-b border-[#1F2C42]">
              {[
                { day: '21', val: 55, trips: 12 },
                { day: '22', val: 70, trips: 15 },
                { day: '23', val: 85, trips: 18 },
                { day: '24', val: 65, trips: 14 },
                { day: '25', val: 90, trips: 20 },
                { day: '26', val: 75, trips: 16 },
                { day: '27', val: 100, trips: 22 },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div className="w-full flex items-end justify-center h-full relative">
                    {/* Bar representing Revenue in warm champagne gold */}
                    <div
                      style={{ height: `${item.val}%` }}
                      className="w-full max-w-[20px] rounded-t-md bg-[#D6A13A] group-hover:brightness-110 transition-all"
                    />
                    {/* Circle Node representing Trips Count */}
                    <div
                      style={{ bottom: `${Math.min(95, item.val + 8)}%` }}
                      className="absolute w-2.5 h-2.5 rounded-full bg-[#173D35] border-2 border-white shadow-xs"
                    />
                  </div>
                  <span className="text-[10px] text-[#8E9CAE] font-medium">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3">
            <div>
              <span className="text-[11px] text-[#8E9CAE] block">Total Revenue</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-white">$68,420</span>
                <span className="text-[10px] text-emerald-700 font-bold">↑ 14%</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] text-[#8E9CAE] block">Total Trips</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-white">96</span>
                <span className="text-[10px] text-emerald-700 font-bold">↑ 14%</span>
              </div>
            </div>
          </div>
        </div>

        {/* SYSTEM ALERTS (3 COLS) */}
        <div className="lg:col-span-3 rounded-2xl bg-[#101726] border border-[#1F2C42] shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C9A24B]" />
                System Alerts
              </h3>
              <span className="text-xs font-bold text-[#C9A24B] hover:underline cursor-pointer">
                View All
              </span>
            </div>

            <div className="space-y-3 pt-1">
              {/* Alert 1 */}
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-rose-50 border border-rose-100">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-rose-900 block leading-tight">Driver unavailable</span>
                  <span className="text-[10px] text-rose-700 block truncate">Driver #D-014 is currently offline.</span>
                  <span className="text-[9px] text-rose-500 font-mono">10:05 AM</span>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-amber-50 border border-amber-100">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-amber-900 block leading-tight">Delayed trip</span>
                  <span className="text-[10px] text-amber-700 block truncate">Trip #TR-458 is delayed by 20 min.</span>
                  <span className="text-[9px] text-amber-500 font-mono">09:42 AM</span>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-blue-50 border border-blue-100">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-blue-900 block leading-tight">New inquiry</span>
                  <span className="text-[10px] text-blue-700 block truncate">A new lead has been received.</span>
                  <span className="text-[9px] text-blue-500 font-mono">09:20 AM</span>
                </div>
              </div>

              {/* Alert 4 */}
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-emerald-900 block leading-tight">Trip completed</span>
                  <span className="text-[10px] text-emerald-700 block truncate">Trip #TR-452 has been completed.</span>
                  <span className="text-[9px] text-emerald-500 font-mono">08:50 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LuggageIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="6" y="7" width="12" height="14" rx="2" />
      <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
      <path d="M6 12h12" />
    </svg>
  );
}
