export interface ZiyaratSite {
  slug: string;
  city: 'makkah' | 'madinah';
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  metaDescEn: string;
  metaDescAr: string;
  answerFirstEn: string;
  answerFirstAr: string;
  historyEn: string;
  historyAr: string;
  historySourceEn: string;
  historySourceAr: string;
  etiquetteEn: string[];
  etiquetteAr: string[];
  bestTimeEn: string;
  bestTimeAr: string;
  accessibilityEn: string;
  accessibilityAr: string;
  walkingEffortEn: 'Minimal (Vehicle Stop)' | 'Moderate (Flat Walk)' | 'Strenuous (Mountain Climb)';
  walkingEffortAr: 'يسير جداً (توقف سيارة)' | 'متوسط (مشي مستوٍ)' | 'شاق (صعود جبلي)';
  typicalDurationEn: string;
  typicalDurationAr: string;
  distanceFromHaramEn: string;
  distanceFromHaramAr: string;
  carInstructionsEn: string;
  carInstructionsAr: string;
  lat: number;
  lng: number;
  image: string;
  faqsEn: { q: string; a: string }[];
  faqsAr: { q: string; a: string }[];
  relatedTours: string[];
}

export interface ZiyaratTour {
  slug: string;
  city: 'makkah' | 'madinah';
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  metaDescEn: string;
  metaDescAr: string;
  durationEn: string;
  durationAr: string;
  basePriceSAR: {
    camry: number;
    staria: number;
    yukon: number;
    hiace: number;
    coaster: number;
  };
  itineraryEn: { stop: string; duration: string; description: string }[];
  itineraryAr: { stop: string; duration: string; description: string }[];
  includedEn: string[];
  includedAr: string[];
  notIncludedEn: string[];
  notIncludedAr: string[];
  cancellationPolicyEn: string;
  cancellationPolicyAr: string;
  faqsEn: { q: string; a: string }[];
  faqsAr: { q: string; a: string }[];
}

export interface ZiyaratGuide {
  slug: string;
  titleEn: string;
  titleAr: string;
  metaDescEn: string;
  metaDescAr: string;
  summaryEn: string;
  summaryAr: string;
  lastUpdated: string;
  contentEn: string[];
  contentAr: string[];
}

