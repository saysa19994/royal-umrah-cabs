import fs from 'fs';
import path from 'path';

console.log('=== UPDATING TO STRICT CASH-ONLY PAYMENT POLICY ACROSS REPOSITORY ===');

// ============================================================================
// 1. UPDATE ALL 10 DICTIONARIES (FAQ Q2/A2 + PRICING + HERO + TRUST STRIP)
// ============================================================================
const DICT_DIR = 'D:/royal-umrah-cabs/src/i18n/dictionaries';

const STRICT_FAQ_Q2_A2 = {
  en: {
    q2: 'What is the accepted payment method? Do I pay the driver in cash?',
    a2: 'The only accepted payment method is cash paid directly to your private driver upon arrival at your destination for your trip. We require zero advance payment, deposit, or prepayment. The agreed fare is paid in cash in Saudi Riyals (SAR) upon completion of your journey. Credit cards, debit cards, POS terminals, and online payments are not accepted.',
  },
  ar: {
    q2: 'ما طريقة الدفع المعتمدة؟ وهل يتم الدفع نقداً للسائق؟',
    a2: 'طريقة الدفع المعتمدة الوحيدة هي الدفع نقداً مباشرةً للسائق الخاص بك عند الوصول إلى وجهتك بعد انتهاء الرحلة. لا نطلب أي دفع مسبق أو عربون، ويتم سداد قيمة الرحلة المتفق عليها نقداً بالريال السعودي للسائق. لا تتوفر أجهزة دفع بالبطاقات أو الدفع الإلكتروني.',
  },
  ms: {
    q2: 'Apakah kaedah pembayaran yang diterima? Adakah saya membayar secara tunai kepada pemandu?',
    a2: 'Satu-satunya kaedah pembayaran yang diterima adalah tunai yang dibayar terus kepada pemandu peribadi anda setibanya di destinasi selepas perjalanan anda. Kami tidak mengenakan sebarang bayaran pendahuluan, deposit, atau bayaran awal. Tambang yang dipersetujui dibayar secara tunai dalam Riyal Saudi (SAR) setelah selesai perjalanan. Pembayaran kad dan terminal POS tidak diterima.',
  },
  id: {
    q2: 'Apa metode pembayaran yang berlaku? Apakah saya membayar tunai ke sopir?',
    a2: 'Satu-satunya metode pembayaran yang diterima adalah tunai yang dibayarkan langsung kepada sopir privat Anda saat tiba di tujuan setelah perjalanan selesai. Kami tidak meminta uang muka (DP), deposit, atau pembayaran di awal. Tarif yang disepakati dibayarkan secara tunai dalam Riyal Saudi (SAR) kepada sopir. Pembayaran dengan kartu dan mesin POS tidak tersedia.',
  },
  ur: {
    q2: 'ادائیگی کا کیا طریقہ کار ہے؟ کیا ڈرائیور کو نقد ادائیگی کی جاتی ہے؟',
    a2: 'ادائیگی کا واحد منظور شدہ طریقہ سفر مکمل ہونے پر منزل پر پہنچ کر براہِ راست آپ کے ذاتی ڈرائیور کو نقد ادائیگی کرنا ہے۔ ہم کسی قسم کی پیشگی رقم، بیعانہ یا ایڈوانس نہیں لیتے۔ طے شدہ کرایہ سفر کے اختتام پر ڈرائیور کو سعودی ریال (SAR) میں نقد ادا کیا جاتا ہے۔ کارڈ یا پی او ایس مشین کے ذریعے ادائیگی دستیاب نہیں ہے۔',
  },
  fr: {
    q2: 'Quel est le mode de paiement accepté ? Dois-je payer le chauffeur en espèces ?',
    a2: "Le seul mode de paiement accepté est le règlement en espèces effectué directement auprès de votre chauffeur privé à l'arrivée à votre destination pour votre trajet. Nous n'exigeons aucun paiement d'avance, acompte ou caution. Le tarif convenu est payé en espèces en Riyals saoudiens (SAR) à la fin de votre voyage. Les paiements par carte bancaire ou terminal TPE ne sont pas acceptés.",
  },
  es: {
    q2: '¿Cuál es el método de pago aceptado? ¿Debo pagar al chofer en efectivo?',
    a2: 'El único método de pago aceptado es en efectivo pagado directamente a su chofer privado a la llegada a su destino para su viaje. No requerimos ningún pago por adelantado, anticipo ni depósito. La tarifa acordada se abona en efectivo en Riyales Saudíes (SAR) al finalizar el trayecto. No se aceptan tarjetas bancarias ni terminales TPV.',
  },
  de: {
    q2: 'Welche Zahlungsmethode wird akzeptiert? Zahle ich den Fahrer in bar?',
    a2: 'Die einzige akzeptierte Zahlungsmethode ist die Barzahlung direkt bei Ihrem privaten Chauffeur nach Ankunft am Zielort für Ihre Fahrt. Wir verlangen keinerlei Anzahlung, Kaution oder Vorauszahlung. Der vereinbarte Fahrpreis wird am Ende der Reise in bar in Saudi-Riyal (SAR) an den Fahrer entrichtet. Kartenzahlungen und POS-Terminals werden nicht akzeptiert.',
  },
  hi: {
    q2: 'स्वीकृत भुगतान विधि क्या है? क्या मुझे ड्राइवर को नकद भुगतान करना होगा?',
    a2: 'स्वीकृत एकमात्र भुगतान विधि आपकी यात्रा के लिए गंतव्य पर पहुँचने के बाद सीधे आपके निजी ड्राइवर को नकद भुगतान करना है। हम किसी भी प्रकार का अग्रिम भुगतान, बयाना या जमा राशि नहीं मांगते हैं। तय किया गया किराया यात्रा पूरी होने पर सीधे ड्राइवर को सऊदी रियाल (SAR) में नकद चुकाया जाता है। कार्ड या पीओएस मशीन द्वारा भुगतान स्वीकार नहीं किया जाता है।',
  },
  tr: {
    q2: 'Geçerli ödeme yöntemi nedir? Şoföre nakit mi ödeme yapacağım?',
    a2: 'Kabul edilen tek ödeme yöntemi, yolculuğunuzun sonunda varış noktanıza ulaştığınızda doğrudan özel şoförünüze yapılan nakit ödemedir. Önceden hiçbir ön ödeme, kapora veya depozito talep etmiyoruz. Anlaşılan net ücret, yolculuk tamamlandığında şoföre Suudi Arabistan Riyali (SAR) cinsinden nakit olarak ödenir. Kart veya POS cihazı ile ödeme kabul edilmemektedir.',
  },
};

