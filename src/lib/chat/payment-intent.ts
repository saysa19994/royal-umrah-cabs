// Authoritative, Unicode-safe payment intent definitions
export const PAYMENT_INTENT_TERMS = [
  'cash', 'pay', 'payment', 'credit\\s*card', 'debit\\s*card', 'mastercard', 'visa\\s*card', 'mada\\s*card',
  'apple\\s*pay', 'stc\\s*pay', 'bank\\s*transfer', 'wire\\s*transfer', 'deposit', 'advance\\s*payment',
  'installment', 'pos\\s*terminal', 'card\\s*machine', 'card\\s*payment', 'payment\\s*method', 'how\\s+to\\s+pay',
  'bayar', 'pembayaran', 'tunai', 'kartu\\s*kredit', 'kartu\\s*debit', 'kad\\s*kredit', 'kad\\s*debit', 'transfer\\s*bank',
  'nakit', 'ödeme', 'kredi\\s*kart[ıi]', 'banka\\s*kart[ıi]', 'havale',
  'espèces', 'carte\\s*bancaire', 'carte\\s*de\\s*crédit', 'virement', 'payer', 'paiement',
  'efectivo', 'tarjeta\\s*de\\s*crédito', 'tarjeta\\s*de\\s*débito', 'transferencia', 'pagar', 'pago',
  'barzahlung', 'kreditkarte', 'kartenzahlung', 'überweisung', 'bezahlen', 'zahlung',
  'كاش', 'نقد[ااً]?', 'الدفع', 'سداد', 'بطاقة\\s*ائتمان', 'بطاقة\\s*مدى', 'بطاقة\\s*فيزا', 'شبكة\\s*مدى', 'تحويل\\s*بنكي', 'عربون', 'تقبلون\\s*بطاق[ةه]',
  'ادائیگی', 'نقدی', 'بینک\\s*ٹرانسفر', 'کریڈٹ\\s*کارڈ',
  'भुगतान', 'नकद', 'क्रेडिट\\s*कार्ड'
];

export const PAYMENT_INTENT_REGEX = new RegExp(
  '(^|[^\\p{L}\\p{N}])(' + PAYMENT_INTENT_TERMS.join('|') + ')([^\\p{L}\\p{N}]|$)',
  'iu'
);

