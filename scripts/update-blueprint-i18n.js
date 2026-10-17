const fs = require('fs');
const path = require('path');

const dictDir = path.join(__dirname, '..', 'src', 'i18n', 'dictionaries');

// Load current dictionaries
const enPath = path.join(dictDir, 'en.json');
const arPath = path.join(dictDir, 'ar.json');
const msPath = path.join(dictDir, 'ms.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));
const ms = JSON.parse(fs.readFileSync(msPath, 'utf8'));

// 1. UPDATE BOOKING CARD KEYS
const bookingCardUpdates = {
  en: {
    luggageLabel: "Luggage Bags",
    bookOnline: "Book Online",
    continueWhatsApp: "Continue on WhatsApp",
    quoteNeeded: "Contact us for a quote",
    microCancellation: "Free cancellation (24h)",
    microPayArrival: "Pay upon arrival",
    microNoHidden: "Zero hidden fees",
    microAllTolls: "All tolls included"
  },
  ar: {
    luggageLabel: "عدد الحقائب",
    bookOnline: "احجز أونلاين",
    continueWhatsApp: "المتابعة عبر واتساب",
    quoteNeeded: "تواصل معنا للحصول على السعر",
    microCancellation: "إلغاء مجاني حتى 24 ساعة",
    microPayArrival: "الدفع عند الوصول",
    microNoHidden: "بدون أي رسوم خفية",
    microAllTolls: "شامل كافة رسوم الطرق"
  },
  ms: {
    luggageLabel: "Bilangan Bagasi",
    bookOnline: "Tempah Dalam Talian",
    continueWhatsApp: "Teruskan di WhatsApp",
    quoteNeeded: "Hubungi kami untuk sebut harga",
    microCancellation: "Pembatalan percuma (24 jam)",
    microPayArrival: "Bayar semasa tiba",
    microNoHidden: "Sifar caj tersembunyi",
    microAllTolls: "Termasuk tol lebuh raya"
  }
};

Object.assign(en.booking_card, bookingCardUpdates.en);
Object.assign(ar.booking_card, bookingCardUpdates.ar);
Object.assign(ms.booking_card, bookingCardUpdates.ms);

// 2. FLEET AMENITIES: REMOVE WIFI AND REPLACE WITH COMFORTABLE SEATING
delete en.fleet.amenityWifi;
delete ar.fleet.amenityWifi;
delete ms.fleet.amenityWifi;

en.fleet.amenityComfort = "Comfortable Seating";
ar.fleet.amenityComfort = "مقاعد مريحة فاخرة";
ms.fleet.amenityComfort = "Tempat Duduk Selesa";

en.fleet.amenityLuggage = "Generous Luggage Space";
ar.fleet.amenityLuggage = "مساحة واسعة للحقائب";
ms.fleet.amenityLuggage = "Ruang Bagasi Luas";

// 3. POPULAR ROUTES SECTION
en.popular_routes = {
  sectionPill: "Guaranteed Fixed Fares",
  heading: "Popular Umrah &",
  headingHighlight: "Intercity Routes",
  subtitle: "Direct airport pickups and highway journeys with all expressway tolls and flight tracking included.",
  tollsIncluded: "All tolls included",
  fromPrice: "From",
  bookButton: "Book Route"
};

ar.popular_routes = {
  sectionPill: "أسعار ثابتة ومضمونة",
  heading: "أشهر مسارات العمرة و",
  headingHighlight: "التوصيل بين المدن",
  subtitle: "استقبال مباشر من المطار ورحلات برية مريحة تشمل كافة رسوم الطرق السريعة وتتبع مواعيد الطيران.",
  tollsIncluded: "شامل كافة الرسوم",
  fromPrice: "يبدأ من",
  bookButton: "احجز المسار"
};

ms.popular_routes = {
  sectionPill: "Kadar Tambang Tetap",
  heading: "Laluan Popular Umrah &",
  headingHighlight: "Antara Bandar",
  subtitle: "Pengambilan terus di lapangan terbang dan perjalanan lebuh raya dengan semua tol dan pemantauan penerbangan disertakan.",
  tollsIncluded: "Termasuk tol lebuh raya",
  fromPrice: "Bermula",
  bookButton: "Tempah Laluan"
};

// 4. EXTENDED SERVICES SECTION (with prices from DB/rates)
en.services_list = {
  sectionPill: "Tailored Solutions",
  heading: "Comprehensive Transport for",
  headingHighlight: "The Sacred Journey",
  subtitle: "Every service is delivered with professional chauffeurs, flight tracking, and transparent fixed pricing.",
  airportTitle: "Airport Chauffeur Transfers",
  airportDesc: "Terminal meet & greet at KAIA Jeddah (Terminal 1 & North) and Madinah Airport (MED).",
  airportPrice: "From 150 SAR",
  intercityTitle: "Intercity Highway Chauffeur",
  intercityDesc: "Relaxing journeys between Makkah, Madinah, and Jeddah with rest and prayer stops.",
  intercityPrice: "From 450 SAR",
  hourlyTitle: "Hourly Dedicated Chauffeur",
  hourlyDesc: "Private vehicle and driver on standby for business, shopping, or family visits.",
  hourlyPrice: "From 400 SAR",
  ziyaratTitle: "Ziyarat Holy Sites Tours",
  ziyaratDesc: "Comprehensive tours to historic mosques, battlegrounds, and caves in Makkah & Madinah.",
  ziyaratPrice: "From 300 SAR",
  miqatTitle: "Dedicated Miqat Ihram Transfers",
  miqatDesc: "Direct transit with scheduled prayer stop at Masjid Miqat Bir Ali, Yalamlam, or as-Sail.",
  miqatPrice: "From 450 SAR",
  groupTitle: "Group & Family Transport",
  groupDesc: "11-seater HiAce and 19-seater Coaster buses with high-capacity luggage room.",
  groupPrice: "From 650 SAR",
  bookNow: "Book Service"
};

ar.services_list = {
  sectionPill: "حلول نقل متكاملة",
  heading: "خدمات شاملة ترافقك في",
  headingHighlight: "رحلتك المباركة",
  subtitle: "تُقدم كافة خدماتنا بسائقين محترفين، وتتبع للرحلات الجوية، وأسعار ثابتة ومعلنة.",
  airportTitle: "توصيل واستقبال المطارات",
  airportDesc: "استقبال مباشر من صالات مطار الملك عبدالعزيز بجدة ومطار الأمير محمد بن عبدالعزيز بالمدينة.",
  airportPrice: "يبدأ من 150 ر.س",
  intercityTitle: "التوصيل بين المدن والمشاعر",
  intercityDesc: "رحلات برية سلسة ومريحة بين مكة والمدينة وجدة مع إمكانية التوقف للصلاة والاستراحة.",
  intercityPrice: "يبدأ من 450 ر.س",
  hourlyTitle: "سائق خاص بنظام الساعات",
  hourlyDesc: "سيارة وسائق تحت تصرفكم طوال اليوم للتسوق أو الاجتماعات والزيارات العائلية.",
  hourlyPrice: "يبدأ من 400 ر.س",
  ziyaratTitle: "جولات المزارات والمعالم الدينية",
  ziyaratDesc: "جولات متكاملة لزيارة المعالم التاريخية وغار حراء وثور وجبل أحد ومسجد قباء.",
  ziyaratPrice: "يبدأ من 300 ر.س",
  miqatTitle: "رحلات الإحرام والتوقف بالميقات",
  miqatDesc: "نقل مباشر مع توقف مؤكد في ميقات ذي الحليفة (آبار علي) أو يلملم أو قرن المنازل.",
  miqatPrice: "يبدأ من 450 ر.س",
  groupTitle: "نقل العائلات الكبيرة والمجموعات",
  groupDesc: "فانات تويوتا هايس 11 راكب وباصات كوستر 19 راكب مع مساحات واسعة جداً للحقائب.",
  groupPrice: "يبدأ من 650 ر.س",
  bookNow: "احجز الخدمة"
};

ms.services_list = {
  sectionPill: "Penyelesaian Khusus",
  heading: "Perkhidmatan Lengkap Demi",
  headingHighlight: "Ketenangan Ibadah",
  subtitle: "Setiap perkhidmatan disediakan bersama pemandu profesional, pemantauan penerbangan, dan harga tetap telus.",
  airportTitle: "Pemandu Lapangan Terbang",
  airportDesc: "Sambutan terus di balai ketibaan KAIA Jeddah (Terminal 1 & Utara) serta Lapangan Terbang Madinah.",
  airportPrice: "Bermula 150 SAR",
  intercityTitle: "Pemandu Antara Bandar",
  intercityDesc: "Perjalanan selesa merentasi lebuh raya antara Makkah, Madinah, dan Jeddah dengan perhentian rehat.",
  intercityPrice: "Bermula 450 SAR",
  hourlyTitle: "Pemandu Khas Mengikut Jam",
  hourlyDesc: "Kenderaan persendirian sedia berkhidmat untuk urusan membeli-belah, mesyuarat, atau ziarah keluarga.",
  hourlyPrice: "Bermula 400 SAR",
  ziyaratTitle: "Lawatan Ziarah Tapak Suci",
  ziyaratDesc: "Lawatan menyeluruh ke masjid bersejarah, medan perang Uhud, dan gua bersejarah di Makkah & Madinah.",
  ziyaratPrice: "Bermula 300 SAR",
  miqatTitle: "Pengangkutan Khas Niat Miqat",
  miqatDesc: "Perjalanan terus dengan singgah berniat di Masjid Miqat Bir Ali, Yalamlam, atau as-Sail al-Kabir.",
  miqatPrice: "Bermula 450 SAR",
  groupTitle: "Pengangkutan Rombongan & Keluarga",
  groupDesc: "Van 11-tempat duduk HiAce dan bas Coaster 19-tempat duduk dengan muatan bagasi yang luas.",
  groupPrice: "Bermula 650 SAR",
  bookNow: "Tempah Servis"
};

// 5. MIQAT AND ZIYARAT SECTION
en.miqat_ziyarat = {
  sectionPill: "Sacred Geography",
  heading: "Miqat Stations &",
  headingHighlight: "Holy Ziyarat Sites",
  subtitle: "We take care of every spiritual stop so you can assume Ihram and visit historical landmarks in complete serenity.",
  birAliTitle: "Masjid Miqat Bir Ali (Dhu al-Hulayfah)",
  birAliDesc: "The designated Miqat for those departing Madinah towards Makkah. Our chauffeurs schedule generous waiting time for shower, two rak'ahs prayer, and Niat.",
  yalamlamTitle: "Miqat Yalamlam (as-Sa'diyyah)",
  yalamlamDesc: "Historic Miqat for pilgrims coming from Yemen, southern coastal routes, and maritime arrivals.",
  qarnTitle: "Miqat Qarn al-Manazil (as-Sail al-Kabir)",
  qarnDesc: "The Miqat for pilgrims travelling from Riyadh, the GCC countries, Taif, and the eastern provinces.",
  ziyaratMakkahTitle: "Makkah Holy Ziyarat Tour",
  ziyaratMakkahDesc: "Private family tours to Ghar Hira (Jabal al-Noor), Mount Thawr, Mina, Muzdalifah, and Mount Arafat.",
  ziyaratMadinahTitle: "Madinah Holy Ziyarat Tour",
  ziyaratMadinahDesc: "Dignified visits to Masjid Quba, Mount Uhud, the Archers' Hill, and Masjid al-Qiblatayn."
};

ar.miqat_ziyarat = {
  sectionPill: "معالم وجغرافيا مباركة",
  heading: "محطات المواقيت و",
  headingHighlight: "المزارات الإسلامية الشريفة",
  subtitle: "نعتني بكافة محطات رحلتكم الإيمانية لتتمكنوا من عقد نية الإحرام وزيارة الآثار النبوية بأقصى درجات الخشوع والسكينة.",
  birAliTitle: "مسجد ميقات ذي الحليفة (آبار علي)",
  birAliDesc: "ميقات أهل المدينة ومن مر بها قاصداً مكة. يتيح سائقونا وقتاً وافياً للاغتسال وأداء ركعتي الإحرام وعقد النية.",
  yalamlamTitle: "ميقات يلملم (السعدية)",
  yalamlamDesc: "الميقات التاريخي لقاصدي بيت الله الحرام من أهل اليمن والجهة الجنوبية للمملكة.",
  qarnTitle: "ميقات قرن المنازل (السيل الكبير)",
  qarnDesc: "ميقات أهل نجد والرياض ودول الخليج العربي والمسافرين عبر طريق الطائف السريع.",
  ziyaratMakkahTitle: "جولة مزارات مكة المكرمة",
  ziyaratMakkahDesc: "جولات عائلية خاصة إلى غار حراء (جبل النور)، غار ثور، منى، مزدلفة، وصعيد عرفات الطاهر.",
  ziyaratMadinahTitle: "جولة معالم المدينة المنورة",
  ziyaratMadinahDesc: "زيارات مباركة لمسجد قباء، وجبل أحد، ومقبرة الشهداء، ومسجد القبلتين برفقة سائقين خبراء."
};

ms.miqat_ziyarat = {
  sectionPill: "Geografi Tanah Suci",
  heading: "Stesen Miqat &",
  headingHighlight: "Ziarah Tapak Bersejarah",
  subtitle: "Kami memastikan setiap perhentian ibadah anda teratur agar anda dapat berniat ihram dan menziarahi tempat bersejarah dengan tenang.",
  birAliTitle: "Masjid Miqat Bir Ali (Dhu al-Hulayfah)",
  birAliDesc: "Miqat bagi jemaah yang berangkat dari Madinah ke Makkah. Pemandu kami memperuntukkan masa yang mencukupi untuk solat sunat ihram dan berniat.",
  yalamlamTitle: "Miqat Yalamlam (as-Sa'diyyah)",
  yalamlamDesc: "Stesen Miqat bersejarah bagi jemaah yang datang dari Yaman dan laluan selatan Semenanjung Arab.",
  qarnTitle: "Miqat Qarn al-Manazil (as-Sail al-Kabir)",
  qarnDesc: "Miqat bagi jemaah dari Riyadh, negara Teluk (GCC), Taif, dan lebuh raya timur.",
  ziyaratMakkahTitle: "Lawatan Ziarah Makkah",
  ziyaratMakkahDesc: "Lawatan persendirian keluarga ke Gua Hira (Jabal Nur), Jabal Thawr, Mina, Muzdalifah, dan Jabal Rahmah di Arafah.",
  ziyaratMadinahTitle: "Lawatan Ziarah Madinah",
  ziyaratMadinahDesc: "Kunjungan penuh penghormatan ke Masjid Quba, Jabal Uhud, Makam Syuhada Uhud, dan Masjid Qiblatain."
};

// 6. TEAM / ABOUT TEASER
en.team_teaser = {
  sectionPill: "Leadership & Hospitality",
  heading: "Dedicated to Serving the",
  headingHighlight: "Guests of Allah",
  story: "Royal Umrah Cabs was founded with an honest calling: to eliminate the stress, overcharging, and uncertainty pilgrims often face after exhausting international flights. We believe serving the Guests of Allah is a sacred trust. Every vehicle in our fleet is maintained to hotel-grade cleanliness, every rate is fixed and fully transparent, and our chauffeurs receive you with genuine warmth and respect.",
  name: "Ahmad Al-Harbi",
  role: "Head of Dispatch & Ground Hospitality",
  readMoreBtn: "Learn More About Our Mission"
};

ar.team_teaser = {
  sectionPill: "القيادة والضيافة الأصيلة",
  heading: "شرف خدمة",
  headingHighlight: "ضيوف الرحمن",
  story: "انطلقت رويال كاب للعمرة من غاية نبيلة وصادقة: رفع مشقة السفر والتفاوض عن المعتمر بعد ساعات الطيران الطويلة. نؤمن بأن خدمة ضيف الرحمن أمانة ومسؤولية عظيمة؛ ولذلك نحرص على أعلى معايير النظافة والتعقيم لمركباتنا، وثبات وشفافية الأسعار، واستقبالكم برحابة الصدر ودفء الضيافة العربية الأصيلة.",
  name: "أحمد الحربي",
  role: "رئيس العمليات والترحيل الميداني",
  readMoreBtn: "تعرف أكثر على رسالتنا"
};

ms.team_teaser = {
  sectionPill: "Kepimpinan & Khidmat Ikhlas",
  heading: "Dedikasi Menghormati",
  headingHighlight: "Tetamu Allah",
  story: "Royal Umrah Cabs ditubuhkan dengan matlamat yang murni: menghapuskan kegelisahan tawar-menawar dan ketidakpastian yang sering dihadapi jemaah selepas penerbangan antarabangsa yang jauh. Kami memegang prinsip bahawa melayani Dhuyufurrahman adalah amanah suci. Setiap kenderaan dipastikan bersih bertaraf hotel, tambang tetap dijamin, dan pemandu kami sentiasa menyambut anda dengan senyuman mesra.",
  name: "Ahmad Al-Harbi",
  role: "Ketua Operasi & Khidmat Lapangan",
  readMoreBtn: "Ketahui Misi & Prinsip Kami"
};

// 7. GUIDES SECTION (3 latest posts with update dates)
en.guides_section = {
  sectionPill: "Pilgrim Insights",
  heading: "Essential Umrah Travel",
  headingHighlight: "Guides & Advice",
  subtitle: "Verified insights on airport terminal arrivals, high-speed rail vs private car travel, and luggage preparation.",
  readGuide: "Read Full Guide",
  guide1Title: "Malaysian Pilgrims Umrah Transport Guide 2026",
  guide1Desc: "Comprehensive guide to VIP Staria & HiAce van transfers from KLIA to Jeddah & Madinah.",
  guide1Date: "Updated: Oct 2026",
  guide2Title: "Jeddah Airport (KAIA) Terminal 1 Arrival & Meet Guide",
  guide2Desc: "Step-by-step terminal walkthrough: baggage retrieval, arrivals gate, and meeting your private chauffeur.",
  guide2Date: "Updated: Oct 2026",
  guide3Title: "Makkah to Madinah: Private Chauffeur vs Train vs Bus",
  guide3Desc: "Honest luggage, timing, door-to-door convenience, and family comfort comparison for 2026.",
  guide3Date: "Updated: Oct 2026"
};

ar.guides_section = {
  sectionPill: "إرشادات وتوجيهات المعتمر",
  heading: "أحدث الأدلة الإرشادية لـ",
  headingHighlight: "رحلة العمرة",
  subtitle: "إرشادات موثوقة ومحدثة حول صالات الوصول بالمطارات، والمقارنة بين القطار والنقل الخاص، وترتيبات الحقائب.",
  readGuide: "اقرأ الدليل كاملاً",
  guide1Title: "دليل نقل المعتمرين القادمين من ماليزيا 2026",
  guide1Desc: "دليل شامل لخدمات الفانات الفاخرة ستاريا وهايس من كوالالمبور إلى جدة ومكة والمدينة.",
  guide1Date: "تحديث: أكتوبر 2026",
  guide2Title: "دليل الاستقبال في صالة 1 بمطار الملك عبدالعزيز بجدة",
  guide2Desc: "خطوات استلام الأمتعة والخروج من صالة الوصول والالتقاء بسائقك الخاص بكل يسر.",
  guide2Date: "تحديث: أكتوبر 2026",
  guide3Title: "مقارنة السفر بين مكة والمدينة: السائق الخاص والقطار والحافلات",
  guide3Desc: "مقارنة دقيقة وشاملة لراحة العائلات وسعة الحقائب والتوصيل المباشر من باب الفندق.",
  guide3Date: "تحديث: أكتوبر 2026"
};

ms.guides_section = {
  sectionPill: "Panduan Jemaah",
  heading: "Panduan Penting &",
  headingHighlight: "Nasihat Perjalanan Umrah",
  subtitle: "Panduan disahkan mengenai ketibaan di terminal lapangan terbang, perbandingan kereta vs kereta api laju, dan pengurusan bagasi.",
  readGuide: "Baca Panduan Penuh",
  guide1Title: "Panduan Pengangkutan Umrah Jemaah Malaysia 2026",
  guide1Desc: "Panduan lengkap sewa van VIP Staria & HiAce untuk penerbangan terus dari KLIA ke Jeddah & Madinah.",
  guide1Date: "Dikemas kini: Okt 2026",
  guide2Title: "Panduan Ketibaan & Pertemuan Pemandu di KAIA Terminal 1 Jeddah",
  guide2Desc: "Langkah demi langkah: pengambilan bagasi, pintu keluar balai ketibaan antarabangsa, dan bertemu pemandu anda.",
  guide2Date: "Dikemas kini: Okt 2026",
  guide3Title: "Makkah ke Madinah: Pemandu Peribadi vs Kereta Api Laju Haramain vs Bas",
  guide3Desc: "Perbandingan jujur dari sudut muatan beg, masa, kemudahan terus dari pintu ke pintu untuk jemaah keluarga.",
  guide3Date: "Dikemas kini: Okt 2026"
};

// 8. 12 COMPLETE FAQ QUESTIONS
en.faq = {
  sectionPill: "Clear Answers",
  heading: "Frequently Asked Questions",
  subtitle: "Everything you need to know about our rates, payment, flight delays, and vehicle options.",
  q1: "Can I pay cash or card upon arrival?",
  a1: "Yes, absolutely. We do not require any prepayment or credit card upfront. You can pay your chauffeur upon arrival in Saudi Riyals (SAR), US Dollars (USD), Euros (EUR), Malaysian Ringgit (MYR), or by local bank card.",
  q2: "What happens if our flight to Jeddah or Madinah is delayed?",
  a2: "We monitor all flights using the flight number you provide during booking. Your pickup time is automatically synchronized, and our 60-minute free waiting window begins only after your flight has officially touched down.",
  q3: "How will I find and meet my driver at the airport?",
  a3: "Your chauffeur will be waiting inside the arrival hall holding a clear name board with your name. You will also receive the chauffeur's name, phone number, and vehicle plate number on WhatsApp prior to your landing.",
  q4: "How much luggage can we bring?",
  a4: "Luggage capacity depends on the vehicle you select. A sedan (Camry) fits up to 3 large bags, a family MPV (Staria) fits up to 6 large bags, an SUV (Yukon XL) fits up to 6 bags, and a minibus (HiAce) fits up to 10 large bags plus Zamzam water boxes.",
  q5: "Are child safety booster seats available?",
  a5: "Yes, child booster seats are available upon request during booking. Simply indicate your requirement in the booking notes and our operations team will have it installed in your vehicle prior to pickup.",
  q6: "What is your cancellation and refund policy?",
  a6: "We offer free cancellation up to 24 hours prior to your scheduled pickup time. Because we do not take any upfront deposit, you do not have to wait for refund processing. If cancelled, your booking is simply released without penalty.",
  q7: "Can you accommodate large groups or extended families?",
  a7: "Yes, our fleet includes 11-seater Toyota HiAce minibuses and 19-seater Toyota Coaster coaches equipped with heavy-duty air conditioning and separate luggage compartments, ideal for large families and tour groups.",
  q8: "How do bookings work during Ramadan or peak seasons?",
  a8: "During Ramadan and peak Umrah periods, highway traffic and Haram boundary checkpoints require careful coordination. We advise reserving your chauffeur at least 48 to 72 hours in advance. Fares remain fixed once your reservation is confirmed.",
  q9: "Which currencies do drivers accept upon arrival?",
  a9: "Drivers accept Saudi Riyals (SAR) primarily, as well as US Dollars (USD), Malaysian Ringgit (MYR), Euros (EUR), and British Pounds (GBP). You can also pay using mada, Visa, or Mastercard.",
  q10: "Can we stop at the Miqat for Ihram prayers?",
  a10: "Yes, on routes between Madinah and Makkah, our chauffeurs gladly schedule a dedicated stop at Masjid Miqat Dhu al-Hulayfah (Bir Ali) so you can shower, pray two rak'ahs, and make your Umrah intention in full peace.",
  q11: "Are highway tolls, parking, and VAT included in the price?",
  a11: "Yes, every price displayed on Royal Umrah Cabs is completely all-inclusive: all highway tolls (Makkah-Madinah expressway), airport terminal parking fees, fuel, and taxes are included with zero surprises.",
  q12: "Are vehicles equipped with strong air conditioning?",
  a12: "Yes, every vehicle in our fleet is a late-model private vehicle equipped with dual-zone front and rear air conditioning, thoroughly tested to keep the cabin cool and comfortable even during peak summer temperatures."
};

ar.faq = {
  sectionPill: "إجابات واضحة",
  heading: "الأسئلة الأكثر شيوعاً",
  subtitle: "كل ما تحتاج معرفته حول أسعارنا، وطرق الدفع، وتأخر الرحلات الجوية، ومواصفات السيارات.",
  q1: "هل يمكنني الدفع نقداً أو بالبطاقة عند الوصول؟",
  a1: "نعم بالتأكيد. لا نطلب أي عربون مسبق أو بطاقة ائتمانية عند الحجز. يمكنك الدفع مباشرة للسائق عند وصولك بالريال السعودي أو الدولار أو اليورو أو الرينغيت الماليزي أو عبر مدى والبطاقات البنكية.",
  q2: "ماذا يحدث إذا تأخرت رحلتنا الجوية إلى جدة أو المدينة؟",
  a2: "نتابع رحلتكم الجوية فورياً عبر رقم الرحلة المدخل في الحجز، ويتم تحديث موعد الاستقبال تلقائياً. وتبدأ فترة الانتظار المجانية لمدة 60 دقيقة فقط بعد هبوط الطائرة الفعلي.",
  q3: "كيف سألتقي بالسائق في صالة المطار؟",
  a3: "ينتظرك السائق في صالة الوصول حاملاً لوحة واضحة باسمك الكريم. كما ستصلك بيانات السائق ورقم جواله ولوحة السيارة على واتساب قبل هبوط طائرتك.",
  q4: "ما هي سعة الحقائب المسموح بها في السيارات؟",
  a4: "تعتمد السعة على الفئة: الكامري تتسع لـ 3 حقائب كبيرة، وهيونداي ستاريا تتسع لـ 6 حقائب، وجي إم سي يوكن تتسع لـ 6 حقائب، وتويوتا هايس تتسع لـ 10 حقائب كبيرة مع كراتين مياه زمزم.",
  q5: "هل تتوفر مقاعد أمان مخصصة للأطفال؟",
  a5: "نعم، تتوفر مقاعد الأطفال عند الطلب مجاناً. يكفي تدوين ذلك في ملاحظات الحجز ليقوم فريق العمليات بتركيبها في السيارة قبل الانطلاق.",
  q6: "ما هي سياسة الإلغاء واسترداد المبالغ؟",
  a6: "الإلغاء مجاني تماماً حتى 24 ساعة قبل موعد الرحلة. وبما أننا لا نتقاضى أي عربون مسبق، فلن تحتاج لانتظار أي إجراءات استرداد بنكية.",
  q7: "هل تتوفر لديكم سيارات تتسع للعائلات الكبيرة والمجموعات؟",
  a7: "نعم، يضم أسطولنا فانات تويوتا هايس (11 مقعداً) وحافلات تويوتا كوستر (19 مقعداً) مجهزة بتكييف عالي القدرة ومساحة مخصصة للحقائب.",
  q8: "كيف تتم الحجوزات في موسم رمضان والمواسم المزدحمة؟",
  a8: "في شهر رمضان ومواسم الذروة، تتطلب نقاط التفتيش وتنظيمات الحرم تنسيقاً مبكراً. ننصح بالحجز قبل 48 إلى 72 ساعة، والأسعار تظل ثابتة ومضمونة فور التأكيد.",
  q9: "ما هي العملات المقبولة للدفع عند الوصول؟",
  a9: "يقبل السائقون الريال السعودي كعملة أساسية، بالإضافة إلى الدولار الأمريكي، الرينغيت الماليزي، اليورو، والجنيه الإسترليني، أو عبر أجهزة الدفع الإلكتروني بالبطاقة.",
  q10: "هل يمكن التوقف في الميقات لأداء ركعتي الإحرام؟",
  a10: "نعم بكل سرور. في رحلات المدينة إلى مكة، يتوقف السائق في مسجد ميقات ذي الحليفة (آبار علي) ويتيح لكم وقتاً كافياً للاغتسال والصلاة وعقد النية.",
  q11: "هل تشمل الأسعار رسوم الطرق السريعة ومواقف المطار والضريبة؟",
  a11: "نعم، جميع الأسعار المعروضة في رويال كاب للعمرة شاملة لكافة التكاليف: رسوم الطرق السريعة، ومواقف صالات المطار، والوقود، والضرائب بدون أي مبالغ خفية.",
  q12: "هل السيارات مجهزة بتكييف هواء قوي ومناسب؟",
  a12: "نعم، جميع سيارات أسطولنا حديثة جداً ومزودة بتكييف أمامي وخلفي مركزي قوي ومفحوص دورياً لضمان برودة وانتعاش المقصورة حتى في أشد الأيام حرارة."
};

ms.faq = {
  sectionPill: "Jawapan Telus",
  heading: "Soalan Lazim Jemaah",
  subtitle: "Segala maklumat mengenai kadar tambang, cara pembayaran, kelewatan penerbangan, dan pilihan kenderaan.",
  q1: "Bolehkah saya membayar tunai atau kad semasa tiba?",
  a1: "Ya, sudah tentu. Kami tidak memerlukan sebarang bayaran pendahuluan atau kad kredit semasa tempahan. Anda boleh membayar terus kepada pemandu secara tunai SAR, USD, EUR, Ringgit Malaysia (MYR), atau kad bank.",
  q2: "Bagaimana jika penerbangan kami ke Jeddah atau Madinah tertangguh (delayed)?",
  a2: "Pihak operasi kami memantau penerbangan anda secara langsung. Waktu pengambilan anda diselaraskan secara automatik, dan masa menunggu percuma 60 minit hanya bermula selepas pesawat mendarat.",
  q3: "Bagaimana saya akan bertemu dengan pemandu di lapangan terbang?",
  a3: "Pemandu anda akan menunggu di dalam balai ketibaan dengan memegang papan tanda nama anda. Anda juga akan menerima nama, nombor telefon, dan nombor plat kenderaan di WhatsApp sebelum mendarat.",
  q4: "Berapa banyak bagasi yang boleh kami bawa?",
  a4: "Kapasiti bergantung pada kenderaan: sedan (Camry) memuatkan 3 beg besar, MPV (Staria) memuatkan 6 beg besar, SUV (Yukon) memuatkan 6 beg, dan van (HiAce) memuatkan 10 beg besar serta kotak air Zamzam.",
  q5: "Adakah kerusi keselamatan kanak-kanak disediakan?",
  a5: "Ya, kerusi keselamatan kanak-kanak disediakan atas permintaan tanpa caj tambahan. Sila nyatakan dalam ruangan nota tempahan anda.",
  q6: "Apakah polisi pembatalan dan bayaran balik anda?",
  a6: "Pembatalan percuma dibenarkan sehingga 24 jam sebelum masa pengambilan dijadualkan. Memandangkan tiada deposit diambil, anda tidak perlu menunggu proses pemulangan wang.",
  q7: "Bolehkah anda menyediakan kenderaan untuk keluarga besar atau rombongan?",
  a7: "Ya, kami memiliki van 11-tempat duduk Toyota HiAce dan bas 19-tempat duduk Toyota Coaster dengan penghawa dingin berkuasa dan ruang simpanan bagasi yang sangat luas.",
  q8: "Bagaimanakah urusan tempahan pada bulan Ramadan atau musim puncak?",
  a8: "Pada musim Ramadan dan waktu puncak Umrah, laluan lebuh raya dan sekatan jalan raya memerlukan perancangan teliti. Kami menasihatkan tempahan dibuat 48-72 jam awal. Harga tetap tidak akan berubah.",
  q9: "Apakah mata wang yang diterima oleh pemandu semasa ketibaan?",
  a9: "Pemandu menerima Riyal Saudi (SAR), Dolar AS (USD), Ringgit Malaysia (MYR), Euro (EUR), dan Pound British (GBP), atau kad debit/kredit Visa dan Mastercard.",
  q10: "Bolehkah kami singgah di Miqat untuk solat sunat ihram?",
  a10: "Ya, bagi laluan Madinah ke Makkah, pemandu kami akan singgah di Masjid Miqat Bir Ali (Dhu al-Hulayfah) dan memberi masa yang cukup untuk solat ihram dan berniat.",
  q11: "Adakah tol lebuh raya, tempat letak kereta lapangan terbang dan cukai sudah termasuk?",
  a11: "Ya, semua harga di Royal Umrah Cabs adalah menyeluruh (all-inclusive): tol lebuh raya, caj parkir terminal lapangan terbang, minyak, dan cukai adalah termasuk tanpa sebarang kos tersembunyi.",
  q12: "Adakah kenderaan dilengkapi penghawa dingin yang sejuk?",
  a12: "Ya, semua kenderaan kami adalah model terkini dengan sistem penghawa dingin dwi-zon depan dan belakang yang berkuasa tinggi untuk keselesaan optimum jemaah."
};

// 9. PROMO BAR KEYS
en.promo_bar = {
  text: "Fixed 2026 Umrah Fares Now Live · Free Cancellation Up to 24h Before Arrival",
  btn: "Book Online"
};
ar.promo_bar = {
  text: "أسعار العمرة الثابتة لموسم 2026 متاحة الآن · إلغاء مجاني حتى 24 ساعة قبل الوصول",
  btn: "احجز أونلاين"
};
ms.promo_bar = {
  text: "Kadar Tambang Umrah 2026 Kini Dibuka · Pembatalan Percuma Sehingga 24 Jam Sebelum Tiba",
  btn: "Tempah Sekarang"
};

// 10. LEGAL & COMPANY FOOTER EXPANSION
en.footer_extra = {
  team: "Our Team",
  safety: "Safety & Standards",
  howItWorks: "How It Works",
  partners: "Agency Partners",
  cookiePolicy: "Cookie Policy"
};
ar.footer_extra = {
  team: "فريق العمل",
  safety: "السلامة والمعايير",
  howItWorks: "كيف تعمل الخدمة",
  partners: "بوابة الشركاء",
  cookiePolicy: "سياسة ملفات تعريف الارتباط"
};
ms.footer_extra = {
  team: "Pasukan Kami",
  safety: "Keselamatan & Standard",
  howItWorks: "Cara Tempahan",
  partners: "Rakan Agensi",
  cookiePolicy: "Polisi Kuki"
};

// Save updated dictionaries
fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
fs.writeFileSync(arPath, JSON.stringify(ar, null, 2), 'utf8');
fs.writeFileSync(msPath, JSON.stringify(ms, null, 2), 'utf8');

console.log('✅ Successfully updated en.json, ar.json, and ms.json with all blueprint keys!');
