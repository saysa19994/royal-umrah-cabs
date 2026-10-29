import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { getAllFaqsAdmin, upsertFaqAdmin, deleteFaqAdmin } from '@/lib/faq-service';
import { getClientIp } from '@/lib/rate-limit';
import { FaqItem } from '@/types/content';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin', 'operator', 'content_editor', 'translator']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    let faqs = await getAllFaqsAdmin();

    if (category && category !== 'all') {
      faqs = faqs.filter((f) => f.category === category);
    }
    if (status && status !== 'all') {
      faqs = faqs.filter((f) => f.status === status);
    }

    return NextResponse.json({
      success: true,
      faqs,
      total: faqs.length,
    });
  } catch (err: any) {
    console.error('Admin FAQs GET error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error retrieving FAQs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();

    const faqPayload: FaqItem = {
      id: body.id,
      category: body.category || 'general',
      question_translations: body.question_translations || {
        en: body.questionEn || '',
        ar: body.questionAr || '',
      },
      answer_translations: body.answer_translations || {
        en: body.answerEn || '',
        ar: body.answerAr || '',
      },
      feature_flag_key: body.feature_flag_key || null,
      answer_flag_off_translations: body.answer_flag_off_translations || null,
      status: body.status || 'published',
      sort_order: Number(body.sort_order) || 1,
      is_operational: typeof body.is_operational === 'boolean' ? body.is_operational : true,
      last_verified_date: body.last_verified_date || 'October 2026',
      source: body.source || 'Duyuf Alrahman VIP Charter',
    };

    if (!faqPayload.id || (!faqPayload.question_translations.en && !faqPayload.question_translations.ar)) {
      return NextResponse.json({ success: false, error: 'Missing required FAQ fields' }, { status: 400 });
    }

    const result = await upsertFaqAdmin(faqPayload, currentUser.email, currentUser.role, clientIp);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, faq: result.faq });
  } catch (err: any) {
    console.error('Admin FAQs POST error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error saving FAQ' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'FAQ ID is required' }, { status: 400 });
    }

    const result = await deleteFaqAdmin(id, currentUser.email, currentUser.role, clientIp);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Admin FAQs DELETE error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error deleting FAQ' }, { status: 500 });
  }
}
