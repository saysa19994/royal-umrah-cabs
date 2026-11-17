'use client';

/**
 * THREE DIFFERENT DESIGN CONCEPTS. Presentation-only pages on a preview branch.
 * Every vehicle photograph and label is read from the approved fleet.
 * Every SAR fare is delivered by the existing getDbPricesCached server service.
 * Booking CTA hands off to the existing /[locale]/booking service; no fake orders.
 */
import {useState, type FormEvent} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {ArrowLeft,ArrowRight,ArrowUpRight,CarFront,CalendarDays,Users,Luggage,MapPin,ShieldCheck,Compass,Check,ChevronDown,BookOpen} from 'lucide-react';
import type {ApprovedFleetVehicle} from '@/data/approved-fleet-homepage';
import type {TransferRatesMap} from '@/lib/pricing-db';
import styles from './SignatureConceptExperience.module.css';

type Concept='desert'|'editorial'|'cinematic';
type Lang='ar'|'en';
type Props={concept:Concept;locale:Lang;fleet:ApprovedFleetVehicle[];rates:TransferRatesMap};
const ROUTES=[
 {slug:'jeddah-airport-to-makkah',ar:'مطار جدة ← مكة المكرمة',en:'Jeddah Airport → Makkah'},
 {slug:'makkah-to-madinah',ar:'مكة المكرمة ← المدينة المنورة',en:'Makkah → Madinah'},
 {slug:'madinah-airport-to-hotel',ar:'مطار المدينة ← فنادق المدينة',en:'Madinah Airport → Hotel'},
 {slug:'jeddah-to-madinah',ar:'جدة ← المدينة المنورة',en:'Jeddah → Madinah'},
 {slug:'makkah-to-taif',ar:'مكة المكرمة ← الطائف',en:'Makkah → Taif'},
 {slug:'makkah-ziyarat',ar:'مزارات مكة المكرمة',en:'Makkah Ziyarat'},
 {slug:'madinah-ziyarat',ar:'مزارات المدينة المنورة',en:'Madinah Ziyarat'},
 {slug:'jeddah-to-taif',ar:'جدة ← الطائف',en:'Jeddah → Taif'},
 {slug:'riyadh-to-makkah',ar:'الرياض ← مكة المكرمة',en:'Riyadh → Makkah'},
 {slug:'riyadh-to-madinah',ar:'الرياض ← المدينة المنورة',en:'Riyadh → Madinah'},
] as const;
const KEYS:Record<string,string>={'toyota-camry':'camry','hyundai-staria':'staria','gmc-yukon-xl':'yukon','toyota-hiace':'hiace','toyota-coaster':'coaster'};
const DIRECTIONS:{id:Concept;ar:string;en:string;sub:string}[]=[
 {id:'desert',ar:'الحداثة الصحراوية',en:'Desert Modernism',sub:'01 · ARCHITECTURAL'},
 {id:'editorial',ar:'الفخامة التحريرية',en:'Royal Editorial',sub:'02 · EDITORIAL'},
 {id:'cinematic',ar:'الحجر الرملي السينمائي',en:'Cinematic Sandstone',sub:'03 · CINEMATIC'},
];
const COPY={
 ar:{
  studio:'استوديو التصميم — معاينة فقط',share:'مقارنة الاتجاهات',back:'الموقع الرسمي',heroA:'ضيافة تبدأ قبل الوصول.',heroAS:'رحلتك تستحق عناية استثنائية.',heroB:'لأن كل رحلة تستحق أن تُروى.',heroBS:'تجربة نقل خاصة، بتفاصيل تليق بك.',heroC:'الطريق ليس مجرد مسافة.',heroCS:'إنه بداية تجربة استثنائية.',intro:'نقل خاص بسيارة وسائق لضيوف الرحمن في المملكة العربية السعودية.',book:'احجز رحلتك الخاصة',fleet:'تعرّف على الأسطول',ride:'اختر رحلتك',route:'المسار',date:'التاريخ',guests:'عدد الركاب',car:'المركبة',select:'اختيار المركبة',notSelected:'اختر المركبة أولًا',unavailable:'غير متاحة لهذا المسار',fare:'الأجرة للمركبة',currency:'ريال',continue:'متابعة طلب الحجز',fleetTitleA:'السيارة المناسبة. لكل رحلة.',fleetTitleB:'أسطول يليق بقصة رحلتك.',fleetTitleC:'من الداخل تبدأ الراحة.',fleetEyebrow:'المجموعة المختارة',details:'تفاصيل المركبة',outside:'من الخارج',inside:'المقصورة',capacity:'الركاب',luggage:'الحقائب',cabins:'تفاصيل صنعت للراحة.',view:'افتح صفحة المركبة',pricing:'قارن قبل أن تحجز.',priceCaption:'الأسعار المعروضة للمسار المختار وبحسب المركبة، من محرك الأسعار المعتمد.',steps:'خطوات طلب الرحلة',step1:'تفاصيل الرحلة',step2:'اختيار السيارة',step3:'بيانات المسافر',step4:'المراجعة والإرسال',actualBooking:'هذه معاينة تصميم. إرسال الطلب النهائي يتم عبر نظام الحجز الحالي.',cash:'الدفع نقدًا للسائق بعد اكتمال الرحلة — دون عربون أو دفع إلكتروني.',service:'استقبال المطار · النقل بين المدن · جولات المزارات',concierge:'طلب خاص لكبار الضيوف',conciergeDesc:'مايباخ وهيونداي H1 متاحتان عبر خدمة الكونسيرج بالتنسيق المسبق، وليستا ضمن الحجز المباشر.',inquire:'تواصل مع الكونسيرج',trust1:'أسعار شاملة الضريبة',trust2:'مراقبة الرحلات الجوية',trust3:'خدمة على مدار الساعة',designOnly:'نموذج بصري للاعتماد — ليس الموقع المنشور',more:'شاهد التفاصيل',yes:'العودة إلى المقارنة'
 },
 en:{
  studio:'Design studio — preview only',share:'Compare directions',back:'Official website',heroA:'Hospitality begins before arrival.',heroAS:'Your Journey, Our Priority.',heroB:'A journey worth telling.',heroBS:'Private mobility with considered details.',heroC:'The road is more than distance.',heroCS:'The beginning of something exceptional.',intro:'Private chauffeur travel for pilgrims and families across Saudi Arabia.',book:'Book your private ride',fleet:'Explore the fleet',ride:'Plan your journey',route:'Journey',date:'Date',guests:'Passengers',car:'Vehicle',select:'Select vehicle',notSelected:'Choose a vehicle first',unavailable:'Not available on this route',fare:'Fare per vehicle',currency:'SAR',continue:'Continue booking request',fleetTitleA:'The right vehicle for every journey.',fleetTitleB:'A collection with a story.',fleetTitleC:'Comfort begins within.',fleetEyebrow:'THE COLLECTION',details:'Vehicle details',outside:'Exterior',inside:'Interior',capacity:'Guests',luggage:'Luggage',cabins:'Every detail matters.',view:'View vehicle page',pricing:'Compare before you travel.',priceCaption:'Fares below come from the existing approved server-side price service for the selected route and vehicle.',steps:'Booking journey',step1:'Trip details',step2:'Vehicle choice',step3:'Guest details',step4:'Review and submit',actualBooking:'This is a visual preview. Final requests use the current booking service.',cash:'Pay cash to the driver after the completed journey — no deposits or online payments.',service:'Airport arrivals · Intercity transfers · Ziyarat visits',concierge:'Bespoke VIP concierge',conciergeDesc:'Mercedes-Maybach and Hyundai H1 are available by personal enquiry only, never instant booking.',inquire:'Contact concierge',trust1:'VAT-inclusive fares',trust2:'Flight monitoring',trust3:'24/7 service',designOnly:'Design approval preview — not the published website',more:'View details',yes:'Back to comparison'
 }
};
function Logo({compact=false}:{compact?:boolean}){return <span className={styles.logo}><span aria-hidden="true" className={styles.logoMark}><svg viewBox="0 0 58 62" fill="none"><path d="M9 52V24L29 8l20 16v28" stroke="currentColor" strokeWidth="3"/><path d="M17 52V29l12-10 12 10v23" stroke="currentColor" strokeWidth="2.3"/><path d="M8 54q22-19 42 0" stroke="currentColor" strokeWidth="3"/><circle cx="29" cy="37" r="3" fill="currentColor"/></svg></span>{!compact&&<span className={styles.wordmark}><strong>ضيوف الرحمن <em>VIP</em></strong><small>DUYUF ALRAHMAN VIP</small></span>}</span>}
function Video({mediaClass}:{mediaClass:string}){return <video className={mediaClass} autoPlay muted loop playsInline preload="metadata" poster="/assets/homepage-v2/hero-poster.jpg" aria-label="Duyuf Alrahman VIP journey video"><source media="(max-width: 700px)" src="/assets/homepage-v2/hero-mobile.mp4" type="video/mp4"/><source src="/assets/homepage-v2/hero.mp4" type="video/mp4"/></video>;}
type State={route:string;setRoute:(v:string)=>void;vehicle:number|null;setVehicle:(v:number|null)=>void;showcase:number;setShowcase:(v:number)=>void;interior:boolean;setInterior:(v:boolean)=>void;guests:number;setGuests:(v:number)=>void;date:string;setDate:(v:string)=>void;fare:number|undefined;bookingUrl:string|undefined;locale:Lang;rates:TransferRatesMap;fleet:ApprovedFleetVehicle[]};
function BookingControls({s,variant='default'}:{s:State;variant?:string}){const c=COPY[s.locale];const validCars=s.fleet.filter(v=>typeof s.rates[s.route]?.[KEYS[v.slug]]==='number');return <form className={styles.bookingControls} data-booking-variant={variant} onSubmit={(e:FormEvent)=>{e.preventDefault();if(s.bookingUrl)window.location.assign(s.bookingUrl);}}>
 <label><span><MapPin size={15}/>{c.route}</span><select value={s.route} onChange={e=>{s.setRoute(e.target.value);s.setVehicle(null);}}>{ROUTES.map(r=><option value={r.slug} key={r.slug}>{r[s.locale]}</option>)}</select></label>
 <label><span><CalendarDays size={15}/>{c.date}</span><input type="date" value={s.date} onChange={e=>s.setDate(e.target.value)}/></label>
 <label><span><Users size={15}/>{c.guests}</span><select value={s.guests} onChange={e=>s.setGuests(Number(e.target.value))}>{Array.from({length:21},(_,i)=>i+1).map(n=><option key={n} value={n}>{n}</option>)}</select></label>
 <label><span><CarFront size={15}/>{c.car}</span><select value={s.vehicle===null?'':String(s.vehicle)} onChange={e=>s.setVehicle(e.target.value===''?null:Number(e.target.value))} required><option value="">{c.notSelected}</option>{validCars.map(v=><option key={v.slug} value={s.fleet.indexOf(v)} disabled={s.guests>v.passengers}>{v.name[s.locale]||v.name.en}</option>)}</select></label>
 <button type="submit" disabled={!s.bookingUrl}>{c.continue}<ArrowLeft size={17} aria-hidden="true"/></button>
 </form>;}
