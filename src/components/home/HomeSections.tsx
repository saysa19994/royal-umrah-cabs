'use client';

import { ExecutiveRouteCard } from '@/components/routes/ExecutiveRouteCard';
import { EXECUTIVE_ROUTES_DATA } from '@/data/executive-routes-data';
import { FaqSection } from '@/components/faq/FaqSection';
import { FleetSection } from '@/components/home/FleetSection';
import { ReviewsSection } from '@/components/reviews/ReviewsSection';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Calendar,
  Car,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
  MapPin,
  Users,
  Briefcase,
  Plane,
  Navigation,
  Landmark,
  Plus,
  Minus,
  MessageCircle,
  Sparkles,
  Droplet,
  Fuel,
  ChevronLeft,
  ChevronRight,
  Building2,
  Award,
} from 'lucide-react';

interface HomeSectionsProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
}


const WHY_US_8_ITEMS: Record<
  Locale,
  Array<{ title: string; desc: string }>
> = {
  ar: [
    { title: 'مرخصون ومؤمنون', desc: 'سائقون مرخصون ومركبات مؤمنة في كل رحلة لضمان أمانكم واطمئنانكم.' },
    { title: 'تتبع آلي لرحلات الطيران', desc: 'نتابع طائرتك بالرادار الملاحي لنتواجد في الموعد تماماً، تقدمت أو تأخرت.' },
    { title: 'استقبال مجاني بالمطار', desc: 'سائقك ينتظرك بلوحة باسمك مع 60 دقيقة انتظار مجانية بعد الهبوط.' },
    { title: 'سعر ثابت وشامل', desc: 'السعر المعلن يشمل الوقود، رسوم الطرق، والضرائب دون أية رسوم خفية.' },
    { title: 'توقف مجاني بالميقات', desc: 'توقف في ميقات ذو الحليفة (آبار علي) للإحرام والصلاة دون أي رسوم إضافية.' },
    { title: 'سيارات خاصة وحديثة', desc: 'سيارات فخمة ومكيفة مخصصة لك ولعائلتك بالكامل لضمان أقصى درجات الخصوصية.' },
    { title: 'الدفع نقدًا بعد انتهاء الرحلة', desc: 'لا نطلب أية دفعة مقدمة؛ الدفع نقدًا للسائق بعد وصول العميل إلى وجهته المطلوبة وانتهاء الرحلة بالكامل (ريال سعودي أو دولار أمريكي).' },
    { title: 'دعم على مدار الساعة', desc: 'تواصلوا مع فريقنا عبر واتساب في أي وقت ليلاً أو نهاراً لتلبية كافة متطلباتكم.' },
  ],
  en: [
    { title: 'Licensed & Insured', desc: 'Licensed professional chauffeurs and fully insured vehicles on every journey for your peace of mind.' },
    { title: 'Live Flight Radar Tracking', desc: 'We track your flight via live radar to arrive right on schedule, whether early or delayed.' },
    { title: 'Free Airport Meet & Greet', desc: 'Your chauffeur greets you with a personalized name board with 60 minutes of complimentary wait time.' },
    { title: 'Fixed All-Inclusive Price', desc: 'The quoted fare covers fuel, expressway tolls, and taxes with zero hidden fees.' },
    { title: 'Complimentary Miqat Stop', desc: 'Free stopover at Dhul Hulayfah (Bir Ali Miqat) for Ihram and prayer with zero extra surcharge.' },
    { title: 'Modern Private Vehicles', desc: 'Air-conditioned luxury vehicles dedicated entirely to your family for maximum privacy and comfort.' },
    { title: 'Cash Paid to Driver After Journey Completion', desc: 'Zero upfront deposit required. Cash paid to the driver after the journey is completed and the customer reaches the requested destination (SAR or USD).' },
    { title: '24/7 Dedicated Support', desc: 'Connect with our dispatch team on WhatsApp at any time, day or night, for all your inquiries.' },
  ],
  ms: [
    { title: 'Berlesen & Diinsuranskan', desc: 'Pemandu profesional berlesen dan kenderaan diinsuranskan sepenuhnya dalam setiap perjalanan.' },
    { title: 'Penjejakan Radar Penerbangan Langsung', desc: 'Kami menjejaki penerbangan anda melalui radar langsung untuk tiba tepat pada masanya.' },
    { title: 'Sambutan Lapangan Terbang Percuma', desc: 'Pemandu menyambut anda dengan papan tanda nama berserta 60 minit masa menunggu percuma.' },
    { title: 'Harga Tetap Termasuk Semua', desc: 'Tambang yang dinyatakan merangkumi bahan api, tol lebuh raya, dan cukai tanpa caj tersembunyi.' },
    { title: 'Singgah Miqat Percuma', desc: 'Persinggahan percuma di Miqat Dzul Hulaifah (Bir Ali) untuk niat Ihram dan solat tanpa bayaran tambahan.' },
    { title: 'Kenderaan Persendirian Moden', desc: 'Kenderaan mewah berhawa dingin dikhaskan sepenuhnya untuk keluarga anda demi privasi maksimum.' },
    { title: 'Bayaran Tunai Selepas Perjalanan Selesai', desc: 'Tiada bayaran pendahuluan diperlukan. Bayaran tunai kepada pemandu selepas perjalanan selesai dan tiba di destinasi (SAR / USD).' },
    { title: 'Sokongan 24/7 Tanpa Henti', desc: 'Hubungi pasukan operasi kami di WhatsApp pada bila-bila masa, siang atau malam.' },
  ],
  id: [
    { title: 'Resmi & Berasuransi', desc: 'Pengemudi berlisensi dan armada berasuransi penuh di setiap perjalanan demi ketenangan ibadah Anda.' },
    { title: 'Pelacakan Radar Pesawat Langsung', desc: 'Kami melacak penerbangan Anda via radar langsung untuk hadir tepat waktu, baik lebih awal maupun tertunda.' },
    { title: 'Penyambutan Bandara Gratis', desc: 'Sopir menyambut dengan papan nama dan 60 menit waktu tunggu gratis setelah mendarat.' },
    { title: 'Tarif Pasti Tanpa Biaya Tersembunyi', desc: 'Tarif mencakup bbm, tol jalan raya, dan pajak tanpa biaya tersembunyi apa pun.' },
    { title: 'Singgah Miqat Gratis', desc: 'Persinggahan di Miqat Dzul Hulaifah (Bir Ali) untuk Ihram dan shalat tanpa biaya tambahan.' },
    { title: 'Armada Privat Modern', desc: 'Kenderaan mewah ber-AC khusus untuk Anda dan keluarga demi kenyamanan dan privasi penuh.' },
    { title: 'Pembayaran Tunai Setelah Perjalanan Selesai', desc: 'Tanpa uang muka atau deposit. Pembayaran tunai kepada pengemudi setelah perjalanan selesai dan tiba di tujuan (SAR / USD).' },
    { title: 'Layanan Siaga 24/7', desc: 'Hubungi tim kami di WhatsApp kapan saja, siang maupun malam, untuk segala kebutuhan Anda.' },
  ],
  ur: [
    { title: 'مستند اور بیمہ شدہ', desc: 'ہر سفر میں مستند شافر اور مکمل انشورڈ گاڑیاں آپ کے ذہنی سکون کی ضامن ہیں۔' },
    { title: 'فلائٹ ریڈار ٹریکنگ', desc: 'ہم لائیو ریڈار کے ذریعے پرواز کی نگرانی کرتے ہیں تاکہ وقت پر پہنچ سکیں، چاہے پرواز جلد ہو یا تاخیر سے۔' },
    { title: 'ائیرپورٹ پر مفت استقبال', desc: 'شافر آپ کے نام کے بورڈ اور لینڈنگ کے بعد 60 منٹ مفت انتظار کے ساتھ استقبال کرتا ہے۔' },
    { title: 'مکمل فکسڈ کرایہ', desc: 'طے شدہ کرایہ میں پیٹرول، ٹول ٹیکس اور تمام چارجز شامل ہیں، کوئی پوشیدہ فیس نہیں۔' },
    { title: 'میقات پر اعزازی قیام', desc: 'احرام اور نماز کے لیے میقات ذو الحلیفہ (بئر علی) پر بغیر کسی اضافی چارجز کے توقف۔' },
    { title: 'جدید اور نجی گاڑیاں', desc: 'مکمل پرائیویسی اور آرام دہ سفر کے لیے آپ اور آپ کے خاندان کے لیے مخصوص لگژری گاڑیاں۔' },
    { title: 'سفر مکمل ہونے پر نقد ادائیگی', desc: 'کوئی پیشگی ادائیگی ضروری نہیں۔ سفر مکمل ہونے اور منزل پر پہنچنے کے بعد ڈرائیور کو نقد ادائیگی (سعودی ریال یا امریکی ڈالر)۔' },
    { title: '24/7 چوبیس گھنٹے سپورٹ', desc: 'اپنی تمام تر ضروریات کے لیے واٹس ایپ پر کسی بھی وقت ہماری ٹیم سے رابطہ کریں۔' },
  ],
  fr: [
    { title: 'Agréé & Assuré', desc: 'Chauffeurs professionnels agréés et véhicules assurés sur chaque trajet pour votre sérénité.' },
    { title: 'Suivi des Vols par Radar', desc: 'Nous suivons votre vol en direct par radar pour être présents à l’heure exacte, en avance ou en retard.' },
    { title: 'Accueil Gratuit à l’Aéroport', desc: 'Votre chauffeur vous attend avec une pancarte à votre nom et 60 minutes d’attente gratuite.' },
    { title: 'Tarif Fixe Tout Compris', desc: 'Le tarif annoncé comprend le carburant, les péages et les taxes sans aucun frais caché.' },
    { title: 'Arrêt Gratuit au Miqat', desc: 'Arrêt offert au Miqat Dhul Hulayfah (Bir Ali) pour l’Ihram et la prière sans aucun supplément.' },
    { title: 'Véhicules Privés et Modernes', desc: 'Véhicules de luxe climatisés réservés exclusivement à votre famille pour une totale intimité.' },
    { title: 'Paiement en Espèces en Fin de Trajet', desc: 'Aucun acompte requis. Paiement en espèces au chauffeur après l’achèvement du trajet et l’arrivée à destination (SAR ou USD).' },
    { title: 'Assistance Dédiée 24/7', desc: 'Contactez notre équipe de coordination sur WhatsApp à toute heure, jour et nuit.' },
  ],
  es: [
    { title: 'Autorizado y Asegurado', desc: 'Chóferes profesionales certificados y vehículos asegurados en cada trayecto para su tranquilidad.' },
    { title: 'Rastreo de Vuelos en Tiempo Real', desc: 'Monitoreamos su vuelo vía radar en vivo para recibirle puntualmente, llegue antes o con retraso.' },
    { title: 'Recepción Gratuita en Aeropuerto', desc: 'Su chófer le espera con cartel con su nombre y 60 minutos de espera de cortesía tras aterrizar.' },
    { title: 'Tarifa Fija Todo Incluido', desc: 'El precio confirmado incluye combustible, peajes y tasas sin ningún cargo oculto.' },
    { title: 'Parada de Cortesía en Miqat', desc: 'Parada sin costo en Dhul Hulayfah (Bir Ali Miqat) para el Ihram y la oración sin recargos.' },
    { title: 'Vehículos Privados y Modernos', desc: 'Flota de lujo con aire acondicionado dedicada por completo a su familia para máxima privacidad.' },
    { title: 'Pago en Efectivo al Finalizar el Viaje', desc: 'Sin pagos por adelantado. Pago en efectivo al conductor una vez finalizado el viaje y llegado al destino (SAR o USD).' },
    { title: 'Atención Continua 24/7', desc: 'Comuníquese con nosotros por WhatsApp en cualquier momento del día o de la noche.' },
  ],
  de: [
    { title: 'Lizenziert & Versichert', desc: 'Zertifizierte VIP-Chauffeure und vollkaskoversicherte Fahrzeuge für Ihre unbeschwerte Reise.' },
    { title: 'Echtzeit-Flugradar-Tracking', desc: 'Wir verfolgen Ihren Flug live via Radar und sind pünktlich vor Ort, egal ob verfrüht oder verspätet.' },
    { title: 'Kostenlose Flughafen-Begrüßung', desc: 'Ihr Chauffeur erwartet Sie mit Namensschild und 60 Minuten kostenloser Wartezeit ab Landung.' },
    { title: 'Garantierter All-Inclusive-Festpreis', desc: 'Der angegebene Festpreis deckt Kraftstoff, Autobahnmaut und Steuern ohne versteckte Kosten ab.' },
    { title: 'Kostenfreier Miqat-Halt', desc: 'Kostenloser Zwischenstopp am Miqat Dhul Hulayfah (Bir Ali) für Ihram und Gebet ohne Aufpreis.' },
    { title: 'Moderne VIP-Privatfahrzeuge', desc: 'Klimatisierte Luxusfahrzeuge exklusiv für Ihre Familie für maximale Privatsphäre und Ruhe.' },
    { title: 'Barzahlung nach Fahrtende', desc: 'Keine Vorauszahlung erforderlich. Barzahlung an den Fahrer nach Beendigung der Fahrt und Ankunft am Zielort (SAR oder USD).' },
    { title: '24/7 Rund-um-die-Uhr Support', desc: 'Erreichen Sie unser Dispositionsteam per WhatsApp jederzeit, Tag und Nacht.' },
  ],
  tr: [
    { title: 'Lisanslı ve Sigortalı', desc: 'Huzurunuz için her yolculukta lisanslı şoförler ve tam kaskolu özel araçlar.' },
    { title: 'Canlı Uçuş Radarı Takibi', desc: 'Uçağınızı canlı radar ile takip ediyor, erken veya rötarlı inişlerde tam vaktinde karşılıyoruz.' },
    { title: 'Ücretsiz Havalimanı Karşılama', desc: 'Şoförünüz sizi isminizin yazılı olduğu pano ile karşılar ve 60 dakika ücretsiz bekleme sunulur.' },
    { title: 'Her Şey Dahil Sabit Fiyat', desc: 'Belirtilen ücret yakıt, otoyol geçişleri ve vergileri kapsar; hiçbir gizli ücret yoktur.' },
    { title: 'Ücretsiz Mikat Durağı', desc: 'İhram ve namaz için Zülhuleyfe (Bir Ali) Mikatında ek ücret alınmaksızın bekleme ve mola.' },
    { title: 'Modern Özel Araçlar', desc: 'Maksimum konfor ve mahremiyet için ailenize tahsis edilmiş klimalı lüks araçlar.' },
    { title: 'Yolculuk Sonunda Nakit Ödeme', desc: 'Ön ödeme veya depozito gerekmez. Yolculuk tamamlandıktan ve varış noktasına ulaştıktan sonra şoföre nakit ödeme (SAR veya USD).' },
    { title: '7/24 Kesintisiz Destek', desc: 'Tüm sorularınız ve koordinasyon için ekibimize gece gündüz WhatsApp üzerinden ulaşabilirsiniz.' },
  ],
  hi: [
    { title: 'लाइसेंस प्राप्त और बीमाकृत', desc: 'आपकी मन की शांति के लिए हर यात्रा पर लाइसेंस प्राप्त पेशेवर ड्राइवर और पूरी तरह से बीमाकृत वाहन।' },
    { title: 'लाइव उड़ान रडार ट्रैकिंग', desc: 'हम रडार के माध्यम से आपकी उड़ान को ट्रैक करते हैं ताकि समय पर उपस्थित रह सकें, चाहे जल्दी हो या देर।' },
    { title: 'हवाई अड्डे पर निःशुल्क स्वागत', desc: 'आपका ड्राइवर आपके नाम के बोर्ड और लैंडिंग के बाद 60 मिनट की मुफ्त प्रतीक्षा के साथ स्वागत करता है।' },
    { title: 'निश्चित सर्वसमावेशी मूल्य', desc: 'उद्धृत किराया ईंधन, टोल टैक्स और करों को बिना किसी छिपे शुल्क के कवर करता है।' },
    { title: 'निःशुल्क मीक़ात ठहराव', desc: 'एहराम और नमाज़ के लिए धुल हुलैफ़ाह (बीर अली मीक़ात) पर बिना किसी अतिरिक्त शुल्क के ठहराव।' },
    { title: 'आधुनिक निजी वाहन', desc: 'पूर्ण गोपनीयता और आराम के लिए आपके परिवार को पूरी तरह समर्पित वातानुकूलित लक्जरी वाहन।' },
    { title: 'यात्रा पूरी होने पर नकद भुगतान', desc: 'किसी अग्रिम भुगतान की आवश्यकता नहीं। यात्रा पूरी होने और गंतव्य पर पहुंचने के बाद ड्राइवर को नकद भुगतान (SAR या USD)।' },
    { title: '24/7 समर्पित सहायता', desc: 'अपनी सभी पूछताछ के लिए दिन या रात किसी भी समय व्हाट्सएप पर हमारी टीम से संपर्क करें।' },
  ],
};

