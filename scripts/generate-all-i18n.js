const fs = require('fs');
const path = require('path');

const en = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/i18n/dictionaries/en.json'), 'utf-8'));
const ar = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/i18n/dictionaries/ar.json'), 'utf-8'));
const ms = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/i18n/dictionaries/ms.json'), 'utf-8'));

function createFilteredDictionary(base) {
  // Ensure the target dictionary has exactly the keys of en.json
  const result = {};
  for (const section of Object.keys(en)) {
    result[section] = {};
    for (const key of Object.keys(en[section])) {
      result[section][key] = base[section]?.[key] !== undefined ? base[section][key] : en[section][key];
    }
  }
  return result;
}

// 1. Indonesian (id)
const id = createFilteredDictionary(ms);
id.meta.brand = "Royal Umrah Cabs";
id.meta.brandSub = "Transportasi Jamaah VIP";
id.nav.routes = "Rute";
id.nav.services = "Layanan";
id.nav.fleet = "Armada";
id.nav.pricing = "Tarif";
id.nav.guides = "Panduan";
id.nav.about = "Tentang Kami";
id.nav.contact = "Kontak";
id.nav.bookNow = "Pesan Sekarang";
id.nav.trackBooking = "Lacak Pesanan";
id.nav.account = "Mitra Travel";

id.trust_strip.fixedPrices = "Tarif Tetap & Pasti";
id.trust_strip.flightTracking = "Pelacakan Kedatangan Pesawat";
id.trust_strip.payOnArrival = "Bayar Tunai/Kartu Saat Tiba";
id.trust_strip.support247 = "Bantuan WhatsApp 24/7";
id.trust_strip.googleReviews = "4.9/5 Berdasarkan Ulasan Jamaah";

id.hero.eyebrow = "Layanan Sopir Eksekutif Umrah & Haji";
id.hero.titlePart1 = "Transportasi Privat Umrah";
id.hero.titlePart2 = "Kenyamanan Ibadah Keluarga";
id.hero.description = "Layanan penjemputan terminal bandara dan transportasi antarkota di Jeddah, Makkah, dan Madinah. Tanpa uang muka, pembatalan gratis.";
id.hero.ctaBook = "Cek Tarif & Pesan";
id.hero.ctaFleet = "Lihat Armada";

id.booking_card.title = "Hitung Tarif & Pesan Langsung";
id.booking_card.subtitle = "Tarif transparan dalam mata uang lokal Anda. Tanpa pembayaran di muka.";
id.booking_card.pickupLabel = "Lokasi Jemput";
id.booking_card.dropoffLabel = "Tujuan Antar";
id.booking_card.dateLabel = "Tanggal Jemput";
id.booking_card.timeLabel = "Waktu Jemput";
id.booking_card.passengersLabel = "Jumlah Penumpang";
id.booking_card.luggageLabel = "Jumlah Koper";
id.booking_card.vehicleLabel = "Pilihan Armada";
id.booking_card.anyVehicle = "Pilih Jenis Armada";
id.booking_card.bookOnline = "Pesan Online";
id.booking_card.continueWhatsApp = "Lanjut via WhatsApp";
id.booking_card.quoteNeeded = "Hubungi kami untuk penawaran";
id.booking_card.microCancellation = "Pembatalan gratis (24 jam)";
id.booking_card.microPayArrival = "Bayar saat tiba di hotel";
id.booking_card.microNoHidden = "Tanpa biaya tersembunyi";
id.booking_card.microAllTolls = "Semua biaya tol termasuk";

id.steps.sectionPill = "Proses Mudah";
id.steps.heading = "3 Langkah Mudah";
id.steps.headingHighlight = "Perjalanan Anda";
id.steps.subtitle = "Pemesanan cepat tanpa kerumitan untuk kenyamanan ibadah Anda di Tanah Suci.";
id.steps.step1Title = "Pilih Rute & Armada";
id.steps.step1Desc = "Tentukan titik penjemputan, tujuan, tanggal dan pilih armada yang sesuai untuk keluarga Anda.";
id.steps.step2Title = "Konfirmasi Instan";
id.steps.step2Desc = "Dapatkan kode referensi pesanan dan rincian konfirmasi langsung melalui WhatsApp.";
id.steps.step3Title = "Berangkat & Bayar Saat Tiba";
id.steps.step3Desc = "Sopir menyambut Anda tepat waktu. Lakukan pembayaran saat tiba di hotel dengan tenang.";
id.steps.ctaButton = "Mulai Pemesanan";

