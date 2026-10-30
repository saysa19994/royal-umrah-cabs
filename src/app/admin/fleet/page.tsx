'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  Car,
  Users,
  Luggage,
  CheckCircle2,
  XCircle,
  PlusCircle,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Camera,
  Upload,
  Layers,
  Sparkles,
  Shield,
  ArrowRight,
  Save,
  X,
  ExternalLink,
  Sliders,
  Check,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface VehiclePhotos {
  exterior?: string;
  interior?: string;
  gallery?: string[];
}

interface VehicleRecord {
  id: string;
  name: string;
  category: string;
  seats: number;
  bags: number;
  is_active: boolean;
  display_order?: number;
  photos?: VehiclePhotos;
  features?: string[];
  translations?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export default function AdminFleetPage() {
  const [fleet, setFleet] = useState<VehicleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Active view modal
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null);
  const [activePhotoTab, setActivePhotoTab] = useState<Record<string, 'exterior' | 'interior'>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State for Editing/Creating
  const [formData, setFormData] = useState<Partial<VehicleRecord>>({});
  const [nameAr, setNameAr] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [uploadingExt, setUploadingExt] = useState(false);
  const [uploadingInt, setUploadingInt] = useState(false);

  const handleUploadExterior = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingExt(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('category', 'fleet');
      fd.append('vehicleId', formData.id || 'vehicle');
      const res = await fetch('/api/admin/media/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev: any) => ({
          ...prev,
          photos: { ...prev.photos, exterior: data.url },
        }));
        setFeedback({ type: 'success', message: 'Exterior studio photo uploaded successfully!' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Upload failed' });
    } finally {
      setUploadingExt(false);
    }
  };

  const handleUploadInterior = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingInt(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('category', 'fleet');
      fd.append('vehicleId', formData.id || 'vehicle');
      const res = await fetch('/api/admin/media/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev: any) => ({
          ...prev,
          photos: { ...prev.photos, interior: data.url },
        }));
        setFeedback({ type: 'success', message: 'Interior cabin photo uploaded successfully!' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Upload failed' });
    } finally {
      setUploadingInt(false);
    }
  };

  const fetchFleet = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/fleet');
      const data = await res.json();
      if (res.ok && data.fleet) {
        setFleet(data.fleet);
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to load fleet catalog' });
      }
    } catch (err: any) {
      console.error('Failed to load fleet:', err);
      setFeedback({ type: 'error', message: 'Network error connecting to fleet service' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFleet();
  }, []);

  const filteredFleet = useMemo(() => {
    return fleet.filter((v) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q);

      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && v.is_active) ||
        (statusFilter === 'inactive' && !v.is_active);

      const matchCat = categoryFilter === 'all' || v.category === categoryFilter;

      return matchQuery && matchStatus && matchCat;
    });
  }, [fleet, searchQuery, statusFilter, categoryFilter]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    fleet.forEach((v) => { if (v.category) set.add(v.category); });
    return Array.from(set);
  }, [fleet]);

  const totalSeats = useMemo(() => fleet.reduce((acc, v) => acc + (v.is_active ? Number(v.seats || 0) : 0), 0), [fleet]);
  const totalBags = useMemo(() => fleet.reduce((acc, v) => acc + (v.is_active ? Number(v.bags || 0) : 0), 0), [fleet]);

  const toggleStatus = async (vehicle: VehicleRecord) => {
    const updatedStatus = !vehicle.is_active;
    // Optimistic UI update
    setFleet((prev) => prev.map((v) => (v.id === vehicle.id ? { ...v, is_active: updatedStatus } : v)));

    try {
      const res = await fetch('/api/admin/fleet', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: vehicle.id, is_active: updatedStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({
          type: 'success',
          message: `${vehicle.name} status updated to ${updatedStatus ? 'Published Live' : 'Hidden from Website'}. Public cache revalidated.`,
        });
      } else {
        // Rollback
        setFleet((prev) => prev.map((v) => (v.id === vehicle.id ? { ...v, is_active: !updatedStatus } : v)));
        setFeedback({ type: 'error', message: data.error || 'Failed to update vehicle status' });
      }
    } catch {
      setFleet((prev) => prev.map((v) => (v.id === vehicle.id ? { ...v, is_active: !updatedStatus } : v)));
      setFeedback({ type: 'error', message: 'Network error updating vehicle status' });
    }
  };

  const handleOpenEdit = (vehicle: VehicleRecord) => {
    setFormData({ ...vehicle });
    setNameEn(vehicle.translations?.en?.name || vehicle.name || '');
    setNameAr(vehicle.translations?.ar?.name || vehicle.name || '');
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleOpenCreate = () => {
    const template: Partial<VehicleRecord> = {
      id: '',
      name: '',
      category: 'Sedan VIP',
      seats: 4,
      bags: 3,
      is_active: true,
      display_order: (fleet.length + 1) * 10,
      photos: {
        exterior: '/assets/images/vehicles/toyota-camry/exterior-studio.webp',
        interior: '/assets/images/vehicles/toyota-camry/interior.webp',
        gallery: [],
      },
      features: ['Air Conditioned', 'Complimentary Water', 'VIP Seating'],
    };
    setFormData(template);
    setNameEn('');
    setNameAr('');
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.id) {
      setFeedback({ type: 'error', message: 'Please provide both vehicle ID and Name' });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        name: nameEn || formData.name,
        translations: {
          en: { name: nameEn || formData.name },
          ar: { name: nameAr || formData.name },
        },
      };

      const method = isCreating ? 'POST' : 'PATCH';
      const res = await fetch('/api/admin/fleet', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setFeedback({
          type: 'success',
          message: `Vehicle ${payload.name} successfully ${isCreating ? 'created' : 'updated'}. Changes synced across all 10 locales.`,
        });
        setIsEditing(false);
        fetchFleet();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to save vehicle' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error saving vehicle' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteVehicle = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete vehicle "${name}" [${id}]? Core fleet vehicles cannot be deleted.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/fleet?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: 'success', message: `Vehicle ${name} removed from fleet catalog.` });
        fetchFleet();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to delete vehicle' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error deleting vehicle' });
    }
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    const current = formData.features || [];
    setFormData({ ...formData, features: [...current, newFeature.trim()] });
    setNewFeature('');
  };

  const removeFeature = (idx: number) => {
    const current = [...(formData.features || [])];
    current.splice(idx, 1);
    setFormData({ ...formData, features: current });
  };

  return (
    <div className="space-y-6 text-start">
      {/* 1. EXECUTIVE FLEET COMMAND HEADER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#101725] via-[#090D15] to-[#141D2C] border border-[#1F2C42] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.65)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#D6A13A]/10 via-[#A97B27]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A13A]/15 border border-[#D6A13A]/30 text-xs font-bold text-[#D6A13A]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Duyuf Alrahman VIP • Executive Chauffeur Fleet Command</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F4F1E9] tracking-tight">
              VIP Fleet &amp; Specifications Studio
            </h1>

            <p className="text-xs sm:text-sm text-[#A5B0C2] font-light max-w-2xl leading-relaxed">
              Manage the 5 core VIP vehicle models (Camry, Staria VIP, Yukon XL VIP, HiAce, Coaster). Capacities, studio exterior/interior photography, and localized 10-language specifications sync instantly with zero redeployment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => fetchFleet()}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141D2C] hover:bg-[#1A2538] border border-[#1F2C42] text-xs font-bold text-[#F4F1E9] transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A13A] to-[#A97B27] hover:from-[#E2B755] hover:to-[#B8872D] text-xs font-bold text-[#090D15] transition-all shadow-[0_0_20px_rgba(214,161,58,0.35)] hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>
          </div>
        </div>

        {/* 4 FLEET CAPACITY METRIC PODS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-[#1F2C42]/80">
          <div className="p-3.5 rounded-xl bg-[#090D15]/80 border border-[#1F2C42]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#A5B0C2] flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-[#D6A13A]" />
              <span>Total Fleet Models</span>
            </span>
            <div className="mt-2 text-2xl font-bold font-mono text-[#F4F1E9]">
              {fleet.length} <span className="text-xs text-[#A5B0C2] font-normal">Vehicles</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#090D15]/80 border border-[#1F2C42]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Published Live</span>
            </span>
            <div className="mt-2 text-2xl font-bold font-mono text-emerald-400">
              {fleet.filter((v) => v.is_active).length} <span className="text-xs text-emerald-300/70 font-normal">Active</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#090D15]/80 border border-[#1F2C42]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#D6A13A] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Simultaneous Passengers</span>
            </span>
            <div className="mt-2 text-2xl font-bold font-mono text-[#F4F1E9]">
              {totalSeats} <span className="text-xs text-[#A5B0C2] font-normal">Pax Capacity</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#090D15]/80 border border-[#1F2C42]">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#A5B0C2] flex items-center gap-1.5">
              <Luggage className="w-3.5 h-3.5 text-[#D6A13A]" />
              <span>Total Luggage Hold</span>
            </span>
            <div className="mt-2 text-2xl font-bold font-mono text-[#F4F1E9]">
              {totalBags} <span className="text-xs text-[#A5B0C2] font-normal">Large Bags</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FEEDBACK BANNER */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold animate-in fade-in duration-200 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. FILTERS & SEARCH CONTROLS */}
      <div className="p-4 rounded-2xl bg-[#101725] border border-[#1F2C42] flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between shadow-sm">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#090D15] border border-[#1F2C42]">
          {(['all', 'active', 'inactive'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                statusFilter === tab
                  ? 'bg-gradient-to-r from-[#D6A13A] to-[#A97B27] text-[#090D15] shadow-sm'
                  : 'text-[#A5B0C2] hover:text-[#F4F1E9]'
              }`}
            >
              {tab === 'all' ? 'All Vehicles' : tab === 'active' ? 'Published' : 'Hidden'}
            </button>
          ))}
        </div>

        {/* Category & Search Input */}
        <div className="flex flex-wrap items-center gap-3">
          {categories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-9 px-3 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9] focus:outline-none focus:border-[#D6A13A] cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          <div className="relative flex-1 sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A5B0C2]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search model, category, ID..."
              className="w-full h-9 pl-9 pr-3 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9] placeholder-[#55637A] focus:outline-none focus:border-[#D6A13A]"
            />
          </div>
        </div>
      </div>

      {/* 4. VISUAL VEHICLE CATALOG GRID */}
      {loading ? (
        <div className="p-16 rounded-2xl bg-[#101725] border border-[#1F2C42] flex flex-col items-center justify-center gap-3 text-center">
          <RefreshCw className="w-7 h-7 text-[#D6A13A] animate-spin" />
          <p className="text-xs text-[#A5B0C2]">Loading high-resolution fleet catalog from database...</p>
        </div>
      ) : filteredFleet.length === 0 ? (
        <div className="p-16 rounded-2xl bg-[#101725] border border-[#1F2C42] text-center flex flex-col items-center justify-center gap-3">
          <Car className="w-8 h-8 text-[#D6A13A]" />
          <h3 className="text-base font-bold text-[#F4F1E9]">No Vehicles Found</h3>
          <p className="text-xs text-[#A5B0C2] max-w-sm">
            No vehicle profiles match your search criteria. Try resetting filters or adding a new VIP model.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFleet.map((vehicle) => {
            const currentTab = activePhotoTab[vehicle.id] || 'exterior';
            const exteriorPhoto = vehicle.photos?.exterior || '/assets/images/vehicles/toyota-camry/exterior-studio.webp';
            const interiorPhoto = vehicle.photos?.interior || '/assets/images/vehicles/toyota-camry/interior.webp';
            const displayPhoto = currentTab === 'interior' ? interiorPhoto : exteriorPhoto;

            return (
              <div
                key={vehicle.id}
                className={`rounded-2xl bg-[#101725] border transition-all duration-200 overflow-hidden flex flex-col shadow-lg group hover:border-[#D6A13A]/50 ${
                  vehicle.is_active ? 'border-[#1F2C42]' : 'border-rose-900/30 opacity-75'
                }`}
              >
                {/* PHOTO HEADER WITH EXTERIOR/INTERIOR TOGGLE */}
                <div className="relative h-56 w-full bg-[#090D15] overflow-hidden">
                  <Image
                    src={displayPhoto}
                    alt={vehicle.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Status & Category Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#090D15]/90 text-[#D6A13A] border border-[#D6A13A]/40 backdrop-blur-md">
                      {vehicle.category}
                    </span>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md ${
                        vehicle.is_active
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {vehicle.is_active ? '● Live on Site' : '○ Hidden'}
                    </span>
                  </div>

                  {/* Bottom View Switcher (Exterior / Interior) */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-[#090D15]/90 backdrop-blur-md p-1 rounded-xl border border-[#1F2C42]">
                    <button
                      onClick={() => setActivePhotoTab({ ...activePhotoTab, [vehicle.id]: 'exterior' })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                        currentTab === 'exterior' ? 'bg-[#D6A13A] text-[#090D15]' : 'text-[#A5B0C2] hover:text-[#F4F1E9]'
                      }`}
                    >
                      Exterior
                    </button>
                    <button
                      onClick={() => setActivePhotoTab({ ...activePhotoTab, [vehicle.id]: 'interior' })}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                        currentTab === 'interior' ? 'bg-[#D6A13A] text-[#090D15]' : 'text-[#A5B0C2] hover:text-[#F4F1E9]'
                      }`}
                    >
                      Interior
                    </button>
                  </div>
                </div>

                {/* VEHICLE CONTENT BODY */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display font-extrabold text-lg text-[#F4F1E9]">
                          {vehicle.name}
                        </h3>
                        <span className="text-[11px] font-mono text-[#D6A13A]">
                          ID: {vehicle.id}
                        </span>
                      </div>

                      {/* Display Order Pill */}
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#141D2C] text-[#A5B0C2] border border-[#1F2C42]">
                        Order #{vehicle.display_order || 0}
                      </span>
                    </div>

                    {/* CAPACITY PODS */}
                    <div className="grid grid-cols-2 gap-2 mt-3.5">
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-[#090D15] border border-[#1F2C42]">
                        <Users className="w-4 h-4 text-[#D6A13A] shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-bold text-[#A5B0C2]">Capacity</span>
                          <span className="text-xs font-bold text-[#F4F1E9]">{vehicle.seats} Passengers</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-2 rounded-xl bg-[#090D15] border border-[#1F2C42]">
                        <Luggage className="w-4 h-4 text-[#D6A13A] shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-[9px] uppercase font-bold text-[#A5B0C2]">Luggage Hold</span>
                          <span className="text-xs font-bold text-[#F4F1E9]">{vehicle.bags} Large Bags</span>
                        </div>
                      </div>
                    </div>

                    {/* FEATURES CHIPS */}
                    {vehicle.features && vehicle.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {vehicle.features.slice(0, 3).map((feat, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-[#141D2C] border border-[#1F2C42] text-[10px] text-[#A5B0C2]"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                        {vehicle.features.length > 3 && (
                          <span className="px-1.5 py-0.5 text-[10px] text-[#A5B0C2]">
                            +{vehicle.features.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* BOTTOM ACTIONS */}
                  <div className="pt-4 border-t border-[#1F2C42] flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleStatus(vehicle)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        vehicle.is_active
                          ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      }`}
                    >
                      {vehicle.is_active ? 'Hide on Site' : 'Publish Live'}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(vehicle)}
                        title="Edit Specifications &amp; Photos"
                        className="p-2 rounded-xl bg-[#141D2C] hover:bg-[#1A2538] border border-[#1F2C42] text-[#D6A13A] transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteVehicle(vehicle.id, vehicle.name)}
                        title="Delete vehicle"
                        className="p-2 rounded-xl bg-[#141D2C] hover:bg-rose-950/30 border border-[#1F2C42] hover:border-rose-500/40 text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. MODAL: EDIT / CREATE VEHICLE PROFILE */}
      {isEditing && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsEditing(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-[#101725] border border-[#1F2C42] shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F2C42] bg-[#090D15]">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-[#D6A13A]" />
                <h3 className="font-display font-bold text-base text-[#F4F1E9]">
                  {isCreating ? 'Register New VIP Fleet Vehicle' : `Edit Vehicle Specifications • ${formData.name}`}
                </h3>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-[#A5B0C2] hover:text-[#F4F1E9] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveVehicle} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* ID & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1.5">
                    Vehicle Slug ID {isCreating ? '(Required, permanent)' : '(Locked)'}
                  </label>
                  <input
                    type="text"
                    disabled={!isCreating}
                    value={formData.id || ''}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="e.g. camry, staria, yukon"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs font-mono text-[#F4F1E9] disabled:opacity-50 focus:outline-none focus:border-[#D6A13A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1.5">
                    Category Tier
                  </label>
                  <select
                    value={formData.category || 'Sedan VIP'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9] focus:outline-none focus:border-[#D6A13A] cursor-pointer"
                  >
                    <option value="Sedan VIP">Sedan VIP (e.g. Camry)</option>
                    <option value="VIP MPV">VIP MPV / Minivan (e.g. Staria VIP)</option>
                    <option value="Luxury SUV">Luxury SUV (e.g. Yukon XL VIP)</option>
                    <option value="Minibus VIP">Minibus VIP (e.g. HiAce)</option>
                    <option value="Group Coach VIP">Group Coach VIP (e.g. Coaster)</option>
                  </select>
                </div>
              </div>

              {/* Localized Names (EN & AR) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1.5">
                    English Name
                  </label>
                  <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder="e.g. Toyota Camry VIP"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9] focus:outline-none focus:border-[#D6A13A]"
                    required
                  />
                </div>

                <div dir="rtl">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1.5 text-right">
                    الاسم باللغة العربية
                  </label>
                  <input
                    type="text"
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    placeholder="مثال: تويوتا كامري VIP"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9] focus:outline-none focus:border-[#D6A13A] text-right"
                    required
                  />
                </div>
              </div>

              {/* Capacities */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-[#090D15] border border-[#1F2C42]">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D6A13A] mb-1.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>Passengers (Seats)</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={formData.seats || 4}
                    onChange={(e) => setFormData({ ...formData, seats: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-[#141D2C] border border-[#1F2C42] text-xs font-mono font-bold text-[#F4F1E9] focus:outline-none focus:border-[#D6A13A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D6A13A] mb-1.5 flex items-center gap-1">
                    <Luggage className="w-3.5 h-3.5" />
                    <span>Luggage (Bags)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={formData.bags || 3}
                    onChange={(e) => setFormData({ ...formData, bags: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-[#141D2C] border border-[#1F2C42] text-xs font-mono font-bold text-[#F4F1E9] focus:outline-none focus:border-[#D6A13A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1.5 flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Display Order</span>
                  </label>
                  <input
                    type="number"
                    value={formData.display_order || 10}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-[#141D2C] border border-[#1F2C42] text-xs font-mono text-[#F4F1E9] focus:outline-none focus:border-[#D6A13A]"
                  />
                </div>
              </div>

              {/* Visual Interactive Studio Photography Manager */}
              <div className="space-y-4 p-4 rounded-xl bg-[#090D15] border border-[#1F2C42]">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#D6A13A] flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Studio Vehicle Photography (Visual Upload &amp; Preview)</span>
                  </label>
                  <a
                    href="/admin/media"
                    target="_blank"
                    className="text-[10px] text-slate-400 hover:text-[#E6C773] underline flex items-center gap-1"
                  >
                    <span>Manage Full Gallery in Vault</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Exterior Studio Photo */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-300 block">★ Exterior Studio Photo</span>
                    <div className="relative w-full h-32 rounded-lg bg-[#141D2C] border border-[#1F2C42] overflow-hidden flex items-center justify-center">
                      {formData.photos?.exterior ? (
                        <Image
                          src={formData.photos.exterior}
                          alt="Exterior preview"
                          fill
                          unoptimized={formData.photos.exterior.startsWith('http')}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-xs text-slate-500">No exterior photo</span>
                      )}
                    </div>
                    <label className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#141D2C] hover:bg-[#1A2538] border border-[#1F2C42] text-xs font-bold text-white cursor-pointer transition-colors">
                      <Upload className={`w-3.5 h-3.5 text-[#D6A13A] ${uploadingExt ? 'animate-bounce' : ''}`} />
                      <span>{uploadingExt ? 'Uploading...' : 'Upload Exterior from PC'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadExterior}
                        disabled={uploadingExt}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Interior Cabin Photo */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-300 block">Luxury Cabin Interior Photo</span>
                    <div className="relative w-full h-32 rounded-lg bg-[#141D2C] border border-[#1F2C42] overflow-hidden flex items-center justify-center">
                      {formData.photos?.interior ? (
                        <Image
                          src={formData.photos.interior}
                          alt="Interior preview"
                          fill
                          unoptimized={formData.photos.interior.startsWith('http')}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-xs text-slate-500">No interior photo</span>
                      )}
                    </div>
                    <label className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#141D2C] hover:bg-[#1A2538] border border-[#1F2C42] text-xs font-bold text-white cursor-pointer transition-colors">
                      <Upload className={`w-3.5 h-3.5 text-[#D6A13A] ${uploadingInt ? 'animate-bounce' : ''}`} />
                      <span>{uploadingInt ? 'Uploading...' : 'Upload Interior from PC'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadInterior}
                        disabled={uploadingInt}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#A5B0C2] mb-1.5">
                  VIP Features Checklist
                </label>

                <div className="flex flex-wrap gap-2 mb-2.5">
                  {(formData.features || []).map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9]"
                    >
                      <span>✓ {feat}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        className="text-rose-400 hover:text-rose-300 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                    placeholder="Type feature (e.g. Leather VIP Recliners) and press Enter"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#090D15] border border-[#1F2C42] text-xs text-[#F4F1E9] focus:outline-none focus:border-[#D6A13A]"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3.5 py-2 rounded-xl bg-[#141D2C] hover:bg-[#1A2538] border border-[#1F2C42] text-xs font-bold text-[#D6A13A]"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#1F2C42] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#141D2C] hover:bg-[#1A2538] border border-[#1F2C42] text-xs font-bold text-[#A5B0C2] transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A13A] to-[#A97B27] hover:from-[#E2B755] hover:to-[#B8872D] text-xs font-bold text-[#090D15] transition-all shadow-[0_0_15px_rgba(214,161,58,0.35)] disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save & Publish Live'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