function PriceValue({s,idx}:{s:State;idx:number}){const x=s.rates[s.route]?.[KEYS[s.fleet[idx].slug]];return <strong className={styles.fareValue}>{typeof x==='number'?<>{new Intl.NumberFormat('en-US').format(x)} <small>SAR</small></>:COPY[s.locale].unavailable}</strong>;}
function VehiclePhoto({v,inside=false,priority=false,className}:{v:ApprovedFleetVehicle;inside?:boolean;priority?:boolean;className?:string}){return <Image src={inside?v.interiorImage:v.exteriorImage} alt={v.name.en+(inside?' interior':' exterior')} fill sizes="(max-width:700px) 95vw, 52vw" priority={priority} className={className||styles.carImage}/>;}
function StudioTabs({concept,locale}:{concept:Concept;locale:Lang}){const c=COPY[locale];return <div className={styles.studioTopbar}><span>{c.studio}</span><nav aria-label={c.share}>{DIRECTIONS.map(d=><Link key={d.id} aria-current={d.id===concept?'page':undefined} href={'/signature-lab/'+locale+'/'+d.id}>{d.id.toUpperCase()} <span>{locale==='ar'?d.ar:d.en}</span></Link>)}</nav><Link href={'/'+locale} className={styles.backSite}>{c.back}<ArrowUpRight size={14}/></Link></div>}
function SiteNav({s,concept}:{s:State;concept:Concept}){const c=COPY[s.locale];return <div className={styles.siteNav}><Logo/><div className={styles.navLinks}><a href="#fleet">{c.fleet}</a><a href="#pricing">{c.pricing}</a><a href="#booking">{c.ride}</a></div><Link href={'/signature-lab/'+(s.locale==='ar'?'en':'ar')+'/'+concept} className={styles.langToggle}>{s.locale==='ar'?'EN':'عربي'}</Link></div>}
function QuickFacts({locale}:{locale:Lang}){const c=COPY[locale];return <div className={styles.facts}><span><ShieldCheck size={17}/>{c.trust1}</span><span><Compass size={17}/>{c.trust2}</span><span><Check size={17}/>{c.trust3}</span></div>}
function GuestReview({locale}:{locale:Lang}){const c=COPY[locale];return <p className={styles.policy}><ShieldCheck size={17}/>{c.cash}</p>;}
function Steps({locale}:{locale:Lang}){const c=COPY[locale];return <div className={styles.steps}><span>01. {c.step1}</span><span>02. {c.step2}</span><span>03. {c.step3}</span><span>04. {c.step4}</span></div>}
function PriceRows({s,mode}:{s:State;mode:'a'|'b'|'c'}){const c=COPY[s.locale];return <div className={styles.priceRows} data-price-style={mode}>{s.fleet.map((v,i)=>{const price=s.rates[s.route]?.[KEYS[v.slug]];const eligible=typeof price==='number'&&s.guests<=v.passengers;return <button type="button" key={v.slug} className={styles.priceRow} aria-pressed={s.vehicle===i} disabled={!eligible} onClick={()=>{s.setVehicle(i);s.setShowcase(i)}}><span className={styles.priceImg}><VehiclePhoto v={v}/></span><span className={styles.priceName}><strong>{v.name[s.locale]||v.name.en}</strong><small>{v.passengers} {c.capacity} · {v.luggage} {c.luggage}</small></span><span className={styles.priceAmt}>{typeof price==='number'?<><b>{new Intl.NumberFormat('en-US').format(price)}</b><small>SAR</small></>:<small>{c.unavailable}</small>}</span><span className={styles.priceChoose}>{eligible?(s.vehicle===i?'✓':c.select):'—'}</span></button>})}</div>}
function VehicleStage({s,mode}:{s:State;mode:'a'|'b'|'c'}){const c=COPY[s.locale],v=s.fleet[s.showcase];return <section id="fleet" className={styles.fleetSection} data-fleet-style={mode}>
 <div className={styles.fleetHeading}><span>{c.fleetEyebrow} / 05</span><h2>{mode==='a'?c.fleetTitleA:mode==='b'?c.fleetTitleB:c.fleetTitleC}</h2></div>
 <div className={styles.fleetComposition}>
  <div className={styles.vehicleSelector} role="group" aria-label={c.fleet}>{s.fleet.map((car,i)=><button type="button" key={car.slug} onClick={()=>{s.setShowcase(i);s.setInterior(false)}} aria-pressed={s.showcase===i}><span>{String(i+1).padStart(2,'0')}</span>{car.name[s.locale]||car.name.en}</button>)}</div>
  <div className={styles.showcasePhoto}><VehiclePhoto v={v} inside={s.interior} className={s.interior?styles.interiorImage:styles.carImage}/><span className={styles.photoLabel}>{String(s.showcase+1).padStart(2,'0')} / 05</span><div className={styles.photoToggle}><button type="button" aria-pressed={!s.interior} onClick={()=>s.setInterior(false)}>{c.outside}</button><button type="button" aria-pressed={s.interior} onClick={()=>s.setInterior(true)}>{c.inside}</button></div></div>
  <div className={styles.vehicleDetails}><span>{c.details} / 0{s.showcase+1}</span><h3>{v.name[s.locale]||v.name.en}</h3><p>{v.summary[s.locale]||v.summary.en}</p><dl><div><dt><Users size={16}/>{c.capacity}</dt><dd>{v.passengers}</dd></div><div><dt><Luggage size={16}/>{c.luggage}</dt><dd>{v.luggage}</dd></div></dl><PriceValue s={s} idx={s.showcase}/><div className={styles.vehicleActions}><button type="button" onClick={()=>s.setVehicle(s.showcase)}>{c.select}</button><Link href={'/'+s.locale+'/fleet/'+v.slug}>{c.view}<ArrowUpRight size={16}/></Link></div></div>
 </div>
 <div className={styles.insideFeature}><div className={styles.insidePhoto}><VehiclePhoto v={v} inside/></div><div><span>DETAIL / INTERIOR</span><h3>{c.cabins}</h3><p>{v.name[s.locale]||v.name.en} · {v.passengers} {c.capacity} · {v.luggage} {c.luggage}</p><Link href={'/'+s.locale+'/fleet/'+v.slug}>{c.more}<ArrowUpRight size={16}/></Link></div></div>
 </section>}
