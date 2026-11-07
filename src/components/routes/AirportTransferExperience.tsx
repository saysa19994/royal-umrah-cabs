'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import {
  Plane,
  ShieldCheck,
  Luggage,
  Users,
  Clock,
  Sparkles,
  MapPin,
  CheckCircle2,
  Car,
  Compass,
  ArrowRight,
  Info,
  Award,
  Shield,
  Banknote,
  Navigation,
} from 'lucide-react';

export interface AirportTransferExperienceProps {
  locale: Locale;
  slug: string;
  minPriceSAR?: number;
  rates?: Record<string, number>;
}

interface TranslationData {
  badge: string;
  title: string;
  subtitle: string;
  terminalTab1: string;
  terminalTab1Subtitle: string;
  terminalTab2: string;
  terminalTab2Subtitle: string;
  terminal1Details: {
    gateTitle: string;
    gateDesc: string;
    meetingSpotTitle: string;
    meetingSpotDesc: string;
    walkingTime: string;
  };
  terminal2Details: {
    gateTitle: string;
    gateDesc: string;
    meetingSpotTitle: string;
    meetingSpotDesc: string;
    walkingTime: string;
  };
  filterTitle: string;
  filterSubtitle: string;
  filterAll: string;
  filterCouples: string;
  filterFamily: string;
  filterExtended: string;
  filterExecutive: string;
  paxLabel: string;
  bagsLabel: string;
  timelineTitle: string;
  timelineSubtitle: string;
  steps: {
    title: string;
    desc: string;
    highlight: string;
  }[];
  guaranteeBadge: string;
  guaranteeTitle: string;
  guaranteeDesc: string;
  bookNowButton: string;
  contactWhatsApp: string;
  sarLabel: string;
  fixedFareLabel: string;
  optimalChoiceBadge: string;
}

