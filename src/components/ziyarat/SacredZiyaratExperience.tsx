'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import {
  MapPin,
  Compass,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Car,
  Users,
  Sparkles,
  Banknote,
  HeartHandshake,
  Footprints,
  Accessibility,
  Info,
  CalendarCheck,
  ArrowRight,
  Luggage,
} from 'lucide-react';
import { BorderBeam } from '@/components/ui/luxury/BorderBeam';
import { Meteors } from '@/components/ui/luxury/Meteors';

export interface SacredZiyaratExperienceProps {
  locale: Locale;
  initialCity?: 'makkah' | 'madinah';
}

interface SiteItem {
  id: string;
  name: string;
  arabicName: string;
  city: 'makkah' | 'madinah';
  significance: string;
  effort: 'minimal' | 'moderate' | 'strenuous';
  effortLabel: string;
  accessibility: string;
  bestTime: string;
  duration: string;
}

interface TourPackage {
  id: string;
  city: 'makkah' | 'madinah';
  title: string;
  subtitle: string;
  duration: string;
  itinerary: string[];
  pricing: {
    camry: number;
    staria: number;
    yukon: number;
    hiace: number;
  };
}

interface TranslationData {
  badge: string;
  title: string;
  subtitle: string;
  tabMakkah: string;
  tabMadinah: string;
  sitesHeading: string;
  sitesSubheading: string;
  effortMinimal: string;
  effortModerate: string;
  effortStrenuous: string;
  bestTimeLabel: string;
  durationLabel: string;
  standbyNote: string;
  packagesHeading: string;
  packagesSubheading: string;
  tourDurationLabel: string;
  includedStopsLabel: string;
  selectVehicle: string;
  paxLabel: string;
  bagsLabel: string;
  sarLabel: string;
  fixedFareLabel: string;
  bookTourBtn: string;
  whatsappBtn: string;
  etiquetteHeading: string;
  etiquetteSubheading: string;
  pillars: {
    title: string;
    desc: string;
  }[];
  guaranteeBadge: string;
  guaranteeTitle: string;
  guaranteeDesc: string;
  sites: Record<string, SiteItem>;
  tours: Record<string, TourPackage>;
}

