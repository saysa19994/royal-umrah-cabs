'use client';

import React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import {
  Users,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Luggage,
  Baby,
  HeartHandshake,
  Car,
  Plane,
  Compass,
  ArrowRight,
  Accessibility,
  Volume2,
  Sparkles,
  ChevronRight,
  Banknote,
} from 'lucide-react';

export interface AutomotiveShowroomExperienceProps {
  locale: Locale;
  vehicleSlug: string;
}

interface SuitabilityData {
  familyScore: string;
  familyDesc: string;
  elderlyAccessibility: string;
  elderlyDesc: string;
  strollerWheelchair: string;
  strollerDesc: string;
  acousticIsolation: string;
  acousticDesc: string;
}

interface LuggageBreakdown {
  largeBags: number;
  mediumBags: number;
  cabinBags: number;
  zamzamBottles: number;
  cargoNote: string;
}

interface VehicleProfile {
  suitability: SuitabilityData;
  luggage: LuggageBreakdown;
  suggestedRoutes: {
    title: string;
    duration: string;
    desc: string;
  }[];
}

interface TranslationData {
  sectionTitle: string;
  sectionSubtitle: string;
  suitabilityHeading: string;
  suitabilitySubheading: string;
  luggageHeading: string;
  luggageSubheading: string;
  largeCasesLabel: string;
  mediumCasesLabel: string;
  cabinCasesLabel: string;
  zamzamBoxesLabel: string;
  useCasesHeading: string;
  useCasesSubheading: string;
  guaranteeBadge: string;
  guaranteeTitle: string;
  guaranteeDesc: string;
  relatedHeading: string;
  relatedSubheading: string;
  exploreVehicleBtn: string;
  paxLabel: string;
  bagsLabel: string;
  sarLabel: string;
  startingFrom: string;
  profiles: Record<string, VehicleProfile>;
}