id.fleet.sectionPill = "Armada Kami";
id.fleet.heading = "Armada VIP Makkah & Madinah";
id.fleet.subtitle = "Kendaraan bersih, dingin, dan luas untuk kenyamanan seluruh keluarga.";
id.fleet.seatsLabel = "Kursi";
id.fleet.bagsLabel = "Koper Besar";
id.fleet.detailsButton = "Rincian";
id.fleet.bookNowButton = "Pesan Sekarang";
id.fleet.amenityAc = "Pendingin Udara AC Dingin";
id.fleet.amenityComfort = "Kursi Nyaman & Luas";
id.fleet.amenityLuggage = "Kapasitas Bagasi Koper Besar";

id.promo_bar.text = "Musim Umrah 2026: Pesan transportasi privat Anda tanpa uang muka dan pembatalan gratis 24 jam.";
id.promo_bar.btn = "Pesan Sekarang";

fs.writeFileSync(path.join(__dirname, '../src/i18n/dictionaries/id.json'), JSON.stringify(id, null, 2), 'utf-8');

// 2. Urdu (ur)
const ur = createFilteredDictionary(ar);
ur.meta.brand = "رائل عمرہ کیبز";
ur.meta.brandSub = "وی آئی پی عمرہ ٹرانسپورٹ";
ur.nav.routes = "روٹس";
ur.nav.services = "خدمات";
ur.nav.fleet = "گاڑیاں";
ur.nav.pricing = "کرایہ جات";
ur.nav.guides = "رہنمائی";
ur.nav.about = "ہمارے بارے میں";
ur.nav.contact = "رابطہ کریں";
ur.nav.bookNow = "ابھی بک کریں";
ur.nav.trackBooking = "بکنگ ٹریک کریں";
ur.nav.account = "ٹریول ایجنٹ پورٹل";

ur.trust_strip.fixedPrices = "فکسڈ اور حتمی کرایہ";
ur.trust_strip.flightTracking = "فلائٹ کی لائیو مانیٹرنگ";
ur.trust_strip.payOnArrival = "ہوٹل پہنچ کر ادائیگی";
ur.trust_strip.support247 = "24/7 واٹس ایپ سپورٹ";
ur.trust_strip.googleReviews = "4.9/5 حجاج و معتمرین کے جائزے";

ur.hero.eyebrow = "مکہ اور مدینہ کے لیے پرائیویٹ وی آئی پی شوفر سروس";
ur.hero.titlePart1 = "عمرہ پرائیویٹ ٹرانسپورٹ";
ur.hero.titlePart2 = "خاندان کے لیے مکمل سکون";
ur.hero.description = "جدہ ایئرپورٹ، مکہ مکرمہ اور مدینہ منورہ کے درمیان پرائیویٹ فیملی ٹرانسپورٹ۔ بغیر ایڈوانس، فکسڈ ریٹ، 24 گھنٹے پہلے مفت منسوخی۔";
ur.hero.ctaBook = "کرایہ معلوم کریں اور بک کریں";
ur.hero.ctaFleet = "گاڑیاں دیکھیں";

ur.booking_card.title = "کرایہ معلوم کریں اور فوری بک کریں";
ur.booking_card.subtitle = "شفاف فکسڈ ریٹ۔ کوئی ایڈوانس پیشگی ادائیگی درکار نہیں۔";
ur.booking_card.pickupLabel = "پک اپ کا مقام";
ur.booking_card.dropoffLabel = "منزل / ڈراپ آف";
ur.booking_card.dateLabel = "تاریخ";
ur.booking_card.timeLabel = "وقت";
ur.booking_card.passengersLabel = "مسافروں کی تعداد";
ur.booking_card.luggageLabel = "سامان / بیگز";
ur.booking_card.vehicleLabel = "گاڑی کا انتخاب";
ur.booking_card.anyVehicle = "گاڑی کی کلاس منتخب کریں";
ur.booking_card.bookOnline = "آن لائن بک کریں";
ur.booking_card.continueWhatsApp = "واٹس ایپ پر جاری رکھیں";
ur.booking_card.quoteNeeded = "کرایہ معلوم کرنے کے لیے رابطہ کریں";
ur.booking_card.microCancellation = "مفت منسوخی (24 گھنٹے پہلے)";
ur.booking_card.microPayArrival = "ہوٹل پہنچ کر ادائیگی";
ur.booking_card.microNoHidden = "کوئی خفیہ چارجز نہیں";
ur.booking_card.microAllTolls = "تمام ٹیکس اور ٹولز شامل";

