import assert from 'node:assert';
import test from 'node:test';
import { PAYMENT_INTENT_TERMS, PAYMENT_INTENT_REGEX } from '../src/lib/chat/payment-intent.ts';

test('Chatbot Regex: Payment Questions MUST Trigger', () => {
  const positive = [
    { text: 'Can I pay with credit card?', lang: 'EN' },
    { text: 'هل تقبلون بطاقة مدى؟', lang: 'AR' },
    { text: 'هل الدفع كاش عند الوصول؟', lang: 'AR' },
    { text: 'Bagaimana cara bayar tunai?', lang: 'ID' },
    { text: 'Kredi kartı ile ödeme yapabilir miyim?', lang: 'TR' },
    { text: 'کیا میں بینک ٹرانسفر کے ذریعے ادائیگی کر سکتا ہوں؟', lang: 'UR' },
    { text: 'Do you accept bank transfer?', lang: 'EN' },
    { text: 'Is there a card machine or pos terminal in the car?', lang: 'EN' },
    { text: 'Puis-je payer en espèces ou carte bancaire?', lang: 'FR' },
    { text: '¿Se puede pagar con tarjeta de crédito?', lang: 'ES' },
    { text: 'Kann ich per Überweisung oder barzahlung?', lang: 'DE' },
    { text: 'क्या मैं नकद भुगतान कर सकता हूँ?', lang: 'HI' },
    { text: 'Do you require advance deposit or installment?', lang: 'EN' },
    { text: 'Do you accept cash upon arrival?', lang: 'EN' }
  ];

  for (const item of positive) {
    const match = PAYMENT_INTENT_REGEX.test(item.text);
    assert.strictEqual(match, true, `Expected payment question to match: "${item.text}" (${item.lang})`);
  }
});

test('Chatbot Regex: Non-Payment & False-Positive Traps MUST NOT Trigger', () => {
  const negative = [
    // Traps specified in prompt 4:
    { text: 'Do I need a visa for Umrah?', lang: 'EN' },
    { text: 'Is the Nusuk card required?', lang: 'EN' },
    { text: 'ما مدى سعة الحقائب؟', lang: 'AR' },
    { text: 'فيزا العمرة', lang: 'AR' },
    { text: 'Karte von Makkah?', lang: 'DE' },
    { text: 'carte de la ville', lang: 'FR' },
    // General false-positive checks:
    { text: 'What is the price for airport transfer?', lang: 'EN' },
    { text: 'Is it possible to stop at Miqat Bir Ali?', lang: 'EN' },
    { text: 'What is the current position of the driver?', lang: 'EN' },
    { text: 'I need private transport from Jeddah to Makkah', lang: 'EN' },
    { text: 'Transfer to hotel in Madinah', lang: 'EN' },
    { text: 'كم سعر التوصيل إلى مكة؟', lang: 'AR' },
    { text: 'Berapa tarif transfer bandara jeddah?', lang: 'ID' },
    { text: 'Havalimanı transfer süresi ne kadar?', lang: 'TR' },
    { text: 'جدہ ایئرپورٹ سے مکہ کا فاصلہ کتنا ہے؟', lang: 'UR' },
    { text: 'Quel est le temps de transfert vers Médine?', lang: 'FR' },
    { text: 'Possibility of booking a Yukon XL', lang: 'EN' },
    { text: 'Airport transfer details and luggage capacity', lang: 'EN' }
  ];

  for (const item of negative) {
    const match = PAYMENT_INTENT_REGEX.test(item.text);
    assert.strictEqual(match, false, `Expected non-payment question to NOT match: "${item.text}" (${item.lang})`);
  }
});
