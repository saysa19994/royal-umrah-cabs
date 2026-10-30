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
  Check,
  Copy,
  ExternalLink,
  X,
  Camera,
  Sparkles,
  Sliders,
  Maximize2,
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

  // Fullscreen Preview Modal
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadVehicleTarget, setUploadVehicleTarget] = useState<string>('camry');
  const [uploadRole, setUploadRole] = useState<'exterior' | 'interior' | 'gallery'>('gallery');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Copy status
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setFeedback({ type: 'error', message: 'Please select an image file to upload' });
      return;
    }

    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', selectedFile);
      fd.append('category', 'fleet');
      fd.append('vehicleId', uploadVehicleTarget);

      const uploadRes = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: fd,
      });

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok || !uploadData.url) {
        throw new Error(uploadData.error || 'Failed to upload image file');
      }

      const uploadedUrl = uploadData.url;

      // Now attach image to target vehicle
      const targetVehicle = vehicles.find((v) => v.id === uploadVehicleTarget);
      if (targetVehicle) {
        const existingPhotos = targetVehicle.photos || {};
        const currentGallery = Array.isArray(existingPhotos.gallery) ? [...existingPhotos.gallery] : [];

        if (!currentGallery.includes(uploadedUrl)) {
          currentGallery.push(uploadedUrl);
        }

        const updatedPhotos = {
          ...existingPhotos,
          gallery: currentGallery,
          exterior: uploadRole === 'exterior' ? uploadedUrl : (existingPhotos.exterior || uploadedUrl),
          interior: uploadRole === 'interior' ? uploadedUrl : (existingPhotos.interior || uploadedUrl),
        };

        const updateRes = await fetch('/api/admin/fleet', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: targetVehicle.id,
            photos: updatedPhotos,
          }),
        });

        if (!updateRes.ok) {
          throw new Error('Image uploaded but failed to link to vehicle');
        }

        setFeedback({
          type: 'success',
          message: `Photo uploaded successfully and assigned to ${targetVehicle.name}! Public site updated.`,
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
          message: `Set as Main Exterior photo for ${vehicle.name}. Website showcase updated live!`,
        });
        fetchVehicles();
      } else {
        setFeedback({ type: 'error', message: 'Failed to set main photo' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error updating main photo' });
    }
  };

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
          message: `Set as Luxury Cabin Interior photo for ${vehicle.name}. Website showcase updated live!`,
        });
        fetchVehicles();
      } else {
        setFeedback({ type: 'error', message: 'Failed to set interior photo' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error updating interior photo' });
    }
  };

  const handleDeletePhoto = async (vehicleId: string, photoUrl: string) => {
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (!vehicle) return;

    if (!confirm(`Are you sure you want to remove this photo from ${vehicle.name}?`)) return;

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
        // Also call delete API if it was an uploaded file
        if (photoUrl.startsWith('/assets/images/uploads/')) {
          fetch(`/api/admin/media?url=${encodeURIComponent(photoUrl)}`, { method: 'DELETE' }).catch(() => {});
        }

        setFeedback({
          type: 'success',
          message: `Photo successfully removed from ${vehicle.name}. Website updated immediately.`,
        });
        fetchVehicles();
      } else {
        setFeedback({ type: 'error', message: 'Failed to remove photo' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error removing photo' });
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

  const totalPhotosCount = useMemo(() => {
    let count = 0;
    vehicles.forEach((v) => {
      const g = v.photos?.gallery || [];
      count += g.length || (v.photos?.exterior ? 1 : 0);
    });
    return count;
  }, [vehicles]);

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#C9A24B]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B]">
              Visual Media Asset Vault
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            VIP Fleet Photography &amp; Media Vault
          </h1>
          <p className="text-xs sm:text-sm text-[#8E9CAE] mt-0.5">
            Full control over every vehicle&apos;s exterior studio renders, luxury cabin interiors, and marketing galleries. Changes reflect live in seconds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchVehicles()}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#101726] hover:bg-[#151D2C] border border-[#1F2C42] text-xs font-bold text-white transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#C9A24B]' : ''}`} />
            <span>Refresh</span>
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
            <span>Upload New Photo</span>
          </button>
        </div>
      </div>

      {/* 2. FEEDBACK NOTIFICATION */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-bold animate-in fade-in duration-200 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* 3. VEHICLE FILTER TABS */}
      <div className="p-3 rounded-2xl bg-[#101726] border border-[#1F2C42]">
        <div className="flex items-center justify-between gap-4 mb-2 px-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Filter Photos by Vehicle Model ({vehicles.length} Models • {totalPhotosCount} Photos)</span>
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedVehicleId('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedVehicleId === 'all'
                ? 'bg-gradient-to-r from-[#C9A24B] to-[#E6C773] text-[#0B0F17] shadow-xs'
                : 'bg-[#0B0F17] text-slate-300 hover:text-white border border-[#1F2C42]'
            }`}
          >
            All Fleet Vehicles
          </button>

          {vehicles.map((v) => {
            const isSelected = selectedVehicleId === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVehicleId(v.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#C9A24B] to-[#E6C773] text-[#0B0F17] shadow-xs'
                    : 'bg-[#0B0F17] text-slate-300 hover:text-white border border-[#1F2C42]'
                }`}
              >
                <span>{v.name}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-black/20 text-black' : 'bg-[#151D2C] text-slate-400'
                  }`}
                >
                  {v.photos?.gallery?.length || 2}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. FLEET PHOTO GALLERIES */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 flex flex-col items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-[#C9A24B]" />
          <span className="text-xs">Loading vehicle photo vaults...</span>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredVehicles.map((vehicle) => {
            const photos = vehicle.photos || {};
            const ext = photos.exterior || '';
            const int = photos.interior || '';
            const rawGallery = Array.isArray(photos.gallery) && photos.gallery.length > 0 ? photos.gallery : [];

            // Combine into unique list
            const allImages = Array.from(new Set([ext, int, ...rawGallery].filter(Boolean)));

            return (
              <div
                key={vehicle.id}
                className="p-5 rounded-2xl bg-[#101726] border border-[#1F2C42] space-y-4"
              >
                {/* Vehicle Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1F2C42]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0B0F17] border border-[#C9A24B]/30 flex items-center justify-center text-[#E6C773]">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-white">{vehicle.name}</h2>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0B0F17] text-[#E6C773] border border-[#C9A24B]/30 font-extrabold uppercase">
                          {vehicle.category}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {allImages.length} active high-resolution images in gallery • {vehicle.seats} Passengers • {vehicle.bags} Bags
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setUploadVehicleTarget(vehicle.id);
                      setFilePreview(null);
                      setSelectedFile(null);
                      setIsUploadModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#151D2C] hover:bg-[#1F2C42] border border-[#1F2C42] text-xs font-bold text-[#E6C773] transition-colors self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Photo to {vehicle.name}</span>
                  </button>
                </div>

                {/* Photo Grid for this vehicle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allImages.map((imgUrl, idx) => {
                    const isMainExt = imgUrl === ext;
                    const isMainInt = imgUrl === int;

                    return (
                      <div
                        key={imgUrl + idx}
                        className="group relative rounded-xl bg-[#0B0F17] border border-[#1F2C42] hover:border-[#C9A24B]/60 transition-all overflow-hidden flex flex-col justify-between"
                      >
                        {/* Image Preview Box */}
                        <div className="relative w-full h-44 bg-[#070A10] overflow-hidden">
                          <Image
                            src={imgUrl}
                            alt={`${vehicle.name} photo`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                          {/* Status Badges */}
                          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                            {isMainExt && (
                              <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-emerald-500/90 text-white shadow-xs">
                                ★ Main Exterior
                              </span>
                            )}
                            {isMainInt && (
                              <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider bg-[#C9A24B]/90 text-black shadow-xs">
                                Luxury Interior
                              </span>
                            )}
                            {!isMainExt && !isMainInt && (
                              <span className="px-2 py-0.5 rounded-md text-[9px] font-semibold bg-black/60 text-slate-300 backdrop-blur-xs">
                                Gallery Photo #{idx + 1}
                              </span>
                            )}
                          </div>

                          {/* Quick Fullscreen Button */}
                          <button
                            onClick={() => setPreviewImage(imgUrl)}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Fullscreen Preview"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Controls Bottom Bar */}
                        <div className="p-2.5 bg-[#0B0F17] border-t border-[#1F2C42] space-y-2">
                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span className="truncate max-w-[140px] font-mono">{imgUrl.split('/').pop()}</span>
                            <button
                              onClick={() => handleCopy(imgUrl)}
                              className="hover:text-white transition-colors"
                              title="Copy URL"
                            >
                              {copiedUrl === imgUrl ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            {!isMainExt ? (
                              <button
                                onClick={() => handleSetMainPhoto(vehicle.id, imgUrl)}
                                className="px-2 py-1 rounded-lg bg-[#151D2C] hover:bg-[#1F2C42] border border-[#1F2C42] text-[10px] font-bold text-slate-300 hover:text-white transition-colors"
                              >
                                Set as Main
                              </button>
                            ) : (
                              <div className="px-2 py-1 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold text-center">
                                ✓ Main Profile
                              </div>
                            )}

                            {!isMainInt ? (
                              <button
                                onClick={() => handleSetInteriorPhoto(vehicle.id, imgUrl)}
                                className="px-2 py-1 rounded-lg bg-[#151D2C] hover:bg-[#1F2C42] border border-[#1F2C42] text-[10px] font-bold text-slate-300 hover:text-white transition-colors"
                              >
                                Set Interior
                              </button>
                            ) : (
                              <div className="px-2 py-1 rounded-lg bg-[#C9A24B]/20 text-[#E6C773] border border-[#C9A24B]/40 text-[10px] font-bold text-center">
                                ✓ Interior Cabin
                              </div>
                            )}
                          </div>

                          {/* Delete Photo Button */}
                          <button
                            onClick={() => handleDeletePhoto(vehicle.id, imgUrl)}
                            className="w-full py-1 rounded-lg bg-rose-950/30 hover:bg-rose-900/50 border border-rose-900/40 text-rose-300 hover:text-rose-100 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove Photo</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. UPLOAD NEW PHOTO MODAL WITH DRAG & DROP AND LOCAL FILE PICKER */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-[#101726] border border-[#1F2C42] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#1F2C42] flex items-center justify-between bg-[#0B0F17]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#C9A24B]/15 border border-[#C9A24B]/30 flex items-center justify-center text-[#E6C773]">
                  <Upload className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Upload High-Res Photo</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#151D2C] hover:bg-[#1F2C42] text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              {/* Target Vehicle */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Target Vehicle Model *
                </label>
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

              {/* Photo Role */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Photo Role in Catalog
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setUploadRole('exterior')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      uploadRole === 'exterior'
                        ? 'bg-[#C9A24B]/20 text-[#E6C773] border-[#C9A24B]'
                        : 'bg-[#0B0F17] text-slate-400 border-[#1F2C42]'
                    }`}
                  >
                    ★ Main Exterior
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadRole('interior')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      uploadRole === 'interior'
                        ? 'bg-[#C9A24B]/20 text-[#E6C773] border-[#C9A24B]'
                        : 'bg-[#0B0F17] text-slate-400 border-[#1F2C42]'
                    }`}
                  >
                    Luxury Cabin
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadRole('gallery')}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      uploadRole === 'gallery'
                        ? 'bg-[#C9A24B]/20 text-[#E6C773] border-[#C9A24B]'
                        : 'bg-[#0B0F17] text-slate-400 border-[#1F2C42]'
                    }`}
                  >
                    General Gallery
                  </button>
                </div>
              </div>

              {/* File Drop Area */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Select Image File (From Computer) *
                </label>
                <div className="relative border-2 border-dashed border-[#1F2C42] hover:border-[#C9A24B]/60 rounded-2xl p-6 text-center bg-[#0B0F17] transition-colors">
                  {filePreview ? (
                    <div className="space-y-3">
                      <div className="relative w-48 h-28 mx-auto rounded-lg overflow-hidden border border-[#C9A24B]/40">
                        <Image src={filePreview} alt="Preview" fill className="object-cover" />
                      </div>
                      <span className="text-xs text-emerald-400 font-bold block">{selectedFile?.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setFilePreview(null);
                        }}
                        className="text-[11px] text-rose-400 hover:underline font-bold"
                      >
                        Choose another file
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Camera className="w-8 h-8 text-[#C9A24B] mx-auto mb-2 opacity-80" />
                      <p className="text-xs font-bold text-white mb-1">Click to select photo or drag and drop</p>
                      <p className="text-[10px] text-slate-400">WebP, PNG, JPG up to 15MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#1F2C42] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#151D2C] text-xs font-bold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#C9A24B] to-[#E6C773] text-[#0B0F17] font-extrabold text-xs shadow-md disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? 'Uploading & Updating...' : 'Upload & Save to Vehicle'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. FULLSCREEN PREVIEW MODAL */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-[80vh]">
            <Image src={previewImage} alt="Fullscreen View" fill className="object-contain" />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