const NOTE2_PRICING = {
  en: 'Payment is made strictly in cash paid directly to your chauffeur upon arrival.',
  ar: 'يتم سداد قيمة الرحلة نقداً فقط مباشرة للسائق عند الوصول بعد انتهاء الرحلة.',
  ms: 'Bayaran dibuat secara tunai sepenuhnya terus kepada pemandu anda semasa tiba di destinasi.',
  id: 'Pembayaran dilakukan secara tunai sepenuhnya langsung kepada sopir Anda saat tiba di tujuan.',
  ur: 'ادائیگی مکمل طور پر نقد منزل پر پہنچ کر براہِ راست آپ کے ڈرائیور کو کی جاتی ہے۔',
  fr: "Le paiement s'effectue exclusivement en espèces directement auprès de votre chauffeur à l'arrivée.",
  es: 'El pago se realiza exclusivamente en efectivo directamente a su chofer a la llegada.',
  de: 'Die Bezahlung erfolgt ausschließlich in bar direkt bei Ihrem Chauffeur nach Ankunft.',
  hi: 'भुगतान आगमन पर पूरी तरह से नकद में सीधे आपके ड्राइवर को किया जाता है।',
  tr: 'Ödeme, varış noktasında doğrudan şoförünüze tamamen nakit olarak yapılır.',
};

const PAY_ON_ARRIVAL_STRIP = {
  en: 'Pay Upon Arrival (Cash to Driver)',
  ar: 'الدفع عند الوصول (نقداً للسائق)',
  ms: 'Bayar Semasa Tiba (Tunai)',
  id: 'Bayar Saat Tiba (Tunai)',
  ur: 'آمد پر ادائیگی (نقد ڈرائیور کو)',
  fr: "Paiement à l'arrivée (Espèces)",
  es: 'Pago a la llegada (Efectivo)',
  de: 'Zahlung bei Ankunft (Bar)',
  hi: 'आगमन पर भुगतान (नकद)',
  tr: 'Varışta Ödeme (Nakit)',
};

