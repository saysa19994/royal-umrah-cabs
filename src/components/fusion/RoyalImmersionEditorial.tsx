'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight, Check, ChevronDown, Plane, Route, Users, ShieldCheck} from 'lucide-react';
import type {Dictionary} from '@/i18n/get-dictionary';
import type {PublicCustomerReview} from '@/types/reviews';
import styles from './RoyalImmersionEditorial.module.css';

type Locale='ar'|'en';
type Props={locale:Locale};
type ConfidenceProps=Props&{dict:Dictionary};
const WORDS={
 ar:{
  processEyebrow:'الخطوات / 01—03',processTitle:'رحلتك، بثلاث خطوات واضحة.',processLead:'من اختيار المسار وحتى الوصول. لا دفع مقدم، ولا إجراءات معقدة.',
  steps:[['01','اختر رحلتك','حدد المسار والتاريخ وعدد المسافرين، ثم اختر المركبة المناسبة.'],['02','أرسل طلب الحجز','راجع تفاصيل الرحلة واترك بيانات التواصل ليتم التنسيق معك.'],['03','سافر وادفع عند الوصول','استمتع بالتنقل الخاص، وادفع نقدًا للسائق بعد اكتمال الرحلة.']],
  servicesEyebrow:'الخدمات / تنقل بمعايير الضيافة',servicesTitle:'ليست مجرد سيارة. إنها بداية رحلة مدروسة.',
  servicesLead:'خدمات نقل خاص للمطارات والرحلات بين المدن والعائلات والمجموعات، مع مسار واضح وسعر معتمد.',
  services:[['استقبال المطار','استقبال منظم مع متابعة الرحلة الجوية ووقت انتظار مجاني وفق السياسة المعتمدة.','/services'],['الرحلات بين المدن','رحلات خاصة بين مكة والمدينة وجدة والطائف والرياض وفق المسارات المتاحة.','/routes'],['العائلات والمجموعات','اختر المركبة المناسبة لعدد المسافرين والحقائب من أسطولنا المعتمد.','/fleet']],
  servicesLink:'استكشف الخدمة',ziEyebrow:'الوجهات / ضيافة قريبة من القلب',ziTitle:'مكة المكرمة والمدينة المنورة.',ziLead:'تنقّلات وزيارات منظمة باحترام لقدسية المكان وراحة ضيوف الرحمن.',
  mecca:'مكة المكرمة',meccaText:'زيارات خاصة وتنقل مريح بين الوجهات المؤهلة في مكة.',medina:'المدينة المنورة',medinaText:'جولات وزيارات خاصة بمواعيد واضحة في المدينة المنورة.',ziLink:'تعرف على الزيارات',
  chauffeurEyebrow:'التجربة / من لحظة وصولك',chauffeurTitle:'أهلًا بك، من أول لحظة.',chauffeurText:'استقبال منظم وتنسيق واضح ومتابعة الرحلات الجوية. عنايتنا بالتفاصيل جزء من رحلتك، وليست إضافة منفصلة.',chauffeurPoints:['ترتيب الاستقبال','متابعة رحلة الطيران','الراحة حتى الوجهة'],
  reviewsEyebrow:'من واقع التجربة',reviewsTitle:'صوت ضيوفنا.',reviewsEmpty:'التقييمات المعتمدة تظهر هنا عند توافرها. يمكنك الاطلاع على صفحة تجارب العملاء مباشرة.',reviewsLink:'شاهد تقييمات العملاء',verified:'حجز تم التحقق منه',published:'تقييم منشور',faqEyebrow:'قبل الانطلاق',faqTitle:'كل ما تريد معرفته.',faqLead:'إجابات واضحة عن الحجز والدفع والاستقبال والإلغاء.',faqLink:'المزيد من الأسئلة'
 },
 en:{
  processEyebrow:'THE PROCESS / 01—03',processTitle:'A seamless journey in three steps.',processLead:'From choosing your route to reaching your destination. No deposit and no complicated checkout.',
  steps:[['01','Choose your journey','Select your route, travel details and the right vehicle for your party.'],['02','Request your reservation','Review your journey and provide your contact details for coordination.'],['03','Travel, then pay','Enjoy your private transfer. Pay your driver in cash after the journey.']],
  servicesEyebrow:'THE SERVICES / THOUGHTFUL TRAVEL',servicesTitle:'More than a transfer. A considered arrival.',
  servicesLead:'Private airport, intercity, family and group transportation with clear journeys and approved fares.',
  services:[['Airport transfers','Organized pickup, flight monitoring and complimentary waiting under the approved policy.','/services'],['Between Saudi cities','Private travel across Makkah, Madinah, Jeddah, Taif and Riyadh on active routes.','/routes'],['Family and group travel','Select the right approved vehicle for the number of guests and luggage.','/fleet']],
  servicesLink:'Explore the service',ziEyebrow:'THE DESTINATIONS / A RESPECTFUL WELCOME',ziTitle:'Makkah and Madinah.',ziLead:'Thoughtfully coordinated journeys and visits with respect for sacred destinations.',
  mecca:'Makkah Al Mukarramah',meccaText:'Private visits and comfortable transport on eligible Makkah routes.',medina:'Madinah Al Munawwarah',medinaText:'Coordinated private visits and journey planning in Madinah.',ziLink:'Explore Ziyarat',
  chauffeurEyebrow:'THE EXPERIENCE / FROM ARRIVAL',chauffeurTitle:'A welcome that feels personal.',chauffeurText:'An organized pickup, clear communication and flight monitoring. Considered details are an essential part of the journey.',chauffeurPoints:['Organized pickup','Flight monitoring','Comfort to destination'],
  reviewsEyebrow:'REAL GUEST EXPERIENCES',reviewsTitle:'In our guests’ words.',reviewsEmpty:'Published customer reviews will appear here when available. Visit the customer experiences page for the latest.',reviewsLink:'Read guest reviews',verified:'Verified booking',published:'Published review',faqEyebrow:'GOOD TO KNOW',faqTitle:'Everything before you travel.',faqLead:'Clear answers about booking, payment, airport pickup and cancellation.',faqLink:'All FAQs'
 }
} as const;

