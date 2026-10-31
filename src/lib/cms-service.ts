import { createServiceClient } from '@/lib/supabase/service';
import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache';
import { CmsPageRecord } from '@/types/content';
import { Locale } from '@/i18n/config';
import { logAuditEvent } from '@/lib/audit';

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
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .order('page_key', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as CmsPageRecord[];
    }
  } catch (err) {
    console.warn('Notice querying all CMS pages:', err);
  }

  return Object.values(memoryCmsStore);
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
  if (!record.page_key || !record.language || !record.seo_title) {
    return { success: false, error: 'Missing required CMS page fields (page_key, language, seo_title)' };
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
    console.warn('Exception upserting page_content:', err);
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
  revalidatePath('/[locale]', 'page');

  return { success: true, record };
}