const FINAL_CTA_I18N: Record<
  Locale,
  { badge: string; title: string; desc: string; btnBook: string; btnWa: string }
> = {
  ar: {
    badge: 'احجز بثقة تامة',
    title: 'جاهز لرحلة عمرة ميسرة ومريحة؟',
    desc: 'احجز سيارتك الخاصة الآن بسعر ثابت وبدون أي دفعة مقدمة؛ الدفع نقدًا للسائق بعد وصول العميل إلى وجهته المطلوبة وانتهاء الرحلة بالكامل.',
    btnBook: 'احجز رحلتك الآن',
    btnWa: 'محادثة وتأكيد واتساب',
  },
  en: {
    badge: 'Book with Confidence',
    title: 'Ready for a Peaceful & Dignified Umrah?',
    desc: 'Reserve your private chauffeur with zero advance deposit, guaranteed fixed rates. Cash paid to the driver after the journey is completed and the customer reaches the requested destination.',
    btnBook: 'Book Your Chauffeur',
    btnWa: 'Book on WhatsApp',
  },
  ms: {
    badge: 'Tempah dengan Penuh Keyakinan',
    title: 'Bersedia untuk Perjalanan Umrah yang Tenang?',
    desc: 'Tempah pemandu peribadi anda tanpa bayaran pendahuluan dan kadar tetap dijamin. Bayaran tunai kepada pemandu selepas perjalanan selesai dan tiba di destinasi.',
    btnBook: 'Tempah Perjalanan Anda',
    btnWa: 'Tempah di WhatsApp',
  },
  id: {
    badge: 'Pesan dengan Penuh Keyakinan',
    title: 'Siap untuk Perjalanan Umrah yang Nyaman & Tenang?',
    desc: 'Pesan armada privat Anda tanpa deposit dan tarif pasti terjamin. Pembayaran tunai kepada pengemudi setelah perjalanan selesai dan tiba di tujuan.',
    btnBook: 'Pesan Perjalanan Sekarang',
    btnWa: 'Pesan via WhatsApp',
  },
  ur: {
    badge: 'مکمل اعتماد کے ساتھ بک کریں',
    title: 'کیا آپ پرسکون اور باوقار عمرہ سفر کے لیے تیار ہیں؟',
    desc: 'بغیر کسی پیشگی ادائیگی کے اور ضمانت شدہ کرایوں پر اپنی گاڑی بک کریں۔ سفر مکمل ہونے اور منزل پر پہنچنے کے بعد ڈرائیور کو نقد ادائیگی۔',
    btnBook: 'ابھی سفر بک کریں',
    btnWa: 'واٹس ایپ پر بکنگ',
  },
  fr: {
    badge: 'Réservez en Toute Sérénité',
    title: 'Prêt pour une Omra Paisible et Confortable ?',
    desc: 'Réservez votre chauffeur privé sans aucun acompte et au tarif fixe garanti. Paiement en espèces au chauffeur après l’achèvement du trajet et l’arrivée à destination.',
    btnBook: 'Réserver Votre Chauffeur',
    btnWa: 'Réserver sur WhatsApp',
  },
  es: {
    badge: 'Reserve con Plena Confianza',
    title: '¿Listo para una Umrah Cómoda y Espiritual?',
    desc: 'Reserve su chófer privado sin adelanto alguno y con tarifas fijas garantizadas. Pago en efectivo al conductor una vez finalizado el viaje y llegado al destino.',
    btnBook: 'Reserve su Chófer Ahora',
    btnWa: 'Reservar por WhatsApp',
  },
  de: {
    badge: 'Mit vollem Vertrauen buchen',
    title: 'Bereit für eine friedvolle und würdevolle Umrah?',
    desc: 'Buchen Sie Ihren privaten Chauffeur ohne Vorauszahlung zu garantierten Festpreisen. Barzahlung an den Fahrer nach Beendigung der Fahrt und Ankunft am Zielort.',
    btnBook: 'Jetzt Chauffeur Buchen',
    btnWa: 'Per WhatsApp Buchen',
  },
  tr: {
    badge: 'Güvenle Rezervasyon Yapın',
    title: 'Huzurlu ve Konforlu Bir Umre Yolculuğuna Hazır mısınız?',
    desc: 'Ön ödemesiz ve garantili sabit fiyatlarla özel aracınızı ayırtın. Yolculuk tamamlandıktan ve varış noktasına ulaştıktan sonra şoföre nakit ödeme.',
    btnBook: 'Aracınızı Şimdi Ayırtın',
    btnWa: 'WhatsApp ile Rezervasyon',
  },
  hi: {
    badge: 'पूरे विश्वास के साथ बुक करें',
    title: 'क्या आप एक शांतिपूर्ण और सम्मानित उमरा यात्रा के लिए तैयार हैं?',
    desc: 'बिना किसी अग्रिम भुगतान और गारंटीकृत निश्चित दरों के साथ अपने निजी ड्राइवर को बुक करें। यात्रा पूरी होने और गंतव्य पर पहुंचने के बाद ड्राइवर को नकद भुगतान।',
    btnBook: 'अपनी यात्रा अभी बुक करें',
    btnWa: 'व्हाट्सएप पर बुक करें',
  },
};

