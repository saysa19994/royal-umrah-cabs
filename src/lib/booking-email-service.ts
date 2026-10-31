import { Locale } from '@/i18n/config';

export interface BookingEmailData {
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  routeName: string;
  vehicleName: string;
  pickupDateTime: string;
  passengers: number;
  luggage: number;
  finalPriceSAR: number;
  currency: string;
  finalPriceCurrency: number;
  paymentMethod: string;
  flightNumber?: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  language: Locale;
}

interface LocalizedCopy {
  subjectPending: string;
  subjectConfirmed: string;
  subjectCompleted: string;
  subjectCancelled: string;
  titlePending: string;
  titleConfirmed: string;
  titleCompleted: string;
  titleCancelled: string;
  greeting: string;
  pendingNotice: string;
  confirmedNotice: string;
  completedNotice: string;
  cancelledNotice: string;
  itinerarySummary: string;
  referenceLabel: string;
  routeLabel: string;
  vehicleLabel: string;
  dateTimeLabel: string;
  paxLuggageLabel: string;
  fareLabel: string;
  paymentPolicyLabel: string;
  paymentPolicyValue: string;
  supportHelp: string;
  companyFooter: string;
}

const EMAIL_I18N: Record<Locale, LocalizedCopy> = {
  ar: {
    subjectPending: 'تم استلام طلب حجزك بنجاح — ضيوف الرحمن VIP [رقم الحجز: {ref}]',
    subjectConfirmed: 'تم تأكيد حجز رحلتك الخاصة رسمياً — ضيوف الرحمن VIP [رقم الحجز: {ref}]',
    subjectCompleted: 'شكراً لاختيارك ضيوف الرحمن VIP — إيصال اكتمال الرحلة [رقم الحجز: {ref}]',
    subjectCancelled: 'إشعار إلغاء الحجز — ضيوف الرحمن VIP [رقم الحجز: {ref}]',
    titlePending: 'تم استلام طلب الحجز بنجاح',
    titleConfirmed: 'تم تأكيد حجز رحلتك الخاصة بنجاح',
    titleCompleted: 'اكتملت رحلتك بسلامة الله',
    titleCancelled: 'تم إلغاء الحجز بنجاح',
    greeting: 'أهلاً بك ضيفنا الكريم {name}،',
    pendingNotice: 'تم استلام طلب حجزك بنجاح وهو حالياً قيد التأكيد النهائي من قِبل فريق العمليات والتوزيع لدينا. سنقوم بتأكيد موعدك وتنسيق بيانات السائق خلال لحظات.',
    confirmedNotice: 'يسعدنا إبلاغك بأنه تم تأكيد حجزك رسمياً وتعيين السائق الخاص لرحلتك. سيكون السائق بانتظارك في الموعد والمكان المحددين حاملاً لوحة ترحيبية باسمك.',
    completedNotice: 'تقبل الله طاعاتكم ونسعد بخدمتكم دائماً في رحاب الحرمين الشريفين. نأمل أن تكون رحلتك مريحة وفاخرة.',
    cancelledNotice: 'نحيطكم علماً بأنه بناءً على طلبكم تم إلغاء الحجز الموضح أدناه بنجاح، ولا تترتب عليكم أي رسوم أو مستحقات مالية.',
    itinerarySummary: 'تفاصيل مسار الرحلة والسيارة المحجوزة',
    referenceLabel: 'رقم مرجع الحجز',
    routeLabel: 'المسار المطلوب',
    vehicleLabel: 'طراز السيارة الفاخرة',
    dateTimeLabel: 'موعد وتاريخ الانطلاق',
    paxLuggageLabel: 'سعة الركاب والحقائب',
    fareLabel: 'السعر الإجمالي المعتمد',
    paymentPolicyLabel: 'سياسة وطريقة الدفع المعتمدة',
    paymentPolicyValue: 'الدفع نقدًا مباشرة للسائق بعد الوصول وانتهاء الرحلة بالكامل (ريال سعودي أو دولار أمريكي) — صفر دفع مسبق.',
    supportHelp: 'خدمة العملاء متوفرة على مدار الساعة للرد على استفساراتكم عبر واتساب أو الهاتف.',
    companyFooter: 'ضيوف الرحمن VIP — خدمات النقل الخاص وسيارات الليموزين الملكية لضيوف الرحمن والمعتمرين بالمملكة العربية السعودية.',
  },
  en: {
    subjectPending: 'Your Booking Request Has Been Received — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectConfirmed: 'Your VIP Private Transfer Is Confirmed — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectCompleted: 'Thank You for Traveling With Duyuf Alrahman VIP — Journey Receipt [Ref: {ref}]',
    subjectCancelled: 'Booking Cancellation Notice — Duyuf Alrahman VIP [Ref: {ref}]',
    titlePending: 'Booking Request Successfully Received',
    titleConfirmed: 'Your Private Transfer Is Officially Confirmed',
    titleCompleted: 'Journey Completed Successfully',
    titleCancelled: 'Booking Cancelled Successfully',
    greeting: 'Dear Esteemed Guest {name},',
    pendingNotice: 'Your booking request has been successfully received and is currently pending confirmation by our team. Our operations dispatch is assigning your dedicated chauffeur.',
    confirmedNotice: 'We are pleased to inform you that your reservation is officially confirmed. Your executive chauffeur will await you at the scheduled location with a personalized welcome sign.',
    completedNotice: 'May your pilgrimage and travels be blessed. We sincerely thank you for choosing Duyuf Alrahman VIP for your luxury Saudi journey.',
    cancelledNotice: 'This is to inform you that your booking request below has been successfully cancelled. Zero charges or penalty fees apply.',
    itinerarySummary: 'Reservation & Journey Details',
    referenceLabel: 'Booking Reference',
    routeLabel: 'Selected Corridor',
    vehicleLabel: 'Executive Vehicle',
    dateTimeLabel: 'Pickup Date & Time',
    paxLuggageLabel: 'Passengers & Luggage',
    fareLabel: 'Guaranteed Total Fare',
    paymentPolicyLabel: 'Approved Payment Policy',
    paymentPolicyValue: 'Cash paid directly to the chauffeur after reaching destination and trip completion (SAR or USD) — zero advance deposit.',
    supportHelp: 'Our executive concierge is available 24/7 via WhatsApp and phone for immediate assistance.',
    companyFooter: 'Duyuf Alrahman VIP — Royal Saudi Chauffeur & VIP Transportation Services for Pilgrims and International Travelers.',
  },
  ms: {
    subjectPending: 'Permintaan Tempahan Anda Telah Diterima — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectConfirmed: 'Tempahan Pengangkutan VIP Anda Disahkan — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectCompleted: 'Terima Kasih Memilih Duyuf Alrahman VIP — Resit Perjalanan [Ref: {ref}]',
    subjectCancelled: 'Notis Pembatalan Tempahan — Duyuf Alrahman VIP [Ref: {ref}]',
    titlePending: 'Permintaan Tempahan Berjaya Diterima',
    titleConfirmed: 'Tempahan VIP Anda Telah Disahkan',
    titleCompleted: 'Perjalanan Selesai Dengan Selamat',
    titleCancelled: 'Tempahan Berjaya Dibatalkan',
    greeting: 'Salam sejahtera Tetamu Yang Dihormati {name},',
    pendingNotice: 'Permintaan tempahan anda telah berjaya diterima dan sedang menunggu pengesahan pasukan operasi kami.',
    confirmedNotice: 'Pemandu peribadi anda telah ditugaskan dan akan menunggu anda di lokasi yang dipersetujui.',
    completedNotice: 'Semoga Umrah anda mabrur. Terima kasih kerana memilih perkhidmatan pengangkutan VIP kami.',
    cancelledNotice: 'Tempahan anda telah dibatalkan tanpa sebarang yuran penalti.',
    itinerarySummary: 'Ringkasan Perjalanan & Kenderaan',
    referenceLabel: 'Rujukan Tempahan',
    routeLabel: 'Laluan',
    vehicleLabel: 'Model Kenderaan',
    dateTimeLabel: 'Tarikh & Masa',
    paxLuggageLabel: 'Penumpang & Bagasi',
    fareLabel: 'Tambang Tetap',
    paymentPolicyLabel: 'Dasar Pembayaran',
    paymentPolicyValue: 'Tunai kepada pemandu selepas tiba di destinasi (SAR atau USD) — tiada deposit pendahuluan.',
    supportHelp: 'Khidmat pelanggan 24/7 bersedia membantu anda melalui WhatsApp.',
    companyFooter: 'Duyuf Alrahman VIP — Pengangkutan Mewah Tetamu Allah di Arab Saudi.',
  },
  id: {
    subjectPending: 'Permintaan Reservasi Anda Telah Diterima — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectConfirmed: 'Reservasi VIP Anda Telah Dikonfirmasi — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectCompleted: 'Terima Kasih Memilih Duyuf Alrahman VIP — Tanda Terima Perjalanan [Ref: {ref}]',
    subjectCancelled: 'Pemberitahuan Pembatalan Reservasi — Duyuf Alrahman VIP [Ref: {ref}]',
    titlePending: 'Permintaan Reservasi Berjaya Diterima',
    titleConfirmed: 'Reservasi Anda Telah Dikonfirmasi Resmi',
    titleCompleted: 'Perjalanan Selesai Dengan Selamat',
    titleCancelled: 'Reservasi Berhasil Dibatalkan',
    greeting: 'Yang Terhormat Bapak/Ibu {name},',
    pendingNotice: 'Permintaan reservasi Anda telah berhasil kami terima dan saat ini sedang dalam proses konfirmasi akhir oleh tim operasional kami.',
    confirmedNotice: 'Reservasi Anda telah dikonfirmasi dan sopir pribadi eksekutif siap melayani perjalanan Anda.',
    completedNotice: 'Semoga ibadah Umrah Anda mabrur. Terima kasih atas kepercayaan Anda kepada Duyuf Alrahman VIP.',
    cancelledNotice: 'Reservasi Anda telah dibatalkan tanpa biaya apa pun.',
    itinerarySummary: 'Rincian Perjalanan & Armada',
    referenceLabel: 'Kode Referensi',
    routeLabel: 'Rute',
    vehicleLabel: 'Armada VIP',
    dateTimeLabel: 'Tanggal & Waktu',
    paxLuggageLabel: 'Penumpang & Koper',
    fareLabel: 'Tarif Tetap Terjamin',
    paymentPolicyLabel: 'Kebijakan Pembayaran',
    paymentPolicyValue: 'Tunai kepada sopir setelah tiba di tempat tujuan (SAR atau USD) — tanpa uang muka.',
    supportHelp: 'Layanan pelanggan 24 jam siap melayani Anda melalui WhatsApp.',
    companyFooter: 'Duyuf Alrahman VIP — Layanan Sopir & Transportasi Eksekutif Jamaah Umrah di Arab Saudi.',
  },
  ur: {
    subjectPending: 'آپ کی بکنگ کی درخواست موصول ہوگئی ہے — ضیوف الرحمن VIP [Ref: {ref}]',
    subjectConfirmed: 'آپ کی وی آئی پی بکنگ کی تصدیق ہوچکی ہے — ضیوف الرحمن VIP [Ref: {ref}]',
    subjectCompleted: 'سفر مکمل ہونے کی رسید — ضیوف الرحمن VIP [Ref: {ref}]',
    subjectCancelled: 'بکنگ منسوخی کی اطلاع — ضیوف الرحمن VIP [Ref: {ref}]',
    titlePending: 'بکنگ کی درخواست موصول ہوگئی',
    titleConfirmed: 'آپ کا نجی ٹرانسفر باقاعدہ تصدیق شدہ ہے',
    titleCompleted: 'سفر بخیر و عافیت مکمل ہوا',
    titleCancelled: 'بکنگ منسوخ کردی گئی',
    greeting: 'محترم معزز مہمان {name}،',
    pendingNotice: 'آپ کی بکنگ کی درخواست کامیابی سے موصول ہوگئی ہے اور فی الحال ہمارے آپریشنز عملے کی حتمی تصدیق کے منتظر ہے۔',
    confirmedNotice: 'ہمیں یہ بتاتے ہوئے خوشی ہو رہی ہے کہ آپ کی بکنگ کی تصدیق ہوگئی ہے اور آپ کا مخصوص ڈرائیور مقرر کردیا گیا ہے۔',
    completedNotice: 'اللہ تعالیٰ آپ کی عبادات قبول فرمائے۔ ضیوف الرحمن VIP کا انتخاب کرنے کا شکریہ۔',
    cancelledNotice: 'آپ کی بکنگ بغیر کسی فیس کے کامیابی سے منسوخ کردی گئی ہے۔',
    itinerarySummary: 'سفر اور گاڑی کی تفصیلات',
    referenceLabel: 'بکنگ حوالہ نمبر',
    routeLabel: 'راستہ',
    vehicleLabel: 'گاڑی کا ماڈل',
    dateTimeLabel: 'تاریخ اور وقت',
    paxLuggageLabel: 'مسافر اور سامان',
    fareLabel: 'مقررہ کرایہ',
    paymentPolicyLabel: 'ادائیگی کی پالیسی',
    paymentPolicyValue: 'سفر مکمل ہونے کے بعد ڈرائیور کو نقد ادائیگی (ریال یا ڈالر) — پیشگی رقم کی ضرورت نہیں۔',
    supportHelp: 'ہماری کسٹمر سروس واٹس ایپ پر 24 گھنٹے دستیاب ہے۔',
    companyFooter: 'ضيوف الرحمن VIP — سعودی عرب میں عمرہ زائرین کے لیے لگژری نجی ٹرانسپورٹ۔',
  },
  tr: {
    subjectPending: 'Rezervasyon Talebiniz Alındı — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectConfirmed: 'VIP Transferiniz Onaylandı — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectCompleted: 'Teşekkür Ederiz — Yolculuk Makbuzu [Ref: {ref}]',
    subjectCancelled: 'Rezervasyon İptal Bildirimi — Duyuf Alrahman VIP [Ref: {ref}]',
    titlePending: 'Rezervasyon Talebiniz Başarıyla Alındı',
    titleConfirmed: 'VIP Transferiniz Resmi Olarak Onaylandı',
    titleCompleted: 'Yolculuk Başarıyla Tamamlandı',
    titleCancelled: 'Rezervasyon İptal Edildi',
    greeting: 'Sayın Misafirimiz {name},',
    pendingNotice: 'Rezervasyon talebiniz başarıyla alınmış olup ekibimiz tarafından onay aşamasındadır.',
    confirmedNotice: 'Rezervasyonunuz onaylanmış ve özel şoförünüz atanmıştır.',
    completedNotice: 'Umreniz makbul olsun. Duyuf Alrahman VIP\'yi tercih ettiğiniz için teşekkür ederiz.',
    cancelledNotice: 'Rezervasyonunuz herhangi bir ücret kesintisi olmaksızın iptal edilmiştir.',
    itinerarySummary: 'Yolculuk ve Araç Bilgileri',
    referenceLabel: 'Rezervasyon No',
    routeLabel: 'Güzergah',
    vehicleLabel: 'Araç Modeli',
    dateTimeLabel: 'Tarih ve Saat',
    paxLuggageLabel: 'Yolcu ve Bagaj',
    fareLabel: 'Sabit Fiyat',
    paymentPolicyLabel: 'Ödeme Şartları',
    paymentPolicyValue: 'Yolculuk tamamlandıktan sonra şoföre nakit ödeme (SAR veya USD) — ön ödeme yok.',
    supportHelp: 'Müşteri hizmetlerimiz WhatsApp üzerinden 7/24 hizmetinizdedir.',
    companyFooter: 'Duyuf Alrahman VIP — Suudi Arabistan\'da Umre Ziyaretçileri İçin Lüks Özel Şoför Hizmeti.',
  },
  fr: {
    subjectPending: 'Votre Demande de Réservation a été Reçue — Duyuf Alrahman VIP [Réf: {ref}]',
    subjectConfirmed: 'Votre Transfert Privé VIP est Confirmé — Duyuf Alrahman VIP [Réf: {ref}]',
    subjectCompleted: 'Merci d’avoir Choisi Duyuf Alrahman VIP — Reçu de Trajet [Réf: {ref}]',
    subjectCancelled: 'Notification d’Annulation de Réservation — Duyuf Alrahman VIP [Réf: {ref}]',
    titlePending: 'Demande de Réservation Reçue avec Succès',
    titleConfirmed: 'Votre Réservation est Officiellement Confirmée',
    titleCompleted: 'Trajet Accompli avec Succès',
    titleCancelled: 'Réservation Annulée avec Succès',
    greeting: 'Cher Invité {name},',
    pendingNotice: 'Votre demande de réservation a été reçue avec succès et est en attente de confirmation par notre équipe.',
    confirmedNotice: 'Votre réservation est confirmée et votre chauffeur dédié est assigné.',
    completedNotice: 'Puisse votre pèlerinage être agréé. Merci pour votre confiance envers Duyuf Alrahman VIP.',
    cancelledNotice: 'Votre réservation a été annulée sans aucun frais.',
    itinerarySummary: 'Détails du Trajet et Véhicule',
    referenceLabel: 'Référence de Réservation',
    routeLabel: 'Itinéraire',
    vehicleLabel: 'Véhicule VIP',
    dateTimeLabel: 'Date et Heure',
    paxLuggageLabel: 'Passagers et Bagages',
    fareLabel: 'Tarif Fixe Garanti',
    paymentPolicyLabel: 'Modalités de Paiement',
    paymentPolicyValue: 'Paiement en espèces directement au chauffeur à l’arrivée (SAR ou USD) — aucun acompte.',
    supportHelp: 'Notre conciergerie est à votre disposition 24h/24 via WhatsApp.',
    companyFooter: 'Duyuf Alrahman VIP — Transport Privé Royal et Chauffeur de Luxe en Arabie Saoudite.',
  },
  es: {
    subjectPending: 'Su Solicitud de Reserva Ha Sido Recibida — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectConfirmed: 'Su Traslado VIP Privado Está Confirmado — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectCompleted: 'Gracias por Elegir Duyuf Alrahman VIP — Recibo de Viaje [Ref: {ref}]',
    subjectCancelled: 'Aviso de Cancelación de Reserva — Duyuf Alrahman VIP [Ref: {ref}]',
    titlePending: 'Solicitud de Reserva Recibida con Éxito',
    titleConfirmed: 'Su Traslado Privado Está Oficialmente Confirmado',
    titleCompleted: 'Viaje Completado con Éxito',
    titleCancelled: 'Reserva Cancelada con Éxito',
    greeting: 'Estimado Huésped {name},',
    pendingNotice: 'Su solicitud de reserva ha sido recibida y está pendiente de confirmación por nuestro equipo de operaciones.',
    confirmedNotice: 'Su reserva está confirmada y su chofer privado ha sido asignado.',
    completedNotice: 'Gracias por viajar con Duyuf Alrahman VIP.',
    cancelledNotice: 'Su reserva ha sido cancelada sin penalización.',
    itinerarySummary: 'Detalles del Viaje y Vehículo',
    referenceLabel: 'Referencia de Reserva',
    routeLabel: 'Ruta',
    vehicleLabel: 'Vehículo VIP',
    dateTimeLabel: 'Fecha y Hora',
    paxLuggageLabel: 'Pasajeros y Equipaje',
    fareLabel: 'Tarifa Fija Garantizada',
    paymentPolicyLabel: 'Condiciones de Pago',
    paymentPolicyValue: 'Pago en efectivo directo al chofer al llegar a destino (SAR o USD) — sin depósito previo.',
    supportHelp: 'Atención al cliente 24/7 disponible a través de WhatsApp.',
    companyFooter: 'Duyuf Alrahman VIP — Transporte Privado Ejecutivo en Arabia Saudita.',
  },
  de: {
    subjectPending: 'Ihre Buchungsanfrage ist eingegangen — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectConfirmed: 'Ihr VIP-Transfer ist bestätigt — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectCompleted: 'Vielen Dank — Reisebeleg [Ref: {ref}]',
    subjectCancelled: 'Stornierungsbestätigung — Duyuf Alrahman VIP [Ref: {ref}]',
    titlePending: 'Buchungsanfrage erfolgreich erhalten',
    titleConfirmed: 'Ihre VIP-Reservierung ist bestätigt',
    titleCompleted: 'Fahrt erfolgreich abgeschlossen',
    titleCancelled: 'Buchung erfolgreich storniert',
    greeting: 'Sehr geehrter Gast {name},',
    pendingNotice: 'Ihre Buchungsanfrage ist eingegangen und wird derzeit von unserem Dispositionsteam geprüft.',
    confirmedNotice: 'Ihre Buchung ist bestätigt und Ihr Chauffeur steht für Sie bereit.',
    completedNotice: 'Vielen Dank, dass Sie mit Duyuf Alrahman VIP gereist sind.',
    cancelledNotice: 'Ihre Buchung wurde kostenlos storniert.',
    itinerarySummary: 'Reisedetails & Fahrzeug',
    referenceLabel: 'Buchungsnummer',
    routeLabel: 'Strecke',
    vehicleLabel: 'Fahrzeugmodell',
    dateTimeLabel: 'Datum & Uhrzeit',
    paxLuggageLabel: 'Passagiere & Gepäck',
    fareLabel: 'Garantierter Festpreis',
    paymentPolicyLabel: 'Zahlungsbedingungen',
    paymentPolicyValue: 'Barzahlung direkt beim Chauffeur am Zielort (SAR oder USD) — keine Vorauszahlung.',
    supportHelp: 'Unser Kundenservice steht Ihnen rund um die Uhr per WhatsApp zur Verfügung.',
    companyFooter: 'Duyuf Alrahman VIP — Exklusiver Chauffeurservice in Saudi-Arabien.',
  },
  hi: {
    subjectPending: 'आपका बुकिंग अनुरोध प्राप्त हुआ — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectConfirmed: 'आपकी वीआईपी बुकिंग की पुष्टि हो गई है — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectCompleted: 'यात्रा पूर्ण रसीद — Duyuf Alrahman VIP [Ref: {ref}]',
    subjectCancelled: 'बुकिंग रद्दीकरण सूचना — Duyuf Alrahman VIP [Ref: {ref}]',
    titlePending: 'बुकिंग अनुरोध सफलतापूर्वक प्राप्त हुआ',
    titleConfirmed: 'आपकी निजी यात्रा की पुष्टि हो गई है',
    titleCompleted: 'यात्रा सफलतापूर्वक संपन्न हुई',
    titleCancelled: 'बुकिंग सफलतापूर्वक रद्द कर दी गई',
    greeting: 'आदरणीय अतिथि {name},',
    pendingNotice: 'आपका बुकिंग अनुरोध प्राप्त हो गया है और हमारी टीम द्वारा अंतिम पुष्टि की प्रक्रिया में है।',
    confirmedNotice: 'आपकी बुकिंग की पुष्टि हो गई है और आपका समर्पित ड्राइवर निर्धारित कर दिया गया है।',
    completedNotice: 'Duyuf Alrahman VIP चुनने के लिए धन्यवाद।',
    cancelledNotice: 'आपकी बुकिंग बिना किसी शुल्क के रद्द कर दी गई है।',
    itinerarySummary: 'यात्रा और वाहन विवरण',
    referenceLabel: 'बुकिंग संदर्भ संख्या',
    routeLabel: 'मार्ग',
    vehicleLabel: 'वाहन मॉडल',
    dateTimeLabel: 'दिनांक और समय',
    paxLuggageLabel: 'यात्री और सामान',
    fareLabel: 'निश्चित किराया',
    paymentPolicyLabel: 'भुगतान नीति',
    paymentPolicyValue: 'गंतव्य पर पहुंचने के बाद सीधे ड्राइवर को नकद भुगतान (SAR या USD) — शून्य अग्रिम जमा।',
    supportHelp: 'हमारी ग्राहक सेवा व्हाट्सएप पर 24/7 उपलब्ध है।',
    companyFooter: 'Duyuf Alrahman VIP — सऊदी अरब में तीर्थयात्रियों के लिए लक्जरी निजी परिवहन सेवा।',
  },
};

