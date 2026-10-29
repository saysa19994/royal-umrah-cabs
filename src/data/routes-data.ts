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
      'Zero deposit required — cash paid to the driver after journey completion and destination reached (SAR or USD)',
      '5-liter Zamzam containers accommodated securely in trunk',
    ],
    highlightsAr: [
      'فترة انتظار مجانية تمتد من 60 إلى 90 دقيقة بعد هبوط الطائرة [تحت تأكيد المالك]',
      'متابعة حية لرقم الرحلة عبر رادار الطيران للتعامل مع أي تأخير تلقائياً',
      'توصيل مباشر لباب الفندق في المنطقة المركزية، أجياد، والعزيزية',
      'بدون أي دفع مسبق — الدفع نقداً (ريال سعودي أو دولار) مباشرة للسائق عند الوصول إلى فندقك',
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
          'No advance deposit is required to secure your booking. In accordance with our official payment policy, cash is paid to the driver after the journey is completed and the customer reaches the requested destination in Makkah in cash (Saudi Riyals - SAR or US Dollars - USD). We do not accept credit cards, debit cards, POS terminals, online payments, or bank transfers.',
        answerAr:
          'لا نشترط أي دفع مسبق لتأكيد حجزك. وفقاً لسياسة السداد الرسمية، يتم دفع الأجرة نقداً كاش (بالريال السعودي أو الدولار الأمريكي) مباشرة للسائق عند وصولك سالماً إلى فندقك بمكة المكرمة. لا نقبل البطاقات البنكية أو أجهزة نقاط البيع أو الدفع الإلكتروني.',
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
      'All toll fees, fuel, and VAT included in the transparent fixed fare',
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
      'Cash paid to the driver after the journey is completed and destination reached — cash only (SAR or USD), zero advance payment',
    ],
    highlightsAr: [
      'استقبال مباشر من صالة المطار والانطلاق الفوري إلى طريق المدينة السريع',
      'توصيل حتى باب فندقكم في المنطقة المركزية الشمالية أو الجنوبية بالمدينة',
      'حرية التوقف للصلاة وتناول الطعام في أرقى محطات واستراحات ساسكو',
      'بدون أي قيود على وزن أو عدد الحقائب ضمن سعة السيارة المختارة',
      'الدفع عند الوصول نقداً كاش للسائق (ريال سعودي أو دولار) — بدون أي دفع مسبق',
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

  'makkah-to-taif': {
    id: 'makkah-to-taif',
    titleEn: 'Makkah Hotel to Taif (Al Hada & Rose Farms) Private Transfer',
    titleAr: 'توصيل خاص وسائق VIP من مكة المكرمة إلى الطائف وجبال الهدا ومزارع الورد',
    subtitleEn: 'Scenic Mountain Ascent via Al Hada Highway with Family Comfort and Cool Mountain Breezes',
    subtitleAr: 'رحلة جبلية ساحرة عبر عقبة الهدا مع أقصى درجات الراحة العائلية والأجواء المعتدلة',
    distanceKm: 85,
    durationMinutesMin: 75,
    durationMinutesMax: 90,
    highway: 'Route 15 / Al Hada Mountain Highway (Dual Carriageway with Engineered Guardrails)',
    highwayAr: 'طريق عقبة الهدا (طريق 15) - طريق مزدوج حديث ومجهز بحواجز أمان جبلية متطورة',
    lastUpdated: 'October 2026',
    verifiedSource: 'Saudi Transport General Authority (TGA) & Makkah-Taif Intercity Chauffeur Standards',
    verifiedSourceAr: 'الهيئة العامة للنقل (TGA) ومعايير النقل السياحي والجبلي بمكة والطائف',
    descriptionEn:
      'Ascend from the Holy City of Makkah into the refreshing mountainous retreat of Taif, located at over 1,800 meters elevation. Our private chauffeur service picks your family up directly from your Makkah hotel lobby and navigates the scenic curves of the Al Hada highway in climate-controlled luxury, ideal for visiting world-famous rose water distilleries, mountain viewpoints, fruit orchards, and the Taif cable car.',
    descriptionAr:
      'انطلق من رحاب مكة المكرمة صعوداً نحو مصيف الطائف الجبلي البارد على ارتفاع يتجاوز 1800 متر. يوفر لك سائقنا الخاص استقبالاً مباشراً من بهو فندقك في مكة المكرمة لتستمتع برحلة جبلية مريحة وآمنة عبر عقبة الهدا بسيارات حديثة مكيفة بالكامل، لتجربة زيارة مزارع ومصانع الورد الطائفي الشهير، التلفريك، وحدائق الهدا والشفا الخلابة.',
    highlightsEn: [
      'Scenic climb up the dramatic Al Hada Escarpment in luxury air-conditioned SUVs & Vans',
      'Door-to-door pickup from all Makkah central hotels (Ajyad, Clock Tower, Ibrahim Al-Khalil)',
      'Flexible itineraries covering Al Hada viewpoints, rose factories, and Shubra Palace',
      'Professional mountain-certified chauffeurs with safe, smooth driving habits',
      'Cash paid to the driver after journey completion and destination reached (SAR or USD) — zero advance payment',
    ],
    highlightsAr: [
      'صعود جبلي بانورامي سلس عبر عقبة الهدا بسيارات فارهة مكيفة وعائلية',
      'استقبال مباشر من بهو فندقك في مكة (أبراج البيت، أجياد، إبراهيم الخليل، العزيزية)',
      'مرونة في التوقف عند مطلات الهدا، مصانع تقطير الورد، وقصر شبرا التاريخي',
      'سائقون محترفون وذوو خبرة عالية في القيادة الجبلية الآمنة والسلسة',
      'دفع مباشر للسائق عند الوصول نقداً (ريال سعودي أو دولار) دون أي عربون مسبق',
    ],
    terminalNotes: [
      {
        terminal: 'Makkah Central Haram Hotel Lobbies',
        terminalAr: 'ردهات وفنادق المنطقة المركزية بمكة المكرمة',
        meetingPoint: 'Hotel Main Valet Entrance or Designated Concierge Pickup Bay',
        meetingPointAr: 'المدخل الرئيسي للفندق أو منطقة وقوف سيارات الضيوف (فاليه)',
        pickupInstructions:
          'Your chauffeur coordinates with you 30 minutes prior to departure via WhatsApp and parks right in front of your hotel entrance to assist with family baggage.',
        pickupInstructionsAr:
          'يتواصل معك السائق قبل الموعد بـ 30 دقيقة عبر الواتساب ويقف أمام بوابة الفندق مباشرة للمساعدة في نقل الحقائب وصعود العائلة.',
        landmarks: 'Clock Tower Complex, Abraj Al Bait, Ajyad Road, Jabal Omar Hotels',
        landmarksAr: 'مجمع أبراج البيت، وقف الملك عبدالعزيز، طريق أجياد، وفنادق جبل عمر',
      },
    ],
    milestones: [
      {
        title: 'Makkah Departure (Ring Road to Route 15)',
        titleAr: 'الانطلاق من مكة المكرمة (الطريق الدائري نحو طريق 15)',
        desc: 'Departing the central valley towards the eastern exit through Muzdalifah and Arafat plains.',
        descAr: 'الخروج من وادي مكة عبر المخرج الشرقي بمحاذاة مشعري مزدلفة وعرفات.',
      },
      {
        title: 'Al Hada Mountain Road Ascent',
        titleAr: 'صعود عقبة الهدا البانورامية',
        desc: 'Winding scenic climb with spectacular valley vistas, mountain baboon viewing stops, and cool mountain air.',
        descAr: 'صعود جبلي شيق بين القمم الشاهقة مع إطلالات ساحرة على تهامة ونسمات الهواء العليل.',
      },
      {
        title: 'Arrival in Taif & Al Hada District',
        titleAr: 'الوصول إلى منطقة الهدا ومدينة الطائف',
        desc: 'Smooth arrival at your chosen mountain resort, rose farm, or Taif city centre hotel.',
        descAr: 'الوصول بسلامة الله إلى فندقك، المنتجع الجبلي، أو مزارع الورد في الهدا والشفا.',
      },
    ],
    faqs: [
      {
        question: 'How long does the drive from Makkah to Taif take?',
        questionAr: 'كم تستغرق الرحلة بالسيارة من مكة المكرمة إلى الطائف؟',
        answer:
          'The drive typically takes 75 to 90 minutes (approx. 85 km) via the Al Hada mountain highway, depending on traffic and weather conditions.',
        answerAr:
          'تستغرق الرحلة عادة بين 75 إلى 90 دقيقة (حوالي 85 كم) عبر طريق عقبة الهدا السريع، بحسب حركة السير والظروف الجوية.',
      },
      {
        question: 'Can we stop for photos or visit a Taif rose farm along the way?',
        questionAr: 'هل يمكننا التوقف للتصوير أو زيارة مصنع ومزرعة للورد في الطريق؟',
        answer:
          'Yes. Our private chauffeur service is fully dedicated to your party. You can arrange scenic viewing stops or visits to famous rose water distilleries in Al Hada.',
        answerAr:
          'نعم بالتأكيد. سيارتك خاصة بالكامل مع سائقك، ويمكنك التنسيق للتوقف عند المطلات البانورامية أو زيارة معامل تقطير الورد الطائفي الشهيرة بالهدا.',
      },
      {
        question: 'What happens if the Al Hada mountain road is temporarily closed due to rain?',
        questionAr: 'ماذا لو أغلقت عقبة الهدا احترازياً بسبب الأمطار أو الضباب؟',
        answer:
          'During rare mountain weather closures, our chauffeurs seamlessly reroute via the As-Sayl Al-Kabeer Highway (Route 287), ensuring you reach Taif safely with minimal delay.',
        answerAr:
          'في الحالات النادرة التي تغلق فيها العقبة احترازياً لسلامة المسافرين، يسلك السائق طريق السيل الكبير البديل بكل أمان لضمان وصولكم دون تأخير.',
      },
    ],
    relatedRouteIds: ['taif-to-makkah', 'jeddah-to-taif', 'makkah-to-madinah'],
  },

  'taif-to-makkah': {
    id: 'taif-to-makkah',
    titleEn: 'Taif to Makkah Hotel Private Transfer (Via Miqat Qarn al-Manazil)',
    titleAr: 'توصيل خاص من الطائف إلى مكة المكرمة عبر ميقات قرن المنازل (السيل الكبير)',
    subtitleEn: 'Seamless Descent from Taif Mountains to Makkah with Dedicated Miqat Stop for Umrah Ihram',
    subtitleAr: 'انتقال سلس من مرتفعات الطائف إلى مكة المكرمة مع توقف مريح في الميقات للإحرام والعمرة',
    distanceKm: 85,
    durationMinutesMin: 75,
    durationMinutesMax: 90,
    highway: 'Route 15 (Al Hada) or Route 287 (As-Sayl Al-Kabeer Miqat Highway)',
    highwayAr: 'طريق 15 (عقبة الهدا) أو طريق 287 (طريق ميقات السيل الكبير قرن المنازل)',
    lastUpdated: 'October 2026',
    verifiedSource: 'Ministry of Hajj and Umrah Guidelines & Saudi Transport General Authority',
    verifiedSourceAr: 'إرشادات وزارة الحج والعمرة والهيئة العامة للنقل بالمملكة',
    descriptionEn:
      'Travel in utmost peace of mind from Taif to Makkah for Umrah or return travel. For pilgrims intending Umrah from Taif, our chauffeur facilitates a comfortable stop at Miqat Qarn al-Manazil (As-Sayl Al-Kabeer or Wadi Muharram) to perform ghusl, wear the Ihram garments, make the Umrah intention, and proceed directly to the Grand Mosque (Masjid al-Haram) without hurry.',
    descriptionAr:
      'سافر بأقصى درجات الطمأنينة والسكينة من الطائف إلى مكة المكرمة لأداء مناسك العمرة أو العودة. لضيوف الرحمن القادمين من الطائف، يوفر سائقنا الخاص وقتاً كافياً للتوقف في ميقات قرن المنازل (السيل الكبير أو وادي محرم) للاغتسال وارتداء ملابس الإحرام وعقد النية، ثم الانطلاق المباشر إلى باب فندقك بمكة وجوار المسجد الحرام.',
    highlightsEn: [
      'Dedicated 30-45 minute stop at Miqat Qarn al-Manazil for prayer and Ihram preparations',
      'Luggage safely stored and secured in private vehicle during your Miqat stop',
      'Direct drop-off at your Makkah hotel doorstep or Haram access point',
      'Comfortable descending drive with seasoned chauffeurs prioritizing safety and smoothness',
      'No prepayment needed — cash paid to the driver after journey completion and destination reached in Makkah (SAR or USD)',
    ],
    highlightsAr: [
      'توقف مخصص لمدة 30-45 دقيقة في ميقات قرن المنازل للصلاة والاستعداد للإحرام',
      'حقائبك ومقتنياتك محفوظة بأمان تام داخل السيارة الخاصة أثناء وجودك في الميقات',
      'توصيل مباشر لباب فندقك بمكة المكرمة أو أقرب نقطة وصول للمسجد الحرام',
      'نزول جبلي هادئ وآمن مع سائقين ذوي خبرة والتزام تام بالسرعات النظامية',
      'بدون أي دفع مسبق — السداد عند الوصول لمكة المكرمة نقداً كاش (ريال سعودي أو دولار) مباشرة للسائق',
    ],
    terminalNotes: [
      {
        terminal: 'Taif Hotels & Mountain Resorts',
        terminalAr: 'فنادق ومنتجعات مدينة الطائف والهدا والشفا',
        meetingPoint: 'Resort or Hotel Front Lobby Entrance',
        meetingPointAr: 'المدخل الرئيسي للفندق أو المنتجع في الطائف',
        pickupInstructions:
          'Your chauffeur arrives promptly at your requested pickup time and coordinates luggage loading before beginning the drive to Makkah.',
        pickupInstructionsAr:
          'يصل السائق في الموعد المحدد بدقة ويتولى ترتيب وتحميل الحقائب بالكامل قبل بدء الرحلة المباركة نحو مكة المكرمة.',
        landmarks: 'InterContinental Taif, Swiss Blue, Al Hada Resorts, Shafa Valley',
        landmarksAr: 'فندق إنتركونتيننتال الطائف، سويس بلو، منتجعات الهدا، ومنطقة الشفا',
      },
    ],
    milestones: [
      {
        title: 'Taif Departure & Miqat Stop',
        titleAr: 'الانطلاق من الطائف والتوقف في الميقات',
        desc: 'Stopping at Miqat Qarn al-Manazil (As-Sayl Al-Kabeer or Wadi Muharram) for Ihram and Talbiyah.',
        descAr: 'التوقف في ميقات قرن المنازل (السيل الكبير أو وادي محرم) للاغتسال ولبس الإحرام وترديد التلبية.',
      },
      {
        title: 'Highway Journey to Makkah Checkpoint',
        titleAr: 'المسار السريع نحو مدخل مكة ونقطة التفتيش',
        desc: 'Comfortable highway transition with Talbiyah into the Makkah Haram boundary.',
        descAr: 'مواصلة السير بخشوع وترديد التلبية وصولاً لحدود الحرم الشريف ونقطة التفتيش.',
      },
      {
        title: 'Arrival at Makkah Hotel',
        titleAr: 'الوصول إلى باب فندقك في مكة المكرمة',
        desc: 'Doorstep drop-off at your hotel to check in and prepare for your Umrah Tawaf.',
        descAr: 'التوصيل حتى باب الفندق مباشرة لاستلام الغرف والاستعداد لطواف العمرة والسعي.',
      },
    ],
    faqs: [
      {
        question: 'Does the driver wait while we enter Ihram at the Miqat?',
        questionAr: 'هل ينتظر السائق أثناء استعدادنا للإحرام وصلاة ركعتين في الميقات؟',
        answer:
          'Yes, absolutely. The Miqat stop is fully included in the service. Your driver waits patiently while your family uses the facilities, changes into Ihram, and offers prayers.',
        answerAr:
          'نعم بالتأكيد. التوقف في الميقات مشمول بالكامل في الخدمة، وينتظرك السائق بكل أريحية لحين الانتهاء من الاغتسال والصلاة والإحرام.',
      },
      {
        question: 'Which Miqat do we stop at when traveling from Taif to Makkah?',
        questionAr: 'أي ميقات نتوقف عنده عند السفر من الطائف إلى مكة؟',
        answer:
          'Depending on the route taken, we stop at either Qarn al-Manazil (As-Sayl Al-Kabeer) or Wadi Muharram on the Al Hada crest, both of which are the designated Miqat for travelers from Taif and the east.',
        answerAr:
          'حسب المسار المختار، نتوقف في ميقات قرن المنازل (السيل الكبير) أو ميقات وادي محرم أعلى عقبة الهدا، وكلاهما الميقات الشرعي المعتمد للقادمين من الطائف والشرق.',
      },
      {
        question: 'How do we pay for our transfer?',
        questionAr: 'كيف ومتى يتم سداد قيمة الرحلة عند الوصول؟',
        answer:
          'In accordance with our 100% Pay-the-Driver policy, cash is paid to the driver after the journey is completed and the customer reaches the requested destination in Makkah in cash (Saudi Riyals - SAR or US Dollars - USD). We do not require any advance deposit and do not accept credit cards, debit cards, POS machines, or online transactions.',
        answerAr:
          'نعم. وفقاً لسياسة الدفع للسائق 100%، يتم سداد قيمة الرحلة بالكامل نقداً (بالريال السعودي أو الدولار الأمريكي) مباشرة للسائق عند الوصول لمكة المكرمة، دون أي دفع مسبق أو بطاقات بنكية.',
      },
    ],
    relatedRouteIds: ['makkah-to-taif', 'jeddah-to-taif', 'makkah-to-jeddah-airport'],
  },

  'jeddah-to-taif': {
    id: 'jeddah-to-taif',
    titleEn: 'Jeddah Airport (KAIA) to Taif Mountain City VIP Transfer',
    titleAr: 'توصيل مباشر وسائق VIP من مطار جدة (KAIA) إلى مدينة الطائف وجبال الهدا',
    subtitleEn: 'Comfortable Express Chauffeur Transfer from the Red Sea to the Mountain Heights of Taif',
    subtitleAr: 'رحلة سريعة ومريحة بسائق خاص من سواحل البحر الأحمر إلى قمم مرتفعات الطائف',
    distanceKm: 175,
    durationMinutesMin: 120,
    durationMinutesMax: 135,
    highway: 'Route 40 (Haramain Expressway) connected to Route 15 (Al Hada Mountain Road)',
    highwayAr: 'طريق الحرمين السريع (طريق 40) متصلاً بطريق عقبة الهدا (طريق 15)',
    lastUpdated: 'October 2026',
    verifiedSource: 'General Authority of Civil Aviation (GACA) & Taif Tourism Chauffeur Logistics',
    verifiedSourceAr: 'الهيئة العامة للطيران المدني والهيئة العامة للنقل',
    descriptionEn:
      'Arriving at King Abdulaziz International Airport (JED) and heading straight to the pleasant highlands of Taif? Avoid stressful public bus connections or multiple taxi changes. Our chauffeur greets you right at KAIA terminal arrivals with a personalized name card, assists with your heavy baggage, and whisks your family directly up to Taif in a spacious VIP vehicle.',
    descriptionAr:
      'هل هبطت رحلتك في مطار الملك عبدالعزيز الدولي بجدة (KAIA) وترغب بالتوجه مباشرة إلى أجواء الطائف المعتدلة؟ وفر عناء التبديل بين الحافلات أو سيارات الأجرة المتعددة. يستقبلك سائقنا الخاص في صالة الوصول بلوحة ترحيبية باسمك، ويتولى حقائبك بالكامل لتنطلق مع عائلتك مباشرة إلى وجهتك في الطائف بسيارة VIP مريحة.',
    highlightsEn: [
      'Airport Meet & Greet at KAIA Terminal 1 and North Terminal included',
      'Real-time flight radar tracking ensures driver is waiting even if flight is delayed',
      'Direct nonstop transfer from sea level to over 1,800 meters elevation in Taif',
      'Spacious luggage capacity for large family suitcases and travel gear',
      'Zero advance deposit — cash paid to the driver after journey completion and destination reached in Taif',
    ],
    highlightsAr: [
      'استقبال شخصي من صالة الوصول بمطار جدة (الصالة 1 والصالة الشمالية)',
      'تتبع حي للرحلات عبر الرادار لضمان وجود السائق في انتظارك حتى في حال تأخر الطائرة',
      'توصيل مباشر بدون توقف من سواحل جدة حتى مرتفعات الطائف الشاهقة',
      'مساحة واسعة تتسع لحقائب العائلة والأمتعة الكبيرة براحة تامة',
      'صفر عربون أو دفع مسبق — السداد بعد الوصول لفندقك أو منتجعك بالطائف',
    ],
    terminalNotes: [
      {
        terminal: 'King Abdulaziz International Airport (KAIA) Terminal 1',
        terminalAr: 'مطار الملك عبدالعزيز الدولي (KAIA) الصالة 1',
        meetingPoint: 'Arrivals Hall beside the iconic central aquarium',
        meetingPointAr: 'ردهة الوصول بجوار الحوض السمكي الأسطواني الشهير',
        pickupInstructions:
          'After customs clearance, step out into the greeting hall where your private chauffeur holds a digital tablet with your name.',
        pickupInstructionsAr:
          'بعد استلام الحقائب والتفتيش الجمركي، اخرج لردهة الاستقبال لتجد سائقك حاملاً لوحة رقمية باسمك الكريم.',
        landmarks: 'Curbside VIP pickup zone gates 4 and 5',
        landmarksAr: 'مسار الركوب التنفيذي أمام بوابتي 4 و 5',
      },
    ],
    milestones: [
      {
        title: 'Jeddah Airport Pickup',
        titleAr: 'الاستقبال من مطار جدة الدولي',
        desc: 'Meet and greet outside customs and luggage loading into air-conditioned vehicle.',
        descAr: 'الاستقبال بعد الجمارك وتحميل الحقائب داخل السيارة المكيفة الحديثة.',
      },
      {
        title: 'Highway Transit past Makkah Bypass',
        titleAr: 'عبور طريق الحرمين والمسار الالتفافي حول مكة',
        desc: 'Smooth highway cruise transitioning from sea level towards the foothills.',
        descAr: 'رحلة سريعة وسلسة عبر الخط السريع تجاوزاً لوادي مكة نحو السفوح الجبلية.',
      },
      {
        title: 'Al Hada Mountain Ascent to Taif Hotel',
        titleAr: 'صعود عقبة الهدا والوصول لفندقك بالطائف',
        desc: 'Scenic climb through cool mountain air and doorstep drop-off at your Taif accommodation.',
        descAr: 'الصعود الجبلي بين الأجواء العليلة والوصول لباب فندقك أو منتجعك بالطائف.',
      },
    ],
    faqs: [
      {
        question: 'How far is Taif from Jeddah Airport and how long does the drive take?',
        questionAr: 'كم تبعد الطائف عن مطار جدة وكم تستغرق الرحلة بالسيارة؟',
        answer:
          'Taif is approximately 175 km from King Abdulaziz International Airport in Jeddah. In a private chauffeur vehicle, the trip takes about 2 hours to 2 hours and 15 minutes depending on highway traffic.',
        answerAr:
          'تبعد الطائف حوالي 175 كم عن مطار الملك عبدالعزيز بجدة، وتستغرق الرحلة بالسيارة الخاصة نحو ساعتين إلى ساعتين وربع بحسب حركة السير على الطريق السريع.',
      },
      {
        question: 'Will our driver track our flight if our arrival is delayed?',
        questionAr: 'هل يتابع السائق موعد هبوط الطائرة إذا تأخرت الرحلة؟',
        answer:
          'Yes. All airport pickups include automated live flight radar monitoring and 60 minutes of complimentary waiting after your flight actually touches down.',
        answerAr:
          'نعم. تشمل جميع خدمات الاستقبال بالمطار متابعة حية لموعد هبوط الطائرة الفعلي، مع فترة انتظار مجانية تصل إلى 60 دقيقة بعد الهبوط.',
      },
      {
        question: 'Can we stop for coffee or refreshments during the drive to Taif?',
        questionAr: 'هل يمكننا التوقف لشراء القهوة أو المرطبات في الطريق إلى الطائف؟',
        answer:
          'Certainly. Your chauffeur will gladly pull into a well-serviced highway rest stop or scenic mountain viewpoint whenever your family wishes.',
        answerAr:
          'بالتأكيد. يسعد سائقك بالتوقف عند أفضل الاستراحات ومحطات الخدمة النموذجية أو المطلات الجبلية متى رغبتم في ذلك.',
      },
    ],
    relatedRouteIds: ['makkah-to-taif', 'taif-to-makkah', 'jeddah-airport-to-makkah'],
  },

  'riyadh-airport-transfer': {
    id: 'riyadh-airport-transfer',
    titleEn: 'King Khalid International Airport (RUH) to Riyadh Hotels VIP Chauffeur',
    titleAr: 'خدمة سائق VIP وتوصيل من مطار الملك خالد الدولي (RUH) إلى فنادق ومدينة الرياض',
    subtitleEn: 'Punctual Executive Chauffeur Service for Business Travelers, VIP Guests, and Families in Riyadh',
    subtitleAr: 'خدمة استقبال وتنقلات تنفيذية فاخرة لرجال الأعمال وكبار الشخصيات والعائلات في الرياض',
    distanceKm: 45,
    durationMinutesMin: 35,
    durationMinutesMax: 50,
    highway: 'Airport Road / King Salman bin Abdulaziz Road / Northern Ring Road',
    highwayAr: 'طريق المطار السريع - طريق الملك سلمان بن عبدالعزيز - الطريق الدائري الشمالي',
    lastUpdated: 'October 2026',
    verifiedSource: 'Riyadh Airports Company (RAC) & Saudi Transport General Authority (TGA)',
    verifiedSourceAr: 'شركة مطارات الرياض (RAC) والهيئة العامة للنقل',
    descriptionEn:
      'Arrive in Saudi Arabia’s vibrant capital with prestige and zero stress. Our executive chauffeur service at King Khalid International Airport (RUH) covers Terminals 1, 2, 3, 4, and the Private Aviation Terminal. Your chauffeur greets you with a personalized digital sign, manages your luggage with care, and provides smooth, Wi-Fi-equipped transport to the King Abdullah Financial District (KAFD), Olaya, diplomatic quarter, or any luxury hotel across Riyadh.',
    descriptionAr:
      'ابدأ زيارتك للعاصمة السعودية الرياض بكل فخامة وراحة بال. توفر خدمة السائق التنفيذي الخاص بمطار الملك خالد الدولي (RUH) استقبالاً راقياً في الصالات 1 و 2 و 3 و 4 وصالة الطيران الخاص. يرحب بك السائق بلوحة رقمية باسمك، ويتولى حقائبك باهتمام، لتنطلق في رحلة هادئة ومكيفة نحو مركز الملك عبدالله المالي (KAFD)، العليا، الحي الدبلوماسي، أو أي فندق بالرياض.',
    highlightsEn: [
      'Executive airport meet & greet across Terminals 1, 2, 3, 4 and Private Aviation',
      'Flight radar tracking with 60 minutes free waiting after actual wheels-down time',
      'Premium fleet including Toyota Camry Executive, Hyundai Staria VIP, and GMC Yukon XL',
      'Direct hotel lobby drop-off across KAFD, Olaya, Al Faisaliah, and Diplomatic Quarter',
      'Cash paid to the driver after journey completion and destination reached (SAR or USD) — zero advance fees or deposits',
    ],
    highlightsAr: [
      'استقبال تنفيذي من الصالات 1، 2، 3، 4 وصالة الطيران الخاص بمطار الملك خالد',
      'متابعة حية لرادار الرحلات مع 60 دقيقة انتظار مجاني بعد هبوط الطائرة الفعلي',
      'أسطول فاخر يشمل تويوتا كامري، هيونداي ستاريا VIP، وجي إم سي يوكون إكس إل',
      'توصيل مباشر لباب الفندق في كافد (KAFD)، العليا، برج الفيصلية، والحي الدبلوماسي',
      'سداد مباشر للسائق عند الوصول نقداً (ريال سعودي أو دولار) بدون أي رسوم مسبقة',
    ],
    terminalNotes: [
      {
        terminal: 'King Khalid International Airport (RUH) Terminals 1 to 4',
        terminalAr: 'مطار الملك خالد الدولي (RUH) الصالات من 1 إلى 4',
        meetingPoint: 'Arrivals Concourse directly past customs exit gates',
        meetingPointAr: 'ردهة صالة الوصول مباشرة أمام بوابات الخروج الجمركي',
        pickupInstructions:
          'Upon exiting customs, look for your chauffeur holding an electronic tablet displaying your full name or company logo.',
        pickupInstructionsAr:
          'فور خروجك من منطقة الجمارك، ستجد سائقك بانتظارك حاملاً لوحة رقمية باسمك الكريم أو شعار شركتك.',
        landmarks: 'Curbside Executive Pickup Lane outside Arrivals Gate 2 & 3',
        landmarksAr: 'مسار الاستقبال التنفيذي أمام بوابتي الوصول 2 و 3',
      },
    ],
    milestones: [
      {
        title: 'Airport Meet & Greet at RUH',
        titleAr: 'الاستقبال من صالة الوصول بمطار الملك خالد',
        desc: 'Professional greeting, baggage assistance, and escort to your waiting private vehicle.',
        descAr: 'استقبال راقٍ ومساعدة في حمل الحقائب ومرافقتك إلى السيارة الفاخرة المجهزة.',
      },
      {
        title: 'Express Highway Transit to City Center',
        titleAr: 'الانطلاق عبر طريق المطار السريع نحو قلب الرياض',
        desc: 'Smooth highway drive connecting via King Salman Road to northern and central Riyadh business districts.',
        descAr: 'رحلة سريعة عبر طريق الملك سلمان نحو مركز الملك عبدالله المالي ومناطق الأعمال الحيوية.',
      },
      {
        title: 'Hotel Lobby / Office Drop-off',
        titleAr: 'الوصول لباب الفندق أو مقر العمل',
        desc: 'Direct curbside arrival at your hotel or residence with luggage assistance.',
        descAr: 'الوصول مباشرة لمدخل الفندق أو المقر مع إنزال الحقائب بكل عناية.',
      },
    ],
    faqs: [
      {
        question: 'How far is Riyadh city center from King Khalid International Airport (RUH)?',
        questionAr: 'كم تبعد مدينة الرياض ومناطقها الرئيسية عن مطار الملك خالد الدولي؟',
        answer:
          'RUH Airport is located about 35 to 45 km north of central Riyadh. The drive takes approximately 35 to 50 minutes depending on destination district and traffic flow.',
        answerAr:
          'يقع مطار الملك خالد على بعد 35 إلى 45 كم شمال الرياض، وتستغرق الرحلة حوالي 35 إلى 50 دقيقة بحسب الوجهة وحركة المرور في المدينة.',
      },
      {
        question: 'Do you provide airport transfers from the Private Aviation Terminal in Riyadh?',
        questionAr: 'هل توفرون خدمة التوصيل والاستقبال من صالة الطيران الخاص بالرياض؟',
        answer:
          'Yes. We regularly serve VIP and executive flights arriving at the Private Aviation Terminal at RUH with luxury GMC Yukon XL and Mercedes-level comfort.',
        answerAr:
          'نعم. نوفر خدمات الاستقبال لرحلات الطيران الخاص ورجال الأعمال بصالة الطيران الخاص بمطار الملك خالد بسيارات دفع رباعي فاخرة مثل يوكون XL VIP.',
      },
      {
        question: 'What payment methods are accepted and do you provide an official receipt?',
        questionAr: 'ما هي طرق الدفع المعتمدة وهل تقدمون إيصالاً رسمياً معتمداً؟',
        answer:
          'Yes. All trips are settled strictly in cash (Saudi Riyals - SAR or US Dollars - USD) paid to the driver after the journey is completed and the customer reaches the requested destination. We do not accept credit cards, debit cards, POS terminals, online payments, or bank transfers.',
        answerAr:
          'نعم بالتأكيد. جميع السائقين مزودون بأجهزة نقاط بيع بنكية تقبل مدى وفيزا وماستركارد، ويتم إصدار إيصال إلكتروني رسمي وموثق لكافة الرحلات.',
      },
    ],
    relatedRouteIds: ['riyadh-to-makkah', 'riyadh-to-madinah', 'jeddah-airport-to-makkah'],
  },

  'riyadh-to-makkah': {
    id: 'riyadh-to-makkah',
    titleEn: 'Riyadh to Makkah Long-Distance VIP Highway Chauffeur',
    titleAr: 'خدمة نقل وسائق VIP لمسافات طويلة من الرياض إلى مكة المكرمة عبر طريق مكة السريع',
    subtitleEn: 'Door-to-Door Private Chauffeur Across Route 40 for High-End Travelers, Diplomats & VIP Families',
    subtitleAr: 'رحلة برية فاخرة وخاصة بالكامل من باب منزلك بالرياض إلى باب فندقك بمكة المكرمة عبر طريق 40',
    distanceKm: 870,
    durationMinutesMin: 480,
    durationMinutesMax: 540,
    highway: 'Route 40 / Riyadh-Taif-Makkah Expressway (Multi-Lane Grade-A National Highway)',
    highwayAr: 'طريق الرياض - مكة المكرمة السريع (طريق 40) - طريق وطني دولي سريع متعدد المسارات',
    lastUpdated: 'October 2026',
    verifiedSource: 'Ministry of Transport and Logistic Services & Duyuf Alrahman VIP Chauffeur Safety Protocol',
    verifiedSourceAr: 'وزارة النقل والخدمات اللوجستية ومعايير السلامة للرحلات الطويلة',
    descriptionEn:
      'For discerning travelers, diplomats, and VIP families seeking complete door-to-door privacy, avoid airport crowds, flight schedules, and train transfers with our long-distance intercity chauffeur service between Riyadh and Makkah. Travel in late-model GMC Yukon XL SUVs or Hyundai Staria VIP vans equipped with reclining captain chairs, dual climate control, tinted privacy glass, and curated prayer and rest stops along Route 40.',
    descriptionAr:
      'لكبار الشخصيات والدبلوماسيين والعائلات الباحثة عن الخصوصية التامة وتجنب عناء وتوقيتات المطارات ورحلات القطار، نقدم خدمة السائق الخاص لمسافات طويلة بين الرياض ومكة المكرمة. سافر في أحدث سيارات جي إم سي يوكون إكس إل أو هيونداي ستاريا VIP المزودة بمقاعد كابتن وثير قابلة للإمالة، تكييف متطور، وزجاج معتم للخصوصية، مع التوقف المريح للصلاة والوجبات في أفضل المحطات النموذجية على طريق 40.',
    highlightsEn: [
      'Direct doorstep pickup in Riyadh and hotel doorstep arrival in Makkah without luggage transfer',
      'Luxury long-haul vehicles with premium reclining seating, USB ports, and acoustic insulation',
      'Curated stops at top-rated SASCO Palm service stations for prayer, meals, and coffee',
      'Dedicated stop at Miqat (Qarn al-Manazil / As-Sayl Al-Kabeer) for Umrah Ihram preparations',
      'Strict Pay-the-Driver policy: cash paid to the driver after the journey is completed and destination reached in Makkah (SAR or USD)',
    ],
    highlightsAr: [
      'استقبال مباشر من باب منزلك أو قصرك بالرياض والتوصيل حتى باب فندقك بمكة دون نقل الأمتعة',
      'سيارات فاخرة مجهزة للمسافات الطويلة بمقاعد مريحة وعزل صوتي ومنافذ شحن متعددة',
      'توقفات مريحة في محطات ساسكو بالم النموذجية لأداء الصلوات وتناول الوجبات والقهوة',
      'توقف مخصص في ميقات قرن المنازل (السيل الكبير) للاغتسال ولبس الإحرام لضيوف الرحمن',
      'سياسة دفع آمنة 100%: السداد بالكامل للسائق عند الوصول إلى مكة نقداً كاش (ريال سعودي أو دولار)',
    ],
    terminalNotes: [
      {
        terminal: 'Riyadh Residences, Diplomatic Quarter & Luxury Hotels',
        terminalAr: 'منازل وفنادق وقصور الرياض والحي الدبلوماسي',
        meetingPoint: 'Private Residence Gate or Hotel Valet Entrance',
        meetingPointAr: 'بوابة المنزل الخاصة أو مدخل الفندق الرئيسي بالرياض',
        pickupInstructions:
          'Your executive chauffeur arrives 20 minutes prior to scheduled departure, meticulously packs your luggage into the vehicle, and ensures full comfort before departure.',
        pickupInstructionsAr:
          'يصل السائق التنفيذي قبل الموعد بـ 20 دقيقة، ويتولى ترتيب الحقائب داخل السيارة بدقة والتأكد من جاهزية كافة سبل الراحة قبل بدء الرحلة.',
        landmarks: 'Al Hada District, Diplomatic Quarter, Al Nakheel, Hittin, Olaya',
        landmarksAr: 'حي الهدا، الحي الدبلوماسي، النخيل، حطين، والعليا بالرياض',
      },
    ],
    milestones: [
      {
        title: 'Riyadh Departure via Route 40 West',
        titleAr: 'الانطلاق من الرياض غرباً عبر طريق 40',
        desc: 'Departing the capital through the Tuwaiq escarpment onto the high-speed desert expressway.',
        descAr: 'الخروج من العاصمة عبر جبال طويق والانطلاق على الطريق السريع المعبد وفق أعلى المعايير.',
      },
      {
        title: 'Midway Prayer & Refreshment Stop',
        titleAr: 'استراحة منتصف الطريق للصلاة وتناول الطعام',
        desc: 'Stopping at premium SASCO Palm rest stops (Al Quwayiyah / Halaban) for clean amenities.',
        descAr: 'التوقف في محطات ساسكو بالم الحديثة (القويعية / حلبان) لمرافق نظيفة وطعام طازج وقهوة.',
      },
      {
        title: 'Miqat Stop & Makkah Hotel Arrival',
        titleAr: 'التوقف في الميقات والوصول لفندق مكة',
        desc: 'Stop at Miqat Qarn al-Manazil for Ihram, followed by doorstep arrival at your Makkah hotel.',
        descAr: 'التوقف في ميقات قرن المنازل للإحرام، ثم الوصول المباشر لباب فندقك بجوار الحرم المكي.',
      },
    ],
    faqs: [
      {
        question: 'How long does the private highway drive from Riyadh to Makkah take?',
        questionAr: 'كم تستغرق الرحلة بالسيارة الخاصة والسائق من الرياض إلى مكة المكرمة؟',
        answer:
          'The 870 km highway drive typically takes 8 to 9 hours, including 2 to 3 comfortable stops for prayers, meals, and fuel.',
        answerAr:
          'تستغرق الرحلة البالغة 870 كم ما بين 8 إلى 9 ساعات تقريباً، ويتخللها 2 إلى 3 توقفات مريحة لأداء الصلوات وتناول الطعام والراحة.',
      },
      {
        question: 'Can the driver stop at the Miqat before entering Makkah for Umrah?',
        questionAr: 'هل يتوقف السائق في الميقات للإحرام قبل دخول مكة المكرمة؟',
        answer:
          'Yes, absolutely. The route passes directly near Miqat Qarn al-Manazil (As-Sayl Al-Kabeer). Your chauffeur stops there for 30 to 45 minutes so you can enter Ihram with complete ease.',
        answerAr:
          'نعم بالتأكيد. يمر المسار بميقات قرن المنازل (السيل الكبير)، ويتوقف السائق لمدة كافية تتيح لك الاغتسال وارتداء ملابس الإحرام وعقد النية بكل طمأنينة.',
      },
      {
        question: 'Do we need to pay anything in advance for this long-distance journey?',
        questionAr: 'هل يلزم دفع أي عربون أو مبلغ مسبق لهذه الرحلة الطويلة؟',
        answer:
          'No advance payment or deposit is required. You pay the full fixed fare directly in cash (SAR or USD) to your private chauffeur upon arriving at your destination in Makkah.',
        answerAr:
          'لا يتطلب الحجز أي عربون أو دفع مسبق. يتم سداد المبلغ الثابت المتفق عليه بالكامل مباشرة لسائقك الخاص عند الوصول بسلامة الله إلى وجهتك في مكة.',
      },
    ],
    relatedRouteIds: ['riyadh-to-madinah', 'riyadh-airport-transfer', 'makkah-to-taif'],
  },

  'riyadh-to-madinah': {
    id: 'riyadh-to-madinah',
    titleEn: 'Riyadh to Madinah Long-Distance VIP Highway Chauffeur',
    titleAr: 'خدمة نقل وسائق VIP لمسافات طويلة من الرياض إلى المدينة المنورة عبر طريق القصيم - المدينة',
    subtitleEn: 'Comfortable VIP Highway Travel Across Central Arabia Directly to the Prophet’s Mosque',
    subtitleAr: 'رحلة برية فاخرة عبر وسط المملكة من الرياض مباشرة إلى جوار المسجد النبوي الشريف',
    distanceKm: 840,
    durationMinutesMin: 480,
    durationMinutesMax: 540,
    highway: 'Route 65 (Riyadh-Qassim) & Route 60 (Qassim-Madinah Expressway)',
    highwayAr: 'طريق الرياض - القصيم السريع (طريق 65) وطريق القصيم - المدينة المنورة (طريق 60)',
    lastUpdated: 'October 2026',
    verifiedSource: 'Ministry of Transport and Logistic Services & Royal Chauffeur Safety Guidelines',
    verifiedSourceAr: 'وزارة النقل والخدمات اللوجستية وإرشادات السلامة للمسافات الطويلة',
    descriptionEn:
      'Experience unmatched tranquility traveling from Riyadh directly to Al-Madinah Al-Munawwarah in the luxury of your own private VIP vehicle. Avoid airport delays and rigid public schedules with a dedicated chauffeur at your service throughout the 840-kilometer modern highway journey across the Qassim region, arriving directly at your hotel doorstep in Madinah’s Central Markaziah.',
    descriptionAr:
      'عش تجربة سفر استثنائية تسودها السكينة والراحة من الرياض مباشرة إلى المدينة المنورة في سيارتك الخاصة الفارهة. تجنب انتظار الرحلات الجوية وجداول النقل الصارمة مع سائق خاص مكرس لخدمتك طوال مسار الرحلة الحديث عبر منطقة القصيم (840 كم)، لتصل بسلامة الله مباشرة إلى باب فندقك في المنطقة المركزية بجوار المسجد النبوي.',
    highlightsEn: [
      'Private long-haul executive transfer connecting Riyadh directly to Madinah hotel lobbies',
      'Smooth cruise along grade-A expressways (Route 65 and Route 60) with zero transfers',
      'Comfortable stops at modern rest stations (SASCO) for prayer, coffee, and dining',
      'Spacious luggage capacity for all family bags, mobility aids, and purchases',
      'Zero advance deposit — pay in full upon arriving at your Madinah hotel in cash (SAR or USD)',
    ],
    highlightsAr: [
      'نقل تنفيذي خاص لمسافات طويلة يربط الرياض مباشرة بردهات فنادق المدينة المنورة',
      'سير مريح وسلس عبر الطرق السريعة الحديثة (طريق 65 وطريق 60) دون أي تبديل للسيارات',
      'استراحات مريحة في محطات الخدمة الحديثة (ساسكو) للصلاة وتناول الطعام والقهوة',
      'مساحة تخزين رحبة تتسع لكافة حقائب العائلة والأجهزة المساعدة والمشتريات',
      'بدون أي دفع مسبق — السداد بالكامل عند الوصول لفندقك بالمدينة نقداً كاش (ريال أو دولار)',
    ],
    terminalNotes: [
      {
        terminal: 'Riyadh Pickups (All Neighborhoods)',
        terminalAr: 'كافة أحياء وفنادق ومنازل مدينة الرياض',
        meetingPoint: 'Customer Residence Gate or Hotel Main Entrance',
        meetingPointAr: 'بوابة المنزل أو المدخل الرئيسي للفندق بالرياض',
        pickupInstructions:
          'Your chauffeur arrives at the specified pickup time, assists with loading all luggage, and ensures vehicle temperature and seating are optimal before departure.',
        pickupInstructionsAr:
          'يصل سائقك في الموعد المحدد، ويساعد في تحميل الحقائب وضبط درجة حرارة التكييف والمقاعد لضمان أقصى درجات الراحة طوال الطريق.',
        landmarks: 'Northern Riyadh, KAFD, Olaya, Al Malqa, Al Yasmin',
        landmarksAr: 'شمال الرياض، مركز الملك عبدالله المالي، العليا، الملقا، والياسمين',
      },
    ],
    milestones: [
      {
        title: 'Riyadh Departure via Route 65 North',
        titleAr: 'الانطلاق من الرياض شمالاً عبر طريق 65',
        desc: 'Smooth highway cruise towards Al-Majmaah and the Qassim region.',
        descAr: 'رحلة سريعة وسلسة عبر طريق القصيم السريع مروراً بالمجمعة.',
      },
      {
        title: 'Transition to Route 60 towards Madinah',
        titleAr: 'الانتقال إلى طريق 60 السريع نحو المدينة المنورة',
        desc: 'Scenic open desert and volcanic plains leading westward towards the Prophet’s City.',
        descAr: 'سير مريح عبر طريق القصيم - المدينة السريع عبر هضاب نجد وصولاً لمشارف الحجاز.',
      },
      {
        title: 'Arrival in Madinah Al-Munawwarah',
        titleAr: 'الوصول إلى رحاب المدينة المنورة',
        desc: 'Direct hotel drop-off in the Central Markaziah surrounding the Prophet’s Mosque.',
        descAr: 'الوصول لباب فندقك في المنطقة المركزية بالقرب من المسجد النبوي الشريف.',
      },
    ],
    faqs: [
      {
        question: 'How long does the private drive from Riyadh to Madinah take?',
        questionAr: 'كم تستغرق الرحلة بالسيارة الخاصة من الرياض إلى المدينة المنورة؟',
        answer:
          'The 840 km highway drive takes approximately 8 to 9 hours, including convenient prayer and meal breaks at modern service stations along the way.',
        answerAr:
          'تستغرق الرحلة البالغة 840 كم نحو 8 إلى 9 ساعات بالسيارة الخاصة، ويتخللها توقفات مريحة للصلوات والوجبات في محطات الخدمة الحديثة.',
      },
      {
        question: 'What vehicle is recommended for the Riyadh to Madinah journey?',
        questionAr: 'ما هي السيارة الموصى بها لرحلة الرياض إلى المدينة المنورة؟',
        answer:
          'For maximum comfort over long distances, we strongly recommend the GMC Yukon XL (luxury SUV) or Hyundai Staria VIP (luxury van with captain chairs). Both offer superior legroom, whisper-quiet cabin acoustics, and generous luggage capacity.',
        answerAr:
          'لضمان أقصى درجات الراحة في المسافات الطويلة، نوصي بشدة بسيارة جي إم سي يوكون إكس إل (SUV فاخر) أو هيونداي ستاريا VIP (فان فاخر بمقاعد كابتن)، حيث توفران مساحة رحبة للأرجل وعزلاً صوتياً ممتازاً ومساحة واسعة للحقائب.',
      },
      {
        question: 'Can the driver take us directly to our hotel near the Prophet’s Mosque?',
        questionAr: 'هل يوصلنا السائق مباشرة إلى باب فندقنا بالمنطقة المركزية بالمدينة؟',
        answer:
          'Yes. Our chauffeurs take you directly to your hotel entrance in the Northern or Southern Markaziah, assist with all your luggage, and ensure a seamless check-in experience.',
        answerAr:
          'نعم بالتأكيد. يتولى السائق توصيلكم مباشرة لمدخل فندقكم في المركزية الشمالية أو الجنوبية بجوار المسجد النبوي مع مساعدة كاملة في إنزال الحقائب.',
      },
    ],
    relatedRouteIds: ['riyadh-to-makkah', 'riyadh-airport-transfer', 'makkah-to-madinah'],
  },
};
