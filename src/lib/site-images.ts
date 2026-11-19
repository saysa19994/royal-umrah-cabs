import { unstable_cache } from 'next/cache';
import { createServiceClient } from '@/lib/supabase/service';

// Hero film remains unchanged. These are editorial images only.
export const SITE_IMAGE_SLOTS = {
  hero_poster: { label: 'صورة الغلاف خلف فيديو الهيرو', fallback: '/assets/homepage-v2/hero-poster.jpg' },
  arrival_scene: { label: 'صورة فصل الاستقبال', fallback: '/assets/homepage-v2/hero-poster.jpg' },
  cabin_scene: { label: 'صورة المقصورة في رحلة الضيف', fallback: '/assets/images/vehicles/hyundai-staria/interior.webp' },
  destination_scene: { label: 'صورة فصل الوصول للوجهة', fallback: '/assets/images/routes/makkah-to-madinah.jpg' },
  closing_photo: { label: 'صورة القسم الختامي للصفحة الرئيسية', fallback: '/assets/images/reference/hero-gmc-saudi.jpg' },
  about_arrival: { label: 'من نحن — صورة الاستقبال', fallback: '/assets/homepage-v2/route-jeddah-makkah.jpg' },
  about_comfort: { label: 'من نحن — صورة المقصورة', fallback: '/assets/homepage-v2/service-group-interior.jpg' },
  booking_haram: { label: 'الحجز — صورة الحرم', fallback: '/assets/homepage-v2/ziyarat-haram.jpg' },
  booking_vehicle: { label: 'الحجز — صورة السيارة', fallback: '/assets/images/yukon_exterior.webp' },
  services_airport: { label: 'الخدمات — استقبال المطارات', fallback: '/assets/images/routes/jeddah-airport-to-makkah.jpg' },
  services_ziyarat: { label: 'الخدمات — زيارات مكة والمدينة', fallback: '/assets/images/routes/makkah-ziyarat.jpg' },
  services_intercity: { label: 'الخدمات — النقل بين المدن', fallback: '/assets/images/routes/makkah-to-madinah.jpg' },
  services_family: { label: 'الخدمات — رحلات العائلات', fallback: '/assets/images/vip-umrah-transport-jeddah-to-makkah.jpg' },
  services_group: { label: 'الخدمات — الحافلات', fallback: '/assets/images/studio-2k/toyota-coaster-studio-2k.webp' },
  services_chauffeur: { label: 'الخدمات — رحلات VIP', fallback: '/assets/images/cinematic/home/hero-mercedes-kaaba-retina.jpg' },
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