function Closing({s,concept}:{s:State;concept:Concept}){const c=COPY[s.locale];return <footer className={styles.closing}><div><Logo/><p>{c.intro}</p><small>{c.designOnly}</small></div><div><p>{c.concierge}</p><span>{c.conciergeDesc}</span><Link href={'/'+s.locale+'/contact'}>{c.inquire}<ArrowUpRight size={16}/></Link></div><div><p>{c.share}</p>{DIRECTIONS.map(d=><Link key={d.id} href={'/signature-lab/'+s.locale+'/'+d.id} aria-current={d.id===concept?'page':undefined}>{d.id.toUpperCase()} / {d[s.locale]}</Link>)}</div></footer>}
function Desert({s}:{s:State}){const c=COPY[s.locale];return <>
 <div className={styles.desertHero}><div className={styles.desertLead}><span className={styles.kicker}>DUYUF · SAUDI PRIVATE MOBILITY</span><h1>{c.heroA}<em>{c.heroAS}</em></h1><p>{c.intro}</p><a href="#booking" className={styles.primaryAction}>{c.book}<ArrowLeft size={18}/></a><div className={styles.heroIndex}>01 — ARRIVAL / 05 — DESTINATION</div></div><div className={styles.desertFilm}><Video mediaClass={styles.film}/><div className={styles.frameLabel}>{c.service}</div></div></div>
 <section id="booking" className={styles.desertBooking}><div className={styles.bookingHeading}><span>THE CONCIERGE DESK / 01</span><h2>{c.ride}</h2><p>{c.actualBooking}</p></div><BookingControls s={s} variant="architectural"/><GuestReview locale={s.locale}/></section>
 <QuickFacts locale={s.locale}/>
 <VehicleStage s={s} mode="a"/>
 <section className={styles.pricingSection} id="pricing"><div className={styles.pricingHeadline}><span>PRIVATE FARES / 03</span><h2>{c.pricing}</h2><p>{c.priceCaption}</p></div><PriceRows s={s} mode="a"/><div className={styles.pricingBottom}><Steps locale={s.locale}/><a href="#booking">{c.ride}<ArrowLeft size={17}/></a></div></section>
 <Closing s={s} concept="desert"/>
 </>}