const PAY_ON_ARRIVAL_NOTICE = {
  en: 'No advance payment required · Pay cash directly to your driver upon arrival',
  ar: 'لا يلزم دفع أي مقدم · الدفع نقداً مباشرة للسائق عند الوصول',
  ms: 'Tiada bayaran pendahuluan diperlukan · Bayar tunai terus kepada pemandu semasa tiba',
  id: 'Tanpa uang muka · Bayar tunai langsung ke sopir saat tiba',
  ur: 'پیشگی رقم کی ضرورت نہیں · آمد پر براہ راست ڈرائیور کو نقد ادائیگی',
  fr: "Aucun paiement d'avance requis · Paiement en espèces directement au chauffeur à l'arrivée",
  es: 'Sin pagos por adelantado · Pago en efectivo directamente al chofer a la llegada',
  de: 'Keine Anzahlung erforderlich · Zahlung in bar direkt beim Fahrer bei Ankunft',
  hi: 'कोई अग्रिम भुगतान आवश्यक नहीं · आगमन पर सीधे ड्राइवर को नकद भुगतान करें',
  tr: 'Ön ödeme gerekmez · Varışta şoföre doğrudan nakit ödeme yapın',
};

const locales = ['en', 'ar', 'ms', 'fr', 'es', 'id', 'hi', 'de', 'ur', 'tr'];

