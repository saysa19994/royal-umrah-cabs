import { createServiceClient } from '@/lib/supabase/service';
import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache';
import { CmsPageRecord } from '@/types/content';
import { Locale, LOCALES } from '@/i18n/config';
import { logAuditEvent } from '@/lib/audit';

export const EDITABLE_CMS_PAGES = ['home','about','fleet','pricing','routes','services','contact','booking','ziyarat','faq','riyadh','taif'] as const;
export function isEditableCmsPageKey(key: unknown): key is typeof EDITABLE_CMS_PAGES[number] {
  return typeof key === 'string' && EDITABLE_CMS_PAGES.some(p => p === key);
}

// In-memory fallback in case of transient DB lookup
const memoryCmsStore: Record<string, CmsPageRecord> = {};

function makeStoreKey(pageKey: string, locale: Locale): string {
  return `${pageKey}:${locale}`;
}

/**
 * Public/server helper to get localized page CMS content
 */
export const getCmsPageCached = unstable_cache(
  async (pageKey: string, locale: Locale): Promise<CmsPageRecord | null> => {
    try {
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_key', pageKey)
        .eq('language', locale)
        .maybeSingle();

      if (!error && data) {
        return data as CmsPageRecord;
      }
    } catch (err) {
      console.warn('Notice querying page_content from Supabase:', err);
    }

    const key = makeStoreKey(pageKey, locale);
    return memoryCmsStore[key] || null;
  },
  ['site_cms_page'],
  { tags: ['site_cms'], revalidate: 300 }
);

/**
 * Admin: List all CMS pages
 */
export async function getAllCmsPagesAdmin(): Promise<CmsPageRecord[]> {
  // An empty real database is valid; a failed database query is NOT an empty
  // editor. Failing open would let an administrator unknowingly overwrite pages.
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from('page_content')
    .select('*')
    .in('page_key',[...EDITABLE_CMS_PAGES])
    .order('page_key', { ascending: true });

  if (error) {
    console.error('CMS registry query failed:', error.message);
    throw new Error('CMS registry unavailable');
  }
  return (data || []) as CmsPageRecord[];
}

/**
 * Admin mutation: Save CMS page content
 */
export async function upsertCmsPageAdmin(
  record: CmsPageRecord,
  userEmail: string,
  userRole: any,
  ip?: string
): Promise<{ success: boolean; record?: CmsPageRecord; error?: string }> {
  if (!isEditableCmsPageKey(record.page_key) || !LOCALES.includes(record.language)) {
    return { success:false, error:'Unsupported CMS page or language' };
  }
  if (typeof record.seo_title !== 'string' || record.seo_title.trim().length < 3 ||
      record.seo_title.length > 200 || typeof record.seo_description !== 'string' ||
      record.seo_description.length > 500 || typeof record.h1 !== 'string' ||
      record.h1.length > 240 || !record.content_blocks ||
      typeof record.content_blocks !== 'object' || Array.isArray(record.content_blocks) ||
      JSON.stringify(record.content_blocks).length > 90000) {
    return {success:false,error:'Invalid SEO or content fields'};
  }

  const key = makeStoreKey(record.page_key, record.language);
  const oldValues = memoryCmsStore[key] || null;

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('page_content')
      .upsert(
        {
          page_key: record.page_key,
          language: record.language,
          seo_title: record.seo_title,
          seo_description: record.seo_description,
          h1: record.h1,
          content_blocks: record.content_blocks || {},
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'page_key,language' }
      )
      .select('*')
      .single();

    if (error) {
      console.error('Database persistence error in page_content table:', error.message);
      return {
        success: false,
        error: `Database persistence unavailable: table "page_content" error (${error.message}). Changes cannot be saved to durable storage.`,
      };
    }
  } catch (err) {
    console.error('Exception persisting page_content:', err);
    return { success: false, error: 'Database persistence unavailable: CMS edit was not saved.' };
  }

  memoryCmsStore[key] = record;

  await logAuditEvent({
    userEmail,
    userRole,
    action: oldValues ? 'cms_page_updated' : 'cms_page_created',
    resource: 'cms',
    resourceId: `${record.page_key}:${record.language}`,
    oldValues,
    newValues: record,
    ip,
  });

  revalidateTag('site_cms');
  if (['about','services','contact','fleet','pricing','routes','ziyarat','booking','faq'].includes(record.page_key)) {
    revalidatePath('/[locale]/' + record.page_key, 'page');
  }
  // 'home' currently has a dedicated text editor and cache. Never pretend
  // generic CMS JSON edits have changed an unwired public page.
  return { success: true, record };
}
