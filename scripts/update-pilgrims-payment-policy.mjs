import fs from 'fs';
import path from 'path';

const filePath = 'D:/royal-umrah-cabs/src/data/pilgrims.ts';
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  // ID
  [
    "'Indonesian pilgrims can settle fares directly upon arrival at their hotel in Saudi Riyal (SAR), Indonesian Rupiah (IDR equivalent), or credit/debit card.'",
    "'Indonesian pilgrims settle fares directly upon arrival at their hotel in cash (Saudi Riyals - SAR or US Dollars - USD). Cards and bank transfers are not accepted.'"
  ],
  [
    "'Jamaah Indonesia dapat membayar ongkos langsung saat tiba di hotel dalam Riyal (SAR) tunai, transfer Rupiah, atau kartu.'",
    "'Jamaah Indonesia membayar ongkos langsung saat tiba di hotel secara tunai dalam Saudi Riyal (SAR) atau Dolar AS (USD). Kartu dan transfer bank tidak diterima.'"
  ],
  [
    "paymentAndCurrencyEn: 'Fixed fares displayed in Saudi Riyals (SAR) and Indonesian Rupiah (IDR). No credit card deposit needed.',",
    "paymentAndCurrencyEn: 'Fixed fares displayed in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',"
  ],
  [
    "paymentAndCurrencyNative: 'Tarif tetap transparan dalam Saudi Riyal (SAR) dan estimasi Rupiah (IDR). Tanpa uang muka.',",
    "paymentAndCurrencyNative: 'Tarif tetap transparan dalam Saudi Riyal (SAR). Tanpa uang muka. Bayar tunai saat tiba (SAR atau USD).',"
  ],

  // MY
  [
    "'Payment: Ringgit (MYR transfer) or Saudi Riyal (SAR cash/card) accepted upon arrival at your hotel.'",
    "'Payment: Cash paid directly to your chauffeur upon arrival in Saudi Riyals (SAR) or US Dollars (USD). Cards and bank transfers are not accepted.'"
  ],
  [
    "'Pembayaran: Bayaran dibuat terus kepada pemandu setibanya di hotel dalam SAR atau kad debit/kredit tanpa caj tersembunyi.'",
    "'Pembayaran: Bayaran dibuat secara tunai terus kepada pemandu setibanya di hotel dalam SAR atau USD. Kad dan pindahan bank tidak diterima.'"
  ],
  [
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR) and Malaysian Ringgit (MYR). Zero credit card pre-auth needed.',",
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',"
  ],
  [
    "paymentAndCurrencyNative: 'Kadar tambang tetap dalam Saudi Riyal (SAR) dan anggaran Ringgit Malaysia (MYR). Tanpa deposit kad.',",
    "paymentAndCurrencyNative: 'Kadar tambang tetap dalam Saudi Riyal (SAR). Tanpa sebarang deposit. Bayar tunai semasa tiba (SAR atau USD).',"
  ],

  // PK
  [
    "'Zero advance payment required: Pay your chauffeur upon reaching your hotel in Saudi Riyals (cash or card).'",
    "'Zero advance payment required: Pay your chauffeur upon reaching your hotel strictly in cash (SAR or USD). Cards are not accepted.'"
  ],
  [
    "paymentAndCurrencyEn: 'Guaranteed fixed fares in Saudi Riyals (SAR) with Pakistani Rupee (PKR) estimates. No credit card required.',",
    "paymentAndCurrencyEn: 'Guaranteed fixed fares in Saudi Riyals (SAR). No advance payment. Cash upon arrival (SAR or USD).',"
  ],
  [
    "paymentAndCurrencyNative: 'سعودی ریال (SAR) میں پہلے سے طے شدہ فکسڈ کرایہ۔ بغیر کسی ایڈوانس کارڈ کی کٹوتی کے۔',",
    "paymentAndCurrencyNative: 'سعودی ریال (SAR) میں فکسڈ کرایہ۔ پیشگی ادائیگی کے بغیر۔ آمد پر نقد ادائیگی (سعودی ریال یا امریکی ڈالر)۔',"
  ],

  // IN
  [
    "'Transparent payment: settle directly in SAR cash, international credit/debit card, or bank transfer upon arriving at your hotel.'",
    "'Transparent payment: settle directly in cash (SAR or USD) upon arriving at your hotel. Cards and bank transfers are not accepted.'"
  ],
  [
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR) with Indian Rupee (INR) reference rates. Zero card pre-authorizations.',",
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',"
  ],
  [
    "paymentAndCurrencyNative: 'सऊदी रियाल (SAR) में तयशुदा किराया, बिना किसी अग्रिम कटौती के।',",
    "paymentAndCurrencyNative: 'सऊदी रियाल (SAR) में तयशुदा किराया। कोई अग्रिम भुगतान नहीं। आगमन पर नकद भुगतान (SAR या USD)।',"
  ],

  // UK
  [
    "'Zero advance credit card charge: Settle your fixed fare on arrival at your hotel using GBP card (Mastercard/Visa) or SAR cash.'",
    "'Zero advance deposit: Settle your fixed fare on arrival at your hotel strictly in cash (Saudi Riyals - SAR or US Dollars - USD). Cards are not accepted.'"
  ],
  [
    "paymentAndCurrencyEn: 'Fixed fares quoted in SAR with British Pound (£) estimates. Pay on arrival by card or cash.',",
    "paymentAndCurrencyEn: 'Fixed fares quoted in SAR. Zero advance deposit. Pay cash on arrival (SAR or USD).',"
  ],
  [
    "paymentAndCurrencyNative: 'Fixed fares quoted in SAR with British Pound (£) estimates. Pay on arrival by card or cash.',",
    "paymentAndCurrencyNative: 'Fixed fares quoted in SAR. Zero advance deposit. Pay cash on arrival (SAR or USD).',"
  ],
  [
    "q: 'Can we pay with a UK debit card (Monzo, Revolut, Barclays, HSBC)?',",
    "q: 'What payment methods are accepted upon arrival?',"
  ],
  [
    "a: 'Yes, our chauffeurs carry wireless card terminals that accept contactless, Chip & PIN Visa and Mastercard with zero foreign surcharge.',",
    "a: 'We accept cash payments only, paid directly to your chauffeur upon arrival in Saudi Riyals (SAR) or US Dollars (USD). We do not accept debit cards, credit cards, POS terminals, online payments, or bank transfers.',"
  ],

  // US
  [
    "'Pay on arrival in USD cash or with major US credit cards (Visa, Mastercard, Amex via Apple Pay).'",
    "'Pay on arrival in cash directly to your driver (USD or SAR). Credit cards, POS terminals, and online payments are not accepted.'"
  ],
  [
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR) and US Dollars ($). Zero advance deposit or credit card pre-authorization.',",
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR) and US Dollars (USD). Zero advance deposit. Cash only to driver on arrival.',"
  ],
  [
    "paymentAndCurrencyNative: 'Fixed fares in Saudi Riyals (SAR) and US Dollars ($). Zero advance deposit or credit card pre-authorization.',",
    "paymentAndCurrencyNative: 'Fixed fares in Saudi Riyals (SAR) and US Dollars (USD). Zero advance deposit. Cash only to driver on arrival.',"
  ],
  [
    "q: 'Can we pay with a US credit card upon arrival?',",
    "q: 'Can we pay in US Dollars upon arrival?',"
  ],
  [
    "a: 'Yes, our drivers carry portable contactless POS terminals that support US Visa, Mastercard, and Apple Pay.',",
    "a: 'Yes! You can pay your driver directly in cash in US Dollars (USD) or Saudi Riyals (SAR) upon arrival. Cards, POS terminals, and electronic payments are not accepted.',"
  ],

  // CA
  [
    "'Settle your fare in SAR or CAD equivalent directly at your hotel with cash or card.'",
    "'Settle your fare directly at your hotel in cash (Saudi Riyals - SAR or US Dollars - USD). Cards and bank transfers are not accepted.'"
  ],
  [
    "paymentAndCurrencyEn: 'Fixed fares displayed in SAR and Canadian Dollars (CAD). Zero advance deposit required.',",
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',"
  ],
  [
    "paymentAndCurrencyNative: 'Fixed fares displayed in SAR and Canadian Dollars (CAD). Zero advance deposit required.',",
    "paymentAndCurrencyNative: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',"
  ],

  // FR
  [
    "'Payment: Pay upon arrival at your hotel in EUR or SAR with cash or credit card.'",
    "'Payment: Pay upon arrival at your hotel strictly in cash (SAR or USD). Cards and bank transfers are not accepted.'"
  ],
  [
    "paymentAndCurrencyEn: 'Fixed fares displayed in Euros (€) and SAR. Zero prepayment required.',",
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',"
  ],
  [
    "paymentAndCurrencyNative: \"Tarifs fixes transparents en Euros (€) et Riyals (SAR). Aucun paiement à l'avance.\",",
    "paymentAndCurrencyNative: \"Tarifs fixes transparents en Riyals (SAR). Aucun acompte requis. Paiement en espèces à l'arrivée (SAR ou USD).\",",
  ],

  // ES
  [
    "paymentAndCurrencyEn: 'Fixed fares in EUR and SAR. No advance deposit.',",
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). No advance deposit. Cash upon arrival (SAR or USD).',"
  ],
  [
    "paymentAndCurrencyNative: 'Tarifas fijas en EUR y SAR. Sin necesidad de anticipo.',",
    "paymentAndCurrencyNative: 'Tarifas fijas en Riyales Saudíes (SAR). Sin necesidad de anticipo. Pago en efectivo a la llegada (SAR أو USD).',"
  ],

  // GR
  [
    "paymentAndCurrencyEn: 'Fixed fares in Euros (€) and SAR. Zero card pre-authorization.',",
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',"
  ],
  [
    "paymentAndCurrencyNative: 'Fixed fares in Euros (€) and SAR. Zero card pre-authorization.',",
    "paymentAndCurrencyNative: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',"
  ],

  // ARAB
  [
    "'Flexible payment: Cash in SAR or bank cards on arrival.'",
    "'Cash payment on arrival: Settle directly with your driver in Saudi Riyals (SAR) or US Dollars (USD). Cards are not accepted.'"
  ],
  [
    "'مرونة كاملة في الدفع: كاش بالريال السعودي أو عبر أجهزة الدفع الإلكتروني (مدى، فيزا، ماستركارد) لدى السائق.'",
    "'الدفع عند الوصول: كاش بالريال السعودي (SAR) أو الدولار الأمريكي (USD) مباشرة للسائق. لا نقبل البطاقات أو أجهزة الدفع الإلكتروني.'"
  ],
  [
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit required.',",
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',"
  ],
  [
    "paymentAndCurrencyNative: 'أسعار ثابتة ومحددة بالريال السعودي تشمل كافة الرسوم والضرائب دون أي زيادات.',",
    "paymentAndCurrencyNative: 'أسعار ثابتة ومحددة بالريال السعودي دون أي دفع مسبق. الدفع نقداً عند الوصول (بالريال أو الدولار).',"
  ],

  // EG
  [
    "'Direct payment upon hotel arrival in Saudi Riyals (cash or mada/credit card).'",
    "'Direct payment upon hotel arrival in cash (Saudi Riyals - SAR or US Dollars - USD). Cards are not accepted.'"
  ],
  [
    "'الدفع يتم عند الوصول للفندق بالريال السعودي نقداً أو بالفيزا والبطاقة البنكية دون أي عمولات إضافية.'",
    "'الدفع يتم عند الوصول للفندق نقداً مباشرة للسائق بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل البطاقات البنكية.'"
  ],
  [
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR) with EGP estimates. Zero advance deposit required.',",
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',"
  ],
  [
    "paymentAndCurrencyNative: 'سعر محدد وثابت بالريال السعودي يشمل طريق الحرمين السريع ومواقف المطار، والدفع عند الفندق.',",
    "paymentAndCurrencyNative: 'سعر محدد وثابت بالريال السعودي، والدفع نقداً عند الوصول للسائق (بالريال أو الدولار) دون أي دفع مسبق.',"
  ],

  // AE
  [
    "'Payment accepted via UAE credit/debit cards (Apple Pay, mada, Visa) or AED/SAR cash.'",
    "'Payment accepted strictly in cash upon arrival (SAR or USD). Cards, POS terminals, and online payments are not accepted.'"
  ],
  [
    "'السداد متاح ببطاقات البنوك الإماراتية (عبر Apple Pay وبطاقات فيزا وماستركارد) أو نقداً بالدرهم أو الريال.'",
    "'السداد نقداً فقط مباشرة للسائق عند الوصول بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل البطاقات البنكية أو أجهزة الدفع.'"
  ],
  [
    "paymentAndCurrencyEn: 'Fixed pricing in SAR and AED. Zero advance prepayment.',",
    "paymentAndCurrencyEn: 'Fixed pricing in SAR. Zero advance prepayment. Cash upon arrival (SAR or USD).',"
  ],
  [
    "paymentAndCurrencyNative: 'أسعار ثابتة محددة بالريال والدرهم الإماراتي، دون الحاجة لأي دفع مسبق.',",
    "paymentAndCurrencyNative: 'أسعار ثابتة محددة بالريال السعودي، والدفع نقداً عند الوصول (ريال أو دولار) دون أي دفع مسبق.',"
  ],

  // DZ
  [
    "'Direct payment at the hotel in SAR or international card.'",
    "'Direct payment at the hotel strictly in cash (SAR or USD). Cards are not accepted.'"
  ],
  [
    "'الدفع يتم مباشرة عند الوصول إلى الفندق نقداً بالريال السعودي أو بالبطاقة.'",
    "'الدفع يتم مباشرة عند الوصول إلى الفندق نقداً للسائق بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل البطاقات.'"
  ],
  [
    "paymentAndCurrencyEn: 'Fixed fares in SAR with Algerian Dinar (DZD) estimates. No credit card required.',",
    "paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). No advance payment. Cash upon arrival (SAR or USD).',"
  ],
  [
    "paymentAndCurrencyNative: 'أسعار واضحة ومحددة مسبقاً بالريال السعودي دون أي دفع بالبطاقة مقدماً.',",
    "paymentAndCurrencyNative: 'أسعار واضحة ومحددة بالريال السعودي دون أي دفع مسبق. الدفع نقداً عند الوصول (ريال أو دولار).',"
  ]
];

let replacedCount = 0;
for (const [target, repl] of replacements) {
  if (content.includes(target)) {
    content = content.replaceAll(target, repl);
    replacedCount++;
  } else {
    console.warn('Target not found in pilgrims.ts:', target.slice(0, 50));
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`✓ pilgrims.ts updated with ${replacedCount} replacement rules!`);
