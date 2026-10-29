import { Locale } from '@/i18n/config';

export interface LocalizedRouteMeta {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  subtitle: string;
  overview: string;
  inclusions: string[];
  highwayNote: string;
  authoritySource: string;
  faqs: { question: string; answer: string }[];
}

export interface RouteUiLabels {
  breadcrumbHome: string;
  breadcrumbRoutes: string;
  verifiedLabel: string;
  expresswayLabel: string;
  authorityLabel: string;
  overviewHeading: string;
  inclusionsHeading: string;
  terminalsHeading: string;
  terminalsSubtitle: string;
  meetingSpotBadge: string;
  landmarkLabel: string;
  milestonesHeading: string;
  milestonesSubtitle: string;
  stageLabel: string;
  pricingHeading: string;
  pricingSubtitle: string;
  zeroDepositBadge: string;
  fixedFareLabel: string;
  bookButton: string;
  faqHeading: string;
  faqSubtitle: string;
  relatedHeading: string;
  viewButton: string;
  ctaBadge: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
  ctaAllRoutesButton: string;
  paxLabel: string;
  bagsLabel: string;
  currencySAR: string;
  paymentPolicyNote: string;
}

export const ROUTE_UI_LABELS: Record<Locale, RouteUiLabels> = {
  ar: {
    breadcrumbHome: 'الرئيسية',
    breadcrumbRoutes: 'المسارات',
    verifiedLabel: 'آخر تدقيق:',
    expresswayLabel: 'المسار السريع المعتمد:',
    authorityLabel: 'المرجع الرسمي:',
    overviewHeading: 'نظرة عامة على الخدمة',
    inclusionsHeading: 'المزايا المشمولة في هذا المسار',
    terminalsHeading: 'إرشادات الاستقبال في الصالات والمحطات',
    terminalsSubtitle: 'إرشادات دقيقة للقاء السائق بعد الخروج من الجوازات والتفتيش الجمركي مباشرة:',
    meetingSpotBadge: 'نقطة الالتقاء',
    landmarkLabel: 'علامة مميزة:',
    milestonesHeading: 'المسار الزمني ومحطات التوقف النموذجية',
    milestonesSubtitle: 'المسافة الإجمالية ونقاط الطريق والاستراحات النموذجية المكيفة للصلاة والراحة:',
    stageLabel: 'المحطة',
    pricingHeading: 'الأسعار الثابتة لكافة فئات الأسطول',
    pricingSubtitle: 'أسعار مباشرة شاملة الوقود ورسوم الطرق السريعة وضريبة القيمة المضافة:',
    zeroDepositBadge: '✓ بدون أي دفع مسبق',
    fixedFareLabel: 'السعر الثابت',
    bookButton: 'احجز الآن',
    faqHeading: 'الأسئلة الشائعة حول هذا المسار',
    faqSubtitle: 'إجابات موثقة ومطابقة لتوجيهات الطيران المدني ووزارة الحج والعمرة:',
    relatedHeading: 'مسارات رحلات مرتبطة ومكملة',
    viewButton: 'عرض المسار',
    ctaBadge: 'حجز فوري ومؤكد',
    ctaHeading: 'جاهز لحجز رحلتك الخاصة الآن؟',
    ctaText: 'أسعار ثابتة للمركبة بالكامل، سيارات حديثة ومعقمة، وسائقون خبراء معتمدون بخدمتكم على مدار 24 ساعة بدون أي دفع مسبق.',
    ctaButton: 'احجز هذا المسار الآن',
    ctaAllRoutesButton: 'تصفح كافة المسارات',
    paxLabel: 'ركاب',
    bagsLabel: 'حقائب',
    currencySAR: 'ر.س',
    paymentPolicyNote: 'الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول — لا نقبل البطاقات أو الدفع الإلكتروني.',
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbRoutes: 'Routes',
    verifiedLabel: 'Verified:',
    expresswayLabel: 'Designated Expressway:',
    authorityLabel: 'Authority Source:',
    overviewHeading: 'Service & Route Overview',
    inclusionsHeading: 'What is Included on this Route',
    terminalsHeading: 'Terminal-by-Terminal Pickup Points',
    terminalsSubtitle: 'Step-by-step meeting points to find your chauffeur directly after baggage claim:',
    meetingSpotBadge: 'Meeting Spot',
    landmarkLabel: 'Landmark:',
    milestonesHeading: 'Highway Roadmap & Travel Milestones',
    milestonesSubtitle: 'Travel stages and designated clean service plazas along the route:',
    stageLabel: 'Stage',
    pricingHeading: 'Guaranteed Fixed Rates by Vehicle',
    pricingSubtitle: 'Authoritative fixed rates including fuel, highway tolls, and VAT with zero surge fees:',
    zeroDepositBadge: '✓ Zero Upfront Deposit',
    fixedFareLabel: 'Fixed Fare',
    bookButton: 'Book Now',
    faqHeading: 'Frequently Asked Questions about this Route',
    faqSubtitle: 'Verified operational and transit answers addressing common pilgrim questions:',
    relatedHeading: 'Related Pilgrimage Routes',
    viewButton: 'View Route',
    ctaBadge: 'Direct Chauffeur Dispatch',
    ctaHeading: 'Ready to Reserve Your Private Chauffeur?',
    ctaText: 'Guaranteed fixed fares per vehicle, pristine air-conditioned fleet, and certified chauffeurs 24/7 with zero advance deposit.',
    ctaButton: 'Book This Route Now',
    ctaAllRoutesButton: 'View All Routes',
    paxLabel: 'Pax',
    bagsLabel: 'Bags',
    currencySAR: 'SAR',
    paymentPolicyNote: 'Payment is cash only (SAR or USD) paid directly to the driver upon arrival. No credit cards, POS, or advance deposit.',
  },
  ms: {
    breadcrumbHome: 'Utama',
    breadcrumbRoutes: 'Laluan',
    verifiedLabel: 'Disahkan:',
    expresswayLabel: 'Lebuhraya Rasmi:',
    authorityLabel: 'Pihak Berkuasa:',
    overviewHeading: 'Gambaran Keseluruhan Perkhidmatan',
    inclusionsHeading: 'Perkhidmatan Termasuk dalam Laluan Ini',
    terminalsHeading: 'Panduan Lokasi Pengambilan di Terminal',
    terminalsSubtitle: 'Panduan langkah demi langkah untuk bertemu pemandu anda selepas tuntutan bagasi:',
    meetingSpotBadge: 'Tempat Pertemuan',
    landmarkLabel: 'Mercu Tanda:',
    milestonesHeading: 'Peringkat Perjalanan & Hentian Rehat',
    milestonesSubtitle: 'Peringkat perjalanan dan kawasan rehat moden dan bersih di sepanjang lebuhraya:',
    stageLabel: 'Peringkat',
    pricingHeading: 'Kadar Tambang Tetap Mengikut Kenderaan',
    pricingSubtitle: 'Kadar tetap rasmi termasuk bahan api, tol lebuhraya, dan cukai tanpa sebarang caj tambahan:',
    zeroDepositBadge: '✓ Tanpa Bayaran Pendahuluan',
    fixedFareLabel: 'Tambang Tetap',
    bookButton: 'Tempah Sekarang',
    faqHeading: 'Soalan Lazim Mengenai Laluan Ini',
    faqSubtitle: 'Jawapan operasi rasmi bagi membantu jemaah merancang perjalanan mereka:',
    relatedHeading: 'Laluan Perjalanan Berkaitan',
    viewButton: 'Lihat Laluan',
    ctaBadge: 'Penghantaran Pemandu Terus',
    ctaHeading: 'Bersedia Untuk Menempah Pemandu Peribadi Anda?',
    ctaText: 'Tambang tetap bagi setiap kenderaan, armada berhawa dingin yang selesa, pemandu berlesen 24/7 tanpa bayaran deposit.',
    ctaButton: 'Tempah Laluan Ini',
    ctaAllRoutesButton: 'Semua Laluan',
    paxLabel: 'Penumpang',
    bagsLabel: 'Beg',
    currencySAR: 'SAR',
    paymentPolicyNote: 'Bayaran tunai sahaja (SAR atau USD) terus kepada pemandu semasa ketibaan. Tiada kad kredit atau deposit.',
  },
  id: {
    breadcrumbHome: 'Beranda',
    breadcrumbRoutes: 'Rute',
    verifiedLabel: 'Terverifikasi:',
    expresswayLabel: 'Jalan Tol Resmi:',
    authorityLabel: 'Otoritas Resmi:',
    overviewHeading: 'Ringkasan Layanan & Rute',
    inclusionsHeading: 'Fasilitas Termasuk dalam Perjalanan',
    terminalsHeading: 'Panduan Titik Jemput di Terminal',
    terminalsSubtitle: 'Panduan praktis untuk bertemu pengemudi pribadi Anda setelah pengambilan bagasi:',
    meetingSpotBadge: 'Titik Pertemuan',
    landmarkLabel: 'Patokan:',
    milestonesHeading: 'Tahapan Perjalanan & Tempat Istirahat',
    milestonesSubtitle: 'Jalur perjalanan dan area istirahat modern serta bersih di sepanjang jalan tol:',
    stageLabel: 'Tahap',
    pricingHeading: 'Tarif Tetap Terjamin Berdasarkan Kendaraan',
    pricingSubtitle: 'Tarif pasti termasuk bahan bakar, tol, dan pajak tanpa biaya tersembunyi:',
    zeroDepositBadge: '✓ Tanpa Uang Muka',
    fixedFareLabel: 'Tarif Tetap',
    bookButton: 'Pesan Sekarang',
    faqHeading: 'Pertanyaan yang Sering Diajukan',
    faqSubtitle: 'Jawaban resmi mengenai rute dan perjalanan untuk kenyamanan jamaah:',
    relatedHeading: 'Rute Ziarah & Transfer Terkait',
    viewButton: 'Lihat Rute',
    ctaBadge: 'Penjemputan Privat Terkonfirmasi',
    ctaHeading: 'Siap Memesan Transportasi Privat Anda?',
    ctaText: 'Tarif pasti per kendaraan, armada nyaman ber-AC, pengemudi profesional 24 jam tanpa uang muka.',
    ctaButton: 'Pesan Rute Ini',
    ctaAllRoutesButton: 'Lihat Semua Rute',
    paxLabel: 'Penumpang',
    bagsLabel: 'Koper',
    currencySAR: 'SAR',
    paymentPolicyNote: 'Pembayaran tunai langsung ke sopir saat tiba (SAR atau USD). Tanpa kartu kredit atau uang muka.',
  },
  ur: {
    breadcrumbHome: 'ہوم',
    breadcrumbRoutes: 'راستے',
    verifiedLabel: 'تصدیق شدہ:',
    expresswayLabel: 'نامزد ایکسپریس وے:',
    authorityLabel: 'سرکاری حوالہ:',
    overviewHeading: 'سروس اور سفر کا جائزہ',
    inclusionsHeading: 'اس سفر میں شامل سہولیات',
    terminalsHeading: 'ٹرمینل پر ڈرائیور سے ملاقات کی رہنمائی',
    terminalsSubtitle: 'کسٹمز اور بیگیج کلیم کے فوراً بعد اپنے پرائیویٹ ڈرائیور سے ملنے کی ہدایات:',
    meetingSpotBadge: 'ملاقات کا مقام',
    landmarkLabel: 'نشانی:',
    milestonesHeading: 'سفر کے مراحل اور آرام گاہیں',
    milestonesSubtitle: 'ہائی وے کے اہم مراحل اور جدید صاف ستھری سروس پلازہ کی تفصیلات:',
    stageLabel: 'مرحلہ',
    pricingHeading: 'گاڑی کے لحاظ سے مقررہ کرائے',
    pricingSubtitle: 'پیٹرول، ہائی وے ٹول اور ٹیکس سمیت حتمی مقررہ کرائے بغیر کسی پوشیدہ چارجز کے:',
    zeroDepositBadge: '✓ کوئی ایڈوانس رقم درکار نہیں',
    fixedFareLabel: 'مقررہ کرایہ',
    bookButton: 'ابھی بک کریں',
    faqHeading: 'اس راستے کے بارے میں اہم سوالات',
    faqSubtitle: 'معتمرین اور زائرین کی سہولت کے لیے تصدیق شدہ معلومات اور جوابات:',
    relatedHeading: 'دیگر متعلقہ راستے',
    viewButton: 'راستہ دیکھیں',
    ctaBadge: 'براہ راست ڈرائیور دستیابی',
    ctaHeading: 'کیا آپ پرائیویٹ سواری بک کرنے کے لیے تیار ہیں؟',
    ctaText: 'پوری گاڑی کا مقررہ کرایہ، صاف ستھری ایئرکنڈیشنڈ گاڑیاں، 24 گھنٹے دستیاب بغیر ایڈوانس کے۔',
    ctaButton: 'یہ سفر بک کریں',
    ctaAllRoutesButton: 'تمام راستے دیکھیں',
    paxLabel: 'افراد',
    bagsLabel: 'بیگ',
    currencySAR: 'ریال',
    paymentPolicyNote: 'ادائیگی صرف نقد (سعودی ریال یا امریکی ڈالر) پہنچنے پر ڈرائیور کو کی جاتی ہے۔ کارڈ یا ایڈوانس نہیں لیا جاتا۔',
  },
  fr: {
    breadcrumbHome: 'Accueil',
    breadcrumbRoutes: 'Itinéraires',
    verifiedLabel: 'Vérifié:',
    expresswayLabel: 'Autoroute Désignée:',
    authorityLabel: 'Source Officielle:',
    overviewHeading: 'Présentation de l’Itinéraire',
    inclusionsHeading: 'Ce qui est Inclus dans ce Trajet',
    terminalsHeading: 'Points de Rencontre aux Terminaux',
    terminalsSubtitle: 'Directives précises pour retrouver votre chauffeur dès la sortie des douanes:',
    meetingSpotBadge: 'Point de Rendez-vous',
    landmarkLabel: 'Point de Repère:',
    milestonesHeading: 'Étapes du Trajet & Haltes Services',
    milestonesSubtitle: 'Étapes et aires de repos modernes et climatisées sur l’autoroute:',
    stageLabel: 'Étape',
    pricingHeading: 'Tarifs Fixes Garantis par Véhicule',
    pricingSubtitle: 'Tarifs transparents comprenant carburant, péages et TVA sans frais supplémentaires:',
    zeroDepositBadge: '✓ Zéro Acompte Prélable',
    fixedFareLabel: 'Tarif Fixe',
    bookButton: 'Réserver',
    faqHeading: 'Questions Fréquentes sur cet Itinéraire',
    faqSubtitle: 'Réponses opérationnelles officielles pour organiser votre voyage sereinement:',
    relatedHeading: 'Itinéraires Complémentaires',
    viewButton: 'Voir l’Itinéraire',
    ctaBadge: 'Chauffeur Privé Dédié',
    ctaHeading: 'Prêt à Réserver Votre Chauffeur Privé?',
    ctaText: 'Prix fixe par véhicule, flotte climatisée de prestige et chauffeurs agréés 24h/24 sans acompte.',
    ctaButton: 'Réserver ce Trajet',
    ctaAllRoutesButton: 'Tous les Itinéraires',
    paxLabel: 'Passagers',
    bagsLabel: 'Bagages',
    currencySAR: 'SAR',
    paymentPolicyNote: 'Paiement en espèces uniquement (SAR ou USD) remis directement au chauffeur à l’arrivée. Pas de carte bancaire ni d’acompte.',
  },
  es: {
    breadcrumbHome: 'Inicio',
    breadcrumbRoutes: 'Rutas',
    verifiedLabel: 'Verificado:',
    expresswayLabel: 'Autovía Oficial:',
    authorityLabel: 'Fuente Oficial:',
    overviewHeading: 'Resumen del Servicio y Ruta',
    inclusionsHeading: 'Servicios Incluidos en este Traslado',
    terminalsHeading: 'Puntos de Encuentro en Terminales',
    terminalsSubtitle: 'Indicaciones claras para encontrarse con su chófer tras recoger el equipaje:',
    meetingSpotBadge: 'Punto de Encuentro',
    landmarkLabel: 'Punto de Referencia:',
    milestonesHeading: 'Etapas del Viaje y Áreas de Descanso',
    milestonesSubtitle: 'Etapas del recorrido y áreas de servicio modernas y climatizadas:',
    stageLabel: 'Etapa',
    pricingHeading: 'Tarifas Fijas Garantizadas por Vehículo',
    pricingSubtitle: 'Tarifas completas con combustible, peajes e impuestos incluidos sin costes sorpresa:',
    zeroDepositBadge: '✓ Sin Depósito Previo',
    fixedFareLabel: 'Tarifa Fija',
    bookButton: 'Reservar',
    faqHeading: 'Preguntas Frecuentes sobre esta Ruta',
    faqSubtitle: 'Respuestas operativas oficiales para planificar su viaje con total tranquilidad:',
    relatedHeading: 'Rutas y Traslados Relacionados',
    viewButton: 'Ver Ruta',
    ctaBadge: 'Asignación Directa de Chófer',
    ctaHeading: '¿Listo para Reservar su Traslado Privado?',
    ctaText: 'Tarifa fija por vehículo, flota de lujo con aire acondicionado y chóferes autorizados 24/7 sin pago por adelantado.',
    ctaButton: 'Reservar esta Ruta',
    ctaAllRoutesButton: 'Ver Todas las Rutas',
    paxLabel: 'Pasajeros',
    bagsLabel: 'Maletas',
    currencySAR: 'SAR',
    paymentPolicyNote: 'Pago solo en efectivo (SAR o USD) al conductor a la llegada. No se aceptan tarjetas ni pago anticipado.',
  },
  de: {
    breadcrumbHome: 'Startseite',
    breadcrumbRoutes: 'Routen',
    verifiedLabel: 'Geprüft:',
    expresswayLabel: 'Offizielle Autobahn:',
    authorityLabel: 'Offizielle Quelle:',
    overviewHeading: 'Routen- und Serviceübersicht',
    inclusionsHeading: 'Inbegriffene Leistungen auf dieser Strecke',
    terminalsHeading: 'Treffpunkte an den Terminals',
    terminalsSubtitle: 'Schritt-für-Schritt-Anleitung zum Treffen Ihres Chauffeurs nach der Gepäckausgabe:',
    meetingSpotBadge: 'Treffpunkt',
    landmarkLabel: 'Orientierungspunkt:',
    milestonesHeading: 'Reiseabschnitte & Raststätten',
    milestonesSubtitle: 'Reiseetappen und saubere, moderne Autobahn-Raststätten entlang der Route:',
    stageLabel: 'Abschnitt',
    pricingHeading: 'Garantierte Festpreise nach Fahrzeugklasse',
    pricingSubtitle: 'Verbindliche Endpreise inklusive Kraftstoff, Autobahnmaut und MwSt. ohne Zuschläge:',
    zeroDepositBadge: '✓ Keine Vorauszahlung',
    fixedFareLabel: 'Festpreis',
    bookButton: 'Jetzt Buchen',
    faqHeading: 'Häufig Gestellte Fragen zu dieser Route',
    faqSubtitle: 'Verifizierte behördliche und betriebliche Antworten für Pilger und Reisende:',
    relatedHeading: 'Verwandte Reiserouten',
    viewButton: 'Route Anzeigen',
    ctaBadge: 'Direkte Chauffeur-Bereitstellung',
    ctaHeading: 'Bereit, Ihren Privaten Transfer zu Buchen?',
    ctaText: 'Fester Preis pro Fahrzeug, moderne klimatisierte Flotte und zertifizierte Chauffeure 24/7 ohne Anzahlung.',
    ctaButton: 'Diese Route Buchen',
    ctaAllRoutesButton: 'Alle Routen',
    paxLabel: 'Personen',
    bagsLabel: 'Koffer',
    currencySAR: 'SAR',
    paymentPolicyNote: 'Zahlung ausschließlich in bar (SAR oder USD) direkt beim Fahrer bei Ankunft. Keine Kartenzahlung oder Anzahlung.',
  },
  tr: {
    breadcrumbHome: 'Ana Sayfa',
    breadcrumbRoutes: 'Güzergahlar',
    verifiedLabel: 'Doğrulandı:',
    expresswayLabel: 'Resmi Otoyol:',
    authorityLabel: 'Resmi Kaynak:',
    overviewHeading: 'Güzergah ve Hizmet Özeti',
    inclusionsHeading: 'Bu Güzergahta Dahil Olan Hizmetler',
    terminalsHeading: 'Terminal Karşılama Noktaları',
    terminalsSubtitle: 'Gümrük ve bagaj alımının ardından özel şoförünüzle buluşma rehberi:',
    meetingSpotBadge: 'Buluşma Noktası',
    landmarkLabel: 'Belirgin Nokta:',
    milestonesHeading: 'Seyahat Aşamaları ve Mola Yerleri',
    milestonesSubtitle: 'Otoyol üzerindeki seyahat etapları ve modern, temiz SASCO dinlenme tesisleri:',
    stageLabel: 'Aşama',
    pricingHeading: 'Araç Bazında Sabit Fiyatlar',
    pricingSubtitle: 'Yakıt, otoyol geçiş ücretleri ve KDV dahil sürprizsiz kesin fiyatlar:',
    zeroDepositBadge: '✓ Ön Ödeme Gerektirmez',
    fixedFareLabel: 'Sabit Fiyat',
    bookButton: 'Rezerve Et',
    faqHeading: 'Bu Güzergah Hakkında Sıkça Sorulan Sorular',
    faqSubtitle: 'Hacı ve umrecilerimizin güvenli ve huzurlu yolculuğu için doğrulanmış bilgiler:',
    relatedHeading: 'İlgili Güzergahlar',
    viewButton: 'Güzergahı Gör',
    ctaBadge: 'Özel Şoför Tahsisi',
    ctaHeading: 'Özel Transferinizi Rezerve Etmeye Hazır mısınız?',
    ctaText: 'Araç başına sabit fiyat, klimalı konforlu VIP filo ve ön ödemesiz 7/24 lisanslı şoför hizmeti.',
    ctaButton: 'Bu Güzergahı Rezerve Et',
    ctaAllRoutesButton: 'Tüm Güzergahlar',
    paxLabel: 'Yolcu',
    bagsLabel: 'Bagaj',
    currencySAR: 'SAR',
    paymentPolicyNote: 'Ödeme yalnızca nakit (SAR veya USD) olarak varışta şoföre yapılır. Kredi kartı veya ön ödeme kabul edilmez.',
  },
  hi: {
    breadcrumbHome: 'होम',
    breadcrumbRoutes: 'मार्ग',
    verifiedLabel: 'सत्यापित:',
    expresswayLabel: 'नामित एक्सप्रेसवे:',
    authorityLabel: 'आधिकारिक स्रोत:',
    overviewHeading: 'सेवा और मार्ग विवरण',
    inclusionsHeading: 'इस मार्ग में शामिल सुविधाएं',
    terminalsHeading: 'टर्मिनल पिकअप गाइड',
    terminalsSubtitle: 'कस्टम और सामान निकासी के तुरंत बाद अपने ड्राइवर से मिलने के निर्देश:',
    meetingSpotBadge: 'मिलने का स्थान',
    landmarkLabel: 'पहचान स्थल:',
    milestonesHeading: 'यात्रा के चरण और विश्राम स्थल',
    milestonesSubtitle: 'राजमार्ग के चरण और आधुनिक वातानुकूलित सेवा प्लाजा की जानकारी:',
    stageLabel: 'चरण',
    pricingHeading: 'वाहन अनुसार निश्चित दरें',
    pricingSubtitle: 'ईंधन, टोल और टैक्स सहित पूरी तरह पारदर्शी निश्चित किराया:',
    zeroDepositBadge: '✓ कोई अग्रिम भुगतान नहीं',
    fixedFareLabel: 'निश्चित किराया',
    bookButton: 'अभी बुक करें',
    faqHeading: 'इस मार्ग के बारे में अक्सर पूछे जाने वाले प्रश्न',
    faqSubtitle: 'यात्रियों और तीर्थयात्रियों की सुविधा के लिए आधिकारिक एवं सत्यापित उत्तर:',
    relatedHeading: 'संबंधित यात्रा मार्ग',
    viewButton: 'मार्ग देखें',
    ctaBadge: 'सीधी ड्राइवर सेवा',
    ctaHeading: 'क्या आप निजी वीआईपी यात्रा बुक करने के लिए तैयार हैं?',
    ctaText: 'प्रति वाहन निश्चित किराया, आधुनिक वातानुकूलित गाड़ियां और बिना किसी अग्रिम भुगतान के 24 घंटे उपलब्ध प्रमाणित ड्राइवर।',
    ctaButton: 'यह यात्रा बुक करें',
    ctaAllRoutesButton: 'सभी मार्ग देखें',
    paxLabel: 'सवारी',
    bagsLabel: 'बैग',
    currencySAR: 'SAR',
    paymentPolicyNote: 'भुगतान केवल नकद (SAR या USD) में होटल पहुंचने पर ड्राइवर को किया जाता है। कोई कार्ड या अग्रिम जमा नहीं।',
  },
};

