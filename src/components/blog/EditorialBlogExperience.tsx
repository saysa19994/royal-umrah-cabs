'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Locale, LOCALE_CONFIG } from '@/i18n/config';
import type { EditorialPostPreview } from '@/lib/blog-editorial-mapper';
import type { LocalizedArticleBody } from '@/data/blog-content/types';
import {
  Clock,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  X,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  MessageCircle,
  Share2,
  ShieldCheck,
} from 'lucide-react';

interface EditorialBlogExperienceProps {
  locale: Locale;
  posts: EditorialPostPreview[];
  limit?: number;
  whatsappNumber?: string;
  className?: string;
}

const UI_STRINGS: Record<Locale, {
  readArticle: string;
  featuredPill: string;
  closeModal: string;
  openStandalone: string;
  shareArticle: string;
  articleFaqs: string;
  shareSuccess: string;
  whatsappInquire: string;
  bookRide: string;
  authorEditorial: string;
  publishedPrefix: string;
  loadingGuide: string;
  loadErrorText: string;
}> = {
  ar: {
    readArticle: 'اقرأ الدليل كاملاً',
    featuredPill: 'دليل مميز وموصى به',
    closeModal: 'إغلاق المقال',
    openStandalone: 'فتح المقال في صفحة مستقلة',
    shareArticle: 'مشاركة رابط المقال',
    articleFaqs: 'الأسئلة الشائعة حول هذا الدليل',
    shareSuccess: 'تم نسخ رابط المقال!',
    whatsappInquire: 'استفسار عبر واتساب',
    bookRide: 'احجز سيارتك الآن',
    authorEditorial: 'فريق التحرير لضيوف الرحمن VIP',
    publishedPrefix: 'نُشر في',
    loadingGuide: 'جاري تجهيز الدليل الكامل...',
    loadErrorText: 'تعذر تحميل المعاينة السريعة، يمكنك فتح المقال في صفحة مستقلة مباشرة.',
  },
  en: {
    readArticle: 'Read Full Guide',
    featuredPill: 'Featured Guide',
    closeModal: 'Close Article',
    openStandalone: 'Open in Dedicated Page',
    shareArticle: 'Share article link',
    articleFaqs: 'Frequently Asked Questions',
    shareSuccess: 'Article link copied!',
    whatsappInquire: 'Inquire on WhatsApp',
    bookRide: 'Book Your Transfer',
    authorEditorial: 'Duyuf Alrahman VIP Editorial Team',
    publishedPrefix: 'Published in',
    loadingGuide: 'Loading full chauffeur guide...',
    loadErrorText: 'Unable to load quick preview. Open the dedicated article page instead.',
  },
  ms: {
    readArticle: 'Baca Panduan Penuh',
    featuredPill: 'Panduan Pilihan',
    closeModal: 'Tutup Artikel',
    openStandalone: 'Buka di Halaman Khusus',
    shareArticle: 'Kongsi pautan artikel',
    articleFaqs: 'Soalan Lazim',
    shareSuccess: 'Pautan disalin!',
    whatsappInquire: 'Tanya di WhatsApp',
    bookRide: 'Tempah Kenderaan Anda',
    authorEditorial: 'Pasukan Editorial Duyuf Alrahman VIP',
    publishedPrefix: 'Diterbitkan pada',
    loadingGuide: 'Memuatkan panduan penuh...',
    loadErrorText: 'Tidak dapat memuatkan pratonton. Sila buka halaman artikel penuh.',
  },
  id: {
    readArticle: 'Baca Panduan Lengkap',
    featuredPill: 'Panduan Unggulan',
    closeModal: 'Tutup Artikel',
    openStandalone: 'Buka di Halaman Khusus',
    shareArticle: 'Bagikan tautan artikel',
    articleFaqs: 'Pertanyaan yang Sering Diajukan',
    shareSuccess: 'Tautan berhasil disalin!',
    whatsappInquire: 'Tanya via WhatsApp',
    bookRide: 'Pesan Kendaraan Sekarang',
    authorEditorial: 'Tim Editorial Duyuf Alrahman VIP',
    publishedPrefix: 'Dipublikasikan pada',
    loadingGuide: 'Memuat panduan lengkap...',
    loadErrorText: 'Gagal memuat pratinjau cepat. Silakan buka halaman artikel lengkap.',
  },
  ur: {
    readArticle: 'مکمل گائیڈ پڑھیں',
    featuredPill: 'خصوصی رہنمائی',
    closeModal: 'بند کریں',
    openStandalone: 'مستقل صفحہ پر کھولیں',
    shareArticle: 'مضمون کا لنک شیئر کریں',
    articleFaqs: 'عام طور پر پوچھے جانے والے سوالات',
    shareSuccess: 'لنک کاپی ہو گیا!',
    whatsappInquire: 'واٹس ایپ پر رابطہ کریں',
    bookRide: 'ابھی گاڑی بک کریں',
    authorEditorial: 'ضیوف الرحمن وی آئی پی اداریہ',
    publishedPrefix: 'اشاعت',
    loadingGuide: 'مکمل رہنمائی لوڈ ہو رہی ہے...',
    loadErrorText: 'فوری پیش نظارہ لوڈ نہیں ہو سکا، براہ کرم مکمل صفحہ کھولیں۔',
  },
  fr: {
    readArticle: 'Lire le Guide Complet',
    featuredPill: 'Guide Vedette',
    closeModal: 'Fermer l\'Article',
    openStandalone: 'Ouvrir sur une Page Dédiée',
    shareArticle: 'Partager le lien',
    articleFaqs: 'Questions Fréquentes',
    shareSuccess: 'Lien copié !',
    whatsappInquire: 'Contacter sur WhatsApp',
    bookRide: 'Réserver Votre Trajet',
    authorEditorial: 'Équipe Éditoriale Duyuf Alrahman VIP',
    publishedPrefix: 'Publié en',
    loadingGuide: 'Chargement du guide complet...',
    loadErrorText: 'Impossible de charger l\'aperçu. Veuillez ouvrir la page dédiée.',
  },
  es: {
    readArticle: 'Leer Guía Completa',
    featuredPill: 'Guía Destacada',
    closeModal: 'Cerrar Artículo',
    openStandalone: 'Abrir en Página Dedicada',
    shareArticle: 'Compartir enlace',
    articleFaqs: 'Preguntas Frecuentes',
    shareSuccess: '¡Enlace copiado!',
    whatsappInquire: 'Consultar por WhatsApp',
    bookRide: 'Reserve su Traslado',
    authorEditorial: 'Equipo Editorial Duyuf Alrahman VIP',
    publishedPrefix: 'Publicado en',
    loadingGuide: 'Cargando guía completa...',
    loadErrorText: 'No se pudo cargar la vista previa. Abra la página dedicada del artículo.',
  },
  de: {
    readArticle: 'Vollständigen Leitfaden Lesen',
    featuredPill: 'Empfohlener Leitfaden',
    closeModal: 'Artikel Schließen',
    openStandalone: 'Auf Eigener Seite Öffnen',
    shareArticle: 'Artikel-Link teilen',
    articleFaqs: 'Häufig Gestellte Fragen',
    shareSuccess: 'Link kopiert!',
    whatsappInquire: 'Per WhatsApp Anfragen',
    bookRide: 'Fahrt Jetzt Buchen',
    authorEditorial: 'Duyuf Alrahman VIP Redaktionsteam',
    publishedPrefix: 'Veröffentlicht',
    loadingGuide: 'Vollständiger Leitfaden wird geladen...',
    loadErrorText: 'Vorschau konnte nicht geladen werden. Bitte die vollständige Seite öffnen.',
  },
  tr: {
    readArticle: 'Rehberin Tamamını Oku',
    featuredPill: 'Öne Çıkan Rehber',
    closeModal: 'Makaleyi Kapat',
    openStandalone: 'Ayrı Sayfada Aç',
    shareArticle: 'Makale bağlantısını paylaş',
    articleFaqs: 'Sıkça Sorulan Sorular',
    shareSuccess: 'Bağlantı kopyalandı!',
    whatsappInquire: 'WhatsApp\'tan Bilgi Al',
    bookRide: 'Transferinizi Ayırtın',
    authorEditorial: 'Duyuf Alrahman VIP Editör Ekibi',
    publishedPrefix: 'Yayın yılı',
    loadingGuide: 'Tam rehber yükleniyor...',
    loadErrorText: 'Hızlı önizleme yüklenemedi. Lütfen makaleyi ayrı sayfada açın.',
  },
  hi: {
    readArticle: 'पूरी गाइड पढ़ें',
    featuredPill: 'विशेष गाइड',
    closeModal: 'लेख बंद करें',
    openStandalone: 'अलग पृष्ठ में खोलें',
    shareArticle: 'लेख का लिंक साझा करें',
    articleFaqs: 'अक्सर पूछे जाने वाले प्रश्न',
    shareSuccess: 'लिंक कॉपी हो गया!',
    whatsappInquire: 'व्हाट्सएप पर पूछें',
    bookRide: 'अपनी गाड़ी बुक करें',
    authorEditorial: 'दुयुफ अल-रहमान VIP संपादकीय टीम',
    publishedPrefix: 'प्रकाशित',
    loadingGuide: 'पूरी गाइड लोड हो रही है...',
    loadErrorText: 'त्वरित पूर्वावलोकन लोड नहीं हो सका। कृपया समर्पित लेख पृष्ठ खोलें।',
  },
};

