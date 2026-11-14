'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Wifi, 
  Wind, 
  VolumeX, 
  Briefcase, 
  Users, 
  Sparkles, 
  Eye, 
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface InteriorGalleryProps {
  isArabic?: boolean;
}

interface InteriorItem {
  id: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  imageSrc: string;
  featuresAr: string[];
  featuresEn: string[];
}

const INTERIOR_ITEMS: InteriorItem[] = [
  {
    id: 'rear-lounge',
    titleAr: 'مقصورة كبار الشخصيات الخلفية VIP',
    titleEn: 'Executive VIP Rear Cabin',
    subtitleAr: 'أقصى درجات الراحة لضيوف الرحمن أثناء التنقل بين مكة وجدة والمدينة',
    subtitleEn: 'Maximum comfort for pilgrims traveling between Makkah, Jeddah and Madinah',
    descriptionAr: 'مقاعد وثيرة مكسوة بأجود أنواع الجلد مع مساحة رحبة للأقدام، وتكييف هواء خلفي مستقل يضمن استرخاءً تاماً طوال مسار الرحلة.',
    descriptionEn: 'Plush leather seating with generous legroom and independent rear climate control ensuring complete relaxation throughout your journey.',
    imageSrc: '/assets/camry-interior/interior_seats.jpg',
    featuresAr: ['مساحة أقدام واسعة للأرجل', 'مساند رأس مريحة للرقبة', 'منافذ شحن USB سريعة', 'حوامل أكواب وكونسول وسطي'],
    featuresEn: ['Generous legroom', 'Ergonomic neck support', 'Fast USB charging ports', 'Cup holders & center armrest']
  },
  {
    id: 'cockpit-tech',
    titleAr: 'قمرة القيادة وأنظمة الملاحة الذكية',
    titleEn: 'Chauffeur Cockpit & Navigation',
    subtitleAr: 'تقنيات متطورة وسائقون محترفون لرحلة آمنة وموثوقة',
    subtitleEn: 'Cutting-edge technology and licensed chauffeurs for a safe journey',
    descriptionAr: 'أنظمة ملاحة لحظية لتفادي الازدحام في مواسم العمرة، مع كاميرات استشعار محيطية وأنظمة أمان متطورة تحمي خصوصيتك وسلامتك.',
    descriptionEn: 'Real-time navigation avoiding congestion during peak Umrah seasons, paired with surround sensors and modern safety suites.',
    imageSrc: '/assets/camry-interior/interior_dashboard.jpg',
    featuresAr: ['نظام ملاحة متصل لحظياً', 'تكييف هوائي مزدوج النطاق', 'شاشة عرض وسائط ذكية', 'نظام صوتي نقي وهادئ'],
    featuresEn: ['Live traffic GPS navigation', 'Dual-zone climate control', 'Smart infotainment screen', 'Acoustic sound insulation']
  },
  {
    id: 'trunk-luggage',
    titleAr: 'صندوق الأمتعة والحقائب القياسي',
    titleEn: 'Luggage Compartment & Cargo',
    subtitleAr: 'سعة كافية لحقائب المعتمرين ومياه زمزم بكل تنظيم',
    subtitleEn: 'Sufficient space for pilgrim luggage and Zamzam water bottles',
    descriptionAr: 'يتسع الصندوق الخلفي لحقيبتين كبيرتين من حقائب السفر وحقيبتين يدويتين إضافيتين بكل أريحية وفق المواصفات المعتمدة لأسطولنا.',
    descriptionEn: 'Accommodates 2 large suitcases and 2 carry-on bags comfortably, strictly matching our verified fleet capacity standards.',
    imageSrc: '/assets/camry-interior/exterior_rear.jpg',
    featuresAr: ['سعة حقيبتين كبيرتين (Large)', 'سعة حقيبتين يدويتين (Hand)', 'مساحة مخصصة لمياه زمزم', 'فتح وإغلاق سلس وسهل'],
    featuresEn: ['2 Large suitcases capacity', '2 Carry-on bags capacity', 'Dedicated space for Zamzam water', 'Smooth trunk access']
  },
  {
    id: 'cabin-ambience',
    titleAr: 'العزل الصوتي والسكينة والراحة',
    titleEn: 'Acoustic Comfort & Serenity',
    subtitleAr: 'أجواء مفعمة بالهدوء والروحانية تليق بقدسية زيارتكم',
    subtitleEn: 'Serene and tranquil atmosphere befitting your sacred journey',
    descriptionAr: 'عوازل صوتية متطورة للأبواب والزجاج تمنع ضوضاء الطرق السريعة بين المدن، مع تظليل حراري معتمد يحمي من حرارة الشمس.',
    descriptionEn: 'Advanced acoustic insulation dampens highway noise between cities, complemented by approved thermal tinting against heat.',
    imageSrc: '/assets/camry-interior/interior.webp',
    featuresAr: ['عزل صوتي فائق الهدوء', 'زجاج معتم للخصوصية التامة', 'تعقيم شامل قبل كل رحلة', 'خدمة واي فاي مجانية على الطريق'],
    featuresEn: ['High acoustic road damping', 'Tinted privacy glass', 'Sterilized before every trip', 'Complimentary onboard Wi-Fi']
  }
];

