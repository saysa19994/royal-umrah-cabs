import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import VehicleScrollStory from '@/components/showcase/VehicleScrollStory';
import InteriorGallery from '@/components/showcase/InteriorGallery';
import { 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Wifi, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  PhoneCall,
  CheckCircle2,
  Car,
  MessageCircle
} from 'lucide-react';

interface ShowcasePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: ShowcasePageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';

  return {
    title: isAr 
      ? 'استعراض تويوتا كامري VIP التفاعلي 360° و3D | ضيوف الرحمن' 
      : 'Toyota Camry VIP Interactive 360° & 3D Showcase | Duyuf Al Rahman VIP',
    description: isAr
      ? 'تجربة تفاعلية حصرية لاستكشاف سيارة تويوتا كامري VIP لخدمات العمرة والتنقل بين مكة وجدة والمدينة، بتقنيات التصوير 360° والمجسم ثلاثي الأبعاد.'
      : 'Exclusive interactive experience to explore the Toyota Camry VIP for Umrah and executive transfers with 360° photography and real-time 3D WebGL.',
    alternates: getLocalizedAlternates(locale, '/showcase/toyota-camry'),
  };
}

export default async function ToyotaCamryShowcasePage(props: ShowcasePageProps) {
  const params = await props.params;
  const { locale } = params;
  const isAr = locale === 'ar';
  const dict = getDictionary(locale);

  const breadcrumbs = [
    { label: isAr ? 'الرئيسية' : 'Home', href: `/${locale}` },
    { label: isAr ? 'الأسطول الملكي' : 'Royal Fleet', href: `/${locale}/fleet` },
    { label: isAr ? 'تويوتا كامري VIP (معاينة 360°)' : 'Toyota Camry VIP (360° Showcase)', href: `/${locale}/showcase/toyota-camry` },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      
      {/* Top Breadcrumb & Executive Identity Bar */}
      <div className="bg-[#0c121e] border-b border-white/10 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-slate-400" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.href}>
                {idx > 0 && (
                  isAr ? <ChevronLeft className="w-3.5 h-3.5 text-slate-600" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                )}
                {idx === breadcrumbs.length - 1 ? (
                  <span className="text-[#A97B27] font-semibold">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Quick Contact & Chauffeur Status */}
          <div className="flex items-center gap-3 text-slate-300">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isAr ? 'جاهزة للحجز الفوري 24/7' : 'Available for Immediate Booking 24/7'}</span>
            </span>
          </div>

        </div>
      </div>

      {/* Hero Header Area */}
      <header className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#0c121e] to-[#0a0f1d] border-b border-white/5">
        <div className="max-w-7xl mx-auto text-center" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#A97B27]/10 text-[#A97B27] border border-[#A97B27]/30 mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>{isAr ? 'تجربة رقمية حصرية من ضيوف الرحمن VIP' : 'Exclusive Digital Experience by Duyuf Al Rahman VIP'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? 'تويوتا كامري VIP — استعراض تفاعلي 360° و3D' : 'Toyota Camry VIP — Interactive 360° & 3D Experience'}
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
            {isAr
              ? 'الخيار المثالي لرحلات المعتمرين ورجال الأعمال والعائلات الصغيرة بين مطار الملك عبد العزيز بجدة والحرم المكي الشريف والمسجد النبوي الشريف، مع سائق خاص ودفع نقدي عند الوصول.'
              : 'The preferred choice for pilgrims, business executives, and small families traveling between Jeddah Airport, Makkah Haram, and Madinah with a dedicated private chauffeur.'}
          </p>

          {/* Key Vehicle Highlights Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
            <div className="flex items-center gap-2 bg-[#121c2e] px-4 py-2 rounded-2xl border border-white/10">
              <Users className="w-4 h-4 text-[#A97B27]" />
              <span className="font-semibold text-white">{isAr ? '3 ركاب كحد أقصى' : 'Up to 3 Passengers'}</span>
            </div>

            <div className="flex items-center gap-2 bg-[#121c2e] px-4 py-2 rounded-2xl border border-white/10">
              <Briefcase className="w-4 h-4 text-[#A97B27]" />
              <span className="font-semibold text-white">{isAr ? 'حقيبتان كبيرتان + يدويتان' : '2 Large + 2 Small Bags'}</span>
            </div>

            <div className="flex items-center gap-2 bg-[#121c2e] px-4 py-2 rounded-2xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#A97B27]" />
              <span className="font-semibold text-white">{isAr ? 'سائق خاص محترف شامل' : 'Licensed Chauffeur Included'}</span>
            </div>

            <div className="flex items-center gap-2 bg-[#121c2e] px-4 py-2 rounded-2xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-emerald-400">{isAr ? 'دفع 100% نقداً عند الوصول' : '100% Cash on Arrival'}</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Interactive Showcase Section (Scroll Story + 360° & 3D Viewers) */}
      <main>
        <VehicleScrollStory isArabic={isAr} />

        {/* Interior VIP Lounge Section */}
        <InteriorGallery isArabic={isAr} />

        {/* Authoritative Fleet Specifications & Pricing Guarantee */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0c121e] border-t border-white/10" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {isAr ? 'المواصفات الفنية المعتمدة لأسطولنا' : 'Authoritative Fleet Specifications'}
              </h2>
              <p className="text-sm text-slate-300">
                {isAr ? 'بيانات دقيقة موحدة لضمان أقصى درجات الشفافية وراحة ضيوف الرحمن.' : 'Consistent and verified fleet data for transparent, worry-free journeys.'}
              </p>
            </div>

            <div className="bg-[#121c2e] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <table className="w-full text-sm text-right">
                <tbody className="divide-y divide-white/10">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-slate-300 w-1/3">{isAr ? 'طراز المركبة' : 'Vehicle Model'}</td>
                    <td className="p-4 sm:p-5 font-bold text-white">{isAr ? 'تويوتا كامري سيدان تنفيذية فاخرة (Toyota Camry VIP)' : 'Toyota Camry VIP Executive Sedan'}</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-slate-300">{isAr ? 'سعة الركاب المعتمدة' : 'Passenger Capacity'}</td>
                    <td className="p-4 sm:p-5 font-semibold text-white">{isAr ? '3 ركاب بالغين براحة تامة' : '3 Adults in Complete Comfort'}</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-slate-300">{isAr ? 'سعة الأمتعة والحقائب' : 'Luggage Capacity'}</td>
                    <td className="p-4 sm:p-5 font-semibold text-white">{isAr ? 'حقيبتان كبيرتان (Large) + حقيبتان يدويتان (Hand Luggage)' : '2 Large Suitcases + 2 Hand Bags'}</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-slate-300">{isAr ? 'الخدمات المشمولة' : 'Included Amenities'}</td>
                    <td className="p-4 sm:p-5 font-semibold text-[#A97B27]">{isAr ? 'سائق خاص، الوقود، رسوم الطرق السريعة ومواقف المطار، مياه باردة، وإنترنت Wi-Fi مجاني' : 'Private Chauffeur, Fuel, Highway Tolls, Airport Parking, Cold Water, Free Wi-Fi'}</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-slate-300">{isAr ? 'سياسة الدفع الرسمية' : 'Payment Policy'}</td>
                    <td className="p-4 sm:p-5 font-semibold text-emerald-400">{isAr ? 'دفع نقدي 100% للسائق عند الوصول بدون أي عربون أو بطاقات بنكية' : '100% Cash to Chauffeur Upon Arrival — Zero Deposit Required'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Direct Booking Call to Action */}
            <div className="mt-10 p-8 rounded-3xl bg-gradient-to-r from-[#172338] via-[#101827] to-[#172338] border border-[#A97B27]/40 text-center shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {isAr ? 'هل ترغب في حجز هذه المركبة لرحلتك القادمة؟' : 'Ready to Book This Vehicle For Your Upcoming Journey?'}
              </h3>
              <p className="text-sm text-slate-300 mb-6 max-w-2xl mx-auto">
                {isAr
                  ? 'فريق الاستقبال في ضيوف الرحمن VIP على أهبة الاستعداد لترتيب استقبالكم في صالة المطار وتوصيلكم مباشرة إلى فندقكم في مكة أو المدينة.'
                  : 'Our concierge team at Duyuf Al Rahman VIP is ready 24/7 to welcome you at airport arrivals and ensure direct transfer to your hotel.'}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/${locale}#booking`}
                  className="px-8 py-3.5 rounded-2xl bg-[#A97B27] hover:bg-[#8e661e] text-white font-bold text-sm shadow-xl shadow-[#A97B27]/30 transition-all scale-[1.02]"
                >
                  {isAr ? 'إرسال طلب الحجز الآن' : 'Submit Booking Request'}
                </Link>

                <a
                  href="https://wa.me/966566196233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isAr ? 'تواصل عبر واتساب فوراً' : 'Chat via WhatsApp'}</span>
                </a>
              </div>
            </div>

          </div>
        </section>
      </main>

    </div>
  );
}