const VEHICLE_DATA: Record<Locale, TranslationData> = {
  ar: {
    sectionTitle: 'المواصفات الهندسية الميدانية للمركبة',
    sectionSubtitle: 'دليل تفصيلي يوضح قدرة استيعاب الحقائب ومستوى راحة العائلة والمسارات المثالية لهذه المركبة',
    suitabilityHeading: 'مؤشر ملاءمة الركاب وراحة العائلة',
    suitabilitySubheading: 'تقييم ميداني معتمد لتوافق المركبة مع كبار السن والأطفال والرحلات الطويلة',
    luggageHeading: 'دليل تخزين الحقائب والأمتعة بصندوق المركبة',
    luggageSubheading: 'سعة تحميل واقعية ومجربة تضمن سلامة أمتعتكم وعبوات مياه زمزم المباركة دون تكدس',
    largeCasesLabel: 'حقائب سفر كبيرة (28-30 بوصة)',
    mediumCasesLabel: 'حقائب متوسطة (24 بوصة)',
    cabinCasesLabel: 'حقائب مقصورة يدوية (20 بوصة)',
    zamzamBoxesLabel: 'عبوات مياه زمزم (5 لتر)',
    useCasesHeading: 'المسارات والاستخدامات المثالية للمركبة',
    useCasesSubheading: 'أين تتألق هذه المركبة وتقدم أعلى قيمة مقابل السعر لضيوف الرحمن؟',
    guaranteeBadge: 'ضمان الدفع 100% نقداً عند الوصول',
    guaranteeTitle: 'لا نشترط أي دفعة مقدمة ولا بيانات بطاقة ائتمان',
    guaranteeDesc: 'احجز مركبتك واطمئن تماماً. السداد يتم للسائق مباشرة نقداً أو بالتحويل الفوري عند إتمام وصولكم لوجهتكم بسلام.',
    relatedHeading: 'خيارات أخرى موصى بها من أسطولنا الملكي',
    relatedSubheading: 'قارن بين فئات أسطولنا واختر المركبة التي تناسب متطلبات أفراد عائلتك بدقة',
    exploreVehicleBtn: 'استعراض مواصفات المركبة',
    paxLabel: 'ركاب',
    bagsLabel: 'حقائب',
    sarLabel: 'ريال',
    startingFrom: 'تبدأ من',
    profiles: {
      'toyota-camry': {
        suitability: {
          familyScore: 'مثالية للأفراد والأزواج والمسافرين بميزانية مدروسة',
          familyDesc: 'تتسع براحة تامة لثلاثة ركاب بالغين مع مقاعد خلفية مريحة وواسعة للأقدام.',
          elderlyAccessibility: 'سهولة دخول ممتازة لكبار السن',
          elderlyDesc: 'ارتفاع أرضي منخفض وأبواب تفتح بزاوية واسعة تسهل ركوب ونزول الوالدين دون عناء.',
          strollerWheelchair: 'تتسع لكرسي متحرك قابل للطي أو عربة أطفال واحدة',
          strollerDesc: 'يمكن وضع كرسي متحرك قياسي مطوي بالصندوق مع حقيبة كبيرة وحقيبتين يدويتين.',
          acousticIsolation: 'عزل صوتي هادئ واستهلاك فائق النعومة',
          acousticDesc: 'نظام قيادة هجين/بنزين حديث يضمن رحلة ناعمة وهادئة على الطريق السريع.',
        },
        luggage: {
          largeBags: 2,
          mediumBags: 2,
          cabinBags: 2,
          zamzamBottles: 2,
          cargoNote: 'صندوق خلفي واسع يتسع لحقيبتين كبيرتين من الحجم الدولي مع حقيبتي مقصورة وعبوتي زمزم.',
        },
        suggestedRoutes: [
          {
            title: 'توصيل مطار جدة إلى فنادق مكة المكرمة',
            duration: '75 - 90 دقيقة',
            desc: 'الخيار الأكثر اقتصادية وعملية للأزواج والمسافرين المنفردين القادمين لأداء العمرة.',
          },
          {
            title: 'جولة مزارات مكة المكرمة الخاصة',
            duration: '3.5 ساعات',
            desc: 'مناورة سهلة وسريعة في شوارع مكة المزدحمة مع تكييف ثنائي ووقوف مريح عند المعالم.',
          },
        ],
      },
      'hyundai-staria': {
        suitability: {
          familyScore: 'الخيار الأول للعائلات والأطفال (حتى 6-7 ركاب)',
          familyDesc: 'صالون رحب بمقاعد VIP منفصلة وأرضية منبسطة تتيح تحرك الأطفال بمرونة وسهولة.',
          elderlyAccessibility: 'أفضل ملاءمة لكبار السن (أبواب منزلقة كهربائية)',
          elderlyDesc: 'أبواب جانبية كهربائية تنزلق بزر واحد مع عتبة صعود منخفضة للغاية تناسب من يعانون من آلام الركبة.',
          strollerWheelchair: 'تتسع لكرسي متحرك وعربة أطفال معاً',
          strollerDesc: 'مساحة رأسية وأفقية ممتازة تمكن من تحميل عربة الأطفال والكرسي المتحرك بسهولة.',
          acousticIsolation: 'نوافذ بانورامية وعزل حراري فائق',
          acousticDesc: 'زجاج واسع يوفر إطلالة مهيبة على معالم الحرمين مع فتحات تكييف سقفية لكل راكب.',
        },
        luggage: {
          largeBags: 4,
          mediumBags: 3,
          cabinBags: 4,
          zamzamBottles: 4,
          cargoNote: 'صندوق أمتعة عميق يتسع لأمتعة عائلة كاملة مع إمكانية ضبط المقاعد الخلفية لزيادة السعة.',
        },
        suggestedRoutes: [
          {
            title: 'استقبال عائلي من مطار جدة إلى الحرم المكي',
            duration: '75 - 90 دقيقة',
            desc: 'سعة استيعابية ممتازة لجميع أفراد الأسرة وحقائبهم دون الحاجة لحجز سيارتين.',
          },
          {
            title: 'رحلة طريق الهجرة بين مكة المكرمة والمدينة المنورة',
            duration: '4 - 4.5 ساعات',
            desc: 'راحة مطلقة على الطريق السريع مع توقف مريح بميقات ذي الحليفة ومساحة استرخاء واسعة.',
          },
        ],
      },
      'gmc-yukon-xl': {
        suitability: {
          familyScore: 'قمة الفخامة والهيبة للعائلات ورجال الأعمال',
          familyDesc: 'سيارة دفع رباعي أمريكية عملاقة بقاعدة عجلات طويلة XL توفر رحابة لا تضاهى.',
          elderlyAccessibility: 'دواسات صعود كهربائية ومقابض مساعدة',
          elderlyDesc: 'دواسة تفتح آلياً عند فتح الباب لتقليل مسافة الصعود، مع مقاعد جلدية وثيرة ومريحة للغاية.',
          strollerWheelchair: 'سعة استيعاب استثنائية لجميع المعدات والكراسي',
          strollerDesc: 'صندوق الـ XL الهائل يتسع لكراسي متحركة وعربات أطفال متعددة دون التأثير على صفوف الركاب.',
          acousticIsolation: 'عزل صوتي فائق السرعة وزجاج مضاعف (Acoustic Glass)',
          acousticDesc: 'نظام تعليق ناعم للغاية يمتص خشونة الطريق ويوفر صمتاً تاماً أثناء القيادة على سرعة 120 كم/س.',
        },
        luggage: {
          largeBags: 6,
          mediumBags: 5,
          cabinBags: 6,
          zamzamBottles: 6,
          cargoNote: 'أكبر سعة تخزين خلفية في فئتها بفضل قاعدة العجلات الطويلة (XL Extended Wheelbase).',
        },
        suggestedRoutes: [
          {
            title: 'رحلة كبار الشخصيات بين مكة المكرمة والمدينة المنورة',
            duration: '4 ساعات',
            desc: 'أعلى درجات الثبات والراحة لعائلتك على طريق الهجرة السريع مع تكييف ثلاثي المناطق.',
          },
          {
            title: 'استقبال كبار الضيوف من مطار المدينة المنورة أو جدة',
            duration: 'مباشر إلى الفندق',
            desc: 'إطلالة مهيبة وخدمة سائق بروتوكولية تليق بضيوف الحرمين الشريفين.',
          },
        ],
      },
      'toyota-hiace': {
        suitability: {
          familyScore: 'الخيار الأفضل للوفود والمجموعات العائلية الكبيرة (حتى 10 ركاب)',
          familyDesc: 'سقف مرتفع وممر داخلي يتيح سهولة الجلوس والوقوف دون انحناء شاق.',
          elderlyAccessibility: 'درجة صعود مخصصة ومقابض ارتكاز قوية',
          elderlyDesc: 'باب جانبي واسع جداً مع مسكات يد على كل مدخل لمساعدة الوالدين على الدخول بأمان.',
          strollerWheelchair: 'تتسع لعدة كراسي متحركة وحقائب ضخمة',
          strollerDesc: 'مساحة شحن مخصصة في الخلف قادرة على استيعاب كراسي متعددة وأمتعة جماعية.',
          acousticIsolation: 'تكييف مركزي سقفى جبار يغطي كامل الصفوف',
          acousticDesc: 'فتحات تهوية مخصصة لكل مقعد مع عزل حراري صمم خصيصاً لمناخ المشاعر المقدسة.',
        },
        luggage: {
          largeBags: 8,
          mediumBags: 6,
          cabinBags: 8,
          zamzamBottles: 8,
          cargoNote: 'سعة شحن أسطولية مجهزة خصيصاً للوفود العائلية الكبيرة لجمع كافة حقائبهم بمركبة واحدة.',
        },
        suggestedRoutes: [
          {
            title: 'نقل المجموعات العائلية من مطار جدة لمكة المكرمة',
            duration: '85 دقيقة',
            desc: 'أعلى توفير مالي للعائلات الكبيرة مقارنة بحجز 3 سيارات صغيرة.',
          },
          {
            title: 'جولة مزارات المدينة المنورة الشاملة للمجموعات',
            duration: '4 ساعات',
            desc: 'زيارة مريحة تجمع كامل العائلة في سيارة واحدة لمسجد قباء وجبل أحد وموقع الخندق.',
          },
        ],
      },
      'mercedes-maybach': {
        suitability: {
          familyScore: 'ذروة الرفاهية والبروتوكول الملكي (حتى 3 ركاب كبار)',
          familyDesc: 'مقاعد طيران فئة أولى مع مساج كهربائي وتبريد وتدفئة وتحكم رقمي كامل.',
          elderlyAccessibility: 'دخول بالغ النعومة مع نظام إغلاق الأبواب الهادئ (شفط)',
          elderlyDesc: 'أقصى درجات الدلال والراحة لضيوف الدولة وكبار السن مع مساند أقدام كهربائية ممتدة.',
          strollerWheelchair: 'كرسي متحرك فاخر خفيف بالصندوق الخلفي',
          strollerDesc: 'صندوق أمتعة فاره مكسو بالمخمل يتسع للحقائب الشخصية الفاخرة.',
          acousticIsolation: 'صمت مطبق ونظام عزل صوتي نشط وتقنية هواء مؤين',
          acousticDesc: 'نظام Burmester الصوتي مع زجاج كاتم للصوت تماماً يجعلك تشعر بالعزلة التامة عن ضوضاء الشارع.',
        },
        luggage: {
          largeBags: 3,
          mediumBags: 2,
          cabinBags: 3,
          zamzamBottles: 2,
          cargoNote: 'مساحة مخصصة للحقائب الفاخرة المعتمدة دولياً لضيوف المراسم الخاصة.',
        },
        suggestedRoutes: [
          {
            title: 'استقبال الطيران الخاص وصالة كبار الشخصيات بمطار جدة',
            duration: 'خدمة بروتوكولية مباشرة',
            desc: 'سائق خاص بلباس رسمي وخدمة كونسيرج مخصصة مباشرة لأبراج الحرم المكي.',
          },
          {
            title: 'تنقلات الوفود الرسمية والدبلوماسية بين مكة والمدينة',
            duration: '4 ساعات في سكينة تامة',
            desc: 'راحة متناهية وسرية تامة مع مقصورة معزولة لكبار الشخصيات.',
          },
        ],
      },
      'toyota-coaster': {
        suitability: {
          familyScore: 'الحافلة الصغيرة الفاخرة للمجموعات وحملات العمرة (حتى 17-21 راكباً)',
          familyDesc: 'مقاعد مريحة وعالية مع ممر وسطي واسع ونوافذ كبيرة مظللة.',
          elderlyAccessibility: 'درجات صعود واسعة مع درابزين مزدوج',
          elderlyDesc: 'صعود مريح للمجموعات من كبار السن مع مساحات واسعة لحركة الركاب.',
          strollerWheelchair: 'تتسع لعدة كراسي متحركة وعربات بالصندوق المخصص',
          strollerDesc: 'مساحة أمتعة مخصصة للمجموعات تتسع لكميات كبيرة من الحقائب وماء زمزم.',
          acousticIsolation: 'نظام تكييف صناعي مزدوج ومكبرات صوت داخلية',
          acousticDesc: 'تبريد سريع وعزل ممتاز للرحلات الطويلة بين مكة المكرمة والمدينة المنورة.',
        },
        luggage: {
          largeBags: 15,
          mediumBags: 10,
          cabinBags: 15,
          zamzamBottles: 15,
          cargoNote: 'سعة استيعابية هائلة مخصصة للرحلات الجماعية وأفواج المعتمرين.',
        },
        suggestedRoutes: [
          {
            title: 'نقل حملات المعتمرين بين مطار جدة ومكة المكرمة',
            duration: '90 دقيقة',
            desc: 'الحل الأمثل للحملات العائلية الكبيرة مع السائق والوقود والانتظار.',
          },
          {
            title: 'رحلات الزيارات الجماعية بالمدينة المنورة ومكة',
            duration: '4 ساعات',
            desc: 'تنظيم دقيق لزيارة المواقع النبوية بمركبة واحدة تجمع كافة المعتمرين.',
          },
        ],
      },
    },
  },
  en: {
    sectionTitle: 'Field Engineering & Vehicle Suitability Matrix',
    sectionSubtitle: 'Comprehensive real-world guide detailing luggage capacities, passenger comfort, and optimal travel corridors',
    suitabilityHeading: 'Passenger Suitability & Family Comfort Index',
    suitabilitySubheading: 'Field-verified assessment for seniors, children, mobility aids, and long-distance desert corridors',
    luggageHeading: 'Trunk Stowing Guide & Real-World Cargo Capacity',
    luggageSubheading: 'Tested cargo capacities ensuring safe transport of checked luggage and blessed Zamzam water boxes',
    largeCasesLabel: 'Large Check-in Cases (28-30")',
    mediumCasesLabel: 'Medium Suitcases (24")',
    cabinCasesLabel: 'Cabin Carry-ons (20")',
    zamzamBoxesLabel: 'Zamzam Water Boxes (5 Liters)',
    useCasesHeading: 'Optimal Service Corridors & Use Cases',
    useCasesSubheading: 'Where this executive vehicle delivers maximum value and comfort for pilgrims',
    guaranteeBadge: '100% Cash-on-Arrival Guarantee',
    guaranteeTitle: 'Zero Advance Deposit & Zero Card Required Online',
    guaranteeDesc: 'Book with complete peace of mind. Settle the fixed fare in cash or instant transfer directly with your chauffeur upon arrival at your hotel.',
    relatedHeading: 'Other Recommended Vehicles from Our Fleet',
    relatedSubheading: 'Compare across categories to find the ideal match for your family requirements',
    exploreVehicleBtn: 'Explore Vehicle Profile',
    paxLabel: 'Guests',
    bagsLabel: 'Luggage',
    sarLabel: 'SAR',
    startingFrom: 'From',
    profiles: {
      'toyota-camry': {
        suitability: {
          familyScore: 'Ideal for Solo Travelers, Couples & Budget-Conscious Pilgrims',
          familyDesc: 'Comfortably seats up to 3 adults with generous rear legroom and supportive contoured seating.',
          elderlyAccessibility: 'Effortless Ground Ingress for Seniors',
          elderlyDesc: 'Low sedan stance and wide-opening rear doors ensure gentle, unhurried entry and exit for elderly parents.',
          strollerWheelchair: 'Accommodates 1 Foldable Wheelchair or Baby Stroller',
          strollerDesc: 'Standard trunk neatly swallows one folding wheelchair alongside two international checked bags.',
          acousticIsolation: 'Whisper-Quiet Hybrid Drivetrain',
          acousticDesc: 'Advanced aerodynamic profile delivers a peaceful, vibration-free highway glide.',
        },
        luggage: {
          largeBags: 2,
          mediumBags: 2,
          cabinBags: 2,
          zamzamBottles: 2,
          cargoNote: 'Spacious trunk accommodates 2 full-size check-in bags plus carry-ons and 2 Zamzam 5L boxes.',
        },
        suggestedRoutes: [
          {
            title: 'Jeddah Airport to Makkah Hotel Transfer',
            duration: '75 - 90 mins',
            desc: 'The most economical and swift private chauffeur option for couples arriving for Umrah.',
          },
          {
            title: 'Private Makkah Sacred Ziyarat Tour',
            duration: '3.5 Hours',
            desc: 'Effortless maneuverability through holy city terrain with dual climate control.',
          },
        ],
      },
      'hyundai-staria': {
        suitability: {
          familyScore: 'Top Choice for Families with Children (Up to 6-7 Guests)',
          familyDesc: 'Lounge-style VIP cabin with individual captain chairs and flat floor allowing easy movement for children.',
          elderlyAccessibility: 'Supreme Senior Accessibility via Electric Sliding Doors',
          elderlyDesc: 'One-touch dual power sliding doors with ultra-low floor step-in height; painless for pilgrims with joint issues.',
          strollerWheelchair: 'Seamlessly Holds Wheelchairs & Full-Size Strollers',
          strollerDesc: 'Generous vertical cabin height allows upright loading of strollers and mobility walkers.',
          acousticIsolation: 'Panoramic Windows & Dedicated Roof Climate Vents',
          acousticDesc: 'Expansive glass surfaces offer breathtaking views of holy milestones with independent rear climate dials.',
        },
        luggage: {
          largeBags: 4,
          mediumBags: 3,
          cabinBags: 4,
          zamzamBottles: 4,
          cargoNote: 'Deep rear luggage bay holds full family luggage stack with adjustable sliding row flexibility.',
        },
        suggestedRoutes: [
          {
            title: 'Jeddah Airport to Makkah Hotel Family Transfer',
            duration: '75 - 90 mins',
            desc: 'Generous capacity keeping the entire nuclear family and their baggage together in one car.',
          },
          {
            title: 'Makkah to Madinah Hijrah Highway Journey',
            duration: '4 - 4.5 Hours',
            desc: 'Supreme long-distance comfort with scheduled Miqat Dhu al-Hulayfah consecration stop.',
          },
        ],
      },
      'gmc-yukon-xl': {
        suitability: {
          familyScore: 'Pinnacle of American Luxury & Space for Large Families',
          familyDesc: 'Full-size Extended Wheelbase (XL) prestige SUV offering three full rows of executive seating.',
          elderlyAccessibility: 'Power Retractable Running Boards & Assist Handles',
          elderlyDesc: 'Automated running boards deploy upon door opening to provide a low, steady step for elderly guests.',
          strollerWheelchair: 'Enormous Cargo Volume for Multiple Aids',
          strollerDesc: 'The massive XL rear bay easily holds folding wheelchairs and strollers behind the 3rd row.',
          acousticIsolation: 'Acoustic Laminated Glass & Magnetic Ride Suspension',
          acousticDesc: 'Virtually silent high-speed cruising at 120 km/h with active road noise cancellation.',
        },
        luggage: {
          largeBags: 6,
          mediumBags: 5,
          cabinBags: 6,
          zamzamBottles: 6,
          cargoNote: 'Maximum cargo volume in its class thanks to the extended XL wheelbase architecture.',
        },
        suggestedRoutes: [
          {
            title: 'VIP Chauffeur Transfer: Makkah to Madinah',
            duration: '4 Hours',
            desc: 'Unmatched highway stability, tri-zone heavy-duty climate, and ultimate executive family presence.',
          },
          {
            title: 'Jeddah Airport VIP Curbside Meet & Greet',
            duration: 'Direct to Hotel Portico',
            desc: 'Prestige arrival with luggage porterage and dignified reception for your family.',
          },
        ],
      },
      'toyota-hiace': {
        suitability: {
          familyScore: 'The Ultimate Choice for Large Delegations & Groups (Up to 10 Pax)',
          familyDesc: 'High-roof architecture allowing passengers to walk inside without strenuous stooping.',
          elderlyAccessibility: 'Wide Step Plate & Sturdy Dual Grab Handrails',
          elderlyDesc: 'Extra-wide side sliding door with heavy-duty grab handles providing firm support for elderly guests.',
          strollerWheelchair: 'Massive Group Cargo Area for Multiple Wheelchairs',
          strollerDesc: 'Rear compartment easily handles multiple mobility aids alongside extensive group baggage.',
          acousticIsolation: 'Commercial-Grade High-Output Twin Climate Evaporators',
          acousticDesc: 'Heavy-duty ceiling louvers ensure icy cabin temperatures even during intense summer heat.',
        },
        luggage: {
          largeBags: 8,
          mediumBags: 6,
          cabinBags: 8,
          zamzamBottles: 8,
          cargoNote: 'Designed specifically for large family groups seeking to travel together in a single executive vehicle.',
        },
        suggestedRoutes: [
          {
            title: 'Group Umrah Airport Transfer: Jeddah to Makkah',
            duration: '85 mins',
            desc: 'Substantial cost savings for 8-10 passengers compared to hiring multiple smaller taxis.',
          },
          {
            title: 'Comprehensive Madinah Prophetic Ziyarat Tour',
            duration: '4 Hours',
            desc: 'Keep your entire group unified while visiting Masjid Quba, Mount Uhud, and the Trench.',
          },
        ],
      },
      'mercedes-maybach': {
        suitability: {
          familyScore: 'The Pinnacle of Royal Protocol & Executive Seclusion (Up to 3 VIPs)',
          familyDesc: 'First-class rear executive reclining seats with active massage, ventilation, and calf rests.',
          elderlyAccessibility: 'Ultra-Smooth Ingress with Soft-Close Power Doors',
          elderlyDesc: 'Utmost pampering for distinguished guests and seniors with extended motorized footrests.',
          strollerWheelchair: 'Lightweight Compact Wheelchair in Velvet-Lined Trunk',
          strollerDesc: 'Refined luggage compartment tailored for international designer luggage sets.',
          acousticIsolation: 'Absolute Vault Silence & Burmester Active Noise Compensation',
          acousticDesc: 'Double-glazed acoustic glass isolates the cabin completely from outside desert wind and traffic.',
        },
        luggage: {
          largeBags: 3,
          mediumBags: 2,
          cabinBags: 3,
          zamzamBottles: 2,
          cargoNote: 'Dedicated executive cargo capacity for discerning diplomats and VIP pilgrims.',
        },
        suggestedRoutes: [
          {
            title: 'VIP Private Aviation & Royal Terminal Reception',
            duration: 'Bespoke Protocol Service',
            desc: 'Formal suited chauffeur, curbside red-carpet assistance, and direct transfer to Makkah hotel towers.',
          },
          {
            title: 'State Delegation Transfer: Makkah to Madinah',
            duration: '4 Hours of Absolute Seclusion',
            desc: 'Work or rest in complete privacy with mobile executive workstation features.',
          },
        ],
      },
      'toyota-coaster': {
        suitability: {
          familyScore: 'Luxury Minibus for Group Umrah Delegations (17-21 Passengers)',
          familyDesc: 'Plush high-back touring seats with wide center aisle and large panoramic tinted windows.',
          elderlyAccessibility: 'Expansive Low-Rise Entrance Steps with Dual Handrails',
          elderlyDesc: 'Designed for effortless boarding of elderly tour groups and pilgrims.',
          strollerWheelchair: 'Dedicated Rear Luggage Bay for Wheelchairs & Walkers',
          strollerDesc: 'Separate cargo compartment secures all group equipment and mobility devices.',
          acousticIsolation: 'Dual High-Capacity Industrial Air Conditioning',
          acousticDesc: 'Rapid cooling throughout the 21-passenger cabin even in peak midday summer conditions.',
        },
        luggage: {
          largeBags: 15,
          mediumBags: 10,
          cabinBags: 15,
          zamzamBottles: 15,
          cargoNote: 'Substantial commercial luggage capacity engineered for full Umrah groups and flights.',
        },
        suggestedRoutes: [
          {
            title: 'Full Umrah Group Transfer: Jeddah Airport to Makkah',
            duration: '90 mins',
            desc: 'Seamless, unified group logistics with dedicated chauffeur and luggage handling.',
          },
          {
            title: 'Madinah & Makkah Group Prophetic Sanctuary Tour',
            duration: '4 Hours',
            desc: 'Coordinated pilgrimage tour to historic mosques and prophetic landmarks for the entire group.',
          },
        ],
      },
    },
  },
  ms: {} as any,
  id: {} as any,
  ur: {} as any,
  fr: {} as any,
  es: {} as any,
  de: {} as any,
  hi: {} as any,
  tr: {} as any,
};

