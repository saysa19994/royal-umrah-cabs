import React from 'react';
import './ziyarat-narrative.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { getPublishedPageCopy } from '@/lib/public-page-copy';
import { ZIYARAT_SITES, ZIYARAT_TOURS, ZIYARAT_GUIDES } from '@/data/ziyarat';
import SacredZiyaratExperience from '@/components/ziyarat/SacredZiyaratExperience';
import {ZiyaratArcGallery} from '@/components/ziyarat/ZiyaratArcGallery';
import ZiyaratPilgrimJournal from '@/components/ziyarat/ZiyaratPilgrimJournal';
import { Spotlight } from '@/components/ui/luxury/Spotlight';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  ArrowRight,
  MessageCircle,
  Star,
  Compass,
  Car,
  ChevronRight,
  Sparkles,
  HelpCircle,
  BadgeCheck,
} from 'lucide-react';

interface ZiyaratHubPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const ZIYARAT_HUB_COPY:Record<Locale,{title:string;description:string;prefix:string;em:string;home:string;bread:string;badge:string;book:string;inquire:string}> = {
 ar:{title:'جولات مزارات مكة والمدينة بسيارة خاصة وسائق',description:'زيارات خاصة للمعالم التاريخية في مكة والمدينة بسيارة وسائق. أسعار ثابتة للمركبة ودفع نقدي للسائق بعد الرحلة.',prefix:'جولات مزارات مكة والمدينة',em:'بسيارة خاصة وسائق',home:'الرئيسية',bread:'المزارات',badge:'رحلات المعالم الإسلامية',book:'اطلب جولة مزارات خاصة',inquire:'استفسار عبر واتساب'},
 en:{title:'Private Ziyarat Tours in Makkah & Madinah with Chauffeur',description:'Explore historic sites in Makkah and Madinah by private car and chauffeur. Fixed vehicle fare; pay the driver in cash after your journey.',prefix:'Private Ziyarat Tours in',em:'Makkah & Madinah',home:'Home',bread:'Ziyarat',badge:'HISTORIC & SACRED SITES',book:'Request a Private Ziyarat Tour',inquire:'WhatsApp Enquiry'},
 ms:{title:'Lawatan Ziarah Peribadi di Makkah & Madinah dengan Pemandu',description:'Lawati tempat bersejarah di Makkah dan Madinah dengan kereta dan pemandu peribadi. Tambang setiap kenderaan; bayar tunai selepas perjalanan.',prefix:'Lawatan Ziarah Peribadi di',em:'Makkah dan Madinah',home:'Utama',bread:'Ziarah',badge:'TEMPAT BERSEJARAH ISLAM',book:'Mohon Lawatan Ziarah',inquire:'Pertanyaan WhatsApp'},
 id:{title:'Tur Ziarah Privat Makkah & Madinah dengan Sopir',description:'Kunjungi situs bersejarah di Makkah dan Madinah dengan mobil dan sopir privat. Tarif tetap per kendaraan, bayar tunai setelah perjalanan.',prefix:'Tur Ziarah Privat di',em:'Makkah dan Madinah',home:'Beranda',bread:'Ziarah',badge:'SITUS SEJARAH ISLAM',book:'Ajukan Tur Ziarah',inquire:'Tanya via WhatsApp'},
 ur:{title:'مکہ اور مدینہ کی نجی زیارات گاڑی اور ڈرائیور کے ساتھ',description:'مکہ اور مدینہ کے تاریخی مقامات کے لیے نجی گاڑی اور ڈرائیور۔ پوری گاڑی کا مقررہ کرایہ اور سفر کے بعد نقد ادائیگی۔',prefix:'مکہ اور مدینہ کی زیارات',em:'نجی گاڑی اور ڈرائیور کے ساتھ',home:'ہوم',bread:'زیارات',badge:'مقدس تاریخی مقامات',book:'نجی زیارت کی درخواست',inquire:'واٹس ایپ پر سوال'},
 fr:{title:'Visites Ziyarat privées à La Mecque et Médine avec chauffeur',description:'Découvrez les sites historiques de La Mecque et Médine en voiture privée avec chauffeur. Prix fixe par véhicule; espèces après le trajet.',prefix:'Visites Ziyarat privées à',em:'La Mecque et Médine',home:'Accueil',bread:'Ziyarat',badge:'PATRIMOINE ISLAMIQUE',book:'Demander une visite privée',inquire:'Question sur WhatsApp'},
 es:{title:'Visitas Ziyarat privadas en La Meca y Medina con conductor',description:'Descubre lugares históricos de La Meca y Medina con coche y conductor privados. Precio fijo por vehículo; pago en efectivo al finalizar.',prefix:'Visitas Ziyarat privadas en',em:'La Meca y Medina',home:'Inicio',bread:'Ziyarat',badge:'PATRIMONIO ISLÁMICO',book:'Solicitar visita privada',inquire:'Consulta por WhatsApp'},
 de:{title:'Private Ziyarat-Besuche in Mekka und Medina mit Chauffeur',description:'Besuchen Sie historische Stätten in Mekka und Medina mit privatem Fahrzeug und Chauffeur. Festpreis pro Fahrzeug; Barzahlung nach der Fahrt.',prefix:'Private Ziyarat-Besuche in',em:'Mekka und Medina',home:'Startseite',bread:'Ziyarat',badge:'ISLAMISCHES KULTURERBE',book:'Private Ziyarat-Fahrt anfragen',inquire:'WhatsApp-Anfrage'},
 tr:{title:'Mekke ve Medine Özel Ziyaret Turları ve Şoförlü Araç',description:'Mekke ve Medine’de tarihi mekânları özel araç ve şoförle ziyaret edin. Araç başına sabit ücret; yolculuk sonrası nakit ödeme.',prefix:'Özel Ziyaret Turları',em:'Mekke ve Medine’de',home:'Ana Sayfa',bread:'Ziyaret',badge:'İSLAMİ TARİHİ MEKÂNLAR',book:'Özel Ziyaret Talep Et',inquire:'WhatsApp ile Sor'},
 hi:{title:'मक्का और मदीना में निजी ज़ियारत यात्रा ड्राइवर के साथ',description:'मक्का और मदीना के ऐतिहासिक स्थलों की निजी कार और ड्राइवर के साथ यात्रा। प्रति वाहन तय किराया; यात्रा के बाद नकद भुगतान।',prefix:'निजी ज़ियारत यात्रा',em:'मक्का और मदीना में',home:'होम',bread:'ज़ियारत',badge:'ऐतिहासिक इस्लामी स्थल',book:'निजी ज़ियारत अनुरोध',inquire:'WhatsApp पर पूछें'},
};

