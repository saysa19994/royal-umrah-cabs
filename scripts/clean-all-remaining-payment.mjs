import fs from 'fs';

console.log('=== CLEANING REMAINING PAYMENT STRINGS ===');

// 1. BookingEngine.tsx: French, Spanish, Turkish paymentDesc
const enginePath = 'D:/royal-umrah-cabs/src/components/booking/BookingEngine.tsx';
let engineCode = fs.readFileSync(enginePath, 'utf8');

engineCode = engineCode.replace(
  `    paymentDesc:\n      'Le paiement est effectué directement auprès de votre chauffeur privé à votre arrivée à destination. Vous pouvez payer en espèces (SAR) ou par carte bancaire sur le terminal du chauffeur. Aucun paiement préalable ni carte bancaire en ligne ne sont requis pour confirmer.',`,
  `    paymentDesc:\n      'Le paiement s’effectue exclusivement en espèces directement auprès de votre chauffeur privé à votre arrivée à destination pour votre trajet. Aucun acompte ni prépaiement n’est requis pour valider cette réservation.',`
);

engineCode = engineCode.replace(
  `    paymentDesc:\n      'El pago se realiza directamente a su chofer privado a la llegada a su destino. Puede pagar en efectivo (SAR) o con tarjeta bancaria en el terminal del chofer. No se requiere tarjeta de crédito en línea ni depósito para asegurar su reserva.',`,
  `    paymentDesc:\n      'El pago se realiza exclusivamente en efectivo directamente a su chofer privado a la llegada a su destino para su viaje. No se requiere ningún anticipo ni depósito para asegurar su reserva.',`
);

engineCode = engineCode.replace(
  `    paymentDesc:\n      'Ödeme, varış noktanıza ulaştığınızda doğrudan özel şoförünüze yapılır. Nakit (SAR) veya şoförün araçtaki POS cihazından banka kartıyla ödeyebilirsiniz. Rezervasyon için online kredi kartı bilgisi veya kapora gerekmez.',`,
  `    paymentDesc:\n      'Ödeme, varış noktanıza ulaştığınızda tamamen nakit olarak doğrudan özel şoförünüze yapılır. Rezervasyon için herhangi bir ön ödeme veya kapora gerekmez.',`
);

fs.writeFileSync(enginePath, engineCode, 'utf8');
console.log('Fixed BookingEngine.tsx FR, ES, TR paymentDesc');

// 2. Dictionaries: es.json, fr.json, ur.json
const esPath = 'D:/royal-umrah-cabs/src/i18n/dictionaries/es.json';
const esDict = JSON.parse(fs.readFileSync(esPath, 'utf8'));
esDict.hero.payOnArrivalNotice = 'Sin depósito previo · Pague al chófer a la llegada en efectivo';
fs.writeFileSync(esPath, JSON.stringify(esDict, null, 2) + '\n', 'utf8');
console.log('Fixed es.json payOnArrivalNotice');

const frPath = 'D:/royal-umrah-cabs/src/i18n/dictionaries/fr.json';
const frDict = JSON.parse(fs.readFileSync(frPath, 'utf8'));
frDict.hero.payOnArrivalNotice = "Aucun acompte requis · Payez le chauffeur à l'arrivée en espèces";
fs.writeFileSync(frPath, JSON.stringify(frDict, null, 2) + '\n', 'utf8');
console.log('Fixed fr.json payOnArrivalNotice');

const urPath = 'D:/royal-umrah-cabs/src/i18n/dictionaries/ur.json';
const urDict = JSON.parse(fs.readFileSync(urPath, 'utf8'));
urDict.hero.payOnArrivalNotice = 'پیشگی رقم کی ضرورت نہیں · آمد پر براہ راست ڈرائیور کو نقد ادائیگی';
fs.writeFileSync(urPath, JSON.stringify(urDict, null, 2) + '\n', 'utf8');
console.log('Fixed ur.json payOnArrivalNotice');

// 3. Footer.tsx: remove conditional card / bank transfer badges
const footerPath = 'D:/royal-umrah-cabs/src/components/layout/Footer.tsx';
let footerCode = fs.readFileSync(footerPath, 'utf8');

footerCode = footerCode.replace(
  `{locale === 'ar' ? 'طريقة الدفع (100% الدفع عند الوصول)' : 'Payment Method (100% Pay on Arrival)'}`,
  `{locale === 'ar' ? 'طريقة الدفع (100% نقداً للسائق عند الوصول)' : 'Payment Method (100% Cash to Chauffeur on Arrival)'}`
);

// Remove the conditional badges block
const condStart = footerCode.indexOf('{/* Conditional Online Card / Mada');
if (condStart !== -1) {
  const condEnd = footerCode.indexOf('</div>\n          </div>\n\n          <div className="flex flex-col gap-1', condStart);
  if (condEnd !== -1) {
    footerCode = footerCode.slice(0, condStart) + footerCode.slice(condEnd);
    console.log('Removed conditional Mada/Visa/BankTransfer spans from Footer.tsx');
  }
}

fs.writeFileSync(footerPath, footerCode, 'utf8');

// 4. cancellation/page.tsx: remove credit card refunds reference
const cancPath = 'D:/royal-umrah-cabs/src/app/[locale]/cancellation/page.tsx';
let cancCode = fs.readFileSync(cancPath, 'utf8');
cancCode = cancCode.replace(
  'you do not need to wait weeks for credit card refunds. If your flight is canceled, modified, or delayed, simply notify our dispatch team on WhatsApp or email to reschedule or cancel without penalty.',
  'you never face refund delays or processing penalties. If your flight is canceled, modified, or delayed, simply notify our dispatch team on WhatsApp or email to reschedule or cancel without penalty.'
);
fs.writeFileSync(cancPath, cancCode, 'utf8');
console.log('Fixed cancellation/page.tsx');

console.log('Done cleaning remaining payment strings!');
