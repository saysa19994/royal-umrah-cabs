import { createServiceClient } from '@/lib/supabase/service';
import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache';
import { CmsPageRecord } from '@/types/content';
import { Locale, LOCALES } from '@/i18n/config';
import { logAuditEvent } from '@/lib/audit';

export const EDITABLE_CMS_PAGES = ['home','about','fleet','pricing','routes','services','contact','booking','ziyarat','faq','riyadh','taif'] as const;
export function isEditableCmsPageKey(key: unknown): key is typeof EDITABLE_CMS_PAGES[number] {
  return typeof key === 'string' && EDITABLE_CMS_PAGES.some(p => p === key);
}

export type CmsSaveRecord = CmsPageRecord & { expected_updated_at?: string | null };

/**
 * Public lookup uses database content, never per-instance in-memory fallbacks.
 * A missing row is normal: localized copy already has static defaults.
 */
export const getCmsPageCached = unstable_cache(
  async (pageKey: string, locale: Locale): Promise<CmsPageRecord | null> => {
    try {
      const { data, error } = await createServiceClient().from('page_content')
        .select('*').eq('page_key', pageKey).eq('language', locale).maybeSingle();
      if (error) {
        console.error('Public CMS page lookup failed:', error.message);
        return null;
      }
      return (data || null) as CmsPageRecord | null;
    } catch (err) {
      console.error('Public CMS page lookup unavailable:', err);
      return null;
    }
  },
  ['site_cms_page'],
  { tags: ['site_cms'], revalidate: 300 }
);

/** Admin reads must not use stale public Next.js caches. */
export async function getCmsPageAdmin(pageKey: string, locale: Locale): Promise<CmsPageRecord | null> {
  if (!isEditableCmsPageKey(pageKey) || !LOCALES.includes(locale)) throw new Error('Invalid CMS lookup');
  const { data, error } = await createServiceClient().from('page_content')
    .select('*').eq('page_key', pageKey).eq('language', locale).maybeSingle();
  if (error) throw new Error('CMS page unavailable');
  return (data || null) as CmsPageRecord | null;
}

/** Admin listing fails closed if its persisted database is unavailable. */
export async function getAllCmsPagesAdmin(): Promise<CmsPageRecord[]> {
  const { data, error } = await createServiceClient().from('page_content')
    .select('*')
    .in('page_key',[...EDITABLE_CMS_PAGES])
    .order('page_key', { ascending: true });

  if (error) {
    console.error('CMS registry query failed:', error.message);
    throw new Error('CMS registry unavailable');
  }
  return (data || []) as CmsPageRecord[];
}

const conflict = 'This page was changed by another editor. Reload the latest content and review your changes before saving again.';

/**
 * No schema changes are needed for optimistic concurrency: page_content already
 * has updated_at and UNIQUE(page_key,language). A stale update is rejected by
 * an atomic PostgREST UPDATE ... WHERE updated_at = expected_updated_at.
 */
export async function upsertCmsPageAdmin(
  record: CmsSaveRecord,
  userEmail: string,
  userRole: any,
  ip?: string
): Promise<{ success: boolean; record?: CmsPageRecord; error?: string }> {
  if (!record || typeof record !== 'object' ||
      !isEditableCmsPageKey(record.page_key) || !LOCALES.includes(record.language)) {
    return { success:false, error:'Unsupported CMS page or language' };
  }
  if (typeof record.seo_title !== 'string' || record.seo_title.trim().length < 3 ||
      record.seo_title.length > 200 || typeof record.seo_description !== 'string' ||
      record.seo_description.length > 500 || typeof record.h1 !== 'string' ||
      record.h1.length > 240 || !record.content_blocks ||
      typeof record.content_blocks !== 'object' || Array.isArray(record.content_blocks) ||
      JSON.stringify(record.content_blocks).length > 90000) {
    return { success:false,error:'Invalid SEO or content fields' };
  }
  if (!Object.prototype.hasOwnProperty.call(record, 'expected_updated_at') ||
      !(record.expected_updated_at === null ||
        (typeof record.expected_updated_at === 'string' &&
          !Number.isNaN(Date.parse(record.expected_updated_at))))) {
    return { success:false, error:'Save requires an expected content version. Reload the editor first.' };
  }

  // The homepage uses its separate published home_copy row and editor.
  // Riyadh and Taif are CMS drafts until their public page templates are wired.
  if (record.page_key === 'home') {
    return { success:false, error:'Use the dedicated Homepage Text editor to publish homepage text.' };
  }

  try {
    const db = createServiceClient();
    const oldValues = await getCmsPageAdmin(record.page_key, record.language);
    if ((oldValues?.updated_at || null) !== record.expected_updated_at) {
      return { success:false, error:conflict };
    }
    const payload = {
      page_key: record.page_key,
      language: record.language,
      seo_title: record.seo_title,
      seo_description: record.seo_description,
      h1: record.h1,
      content_blocks: record.content_blocks,
      updated_at: new Date().toISOString(),
    };
    let stored: CmsPageRecord | null = null;

    if (oldValues) {
      // Atomic version guard prevents two editors from silently overwriting
      // the same published language record.
      const { data, error } = await db.from('page_content').update(payload)
        .eq('page_key', record.page_key)
        .eq('language', record.language)
        .eq('updated_at', record.expected_updated_at!)
        .select('*').maybeSingle();
      if (error) throw new Error(error.message);
      if (!data) return { success:false, error:conflict };
      stored = data as CmsPageRecord;
    } else {
      const { data, error } = await db.from('page_content').insert(payload)
        .select('*').single();
      if (error) {
        if (error.code === '23505') return {success:false,error:conflict};
        throw new Error(error.message);
      }
      stored = data as CmsPageRecord;
    }

    await logAuditEvent({
      userEmail, userRole,
      action: oldValues ? 'cms_page_updated' : 'cms_page_created',
      resource: 'cms',
      resourceId: `${record.page_key}:${record.language}`,
      oldValues, newValues: stored, ip,
    });

    revalidateTag('site_cms');
    if (['about','services','contact','fleet','pricing','routes','ziyarat','booking','faq'].includes(record.page_key)) {
      revalidatePath('/[locale]/' + record.page_key, 'page');
    }
    return { success:true, record:stored };
  } catch (err) {
    console.error('Exception persisting page_content:', err);
    return { success:false, error:'Database persistence unavailable: CMS edit was not saved.' };
  }
}
