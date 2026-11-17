'use client';

import {useEffect, useState, useRef, type CSSProperties, type TouchEvent} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft, ArrowRight, ArrowUpRight, MapPin} from 'lucide-react';
import type {Locale} from '@/i18n/config';
import styles from './ZiyaratArcGallery.module.css';

/** Direct adaptation of the owner's video 02 and chauffeur prototype arc.
 * Photos are already licensed for this site; tour detail URLs are existing real routes.
 * This component is a photographic guide, not a second booking/price engine. */
const PHOTOS=[
  {id:'haram',src:'/assets/homepage-v2/ziyarat-haram.jpg',tour:'makkah-half-day',city:'makkah'},
  {id:'aisha',src:'/assets/homepage-v2/ziyarat-masjid-aisha.jpg',tour:'makkah-half-day',city:'makkah'},
  {id:'thawr',src:'/assets/homepage-v2/ziyarat-thawr.jpg',tour:'makkah-half-day',city:'makkah'},
  {id:'madinah',src:'/assets/homepage-v2/service-madinah.jpg',tour:'madinah-half-day',city:'madinah'},
  {id:'madinah-hotel',src:'/assets/homepage-v2/route-madinah-hotel.jpg',tour:'madinah-half-day',city:'madinah'},
] as const;

interface L {eyebrow:string;title:string;description:string;explore:string;next:string;previous:string;cards:[string,string,string,string,string];}
const T:Record<Locale,L>={
 ar:{eyebrow:'مشاهد من رحلة الزيارة',title:'معالم لها حكاية.',description:'اكتشف الوجهات التي يمكنك الوصول إليها بسيارة خاصة وسائق، واختر الجولة المناسبة لوقتك وعائلتك.',explore:'اكتشف تفاصيل الجولة',next:'المعلم التالي',previous:'المعلم السابق',cards:['محيط المسجد الحرام','مسجد السيدة عائشة','جبل ثور','مزارات المدينة المنورة','الانتقال بين معالم المدينة']},
 en:{eyebrow:'THE ZIYARAT JOURNAL',title:'Places with a story.',description:'Discover meaningful destinations you can reach with a private car and driver, then choose the tour for your family.',explore:'Explore this tour',next:'Next destination',previous:'Previous destination',cards:['Grand Mosque surroundings','Masjid Aisha','Mount Thawr','Madinah landmarks','Travel between Madinah sites']},
 ms:{eyebrow:'GALERI ZIARAH',title:'Tempat yang penuh kisah.',description:'Terokai destinasi dengan kereta peribadi dan pemandu serta pilih lawatan untuk keluarga.',explore:'Lihat butiran lawatan',next:'Destinasi seterusnya',previous:'Destinasi sebelumnya',cards:['Sekitar Masjidil Haram','Masjid Aisyah','Jabal Thawr','Tempat bersejarah di Madinah','Perjalanan antara tempat di Madinah']},
 id:{eyebrow:'GALERI ZIARAH',title:'Tempat penuh cerita.',description:'Jelajahi destinasi dengan mobil dan pengemudi privat, lalu pilih tur untuk keluarga.',explore:'Lihat detail tur',next:'Tujuan berikutnya',previous:'Tujuan sebelumnya',cards:['Sekitar Masjidil Haram','Masjid Aisyah','Jabal Tsur','Tempat bersejarah Madinah','Perjalanan antar tempat Madinah']},
 ur:{eyebrow:'زیارات کی جھلکیاں',title:'تاریخی مقامات اور یادیں۔',description:'نجی گاڑی اور ڈرائیور کے ساتھ مقامات دیکھیں اور خاندان کے لیے مناسب زیارت منتخب کریں۔',explore:'زیارت کی تفصیل دیکھیں',next:'اگلا مقام',previous:'پچھلا مقام',cards:['مسجد الحرام کے اطراف','مسجد عائشہ','جبل ثور','مدینہ کے تاریخی مقامات','مدینہ کے مقامات کا سفر']},
 fr:{eyebrow:'CARNET DE ZIYARAT',title:'Des lieux chargés d’histoire.',description:'Découvrez les lieux accessibles en voiture privée avec chauffeur et choisissez une visite pour votre famille.',explore:'Découvrir cette visite',next:'Lieu suivant',previous:'Lieu précédent',cards:['Autour de la Grande Mosquée','Mosquée Aïcha','Mont Thawr','Sites de Médine','Entre les sites de Médine']},
 es:{eyebrow:'DIARIO DE ZIYARAT',title:'Lugares con historia.',description:'Descubre destinos en coche privado con conductor y elige una visita para tu familia.',explore:'Explorar esta visita',next:'Siguiente destino',previous:'Destino anterior',cards:['Alrededores de la Gran Mezquita','Mezquita Aisha','Monte Thawr','Lugares de Medina','Entre los lugares de Medina']},
 de:{eyebrow:'ZIYARAT-REISEJOURNAL',title:'Orte voller Geschichte.',description:'Entdecken Sie Ziele mit Privatwagen und Fahrer und wählen Sie eine passende Familienführung ohne Reiseleiter.',explore:'Rundfahrt entdecken',next:'Nächstes Ziel',previous:'Vorheriges Ziel',cards:['Umgebung der Großen Moschee','Aischa-Moschee','Berg Thawr','Sehenswürdigkeiten in Medina','Zwischen den Orten in Medina']},
 tr:{eyebrow:'ZİYARET GÜNLÜĞÜ',title:'Hikâyesi olan yerler.',description:'Özel araç ve şoförle ulaşabileceğiniz yerleri keşfedin, aileniz için uygun rotayı seçin.',explore:'Tur ayrıntılarını gör',next:'Sonraki durak',previous:'Önceki durak',cards:['Mescid-i Haram çevresi','Hz. Âişe Camii','Sevr Dağı','Medine ziyaret yerleri','Medine içi ulaşım']},
 hi:{eyebrow:'ज़ियारत झलकियाँ',title:'इतिहास से भरे स्थान।',description:'निजी कार और ड्राइवर के साथ घूमने योग्य स्थान देखें और परिवार के लिए यात्रा चुनें।',explore:'यात्रा का विवरण देखें',next:'अगला स्थान',previous:'पिछला स्थान',cards:['मस्जिद अल-हराम के आसपास','मस्जिद आयशा','जबल सौर','मदीना के ऐतिहासिक स्थल','मदीना स्थलों के बीच यात्रा']},
};

