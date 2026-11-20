import { createServiceClient } from '@/lib/supabase/service';
import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache';
import { FaqItem, ContentStatus } from '@/types/content';
import { Locale } from '@/i18n/config';
import { logAuditEvent } from '@/lib/audit';
import { MASTER_FAQS_INITIAL } from '@/data/faqs-master';
import { getSiteSettingsCached } from '@/lib/settings';

// Map initial master faqs into full 10-locale FaqItem structures
function getInitialSeededFaqs(): FaqItem[] {
  return MASTER_FAQS_INITIAL.map((m, idx) => {
    let featureFlag: string | null = null;
    let flagOffAnswer: Record<string, string> | undefined = undefined;

    if (m.id === 'home-4') {
      featureFlag = 'flight_tracking_enabled';
      flagOffAnswer = {
        en: 'Your assigned chauffeur welcomes your family at the arrivals hall with a complimentary waiting window of 60 minutes after your confirmed arrival. For flight delays, please notify our team via WhatsApp to coordinate driver scheduling.',
        ar: 'يستقبلكم سائقكم الخاص في صالة الوصول مع فترة انتظار مجانية مدتها 60 دقيقة من وقت الوصول المؤكد. وفي حال تأخر الرحلة، يُرجى إشعار فريقنا عبر الواتساب لتنسيق موعد السائق.',
      };
    } else if (m.id === 'vehicle-2') {
      featureFlag = 'complimentary_child_seat';
      flagOffAnswer = {
        en: 'Child safety booster seats are available upon advance request during booking. Our dispatch team confirms availability and arrangements via WhatsApp before your journey is confirmed.',
        ar: 'تتوفر مقاعد أمان الأطفال عند الطلب المسبق أثناء الحجز. يؤكد فريق العمليات التوفر والترتيبات عبر الواتساب قبل تأكيد الرحلة.',
      };
    } else if (m.id === 'home-1' || m.id === 'routes-2') {
      if (m.id === 'routes-2') {
        featureFlag = 'free_miqat_stop';
        flagOffAnswer = {
          en: 'Miqat stops at Masjid Dhu al-Hulayfah (Bir Ali) are available upon request when traveling between Madinah and Makkah. Details and schedule arrangements are confirmed via WhatsApp before booking confirmation.',
          ar: 'تتوفر محطة التوقف في ميقات ذو الحليفة (أبيار علي) عند الطلب أثناء السفر بين المدينة ومكة. يتم تأكيد التفاصيل وتنسيق الوقت عبر الواتساب قبل تأكيد الحجز.',
        };
      }
    }

    return {
      id: m.id,
      category: m.category,
      question_translations: {
        en: m.questionEn,
        ar: m.questionAr,
      },
      answer_translations: {
        en: m.answerEn,
        ar: m.answerAr,
      },
      feature_flag_key: featureFlag,
      answer_flag_off_translations: flagOffAnswer,
      status: m.needsOwnerConfirmation ? 'needs_owner_confirmation' : (m.status as ContentStatus),
      sort_order: idx + 1,
      is_operational: m.isOperational,
      last_verified_date: m.lastVerifiedDate || 'October 2026',
      source: m.source || 'Duyuf Alrahman VIP Charter',
    };
  });
}


/**
 * Production does not have public.faqs. Store each FAQ in its own durable
 * page_content row instead, so concurrent edits to different FAQ IDs do not
 * overwrite one enormous JSON array. Seed FAQs are defaults, not ephemeral
 * writes. A tombstone hides a deleted seed without destroying its history.
 */
const FAQ_KEY_PREFIX = 'faq_item_';
const allowedCategories = new Set(['home', 'booking', 'cancellation', 'ziyarat', 'vehicles', 'routes', 'general']);
const allowedStatuses = new Set(['draft', 'published', 'archived', 'needs_owner_confirmation']);
const forbiddenFlags = new Set(['online_card_payment_enabled', 'bank_transfer_payment_enabled']);

