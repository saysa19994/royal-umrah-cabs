import fs from 'fs';
import path from 'path';

console.log('=== COMPREHENSIVE FIX ACROSS ALL DICTIONARIES & COMPONENTS ===');

// 1. DICTIONARIES
const DICT_DIR = 'D:/royal-umrah-cabs/src/i18n/dictionaries';
const locales = ['en', 'ar', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr'];

for (const loc of locales) {
  const filePath = path.join(DICT_DIR, `${loc}.json`);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace common payment phrases across entire dictionary JSON
  // Arabic
  content = content.replace(/نقداً فقط عند الوصول/g, 'نقداً مباشرة للسائق عند الوصول');
  content = content.replace(/نقداً فقط/g, 'نقداً للسائق');
  content = content.replace(/نقداً فقط البنكية/g, '');
  content = content.replace(/نقداً فقط/g, '');
  content = content.replace(/أو بالبطاقات/g, '');

  // English
  content = content.replace(/in cash in cash only upon arrival/gi, 'strictly in cash to your driver upon arrival');
  content = content.replace(/cash only (SAR or USD) upon arrival/gi, 'cash to your driver upon arrival');
  content = content.replace(/via cash only (SAR or USD) upon safe arrival/gi, 'in cash upon safe arrival');
  content = content.replace(/via cash only (SAR or USD)/gi, 'in cash to your driver');
  content = content.replace(/in cash \(SAR\) in cash only/gi, 'in cash (SAR)');
  content = content.replace(/in cash \(SAR\) or card/gi, 'in cash (SAR)');
  content = content.replace(/cash \(SAR\) or card/gi, 'cash (SAR)');
  content = content.replace(/cash only (SAR or USD)/gi, 'cash');

  // French
  content = content.replace(/uniquement en espèces/gi, 'en espèces');
  content = content.replace(/en espèces \(SAR\) ou en espèces/gi, 'en espèces (SAR)');
  content = content.replace(/en espèces \(SAR\) ou par carte/gi, 'en espèces (SAR)');
  content = content.replace(/sur le terminal du chauffeur/gi, 'auprès du chauffeur');

  // Spanish
  content = content.replace(/exclusivamente en efectivo/gi, 'en efectivo');
  content = content.replace(/en efectivo o con tarjeta/gi, 'en efectivo');
  content = content.replace(/en efectivo \(SAR\) o con tarjeta bancaria/gi, 'en efectivo (SAR)');
  content = content.replace(/en efectivo \(SAR\) en efectivo/gi, 'en efectivo (SAR)');
  content = content.replace(/en el terminal del chofer/gi, 'directamente al chofer');

  // German
  content = content.replace(/in ausschließlich in bar/gi, 'in bar');
  content = content.replace(/in bar \(SAR\) oder mit Karte/gi, 'in bar (SAR)');
  content = content.replace(/in bar \(SAR\) oder per Karte/gi, 'in bar (SAR)');
  content = content.replace(/Bar\/Karte/gi, 'Bar');
  content = content.replace(/Bar \/ Karte/gi, 'Bar');

  // Turkish
  content = content.replace(/yalnızca nakitla/gi, 'nakit olarak');
  content = content.replace(/nakit \(SAR\) veya kartla/gi, 'nakit (SAR)');
  content = content.replace(/Nakit\/Kartla/gi, 'Nakit');
  content = content.replace(/Nakit \/ Kart/gi, 'Nakit');
  content = content.replace(/veya kredi kartıyla/gi, '');
  content = content.replace(/veya şoförün araçtaki POS cihazından banka kartıyla/gi, '');

  // Malay & Indonesian
  content = content.replace(/secara tunai sahaja/gi, 'secara tunai');
  content = content.replace(/secara tunai \(SAR\) secara tunai sahaja/gi, 'secara tunai (SAR)');
  content = content.replace(/secara tunai saja/gi, 'secara tunai');
  content = content.replace(/secara tunai \(SAR\) secara tunai saja/gi, 'secara tunai (SAR)');
  content = content.replace(/Tunai \/ Kad/gi, 'Tunai');
  content = content.replace(/Tunai \/ Kartu/gi, 'Tunai');

  // Urdu
  content = content.replace(/صرف نقد سے/g, 'نقد');
  content = content.replace(/نقد \(سعودی ریال\) صرف نقد/g, 'نقد (سعودی ریال)');
  content = content.replace(/نقد \/ کارڈ/g, 'نقد');

  // Hindi
  content = content.replace(/केवल नकद से/gu, 'नकद');
  content = content.replace(/नकद \(SAR\) या कार्ड से/gu, 'नकद (SAR)');
  content = content.replace(/नकद \/ कार्ड/gu, 'नकद');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Cleaned dictionary ${loc}.json`);
}

// 2. BookingEngine.tsx: Normalize CRLF and replace paymentDesc and summaryPaymentValue
const enginePath = 'D:/royal-umrah-cabs/src/components/booking/BookingEngine.tsx';
let engineContent = fs.readFileSync(enginePath, 'utf8');
// Normalize to LF temporarily for clean replacements
const isCRLF = engineContent.includes('\r\n');
engineContent = engineContent.split('\r\n').join('\n');

// Replace French paymentDesc
engineContent = engineContent.replace(
  /Le paiement est effectué directement auprès de votre chauffeur privé[\s\S]*?pour confirmer\./,
  "Le paiement s’effectue exclusivement en espèces directement auprès de votre chauffeur privé à votre arrivée à destination pour votre trajet. Aucun acompte ni prépaiement n’est requis pour valider cette réservation."
);

// Replace Spanish paymentDesc
engineContent = engineContent.replace(
  /El pago se realiza directamente a su chofer privado[\s\S]*?asegurar su reserva\./,
  "El pago se realiza exclusivamente en efectivo directamente a su chofer privado a la llegada a su destino para su viaje. No se requiere ningún anticipo ni depósito para asegurar su reserva."
);

// Replace Turkish paymentDesc
engineContent = engineContent.replace(
  /Ödeme, varış noktanıza ulaştığınızda doğrudan özel şoförünüze yapılır\.[\s\S]*?kapora gerekmez\./,
  "Ödeme, yolculuğunuz için varış noktanıza ulaştığınızda tamamen nakit olarak doğrudan özel şoförünüze yapılır. Bu rezervasyonu onaylamak için hiçbir ön ödeme veya kapora gerekmez."
);

// Convert back to CRLF if originally CRLF
if (isCRLF) {
  engineContent = engineContent.split('\n').join('\r\n');
}
fs.writeFileSync(enginePath, engineContent, 'utf8');
console.log('Fixed all language paymentDesc in BookingEngine.tsx');

// 3. Footer.tsx: completely remove lines with MADA, Visa, and Saudi Bank Transfer
const footerPath = 'D:/royal-umrah-cabs/src/components/layout/Footer.tsx';
let footerContent = fs.readFileSync(footerPath, 'utf8');
const isFooterCRLF = footerContent.includes('\r\n');
footerContent = footerContent.split('\r\n').join('\n');

const madaIdx = footerContent.indexOf('{/* Conditional Online Card / Mada');
if (madaIdx !== -1) {
  const endBlock = footerContent.indexOf('</div>\n          </div>\n\n          <div className="flex flex-col gap-1', madaIdx);
  if (endBlock !== -1) {
    footerContent = footerContent.slice(0, madaIdx) + footerContent.slice(endBlock);
    console.log('Cleaned conditional card badges in Footer.tsx');
  }
}

if (isFooterCRLF) {
  footerContent = footerContent.split('\n').join('\r\n');
}
fs.writeFileSync(footerPath, footerContent, 'utf8');

console.log('=== COMPREHENSIVE CLEAN COMPLETED ===');