const TRANSLATIONS: Record<Locale, TranslationData> = {
  ar: {
    badge: 'خدمة كبار الشخصيات بالمطار',
    title: 'بروتوكول الاستقبال الملكي في مطار الملك عبدالعزيز الدولي',
    subtitle: 'تجربة استقبال حصرية واستثنائية لضيوف الرحمن فور خروجهم من بوابات الوصول بجدة وحتى باب فندق مكة المكرمة.',
    terminalTab1: 'الصالة رقم 1 (الحديثة)',
    terminalTab1Subtitle: 'رحلات الخطوط السعودية وأغلب الطيران الدولي المنتظم',
    terminalTab2: 'الصالة الشمالية (North Terminal)',
    terminalTab2Subtitle: 'طيران ناس، فلاي دبي، ومختلف رحلات الطيران الاقتصادي والموسمي',
    terminal1Details: {
      gateTitle: 'بوابات الوصول الدولية والمحلية',
      gateDesc: 'بعد الخروج من منطقة الجمارك واستلام الأمتعة، توجه مباشرة نحو ردهة الاستقبال الرئيسية.',
      meetingSpotTitle: 'نقطة الالتقاء باللوحة الاسمية',
      meetingSpotDesc: 'سائقك الخاص في انتظارك أمام حوض الأسماك البانورامي الشهير (Aquarium) حاملاً لوحة اسمية إلكترونية فاخرة.',
      walkingTime: '3 دقائق سيراً إلى الموقف الخاص',
    },
    terminal2Details: {
      gateTitle: 'صالة الوصول الشمالية الخارجية',
      gateDesc: 'بعد ختم الجوازات واستلام حقائب العمرة، توجه نحو المخرج رقم 4 المخصص لسيارات الليموزين والنقل الخاص.',
      meetingSpotTitle: 'نقطة الالتقاء الرسمية',
      meetingSpotDesc: 'سائقك بانتظارك فور الخروج مباشرة في منطقة رصيف الاستقبال المخصص مع عربة تحميل الحقائب.',
      walkingTime: 'دقيقتان سيراً إلى رصيف السيارات',
    },
    filterTitle: 'محدد الأسطول الذكي حسب حجم العائلة والأمتعة',
    filterSubtitle: 'اختر سعة أفراد عائلتك لنبرز لك السيارة الأكثر راحة وملاءمة لحقائبك مع تسعيرتها المعتمدة:',
    filterAll: 'كافة الفئات',
    filterCouples: 'أفراد وأزواج (1-3 ركاب)',
    filterFamily: 'عائلات (4-7 ركاب)',
    filterExtended: 'عائلات ممتدة (8-10 ركاب)',
    filterExecutive: 'رئاسي فاخر VIP',
    paxLabel: 'ركاب',
    bagsLabel: 'حقائب سفر كبيرة',
    timelineTitle: 'المسار الزمني لتجربة الوصول: من الطائرة حتى بهو الفندق',
    timelineSubtitle: 'بروتوكول لوجستي متكامل يضمن لك الراحة والسكينة دون أي دقيقة انتظار أو ارتباك:',
    steps: [
      {
        title: '1. المراقبة الرادارية لموعد هبوط الطائرة',
        desc: 'يتتبع فريق العمليات رقم رحلتك الجوية لحظة بلحظة، مع احتساب وقت إضافي مجاني يصل إلى 90 دقيقة بعد الهبوط لإنهاء الجوازات واستلام الأمتعة.',
        highlight: '90 دقيقة انتظار مجاني',
      },
      {
        title: '2. الاستقبال الملكي باللوحة الاسمية الرقمية',
        desc: 'يستقبلك سائقك بالزي الرسمي عند بوابة الخروج من الصالة حاملاً لوحة اسمية فاخرة تحمل اسمك الكريم لتجده في ثوانٍ معدودة.',
        highlight: 'Meet & Greet شخصي',
      },
      {
        title: '3. خدمة مناولة الأمتعة والمقصورة المعقمة',
        desc: 'يتولى السائق نقل وتحميل كافة الحقائب إلى صندوق السيارة برفق، لتدخل مقصورة مبردة ومجهزة بعبوات ماء زمزم وشواحن هواتف سريعة.',
        highlight: 'ضيافة زمزم مبردة',
      },
      {
        title: '4. الانطلاق عبر طريق مكة - جدة السريع المباشر',
        desc: 'رحلة آمنة وسلسة عبر طريق 40 السريع بطول 95 كم دون أي توقف وسيط أو ركاب إضافيين، مع سائق نظامي محترف وخبير بالطرق.',
        highlight: 'طريق سريع مباشر (75 دقيقة)',
      },
      {
        title: '5. التوصيل إلى بهو فندقك بمكة المكرمة مباشرة',
        desc: 'الوصول المباشر إلى مدخل فندقك في المنطقة المركزية، جبل عمر، أجياد، أو العزيزية، مع مساعدة السائق في تنزيل الحقائب حتى ردهة الفندق.',
        highlight: 'من الباب إلى الباب',
      },
      {
        title: '6. السداد نقداً كاش عند الوصول — 0% مخاطرة',
        desc: 'تسليم قيمة الرحلة الثابتة نقداً للسائق بالريال السعودي أو الدولار بعد وصولك سالماً، دون الحاجة لبطاقات ائتمانية أو دفعات مسبقة.',
        highlight: '100% كاش عند الوصول',
      },
    ],
    guaranteeBadge: 'ضمان ضيوف الرحمن VIP',
    guaranteeTitle: 'سياسة الأمان والشفافية التامة',
    guaranteeDesc: 'السعر المعروض شامل لكافة رسوم الطرق السريعة ومواقف المطار وضريبة القيمة المضافة. لا توجد أي مبالغ خفية، ولا نطلب منك أي بطاقة ائتمانية على الإطلاق.',
    bookNowButton: 'احجز هذا المسار الآن',
    contactWhatsApp: 'محادثة الكونسيرج الفورية',
    sarLabel: 'ر.س',
    fixedFareLabel: 'السعر الثابت للمركبة بالكامل',
    optimalChoiceBadge: 'الخيار الموصى به',
  },
  en: {
    badge: 'Airport VIP Service',
    title: 'Royal Arrival Protocol at King Abdulaziz International Airport (KAIA)',
    subtitle: 'An exclusive, stress-free arrival experience for Umrah pilgrims directly from Jeddah Airport arrival doors to your Makkah hotel lobby.',
    terminalTab1: 'Terminal 1 (New Terminal)',
    terminalTab1Subtitle: 'Saudia, SkyTeam, and premier scheduled international airlines',
    terminalTab2: 'North Terminal',
    terminalTab2Subtitle: 'Flynas, Flyadeal, Flydubai, and various low-cost / charter flights',
    terminal1Details: {
      gateTitle: 'International & Domestic Arrivals',
      gateDesc: 'After exiting customs inspection and collecting your luggage, proceed straight toward the main public arrivals concourse.',
      meetingSpotTitle: 'Designated Meeting Point with Digital Sign',
      meetingSpotDesc: 'Your personal VIP chauffeur will be waiting directly in front of the landmark central aquarium holding an executive digital nameboard.',
      walkingTime: '3-minute walk to VIP parking curbside',
    },
    terminal2Details: {
      gateTitle: 'North Terminal Outdoor Exit Area',
      gateDesc: 'After passport clearance and Umrah baggage claim, walk toward Exit Gate 4 dedicated to private chauffeur and limousine transfers.',
      meetingSpotTitle: 'Official Chauffeur Curbside Meeting Area',
      meetingSpotDesc: 'Your chauffeur awaits right at the gate exit with a luggage cart ready to take immediate custody of your bags.',
      walkingTime: '2-minute walk to executive boarding lane',
    },
    filterTitle: 'Intelligent Fleet Matching by Family & Luggage Capacity',
    filterSubtitle: 'Select your travel party size to highlight the most comfortable vehicle with verified cargo dimensions:',
    filterAll: 'All Vehicles',
    filterCouples: 'Solo & Couples (1-3 Pax)',
    filterFamily: 'Family Groups (4-7 Pax)',
    filterExtended: 'Extended Families (8-10 Pax)',
    filterExecutive: 'Executive VIP Suite',
    paxLabel: 'Passengers',
    bagsLabel: 'Standard Large Bags',
    timelineTitle: 'Step-by-Step Arrival Journey: Runway to Hotel Lobby',
    timelineSubtitle: 'A meticulously orchestrated chauffeur sequence ensuring zero confusion, zero delays, and pure peace of mind:',
    steps: [
      {
        title: '1. Live ATC Radar Flight Tracking',
        desc: 'Our dispatch team monitors your exact flight telemetry. Even if your flight is delayed, your chauffeur adjusts automatically with a 90-minute complimentary buffer.',
        highlight: '90-Min Free Buffer',
      },
      {
        title: '2. Personalized Meet & Greet at Arrivals',
        desc: 'As you clear the arrival doors, your uniformed chauffeur welcomes you holding a legible digital nameplate with your family name.',
        highlight: 'Personalized Meet & Greet',
      },
      {
        title: '3. Luggage Porterage & Chilled Boarding',
        desc: 'Your chauffeur handles all heavy luggage. Step into a sanitized, climate-controlled cabin stocked with chilled Zamzam water and device chargers.',
        highlight: 'Chilled Zamzam Hospitality',
      },
      {
        title: '4. Direct Highway 40 Express Transit',
        desc: 'Relax on a smooth 95 km express transfer on the modern 6-lane Makkah highway. Fully private with no intermediate stops or shared riders.',
        highlight: 'Non-Stop Direct Route (~75 mins)',
      },
      {
        title: '5. Hotel Lobby Curbside Drop-off',
        desc: 'Direct drop-off at your hotel portico across Central Haram, Jabal Omar, Ajyad, or Aziziyah. Chauffeur assists luggage right into the reception lobby.',
        highlight: 'Door-to-Door Concierge',
      },
      {
        title: '6. 100% Cash Payment on Arrival — Zero Risk',
        desc: 'Hand the agreed fixed fare to the driver upon safe arrival in SAR or USD. No advance card authorization or payment trap.',
        highlight: '100% Cash on Arrival',
      },
    ],
    guaranteeBadge: 'Duyuf Al Rahman VIP Guarantee',
    guaranteeTitle: 'Complete Price & Safety Transparency',
    guaranteeDesc: 'Quoted fares are all-inclusive: highway tolls, airport terminal parking fees, fuel, and taxes are fully covered. Zero hidden extras.',
    bookNowButton: 'Book This Route Now',
    contactWhatsApp: 'Instant WhatsApp Concierge',
    sarLabel: 'SAR',
    fixedFareLabel: 'Fixed Total Vehicle Fare',
    optimalChoiceBadge: 'Recommended Match',
  },
  ms: {
    badge: 'Perkhidmatan VIP Lapangan Terbang',
    title: 'Protokol Ketibaan Diraja di Lapangan Terbang Antarabangsa King Abdulaziz (KAIA)',
    subtitle: 'Pengalaman ketibaan eksklusif dan selesa untuk jemaah Umrah dari pintu ketibaan Jeddah terus ke lobi hotel Makkah.',
    terminalTab1: 'Terminal 1 (Terminal Baharu)',
    terminalTab1Subtitle: 'Saudia dan syarikat penerbangan antarabangsa berjadual utama',
    terminalTab2: 'Terminal Utara (North Terminal)',
    terminalTab2Subtitle: 'Penerbangan tambang rendah dan sewa khas (Flynas, AirAsia, dll)',
    terminal1Details: {
      gateTitle: 'Ketibaan Antarabangsa & Domestik',
      gateDesc: 'Selepas selesai pemeriksaan kastam dan mengambil bagasi, terus ke kawasan ketibaan utama.',
      meetingSpotTitle: 'Tempat Pertemuan dengan Papan Tanda Nama',
      meetingSpotDesc: 'Pemandu peribadi anda sedia menunggu di hadapan akuarium gergasi dengan papan tanda nama digital.',
      walkingTime: '3 minit berjalan kaki ke tempat parkir VIP',
    },
    terminal2Details: {
      gateTitle: 'Kawasan Pintu Keluar Terminal Utara',
      gateDesc: 'Selepas urusan imigresen dan bagasi, keluar melalui Pintu 4 khusus untuk pengangkutan peribadi.',
      meetingSpotTitle: 'Tempat Pertemuan Rasmi',
      meetingSpotDesc: 'Pemandu sedia menunggu di luar pintu bersama troli bagasi untuk membantu urusan anda.',
      walkingTime: '2 minit ke kawasan menaiki kenderaan',
    },
    filterTitle: 'Padanan Kenderaan Pintar Mengikut Kapasiti & Bagasi',
    filterSubtitle: 'Pilih saiz kumpulan anda untuk melihat kenderaan paling selesa dengan harga rasmi:',
    filterAll: 'Semua Kenderaan',
    filterCouples: 'Individu & Pasangan (1-3 Orang)',
    filterFamily: 'Keluarga Sederhana (4-7 Orang)',
    filterExtended: 'Keluarga Besar (8-10 Orang)',
    filterExecutive: 'VIP Eksekutif Mewah',
    paxLabel: 'Penumpang',
    bagsLabel: 'Bagasi Besar',
    timelineTitle: 'Garis Masa Perjalanan: Dari Pesawat ke Lobi Hotel',
    timelineSubtitle: 'Protokol tersusun rapi bagi memastikan ketibaan lancar tanpa sebarang kelewatan atau kekeliruan:',
    steps: [
      {
        title: '1. Pemantauan Radar Penerbangan Langsung',
        desc: 'Kami memantau status penerbangan anda. Masa menunggu percuma sehingga 90 minit selepas mendarat disediakan.',
        highlight: '90 Minit Menunggu Percuma',
      },
      {
        title: '2. Sambutan Peribadi di Pintu Keluar',
        desc: 'Pemandu berpakaian kemas menyambut anda dengan papan tanda digital tertera nama keluarga anda.',
        highlight: 'Sambutan Peribadi VIP',
      },
      {
        title: '3. Bantuan Bagasi & Kenderaan Sejuk',
        desc: 'Pemandu menguruskan semua beg. Masuk ke ruang selesa berhawa dingin lengkap dengan air Zamzam sejuk.',
        highlight: 'Air Zamzam Disediakan',
      },
      {
        title: '4. Perjalanan Terus Lebuhraya Makkah (Laluan 40)',
        desc: 'Perjalanan 95 km tanpa henti terus ke Makkah tanpa penumpang lain.',
        highlight: 'Laluan Terus (~75 minit)',
      },
      {
        title: '5. Penghantaran ke Lobi Hotel Makkah',
        desc: 'Penghantaran terus ke pintu hotel anda di Zon Masjidil Haram, Jabal Omar, atau Ajyad.',
        highlight: 'Dari Pintu ke Pintu',
      },
      {
        title: '6. Bayaran Tunai Semasa Tiba — 0% Risiko',
        desc: 'Bayar jumlah tetap secara tunai (SAR atau USD) kepada pemandu selepas selamat tiba.',
        highlight: '100% Tunai Semasa Tiba',
      },
    ],
    guaranteeBadge: 'Jaminan Duyuf Al Rahman VIP',
    guaranteeTitle: 'Ketelusan Harga Sepenuhnya',
    guaranteeDesc: 'Harga merangkumi tol lebuhraya, caj letak kereta lapangan terbang, dan cukai. Tiada sebarang caj tersembunyi.',
    bookNowButton: 'Tempah Laluan Ini Sekarang',
    contactWhatsApp: 'Hubungi WhatsApp Segera',
    sarLabel: 'SAR',
    fixedFareLabel: 'Harga Tetap Satu Kenderaan',
    optimalChoiceBadge: 'Pilihan Disyorkan',
  },
  id: {
    badge: 'Layanan VIP Bandara',
    title: 'Protokol Penjemputan Kerajaan di Bandara Internasional King Abdulaziz (KAIA)',
    subtitle: 'Pengalaman penjemputan eksklusif dan tenang bagi jamaah Umrah dari pintu kedatangan Jeddah langsung ke lobi hotel Makkah.',
    terminalTab1: 'Terminal 1 (Terminal Baru)',
    terminalTab1Subtitle: 'Garuda Indonesia, Saudia, dan maskapai penerbangan internasional utama',
    terminalTab2: 'Terminal Utara (North Terminal)',
    terminalTab2Subtitle: 'Lion Air, Flynas, dan penerbangan carter jamaah',
    terminal1Details: {
      gateTitle: 'Area Kedatangan Internasional',
      gateDesc: 'Setelah pemeriksaan imigrasi, bea cukai, dan mengambil koper, langsung menuju area kedatangan publik.',
      meetingSpotTitle: 'Titik Temu dengan Papan Nama',
      meetingSpotDesc: 'Sopir VIP Anda menunggu tepat di depan akuarium besar dengan papan nama digital nama Anda.',
      walkingTime: '3 menit jalan kaki ke lobi parkir VIP',
    },
    terminal2Details: {
      gateTitle: 'Pintu Keluar Terminal Utara',
      gateDesc: 'Setelah selesai klaim bagasi Umrah, berjalan menuju Pintu Keluar 4 khusus penjemputan privat.',
      meetingSpotTitle: 'Titik Temu Resmi Sopir',
      meetingSpotDesc: 'Sopir berseragam telah siap di luar gerbang dengan troli koper untuk membantu barang bawaan Anda.',
      walkingTime: '2 menit ke area mobil',
    },
    filterTitle: 'Pencocokan Armada Pintar Sesuai Jumlah Jamaah & Koper',
    filterSubtitle: 'Pilih ukuran keluarga Anda untuk menemukan mobil paling pas dan nyaman dengan tarif resmi:',
    filterAll: 'Semua Mobil',
    filterCouples: 'Jamaah Mandiri / Pasutri (1-3 Orang)',
    filterFamily: 'Keluarga Inti (4-7 Orang)',
    filterExtended: 'Keluarga Besar / Rombongan (8-10 Orang)',
    filterExecutive: 'Eksekutif Mewah VIP',
    paxLabel: 'Penumpang',
    bagsLabel: 'Koper Besar',
    timelineTitle: 'Rangkaian Penjemputan: Dari Pesawat ke Lobi Hotel',
    timelineSubtitle: 'Protokol rapi dan pasti agar ibadah Anda dimulai dengan ketenangan tanpa kebingungan:',
    steps: [
      {
        title: '1. Pemantauan Radar Penerbangan Langsung',
        desc: 'Tim kami melacak jadwal pesawat Anda. Waktu tunggu gratis hingga 90 menit setelah mendarat untuk kemudahan imigrasi.',
        highlight: 'Gratis Tunggu 90 Menit',
      },
      {
        title: '2. Penyambutan dengan Papan Nama Digital',
        desc: 'Keluar dari gate, sopir Anda langsung menyambut dengan papan nama digital bertuliskan nama Anda.',
        highlight: 'Penjemputan Personal VIP',
      },
      {
        title: '3. Layanan Angkut Koper & Kabin Dingin',
        desc: 'Sopir mengangkat semua koper Anda ke bagasi. Nikmati kabin bersih ber-AC dengan air Zamzam dingin.',
        highlight: 'Air Zamzam Dingin Siap Saji',
      },
      {
        title: '4. Perjalanan Tol Cepat Makkah - Jeddah (Rute 40)',
        desc: 'Perjalanan 95 km nyaman tanpa berhenti dan tanpa penumpang lain yang digabung.',
        highlight: 'Rute Langsung (~75 Menit)',
      },
      {
        title: '5. Antar Langsung Sampai Lobi Hotel Makkah',
        desc: 'Tiba langsung di lobi hotel Anda di Ring 1 Masjidil Haram, Jabal Omar, atau Ajyad. Koper dibantu hingga resepsionis.',
        highlight: 'Antar Sampai Pintu Lobi',
      },
      {
        title: '6. Bayar Tunai di Tempat (Cash on Arrival) — 0% Risiko',
        desc: 'Bayar tarif pasti kepada sopir setibanya di hotel dalam SAR atau USD. Tanpa uang muka atau kartu kredit.',
        highlight: '100% Bayar Cash di Lokasi',
      },
    ],
    guaranteeBadge: 'Jaminan Duyuf Al Rahman VIP',
    guaranteeTitle: 'Transparansi Harga Tanpa Biaya Tersembunyi',
    guaranteeDesc: 'Harga sudah termasuk tol jalan raya, parkir bandara, bensin, dan pajak. Tidak ada biaya tambahan apapun.',
    bookNowButton: 'Pesan Rute Ini Sekarang',
    contactWhatsApp: 'Chat WhatsApp Sekarang',
    sarLabel: 'SAR',
    fixedFareLabel: 'Tarif Pasti 1 Mobil Privat',
    optimalChoiceBadge: 'Rekomendasi Terbaik',
  },
  ur: {
    badge: 'ایئرپورٹ وی آئی پی سروس',
    title: 'شاہ عبدالعزیز انٹرنیشنل ایئرپورٹ (جدہ) پر شاہی استقبالیہ پروٹوکول',
    subtitle: 'معتمرین کرام اور مہمانانِ رحمن کے لیے جدہ ایئرپورٹ کے اراؤل گیٹ سے مکہ مکرمہ کے ہوٹل تک ایک محفوظ، باوقار اور پرتعیش سفر کا تجربہ۔',
    terminalTab1: 'ٹرمینل 1 (نیا جدید ایئرپورٹ)',
    terminalTab1Subtitle: 'سعودیہ ایئرلائنز، پی آئی اے اور بڑی بین الاقوامی پروازیں',
    terminalTab2: 'نارتھ ٹرمینل (شمالی الصالہ)',
    terminalTab2Subtitle: 'فلائی جناح، فلائی دبئی، ایئر سیال اور دیگر پروازیں',
    terminal1Details: {
      gateTitle: 'بین الاقوامی اراؤل ہال',
      gateDesc: 'امیگریشن، کسٹم اور سامان وصول کرنے کے بعد مرکزی اراؤل ہال کی طرف تشریف لائیں۔',
      meetingSpotTitle: 'نام والے ڈیجیٹل بورڈ کا مقام',
      meetingSpotDesc: 'آپ کا وی آئی پی ڈرائیور مشہور بڑے ایکویریم کے بالکل سامنے آپ کے نام کا ڈیجیٹل بورڈ لیے منتظر ہوگا۔',
      walkingTime: 'وی آئی پی پارکنگ تک صرف 3 منٹ پیدل فاصلہ',
    },
    terminal2Details: {
      gateTitle: 'نارتھ ٹرمینل بیرونی ایگزٹ',
      gateDesc: 'عمرہ سامان وصول کرنے کے بعد گیٹ نمبر 4 کی طرف تشریف لائیں جو پرائیویٹ لیموزین کے لیے مخصوص ہے۔',
      meetingSpotTitle: 'باضابطہ ملاقات کی جگہ',
      meetingSpotDesc: 'ڈرائیور گیٹ کے بالکل باہر سامان کی ٹرالی کے ساتھ آپ کے انتظار میں موجود ہوگا۔',
      walkingTime: 'گاڑی تک 2 منٹ پیدل فاصلہ',
    },
    filterTitle: 'فیملی اور سامان کے مطابق بہترین گاڑی کا انتخاب',
    filterSubtitle: 'اپنی فیملی کے افراد اور سامان کے مطابق مناسب ترین گاڑی اور سرکاری ریٹ منتخب فرمائیں:',
    filterAll: 'تمام گاڑیاں',
    filterCouples: 'افراد اور جوڑے (1 تا 3 مسافر)',
    filterFamily: 'فیملی گروپ (4 تا 7 مسافر)',
    filterExtended: 'بڑی فیملیز (8 تا 10 مسافر)',
    filterExecutive: 'پرتعیش ایگزیکٹو وی آئی پی',
    paxLabel: 'مسافر',
    bagsLabel: 'بڑے سفری بیگز',
    timelineTitle: 'پرواز سے ہوٹل لابی تک کا مرحلہ وار سفر',
    timelineSubtitle: 'انتہائی منظم اور شفاف طریقہ کار تاکہ آپ کا روحانی سفر بغیر کسی الجھن کے پرسکون گزرے:',
    steps: [
      {
        title: '1. فلائٹ ریڈار کے ذریعے پرواز کی براہ راست نگرانی',
        desc: 'ہماری آپریشنز ٹیم آپ کی پرواز کو ٹریک کرتی ہے۔ پرواز میں تاخیر پر بھی 90 منٹ تک مفت انتظار کی سہولت شامل ہے۔',
        highlight: '90 منٹ تک مفت انتظار',
      },
      {
        title: '2. نام والے ڈیجیٹل بورڈ کے ساتھ پُروقار استقبال',
        desc: 'لاؤنج سے نکلتے ہی باحیا و بااخلاق ڈرائیور آپ کے نام کا بورڈ اٹھائے خوش آمدید کہنے کو تیار ہوگا۔',
        highlight: 'باضابطہ ذاتی استقبال',
      },
      {
        title: '3. سامان اٹھانے کی خدمت اور ٹھنڈا کیبن',
        desc: 'ڈرائیور تمام بھاری سامان گاڑی میں لوڈ کرے گا۔ مکمل ایئر کنڈیشنڈ گاڑی میں ٹھنڈا آبِ زمزم پیش کیا جائے گا۔',
        highlight: 'ٹھنڈا آبِ زمزم دستیاب',
      },
      {
        title: '4. مکہ ایکسپریس وے (روٹ 40) پر براہ راست سفر',
        desc: 'جدہ سے مکہ کا 95 کلومیٹر کا فاصلہ بغیر کسی غیر ضروری اسٹاپ یا سواریوں کی شیئرنگ کے طے کریں۔',
        highlight: 'براہِ راست راستہ (~75 منٹ)',
      },
      {
        title: '5. مکہ مکرمہ میں ہوٹل کی لابی تک باحفاظت ڈراپ',
        desc: 'مرکزی حرم، جبل عمر یا عزیزیہ میں آپ کے ہوٹل کے گیٹ تک رسائی۔ سامان ہوٹل کے اندر تک پہنچانے میں مکمل مدد۔',
        highlight: 'دروازے سے دروازے تک',
      },
      {
        title: '6. پہنچنے پر کیش ادائیگی (Cash on Arrival) — 0% خطرہ',
        desc: 'ہوٹل باحفاظت پہنچنے کے بعد ڈرائیور کو طے شدہ کرایہ سعودی ریال یا ڈالر میں نقد ادا کریں۔ کوئی پیشگی ادائیگی نہیں۔',
        highlight: '100% کیش ادائیگی پہنچنے پر',
      },
    ],
    guaranteeBadge: 'ضیوف الرحمن وی آئی پی ضمانت',
    guaranteeTitle: 'شفافیت اور محفوظ سفر کی ضمانت',
    guaranteeDesc: 'ریٹس میں ٹول ٹیکس، ایئرپورٹ پارکنگ اور فیول مکمل شامل ہے۔ کوئی چھپے ہوئے اضافی چارجز نہیں ہیں۔',
    bookNowButton: 'یہ سفر ابھی بک کریں',
    contactWhatsApp: 'واٹس ایپ پر رابطہ کریں',
    sarLabel: 'ریال',
    fixedFareLabel: 'گاڑی کا مکمل طے شدہ کرایہ',
    optimalChoiceBadge: 'بہترین تجویز',
  },
  fr: {
    badge: 'Service VIP Aéroport',
    title: 'Protocole d\'Accueil Royal à l\'Aéroport International King Abdulaziz (KAIA)',
    subtitle: 'Une prise en charge d\'exception dès la sortie des douanes de Djeddah jusqu\'au hall de votre hôtel à La Mecque.',
    terminalTab1: 'Terminal 1 (Nouveau Terminal)',
    terminalTab1Subtitle: 'Saudia, Air France, et principales compagnies internationales',
    terminalTab2: 'Terminal Nord (North Terminal)',
    terminalTab2Subtitle: 'Vols charters, Flynas, Transavia, et vols pèlerins réguliers',
    terminal1Details: {
      gateTitle: 'Hall des Arrivées Internationales',
      gateDesc: 'Après le contrôle des passeports et la récupération des bagages, avancez vers le hall public principal.',
      meetingSpotTitle: 'Point de Rendez-vous avec Pancarte Personnalisée',
      meetingSpotDesc: 'Votre chauffeur VIP vous attend directement devant le grand aquarium emblématique avec une pancarte numérique à votre nom.',
      walkingTime: '3 minutes à pied vers le stationnement VIP',
    },
    terminal2Details: {
      gateTitle: 'Sortie Extérieure Terminal Nord',
      gateDesc: 'Après avoir récupéré vos bagages de Omra, sortez par la Porte 4 dédiée aux navettes privées.',
      meetingSpotTitle: 'Zone de Rencontre Officielle',
      meetingSpotDesc: 'Le chauffeur vous attend à la porte avec un chariot pour prendre en charge vos valises sans effort.',
      walkingTime: '2 minutes jusqu\'au véhicule',
    },
    filterTitle: 'Sélection Intelligente selon Famille & Bagages',
    filterSubtitle: 'Sélectionnez la taille de votre groupe pour afficher le véhicule idéal avec tarif garanti :',
    filterAll: 'Tous les Véhicules',
    filterCouples: 'Individuel & Couples (1-3 Pax)',
    filterFamily: 'Familles (4-7 Pax)',
    filterExtended: 'Grandes Familles (8-10 Pax)',
    filterExecutive: 'Suite Présidentielle VIP',
    paxLabel: 'Passagers',
    bagsLabel: 'Grandes Valises',
    timelineTitle: 'Déroulement de l\'Accueil : De la Piste à l\'Hôtel',
    timelineSubtitle: 'Une logistique d\'une précision absolue pour un voyage spirituel en toute sérénité :',
    steps: [
      {
        title: '1. Suivi Radar de Votre Vol en Temps Réel',
        desc: 'Nous surveillons l\'atterrissage de votre vol. 90 minutes d\'attente gratuite incluses après le posé des roues.',
        highlight: '90 Min d\'Attente Gratuite',
      },
      {
        title: '2. Accueil Personnalisé aux Arrivées',
        desc: 'Dès les portes franchies, votre chauffeur privé en uniforme vous accueille avec une pancarte nominative soignée.',
        highlight: 'Accueil VIP Dédié',
      },
      {
        title: '3. Prise en Charge des Bagages & Confort Climatisé',
        desc: 'Vos bagages sont chargés par le chauffeur. Bouteilles d\'eau de Zamzam fraîches et chargeurs disponibles à bord.',
        highlight: 'Eau de Zamzam Fraîche',
      },
      {
        title: '4. Trajet Direct Autoroute 40 Djeddah - La Mecque',
        desc: 'Transfert express de 95 km sans arrêt intermédiaire ni passagers partagés jusqu\'à La Mecque.',
        highlight: 'Trajet Direct Non-Stop (~75 min)',
      },
      {
        title: '5. Dépose au Hall de Votre Hôtel',
        desc: 'Accès direct au parvis de votre hôtel à Jabal Omar, Central Haram ou Ajyad avec aide pour vos valises.',
        highlight: 'Service Porte-à-Porte',
      },
      {
        title: '6. Paiement en Espèces à l\'Arrivée — 0% Risque',
        desc: 'Réglez le montant fixe convenu directement au chauffeur en SAR ou EUR/USD à votre arrivée. Zéro acompte.',
        highlight: '100% Paiement sur Place',
      },
    ],
    guaranteeBadge: 'Garantie Duyuf Al Rahman VIP',
    guaranteeTitle: 'Transparence et Sécurité Absolue',
    guaranteeDesc: 'Tarif fixe incluant péages autoroutiers, parking aéroportuaire et taxes. Aucune mauvaise surprise.',
    bookNowButton: 'Réserver Ce Trajet Maintenant',
    contactWhatsApp: 'Contacter la Conciergerie WhatsApp',
    sarLabel: 'SAR',
    fixedFareLabel: 'Tarif Fixe par Véhicule Privé',
    optimalChoiceBadge: 'Recommandation Idéale',
  },
  tr: {
    badge: 'Havalimanı VIP Karşılama',
    title: 'Kral Abdülaziz Uluslararası Havalimanı (KAIA) Kraliyet Karşılama Protokolü',
    subtitle: 'Cidde Havalimanı kapısından Mekke-i Mükerreme\'deki otelinizin lobisine kadar seçkin ve huzurlu bir VIP transfer deneyimi.',
    terminalTab1: 'Terminal 1 (Yeni Ana Terminal)',
    terminalTab1Subtitle: 'Türk Hava Yolları, Saudia ve büyük tarifeli uluslararası havayolları',
    terminalTab2: 'Kuzey Terminali (North Terminal)',
    terminalTab2Subtitle: 'Pegasus, Flynas ve dönemsel Umre charter uçuşları',
    terminal1Details: {
      gateTitle: 'Dış ve İç Hatlar Geliş Salonu',
      gateDesc: 'Gümrük ve bagaj alımından çıktıktan sonra ana karşılama holüne doğru ilerleyin.',
      meetingSpotTitle: 'İsimlikli Buluşma Noktası',
      meetingSpotDesc: 'Özel şoförünüz, dev akvaryumun tam önünde isminizin yazılı olduğu dijital levha ile sizi bekliyor olacaktır.',
      walkingTime: 'VIP otoparka 3 dakika yürüyüş',
    },
    terminal2Details: {
      gateTitle: 'Kuzey Terminali Çıkış Kapısı',
      gateDesc: 'Bagajlarınızı aldıktan sonra özel transfer araçları için ayrılan 4 numaralı çıkışa yönelin.',
      meetingSpotTitle: 'Resmi Karşılama Alanı',
      meetingSpotDesc: 'Şoförünüz bagaj arabasıyla kapının hemen dışında sizi karşılamak üzere hazır bulunacaktır.',
      walkingTime: 'Araç peronuna 2 dakika',
    },
    filterTitle: 'Aile ve Bagaj Kapasitesine Göre Akıllı Araç Eşleme',
    filterSubtitle: 'Kişi sayınızı seçin, bagajınıza en uygun aracı sabit fiyatıyla hemen görüntüleyin:',
    filterAll: 'Tüm Araçlar',
    filterCouples: 'Bireysel ve Çiftler (1-3 Kişi)',
    filterFamily: 'Aileler (4-7 Kişi)',
    filterExtended: 'Geniş Aileler (8-10 Kişi)',
    filterExecutive: 'Başkanlık VIP Suiti',
    paxLabel: 'Yolcu',
    bagsLabel: 'Büyük Boy Bavul',
    timelineTitle: 'Uçaktan Otele Adım Adım Karşılama Süreci',
    timelineSubtitle: 'Sıfır bekleme ve tam huzur sağlayan kusursuz transfer protokolü:',
    steps: [
      {
        title: '1. Canlı Radar ile Uçuş Takibi',
        desc: 'Uçuşunuz canlı radarla takip edilir. Pasaport ve bagaj için inişten sonra 90 dakika ücretsiz bekleme dahildir.',
        highlight: '90 Dakika Ücretsiz Bekleme',
      },
      {
        title: '2. Çıkış Kapısında İsimlikle Karşılama',
        desc: 'Geliş kapısından çıktığınız anda şoförünüz isminizi taşıyan şık dijital tabela ile sizi karşılar.',
        highlight: 'Kişiye Özel VIP Karşılama',
      },
      {
        title: '3. Bagaj Yardımı ve Klimalı VIP Konfor',
        desc: 'Tüm bavullarınız araca yerleştirilir. Soğuk Zemzem suyu ve şarj üniteleriyle donatılmış temiz kabinde dinlenin.',
        highlight: 'Soğuk Zemzem İkramı',
      },
      {
        title: '4. Doğrudan Mekke Otoyolu (40 Nolu Hat)',
        desc: '95 km mesafeyi ara duraklama veya yabancı yolcu olmadan doğrudan otelinize kat edin.',
        highlight: 'Doğrudan Ekspres Rota (~75 dk)',
      },
      {
        title: '5. Mekke Otel Lobisine Doğrudan Teslim',
        desc: 'Merkezi Harem, Jabal Omar veya Ecyad bölgesindeki otelinizin lobisine kadar bavul taşıma desteği.',
        highlight: 'Kapıdan Kapıya Hizmet',
      },
      {
        title: '6. Varışta Nakit Ödeme — %0 Risk',
        desc: 'Ödemenizi otele güvenle ulaştıktan sonra şoföre nakit (SAR veya USD) yapın. Ön ödeme veya kart gerekmez.',
        highlight: '%100 Varışta Nakit Ödeme',
      },
    ],
    guaranteeBadge: 'Duyuf Al Rahman VIP Güvencesi',
    guaranteeTitle: 'Tam Şeffaflık ve Sabit Fiyat',
    guaranteeDesc: 'Otoyol geçiş ücretleri, havalimanı otoparkı ve vergiler fiyata dahildir. Gizli ücret yoktur.',
    bookNowButton: 'Bu Rotayı Hemen Ayırtın',
    contactWhatsApp: 'WhatsApp Danışmanı ile Konuşun',
    sarLabel: 'SAR',
    fixedFareLabel: 'Tek Araç Sabit Toplam Fiyat',
    optimalChoiceBadge: 'Tavsiye Edilen Tercih',
  },
  de: {
    badge: 'Flughafen VIP-Service',
    title: 'Königliches Empfangsprotokoll am King Abdulaziz International Airport (KAIA)',
    subtitle: 'Ein erstklassiges und entspanntes Ankunftserlebnis für Umrah-Pilger vom Terminal in Dschidda direkt in die Hotellobby in Mekka.',
    terminalTab1: 'Terminal 1 (Neues Hauptterminal)',
    terminalTab1Subtitle: 'Saudia, Lufthansa und große internationale Linienfluggesellschaften',
    terminalTab2: 'Nord-Terminal (North Terminal)',
    terminalTab2Subtitle: 'Charterflüge, Flynas und saisonale Pilgerflüge',
    terminal1Details: {
      gateTitle: 'Internationale & Nationale Ankunft',
      gateDesc: 'Nach Zoll und Gepäckausgabe begeben Sie sich direkt in den öffentlichen Ankunftsbereich.',
      meetingSpotTitle: 'Treffpunkt mit digitalem Namensschild',
      meetingSpotDesc: 'Ihr Chauffeur erwartet Sie direkt vor dem bekannten Großaquarium mit einem digitalen Namensschild.',
      walkingTime: '3 Minuten Fußweg zum VIP-Parkbereich',
    },
    terminal2Details: {
      gateTitle: 'Ausgangsbereich Nord-Terminal',
      gateDesc: 'Folgen Sie nach dem Gepäckband dem Ausgang Tor 4 für private Limousinen.',
      meetingSpotTitle: 'Offizieller Treffpunkt',
      meetingSpotDesc: 'Ihr Chauffeur steht am Gate bereit, um Ihr Gepäck aufzunehmen.',
      walkingTime: '2 Minuten zum Fahrzeug',
    },
    filterTitle: 'Flottenabstimmung nach Personen- & Gepäckkapazität',
    filterSubtitle: 'Wählen Sie Ihre Gruppengröße für das optimale Fahrzeug zum garantierten Festpreis:',
    filterAll: 'Alle Fahrzeuge',
    filterCouples: 'Einzelne & Paare (1-3 Pax)',
    filterFamily: 'Familien (4-7 Pax)',
    filterExtended: 'Großfamilien (8-10 Pax)',
    filterExecutive: 'Präsidiale VIP-Klasse',
    paxLabel: 'Passagiere',
    bagsLabel: 'Große Koffer',
    timelineTitle: 'Schritt-für-Schritt-Ablauf: Vom Rollfeld bis zur Hotellobby',
    timelineSubtitle: 'Perfekt getaktete Logistik für eine sorgenfreie Ankunft:',
    steps: [
      {
        title: '1. Live-Flugüberwachung per Radar',
        desc: 'Ihr Flug wird in Echtzeit überwacht. Inklusive 90 Minuten kostenloser Wartezeit nach der Landung.',
        highlight: '90 Min kostenlose Wartezeit',
      },
      {
        title: '2. Persönlicher Empfang am Gate',
        desc: 'Ihr Chauffeur erwartet Sie mit einem gut lesbaren Namensschild direkt am Ausgang.',
        highlight: 'Persönlicher VIP-Empfang',
      },
      {
        title: '3. Gepäckservice & kühler Komfort',
        desc: 'Der Fahrer verstaut Ihr Gepäck. Erfrischen Sie sich mit gekühltem Zamzam-Wasser im klimatisierten Wagen.',
        highlight: 'Gekühltes Zamzam-Wasser',
      },
      {
        title: '4. Direkte Fahrt über den Makkah Expressway (Route 40)',
        desc: '95 km Direktfahrt ohne Zwischenstopps oder fremde Fahrgäste.',
        highlight: 'Direktverbindung (~75 Min.)',
      },
      {
        title: '5. Ankunft am Hoteleingang in Mekka',
        desc: 'Bequemer Halt direkt vor der Hotellobby in Jabal Omar, Ajyad oder dem Zentrum mit Gepäckhilfe.',
        highlight: 'Tür-zu-Tür-Service',
      },
      {
        title: '6. Barzahlung bei Ankunft — 0% Risiko',
        desc: 'Bezahlen Sie den Festpreis nach der sicheren Ankunft bar beim Fahrer in SAR oder USD. Keine Vorkasse.',
        highlight: '100% Barzahlung vor Ort',
      },
    ],
    guaranteeBadge: 'Duyuf Al Rahman VIP Garantie',
    guaranteeTitle: 'Volle Preistransparenz',
    guaranteeDesc: 'Mautgebühren, Flughafengebühren, Benzin und Steuern sind im Festpreis enthalten. Keine versteckten Kosten.',
    bookNowButton: 'Diesen Transfer jetzt buchen',
    contactWhatsApp: 'WhatsApp-Concierge kontaktieren',
    sarLabel: 'SAR',
    fixedFareLabel: 'Festpreis für das gesamte Fahrzeug',
    optimalChoiceBadge: 'Empfohlene Wahl',
  },
  es: {
    badge: 'Servicio VIP de Aeropuerto',
    title: 'Protocolo Real de Bienvenida en el Aeropuerto Internacional Rey Abdulaziz (KAIA)',
    subtitle: 'Una llegada exclusiva y confortable para peregrinos de Umrah desde la terminal de Jeddah hasta su hotel en La Meca.',
    terminalTab1: 'Terminal 1 (Nueva Terminal)',
    terminalTab1Subtitle: 'Saudia y principales aerolíneas internacionales regulares',
    terminalTab2: 'Terminal Norte (North Terminal)',
    terminalTab2Subtitle: 'Vuelos chárter y aerolíneas de bajo coste',
    terminal1Details: {
      gateTitle: 'Llegadas Internacionales',
      gateDesc: 'Al pasar aduana y recoger su equipaje, diríjase al vestíbulo público de llegadas.',
      meetingSpotTitle: 'Punto de Encuentro con Cartel',
      meetingSpotDesc: 'Su chófer le espera frente al gran acuario central con un cartel digital con su nombre.',
      walkingTime: '3 minutos a pie al estacionamiento VIP',
    },
    terminal2Details: {
      gateTitle: 'Salida Exterior Terminal Norte',
      gateDesc: 'Camine hacia la Puerta 4 designada para traslados privados.',
      meetingSpotTitle: 'Punto de Encuentro Oficial',
      meetingSpotDesc: 'Su chófer le espera junto a la salida con carro para equipaje.',
      walkingTime: '2 minutos al vehículo',
    },
    filterTitle: 'Vehículo Ideal según Familia y Equipaje',
    filterSubtitle: 'Seleccione el tamaño de su grupo para ver la opción óptima con tarifa fija garantizada:',
    filterAll: 'Todos los Vehículos',
    filterCouples: 'Individual y Parejas (1-3 Pax)',
    filterFamily: 'Familias (4-7 Pax)',
    filterExtended: 'Familias Grandes (8-10 Pax)',
    filterExecutive: 'Suite Presidencial VIP',
    paxLabel: 'Pasajeros',
    bagsLabel: 'Maletas Grandes',
    timelineTitle: 'Secuencia del Viaje: Del Vuelo al Hotel',
    timelineSubtitle: 'Logística impecable para iniciar su viaje con total tranquilidad:',
    steps: [
      {
        title: '1. Rastreo de Vuelo por Radar en Vivo',
        desc: 'Monitoreamos su aterrizaje. 90 minutos de espera gratuita incluidos para trámites de aduana.',
        highlight: '90 Min de Espera Gratuita',
      },
      {
        title: '2. Bienvenida Personalizada en Llegadas',
        desc: 'Su chófer uniformado le recibe con un cartel digital a su nombre al salir de la sala.',
        highlight: 'Bienvenida VIP Personalizada',
      },
      {
        title: '3. Asistencia con Equipaje y Confort Fresco',
        desc: 'El chófer guarda su equipaje. Disfrute de agua Zamzam fresca y cargadores de móvil a bordo.',
        highlight: 'Agua Zamzam Fresca',
      },
      {
        title: '4. Trayecto Directo por la Autovía 40',
        desc: '95 km de viaje directo y seguro sin paradas intermedias ni pasajeros compartidos.',
        highlight: 'Ruta Directa (~75 min)',
      },
      {
        title: '5. Llegada al Lobby de su Hotel en La Meca',
        desc: 'Descenso directo en la puerta de su hotel en Jabal Omar, Ajyad o la zona central.',
        highlight: 'Servicio Puerta a Puerta',
      },
      {
        title: '6. Pago en Efectivo a la Llegada — 0% Riesgo',
        desc: 'Pague la tarifa acordada al chófer al llegar a su hotel en SAR o USD. Sin adelantos ni tarjetas.',
        highlight: '100% Efectivo al Llegar',
      },
    ],
    guaranteeBadge: 'Garantía Duyuf Al Rahman VIP',
    guaranteeTitle: 'Transparencia Total de Precio',
    guaranteeDesc: 'Peajes, tarifas de aeropuerto, combustible e impuestos incluidos. Sin cargos ocultos.',
    bookNowButton: 'Reservar Este Trayecto Ahora',
    contactWhatsApp: 'Contactar por WhatsApp',
    sarLabel: 'SAR',
    fixedFareLabel: 'Tarifa Fija por Vehículo Completo',
    optimalChoiceBadge: 'Opción Recomendada',
  },
  hi: {
    badge: 'हवाई अड्डा वीआईपी सेवा',
    title: 'किंग अब्दुलअज़ीज़ अंतर्राष्ट्रीय हवाई अड्डे (KAIA) पर शाही स्वागत प्रोटोकॉल',
    subtitle: 'जेद्दा हवाई अड्डे से मक्का के होटल तक उमराह यात्रियों के लिए एक सुरक्षित, आरामदायक और सम्मानजनक वीआईपी यात्रा अनुभव।',
    terminalTab1: 'टर्मिनल 1 (नया मुख्य टर्मिनल)',
    terminalTab1Subtitle: 'सऊदिया और प्रमुख अंतरराष्ट्रीय एयरलाइंस',
    terminalTab2: 'उत्तरी टर्मिनल (North Terminal)',
    terminalTab2Subtitle: 'विभिन्न कम लागत वाली और मौसमी चार्टर उड़ानें',
    terminal1Details: {
      gateTitle: 'अंतर्राष्ट्रीय आगमन हॉल',
      gateDesc: 'इमिग्रेशन और सामान लेने के बाद मुख्य अराइवल हॉल की ओर बढ़ें।',
      meetingSpotTitle: 'नाम पट्टिका के साथ मिलने का स्थान',
      meetingSpotDesc: 'आपका वीआईपी ड्राइवर प्रसिद्ध एक्वेरियम के ठीक सामने आपके नाम के डिजिटल बोर्ड के साथ प्रतीक्षारत होगा।',
      walkingTime: 'वीआईपी पार्किंग तक 3 मिनट की पैदल दूरी',
    },
    terminal2Details: {
      gateTitle: 'उत्तरी टर्मिनल निकास द्वार',
      gateDesc: 'सामान लेने के बाद गेट नंबर 4 की ओर जाएं जो निजी परिवहन के लिए निर्धारित है।',
      meetingSpotTitle: 'आधिकारिक बैठक क्षेत्र',
      meetingSpotDesc: 'ड्राइवर ट्रॉली के साथ गेट के ठीक बाहर आपके सामान में मदद के लिए तैयार रहेगा।',
      walkingTime: 'कार तक 2 मिनट की दूरी',
    },
    filterTitle: 'परिवार और सामान के अनुसार उपयुक्त वाहन का चयन',
    filterSubtitle: 'अपनी पसंद और समूह के अनुसार सबसे आरामदायक वाहन और निश्चित मूल्य चुनें:',
    filterAll: 'सभी वाहन',
    filterCouples: 'व्यक्ति और दंपत्ति (1-3 यात्री)',
    filterFamily: 'परिवार (4-7 यात्री)',
    filterExtended: 'बड़ा परिवार (8-10 यात्री)',
    filterExecutive: 'प्रेसिडेंशियल वीआईपी सूट',
    paxLabel: 'यात्री',
    bagsLabel: 'बड़े सूटकेस',
    timelineTitle: 'हवाई अड्डे से होटल तक चरण-दर-चरण यात्रा',
    timelineSubtitle: 'पूरी तरह से व्यवस्थित प्रक्रिया ताकि आपकी आध्यात्मिक यात्रा बिना किसी परेशानी के शुरू हो सके:',
    steps: [
      {
        title: '1. लाइव रडार द्वारा उड़ान की निगरानी',
        desc: 'आपकी उड़ान पर लाइव नज़र रखी जाती है। लैंडिंग के बाद इमिग्रेशन के लिए 90 मिनट का निःशुल्क प्रतीक्षा समय शामिल है।',
        highlight: '90 मिनट निःशुल्क प्रतीक्षा',
      },
      {
        title: '2. अराइवल गेट पर व्यक्तिगत स्वागत',
        desc: 'हॉल से बाहर निकलते ही आपका ड्राइवर आपके नाम के डिजिटल बोर्ड के साथ आपका आदरपूर्वक स्वागत करेगा।',
        highlight: 'व्यक्तिगत वीआईपी स्वागत',
      },
      {
        title: '3. सामान उठाने की सुविधा और ठंडा केबिन',
        desc: 'ड्राइवर सारा सामान गाड़ी में लोड करेगा। वातानुकूलित कार में ठंडा ज़मज़म पानी और फोन चार्जर उपलब्ध हैं।',
        highlight: 'ठंडा ज़मज़म पानी उपलब्ध',
      },
      {
        title: '4. मक्का एक्सप्रेसवे (रूट 40) पर सीधी यात्रा',
        desc: 'जेद्दा से मक्का की 95 किमी की दूरी बिना किसी अनावश्यक ठहराव या अन्य यात्रियों के तय करें।',
        highlight: 'सीधा रास्ता (~75 मिनट)',
      },
      {
        title: '5. मक्का होटल लॉबी तक सीधी पहुंच',
        desc: 'हरम क्षेत्र, जबल उमर या अज़िज़िया में आपके होटल के द्वार तक सामान सहित पूरी सहायता।',
        highlight: 'द्वार से द्वार तक सेवा',
      },
      {
        title: '6. होटल पहुंचने पर नकद भुगतान — 0% जोखिम',
        desc: 'सुरक्षित पहुंचने के बाद ड्राइवर को रियाल या डॉलर में तय किराया नकद दें। कोई अग्रिम भुगतान नहीं।',
        highlight: '100% नकद भुगतान पहुंचने पर',
      },
    ],
    guaranteeBadge: 'दुयूफ़ अल-रहमान वीआईपी गारंटी',
    guaranteeTitle: 'पूरी पारदर्शिता और सुरक्षा',
    guaranteeDesc: 'टोल टैक्स, हवाई अड्डा पार्किंग और ईंधन शुल्क शामिल हैं। कोई छिपा हुआ शुल्क नहीं है।',
    bookNowButton: 'यह यात्रा अभी बुक करें',
    contactWhatsApp: 'व्हाट्सएप पर संपर्क करें',
    sarLabel: 'SAR',
    fixedFareLabel: 'वाहन का कुल निश्चित किराया',
    optimalChoiceBadge: 'सर्वोत्तम सिफारिश',
  },
};