for (const loc of locales) {
  const filePath = path.join(DICT_DIR, `${loc}.json`);
  const dict = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Update FAQ Q2 & A2
  if (dict.faq) {
    dict.faq.q2 = STRICT_FAQ_Q2_A2[loc].q2;
    dict.faq.a2 = STRICT_FAQ_Q2_A2[loc].a2;
  }

  // Update page_pricing.note2
  if (dict.page_pricing) {
    dict.page_pricing.note2 = NOTE2_PRICING[loc];
    if (loc === 'tr' && dict.page_pricing.note4) {
      dict.page_pricing.note4 = 'Ödemenizi transfer sonunda doğrudan şoförünüze nakit olarak yapabilirsiniz.';
    }
  }

  // Update trust_strip.payOnArrival
  if (dict.trust_strip) {
    dict.trust_strip.payOnArrival = PAY_ON_ARRIVAL_STRIP[loc];
  }

  // Update hero.payOnArrivalNotice & noPrepayNotice
  if (dict.hero) {
    dict.hero.payOnArrivalNotice = PAY_ON_ARRIVAL_NOTICE[loc];
    if (dict.hero.noPrepayNotice) {
      if (loc === 'tr') dict.hero.noPrepayNotice = 'Nakit ödeme. Rezervasyon anında onaylanır.';
      else if (loc === 'ar') dict.hero.noPrepayNotice = 'الدفع نقداً للسائق. الحجز يتأكد فوراً.';
      else dict.hero.noPrepayNotice = 'Cash payment to driver. Instant booking confirmation.';
    }
  }

  // Update guide_malaysia.section4Desc if present
  if (dict.guide_malaysia && dict.guide_malaysia.section4Desc) {
    if (loc === 'ar') {
      dict.guide_malaysia.section4Desc = 'أسعار ثابتة ومعلنة دون أي رسوم خفية. لا نطلب أي عربون مسبق، والدفع مباشرة للسائق عند الوصول نقداً.';
    } else if (loc === 'en') {
      dict.guide_malaysia.section4Desc = 'Transparent guaranteed fixed pricing with no hidden charges. No upfront deposit required; pay cash directly to your driver upon arrival.';
    } else if (loc === 'ms') {
      dict.guide_malaysia.section4Desc = 'Harga tetap dijamin telus tanpa caj tersembunyi. Tiada deposit pendahuluan; bayar tunai terus kepada pemandu semasa tiba.';
    } else if (loc === 'id') {
      dict.guide_malaysia.section4Desc = 'Tarif pasti transparan tanpa biaya tersembunyi. Tanpa uang muka; bayar tunai langsung ke sopir saat tiba.';
    } else if (loc === 'tr') {
      dict.guide_malaysia.section4Desc = 'Gizli masraf olmadan şeffaf sabit fiyatlar. Ön ödeme gerekmez; varışta doğrudan şoförünüze nakit ödeme yapın.';
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(dict, null, 2) + '\n', 'utf8');
  console.log(`Updated dictionary ${loc}.json with strict cash policy`);
}

// ============================================================================
// 2. UPDATE src/app/[locale]/booking/page.tsx PAGE_TEXT
// ============================================================================
const bookingPagePath = 'D:/royal-umrah-cabs/src/app/[locale]/booking/page.tsx';
let bookingCode = fs.readFileSync(bookingPagePath, 'utf8');

const STRICT_PAGE_TEXT = `const PAGE_TEXT: Record<Locale, { badge: string; title: string; subtitle: string }> = {
  en: {
    badge: 'Direct VIP Chauffeur Reservation',
    title: 'Reserve Your Private Chauffeur',
    subtitle:
      'Guaranteed fixed fares. Pay directly to your driver upon arrival in cash (SAR) — zero advance payment or deposit required.',
  },
  ar: {
    badge: 'حجز مباشر لسائق VIP خاص',
    title: 'احجز رحلتك الخاصة وسائقك الشخصي',
    subtitle:
      'أسعار ثابتة ومحددة بدقة. الدفع نقداً مباشرة للسائق عند الوصول (بالريال السعودي) — لا يلزم أي دفع مسبق أو عربون.',
  },
  fr: {
    badge: 'Réservation Directe de Chauffeur VIP',
    title: 'Réservez Votre Chauffeur Privé',
    subtitle:
      "Tarifs fixes garantis. Paiement direct au chauffeur à l'arrivée en espèces (SAR) — aucun paiement d'avance ni caution requis.",
  },
  es: {
    badge: 'Reserva Directa de Chofer VIP',
    title: 'Reserve Su Chofer Privado',
    subtitle:
      'Tarifas fijas garantizadas. Pago directo al chofer a la llegada en efectivo (SAR) — sin pagos por adelantado ni depósitos.',
  },
  id: {
    badge: 'Pemesanan Langsung Sopir VIP',
    title: 'Pesan Sopir Privat Anda',
    subtitle:
      'Tarif pasti transparan. Bayar tunai langsung ke sopir saat tiba (SAR) — tanpa uang muka atau deposit sama sekali.',
  },
  hi: {
    badge: 'सीधा वीआईपी चौफर आरक्षण',
    title: 'अपना निजी चौफर बुक करें',
    subtitle:
      'निश्चित गारंटीकृत किराया। पहुंचने पर सीधे ड्राइवर को नकद (SAR) भुगतान करें — कोई अग्रिम भुगतान या जमा राशि आवश्यक नहीं है।',
  },
  de: {
    badge: 'Direkte VIP-Chauffeur-Reservierung',
    title: 'Reservieren Sie Ihren Privatchauffeur',
    subtitle:
      'Garantierte Festpreise. Zahlung direkt beim Fahrer bei Ankunft in bar (SAR) — keinerlei Vorauszahlung oder Kaution erforderlich.',
  },
  ur: {
    badge: 'براہ راست وی آئی پی ڈرائیور بکنگ',
    title: 'اپنا پرائیویٹ ڈرائیور بک کریں',
    subtitle:
      'طے شدہ اور شفاف کرائے۔ آمد پر ڈرائیور کو نقد (سعودی ریال) براہ راست ادائیگی — کسی پیشگی رقم یا ایڈوانس کی قطعاً ضرورت نہیں۔',
  },
  ms: {
    badge: 'Tempahan Terus Pemandu VIP',
    title: 'Tempah Pemandu Peribadi Anda',
    subtitle:
      'Kadar tetap terjamin. Bayar tunai terus kepada pemandu semasa tiba (SAR) — tiada bayaran pendahuluan atau deposit diperlukan.',
  },
  tr: {
    badge: 'Doğrudan VIP Şoför Rezervasyonu',
    title: 'Özel Şoförünüzü Ayırtın',
    subtitle:
      'Garantili sabit fiyatlar. Varışta şoföre doğrudan nakit (SAR) ödeme yapın — ön ödeme veya depozito gerekmez.',
  },
};`;

bookingCode = bookingCode.replace(
  /const PAGE_TEXT: Record<Locale,[\s\S]*?^};/m,
  STRICT_PAGE_TEXT
);
fs.writeFileSync(bookingPagePath, bookingCode, 'utf8');
console.log('Updated booking/page.tsx with strict cash policy across all 10 locales');

