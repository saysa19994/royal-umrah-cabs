import { unstable_cache } from 'next/cache';
import { createServiceClient } from '@/lib/supabase/service';
import { getRoutePhotoFromTranslations } from './route-media';

/**
 * Public route availability overlay from the same route records the admin edits.
 * A missing record means the historic approved route can use its existing
 * fallback; an explicit is_active=false means it is NOT offered for booking.
 * Keeping the overlay small avoids copying or inventing route definitions.
 */
export type PublishedRouteStatus = Record<string, boolean>;

export const getPublishedRouteStatusCached = unstable_cache(
  async (): Promise<PublishedRouteStatus> => {
    try {
      const { data, error } = await createServiceClient()
        .from('routes')
        .select('id,is_active');
      if (error) {
        console.warn('Public route availability lookup failed:', error.message);
        return {};
      }
      return Object.fromEntries(
        (data || [])
          .filter(row => typeof row.id === 'string' && typeof row.is_active === 'boolean')
          .map(row => [row.id, row.is_active])
      );
    } catch (error) {
      console.warn('Public route availability unavailable:', error);
      return {};
    }
  },
  ['site_public_route_status_v1'],
  { tags: ['site_routes'], revalidate: 86400 }
);


/**
 * Editor-controlled route cover photos. The cache shares the same site_routes
 * invalidation tag as route visibility, so an admin image change appears after
 * a normal refresh without a full-site cache purge.
 */
export const getPublishedRouteImagesCached = unstable_cache(
  async (): Promise<Record<string, string>> => {
    try {
      const { data, error } = await createServiceClient()
        .from('routes')
        .select('id,translations');
      if (error) {
        console.warn('Route cover lookup failed:', error.message);
        return {};
      }
      const covers: Record<string, string> = {};
      for (const route of data || []) {
        const photo = getRoutePhotoFromTranslations(route.translations);
        if (typeof route.id === 'string' && photo) covers[route.id] = photo;
      }
      return covers;
    } catch (error) {
      console.warn('Route cover lookup unavailable:', error);
      return {};
    }
  },
  ['site_public_route_images_v1'],
  { tags: ['site_routes'], revalidate: 86400 }
);
