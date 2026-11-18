import type { Locale } from '@/i18n/config';

export interface HomepageDecisionCopy {
  whyTitle: string;
  whyDesc: string;
  doorway: string;
  doorwayDesc: string;
  compareTitle: string;
  compareDesc: string;
  ourTransfer: string;
  trainOption: string;
  comparisonPrivate: [string,string,string];
  comparisonTrain: [string,string,string];
  priceTitle: string;
  priceDesc: string;
  fareRoute: string;
  fareNote: string;
  chooseCar: string;
  viewVehicle: string;
  compareFares: string;
  sar: string;
  findTransfer: string;
}

export const HOMEPAGE_DECISION_COPY: Record<Locale, HomepageDecisionCopy> = {
  ar: {
    whyTitle:'لماذا تختار النقل الخاص؟',whyDesc:'تنقل من نقطة الاستقبال إلى وجهتك، باهتمام بالتفاصيل التي تهم المسافرين والمعتمرين.',
    doorway:'من الباب إلى الباب',doorwayDesc:'استقبال من موقعك والوصول إلى الفندق أو الوجهة المحددة.',
    compareTitle:'النقل الخاص أم قطار الحرمين؟',compareDesc:'اختيار وسيلة التنقل يعتمد على مكان الوصول، والحقائب، وعدد المسافرين.',
    ourTransfer:'سيارة خاصة مع سائق',trainOption:'القطار والنقل من المحطة',
    comparisonPrivate:['استقبال من الموقع المحدد والوصول إلى الوجهة','السيارة المخصصة للركاب والحقائب حسب الفئة','التنسيق مع مواعيد الطيران عند استقبال المطار'],
    comparisonTrain:['السفر بين محطات القطار المحددة','قد تحتاج إلى انتقال إضافي من المحطة وإليها','مواعيد المغادرة مرتبطة بجدول الرحلات'],
    priceTitle:'أسعار واضحة للرحلات',priceDesc:'التعرفة بالريال السعودي لكل سيارة، شاملة الضريبة والرسوم المعلنة.',
    fareRoute:'المسار',fareNote:'الأسعار حسب المسار وفئة السيارة. تأكد من التفاصيل في طلب الحجز.',chooseCar:'اختر السيارة المناسبة',viewVehicle:'تفاصيل السيارة',compareFares:'كل الأسعار',sar:'ر.س',findTransfer:'احجز هذه الرحلة'
  },
  en: {
    whyTitle:'Why choose a private transfer?',whyDesc:'Travel from your pickup point to your destination, with attention to the details that matter.',
    doorway:'Door-to-door travel',doorwayDesc:'Pickup at your chosen location and direct travel to your hotel or destination.',
    compareTitle:'Private transfer or Haramain train?',compareDesc:'The best choice depends on your arrival point, luggage and number of travelers.',
    ourTransfer:'Private chauffeur transfer',trainOption:'Train and station connections',
    comparisonPrivate:['Pickup at your chosen location and drop-off at your destination','Dedicated vehicle with passenger and luggage space by class','Flight monitoring for airport arrivals'],
    comparisonTrain:['Travel between designated railway stations','An additional journey to or from the station may be needed','Departure times follow the published train timetable'],
    priceTitle:'Clear fares for popular routes',priceDesc:'Saudi riyal fare per vehicle, inclusive of VAT and approved journey fees.',
    fareRoute:'Route',fareNote:'Rates depend on route and vehicle. Review the exact details in your booking request.',chooseCar:'Choose your ideal vehicle',viewVehicle:'Vehicle details',compareFares:'All prices',sar:'SAR',findTransfer:'Request this journey'
  },
  ms: {
    whyTitle:'Mengapa memilih pengangkutan peribadi?',whyDesc:'Dari lokasi jemputan ke destinasi, dengan perhatian pada keperluan perjalanan anda.',
    doorway:'Dari pintu ke pintu',doorwayDesc:'Dijemput di lokasi pilihan anda dan dihantar ke hotel atau destinasi.',
    compareTitle:'Kereta persendirian atau kereta api Haramain?',compareDesc:'Pilihan sesuai bergantung pada lokasi tiba, bagasi dan jumlah penumpang.',
    ourTransfer:'Kereta peribadi dengan pemandu',trainOption:'Kereta api dan sambungan stesen',
    comparisonPrivate:['Jemputan di lokasi pilihan dan hantar ke destinasi','Kenderaan khusus mengikut kapasiti penumpang dan bagasi','Pemantauan penerbangan untuk jemputan lapangan terbang'],
    comparisonTrain:['Perjalanan antara stesen kereta api tertentu','Mungkin perlu pengangkutan tambahan dari atau ke stesen','Waktu berlepas mengikut jadual kereta api'],
    priceTitle:'Tambang jelas bagi laluan utama',priceDesc:'Harga setiap kenderaan dalam riyal Saudi, termasuk cukai dan caj perjalanan.',
    fareRoute:'Laluan',fareNote:'Tambang bergantung pada laluan dan kenderaan; semak butiran dalam permintaan.',chooseCar:'Pilih kenderaan sesuai',viewVehicle:'Butiran kenderaan',compareFares:'Semua harga',sar:'SAR',findTransfer:'Mohon perjalanan ini'
  },
  id: {
    whyTitle:'Mengapa memilih transfer pribadi?',whyDesc:'Perjalanan langsung dari lokasi penjemputan ke tujuan dengan perhatian pada kebutuhan Anda.',
    doorway:'Dari pintu ke pintu',doorwayDesc:'Dijemput di lokasi pilihan dan diantar ke hotel atau tujuan.',
    compareTitle:'Transfer pribadi atau kereta Haramain?',compareDesc:'Pilihan terbaik bergantung pada titik kedatangan, bagasi, dan jumlah penumpang.',
    ourTransfer:'Mobil pribadi dengan pengemudi',trainOption:'Kereta dan sambungan stasiun',
    comparisonPrivate:['Penjemputan di lokasi pilihan dan pengantaran ke tujuan','Kendaraan khusus dengan kapasitas penumpang dan bagasi sesuai kelas','Pemantauan penerbangan untuk kedatangan bandara'],
    comparisonTrain:['Perjalanan antarstasiun kereta tertentu','Mungkin perlu perjalanan tambahan ke atau dari stasiun','Keberangkatan mengikuti jadwal kereta'],
    priceTitle:'Tarif jelas untuk rute populer',priceDesc:'Harga per kendaraan dalam riyal Saudi, termasuk pajak dan biaya perjalanan.',
    fareRoute:'Rute',fareNote:'Tarif bergantung pada rute dan kendaraan; periksa rincian pemesanan.',chooseCar:'Pilih kendaraan yang tepat',viewVehicle:'Detail kendaraan',compareFares:'Semua harga',sar:'SAR',findTransfer:'Ajukan perjalanan ini'
  },
  ur: {
    whyTitle:'نجی سفر کیوں منتخب کریں؟',whyDesc:'آپ کی منتخب کردہ جگہ سے منزل تک، سفر کی اہم تفصیلات کے ساتھ۔',
    doorway:'دروازے سے منزل تک',doorwayDesc:'منتخب مقام سے استقبال اور ہوٹل یا منزل تک سفر۔',
    compareTitle:'نجی گاڑی یا حرمین ٹرین؟',compareDesc:'بہترین انتخاب آمد کی جگہ، سامان اور مسافروں کی تعداد پر منحصر ہے۔',
    ourTransfer:'نجی ڈرائیور والی گاڑی',trainOption:'ٹرین اور اسٹیشن کا سفر',
    comparisonPrivate:['منتخب جگہ سے استقبال اور منزل تک پہنچانا','مسافروں اور سامان کے مطابق مخصوص گاڑی','ایئرپورٹ استقبال کے لیے پرواز کی نگرانی'],
    comparisonTrain:['مقررہ ریلوے اسٹیشنوں کے درمیان سفر','اسٹیشن سے آگے اضافی سفر درکار ہو سکتا ہے','روانگی ٹرین کے مقررہ اوقات کے مطابق'],
    priceTitle:'اہم راستوں کی واضح قیمتیں',priceDesc:'فی گاڑی سعودی ریال میں کرایہ، متعلقہ ٹیکس اور فیس سمیت۔',
    fareRoute:'راستہ',fareNote:'قیمت راستے اور گاڑی کے مطابق ہے؛ بکنگ درخواست میں تفصیل دیکھیں۔',chooseCar:'اپنی گاڑی منتخب کریں',viewVehicle:'گاڑی کی تفصیل',compareFares:'تمام قیمتیں',sar:'SAR',findTransfer:'سفر کی درخواست دیں'
  },
  fr: {
    whyTitle:'Pourquoi choisir un transfert privé ?',whyDesc:'De votre point de prise en charge à votre destination, avec une attention aux détails.',
    doorway:'De porte à porte',doorwayDesc:'Prise en charge au lieu choisi et trajet vers votre hôtel ou destination.',
    compareTitle:'Transfert privé ou train Haramain ?',compareDesc:'Le choix dépend du point d’arrivée, des bagages et du nombre de voyageurs.',
    ourTransfer:'Voiture privée avec chauffeur',trainOption:'Train et correspondances en gare',
    comparisonPrivate:['Prise en charge à votre adresse et trajet vers la destination','Véhicule réservé selon la capacité passagers et bagages','Suivi de vol pour les arrivées à l’aéroport'],
    comparisonTrain:['Trajet entre les gares ferroviaires désignées','Un transport supplémentaire peut être nécessaire','Départs selon les horaires publiés'],
    priceTitle:'Tarifs clairs des trajets populaires',priceDesc:'Tarif par véhicule en riyals saoudiens, taxes et frais inclus.',
    fareRoute:'Trajet',fareNote:'Tarifs selon l’itinéraire et le véhicule ; vérifiez votre demande.',chooseCar:'Choisissez votre véhicule',viewVehicle:'Détails du véhicule',compareFares:'Tous les tarifs',sar:'SAR',findTransfer:'Demander ce trajet'
  },
  es: {
    whyTitle:'¿Por qué elegir un traslado privado?',whyDesc:'Desde el punto de recogida hasta tu destino, cuidando los detalles importantes.',
    doorway:'De puerta a puerta',doorwayDesc:'Recogida en el lugar elegido y traslado a tu hotel o destino.',
    compareTitle:'¿Traslado privado o tren Haramain?',compareDesc:'La elección depende del lugar de llegada, el equipaje y los pasajeros.',
    ourTransfer:'Vehículo privado con conductor',trainOption:'Tren y conexiones de estación',
    comparisonPrivate:['Recogida en el lugar elegido y llegada al destino','Vehículo dedicado según pasajeros y equipaje','Seguimiento de vuelos en recogidas aeroportuarias'],
    comparisonTrain:['Viaje entre estaciones ferroviarias definidas','Puede ser necesario otro traslado desde la estación','Salidas según el horario publicado'],
    priceTitle:'Precios claros de rutas populares',priceDesc:'Tarifa por vehículo en riyales saudíes, impuestos y cargos incluidos.',
    fareRoute:'Ruta',fareNote:'El precio depende de la ruta y el vehículo; revisa tu solicitud.',chooseCar:'Elige tu vehículo',viewVehicle:'Detalles del vehículo',compareFares:'Todos los precios',sar:'SAR',findTransfer:'Solicitar este viaje'
  },
  de: {
    whyTitle:'Warum einen privaten Transfer wählen?',whyDesc:'Von Ihrem Abholort direkt zum Ziel, mit Blick auf wichtige Reisedetails.',
    doorway:'Von Tür zu Tür',doorwayDesc:'Abholung an Ihrem Wunschort und Transfer zum Hotel oder Ziel.',
    compareTitle:'Privater Transfer oder Haramain-Zug?',compareDesc:'Die Wahl hängt vom Ankunftsort, Gepäck und der Gruppengröße ab.',
    ourTransfer:'Privater Chauffeurservice',trainOption:'Zug und Anschlussfahrten',
    comparisonPrivate:['Abholung am Wunschort und Fahrt zum Ziel','Eigenes Fahrzeug passend für Passagiere und Gepäck','Flugüberwachung bei Flughafenabholung'],
    comparisonTrain:['Fahrt zwischen festgelegten Bahnhöfen','Zusätzlicher Transfer vom oder zum Bahnhof möglich','Abfahrten nach veröffentlichtem Fahrplan'],
    priceTitle:'Klare Preise für beliebte Strecken',priceDesc:'Preis je Fahrzeug in Saudi-Riyal, inklusive Steuern und Gebühren.',
    fareRoute:'Route',fareNote:'Tarif je nach Strecke und Fahrzeug; bitte Anfrage prüfen.',chooseCar:'Passendes Fahrzeug wählen',viewVehicle:'Fahrzeugdetails',compareFares:'Alle Preise',sar:'SAR',findTransfer:'Fahrt anfragen'
  },
  tr: {
    whyTitle:'Neden özel transfer seçmelisiniz?',whyDesc:'Seçtiğiniz noktadan varış yerinize kadar özenli bir yolculuk.',
    doorway:'Kapıdan kapıya ulaşım',doorwayDesc:'Seçtiğiniz yerden alınarak otelinize veya varış noktanıza ulaşım.',
    compareTitle:'Özel transfer mi Haramain treni mi?',compareDesc:'Kararınız varış noktası, bagaj ve yolcu sayısına bağlıdır.',
    ourTransfer:'Özel şoförlü araç',trainOption:'Tren ve istasyon bağlantıları',
    comparisonPrivate:['Belirlenen yerden alma ve varış noktasına bırakma','Yolcu ve bagaj ihtiyacına uygun özel araç','Havalimanı karşılamalarında uçuş takibi'],
    comparisonTrain:['Belirli tren istasyonları arasında seyahat','İstasyona ek ulaşım gerekebilir','Hareketler yayımlanan tren tarifesine bağlıdır'],
    priceTitle:'Popüler rotalarda açık fiyatlar',priceDesc:'Araç başına Suudi riyali fiyatı, vergi ve yol ücretleri dahil.',
    fareRoute:'Güzergâh',fareNote:'Fiyat rota ve araca bağlıdır; talep ayrıntılarını inceleyin.',chooseCar:'Size uygun aracı seçin',viewVehicle:'Araç detayları',compareFares:'Tüm fiyatlar',sar:'SAR',findTransfer:'Bu yolculuğu iste'
  },
  hi: {
    whyTitle:'निजी ट्रांसफ़र क्यों चुनें?',whyDesc:'आपके पिकअप स्थान से मंज़िल तक, ज़रूरी विवरणों का ध्यान रखते हुए।',
    doorway:'घर से मंज़िल तक',doorwayDesc:'चुनी गई जगह से पिकअप और होटल या मंज़िल तक सफर।',
    compareTitle:'निजी वाहन या हरमैन ट्रेन?',compareDesc:'उपयुक्त विकल्प आगमन स्थल, सामान और यात्रियों की संख्या पर निर्भर है।',
    ourTransfer:'निजी चालक वाली कार',trainOption:'ट्रेन और स्टेशन से आगे का सफर',
    comparisonPrivate:['चुनी हुई जगह से पिकअप और मंज़िल तक यात्रा','यात्रियों और सामान के अनुसार अलग वाहन','एयरपोर्ट पर आगमन के लिए फ्लाइट निगरानी'],
    comparisonTrain:['निर्धारित रेलवे स्टेशनों के बीच यात्रा','स्टेशन आने-जाने के लिए अतिरिक्त वाहन लग सकता है','प्रस्थान ट्रेन की समय-सारणी पर निर्भर'],
    priceTitle:'प्रमुख मार्गों के स्पष्ट किराए',priceDesc:'प्रति वाहन सऊदी रियाल में किराया, कर और मान्य शुल्क सहित।',
    fareRoute:'मार्ग',fareNote:'किराया मार्ग और वाहन पर निर्भर; बुकिंग विवरण जांचें।',chooseCar:'सही वाहन चुनें',viewVehicle:'वाहन विवरण',compareFares:'सभी कीमतें',sar:'SAR',findTransfer:'यात्रा का अनुरोध करें'
  }
};