ur.steps.sectionPill = "آسان طریقہ کار";
ur.steps.heading = "3 آسان مراحل میں";
ur.steps.headingHighlight = "بکنگ مکمل کریں";
ur.steps.subtitle = "بغیر کسی پریشانی کے معتمرین کے لیے پرسکون اور فوری سروس۔";
ur.steps.step1Title = "روٹ اور گاڑی منتخب کریں";
ur.steps.step1Desc = "اپنی تاریخ، پک اپ کا مقام اور اپنے خاندان کے لیے مناسب گاڑی کا انتخاب کریں۔";
ur.steps.step2Title = "فوری تصدیق حاصل کریں";
ur.steps.step2Desc = "ریفرنس کوڈ اور بکنگ کی تمام تفصیلات فوری طور پر واٹس ایپ پر موصول کریں۔";
ur.steps.step3Title = "سفر کریں اور آمد پر ادا کریں";
ur.steps.step3Desc = "ڈرائیور وقت پر استقبال کرے گا۔ ہوٹل پہنچ کر نقدی یا کارڈ کے ذریعے کرایہ ادا کریں۔";
ur.steps.ctaButton = "ابھی بکنگ شروع کریں";

ur.fleet.sectionPill = "ہمارا فلیٹ";
ur.fleet.heading = "مکہ و مدینہ کے لیے پرائیویٹ گاڑیاں";
ur.fleet.subtitle = "مکمل ایئر کنڈیشنڈ، کشادہ اور آرام دہ گاڑیاں ضیوف الرحمن کے لیے۔";
ur.fleet.seatsLabel = "سیٹیں";
ur.fleet.bagsLabel = "بڑے بیگز";
ur.fleet.detailsButton = "تفصیلات";
ur.fleet.bookNowButton = "ابھی بک کریں";
ur.fleet.amenityAc = "بہترین ٹھنڈا ایئر کنڈیشننگ";
ur.fleet.amenityComfort = "انتہائی آرام دہ کشادہ نشستیں";
ur.fleet.amenityLuggage = "سامان کے لیے وسیع ڈگی";

ur.promo_bar.text = "عمرہ 2026: بغیر کسی ایڈوانس کے پرائیویٹ ٹرانسپورٹ بک کریں، 24 گھنٹے پہلے مفت منسوخی۔";
ur.promo_bar.btn = "ابھی محفوظ کریں";

fs.writeFileSync(path.join(__dirname, '../src/i18n/dictionaries/ur.json'), JSON.stringify(ur, null, 2), 'utf-8');

// 3. French (fr)
const fr = createFilteredDictionary(en);
fr.meta.brand = "Royal Umrah Cabs";
fr.meta.brandSub = "Transport Chauffeur Privé Omra";
fr.nav.routes = "Itinéraires";
fr.nav.services = "Services";
fr.nav.fleet = "Flotte";
fr.nav.pricing = "Tarifs";
fr.nav.guides = "Guides";
fr.nav.about = "À Propos";
fr.nav.contact = "Contact";
fr.nav.bookNow = "Réserver";
fr.nav.trackBooking = "Suivre Réservation";
fr.nav.account = "Partenaires Agences";

fr.trust_strip.fixedPrices = "Tarifs Fixes & Transparents";
fr.trust_strip.flightTracking = "Suivi des Vols en Direct";
fr.trust_strip.payOnArrival = "Paiement à l'Arrivée (Cash/CB)";
fr.trust_strip.support247 = "Assistance WhatsApp 24/7";
fr.trust_strip.googleReviews = "4.9/5 Avis Google Pèlerins";