// Fallback for other locales to English
const otherLocales: Locale[] = ['ms', 'id', 'ur', 'fr', 'es', 'de', 'hi', 'tr'];
otherLocales.forEach((loc) => {
  VEHICLE_DATA[loc] = VEHICLE_DATA.en;
});

const ALL_FLEET_VEHICLES = [
  {
    slug: 'toyota-camry',
    name: 'Toyota Camry Executive',
    arabicName: 'تويوتا كامري سيدان',
    category: 'Executive Sedan',
    pax: 3,
    bags: 2,
    startingPrice: 200,
  },
  {
    slug: 'hyundai-staria',
    name: 'Hyundai Staria VIP',
    arabicName: 'هيونداي ستاريا VIP',
    category: 'Luxury Family MPV',
    pax: 6,
    bags: 4,
    startingPrice: 250,
  },
  {
    slug: 'gmc-yukon-xl',
    name: 'GMC Yukon XL Prestige',
    arabicName: 'جي إم سي يوكن XL',
    category: 'Prestige SUV',
    pax: 6,
    bags: 6,
    startingPrice: 350,
  },
  {
    slug: 'toyota-hiace',
    name: 'Toyota HiAce Family Van',
    arabicName: 'تويوتا هاي إيس فان',
    category: 'Family Minivan',
    pax: 10,
    bags: 8,
    startingPrice: 300,
  },
  {
    slug: 'mercedes-maybach',
    name: 'Mercedes-Maybach S-Class',
    arabicName: 'مرسيدس مايباخ S-Class',
    category: 'Ultra-Luxury VIP',
    pax: 3,
    bags: 3,
    startingPrice: 850,
  },
];