// Priority route metadata across all 10 locales
export const PRIORITY_ROUTES_LOCALIZED: Record<string, Partial<Record<Locale, LocalizedRouteMeta>>> = {
  'jeddah-to-madinah': {
    en: {
      seoTitle: 'Jeddah Airport & City to Madinah Private Transfer | Duyuf Al Rahman VIP',
      seoDescription: 'Direct private transfer from KAIA Jeddah Airport or city hotel to Madinah. Fixed fares, radar flight tracking, SASCO Palm rest stops, pay cash on arrival.',
      h1: 'Jeddah Airport (KAIA) & City to Madinah Private Transfer',
      subtitle: 'Comfortable 410 km Highway Transit to the Prophet’s Sanctuary with Free Flight Tracking and Luggage Care',
      overview: 'Traveling directly from Jeddah (King Abdulaziz International Airport or central hotels) to Madinah Al-Munawwarah eliminates the stress of train timetable limits, shared bus crowds, and multi-leg taxi transitions. Our executive chauffeur meets your family at your arrival terminal with a personalized name board, accommodates heavy luggage, and transports you along the Al Hijrah expressway (Route 15) with flexible refreshment stops at clean SASCO Palm stations.',
      inclusions: [
        'Direct door-to-door transfer from KAIA Terminal 1, North Terminal, or Jeddah hotel to Madinah hotel',
        '60-90 minutes complimentary airport waiting buffer after actual flight landing time',
        'Automated live flight radar monitoring for arrival schedule updates',
        'Full accommodation of large luggage, strollers, and Zamzam canisters',
        'Flexible prayer and family rest stops at premium SASCO Palm highway rest areas',
        'Pay cash to driver upon arrival (SAR or USD) — zero advance deposit or card fees',
      ],
      highwayNote: 'Route 15 / Al Hijrah Expressway (Multi-lane high-speed expressway, speed-monitored)',
      authoritySource: 'Saudi Transport General Authority (TGA) & General Authority of Civil Aviation (GACA)',
      faqs: [
        {
          question: 'How long does the private transfer take from Jeddah Airport to Madinah?',
          answer: 'The travel time is approximately 4.0 to 4.5 hours covering 410 km via the Route 15 Al Hijrah Expressway. Timing can vary slightly depending on your departure terminal and chosen rest stops at highway service areas.',
        },
        {
          question: 'Where will my driver meet me at Jeddah Airport (KAIA)?',
          answer: 'For Terminal 1 arrivals, your chauffeur waits inside the arrival concourse near the aquarium holding a digital tablet with your name. For North Terminal arrivals, the driver coordinates via WhatsApp and pulls to the covered pedestrian curbside canopy directly outside arrivals.',
        },
        {
          question: 'Can we stop for prayer and food along the highway to Madinah?',
          answer: 'Yes. Our private chauffeur service is completely customized to your family pace. We stop at modern, clean SASCO Palm service stations along Route 15 featuring air-conditioned mosques, family restrooms, coffee shops, and restaurants.',
        },
        {
          question: 'What is your official payment policy for this long-distance transfer?',
          answer: 'In accordance with our strict payment policy, you pay your chauffeur in cash (Saudi Riyals - SAR or US Dollars - USD) only after you safely arrive at your hotel in Madinah. We do not require any advance deposit and do not accept credit cards, debit cards, POS machines, or online transactions.',
        },
      ],
    },
    ar: {
      seoTitle: 'توصيل من مطار جدة وفنادقها إلى المدينة المنورة | ضيوف الرحمن VIP',
      seoDescription: 'خدمة توصيل خاصة وراقية من مطار الملك عبدالعزيز بجدة أو فنادقها إلى فنادق المدينة المنورة. أسعار ثابتة ومحددة، تتبع طيران مجاني، والدفع نقداً عند الوصول.',
      h1: 'توصيل خاص من مطار جدة (KAIA) ومدينة جدة إلى المدينة المنورة',
      subtitle: 'انتقال مريح ومباشر لمسافة 410 كم إلى رحاب المسجد النبوي الشريف بسائق خاص وخدمة أمتعة متكاملة',
      overview: 'يوفر لك التوصيل الخاص المباشر من مطار الملك عبدالعزيز الدولي بجدة (أو فنادق جدة) إلى المدينة المنورة راحة البال التامة، متجاوزاً قيود مواعيد القطار أو انتظار الحافلات الجماعية. يستقبلك سائقنا الخاص بلوحة اسم رقمية داخل صالة الوصول، ويساعدك في تحميل الأمتعة وعربات الأطفال، لتنطلق في رحلة هادئة ومكيفة عبر طريق الهجرة السريع (طريق 15) مع محطات استراحة مرنة في مجمعات ساسكو الحديثة.',
      inclusions: [
        'توصيل مباشر من صالات مطار جدة (الصالة 1 والصالة الشمالية) أو فنادق جدة إلى باب فندقك بالمدينة',
        'فترة انتظار مجانية تمتد من 60 إلى 90 دقيقة بعد هبوط الطائرة الفعلي',
        'متابعة حية لرحلتك بالرادار الملاحي للتعامل التلقائي مع أي تغيير في المواعيد',
        'مساحة رحبة تتسع لكافة الحقائب الكبيرة وعربات الأطفال وعبوات ماء زمزم',
        'توقفات مرنة للصلاة والراحة في مجمعات ساسكو بالم الراقية والمكيفة',
        'الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول — بدون أي دفع مسبق',
      ],
      highwayNote: 'طريق الهجرة السريع (طريق 15) - متعدد المسارات ومراقب بكاميرات السلامة ساهر',
      authoritySource: 'الهيئة العامة للنقل (TGA) والهيئة العامة للطيران المدني (GACA)',
      faqs: [
        {
          question: 'كم تستغرق الرحلة من مطار جدة إلى فنادق المدينة المنورة بالسيارة الخاصة؟',
          answer: 'تستغرق الرحلة ما بين 4 ساعات إلى 4 ساعات ونصف تقريباً لمسافة 410 كم عبر طريق الهجرة السريع، مع احتساب توقف مريح للصلاة وتناول القهوة في استراحات ساسكو الحديثة.',
        },
        {
          question: 'أين ينتظرني السائق داخل مطار الملك عبدالعزيز بجدة؟',
          answer: 'في الصالة رقم 1، ينتظرك السائق في ردهة القادمين العامة بجوار الحوض الأسطواني حاملاً لوحة إلكترونية باسمك. وفي الصالة الشمالية، ينسق معك السائق عبر واتساب فور الهبوط ويتقدم لمظلة الركاب أمام الصالة مباشرة.',
        },
        {
          question: 'هل يمكننا التوقف للصلاة وتناول وجبة أثناء الطريق إلى المدينة؟',
          answer: 'نعم بالتأكيد. الرحلة خاصة بك وبعائلتك بالكامل، ويتوقف السائق بكل رحابة صدر في أفضل محطات ساسكو بالم على طريق الهجرة التي تضم مساجد مكيفة ونظيفة ومطاعم ومقاهي عالمية ومحلية.',
        },
        {
          question: 'ما هي سياسة الدفع المعتمدة لهذا المسار؟',
          answer: 'وفقاً لسياسة السداد الرسمية لضيوف الرحمن VIP، يتم دفع كامل الأجرة نقداً كاش (بالريال السعودي أو الدولار الأمريكي) مباشرة للسائق بعد وصولك سالماً إلى فندقك بالمدينة المنورة. لا نطلب أي عربون مسبق ولا نقبل الدفع بالبطاقات البنكية أو أجهزة نقاط البيع.',
        },
      ],
    },
    ms: {
      seoTitle: 'Pengangkutan Peribadi Lapangan Terbang Jeddah ke Madinah | Duyuf Al Rahman VIP',
      seoDescription: 'Tempah sewa kereta VIP dari Lapangan Terbang Jeddah (KAIA) terus ke hotel Madinah. Harga tetap, penjejakan penerbangan, bayar tunai semasa ketibaan.',
      h1: 'Pengangkutan Peribadi Lapangan Terbang Jeddah & Bandar ke Madinah',
      subtitle: 'Perjalanan Selesa 410 km ke Kota Madinah Munawwarah dengan Pemandu Peribadi VIP dan Ruang Bagasi Luas',
      overview: 'Perjalanan terus dari Lapangan Terbang Antarabangsa King Abdulaziz (JED) ke Madinah memudahkan jemaah tanpa perlu menukar kenderaan, bersesak di stesen kereta api atau menunggu bas awam. Pemandu kami menyambut anda di balai ketibaan dengan papan tanda nama, membantu mengangkat bagasi, dan memandu secara selesa melalui Lebuhraya Al Hijrah (Laluan 15).',
      inclusions: [
        'Pengambilan terus dari Terminal 1 atau Terminal Utara KAIA ke pintu hotel Madinah',
        'Masa menunggu percuma 60-90 minit selepas waktu pendaratan sebenar',
        'Penjejakan radar penerbangan langsung secara automatik',
        'Ruang bagasi luas untuk koper besar, kereta sorong bayi dan botol air Zamzam',
        'Hentian rehat dan solat yang fleksibel di kawasan Rehat SASCO Palm yang bersih',
        'Bayaran tunai (SAR atau USD) terus kepada pemandu semasa ketibaan — tanpa deposit awal',
      ],
      highwayNote: 'Lebuhraya Al Hijrah (Laluan 15) - Lebuhraya moden berbilang lorong dengan kawalan keselamatan',
      authoritySource: 'Pihak Berkuasa Pengangkutan Am Saudi (TGA) & GACA',
      faqs: [
        {
          question: 'Berapa lamakah masa perjalanan dari Lapangan Terbang Jeddah ke Madinah?',
          answer: 'Perjalanan mengambil masa sekitar 4.0 hingga 4.5 jam bagi jarak 410 km melalui Lebuhraya Al Hijrah, termasuk hentian rehat yang selesa.',
        },
        {
          question: 'Di manakah pemandu akan menunggu saya di Lapangan Terbang Jeddah?',
          answer: 'Di Terminal 1, pemandu menunggu di ruang ketibaan awam berhampiran akuarium besar dengan tablet nama anda. Di Terminal Utara, pemandu akan berhubung melalui WhatsApp dan menjemput anda di laluan penumpang berbumbung.',
        },
        {
          question: 'Bagaimanakah kaedah pembayaran bagi perjalanan ini?',
          answer: 'Pembayaran adalah secara tunai sepenuhnya (SAR atau USD) kepada pemandu apabila tiba di hotel Madinah anda. Tiada bayaran pendahuluan dan kad kredit/debit tidak diterima.',
        },
      ],
    },
    id: {
      seoTitle: 'Travel & Antar Jemput Bandara Jeddah ke Madinah | Duyuf Al Rahman VIP',
      seoDescription: 'Layanan sewa mobil privat dari Bandara KAIA Jeddah ke hotel Madinah. Tarif pasti per mobil, lacak penerbangan langsung, bayar tunai saat tiba.',
      h1: 'Antar Jemput Privat Bandara Jeddah (KAIA) & Kota ke Madinah',
      subtitle: 'Perjalanan Nyaman 410 km Menuju Kota Suci Madinah dengan Layanan Sopir VIP dan Bagasi Luas',
      overview: 'Layanan transportasi privat dari Bandara Internasional King Abdulaziz (JED) langsung menuju Madinah Al-Munawwarah memberikan kenyamanan maksimal bagi keluarga jamaah umroh. Sopir kami menyambut Anda di aula kedatangan dengan papan nama digital, membantu mengangkat koper berat, dan mengantar Anda menyusuri Tol Hijrah (Rute 15) dengan tempat istirahat modern di SASCO Palm.',
      inclusions: [
        'Antar jemput langsung dari Terminal 1 / Terminal Utara ke lobi hotel Madinah',
        'Bebas biaya tunggu bandara 60-90 menit setelah pesawat mendarat',
        'Pemantauan radar penerbangan live secara otomatis',
        'Kapasitas bagasi lega untuk koper besar, kereta dorong anak, dan jeriken Zamzam',
        'Pemberhentian sholat dan istirahat fleksibel di rest area SASCO Palm ber-AC',
        'Pembayaran tunai (SAR atau USD) langsung ke sopir saat tiba — tanpa uang muka',
      ],
      highwayNote: 'Jalan Tol Al Hijrah (Rute 15) - Jalur cepat multi-lajur berstandar keselamatan tinggi',
      authoritySource: 'Otoritas Umum Transportasi Saudi (TGA) & Kementerian Haji dan Umroh',
      faqs: [
        {
          question: 'Berapa jam perjalanan mobil dari Bandara Jeddah ke Madinah?',
          answer: 'Waktu tempuh sekitar 4 hingga 4,5 jam untuk jarak 410 km melalui Tol Hijrah Rute 15, sudah termasuk waktu istirahat sejenak untuk sholat dan makan.',
        },
        {
          question: 'Bagaimana cara bertemu sopir di Bandara Jeddah (KAIA)?',
          answer: 'Di Terminal 1, sopir menunggu di aula kedatangan dekat akuarium besar memegang papan nama digital. Di Terminal Utara, sopir menghubungi lewat WhatsApp dan menjemput di selasar luar kedatangan.',
        },
        {
          question: 'Bagaimana sistem pembayaran perjalanan ini?',
          answer: 'Sesuai kebijakan resmi, pembayaran 100% tunai (Riyal Saudi atau Dolar AS) diserahkan langsung ke sopir setelah Anda sampai dengan selamat di hotel Madinah. Tidak perlu uang muka dan tidak menerima kartu kredit.',
        },
      ],
    },
    ur: {
      seoTitle: 'جدہ ایئرپورٹ سے مدینہ منورہ پرائیویٹ ٹرانسپورٹ | ضيوف الرحمن VIP',
      seoDescription: 'جدہ ایئرپورٹ (KAIA) سے مدینہ منورہ کے ہوٹل تک آرام دہ پرائیویٹ ٹیکسی۔ مقررہ کرایہ، فلائٹ ریڈار ٹریکنگ، پہنچنے پر نقد ادائیگی۔',
      h1: 'جدہ ایئرپورٹ (KAIA) اور شہر سے مدینہ منورہ پرائیویٹ ٹرانسپورٹ',
      subtitle: 'مدینہ منورہ کے لیے 410 کلومیٹر کا پرسکون سفر، کشادہ گاڑی اور بیگیج کی مکمل سہولت کے ساتھ',
      overview: 'جدہ کنگ عبدالعزیز ایئرپورٹ سے مدینہ منورہ کے ہوٹل تک براہ راست پرائیویٹ سواری معتمرین کے لیے سب سے پرسکون اور محفوظ ذریعہ ہے۔ ہمارا بااخلاق ڈرائیور ایئرپورٹ آمد پر آپ کے نام کا بورڈ لے کر استقبال کرتا ہے، سامان کی منتقلی میں مدد کرتا ہے اور ہجرہ ایکسپریس وے کے ذریعے آرام دہ سفر فراہم کرتا ہے۔',
      inclusions: [
        'جدہ ایئرپورٹ ٹرمینل 1 یا نارتھ ٹرمینل سے مدینہ ہوٹل کے دروازے تک براہ راست سروس',
        'فلائٹ لینڈنگ کے بعد 60 سے 90 منٹ تک مفت انتظار کی سہولت',
        'آن لائن ریڈار کے ذریعے پرواز کے اوقات کی خودکار نگرانی',
        'بھاری سامان، بچوں کے اسٹرولرز اور زمزم کے کین کے لیے وسیع گنجائش',
        'راستے میں جدید ساسکو پام اسٹیشنز پر نماز اور چائے پانی کے لیے باآسانی توقف',
        'پہنچنے پر نقد ادائیگی (سعودی ریال یا امریکی ڈالر) — بغیر کسی ایڈوانس فیس کے',
      ],
      highwayNote: 'طریق الہجرہ ایکسپریس وے (روٹ 15) - محفوظ اور تیز رفتار ملٹی لین ہائی وے',
      authoritySource: 'سعودی جنرل ٹرانسپورٹ اتھارٹی (TGA) اور وزارت حج و عمرہ',
      faqs: [
        {
          question: 'جدہ ایئرپورٹ سے مدینہ منورہ پہنچنے میں کتنا وقت لگتا ہے؟',
          answer: 'طریق الہجرہ روٹ 15 کے ذریعے 410 کلومیٹر کا فاصلہ تقریباً 4 سے 4.5 گھنٹے میں طے ہوتا ہے، جس میں راستے کا مختصر قیام بھی شامل ہے۔',
        },
        {
          question: 'ادائیگی کا کیا طریقہ کار ہے؟',
          answer: 'ہماری پالیسی کے مطابق کرایہ مدینہ منورہ ہوٹل پہنچنے کے بعد ڈرائیور کو نقد (سعودی ریال یا امریکی ڈالر) ادا کیا جاتا ہے۔ کسی ایڈوانس یا کارڈ کی ضرورت نہیں ہے۔',
        },
      ],
    },
    fr: {
      seoTitle: 'Transfert Privé Aéroport de Djeddah vers Médine | Duyuf Al Rahman VIP',
      seoDescription: 'Transfert VTC privé depuis l’aéroport de Djeddah (KAIA) jusqu’à votre hôtel à Médine. Tarif fixe garanti, suivi de vol et paiement en espèces à l’arrivée.',
      h1: 'Transfert Privé Aéroport de Djeddah (KAIA) & Ville vers Médine',
      subtitle: 'Trajet Confortable de 410 km vers la Ville Sainte du Prophète avec Chauffeur VIP et Prise en Charge Complète',
      overview: 'Rejoindre directement Médine Al-Munawwarah depuis l’Aéroport International Roi Abdelaziz (JED) évite les contraintes horaires du train et la fatigue des transferts multiples. Votre chauffeur privé vous accueille personnellement dans le hall des arrivées avec une pancarte à votre nom, prend en charge vos bagages et vous conduit en berline ou van climatisé sur l’autoroute Al Hijrah (Route 15).',
      inclusions: [
        'Prise en charge au Terminal 1 ou Terminal Nord de Djeddah jusqu’à votre hôtel à Médine',
        'Attente gratuite de 60 à 90 minutes après l’atterrissage effectif de votre vol',
        'Suivi automatisé du vol par radar en direct pour ajuster l’horaire',
        'Espace généreux pour valises volumineuses, poussettes et bidons d’eau de Zamzam',
        'Arrêts personnalisés pour la prière et la détente dans les stations modernes SASCO Palm',
        'Paiement en espèces (SAR ou USD) auprès du chauffeur à l’arrivée — aucun acompte',
      ],
      highwayNote: 'Autoroute Al Hijrah (Route 15) - Voie express sécurisée à plusieurs voies',
      authoritySource: 'Autorité Générale du Transport Saoudien (TGA) & GACA',
      faqs: [
        {
          question: 'Quelle est la durée du trajet en voiture privée de Djeddah à Médine ?',
          answer: 'Il faut compter environ 4h00 à 4h30 pour parcourir les 410 km via l’autoroute Al Hijrah, avec une pause détente dans une station moderne.',
        },
        {
          question: 'Quelles sont les modalités de paiement pour ce transfert ?',
          answer: 'Le règlement s’effectue en espèces (Riyals Saoudiens ou Dollars US) directement auprès du chauffeur à votre arrivée à l’hôtel à Médine. Aucun acompte n’est demandé et les cartes bancaires ne sont pas acceptées.',
        },
      ],
    },
    es: {
      seoTitle: 'Traslado Privado Aeropuerto de Yeda a Medina | Duyuf Al Rahman VIP',
      seoDescription: 'Traslado privado en vehículo VIP desde el Aeropuerto de Yeda (KAIA) a su hotel en Medina. Tarifa fija, seguimiento de vuelos y pago en efectivo al llegar.',
      h1: 'Traslado Privado Aeropuerto de Yeda (KAIA) y Ciudad a Medina',
      subtitle: 'Viaje Confortable de 410 km hacia Medina con Chófer Privado VIP y Máximo Espacio de Equipaje',
      overview: 'Viajar directamente desde el Aeropuerto Internacional Rey Abdulaziz (JED) hacia Medina Al-Munawwarah en un vehículo privado con chófer brinda la máxima tranquilidad y descanso tras su vuelo. Su conductor le recibirá en la terminal de llegadas con un cartel personalizado, le asistirá con sus maletas y le llevará por la moderna autovía Al Hijrah (Ruta 15).',
      inclusions: [
        'Recogida en Terminal 1 o Terminal Norte hasta la puerta de su hotel en Medina',
        'Tiempo de espera gratuito de 60 a 90 minutos tras el aterrizaje de su vuelo',
        'Seguimiento automático de vuelos por radar para coordinar la hora exacta',
        'Amplio maletero para equipaje pesado, carritos de bebé y bidones de agua Zamzam',
        'Paradas flexibles para rezar y descansar en áreas de servicio modernas SASCO Palm',
        'Pago en efectivo al conductor a la llegada (SAR o USD) — sin depósito por adelantado',
      ],
      highwayNote: 'Autovía Al Hijrah (Ruta 15) - Autopista rápida multicarril con control de velocidad',
      authoritySource: 'Autoridad General del Transporte de Arabia Saudita (TGA) y GACA',
      faqs: [
        {
          question: '¿Cuánto tiempo dura el trayecto en coche privado de Yeda a Medina?',
          answer: 'El viaje dura aproximadamente entre 4 y 4,5 horas para recorrer los 410 km por la Ruta 15, incluyendo paradas de descanso confortables.',
        },
        {
          question: '¿Cuál es la política oficial de pago?',
          answer: 'El pago se realiza en efectivo (Riyales Saudíes o Dólares Estadounidenses) directamente al chófer al llegar a su hotel en Medina. No se requiere anticipo ni se aceptan tarjetas bancarias.',
        },
      ],
    },
    de: {
      seoTitle: 'Privater Transfer Flughafen Dschidda nach Medina | Duyuf Al Rahman VIP',
      seoDescription: 'Direkter Chauffeur-Transfer vom Flughafen Dschidda (KAIA) zu Ihrem Hotel in Medina. Fester Preis, Flugradar-Verfolgung, Barzahlung bei Ankunft.',
      h1: 'Privater Transfer Flughafen Dschidda (KAIA) & Stadt nach Medina',
      subtitle: 'Bequeme 410 km Highway-Fahrt in die Heilige Stadt des Propheten mit Eigenem VIP-Chauffeur',
      overview: 'Der direkte Chauffeur-Transfer vom Flughafen Dschidda (JED) nach Medina Al-Munawwarah bietet höchsten Komfort ohne Umsteigen oder Warten am Bahnhof. Ihr Chauffeur empfängt Sie mit Namensschild in der Ankunftshalle, hilft beim Gepäck und fährt Sie auf der Al Hijrah Autobahn (Route 15) mit Pausen an modernen SASCO Palm Raststätten direkt vor Ihr Hotel.',
      inclusions: [
        'Direktabholung am Terminal 1 oder Nord-Terminal bis zum Hotel in Medina',
        '60 bis 90 Minuten kostenlose Wartezeit nach tatsächlicher Landung',
        'Automatische Flugverfolgung über Live-Radar für pünktliche Bereitstellung',
        'Großzügiger Laderaum für Koffer, Kinderwagen und Zamzam-Kanister',
        'Flexible Gebets- und Rastpausen an modernen, sauberen SASCO Raststätten',
        'Barzahlung beim Fahrer bei Ankunft (SAR oder USD) — keine Vorauszahlung',
      ],
      highwayNote: 'Al Hijrah Autobahn (Route 15) - Moderne mehrspurige Schnellstraße',
      authoritySource: 'Saudi Transport General Authority (TGA) & GACA',
      faqs: [
        {
          question: 'Wie lange dauert die Fahrt mit dem privaten Chauffeur von Dschidda nach Medina?',
          answer: 'Die Fahrzeit beträgt etwa 4,0 bis 4,5 Stunden für die 410 km lange Strecke über die Route 15 inklusive Rastpause.',
        },
        {
          question: 'Wie erfolgt die Bezahlung?',
          answer: 'Die Bezahlung erfolgt vollständig in bar (SAR oder USD) direkt beim Fahrer bei der Ankunft an Ihrem Hotel. Es ist keine Anzahlung erforderlich und es werden keine Kreditkarten akzeptiert.',
        },
      ],
    },
    tr: {
      seoTitle: 'Cidde Havalimanı - Medine Özel VIP Transfer | Duyuf Al Rahman VIP',
      seoDescription: 'Cidde Havalimanı (KAIA) veya otellerinden Medine-i Münevvere’ye doğrudan özel VIP transfer. Sabit fiyat garantisi, uçuş takibi, varışta nakit ödeme.',
      h1: 'Cidde Havalimanı (KAIA) & Şehir Merkezinden Medine’ye Özel Transfer',
      subtitle: 'Hicret Otoyolu Üzerinden Medine-i Münevvere’ye 410 km Konforlu VIP Yolculuk ve Bagaj Desteği',
      overview: 'Cidde Kral Abdülaziz Uluslararası Havalimanı’ndan (JED) Medine-i Münevvere’deki otelinize doğrudan özel araçla seyahat etmek, tren ve toplu taşıma aktarma yorgunluğunu ortadan kaldırır. Şoförümüz sizi gelen yolcu salonunda isim tabelasıyla karşılar, valizlerinizi yerleştirir ve konforlu klimalı araçlarımızla Hicret Otoyolu (15. Yol) üzerinden doğrudan otelinizin kapısına ulaştırır.',
      inclusions: [
        'Cidde Terminal 1 veya Kuzey Terminali’nden Medine otel kapısına direkt transfer',
        'Uçak inişinden sonra 60-90 dakika ücretsiz bekleme süresi',
        'Canlı radar üzerinden otomatik uçuş saati takibi',
        'Büyük boy valizler, bebek arabaları ve Zemzem bidonları için geniş bagaj alanı',
        'SASCO Palm modern dinlenme tesislerinde konforlu namaz ve ihtiyaç molaları',
        'Varışta şoföre nakit ödeme (SAR veya USD) — sıfır ön ödeme veya kart komisyonu',
      ],
      highwayNote: 'Hicret Otoyolu (15. Yol) - Çok şeritli modern ve güvenli otoyol',
      authoritySource: 'Suudi Ulaştırma Genel Otoritesi (TGA) ve GACA',
      faqs: [
        {
          question: 'Cidde Havalimanı’ndan Medine’ye özel araçla yolculuk ne kadar sürer?',
          answer: 'Hicret Otoyolu üzerinden 410 km’lik mesafe, mola dahil yaklaşık 4 ila 4,5 saat sürmektedir.',
        },
        {
          question: 'Ödeme nasıl yapılır?',
          answer: 'Resmi ödeme politikamız gereği ücretin tamamı Medine’deki otelinize ulaştığınızda şoföre nakit olarak (Suudi Arabistan Riyali veya ABD Doları) ödenir. Ön ödeme alınmaz ve kredi kartı kabul edilmez.',
        },
      ],
    },
    hi: {
      seoTitle: 'जेद्दा हवाई अड्डा से मदीना निजी वीआईपी ट्रांसफर | Duyuf Al Rahman VIP',
      seoDescription: 'जेद्दा एयरपोर्ट (KAIA) से मदीना होटल के लिए सीधी वीआईपी टैक्सी सेवा। निश्चित किराया, फ्लाइट ट्रैकिंग और होटल पहुंचने पर नकद भुगतान।',
      h1: 'जेद्दा हवाई अड्डा (KAIA) और शहर से मदीना निजी वीआईपी ट्रांसफर',
      subtitle: 'मदीना शरीफ के लिए 410 किमी का आरामदायक और सुरक्षित सफर, बिना किसी अग्रिम भुगतान के',
      overview: 'जेद्दा किंग अब्दुलअज़ीज़ एयरपोर्ट से मदीना शरीफ के लिए सीधी निजी गाड़ी तीर्थयात्रियों के लिए सबसे सुगम माध्यम है। हमारे प्रमाणित ड्राइवर आगमन हॉल में आपके नाम के डिजिटल बोर्ड के साथ स्वागत करते हैं और सामान लोड करवाकर हिजरा एक्सप्रेसवे से सीधे आपके मदीना होटल पहुंचाते हैं।',
      inclusions: [
        'जेद्दा एयरपोर्ट टर्मिनल 1 या नॉर्थ टर्मिनल से सीधे मदीना होटल ड्रॉप-ऑफ',
        'फ्लाइट लैंडिंग के बाद 60-90 मिनट का निःशुल्क वेटिंग समय',
        'लाइव फ्लाइट रडार द्वारा उड़ान समय की स्वचालित निगरानी',
        'बड़ी सूटकेस, बच्चों की ट्रॉली और ज़मज़म कैन के लिए भरपूर जगह',
        'रास्ते में आधुनिक सास्को पाम रेस्ट एरिया में नमाज़ और विश्राम की सुविधा',
        'पहुंचने पर ड्राइवर को नकद भुगतान (SAR या USD) — बिना किसी अग्रिम जमा के',
      ],
      highwayNote: 'अल हिजरा एक्सप्रेसवे (रूट 15) - सुरक्षित एवं आधुनिक राजमार्ग',
      authoritySource: 'सऊदी परिवहन प्राधिकरण (TGA) एवं हज और उमरा मंत्रालय',
      faqs: [
        {
          question: 'जेद्दा एयरपोर्ट से मदीना पहुंचने में कितना समय लगता है?',
          answer: 'हिजरा एक्सप्रेसवे के माध्यम से 410 किमी का सफर लगभग 4 से 4.5 घंटे में तय होता है, जिसमें रास्ते का विश्राम शामिल है।',
        },
        {
          question: 'भुगतान का नियम क्या है?',
          answer: 'हमारी आधिकारिक नीति के अनुसार पूरा किराया मदीना होटल पहुंचने पर ड्राइवर को नकद (सऊदी रियाल या अमेरिकी डॉलर) में दिया जाता है। कोई अग्रिम भुगतान या कार्ड स्वीकार नहीं है।',
        },
      ],
    },
  },
  'jeddah-airport-to-makkah': {
    en: {
      seoTitle: 'Jeddah Airport to Makkah Private Transfer | Duyuf Al Rahman VIP',
      seoDescription: 'Book a private transfer from KAIA Jeddah Airport to your hotel in Makkah. Free flight radar tracking, door-to-door luggage care, pay cash to driver on arrival.',
      h1: 'Jeddah Airport (KAIA) to Makkah Private Taxi & Chauffeur',
      subtitle: 'Direct Terminal Meet & Greet with Flight Radar Tracking and Door-to-Door Luggage Care to Central Makkah Hotels',
      overview: 'Arriving at King Abdulaziz International Airport (JED) is the first sacred step of your Umrah pilgrimage. Our private VIP chauffeur service meets your family inside the terminal with a personalized digital name sign, assists with all heavy luggage and strollers, and transfers you directly to the doorstep of your hotel in Makkah via the Route 40 Expressway without bus queues or shared transit delays.',
      inclusions: [
        'Terminal meet & greet at Terminal 1 (Aquarium concourse) or North Terminal',
        '60-90 minutes complimentary flight delay buffer after actual aircraft landing',
        'Automated live flight radar monitoring against ATC radar updates',
        'Direct hotel lobby drop-off across all Central, Ajyad, and Aziziyah zones',
        'Secure luggage handling accommodating Zamzam containers and large suitcases',
        'Zero advance deposit — pay cash directly to your driver upon arrival in SAR or USD',
      ],
      highwayNote: 'Route 40 / Makkah-Jeddah Expressway (6 Lanes, Speed-camera monitored)',
      authoritySource: 'General Authority of Civil Aviation (GACA) & Ministry of Hajj and Umrah Guidelines',
      faqs: [
        {
          question: 'How long does the journey take from Jeddah Airport to Makkah?',
          answer: 'The travel time is approximately 75 to 90 minutes covering 95 km via the Route 40 Expressway directly to your hotel doorstep in Makkah.',
        },
        {
          question: 'What happens if my flight to Jeddah is delayed?',
          answer: 'We track your incoming flight in real time using automated radar. Your chauffeur adjusts their dispatch time accordingly and provides 60 to 90 minutes of free waiting time from the moment your aircraft touches down.',
        },
        {
          question: 'What payment methods do you accept for the Jeddah to Makkah transfer?',
          answer: 'We operate strictly under a Pay-the-Driver policy. You pay the full fixed fare directly to your chauffeur in cash (Saudi Riyals - SAR or US Dollars - USD) upon arriving at your Makkah hotel. We do not require any advance deposit and do not accept credit cards or online payments.',
        },
      ],
    },
    ar: {
      seoTitle: 'توصيل من مطار جدة إلى فنادق مكة المكرمة | ضيوف الرحمن VIP',
      seoDescription: 'احجز سيارة خاصة وسائق VIP من مطار الملك عبدالعزيز بجدة (KAIA) إلى فندقك بمكة المكرمة. تتبع طيران مباشر، مساعدة أمتعة متكاملة، والدفع نقداً عند الوصول.',
      h1: 'توصيل خاص من مطار جدة (KAIA) إلى فنادق مكة المكرمة - تاكسي وسائق VIP',
      subtitle: 'استقبال مباشر من صالات المطار مع تتبع الرحلات وخدمة أمتعة حتى باب فندقك بالحرم المكي',
      overview: 'يمثل الوصول إلى مطار الملك عبدالعزيز الدولي الخطوة الأولى في رحلتك الإيمانية المباركة لأداء العمرة. يضمن لك سائقنا الخاص استقبالاً راقياً بلوحة اسم إلكترونية فور خروجك من الصالة، مع مساعدة كاملة في تحميل الحقائب وعربات الأطفال، والانطلاق المباشر إلى باب فندقك بمكة المكرمة عبر طريق مكة - جدة السريع (طريق 40) دون انتظار.',
      inclusions: [
        'استقبال في صالات الوصول بالصالة رقم 1 (بجوار الحوض المائي) أو الصالة الشمالية',
        'فترة انتظار مجانية تمتد من 60 إلى 90 دقيقة بعد هبوط الطائرة الفعلي',
        'متابعة حية لرقم الرحلة عبر رادار الطيران للتعامل التلقائي مع أي تأخير',
        'توصيل مباشر لباب الفندق في المنطقة المركزية، أجياد، والعزيزية',
        'مساحة مخصصة وآمنة لحمل عبوات مياه زمزم 5 لتر والحقائب الكبيرة',
        'بدون أي دفع مسبق — الدفع نقداً (ريال سعودي أو دولار) مباشرة للسائق عند الوصول إلى فندقك',
      ],
      highwayNote: 'طريق مكة - جدة السريع (طريق 40) - 6 مسارات ومراقب بكاميرات السلامة ساهر',
      authoritySource: 'الهيئة العامة للطيران المدني (GACA) وتوجيهات وزارة الحج والعمرة',
      faqs: [
        {
          question: 'كم تستغرق المسافة والوقت من مطار جدة إلى فنادق مكة المكرمة؟',
          answer: 'تبلغ المسافة 95 كم، وتستغرق الرحلة ما بين 75 إلى 90 دقيقة عبر طريق مكة السريع حتى باب فندقك بمكة المكرمة.',
        },
        {
          question: 'ماذا يحدث في حال تأخرت رحلة الطيران القادمة إلى جدة؟',
          answer: 'نقوم بتتبع رحلتك الجوية لحظة بلحظة عبر الرادار الملاحي، ويصل سائقك بناءً على موعد الهبوط الفعلي مع فترة انتظار مجانية كافية من 60 إلى 90 دقيقة بعد الهبوط.',
        },
        {
          question: 'كيف يتم سداد قيمة التوصيل من مطار جدة إلى مكة؟',
          answer: 'يتم دفع الأجرة كاملة نقداً كاش (بالريال السعودي أو الدولار الأمريكي) مباشرة للسائق بعد وصولك سالماً إلى فندقك بمكة. لا نشترط أي عربون مسبق ولا نقبل الدفع بالبطاقات البنكية.',
        },
      ],
    },
    ms: {
      seoTitle: 'Pengangkutan Lapangan Terbang Jeddah ke Makkah | Duyuf Al Rahman VIP',
      seoDescription: 'Tempah teksi VIP peribadi dari Lapangan Terbang Jeddah (KAIA) terus ke hotel Makkah. Penjejakan penerbangan, ruang bagasi Zamzam, bayar tunai semasa ketibaan.',
      h1: 'Pengangkutan Peribadi Lapangan Terbang Jeddah (KAIA) ke Makkah',
      subtitle: 'Sambutan Mesra di Terminal dengan Penjejakan Penerbangan dan Penghantaran Terus ke Pintu Hotel Makkah',
      overview: 'Ketibaan di Lapangan Terbang Antarabangsa King Abdulaziz (JED) adalah permulaan ibadah Umrah anda. Pemandu peribadi kami menyambut keluarga anda di balai ketibaan dengan papan tanda nama, membantu mengangkat semua koper dan membawa anda terus ke hotel di Makkah melalui Lebuhraya Laluan 40.',
      inclusions: [
        'Pengambilan di Terminal 1 (Akuarium) atau Terminal Utara KAIA',
        'Masa menunggu percuma 60-90 minit selepas pendaratan pesawat',
        'Penjejakan radar penerbangan langsung secara automatik',
        'Penghantaran terus ke lobi hotel di kawasan Markaziyah, Ajyad dan Aziziyah',
        'Ruang muatan selamat untuk koper besar dan botol air Zamzam 5L',
        'Tanpa sebarang bayaran pendahuluan — bayar tunai (SAR atau USD) kepada pemandu semasa ketibaan',
      ],
      highwayNote: 'Lebuhraya Makkah-Jeddah (Laluan 40) - 6 lorong dengan kawalan had laju',
      authoritySource: 'GACA & Kementerian Haji dan Umrah Arab Saudi',
      faqs: [
        {
          question: 'Berapakah masa perjalanan dari Lapangan Terbang Jeddah ke Makkah?',
          answer: 'Masa perjalanan mengambil masa sekitar 75 hingga 90 minit bagi jarak 95 km terus ke pintu hotel anda di Makkah.',
        },
        {
          question: 'Bagaimana cara pembayaran bagi laluan ini?',
          answer: 'Pembayaran dibuat secara tunai sepenuhnya (SAR atau USD) kepada pemandu semasa tiba di hotel Makkah anda. Tiada bayaran pendahuluan atau penggunaan kad kredit.',
        },
      ],
    },
    id: {
      seoTitle: 'Antar Jemput Bandara Jeddah ke Makkah VIP | Duyuf Al Rahman VIP',
      seoDescription: 'Sewa mobil privat dari Bandara KAIA Jeddah ke hotel Makkah. Lacak penerbangan live, sopir ramah menyambut di terminal, bayar tunai saat tiba di hotel.',
      h1: 'Antar Jemput Privat Bandara Jeddah (KAIA) ke Hotel Makkah',
      subtitle: 'Penjemputan Resmi di Terminal Kedatangan dengan Pelacakan Radar Pesawat dan Layanan Bagasi Penuh',
      overview: 'Mendarat di Bandara Internasional King Abdulaziz (JED) menandai awal perjalanan ibadah Umroh Anda. Sopir privat kami menyambut keluarga Anda di dalam terminal dengan papan nama digital, membantu membawakan koper, dan mengantar langsung ke lobi hotel Makkah melalui Tol Rute 40 tanpa perlu antre bus.',
      inclusions: [
        'Penyambutan di Terminal 1 (area akuarium) atau Terminal Utara KAIA',
        'Bebas biaya tunggu 60-90 menit setelah pesawat mendarat',
        'Pemantauan radar otomatis langsung sesuai jadwal pendaratan pesawat',
        'Pengantaran langsung ke lobi hotel di area Ring 1 Markaziyah, Ajyad, dan Aziziyah',
        'Penanganan bagasi aman termasuk koper besar dan jeriken air Zamzam 5 liter',
        'Tanpa uang muka — bayar tunai (SAR atau USD) langsung ke sopir setibanya di hotel',
      ],
      highwayNote: 'Jalan Tol Makkah-Jeddah (Rute 40) - 6 lajur dengan kamera pengawas keselamatan',
      authoritySource: 'Otoritas Penerbangan Sipil (GACA) dan Kementerian Haji & Umroh',
      faqs: [
        {
          question: 'Berapa lama perjalanan dari Bandara Jeddah ke Makkah dengan mobil privat?',
          answer: 'Waktu perjalanan sekitar 75 hingga 90 menit menempuh jarak 95 km langsung ke depan hotel Anda di Makkah.',
        },
        {
          question: 'Bagaimana cara bayar antar jemput ini?',
          answer: 'Pembayaran dilakukan secara tunai (SAR atau USD) langsung ke sopir saat tiba di hotel Makkah. Tanpa uang muka dan tanpa kartu kredit.',
        },
      ],
    },
    ur: {
      seoTitle: 'جدہ ایئرپورٹ سے مکہ مکرمہ پرائیویٹ ٹرانسپورٹ | ضيوف الرحمن VIP',
      seoDescription: 'جدہ ایئرپورٹ (KAIA) سے مکہ کے ہوٹل تک آرام دہ پرائیویٹ کار سروس۔ ایئرپورٹ پر استقبال، فلائٹ ٹریکنگ، ہوٹل پہنچ کر نقد ادائیگی۔',
      h1: 'جدہ ایئرپورٹ (KAIA) سے مکہ مکرمہ ہوٹل پرائیویٹ ٹیکسی اور چوفیر',
      subtitle: 'ٹرمینل کے اندر نام کے بورڈ کے ساتھ استقبال اور مکہ ہوٹل کے دروازے تک محفوظ رسائی',
      overview: 'جدہ کنگ عبدالعزیز انٹرنیشنل ایئرپورٹ پر آمد آپ کے مبارک عمرہ سفر کا آغاز ہے۔ ہماری پرائیویٹ وی آئی پی کار سروس آپ کے اہل خانہ کا ٹرمینل پر استقبال کرتی ہے، بھاری سامان سنبھالنے میں مدد کرتی ہے اور مکہ-جدہ ایکسپریس وے کے ذریعے براہ راست آپ کے مکہ ہوٹل پہنچاتی ہے۔',
      inclusions: [
        'ٹرمینل 1 (ایکویریم ایریا) یا نارتھ ٹرمینل کے اندر باوقار استقبال',
        'طیارہ لینڈ ہونے کے بعد 60 سے 90 منٹ تک بالکل مفت انتظار کی سہولت',
        'فلائٹ کی تاخیر کو خودکار طریقے سے مانیٹر کرنے کے لیے لائیو ریڈار ٹریکنگ',
        'مرکزیہ، اجیاد اور عزیزیہ کے تمام ہوٹلوں کی لابی تک براہ راست ڈراپ آف',
        '5 لیٹر آب زمزم کین اور بڑے اٹیچی کیسز کے لیے محفوظ جگہ',
        'کوئی ایڈوانس ادائیگی نہیں — ہوٹل پہنچنے پر نقد (سعودی ریال یا امریکی ڈالر) ڈرائیور کو ادا کریں',
      ],
      highwayNote: 'طریق مکہ - جدہ السریع (روٹ 40) - 6 لین محفوظ شاہراہ',
      authoritySource: 'سعودی سول ایوی ایشن (GACA) اور وزارت حج و عمرہ',
      faqs: [
        {
          question: 'جدہ ایئرپورٹ سے مکہ ہوٹل پہنچنے میں کتنا وقت لگتا ہے؟',
          answer: 'شاہراہ 40 کے ذریعے 95 کلومیٹر کا فاصلہ تقریباً 75 سے 90 منٹ میں باآسانی طے ہو جاتا ہے۔',
        },
        {
          question: 'ادائیگی کا طریقہ کیا ہے؟',
          answer: 'کرایہ مکہ پہنچنے کے بعد ڈرائیور کو نقد (سعودی ریال یا امریکی ڈالر) ادا کیا جاتا ہے۔ کوئی ایڈوانس یا کریڈٹ کارڈ فیس نہیں ہے۔',
        },
      ],
    },
    fr: {
      seoTitle: 'Transfert Privé Aéroport de Djeddah vers La Mecque | Duyuf Al Rahman VIP',
      seoDescription: 'Réservez votre transfert privé de l’aéroport de Djeddah (KAIA) à votre hôtel à La Mecque. Suivi radar du vol, prise en charge bagages, paiement en espèces à l’arrivée.',
      h1: 'Transfert Privé Aéroport de Djeddah (KAIA) vers La Mecque',
      subtitle: 'Accueil Personnalisé en Terminal avec Suivi Radar de Vol et Dépose Directe à Votre Hôtel à La Mecque',
      overview: 'Votre arrivée à l’Aéroport International Roi Abdelaziz (JED) marque le début de votre Omra. Notre service de chauffeur privé VIP vous accueille dans le hall avec une pancarte à votre nom, prend en charge vos valises et poussettes, et vous conduit directement à la porte de votre hôtel à La Mecque via l’autoroute Route 40.',
      inclusions: [
        'Accueil personnalisé au Terminal 1 (près de l’aquarium) ou au Terminal Nord',
        '60 à 90 minutes d’attente gratuite après l’atterrissage effectif de l’avion',
        'Suivi du vol par radar en direct pour ajuster l’heure de prise en charge',
        'Dépose directe devant le hall des hôtels du secteur central, d’Ajyad et d’Aziziyah',
        'Espace sécurisé pour valises volumineuses et bidons de Zamzam 5L',
        'Zéro acompte — paiement en espèces (SAR ou USD) directement au chauffeur à l’arrivée',
      ],
      highwayNote: 'Autoroute Makkah-Djeddah (Route 40) - 6 voies surveillées par radar',
      authoritySource: 'Aviation Civile Saoudienne (GACA) & Ministère du Hajj et de la Omra',
      faqs: [
        {
          question: 'Combien de temps faut-il pour rejoindre La Mecque depuis l’aéroport de Djeddah ?',
          answer: 'Le trajet dure environ 75 à 90 minutes pour 95 km jusqu’à l’entrée de votre hôtel à La Mecque.',
        },
        {
          question: 'Comment s’effectue le paiement ?',
          answer: 'Le paiement est effectué intégralement en espèces (SAR ou USD) auprès de votre chauffeur à l’arrivée à votre hôtel à La Mecque. Aucun acompte n’est requis.',
        },
      ],
    },
    es: {
      seoTitle: 'Traslado Privado Aeropuerto de Yeda a La Meca | Duyuf Al Rahman VIP',
      seoDescription: 'Reserve su traslado privado desde el Aeropuerto de Yeda (KAIA) a su hotel en La Meca. Seguimiento de vuelos en tiempo real y pago en efectivo al llegar.',
      h1: 'Traslado Privado Aeropuerto de Yeda (KAIA) a La Meca',
      subtitle: 'Recepción Exclusiva en Terminal con Seguimiento de Vuelo y Traslado Directo al Hotel en La Meca',
      overview: 'Comience su peregrinación con total serenidad desde el Aeropuerto Internacional Rey Abdulaziz (JED). Nuestro chófer privado le esperará en la terminal de llegadas con un cartel con su nombre, le ayudará con el equipaje y le llevará en vehículo climatizado de lujo directamente a la puerta de su hotel en La Meca por la autovía Ruta 40.',
      inclusions: [
        'Recepción personalizada en Terminal 1 (junto al acuario) o Terminal Norte',
        '60 a 90 minutos de espera de cortesía tras el aterrizaje del avión',
        'Monitorización de vuelo en tiempo real para adaptarse a cualquier retraso',
        'Traslado directo a hoteles de las zonas Central, Ajyad y Aziziyah',
        'Capacidad asegurada para maletas grandes y bidones de agua Zamzam de 5 litros',
        'Sin fianza previa — pago en efectivo (SAR o USD) al chófer a la llegada al hotel',
      ],
      highwayNote: 'Autopista La Meca-Yeda (Ruta 40) - 6 carriles con control de velocidad',
      authoritySource: 'Autoridad de Aviación Civil (GACA) y Ministerio de Hajj y Umrah',
      faqs: [
        {
          question: '¿Cuánto tiempo dura el traslado del Aeropuerto de Yeda a La Meca?',
          answer: 'El viaje dura entre 75 y 90 minutos para cubrir los 95 km hasta la puerta de su hotel en La Meca.',
        },
        {
          question: '¿Cómo se abona el servicio?',
          answer: 'El servicio se abona en efectivo (Riyales Saudíes o Dólares USA) directamente al conductor al llegar a su hotel en La Meca.',
        },
      ],
    },
    de: {
      seoTitle: 'Privater Transfer Flughafen Dschidda nach Mekka | Duyuf Al Rahman VIP',
      seoDescription: 'Buchen Sie Ihren privaten VIP-Transfer vom Flughafen Dschidda (KAIA) zu Ihrem Hotel in Mekka. Flugradar-Tracking, Barzahlung beim Fahrer bei Ankunft.',
      h1: 'Privater Transfer Flughafen Dschidda (KAIA) nach Mekka',
      subtitle: 'Direkter Terminal-Empfang mit Flugverfolgung und Gepäckservice direkt vor Ihr Hotel in Mekka',
      overview: 'Ihr Umrah-Aufenthalt beginnt entspannt am Flughafen Dschidda (JED). Unser VIP-Chauffeur erwartet Sie in der Ankunftshalle mit Namensschild, kümmert sich um Ihr Gepäck und fährt Sie auf der 6-spurigen Autobahn 40 direkt vor Ihr Hotel in Mekka ohne Wartezeiten auf Busse.',
      inclusions: [
        'Empfang am Terminal 1 (Aquarium-Bereich) oder Nord-Terminal',
        '60 bis 90 Minuten kostenlose Wartezeit nach der Landung Ihres Flugzeugs',
        'Automatische Flugverfolgung per Radar für pünktliche Bereitstellung',
        'Direkter Drop-Off bei allen Hotels in der zentralen Zone, Ajyad und Aziziyah',
        'Sichere Mitnahme von großem Reisegepäck und 5L-Zamzam-Behältern',
        'Keine Anzahlung — Barzahlung (SAR oder USD) beim Fahrer bei Ankunft am Hotel',
      ],
      highwayNote: 'Mekka-Dschidda Autobahn (Route 40) - 6 Spuren mit Geschwindigkeitsüberwachung',
      authoritySource: 'General Authority of Civil Aviation (GACA) & Hajj-Ministerium',
      faqs: [
        {
          question: 'Wie lange dauert die Fahrt vom Flughafen Dschidda nach Mekka?',
          answer: 'Die Fahrzeit beträgt etwa 75 bis 90 Minuten für die 95 km lange Strecke direkt vor Ihr Hotel.',
        },
        {
          question: 'Wie wird bezahlt?',
          answer: 'Die Bezahlung erfolgt vollständig in bar (SAR oder USD) direkt beim Fahrer bei Ankunft am Hotel in Mekka.',
        },
      ],
    },
    tr: {
      seoTitle: 'Cidde Havalimanı - Mekke Özel VIP Transfer | Duyuf Al Rahman VIP',
      seoDescription: 'Cidde Havalimanı’ndan (KAIA) Mekke otelinize doğrudan özel VIP transfer. Uçuş takibi, bagaj desteği ve Mekke’ye varışta şoföre nakit ödeme.',
      h1: 'Cidde Havalimanı’ndan (KAIA) Mekke Otellerine Özel Transfer',
      subtitle: 'Terminalde Özel İsimlikle Karşılama, Canlı Uçuş Takibi ve Mekke Oteline Doğrudan Ulaşım',
      overview: 'Cidde Kral Abdülaziz Havalimanı’na (JED) inişinizle birlikte kutsal umre yolculuğunuz başlar. VIP özel şoförümüz ailenizi terminalde dijital isimlikle karşılar, valizlerinize yardımcı olur ve 40. Otoyol üzerinden doğrudan Mekke’deki otelinizin kapısına kadar konforla ulaştırır.',
      inclusions: [
        'Terminal 1 (Akvaryum salonu) veya Kuzey Terminali’nde özel karşılama',
        'Uçağın inişinden itibaren 60-90 dakika ücretsiz bekleme hakkı',
        'Uçuş gecikmelerini otomatik tespit eden canlı radar takibi',
        'Merkeziye, Ecyad ve Aziziye bölgelerindeki tüm otellere kapıda teslim',
        'Büyük valizler ve 5 litrelik Zemzem bidonları için tam bagaj hacmi',
        'Sıfır ön ödeme — Mekke’deki otele ulaştığınızda şoföre nakit (SAR veya USD) ödeme',
      ],
      highwayNote: 'Mekke-Cidde Otoyolu (40. Yol) - 6 şeritli modern emniyetli otoyol',
      authoritySource: 'GACA ve Suudi Hac ve Umre Bakanlığı Talimatları',
      faqs: [
        {
          question: 'Cidde Havalimanı’ndan Mekke’ye yolculuk ne kadar sürer?',
          answer: '95 km’lik mesafe otoyol üzerinden yaklaşık 75 ila 90 dakika sürmektedir.',
        },
        {
          question: 'Ödeme nasıl yapılır?',
          answer: 'Ödeme Mekke’deki otelinize varıldığında şoföre doğrudan nakit (Riyal veya Dolar) olarak yapılır. Ön ödeme veya kart kabul edilmez.',
        },
      ],
    },
    hi: {
      seoTitle: 'जेद्दा एयरपोर्ट से मक्का निजी वीआईपी ट्रांसफर | Duyuf Al Rahman VIP',
      seoDescription: 'जेद्दा हवाई अड्डा (KAIA) से मक्का होटल के लिए सीधी वीआईपी टैक्सी सेवा। रडार फ्लाइट ट्रैकिंग, होटल पहुंचने पर नकद भुगतान।',
      h1: 'जेद्दा एयरपोर्ट (KAIA) से मक्का शरीफ निजी वीआईपी ट्रांसफर',
      subtitle: 'टर्मिनल पर डिजिटल बोर्ड से स्वागत और मक्का के होटल तक सुरक्षित और सुगम यात्रा',
      overview: 'जेद्दा एयरपोर्ट पर उतरने के बाद अपनी उमरा यात्रा को शांतिपूर्ण बनाएं। हमारे पेशेवर ड्राइवर अराइवल हॉल में आपके नाम के साथ स्वागत करते हैं और बिना किसी बस की भीड़ के सीधे आपके मक्का होटल तक एक्सप्रेसवे 40 से पहुंचाते हैं।',
      inclusions: [
        'टर्मिनल 1 (एक्वेरियम के पास) या नॉर्थ टर्मिनल पर व्यक्तिगत स्वागत',
        'फ्लाइट लैंडिंग के बाद 60 से 90 मिनट तक मुफ्त वेटिंग की सुविधा',
        'फ्लाइट देरी की रडार द्वारा लाइव स्वचालित ट्रैकिंग',
        'मरकज़िया, अज्याद और अज़ीज़िया के सभी होटलों में सीधा ड्रॉप-ऑफ',
        'बड़ी अटैचियों और 5 लीटर ज़मज़म कैन के लिए सुरक्षित बूट स्पेस',
        'कोई अग्रिम जमा नहीं — मक्का पहुंचने पर ड्राइवर को नकद (SAR या USD) भुगतान',
      ],
      highwayNote: 'मक्का-जेद्दा एक्सप्रेसवे (रूट 40) - 6 लेन सुरक्षित राजमार्ग',
      authoritySource: 'सऊदी सिविल एविएशन (GACA) एवं हज मंत्रालय दिशानिर्देश',
      faqs: [
        {
          question: 'जेद्दा एयरपोर्ट से मक्का पहुंचने में कितना समय लगता है?',
          answer: '95 किमी का सफर एक्सप्रेसवे 40 द्वारा लगभग 75 से 90 मिनट में तय होता है।',
        },
        {
          question: 'भुगतान की व्यवस्था क्या है?',
          answer: 'किराया मक्का होटल पहुंचने पर ड्राइवर को नकद (सऊदी रियाल या अमेरिकी डॉलर) में दिया जाता है। कोई अग्रिम भुगतान नहीं है।',
        },
      ],
    },
  },
  'makkah-to-madinah': {
    en: {
      seoTitle: 'Makkah to Madinah Private Taxi & VIP Transfer | Duyuf Al Rahman VIP',
      seoDescription: 'Direct private transfer from your Makkah hotel to Madinah Al-Munawwarah. Fixed fares, climate-controlled comfort, SASCO Palm rest stops, pay cash on arrival.',
      h1: 'Makkah to Madinah Private Taxi & VIP Executive Chauffeur',
      subtitle: 'Peaceful Intercity Highway Transit via Al Hijrah Expressway with Flexible Prayer & Rest Stops',
      overview: 'Traveling between the two Holy Sanctuaries of Islam is a profound journey of faith. Our private chauffeur transfer provides an executive sanctuary of quiet, climate-controlled comfort over the 440 km Hijrah route. Travel on your own schedule with zero train station taxi transfers, generous luggage capacity, and stops at high-standard SASCO Palm highway rest areas.',
      inclusions: [
        'Direct hotel lobby to hotel lobby private transfer',
        'Flexible scheduled stops at modern SASCO Palm service stations',
        'Accommodates all large suitcases, strollers, and Zamzam containers',
        'Fixed transparent fare without highway toll or baggage surcharges',
        'Available 24 hours a day with professional licensed chauffeurs',
        'Pay cash to driver upon arrival (SAR or USD) — zero advance deposit',
      ],
      highwayNote: 'Route 15 / Al Hijrah Expressway (Multi-lane highway with modern SASCO service complexes)',
      authoritySource: 'Saudi Transport General Authority (TGA) & Special Forces for Road Security',
      faqs: [
        {
          question: 'How long does the drive take from Makkah to Madinah?',
          answer: 'The travel time is approximately 4.0 to 4.5 hours covering 440 km via the Route 15 Al Hijrah Expressway, including a comfortable rest stop.',
        },
        {
          question: 'Can the driver stop at clean family service areas for prayer?',
          answer: 'Yes. We stop at designated SASCO Palm service plazas featuring air-conditioned prayer halls, clean restrooms, coffee shops, and restaurants.',
        },
        {
          question: 'What is the payment policy for the Makkah to Madinah transfer?',
          answer: 'You pay your chauffeur in cash (SAR or USD) only after arriving safely at your hotel in Madinah. No advance deposit or credit cards required.',
        },
      ],
    },
    ar: {
      seoTitle: 'توصيل من مكة إلى المدينة المنورة | تاكسي وسائق VIP خاص',
      seoDescription: 'خدمة توصيل خاصة وراقية من فندقك بمكة المكرمة إلى فنادق المدينة المنورة. سيارات فارهة، توقفات استراحة مريحة، والدفع نقداً عند الوصول.',
      h1: 'توصيل خاص من مكة المكرمة إلى المدينة المنورة - تاكسي وسائق VIP',
      subtitle: 'انتقال هادئ ومريح عبر طريق الهجرة السريع مع توقفات مرنة للصلاة والاستراحة',
      overview: 'الانتقال بين الحرمين الشريفين رحلة إيمانية مباركة. يوفر لك سائقنا الخاص أعلى درجات الراحة والسكينة عبر طريق الهجرة السريع (440 كم) في سيارات حديثة ومكيفة، مع راحة تامة في مواعيد الانطلاق والتوقف في محطات ساسكو بالم الراقية، دون الحاجة لتبديل سيارات أو التقيد بمواعيد القطارات.',
      inclusions: [
        'توصيل من باب الفندق بمكة مباشرة إلى باب فندقك بالمدينة المنورة',
        'توقفات مرنة ومجدولة في محطات ساسكو بالم الحديثة والمكيفة',
        'اتساع كامل لكافة الحقائب الكبيرة وعربات الأطفال وعبوات ماء زمزم',
        'سعر ثابت للمركبة بالكامل شامل الوقود ورسوم الطرق والضرائب',
        'سائقون محترفون ومرخصون متواجدون على مدار 24 ساعة',
        'الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول — بدون دفع مسبق',
      ],
      highwayNote: 'طريق الهجرة السريع (طريق 15) - طريق سريع مجهز بأحدث مجمعات الاستراحة',
      authoritySource: 'الهيئة العامة للنقل (TGA) والقوات الخاصة لأمن الطرق',
      faqs: [
        {
          question: 'كم تستغرق الرحلة من مكة إلى المدينة المنورة بالسيارة الخاصة؟',
          answer: 'تستغرق الرحلة حوالي 4 إلى 4.5 ساعات لمسافة 440 كم عبر طريق الهجرة السريع، شاملة فترة استراحة مريحة.',
        },
        {
          question: 'هل تتوقف السيارة في استراحات مناسبة للعائلات للصلاة وتناول الطعام؟',
          answer: 'نعم، نتوقف في محطات ساسكو بالم النموذجية التي تضم مساجد مكيفة ومرافق عائلية ومطاعم ومقاهي نظيفة.',
        },
        {
          question: 'كيف يتم سداد قيمة الرحلة بين مكة والمدينة؟',
          answer: 'يتم دفع كامل المبلغ نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند وصولك سالماً لفندقك بالمدينة المنورة.',
        },
      ],
    },
    ms: {
      seoTitle: 'Pengangkutan Peribadi Makkah ke Madinah | Duyuf Al Rahman VIP',
      seoDescription: 'Tempah sewa kereta VIP dari hotel Makkah ke Madinah Al-Munawwarah. Tambang tetap, henti solat di SASCO Palm, bayar tunai semasa ketibaan.',
      h1: 'Pengangkutan Peribadi Makkah ke Madinah - Teksi VIP & Pemandu Peribadi',
      subtitle: 'Perjalanan Rentas Bandar yang Tenang Melalui Lebuhraya Al Hijrah dengan Hentian Solat & Rehat',
      overview: 'Perjalanan antara dua Tanah Suci adalah detik penuh keberkatan. Perkhidmatan pemandu peribadi kami menawarkan keselesaan berhawa dingin sepanjang laluan 440 km Lebuhraya Hijrah, membolehkan anda bergerak mengikut jadual sendiri tanpa kekangan bagasi.',
      inclusions: [
        'Pengambilan terus dari lobi hotel Makkah ke lobi hotel Madinah',
        'Hentian solat dan rehat di kawasan rehat moden SASCO Palm',
        'Muatan selamat untuk semua koper besar dan botol air Zamzam',
        'Harga tetap dan telus tanpa caj tol atau surcaj tersembunyi',
        'Perkhidmatan tersedia 24 jam dengan pemandu berlesen berpengalaman',
        'Bayaran tunai (SAR atau USD) terus kepada pemandu semasa ketibaan',
      ],
      highwayNote: 'Lebuhraya Al Hijrah (Laluan 15) - Lebuhraya moden berbilang lorong',
      authoritySource: 'Pihak Berkuasa Pengangkutan Am Saudi (TGA)',
      faqs: [
        {
          question: 'Berapakah masa perjalanan dari Makkah ke Madinah?',
          answer: 'Masa perjalanan mengambil masa sekitar 4.0 hingga 4.5 jam bagi jarak 440 km melalui Lebuhraya Al Hijrah.',
        },
        {
          question: 'Bagaimana cara pembayaran bagi perjalanan Makkah ke Madinah?',
          answer: 'Bayaran dijelaskan secara tunai (SAR atau USD) terus kepada pemandu semasa tiba di hotel Madinah anda.',
        },
      ],
    },
    id: {
      seoTitle: 'Travel & Sewa Mobil Makkah ke Madinah VIP | Duyuf Al Rahman VIP',
      seoDescription: 'Layanan mobil privat dari hotel Makkah ke Madinah Munawwarah. Tarif pasti per mobil, istirahat sholat di SASCO Palm, bayar tunai saat tiba.',
      h1: 'Transportasi Privat Makkah ke Madinah - VIP Chauffeur',
      subtitle: 'Perjalanan Antarkota Menenangkan Melalui Tol Al Hijrah dengan Fasilitas Istirahat & Sholat Nyaman',
      overview: 'Perjalanan antara dua Kota Suci menjadi lebih khusyuk dan nyaman dengan kendaraan privat ber-AC. Anda bebas menentukan jam berangkat, membawa koper keluarga tanpa batasan kereta cepat, dan beristirahat di rest area SASCO Palm yang lengkap.',
      inclusions: [
        'Antar jemput langsung dari lobi hotel Makkah ke lobi hotel Madinah',
        'Pemberhentian terjadwal di rest area modern SASCO Palm ber-AC',
        'Kapasitas muat luas untuk koper besar, stroller, dan jeriken Zamzam',
        'Tarif pasti transparan tanpa biaya tol atau bagasi tambahan',
        'Layanan 24 jam dengan sopir berpengalaman dan berizin resmi',
        'Pembayaran tunai (SAR atau USD) langsung ke sopir saat tiba di Madinah',
      ],
      highwayNote: 'Jalan Tol Al Hijrah (Rute 15) - Jalur utama antarkota berstandar tinggi',
      authoritySource: 'Otoritas Umum Transportasi Saudi (TGA)',
      faqs: [
        {
          question: 'Berapa jam perjalanan dari Makkah ke Madinah?',
          answer: 'Waktu perjalanan sekitar 4 hingga 4,5 jam menempuh jarak 440 km via Tol Hijrah Rute 15.',
        },
        {
          question: 'Bagaimana pembayaran perjalanan Makkah ke Madinah?',
          answer: 'Pembayaran tunai langsung ke sopir setelah sampai di hotel Madinah dalam mata uang SAR atau USD.',
        },
      ],
    },
    ur: {
      seoTitle: 'مکہ مکرمہ سے مدینہ منورہ پرائیویٹ کار سروس | ضيوف الرحمن VIP',
      seoDescription: 'مکہ کے ہوٹل سے مدینہ منورہ کے ہوٹل تک آرام دہ پرائیویٹ گاڑی۔ مقررہ کرایہ، ہجرہ ہائی وے پر پرسکون سفر، پہنچنے پر نقد ادائیگی۔',
      h1: 'مکہ مکرمہ سے مدینہ منورہ پرائیویٹ ٹیکسی اور ایگزیکٹو کار سروس',
      subtitle: 'طریق الہجرہ ایکسپریس وے کے ذریعے پرسکون سفر، نماز اور آرام کی سہولت کے ساتھ',
      overview: 'حرمین شریفین کے درمیان سفر ایک مقدس اور بابرکت مرحلہ ہے۔ ہماری پرائیویٹ وی آئی پی کار سروس 440 کلومیٹر کے ہجرہ روٹ پر آپ کے اہل خانہ کو پرسکون اور ایئرکنڈیشنڈ ماحول فراہم کرتی ہے جہاں آپ اپنی مرضی کے وقت پر روانہ ہو سکتے ہیں۔',
      inclusions: [
        'مکہ ہوٹل کی لابی سے مدینہ ہوٹل کی لابی تک براہ راست پرائیویٹ ٹرانسفر',
        'راستے میں جدید ساسکو پام اسٹیشنز پر نماز اور آرام کے لیے باآسانی توقف',
        'بڑے اٹیچی کیسز، اسٹرولرز اور زمزم کے کین کے لیے وسیع جگہ',
        'مکمل مقررہ کرایہ جس میں ہائی وے ٹول اور ٹیکس شامل ہیں',
        'پیشہ ور لائسنس یافتہ ڈرائیورز 24 گھنٹے دستیاب',
        'پہنچنے پر نقد ادائیگی (سعودی ریال یا امریکی ڈالر) — بغیر کسی ایڈوانس فیس کے',
      ],
      highwayNote: 'طریق الہجرہ ایکسپریس وے (روٹ 15) - محفوظ ترین اور جدید ہائی وے',
      authoritySource: 'سعودی جنرل ٹرانسپورٹ اتھارٹی (TGA)',
      faqs: [
        {
          question: 'مکہ سے مدینہ منورہ کا سفر کتنا طویل ہے؟',
          answer: 'طریق الہجرہ پر 440 کلومیٹر کا فاصلہ مختصر وقفے کے ساتھ تقریباً 4 سے 4.5 گھنٹے میں طے ہوتا ہے۔',
        },
        {
          question: 'کرایہ کب اور کیسے ادا کیا جاتا ہے؟',
          answer: 'کرایہ مدینہ منورہ ہوٹل پہنچنے کے بعد ڈرائیور کو نقد (سعودی ریال یا امریکی ڈالر) ادا کیا جاتا ہے۔',
        },
      ],
    },
    fr: {
      seoTitle: 'Transfert Privé La Mecque vers Médine | Duyuf Al Rahman VIP',
      seoDescription: 'Transfert VTC privé entre La Mecque et Médine Al-Munawwarah. Tarif fixe, confort haut de gamme, haltes prière à SASCO Palm, paiement en espèces à l’arrivée.',
      h1: 'Transfert Privé La Mecque vers Médine - Chauffeur VIP Dédié',
      subtitle: 'Trajet Interurbain Paisible sur l’Autoroute Al Hijrah avec Haltes Prière & Détente',
      overview: 'Le voyage entre les deux Sanctuaires Sacrés de l’Islam est un moment spirituel privilégié. Notre service de chauffeur privé assure votre transfert porte-à-porte sur les 440 km de l’autoroute Al Hijrah en véhicule climatisé avec haltes de repos dans les complexes SASCO Palm.',
      inclusions: [
        'Prise en charge directe de hall d’hôtel à hall d’hôtel',
        'Arrêts programmés et flexibles aux aires de repos modernes SASCO Palm',
        'Capacité complète pour bagages volumineux, poussettes et bidons de Zamzam',
        'Tarif fixe et transparent sans supplément péage ni frais cachés',
        'Disponibilité 24h/24 avec chauffeurs professionnels expérimentés',
        'Paiement en espèces (SAR ou USD) au chauffeur à l’arrivée à Médine',
      ],
      highwayNote: 'Autoroute Al Hijrah (Route 15) - Voie rapide moderne multi-voies',
      authoritySource: 'Autorité Générale du Transport Saoudien (TGA)',
      faqs: [
        {
          question: 'Quelle est la durée du trajet de La Mecque à Médine ?',
          answer: 'Le trajet dure environ 4h00 à 4h30 pour parcourir 440 km par l’autoroute Route 15 avec arrêt détente.',
        },
        {
          question: 'Comment s’effectue le règlement ?',
          answer: 'Le règlement s’effectue en espèces (SAR ou USD) auprès de votre chauffeur à l’arrivée à votre hôtel à Médine.',
        },
      ],
    },
    es: {
      seoTitle: 'Traslado Privado La Meca a Medina | Duyuf Al Rahman VIP',
      seoDescription: 'Traslado privado en vehículo VIP de hotel a hotel entre La Meca y Medina. Tarifa fija, paradas de descanso en SASCO Palm, pago en efectivo al llegar.',
      h1: 'Traslado Privado La Meca a Medina - Chófer VIP Exclusivo',
      subtitle: 'Tránsito Interurbano Confortable por la Autovía Al Hijrah con Paradas para Rezo y Descanso',
      overview: 'El viaje entre los dos Santos Lugares en vehículo privado con chófer le permite desplazarse con la máxima privacidad, a su propio ritmo y sin las limitaciones de equipaje del tren, parando en las mejores áreas de descanso SASCO Palm de la autovía Al Hijrah.',
      inclusions: [
        'Traslado privado directo de lobi a lobi entre La Meca y Medina',
        'Paradas programadas y flexibles en áreas de servicio modernas SASCO Palm',
        'Capacidad total para maletas grandes, carritos infantiles y bidones de agua Zamzam',
        'Tarifa fija garantizada sin sobrecostes por peajes ni combustible',
        'Disponibilidad 24 horas con conductores profesionales autorizados',
        'Pago en efectivo (SAR o USD) al conductor a la llegada a Medina',
      ],
      highwayNote: 'Autovía Al Hijrah (Ruta 15) - Autopista rápida multicarril',
      authoritySource: 'Autoridad General del Transporte de Arabia Saudita (TGA)',
      faqs: [
        {
          question: '¿Cuánto dura el viaje de La Meca a Medina en coche privado?',
          answer: 'El trayecto dura aproximadamente entre 4 y 4,5 horas para 440 km por la autovía Ruta 15.',
        },
        {
          question: '¿Cómo se abona el viaje?',
          answer: 'El abono se realiza en efectivo (Riyales Saudíes o Dólares USA) directamente al chófer al llegar a Medina.',
        },
      ],
    },
    de: {
      seoTitle: 'Privater Transfer Mekka nach Medina | Duyuf Al Rahman VIP',
      seoDescription: 'Direkter Chauffeur-Transfer von Ihrem Hotel in Mekka nach Medina. Fester Preis, Pausen an SASCO Palm Raststätten, Barzahlung bei Ankunft.',
      h1: 'Privater Transfer Mekka nach Medina - VIP Chauffeur Service',
      subtitle: 'Entspannte Fernfahrt über die Al Hijrah Autobahn mit Flexiblen Gebets- und Rastpausen',
      overview: 'Die Reise zwischen den beiden Heiligen Stätten des Islam auf der 440 km langen Al Hijrah Autobahn gestaltet sich in unseren klimatisierten VIP-Fahrzeugen besonders erholsam. Reisen Sie nach Ihrem Zeitplan mit Halt an sauberen SASCO Palm Raststätten direkt bis zu Ihrem Hotel in Medina.',
      inclusions: [
        'Direkter Transfer von Hotellobby zu Hotellobby',
        'Flexible Pausen an modernen, sauberen SASCO Palm Raststätten',
        'Vollständige Mitnahme aller Großkoffer, Kinderwagen und Zamzam-Behälter',
        'Garantierter Festpreis ohne Maut- oder Gepäckzuschläge',
        'Rund um die Uhr verfügbar mit zertifizierten Berufschauffeuren',
        'Barzahlung beim Fahrer bei Ankunft (SAR oder USD) — ohne Anzahlung',
      ],
      highwayNote: 'Al Hijrah Autobahn (Route 15) - Moderne mehrspurige Schnellstraße',
      authoritySource: 'Saudi Transport General Authority (TGA)',
      faqs: [
        {
          question: 'Wie lange dauert die Fahrt von Mekka nach Medina?',
          answer: 'Die Fahrzeit beträgt etwa 4,0 bis 4,5 Stunden für die 440 km lange Strecke über die Route 15 inklusive Rastpause.',
        },
        {
          question: 'Wie erfolgt die Bezahlung?',
          answer: 'Die Bezahlung erfolgt vollständig in bar (SAR oder USD) direkt beim Fahrer bei der Ankunft in Medina.',
        },
      ],
    },
    tr: {
      seoTitle: 'Mekke - Medine Özel VIP Transfer | Duyuf Al Rahman VIP',
      seoDescription: 'Mekke otelinizden Medine-i Münevvere’ye doğrudan özel VIP transfer. Sabit fiyat garantisi, SASCO Palm dinlenme molaları, varışta nakit ödeme.',
      h1: 'Mekke’den Medine’ye Özel Transfer - VIP Şoförlü Hizmet',
      subtitle: 'Hicret Otoyolu Üzerinden Medine’ye Konforlu Şehirlerarası Seyahat ve İhtiyaç Molaları',
      overview: 'İki Harem-i Şerif arasındaki yolculuğunuzu klimalı lüks VIP araçlarımızla huzur içinde gerçekleştirin. Tren saatlerine veya bagaj sınırlamalarına bağlı kalmadan, ailenizle birlikte Hicret Otoyolu üzerinde modern SASCO tesislerinde mola vererek doğrudan otelinizin kapısına ulaşın.',
      inclusions: [
        'Mekke otel lobisinden Medine otel lobisine doğrudan özel transfer',
        'Modern ve temiz SASCO Palm dinlenme tesislerinde planlı namaz molaları',
        'Büyük valizler, pusetler ve Zemzem bidonları için geniş bagaj hacmi',
        'Geçiş ücretleri ve vergiler dahil kesin sabit fiyat',
        'Lisanslı profesyonel şoförlerle 7/24 kesintisiz hizmet',
        'Medine’deki otele varışta şoföre nakit ödeme (SAR veya USD)',
      ],
      highwayNote: 'Hicret Otoyolu (15. Yol) - Yüksek standartlı çok şeritli otoyol',
      authoritySource: 'Suudi Ulaştırma Genel Otoritesi (TGA)',
      faqs: [
        {
          question: 'Mekke’den Medine’ye özel araçla yolculuk ne kadar sürer?',
          answer: '440 km’lik mesafe mola dahil yaklaşık 4 ila 4,5 saat sürmektedir.',
        },
        {
          question: 'Ödeme nasıl yapılır?',
          answer: 'Ödeme Medine’deki otele ulaşıldığında şoföre nakit olarak (SAR veya USD) yapılır.',
        },
      ],
    },
    hi: {
      seoTitle: 'मक्का से मदीना निजी वीआईपी टैक्सी सेवा | Duyuf Al Rahman VIP',
      seoDescription: 'मक्का होटल से मदीना शरीफ के लिए सीधी निजी गाड़ी। निश्चित किराया, सास्को पाम विश्राम स्थल, होटल पहुंचने पर नकद भुगतान।',
      h1: 'मक्का शरीफ से मदीना मुनव्वरा निजी वीआईपी टैक्सी सेवा',
      subtitle: 'हिजरा एक्सप्रेसवे से आरामदायक अंतरनगरीय यात्रा, नमाज़ और विश्राम की पूरी सुविधा',
      overview: 'दोनों पवित्र हरमों के बीच की यात्रा को सुकूनदायक बनाएं। हमारी वातानुकूलित गाड़ियां आपको मक्का होटल की लॉबी से सीधे मदीना होटल तक ले जाती हैं, जहां आप अपनी सुविधा से चल सकते हैं और सास्को पाम रेस्ट एरिया में रुक सकते हैं।',
      inclusions: [
        'मक्का होटल लॉबी से मदीنا होटल लॉबी तक सीधा ड्रॉप-ऑफ',
        'सास्को पाम के आधुनिक रेस्ट एरिया में नमाज़ और खान-पान के लिए ठहराव',
        'बड़े सूटकेस, बच्चों की ट्रॉली और ज़मज़म पानी के डिब्बों के लिए सुरक्षित जगह',
        'टोल और टैक्स सहित पूरी तरह निश्चित पारदर्शी किराया',
        '24 घंटे उपलब्ध प्रमाणित और अनुभवी ड्राइवर',
        'मदीना पहुंचने पर ड्राइवर को नकद भुगतान (SAR या USD) — बिना किसी अग्रिम जमा के',
      ],
      highwayNote: 'हिजरा एक्सप्रेसवे (रूट 15) - सुरक्षित राजमार्ग',
      authoritySource: 'सऊदी परिवहन प्राधिकरण (TGA)',
      faqs: [
        {
          question: 'मक्का से मदीना की दूरी और समय कितना है?',
          answer: '440 किमी की दूरी लगभग 4 से 4.5 घंटे में हिजरा एक्सप्रेसवे से पूरी होती है।',
        },
        {
          question: 'भुगतान की व्यवस्था क्या है?',
          answer: 'मदीना होटल पहुंचने पर ड्राइवर को नकद (SAR या USD) दिया जाता है।',
        },
      ],
    },
  },
  'madinah-airport-to-hotel': {
    en: {
      seoTitle: 'Madinah Airport (MED) to Central Hotel Transfer | Duyuf Al Rahman VIP',
      seoDescription: 'Private chauffeur transfer from Prince Mohammad Bin Abdulaziz Airport (MED) to Madinah Central Area hotels. Fixed rates, flight tracking, cash on arrival.',
      h1: 'Madinah Airport (MED) to Central Hotel Private Transfer',
      subtitle: 'Fast Terminal Meet & Greet with Flight Radar Tracking to Markaziyah & Northern/Southern Haram Hotels',
      overview: 'Arriving at Prince Mohammad bin Abdulaziz International Airport (MED) is the serene start of your visit to the Prophet’s Mosque. Our private chauffeur service meets you inside the arrival hall with a personalized name sign, assists with all baggage, and delivers you directly to your hotel in the Northern, Southern, or Central Area (Markaziyah) in approximately 20 to 25 minutes.',
      inclusions: [
        'Meet & greet inside MED arrival hall holding a personalized digital name sign',
        '60-90 minutes complimentary airport waiting buffer from aircraft touchdown',
        'Live flight radar tracking for automated arrival schedule coordination',
        'Direct drop-off at all Northern, Southern, and Central Markaziyah hotels',
        'Ample trunk capacity for large suitcases and Zamzam containers',
        'Pay cash to driver upon arrival (SAR or USD) — zero advance deposit',
      ],
      highwayNote: 'Airport Expressway / King Abdulaziz Road (Fast dual carriageway to Central Markaziyah)',
      authoritySource: 'General Authority of Civil Aviation (GACA) & Madinah Region Development Authority',
      faqs: [
        {
          question: 'How far is Madinah Airport (MED) from the Prophet’s Mosque (Markaziyah hotels)?',
          answer: 'The airport is approximately 22 km from the Central Area (Markaziyah) surrounding Al-Masjid an-Nabawi. The drive takes about 20 to 25 minutes in normal traffic.',
        },
        {
          question: 'Where does the chauffeur meet us at Madinah Airport?',
          answer: 'Your driver meets you inside the public arrival hall directly after customs clearance holding a tablet displaying your name.',
        },
        {
          question: 'What is the payment policy for Madinah Airport transfers?',
          answer: 'Payment is cash only (SAR or USD) made directly to your chauffeur upon arriving at your Madinah hotel. No advance payment or card deposit.',
        },
      ],
    },
    ar: {
      seoTitle: 'توصيل من مطار المدينة المنورة (MED) إلى فنادق الحرم | ضيوف الرحمن VIP',
      seoDescription: 'خدمة توصيل خاصة وراقية من مطار الأمير محمد بن عبدالعزيز بالمدينة المنورة إلى فنادق المنطقة المركزية والحرم النبوي. تتبع طيران، والدفع نقداً عند الوصول.',
      h1: 'توصيل خاص من مطار المدينة (MED) إلى فنادق المنطقة المركزية والحرم',
      subtitle: 'استقبال سريع بصالة الوصول وتوصيل مباشر لباب فندقك بالمنطقة المركزية الشمالية والجنوبية',
      overview: 'يمثل الوصول إلى مطار الأمير محمد بن عبدالعزيز الدولي (MED) بداية زيارتك المباركة للمسجد النبوي الشريف. يستقبلك سائقنا الخاص داخل صالة القدوم بلوحة اسم رقمية، ويساعدك في نقل كافة الحقائب، لتصل إلى باب فندقك في المنطقة المركزية في غضون 20 إلى 25 دقيقة فقط بكل راحة وسكينة.',
      inclusions: [
        'استقبال راقٍ بصالة الوصول حاملاً لوحة رقمية باسمك الكريم',
        'فترة انتظار مجانية تمتد من 60 إلى 90 دقيقة بعد هبوط الطائرة',
        'متابعة حية للرحلة بالرادار لضمان تواجد السائق في الموعد المحدد',
        'توصيل مباشر لباب كافة فنادق المركزية الشمالية، الجنوبية، والغربية',
        'مساحة واسعة لكافة الحقائب الكبيرة وعربات الأطفال وعبوات ماء زمزم',
        'الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول — بدون دفع مسبق',
      ],
      highwayNote: 'طريق المطار السريع / طريق الملك عبدالعزيز الرابط بالمنطقة المركزية',
      authoritySource: 'الهيئة العامة للطيران المدني (GACA) وهيئة تطوير منطقة المدينة المنورة',
      faqs: [
        {
          question: 'كم تبعد المسافة والوقت من مطار المدينة إلى فنادق الحرم النبوي؟',
          answer: 'تبعد المسافة حوالي 22 كم، وتستغرق الرحلة ما بين 20 إلى 25 دقيقة عبر طريق المطار السريع مباشرة إلى فندقك بالمنطقة المركزية.',
        },
        {
          question: 'أين ينتظرني السائق في مطار الأمير محمد بن عبدالعزيز؟',
          answer: 'ينتظرك السائق في صالة القادمين العامة فور خروجك من التفتيش الجمركي حاملاً لوحة باسمك.',
        },
        {
          question: 'كيف يتم سداد قيمة التوصيل من مطار المدينة؟',
          answer: 'يتم دفع المبلغ كاملاً نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند وصولك سالماً إلى فندقك بالمدينة المنورة.',
        },
      ],
    },
    ms: {
      seoTitle: 'Pengangkutan Lapangan Terbang Madinah (MED) ke Hotel | Duyuf Al Rahman VIP',
      seoDescription: 'Perkhidmatan teksi VIP dari Lapangan Terbang Madinah (MED) ke hotel Markaziyah Masjid Nabawi. Harga tetap, penjejakan penerbangan, bayar tunai di hotel.',
      h1: 'Pengangkutan Lapangan Terbang Madinah (MED) ke Hotel Markaziyah',
      subtitle: 'Sambutan Pantas di Balai Ketibaan dengan Penghantaran Terus ke Hotel Kawasan Masjid Nabawi',
      overview: 'Ketibaan di Lapangan Terbang Antarabangsa Putera Mohammad bin Abdulaziz (MED) menandakan detik ziarah anda ke Masjid Nabawi. Pemandu kami menyambut anda di balai ketibaan dengan papan nama, membantu bagasi dan membawa anda terus ke hotel di kawasan Markaziyah dalam masa 20-25 minit.',
      inclusions: [
        'Sambutan di balai ketibaan MED dengan papan tanda digital',
        'Masa menunggu percuma 60-90 minit selepas pesawat mendarat',
        'Penjejakan radar penerbangan langsung untuk koordinasi jadual',
        'Penghantaran terus ke hotel di Zon Utara, Selatan dan Barat Markaziyah',
        'Ruang bagasi luas untuk koper dan botol air Zamzam',
        'Bayaran tunai (SAR atau USD) terus kepada pemandu semasa ketibaan di hotel',
      ],
      highwayNote: 'Lebuhraya Lapangan Terbang Madinah / Jalan King Abdulaziz',
      authoritySource: 'GACA & Pihak Berkuasa Pembangunan Madinah',
      faqs: [
        {
          question: 'Berapakah jarak dari Lapangan Terbang Madinah ke Masjid Nabawi?',
          answer: 'Jaraknya kira-kira 22 km dan mengambil masa perjalanan sekitar 20 hingga 25 minit.',
        },
        {
          question: 'Bagaimana cara pembayaran?',
          answer: 'Bayaran dibuat secara tunai (SAR atau USD) kepada pemandu semasa tiba di hotel Madinah anda.',
        },
      ],
    },
    id: {
      seoTitle: 'Antar Jemput Bandara Madinah (MED) ke Hotel | Duyuf Al Rahman VIP',
      seoDescription: 'Layanan antar jemput mobil privat dari Bandara Madinah (MED) ke hotel area Masjid Nabawi Markaziyah. Tarif pasti, lacak penerbangan, bayar tunai saat tiba.',
      h1: 'Antar Jemput Privat Bandara Madinah (MED) ke Hotel Markaziyah',
      subtitle: 'Penyambutan Cepat di Aula Kedatangan Menuju Hotel Area Masjid Nabawi',
      overview: 'Mendarat di Bandara Internasional Pangeran Mohammad bin Abdulaziz (MED) adalah awal ziarah Anda ke Masjid Nabawi. Sopir kami menyambut Anda di aula kedatangan dengan papan nama, membawakan koper, dan mengantar langsung ke hotel di kawasan Markaziyah dalam 20 hingga 25 menit.',
      inclusions: [
        'Penyambutan di aula kedatangan MED dengan papan nama digital',
        'Bebas biaya tunggu 60-90 menit setelah pesawat mendarat',
        'Pemantauan radar otomatis jadwal kedatangan penerbangan',
        'Pengantaran langsung ke lobi hotel Markaziyah Utara, Selatan, dan Barat',
        'Kapasitas bagasi lega untuk koper dan jeriken air Zamzam',
        'Bayar tunai (SAR atau USD) langsung ke sopir saat tiba di hotel',
      ],
      highwayNote: 'Jalan Tol Bandara Madinah / Jalan Raja Abdulaziz',
      authoritySource: 'Otoritas Penerbangan Sipil (GACA) & Otoritas Madinah',
      faqs: [
        {
          question: 'Berapa lama perjalanan dari Bandara Madinah ke hotel dekat Masjid Nabawi?',
          answer: 'Jaraknya sekitar 22 km dan ditempuh dalam waktu 20 hingga 25 menit.',
        },
        {
          question: 'Bagaimana sistem pembayarannya?',
          answer: 'Pembayaran tunai langsung ke sopir setelah sampai di hotel Madinah dalam mata uang SAR atau USD.',
        },
      ],
    },
    ur: {
      seoTitle: 'مدینہ منورہ ایئرپورٹ (MED) سے ہوٹل پرائیویٹ ٹرانسپورٹ | ضيوف الرحمن VIP',
      seoDescription: 'مدینہ ایئرپورٹ سے مسجد نبوی کی مرکزیہ ہوٹلوں تک آرام دہ پرائیویٹ کار۔ فلائٹ ٹریکنگ، ہوٹل پہنچ کر نقد ادائیگی۔',
      h1: 'مدینہ منورہ ایئرپورٹ (MED) سے مرکزیہ ہوٹل پرائیویٹ ٹرانسپورٹ',
      subtitle: 'ارائیول ہال میں نام کے بورڈ کے ساتھ استقبال اور مسجد نبوی کے قریبی ہوٹلوں تک فوری رسائی',
      overview: 'مدینہ منورہ پرنس محمد بن عبدالعزیز ایئرپورٹ پر آمد پر ہمارا ڈرائیور ارائیول ہال میں آپ کے نام کے بورڈ کے ساتھ استقبال کرتا ہے، سامان اٹھانے میں مدد کرتا ہے اور تقریباً 20 سے 25 منٹ میں براہ راست آپ کے ہوٹل پہنچاتا ہے۔',
      inclusions: [
        'مدینہ ایئرپورٹ ارائیول ہال کے اندر نام کے بورڈ کے ساتھ استقبال',
        'طیارہ لینڈ ہونے کے بعد 60 سے 90 منٹ تک مفت انتظار کی سہولت',
        'لائیو ریڈار کے ذریعے پرواز کے اوقات کی خودکار نگرانی',
        'شمالی اور جنوبی مرکزیہ کے تمام ہوٹلوں تک براہ راست ڈراپ آف',
        'بھاری اٹیچیوں اور زمزم کے کین کے لیے محفوظ جگہ',
        'پہنچنے پر نقد ادائیگی (سعودی ریال یا امریکی ڈالر) — بغیر ایڈوانس کے',
      ],
      highwayNote: 'ایئرپورٹ ایکسپریس وے / شاہراہ شاہ عبدالعزیز',
      authoritySource: 'سعودی سول ایوی ایشن (GACA)',
      faqs: [
        {
          question: 'مدینہ ایئرپورٹ سے مسجد نبوی تک کتنا وقت لگتا ہے؟',
          answer: '22 کلومیٹر کا فاصلہ تقریباً 20 سے 25 منٹ میں طے ہوتا ہے۔',
        },
        {
          question: 'کرایہ کب ادا کرنا ہوتا ہے؟',
          answer: 'کرایہ ہوٹل پہنچنے کے بعد ڈرائیور کو نقد (سعودی ریال یا امریکی ڈالر) ادا کیا جاتا ہے۔',
        },
      ],
    },
    fr: {
      seoTitle: 'Transfert Aéroport de Médine (MED) vers Hôtel | Duyuf Al Rahman VIP',
      seoDescription: 'Transfert VTC privé depuis l’Aéroport de Médine (MED) jusqu’aux hôtels du secteur central du Haram. Tarif fixe, paiement en espèces à l’arrivée.',
      h1: 'Transfert Privé Aéroport de Médine (MED) vers Hôtels de la Zone Centrale',
      subtitle: 'Accueil Rapide en Terminal avec Dépose Directe aux Hôtels du Secteur Central (Markaziyah)',
      overview: 'À votre atterrissage à l’Aéroport International Prince Mohammad bin Abdulaziz (MED), votre chauffeur privé vous accueille avec une pancarte à votre nom et vous conduit directement à votre hôtel près de la Mosquée du Prophète en 20 à 25 minutes.',
      inclusions: [
        'Accueil personnalisé dans le hall des arrivées de MED avec pancarte digitale',
        'Attente gratuite de 60 à 90 minutes après atterrissage',
        'Suivi du vol par radar pour adapter la prise en charge',
        'Dépose directe devant les hôtels du secteur central Nord, Sud et Ouest',
        'Espace spacieux pour bagages et bidons de Zamzam',
        'Paiement en espèces (SAR ou USD) au chauffeur à l’arrivée',
      ],
      highwayNote: 'Voie rapide de l’Aéroport / Route Roi Abdelaziz',
      authoritySource: 'GACA & Autorité de Développement de la Région de Médine',
      faqs: [
        {
          question: 'Quelle est la distance entre l’aéroport de Médine et la Mosquée du Prophète ?',
          answer: 'La distance est d’environ 22 km, soit 20 à 25 minutes de trajet en voiture privée.',
        },
        {
          question: 'Comment s’effectue le paiement ?',
          answer: 'Le paiement est effectué en espèces (SAR ou USD) auprès du chauffeur à votre arrivée à l’hôtel.',
        },
      ],
    },
    es: {
      seoTitle: 'Traslado Aeropuerto de Medina (MED) a Hotel | Duyuf Al Rahman VIP',
      seoDescription: 'Traslado privado desde el Aeropuerto de Medina (MED) a los hoteles de la zona central de la Mezquita del Profeta. Tarifa fija y pago en efectivo al llegar.',
      h1: 'Traslado Privado Aeropuerto de Medina (MED) a Hoteles de la Zona Central',
      subtitle: 'Recepción Rápida en Terminal y Llegada Directa a Hoteles de la Zona Markaziyah',
      overview: 'Llegue con total comodidad a Medina desde el Aeropuerto Príncipe Mohammad bin Abdulaziz (MED). Su conductor le esperará en la terminal con un cartel a su nombre y le trasladará en 20-25 minutos directamente a su hotel en la zona central.',
      inclusions: [
        'Recepción en la terminal de llegadas de MED con cartel personalizado',
        'Tiempo de espera de cortesía de 60 a 90 minutos tras el aterrizaje',
        'Seguimiento en directo del vuelo para sincronizar la llegada',
        'Traslado directo a hoteles de las zonas central norte, sur y oeste',
        'Amplio maletero para equipajes y bidones de agua Zamzam',
        'Pago en efectivo (SAR o USD) al chófer al llegar al hotel',
      ],
      highwayNote: 'Autovía del Aeropuerto / Carretera Rey Abdulaziz',
      authoritySource: 'Autoridad de Aviación Civil (GACA)',
      faqs: [
        {
          question: '¿A qué distancia está el aeropuerto de Medina de la mezquita?',
          answer: 'Está a unos 22 km, aproximadamente entre 20 y 25 minutos de trayecto.',
        },
        {
          question: '¿Cómo se paga el traslado?',
          answer: 'Se abona en efectivo (SAR o USD) directamente al conductor al llegar al hotel.',
        },
      ],
    },
    de: {
      seoTitle: 'Transfer Flughafen Medina (MED) zum Hotel | Duyuf Al Rahman VIP',
      seoDescription: 'Privater Chauffeur-Transfer vom Flughafen Medina (MED) zu den Hotels der zentralen Zone (Markaziyah). Fester Tarif, Barzahlung bei Ankunft.',
      h1: 'Privater Transfer Flughafen Medina (MED) zu den Hotels der Zentralen Zone',
      subtitle: 'Schneller Terminal-Empfang mit Direkter Fahrt zu den Hotels rund um die Prophetenmoschee',
      overview: 'Nach der Landung am Flughafen Medina (MED) begrüßt Sie unser Chauffeur mit Namensschild im Ankunftsbereich und bringt Sie in 20 bis 25 Minuten direkt zu Ihrem Hotel in der zentralen Markaziyah-Zone.',
      inclusions: [
        'Empfang im MED-Ankunftsbereich mit digitalem Namensschild',
        '60 bis 90 Minuten kostenlose Wartezeit ab Landung',
        'Flugverfolgung per Radar für pünktliche Bereitstellung',
        'Direkter Drop-Off bei allen Hotels in der zentralen Zone',
        'Vollständiger Laderaum für Koffer und Zamzam-Behälter',
        'Barzahlung beim Fahrer bei Ankunft (SAR oder USD) — ohne Anzahlung',
      ],
      highwayNote: 'Flughafen-Schnellstraße / King Abdulaziz Road',
      authoritySource: 'General Authority of Civil Aviation (GACA)',
      faqs: [
        {
          question: 'Wie weit ist der Flughafen Medina von der Prophetenmoschee entfernt?',
          answer: 'Die Entfernung beträgt ca. 22 km und die Fahrt dauert etwa 20 bis 25 Minuten.',
        },
        {
          question: 'Wie wird bezahlt?',
          answer: 'Die Bezahlung erfolgt vollständig in bar (SAR oder USD) direkt beim Fahrer bei Ankunft am Hotel.',
        },
      ],
    },
    tr: {
      seoTitle: 'Medine Havalimanı (MED) - Otel Özel VIP Transfer | Duyuf Al Rahman VIP',
      seoDescription: 'Medine Havalimanı’ndan (MED) Mescid-i Nebevi çevresindeki otellere özel VIP transfer. Sabit fiyat garantisi, varışta nakit ödeme.',
      h1: 'Medine Havalimanı’ndan (MED) Merkeziye Otellerine Özel Transfer',
      subtitle: 'Gelen Yolcu Salonunda Özel Karşılama ve Mescid-i Nebevi Otellerine Hızlı Ulaşım',
      overview: 'Prens Muhammed bin Abdülaziz Havalimanı’na (MED) inişinizin ardından şoförümüz sizi gelen yolcu salonunda isim tabelasıyla karşılar, valizlerinizi taşır ve 20-25 dakikada Mescid-i Nebevi çevresindeki otelinize doğrudan ulaştırır.',
      inclusions: [
        'MED gelen yolcu salonunda dijital isimlikle karşılama',
        'Uçak inişinden sonra 60-90 dakika ücretsiz bekleme',
        'Canlı radar ile uçuş saati takibi',
        'Kuzey, Güney ve Batı Merkeziye otellerine kapıda teslim',
        'Valizler ve Zemzem bidonları için geniş bagaj hacmi',
        'Varışta otele ulaşıldığında şoföre nakit ödeme (SAR veya USD)',
      ],
      highwayNote: 'Havalimanı Otoyolu / Kral Abdülaziz Caddesi',
      authoritySource: 'GACA ve Medine Kalkınma Otoritesi',
      faqs: [
        {
          question: 'Medine Havalimanı ile Mescid-i Nebevi arası ne kadar sürer?',
          answer: 'Mesafe yaklaşık 22 km olup özel araçla 20 ila 25 dakika sürmektedir.',
        },
        {
          question: 'Ödeme nasıl yapılır?',
          answer: 'Ödeme Medine’deki otele varıldığında şoföre doğrudan nakit (SAR veya USD) olarak yapılır.',
        },
      ],
    },
    hi: {
      seoTitle: 'मदीना एयरपोर्ट (MED) से होटल निजी वीआईपी ट्रांसफर | Duyuf Al Rahman VIP',
      seoDescription: 'मदीना एयरपोर्ट (MED) से मरकज़िया मस्जिद नबवी के होटलों तक सीधी वीआईपी टैक्सी। निश्चित किराया, पहुंचने पर नकद भुगतान।',
      h1: 'मदीना एयरपोर्ट (MED) से मरकज़िया होटल निजी वीआईपी ट्रांसफर',
      subtitle: 'अराइवल हॉल में स्वागत और मस्जिद नबवी के नजदीकी होटलों तक 20-25 मिनट में त्वरित पहुंच',
      overview: 'प्रिंस मोहम्मद बिन अब्दुलअज़ीज़ एयरपोर्ट (MED) पर उतरने के बाद हमारे ड्राइवर अराइवल हॉल में आपके नाम के बोर्ड के साथ स्वागत करते हैं और 20 से 25 मिनट में आपको सीधे आपके मदीना होटल पहुंचाते हैं।',
      inclusions: [
        'मदीना एयरपोर्ट अराइवल हॉल में डिजिटल बोर्ड के साथ स्वागत',
        'फ्लाइट लैंडिंग के बाद 60-90 मिनट तक मुफ्त वेटिंग',
        'लाइव रडार द्वारा उड़ान समय की स्वचालित निगरानी',
        'मरकज़िया के सभी होटलों में सीधा ड्रॉप-ऑफ',
        'अटैचियों और ज़मज़म कैन के लिए भरपूर जगह',
        'पहुंचने पर ड्राइवर को नकद भुगतान (SAR या USD) — बिना अग्रिम जमा के',
      ],
      highwayNote: 'एयरपोर्ट एक्सप्रेसवे / किंग अब्दुलअज़ीज़ रोड',
      authoritySource: 'सऊदी विमानन प्राधिकरण (GACA)',
      faqs: [
        {
          question: 'मदीना एयरपोर्ट से मस्जिद नबवी तक कितनी दूरी है?',
          answer: 'लगभग 22 किमी की दूरी 20 से 25 मिनट में तय होती है।',
        },
        {
          question: 'भुगतान का तरीका क्या है?',
          answer: 'किराया होटल पहुंचने पर ड्राइवर को नकद (SAR या USD) में दिया जाता है।',
        },
      ],
    },
  },
  'madinah-to-makkah': {
    ar: {
      seoTitle: "توصيل من المدينة إلى مكة مع التوقف في ميقات ذي الحليفة (آبار علي) | ضيوف الرحمن VIP",
      seoDescription: "توصيل وسائق خاص VIP من المدينة المنورة إلى مكة المكرمة مع توقف بميقات ذي الحليفة (أبيار علي) للإحرام. سيارات حديثة وسعر ثابت والدفع نقداً عند الوصول.",
      h1: "توصيل من المدينة المنورة إلى مكة المكرمة مع التوقف بميقات ذي الحليفة",
      subtitle: "طريق العمرة المبارك: توقف مخصص بميقات ذي الحليفة (آبار علي) للإحرام والنية ثم متابعة الرحلة بسلام عبر طريق الهجرة",
      overview: "رحلة إيمانية خاصة ومريحة تنطلق من باب فندقك بالمدينة المنورة إلى ميقات ذي الحليفة للتطهر وارتداء الإحرام وأداء ركعتي الإحرام ونية العمرة، ثم مواصلة الطريق السريع المباشر (طريق الهجرة السريع) حتى فندقك بجوار الحرم المكي الشريف.",
      inclusions: [
        "توقف مريح وكافٍ بميقات ذي الحليفة (آبار علي) للإحرام ونية العمرة",
        "سائق محترف خبير بطريق الهجرة واستراحاته المكيفة للصلاة",
        "سيارة حديثة معقمة ومكيفة بالكامل مع مساحة وفيرة للأمتعة وحقائب السفر",
        "شامل كافة رسوم الطرق والوقود وضريبة القيمة المضافة بدون أي رسوم خفية",
        "دفع كاش نقداً بالريال السعودي أو الدولار بعد إتمام الرحلة والوصول للفندق",
      ],
      highwayNote: "طريق الهجرة السريع (طريق 15) المباشر والمضاء",
      authoritySource: "الهيئة العامة للنقل ووزارة الحج والعمرة",
      faqs: [
        {
          question: "هل يتوقف السائق في ميقات ذي الحليفة للإحرام؟",
          answer: "نعم، التوقف في ميقات ذي الحليفة (آبار علي) مشمول ومؤكد حيث ينتظركم السائق حتى ارتداء ملابس الإحرام وأداء ركعتي الإحرام والتلبية براحة تامة.",
        },
        {
          question: "كم تستغرق المسافة من المدينة إلى مكة المكرمة بالسيارة؟",
          answer: "تبلغ المسافة حوالي 440 كم وتستغرق ما بين 4 إلى 4.5 ساعات قيادة مريحة وآمنة.",
        },
        {
          question: "هل يتوفر توقف للصلاة والاستراحة على الطريق؟",
          answer: "نعم، يتوقف السائق في استراحات ومحطات خدمة راقية ونظيفة تحتوي على مساجد مكيفة ومرافق نظيفة.",
        },
        {
          question: "كيف يتم دفع قيمة الرحلة؟",
          answer: "الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول إلى فندقكم بمكة المكرمة بدون أي دفع مسبق.",
        },
      ],
    },
    en: {
      seoTitle: "Madinah to Makkah VIP Transfer with Miqat Dhu al-Hulayfah Stop | Duyuf Alrahman VIP",
      seoDescription: "Private chauffeur transfer from Madinah to Makkah hotels with dedicated stop at Masjid Miqat (Bir Ali) for Ihram. Fixed rates, cash upon arrival.",
      h1: "Madinah to Makkah VIP Transfer with Miqat Dhu al-Hulayfah Stop",
      subtitle: "Sacred Umrah Journey: Dedicated Stop at Masjid Miqat for Ihram & Niyyah followed by express transit along Al Hijrah Highway",
      overview: "Travel seamlessly from your Madinah hotel to Makkah with a pre-planned stop at Masjid Miqat Dhu al-Hulayfah (Bir Ali). Your chauffeur waits patiently while you enter Ihram, pray, and declare your Niyyah, before continuing along Highway 15 directly to your Makkah accommodation.",
      inclusions: [
        "Dedicated stop at Miqat Dhu al-Hulayfah (Bir Ali) for Ihram and prayers",
        "Door-to-door private transfer from your Madinah hotel to Makkah hotel",
        "Pristine air-conditioned fleet with spacious luggage capacity",
        "All fuel, highway tolls, and VAT fully included with zero surge pricing",
        "Pay the driver in cash (SAR or USD) upon arrival at your Makkah destination",
      ],
      highwayNote: "Route 15 / Al Hijrah Expressway directly to Makkah",
      authoritySource: "Transport General Authority & Ministry of Hajj and Umrah",
      faqs: [
        {
          question: "Does the driver wait at Miqat Bir Ali for Ihram?",
          answer: "Yes, a patient stop at Miqat Dhu al-Hulayfah (Bir Ali) is fully included. The driver waits outside while you change into Ihram and pray.",
        },
        {
          question: "How long does the transfer from Madinah to Makkah take?",
          answer: "The 440 km journey typically takes between 4 and 4.5 hours depending on traffic and rest stops.",
        },
        {
          question: "Are there clean prayer and meal stops along Highway 15?",
          answer: "Yes, chauffeurs stop at reputable highway service plazas with air-conditioned mosques and clean amenities.",
        },
        {
          question: "What is the payment method?",
          answer: "Payment is cash only (SAR or USD) paid directly to the chauffeur upon arrival in Makkah. No deposit or advance card payment.",
        },
      ],
    },
    ms: {
      seoTitle: "Pengangkutan VIP Madinah ke Makkah dengan Henti Miqat Bir Ali | Duyuf Alrahman VIP",
      seoDescription: "Perkhidmatan kereta sewa peribadi Madinah ke hotel Makkah dengan henti di Miqat Dhu al-Hulayfah (Bir Ali) untuk berniat ihram. Bayar tunai kepada pemandu.",
      h1: "Pengangkutan VIP Madinah ke Makkah dengan Henti Miqat Bir Ali",
      subtitle: "Perjalanan Umrah Suci: Berhenti di Masjid Miqat Bir Ali untuk Ihram dan Niat, terus ke Makkah melalui Lebuhraya Hijrah",
      overview: "Perjalanan selesa dari hotel anda di Madinah ke Makkah dengan hentian rasmi di Miqat Dhu al-Hulayfah (Bir Ali). Pemandu peribadi anda akan menunggu dengan sabar untuk anda memakai ihram dan berniat sebelum meneruskan perjalanan ke Masjidil Haram.",
      inclusions: [
        "Hentian khas di Miqat Dhu al-Hulayfah (Bir Ali) untuk ihram dan solat sunat",
        "Pemandu peribadi berpengalaman dari pintu hotel Madinah ke pintu hotel Makkah",
        "Kenderaan moden berhawa dingin sepenuhnya dengan ruang bagasi luas",
        "Termasuk minyak, tol lebuh raya, dan cukai tanpa sebarang caj tersembunyi",
        "Bayar tunai (SAR atau USD) kepada pemandu semasa tiba di Makkah",
      ],
      highwayNote: "Lebuhraya Al Hijrah (Laluan 15)",
      authoritySource: "Lembaga Pengangkutan Awam & Kementerian Haji dan Umrah",
      faqs: [
        {
          question: "Adakah pemandu menunggu di Miqat Bir Ali?",
          answer: "Ya, hentian di Miqat Bir Ali disertakan. Pemandu akan menunggu sehingga anda selesai memakai ihram dan solat.",
        },
        {
          question: "Berapa lamakah perjalanan dari Madinah ke Makkah?",
          answer: "Jarak 440 km mengambil masa sekitar 4 hingga 4.5 jam pemanduan santai dan selamat.",
        },
        {
          question: "Bagaimanakah pembayaran dibuat?",
          answer: "Bayaran adalah tunai sepenuhnya (SAR atau USD) kepada pemandu semasa tiba di Makkah tanpa sebarang deposit.",
        },
      ],
    },
    id: {
      seoTitle: "Travel VIP Madinah ke Makkah Singgah Miqat Bir Ali | Duyuf Alrahman VIP",
      seoDescription: "Sewa mobil pribadi dari hotel Madinah ke hotel Makkah dengan singgah di Miqat Dzulhulaifah (Bir Ali) untuk niat ihram. Tarif pasti, bayar tunai di tujuan.",
      h1: "Travel VIP Madinah ke Makkah Singgah Miqat Dzulhulaifah (Bir Ali)",
      subtitle: "Perjalanan Umrah Khusyuk: Singgah di Masjid Miqat Bir Ali untuk Ihram dan Niat Umrah lalu melanjutkan ke Makkah",
      overview: "Nikmati perjalanan ibadah umrah yang tenang dari hotel Madinah menuju Makkah. Supir kami siap mengantar dan menunggu Anda di Miqat Dzulhulaifah (Bir Ali) untuk mandi, mengenakan kain ihram, dan berniat sebelum melaju di Jalan Tol Hijrah menuju tanah suci Makkah.",
      inclusions: [
        "Singgah di Miqat Dzulhulaifah (Bir Ali) untuk persiapan ihram dan sholat sunnah",
        "Layanan antar-jemput privat dari lobi hotel Madinah ke hotel Makkah",
        "Armada ber-AC dingin dan nyaman dengan ruang koper yang lapang",
        "Harga sudah termasuk bensin, tol, dan pajak tanpa biaya tambahan",
        "Pembayaran tunai (SAR atau USD) langsung ke supir saat tiba di Makkah",
      ],
      highwayNote: "Jalan Tol Al Hijrah (Rute 15)",
      authoritySource: "Otoritas Transportasi Umum & Kementerian Haji dan Umrah",
      faqs: [
        {
          question: "Apakah supir menunggu di Miqat Bir Ali?",
          answer: "Ya, supir akan menunggu dengan sabar di parkiran Miqat Bir Ali hingga Anda selesai berpakaian ihram dan berniat.",
        },
        {
          question: "Berapa lama waktu tempuh Madinah ke Makkah?",
          answer: "Jarak 440 km ditempuh dalam waktu sekitar 4 hingga 4,5 jam perjalanan.",
        },
        {
          question: "Bagaimana sistem pembayarannya?",
          answer: "Pembayaran dilakukan secara tunai (SAR atau USD) kepada supir setelah tiba di hotel Makkah tanpa uang muka.",
        },
      ],
    },
    ur: {
      seoTitle: "مدینہ سے مکہ مکرمہ وی آئی پی ٹیکسی میقات ذوالحلیفہ (بیر علی) سٹاپ کے ساتھ | ضیوف الرحمن VIP",
      seoDescription: "مدینہ منورہ سے مکہ ہوٹل پرائیویٹ کار سروس میقات بیر علی پر احرام کے لیے خصوصی قیام کے ساتھ۔ فکسڈ ریٹ اور پہنچنے پر کیش ادائیگی۔",
      h1: "مدینہ منورہ سے مکہ مکرمہ وی آئی پی ٹرانسفر مع میقات ذوالحلیفہ سٹاپ",
      subtitle: "مبارک عمرہ سفر: میقات بیر علی پر احرام اور نیت کے لیے قیام، اور ہجرہ ایکسپریس وے پر پرسکون سفر",
      overview: "مدینہ منورہ میں آپ کے ہوٹل سے مکہ مکرمہ تک پُرسکون اور پرائیویٹ سفر۔ ڈرائیور میقات ذوالحلیفہ (بیر علی) پر آپ کا انتظار کرے گا تاکہ آپ اطمینان سے احرام باندھ کر عمرہ کی نیت کر سکیں۔",
      inclusions: [
        "میقات ذوالحلیفہ (بیر علی) پر احرام اور نوافل کے لیے مکمل وقت",
        "مدینہ ہوٹل سے مکہ مکرمہ ہوٹل تک ڈور ٹو ڈور نجی گاڑی",
        "مکمل ایئر کنڈیشنڈ اور کشادہ سامان والی گاڑیاں",
        "تمام پیٹرول، ٹول ٹیکس اور ویٹ شامل، کوئی خفیہ چارج نہیں",
        "مکہ پہنچنے پر ڈرائیور کو نقد (سعودی ریال یا امریکی ڈالر) ادائیگی",
      ],
      highwayNote: "طریق الہجرہ ایکسپریس وے (روٹ 15)",
      authoritySource: "ٹرانسپورٹ جنرل اتھارٹی اور وزارت حج و عمرہ",
      faqs: [
        {
          question: "کیا ڈرائیور میقات بیر علی پر انتظار کرتا ہے؟",
          answer: "جی ہاں، میقات بیر علی پر احرام باندھنے اور نماز ادا کرنے کے لیے ڈرائیور کا انتظار سروس میں شامل ہے۔",
        },
        {
          question: "مدینہ سے مکہ پہنچنے میں کتنا وقت لگتا ہے؟",
          answer: "440 کلومیٹر کا فاصلہ تقریباً 4 سے ساڑھے 4 گھنٹے میں طے ہوتا ہے۔",
        },
        {
          question: "ادائیگی کا طریقہ کار کیا ہے؟",
          answer: "مکہ مکرمہ میں ہوٹل پہنچ کر ڈرائیور کو نقد (ریال یا ڈالر) ادا کیا جاتا ہے۔ کوئی پیشگی ڈپازٹ نہیں۔",
        },
      ],
    },
    fr: {
      seoTitle: "Transfert VIP Médine à La Mecque avec Arrêt Miqat Dhu al-Hulayfah | Duyuf Alrahman VIP",
      seoDescription: "Chauffeur privé de Médine aux hôtels de La Mecque avec arrêt au Miqat Bir Ali pour l'Ihram. Prix fixe et paiement en espèces à l'arrivée.",
      h1: "Transfert VIP Médine à La Mecque avec Arrêt Miqat Dhu al-Hulayfah",
      subtitle: "Voyage d'Omra Sacré : Arrêt dédié à la Mosquée du Miqat Bir Ali pour l'Ihram et la Niyyah, puis autoroute Al Hijrah",
      overview: "Voyagez en toute quiétude de votre hôtel de Médine à La Mecque avec un arrêt prévu au Miqat Dhu al-Hulayfah (Bir Ali). Votre chauffeur vous attend pour votre mise en état d'Ihram avant de poursuivre directement vers votre hôtel à La Mecque.",
      inclusions: [
        "Arrêt dédié au Miqat Bir Ali pour l'Ihram et les prières",
        "Service porte-à-porte de Médine à La Mecque sans escale imprévue",
        "Véhicules spacieux et climatisés avec grand coffre pour bagages",
        "Carburant, péages et TVA inclus sans aucun frais supplémentaire",
        "Paiement en espèces (SAR ou USD) auprès du chauffeur à l'arrivée",
      ],
      highwayNote: "Autoroute Al Hijrah (Route 15)",
      authoritySource: "Autorité Générale des Transports & Ministère du Hajj",
      faqs: [
        {
          question: "Le chauffeur attend-il au Miqat Bir Ali ?",
          answer: "Oui, l'arrêt au Miqat Dhu al-Hulayfah (Bir Ali) est garanti. Le chauffeur attend pendant votre mise en Ihram.",
        },
        {
          question: "Combien de temps dure le trajet Médine - La Mecque ?",
          answer: "Le trajet de 440 km dure généralement entre 4h et 4h30 en toute sécurité.",
        },
        {
          question: "Comment s'effectue le règlement ?",
          answer: "Le paiement se fait en espèces (SAR ou USD) directement au chauffeur à votre arrivée à La Mecque.",
        },
      ],
    },
    es: {
      seoTitle: "Traslado VIP Medina a La Meca con Parada en Miqat Bir Ali | Duyuf Alrahman VIP",
      seoDescription: "Chófer privado de hoteles de Medina a La Meca con parada en Miqat Dhu al-Hulayfah para el Ihram. Tarifa fija y pago en efectivo al llegar.",
      h1: "Traslado VIP Medina a La Meca con Parada en Miqat Dhu al-Hulayfah",
      subtitle: "Ruta Sagrada de Umrah: Parada dedicada en Miqat Bir Ali para el Ihram y la Niyyah, y trayecto directo por autopista Al Hijrah",
      overview: "Traslado privado y exclusivo desde su hotel en Medina hasta su hotel en La Meca con parada en la Mezquita Miqat Bir Ali para vestir el Ihram y realizar la intención de Umrah con total serenidad.",
      inclusions: [
        "Parada dedicada en Miqat Dhu al-Hulayfah (Bir Ali) para el Ihram",
        "Servicio puerta a puerta de hotel a hotel en coche privado",
        "Vehículo moderno y climatizado con amplio maletero para equipaje",
        "Peajes, combustible y tasas incluidos sin suplementos ocultos",
        "Pago en efectivo (SAR o USD) al chófer al llegar a su destino",
      ],
      highwayNote: "Autopista Al Hijrah (Ruta 15)",
      authoritySource: "Autoridad General de Transporte y Ministerio de Hajj",
      faqs: [
        {
          question: "¿El chófer espera en Miqat Bir Ali?",
          answer: "Sí, la parada en Miqat Bir Ali está asegurada y el conductor esperará pacientemente mientras se prepara.",
        },
        {
          question: "¿Cuánto dura el viaje de Medina a La Meca?",
          answer: "Los 440 km se recorren en unas 4 a 4,5 horas de viaje seguro y confortable.",
        },
        {
          question: "¿Cómo se abona el servicio?",
          answer: "Se paga en efectivo (SAR o USD) directamente al conductor al llegar al hotel en La Meca.",
        },
      ],
    },
    de: {
      seoTitle: "VIP Transfer Medina nach Mekka mit Miqat Bir Ali Halt | Duyuf Alrahman VIP",
      seoDescription: "Privater Chauffeur von Medina nach Mekka mit Halt an der Miqat Dhu al-Hulayfah Moschee für Ihram. Fester Preis, Barzahlung bei Ankunft.",
      h1: "VIP Transfer Medina nach Mekka mit Miqat Dhu al-Hulayfah Halt",
      subtitle: "Heilige Umrah-Reise: Eigener Halt an der Miqat-Moschee Bir Ali für Ihram & Absicht, Weiterfahrt auf dem Al Hijrah Highway",
      overview: "Reisen Sie komfortabel von Ihrem Hotel in Medina nach Mekka mit einem Halt an der Miqat Dhu al-Hulayfah Moschee (Bir Ali). Ihr Fahrer wartet, während Sie den Ihram anlegen und beten, bevor es auf der Autobahn 15 direkt nach Mekka geht.",
      inclusions: [
        "Halt an der Miqat Bir Ali Moschee für Ihram und Niyyah",
        "Direkter Transfer von Hotel zu Hotel im privaten Premium-Fahrzeug",
        "Vollklimatisierte moderne Flotte mit reichlich Kofferraum",
        "Maut, Treibstoff und Steuern vollständig inbegriffen ohne Aufpreis",
        "Barzahlung (SAR oder USD) beim Fahrer bei Ankunft am Zielort",
      ],
      highwayNote: "Al Hijrah Autobahn (Route 15)",
      authoritySource: "Allgemeine Verkehrsbehörde & Haddsch-Ministerium",
      faqs: [
        {
          question: "Wartet der Fahrer am Miqat Bir Ali?",
          answer: "Ja, der Halt an der Miqat Bir Ali Moschee ist fest eingeplant und der Chauffeur wartet geduldig.",
        },
        {
          question: "Wie lange dauert die Fahrt von Medina nach Mekka?",
          answer: "Die 440 km lange Strecke dauert in der Regel etwa 4 bis 4,5 Stunden.",
        },
        {
          question: "Welche Zahlungsarten gibt es?",
          answer: "Die Bezahlung erfolgt in bar (SAR oder USD) direkt beim Fahrer nach Ankunft am Hotel in Mekka.",
        },
      ],
    },
    tr: {
      seoTitle: "Medine - Mekke VIP Transfer ve Mikat Mescidi Bir Ali Molası | Duyuf Alrahman VIP",
      seoDescription: "Medine otelinizden Mekke otellerine özel şoförlü VIP transfer ve Mikat Zülhuleyfe (Bir Ali) ihram molası. Sabit fiyat, varışta nakit ödeme.",
      h1: "Medine - Mekke VIP Transfer ve Mikat Zülhuleyfe (Bir Ali) Molası",
      subtitle: "Mübarek Umre Yolculuğu: İhram ve Niyet İçin Mikat Mescidinde Özel Mola ve Hicret Otoyolu Boyunca Konforlu Seyahat",
      overview: "Medine-i Münevvere'deki otelinizden Mekke-i Mükerreme'ye huzurlu ve konforlu bir yolculuk. Şoförümüz Zülhuleyfe (Bir Ali) Mikat Mescidi'nde siz ihrama girip niyet edene kadar bekler, ardından doğrudan Mekke'deki otelinize ulaştırır.",
      inclusions: [
        "İhram ve niyet için Mikat Zülhuleyfe (Bir Ali) Mescidinde yeterli bekleme süresi",
        "Medine otelinizden Mekke otelinize kapıdan kapıya özel VIP transfer",
        "Geniş bagaj hacmine sahip klimalı ve konforlu yeni model araçlar",
        "Yakıt, otoyol geçiş ücretleri ve KDV dahil net sabit fiyat",
        "Mekke'ye varışta şoföre nakit (SAR veya USD) olarak elden ödeme",
      ],
      highwayNote: "Hicret Otoyolu (15 Nolu Güzergah)",
      authoritySource: "Suudi Ulaştırma Genel İdaresi ve Hac Bakanlığı",
      faqs: [
        {
          question: "Şoför Bir Ali Mikatında bekliyor mu?",
          answer: "Evet, Bir Ali Mikatında bekleme hizmete dahildir; ihrama girip namazınızı kılana kadar şoförünüz sizi bekler.",
        },
        {
          question: "Medine - Mekke arası araçla ne kadar sürer?",
          answer: "440 km mesafe, molalarla birlikte ortalama 4 ila 4,5 saat sürmektedir.",
        },
        {
          question: "Ödeme nasıl yapılır?",
          answer: "Ödeme, Mekke'deki otelinize ulaştığınızda şoföre nakit (SAR veya USD) olarak yapılır. Ön ödeme gerekmez.",
        },
      ],
    },
    hi: {
      seoTitle: "मदीना से मक्का वीआईपी टैक्सी मीक़ात ज़ुल हुलैफ़ा (बीर अली) स्टॉप के साथ | Duyuf Alrahman VIP",
      seoDescription: "मदीना होटल से मक्का होटल प्राइवेट कार ट्रांसफर, मीक़ात बीर अली पर एहराम के लिए विशेष ठहराव। तय किराया, पहुंचने पर नकद भुगतान।",
      h1: "मदीना से मक्का वीआईपी ट्रांसफर मीक़ात ज़ुल हुलैफ़ा (बीर अली) स्टॉप के साथ",
      subtitle: "पवित्र उमराह यात्रा: मीक़ात बीर अली पर एहराम और नियत के लिए विशेष ठहराव, और हिजरा हाईवे पर आरामदायक सफर",
      overview: "मदीना मुनव्वरा में अपने होटल से मक्का मुकर्रमा तक बिना किसी परेशानी के सुरक्षित यात्रा। ड्राइवर मीक़ात ज़ुल हुलैफ़ा (बीर अली) पर आपके एहराम बांधने और नमाज़ अदा करने तक इंतज़ार करता है।",
      inclusions: [
        "मीक़ात ज़ुल हुलैफ़ा (बीर अली) पर एहराम और नियत के लिए पर्याप्त समय",
        "मदीना होटल से मक्का होटल तक निजी वातानुकूलित वाहन",
        "सामान और सूटकेस के लिए विशाल जगह",
        "पेट्रोल, टोल टैक्स और वैट पूरी तरह शामिल, कोई अतिरिक्त शुल्क नहीं",
        "मक्का पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान",
      ],
      highwayNote: "अल हिजरा एक्सप्रेसवे (रूट 15)",
      authoritySource: "सऊदी परिवहन प्राधिकरण और हज व उमराह मंत्रालय",
      faqs: [
        {
          question: "क्या ड्राइवर मीक़ात बीर अली पर इंतज़ार करता है?",
          answer: "हाँ, मीक़ात बीر अली पर एहराम बांधने के लिए ड्राइवर का इंतज़ार सेवा में पूरी तरह शामिल है।",
        },
        {
          question: "मदीना से मक्का की दूरी कितनी देर में तय होती है?",
          answer: "440 किमी की दूरी लगभग 4 से 4.5 घंटे में तय होती है।",
        },
        {
          question: "भुगतान का क्या तरीका है?",
          answer: "किराया मक्का पहुंचने पर ड्राइवर को नकद (SAR या USD) में दिया जाता है। कोई एडवांस नहीं।",
        },
      ],
    },
  },
  'makkah-to-jeddah-airport': {
    ar: {
      seoTitle: "توصيل من فنادق مكة إلى مطار الملك عبدالعزيز بجدة (KAIA) | ضيوف الرحمن VIP",
      seoDescription: "سائق خاص وتوصيل دقيق من فنادق مكة المكرمة إلى صالات مطار الملك عبدالعزيز بجدة (KAIA). سيارات VIP واسعة لحقائب السفر وماء زمزم. دفع كاش للسائق.",
      h1: "توصيل من فنادق مكة إلى مطار الملك عبدالعزيز بجدة (KAIA)",
      subtitle: "خدمة مغادرة دقيقة ومريحة تضمن وصولكم في الموعد المحدد لإنهاء إجراءات السفر وشحن عبوات ماء زمزم بسلام",
      overview: "نضمن لك رحلة عودة آمنة ومريحة من فندقك بمكة المكرمة مباشرة إلى صالة المغادرة الخاصة برحلتك في مطار الملك عبدالعزيز الدولي بجدة (KAIA). سيارات واسعة ومريحة تتسع لكافة أفراد العائلة وحقائب السفر مع التعامل المهني مع عبوات ماء زمزم المغلفة.",
      inclusions: [
        "استقبال ومساعدة في تحميل الحقائب من باب فندقك بمكة المكرمة",
        "توصيل مباشر لبوابة صالة المغادرة المحددة (الصالة 1، الصالة الشمالية، صالة الفرسان)",
        "سيارات مكيفة تتسع لكافة الحقائب وعبوات ماء زمزم الرسمية",
        "شامل كافة رسوم الطرق والوقود وضريبة القيمة المضافة بدون أي رسوم خفية",
        "الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول إلى المطار",
      ],
      highwayNote: "طريق مكة - جدة السريع (طريق 40) المباشر إلى صالات KAIA",
      authoritySource: "الهيئة العامة للطيران المدني وهيئة النقل",
      faqs: [
        {
          question: "قبل كم ساعة من موعد إقلاع الطائرة يجب التحرك من مكة؟",
          answer: "نوصي دائماً بحجز موعد التحرك قبل 3.5 إلى 4 ساعات من موعد إقلاع الرحلات الدولية، وقبل 2.5 ساعة للرحلات الداخلية.",
        },
        {
          question: "هل يمكن شحن عبوات ماء زمزم في السيارة؟",
          answer: "نعم، أسطولنا مجهز بمساحات أمتعة واسعة ومناسبة لنقل عبوات ماء زمزم الرسمية المغلفة مع حقائب السفر.",
        },
        {
          question: "كيف يتم دفع الأجرة؟",
          answer: "يتم دفع الأجرة نقداً كاش (بالريال السعودي أو الدولار) للسائق فور الوصول إلى صالة المطار.",
        },
      ],
    },
    en: {
      seoTitle: "Makkah to Jeddah Airport (KAIA) Departure Transfer | Duyuf Alrahman VIP",
      seoDescription: "Punctual private chauffeur from Makkah hotels to King Abdulaziz International Airport (KAIA) Jeddah. Spacious luggage capacity, Zamzam handling, cash payment.",
      h1: "Makkah Hotel to Jeddah Airport (KAIA) Departure Transfer",
      subtitle: "Punctual Departure Chauffeur Service Ensuring Stress-Free Airport Check-in and Zamzam Handling",
      overview: "Ensure an effortless and punctual departure transfer from your Makkah hotel directly to your designated terminal at King Abdulaziz International Airport (KAIA) in Jeddah. Spacious vehicles accommodate your entire family, luggage, and official boxed Zamzam water bottles.",
      inclusions: [
        "Prompt lobby pickup and luggage assistance at your Makkah accommodation",
        "Direct drop-off at your specific departure terminal (Terminal 1, North Terminal)",
        "Spacious air-conditioned vehicles accommodating baggage and boxed Zamzam water",
        "All highway tolls, fuel, and VAT included with zero surge fees",
        "Cash payment upon arrival at the airport terminal (SAR or USD)",
      ],
      highwayNote: "Route 40 / Makkah-Jeddah Expressway direct to KAIA",
      authoritySource: "General Authority of Civil Aviation (GACA) & Transport Authority",
      faqs: [
        {
          question: "How early should I depart Makkah before my flight?",
          answer: "We recommend departing Makkah 3.5 to 4 hours before international flights and 2.5 hours before domestic departures.",
        },
        {
          question: "Can the vehicle accommodate Zamzam water containers?",
          answer: "Yes, our fleet features expansive cargo space designed to securely carry luggage and standard 5L boxed Zamzam containers.",
        },
        {
          question: "What is the payment method?",
          answer: "Payment is cash only (SAR or USD) paid directly to the driver upon drop-off at the terminal.",
        },
      ],
    },
    ms: {
      seoTitle: "Pengangkutan Makkah ke Lapangan Terbang Jeddah (KAIA) | Duyuf Alrahman VIP",
      seoDescription: "Pemandu peribadi tepat masa dari hotel Makkah ke Lapangan Terbang Antarabangsa King Abdulaziz (KAIA). Muat bagasi & air Zamzam, bayar tunai di airport.",
      h1: "Pengangkutan Hotel Makkah ke Lapangan Terbang Jeddah (KAIA)",
      subtitle: "Perkhidmatan Pelepasan Tepat Masa Memastikan Daftar Masuk Lapangan Terbang Tenang dan Pengendalian Zamzam Selamat",
      overview: "Pastikan perjalanan pulang anda lancar dengan servis pengangkutan peribadi dari hotel Makkah terus ke terminal pelepasan Lapangan Terbang Antarabangsa King Abdulaziz Jeddah (KAIA). Ruang kenderaan yang luas menjamin keselesaan koper dan air Zamzam anda.",
      inclusions: [
        "Pengambilan tepat masa di lobi hotel Makkah dan bantuan mengangkat bagasi",
        "Penghantaran terus ke pintu terminal pelepasan (Terminal 1 atau Terminal Utara)",
        "Kenderaan berhawa dingin luas yang memuatkan koper dan kotak air Zamzam rasmi",
        "Semua tol lebuh raya, minyak, dan cukai sudah termasuk dalam tambang tetap",
        "Bayaran tunai (SAR atau USD) kepada pemandu semasa tiba di lapangan terbang",
      ],
      highwayNote: "Lebuhraya Makkah - Jeddah (Laluan 40)",
      authoritySource: "Pihak Berkuasa Penerbangan Awam (GACA)",
      faqs: [
        {
          question: "Berapa jam sebelum penerbangan saya perlu bertolak dari Makkah?",
          answer: "Kami mengesyorkan bertolak 3.5 hingga 4 jam sebelum waktu penerbangan antarabangsa.",
        },
        {
          question: "Bolehkah kenderaan membawa air Zamzam?",
          answer: "Ya, kenderaan kami mempunyai ruang kargo luas untuk bagasi dan kotak air Zamzam 5L.",
        },
        {
          question: "Bagaimana cara bayar?",
          answer: "Bayaran adalah tunai (SAR atau USD) kepada pemandu apabila tiba di terminal lapangan terbang.",
        },
      ],
    },
    id: {
      seoTitle: "Antar Jemput Hotel Makkah ke Bandara Jeddah (KAIA) | Duyuf Alrahman VIP",
      seoDescription: "Sewa mobil pribadi tepat waktu dari hotel Makkah ke Bandara King Abdulaziz Jeddah (KAIA). Muat koper & air Zamzam, harga pasti bayar tunai di bandara.",
      h1: "Antar Jemput Hotel Makkah ke Bandara Jeddah (KAIA)",
      subtitle: "Layanan Pengantaran Tepat Waktu Menjamin Check-in Pesawat Bebas Stres dan Aman Membawa Air Zamzam",
      overview: "Nikmati kepulangan yang tenang dan nyaman dari hotel Makkah menuju terminal keberangkatan Bandara Internasional King Abdulaziz Jeddah (KAIA). Supir profesional kami siap membantu membawakan koper dan kardus air Zamzam Anda dengan aman.",
      inclusions: [
        "Penjemputan tepat waktu di lobi hotel Makkah beserta bantuan koper",
        "Pengantaran langsung ke pintu terminal keberangkatan (Terminal 1 atau Utara)",
        "Armada ber-AC luas yang muat koper dan kardus air Zamzam standar 5 liter",
        "Sudah termasuk tol jalan raya, bensin, dan pajak tanpa biaya tambahan",
        "Pembayaran tunai (SAR atau USD) langsung ke supir saat tiba di bandara",
      ],
      highwayNote: "Jalan Tol Makkah - Jeddah (Rute 40)",
      authoritySource: "Otoritas Penerbangan Sipil (GACA) & Otoritas Transportasi",
      faqs: [
        {
          question: "Berapa jam sebelum jadwal terbang harus berangkat dari Makkah?",
          answer: "Disarankan berangkat 3,5 hingga 4 jam sebelum jadwal penerbangan internasional.",
        },
        {
          question: "Apakah mobil muat untuk air Zamzam?",
          answer: "Ya, bagasi mobil kami dirancang luas untuk memuat koper serta air Zamzam kemasan resmi.",
        },
        {
          question: "Bagaimana pembayarannya?",
          answer: "Pembayaran dilakukan tunai (SAR atau USD) kepada supir saat sampai di terminal bandara.",
        },
      ],
    },
    ur: {
      seoTitle: "مکہ ہوٹل سے جدہ ایئرپورٹ (KAIA) واپسی وی آئی پی ٹرانسفر | ضیوف الرحمن VIP",
      seoDescription: "مکہ مکرمہ کے ہوٹلوں سے شاہ عبدالعزیز انٹرنیشنل ایئرپورٹ جدہ تک بروقت پرائیویٹ کار سروس۔ سامان اور آب زم زم کے لیے کشادہ جگہ۔ کیش ادائیگی۔",
      h1: "مکہ ہوٹل سے جدہ ایئرپورٹ (KAIA) ڈیپارچر ٹرانسفر",
      subtitle: "بروقت ایئرپورٹ ڈراپ سروس تاکہ آپ پرواز سے پہلے بغیر کسی پریشانی کے بورڈنگ اور زمزم پارسل جمع کروا سکیں",
      overview: "مکہ مکرمہ میں اپنے ہوٹل سے جدہ کے کنگ عبدالعزیز انٹرنیشنل ایئرپورٹ (KAIA) کے روانگی ٹرمینل تک پُرسکون اور وقت کا پابند سفر۔ ہماری گاڑیاں پورے خاندان کے سامان اور آب زمزم کے ڈبوں کے لیے کشادہ ہیں۔",
      inclusions: [
        "مکہ ہوٹل کی لابی سے بروقت پک اپ اور سامان لوڈنگ میں مکمل معاونت",
        "مطلوبہ ڈیپارچر ٹرمینل (ٹرمینل 1 یا نارتھ ٹرمینل) کے دروازے تک براہ راست ڈراپ",
        "ایئر کنڈیشنڈ اور کشادہ گاڑیاں جن میں سامان اور زم زم کین باآسانی آ جائیں",
        "تمام ٹول ٹیکس، پیٹرول اور ویٹ شامل، کوئی اضافی چارج نہیں",
        "ایئرپورٹ پہنچنے پر ڈرائیور کو نقد (سعودی ریال یا ڈالر) ادائیگی",
      ],
      highwayNote: "مکہ - جدہ ایکسپریس وے (روٹ 40)",
      authoritySource: "جنرل اتھارٹی آف سول ایوی ایشن (GACA)",
      faqs: [
        {
          question: "پرواز سے کتنے گھنٹے قبل مکہ سے نکلنا چاہیے؟",
          answer: "بین الاقوامی پروازوں کے لیے ہم فلائٹ سے ساڑھے 3 سے 4 گھنٹے قبل مکہ سے روانگی کی سفارش کرتے ہیں۔",
        },
        {
          question: "کیا گاڑی میں آب زمزم کے ڈبے رکھنے کی گنجائش ہوتی ہے؟",
          answer: "جی ہاں، گاڑیوں کا ڈگی سپیس بہت وسیع ہے جس میں بڑے اٹیچی اور زم زم کین بآسانی سما جاتے ہیں۔",
        },
        {
          question: "ادائیگی کا طریقہ کار کیا ہے؟",
          answer: "جدہ ایئرپورٹ پر پہنچ کر ڈرائیور کو نقد (ریال یا ڈالر) ادا کیا جاتا ہے۔",
        },
      ],
    },
    fr: {
      seoTitle: "Transfert Départ La Mecque vers Aéroport de Djeddah (KAIA) | Duyuf Alrahman VIP",
      seoDescription: "Chauffeur privé ponctuel de La Mecque à l'Aéroport International Roi Abdelaziz (KAIA) de Djeddah. Transport de bagages et bidons de Zamzam. Paiement espèces.",
      h1: "Transfert Départ La Mecque vers Aéroport de Djeddah (KAIA)",
      subtitle: "Service Chauffeur Ponctuel Garantissant un Enregistrement à l'Aéroport Sans Stress et le Transport de l'Eau de Zamzam",
      overview: "Assurez votre retour en toute sérénité depuis votre hôtel à La Mecque directement jusqu'au terminal de départ de l'Aéroport de Djeddah (KAIA). Véhicules spacieux prévus pour tous vos bagages et bidons d'eau de Zamzam officiels.",
      inclusions: [
        "Prise en charge ponctuelle au lobby de votre hôtel à La Mecque",
        "Dépose directe devant votre terminal de départ (Terminal 1 ou Terminal Nord)",
        "Véhicules climatisés avec vaste coffre pour bagages et cartons de Zamzam",
        "Péages, carburant et taxes inclus dans le tarif fixe garanti",
        "Paiement en espèces (SAR ou USD) auprès du chauffeur au terminal",
      ],
      highwayNote: "Autoroute La Mecque - Djeddah (Route 40)",
      authoritySource: "Autorité Générale de l'Aviation Civile (GACA)",
      faqs: [
        {
          question: "Combien de temps avant le vol faut-il quitter La Mecque ?",
          answer: "Nous recommandons de partir 3h30 à 4h avant l'heure de décollage des vols internationaux.",
        },
        {
          question: "Le véhicule peut-il transporter l'eau de Zamzam ?",
          answer: "Oui, nos coffres spacieux accueillent aisément les valises et les cartons officiels de 5L d'eau de Zamzam.",
        },
        {
          question: "Comment payer le trajet ?",
          answer: "Le paiement est effectué en espèces (SAR ou USD) directement au chauffeur à l'arrivée à l'aéroport.",
        },
      ],
    },
    es: {
      seoTitle: "Traslado Salida La Meca al Aeropuerto de Yeda (KAIA) | Duyuf Alrahman VIP",
      seoDescription: "Chófer privado puntual desde hoteles de La Meca al Aeropuerto Internacional Rey Abdulaziz (KAIA) en Yeda. Amplio maletero para equipaje y agua Zamzam.",
      h1: "Traslado de Salida La Meca al Aeropuerto de Yeda (KAIA)",
      subtitle: "Servicio de Chófer Puntual para una Llegada al Aeropuerto Libre de Estrés y Transporte Seguro de Agua Zamzam",
      overview: "Garantice un traslado de salida puntual y cómodo desde su hotel en La Meca directamente a su terminal de salida en el Aeropuerto de Yeda (KAIA). Espacio generoso para maletas y bidones de agua Zamzam.",
      inclusions: [
        "Recogida puntual en el vestíbulo del hotel y asistencia con el equipaje",
        "Llegada directa a la puerta de su terminal de salida (Terminal 1 o Norte)",
        "Vehículo con aire acondicionado y gran capacidad de carga para equipaje y Zamzam",
        "Todos los peajes, gasolina e impuestos incluidos en la tarifa fija",
        "Pago en efectivo (SAR o USD) al conductor al llegar al aeropuerto",
      ],
      highwayNote: "Autopista La Meca - Yeda (Ruta 40)",
      authoritySource: "Autoridad General de Aviación Civil (GACA)",
      faqs: [
        {
          question: "¿Con cuánta antelación debo salir de La Meca?",
          answer: "Recomendamos salir de La Meca entre 3,5 y 4 horas antes de los vuelos internacionales.",
        },
        {
          question: "¿Se pueden llevar bidones de agua Zamzam?",
          answer: "Sí, la flota dispone de amplios maleteros adaptados para equipaje y cajas oficiales de Zamzam.",
        },
        {
          question: "¿Cómo se abona el viaje?",
          answer: "Se abona en efectivo (SAR o USD) directamente al conductor al llegar a la terminal.",
        },
      ],
    },
    de: {
      seoTitle: "Transfer Mekka nach Flughafen Dschidda (KAIA) | Duyuf Alrahman VIP",
      seoDescription: "Pünktlicher Chauffeur-Transfer von Mekka zum King Abdulaziz Airport (KAIA) Dschidda. Viel Platz für Gepäck und Zamzam-Wasser. Barzahlung vor Ort.",
      h1: "Abreisetransfer Hotel Mekka zum Flughafen Dschidda (KAIA)",
      subtitle: "Pünktlicher Chauffeurservice für einen stressfreien Check-in am Flughafen und sicheren Transport von Zamzam-Wasser",
      overview: "Genießen Sie einen stressfreien und pünktlichen Abreisetransfer von Ihrem Hotel in Mekka direkt zum Abflugterminal des King Abdulaziz International Airport (KAIA) in Dschidda. Große Fahrzeuge mit reichlich Stauraum für Koffer und verpacktes Zamzam-Wasser.",
      inclusions: [
        "Pünktliche Abholung in der Hotellobby in Mekka inklusive Gepäckservice",
        "Direkte Ankunft an Ihrem Abflugterminal (Terminal 1 oder Nordterminal)",
        "Vollklimatisierte Fahrzeuge mit reichlich Platz für Gepäck und 5L-Zamzam-Kartons",
        "Alle Mautgebühren, Benzin und Steuern im garantierten Festpreis inbegriffen",
        "Barzahlung (SAR oder USD) direkt beim Chauffeur bei Ankunft am Flughafen",
      ],
      highwayNote: "Mekka - Dschidda Schnellstraße (Route 40)",
      authoritySource: "Zivilluftfahrtbehörde GACA & Verkehrsministerium",
      faqs: [
        {
          question: "Wie früh vor Abflug sollte man in Mekka losfahren?",
          answer: "Wir empfehlen, bei internationalen Flügen 3,5 bis 4 Stunden vor Abflug in Mekka zu starten.",
        },
        {
          question: "Passt Zamzam-Wasser in den Kofferraum?",
          answer: "Ja, unsere Fahrzeuge verfügen über geräumige Kofferräume für Gepäck und offizielle Zamzam-Kartons.",
        },
        {
          question: "Wie wird bezahlt?",
          answer: "Die Bezahlung erfolgt in bar (SAR oder USD) beim Fahrer am Terminal.",
        },
      ],
    },
    tr: {
      seoTitle: "Mekke Otellerinden Cidde Havalimanı (KAIA) Transferi | Duyuf Alrahman VIP",
      seoDescription: "Mekke otellerinden Cidde Kral Abdülaziz Havalimanı (KAIA) kalkış terminallerine dakik VIP transfer. Zemzem suyu ve bagaj taşıma garantisi.",
      h1: "Mekke Otellerinden Cidde Havalimanına (KAIA) Dönüş Transferi",
      subtitle: "Uçuş Öncesi Stressiz Havalimanı Girişi ve Zemzem Suyu Taşıma Kolaylığı Sağlayan Dakik VIP Şoförlük Hizmeti",
      overview: "Mekke-i Mükerreme'deki otelinizden Cidde Kral Abdülaziz Uluslararası Havalimanı (KAIA) gidiş terminaline konforlu ve dakik bir dönüş yolculuğu. Geniş araçlarımız tüm aile fertlerinizi, valizlerinizi ve kutulu zemzem bidonlarınızı rahatça alır.",
      inclusions: [
        "Mekke otelinizin lobisinden tam vaktinde karşılama ve bagaj yardımı",
        "Uçuşunuzun kalkacağı terminal kapısına kadar (Terminal 1 veya Kuzey Terminali) doğrudan ulaşım",
        "Valizler ve resmi kutulu zemzem suları için geniş bagaj kapasiteli klimalı araçlar",
        "Tüm otoyol geçiş ücretleri, benzin ve vergiler fiyata dahildir",
        "Havalimanı terminaline varışta şoföre nakit (SAR veya USD) elden ödeme",
      ],
      highwayNote: "Mekke - Cidde Otoyolu (40 Nolu Güzergah)",
      authoritySource: "Suudi Sivil Havacılık Genel Otoritesi (GACA)",
      faqs: [
        {
          question: "Uçuştan kaç saat önce Mekke'den çıkılmalı?",
          answer: "Uluslararası uçuşlar için uçak kalkış saatinden 3,5 - 4 saat önce Mekke'den hareket edilmesini tavsiye ederiz.",
        },
        {
          question: "Araçta zemzem suyu için yer var mı?",
          answer: "Evet, araçlarımızın bagajları valizlerin yanı sıra 5 litrelik kutulu zemzem bidonlarını da alacak büyüklüktedir.",
        },
        {
          question: "Ödeme nasıl yapılır?",
          answer: "Havalimanı terminaline vardığınızda şoföre nakit (SAR veya USD) olarak ödenir.",
        },
      ],
    },
    hi: {
      seoTitle: "मक्का होटल से जेद्दा एयरपोर्ट (KAIA) वापसी ट्रांसफर | Duyuf Alrahman VIP",
      seoDescription: "मक्का के होटलों से किंग अब्दुलअज़ीज़ एयरपोर्ट (KAIA) जेद्दा तक समय पर प्राइवेट कार सर्विस। सामान और ज़मज़म पानी के लिए पर्याप्त जगह।",
      h1: "मक्का होटल से जेद्दा एयरपोर्ट (KAIA) डिपार्चर ट्रांसफर",
      subtitle: "तय समय पर एयरपोर्ट ड्रॉप सेवा ताकि आप बिना किसी परेशानी के अपनी फ्लाइट पकड़ सकें और ज़मज़म पानी सुरक्षित ले जा सकें",
      overview: "मक्का मुकर्रमा में अपने होटल से जेद्दा एयरपोर्ट (KAIA) के डिपार्चर टर्मिनल तक समय पर सुरक्षित यात्रा। बड़ी और आरामदायक गाड़ियां आपके पूरे परिवार, बैग और ज़मज़म के डिब्बों के लिए पर्याप्त जगह प्रदान करती हैं।",
      inclusions: [
        "मक्का होटल लॉबी से समय पर पिकअप और सामान रखने में मदद",
        "सीधे डिपार्चर टर्मिनल गेट (टर्मिनल 1 या नॉर्थ टर्मिनल) तक ड्रॉप",
        "वातानुकूलित वाहन जिसमें सूटकेस और आधिकारिक 5L ज़मज़म बॉक्स आराम से आ जाएं",
        "सभी टोल, पेट्रोल और वैट शामिल, कोई अतिरिक्त शुल्क नहीं",
        "एयरपोर्ट पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान",
      ],
      highwayNote: "मक्का - जेद्दा एक्सप्रेसवे (रूट 40)",
      authoritySource: "सऊदी नागरिक उड्डयन प्राधिकरण (GACA)",
      faqs: [
        {
          question: "फ्लाइट से कितने घंटे पहले मक्का से निकलना चाहिए?",
          answer: "अंतर्राष्ट्रीय उड़ानों के लिए हम फ्लाइट के समय से 3.5 से 4 घंटे पहले निकलने की सलाह देते हैं।",
        },
        {
          question: "क्या गाड़ी में ज़मज़म पानी ले जाने की जगह होती है?",
          answer: "हाँ, गाड़ियों में सूटकेस और 5 लीटर ज़मज़म के बक्से रखने के लिए काफी जगह होती है।",
        },
        {
          question: "किराया कैसे चुकाया जाता है?",
          answer: "एयरपोर्ट पहुंचने पर ड्राइवर को नकद (SAR या USD) में किराया दिया जाता है।",
        },
      ],
    },
  },
  'makkah-to-taif': {
    ar: {
      seoTitle: "توصيل من مكة إلى الطائف وجبال الهدا ومزارع الورد | ضيوف الرحمن VIP",
      seoDescription: "سائق خاص وتوصيل VIP من فنادق مكة المكرمة إلى مرتفعات الطائف وعقبة الهدا ومزارع الورد. رحلة جبلية ممتعة وسيارات حديثة ودفع كاش عند الوصول.",
      h1: "توصيل خاص وسائق VIP من مكة المكرمة إلى الطائف وجبال الهدا",
      subtitle: "رحلة جبلية ساحرة عبر عقبة الهدا مع أقصى درجات الراحة العائلية والأجواء المعتدلة ومزارع الورد الطائفي",
      overview: "استمتع برحلة سياحية وتنقل مريح من حرارة مكة المكرمة إلى نسيم مرتفعات الطائف وجبال الهدا والشفا. سائقنا الخبير يقودكم بأمان عبر عقبة الهدا السريعة والمجهزة بأعلى معايير السلامة.",
      inclusions: [
        "توصيل خاص من باب فندقك بمكة إلى أي وجهة أو منتجع في الطائف",
        "سائق محترف خبير بمسارات الجبال وعقبة الهدا المزدوجة والمحمية",
        "سيارات مكيفة حديثة تتسع للعائلات ومشتريات ورد الطائف",
        "شامل كافة رسوم الطرق والوقود وضريبة القيمة المضافة",
        "الدفع نقداً كاش (ريال سعودي أو دولار) للسائق عند الوصول للطائف",
      ],
      highwayNote: "طريق عقبة الهدا السريع المزدوج (طريق 15)",
      authoritySource: "الهيئة العامة للنقل ووزارة السياحة",
      faqs: [
        {
          question: "كم تستغرق الرحلة من مكة إلى الطائف؟",
          answer: "تستغرق الرحلة حوالي ساعة وربع إلى ساعة ونصف لمسافة 85 كم عبر عقبة الهدا.",
        },
        {
          question: "هل يمكن التوقف عند تلفريك الهدا أو مصانع الورد؟",
          answer: "نعم، يمكن التنسيق مع السائق للتوقف السياحي والاستمتاع بمزارع الورد ومحطة التلفريك.",
        },
        {
          question: "كيف يتم دفع قيمة التوصيل؟",
          answer: "الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول للطائف.",
        },
      ],
    },
    en: {
      seoTitle: "Makkah to Taif Private Transfer & Al Hada Tour | Duyuf Alrahman VIP",
      seoDescription: "Private chauffeur transfer from Makkah to Taif highland resorts, Al Hada mountains, and rose factories. Luxury fleet, cash payment upon arrival.",
      h1: "Makkah Hotel to Taif (Al Hada & Rose Farms) Private Transfer",
      subtitle: "Scenic Mountain Ascent via Al Hada Highway with Family Comfort and Cool Mountain Breezes",
      overview: "Ascend from holy Makkah into the refreshing mountain climate of Taif and Al Hada in absolute comfort. Your experienced private chauffeur navigates the engineered mountain pass of Route 15 safely to your resort or tour destination.",
      inclusions: [
        "Door-to-door private transfer from Makkah hotel to Taif resort or hotel",
        "Skilled mountain highway chauffeur experienced with Al Hada dual carriageway",
        "Pristine air-conditioned vehicles accommodating families and luggage",
        "All fuel, tolls, and VAT included with zero hidden charges",
        "Cash payment upon arrival in Taif (SAR or USD)",
      ],
      highwayNote: "Route 15 / Al Hada Mountain Highway",
      authoritySource: "Transport General Authority & Ministry of Tourism",
      faqs: [
        {
          question: "How long is the drive from Makkah to Taif?",
          answer: "The 85 km scenic mountain drive takes approximately 75 to 90 minutes.",
        },
        {
          question: "Can we stop at Al Hada Cable Car or rose factories?",
          answer: "Yes, customized stops at the teleferik station and traditional rose oil distilleries can be arranged.",
        },
        {
          question: "What is the payment method?",
          answer: "Payment is cash only (SAR or USD) paid directly to the chauffeur upon arrival in Taif.",
        },
      ],
    },
    ms: {
      seoTitle: "Pengangkutan Peribadi Makkah ke Taif & Gunung Al Hada | Duyuf Alrahman VIP",
      seoDescription: "Kereta sewa peribadi dengan pemandu dari Makkah ke pergunungan Taif dan ladang mawar. Perjalanan selamat, bayar tunai kepada pemandu di Taif.",
      h1: "Pengangkutan Peribadi Hotel Makkah ke Taif & Gunung Al Hada",
      subtitle: "Perjalanan Gunung Mengagumkan Melalui Lebuhraya Al Hada yang Nyaman dan Sejuk untuk Keluarga",
      overview: "Nikmati percutian sejuk dari Makkah ke pergunungan Taif yang nyaman dengan kereta sewa peribadi VIP. Pemandu berpengalaman kami akan membawa anda mendaki lebuh raya moden Al Hada dengan selamat.",
      inclusions: [
        "Pengambilan di hotel Makkah dan penghantaran ke hotel/resort Taif",
        "Pemandu mahir laluan pergunungan Al Hada yang selamat",
        "Kenderaan berhawa dingin selesa untuk keluarga dan bagasi",
        "Semua tol, minyak, dan cukai sudah termasuk dalam harga tetap",
        "Bayaran tunai (SAR atau USD) kepada pemandu semasa tiba di Taif",
      ],
      highwayNote: "Lebuhraya Gunung Al Hada (Laluan 15)",
      authoritySource: "Pihak Berkuasa Pengangkutan & Kementerian Pelancongan",
      faqs: [
        {
          question: "Berapa lamakah perjalanan dari Makkah ke Taif?",
          answer: "Jarak 85 km mengambil masa sekitar 1 jam 15 minit hingga 1 jam 30 minit.",
        },
        {
          question: "Bolehkah singgah di ladang mawar atau kereta kabel?",
          answer: "Ya, anda boleh meminta pemandu singgah sebentar di stesen kereta kabel atau kilang mawar Taif.",
        },
        {
          question: "Bagaimana cara bayar?",
          answer: "Bayaran adalah tunai (SAR atau USD) terus kepada pemandu semasa tiba di Taif.",
        },
      ],
    },
    id: {
      seoTitle: "Travel Privat Makkah ke Taif & Pegunungan Al Hada | Duyuf Alrahman VIP",
      seoDescription: "Sewa mobil pribadi dengan supir dari Makkah ke Taif, pegunungan Al Hada, dan kebun mawar. Armada ber-AC nyaman, bayar tunai di tempat.",
      h1: "Travel Privat Hotel Makkah ke Taif & Pegunungan Al Hada",
      subtitle: "Perjalanan Indah Melewati Jalur Al Hada yang Sejuk dan Menyegarkan Bersama Keluarga Tercinta",
      overview: "Rasakan kesejukan udara pegunungan Taif setelah beribadah di Makkah. Supir kami siap mengantar Anda dan keluarga menaiki jalur pegunungan Al Hada yang lebar dan aman menuju resort atau wisata kebun mawar.",
      inclusions: [
        "Layanan antar-jemput privat dari hotel Makkah ke Taif",
        "Supir berpengalaman di medan pegunungan Al Hada yang aman",
        "Mobil ber-AC dingin dan nyaman untuk keluarga besar dan oleh-oleh",
        "Harga pasti sudah termasuk bensin, tol, dan pajak",
        "Bayar tunai (SAR atau USD) langsung ke supir saat tiba di Taif",
      ],
      highwayNote: "Jalan Pegunungan Al Hada (Rute 15)",
      authoritySource: "Otoritas Transportasi & Kementerian Pariwisata",
      faqs: [
        {
          question: "Berapa lama perjalanan dari Makkah ke Taif?",
          answer: "Jarak 85 km ditempuh dalam waktu sekitar 75 hingga 90 menit perjalanan santai.",
        },
        {
          question: "Apakah bisa mampir ke kebun mawar atau kereta gantung?",
          answer: "Bisa, Anda dapat meminta supir singgah di stesen kereta gantung atau sentra penyulingan mawar Taif.",
        },
        {
          question: "Bagaimana pembayarannya?",
          answer: "Pembayaran dilakukan tunai (SAR atau USD) kepada supir setelah sampai di Taif.",
        },
      ],
    },
    ur: {
      seoTitle: "مکہ سے طائف اور الہدا پہاڑوں کے لیے پرائیویٹ کار سروس | ضیوف الرحمن VIP",
      seoDescription: "مکہ ہوٹلوں سے طائف، الہدا کی وادیوں اور گلاب کے باغات کے لیے وی آئی پی ٹیکسی سروس۔ محفوظ پہاڑی سفر اور پہنچنے پر کیش ادائیگی۔",
      h1: "مکہ مکرمہ سے طائف اور کوہ الہدا وی آئی پی پرائیویٹ ٹرانسفر",
      subtitle: "الہدا ہائی وے کے ذریعے دلکش اور ٹھنڈے پہاڑی مقامات کا پُرسکون خاندانی سفر",
      overview: "مکہ مکرمہ کی گرمی سے نکل کر طائف کے خوشگوار اور ٹھنڈے موسم کا لطف اٹھائیں۔ ہمارے ماہر ڈرائیورز الہدا کی جدید اور محفوظ دو رویہ سڑک پر آپ کو بحفاظت طائف کے ہوٹل یا تفریحی مقام تک پہنچاتے ہیں۔",
      inclusions: [
        "مکہ ہوٹل سے طائف کے کسی بھی مقام تک نجی پک اینڈ ڈراپ",
        "پہاڑی راستوں کے ماہر اور تجربہ کار ڈرائیورز",
        "اہل خانہ کے لیے جدید، آرام دہ اور ایئر کنڈیشنڈ گاڑیاں",
        "تمام پیٹرول، ٹول ٹیکس اور ویٹ شامل، کوئی اضافی خرچ نہیں",
        "طائف پہنچنے پر ڈرائیور کو نقد (سعودی ریال یا ڈالر) ادائیگی",
      ],
      highwayNote: "طریق عقبۃ الہدا ہائی وے (روٹ 15)",
      authoritySource: "ٹرانسپورٹ اتھارٹی اور وزارت سیاحت",
      faqs: [
        {
          question: "مکہ سے طائف کا سفر کتنا طویل ہے؟",
          answer: "85 کلومیٹر کا فاصلہ تقریباً سوا سے ڈیڑھ گھنٹے میں طے ہو جاتا ہے۔",
        },
        {
          question: "کیا راستے میں کیبل کار یا گلاب فیکٹری پر رک سکتے ہیں؟",
          answer: "جی ہاں، الہدا کیبل کار یا طائف کے مشہور گلاب کارخانوں پر سیاحتی سٹاپ ممکن ہے۔",
        },
        {
          question: "ادائیگی کا طریقہ کیا ہے؟",
          answer: "طائف پہنچنے پر ڈرائیور کو کیش (ریال یا ڈالر) ادا کیا جاتا ہے۔",
        },
      ],
    },
    fr: {
      seoTitle: "Transfert Privé La Mecque à Taïf & Montagnes d'Al Hada | Duyuf Alrahman VIP",
      seoDescription: "Chauffeur privé de La Mecque vers les stations d'altitude de Taïf et les champs de roses. Conduite sécurisée en montagne, paiement en espèces.",
      h1: "Transfert Privé La Mecque vers Taïf et Montagnes d'Al Hada",
      subtitle: "Ascension Panoramique Sécurisée par l'Autoroute d'Al Hada avec Tout le Confort Familial",
      overview: "Découvrez la fraîcheur des hauteurs de Taïf depuis La Mecque dans un confort VIP. Nos chauffeurs expérimentés empruntent la route d'Al Hada dotée de glissières de sécurité modernes pour vous conduire à destination en toute sérénité.",
      inclusions: [
        "Prise en charge porte-à-porte de La Mecque à votre hôtel à Taïf",
        "Chauffeur chevronné habitué aux routes de montagne sécurisées",
        "Véhicules spacieux et climatisés pour familles et bagages",
        "Carburant, péages et TVA inclus dans le tarif fixe garanti",
        "Paiement en espèces (SAR ou USD) auprès du chauffeur à Taïf",
      ],
      highwayNote: "Autoroute de Montagne Al Hada (Route 15)",
      authoritySource: "Autorité Générale des Transports & Ministère du Tourisme",
      faqs: [
        {
          question: "Combien de temps dure le trajet La Mecque - Taïf ?",
          answer: "Le trajet de 85 km dure environ 1h15 à 1h30 via la route d'Al Hada.",
        },
        {
          question: "Peut-on s'arrêter au téléphérique ou aux distilleries de roses ?",
          answer: "Oui, des arrêts touristiques peuvent être convenus avec votre chauffeur.",
        },
        {
          question: "Comment payer le chauffeur ?",
          answer: "Le paiement est effectué en espèces (SAR ou USD) à votre arrivée à Taïf.",
        },
      ],
    },
    es: {
      seoTitle: "Traslado Privado La Meca a Taif y Montañas de Al Hada | Duyuf Alrahman VIP",
      seoDescription: "Chófer privado de La Meca a las montañas de Taif, Al Hada y campos de rosas. Flota de lujo y pago en efectivo al llegar a Taif.",
      h1: "Traslado Privado La Meca a Taif y Montañas de Al Hada",
      subtitle: "Ascenso Panorámico por la Autopista Al Hada con Brisas Frescas de Montaña y Confort Familiar",
      overview: "Disfrute del clima fresco de montaña en Taif tras su estancia en La Meca. Chófer privado profesional en vehículos premium que recorre la segura carretera de montaña de Al Hada.",
      inclusions: [
        "Traslado puerta a puerta de hotel en La Meca a su destino en Taif",
        "Conductor experto en carreteras de montaña con altos estándares de seguridad",
        "Coches confortables con aire acondicionado y espacio para equipaje",
        "Peajes, combustible e impuestos incluidos en la tarifa fija",
        "Pago en efectivo (SAR o USD) al conductor al llegar a Taif",
      ],
      highwayNote: "Autopista de Montaña Al Hada (Ruta 15)",
      authoritySource: "Autoridad General de Transporte y Ministerio de Turismo",
      faqs: [
        {
          question: "¿Cuánto dura el viaje de La Meca a Taif?",
          answer: "El trayecto de 85 km se realiza en aproximadamente 75 a 90 minutos.",
        },
        {
          question: "¿Se puede parar en el teleférico o destilerías de rosas?",
          answer: "Sí, puede acordar paradas turísticas con el chófer.",
        },
        {
          question: "¿Cómo se abona el servicio?",
          answer: "En efectivo (SAR o USD) directamente al chófer al llegar a Taif.",
        },
      ],
    },
    de: {
      seoTitle: "Privater Transfer Mekka nach Taif & Al Hada Berge | Duyuf Alrahman VIP",
      seoDescription: "Chauffeurservice von Mekka nach Taif, ins Al Hada Gebirge und zu den Rosenfarmen. Modernste Fahrzeuge, Barzahlung bei Ankunft in Taif.",
      h1: "Privater Transfer Mekka nach Taif & Al Hada Gebirge",
      subtitle: "Malerische Bergfahrt über den Al Hada Highway mit frischer Bergluft und maximalem Familienkomfort",
      overview: "Genießen Sie das angenehm kühle Bergklima von Taif. Ihr privater Chauffeur bringt Sie über den modernen Al Hada Gebirgspass sicher von Ihrem Hotel in Mekka nach Taif.",
      inclusions: [
        "Tür-zu-Tür-Transfer vom Hotel in Mekka nach Taif",
        "Erfahrener Fahrer für sichere Gebirgsstraßen",
        "Komfortable klimatisierte Fahrzeuge für die ganze Familie",
        "Treibstoff, Maut und Steuern im Festpreis enthalten",
        "Barzahlung (SAR oder USD) beim Fahrer bei Ankunft in Taif",
      ],
      highwayNote: "Al Hada Gebirgsautobahn (Route 15)",
      authoritySource: "Verkehrsbehörde & Tourismusministerium",
      faqs: [
        {
          question: "Wie lange dauert die Fahrt von Mekka nach Taif?",
          answer: "Die 85 km lange Strecke dauert etwa 75 bis 90 Minuten.",
        },
        {
          question: "Sind Zwischenstopps an der Seilbahn möglich?",
          answer: "Ja, kurze Haltestellen an der Seilbahn oder an Rosenfarmen sind möglich.",
        },
        {
          question: "Wie wird bezahlt?",
          answer: "Barzahlung (SAR oder USD) direkt beim Fahrer bei Ankunft in Taif.",
        },
      ],
    },
    tr: {
      seoTitle: "Mekke - Taif ve El Heda Dağları Özel VIP Transfer | Duyuf Alrahman VIP",
      seoDescription: "Mekke otellerinden Taif yaylalarına, El Heda dağlarına ve gül bahçelerine özel şoförlü VIP transfer. Güvenli yolculuk, varışta nakit ödeme.",
      h1: "Mekke Otellerinden Taif ve El Heda Dağlarına Özel VIP Transfer",
      subtitle: "El Heda Otoyolu Üzerinden Serin Dağ Havası Eşliğinde Konforlu ve Güvenli Aile Seyahati",
      overview: "Mekke'nin sıcağından Taif'in serin ve ferahlatıcı yaylalarına özel VIP aracınızla çıkın. Deneyimli şoförümüz modern ve korunaklı El Heda dağ yolundan sizi güvenle Taif'teki otelinize veya gezilecek yerlere ulaştırır.",
      inclusions: [
        "Mekke otelinizden Taif'teki otelinize kapıdan kapıya özel transfer",
        "El Heda dağ yolunda tecrübeli profesyonel şoför",
        "Geniş aileler ve Taif gülü alışverişleri için klimalı lüks araçlar",
        "Tüm otoyol ücretleri, yakıt ve vergiler fiyata dahildir",
        "Taif'e varışta şoföre nakit (SAR veya USD) elden ödeme",
      ],
      highwayNote: "El Heda Dağ Otoyolu (15 Nolu Güzergah)",
      authoritySource: "Suudi Ulaştırma Genel İdaresi & Turizm Bakanlığı",
      faqs: [
        {
          question: "Mekke - Taif arası araçla ne kadar sürer?",
          answer: "85 km mesafe El Heda rampası üzerinden ortalama 75 - 90 dakika sürmektedir.",
        },
        {
          question: "Teleferik veya gül fabrikalarında durulabilir mi?",
          answer: "Evet, şoförünüzle anlaşarak teleferik durağında veya gül yağı atölyelerinde mola verebilirsiniz.",
        },
        {
          question: "Ödeme nasıl yapılır?",
          answer: "Taif'e vardığınızda şoföre nakit (SAR veya USD) olarak elden ödenir.",
        },
      ],
    },
    hi: {
      seoTitle: "मक्का से तायफ और अल हदा पहाड़ प्राइवेट ट्रांसफर | Duyuf Alrahman VIP",
      seoDescription: "मक्का होटल से तायफ के पहाड़ों, अल हदा और गुलाब के बागानों के लिए प्राइवेट कैब सेवा। आरामदायक सफर, पहुंचने पर नकद भुगतान।",
      h1: "मक्का होटल से तायफ और अल हदा पहाड़ प्राइवेट वीआईपी ट्रांसफर",
      subtitle: "अल हदा हाईवे के रास्ते ठंडी और मनमोहक पहाड़ी वादियों का आरामदायक पारिवारिक सफर",
      overview: "मक्का की गर्मी से निकलकर तायफ और अल हदा के ठंडे मौसम का आनंद लें। हमारा अनुभवी ड्राइवर आपको सुरक्षित अल हदा पर्वतीय मार्ग से सीधे तायफ में आपके गंतव्य तक पहुंचाता है।",
      inclusions: [
        "मक्का होटल से तायफ तक निजी वातानुकूलित वाहन",
        "पहाड़ी रास्तों के अनुभवी और सुरक्षित ड्राइवर",
        "पूरे परिवार और सामान के लिए आरामदायक गाड़ियां",
        "सभी टोल, पेट्रोल और टैक्स तय किराए में शामिल",
        "तायफ पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान",
      ],
      highwayNote: "अल हदा माउंटेन हाईवे (रूट 15)",
      authoritySource: "सऊदी परिवहन प्राधिकरण और पर्यटन मंत्रालय",
      faqs: [
        {
          question: "मक्का से तायफ जाने में कितना समय लगता है?",
          answer: "85 किमी की दूरी लगभग 1 घंटे 15 मिनट से 1.5 घंटे में तय होती है।",
        },
        {
          question: "क्या केबल कार या गुलाब कारखाने पर रुक सकते हैं?",
          answer: "हाँ, ड्राइवर के साथ समन्वय करके अल हदा केबल कार या गुलाब के कारखाने में रुका जा सकता है।",
        },
        {
          question: "किराया कैसे दिया जाता है?",
          answer: "तायफ पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान किया जाता है।",
        },
      ],
    },
  },
  'taif-to-makkah': {
    ar: {
      seoTitle: "توصيل من الطائف إلى مكة المكرمة عبر ميقات قرن المنازل | ضيوف الرحمن VIP",
      seoDescription: "توصيل خاص وسائق VIP من الطائف إلى مكة المكرمة مع توقف بميقات قرن المنازل (السيل الكبير) للإحرام. سعر ثابت ودفع كاش عند الوصول.",
      h1: "توصيل خاص من الطائف إلى مكة المكرمة عبر ميقات قرن المنازل",
      subtitle: "انتقال سلس من مرتفعات الطائف إلى مكة المكرمة مع توقف مريح في الميقات للإحرام ونية العمرة",
      overview: "سافر براحة واطمئنان من فنادق أو منتجعات الطائف إلى مكة المكرمة مع التوقف المعتمد في ميقات قرن المنازل (السيل الكبير) أو وادي محرم للإحرام ونية العمرة قبل دخول حدود الحرم المكي الشريف.",
      inclusions: [
        "توقف مريح في الميقات (قرن المنازل أو وادي محرم) للإحرام والصلاة",
        "توصيل مباشر من باب فندقك بالطائف إلى باب فندقك بمكة المكرمة",
        "سيارات مكيفة واسعة ومريحة للعائلات وحقائب السفر",
        "شامل كافة رسوم الطرق والوقود وضريبة القيمة المضافة",
        "الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول لمكة",
      ],
      highwayNote: "طريق الهدا (طريق 15) أو طريق السيل الكبير (طريق 287)",
      authoritySource: "الهيئة العامة للنقل ووزارة الحج والعمرة",
      faqs: [
        {
          question: "هل يشمل التوصيل التوقف في الميقات للإحرام؟",
          answer: "نعم، التوقف في ميقات قرن المنازل (السيل الكبير) أو وادي محرم مشمول مع انتظار السائق حتى ارتداء الإحرام والتلبية.",
        },
        {
          question: "كم تستغرق المسافة من الطائف إلى مكة؟",
          answer: "تبلغ المسافة حوالي 85 كم وتستغرق بين 75 إلى 90 دقيقة بحسب مسار النزول وميقات الإحرام.",
        },
        {
          question: "كيف يتم دفع الأجرة؟",
          answer: "الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول إلى فندقكم بمكة.",
        },
      ],
    },
    en: {
      seoTitle: "Taif to Makkah Transfer via Miqat Qarn al-Manazil | Duyuf Alrahman VIP",
      seoDescription: "Private chauffeur transfer from Taif to Makkah hotels with dedicated stop at Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) for Ihram. Fixed rates, cash payment.",
      h1: "Taif to Makkah Hotel Private Transfer (Via Miqat Qarn al-Manazil)",
      subtitle: "Seamless Descent from Taif Mountains to Makkah with Dedicated Miqat Stop for Umrah Ihram",
      overview: "Travel comfortably from Taif to holy Makkah with a dedicated stop at Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) or Wadi Muharram. Your private chauffeur waits while you shower, dress in Ihram, and declare your Niyyah before proceeding to Makkah.",
      inclusions: [
        "Dedicated stop at Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) for Ihram",
        "Door-to-door transfer from your Taif resort to your Makkah accommodation",
        "Pristine air-conditioned vehicles accommodating families and luggage",
        "All highway tolls, fuel, and taxes included in the guaranteed fare",
        "Cash payment upon arrival at your Makkah hotel (SAR or USD)",
      ],
      highwayNote: "Route 15 (Al Hada) or Route 287 (As-Sayl Al-Kabeer)",
      authoritySource: "Transport General Authority & Ministry of Hajj and Umrah",
      faqs: [
        {
          question: "Does the driver stop at the Miqat for Ihram?",
          answer: "Yes, a stop at Miqat Qarn al-Manazil is guaranteed, and the chauffeur waits while you prepare for Umrah.",
        },
        {
          question: "How long is the drive from Taif to Makkah?",
          answer: "The 85 km journey takes approximately 75 to 90 minutes depending on the descent highway.",
        },
        {
          question: "What is the payment policy?",
          answer: "Payment is cash only (SAR or USD) paid directly to the chauffeur upon arrival in Makkah.",
        },
      ],
    },
    ms: {
      seoTitle: "Pengangkutan Taif ke Makkah Melalui Miqat Qarn al-Manazil | Duyuf Alrahman VIP",
      seoDescription: "Kereta sewa peribadi Taif ke hotel Makkah dengan henti di Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) untuk niat ihram. Bayar tunai di Makkah.",
      h1: "Pengangkutan Peribadi Taif ke Makkah Melalui Miqat Qarn al-Manazil",
      subtitle: "Perjalanan Turun yang Selesa dari Taif ke Makkah dengan Henti Khusus di Miqat untuk Niat Ihram Umrah",
      overview: "Perjalanan pulang dan ibadah umrah yang tenang dari pergunungan Taif ke kota suci Makkah dengan hentian rasmi di Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) untuk berniat ihram.",
      inclusions: [
        "Hentian di Miqat Qarn al-Manazil untuk memakai ihram dan solat sunat",
        "Pengambilan di hotel Taif dan penghantaran terus ke hotel Makkah",
        "Kenderaan berhawa dingin selesa untuk keluarga dan bagasi",
        "Termasuk tol, minyak, dan cukai tanpa sebarang caj tersembunyi",
        "Bayaran tunai (SAR atau USD) kepada pemandu semasa tiba di Makkah",
      ],
      highwayNote: "Lebuhraya Al Hada atau Lebuhraya As-Sayl Al-Kabeer",
      authoritySource: "Lembaga Pengangkutan & Kementerian Haji dan Umrah",
      faqs: [
        {
          question: "Adakah pemandu berhenti di Miqat?",
          answer: "Ya, pemandu akan berhenti dan menunggu di Miqat Qarn al-Manazil untuk persiapan ihram.",
        },
        {
          question: "Berapa lamakah perjalanan dari Taif ke Makkah?",
          answer: "Perjalanan 85 km mengambil masa sekitar 75 hingga 90 minit.",
        },
        {
          question: "Bagaimana cara bayaran?",
          answer: "Bayaran tunai (SAR atau USD) kepada pemandu semasa tiba di hotel Makkah.",
        },
      ],
    },
    id: {
      seoTitle: "Travel Privat Taif ke Makkah Lewat Miqat Qarnul Manazil | Duyuf Alrahman VIP",
      seoDescription: "Sewa mobil pribadi dari Taif ke hotel Makkah dengan singgah di Miqat Qarnul Manazil (As-Sail Al-Kabir) untuk niat ihram. Tarif pasti, bayar tunai di Makkah.",
      h1: "Travel Privat Taif ke Makkah Lewat Miqat Qarnul Manazil",
      subtitle: "Perjalanan Nyaman Turun dari Taif ke Makkah dengan Singgah Khusus di Miqat untuk Niat Ihram Umrah",
      overview: "Perjalanan ibadah yang tenang dari Taif menuju Makkah Al-Mukarramah. Supir kami siap mengantar dan menunggu Anda di Miqat Qarnul Manazil (As-Sail Al-Kabir) untuk mengenakan ihram dan berniat umrah.",
      inclusions: [
        "Singgah di Miqat Qarnul Manazil untuk persiapan ihram dan sholat sunnah",
        "Layanan antar-jemput privat dari hotel Taif ke hotel Makkah",
        "Armada ber-AC dingin dan nyaman dengan ruang koper yang lapang",
        "Harga pasti sudah termasuk bensin, tol, dan pajak",
        "Pembayaran tunai (SAR atau USD) langsung ke supir saat tiba di Makkah",
      ],
      highwayNote: "Jalur Al Hada atau Jalur As-Sail Al-Kabir",
      authoritySource: "Otoritas Transportasi & Kementerian Haji dan Umrah",
      faqs: [
        {
          question: "Apakah supir menunggu di Miqat?",
          answer: "Ya, supir akan menunggu dengan sabar di Miqat Qarnul Manazil hingga Anda selesai berniat ihram.",
        },
        {
          question: "Berapa lama waktu tempuh Taif ke Makkah?",
          answer: "Jarak 85 km ditempuh dalam waktu sekitar 75 hingga 90 menit perjalanan.",
        },
        {
          question: "Bagaimana sistem pembayarannya?",
          answer: "Pembayaran dilakukan secara tunai (SAR atau USD) kepada supir setelah tiba di hotel Makkah.",
        },
      ],
    },
    ur: {
      seoTitle: "طائف سے مکہ مکرمہ بذریعہ میقات قرن المنازل پرائیویٹ کار سروس | ضیوف الرحمن VIP",
      seoDescription: "طائف ہوٹلوں سے مکہ مکرمہ وی آئی پی کار ٹرانسفر میقات قرن المنازل (السیل الکبیر) پر احرام کے لیے قیام کے ساتھ۔ فکسڈ ریٹ اور پہنچنے پر کیش ادائیگی۔",
      h1: "طائف سے مکہ مکرمہ ہوٹل ٹرانسفر (بذریعہ میقات قرن المنازل)",
      subtitle: "طائف کے پہاڑوں سے مکہ مکرمہ کا پُرسکون سفر، میقات پر احرام اور عمرہ کی نیت کے لیے مخصوص سٹاپ کے ساتھ",
      overview: "طائف کے ہوٹل یا ریزورٹ سے مکہ مکرمہ کا پُرسکون سفر۔ ڈرائیور میقات قرن المنازل (السیل الکبیر) یا وادی محرم پر آپ کے احرام باندھنے اور نیت کرنے تک انتظار کرتا ہے۔",
      inclusions: [
        "میقات قرن المنازل پر احرام اور نوافل کے لیے مکمل وقت",
        "طائف ریزورٹ سے مکہ مکرمہ ہوٹل تک نجی ڈور ٹو ڈور گاڑی",
        "ایئر کنڈیشنڈ اور کشادہ گاڑیاں فیملی اور سامان کے لیے",
        "تمام پیٹرول، ٹول ٹیکس اور ویٹ شامل، کوئی خفیہ چارج نہیں",
        "مکہ پہنچنے پر ڈرائیور کو نقد (سعودی ریال یا امریکی ڈالر) ادائیگی",
      ],
      highwayNote: "طریق عقبۃ الہدا یا طریق السیل الکبیر",
      authoritySource: "ٹرانسپورٹ اتھارٹی اور وزارت حج و عمرہ",
      faqs: [
        {
          question: "کیا ڈرائیور میقات پر انتظار کرے گا؟",
          answer: "جی ہاں، میقات قرن المنازل پر احرام باندھنے کے لیے ڈرائیور کا انتظار سروس میں شامل ہے۔",
        },
        {
          question: "طائف سے مکہ کا فاصلہ کتنی دیر میں طے ہوتا ہے؟",
          answer: "85 کلومیٹر کا فاصلہ تقریباً 75 سے 90 منٹ میں طے ہو جاتا ہے۔",
        },
        {
          question: "ادائیگی کا طریقہ کار کیا ہے؟",
          answer: "مکہ ہوٹل پہنچ کر ڈرائیور کو کیش (ریال یا ڈالر) ادا کیا جاتا ہے۔",
        },
      ],
    },
    fr: {
      seoTitle: "Transfert Taïf à La Mecque via Miqat Qarn al-Manazil | Duyuf Alrahman VIP",
      seoDescription: "Chauffeur privé de Taïf à La Mecque avec arrêt au Miqat Qarn al-Manazil pour l'Ihram. Prix fixe et paiement en espèces à l'arrivée.",
      h1: "Transfert Taïf vers La Mecque via Miqat Qarn al-Manazil",
      subtitle: "Descente Sereine depuis Taïf vers La Mecque avec Arrêt Dédié au Miqat pour l'Ihram",
      overview: "Voyagez confortablement de Taïf à La Mecque avec un arrêt garanti au Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) pour revêtir l'Ihram avant d'entrer sur le territoire sacré.",
      inclusions: [
        "Arrêt dédié au Miqat Qarn al-Manazil pour l'Ihram et la prière",
        "Transfert direct de votre hôtel à Taïf jusqu'à votre hôtel à La Mecque",
        "Véhicules climatisés et confortables pour familles et bagages",
        "Péages, carburant et taxes inclus dans le tarif fixe garanti",
        "Paiement en espèces (SAR ou USD) auprès du chauffeur à La Mecque",
      ],
      highwayNote: "Route 15 (Al Hada) ou Route 287 (As-Sayl Al-Kabeer)",
      authoritySource: "Autorité Générale des Transports & Ministère du Hajj",
      faqs: [
        {
          question: "Le chauffeur attend-il au Miqat ?",
          answer: "Oui, l'arrêt au Miqat Qarn al-Manazil est inclus et le chauffeur attend votre mise en Ihram.",
        },
        {
          question: "Combien de temps dure le trajet Taïf - La Mecque ?",
          answer: "Le trajet de 85 km dure environ 75 à 90 minutes.",
        },
        {
          question: "Comment s'effectue le règlement ?",
          answer: "Le paiement est effectué en espèces (SAR ou USD) au chauffeur à l'arrivée.",
        },
      ],
    },
    es: {
      seoTitle: "Traslado Taif a La Meca vía Miqat Qarn al-Manazil | Duyuf Alrahman VIP",
      seoDescription: "Chófer privado de Taif a hoteles de La Meca con parada en Miqat Qarn al-Manazil para el Ihram. Tarifa fija y pago en efectivo al llegar.",
      h1: "Traslado Privado Taif a La Meca vía Miqat Qarn al-Manazil",
      subtitle: "Descenso Cómodo desde Taif a La Meca con Parada en el Miqat para el Ihram de Umrah",
      overview: "Traslado cómodo y seguro de Taif a La Meca con parada prevista en Miqat Qarn al-Manazil (As-Sayl Al-Kabeer) para vestir el Ihram y declarar la intención de Umrah.",
      inclusions: [
        "Parada dedicada en Miqat Qarn al-Manazil para el Ihram",
        "Traslado puerta a puerta de hotel en Taif a hotel en La Meca",
        "Vehículo con aire acondicionado y espacio para equipaje",
        "Peajes, combustible e impuestos incluidos en la tarifa",
        "Pago en efectivo (SAR o USD) al conductor al llegar a La Meca",
      ],
      highwayNote: "Ruta 15 (Al Hada) o Ruta 287 (As-Sayl Al-Kabeer)",
      authoritySource: "Autoridad General de Transporte y Ministerio de Hajj",
      faqs: [
        {
          question: "¿El chófer espera en el Miqat?",
          answer: "Sí, la parada en Miqat Qarn al-Manazil está garantizada.",
        },
        {
          question: "¿Cuánto dura el trayecto de Taif a La Meca?",
          answer: "Los 85 km se recorren en unos 75 a 90 minutos.",
        },
        {
          question: "¿Cómo se abona el servicio?",
          answer: "En efectivo (SAR o USD) directamente al chófer en La Meca.",
        },
      ],
    },
    de: {
      seoTitle: "Transfer Taif nach Mekka über Miqat Qarn al-Manazil | Duyuf Alrahman VIP",
      seoDescription: "Privater Chauffeur von Taif nach Mekka mit Halt an der Miqat Qarn al-Manazil Moschee für Ihram. Fester Preis, Barzahlung bei Ankunft.",
      h1: "Privater Transfer Taif nach Mekka über Miqat Qarn al-Manazil",
      subtitle: "Komfortable Bergabfahrt von Taif nach Mekka mit speziellem Halt am Miqat für Ihram & Absicht",
      overview: "Fahrt von Taif nach Mekka mit Zwischenstopp an der Miqat-Station Qarn al-Manazil (As-Sayl Al-Kabeer), um den Ihram anzulegen und die Absicht für die Umrah zu fassen.",
      inclusions: [
        "Halt an der Miqat Qarn al-Manazil Station für Ihram und Gebet",
        "Tür-zu-Tür-Transfer von Ihrem Hotel in Taif zu Ihrem Hotel in Mekka",
        "Vollklimatisierte moderne Fahrzeuge mit viel Platz für Gepäck",
        "Maut, Benzin und Steuern vollständig im Festpreis enthalten",
        "Barzahlung (SAR oder USD) beim Fahrer bei Ankunft in Mekka",
      ],
      highwayNote: "Route 15 (Al Hada) oder Route 287 (As-Sayl Al-Kabeer)",
      authoritySource: "Verkehrsbehörde & Haddsch-Ministerium",
      faqs: [
        {
          question: "Wartet der Fahrer am Miqat?",
          answer: "Ja, der Halt am Miqat Qarn al-Manazil ist fest eingeplant.",
        },
        {
          question: "Wie lange dauert die Fahrt von Taif nach Mekka?",
          answer: "Die 85 km lange Strecke dauert etwa 75 bis 90 Minuten.",
        },
        {
          question: "Wie wird bezahlt?",
          answer: "Barzahlung (SAR oder USD) beim Fahrer bei Ankunft in Mekka.",
        },
      ],
    },
    tr: {
      seoTitle: "Taif - Mekke VIP Transfer ve Mikat Karnü'l Menazil Molası | Duyuf Alrahman VIP",
      seoDescription: "Taif otellerinden Mekke otellerine özel VIP transfer ve Mikat Karnü'l Menazil (Seylü'l Kebir) ihram molası. Sabit fiyat, varışta nakit ödeme.",
      h1: "Taif Otellerinden Mekke'ye Özel VIP Transfer (Mikat Molalı)",
      subtitle: "Taif Yaylalarından Mekke'ye Güvenli Yolculuk ve Umre İhramı İçin Mikatta Özel Mola",
      overview: "Taif'teki otelinizden Mekke-i Mükerreme'ye konforlu bir yolculuk. Şoförümüz Karnü'l Menazil (Seylü'l Kebir) Mikatında siz ihrama girip niyet edene kadar bekler, ardından Mekke'deki otelinize ulaştırır.",
      inclusions: [
        "Karnü'l Menazil Mikatında ihram ve niyet için yeterli bekleme süresi",
        "Taif otelinizden Mekke otelinize kapıdan kapıya özel VIP transfer",
        "Klimalı ve konforlu yeni model araçlar",
        "Tüm otoyol ücretleri, yakıt ve vergiler fiyata dahildir",
        "Mekke'ye varışta şoföre nakit (SAR veya USD) elden ödeme",
      ],
      highwayNote: "El Heda Otoyolu veya Seylü'l Kebir Yolu",
      authoritySource: "Suudi Ulaştırma Genel İdaresi & Hac Bakanlığı",
      faqs: [
        {
          question: "Şoför Mikatta bekliyor mu?",
          answer: "Evet, Karnü'l Menazil Mikatında bekleme hizmete dahildir.",
        },
        {
          question: "Taif - Mekke arası ne kadar sürer?",
          answer: "85 km mesafe ortalama 75 - 90 dakika sürmektedir.",
        },
        {
          question: "Ödeme nasıl yapılır?",
          answer: "Mekke'ye vardığınızda şoföre nakit (SAR veya USD) olarak ödenir.",
        },
      ],
    },
    hi: {
      seoTitle: "तायफ से मक्का ट्रांसफर मीक़ात क़रनुल मनाज़िल के रास्ते | Duyuf Alrahman VIP",
      seoDescription: "तायफ होटल से मक्का होटल प्राइवेट ट्रांसफर मीक़ात क़रनुल मनाज़िल (अल सैल अल कबीर) पर एहराम के लिए स्टॉप के साथ। तय किराया, पहुंचने पर नकद भुगतान।",
      h1: "तायफ होटल से मक्का प्राइवेट ट्रांसफर (मीक़ात क़रनुल मनाज़िल के रास्ते)",
      subtitle: "तायफ के पहाड़ों से मक्का का आरामदायक सफर, उमराह एहराम के लिए मीक़ात पर विशेष ठहराव के साथ",
      overview: "तायफ के होटल या रिसॉर्ट से मक्का मुकर्रमा तक बिना किसी परेशानी के सुरक्षित यात्रा। ड्राइवर मीक़ात क़रनुल मनाज़िल (अल सैल अल कबीर) पर आपके एहराम बांधने और नमाज़ अदा करने तक इंतज़ार करता है।",
      inclusions: [
        "मीक़ात क़रनुल मनाज़िल पर एहराम और नियत के लिए पर्याप्त समय",
        "तायफ होटल से मक्का होटल तक निजी वातानुकूलित वाहन",
        "परिवार और सामान के लिए आरामदायक गाड़ियां",
        "सभी टोल, पेट्रोल और टैक्स तय किराए में शामिल",
        "मक्का पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान",
      ],
      highwayNote: "अल हदा या अल सैल अल कबीर हाईवे",
      authoritySource: "सऊदी परिवहन प्राधिकरण और हज व उमराह मंत्रालय",
      faqs: [
        {
          question: "क्या ड्राइवर मीक़ात पर इंतज़ार करता है?",
          answer: "हाँ, मीक़ात क़रनुल मनाज़िल पर ड्राइवर का इंतज़ार सेवा में पूरी तरह शामिल है।",
        },
        {
          question: "तायफ से मक्का जाने में कितना समय लगता है?",
          answer: "85 किमी की दूरी लगभग 75 से 90 मिनट में तय होती है।",
        },
        {
          question: "भुगतान का क्या तरीका है?",
          answer: "मक्का पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान किया जाता है।",
        },
      ],
    },
  },
  'jeddah-to-taif': {
    ar: {
      seoTitle: "توصيل من مطار جدة (KAIA) إلى الطائف وجبال الهدا | ضيوف الرحمن VIP",
      seoDescription: "توصيل مباشر وسائق خاص VIP من صالات مطار الملك عبدالعزيز بجدة (KAIA) إلى مدينة الطائف وجبال الهدا. سيارات عائلية واسعة ودفع كاش عند الوصول.",
      h1: "توصيل مباشر وسائق VIP من مطار جدة (KAIA) إلى مدينة الطائف",
      subtitle: "رحلة سريعة ومريحة بسائق خاص من سواحل البحر الأحمر إلى قمم مرتفعات الطائف وجبال الهدا",
      overview: "خدمة استقبال وتنقل خاص ومباشر فور وصولك إلى صالات مطار الملك عبدالعزيز بجدة (KAIA) والانطلاق براحة تامة إلى مدينة الطائف ومنتجعات الهدا والشفا عبر طريق الحرمين وعقبة الهدا المجهزة.",
      inclusions: [
        "استقبال بالاسم داخل صالة الوصول بمطار جدة (KAIA) والمساعدة بالأمتعة",
        "توصيل مباشر إلى أي فندق أو منتجع في الطائف أو الهدا أو الشفا",
        "سيارات مكيفة حديثة تتسع للعائلات والحقائب الكبيرة",
        "شامل كافة رسوم الطرق والوقود وضريبة القيمة المضافة",
        "الدفع نقداً كاش (ريال سعودي أو دولار) للسائق عند الوصول للطائف",
      ],
      highwayNote: "طريق الحرمين السريع متصلاً بطريق عقبة الهدا (طريق 15)",
      authoritySource: "الهيئة العامة للنقل وهيئة الطيران المدني",
      faqs: [
        {
          question: "كم تستغرق المسافة من مطار جدة إلى الطائف؟",
          answer: "تبلغ المسافة حوالي 175 كم وتستغرق ساعتين تقريباً من القيادة المريحة والآمنة.",
        },
        {
          question: "أين يلتقي السائق بالمسافر في صالة المطار؟",
          answer: "ينتظركم السائق في صالة القدوم مباشرة حاملاً لوحة باسمكم الكريم بعد استلام الأمتعة.",
        },
        {
          question: "كيف يتم دفع الأجرة؟",
          answer: "الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول للطائف بدون دفع مسبق.",
        },
      ],
    },
    en: {
      seoTitle: "Jeddah Airport (KAIA) to Taif Mountain City VIP Transfer | Duyuf Alrahman VIP",
      seoDescription: "Direct private chauffeur from Jeddah Airport (KAIA) arrivals to Taif and Al Hada resorts. Spacious vehicles, meet & greet, cash payment upon arrival.",
      h1: "Jeddah Airport (KAIA) to Taif Mountain City VIP Transfer",
      subtitle: "Comfortable Express Chauffeur Transfer from the Red Sea to the Mountain Heights of Taif",
      overview: "Enjoy an effortless private chauffeur transfer directly upon landing at King Abdulaziz International Airport (KAIA) in Jeddah to your hotel or resort in Taif. Travel comfortably across Highway 40 and through the scenic mountain highway of Al Hada.",
      inclusions: [
        "Personal meet & greet in the KAIA arrival hall with luggage assistance",
        "Direct express transfer from Jeddah Airport to your Taif accommodation",
        "Spacious air-conditioned vehicles accommodating families and luggage",
        "All highway tolls, fuel, and taxes included in the guaranteed price",
        "Cash payment upon arrival in Taif (SAR or USD)",
      ],
      highwayNote: "Haramain Expressway connected to Route 15 (Al Hada)",
      authoritySource: "General Authority of Civil Aviation & Transport General Authority",
      faqs: [
        {
          question: "How long is the transfer from Jeddah Airport to Taif?",
          answer: "The 175 km transfer takes approximately 2 hours of smooth highway driving.",
        },
        {
          question: "Where will the chauffeur meet me at Jeddah Airport?",
          answer: "Your chauffeur awaits you in the arrival hall holding a personalized name sign immediately following baggage claim.",
        },
        {
          question: "What is the payment method?",
          answer: "Payment is cash only (SAR or USD) paid directly to the chauffeur upon arrival in Taif.",
        },
      ],
    },
    ms: {
      seoTitle: "Pengangkutan Lapangan Terbang Jeddah (KAIA) ke Taif | Duyuf Alrahman VIP",
      seoDescription: "Perkhidmatan kereta sewa peribadi terus dari Lapangan Terbang Jeddah (KAIA) ke bandar Taif dan Al Hada. Pemandu sambut di balai ketibaan, bayar tunai di Taif.",
      h1: "Pengangkutan VIP Lapangan Terbang Jeddah (KAIA) ke Bandar Taif",
      subtitle: "Perjalanan Ekspres yang Selesa dari Pesisir Laut Merah ke Puncak Pergunungan Taif yang Dingin",
      overview: "Perkhidmatan pengangkutan peribadi yang lancar sebaik sahaja anda mendarat di Lapangan Terbang King Abdulaziz Jeddah (KAIA) terus ke hotel atau resort anda di Taif tanpa perlu bertukar kenderaan.",
      inclusions: [
        "Sambutan peribadi di balai ketibaan KAIA beserta bantuan bagasi",
        "Penghantaran terus dari Lapangan Terbang Jeddah ke penginapan anda di Taif",
        "Kenderaan moden berhawa dingin selesa untuk keluarga dan beg koper",
        "Semua tol lebuh raya, minyak, dan cukai sudah termasuk dalam tambang tetap",
        "Bayaran tunai (SAR atau USD) kepada pemandu semasa tiba di Taif",
      ],
      highwayNote: "Lebuhraya Haramain bersambung ke Lebuhraya Al Hada (Laluan 15)",
      authoritySource: "Pihak Berkuasa Penerbangan Awam & Lembaga Pengangkutan",
      faqs: [
        {
          question: "Berapa lamakah perjalanan dari Lapangan Terbang Jeddah ke Taif?",
          answer: "Jarak 175 km mengambil masa sekitar 2 jam perjalanan lebuh raya yang lancar.",
        },
        {
          question: "Di manakah pemandu menunggu di lapangan terbang?",
          answer: "Pemandu akan menunggu di balai ketibaan dengan papan tanda nama anda selepas tuntutan bagasi.",
        },
        {
          question: "Bagaimana cara bayaran?",
          answer: "Bayaran adalah tunai (SAR atau USD) terus kepada pemandu apabila tiba di Taif.",
        },
      ],
    },
    id: {
      seoTitle: "Antar Jemput Bandara Jeddah (KAIA) ke Taif VIP | Duyuf Alrahman VIP",
      seoDescription: "Sewa mobil pribadi langsung dari Bandara King Abdulaziz Jeddah (KAIA) ke kota Taif dan pegunungan Al Hada. Dijemput di kedatangan, bayar tunai di Taif.",
      h1: "Antar Jemput Bandara Jeddah (KAIA) ke Kota Taif VIP",
      subtitle: "Perjalanan Cepat dan Nyaman dari Pesisir Laut Merah ke Puncak Pegunungan Taif yang Sejuk",
      overview: "Layanan penjemputan privat langsung begitu Anda mendarat di Bandara Internasional King Abdulaziz Jeddah (KAIA) menuju resort atau hotel Anda di Taif melalui jalan tol yang mulus dan pemandangan pegunungan yang indah.",
      inclusions: [
        "Penjemputan dengan papan nama di terminal kedatangan KAIA serta bantuan bagasi",
        "Pengantaran langsung dari Bandara Jeddah ke hotel atau resort di Taif",
        "Armada ber-AC dingin dan nyaman untuk keluarga besar dan koper",
        "Harga pasti sudah termasuk bensin, tol, dan pajak",
        "Pembayaran tunai (SAR atau USD) langsung ke supir saat tiba di Taif",
      ],
      highwayNote: "Jalan Tol Haramain terhubung dengan Jalur Pegunungan Al Hada",
      authoritySource: "Otoritas Penerbangan Sipil & Otoritas Transportasi",
      faqs: [
        {
          question: "Berapa lama perjalanan dari Bandara Jeddah ke Taif?",
          answer: "Jarak 175 km ditempuh dalam waktu sekitar 2 jam perjalanan jalan tol yang nyaman.",
        },
        {
          question: "Di mana supir menunggu di Bandara Jeddah?",
          answer: "Supir akan menunggu di lobi kedatangan memegang papan nama Anda setelah Anda mengambil koper.",
        },
        {
          question: "Bagaimana pembayarannya?",
          answer: "Pembayaran dilakukan secara tunai (SAR atau USD) kepada supir setelah sampai di Taif.",
        },
      ],
    },
    ur: {
      seoTitle: "جدہ ایئرپورٹ (KAIA) سے طائف کے لیے وی آئی پی ٹرانسفر | ضیوف الرحمن VIP",
      seoDescription: "شاہ عبدالعزیز ایئرپورٹ جدہ سے طائف اور الہدا کے لیے براہ راست پرائیویٹ کار سروس۔ ایئرپورٹ پر استقبال، کشادہ گاڑیاں اور پہنچنے پر کیش ادائیگی۔",
      h1: "جدہ ایئرپورٹ (KAIA) سے طائف سٹی وی آئی پی ٹرانسفر",
      subtitle: "بحیرہ احمر کے ساحل سے طائف کے ٹھنڈے پہاڑوں تک پرائیویٹ کار کے ذریعے پُرسکون اور آرام دہ سفر",
      overview: "جدہ ایئرپورٹ پر اترتے ہی طائف یا الہدا کے ہوٹل تک براہ راست اور پُرسکون سفر۔ ہمارا ڈرائیور آمد ہال میں آپ کے استقبال کے لیے موجود ہوگا اور الحرمین ایکسپریس وے کے ذریعے آپ کو بحفاظت طائف پہنچائے گا۔",
      inclusions: [
        "جدہ ایئرپورٹ کے آمد ہال میں نام کے بورڈ کے ساتھ استقبال اور سامان میں مدد",
        "جدہ ایئرپورٹ سے طائف کے کسی بھی ہوٹل تک براہ راست ڈراپ",
        "خاندان اور بڑے اٹیچیوں کے لیے کشادہ، ایئر کنڈیشنڈ گاڑیاں",
        "تمام پیٹرول، ٹول ٹیکس اور ویٹ شامل، کوئی اضافی چارج نہیں",
        "طائف پہنچنے پر ڈرائیور کو نقد (سعودی ریال یا امریکی ڈالر) ادائیگی",
      ],
      highwayNote: "طریق الحرمین ایکسپریس وے متصل بہ طریق عقبۃ الہدا",
      authoritySource: "جنرل اتھارٹی آف سول ایوی ایشن اور ٹرانسپورٹ اتھارٹی",
      faqs: [
        {
          question: "جدہ ایئرپورٹ سے طائف کا کتنا وقت لگتا ہے؟",
          answer: "175 کلومیٹر کا فاصلہ تقریباً 2 گھنٹے میں طے ہوتا ہے۔",
        },
        {
          question: "ڈرائیور ایئرپورٹ پر کہاں ملے گا؟",
          answer: "ڈرائیور کسٹم اور بیگیج کلیئرنس کے فوراً بعد آمد ہال میں آپ کے نام کی تختی کے ساتھ موجود ہوگا۔",
        },
        {
          question: "کرایہ کیسے ادا کیا جاتا ہے؟",
          answer: "طائف پہنچ کر ڈرائیور کو نقد (ریال یا ڈالر) ادا کیا جاتا ہے۔",
        },
      ],
    },
    fr: {
      seoTitle: "Transfert Aéroport de Djeddah (KAIA) vers Taïf VIP | Duyuf Alrahman VIP",
      seoDescription: "Chauffeur privé direct de l'Aéroport de Djeddah (KAIA) vers Taïf et les montagnes d'Al Hada. Accueil personnalisé, paiement en espèces à l'arrivée.",
      h1: "Transfert Aéroport de Djeddah (KAIA) vers Taïf",
      subtitle: "Transfert Express Confortable depuis la Mer Rouge jusqu'aux Hauteurs Fraîches de Taïf",
      overview: "Profitez d'un accueil VIP dès votre arrivée à l'Aéroport International Roi Abdelaziz (KAIA) de Djeddah pour un trajet direct et relaxant vers vos hôtels et resorts à Taïf via l'autoroute d'Al Hada.",
      inclusions: [
        "Accueil personnalisé avec pancarte nominative au hall des arrivées de KAIA",
        "Trajet direct de l'aéroport de Djeddah à votre hébergement à Taïf",
        "Véhicules climatisés spacieux pour familles et grands bagages",
        "Péages, carburant et taxes inclus dans le tarif fixe garanti",
        "Paiement en espèces (SAR ou USD) auprès du chauffeur à Taïf",
      ],
      highwayNote: "Autoroute Haramain reliée à la Route 15 (Al Hada)",
      authoritySource: "Autorité Générale de l'Aviation Civile & des Transports",
      faqs: [
        {
          question: "Combien de temps dure le trajet Aéroport de Djeddah - Taïf ?",
          answer: "Le trajet de 175 km dure environ 2 heures sur autoroute moderne.",
        },
        {
          question: "Où le chauffeur m'attend-il à l'aéroport ?",
          answer: "Le chauffeur vous attend dans le hall des arrivées avec une pancarte à votre nom après la récupération des bagages.",
        },
        {
          question: "Comment régler la course ?",
          answer: "Le paiement est effectué en espèces (SAR ou USD) au chauffeur à Taïf.",
        },
      ],
    },
    es: {
      seoTitle: "Traslado Aeropuerto de Yeda (KAIA) a Taif VIP | Duyuf Alrahman VIP",
      seoDescription: "Chófer privado directo del Aeropuerto de Yeda (KAIA) a Taif y montañas de Al Hada. Recibimiento con cartel nominativo y pago en efectivo al llegar.",
      h1: "Traslado Aeropuerto de Yeda (KAIA) a la Ciudad de Taif",
      subtitle: "Traslado Exprés Cómodo desde la Costa del Mar Rojo a las Cumbres Frescas de Taif",
      overview: "Servicio exclusivo de chófer privado al aterrizar en el Aeropuerto Internacional Rey Abdulaziz (KAIA) de Yeda con destino directo a su hotel o resort en Taif.",
      inclusions: [
        "Recibimiento con cartel con su nombre en la terminal de llegadas de KAIA",
        "Traslado directo del aeropuerto de Yeda a su alojamiento en Taif",
        "Vehículo con aire acondicionado y gran capacidad de equipaje",
        "Todos los peajes, gasolina e impuestos incluidos en la tarifa",
        "Pago en efectivo (SAR o USD) al conductor al llegar a Taif",
      ],
      highwayNote: "Autopista Haramain conectada con la Ruta 15 (Al Hada)",
      authoritySource: "Autoridad de Aviación Civil y de Transporte",
      faqs: [
        {
          question: "¿Cuánto dura el traslado de Yeda a Taif?",
          answer: "El trayecto de 175 km toma unas 2 horas de conducción cómoda.",
        },
        {
          question: "¿Dónde me espera el conductor en el aeropuerto?",
          answer: "En la sala de llegadas sosteniendo un cartel con su nombre tras la recogida de maletas.",
        },
        {
          question: "¿Cómo se abona el viaje?",
          answer: "En efectivo (SAR o USD) al chófer al llegar a Taif.",
        },
      ],
    },
    de: {
      seoTitle: "Transfer Flughafen Dschidda (KAIA) nach Taif VIP | Duyuf Alrahman VIP",
      seoDescription: "Direkter Chauffeur-Transfer vom Flughafen Dschidda (KAIA) nach Taif und Al Hada. Empfang mit Namensschild, Barzahlung bei Ankunft in Taif.",
      h1: "Transfer Flughafen Dschidda (KAIA) nach Taif",
      subtitle: "Komfortabler Express-Transfer vom Roten Meer in das kühle Bergklima von Taif",
      overview: "Genießen Sie einen direkten und bequemen Transfer nach der Landung am King Abdulaziz International Airport (KAIA) in Dschidda direkt zu Ihrem Hotel in Taif.",
      inclusions: [
        "Persönlicher Empfang mit Namensschild in der Ankunftshalle von KAIA",
        "Direkter Transfer vom Flughafen Dschidda nach Taif",
        "Moderne klimatisierte Fahrzeuge für die ganze Familie und großes Gepäck",
        "Mautgebühren, Benzin und Steuern im garantierten Festpreis inbegriffen",
        "Barzahlung (SAR oder USD) beim Fahrer bei Ankunft in Taif",
      ],
      highwayNote: "Haramain Expressway verbunden mit der Al Hada Route 15",
      authoritySource: "Zivilluftfahrtbehörde & Verkehrsministerium",
      faqs: [
        {
          question: "Wie lange dauert die Fahrt vom Flughafen Dschidda nach Taif?",
          answer: "Die 175 km lange Strecke dauert etwa 2 Stunden auf gut ausgebauten Straßen.",
        },
        {
          question: "Wo wartet der Chauffeur am Flughafen?",
          answer: "In der Ankunftshalle direkt hinter der Gepäckausgabe mit Ihrem Namensschild.",
        },
        {
          question: "Wie wird bezahlt?",
          answer: "Barzahlung (SAR oder USD) beim Fahrer bei Ankunft in Taif.",
        },
      ],
    },
    tr: {
      seoTitle: "Cidde Havalimanı (KAIA) - Taif VIP Transfer | Duyuf Alrahman VIP",
      seoDescription: "Cidde Havalimanı (KAIA) varış terminallerinden Taif ve El Heda yaylalarına doğrudan özel VIP transfer. İsimle karşılama, varışta nakit ödeme.",
      h1: "Cidde Havalimanı (KAIA) - Taif Şehri Özel VIP Transfer",
      subtitle: "Kızıldeniz Kıyısından Taif'in Serin Zirvelerine Hızlı ve Konforlu Özel Şoför Hizmeti",
      overview: "Cidde Kral Abdülaziz Uluslararası Havalimanı'na (KAIA) inişinizin ardından Taif veya El Heda'daki otelinize aktarmasız ve konforlu bir yolculuk.",
      inclusions: [
        "KAIA gelen yolcu salonunda isim tabelasıyla özel karşılama ve bagaj yardımı",
        "Cidde Havalimanı'ndan Taif'teki otelinize doğrudan ulaşım",
        "Klimalı ve geniş aile araçları",
        "Tüm otoyol ücretleri, yakıt ve vergiler fiyata dahildir",
        "Taif'e varışta şoföre nakit (SAR veya USD) elden ödeme",
      ],
      highwayNote: "Haremeyn Otoyolu ve El Heda Dağ Yolu (15 Nolu Güzergah)",
      authoritySource: "Sivil Havacılık Genel Otoritesi & Ulaştırma İdaresi",
      faqs: [
        {
          question: "Cidde Havalimanı - Taif arası ne kadar sürer?",
          answer: "175 km mesafe otoyol üzerinden yaklaşık 2 saat sürmektedir.",
        },
        {
          question: "Şoför beni havalimanında nerede karşılayacak?",
          answer: "Bagaj alımının ardından gelen yolcu çıkış kapısında isminizin yazılı olduğu tabela ile karşılar.",
        },
        {
          question: "Ödeme nasıl yapılır?",
          answer: "Taif'e vardığınızda şoföre nakit (SAR veya USD) olarak elden ödenir.",
        },
      ],
    },
    hi: {
      seoTitle: "जेद्दा एयरपोर्ट (KAIA) से तायफ वीआईपी ट्रांसफर | Duyuf Alrahman VIP",
      seoDescription: "किंग अब्दुलअज़ीज़ एयरपोर्ट जेद्दा (KAIA) से तायफ और अल हदा के लिए डायरेक्ट प्राइवेट कार सर्विस। एयरपोर्ट पर स्वागत, पहुंचने पर नकद भुगतान।",
      h1: "जेद्दा एयरपोर्ट (KAIA) से तायफ शहर वीआईपी ट्रांसफर",
      subtitle: "लाल सागर के तट से तायफ की ठंडी वादियों तक आरामदायक और तेज प्राइवेट कार यात्रा",
      overview: "जेद्दा एयरपोर्ट (KAIA) पर उतरते ही तायफ में अपने होटल या रिसॉर्ट तक सीधे बिना किसी परेशानी के सुरक्षित और आरामदायक यात्रा।",
      inclusions: [
        "जेद्दा एयरपोर्ट अराइवल हॉल में नेम प्लेट के साथ व्यक्तिगत स्वागत",
        "एयरपोर्ट से सीधे तायफ में आपके गंतव्य तक ड्रॉप",
        "परिवार और भारी सामान के लिए बड़ी वातानुकूलित गाड़ियां",
        "सभी टोल, पेट्रोल और टैक्स तय किराए में शामिल",
        "तायफ पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान",
      ],
      highwayNote: "हरमैन एक्सप्रेसवे और अल हदा हाईवे (रूट 15)",
      authoritySource: "सऊदी नागरिक उड्डयन प्राधिकरण और परिवहन मंत्रालय",
      faqs: [
        {
          question: "जेद्दा एयरपोर्ट से तायफ जाने में कितना समय लगता है?",
          answer: "175 किमी की दूरी लगभग 2 घंटे में तय होती है।",
        },
        {
          question: "ड्राइवर एयरपोर्ट पर कहाँ मिलेगा?",
          answer: "ड्राइवर अराइवल हॉल में आपके नाम के बोर्ड के साथ इंतज़ार करेगा।",
        },
        {
          question: "किराया कैसे चुकाया जाता है?",
          answer: "तायफ पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान किया जाता है।",
        },
      ],
    },
  },
  'riyadh-airport-transfer': {
    ar: {
      seoTitle: "توصيل من مطار الملك خالد بالرياض (RUH) إلى الفنادق | ضيوف الرحمن VIP",
      seoDescription: "خدمة سائق VIP واستقبال من مطار الملك خالد الدولي بالرياض (RUH) إلى كافة فنادق وأحياء الرياض. سيارات تنفيذية ودفع كاش عند الوصول.",
      h1: "خدمة سائق VIP وتوصيل من مطار الملك خالد الدولي (RUH) بالرياض",
      subtitle: "خدمة استقبال وتنقلات تنفيذية فاخرة لرجال الأعمال وكبار الشخصيات والعائلات في الرياض",
      overview: "خدمة ليموزين وسائق خاص تنفيذي في العاصمة الرياض. نستقبلكم في صالات مطار الملك خالد الدولي (RUH) فور وصولكم مع متابعة مواعيد الرحلات والتوصيل إلى فنادق الأعمال والقصور والأحياء الراقية.",
      inclusions: [
        "استقبال بالاسم داخل صالات القدوم بمطار الملك خالد (صالات 1، 2، 3، 4، 5)",
        "توصيل تنفيذي راقٍ ومباشر إلى كافة أحياء وفنادق العاصمة الرياض",
        "سيارات دفع رباعي وسيارات سيدان تنفيذية معقمة وفائقة العزل الصوتي",
        "شامل رسوم مواقف المطار والوقود وضريبة القيمة المضافة",
        "الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول للوجهة",
      ],
      highwayNote: "طريق المطار وطريق الملك سلمان بن عبدالعزيز والطريق الدائري الشمالي",
      authoritySource: "الهيئة العامة للطيران المدني وهيئة النقل",
      faqs: [
        {
          question: "كيف يتعامل السائق مع تأخر الرحلات في مطار الرياض؟",
          answer: "نقوم بمتابعة رحلتكم إلكترونياً وتعديل موعد وصول السائق تلقائياً بدون أي تكلفة إضافية.",
        },
        {
          question: "ما هي صالات المطار المشمولة بالخدمة؟",
          answer: "نخدم كافة صالات مطار الملك خالد الدولي بما فيها صالة 1 و2 و3 و4 و5 والصالة التنفيذية.",
        },
        {
          question: "كيف يتم دفع الأجرة؟",
          answer: "الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق فور الوصول لوجهتكم بالرياض.",
        },
      ],
    },
    en: {
      seoTitle: "Riyadh Airport (RUH) Chauffeur Transfer to Hotels | Duyuf Alrahman VIP",
      seoDescription: "Executive private chauffeur from King Khalid International Airport (RUH) to Riyadh hotels and business districts. Luxury fleet, meet & greet, cash payment.",
      h1: "King Khalid International Airport (RUH) to Riyadh Hotels VIP Chauffeur",
      subtitle: "Punctual Executive Chauffeur Service for Business Travelers, VIP Guests, and Families in Riyadh",
      overview: "Experience high-end executive chauffeur service upon arriving in Saudi Arabia's capital. Our certified chauffeurs track your flight in real time and greet you inside RUH terminals before providing seamless transit to your hotel or corporate office.",
      inclusions: [
        "Personal meet & greet in RUH arrival halls across Terminals 1, 2, 3, 4, and 5",
        "Direct executive chauffeur transit to any hotel or district in Riyadh",
        "Acoustically insulated luxury SUVs and executive sedans",
        "All airport parking fees, fuel, and taxes included in fixed fare",
        "Cash payment upon arrival at your Riyadh destination (SAR or USD)",
      ],
      highwayNote: "Airport Road, King Salman Road & Northern Ring Expressway",
      authoritySource: "General Authority of Civil Aviation (GACA) & Transport Authority",
      faqs: [
        {
          question: "What happens if my flight to Riyadh is delayed?",
          answer: "We monitor your flight status in real time and automatically adjust chauffeur dispatch with zero waiting penalty.",
        },
        {
          question: "Which RUH airport terminals do you cover?",
          answer: "We cover all terminals at King Khalid International Airport, including Terminals 1, 2, 3, 4, 5, and private executive terminals.",
        },
        {
          question: "What is the payment method?",
          answer: "Payment is cash only (SAR or USD) paid directly to the chauffeur upon arrival in Riyadh.",
        },
      ],
    },
    ms: {
      seoTitle: "Pengangkutan Lapangan Terbang Riyadh (RUH) ke Hotel VIP | Duyuf Alrahman VIP",
      seoDescription: "Pemandu peribadi eksekutif dari Lapangan Terbang Antarabangsa King Khalid (RUH) ke hotel Riyadh. Sambutan nama di balai ketibaan, bayar tunai.",
      h1: "Pengangkutan VIP Lapangan Terbang Riyadh (RUH) ke Hotel Riyadh",
      subtitle: "Perkhidmatan Pemandu Eksekutif Tepat Masa untuk Pelancong Perniagaan dan Keluarga di Riyadh",
      overview: "Perkhidmatan pemandu peribadi VIP di ibu negara Riyadh. Kami menyambut anda di balai ketibaan Lapangan Terbang King Khalid (RUH) dan membawa anda ke hotel atau pusat perniagaan dengan selesa.",
      inclusions: [
        "Sambutan peribadi dengan papan nama di balai ketibaan Terminal 1, 2, 3, 4, dan 5",
        "Penghantaran eksekutif terus ke hotel atau mana-mana destinasi di Riyadh",
        "Kenderaan mewah berhawa dingin sepenuhnya dengan ruang bagasi luas",
        "Semua bayaran parkir lapangan terbang, minyak, dan cukai sudah termasuk",
        "Bayaran tunai (SAR atau USD) kepada pemandu semasa tiba di destinasi",
      ],
      highwayNote: "Jalan Lapangan Terbang & Lebuhraya Lingkaran Utara Riyadh",
      authoritySource: "Pihak Berkuasa Penerbangan Awam (GACA)",
      faqs: [
        {
          question: "Bagaimana jika penerbangan saya ke Riyadh lewat?",
          answer: "Kami memantau status penerbangan anda secara langsung dan menyesuaikan waktu ketibaan pemandu secara automatik.",
        },
        {
          question: "Terminal mana yang diliputi di Lapangan Terbang Riyadh?",
          answer: "Kami meliputi semua terminal di Lapangan Terbang Antarabangsa King Khalid (Terminal 1 hingga 5).",
        },
        {
          question: "Bagaimanakah pembayaran dibuat?",
          answer: "Bayaran tunai (SAR atau USD) diberikan terus kepada pemandu semasa tiba di hotel anda di Riyadh.",
        },
      ],
    },
    id: {
      seoTitle: "Antar Jemput Bandara Riyadh (RUH) ke Hotel VIP | Duyuf Alrahman VIP",
      seoDescription: "Layanan supir eksekutif dari Bandara Internasional King Khalid (RUH) ke hotel dan pusat bisnis Riyadh. Dijemput dengan papan nama, bayar tunai di tujuan.",
      h1: "Antar Jemput Bandara Riyadh (RUH) ke Hotel Riyadh VIP",
      subtitle: "Layanan Supir Eksekutif Tepat Waktu untuk Pebisnis, Tamu VIP, dan Keluarga di Riyadh",
      overview: "Nikmati layanan transportasi eksekutif di ibu kota Riyadh. Supir kami siap menyambut Anda di terminal kedatangan Bandara King Khalid (RUH) dan mengantar Anda ke hotel atau kantor dengan kendaraan mewah dan nyaman.",
      inclusions: [
        "Penjemputan dengan papan nama di terminal kedatangan 1, 2, 3, 4, dan 5 RUH",
        "Pengantaran langsung ke hotel atau seluruh kawasan kota Riyadh",
        "Armada SUV dan sedan mewah ber-AC dingin dan kedap suara",
        "Sudah termasuk biaya parkir bandara, bensin, dan pajak",
        "Pembayaran tunai (SAR atau USD) langsung ke supir saat tiba di tujuan",
      ],
      highwayNote: "Jalan Bandara & Jalan Tol Lingkar Utara Riyadh",
      authoritySource: "Otoritas Penerbangan Sipil (GACA) & Otoritas Transportasi",
      faqs: [
        {
          question: "Bagaimana jika pesawat saya ke Riyadh mengalami keterlambatan?",
          answer: "Kami memantau jadwal pesawat Anda secara langsung sehingga supir akan menyesuaikan waktu penjemputan tanpa biaya tambahan.",
        },
        {
          question: "Terminal mana saja yang dilayani di Bandara Riyadh?",
          answer: "Kami melayani seluruh terminal di Bandara King Khalid (Terminal 1, 2, 3, 4, dan 5).",
        },
        {
          question: "Bagaimana pembayarannya?",
          answer: "Pembayaran dilakukan tunai (SAR atau USD) kepada supir setelah sampai di tempat tujuan Anda di Riyadh.",
        },
      ],
    },
    ur: {
      seoTitle: "ریاض ایئرپورٹ (RUH) سے ہوٹلوں کے لیے وی آئی پی ٹرانسفر | ضیوف الرحمن VIP",
      seoDescription: "شاہ خالد انٹرنیشنل ایئرپورٹ ریاض سے ہوٹلوں اور کاروباری مراکز کے لیے ایگزیکٹو کار سروس۔ نام کے بورڈ کے ساتھ استقبال، کیش ادائیگی۔",
      h1: "کنگ خالد انٹرنیشنل ایئرپورٹ (RUH) سے ریاض ہوٹل وی آئی پی ٹرانسفر",
      subtitle: "کاروباری شخصیات، سفارتکاروں اور فیملیز کے لیے دارالحکومت ریاض میں بروقت اور باوقار کار سروس",
      overview: "سعودی عرب کے دارالحکومت ریاض میں ایگزیکٹو کار سروس۔ شاہ خالد ایئرپورٹ (RUH) پر آپ کے اترتے ہی ہمارا ڈرائیور فلائٹ ٹریکنگ کے ساتھ آمد ہال میں موجود ہوگا اور آپ کو پرسکون طریقے سے ہوٹل یا دفتر پہنچائے گا۔",
      inclusions: [
        "کنگ خالد ایئرپورٹ کے تمام ٹرمینلز (1 تا 5) میں نام کی تختی کے ساتھ استقبال",
        "ریاض کے تمام ہوٹلوں اور تجارتی مراکز تک براہ راست اور محفوظ سفر",
        "جدید ترین پرتعیش اور خاموش لگژری گاڑیاں",
        "تمام پارکنگ فیس، پیٹرول اور ویٹ فکسڈ کرائے میں شامل",
        "ریاض میں منزل پر پہنچ کر ڈرائیور کو نقد (سعودی ریال یا ڈالر) ادائیگی",
      ],
      highwayNote: "ایئرپورٹ روڈ، کنگ سلمان روڈ اور ناردرن رنگ روڈ",
      authoritySource: "جنرل اتھارٹی آف سول ایوی ایشن (GACA)",
      faqs: [
        {
          question: "اگر فلائٹ تاخیر کا شکار ہو جائے تو کیا ہوتا ہے؟",
          answer: "ہم آپ کی فلائٹ کا لائیو اسٹیٹس چیک کرتے ہیں اور بغیر کسی اضافی چارج کے ڈرائیور کے وقت کو ایڈجسٹ کرتے ہیں۔",
        },
        {
          question: "ریاض ایئرپورٹ کے کون سے ٹرمینلز شامل ہیں؟",
          answer: "کنگ خالد ایئرپورٹ کے تمام ٹرمینلز (1، 2، 3، 4 اور 5) کور کیے جاتے ہیں۔",
        },
        {
          question: "ادائیگی کا طریقہ کار کیا ہے؟",
          answer: "ریاض میں اپنے ہوٹل پہنچ کر ڈرائیور کو نقد (ریال یا ڈالر) ادا کیا جاتا ہے۔",
        },
      ],
    },
    fr: {
      seoTitle: "Transfert Aéroport de Riyad (RUH) vers Hôtels VIP | Duyuf Alrahman VIP",
      seoDescription: "Chauffeur privé exécutif depuis l'Aéroport International Roi Khaled (RUH) vers les hôtels de Riyad. Accueil nominatif, paiement en espèces à l'arrivée.",
      h1: "Transfert Aéroport de Riyad (RUH) vers Hôtels de Riyad",
      subtitle: "Service Chauffeur Exécutif Ponctuel pour Voyageurs d'Affaires et Familles à Riyad",
      overview: "Bénéficiez d'un accueil d'excellence dans la capitale saoudienne. Nos chauffeurs professionnels suivent l'horaire réel de votre vol et vous accueillent à l'Aéroport Roi Khaled (RUH) pour un trajet rapide et confortable vers vos hôtels ou bureaux.",
      inclusions: [
        "Accueil nominatif avec pancarte aux Terminaux 1, 2, 3, 4 et 5 de RUH",
        "Trajet exécutif direct vers tous les quartiers et hôtels de Riyad",
        "Véhicules haut de gamme climatisés et insonorisés",
        "Frais de parking aéroportuaire, carburant et taxes inclus",
        "Paiement en espèces (SAR ou USD) auprès du chauffeur à Riyad",
      ],
      highwayNote: "Route de l'Aéroport, Boulevard Roi Salman & Rocade Nord",
      authoritySource: "Autorité Générale de l'Aviation Civile (GACA)",
      faqs: [
        {
          question: "Que se passe-t-il en cas de retard de vol ?",
          answer: "Nous suivons votre vol en temps réel et ajustons l'arrivée du chauffeur sans frais d'attente supplémentaires.",
        },
        {
          question: "Quels terminaux sont desservis à l'Aéroport de Riyad ?",
          answer: "Tous les terminaux de l'Aéroport Roi Khaled (Terminaux 1 à 5).",
        },
        {
          question: "Comment régler le trajet ?",
          answer: "Le paiement se fait en espèces (SAR ou USD) au chauffeur à l'arrivée.",
        },
      ],
    },
    es: {
      seoTitle: "Traslado Aeropuerto de Riad (RUH) a Hoteles VIP | Duyuf Alrahman VIP",
      seoDescription: "Chófer ejecutivo privado desde el Aeropuerto Internacional Rey Khalid (RUH) a hoteles de Riad. Recibimiento en llegadas y pago en efectivo al llegar.",
      h1: "Traslado Aeropuerto de Riad (RUH) a Hoteles de Riad",
      subtitle: "Servicio de Chófer Ejecutivo Puntual para Viajeros de Negocios y Familias en Riad",
      overview: "Servicio premium de chófer privado en la capital Riad. Seguimiento de vuelos en tiempo real y recibimiento en las terminales del Aeropuerto Rey Khalid (RUH) para un traslado directo y confortable a su hotel.",
      inclusions: [
        "Recibimiento con cartel con su nombre en las Terminales 1, 2, 3, 4 y 5 de RUH",
        "Traslado ejecutivo directo a cualquier hotel o distrito de Riad",
        "Vehículos premium con aislamiento acústico y aire acondicionado",
        "Tarifas fijas con parking del aeropuerto, combustible e impuestos incluidos",
        "Pago en efectivo (SAR o USD) al conductor al llegar a su destino",
      ],
      highwayNote: "Carretera del Aeropuerto y Autopista del Anillo Norte",
      authoritySource: "Autoridad General de Aviación Civil (GACA)",
      faqs: [
        {
          question: "¿Qué ocurre si se retrasa mi vuelo a Riad?",
          answer: "Monitoreamos el vuelo en tiempo real y adaptamos la llegada del conductor sin costes extra.",
        },
        {
          question: "¿Qué terminales cubren en el Aeropuerto de Riad?",
          answer: "Cubrimos todas las terminales de RUH (Terminales 1, 2, 3, 4 y 5).",
        },
        {
          question: "¿Cómo se abona el servicio?",
          answer: "En efectivo (SAR o USD) directamente al chófer en Riad.",
        },
      ],
    },
    de: {
      seoTitle: "Transfer Flughafen Riad (RUH) zu Hotels VIP | Duyuf Alrahman VIP",
      seoDescription: "Exklusiver Chauffeurservice vom King Khalid International Airport (RUH) zu Hotels in Riad. Flugüberwachung, Namensschild, Barzahlung vor Ort.",
      h1: "Transfer Flughafen Riad (RUH) zu Hotels in Riad",
      subtitle: "Pünktlicher Chauffeurservice für Geschäftsreisende, VIPs und Familien in Riad",
      overview: "Erstklassiger Chauffeurservice in der saudi-arabischen Hauptstadt. Wir empfangen Sie nach der Landung am King Khalid International Airport (RUH) und bringen Sie zügig und entspannt zu Ihrem Hotel oder Firmenstandort.",
      inclusions: [
        "Persönlicher Empfang mit Namensschild in den Terminals 1, 2, 3, 4 und 5",
        "Direkter Transfer zu allen Hotels und Geschäftsvierteln in Riad",
        "Hochwertige schallisolierte Limousinen und SUVs",
        "Alle Parkgebühren, Treibstoff und Steuern im Festpreis enthalten",
        "Barzahlung (SAR oder USD) beim Fahrer bei Ankunft in Riad",
      ],
      highwayNote: "Airport Road, King Salman Road & Nördliche Ringautobahn",
      authoritySource: "Zivilluftfahrtbehörde GACA & Verkehrsministerium",
      faqs: [
        {
          question: "Was passiert bei Flugverspätungen?",
          answer: "Wir verfolgen Ihren Flugstatus in Echtzeit und passen die Abholzeit ohne Aufpreis automatisch an.",
        },
        {
          question: "Welche Terminals werden am Flughafen Riad bedient?",
          answer: "Wir bedienen alle Terminals am King Khalid International Airport (Terminals 1 bis 5).",
        },
        {
          question: "Wie wird bezahlt?",
          answer: "Barzahlung (SAR oder USD) direkt beim Fahrer bei Ankunft in Riad.",
        },
      ],
    },
    tr: {
      seoTitle: "Riyad Havalimanı (RUH) - Oteller VIP Transfer | Duyuf Alrahman VIP",
      seoDescription: "Kral Halid Uluslararası Havalimanı'ndan (RUH) Riyad otellerine ve iş merkezlerine özel VIP transfer. İsimle karşılama, varışta nakit ödeme.",
      h1: "Kral Halid Havalimanı (RUH) - Riyad Otelleri Özel VIP Transfer",
      subtitle: "İş İnsanları, VIP Misafirler ve Aileler İçin Riyad'da Dakik ve Güvenli Şoför Hizmeti",
      overview: "Suudi Arabistan'ın başkenti Riyad'da üst düzey VIP transfer hizmeti. Uçuşunuzu anlık olarak takip ediyor, Kral Halid Havalimanı (RUH) gelen yolcu salonunda sizi karşılayarak otelinize konforla ulaştırıyoruz.",
      inclusions: [
        "Kral Halid Havalimanı 1, 2, 3, 4 ve 5 terminallerinde isim tabelasıyla karşılama",
        "Riyad'ın tüm bölgelerine ve otellerine doğrudan VIP ulaşım",
        "Yüksek ses yalıtımlı ve klimalı lüks SUV ve sedan araçlar",
        "Havalimanı otopark ücretleri, benzin ve vergiler fiyata dahildir",
        "Riyad'da varış noktanıza ulaştığınızda şoföre nakit (SAR veya USD) elden ödeme",
      ],
      highwayNote: "Havalimanı Yolu ve Riyad Kuzey Çevre Otoyolu",
      authoritySource: "Suudi Sivil Havacılık Genel Otoritesi (GACA)",
      faqs: [
        {
          question: "Uçağım rötarlı gelirse ne olur?",
          answer: "Uçuşunuzu canlı sistem üzerinden takip ederiz ve şoförünüzün karşılama saatini ücretsiz olarak güncelleriz.",
        },
        {
          question: "Hangi terminallerde karşılama yapılıyor?",
          answer: "Kral Halid Uluslararası Havalimanı'nın tüm terminallerinde (Terminal 1 - 5) hizmet vermekteyiz.",
        },
        {
          question: "Ödeme nasıl yapılır?",
          answer: "Riyad'daki otelinize veya gideceğiniz yere vardığınızda şoföre nakit (SAR veya USD) ödenir.",
        },
      ],
    },
    hi: {
      seoTitle: "रियाद एयरपोर्ट (RUH) से होटल वीआईपी ट्रांसफर | Duyuf Alrahman VIP",
      seoDescription: "किंग खालिद इंटरनेशनल एयरपोर्ट (RUH) से रियाद के होटलों के लिए एग्जीक्यूटिव प्राइवेट कार सर्विस। नेम प्लेट से स्वागत, पहुंचने पर नकद भुगतान।",
      h1: "किंग खालिद एयरपोर्ट (RUH) से रियाद होटल वीआईपी ट्रांसफर",
      subtitle: "व्यापारियों, वीआईपी मेहमानों और परिवारों के लिए रियाद में समय पर शानदार कार सेवा",
      overview: "सऊदी अरब की राजधानी रियाद में लग्जरी कार सेवा। किंग खालिद इंटरनेशनल एयरपोर्ट (RUH) पर उतरते ही हमारा ड्राइवर फ्लाइट की लाइव ट्रैकिंग के साथ अराइवल हॉल में आपका स्वागत करेगा।",
      inclusions: [
        "किंग खालिद एयरपोर्ट के टर्मिनल 1, 2, 3, 4 और 5 में नेम बोर्ड के साथ स्वागत",
        "रियाद के सभी होटलों और कॉरपोरेट ऑफिसों तक सीधे ड्रॉप",
        "आरामदायक, वातानुकूलित और शांत लग्जरी गाड़ियां",
        "एयरपोर्ट पार्किंग फीस, पेट्रोल और टैक्स फिक्स किराए में शामिल",
        "रियाद पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान",
      ],
      highwayNote: "एयरपोर्ट रोड और नॉर्दर्न रिंग रोड रियाद",
      authoritySource: "सऊदी नागरिक उड्डयन प्राधिकरण (GACA)",
      faqs: [
        {
          question: "अगर रियाद की फ्लाइट लेट हो जाए तो क्या होगा?",
          answer: "हम आपकी फ्लाइट का लाइव स्टेटस ट्रैक करते हैं और बिना किसी अतिरिक्त शुल्क के पिकअप का समय बदल देते हैं।",
        },
        {
          question: "रियाद एयरपोर्ट के कौन से टर्मिनल शामिल हैं?",
          answer: "हम किंग खालिद एयरपोर्ट के सभी टर्मिनलों (टर्मिनल 1 से 5) को कवर करते हैं।",
        },
        {
          question: "किराया कैसे चुकाया जाता है?",
          answer: "रियाद में अपने गंतव्य पर पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान किया जाता है।",
        },
      ],
    },
  },
  'riyadh-to-makkah': {
    ar: {
      seoTitle: "توصيل وسائق خاص VIP من الرياض إلى مكة المكرمة | ضيوف الرحمن VIP",
      seoDescription: "رحلة برية فاخرة وخاصة بالكامل من الرياض إلى مكة المكرمة عبر طريق مكة السريع (طريق 40). سيارات عائلية مريحة ودفع كاش عند الوصول.",
      h1: "خدمة نقل وسائق VIP لمسافات طويلة من الرياض إلى مكة المكرمة",
      subtitle: "رحلة برية فاخرة وخاصة بالكامل من باب منزلك بالرياض إلى باب فندقك بمكة المكرمة عبر طريق 40",
      overview: "رحلة سفر برية مريحة ومميزة من العاصمة الرياض مباشرة إلى الحرم المكي الشريف بمكة المكرمة. نوفر أحدث مركبات الدفع الرباعي والفانات الفاخرة العازلة للصوت مع سائقين محترفين للتنقل الطويل مع التوقف في أفضل الاستراحات وميقات السيل الكبير للإحرام.",
      inclusions: [
        "انتقال بري خاص بالكامل من باب منزلك بالرياض إلى فندقك بمكة",
        "توقف مريح للإحرام في ميقات قرن المنازل (السيل الكبير) للمعتمرين",
        "سيارات دفع رباعي وفانات حديثة مجهزة ومكيفة بالكامل للسفر الطويل",
        "شامل كافة رسوم الطرق السريعة والوقود والضرائب",
        "الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول لمكة",
      ],
      highwayNote: "طريق الرياض - الطائف - مكة السريع (طريق 40)",
      authoritySource: "الهيئة العامة للنقل ووزارة الحج والعمرة",
      faqs: [
        {
          question: "كم تستغرق المسافة من الرياض إلى مكة المكرمة بالسيارة؟",
          answer: "تبلغ المسافة حوالي 870 كم وتستغرق بين 8 إلى 9 ساعات قيادة مريحة وآمنة مع التوقفات.",
        },
        {
          question: "هل يتوقف السائق في استراحات للصلاة وتناول الطعام؟",
          answer: "نعم، يتوقف السائق في استراحات ومحطات خدمة راقية ونظيفة على طريق 40 السريع للصلاة والراحة.",
        },
        {
          question: "كيف يتم دفع قيمة الرحلة؟",
          answer: "الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول إلى مكة المكرمة.",
        },
      ],
    },
    en: {
      seoTitle: "Riyadh to Makkah Long-Distance VIP Highway Chauffeur | Duyuf Alrahman VIP",
      seoDescription: "Direct private chauffeur from Riyadh to Makkah hotels via Route 40. Luxury long-distance travel, Miqat stop for Umrah, cash payment upon arrival.",
      h1: "Riyadh to Makkah Long-Distance VIP Highway Chauffeur",
      subtitle: "Door-to-Door Private Chauffeur Across Route 40 for High-End Travelers, Diplomats & VIP Families",
      overview: "Experience premier cross-kingdom chauffeur travel from Riyadh directly to holy Makkah. Travel along Highway 40 in luxury SUVs or executive family vans equipped with acoustic insulation and spacious seating, with pre-planned stops for prayers and Umrah Ihram at Miqat Qarn al-Manazil.",
      inclusions: [
        "Door-to-door private highway transfer from Riyadh residence to Makkah hotel",
        "Dedicated stop at Miqat Qarn al-Manazil for Umrah pilgrims",
        "Long-distance certified chauffeurs experienced with intercity expressways",
        "All fuel, tolls, and taxes included in the transparent fixed fare",
        "Cash payment upon arrival at your Makkah accommodation (SAR or USD)",
      ],
      highwayNote: "Route 40 / Riyadh-Taif-Makkah Expressway",
      authoritySource: "Transport General Authority & Ministry of Hajj and Umrah",
      faqs: [
        {
          question: "How long is the drive from Riyadh to Makkah?",
          answer: "The 870 km drive typically takes 8 to 9 hours including rest stops.",
        },
        {
          question: "Are there designated rest and prayer stops along Highway 40?",
          answer: "Yes, chauffeurs stop at reputable highway service plazas with air-conditioned mosques and dining facilities.",
        },
        {
          question: "What is the payment policy?",
          answer: "Payment is cash only (SAR or USD) paid directly to the chauffeur upon arrival in Makkah.",
        },
      ],
    },
    ms: {
      seoTitle: "Pengangkutan VIP Jarak Jauh Riyadh ke Makkah | Duyuf Alrahman VIP",
      seoDescription: "Kereta sewa peribadi mewah dari Riyadh terus ke hotel Makkah melalui Lebuhraya 40. Henti di Miqat untuk Umrah, bayar tunai di Makkah.",
      h1: "Pengangkutan VIP Jarak Jauh Riyadh ke Makkah",
      subtitle: "Perjalanan Mewah Pintu ke Pintu Merentasi Lebuhraya 40 untuk Jemaah dan Keluarga VIP",
      overview: "Perjalanan darat yang selesa dan selamat dari Riyadh terus ke Masjidil Haram Makkah. Kami menyediakan kenderaan SUV dan van mewah yang selesa untuk perjalanan jauh bersama hentian rehat dan Miqat untuk niat umrah.",
      inclusions: [
        "Pengambilan dari kediaman di Riyadh dan penghantaran terus ke hotel Makkah",
        "Hentian di Miqat Qarn al-Manazil untuk berniat ihram umrah",
        "Kenderaan moden berhawa dingin sepenuhnya yang sangat selesa",
        "Termasuk minyak, tol lebuh raya, dan cukai tanpa caj tersembunyi",
        "Bayaran tunai (SAR atau USD) kepada pemandu semasa tiba di Makkah",
      ],
      highwayNote: "Lebuhraya Riyadh - Taif - Makkah (Laluan 40)",
      authoritySource: "Lembaga Pengangkutan Awam & Kementerian Haji dan Umrah",
      faqs: [
        {
          question: "Berapa lamakah perjalanan dari Riyadh ke Makkah?",
          answer: "Jarak 870 km mengambil masa sekitar 8 hingga 9 jam dengan beberapa hentian rehat selesa.",
        },
        {
          question: "Adakah pemandu berhenti untuk solat dan makan?",
          answer: "Ya, pemandu akan berhenti di stesen rehat lebuh raya yang bersih dan mempunyai masjid berhawa dingin.",
        },
        {
          question: "Bagaimana cara bayar?",
          answer: "Bayaran tunai (SAR atau USD) kepada pemandu semasa tiba di Makkah.",
        },
      ],
    },
    id: {
      seoTitle: "Travel Privat Jarak Jauh Riyadh ke Makkah VIP | Duyuf Alrahman VIP",
      seoDescription: "Sewa mobil pribadi mewah dari Riyadh langsung ke hotel Makkah via Jalan Tol 40. Singgah di Miqat untuk umrah, bayar tunai di Makkah.",
      h1: "Travel Privat Jarak Jauh Riyadh ke Makkah VIP",
      subtitle: "Layanan Supir Pribadi Antar Kota Melewati Tol 40 untuk Keluarga dan Jamaah Umrah",
      overview: "Nikmati perjalanan darat eksklusif dari Riyadh langsung menuju kota suci Makkah. Kendaraan ber-AC dingin dan suspensi empuk memastikan Anda dan keluarga tetap segar, lengkap dengan singgah di Miqat untuk niat ihram.",
      inclusions: [
        "Layanan antar-jemput pintu ke pintu dari rumah di Riyadh ke hotel Makkah",
        "Singgah di Miqat Qarnul Manazil bagi jamaah yang berniat umrah",
        "Armada SUV dan van luas yang nyaman untuk perjalanan jauh",
        "Harga pasti sudah termasuk bensin, tol, dan pajak",
        "Pembayaran tunai (SAR atau USD) langsung ke supir saat tiba di Makkah",
      ],
      highwayNote: "Jalan Tol Riyadh - Taif - Makkah (Rute 40)",
      authoritySource: "Otoritas Transportasi & Kementerian Haji dan Umrah",
      faqs: [
        {
          question: "Berapa lama perjalanan dari Riyadh ke Makkah?",
          answer: "Jarak 870 km ditempuh dalam waktu sekitar 8 hingga 9 jam perjalanan santai.",
        },
        {
          question: "Apakah ada tempat istirahat dan sholat di jalan tol?",
          answer: "Ya, supir akan berhenti di rest area bersih yang memiliki masjid ber-AC dan restoran.",
        },
        {
          question: "Bagaimana sistem pembayarannya?",
          answer: "Pembayaran dilakukan secara tunai (SAR atau USD) kepada supir setelah tiba di hotel Makkah.",
        },
      ],
    },
    ur: {
      seoTitle: "ریاض سے مکہ مکرمہ لانگ ڈرائیو وی آئی پی کار سروس | ضیوف الرحمن VIP",
      seoDescription: "ریاض سے مکہ مکرمہ ہوٹلوں تک براہ راست پرائیویٹ کار سروس بذریعہ روٹ 40۔ میقات پر احرام کا قیام، فکسڈ ریٹ اور پہنچنے پر کیش ادائیگی۔",
      h1: "ریاض سے مکہ مکرمہ لانگ ڈسٹنس وی آئی پی ہائی وے کار سروس",
      subtitle: "ریاض میں آپ کے گھر سے مکہ مکرمہ ہوٹل تک روٹ 40 کے ذریعے باوقار اور پرسکون خاندانی سفر",
      overview: "ریاض سے براہ راست مکہ مکرمہ کا طویل اور پرسکون سفر۔ ہماری کشادہ اور پرتعیش گاڑیاں لمبی مسافت کے لیے موزوں ہیں جن میں عمرہ زائرین کے لیے میقات پر احرام باندھنے اور راستے میں نماز و کھانے کے لیے معیاری سٹاپس شامل ہیں۔",
      inclusions: [
        "ریاض میں آپ کے دروازے سے مکہ مکرمہ کے ہوٹل تک براہ راست پرائیویٹ سفر",
        "عمرہ زائرین کے لیے میقات قرن المنازل پر احرام کا خصوصی قیام",
        "لمبے ہائی وے کے لیے آرام دہ اور کشادہ لگژری گاڑیاں",
        "تمام پیٹرول، ٹول ٹیکس اور ویٹ شامل، کوئی خفیہ چارج نہیں",
        "مکہ پہنچنے پر ڈرائیور کو نقد (سعودی ریال یا امریکی ڈالر) ادائیگی",
      ],
      highwayNote: "ریاض - طائف - مکہ ایکسپریس وے (روٹ 40)",
      authoritySource: "ٹرانسپورٹ اتھارٹی اور وزارت حج و عمرہ",
      faqs: [
        {
          question: "ریاض سے مکہ گاڑی میں کتنا وقت لگتا ہے؟",
          answer: "870 کلومیٹر کا فاصلہ مناسب وقفوں کے ساتھ تقریباً 8 سے 9 گھنٹے میں طے ہوتا ہے۔",
        },
        {
          question: "کیا راستے میں نماز اور کھانے کے لیے معیاری ریسٹ ایریاز ہیں؟",
          answer: "جی ہاں، روٹ 40 پر ایئر کنڈیشنڈ مساجد اور فیملی ریسٹورنٹس والے بہترین سروس سٹیشنز موجود ہیں۔",
        },
        {
          question: "ادائیگی کا طریقہ کیا ہے؟",
          answer: "مکہ مکرمہ پہنچ کر ڈرائیور کو نقد (ریال یا ڈالر) ادا کیا جاتا ہے۔",
        },
      ],
    },
    fr: {
      seoTitle: "Transfert Longue Distance Riyad à La Mecque VIP | Duyuf Alrahman VIP",
      seoDescription: "Chauffeur privé direct de Riyad à La Mecque via l'Autoroute 40. Véhicules confortables, arrêt au Miqat pour l'Omra, paiement en espèces à l'arrivée.",
      h1: "Transfert Longue Distance Riyad à La Mecque",
      subtitle: "Voyage Privé Porte-à-Porte sur l'Autoroute 40 pour Familles et Pèlerins d'Omra",
      overview: "Traversez le Royaume dans un confort absolu depuis Riyad jusqu'aux portes du Haram à La Mecque. Véhicules insonorisés et spacieux avec arrêts réguliers dans des aires de repos modernes et arrêt au Miqat pour l'Ihram.",
      inclusions: [
        "Transfert direct de votre domicile à Riyad à votre hôtel à La Mecque",
        "Arrêt au Miqat Qarn al-Manazil pour les pèlerins effectuant la Omra",
        "Véhicules haut de gamme climatisés adaptés aux longs trajets",
        "Carburant, péages et taxes inclus dans le tarif fixe garanti",
        "Paiement en espèces (SAR ou USD) auprès du chauffeur à La Mecque",
      ],
      highwayNote: "Autoroute 40 (Riyad - Taïf - La Mecque)",
      authoritySource: "Autorité Générale des Transports & Ministère du Hajj",
      faqs: [
        {
          question: "Combien de temps dure le trajet Riyad - La Mecque en voiture ?",
          answer: "Le trajet de 870 km dure environ 8 à 9 heures avec les pauses nécessaires.",
        },
        {
          question: "Y a-t-il des arrêts pour la prière et les repas ?",
          answer: "Oui, des arrêts sont prévus dans des stations modernes dotées de mosquées climatisées.",
        },
        {
          question: "Comment s'effectue le règlement ?",
          answer: "Le paiement est effectué en espèces (SAR ou USD) au chauffeur à l'arrivée.",
        },
      ],
    },
    es: {
      seoTitle: "Traslado Larga Distancia Riad a La Meca VIP | Duyuf Alrahman VIP",
      seoDescription: "Chófer privado de Riad a hoteles de La Meca por la Autopista 40. Viaje cómodo con parada en el Miqat para Umrah. Pago en efectivo al llegar.",
      h1: "Traslado Larga Distancia Riad a La Meca en Chófer VIP",
      subtitle: "Viaje Privado Puerta a Puerta por la Ruta 40 para Familias y Peregrinos",
      overview: "Viaje exclusivo de costa a costa desde Riad hasta La Meca en vehículos premium climatizados con conductores certificados en trayectos largos.",
      inclusions: [
        "Traslado puerta a puerta de su residencia en Riad a su hotel en La Meca",
        "Parada en Miqat Qarn al-Manazil para vestir el Ihram de Umrah",
        "Vehículos modernos con máximo confort para viajes de larga distancia",
        "Todos los peajes, gasolina e impuestos incluidos en la tarifa fija",
        "Pago en efectivo (SAR o USD) al conductor al llegar a La Meca",
      ],
      highwayNote: "Autopista 40 (Riad - Taif - La Meca)",
      authoritySource: "Autoridad de Transporte y Ministerio de Hajj",
      faqs: [
        {
          question: "¿Cuánto dura el viaje de Riad a La Meca en coche?",
          answer: "Los 870 km se recorren en unas 8 a 9 horas incluyendo descansos.",
        },
        {
          question: "¿Hay paradas para orar y comer en el camino?",
          answer: "Sí, paradas en áreas de servicio modernas con mezquitas climatizadas.",
        },
        {
          question: "¿Cómo se abona el viaje?",
          answer: "En efectivo (SAR o USD) directamente al conductor al llegar a La Meca.",
        },
      ],
    },
    de: {
      seoTitle: "Langstrecken-Transfer Riad nach Mekka VIP | Duyuf Alrahman VIP",
      seoDescription: "Direkter Chauffeur-Transfer von Riad nach Mekka über die Autobahn 40. Halt am Miqat für Umrah, Barzahlung bei Ankunft in Mekka.",
      h1: "Langstrecken-Chauffeur Riad nach Mekka",
      subtitle: "Tür-zu-Tür-Transfer über Route 40 für anspruchsvolle Reisende und Familien",
      overview: "Reisen Sie komfortabel durch das Königreich von Riad direkt nach Mekka. Vollklimatisierte geräumige Fahrzeuge für lange Strecken mit Zwischenstopps zum Gebet und Miqat-Halt für Umrah.",
      inclusions: [
        "Privater Transfer von Ihrer Haustür in Riad zum Hotel in Mekka",
        "Halt an der Miqat Qarn al-Manazil Station für Umrah-Pilger",
        "Erfahrene Langstrecken-Chauffeure und schallisolierte Fahrzeuge",
        "Treibstoff, Maut und Steuern im Festpreis enthalten",
        "Barzahlung (SAR oder USD) beim Fahrer bei Ankunft in Mekka",
      ],
      highwayNote: "Route 40 / Riad - Taif - Mekka Schnellstraße",
      authoritySource: "Verkehrsbehörde & Haddsch-Ministerium",
      faqs: [
        {
          question: "Wie lange dauert die Fahrt von Riad nach Mekka?",
          answer: "Die 870 km lange Strecke dauert inklusive Pausen etwa 8 bis 9 Stunden.",
        },
        {
          question: "Gibt es saubere Raststätten auf der Autobahn?",
          answer: "Ja, Fahrer halten an modernen Rastanlagen mit klimatisierten Moscheen.",
        },
        {
          question: "Wie wird bezahlt?",
          answer: "Barzahlung (SAR oder USD) beim Fahrer bei Ankunft in Mekka.",
        },
      ],
    },
    tr: {
      seoTitle: "Riyad - Mekke Uzun Yol VIP Şoförlü Transfer | Duyuf Alrahman VIP",
      seoDescription: "Riyad'dan Mekke otellerine 40 Nolu Otoyol üzerinden doğrudan VIP transfer. Umre için Mikat molası, varışta nakit ödeme.",
      h1: "Riyad'dan Mekke-i Mükerreme'ye Uzun Yol Özel VIP Transfer",
      subtitle: "40 Nolu Otoyol Üzerinden Kapıdan Kapıya Konforlu ve Güvenli VIP Seyahat",
      overview: "Suudi Arabistan'ın başkenti Riyad'dan doğrudan Mekke-i Mükerreme'deki otelinize VIP araçla güvenli ve huzurlu bir kara yolculuğu. Geniş araçlarımız, dinlenme molaları ve Mikatta ihram hazırlığı ile yolculuğunuzu kolaylaştırır.",
      inclusions: [
        "Riyad'daki adresinizden Mekke otelinize kapıdan kapıya özel VIP transfer",
        "Umre yapacak misafirlerimiz için Karnü'l Menazil Mikatında özel bekleme",
        "Uzun yola uygun, geniş ve yüksek konforlu lüks araçlar",
        "Tüm otoyol ücretleri, yakıt ve vergiler fiyata dahildir",
        "Mekke'ye varışta şoföre nakit (SAR veya USD) elden ödeme",
      ],
      highwayNote: "Riyad - Taif - Mekke Otoyolu (40 Nolu Güzergah)",
      authoritySource: "Suudi Ulaştırma Genel İdaresi & Hac Bakanlığı",
      faqs: [
        {
          question: "Riyad - Mekke arası araçla ne kadar sürer?",
          answer: "870 km mesafe molalarla birlikte ortalama 8 ila 9 saat sürmektedir.",
        },
        {
          question: "Yolda namaz ve yemek molaları veriliyor mu?",
          answer: "Evet, güzergah üzerindeki temiz tesislerde ve klimalı camilerde mola verilmektedir.",
        },
        {
          question: "Ödeme nasıl yapılır?",
          answer: "Mekke'ye varışta şoföre nakit (SAR veya USD) olarak ödenir.",
        },
      ],
    },
    hi: {
      seoTitle: "रियाद से मक्का लंबी दूरी वीआईपी कार सर्विस | Duyuf Alrahman VIP",
      seoDescription: "रियाद से सीधे मक्का होटल तक रूट 40 से प्राइवेट कार यात्रा। उमराह के लिए मीक़ात पर ठहराव, पहुंचने पर नकद भुगतान।",
      h1: "रियाद से मक्का लंबी दूरी वीआईपी हाईवे कार सर्विस",
      subtitle: "रूट 40 के रास्ते रियाद से मक्का तक परिवारों और उमराह यात्रियों के लिए सुरक्षित और आरामदायक सफर",
      overview: "रियाद से पवित्र मक्का मुकर्रमा तक बिना किसी परेशानी के लंबी दूरी की आरामदायक कार यात्रा। आधुनिक गाड़ियां, साफ-सुथरे विश्राम स्थल और उमराह की नीयत के लिए मीक़ात पर ठहराव।",
      inclusions: [
        "रियाद में आपके घर से मक्का होटल तक डोर-टू-डोर प्राइवेट सर्विस",
        "उमराह यात्रियों के लिए मीक़ात क़रनुल मनाज़िल पर एहराम का ठहराव",
        "लंबी यात्रा के लिए उपयुक्त वातानुकूलित बड़ी गाड़ियां",
        "सभी टोल, पेट्रोल और टैक्स तय किराए में शामिल",
        "मक्का पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान",
      ],
      highwayNote: "रियाद - तायफ - मक्का एक्सप्रेसवे (रूट 40)",
      authoritySource: "सऊदी परिवहन प्राधिकरण और हज व उमराह मंत्रालय",
      faqs: [
        {
          question: "रियाद से मक्का जाने में कितना समय लगता है?",
          answer: "870 किमी की दूरी ठहराव के साथ लगभग 8 से 9 घंटे में तय होती है।",
        },
        {
          question: "क्या रास्ते में नमाज़ और खाने के लिए रुकते हैं?",
          answer: "हाँ, रूट 40 पर एयर-कंडीशंड मस्जिदों और रेस्टोरेंट वाले सर्विस स्टेशनों पर रुका जाता है।",
        },
        {
          question: "किराया कैसे चुकाया जाता है?",
          answer: "मक्का पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान किया जाता है।",
        },
      ],
    },
  },
  'riyadh-to-madinah': {
    ar: {
      seoTitle: "توصيل وسائق خاص VIP من الرياض إلى المدينة المنورة | ضيوف الرحمن VIP",
      seoDescription: "سفر بري فاخر وخاص من الرياض إلى المدينة المنورة عبر طريق القصيم - المدينة. سيارات عائلية واسعة ومريحة ودفع كاش عند الوصول.",
      h1: "خدمة نقل وسائق VIP لمسافات طويلة من الرياض إلى المدينة المنورة",
      subtitle: "رحلة برية فاخرة عبر وسط المملكة من الرياض مباشرة إلى جوار المسجد النبوي الشريف بالمدينة",
      overview: "انطلق في رحلة برية هادئة ومريحة من العاصمة الرياض مباشرة إلى جوار المسجد النبوي الشريف بالمدينة المنورة. نوفر سيارات حديثة عازلة للصوت مع سائقين معتمدين للمسافات الطويلة عبر طريقي 65 و60 السريعين.",
      inclusions: [
        "انتقال بري خاص بالكامل من باب منزلك بالرياض إلى فندقك بالمدينة",
        "سائقون محترفون ومركبات مكيفة فائقة الراحة للرحلات الطويلة",
        "توقف مريح للصلاة وتناول الطعام في أفضل استراحات طريق القصيم والمدينة",
        "شامل كافة رسوم الطرق والوقود والضرائب في سعر ثابت",
        "الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول للمدينة",
      ],
      highwayNote: "طريق الرياض - القصيم السريع (طريق 65) وطريق القصيم - المدينة (طريق 60)",
      authoritySource: "الهيئة العامة للنقل ووزارة النقل والخدمات اللوجستية",
      faqs: [
        {
          question: "كم تستغرق المسافة من الرياض إلى المدينة المنورة؟",
          answer: "تبلغ المسافة حوالي 840 كم وتستغرق بين 8 إلى 9 ساعات قيادة مريحة وآمنة مع التوقفات.",
        },
        {
          question: "هل الطريق السريع آمن ومجهز؟",
          answer: "نعم، المسار بالكامل عبر طرق سريعة دولية متعددة المسارات ومضاءة ومجهزة بأحدث استراحات الوقود والمساجد.",
        },
        {
          question: "كيف يتم دفع قيمة الرحلة؟",
          answer: "الدفع نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق عند الوصول إلى المدينة المنورة.",
        },
      ],
    },
    en: {
      seoTitle: "Riyadh to Madinah Long-Distance VIP Highway Chauffeur | Duyuf Alrahman VIP",
      seoDescription: "Direct private chauffeur from Riyadh to Madinah hotels via Qassim Highway. Luxury long-distance transfer to the Prophet's Mosque. Cash upon arrival.",
      h1: "Riyadh to Madinah Long-Distance VIP Highway Chauffeur",
      subtitle: "Comfortable VIP Highway Travel Across Central Arabia Directly to the Prophet’s Mosque",
      overview: "Travel smoothly across central Saudi Arabia from Riyadh directly to the Prophet's Mosque in Madinah. Enjoy an insulated, air-conditioned executive vehicle with professional highway chauffeurs traveling across Routes 65 and 60.",
      inclusions: [
        "Door-to-door private highway transfer from Riyadh to your Madinah hotel",
        "Executive climate-controlled fleet designed for maximum long-distance relaxation",
        "Designated stops at clean service plazas for prayers and refreshments",
        "All fuel, tolls, and taxes included in the guaranteed fixed fare",
        "Cash payment upon arrival at your Madinah hotel (SAR or USD)",
      ],
      highwayNote: "Route 65 (Riyadh-Qassim) & Route 60 (Qassim-Madinah Expressway)",
      authoritySource: "Transport General Authority & Ministry of Transport",
      faqs: [
        {
          question: "How long does the transfer from Riyadh to Madinah take?",
          answer: "The 840 km journey typically takes between 8 and 9 hours including rest breaks.",
        },
        {
          question: "Are there suitable prayer stops along the expressway?",
          answer: "Yes, modern highway plazas with air-conditioned mosques and food courts are stationed along Routes 65 and 60.",
        },
        {
          question: "What is the payment policy?",
          answer: "Payment is cash only (SAR or USD) paid directly to the chauffeur upon arrival in Madinah.",
        },
      ],
    },
    ms: {
      seoTitle: "Pengangkutan VIP Jarak Jauh Riyadh ke Madinah | Duyuf Alrahman VIP",
      seoDescription: "Perkhidmatan kereta sewa peribadi dari Riyadh terus ke hotel Madinah melalui Lebuhraya Qassim. Selesa untuk keluarga, bayar tunai di Madinah.",
      h1: "Pengangkutan VIP Jarak Jauh Riyadh ke Madinah",
      subtitle: "Perjalanan Lebuh Raya VIP yang Selesa Merentasi Semenanjung Arab Terus ke Masjid Nabawi",
      overview: "Perjalanan darat yang tenang dari Riyadh terus ke perkarangan Masjid Nabawi di Madinah. Nikmati perjalanan dengan kenderaan selesa, berhawa dingin, dan pemandu berpengalaman merentasi lebuh raya moden Laluan 65 dan 60.",
      inclusions: [
        "Pengambilan dari rumah di Riyadh dan penghantaran terus ke hotel Madinah",
        "Kenderaan luas dan selesa yang direka khusus untuk perjalanan jauh",
        "Hentian rehat di kawasan rehat lebuh raya moden untuk solat dan makan",
        "Termasuk minyak, tol lebuh raya, dan cukai tanpa caj tersembunyi",
        "Bayaran tunai (SAR atau USD) kepada pemandu semasa tiba di Madinah",
      ],
      highwayNote: "Lebuhraya Riyadh - Qassim (Laluan 65) & Qassim - Madinah (Laluan 60)",
      authoritySource: "Lembaga Pengangkutan Awam",
      faqs: [
        {
          question: "Berapa lamakah perjalanan dari Riyadh ke Madinah?",
          answer: "Jarak 840 km mengambil masa sekitar 8 hingga 9 jam dengan beberapa hentian selesa.",
        },
        {
          question: "Adakah terdapat tempat solat yang bersih sepanjang perjalanan?",
          answer: "Ya, terdapat stesen servis moden dengan masjid berhawa dingin sepanjang lebuh raya.",
        },
        {
          question: "Bagaimana cara bayar?",
          answer: "Bayaran tunai (SAR atau USD) kepada pemandu semasa tiba di Madinah.",
        },
      ],
    },
    id: {
      seoTitle: "Travel Privat Jarak Jauh Riyadh ke Madinah VIP | Duyuf Alrahman VIP",
      seoDescription: "Sewa mobil pribadi mewah dari Riyadh langsung ke hotel Madinah via Tol Qassim. Perjalanan nyaman ke Masjid Nabawi, bayar tunai di Madinah.",
      h1: "Travel Privat Jarak Jauh Riyadh ke Madinah VIP",
      subtitle: "Perjalanan Darat Nyaman Melintasi Semenanjung Arab Langsung ke Masjid Nabawi",
      overview: "Layanan transportasi pribadi eksekutif dari Riyadh langsung ke Masjid Nabawi di Madinah Al-Munawwarah. Mobil ber-AC dingin dan nyaman dengan supir profesional yang menguasai jalur antar-kota.",
      inclusions: [
        "Layanan antar-jemput pintu ke pintu dari Riyadh ke hotel Madinah",
        "Armada mobil mewah yang empuk dan kedap suara untuk perjalanan jauh",
        "Istirahat teratur di rest area bersih untuk sholat dan makan",
        "Harga pasti sudah termasuk bensin, tol, dan pajak",
        "Pembayaran tunai (SAR atau USD) langsung ke supir saat tiba di Madinah",
      ],
      highwayNote: "Jalan Tol Riyadh - Qassim (Rute 65) & Tol Qassim - Madinah (Rute 60)",
      authoritySource: "Otoritas Transportasi Umum",
      faqs: [
        {
          question: "Berapa lama perjalanan dari Riyadh ke Madinah?",
          answer: "Jarak 840 km ditempuh dalam waktu sekitar 8 hingga 9 jam perjalanan santai.",
        },
        {
          question: "Apakah ada fasilitas ibadah yang bersih di tol?",
          answer: "Ya, rute ini dilengkapi dengan rest area modern dan masjid ber-AC yang bersih.",
        },
        {
          question: "Bagaimana sistem pembayarannya?",
          answer: "Pembayaran dilakukan secara tunai (SAR atau USD) kepada supir setelah tiba di hotel Madinah.",
        },
      ],
    },
    ur: {
      seoTitle: "ریاض سے مدینہ منورہ وی آئی پی کار ٹرانسفر | ضیوف الرحمن VIP",
      seoDescription: "ریاض سے مدینہ منورہ مسجد نبوی کے ہوٹلوں کے لیے براہ راست پرائیویٹ کار سروس بذریعہ القصیم ہائی وے روٹ 65 و 60۔ کیش ادائیگی۔",
      h1: "ریاض سے مدینہ منورہ لانگ ڈسٹنس وی آئی پی کار سروس",
      subtitle: "ریاض سے براہ راست مسجد نبوی کے جوار تک پُرسکون اور آرام دہ خاندانی سفر",
      overview: "ریاض سے مدینہ منورہ کا طویل اور پُرسکون سفر۔ ہماری کشادہ اور مکمل ایئر کنڈیشنڈ گاڑیاں مسافت کو آسان بناتی ہیں جس میں راستے کے جدید ریسٹ ایریاز میں نماز اور کھانے کے لیے مناسب وقفے شامل ہیں۔",
      inclusions: [
        "ریاض میں آپ کی رہائش گاہ سے مدینہ منورہ کے ہوٹل تک براہ راست سروس",
        "لمبے سفر کے لیے خصوصی آرام دہ اور جدید ایگزیکٹو گاڑیاں",
        "طریق القصیم اور طریق المدینہ کے بہترین سروس سٹیشنز پر آرام دہ قیام",
        "تمام پیٹرول، ٹول ٹیکس اور ویٹ فکسڈ کرائے میں شامل",
        "مدینہ پہنچنے پر ڈرائیور کو نقد (سعودی ریال یا امریکی ڈالر) ادائیگی",
      ],
      highwayNote: "طریق الریاض - القصیم (روٹ 65) اور طریق القصیم - المدینہ (روٹ 60)",
      authoritySource: "ٹرانسپورٹ جنرل اتھارٹی",
      faqs: [
        {
          question: "ریاض سے مدینہ منورہ کا سفر کتنا طویل ہے؟",
          answer: "840 کلومیٹر کا فاصلہ مناسب وقفوں کے ساتھ تقریباً 8 سے 9 گھنٹے میں طے ہوتا ہے۔",
        },
        {
          question: "کیا ہائی وے پر مساجد اور سروس ایریاز موجود ہیں؟",
          answer: "جی ہاں، راستے میں جدید مساجد اور کھانے پینے کے مراکز والی بہترین آرام گاہیں ہیں۔",
        },
        {
          question: "ادائیگی کا طریقہ کار کیا ہے؟",
          answer: "مدینہ منورہ پہنچ کر ڈرائیور کو نقد (ریال یا ڈالر) ادا کیا جاتا ہے۔",
        },
      ],
    },
    fr: {
      seoTitle: "Transfert Longue Distance Riyad à Médine VIP | Duyuf Alrahman VIP",
      seoDescription: "Chauffeur privé direct de Riyad à Médine via l'Autoroute de Qassim. Véhicules confortables jusqu'à la Mosquée du Prophète. Paiement en espèces.",
      h1: "Transfert Longue Distance Riyad vers Médine",
      subtitle: "Voyage Confortable sur Autoroute à Travers l'Arabie Directement jusqu'à la Mosquée du Prophète",
      overview: "Voyagez en toute quiétude de Riyad jusqu'au parvis de la Mosquée du Prophète à Médine. Véhicules haut de gamme climatisés et insonorisés conduits par des chauffeurs expérimentés sur les autoroutes 65 et 60.",
      inclusions: [
        "Transfert direct de votre résidence à Riyad à votre hôtel à Médine",
        "Véhicules spacieux et climatisés spécialement adaptés aux longues distances",
        "Arrêts sur des aires de repos modernes pour les prières et repas",
        "Carburant, péages et taxes inclus dans le tarif fixe garanti",
        "Paiement en espèces (SAR ou USD) auprès du chauffeur à Médine",
      ],
      highwayNote: "Route 65 (Riyad-Qassim) & Route 60 (Qassim-Médine)",
      authoritySource: "Autorité Générale des Transports",
      faqs: [
        {
          question: "Combien de temps dure le trajet Riyad - Médine ?",
          answer: "Le trajet de 840 km dure entre 8 et 9 heures avec des arrêts réguliers.",
        },
        {
          question: "Y a-t-il des aires de repos adaptées ?",
          answer: "Oui, les autoroutes 65 et 60 disposent de stations modernes avec mosquées climatisées.",
        },
        {
          question: "Comment payer le chauffeur ?",
          answer: "Le paiement est effectué en espèces (SAR ou USD) à votre arrivée à Médine.",
        },
      ],
    },
    es: {
      seoTitle: "Traslado Larga Distancia Riad a Medina VIP | Duyuf Alrahman VIP",
      seoDescription: "Chófer privado de Riad a hoteles de Medina por la Autopista de Qassim. Vehículos de lujo hasta la Mezquita del Profeta. Pago en efectivo al llegar.",
      h1: "Traslado Larga Distancia Riad a Medina en Chófer VIP",
      subtitle: "Viaje Cómodo por Autopista Directo a la Mezquita del Profeta en Medina",
      overview: "Traslado privado exclusivo desde Riad directamente hasta su hotel junto a la Mezquita del Profeta en Medina. Conducción suave por las Rutas 65 y 60 con paradas confortables.",
      inclusions: [
        "Traslado puerta a puerta de su residencia en Riad a su hotel en Medina",
        "Flota ejecutiva moderna con aire acondicionado para viajes largos",
        "Paradas programadas en áreas de servicio limpias para oraciones y comida",
        "Peajes, combustible e impuestos incluidos en la tarifa fija",
        "Pago en efectivo (SAR o USD) al conductor al llegar a Medina",
      ],
      highwayNote: "Ruta 65 (Riad-Qassim) y Ruta 60 (Qassim-Medina)",
      authoritySource: "Autoridad General de Transporte",
      faqs: [
        {
          question: "¿Cuánto dura el viaje de Riad a Medina en coche?",
          answer: "El viaje de 840 km toma aproximadamente 8 a 9 horas incluyendo descansos.",
        },
        {
          question: "¿Hay mezquitas y áreas de descanso en la autopista?",
          answer: "Sí, hay áreas de servicio modernas con mezquitas climatizadas a lo largo de la ruta.",
        },
        {
          question: "¿Cómo se abona el viaje?",
          answer: "En efectivo (SAR o USD) directamente al chófer al llegar a Medina.",
        },
      ],
    },
    de: {
      seoTitle: "Langstrecken-Transfer Riad nach Medina VIP | Duyuf Alrahman VIP",
      seoDescription: "Direkter Chauffeur-Transfer von Riad nach Medina über die Qassim-Autobahn. Exklusiver Transfer zur Prophetenmoschee. Barzahlung bei Ankunft.",
      h1: "Langstrecken-Chauffeur Riad nach Medina",
      subtitle: "Komfortable Autobahnreise quer durch Zentralarabien direkt zur Prophetenmoschee",
      overview: "Reisen Sie entspannt von Riad direkt zur Prophetenmoschee in Medina. Unsere vollklimatisierten und geräumigen Fahrzeuge auf den Routen 65 und 60 bieten perfekten Komfort für weite Strecken.",
      inclusions: [
        "Privater Transfer von Ihrer Haustür in Riad zu Ihrem Hotel in Medina",
        "Moderne vollklimatisierte Flotte speziell für Langstreckenfahrten",
        "Pausen an modernen Autobahnraststätten für Gebete und Verpflegung",
        "Treibstoff, Maut und Steuern im garantierten Festpreis inbegriffen",
        "Barzahlung (SAR oder USD) beim Fahrer bei Ankunft in Medina",
      ],
      highwayNote: "Route 65 (Riad-Qassim) & Route 60 (Qassim-Medina)",
      authoritySource: "Verkehrsbehörde & Verkehrsministerium",
      faqs: [
        {
          question: "Wie lange dauert die Fahrt von Riad nach Medina?",
          answer: "Die 840 km lange Strecke dauert inklusive Pausen etwa 8 bis 9 Stunden.",
        },
        {
          question: "Gibt es gute Rastmöglichkeiten entlang der Autobahn?",
          answer: "Ja, die Schnellstraßen 65 und 60 bieten moderne Rastanlagen mit klimatisierten Moscheen.",
        },
        {
          question: "Wie wird bezahlt?",
          answer: "Barzahlung (SAR oder USD) beim Fahrer bei Ankunft in Medina.",
        },
      ],
    },
    tr: {
      seoTitle: "Riyad - Medine Uzun Yol VIP Şoförlü Transfer | Duyuf Alrahman VIP",
      seoDescription: "Riyad'dan Medine otellerine Kasım Otoyolu üzerinden doğrudan VIP transfer. Mescid-i Nebevi'ye konforlu ulaşım, varışta nakit ödeme.",
      h1: "Riyad'dan Medine-i Münevvere'ye Uzun Yol Özel VIP Transfer",
      subtitle: "Arabistan Yarımadası Boyunca Doğrudan Mescid-i Nebevi'ye Konforlu VIP Seyahat",
      overview: "Riyad'dan doğrudan Medine-i Münevvere'deki Mescid-i Nebevi yakınına özel VIP araçla konforlu bir kara yolculuğu. 65 ve 60 Nolu modern otoyollarda deneyimli şoförlerimizle huzurlu bir seyahat.",
      inclusions: [
        "Riyad'daki adresinizden Medine otelinize kapıdan kapıya özel VIP transfer",
        "Uzun yola özel klimalı, ferah ve konforlu lüks araçlar",
        "Namaz ve yemek ihtiyaçları için modern otoyol tesislerinde molalar",
        "Tüm otoyol geçiş ücretleri, yakıt ve vergiler fiyata dahildir",
        "Medine'ye varışta şoföre nakit (SAR veya USD) elden ödeme",
      ],
      highwayNote: "Riyad - Kasım (65 Nolu Yol) & Kasım - Medine (60 Nolu Otoyol)",
      authoritySource: "Suudi Ulaştırma Genel İdaresi",
      faqs: [
        {
          question: "Riyad - Medine arası ne kadar sürer?",
          answer: "840 km mesafe molalarla birlikte ortalama 8 ila 9 saat sürmektedir.",
        },
        {
          question: "Yolda temiz dinlenme tesisleri ve camiler var mı?",
          answer: "Evet, güzergah boyunca klimalı camilere ve restoranlara sahip modern tesisler bulunmaktadır.",
        },
        {
          question: "Ödeme nasıl yapılır?",
          answer: "Medine'ye varışta şoföre nakit (SAR veya USD) olarak elden ödenir.",
        },
      ],
    },
    hi: {
      seoTitle: "रियाद से मदीना लंबी दूरी वीआईपी कार सर्विस | Duyuf Alrahman VIP",
      seoDescription: "रियाद से मदीना मुनव्वरा मस्जिद नबवी के होटलों के लिए डायरेक्ट प्राइवेट कार ट्रांसफर। आरामदायक सफर, पहुंचने पर नकद भुगतान।",
      h1: "रियाद से मदीना लंबी दूरी वीआईपी हाईवे कार सर्विस",
      subtitle: "रियाद से सीधे मस्जिद नबवी के पास तक वातानुकूलित कार में आरामदायक और सुरक्षित सफर",
      overview: "सऊदी राजधानी रियाद से सीधे मदीना मुनव्वरा में मस्जिद नबवी के पास तक बिना किसी परेशानी के लंबी दूरी की सुरक्षित यात्रा। रूट 65 और 60 के रास्ते आधुनिक गाड़ियों और अच्छे विश्राम स्थलों के साथ।",
      inclusions: [
        "रियाद में आपके पते से मदीना होटल तक निजी वातानुकूलित वाहन",
        "लंबी यात्रा के लिए विशेष रूप से तैयार आरामदायक लग्जरी गाड़ियां",
        "नमाज़ और खाने के लिए स्वच्छ और आधुनिक हाईवे सर्विस स्टेशनों पर ठहराव",
        "सभी टोल, पेट्रोल और टैक्स तय किराए में शामिल",
        "मदीना पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान",
      ],
      highwayNote: "रियाद - क़सीम (रूट 65) और क़सीम - मदीना एक्सप्रेसवे (रूट 60)",
      authoritySource: "सऊदी परिवहन प्राधिकरण",
      faqs: [
        {
          question: "रियाद से मदीना जाने में कितना समय लगता है?",
          answer: "840 किमी की दूरी ठहराव के साथ लगभग 8 से 9 घंटे में तय होती है।",
        },
        {
          question: "क्या रास्ते में नमाज़ के लिए अच्छी जगहें हैं?",
          answer: "हाँ, हाईवे पर वातानुकूलित मस्जिदों और अच्छे रेस्टोरेंट वाले स्टेशन मौजूद हैं।",
        },
        {
          question: "किराया कैसे चुकाया जाता है?",
          answer: "मदीना पहुंचने पर ड्राइवर को नकद (SAR या USD) में भुगतान किया जाता है।",
        },
      ],
    },
  },
};