function Editorial({s}:{s:State}){const c=COPY[s.locale];return <>
 <section className={styles.editorialHero}><div className={styles.editionLabel}>THE PRIVATE JOURNEY / VOL. 01 <span>SAUDI ARABIA · VIP</span></div><div className={styles.editorialMast}><span>DUYUF / THE JOURNAL</span><h1>{c.heroB}</h1><p>{c.heroBS}</p></div><div className={styles.editorialFilm}><Video mediaClass={styles.film}/><span>01 / ARRIVAL</span></div><div className={styles.editorialSide}><p>{c.intro}</p><a href="#booking">{c.book}<ArrowLeft size={18}/></a><span>ARRIVAL / ROAD / COMFORT</span></div></section>
 <section className={styles.edBooking} id="booking"><div className={styles.edFolioHead}><span>RESERVATION / NO. 001</span><h2>{c.ride}</h2><p>{c.actualBooking}</p></div><div className={styles.edFolio}><aside><span>01—04</span><h3>{c.steps}</h3><Steps locale={s.locale}/><GuestReview locale={s.locale}/></aside><BookingControls s={s} variant="folio"/></div></section>
 <VehicleStage s={s} mode="b"/>
 <section id="pricing" className={styles.pricingSection}><div className={styles.edPriceTitle}><span>THE FARE INDEX / 04</span><h2>{c.pricing}</h2><p>{c.priceCaption}</p></div><PriceRows s={s} mode="b"/></section>
 <Closing s={s} concept="editorial"/>
 </>}