export default function AutomotiveShowroomExperience({
  locale,
  vehicleSlug,
}: AutomotiveShowroomExperienceProps) {
  const isRtl = locale === 'ar' || locale === 'ur';
  const t = VEHICLE_DATA[locale] || VEHICLE_DATA.en;

  // Resolve profile key
  const profileKey = vehicleSlug.includes('camry')
    ? 'toyota-camry'
    : vehicleSlug.includes('staria')
    ? 'hyundai-staria'
    : vehicleSlug.includes('yukon')
    ? 'gmc-yukon-xl'
    : vehicleSlug.includes('hiace')
    ? 'toyota-hiace'
    : vehicleSlug.includes('maybach')
    ? 'mercedes-maybach'
    : 'hyundai-staria';

  const profile = t.profiles[profileKey] || t.profiles['hyundai-staria'];
  const relatedVehicles = ALL_FLEET_VEHICLES.filter((v) => !v.slug.includes(profileKey));

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="w-full bg-[#0A0A0C] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 border-y border-white/5 space-y-12"
    >
      {/* 1. PASSENGER & FAMILY SUITABILITY INDEX */}
      <div className="space-y-6">
        <div className="text-start space-y-1">
          <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase block">
            {t.suitabilityHeading}
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            {profile.suitability.familyScore}
          </h3>
          <p className="text-sm text-slate-400 font-light max-w-3xl">
            {t.suitabilitySubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Senior Accessibility Card */}
          <div className="bg-[#101725] rounded-2xl p-5 border border-white/5 space-y-2.5 hover:border-[#D4AF37]/30 transition-all">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Accessibility className="w-5 h-5 shrink-0" />
              <h4 className="font-bold text-sm text-white">{profile.suitability.elderlyAccessibility}</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {profile.suitability.elderlyDesc}
            </p>
          </div>

          {/* Stroller & Wheelchair Card */}
          <div className="bg-[#101725] rounded-2xl p-5 border border-white/5 space-y-2.5 hover:border-[#D4AF37]/30 transition-all">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Baby className="w-5 h-5 shrink-0" />
              <h4 className="font-bold text-sm text-white">{profile.suitability.strollerWheelchair}</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {profile.suitability.strollerDesc}
            </p>
          </div>

          {/* Acoustic & Highway Isolation Card */}
          <div className="bg-[#101725] rounded-2xl p-5 border border-white/5 space-y-2.5 hover:border-[#D4AF37]/30 transition-all">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Volume2 className="w-5 h-5 shrink-0" />
              <h4 className="font-bold text-sm text-white">{profile.suitability.acousticIsolation}</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {profile.suitability.acousticDesc}
            </p>
          </div>
        </div>
      </div>

      {/* 2. REAL-WORLD TRUNK & LUGGAGE STOWING GUIDE */}
      <div className="bg-[#101725] rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/20 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <Luggage className="w-5 h-5" />
              <h3 className="font-bold text-xl text-white">{t.luggageHeading}</h3>
            </div>
            <p className="text-xs text-slate-400 font-light">{t.luggageSubheading}</p>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 max-w-md">
            <span>{profile.luggage.cargoNote}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center space-y-1">
            <span className="text-3xl font-black text-[#D4AF37] block">
              {profile.luggage.largeBags}
            </span>
            <span className="text-[11px] font-bold text-slate-300 block">
              {t.largeCasesLabel}
            </span>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center space-y-1">
            <span className="text-3xl font-black text-[#D4AF37] block">
              {profile.luggage.mediumBags}
            </span>
            <span className="text-[11px] font-bold text-slate-300 block">
              {t.mediumCasesLabel}
            </span>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center space-y-1">
            <span className="text-3xl font-black text-[#D4AF37] block">
              {profile.luggage.cabinBags}
            </span>
            <span className="text-[11px] font-bold text-slate-300 block">
              {t.cabinCasesLabel}
            </span>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center space-y-1">
            <span className="text-3xl font-black text-[#D4AF37] block">
              {profile.luggage.zamzamBottles}
            </span>
            <span className="text-[11px] font-bold text-slate-300 block">
              {t.zamzamBoxesLabel}
            </span>
          </div>
        </div>
      </div>

      {/* 3. OPTIMAL SERVICE CORRIDORS */}
      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase block">
            {t.useCasesHeading}
          </span>
          <p className="text-xs text-slate-400 font-light">{t.useCasesSubheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.suggestedRoutes.map((route, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#101725] border border-white/5 flex items-start gap-4 hover:border-[#D4AF37]/30 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white">{route.title}</h4>
                  <span className="text-[11px] font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
                    {route.duration}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {route.desc}
                </p>
              </div>
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
      </div>

      {/* 5. RELATED VEHICLES RECOMMENDATIONS */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        <div className="space-y-1">
          <h4 className="text-lg font-bold text-white">{t.relatedHeading}</h4>
          <p className="text-xs text-slate-400 font-light">{t.relatedSubheading}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedVehicles.slice(0, 4).map((veh) => (
            <Link
              key={veh.slug}
              href={`/${locale}/fleet/${veh.slug}`}
              className="p-4 rounded-2xl bg-[#101725] border border-white/5 hover:border-[#D4AF37]/40 transition-all block group space-y-3"
            >
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-wider">
                  {veh.category}
                </span>
                <h5 className="font-bold text-sm text-white group-hover:text-[#D4AF37] transition-colors">
                  {locale === 'ar' ? veh.arabicName : veh.name}
                </h5>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {veh.pax} {t.paxLabel}
                </span>
                <span className="flex items-center gap-1">
                  <Luggage className="w-3.5 h-3.5" />
                  {veh.bags} {t.bagsLabel}
                </span>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{t.startingFrom}</span>
                <span className="font-black text-sm text-[#D4AF37]">
                  {veh.startingPrice} {t.sarLabel}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