fr.hero.eyebrow = "Service Chauffeur Privé Omra & Hajj";
fr.hero.titlePart1 = "Transport Privé Omra";
fr.hero.titlePart2 = "Sérénité & Confort Familial";
fr.hero.description = "Accueil à l'aéroport de Djeddah et transferts interurbains vers La Mecque et Médine. Aucun prépaiement requis, annulation gratuite.";
fr.hero.ctaBook = "Consulter le Tarif & Réserver";
fr.hero.ctaFleet = "Voir Notre Flotte";

fr.booking_card.title = "Calculer le Tarif & Réserver";
fr.booking_card.subtitle = "Prix fixes transparents dans votre devise locale. Aucun paiement d'avance requis.";
fr.booking_card.pickupLabel = "Lieu de Prise en Charge";
fr.booking_card.dropoffLabel = "Destination";
fr.booking_card.dateLabel = "Date de Prise en Charge";
fr.booking_card.timeLabel = "Heure";
fr.booking_card.passengersLabel = "Passagers";
fr.booking_card.luggageLabel = "Nombre de Bagages";
fr.booking_card.vehicleLabel = "Choix du Véhicule";
fr.booking_card.anyVehicle = "Sélectionner la Catégorie";
fr.booking_card.bookOnline = "Réserver en Ligne";
fr.booking_card.continueWhatsApp = "Continuer sur WhatsApp";
fr.booking_card.quoteNeeded = "Contactez-nous pour un devis";
fr.booking_card.microCancellation = "Annulation gratuite (24h)";
fr.booking_card.microPayArrival = "Paiement à l'arrivée à l'hôtel";
fr.booking_card.microNoHidden = "Zéro frais cachés";
fr.booking_card.microAllTolls = "Tous péages inclus";

fr.fleet.sectionPill = "Notre Flotte";
fr.fleet.heading = "Flotte VIP La Mecque & Médine";
fr.fleet.subtitle = "Véhicules récents, impeccables et climatisés pour les invités de Dieu.";
fr.fleet.seatsLabel = "Sièges";
fr.fleet.bagsLabel = "Grands Bagages";
fr.fleet.detailsButton = "Détails";
fr.fleet.bookNowButton = "Réserver";
fr.fleet.amenityAc = "Climatisation Haute Performance";
fr.fleet.amenityComfort = "Sièges Confortables & Spacieux";
fr.fleet.amenityLuggage = "Espace Bagages Généreux";

fr.promo_bar.text = "Saison Omra 2026 : Réservez votre chauffeur privé sans avance et avec annulation sans frais.";
fr.promo_bar.btn = "Réserver";

fs.writeFileSync(path.join(__dirname, '../src/i18n/dictionaries/fr.json'), JSON.stringify(fr, null, 2), 'utf-8');

// 4. Spanish (es)
const es = createFilteredDictionary(fr);
es.meta.brand = "Royal Umrah Cabs";
es.meta.brandSub = "Transporte Privado para Umrah";
es.nav.routes = "Rutas";
es.nav.services = "Servicios";
es.nav.fleet = "Flota";
es.nav.pricing = "Precios";
es.nav.guides = "Guías";
es.nav.about = "Nosotros";
es.nav.contact = "Contacto";
es.nav.bookNow = "Reservar";
es.nav.trackBooking = "Seguir Reserva";
es.nav.account = "Agencias Colaboradoras";

es.trust_strip.fixedPrices = "Precios Fijos y Transparentes";
es.trust_strip.flightTracking = "Seguimiento de Vuelos en Vivo";
es.trust_strip.payOnArrival = "Pago a la Llegada (Efectivo/Tarjeta)";
es.trust_strip.support247 = "Atención WhatsApp 24/7";
es.trust_strip.googleReviews = "4.9/5 Reseñas de Peregrinos";

es.hero.eyebrow = "Servicio de Chófer Privado Umrah y Hajj";
es.hero.titlePart1 = "Transporte Privado Umrah";
es.hero.titlePart2 = "Tranquilidad y Confort Familiar";
es.hero.description = "Recepción en el aeropuerto de Yeda y traslados directos hacia La Meca y Medina. Sin prepago requerido, cancelación gratuita.";
es.hero.ctaBook = "Calcular Precio y Reservar";
es.hero.ctaFleet = "Ver Nuestra Flota";

