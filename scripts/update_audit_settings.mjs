import fs from 'fs';

const path = 'd:/royal-umrah-cabs/src/lib/settings.ts';
let content = fs.readFileSync(path, 'utf8');

const targetStr = "promo_banner_text: 'Fixed 2026 Umrah Season Rates Available • Free Cancellation up to 24h Before Arrival',";
const replacementStr = `promo_banner_text: 'Approved VIP Umrah Chauffeur Fares • 100% Cash on Arrival & Free Cancellation up to 24h',
  announcement_translations: {
    ar: 'أسعار رحلات العمرة المعتمدة مع سائق خاص VIP • سداد نقدي للسائق وإلغاء مجاني حتى 24 ساعة',
    en: 'Approved VIP Umrah Chauffeur Fares • 100% Cash on Arrival & Free Cancellation up to 24h',
    ms: 'Tambang Pemandu VIP Umrah Rasmi • 100% Tunai Semasa Tiba & Pembatalan Percuma hingga 24 Jam',
    id: 'Tarif Supir VIP Umrah Resmi • 100% Bayar Tunai Saat Tiba & Gratis Pembatalan hingga 24 Jam',
    ur: 'عمرہ زائرین کے لیے وی آئی پی ڈرائیور • آمد پر نقد ادائیگی اور 24 گھنٹے قبل مفت منسوخی',
    fr: 'Tarifs Chauffeur VIP Omra Certifiés • Paiement en Espèces à l’Arrivée & Annulation Gratuite 24h',
    es: 'Tarifas de Chófer VIP Umrah Certificadas • Pago en Efectivo al Llegar y Cancelación Gratuita 24h',
    de: 'Zertifizierte VIP Umrah Chauffeur-Tarife • Barzahlung bei Ankunft & Kostenlose Stornierung bis 24 Std.',
    tr: 'Resmi VIP Umre Şoför Fiyatları • Varışta Nakit Ödeme & 24 Saate Kadar Ücretsiz İptal',
    hi: 'उमरा वीआईपी ड्राइवर दरें • आगमन पर نقد भुगतान और 24 घंटे पहले तक निःशुल्क رद्दीकरण',
  },`;

if (!content.includes(targetStr)) {
  console.error('Target string not found in settings.ts');
  process.exit(1);
}

content = content.replace(targetStr, replacementStr);
fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated settings.ts with evergreen multilingual announcement');
