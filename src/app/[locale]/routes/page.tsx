import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Compass, ShieldCheck, Banknote, Car, Plane, ChevronRight, Sparkles, MessageCircle } from 'lucide-react';
import { ExecutiveRouteCard } from '@/components/routes/ExecutiveRouteCard';
import { PricingTable } from '@/components/pricing/PricingTable';
import { EXECUTIVE_ROUTES_DATA } from '@/data/executive-routes-data';
import { getDbPricesCached } from '@/lib/pricing-db';
import { getMergedSiteSettings } from '@/lib/dynamic-settings-store';

interface RoutesPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const ROUTES_LOCALIZED_HEADER: Record<
  Locale,
  {
    badge: string;
    title: string;
    subtitle: string;
    trustCash: string;
    trustFixed: string;
    trustFlight: string;
    allRoutesCount: string;
  }
> = {
  ar: {
    badge: 'شبكة مسارات الحرمين الشريفين',
    title: 'مسارات الحرمين الشريفين والنقل بين المدن',
    subtitle:
      'خدمات انتقالات VIP خاصة ومباشرة بين مطار جدة، مكة المكرمة، المدينة المنورة، الطائف، والرياض بأسعار ثابتة للمركبة بالكامل ودفع نقدي 100% عند الوصول.',
    trustCash: 'سداد نقدي عند الوصول',
    trustFixed: 'أجرة ثابتة للمركبة بالكامل',
    trustFlight: 'تتبع راداري لمواعيد الرحلات',
    allRoutesCount: 'المسارات المعتمدة للرحلات',
  },
  en: {
    badge: 'Holy Harameyn & Intercity Network',
    title: 'Popular Umrah & Intercity VIP Routes',
    subtitle:
      'Private executive chauffeur transfers connecting Jeddah Airport, Makkah, Madinah, Taif, and Riyadh with fixed rates per vehicle and 100% cash payment on arrival.',
    trustCash: '100% Cash on Arrival',
    trustFixed: 'Fixed Price Per Vehicle',
    trustFlight: 'Live Flight Radar Tracking',
    allRoutesCount: 'Official Chauffeur Routes',
  },
  ms: {
    badge: 'Rangkaian Laluan Tanah Suci & Antara Bandar',
    title: 'Laluan Umrah & Antara Bandar VIP',
    subtitle:
      'Perkhidmatan pemandu peribadi VIP antara Lapangan Terbang Jeddah, Makkah, Madinah, Taif, dan Riyadh dengan kadar tetap setiap kenderaan dan bayaran tunai semasa tiba.',
    trustCash: 'Bayar Tunai Semasa Tiba',
    trustFixed: 'Harga Tetap Setiap Kenderaan',
    trustFlight: 'Penjejakan Radar Penerbangan',
    allRoutesCount: 'Laluan Rasmi Pemandu VIP',
  },
  id: {
    badge: 'Jaringan Rute Tanah Suci & Antarkota',
    title: 'Rute Umrah & Antarkota VIP Populer',
    subtitle:
      'Layanan transfer mobil pribadi VIP menghubungkan Bandara Jeddah, Makkah, Madinah, Taif, dan Riyadh dengan harga pasti per kendaraan dan bayar tunai saat tiba.',
    trustCash: 'Bayar Tunai Saat Tiba',
    trustFixed: 'Harga Pasti Per Kendaraan',
    trustFlight: 'Pelacakan Radar Pesawat',
    allRoutesCount: 'Daftar Rute Resmi VIP',
  },
  ur: {
    badge: 'حرمین شریفین اور بین الشہری روٹس',
    title: 'مقبول عمرہ اور انٹر سٹی وی آئی پی روٹس',
    subtitle:
      'جدہ ایئرپورٹ، مکہ مکرمہ، مدینہ منورہ، طائف اور ریاض کے درمیان مقررہ کرایوں اور منزل پر نقد ادائیگی کے ساتھ نجی پریمیم ڈرائیور سروس۔',
    trustCash: 'منزل پر نقد ادائیگی',
    trustFixed: 'مکمل گاڑی کا مقررہ کرایہ',
    trustFlight: 'پروازوں کی لائیو ٹریکنگ',
    allRoutesCount: 'مجوزہ سرکاری روٹس',
  },
  fr: {
    badge: 'Réseau Interurbain & Lieux Saints',
    title: 'Itinéraires VIP Omra & Transferts Interurbains',
    subtitle:
      'Transferts privés avec chauffeur reliant l’Aéroport de Djeddah, La Mecque, Médine, Taïf et Riyad avec prix fixe par véhicule et paiement en espèces à l’arrivée.',
    trustCash: 'Paiement en Espèces à l’Arrivée',
    trustFixed: 'Prix Fixe Par Véhicule',
    trustFlight: 'Suivi des Vols en Direct',
    allRoutesCount: 'Itinéraires Officiels VIP',
  },
  es: {
    badge: 'Red de Rutas Sagradas e Interurbanas',
    title: 'Rutas VIP para Umrah y Conexiones Interurbanas',
    subtitle:
      'Traslados privados de lujo que conectan el Aeropuerto de Yeda, La Meca, Medina, Taif y Riad con tarifas fijas por vehículo y pago en efectivo al llegar.',
    trustCash: 'Pago en Efectivo al Llegar',
    trustFixed: 'Precio Fijo Por Vehículo',
    trustFlight: 'Rastreo de Vuelos en Vivo',
    allRoutesCount: 'Rutas Oficiales de Chófer VIP',
  },
  de: {
    badge: 'Streckennetz der Heiligen Stätten & Städte',
    title: 'Beliebte Umrah- & VIP-Überlandstrecken',
    subtitle:
      'Private Chauffeurtransfers zwischen Flughafen Dschidda, Mekka, Medina, Taif und Riad zu garantierten Festpreisen pro Fahrzeug und Barzahlung bei Ankunft.',
    trustCash: 'Barzahlung bei Ankunft',
    trustFixed: 'Festpreis Pro Fahrzeug',
    trustFlight: 'Flugüberwachung in Echtzeit',
    allRoutesCount: 'Offizielle Chauffeur-Routen',
  },
  tr: {
    badge: 'Haremeyn & Şehirlerarası Güzergah Ağı',
    title: 'Popüler Umre ve Şehirlerarası VIP Güzergahlar',
    subtitle:
      'Cidde Havalimanı, Mekke, Medine, Taif ve Riyad arasında araç başına sabit fiyatlar ve varışta nakit ödeme ile özel VIP şoförlü transferler.',
    trustCash: 'Varışta Nakit Ödeme',
    trustFixed: 'Araç Başına Sabit Fiyat',
    trustFlight: 'Canlı Uçuş Radarı Takibi',
    allRoutesCount: 'Resmi VIP Güzergahlar',
  },
  hi: {
    badge: 'पवित्र हरमैन व अंतर-शहरी मार्ग नेटवर्क',
    title: 'लोकप्रिय उमराह एवं अंतर-शहरी वीआईपी मार्ग',
    subtitle:
      'जेद्दा हवाई अड्डे, मक्का, मदीना, ताइफ़ और रियाद के बीच प्रति वाहन निश्चित दरों और आगमन पर नकद भुगतान के साथ निजी वीआईपी चौफ़र सेवा।',
    trustCash: 'आगमन पर 100% नकद भुगतान',
    trustFixed: 'प्रति वाहन निश्चित किराया',
    trustFlight: 'लाइव फ्लाइट रडार ट्रैकिंग',
    allRoutesCount: 'आधिकारिक वीआईपी मार्ग',
  },
};