function Cinematic({s}:{s:State}){const c=COPY[s.locale];return <>
 <section className={styles.cinemaHero}><Video mediaClass={styles.cinemaFilm}/><div className={styles.cinemaShade}/><div className={styles.cinemaMid}><span>DUYUF / THE JOURNEY FILM</span><h1>{c.heroC}</h1><p>{c.heroCS}</p><a href="#booking">{c.book}<ArrowLeft size={18}/></a></div><div className={styles.cinemaLower}><span>SAUDI ARABIA · 24/7</span><span>01 / 05 · EXPERIENCE</span></div></section>
 <section id="booking" className={styles.cinemaBooking}><div className={styles.cinemaBookingIntro}><span>01 / PRIVATE JOURNEY</span><h2>{c.ride}</h2><p>{c.actualBooking}</p></div><BookingControls s={s} variant="cinema"/><GuestReview locale={s.locale}/></section>
 <VehicleStage s={s} mode="c"/>
 <section id="pricing" className={styles.pricingSection}><div className={styles.cinemaPriceTitle}><span>03 / EXACT ROUTE-BASED FARES</span><h2>{c.pricing}</h2><p>{c.priceCaption}</p></div><PriceRows s={s} mode="c"/><Steps locale={s.locale}/></section>
 <Closing s={s} concept="cinematic"/>
 </>}