es.booking_card.title = "Calcular Precio y Reservar al Instante";
es.booking_card.subtitle = "Tarifas transparentes sin anticipos requeridos.";
es.booking_card.pickupLabel = "Lugar de Recogida";
es.booking_card.dropoffLabel = "Destino";
es.booking_card.dateLabel = "Fecha de Recogida";
es.booking_card.timeLabel = "Hora";
es.booking_card.passengersLabel = "Pasajeros";
es.booking_card.luggageLabel = "Maletas Grandes";
es.booking_card.vehicleLabel = "Vehículo";
es.booking_card.anyVehicle = "Seleccionar Categoría";
es.booking_card.bookOnline = "Reservar Online";
es.booking_card.continueWhatsApp = "Continuar en WhatsApp";
es.booking_card.quoteNeeded = "Contáctenos para presupuesto";
es.booking_card.microCancellation = "Cancelación gratuita (24h)";
es.booking_card.microPayArrival = "Pago al llegar al hotel";
es.booking_card.microNoHidden = "Sin costes ocultos";
es.booking_card.microAllTolls = "Todos los peajes incluidos";

es.promo_bar.text = "Temporada Umrah 2026: Reserve su transporte privado sin anticipo y con cancelación gratuita.";
es.promo_bar.btn = "Reservar Ahora";

fs.writeFileSync(path.join(__dirname, '../src/i18n/dictionaries/es.json'), JSON.stringify(es, null, 2), 'utf-8');

// 5. German (de)
const de = createFilteredDictionary(en);
de.meta.brand = "Royal Umrah Cabs";
de.meta.brandSub = "Privater Chauffeurservice für Umrah";
de.nav.routes = "Routen";
de.nav.services = "Leistungen";
de.nav.fleet = "Flotte";
de.nav.pricing = "Preise";
de.nav.guides = "Ratgeber";
de.nav.about = "Über Uns";
de.nav.contact = "Kontakt";
de.nav.bookNow = "Jetzt Buchen";
de.nav.trackBooking = "Buchung Verfolgen";
de.nav.account = "Reiseagentur-Portal";

de.trust_strip.fixedPrices = "Feste & Transparente Preise";
de.trust_strip.flightTracking = "Live-Flugüberwachung";
de.trust_strip.payOnArrival = "Zahlung bei Ankunft (Bar/Karte)";
de.trust_strip.support247 = "24/7 WhatsApp Support";
de.trust_strip.googleReviews = "4.9/5 Bewertungen von Pilgern";

de.hero.eyebrow = "Exklusiver Chauffeur-Service für Umrah & Hadsch";
de.hero.titlePart1 = "Privater Umrah-Transfer";
de.hero.titlePart2 = "Komfort & Seelenfrieden für Familien";
de.hero.description = "Terminalabholung am Flughafen Dschidda und Transfers zwischen Mekka und Medina. Keine Vorauszahlung erforderlich, kostenlose Stornierung.";
de.hero.ctaBook = "Preis Berechnen & Buchen";
de.hero.ctaFleet = "Flotte Ansehen";

de.booking_card.title = "Preis Berechnen & Sofort Buchen";
de.booking_card.subtitle = "Transparente Festpreise ohne Vorauszahlung.";
de.booking_card.pickupLabel = "Abholort";
de.booking_card.dropoffLabel = "Zielort";
de.booking_card.dateLabel = "Abholdatum";
de.booking_card.timeLabel = "Uhrzeit";
de.booking_card.passengersLabel = "Passagiere";
de.booking_card.luggageLabel = "Gepäckstücke";
de.booking_card.vehicleLabel = "Fahrzeugtyp";
de.booking_card.anyVehicle = "Kategorie Wählen";
de.booking_card.bookOnline = "Online Buchen";
de.booking_card.continueWhatsApp = "Über WhatsApp Fortfahren";
de.booking_card.quoteNeeded = "Angebot Anfordern";
de.booking_card.microCancellation = "Kostenlose Stornierung (24h)";
de.booking_card.microPayArrival = "Zahlung bei Ankunft am Hotel";
de.booking_card.microNoHidden = "Keine versteckten Gebühren";
de.booking_card.microAllTolls = "Alle Mautgebühren inklusive";