export function getLocalizedRouteContent(
  slug: string,
  locale: Locale,
  fallbackRoute: any
): LocalizedRouteMeta {
  const custom = PRIORITY_ROUTES_LOCALIZED[slug]?.[locale];
  if (custom) return custom;

  const isAr = locale === 'ar';
  const title = isAr ? fallbackRoute.titleAr : fallbackRoute.titleEn;
  const desc = isAr ? fallbackRoute.descriptionAr : fallbackRoute.descriptionEn;
  const subtitle = isAr ? fallbackRoute.subtitleAr : fallbackRoute.subtitleEn;
  const inclusions = isAr ? fallbackRoute.highlightsAr : fallbackRoute.highlightsEn;
  const highway = isAr ? fallbackRoute.highwayAr : fallbackRoute.highway;
  const authority = isAr ? fallbackRoute.verifiedSourceAr : fallbackRoute.verifiedSource;
  const faqs = (fallbackRoute.faqs || []).map((f: any) => ({
    question: isAr ? f.questionAr : f.question,
    answer: isAr ? f.answerAr : f.answer,
  }));

  return {
    seoTitle: `${title} | Duyuf Alrahman VIP`,
    seoDescription: desc.slice(0, 155),
    h1: title,
    subtitle: subtitle,
    overview: desc,
    inclusions: inclusions || [],
    highwayNote: highway || '',
    authoritySource: authority || '',
    faqs: faqs || [],
  };
}

