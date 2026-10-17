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
      'Indonesian pilgrims can settle fares directly upon arrival at their hotel in Saudi Riyal (SAR), Indonesian Rupiah (IDR equivalent), or credit/debit card.',
      'Our dispatch team includes coordinators fluent in Bahasa Indonesia for smooth communication.',
    ],
    localTravelTipsNative: [
      'Terminal 1 Bandara Jeddah memiliki koridor yang panjang; hubungi supir Anda melalui WhatsApp segera setelah pesawat mendarat.',
      'Jamaah Indonesia dapat membayar ongkos langsung saat tiba di hotel dalam Riyal (SAR) tunai, transfer Rupiah, atau kartu.',
      'Tim koordinasi kami siap melayani komunikasi dalam Bahasa Indonesia untuk kemudahan Anda.',
    ],
    paymentAndCurrencyEn: 'Fixed fares displayed in Saudi Riyals (SAR) and Indonesian Rupiah (IDR). No credit card deposit needed.',
    paymentAndCurrencyNative: 'Tarif tetap transparan dalam Saudi Riyal (SAR) dan estimasi Rupiah (IDR). Tanpa uang muka.',
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
    titleNative: 'Pengangkutan & Teksi Umrah Jemaah Malaysia (Makkah & Madinah)',
    metaDescEn: 'Private chauffeur transport for Malaysian Umrah pilgrims from KLIA to Jeddah, Makkah, & Madinah. VIP Staria, pay upon arrival, Malay language care.',
    metaDescNative: 'Perkhidmatan teksi dan van sewa umrah persendirian untuk jemaah Malaysia. Van Hyundai Staria & HiAce, bayar tunai di hotel, khidmat mesra jemaah.',
    h1En: 'Private Umrah Chauffeur Services for Malaysian Pilgrims',
    h1Native: 'Pengangkutan & Teksi Umrah Persendirian untuk Jemaah Malaysia',
    introEn: 'Whether flying direct from KLIA or via transit, Malaysian pilgrims deserve a serene, dignified welcome upon landing in the Holy Land. Royal Umrah Cabs delivers hotel-grade private transport with zero prepayment, transparent fixed fares in Ringgit Malaysia (MYR) and Saudi Riyals (SAR), and specialized luggage room for 5-liter Zamzam boxes.',
    introNative: 'Sama ada terbang terus dari KLIA atau melalui transit, jemaah Umrah Malaysia berhak menikmati sambutan yang tenang dan selesa setibanya di Tanah Suci. Royal Umrah Cabs menyediakan pengangkutan persendirian tanpa sebarang deposit, kadar tetap telus dalam Ringgit Malaysia (MYR) dan Riyal (SAR), serta ruang khas untuk kotak air Zamzam 5 liter.',
    departureAirportsEn: ['Kuala Lumpur International Airport (KLIA/KLIA2)', 'Penang International Airport (PEN)', 'Johor Bahru Senai (JHB)', 'Kota Kinabalu (BKI)', 'Kuching (KCH)'],
    departureAirportsNative: ['Kuala Lumpur International (KLIA/KLIA2)', 'Pulau Pinang (PEN)', 'Senai Johor Bahru (JHB)', 'Kota Kinabalu (BKI)', 'Kuching (KCH)'],
    airlinesEn: ['Malaysia Airlines', 'Saudia', 'AirAsia X', 'Batik Air Malaysia', 'Qatar Airways', 'Emirates'],
    recommendedVehicles: [
      {
        groupType: 'Family (4 - 7 jemaah)',
        vehicleSlug: 'hyundai-staria',
        vehicleName: 'Hyundai Staria VIP',
        seats: 7,
        bags: 6,
        reasonEn: 'Quiet luxury cabin with captain seats, perfect for long highway transfers between Makkah and Madinah.',
        reasonNative: 'Kabin mewah dan senyap dengan kerusi kapten, amat selesa untuk perjalanan 4.5 jam antara Makkah dan Madinah.',
      },
      {
        groupType: 'Rombongan Keluarga (8 - 10 jemaah)',
        vehicleSlug: 'toyota-hiace',
        vehicleName: 'Toyota HiAce VIP',
        seats: 10,
        bags: 10,
        reasonEn: 'Generous luggage space easily holding 10 large suitcases and official airport-approved Zamzam water.',
        reasonNative: 'Ruang bagasi luas yang memuatkan 10 beg besar serta kotak air Zamzam rasmi tanpa sempit.',
      },
    ],
    localTravelTipsEn: [
      'Malaysian flights often arrive late evening at KAIA Terminal 1; our chauffeurs monitor flight numbers live and accommodate delayed baggage without extra waiting charges.',
      'We support direct cash settlement in Ringgit Malaysia (MYR), Saudi Riyals (SAR), or local card tap.',
      'Stop at Masjid Miqat Bir Ali when traveling from Madinah to Makkah with ample waiting time for shower and Ihram prayers.',
    ],
    localTravelTipsNative: [
      'Penerbangan dari Malaysia kerap mendarat lewat malam di Terminal 1 KAIA; pemandu kami menjejaki nombor penerbangan anda dan sedia menunggu tanpa caj tambahan jika bagasi lewat.',
      'Anda boleh bayar tunai dalam Ringgit Malaysia (MYR), Riyal Arab Saudi (SAR), atau menggunakan kad terus kepada pemandu di lobi hotel.',
      'Perjalanan dari Madinah ke Makkah disertakan waktu henti yang selesa di Masjid Miqat Bir Ali untuk mandi sunat dan berniat ihram.',
    ],
    paymentAndCurrencyEn: 'Clear fixed fares in MYR and SAR. Pay your chauffeur directly upon arrival at your hotel.',
    paymentAndCurrencyNative: 'Kadar tetap telus dalam MYR dan SAR. Bayar terus kepada pemandu setibanya di hotel.',
    faqsEn: [
      {
        q: 'Can we pay in Malaysian Ringgit (MYR)?',
        a: 'Yes, our dispatch accepts equivalent MYR cash or direct online Malaysian DuitNow/Bank transfer upon confirmation.',
      },
    ],
    faqsNative: [
      {
        q: 'Bolehkah kami bayar dalam Ringgit Malaysia (MYR)?',
        a: 'Boleh, anda boleh membayar tunai dalam MYR mengikut kadar semasa, atau bayar tunai Riyal (SAR) setibanya di hotel.',
      },
    ],
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
    titleNative: 'پاکستانی معتمرین کے لیے پرائیویٹ عمرہ ٹیکسی اور ڈرائیور سروس',
    metaDescEn: 'Executive chauffeur transport for Pakistani Umrah pilgrims in Jeddah, Makkah, & Madinah. Urdu-speaking coordinators, fixed fares in PKR & SAR.',
    metaDescNative: 'جدہ ایئرپورٹ سے مکہ اور مدینہ منورہ کے لیے پرائیویٹ فیملی کار۔ اردو زبان میں رہنمائی، بغیر پیشگی ادائیگی ہوٹل پہنچ کر رقم ادا کریں۔',
    h1En: 'Private Umrah Chauffeur Services for Pakistani Pilgrims',
    h1Native: 'پاکستانی معتمرین کے لیے بااعتماد پرائیویٹ عمرہ ٹرانسپورٹ',
    introEn: 'Royal Umrah Cabs offers executive private car and minibus chauffeur services tailored for Pakistani families and groups arriving at King Abdulaziz Airport (Jeddah) and Prince Mohammad Airport (Madinah). Enjoy punctual terminal greetings, comfortable air-conditioned journeys, and Urdu-speaking dispatch assistance 24/7.',
    introNative: 'رائل عمرہ کیبز جدہ اور مدینہ منورہ ایئرپورٹ پر اترنے والے پاکستانی خاندانوں اور زائرین کے لیے بہترین پرائیویٹ ٹرانسپورٹ سروس فراہم کرتی ہے۔ ایئرپورٹ پر گرمجوش استقبال، ائیرکنڈیشنڈ گاڑیاں، اور ہوٹل آمد پر ادائیگی کی سہولت۔',
    departureAirportsEn: ['Islamabad (ISB)', 'Lahore (LHE)', 'Karachi (KHI)', 'Peshawar (PEW)', 'Multan (MUX)', 'Sialkot (SKT)'],
    departureAirportsNative: ['اسلام آباد انٹرنیشنل (ISB)', 'لاہور علامہ اقبال (LHE)', 'کراچی جناح انٹرنیشنل (KHI)', 'پشاور (PEW)', 'ملتان (MUX)', 'سیالکوٹ (SKT)'],
    airlinesEn: ['PIA', 'Saudia', 'Airblue', 'SereneAir', 'Fly Jinnah', 'Emirates', 'Gulf Air'],
    recommendedVehicles: [
      {
        groupType: 'Family (4 to 7 persons)',
        vehicleSlug: 'gmc-yukon-xl',
        vehicleName: 'GMC Yukon XL VIP',
        seats: 7,
        bags: 8,
        reasonEn: 'Prestigious, heavy-duty American luxury SUV with superior luggage room for traditional heavy Pakistani luggage.',
        reasonNative: 'کشادہ اور آرام دہ لگژری گاڑی جو وزنی سامان اور فیملی کے آرام کے لیے بہترین ہے۔',
      },
      {
        groupType: 'Joint Families (8 to 10 persons)',
        vehicleSlug: 'toyota-hiace',
        vehicleName: 'Toyota HiAce VIP',
        seats: 10,
        bags: 10,
        reasonEn: 'Spacious high-roof van ideal for joint family groups with Zamzam water provisions.',
        reasonNative: 'بڑی فیملیز کے لیے 10 سیٹوں والی کشادہ وین مع سامان کی وسیع جگہ۔',
      },
    ],
    localTravelTipsEn: [
      'Flights from Pakistan often land during intense daytime hours; our vehicles are pre-cooled and drivers assist with heavy luggage.',
      'Urdu communication is available across our WhatsApp reservation line.',
    ],
    localTravelTipsNative: [
      'ہماری واٹس ایپ ڈسپیچ پر اردو زبان میں مکمل رہنمائی اور معاونت دستیاب ہے۔',
      'کسی پیشگی رقم یا کریڈٹ کارڈ کی ضرورت نہیں، ہوٹل پہنچ کر ڈرائیور کو ادائیگی کریں۔',
    ],
    paymentAndCurrencyEn: 'Guaranteed fixed fares with PKR equivalent references and cash settlement in SAR upon arrival.',
    paymentAndCurrencyNative: 'مقررہ اور شفاف کرایہ۔ ہوٹل پہنچ کر سعودی ریال (SAR) میں باآسانی ادائیگی۔',
    faqsEn: [
      {
        q: 'Can we pay after reaching the hotel in Makkah?',
        a: 'Yes, all our bookings operate on a strict Pay Upon Arrival model. No advance deposit is needed.',
      },
    ],
    faqsNative: [
      {
        q: 'کیا ادائیگی مکہ مکرمہ ہوٹل پہنچ کر کی جا سکتی ہے؟',
        a: 'جی ہاں، رائل عمرہ کیبز میں تمام ادائیگیاں ہوٹل پہنچنے کے بعد ڈرائیور کو براہ راست کی جاتی ہیں۔',
      },
    ],
  },

  'united-kingdom': {
    slug: 'united-kingdom',
    nameEn: 'United Kingdom',
    nameNative: 'United Kingdom',
    demonym: 'British',
    primaryLanguage: 'en',
    currencyCode: 'GBP',
    currencySymbol: '£',
    titleEn: 'Private Umrah Chauffeur for UK Pilgrims (2026)',
    titleNative: 'Private Umrah Chauffeur for UK Pilgrims',
    metaDescEn: 'Executive Umrah chauffeur transfers for British pilgrims arriving from London, Manchester, & Birmingham. GMC Yukon XL & Staria, transparent GBP/SAR pricing.',
    metaDescNative: 'Executive Umrah chauffeur transfers for British pilgrims arriving from London, Manchester, & Birmingham. GMC Yukon XL & Staria, transparent GBP/SAR pricing.',
    h1En: 'Executive Private Umrah Chauffeurs for UK Pilgrims',
    h1Native: 'Executive Private Umrah Chauffeurs for UK Pilgrims',
    introEn: 'British Muslim families expect punctuality, immaculate executive vehicles, and professional hospitality. Royal Umrah Cabs caters directly to DIY pilgrims traveling on tourist e-visas from Heathrow, Gatwick, Manchester, and Birmingham with flight-tracked meet & greet and fixed pricing in GBP and SAR.',
    introNative: 'British Muslim families expect punctuality, immaculate executive vehicles, and professional hospitality. Royal Umrah Cabs caters directly to DIY pilgrims traveling on tourist e-visas from Heathrow, Gatwick, Manchester, and Birmingham with flight-tracked meet & greet and fixed pricing in GBP and SAR.',
    departureAirportsEn: ['London Heathrow (LHR)', 'London Gatwick (LGW)', 'Manchester (MAN)', 'Birmingham (BHX)', 'Glasgow (GLA)'],
    departureAirportsNative: ['London Heathrow (LHR)', 'London Gatwick (LGW)', 'Manchester (MAN)', 'Birmingham (BHX)', 'Glasgow (GLA)'],
    airlinesEn: ['Saudia', 'British Airways', 'Emirates', 'Qatar Airways', 'Gulf Air', 'Turkish Airlines'],
    recommendedVehicles: [
      {
        groupType: 'Couples & Small Families (Up to 4)',
        vehicleSlug: 'toyota-camry',
        vehicleName: 'Toyota Camry Executive',
        seats: 4,
        bags: 3,
        reasonEn: 'Quiet, fuel-efficient executive sedan ideal for couples with standard airline check-in luggage.',
        reasonNative: 'Quiet, fuel-efficient executive sedan ideal for couples with standard airline check-in luggage.',
      },
      {
        groupType: 'Families (4 to 7)',
        vehicleSlug: 'gmc-yukon-xl',
        vehicleName: 'GMC Yukon XL VIP',
        seats: 7,
        bags: 8,
        reasonEn: 'First-class luxury SUV experience matching UK executive transfer expectations with massive luggage room.',
        reasonNative: 'First-class luxury SUV experience matching UK executive transfer expectations with massive luggage room.',
      },
    ],
    localTravelTipsEn: [
      'British e-visa holders clear immigration quickly via e-gates at Jeddah KAIA Terminal 1; your chauffeur waits right outside customs.',
      'British credit and debit cards (Monzo, Revolut, Barclays, HSBC) work smoothly with our drivers or online checkout links.',
      'All toll roads and airport parking surcharges are 100% included in your quoted fare.',
    ],
    localTravelTipsNative: [
      'British e-visa holders clear immigration quickly via e-gates at Jeddah KAIA Terminal 1; your chauffeur waits right outside customs.',
      'British credit and debit cards (Monzo, Revolut, Barclays, HSBC) work smoothly with our drivers or online checkout links.',
      'All toll roads and airport parking surcharges are 100% included in your quoted fare.',
    ],
    paymentAndCurrencyEn: 'Fixed rates displayed in GBP and SAR. Pay contactless card or cash directly upon hotel arrival.',
    paymentAndCurrencyNative: 'Fixed rates displayed in GBP and SAR. Pay contactless card or cash directly upon hotel arrival.',
    faqsEn: [
      {
        q: 'Do you track flights from London Heathrow or Manchester?',
        a: 'Yes, our dispatch software automatically tracks your flight number in real time. If your flight is delayed or diverted, your driver adjusts pickup timing automatically.',
      },
    ],
    faqsNative: [
      {
        q: 'Do you track flights from London Heathrow or Manchester?',
        a: 'Yes, our dispatch software automatically tracks your flight number in real time. If your flight is delayed or diverted, your driver adjusts pickup timing automatically.',
      },
    ],
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
  },
};
