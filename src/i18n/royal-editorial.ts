import type { Locale } from './config';

type TitleAndText = readonly [title: string, text: string];

type RoyalEditorialCopy = {
  process: {
    title: string;
    lead: string;
    steps: readonly [TitleAndText, TitleAndText, TitleAndText];
  };
  services: {
    title: string;
    airport?: TitleAndText;
    intercity?: TitleAndText;
    hotel: TitleAndText;
    family: TitleAndText;
    group: TitleAndText;
  };
  destinations: {
    title: string;
    lead: string;
    makkah: string;
    madinah: string;
    explore: string;
  };
  chauffeur: {
    title: string;
    lead: string;
    points: readonly string[];
  };
  reviews: {
    title: string;
    experienceTitle: string;
    experience: string;
    read: string;
    previous: string;
    next: string;
  };
  cabin: {
    title: string;
    lead: string;
    seating: string;
    luggage: string;
    explore: string;
  };
};

export const royalEditorial: Record<Locale, RoyalEditorialCopy> = {
  en: {
    process: {
      title: 'Three steps to your private ride',
      lead: 'Plan your journey and pay your driver in cash after you arrive.',
      steps: [
        ['Choose your journey', 'Select your route, travel date and a vehicle for your party.'],
        ['Request your reservation', 'Review the details and leave your contact information so our team can coordinate your ride.'],
        ['Travel comfortably', 'Meet your chauffeur and pay in cash when the journey is complete.'],
      ],
    },
    services: {
      title: 'Private travel, from pickup to arrival',
      hotel: ['Hotel transfers', 'Arrange a private ride to or from your hotel on an available route.'],
      family: ['Family transportation', 'Choose a vehicle with the right seating and luggage space for your family.'],
      group: ['Group transportation', 'Explore approved vans and buses for larger parties.'],
    },
    destinations: {
      title: 'Makkah and Madinah Ziyarat',
      lead: 'Private visits to historic and sacred places, with care for the journey and respect for each destination.',
      makkah: 'Makkah Al Mukarramah',
      madinah: 'Madinah Al Munawwarah',
      explore: 'Explore Ziyarat',
    },
    chauffeur: {
      title: 'A personal welcome, from the first moment',
      lead: 'Your team coordinates the meeting point and monitors incoming flights for airport pickups.',
      points: ['Coordinated pickup', 'Flight monitoring', 'Private transport'],
    },
    reviews: {
      title: 'In our guests’ words',
      experienceTitle: 'Travel with confidence',
      experience: 'Plan your pickup, choose space for your guests and their luggage, and travel directly to your destination.',
      read: 'Read guest reviews',
      previous: 'Previous review',
      next: 'Next review',
    },
    cabin: {
      title: 'Comfort is part of the journey',
      lead: 'Explore the interiors and check seating and luggage capacity to find the right vehicle for your trip.',
      seating: 'Seating by vehicle',
      luggage: 'Luggage capacity',
      explore: 'Explore the fleet',
    },
  },
  ar: {
    process: {
      title: 'رحلتك الخاصة في ثلاث خطوات ميسرة',
      lead: 'خطّط لرحلتك بكل سهولة، وادفع نقدًا للسائق بعد اكتمال الرحلة.',
      steps: [
        ['اختر رحلتك ومركبتك', 'حدّد المسار وتاريخ السفر واختر المركبة الأنسب لعدد الضيوف وأمتعتهم.'],
        ['أرسل طلب الحجز', 'راجع التفاصيل وأضف بيانات التواصل ليتمكّن فريقنا من تنسيق رحلتك بدقة.'],
        ['سافر بأعلى درجات الراحة', 'التقِ بسائقك الخاص واستمتع بالرحلة، وادفع نقدًا بعد اكتمال الرحلة.'],
      ],
    },
    services: {
      title: 'تنقّل خاص فاخر من الاستقبال حتى الوصول',
      hotel: ['التوصيل للفنادق', 'رحلات خاصة ومريحة من فندقك وإليه على كافة المسارات المعتمدة.'],
      family: ['نقل العائلات', 'مركبات عائلية فسيحة تتسع لجميع أفراد الأسرة وحقائبهم بأمان.'],
      group: ['نقل المجموعات', 'فانات وحافلات حديثة معتمدة للمجموعات الكبيرة والوفود.'],
    },
    destinations: {
      title: 'مزارات مكة المكرمة والمدينة المنورة',
      lead: 'زيارات خاصة لمعالم السيرة العطرة والمواقع التاريخية، بعناية فائقة واحترام لقدسية المكان.',
      makkah: 'مزارات مكة المكرمة',
      madinah: 'مزارات المدينة المنورة',
      explore: 'استكشف المزارات والمعالم',
    },
    chauffeur: {
      title: 'استقبال راقٍ يليق بك من أول لحظة',
      lead: 'ينسّق فريقنا نقطة الالتقاء بدقة ويتابع رحلتك الجوية لحظة بلحظة لضمان استقبال خالٍ من الانتظار.',
      points: ['تنسيق الاستقبال الفوري', 'متابعة حية للرحلات الجوية', 'تنقّل خاص بكامل الخصوصية'],
    },
    reviews: {
      title: 'تجارب يرويها ضيوفنا الكرام',
      experienceTitle: 'رحلة بطمأنينة وأمان',
      experience: 'خطّط لنقطة الاستقبال واختر المساحة المناسبة لضيوفك وأمتعتهم وسافر براحة تامة إلى وجهتك.',
      read: 'اقرأ تقييمات الضيوف',
      previous: 'التقييم السابق',
      next: 'التقييم التالي',
    },
    cabin: {
      title: 'الراحة والهدوء في أدق تفاصيل الرحلة',
      lead: 'تصفّح صور المقصورات الحديثة وتحقّق من عدد المقاعد وسعة الأمتعة لاختيار المركبة الأنسب.',
      seating: 'عدد المقاعد لكل مركبة',
      luggage: 'سعة الأمتعة وحقائب السفر',
      explore: 'تعرّف على مواصفات الأسطول',
    },
  },
  ms: {
    process: {
      title: 'Tiga langkah untuk perjalanan peribadi anda',
      lead: 'Rancang perjalanan dan bayar secara tunai kepada pemandu selepas tiba.',
      steps: [
        ['Pilih perjalanan anda', 'Pilih laluan, tarikh dan kenderaan yang sesuai untuk rombongan anda.'],
        ['Hantar permintaan tempahan', 'Semak butiran dan berikan maklumat hubungan supaya pasukan kami dapat menyelaras perjalanan.'],
        ['Nikmati perjalanan', 'Temui pemandu anda dan bayar secara tunai selepas perjalanan selesai.'],
      ],
    },
    services: {
      title: 'Perjalanan peribadi dari tempat jemputan hingga destinasi',
      hotel: ['Pengangkutan hotel', 'Atur perjalanan peribadi ke atau dari hotel anda melalui laluan yang tersedia.'],
      family: ['Pengangkutan keluarga', 'Pilih kenderaan dengan ruang tempat duduk dan bagasi yang sesuai untuk keluarga anda.'],
      group: ['Pengangkutan rombongan', 'Lihat van dan bas dalam armada untuk rombongan yang lebih besar.'],
    },
    destinations: {
      title: 'Ziarah Makkah dan Madinah',
      lead: 'Lawatan peribadi ke tempat bersejarah dan suci dengan perhatian sepanjang perjalanan dan rasa hormat terhadap setiap destinasi.',
      makkah: 'Makkah Al Mukarramah',
      madinah: 'Madinah Al Munawwarah',
      explore: 'Terokai ziarah',
    },
    chauffeur: {
      title: 'Sambutan mesra sejak ketibaan',
      lead: 'Pasukan kami menyelaras tempat pertemuan dan memantau waktu ketibaan penerbangan untuk jemputan di lapangan terbang.',
      points: ['Jemputan diselaras', 'Pemantauan penerbangan', 'Pengangkutan peribadi'],
    },
    reviews: {
      title: 'Dalam kata-kata tetamu kami',
      experienceTitle: 'Perjalanan dengan yakin',
      experience: 'Rancang tempat jemputan, pilih ruang yang sesuai untuk penumpang dan bagasi, lalu terus ke destinasi anda.',
      read: 'Baca ulasan tetamu',
      previous: 'Ulasan sebelumnya',
      next: 'Ulasan seterusnya',
    },
    cabin: {
      title: 'Keselesaan sepanjang perjalanan',
      lead: 'Lihat bahagian dalaman dan semak jumlah tempat duduk serta kapasiti bagasi untuk memilih kenderaan yang sesuai.',
      seating: 'Tempat duduk setiap kenderaan',
      luggage: 'Kapasiti bagasi',
      explore: 'Terokai armada',
    },
  },
  id: {
    process: {
      title: 'Tiga langkah menuju perjalanan pribadi Anda',
      lead: 'Rencanakan perjalanan dan bayar tunai kepada pengemudi setelah tiba.',
      steps: [
        ['Pilih perjalanan Anda', 'Tentukan rute, tanggal perjalanan, dan kendaraan yang sesuai dengan rombongan Anda.'],
        ['Ajukan pemesanan', 'Periksa detail perjalanan dan masukkan informasi kontak agar tim kami dapat mengatur perjalanan Anda.'],
        ['Nikmati perjalanan', 'Temui pengemudi Anda dan bayar tunai setelah perjalanan selesai.'],
      ],
    },
    services: {
      title: 'Perjalanan pribadi dari penjemputan hingga tujuan',
      airport: ['Antar-jemput bandara', 'Penjemputan pribadi di bandara Jeddah dan Madinah dengan pemantauan penerbangan.'],
      intercity: ['Perjalanan antarkota', 'Perjalanan pribadi antara Makkah, Madinah, Jeddah, Taif, dan Riyadh melalui rute yang tersedia.'],
      hotel: ['Transfer hotel', 'Atur perjalanan pribadi dari atau menuju hotel pada rute yang tersedia.'],
      family: ['Transportasi keluarga', 'Pilih kendaraan dengan tempat duduk dan ruang bagasi yang sesuai untuk keluarga.'],
      group: ['Transportasi rombongan', 'Lihat van dan bus yang tersedia untuk rombongan yang lebih besar.'],
    },
    destinations: {
      title: 'Ziarah Makkah dan Madinah',
      lead: 'Kunjungan pribadi ke tempat bersejarah dan suci dengan perhatian selama perjalanan dan penghormatan terhadap setiap tujuan.',
      makkah: 'Makkah Al Mukarramah',
      madinah: 'Madinah Al Munawwarah',
      explore: 'Jelajahi ziarah',
    },
    chauffeur: {
      title: 'Sambutan hangat sejak kedatangan',
      lead: 'Tim kami mengatur titik pertemuan dan memantau kedatangan penerbangan untuk penjemputan di bandara.',
      points: ['Penjemputan terkoordinasi', 'Pemantauan penerbangan', 'Transportasi pribadi'],
    },
    reviews: {
      title: 'Cerita para tamu kami',
      experienceTitle: 'Bepergian dengan tenang',
      experience: 'Rencanakan penjemputan, pilih ruang yang sesuai bagi penumpang dan bagasi, lalu langsung menuju tujuan Anda.',
      read: 'Baca ulasan tamu',
      previous: 'Ulasan sebelumnya',
      next: 'Ulasan selanjutnya',
    },
    cabin: {
      title: 'Kenyamanan adalah bagian dari perjalanan',
      lead: 'Lihat interior dan periksa jumlah kursi serta kapasitas bagasi untuk menemukan kendaraan yang sesuai.',
      seating: 'Kursi per kendaraan',
      luggage: 'Kapasitas bagasi',
      explore: 'Jelajahi armada',
    },
  },
  ur: {
    process: {
      title: 'آپ کا نجی سفر تین مرحلوں میں',
      lead: 'اپنے سفر کی منصوبہ بندی کریں اور پہنچنے کے بعد ڈرائیور کو نقد ادائیگی کریں۔',
      steps: [
        ['اپنا سفر منتخب کریں', 'راستہ، سفر کی تاریخ اور اپنے مسافروں کے لیے مناسب گاڑی منتخب کریں۔'],
        ['بکنگ کی درخواست بھیجیں', 'تفصیلات دیکھ کر رابطے کی معلومات دیں تاکہ ہماری ٹیم آپ کے سفر کا انتظام کر سکے۔'],
        ['آرام سے سفر کریں', 'اپنے ڈرائیور سے ملیں اور سفر مکمل ہونے پر نقد ادائیگی کریں۔'],
      ],
    },
    services: {
      title: 'استقبال سے منزل تک نجی سفر',
      airport: ['ہوائی اڈے سے نجی استقبال', 'جدہ اور مدینہ کے ہوائی اڈوں پر پرواز کی نگرانی کے ساتھ نجی استقبال۔'],
      intercity: ['شہروں کے درمیان سفر', 'دستیاب راستوں پر مکہ، مدینہ، جدہ، طائف اور ریاض کے درمیان نجی سفر۔'],
      hotel: ['ہوٹل تک آمد و رفت', 'دستیاب راستے پر اپنے ہوٹل سے یا ہوٹل تک نجی سفر کا انتظام کریں۔'],
      family: ['خاندانی سفر', 'اپنے خاندان کی نشستوں اور سامان کے لیے مناسب گاڑی منتخب کریں۔'],
      group: ['گروہی سفر', 'بڑے گروہوں کے لیے دستیاب وین اور بسیں دیکھیں۔'],
    },
    destinations: {
      title: 'مکہ مکرمہ اور مدینہ منورہ کی زیارات',
      lead: 'مقدس اور تاریخی مقامات کے لیے نجی سفر، ہر منزل کے احترام اور سفر کی تفصیلات کے خیال کے ساتھ۔',
      makkah: 'مکہ مکرمہ',
      madinah: 'مدینہ منورہ',
      explore: 'زیارات دیکھیں',
    },
    chauffeur: {
      title: 'پہلے قدم سے پرتپاک استقبال',
      lead: 'ہماری ٹیم ملاقات کی جگہ طے کرتی ہے اور ہوائی اڈے سے استقبال کے لیے پرواز کی آمد پر نظر رکھتی ہے۔',
      points: ['استقبال کا انتظام', 'پرواز کی نگرانی', 'نجی سفر'],
    },
    reviews: {
      title: 'ہمارے مہمانوں کی زبانی',
      experienceTitle: 'اطمینان کے ساتھ سفر',
      experience: 'استقبال کی جگہ طے کریں، مسافروں اور سامان کے لیے مناسب گاڑی منتخب کریں اور سیدھے اپنی منزل پر پہنچیں۔',
      read: 'مہمانوں کے تاثرات پڑھیں',
      previous: 'پچھلا تبصرہ',
      next: 'اگلا تبصرہ',
    },
    cabin: {
      title: 'آرام سفر کا حصہ ہے',
      lead: 'گاڑیوں کے اندرونی حصے دیکھیں اور نشستوں اور سامان کی گنجائش جان کر مناسب گاڑی منتخب کریں۔',
      seating: 'ہر گاڑی کی نشستیں',
      luggage: 'سامان کی گنجائش',
      explore: 'تمام گاڑیاں دیکھیں',
    },
  },
  fr: {
    process: {
      title: 'Votre trajet privé en trois étapes',
      lead: 'Planifiez votre trajet et réglez votre chauffeur en espèces après votre arrivée.',
      steps: [
        ['Choisissez votre trajet', 'Sélectionnez votre itinéraire, la date de voyage et un véhicule adapté à votre groupe.'],
        ['Envoyez votre demande', 'Vérifiez les détails et indiquez vos coordonnées pour que notre équipe organise votre trajet.'],
        ['Voyagez confortablement', 'Retrouvez votre chauffeur et réglez en espèces à la fin du trajet.'],
      ],
    },
    services: {
      title: 'Un trajet privé, de la prise en charge à l’arrivée',
      hotel: ['Transferts hôteliers', 'Organisez un trajet privé depuis ou vers votre hôtel sur un itinéraire disponible.'],
      family: ['Transport en famille', 'Choisissez un véhicule adapté à votre famille et à ses bagages.'],
      group: ['Transport de groupe', 'Découvrez les minibus et les autocars prévus pour les groupes plus nombreux.'],
    },
    destinations: {
      title: 'Ziyarat à La Mecque et à Médine',
      lead: 'Des visites privées de lieux historiques et sacrés, avec une attention portée au trajet et au respect de chaque destination.',
      makkah: 'La Mecque',
      madinah: 'Médine',
      explore: 'Découvrir les visites',
    },
    chauffeur: {
      title: 'Un accueil attentionné dès votre arrivée',
      lead: 'Notre équipe organise le point de rendez-vous et suit l’arrivée des vols pour les prises en charge à l’aéroport.',
      points: ['Accueil coordonné', 'Suivi des vols', 'Transport privé'],
    },
    reviews: {
      title: 'Nos voyageurs racontent',
      experienceTitle: 'Voyagez l’esprit tranquille',
      experience: 'Prévoyez votre prise en charge, choisissez l’espace nécessaire pour vos passagers et leurs bagages, puis rejoignez directement votre destination.',
      read: 'Lire les avis des voyageurs',
      previous: 'Avis précédent',
      next: 'Avis suivant',
    },
    cabin: {
      title: 'Le confort fait partie du voyage',
      lead: 'Découvrez les intérieurs et vérifiez le nombre de places et la capacité de bagages pour choisir votre véhicule.',
      seating: 'Places par véhicule',
      luggage: 'Capacité de bagages',
      explore: 'Découvrir la flotte',
    },
  },
  es: {
    process: {
      title: 'Tu traslado privado en tres pasos',
      lead: 'Planifica tu viaje y paga en efectivo al chófer cuando llegues.',
      steps: [
        ['Elige tu viaje', 'Selecciona la ruta, la fecha y un vehículo adecuado para tu grupo.'],
        ['Envía tu solicitud', 'Revisa los detalles y deja tus datos de contacto para que nuestro equipo coordine el traslado.'],
        ['Viaja con comodidad', 'Encuéntrate con tu chófer y paga en efectivo al finalizar el trayecto.'],
      ],
    },
    services: {
      title: 'Viajes privados de la recogida a la llegada',
      hotel: ['Traslados a hoteles', 'Organiza un viaje privado desde o hacia tu hotel en una ruta disponible.'],
      family: ['Transporte familiar', 'Elige un vehículo con espacio para tu familia y vuestro equipaje.'],
      group: ['Transporte para grupos', 'Explora las furgonetas y los autobuses disponibles para grupos grandes.'],
    },
    destinations: {
      title: 'Ziyarat en La Meca y Medina',
      lead: 'Visitas privadas a lugares históricos y sagrados, con atención al trayecto y respeto por cada destino.',
      makkah: 'La Meca',
      madinah: 'Medina',
      explore: 'Explorar las visitas',
    },
    chauffeur: {
      title: 'Una bienvenida personal desde el primer momento',
      lead: 'Nuestro equipo coordina el punto de encuentro y supervisa las llegadas de vuelos para las recogidas en el aeropuerto.',
      points: ['Recogida coordinada', 'Seguimiento de vuelos', 'Transporte privado'],
    },
    reviews: {
      title: 'Lo que cuentan nuestros viajeros',
      experienceTitle: 'Viaja con tranquilidad',
      experience: 'Planifica tu recogida, elige espacio suficiente para los pasajeros y su equipaje y viaja directamente a tu destino.',
      read: 'Leer opiniones de viajeros',
      previous: 'Opinión anterior',
      next: 'Opinión siguiente',
    },
    cabin: {
      title: 'La comodidad es parte del viaje',
      lead: 'Explora los interiores y consulta el número de plazas y la capacidad para equipaje antes de elegir tu vehículo.',
      seating: 'Plazas por vehículo',
      luggage: 'Capacidad para equipaje',
      explore: 'Explorar la flota',
    },
  },
  de: {
    process: {
      title: 'In drei Schritten zu Ihrer Privatfahrt',
      lead: 'Planen Sie Ihre Fahrt und bezahlen Sie Ihren Fahrer nach der Ankunft in bar.',
      steps: [
        ['Fahrt auswählen', 'Wählen Sie Ihre Route, das Reisedatum und ein passendes Fahrzeug für Ihre Gruppe.'],
        ['Buchung anfragen', 'Prüfen Sie die Angaben und hinterlassen Sie Ihre Kontaktdaten, damit unser Team Ihre Fahrt koordinieren kann.'],
        ['Bequem reisen', 'Treffen Sie Ihren Fahrer und bezahlen Sie nach Ende der Fahrt in bar.'],
      ],
    },
    services: {
      title: 'Privatfahrten von der Abholung bis zur Ankunft',
      hotel: ['Hoteltransfers', 'Buchen Sie eine private Fahrt von oder zu Ihrem Hotel auf einer verfügbaren Route.'],
      family: ['Fahrten für Familien', 'Wählen Sie ein Fahrzeug mit Platz für Ihre Familie und Ihr Gepäck.'],
      group: ['Fahrten für Gruppen', 'Entdecken Sie Vans und Busse für größere Reisegruppen.'],
    },
    destinations: {
      title: 'Ziyarat in Mekka und Medina',
      lead: 'Private Besuche historischer und heiliger Orte. Wir kümmern uns um die Fahrt und achten die Bedeutung jedes Reiseziels.',
      makkah: 'Mekka',
      madinah: 'Medina',
      explore: 'Ziyarat entdecken',
    },
    chauffeur: {
      title: 'Ein persönlicher Empfang ab der Ankunft',
      lead: 'Unser Team stimmt den Treffpunkt ab und verfolgt bei Flughafenabholungen den ankommenden Flug.',
      points: ['Abgestimmte Abholung', 'Flugüberwachung', 'Privatfahrt'],
    },
    reviews: {
      title: 'Das sagen unsere Gäste',
      experienceTitle: 'Entspannt ans Ziel',
      experience: 'Planen Sie Ihre Abholung, wählen Sie Platz für Ihre Mitreisenden und das Gepäck und fahren Sie direkt ans Ziel.',
      read: 'Gästebewertungen lesen',
      previous: 'Vorherige Bewertung',
      next: 'Nächste Bewertung',
    },
    cabin: {
      title: 'Komfort gehört zur Reise',
      lead: 'Sehen Sie sich die Innenräume an und prüfen Sie Sitzplätze und Gepäckkapazität, um das passende Fahrzeug zu finden.',
      seating: 'Sitzplätze je Fahrzeug',
      luggage: 'Gepäckkapazität',
      explore: 'Flotte entdecken',
    },
  },
  tr: {
    process: {
      title: 'Özel yolculuğunuz üç adımda hazır',
      lead: 'Yolculuğunuzu planlayın, ulaştıktan sonra ödemenizi şoförünüze nakit yapın.',
      steps: [
        ['Yolculuğunuzu seçin', 'Rotanızı, seyahat tarihinizi ve grubunuza uygun aracı seçin.'],
        ['Rezervasyon talebini gönderin', 'Ayrıntıları kontrol edin ve ekibimizin yolculuğunuzu düzenlemesi için iletişim bilgilerinizi bırakın.'],
        ['Rahatça seyahat edin', 'Şoförünüzle buluşun ve yolculuk tamamlandığında nakit ödeme yapın.'],
      ],
    },
    services: {
      title: 'Alış noktasından varışa özel ulaşım',
      hotel: ['Otel transferleri', 'Mevcut rotalar üzerinden otelinize veya otelinizden özel transfer ayarlayın.'],
      family: ['Aile ulaşımı', 'Ailenize ve bagajınıza uygun koltuk ve alan sunan bir araç seçin.'],
      group: ['Grup ulaşımı', 'Büyük gruplar için filodaki minibüs ve otobüsleri inceleyin.'],
    },
    destinations: {
      title: 'Mekke ve Medine ziyaretleri',
      lead: 'Tarihi ve kutsal mekânlara, yolculuk ayrıntılarına özen ve ziyaret yerlerine saygıyla düzenlenen özel ziyaretler.',
      makkah: 'Mekke-i Mükerreme',
      madinah: 'Medine-i Münevvere',
      explore: 'Ziyaretleri keşfedin',
    },
    chauffeur: {
      title: 'Varış anından itibaren içten karşılama',
      lead: 'Ekibimiz buluşma noktasını düzenler ve havalimanından alınacak yolcuların uçuşlarını takip eder.',
      points: ['Planlı karşılama', 'Uçuş takibi', 'Özel ulaşım'],
    },
    reviews: {
      title: 'Misafirlerimiz anlatıyor',
      experienceTitle: 'İçiniz rahat yolculuk edin',
      experience: 'Alış noktanızı planlayın, misafirlerinize ve bagajınıza uygun alanı seçin, doğrudan varış noktanıza ulaşın.',
      read: 'Misafir yorumlarını okuyun',
      previous: 'Önceki yorum',
      next: 'Sonraki yorum',
    },
    cabin: {
      title: 'Konfor yolculuğun bir parçası',
      lead: 'Araç içi fotoğrafları inceleyin, koltuk ve bagaj kapasitesine bakarak size uygun aracı seçin.',
      seating: 'Araç başına koltuk',
      luggage: 'Bagaj kapasitesi',
      explore: 'Filoyu keşfedin',
    },
  },
  hi: {
    process: {
      title: 'तीन चरणों में अपनी निजी यात्रा तय करें',
      lead: 'अपनी यात्रा की योजना बनाएँ और पहुँचने पर चालक को नकद भुगतान करें।',
      steps: [
        ['अपनी यात्रा चुनें', 'मार्ग, यात्रा की तारीख और अपने समूह के लिए उपयुक्त वाहन चुनें।'],
        ['बुकिंग का अनुरोध भेजें', 'जानकारी जाँचें और संपर्क विवरण दें ताकि हमारी टीम आपकी यात्रा का इंतज़ाम कर सके।'],
        ['आराम से यात्रा करें', 'अपने चालक से मिलें और यात्रा पूरी होने पर नकद भुगतान करें।'],
      ],
    },
    services: {
      title: 'पिकअप से मंज़िल तक निजी यात्रा',
      hotel: ['होटल ट्रांसफ़र', 'उपलब्ध मार्ग पर अपने होटल से या होटल तक निजी सफ़र तय करें।'],
      family: ['परिवार के लिए परिवहन', 'अपने परिवार और सामान के लिए पर्याप्त जगह वाला वाहन चुनें।'],
      group: ['समूह के लिए परिवहन', 'बड़े समूहों के लिए उपलब्ध वैन और बसें देखें।'],
    },
    destinations: {
      title: 'मक्का और मदीना की ज़ियारत',
      lead: 'ऐतिहासिक और पवित्र स्थलों की निजी यात्रा, सफ़र के हर पहलू पर ध्यान और हर स्थल के प्रति सम्मान के साथ।',
      makkah: 'मक्का अल मुकर्रमा',
      madinah: 'मदीना अल मुनव्वरा',
      explore: 'ज़ियारत के विकल्प देखें',
    },
    chauffeur: {
      title: 'आगमन से ही आत्मीय स्वागत',
      lead: 'हमारी टीम मिलने की जगह तय करती है और हवाई अड्डे के पिकअप के लिए आने वाली उड़ानों पर नज़र रखती है।',
      points: ['पिकअप का समन्वय', 'उड़ान पर नज़र', 'निजी परिवहन'],
    },
    reviews: {
      title: 'हमारे मेहमानों की ज़ुबानी',
      experienceTitle: 'निश्चिंत होकर यात्रा करें',
      experience: 'पिकअप की योजना बनाएँ, यात्रियों और सामान के लिए उपयुक्त जगह चुनें और सीधे अपनी मंज़िल तक जाएँ।',
      read: 'मेहमानों की समीक्षाएँ पढ़ें',
      previous: 'पिछली समीक्षा',
      next: 'अगली समीक्षा',
    },
    cabin: {
      title: 'आराम भी यात्रा का हिस्सा है',
      lead: 'वाहनों के अंदर की तस्वीरें देखें और सीटों तथा सामान की क्षमता देखकर अपने लिए उपयुक्त वाहन चुनें।',
      seating: 'हर वाहन में सीटें',
      luggage: 'सामान की क्षमता',
      explore: 'वाहन देखें',
    },
  },
};