de.promo_bar.text = "Umrah Saison 2026: Reservieren Sie Ihren privaten Transfer ohne Vorauszahlung mit kostenloser Stornierung.";
de.promo_bar.btn = "Jetzt Reservieren";

fs.writeFileSync(path.join(__dirname, '../src/i18n/dictionaries/de.json'), JSON.stringify(de, null, 2), 'utf-8');

// 6. Hindi (hi)
const hi = createFilteredDictionary(en);
hi.meta.brand = "Royal Umrah Cabs";
hi.meta.brandSub = "वीआईपी उमरा ट्रांसपोर्ट";
hi.nav.routes = "रूट्स";
hi.nav.services = "सेवाएं";
hi.nav.fleet = "गाड़ियां";
hi.nav.pricing = "किराया";
hi.nav.guides = "गाइड";
hi.nav.about = "हमारे बारे में";
hi.nav.contact = "संपर्क";
hi.nav.bookNow = "अभी बुक करें";
hi.nav.trackBooking = "बुकिंग ट्रैक करें";
hi.nav.account = "ट्रैवल एजेंट पोर्टल";

hi.trust_strip.fixedPrices = "फिक्स्ड और पारदर्शी किराया";
hi.trust_strip.flightTracking = "लाइव फ्लाइट ट्रैकिंग";
hi.trust_strip.payOnArrival = "आगमन पर भुगतान (कैश/कार्ड)";
hi.trust_strip.support247 = "24/7 व्हाट्सएप सपोर्ट";
hi.trust_strip.googleReviews = "4.9/5 तीर्थयात्रियों की समीक्षा";

hi.hero.eyebrow = "मक्का और मदीना के लिए प्राइवेट वीआईपी शॉफर सेवा";
hi.hero.titlePart1 = "उमरा प्राइवेट ट्रांसपोर्ट";
hi.hero.titlePart2 = "परिवार के लिए पूर्ण सुकून";
hi.hero.description = "जेद्दा एयरपोर्ट, मक्का और मदीना के बीच आरामदायक पारिवारिक सफर। कोई अग्रिम भुगतान नहीं, 24 घंटे पहले मुफ्त रद्दीकरण।";
hi.hero.ctaBook = "किराया जानें और बुक करें";
hi.hero.ctaFleet = "गाड़ियां देखें";

hi.booking_card.title = "किराया जांचें और तुरंत बुक करें";
hi.booking_card.subtitle = "स्थानीय मुद्रा में पारदर्शी किराया। अग्रिम भुगतान की आवश्यकता नहीं।";
hi.booking_card.pickupLabel = "पिकअप स्थान";
hi.booking_card.dropoffLabel = "गंतव्य स्थान";
hi.booking_card.dateLabel = "पिकअप तिथि";
hi.booking_card.timeLabel = "समय";
hi.booking_card.passengersLabel = "यात्री संख्या";
hi.booking_card.luggageLabel = "सामान (बैग्स)";
hi.booking_card.vehicleLabel = "गाड़ी का चयन";
hi.booking_card.anyVehicle = "गाड़ी श्रेणी चुनें";
hi.booking_card.bookOnline = "ऑनलाइन बुक करें";
hi.booking_card.continueWhatsApp = "व्हाट्सएप पर जारी रखें";
hi.booking_card.quoteNeeded = "कोटेशन के लिए संपर्क करें";
hi.booking_card.microCancellation = "मुफ्त रद्दीकरण (24 घंटे)";
hi.booking_card.microPayArrival = "होटल पहुंचने पर भुगतान";
hi.booking_card.microNoHidden = "कोई छुपा शुल्क नहीं";
hi.booking_card.microAllTolls = "सभी टोल शामिल";

hi.promo_bar.text = "उमरा 2026: बिना किसी अग्रिम भुगतान के प्राइवेट कैब बुक करें, 24 घंटे पहले मुफ्त रद्दीकरण।";
hi.promo_bar.btn = "अभी बुक करें";

fs.writeFileSync(path.join(__dirname, '../src/i18n/dictionaries/hi.json'), JSON.stringify(hi, null, 2), 'utf-8');

console.log('✅ All 9 dictionaries synchronized with EXACT keys of en.json!');
