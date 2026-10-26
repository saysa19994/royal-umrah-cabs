import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import {
  Users,
  Briefcase,
  Car,
  Snowflake,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { VehicleGallery, GalleryImage } from '@/components/fleet/VehicleGallery';

interface FleetDetailPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

interface VehicleDetails {
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  seats: number;
  bags: number;
  acType: string;
  acTypeAr: string;
  desc: string;
  descAr: string;
  features: string[];
  featuresAr: string[];
  gallery: GalleryImage[];
}

const VEHICLES_DATABASE: Record<string, VehicleDetails> = {
  'mercedes-maybach': {
    name: 'Mercedes-Maybach S-Class VIP',
    nameAr: 'مرسيدس مايباخ S-Class VIP',
    category: 'Ultra-Luxury First-Class Sedan',
    categoryAr: 'سيدان ملكي فائق الفخامة',
    seats: 3,
    bags: 3,
    acType: 'Quad-Zone Active Climate Control with Air Filtration',
    acTypeAr: 'تكييف هوائي ملكي رباعي المناطق مع فلترة وتنقية الهواء',
    desc: 'The Mercedes-Maybach S-Class is the ultimate expression of automotive elegance, discretion, and supreme road tranquility for distinguished Guests of Allah. Built for presidential comfort, it provides an exquisite first-class sanctuary during spiritual transfers between Jeddah, Makkah, and Madinah.',
    descAr: 'تجسد مرسيدس مايباخ S-Class قمة الفخامة والخصوصية والسكينة التامة لضيوف بيت الله الحرام. صُممت لتقديم تجربة سفر ملكية بمعايير الدرجة الأولى طوال رحلتكم بين مطار جدة ومكة المكرمة والمدينة المنورة.',
    features: [
      'Executive reclining rear lounge seats with calf rests and massage functionality',
      'Double-glazed acoustic laminated privacy glass for complete silence',
      'Chilled Zamzam water bottles served in luxury Maybach silver flutes',
      'Dual 11.6-inch OLED rear entertainment screens with wireless charging',
      'Senior executive chauffeur dressed in formal presidential attire',
    ],
    featuresAr: [
      'مقاعد خلفية من الدرجة الأولى قابلة للإمالة بالكامل مع خاصية التدليك ومساند الأقدام',
      'زجاج عازل للصوت والحرارة مع ستائر خصوصية كهربائية لراحة تامة',
      'ضيافة مياه زمزم مبردة ومشروبات منعشة تقدم في كؤوس فضية',
      'شاشات ترفيهية OLED مزدوجة للمقاعد الخلفية مع شواحن لاسلكية',
      'سائق VIP خاص بزي رسمي كامل وخبرة متميزة في مسارات الحرمين',
    ],
    gallery: [
      {
        src: '/assets/images/vehicles/mercedes-maybach/exterior_front.jpg',
        title: '2K Studio Iconic Front Grille & Stance',
        titleAr: 'واجهة استوديو 2K مع شبك مايباخ الأيقوني',
        tag: 'Exterior Front',
        tagAr: 'الواجهة الأمامية',
      },
      {
        src: '/assets/images/vehicles/mercedes-maybach/exterior_rear.jpg',
        title: 'Executive Rear Profile & 3D LED Taillights',
        titleAr: 'الواجهة الخلفية مع إضاءة LED ثلاثية الأبعاد',
        tag: 'Exterior Rear',
        tagAr: 'الواجهة الخلفية',
      },
      {
        src: '/assets/images/vehicles/mercedes-maybach/side_profile.jpg',
        title: 'Extended Wheelbase & Monoblock Wheels',
        titleAr: 'الجانب الكامل بقاعدة عجلات ممتدة وجنوط مايباخ',
        tag: 'Side Profile',
        tagAr: 'الجانب الكامل',
      },
      {
        src: '/assets/images/vehicles/mercedes-maybach/interior_seats.jpg',
        title: 'First-Class Executive Reclining Lounge Seats',
        titleAr: 'مقاعد الدرجة الأولى الملكية مع مساند الأقدام',
        tag: 'VIP Seats',
        tagAr: 'المقصورة والمقاعد',
      },
      {
        src: '/assets/images/vehicles/mercedes-maybach/interior_dashboard.jpg',
        title: 'Maybach Digital Cockpit & OLED Display',
        titleAr: 'مقصورة القيادة الفاخرة وشاشات OLED الذكية',
        tag: 'Dashboard',
        tagAr: 'لوحة القيادة',
      },
    ],
  },
  'gmc-yukon-xl': {
    name: 'GMC Yukon XL VIP',
    nameAr: 'جمس يوكون XL VIP الفاخر',
    category: 'Ultra-Luxury Full-Size VIP SUV',
    categoryAr: 'دفع رباعي VIP فائق الفخامة والرحابة',
    seats: 7,
    bags: 8,
    acType: 'Tri-Zone High-Performance Climate Control with Rear Vents',
    acTypeAr: 'تكييف مركزي متطور ثلاثي المناطق مع فتحات تبريد مخصصة لجميع المقاعد',
    desc: 'The GMC Yukon XL represents the absolute standard of prestige, roominess, and highway confidence across Saudi Arabia. Offering an extended wheelbase, generous leather seating, and massive luggage capacity, it delivers an effortless VIP journey for families travelling between Jeddah Airport and the Two Holy Mosques.',
    descAr: 'تعتبر جمس يوكون XL قمة الهيبة والرحابة والأمان على الطرق السريعة في المملكة العربية السعودية. بفضل قاعدة عجلاتها الممتدة ومقصورتها الجلدية الفارهة ومستودع الأمتعة الضخم، تمنح العائلات راحة مطلقة بين مطار جدة والحرمين الشريفين.',
    features: [
      'Extended wheelbase with exceptional third-row passenger legroom',
      'Acoustic soundproof glass creating a serene and restful atmosphere',
      'Tri-zone automatic digital climate control tailored for desert heat',
      'Cavernous cargo hold accommodating up to 8 large suitcases and Zamzam boxes',
      'Certified executive highway chauffeur with comprehensive hotel zone knowledge',
    ],
    featuresAr: [
      'قاعدة عجلات طويلة توفر مساحة رحبة جداً للأقدام لركاب الصف الثالث',
      'زجاج عازل للصوت يوفر أجواء هادئة للاسترخاء أثناء الرحلات الطويلة',
      'تكييف أوتوماتيكي ذكي مصمم خصيصاً لأجواء الصيف في المملكة',
      'صندوق أمتعة عملاق يتسع لـ 8 حقائب سفر كبيرة وعبوات مياه زمزم',
      'سائق محترف خبير بمسارات الفنادق والمطارات والحرمين الشريفين',
    ],
    gallery: [
      {
        src: '/assets/images/vehicles/gmc-yukon-xl/exterior_front.jpg',
        title: 'Commanding Denali Chrome Front Stance',
        titleAr: 'الهيبة الأمريكية بواجهة دينالي الكرومية الجريئة',
        tag: 'Exterior Front',
        tagAr: 'الواجهة الأمامية',
      },
      {
        src: '/assets/images/vehicles/gmc-yukon-xl/exterior_rear.jpg',
        title: 'Onyx Black Rear & Dual Exhaust Finishes',
        titleAr: 'الخلفية الملكية باللون الأسود الملكي والعوادم المزدوجة',
        tag: 'Exterior Rear',
        tagAr: 'الواجهة الخلفية',
      },
      {
        src: '/assets/images/vehicles/gmc-yukon-xl/side_profile.jpg',
        title: 'Extended Full-Size SUV Silhouette',
        titleAr: 'الجانب الكامل الممتد مع عجلات 22 بوصة فاخرة',
        tag: 'Side Profile',
        tagAr: 'الجانب الكامل',
      },
      {
        src: '/assets/images/vehicles/gmc-yukon-xl/interior_seats.jpg',
        title: 'VIP Leather Captain Seats & Cavernous Legroom',
        titleAr: 'مقاعد الكابتن الجلدية ومساحة رحبة جداً للأقدام',
        tag: 'VIP Seats',
        tagAr: 'المقصورة والمقاعد',
      },
      {
        src: '/assets/images/vehicles/gmc-yukon-xl/interior_dashboard.jpg',
        title: 'Digital Cockpit & Center Infotainment Hub',
        titleAr: 'لوحة القيادة الرقمية وشاشة الترفيه الذكية المركزية',
        tag: 'Dashboard',
        tagAr: 'لوحة القيادة',
      },
    ],
  },
  'hyundai-staria': {
    name: 'Hyundai Staria VIP',
    nameAr: 'هيونداي ستاريا VIP العائلية',
    category: 'Premium Futuristic Family Van',
    categoryAr: 'فان عائلي عصري فاخر',
    seats: 7,
    bags: 6,
    acType: 'Multi-Zone Climate Control with Overhead Ceiling Louvers',
    acTypeAr: 'تكييف مركزي متطور مع فتحات سقفية مخصصة لكل راكب',
    desc: 'The Hyundai Staria VIP combines a futuristic aerodynamic aesthetic with an ultra-spacious, lounge-like passenger cabin for Umrah pilgrims. Featuring individual reclining captain chairs and wide panoramic windows, it ensures your family arrives refreshed and revitalized at your hotel.',
    descAr: 'تجمع هيونداي ستاريا VIP بين التصميم العصري الجريء والمقصورة الرحبة التي تشبه صالات رجال الأعمال. بمقاعد الكابتن المنفصلة والنوافذ البانورامية الكبيرة، تضمن لعائلتك الوصول بكل نشاط وراحة إلى فندقكم.',
    features: [
      'Individual reclining executive captain chairs with dedicated armrests',
      'Expansive panoramic view windows offering scenic spiritual vistas',
      'Multi-vent ceiling air conditioning with independent passenger controls',
      'Deep luggage cargo area accommodating 6 large bags with ease',
      'Smooth whisper-quiet highway cruise for restful travel',
    ],
    featuresAr: [
      'مقاعد كابتن مستقلة قابلة للإمالة مع مساند للأذرع لراحة تامة',
      'نوافذ بانورامية واسعة للاستمتاع بالمناظر المحيطة خلال الطريق',
      'تكييف سقفي متعدد الفتحات مع تحكم مستقل للركاب في الخلف',
      'مستودع أمتعة عميق يتسع لـ 6 حقائب سفر كبيرة براحة تامة',
      'نظام تعليق ناعم وعزل ممتاز لضمان نوم هادئ للأطفال والعائلة',
    ],
    gallery: [
      {
        src: '/assets/images/vehicles/hyundai-staria/exterior_front.jpg',
        title: 'Futuristic Horizon LED Lightbar Front',
        titleAr: 'واجهة مستقبلية بشريط إضاءة LED أفقية وشبك برونزي',
        tag: 'Exterior Front',
        tagAr: 'الواجهة الأمامية',
      },
      {
        src: '/assets/images/vehicles/hyundai-staria/exterior_rear.jpg',
        title: 'Parametric Pixel LED Vertical Taillights',
        titleAr: 'الخلفية العصرية بمصابيح بكسل عمودية مميزة',
        tag: 'Exterior Rear',
        tagAr: 'الواجهة الخلفية',
      },
      {
        src: '/assets/images/vehicles/hyundai-staria/side_profile.jpg',
        title: 'Spaceship Aerodynamic Streamline Profile',
        titleAr: 'الانسيابية الفضائية ونوافذ بانورامية ممتدة',
        tag: 'Side Profile',
        tagAr: 'الجانب الكامل',
      },
      {
        src: '/assets/images/vehicles/hyundai-staria/interior_seats.jpg',
        title: 'Premium Relaxation Captain Chair Lounge',
        titleAr: 'مقاعد الاسترخاء الفاخرة للركاب بنمط صالات الـ VIP',
        tag: 'VIP Seats',
        tagAr: 'المقصورة والمقاعد',
      },
      {
        src: '/assets/images/vehicles/hyundai-staria/interior_dashboard.jpg',
        title: 'Floating Digital Cluster & Minimalist Cockpit',
        titleAr: 'لوحة قيادة رقمية طافية مع أزرار نقل حركة ذكية',
        tag: 'Dashboard',
        tagAr: 'لوحة القيادة',
      },
    ],
  },
  'hyundai-h1': {
    name: 'Hyundai H1 Starex VIP',
    nameAr: 'هيونداي H1 ستاريكس VIP',
    category: 'Practical High-Capacity Family Minivan',
    categoryAr: 'فان عائلي عملي واسع',
    seats: 8,
    bags: 7,
    acType: 'Dual High-Output Air Conditioning with Roof Ducts',
    acTypeAr: 'تكييف هوائي مزدوج فائق التبريد مع قنوات توزيع سقفية',
    desc: 'The Hyundai H1 Starex is Saudi Arabia’s most trusted and practical choice for medium to large pilgrim families. With flexible 8-passenger seating, dual sliding side doors, and ample room for bags and Zamzam water, it guarantees dependable family comfort on every route.',
    descAr: 'تعتبر هيونداي H1 الخيار العملي المفضل للأسر المتوسطة والكبيرة خلال رحلات العمرة والزيارة في السعودية. بفضل سعتها لـ 8 ركاب والأبواب الجانبية السحابية والمساحة المخصصة للحقائب ومياه زمزم، توفر راحة عائلية موثوقة.',
    features: [
      'Spacious 8-passenger seating configuration with generous headroom',
      'Dual sliding passenger doors facilitating quick and easy curbside boarding',
      'High-output dual AC system designed for sustained highway cooling',
      'Deep cargo trunk fitting 7 suitcases and standard Zamzam containers',
      'Proven endurance and reliability on intercity pilgrimage highways',
    ],
    featuresAr: [
      'مساحة جلوس رحبة تتسع لـ 8 ركاب مع ارتفاع سقف ممتاز',
      'أبواب جانبية منزلقة على الجهتين لسهولة ركوب ونزول العائلة',
      'تكييف قوي مزدوج يضمن وصول الهواء البارد لكافة الصفوف',
      'صندوق خلفي واسع يتسع لـ 7 حقائب وعبوات مياه زمزم',
      'اعتمادية عالية مثبتة على مسارات السفر الطويلة بين المدن',
    ],
    gallery: [
      {
        src: '/assets/images/vehicles/hyundai-h1/exterior_front.jpg',
        title: '2K Studio Classic Minivan Front Presence',
        titleAr: 'واجهة استوديو 2K لفان العائلة الموثوق',
        tag: 'Exterior Front',
        tagAr: 'الواجهة الأمامية',
      },
      {
        src: '/assets/images/vehicles/hyundai-h1/exterior_rear.jpg',
        title: 'Spacious Liftgate & Vertical Tailgate Lamps',
        titleAr: 'الواجهة الخلفية مع باب شنطة واسع وسهل التحميل',
        tag: 'Exterior Rear',
        tagAr: 'الواجهة الخلفية',
      },
      {
        src: '/assets/images/vehicles/hyundai-h1/side_profile.jpg',
        title: 'Dual Sliding Curbside Doors Profile',
        titleAr: 'الجانب الكامل مع أبواب منزلقة مزدوجة لسهولة الركوب',
        tag: 'Side Profile',
        tagAr: 'الجانب الكامل',
      },
      {
        src: '/assets/images/vehicles/hyundai-h1/interior_seats.jpg',
        title: 'Multi-Row Sanitized Passenger Family Cabin',
        titleAr: 'المقصورة العائلية النظيفة بصفوف مقاعد مريحة',
        tag: 'VIP Seats',
        tagAr: 'المقصورة والمقاعد',
      },
      {
        src: '/assets/images/vehicles/hyundai-h1/interior_dashboard.jpg',
        title: 'Clean Functional Driver Dashboard & AC Hub',
        titleAr: 'لوحة القيادة والتحكم بأنظمة التكييف المزدوج',
        tag: 'Dashboard',
        tagAr: 'لوحة القيادة',
      },
    ],
  },
  'toyota-camry': {
    name: 'Toyota Camry Executive',
    nameAr: 'تويوتا كامري التنفيذية',
    category: 'Executive Business Sedan',
    categoryAr: 'سيدان تنفيذي فاخر وعملي',
    seats: 4,
    bags: 3,
    acType: 'Dual-Zone Digital Automatic Climate Control',
    acTypeAr: 'تكييف أوتوماتيكي رقمي مزدوج عالي الكفاءة',
    desc: 'The Toyota Camry Executive delivers a whisper-quiet, dependable, and remarkably smooth ride for solo pilgrims, couples, and small families. Combining renowned engineering reliability with premium cabin serenity, it offers the swiftest transfer from Jeddah Airport to your Makkah hotel.',
    descAr: 'تمنح تويوتا كامري التنفيذية تجربة تنقل تتسم بالهدوء التام والسرعة والاعتمادية للأفراد والأزواج والعائلات الصغيرة. تجمع بين الهندسة العريقة والراحة الفائقة لتأمين وصول سريع ومريح من مطار جدة إلى فندقكم.',
    features: [
      'Whisper-quiet acoustic insulation absorbing road vibrations',
      'Cold rapid-cooling automatic climate control system',
      'Generous trunk space accommodating 3 large suitcases plus hand baggage',
      'Ergonomic contour seats providing exceptional lumbar comfort',
      'Swift, agile handling optimized for efficient airport transfers',
    ],
    featuresAr: [
      'عزل صوتي متقن يخفف ضجيج الطريق ويوفر رحلة هادئة',
      'تكييف أوتوماتيكي بارد وسريع التبريد يلائم الأجواء الحارة',
      'صندوق خلفي رحب يتسع لـ 3 حقائب كبيرة بالإضافة للحقائب اليدوية',
      'مقاعد مريحة مصممة بعناية لدعم الظهر والفقرات أثناء السفر',
      'حجم مثالي وسرعة انتقال تضمن التوصيل المباشر بدون أي تأخير',
    ],
    gallery: [
      {
        src: '/assets/images/vehicles/toyota-camry/exterior_front.jpg',
        title: 'Sleek Aerodynamic Executive Sedan Front',
        titleAr: 'واجهة انسيابية حديثة لسيدان الأعمال الأنيق',
        tag: 'Exterior Front',
        tagAr: 'الواجهة الأمامية',
      },
      {
        src: '/assets/images/vehicles/toyota-camry/exterior_rear.jpg',
        title: 'Sculpted C-Shaped LED Rear Tailgate',
        titleAr: 'الواجهة الخلفية بمصابيح LED على شكل حرف C',
        tag: 'Exterior Rear',
        tagAr: 'الواجهة الخلفية',
      },
      {
        src: '/assets/images/vehicles/toyota-camry/side_profile.jpg',
        title: 'Pearl White Coupe-Like Side Elevation',
        titleAr: 'الجانب الكامل الأنيق باللون الأبيض اللؤلؤي',
        tag: 'Side Profile',
        tagAr: 'الجانب الكامل',
      },
      {
        src: '/assets/images/vehicles/toyota-camry/interior_seats.jpg',
        title: 'Ergonomic Passenger Seating & Lumbar Support',
        titleAr: 'مقاعد الركاب المريحة مع دعم متكامل للظهر',
        tag: 'VIP Seats',
        tagAr: 'المقصورة والمقاعد',
      },
      {
        src: '/assets/images/vehicles/toyota-camry/interior_dashboard.jpg',
        title: 'Executive Driver Cockpit & Touchscreen Hub',
        titleAr: 'مقصورة السائق وشاشة المعلومات الرقمية واللمسية',
        tag: 'Dashboard',
        tagAr: 'لوحة القيادة',
      },
    ],
  },
  'toyota-hiace': {
    name: 'Toyota HiAce VIP',
    nameAr: 'تويوتا هايس VIP للمجموعات',
    category: 'High-Roof Executive Minibus',
    categoryAr: 'ميني باص بسقف عالٍ للمجموعات الكبيرة',
    seats: 10,
    bags: 10,
    acType: 'High-Roof Dual Multi-Louver Climate Control',
    acTypeAr: 'تكييف هوائي مزدوج عالي القدرة مع فتحات تهوية مستقلة لكل مقعد',
    desc: 'The Toyota HiAce VIP is specifically engineered for large pilgrim families and group delegations travelling together. With its high-roof walk-through ceiling, 10 comfortable executive seats, and massive cargo area, extended families stay united in air-conditioned luxury.',
    descAr: 'صُممت تويوتا هايس VIP خصيصاً للمجموعات والأسر الكبيرة التي ترغب في السفر معاً في سيارة واحدة. بفضل سقفها المرتفع ومقاعدها العشرة المريحة وسعتها الكبيرة للأمتعة، توفر للعائلات تجربة سفر ممتعة ومريحة.',
    features: [
      'High-roof ceiling allowing upright walk-through entry and exit',
      'Individual reclining seats arranged with wide central aisle access',
      'Dedicated high-capacity rear blower with separate ceiling louvers',
      'Heavy-duty luggage capacity accommodating 10 large suitcases and Zamzam',
      'Experienced group chauffeur with specialized hotel zone access',
    ],
    featuresAr: [
      'سقف مرتفع يتيح سهولة الوقوف والتحرك داخل الباص براحة تامة',
      'مقاعد مستقلة قابلة للإمالة مع ممر وسطي واسع يسهل الوصول',
      'تكييف خلفي قوي مع فتحات مخصصة لكل صف لضمان التبريد المتكافئ',
      'مستودع أمتعة يتسع لـ 10 حقائب سفر كبيرة مع عبوات مياه زمزم',
      'سائق متمرس في خدمة المجموعات والأفواج ولديه تصاريح الوصول للفنادق',
    ],
    gallery: [
      {
        src: '/assets/images/vehicles/toyota-hiace/exterior_front.jpg',
        title: 'High-Roof Commercial VIP Commuter Front',
        titleAr: 'الواجهة الأمامية لميني باص السقف العالي الفاخر',
        tag: 'Exterior Front',
        tagAr: 'الواجهة الأمامية',
      },
      {
        src: '/assets/images/vehicles/toyota-hiace/exterior_rear.jpg',
        title: 'Full Height Rear Tailgate & Vertical Taillights',
        titleAr: 'الواجهة الخلفية الكاملة مع إضاءة عمودية وباب مرتفع',
        tag: 'Exterior Rear',
        tagAr: 'الواجهة الخلفية',
      },
      {
        src: '/assets/images/vehicles/toyota-hiace/side_profile.jpg',
        title: 'Extended High-Roof Group Silhouette',
        titleAr: 'الجانب الكامل للمركبة بسقف مرتفع وممر وسطي مريح',
        tag: 'Side Profile',
        tagAr: 'الجانب الكامل',
      },
      {
        src: '/assets/images/vehicles/toyota-hiace/interior_seats.jpg',
        title: '10-Passenger Reclining Executive Seating Rows',
        titleAr: 'صفوف المقاعد المستقلة القابلة للإمالة لـ 10 ركاب',
        tag: 'VIP Seats',
        tagAr: 'المقصورة والمقاعد',
      },
      {
        src: '/assets/images/vehicles/toyota-hiace/interior_dashboard.jpg',
        title: 'Modern Ergonomic Driver Station & Cockpit',
        titleAr: 'مقصورة السائق المتطورة مع أدوات تحكم وتكييف مركزي',
        tag: 'Dashboard',
        tagAr: 'لوحة القيادة',
      },
    ],
  },
  'toyota-coaster': {
    name: 'Toyota Coaster VIP Coach',
    nameAr: 'تويوتا كوستر VIP للأفواج',
    category: 'VIP Executive Group Coach',
    categoryAr: 'حافلة فاخرة للوفود والأفواج',
    seats: 21,
    bags: 20,
    acType: 'Commercial Aircraft-Style High-Output Central Climate System',
    acTypeAr: 'تكييف مركزي متطور بنمط الطائرات مع فتحات تبريد وإضاءة لكل راكب',
    desc: 'The Toyota Coaster VIP Coach represents executive group travel at its finest across the Holy Land. Designed for extended pilgrim delegations and large family groups, it features whisper-quiet cabin acoustics, aircraft-style overhead air conditioning, and a massive luggage hold.',
    descAr: 'تعتبر تويوتا كوستر VIP النموذج المثالي لنقل الوفود والأفواج الكبيرة بين المدن والمشاعر المقدسة. تتميز بهدوء مقصورتها وتكييفها المركزي فائق التبريد ومستودع الحقائب العملاق لخدمة الوفود دون الحاجة لتوزيعهم على سيارات متعددة.',
    features: [
      'Aircraft-style overhead air conditioning louvers and reading lights for each passenger',
      'Ergonomic reclining seats upholstered in luxury leather with armrests',
      'Spacious central walk-through aisle facilitating effortless boarding',
      'Massive rear cargo compartment accommodating 20 large suitcases and Zamzam containers',
      'Senior highway captain specialized in VIP group transfers between Jeddah, Makkah, and Madinah',
    ],
    featuresAr: [
      'فتحات تكييف وإضاءة قراءة سقفية بنمط مقصورة الطائرات لكل راكب',
      'مقاعد جلدية مريحة قابلة للإمالة مع مساند جانبية للأذرع',
      'ممر وسطي واسع يتيح سهولة وسرعة الركوب والنزول للمجموعات',
      'مستودع حقائب خلفي عملاق يتسع لـ 20 حقيبة كبيرة وعبوات زمزم',
      'كابتن طريق معتمد متخصص في رحلات الوفود والمجموعات بين المدن',
    ],
    gallery: [
      {
        src: '/assets/images/vehicles/toyota-coaster/exterior_front.jpg',
        title: '2K Studio Executive Coach Front Presence',
        titleAr: 'واجهة استوديو 2K لحافلة الأفواج والوفود الملكية',
        tag: 'Exterior Front',
        tagAr: 'الواجهة الأمامية',
      },
      {
        src: '/assets/images/vehicles/toyota-coaster/exterior_rear.jpg',
        title: 'VIP Hotel Drop-off Rear Coach Profile',
        titleAr: 'الواجهة الخلفية للحافلة عند بوابات الفنادق الفاخرة',
        tag: 'Exterior Rear',
        tagAr: 'الواجهة الخلفية',
      },
      {
        src: '/assets/images/vehicles/toyota-coaster/side_profile.jpg',
        title: 'Full Coach Side Elevation & Panoramic Glass',
        titleAr: 'الجانب الكامل للحافلة ونوافذ الركاب البانورامية المظللة',
        tag: 'Side Profile',
        tagAr: 'الجانب الكامل',
      },
      {
        src: '/assets/images/vehicles/toyota-coaster/interior_seats.jpg',
        title: 'Diamond-Quilted Cognac Leather Aisle Seating',
        titleAr: 'مقاعد جلدية مريحة بتطريز فاخر ومكيفات علوية للطائرات',
        tag: 'VIP Seats',
        tagAr: 'المقصورة والمقاعد',
      },
      {
        src: '/assets/images/vehicles/toyota-coaster/interior_dashboard.jpg',
        title: 'Highway Captain Station & PA System Controls',
        titleAr: 'منصة كابتن الحافلة مع نظام التوجيه والإذاعة الداخلية',
        tag: 'Dashboard',
        tagAr: 'لوحة القيادة',
      },
    ],
  },
};

// ALIAS MAPPING: Supports both short ('camry', 'yukon') and long ('toyota-camry', 'gmc-yukon-xl') slugs!
const SLUG_ALIASES: Record<string, string> = {
  'camry': 'toyota-camry',
  'toyota-camry': 'toyota-camry',
  'yukon': 'gmc-yukon-xl',
  'gmc-yukon-xl': 'gmc-yukon-xl',
  'staria': 'hyundai-staria',
  'hyundai-staria': 'hyundai-staria',
  'h1': 'hyundai-h1',
  'hyundai-h1': 'hyundai-h1',
  'hiace': 'toyota-hiace',
  'toyota-hiace': 'toyota-hiace',
  'coaster': 'toyota-coaster',
  'toyota-coaster': 'toyota-coaster',
  'maybach': 'mercedes-maybach',
  'mercedes-maybach': 'mercedes-maybach',
};

export function generateStaticParams() {
  const allSlugs = Object.keys(SLUG_ALIASES);
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: FleetDetailPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;

  const resolvedKey = SLUG_ALIASES[slug] || 'hyundai-staria';
  const v = VEHICLES_DATABASE[resolvedKey] || VEHICLES_DATABASE['hyundai-staria'];
  const title = locale === 'ar' ? v.nameAr : v.name;
  const description = locale === 'ar' ? v.descAr.slice(0, 160) : v.desc.slice(0, 160);

  return {
    title: `${title} | Duyuf Alrahman VIP`,
    description,
    alternates: getLocalizedAlternates(locale, `/fleet/${slug}`),
  };
}

export default async function FleetDetailPage(props: FleetDetailPageProps) {
  const params = await props.params;
  const { locale, slug } = params;
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';

  const resolvedKey = SLUG_ALIASES[slug];
  const v = resolvedKey ? VEHICLES_DATABASE[resolvedKey] : null;

  if (!v) {
    notFound();
  }

  const name = isAr ? v.nameAr : v.name;
  const category = isAr ? v.categoryAr : v.category;
  const desc = isAr ? v.descAr : v.desc;
  const acType = isAr ? v.acTypeAr : v.acType;
  const features = isAr ? v.featuresAr : v.features;

  const whatsappMessage = encodeURIComponent(
    isAr
      ? `السلام عليكم، أود الاستفسار وحجز سيارة (${name}) لرحلة العمرة.`
      : `Hello, I would like to inquire about booking the (${name}) for our Umrah transfer.`
  );
  const whatsappUrl = `https://wa.me/966567554988?text=${whatsappMessage}`;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const pageUrl = `${baseUrl}/${locale}/fleet/${slug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : 'Home',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isAr ? 'أسطولنا' : 'Fleet',
        item: `${baseUrl}/${locale}/fleet`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name,
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="py-12 sm:py-16 md:py-20 bg-slate-50/70 min-h-screen text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <div className="container mx-auto px-4 max-w-5xl">
        {/* 1. HERO SECTION: BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-6 sm:mb-8">
          <Link href={`/${locale}`} className="hover:text-amber-600 transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
          <Link href={`/${locale}/fleet`} className="hover:text-amber-600 transition-colors">
            {isAr ? 'أسطولنا' : 'Our Fleet'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
          <span className="text-slate-900 font-bold truncate">{name}</span>
        </nav>

        {/* HERO TITLE & SUBTITLE */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-500/15 border border-amber-500/30 text-amber-700 mb-2">
            {category}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight mb-3">
            {name}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl font-normal">
            {desc}
          </p>

          {/* ACTION BUTTONS (SOLID GOLD + OUTLINED WHATSAPP) */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-6 sm:mt-7">
            <Link
              href={`/${locale}/booking?vehicle=${resolvedKey}`}
              className="h-12 px-7 rounded-xl bg-[#D4A017] hover:bg-[#b88910] text-slate-950 font-extrabold text-sm uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
            >
              <span>{isAr ? 'احجز الآن' : 'Book Now'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-6 rounded-xl border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-500 hover:text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 group-hover:text-white fill-emerald-600/20" />
              <span>{isAr ? 'حجز عبر واتساب' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* 2. SPECIFICATIONS GRID (4-ITEM MOBILE-FRIENDLY SPEC CARDS) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {/* Item 1: Seats */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {isAr ? 'عدد المقاعد' : 'Seats'}
              </span>
              <p className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {isAr ? `${v.seats} مقاعد VIP` : `${v.seats} Seats`}
              </p>
            </div>
          </div>

          {/* Item 2: Luggage */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center mb-3">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {isAr ? 'سعة الحقائب' : 'Luggage'}
              </span>
              <p className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {isAr ? `${v.bags} حقائب كبيرة` : `${v.bags} Large Bags`}
              </p>
            </div>
          </div>

          {/* Item 3: Class */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center mb-3">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {isAr ? 'فئة المركبة' : 'Class'}
              </span>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight truncate">
                {category}
              </p>
            </div>
          </div>

          {/* Item 4: Air Conditioning */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center mb-3">
              <Snowflake className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                {isAr ? 'نظام التكييف' : 'Air Conditioning'}
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                {acType}
              </p>
            </div>
          </div>
        </div>

        {/* 3. PHOTO GALLERY (5-IMAGE LUXURY GALLERY WITH 1/5 COUNTER) */}
        <VehicleGallery
          images={v.gallery}
          vehicleName={name}
          locale={locale}
        />

        {/* FEATURES & DETAILS CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-xs mb-10">
          <h2 className="font-display font-extrabold text-2xl text-slate-900 mb-4 tracking-tight">
            {isAr ? 'المواصفات والتجهيزات التنفيذية' : 'Executive Features & Amenities'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-8">
            {features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="font-bold text-slate-900 block mb-0.5">
                {isAr ? 'ضمان ضيوف الرحمن VIP' : 'Duyuf Alrahman VIP Assurance'}
              </strong>
              {isAr
                ? 'مركبات حديثة 2024-2025 معقمة يومياً، وسائقون محترفون ملمون بمسارات الحرمين والفنادق، وأسعار معلنة وثابتة بالريال السعودي والدفع عند الوصول.'
                : 'Immaculately maintained 2024-2025 fleet, certified professional chauffeurs, guaranteed fixed SAR fares, and 100% pay on arrival peace of mind.'}
            </div>
          </div>
        </div>

        {/* BOTTOM FINAL BOOKING CALLOUT */}
        <div className="text-center pt-2 pb-6">
          <Link
            href={`/${locale}/booking?vehicle=${resolvedKey}`}
            className="inline-flex items-center gap-2 h-13 px-8 rounded-xl bg-[#D4A017] hover:bg-[#b88910] text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            <span>{isAr ? `احجز ${name} لرحلتك القادمة` : `Book ${name} For Your Trip`}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
