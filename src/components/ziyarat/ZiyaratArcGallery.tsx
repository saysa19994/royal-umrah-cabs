'use client';

import {useEffect, useState, useRef, type CSSProperties, type TouchEvent} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft, ArrowRight, ArrowUpRight, MapPin} from 'lucide-react';
import type {Locale} from '@/i18n/config';
import styles from './ZiyaratArcGallery.module.css';
import { ZIYARAT_VISUALS, getZiyaratLicenseUrl } from '@/data/ziyarat-visuals';

/** Direct adaptation of the owner's video 02 and chauffeur prototype arc.
 * Photos are already licensed for this site; tour detail URLs are existing real routes.
 * This component is a photographic guide, not a second booking/price engine. */
const PHOTOS=[
  {id:'hira',key:'cave-hira',tour:'makkah-half-day',city:'makkah'},
  {id:'thawr',key:'jabal-thawr',tour:'makkah-half-day',city:'makkah'},
  {id:'mina',key:'mina',tour:'makkah-half-day',city:'makkah'},
  {id:'arafat',key:'arafat',tour:'makkah-half-day',city:'makkah'},
  {id:'aisha',key:'masjid-aisha',tour:'makkah-half-day',city:'makkah'},
  {id:'quba',key:'masjid-quba',tour:'madinah-half-day',city:'madinah'},
  {id:'uhud',key:'mount-uhud',tour:'madinah-half-day',city:'madinah'},
  {id:'qiblatayn',key:'masjid-qiblatayn',tour:'madinah-half-day',city:'madinah'},
  {id:'seven',key:'seven-mosques',tour:'madinah-half-day',city:'madinah'},
] as const;