// ============================================================================
// 3. UPDATE src/components/booking/BookingEngine.tsx
// ============================================================================
const enginePath = 'D:/royal-umrah-cabs/src/components/booking/BookingEngine.tsx';
let engineCode = fs.readFileSync(enginePath, 'utf8');

// Replace all summaryPaymentValue: '... (Cash / Card) ...' with '... (Cash) ...'
engineCode = engineCode.replace(/summaryPaymentValue: 'Pay Directly to Driver \(Cash \/ Card\)'/g, "summaryPaymentValue: 'Pay Cash Directly to Driver'");
engineCode = engineCode.replace(/summaryPaymentValue: 'الدفع للسائق عند الوصول \(نقداً \/ بطاقة\)'/g, "summaryPaymentValue: 'الدفع نقداً مباشرة للسائق عند الوصول'");
engineCode = engineCode.replace(/summaryPaymentValue: 'Paiement au chauffeur à l’arrivée \(Espèces \/ Carte\)'/g, "summaryPaymentValue: 'Paiement en espèces au chauffeur à l’arrivée'");
engineCode = engineCode.replace(/summaryPaymentValue: 'Pago al chofer a la llegada \(Efectivo \/ Tarjeta\)'/g, "summaryPaymentValue: 'Pago en efectivo al chofer a la llegada'");
engineCode = engineCode.replace(/summaryPaymentValue: 'Bayar Langsung ke Sopir Saat Tiba \(Tunai \/ Kartu\)'/g, "summaryPaymentValue: 'Bayar Tunai Langsung ke Sopir Saat Tiba'");
engineCode = engineCode.replace(/summaryPaymentValue: 'پہنچنے پر ڈرائیور کو ادائیگی \(نقد \/ کارڈ\)'/g, "summaryPaymentValue: 'پہنچنے پر ڈرائیور کو نقد ادائیگی'");
engineCode = engineCode.replace(/summaryPaymentValue: 'Zahlung beim Fahrer bei Ankunft \(Bar \/ Karte\)'/g, "summaryPaymentValue: 'Zahlung beim Fahrer bei Ankunft (Bar)'");
engineCode = engineCode.replace(/summaryPaymentValue: 'आगमन पर ड्राइवर को सीधे भुगतान \(नकद \/ कार्ड\)'/g, "summaryPaymentValue: 'आगमन पर ड्राइवर को सीधे नकद भुगतान'");
engineCode = engineCode.replace(/summaryPaymentValue: 'Bayar Terus kepada Pemandu Semasa Tiba \(Tunai \/ Kad\)'/g, "summaryPaymentValue: 'Bayar Tunai Terus kepada Pemandu Semasa Tiba'");
engineCode = engineCode.replace(/summaryPaymentValue: 'Varışta Şoföre Ödeme \(Nakit \/ Kart\)'/g, "summaryPaymentValue: 'Varışta Şoföre Doğrudan Nakit Ödeme'");