export async function generateMetadata(props: ZiyaratHubPageProps): Promise<Metadata> {
  const {locale}=await props.params;
  const copy=ZIYARAT_HUB_COPY[locale];
  const cms=await getPublishedPageCopy('ziyarat',locale);
  const baseUrl=process.env.NEXT_PUBLIC_SITE_URL||'https://duyufalrahmanvip.com';
  return {
    title: cms.seoTitle || copy.title+' | Duyuf Alrahman VIP',
    description: cms.seoDescription || copy.description,
    alternates:getLocalizedAlternates(locale,'/ziyarat'),
    openGraph:{
      title:cms.seoTitle || copy.title+' | Duyuf Alrahman VIP',
      description:cms.seoDescription || copy.description,
      url:baseUrl+'/'+locale+'/ziyarat',
      siteName:'Duyuf Alrahman VIP',
      type:'website'
    }
  };
}

export default async function ZiyaratHubPage(props: ZiyaratHubPageProps) {
  const params = await props.params;
  const { locale } = params;
  const dict = getDictionary(locale);
  const cms=await getPublishedPageCopy('ziyarat',locale);
  const original=ZIYARAT_HUB_COPY[locale];
  const copy={...original,
    description:typeof cms.contentBlocks.subtitle==='string' && cms.contentBlocks.subtitle.trim()
      ?cms.contentBlocks.subtitle:original.description};
  const isAr = locale === 'ar';
  const isRtl = locale === 'ar' || locale === 'ur';
  const guidesList = Object.values(ZIYARAT_GUIDES);

  const whatsappMessage = isAr
    ? 'السلام عليكم، أود الاستفسار عن حجز سيارة خاصة لجولة المزارات في مكة / المدينة.'
    : 'Hello, I would like to inquire about booking a private chauffeur for Ziyarat in Makkah / Madinah.';
  const whatsappUrl = `https://wa.me/966567588261?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="duyuf-ziyarat-narrative bg-bg min-h-screen text-start text-ink overflow-x-hidden transition-colors duration-200" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* 1. EDITORIAL SACRED PROPHETIC HERO */}
      <section className="duyuf-ziyarat-hero relative w-full pt-16 pb-14 md:pt-24 md:pb-20 overflow-hidden border-b border-border bg-bg transition-colors duration-200">
        <div className="duyuf-ziyarat-hero-grid container mx-auto px-4 max-w-6xl relative z-10">
          <div className="duyuf-ziyarat-hero-copy">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center justify-center gap-2 text-xs text-ink-muted mb-6 flex-wrap"
          >
            <Link href={`/${locale}`} className="hover:text-gold-dark transition-colors">
              {copy.home}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-border rtl:rotate-180" />
            <span className="text-gold-dark font-semibold">
              {copy.bread}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-xs font-bold text-gold-dark uppercase tracking-widest mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5" />
            <span>{copy.badge}</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-tight max-w-4xl mx-auto mb-4">
            {cms.h1 ? cms.h1 : <>{copy.prefix}{' '}<span className="text-gold-dark italic font-serif">{copy.em}</span></>}
          </h1>

          <p className="mt-4 text-ink-muted text-sm md:text-base leading-relaxed font-light max-w-3xl mx-auto mb-8">{copy.description}</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/booking?type=ziyarat&route=makkah-ziyarat`}
              className="h-12 px-8 rounded-xl bg-gold-dark hover:opacity-90 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center gap-2 active:scale-95"
            >
              <Car className="w-4 h-4" />
              <span>{copy.book}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-7 rounded-xl bg-surface hover:bg-bg-alt border border-border text-ink hover:text-gold-dark font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{copy.inquire}</span>
            </a>
          </div>
          </div>
          <div className="duyuf-ziyarat-hero-image duyuf-ziyarat-hero-arc">
            <ZiyaratArcGallery locale={locale} />
          </div>
        </div>
      </section>

      {/* 2. SACRED ZIYARAT LUXURY EXPERIENCE COMPONENT */}
      <div className="duyuf-ziyarat-body container mx-auto px-4 max-w-6xl py-12 md:py-16">
        <SacredZiyaratExperience locale={locale} initialCity="makkah" />

        {/* Editorial reading archive, connected itinerary and transport Q&A */}
        <ZiyaratPilgrimJournal locale={locale} />
      </div>
    </div>
  );
}
