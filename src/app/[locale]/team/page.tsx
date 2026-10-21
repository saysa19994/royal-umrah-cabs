import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { ShieldCheck, Award, HeartHandshake, CheckCircle2, ArrowRight, UserCheck, Star } from 'lucide-react';

interface TeamPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(props: TeamPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://duyufalrahmanvip.com';
  const title =
    locale === 'ar'
      ? 'فريق السائقين والعمليات'
      : locale === 'ms'
      ? 'Pasukan Kapten Pemandu & Operasi'
      : 'Chauffeur Team & Dispatch Operations';
  const description =
    locale === 'ar'
      ? 'تعرف على كباتن وسائقي رويال عمرة كاب المؤهلين بخبرة واسعة وأمانة عالية في خدمة ضيوف الرحمن بين جدة ومكة والمدينة.'
      : locale === 'ms'
      ? 'Kenali kapten pemandu dan pasukan operasi Royal Umrah Cabs yang berpengalaman dan mesra jemaah Umrah.'
      : 'Meet our vetted, professional pilgrim chauffeurs and 24/7 dispatch coordinators serving Jeddah, Makkah, and Madinah.';

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/team`,
    },
  };
}

export default async function TeamPage(props: TeamPageProps) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = getDictionary(locale);

  const teamMembers = [
    {
      name: locale === 'ar' ? 'الكابتن طارق الهذلي' : 'Captain Tariq Al-Hudhali',
      role: locale === 'ar' ? 'كبير سائقي مسار جدة - مكة' : 'Senior Highway Chauffeur (Jeddah — Makkah)',
      experience: locale === 'ar' ? '12 عاماً من الخبرة' : '12+ Years Experience',
      languages: 'Arabic, English',
      desc:
        locale === 'ar'
          ? 'خبير بطرق مكة المكرمة والفنادق المحيطة بالحرم الشريف، معروف بالهدوء والحرص البالغ على راحة العائلات.'
          : locale === 'ms'
          ? 'Pakar laluan Makkah dan hotel sekitar Masjidil Haram. Amat tenang dan prihatin terhadap keselesaan keluarga.'
          : 'Specialist in Jeddah KAIA terminal pickups and Makkah Central Zone hotels with exceptional punctuality record.',
    },
    {
      name: locale === 'ar' ? 'الكابتن سالم باوزير' : 'Captain Salem Bawazir',
      role: locale === 'ar' ? 'قائد رحلات مكة - المدينة والميقات' : 'Intercity Lead Chauffeur (Makkah — Madinah)',
      experience: locale === 'ar' ? '9 أعوام من الخبرة' : '9+ Years Experience',
      languages: 'Arabic, English, Malay (Basic)',
      desc:
        locale === 'ar'
          ? 'يرافق المعتمرين في طريق الهجرة وميقات ذي الحليفة (مسجد بئر علي) مع التوقف المناسب في استراحات الطريق النظيفة.'
          : locale === 'ms'
          ? 'Memandu di Lebuhraya Hijrah dengan henti rehat berjadual di Miqat Bir Ali untuk berniat ihram dan solat sunat.'
          : 'Specialist in highway transits between the Holy Sanctuaries with dedicated stops at Miqat Bir Ali.',
    },
    {
      name: locale === 'ar' ? 'الكابتن فايز الرحمن' : 'Captain Faiz Al-Rahman',
      role: locale === 'ar' ? 'كابتن جولات الزيارات الميدانية' : 'Ziyarat & Historical Sites Specialist',
      experience: locale === 'ar' ? '8 أعوام من الخبرة' : '8+ Years Experience',
      languages: 'English, Urdu, Arabic',
      desc:
        locale === 'ar'
          ? 'معرفة عميقة بمعالم مكة التاريخية ومواقع السيرة النبوية بالمدينة المنورة ومسجد قباء وجبل أحد.'
          : locale === 'ms'
          ? 'Mahir mercu tanda bersejarah di Makkah dan Madinah seperti Masjid Quba dan Jabal Uhud.'
          : 'Deep knowledge of prophetic heritage sites in Makkah and Madinah with seamless family tour coordination.',
    },
    {
      name: locale === 'ar' ? 'الكابتن بلال العتيبي' : 'Captain Bilal Al-Otaibi',
      role: locale === 'ar' ? 'كابتن أسطول كبار الشخصيات GMC' : 'VIP Executive Fleet Chauffeur',
      experience: locale === 'ar' ? '10 أعوام من الخبرة' : '10+ Years Experience',
      languages: 'Arabic, English',
      desc:
        locale === 'ar'
          ? 'متخصص في خدمة كبار الشخصيات والعائلات الكبيرة عبر أسطول الجمس والستاريا الفاخر مع مراعاة كامل الخصوصية.'
          : locale === 'ms'
          ? 'Mengendali kenderaan VIP GMC Yukon dan Hyundai Staria untuk tetamu kehormat dengan penuh etika dan privasi.'
          : 'Dedicated chauffeur for VIP delegations and executive pilgrimages prioritizing comfort and discretion.',
    },
  ];

  const standards = [
    {
      title: locale === 'ar' ? 'فحص شامل وسجل نظيف' : locale === 'ms' ? 'Pemeriksaan Teliti & Rekod Bersih' : 'Rigorous Background & Safety Vetting',
      desc:
        locale === 'ar'
          ? 'يمر كل سائق بفحص أمني وسلوكي كامل مع مراجعة دقيقة لسجل القيادة وخبرات التعامل مع ضيوف الرحمن.'
          : locale === 'ms'
          ? 'Setiap pemandu melalui semakan latar belakang yang rapi dan rekod pemanduan bersih.'
          : 'Every chauffeur is vetted for defensive driving excellence, local navigation mastery, and pilgrim care etiquette.',
    },
    {
      title: locale === 'ar' ? 'مقصورات غير مدخنين إطلاقاً' : locale === 'ms' ? 'Kabin Bebas Asap Rokok' : '100% Non-Smoking Fleet Policy',
      desc:
        locale === 'ar'
          ? 'سياسات صارمة بعدم التدخين داخل المركبات نهائياً لضمان بيئة صحية ونقية للأطفال وكبار السن.'
          : locale === 'ms'
          ? 'Larangan merokok secara mutlak di dalam kenderaan demi udara bersih dan kesihatan jemaah.'
          : 'Strict non-smoking policy enforced across all vehicles to provide fresh, allergen-free air for pilgrims.',
    },
    {
      title: locale === 'ar' ? 'متابعة حية من غرفة العمليات' : locale === 'ms' ? 'Pemantauan Pusat Kawalan 24 Jam' : '24/7 Operations Room Coordination',
      desc:
        locale === 'ar'
          ? 'غرفة تحكم ومتابعة لحركة الرحلات ومواعيد إقلاع وهبوط الطائرات لتلافي أي تأخير ومساندة السائق فوراً.'
          : locale === 'ms'
          ? 'Pusat operasi memantau status penerbangan dan pergerakan kenderaan secara masa nyata.'
          : 'Central dispatch monitors flight arrival status and highway traffic in real time for effortless pickups.',
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{locale === 'ar' ? 'فريق العمليات والسائقين' : locale === 'ms' ? 'Kapten Pemandu Kami' : 'Pilgrim Chauffeur Team'}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {locale === 'ar'
              ? 'سائقون متمرسون لخدمة ضيوف الرحمن'
              : locale === 'ms'
              ? 'Kapten Pemandu Berpengalaman & Berhemah'
              : 'Experienced, Courteous Chauffeurs at Your Service'}
          </h1>
          <p className="mt-4 text-ink-muted text-base md:text-lg leading-relaxed font-light">
            {locale === 'ar'
              ? 'كباتن معتمدون ذوو معرفة تامة بالطرق وسلوكيات راقية تليق بشرف خدمة المعتمرين وزوار الحرمين الشريفين.'
              : locale === 'ms'
              ? 'Pemandu berakhlak mulia dan mahir selok-belok jalan raya untuk keselesaan ibadah anda.'
              : 'Dedicated local professionals who combine gentle highway driving with hospitable care across the Holy Sanctuaries.'}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-2xl p-7 border border-border shadow-xs hover:border-gold-line transition-all flex flex-col justify-between text-start"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-display font-bold text-xl text-ink">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-gold-dark mt-0.5">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-gold-soft border border-gold-line px-2.5 py-1 rounded-full text-xs font-bold text-ink shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
                    <span>{locale === 'ar' ? 'سائق معتمد' : locale === 'ms' ? 'Disahkan' : 'Verified'}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted my-3">
                  <span className="bg-surface-muted px-2.5 py-1 rounded-md border border-border">
                    {member.experience}
                  </span>
                  <span className="bg-surface-muted px-2.5 py-1 rounded-md border border-border">
                    🗣️ {member.languages}
                  </span>
                </div>

                <p className="text-xs text-ink-muted leading-relaxed font-light mt-3">
                  {member.desc}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-border flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <UserCheck className="w-4 h-4" />
                  <span>{locale === 'ar' ? 'سائق موثق ومعتمد' : locale === 'ms' ? 'Disahkan & Terlatih' : 'Vetted & Verified Chauffeur'}</span>
                </span>
                <Link
                  href={`/${locale}/booking`}
                  className="text-xs font-bold text-gold-dark hover:text-gold-hover inline-flex items-center gap-1"
                >
                  <span>{dict.hero.ctaBook}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Standards Banner */}
        <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border shadow-xs mb-16">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-ink text-center mb-10">
            {locale === 'ar'
              ? 'معايير الاختيار والتدريب'
              : locale === 'ms'
              ? 'Standard Pemilihan & Latihan Pemandu'
              : 'Our Chauffeur Vetting & Service Standards'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start">
            {standards.map((std, i) => (
              <div key={i} className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-gold-soft border border-gold-line text-gold-dark flex items-center justify-center font-bold text-base">
                  0{i + 1}
                </div>
                <h4 className="font-display font-bold text-lg text-ink">
                  {std.title}
                </h4>
                <p className="text-xs text-ink-muted leading-relaxed font-light">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href={`/${locale}/booking`}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gold-dark hover:bg-gold-hover text-surface font-bold text-base shadow-md transition-all gap-2"
          >
            <span>{dict.hero.ctaBook}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
