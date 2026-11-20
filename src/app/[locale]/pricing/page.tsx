import React from 'react';
import './pricing-editorial.css';
import styles from './PricingFareLedger.module.css';
import type {Metadata} from 'next';
import Link from 'next/link';
import {Locale,getLocalizedAlternates} from '@/i18n/config';
import {getDictionary} from '@/i18n/get-dictionary';
import {RouteBasedPricingExperience} from '@/components/pricing/RouteBasedPricingExperience';
import {getDbPricesCached} from '@/lib/pricing-db';
import {getMergedSiteSettings} from '@/lib/dynamic-settings-store';
import {PRICING_PAGE_CONTENT} from '@/data/pricing-page-content';
import {getPublishedPageCopy} from '@/lib/public-page-copy';
import {ArrowUpRight,ArrowLeft,ArrowRight,ShieldCheck,ReceiptText} from 'lucide-react';

interface PricingPageProps{params:Promise<{locale:Locale}>}
const TEXT:Record<Locale,{eyebrow:string;label:string;first:string;second:string;included:string;booking:string;closing:string;readRoutes:string;noDeposit:string;operator:string}>={
 ar:{eyebrow:'دليل الأجرة المعتمدة',label:'التسعير الواضح',first:'اختر المسار أولًا.',second:'ثم اختر السيارة المناسبة.',included:'المشمول في السعر',booking:'أكمل طلب الحجز',closing:'سعر واضح. رحلة أهدأ.',readRoutes:'تصفّح جميع المسارات',noDeposit:'السداد نقدًا بعد اكتمال الرحلة',operator:'مكتب رحلات ضيوف الرحمن VIP'},
 en:{eyebrow:'APPROVED FARE DESK',label:'Transparent private fares',first:'Choose the journey.',second:'Then choose your vehicle.',included:'What the fare includes',booking:'Continue your booking request',closing:'Clear fare. Calmer journey.',readRoutes:'Browse every route',noDeposit:'Cash payment after the journey',operator:'Duyuf Al Rahman VIP booking desk'},
 ms:{eyebrow:'DIREKTORI TAMBANG',label:'Tambang persendirian jelas',first:'Pilih perjalanan.',second:'Kemudian pilih kenderaan.',included:'Termasuk dalam tambang',booking:'Teruskan permintaan tempahan',closing:'Tambang jelas, perjalanan tenang.',readRoutes:'Lihat semua laluan',noDeposit:'Bayar tunai selepas perjalanan',operator:'Meja tempahan Duyuf VIP'},
 id:{eyebrow:'DAFTAR TARIF RESMI',label:'Tarif privat transparan',first:'Pilih perjalanan.',second:'Lalu pilih kendaraan.',included:'Termasuk dalam tarif',booking:'Lanjutkan permintaan pemesanan',closing:'Tarif jelas. Perjalanan tenang.',readRoutes:'Lihat semua rute',noDeposit:'Pembayaran tunai setelah perjalanan',operator:'Meja pemesanan Duyuf VIP'},
 ur:{eyebrow:'مقررہ کرایوں کی فہرست',label:'واضح نجی سفر کے کرائے',first:'پہلے راستہ چنیں۔',second:'پھر مناسب گاڑی منتخب کریں۔',included:'کرایے میں شامل',booking:'بکنگ درخواست جاری رکھیں',closing:'واضح کرایہ، پرسکون سفر۔',readRoutes:'تمام راستے دیکھیں',noDeposit:'سفر مکمل ہونے کے بعد نقد ادائیگی',operator:'ضیوف الرحمن بکنگ ڈیسک'},
 fr:{eyebrow:'BARÈME DES TARIFS',label:'Prix privés transparents',first:'Choisissez votre trajet.',second:'Puis votre véhicule.',included:'Ce qui est inclus',booking:'Poursuivre la demande',closing:'Prix clair. Voyage serein.',readRoutes:'Voir les itinéraires',noDeposit:'Espèces après le trajet',operator:'Bureau Duyuf VIP'},
 es:{eyebrow:'TARIFAS APROBADAS',label:'Traslados con precio claro',first:'Elige el trayecto.',second:'Después el vehículo.',included:'Qué incluye el precio',booking:'Continuar solicitud',closing:'Precio claro. Viaje tranquilo.',readRoutes:'Ver todas las rutas',noDeposit:'Efectivo tras el viaje',operator:'Oficina de reservas Duyuf VIP'},
 de:{eyebrow:'OFFIZIELLE PREISE',label:'Transparente Privatpreise',first:'Wählen Sie die Route.',second:'Dann das Fahrzeug.',included:'Im Preis enthalten',booking:'Buchungsanfrage fortsetzen',closing:'Klarer Preis. Ruhige Reise.',readRoutes:'Alle Routen ansehen',noDeposit:'Barzahlung nach der Fahrt',operator:'Duyuf VIP Buchungsbüro'},
 tr:{eyebrow:'ONAYLI ÜCRET REHBERİ',label:'Şeffaf özel transfer ücretleri',first:'Önce rotayı seçin.',second:'Ardından aracı belirleyin.',included:'Ücrete dahil olanlar',booking:'Rezervasyon talebini sürdür',closing:'Net ücret. Huzurlu yolculuk.',readRoutes:'Tüm rotaları gör',noDeposit:'Yolculuk sonrası nakit ödeme',operator:'Duyuf VIP rezervasyon masası'},
 hi:{eyebrow:'मान्य किराया सूची',label:'स्पष्ट निजी यात्रा किराए',first:'पहले मार्ग चुनें।',second:'फिर सही वाहन चुनें।',included:'किराए में शामिल',booking:'बुकिंग अनुरोध जारी रखें',closing:'स्पष्ट किराया। शांत यात्रा।',readRoutes:'सभी मार्ग देखें',noDeposit:'यात्रा के बाद नकद भुगतान',operator:'दुयूफ़ VIP बुकिंग डेस्क'},
};
export async function generateMetadata(props:PricingPageProps):Promise<Metadata>{
 const {locale}=await props.params;
 const content=PRICING_PAGE_CONTENT[locale]||PRICING_PAGE_CONTENT.en;
 const cms=await getPublishedPageCopy('pricing',locale);
 return {title:cms.seoTitle || content.heroTitle+' | Duyuf Alrahman VIP',
  description:cms.seoDescription || content.heroSubtitle,
  alternates:getLocalizedAlternates(locale,'/pricing')};
}
export default async function PricingPage(props:PricingPageProps){
 const {locale}=await props.params;
 const t=TEXT[locale],rtl=locale==='ar'||locale==='ur';
 const dict=getDictionary(locale);
 const baseContent=PRICING_PAGE_CONTENT[locale]||PRICING_PAGE_CONTENT.en;
 const cms=await getPublishedPageCopy('pricing',locale);
 const content={...baseContent,
  heroTitle:cms.h1 || baseContent.heroTitle,
  heroSubtitle:typeof cms.contentBlocks.subtitle==='string' && cms.contentBlocks.subtitle.trim()
    ?cms.contentBlocks.subtitle:baseContent.heroSubtitle};
 const [initialRates,settings]=await Promise.all([getDbPricesCached(),Promise.resolve(getMergedSiteSettings())]);
 const Arrow=rtl?ArrowLeft:ArrowRight;
 const policy=[
  content.features.cashOnArrival,
  content.features.fixedPerVehicle,
  content.features.flightTracking,
  content.features.vipAmenities
 ];
 return <main className={'duyuf-pricing-page '+styles.page} dir={rtl?'rtl':'ltr'}>
  {/* 01 / A purely typographic fare brief, not a huge visual hero or badge forest */}
  <section className={styles.header} aria-labelledby="duyuf-fare-heading">
    <div className={styles.headerTop}>
      <span><ReceiptText size={16} aria-hidden="true"/>{t.eyebrow}</span>
      <span>DUYUF AL RAHMAN VIP / SAR</span>
    </div>
    <div className={styles.headerBody}>
      <div>
       <span className={styles.micro}>01 / {t.label}</span>
       <h1 id="duyuf-fare-heading">{content.heroTitle}</h1>
       <p>{content.heroSubtitle}</p>
      </div>
      <div className={styles.headerAside}>
       <span>FIXED / PER VEHICLE</span>
       <strong>{t.first}<em>{t.second}</em></strong>
       <p><ShieldCheck size={16} aria-hidden="true"/>{dict.booking_card.noPrepayNotice}</p>
      </div>
    </div>
  </section>
  {/* 02 / Keep live source-backed rate lookup with route and vehicle selectors */}
  <section className={'duyuf-pricing-dashboard '+styles.workspace} aria-label={t.label}>
    <div className={styles.workspaceIntro}>
      <span>02 / LIVE FARE EXPLORER</span>
      <p>{t.noDeposit}</p>
    </div>
    <div className={styles.workspaceInner}>
     <RouteBasedPricingExperience locale={locale} dict={dict} initialRates={initialRates}
      taifEnabled={settings.taif_enabled!==false} riyadhEnabled={settings.riyadh_enabled!==false}/>
    </div>
  </section>
  {/* 03 / Straightforward transport policy ledger, not isolated assurance cards */}
  <section className={'duyuf-pricing-principles '+styles.policy} aria-labelledby="fare-inclusions-title">
    <div className={styles.policyHeader}><span>03 / OUR FARE PRINCIPLES</span><h2 id="fare-inclusions-title">{content.whatsIncludedTitle||t.included}</h2>
      <p>{dict.booking_card.noPrepayNotice}</p></div>
    <ol className={styles.policyLines}>
     {policy.map((item,i)=><li key={i}><span>0{i+1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><ShieldCheck size={18} aria-hidden="true"/></li>)}
    </ol>
  </section>
  {/* 04 / No sticky mobile "book" overlay that obscures fields or WhatsApp */}
  <section className={styles.signoff} aria-label={t.closing}>
    <div><span>04 / {t.operator}</span><h2>{t.closing}</h2><p>{dict.booking_card.noPrepayNotice}</p></div>
    <div className={styles.signoffLinks}>
      <Link href={'/'+locale+'/booking'} className={styles.book}>{t.booking}<Arrow size={17} aria-hidden="true"/></Link>
      <Link href={'/'+locale+'/routes'} className={styles.routes}>{t.readRoutes}<ArrowUpRight size={17} aria-hidden="true"/></Link>
    </div>
  </section>
 </main>;
}