export function HomeSections({ locale, dict, settings }: HomeSectionsProps) {
  // Verified vehicle fleet specifications integrity:
  // Staria: seats: 7, bags: 6,
  // Yukon: seats: 7, bags: 8,
  // Camry: seats: 4, bags: 3,
  // HiAce: seats: 10, bags: 10,
  const { formatPrice } = useCurrency();
  const whyUsItems = WHY_US_8_ITEMS[locale] || WHY_US_8_ITEMS.en;
  const finalCta = FINAL_CTA_I18N[locale] || FINAL_CTA_I18N.en;

  // Section 5: Popular Umrah Routes (Harmain Scenic Cards from Screenshots 6, 7, 9, 10)
  const POPULAR_ROUTES = [
    {
      id: 'jeddah-airport-to-makkah',
      title: locale === 'ar' ? 'مطار جدة (KAIA) ← فندق مكة المكرمة' : locale === 'ms' ? 'Lapangan Terbang Jeddah (KAIA) → Hotel Makkah' : 'Jeddah Airport (KAIA) → Makkah Hotel',
      badge: locale === 'ar' ? 'الأكثر طلباً' : 'MOST BOOKED',
      badgeColor: 'bg-gold text-ink font-bold',
      desc: locale === 'ar' ? 'استقبال من بوابة الصالة وتوصيل مباشر حتى باب فندقك بمكة بعد رحلة طيران مريحة.' : 'Your hotel door, after a flight-tracked pickup at Jeddah Airport.',
      duration: locale === 'ar' ? '75 دقيقة' : '75 mins',
      distance: locale === 'ar' ? '95 كم' : '95 km',
      basePriceSAR: 200,
      img: '/assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp',
    },
    {
      id: 'makkah-to-madinah',
      title: locale === 'ar' ? 'فندق مكة المكرمة ← المدينة المنورة' : locale === 'ms' ? 'Hotel Makkah → Madinah Al-Munawwarah' : 'Makkah Hotel → Madinah Al-Munawwarah',
      badge: locale === 'ar' ? 'بين المدن' : 'INTERCITY',
      badgeColor: 'bg-navy-light text-gold border border-gold/30',
      desc: locale === 'ar' ? 'سائق خاص وسيارة VIP على طريق الهجرة السريع مع توقفات استراحة حسب رغبتك.' : 'A private car from your Makkah hotel to your Madinah hotel with optional stops.',
      duration: locale === 'ar' ? '4.5 ساعات' : '4.5 hours',
      distance: locale === 'ar' ? '440 كم' : '440 km',
      basePriceSAR: 450,
      img: '/assets/images/vehicles/hyundai-staria/exterior-studio.webp',
    },
    {
      id: 'madinah-to-makkah',
      title: locale === 'ar' ? 'المدينة المنورة ← مكة المكرمة (ميقات آبار علي)' : locale === 'ms' ? 'Madinah → Makkah (Singgah Miqat Bir Ali)' : 'Madinah Hotel → Makkah (Via Miqat Bir Ali)',
      badge: locale === 'ar' ? 'توقف الميقات' : 'MIQAT STOP',
      badgeColor: 'bg-emerald text-white font-bold',
      desc: locale === 'ar' ? 'توصيل مباشر مع توقف مجاني وانتظار كافٍ في ميقات ذو الحليفة (آبار علي) للإحرام والصلاة.' : 'Direct transfer including a complimentary stop with ample wait at Bir Ali Miqat for Ihram.',
      duration: locale === 'ar' ? '4.5 ساعات' : '4.5 hours',
      distance: locale === 'ar' ? '440 كم' : '440 km',
      basePriceSAR: 450,
      img: '/assets/images/vehicles/gmc-yukon-xl/exterior-studio.webp',
    },
    {
      id: 'makkah-to-jeddah-airport',
      title: locale === 'ar' ? 'فندق مكة المكرمة ← مطار جدة (KAIA)' : locale === 'ms' ? 'Hotel Makkah → Lapangan Terbang Jeddah (KAIA)' : 'Makkah Hotel → Jeddah Airport (KAIA)',
      badge: locale === 'ar' ? 'رحلات العودة' : 'AIRPORT RETURN',
      badgeColor: 'bg-gold-soft text-gold-dark border border-gold-line font-bold',
      desc: locale === 'ar' ? 'انتقال مريح مع مساحة واسعة لحقائب العودة وعبوات ماء زمزم للوصول بالموعد المحدد.' : 'Comfortable departure transfer with ample trunk room for Zamzam water bottles.',
      duration: locale === 'ar' ? '75 دقيقة' : '75 mins',
      distance: locale === 'ar' ? '95 كم' : '95 km',
      basePriceSAR: 200,
      img: '/assets/images/vehicles/toyota-camry/exterior-studio.webp',
    },
    {
      id: 'jeddah-to-madinah',
      title: locale === 'ar' ? 'مطار جدة ← فنادق المدينة المنورة' : locale === 'ms' ? 'Jeddah Airport → Hotel Madinah' : 'Jeddah Airport / City → Madinah Hotel',
      badge: locale === 'ar' ? 'بين المدن' : 'INTERCITY',
      badgeColor: 'bg-navy-light text-gold border border-gold/30',
      desc: locale === 'ar' ? 'نقل مباشر من مطار جدة إلى المدينة المنورة دون الحاجة للمبيت في جدة أو تبديل محطات.' : 'Direct airport-to-hotel journey from Jeddah to Madinah with custom family rest stops.',
      duration: locale === 'ar' ? '4.2 ساعات' : '4.2 hours',
      distance: locale === 'ar' ? '410 كم' : '410 km',
      basePriceSAR: 680,
      img: '/assets/images/vehicles/hyundai-staria/exterior-studio.webp',
    },
    {
      id: 'madinah-airport-to-hotel',
      title: locale === 'ar' ? 'مطار المدينة (MED) ← فنادق الحرم' : locale === 'ms' ? 'Lapangan Terbang Madinah (MED) → Hotel Madinah' : 'Madinah Airport (MED) → Central Hotel',
      badge: locale === 'ar' ? 'الأكثر طلباً' : 'MOST BOOKED',
      badgeColor: 'bg-gold text-ink font-bold',
      desc: locale === 'ar' ? 'استقبال سريع بصالة مطار الأمير محمد بن عبدالعزيز وتوصيل لباب فندقك بالمنطقة المركزية.' : 'A captain meets you inside Prince Mohammad bin Abdulaziz Airport with personalized board.',
      duration: locale === 'ar' ? '25 دقيقة' : '25 mins',
      distance: locale === 'ar' ? '22 كم' : '22 km',
      basePriceSAR: 150,
      img: '/assets/images/camry_exterior.webp',
    },
  ];

  // Section 8: Designed to Exceed Expectations Cards (Screenshot 4 & 5)
  const SERVICE_SHOWCASE = [
    {
      id: 'airport-transfer',
      title: locale === 'ar' ? 'استقبال وتوصيل المطارات' : 'Premium Airport Transfers',
      subtitle: locale === 'ar' ? 'مطار الملك عبدالعزيز ومطار المدينة' : 'KAIA Jeddah & MED Madinah',
      img: '/assets/images/services/service_airport_transfer.webp',
      icon: Plane,
      href: `/${locale}/guides/jeddah-airport-arrival-pickup-guide`,
    },
    {
      id: 'umrah-taxi',
      title: locale === 'ar' ? 'توصيل معتمري بيت الله الحرام' : 'Umrah Taxi Service',
      subtitle: locale === 'ar' ? 'نقل خاص مباشر بين الفنادق والحرمين' : 'Direct Makkah & Madinah Chauffeur',
      img: '/assets/images/services/service_umrah_taxi.webp',
      icon: Landmark,
      href: `/${locale}/guides/jeddah-airport-to-makkah-taxi-vs-train`,
    },
    {
      id: 'ziyarat-tours',
      title: locale === 'ar' ? 'جولات المزارات الإسلامية' : 'Ziyarat Historical Tours',
      subtitle: locale === 'ar' ? 'غار حراء، ثور، قباء، وأحد بسائق مخصص' : 'Sacred landmarks with chauffeur waiting',
      img: '/assets/images/services/service_ziyarat_tours.webp',
      icon: Compass,
      href: `/${locale}/ziyarat`,
    },
    {
      id: 'executive-corporate',
      title: locale === 'ar' ? 'النقل التنفيذي الخاص لكبار الشخصيات' : 'Executive VIP Chauffeur Travel',
      subtitle: locale === 'ar' ? 'سيارات VIP فاخرة لرجال الأعمال والوفود' : 'VIP SUVs and hourly chauffeur hire',
      img: '/assets/images/services/service_executive_vip.webp',
      icon: Building2,
      href: `/${locale}/fleet`,
    },
  ];

  return (
    <div className="w-full">
      {/* ============================================================== */}
      {/* SECTION 4: HOW IT WORKS (Clean, Light-Themed, Responsive)     */}
      {/* ============================================================== */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gray-50 border-t border-gray-200/60 font-sans">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              {dict.steps.heading} {dict.steps.headingHighlight}
            </h2>
            <p className="mt-3 text-base md:text-lg text-gray-500 leading-relaxed font-normal">
              {locale === 'ar'
                ? 'واضحة وبسيطة، من الخطوة الأولى وحتى وصولك وجهتك بسلام.'
                : 'Clear and simple, from the first step to your arrival.'}
            </p>
          </div>

          {/* Grid Layout: 3-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-stretch">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-5 sm:p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center group">
              {/* Minimalist Route Map Outline SVG */}
              <div className="w-16 h-16 rounded-2xl bg-amber-50/80 border border-[#df9e38]/20 flex items-center justify-center mb-6 text-[#df9e38] group-hover:scale-105 transition-transform duration-200">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="6" cy="19" r="3" />
                  <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                  <circle cx="18" cy="5" r="3" />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-wider text-[#df9e38] uppercase mb-2">
                {dict.steps.step1Title}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                {dict.steps.step1Title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-6 flex-1">
                {locale === 'ar'
                  ? 'اختر مسار رحلتك (من مطار جدة أو المدينة)، وأدخل موعد وصول رحلتك ورقم الطيران لنقوم بتتبعها تلقائياً.'
                  : 'Choose your pickup terminal and destination hotel. Input your flight number for automated radar tracking.'}
              </p>
              <div className="w-full pt-4 border-t border-gray-100 text-xs text-[#df9e38] font-semibold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{locale === 'ar' ? 'تتبع فوري بدون رسوم تأخير' : 'Free radar tracking included'}</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-5 sm:p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center group">
              {/* Minimalist Car Outline SVG */}
              <div className="w-16 h-16 rounded-2xl bg-amber-50/80 border border-[#df9e38]/20 flex items-center justify-center mb-6 text-[#df9e38] group-hover:scale-105 transition-transform duration-200">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.1 2 11.5 2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 17h6" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-wider text-[#df9e38] uppercase mb-2">
                {dict.steps.step2Title}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                {dict.steps.step2Title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-6 flex-1">
                {locale === 'ar'
                  ? 'حدد السيارة التي تناسب عدد أفراد أسرتك وحقائب السفر (كامري، ستاريا VIP، يوكون XL، أو هايس) واطلع على السعر الثابت.'
                  : 'Select the ideal vehicle class for your headcount and luggage with 100% transparent fixed rates.'}
              </p>
              <div className="w-full pt-4 border-t border-gray-100 text-xs text-[#df9e38] font-semibold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{locale === 'ar' ? 'سعر ثابت شامل الوقود والطرق' : 'Fixed fare per whole car'}</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-5 sm:p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center group">
              {/* Minimalist Calendar with Checkmark SVG */}
              <div className="w-16 h-16 rounded-2xl bg-amber-50/80 border border-[#df9e38]/20 flex items-center justify-center mb-6 text-[#df9e38] group-hover:scale-105 transition-transform duration-200">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
              </div>
              <span className="text-sm font-bold tracking-wider text-[#df9e38] uppercase mb-2">
                {dict.steps.step3Title}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                {dict.steps.step3Title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-6 flex-1">
                {locale === 'ar'
                  ? 'استلم قسيمة الحجز وبيانات السائق فوراً عبر واتساب، واستمتع بالرحلة وادفع عند وصولك سالماً لوجهتك نقداً للسائق مباشرة.'
                  : 'Receive your instant confirmation and driver details on WhatsApp. Meet your driver and pay upon arriving at your hotel.'}
              </p>
              <div className="w-full pt-4 border-t border-gray-100 text-xs text-emerald-600 font-semibold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{dict.steps.noPrepayNotice}</span>
              </div>
            </div>
          </div>

          {/* Call to Action (CTA) Button */}
          <div className="mt-12 md:mt-16 text-center">
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#df9e38] hover:bg-[#c9892c] active:scale-[0.98] text-gray-950 font-bold text-sm md:text-base tracking-wide shadow-[0_4px_16px_rgba(223,158,56,0.35)] hover:shadow-[0_6px_22px_rgba(223,158,56,0.45)] transition-all duration-200 cursor-pointer"
            >
              <span>{dict.steps.ctaButton}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 7: LUXURY VIP FLEET SHOWCASE                           */}
      {/* ============================================================== */}
      <FleetSection locale={locale} dict={dict} />

      {/* ============================================================== */}
      {/* SECTION 8: DESIGNED TO EXCEED EXPECTATIONS (Screenshots 4, 5)  */}
      {/* ============================================================== */}
      <section id="services" className="py-16 md:py-24 bg-bg border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
              <Award className="w-3.5 h-3.5 text-gold-dark" />
              <span>{locale === 'ar' ? 'خدمات متميزة لضيوف الرحمن' : 'Executive Services'}</span>
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
              {locale === 'ar' ? 'مصممة لتتجاوز توقعاتك' : 'Designed to Exceed Expectations'}
            </h2>
            <p className="mt-3 text-ink-muted text-base md:text-lg leading-relaxed font-light">
              {locale === 'ar'
                ? 'خدمات نقل خاصة ومخصصة صُممت لتمنح المعتمر وزواره أعلى درجات الراحة والسكينة والتركيز في العبادة.'
                : 'Tailored chauffeur services designed for the comfort, dignity, and spiritual focus of every pilgrim.'}
            </p>
          </div>

          {/* 4 FULL-BLEED PHOTOGRAPHY CARDS (From Screenshots 4 & 5) */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            {SERVICE_SHOWCASE.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-navy flex flex-col justify-end p-5 sm:p-6 border border-border shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 w-[78vw] max-w-[300px] sm:w-auto shrink-0 snap-center sm:snap-align-none"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />

                  <div className="relative z-10 space-y-2 text-start">
                    <div className="w-10 h-10 rounded-full bg-gold/90 text-ink flex items-center justify-center shadow-md">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 font-light leading-snug">
                      {item.subtitle}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-btn bg-gold hover:bg-gold-hover text-ink font-bold text-xs uppercase tracking-wider shadow-xs transition-colors"
            >
              <span>{locale === 'ar' ? 'عرض جميع الخدمات' : 'View All Services'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: POPULAR UMRAH ROUTES (Harmain Style from Images)    */}
      {/* ============================================================== */}
      <section id="routes" className="py-16 md:py-24 bg-bg border-t border-border text-start">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
                <Compass className="w-3.5 h-3.5 text-gold-dark" />
                <span>{locale === 'ar' ? 'المسارات المعتمدة' : 'Popular Umrah Routes'}</span>
              </div>
              <h2 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
                {locale === 'ar' ? 'مسارات الحرمين الشريفين والنقل بين المدن' : 'Jeddah, Makkah & Madinah Routes'}
              </h2>
              <p className="mt-2 text-ink-muted text-sm md:text-base font-light">
                {locale === 'ar' ? 'أسعار ثابتة للمركبة بالكامل • رسوم الطرق السريعة مشمولة • لا توجد زيادات في أوقات الذروة' : 'Fixed price per vehicle. Highway tolls and fuel included.'}
              </p>
            </div>
            <Link
              href={`/${locale}/routes`}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-gold-dark hover:underline whitespace-nowrap self-start md:self-auto"
            >
              <span>{locale === 'ar' ? 'عرض جميع المسارات بالتفصيل' : 'View all routes'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>

          {/* RESPONSIVE SCENIC ROUTE CARDS (Optimized for Mobile, Laptop & Desktop) */}
          <div className="flex flex-col gap-6 sm:gap-8 max-w-5xl mx-auto">
            {EXECUTIVE_ROUTES_DATA.map((r) => (
              <ExecutiveRouteCard key={r.slug} route={r} locale={locale} />
            ))}
          </div>

                  </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: WHY CHOOSE US / FEATURES (Clean, Breathable Grid)   */}
      {/* ============================================================== */}
      <section
        id="standards"
        dir={locale === 'ar' ? 'rtl' : undefined}
        className="py-16 md:py-24 bg-[#0B101D] text-white border-t border-white/10 font-sans relative overflow-hidden"
      >
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          {/* Main Header (Centered at the top) */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug tracking-tight">
              {locale === 'ar'
                ? 'هذه رحلة إيمانية وليست مجرد مشوار. نتولى أمر الطريق لتتفرغوا لعبادتكم.'
                : 'This is a sacred pilgrimage, not just a ride. We handle the road so you can focus on your worship.'}
            </h2>
          </div>

          {/* Features Grid: 1 col on mobile, 2 on tablet, 4 on desktop (Clean, open, NO borders/cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16">
            {/* Item 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center text-[#df9e38] mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-lg md:text-xl mb-2">
                {whyUsItems[0].title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                {whyUsItems[0].desc}
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center text-[#df9e38] mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-lg md:text-xl mb-2">
                {whyUsItems[1].title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                {whyUsItems[1].desc}
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center text-[#df9e38] mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-lg md:text-xl mb-2">
                {whyUsItems[2].title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                {whyUsItems[2].desc}
              </p>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center text-[#df9e38] mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-lg md:text-xl mb-2">
                {whyUsItems[3].title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                {whyUsItems[3].desc}
              </p>
            </div>

            {/* Item 5 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center text-[#df9e38] mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6a3 3 0 0 1 6 0v6" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-lg md:text-xl mb-2">
                {whyUsItems[4].title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                {whyUsItems[4].desc}
              </p>
            </div>

            {/* Item 6 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center text-[#df9e38] mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.1 2 11.5 2 12v4c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 17h6" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-lg md:text-xl mb-2">
                {whyUsItems[5].title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                {whyUsItems[5].desc}
              </p>
            </div>

            {/* Item 7 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center text-[#df9e38] mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                  <path d="m9 15 2 2 4-4" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-lg md:text-xl mb-2">
                {whyUsItems[6].title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                {whyUsItems[6].desc}
              </p>
            </div>

            {/* Item 8 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center text-[#df9e38] mb-4">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-lg md:text-xl mb-2">
                {whyUsItems[7].title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                {whyUsItems[7].desc}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ============================================================== */}
      {/* SECTION: LATEST FROM OUR VIP BLOG & GUIDES                     */}
      {/* ============================================================== */}
            {/* SECTION 9: ACCESSIBLE MULTILINGUAL FAQ & CONVERSION CTA */}
      <ReviewsSection locale={locale} dict={dict} />
      <FaqSection locale={locale} dict={dict} settings={settings} />



      {/* ============================================================== */}
      {/* FINAL EXECUTIVE CTA BAND (Screenshot 13 "Book with Confidence")*/}
      {/* ============================================================== */}
      <section className="py-16 md:py-20 bg-navy text-white border-t border-navy-border text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-xs font-bold text-gold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{finalCta.badge}</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            {finalCta.title}
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            {locale === 'ar'
              ? 'احجز سيارتك الخاصة الآن بسعر ثابت وبدون أي دفعة مقدمة؛ فريقنا على واتساب جاهز لتأكيد حجزك والإجابة عن أي استفسار.'
              : 'Reserve your private chauffeur with zero advance deposit, guaranteed fixed rates, and instant 24/7 WhatsApp confirmation.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking`}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3.5 rounded-btn bg-gold text-ink font-bold text-xs uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-gold"
            >
              <span>{finalCta.btnBook}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <a
              href={`https://wa.me/${settings.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 rounded-btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{finalCta.btnWa}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
