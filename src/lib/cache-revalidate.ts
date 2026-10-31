import { revalidateTag, revalidatePath } from 'next/cache';
import { LOCALES } from '@/i18n/config';

/**
 * Universal on-demand cache revalidation.
 * Instantly invalidates ISR cache tags and localized paths across all 10 supported languages,
 * ensuring any change made in the dashboard appears on the public website within seconds.
 */
export function revalidateSite(tags: string[] = []) {
  const defaultTags = [
    'site_fleet',
    'site_prices',
    'site_pricing',
    'site_settings',
    'site_faqs',
    'site_reviews',
    'site_blog',
    'site_cms',
    'site_media',
  ];

  const targetTags = tags.length > 0 ? tags : defaultTags;

  for (const tag of targetTags) {
    try {
      revalidateTag(tag);
    } catch {}
  }

  try {
    revalidatePath('/', 'layout');
    revalidatePath('/[locale]', 'layout');
    revalidatePath('/[locale]', 'page');
  } catch {}

  for (const loc of LOCALES) {
    try {
      revalidatePath(`/${loc}`);
      revalidatePath(`/${loc}/pricing`);
      revalidatePath(`/${loc}/booking`);
      revalidatePath(`/${loc}/routes`);
      revalidatePath(`/${loc}/faq`);
      revalidatePath(`/${loc}/blog`);
    } catch {}
  }
}