const TRANSLATIONS: Record<Locale, TranslationData> = {
  ar: {
    badge: 'جولات المعالم والآثار النبوية الشريفة',
    title: 'مزارات مكة المكرمة والمدينة المنورة بسيارة خاصة وسائق',
    subtitle: 'زيارة مريحة ومهيبة لأطهر بقاع الأرض برفقة سائق خاص ينتظركم في كل معلم، مع خصوصية تامة للعائلة ودفع 100% نقداً عند العودة للفندق.',
    tabMakkah: 'مزارات مكة المكرمة',
    tabMadinah: 'مزارات المدينة المنورة',
    sitesHeading: 'المعالم والآثار الإسلامية المعتمدة',
    sitesSubheading: 'دليل ميداني يوضح طبيعة الزيارة ومستوى الجهد البدني وتوافر مسارات الكراسي المتحركة',
    effortMinimal: 'يسير جداً (نزول عند الباب)',
    effortModerate: 'متوسط (مشى منبسط ومريح)',
    effortStrenuous: 'يتطلب جهداً (صعود جبلي مدرج)',
    bestTimeLabel: 'أفضل أوقات الزيارة:',
    durationLabel: 'مدة التوقف المقترحة:',
    standbyNote: 'السائق ينتظركم بمركبة مكيفة ومياه باردة طوال فترة الزيارة دون استعجال',
    packagesHeading: 'باقات الجولات الشاملة والأسعار الثابتة',
    packagesSubheading: 'جولة نصف يوم تشمل الذهاب والانتظار والعودة لباب الفندق دون أي رسوم مخفية',
    tourDurationLabel: 'مدة الجولة الإجمالية:',
    includedStopsLabel: 'المحطات المشمولة في الجولة:',
    selectVehicle: 'اختر المركبة المناسبة لعدد أفراد عائلتك:',
    paxLabel: 'ركاب',
    bagsLabel: 'حقائب',
    sarLabel: 'ريال',
    fixedFareLabel: 'سعر شامل للمركبة والسائق والانتظار',
    bookTourBtn: 'احجز جولة المزارات الآن',
    whatsappBtn: 'تواصل عبر واتساب للتنسيق',
    etiquetteHeading: 'ميثاق شرف ضيوف الرحمن لخدمة المزارات',
    etiquetteSubheading: 'معايير سلوكية صارمة تضمن السكينة والوقار التام خلال زيارتكم للمواقع المقدسة',
    pillars: [
      {
        title: 'الوقار والسكينة النبوية',
        desc: 'يلتزم سائقونا بالهدوء التام والتعامل الراقي الذي يليق بقدسية الأماكن وحرمة الزائرين.',
      },
      {
        title: 'تكييف مستمر واستعداد دائم',
        desc: 'تبقى المركبة مبردة مسبقاً وتنتظركم عند نقطة النزول دون إيقاف التكييف في الأجواء الحارة.',
      },
      {
        title: 'رعاية كبار السن وذوي الإعاقة',
        desc: 'مساعدة خاصة في وضع الكراسي المتحركة بصندوق الأمتعة واختيار أقرب نقطة وقوف ممكنة للمشاة.',
      },
      {
        title: 'مرونة تامة وتوقيت غير مقيد',
        desc: 'وقتكم في الصلاة والدعاء ملك لكم؛ لا نفرض استعجالاً في أي محطة ضمن النطاق الزمني للجولة.',
      },
    ],
    guaranteeBadge: 'ضمان الدفع عند العودة 100%',
    guaranteeTitle: 'لا نطلب أي دفعة مقدمة ولا بطاقات ائتمانية',
    guaranteeDesc: 'احجز جولتك بضمان كامل وسدد قيمة الرحلة نقداً أو بالتحويل الفوري للسائق بعد اكتمال الجولة وسلامة عودتكم لفندقكم.',
    sites: {
      'cave-hira': {
        id: 'cave-hira',
        name: 'جبل النور وحي حراء الثقافي',
        arabicName: 'جبل النور - غار حراء',
        city: 'makkah',
        significance: 'مهبط الوحي الأول حيث نزل الروح الأمين جبريل عليه السلام بسورة العلق على رسول الله ﷺ.',
        effort: 'moderate',
        effortLabel: 'معتدل للساحة الثقافية / شاق لصعود الغار',
        accessibility: 'حي حراء الثقافي بالأسفل ممهد بالكامل للكراسي المتحركة، بينما صعود الغار غير مناسب لكبار السن.',
        bestTime: 'بعد صلاة الفجر مباشرة (06:00 - 08:30) أو قبل الغروب لتجنب أشعة الشمس المباشرة.',
        duration: '45 دقيقة للحي الثقافي والساحة / 3 ساعات للراغبين في صعود القمة.',
      },
      'cave-thawr': {
        id: 'cave-thawr',
        name: 'جبل ثور وموقع الغار المبارك',
        arabicName: 'جبل ثور - غار الهجرة',
        city: 'makkah',
        significance: 'الغار الذي آوى النبي ﷺ وصاحبه الصديق أبا بكر رضي الله عنه أثناء الهجرة النبوية الشريفة.',
        effort: 'minimal',
        effortLabel: 'يسير (وقوف وإطلالة مريحة بالمركبة)',
        accessibility: 'الوصول مريح بالسيارة حتى الساحة السفلية المطلة على الجبل مع إمكانية الرؤية والتصوير من المركبة.',
        bestTime: 'الصباح الباكر أو بعد صلاة العصر في أجواء معتدلة.',
        duration: '30 - 45 دقيقة للتأمل واستعراض أحداث الهجرة النبوية.',
      },
      'mina-mashair': {
        id: 'mina-mashair',
        name: 'مشعر منى ومسجد الخيف والجمرات',
        arabicName: 'مشعر منى المبارك',
        city: 'makkah',
        significance: 'مدينة الخيام البيضاء ومقر منسك رمي الجمرات ومسجد الخيف الذي صلى فيه سبعون نبياً.',
        effort: 'minimal',
        effortLabel: 'يسير جداً (جولة قيادة ونزول قصير)',
        accessibility: 'طرق ممهدة ومجهزة بالكامل، مناسبة لجميع الأعمار والكراسي المتحركة خارج موسم الحج.',
        bestTime: 'خلال ساعات النهار المعتدلة للتعرف على المشاعر المقدسة بتفاصيلها.',
        duration: '30 دقيقة للمرور بجسر الجمرات ومسجد الخيف ومخيمات منى.',
      },
      'arafat-muzdalifah': {
        id: 'arafat-muzdalifah',
        name: 'جبل الرحمة بصعيد عرفات ومزدلفة',
        arabicName: 'صعيد عرفات ومزدلفة',
        city: 'makkah',
        significance: 'الركن الأعظم للحج حيث خطب النبي ﷺ خطبة الوداع، وصعيد مزدلفة للمبيت وجمع الحصى.',
        effort: 'minimal',
        effortLabel: 'يسير بالساحة / معتدل لصعود درجات الصخرة',
        accessibility: 'ساحة جبل الرحمة السفلية مبلطة ومجهزة بالكامل ويسهل تحرك الكراسي المتحركة بها.',
        bestTime: 'ساعات الصباح أو قبيل المغرب في أجواء روحانية خاشعة.',
        duration: '45 دقيقة للصعود الخفيف أو الدعاء عند أقدام الجبل المبارك.',
      },
      'masjid-quba': {
        id: 'masjid-quba',
        name: 'مسجد قباء الشريف',
        arabicName: 'مسجد قباء',
        city: 'madinah',
        significance: 'أول مسجد أسس على التقوى في الإسلام، وصلاة ركعتين فيه تعدل ثواب عمرة تامة بإذن الله.',
        effort: 'minimal',
        effortLabel: 'يسير جداً (نزول أمام الساحات المظللة)',
        accessibility: 'مجهز بالكامل بالمنحدرات والمصاعد الكهربائية ومظلات الساحات وكراسي كبار السن.',
        bestTime: 'ضحى السبت اقتداءً بالسنة النبوية، أو صباحاً بعد شروق الشمس يومياً.',
        duration: '45 - 60 دقيقة لأداء ركعتي السنة والدعاء والتجول بالساحات.',
      },
      'mount-uhud': {
        id: 'mount-uhud',
        name: 'جبل أحد ومقبرة شهداء أحد وجبل الرماة',
        arabicName: 'جبل أحد - مقبرة الشهداء',
        city: 'madinah',
        significance: 'جبل يحبنا ونحبه، وشهد أعظم معارك الإسلام، وتضم مقبرته سيد الشهداء حمزة بن عبد المطلب رضي الله عنه.',
        effort: 'minimal',
        effortLabel: 'يسير بالساحات / صعود يسير لجبل الرماة',
        accessibility: 'الساحة المطلة على قبور الشهداء منبسطة وممهدة، وجبل الرماة يتطلب صعود درجات منخفضة سهلة.',
        bestTime: 'الصباح الباكر أو بعد العصر للاستماع إلى نسيم أحد العليل.',
        duration: '45 دقيقة للسلام على الشهداء وصعود جبل الرماة واستعراض موقع المعركة.',
      },
      'masjid-qiblatayn': {
        id: 'masjid-qiblatayn',
        name: 'مسجد القبلتين',
        arabicName: 'مسجد القبلتين',
        city: 'madinah',
        significance: 'المكان الشريف الذي نزل فيه الأمر الإلهي بتحويل اتجاه القبلة من بيت المقدس إلى الكعبة المشرفة.',
        effort: 'minimal',
        effortLabel: 'يسير جداً (مصاعد وسلالم كهربائية حديثة)',
        accessibility: 'مبنى حديث مجهز بالكامل للمصلين من ذوي الهمم وكبار السن.',
        bestTime: 'بين الصلوات أو مع أي فرض في الصباح والمساء.',
        duration: '30 - 45 دقيقة لصلاة تحية المسجد واستحضار معجزة تحويل القبلة.',
      },
      'seven-mosques': {
        id: 'seven-mosques',
        name: 'موقع معركة الخندق والمساجد السبعة',
        arabicName: 'المساجد السبعة - الخندق',
        city: 'madinah',
        significance: 'موقع غزوة الأحزاب (الخندق) التاريخي الذي تجلت فيه حكمة النبي ﷺ ومسجد الفتح التاريخي.',
        effort: 'minimal',
        effortLabel: 'يسير (ساحة مشاة واسعة وحدائق)',
        accessibility: 'ممشى حديث ومنطقة حدائق مفتوحة مناسبة تماماً للكراسي المتحركة والأطفال.',
        bestTime: 'فترة ما بعد العصر حتى غروب الشمس لجمال الإطلالة والهدوء.',
        duration: '30 - 40 دقيقة للاطلاع على موقع الخندق وزيارة جامع الفتح الكبير.',
      },
      'salman-garden': {
        id: 'salman-garden',
        name: 'بستان الصحابي سلمان الفارسي وبئر عذق',
        arabicName: 'بستان سلمان الفارسي',
        city: 'madinah',
        significance: 'البستان المبارك الذي غرس فيه النبي ﷺ ثلاثمائة نخلة بيده الشريفة لعتق الصحابي الجليل سلمان الفارسي.',
        effort: 'minimal',
        effortLabel: 'يسير (ممرات مظللة بين النخيل)',
        accessibility: 'ممرات أرضية مرصوفة ومسطحات خضراء مناسبة للعائلات وكبار السن.',
        bestTime: 'الصباح الباكر للاستمتاع بظلال النخيل وشراء تمور عجوة المدينة الطازجة.',
        duration: '30 - 45 دقيقة للجولة التراثية والاستراحة.',
      },
    },
    tours: {
      'makkah-tour': {
        id: 'makkah-tour',
        city: 'makkah',
        title: 'جولة مزارات مكة المكرمة الكبرى',
        subtitle: 'تغطية شاملة لأهم معالم السيرة المكية والمشاعر المقدسة بسيارة خاصة وسائق أمين',
        duration: '3.5 - 4 ساعات',
        itinerary: [
          'الانطلاق من بهو فندقكم بمكة المكرمة بسيارة مبردة',
          'زيارة ساحة جبل النور وحي حراء الثقافي',
          'إطلالة جبل ثور واستعراض قصة الهجرة النبوية',
          'جولة مشعر منى ومسجد الخيف وجسر الجمرات',
          'الوقوف عند جبل الرحمة بصعيد عرفات ومزدلفة',
          'العودة الكريمة لباب فندقكم دون أي استعجال',
        ],
        pricing: {
          camry: 200,
          staria: 250,
          yukon: 350,
          hiace: 300,
        },
      },
      'madinah-tour': {
        id: 'madinah-tour',
        city: 'madinah',
        title: 'جولة معالم وآثار المدينة المنورة النبوية',
        subtitle: 'زيارة مريحة ومباركة لأول مسجد أسس على التقوى وجبل أحد وموقع غزوة الخندق',
        duration: '3.5 - 4 ساعات',
        itinerary: [
          'الاستقبال من فندقكم بالمنطقة المركزية بالمدينة المنورة',
          'أداء ركعتين في مسجد قباء الشريف (ثواب عمرة تامة)',
          'زيارة جبل أحد ومقبرة سيد الشهداء حمزة وجبل الرماة',
          'زيارة مسجد القبلتين واستحضار حدث تحويل القبلة',
          'جولة المساجد السبعة وموقع معركة الخندق التاريخية',
          'زيارة بستان سلمان الفارسي ومزارع التمور التراثية',
          'العودة السالمة لفندقكم مع التمنيات بالقبول',
        ],
        pricing: {
          camry: 200,
          staria: 250,
          yukon: 350,
          hiace: 300,
        },
      },
    },
  },
  en: {
    badge: 'Prophetic Heritage & Sacred Sanctuaries',
    title: 'Private Chauffeur Ziyarat Tours in Makkah & Madinah',
    subtitle: 'A serene, dignified pilgrimage to Islam’s holiest milestones with an air-conditioned private vehicle and dedicated chauffeur. Complete family privacy and 100% Cash-on-Arrival payment.',
    tabMakkah: 'Makkah Sacred Sanctuaries',
    tabMadinah: 'Madinah Prophetic Heritage',
    sitesHeading: 'Verified Historical & Prophetic Landmarks',
    sitesSubheading: 'Field-verified pilgrim guide detailing physical effort, visiting windows, and wheelchair readiness',
    effortMinimal: 'Very Minimal (Curbside drop-off)',
    effortModerate: 'Moderate (Flat, shaded promenade walk)',
    effortStrenuous: 'Strenuous (Stone mountain staircase climb)',
    bestTimeLabel: 'Optimal Visiting Hours:',
    durationLabel: 'Recommended Time at Site:',
    standbyNote: 'Your chauffeur remains on dedicated standby with continuous AC and chilled water throughout your visit',
    packagesHeading: 'Curated Tour Itineraries & Transparent Fares',
    packagesSubheading: 'Comprehensive half-day private chauffeur tours including hotel pickup, site waiting, and return drop-off',
    tourDurationLabel: 'Total Tour Duration:',
    includedStopsLabel: 'Curated Itinerary Stops:',
    selectVehicle: 'Select the optimal vehicle for your family size:',
    paxLabel: 'Guests',
    bagsLabel: 'Luggage',
    sarLabel: 'SAR',
    fixedFareLabel: 'Fixed fare per vehicle, driver & waiting time',
    bookTourBtn: 'Book Private Ziyarat Tour',
    whatsappBtn: 'Coordinate via WhatsApp',
    etiquetteHeading: 'Duyuf Al Rahman Chauffeur Reverence Code',
    etiquetteSubheading: 'Rigorous hospitality protocols upholding silence, comfort, and reverence at sacred destinations',
    pillars: [
      {
        title: 'Reverence & Prophetic Decorum',
        desc: 'Our chauffeurs observe dignified Islamic etiquette and serene conduct befitting the sanctified locations.',
      },
      {
        title: 'Continuous Air-Conditioning Standby',
        desc: 'The executive vehicle remains pre-cooled with continuous air-conditioning while waiting at every landmark.',
      },
      {
        title: 'Elderly & Wheelchair Care',
        desc: 'Dedicated assistance for mobility aids and strollers, selecting the nearest accessible curb drop-off.',
      },
      {
        title: 'Unhurried Prayer & Contemplation',
        desc: 'Your prayer time is sacred. We never rush your voluntary prayers, supplications, or contemplative moments.',
      },
    ],
    guaranteeBadge: '100% Cash-on-Arrival Guarantee',
    guaranteeTitle: 'Zero Prepayment & Zero Credit Card Required',
    guaranteeDesc: 'Book with complete peace of mind. Settle the fixed fare in cash or instantaneous local transfer directly with your chauffeur upon safe return to your hotel.',
    sites: {
      'cave-hira': {
        id: 'cave-hira',
        name: 'Jabal Al-Noor & Cave Hira Cultural Foot',
        arabicName: 'Jabal al-Noor - Cave Hira',
        city: 'makkah',
        significance: 'The sanctuary of first divine revelation where Archangel Jibril (AS) descended with Surah Al-Alaq upon Prophet Muhammad (PBUH).',
        effort: 'moderate',
        effortLabel: 'Moderate at Cultural Base / Strenuous Cave Ascent',
        accessibility: 'Hira Cultural District base plaza is 100% paved and wheelchair-friendly; mountain ascent to the cave is not suitable for elderly pilgrims.',
        bestTime: 'Post-Fajr dawn (06:00 - 08:30) or late afternoon cooling hours to avoid direct desert heat.',
        duration: '45 mins for base galleries & plaza / 3 hours for summit climbers.',
      },
      'cave-thawr': {
        id: 'cave-thawr',
        name: 'Jabal Thawr & Sanctuary of the Hijrah',
        arabicName: 'Jabal Thawr',
        city: 'makkah',
        significance: 'The sacred mountain cave that shielded Prophet Muhammad (PBUH) and Abu Bakr Al-Siddiq (RA) during the blessed migration to Madinah.',
        effort: 'minimal',
        effortLabel: 'Minimal (Comfortable vehicular viewing plaza)',
        accessibility: 'Direct vehicle access to the base viewing plaza with clear visibility of the rugged peak.',
        bestTime: 'Early morning or late afternoon with moderate temperature.',
        duration: '30 - 45 mins for reflection and historical orientation.',
      },
      'mina-mashair': {
        id: 'mina-mashair',
        name: 'Mina Valley, Jamarat & Masjid Al-Khaif',
        arabicName: 'Mina Mashair',
        city: 'makkah',
        significance: 'The white tent city of Hajj, the Jamarat stoning site, and historic Masjid Al-Khaif where seventy prophets of Allah prayed.',
        effort: 'minimal',
        effortLabel: 'Very Minimal (Drive-through & curbside stops)',
        accessibility: 'Fully paved wide boulevards, completely suitable for all age groups and wheelchairs outside Hajj season.',
        bestTime: 'Daytime hours with gentle daylight for photographing landmarks.',
        duration: '30 mins leisurely panoramic drive across the sacred valley.',
      },
      'arafat-muzdalifah': {
        id: 'arafat-muzdalifah',
        name: 'Jabal Al-Rahmah (Mount Arafat) & Muzdalifah',
        arabicName: 'Arafat & Muzdalifah',
        city: 'makkah',
        significance: 'The supreme pillar of Hajj where the Prophet (PBUH) delivered the Farewell Sermon, and the historic plain of Muzdalifah.',
        effort: 'minimal',
        effortLabel: 'Minimal at base plaza / Moderate for hill stone stairs',
        accessibility: 'Paved lower plaza is 100% accessible with smooth wheelchair ramps up to the monument base.',
        bestTime: 'Early morning or pre-sunset for serene spiritual reflection.',
        duration: '45 mins for prayers, supplication, and base exploration.',
      },
      'masjid-quba': {
        id: 'masjid-quba',
        name: 'Masjid Quba (The First Mosque of Islam)',
        arabicName: 'Masjid Quba',
        city: 'madinah',
        significance: 'The first mosque established in Islam. Performing two rak’ats of prayer here yields the reward of a complete Umrah pilgrimage (Sahih Hadith).',
        effort: 'minimal',
        effortLabel: 'Very Minimal (Curbside drop-off at shaded courtyards)',
        accessibility: 'Fully equipped with accessible ramps, electric elevators, shaded plazas, and courtesy wheelchairs.',
        bestTime: 'Saturday mid-morning following the Prophet’s Sunnah, or any morning post-sunrise.',
        duration: '45 - 60 mins for voluntary Tahiyyat al-Masjid prayer and dua.',
      },
      'mount-uhud': {
        id: 'mount-uhud',
        name: 'Mount Uhud, Archers’ Hill & Martyrs’ Cemetery',
        arabicName: 'Mount Uhud & Shuhada',
        city: 'madinah',
        significance: '“Uhud is a mountain that loves us and we love it.” Resting place of the Master of Martyrs Hamza ibn Abd al-Muttalib (RA) and seventy Sahabah.',
        effort: 'minimal',
        effortLabel: 'Minimal at cemetery / Gentle steps to Archers’ Hill',
        accessibility: 'Flat stone promenade overlooking the martyrs’ cemetery is fully wheelchair accessible.',
        bestTime: 'Early morning or late afternoon for cool breeze from Mount Uhud.',
        duration: '45 mins to convey greetings of peace to the martyrs and climb Archers’ Hill.',
      },
      'masjid-qiblatayn': {
        id: 'masjid-qiblatayn',
        name: 'Masjid Al-Qiblatayn (The Two Qiblas)',
        arabicName: 'Masjid al-Qiblatayn',
        city: 'madinah',
        significance: 'The sacred mosque where divine revelation descended commanding the prayer orientation change from Jerusalem to the Holy Kaaba.',
        effort: 'minimal',
        effortLabel: 'Very Minimal (Modern escalators and elevators)',
        accessibility: 'Modern architectural facility with full mobility and elevator infrastructure.',
        bestTime: 'Between obligatory prayers or during serene morning hours.',
        duration: '30 - 45 mins for voluntary prayer and historical reflection.',
      },
      'seven-mosques': {
        id: 'seven-mosques',
        name: 'The Seven Mosques & Battle of the Trench (Al-Khandaq)',
        arabicName: 'Al-Khandaq - Seven Mosques',
        city: 'madinah',
        significance: 'The fortified defensive line of the Battle of the Trench (Ghazwat al-Ahzab) anchored by the historic victory mosque (Masjid Al-Fath).',
        effort: 'minimal',
        effortLabel: 'Minimal (Landscaped walking park and plazas)',
        accessibility: 'Expansive modern pedestrian park completely suitable for elderly and strollers.',
        bestTime: 'Late afternoon towards sunset for magnificent lighting and tranquility.',
        duration: '30 - 40 mins to inspect the trench battleground terrain.',
      },
      'salman-garden': {
        id: 'salman-garden',
        name: 'Garden of Salman Al-Farsi (RA) & Well of Edhq',
        arabicName: 'Bustan Salman al-Farsi',
        city: 'madinah',
        significance: 'The blessed palm oasis where Prophet Muhammad (PBUH) planted 300 date palms with his own noble hands to secure the freedom of Salman Al-Farsi (RA).',
        effort: 'minimal',
        effortLabel: 'Minimal (Shaded garden paths amongst palms)',
        accessibility: 'Paved walkways through date gardens suitable for families and senior pilgrims.',
        bestTime: 'Morning hours to experience farm heritage and sample authentic Madinah Ajwa dates.',
        duration: '30 - 45 mins for heritage relaxation and refreshments.',
      },
    },
    tours: {
      'makkah-tour': {
        id: 'makkah-tour',
        city: 'makkah',
        title: 'Grand Makkah Holy Sanctuaries Tour',
        subtitle: 'Comprehensive half-day private chauffeur tour covering foundational Quranic milestones and Hajj grounds',
        duration: '3.5 - 4 Hours',
        itinerary: [
          'Chauffeur pickup at your Makkah hotel lobby in pre-cooled executive car',
          'Jabal Al-Noor base viewing and Hira Cultural District exploration',
          'Jabal Thawr viewpoint and reflection on the Prophet’s Hijrah migration',
          'Panoramic tour of Mina valley, Jamarat complex, and historic Masjid Al-Khaif',
          'Dedicated prayer stop at the foot of Jabal Al-Rahmah in Mount Arafat',
          'Serene return drop-off directly to your hotel portico without rush',
        ],
        pricing: {
          camry: 200,
          staria: 250,
          yukon: 350,
          hiace: 300,
        },
      },
      'madinah-tour': {
        id: 'madinah-tour',
        city: 'madinah',
        title: 'Prophetic Heritage & Sanctuaries of Madinah',
        subtitle: 'Sacred journey through the early days of Islam: Masjid Quba, Mount Uhud, and the historic Trench battleground',
        duration: '3.5 - 4 Hours',
        itinerary: [
          'Executive chauffeur pickup at your Madinah Central Area hotel portico',
          'Perform two rak’ats at Masjid Quba (carrying the reward of full Umrah)',
          'Visit Mount Uhud, Martyrs’ Cemetery of Hamza (RA), and Archers’ Hill',
          'Masjid Al-Qiblatayn visit to commemorate the turning towards the Kaaba',
          'Explore the Battle of the Trench site (Seven Mosques and Masjid Al-Fath)',
          'Visit Salman Al-Farsi date palm oasis and heritage water wells',
          'Safe return to your hotel lobby with heartfelt prayers for accepted visits',
        ],
        pricing: {
          camry: 200,
          staria: 250,
          yukon: 350,
          hiace: 300,
        },
      },
    },
  },
  ms: {
    badge: 'Warisan Kenabian & Ziarah Suci',
    title: 'Pakej Ziarah Makkah & Madinah dengan Pemandu Peribadi VIP',
    subtitle: 'Lawatan ziarah penuh ketenangan ke tapak-tapak bersejarah Islam dengan kenderaan berhawa dingin dan pemandu peribadi. Privasi penuh keluarga dan bayaran 100% Tunai Semasa Tiba.',
    tabMakkah: 'Ziarah Makkah Al-Mukarramah',
    tabMadinah: 'Ziarah Madinah Al-Munawwarah',
    sitesHeading: 'Mercu Tanda Sejarah Islam yang Sah',
    sitesSubheading: 'Panduan lapangan ziarah merangkumi tahap usaha fizikal, waktu terbaik, dan laluan kerusi roda',
    effortMinimal: 'Sangat Mudah (Turun terus di hadapan pintu)',
    effortModerate: 'Sederhana (Jalan kaki rata di dataran)',
    effortStrenuous: 'Memerlukan Tenaga (Mendaki tangga batu gunung)',
    bestTimeLabel: 'Waktu Lawatan Terbaik:',
    durationLabel: 'Cadangan Tempoh Berada di Lokasi:',
    standbyNote: 'Pemandu anda setia menunggu dengan pendingin hawa dan air mineral sejuk sepanjang ziarah anda',
    packagesHeading: 'Pakej Pilihan Ziarah & Kadar Harga Telus',
    packagesSubheading: 'Lawatan separuh hari merangkumi jemputan hotel, menunggu di lokasi, dan penghantaran pulang ke hotel',
    tourDurationLabel: 'Jumlah Tempoh Lawatan:',
    includedStopsLabel: 'Hentian Termasuk dalam Pakej:',
    selectVehicle: 'Pilih kenderaan yang sesuai mengikut bilangan ahli keluarga anda:',
    paxLabel: 'Penumpang',
    bagsLabel: 'Bagasi',
    sarLabel: 'SAR',
    fixedFareLabel: 'Harga tetap untuk kenderaan, pemandu & masa menunggu',
    bookTourBtn: 'Tempah Kereta Ziarah Sekarang',
    whatsappBtn: 'Hubungi Melalui WhatsApp',
    etiquetteHeading: 'Kod Penghormatan Ziarah Duyuf Al Rahman',
    etiquetteSubheading: 'Protokol kesantunan tinggi bagi memastikan ketenangan dan adab terpelihara di bumi suci',
    pillars: [
      {
        title: 'Adab dan Ketenangan Nabawi',
        desc: 'Pemandu kami memelihara kesopanan dan adab Islam yang mulia sesuai dengan kemuliaan bumi haram.',
      },
      {
        title: 'Hawa Dingin Berterusan Tanpa Henti',
        desc: 'Kenderaan sentiasa disejukkan terlebih dahulu semasa menunggu di setiap mercu tanda bersejarah.',
      },
      {
        title: 'Penjagaan Warga Emas & Kerusi Roda',
        desc: 'Bantuan mesra mengangkat kerusi roda dan stroller ke bonet serta memilih titik berhenti terdekat.',
      },
      {
        title: 'Masa Solat Sunat & Doa Tanpa Tergesa',
        desc: 'Masa ibadah anda dihormati sepenuhnya; kami tidak pernah mendesak jemaah agar bergegas keluar.',
      },
    ],
    guaranteeBadge: 'Jaminan Bayar Semasa Tiba 100%',
    guaranteeTitle: 'Tanpa Bayaran Pendahuluan & Tanpa Kad Kredit',
    guaranteeDesc: 'Tempah dengan keyakinan penuh. Bayar terus kepada pemandu secara tunai atau pindahan semasa tiba di hotel anda.',
    sites: {} as any,
    tours: {} as any,
  },
  id: {
    badge: 'Napak Tilas Kenabian & Ziarah Suci',
    title: 'Paket Ziarah Makkah & Madinah dengan Sopir Pribadi VIP',
    subtitle: 'Kunjungan ziarah penuh ketenangan ke situs-situs bersejarah Islam dengan mobil ber-AC dan sopir pribadi. Privasi keluarga terjaga dan pembayaran 100% Tunai Saat Tiba di Hotel.',
    tabMakkah: 'Ziarah Makkah Al-Mukarramah',
    tabMadinah: 'Ziarah Madinah Al-Munawwarah',
    sitesHeading: 'Situs Bersejarah Islam Terverifikasi',
    sitesSubheading: 'Panduan lapangan ziarah mencakup tingkat upaya fisik, waktu kunjungan terbaik, dan akses kursi roda',
    effortMinimal: 'Sangat Mudah (Turun tepat di depan pintu)',
    effortModerate: 'Sedang (Jalan santai di pelataran beraspal)',
    effortStrenuous: 'Butuh Tenaga (Mendaki anak tangga batu gunung)',
    bestTimeLabel: 'Waktu Kunjungan Terbaik:',
    durationLabel: 'Durasi Singgah yang Disarankan:',
    standbyNote: 'Sopir Anda siap menunggu dengan AC menyala dan air mineral dingin selama Anda berziarah tanpa terburu-buru',
    packagesHeading: 'Paket Ziarah Pilihan & Tarif Transparan',
    packagesSubheading: 'Tur setengah hari privat mencakup penjemputan hotel, tunggu di lokasi, dan antar kembali ke hotel',
    tourDurationLabel: 'Total Durasi Tur:',
    includedStopsLabel: 'Titik Kunjungan yang Termasuk:',
    selectVehicle: 'Pilih jenis armada sesuai jumlah rombongan keluarga:',
    paxLabel: 'Penumpang',
    bagsLabel: 'Koper',
    sarLabel: 'SAR',
    fixedFareLabel: 'Tarif pasti per armada, sopir & waktu tunggu',
    bookTourBtn: 'Pesan Mobil Ziarah Sekarang',
    whatsappBtn: 'Konsultasi via WhatsApp',
    etiquetteHeading: 'Kode Kehormatan Layanan Ziarah Duyuf Al Rahman',
    etiquetteSubheading: 'Standar etika ketat untuk menjaga kekhusyukan dan kenyamanan jemaah di tanah suci',
    pillars: [
      {
        title: 'Kekhusyukan & Adab Mulia',
        desc: 'Sopir kami menjaga etika santun dan tenang sesuai dengan kehormatan tanah suci dan para jemaah.',
      },
      {
        title: 'AC Tetap Menyala Saat Menunggu',
        desc: 'Mobil selalu dalam keadaan sejuk dan siap berangkat kembali tanpa menunggu suhu kabin turun.',
      },
      {
        title: 'Perhatian untuk Lansia & Kursi Roda',
        desc: 'Bantuan sigap untuk memuat kursi roda ke bagasi dan memilih titik turun sedekat mungkin ke pintu masuk.',
      },
      {
        title: 'Waktu Ibadah & Doa Tanpa Terburu-Buru',
        desc: 'Waktu salat sunah dan munajat Anda dihormati; tidak ada desakan waktu selama dalam durasi paket.',
      },
    ],
    guaranteeBadge: 'Garansi Bayar Saat Tiba 100%',
    guaranteeTitle: 'Tanpa DP & Tanpa Kartu Kredit',
    guaranteeDesc: 'Pesan tanpa rasa was-was. Bayar ongkos perjalanan secara tunai langsung ke sopir setelah selamat sampai kembali di hotel.',
    sites: {} as any,
    tours: {} as any,
  },
  ur: {
    badge: 'مقامات مقدسہ اور نبوی آثار کی باوقار زیارات',
    title: 'مکہ مکرمہ اور مدینہ منورہ کی پرائیویٹ زیارات مع ڈرائیور',
    subtitle: 'مکمل فیملی پرائیویسی اور ٹھنڈی آرام دہ گاڑی کے ساتھ اسلام کے مقدس ترین مقامات کی زیارت۔ سو فیصد کیش آن ارائیول ادائیگی بغیر کسی ایڈوانس کے۔',
    tabMakkah: 'زیارات مکہ مکرمہ',
    tabMadinah: 'زیارات مدینہ منورہ',
    sitesHeading: 'مستند تاریخی و نبوی مقامات',
    sitesSubheading: 'جسمانی مشقت، بہترین اوقات زیارت اور وہیل چیئر کی سہولیات کی جامع فیلڈ گائیڈ',
    effortMinimal: 'نہایت آسان (گاڑی سے بالکل دروازے پر اترنا)',
    effortModerate: 'درمیانہ (ہموار فرش پر تھوڑی چہل قدمی)',
    effortStrenuous: 'محنت طلب (پہاڑی سیڑھیاں چڑھنا)',
    bestTimeLabel: 'زیارت کا بہترین وقت:',
    durationLabel: 'مقام پر قیام کا مناسب دورانیہ:',
    standbyNote: 'ڈرائیور پوری زیارت کے دوران گاڑی کا اے سی آن رکھ کر ٹھنڈے پانی سمیت آپ کا احترام سے انتظار کرتا ہے',
    packagesHeading: 'مکمل ٹور پیکجز اور شفاف ریٹس',
    packagesSubheading: 'ہوٹل سے روانگی، تمام مقامات پر انتظار اور واپسی پر مشتمل پرائیویٹ ہاف ڈے زیارت ٹور',
    tourDurationLabel: 'ٹور کا کل دورانیہ:',
    includedStopsLabel: 'پیکج میں شامل مبارک مقامات:',
    selectVehicle: 'اپنی فیملی کے افراد کے مطابق بہترین گاڑی منتخب کریں:',
    paxLabel: 'مسافر',
    bagsLabel: 'بیگز',
    sarLabel: 'ریال',
    fixedFareLabel: 'گاڑی، ڈرائیور اور انتظار کا حتمی طے شدہ کرایہ',
    bookTourBtn: 'پرائیویٹ زیارت کار ابھی بک کریں',
    whatsappBtn: 'واٹس ایپ پر معلومات لیں',
    etiquetteHeading: 'ضیوف الرحمن ڈرائیورز کا ضابطہ اخلاق',
    etiquetteSubheading: 'مقدس مقامات پر حجاج و زائرین کے وقار اور سکون کی حفاظت کا پختہ عزم',
    pillars: [
      {
        title: 'وقار اور اسلامی آداب کی پاسداری',
        desc: 'ہمارے ڈرائیورز پاک مقامات کے تقدس اور زائرین کے احترام کے مطابق انتہائی شائستگی سے پیش آتے ہیں۔',
      },
      {
        title: 'ہر جگہ ٹھنڈا اے سی مسلسل آن',
        desc: 'گاڑی کو گرمی سے بچانے کے لیے انتظار کے دوران بھی ایئر کنڈیشنر مستقل آن رکھا جاتا ہے۔',
      },
      {
        title: 'بزرگوں اور وہیل چیئرز کا خاص خیال',
        desc: 'وہیل چیئر کو ڈگی میں رکھنے اور قریبی ترین گیٹ پر گاڑی روکنے میں خصوصی مدد فراہم کی جاتی ہے۔',
      },
      {
        title: 'نماز و دعا میں جلدی نہیں',
        desc: 'مسجد قباء میں نفل اور دعاؤں کے لیے آپ کا وقت محفوظ ہے، ہم کبھی زائرین کو عجلت پر مجبور نہیں کرتے۔',
      },
    ],
    guaranteeBadge: 'ہوٹل واپسی پر 100 فیصد ادائیگی کی ضمانت',
    guaranteeTitle: 'کوئی پیشگی رقم اور کوئی کریڈٹ کارڈ درکار نہیں',
    guaranteeDesc: 'بے فکر ہو کر زیارت بک کروائیں۔ سفر مکمل ہونے اور ہوٹل بخیریت پہنچنے پر طے شدہ کرایہ ڈرائیور کو کیش ادا کریں۔',
    sites: {} as any,
    tours: {} as any,
  },
  fr: {
    badge: 'Sanctuaires Sacrés & Héritage Prophétique',
    title: 'Visites Privées de Ziyarat à La Mecque et Médine avec Chauffeur',
    subtitle: 'Découvrez les hauts lieux de l’Islam dans un véhicule climatisé avec chauffeur dévoué. Intimité familiale préservée et paiement 100% en espèces à l’arrivée.',
    tabMakkah: 'Ziyarat de La Mecque',
    tabMadinah: 'Ziyarat de Médine',
    sitesHeading: 'Sites et Sanctuaires Islamiques Historiques',
    sitesSubheading: 'Guide de terrain détaillant l’effort physique requis, les heures optimales et l’accessibilité en fauteuil roulant',
    effortMinimal: 'Très Facile (Dépose devant l’entrée)',
    effortModerate: 'Modéré (Marche sur esplanade plane)',
    effortStrenuous: 'Exigeant (Ascension d’escaliers rocheux)',
    bestTimeLabel: 'Meilleur Créneau de Visite :',
    durationLabel: 'Temps Recommandé sur Place :',
    standbyNote: 'Votre chauffeur reste en attente avec climatisation continue et bouteilles d’eau fraîches sans vous presser',
    packagesHeading: 'Circuits Guidés Complets & Tarifs Transparents',
    packagesSubheading: 'Excursions privées d’une demi-journée incluant prise en charge à l’hôtel, attente sur site et retour',
    tourDurationLabel: 'Durée Totale du Circuit :',
    includedStopsLabel: 'Étapes Incluses dans le Circuit :',
    selectVehicle: 'Choisissez le véhicule adapté à la taille de votre famille :',
    paxLabel: 'Passagers',
    bagsLabel: 'Bagages',
    sarLabel: 'SAR',
    fixedFareLabel: 'Tarif fixe par véhicule, chauffeur et temps d’attente',
    bookTourBtn: 'Réserver la Voiture Privée de Ziyarat',
    whatsappBtn: 'Coordonner via WhatsApp',
    etiquetteHeading: 'Charte d’Honneur des Chauffeurs Duyuf Al Rahman',
    etiquetteSubheading: 'Standards d’hospitalité garantissant piété, calme et dignité lors des visites sacrées',
    pillars: [
      {
        title: 'Recueillement & Éthique Islamique',
        desc: 'Nos chauffeurs font preuve d’une discrétion et d’une courtoisie exemplaires respectant la sainteté des lieux.',
      },
      {
        title: 'Climatisation Continue en Attente',
        desc: 'Le véhicule reste maintenu au frais pendant les arrêts pour un confort thermique immédiat.',
      },
      {
        title: 'Assistance Seniors & Fauteuils Roulants',
        desc: 'Prise en charge attentive des aides à la mobilité et dépose au point le plus proche des esplanades.',
      },
      {
        title: 'Temps de Prière & Invocation Respecté',
        desc: 'Votre temps de prière et de méditation vous appartient ; aucune précipitation n’est imposée.',
      },
    ],
    guaranteeBadge: 'Garantie Paiement 100% sur Place',
    guaranteeTitle: 'Aucun Acompte & Aucune Carte de Crédit Requise',
    guaranteeDesc: 'Réservez en toute sérénité. Réglez la somme convenue directement en espèces auprès de votre chauffeur à votre retour à l’hôtel.',
    sites: {} as any,
    tours: {} as any,
  },
  es: {
    badge: 'Patrimonio Profético & Santuarios Sagrados',
    title: 'Tours Privados de Ziyarat en La Meca y Medina con Chofer',
    subtitle: 'Visite los lugares históricos más venerados del Islam en un vehículo ejecutivo con chofer dedicado. Privacidad familiar y pago 100% en efectivo a la llegada.',
    tabMakkah: 'Santuarios de La Meca',
    tabMadinah: 'Patrimonio de Medina',
    sitesHeading: 'Hitos Históricos y Proféticos Verificados',
    sitesSubheading: 'Guía práctica que detalla el esfuerzo físico, los horarios idóneos y el acceso para sillas de ruedas',
    effortMinimal: 'Muy Fácil (Parada en la misma puerta)',
    effortModerate: 'Moderado (Caminata llana en explanada)',
    effortStrenuous: 'Exigente (Subida por escalones de piedra)',
    bestTimeLabel: 'Horario Óptimo de Visita:',
    durationLabel: 'Tiempo Sugerido en el Lugar:',
    standbyNote: 'Su chofer espera con aire acondicionado continuo y agua fresca durante toda su visita sin apresurarle',
    packagesHeading: 'Paquetes de Ziyarat y Tarifas Transparentes',
    packagesSubheading: 'Excursiones privadas de medio día con recogida en el hotel, esperas en cada sitio y regreso cómodo',
    tourDurationLabel: 'Duración Total del Tour:',
    includedStopsLabel: 'Paradas Incluidas en el Itinerario:',
    selectVehicle: 'Seleccione el vehículo adecuado para su familia:',
    paxLabel: 'Pasajeros',
    bagsLabel: 'Maletas',
    sarLabel: 'SAR',
    fixedFareLabel: 'Precio cerrado por vehículo, chofer y tiempos de espera',
    bookTourBtn: 'Reservar Vehículo para Ziyarat',
    whatsappBtn: 'Coordinar por WhatsApp',
    etiquetteHeading: 'Código de Respeto de Choferes Duyuf Al Rahman',
    etiquetteSubheading: 'Protocolos de hospitalidad que garantizan reverencia, calma y seguridad en cada santuario',
    pillars: [
      {
        title: 'Reverencia y Decoro Islámico',
        desc: 'Nuestros choferes observan un trato sereno y respetuoso digno de la santidad de los lugares visitados.',
      },
      {
        title: 'Climatización Continua en Espera',
        desc: 'El vehículo permanece fresco en todo momento durante las paradas para un retorno agradable.',
      },
      {
        title: 'Atención a Mayores y Sillas de Ruedas',
        desc: 'Asistencia para cargar sillas de ruedas y selección de la parada más accesible y cercana.',
      },
      {
        title: 'Tiempo para Oración sin Prisas',
        desc: 'Su tiempo de devoción y oración voluntaria es respetado en su totalidad sin presiones de reloj.',
      },
    ],
    guaranteeBadge: 'Garantía de Pago 100% a la Llegada',
    guaranteeTitle: 'Sin Anticipo y Sin Tarjeta de Crédito Requerida',
    guaranteeDesc: 'Reserve con absoluta confianza. Abone el importe exacto en efectivo directamente al chofer al regresar al hotel.',
    sites: {} as any,
    tours: {} as any,
  },
  de: {
    badge: 'Prophetisches Erbe & Heilige Stätten',
    title: 'Private Ziyarat-Touren in Mekka & Medina mit Chauffeur',
    subtitle: 'Erleben Sie die historischen Stätten des Islam in klimatisierten Fahrzeugen mit persönlichem Chauffeur. Vollkommene familiäre Privatsphäre und 100% Barzahlung bei Ankunft.',
    tabMakkah: 'Ziyarat in Mekka',
    tabMadinah: 'Ziyarat in Medina',
    sitesHeading: 'Verifizierte Historische und Prophetische Stätten',
    sitesSubheading: 'Praktischer Leitfaden zu körperlicher Beanspruchung, optimalen Besuchszeiten und Barrierefreiheit',
    effortMinimal: 'Sehr Einfach (Direkter Ausstieg am Eingang)',
    effortModerate: 'Moderat (Ebener Spaziergang auf Vorplatz)',
    effortStrenuous: 'Anstrengend (Aufstieg über Felstreppen)',
    bestTimeLabel: 'Optimale Besuchszeit:',
    durationLabel: 'Empfohlene Verweildauer:',
    standbyNote: 'Ihr Chauffeur wartet mit durchgehender Klimaanlage und gekühltem Wasser geduldig auf Sie',
    packagesHeading: 'Ausgewählte Tour-Pakete & Transparente Festpreise',
    packagesSubheading: 'Halbtägige private Touren inklusive Abholung am Hotel, Wartezeiten an allen Stätten und Rückfahrt',
    tourDurationLabel: 'Gesamtdauer der Tour:',
    includedStopsLabel: 'Im Paket enthaltene Stopps:',
    selectVehicle: 'Wählen Sie das passende Fahrzeug für Ihre Familie:',
    paxLabel: 'Gäste',
    bagsLabel: 'Gepäck',
    sarLabel: 'SAR',
    fixedFareLabel: 'Festpreis pro Fahrzeug inklusive Chauffeur & Wartezeit',
    bookTourBtn: 'Privatwagen für Ziyarat buchen',
    whatsappBtn: 'Per WhatsApp abstimmen',
    etiquetteHeading: 'Ehrenkodex der Duyuf Al Rahman Chauffeure',
    etiquetteSubheading: 'Strenge Verhaltensregeln zur Wahrung von Andacht, Ruhe und Würde an den heiligen Stätten',
    pillars: [
      {
        title: 'Andacht & Respektvolle Umgangsformen',
        desc: 'Unsere Chauffeure pflegen ein ruhiges, islamisch vorbildliches Auftreten passend zur Würde der heiligen Orte.',
      },
      {
        title: 'Durchgehende Klimatisierung beim Warten',
        desc: 'Das Fahrzeug bleibt auch bei Zwischenstopps vorgekühlt, sodass Sie stets in ein angenehmes Auto einsteigen.',
      },
      {
        title: 'Fürsorge für Senioren & Rollstühle',
        desc: 'Hilfe beim Verstauen von Rollstühlen im Kofferraum und Wahl des kürzesten Fußwegs zum Eingang.',
      },
      {
        title: 'Zeit für Gebet ohne Hektik',
        desc: 'Ihre Gebets- und Bittgebetszeit steht Ihnen uneingeschränkt zu; wir drängen niemals zur Eile.',
      },
    ],
    guaranteeBadge: '100% Barzahlung bei Rückkunft',
    guaranteeTitle: 'Keine Vorauszahlung & Keine Kreditkarte nötig',
    guaranteeDesc: 'Buchen Sie völlig risikofrei. Begleichen Sie den Festpreis erst nach gelungener Tour bar beim Chauffeur am Hotel.',
    sites: {} as any,
    tours: {} as any,
  },
  hi: {
    badge: 'मुक़द्दस मक़ामात और नबवी आसार की ज़ियारत',
    title: 'मक्का और मदीना में प्राइवेट कार और ड्राइवर के साथ ज़ियारत',
    subtitle: 'पूरी फैमिली प्राइवेसी और एयर-कंडीशंड गाड़ी के साथ मुक़द्दस इस्लामी मक़ामात की ज़ियारत। बिना किसी एडवांस के 100% कैश ऑन अराइवल भुगतान।',
    tabMakkah: 'मक्का मुकर्रमा की ज़ियारत',
    tabMadinah: 'मदीना मुनव्वरा की ज़ियारत',
    sitesHeading: 'प्रमाणित ऐतिहासिक व नबवी मक़ामात',
    sitesSubheading: 'शारीरिक मेहनत, बेहतरीन समय और व्हीलचेयर सुविधा से जुड़ी पूरी जानकारी',
    effortMinimal: 'बेहद आसान (गाड़ी से सीधे गेट पर उतरना)',
    effortModerate: 'मध्यम (सपाट आंगन में सामान्य चलना)',
    effortStrenuous: 'मेहनत तलब (पहाड़ी सीढ़ियां चढ़ना)',
    bestTimeLabel: 'ज़ियारत का सबसे अच्छा समय:',
    durationLabel: 'रुकने का मुफ़ीद वक़्त:',
    standbyNote: 'ड्राइवर पूरी ज़ियारत के दौरान एसी चालू रखकर ठंडे पानी के साथ आपका इंतज़ार करता है',
    packagesHeading: 'ज़ियारत टूर पैकेज और पारदर्शी तय किराए',
    packagesSubheading: 'होटल से पिकअप, हर मक़ाम पर इंतज़ार और वापसी पर मुश्तमिल हाफ-डे प्राइवेट टूर',
    tourDurationLabel: 'टूर का कुल समय:',
    includedStopsLabel: 'शामिल मक़ामात की सूची:',
    selectVehicle: 'अपने परिवार के सदस्यों के मुताबिक सही गाड़ी चुनें:',
    paxLabel: 'सवारी',
    bagsLabel: 'बैग्स',
    sarLabel: 'रियाल',
    fixedFareLabel: 'गाड़ी, ड्राइवर और इंतज़ार का तयशुदा कुल किराया',
    bookTourBtn: 'प्राइवेट ज़ियारत कार बुक करें',
    whatsappBtn: 'व्हाट्सएप पर बात करें',
    etiquetteHeading: 'ज़ियारत ड्राइवर्स का पाकीज़ा सेवा संकल्प',
    etiquetteSubheading: 'मुक़द्दस मक़ामात पर अदब, ख़ामोशी और सुकून बनाए रखने के सख़्त नियम',
    pillars: [
      {
        title: 'अदब और संजीदगी',
        desc: 'हमारे ड्राइवर्स मुक़द्दस मक़ामात के एहतराम के मुताबिक निहायत शालीनता से पेश आते हैं।',
      },
      {
        title: 'इंतज़ार में भी लगातार एसी चालू',
        desc: 'धूप से बचने के लिए गाड़ी में हर मक़ाम पर इंतज़ार के दौरान भी एसी लगातार चालू रहता है।',
      },
      {
        title: 'बुज़ुर्गों और व्हीलचेयर का विशेष ध्यान',
        desc: 'व्हीलचेयर को डिग्गी में रखने और सबसे नज़दीकी गेट पर गाड़ी रोकने में पूरी मदद की जाती है।',
      },
      {
        title: 'नमाज़ और दुआ में कोई जल्दबाज़ी नहीं',
        desc: 'मस्जिद कुबा और दूसरे मक़ामात पर इबादत का वक़्त आपका है, हम कभी जल्दबाज़ी का दबाव नहीं डालते।',
      },
    ],
    guaranteeBadge: 'होटल वापसी पर 100% भुगतान की गारंटी',
    guaranteeTitle: 'कोई एडवांस नहीं और कोई क्रेडिट कार्ड नहीं चाहिए',
    guaranteeDesc: 'पूरी निश्चिंतता से बुकिंग करें। पूरा सफ़र ख़त्म होने और होटल लौटने पर ड्राइवर को नक़द भुगतान करें।',
    sites: {} as any,
    tours: {} as any,
  },
  tr: {
    badge: 'Peygamberi Miras & Kutsal Ziyaretler',
    title: 'Mekke & Medine Özel Şoförlü Ziyaret Turları',
    subtitle: 'İslam’ın en kutsal mekanlarına klimalı özel araç ve güvenilir şoför eşliğinde huzurlu bir ziyaret. Tam aile mahremiyeti ve %100 otele varışta nakit ödeme.',
    tabMakkah: 'Mekke-i Mükerreme Ziyaretleri',
    tabMadinah: 'Medine-i Münevvere Ziyaretleri',
    sitesHeading: 'Onaylı Tarihi ve Nebevi Mekanlar',
    sitesSubheading: 'Fiziksel efor seviyesi, en uygun ziyaret saatleri ve tekerlekli sandalye uyumluluğunu gösteren saha rehberi',
    effortMinimal: 'Çok Kolay (Doğrudan kapı önünde iniş)',
    effortModerate: 'Orta (Düz zeminde rahat yürüyüş)',
    effortStrenuous: 'Zorlu (Taş dağ merdivenleri tırmanışı)',
    bestTimeLabel: 'En Uygun Ziyaret Saati:',
    durationLabel: 'Önerilen Kalış Süresi:',
    standbyNote: 'Şoförünüz ziyaretiniz boyunca aracı klimalı ve soğuk sulu halde hazır tutarak sizi sabırla bekler',
    packagesHeading: 'Özel Ziyaret Paketleri ve Şeffaf Fiyatlar',
    packagesSubheading: 'Otelden karşılama, mekanlarda bekleme ve otele dönüşü kapsayan yarım günlük özel tur',
    tourDurationLabel: 'Toplam Tur Süresi:',
    includedStopsLabel: 'Tur Kapsamındaki Duraklar:',
    selectVehicle: 'Ailenizin kişi sayısına uygun aracı seçin:',
    paxLabel: 'Yolcu',
    bagsLabel: 'Valiz',
    sarLabel: 'SAR',
    fixedFareLabel: 'Araç, şoför ve bekleme süresi dahil sabit ücret',
    bookTourBtn: 'Özel Ziyaret Aracını Şimdi Ayırtın',
    whatsappBtn: 'WhatsApp ile İletişime Geçin',
    etiquetteHeading: 'Duyuf Al Rahman Şoför Saygı Sözleşmesi',
    etiquetteSubheading: 'Mübarek mekanlarda huşu, edep ve sükuneti korumayı taahhüt eden katı hizmet standartları',
    pillars: [
      {
        title: 'Huşu ve Nebevi Edep',
        desc: 'Şoförlerimiz kutsal mekanların saygınlığına ve misafirlerimize yakışır şekilde yüksek edeple hizmet verir.',
      },
      {
        title: 'Bekleme Sırasında Kesintisiz Klima',
        desc: 'Araç sıcak havadan etkilenmemeniz için her durakta sürekli klimalı ve serin şekilde bekletilir.',
      },
      {
        title: 'Yaşlı Misafirler ve Tekerlekli Sandalye',
        desc: 'Tekerlekli sandalyelerin bagaja yerleştirilmesinde ve en yakın kapıya yanaşmada özel yardım sağlanır.',
      },
      {
        title: 'Nafle Namaz ve Duada Acele Yok',
        desc: 'Kuba Mescidi ve diğer mekanlardaki ibadet vaktiniz kutsaldır; kesinlikle acele ettirilmezsiniz.',
      },
    ],
    guaranteeBadge: '%100 Otele Dönüşte Ödeme Garantisi',
    guaranteeTitle: 'Ön Ödeme Yok, Kredi Kartı Bilgisi Gerekmez',
    guaranteeDesc: 'Tam bir güvenle rezervasyon yapın. Tur tamamlanıp otelinize sağ salim döndüğünüzde şoförünüze nakit ödeyin.',
    sites: {} as any,
    tours: {} as any,
  },
};