export default function SignatureConceptExperience({concept,locale,fleet,rates}:Props){
 const [route,setRoute]=useState<string>('jeddah-airport-to-makkah'),[vehicle,setVehicle]=useState<number|null>(null);
 const [showcase,setShowcase]=useState<number>(concept==='editorial'?0:concept==='desert'?1:2),[interior,setInterior]=useState(false);
 const [guests,setGuests]=useState(2),[date,setDate]=useState('');
 const fare=vehicle===null?undefined:rates[route]?.[KEYS[fleet[vehicle].slug]];
 const bookingUrl=vehicle!==null&&typeof fare==='number'&&guests<=fleet[vehicle].passengers?'/'+locale+'/booking?'+new URLSearchParams({route,type:route.includes('ziyarat')?'ziyarat':'transfer',vehicle:fleet[vehicle].bookingParam,passengers:String(guests),...(date?{date}:{})}).toString():undefined;
 const s:State={route,setRoute,vehicle,setVehicle,showcase,setShowcase,interior,setInterior,guests,setGuests,date,setDate,fare,bookingUrl,locale,rates,fleet};
 return <div className={styles.studio} data-signature-preview="true" data-concept={concept} dir={locale==='ar'?'rtl':'ltr'}><StudioTabs concept={concept} locale={locale}/><SiteNav s={s} concept={concept}/>{concept==='desert'?<Desert s={s}/>:concept==='editorial'?<Editorial s={s}/>:<Cinematic s={s}/>}</div>;
}