export async function generateMetadata(props: RoutesPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const meta = ROUTES_LOCALIZED_HEADER[locale] || ROUTES_LOCALIZED_HEADER.en;

  return {
    title: `${meta.title} | Duyuf Alrahman VIP`,
    description: meta.subtitle,
    alternates: getLocalizedAlternates(locale, '/routes'),
  };
}

export default async function RoutesPage(props: RoutesPageProps) {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';
  const header = ROUTES_LOCALIZED_HEADER[locale] || ROUTES_LOCALIZED_HEADER.en;
  const initialRates = await getDbPricesCached();
  const settings = getMergedSiteSettings();

  return (
    <div className="bg-[#F7F5F0] min-h-screen text-start text-[#182235]" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* 1. ROYAL LUXURY HERO SECTION */}
      <section className="relative pt-10 sm:pt-14 md:pt-18 pb-8 md:pb-12 border-b border-[#E8E3DA]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#687386] mb-6">
            <Link href={`/${locale}`} className="hover:text-[#101827] transition-colors">
              {dict.nav.home}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-[#C5A15D]" />
            <span className="text-[#101827] font-semibold">{dict.nav.routes}</span>
          </nav>

          {/* Hero Header */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F0] border border-[#C5A15D]/40 text-xs font-bold text-[#8C6D2D] uppercase tracking-wider mb-4 shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-[#C5A15D]" />
              <span>{header.badge}</span>
            </div>

            <h1 className="font-playfair font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-[#101827] font-bold tracking-tight leading-[1.2] mb-4">
              {header.title}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-[#4B5565] font-light leading-relaxed mb-6">
              {header.subtitle}
            </p>

            {/* Quick Trust Pills */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#101827] font-semibold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E3DA] shadow-2xs">
                <Banknote className="w-3.5 h-3.5 text-[#188567]" />
                <span>{header.trustCash}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E3DA] shadow-2xs">
                <Car className="w-3.5 h-3.5 text-[#C5A15D]" />
                <span>{header.trustFixed}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E3DA] shadow-2xs">
                <Plane className="w-3.5 h-3.5 text-[#101827]" />
                <span>{header.trustFlight}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXECUTIVE ROUTE CARDS LIST */}
      <section className="py-10 sm:py-14 md:py-18">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-playfair font-serif text-2xl sm:text-3xl text-[#101827] font-bold">
                {header.allRoutesCount}
              </h2>
              <span className="text-xs text-[#687386]">
                {EXECUTIVE_ROUTES_DATA.length} {isAr ? 'مساراً معتمداً بخدمة خاصة وسائق' : 'Official Private Routes'}
              </span>
            </div>
            <Link
              href={`/${locale}/pricing`}
              className="text-xs font-bold text-[#8C6D2D] hover:underline flex items-center gap-1"
            >
              <span>{dict.nav.pricing}</span>
              <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8 mb-16">
            {EXECUTIVE_ROUTES_DATA.map((route) => (
              <ExecutiveRouteCard key={route.slug} route={route} locale={locale} />
            ))}
          </div>

          {/* 3. MASTER PRICING MATRIX EMBED */}
          <div className="mt-12">
            <PricingTable
              locale={locale}
              dict={dict}
              initialRates={initialRates}
              taifEnabled={settings.taif_enabled !== false}
              riyadhEnabled={settings.riyadh_enabled !== false}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