export function RoyalBookingSteps({locale}:Props){
 const t=WORDS[locale];
 return <section className={styles.process} aria-labelledby="royal-process-title">
  <div className={styles.processHead}>
   <div><span className={styles.kicker}>{t.processEyebrow}</span><h2 id="royal-process-title">{t.processTitle}</h2></div>
   <p>{t.processLead}</p>
  </div>
  <ol className={styles.processSteps}>{t.steps.map(step=><li key={step[0]}><span>{step[0]}</span><h3>{step[1]}</h3><p>{step[2]}</p></li>)}</ol>
 </section>;
}

export function RoyalServiceChapters({locale}:Props){
 const t=WORDS[locale];
 return <>
  <section className={styles.services} id="royal-services" aria-labelledby="royal-services-title">
   <div className={styles.servicesPhoto}>
    <Image src="/assets/homepage-v2/service-intercity.jpg" fill sizes="(max-width:760px) 100vw, 48vw" alt={locale==='ar'?'رحلة نقل خاص بين مدن المملكة':'Private intercity transfer in Saudi Arabia'} />
    <span>THE JOURNEY / DUYUF VIP</span>
   </div>
   <div className={styles.servicesBody}>
    <span className={styles.kicker}>{t.servicesEyebrow}</span>
    <h2 id="royal-services-title">{t.servicesTitle}</h2><p className={styles.intro}>{t.servicesLead}</p>
    <div className={styles.serviceRows}>{t.services.map((service,i)=><div className={styles.serviceRow} key={service[0]}>
      <span>0{i+1}</span><div><h3>{service[0]}</h3><p>{service[1]}</p></div>
      <Link href={'/'+locale+service[2]} aria-label={t.servicesLink+': '+service[0]}><ArrowUpRight size={21}/></Link>
    </div>)}</div>
   </div>
  </section>
  <section className={styles.ziyarat} id="royal-ziyarat" aria-labelledby="royal-ziyarat-title">
   <div className={styles.ziHead}><span className={styles.kicker}>{t.ziEyebrow}</span><h2 id="royal-ziyarat-title">{t.ziTitle}</h2><p>{t.ziLead}</p></div>
   <div className={styles.ziGrid}>
    <Link href={'/'+locale+'/ziyarat'} className={styles.ziOne}>
      <Image src="/assets/homepage-v2/ziyarat-haram.jpg" fill sizes="(max-width:720px) 100vw, 50vw" alt={t.mecca}/>
      <span className={styles.ziShade}/><div><small>01 / MAKKAH</small><h3>{t.mecca}</h3><p>{t.meccaText}</p><strong>{t.ziLink}<ArrowUpRight size={18}/></strong></div>
    </Link>
    <Link href={'/'+locale+'/ziyarat'} className={styles.ziTwo}>
      <Image src="/assets/homepage-v2/service-madinah.jpg" fill sizes="(max-width:720px) 100vw, 50vw" alt={t.medina}/>
      <span className={styles.ziShade}/><div><small>02 / MADINAH</small><h3>{t.medina}</h3><p>{t.medinaText}</p><strong>{t.ziLink}<ArrowUpRight size={18}/></strong></div>
    </Link>
   </div>
  </section>
  <section className={styles.chauffeur} aria-labelledby="royal-chauffeur-title">
   <div className={styles.chauffeurPhoto}><Image src="/assets/homepage-v2/chauffeur-welcome.jpg" fill sizes="(max-width:760px) 100vw, 53vw" alt={locale==='ar'?'خدمة استقبال العملاء':'Private chauffeur welcome'}/></div>
   <div className={styles.chauffeurWords}><span className={styles.kicker}>{t.chauffeurEyebrow}</span><h2 id="royal-chauffeur-title">{t.chauffeurTitle}</h2><p>{t.chauffeurText}</p><ul>{t.chauffeurPoints.map(point=><li key={point}><Check size={17}/>{point}</li>)}</ul><Link href={'/'+locale+'/booking'}>{locale==='ar'?'ابدأ طلب الحجز':'Request your private ride'}<ArrowUpRight size={18}/></Link></div>
  </section>
 </>;
}

