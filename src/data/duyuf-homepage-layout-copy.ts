import type { Locale } from '@/i18n/config';

/** Editorial labels for the compact, eight-section homepage.
 * Independent human-reviewable strings for all ten locales; no English fallback.
 * The legal/operational claims below are owner-approved. Do not improvise.
 */
interface HomeLayoutCopy {
  stepsTitle: string;
  interiorEyebrow: string;
  interiorTitle: string;
  interiorSubtitle: string;
  servicesTitle: string;
  whyEyebrow: string;
  whyTitle: string;
  arrivalTitle: string;
  arrivalDesc: string;
  miqatTitle: string;
  miqatDesc: string;
  familyTitle: string;
  familyDesc: string;
  reviewTitle: string;
  reviewSubtitle: string;
  guideHeading: string;
}

export const DUYUF_HOME_LAYOUT: Record<Locale, HomeLayoutCopy> = {
  ar: {
    stepsTitle:'حجز رحلتك في ثلاث خطوات',interiorEyebrow:'من الداخل',interiorTitle:'الراحة تبدأ قبل الانطلاق',interiorSubtitle:'اختر السيارة واستكشف مساحة المقصورة قبل إرسال طلب الحجز.',servicesTitle:'خدمات تناسب طبيعة رحلتك',whyEyebrow:'تفاصيل تصنع الفرق',whyTitle:'نعتني بالتفاصيل التي تهمك',arrivalTitle:'وقت إضافي عند الوصول',arrivalDesc:'انتظار مجاني لمدة 60 دقيقة في استقبال المطار.',miqatTitle:'توقف الميقات',miqatDesc:'توقف مجاني لمدة 30–45 دقيقة على المسارات المؤهلة للميقات.',familyTitle:'راحة العائلة',familyDesc:'مقاعد أطفال متاحة عند الطلب، مع اختيار سيارة تناسب الركاب والحقائب.',reviewTitle:'تعرّف على تجارب ضيوفنا',reviewSubtitle:'اقرأ آراء الضيوف المنشورة قبل اختيار رحلتك.',guideHeading:'دليل يساعدك قبل السفر'
  },
  en: {
    stepsTitle:'Book your journey in three steps',interiorEyebrow:'INSIDE THE FLEET',interiorTitle:'Comfort begins before departure',interiorSubtitle:'Choose your vehicle and see its cabin before sending a booking request.',servicesTitle:'A service for every journey',whyEyebrow:'THOUGHTFUL DETAILS',whyTitle:'The details that matter to you',arrivalTitle:'Time to settle in',arrivalDesc:'60 minutes of complimentary waiting at airport arrivals.',miqatTitle:'A thoughtful Miqat stop',miqatDesc:'Complimentary 30–45 minute stop on eligible Miqat journeys.',familyTitle:'Family-first comfort',familyDesc:'Child seats available on request; match your vehicle to your guests and luggage.',reviewTitle:'Hear from our guests',reviewSubtitle:'Read published guest experiences before choosing your ride.',guideHeading:'Useful guides before you travel'
  },
  ms: {
    stepsTitle:'Tempah perjalanan dalam tiga langkah',interiorEyebrow:'RUANG DALAMAN',interiorTitle:'Keselesaan bermula sebelum berlepas',interiorSubtitle:'Pilih kenderaan dan lihat kabinnya sebelum menghantar permintaan tempahan.',servicesTitle:'Perkhidmatan untuk setiap perjalanan',whyEyebrow:'BUTIRAN PENTING',whyTitle:'Kami menjaga perkara yang penting',arrivalTitle:'Masa untuk tiba dengan tenang',arrivalDesc:'60 minit masa menunggu percuma di lapangan terbang.',miqatTitle:'Persinggahan di Miqat',miqatDesc:'Persinggahan percuma selama 30–45 minit untuk laluan Miqat yang layak.',familyTitle:'Keselesaan keluarga',familyDesc:'Kerusi kanak-kanak tersedia atas permintaan; pilih kenderaan mengikut penumpang dan bagasi.',reviewTitle:'Pengalaman tetamu kami',reviewSubtitle:'Baca pengalaman tetamu yang diterbitkan sebelum menempah.',guideHeading:'Panduan berguna sebelum bertolak'
  },
  id: {
    stepsTitle:'Pesan perjalanan dalam tiga langkah',interiorEyebrow:'DI DALAM KENDARAAN',interiorTitle:'Kenyamanan dimulai sebelum berangkat',interiorSubtitle:'Pilih kendaraan dan lihat kabinnya sebelum mengirim permintaan pemesanan.',servicesTitle:'Layanan untuk setiap perjalanan',whyEyebrow:'DETAIL PENTING',whyTitle:'Kami memperhatikan hal yang berarti',arrivalTitle:'Waktu untuk tiba dengan tenang',arrivalDesc:'60 menit waktu tunggu gratis untuk penjemputan bandara.',miqatTitle:'Berhenti di Miqat',miqatDesc:'Berhenti gratis 30–45 menit pada rute Miqat yang memenuhi syarat.',familyTitle:'Kenyamanan keluarga',familyDesc:'Kursi anak tersedia atas permintaan; pilih kendaraan sesuai penumpang dan bagasi.',reviewTitle:'Pengalaman tamu kami',reviewSubtitle:'Baca ulasan tamu yang telah diterbitkan sebelum memesan.',guideHeading:'Panduan sebelum bepergian'
  },
  ur: {
    stepsTitle:'تین مراحل میں سفر کی درخواست',interiorEyebrow:'گاڑی کے اندر',interiorTitle:'آرام روانگی سے پہلے شروع ہوتا ہے',interiorSubtitle:'بکنگ درخواست بھیجنے سے پہلے گاڑی منتخب کریں اور اس کا اندرونی حصہ دیکھیں۔',servicesTitle:'ہر سفر کے لیے مناسب خدمت',whyEyebrow:'اہم تفصیلات',whyTitle:'آپ کی ضرورتوں کا خیال',arrivalTitle:'آمد پر اضافی وقت',arrivalDesc:'ہوائی اڈے پر آمد کے بعد 60 منٹ مفت انتظار۔',miqatTitle:'میقات پر قیام',miqatDesc:'اہل میقات سفر کے دوران 30–45 منٹ کا مفت توقف۔',familyTitle:'خاندان کا آرام',familyDesc:'درخواست پر بچوں کی نشستیں دستیاب ہیں؛ مسافروں اور سامان کے مطابق گاڑی منتخب کریں۔',reviewTitle:'مہمانوں کے تجربات',reviewSubtitle:'گاڑی منتخب کرنے سے پہلے شائع شدہ مہمانوں کی آرا پڑھیں۔',guideHeading:'سفر سے پہلے مفید رہنما'
  },
  fr: {
    stepsTitle:'Réservez en trois étapes',interiorEyebrow:'À BORD',interiorTitle:'Le confort commence avant le départ',interiorSubtitle:'Choisissez votre véhicule et découvrez son intérieur avant de demander votre trajet.',servicesTitle:'Un service pour chaque trajet',whyEyebrow:'LES DÉTAILS COMPTENT',whyTitle:'Une attention portée à l’essentiel',arrivalTitle:'Du temps à votre arrivée',arrivalDesc:'60 minutes d’attente offertes à l’aéroport.',miqatTitle:'Arrêt au Miqat',miqatDesc:'Arrêt offert de 30 à 45 minutes sur les trajets Miqat éligibles.',familyTitle:'Le confort en famille',familyDesc:'Sièges enfants disponibles sur demande ; choisissez selon les passagers et les bagages.',reviewTitle:'L’avis de nos voyageurs',reviewSubtitle:'Lisez les expériences publiées avant de choisir votre véhicule.',guideHeading:'Conseils pour préparer votre voyage'
  },
  es: {
    stepsTitle:'Reserva tu viaje en tres pasos',interiorEyebrow:'EL INTERIOR',interiorTitle:'La comodidad empieza antes de salir',interiorSubtitle:'Elige tu vehículo y conoce su interior antes de enviar una solicitud.',servicesTitle:'Un servicio para cada viaje',whyEyebrow:'DETALLES IMPORTANTES',whyTitle:'Cuidamos lo que importa',arrivalTitle:'Tiempo para llegar con calma',arrivalDesc:'60 minutos de espera gratuita en recogidas de aeropuerto.',miqatTitle:'Parada en Miqat',miqatDesc:'Parada gratuita de 30–45 minutos en trayectos elegibles de Miqat.',familyTitle:'Comodidad para la familia',familyDesc:'Sillas infantiles disponibles a petición; elige según pasajeros y equipaje.',reviewTitle:'Experiencias de nuestros viajeros',reviewSubtitle:'Lee opiniones publicadas antes de elegir el traslado.',guideHeading:'Guías para preparar tu viaje'
  },
  de: {
    stepsTitle:'Ihre Buchung in drei Schritten',interiorEyebrow:'IM FAHRZEUG',interiorTitle:'Komfort beginnt vor der Abfahrt',interiorSubtitle:'Wählen Sie Ihr Fahrzeug und sehen Sie sich den Innenraum vor der Anfrage an.',servicesTitle:'Der passende Service für jede Fahrt',whyEyebrow:'WICHTIGE DETAILS',whyTitle:'Wir kümmern uns um die Details',arrivalTitle:'Zeit für eine ruhige Ankunft',arrivalDesc:'60 Minuten kostenloses Warten bei Flughafenabholungen.',miqatTitle:'Halt am Miqat',miqatDesc:'Kostenloser Halt von 30–45 Minuten auf geeigneten Miqat-Strecken.',familyTitle:'Komfort für Familien',familyDesc:'Kindersitze auf Anfrage erhältlich; wählen Sie nach Personen und Gepäck.',reviewTitle:'Erfahrungen unserer Gäste',reviewSubtitle:'Lesen Sie veröffentlichte Bewertungen vor Ihrer Buchungsanfrage.',guideHeading:'Hilfreiche Reiseinformationen'
  },
  tr: {
    stepsTitle:'Üç adımda rezervasyon talebi',interiorEyebrow:'ARAÇ İÇİ',interiorTitle:'Konfor yola çıkmadan başlar',interiorSubtitle:'Talebinizi göndermeden önce aracınızı seçin ve iç mekanını inceleyin.',servicesTitle:'Her yolculuğa uygun hizmet',whyEyebrow:'İNCE DÜŞÜNÜLMÜŞ AYRINTILAR',whyTitle:'Sizin için önemli olan ayrıntılar',arrivalTitle:'Varışta rahat zaman',arrivalDesc:'Havalimanı karşılamalarında 60 dakika ücretsiz bekleme.',miqatTitle:'Miqat molası',miqatDesc:'Uygun Miqat güzergâhlarında 30–45 dakika ücretsiz mola.',familyTitle:'Aile konforu',familyDesc:'Talep üzerine çocuk koltuğu; yolcu ve bagaja uygun araç seçimi.',reviewTitle:'Misafirlerimizin deneyimleri',reviewSubtitle:'Aracınızı seçmeden önce yayınlanmış konuk yorumlarını okuyun.',guideHeading:'Yolculuk öncesi rehberler'
  },
  hi: {
    stepsTitle:'तीन चरणों में यात्रा अनुरोध',interiorEyebrow:'वाहन के अंदर',interiorTitle:'आराम प्रस्थान से पहले शुरू होता है',interiorSubtitle:'अनुरोध भेजने से पहले वाहन चुनें और उसका केबिन देखें।',servicesTitle:'हर यात्रा के लिए सही सेवा',whyEyebrow:'महत्वपूर्ण विवरण',whyTitle:'आपकी ज़रूरतों का ध्यान',arrivalTitle:'हवाई अड्डे पर अतिरिक्त समय',arrivalDesc:'हवाई अड्डे पर पिकअप के लिए 60 मिनट मुफ्त प्रतीक्षा।',miqatTitle:'मीक़ात पड़ाव',miqatDesc:'योग्य मीक़ात मार्गों पर 30–45 मिनट का मुफ्त पड़ाव।',familyTitle:'परिवार का आराम',familyDesc:'अनुरोध पर चाइल्ड सीट उपलब्ध; यात्रियों और सामान के अनुसार वाहन चुनें।',reviewTitle:'हमारे मेहमानों के अनुभव',reviewSubtitle:'वाहन चुनने से पहले प्रकाशित समीक्षाएँ पढ़ें।',guideHeading:'यात्रा से पहले उपयोगी गाइड'
  }
};