export const LOCALIZED_PAYMENT_REPLIES: Record<string, string> = {
  en: "Payment Policy for Duyuf Alrahman VIP:\n\n• **Strictly Cash Only:** You pay the agreed fixed fare directly to your private chauffeur upon arrival at your destination after your journey is completed.\n• **Accepted Currencies:** Saudi Riyals (SAR) or US Dollars (USD).\n• **Zero Advance Prepayment:** No credit card number, deposit, or upfront fee is required to secure your booking.\n• **Excluded Payment Methods:** We do not accept credit cards, debit cards, POS terminals, online payments, or bank transfers.",
  ar: "سياسة الدفع لدى ضيوف الرحمن VIP:\n\n• **الدفع نقداً كاش فقط:** يتم سداد المبلغ المتفق عليه بالكامل مباشرةً للسائق الخاص بعد انتهاء رحلتك ووصولك إلى وجهتك بأمان.\n• **العملات المقبولة:** نقبل الريال السعودي (SAR) أو الدولار الأمريكي (USD).\n• **بدون أي دفع مسبق أو عربون:** لا نطلب أي بيانات بطاقة ائتمانية أو دفع مسبق لتأكيد الحجز.\n• **طرق الدفع غير المقبولة:** لا نقبل بطاقات الائتمان أو بطاقات الخصم أو أجهزة نقاط البيع (POS) أو الدفع الإلكتروني أو التحويلات البنكية.",
  ms: "Dasar Pembayaran Duyuf Alrahman VIP:\n\n• **Tunai Sahaja:** Bayaran penuh diserahkan terus kepada pemandu peribadi anda setelah tiba di destinasi dengan selamat.\n• **Mata Wang Diterima:** Riyal Saudi (SAR) atau Dolar AS (USD).\n• **Tanpa Bayaran Pendahuluan:** Tiada deposit, kad kredit, atau yuran pendahuluan diperlukan untuk mengesahkan tempahan.\n• **Kaedah Tidak Diterima:** Kami tidak menerima kad kredit, kad debit, terminal POS, pembayaran dalam talian, atau pindahan bank.",
  id: "Kebijakan Pembayaran Duyuf Alrahman VIP:\n\n• **Hanya Tunai Langsung ke Sopir:** Pembayaran tarif pasti dilakukan langsung kepada sopir pribadi Anda saat tiba di tujuan.\n• **Mata Uang yang Diterima:** Riyal Saudi (SAR) atau Dolar AS (USD).\n• **Tanpa Uang Muka (Zero DP):** Tidak perlu deposit atau kartu kredit untuk mengonfirmasi pemesanan.\n• **Metode yang Tidak Diterima:** Kami tidak menerima kartu kredit, kartu debit, mesin POS, pembayaran online, atau transfer bank.",
  tr: "Duyuf Alrahman VIP Ödeme Politikası:\n\n• **Yalnızca Nakit Ödeme:** Sabit ücret, varış noktanıza ulaştıktan sonra doğrudan özel şoförünüze ödenir.\n• **Kabul Edilen Para Birimleri:** Suudi Arabistan Riyali (SAR) veya ABD Doları (USD).\n• **Sıfır Ön Ödeme / Depozito:** Rezervasyonunuzu kesinleştirmek için herhangi bir kredi kartı bilgisi veya kapora talep edilmez.\n• **Kabul Edilmeyen Yöntemler:** Kredi kartı, banka kartı, POS cihazı, online ödeme veya banka havalesi kabul edilmemektedir.",
  ur: "ضیوف الرحمن VIP ادائیگی کی پالیسی:\n\n• **صرف نقد ادائیگی (Cash Only):** سفر کے اختتام پر منزل پر پہنچنے کے بعد طے شدہ کرایہ براہ راست اپنے ذاتی ڈرائیور کو نقد ادا کریں۔\n• **مقبول کرنسیاں:** سعودی ریال (SAR) یا امریکی ڈالر (USD)۔\n• **کوئی پیشگی رقم یا ایڈوانس نہیں:** بکنگ کی تصدیق کے لیے کسی ایڈوانس، کریڈٹ کارڈ یا ڈپازٹ کی ضرورت نہیں ہے۔\n• **ناقابل قبول طریقے:** کریڈٹ کارڈ، ڈیبٹ کارڈ، پی او ایس مشین، آن لائن ادائیگی یا بینک ٹرانسفر قبول نہیں کیے جاتے۔",
  fr: "Politique de Paiement Duyuf Alrahman VIP :\n\n• **Espèces Uniquement :** Vous réglez le tarif fixe convenu directement à votre chauffeur privé à votre arrivée à destination.\n• **Devises Acceptées :** Riyals Saoudiens (SAR) ou Dollars Américains (USD).\n• **Aucun Acompte Préalable :** Aucun numéro de carte, caution ou prépaiement n'est requis pour réserver.\n• **Moyens Non Acceptés :** Nous n'acceptons pas les cartes bancaires, terminaux POS, paiements en ligne ou virements bancaires.",
  es: "Política de Pago de Duyuf Alrahman VIP:\n\n• **Estrictamente en Efectivo:** El importe fijo acordado se abona directamente a su chofer privado a la llegada a su destino.\n• **Monedas Aceptadas:** Riyales Saudíes (SAR) o Dólares Estadounidenses (USD).\n• **Sin Pagos por Adelantado:** No se requiere tarjeta de crédito, fianza ni depósito para confirmar su reserva.\n• **Métodos No Aceptados:** No aceptamos tarjetas de crédito, tarjetas de débito, datáfonos (POS), pagos en línea ni transferencias bancarias.",
  de: "Zahlungsrichtlinie von Duyuf Alrahman VIP:\n\n• **Ausschließlich Barzahlung:** Der vereinbarte Festpreis wird nach Ankunft am Zielort direkt an Ihren privaten Chauffeur bezahlt.\n• **Akzeptierte Währungen:** Saudi-Riyal (SAR) oder US-Dollar (USD).\n• **Keine Anzahlung:** Es sind keine Kreditkartendaten oder Vorauszahlungen zur Buchung erforderlich.\n• **Nicht akzeptierte Methoden:** Wir akzeptieren keine Kreditkarten, Debitkarten, POS-Terminals oder Banküberweisungen.",
  hi: "Duyuf Alrahman VIP भुगतान नीति:\n\n• **केवल नकद भुगतान (Strictly Cash Only):** यात्रा पूरी होने और गंतव्य पर सुरक्षित पहुँचने के बाद तय किराया सीधे अपने निजी चौफर को नकद दें।\n• **स्वीकार्य मुद्राएं:** सऊदी रियाल (SAR) أو अमेरिकी डॉलर (USD)।\n• **शून्य अग्रिम भुगतान:** बुकिंग की पुष्टि के लिए किसी क्रेडिट कार्ड विवरण या अग्रिम जमा (deposit) की आवश्यकता नहीं है।\n• **अस्वीकृत भुगतान विधियां:** हम क्रेडिट कार्ड, डेबिट कार्ड, पीओएस टर्मिनल, ऑनलाइन भुगतान या बैंक ट्रांसफर स्वीकार नहीं करते हैं।"
};
