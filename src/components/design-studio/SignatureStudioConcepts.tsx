'use client';

import {useMemo,useState,type ReactNode} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft,ArrowUpLeft,ArrowUpRight,CalendarDays,CarFront,CheckCircle2,ChevronLeft,Clock3,Compass,Luggage,MapPin,Plane,ShieldCheck,Users} from 'lucide-react';
import {APPROVED_5_FLEET} from '@/data/approved-fleet-homepage';
import {AUTHORITATIVE_TRANSFER_RATES} from '@/lib/pricing-constants';
import styles from './SignatureStudio.module.css';

import {CONCEPTS,type ConceptKey} from '@/data/design-studio-concepts';
const JOURNEYS=[
 {slug:'jeddah-airport-to-makkah',label:'مطار جدة — فنادق مكة',from:'مطار الملك عبدالعزيز',to:'مكة المكرمة',abbr:'JED  /  MKK'},
 {slug:'madinah-airport-to-hotel',label:'مطار المدينة — الفندق',from:'مطار الأمير محمد بن عبدالعزيز',to:'المدينة المنورة',abbr:'MED  /  HOTEL'},
 {slug:'makkah-to-madinah',label:'مكة — المدينة',from:'مكة المكرمة',to:'المدينة المنورة',abbr:'MKK  /  MED'},
 {slug:'makkah-to-taif',label:'مكة — الطائف',from:'مكة المكرمة',to:'الطائف',abbr:'MKK  /  TIF'}
] as const;
const CAR_KEY:Record<string,string>={'toyota-camry':'camry','hyundai-staria':'staria','gmc-yukon-xl':'yukon','toyota-hiace':'hiace','toyota-coaster':'coaster'};
const CARS=APPROVED_5_FLEET;
function fmt(n:number){return new Intl.NumberFormat('en-US').format(n)}
function getFare(journey:string,carSlug:string){
 const val=AUTHORITATIVE_TRANSFER_RATES[journey]?.[CAR_KEY[carSlug]];
 return typeof val==='number'&&Number.isFinite(val)&&val>0?val:undefined;
}
function useTrip(){
 const [route,setRoute]=useState<string>(JOURNEYS[0].slug);
 const [car,setCar]=useState<string>('toyota-camry');
 const [travelDate,setTravelDate]=useState('');
 const [guests,setGuests]=useState(2);
 const [view,setView]=useState<'outside'|'inside'>('outside');
 const [showReview,setShowReview]=useState(false);
 const selected=useMemo(()=>CARS.find(x=>x.slug===car)||CARS[0],[car]);
 const journey=useMemo(()=>JOURNEYS.find(x=>x.slug===route)||JOURNEYS[0],[route]);
 const fare=getFare(route,car);
 return {route,setRoute,car,setCar,travelDate,setTravelDate,guests,setGuests,view,setView,showReview,setShowReview,selected,journey,fare};
}
type Trip=ReturnType<typeof useTrip>;
function DemoBadge(){return <span className={styles.demoBadge}><span/> نموذج تفاعلي للتصميم — لا يتم إرسال حجوزات</span>}
function Wordmark({variant}:{variant?:'a'|'b'|'c'}){
 return <div className={styles.wordmark} aria-label="ضيوف الرحمن VIP — Duyuf Alrahman VIP">
  {variant==='b'?<span className={styles.monogramB} aria-hidden="true">ض</span>:variant==='c'?<span className={styles.monogramC} aria-hidden="true">D<span>.</span></span>:
   <svg viewBox="0 0 48 48" width="42" height="42" fill="none" aria-hidden="true"><path d="M7 37V20Q24 0 41 20V37" stroke="currentColor" strokeWidth="2.5"/><path d="M15 36V22Q24 13 33 22V36" stroke="currentColor" strokeWidth="1.6"/><path d="M8 40Q23 27 40 40" stroke="currentColor" strokeWidth="2.5"/></svg>}
  <span><strong>ضيوف الرحمن <b>VIP</b></strong><small>DUYUF ALRAHMAN</small></span>
 </div>;
}
function DesignSwitch({current}:{current:ConceptKey}){
 return <nav aria-label="الانتقال بين التصاميم" className={styles.designSwitch}>
  <Link href="/studio" className={styles.switchAll}>مقارنة التصاميم</Link>
  {CONCEPTS.map(x=><Link key={x.slug} className={x.slug===current?styles.switchActive:''} aria-current={x.slug===current?'page':undefined} href={'/studio/'+x.slug}>{x.short}</Link>)}
 </nav>;
}
function FieldRoute({trip,ariaLabel}:{trip:Trip,ariaLabel?:string}){return <label className={styles.field}><span><MapPin size={15}/>{ariaLabel||'مسار الرحلة'}</span><select value={trip.route} onChange={e=>{trip.setRoute(e.target.value);trip.setShowReview(false)}}>{JOURNEYS.map(r=><option key={r.slug} value={r.slug}>{r.label}</option>)}</select></label>}
function FieldDate({trip}:{trip:Trip}){return <label className={styles.field}><span><CalendarDays size={15}/>تاريخ الرحلة</span><input aria-label="تاريخ الرحلة" type="date" value={trip.travelDate} onChange={e=>trip.setTravelDate(e.target.value)}/></label>}
function FieldGuests({trip}:{trip:Trip}){return <label className={styles.field}><span><Users size={15}/>عدد الركاب</span><select value={trip.guests} onChange={e=>trip.setGuests(Number(e.target.value))}>{Array.from({length:21},(_,i)=>i+1).map(x=><option key={x} value={x}>{x} {x===1?'راكب':'ركاب'}</option>)}</select></label>}
function SafeFare({trip,hasLabel=true}:{trip:Trip,hasLabel?:boolean}){
 return <div className={styles.fareDisplay}>{hasLabel&&<span>السعر المعتمد لهذا المسار / للمركبة</span>}
 <strong>{typeof trip.fare==='number'&&trip.guests<=trip.selected.passengers?fmt(trip.fare):'—'} <small>SAR</small></strong>
 {trip.guests>trip.selected.passengers&&<small className={styles.errorText}>عدد الركاب أكبر من سعة السيارة المختارة؛ اختر سيارة أكبر.</small>}
 {typeof trip.fare!=='number'&&<small>السيارة غير متاحة لهذا المسار.</small>}</div>;
}
function ReviewLine({trip}:{trip:Trip}){
 return trip.showReview?<div className={styles.previewSummary} role="status">
  <CheckCircle2 size={20}/><span><strong>معاينة ملخص الرحلة فقط</strong>{trip.journey.label} · {trip.selected.name.ar} · {trip.guests} ركاب · {trip.travelDate||'التاريخ لم يُحدد'} · {trip.fare?fmt(trip.fare)+' SAR':'السعر غير متاح'}</span>
 </div>:null;
}
function TripAction({trip,label,className}:{trip:Trip,label:string,className:string}){
 const invalid=!trip.fare||trip.guests>trip.selected.passengers;
 return <button type="button" className={className} disabled={invalid} onClick={()=>trip.setShowReview(true)}>{label}<ArrowLeft size={18} aria-hidden="true"/></button>;
}
function CarPick({trip,variant}:{trip:Trip,variant:'a'|'b'|'c'}){
 return <div className={variant==='a'?styles.fleetPills:variant==='b'?styles.editionPicker:styles.cinemaPicker} role="group" aria-label="اختيار السيارة">
 {CARS.map((v,i)=><button key={v.slug} type="button" onClick={()=>{trip.setCar(v.slug);trip.setView('outside');trip.setShowReview(false)}} aria-pressed={trip.car===v.slug}>
 <span>{variant==='c'?String(i+1).padStart(2,'0'):v.name.ar}</span>{variant==='c'&&<strong>{v.name.ar}</strong>}
 </button>)}
 </div>;
}
function VehiclePhoto({trip,extraClass='',priority=false}:{trip:Trip,extraClass?:string,priority?:boolean}){
 return <div className={styles.vehiclePhoto+' '+extraClass}>
 <Image key={trip.car+trip.view} src={trip.view==='inside'?trip.selected.interiorImage:trip.selected.exteriorImage}
  alt={(trip.selected.name.ar||trip.selected.name.en)+(trip.view==='inside'?' — صورة المقصورة':' — صورة المركبة')}
  fill sizes="(max-width:768px) 94vw, 52vw" priority={priority} className={trip.view==='inside'?styles.photoInside:styles.photoOutside}/>
 <div className={styles.photoToggle}><button type="button" aria-pressed={trip.view==='outside'} onClick={()=>trip.setView('outside')}>الخارجية</button><button type="button" aria-pressed={trip.view==='inside'} onClick={()=>trip.setView('inside')}>المقصورة</button></div>
 </div>;
}
function FloatingNotice({children}:{children:ReactNode}){return <p className={styles.safetyNotice}><ShieldCheck size={16} aria-hidden="true"/>{children}</p>}

