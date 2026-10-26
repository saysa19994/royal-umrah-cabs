import fs from 'fs';

const p = 'D:/royal-umrah-cabs/src/components/booking/BookingEngine.tsx';
let c = fs.readFileSync(p, 'utf8');

// French (FR)
c = c.replace(
  /'Le paiement s’effectue exclusivement en espèces directement auprès de votre chauffeur privé à votre arrivée à destination pour votre trajet\. Aucun acompte ni prépaiement n’est requis pour valider cette réservation\.'/,
  "'Le paiement s’effectue strictement en espèces payées directement à votre chauffeur privé après la fin de votre trajet et votre arrivée à destination. Vous pouvez payer en Riyals saoudiens (SAR) ou en Dollars américains (USD). Les cartes bancaires, terminaux TPE, paiements en ligne et virements ne sont pas acceptés. Aucun paiement d’avance ni acompte n’est requis.'"
);

// Spanish (ES)
c = c.replace(
  /'El pago se realiza exclusivamente en efectivo directamente a su chofer privado a la llegada a su destino para su viaje\. No se requiere ningún anticipo ni depósito para asegurar su reserva\.'/,
  "'El pago se realiza estrictamente en efectivo directamente a su chofer privado una vez finalizado su viaje y llegado a su destino. Puede pagar en Riyales Saudíes (SAR) o Dólares Estadounidenses (USD). No aceptamos tarjetas de crédito, tarjetas de débito, pagos con TPV, pagos en línea ni transferencias bancarias. No se requiere ningún anticipo ni depósito.'"
);

// Hindi (HI)
c = c.replace(
  /'भुगतान सीधे आपके निजी ड्राइवर को गंतव्य पर पहुंचने पर किया जाता है। आप नकद \(सऊदी रियाल - SAR\) या कार्ड मशीन से भुगतान कर सकते हैं। बुकिंग सुरक्षित करने के लिए किसी ऑनलाइन कार्ड या अग्रिम राशि की आवश्यकता नहीं है।'/,
  "'भुगतान केवल नकद में यात्रा पूरी होने और गंतव्य पर पहुंचने के बाद सीधे आपके निजी ड्राइवर को किया जाता है। आप सऊदी रियाल (SAR) या अमेरिकी डॉलर (USD) में भुगतान कर सकते हैं। हम क्रेडिट कार्ड, डेबिट कार्ड, पीओएस मशीन, ऑनलाइन भुगतान या बैंक ट्रांसफर स्वीकार नहीं करते हैं। किसी अग्रिम भुगतान या जमा राशि की आवश्यकता नहीं है।'"
);

// German (DE)
c = c.replace(
  /'Die Zahlung erfolgt direkt bei Ihrem Chauffeur bei Ankunft am Zielort\. Sie können in bar \(Saudi-Riyal - SAR\) oder bequem mit EC-\/Kreditkarte am bordeigenen Terminal des Fahrers zahlen\. Es sind keine Kreditkartendaten online oder Anzahlungen erforderlich\.'/,
  "'Die Bezahlung erfolgt ausschließlich in bar direkt bei Ihrem privaten Chauffeur nach Beendigung Ihrer Fahrt am Zielort. Sie können in Saudi-Riyal (SAR) oder US-Dollar (USD) bezahlen. Wir akzeptieren keine Kreditkarten, Debitkarten, POS-Terminalzahlungen, Online-Zahlungen oder Banküberweisungen. Es ist keinerlei Anzahlung oder Kaution erforderlich.'"
);

// Urdu (UR)
c = c.replace(
  /'مکمل رقم منزل پر پہنچنے کے بعد براہ راست آپ کے پرائیویٹ ڈرائیور کو ادا کی جاتی ہے۔ آپ نقد \(سعودی ریال\) یا ڈرائیور کی کارڈ مشین کے ذریعے ادائیگی کر سکتے ہیں۔ بکنگ کے لیے آن لائن کارڈ یا ایڈوانس رقم درکار نہیں۔'/,
  "'ادائیگی صرف نقد میں سفر مکمل ہونے اور منزل پر پہنچنے کے بعد براہِ راست آپ کے ذاتی ڈرائیور کو کی جاتی ہے۔ آپ ادائیگی سعودی ریال (SAR) یا امریکی ڈالر (USD) میں کر سکتے ہیں۔ ہم کریڈٹ کارڈز، ڈیبٹ کارڈز، پی او ایس ادائیگیوں، آن لائن ادائیگیوں یا بینک ٹرانسفر کو قبول نہیں کرتے۔ کسی پیشگی رقم یا ایڈوانس کی قطعاً ضرورت نہیں ہے۔'"
);

// Turkish (TR)
c = c.replace(
  /'Ödeme, yolculuğunuz için varış noktanıza ulaştığınızda tamamen nakit olarak doğrudan özel şoförünüze yapılır\. Bu rezervasyonu onaylamak için hiçbir ön ödeme veya kapora gerekmez\.'/,
  "'Ödeme yalnızca yolculuğunuz tamamlandıktan ve varış noktanıza ulaştıktan sonra doğrudan özel şoförünüze nakit olarak yapılır. Ödemenizi Suudi Arabistan Riyali (SAR) veya ABD Doları (USD) olarak yapabilirsiniz. Kredi kartı, banka kartı, POS cihazı, çevrim içi ödeme ve banka havalesi kabul edilmemektedir. Ön ödeme veya depozito gerekmez.'"
);

fs.writeFileSync(p, c, 'utf8');
console.log('✓ BookingEngine.tsx updated for all 10 locales!');