export const ZIYARAT_SITES: Record<string, ZiyaratSite> = {
  'cave-hira': {
    slug: 'cave-hira',
    city: 'makkah',
    titleEn: 'Cave Hira & Jabal al-Noor Private Car Visit',
    titleAr: 'زيارة غار حراء وجبل النور بسيارة خاصة مع سائق',
    subtitleEn: 'Comfortable chauffeur drop-off at Hira Cultural District foot with return pickup',
    subtitleAr: 'توصيل مريح إلى سفح جبل النور والحي الثقافي مع انتظار السائق لرحلة العودة',
    metaDescEn: 'Visit Cave Hira & Jabal al-Noor in Makkah with a private car & chauffeur. Practical climbing tips, opening hours, Hira Cultural District drop-off.',
    metaDescAr: 'دليل زيارة غار حراء وجبل النور بمكة المكرمة بسيارة خاصة. نصائح الصعود، مواعيد الزيارة، النقل إلى الحي الثقافي وتجنب المشقة.',
    answerFirstEn: 'Cave Hira is situated near the summit of Jabal al-Noor, approximately 5 km northeast of the Grand Mosque (Masjid al-Haram). While reaching the cave opening requires climbing roughly 1,200 paved stone steps (taking 45 to 90 minutes), the newly opened Hira Cultural District at the base offers panoramic viewing plazas, museum galleries, and comfortable air-conditioned drop-off points for private vehicles.',
    answerFirstAr: 'يقع غار حراء في أعلى جبل النور على بعد نحو 5 كيلومترات شمال شرق المسجد الحرام. يتطلب الوصول إلى فتحة الغار صعود قرابة 1200 درجة حجرية ممهدة (تستغرق بين 45 إلى 90 دقيقة)، بينما يوفر حي حراء الثقافي في أسفل الجبل ساحات مكيفة ومعارض تعريفية ونقطة وصول مباشرة ومريحة لسيارات النقل الخاص.',
    historyEn: 'Cave Hira is the revered sanctuary where Prophet Muhammad (peace be upon him) engaged in contemplation prior to receiving the first revelations of the Holy Quran through the Archangel Gabriel (Jibril), beginning with Surah Al-Alaq. [Drafted for scholarly & historical verification; sourced from Sahih al-Bukhari, Hadith 3].',
    historyAr: 'غار حراء هو الغار المبارك الذي كان يتحنث فيه النبي محمد ﷺ قبل البعثة، وفيه نزل عليه الوحي جبريل عليه السلام بأول آيات القرآن الكريم: ﴿اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ﴾. [نص أولي معد برسم المراجعة التاريخية والشرعية؛ مستند إلى صحيح البخاري، الحديث رقم 3].',
    historySourceEn: 'Sahih al-Bukhari (Kitab Bad al-Wahy), Ibn Hisham (As-Seerah an-Nabawiyyah).',
    historySourceAr: 'صحيح البخاري (كتاب بدء الوحي)، سيرة ابن هشام.',
    etiquetteEn: [
      'Maintain solemn respect and avoid rushing on the stone staircase.',
      'Carry adequate drinking water; hydration is critical in Makkah temperatures.',
      'Wear sturdy walking shoes with firm rubber traction for the mountain ascent.',
      'Please do not mark rocks or leave litter on the mountain pathways.',
    ],
    etiquetteAr: [
      'التزام السكينة والوقار التام وتجنب التدافع على درجات الجبل.',
      'التزود بكميات كافية من مياه الشرب لتفادي الجفاف في أجواء مكة.',
      'ارتداء حذاء مشي مريح ومناسب للمناطق الجبلية الوعرة.',
      'المحافظة على نظافة المكان وتجنب ترك أي مخلفات على سفح الجبل.',
    ],
    bestTimeEn: 'Early morning immediately following Fajr prayer (before sunrise heat) or late afternoon after Asr.',
    bestTimeAr: 'الصباح الباكر مباشرة بعد صلاة الفجر (قبل اشتداد حرارة الشمس) أو بعد صلاة العصر.',
    accessibilityEn: 'The mountain summit requires strenuous uphill walking and is unsuitable for wheelchairs or strollers. However, elderly guests can comfortably enjoy the lower Hira Cultural District visitor center and view the mountain from the vehicle.',
    accessibilityAr: 'قمة الجبل تتطلب جهداً بدنياً عالياً ولا تناسب الكراسي المتحركة أو عربات الأطفال، ولكن يمكن لكبار السن الاستمتاع بزيارة مركز حي حراء الثقافي في الأسفل ورؤية الجبل من الساحات المكيفة.',
    walkingEffortEn: 'Strenuous (Mountain Climb)',
    walkingEffortAr: 'شاق (صعود جبلي)',
    typicalDurationEn: '2.5 to 3.5 hours for full climb; 45 minutes for base visit & Cultural District.',
    typicalDurationAr: 'ساعتان ونصف إلى ثلاث ساعات ونصف للصعود الكامل؛ 45 دقيقة لزيارة الحي الثقافي بالأسفل.',
    distanceFromHaramEn: '5.2 km (approx. 15-20 minutes by private car outside peak traffic).',
    distanceFromHaramAr: '5.2 كم (حوالي 15-20 دقيقة بالسيارة الخاصة خارج أوقات الذروة).',
    carInstructionsEn: 'Your private chauffeur picks you up from your hotel lobby in Makkah, drives directly to the dedicated Hira parking zone, and remains on standby in the air-conditioned vehicle or arrives at a coordinated pickup point via WhatsApp once you descend.',
    carInstructionsAr: 'يقوم سائقك الخاص بنقلك مباشرة من بهو فندقك بمكة إلى نقطة الوقوف المخصصة في سفح الجبل، وينتظرك في سيارة مكيفة أو يلتقي بك عند نقطة التجمع فور نزولك بالتنسيق عبر الواتساب.',
    lat: 21.4578,
    lng: 39.8592,
    image: '/assets/images/staria_exterior.webp',
    faqsEn: [
      {
        q: 'Is there a cable car (teleferik) to Cave Hira?',
        a: 'The Royal Commission for Makkah City is developing modern transit options, but physical climbing via stone steps remains the primary route to the cave itself. Check the Hira Cultural District entrance for latest site status.',
      },
      {
        q: 'Can elderly pilgrims visit Cave Hira?',
        a: 'Ascending the summit is physically strenuous for elderly guests. We recommend visiting the Hira Cultural District at the foot of the mountain, which is fully accessible and wheelchair-friendly.',
      },
      {
        q: 'How does the chauffeur wait during our climb?',
        a: 'Our chauffeur parks safely in designated parking and monitors your progress via WhatsApp messaging so your vehicle is ready the moment you return to the base.',
      },
    ],
    faqsAr: [
      {
        q: 'هل يوجد تلفريك إلى غار حراء حالياً؟',
        a: 'تعمل الهيئة الملكية لمدينة مكة المكرمة على تطوير وسائل نقل حديثة، إلا أن الصعود عبر الدرج الحجري الممهد هو الطريقة المتاحة حالياً للوصول للغار نفسه. يرجى مراجعة إدارة حي حراء الثقافي لمعرفة آخر التحديثات.',
      },
      {
        q: 'هل يستطيع كبار السن زيارة غار حراء؟',
        a: 'صعود قمة الجبل شاق بدنياً على كبار السن. نوصي بالاكتفاء بزيارة ساحات حي حراء الثقافي في أسفل الجبل، المجهزة بالكامل لاستقبال الكراسي المتحركة.',
      },
      {
        q: 'أين ينتظرنا السائق أثناء صعود الجبل؟',
        a: 'ينتظركم السائق في المواقف المخصصة مع إبقاء التكييف جاهزاً، ويتم التواصل معه عبر الواتساب ليكون في استقبالكم فور نزولكم.',
      },
    ],
    relatedTours: ['makkah-half-day', 'custom-hourly'],
  },

  'jabal-thawr': {
    slug: 'jabal-thawr',
    city: 'makkah',
    titleEn: 'Mount Thawr (Ghar Thawr) Private Chauffeur Visit',
    titleAr: 'زيارة جبل ثور (غار ثور) بسيارة خاصة مع سائق',
    subtitleEn: 'Historic mountain sanctuary of the Hijrah migration located south of Makkah',
    subtitleAr: 'المعلم التاريخي الخالد لهجرة المصطفى ﷺ جنوب مكة المكرمة',
    metaDescEn: 'Private chauffeur visit to Mount Thawr in Makkah. Historical background of the Hijrah migration, vehicle observation stops, and climbing advisory.',
    metaDescAr: 'زيارة جبل ثور وغار ثور في مكة بسيارة خاصة. نبذة تاريخية عن رحلة الهجرة النبوية، مواقف السيارات، ونصائح الراحة والمشاهدة.',
    answerFirstEn: 'Mount Thawr (Jabal Thawr) is situated approximately 8 km south of the Grand Mosque in Makkah. It stands over 750 meters above sea level and houses the cave where Prophet Muhammad (PBUH) and Abu Bakr as-Siddiq (may Allah be pleased with him) took refuge during the Hijrah to Madinah. Most private tours feature a dedicated vehicular viewing stop at the mountain foot, as the 2-hour rocky ascent is exceptionally demanding.',
    answerFirstAr: 'يقع جبل ثور على بعد نحو 8 كيلومترات جنوب المسجد الحرام بارتفاع يتجاوز 750 متراً فوق سطح البحر. ويضم الغار التاريخي الذي أوى إليه النبي ﷺ وصاحبه أبو بكر الصديق رضي الله عنه أثناء الهجرة النبوية الشريفة إلى المدينة. تقتصر أغلب الجولات الخاصة على التوقف في ساحة المشاهدة أسفل الجبل نظراً لصعوبة التسلق التي تستغرق أكثر من ساعتين.',
    historyEn: 'During the migration from Makkah to Yathrib (Madinah), the Prophet (PBUH) and Abu Bakr sheltered in Ghar Thawr for three nights while the Quraysh trackers searched the surrounds, an event referenced in Surah At-Tawbah (9:40). [Drafted for scholarly review; sourced from Sahih al-Bukhari 3653].',
    historyAr: 'أثناء رحلة الهجرة النبوية من مكة إلى المدينة، مكث النبي ﷺ وصديقه أبو بكر الصديق في غار ثور ثلاث ليالٍ بينما كانت قريش تبحث عنهم، وهو الموقف المخلد في القرآن الكريم في سورة التوبة: ﴿إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا﴾. [مسودة خاضعة للمراجعة الشرعية؛ مستند إلى صحيح البخاري، حديث 3653].',
    historySourceEn: 'Holy Quran (9:40), Sahih al-Bukhari, Ibn Kathir (Al-Bidayah wan-Nihayah).',
    historySourceAr: 'القرآن الكريم (التوبة: 40)، صحيح البخاري، البداية والنهاية لابن كثير.',
    etiquetteEn: [
      'Reflect respectfully upon the sacrifices of the Prophet (PBUH) and his companions.',
      'Climbing the summit is arduous; please do not attempt without guides and ample water.',
      'Keep the natural landscape pristine and adhere to local municipal guidelines.',
    ],
    etiquetteAr: [
      'استشعار عظمة التضحيات في سيرة النبي ﷺ وصحابته الكرام.',
      'تسلق الجبل شاق ووعر جداً؛ لا يُنصح به لغير المتمرسين.',
      'المحافظة التامة على البيئة الجبلية الطبيعية ونظافتها.',
    ],
    bestTimeEn: 'Morning hours from 6:30 AM to 9:30 AM for clear visibility and photography.',
    bestTimeAr: 'ساعات الصباح بين 6:30 و 9:30 صباحاً لصفاء الرؤية واعتدال الجو.',
    accessibilityEn: 'Vehicle viewing plaza at the base is fully accessible to all ages and mobility levels. Mountain trail is non-accessible.',
    accessibilityAr: 'ساحة المشاهدة والوقوف عند سفح الجبل ممهدة ومناسبة لجميع الفئات وكبار السن. مسار الصعود غير ممهد.',
    walkingEffortEn: 'Minimal (Vehicle Stop)',
    walkingEffortAr: 'يسير جداً (توقف سيارة)',
    typicalDurationEn: '25-40 minutes for base stop, photos, and historical overview.',
    typicalDurationAr: '25 إلى 40 دقيقة للتوقف والتقاط الصور والاستماع للشرح التاريخي.',
    distanceFromHaramEn: '8.4 km (approx. 20-25 minutes by private car).',
    distanceFromHaramAr: '8.4 كم (حوالي 20-25 دقيقة بالسيارة الخاصة).',
    carInstructionsEn: 'Your chauffeur navigates to the south Makkah viewing esplanade, parks safely, and explains the vantage points while you observe the historic peak in peace.',
    carInstructionsAr: 'يقوم السائق بالتوجه إلى ساحة المشاهدة جنوب مكة، ويوقف السيارة في مكان آمن ومظلل لتتمكنوا من تأمل المعلم والتقاط الصور بكل هدوء.',
    lat: 21.3775,
    lng: 39.8503,
    image: '/assets/images/yukon_exterior.webp',
    faqsEn: [
      {
        q: 'Do your drivers climb the mountain with passengers?',
        a: 'Our service provides private chauffeur transport with vehicle standby at the base. Chauffeurs do not lead mountain climbing expeditions.',
      },
      {
        q: 'Can we take clear photos of the cave from the ground?',
        a: 'The cave opening is high near the summit, but the mountain outline and historic ridges are clearly visible from our selected viewing points.',
      },
    ],
    faqsAr: [
      {
        q: 'هل يصعد السائق الجبل مع الركاب؟',
        a: 'خدمتنا تقتصر على النقل الخاص والتوصيل والانتظار بالسيارة المكيفة في الأسفل؛ سائقونا لا يقودون رحلات تسلق جبلية.',
      },
      {
        q: 'هل يمكن رؤية الغار بوضوح من الأسفل؟',
        a: 'فتحة الغار تقع قرب القمة، ولكن معالم الجبل وقمته التاريخية واضحة تماماً من نقاط المشاهدة المعتمدة لدينا.',
      },
    ],
    relatedTours: ['makkah-half-day', 'custom-hourly'],
  },

  'mina': {
    slug: 'mina',
    city: 'makkah',
    titleEn: 'Mina & Jamarat Historic Pilgrimage Sites Transfer',
    titleAr: 'زيارة مشعر منى ومنشأة الجمرات التاريخية بسيارة خاصة',
    subtitleEn: 'Scenic drive through the Tent City of Mina, Masjid al-Khayf, and Jamarat Landmark',
    subtitleAr: 'جولة بالسيارة عبر مشعر منى، مسجد الخيف، ومعلم الجمرات التاريخي',
    metaDescEn: 'Explore Mina, Masjid al-Khayf, and Jamarat outside Hajj season with a private chauffeur. Vehicle access rules, historical context, and comfort.',
    metaDescAr: 'جولة بالسيارة الخاصة في مشعر منى ومسجد الخيف ومنشأة الجمرات خارج موسم الحج. معلومات تاريخية وخط السير مع سائق خاص.',
    answerFirstEn: 'Mina is an open valley located roughly 8 km east of the Grand Mosque. Outside the annual 5-day Hajj pilgrimage season, passenger vehicles can drive directly through the majestic tent city highways, stopping for exterior viewing and photography at Masjid al-Khayf and the world-renowned multi-level Jamarat Bridge structure.',
    answerFirstAr: 'منى وادٍ محاط بالجبال يقع على بعد قرابة 8 كم شرق المسجد الحرام. وخارج أيام الحج السنوية، يُتاح للسيارات الخاصة المرور عبر طرق المشعر ومخيماته ومشاهدة مسجد الخيف التاريخي ومنشأة الجمرات الضخمة بكل سهولة وراحة.',
    historyEn: 'Mina is the historic ground where Prophet Ibrahim (peace be upon him) commemorated divine devotion through stoning the symbols of temptation and offering sacrifice. Prophet Muhammad (PBUH) camped here during Hajj and delivered sermons at Masjid al-Khayf. [Drafted for historical review].',
    historyAr: 'مشعر منى هو الموضع التاريخي الذي ارتبط بسيدنا إبراهيم عليه السلام في رمي الجمرات والفداء، ونزل فيه النبي ﷺ في حجة الوداع وصلى في مسجد الخيف حيث صلى قبله سبعون نبياً. [مسودة خاضعة للمراجعة التاريخية والشرعية].',
    historySourceEn: 'Sahih Muslim, Sunan at-Tirmidhi (Hadith 877 on Masjid al-Khayf), Ibn Kathir.',
    historySourceAr: 'صحيح مسلم، سنن الترمذي (حديث 877 في فضل مسجد الخيف)، تفسير ابن كثير.',
    etiquetteEn: [
      'Please note that Mina interior tent camps are closed outside the Hajj season; viewing is conducted along public expressways.',
      'Masjid al-Khayf is typically open for prayers only during Hajj; exterior viewing is standard throughout the rest of the year.',
    ],
    etiquetteAr: [
      'يرجى ملاحظة أن مخيمات منى تكون مغلقة خارج موسم الحج؛ والجولة تتم عبر الطرق والمسارات المفتوحة.',
      'مسجد الخيف يفتح أبوابه للمصلين خلال موسم الحج، وتقتصر الزيارة بقية العام على المشاهدة من الخارج.',
    ],
    bestTimeEn: 'Morning (8:00 AM - 11:00 AM) or afternoon (3:30 PM - 5:30 PM) for tranquil driving.',
    bestTimeAr: 'الفترة الصباحية (8:00 - 11:00 صباحاً) أو العصر (3:30 - 5:30 مساءً) لانسيابية الحركة.',
    accessibilityEn: '100% accessible. Passengers enjoy full panoramic views from the air-conditioned vehicle with brief flat sidewalk stops.',
    accessibilityAr: 'سهل الوصول بنسبة 100%. يشاهد الزوار المعالم مباشرة من داخل السيارة المكيفة مع إمكانية التوقف السريع.',
    walkingEffortEn: 'Minimal (Vehicle Stop)',
    walkingEffortAr: 'يسير جداً (توقف سيارة)',
    typicalDurationEn: '30-45 minutes driving through the valley and Jamarat complex.',
    typicalDurationAr: '30 إلى 45 دقيقة للمرور بالمشعر ومعلم الجمرات.',
    distanceFromHaramEn: '7.5 km (approx. 15-20 minutes by private car).',
    distanceFromHaramAr: '7.5 كم (حوالي 15-20 دقيقة بالسيارة الخاصة).',
    carInstructionsEn: 'Your driver enters via King Abdulaziz Road or Tunnel Network, pausing near Jamarat Plaza for photographs before continuing toward Muzdalifah.',
    carInstructionsAr: 'يسلك السائق طريق الملك عبد العزيز أو شبكة الأنفاق، ويتوقف بمحاذاة ساحة الجمرات لالتقاط الصور التذكارية قبل التوجه لمزدلفة.',
    lat: 21.4133,
    lng: 39.8933,
    image: '/assets/images/camry_exterior.webp',
    faqsEn: [
      {
        q: 'Is vehicle access to Mina permitted throughout the year?',
        a: 'Yes, outside the restricted Hajj days (typically Dhu al-Hijjah 7 to 13), private passenger cars have open vehicular access to major roads in Mina.',
      },
    ],
    faqsAr: [
      {
        q: 'هل الدخول بالسيارة إلى منى متاح طوال العام؟',
        a: 'نعم، خارج أيام الحج المحددة (من 7 إلى 13 ذو الحجة)، الطرق الرئيسية في مشعر منى مفتوحة لحركة السيارات الخاصة.',
      },
    ],
    relatedTours: ['makkah-half-day'],
  },

  'arafat': {
    slug: 'arafat',
    city: 'makkah',
    titleEn: 'Mount Arafat & Jabal ar-Rahmah Private Chauffeur Tour',
    titleAr: 'زيارة جبل عرفات (جبل الرحمة) ومسجد نمرة بسيارة خاصة',
    subtitleEn: 'The Pinnacle of Pilgrimage: Namirah Mosque, Jabal ar-Rahmah, and Plains of Arafat',
    subtitleAr: 'أعظم المشاعر المقدسة: جبل الرحمة ومسجد نمرة وصعيد عرفات المبارك',
    metaDescEn: 'Private chauffeur visit to Mount Arafat & Jabal ar-Rahmah in Makkah. Historical significance, wheelchair accessibility, and fixed fares with driver standby.',
    metaDescAr: 'زيارة جبل عرفات وجبل الرحمة ومسجد نمرة في مكة بسيارة خاصة مع سائق. أسعار ثابتة ومناسبة للعائلات وكبار السن.',
    answerFirstEn: 'Mount Arafat is located roughly 20 km southeast of the Holy Kaaba in Makkah. The site features Jabal ar-Rahmah (a granite hill about 70 meters high) and the magnificent Masjid Namirah. Outside of the Hajj day of Arafah, the area is serene, easily accessible by car, and features gentle wide stairs with handrails leading up the hill.',
    answerFirstAr: 'يقع جبل عرفات على بعد قرابة 20 كم جنوب شرق الحرم المكي. ويضم المشعر جبل الرحمة (تلة جرانيتية بارتفاع 70 متراً تقريباً) ومسجد نمرة الشهير. وفي غير يوم عرفة، يتميز المشعر بالهدوء التام وسهولة وصول السيارات حتى سفح الجبل، وتوجد سلالم ممهدة ومريحة للصعود.',
    historyEn: 'Arafah represents the core pillar of Hajj ("Hajj is Arafah"). It was here that Prophet Muhammad (PBUH) delivered his historic Farewell Sermon (Khutbat al-Wada) during the Farewell Pilgrimage in 10 AH. [Drafted for scholarly & historical review; sourced from Sahih Muslim 1218].',
    historyAr: 'عرفات هو الركن الأعظم في الحج لقوله ﷺ: «الحج عرفة». وفيه خطب النبي ﷺ خطبة الوداع الشهيرة في حجة الوداع سنة 10 هـ مؤصلاً قيم العدل والكرامة الإنسانية. [مسودة خاضعة للمراجعة الشرعية؛ مستند إلى صحيح مسلم، حديث 1218].',
    historySourceEn: 'Sahih Muslim (Hadith of Jabir on the Hajj of the Prophet), Sunan Abi Dawud.',
    historySourceAr: 'صحيح مسلم (حديث جابر الطويل في صفة حجة النبي ﷺ)، سنن أبي داود.',
    etiquetteEn: [
      'Supplication (Dua) and quiet reflection are recommended.',
      'Avoid writing on the historical pillar at the peak of Jabal ar-Rahmah or believing the stones hold personal benefit.',
    ],
    etiquetteAr: [
      'يستحب الإكثار من الدعاء والتضرع والذكر بخشوع وسكينة.',
      'تجنب الكتابة على الشاخص في أعلى جبل الرحمة أو التمسح بالحجارة.',
    ],
    bestTimeEn: 'Mornings from 7:00 AM to 10:30 AM or late afternoons before Maghrib for pleasant weather.',
    bestTimeAr: 'الفترة الصباحية بين 7:00 و 10:30 صباحاً أو قبل الغروب لاعتدال الأجواء.',
    accessibilityEn: 'The foot of Jabal ar-Rahmah and surrounding parks are flat and wheelchair-accessible. Climbing the hill steps is optional and takes about 10-15 minutes.',
    accessibilityAr: 'سفح جبل الرحمة والحدائق المحيطة به ممهدة بالكامل وتناسب الكراسي المتحركة. صعود درجات الجبل اختياري ويستغرق 10-15 دقيقة.',
    walkingEffortEn: 'Moderate (Flat Walk)',
    walkingEffortAr: 'متوسط (مشي مستوٍ)',
    typicalDurationEn: '45 to 60 minutes for prayer, photos, and touring Namirah perimeter.',
    typicalDurationAr: '45 إلى 60 دقيقة للدعاء والتقاط الصور والمرور بمسجد نمرة.',
    distanceFromHaramEn: '21.5 km (approx. 25-35 minutes via Highway 15 or Taif Road).',
    distanceFromHaramAr: '21.5 كم (حوالي 25-35 دقيقة عبر طريق الطائف السريع).',
    carInstructionsEn: 'Your private car parks directly at the foot of Jabal ar-Rahmah in paved visitor parking. Chauffeur remains with the car with cold water on standby.',
    carInstructionsAr: 'تقف السيارة الخاصة في المواقف الممهدة أمام جبل الرحمة مباشرة، وينتظر السائق العائلة مع مياه مبردة وجاهزية تامة.',
    lat: 21.3548,
    lng: 39.9841,
    image: '/assets/images/staria_interior.webp',
    faqsEn: [
      {
        q: 'Can our car drive directly to Mount Arafat anytime?',
        a: 'Yes, outside the restricted dates around Hajj, the plains of Arafat and roads to Jabal ar-Rahmah are open 24/7 with wide modern highways.',
      },
    ],
    faqsAr: [
      {
        q: 'هل يمكن للسيارة الوصول إلى جبل عرفات في أي وقت؟',
        a: 'نعم، خارج أيام موسم الحج، صعيد عرفات والطرق المؤدية لجبل الرحمة مفتوحة وممهدة على مدار الساعة.',
      },
    ],
    relatedTours: ['makkah-half-day', 'custom-hourly'],
  },

  'masjid-quba': {
    slug: 'masjid-quba',
    city: 'madinah',
    titleEn: 'Masjid Quba Private Transfer & Prayer Visit',
    titleAr: 'زيارة وصلاة في مسجد قباء بالمدينة المنورة بسيارة خاصة',
    subtitleEn: 'The first mosque built in Islam with immense spiritual virtue and serene courtyards',
    subtitleAr: 'أول مسجد أسس في الإسلام ذو الفضل العظيم والساحات النبوية الوارفة',
    metaDescEn: 'Private chauffeur transport to Masjid Quba in Madinah. Virtues of praying two rak’ahs, walking boulevard connection, parking and family facilities.',
    metaDescAr: 'زيارة مسجد قباء بالمدينة المنورة بسيارة خاصة مع سائق. فضل ركعتين في قباء، مواقف السيارات، والممشى النبوي مع انتظار السائق.',
    answerFirstEn: 'Masjid Quba is situated approximately 3.5 km south of the Prophet\'s Mosque (Masjid an-Nabawi) in Madinah. It is the first mosque established by Prophet Muhammad (PBUH) upon his arrival during the Hijrah. Visiting Masjid Quba in a state of purity and performing two rak’ahs of prayer carries the spiritual reward of an Umrah pilgrimage according to authentic prophetic narrations.',
    answerFirstAr: 'يقع مسجد قباء على بعد قرابة 3.5 كم جنوب المسجد النبوي الشريف بالمدينة المنورة. وهو أول مسجد أسسه النبي ﷺ فور وصوله مهاجراً إلى المدينة. وتسن زيارته متطهراً والصلاة فيه لما ورد في الحديث النبوي الشريف أن من تطهر في بيته ثم أتى مسجد قباء فصلى فيه ركعتين كان له كأجر عمرة.',
    historyEn: 'Prophet Muhammad (PBUH) laid the founding stones of Masjid Quba during his historic stop at the village of Quba in 1 AH before entering central Madinah. He continued to visit Quba every Saturday, both riding and on foot. [Sourced from Sahih al-Bukhari 1193 and Sunan Ibn Majah 1412; drafted for scholarly review].',
    historyAr: 'وضع النبي ﷺ اللبنات الأولى لمسجد قباء عند نزوله ببني عمرو بن عوف في الهجرة النبوية المباركة، ونزل فيه قوله تعالى: ﴿لَمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ﴾. وكان ﷺ يزوره كل سبت ماشياً وراكباً. [صحيح البخاري، حديث 1193؛ سنن ابن ماجه 1412؛ مسودة خاضعة للمراجعة الشرعية].',
    historySourceEn: 'Holy Quran (9:108), Sahih al-Bukhari (Hadith 1193), Sunan an-Nasa\'i (Hadith 699).',
    historySourceAr: 'القرآن الكريم (التوبة: 108)، صحيح البخاري (1193)، سنن النسائي (699).',
    etiquetteEn: [
      'Perform wudu (ablution) at your hotel prior to departing for the mosque to attain the full prophetic virtue.',
      'Offer two rak’ahs Tahiyyat al-Masjid with sincere devotion.',
      'Wheelchairs are welcomed with dedicated ramps and barrier-free courtyard access.',
    ],
    etiquetteAr: [
      'يستحب إسباغ الوضوء في الفندق قبل الانطلاق إلى المسجد لتحصيل فضل أجر العمرة.',
      'أداء ركعتين تحية للمسجد بخشوع وسكينة.',
      'توفير مسارات ممهدة للكراسي المتحركة في ساحات المسجد ومداخله.',
    ],
    bestTimeEn: 'Saturday mornings (following prophetic tradition) or any morning between 7:30 AM and 10:30 AM.',
    bestTimeAr: 'صباح يوم السبت (اقتداءً بالسنة النبوية) أو في أي يوم صباحاً بين 7:30 و 10:30.',
    accessibilityEn: 'Fully accessible for all ages. Expansive air-conditioned prayer halls, escalators, and marble courtyards with shaded canopies.',
    accessibilityAr: 'مجهز بالكامل لكبار السن وذوي الإعاقة. مصاعد كهربائية، تكييف متطور، وساحات رخامية مظللة بالكامل.',
    walkingEffortEn: 'Minimal (Vehicle Stop)',
    walkingEffortAr: 'يسير جداً (توقف سيارة)',
    typicalDurationEn: '40 to 60 minutes for prayer, reflection, and browsing the dates market.',
    typicalDurationAr: '40 إلى 60 دقيقة للصلاة والدعاء وجولة في الساحات وسوق التمور المحيط.',
    distanceFromHaramEn: '3.6 km (approx. 8-12 minutes by private car).',
    distanceFromHaramAr: '3.6 كم (حوالي 8-12 دقيقة بالسيارة الخاصة).',
    carInstructionsEn: 'Your chauffeur drops you off directly at the Quba perimeter drop-off gate, waits in nearby shaded parking, and meets you at the same entrance immediately after your prayer.',
    carInstructionsAr: 'يقوم سائقك بإنزالكم مباشرة عند بوابة ساحات قباء، وينتظركم في المواقف المخصصة ليعود لاستقبالكم فور انتهائكم من الصلاة.',
    lat: 24.4394,
    lng: 39.6172,
    image: '/assets/images/camry_interior.webp',
    faqsEn: [
      {
        q: 'Is it better to walk via Quba Avenue (Mamshey) or take a private car?',
        a: 'The pedestrian boulevard is pleasant in cool weather (approx. 3 km / 45-minute walk). For families with elderly parents, children, or during daytime heat, a private air-conditioned car takes just 10 minutes door-to-door.',
      },
    ],
    faqsAr: [
      {
        q: 'هل الأفضل المشي عبر ممشى قباء أم ركوب سيارة خاصة؟',
        a: 'الممشى جميل في الأجواء الباردة ليلاً (نحو 3 كم مشياً لمدة 45 دقيقة). أما للعائلات وكبار السن وفي أوقات النهار والحرارة، فإن السيارة الخاصة المكيفة تنقلكم في 10 دقائق فقط من باب الفندق.',
      },
    ],
    relatedTours: ['madinah-half-day', 'custom-hourly'],
  },

  'mount-uhud': {
    slug: 'mount-uhud',
    city: 'madinah',
    titleEn: 'Mount Uhud & Martyrs Cemetery Private Car Visit',
    titleAr: 'زيارة جبل أحد ومقبرة الشهداء وجبل الرماة بسيارة خاصة',
    subtitleEn: 'Historic battlefield of Uhud: Sayyiduna Hamzah (RA), Archers\' Hill, and prophetic heritage',
    subtitleAr: 'معلم غزوة أحد التاريخي: مقبرة سيد الشهداء حمزة بن عبد المطلب وجبل الرماة',
    metaDescEn: 'Private chauffeur visit to Mount Uhud and Martyrs Cemetery in Madinah. Visiting manners, Archers\' Hill walking tips, and historical background.',
    metaDescAr: 'زيارة جبل أحد ومقبرة الشهداء وجبل الرماة بالمدينة المنورة بسيارة خاصة مع سائق. آداب الزيارة والسلام على الشهداء مع انتظار مريح.',
    answerFirstEn: 'Mount Uhud is a grand red-granite mountain located 5 km north of the Prophet\'s Mosque. At its base lies the resting place of 70 companions martyred during the Battle of Uhud in 3 AH, led by the Prophet\'s uncle Sayyiduna Hamzah ibn Abd al-Muttalib (RA). Directly adjacent is Jabal ar-Rumah (Archers\' Hill), a gentle 15-meter mound that visitors can ascend in 2 minutes for a full view of the battlefield.',
    answerFirstAr: 'يقع جبل أحد على بعد 5 كم شمال المسجد النبوي الشريف، وهو جبل جرانيتي مهيب ورد في فضله قوله ﷺ: «أُحُدٌ جَبَلٌ يُحِبُّنَا وَنُحِبُّهُ». ويرقد عند سفحه 70 صحابياً من شهداء معركة أحد (3 هـ) يتقدمهم سيد الشهداء حمزة بن عبد المطلب رضي الله عنه، وبجواره جبل الرماة الذي يرتفع نحو 15 متراً ويوفر إطلالة شاملة على ميدان المعركة.',
    historyEn: 'The Battle of Uhud took place in Shawwal 3 AH between the early Muslim community and the Quraysh. The Prophet (PBUH) expressed deep affection for this mountain, declaring: "Uhud is a mountain that loves us and we love it." [Sahih al-Bukhari 4084; drafted for scholarly review].',
    historyAr: 'وقعت غزوة أحد في شوال من العام الثالث للهجرة بين المسلمين وقريش. وعبر النبي ﷺ عن مكانة هذا الجبل فقال: «أحد جبل يحبنا ونحبه». وتسن زيارة الشهداء والسلام عليهم والدعاء لهم. [صحيح البخاري، حديث 4084؛ مسودة خاضعة للمراجعة الشرعية].',
    historySourceEn: 'Sahih al-Bukhari (Kitab al-Maghazi, Hadith 4084), Sahih Muslim (Hadith 1393).',
    historySourceAr: 'صحيح البخاري (كتاب المغازي، حديث 4084)، صحيح مسلم (حديث 1393).',
    etiquetteEn: [
      'Stand peacefully before the cemetery wall and greet the martyrs using the sunnah greeting: "Peace be upon you, O people of the dwellings..."',
      'Do not engage in unprescribed rituals or throw objects inside the cemetery enclosure.',
      'Exercise caution when walking up the stone path of Archers\' Hill.',
    ],
    etiquetteAr: [
      'الوقوف بأدب أمام سور مقبرة الشهداء والسلام عليهم بالسلام المسنون: «السلام عليكم دار قوم مؤمنين...».',
      'تجنب أي ممارسات غير مشروعة كالتمسح بالحجارة أو رمي النقود داخل المقبرة.',
      'الحذر والتأني عند صعود مسار جبل الرماة الترابي.',
    ],
    bestTimeEn: 'Mornings from 7:30 AM to 10:30 AM or late afternoons before sunset.',
    bestTimeAr: 'الفترة الصباحية بين 7:30 و 10:30 صباحاً أو العصر قبل الغروب.',
    accessibilityEn: 'The Martyrs viewing plaza and Masjid Sayyid ash-Shuhada are fully flat and wheelchair-accessible. Ascending Archers\' Hill requires walking up a slight rocky incline with steps.',
    accessibilityAr: 'ساحة مقبرة الشهداء ومسجد سيد الشهداء ممهدة بالكامل وتناسب الكراسي المتحركة. صعود جبل الرماة يتطلب مشياً يسيراً لمدة دقيقتين.',
    walkingEffortEn: 'Moderate (Flat Walk)',
    walkingEffortAr: 'متوسط (مشي مستوٍ)',
    typicalDurationEn: '45 to 60 minutes for cemetery greeting, Archers\' Hill, and Sayyid ash-Shuhada Mosque.',
    typicalDurationAr: '45 إلى 60 دقيقة للسلام على الشهداء، وصعود جبل الرماة، وزيارة مسجد سيد الشهداء.',
    distanceFromHaramEn: '5.1 km (approx. 10-15 minutes by private car).',
    distanceFromHaramAr: '5.1 كم (حوالي 10-15 دقيقة بالسيارة الخاصة).',
    carInstructionsEn: 'Your private car parks in the dedicated plaza next to Masjid Sayyid ash-Shuhada. Driver waits with cold bottled water and AC running.',
    carInstructionsAr: 'تقف السيارة في مواقف ساحة مسجد سيد الشهداء المظللة، وينتظر السائق العائلة بسيارة مكيفة ومياه زمزم مبردة.',
    lat: 24.5033,
    lng: 39.6122,
    image: '/assets/images/hiace_exterior.webp',
    faqsEn: [
      {
        q: 'Are visitors allowed inside the Martyrs Cemetery?',
        a: 'The cemetery is enclosed by a protective viewing wall with large windows, allowing visitors to greet the martyrs and observe the resting places with dignity without entering the burial soil.',
      },
    ],
    faqsAr: [
      {
        q: 'هل يسمح بدخول الزوار إلى داخل المقبرة نفسها؟',
        a: 'المقبرة محاطة بسور حماية زجاجي وشبكي مخصص يتيح للزوار الوقوف بأدب والسلام على الشهداء والدعاء لهم دون الدخول بين القبور.',
      },
    ],
    relatedTours: ['madinah-half-day', 'custom-hourly'],
  },

  'masjid-qiblatayn': {
    slug: 'masjid-qiblatayn',
    city: 'madinah',
    titleEn: 'Masjid al-Qiblatayn Private Chauffeur Visit',
    titleAr: 'زيارة مسجد القبلتين بالمدينة المنورة بسيارة خاصة',
    subtitleEn: 'Historic mosque where the Quranic command to turn towards the Kaaba was revealed',
    subtitleAr: 'المسجد التاريخي الذي تحولت فيه القبلة من بيت المقدس إلى الكعبة المشرفة',
    metaDescEn: 'Private chauffeur visit to Masjid al-Qiblatayn in Madinah. History of the Qibla change, modern prayer halls, parking and family tour arrangements.',
    metaDescAr: 'زيارة مسجد القبلتين في المدينة المنورة بسيارة خاصة مع سائق. قصة تحويل القبلة، التوسعة الحديثة، وتوصيل مريح من باب الفندق.',
    answerFirstEn: 'Masjid al-Qiblatayn (The Mosque of the Two Qiblas) is situated approximately 5 km northwest of the Prophet\'s Mosque. It holds a unique place in Islamic history as the site where Prophet Muhammad (PBUH) was commanded by Allah during prayer to turn his face away from Jerusalem (Bait al-Maqdis) towards the Holy Kaaba in Makkah, fulfilling the verse in Surah Al-Baqarah (2:144).',
    answerFirstAr: 'يقع مسجد القبلتين على بعد نحو 5 كم شمال غرب المسجد النبوي الشريف. ويتميز بمكانته التاريخية الفريدة حيث نزل فيه الوحي على النبي ﷺ أثناء الصلاة بالتحول من القبلة الأولى (بيت المقدس) إلى الكعبة المشرفة بمكة المكرمة امتثالاً لقوله تعالى في سورة البقرة: ﴿فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ﴾.',
    historyEn: 'In 2 AH, while the Prophet (PBUH) was leading the congregation in prayer (historically reported as Dhuhr or Asr), divine revelation instructed the immediate change of prayer orientation. [Sahih al-Bukhari 40; drafted for scholarly review].',
    historyAr: 'في العام الثاني من الهجرة، وأثناء أداء النبي ﷺ صلاة الظهر (أو العصر) نزل عليه الأمر الإلهي بتحويل القبلة فتحول وهو راكع واستدار المصلون خلفه نحو الكعبة المشرفة. [صحيح البخاري، حديث 40؛ مسودة خاضعة للمراجعة الشرعية].',
    historySourceEn: 'Holy Quran (2:144), Sahih al-Bukhari (Hadith 40), Sahih Muslim (Hadith 525).',
    historySourceAr: 'القرآن الكريم (البقرة: 144)، صحيح البخاري (حديث 40)، صحيح مسلم (حديث 525).',
    etiquetteEn: [
      'Offer two rak’ahs in the serene prayer hall facing the Holy Kaaba.',
      'Appreciate the historical markers highlighting the original northerly orientation.',
    ],
    etiquetteAr: [
      'أداء ركعتين تحية للمسجد بخشوع واستشعار دلالة وحدة الأمة حول الكعبة المشرفة.',
      'مشاهدة الشواخص التوضيحية الحديثة التي تشرح اتجاه القبلتين.',
    ],
    bestTimeEn: 'Any time between Dhuhr and Isha or morning hours around 8:00 AM.',
    bestTimeAr: 'الفترة الصباحية أو بين صلاتي الظهر والعصر.',
    accessibilityEn: 'Equipped with escalators, ramps, and spacious elevators for elderly pilgrims and wheelchair users.',
    accessibilityAr: 'مجهز بالسلالم الكهربائية والمصاعد والمسارات الممهدة للكراسي المتحركة وكبار السن.',
    walkingEffortEn: 'Minimal (Vehicle Stop)',
    walkingEffortAr: 'يسير جداً (توقف سيارة)',
    typicalDurationEn: '25 to 35 minutes for prayer and historical observation.',
    typicalDurationAr: '25 إلى 35 دقيقة للصلاة والاطلاع على المعلم.',
    distanceFromHaramEn: '4.8 km (approx. 10-12 minutes by private car).',
    distanceFromHaramAr: '4.8 كم (حوالي 10-12 دقيقة بالسيارة الخاصة).',
    carInstructionsEn: 'Chauffeur parks on the elevated mosque apron parking and awaits your party.',
    carInstructionsAr: 'يقوم السائق بإيقاف السيارة في المواقف المخصصة أمام المسجد وينتظركم حتى الانتهاء.',
    lat: 24.4841,
    lng: 39.5786,
    image: '/assets/images/staria_exterior.webp',
    faqsEn: [
      {
        q: 'Does Masjid al-Qiblatayn still have two mihrabs?',
        a: 'The mosque has been elegantly renovated. The prayer space now faces the Kaaba, while the historic northern orientation toward Jerusalem is commemorated on the upper wall architecture.',
      },
    ],
    faqsAr: [
      {
        q: 'هل يحتوي المسجد على محرابين حتى اليوم؟',
        a: 'تمت توسعة وتجديد المسجد بأرقى المعايير المعمارية، وتتجه الصلاة حالياً نحو الكعبة المشرفة، بينما وُضعت لوحة وشاخص تذكاري يوضح اتجاه القبلة الأولى نحو بيت المقدس.',
      },
    ],
    relatedTours: ['madinah-half-day', 'custom-hourly'],
  },

  'seven-mosques': {
    slug: 'seven-mosques',
    city: 'madinah',
    titleEn: 'The Seven Mosques & Battle of the Trench Site Tour',
    titleAr: 'زيارة موقع المساجد السبعة وغزوة الخندق بسيارة خاصة',
    subtitleEn: 'Historic defensive boundary of the Battle of Al-Khandaq (The Trench) in Madinah',
    subtitleAr: 'الموقع التاريخي لغزوة الخندق (الأحزاب) وموضع معسكر النبي ﷺ والصحابة',
    metaDescEn: 'Private chauffeur visit to the Seven Mosques & Battle of the Trench site in Madinah. Masjid al-Fath history, modern visitor plaza, and family car tours.',
    metaDescAr: 'زيارة المساجد السبعة وموقع غزوة الخندق في المدينة المنورة بسيارة خاصة مع سائق. تاريخ مسجد الفتح، الساحات الجديدة، وراحة التنقل.',
    answerFirstEn: 'The Seven Mosques (Al-Masajid as-Sab’ah) are located on the western flank of Mount Sela (Jabal Sal\'), roughly 2.5 km northwest of the Prophet\'s Mosque. This historic area marks the encampment points and observation posts established by Prophet Muhammad (PBUH) and his key companions during the Battle of the Trench (Al-Khandaq / Al-Ahzab) in 5 AH.',
    answerFirstAr: 'تقع المساجد السبعة على السفح الغربي لجبل سلع، على بعد نحو 2.5 كم شمال غرب المسجد النبوي. ويمثل هذا الموقع التاريخي مراكز المراقبة والمعسكر الدفاعي الذي أقامه النبي ﷺ وكبار صحابته أثناء غزوة الخندق (الأحزاب) في العام الخامس للهجرة النبوية المباركة.',
    historyEn: 'When the allied confederates (Ahzab) marched against Madinah, Salman al-Farsi (RA) advised digging a defensive trench. The small mosques in this cluster (including Masjid al-Fath, Masjid Salman, and Masjid Ali) historically commemorated the command positions. Today, a magnificent central grand mosque serves the area. [Drafted for scholarly review].',
    historyAr: 'عندما تجمعت أحزاب قريش وغطفان لحصار المدينة، أشار الصحابي الجليل سلمان الفارسي رضي الله عنه بحفر الخندق. وأقيمت في مواضع مرابطة الصحابة مصليات تاريخية عرفت بالمساجد السبعة، وتتوسطها اليوم منشأة معمارية حديثة ومسجد جامع فسيح. [مسودة خاضعة للمراجعة الشرعية].',
    historySourceEn: 'Sahih al-Bukhari (Kitab al-Maghazi - Ghazwat al-Khandaq), Zad al-Ma\'ad by Ibn al-Qayyim.',
    historySourceAr: 'صحيح البخاري (كتاب المغازي - غزوة الخندق)، زاد المعاد لابن القيم.',
    etiquetteEn: [
      'Reflect on the resilience and unity demonstrated by the companions during severe trials.',
      'Offer prayers in the modern grand central mosque.',
    ],
    etiquetteAr: [
      'استشعار معاني الصبر واليقين التي ضربها النبي ﷺ وصحابته في مواجهة الشدائد.',
      'أداء الصلاة في الجامع المركزي الحديث المجهز بكافة الخدمات.',
    ],
    bestTimeEn: 'Afternoons from 4:00 PM to 6:00 PM when the mountain shade cools the plaza.',
    bestTimeAr: 'فترة ما بعد العصر (4:00 - 6:00 مساءً) لاعتدال الجو وظلال جبل سلع.',
    accessibilityEn: 'Wide, level walkways and modern vehicle parking. The highest point (Masjid al-Fath hill) has paved steps.',
    accessibilityAr: 'ساحات واسعة ومستوية ومواقف سيارات حديثة. صعود تلة مسجد الفتح عبر درجات حجرية ممهدة.',
    walkingEffortEn: 'Moderate (Flat Walk)',
    walkingEffortAr: 'متوسط (مشي مستوٍ)',
    typicalDurationEn: '30 to 45 minutes.',
    typicalDurationAr: '30 إلى 45 دقيقة.',
    distanceFromHaramEn: '2.8 km (approx. 7-10 minutes by private car).',
    distanceFromHaramAr: '2.8 كم (حوالي 7-10 دقائق بالسيارة الخاصة).',
    carInstructionsEn: 'Chauffeur parks directly in the new Khandaq esplanade parking for relaxed stroll and pickup.',
    carInstructionsAr: 'يقف السائق في مواقف ساحة الخندق المركزية الجديدة لتسهيل تجول العائلة والعودة بكل يسر.',
    lat: 24.4758,
    lng: 39.5986,
    image: '/assets/images/camry_exterior.webp',
    faqsEn: [
      {
        q: 'Are all seven historical mosques still preserved?',
        a: 'The area has been redeveloped into a unified scenic heritage district anchored by the new large Al-Khandaq Mosque, with historic hilltop structures carefully conserved.',
      },
    ],
    faqsAr: [
      {
        q: 'هل جميع المساجد السبعة موجودة ومفتوحة حتى الآن؟',
        a: 'تمت إعادة تنظيم وتطوير المنطقة لتضم جامع الخندق الكبير والحديث لخدمة المصلين، مع الحفاظ على معالم المصليات التاريخية على سفح جبل سلع.',
      },
    ],
    relatedTours: ['madinah-half-day', 'custom-hourly'],
  },
};

