'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  Plus,
  RefreshCw,
  Save,
  CheckCircle2,
  AlertCircle,
  Car,
  Layers,
  Globe,
  Trash2,
  Upload,
  Star,
  Eye,
  EyeOff,
  Check,
  Copy,
  ExternalLink,
  X,
  Camera,
  Sparkles,
  Sliders,
  Maximize2,
  ShieldCheck,
} from 'lucide-react';

interface VehicleRecord {
  id: string;
  name: string;
  category: string;
  seats: number;
  bags: number;
  is_active: boolean;
  photos?: {
    exterior?: string;
    interior?: string;
    gallery?: string[];
  };
}

export default function AdminMediaPage() {
  const [vehicles, setVehicles] = useState<VehicleRecord[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Direct Upload States
  const [uploadingExtFor, setUploadingExtFor] = useState<string | null>(null);
  const [uploadingIntFor, setUploadingIntFor] = useState<string | null>(null);

  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadVehicleTarget, setUploadVehicleTarget] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [photoRole, setPhotoRole] = useState<'gallery' | 'exterior' | 'interior'>('gallery');
  const [isUploading, setIsUploading] = useState(false);

  // Fullscreen Preview Modal
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/fleet');
      const data = await res.json();
      if (res.ok && data.fleet) {
        setVehicles(data.fleet);
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to load fleet media' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error connecting to fleet service' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // 1. TOGGLE LIVE VISIBILITY (إظهار / إخفاء من الموقع الحي)
  const handleToggleActive = async (vehicleId: string, currentStatus: boolean) => {
    const updatedStatus = !currentStatus;
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, is_active: updatedStatus } : v))
    );

    try {
      const res = await fetch('/api/admin/fleet', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: vehicleId, is_active: updatedStatus }),
      });
      if (res.ok) {
        setFeedback({
          type: 'success',
          message: updatedStatus
            ? `✓ تم تفعيل ونشر السيارة على الموقع الحي بنجاح! تظهر الآن لجميع الزوار.`
            : `✓ تم إخفاء السيارة عن الموقع الحي بنجاح. لن تظهر للزوار حتى تعيد تفعيلها.`,
        });
      } else {
        // Rollback
        setVehicles((prev) =>
          prev.map((v) => (v.id === vehicleId ? { ...v, is_active: currentStatus } : v))
        );
        setFeedback({ type: 'error', message: 'Failed to update vehicle visibility status' });
      }
    } catch {
      setVehicles((prev) =>
        prev.map((v) => (v.id === vehicleId ? { ...v, is_active: currentStatus } : v))
      );
      setFeedback({ type: 'error', message: 'Network error updating vehicle status' });
    }
  };

  // 2. DIRECT UPLOAD FOR EXTERIOR OR INTERIOR
  const handleDirectUploadPhoto = async (
    vehicleId: string,
    role: 'exterior' | 'interior',
    file: File
  ) => {
    if (role === 'exterior') setUploadingExtFor(vehicleId);
    else setUploadingIntFor(vehicleId);

    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('category', 'fleet');
      fd.append('vehicleId', vehicleId);
      const res = await fetch('/api/admin/media/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed');

      const vehicle = vehicles.find((v) => v.id === vehicleId);
      const currentPhotos = vehicle?.photos || {};
      const currentGallery = currentPhotos.gallery || [];
      const updatedGallery = [data.url, ...currentGallery.filter((u) => u !== data.url)];

      const updatedPhotos = {
        ...currentPhotos,
        [role]: data.url,
        gallery: updatedGallery,
      };

      const patchRes = await fetch('/api/admin/fleet', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: vehicleId, photos: updatedPhotos }),
      });

      if (patchRes.ok) {
        setFeedback({
          type: 'success',
          message:
            role === 'exterior'
              ? `✓ تم رفع وتحديث الصورة الخارجية بنجاح! تغيرت الآن فوراً على الموقع الحي.`
              : `✓ تم رفع وتحديث صورة المقصورة الداخلية بنجاح! تغيرت الآن فوراً على الموقع الحي.`,
        });
        fetchVehicles();
      } else {
        setFeedback({ type: 'error', message: 'Failed to assign uploaded photo' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Upload failed' });
    } finally {
      setUploadingExtFor(null);
      setUploadingIntFor(null);
    }
  };

  // 3. SET AS MAIN EXTERIOR PHOTO
  const handleSetMainPhoto = async (vehicleId: string, photoUrl: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    const currentPhotos = vehicle.photos || {};
    const updatedPhotos = {
      ...currentPhotos,
      exterior: photoUrl,
    };

    try {
      const res = await fetch('/api/admin/fleet', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: vehicleId, photos: updatedPhotos }),
      });
      if (res.ok) {
        setFeedback({
          type: 'success',
          message: `✓ تم تعيينها كصورة خارجية رئيسية لـ ${vehicle.name}! تغيرت على الموقع الحي فوراً.`,
        });
        fetchVehicles();
      } else {
        setFeedback({ type: 'error', message: 'Failed to set main exterior photo' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error updating main photo' });
    }
  };

  // 4. SET AS CABIN INTERIOR PHOTO
  const handleSetInteriorPhoto = async (vehicleId: string, photoUrl: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    const currentPhotos = vehicle.photos || {};
    const updatedPhotos = {
      ...currentPhotos,
      interior: photoUrl,
    };

    try {
      const res = await fetch('/api/admin/fleet', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: vehicleId, photos: updatedPhotos }),
      });
      if (res.ok) {
        setFeedback({
          type: 'success',
          message: `✓ تم تعيينها كصورة مقصورة داخلية لـ ${vehicle.name}! تغيرت على الموقع الحي فوراً.`,
        });
        fetchVehicles();
      } else {
        setFeedback({ type: 'error', message: 'Failed to set interior photo' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error updating interior photo' });
    }
  };

  // 5. DELETE PHOTO
  const handleDeletePhoto = async (vehicleId: string, photoUrl: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    if (!confirm(`هل أنت متأكد من حذف هذه الصورة من ${vehicle.name}؟`)) return;

    const currentPhotos = vehicle.photos || {};
    const updatedGallery = (currentPhotos.gallery || []).filter((u) => u !== photoUrl);

    let newExterior = currentPhotos.exterior;
    if (newExterior === photoUrl) {
      newExterior = updatedGallery[0] || '';
    }

    let newInterior = currentPhotos.interior;
    if (newInterior === photoUrl) {
      newInterior = updatedGallery.find((u) => u !== newExterior) || updatedGallery[0] || '';
    }

    const updatedPhotos = {
      gallery: updatedGallery,
      exterior: newExterior,
      interior: newInterior,
    };

    try {
      const res = await fetch('/api/admin/fleet', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: vehicleId, photos: updatedPhotos }),
      });

      if (res.ok) {
        fetch(`/api/admin/media?url=${encodeURIComponent(photoUrl)}`, { method: 'DELETE' }).catch(() => {});

        setFeedback({
          type: 'success',
          message: `✓ تم حذف الصورة بنجاح وتحديث الموقع الحي فوراً.`,
        });
        fetchVehicles();
      } else {
        setFeedback({ type: 'error', message: 'Failed to remove photo' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error removing photo' });
    }
  };

  // Handle modal submit
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', selectedFile);
      fd.append('category', 'fleet');
      fd.append('vehicleId', uploadVehicleTarget);

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      const uploadedUrl = data.url;
      const targetVehicle = vehicles.find((v) => v.id === uploadVehicleTarget);
      if (targetVehicle) {
        const currentPhotos = targetVehicle.photos || {};
        const currentGallery = currentPhotos.gallery || [];
        const updatedGallery = [uploadedUrl, ...currentGallery.filter((u) => u !== uploadedUrl)];

        const updatedPhotos: any = {
          ...currentPhotos,
          gallery: updatedGallery,
        };

        if (photoRole === 'exterior') {
          updatedPhotos.exterior = uploadedUrl;
        } else if (photoRole === 'interior') {
          updatedPhotos.interior = uploadedUrl;
        }

        await fetch('/api/admin/fleet', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: uploadVehicleTarget,
            photos: updatedPhotos,
          }),
        });

        setFeedback({
          type: 'success',
          message: `✓ تم رفع الصورة وحفظها بنجاح لـ ${targetVehicle.name}! وتحديث الموقع الحي فوراً.`,
        });

        setIsUploadModalOpen(false);
        setSelectedFile(null);
        setFilePreview(null);
        fetchVehicles();
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Error uploading photo' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const filteredVehicles = useMemo(() => {
    if (selectedVehicleId === 'all') return vehicles;
    return vehicles.filter((v) => v.id === selectedVehicleId);
  }, [vehicles, selectedVehicleId]);

  const activeVehiclesCount = useMemo(() => {
    return vehicles.filter((v) => v.is_active).length;
  }, [vehicles]);

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
              إدارة الأسطول والوسائط السحابية
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            التحكم في ظهور السيارات والصور الداخلية والخارجية
          </h1>
          <p className="text-xs sm:text-sm text-[#8E9CAE] mt-0.5">
            تحكم كامل في إظهار أو إخفاء أي سيارة من الموقع الحي، وتعيين الصور الخارجية والمقصورة الداخلية بضغطة زر واحدة.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchVehicles()}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#101726] hover:bg-[#151D2C] border border-[#1F2C42] text-xs font-bold text-white transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#C9A24B]' : ''}`} />
            <span>تحديث</span>
          </button>

          <button
            onClick={() => {
              setUploadVehicleTarget(vehicles[0]?.id || 'camry');
              setFilePreview(null);
              setSelectedFile(null);
              setIsUploadModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A24B] to-[#E6C773] hover:brightness-110 text-xs font-extrabold text-[#0B0F17] transition-all shadow-[0_2px_12px_rgba(201,162,75,0.35)]"
          >
            <Upload className="w-4 h-4" />
            <span>رفع صورة جديدة</span>
          </button>
        </div>
      </div>

      {/* 2. STATS SUMMARY STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[#101726] border border-[#1F2C42]">
          <span className="text-[11px] font-bold text-slate-400 block">إجمالي سيارات الأسطول</span>
          <span className="text-xl font-bold font-mono text-white mt-1 block">{vehicles.length} فئات</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#101726] border border-emerald-500/30">
          <span className="text-[11px] font-bold text-emerald-400 block">معروضة في الموقع الحي</span>
          <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">{activeVehiclesCount} سيارات</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#101726] border border-rose-500/30">
          <span className="text-[11px] font-bold text-rose-400 block">مخفية عن الزوار</span>
          <span className="text-xl font-bold font-mono text-rose-400 mt-1 block">{vehicles.length - activeVehiclesCount} سيارات</span>
        </div>
        <div className="p-3.5 rounded-xl bg-[#101726] border border-[#C9A24B]/30">
          <span className="text-[11px] font-bold text-[#E6C773] block">حالة التخزين السحابي</span>
          <span className="text-xs font-bold text-white mt-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Supabase Storage متصل</span>
          </span>
        </div>
      </div>

      {/* 3. FEEDBACK NOTIFICATION */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-bold animate-in fade-in duration-200 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
              : 'bg-rose-950/50 border-rose-500/50 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4. VEHICLE TABS FILTER BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedVehicleId('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            selectedVehicleId === 'all'
              ? 'bg-gradient-to-r from-[#C9A24B] to-[#E6C773] text-[#0B0F17] shadow-sm'
              : 'bg-[#101726] hover:bg-[#151D2C] text-slate-300 border border-[#1F2C42]'
          }`}
        >
          <span>كل سيارات الأسطول</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
            {vehicles.length}
          </span>
        </button>

        {vehicles.map((v) => (
          <button
            key={v.id}
            onClick={() => setSelectedVehicleId(v.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              selectedVehicleId === v.id
                ? 'bg-gradient-to-r from-[#C9A24B] to-[#E6C773] text-[#0B0F17] shadow-sm'
                : 'bg-[#101726] hover:bg-[#151D2C] text-slate-300 border border-[#1F2C42]'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                v.is_active ? 'bg-emerald-400' : 'bg-rose-500'
              }`}
              title={v.is_active ? 'معروضة على الموقع' : 'مخفية'}
            />
            <span>{v.name}</span>
          </button>
        ))}
      </div>

      {/* 5. MAIN VEHICLE MEDIA STATIONS */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-7 h-7 animate-spin text-[#C9A24B]" />
          <span className="text-xs font-semibold">جارٍ تحميل بيانات وصور الأسطول...</span>
        </div>
      ) : filteredVehicles.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-[#101726] rounded-2xl border border-[#1F2C42]">
          <Car className="w-10 h-10 mx-auto mb-2 text-slate-600" />
          <span className="text-sm font-bold text-white block">لا توجد سيارات مطابقة</span>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredVehicles.map((vehicle) => {
            const ext = vehicle.photos?.exterior || '/assets/images/vehicles/toyota-camry/exterior-studio.webp';
            const int = vehicle.photos?.interior || '/assets/images/vehicles/toyota-camry/interior.webp';
            const gallery = (vehicle.photos?.gallery || []).filter((u) => u !== ext && u !== int);

            const isExtUploading = uploadingExtFor === vehicle.id;
            const isIntUploading = uploadingIntFor === vehicle.id;

            return (
              <div
                key={vehicle.id}
                className={`p-6 rounded-2xl bg-[#101726] border transition-all duration-300 space-y-6 ${
                  vehicle.is_active ? 'border-[#1F2C42]' : 'border-rose-900/40 opacity-90'
                }`}
              >
                {/* VEHICLE CONTROL HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1F2C42]">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#0B0F17] border border-[#C9A24B]/40 flex items-center justify-center text-[#E6C773] shrink-0 shadow-inner">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h2 className="text-lg font-extrabold text-white">{vehicle.name}</h2>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#0B0F17] text-[#E6C773] border border-[#C9A24B]/30 font-extrabold uppercase">
                          {vehicle.category}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        معرف النظام: <code className="text-[#C9A24B] font-mono">{vehicle.id}</code> • {vehicle.seats} ركاب • {vehicle.bags} حقائب
                      </span>
                    </div>
                  </div>

                  {/* VISIBILITY TOGGLE & ACTION BUTTONS */}
                  <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
                    {/* Live Website Show/Hide Toggle Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleActive(vehicle.id, vehicle.is_active)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black border transition-all shadow-sm ${
                        vehicle.is_active
                          ? 'bg-emerald-950/60 hover:bg-rose-950/50 text-emerald-300 hover:text-rose-300 border-emerald-500/50 hover:border-rose-500/50'
                          : 'bg-rose-950/60 hover:bg-emerald-950/50 text-rose-300 hover:text-emerald-300 border-rose-500/50 hover:border-emerald-500/50'
                      }`}
                      title={vehicle.is_active ? 'انقر لإخفاء السيارة من الموقع' : 'انقر لإظهار السيارة في الموقع'}
                    >
                      {vehicle.is_active ? (
                        <>
                          <Eye className="w-4 h-4 text-emerald-400" />
                          <span>معروضة في الموقع الحي (انقر للإخفاء)</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4 text-rose-400" />
                          <span>مخفية عن الزوار (انقر للنشر)</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setUploadVehicleTarget(vehicle.id);
                        setFilePreview(null);
                        setSelectedFile(null);
                        setIsUploadModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#151D2C] hover:bg-[#1F2C42] border border-[#1F2C42] text-xs font-bold text-[#E6C773] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة صورة أخرى</span>
                    </button>
                  </div>
                </div>

                {/* DUAL SHOWCASE: EXTERIOR AND INTERIOR DIRECT CONTROL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* CARD 1: MAIN EXTERIOR PHOTO */}
                  <div className="p-4 rounded-xl bg-[#0B0F17] border-2 border-[#C9A24B]/40 hover:border-[#C9A24B] transition-all space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#E6C773] flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-[#C9A24B] text-[#C9A24B]" />
                        <span>الصورة الخارجية الرئيسية (Exterior Studio)</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold">
                        تظهر في كرت السيارة بالرئيسية
                      </span>
                    </div>

                    <div className="relative w-full h-56 rounded-lg bg-[#070A10] overflow-hidden flex items-center justify-center border border-[#1F2C42]">
                      <Image
                        src={ext}
                        alt={`${vehicle.name} Exterior`}
                        fill
                        unoptimized={ext.startsWith('http')}
                        className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={() => setPreviewImage(ext)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-black text-white transition-opacity"
                        title="معاينة بالحجم الكامل"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="text-[10px] font-mono text-slate-400 truncate max-w-[180px]">
                        {ext.split('/').pop()}
                      </span>
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#C9A24B] to-[#E6C773] hover:brightness-110 text-xs font-black text-[#0B0F17] cursor-pointer transition-all shadow-sm">
                        <Upload className={`w-3.5 h-3.5 ${isExtUploading ? 'animate-bounce' : ''}`} />
                        <span>{isExtUploading ? 'جارٍ الرفع...' : 'تغيير الصورة الخارجية من PC'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isExtUploading}
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleDirectUploadPhoto(vehicle.id, 'exterior', f);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* CARD 2: LUXURY CABIN INTERIOR PHOTO */}
                  <div className="p-4 rounded-xl bg-[#0B0F17] border-2 border-[#C9A24B]/40 hover:border-[#C9A24B] transition-all space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#E6C773] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                        <span>صورة المقصورة الداخلية (Luxury Cabin Interior)</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#C9A24B]/20 text-[#E6C773] font-bold">
                        تظهر في استعراض راحة المقاعد
                      </span>
                    </div>

                    <div className="relative w-full h-56 rounded-lg bg-[#070A10] overflow-hidden flex items-center justify-center border border-[#1F2C42]">
                      <Image
                        src={int}
                        alt={`${vehicle.name} Interior`}
                        fill
                        unoptimized={int.startsWith('http')}
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={() => setPreviewImage(int)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-black text-white transition-opacity"
                        title="معاينة بالحجم الكامل"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <span className="text-[10px] font-mono text-slate-400 truncate max-w-[180px]">
                        {int.split('/').pop()}
                      </span>
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#C9A24B] to-[#E6C773] hover:brightness-110 text-xs font-black text-[#0B0F17] cursor-pointer transition-all shadow-sm">
                        <Upload className={`w-3.5 h-3.5 ${isIntUploading ? 'animate-bounce' : ''}`} />
                        <span>{isIntUploading ? 'جارٍ الرفع...' : 'تغيير الصورة الداخلية من PC'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isIntUploading}
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleDirectUploadPhoto(vehicle.id, 'interior', f);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* ADDITIONAL GALLERY PHOTOS (IF ANY) */}
                {gallery.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-slate-400 block">
                      صور إضافية في معرض هذه السيارة ({gallery.length} صور)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {gallery.map((imgUrl, gIdx) => (
                        <div
                          key={imgUrl + gIdx}
                          className="group relative rounded-xl bg-[#0B0F17] border border-[#1F2C42] overflow-hidden flex flex-col justify-between"
                        >
                          <div className="relative w-full h-32 bg-[#070A10]">
                            <Image
                              src={imgUrl}
                              alt="Gallery Item"
                              fill
                              unoptimized={imgUrl.startsWith('http')}
                              className="object-cover"
                            />
                            <button
                              onClick={() => setPreviewImage(imgUrl)}
                              className="absolute top-1.5 right-1.5 p-1 rounded bg-black/70 text-white"
                              title="تكبير"
                            >
                              <Maximize2 className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="p-2 space-y-1.5 bg-[#0B0F17] border-t border-[#1F2C42]">
                            <div className="grid grid-cols-2 gap-1">
                              <button
                                onClick={() => handleSetMainPhoto(vehicle.id, imgUrl)}
                                className="py-1 px-1.5 rounded bg-[#151D2C] hover:bg-[#C9A24B] hover:text-black text-[10px] font-bold text-slate-300 transition-colors"
                              >
                                كصورة خارجية
                              </button>
                              <button
                                onClick={() => handleSetInteriorPhoto(vehicle.id, imgUrl)}
                                className="py-1 px-1.5 rounded bg-[#151D2C] hover:bg-[#C9A24B] hover:text-black text-[10px] font-bold text-slate-300 transition-colors"
                              >
                                كصورة داخلية
                              </button>
                            </div>
                            <button
                              onClick={() => handleDeletePhoto(vehicle.id, imgUrl)}
                              className="w-full py-1 text-[10px] font-bold text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 rounded transition-colors"
                            >
                              حذف الصورة
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 6. UPLOAD NEW PHOTO MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#101726] border border-[#1F2C42] rounded-2xl max-w-lg w-full p-6 space-y-5 text-start shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F2C42]">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#C9A24B]" />
                <h3 className="text-base font-extrabold text-white">رفع صورة جديدة وتخصيصها للسيارة</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">اختر السيارة المستهدفة</label>
                <select
                  value={uploadVehicleTarget}
                  onChange={(e) => setUploadVehicleTarget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F17] border border-[#1F2C42] text-xs text-white focus:outline-none focus:border-[#C9A24B]"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">دور الصورة</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPhotoRole('exterior')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      photoRole === 'exterior'
                        ? 'bg-[#C9A24B] text-[#0B0F17] border-[#C9A24B]'
                        : 'bg-[#0B0F17] text-slate-300 border-[#1F2C42]'
                    }`}
                  >
                    ★ خارجية رئيسية
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoRole('interior')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      photoRole === 'interior'
                        ? 'bg-[#C9A24B] text-[#0B0F17] border-[#C9A24B]'
                        : 'bg-[#0B0F17] text-slate-300 border-[#1F2C42]'
                    }`}
                  >
                    مقصورة داخلية
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoRole('gallery')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                      photoRole === 'gallery'
                        ? 'bg-[#C9A24B] text-[#0B0F17] border-[#C9A24B]'
                        : 'bg-[#0B0F17] text-slate-300 border-[#1F2C42]'
                    }`}
                  >
                    معرض إضافي
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">اختر الملف من جهازك (JPG, PNG, WebP)</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      setFilePreview(URL.createObjectURL(file));
                    }
                  }}
                  className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#151D2C] file:text-[#E6C773] hover:file:bg-[#1F2C42] cursor-pointer"
                />
              </div>

              {filePreview && (
                <div className="relative w-full h-40 rounded-xl bg-[#0B0F17] border border-[#1F2C42] overflow-hidden flex items-center justify-center">
                  <Image src={filePreview} alt="Preview" fill unoptimized className="object-contain p-2" />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1F2C42]">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile || isUploading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A24B] to-[#E6C773] text-[#0B0F17] font-black text-xs transition-all shadow-md disabled:opacity-50"
                >
                  {isUploading ? 'جارٍ الرفع سحابياً...' : 'رفع وحفظ على الموقع'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. FULLSCREEN PREVIEW MODAL */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-[80vh]">
            <Image
              src={previewImage}
              alt="Fullscreen View"
              fill
              unoptimized={previewImage.startsWith('http')}
              className="object-contain"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
