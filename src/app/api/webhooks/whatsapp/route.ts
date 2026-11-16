import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyWhatsAppSignature, detectIncomingLanguage } from '@/lib/whatsapp-signature';

/**
 * STAGING-ONLY WhatsApp Cloud API webhook.
 * Default: OFF. Requires signed Meta events, an explicitly configured business
 * phone-number ID and durable database deduplication. No AI-generated prices.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REPLIES: Record<string, string> = {
  ar: 'أهلًا بكم في ضيوف الرحمن VIP. وصلنا طلبكم؛ يرجى إرسال مكان الانطلاق والوجهة والتاريخ وعدد الركاب والحقائب. سيراجع فريقنا التوافر والأسعار قبل تأكيد الحجز.',
  en: 'Welcome to Duyuf Al Rahman VIP. Please share pickup, destination, date, passengers and luggage. Our team will check availability and fares before confirming any booking.',
  ms: 'Selamat datang ke Duyuf Al Rahman VIP. Sila nyatakan tempat jemput, destinasi, tarikh, penumpang dan bagasi. Pasukan kami akan menyemak ketersediaan dan tambang sebelum pengesahan.',
  id: 'Selamat datang di Duyuf Al Rahman VIP. Mohon kirim lokasi jemput, tujuan, tanggal, jumlah penumpang dan bagasi. Tim kami akan memeriksa ketersediaan dan tarif sebelum konfirmasi.',
  ur: 'ضیوف الرحمن وی آئی پی میں خوش آمدید۔ براہ کرم روانگی، منزل، تاریخ، مسافروں اور سامان کی تفصیل بھیجیں۔ ہماری ٹیم دستیابی اور کرائے کی جانچ کے بعد تصدیق کرے گی۔',
  fr: 'Bienvenue chez Duyuf Al Rahman VIP. Indiquez le lieu de départ, la destination, la date, les voyageurs et les bagages. Notre équipe vérifiera les disponibilités et tarifs avant confirmation.',
  es: 'Bienvenido a Duyuf Al Rahman VIP. Indique recogida, destino, fecha, pasajeros y equipaje. Nuestro equipo comprobará disponibilidad y tarifas antes de confirmar.',
  de: 'Willkommen bei Duyuf Al Rahman VIP. Bitte senden Sie Abholort, Ziel, Reisedatum, Passagiere und Gepäck. Unser Team prüft die Verfügbarkeit und Preise vor einer Bestätigung.',
  tr: 'Duyuf Al Rahman VIP’ye hoş geldiniz. Lütfen alınış yeri, varış noktası, tarih, yolcu ve bagaj sayısını paylaşın. Ekibimiz fiyatı ve uygunluğu kontrol edecektir. Türkçe konuşan şoför hizmetimiz bulunmamaktadır.',
  hi: 'Duyuf Al Rahman VIP में आपका स्वागत है। कृपया पिकअप, गंतव्य, तारीख, यात्रियों और सामान की जानकारी दें। पुष्टि से पहले हमारी टीम उपलब्धता और किराए की जाँच करेगी।',
};
const enabled = () => process.env.WHATSAPP_CLOUD_API_ENABLED === 'true';
const env = () => ({
  appSecret: process.env.WHATSAPP_APP_SECRET,
  verifyToken: process.env.WHATSAPP_VERIFY_TOKEN,
  apiToken: process.env.WHATSAPP_API_TOKEN,
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  graphVersion: process.env.WHATSAPP_GRAPH_API_VERSION,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  serviceRole: process.env.SUPABASE_SERVICE_ROLE_KEY,
});

export async function GET(request: Request) {
  const { verifyToken } = env();
  if (!enabled() || !verifyToken) {
    return NextResponse.json({ error: 'Unavailable' }, { status: 503 });
  }
  const params = new URL(request.url).searchParams;
  const mode = params.get('hub.mode');
  const provided = params.get('hub.verify_token');
  const challenge = params.get('hub.challenge');
  if (mode !== 'subscribe' || !provided || provided !== verifyToken || !challenge) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return new Response(challenge, {
    status: 200,
    headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
  });
}

export async function POST(request: Request) {
  if (!enabled()) return NextResponse.json({ status: 'disabled' });
  const cfg = env();
  if (!cfg.appSecret || !cfg.verifyToken || !cfg.apiToken || !cfg.phoneNumberId ||
      !cfg.supabaseUrl || !cfg.serviceRole || !cfg.graphVersion ||
      !/^v\d+\.\d+$/.test(cfg.graphVersion)) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }
  try {
    const rawBody = Buffer.from(await request.arrayBuffer());
    if (rawBody.byteLength === 0 || rawBody.byteLength > 1024 * 1024) {
      return NextResponse.json({ error: 'Invalid payload size' }, { status: 413 });
    }
    if (!verifyWhatsAppSignature(rawBody, request.headers.get('x-hub-signature-256'), cfg.appSecret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }
    const body = JSON.parse(rawBody.toString('utf8'));
    if (body?.object !== 'whatsapp_business_account') {
      return NextResponse.json({ status: 'ignored' });
    }
    const db = createClient(cfg.supabaseUrl, cfg.serviceRole, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    for (const entry of body.entry ?? []) {
      for (const change of entry?.changes ?? []) {
        const value = change?.value;
        // Do not answer a secondary or unapproved WhatsApp business number.
        if (value?.metadata?.phone_number_id !== cfg.phoneNumberId) continue;
        for (const message of value?.messages ?? []) {
          if (message?.type !== 'text' || typeof message?.id !== 'string' ||
              typeof message?.from !== 'string' || typeof message?.text?.body !== 'string') continue;
          if (!message.id || !/^\d{7,15}$/.test(message.from) || message.text.body.length > 4000) continue;

          // A unique private database key prevents duplicate Meta deliveries.
          const { error } = await db.from('whatsapp_webhook_events')
            .insert({ message_id: message.id, delivery_state: 'processing' });
          if (error?.code === '23505') continue;
          if (error) return NextResponse.json({ error: 'Idempotency store unavailable' }, { status: 503 });

          const locale = detectIncomingLanguage(message.text.body, message.from);
          const response = await fetch(
            `https://graph.facebook.com/${cfg.graphVersion}/${cfg.phoneNumberId}/messages`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${cfg.apiToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                messaging_product: 'whatsapp', to: message.from,
                type: 'text', text: { body: REPLIES[locale] || REPLIES.en },
              }),
              signal: AbortSignal.timeout(10000),
            },
          );
          await db.from('whatsapp_webhook_events')
            .update({ delivery_state: response.ok ? 'sent' : 'failed', updated_at: new Date().toISOString() })
            .eq('message_id', message.id);
          if (!response.ok) {
            return NextResponse.json({ error: 'Message API unavailable' }, { status: 502 });
          }
        }
      }
    }
    return NextResponse.json({ status: 'accepted' });
  } catch {
    // No phone numbers, message bodies or tokens in logs.
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