export function AirportTransferExperience({
  locale,
  slug,
  minPriceSAR = 200,
  rates = {},
}: AirportTransferExperienceProps) {
  const [activeTerminal, setActiveTerminal] = useState<'t1' | 'north'>('t1');
  const [activeFilter, setActiveFilter] = useState<'all' | 'couples' | 'family' | 'extended' | 'executive'>('all');

  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;
  const isRtl = locale === 'ar' || locale === 'ur';

  // Real authoritative rates from database/constants
  const camryPrice = rates['camry'] || 200;
  const stariaPrice = rates['staria'] || 350;
  const yukonPrice = rates['yukon'] || 450;
  const hiacePrice = rates['hiace'] || 450;
  const maybachPrice = rates['maybach'] || 1200;

  const terminalInfo = activeTerminal === 't1' ? t.terminal1Details : t.terminal2Details;

  const fleetList = [
    {
      id: 'camry',
      name: locale === 'ar' ? 'تويوتا كامري هايبرد' : 'Toyota Camry Executive',
      category: locale === 'ar' ? 'سيدان فاخرة' : 'Executive Sedan',
      image: '/assets/images/studio-2k/toyota-camry-studio-2k.webp',
      filter: 'couples',
      pax: 3,
      bags: 2,
      price: camryPrice,
      isOptimal: activeFilter === 'couples',
    },
    {
      id: 'staria',
      name: locale === 'ar' ? 'هيونداي ستاريا VIP' : 'Hyundai Staria VIP',
      category: locale === 'ar' ? 'فان عائلي فاخر' : 'Luxury Family Van',
      image: '/assets/images/studio-2k/hyundai-staria-studio-2k.webp',
      filter: 'family',
      pax: 6,
      bags: 4,
      price: stariaPrice,
      isOptimal: activeFilter === 'family' || activeFilter === 'all',
    },
    {
      id: 'yukon',
      name: locale === 'ar' ? 'جي إم سي يوكن XL برستيج' : 'GMC Yukon XL Prestige',
      category: locale === 'ar' ? 'دفع رباعي رئاسي' : 'Presidential SUV',
      image: '/assets/images/studio-2k/gmc-yukon-studio-2k.webp',
      filter: 'family',
      pax: 6,
      bags: 6,
      price: yukonPrice,
      isOptimal: false,
    },
    {
      id: 'hiace',
      name: locale === 'ar' ? 'تويوتا هاي إيس VIP' : 'Toyota HiAce Family Van',
      category: locale === 'ar' ? 'فان عائلي كبير' : 'Executive Minibus',
      image: '/assets/images/studio-2k/toyota-hiace-studio-2k.webp',
      filter: 'extended',
      pax: 10,
      bags: 8,
      price: hiacePrice,
      isOptimal: activeFilter === 'extended',
    },
    {
      id: 'maybach',
      name: locale === 'ar' ? 'مرسيدس مايباخ S-Class' : 'Mercedes-Maybach S-Class',
      category: locale === 'ar' ? 'ملكي فئة أولى' : 'Royal First Class',
      image: '/assets/images/studio-2k/mercedes-s-class-studio-2k.webp',
      filter: 'executive',
      pax: 3,
      bags: 3,
      price: maybachPrice,
      isOptimal: activeFilter === 'executive',
    },
  ];

  const filteredVehicles = fleetList.filter((v) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'couples') return v.id === 'camry';
    if (activeFilter === 'family') return v.id === 'staria' || v.id === 'yukon';
    if (activeFilter === 'extended') return v.id === 'hiace';
    if (activeFilter === 'executive') return v.id === 'maybach' || v.id === 'yukon';
    return true;
  });

  return (
    <section className="mt-8 mb-16 relative" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3">
          <Plane className="w-3.5 h-3.5" />
          <span>{t.badge}</span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
          {t.subtitle}
        </p>
      </div>

      {/* 1. INTERACTIVE TERMINAL SELECTOR */}
      <div className="bg-[#101725] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-12">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-6 p-1.5 bg-[#0A0A0C] rounded-2xl border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTerminal('t1')}
            className={`flex-1 flex flex-col items-center justify-center py-3.5 px-4 rounded-xl text-center transition-all duration-300 cursor-pointer ${
              activeTerminal === 't1'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-[#0A0A0C] font-black shadow-lg shadow-[#D4AF37]/20 scale-101'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-sm font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {t.terminalTab1}
            </span>
            <span className="text-[11px] opacity-80 mt-0.5">{t.terminalTab1Subtitle}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTerminal('north')}
            className={`flex-1 flex flex-col items-center justify-center py-3.5 px-4 rounded-xl text-center transition-all duration-300 cursor-pointer ${
              activeTerminal === 'north'
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-[#0A0A0C] font-black shadow-lg shadow-[#D4AF37]/20 scale-101'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-sm font-bold flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              {t.terminalTab2}
            </span>
            <span className="text-[11px] opacity-80 mt-0.5">{t.terminalTab2Subtitle}</span>
          </button>
        </div>

        {/* TERMINAL DETAILS CARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-[#141D2C] border border-white/5 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-1.5">
                <Compass className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{terminalInfo.gateTitle}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {terminalInfo.gateDesc}
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 text-[11px] text-[#D4AF37] font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{terminalInfo.walkingTime}</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#141D2C] border border-white/5 md:col-span-2 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{terminalInfo.meetingSpotTitle}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {terminalInfo.meetingSpotDesc}
              </p>
            </div>
            <div className="pt-3 border-t border-white/5 text-[11px] text-emerald-400 flex items-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>GACA & Ministry of Hajj & Umrah Licensed Chauffeur Protocol</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FLEET MATCHING WITH REAL VEHICLE IMAGES */}
      <div className="bg-[#101725] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-12 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
              Smart Fleet Selection
            </span>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
              {t.filterTitle}
            </h3>
            <p className="text-xs text-slate-400 font-light mt-0.5">
              {t.filterSubtitle}
            </p>
          </div>

          {/* FILTER PILLS */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: t.filterAll },
              { id: 'couples', label: t.filterCouples },
              { id: 'family', label: t.filterFamily },
              { id: 'extended', label: t.filterExtended },
              { id: 'executive', label: t.filterExecutive },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveFilter(item.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeFilter === item.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-[#0A0A0C] shadow-md shadow-[#D4AF37]/20'
                    : 'bg-[#141D2C] text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* MATCHED VEHICLES GRID WITH REAL 2K IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredVehicles.map((veh) => (
            <div
              key={veh.id}
              className="bg-[#141D2C] rounded-2xl p-5 border border-white/10 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                    {veh.category}
                  </span>
                  {veh.isOptimal && (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] font-bold">
                      {t.optimalChoiceBadge}
                    </span>
                  )}
                </div>

                <h4 className="font-extrabold text-base text-white group-hover:text-[#D4AF37] transition-colors">
                  {veh.name}
                </h4>

                {/* REAL CAR IMAGE */}
                <div className="relative h-44 w-full my-3 flex items-center justify-center overflow-hidden">
                  <Image
                    src={veh.image}
                    alt={veh.name}
                    width={320}
                    height={180}
                    className="object-contain max-h-40 group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
                  />
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-300 py-2 border-y border-white/5">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Users className="w-4 h-4 text-[#D4AF37]" /> {veh.pax} {t.paxLabel}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Luggage className="w-4 h-4 text-[#D4AF37]" /> {veh.bags} {t.bagsLabel}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                    {t.fixedFareLabel}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#D4AF37]">
                      {veh.price}
                    </span>
                    <span className="text-xs font-bold text-white">{t.sarLabel}</span>
                  </div>
                </div>

                <Link
                  href={`/${locale}/booking?route=${slug}&vehicle=${veh.id}`}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] hover:from-[#E5C158] hover:to-[#C49E34] text-[#0A0A0C] text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-[#D4AF37]/20 flex items-center gap-1.5 active:scale-95"
                >
                  <span>{t.bookNowButton}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 6-STAGE FLIGHT ARRIVAL TIMELINE */}
      <div className="bg-[#101725] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-12 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block">
            Arrival Protocol
          </span>
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
            {t.timelineTitle}
          </h3>
          <p className="text-xs text-slate-400 font-light">
            {t.timelineSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {t.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#141D2C] border border-white/5 space-y-3 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] font-black text-xs flex items-center justify-center">
                  0{idx + 1}
                </span>
                <span className="text-[10px] font-bold text-[#D4AF37] px-2 py-0.5 rounded-full bg-[#D4AF37]/10">
                  {step.highlight}
                </span>
              </div>

              <h4 className="font-bold text-sm text-white group-hover:text-[#D4AF37] transition-colors">
                {step.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CASH ON ARRIVAL GUARANTEE SHIELD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#D4AF37]/15 via-[#D4AF37]/5 to-transparent border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0 shadow-lg">
          <Banknote className="w-7 h-7" />
        </div>

        <div className="space-y-1 flex-1 text-center sm:text-start">
          <span className="text-[11px] font-bold tracking-wider text-[#D4AF37] uppercase">
            {t.guaranteeBadge}
          </span>
          <h4 className="text-lg font-bold text-white">{t.guaranteeTitle}</h4>
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            {t.guaranteeDesc}
          </p>
        </div>

        <a
          href={`https://wa.me/966567588261?text=${encodeURIComponent(
            locale === 'ar'
              ? 'السلام عليكم، أود حجز سيارة خاصة لتوصيل المطار مع سائق VIP.'
              : 'Hello, I would like to book a private VIP airport transfer chauffeur.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shrink-0"
        >
          <Award className="w-4 h-4 text-[#D4AF37]" />
          <span>{t.contactWhatsApp}</span>
        </a>
      </div>
    </section>
  );
}
