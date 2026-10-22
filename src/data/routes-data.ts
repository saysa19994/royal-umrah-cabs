export interface TerminalNote {
  terminal: string;
  terminalAr: string;
  meetingPoint: string;
  meetingPointAr: string;
  pickupInstructions: string;
  pickupInstructionsAr: string;
  landmarks: string;
  landmarksAr: string;
}

export interface RouteFaq {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
  isOperational?: boolean;
  needsConfirmation?: boolean;
}

export interface RouteData {
  id: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  distanceKm: number;
  durationMinutesMin: number;
  durationMinutesMax: number;
  highway: string;
  highwayAr: string;
  lastUpdated: string;
  verifiedSource: string;
  verifiedSourceAr: string;
  descriptionEn: string;
  descriptionAr: string;
  highlightsEn: string[];
  highlightsAr: string[];
  terminalNotes: TerminalNote[];
  milestones: { title: string; titleAr: string; desc: string; descAr: string }[];
  faqs: RouteFaq[];
  relatedRouteIds: string[];
}

export const ROUTES_COMPREHENSIVE_DATA: Record<string, RouteData> = {
  'jeddah-airport-to-makkah': {
    id: 'jeddah-airport-to-makkah',
    titleEn: 'Jeddah Airport (KAIA) to Makkah Hotel Taxi & VIP Chauffeur',
    titleAr: 'توصيل من مطار جدة (KAIA) إلى فنادق مكة المكرمة - تاكسي وسائق VIP خاص',
    subtitleEn: 'Direct Terminal Meet & Greet with Flight Radar Tracking and Door-to-Door Luggage Care',
    subtitleAr: 'استقبال مباشر من صالات الوصول مع تتبع الرحلات وخدمة حقائب متكاملة حتى باب الفندق',
    distanceKm: 95,
    durationMinutesMin: 75,
    durationMinutesMax: 90,
    highway: 'Route 40 / Makkah-Jeddah Expressway (6 Lanes, Safe Speed Cam Enforced)',
    highwayAr: 'طريق مكة - جدة السريع (طريق 40) - 6 مسارات ومراقب بكاميرات السلامة ساهر',
    lastUpdated: 'October 2026',
    verifiedSource: 'General Authority of Civil Aviation (GACA) & Ministry of Hajj and Umrah Guidelines',
    verifiedSourceAr: 'الهيئة العامة للطيران المدني (GACA) وتوجيهات وزارة الحج والعمرة',
    descriptionEn:
      'Arriving at King Abdulaziz International Airport (JED) marks the beginning of your sacred pilgrimage. Our private chauffeur service ensures your family is met right outside customs with a personalized digital sign, assisted with heavy luggage and strollers, and transported directly to the doorstep of your hotel in Makkah via express highway without bus transfers or waiting for shared passengers.',
    descriptionAr:
      'يمثل الوصول إلى مطار الملك عبدالعزيز الدولي (جدة) الخطوة الأولى في رحلتك الإيمانية المباركة. يضمن لك سائقنا الخاص استقبالاً راقياً بلوحة اسم إلكترونية فور خروجك من الصالة، مع مساعدة كاملة في تحميل الحقائب وعربات الأطفال، والانطلاق المباشر إلى باب فندقك بمكة المكرمة عبر الخط السريع دون انتظار أو توقف في محطات وسيطة.',
    highlightsEn: [
      '60-90 minutes complimentary flight delay buffer included',
      'Automated flight tracking against live ATC radar',
      'Direct hotel lobby drop-off across all Central, Ajyad, and Aziziyah zones',
      'Zero deposit required — pay cash or card upon arrival at your hotel',
      '5-liter Zamzam containers accommodated securely in trunk',
    ],
    highlightsAr: [
      'فترة انتظار مجانية تمتد من 60 إلى 90 دقيقة بعد هبوط الطائرة [تحت تأكيد المالك]',
      'متابعة حية لرقم الرحلة عبر رادار الطيران للتعامل مع أي تأخير تلقائياً',
      'توصيل مباشر لباب الفندق في المنطقة المركزية، أجياد، والعزيزية',
      'بدون دفع مسبق — الدفع عند الوصول نقداً أو بالبطاقة البنكية',
      'مساحة مخصصة وآمنة لحمل عبوات مياه زمزم 5 لتر',
    ],
    terminalNotes: [
      {
        terminal: 'Terminal 1 (New KAIA - All Saudia, Flynas & Major Global Airlines)',
        terminalAr: 'الصالة رقم 1 (المطار الجديد - الخطوط السعودية، طيران ناس وكبرى الشركات العالمية)',
        meetingPoint: 'Arrivals Concourse, directly near the Iconic 14-meter Cylindrical Aquarium',
        meetingPointAr: 'ردهة الوصول، مباشرة بجوار الحوض المائي الأسطواني الشهير (بارتفاع 14 متراً)',
        pickupInstructions:
          'After clearing immigration, collecting baggage, and passing customs, exit into the public greeting concourse. Your chauffeur will be waiting holding a VIP digital tablet with your name.',
        pickupInstructionsAr:
          'بعد إنهاء الجوازات واستلام الحقائب والتفتيش الجمركي، اخرج إلى ردهة الاستقبال العامة. ستجد سائقك بانتظارك حاملاً لوحة رقمية باسمك الكريم.',
        landmarks: 'Opposite International Arrivals Gate 4 & 5 Curbside Pickup',
        landmarksAr: 'مقابل بوابات الوصول الدولي 4 و 5 ومسار السيارات التنفيذية',
      },
      {
        terminal: 'North Terminal (International Budget & Seasonal Charter Flights)',
        terminalAr: 'الصالة الشمالية (رحلات الطيران الاقتصادي الأجنبي والشارتر الموسمي)',
        meetingPoint: 'Public Arrival Exit Gate 1 & 2 Pedestrian Canopy',
        meetingPointAr: 'مظلة المشاة الخارجية عند بوابات الخروج 1 و 2',
        pickupInstructions:
          'Due to dedicated traffic lanes at the North Terminal, your chauffeur coordinates with you via WhatsApp upon touchdown and pulls directly to the designated pickup canopy.',
        pickupInstructionsAr:
          'نظراً لخصوصية مسارات الصالة الشمالية، يتواصل السائق معك هاتفياً فور هبوط الطائرة ويتقدم بالسيارة مباشرة لمظلة الركاب أمام الصالة.',
        landmarks: 'Directly in front of the SIM card kiosks and currency exchange counters',
        landmarksAr: 'مباشرة أمام أكشاك شرائح الاتصال ومكاتب الصرافة',
      },
      {
        terminal: 'Hajj & Umrah Terminal (Dedicated Seasonal Pilgrimage Flights)',
        terminalAr: 'صالة الحج والعمرة (مخصصة لرحلات الحج والعمرة الموسمية والوفود الرسمية)',
        meetingPoint: 'Customs Exit Pavilion, Plaza Canopy Area',
        meetingPointAr: 'بوابة خروج الجمارك في البلازا الخارجية المظللة',
        pickupInstructions:
          'Pilgrims walk through the white tensile canopy plaza. The driver meets you right at the designated private vehicle passenger pick-up curb.',
        pickupInstructionsAr:
          'يتوجه المعتمرون عبر ساحة الخيام البيضاء المظللة، وسيكون السائق بانتظاركم عند رصيف صعود المركبات الخاصة المصرحة.',
        landmarks: 'Plaza Center, next to the Ministry of Hajj & Umrah Welcome Desk',
        landmarksAr: 'وسط ساحة البلازا بجوار منصة وزارة الحج والعمرة الإرشادية',
      },
    ],
    milestones: [
      {
        title: 'KAIA Airport Departure',
        titleAr: 'الانطلاق من مطار الملك عبدالعزيز',
        desc: 'Direct ramp access to the King Abdulaziz Road connector.',
        descAr: 'الخروج السلس عبر جسر المطار إلى طريق الملك عبدالعزيز السريع.',
      },
      {
        title: 'Shumaisi Security Checkpoint',
        titleAr: 'نقطة تفتيش الشميسي',
        desc: 'Fast-track electronic toll and vehicle inspection lane on Route 40.',
        descAr: 'المسار السريع للمركبات المصرحة ونقطة الدخول إلى حدود الحرم.',
      },
      {
        title: 'Makkah Quran Gate Landmark',
        titleAr: 'بوابة القرآن الكريم (مدخل مكة)',
        desc: 'Iconic monumental arch welcoming pilgrims into the Holy City.',
        descAr: 'المعلم المعماري الشهير على مدخل مكة المكرمة وبدء التلبية.',
      },
      {
        title: 'Hotel Lobby Arrival',
        titleAr: 'الوصول لباب الفندق',
        desc: 'Curbside unloading, full luggage handoff to hotel bell desk.',
        descAr: 'الوقوف عند مدخل الفندق وتفريغ الحقائب وتسليمها لفريق الاستقبال.',
      },
    ],
    faqs: [
      {
        question: 'Where exactly does the chauffeur meet us inside Jeddah Airport?',
        questionAr: 'أين ينتظرني السائق بالضبط داخل مطار الملك عبدالعزيز بجدة؟',
        answer:
          'At Terminal 1, our chauffeur waits inside the arrivals greeting concourse right beside the famous 14-meter aquarium landmark holding a digital nameplate with your name. For the North Terminal, the driver coordinates via WhatsApp upon landing and pulls up to Gate 1/2 curbside.',
        answerAr:
          'في الصالة رقم 1، ينتظركم السائق داخل ردهة الوصول بجوار الحوض المائي الأسطواني الشهير حاملاً شاشة رقمية باسمك. وفي الصالة الشمالية، ينسق السائق معكم عبر الواتساب فور الهبوط ليلتقي بكم عند البوابة 1 أو 2.',
      },
      {
        question: 'What happens if our international flight is delayed or immigration takes long?',
        questionAr: 'ماذا يحدث إذا تأخرت رحلتنا الجوية أو استغرقت الجوازات وقتاً طويلاً؟',
        answer:
          'We track your flight number in real time against radar data. Your complimentary waiting window (60 to 90 minutes [needs owner confirmation]) only starts after your flight actually touches down on the tarmac, so you never pay extra for airline delays.',
        answerAr:
          'نحن نتابع رقم رحلتك مباشرة عبر رادار الملاحة الجوية. تبدأ فترة الانتظار المجانية (من 60 إلى 90 دقيقة [تحت تأكيد المالك]) فقط بعد هبوط الطائرة الفعلي على المدرج، ولن تتحمل أي تكلفة إضافية لتأخر الطيران.',
        isOperational: true,
        needsConfirmation: true,
      },
      {
        question: 'Can we stop to purchase local SIM cards or exchange currency at the airport?',
        questionAr: 'هل يمكننا التوقف لشراء شريحة اتصال سعودية أو صرف العملة في المطار؟',
        answer:
          'Yes. All arrival terminals feature STC, Mobily, and Zain kiosks as well as bank ATMs before exiting to the vehicle. Your chauffeur will patiently assist you and wait until you are fully ready.',
        answerAr:
          'نعم بالتأكيد. تتوفر في صالات الوصول منصات لشركات STC وموبايلي وزين وأجهزة صراف آلي قبل الخروج إلى السيارة. سينتظرك السائق حتى تنتهي من استخراج شرائحكم بكل راحة.',
      },
      {
        question: 'How do we pay for our transfer, and is any advance deposit required?',
        questionAr: 'كيف يتم سداد قيمة الرحلة، وهل يشترط دفع عربون مسبق؟',
        answer:
          'No advance deposit is required to secure your booking. You pay your chauffeur upon arrival at your Makkah hotel in Saudi Riyals (cash) or with debit/credit card (Visa, Mastercard, Mada) via the in-car POS machine [needs owner confirmation].',
        answerAr:
          'لا نشترط أي دفع مسبق لتأكيد حجزك. يتم سداد المبلغ لسائقك عند الوصول الآمن إلى فندقك بمكة المكرمة إما نقداً بالريال السعودي أو ببطاقات الدفع (مدى، فيزا، ماستركارد) عبر جهاز الدفع بالسيارة [تحت تأكيد المالك].',
        isOperational: true,
        needsConfirmation: true,
      },
      {
        question: 'Can we bring 5-liter Zamzam water canisters in the vehicle on the return trip?',
        questionAr: 'هل تتسع السيارة لعبوات مياه زمزم سعة 5 لتر مع الحقائب؟',
        answer:
          'Yes. All our vehicles (from Camry trunk to GMC Yukon XL and Toyota HiAce) have dedicated boot space designed to carry standard 5-liter factory-sealed Zamzam water bottles alongside your checked luggage.',
        answerAr:
          'نعم بالتأكيد. جميع سيارات أسطولنا (من صندوق الكامري وحتى اليوكون والهايس والكوستر) مصممة لاستيعاب عبوات ماء زمزم الرسمية سعة 5 لتر المغلفة بجانب حقائب السفر بأمان تام.',
      },
    ],
    relatedRouteIds: ['makkah-to-jeddah-airport', 'makkah-to-madinah', 'jeddah-to-madinah'],
  },

  'makkah-to-madinah': {
    id: 'makkah-to-madinah',
    titleEn: 'Makkah to Madinah VIP Private Taxi & Executive Chauffeur',
    titleAr: 'توصيل من مكة المكرمة إلى المدينة المنورة - تاكسي وسائق VIP خاص',
    subtitleEn: 'Peaceful Intercity Highway Transit via Al Hijrah Expressway with Flexible Prayer & Rest Stops',
    subtitleAr: 'رحلة مريحة ومباشرة عبر طريق الهجرة السريع مع توقف مرن للصلاة والاستراحة',
    distanceKm: 440,
    durationMinutesMin: 240,
    durationMinutesMax: 270,
    highway: 'Route 15 / Al Hijrah Expressway (High-speed multi-lane highway with modern SASCO service complexes)',
    highwayAr: 'طريق الهجرة السريع (طريق 15) - طريق سريع مجهز بمحطات واستراحات ساسكو الحديثة',
    lastUpdated: 'October 2026',
    verifiedSource: 'Saudi Transport General Authority (TGA) & Special Forces for Road Security',
    verifiedSourceAr: 'الهيئة العامة للنقل والقوات الخاصة لأمن الطرق',
    descriptionEn:
      'Traveling between the two Holy Sanctuaries of Islam is a profound journey of faith. Our private chauffeur transfer provides an executive sanctuary of quiet, climate-controlled comfort over the 440 km Hijrah route. Travel on your own schedule with zero train station taxi transfers, generous luggage capacity, and stops at high-standard SASCO Palm highway rest areas.',
    descriptionAr:
      'الانتقال بين الحرمين الشريفين رحلة إيمانية عظيمة. توفر لك خدمتنا الخاصة أعلى درجات الخصوصية والراحة والهدوء عبر طريق الهجرة (440 كم) مع تكييف فائق ومقاعد رحبة. سافر في الوقت الذي يناسبك تماماً بدون الحاجة للتنقل بين محطات القطار، مع إمكانية التوقف في أرقى استراحات ساسكو الحديثة للصلاة وتناول القهوة.',
    highlightsEn: [
      'Direct hotel lobby to hotel lobby private transfer',
      'Flexible scheduled stops at modern SASCO Palm service stations',
      'Accommodates all large suitcases, strollers, and Zamzam containers',
      'Fixed transparent fare without highway toll or baggage surcharges',
      'Available 24 hours a day with professional licensed chauffeurs',
    ],
    highlightsAr: [
      'نقل خاص مباشر من باب الفندق بمكة إلى باب الفندق بالمدينة المنورة',
      'توقف مريح حسب رغبتكم في استراحات ساسكو الحديثة والمكيفة',
      'يتسع لجميع الحقائب الكبيرة وعربات الأطفال ومياه زمزم',
      'سعر ثابت وشامل كافة رسوم الطرق بدون أي مبالغ خفية',
      'خدمة متاحة على مدار 24 ساعة مع سائقين محترفين ومعتمدين',
    ],
    terminalNotes: [
      {
        terminal: 'Makkah Hotels (Central Area, Clock Tower, Ajyad, Aziziyah & Jabal Omar)',
        terminalAr: 'فنادق مكة المكرمة (المنطقة المركزية، أبراج الساعة، أجياد، العزيزية، وجبل عمر)',
        meetingPoint: 'Main Hotel Reception Entrance or Covered Porte-Cochère',
        meetingPointAr: 'مدخل الفندق الرئيسي أو بهو الاستقبال والمواقف المخصصة للنزلاء',
        pickupInstructions:
          'Your chauffeur arrives 15 minutes before the agreed pickup time, contacts you via WhatsApp or hotel reception, and assists with loading all luggage.',
        pickupInstructionsAr:
          'يصل السائق قبل 15 دقيقة من الموعد المحدد، ويتواصل معك عبر الواتساب، ويقوم بمساعدتكم في نقل وتحميل جميع الحقائب إلى السيارة.',
        landmarks: 'Direct vehicle access to hotel bell desk',
        landmarksAr: 'الوصول المباشر إلى مكتب استلام أمتعة الفندق',
      },
    ],
    milestones: [
      {
        title: 'Makkah Hotel Departure',
        titleAr: 'الانطلاق من فندق مكة',
        desc: 'Direct exit via 3rd Ring Road onto Route 15 (Al Hijrah Expressway).',
        descAr: 'الخروج المباشر عبر الطريق الدائري الثالث إلى طريق الهجرة (طريق 15).',
      },
      {
        title: 'Midway Highway Oasis (Wadi Qudaid / SASCO Palm)',
        titleAr: 'استراحة منتصف الطريق (محطة وادي قديد / ساسكو)',
        desc: 'Sanitized modern washrooms, air-conditioned prayer hall, cafes, and dining.',
        descAr: 'مرافق مياه نظيفة، مصلى مكيف، ومطاعم ومقاهي عالمية ومحلية للاستراحة.',
      },
      {
        title: 'Southern Madinah Approach',
        titleAr: 'مشارف المدينة المنورة الجنوبية',
        desc: 'Passing near Mount Ayr and transitioning into King Khalid Road.',
        descAr: 'المرور بجبل عير والدخول عبر طريق الملك خالد إلى قلب المدينة.',
      },
      {
        title: 'Prophet’s Mosque Central Zone Arrival',
        titleAr: 'الوصول لفنادق الحرم النبوي الشريف',
        desc: 'Direct drop-off at your hotel in the Northern or Southern Central Markaziah.',
        descAr: 'الوصول المباشر لباب فندقكم في المنطقة المركزية الشمالية أو الجنوبية.',
      },
    ],
    faqs: [
      {
        question: 'How long does the drive take from Makkah to Madinah by private car?',
        questionAr: 'كم تستغرق الرحلة بالسيارة الخاصة من مكة المكرمة إلى المدينة المنورة؟',
        answer:
          'The drive typically takes between 4.0 to 4.5 hours covering 440 km along the well-paved, multi-lane Al Hijrah Expressway (Route 15), including one comfortable 20-30 minute rest and prayer stop.',
        answerAr:
          'تستغرق الرحلة في المتوسط ما بين 4 إلى 4.5 ساعات لمسافة 440 كم عبر طريق الهجرة السريع (طريق 15)، شاملة توقفاً مريحاً لمدة 20-30 دقيقة للصلاة والاستراحة.',
      },
      {
        question: 'Are there clean rest areas and bathrooms along the highway?',
        questionAr: 'هل توجد استراحات ومرافق نظيفة ودورات مياه في طريق الهجرة؟',
        answer:
          'Yes. We stop exclusively at premier highway plazas such as SASCO Palm and modern fuel complexes which feature sanitized restrooms, air-conditioned mosques, coffee shops (Starbucks, Barn’s), and fast dining.',
        answerAr:
          'نعم بالتأكيد. نتوقف حصرياً في أرقى المحطات النموذجية مثل محطات "ساسكو بالم" التي توفر دورات مياه معقمة ونظيفة، مساجد مكيفة، ومقاهي ومطاعم راقية.',
      },
      {
        question: 'Why choose a private VIP taxi over the Haramain High-Speed Train?',
        questionAr: 'لماذا يفضل الكثيرون السيارة الخاصة على قطار الحرمين السريع؟',
        answer:
          'A private chauffeur provides door-to-door service without packing restrictions. With the train, families must book taxis to Makkah train station, navigate platform escalators with heavy baggage, respect strict 1-bag limits, and take another taxi from Madinah station to their hotel. A private car is seamless, private, and often more cost-effective for families of 3 or more.',
        answerAr:
          'توفر السيارة الخاصة خدمة من الباب إلى الباب بدون قيود على عدد الحقائب. في القطار، تحتاج العائلة لحجز تاكسي لمحطة مكة، وحمل الحقائب عبر الأرصفة، والالتزام بحد حقيبة واحدة لكل راكب، ثم حجز تاكسي آخر في المدينة. السيارة الخاصة توفر راحة تامة وهي خيار أوفر للعائلات المكونة من 3 أفراد فأكثر.',
      },
      {
        question: 'Can we stop for lunch or coffee during the trip?',
        questionAr: 'هل يمكننا التوقف لتناول الغداء أو القهوة أثناء الطريق؟',
        answer:
          'Yes, absolutely. Because it is your private vehicle, the schedule is tailored to you. You can request your chauffeur to pause whenever your family needs a break.',
        answerAr:
          'نعم بكل سرور. لأن السيارة خاصة بك وبعائلتك وحدكم، فإن التوقف يتم وفق رغبتكم وراحتكم التامة في أي وقت.',
      },
      {
        question: 'What happens if we travel during Ramadan or peak seasons?',
        questionAr: 'ماذا عن السفر خلال شهر رمضان المبارك والمواسم المزدحمة؟',
        answer:
          'During Ramadan, demand is high and highway checkpoints operate actively. We recommend booking at least 48 hours in advance to guarantee vehicle availability. Our drivers know alternative feeder roads to avoid city traffic jams [needs owner confirmation].',
        answerAr:
          'خلال موسم رمضان المبارك يرتفع الإقبال بشكل كبير. ننصح بالحجز المسبق قبل 48 ساعة لضمان توفر السيارة المختارة. وسائقونا على دراية بالمسارات البديلة لتفادي الزحام [تحت تأكيد المالك].',
        isOperational: true,
        needsConfirmation: true,
      },
    ],
    relatedRouteIds: ['madinah-to-makkah', 'jeddah-airport-to-makkah', 'madinah-airport-to-hotel'],
  },

  'madinah-to-makkah': {
    id: 'madinah-to-makkah',
    titleEn: 'Madinah to Makkah VIP Taxi with Miqat Dhu al-Hulayfah (Bir Ali) Stop',
    titleAr: 'توصيل من المدينة إلى مكة المكرمة مع التوقف بميقات ذي الحليفة (آبار علي)',
    subtitleEn: 'Sacred Umrah Route: Dedicated Stop at Masjid Miqat for Ihram, Niyyah, and Peaceful Talbiyah',
    subtitleAr: 'طريق العمرة المبارك: توقف مخصص بميقات ذي الحليفة للإحرام والنية والتلبية',
    distanceKm: 440,
    durationMinutesMin: 270,
    durationMinutesMax: 300,
    highway: 'Route 15 / Al Hijrah Expressway with initial stop at Miqat Dhu al-Hulayfah (Bir Ali)',
    highwayAr: 'طريق الهجرة السريع مع التوقف أولاً بميقات ذي الحليفة (آبار علي)',
    lastUpdated: 'October 2026',
    verifiedSource: 'Ministry of Hajj and Umrah & General Presidency for the Affairs of the Two Holy Mosques',
    verifiedSourceAr: 'وزارة الحج والعمرة والرئاسة العامة لشؤون المسجد الحرام والمسجد النبوي',
    descriptionEn:
      'Begin your sacred Umrah pilgrimage with absolute peace of mind. Departing from your hotel in Madinah, your chauffeur escorts your family to Masjid Dhu al-Hulayfah (commonly known as Bir Ali), the designated Miqat for the people of Madinah and those passing through it. We pause for 30–45 minutes allowing men and women to change into Ihram, perform Sunnah prayers, and utter their Niyyah before embarking on the highway to Makkah.',
    descriptionAr:
      'ابدأ مناسك عمرتك المباركة بطمأنينة وخشوع. ينطلق سائقكم الخاص من باب فندقكم بالمدينة المنورة إلى ميقات ذي الحليفة (مسجد آبار علي)، الميقات المكاني لأهل المدينة ومن مر بها. نتوقف هناك لمدة كافية (30 إلى 45 دقيقة) تتيح للرجال والنساء التطيب وارتداء ملابس الإحرام وصلاة ركعتي الإحرام وعقد النية، ثم الانطلاق نحو مكة المكرمة.',
    highlightsEn: [
      'Complimentary 30-45 minute stop at Miqat Masjid Dhu al-Hulayfah (Bir Ali)',
      'Luggage stays safely locked in the vehicle while you visit the Miqat',
      'Gentle, quiet driving environment allowing contemplation and Talbiyah',
      'Direct arrival to your hotel near the Holy Kaaba / Haram boundary',
      'Complimentary chilled bottled water provided throughout the journey',
    ],
    highlightsAr: [
      'توقف مجاني مخصص لمدة 30-45 دقيقة في ميقات ذي الحليفة (آبار علي)',
      'الحقائب والأغراض تظل مؤمنة ومغلقة تماماً داخل السيارة أثناء وجودكم في الميقات',
      'سياقة هادئة وآمنة تتيح للعائلة التلبية والأذكار براحة وخشوع',
      'توصيل مباشر لباب فندقكم بجوار الحرم المكي الشريف',
      'مياه شرب باردة مجهزة داخل السيارة طوال مسار الرحلة',
    ],
    terminalNotes: [
      {
        terminal: 'Madinah Hotels (Central Northern & Southern Markaziah, Quba Road)',
        terminalAr: 'فنادق المدينة المنورة (المنطقة المركزية الشمالية والجنوبية، وطريق قباء)',
        meetingPoint: 'Hotel Reception Lobby or Front Covered Driveway',
        meetingPointAr: 'بهو استقبال الفندق أو المدخل الخارجي المباشر',
        pickupInstructions:
          'Chauffeur coordinates luggage loading and ensures family members have their Ihram garments readily accessible in hand luggage before leaving the hotel.',
        pickupInstructionsAr:
          'يقوم السائق بتحميل الحقائب مع التنبيه بوضع ملابس الإحرام في متناول اليد لتسهيل ارتدائها عند الوصول للميقات.',
        landmarks: 'Direct hotel entrance pickup',
        landmarksAr: 'الاستلام المباشر من أمام بوابة الفندق',
      },
      {
        terminal: 'Miqat Stop: Masjid Dhu al-Hulayfah (Bir Ali)',
        terminalAr: 'محطة الميقات: مسجد ذي الحليفة (آبار علي)',
        meetingPoint: 'Reserved VIP Private Parking Area near the Main Courtyard',
        meetingPointAr: 'المواقف الخاصة المخصصة بالقرب من الساحة الرئيسية للمسجد',
        pickupInstructions:
          'The driver parks in an easily identifiable spot, shows you the entrance for ladies and men, and waits patiently until you complete your prayer and intention.',
        pickupInstructionsAr:
          'يقوم السائق بالوقوف في مكان مميز ويوضح لكم مداخل مصلى الرجال ومصلى النساء، وينتظركم حتى إتمام الصلاة والنية والعودة للسيارة.',
        landmarks: 'Opposite the Miqat Ablution and Ihram Shopping Complex',
        landmarksAr: 'مقابل مجمع المغاسل والمحلات المخصصة لمستلزمات الإحرام بالميقات',
      },
    ],
    milestones: [
      {
        title: 'Madinah Hotel Departure',
        titleAr: 'الانطلاق من فندق المدينة',
        desc: 'Departing the Markaziah via King Fahd Road towards the southern exit.',
        descAr: 'الخروج من المنطقة المركزية عبر طريق الملك فهد باتجاه المخرج الجنوبي.',
      },
      {
        title: 'Masjid Dhu al-Hulayfah (Miqat Bir Ali)',
        titleAr: 'مسجد ذي الحليفة (ميقات آبار علي)',
        desc: 'Official 30-45 minute stop for Ihram, ghusl, two-rak’ah prayer, and Niyyah.',
        descAr: 'توقف رسمي لمدة 30-45 دقيقة للإحرام وصلاة ركعتين وعقد نية العمرة.',
      },
      {
        title: 'Highway Talbiyah Journey (Route 15)',
        titleAr: 'مسار التلبية عبر طريق الهجرة',
        desc: 'Peaceful long-distance cruise towards Makkah with optional rest stop.',
        descAr: 'المسار السريع مع التلبية والاستراحة في محطة نموذجية للصلاة.',
      },
      {
        title: 'Makkah Haram Arrival',
        titleAr: 'الوصول إلى مكة المكرمة',
        desc: 'Passing the Quran Gate and arriving at your hotel doorstep to begin Umrah.',
        descAr: 'المرور ببوابة مكة المكرمة والوصول لباب الفندق للاستعداد لأداء الطواف والسعي.',
      },
    ],
    faqs: [
      {
        question: 'Is the stop at Miqat Bir Ali included in the fare or does it cost extra?',
        questionAr: 'هل التوقف في ميقات آبار علي مشمول في السعر أم توجد تكلفة إضافية؟',
        answer:
          'The stop at Masjid Dhu al-Hulayfah (Bir Ali) is 100% complimentary and included in the fixed fare for all Madinah-to-Makkah bookings. There are zero extra charges for this stop.',
        answerAr:
          'التوقف في مسجد ذي الحليفة (آبار علي) مشمول ومجاني 100% ضمن السعر الثابت لكافة حجوزات مسار (المدينة إلى مكة)، ولا توجد أي رسوم إضافية إطلاقاً.',
      },
      {
        question: 'How much time do we get at the Miqat to prepare and pray?',
        questionAr: 'كم المدة المتاحة لنا في الميقات للاغتسال والإحرام والصلاة؟',
        answer:
          'We allocate a standard 30 to 45 minutes, which provides ample time to use the facilities, change into Ihram garments, perform two rak’ahs of prayer, and make your intention (Niyyah). If elderly family members need a few extra minutes, our chauffeur accommodates you with pleasure.',
        answerAr:
          'نخصص مدة قياسية تتراوح بين 30 إلى 45 دقيقة، وهي كافية تماماً للاغتسال وارتداء الإحرام وصلاة ركعتين وعقد النية. وإذا كان معكم كبار سن يحتاجون وقتاً إضافياً، فسائقنا في خدمتكم بكل رحابة صدر.',
      },
      {
        question: 'Can we buy Ihram belts, slippers, or unscented soap at the Miqat?',
        questionAr: 'هل يمكن شراء مستلزمات الإحرام (حزام، صابون غير معطر) من الميقات؟',
        answer:
          'Yes. Masjid Dhu al-Hulayfah features an extensive shopping arcade right outside the gates selling high-quality toweling Ihrams, safety belts, pins, unscented soap, and slippers.',
        answerAr:
          'نعم. يضم محيط مسجد ذي الحليفة سوقاً متكاملاً يوفر مناشف الإحرام القطنية، أحزمة الإحرام، الصابون غير المعطر، والنعال المناسبة للإحرام.',
      },
      {
        question: 'Are our suitcases safe in the car while we are inside the Miqat mosque?',
        questionAr: 'هل حقائبنا ومتعلقاتنا آمنة في السيارة أثناء وجودنا داخل المسجد؟',
        answer:
          'Yes, entirely safe. The vehicle is fully locked and monitored, and your chauffeur stays with the vehicle in the designated parking area throughout your visit.',
        answerAr:
          'نعم، في أمان تام بإذن الله. تظل السيارة مغلقة ومؤمنة بالكامل، ويبقى سائقكم بجوار السيارة في المواقف المخصصة طوال فترة وجودكم بالداخل.',
      },
      {
        question: 'What time is best to depart Madinah to arrive in Makkah for Umrah?',
        questionAr: 'ما هو أفضل وقت للانطلاق من المدينة لأداء العمرة في مكة؟',
        answer:
          'Pilgrims generally prefer departing after Dhuhr prayer (arriving in Makkah by Maghrib/Isha) or after Fajr prayer (arriving in Makkah before Dhuhr). Both timings allow performing Tawaf during cooler hours.',
        answerAr:
          'يفضل غالبية المعتمرين الانطلاق إما بعد صلاة الظهر (للوصول إلى مكة مع المغرب أو العشاء) أو بعد صلاة الفجر (للوصول قبل الظهر)، وذلك لتفادي حرارة الشمس أثناء الطواف.',
      },
    ],
    relatedRouteIds: ['makkah-to-madinah', 'makkah-to-jeddah-airport', 'jeddah-airport-to-makkah'],
  },

  'makkah-to-jeddah-airport': {
    id: 'makkah-to-jeddah-airport',
    titleEn: 'Makkah Hotel to Jeddah Airport (KAIA) Departure Transfer',
    titleAr: 'توصيل من فنادق مكة إلى مطار الملك عبدالعزيز بجدة (KAIA) - رحلات المغادرة',
    subtitleEn: 'Punctual Departure Chauffeur Service Ensuring Stress-Free Airport Check-in and Zamzam Handling',
    subtitleAr: 'خدمة مغادرة دقيقة تضمن وصولكم في الموعد المحدد لإنهاء إجراءات السفر وشحن ماء زمزم',
    distanceKm: 95,
    durationMinutesMin: 75,
    durationMinutesMax: 90,
    highway: 'Route 40 / Makkah-Jeddah Expressway to KAIA Terminal Connectors',
    highwayAr: 'طريق مكة - جدة السريع (طريق 40) والجسور الموصلة لصالات المطار',
    lastUpdated: 'October 2026',
    verifiedSource: 'General Authority of Civil Aviation (GACA) Airport Passenger Regulations',
    verifiedSourceAr: 'الهيئة العامة للطيران المدني (GACA) والتعليمات الملاحية لمسافري العمرة',
    descriptionEn:
      'Conclude your blessed Umrah with the same dignity and peace of mind with which you began. Our departure chauffeur arrives at your Makkah hotel lobby promptly 15 minutes before the scheduled time, carefully loads your luggage and official 5-liter Zamzam water canisters, and transports you directly to the departures curb of Terminal 1, North Terminal, or Hajj/Umrah Terminal.',
    descriptionAr:
      'اختتم رحلتك الإيمانية المباركة بنفس مستوى الطمأنينة والرقي. يصل سائقنا إلى بهو فندقك بمكة قبل 15 دقيقة من الموعد المحدد، ويقوم بتحميل الحقائب وعبوات مياه زمزم الرسمية بعناية فائقة، وينقلك مباشرة إلى بوابة صالة المغادرة المناسبة لرحلتك الدولية أو الداخلية.',
    highlightsEn: [
      'Punctual hotel lobby greeting 15 minutes before departure time',
      'Direct delivery to the correct terminal departure gate (Terminal 1, North, or Hajj Terminal)',
      'Safe transport and trunk arrangement for official 5-liter Zamzam bottles',
      'All toll fees and VAT included in the transparent fixed fare',
      'Assistance with luggage trolleys at the airport curb',
    ],
    highlightsAr: [
      'التزام تام بالموعد والحضور قبل 15 دقيقة من وقت التحرك المحدد',
      'التوصيل المباشر إلى بوابة صالة المغادرة الدقيقة لرحلتك (الصالة 1، الشمالية، أو الحج)',
      'عناية خاصة في ترتيب ووضع عبوات زمزم 5 لتر في صندوق السيارة',
      'سعر ثابت يشمل كافة الرسوم وضريبة القيمة المضافة بدون أي رسوم خفية',
      'مساعدة في إنزال الحقائب وتوفير عربات الأمتعة عند رصيف المطار',
    ],
    terminalNotes: [
      {
        terminal: 'Departures: Terminal 1 (Saudia & Major Global Airlines)',
        terminalAr: 'المغادرة: الصالة رقم 1 (الخطوط السعودية والشركات العالمية)',
        meetingPoint: 'Departures Level Curbside, Gate matching your airline check-in zone',
        meetingPointAr: 'رصيف صالة المغادرة العلوي، أمام البوابة الأقرب لكاونترات شركة طيرانكم',
        pickupInstructions:
          'Your chauffeur drops you directly on the elevated departure road right in front of the luggage check-in doors.',
        pickupInstructionsAr:
          'يصعد السائق إلى جسر المغادرة العلوي وينزلكم مباشرة أمام بوابات الدخول لكاونترات شحن الحقائب.',
        landmarks: 'Official Zamzam baggage check-in points located adjacent to the check-in rows',
        landmarksAr: 'منصات شحن مياه زمزم الرسمية المجاورة لصفوف إنهاء إجراءات السفر',
      },
      {
        terminal: 'Departures: North Terminal',
        terminalAr: 'المغادرة: الصالة الشمالية',
        meetingPoint: 'Departures Forecourt Vehicle Drop-off Zone',
        meetingPointAr: 'منطقة تنزيل ركاب المغادرة أمام الصالة الشمالية',
        pickupInstructions:
          'Direct drop-off at the departure entry canopy with immediate trolley availability.',
        pickupInstructionsAr:
          'التوقف المباشر عند مظلة المغادرة الرئيسية مع توفير عربات الحقائب على الفور.',
        landmarks: 'Main Departure Entrance Doors 1 & 2',
        landmarksAr: 'بوابات دخول المغادرين الرئيسية 1 و 2',
      },
    ],
    milestones: [
      {
        title: 'Makkah Hotel Pickup',
        titleAr: 'التحرك من فندق مكة',
        desc: 'Luggage loading, flight time re-verification, and highway departure.',
        descAr: 'تحميل الأمتعة والتأكد من صالة المغادرة والانطلاق إلى الخط السريع.',
      },
      {
        title: 'Shumaisi Highway Toll Point',
        titleAr: 'نقطة الشميسي',
        desc: 'Crossing the Holy City perimeter smoothly into Jeddah expressway.',
        descAr: 'مغادرة حدود الحرم والانطلاق السلس باتجاه محافظة جدة والمطار.',
      },
      {
        title: 'Jeddah Airport Elevated Skyway',
        titleAr: 'جسر مطار جدة العلوي',
        desc: 'Direct elevated ramp leading straight to the departures level.',
        descAr: 'الصعود المباشر عبر الجسر المخصص لسيارات المغادرة إلى باب الصالة.',
      },
      {
        title: 'Departures Curb Unloading',
        titleAr: 'الوصول لرصيف المغادرة',
        desc: 'Luggage unloading, trolley assistance, and farewell greeting.',
        descAr: 'إنزال الأمتعة والمساعدة في توفير العربات وتوديعكم بسلامة الله.',
      },
    ],
    faqs: [
      {
        question: 'How many hours before our flight should we leave our Makkah hotel?',
        questionAr: 'كم ساعة قبل موعد إقلاع الطائرة يجب أن نتحرك من فندقنا بمكة؟',
        answer:
          'For international flights, GACA guidelines strongly recommend arriving at KAIA 3 to 4 hours before departure. Adding the 1.5-hour highway drive, we recommend setting your hotel pickup time 4.5 to 5 hours prior to your scheduled flight takeoff.',
        answerAr:
          'للرحلات الدولية، توصي الهيئة العامة للطيران المدني بالوصول إلى المطار قبل 3 إلى 4 ساعات من موعد الإقلاع. وبإضافة زمن الطريق (ساعة ونصف تقريباً)، ننصح بجدولة التحرك من الفندق قبل 4.5 إلى 5 ساعات من موعد الإقلاع.',
      },
      {
        question: 'What are the official GACA rules for transporting Zamzam water to the airport?',
        questionAr: 'ما هي التعليمات الرسمية لشحن مياه زمزم في المطار؟',
        answer:
          'Pilgrims holding an Umrah visa are permitted one official factory-sealed 5-liter Zamzam canister per person. It must NEVER be placed inside checked suitcases; it is checked separately at designated airport Zamzam luggage conveyor belts.',
        answerAr:
          'يُسمح لكل معتمر يحمل تأشيرة عمرة بعبوة زمزم رسمية واحدة سعة 5 لتر مغلفة بكرتون المصنع. ويُمنع منعاً باتاً وضع عبوات الماء داخل حقائب السفر العادية، بل تُشحن بشكل مستقل عبر مسارات زمزم المخصصة في المطار.',
      },
      {
        question: 'Can the driver take us to the North Terminal or Hajj Terminal if our airline changes?',
        questionAr: 'هل يوصلنا السائق إلى الصالة الشمالية أو صالة الحج إذا تغيرت الصالة؟',
        answer:
          'Yes. Before setting off, our chauffeur confirms your flight number and airline to ensure you are dropped at the exact terminal building.',
        answerAr:
          'نعم بالتأكيد. قبل التحرك، يتأكد السائق من رقم رحلتك وشركة الطيران للتأكد من إنزالكم عند مبنى الصالة الصحيح مباشرة.',
      },
      {
        question: 'What if our hotel is in a pedestrianized area right beside the Haram?',
        questionAr: 'ماذا لو كان فندقنا في منطقة مشاة ملاصقة لساحات الحرم؟',
        answer:
          'For hotels with restricted vehicular access during prayer times (e.g. Clock Tower tunnel or Jabal Omar lower ring), our chauffeurs coordinate directly with the hotel concierge or meet you at the nearest authorized vehicle lobby drop zone.',
        answerAr:
          'بالنسبة للفنادق الواقعة في مناطق مخصصة للمشاة أوقات الصلوات (مثل أنفاق أبراج البيت أو جبل عمر)، ينسق السائق معكم ومع بهو الفندق للوقوف في أقرب نقطة مصرحة ومساعدتكم في نقل الحقائب إليها.',
      },
      {
        question: 'Do you operate departure transfers 24 hours a day, including late night?',
        questionAr: 'هل تعمل خدمة التوصيل للمطار على مدار 24 ساعة بما في ذلك منتصف الليل؟',
        answer:
          'Yes. We operate round-the-clock 24/7. Whether your flight departs at 3:00 AM or midday, your assigned chauffeur will be at your hotel lobby on time.',
        answerAr:
          'نعم، خدماتنا متاحة على مدار 24 ساعة طوال أيام الأسبوع. وسواء كانت رحلتك فجراً أو في منتصف الليل أو ظهراً، سيكون سائقك بالانتظار في الموعد بدقة تامة.',
      },
    ],
    relatedRouteIds: ['jeddah-airport-to-makkah', 'makkah-to-madinah', 'jeddah-to-madinah'],
  },

  'jeddah-to-madinah': {
    id: 'jeddah-to-madinah',
    titleEn: 'Jeddah City / KAIA Airport to Madinah Direct VIP Chauffeur',
    titleAr: 'توصيل مباشر من جدة / مطار جدة إلى المدينة المنورة - سائق VIP خاص',
    subtitleEn: 'Seamless 410 km Highway Transit to the Prophet’s Sanctuary without Train Layover Stress',
    subtitleAr: 'رحلة مباشرة (410 كم) إلى رحاب المسجد النبوي الشريف دون عناء مواعيد وتغيير القطارات',
    distanceKm: 410,
    durationMinutesMin: 240,
    durationMinutesMax: 270,
    highway: 'Route 15 / Al Hijrah Highway directly accessible from KAIA East Connector',
    highwayAr: 'طريق الهجرة السريع (طريق 15) والمتصل مباشرة بجسر مطار جدة الشرقي',
    lastUpdated: 'October 2026',
    verifiedSource: 'Saudi Transport General Authority & Ministry of Hajj and Umrah',
    verifiedSourceAr: 'الهيئة العامة للنقل ووزارة الحج والعمرة',
    descriptionEn:
      'For international pilgrims choosing to begin their spiritual journey in Madinah Al-Munawwarah directly upon landing in Jeddah, our direct chauffeur transfer offers the ultimate in convenience. Avoid the stress of dragging heavy luggage across airport train terminals, coordinating domestic flight transfers, or waiting for fixed departure times. Meet your driver at arrivals and relax straight to your Madinah hotel.',
    descriptionAr:
      'للمعتمرين الكرام الذين يفضلون بدء رحلتهم بزيارة المدينة المنورة فور وصولهم إلى مطار جدة، نوفر لهم خدمة النقل المباشر الأرقى والأسهل. تجنب عناء نقل الحقائب الثقيلة بين أرصفة القطارات أو انتظار الرحلات الجوية الداخلية. يلتقي بكم السائق في صالة الوصول لتنطلقوا مباشرة في سيارة خاصة فاخرة ومكيفة إلى باب فندقكم بالمدينة.',
    highlightsEn: [
      'Direct airport terminal meetup and seamless departure onto the highway',
      'Door-to-door arrival at any hotel in Madinah Northern or Southern Markaziah',
      'Freedom to schedule prayer, dining, and restroom stops at clean SASCO complexes',
      'Zero baggage limits within the vehicle class selected',
      'Pay upon arrival to driver — cash or credit card',
    ],
    highlightsAr: [
      'استقبال مباشر من صالة المطار والانطلاق الفوري إلى طريق المدينة السريع',
      'توصيل حتى باب فندقكم في المنطقة المركزية الشمالية أو الجنوبية بالمدينة',
      'حرية التوقف للصلاة وتناول الطعام في أرقى محطات واستراحات ساسكو',
      'بدون أي قيود على وزن أو عدد الحقائب ضمن سعة السيارة المختارة',
      'الدفع عند الوصول الآمن لسائقك نقداً أو بالبطاقة البنكية',
    ],
    terminalNotes: [
      {
        terminal: 'Jeddah Airport Arrivals (Terminal 1 or North Terminal)',
        terminalAr: 'صالات وصول مطار جدة (الصالة 1 أو الصالة الشمالية)',
        meetingPoint: 'Arrivals Concourse Meet & Greet with Digital Name Sign',
        meetingPointAr: 'ردهة صالة الوصول مع لوحة اسم إلكترونية خاصة',
        pickupInstructions:
          'Your chauffeur meets you at the designated exit point, loads all luggage, and begins the journey towards Madinah immediately.',
        pickupInstructionsAr:
          'يلتقي بكم السائق عند بوابة الخروج المحددة، ويقوم بتحميل الحقائب والتحرك مباشرة باتجاه المدينة المنورة.',
        landmarks: 'Terminal 1 Aquarium or North Terminal Gate 1/2',
        landmarksAr: 'حوض الأسماك بالصالة 1 أو بوابات 1 و 2 بالصالة الشمالية',
      },
    ],
    milestones: [
      {
        title: 'Jeddah Airport Departure',
        titleAr: 'الانطلاق من مطار جدة',
        desc: 'Direct access to the Madinah highway via the airport eastern expressway.',
        descAr: 'الخروج المباشر عبر الجسر الشرقي للمطار إلى طريق المدينة المنورة السريع.',
      },
      {
        title: 'Asfan & Rabigh Highway Stretch',
        titleAr: 'مسار عسفان ورابغ',
        desc: 'Modern multi-lane highway cruising with continuous service stations.',
        descAr: 'القيادة السلسة عبر الطريق المجهز والمراقب مع توفر كافة الخدمات.',
      },
      {
        title: 'Wadi Qudaid Rest Area',
        titleAr: 'استراحة وادي قديد',
        desc: 'Recommended stop for prayer, washrooms, fresh coffee, and snacks.',
        descAr: 'المحطة المفضلة للاستراحة وصلاة الفرض وتناول القهوة والمأكولات.',
      },
      {
        title: 'Madinah Markaziah Hotel Arrival',
        titleAr: 'الوصول لفنادق مركزية المدينة',
        desc: 'Arriving at your hotel steps away from the Prophet’s Mosque.',
        descAr: 'الوصول المباشر إلى باب فندقك على مقربة من المسجد النبوي الشريف.',
      },
    ],
    faqs: [
      {
        question: 'Why choose a private taxi from Jeddah Airport to Madinah instead of taking the train?',
        questionAr: 'لماذا أختار سيارة خاصة من مطار جدة إلى المدينة بدلاً من قطار الحرمين؟',
        answer:
          'While the Haramain Train is fast, it operates on rigid schedules and strictly enforces baggage limits (one suitcase up to 25 kg per person). After a long international flight, traveling by private car eliminates transferring luggage through airport shuttles, waiting for train departure times, and hiring a secondary taxi from Madinah station to your hotel. Our car takes you door-to-door.',
        answerAr:
          'رغم سرعة قطار الحرمين، إلا أنه مرتبط بمواعيد ثابتة وصارمة، ويشترط حقيبة واحدة فقط بوزن 25 كجم لكل راكب. بعد رحلة طيران دولية طويلة، توفر السيارة الخاصة عناء شحن الأمتعة في محطة المطار، والانتظار لساعات، ثم البحث عن تاكسي آخر في محطة المدينة. سيارتنا تنقلك مع أمتعتك مباشرة من صالة المطار إلى باب فندقك.',
      },
      {
        question: 'How long does the drive take from Jeddah to Madinah?',
        questionAr: 'كم تستغرق الرحلة بالسيارة من جدة إلى المدينة المنورة؟',
        answer:
          'The drive takes approximately 4.0 to 4.5 hours covering 410 km along Route 15, depending on the duration of your chosen rest stop.',
        answerAr:
          'تستغرق الرحلة حوالي 4 إلى 4.5 ساعات لمسافة 410 كم عبر طريق الهجرة السريع، حسب مدة التوقف للاستراحة.',
      },
      {
        question: 'Can we stop for food, coffee, or prayer during the trip?',
        questionAr: 'هل يمكننا التوقف لتناول وجبة أو القهوة أو الصلاة خلال الطريق؟',
        answer:
          'Yes. You have complete control over rest stops. Chauffeurs stop at high-quality highway plazas like SASCO Palm with air-conditioned prayer halls and clean washrooms.',
        answerAr:
          'نعم بالتأكيد. القرار لك بالكامل في أوقات التوقف، ويتوقف السائق في أرقى المحطات النموذجية المزودة بمساجد مكيفة ودورات مياه نظيفة ومطاعم متعددة.',
      },
      {
        question: 'Is child seating available for long highway trips?',
        questionAr: 'هل تتوفر مقاعد أمان للأطفال للرحلات الطويلة؟',
        answer:
          'Child and infant safety seats are available upon advance request during booking to ensure the utmost safety and comfort for your little ones [needs owner confirmation].',
        answerAr:
          'تتوفر مقاعد أمان مخصصة للأطفال والرضع عند طلبها مسبقاً أثناء الحجز لضمان راحة وسلامة أطفالكم طوال مسار الطريق [تحت تأكيد المالك].',
        isOperational: true,
        needsConfirmation: true,
      },
      {
        question: 'What is the fare for a luxury GMC Yukon XL or Hyundai Staria on this route?',
        questionAr: 'ما هي أسعار السيارات الفاخرة (يوكون XL أو ستاريا) لهذا المسار؟',
        answer:
          'Our rates are synced directly with live database pricing. You can review all current rates in the interactive pricing matrix on this page and choose the vehicle that best accommodates your family.',
        answerAr:
          'أسعارنا مربوطة مباشرة ومحدثة لحظياً من قاعدة البيانات. يمكنك مراجعة جدول الأسعار التفاعلي في هذه الصفحة واختيار السيارة الأنسب لعدد أفراد عائلتك وحقائبكم.',
      },
    ],
    relatedRouteIds: ['makkah-to-madinah', 'madinah-airport-to-hotel', 'jeddah-airport-to-makkah'],
  },

  'madinah-airport-to-hotel': {
    id: 'madinah-airport-to-hotel',
    titleEn: 'Madinah Airport (MED) to Central Hotel Transfer',
    titleAr: 'توصيل من مطار المدينة المنورة (MED) إلى فنادق المنطقة المركزية',
    subtitleEn: 'Warm Welcome at Prince Mohammad Bin Abdulaziz Airport with Direct Hotel Delivery',
    subtitleAr: 'استقبال في مطار الأمير محمد بن عبدالعزيز وتوصيل مباشر لفنادق الحرم النبوي',
    distanceKm: 25,
    durationMinutesMin: 25,
    durationMinutesMax: 35,
    highway: 'Airport Road / King Abdulaziz Road into Central Markaziah',
    highwayAr: 'طريق المطار المتصل بطريق الملك عبدالعزيز المؤدي للمنطقة المركزية',
    lastUpdated: 'October 2026',
    verifiedSource: 'Prince Mohammad Bin Abdulaziz International Airport (TIBAH Airports)',
    verifiedSourceAr: 'مطار الأمير محمد بن عبدالعزيز الدولي (شركة طيبة لتشغيل المطارات)',
    descriptionEn:
      'Arrive in the illuminated city of Prophet Muhammad (peace be upon him) with serene ease. Prince Mohammad Bin Abdulaziz International Airport (MED) is located approximately 25 km from the Prophet’s Mosque. Our professional chauffeur welcomes you directly outside arrivals with a digital name sign, handles all your luggage, and drives you smoothly to your hotel in the Central Markaziah.',
    descriptionAr:
      'أهلاً بكم في طيبة الطيبة، مدينة الحبيب المصطفى صلى الله عليه وسلم. يبعد مطار الأمير محمد بن عبدالعزيز الدولي حوالي 25 كم عن المسجد النبوي الشريف. يستقبلكم سائقنا في صالة الوصول بلافتة رقمية باسمكم، ويتولى حقائبكم لينقلكم بسلاسة وراحة إلى باب فندقكم في مركزية المدينة.',
    highlightsEn: [
      'Meet and greet directly at airport arrivals hall exit',
      'Flight arrival radar monitoring included at no extra cost',
      'Quick 25-minute journey straight to your hotel reception',
      'Fixed transparent price with zero parking surcharges',
      'Assistance with luggage and prayer equipment',
    ],
    highlightsAr: [
      'استقبال مباشر داخل ردهة صالة الوصول فور الخروج بالحقائب',
      'متابعة حية لموعد هبوط الطائرة بدون أي تكلفة إضافية',
      'رحلة سريعة ومريحة تستغرق حوالي 25 دقيقة فقط لباب الفندق',
      'سعر ثابت يشمل كافة الرسوم بدون أي مبالغ إضافية للمواقف',
      'مساعدة كاملة في نقل الحقائب ومستلزمات الراحة',
    ],
    terminalNotes: [
      {
        terminal: 'Madinah Airport Arrivals Hall (Single Integrated Terminal)',
        terminalAr: 'صالة الوصول بمطار المدينة المنورة (مبنى الصالة الموحد)',
        meetingPoint: 'Directly outside the International/Domestic baggage exit gates',
        meetingPointAr: 'مباشرة أمام بوابات الخروج بعد استلام الأمتعة الدولية والداخلية',
        pickupInstructions:
          'After passing through customs into the main welcoming hall, your chauffeur will be waiting holding a VIP digital sign displaying your name.',
        pickupInstructionsAr:
          'فور عبور منطقة الجمارك إلى الصالة العامة، ستجد السائق بانتظاركم حاملاً لوحة رقمية باسمكم الكريم.',
        landmarks: 'Near the Welcome to Madinah Info Kiosk & Al-Rajhi Bank ATM',
        landmarksAr: 'بجوار منصة معلومات زوار المدينة وصراف بنك الراجحي',
      },
    ],
    milestones: [
      {
        title: 'Madinah Airport Exit',
        titleAr: 'الانطلاق من مطار المدينة',
        desc: 'Departing airport grounds directly onto Airport Road.',
        descAr: 'الخروج السلس من المطار عبر طريق المطار السريع.',
      },
      {
        title: 'King Abdulaziz Road Junction',
        titleAr: 'تقاطع طريق الملك عبدالعزيز',
        desc: 'Main arterial expressway heading into the historic city center.',
        descAr: 'المحور الرئيسي المؤدي مباشرة لقلب المدينة التاريخي.',
      },
      {
        title: 'First View of the Prophet’s Mosque Minarets',
        titleAr: 'رؤية مآذن المسجد النبوي الشريف',
        desc: 'Spiritual arrival as the green dome and minarets come into view.',
        descAr: 'المشهد الإيماني المهيب مع ظهور مآذن وقباب المسجد النبوي.',
      },
      {
        title: 'Hotel Lobby Arrival',
        titleAr: 'الوصول لباب الفندق',
        desc: 'Curbside delivery to your hotel in Northern or Southern Markaziah.',
        descAr: 'الوقوف أمام بوابة الفندق وتفريغ الحقائب لمكتب الاستقبال.',
      },
    ],
    faqs: [
      {
        question: 'Where will our chauffeur wait at Madinah Airport (MED)?',
        questionAr: 'أين ينتظرنا السائق في مطار الأمير محمد بن عبدالعزيز بالمدينة؟',
        answer:
          'Madinah Airport features a single modern integrated terminal. After picking up your luggage and exiting customs, you will see our driver holding a tablet with your name right in the arrivals greeting area.',
        answerAr:
          'يتميز مطار المدينة بصالة واحدة حديثة ومتكاملة. بعد استلام الحقائب والخروج من الجمارك، ستجد سائقنا بانتظارك في ردهة الاستقبال حاملاً لوحة رقمية باسمك.',
      },
      {
        question: 'How far is Madinah Airport from the Prophet’s Mosque?',
        questionAr: 'كم تبعد المسافة بين مطار المدينة والمسجد النبوي الشريف؟',
        answer:
          'The distance is approximately 20 to 25 km. By private car, the transfer takes only 20 to 30 minutes under normal traffic conditions.',
        answerAr:
          'تبلغ المسافة حوالي 20 إلى 25 كم فقط، وتستغرق الرحلة بالسيارة الخاصة من 20 إلى 30 دقيقة فقط في الظروف المرورية المعتادة.',
      },
      {
        question: 'What happens if our flight lands late at night or gets delayed?',
        questionAr: 'ماذا لو هبطت طائرتنا في وقت متأخر من الليل أو تأخرت الرحلة؟',
        answer:
          'We monitor flight radar continuously. Whether your flight arrives on time, early, or late at night, your chauffeur will be positioned outside arrivals ready to assist you.',
        answerAr:
          'نحن نتابع حركة الرحلات ورادار الطيران باستمرار. وسواء هبطت طائرتكم في موعدها أو تأخرت حتى ساعات الليل المتأخرة، سيكون السائق موجوداً بانتظاركم.',
      },
      {
        question: 'Can the driver take us to hotels on Quba Road or outside the Markaziah?',
        questionAr: 'هل يمكن للسائق توصيلنا إلى فنادق طريق قباء أو خارج المنطقة المركزية؟',
        answer:
          'Yes. We provide transfers to all hotels, apartments, and residences across Madinah, including the Central Markaziah, Quba Road, Sultana, and Al-Awali.',
        answerAr:
          'نعم بالتأكيد. نوفر التوصيل لكافة الفنادق والشقق الفندقية في مختلف أحياء المدينة المنورة، بما في ذلك المركزية، طريق قباء، سلطانة، والعوالي.',
      },
      {
        question: 'Is it easy to book a return transfer from our hotel back to Madinah Airport?',
        questionAr: 'هل يمكن بسهولة حجز رحلة العودة من الفندق إلى مطار المدينة؟',
        answer:
          'Yes. You can book your return transfer anytime via our website or directly through WhatsApp with your booking reference code.',
        answerAr:
          'نعم، يمكنك حجز رحلة العودة في أي وقت عبر الموقع أو مباشرة عبر الواتساب مع رقم الحجز المرجعي الخاص بك.',
      },
    ],
    relatedRouteIds: ['makkah-to-madinah', 'madinah-to-makkah', 'jeddah-to-madinah'],
  },
};
