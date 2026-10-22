import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';
import { MASTER_FAQS_INITIAL, MasterFaqItem } from '@/data/faqs-master';
import { createServiceClient } from '@/lib/supabase/service';

// In-memory runtime store with persistence fallback
let runtimeFaqs: MasterFaqItem[] = JSON.parse(JSON.stringify(MASTER_FAQS_INITIAL));

export async function GET(request: Request) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin', 'operator']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    let faqs = runtimeFaqs;

    // Attempt to read custom overrides from Supabase site_settings if available
    try {
      const serviceClient = createServiceClient();
      const { data } = await serviceClient.from('site_settings').select('custom_faqs').maybeSingle();
      if (data?.custom_faqs && Array.isArray(data.custom_faqs) && data.custom_faqs.length > 0) {
        faqs = data.custom_faqs;
        runtimeFaqs = data.custom_faqs;
      }
    } catch {}

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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const { id, category, questionEn, questionAr, answerEn, answerAr, status, needsOwnerConfirmation } = body;

    if (!id || !questionEn || !answerEn) {
      return NextResponse.json({ error: 'Missing required FAQ fields' }, { status: 400 });
    }

    const existingIndex = runtimeFaqs.findIndex((f) => f.id === id);
    const updatedItem: MasterFaqItem = {
      id,
      category: category || 'general',
      questionEn,
      questionAr: questionAr || questionEn,
      answerEn,
      answerAr: answerAr || answerEn,
      isOperational: Boolean(body.isOperational),
      needsOwnerConfirmation: Boolean(needsOwnerConfirmation),
      status: status === 'draft' ? 'draft' : 'published',
      lastVerifiedDate: body.lastVerifiedDate || 'October 2026',
      source: body.source || 'Admin Edited',
    };

    if (existingIndex !== -1) {
      runtimeFaqs[existingIndex] = updatedItem;
    } else {
      runtimeFaqs.unshift(updatedItem);
    }

    // Persist to Supabase site_settings if column exists or in site_settings
    try {
      const serviceClient = createServiceClient();
      await serviceClient
        .from('site_settings')
        .update({ custom_faqs: runtimeFaqs, updated_at: new Date().toISOString() })
        .eq('lock_id', true);
    } catch (e) {
      console.warn('Notice persisting custom_faqs to DB:', e);
    }

    // Audit log
    try {
      await logAuditEvent({
        userEmail: currentUser.email,
        userRole: currentUser.role,
        action: existingIndex !== -1 ? 'faq_update' : 'faq_create',
        resource: 'faqs',
        resourceId: id,
        newValues: updatedItem,
        ip: clientIp,
      });
    } catch {}

    return NextResponse.json({
      success: true,
      faq: updatedItem,
    });
  } catch (err: any) {
    console.error('Admin FAQs POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
