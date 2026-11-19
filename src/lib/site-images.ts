import { unstable_cache } from 'next/cache';
import { createServiceClient } from '@/lib/supabase/service';

// Hero film remains unchanged. These are editorial images only.
export const SITE_IMAGE_SLOTS = {
  hero_poster: { label: 'صورة الغلاف خلف فيديو الهيرو', fallback: '/assets/homepage-v2/hero-poster.jpg' },
  arrival_scene: { label: 'صورة فصل الاستقبال', fallback: '/assets/homepage-v2/hero-poster.jpg' },
  cabin_scene: { label: 'صورة المقصورة في رحلة الضيف', fallback: '/assets/images/vehicles/hyundai-staria/interior.webp' },
  destination_scene: { label: 'صورة فصل الوصول للوجهة', fallback: '/assets/images/routes/makkah-to-madinah.jpg' },
  closing_photo: { label: 'صورة القسم الختامي للصفحة الرئيسية', fallback: '/assets/images/reference/hero-gmc-saudi.jpg' },
} as const;

export type SiteImageKey = keyof typeof SITE_IMAGE_SLOTS;
export type SiteImages = Record<SiteImageKey, string>;
export const defaultSiteImages: SiteImages = Object.fromEntries(
  Object.entries(SITE_IMAGE_SLOTS).map(([key, info]) => [key, info.fallback])
) as SiteImages;

export const getSiteImagesCached = unstable_cache(async (): Promise<SiteImages> => {
  const { data, error } = await createServiceClient().from('page_content')
    .select('content_blocks').eq('page_key', 'site_images').eq('language', 'all').maybeSingle();
  if (error) {
    console.error('Site images could not be loaded', error.message);
    return defaultSiteImages;
  }
  const blocks = data?.content_blocks;
  const overrides = blocks && typeof blocks === 'object' && !Array.isArray(blocks)
    ? blocks as Record<string, unknown> : {};
  return Object.fromEntries(Object.entries(SITE_IMAGE_SLOTS).map(([key, entry]) => [
    key, typeof overrides[key] === 'string' && overrides[key] ? overrides[key] : entry.fallback,
  ])) as SiteImages;
}, ['site_images_admin_v1'], { tags: ['site_media', 'site_cms'], revalidate: 86400 });
