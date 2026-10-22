import { NextResponse } from 'next/server';

/**
 * Phase 5.2: WhatsApp Cloud API Webhook Scaffold
 * FEATURE-FLAGGED & DISABLED BY DEFAULT.
 * Set WHATSAPP_CLOUD_API_ENABLED=true in Vercel to activate.
 * Strictly disabled for the secondary number (+966505316971).
 */

const WHATSAPP_CLOUD_API_ENABLED = process.env.WHATSAPP_CLOUD_API_ENABLED === 'true';
const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'duyuf_alrahman_vip_token';
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN || '';
const PRIMARY_PHONE_NUMBER = '966567588261'; // Phone A only

// Language detection from phone country code prefix
function detectLocaleFromPhone(phoneNumber: string): string {
  const clean = phoneNumber.replace(/\D/g, '');
  if (clean.startsWith('60')) return 'ms'; // Malaysia
  if (clean.startsWith('62')) return 'id'; // Indonesia
  if (clean.startsWith('92')) return 'ur'; // Pakistan
  if (clean.startsWith('33')) return 'fr'; // France
  if (clean.startsWith('49')) return 'de'; // Germany
  if (clean.startsWith('34')) return 'es'; // Spain
  if (clean.startsWith('91')) return 'hi'; // India
  if (clean.startsWith('966') || clean.startsWith('20') || clean.startsWith('971')) return 'ar'; // Arab countries
  return 'en';
}

// Language detection from message content
function detectLocaleFromText(text: string): string {
  if (/[\u0600-\u06FF]/.test(text)) {
    // Check for Urdu specific characters
    if (/[ٹڈڑںہے]/.test(text)) return 'ur';
    return 'ar';
  }
  const lower = text.toLowerCase();
  if (lower.includes('saya') || lower.includes('terima kasih') || lower.includes('berapa')) return 'ms';
  if (lower.includes('pesan') || lower.includes('bisa') || lower.includes('ongkir')) return 'id';
  if (lower.includes('bonjour') || lower.includes('merci') || lower.includes('prix')) return 'fr';
  if (lower.includes('hallo') || lower.includes('danke') || lower.includes('preis')) return 'de';
  if (lower.includes('hola') || lower.includes('gracias') || lower.includes('cuanto')) return 'es';
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  return 'en';
}

// 9-Language Auto-reply Templates
const AUTO_REPLY_TEMPLATES: Record<string, string> = {
  ar: 'أهلاً بكم في ضيوف الرحمن VIP 🕋✨\nتم استلام رسالتكم بنجاح. جاري تحويل طلبكم لمشرف العمليات الميداني للرد عليكم وتأكيد بيانات السائق والسيارة فوراً.',
  en: 'Welcome to Duyuf Alrahman VIP Chauffeur Services 🕋✨\nYour inquiry has been received. Our on-duty dispatch manager is reviewing your transfer details and will respond in a moment.',
  ms: 'Selamat datang ke Duyuf Alrahman VIP 🕋✨\nMesej anda telah diterima. Pegawai operasi kami sedang menyemak butiran perjalanan anda dan akan membalas sebentar lagi.',
  id: 'Selamat datang di Duyuf Alrahman VIP 🕋✨\nPesan Anda telah kami terima. Tim operasional kami sedang memproses permintaan transportasi Anda dan akan segera merespons.',
  ur: 'ضیوف الرحمن وی آئی پی میں خوش آمدید 🕋✨\nآپ کا پیغام موصول ہو چکا ہے۔ ہمارے آپریشن مینیجر جلد ہی آپ کی بکنگ تفصیلات کے ساتھ رابطہ کریں گے۔',
  fr: 'Bienvenue chez Duyuf Alrahman VIP 🕋✨\nVotre message a bien été reçu. Notre responsable des opérations traite votre demande et vous répond dans un instant.',
  de: 'Willkommen bei Duyuf Alrahman VIP 🕋✨\nIhre Nachricht wurde empfangen. Unser Disponent prüft Ihre Anfrage und meldet sich in Kürze.',
  es: 'Bienvenido a Duyuf Alrahman VIP 🕋✨\nHemos recibido su mensaje. Nuestro equipo de despacho está revisando su solicitud y le responderá a la brevedad.',
  hi: 'Duyuf Alrahman VIP में आपका स्वागत है 🕋✨\nआपका संदेश प्राप्त हो गया है। हमारे ऑपरेशंस मैनेजर जल्द ही आपसे संपर्क करेंगे।',
};

// GET: Meta Webhook Challenge Verification
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// POST: Incoming WhatsApp Message Event
export async function POST(request: Request) {
  if (!WHATSAPP_CLOUD_API_ENABLED) {
    // Disabled by default; acknowledge safely so Meta doesn't retry endlessly
    return NextResponse.json({ status: 'scaffold_disabled', message: 'WhatsApp Cloud API is currently disabled via feature flag.' });
  }

  try {
    const body = await request.json();
    const entry = body.entry?.[0];
    const change = entry?.changes?.[0]?.value;
    const message = change?.messages?.[0];
    const recipientPhoneId = change?.metadata?.phone_number_id;
    const recipientDisplayNumber = change?.metadata?.display_phone_number?.replace(/\D/g, '');

    // Rule: Strictly reject or ignore messages sent to Phone B (+966505316971)
    if (recipientDisplayNumber === '966505316971') {
      console.log('WhatsApp Webhook: Secondary phone number B ignored as instructed.');
      return NextResponse.json({ status: 'ignored_secondary_number' });
    }

    if (message && message.from) {
      const senderPhone = message.from;
      const text = message.text?.body || '';

      // Language detection priority: text analysis -> phone country code
      const locale = text ? detectLocaleFromText(text) : detectLocaleFromPhone(senderPhone);
      const replyBody = AUTO_REPLY_TEMPLATES[locale] || AUTO_REPLY_TEMPLATES.en;

      // Send auto-reply via Meta Graph API if credentials configured
      if (WHATSAPP_API_TOKEN && recipientPhoneId) {
        await fetch(`https://graph.facebook.com/v20.0/${recipientPhoneId}/messages`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${WHATSAPP_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: senderPhone,
            type: 'text',
            text: { body: replyBody },
          }),
        });
      }
    }

    return NextResponse.json({ status: 'success' });
  } catch (err: any) {
    console.error('WhatsApp webhook error:', err);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