function escapeHtml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function buildCustomerEmailHtml(data: BookingEmailData): { subject: string; html: string } {
  const loc = EMAIL_I18N[data.language] || EMAIL_I18N.en;
  const isRtl = data.language === 'ar' || data.language === 'ur';

  let subject = loc.subjectPending.replace('{ref}', data.reference);
  let title = loc.titlePending;
  let notice = loc.pendingNotice;
  let badgeColor = '#D7B76C'; // Warm Gold
  let badgeText = 'PENDING CONFIRMATION / قيد المراجعة والتأكيد';

  if (data.status === 'confirmed') {
    subject = loc.subjectConfirmed.replace('{ref}', data.reference);
    title = loc.titleConfirmed;
    notice = loc.confirmedNotice;
    badgeColor = '#188567'; // Emerald
    badgeText = 'CONFIRMED / تم التأكيد';
  } else if (data.status === 'completed') {
    subject = loc.subjectCompleted.replace('{ref}', data.reference);
    title = loc.titleCompleted;
    notice = loc.completedNotice;
    badgeColor = '#C5A15D';
    badgeText = 'COMPLETED / مكتملة';
  } else if (data.status === 'cancelled') {
    subject = loc.subjectCancelled.replace('{ref}', data.reference);
    title = loc.titleCancelled;
    notice = loc.cancelledNotice;
    badgeColor = '#E11D48';
    badgeText = 'CANCELLED / ملغي';
  }

  const html = `
    <!DOCTYPE html>
    <html dir="${isRtl ? 'rtl' : 'ltr'}" lang="${data.language}">
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; padding: 0; background-color: #101827; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'IBM Plex Sans Arabic', sans-serif; color: #182235; }
        .wrapper { max-width: 640px; margin: 30px auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E8E3DA; box-shadow: 0 10px 40px rgba(0,0,0,0.4); }
        .header { background: linear-gradient(135deg, #101827 0%, #111C30 100%); padding: 32px 28px; text-align: center; border-bottom: 2px solid #C5A15D; }
        .brand { color: #F7F5F0; font-size: 24px; font-weight: 800; letter-spacing: 1px; margin: 0; }
        .brand-sub { color: #C5A15D; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; margin-top: 6px; }
        .body { padding: 32px 28px; background: #F7F5F0; }
        .badge { display: inline-block; padding: 6px 14px; border-radius: 9999px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #FFFFFF; background-color: ${badgeColor}; margin-bottom: 16px; }
        .greeting { font-size: 16px; font-weight: bold; color: #101827; margin-bottom: 12px; }
        .notice-card { background: #FFFFFF; border: 1px solid #E8E3DA; border-left: ${isRtl ? 'none' : '4px solid ' + badgeColor}; border-right: ${isRtl ? '4px solid ' + badgeColor : 'none'}; padding: 18px 20px; border-radius: 10px; font-size: 14px; line-height: 1.6; color: #182235; margin-bottom: 24px; }
        .details-table { width: 100%; border-collapse: collapse; background: #FFFFFF; border: 1px solid #E8E3DA; border-radius: 12px; overflow: hidden; margin-bottom: 24px; }
        .details-table td { padding: 14px 18px; border-bottom: 1px solid #F0ECE4; font-size: 13px; }
        .details-table tr:last-child td { border-bottom: none; }
        .label { color: #687386; font-weight: 600; width: 40%; }
        .value { color: #101827; font-weight: 700; text-align: ${isRtl ? 'left' : 'right'}; }
        .fare-row td { background: #FDFBF7; }
        .fare-value { color: #188567; font-size: 18px; font-weight: 900; }
        .policy-box { background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 10px; padding: 14px 18px; margin-bottom: 24px; font-size: 12px; line-height: 1.5; color: #92400E; }
        .policy-title { font-weight: 800; display: block; margin-bottom: 4px; color: #78350F; }
        .footer { background: #101827; padding: 24px 28px; text-align: center; color: #687386; font-size: 12px; line-height: 1.6; }
        .footer a { color: #C5A15D; text-decoration: none; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <h1 class="brand">DUYUF ALRAHMAN VIP</h1>
          <div class="brand-sub">ضيوف الرحمن للنقل الخاص الملكي</div>
        </div>
        <div class="body">
          <div style="text-align: center;">
            <span class="badge">${badgeText}</span>
            <h2 style="color: #101827; font-size: 20px; margin: 0 0 16px 0;">${title}</h2>
          </div>
          <div class="greeting">${loc.greeting.replace('{name}', escapeHtml(data.customerName))}</div>
          <div class="notice-card">${notice}</div>

          <h3 style="font-size: 14px; font-weight: 800; color: #101827; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px 0;">${loc.itinerarySummary}</h3>
          <table class="details-table">
            <tr>
              <td class="label">${loc.referenceLabel}</td>
              <td class="value" style="font-family: monospace; letter-spacing: 1px; color: #C5A15D;">#${escapeHtml(data.reference)}</td>
            </tr>
            <tr>
              <td class="label">${loc.routeLabel}</td>
              <td class="value">${escapeHtml(data.routeName)}</td>
            </tr>
            <tr>
              <td class="label">${loc.vehicleLabel}</td>
              <td class="value">${escapeHtml(data.vehicleName)}</td>
            </tr>
            <tr>
              <td class="label">${loc.dateTimeLabel}</td>
              <td class="value">${escapeHtml(data.pickupDateTime)}</td>
            </tr>
            <tr>
              <td class="label">${loc.paxLuggageLabel}</td>
              <td class="value">${data.passengers} Pax / ${data.luggage} Bags</td>
            </tr>
            ${data.flightNumber ? `
            <tr>
              <td class="label">Flight Number</td>
              <td class="value">${escapeHtml(data.flightNumber)}</td>
            </tr>` : ''}
            <tr class="fare-row">
              <td class="label">${loc.fareLabel}</td>
              <td class="value fare-value">${data.finalPriceSAR} SAR ${data.currency && data.currency !== 'SAR' ? `(~${data.finalPriceCurrency} ${data.currency})` : ''}</td>
            </tr>
          </table>

          <div class="policy-box">
            <span class="policy-title">✓ ${loc.paymentPolicyLabel}</span>
            ${loc.paymentPolicyValue}
          </div>

          <p style="font-size: 13px; color: #687386; text-align: center; margin: 20px 0 0 0;">
            ${loc.supportHelp}
          </p>
        </div>
        <div class="footer">
          <p style="margin: 0 0 8px 0; color: #F7F5F0; font-weight: 600;">${loc.companyFooter}</p>
          <p style="margin: 0;">WhatsApp 24/7: <a href="https://wa.me/966567588261">+966 56 758 8261</a> | Website: <a href="https://duyufalrahmanvip.com">duyufalrahmanvip.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return { subject, html };
}

export function buildCompanyNotificationHtml(data: BookingEmailData): { subject: string; html: string } {
  const subject = `🚨 New VIP Booking Received — Ref: #${data.reference} — ${data.routeName}`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0D1117; color: #F0F6FC; border-radius: 12px; border: 1px solid #30363D;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #C5A15D; padding-bottom: 16px; margin-bottom: 20px;">
        <h2 style="color: #C5A15D; margin: 0; font-size: 20px;">🚨 New VIP Booking Request</h2>
        <span style="font-family: monospace; font-size: 14px; background: #161B22; padding: 4px 10px; border-radius: 6px; border: 1px solid #C5A15D;">#${escapeHtml(data.reference)}</span>
      </div>

      <div style="background: #161B22; border: 1px solid #30363D; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <h3 style="color: #58A6FF; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase;">Customer Information</h3>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Name:</strong> ${escapeHtml(data.customerName)}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Phone:</strong> <a href="tel:${escapeHtml(data.customerPhone)}" style="color: #58A6FF;">${escapeHtml(data.customerPhone)}</a> (<a href="https://wa.me/${encodeURIComponent(data.customerPhone.replace(/[^0-9]/g, ''))}" style="color: #2EA043;">WhatsApp</a>)</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Email:</strong> ${escapeHtml(data.customerEmail || 'Not provided')}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Language:</strong> ${data.language.toUpperCase()}</p>
      </div>

      <div style="background: #161B22; border: 1px solid #30363D; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <h3 style="color: #58A6FF; margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase;">Journey & Vehicle Specifications</h3>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Route:</strong> ${escapeHtml(data.routeName)}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Vehicle:</strong> ${escapeHtml(data.vehicleName)}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Pickup Date & Time:</strong> ${escapeHtml(data.pickupDateTime)}</p>
        <p style="margin: 6px 0; font-size: 14px;"><strong>Passengers / Luggage:</strong> ${data.passengers} Pax / ${data.luggage} Bags</p>
        ${data.flightNumber ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Flight:</strong> ${escapeHtml(data.flightNumber)}</p>` : ''}
        ${data.specialRequests ? `<p style="margin: 6px 0; font-size: 14px;"><strong>Notes:</strong> ${escapeHtml(data.specialRequests)}</p>` : ''}
        <p style="margin: 12px 0 0 0; font-size: 18px; color: #2EA043;"><strong>Total Fare:</strong> ${data.finalPriceSAR} SAR</p>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="https://duyufalrahmanvip.com/admin/bookings" style="display: inline-block; background: #C5A15D; color: #101827; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px;">Open Dispatch Admin Console</a>
      </div>
    </div>
  `;

  return { subject, html };
}

export async function dispatchBookingEmails(data: BookingEmailData): Promise<{ customerSent: boolean; companySent: boolean; error?: string }> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.BOOKING_FROM_EMAIL || 'Duyuf Alrahman VIP <booking@duyufalrahmanvip.com>';
  const companyEmail = process.env.BOOKING_NOTIFICATION_EMAIL || 'vip@duyufalrahmanvip.com';

  let customerSent = false;
  let companySent = false;

  // 1. Dispatch Customer Email if customer provided email
  if (data.customerEmail && resendApiKey) {
    try {
      const { subject, html } = buildCustomerEmailHtml(data);
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [data.customerEmail],
          subject,
          html,
        }),
      });
      customerSent = res.ok;
      if (!res.ok) {
        console.error('[EmailService] Customer email dispatch failed with status:', res.status);
      }
    } catch (err: any) {
      console.error('[EmailService] Exception dispatching customer email:', err?.message);
    }
  }

  // 2. Dispatch Company Operations Notification
  if (companyEmail && resendApiKey) {
    try {
      const { subject, html } = buildCompanyNotificationHtml(data);
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [companyEmail],
          subject,
          html,
        }),
      });
      companySent = res.ok;
      if (!res.ok) {
        console.error('[EmailService] Company email dispatch failed with status:', res.status);
      }
    } catch (err: any) {
      console.error('[EmailService] Exception dispatching company email:', err?.message);
    }
  }

  if (!resendApiKey) {
    console.info(`[EmailService DEV] Resend API key not configured. Mocking dispatch for reference #${data.reference}.`);
    return { customerSent: true, companySent: true };
  }

  return { customerSent, companySent };
}
