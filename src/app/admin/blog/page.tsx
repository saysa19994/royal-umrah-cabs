'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  Plus,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  Edit3,
  Trash2,
  Eye,
  ExternalLink,
  Upload,
  Calendar,
  Clock,
  User,
  Sparkles,
  Save,
  X,
  FileText,
} from 'lucide-react';
import { AdminBlogPost } from '@/lib/blog-service';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogLoaded, setBlogLoaded] = useState(false);
  const [search, setSearch] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Editor Modal
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<AdminBlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<AdminBlogPost>>({
    slug: '',
    title_en: '',
    title_ar: '',
    excerpt_en: '',
    excerpt_ar: '',
    category: 'VIP Umrah Transport',
    featured_image: '/assets/images/haram_hero.webp',
    author: 'Duyuf Alrahman VIP Chauffeur Editorial Team',
    read_time_minutes: 5,
    published_at: new Date().toISOString().split('T')[0],
    is_published: true,
    content_en: '',
    content_ar: '',
  });

  const fetchPosts = async (): Promise<AdminBlogPost[] | null> => {
    setLoading(true);
    setBlogLoaded(false);
    try {
      const res = await fetch('/api/admin/blog', {cache:'no-store'});
      const data = await res.json();
      if (!res.ok || !data.success || !Array.isArray(data.posts)) {
        throw new Error(data.error || 'Failed to fetch blog posts');
      }
      setPosts(data.posts);
      setBlogLoaded(true);
      return data.posts as AdminBlogPost[];
    } catch (err) {
      setFeedback({type:'error',message: err instanceof Error ? err.message :
        'Failed to load saved articles. Publishing is locked until a successful refresh.'});
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenCreate = () => {
    if (!blogLoaded || loading) {
      setFeedback({type:'error',message:'Load current articles before creating a new post.'});
      return;
    }
    setEditingPost(null);
    setFormData({
      slug: `vip-guide-${Date.now().toString().slice(-4)}`,
      title_en: '',
      title_ar: '',
      excerpt_en: '',
      excerpt_ar: '',
      category: 'VIP Umrah Transport',
      featured_image: '/assets/images/haram_hero.webp',
      author: 'Duyuf Alrahman VIP Chauffeur Editorial Team',
      read_time_minutes: 5,
      published_at: new Date().toISOString().split('T')[0],
      is_published: true,
      content_en: '',
      content_ar: '',
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (post: AdminBlogPost) => {
    if (!blogLoaded || loading) return;
    setEditingPost(post);
    setFormData({ ...post });
    setIsEditorOpen(true);
  };

  const handleDelete = async (post: AdminBlogPost) => {
    if (!blogLoaded || loading) {
      setFeedback({type:'error',message:'Reload articles before changing publication status.'});
      return;
    }
    const slug = post.slug;
    if (!confirm(`Unpublish article "${slug}"? The public page will become unavailable; you can publish it again by editing the article.`)) return;

    try {
      const res = await fetch(`/api/admin/blog?slug=${encodeURIComponent(slug)}&expected_updated_at=${encodeURIComponent(post.updated_at || 'none')}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const stored = await fetchPosts();
        const persisted = stored?.find(p => p.slug === slug);
        if (persisted && !persisted.is_published) {
          setFeedback({type:'success',message:'Article unpublishing verified in saved registry. Check public preview before release.'});
        } else {
          setFeedback({type:'error',message:'Unpublish request completed but latest saved status could not be verified.'});
        }
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to delete article' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error deleting article' });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('category', 'blog');

      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, featured_image: data.url }));
        setFeedback({ type: 'success', message: 'Featured image uploaded successfully!' });
      } else {
        setFeedback({ type: 'error', message: data.error || 'Upload failed' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Error uploading image' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogLoaded || loading) {
      setFeedback({type:'error',message:'Load persisted articles before publishing any edits.'});
      return;
    }
    if (!formData.title_en || !formData.title_ar || !formData.slug) {
      setFeedback({ type: 'error', message: 'Title (EN/AR) and Slug are required' });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...formData,expected_updated_at: editingPost?.updated_at ?? null}),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        const savedPosts = await fetchPosts();
        const saved = savedPosts?.find(p => p.slug === formData.slug);
        if (saved && saved.title_en === formData.title_en &&
            saved.title_ar === formData.title_ar &&
            saved.is_published === (formData.is_published === true) &&
            saved.featured_image === formData.featured_image &&
            saved.content_en === (formData.content_en || '') &&
            saved.content_ar === (formData.content_ar || '')) {
          setFeedback({type:'success',message:'Article saved and verified in the database. Check public pages and SEO preview.'});
          setIsEditorOpen(false);
        } else {
          setFeedback({type:'error',message:'The save was accepted but database read-back did not match. Review before retrying.'});
        }
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to save article' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error saving article' });
    } finally {
      setSaving(false);
    }
  };

  const filteredPosts = posts.filter(
    (p) =>
      p.title_en.toLowerCase().includes(search.toLowerCase()) ||
      p.title_ar.includes(search) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="vip-internal-editorial space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#0A6364]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#92612D]">
              Content &amp; SEO Engine
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#193746]">
            Blog &amp; Pilgrimage Articles Manager
          </h1>
          <p className="text-xs sm:text-sm text-[#697984] mt-0.5">
            Create, edit, publish, and manage rich bilingual guides for pilgrims traveling between Makkah, Madinah, and Jeddah.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchPosts()}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFBF5] hover:bg-[#F7EEE1] border border-[#E3D3BD] text-xs font-bold text-[#193746] transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#92612D]' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleOpenCreate}
            disabled={!blogLoaded || loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0B6D6E] to-[#E6C773] hover:brightness-110 text-xs font-extrabold text-[#FFFAF2] transition-all shadow-[0_2px_12px_rgba(201,162,75,0.35)]"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      {/* FEEDBACK TOAST */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-bold animate-in fade-in duration-200 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-500/40 text-emerald-700'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-700'
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
          <button onClick={() => setFeedback(null)} className="text-[#647784] hover:text-[#193746]">
            ✕
          </button>
        </div>
      )}

      {/* STATS STRIP & SEARCH */}
      <div className="p-4 rounded-2xl bg-[#FFFBF5] border border-[#E3D3BD] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-xs text-[#697984]">
          <div>
            <span className="block text-[10px] uppercase font-bold text-[#647784]">Total Articles</span>
            <span className="text-lg font-extrabold text-[#193746] font-mono">{posts.length}</span>
          </div>
          <div className="w-px h-8 bg-[#1F2C42]" />
          <div>
            <span className="block text-[10px] uppercase font-bold text-[#647784]">Published Live</span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">
              {posts.filter((p) => p.is_published).length}
            </span>
          </div>
          <div className="w-px h-8 bg-[#1F2C42]" />
          <div>
            <span className="block text-[10px] uppercase font-bold text-[#647784]">Drafts</span>
            <span className="text-lg font-extrabold text-amber-400 font-mono">
              {posts.filter((p) => !p.is_published).length}
            </span>
          </div>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#647784] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title, slug, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F7EFE5] border border-[#E3D3BD] text-xs text-[#193746] placeholder-slate-500 focus:outline-none focus:border-[#C29B65]"
          />
        </div>
      </div>

      {/* ARTICLES GRID */}
      {loading ? (
        <div className="py-20 text-center text-[#647784] flex flex-col items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-[#92612D]" />
          <span className="text-xs">Loading articles catalog...</span>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-[#FFFBF5] border border-[#E3D3BD] p-8">
          <BookOpen className="w-10 h-10 text-[#92612D] mx-auto mb-3 opacity-60" />
          <h3 className="text-sm font-bold text-[#193746] mb-1">No Articles Found</h3>
          <p className="text-xs text-[#647784] mb-4">No published or draft articles match your search query.</p>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A6364] text-white font-bold text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write First Article</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="group rounded-2xl bg-[#FFFBF5] border border-[#E3D3BD] hover:border-[#C29B65]/50 transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full h-44 bg-[#F8F0E6] overflow-hidden">
                <Image
                  src={post.featured_image || '/assets/images/haram_hero.webp'}
                  alt={post.title_en}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFAF3] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#F7EFE5]/80 text-[#94672E] border border-[#C29B65]/40 backdrop-blur-xs">
                    {post.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      post.is_published ? 'bg-emerald-500/20 text-emerald-700 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-800 border border-amber-500/40'
                    }`}
                  >
                    {post.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#193746] line-clamp-2 leading-snug mb-1 group-hover:text-[#94672E] transition-colors">
                    {post.title_en}
                  </h3>
                  <p className="text-xs font-arabic text-[#5b7081] line-clamp-1 mb-2" dir="rtl">
                    {post.title_ar}
                  </p>
                  <p className="text-[11px] text-[#697984] line-clamp-2 leading-relaxed mb-4">
                    {post.excerpt_en}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="pt-3 border-t border-[#E3D3BD] flex items-center justify-between text-[10px] text-[#647784]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#92612D]" />
                    <span>{post.published_at}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#92612D]" />
                    <span>{post.read_time_minutes} min read</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 bg-[#F7EFE5]/60 border-t border-[#E3D3BD] flex items-center justify-between gap-2">
                <a
                  href={`/en/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#647784] hover:text-white transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Live</span>
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(post)}
                    className="p-1.5 rounded-lg bg-[#F7EEE1] hover:bg-[#1F2C42] text-[#5b7081] hover:text-white transition-colors"
                    title="Edit article"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-700 transition-colors"
                    title="Unpublish article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FULL RICH ARTICLE EDITOR MODAL */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-4xl bg-[#FFFBF5] border border-[#E3D3BD] rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#E3D3BD] flex items-center justify-between bg-[#F7EFE5]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0A6364]/15 border border-[#C29B65]/30 flex items-center justify-center text-[#94672E]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#193746]">
                    {editingPost ? 'Edit Blog Article' : 'Write New Pilgrimage Guide Article'}
                  </h2>
                  <span className="text-[10px] text-[#647784]">
                    Saves directly to Supabase and revalidates all 10 locales live.
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsEditorOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#F7EEE1] hover:bg-[#1F2C42] text-[#647784] hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* English Title */}
                <div>
                  <label className="block text-[11px] font-bold text-[#5b7081] uppercase tracking-wider mb-1.5">
                    Article Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title_en || ''}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    placeholder="e.g. Complete VIP Umrah Chauffeur Guide from Jeddah to Makkah"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7EFE5] border border-[#E3D3BD] text-xs text-[#193746] placeholder-slate-500 focus:outline-none focus:border-[#C29B65]"
                  />
                </div>

                {/* Arabic Title */}
                <div>
                  <label className="block text-[11px] font-bold text-[#5b7081] uppercase tracking-wider mb-1.5 text-right">
                    * عنوان المقال (باللغة العربية)
                  </label>
                  <input
                    type="text"
                    required
                    dir="rtl"
                    value={formData.title_ar || ''}
                    onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                    placeholder="مثال: دليل اختيار سيارة VIP خاصة من مطار جدة إلى مكة المكرمة"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7EFE5] border border-[#E3D3BD] text-xs text-[#193746] placeholder-slate-500 focus:outline-none focus:border-[#C29B65] text-right font-arabic"
                  />
                </div>
              </div>

              {/* Slug & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#5b7081] uppercase tracking-wider mb-1.5">
                    URL Slug (Locked Route) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                    placeholder="e.g. jeddah-to-makkah-vip"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7EFE5] border border-[#E3D3BD] text-xs text-[#94672E] font-mono focus:outline-none focus:border-[#C29B65]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5b7081] uppercase tracking-wider mb-1.5">
                    Category Tier
                  </label>
                  <select
                    value={formData.category || 'VIP Umrah Transport'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7EFE5] border border-[#E3D3BD] text-xs text-[#193746] focus:outline-none focus:border-[#C29B65]"
                  >
                    <option value="VIP Umrah Transport">VIP Umrah Transport</option>
                    <option value="Makkah & Madinah Corridors">Makkah &amp; Madinah Corridors</option>
                    <option value="Airport Chauffeur">Airport Chauffeur</option>
                    <option value="Historic Ziyarat Guides">Historic Ziyarat Guides</option>
                    <option value="Fleet & Luxury">Fleet &amp; Luxury</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5b7081] uppercase tracking-wider mb-1.5">
                    Read Time (Minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={formData.read_time_minutes || 5}
                    onChange={(e) => setFormData({ ...formData, read_time_minutes: parseInt(e.target.value) || 5 })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7EFE5] border border-[#E3D3BD] text-xs text-[#193746] focus:outline-none focus:border-[#C29B65]"
                  />
                </div>
              </div>

              {/* FEATURED IMAGE UPLOADER */}
              <div className="p-4 rounded-xl bg-[#F7EFE5] border border-[#E3D3BD] space-y-3">
                <label className="block text-[11px] font-bold text-[#94672E] uppercase tracking-wider">
                  Featured Cover Image (Upload from PC or Select)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-36 h-24 rounded-lg bg-[#F7EEE1] border border-[#E3D3BD] overflow-hidden shrink-0">
                    <Image
                      src={formData.featured_image || '/assets/images/haram_hero.webp'}
                      alt="Cover Preview"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="text"
                      value={formData.featured_image || ''}
                      onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                      placeholder="Image URL or upload file below..."
                      className="w-full px-3 py-2 rounded-lg bg-[#FFFBF5] border border-[#E3D3BD] text-xs text-[#193746] placeholder-slate-500 focus:outline-none"
                    />

                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F7EEE1] hover:bg-[#1F2C42] border border-[#E3D3BD] text-xs font-bold text-[#193746] cursor-pointer transition-colors">
                        <Upload className={`w-3.5 h-3.5 text-[#92612D] ${uploadingImage ? 'animate-bounce' : ''}`} />
                        <span>{uploadingImage ? 'Uploading Image...' : 'Upload Image from PC'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[10px] text-[#647784]">Supported: WebP, PNG, JPG (up to 15MB)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Excerpts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#5b7081] uppercase tracking-wider mb-1.5">
                    Short Excerpt / SEO Description (English)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.excerpt_en || ''}
                    onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                    placeholder="Brief summary shown on Google and preview cards..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7EFE5] border border-[#E3D3BD] text-xs text-[#193746] placeholder-slate-500 focus:outline-none focus:border-[#C29B65]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5b7081] uppercase tracking-wider mb-1.5 text-right">
                    موجز المقال ووصف البحث (عربي)
                  </label>
                  <textarea
                    rows={3}
                    dir="rtl"
                    value={formData.excerpt_ar || ''}
                    onChange={(e) => setFormData({ ...formData, excerpt_ar: e.target.value })}
                    placeholder="ملخص قصير يظهر في بطاقة المقال ومحركات البحث..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7EFE5] border border-[#E3D3BD] text-xs text-[#193746] placeholder-slate-500 focus:outline-none focus:border-[#C29B65] text-right font-arabic"
                  />
                </div>
              </div>

              {/* Full Article Content */}
              <div>
                <label className="block text-[11px] font-bold text-[#5b7081] uppercase tracking-wider mb-1.5">
                  Full Article Body (Markdown / HTML Supported)
                </label>
                <textarea
                  rows={8}
                  value={formData.content_en || ''}
                  onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                  placeholder="Write complete guide content here. Headings, bullet points, and paragraphs are fully supported..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7EFE5] border border-[#E3D3BD] text-xs text-[#193746] placeholder-slate-500 focus:outline-none focus:border-[#C29B65] font-mono leading-relaxed"
                />
              </div>

              {/* Published Toggle & Footer Actions */}
              <div className="pt-4 border-t border-[#E3D3BD] flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="w-4 h-4 rounded text-[#92612D] bg-[#F7EFE5] border-[#E3D3BD] focus:ring-0"
                  />
                  <span className="text-xs font-bold text-[#193746]">Publish Article Live Immediately</span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-4 py-2 rounded-xl bg-[#F7EEE1] hover:bg-[#1F2C42] text-xs font-bold text-[#5b7081] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving || loading || !blogLoaded}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#0B6D6E] to-[#E6C773] hover:brightness-110 text-xs font-extrabold text-[#FFFAF2] transition-all shadow-[0_2px_12px_rgba(201,162,75,0.35)] disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