export const ZIYARAT_TOURS: Record<string, ZiyaratTour> = {
  'makkah-half-day': {
    slug: 'makkah-half-day',
    city: 'makkah',
    titleEn: 'Makkah Historical Sites Private Tour (Half-Day)',
    titleAr: 'جولة مزارات مكة المكرمة التاريخية (نصف يوم بسيارة خاصة)',
    subtitleEn: 'Cave Hira, Jabal Thawr, Mina, Muzdalifah & Mount Arafat with door-to-door chauffeur',
    subtitleAr: 'غار حراء، جبل ثور، منى، مزدلفة، وجبل عرفات بسيارة خاصة وسائق مخصص',
    metaDescEn: 'Book a private 3-4 hour Makkah Ziyarat tour with a private car and chauffeur. Fixed vehicle price, free cancellation, cold Zamzam water included.',
    metaDescAr: 'احجز جولة مزارات مكة المكرمة الخاصة (3-4 ساعات) بسيارة خاصة وسائق. سعر ثابت للسيارة بالكامل، تكييف فندقي، ومياه زمزم مبردة.',
    durationEn: '3.5 to 4 Hours',
    durationAr: '3.5 إلى 4 ساعات',
    basePriceSAR: {
      camry: 300,
      staria: 400,
      yukon: 550,
      hiace: 500,
      coaster: 850,
    },
    itineraryEn: [
      { stop: 'Hotel Pickup in Makkah', duration: '15 mins', description: 'Chauffeur arrives at your hotel lobby with clean, pre-cooled vehicle.' },
      { stop: 'Jabal Thawr (Observation Stop)', duration: '25 mins', description: 'Scenic photo and contemplation stop at the foot of Mount Thawr.' },
      { stop: 'Mina & Jamarat Historic Complex', duration: '30 mins', description: 'Drive-through the valley of Mina, Masjid al-Khayf, and Jamarat Plaza.' },
      { stop: 'Muzdalifah Plains', duration: '15 mins', description: 'Transit through the sacred gathering plains of the Hajj pilgrims.' },
      { stop: 'Mount Arafat & Jabal ar-Rahmah', duration: '45 mins', description: 'Relaxed stop at the foot of Jabal ar-Rahmah with view of Masjid Namirah.' },
      { stop: 'Jabal al-Noor & Hira Cultural District', duration: '45 mins', description: 'Arrival at the base of Cave Hira with opportunity to visit Cultural District.' },
      { stop: 'Hotel Return', duration: '20 mins', description: 'Comfortable return drop-off directly at your Makkah accommodation.' },
    ],
    itineraryAr: [
      { stop: 'استقبال من الفندق بمكة', duration: '15 دقيقة', description: 'وصول السائق لبهو فندقكم بسيارة نظيفة ومكيفة ومجهزة.' },
      { stop: 'جبل ثور (وقوف ومشاهدة)', duration: '25 دقيقة', description: 'التوقف في ساحة سفح جبل ثور للرؤية والتأمل والتقاط الصور.' },
      { stop: 'مشعر منى ومعلم الجمرات', duration: '30 دقيقة', description: 'المرور عبر وادي منى ومسجد الخيف ومنشأة الجمرات التاريخية.' },
      { stop: 'صعيد مزدلفة', duration: '15 دقيقة', description: 'المرور بمشعر مزدلفة والمشعر الحرام في أجواء هادئة.' },
      { stop: 'صعيد عرفات وجبل الرحمة', duration: '45 دقيقة', description: 'توقف مريح أمام جبل الرحمة ومسجد نمرة للدعاء والزيارة.' },
      { stop: 'جبل النور وحي حراء الثقافي', duration: '45 دقيقة', description: 'الوصول لسفح غار حراء وزيارة المعرض والساحات المكيفة.' },
      { stop: 'العودة للفندق', duration: '20 دقيقة', description: 'إعادة العائلة الكريمة بسلامة الله مباشرة إلى باب الفندق.' },
    ],
    includedEn: [
      'Private air-conditioned vehicle exclusively for your party',
      'Professional, courteous local chauffeur',
      'Door-to-door hotel pickup and return in Makkah',
      'Complimentary chilled Zamzam water bottles',
      'All parking, expressway tolls, and waiting fees',
    ],
    includedAr: [
      'سيارة خاصة مكيفة ومخصصة بالكامل لعائلتك ومجموعتك',
      'سائق محترف وخبير بالطرق والمعالم التاريخية',
      'خدمة التوصيل من الباب إلى الباب (ذهاب وعودة للفندق)',
      'عبوات مياه زمزم مبردة لجميع الركاب مجاناً',
      'كافة رسوم المواقف والطرق السريعة وساعات الانتظار مشمولة',
    ],
    notIncludedEn: [
      'Tickets to optional paid exhibitions inside Hira Cultural District',
      'Personal food or beverages beyond bottled water',
      'Mountain climbing guide service (driver remains with vehicle)',
    ],
    notIncludedAr: [
      'تذاكر المتاحف والمعارض المدفوعة داخل حي حراء الثقافي (اختياري)',
      'الوجبات والمشتريات الشخصية',
      'خدمات الإرشاد الجبلي (ينتظر السائق دائماً بجوار السيارة)',
    ],
    cancellationPolicyEn: 'Free cancellation up to 24 hours prior to scheduled departure. Zero cancellation fee.',
    cancellationPolicyAr: 'إلغاء مجاني متاح حتى 24 ساعة قبل موعد الانطلاق دون أي رسوم.',
    faqsEn: [
      {
        q: 'Is the tour price per person or per car?',
        a: 'The price is fixed per vehicle regardless of passenger count within vehicle seat capacity.',
      },
      {
        q: 'Can we adjust the stops or spend more time at Arafat?',
        a: 'Yes, because this is a private chauffeur service, you can tailor the time at each stop with your driver.',
      },
    ],
    faqsAr: [
      {
        q: 'هل السعر للشخص الواحد أم للسيارة بالكامل؟',
        a: 'السعر محدد وثابت للسيارة بالكامل بغض النظر عن عدد الركاب في حدود سعة المقاعد المعتمدة.',
      },
      {
        q: 'هل يمكننا تعديل خط السير أو قضاء وقت أطول في عرفات؟',
        a: 'نعم بكل تأكيد، نظراً لأنها رحلة خاصة، يمكنكم التنسيق مع السائق لقضاء وقت أطول أو تعديل أولويات التوقف.',
      },
    ],
  },

  'madinah-half-day': {
    slug: 'madinah-half-day',
    city: 'madinah',
    titleEn: 'Madinah Historical Sites Private Tour (Half-Day)',
    titleAr: 'جولة مزارات المدينة المنورة التاريخية (نصف يوم بسيارة خاصة)',
    subtitleEn: 'Masjid Quba, Mount Uhud, Masjid al-Qiblatayn & Seven Mosques with private car',
    subtitleAr: 'مسجد قباء، جبل أحد والشهداء، مسجد القبلتين والمساجد السبعة بسيارة خاصة وسائق',
    metaDescEn: 'Book a 3-hour private Madinah Ziyarat tour with chauffeur. Quba prayer stop, Uhud Martyrs, Qiblatayn. Fixed price per car with hotel pickup.',
    metaDescAr: 'احجز جولة مزارات المدينة المنورة الخاصة (3 ساعات) مع سائق خاص. الصلاة في قباء، شهداء أحد، والقبلتين بسعر ثابت وشامل.',
    durationEn: '3 to 3.5 Hours',
    durationAr: '3 إلى 3.5 ساعات',
    basePriceSAR: {
      camry: 250,
      staria: 350,
      yukon: 480,
      hiace: 450,
      coaster: 750,
    },
    itineraryEn: [
      { stop: 'Hotel Pickup in Madinah Central', duration: '10 mins', description: 'Chauffeur meets you at your hotel lobby around the Prophet\'s Mosque.' },
      { stop: 'Masjid Quba Prayer Stop', duration: '45 mins', description: 'Time for ablution, 2 rak\'ahs prayer, and exploring the courtyard palm gardens.' },
      { stop: 'Mount Uhud & Martyrs of Uhud', duration: '45 mins', description: 'Greeting the martyrs, observing Archers\' Hill, and Masjid Sayyid ash-Shuhada.' },
      { stop: 'Masjid al-Qiblatayn', duration: '30 mins', description: 'Prayer stop and viewing the historic dual-direction orientation architectural plaques.' },
      { stop: 'The Seven Mosques (Al-Khandaq)', duration: '30 mins', description: 'Panoramic stop at the Battle of the Trench historical esplanade.' },
      { stop: 'Hotel Return', duration: '15 mins', description: 'Prompt return drop-off to your Madinah hotel or Prophet\'s Mosque gates.' },
    ],
    itineraryAr: [
      { stop: 'استقبال من فندق المدينة', duration: '10 دقائق', description: 'الالتقاء في بهو فندقكم في المنطقة المركزية المحيطة بالحرم النبوي.' },
      { stop: 'صلاة وزيارة مسجد قباء', duration: '45 دقيقة', description: 'أداء ركعتين في قباء، والاطلاع على الساحات النبوية الوارفة.' },
      { stop: 'جبل أحد ومقبرة الشهداء', duration: '45 دقيقة', description: 'السلام على سيد الشهداء حمزة وصعود جبل الرماة ومشاهدة ميدان المعركة.' },
      { stop: 'مسجد القبلتين', duration: '30 دقيقة', description: 'صلاة تحية المسجد واستحضار معجزة تحويل القبلة إلى الكعبة.' },
      { stop: 'موقع المساجد السبعة والخندق', duration: '30 دقيقة', description: 'التوقف في ساحة غزوة الخندق التاريخية وسفح جبل سلع.' },
      { stop: 'العودة للفندق', duration: '15 دقيقة', description: 'إعادة الركاب إلى الفندق أو ساحات المسجد النبوي الشريف.' },
    ],
    includedEn: [
      'Private air-conditioned car dedicated exclusively to your family',
      'Door-to-door hotel pickup and return in Madinah',
      'Generous wait time at each holy site for unhurried prayer',
      'Chilled bottled water and climate-controlled comfort',
      'All road and parking expenses covered',
    ],
    includedAr: [
      'سيارة خاصة مكيفة ومجهزة خصيصاً لعائلتك',
      'توصيل من باب الفندق والعودة لباب الفندق بالمدينة',
      'وقت انتظار رحب في كل موقع للصلاة والدعاء دون أي استعجال',
      'مياه مبردة مجانية طوال مسار الجولة',
      'شامل جميع نفقات الوقود والمواقف',
    ],
    notIncludedEn: [
      'Personal food or shopping purchases',
      'Licensed tour guide commentary (driver provides vehicle transport only)',
    ],
    notIncludedAr: [
      'المشتريات والتسوق الشخصي',
      'خدمات الإرشاد السياحي المرخص (السائق يوفر النقل والمساعدة اللوجستية)',
    ],
    cancellationPolicyEn: 'Free cancellation up to 24 hours prior to pickup. Instant WhatsApp refund/reschedule.',
    cancellationPolicyAr: 'إلغاء مجاني كامل حتى 24 ساعة قبل موعد الرحلة مع مرونة إعادة الجدولة.',
    faqsEn: [
      {
        q: 'Can we perform wudu at Masjid Quba or should we do it before?',
        a: 'The Prophet (PBUH) specified purifying oneself at home/hotel before proceeding to Quba to earn the reward of Umrah, so we strongly recommend performing ablution in your room.',
      },
    ],
    faqsAr: [
      {
        q: 'هل نتوضأ في مسجد قباء أم في الفندق قبل التحرك؟',
        a: 'السنة النبوية تنص على التطهر في البيت أو الفندق قبل الخروج لتحصيل أجر العمرة، لذلك نوصي بشدة بالوضوء في غرفتكم قبل بدء الجولة.',
      },
    ],
  },

  'badr-historical': {
    slug: 'badr-historical',
    city: 'madinah',
    titleEn: 'Badr Battlefield Full-Day Private Tour from Madinah',
    titleAr: 'جولة موقع غزوة بدر التاريخية (يوم كامل من المدينة بسيارة خاصة)',
    subtitleEn: 'Day excursion to the historic site of the First Decisive Battle in Islam',
    subtitleAr: 'رحلة خاصة ليوم كامل إلى أرض غزوة بدر الكبرى ومقبرة الشهداء ومعلم العريش',
    metaDescEn: 'Private full-day chauffeur trip from Madinah to the Badr battlefield. Martyrs cemetery, Al-Arish Mosque, 300 km return transfer with highway comfort.',
    metaDescAr: 'رحلة خاصة من المدينة إلى موقع غزوة بدر بسيارة مكيفة وسائق مخصص. زيارة مقبرة شهداء بدر، مسجد العريش، ومسار الطريق السريع.',
    durationEn: '6 to 7 Hours',
    durationAr: '6 إلى 7 ساعات',
    basePriceSAR: {
      camry: 600,
      staria: 750,
      yukon: 950,
      hiace: 900,
      coaster: 1500,
    },
    itineraryEn: [
      { stop: 'Depart Madinah Hotel', duration: '90 mins', description: 'Scenic drive along the modern Yanbu/Badr Expressway (approx. 150 km).' },
      { stop: 'Masjid al-Arish', duration: '45 mins', description: 'Prayer stop at the historical site where the Prophet\'s command shelter stood.' },
      { stop: 'Badr Martyrs Cemetery (Shuhada Badr)', duration: '45 mins', description: 'Greeting the 14 noble companions martyred at Badr.' },
      { stop: 'Al-Udwah ad-Dunya & Al-Udwah al-Quswa Landmarks', duration: '30 mins', description: 'Viewing the geographical dunes mentioned in the Holy Quran (Surah Al-Anfal).' },
      { stop: 'Lunch & Refreshment Stop', duration: '45 mins', description: 'Break at local traditional restaurant or modern highway plaza.' },
      { stop: 'Return Transfer to Madinah', duration: '90 mins', description: 'Comfortable air-conditioned highway return to your Madinah hotel.' },
    ],
    itineraryAr: [
      { stop: 'الانطلاق من فندق المدينة', duration: '90 دقيقة', description: 'رحلة مريحة عبر طريق ينبع/بدر السريع (حوالي 150 كم).' },
      { stop: 'مسجد العريش التاريخي', duration: '45 دقيقة', description: 'الصلاة والتأمل في موضع عريش القيادة النبوية الشريفة.' },
      { stop: 'مقبرة شهداء بدر الأبرار', duration: '45 دقيقة', description: 'السلام على الشهداء الـ 14 من المهاجرين والأنصار والدعاء لهم.' },
      { stop: 'معالم العدوة الدنيا والعدوة القصوى', duration: '30 دقيقة', description: 'رؤية المعالم الجغرافية المذكورة في القرآن بسورة الأنفال.' },
      { stop: 'استراحة وتناول وجبة الغداء', duration: '45 دقيقة', description: 'توقف مريح في مطعم محلي نظيف أو استراحة طريق مجهزة.' },
      { stop: 'رحلة العودة إلى المدينة', duration: '90 دقيقة', description: 'العودة بالسيارة المكيفة بأمان تام إلى فندقكم بالمدينة.' },
    ],
    includedEn: [
      'Round-trip highway private car transfer (approx. 320 km total)',
      'Dedicated private chauffeur on standby for 6-7 hours',
      'Expressway tolls and fuel included',
      'Chilled drinking water and rest stops as requested',
    ],
    includedAr: [
      'نقل ذهاب وعودة كامل بالسيارة الخاصة (حوالي 320 كم إجمالاً)',
      'سائق خاص متفرغ لخدمتكم طوال 6 إلى 7 ساعات',
      'شامل رسوم الطرق السريعة والمواقف والوقود بالكامل',
      'مياه شرب مبردة وتوقفات استراحة حسب رغبة العائلة',
    ],
    notIncludedEn: ['Meals or personal dining expenses', 'Entrance fees if special exhibits operate'],
    notIncludedAr: ['الوجبات الغذائية ونفقات الإعاشة الشخصية'],
    cancellationPolicyEn: 'Free cancellation up to 24 hours prior to departure.',
    cancellationPolicyAr: 'إلغاء مجاني كامل حتى 24 ساعة قبل موعد الانطلاق.',
    faqsEn: [
      {
        q: 'How far is Badr from Madinah?',
        a: 'Badr is located approximately 150 km southwest of Madinah, taking about 1 hour and 30 minutes via well-paved four-lane expressways.',
      },
    ],
    faqsAr: [
      {
        q: 'كم تبعد مدينة بدر عن المدينة المنورة؟',
        a: 'تبعد بدر قرابة 150 كم جنوب غرب المدينة المنورة، وتستغرق الرحلة حوالي ساعة ونصف عبر طريق سريع حديث ومريح.',
      },
    ],
  },

  'custom-hourly': {
    slug: 'custom-hourly',
    city: 'makkah',
    titleEn: 'Custom Private Ziyarat Chauffeur by the Hour',
    titleAr: 'سائق خاص بالساعة للمزارات والزيارات الخاصة (مكة أو المدينة)',
    subtitleEn: 'Build your own custom itinerary with a dedicated vehicle and driver on standby',
    subtitleAr: 'صمم خط سيرك الخاص بالمزارات والمساجد التاريخية بسيارة خاصة وسائق بالساعة',
    metaDescEn: 'Hire a private car with driver by the hour for custom Ziyarat in Makkah or Madinah. Flexible stops, hotel pickup, and fixed transparent rates.',
    metaDescAr: 'استئجر سيارة خاصة مع سائق بالساعة لجولات المزارات في مكة أو المدينة. مرونة تامة في التوقفات، مواعيد مخصصة، وأسعار شفافة.',
    durationEn: 'Hourly (Minimum 3 Hours)',
    durationAr: 'بالساعة (الحد الأدنى 3 ساعات)',
    basePriceSAR: {
      camry: 100,
      staria: 130,
      yukon: 180,
      hiace: 150,
      coaster: 280,
    },
    itineraryEn: [
      { stop: 'Customized Itinerary', duration: 'Flexible', description: 'You decide which holy sites, mosques, libraries, or dates markets to visit.' },
    ],
    itineraryAr: [
      { stop: 'خط سير مخصص بالكامل', duration: 'مرن حسب رغبتكم', description: 'تحدد بنفسك المعالم والمساجد التاريخية وأسواق التمور التي تود زيارتها.' },
    ],
    includedEn: ['Dedicated vehicle and chauffeur', 'Fuel and local highway tolls', 'Cold bottled water'],
    includedAr: ['سيارة وسائق مخصصان بالكامل', 'الوقود والرسوم', 'مياه مبردة'],
    notIncludedEn: ['Intercity highway transfers beyond the designated metropolitan area'],
    notIncludedAr: ['السفر بين المدن البعيدة خارج النطاق العمراني المحدد'],
    cancellationPolicyEn: 'Free cancellation up to 24 hours prior to booked start time.',
    cancellationPolicyAr: 'إلغاء مجاني حتى 24 ساعة قبل الموعد.',
    faqsEn: [
      {
        q: 'What is the minimum booking time for hourly service?',
        a: 'The minimum duration is 3 consecutive hours, which allows sufficient time for 2-3 significant sites with waiting time.',
      },
    ],
    faqsAr: [
      {
        q: 'ما هو الحد الأدنى لساعات الحجز؟',
        a: 'الحد الأدنى للحجز هو 3 ساعات متواصلة لضمان زيارة موقعين إلى ثلاثة مواقع بارتياح.',
      },
    ],
  },
};

