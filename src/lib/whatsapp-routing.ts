import { createClient } from './supabase/server';
import { createServiceClient } from './supabase/service';
import { Locale, LOCALE_CONFIG } from '@/i18n/config';

export interface WhatsAppNumberRecord {
  id: string;
  label: string;
  number: string;
  is_active: boolean;
  priority: number;
  routing_rule: 'all_to_main' | 'round_robin' | 'by_language' | 'by_working_hours' | 'main_with_fallback';
  assigned_languages: string[];
}

export const FALLBACK_WHATSAPP_NUMBERS: WhatsAppNumberRecord[] = [
  {
    id: 'main-default',
    label: 'Main Operations',
    number: '966567588261',
    is_active: true,
    priority: 1,
    routing_rule: 'main_with_fallback',
    assigned_languages: ['en', 'ar', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur'],
  },
  {
    id: 'second-default',
    label: 'Secondary Dispatch',
    number: '966505316971',
    is_active: true,
    priority: 2,
    routing_rule: 'main_with_fallback',
    assigned_languages: ['en', 'ar', 'ms', 'ur'],
  },
];

/**
 * Generate a unique reference code like RUC-48213
 */
export function generateLeadRefCode(): string {
  const chars = '0123456789';
  let randomNum = '';
  for (let i = 0; i < 5; i++) {
    randomNum += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RUC-${randomNum}`;
}

/**
 * Resolve which WhatsApp number to assign based on routing rules
 */
export async function resolveWhatsAppNumber(locale: string): Promise<WhatsAppNumberRecord> {
  try {
    const supabase = createClient();
    const { data: dbNumbers, error } = await supabase
      .from('whatsapp_numbers')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: true });

    const numbers: WhatsAppNumberRecord[] = (!error && dbNumbers && dbNumbers.length > 0)
      ? dbNumbers
      : FALLBACK_WHATSAPP_NUMBERS;

    if (numbers.length === 1) {
      return numbers[0];
    }

    const mainNumber = numbers.find((n) => n.priority === 1) || numbers[0];
    const secondaryNumber = numbers.find((n) => n.priority === 2) || numbers[1] || mainNumber;

    const rule = mainNumber.routing_rule || 'main_with_fallback';

    switch (rule) {
      case 'all_to_main':
        return mainNumber;

      case 'by_language': {
        const langMatch = numbers.find((n) => n.assigned_languages.includes(locale));
        return langMatch || mainNumber;
      }

      case 'by_working_hours': {
        // Calculate current hour in Saudi Arabia (Asia/Riyadh, UTC+3)
        const ksaHour = parseInt(
          new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            hour12: false,
            timeZone: 'Asia/Riyadh',
          }).format(new Date()),
          10
        );
        // Daytime (07:00 to 22:00 KSA) -> Main Operator; Night (22:00 to 07:00 KSA) -> Secondary Dispatch
        const isDayShift = ksaHour >= 7 && ksaHour < 22;
        return isDayShift ? mainNumber : secondaryNumber;
      }

      case 'round_robin': {
        // Simple alternating based on minute / random for lightweight stateless distribution
        const isAlternate = Math.floor(Date.now() / 60000) % 2 === 0;
        return isAlternate ? mainNumber : secondaryNumber;
      }

      case 'main_with_fallback':
      default:
        return mainNumber;
    }
  } catch {
    return FALLBACK_WHATSAPP_NUMBERS[0];
  }
}

export interface LeadCreationPayload {
  ref_code?: string | null;
  page?: string | null;
  language?: string | null;
  route_id?: string | null;
  route_title?: string | null;
  vehicle_id?: string | null;
  vehicle_name?: string | null;
  pickup_date?: string | null;
  passengers?: number | null;
  luggage?: number | null;
  price_sar?: number | null;
  customer_name?: string | null;
  customer_phone?: string | null;
  source_utm?: Record<string, string> | null;
}

/**
 * Formats a pre-filled WhatsApp message in the visitor's language with ref code
 */
export function formatWhatsAppLeadMessage(payload: LeadCreationPayload): string {
  const lang = (payload.language || 'en') as Locale;
  const ref = payload.ref_code || generateLeadRefCode();

  if (lang === 'ar') {
    let msg = `السلام عليكم ورحمة الله، رويال كاب للعمرة [كود المرجع: ${ref}]\nأود الاستفسار وحجز توصيل خاص:\n`;
    if (payload.route_title) msg += `📍 المسار: ${payload.route_title}\n`;
    if (payload.vehicle_name) msg += `🚗 السيارة: ${payload.vehicle_name}\n`;
    if (payload.pickup_date) msg += `📅 التاريخ: ${payload.pickup_date}\n`;
    if (payload.passengers) msg += `👥 عدد الركاب: ${payload.passengers}\n`;
    if (payload.price_sar) msg += `💰 السعر التقديري: ${payload.price_sar} ريال\n`;
    msg += `يرجى تأكيد الحجز وإرسال تفاصيل السائق. شكراً لكم.`;
    return msg;
  }

  if (lang === 'ms') {
    let msg = `Assalamu Alaikum Royal Umrah Cabs [Kod Rujukan: ${ref}]\nSaya ingin membuat tempahan teksi VIP untuk perjalanan Umrah:\n`;
    if (payload.route_title) msg += `📍 Laluan: ${payload.route_title}\n`;
    if (payload.vehicle_name) msg += `🚗 Kenderaan: ${payload.vehicle_name}\n`;
    if (payload.pickup_date) msg += `📅 Tarikh: ${payload.pickup_date}\n`;
    if (payload.passengers) msg += `👥 Penumpang: ${payload.passengers}\n`;
    if (payload.price_sar) msg += `💰 Anggaran Harga: SAR ${payload.price_sar}\n`;
    msg += `Sila sahkan ketersediaan dan maklumat pemandu. Terima kasih.`;
    return msg;
  }

  if (lang === 'ur') {
    let msg = `السلام علیکم رائل عمرہ کیبز [ریفرنس کوڈ: ${ref}]\nمیں عمرہ پرائیویٹ ٹرانسپورٹ بکنگ کے حوالے سے معلومات چاہتا ہوں:\n`;
    if (payload.route_title) msg += `📍 روٹ: ${payload.route_title}\n`;
    if (payload.vehicle_name) msg += `🚗 گاڑی: ${payload.vehicle_name}\n`;
    if (payload.pickup_date) msg += `📅 تاریخ: ${payload.pickup_date}\n`;
    if (payload.passengers) msg += `👥 مسافر: ${payload.passengers}\n`;
    if (payload.price_sar) msg += `💰 قیمت: ${payload.price_sar} ریال\n`;
    msg += `براہ کرم بکنگ کی تصدیق کریں۔ شکریہ۔`;
    return msg;
  }

  if (lang === 'id') {
    let msg = `Assalamu Alaikum Royal Umrah Cabs [Kode Ref: ${ref}]\nSaya ingin memesan layanan transportasi privat Umrah VIP:\n`;
    if (payload.route_title) msg += `📍 Rute: ${payload.route_title}\n`;
    if (payload.vehicle_name) msg += `🚗 Kendaraan: ${payload.vehicle_name}\n`;
    if (payload.pickup_date) msg += `📅 Tanggal: ${payload.pickup_date}\n`;
    if (payload.passengers) msg += `👥 Jumlah Penumpang: ${payload.passengers}\n`;
    if (payload.price_sar) msg += `💰 Estimasi Tarif: SAR ${payload.price_sar}\n`;
    msg += `Mohon konfirmasi ketersediaan armada. Terima kasih.`;
    return msg;
  }

  if (lang === 'fr') {
    let msg = `Bonjour Royal Umrah Cabs [Réf: ${ref}]\nJe souhaite réserver un transport privé VIP pour la Omra:\n`;
    if (payload.route_title) msg += `📍 Trajet: ${payload.route_title}\n`;
    if (payload.vehicle_name) msg += `🚗 Véhicule: ${payload.vehicle_name}\n`;
    if (payload.pickup_date) msg += `📅 Date: ${payload.pickup_date}\n`;
    if (payload.passengers) msg += `👥 Passagers: ${payload.passengers}\n`;
    if (payload.price_sar) msg += `💰 Tarif estimé: SAR ${payload.price_sar}\n`;
    msg += `Merci de confirmer la réservation. Cordialement.`;
    return msg;
  }

  if (lang === 'es') {
    let msg = `Hola Royal Umrah Cabs [Ref: ${ref}]\nQuisiera consultar sobre un traslado privado VIP para la Umrah:\n`;
    if (payload.route_title) msg += `📍 Ruta: ${payload.route_title}\n`;
    if (payload.vehicle_name) msg += `🚗 Vehículo: ${payload.vehicle_name}\n`;
    if (payload.pickup_date) msg += `📅 Fecha: ${payload.pickup_date}\n`;
    if (payload.passengers) msg += `👥 Pasajeros: ${payload.passengers}\n`;
    if (payload.price_sar) msg += `💰 Precio fijo: SAR ${payload.price_sar}\n`;
    msg += `Por favor confirme disponibilidad y detalles del conductor. Gracias.`;
    return msg;
  }

  if (lang === 'de') {
    let msg = `Guten Tag Royal Umrah Cabs [Ref: ${ref}]\nIch möchte einen privaten VIP-Umrah-Transfer anfragen:\n`;
    if (payload.route_title) msg += `📍 Route: ${payload.route_title}\n`;
    if (payload.vehicle_name) msg += `🚗 Fahrzeug: ${payload.vehicle_name}\n`;
    if (payload.pickup_date) msg += `📅 Datum: ${payload.pickup_date}\n`;
    if (payload.passengers) msg += `👥 Fahrgäste: ${payload.passengers}\n`;
    if (payload.price_sar) msg += `💰 Festpreis: SAR ${payload.price_sar}\n`;
    msg += `Bitte bestätigen Sie die Verfügbarkeit und Fahrerdetails. Vielen Dank.`;
    return msg;
  }

  if (lang === 'hi') {
    let msg = `नमस्ते Royal Umrah Cabs [रेफरेंस: ${ref}]\nमैं उमराह के लिए प्राइवेट वीआईपी कैब ट्रांसफर बुक करना चाहता हूँ:\n`;
    if (payload.route_title) msg += `📍 रूट: ${payload.route_title}\n`;
    if (payload.vehicle_name) msg += `🚗 गाड़ी: ${payload.vehicle_name}\n`;
    if (payload.pickup_date) msg += `📅 तारीख: ${payload.pickup_date}\n`;
    if (payload.passengers) msg += `👥 यात्री: ${payload.passengers}\n`;
    if (payload.price_sar) msg += `💰 निश्चित किराया: SAR ${payload.price_sar}\n`;
    msg += `कृपया बुकिंग और ड्राइवर विवरण की पुष्टि करें। धन्यवाद।`;
    return msg;
  }

  // Default English master
  let msg = `Assalamu Alaikum Royal Umrah Cabs [Ref: ${ref}]\nI would like to inquire about a private VIP Umrah transfer:\n`;
  if (payload.route_title) msg += `📍 Route: ${payload.route_title}\n`;
  if (payload.vehicle_name) msg += `🚗 Vehicle: ${payload.vehicle_name}\n`;
  if (payload.pickup_date) msg += `📅 Date: ${payload.pickup_date}\n`;
  if (payload.passengers) msg += `👥 Passengers: ${payload.passengers}\n`;
  if (payload.price_sar) msg += `💰 Fixed Price: SAR ${payload.price_sar}\n`;
  msg += `Please confirm availability and dispatch details. Thank you.`;
  return msg;
}

/**
 * Persists lead to database and returns WhatsApp URL with ref code
 */
export async function logLeadAndGenerateWhatsAppUrl(payload: LeadCreationPayload): Promise<{
  success: boolean;
  ref_code: string;
  whatsapp_number: string;
  whatsapp_url: string;
  message: string;
}> {
  const ref_code = payload.ref_code || generateLeadRefCode();
  const lang = payload.language || 'en';
  const assignedNumber = await resolveWhatsAppNumber(lang);
  const message = formatWhatsAppLeadMessage({ ...payload, ref_code });
  const encodedMsg = encodeURIComponent(message);
  const whatsapp_url = `https://wa.me/${assignedNumber.number}?text=${encodedMsg}`;

  try {
    const supabase = createServiceClient();
    await supabase.from('leads').insert({
      ref_code,
      whatsapp_number_id: assignedNumber.id.includes('default') ? null : assignedNumber.id,
      whatsapp_number: assignedNumber.number,
      page: payload.page || '/',
      language: lang,
      route_id: payload.route_id || null,
      vehicle_id: payload.vehicle_id || null,
      pickup_date: payload.pickup_date || null,
      passengers: payload.passengers || 1,
      price_sar: payload.price_sar || null,
      customer_name: payload.customer_name || null,
      customer_phone: payload.customer_phone || null,
      source_utm: payload.source_utm || {},
      status: 'new',
    });
  } catch (err) {
    console.error('Failed to log lead in Supabase:', err);
  }

  return {
    success: true,
    ref_code,
    whatsapp_number: assignedNumber.number,
    whatsapp_url,
    message,
  };
}