function validFaqId(id: unknown): id is string {
  return typeof id === 'string' && /^[a-z0-9-]{2,100}$/.test(id);
}
function isTranslations(value: unknown): value is Record<string, string> {
  return value !== null && typeof value === 'object' && !Array.isArray(value) &&
    Object.values(value as Record<string, unknown>).every(
      v => typeof v === 'string' && v.length <= 8000
    );
}
function validateFaq(faq: FaqItem): string | null {
  if (!validFaqId(faq.id)) return 'FAQ identifier must be a short lowercase slug';
  if (!allowedCategories.has(faq.category)) return 'Invalid FAQ category';
  if (!allowedStatuses.has(faq.status)) return 'Invalid FAQ publication status';
  if (!isTranslations(faq.question_translations) || !isTranslations(faq.answer_translations))
    return 'Translations must contain short text fields';
  if (faq.status === 'published' &&
      (!faq.question_translations.en?.trim() || !faq.question_translations.ar?.trim() ||
       !faq.answer_translations.en?.trim() || !faq.answer_translations.ar?.trim()))
    return 'Published FAQs require an Arabic and English question and answer';
  if (!Number.isInteger(faq.sort_order) || faq.sort_order < 0 || faq.sort_order > 100000)
    return 'Invalid FAQ order';
  if (typeof faq.is_operational !== 'boolean') return 'Invalid FAQ operational status';
  if (faq.feature_flag_key && forbiddenFlags.has(faq.feature_flag_key))
    return 'Online card payments and bank transfers are not supported';
  if (JSON.stringify(faq).length > 60000) return 'FAQ is too large';
  if (/\[needs owner confirmation\]/i.test(JSON.stringify(faq)) && faq.status === 'published')
    return 'Resolve owner-confirmation placeholders before publishing';
  return null;
}

type FaqSavedRow = { page_key: string; content_blocks: unknown };
function storedFaq(row: FaqSavedRow): { id: string; faq?: FaqItem; deleted?: true } | null {
  if (!row.page_key.startsWith(FAQ_KEY_PREFIX)) return null;
  const id = row.page_key.slice(FAQ_KEY_PREFIX.length);
  if (!validFaqId(id)) return null;
  const value = row.content_blocks;
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const block = value as Record<string, unknown>;
  if (block.deleted === true) return { id, deleted: true };
  const data = block.faq;
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const faq = data as FaqItem;
  if (faq.id !== id || validateFaq(faq)) return null;
  return { id, faq };
}

async function fetchStoredFaqs(): Promise<FaqSavedRow[]> {
  const db = createServiceClient();
  // Reject partial data rather than deleting or hiding later entries from the UI.
  const { data, error, count } = await db.from('page_content')
    .select('page_key,content_blocks', { count: 'exact' })
    .eq('language', 'all').like('page_key', FAQ_KEY_PREFIX + '%')
    .order('page_key').range(0, 999);
  if (error || count === null || count === undefined || count > (data?.length || 0))
    throw new Error('Unable to load the complete saved FAQ registry');
  return (data || []) as FaqSavedRow[];
}

/** Admin and visitor pages use identical persisted records and seed defaults. */
export async function getAllFaqsAdmin(): Promise<FaqItem[]> {
  const records = new Map(getInitialSeededFaqs().map(f => [f.id, f]));
  for (const row of await fetchStoredFaqs()) {
    const saved = storedFaq(row);
    if (!saved) continue;
    if (saved.deleted) records.delete(saved.id);
    else if (saved.faq) records.set(saved.id, saved.faq);
  }
  return [...records.values()].sort(
    (a,b) => a.sort_order - b.sort_order || a.id.localeCompare(b.id)
  );
}

/**
 * Public FAQs render only published content. An admin edit invalidates this
 * shared cache and the relevant Next.js page; no production redeploy is needed.
 */