export const InteriorGallery: React.FC<InteriorGalleryProps> = ({ isArabic = true }) => {
  const [selectedItem, setSelectedItem] = useState<InteriorItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>(INTERIOR_ITEMS[0].id);

  const currentItem = INTERIOR_ITEMS.find((it) => it.id === activeTab) || INTERIOR_ITEMS[0];

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0f1d] via-[#101827] to-[#0a0f1d] text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#A97B27]/10 text-[#A97B27] border border-[#A97B27]/30 mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isArabic ? 'المقصورة والراحة الداخلية' : 'Luxury Interior & Amenities'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
            {isArabic ? 'سكينة وفخامة تليق بضيوف الرحمن' : 'Serenity & Luxury Befitting The Guests of Rahman'}
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            {isArabic 
              ? 'صُممت تفاصيل مقصورة تويوتا كامري VIP لتوفر أعلى معايير العزل والراحة والخصوصية للمعتمرين ورجال الأعمال في تنقلاتهم بين مكة المكرمة وجدة والمدينة المنورة.'
              : 'Every detail in the Toyota Camry VIP cabin is crafted to provide pilgrims and executive guests with supreme quietness, privacy, and long-distance comfort.'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          {INTERIOR_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#A97B27] text-white shadow-lg shadow-[#A97B27]/30 scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 hover:border-white/20'
                }`}
              >
                {isArabic ? item.titleAr : item.titleEn}
              </button>
            );
          })}
        </div>

        {/* Active Feature Showcase Card */}
        <div className="bg-[#121c2e] rounded-3xl border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Feature Image Area */}
          <div className="relative lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[460px] overflow-hidden group">
            <img
              src={currentItem.imageSrc}
              alt={isArabic ? currentItem.titleAr : currentItem.titleEn}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121c2e] via-transparent to-transparent lg:hidden" />
            
            {/* Click to expand image */}
            <button
              type="button"
              onClick={() => setSelectedItem(currentItem)}
              className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 text-white/90 text-xs backdrop-blur-md border border-white/20 hover:bg-black/80 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#A97B27]" />
              <span>{isArabic ? 'عرض بدقة كاملة' : 'View Full Image'}</span>
            </button>
          </div>

          {/* Feature Description Area */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A97B27]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#A97B27]">
                  {isArabic ? 'مزايا المقصورة التنفيذية' : 'Executive Cabin Features'}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {isArabic ? currentItem.titleAr : currentItem.titleEn}
              </h3>
              <p className="text-sm font-medium text-[#A97B27] mb-4">
                {isArabic ? currentItem.subtitleAr : currentItem.subtitleEn}
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {isArabic ? currentItem.descriptionAr : currentItem.descriptionEn}
              </p>

              {/* Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {(isArabic ? currentItem.featuresAr : currentItem.featuresEn).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <ShieldCheck className="w-4 h-4 text-[#A97B27] shrink-0" />
                    <span className="text-xs text-white/90 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Specs Badges */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Users className="w-4 h-4 text-[#A97B27]" />
                <span>{isArabic ? '3 ركاب بالغين' : '3 Passengers'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Briefcase className="w-4 h-4 text-[#A97B27]" />
                <span>{isArabic ? 'حقيبتان كبيرتان + يدويتان' : '2 Large + 2 Small Bags'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300">
                <Wifi className="w-4 h-4 text-[#A97B27]" />
                <span>{isArabic ? 'إنترنت Wi-Fi مجاني' : 'Free Wi-Fi'}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 rounded-full"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={selectedItem.imageSrc}
                  alt={isArabic ? selectedItem.titleAr : selectedItem.titleEn}
                  className="w-full h-full object-contain bg-black"
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-lg font-bold text-white">
                  {isArabic ? selectedItem.titleAr : selectedItem.titleEn}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {isArabic ? selectedItem.subtitleAr : selectedItem.subtitleEn}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default InteriorGallery;