export interface RouteContextualLink {
  href: string;
  label: string;
  badge: string;
}

export function getRouteContextualLinks(
  slug: string,
  locale: Locale
): RouteContextualLink[] {
  const isAr = locale === 'ar';
  const links: RouteContextualLink[] = [];

  // Vehicle category contextual links
  links.push({
    href: `/${locale}/fleet/hyundai-staria`,
    label: isAr ? 'هيونداي ستاريا VIP للعوائل (7 ركاب)' : 'Hyundai Staria VIP Family Van (7 Pax)',
    badge: isAr ? 'الأسطول' : 'Fleet',
  });
  links.push({
    href: `/${locale}/fleet/gmc-yukon-xl`,
    label: isAr ? 'جي إم سي يوكون XL الرئاسي الفاخر' : 'GMC Yukon XL Presidential Luxury SUV',
    badge: isAr ? 'الأسطول' : 'Fleet',
  });

  // Transit & Arrival Guides
  if (slug.includes('jeddah')) {
    links.push({
      href: `/${locale}/guides/jeddah-airport-arrival-guide`,
      label: isAr ? 'دليل الوصول لمطار جدة (KAIA) والصالات' : 'KAIA Jeddah Airport Arrival & Terminal Guide',
      badge: isAr ? 'دليل' : 'Guide',
    });
  }

  if (slug.includes('madinah')) {
    links.push({
      href: `/${locale}/ziyarat/madinah`,
      label: isAr ? 'جولات مزارات المدينة المنورة التاريخية' : 'Madinah Sacred Ziyarat Historical Tours',
      badge: isAr ? 'مزارات' : 'Ziyarat',
    });
  }

  if (slug.includes('makkah')) {
    links.push({
      href: `/${locale}/ziyarat/makkah`,
      label: isAr ? 'جولات مزارات مكة المكرمة وغار حراء' : 'Makkah Sacred Ziyarat & Cave Hira Tours',
      badge: isAr ? 'مزارات' : 'Ziyarat',
    });
  }

  // Authoritative Pricing Matrix link
  links.push({
    href: `/${locale}/pricing`,
    label: isAr ? 'جدول أسعار التوصيل المعتمدة لكافة المسارات' : 'Official Fixed Transfer Rates Matrix',
    badge: isAr ? 'الأسعار' : 'Rates',
  });

  return links;
}