function relativeSlot(index:number,active:number): -2|-1|0|1|2{
  const raw=(index-active+PHOTOS.length)%PHOTOS.length;
  return (raw>2?raw-PHOTOS.length:raw) as -2|-1|0|1|2;
}
export function ZiyaratArcGallery({locale}:{locale:Locale}){
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);
  const [interacted,setInteracted]=useState(false);
  const touchStart=useRef<number|null>(null);
  const labels=T[locale];const rtl=locale==='ar'||locale==='ur';
  const current=PHOTOS[active];
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
          <Image src={photo.src} fill sizes="(max-width:700px) 62vw, 240px"
            alt="" className={styles.photo} loading="lazy"/>
          <span className={styles.cardShade}/>
          <span className={styles.cardTitle}>{labels.cards[i]}</span>
        </button>;
      })}
    </div>
    <div className={styles.controls}>
      <button type="button" className={styles.round} onClick={()=>step(-1)} aria-label={labels.previous}>
        {rtl?<ArrowRight size={18}/>:<ArrowLeft size={18}/>}
      </button>
      <span className={styles.counter} aria-live="polite">{String(active+1).padStart(2,'0')} / 05</span>
      <button type="button" className={styles.round} onClick={()=>step(1)} aria-label={labels.next}>
        {rtl?<ArrowLeft size={18}/>:<ArrowRight size={18}/>}
      </button>
      <Link className={styles.details} href={'/'+locale+'/ziyarat/tours/'+current.tour}>
        <MapPin size={15} aria-hidden="true"/>{labels.explore}<ArrowUpRight size={16} aria-hidden="true"/>
      </Link>
    </div>
  </div>;
}