function renderFormattedText(
  text: string,
  locale: Locale,
  onNavigate?: () => void
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('[')) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const anchor = linkMatch[1];
        const rawHref = linkMatch[2];
        const slugMatch = rawHref.match(/(?:blog\/)([a-z0-9-]+)/);
        const slug = slugMatch ? slugMatch[1] : '';
        const href = slug ? `/${locale}/blog/${slug}` : rawHref;
        parts.push(
          <Link
            key={`link-${key++}`}
            href={href}
            onClick={onNavigate}
            className="inline-flex items-center gap-1 font-semibold text-gold-dark hover:underline underline-offset-4 decoration-[#D6A13A]/60 transition-colors mx-1"
          >
            <span>{anchor}</span>
          </Link>
        );
      }
    } else if (token.startsWith('**')) {
      const boldText = token.slice(2, -2);
      parts.push(
        <strong key={`bold-${key++}`} className="font-semibold text-ink">
          {boldText}
        </strong>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function renderParagraphsOrTable(
  paragraphs: string[],
  locale: Locale,
  paragraphClassName: string,
  onNavigate?: () => void
): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  let elementIndex = 0;

  const flushTable = () => {
    if (tableBuffer.length === 0) return;
    const rows = tableBuffer
      .filter((line) => line.replace(/[|\-\s:]/g, '').length > 0)
      .map((line) =>
        line
          .split('|')
          .map((cell) => cell.trim())
          .filter((_, idx, arr) => !(idx === 0 && arr[0] === '') && !(idx === arr.length - 1 && arr[arr.length - 1] === ''))
      );
    tableBuffer = [];

    if (rows.length > 0) {
      const headerRow = rows[0];
      const dataRows = rows.slice(1);
      elements.push(
        <div
          key={`tbl-${elementIndex++}`}
          className="overflow-x-auto my-5 rounded-2xl border border-border bg-surface"
        >
          <table className="w-full text-xs sm:text-sm text-start border-collapse">
            <thead className="bg-bg-alt border-b border-border">
              <tr>
                {headerRow.map((cell, cIdx) => (
                  <th
                    key={cIdx}
                    className="p-3 sm:p-3.5 font-bold text-gold-dark text-start whitespace-nowrap"
                  >
                    {renderFormattedText(cell, locale, onNavigate)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-surface/[0.02] transition-colors">
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="p-3 sm:p-3.5 text-ink-muted leading-relaxed align-top text-start"
                    >
                      {renderFormattedText(cell, locale, onNavigate)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i];
    if (p.trim().startsWith('|')) {
      tableBuffer.push(p);
    } else {
      flushTable();
      elements.push(
        <p key={`p-${elementIndex++}`} className={paragraphClassName}>
          {renderFormattedText(p, locale, onNavigate)}
        </p>
      );
    }
  }
  flushTable();

  return elements;
}

export function EditorialBlogExperience({
  locale,
  posts = [],
  limit,
  whatsappNumber = '966567588261',
  className = '',
}: EditorialBlogExperienceProps) {
  const localeMeta = LOCALE_CONFIG[locale] || LOCALE_CONFIG.en;
  const isRtl = localeMeta.dir === 'rtl';
  const shouldReduceMotion = useReducedMotion();
  const ui = UI_STRINGS[locale] || UI_STRINGS.en;

  const cleanWhatsappDigits = whatsappNumber.replace(/\D/g, '') || '966567588261';
  const whatsappUrl = `https://wa.me/${cleanWhatsappDigits}`;

  // Selected article & on-demand cached article body for progressive enhancement modal
  const [selectedPost, setSelectedPost] = useState<EditorialPostPreview | null>(null);
  const [articleContent, setArticleContent] = useState<LocalizedArticleBody | null>(null);
  const [isLoadingArticle, setIsLoadingArticle] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  const articleCacheRef = useRef<Record<string, LocalizedArticleBody>>({});
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  // Filter posts
  const visiblePosts = limit ? posts.slice(0, limit) : posts;
  const featuredPost = visiblePosts[0];
  const supportingPosts = visiblePosts.slice(1);

  const postsRef = useRef<EditorialPostPreview[]>(visiblePosts);
  postsRef.current = visiblePosts;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch article body on-demand with in-memory cache and abort control
  useEffect(() => {
    if (!selectedPost) {
      setArticleContent(null);
      setIsLoadingArticle(false);
      setLoadError(false);
      return;
    }

    const cacheKey = `${locale}:${selectedPost.slug}`;
    const cached = articleCacheRef.current[cacheKey];
    if (cached) {
      setArticleContent(cached);
      setIsLoadingArticle(false);
      setLoadError(false);
      return;
    }

    const controller = new AbortController();
    setIsLoadingArticle(true);
    setLoadError(false);
    setArticleContent(null);

    fetch(
      `/api/blog-article?slug=${encodeURIComponent(selectedPost.slug)}&locale=${encodeURIComponent(locale)}`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (controller.signal.aborted) return;
        if (data?.content) {
          articleCacheRef.current[cacheKey] = data.content;
          setArticleContent(data.content);
          setIsLoadingArticle(false);
        } else {
          setLoadError(true);
          setIsLoadingArticle(false);
        }
      })
      .catch((err) => {
        if (err?.name === 'AbortError') return;
        setLoadError(true);
        setIsLoadingArticle(false);
      });

    return () => {
      controller.abort();
    };
  }, [selectedPost, locale]);

  // Progressive enhancement click handler
  const handleCardClick = (e: React.MouseEvent, post: EditorialPostPreview) => {
    // Only intercept normal left clicks without modifier keys
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    lastFocusedElementRef.current = e.currentTarget as HTMLElement;
    setSelectedPost(post);

    // Push state to browser history so back button and URL work seamlessly
    const targetUrl = `/${locale}/blog/${post.slug}`;
    if (typeof window !== 'undefined') {
      window.history.pushState(
        { modalOpen: true, slug: post.slug },
        '',
        targetUrl
      );
    }
  };

  const closeModal = useCallback(() => {
    setSelectedPost(null);
    if (typeof window !== 'undefined' && window.history.state?.modalOpen) {
      window.history.back();
    }
    setTimeout(() => {
      lastFocusedElementRef.current?.focus();
    }, 50);
  }, []);

  const releaseModalOnRouteLeave = useCallback(() => {
    setSelectedPost(null);
  }, []);

  // Listen to popstate (Back/Forward browser buttons)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.modalOpen && e.state?.slug) {
        const found = postsRef.current.find((p) => p.slug === e.state.slug);
        setSelectedPost(found || null);
      } else {
        setSelectedPost(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Escape key listener & Body scroll lock
  useEffect(() => {
    if (!selectedPost) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const focusTimer = setTimeout(() => {
      modalCloseBtnRef.current?.focus();
    }, 100);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPost, closeModal]);

  const handleShare = () => {
    if (typeof window !== 'undefined' && selectedPost) {
      const url = `${window.location.origin}/${locale}/blog/${selectedPost.slug}`;
      navigator.clipboard?.writeText(url);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  return (
    <div className={`relative ${className}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ─────────────────────────────────────────────────────────────
          PART A: ASYMMETRIC EDITORIAL MAGAZINE GRID
      ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 lg:space-y-12">
        {/* Desktop Asymmetric Top Tier: Featured Large Card (7 cols) + 2 Vertical Cards (5 cols) */}
        {featuredPost && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Large Featured Hero Article Card (Col 1-7) */}
            <div className="lg:col-span-7 flex">
              <Link
                href={`/${locale}/blog/${featuredPost.slug}`}
                onClick={(e) => handleCardClick(e, featuredPost)}
                className="group relative flex flex-col w-full rounded-3xl overflow-hidden bg-surface border border-border hover:border-gold transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label={featuredPost.title}
              >
                {/* Visual Cover */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-bg">
                  <Image
                    src={featuredPost.featuredImage}
                    alt={featuredPost.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 start-4 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/95 backdrop-blur-md border border-border text-xs font-bold text-gold-dark shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                      <span>{ui.featuredPill}</span>
                    </span>
                    <span className="inline-block px-3 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-border text-xs font-medium text-ink">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>

                {/* Editorial Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-ink-muted mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gold-dark" />
                        <span>{featuredPost.readTime}</span>
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                        <span>{ui.publishedPrefix} 2026</span>
                      </span>
                    </div>

                    <h3 className="font-playfair font-serif text-xl sm:text-2xl md:text-3xl font-bold text-ink leading-tight group-hover:text-gold-dark transition-colors mb-4">
                      {featuredPost.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-muted font-light leading-relaxed line-clamp-3 mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gold-dark group-hover:text-gold-dark transition-all">
                      <span>{ui.readArticle}</span>
                      {isRtl ? (
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                      ) : (
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </span>
                    <span className="text-[11px] text-ink-muted font-light">
                      {featuredPost.author || ui.authorEditorial}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Supporting Vertical Cards (Col 8-12) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {supportingPosts.slice(0, 2).map((post) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  onClick={(e) => handleCardClick(e, post)}
                  className="group relative flex-1 flex flex-col sm:flex-row lg:flex-col rounded-3xl overflow-hidden bg-surface border border-border hover:border-gold transition-all duration-300 shadow-sm hover:shadow-md"
                  aria-label={post.title}
                >
                  <div className="relative aspect-[16/9] sm:aspect-auto sm:w-2/5 lg:w-full lg:h-44 shrink-0 overflow-hidden bg-bg">
                    <Image
                      src={post.featuredImage}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <span className="absolute top-3 start-3 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md border border-border text-[11px] font-semibold text-gold-dark">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-ink-muted mb-2">
                        <Clock className="w-3 h-3 text-gold-dark" />
                        <span>{post.readTime}</span>
                      </div>
                      <h4 className="font-playfair font-serif text-base sm:text-lg font-bold text-ink leading-snug group-hover:text-gold-dark transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-ink-muted font-light leading-relaxed line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gold-dark font-semibold pt-2 border-t border-border">
                      <span>{ui.readArticle}</span>
                      {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Lower Tier: 3-Column Editorial Grid for Remaining Articles */}
        {supportingPosts.length > 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportingPosts.slice(2).map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                onClick={(e) => handleCardClick(e, post)}
                className="group relative flex flex-col rounded-3xl overflow-hidden bg-surface border border-border hover:border-gold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                aria-label={post.title}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg">
                  <Image
                    src={post.featuredImage}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <span className="absolute top-3 start-3 px-2.5 py-1 rounded-full bg-surface/90 backdrop-blur-md border border-border text-[11px] font-semibold text-gold-dark">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-ink-muted mb-2.5">
                      <Clock className="w-3 h-3 text-gold-dark" />
                      <span>{post.readTime}</span>
                    </div>

                    <h4 className="font-playfair font-serif text-lg font-bold text-ink leading-snug group-hover:text-gold-dark transition-colors mb-2.5 line-clamp-2">
                      {post.title}
                    </h4>

                    <p className="text-xs text-ink-muted font-light leading-relaxed line-clamp-3 mb-5">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-gold-dark font-semibold">
                    <span>{ui.readArticle}</span>
                    {isRtl ? (
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    ) : (
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PART B: PROGRESSIVE ENHANCEMENT ARTICLE MODAL (ACCESSIBLE PORTAL DIALOG)
      ────────────────────────────────────────────────────────────── */}
      {mounted && typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence>
              {selectedPost && (
                <div
                  className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="article-modal-title"
                >
                  {/* Backdrop Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={closeModal}
                    className="fixed inset-0 bg-[#090D15]/85 backdrop-blur-md"
                    aria-hidden="true"
                  />

                  {/* Modal Dialog Container */}
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0, y: 20 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full sm:h-auto sm:max-h-[88vh] max-w-4xl bg-bg sm:rounded-3xl border-0 sm:border border-[rgba(255,255,255,0.1)] shadow-2xl flex flex-col overflow-hidden z-10 my-auto"
                    dir={isRtl ? 'rtl' : 'ltr'}
                  >
                    {/* Sticky Top Header Bar */}
                    <div className="shrink-0 z-30 flex items-center justify-between px-5 sm:px-8 py-4 bg-surface/95 backdrop-blur-md border-b border-border">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-bg-alt border border-gold/40 text-xs font-semibold text-gold-dark">
                          {selectedPost.category}
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-xs text-ink-muted">
                          <Clock className="w-3.5 h-3.5 text-gold-dark" />
                          <span>{selectedPost.readTime}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Share button */}
                        <button
                          type="button"
                          onClick={handleShare}
                          title={ui.shareArticle}
                          aria-label={ui.shareArticle}
                          className="p-2 rounded-full bg-bg-alt text-ink-muted hover:text-gold-dark border border-border/40 transition-colors cursor-pointer"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>

                        {/* Open standalone page link for full native page */}
                        <Link
                          href={`/${locale}/blog/${selectedPost.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={ui.openStandalone}
                          aria-label={ui.openStandalone}
                          className="p-2 rounded-full bg-bg-alt text-ink-muted hover:text-gold-dark border border-border/40 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {/* Accessible Close Button */}
                        <button
                          ref={modalCloseBtnRef}
                          type="button"
                          onClick={closeModal}
                          aria-label={ui.closeModal}
                          className="p-2 rounded-full bg-bg-alt text-ink hover:bg-[#D6A13A] hover:text-[#0E1420] border border-border transition-all cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Share confirmation banner */}
                    {copiedNotification && (
                      <div className="shrink-0 bg-[#D6A13A] text-[#0E1420] text-xs font-bold py-1.5 px-4 text-center">
                        {ui.shareSuccess}
                      </div>
                    )}

                    {/* Scrollable Modal Article Content */}
                    <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-8 md:p-10 space-y-8 text-start custom-scrollbar">
                      {/* Article Header & Visual Cover */}
                      <div className="space-y-4">
                        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-border shadow-lg">
                          <Image
                            src={selectedPost.featuredImage}
                            alt={selectedPost.imageAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 850px"
                            className="object-cover"
                            priority
                          />
                        </div>

                        <div className="flex items-center gap-3 text-xs text-ink-muted pt-2">
                          <span>{selectedPost.author || ui.authorEditorial}</span>
                          <span>•</span>
                          <span>{ui.publishedPrefix} 2026</span>
                        </div>

                        <h1
                          id="article-modal-title"
                          className="font-playfair font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-ink leading-tight"
                        >
                          {selectedPost.title}
                        </h1>

                        {isLoadingArticle && (
                          <div className="space-y-5 pt-2" aria-busy="true" aria-live="polite">
                            <p className="text-xs font-medium text-gold-dark">{ui.loadingGuide}</p>
                            <div className="p-5 rounded-2xl bg-bg-alt border border-border/40 space-y-3 animate-pulse">
                              <div className="h-4 bg-surface rounded w-1/3" />
                              <div className="h-3 bg-surface rounded w-full" />
                              <div className="h-3 bg-surface rounded w-5/6" />
                            </div>
                            <div className="space-y-3 animate-pulse">
                              <div className="h-5 bg-surface rounded w-2/5" />
                              <div className="h-3 bg-surface/5 rounded w-full" />
                              <div className="h-3 bg-surface/5 rounded w-4/5" />
                            </div>
                          </div>
                        )}

                        {loadError && !isLoadingArticle && (
                          <div className="p-6 rounded-2xl bg-bg-alt border border-amber-500/40 space-y-4">
                            <p className="text-sm text-ink">{ui.loadErrorText}</p>
                            <Link
                              href={`/${locale}/blog/${selectedPost.slug}`}
                              onClick={releaseModalOnRouteLeave}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D6A13A] text-[#0E1420] font-bold text-xs uppercase tracking-wider"
                            >
                              <span>{ui.openStandalone}</span>
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </div>
                        )}

                        {/* Intro Lead Paragraphs */}
                        {articleContent?.intro && (
                          <div className="p-5 sm:p-6 rounded-2xl bg-bg-alt border-s-4 border-gold space-y-3">
                            {articleContent.intro.title && (
                              <h2 className="font-playfair font-serif text-base sm:text-lg font-bold text-gold-dark">
                                {articleContent.intro.title}
                              </h2>
                            )}
                            {renderParagraphsOrTable(
                              articleContent.intro.paragraphs,
                              locale,
                              'text-sm sm:text-base text-ink leading-relaxed font-light',
                              releaseModalOnRouteLeave
                            )}
                          </div>
                        )}
                      </div>

                      {/* Article Body Sections */}
                      {articleContent && (
                        <>
                          <div className="space-y-8 pt-4 border-t border-border/40">
                            {articleContent.sections.map((section, sIdx) => (
                              <section key={section.id || sIdx} className="space-y-4">
                                <h2 className="font-playfair font-serif text-xl sm:text-2xl font-bold text-gold-dark border-b border-border/40 pb-2">
                                  {section.title}
                                </h2>

                                {section.lead && (
                                  <p className="text-sm font-medium text-ink leading-relaxed">
                                    {renderFormattedText(section.lead, locale, releaseModalOnRouteLeave)}
                                  </p>
                                )}

                                {section.paragraphs.length > 0 && (
                                  <div className="space-y-3">
                                    {renderParagraphsOrTable(
                                      section.paragraphs,
                                      locale,
                                      'text-xs sm:text-sm text-ink-muted leading-relaxed font-light',
                                      releaseModalOnRouteLeave
                                    )}
                                  </div>
                                )}

                                {/* Callout box if present */}
                                {section.callout && (
                                  <div
                                    className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3 my-4 ${
                                      section.callout.type === 'warning'
                                        ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                                        : section.callout.type === 'tip'
                                        ? 'bg-bg-alt border-gold/50 text-ink'
                                        : 'bg-blue-950/20 border-blue-500/30 text-blue-100'
                                    }`}
                                  >
                                    {section.callout.type === 'warning' ? (
                                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                                    ) : section.callout.type === 'tip' ? (
                                      <Lightbulb className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
                                    ) : (
                                      <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                    )}
                                    <div className="text-xs sm:text-sm space-y-1">
                                      <strong className="font-bold block text-ink">
                                        {section.callout.title}
                                      </strong>
                                      <p className="leading-relaxed opacity-90 font-light">
                                        {renderFormattedText(section.callout.text, locale, releaseModalOnRouteLeave)}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {/* Subsections if present */}
                                {section.subsections && section.subsections.length > 0 && (
                                  <div className="grid grid-cols-1 gap-3.5 my-4">
                                    {section.subsections.map((sub, subIdx) => (
                                      <div
                                        key={subIdx}
                                        className="p-4 sm:p-5 rounded-2xl bg-surface border border-border/40 space-y-1.5"
                                      >
                                        <h3 className="text-sm sm:text-base font-bold text-ink flex items-start gap-2.5">
                                          <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0 mt-1" />
                                          <span>{sub.title}</span>
                                        </h3>
                                        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light ps-6">
                                          {renderFormattedText(sub.text, locale, releaseModalOnRouteLeave)}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Bullets if present */}
                                {section.bullets && section.bullets.length > 0 && (
                                  <div className="space-y-2.5 my-4">
                                    {section.bullets.map((b, bIdx) => (
                                      <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                                        <div>
                                          <strong className="font-semibold text-ink">
                                            {b.title.replace(/[:：]\s*$/, '')}:{' '}
                                          </strong>
                                          <span className="text-ink-muted font-light leading-relaxed">
                                            {renderFormattedText(b.text, locale, releaseModalOnRouteLeave)}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Structured table if present */}
                                {section.table && (
                                  <div className="overflow-x-auto my-6 rounded-2xl border border-border bg-surface">
                                    <table className="w-full text-xs sm:text-sm text-start border-collapse">
                                      <thead className="bg-bg-alt border-b border-border">
                                        <tr>
                                          {section.table.headers.map((h, hIdx) => (
                                            <th
                                              key={hIdx}
                                              className="p-3 sm:p-3.5 font-bold text-gold-dark text-start whitespace-nowrap"
                                            >
                                              {renderFormattedText(h, locale, releaseModalOnRouteLeave)}
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-white/5">
                                        {section.table.rows.map((row, rIdx) => (
                                          <tr
                                            key={rIdx}
                                            className="hover:bg-surface/[0.02] transition-colors"
                                          >
                                            {row.map((cell, cIdx) => (
                                              <td
                                                key={cIdx}
                                                className="p-3 sm:p-3.5 text-ink-muted leading-relaxed align-top text-start"
                                              >
                                                {renderFormattedText(cell, locale, releaseModalOnRouteLeave)}
                                              </td>
                                            ))}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )}
                              </section>
                            ))}
                          </div>

                          {/* Article FAQs Section if present */}
                          {selectedPost.faqs && selectedPost.faqs.length > 0 && (
                            <div className="pt-6 border-t border-border/40 space-y-4">
                              <div className="space-y-1">
                                <h3 className="font-playfair font-serif text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
                                  <HelpCircle className="w-5 h-5 text-gold-dark shrink-0" />
                                  <span>{articleContent.faqTitle || ui.articleFaqs}</span>
                                </h3>
                                {articleContent.faqSubtitle && (
                                  <p className="text-xs text-ink-muted font-light">
                                    {articleContent.faqSubtitle}
                                  </p>
                                )}
                              </div>
                              <div className="space-y-3">
                                {selectedPost.faqs.map((faq, fIdx) => (
                                  <div key={fIdx} className="p-4 rounded-xl bg-surface border border-border/40">
                                    <h4 className="text-xs sm:text-sm font-semibold text-gold-dark mb-1.5">
                                      {faq.question}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-ink-muted font-light leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Bottom Article Reassurance CTA Banner */}
                          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#101725] to-[#141D2C] border border-gold/40 text-center space-y-4 shadow-xl">
                            <h3 className="font-playfair font-serif text-xl sm:text-2xl font-bold text-ink">
                              {articleContent.cta?.title || ui.bookRide}
                            </h3>
                            <p className="text-xs sm:text-sm text-ink-muted font-light max-w-xl mx-auto">
                              {articleContent.cta?.subtitle ||
                                (isRtl
                                  ? '0% دفع مسبق • الدفع نقدًا للسائق بعد الوصول إلى وجهتك المطلوبة • 60 دقيقة انتظار مجاني'
                                  : '0% Prepayment • Cash paid to the driver upon destination arrival • 60-Min Complimentary Airport Waiting')}
                            </p>
                            {articleContent.cta?.badges && articleContent.cta.badges.length > 0 && (
                              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                                {articleContent.cta.badges.map((badge, bIdx) => (
                                  <span
                                    key={bIdx}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg border border-border text-[11px] text-ink-muted"
                                  >
                                    <ShieldCheck className="w-3 h-3 text-gold-dark" />
                                    <span>{badge}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                              <Link
                                href={`/${locale}/booking`}
                                onClick={releaseModalOnRouteLeave}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D6A13A] to-[#E5B558] text-[#0E1420] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:brightness-110 transition-all"
                              >
                                <span>{articleContent.cta?.primaryBtn || ui.bookRide}</span>
                                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                              </Link>
                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-bg-alt border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 font-medium text-xs sm:text-sm transition-all shadow-sm"
                              >
                                <MessageCircle className="w-4 h-4" />
                                <span>{articleContent.cta?.secondaryBtn || ui.whatsappInquire}</span>
                              </a>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Footer Back Button */}
                      <div className="pt-4 flex justify-center">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-bg-alt border border-border text-xs text-ink-muted hover:text-ink transition-colors cursor-pointer"
                        >
                          <span>{ui.closeModal}</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  );
}