interface L {eyebrow:string;title:string;description:string;explore:string;next:string;previous:string;cards:string[];}
const T:Record<Locale,L>={
 ar:{eyebrow:'مشاهد من رحلة الزيارة',title:'معالم لها حكاية.',description:'اكتشف الوجهات التي يمكنك الوصول إليها بسيارة خاصة وسائق، واختر الجولة المناسبة لوقتك وعائلتك.',explore:'اكتشف تفاصيل الجولة',next:'المعلم التالي',previous:'المعلم السابق',cards:["جبل النور وغار حراء","جبل ثور","مشعر منى","عرفات وجبل الرحمة","مسجد السيدة عائشة","مسجد قباء","جبل أحد","مسجد القبلتين","المساجد السبعة"]},
 en:{eyebrow:'THE ZIYARAT JOURNAL',title:'Places with a story.',description:'Discover meaningful destinations you can reach with a private car and driver, then choose the tour for your family.',explore:'Explore this tour',next:'Next destination',previous:'Previous destination',cards:["Jabal al-Noor & Hira","Mount Thawr","Mina Valley","Arafat & Mount Mercy","Masjid Aisha","Quba Mosque","Mount Uhud","Qiblatayn Mosque","Seven Mosques"]},
 ms:{eyebrow:'GALERI ZIARAH',title:'Tempat yang penuh kisah.',description:'Terokai destinasi dengan kereta peribadi dan pemandu serta pilih lawatan untuk keluarga.',explore:'Lihat butiran lawatan',next:'Destinasi seterusnya',previous:'Destinasi sebelumnya',cards:["Jabal al-Nur dan Hira","Bukit Thawr","Lembah Mina","Arafah dan Jabal Rahmah","Masjid Aisyah","Masjid Quba","Bukit Uhud","Masjid Qiblatain","Tujuh Masjid"]},
 id:{eyebrow:'GALERI ZIARAH',title:'Tempat penuh cerita.',description:'Jelajahi destinasi dengan mobil dan pengemudi privat, lalu pilih tur untuk keluarga.',explore:'Lihat detail tur',next:'Tujuan berikutnya',previous:'Tujuan sebelumnya',cards:["Jabal Nur dan Gua Hira","Jabal Tsur","Lembah Mina","Arafah dan Jabal Rahmah","Masjid Aisyah","Masjid Quba","Gunung Uhud","Masjid Qiblatain","Tujuh Masjid"]},
 ur:{eyebrow:'زیارات کی جھلکیاں',title:'تاریخی مقامات اور یادیں۔',description:'نجی گاڑی اور ڈرائیور کے ساتھ مقامات دیکھیں اور خاندان کے لیے مناسب زیارت منتخب کریں۔',explore:'زیارت کی تفصیل دیکھیں',next:'اگلا مقام',previous:'پچھلا مقام',cards:["جبل نور اور غار حرا","جبل ثور","وادی منیٰ","عرفات اور جبل رحمت","مسجد عائشہ","مسجد قباء","جبل اُحد","مسجد قبلتین","سات مساجد"]},
 fr:{eyebrow:'CARNET DE ZIYARAT',title:'Des lieux chargés d’histoire.',description:'Découvrez les lieux accessibles en voiture privée avec chauffeur et choisissez une visite pour votre famille.',explore:'Découvrir cette visite',next:'Lieu suivant',previous:'Lieu précédent',cards:["Mont Nour et grotte de Hira","Mont Thawr","Vallée de Mina","Arafat et mont Rahma","Mosquée Aïcha","Mosquée Quba","Mont Uhud","Mosquée Qiblatayn","Sept Mosquées"]},
 es:{eyebrow:'DIARIO DE ZIYARAT',title:'Lugares con historia.',description:'Descubre destinos en coche privado con conductor y elige una visita para tu familia.',explore:'Explorar esta visita',next:'Siguiente destino',previous:'Destino anterior',cards:["Monte Nur y cueva de Hira","Monte Thawr","Valle de Mina","Arafat y monte Rahma","Mezquita Aisha","Mezquita Quba","Monte Uhud","Mezquita Qiblatayn","Siete Mezquitas"]},
 de:{eyebrow:'ZIYARAT-REISEJOURNAL',title:'Orte voller Geschichte.',description:'Entdecken Sie Ziele mit Privatwagen und Fahrer und wählen Sie eine passende Familienführung ohne Reiseleiter.',explore:'Rundfahrt entdecken',next:'Nächstes Ziel',previous:'Vorheriges Ziel',cards:["Berg Nur und Höhle Hira","Berg Thawr","Tal von Mina","Arafat und Berg Rahma","Aischa-Moschee","Quba-Moschee","Berg Uhud","Qiblatayn-Moschee","Sieben Moscheen"]},
 tr:{eyebrow:'ZİYARET GÜNLÜĞÜ',title:'Hikâyesi olan yerler.',description:'Özel araç ve şoförle ulaşabileceğiniz yerleri keşfedin, aileniz için uygun rotayı seçin.',explore:'Tur ayrıntılarını gör',next:'Sonraki durak',previous:'Önceki durak',cards:["Nur Dağı ve Hira Mağarası","Sevr Dağı","Mina Vadisi","Arafat ve Rahmet Dağı","Âişe Mescidi","Kuba Mescidi","Uhud Dağı","Kıbleteyn Mescidi","Yedi Mescitler"]},
 hi:{eyebrow:'ज़ियारत झलकियाँ',title:'इतिहास से भरे स्थान।',description:'निजी कार और ड्राइवर के साथ घूमने योग्य स्थान देखें और परिवार के लिए यात्रा चुनें।',explore:'यात्रा का विवरण देखें',next:'अगला स्थान',previous:'पिछला स्थान',cards:["जबल नूर और ग़ार हिरा","जबल सौर","मीना घाटी","अरफ़ात और जबल रहमा","मस्जिद आयशा","मस्जिद क़ुबा","उहुद पर्वत","मस्जिद क़िबलतैन","सात मस्जिदें"]},
};

