'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { MediaItem, FleetImageRecord } from '@/types/content';
import { Locale, LOCALES, LOCALE_CONFIG } from '@/i18n/config';

export default function AdminMediaPage() {
  const [activeTab, setActiveTab] = useState<'fleet' | 'library'>('fleet');
  const [fleetImages, setFleetImages] = useState<FleetImageRecord[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New Media modal / form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'fleet' | 'hubs' | 'ziyarat' | 'general'>('fleet');
  const [newTargetId, setNewTargetId] = useState('staria');
  const [altLocale, setAltLocale] = useState<Locale>('en');
  const [altTexts, setAltTexts] = useState<Record<string, string>>({
    en: '',
    ar: '',
  });

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const [fleetRes, libRes] = await Promise.all([
        fetch('/api/admin/media?type=fleet'),
        fetch('/api/admin/media'),
      ]);
      const fleetData = await fleetRes.json();
      const libData = await libRes.json();

      if (fleetData.success && fleetData.images) setFleetImages(fleetData.images);
      if (libData.success && libData.items) setMediaItems(libData.items);
    } catch (err) {
      console.error('Failed to load media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !newName.trim()) {
      setFeedback({ type: 'error', message: 'URL and Name are required' });
      return;
    }

    try {
      const payload: MediaItem = {
        id: `media-${Date.now()}`,
        file_url: newUrl.trim(),
        file_name: newName.trim(),
        mime_type: 'image/webp',
        category: newCategory,
        target_id: newTargetId || null,
        alt_translations: altTexts,
        display_order: 1,
      };

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setFeedback({ type: 'success', message: 'Media item successfully added and saved!' });
        setShowAddModal(false);
        setNewUrl('');
        setNewName('');
        fetchMedia();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to save media item' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error saving media item' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#D9A031]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A031]">Asset Management</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-[#FAF9F6]">
            Media Library &amp; Image Manager
          </h1>
          <p className="text-sm text-[#A0A6B2] mt-0.5">
            Manage fleet photography, exterior/interior gallery orders, and localized SEO alt texts across all 10 locales.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D9A031] hover:bg-[#B88422] text-[#0D0F12] text-xs font-bold transition-colors shadow-lg shadow-[#D9A031]/10"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Asset</span>
          </button>
          <button
            onClick={fetchMedia}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A1F26] border border-[#262B33] text-xs font-semibold text-[#FAF9F6] hover:bg-[#20252D] hover:border-[#D9A031]/40 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#D9A031]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-medium animate-in fade-in duration-200 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/40 border-red-500/40 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-white/60 hover:text-white transition-colors">
            ✕
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#262B33] pb-3">
        <button
          onClick={() => setActiveTab('fleet')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'fleet'
              ? 'bg-[#D9A031] text-[#0D0F12]'
              : 'bg-[#14171C] text-[#A0A6B2] hover:text-[#FAF9F6]'
          }`}
        >
          <Car className="w-3.5 h-3.5" />
          <span>Fleet Gallery Carousel ({fleetImages.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'library'
              ? 'bg-[#D9A031] text-[#0D0F12]'
              : 'bg-[#14171C] text-[#A0A6B2] hover:text-[#FAF9F6]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>General Media Library ({mediaItems.length})</span>
        </button>
      </div>

      {/* Fleet Gallery View */}
      {activeTab === 'fleet' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {fleetImages.map((img) => (
            <div
              key={img.id}
              className="bg-[#14171C] border border-[#262B33] rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full bg-[#0D0F12] border-b border-[#262B33] flex items-center justify-center overflow-hidden">
                <img
                  src={img.url}
                  alt={img.alt_translations?.en || 'Fleet image'}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#0D0F12]/80 backdrop-blur-sm text-[10px] font-bold text-[#D9A031] uppercase">
                  {img.image_type}
                </span>
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#0D0F12]/80 backdrop-blur-sm text-[10px] font-bold text-white uppercase">
                  {img.vehicle_id}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#A0A6B2]">
                  <span>Order: #{img.display_order}</span>
                  <span className="text-emerald-400 font-semibold">Active</span>
                </div>
                <div className="space-y-1 text-xs">
                  <p className="text-[#FAF9F6] font-medium line-clamp-1">
                    <span className="text-[#D9A031] font-bold">EN: </span>
                    {img.alt_translations?.en || 'None'}
                  </p>
                  <p className="text-[#A0A6B2] font-medium line-clamp-1">
                    <span className="text-[#D9A031] font-bold">AR: </span>
                    {img.alt_translations?.ar || 'None'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* General Media View */}
      {activeTab === 'library' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mediaItems.length === 0 ? (
            <div className="col-span-3 text-center py-12 text-xs text-[#A0A6B2]">
              No custom media items uploaded yet. Click "Add Asset" to register an image.
            </div>
          ) : (
            mediaItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#14171C] border border-[#262B33] rounded-2xl overflow-hidden p-4 space-y-2"
              >
                <img src={item.file_url} alt={item.file_name} className="w-full aspect-video object-cover rounded-xl mb-2" />
                <h4 className="font-bold text-xs text-[#FAF9F6]">{item.file_name}</h4>
                <span className="px-2 py-0.5 rounded bg-[#1A1F26] text-[10px] text-[#D9A031] font-mono uppercase">
                  {item.category}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14171C] border border-[#262B33] max-w-lg w-full rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#262B33] pb-3">
              <h3 className="font-bold text-sm text-[#FAF9F6]">Add Asset to Media Library</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#A0A6B2] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddMedia} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Asset URL / Storage Path</label>
                <input
                  type="text"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="/assets/images/staria_interior.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Asset Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Staria VIP Interior Suite"
                  className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] focus:outline-none"
                  >
                    <option value="fleet">Fleet</option>
                    <option value="hubs">Hubs</option>
                    <option value="ziyarat">Ziyarat</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Target Identifier</label>
                  <input
                    type="text"
                    value={newTargetId}
                    onChange={(e) => setNewTargetId(e.target.value)}
                    placeholder="staria, yukon, taif..."
                    className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Alt Text (English)</label>
                <input
                  type="text"
                  value={altTexts.en || ''}
                  onChange={(e) => setAltTexts({ ...altTexts, en: e.target.value })}
                  placeholder="Descriptive alt text for SEO..."
                  className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A0A6B2] mb-1">Alt Text (Arabic)</label>
                <input
                  type="text"
                  value={altTexts.ar || ''}
                  onChange={(e) => setAltTexts({ ...altTexts, ar: e.target.value })}
                  placeholder="النص البديل المعبر لمحركات البحث..."
                  className="w-full px-3 py-2 rounded-xl bg-[#0D0F12] border border-[#262B33] text-xs text-[#FAF9F6] focus:outline-none focus:border-[#D9A031]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#1A1F26] text-xs font-semibold text-[#FAF9F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D9A031] text-xs font-bold text-[#0D0F12]"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
