'use client';

import {useEffect,useMemo,useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {ArrowLeft,ArrowRight,ArrowUpRight,CalendarDays,CarFront,Check,ChevronDown,Clock3,Compass,Luggage,MapPin,Plane,ShieldCheck,Users,Wallet} from 'lucide-react';
import {APPROVED_5_FLEET} from '@/data/approved-fleet-homepage';
import type {TransferRatesMap} from '@/lib/pricing-db';
import type {Dictionary} from '@/i18n/get-dictionary';
import {RoyalBookingSteps,RoyalServiceChapters,RoyalGuestConfidence} from './RoyalImmersionEditorial';
import styles from './SignatureFusionHomepage.module.css';
import {RoyalCabinChapter} from '@/components/royal/RoyalCabinChapter';

type Lang='ar'|'en';
type Props={locale:Lang;rates:TransferRatesMap;dict:Dictionary};
const FARE_KEY:Record<string,string>={
 'toyota-camry':'camry','hyundai-staria':'staria','gmc-yukon-xl':'yukon','toyota-hiace':'hiace','toyota-coaster':'coaster'
};
const ROUTES=[
 {id:'jeddah-airport-to-makkah',ar:'مطار جدة ← مكة المكرمة',en:'Jeddah Airport → Makkah',image:'/assets/homepage-v2/route-jeddah-makkah.jpg',code:'JED / MKK'},
 {id:'makkah-to-madinah',ar:'مكة المكرمة ← المدينة',en:'Makkah → Madinah',image:'/assets/homepage-v2/route-makkah-madinah.jpg',code:'MKK / MED'},
 {id:'madinah-airport-to-hotel',ar:'مطار المدينة ← الفندق',en:'Madinah Airport → Hotel',image:'/assets/homepage-v2/route-madinah-hotel.jpg',code:'MED / HOTEL'},
 {id:'jeddah-to-madinah',ar:'جدة ← المدينة المنورة',en:'Jeddah → Madinah',image:'/assets/images/routes/jeddah-to-madinah.jpg',code:'JED / MED'},
 {id:'jeddah-airport-to-madinah',ar:'مطار جدة ← المدينة المنورة',en:'Jeddah Airport → Madinah',image:'/assets/images/routes/jeddah-to-madinah.jpg',code:'JED / MED'},
 {id:'makkah-to-taif',ar:'مكة المكرمة ← الطائف',en:'Makkah → Taif',image:'/assets/images/routes/makkah-to-taif.jpg',code:'MKK / TIF'},
 {id:'makkah-ziyarat',ar:'مزارات مكة المكرمة',en:'Makkah Ziyarat',image:'/assets/homepage-v2/ziyarat-haram.jpg',code:'MAKKAH / VISITS'},
 {id:'madinah-ziyarat',ar:'مزارات المدينة المنورة',en:'Madinah Ziyarat',image:'/assets/homepage-v2/route-madinah-hotel.jpg',code:'MADINAH / VISITS'},
 {id:'jeddah-to-taif',ar:'جدة ← الطائف',en:'Jeddah → Taif',image:'/assets/homepage-v2/route-jeddah-makkah.jpg',code:'JED / TIF'},
 {id:'riyadh-to-makkah',ar:'الرياض ← مكة المكرمة',en:'Riyadh → Makkah',image:'/assets/images/routes/riyadh-to-makkah.jpg',code:'RUH / MKK'},
 {id:'riyadh-to-madinah',ar:'الرياض ← المدينة المنورة',en:'Riyadh → Madinah',image:'/assets/homepage-v2/service-intercity.jpg',code:'RUH / MED'}
] as const;
const ROUTE_PAIRS=[
 {id:'jeddah-airport-to-makkah',from:'jed-airport',arFrom:'مطار جدة',enFrom:'Jeddah Airport',arTo:'مكة المكرمة',enTo:'Makkah'},
 {id:'jeddah-airport-to-madinah',from:'jed-airport',arFrom:'مطار جدة',enFrom:'Jeddah Airport',arTo:'المدينة المنورة',enTo:'Madinah'},
 {id:'jeddah-to-madinah',from:'jeddah',arFrom:'جدة',enFrom:'Jeddah',arTo:'المدينة المنورة',enTo:'Madinah'},
 {id:'jeddah-to-taif',from:'jeddah',arFrom:'جدة',enFrom:'Jeddah',arTo:'الطائف',enTo:'Taif'},
 {id:'makkah-to-madinah',from:'makkah',arFrom:'مكة المكرمة',enFrom:'Makkah',arTo:'المدينة المنورة',enTo:'Madinah'},
 {id:'makkah-to-taif',from:'makkah',arFrom:'مكة المكرمة',enFrom:'Makkah',arTo:'الطائف',enTo:'Taif'},
 {id:'makkah-ziyarat',from:'makkah',arFrom:'مكة المكرمة',enFrom:'Makkah',arTo:'مزارات مكة',enTo:'Makkah Ziyarat'},
 {id:'madinah-airport-to-hotel',from:'med-airport',arFrom:'مطار المدينة',enFrom:'Madinah Airport',arTo:'فنادق المدينة',enTo:'Madinah hotels'},
 {id:'madinah-ziyarat',from:'madinah',arFrom:'المدينة المنورة',enFrom:'Madinah',arTo:'مزارات المدينة',enTo:'Madinah Ziyarat'},
 {id:'riyadh-to-makkah',from:'riyadh',arFrom:'الرياض',enFrom:'Riyadh',arTo:'مكة المكرمة',enTo:'Makkah'},
 {id:'riyadh-to-madinah',from:'riyadh',arFrom:'الرياض',enFrom:'Riyadh',arTo:'المدينة المنورة',enTo:'Madinah'}
] as const;
const ROUTE_STARTS=Array.from(new Map(ROUTE_PAIRS.map(r=>[r.from,r])).values());

const COPY={
 ar:{
  top:'تصور تصميمي معتمد للمراجعة فقط · بيئة Preview',viewEn:'EN',navFleet:'الأسطول',navRoutes:'الرحلات',navBooking:'طلب حجز',label:'ضيافة سعودية بمعايير عالمية',hero1:'رحلتك تستحق',hero2:'عناية استثنائية.',heroDesc:'من لحظة الوصول إلى الوجهة الأخيرة. سيارة خاصة، وسائق محترف، ورحلة صُممت لتمنح ضيوف الرحمن الراحة والطمأنينة.',heroCta:'احجز رحلتك الخاصة',heroAlt:'شاهد تجربة الرحلة',from:'SAUDI ARABIA',to:'YOUR JOURNEY, OUR PRIORITY',bookEyebrow:'01 / ابدأ من هنا',bookTitle:'إلى أين نرافقك؟',route:'اختر مسار الرحلة',date:'تاريخ السفر',time:'الوقت',people:'الركاب',car:'المركبة',continue:'تابع طلب الحجز',fare:'السعر الإجمالي للمركبة',unavailable:'السعر غير متاح لهذا المسار',tooMany:'عدد الركاب يتجاوز سعة السيارة',noPayment:'بدون دفعة مقدمة · الدفع نقدًا للسائق بعد اكتمال الرحلة',trust1:'الضريبة والرسوم مشمولة',trust2:'مراقبة الرحلات الجوية',trust3:'خدمة 24 ساعة',chapter:'02 / فلسفة الخدمة',chapterTitle:'تفاصيل صغيرة. رحلة مختلفة.',chapterIntro:'تجربة الضيافة لا تبدأ من مقعد السيارة؛ تبدأ من وضوح التفاصيل، وسهولة الاستقبال، والثقة في كل خطوة.',arrival:'الاستقبال',arrivalDesc:'نرتّب لحظة وصولك ونراقب الرحلات الجوية، لتبدأ تجربتك بوضوح وراحة.',comfort:'الراحة',comfortDesc:'مركبة خاصة تناسب عدد المسافرين وحقائبهم، مع اهتمام بتجربة الطريق.',destination:'الوصول',destinationDesc:'تنقل منظم إلى فندقك أو وجهتك، دون دفع مقدم أو خطوات دفع معقدة.',fleetEye:'03 / الأسطول المختار',fleetTitle:'سيارتك. مساحتك. اختيارك.',fleetDesc:'بدل شبكة بطاقات متكررة، استكشف كل مركبة في مساحة عرض واحدة. صور خارجية وداخلية من أصول المشروع.',outside:'من الخارج',inside:'المقصورة',seats:'الركاب',bags:'الحقائب',selectCar:'اختيار هذه السيارة',fleetDetails:'تفاصيل المركبة',allFleet:'شاهد الأسطول الكامل',routesEye:'04 / دليل الرحلات',routesTitle:'الوجهة تتغيّر. العناية ثابتة.',routesDesc:'اختر أحد المسارات المتاحة؛ يظهر سعر المركبة المحددة للمسار نفسه، وليس سعرًا عامًا مضللًا.',chooseRoute:'اختر مسارًا',included:'يشمل الضريبة والوقود ورسوم الطرق ومواقف المطار',routeBook:'استكمل هذا المسار',allRoutes:'جميع المسارات',promiseEye:'05 / قبل رحلتك',promiseTitle:'وضوح قبل الوصول.',airportWait:'انتظار مجاني بالمطار لمدة 60 دقيقة',miqat:'توقف بالميقات 30–45 دقيقة للمسارات المؤهلة',cancel:'إلغاء مجاني قبل موعد الرحلة بـ24 ساعة',children:'مقاعد أطفال متاحة عند الطلب',concierge:'مايباخ وH1 عبر الكونسيرج بالتنسيق المسبق فقط',endEye:'THE JOURNEY / DUYUF VIP',endTitle:'أول خطوة في رحلتك تبدأ من هنا.',endCta:'جهّز طلب الحجز',payNotice:'السداد نقدًا بعد الرحلة بالريال أو الدولار · لا دفع إلكتروني أو عربون',review:'عرض البيانات قبل المتابعة',previewNote:'صفحة تجريبية؛ يتم إتمام الطلب في نظام الحجز الفعلي.',required:'اختَر مركبة متاحة قبل المتابعة'
 },
 en:{
  top:'Design approval preview · Not the production website',viewEn:'عربي',navFleet:'The fleet',navRoutes:'Journeys',navBooking:'Reservation',label:'CONSIDERED SAUDI HOSPITALITY',hero1:'Your Journey,',hero2:'Our Priority.',heroDesc:'From your first arrival to the last destination. A private vehicle, an attentive chauffeur and a journey designed around your comfort.',heroCta:'Book Your Private Ride',heroAlt:'Explore the experience',from:'SAUDI ARABIA',to:'YOUR JOURNEY, OUR PRIORITY',bookEyebrow:'01 / START YOUR JOURNEY',bookTitle:'Where may we take you?',route:'Journey route',date:'Travel date',time:'Pickup time',people:'Travelers',car:'Vehicle',continue:'Continue booking request',fare:'Vehicle fare for this route',unavailable:'Not available on this route',tooMany:'Vehicle capacity is too small',noPayment:'No advance payment · Cash to the driver after the completed journey',trust1:'VAT and fees included',trust2:'Flight monitoring',trust3:'24/7 service',chapter:'02 / OUR APPROACH',chapterTitle:'Every detail. Thoughtfully considered.',chapterIntro:'Hospitality begins long before you step into your vehicle: clarity, personal care and confidence in each part of the journey.',arrival:'Arrival',arrivalDesc:'A planned welcome with flight monitoring to ease your arrival.',comfort:'Comfort',comfortDesc:'Your own vehicle, selected for your guests and luggage.',destination:'Destination',destinationDesc:'A private transfer to your hotel or destination without deposits or complex payment steps.',fleetEye:'03 / THE PRIVATE COLLECTION',fleetTitle:'Your vehicle. Your space.',fleetDesc:'One focused vehicle showroom, not a repeating grid of cards. Explore genuine fleet exterior and interior imagery.',outside:'Exterior',inside:'Interior',seats:'Travelers',bags:'Bags',selectCar:'Choose this vehicle',fleetDetails:'Vehicle details',allFleet:'Explore the full fleet',routesEye:'04 / JOURNEYS',routesTitle:'Different destinations. The same care.',routesDesc:'See a route-specific vehicle fare, rather than a vague starting price.',chooseRoute:'Select a route',included:'VAT, fuel, tolls and airport parking included',routeBook:'Continue this journey',allRoutes:'All routes',promiseEye:'05 / BEFORE YOU ARRIVE',promiseTitle:'A clear promise.',airportWait:'60 minutes complimentary airport waiting',miqat:'30–45 minute complimentary Miqat stop on eligible routes',cancel:'Free cancellation at least 24 hours ahead',children:'Child seats available on request',concierge:'Maybach and H1 by advance concierge enquiry only',endEye:'THE JOURNEY / DUYUF VIP',endTitle:'A remarkable journey starts here.',endCta:'Prepare your reservation',payNotice:'Cash after journey in SAR or USD · No electronic checkout or deposit',review:'Review your selection',previewNote:'This design preview hands off to the existing real booking system.',required:'Choose an available vehicle to continue'
 }
} as const;
const FULL_ARROW=<ArrowUpRight size={17} aria-hidden="true"/>;
export default function SignatureFusionHomepage({locale,rates,dict}:Props){
 const c=COPY[locale],rtl=locale==='ar',router=useRouter();
 const [route,setRoute]=useState<string>(ROUTES[0].id);
 const [carIndex,setCarIndex]=useState(1);
 const [travelDate,setTravelDate]=useState('');
 const [travelTime,setTravelTime]=useState('');
 const [guests,setGuests]=useState(2);
 const [inside,setInside]=useState(false);
 const [chapter,setChapter]=useState(0);
 const [faq,setFaq]=useState<number|null>(null);
 const [minDate,setMinDate]=useState('');
 const fleet=APPROVED_5_FLEET;
 const car=fleet[carIndex];
 const journey=ROUTES.find(r=>r.id===route)||ROUTES[0];
 const currentPair=ROUTE_PAIRS.find(x=>x.id===route)||ROUTE_PAIRS[0];
 const availableDestinations=ROUTE_PAIRS.filter(x=>x.from===currentPair.from);
 const fare=rates[route]?.[FARE_KEY[car.slug]];
 const validFare=typeof fare==='number'&&Number.isFinite(fare)&&fare>0;
 const eligible=validFare&&guests<=car.passengers;
 const fm=(n:number)=>new Intl.NumberFormat('en-US').format(n);
 const href=useMemo(()=>{
  if(!eligible)return '';
  const args=new URLSearchParams({
   route,vehicle:car.bookingParam,passengers:String(guests),
   type:route.includes('ziyarat')?'ziyarat':'transfer',
   ...(travelDate?{date:travelDate}:{}),...(travelTime?{time:travelTime}:{})
  });
  return '/'+locale+'/booking?'+args.toString();
 },[locale,route,car.bookingParam,guests,travelDate,travelTime,eligible]);
 useEffect(()=>{
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Riyadh',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const part=(k:string)=>parts.find(x=>x.type===k)?.value||'';
  setMinDate(part('year')+'-'+part('month')+'-'+part('day'));
 },[]);
 function changeRoute(value:string){
  setRoute(value);
  if(typeof rates[value]?.[FARE_KEY[car.slug]]!=='number'){
   const available=fleet.findIndex(v=>typeof rates[value]?.[FARE_KEY[v.slug]]==='number'&&v.passengers>=guests);
   if(available>=0){setCarIndex(available);setInside(false);}
  }
 }
 function book(){
  if(href)router.push(href);
 }
 const scenes=[
  {title:c.arrival,desc:c.arrivalDesc,img:'/assets/homepage-v2/chauffeur-welcome.jpg'},
  {title:c.comfort,desc:c.comfortDesc,img:'/assets/homepage-v2/vehicle-interior-cta.jpg'},
  {title:c.destination,desc:c.destinationDesc,img:'/assets/homepage-v2/route-madinah-hotel.jpg'}
 ];
 const facts=[c.airportWait,c.miqat,c.cancel,c.children,c.concierge];
 return <div className={styles.page} dir={rtl?'rtl':'ltr'} data-signature-fusion="true">
  <div className={styles.hero} id="fusion-top">
   <div className={styles.heroCopy}>
    <div className={styles.heroTag}><span className={styles.heroDot}/> {c.label}</div>
    <h1>{c.hero1}<em>{c.hero2}</em></h1>
    <p>{c.heroDesc}</p>
    <div className={styles.heroButtons}><a className={styles.primary} href="#fusion-book">{c.heroCta}<ArrowLeft size={19}/></a><a className={styles.underLink} href="#fusion-story">{c.heroAlt}{FULL_ARROW}</a></div>
    <div className={styles.heroFoot}><span>01 / 05</span><span>{c.from}</span></div>
   </div>
   <div className={styles.heroVideo}>
    <video autoPlay muted loop playsInline preload="metadata" poster="/assets/homepage-v2/hero-poster.jpg" aria-hidden="true" tabIndex={-1}>
      <source media="(max-width: 700px)" src="/assets/homepage-v2/hero-mobile.mp4" type="video/mp4"/>
      <source src="/assets/homepage-v2/hero.mp4" type="video/mp4"/>
    </video>
    <div className={styles.videoTag}><span>THE ARRIVAL FILM</span><span>{c.to}</span></div>
   </div>
  </div>
  <section className={styles.bookingArea} id="fusion-book" aria-labelledby="fusion-book-title">
   <div className={styles.bookingHead}><div><span className={styles.serial}>{c.bookEyebrow}</span><h2 id="fusion-book-title">{c.bookTitle}</h2></div><p><ShieldCheck size={17}/>{c.noPayment}</p></div>
   <div className={styles.bookingDesk}>
    <label className={styles.routeField}><span><MapPin size={16}/>{locale==='ar'?'نقطة الانطلاق':'Pickup location'}</span><select value={currentPair.from} onChange={e=>{const first=ROUTE_PAIRS.find(x=>x.from===e.target.value);if(first)changeRoute(first.id)}}>{ROUTE_STARTS.map(x=><option key={x.from} value={x.from}>{locale==='ar'?x.arFrom:x.enFrom}</option>)}</select></label>
    <label className={styles.destinationField}><span><MapPin size={16}/>{locale==='ar'?'الوجهة':'Destination'}</span><select value={route} onChange={e=>changeRoute(e.target.value)}>{availableDestinations.map(x=><option key={x.id} value={x.id}>{locale==='ar'?x.arTo:x.enTo}</option>)}</select></label>
    <label><span><CalendarDays size={16}/>{c.date}</span><input type="date" min={minDate||undefined} value={travelDate} onChange={e=>setTravelDate(e.target.value)}/></label>
    <label><span><Clock3 size={16}/>{c.time}</span><input type="time" value={travelTime} onChange={e=>setTravelTime(e.target.value)}/></label>
    <label><span><Users size={16}/>{c.people}</span><select value={guests} onChange={e=>setGuests(Number(e.target.value))}>{Array.from({length:21},(_,i)=>i+1).map(n=><option value={n} key={n}>{n}</option>)}</select></label>
   </div>
   <div className={styles.bookingLower}>
     <div className={styles.bookCarList} role="group" aria-label={c.car}>{fleet.map((v,i)=><button key={v.id} type="button" aria-pressed={carIndex===i} disabled={!(typeof rates[route]?.[FARE_KEY[v.slug]]==='number')||guests>v.passengers} onClick={()=>{setCarIndex(i);setInside(false)}}>{v.name[locale]||v.name.en}</button>)}</div>
     <div className={styles.bookingTotal}><div><small>{c.fare}</small><strong>{eligible?fm(fare as number):'—'} <span>SAR</span></strong>{!eligible&&<small className={styles.warn}>{validFare?c.tooMany:c.unavailable}</small>}</div><button type="button" disabled={!href} onClick={book}>{c.continue}<ArrowLeft size={18}/></button></div>
   </div>
   <p className={styles.bookFine}><Check size={15}/>{c.included}</p>
  </section>
  <section className={styles.trustLine} aria-label={c.promiseTitle}><div><ShieldCheck size={17}/>{c.trust1}</div><div><Plane size={17}/>{c.trust2}</div><div><Clock3 size={17}/>{c.trust3}</div></section>
  <RoyalBookingSteps locale={locale}/>
  <section id="fusion-story" className={styles.story} aria-labelledby="fusion-story-title">
    <div className={styles.storyIntro}><span className={styles.serial}>{c.chapter}</span><h2 id="fusion-story-title">{c.chapterTitle}</h2><p>{c.chapterIntro}</p></div>
    <div className={styles.storyImage}><Image src={scenes[chapter].img} alt={scenes[chapter].title} fill sizes="(max-width:760px) 100vw, 53vw" className={styles.cover}/><span>0{chapter+1} / 03</span></div>
    <div className={styles.storyRail}>{scenes.map((s,i)=><button type="button" key={s.title} aria-pressed={chapter===i} onClick={()=>setChapter(i)}><small>0{i+1}</small><strong>{s.title}</strong><ChevronDown size={17}/>{chapter===i&&<p>{s.desc}</p>}</button>)}</div>
  </section>
  <section className={styles.showroom} id="fusion-fleet" aria-labelledby="fusion-fleet-title">
    <div className={styles.showroomHeading}><span className={styles.serial}>{c.fleetEye}</span><h2 id="fusion-fleet-title">{c.fleetTitle}</h2><p>{c.fleetDesc}</p></div>
    <div className={styles.showroomLayout}>
     <div className={styles.carRail}>{fleet.map((v,i)=><button key={v.id} type="button" aria-pressed={i===carIndex} onClick={()=>{setCarIndex(i);setInside(false)}}><span>0{i+1}</span><strong>{v.name[locale]||v.name.en}</strong></button>)}</div>
     <div className={styles.carPhoto}><Image key={car.id+(inside?'inside':'outside')} src={inside?car.interiorImage:car.exteriorImage} alt={(car.name[locale]||car.name.en)+' — '+(inside?c.inside:c.outside)} fill sizes="(max-width:820px) 100vw, 50vw" className={inside?styles.carInterior:styles.carExterior}/><span className={styles.photoSerial}>0{carIndex+1} / 05</span><div className={styles.photoToggle}><button type="button" aria-pressed={!inside} onClick={()=>setInside(false)}>{c.outside}</button><button type="button" aria-pressed={inside} onClick={()=>setInside(true)}>{c.inside}</button></div></div>
     <div className={styles.carDetail}><span className={styles.eyebrow}>{car.categoryBadge[locale]||car.categoryBadge.en}</span><h3>{car.name[locale]||car.name.en}</h3><p>{car.summary[locale]||car.summary.en}</p><div className={styles.statLine}><span><Users size={16}/>{car.passengers} {c.seats}</span><span><Luggage size={16}/>{car.luggage} {c.bags}</span></div><div className={styles.carFare}><small>{c.fare} · {journey[locale]}</small><strong>{eligible?fm(fare as number):'—'} <span>SAR</span></strong></div><button type="button" className={styles.carChoose} disabled={!eligible} onClick={()=>{document.getElementById('fusion-book')?.scrollIntoView({behavior:'smooth',block:'start'})}}>{c.selectCar}<ArrowLeft size={18}/></button><Link href={'/'+locale+'/fleet/'+car.slug} className={styles.detailLink}>{c.fleetDetails}{FULL_ARROW}</Link></div>
    </div>
    <div className={styles.sectionFoot}><Link href={'/'+locale+'/fleet'}>{c.allFleet}{FULL_ARROW}</Link></div>
  </section>
  <RoyalCabinChapter locale={locale}/>
  <section className={styles.routeAtlas} id="fusion-routes" aria-labelledby="fusion-routes-title">
   <div className={styles.routesHead}><div><span className={styles.serial}>{c.routesEye}</span><h2 id="fusion-routes-title">{c.routesTitle}</h2></div><p>{c.routesDesc}</p></div>
   <div className={styles.routesDisplay}><div className={styles.routePhoto}><Image src={journey.image} alt={journey[locale]} fill sizes="(max-width:820px) 100vw, 55vw" className={styles.cover}/><span>{journey.code}</span></div><div className={styles.routePanel}><span className={styles.eyebrow}>{c.chooseRoute}</span><div className={styles.routeList}>{ROUTES.slice(0,5).map((r,i)=><button type="button" key={r.id} aria-pressed={route===r.id} onClick={()=>changeRoute(r.id)}><span>0{i+1}</span><strong>{r[locale]}</strong><ArrowUpRight size={17}/></button>)}</div><div className={styles.routePrice}><small>{c.fare} / {car.name[locale]||car.name.en}</small><strong>{eligible?fm(fare as number):'—'} <span>SAR</span></strong><p>{c.included}</p></div><button type="button" disabled={!href} onClick={book} className={styles.routeAction}>{c.routeBook}<ArrowLeft size={18}/></button></div></div>
   <div className={styles.sectionFoot}><Link href={'/'+locale+'/routes'}>{c.allRoutes}{FULL_ARROW}</Link></div>
  </section>
  <RoyalServiceChapters locale={locale}/>
  <section className={styles.promises}><div className={styles.promiseHead}><span className={styles.serial}>{c.promiseEye}</span><h2>{c.promiseTitle}</h2></div><div className={styles.promiseList}>{facts.map((f,i)=><div key={f}><span>0{i+1}</span><p>{f}</p><Check size={17}/></div>)}</div></section>
  <RoyalGuestConfidence locale={locale} dict={dict}/>
  <section className={styles.finish}><span>{c.endEye}</span><h2>{c.endTitle}</h2><a href="#fusion-book">{c.endCta}<ArrowLeft size={19}/></a><p><Wallet size={16}/>{c.payNotice}</p></section>
 </div>;
}