export const ZIYARAT_GUIDES: Record<string, ZiyaratGuide> = {
  'how-to-plan-ziyarat-makkah': {
    slug: 'how-to-plan-ziyarat-makkah',
    titleEn: 'How to Plan Your Ziyarat in Makkah: Essential Guide (2026)',
    titleAr: 'كيف تخطط لزيارة مزارات مكة المكرمة: الدليل الشامل (2026)',
    metaDescEn: 'Complete guide to planning historical site visits in Makkah. Optimal routes, timing to avoid heat, accessibility for elders, and booking a private car.',
    metaDescAr: 'دليل متكامل للتخطيط لزيارات مكة التاريخية. أفضل الأوقات لتفادي الزحام، نصائح لكبار السن، واختيار السيارة الخاصة المناسبة.',
    summaryEn: 'Practical guidance for pilgrims seeking to explore the sacred geography of Makkah (Cave Hira, Jabal Thawr, Mina, Muzdalifah, and Arafat) in serene comfort.',
    summaryAr: 'إرشادات عملية لضيوف الرحمن لاستكشاف المعالم التاريخية بمكة المكرمة (حراء، ثور، منى، عرفات) بأقصى درجات الراحة والتنظيم.',
    lastUpdated: 'October 2026',
    contentEn: [
      'Makkah is framed by profound spiritual history extending far beyond the immediate precinct of the Grand Mosque. A thoughtful Ziyarat excursion enriches your Umrah experience by bringing prophetic milestones to life.',
      'Optimal Timing: Makkah experiences high mid-day temperatures year-round. We advise initiating your morning tour at 6:30 AM immediately following Fajr prayer or planning an afternoon excursion starting after Asr (around 4:00 PM).',
      'Grouping Your Stops: Jabal Thawr and Arafat form a natural southern and southeastern circuit, while Mina, Muzdalifah, and Jabal al-Noor lie along the eastern and northern corridor. A private chauffeur seamlessly links these locations in 3.5 hours.',
      'Accessibility Focus: If traveling with elderly family members, prioritize vehicular viewing stops rather than mountain ascents. Both the Hira Cultural District and the Jabal ar-Rahmah base plaza provide paved wheelchair-friendly vantage points.',
    ],
    contentAr: [
      'تزخر مكة المكرمة بتاريخ إيماني عظيم يمتد إلى ما هو أبعد من أروقة المسجد الحرام، وتمنح زيارة هذه المعالم المعتمر بعداً روحياً وتاريخياً يعزز معايشته لسيرة المصطفى ﷺ.',
      'أفضل أوقات الانطلاق: ترتفع درجات الحرارة نهاراً في مكة طوال العام، لذا يُنصح بالانطلاق في الصباح الباكر عند الساعة 6:30 صباحاً بعد صلاة الفجر، أو بعد صلاة العصر عند الرابعة عصراً.',
      'ترتيب المسارات: يقع جبل ثور وعرفات في المسار الجنوبي والجنوبي الشرقي، بينما تتكامل منى ومزدلفة وجبل النور في المحور الشرقي والشمالي، وتتيح السيارة الخاصة زيارة هذه المعالم جميعاً في 3.5 إلى 4 ساعات بانسيابية تامة.',
      'رعاية كبار السن: احرص على الاكتفاء بالمشاهدة من السيارة أو الساحات السفلية الممهدة وتجنب صعود الجبال الشاقة حفاظاً على صحتهم وسلامتهم.',
    ],
  },

  'how-to-plan-ziyarat-madinah': {
    slug: 'how-to-plan-ziyarat-madinah',
    titleEn: 'How to Plan Your Ziyarat in Madinah: Complete Chauffeur Guide (2026)',
    titleAr: 'كيف تخطط لزيارة مزارات المدينة المنورة: دليل التنقل الخاص (2026)',
    metaDescEn: 'How to organize your historical tour in Madinah: Masjid Quba, Mount Uhud, Qiblatayn. Distances from Haram, dress etiquette, and private car options.',
    metaDescAr: 'طريقة ترتيب جولة مزارات المدينة المنورة: مسجد قباء، شهداء أحد، القبلتين، والخندق. المسافات، أوقات الزيارة، ومزايا السيارة الخاصة.',
    summaryEn: 'Step-by-step itinerary to visit the most beloved prophetic landmarks in the City of the Prophet (PBUH) with ease.',
    summaryAr: 'خطة زمنية مرتبة لزيارة المعالم النبوية الشريفة في المدينة المنورة بكل يسر وطمأنينة.',
    lastUpdated: 'October 2026',
    contentEn: [
      'Madinah features compact, flat geography compared to Makkah, making a 3-hour private car tour exceptionally comfortable and spiritually uplifting.',
      'The Prophetic Saturday Sunnah: The Prophet (PBUH) frequently visited Masjid Quba on Saturdays. If your schedule allows, Saturday morning is a cherished time to perform wudu in your hotel room and pray in Quba.',
      'Uhud Martyrs Respect: Mount Uhud is best visited when the morning air is clear. Take time to stand in quiet reflection at the Martyrs Cemetery and climb the modest steps of Archers\' Hill.',
      'Chauffeur Advantage: Parking around Masjid al-Qiblatayn and the Seven Mosques can be challenging during prayer times. Having a dedicated chauffeur eliminates parking search delays and ensures you never walk under direct sunlight.',
    ],
    contentAr: [
      'تتميز المدينة المنورة بطبيعتها السهلية المستوية مقارنة بمكة، مما يجعل جولة المزارات فيها لمدة 3 ساعات تجربة مريحة وممتعة لجميع أفراد الأسرة.',
      'سنة زيارة قباء يوم السبت: كان النبي ﷺ يقصد مسجد قباء كل سبت ماشياً وراكباً. فإذا ناسب ذلك جدولكم، فإن صباح السبت وقت مبارك للاقتداء بهذه السنة الشريفة.',
      'أدب الزيارة في أحد: جبل أحد معلم يحمل ذكريات جليلة، ويستحب الوقوف للسلام على الشهداء الكرام وصعود جبل الرماة الميسر للاطلاع على معالم الغزوة.',
      'ميزة السائق الخاص: تزدحم مواقف المساجد التاريخية قرب مواقيت الصلاة؛ ووجود سيارة خاصة مع سائق يعفيك تماماً من عناء البحث عن موقف أو المشي تحت حرارة الشمس.',
    ],
  },

  'best-time-to-visit-ziyarat': {
    slug: 'best-time-to-visit-ziyarat',
    titleEn: 'Best Time to Visit Ziyarat Sites in Makkah & Madinah (2026)',
    titleAr: 'أفضل الأوقات لزيارة مزارات مكة والمدينة وتجنب الزحام والحرارة (2026)',
    metaDescEn: 'Comprehensive guide to the best hours and seasons for Ziyarat in Makkah and Madinah. Climate advice, lighting for photography, and crowd avoidance.',
    metaDescAr: 'دليل التوقيت المثالي لزيارات مكة والمدينة: درجات الحرارة، تجنب أوقات الذروة، إضاءة التصوير، وأوقات صلاة المزارات.',
    summaryEn: 'Strategic timing recommendations to ensure peaceful, unhurried, and comfortable historical visits.',
    summaryAr: 'توصيات توقيت استراتيجية لضمان رحلة هادئة ومريحة بعيداً عن أوقات الذروة وحرارة الشمس.',
    lastUpdated: 'October 2026',
    contentEn: [
      'Morning Window (6:30 AM - 10:00 AM): Unquestionably the best time across both holy cities. Cooler ambient temperatures, gentle morning light, and minimal traffic enable smooth transit between sites.',
      'Afternoon Window (4:00 PM - 6:30 PM): An excellent alternative for pilgrims who prefer resting after Fajr prayer. Arriving at Mount Arafat or Mount Uhud as the sun softens provides spectacular scenery.',
      'Midday Caution (11:30 AM - 3:00 PM): We recommend avoiding outdoor walking during peak solar hours, especially between May and September when temperatures exceed 42°C.',
      'Hajj Season Restrictions: During the annual Hajj window (Dhul-Hijjah 1-14), access to Mina, Muzdalifah, and Arafat is strictly restricted to licensed pilgrims. Our admin system automatically deactivates Hajj zone tours during this period.',
    ],
    contentAr: [
      'الفترة الصباحية الذهبية (6:30 - 10:00 صباحاً): بلا شك هي التوقيت الأفضل في مكة والمدينة، حيث تكون الأجواء معتدلة والحركة المرورية انسيابية.',
      'فترة العصر (4:00 - 6:30 مساءً): خيار ممتاز للعائلات التي تفضل الاستراحة في الفندق ظهراً، وتتيح إضاءة ما قبل الغروب التقاط صور تذكارية غاية في الجمال.',
      'تجنب فترة الظهيرة (11:30 صباحاً - 3:00 عصراً): ننصح بشدة بتجنب الزيارات الخارجية في هذا الوقت، خاصة في أشهر الصيف حيث تتجاوز الحرارة 42 درجة مئوية.',
      'تنظيمات موسم الحج: خلال أيام الحج السنوية تخضع مشاعر منى وعرفة لضوابط تنظيمية مشددة تمنع دخول السيارات غير المصرحة، ويقوم نظامنا تلقائياً بتعليق حجز هذه المسارات في تلك الفترة.',
    ],
  },

  'ziyarat-elderly-children': {
    slug: 'ziyarat-elderly-children',
    titleEn: 'Ziyarat with Elderly Parents & Children: Safe Family Travel (2026)',
    titleAr: 'دليل زيارة المزارات مع كبار السن والأطفال: الراحة والسلامة (2026)',
    metaDescEn: 'Essential tips for visiting Makkah and Madinah Ziyarat with seniors and young children. Vehicle selection, wheelchair access, and hydration protocols.',
    metaDescAr: 'نصائح حيوية لزيارة مزارات مكة والمدينة بصحبة الوالدين والأطفال. اختيار السيارة الواسعة، مسارات الكراسي المتحركة، والراحة التامة.',
    summaryEn: 'Practical guidance on choosing vehicles with low-entry steps, ensuring continuous air conditioning, and pacing visits for all generations.',
    summaryAr: 'إرشادات لاختيار السيارات المناسبة لكبار السن (كالميني فان الفسيحة) وضمان راحتهم وسهولة صعودهم ونزولهم.',
    lastUpdated: 'October 2026',
    contentEn: [
      'Traveling with parents performing their lifetime pilgrimage is a sacred honor. Prioritizing their physical ease ensures the journey remains memorable and uplifting.',
      'Vehicle Selection: For elderly guests who find climbing into high SUVs challenging, the Hyundai Staria VIP features low slide-in side steps, individual reclining captain chairs, and expansive windows. For multi-generational families of 8+, the Toyota HiAce minibus provides ample aisle room.',
      'Luggage & Wheelchairs: All our family vans and SUVs easily accommodate folded wheelchairs alongside regular luggage without compromising passenger legroom.',
      'Pacing: Never rush between sites. Inform your chauffeur if your parents need extra time to rest in the air-conditioned cabin while other family members take photographs.',
    ],
    contentAr: [
      'مرافقة الوالدين وكبار السن في رحلتهم الإيمانية شرف عظيم، وتوفير سبل الراحة لهم هو المفتاح لرحلة ميسرة تحفظ صحتهم وطاقتهم.',
      'اختيار السيارة المناسبة: لكبار السن الذين قد يجدون صعوبة في صعود سيارات الدفع الرباعي المرتفعة، توفر سيارة هيونداي ستاريا VIP عتبات دخول منخفضة ومقاعد طيارة مريحة مع نوافذ بانورامية واسعة. وللعائلات الكبيرة، تعتبر تويوتا هايس الخيار الأمثل.',
      'استيعاب الكراسي المتحركة: تتسع سياراتنا لحمل الكراسي المتحركة المطوية بسهولة تامة مع حقائب العائلة دون التأثير على مساحة الأرجل.',
      'التأني وعدم الاستعجال: أخبر السائق دائماً إذا كان الوالدان يفضلان البقاء في السيارة المكيفة في بعض التوقفات مع التمتع بالمشاهدة من النافذة.',
    ],
  },

  'ziyarat-etiquette': {
    slug: 'ziyarat-etiquette',
    titleEn: 'Sacred Sites Etiquette & Visitor Manners in Makkah and Madinah',
    titleAr: 'آداب وضوابط زيارة المعالم التاريخية والمقدسة في مكة والمدينة',
    metaDescEn: 'Proper etiquette, attire, and decorum when visiting historical Islamic sites in Makkah and Madinah. Authentic sunnah guidance and respectful travel.',
    metaDescAr: 'الآداب والضوابط الشرعية والنظامية لزيارة المعالم والمزارات في مكة المكرمة والمدينة المنورة. تعظيم الشعائر والالتزام بالوقار.',
    summaryEn: 'Fundamental manners to observe at holy battlefields, mosques, and mountains to preserve sanctity and historical heritage.',
    summaryAr: 'الآداب الواجب مراعاتها عند زيارة المساجد التاريخية ومواقع السيرة النبوية لتعظيم حرمتها والحفاظ على التراث.',
    lastUpdated: 'October 2026',
    contentEn: [
      'Visiting historic sites is an opportunity for learning, reflection (I\'tibar), and reviving love for the Prophet (PBUH) and his noble companions.',
      'Dress Modesty: Both men and women should wear modest, respectful clothing covering the awrah. For women, loose abayas and head coverings are standard across all sacred premises.',
      'Avoiding Unprescribed Practices: The scholars of Saudi Arabia and the Islamic world emphasize that stones, trees, and earth at historical sites possess no divine healing or blessings in themselves. Supplication should be directed exclusively to Allah Almighty.',
      'Environmental Custodianship: Littering at historical sites is strictly prohibited by Saudi municipal authorities. Please dispose of water bottles in designated bins and preserve the cleanliness of these sacred lands.',
    ],
    contentAr: [
      'زيارة المعالم التاريخية والمساجد الأثرية فرصة عظيمة للعظة والاعتبار واستحضار بطولات السيرة النبوية العطرة وتضحيات الصحابة الكرام.',
      'الاحتشام واللباس اللائق: ينبغي الالتزام التام باللباس الساتر والمحتشم الذي يليق بقدسية هذه الأماكن المباركة.',
      'تجنب الممارسات المخالفة للسنة: يؤكد علماء الأمة على أن الأحجار والأتربة في هذه المواقع التاريخية لا تملك نفعاً ولا ضراً بذاتها، وإنما المشروع هو الاعتبار والدعاء لله وحده مخلصين له الدين.',
      'المحافظة على النظافة والبيئة: تحظر الأنظمة والتعليمات في المملكة إلقاء المخلفات؛ ويجب الحرص التام على وضع النفايات في الأماكن المخصصة صوناً لقداسة هذه البقاع الطاهرة.',
    ],
  },
};