// Copy sites and tours into other languages from English as fallback for those with empty dicts
const fallbackLocales: Locale[] = ['ms', 'id', 'ur', 'fr', 'es', 'de', 'hi', 'tr'];
fallbackLocales.forEach((loc) => {
  if (Object.keys(TRANSLATIONS[loc].sites).length === 0) {
    TRANSLATIONS[loc].sites = TRANSLATIONS['en'].sites;
  }
  if (Object.keys(TRANSLATIONS[loc].tours).length === 0) {
    TRANSLATIONS[loc].tours = TRANSLATIONS['en'].tours;
  }
});

export default function SacredZiyaratExperience({
  locale,
  initialCity = 'makkah',
}: SacredZiyaratExperienceProps) {
  const isRtl = locale === 'ar' || locale === 'ur';
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  const [activeCity, setActiveCity] = useState<'makkah' | 'madinah'>(initialCity);
  const [selectedVehicle, setSelectedVehicle] = useState<'camry' | 'staria' | 'yukon' | 'hiace'>('staria');

  const citySites = Object.values(t.sites).filter((s) => s.city === activeCity);
  const activeTour = activeCity === 'makkah' ? t.tours['makkah-tour'] : t.tours['madinah-tour'];

  const vehicleDetails = {
    camry: {
      name: locale === 'ar' ? 'تويوتا كامري سيدان' : 'Toyota Camry Executive',
      pax: 3,
      bags: 2,
    },
    staria: {
      name: locale === 'ar' ? 'هيونداي ستاريا VIP' : 'Hyundai Staria VIP',
      pax: 6,
      bags: 4,
    },
    yukon: {
      name: locale === 'ar' ? 'جي إم سي يوكن XL' : 'GMC Yukon XL Prestige',
      pax: 6,
      bags: 6,
    },
    hiace: {
      name: locale === 'ar' ? 'تويوتا هاي إيس فان' : 'Toyota HiAce Family Van',
      pax: 10,
      bags: 8,
    },
  };

  const currentPrice = activeTour?.pricing[selectedVehicle] || 250;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="w-full bg-[#0A0A0C] text-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* 1. HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37]">
            <Compass className="w-4 h-4" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {t.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            {t.subtitle}
          </p>
        </div>

        {/* 2. CITY TAB SWITCHER */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#101725] border border-[#D4AF37]/20 shadow-xl">
            <button
              onClick={() => setActiveCity('makkah')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeCity === 'makkah'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-[#0A0A0C] shadow-lg shadow-[#D4AF37]/20 scale-102'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{t.tabMakkah}</span>
            </button>

            <button
              onClick={() => setActiveCity('madinah')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeCity === 'madinah'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-[#0A0A0C] shadow-lg shadow-[#D4AF37]/20 scale-102'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{t.tabMadinah}</span>
            </button>
          </div>
        </div>

        {/* 3. SACRED SITES DIRECTORY */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span>{t.sitesHeading}</span>
            </h3>
            <p className="text-sm text-slate-400">{t.sitesSubheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {citySites.map((site) => (
              <div
                key={site.id}
                className="bg-[#101725]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-[#D4AF37] uppercase block mb-1">
                        {site.arabicName}
                      </span>
                      <h4 className="text-lg font-bold text-white">{site.name}</h4>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap border ${
                        site.effort === 'minimal'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : site.effort === 'moderate'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      {site.effortLabel}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-light">
                    {site.significance}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Accessibility className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{site.accessibility}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>
                        <strong className="text-slate-300">{t.bestTimeLabel}</strong> {site.bestTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Footprints className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>
                        <strong className="text-slate-300">{t.durationLabel}</strong> {site.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5 text-xs text-slate-300">
                  <Car className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{t.standbyNote}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. CURATED TOUR PACKAGE & LIVE RATES */}
        {activeTour && (
          <div className="bg-gradient-to-b from-[#101725] to-[#0A0A0C] rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/30 shadow-2xl space-y-10 relative overflow-hidden">
            <BorderBeam size={280} duration={14} colorFrom="#D6A13A" colorTo="#F2C94C" />
            <Meteors number={10} />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10 relative z-10">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
                  {t.packagesHeading}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeTour.title}
                </h3>
                <p className="text-sm text-slate-300 font-light">{activeTour.subtitle}</p>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-sm font-bold text-[#D4AF37] whitespace-nowrap">
                <Clock className="w-4 h-4" />
                <span>
                  {t.tourDurationLabel} {activeTour.duration}
                </span>
              </div>
            </div>

            {/* ITINERARY LIST */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>{t.includedStopsLabel}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activeTour.itinerary.map((stop, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold text-[11px] shrink-0">
                      {index + 1}
                    </span>
                    <span className="leading-snug">{stop}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* VEHICLE SELECTION & LIVE PRICE CALCULATOR */}
            <div className="space-y-6 pt-4 border-t border-white/10">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {t.selectVehicle}
              </h4>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {(['camry', 'staria', 'yukon', 'hiace'] as const).map((vehKey) => {
                  const veh = vehicleDetails[vehKey];
                  const price = activeTour.pricing[vehKey];
                  const isSelected = selectedVehicle === vehKey;

                  return (
                    <button
                      key={vehKey}
                      onClick={() => setSelectedVehicle(vehKey)}
                      className={`p-4 rounded-2xl text-start transition-all border flex flex-col justify-between space-y-3 relative overflow-hidden ${
                        isSelected
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/15 scale-102 ring-1 ring-[#D4AF37]'
                          : 'bg-white/5 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {isSelected && (
                        <BorderBeam size={130} duration={8} colorFrom="#D6A13A" colorTo="#F2C94C" />
                      )}
                      <div className="space-y-1 relative z-10">
                        <div className="flex items-center justify-between">
                          <Car
                            className={`w-5 h-5 ${isSelected ? 'text-[#D4AF37]' : 'text-slate-400'}`}
                          />
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                          )}
                        </div>
                        <h5 className="font-bold text-sm text-white">{veh.name}</h5>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {veh.pax} {t.paxLabel}
                        </span>
                        <span className="flex items-center gap-1">
                          <Luggage className="w-3.5 h-3.5" />
                          {veh.bags} {t.bagsLabel}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
                        <span className="text-[11px] text-slate-400">{t.fixedFareLabel}</span>
                        <span className="text-lg font-black text-[#D4AF37]">
                          {price} {t.sarLabel}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CALL TO ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="text-xs text-slate-400 block">{t.fixedFareLabel}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{currentPrice}</span>
                  <span className="text-base font-bold text-[#D4AF37]">{t.sarLabel}</span>
                  <span className="text-xs text-slate-400">
                    ({vehicleDetails[selectedVehicle].name})
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <Link
                  href={`/${locale}/booking?service=ziyarat&city=${activeCity}&vehicle=${selectedVehicle}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-extrabold text-sm text-[#0A0A0C] bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] hover:from-[#E5C158] hover:to-[#C49E34] shadow-lg shadow-[#D4AF37]/25 transition-all"
                >
                  <span>{t.bookTourBtn}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>

                <a
                  href={`https://wa.me/966567588261?text=${encodeURIComponent(
                    locale === 'ar'
                      ? `السلام عليكم، أود حجز جولة مزارات ${activeCity === 'makkah' ? 'مكة المكرمة' : 'المدينة المنورة'} بمركبة ${vehicleDetails[selectedVehicle].name}.`
                      : `Hello, I would like to book a private Ziyarat tour in ${activeCity === 'makkah' ? 'Makkah' : 'Madinah'} with a ${vehicleDetails[selectedVehicle].name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t.whatsappBtn}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 5. CHAUFFEUR REVERENCE CODE (4 PILLARS) */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              <span>{t.etiquetteHeading}</span>
            </h3>
            <p className="text-sm text-slate-400">{t.etiquetteSubheading}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.pillars.map((pillar, i) => (
              <div
                key={i}
                className="bg-[#101725] rounded-2xl p-6 border border-white/5 space-y-3 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] font-black text-sm flex items-center justify-center">
                  0{i + 1}
                </div>
                <h4 className="font-bold text-base text-white">{pillar.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. 100% CASH ON ARRIVAL GUARANTEE SHIELD */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#D4AF37]/15 via-[#D4AF37]/5 to-transparent border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-start">
          <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0 shadow-lg">
            <Banknote className="w-8 h-8" />
          </div>

          <div className="space-y-1.5 flex-1">
            <span className="text-[11px] font-bold tracking-wider text-[#D4AF37] uppercase">
              {t.guaranteeBadge}
            </span>
            <h4 className="text-xl font-bold text-white">{t.guaranteeTitle}</h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {t.guaranteeDesc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