export const getPublicFaqsCached = unstable_cache(
  async (locale: Locale = 'en', category?: string): Promise<{ q: string; a: string; id: string; category: string }[]> => {
    const [allFaqs, settings] = await Promise.all([
      getAllFaqsAdmin(), getSiteSettingsCached(),
    ]);
    return allFaqs.filter(f => f.status === 'published')
      .filter(f => !category || category === 'all' || f.category === category)
      .map(f => {
        const q = f.question_translations[locale] || f.question_translations.en ||
          f.question_translations.ar || '';
        let a = f.answer_translations[locale] || f.answer_translations.en ||
          f.answer_translations.ar || '';
        if (f.feature_flag_key && !(settings as any)[f.feature_flag_key] &&
            f.answer_flag_off_translations) {
          a = f.answer_flag_off_translations[locale] ||
            f.answer_flag_off_translations.en ||
            f.answer_flag_off_translations.ar || a;
        }
        return { id: f.id, category: f.category, q, a };
      })
      .filter(item => item.q.trim() && item.a.trim());
  },
  ['site_faqs_public_v2'],
  { tags: ['site_faqs', 'site_settings'], revalidate: 86400 }
);

export async function upsertFaqAdmin(
  faq: FaqItem, userEmail: string, userRole: any, ip?: string
): Promise<{ success: boolean; faq?: FaqItem; error?: string }> {
  const problem = validateFaq(faq);
  if (problem) return { success: false, error: problem };
  let before: FaqItem | undefined;
  try {
    before = (await getAllFaqsAdmin()).find(item => item.id === faq.id);
    const db = createServiceClient();
    const { data, error } = await db.from('page_content').upsert({
      page_key: FAQ_KEY_PREFIX + faq.id, language: 'all',
      seo_title: (faq.question_translations.en || faq.question_translations.ar || '').slice(0,200),
      seo_description: '', h1: '',
      content_blocks: { faq, deleted: false },
      updated_at: new Date().toISOString(),
    }, { onConflict: 'page_key,language' }).select('page_key').single();
    if (error || !data) {
      console.error('FAQ persistence failed:', error?.message);
      return { success: false, error: 'Database persistence unavailable; FAQ was not saved' };
    }
  } catch (err) {
    console.error('FAQ save failed:', err);
    return { success: false, error: 'Database persistence unavailable; FAQ was not saved' };
  }

  try {
    await logAuditEvent({
      userEmail, userRole, action: before ? 'faq_updated' : 'faq_created',
      resource: 'faqs', resourceId: faq.id,
      oldValues: before || null, newValues: faq, ip,
    });
  } catch (err) {
    console.error('FAQ saved, but audit logging failed:', err);
  }
  revalidateTag('site_faqs');
  revalidatePath('/[locale]/faq', 'page');
  revalidatePath('/[locale]', 'page');
  return { success: true, faq };
}

/** Soft-delete a FAQ, including built-in defaults, without erasing history. */
export async function deleteFaqAdmin(
  id: string, userEmail: string, userRole: any, ip?: string
): Promise<{ success: boolean; error?: string }> {
  if (!validFaqId(id)) return { success: false, error: 'Invalid FAQ ID' };
  let existing: FaqItem | undefined;
  try {
    existing = (await getAllFaqsAdmin()).find(item => item.id === id);
    if (!existing) return { success: false, error: 'FAQ does not exist' };
    const db = createServiceClient();
    const { data, error } = await db.from('page_content').upsert({
      page_key: FAQ_KEY_PREFIX + id, language: 'all',
      seo_title: 'Archived FAQ ' + id,
      seo_description: '', h1: '',
      content_blocks: { deleted: true, previous: existing, id },
      updated_at: new Date().toISOString(),
    }, { onConflict: 'page_key,language' }).select('page_key').single();
    if (error || !data) {
      console.error('FAQ archive failed:', error?.message);
      return { success: false, error: 'Database persistence unavailable; FAQ was preserved' };
    }
  } catch (err) {
    console.error('FAQ archive failed:', err);
    return { success: false, error: 'Database persistence unavailable; FAQ was preserved' };
  }
  try {
    await logAuditEvent({
      userEmail, userRole, action: 'faq_archived',
      resource: 'faqs', resourceId: id,
      oldValues: existing, newValues: { deleted: true }, ip,
    });
  } catch (err) {
    console.error('FAQ archived, but audit logging failed:', err);
  }
  revalidateTag('site_faqs');
  revalidatePath('/[locale]/faq', 'page');
  revalidatePath('/[locale]', 'page');
  return { success: true };
}