function RealGuestQuote({locale}:Props){
 const t=WORDS[locale];
 const [review,setReview]=useState<PublicCustomerReview|null>(null);
 useEffect(()=>{
  let active=true;
  const controller=new AbortController();
  fetch('/api/reviews?limit=6&sort=newest',{signal:controller.signal})
   .then(r=>r.ok?r.json():Promise.reject(new Error('Reviews unavailable')))
   .then(data=>{
    if(active&&data.success&&Array.isArray(data.reviews)&&data.reviews.length){
      const chosen=data.reviews.find((r:PublicCustomerReview)=>r.language===locale)||data.reviews[0];
      setReview(chosen);
    }
   }).catch(()=>{ /* Keep the honest empty state; never invent reviews. */ });
  return ()=>{active=false;controller.abort();};
 },[locale]);
 return <div className={styles.reviewQuote}>
  {review?<>
    <span className={styles.reviewStars} aria-label={review.rating+' / 5'}>{'★'.repeat(Math.max(0,Math.min(5,Math.floor(review.rating))))}</span>
    <blockquote dir={review.language==='ar'||review.language==='ur'?'rtl':'auto'}>“{review.comment}”</blockquote>
    <div className={styles.reviewSource}><strong>{review.customer_name}</strong><span>{review.is_verified_booking?t.verified:t.published}</span></div>
  </>:<p className={styles.reviewEmpty}>{t.reviewsEmpty}</p>}
  <Link href={'/'+locale+'/reviews'}>{t.reviewsLink}<ArrowUpRight size={18}/></Link>
 </div>;
}

export function RoyalGuestConfidence({locale,dict}:ConfidenceProps){
 const t=WORDS[locale];
 const [open,setOpen]=useState<number|null>(0);
 const questions=[2,3,5,9,10,11].map(n=>({
  question:dict.faq[('q'+n) as keyof typeof dict.faq],
  answer:dict.faq[('a'+n) as keyof typeof dict.faq]
 })).filter(x=>typeof x.question==='string'&&typeof x.answer==='string');
 return <>
  <section className={styles.reviews} aria-labelledby="royal-reviews-title">
   <div className={styles.reviewHead}><span className={styles.kicker}>{t.reviewsEyebrow}</span><h2 id="royal-reviews-title">{t.reviewsTitle}</h2><div className={styles.reviewMark} aria-hidden="true">“</div></div>
   <RealGuestQuote locale={locale}/>
  </section>
  <section className={styles.faq} id="royal-faq" aria-labelledby="royal-faq-title">
   <div className={styles.faqIntro}><span className={styles.kicker}>{t.faqEyebrow}</span><h2 id="royal-faq-title">{t.faqTitle}</h2><p>{t.faqLead}</p><div className={styles.faqPhoto}><Image src="/assets/homepage-v2/vehicle-interior-cta.jpg" fill alt="" sizes="(max-width:800px) 100vw, 33vw"/></div></div>
   <div className={styles.faqList}>{questions.map((item,i)=><div className={styles.faqItem} key={i}>
    <h3><button type="button" aria-expanded={open===i} aria-controls={'royal-faq-answer-'+i} onClick={()=>setOpen(open===i?null:i)}><span>{String(i+1).padStart(2,'0')}</span><strong>{item.question}</strong><ChevronDown size={19}/></button></h3>
    <div id={'royal-faq-answer-'+i} hidden={open!==i}><p>{item.answer}</p></div>
   </div>)}<Link href={'/'+locale+'/faq'} className={styles.faqMore}>{t.faqLink}<ArrowUpRight size={17}/></Link></div>
  </section>
 </>;
}
