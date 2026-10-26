// Pilgrim Country Landing Pages Data
// Status: All entries drafted as "draft, needs human review".
// Factual guidelines: strictly private chauffeur with driver (no tour guide or package claims).
// Accurate departure hubs, authentic local currency & payment nuances, verified airline connections.

export interface PilgrimCountryData {
  slug: string;
  nameEn: string;
  nameNative: string;
  demonym: string;
  primaryLanguage: string;
  currencyCode: string;
  currencySymbol: string;
  titleEn: string;
  titleNative: string;
  metaDescEn: string;
  metaDescNative: string;
  h1En: string;
  h1Native: string;
  introEn: string;
  introNative: string;
  departureAirportsEn: string[];
  departureAirportsNative: string[];
  airlinesEn: string[];
  recommendedVehicles: {
    groupType: string;
    vehicleSlug: string;
    vehicleName: string;
    seats: number;
    bags: number;
    reasonEn: string;
    reasonNative: string;
  }[];
  localTravelTipsEn: string[];
  localTravelTipsNative: string[];
  paymentAndCurrencyEn: string;
  paymentAndCurrencyNative: string;
  faqsEn: { q: string; a: string }[];
  faqsNative: { q: string; a: string }[];
  impressumRequired?: boolean;
  noindex?: boolean;
  status: 'draft, needs human review' | 'published';
}