// Replace all paymentDesc descriptions in BookingEngine
engineCode = engineCode.replace(
  /'Payment is made directly to your private chauffeur upon arrival at your destination\. You may pay in cash \(SAR\) or by bank card[\s\S]*?booking\.'/,
  "'Payment is made strictly in cash paid directly to your private chauffeur upon arrival at your destination for your trip. No advance payment, deposit, or prepayment is required to secure this booking.'"
);
engineCode = engineCode.replace(
  /'يتم سداد المبلغ كاملاً مباشرة للسائق الخاص عند الوصول إلى وجهتك بأمان\. يمكنك الدفع نقداً \(بالريال السعودي\) أو عبر بطاقات[\s\S]*?عربون\.'/,
  "'يتم سداد قيمة الرحلة بالكامل نقداً مباشرة للسائق الخاص عند الوصول إلى وجهتك بأمان. لا يلزم أي دفع مسبق أو عربون لتأكيد الحجز.'"
);
engineCode = engineCode.replace(
  /'Le paiement est effectué directement auprès de votre chauffeur privé à votre arrivée à destination\. Vous pouvez régler en espèces \(SAR\) ou par carte[\s\S]*?réservation\.'/,
  "'Le paiement s’effectue exclusivement en espèces directement auprès de votre chauffeur privé à votre arrivée à destination pour votre trajet. Aucun acompte ni prépaiement n’est requis pour valider cette réservation.'"
);
engineCode = engineCode.replace(
  /'El pago se realiza directamente a su chofer privado a la llegada a su destino\. Puede abonar en efectivo \(SAR\) o con tarjeta[\s\S]*?reserva\.'/,
  "'El pago se realiza exclusivamente en efectivo directamente a su chofer privado a la llegada a su destino. No se requiere ningún anticipo ni pago previo para confirmar esta reserva.'"
);
engineCode = engineCode.replace(
  /'Pembayaran dilakukan langsung ke sopir privat Anda saat tiba di tujuan\. Anda dapat membayar tunai \(SAR\) atau kartu[\s\S]*?ini\.'/,
  "'Pembayaran dilakukan secara tunai langsung kepada sopir privat Anda saat tiba di tujuan perjalanan. Tidak diperlukan uang muka (DP) atau pembayaran di awal untuk mengonfirmasi pemesanan ini.'"
);
engineCode = engineCode.replace(
  /'ادائیگی مکمل طور پر پہنچنے کے بعد براہِ راست آپ کے ذاتی ڈرائیور کو کی جاتی ہے۔ آپ نقد \(سعودی ریال\) یا کارڈ[\s\S]*?نہیں ہے۔'/,
  "'ادائیگی مکمل طور پر نقد منزل پر پہنچنے کے بعد براہِ راست آپ کے ذاتی ڈرائیور کو کی جاتی ہے۔ بکنگ کی تصدیق کے لیے کسی قسم کی پیشگی رقم یا بیعانہ درکار نہیں ہے۔'"
);
engineCode = engineCode.replace(
  /'Die Bezahlung erfolgt direkt bei Ihrem privaten Chauffeur nach Ankunft am Zielort\. Sie können in bar \(SAR\) oder per Karte[\s\S]*?erforderlich\.'/,
  "'Die Bezahlung erfolgt ausschließlich in bar direkt bei Ihrem privaten Chauffeur nach Ankunft am Zielort für Ihre Fahrt. Es ist keinerlei Vorauszahlung oder Kaution erforderlich.'"
);
engineCode = engineCode.replace(
  /'भुगतान गंतव्य पर पहुंचने पर सीधे आपके निजी चौफर को किया जाता है। आप नकद \(SAR\) या कार्ड[\s\S]*?है।'/u,
  "'भुगतान यात्रा के लिए गंतव्य पर पहुँचने पर पूरी तरह से नकद सीधे आपके निजी ड्राइवर को किया जाता है। इस बुकिंग के लिए किसी अग्रिम भुगतान की आवश्यकता नहीं है।'"
);
engineCode = engineCode.replace(
  /'Bayaran dibuat terus kepada pemandu peribadi anda semasa tiba di destinasi\. Anda boleh membayar secara tunai \(SAR\) atau kad[\s\S]*?ini\.'/,
  "'Bayaran dibuat secara tunai sepenuhnya terus kepada pemandu peribadi anda semasa tiba di destinasi perjalanan anda. Tiada bayaran pendahuluan atau deposit diperlukan untuk mengesahkan tempahan ini.'"
);
engineCode = engineCode.replace(
  /'Ödeme varış noktanıza ulaştığınızda doğrudan özel şoförünüze yapılır\. Ödemenizi nakit \(SAR\) veya şofördeki kart[\s\S]*?gerekmez\.'/,
  "'Ödeme, yolculuğunuz için varış noktanıza ulaştığınızda tamamen nakit olarak doğrudan özel şoförünüze yapılır. Bu rezervasyonu onaylamak için hiçbir ön ödeme veya kapora gerekmez.'"
);