function relativeSlot(index:number,active:number): -2|-1|0|1|2|'hidden'{
  const raw=(index-active+PHOTOS.length)%PHOTOS.length;
  const delta=raw>Math.floor(PHOTOS.length/2)?raw-PHOTOS.length:raw;
  return Math.abs(delta)>2?'hidden':delta as -2|-1|0|1|2;
}
export function ZiyaratArcGallery({locale}:{locale:Locale}){
  const [active,setActive]=useState(0);
  const [failed,setFailed]=useState<Record<string,boolean>>({});
  const [paused,setPaused]=useState(false);
  const [interacted,setInteracted]=useState(false);
  const touchStart=useRef<number|null>(null);
  const labels=T[locale];const rtl=locale==='ar'||locale==='ur';
  const current=PHOTOS[active];
  const currentHref=current.key==='masjid-aisha'
    ? `/${locale}/ziyarat/tours/${current.tour}`
    : `/${locale}/ziyarat/${current.city}/${current.key}`;
  const step=(delta:number)=>{setInteracted(true);setActive(x=>(x+delta+PHOTOS.length)%PHOTOS.length);};
  // Gentle motion as in the supplied film. It stops on focus, hover, touch,
  // manual selection, and for visitors who prefer reduced motion.
  useEffect(()=>{
    if(paused||interacted)return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    if(reduced.matches)return;
    const timer=window.setInterval(()=>{
      if(!document.hidden)setActive(i=>(i+1)%PHOTOS.length);
    },6800);
    return ()=>window.clearInterval(timer);
  },[paused,interacted]);
  const onTouchEnd=(event:TouchEvent<HTMLDivElement>)=>{
    if(touchStart.current===null)return;
    const delta=event.changedTouches[0]?.clientX-touchStart.current;
    touchStart.current=null;
    if(Math.abs(delta)>45)step(delta>0?(rtl?1:-1):(rtl?-1:1));
  };
  return <div className={styles.wrap} dir={rtl?'rtl':'ltr'}>
    <div className={styles.header}>
      <p className={styles.eyebrow}>{labels.eyebrow}</p>
      <h2>{labels.title}</h2>
      <p className={styles.description}>{labels.description}</p>
    </div>
    <div className={styles.stage} role="group" aria-label={labels.title}
      onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}
      onFocusCapture={()=>setPaused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))setPaused(false)}}
      onTouchStart={e=>{touchStart.current=e.touches[0]?.clientX??null;}}
      onTouchEnd={onTouchEnd}>
      {PHOTOS.map((photo,i)=>{
        const slot=relativeSlot(i,active);
        return <button key={photo.id} type="button" className={styles.card}
          data-slot={slot} aria-pressed={i===active}
          onClick={()=>{setInteracted(true);setActive(i);}} aria-label={labels.cards[i]}
          style={{'--card-order':i} as CSSProperties}>
          {!failed[photo.id] ? <Image
            src={ZIYARAT_VISUALS[photo.key].src}
            fill unoptimized
            sizes="(max-width:700px) 62vw, 240px"
            alt={labels.cards[i]}
            className={styles.photo}
            loading={i===0 ? 'eager' : 'lazy'}
            onError={()=>setFailed(prev=>({...prev,[photo.id]:true}))}
          /> : <span className={styles.unavailable} aria-hidden="true">{labels.cards[i]}</span>}
          <span className={styles.cardShade}/>
          <span className={styles.cardTitle}>{labels.cards[i]}</span>
        </button>;
      })}
    </div>
    <div className={styles.controls}>
      <button type="button" className={styles.round} onClick={()=>step(-1)} aria-label={labels.previous}>
        {rtl?<ArrowRight size={18}/>:<ArrowLeft size={18}/>}
      </button>
      <span className={styles.counter} aria-live="polite">{String(active+1).padStart(2,'0')} / {String(PHOTOS.length).padStart(2,'0')}</span>
      <button type="button" className={styles.round} onClick={()=>step(1)} aria-label={labels.next}>
        {rtl?<ArrowLeft size={18}/>:<ArrowRight size={18}/>}
      </button>
      <Link className={styles.details} href={currentHref}>
        <MapPin size={15} aria-hidden="true"/>{labels.explore}<ArrowUpRight size={16} aria-hidden="true"/>
      </Link>
    </div>
    <div className={styles.credit}>
      {!failed[current.id] && <>
        {locale==='ar'?'الصورة: ':'Photo: '}
        <a href={ZIYARAT_VISUALS[current.key].source} target="_blank" rel="noopener noreferrer">{ZIYARAT_VISUALS[current.key].author}</a>
        {' · '}
        <a href={getZiyaratLicenseUrl(ZIYARAT_VISUALS[current.key].license)} target="_blank" rel="noopener noreferrer">{ZIYARAT_VISUALS[current.key].license}</a>
        {' · '}{locale==='ar'?'اقتصاص للعرض':'cropped for display'}
      </>}
    </div>
  </div>;
}
