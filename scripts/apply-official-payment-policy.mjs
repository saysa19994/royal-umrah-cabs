import fs from 'fs';
import path from 'path';

const ROOT = 'D:/royal-umrah-cabs';

console.log('=== STEP 1: Updating JsonLd.tsx ===');
{
  const filePath = path.join(ROOT, 'src/components/seo/JsonLd.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace("currenciesAccepted: 'SAR',", "currenciesAccepted: 'SAR, USD',");
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ JsonLd.tsx updated with currenciesAccepted: SAR, USD');
}

console.log('\n=== STEP 2: Updating Footer.tsx ===');
{
  const filePath = path.join(ROOT, 'src/components/layout/Footer.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    "<span>{locale === 'ar' ? 'الدفع نقداً للسائق عند الوصول (ريال سعودي)' : 'Cash Paid Directly to Chauffeur on Arrival (SAR)'}</span>",
    "<span>{locale === 'ar' ? 'الدفع نقداً للسائق عند الوصول (ريال سعودي / دولار أمريكي)' : 'Cash Paid Directly to Chauffeur on Arrival (SAR / USD)'}</span>"
  );
  content = content.replace(
    "{locale === 'ar' ? 'طريقة الدفع (100% نقداً للسائق عند الوصول)' : 'Payment Method (100% Cash to Chauffeur on Arrival)'}",
    "{locale === 'ar' ? 'طريقة الدفع (100% نقداً للسائق بالريال أو الدولار)' : 'Payment Method (100% Cash to Chauffeur in SAR or USD)'}"
  );
  content = content.replace(
    "? 'لا نطلب أية دفعة مقدمة قبل وصولك واستلام سيارتك؛ الدفع نقداً للسائق.'\n              : 'Zero upfront deposit required. Pay your driver in cash upon arrival.'}",
    "? 'لا نطلب أية دفعة مقدمة قبل وصولك؛ الدفع نقداً للسائق بالريال السعودي أو الدولار الأمريكي.'\n              : 'Zero upfront deposit required. Pay your driver in cash upon arrival (SAR or USD).'}"
  );
  // Also check CRLF
  content = content.replace(
    "? 'لا نطلب أية دفعة مقدمة قبل وصولك واستلام سيارتك؛ الدفع نقداً للسائق.'\r\n              : 'Zero upfront deposit required. Pay your driver in cash upon arrival.'}",
    "? 'لا نطلب أية دفعة مقدمة قبل وصولك؛ الدفع نقداً للسائق بالريال السعودي أو الدولار الأمريكي.'\r\n              : 'Zero upfront deposit required. Pay your driver in cash upon arrival (SAR or USD).'}"
  );
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ Footer.tsx updated');
}

console.log('\n=== STEP 3: Updating booking/page.tsx ===');
{
  const filePath = path.join(ROOT, 'src/app/[locale]/booking/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    "'Guaranteed fixed fares. Pay directly to your driver upon arrival in cash (SAR) — zero advance payment or deposit required.'",
    "'Guaranteed fixed fares. Pay directly to your driver upon arrival in cash (SAR or USD) — zero advance payment or deposit required.'"
  );
  content = content.replace(
    "'أسعار ثابتة ومحددة بدقة. الدفع نقداً مباشرة للسائق عند الوصول (بالريال السعودي) — لا يلزم أي دفع مسبق أو عربون.'",
    "'أسعار ثابتة ومحددة بدقة. الدفع نقداً مباشرة للسائق عند الوصول (بالريال السعودي أو الدولار الأمريكي) — لا يلزم أي دفع مسبق أو عربون.'"
  );
  content = content.replace(
    "\"Tarifs fixes garantis. Paiement direct au chauffeur à l'arrivée en espèces (SAR) — aucun paiement d'avance ni caution requis.\"",
    "\"Tarifs fixes garantis. Paiement direct au chauffeur à l'arrivée en espèces (SAR ou USD) — aucun paiement d'avance ni caution requis.\""
  );
  content = content.replace(
    "'Tarifas fijas garantizadas. Pago directo al chofer a la llegada en efectivo (SAR) — sin pagos por adelantado ni depósitos.'",
    "'Tarifas fijas garantizadas. Pago directo al chofer a la llegada en efectivo (SAR o USD) — sin pagos por adelantado ni depósitos.'"
  );
  content = content.replace(
    "'Tarif pasti transparan. Bayar tunai langsung ke sopir saat tiba (SAR) — tanpa uang muka atau deposit sama sekali.'",
    "'Tarif pasti transparan. Bayar tunai langsung ke sopir saat tiba (SAR atau USD) — tanpa uang muka atau deposit sama sekali.'"
  );
  content = content.replace(
    "'निश्चित गारंटीकृत किराया। पहुंचने पर सीधे ड्राइवर को नकद (SAR) भुगतान करें — कोई अग्रिम भुगतान या जमा राशि आवश्यक नहीं है।',",
    "'निश्चित गारंटीकृत किराया। पहुंचने पर सीधे ड्राइवर को नकद (SAR या USD) भुगतान करें — कोई अग्रिम भुगतान या जमा राशि आवश्यक नहीं है।',"
  );
  content = content.replace(
    "'Garantierte Festpreise. Zahlung direkt beim Fahrer bei Ankunft in bar (SAR) — keinerlei Vorauszahlung oder Kaution erforderlich.'",
    "'Garantierte Festpreise. Zahlung direkt beim Fahrer bei Ankunft in bar (SAR oder USD) — keinerlei Vorauszahlung oder Kaution erforderlich.'"
  );
  content = content.replace(
    "'طے شدہ اور شفاف کرائے۔ آمد پر ڈرائیور کو نقد (سعودی ریال) براہ راست ادائیگی — کسی پیشگی رقم یا ایڈوانس کی قطعاً ضرورت نہیں۔'",
    "'طے شدہ اور شفاف کرائے۔ آمد پر ڈرائیور کو نقد (سعودی ریال یا امریکی ڈالر) براہ راست ادائیگی — کسی پیشگی رقم یا ایڈوانس کی قطعاً ضرورت نہیں۔'"
  );
  content = content.replace(
    "'Kadar tetap terjamin. Bayar tunai terus kepada pemandu semasa tiba (SAR) — tiada bayaran pendahuluan atau deposit diperlukan.'",
    "'Kadar tetap terjamin. Bayar tunai terus kepada pemandu semasa tiba (SAR atau USD) — tiada bayaran pendahuluan atau deposit diperlukan.'"
  );
  content = content.replace(
    "'Garantili sabit fiyatlar. Varışta şoföre doğrudan nakit (SAR) ödeme yapın — ön ödeme veya depozito gerekmez.'",
    "'Garantili sabit fiyatlar. Varışta şoföre doğrudan nakit (SAR veya USD) ödeme yapın — ön ödeme veya depozito gerekmez.'"
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ booking/page.tsx updated for all 10 locales');
}

console.log('\n=== STEP 4: Updating BookingEngine.tsx ===');
{
  const filePath = path.join(ROOT, 'src/components/booking/BookingEngine.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // EN
  content = content.replace(
    "paymentDesc:\n      'Payment is made strictly in cash paid directly to your private chauffeur upon arrival at your destination for your trip. No advance payment, deposit, or prepayment is required to secure this booking.',",
    "paymentDesc:\n      'Payment is made strictly in cash paid directly to your private chauffeur upon arrival at your destination after your journey is completed. You may pay in Saudi Riyals (SAR) or US Dollars (USD). Credit cards, debit cards, POS terminals, online payments, and bank transfers are not accepted. No advance payment or deposit is required.',"
  );
  content = content.replace(
    "paymentDesc:\r\n      'Payment is made strictly in cash paid directly to your private chauffeur upon arrival at your destination for your trip. No advance payment, deposit, or prepayment is required to secure this booking.',",
    "paymentDesc:\r\n      'Payment is made strictly in cash paid directly to your private chauffeur upon arrival at your destination after your journey is completed. You may pay in Saudi Riyals (SAR) or US Dollars (USD). Credit cards, debit cards, POS terminals, online payments, and bank transfers are not accepted. No advance payment or deposit is required.',"
  );
  content = content.replace(
    "summaryPaymentValue: 'Pay Cash Directly to Driver',",
    "summaryPaymentValue: 'Pay Cash to Driver (SAR / USD)',"
  );

  // AR
  content = content.replace(
    "paymentDesc:\n      'يتم سداد قيمة الرحلة بالكامل نقداً مباشرة للسائق الخاص عند الوصول إلى وجهتك بأمان. لا يلزم أي دفع مسبق أو عربون لتأكيد الحجز.',",
    "paymentDesc:\n      'يتم سداد قيمة الرحلة بالكامل نقداً فقط مباشرة للسائق الخاص بعد انتهاء رحلتك ووصولك إلى وجهتك بأمان. يمكنك الدفع بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل بطاقات الائتمان أو بطاقات الخصم أو أجهزة نقاط البيع (POS) أو الدفع الإلكتروني أو التحويلات البنكية. لا يلزم أي دفع مسبق أو عربون لتأكيد الحجز.',"
  );
  content = content.replace(
    "paymentDesc:\r\n      'يتم سداد قيمة الرحلة بالكامل نقداً مباشرة للسائق الخاص عند الوصول إلى وجهتك بأمان. لا يلزم أي دفع مسبق أو عربون لتأكيد الحجز.',",
    "paymentDesc:\r\n      'يتم سداد قيمة الرحلة بالكامل نقداً فقط مباشرة للسائق الخاص بعد انتهاء رحلتك ووصولك إلى وجهتك بأمان. يمكنك الدفع بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل بطاقات الائتمان أو بطاقات الخصم أو أجهزة نقاط البيع (POS) أو الدفع الإلكتروني أو التحويلات البنكية. لا يلزم أي دفع مسبق أو عربون لتأكيد الحجز.',"
  );
  content = content.replace(
    "summaryPaymentValue: 'الدفع نقداً مباشرة للسائق عند الوصول',",
    "summaryPaymentValue: 'الدفع نقداً للسائق عند الوصول (ريال / دولار)',"
  );

  // FR
  content = content.replace(
    "summaryPaymentValue: 'Paiement en espèces au chauffeur à l’arrivée',",
    "summaryPaymentValue: 'Paiement en espèces au chauffeur (SAR / USD)',"
  );

  // ES
  content = content.replace(
    "summaryPaymentValue: 'Pago en efectivo al chofer a la llegada',",
    "summaryPaymentValue: 'Pago en efectivo al chofer (SAR / USD)',"
  );

  // ID
  content = content.replace(
    "summaryPaymentValue: 'Bayar Tunai Langsung ke Sopir Saat Tiba',",
    "summaryPaymentValue: 'Bayar Tunai ke Sopir Saat Tiba (SAR / USD)',"
  );

  // HI (remove card reference)
  content = content.replace(
    "summaryPaymentValue: 'पहुंचने पर ड्राइवर को सीधे भुगतान (नकद / कार्ड)',",
    "summaryPaymentValue: 'पहुंचने पर ड्राइवर को सीधे नकद भुगतान (SAR / USD)',"
  );

  // DE
  content = content.replace(
    "summaryPaymentValue: 'Zahlung beim Fahrer bei Ankunft (Bar)',",
    "summaryPaymentValue: 'Zahlung beim Fahrer bei Ankunft (Bar in SAR / USD)',"
  );

  // UR (remove card reference)
  content = content.replace(
    "summaryPaymentValue: 'آمد پر ڈرائیور کو براہ راست ادائیگی (نقد / کارڈ)',",
    "summaryPaymentValue: 'آمد پر ڈرائیور کو براہ راست نقد ادائیگی (سعودی ریال / ڈالر)',"
  );

  // MS
  content = content.replace(
    "summaryPaymentValue: 'Bayar Tunai Terus kepada Pemandu Semasa Tiba',",
    "summaryPaymentValue: 'Bayar Tunai Terus kepada Pemandu (SAR / USD)',"
  );

  // TR
  content = content.replace(
    "summaryPaymentValue: 'Varışta Şoföre Doğrudan Nakit Ödeme',",
    "summaryPaymentValue: 'Varışta Şoföre Doğrudan Nakit Ödeme (SAR / USD)',"
  );

  // Now fix FR, ES, ID, HI, DE, UR, MS, TR paymentDesc in BookingEngine.tsx:
  // ID fix (remove EDC / card):
  content = content.replace(
    /'Pembayaran dilakukan langsung ke sopir privat Anda saat tiba di tujuan dengan aman\. Anda dapat membayar tunai \(Riyal Saudi - SAR\) atau dengan uang tunai SAR atau USD\. Tidak perlu memasukkan kartu online atau membayar DP apa pun untuk mengonfirmasi pesanan\.'/,
    "'Pembayaran dilakukan secara tunai khusus langsung kepada sopir privat Anda setelah perjalanan selesai dan tiba di tujuan. Anda dapat membayar dalam Riyal Saudi (SAR) atau Dolar AS (USD). Kami tidak menerima kartu kredit, kartu debit, mesin POS/EDC, pembayaran online, maupun transfer bank. Tidak ada uang muka (DP) atau deposit yang diperlukan.'"
  );

  // MS fix (remove terminal / card):
  content = content.replace(
    /'Pembayaran dibuat sepenuhnya terus kepada pemandu peribadi anda semasa tiba di destinasi\. Anda boleh membayar secara tunai \(Riyal Saudi - SAR\) secara tunai sahaja bank melalui mesin terminal pemandu\. Tiada kad kredit dalam talian atau wang pendahuluan diperlukan untuk mengesahkan tempahan\.'/,
    "'Pembayaran dibuat secara tunai sahaja terus kepada pemandu peribadi anda setelah perjalanan selesai setibanya di destinasi. Anda boleh membayar dalam Riyal Saudi (SAR) atau Dolar AS (USD). Kami tidak menerima kad kredit, kad debit, terminal POS, pembayaran dalam talian, atau pindahan bank. Tiada sebarang wang pendahuluan atau deposit diperlukan.'"
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ BookingEngine.tsx updated');
}

console.log('\n=== STEP 5: Updating terms/page.tsx ===');
{
  const filePath = path.join(ROOT, 'src/app/[locale]/terms/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    'Payment is made directly to the chauffeur upon arrival at your destination in cash (SAR, USD, EUR, MYR) or by bank card (mada, Visa, Mastercard).',
    'Payment is made strictly in cash directly to your chauffeur upon arrival at your destination after your journey is completed in Saudi Riyals (SAR) or US Dollars (USD). Credit cards, debit cards, POS terminals, online payments, and bank transfers are not accepted. No advance payment or deposit is required.'
  );
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ terms/page.tsx updated');
}

console.log('\n=== STEP 6: Updating cancellation/page.tsx ===');
{
  const filePath = path.join(ROOT, 'src/app/[locale]/cancellation/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    'Because Duyuf Alrahman VIP operates on a transparent "Pay Upon Arrival" model, you do not need to wait weeks for credit card refunds. If you cancel your reservation before the 24-hour window, your booking is simply cancelled in our dispatch system without any financial deduction.',
    'Because Duyuf Alrahman VIP operates on a transparent cash-on-arrival model with zero advance deposit, you never experience refund processing delays or bank penalty deductions. If you cancel your reservation before the 24-hour window, your booking is simply cancelled in our dispatch system with zero cost.'
  );
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ cancellation/page.tsx updated');
}

console.log('\n=== STEP 7: Updating malaysia-umrah-transport/page.tsx ===');
{
  const filePath = path.join(ROOT, 'src/app/[locale]/guides/malaysia-umrah-transport/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    "Tidak perlu sebarang deposit secara tunai sahaja kredit semasa menempah. Anda hanya membayar terus kepada pemandu secara tunai sahaja semasa tiba di hotel anda di Makkah atau Madinah.",
    "Tidak perlu sebarang deposit semasa menempah. Anda hanya membayar terus kepada pemandu secara tunai setibanya di hotel dalam Riyal Saudi (SAR) atau Dolar AS (USD). Kad bank, terminal POS, dan pindahan bank tidak diterima."
  );
  content = content.replace(
    "لا يلزم أي دفع مسبق. الدفع يتم نقداً مباشرة للسائق عند الوصول.",
    "لا يلزم أي دفع مسبق أو عربون. الدفع يتم نقداً فقط مباشرة للسائق عند الوصول بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل البطاقات أو التحويلات."
  );
  content = content.replace(
    "No deposit is required upfront. You pay your chauffeur upon arrival at your hotel in cash only (SAR or USD).",
    "No deposit or prepayment is required. You pay your chauffeur directly in cash upon arrival at your hotel in Saudi Riyals (SAR) or US Dollars (USD). Cards, POS terminals, and bank transfers are not accepted."
  );
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ malaysia-umrah-transport/page.tsx updated');
}

console.log('\n=== STEP 8: Updating pilgrims/[country]/page.tsx ===');
{
  const filePath = path.join(ROOT, 'src/app/[locale]/pilgrims/[country]/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(
    "`Your home currency: ${c.currencyCode} (${c.currencySymbol}) · Settle in SAR or Card.`",
    "`Accepted Payment: Cash upon arrival in SAR or USD · No cards or advance deposit.`"
  );
  content = content.replace(
    "`Mata wang tempatan anda: ${c.currencyCode} (${c.currencySymbol}) · Diterima bersama SAR.`",
    "`Bayaran Diterima: Tunai semasa tiba dalam SAR atau USD · Tiada kad atau deposit.`"
  );
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ pilgrims/[country]/page.tsx updated');
}

console.log('\n=== STEP 9: Updating knowledge-base.ts & faqs-master.ts ===');
{
  const kbPath = path.join(ROOT, 'src/lib/chat/knowledge-base.ts');
  let kbContent = fs.readFileSync(kbPath, 'utf8');
  kbContent = kbContent.replace(
    'All payments are settled securely upon arrival with the driver via cash only (SAR or USD) terminal.',
    'All payments are settled securely upon arrival with the driver in cash (SAR or USD). We never accept credit cards, debit cards, POS terminals, online payments, or bank transfers.'
  );
  kbContent = kbContent.replace(
    '- Payment: Zero upfront deposit. The only accepted payment method is cash paid directly to your driver upon arrival (Saudi Riyals - SAR). Credit cards, debit cards, POS terminals, and online payments are not accepted.',
    '- Payment: Zero upfront deposit. The only accepted payment method is cash paid directly to your driver after your journey is completed (Saudi Riyals - SAR or US Dollars - USD). Credit cards, debit cards, POS terminals, online payments, and bank transfers are not accepted.'
  );
  fs.writeFileSync(kbPath, kbContent, 'utf8');
  console.log('✓ knowledge-base.ts updated');

  const faqMasterPath = path.join(ROOT, 'src/data/faqs-master.ts');
  let fmContent = fs.readFileSync(faqMasterPath, 'utf8');
  fmContent = fmContent.replace(
    "questionEn: 'What payment methods do you accept?',\n    questionAr: 'ما هي وسائل الدفع المقبولة لديكم؟',",
    "questionEn: 'What payment methods and currencies do you accept?',\n    questionAr: 'ما طرق الدفع والعملات المقبولة لديكم؟',"
  );
  fmContent = fmContent.replace(
    "questionEn: 'What payment methods do you accept?',\r\n    questionAr: 'ما هي وسائل الدفع المقبولة لديكم؟',",
    "questionEn: 'What payment methods and currencies do you accept?',\r\n    questionAr: 'ما طرق الدفع والعملات المقبولة لديكم؟',"
  );
  fmContent = fmContent.replace(
    "answerEn:\n      'The only accepted payment method is cash paid directly to your private driver upon arrival at your destination for your trip. We operate on a zero-advance-deposit policy, and no prepayment is required.',",
    "answerEn:\n      'We accept cash payments only, paid directly to your driver after your journey is completed. You may pay in Saudi Riyals (SAR) or US Dollars (USD). We do not accept credit cards, debit cards, POS payments, online payments, or bank transfers. No advance payment or deposit is required.',"
  );
  fmContent = fmContent.replace(
    "answerEn:\r\n      'The only accepted payment method is cash paid directly to your private driver upon arrival at your destination for your trip. We operate on a zero-advance-deposit policy, and no prepayment is required.',",
    "answerEn:\r\n      'We accept cash payments only, paid directly to your driver after your journey is completed. You may pay in Saudi Riyals (SAR) or US Dollars (USD). We do not accept credit cards, debit cards, POS payments, online payments, or bank transfers. No advance payment or deposit is required.',"
  );
  fmContent = fmContent.replace(
    "answerAr:\n      'نعمل بسياسة عدم اشتراط أي دفع مسبق. يمكنك سداد القيمة لسائقك عند الوصول إلى الفندق نقداً بالريال السعودي أو ببطاقات الدفع (مدى، فيزا، ماستركارد) عبر جهاز الدفع بالسيارة [تحت تأكيد المالك].',",
    "answerAr:\n      'نقبل الدفع نقداً فقط، ويتم سداده مباشرةً للسائق بعد انتهاء رحلتك ووصولك إلى وجهتك. يمكنك الدفع بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل بطاقات الائتمان أو بطاقات الخصم أو أجهزة نقاط البيع (POS) أو الدفع الإلكتروني أو التحويلات البنكية. لا يلزم أي دفع مسبق أو عربون.',"
  );
  fmContent = fmContent.replace(
    "answerAr:\r\n      'نعمل بسياسة عدم اشتراط أي دفع مسبق. يمكنك سداد القيمة لسائقك عند الوصول إلى الفندق نقداً بالريال السعودي أو ببطاقات الدفع (مدى، فيزا، ماستركارد) عبر جهاز الدفع بالسيارة [تحت تأكيد المالك].',",
    "answerAr:\r\n      'نقبل الدفع نقداً فقط، ويتم سداده مباشرةً للسائق بعد انتهاء رحلتك ووصولك إلى وجهتك. يمكنك الدفع بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل بطاقات الائتمان أو بطاقات الخصم أو أجهزة نقاط البيع (POS) أو الدفع الإلكتروني أو التحويلات البنكية. لا يلزم أي دفع مسبق أو عربون.',"
  );
  fs.writeFileSync(faqMasterPath, fmContent, 'utf8');
  console.log('✓ faqs-master.ts updated');
}

console.log('\n=== STEP 10: Updating all 10 Dictionaries ===');
{
  const DICTS = {
    en: {
      q2: "What payment methods and currencies do you accept?",
      a2: "We accept cash payments only, paid directly to your driver after your journey is completed. You may pay in Saudi Riyals (SAR) or US Dollars (USD). We do not accept credit cards, debit cards, POS payments, online payments, or bank transfers. No advance payment or deposit is required.",
      note2: "Payment is made strictly in cash paid directly to your chauffeur upon arrival (SAR or USD).",
      payOnArrival: "Pay Cash on Arrival (SAR / USD)",
      payOnArrivalNotice: "No advance payment required · Pay cash directly to your driver upon arrival (SAR / USD)",
      cardNotice: "No deposit required · Pay driver upon arrival in cash (SAR or USD)",
      malaysiaTitle: "Fixed Guaranteed Rates · Pay Cash Upon Arrival",
      malaysiaDesc: "Transparent fixed rates with zero hidden charges. No advance deposit required. You pay your chauffeur in cash upon arrival after your journey is completed in Saudi Riyals (SAR) or US Dollars (USD). Cards, bank transfers, and electronic payments are not accepted."
    },
    ar: {
      q2: "ما طرق الدفع والعملات المقبولة لديكم؟",
      a2: "نقبل الدفع نقداً فقط، ويتم سداده مباشرةً للسائق بعد انتهاء رحلتك ووصولك إلى وجهتك. يمكنك الدفع بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل بطاقات الائتمان أو بطاقات الخصم أو أجهزة نقاط البيع (POS) أو الدفع الإلكتروني أو التحويلات البنكية. لا يلزم أي دفع مسبق أو عربون.",
      note2: "يتم سداد قيمة الرحلة نقداً فقط مباشرة للسائق عند الوصول (بالريال السعودي أو الدولار الأمريكي).",
      payOnArrival: "الدفع نقداً عند الوصول (ريال سعودي / دولار أمريكي)",
      payOnArrivalNotice: "لا يلزم أي دفع مسبق · الدفع نقداً مباشرة للسائق عند الوصول (ريال سعودي أو دولار أمريكي)",
      cardNotice: "لا يلزم أي عربون · الدفع نقداً للسائق عند الوصول (ريال سعودي أو دولار أمريكي)",
      malaysiaTitle: "أسعار ثابتة ومضمونة · الدفع نقداً عند الوصول",
      malaysiaDesc: "أسعار ثابتة وشفافة دون أي رسوم خفية. لا نطلب أي عربون مسبق. يتم سداد المبلغ نقداً للسائق عند الوصول بعد اكتمال رحلتك بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل البطاقات البنكية أو التحويلات أو الدفع الإلكتروني."
    },
    ms: {
      q2: "Apakah kaedah pembayaran dan mata wang yang diterima?",
      a2: "Kami hanya menerima pembayaran tunai yang dibayar terus kepada pemandu anda selepas perjalanan anda selesai. Anda boleh membayar dalam Riyal Saudi (SAR) atau Dolar AS (USD). Kami tidak menerima kad kredit, kad debit, pembayaran POS, pembayaran dalam talian, atau pindahan bank. Tiada bayaran pendahuluan atau deposit diperlukan.",
      note2: "Pembayaran dibuat secara tunai sahaja terus kepada pemandu anda semasa tiba (SAR atau USD).",
      payOnArrival: "Bayar Tunai Semasa Tiba (SAR / USD)",
      payOnArrivalNotice: "Tiada bayaran pendahuluan · Bayar tunai terus kepada pemandu semasa tiba (SAR / USD)",
      cardNotice: "Tiada deposit diperlukan · Bayar pemandu semasa tiba secara tunai (SAR atau USD)",
      malaysiaTitle: "Kadar Tetap Terjamin · Bayar Tunai Semasa Tiba",
      malaysiaDesc: "Kadar tambang tetap terjamin tanpa sebarang caj tersembunyi. Tiada wang pendahuluan diperlukan. Anda hanya membayar terus kepada pemandu secara tunai semasa tiba selepas perjalanan selesai dalam Riyal Saudi (SAR) atau Dolar AS (USD). Pembayaran kad, pindahan bank, dan pembayaran elektronik tidak diterima."
    },
    id: {
      q2: "Apa metode pembayaran dan mata uang yang diterima?",
      a2: "Kami hanya menerima pembayaran tunai yang dibayarkan langsung kepada sopir Anda setelah perjalanan Anda selesai. Anda dapat membayar dalam Riyal Saudi (SAR) atau Dolar AS (USD). Kami tidak menerima kartu kredit, kartu debit, pembayaran mesin POS, pembayaran online, atau transfer bank. Tidak ada uang muka (DP) atau deposit yang diperlukan.",
      note2: "Pembayaran dilakukan khusus secara tunai langsung kepada sopir saat tiba (SAR atau USD).",
      payOnArrival: "Bayar Tunai Saat Tiba (SAR / USD)",
      payOnArrivalNotice: "Tanpa uang muka (DP) · Bayar tunai langsung ke sopir saat tiba (SAR / USD)",
      cardNotice: "Tanpa uang muka (DP) · Bayar sopir saat tiba secara tunai (SAR atau USD)",
      malaysiaTitle: "Tarif Tetap Terjamin · Bayar Tunai Saat Tiba",
      malaysiaDesc: "Tarif tetap transparan tanpa biaya tersembunyi. Tanpa uang muka (DP). Anda membayar langsung kepada sopir secara tunai saat tiba setelah perjalanan selesai dalam Riyal Saudi (SAR) atau Dolar AS (USD). Pembayaran kartu, transfer bank, dan pembayaran elektronik tidak diterima."
    },
    ur: {
      q2: "آپ کے ہاں ادائیگی کے کون سے طریقے اور کرنسیاں قبول کی جاتی ہیں؟",
      a2: "ہم صرف نقد ادائیگی قبول کرتے ہیں، جو آپ کا سفر مکمل ہونے اور منزل پر پہنچنے کے بعد براہِ راست آپ کے ڈرائیور کو ادا کی جاتی ہے۔ آپ ادائیگی سعودی ریال (SAR) یا امریکی ڈالر (USD) میں کر سکتے ہیں۔ ہم کریڈٹ کارڈز، ڈیبٹ کارڈز، پی او ایس ادائیگیوں، آن لائن ادائیگیوں یا بینک ٹرانسفر کو قبول نہیں کرتے۔ کسی پیشگی ادائیگی یا ایڈوانس کی ضرورت نہیں ہے۔",
      note2: "ادائیگی صرف نقد میں آمد پر براہِ راست آپ کے ڈرائیور کو کی جاتی ہے (سعودی ریال یا امریکی ڈالر میں)۔",
      payOnArrival: "آمد پر نقد ادائیگی (سعودی ریال / امریکی ڈالر)",
      payOnArrivalNotice: "پیشگی ادائیگی کی ضرورت نہیں · آمد پر ڈرائیور کو نقد ادائیگی کریں (سعودی ریال / امریکی ڈالر)",
      cardNotice: "کسی ایڈوانس کی ضرورت نہیں · آمد پر ڈرائیور کو نقد ادا کریں (سعودی ریال یا امریکی ڈالر)",
      malaysiaTitle: "طے شدہ فکسڈ ریٹس · پہنچنے پر نقد ادائیگی",
      malaysiaDesc: "بغیر کسی پوشیدہ چارجز کے شفاف فکسڈ ریٹس۔ کسی پیشگی رقم کی ضرورت نہیں۔ آپ سفر مکمل ہونے کے بعد منزل پر پہنچ کر اپنے ڈرائیور کو صرف نقد رقم میں سعودی ریال (SAR) یا امریکی ڈالر (USD) میں ادائیگی کرتے ہیں۔ کارڈز، بینک ٹرانسفر اور الیکٹرانک ادائیگی قبول نہیں کی جاتی۔"
    },
    fr: {
      q2: "Quels sont les modes de paiement et les devises acceptés ?",
      a2: "Nous acceptons uniquement les paiements en espèces, réglés directement à votre chauffeur une fois votre trajet terminé. Vous pouvez payer en Riyals saoudiens (SAR) ou en Dollars américains (USD). Nous n'acceptons pas les cartes de crédit, cartes de débit, paiements par TPE, paiements en ligne ni virements bancaires. Aucun paiement d'avance ni acompte n'est requis.",
      note2: "Le paiement s'effectue strictement en espèces directement auprès de votre chauffeur à l'arrivée (SAR ou USD).",
      payOnArrival: "Paiement en espèces à l'arrivée (SAR / USD)",
      payOnArrivalNotice: "Aucun paiement d'avance requis · Paiement en espèces directement au chauffeur à l'arrivée (SAR / USD)",
      cardNotice: "Aucun acompte requis · Paiement en espèces au chauffeur à l'arrivée (SAR ou USD)",
      malaysiaTitle: "Tarifs Fixes Garantis · Paiement en Espèces à l'Arrivée",
      malaysiaDesc: "Tarifs fixes et transparents sans frais cachés. Aucun acompte requis. Vous réglez directement votre chauffeur en espèces à l'arrivée une fois votre voyage terminé, en Riyals saoudiens (SAR) ou en Dollars américains (USD). Les cartes bancaires, virements et paiements électroniques ne sont pas acceptés."
    },
    es: {
      q2: "¿Qué métodos de pago y divisas aceptan?",
      a2: "Aceptamos únicamente pagos en efectivo, abonados directamente a su chofer una vez finalizado su viaje. Puede pagar en Riyales Saudíes (SAR) o Dólares Estadounidenses (USD). No aceptamos tarjetas de crédito, tarjetas de débito, pagos con TPV, pagos en línea ni transferencias bancarias. No se requiere ningún pago por adelantado ni depósito.",
      note2: "El pago se realiza estrictamente en efectivo directamente a su chofer a la llegada (SAR o USD).",
      payOnArrival: "Pago en efectivo a la llegada (SAR / USD)",
      payOnArrivalNotice: "Sin pago por adelantado · Pague en efectivo directamente a su chofer a la llegada (SAR / USD)",
      cardNotice: "Sin depósito requerido · Pague al chofer a la llegada en efectivo (SAR o USD)",
      malaysiaTitle: "Tarifas Fijas Garantizadas · Pago en Efectivo a la Llegada",
      malaysiaDesc: "Tarifas fijas transparentes sin cargos ocultos. No se requiere anticipo. Paga en efectivo directamente a su chofer al finalizar el viaje en Riyales Saudíes (SAR) o Dólares Estadounidenses (USD). No se aceptan tarjetas, transferencias bancarias ni pagos electrónicos."
    },
    de: {
      q2: "Welche Zahlungsmethoden und Währungen akzeptieren Sie?",
      a2: "Wir akzeptieren ausschließlich Barzahlungen, die nach Beendigung Ihrer Fahrt direkt an Ihren Fahrer entrichtet werden. Sie können in Saudi-Riyal (SAR) oder US-Dollar (USD) bezahlen. Wir akzeptieren keine Kreditkarten, Debitkarten, POS-Terminalzahlungen, Online-Zahlungen oder Banküberweisungen. Es ist keinerlei Anzahlung oder Vorauszahlung erforderlich.",
      note2: "Die Zahlung erfolgt ausschließlich in bar direkt bei Ihrem Chauffeur bei Ankunft (SAR oder USD).",
      payOnArrival: "Barzahlung bei Ankunft (SAR / USD)",
      payOnArrivalNotice: "Keine Anzahlung erforderlich · Barzahlung direkt beim Fahrer bei Ankunft (SAR / USD)",
      cardNotice: "Keine Kaution erforderlich · Barzahlung beim Fahrer bei Ankunft (SAR oder USD)",
      malaysiaTitle: "Garantierte Festpreise · Barzahlung bei Ankunft",
      malaysiaDesc: "Transparente Festpreise ohne versteckte Gebühren. Keine Anzahlung erforderlich. Sie bezahlen Ihren Chauffeur nach Abschluss der Fahrt bei Ankunft in bar in Saudi-Riyal (SAR) oder US-Dollar (USD). Kartenzahlungen, Banküberweisungen und elektronische Zahlungen werden nicht akzeptiert."
    },
    hi: {
      q2: "आप कौन सी भुगतान विधियां और मुद्राएं स्वीकार करते हैं?",
      a2: "हम केवल नकद भुगतान स्वीकार करते हैं, जो आपकी यात्रा पूरी होने के बाद सीधे आपके ड्राइवर को दिया जाता है। आप सऊदी रियाल (SAR) या अमेरिकी डॉलर (USD) में भुगतान कर सकते हैं। हम क्रेडिट कार्ड, डेबिट कार्ड, पीओएस मशीन, ऑनलाइन भुगतान या बैंक ट्रांसफर स्वीकार नहीं करते हैं। किसी भी अग्रिम भुगतान या जमा राशि की आवश्यकता नहीं है।",
      note2: "भुगतान केवल नकद में पहुंचने पर सीधे आपके चौफर को किया जाता है (SAR या USD में)।",
      payOnArrival: "पहुंचने पर नकद भुगतान (SAR / USD)",
      payOnArrivalNotice: "कोई अग्रिम भुगतान आवश्यक नहीं · पहुंचने पर ड्राइवर को सीधे नकद भुगतान करें (SAR / USD)",
      cardNotice: "कोई जमा राशि आवश्यक नहीं · पहुंचने पर ड्राइवर को नकद भुगतान करें (SAR या USD)",
      malaysiaTitle: "गारंटीकृत निश्चित दरें · आगमन पर नकद भुगतान",
      malaysiaDesc: "बिना किसी छिपे शुल्क के पारदर्शी निश्चित दरें। कोई अग्रिम जमा राशि की आवश्यकता नहीं है। आप यात्रा पूरी होने के बाद आगमन पर अपने ड्राइवर को सऊदी रियाल (SAR) या अमेरिकी डॉलर (USD) में नकद भुगतान करते हैं। कार्ड, बैंक ट्रांसफर या इलेक्ट्रॉनिक भुगतान स्वीकार नहीं किए जाते हैं।"
    },
    tr: {
      q2: "Hangi ödeme yöntemlerini ve para birimlerini kabul ediyorsunuz?",
      a2: "Yalnızca yolculuğunuz tamamlandıktan sonra doğrudan şoförünüze yapılan nakit ödemeleri kabul ediyoruz. Ödemenizi Suudi Arabistan Riyali (SAR) veya ABD Doları (USD) olarak yapabilirsiniz. Kredi kartı, banka kartı, POS cihazı, çevrim içi ödeme veya banka havalesi kabul etmiyoruz. Ön ödeme veya depozito gerekmez.",
      note2: "Ödeme, varışta yalnızca nakit olarak doğrudan şoförünüze yapılır (SAR veya USD).",
      payOnArrival: "Varışta Nakit Ödeme (SAR / USD)",
      payOnArrivalNotice: "Ön ödeme gerekmez · Varışta şoföre doğrudan nakit ödeyin (SAR / USD)",
      cardNotice: "Depozito gerekmez · Varışta şoföre nakit ödeyin (SAR veya USD)",
      malaysiaTitle: "Garantili Sabit Fiyatlar · Varışta Nakit Ödeme",
      malaysiaDesc: "Gizli ücret içermeyen şeffaf sabit fiyatlar. Ön ödeme veya depozito gerekmez. Yolculuğunuz tamamlandığında varışta şoförünüze doğrudan nakit olarak Suudi Arabistan Riyali (SAR) veya ABD Doları (USD) ile ödeme yaparsınız. Kart, banka havalesi veya elektronik ödeme kabul edilmemektedir."
    }
  };

  const dictDir = path.join(ROOT, 'src/i18n/dictionaries');
  for (const [locale, t] of Object.entries(DICTS)) {
    const filePath = path.join(dictDir, `${locale}.json`);
    const dict = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Update FAQ
    if (dict.faq) {
      dict.faq.q2 = t.q2;
      dict.faq.a2 = t.a2;
    }

    // Update pricing note2
    if (dict.page_pricing) {
      dict.page_pricing.note2 = t.note2;
    }

    // Update trust strip & hero
    if (dict.trust_strip) {
      dict.trust_strip.payOnArrival = t.payOnArrival;
    }
    if (dict.hero) {
      dict.hero.payOnArrivalNotice = t.payOnArrivalNotice;
    }
    if (dict.booking_card) {
      dict.booking_card.payOnArrivalNotice = t.cardNotice;
    }

    // Update page_guide_malaysia section 4
    if (dict.page_guide_malaysia) {
      dict.page_guide_malaysia.section4Title = t.malaysiaTitle;
      dict.page_guide_malaysia.section4Desc = t.malaysiaDesc;
    }

    fs.writeFileSync(filePath, JSON.stringify(dict, null, 2) + '\n', 'utf8');
    console.log(`✓ [${locale}] dictionary updated with official cash in SAR / USD policy`);
  }
}

console.log('\n=== ALL TARGETED CODE UPDATES COMPLETE ===');