fs.writeFileSync(enginePath, engineCode, 'utf8');
console.log('Updated BookingEngine.tsx with strict cash policy');

// ============================================================================
// 4. UPDATE src/components/home/HomeSections.tsx
// ============================================================================
const homePath = 'D:/royal-umrah-cabs/src/components/home/HomeSections.tsx';
let homeCode = fs.readFileSync(homePath, 'utf8');

homeCode = homeCode.replace(
  "نقداً أو بالبطاقة.",
  "نقداً للسائق مباشرة."
);
homeCode = homeCode.replace(
  "لا نطلب بطاقة ائتمان مسبقاً؛ ادفع لسائقك نقداً أو بالبطاقة البنكية عند الوصول سالماً.",
  "لا نطلب أي دفع مسبق؛ ادفع لسائقك نقداً عند الوصول سالماً."
);
homeCode = homeCode.replace(
  "No credit card needed in advance; pay your chauffeur via cash or card upon safe arrival.",
  "No advance payment needed; pay your chauffeur in cash upon safe arrival."
);

fs.writeFileSync(homePath, homeCode, 'utf8');
console.log('Updated HomeSections.tsx with strict cash policy');

// ============================================================================
// 5. UPDATE src/components/layout/Footer.tsx
// ============================================================================
const footerPath = 'D:/royal-umrah-cabs/src/components/layout/Footer.tsx';
let footerCode = fs.readFileSync(footerPath, 'utf8');

footerCode = footerCode.replace(
  "<span>{locale === 'ar' ? 'الدفع نقداً للسائق عند الوصول (SAR / USD)' : 'Cash to Chauffeur on Arrival (SAR / USD)'}</span>",
  "<span>{locale === 'ar' ? 'الدفع نقداً للسائق عند الوصول (ريال سعودي)' : 'Cash Paid Directly to Chauffeur on Arrival (SAR)'}</span>"
);
footerCode = footerCode.replace(
  "لا نطلب أية بطاقة ائتمانية أو دفعة مقدمة قبل وصولك واستلام سيارتك.",
  "لا نطلب أية دفعة مقدمة قبل وصولك واستلام سيارتك؛ الدفع نقداً للسائق."
);
footerCode = footerCode.replace(
  "Zero upfront credit card deposit required. Inspect your vehicle first.",
  "Zero upfront deposit required. Pay your driver in cash upon arrival."
);

fs.writeFileSync(footerPath, footerCode, 'utf8');
console.log('Updated Footer.tsx with strict cash policy');

// ============================================================================
// 6. UPDATE src/components/seo/JsonLd.tsx
// ============================================================================
const jsonLdPath = 'D:/royal-umrah-cabs/src/components/seo/JsonLd.tsx';
let jsonLdCode = fs.readFileSync(jsonLdPath, 'utf8');

jsonLdCode = jsonLdCode.replace(
  "currenciesAccepted: 'SAR, USD, EUR, GBP, MYR, IDR, INR, PKR, EGP',",
  "currenciesAccepted: 'SAR',"
);
jsonLdCode = jsonLdCode.replace(
  "paymentAccepted: 'Cash, Pay Upon Arrival, Bank Transfer',",
  "paymentAccepted: 'Cash, Pay Upon Arrival',"
);

fs.writeFileSync(jsonLdPath, jsonLdCode, 'utf8');
console.log('Updated JsonLd.tsx with strict cash paymentAccepted');

// ============================================================================
// 7. UPDATE src/components/faq/FaqSection.tsx Trust Badges
// ============================================================================
const faqSectionPath = 'D:/royal-umrah-cabs/src/components/faq/FaqSection.tsx';
let faqSectionCode = fs.readFileSync(faqSectionPath, 'utf8');

faqSectionCode = faqSectionCode.replace(
  "{locale === 'ar' ? 'دفع عند الوصول' : 'Pay Upon Arrival'}",
  "{locale === 'ar' ? 'دفع نقداً عند الوصول' : 'Cash Upon Arrival'}"
);
faqSectionCode = faqSectionCode.replace(
  "{locale === 'ar' ? 'بدون أي عربون أو دفع مسبق' : 'Zero advance deposit required'}",
  "{locale === 'ar' ? 'الدفع نقداً للسائق مباشرة' : 'Pay cash directly to driver'}"
);