export const PILGRIM_COUNTRIES: Record<string, PilgrimCountryData> = {
  'indonesia': {
    slug: 'indonesia',
    nameEn: 'Indonesia',
    nameNative: 'Indonesia',
    demonym: 'Indonesian',
    primaryLanguage: 'id',
    currencyCode: 'IDR',
    currencySymbol: 'Rp',
    titleEn: 'Private Umrah Chauffeur for Indonesian Pilgrims (2026)',
    titleNative: 'Transportasi Umrah & Sewa Mobil Privat Jamaah Indonesia',
    metaDescEn: 'Private chauffeur transfers for Indonesian Umrah pilgrims arriving in Jeddah & Madinah. VIP Staria & HiAce, Indonesian language assistance, pay on arrival.',
    metaDescNative: 'Layanan transportasi umrah dan sewa mobil privat untuk jamaah Indonesia di Jeddah, Mekah, dan Madinah. Armada Staria & HiAce, pembayaran saat tiba.',
    h1En: 'Private Umrah Chauffeur Services for Indonesian Pilgrims',
    h1Native: 'Layanan Transportasi Umrah & Mobil Privat untuk Jamaah Indonesia',
    introEn: 'Arrive at King Abdulaziz Airport (JED) or Madinah Airport (MED) with absolute peace of mind. Royal Umrah Cabs provides dedicated VIP chauffeurs, spacious luggage capacity for Indonesian family groups and 5-liter Zamzam containers, and direct hotel drop-offs with zero advance payment required.',
    introNative: 'Sambut ibadah Umrah Anda dengan ketenangan sejak tiba di Bandara Jeddah (KAIA) atau Madinah (MED). Royal Umrah Cabs menyediakan layanan supir privat terpercaya, kapasitas bagasi luas untuk koper besar dan air Zamzam 5 liter, serta pembayaran langsung saat tiba di hotel.',
    departureAirportsEn: ['Jakarta Soekarno-Hatta (CGK)', 'Surabaya Juanda (SUB)', 'Medan Kualanamu (KNO)', 'Makassar Sultan Hasanuddin (UPG)', 'Solo Adi Soemarmo (SOC)'],
    departureAirportsNative: ['Jakarta Soekarno-Hatta (CGK)', 'Surabaya Juanda (SUB)', 'Medan Kualanamu (KNO)', 'Makassar Sultan Hasanuddin (UPG)', 'Solo Adi Soemarmo (SOC)'],
    airlinesEn: ['Garuda Indonesia', 'Saudia', 'Lion Air', 'Batik Air', 'Qatar Airways', 'Emirates'],
    recommendedVehicles: [
      {
        groupType: 'Families (4 to 7 pax)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'Hyundai Staria VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Captain seats and huge boot space comfortably carrying 6 large hard suitcases plus 5L Zamzam boxes.',
        reasonNative: 'Kursi kapten mewah dengan bagasi lapang untuk 6 koper besar dan kardus air Zamzam 5 liter.',
      },
      {
        groupType: 'Small Groups / Jamaah (8 to 10 pax)',
        vehicleSlug: 'toyota-hiace',
        vehicleName: 'Toyota HiAce VIP',
        seats: 10,
        bags: 10,
        reasonEn: 'Extra-high roof minibus accommodating up to 10 passengers with dedicated rear luggage hold.',
        reasonNative: 'Minibus atap tinggi yang memuat hingga 10 penumpang dengan ruang bagasi belakang terpisah.',
      },
    ],
    localTravelTipsEn: [
      'Jeddah Terminal 1 features a long walking concourse; inform your chauffeur via WhatsApp as soon as your flight touches down.',
      'Indonesian pilgrims settle fares directly upon arrival at their hotel in cash (Saudi Riyals - SAR or US Dollars - USD). Cards and bank transfers are not accepted.',
      'Our dispatch team includes coordinators fluent in Bahasa Indonesia for smooth communication.',
    ],
    localTravelTipsNative: [
      'Terminal 1 Bandara Jeddah memiliki koridor yang panjang; hubungi supir Anda melalui WhatsApp segera setelah pesawat mendarat.',
      'Jamaah Indonesia membayar ongkos langsung saat tiba di hotel secara tunai dalam Saudi Riyal (SAR) atau Dolar AS (USD). Kartu dan transfer bank tidak diterima.',
      'Tim koordinasi kami siap melayani komunikasi dalam Bahasa Indonesia untuk kemudahan Anda.',
    ],
    paymentAndCurrencyEn: 'Fixed fares displayed in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',
    paymentAndCurrencyNative: 'Tarif tetap transparan dalam Saudi Riyal (SAR). Tanpa uang muka. Bayar tunai saat tiba (SAR atau USD).',
    faqsEn: [
      {
        q: 'Do you provide Indonesian-speaking drivers?',
        a: 'We have Indonesian and Malay-speaking chauffeurs upon advance request, and our 24/7 WhatsApp dispatch team assists you in Bahasa Indonesia.',
      },
      {
        q: 'Where does the driver meet our family at Jeddah Airport?',
        a: 'Directly outside the international arrivals gate in Terminal 1 with a personalized name placard.',
      },
    ],
    faqsNative: [
      {
        q: 'Apakah tersedia supir yang bisa berbahasa Indonesia?',
        a: 'Kami memiliki supir berbahasa Indonesia/Melayu berdasarkan permintaan awal, dan tim WhatsApp kami melayani dalam Bahasa Indonesia 24/7.',
      },
      {
        q: 'Di mana supir akan menyambut keluarga kami di Bandara Jeddah?',
        a: 'Tepat di luar pintu keluar kedatangan internasional Terminal 1 dengan papan nama bertuliskan nama Anda.',
      },
    ],
    status: 'draft, needs human review',
  },

  'malaysia': {
    slug: 'malaysia',
    nameEn: 'Malaysia',
    nameNative: 'Malaysia',
    demonym: 'Malaysian',
    primaryLanguage: 'ms',
    currencyCode: 'MYR',
    currencySymbol: 'RM',
    titleEn: 'Private Umrah Chauffeur for Malaysian Pilgrims (2026)',
    titleNative: 'Teksi Umrah VIP & Pemandu Peribadi Jemaah Malaysia',
    metaDescEn: 'Private Umrah chauffeur for Malaysian pilgrims at Jeddah Airport & Madinah. Hyundai Staria VIP & HiAce, Malay assistance, pay on arrival at hotel.',
    metaDescNative: 'Perkhidmatan teksi persendirian dan pemandu VIP Umrah untuk jemaah Malaysia di Lapangan Terbang Jeddah & Madinah. Bayar terus semasa tiba di hotel.',
    h1En: 'Private Umrah Chauffeur Services for Malaysian Pilgrims',
    h1Native: 'Perkhidmatan Pemandu Peribadi Umrah untuk Jemaah Malaysia',
    introEn: 'Designed specifically for Malaysian pilgrims arriving on direct and connecting flights from Kuala Lumpur and Penang. Enjoy door-to-door VIP transfers to your Makkah Clock Tower or Madinah Central hotel without bargaining, delays, or prepayment.',
    introNative: 'Dikhususkan untuk jemaah Umrah Malaysia yang tiba dari KLIA atau Pulau Pinang. Nikmati perjalanan terus ke hotel Makkah atau Madinah dengan van VIP Staria yang selesa, tanpa perlu tawar-menawar atau bayaran pendahuluan.',
    departureAirportsEn: ['Kuala Lumpur International Airport (KLIA/KLIA2)', 'Penang International Airport (PEN)', 'Johor Bahru Senai (JHB)', 'Kota Kinabalu (BKI)'],
    departureAirportsNative: ['Lapangan Terbang Antarabangsa Kuala Lumpur (KLIA/KLIA2)', 'Lapangan Terbang Antarabangsa Pulau Pinang (PEN)', 'Senai Johor Bahru (JHB)', 'Kota Kinabalu (BKI)'],
    airlinesEn: ['Malaysia Airlines', 'Saudia', 'AirAsia X', 'Batik Air Malaysia', 'Qatar Airways', 'Emirates'],
    recommendedVehicles: [
      {
        groupType: 'Keluarga (4 hingga 7 jemaah)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'Hyundai Staria VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Ultra-modern executive styling, reclining middle-row captain seats, and ample luggage space for Malaysian Umrah bags.',
        reasonNative: 'Kerusi kapten yang sangat selesa untuk ibu bapa warga emas, pendingin hawa sejuk dan ruang luas untuk beg jemaah.',
      },
      {
        groupType: 'Rombongan Keluarga Besar (8 hingga 10 jemaah)',
        vehicleSlug: 'toyota-hiace',
        vehicleName: 'Toyota HiAce VIP Minibus',
        seats: 10,
        bags: 10,
        reasonEn: 'Spacious high-roof minibus ensuring extended families stay together on the 4.5-hour Makkah to Madinah highway.',
        reasonNative: 'Minibus bumbung tinggi yang luas, membolehkan keluarga besar bergerak bersama dengan selesa antara Makkah dan Madinah.',
      },
    ],
    localTravelTipsEn: [
      'Flight Tracking: We monitor Malaysia Airlines MH156/MH160 and Saudia SV831/SV841 arrivals in real time so your chauffeur is ready even if flights land early.',
      'Miqat Stops: For transfers from Madinah to Makkah, our drivers include a dedicated 45-minute stop at Masjid Dhu al-Hulayfah (Bir Ali) for Ihram and Niyyah.',
      'Payment: Cash paid directly to your chauffeur upon arrival in Saudi Riyals (SAR) or US Dollars (USD). Cards and bank transfers are not accepted.',
    ],
    localTravelTipsNative: [
      'Penjejakan Penerbangan: Kami memantau waktu ketibaan penerbangan seperti MH156/MH160 dan SV831/SV841 secara langsung.',
      'Persinggahan Miqat: Perjalanan dari Madinah ke Makkah merangkumi perhentian 45 minit di Miqat Bir Ali untuk berniat ihram dan solat sunat.',
      'Pembayaran: Bayaran dibuat secara tunai terus kepada pemandu setibanya di hotel dalam SAR atau USD. Kad dan pindahan bank tidak diterima.',
    ],
    paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',
    paymentAndCurrencyNative: 'Kadar tambang tetap dalam Saudi Riyal (SAR). Tanpa sebarang deposit. Bayar tunai semasa tiba (SAR atau USD).',
    faqsEn: [
      {
        q: 'Can the driver assist elderly pilgrims with wheelchairs?',
        a: 'Yes, our chauffeurs assist with wheelchair loading and provide doorstep service right at your hotel lobby.',
      },
      {
        q: 'What if our flight arrives late at night at Jeddah Airport?',
        a: 'Our chauffeur service operates 24 hours a day, 7 days a week. Your driver will meet you regardless of arrival hour.',
      },
    ],
    faqsNative: [
      {
        q: 'Bolehkah pemandu membantu jemaah warga emas berkerusi roda?',
        a: 'Ya, pemandu kami bersedia membantu memuatkan kerusi roda dan memastikan kemudahan keluar masuk sehingga ke lobi hotel.',
      },
      {
        q: 'Bagaimana jika penerbangan tiba lewat malam di Lapangan Terbang Jeddah?',
        a: 'Perkhidmatan kami beroperasi 24 jam sehari, 7 hari seminggu. Pemandu tetap menunggu anda pada bila-bila masa.',
      },
    ],
    status: 'draft, needs human review',
  },

  'pakistan': {
    slug: 'pakistan',
    nameEn: 'Pakistan',
    nameNative: 'پاکستان',
    demonym: 'Pakistani',
    primaryLanguage: 'ur',
    currencyCode: 'PKR',
    currencySymbol: 'Rs',
    titleEn: 'Private Umrah Chauffeur for Pakistani Pilgrims (2026)',
    titleNative: 'عمرہ پرائیویٹ ٹرانسپورٹ و ٹیکسی سروس برائے پاکستانی زائرین',
    metaDescEn: 'Private chauffeur services for Pakistani pilgrims arriving at Jeddah and Madinah airports. VIP Staria, Yukon & HiAce, Urdu assistance, pay on arrival.',
    metaDescNative: 'جدہ ایئرپورٹ تا مکہ مکرمہ اور مدینہ منورہ پرائیویٹ گاڑی مع ڈرائیور۔ پاکستانی زائرین کے لیے خصوصی اردو سروس، ہوٹل پہنچ کر ادائیگی۔',
    h1En: 'Private Umrah Chauffeur Services for Pakistani Pilgrims',
    h1Native: 'پاکستانی زائرین کے لیے خصوصی پرائیویٹ عمرہ ٹرانسپورٹ سروس',
    introEn: 'Door-to-door private transfers for Pakistani pilgrims arriving on flights from Karachi, Lahore, Islamabad, Multan, and Peshawar. Settle into modern, air-conditioned executive vehicles with ample luggage capacity for large suitcases and Zamzam cans.',
    introNative: 'کراچی، لاہور، اسلام آباد، ملتان اور پشاور سے آنے والے معزز پاکستانی زائرین کے لیے جدہ اور مدینہ ایئرپورٹ سے مکہ مکرمہ و مدینہ منورہ کے ہوٹل تک آرام دہ پرائیویٹ گاڑی کی سہولت۔ بغیر کسی پیشگی ایڈوانس کے ہوٹل پہنچنے پر ادائیگی۔',
    departureAirportsEn: ['Karachi Jinnah (KHI)', 'Lahore Allama Iqbal (LHE)', 'Islamabad International (ISB)', 'Peshawar Bacha Khan (PEW)', 'Multan International (MUX)', 'Sialkot International (SKT)'],
    departureAirportsNative: ['کراچی جناح انٹرنیشنل (KHI)', 'لاہور علامہ اقبال انٹرنیشنل (LHE)', 'اسلام آباد انٹرنیشنل (ISB)', 'پشاور باچا خان انٹرنیشنل (PEW)', 'ملتان انٹرنیشنل (MUX)', 'سیالکوٹ انٹرنیشنل (SKT)'],
    airlinesEn: ['PIA (Pakistan International Airlines)', 'Saudia', 'Airblue', 'Serene Air', 'Emirates', 'Gulf Air'],
    recommendedVehicles: [
      {
        groupType: 'Family Groups (4 to 7 persons)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'Hyundai Staria VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Smooth ride, dual-zone AC, and generous cargo area that easily handles large Pakistani suitcases and Zamzam containers.',
        reasonNative: 'بہترین ائیرکنڈیشنڈ، آرام دہ سیٹیں اور بڑے پاکستانی سفری سوٹ کیسز اور زمزم کے کین رکھنے کی وسیع گنجائش۔',
      },
      {
        groupType: 'Extended Families (8 to 10 persons)',
        vehicleSlug: 'toyota-hiace',
        vehicleName: 'Toyota HiAce VIP Minibus',
        seats: 10,
        bags: 10,
        reasonEn: 'Roomy high-roof van allowing the whole family to travel together comfortably without booking separate taxis.',
        reasonNative: 'وسیع ہائی روف وین تاکہ پورا خاندان علیحدہ گاڑیوں کے بجائے ایک ساتھ اطمینان و سہولت سے سفر کر سکے۔',
      },
    ],
    localTravelTipsEn: [
      'Both North Terminal and Terminal 1 at Jeddah Airport are served with personalized nameplate meet-and-greet.',
      'Our dispatch coordinators speak Urdu fluently to ensure clear guidance and phone coordination upon landing.',
      'Zero advance payment required: Pay your chauffeur upon reaching your hotel strictly in cash (SAR or USD). Cards are not accepted.',
    ],
    localTravelTipsNative: [
      'جدہ ایئرپورٹ کے دونوں ٹرمینلز (نارتھ ٹرمینل اور ٹرمینل 1) پر نیم پلیٹ کے ساتھ باوقار استقبال۔',
      'ہماری سپورٹ ٹیم مکمل طور پر اردو زبان میں رہنمائی فراہم کرتی ہے تاکہ ایئرپورٹ پہنچنے پر کوئی دشواری پیش نہ آئے۔',
      'پیشگی ادائیگی کی کوئی شرط نہیں؛ ہوٹل باحفاظت پہنچنے پر اپنے ڈرائیور کو نقد ریال یا کارڈ کے ذریعے کرایہ ادا کریں۔',
    ],
    paymentAndCurrencyEn: 'Guaranteed fixed fares in Saudi Riyals (SAR). No advance payment. Cash upon arrival (SAR or USD).',
    paymentAndCurrencyNative: 'سعودی ریال (SAR) میں فکسڈ کرایہ۔ پیشگی ادائیگی کے بغیر۔ آمد پر نقد ادائیگی (سعودی ریال یا امریکی ڈالر)۔',
    faqsEn: [
      {
        q: 'Do you pick up from both Jeddah Airport Terminal 1 and North Terminal?',
        a: 'Yes, we track your flight number whether you arrive on Saudia/PIA at Terminal 1 or budget carriers at the North Terminal.',
      },
      {
        q: 'Can the car accommodate large suitcases and 5-liter Zamzam cans?',
        a: 'Yes, our Staria VIP and HiAce vans are selected specifically for generous luggage volume.',
      },
    ],
    faqsNative: [
      {
        q: 'کیا آپ جدہ ایئرپورٹ کے نارتھ ٹرمینل اور ٹرمینل 1 دونوں سے پک اپ کرتے ہیں؟',
        a: 'جی ہاں، پی آئی اے، سعودیہ یا ایئربلو، آپ کا فلائٹ نمبر مانیٹر کر کے ڈرائیور متعلقہ ٹرمینل پر وقت پر موجود ہوتا ہے۔',
      },
      {
        q: 'کیا گاڑی میں بڑے بیگز اور آبِ زمزم کے کین باآسانی آ جاتے ہیں؟',
        a: 'جی ہاں، ہماری سٹاریا اور ہائی ایس وینز خاص طور پر فیملی کے بڑے سامان اور زمزم کینز کے لیے بہترین اور کشادہ ہیں۔',
      },
    ],
    status: 'draft, needs human review',
  },

  'india': {
    slug: 'india',
    nameEn: 'India',
    nameNative: 'भारत (India)',
    demonym: 'Indian',
    primaryLanguage: 'hi',
    currencyCode: 'INR',
    currencySymbol: '₹',
    titleEn: 'Private Umrah Chauffeur for Indian Pilgrims (2026)',
    titleNative: 'भारतीय जायरीन के लिए प्राइवेट उमरा टैक्सी व कार सर्विस',
    metaDescEn: 'Private Umrah chauffeur for Indian pilgrims from Delhi, Mumbai, Hyderabad, Kerala to Jeddah & Madinah. VIP vans, Hindi & Urdu assistance, pay on arrival.',
    metaDescNative: 'जेद्दा एयरपोर्ट से मक्का व मदीना के लिए भारतीय जायरीन हेतु प्राइवेट कार सर्विस। हिंदी/उर्दू सहायता, होटल पहुंचकर नकद/कार्ड भुगतान।',
    h1En: 'Private Umrah Chauffeur Services for Indian Pilgrims',
    h1Native: 'भारतीय जायरीन के लिए विशेष प्राइवेट उमरा टैक्सी सर्विस',
    introEn: 'Reliable, air-conditioned private transfers for Indian pilgrims departing from Delhi, Mumbai, Hyderabad, Kozhikode, and Bengaluru. Direct hotel-to-hotel chauffeur transport across Jeddah, Makkah, and Madinah with fixed transparent pricing.',
    introNative: 'दिल्ली, मुंबई, हैदराबाद, कोझिकोड और बेंगलुरु से आने वाले भारतीय जायरीन के लिए जेद्दा और मदीना एयरपोर्ट से सीधे होटल तक आरामदायक प्राइवेट कार। बिना किसी मोलभाव और बिना एडवांस पेमेंट के तयशुदा किराए पर सुरक्षित सफर।',
    departureAirportsEn: ['Delhi Indira Gandhi (DEL)', 'Mumbai Chhatrapati Shivaji (BOM)', 'Hyderabad Rajiv Gandhi (HYD)', 'Kozhikode Calicut (CCJ)', 'Kochi Cochin (COK)', 'Bengaluru Kempegowda (BLR)', 'Lucknow Chaudhary Charan Singh (LKO)'],
    departureAirportsNative: ['दिल्ली इंदिरा गांधी (DEL)', 'मुंबई छत्रपति शिवाजी (BOM)', 'हैदराबाद राजीव गांधी (HYD)', 'कोझिकोड कालीकट (CCJ)', 'कोच्चि कोचीन (COK)', 'बेंगलुरु केम्पेगौड़ा (BLR)', 'लखनऊ (LKO)'],
    airlinesEn: ['Air India', 'Air India Express', 'Saudia', 'IndiGo', 'Emirates', 'Flyadeal', 'Flynas'],
    recommendedVehicles: [
      {
        groupType: 'Families (4 to 7 pax)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'Hyundai Staria VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Comfortable family van with modern suspension, cooling AC, and ample boot space for check-in bags and Zamzam cans.',
        reasonNative: 'आरामदायक फैमिली वैन, बेहतरीन एसी और बड़े ट्रॉली बैग व जमजम केन रखने के लिए भरपूर जगह।',
      },
      {
        groupType: 'Larger Groups (8 to 10 pax)',
        vehicleSlug: 'toyota-hiace',
        vehicleName: 'Toyota HiAce VIP',
        seats: 10,
        bags: 10,
        reasonEn: 'Spacious high-roof minibus allowing multi-generational Indian families to travel together in air-conditioned comfort.',
        reasonNative: 'बड़ा हाई-रूफ मिनीबस जिससे पूरा परिवार एक साथ बिना किसी परेशानी के आराम से सफर कर सके।',
      },
    ],
    localTravelTipsEn: [
      'Our team tracks flight schedules across Indian departures: your driver will be waiting at arrivals even if your flight is rescheduled.',
      'Assistance available in Hindi, Urdu, and English through our 24/7 WhatsApp dispatch team.',
      'Transparent payment: settle directly in cash (SAR or USD) upon arriving at your hotel. Cards and bank transfers are not accepted.',
    ],
    localTravelTipsNative: [
      'हमारी टीम आपकी फ्लाइट पर लाइव नजर रखती है; फ्लाइट लेट होने पर भी ड्राइवर आपका इंतजार करेगा बिना किसी अतिरिक्त चार्ज के।',
      'हिंदी और उर्दू में 24/7 व्हाट्सएप सपोर्ट उपलब्ध है।',
      'होटल पहुंचने पर सीधे सऊदी रियाल नकद या अंतरराष्ट्रीय कार्ड से भुगतान करें।',
    ],
    paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',
    paymentAndCurrencyNative: 'सऊदी रियाल (SAR) में तयशुदा किराया। कोई अग्रिम भुगतान नहीं। आगमन पर नकद भुगतान (SAR या USD)।',
    faqsEn: [
      {
        q: 'Do drivers wait if there is a delay at Jeddah immigration?',
        a: 'Yes, we provide 60 minutes complimentary waiting time starting from when your flight officially lands.',
      },
      {
        q: 'Can we stop at Bir Ali Miqat when traveling from Madinah to Makkah?',
        a: 'Yes, our Madinah to Makkah transfers include a dedicated 45-minute stop at Masjid Dhu al-Hulayfah (Bir Ali) for Ihram and Niyyah.',
      },
    ],
    faqsNative: [
      {
        q: 'क्या जेद्दा एयरपोर्ट पर इमिग्रेशन में देरी होने पर ड्राइवर इंतजार करता है?',
        a: 'जी हां, फ्लाइट लैंड होने के बाद 60 मिनट का मुफ्त वेटिंग टाइम शामिल है ताकि आप तसल्ली से बाहर आ सकें।',
      },
      {
        q: 'क्या मदीना से मक्का जाते समय मीक़ात बिर अली पर गाड़ी रुकती है?',
        a: 'जी हां, मदीना से मक्का के सफर में एहराम बांधने और नमाज़ अदा करने के लिए मस्जिद बिर अली पर 45 मिनट का ठहराव शामिल है।',
      },
    ],
    status: 'draft, needs human review',
  },

  'uk': {
    slug: 'uk',
    nameEn: 'United Kingdom',
    nameNative: 'United Kingdom',
    demonym: 'British',
    primaryLanguage: 'en',
    currencyCode: 'GBP',
    currencySymbol: '£',
    titleEn: 'Private Umrah Chauffeur for UK Pilgrims (2026)',
    titleNative: 'Private Umrah Chauffeur for UK Pilgrims (2026)',
    metaDescEn: 'Premium private Umrah chauffeur transfers for British pilgrims from London Heathrow, Manchester & Birmingham to Makkah & Madinah. VIP Yukon & Staria.',
    metaDescNative: 'Premium private Umrah chauffeur transfers for British pilgrims from London Heathrow, Manchester & Birmingham to Makkah & Madinah. VIP Yukon & Staria.',
    h1En: 'Private Umrah Chauffeur Services for UK Pilgrims',
    h1Native: 'Private Umrah Chauffeur Services for UK Pilgrims',
    introEn: 'Designed for British pilgrims travelling from London Heathrow, Gatwick, Manchester, and Birmingham. Enjoy a smooth arrival at Jeddah Airport (Terminal 1) with an executive chauffeur awaiting you with a nameboard, ready to transfer your family directly to your Makkah or Madinah hotel.',
    introNative: 'Designed for British pilgrims travelling from London Heathrow, Gatwick, Manchester, and Birmingham. Enjoy a smooth arrival at Jeddah Airport (Terminal 1) with an executive chauffeur awaiting you with a nameboard, ready to transfer your family directly to your Makkah or Madinah hotel.',
    departureAirportsEn: ['London Heathrow (LHR)', 'London Gatwick (LGW)', 'Manchester (MAN)', 'Birmingham (BHX)', 'Glasgow (GLA)'],
    departureAirportsNative: ['London Heathrow (LHR)', 'London Gatwick (LGW)', 'Manchester (MAN)', 'Birmingham (BHX)', 'Glasgow (GLA)'],
    airlinesEn: ['British Airways', 'Saudia', 'Emirates', 'Qatar Airways', 'Gulf Air', 'Turkish Airlines'],
    recommendedVehicles: [
      {
        groupType: 'Families seeking VIP luxury (up to 7 pax)',
        vehicleSlug: 'gmc-yukon-xl',
        vehicleName: 'GMC Yukon XL VIP',
        seats: 7,
        bags: 8,
        reasonEn: 'Extended-wheelbase flagship SUV with deep leather seats and massive cargo capacity for UK hard-shell cases and Zamzam boxes.',
        reasonNative: 'Extended-wheelbase flagship SUV with deep leather seats and massive cargo capacity for UK hard-shell cases and Zamzam boxes.',
      },
      {
        groupType: 'Executive Family Van (4 to 7 pax)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'Hyundai Staria VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Contemporary passenger cabin with reclining captain chairs and low-entry sliding doors, perfect for elderly parents and young children.',
        reasonNative: 'Contemporary passenger cabin with reclining captain chairs and low-entry sliding doors, perfect for elderly parents and young children.',
      },
    ],
    localTravelTipsEn: [
      'UK flights via Saudia or British Airways land at Terminal 1. Your driver will meet you by the international arrivals exit.',
      'Zero advance deposit: Settle your fixed fare on arrival at your hotel strictly in cash (Saudi Riyals - SAR or US Dollars - USD). Cards are not accepted.',
      'English-speaking dispatch: Contact our UK-friendly operations desk on WhatsApp 24/7 for real-time tracking.',
    ],
    localTravelTipsNative: [
      'UK flights via Saudia or British Airways land at Terminal 1. Your driver will meet you by the international arrivals exit.',
      'Zero advance deposit: Settle your fixed fare on arrival at your hotel strictly in cash (Saudi Riyals - SAR or US Dollars - USD). Cards are not accepted.',
      'English-speaking dispatch: Contact our UK-friendly operations desk on WhatsApp 24/7 for real-time tracking.',
    ],
    paymentAndCurrencyEn: 'Fixed fares quoted in SAR. Zero advance deposit. Pay cash on arrival (SAR or USD).',
    paymentAndCurrencyNative: 'Fixed fares quoted in SAR. Zero advance deposit. Pay cash on arrival (SAR or USD).',
    faqsEn: [
      {
        q: 'Do you track flights from London Heathrow or Manchester if there is a delay?',
        a: 'Yes, our dispatch monitors flight radar feeds continuously. Pickup times adjust automatically with no waiting fees for airline delays.',
      },
      {
        q: 'What payment methods are accepted upon arrival?',
        a: 'We accept cash payments only, paid directly to your chauffeur upon arrival in Saudi Riyals (SAR) or US Dollars (USD). We do not accept debit cards, credit cards, POS terminals, online payments, or bank transfers.',
      },
    ],
    faqsNative: [
      {
        q: 'Do you track flights from London Heathrow or Manchester if there is a delay?',
        a: 'Yes, our dispatch monitors flight radar feeds continuously. Pickup times adjust automatically with no waiting fees for airline delays.',
      },
      {
        q: 'What payment methods are accepted upon arrival?',
        a: 'We accept cash payments only, paid directly to your chauffeur upon arrival in Saudi Riyals (SAR) or US Dollars (USD). We do not accept debit cards, credit cards, POS terminals, online payments, or bank transfers.',
      },
    ],
    status: 'draft, needs human review',
  },

  'usa': {
    slug: 'usa',
    nameEn: 'United States',
    nameNative: 'United States',
    demonym: 'American',
    primaryLanguage: 'en',
    currencyCode: 'USD',
    currencySymbol: '$',
    titleEn: 'Private Umrah Chauffeur for American Pilgrims (2026)',
    titleNative: 'Private Umrah Chauffeur for American Pilgrims (2026)',
    metaDescEn: 'Executive private Umrah chauffeur transfers for US pilgrims arriving from New York (JFK), Washington (IAD), Chicago (ORD), Houston & California.',
    metaDescNative: 'Executive private Umrah chauffeur transfers for US pilgrims arriving from New York (JFK), Washington (IAD), Chicago (ORD), Houston & California.',
    h1En: 'Private Umrah Chauffeur Services for US Pilgrims',
    h1Native: 'Private Umrah Chauffeur Services for US Pilgrims',
    introEn: 'After a demanding 12-to-16 hour journey from North America, avoid the exhaustion of negotiating airport taxis. Royal Umrah Cabs provides verified executive chauffeurs, pristine GMC Yukon XL and Hyundai Staria vehicles, and door-to-door comfort directly to your hotel doorstep in Makkah or Madinah.',
    introNative: 'After a demanding 12-to-16 hour journey from North America, avoid the exhaustion of negotiating airport taxis. Royal Umrah Cabs provides verified executive chauffeurs, pristine GMC Yukon XL and Hyundai Staria vehicles, and door-to-door comfort directly to your hotel doorstep in Makkah or Madinah.',
    departureAirportsEn: ['New York JFK (JFK)', 'Washington Dulles (IAD)', "Chicago O'Hare (ORD)", 'Houston George Bush (IAH)', 'Los Angeles (LAX)', 'Dallas/Fort Worth (DFW)'],
    departureAirportsNative: ['New York JFK (JFK)', 'Washington Dulles (IAD)', "Chicago O'Hare (ORD)", 'Houston George Bush (IAH)', 'Los Angeles (LAX)', 'Dallas/Fort Worth (DFW)'],
    airlinesEn: ['Saudia (Direct from JFK, IAD, LAX)', 'Qatar Airways', 'Emirates', 'Turkish Airlines', 'Etihad Airways'],
    recommendedVehicles: [
      {
        groupType: 'Families & Executives (up to 7 pax)',
        vehicleSlug: 'gmc-yukon-xl',
        vehicleName: 'GMC Yukon XL VIP',
        seats: 7,
        bags: 8,
        reasonEn: 'American-sized extended wheelbase luxury SUV with plush seating and abundant boot space for large US 28-inch checked suitcases.',
        reasonNative: 'American-sized extended wheelbase luxury SUV with plush seating and abundant boot space for large US 28-inch checked suitcases.',
      },
    ],
    localTravelTipsEn: [
      'Direct Saudia flights land at Terminal 1; common 1-stop flights via Turkish, Qatar, or Emirates also land at Terminal 1.',
      'Pay on arrival in cash directly to your driver (USD or SAR). Credit cards, POS terminals, and online payments are not accepted.',
      'Chilled bottled water and climate-controlled cabins ensure immediate recovery after long trans-Atlantic flights.',
    ],
    localTravelTipsNative: [
      'Direct Saudia flights land at Terminal 1; common 1-stop flights via Turkish, Qatar, or Emirates also land at Terminal 1.',
      'Pay on arrival in cash directly to your driver (USD or SAR). Credit cards, POS terminals, and online payments are not accepted.',
      'Chilled bottled water and climate-controlled cabins ensure immediate recovery after long trans-Atlantic flights.',
    ],
    paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR) and US Dollars (USD). Zero advance deposit. Cash only to driver on arrival.',
    paymentAndCurrencyNative: 'Fixed fares in Saudi Riyals (SAR) and US Dollars (USD). Zero advance deposit. Cash only to driver on arrival.',
    faqsEn: [
      {
        q: 'Can we pay in US Dollars upon arrival?',
        a: 'Yes! You can pay your driver directly in cash in US Dollars (USD) or Saudi Riyals (SAR) upon arrival. Cards, POS terminals, and electronic payments are not accepted.',
      },
      {
        q: 'What happens if our connecting flight in Doha, Istanbul, or Dubai is delayed?',
        a: 'We monitor your final flight leg into Jeddah (KAIA) or Madinah (MED) and reschedule your driver at no added cost.',
      },
    ],
    faqsNative: [
      {
        q: 'Can we pay in US Dollars upon arrival?',
        a: 'Yes! You can pay your driver directly in cash in US Dollars (USD) or Saudi Riyals (SAR) upon arrival. Cards, POS terminals, and electronic payments are not accepted.',
      },
      {
        q: 'What happens if our connecting flight in Doha, Istanbul, or Dubai is delayed?',
        a: 'We monitor your final flight leg into Jeddah (KAIA) or Madinah (MED) and reschedule your driver at no added cost.',
      },
    ],
    status: 'draft, needs human review',
  },

  'canada': {
    slug: 'canada',
    nameEn: 'Canada',
    nameNative: 'Canada',
    demonym: 'Canadian',
    primaryLanguage: 'en',
    currencyCode: 'CAD',
    currencySymbol: 'CA$',
    titleEn: 'Private Umrah Chauffeur for Canadian Pilgrims (2026)',
    titleNative: 'Private Umrah Chauffeur for Canadian Pilgrims (2026)',
    metaDescEn: 'Private Umrah chauffeur service for Canadian pilgrims arriving from Toronto (YYZ), Montreal (YUL), Vancouver & Calgary. VIP transfers to Makkah & Madinah.',
    metaDescNative: 'Private Umrah chauffeur service for Canadian pilgrims arriving from Toronto (YYZ), Montreal (YUL), Vancouver & Calgary. VIP transfers to Makkah & Madinah.',
    h1En: 'Private Umrah Chauffeur Services for Canadian Pilgrims',
    h1Native: 'Private Umrah Chauffeur Services for Canadian Pilgrims',
    introEn: 'Seamless private chauffeur transfers for Canadian pilgrims arriving from Toronto Pearson, Montreal Trudeau, and Vancouver. Enjoy guaranteed fixed pricing, dedicated meet-and-greet at Jeddah Airport, and spacious vehicles tailored for winter coats, large suitcases, and Zamzam containers.',
    introNative: 'Seamless private chauffeur transfers for Canadian pilgrims arriving from Toronto Pearson, Montreal Trudeau, and Vancouver. Enjoy guaranteed fixed pricing, dedicated meet-and-greet at Jeddah Airport, and spacious vehicles tailored for winter coats, large suitcases, and Zamzam containers.',
    departureAirportsEn: ['Toronto Pearson (YYZ)', 'Montreal Pierre Elliott Trudeau (YUL)', 'Vancouver International (YVR)', 'Calgary International (YYC)'],
    departureAirportsNative: ['Toronto Pearson (YYZ)', 'Montreal Pierre Elliott Trudeau (YUL)', 'Vancouver International (YVR)', 'Calgary International (YYC)'],
    airlinesEn: ['Saudia', 'Air Canada (codeshare connections)', 'Turkish Airlines', 'Qatar Airways', 'Emirates', 'EgyptAir'],
    recommendedVehicles: [
      {
        groupType: 'Families & Groups (up to 7 pax)',
        vehicleSlug: 'gmc-yukon-xl',
        vehicleName: 'GMC Yukon XL VIP',
        seats: 7,
        bags: 8,
        reasonEn: 'Extra-long luggage compartment perfect for heavy Canadian travel bags and multi-week Umrah luggage.',
        reasonNative: 'Extra-long luggage compartment perfect for heavy Canadian travel bags and multi-week Umrah luggage.',
      },
    ],
    localTravelTipsEn: [
      'Flight connections through European or Middle Eastern hubs are monitored in real time.',
      'Settle your fare directly at your hotel in cash (Saudi Riyals - SAR or US Dollars - USD). Cards and bank transfers are not accepted.',
      'High-speed highway travel with courteous, professional chauffeurs.',
    ],
    localTravelTipsNative: [
      'Flight connections through European or Middle Eastern hubs are monitored in real time.',
      'Settle your fare directly at your hotel in cash (Saudi Riyals - SAR or US Dollars - USD). Cards and bank transfers are not accepted.',
      'High-speed highway travel with courteous, professional chauffeurs.',
    ],
    paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',
    paymentAndCurrencyNative: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',
    faqsEn: [
      {
        q: 'Do you offer child car seats for young children?',
        a: 'Yes, child safety seats can be requested in advance during booking.',
      },
    ],
    faqsNative: [
      {
        q: 'Do you offer child car seats for young children?',
        a: 'Yes, child safety seats can be requested in advance during booking.',
      },
    ],
    status: 'draft, needs human review',
  },

  'germany': {
    slug: 'germany',
    nameEn: 'Germany',
    nameNative: 'Deutschland',
    demonym: 'German',
    primaryLanguage: 'de',
    currencyCode: 'EUR',
    currencySymbol: '€',
    titleEn: 'Private Umrah Chauffeur for German Pilgrims (2026)',
    titleNative: 'Privater Umra-Chauffeur für Pilger aus Deutschland',
    metaDescEn: 'Zuverlässiger Flughafentransfer und Fahrdienst für Umra-Pilger aus Deutschland. Fahrten von Dschidda nach Mekka und Medina mit festen Preisen.',
    metaDescNative: 'Zuverlässiger Flughafentransfer und Fahrdienst für Umra-Pilger aus Deutschland. Fahrten von Dschidda nach Mekka und Medina mit festen Preisen.',
    h1En: 'Private Umrah Chauffeur Services for Pilgrims from Germany',
    h1Native: 'Privater Umra-Fahrdienst für Pilger aus Deutschland',
    introEn: 'Royal Umrah Cabs provides reliable, punctual private chauffeur transport for pilgrims departing from Frankfurt, Munich, Berlin, and Dusseldorf to Jeddah and Madinah. Transparent fixed fares in EUR and SAR with zero hidden fees.',
    introNative: 'Royal Umrah Cabs bietet pünktlichen und verlässlichen Fahrdienst für Pilger aus Frankfurt, München, Berlin und Düsseldorf nach Dschidda und Medina. Transparente Festpreise in EUR und SAR ohne versteckte Kosten.',
    departureAirportsEn: ['Frankfurt (FRA)', 'Munich (MUC)', 'Berlin (BER)', 'Dusseldorf (DUS)', 'Hamburg (HAM)'],
    departureAirportsNative: ['Frankfurt am Main (FRA)', 'München (MUC)', 'Berlin Brandenburg (BER)', 'Düsseldorf (DUS)', 'Hamburg (HAM)'],
    airlinesEn: ['Saudia', 'Lufthansa', 'Turkish Airlines', 'Qatar Airways', 'Emirates', 'Pegasus'],
    recommendedVehicles: [
      {
        groupType: 'Familien (4 bis 7 Personen)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'Hyundai Staria VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Spacious modern van with captain seats and deep cargo capacity for large travel luggage.',
        reasonNative: 'Geräumiger moderner Van mit Einzelsitzen und großem Kofferraum für Familiengepäck.',
      },
    ],
    localTravelTipsEn: [
      'German travelers can settle in EUR equivalent or SAR upon hotel arrival.',
      'Complimentary chilled bottled water provided in all vehicles.',
    ],
    localTravelTipsNative: [
      'Zahlung bequem bei Ankunft am Hotel in SAR bar oder mit EC-/Kreditkarte.',
      'Gekühltes Trinkwasser auf allen Fahrten kostenfrei inklusive.',
    ],
    paymentAndCurrencyEn: 'Fixed transparent rates in EUR and SAR. No prepayment required.',
    paymentAndCurrencyNative: 'Feste Tarife in EUR und SAR. Keine Vorauszahlung erforderlich.',
    faqsEn: [
      {
        q: 'Is flight delay monitoring included?',
        a: 'Yes, your driver tracks your flight from Germany and awaits your arrival without extra charges for reasonable delays.',
      },
    ],
    faqsNative: [
      {
        q: 'Ist die Flugverfolgung inklusive?',
        a: 'Ja, Ihr Fahrer verfolgt Ihren Flugstatus aus Deutschland live und passt die Abholzeit bei Flugverspätungen automatisch an.',
      },
    ],
    impressumRequired: true,
    status: 'draft, needs human review',
  },

  'france': {
    slug: 'france',
    nameEn: 'France',
    nameNative: 'France',
    demonym: 'French',
    primaryLanguage: 'fr',
    currencyCode: 'EUR',
    currencySymbol: '€',
    titleEn: 'Private Umrah Chauffeur for French Pilgrims (2026)',
    titleNative: 'Chauffeur Privé Omra pour Pèlerins de France',
    metaDescEn: 'Service de chauffeur privé VTC pour votre Omra au départ de Paris, Lyon, Marseille. Transferts aéroport Djeddah vers La Mecque et Médine.',
    metaDescNative: 'Service de chauffeur privé VTC pour votre Omra au départ de Paris, Lyon, Marseille. Transferts aéroport Djeddah vers La Mecque et Médine.',
    h1En: 'Private Umrah Chauffeur Services for French Pilgrims',
    h1Native: 'Service de Chauffeur Privé Omra pour les Pèlerins de France',
    introEn: 'Peaceful private transfers for pilgrims departing from Paris CDG, Lyon Saint-Exupéry, and Marseille to Makkah and Madinah. Punctual meet & greet at Jeddah airport, fixed transparent fares, and spacious air-conditioned vehicles.',
    introNative: "Voyagez en toute sérénité pour votre Omra au départ de Paris (CDG), Lyon et Marseille. Accueil personnalisé à l'aéroport de Djeddah et transfert direct vers votre hôtel à La Mecque ou Médine à tarif fixe garanti.",
    departureAirportsEn: ['Paris Charles de Gaulle (CDG)', 'Paris Orly (ORY)', 'Lyon Saint-Exupéry (LYS)', 'Marseille Provence (MRS)', "Nice Côte d'Azur (NCE)"],
    departureAirportsNative: ['Paris-Charles de Gaulle (CDG)', 'Paris-Orly (ORY)', 'Lyon-Saint Exupéry (LYS)', 'Marseille-Provence (MRS)', "Nice-Côte d'Azur (NCE)"],
    airlinesEn: ['Saudia', 'Air France', 'Transavia', 'Turkish Airlines', 'Royal Air Maroc', 'EgyptAir', 'Tunisair'],
    recommendedVehicles: [
      {
        groupType: 'Familles (4 à 7 personnes)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'Hyundai Staria VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Modern executive minivan with reclining captain chairs and large trunk capacity for family suitcases.',
        reasonNative: 'Monospace haut de gamme avec sièges capitaines inclinables et grand coffre pour vos valises.',
      },
    ],
    localTravelTipsEn: [
      'Meet & Greet: Your chauffeur awaits you just outside the international arrival terminal with a clear nameboard.',
      'Payment: Pay upon arrival at your hotel strictly in cash (SAR or USD). Cards and bank transfers are not accepted.',
    ],
    localTravelTipsNative: [
      'Accueil aéroport : Votre chauffeur vous attend directement à la sortie du terminal avec une pancarte à votre nom.',
      "Paiement : Réglez directement à l'arrivée à votre hôtel en espèces (EUR ou SAR) ou par carte bancaire.",
    ],
    paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',
    paymentAndCurrencyNative: "Tarifs fixes transparents en Riyals (SAR). Aucun acompte requis. Paiement en espèces à l'arrivée (SAR ou USD).",
    faqsEn: [
      {
        q: 'Do drivers make stops for Miqat when travelling from Madinah to Makkah?',
        a: 'Yes, all transfers from Madinah to Makkah include a 45-minute stop at Miqat Dhu al-Hulayfah (Bir Ali).',
      },
    ],
    faqsNative: [
      {
        q: 'Le chauffeur fait-il un arrêt au Miqat entre Médine et La Mecque ?',
        a: 'Oui, tous nos trajets de Médine à La Mecque incluent un arrêt de 45 minutes à la mosquée de Bir Ali pour votre sacralisation (Ihram).',
      },
    ],
    status: 'draft, needs human review',
  },

  'spain': {
    slug: 'spain',
    nameEn: 'Spain',
    nameNative: 'España',
    demonym: 'Spanish',
    primaryLanguage: 'es',
    currencyCode: 'EUR',
    currencySymbol: '€',
    titleEn: 'Private Umrah Chauffeur for Spanish Pilgrims (2026)',
    titleNative: 'Chofer Privado Umrah para Peregrinos de España',
    metaDescEn: 'Servicio de traslado privado y chofer VIP para peregrinos de Umrah desde Madrid y Barcelona a La Meca y Medina. Pago a la llegada.',
    metaDescNative: 'Servicio de traslado privado y chofer VIP para peregrinos de Umrah desde Madrid y Barcelona a La Meca y Medina. Pago a la llegada.',
    h1En: 'Private Umrah Chauffeur Services for Pilgrims from Spain',
    h1Native: 'Servicio de Chofer Privado para Peregrinos de Umrah desde España',
    introEn: 'Executive chauffeur transfers for pilgrims departing from Madrid Barajas, Barcelona El Prat, and Valencia. Enjoy a reliable welcome at King Abdulaziz Airport in Jeddah and direct travel to your holy destination.',
    introNative: 'Traslados privados de alta gama para peregrinos que viajan desde Madrid (MAD) y Barcelona (BCN) hacia La Meca y Medina. Conductor privado esperándole a la llegada con cartel con su nombre, tarifas fijas y sin pago por adelantado.',
    departureAirportsEn: ['Madrid-Barajas (MAD)', 'Barcelona-El Prat (BCN)', 'Valencia (VLC)', 'Málaga-Costa del Sol (AGP)'],
    departureAirportsNative: ['Madrid-Barajas (MAD)', 'Barcelona-El Prat (BCN)', 'Valencia (VLC)', 'Málaga-Costa del Sol (AGP)'],
    airlinesEn: ['Saudia', 'Turkish Airlines', 'Royal Air Maroc', 'EgyptAir', 'Qatar Airways', 'Emirates'],
    recommendedVehicles: [
      {
        groupType: 'Familias (4 a 7 personas)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'Hyundai Staria VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Executive family van with air conditioning and ample space for all luggage.',
        reasonNative: 'Monovolumen ejecutivo con asientos de gran confort y amplio maletero para el equipaje familiar.',
      },
    ],
    localTravelTipsEn: [
      'Fixed prices guaranteed with zero hidden extras.',
      'Pay on arrival at your hotel in EUR or SAR.',
    ],
    localTravelTipsNative: [
      'Precios fijos garantizados sin suplementos sorpresa.',
      'Pago a la llegada al hotel en efectivo o tarjeta.',
    ],
    paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). No advance deposit. Cash upon arrival (SAR or USD).',
    paymentAndCurrencyNative: 'Tarifas fijas en Riyales Saudíes (SAR). Sin necesidad de anticipo. Pago en efectivo a la llegada (SAR أو USD).',
    faqsEn: [
      {
        q: 'Is flight tracking included for flights from Madrid and Barcelona?',
        a: 'Yes, your driver tracks your flight live and will be waiting upon landing.',
      },
    ],
    faqsNative: [
      {
        q: '¿Se realiza seguimiento del vuelo desde Madrid o Barcelona?',
        a: 'Sí, monitorizamos su vuelo en tiempo real para estar puntuales en la terminal a su llegada.',
      },
    ],
    status: 'draft, needs human review',
  },

  'greece': {
    slug: 'greece',
    nameEn: 'Greece',
    nameNative: 'Greece',
    demonym: 'Greek',
    primaryLanguage: 'en',
    currencyCode: 'EUR',
    currencySymbol: '€',
    titleEn: 'Private Umrah Chauffeur for Pilgrims from Greece (2026)',
    titleNative: 'Private Umrah Chauffeur for Pilgrims from Greece (2026)',
    metaDescEn: 'Private chauffeur transfers for pilgrims departing from Athens (ATH) and Thessaloniki to Jeddah & Madinah. VIP vehicles, English support, pay upon arrival.',
    metaDescNative: 'Private chauffeur transfers for pilgrims departing from Athens (ATH) and Thessaloniki to Jeddah & Madinah. VIP vehicles, English support, pay upon arrival.',
    h1En: 'Private Umrah Chauffeur Services for Pilgrims from Greece',
    h1Native: 'Private Umrah Chauffeur Services for Pilgrims from Greece',
    introEn: 'Comfortable private chauffeur services for pilgrims travelling from Athens and Thessaloniki to the holy cities of Makkah and Madinah. Enjoy personalized terminal meet & greet, fixed transparent fares, and zero prepayment requirements.',
    introNative: 'Comfortable private chauffeur services for pilgrims travelling from Athens and Thessaloniki to the holy cities of Makkah and Madinah. Enjoy personalized terminal meet & greet, fixed transparent fares, and zero prepayment requirements.',
    departureAirportsEn: ['Athens International (ATH)', 'Thessaloniki Airport (SKG)'],
    departureAirportsNative: ['Athens International (ATH)', 'Thessaloniki Airport (SKG)'],
    airlinesEn: ['Aegean Airlines', 'Saudia (seasonal)', 'Turkish Airlines', 'EgyptAir', 'Qatar Airways', 'Gulf Air'],
    recommendedVehicles: [
      {
        groupType: 'Families & Groups (up to 7 pax)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'Hyundai Staria VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Air-conditioned modern van with captain seats and generous luggage volume.',
        reasonNative: 'Air-conditioned modern van with captain seats and generous luggage volume.',
      },
    ],
    localTravelTipsEn: [
      'Transfers available 24/7 matching flight arrivals into Jeddah Terminal 1.',
      'Settle in EUR or SAR directly with your chauffeur at your hotel.',
    ],
    localTravelTipsNative: [
      'Transfers available 24/7 matching flight arrivals into Jeddah Terminal 1.',
      'Settle in EUR or SAR directly with your chauffeur at your hotel.',
    ],
    paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',
    paymentAndCurrencyNative: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',
    faqsEn: [
      {
        q: 'Where do we meet our driver at Jeddah Airport?',
        a: 'Your driver waits directly outside the arrivals terminal gate holding a sign with your name.',
      },
    ],
    faqsNative: [
      {
        q: 'Where do we meet our driver at Jeddah Airport?',
        a: 'Your driver waits directly outside the arrivals terminal gate holding a sign with your name.',
      },
    ],
    noindex: true,
    status: 'draft, needs human review',
  },

  'arab-world': {
    slug: 'arab-world',
    nameEn: 'Arab World',
    nameNative: 'العالم العربي',
    demonym: 'Arab',
    primaryLanguage: 'ar',
    currencyCode: 'SAR',
    currencySymbol: 'ر.س',
    titleEn: 'Private Umrah Chauffeur for Arab World Pilgrims (2026)',
    titleNative: 'خدمات التوصيل الخاص وسيارات العمرة لضيوف الرحمن من العالم العربي',
    metaDescEn: 'خدمات النقل الخاص وسيارات VIP للمعتمرين القادمين من دول الوطن العربي. سيارات حديثة وسائقون محترفون، دفع عند الوصول.',
    metaDescNative: 'خدمات النقل الخاص وسيارات VIP للمعتمرين القادمين من دول الوطن العربي. سيارات حديثة وسائقون محترفون، دفع عند الوصول.',
    h1En: 'Private Umrah Chauffeur Services for Arab World Pilgrims',
    h1Native: 'خدمات النقل وسيارات الأجرة الخاصة لضيوف الرحمن من كافة الدول العربية',
    introEn: 'Dedicated private chauffeur transfers for pilgrims and families arriving from across the Arab world to King Abdulaziz Airport in Jeddah and Prince Mohammad Airport in Madinah. Punctual, respectful service with fixed rates and zero advance payments.',
    introNative: 'نرحب بضيوف الرحمن القادمين من كافة أرجاء الوطن العربي في رحاب مكة المكرمة والمدينة المنورة. نوفر لكم سيارات عائلية وسيدان حديثة وفاخرة مع سائقين ذوي خبرة ومعرفة تامة بطرق ومسارات الحرمين الشريفين، مع التزام تام بالدقة والأسعار الثابتة والدفع عند الوصول إلى الفندق.',
    departureAirportsEn: ['Cairo (CAI)', 'Dubai (DXB)', 'Amman (AMM)', 'Kuwait (KWI)', 'Doha (DOH)', 'Casablanca (CMN)', 'Algiers (ALG)'],
    departureAirportsNative: ['مطار القاهرة الدولي (CAI)', 'مطار دبي الدولي (DXB)', 'مطار الملكة علياء عمان (AMM)', 'مطار الكويت الدولي (KWI)', 'مطار حمد الدولي الدوحة (DOH)', 'مطار محمد الخامس الدار البيضاء (CMN)', 'مطار هواري بومدين الجزائر (ALG)'],
    airlinesEn: ['Saudia', 'EgyptAir', 'Emirates', 'flydubai', 'Qatar Airways', 'Kuwait Airways', 'Royal Jordanian', 'Flynas'],
    recommendedVehicles: [
      {
        groupType: 'العائلات (حتى 7 ركاب)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'هيونداي ستاريا VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Comfortable family van with modern captain chairs and spacious trunk.',
        reasonNative: 'فان عائلي رحب بمقاعد طيارة مريحة وتكييف ممتاز ومساحة واسعة للحقائب.',
      },
      {
        groupType: 'كبار الشخصيات والعائلات (حتى 7 ركاب)',
        vehicleSlug: 'gmc-yukon-xl',
        vehicleName: 'جي إم سي يوكون XL VIP',
        seats: 7,
        bags: 8,
        reasonEn: 'Executive full-size SUV offering unmatched road presence and luggage volume.',
        reasonNative: 'سيارة دفع رباعي فارهة توفر أعلى درجات الفخامة والراحة في المسافات الطويلة بين مكة والمدينة.',
      },
    ],
    localTravelTipsEn: [
      'Direct reception at the terminal with personal name sign.',
      'Cash payment on arrival: Settle directly with your driver in Saudi Riyals (SAR) or US Dollars (USD). Cards are not accepted.',
      'Complimentary Miqat stop included on Madinah to Makkah route.',
    ],
    localTravelTipsNative: [
      'استقبال رسمي ومباشر في صالة الوصول مع لوحة تحمل اسم الضيف الكريم.',
      'الدفع عند الوصول: كاش بالريال السعودي (SAR) أو الدولار الأمريكي (USD) مباشرة للسائق. لا نقبل البطاقات أو أجهزة الدفع الإلكتروني.',
      'التوقف في الميقات (مسجد الشجرة / بئر علي) لمدة 45 دقيقة مشمول في رحلات المدينة إلى مكة.',
    ],
    paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',
    paymentAndCurrencyNative: 'أسعار ثابتة ومحددة بالريال السعودي دون أي دفع مسبق. الدفع نقداً عند الوصول (بالريال أو الدولار).',
    faqsEn: [
      {
        q: 'Can the driver take us directly to our hotel in the central area?',
        a: 'Yes, our drivers drop you off directly at your hotel entrance or the nearest permitted drop-off point near the Haram.',
      },
    ],
    faqsNative: [
      {
        q: 'هل يوصل السائق العائلة مباشرة إلى مدخل الفندق في المنطقة المركزية؟',
        a: 'نعم، يتم إيصالكم مباشرة إلى بوابة الفندق أو أقرب نقطة وصول مسموح بها نظامياً بجوار الحرم الشريف.',
      },
    ],
    status: 'draft, needs human review',
  },

  'egypt': {
    slug: 'egypt',
    nameEn: 'Egypt',
    nameNative: 'مصر',
    demonym: 'Egyptian',
    primaryLanguage: 'ar',
    currencyCode: 'EGP',
    currencySymbol: 'ج.م',
    titleEn: 'Private Umrah Chauffeur for Egyptian Pilgrims (2026)',
    titleNative: 'توصيل مطار جدة لمكة وسيارة خاصة للمعتمرين من مصر',
    metaDescEn: 'خدمة توصيل وسيارات خاصة للمعتمرين المصريين من مطار جدة إلى فنادق مكة والمدينة. سيارات ستاريا وهايس عائلية، دفع عند الوصول.',
    metaDescNative: 'خدمة توصيل وسيارات خاصة للمعتمرين المصريين من مطار جدة إلى فنادق مكة والمدينة. سيارات ستاريا وهايس عائلية، دفع عند الوصول.',
    h1En: 'Private Umrah Chauffeur Services for Egyptian Pilgrims',
    h1Native: 'توصيل وسيارات خاصة لضيوف الرحمن القادمين من جمهورية مصر العربية',
    introEn: 'Punctual, comfortable chauffeur transfers for Egyptian pilgrims departing from Cairo, Alexandria, Sohag, Assiut, and Luxor. Avoid airport crowding and taxi disputes with guaranteed fixed pricing and personalized reception at Jeddah Terminal 1 or North Terminal.',
    introNative: 'أهلاً ومرحباً بضيوف الرحمن من أرض الكنانة مصر. نوفر لكم خدمة توصيل خاصة ومباشرة من مطار الملك عبد العزيز بجدة (الصالة 1 والصالة الشمالية) إلى باب فندقكم في مكة المكرمة والمدينة المنورة، بسيارات مكيفة حديثة تتسع لكافة أفراد العائلة وحقائب السفر الكبيرة دون أي معاناة في البحث أو المساومة.',
    departureAirportsEn: ['Cairo International (CAI)', 'Alexandria Borg El Arab (HBE)', 'Sphinx International (SPX)', 'Sohag International (HMB)', 'Assiut Airport (ATZ)', 'Luxor International (LXR)'],
    departureAirportsNative: ['مطار القاهرة الدولي (CAI)', 'مطار برج العرب بالإسكندرية (HBE)', 'مطار سفنكس الدولي (SPX)', 'مطار سوهاج الدولي (HMB)', 'مطار أسيوط (ATZ)', 'مطار الأقصر (LXR)'],
    airlinesEn: ['EgyptAir', 'Saudia', 'Flynas', 'Flyadeal', 'Air Cairo', 'Nile Air', 'Nesma Airlines'],
    recommendedVehicles: [
      {
        groupType: 'العائلات المصرية (4 إلى 7 أفراد)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'هيونداي ستاريا VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Comfortable family van with modern seats and ample boot space for Egyptian travel suitcases.',
        reasonNative: 'فان حديث واسع جداً ومريح للوالدين والأطفال مع سعة ممتازة للشنط الكبيرة ومياه زمزم.',
      },
      {
        groupType: 'المجموعات والعائلات الكبيرة (8 إلى 10 أفراد)',
        vehicleSlug: 'toyota-hiace',
        vehicleName: 'تويوتا هايس VIP',
        seats: 10,
        bags: 10,
        reasonEn: 'High-roof minibus accommodating large family groups together.',
        reasonNative: 'ميني باص عالي السقف يتسع للعائلات الكبيرة مع شنطهم بالكامل لرحلة واحدة مريحة.',
      },
    ],
    localTravelTipsEn: [
      'We track all direct and connecting flights from Cairo, Alexandria, and regional Egyptian airports.',
      'Reception available at both Terminal 1 and the North Terminal at Jeddah Airport.',
      'Direct payment upon hotel arrival in cash (Saudi Riyals - SAR or US Dollars - USD). Cards are not accepted.',
    ],
    localTravelTipsNative: [
      'نتابع مواعيد رحلات مصر للطيران والسعودية وطيران ناس وباقي الشركات لحظة بلحظة.',
      'استقبال مباشر في صالة الوصول مع لوحة اسم مخصصة لتفادي زحام المطار.',
      'الدفع يتم عند الوصول للفندق نقداً مباشرة للسائق بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل البطاقات البنكية.',
    ],
    paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). Zero advance deposit. Cash upon arrival (SAR or USD).',
    paymentAndCurrencyNative: 'سعر محدد وثابت بالريال السعودي، والدفع نقداً عند الوصول للسائق (بالريال أو الدولار) دون أي دفع مسبق.',
    faqsEn: [
      {
        q: 'Do you pick up from Jeddah North Terminal for Egyptian budget airlines?',
        a: 'Yes, we provide meet and greet services at both the North Terminal (Nile Air, Nesma, Air Cairo, Flyadeal) and Terminal 1 (Saudia, EgyptAir).',
      },
    ],
    faqsNative: [
      {
        q: 'هل تستقبلون المعتمرين في الصالة الشمالية لمطار جدة (شركات الطيران الاقتصادي)؟',
        a: 'نعم، نتواجد ونستقبل ضيوفنا في الصالة الشمالية (مثل إير كايرو، النيل، نسما، طيران أديل) وكذلك الصالة رقم 1 (مصر للطيران والسعودية).',
      },
    ],
    status: 'draft, needs human review',
  },

  'uae': {
    slug: 'uae',
    nameEn: 'United Arab Emirates',
    nameNative: 'الإمارات العربية المتحدة',
    demonym: 'Emirati',
    primaryLanguage: 'ar',
    currencyCode: 'AED',
    currencySymbol: 'د.إ',
    titleEn: 'Private Umrah Chauffeur for UAE Pilgrims (2026)',
    titleNative: 'حجز سيارة خاصة وسائق VIP للمعتمرين من الإمارات',
    metaDescEn: 'توصيل فاخر وسيارات VIP للمعتمرين القادمين من دبي وأبوظبي والشارقة إلى مكة والمدينة. جي إم سي يوكون وستاريا، دفع عند الوصول.',
    metaDescNative: 'توصيل فاخر وسيارات VIP للمعتمرين القادمين من دبي وأبوظبي والشارقة إلى مكة والمدينة. جي إم سي يوكون وستاريا، دفع عند الوصول.',
    h1En: 'Private Umrah Chauffeur Services for UAE Pilgrims',
    h1Native: 'خدمات التوصيل الفاخر وسيارات VIP لضيوف الرحمن القادمين من دولة الإمارات',
    introEn: 'VIP executive chauffeur transportation for pilgrims and business travelers arriving from Dubai, Abu Dhabi, and Sharjah to King Abdulaziz Airport in Jeddah and Prince Mohammad Airport in Madinah. Luxury GMC Yukon XL and Hyundai Staria fleet with dedicated terminal greeting.',
    introNative: 'خدمة تنقل وتنفيذي VIP تليق بضيوف الرحمن القادمين من دبي وأبوظبي والشارقة. نؤمن لكم أسطولاً حديثاً من سيارات جي إم سي يوكون XL الفاخرة وهيونداي ستاريا التنفيذية لرحلات مريحة وسريعة من مطار جدة إلى فنادق مكة المكرمة والمدينة المنورة دون أي انتظار.',
    departureAirportsEn: ['Dubai International (DXB)', 'Abu Dhabi Zayed International (AUH)', 'Sharjah International (SHJ)'],
    departureAirportsNative: ['مطار دبي الدولي (DXB)', 'مطار زايد الدولي بأبوظبي (AUH)', 'مطار الشارقة الدولي (SHJ)'],
    airlinesEn: ['Emirates', 'Saudia', 'flydubai', 'Etihad Airways', 'Air Arabia', 'Flynas'],
    recommendedVehicles: [
      {
        groupType: 'رجال الأعمال والعائلات (حتى 7 ركاب)',
        vehicleSlug: 'gmc-yukon-xl',
        vehicleName: 'GMC Yukon XL VIP',
        seats: 7,
        bags: 8,
        reasonEn: 'Full-size flagship SUV providing exceptional road comfort and prestige.',
        reasonNative: 'سيارة الدفع الرباعي الفارهة بمقاعد جلدية مريحة ومساحة رحبة تتسع لـ 8 حقائب سفر كبيرة.',
      },
      {
        groupType: 'العائلات (حتى 7 ركاب)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'Hyundai Staria VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Executive van with captain seats and dual climate control.',
        reasonNative: 'فان تنفيذي فاخر بمقاعد طيارة مريحة ونوافذ بانورامية.',
      },
    ],
    localTravelTipsEn: [
      'Frequent shuttle and direct flights from DXB and AUH arrive at Terminal 1.',
      'Payment accepted strictly in cash upon arrival (SAR or USD). Cards, POS terminals, and online payments are not accepted.',
      'Bottled cold water and phone charging available in all vehicles.',
    ],
    localTravelTipsNative: [
      'رحلات طيران الإمارات وفلاي دبي والسعودية والاتحاد تهبط بالصالة رقم 1 الحديثة.',
      'السداد نقداً فقط مباشرة للسائق عند الوصول بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل البطاقات البنكية أو أجهزة الدفع.',
      'مياه باردة وشواحن لجميع أنواع الهواتف الذكية داخل السيارة.',
    ],
    paymentAndCurrencyEn: 'Fixed pricing in SAR. Zero advance prepayment. Cash upon arrival (SAR or USD).',
    paymentAndCurrencyNative: 'أسعار ثابتة محددة بالريال السعودي، والدفع نقداً عند الوصول (ريال أو دولار) دون أي دفع مسبق.',
    faqsEn: [
      {
        q: 'Can we book intercity travel from Makkah to Madinah with a stop at Bir Ali?',
        a: 'Yes, our intercity service includes a dedicated stop at Miqat Bir Ali for Ihram and prayer.',
      },
    ],
    faqsNative: [
      {
        q: 'هل يمكن حجز رحلة بين مكة والمدينة مع التوقف في ميقات بئر علي؟',
        a: 'نعم، تشمل الرحلة التوقف في ميقات ذي الحليفة (بئر علي) لمدة 45 دقيقة للإحرام وصلاة ركعتي الإحرام.',
      },
    ],
    status: 'draft, needs human review',
  },

  'algeria': {
    slug: 'algeria',
    nameEn: 'Algeria',
    nameNative: 'الجزائر',
    demonym: 'Algerian',
    primaryLanguage: 'ar',
    currencyCode: 'DZD',
    currencySymbol: 'د.ج',
    titleEn: 'Private Umrah Chauffeur for Algerian Pilgrims (2026)',
    titleNative: 'سيارة خاصة وسائق للمعتمرين الجزائريين من مطار جدة لمكة',
    metaDescEn: 'خدمات نقل وتوصيل خاصة لضيوف الرحمن من الجزائر إلى مكة والمدينة. سيارات عائلية فسيحة، دفع عند الوصول إلى الفندق.',
    metaDescNative: 'خدمات نقل وتوصيل خاصة لضيوف الرحمن من الجزائر إلى مكة والمدينة. سيارات عائلية فسيحة، دفع عند الوصول إلى الفندق.',
    h1En: 'Private Umrah Chauffeur Services for Algerian Pilgrims',
    h1Native: 'توصيل خاص وسيارات عائلية للمعتمرين القادمين من الجزائر',
    introEn: 'Punctual private chauffeur services for Algerian pilgrims arriving from Algiers, Oran, and Constantine to Jeddah and Madinah. Transparent fixed fares, welcoming meet & greet at arrivals, and spacious vehicles for all family members.',
    introNative: 'مرحباً بضيوف الرحمن القادمين من الجزائر الحبيبة في رحاب بيت الله الحرام ومسجد رسوله ﷺ. نوفر لكم خدمة توصيل خاصة ومريحة تخلصكم من عناء وتعب الرحلة الجوية الطويلة، مع استقبال رسمي في المطار بسيارة حديثة مكيفة مخصصة لعائلتكم فقط.',
    departureAirportsEn: ['Algiers Houari Boumediene (ALG)', 'Oran Ahmed Ben Bella (ORN)', 'Constantine Mohamed Boudiaf (CZL)'],
    departureAirportsNative: ['مطار هواري بومدين بالجزائر (ALG)', 'مطار أحمد بن بلة بوهران (ORN)', 'مطار محمد بوضياف بقسنطينة (CZL)'],
    airlinesEn: ['Air Algérie', 'Saudia', 'Tunisair', 'Turkish Airlines', 'Qatar Airways', 'EgyptAir'],
    recommendedVehicles: [
      {
        groupType: 'العائلات الجزائرية (4 إلى 7 أفراد)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'هيونداي ستاريا VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Modern family van with ample luggage capacity.',
        reasonNative: 'فان عائلي مريح جداً يتسع لكافة الحقائب مع كراسي مريحة لكبار السن.',
      },
      {
        groupType: 'المجموعات العائلية (8 إلى 10 أفراد)',
        vehicleSlug: 'toyota-hiace',
        vehicleName: 'تويوتا هايس VIP',
        seats: 10,
        bags: 10,
        reasonEn: 'Large comfortable minibus for big family groups.',
        reasonNative: 'ميني باص عائلي كبير يجمع أفراد العائلة في سيارة واحدة.',
      },
    ],
    localTravelTipsEn: [
      'Meet & Greet outside the international arrivals gate.',
      'Direct payment at the hotel strictly in cash (SAR or USD). Cards are not accepted.',
      'Miqat stop included for journeys from Madinah to Makkah.',
    ],
    localTravelTipsNative: [
      'استقبال مباشر عند بوابة الخروج بصالة الوصول مع لوحة اسم واضحة.',
      'الدفع يتم مباشرة عند الوصول إلى الفندق نقداً للسائق بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل البطاقات.',
      'رحلات مكة والمدينة تشمل التوقف المريح في الميقات.',
    ],
    paymentAndCurrencyEn: 'Fixed fares in Saudi Riyals (SAR). No advance payment. Cash upon arrival (SAR or USD).',
    paymentAndCurrencyNative: 'أسعار واضحة ومحددة بالريال السعودي دون أي دفع مسبق. الدفع نقداً عند الوصول (ريال أو دولار).',
    faqsEn: [
      {
        q: 'Do you track flight delays from Algiers or Oran?',
        a: 'Yes, we track your flight number in real time and wait for you regardless of delays.',
      },
    ],
    faqsNative: [
      {
        q: 'هل تتابعون تأخر الرحلات القادمة من الجزائر أو وهران؟',
        a: 'نعم، نتابع رقم الرحلة مباشرة عبر شاشات الملاحة ويكون السائق في انتظاركم حتى في حال تأخر إقلاع الطائرة.',
      },
    ],
    status: 'draft, needs human review',
  },
};
