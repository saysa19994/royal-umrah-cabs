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

// In-memory runtime buffer in case cloud database table is pending migration
let runtimeFaqsStore: FaqItem[] = getInitialSeededFaqs();

/**
 * Fetches all FAQs for admin management
 */
export async function getAllFaqsAdmin(): Promise<FaqItem[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as FaqItem[];
    }
  } catch (err) {
    console.warn('Notice querying faqs table from Supabase, falling back to runtime store:', err);
  }

  return runtimeFaqsStore;
}

/**
 * Resolves public FAQs filtered by locale and gated by active feature flags.
 * Cached with tag 'site_faqs'.
 */
export const getPublicFaqsCached = unstable_cache(
  async (locale: Locale = 'en', category?: string): Promise<{ q: string; a: string; id: string; category: string }[]> => {
    const allFaqs = await getAllFaqsAdmin();
    const settings = await getSiteSettingsCached();

    // Only published FAQs are visible publicly
    const published = allFaqs.filter((f) => f.status === 'published');

    return published
      .filter((f) => !category || category === 'all' || f.category === category)
      .map((f) => {
        // Resolve question text
        const q = f.question_translations[locale] || f.question_translations.en || f.question_translations.ar || '';

        // Check feature flag if linked
        let answerText = f.answer_translations[locale] || f.answer_translations.en || f.answer_translations.ar || '';
        if (f.feature_flag_key) {
          const isFlagActive = Boolean((settings as any)[f.feature_flag_key]);
          if (!isFlagActive && f.answer_flag_off_translations) {
            answerText =
              f.answer_flag_off_translations[locale] ||
              f.answer_flag_off_translations.en ||
              f.answer_flag_off_translations.ar ||
              answerText;
          }
        }

        return {
          id: f.id,
          category: f.category,
          q,
          a: answerText,
        };
      });
  },
  ['site_faqs_public'],
  { tags: ['site_faqs', 'site_settings'], revalidate: 300 }
);

/**
 * Admin mutation: Save or update an FAQ item with audit logging and cache invalidation
 */
export async function upsertFaqAdmin(
  faq: FaqItem,
  userEmail: string,
  userRole: any,
  ip?: string
): Promise<{ success: boolean; faq?: FaqItem; error?: string }> {
  // Prevent bracketed placeholders from being published
  const rawText = JSON.stringify(faq);
  if (/\[needs owner confirmation\]/i.test(rawText) && faq.status === 'published') {
    return {
      success: false,
      error: 'Cannot publish FAQ containing unresolved placeholder "[needs owner confirmation]". Please remove placeholder or save as draft.',
    };
  }

  const existingIdx = runtimeFaqsStore.findIndex((f) => f.id === faq.id);
  const oldValues = existingIdx !== -1 ? runtimeFaqsStore[existingIdx] : null;

  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('faqs')
      .upsert({
        id: faq.id,
        category: faq.category,
        question_translations: faq.question_translations,
        answer_translations: faq.answer_translations,
        feature_flag_key: faq.feature_flag_key || null,
        answer_flag_off_translations: faq.answer_flag_off_translations || null,
        status: faq.status,
        sort_order: faq.sort_order,
        is_operational: faq.is_operational,
        last_verified_date: faq.last_verified_date || 'October 2026',
        source: faq.source || null,
        updated_at: new Date().toISOString(),
      })
      .select('*')
      .single();

    if (error) {
      console.warn('Notice saving FAQ to Supabase faqs table, syncing to runtime store:', error.message);
    }
  } catch (err) {
    console.warn('Exception persisting FAQ to DB:', err);
  }

  // Update runtime store
  if (existingIdx !== -1) {
    runtimeFaqsStore[existingIdx] = faq;
  } else {
    runtimeFaqsStore.push(faq);
  }

  // Log audit event
  await logAuditEvent({
    userEmail,
    userRole,
    action: oldValues ? 'faq_updated' : 'faq_created',
    resource: 'faqs',
    resourceId: faq.id,
    oldValues,
    newValues: faq,
    ip,
  });

  // Revalidate cache tags and paths immediately
  revalidateTag('site_faqs');
  revalidatePath('/', 'layout');

  return { success: true, faq };
}

/**
 * Admin mutation: Delete an FAQ item
 */
export async function deleteFaqAdmin(
  id: string,
  userEmail: string,
  userRole: any,
  ip?: string
): Promise<{ success: boolean; error?: string }> {
  const existingIdx = runtimeFaqsStore.findIndex((f) => f.id === id);
  const oldValues = existingIdx !== -1 ? runtimeFaqsStore[existingIdx] : null;

  try {
    const supabase = createServiceClient();
    await supabase.from('faqs').delete().eq('id', id);
  } catch (err) {
    console.warn('Notice deleting FAQ from Supabase:', err);
  }

  if (existingIdx !== -1) {
    runtimeFaqsStore.splice(existingIdx, 1);
  }

  await logAuditEvent({
    userEmail,
    userRole,
    action: 'faq_deleted',
    resource: 'faqs',
    resourceId: id,
    oldValues,
    newValues: null,
    ip,
  });

  revalidateTag('site_faqs');
  revalidatePath('/', 'layout');

  return { success: true };
}
