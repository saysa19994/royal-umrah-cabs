import { createHmac, timingSafeEqual } from 'node:crypto';

export function verifyWhatsAppSignature(rawBody, signatureHeader, appSecret) {
  if (!rawBody || !appSecret || !signatureHeader) return false;
  const match = /^sha256=([0-9a-f]{64})$/i.exec(signatureHeader.trim());
  if (!match) return false;
  const supplied = Buffer.from(match[1], 'hex');
  const expected = createHmac('sha256', appSecret).update(rawBody).digest();
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export function detectIncomingLanguage(message, sender) {
  const text = String(message || '').trim();
  const lower = text.toLocaleLowerCase();
  if (/[\u0900-\u097f]/.test(text)) return 'hi';
  if (/[ٹڈڑںےھ]/.test(text)) return 'ur';
  if (/[\u0600-\u06ff]/.test(text)) return 'ar';
  if (/\b(merhaba|fiyat|ücret|şoför|havalimanı|rezervasyon|umre|kaç)\b/i.test(text) || /[ğışçöü]/i.test(text)) return 'tr';
  if (/\b(bonjour|merci|combien|tarif|aéroport)\b/i.test(text)) return 'fr';
  if (/\b(hola|gracias|precio|cuánto|aeropuerto)\b/i.test(text)) return 'es';
  if (/\b(hallo|danke|preis|flughafen|fahrt)\b/i.test(text)) return 'de';
  if (/\b(berapa|terima kasih|boleh|lapangan terbang)\b/i.test(text)) return 'ms';
  if (/\b(bisa|berapa harga|bandara|pesan mobil)\b/i.test(text)) return 'id';
  if (/\b(hello|hi|price|how much|booking|airport|from|to|please)\b/i.test(text)) return 'en';
  const number = String(sender || '').replace(/\D/g, '');
  if (number.startsWith('90')) return 'tr';
  if (number.startsWith('60')) return 'ms';
  if (number.startsWith('62')) return 'id';
  if (number.startsWith('92')) return 'ur';
  if (number.startsWith('33')) return 'fr';
  if (number.startsWith('34')) return 'es';
  if (number.startsWith('49')) return 'de';
  if (number.startsWith('91')) return 'hi';
  if (/^(966|20|971)/.test(number)) return 'ar';
  return 'en';
}
