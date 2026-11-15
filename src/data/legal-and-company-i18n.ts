import { Locale } from '@/i18n/config';

export interface PolicySection {
  heading: string;
  body: string;
}

export interface LegalPagesLocaleData {
  updatedLabel: string;
  privacy: {
    desc: string;
    sections: PolicySection[];
  };
  terms: {
    desc: string;
    sections: PolicySection[];
  };
  cancellation: {
    subtitle: string;
    banner: string;
    sections: PolicySection[];
    manageBtn: string;
    whatsappBtn: string;
  };
  cookies: {
    desc: string;
    sections: PolicySection[];
  };
  safety: {
    badge: string;
    title: string;
    subtitle: string;
    pillars: {
      title: string;
      desc: string;
      bullets: [string, string, string];
    }[];
    ctaTitle: string;
    ctaDesc: string;
  };
  partners: {
    badge: string;
    title: string;
    subtitle: string;
    cards: { title: string; desc: string }[];
    ctaTitle: string;
    ctaDesc: string;
    waBtn: string;
    contactBtn: string;
  };
}

export const LEGAL_AND_COMPANY_I18N: Record<Locale, LegalPagesLocaleData> = {
  ar: {
    updatedLabel: 'آخر تحديث: نوفمبر 2026',
    privacy: {
      desc: 'سياسة الخصوصية وحماية بيانات الضيوف في ضيوف الرحمن VIP.',
      sections: [
        {
          heading: '1. البيانات التي نجمعها',
          body: 'عند حجز خدمة سائق خاص عبر ضيوف الرحمن VIP، نجمع فقط البيانات الضرورية لتنسيق رحلتك: الاسم الكامل، رقم الجوال/واتساب، البريد الإلكتروني (اختياري)، موعد وتاريخ السفر، رقم الرحلة الجوية (لتتبع الوصول الراداري)، وعناوين الانطلاق والوصول.',
        },
        {
          heading: '2. كيفية استخدام بياناتك',
          body: 'تُستخدم بيانات التواصل ورقم الرحلة حصرياً لتنسيق عمليات التشغيل، وإرسال تفاصيل السائق عبر واتساب، ومتابعة مواعيد هبوط الطيران لضمان جاهزية السائق في صالة القدوم.',
        },
        {
          heading: '3. عدم مشاركة أو بيع البيانات الشخصية',
          body: 'نحن لا نبيع أو نؤجر أو نشارك بياناتك الشخصية مع أي جهات تسويقية خارجية. تتم مشاركة تفاصيل الرحلة فقط مع السائق المعتمد المخصص لخدمتك.',
        },
        {
          heading: '4. أمن وحماية المعلومات',
          body: 'تُحمى جميع الاتصالات بتشفير TLS/SSL وتُخزن البيانات في قواعد بيانات سحابية مؤمنة بسياسات صارمة للصلاحيات (Row Level Security). للتواصل: info@duyufalrahmanvip.com أو واتساب +966567588261.',
        },
      ],
    },
    terms: {
      desc: 'الشروط والأحكام المعتمدة لخدمات النقل البري والليموزين في ضيوف الرحمن VIP.',
      sections: [
        {
          heading: '1. طبيعة الخدمة',
          body: 'تقدم ضيوف الرحمن VIP خدمات نقل خاصة بسيارات حديثة مع سائق بين مطار جدة (KAIA)، مكة المكرمة، والمدينة المنورة. كل حجز يخصص مركبة مستقلة بالكامل للضيف وعائلته.',
        },
        {
          heading: '2. الأسعار الثابتة وسياسة الدفع النقدي',
          body: 'جميع الأسعار المعلنة ثابتة للمركبة بالكامل وشاملة للوقود والضرائب ورسوم الطرق السريعة. يتم الدفع نقداً فقط مباشرة للسائق بعد انتهاء الرحلة ووصول العميل إلى الوجهة المطلوبة (بالريال السعودي أو الدولار الأمريكي). لا نقبل البطاقات الائتمانية أو نقاط البيع أو التحويلات البنكية، ولا يلزم أي عربون مسبق.',
        },
        {
          heading: '3. استقبال المطار وتأخر الرحلات',
          body: 'نتابع رحلتك الجوية عبر الرادار تلقائياً، وتشمل الخدمة 60 دقيقة انتظار مجاني من لحظة الهبوط الفعلي للطائرة دون أي رسوم إضافية عند تأخر الطيران.',
        },
        {
          heading: '4. سعة الركاب والأمتعة والتدخين',
          body: 'يرجى الالتزام بالسعة المعتمدة لكل مركبة من الركاب والحقائب لضمان السلامة والراحة. يُمنع التدخين منعاً باتاً داخل جميع مركبات الأسطول.',
        },
      ],
    },
    cancellation: {
      subtitle: 'مرونة كاملة • إلغاء مجاني • بدون أي رسوم مسبقة',
      banner: 'يُسمح بالإلغاء أو التعديل مجاناً حتى 24 ساعة قبل موعد الانطلاق المحدد دون أي غرامات.',
      sections: [
        {
          heading: '1. سياسة الإلغاء المجاني قبل 24 ساعة',
          body: 'ندرك أن مواعيد الطيران وتأشيرات العمرة قد تتغير؛ لذلك يمكنك إلغاء أو تعديل حجزك مجاناً بالكامل حتى 24 ساعة قبل موعد الاستقبال.',
        },
        {
          heading: '2. صفر دفعة مقدمة = راحة بال تامة',
          body: 'نظراً لأن الدفع يتم نقداً للسائق بعد إتمام الرحلة والوصول للوجهة بدون أي عربون مسبق، فلن تواجه أي استقطاعات بنكية أو انتظار لاسترداد المبالغ.',
        },
        {
          heading: '3. التعديلات الطارئة خلال 24 ساعة',
          body: 'في حال تغير موعد رحلتك الجوية قبل أقل من 24 ساعة، يرجى إبلاغ فريق العمليات فوراً عبر واتساب +966567588261 لإعادة جدولة السائق مجاناً.',
        },
      ],
      manageBtn: 'إدارة الحجز',
      whatsappBtn: 'تواصل عبر واتساب',
    },
    cookies: {
      desc: 'سياسة ملفات تعريف الارتباط والتخزين التقني في موقع ضيوف الرحمن VIP.',
      sections: [
        {
          heading: '1. ما هي ملفات تعريف الارتباط (Cookies)؟',
          body: 'هي ملفات تقنية صغيرة تُحفظ على متصفحك لتذكر لغة العرض المفضلة لديك (من بين اللغات العشر المدعومة)، والعملة المختارة (SAR أو USD)، والوضع النهاري أو الليلي.',
        },
        {
          heading: '2. ملفات التشغيل الأساسية فقط',
          body: 'نستخدم ملفات تعريف ارتباط أساسية فقط لحفظ تفضيلات اللغة والمظهر ومسودة الحجز، ولا نستخدم أي ملفات تتبع إعلانية متطفلة.',
        },
      ],
    },
    safety: {
      badge: 'أمان وطمأنينة ضيوف الرحمن',
      title: 'معايير السلامة وبروتوكول السائقين',
      subtitle: 'تتطلب رحلتكم المباركة أعلى مستويات الأمان والنظافة والاحترام المهني من لحظة الوصول وحتى المغادرة.',
      pillars: [
        {
          title: 'سائقون معتمدون ومؤهلون',
          desc: 'يخضع كل سائق للتحقق النظامي وفحص رخص القيادة المهنية والتدريب على آداب ضيافة المعتمرين.',
          bullets: [
            'سائقون يتحدثون العربية والإنجليزية بطلاقة',
            'معرفة دقيقة بمداخل المنطقة المركزية في مكة والمدينة',
            'التزام تام بالزي الرسمي والهدوء والأمانة',
          ],
        },
        {
          title: 'فحص فني شامل من 25 نقطة',
          desc: 'تخضع المركبات لفحص ميكانيكي يومي قبل الانطلاق على طريق الهجرة السريع.',
          bullets: [
            'فحص يومي للإطارات والمكابح وأنظمة الثبات',
            'تكييف هوائي مزدوج مفحوص قبل كل رحلة',
            'منع التدخين نهائياً داخل كافة المقصورات',
          ],
        },
        {
          title: 'عناية خاصة بكبار السن والعائلات',
          desc: 'نراعي راحة الوالدين والأطفال من خلال القيادة الهادئة والمساعدة الكاملة في الأمتعة.',
          bullets: [
            'عتبات صعود منخفضة وأبواب واسعة لكبار السن',
            'قيادة متزنة وهادئة على الطرق السريعة',
            'توقفات مريحة للصلاة والاستراحة والميقات',
          ],
        },
        {
          title: 'غرفة عمليات ومتابعة 24/7',
          desc: 'يتابع فريق التنسيق رحلتك على مدار الساعة لتقديم الدعم الفوري في أي وقت.',
          bullets: [
            'تتبع راداري مباشر لمواعيد هبوط الطيران',
            'منسق واتساب مخصص لكل حجز',
            'الدفع نقداً للسائق بعد إتمام الرحلة والوصول بأمان',
          ],
        },
      ],
      ctaTitle: 'سافر بأمان وطمأنينة تامة',
      ctaDesc: 'احجز رحلتك الخاصة اليوم بأسعار ثابتة وبدون أي دفعة مقدمة، مع الدفع نقداً للسائق بعد انتهاء الرحلة والوصول للوجهة.',
    },
    partners: {
      badge: 'شراكات وكالات السفر وحملات العمرة',
      title: 'شراكة الأعمال B2B مع ضيوف الرحمن VIP',
      subtitle: 'نتعاون مع وكالات السفر ومنظمي رحلات العمرة حول العالم لتقديم خدمات نقل بري موثوقة للمعتمرين في جدة ومكة والمدينة.',
      cards: [
        {
          title: 'أسعار تعاقدية للوكالات',
          desc: 'أسعار ثابتة ومحددة لعقود الموسم الكامل وتفويج المجموعات والعائلات.',
        },
        {
          title: 'منسق عمليات مخصص',
          desc: 'مشرف عمليات مباشر عبر واتساب لإدارة جداول الوصول وتخصيص المركبات.',
        },
        {
          title: 'بيانات رحلات واضحة',
          desc: 'تأكيدات منظمة بأسماء الضيوف وأرقام الرحلات وتفاصيل السائقين.',
        },
      ],
      ctaTitle: 'هل ترغب في تنسيق نقل مجموعات العمرة؟',
      ctaDesc: 'تواصل مع فريق علاقات الوكالات لمناقشة جدول رحلاتكم وعدد الركاب والمسارات المطلوبة.',
      waBtn: 'تواصل مع قسم الوكالات عبر واتساب',
      contactBtn: 'إرسال طلب رسمي',
    },
  },
  en: {
    updatedLabel: 'Last Updated: November 2026',
    privacy: {
      desc: 'Privacy policy for Duyuf Alrahman VIP passenger dispatch and booking operations.',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'When you reserve private chauffeur transport through Duyuf Alrahman VIP, we collect only the details required to coordinate your transfer: full name, WhatsApp phone number, optional email address, travel date/time, flight number (for radar arrival tracking), and pickup/drop-off locations.',
        },
        {
          heading: '2. How Your Information Is Used',
          body: 'Your contact and flight details are used strictly for dispatch coordination, sending chauffeur details via WhatsApp, and monitoring flight touchdowns so your driver is ready on arrival.',
        },
        {
          heading: '3. Zero Selling of Personal Data',
          body: 'We never sell, rent, or trade your personal information to third-party marketers. Trip details are shared solely with your assigned chauffeur.',
        },
        {
          heading: '4. Data Security & Contact',
          body: 'All transmissions are protected by TLS/SSL encryption and Row Level Security (RLS). For privacy inquiries, contact info@duyufalrahmanvip.com or WhatsApp +966567588261.',
        },
      ],
    },
    terms: {
      desc: 'Terms of service and passenger transport conditions for Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Nature of Service',
          body: 'Duyuf Alrahman VIP provides private chauffeur transport between Jeddah Airport (KAIA), Makkah, and Madinah. Every booking reserves a dedicated private vehicle exclusively for your party.',
        },
        {
          heading: '2. Guaranteed Fixed Pricing & Cash Payment Policy',
          body: 'All quoted fares are fixed per vehicle and include highway tolls, airport parking, fuel, and VAT. Payment is made strictly in cash paid to the driver after the journey is completed and the customer reaches the requested destination in Saudi Riyals (SAR) or US Dollars (USD). Credit cards, debit cards, POS terminals, online payments, and bank transfers are not accepted. No advance payment or deposit is required.',
        },
        {
          heading: '3. Airport Meet & Greet & Flight Delays',
          body: 'We monitor flight arrivals via live radar. A 60-minute complimentary waiting window is included from actual flight touchdown, with automatic schedule adjustment if your flight is delayed.',
        },
        {
          heading: '4. Capacity & Non-Smoking Policy',
          body: 'Passengers must adhere to the verified seat and luggage capacities of the selected vehicle. Smoking is strictly prohibited inside all vehicles.',
        },
      ],
    },
    cancellation: {
      subtitle: 'Transparent • Honest • Zero Penalty Prior to 24 Hours',
      banner: 'Free cancellation and rescheduling are allowed up to 24 hours prior to scheduled pickup time with zero fees.',
      sections: [
        {
          heading: '1. 24-Hour Free Cancellation Policy',
          body: 'Flight schedules and travel plans can change. You may cancel or modify your reservation free of charge up to 24 hours before your scheduled pickup time.',
        },
        {
          heading: '2. Zero Prepayment = Immediate Peace of Mind',
          body: 'Because payment is made strictly in cash to the driver after journey completion with zero advance deposit, you never face bank refund delays or deduction fees.',
        },
        {
          heading: '3. Schedule Changes Within 24 Hours',
          body: 'If your flight is delayed or rescheduled within 24 hours of pickup, message our 24/7 WhatsApp dispatch at +966567588261 and we will adjust your pickup time.',
        },
      ],
      manageBtn: 'Manage Booking',
      whatsappBtn: 'Contact Dispatch on WhatsApp',
    },
    cookies: {
      desc: 'Cookie policy and technical storage usage on Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. What Are Cookies?',
          body: 'Cookies and local storage are small technical files stored in your browser to remember your preferred language (across all 10 supported locales), currency (SAR or USD), and Light/Dark theme selection.',
        },
        {
          heading: '2. Essential Operational Storage Only',
          body: 'We use strictly essential cookies to preserve your language, theme, and booking session without third-party ad-tracking profiles.',
        },
      ],
    },
    safety: {
      badge: 'Pilgrim Peace of Mind',
      title: 'Safety Standards & Chauffeur Protocol',
      subtitle: 'Your pilgrimage deserves uncompromising safety, cabin hygiene, and professional courtesy from arrival to departure.',
      pillars: [
        {
          title: 'Vetted Chauffeurs',
          desc: 'Every chauffeur undergoes license verification, route testing, and hospitality training before serving guests.',
          bullets: [
            'Chauffeurs communicating in Arabic and English',
            'Full familiarity with Makkah & Madinah hotel zones',
            'Professional attire and respectful demeanor',
          ],
        },
        {
          title: '25-Point Vehicle Inspection',
          desc: 'Vehicles undergo daily mechanical checks prior to highway dispatch.',
          bullets: [
            'Tires, brakes, and suspension verified daily',
            'High-output multi-zone climate control inspected before every trip',
            'Strict 100% non-smoking cabin policy enforced',
          ],
        },
        {
          title: 'Family & Elder Comfort',
          desc: 'Thoughtful assistance for families traveling with elderly parents and young children.',
          bullets: [
            'Easy step-in access and patient boarding assistance',
            'Smooth highway cruising without abrupt maneuvers',
            'Flexible stops for prayer, rest, and Miqat Ihram',
          ],
        },
        {
          title: '24/7 Operations Dispatch',
          desc: 'Our central dispatch monitors every journey around the clock.',
          bullets: [
            'Live flight arrival tracking synchronized with terminals',
            'Dedicated WhatsApp coordinator for every booking',
            'Cash paid to the driver after the journey is completed at destination',
          ],
        },
      ],
      ctaTitle: 'Travel with Total Peace of Mind',
      ctaDesc: 'Reserve your private chauffeur today with fixed fares, zero advance deposit, and cash paid to the driver after the journey is completed and the customer reaches the requested destination (SAR or USD).',
    },
    partners: {
      badge: 'Travel Agencies & Group Operators',
      title: 'Partner with Duyuf Alrahman VIP',
      subtitle: 'We collaborate with international Umrah agencies and tour operators to provide dependable VIP ground transport across Jeddah, Makkah, and Madinah.',
      cards: [
        {
          title: 'B2B Volume Rates',
          desc: 'Fixed contracted rates for seasonal allocations, multi-flight arrivals, and delegation fleets.',
        },
        {
          title: 'Dedicated Dispatch Lead',
          desc: 'One central WhatsApp coordinator manages all group manifests, flight updates, and hotel drop-offs.',
        },
        {
          title: 'Clear Manifest Tracking',
          desc: 'Structured trip confirmations, vehicle assignments, and punctual terminal meet-and-greet.',
        },
      ],
      ctaTitle: 'Ready to Coordinate Group Transportation?',
      ctaDesc: 'Contact our Agency Relations team with your group schedule, passenger count, and route requirements.',
      waBtn: 'Chat with Agency Relations on WhatsApp',
      contactBtn: 'Send Formal Inquiry',
    },
  },
  ms: {
    updatedLabel: 'Kemas Kini Terakhir: November 2026',
    privacy: {
      desc: 'Dasar privasi dan perlindungan data jemaah bagi Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Maklumat Yang Kami Kumpul',
          body: 'Semasa menempah pemandu peribadi melalui Duyuf Alrahman VIP, kami hanya mengumpul maklumat penting untuk menyelaraskan perjalanan anda: nama penuh, nombor WhatsApp, e-mel (pilihan), tarikh/masa perjalanan, nombor penerbangan, dan lokasi pengambilan/destinasi.',
        },
        {
          heading: '2. Penggunaan Maklumat Anda',
          body: 'Maklumat hubungan dan penerbangan digunakan khusus untuk operasi penghantaran pemandu melalui WhatsApp dan penjejakan radar ketibaan penerbangan.',
        },
        {
          heading: '3. Tiada Jualan Data Peribadi',
          body: 'Kami tidak sekali-kali menjual atau berkongsi data peribadi anda dengan pihak pemasaran luar. Maklumat perjalanan hanya dikongsi dengan pemandu yang ditugaskan.',
        },
        {
          heading: '4. Keselamatan Data & Hubungan',
          body: 'Semua penghantaran data dilindungi penyulitan TLS/SSL. Hubungi kami di info@duyufalrahmanvip.com atau WhatsApp +966567588261.',
        },
      ],
    },
    terms: {
      desc: 'Terma perkhidmatan dan syarat pengangkutan penumpang Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Sifat Perkhidmatan',
          body: 'Duyuf Alrahman VIP menyediakan pengangkutan pemandu peribadi antara Lapangan Terbang Jeddah (KAIA), Makkah, dan Madinah khusus untuk kumpulan anda.',
        },
        {
          heading: '2. Harga Tetap & Polisi Bayaran Tunai',
          body: 'Semua harga adalah tetap bagi setiap kenderaan termasuk tol lebuh raya, parkir lapangan terbang, bahan api, dan cukai. Bayaran dibuat secara tunai sahaja terus kepada pemandu selepas perjalanan selesai dan pelanggan tiba di destinasi yang diminta (dalam SAR atau USD). Kad kredit, kad debit, terminal POS, bayaran dalam talian, dan pindahan bank tidak diterima. Tiada deposit diperlukan.',
        },
        {
          heading: '3. Sambutan Lapangan Terbang & Kelewatan Penerbangan',
          body: 'Kami memantau ketibaan penerbangan melalui radar langsung dengan 60 minit masa menunggu percuma dari waktu pendaratan sebenar.',
        },
        {
          heading: '4. Kapasiti & Larangan Merokok',
          body: 'Penumpang hendaklah mematuhi had kapasiti tempat duduk dan bagasi setiap kenderaan. Merokok adalah dilarang sama sekali di dalam semua kenderaan.',
        },
      ],
    },
    cancellation: {
      subtitle: 'Telus • Jujur • Tiada Penalti Sebelum 24 Jam',
      banner: 'Pembatalan dan penjadualan semula percuma dibenarkan sehingga 24 jam sebelum waktu pengambilan tanpa sebarang caj.',
      sections: [
        {
          heading: '1. Polisi Pembatalan Percuma 24 Jam',
          body: 'Anda boleh membatalkan atau mengubah tempahan secara percuma sehingga 24 jam sebelum waktu pengambilan yang dijadualkan.',
        },
        {
          heading: '2. Tiada Bayaran Pendahuluan = Ketenangan Minda',
          body: 'Oleh kerana bayaran dibuat secara tunai kepada pemandu selepas selesai perjalanan tanpa deposit awal, anda tidak perlu risau tentang kelewatan bayaran balik.',
        },
        {
          heading: '3. Perubahan Dalam Tempoh 24 Jam',
          body: 'Jika jadual penerbangan anda berubah kurang daripada 24 jam sebelum ketibaan, hubungi pasukan WhatsApp 24/7 kami di +966567588261.',
        },
      ],
      manageBtn: 'Urus Tempahan',
      whatsappBtn: 'Hubungi Operasi di WhatsApp',
    },
    cookies: {
      desc: 'Dasar kuki dan penggunaan storan teknikal di laman web Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Apakah Itu Kuki?',
          body: 'Kuki dan storan pelayar menyimpan pilihan bahasa anda (daripada 10 bahasa yang disokong), mata wang (SAR atau USD), serta tema Cerah/Gelap.',
        },
        {
          heading: '2. Kuki Operasi Penting Sahaja',
          body: 'Kami hanya menggunakan kuki penting untuk mengekalkan sesi tempahan dan pilihan paparan anda tanpa penjejakan iklan pihak ketiga.',
        },
      ],
    },
    safety: {
      badge: 'Ketenangan Ibadah Jemaah',
      title: 'Standard Keselamatan & Protokol Pemandu',
      subtitle: 'Perjalanan ibadah anda memerlukan tahap keselamatan, kebersihan kabin, dan layanan profesional tertinggi.',
      pillars: [
        {
          title: 'Pemandu Terlatih & Disahkan',
          desc: 'Setiap pemandu melalui pengesahan lesen komersial dan latihan etika layanan tetamu.',
          bullets: [
            'Pemandu berbahasa Arab dan Inggeris',
            'Mahir dengan zon hotel Makkah & Madinah',
            'Berpakaian kemas dan bersopan santun',
          ],
        },
        {
          title: 'Pemeriksaan Kenderaan 25-Titik',
          desc: 'Kenderaan diperiksa setiap hari sebelum perjalanan lebuh raya jauh.',
          bullets: [
            'Tayar, brek dan sistem keselamatan diperiksa setiap hari',
            'Penyaman udara berkuasa tinggi diperiksa sebelum setiap perjalanan',
            'Polisi kabin 100% bebas asap rokok',
          ],
        },
        {
          title: 'Keselesaan Keluarga & Warga Emas',
          desc: 'Layanan sabar dan mesra untuk keluarga bersama ibu bapa warga emas dan kanak-kanak.',
          bullets: [
            'Akses masuk mudah dan bantuan mengangkat bagasi',
            'Pemanduan lebuh raya yang lancar dan tenang',
            'Hentian fleksibel untuk solat, rehat dan Miqat',
          ],
        },
        {
          title: 'Kawalan Operasi 24/7',
          desc: 'Pasukan operasi memantau perjalanan anda sepanjang masa.',
          bullets: [
            'Penjejakan radar ketibaan penerbangan secara langsung',
            'Penyelaras WhatsApp khusus untuk setiap tempahan',
            'Bayaran tunai kepada pemandu selepas tiba di destinasi',
          ],
        },
      ],
      ctaTitle: 'Mengembara Dengan Ketenangan Sepenuhnya',
      ctaDesc: 'Tempah pemandu peribadi anda hari ini dengan tambang tetap, tiada deposit awal, dan bayaran tunai kepada pemandu selepas selesai perjalanan (SAR atau USD).',
    },
    partners: {
      badge: 'Agensi Pelancongan & Pengendali Umrah',
      title: 'Rakan Kongsi B2B Duyuf Alrahman VIP',
      subtitle: 'Kami bekerjasama dengan agensi Umrah dan pengendali rombongan untuk menyediakan pengangkutan darat VIP yang boleh dipercayai di Jeddah, Makkah, dan Madinah.',
      cards: [
        {
          title: 'Kadar Kontrak B2B',
          desc: 'Kadar tetap untuk kontrak bermusim, ketibaan berbilang penerbangan, dan rombongan jemaah.',
        },
        {
          title: 'Penyelaras Operasi Khusus',
          desc: 'Satu penyelaras WhatsApp khusus menguruskan jadual kumpulan dan penghantaran hotel.',
        },
        {
          title: 'Pengurusan Jadual Jelas',
          desc: 'Pengesahan perjalanan teratur dan sambutan ketibaan tepat pada masanya.',
        },
      ],
      ctaTitle: 'Sedia Menyelaraskan Pengangkutan Kumpulan?',
      ctaDesc: 'Hubungi pasukan Hubungan Agensi kami dengan jadual kumpulan dan keperluan laluan anda.',
      waBtn: 'Hubungi Bahagian Agensi di WhatsApp',
      contactBtn: 'Hantar Pertanyaan Rasmi',
    },
  },
  id: {
    updatedLabel: 'Pembaruan Terakhir: November 2026',
    privacy: {
      desc: 'Kebijakan privasi dan perlindungan data jamaah Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Informasi yang Kami Kumpulkan',
          body: 'Saat memesan transportasi sopir privat melalui Duyuf Alrahman VIP, kami hanya mengumpulkan data penting untuk mengoordinasikan perjalanan Anda: nama lengkap, nomor WhatsApp, email (opsional), tanggal/waktu perjalanan, nomor penerbangan, dan lokasi penjemputan/tujuan.',
        },
        {
          heading: '2. Penggunaan Informasi Anda',
          body: 'Data kontak dan penerbangan digunakan khusus untuk koordinasi operasional, pengiriman detail sopir via WhatsApp, dan pemantauan radar kedatangan pesawat.',
        },
        {
          heading: '3. Tidak Menjual Data Pribadi',
          body: 'Kami tidak pernah menjual atau memperdagangkan informasi pribadi Anda kepada pihak pemasaran ketiga. Detail perjalanan hanya dibagikan kepada sopir resmi Anda.',
        },
        {
          heading: '4. Keamanan Data & Kontak',
          body: 'Seluruh transmisi data dilindungi enkripsi TLS/SSL. Hubungi kami di info@duyufalrahmanvip.com atau WhatsApp +966567588261.',
        },
      ],
    },
    terms: {
      desc: 'Syarat layanan dan ketentuan transportasi penumpang Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Sifat Layanan',
          body: 'Duyuf Alrahman VIP menyediakan layanan sopir privat antara Bandara Jeddah (KAIA), Makkah, dan Madinah dengan kendaraan khusus untuk rombongan Anda.',
        },
        {
          heading: '2. Harga Tetap & Kebijakan Pembayaran Tunai',
          body: 'Semua tarif bersifat tetap per kendaraan termasuk tol jalan raya, parkir bandara, bahan bakar, dan pajak. Pembayaran dilakukan secara tunai langsung kepada sopir setelah perjalanan selesai dan pelanggan tiba di tujuan yang diminta (dalam SAR atau USD). Kartu kredit, kartu debit, mesin POS/EDC, pembayaran online, dan transfer bank tidak diterima. Tanpa uang muka (DP).',
        },
        {
          heading: '3. Penjemputan Bandara & Keterlambatan Penerbangan',
          body: 'Kami memantau kedatangan pesawat melalui radar langsung dengan waktu tunggu gratis 60 menit sejak pesawat mendarat.',
        },
        {
          heading: '4. Kapasitas & Larangan Merokok',
          body: 'Penumpang wajib mematuhi kapasitas kursi dan bagasi yang tertera. Merokok dilarang keras di dalam seluruh armada kami.',
        },
      ],
    },
    cancellation: {
      subtitle: 'Transparan • Jujur • Tanpa Biaya Sebelum 24 Jam',
      banner: 'Pembatalan dan perubahan jadwal gratis tersedia hingga 24 jam sebelum waktu penjemputan tanpa denda.',
      sections: [
        {
          heading: '1. Kebijakan Pembatalan Gratis 24 Jam',
          body: 'Anda dapat membatalkan atau mengubah jadwal pemesanan secara gratis hingga 24 jam sebelum waktu penjemputan.',
        },
        {
          heading: '2. Tanpa Uang Muka = Ketenangan Penuh',
          body: 'Karena pembayaran dilakukan tunai kepada sopir setelah tiba di tujuan tanpa DP di awal, Anda bebas dari potongan biaya atau penantian pengembalian dana.',
        },
        {
          heading: '3. Perubahan Jadwal Dalam 24 Jam',
          body: 'Jika jadwal penerbangan Anda berubah dalam waktu kurang dari 24 jam, segera hubungi tim WhatsApp 24/7 kami di +966567588261.',
        },
      ],
      manageBtn: 'Kelola Pesanan',
      whatsappBtn: 'Hubungi Operasional di WhatsApp',
    },
    cookies: {
      desc: 'Kebijakan cookie dan penyimpanan teknis pada situs Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Apa Itu Cookie?',
          body: 'Cookie dan penyimpanan lokal browser menyimpan preferensi bahasa Anda (dari 10 bahasa yang didukung), mata uang (SAR atau USD), serta tema Terang/Gelap.',
        },
        {
          heading: '2. Hanya Cookie Operasional Esensial',
          body: 'Kami hanya menggunakan penyimpanan esensial untuk menjaga sesi pemesanan dan preferensi tampilan Anda tanpa pelacakan iklan pihak ketiga.',
        },
      ],
    },
    safety: {
      badge: 'Ketenangan Ibadah Jamaah',
      title: 'Standar Keselamatan & Protokol Sopir',
      subtitle: 'Perjalanan ibadah Anda membutuhkan standar keselamatan, kebersihan kabin, dan keramahan profesional tertinggi.',
      pillars: [
        {
          title: 'Sopir Resmi & Terverifikasi',
          desc: 'Setiap sopir melewati verifikasi lisensi resmi dan pelatihan etika pelayanan tamu.',
          bullets: [
            'Sopir berkomunikasi dalam bahasa Arab dan Inggris',
            'Menguasai area hotel Makkah & Madinah',
            'Berpakaian rapi dan bersikap santun',
          ],
        },
        {
          title: 'Inspeksi Kendaraan 25-Titik',
          desc: 'Armada menjalani pemeriksaan teknis harian sebelum perjalanan tol jarak jauh.',
          bullets: [
            'Ban, rem, dan suspensi diperiksa setiap hari',
            'AC multi-zona super dingin diperiksa sebelum keberangkatan',
            'Kabin 100% bebas asap rokok tanpa pengecualian',
          ],
        },
        {
          title: 'Kenyamanan Keluarga & Lansia',
          desc: 'Pelayanan sabar dan ramah bagi keluarga yang membawa orang tua lansia serta anak-anak.',
          bullets: [
            'Akses masuk mudah dan bantuan penuh untuk bagasi',
            'Mengemudi halus dan stabil di jalan raya',
            'Perhentian fleksibel untuk shalat, istirahat, dan Miqat',
          ],
        },
        {
          title: 'Operasional 24/7',
          desc: 'Tim operasional pusat memantau perjalanan Anda sepanjang waktu.',
          bullets: [
            'Pelacakan radar kedatangan penerbangan secara langsung',
            'Koordinator WhatsApp khusus untuk setiap pesanan',
            'Bayar tunai ke sopir setelah perjalanan selesai di tujuan',
          ],
        },
      ],
      ctaTitle: 'Bepergian dengan Ketenangan Penuh',
      ctaDesc: 'Pesan sopir privat Anda hari ini dengan tarif tetap, tanpa DP, dan pembayaran tunai kepada sopir setelah perjalanan selesai di tujuan (SAR atau USD).',
    },
    partners: {
      badge: 'Agen Perjalanan & Penyelenggara Umrah',
      title: 'Kemitraan B2B Duyuf Alrahman VIP',
      subtitle: 'Kami bermitra dengan biro perjalanan Umrah dan penyelenggara tur internasional untuk menyediakan transportasi darat VIP terpercaya di Jeddah, Makkah, dan Madinah.',
      cards: [
        {
          title: 'Tarif Kontrak B2B',
          desc: 'Harga tetap untuk kontrak musiman, kedatangan multi-penerbangan, dan rombongan jamaah.',
        },
        {
          title: 'Koordinator Khusus',
          desc: 'Satu koordinator WhatsApp khusus menangani seluruh jadwal grup dan pengantaran hotel.',
        },
        {
          title: 'Manifes Perjalanan Jelas',
          desc: 'Konfirmasi perjalanan terstruktur dan penjemputan bandara tepat waktu.',
        },
      ],
      ctaTitle: 'Siap Mengoordinasikan Transportasi Rombongan?',
      ctaDesc: 'Hubungi tim Kemitraan Agen kami dengan jadwal rombongan, jumlah jamaah, dan kebutuhan rute Anda.',
      waBtn: 'Hubungi Tim Agen via WhatsApp',
      contactBtn: 'Kirim Permintaan Resmi',
    },
  },
  ur: {
    updatedLabel: 'آخری اپ ڈیٹ: نومبر 2026',
    privacy: {
      desc: 'ضیوف الرحمن وی آئی پی میں مسافروں کی معلومات اور رازداری کی پالیسی۔',
      sections: [
        {
          heading: '1. ہم کون سی معلومات جمع کرتے ہیں',
          body: 'ضیوف الرحمن وی آئی پی کے ذریعے پرائیویٹ ڈرائیور بک کرتے وقت ہم صرف سفر کی ہم آہنگی کے لیے ضروری معلومات لیتے ہیں: مکمل نام، واٹس ایپ نمبر، ای میل (اختیاری)، سفر کی تاریخ و وقت، فلائٹ نمبر، اور پک اپ و ڈراپ آف مقامات۔',
        },
        {
          heading: '2. معلومات کا استعمال',
          body: 'آپ کی معلومات صرف ڈرائیور کی تفصیلات واٹس ایپ پر بھیجنے اور فلائٹ ریڈار کے ذریعے آمد کا وقت مانیٹر کرنے کے لیے استعمال ہوتی ہیں۔',
        },
        {
          heading: '3. ذاتی معلومات کی مکمل حفاظت',
          body: 'ہم آپ کی ذاتی معلومات کسی تیسرے فریق یا اشتہاری ادارے کو ہرگز فروخت یا شیئر نہیں کرتے۔',
        },
        {
          heading: '4. ڈیٹا سیکیورٹی اور رابطہ',
          body: 'تمام معلومات TLS/SSL انکرپشن سے محفوظ ہیں۔ رابطے کے لیے: info@duyufalrahmanvip.com یا واٹس ایپ +966567588261۔',
        },
      ],
    },
    terms: {
      desc: 'ضیوف الرحمن وی آئی پی کی سفری خدمات کے شرائط و ضوابط۔',
      sections: [
        {
          heading: '1. سروس کی نوعیت',
          body: 'ضیوف الرحمن وی آئی پی جدہ ایئرپورٹ (KAIA)، مکہ مکرمہ اور مدینہ منورہ کے درمیان نجی فیملی ٹرانسپورٹ فراہم کرتا ہے۔ ہر بکنگ میں مکمل گاڑی صرف آپ کی فیملی کے لیے مخصوص ہوتی ہے۔',
        },
        {
          heading: '2. طے شدہ کرایہ اور نقد ادائیگی کی پالیسی',
          body: 'تمام کرائے مکمل گاڑی کے لیے طے شدہ ہیں جن میں ہائی وے ٹول، ایئرپورٹ پارکنگ، ایندھن اور ٹیکس شامل ہیں۔ ادائیگی صرف نقد میں سفر مکمل ہونے اور مطلوبہ منزل پر پہنچنے کے بعد براہِ راست ڈرائیور کو (سعودی ریال یا امریکی ڈالر میں) کی جاتی ہے۔ کریڈٹ کارڈ، ڈیبٹ کارڈ، پی او ایس مشین، آن لائن ادائیگی اور بینک ٹرانسفر قبول نہیں کیے جاتے۔ کوئی پیشگی رقم یا ایڈوانس درکار نہیں۔',
        },
        {
          heading: '3. ایئرپورٹ استقبال اور فلائٹ تاخیر',
          body: 'ہم لائیو ریڈار کے ذریعے پروازوں کی نگرانی کرتے ہیں۔ طیارہ لینڈ کرنے کے بعد 60 منٹ کا مفت انتظار شامل ہے۔',
        },
        {
          heading: '4. نشستوں کی گنجائش اور تمباکو نوشی کی ممانعت',
          body: 'مسافروں اور سامان کی تعداد منتخب گاڑی کی منظور شدہ گنجائش کے مطابق ہونی چاہیے۔ تمام گاڑیوں میں سگریٹ نوشی سختی سے ممنوع ہے۔',
        },
      ],
    },
    cancellation: {
      subtitle: 'شفاف • بااعتماد • 24 گھنٹے قبل تک مفت منسوخی',
      banner: 'مقررہ پک اپ وقت سے 24 گھنٹے پہلے تک بغیر کسی فیس کے مفت منسوخی یا تبدیلی کی سہولت۔',
      sections: [
        {
          heading: '1. 24 گھنٹے قبل مفت منسوخی کی پالیسی',
          body: 'آپ اپنے سفر کے مقررہ وقت سے 24 گھنٹے پہلے تک بغیر کسی چارجز کے اپنی بکنگ منسوخ یا تبدیل کر سکتے ہیں۔',
        },
        {
          heading: '2. صفر ایڈوانس = مکمل ذہنی سکون',
          body: 'چونکہ ادائیگی سفر مکمل ہونے کے بعد ڈرائیور کو نقد کی جاتی ہے اور کوئی پیشگی رقم نہیں لی جاتی، اس لیے رقم کی واپسی کے انتظار یا بینک کٹوتی کا کوئی مسئلہ نہیں ہوتا۔',
        },
        {
          heading: '3. 24 گھنٹے کے اندر ہنگامی تبدیلی',
          body: 'اگر پرواز میں اچانک تبدیلی ہو تو فوری طور پر ہماری 24/7 واٹس ایپ ٹیم (+966567588261) کو مطلع کریں تاکہ ڈرائیور کا وقت ایڈجسٹ کیا جا سکے۔',
        },
      ],
      manageBtn: 'بکنگ منظم کریں',
      whatsappBtn: 'واٹس ایپ پر رابطہ کریں',
    },
    cookies: {
      desc: 'ضیوف الرحمن وی آئی پی ویب سائٹ پر کوکیز اور تکنیکی اسٹوریج کی پالیسی۔',
      sections: [
        {
          heading: '1. کوکیز کیا ہیں؟',
          body: 'کوکیز اور لوکل اسٹوریج چھوٹی تکنیکی فائلیں ہیں جو آپ کی منتخب کردہ زبان (10 زبانوں میں سے)، کرنسی (SAR یا USD) اور لائٹ/ڈارک تھیم کو یاد رکھتی ہیں۔',
        },
        {
          heading: '2. صرف بنیادی آپریشنل کوکیز',
          body: 'ہم صرف ضروری آپریشنل کوکیز استعمال کرتے ہیں اور کسی قسم کی اشتہاری ٹریکنگ نہیں کرتے۔',
        },
      ],
    },
    safety: {
      badge: 'زائرین کا مکمل اطمینان و تحفظ',
      title: 'حفاظتی معیارات اور ڈرائیور پروٹوکول',
      subtitle: 'آپ کا مقدس سفر آمد سے واپسی تک اعلیٰ ترین حفاظتی انتظامات، گاڑی کی صفائی اور باوقار میزبانی کا متقاضی ہے۔',
      pillars: [
        {
          title: 'تصدیق شدہ اور تربیت یافتہ ڈرائیورز',
          desc: 'ہر ڈرائیور لائسنس کی تصدیق اور زائرین کے احترام کی خصوصی تربیت سے گزرتا ہے۔',
          bullets: [
            'عربی، انگریزی اور اردو سمجھنے والے ڈرائیورز',
            'مکہ اور مدینہ کے ہوٹل زونز سے مکمل واقفیت',
            'مہذب اخلاق اور وقت کی پابندی',
          ],
        },
        {
          title: 'گاڑی کا 25 نکاتی معائنہ',
          desc: 'طویل ہائی وے سفر سے قبل ہر گاڑی کا روزانہ مکینیکل چیک اپ کیا جاتا ہے۔',
          bullets: [
            'ٹائر، بریک اور سسپنشن کی روزانہ جانچ',
            'ہر سفر سے قبل طاقتور ایئر کنڈیشننگ کی تصدیق',
            'تمام گاڑیوں میں 100% نان اسموکنگ پالیسی',
          ],
        },
        {
          title: 'بزرگوں اور فیملیز کے لیے خصوصی آرام',
          desc: 'بزرگ والدین اور بچوں کے ساتھ سفر کرنے والی فیملیز کے لیے نہایت آرام دہ اور محتاط ڈرائیونگ۔',
          bullets: [
            'بزرگوں کے لیے آسان سواری اور سامان میں مکمل مدد',
            'ہائی وے پر پرسکون اور متوازن رفتار',
            'نماز، آرام اور میقات کے لیے سہولت بخش توقف',
          ],
        },
        {
          title: '24/7 ڈسپیچ اور مانیٹرنگ',
          desc: 'ہماری آپریشنز ٹیم چوبیس گھنٹے آپ کے سفر کی نگرانی کرتی ہے۔',
          bullets: [
            'لائیو فلائٹ ریڈار ٹریکنگ',
            'ہر بکنگ کے لیے واٹس ایپ کوآرڈینیٹر',
            'منزل پر پہنچنے کے بعد ڈرائیور کو نقد ادائیگی',
          ],
        },
      ],
      ctaTitle: 'مکمل ذہنی سکون کے ساتھ سفر کریں',
      ctaDesc: 'طے شدہ کرائے اور صفر ایڈوانس کے ساتھ آج ہی اپنی گاڑی بک کریں — ادائیگی سفر مکمل ہونے پر ڈرائیور کو نقد (SAR یا USD)۔',
    },
    partners: {
      badge: 'ٹریول ایجنسیز اور عمرہ گروپ آپریٹرز',
      title: 'ضیوف الرحمن وی آئی پی کے ساتھ B2B شراکت داری',
      subtitle: 'ہم دنیا بھر کی ٹریول ایجنسیوں اور عمرہ ٹور آپریٹرز کے ساتھ مل کر جدہ، مکہ اور مدینہ میں بااعتماد وی آئی پی ٹرانسپورٹ فراہم کرتے ہیں۔',
      cards: [
        {
          title: 'بی ٹو بی گروپ ریٹس',
          desc: 'موسمی معاہدوں اور قافلوں کے لیے خصوصی طے شدہ نرخ۔',
        },
        {
          title: 'مخصوص ڈسپیچ کوآرڈینیٹر',
          desc: 'آپ کے تمام گروپ شیڈول اور ہوٹل ٹرانسفرز کے لیے وقف واٹس ایپ سپروائزر۔',
        },
        {
          title: 'منظم سفری شیڈولنگ',
          desc: 'واضح بکنگ تصدیق اور ایئرپورٹ پر بروقت استقبال۔',
        },
      ],
      ctaTitle: 'کیا آپ گروپ ٹرانسپورٹ کے لیے رابطہ کرنا چاہتے ہیں؟',
      ctaDesc: 'اپنے گروپ شیڈول اور مسافروں کی تعداد کے ساتھ ہماری ایجنسی ریلیشنز ٹیم سے رابطہ کریں۔',
      waBtn: 'واٹس ایپ پر ایجنسی ٹیم سے بات کریں',
      contactBtn: 'باضابطہ درخواست بھیجیں',
    },
  },
  fr: {
    updatedLabel: 'Dernière mise à jour : Novembre 2026',
    privacy: {
      desc: 'Politique de confidentialité et protection des données des passagers chez Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Données Collectées',
          body: 'Lors de la réservation d’un chauffeur privé sur Duyuf Alrahman VIP, nous collectons uniquement les informations nécessaires à votre transfert : nom complet, numéro WhatsApp, e-mail (optionnel), date et heure de voyage, numéro de vol et lieux de prise en charge / destination.',
        },
        {
          heading: '2. Utilisation de Vos Données',
          body: 'Vos coordonnées et informations de vol servent exclusivement à coordonner votre chauffeur sur WhatsApp et à suivre l’arrivée de votre avion par radar.',
        },
        {
          heading: '3. Aucune Revente de Données',
          body: 'Nous ne vendons ni ne cédons jamais vos données personnelles à des tiers commerciaux. Seul votre chauffeur attitré reçoit les détails de prise en charge.',
        },
        {
          heading: '4. Sécurité & Contact',
          body: 'Toutes les communications sont chiffrées via TLS/SSL. Contact : info@duyufalrahmanvip.com ou WhatsApp +966567588261.',
        },
      ],
    },
    terms: {
      desc: 'Conditions générales de service et de transport de passagers Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Nature du Service',
          body: 'Duyuf Alrahman VIP assure des transferts privés avec chauffeur entre l’aéroport de Djeddah (KAIA), La Mecque et Médine. Chaque réservation garantit un véhicule privatif exclusif.',
        },
        {
          heading: '2. Tarifs Fixes & Paiement Strictement en Espèces',
          body: 'Tous les tarifs affichés sont fixes par véhicule et incluent les péages, le stationnement aéroport, le carburant et les taxes. Le paiement s’effectue strictement en espèces payées au chauffeur une fois le trajet terminé et le client arrivé à la destination demandée (en SAR ou USD). Les cartes bancaires, terminaux TPE, paiements en ligne et virements ne sont pas acceptés. Aucun acompte n’est requis.',
        },
        {
          heading: '3. Accueil Aéroport & Retards de Vol',
          body: 'Nous suivons votre vol par radar en direct. Une attente gratuite de 60 minutes est incluse à compter de l’atterrissage réel.',
        },
        {
          heading: '4. Capacité & Interdiction de Fumer',
          body: 'Les passagers doivent respecter la capacité de places et de bagages du véhicule choisi. Il est strictement interdit de fumer à bord de tous nos véhicules.',
        },
      ],
    },
    cancellation: {
      subtitle: 'Transparent • Honnête • Zéro Frais Jusqu’à 24h Avant',
      banner: 'L’annulation et la modification sont gratuites jusqu’à 24 heures avant l’heure de prise en charge prévue.',
      sections: [
        {
          heading: '1. Annulation Gratuite Jusqu’à 24 Heures',
          body: 'Vous pouvez annuler ou modifier votre réservation sans frais jusqu’à 24 heures avant l’heure prévue de prise en charge.',
        },
        {
          heading: '2. Zéro Avance = Sérénité Totale',
          body: 'Comme le paiement s’effectue en espèces au chauffeur après la fin du trajet sans aucun acompte préalable, vous ne subissez aucun délai ni frais de remboursement bancaire.',
        },
        {
          heading: '3. Modifications à Moins de 24 Heures',
          body: 'En cas de changement d’horaire de vol à moins de 24 heures, contactez notre équipe WhatsApp 24/7 au +966567588261 pour ajuster votre prise en charge.',
        },
      ],
      manageBtn: 'Gérer la Réservation',
      whatsappBtn: 'Contacter le Dispatch sur WhatsApp',
    },
    cookies: {
      desc: 'Politique relative aux cookies et au stockage technique sur Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Qu’est-ce qu’un Cookie ?',
          body: 'Les cookies et le stockage local mémorisent votre langue préférée (parmi les 10 langues prises en charge), votre devise (SAR ou USD) et votre thème Clair/Sombre.',
        },
        {
          heading: '2. Cookies Strictement Nécessaires',
          body: 'Nous utilisons uniquement des cookies techniques essentiels au bon fonctionnement de votre réservation, sans pistage publicitaire tiers.',
        },
      ],
    },
    safety: {
      badge: 'Sérénité des Pèlerins',
      title: 'Normes de Sécurité & Protocole Chauffeur',
      subtitle: 'Votre voyage sacré exige une sécurité irréprochable, une hygiène parfaite et une courtoisie professionnelle de l’arrivée au départ.',
      pillars: [
        {
          title: 'Chauffeurs Vérifiés & Agréés',
          desc: 'Chaque chauffeur fait l’objet d’une vérification de licence professionnelle et d’une formation à l’accueil des pèlerins.',
          bullets: [
            'Chauffeurs communiquant en arabe et en anglais',
            'Parfaite connaissance des hôtels de La Mecque et Médine',
            'Tenue soignée et comportement respectueux',
          ],
        },
        {
          title: 'Inspection Technique en 25 Points',
          desc: 'Nos véhicules sont contrôlés quotidiennement avant chaque trajet autoroutier.',
          bullets: [
            'Pneus, freins et suspension vérifiés chaque jour',
            'Climatisation haute puissance contrôlée avant chaque départ',
            'Cabine 100% non-fumeur sans exception',
          ],
        },
        {
          title: 'Confort des Familles & des Aînés',
          desc: 'Une attention particulière pour les familles voyageant avec des personnes âgées et des enfants.',
          bullets: [
            'Accès à bord facilité et aide complète aux bagages',
            'Conduite souple et régulière sur autoroute',
            'Arrêts flexibles pour la prière, le repos et le Miqat',
          ],
        },
        {
          title: 'Coordination 24h/24 et 7j/7',
          desc: 'Notre centre d’opérations suit votre trajet en temps réel.',
          bullets: [
            'Suivi radar des vols synchronisé avec les terminaux',
            'Coordinateur WhatsApp dédié à chaque réservation',
            'Paiement en espèces au chauffeur après l’arrivée à destination',
          ],
        },
      ],
      ctaTitle: 'Voyagez en Toute Sérénité',
      ctaDesc: 'Réservez votre chauffeur privé dès aujourd’hui avec tarif fixe, zéro acompte et paiement en espèces au chauffeur une fois arrivé à destination (SAR ou USD).',
    },
    partners: {
      badge: 'Agences de Voyage & Organisateurs Omra',
      title: 'Partenariat B2B avec Duyuf Alrahman VIP',
      subtitle: 'Nous accompagnons les agences de voyage et organisateurs de groupes dans la gestion de leurs transferts VIP à Djeddah, La Mecque et Médine.',
      cards: [
        {
          title: 'Tarifs Partenaires B2B',
          desc: 'Grilles tarifaires fixes pour les contrats saisonniers et les délégations de pèlerins.',
        },
        {
          title: 'Coordinateur Dédié',
          desc: 'Un interlocuteur WhatsApp unique pour gérer vos manifestes de vols et transferts hôtels.',
        },
        {
          title: 'Suivi Rigoureux',
          desc: 'Confirmations détaillées par groupe et accueil ponctuel aux terminaux.',
        },
      ],
      ctaTitle: 'Prêt à Coordonner Vos Transferts de Groupes ?',
      ctaDesc: 'Contactez notre service Relations Agences avec votre programme de vols et vos besoins en véhicules.',
      waBtn: 'Écrire au Service Agences sur WhatsApp',
      contactBtn: 'Envoyer une Demande',
    },
  },
  es: {
    updatedLabel: 'Última actualización: Noviembre 2026',
    privacy: {
      desc: 'Política de privacidad y protección de datos de pasajeros de Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Información que Recopilamos',
          body: 'Al reservar transporte privado con chofer en Duyuf Alrahman VIP, recopilamos únicamente los datos necesarios para coordinar su traslado: nombre completo, número de WhatsApp, correo electrónico (opcional), fecha y hora del viaje, número de vuelo y puntos de recogida/destino.',
        },
        {
          heading: '2. Uso de la Información',
          body: 'Sus datos de contacto y vuelo se utilizan exclusivamente para coordinar su chofer por WhatsApp y monitorear el aterrizaje de su vuelo por radar.',
        },
        {
          heading: '3. Cero Venta de Datos Personales',
          body: 'Nunca vendemos ni cedemos sus datos personales a terceros con fines publicitarios. Solo su chofer asignado recibe los detalles de su traslado.',
        },
        {
          heading: '4. Seguridad y Contacto',
          body: 'Todas las comunicaciones están protegidas mediante cifrado TLS/SSL. Contacto: info@duyufalrahmanvip.com o WhatsApp +966567588261.',
        },
      ],
    },
    terms: {
      desc: 'Términos de servicio y condiciones de transporte de pasajeros de Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Naturaleza del Servicio',
          body: 'Duyuf Alrahman VIP ofrece transporte privado con chofer entre el Aeropuerto de Yeda (KAIA), La Meca y Medina. Cada reserva garantiza un vehículo privado exclusivo para su grupo.',
        },
        {
          heading: '2. Tarifas Fijas y Pago Estrictamente en Efectivo',
          body: 'Todas las tarifas cotizadas son fijas por vehículo e incluyen peajes, estacionamiento de aeropuerto, combustible e impuestos. El pago se realiza estrictamente en efectivo directamente al chofer tras completar el viaje y llegar al destino solicitado (en SAR o USD). No se aceptan tarjetas de crédito, débito, terminales POS, pagos en línea ni transferencias bancarias. No se requiere depósito previo.',
        },
        {
          heading: '3. Recepción en Aeropuerto y Retrasos de Vuelo',
          body: 'Monitoreamos los vuelos por radar en tiempo real. Se incluyen 60 minutos de espera gratuita desde el aterrizaje real del vuelo.',
        },
        {
          heading: '4. Capacidad y Prohibición de Fumar',
          body: 'Los pasajeros deben respetar la capacidad de asientos y equipaje del vehículo seleccionado. Está estrictamente prohibido fumar en todos los vehículos.',
        },
      ],
    },
    cancellation: {
      subtitle: 'Transparente • Honesto • Sin Penalización Hasta 24 Horas Antes',
      banner: 'Se permite la cancelación y reprogramación gratuita hasta 24 horas antes de la hora de recogida programada.',
      sections: [
        {
          heading: '1. Política de Cancelación Gratuita de 24 Horas',
          body: 'Puede cancelar o modificar su reserva sin cargo alguno hasta 24 horas antes de la hora de recogida acordada.',
        },
        {
          heading: '2. Cero Pago Anticipado = Tranquilidad Inmediata',
          body: 'Como el pago se efectúa en efectivo al chofer al finalizar el viaje sin depósito previo, nunca tendrá demoras ni cargos bancarios por reembolso.',
        },
        {
          heading: '3. Cambios Dentro de las 24 Horas',
          body: 'Si su vuelo cambia dentro de las 24 horas previas a la recogida, avise de inmediato a nuestro equipo de WhatsApp 24/7 al +966567588261.',
        },
      ],
      manageBtn: 'Gestionar Reserva',
      whatsappBtn: 'Contactar por WhatsApp',
    },
    cookies: {
      desc: 'Política de cookies y almacenamiento técnico en Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. ¿Qué son las Cookies?',
          body: 'Las cookies y el almacenamiento local guardan su idioma preferido (entre los 10 idiomas disponibles), su moneda (SAR o USD) y el modo Claro/Oscuro.',
        },
        {
          heading: '2. Solo Cookies Operativas Esenciales',
          body: 'Utilizamos únicamente almacenamiento técnico esencial para el funcionamiento de su reserva, sin rastreo publicitario de terceros.',
        },
      ],
    },
    safety: {
      badge: 'Tranquilidad para el Peregrino',
      title: 'Estándares de Seguridad y Protocolo de Chofer',
      subtitle: 'Su peregrinación merece la máxima seguridad, higiene en cabina y cortesía profesional desde la llegada hasta el regreso.',
      pillars: [
        {
          title: 'Choferes Verificados',
          desc: 'Cada chofer pasa por verificación de licencia profesional y capacitación en hospitalidad.',
          bullets: [
            'Choferes que se comunican en árabe e inglés',
            'Pleno conocimiento de los hoteles de La Meca y Medina',
            'Trato respetuoso y puntualidad',
          ],
        },
        {
          title: 'Inspección Vehicular de 25 Puntos',
          desc: 'Los vehículos se revisan diariamente antes de cada trayecto por autopista.',
          bullets: [
            'Neumáticos, frenos y suspensión verificados a diario',
            'Climatización de alto rendimiento revisada antes de cada viaje',
            'Política 100% libre de humo en toda la flota',
          ],
        },
        {
          title: 'Comodidad para Familias y Mayores',
          desc: 'Atención paciente y dedicada para familias que viajan con adultos mayores y niños.',
          bullets: [
            'Acceso cómodo y asistencia completa con el equipaje',
            'Conducción suave y estable en carretera',
            'Paradas flexibles para oración, descanso y Miqat',
          ],
        },
        {
          title: 'Despacho Operativo 24/7',
          desc: 'Nuestro equipo central supervisa cada traslado las 24 horas.',
          bullets: [
            'Seguimiento radar de vuelos en tiempo real',
            'Coordinador de WhatsApp asignado a su reserva',
            'Pago en efectivo al chofer tras llegar al destino',
          ],
        },
      ],
      ctaTitle: 'Viaje con Total Tranquilidad',
      ctaDesc: 'Reserve su chofer privado hoy con tarifa fija, cero anticipo y pago en efectivo al chofer tras completar el viaje en el destino (SAR o USD).',
    },
    partners: {
      badge: 'Agencias de Viajes y Operadores de Grupos',
      title: 'Alianza B2B con Duyuf Alrahman VIP',
      subtitle: 'Colaboramos con agencias de viajes y operadores internacionales para ofrecer transporte terrestre VIP confiable en Yeda, La Meca y Medina.',
      cards: [
        {
          title: 'Tarifas Corporativas B2B',
          desc: 'Precios fijos para contratos de temporada, múltiples llegadas de vuelos y grupos.',
        },
        {
          title: 'Coordinador Dedicado',
          desc: 'Un coordinador central en WhatsApp gestiona sus manifiestos de grupo y traslados de hotel.',
        },
        {
          title: 'Gestión Transparente',
          desc: 'Confirmaciones claras de cada servicio y recepción puntual en el aeropuerto.',
        },
      ],
      ctaTitle: '¿Listo para Coordinar Transporte de Grupos?',
      ctaDesc: 'Contacte a nuestro equipo de Relaciones con Agencias con su itinerario y requerimiento de flota.',
      waBtn: 'Hablar con Relaciones de Agencias en WhatsApp',
      contactBtn: 'Enviar Solicitud Formal',
    },
  },
  de: {
    updatedLabel: 'Zuletzt aktualisiert: November 2026',
    privacy: {
      desc: 'Datenschutzerklärung für den Chauffeur- und Buchungsservice von Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Erhobene Daten',
          body: 'Bei der Buchung eines privaten Chauffeurtransfers über Duyuf Alrahman VIP erheben wir nur die für die Durchführung Ihrer Fahrt erforderlichen Angaben: vollständiger Name, WhatsApp-Telefonnummer, optionale E-Mail-Adresse, Reisedatum/-uhrzeit, Flugnummer sowie Abhol- und Zielort.',
        },
        {
          heading: '2. Verwendung Ihrer Daten',
          body: 'Ihre Kontakt- und Flugdaten werden ausschließlich zur Einsatzkoordination, zur Übermittlung der Fahrerdaten per WhatsApp und zur Live-Flugradarverfolgung genutzt.',
        },
        {
          heading: '3. Kein Verkauf Personenbezogener Daten',
          body: 'Wir verkaufen oder vermieten Ihre personenbezogenen Daten niemals an Dritte. Ihre Reisedaten werden ausschließlich an Ihren zugeteilten Chauffeur weitergegeben.',
        },
        {
          heading: '4. Datensicherheit & Kontakt',
          body: 'Alle Übertragungen sind durch TLS/SSL-Verschlüsselung geschützt. Kontakt: info@duyufalrahmanvip.com oder WhatsApp +966567588261.',
        },
      ],
    },
    terms: {
      desc: 'Allgemeine Geschäfts- und Beförderungsbedingungen von Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Leistungsumfang',
          body: 'Duyuf Alrahman VIP bietet private Chauffeurtransfers zwischen dem Flughafen Dschidda (KAIA), Mekka und Medina an. Jede Buchung umfasst ein exklusives Privatfahrzeug für Ihre Reisegruppe.',
        },
        {
          heading: '2. Garantierte Festpreise & Reine Barzahlung',
          body: 'Alle angegebenen Preise sind Festpreise pro Fahrzeug inklusive Autobahnmaut, Flughafengebühren, Kraftstoff und Steuern. Die Zahlung erfolgt ausschließlich in bar direkt an den Fahrer nach Abschluss der Fahrt und Erreichen des gewünschten Zielorts (in SAR oder USD). Kreditkarten, Debitkarten, POS-Terminals, Online-Zahlungen und Banküberweisungen werden nicht akzeptiert. Keine Anzahlung erforderlich.',
        },
        {
          heading: '3. Flughafenempfang & Flugverspätungen',
          body: 'Wir überwachen Ihre Flugankunft per Live-Radar. Ab der tatsächlichen Landung sind 60 Minuten kostenlose Wartezeit inbegriffen.',
        },
        {
          heading: '4. Kapazitätsgrenzen & Rauchverbot',
          body: 'Bitte beachten Sie die angegebenen Sitzplatz- und Gepäckkapazitäten des gewählten Fahrzeugs. In allen Fahrzeugen gilt ein striktes Rauchverbot.',
        },
      ],
    },
    cancellation: {
      subtitle: 'Transparent • Fair • Kostenlos bis 24 Stunden vor Abholung',
      banner: 'Kostenlose Stornierung und Umbuchung bis zu 24 Stunden vor der geplanten Abholzeit ohne Gebühren.',
      sections: [
        {
          heading: '1. Kostenlose Stornierung bis 24 Stunden vorher',
          body: 'Sie können Ihre Reservierung bis zu 24 Stunden vor dem geplanten Abholtermin kostenfrei stornieren oder ändern.',
        },
        {
          heading: '2. Keine Vorauszahlung = Volle Sicherheit',
          body: 'Da die Zahlung erst nach Abschluss der Fahrt in bar beim Chauffeur erfolgt und keine Anzahlung erhoben wird, entstehen Ihnen keinerlei Rückerstattungsverzögerungen.',
        },
        {
          heading: '3. Kurzfristige Flugänderungen innerhalb von 24 Stunden',
          body: 'Bei kurzfristigen Flugzeitenänderungen kontaktieren Sie bitte umgehend unsere 24/7 WhatsApp-Disposition unter +966567588261.',
        },
      ],
      manageBtn: 'Buchung Verwalten',
      whatsappBtn: 'Disposition per WhatsApp kontaktieren',
    },
    cookies: {
      desc: 'Cookie-Richtlinie und technische Speichernutzung auf Duyuf Alrahman VIP.',
      sections: [
        {
          heading: '1. Was sind Cookies?',
          body: 'Cookies und lokaler Browserspeicher sichern Ihre gewählte Sprache (aus 10 unterstützten Sprachen), Ihre Währung (SAR oder USD) sowie das Hell-/Dunkel-Design.',
        },
        {
          heading: '2. Nur Technisch Notwendige Cookies',
          body: 'Wir verwenden ausschließlich technisch notwendige Speicherfunktionen für Ihre Buchungssitzung ohne Werbe-Tracking durch Dritte.',
        },
      ],
    },
    safety: {
      badge: 'Sicherheit & Vertrauen für Pilger',
      title: 'Sicherheitsstandards & Chauffeur-Protokoll',
      subtitle: 'Ihre Pilgerreise verdient höchste Sicherheit, makellose Fahrzeughygiene und professionelle Gastfreundschaft.',
      pillars: [
        {
          title: 'Geprüfte Profi-Chauffeure',
          desc: 'Jeder Fahrer durchläuft eine Lizenzprüfung sowie Schulungen in Fahrsicherheit und Gastfreundschaft.',
          bullets: [
            'Arabisch- und englischsprachige Chauffeure',
            'Beste Ortskenntnis in Mekka und Medina',
            'Seriöses Auftreten und absolute Pünktlichkeit',
          ],
        },
        {
          title: '25-Punkte-Fahrzeugcheck',
          desc: 'Alle Fahrzeuge werden täglich vor dem Einsatz auf Langstrecken technisch überprüft.',
          bullets: [
            'Tägliche Kontrolle von Reifen, Bremsen und Fahrwerk',
            'Hochleistungs-Klimaanlage vor jeder Fahrt geprüft',
            'Striktes 100% Nichtraucher-Gebot in allen Kabinen',
          ],
        },
        {
          title: 'Komfort für Familien & Senioren',
          desc: 'Besondere Rücksichtnahme für Familien mit älteren Angehörigen und Kindern.',
          bullets: [
            'Bequemer Einstieg und vollständige Gepäckhilfe',
            'Ruhige, gleichmäßige Fahrweise auf der Autobahn',
            'Flexible Pausen für Gebet, Erfrischung und Miqat',
          ],
        },
        {
          title: '24/7 Einsatzleitung',
          desc: 'Unsere Disposition begleitet Ihre Fahrt rund um die Uhr.',
          bullets: [
            'Live-Flugradar-Überwachung für pünktlichen Empfang',
            'Persönlicher WhatsApp-Ansprechpartner',
            'Barzahlung direkt beim Fahrer nach Ankunft am Zielort',
          ],
        },
      ],
      ctaTitle: 'Reisen Sie mit Voller Sorgenfreiheit',
      ctaDesc: 'Buchen Sie Ihren privaten Chauffeur mit garantiertem Festpreis, null Anzahlung und Barzahlung nach Fahrtende am Zielort (SAR oder USD).',
    },
    partners: {
      badge: 'Reisebüros & Gruppenveranstalter',
      title: 'B2B-Partnerschaft mit Duyuf Alrahman VIP',
      subtitle: 'Wir arbeiten weltweit mit Reisebüros und Umrah-Veranstaltern zusammen, um zuverlässige VIP-Bodentransfers in Dschidda, Mekka und Medina bereitzustellen.',
      cards: [
        {
          title: 'B2B-Gruppenkonditionen',
          desc: 'Verbindliche Festpreise für Saisonverträge, Mehrfachankünfte und Delegationen.',
        },
        {
          title: 'Persönlicher Disponent',
          desc: 'Ein zentraler WhatsApp-Koordinator betreut Ihre gesamten Gruppenlisten und Hoteltransfers.',
        },
        {
          title: 'Klare Abwicklung',
          desc: 'Übersichtliche Fahrtenbestätigungen und pünktlicher Empfang am Terminal.',
        },
      ],
      ctaTitle: 'Gruppentransfers Gemeinsam Planen?',
      ctaDesc: 'Kontaktieren Sie unser Agentur-Team mit Ihrem Gruppenfahrplan und Ihren Fahrzeuganforderungen.',
      waBtn: 'Agentur-Team per WhatsApp kontaktieren',
      contactBtn: 'Offizielle Anfrage Senden',
    },
  },
  tr: {
    updatedLabel: 'Son Güncelleme: Kasım 2026',
    privacy: {
      desc: 'Duyuf Alrahman VIP yolcu operasyonları ve rezervasyon gizlilik politikası.',
      sections: [
        {
          heading: '1. Topladığımız Bilgiler',
          body: 'Duyuf Alrahman VIP üzerinden özel şoförlü ulaşım rezervasyonu yaptığınızda yalnızca transferinizi organize etmek için gerekli bilgileri toplarız: ad-soyad, WhatsApp telefon numarası, isteğe bağlı e-posta, seyahat tarihi/saati, uçuş numarası ve alış/varış noktaları.',
        },
        {
          heading: '2. Bilgilerinizin Kullanımı',
          body: 'İletişim ve uçuş bilgileriniz yalnızca şoför atamasını WhatsApp üzerinden iletmek ve uçuşunuzu canlı radardan takip etmek amacıyla kullanılır.',
        },
        {
          heading: '3. Kişisel Verilerin Korunması',
          body: 'Kişisel verilerinizi hiçbir zaman üçüncü taraf reklam veya pazarlama şirketlerine satmayız veya paylaşmayız.',
        },
        {
          heading: '4. Veri Güvenliği ve İletişim',
          body: 'Tüm veri iletişimi TLS/SSL şifrelemesi ile korunmaktadır. İletişim: info@duyufalrahmanvip.com veya WhatsApp +966567588261.',
        },
      ],
    },
    terms: {
      desc: 'Duyuf Alrahman VIP hizmet şartları ve yolcu taşıma koşulları.',
      sections: [
        {
          heading: '1. Hizmetin Kapsamı',
          body: 'Duyuf Alrahman VIP; Cidde Havalimanı (KAIA), Mekke ve Medine arasında özel şoförlü VIP transfer hizmeti sunar. Her rezervasyon yalnızca sizin grubunuza özel bir araç tahsis eder.',
        },
        {
          heading: '2. Garantili Sabit Fiyat ve Nakit Ödeme Politikası',
          body: 'Belirtilen tüm ücretler araç başınadır; otoyol geçiş ücretleri, havalimanı otoparkı, yakıt ve vergiler dahildir. Ödeme yalnızca yolculuk tamamlandıktan ve müşteri talep edilen varış noktasına ulaştıktan sonra doğrudan şoföre nakit olarak (SAR veya USD) yapılır. Kredi kartı, banka kartı, POS cihazı, çevrim içi ödeme ve banka havalesi kabul edilmez. Ön ödeme veya depozito gerekmez.',
        },
        {
          heading: '3. Havalimanı Karşılama ve Uçuş Rötarları',
          body: 'Uçuşlar canlı radar ile takip edilir. Uçağın gerçek iniş saatinden itibaren 60 dakika ücretsiz bekleme süresi dahildir.',
        },
        {
          heading: '4. Kapasite Sınırları ve Sigara Yasağı',
          body: 'Yolcular seçilen aracın koltuk ve bagaj kapasitesine uymalıdır. Tüm araçlarımızda sigara içmek kesinlikle yasaktır.',
        },
      ],
    },
    cancellation: {
      subtitle: 'Şeffaf • Güvenilir • 24 Saat Öncesine Kadar Ücretsiz İptal',
      banner: 'Planlanan alış saatinden 24 saat öncesine kadar hiçbir ücret ödemeden ücretsiz iptal ve değişiklik yapılabilir.',
      sections: [
        {
          heading: '1. 24 Saat Ücretsiz İptal Politikası',
          body: 'Rezervasyonunuzu planlanan alış saatinden 24 saat öncesine kadar ücretsiz olarak iptal edebilir veya değiştirebilirsiniz.',
        },
        {
          heading: '2. Sıfır Ön Ödeme = Tam Güvence',
          body: 'Ödeme yolculuk sonunda şoföre nakit olarak yapıldığından ve ön ödeme alınmadığından, banka iade süreci veya kesinti yaşamazsınız.',
        },
        {
          heading: '3. 24 Saat İçindeki Uçuş Değişiklikleri',
          body: 'Uçuşunuzda son 24 saat içinde değişiklik olursa +966567588261 numaralı 7/24 WhatsApp operasyon hattımıza bilgi بvermeniz yeterlidir.',
        },
      ],
      manageBtn: 'Rezervasyonu Yönet',
      whatsappBtn: 'WhatsApp Operasyon Hattı',
    },
    cookies: {
      desc: 'Duyuf Alrahman VIP çerez politikası ve teknik depolama kullanımı.',
      sections: [
        {
          heading: '1. Çerezler (Cookies) Nedir?',
          body: 'Çerezler ve yerel tarayıcı depolaması; seçtiğiniz dili (10 dil seçeneği), para birimini (SAR veya USD) ve Açık/Koyu tema tercihinizi hatırlar.',
        },
        {
          heading: '2. Yalnızca Zorunlu Operasyonel Çerezler',
          body: 'Sitemizde üçüncü taraf reklam takip çerezleri kullanılmaz; yalnızca rezervasyon oturumunuz için gerekli teknik çerezler kullanılır.',
        },
      ],
    },
    safety: {
      badge: 'Misafirlerimiz İçin Tam Güvence',
      title: 'Güvenlik Standartları ve Şoför Protokolü',
      subtitle: 'Kutsal yolculuğunuz, karşılama anından dönüşünüze kadar en üst düzey güvenlik, araç hijyeni ve profesyonel nezaket gerektirir.',
      pillars: [
        {
          title: 'Lisanslı ve Deneyimli Şoförler',
          desc: 'Her şoförümüz ticari lisans kontrolü ve misafir ağırlama eğitiminden geçmektedir.',
          bullets: [
            'Arapça ve İngilizce iletişim kurabilen profesyonel şoförler (Türkçe web arayüzü ve yazılı WhatsApp desteği mevcuttur)',
            'Mekke ve Medine otel bölgelerine tam hakimiyet',
            'Saygılı, sabırlı ve dakik hizmet anlayışı',
          ],
        },
        {
          title: '25 Noktalı Araç Kontrolü',
          desc: 'Araçlarımız uzun otoyol seferleri öncesinde günlük mekanik kontrolden geçer.',
          bullets: [
            'Lastik, fren ve süspansiyon sistemlerinin günlük kontrolü',
            'Her yolculuk öncesi yüksek güçlü klima kontrolü',
            'Tüm araçlarda %100 sigarasız kabin kuralı',
          ],
        },
        {
          title: 'Aile ve Yaşlı Dostu Konfor',
          desc: 'Yaşlı ebeveynler ve çocuklarla seyahat eden aileler için özenli ve sarsıntısız sürüş.',
          bullets: [
            'Kolay biniş imkanı ve tam bagaj taşıma desteği',
            'Otoyolda dengeli ve konforlu sürüş',
            'Namaz, dinlenme ve Mikat için esnek molalar',
          ],
        },
        {
          title: '7/24 Operasyon Takibi',
          desc: 'Merkezi operasyon ekibimiz yolculuğunuzu 7/24 takip eder.',
          bullets: [
            'Canlı uçuş radarı ile havalimanı iniş takibi',
            'Her rezervasyon için özel WhatsApp desteği',
            'Yolculuk tamamlandığında varış noktasında şoföre nakit ödeme',
          ],
        },
      ],
      ctaTitle: 'Tam Huzur ve Güvenle Seyahat Edin',
      ctaDesc: 'Sabit fiyat garantisi, sıfır ön ödeme ve yolculuk sonunda şoföre nakit ödeme (SAR veya USD) avantajıyla özel aracınızı hemen ayırtın.',
    },
    partners: {
      badge: 'Seyahat Acenteleri ve Tur Operatörleri',
      title: 'Duyuf Alrahman VIP ile B2B İş Birliği',
      subtitle: 'Cidde, Mekke ve Medine genelinde güvenilir VIP grup ve aile transferleri için seyahat acenteleri ve Umre organizatörleriyle çalışıyoruz.',
      cards: [
        {
          title: 'B2B Kurumsal Fiyatlar',
          desc: 'Sezonluk anlaşmalar, çoklu uçuş karşılamaları ve kafileler için sabit fiyatlar.',
        },
        {
          title: 'Özel Operasyon Sorumlusu',
          desc: 'Tüm grup listelerinizi ve otel transferlerinizi yöneten tek merkezli WhatsApp koordinatörü.',
        },
        {
          title: 'Düzenli Transfer Yönetimi',
          desc: 'Net sefer onayları ve havalimanında dakik karşılama.',
        },
      ],
      ctaTitle: 'Grup Transferlerinizi Planlamaya Hazır mısınız?',
      ctaDesc: 'Grup programınız, yolcu sayınız ve güzergah talepleriniz için Acente İlişkileri ekibimizle iletişime geçin.',
      waBtn: 'WhatsApp Acente Hattı ile Görüşün',
      contactBtn: 'Resmi Talep Gönderin',
    },
  },
  hi: {
    updatedLabel: 'अंतिम अपडेट: नवंबर 2026',
    privacy: {
      desc: 'दुयूफ़ अल-रहमान वीआईपी यात्री संचालन और बुकिंग गोपनीयता नीति।',
      sections: [
        {
          heading: '1. हम कौन सी जानकारी एकत्र करते हैं',
          body: 'दुयूफ़ अल-रहमान वीआईपी के माध्यम से निजी चौफर बुक करते समय हम केवल आपकी यात्रा के समन्वय के लिए आवश्यक जानकारी एकत्र करते हैं: पूरा नाम, व्हाट्सएप नंबर, ईमेल (वैकल्पिक), यात्रा तिथि/समय, उड़ान संख्या और पिकअप/ड्रॉप-ऑफ स्थान।',
        },
        {
          heading: '2. आपकी जानकारी का उपयोग',
          body: 'आपकी संपर्क और उड़ान जानकारी का उपयोग केवल व्हाट्सएप पर ड्राइवर विवरण भेजने और लाइव रडार से उड़ान आगमन को ट्रैक करने के लिए किया जाता है।',
        },
        {
          heading: '3. व्यक्तिगत डेटा की पूर्ण सुरक्षा',
          body: 'हम आपकी व्यक्तिगत जानकारी किसी भी बाहरी मार्केटिंग एजेंसी को कभी नहीं बेचते या साझा नहीं करते हैं।',
        },
        {
          heading: '4. डेटा सुरक्षा और संपर्क',
          body: 'सभी संचार TLS/SSL एन्क्रिप्शन द्वारा सुरक्षित हैं। संपर्क करें: info@duyufalrahmanvip.com या व्हाट्सएप +966567588261।',
        },
      ],
    },
    terms: {
      desc: 'दुयूफ़ अल-रहमान वीआईपी सेवा की शर्तें और यात्री परिवहन नियम।',
      sections: [
        {
          heading: '1. सेवा की प्रकृति',
          body: 'दुयूफ़ अल-रहमान वीआईपी जेद्दा हवाई अड्डे (KAIA), मक्का और मदीना के बीच निजी चौफर परिवहन प्रदान करता है। प्रत्येक बुकिंग आपके परिवार या समूह के लिए एक समर्पित निजी वाहन आरक्षित करती है।',
        },
        {
          heading: '2. निश्चित किराया और नकद भुगतान नीति',
          body: 'सभी किराए प्रति वाहन निश्चित हैं और इनमें हाईवे टोल, एयरपोर्ट पार्किंग, ईंधन और टैक्स शामिल हैं। भुगतान केवल नकद में यात्रा पूरी होने और ग्राहक के अनुरोधित गंतव्य पर पहुंचने के बाद सीधे ड्राइवर को (SAR या USD में) किया जाता है। क्रेडिट कार्ड, डेबिट कार्ड, पीओएस मशीन, ऑनलाइन भुगतान और बैंक ट्रांसफर स्वीकार नहीं किए जाते हैं। कोई अग्रिम भुगतान या जमा राशि आवश्यक नहीं है।',
        },
        {
          heading: '3. हवाई अड्डा स्वागत और उड़ान में देरी',
          body: 'हम लाइव रडार के माध्यम से उड़ान आगमन की निगरानी करते हैं। वास्तविक लैंडिंग से 60 मिनट की निःशुल्क प्रतीक्षा शामिल है।',
        },
        {
          heading: '4. वाहन क्षमता और धूम्रपान निषेध',
          body: 'यात्रियों को चयनित वाहन की सीट और सामान क्षमता का पालन करना होगा। सभी वाहनों में धूम्रपान सख्त वर्जित है।',
        },
      ],
    },
    cancellation: {
      subtitle: 'पारदर्शी • विश्वसनीय • 24 घंटे पहले तक निःशुल्क रद्दीकरण',
      banner: 'निर्धारित पिकअप समय से 24 घंटे पहले तक बिना किसी शुल्क के निःशुल्क रद्दीकरण और समय परिवर्तन की अनुमति है।',
      sections: [
        {
          heading: '1. 24-घंटे निःशुल्क रद्दीकरण नीति',
          body: 'आप निर्धारित पिकअप समय से 24 घंटे पहले तक बिना किसी शुल्क के अपनी बुकिंग रद्द या संशोधित कर सकते हैं।',
        },
        {
          heading: '2. शून्य अग्रिम भुगतान = पूर्ण मानसिक शांति',
          body: 'चूंकि भुगतान यात्रा पूरी होने के बाद ड्राइवर को नकद में किया जाता है और कोई अग्रिम जमा नहीं लिया जाता है, इसलिए आपको रिफंड में देरी या बैंक कटौती का सामना नहीं करना पड़ता है।',
        },
        {
          heading: '3. 24 घंटे के भीतर समय परिवर्तन',
          body: 'यदि पिकअप से 24 घंटे के भीतर आपकी उड़ान का समय बदलता है, तो कृपया तुरंत हमारी 24/7 व्हाट्सएप टीम (+966567588261) से संपर्क करें।',
        },
      ],
      manageBtn: 'बुकिंग प्रबंधित करें',
      whatsappBtn: 'व्हाट्सएप डिस्पैच से संपर्क करें',
    },
    cookies: {
      desc: 'दुयूफ़ अल-रहमान वीआईपी पर कुकी नीति और तकनीकी स्टोरेज का उपयोग।',
      sections: [
        {
          heading: '1. कुकीज़ क्या हैं?',
          body: 'कुकीज़ और लोकल ब्राउज़र स्टोरेज आपकी पसंदीदा भाषा (10 समर्थित भाषाओं में से), मुद्रा (SAR या USD) और लाइट/डार्क थीम को याद रखते हैं।',
        },
        {
          heading: '2. केवल आवश्यक तकनीकी कुकीज़',
          body: 'हम बिना किसी तृतीय-पक्ष विज्ञापन ट्रैकिंग के केवल आपकी बुकिंग और डिस्प्ले प्राथमिकताओं के लिए आवश्यक कुकीज़ का उपयोग करते हैं।',
        },
      ],
    },
    safety: {
      badge: 'तीर्थयात्रियों की मानसिक शांति',
      title: 'सुरक्षा मानक और चौफर प्रोटोकॉल',
      subtitle: 'आपकी पवित्र यात्रा आगमन से प्रस्थान तक सर्वोच्च सुरक्षा, स्वच्छता और पेशेवर सम्मान की हकदार है।',
      pillars: [
        {
          title: 'सत्यापित और प्रशिक्षित ड्राइवर',
          desc: 'प्रत्येक ड्राइवर लाइसेंस सत्यापन और आतिथ्य प्रशिक्षण से गुजरता है।',
          bullets: [
            'अरबी और अंग्रेजी में संवाद करने वाले ड्राइवर',
            'मक्का और मदीना के होटल क्षेत्रों की पूरी जानकारी',
            'विनम्र व्यवहार और समय की पाबंदी',
          ],
        },
        {
          title: '25-बिंदु वाहन निरीक्षण',
          desc: 'लंबी हाईवे यात्रा से पहले वाहनों की दैनिक तकनीकी जांच की जाती है।',
          bullets: [
            'टायर, ब्रेक और सस्पेंशन की दैनिक जांच',
            'प्रत्येक यात्रा से पहले उच्च क्षमता वाले एसी की जांच',
            'सभी वाहनों में 100% धूम्रपान-मुक्त केबिन नीति',
          ],
        },
        {
          title: 'परिवार और बुजुर्गों के लिए आराम',
          desc: 'बुजुर्ग माता-पिता और बच्चों के साथ यात्रा करने वाले परिवारों के लिए विशेष देखभाल।',
          bullets: [
            'आसान प्रवेश और सामान रखने में पूर्ण सहायता',
            'हाईवे पर सहज और स्थिर ड्राइविंग',
            'नमाज़, विश्राम और मीक़ात के लिए लचीले स्टॉप',
          ],
        },
        {
          title: '24/7 डिस्पैच संचालन',
          desc: 'हमारी संचालन टीम चौबीसों घंटे आपकी यात्रा की निगरानी करती है।',
          bullets: [
            'लाइव फ्लाइट रडार ट्रैकिंग',
            'प्रत्येक बुकिंग के लिए समर्पित व्हाट्सएप समन्वयक',
            'यात्रा पूरी होने पर गंतव्य पर ड्राइवर को नकद भुगतान',
          ],
        },
      ],
      ctaTitle: 'पूर्ण मानसिक शांति के साथ यात्रा करें',
      ctaDesc: 'निश्चित किराए, शून्य अग्रिम जमा और यात्रा पूरी होने पर ड्राइवर को नकद भुगतान (SAR या USD) के साथ आज ही अपना निजी वाहन बुक करें।',
    },
    partners: {
      badge: 'ट्रैवल एजेंसियां और समूह संचालक',
      title: 'दुयूफ़ अल-रहमान वीआईपी के साथ B2B साझेदारी',
      subtitle: 'हम जेद्दा, मक्का और मदीना में विश्वसनीय वीआईपी ग्राउंड ट्रांसपोर्ट प्रदान करने के लिए अंतरराष्ट्रीय ट्रैवल एजेंसियों और उमरा ग्रुप ऑपरेटरों के साथ काम करते हैं।',
      cards: [
        {
          title: 'B2B समूह दरें',
          desc: 'मौसमी अनुबंधों, एकाधिक उड़ान आगमन और समूहों के लिए निश्चित दरें।',
        },
        {
          title: 'समर्पित समन्वयक',
          desc: 'आपके सभी समूह कार्यक्रमों और होटल ड्रॉप-ऑफ के लिए एक केंद्रीय व्हाट्सएप समन्वयक।',
        },
        {
          title: 'स्पष्ट यात्रा प्रबंधन',
          desc: 'व्यवस्थित बुकिंग पुष्टि और हवाई अड्डे पर समय पर स्वागत।',
        },
      ],
      ctaTitle: 'समूह परिवहन समन्वय के लिए तैयार हैं?',
      ctaDesc: 'अपने समूह कार्यक्रम, यात्रियों की संख्या और मार्ग आवश्यकताओं के साथ हमारी एजेंसी रिलेशंस टीम से संपर्क करें।',
      waBtn: 'व्हाट्सएप पर एजेंसी टीम से चैट करें',
      contactBtn: 'औपचारिक अनुरोध भेजें',
    },
  },
};