fs.writeFileSync(faqSectionPath, faqSectionCode, 'utf8');
console.log('Updated FaqSection.tsx trust badge to Cash Upon Arrival');

// ============================================================================
// 8. UPDATE src/data/faqs-master.ts
// ============================================================================
const faqsMasterPath = 'D:/royal-umrah-cabs/src/data/faqs-master.ts';
let faqsMasterCode = fs.readFileSync(faqsMasterPath, 'utf8');

faqsMasterCode = faqsMasterCode.replace(
  /answerEn:\s*'We operate on a zero-advance-deposit policy\. You pay your chauffeur upon arrival at your hotel in Saudi Riyals \(cash\) or with major debit\/credit cards[\s\S]*?machine in the vehicle \[needs owner confirmation\]\.',/,
  "answerEn: 'The only accepted payment method is cash paid directly to your private driver upon arrival at your destination for your trip. We operate on a zero-advance-deposit policy, and no prepayment is required.',"
);
faqsMasterCode = faqsMasterCode.replace(
  /answerAr:\s*'نعتمد سياسة عدم طلب أي عربون مسبق\. بإمكانك سداد قيمة الرحلة كاملة نقداً بالريال السعودي أو بالبطاقات البنكية[\s\S]*?جهاز الدفع الإلكتروني \[تحت تأكيد المالك\]\.',/,
  "answerAr: 'طريقة الدفع المعتمدة الوحيدة هي الدفع نقداً فقط مباشرةً للسائق الخاص بك عند الوصول إلى وجهتك بعد انتهاء الرحلة. نعتمد سياسة عدم طلب أي عربون أو دفع مسبق.',"
);

fs.writeFileSync(faqsMasterPath, faqsMasterCode, 'utf8');
console.log('Updated faqs-master.ts with strict cash policy');

// ============================================================================
// 9. UPDATE src/lib/chat/knowledge-base.ts
// ============================================================================
const kbPath = 'D:/royal-umrah-cabs/src/lib/chat/knowledge-base.ts';
let kbCode = fs.readFileSync(kbPath, 'utf8');

kbCode = kbCode.replace(
  "- Payment: Zero upfront deposit. Pay chauffeur upon safe arrival (Cash in SAR, or Visa/Mastercard/Mada via in-car POS).",
  "- Payment: Zero upfront deposit. The only accepted payment method is cash paid directly to your driver upon arrival (Saudi Riyals - SAR). Credit cards, debit cards, POS terminals, and online payments are not accepted."
);

fs.writeFileSync(kbPath, kbCode, 'utf8');
console.log('Updated knowledge-base.ts with strict cash policy');

// ============================================================================
// 10. UPDATE src/app/[locale]/guides/malaysia-umrah-transport/page.tsx
// ============================================================================
const guidePath = 'D:/royal-umrah-cabs/src/app/[locale]/guides/malaysia-umrah-transport/page.tsx';
let guideCode = fs.readFileSync(guidePath, 'utf8');

guideCode = guideCode.replace(
  ": 'Do we need to pay a prepayment or credit card deposit?',",
  ": 'Do we need to pay a prepayment or deposit in advance?',"
);
guideCode = guideCode.replace(
  "? 'لا يلزم أي دفع مسبق. الدفع يتم مباشرة للسائق عند الوصول نقداً أو بالبطاقة.'",
  "? 'لا يلزم أي دفع مسبق. الدفع يتم نقداً مباشرة للسائق عند الوصول.'"
);
guideCode = guideCode.replace(
  ": 'No advance payment or card deposit is required. You settle the full fare directly with your chauffeur upon arrival at your hotel.'",
  ": 'No advance payment or deposit is required. You settle the full fare strictly in cash directly with your chauffeur upon arrival at your hotel.'"
);

fs.writeFileSync(guidePath, guideCode, 'utf8');
console.log('Updated malaysia-umrah-transport/page.tsx with strict cash policy');

console.log('\n=== ALL FILES UPDATED TO STRICT CASH POLICY SUCCESSFULLY ===');
