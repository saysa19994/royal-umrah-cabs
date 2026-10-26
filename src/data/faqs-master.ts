export interface MasterFaqItem {
  id: string;
  category: 'home' | 'booking' | 'cancellation' | 'ziyarat' | 'vehicles' | 'routes' | 'general';
  subCategory?: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  isOperational: boolean;
  needsOwnerConfirmation: boolean;
  status: 'published' | 'draft';
  lastVerifiedDate: string;
  source: string;
}

export const MASTER_FAQS_INITIAL: MasterFaqItem[] = [
  // --- HOME / GENERAL FAQS ---
  {
    id: 'home-1',
    category: 'home',
    questionEn: 'How does private chauffeur transfer work for Umrah pilgrims?',
    questionAr: 'كيف تعمل خدمة النقل الخاص بالسائق لضيوف الرحمن؟',
    answerEn:
      'We provide pre-arranged private door-to-door transportation. Your assigned driver tracks your flight, welcomes your family at the arrivals hall with a personalized sign, assists with luggage, and drives you directly to your hotel in Makkah or Madinah in an executive air-conditioned vehicle.',
    answerAr:
      'نقدم خدمة نقل خاصة مباشرة من الباب إلى الباب. يتابع سائقكم موعد رحلتكم، ويستقبلكم في صالة الوصول بلوحة تحمل اسمكم، ويساعد في تحميل الحقائب، وينطلق بكم مباشرة إلى فندقكم بمكة أو المدينة في سيارة مكيفة وحديثة.',
    isOperational: true,
    needsOwnerConfirmation: false,
    status: 'published',
    lastVerifiedDate: 'October 2026',
    source: 'Duyuf Alrahman VIP Service Charter',
  },
  {
    id: 'home-2',
    category: 'home',
    questionEn: 'Are prices fixed or subject to peak/traffic surcharges?',
    questionAr: 'هل الأسعار ثابتة أم خاضعة لزيادات المواسم أو الزحام؟',
    answerEn:
      'All our fares are 100% fixed and transparent. Once booked, your price will never increase due to highway congestion, airport parking waits, or flight delays. The price you see is the exact amount you pay.',
    answerAr:
      'كافة أسعارنا ثابتة وشفافة 100%. بمجرد تأكيد حجزك، لن يرتفع السعر بسبب زحام الطرق أو رسوم مواقف المطار أو تأخر الطيران. السعر المعروض هو السعر الفعلي الذي تدفعه.',
    isOperational: true,
    needsOwnerConfirmation: false,
    status: 'published',
    lastVerifiedDate: 'October 2026',
    source: 'General Authority of Transport Guidelines',
  },
  {
    id: 'home-3',
    category: 'home',
    questionEn: 'What payment methods and currencies do you accept?',
    questionAr: 'ما طرق الدفع والعملات المقبولة لديكم؟',
    answerEn: 'The only accepted payment method is cash paid directly to your private driver upon arrival at your destination for your trip. We operate on a zero-advance-deposit policy, and no prepayment is required.',
    answerAr:
      'نقبل الدفع نقداً فقط، ويتم سداده مباشرةً للسائق بعد انتهاء رحلتك ووصولك إلى وجهتك. يمكنك الدفع بالريال السعودي (SAR) أو الدولار الأمريكي (USD). لا نقبل بطاقات الائتمان أو بطاقات الخصم أو أجهزة نقاط البيع (POS) أو الدفع الإلكتروني أو التحويلات البنكية. لا يلزم أي دفع مسبق أو عربون.',
    isOperational: true,
    needsOwnerConfirmation: true,
    status: 'published',
    lastVerifiedDate: 'October 2026',
    source: 'Duyuf Alrahman VIP Financial Operations',
  },
  {
    id: 'home-4',
    category: 'home',
    questionEn: 'What is the flight delay waiting policy at the airport?',
    questionAr: 'ما هي سياسة الانتظار في حال تأخر رحلة الطيران؟',
    answerEn:
      'We monitor all flights using live radar. Your complimentary waiting window (60 to 90 minutes [needs owner confirmation]) begins only after your aircraft touches down, giving you ample time for passport control and luggage retrieval without extra charges.',
    answerAr:
      'نتابع جميع الرحلات عبر رادار الطيران المباشر. تبدأ فترة الانتظار المجانية (من 60 إلى 90 دقيقة [تحت تأكيد المالك]) فقط بعد هبوط الطائرة الفعلي، مما يمنحكم وقتاً كافياً لإنهاء الجوازات واستلام الأمتعة دون رسوم إضافية.',
    isOperational: true,
    needsOwnerConfirmation: true,
    status: 'published',
    lastVerifiedDate: 'October 2026',
    source: 'GACA Passenger Rights Guidelines',
  },

  // --- BOOKING FAQS ---
  {
    id: 'booking-1',
    category: 'booking',
    questionEn: 'How far in advance should I reserve our transfer?',
    questionAr: 'كم من الوقت مسبقاً يجب عليّ حجز وسيلة النقل؟',
    answerEn:
      'We recommend reserving at least 12 to 24 hours in advance to guarantee vehicle class availability. During peak Umrah seasons (Ramadan and Rabi’ al-Awwal), booking 48 hours to 1 week in advance is strongly advised.',
    answerAr:
      'ننصح بالحجز قبل 12 إلى 24 ساعة على الأقل لضمان توفر فئة السيارة المطلوبة. وخلال مواسم الذروة (مثل شهر رمضان وموسم رجب وشعبان)، يفضل الحجز قبل 48 ساعة إلى أسبوع مسبقاً.',
    isOperational: true,
    needsOwnerConfirmation: true,
    status: 'published',
    lastVerifiedDate: 'October 2026',
    source: 'Fleet Dispatch Scheduling Protocol',
  },
  {
    id: 'booking-2',
    category: 'booking',
    questionEn: 'How do I know my booking is confirmed?',
    questionAr: 'كيف أتأكد من أن حجزي مؤكد رسمياً؟',
    answerEn:
      'Immediately upon booking, you receive a unique Reference Code (e.g., REF-A-XXXX). Our dispatch team contacts you via WhatsApp with driver details, vehicle plate number, and phone number 2 to 3 hours prior to pickup.',
    answerAr:
      'بمجرد إتمام الحجز، يصدر لك كود مرجعي فريد (مثل: REF-A-XXXX). ويتواصل معك فريق التنسيق عبر الواتساب لتزويدك ببيانات السائق ورقم لوحة السيارة ورقم هاتفه المباشر قبل ساعتين إلى ثلاث ساعات من موعد الوصول.',
    isOperational: true,
    needsOwnerConfirmation: false,
    status: 'published',
    lastVerifiedDate: 'October 2026',
    source: 'Duyuf Alrahman Dispatch System',
  },

  // --- CANCELLATION FAQS ---
  {
    id: 'cancel-1',
    category: 'cancellation',
    questionEn: 'What is the cancellation policy if our flight is rescheduled or canceled?',
    questionAr: 'ما هي سياسة الإلغاء إذا تأجلت أو ألغيت رحلتنا الجوية؟',
    answerEn:
      'We offer 100% free cancellation up to 24 hours prior to scheduled pickup time [needs owner confirmation]. If an airline cancels your flight, simply notify us via WhatsApp with your booking reference and updated schedule.',
    answerAr:
      'نوفر إلغاءً مجانياً 100% حتى 24 ساعة قبل موعد الرحلة المحدد [تحت تأكيد المالك]. وإذا ألغت شركة الطيران رحلتكم، يكفي إشعارنا عبر الواتساب مع رقم الحجز وموعدكم الجديد.',
    isOperational: true,
    needsOwnerConfirmation: true,
    status: 'published',
    lastVerifiedDate: 'October 2026',
    source: 'Site Settings Policy',
  },

  // --- VEHICLES & LUGGAGE FAQS ---
  {
    id: 'vehicle-1',
    category: 'vehicles',
    questionEn: 'How do I choose the right vehicle for our family and luggage?',
    questionAr: 'كيف أختار السيارة المناسبة لعدد أفراد عائلتي وحقائبنا؟',
    answerEn:
      'Toyota Camry seats up to 4 passengers with 3 bags; Hyundai Staria VIP seats up to 7 passengers with 6 bags; GMC Yukon XL VIP seats up to 7 passengers with 8 heavy bags; Toyota HiAce accommodates up to 10 passengers with 10 bags; and Toyota Coaster VIP Coach hosts up to 21 passengers with 20 bags.',
    answerAr:
      'تويوتا كامري تتسع حتى 4 ركاب مع 3 حقائب؛ هيونداي ستاريا VIP تتسع حتى 7 ركاب مع 6 حقائب؛ جي إم سي يوكون XL تتسع حتى 7 ركاب مع 8 حقائب كبيرة؛ تويوتا هايس تتسع حتى 10 ركاب مع 10 حقائب؛ وتويوتا كوستر VIP تتسع حتى 21 راكباً مع 20 حقيبة.',
    isOperational: true,
    needsOwnerConfirmation: false,
    status: 'published',
    lastVerifiedDate: 'October 2026',
    source: 'Fleet Technical Specifications Audit',
  },
  {
    id: 'vehicle-2',
    category: 'vehicles',
    questionEn: 'Are child safety seats available for infants and toddlers?',
    questionAr: 'هل تتوفر مقاعد أمان للأطفال والرضع؟',
    answerEn:
      'Yes. Child and infant safety seats are provided complimentary upon advance request during booking to ensure compliance with Saudi traffic safety standards [needs owner confirmation].',
    answerAr:
      'نعم، نوفر مقاعد أمان للأطفال والرضع مجاناً عند طلبها مسبقاً أثناء الحجز لضمان راحة وسلامة أطفالكم وفق معايير السلامة المرورية [تحت تأكيد المالك].',
    isOperational: true,
    needsOwnerConfirmation: true,
    status: 'published',
    lastVerifiedDate: 'October 2026',
    source: 'Fleet Safety Standards',
  },

  // --- ZIYARAT FAQS ---
  {
    id: 'ziyarat-1',
    category: 'ziyarat',
    questionEn: 'What historic landmarks are included in Makkah and Madinah Ziyarat tours?',
    questionAr: 'ما هي المعالم التاريخية المشمولة في جولات المزارات بمكة والمدينة؟',
    answerEn:
      'In Makkah, tours cover Jabal al-Nour (Cave of Hira exterior), Jabal Thawr, Mina, Muzdalifah, and Jabal ar-Rahmah at Arafat. In Madinah, tours cover Masjid Quba, Mount Uhud and Martyrs Cemetery, Masjid al-Qiblatayn, and the Battle of the Trench (Seven Mosques). Note: our tours strictly provide transportation and historical orientation without religious rulings.',
    answerAr:
      'في مكة المكرمة تشمل الجولة جبل النور (غار حراء من الخارج)، جبل ثور، منى، مزدلفة، وجبل الرحمة بعرفات. وفي المدينة المنورة تشمل مسجد قباء، جبل أحد ومقبرة الشهداء، مسجد القبلتين، وموقع غزوة الخندق (المساجد السبعة). علماً بأن خدماتنا مخصصة للتنقل والتعريف الجغرافي دون تقديم فتاوى دينية.',
    isOperational: false,
    needsOwnerConfirmation: false,
    status: 'published',
    lastVerifiedDate: 'October 2026',
    source: 'Historical Pilgrimage Sites Register',
  },
];