/* A: architectural editorial stage, asymmetric sandstone hero / wing-like booking ribbon */
function DesertModernism(){
 const trip=useTrip();
 return <main className={styles.desert} dir="rtl" data-design-studio>
  <div className={styles.desertTop}><DemoBadge/><DesignSwitch current="desert-modernism"/></div>
  <header className={styles.desertHeader}><Wordmark variant="a"/><nav aria-label="أقسام التصميم"><a href="#a-fleet">المركبات</a><a href="#a-journey">الرحلات</a><a href="#a-book">الحجز</a></nav><a className={styles.desertHeaderCta} href="#a-book">ابدأ رحلتك <ArrowLeft size={16}/></a></header>
  <section className={styles.desertHero}>
   <div className={styles.desertHeroCopy}><span className={styles.eyebrow}>SAUDI HOSPITALITY / PRIVATE JOURNEYS</span>
    <h1>رحلتك تستحق<br/><em>عناية استثنائية.</em></h1>
    <p>تنقل خاص بين مطارات المملكة ومدنها المقدسة، بخدمة سائق محترف وتجربة تحترم وقتك وخصوصيتك.</p>
    <a href="#a-book" className={styles.desertMainCta}>استكشف رحلتك <ArrowLeft size={19}/></a>
    <div className={styles.desertVerticalNote}><span>01 / 05</span><span>من الاستقبال إلى الوصول</span></div>
   </div>
   <div className={styles.desertHeroArt}><Image src="/assets/homepage-v2/chauffeur-welcome.jpg" alt="مشهد استقبال ضيف بسيارة وسائق خاص في المملكة" fill sizes="(max-width:800px) 100vw, 60vw" priority className={styles.coverPhoto}/><div className={styles.desertImageCaption}>A NEW STANDARD OF ARRIVAL <span>— 2026</span></div></div>
  </section>
  <section id="a-book" className={styles.desertBooking} aria-label="تجربة طلب حجز">
   <div className={styles.deskNumber}><span>01</span><small>YOUR PRIVATE JOURNEY</small></div>
   <div className={styles.desertBookingFields}><FieldRoute trip={trip}/><FieldDate trip={trip}/><FieldGuests trip={trip}/></div>
   <a href="#a-fleet" className={styles.desertBookButton}>اختر سيارتك <ArrowLeft size={18}/></a>
  </section>
  <div className={styles.desertTrust}><span>استقبال المطارات مع مراقبة الرحلات</span><span>خدمة متاحة طوال اليوم</span><span>لا تدفع مقدمًا</span></div>
  <section id="a-fleet" className={styles.desertFleet}><div className={styles.desertFleetIntro}><span className={styles.eyebrow}>02 / THE FLEET</span><h2>لكل رحلة،<br/>السيارة التي تليق بها.</h2><p>خمسة خيارات مباشرة للحجز؛ استكشفها حسب عدد الركاب والحقائب، بدون صور سيارات وهمية.</p><CarPick trip={trip} variant="a"/></div>
   <div className={styles.desertAutoStage}><VehiclePhoto trip={trip} extraClass={styles.desertCarPhoto}/><div className={styles.desertVehicleText}><span>0{CARS.findIndex(x=>x.slug===trip.car)+1} — SIGNATURE FLEET</span><h3>{trip.selected.name.ar}</h3><div><span><Users size={16}/>{trip.selected.passengers} ركاب</span><span><Luggage size={16}/>{trip.selected.luggage} حقائب</span></div></div></div>
  </section>
  <section id="a-journey" className={styles.desertJourney}><div className={styles.desertJourneyPhoto}><Image src="/assets/homepage-v2/ziyarat-haram.jpg" alt="مشهد حقيقي لمعالم مكة المكرمة" fill sizes="(max-width:800px) 100vw, 44vw" className={styles.coverPhoto}/></div><div className={styles.desertJourneyText}><span className={styles.eyebrow}>03 / YOUR ARRIVAL</span><h2>من المطار<br/>إلى وجهتك براحة.</h2><p>الرحلة تبدأ من لحظة وصولك. اختر مسارك وسيارتك، وتابع تفاصيل السعر قبل تقديم طلب الحجز الحقيقي.</p><div className={styles.desertRouteLine}><b>{trip.journey.from}</b><span>······················</span><b>{trip.journey.to}</b></div><SafeFare trip={trip}/><TripAction trip={trip} label="استعرض ملخص الرحلة" className={styles.desertAction}/><ReviewLine trip={trip}/><FloatingNotice>الدفع نقدًا للسائق بعد اكتمال الرحلة — هذه صفحة تصميم تجريبية.</FloatingNotice></div></section>
  <footer className={styles.desertFooter}><Wordmark variant="a"/><span>تصور A · Desert Modernism · معاينة فقط</span><Link href="/studio">رجوع للمقارنة</Link></footer>
 </main>;
}
/* B: publishing-house visual grammar; oversized typesetting, chapter-like car index, folio booking */
function RoyalEditorial(){
 const trip=useTrip();
 return <main className={styles.royal} dir="rtl" data-design-studio>
  <div className={styles.royalTop}><span>THE HOUSE OF DUYUF · PRIVATE HOSPITALITY</span><DemoBadge/><DesignSwitch current="royal-editorial"/></div>
  <header className={styles.royalHeader}><Wordmark variant="b"/><span>المملكة العربية السعودية / Saudi Arabia</span><nav aria-label="أقسام التصميم"><a href="#b-folio">اطلب رحلتك</a><a href="#b-fleet">الأسطول</a><a href="#b-prices">الأسعار</a></nav></header>
  <section className={styles.royalOpening}><div className={styles.royalOpeningText}>
    <span className={styles.royalFolio}>THE PRIVATE CHAUFFEUR EDITION — VOL. 01</span>
    <h1>للوصول<br/><em>أصول.</em></h1>
    <p className={styles.royalLead}>ضيافة تبدأ قبل أن تصل.</p><p>رحلات خاصة في مكة والمدينة وجدة والطائف والرياض. خصوصية وهدوء ورحلة مخطط لها بعناية.</p>
    <a href="#b-folio" className={styles.royalTextCta}>افتح ملف رحلتك <ArrowUpLeft size={18}/></a>
  </div>
  <div className={styles.royalPortrait}><Image src="/assets/homepage-v2/fleet-private.jpg" alt="سيارة نقل خاص ضمن مشهد ضيافة سعودية" fill sizes="(max-width:800px) 100vw, 56vw" priority className={styles.coverPhoto}/><span className={styles.royalPhotoLegend}>ISSUE № 01 / PRIVATE ARRIVALS</span></div>
  <div className={styles.royalSideCaption}>D U Y U F &nbsp; / &nbsp; A L R A H M A N &nbsp; V I P</div></section>
  <section id="b-fleet" className={styles.royalFleet}>
   <div className={styles.royalSectionHeadline}><span>CHAPTER 01 / THE COLLECTION</span><h2>مجموعة مُختارة.<br/><i>لرحلات لا تشبه سواها.</i></h2></div>
   <div className={styles.royalMagazine}>
     <div className={styles.royalCarImage}><VehiclePhoto trip={trip} extraClass={styles.royalVehiclePhoto}/><span className={styles.royalStamp}>THE EDITION<br/>No.0{CARS.findIndex(x=>x.slug===trip.car)+1}</span></div>
     <div className={styles.royalCarCopy}><span>THE ART OF THE JOURNEY</span><h3>{trip.selected.name.ar}</h3><p>{trip.selected.summary.ar||'سيارة خاصة لنقل ضيوف الرحمن.'}</p>
       <div className={styles.royalFacts}><span>{trip.selected.passengers}<small>ركاب</small></span><span>{trip.selected.luggage}<small>حقائب</small></span></div>
       <CarPick trip={trip} variant="b"/><a href="#b-folio" className={styles.royalTextCta}>اخترها لرحلتك <ArrowUpLeft size={18}/></a>
     </div>
   </div>
  </section>
  <section id="b-folio" className={styles.royalFolioSection}>
   <div className={styles.royalFolioTitle}><span>CHAPTER 02 / THE RESERVATION FOLIO</span><h2>تفاصيل<br/>تصنع الطمأنينة.</h2><p>نموذج مصمم كملف ضيافة شخصي. هنا يمكنك تجربة اختيار الرحلة وعرض الملخص فقط.</p></div>
   <div className={styles.royalBookingPaper}><div className={styles.royalPaperTop}><span>DUYUF / PRIVATE REQUEST</span><span>№ 000 / PREVIEW</span></div><h3>بيانات رحلتك</h3><div className={styles.royalPaperGrid}><FieldRoute trip={trip}/><FieldDate trip={trip}/><FieldGuests trip={trip}/></div>
      <div className={styles.royalPaperVehicle}><Image src={trip.selected.exteriorImage} width={190} height={90} alt={trip.selected.name.ar}/><div><small>السيارة المختارة</small><strong>{trip.selected.name.ar}</strong><span>{trip.selected.passengers} ركاب · {trip.selected.luggage} حقائب</span></div></div>
      <div className={styles.royalPaperBottom}><SafeFare trip={trip}/><TripAction trip={trip} label="راجع ملف الرحلة" className={styles.royalSubmit}/></div><ReviewLine trip={trip}/>
   </div>
  </section>
  <section id="b-prices" className={styles.royalPricing}><span>CHAPTER 03 / TRANSPARENT RATES</span><h2>السعر واضح،<br/>من أول السطر.</h2><p>السعر يختلف بحسب المسار والسيارة؛ الأرقام أدناه مأخوذة من جدول الأسعار المعتمد بالمشروع.</p><div className={styles.royalPriceRows}>{CARS.map((v,i)=>{const fare=getFare(trip.route,v.slug);return <button type="button" key={v.slug} className={trip.car===v.slug?styles.royalRowActive:''} onClick={()=>{trip.setCar(v.slug);trip.setShowReview(false)}}><span>0{i+1}</span><strong>{v.name.ar}</strong><span>{v.passengers} ركاب</span><b>{fare?fmt(fare)+' SAR':'غير متاح'}</b><ChevronLeft size={18}/></button>})}</div><FloatingNotice>يُدفع المبلغ نقدًا للسائق بعد الرحلة فقط، بدون عربون.</FloatingNotice></section>
  <footer className={styles.royalFooter}><Wordmark variant="b"/><span>ROYAL EDITORIAL / CONCEPT B</span><Link href="/studio">قارن بين التصاميم</Link></footer>
 </main>;
}
/* C: full film, immersive selected vehicle theatre, cockpit quote footer */
function CinematicSandstone(){
 const trip=useTrip();
 const [scene,setScene]=useState(0);
 const scenes=[{src:'/assets/homepage-v2/chauffeur-welcome.jpg',label:'لحظة الاستقبال'},{src:'/assets/homepage-v2/vehicle-interior-cta.jpg',label:'مساحة تستقبلك'},{src:'/assets/homepage-v2/ziyarat-haram.jpg',label:'الوصول إلى المدينة المقدسة'}];
 return <main className={styles.cinematic} dir="rtl" data-design-studio>
  <div className={styles.cinemaTopBar}><DemoBadge/><DesignSwitch current="cinematic-sandstone"/></div>
  <section className={styles.cinemaHero} aria-labelledby="c-heading"><video muted playsInline autoPlay loop preload="metadata" poster="/assets/homepage-v2/hero-poster.jpg" className={styles.cinemaVideo} aria-hidden="true"><source src="/assets/homepage-v2/hero.webm" type="video/webm"/><source src="/assets/homepage-v2/hero.mp4" type="video/mp4"/></video>
    <div className={styles.cinemaVeil}/>
    <header className={styles.cinemaHeader}><Wordmark variant="c"/><nav aria-label="أقسام التصميم"><a href="#c-fleet">الأسطول</a><a href="#c-book">احجز</a></nav><a href="#c-book" className={styles.cinemaHeaderBook}>ابدأ رحلتك <ArrowUpLeft size={15}/></a></header>
    <div className={styles.cinemaHeroType}><span>AN EXCEPTIONAL WAY TO ARRIVE / SAUDI ARABIA</span><h1 id="c-heading">هنا تبدأ<br/><em>حكاية الوصول.</em></h1><p>من لحظة استقبال المطار، إلى اللحظة التي تصل فيها وجهتك. رحلتك الخاصة تستحق التفاصيل.</p><a href="#c-fleet" className={styles.cinemaHeroCta}>اكتشف التجربة <ArrowLeft size={19}/></a></div>
    <div className={styles.cinemaHeroFoot}><span>01 / THE ARRIVAL</span><span>المملكة العربية السعودية</span><a href="#c-story">استمر بالاستكشاف ↓</a></div>
  </section>
  <section id="c-story" className={styles.cinemaStory}><div className={styles.cinemaStoryHeading}><span>02 / JOURNEY CHAPTERS</span><h2>كل مشهد من رحلتك،<br/>محسوب له حساب.</h2></div><div className={styles.cinemaStoryVisual}><Image key={scene} src={scenes[scene].src} alt={scenes[scene].label} fill sizes="(max-width:900px) 100vw, 67vw" className={styles.coverPhoto}/><div className={styles.cinemaSceneTitle}><span>0{scene+1} / 03</span><h3>{scenes[scene].label}</h3></div></div><div className={styles.cinemaSceneControl} role="group" aria-label="مشاهد الرحلة">{scenes.map((x,i)=><button type="button" key={x.label} aria-pressed={scene===i} onClick={()=>setScene(i)}><span>0{i+1}</span>{x.label}</button>)}</div></section>
  <section id="c-fleet" className={styles.cinemaFleet}><div className={styles.cinemaFleetHeading}><div><span>03 / PRIVATE FLEET</span><h2>المساحة المناسبة.<br/><em>للرحلة المناسبة.</em></h2></div><p>اختيار حقيقي من المركبات المعتمدة بالمشروع؛ الصور المعروضة من ملفات الأسطول، وليست سيارات مولّدة.</p></div>
    <div className={styles.cinemaVehicleTheater}><div className={styles.cinemaVehicleName}><span>VEHICLE · 0{CARS.findIndex(x=>x.slug===trip.car)+1}</span><h3>{trip.selected.name.ar}</h3><p>{trip.selected.summary.ar}</p><div><b><Users size={16}/>{trip.selected.passengers} ركاب</b><b><Luggage size={16}/>{trip.selected.luggage} حقائب</b></div></div><VehiclePhoto trip={trip} extraClass={styles.cinemaCarPhoto}/><CarPick trip={trip} variant="c"/></div>
  </section>
  <section id="c-book" className={styles.cinemaBook}><div className={styles.cinemaBookHeadline}><span>04 / YOUR PRIVATE TRANSFER</span><h2>اختر المسار.<br/>ونحن نهتم بالباقي.</h2><p>تجربة تصميمية تفاعلية للحجز؛ لا ترسل بيانات شخصية ولا تنشئ طلبًا في قاعدة البيانات.</p></div><div className={styles.cinemaControlDesk}><div className={styles.cinemaControlTitle}><Compass size={25}/><span>JOURNEY CONTROL</span><strong>{trip.journey.abbr}</strong></div><FieldRoute trip={trip}/><FieldDate trip={trip}/><FieldGuests trip={trip}/><div className={styles.cinemaPriceLine}><SafeFare trip={trip}/></div><TripAction trip={trip} label="معاينة تفاصيل الرحلة" className={styles.cinemaAction}/><ReviewLine trip={trip}/><FloatingNotice>الأسعار حسب جدول المشروع، ولا يوجد دفع عبر الموقع. السداد بعد الرحلة نقدًا للسائق.</FloatingNotice></div></section>
  <footer className={styles.cinemaFooter}><Wordmark variant="c"/><span>CINEMATIC SANDSTONE — ART DIRECTION / CONCEPT C</span><Link href="/studio">رجوع للمقارنة <ArrowUpRight size={16}/></Link></footer>
 </main>;
}
export function SignatureStudioConcept({concept}:{concept:ConceptKey}){
 if(concept==='desert-modernism')return <DesertModernism/>;
 if(concept==='royal-editorial')return <RoyalEditorial/>;
 return <CinematicSandstone/>;
}
