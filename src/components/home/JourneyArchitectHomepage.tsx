'use client';

import {useMemo,useRef,useState,useEffect,type FormEvent} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {ArrowLeft,ArrowRight,ArrowUpRight,Check,ChevronDown,Clock3,Compass,MapPin,Plane,ShieldCheck,Users,Luggage,CalendarDays,Wallet,CarFront} from 'lucide-react';
import type {Locale} from '@/i18n/config';
import type {Dictionary} from '@/i18n/get-dictionary';
import {APPROVED_5_FLEET} from '@/data/approved-fleet-homepage';
import {AUTHORITATIVE_TRANSFER_RATES,LOCALIZED_ROUTE_NAMES} from '@/lib/pricing-constants';
import {DUYUF_HOME_LAYOUT} from '@/data/duyuf-homepage-layout-copy';
import {HOMEPAGE_DECISION_COPY} from '@/data/duyuf-homepage-decision-copy';
import styles from './JourneyArchitectHomepage.module.css';

type Props={locale:Locale;dict:Dictionary};
const ROUTES=[
  'jeddah-airport-to-makkah','makkah-to-madinah',
  'madinah-airport-to-hotel','makkah-to-taif',
  'jeddah-airport-to-madinah','jeddah-to-taif',
  'riyadh-to-makkah','riyadh-to-madinah','makkah-ziyarat','madinah-ziyarat'
] as const;
const SHOWCASED_ROUTES=[
  {slug:'jeddah-airport-to-makkah',image:'/assets/homepage-v2/route-jeddah-makkah.jpg',code:'JED — MKK'},
  {slug:'makkah-to-madinah',image:'/assets/homepage-v2/route-makkah-madinah.jpg',code:'MKK — MED'},
  {slug:'madinah-airport-to-hotel',image:'/assets/homepage-v2/route-madinah-hotel.jpg',code:'MED — HOTEL'},
  {slug:'makkah-to-taif',image:'/assets/images/routes/makkah-to-taif.jpg',code:'MKK — TIF'},
] as const;
const FARE_KEYS:Record<string,string>={
 'toyota-camry':'camry','hyundai-staria':'staria',
 'gmc-yukon-xl':'yukon','toyota-hiace':'hiace','toyota-coaster':'coaster'
};
const NOTES:Record<Locale,{airport:string;step:string;starting:string;view:string;inside:string;outside:string;arrival:string;number:string;ticket:string;journey:string;route:string;fare:string;byCar:string;allRoutes:string;allFleet:string;facts:string;miqat:string;child:string;pay:string;readMore:string;faq:string;submit:string;guests:string;date:string;noFare:string;select:string;story:string;ask:string;sections:string}>={
 ar:{airport:'استقبال المطار',step:'ابدأ رحلتك',starting:'من',view:'اكتشف الرحلة',inside:'داخل المقصورة',outside:'الشكل الخارجي',arrival:'رحلة تبدأ بالعناية',number:'من خمسة اختيارات',ticket:'تفاصيل رحلتك',journey:'رحلتك بين مدن المملكة',route:'اختر مسارك',fare:'السعر للسيارة',byCar:'السيارة المختارة',allRoutes:'كل المسارات',allFleet:'شاهد الأسطول بالكامل',facts:'ما يهمك قبل الوصول',miqat:'توقف مجاني بالميقات للمسارات المؤهلة',child:'مقاعد أطفال عند الطلب',pay:'الدفع نقدًا للسائق بعد الرحلة',readMore:'اقرأ المزيد',faq:'قبل أن تسافر',submit:'متابعة طلب الحجز',guests:'الركاب',date:'تاريخ السفر',noFare:'يُحدد السعر بعد اختيار المسار',select:'اختر مركبتك',story:'من المطار إلى الوجهة',ask:'هل لديك استفسار؟',sections:'مراحل الرحلة'},
 en:{airport:'Airport arrival',step:'Begin your journey',starting:'From',view:'Explore journey',inside:'Interior',outside:'Exterior',arrival:'Care starts at arrival',number:'Five distinct choices',ticket:'Your journey details',journey:'Across the Kingdom',route:'Choose a route',fare:'Fare per vehicle',byCar:'Selected vehicle',allRoutes:'All routes',allFleet:'Explore the full fleet',facts:'Before you arrive',miqat:'Complimentary Miqat stop on eligible trips',child:'Child seats on request',pay:'Cash to driver after the journey',readMore:'Read more',faq:'Before you travel',submit:'Continue booking request',guests:'Guests',date:'Travel date',noFare:'Select a route for exact fares',select:'Choose your vehicle',story:'Arrival to destination',ask:'Questions about your ride?',sections:'Journey chapters'},
 ms:{airport:'Ketibaan lapangan terbang',step:'Mulakan perjalanan',starting:'Dari',view:'Terokai perjalanan',inside:'Dalaman',outside:'Luaran',arrival:'Keprihatinan sejak ketibaan',number:'Lima pilihan',ticket:'Maklumat perjalanan',journey:'Merentasi Arab Saudi',route:'Pilih laluan',fare:'Tambang setiap kenderaan',byCar:'Kenderaan pilihan',allRoutes:'Semua laluan',allFleet:'Lihat semua kenderaan',facts:'Sebelum tiba',miqat:'Persinggahan Miqat percuma untuk laluan layak',child:'Kerusi kanak-kanak atas permintaan',pay:'Tunai kepada pemandu selepas perjalanan',readMore:'Baca lagi',faq:'Sebelum perjalanan',submit:'Teruskan permintaan tempahan',guests:'Tetamu',date:'Tarikh',noFare:'Pilih laluan untuk tambang',select:'Pilih kenderaan',story:'Ketibaan hingga destinasi',ask:'Ada pertanyaan?',sections:'Bab perjalanan'},
 id:{airport:'Kedatangan bandara',step:'Mulai perjalanan',starting:'Mulai',view:'Jelajahi perjalanan',inside:'Interior',outside:'Eksterior',arrival:'Perhatian sejak kedatangan',number:'Lima pilihan',ticket:'Detail perjalanan',journey:'Menjelajahi Arab Saudi',route:'Pilih rute',fare:'Tarif per kendaraan',byCar:'Kendaraan pilihan',allRoutes:'Semua rute',allFleet:'Lihat armada',facts:'Sebelum tiba',miqat:'Berhenti Miqat gratis pada rute yang sesuai',child:'Kursi anak sesuai permintaan',pay:'Tunai ke pengemudi setelah perjalanan',readMore:'Baca lebih lanjut',faq:'Sebelum perjalanan',submit:'Lanjutkan permintaan',guests:'Tamu',date:'Tanggal',noFare:'Pilih rute untuk tarif',select:'Pilih kendaraan',story:'Dari kedatangan ke tujuan',ask:'Ada pertanyaan?',sections:'Tahapan perjalanan'},
 ur:{airport:'ہوائی اڈے پر استقبال',step:'سفر شروع کریں',starting:'از',view:'سفر دیکھیں',inside:'اندرونی حصہ',outside:'بیرونی حصہ',arrival:'آمد سے خصوصی خیال',number:'پانچ انتخاب',ticket:'آپ کے سفر کی تفصیل',journey:'سعودی عرب میں سفر',route:'راستہ منتخب کریں',fare:'فی گاڑی کرایہ',byCar:'منتخب گاڑی',allRoutes:'تمام راستے',allFleet:'تمام گاڑیاں دیکھیں',facts:'آمد سے پہلے',miqat:'اہل راستوں پر مفت میقات توقف',child:'درخواست پر بچوں کی نشستیں',pay:'سفر کے بعد ڈرائیور کو نقد ادائیگی',readMore:'مزید پڑھیں',faq:'سفر سے پہلے',submit:'بکنگ درخواست جاری رکھیں',guests:'مسافر',date:'تاریخ',noFare:'راستہ منتخب کریں',select:'گاڑی منتخب کریں',story:'آمد سے منزل تک',ask:'سوالات ہیں؟',sections:'سفر کے مراحل'},
 fr:{airport:'Arrivée à l’aéroport',step:'Commencer le voyage',starting:'Dès',view:'Découvrir le trajet',inside:'Intérieur',outside:'Extérieur',arrival:'Attention dès l’arrivée',number:'Cinq possibilités',ticket:'Votre trajet',journey:'À travers le Royaume',route:'Choisir un trajet',fare:'Tarif par véhicule',byCar:'Véhicule sélectionné',allRoutes:'Tous les trajets',allFleet:'Toute la flotte',facts:'Avant votre arrivée',miqat:'Arrêt Miqat offert sur itinéraires éligibles',child:'Sièges enfants sur demande',pay:'Espèces au chauffeur après le trajet',readMore:'Lire plus',faq:'Avant de voyager',submit:'Poursuivre la demande',guests:'Voyageurs',date:'Date',noFare:'Choisissez un trajet',select:'Choisir un véhicule',story:'De l’arrivée à destination',ask:'Une question ?',sections:'Étapes du voyage'},
 es:{airport:'Llegada al aeropuerto',step:'Comienza el viaje',starting:'Desde',view:'Explorar viaje',inside:'Interior',outside:'Exterior',arrival:'Atención desde la llegada',number:'Cinco opciones',ticket:'Tu viaje',journey:'Por el Reino',route:'Elegir ruta',fare:'Precio por vehículo',byCar:'Vehículo elegido',allRoutes:'Todas las rutas',allFleet:'Toda la flota',facts:'Antes de llegar',miqat:'Parada Miqat gratis en rutas elegibles',child:'Sillas infantiles bajo petición',pay:'Efectivo al conductor al terminar',readMore:'Leer más',faq:'Antes de viajar',submit:'Continuar solicitud',guests:'Viajeros',date:'Fecha',noFare:'Elige ruta para ver tarifa',select:'Elige vehículo',story:'De la llegada al destino',ask:'¿Alguna pregunta?',sections:'Etapas del viaje'},
 de:{airport:'Ankunft am Flughafen',step:'Reise beginnen',starting:'Ab',view:'Route entdecken',inside:'Innenraum',outside:'Außenansicht',arrival:'Betreuung ab Ankunft',number:'Fünf Optionen',ticket:'Ihre Fahrt',journey:'Durch das Königreich',route:'Route auswählen',fare:'Preis je Fahrzeug',byCar:'Gewähltes Fahrzeug',allRoutes:'Alle Routen',allFleet:'Gesamte Flotte',facts:'Vor der Ankunft',miqat:'Kostenloser Miqat-Halt auf geeigneten Strecken',child:'Kindersitze auf Anfrage',pay:'Barzahlung nach der Fahrt',readMore:'Mehr erfahren',faq:'Vor der Reise',submit:'Buchungsanfrage fortsetzen',guests:'Reisende',date:'Datum',noFare:'Route für Preise wählen',select:'Fahrzeug wählen',story:'Von der Ankunft zum Ziel',ask:'Noch Fragen?',sections:'Reiseabschnitte'},
 tr:{airport:'Havalimanı varışı',step:'Yolculuğa başlayın',starting:'Başlangıç',view:'Yolculuğu keşfet',inside:'İç mekan',outside:'Dış görünüm',arrival:'Varıştan itibaren özen',number:'Beş araç seçeneği',ticket:'Yolculuk detayları',journey:'Krallık boyunca',route:'Rota seçin',fare:'Araç başına ücret',byCar:'Seçilen araç',allRoutes:'Tüm rotalar',allFleet:'Tüm araçlar',facts:'Varıştan önce',miqat:'Uygun rotalarda ücretsiz Miqat molası',child:'İstek üzerine çocuk koltuğu',pay:'Yolculuk sonrası nakit ödeme',readMore:'Devamını oku',faq:'Yolculuk öncesi',submit:'Rezervasyon talebine devam',guests:'Yolcu',date:'Tarih',noFare:'Ücret için rota seçin',select:'Araç seçin',story:'Varıştan hedefe',ask:'Sorunuz var mı?',sections:'Yolculuk aşamaları'},
 hi:{airport:'एयरपोर्ट आगमन',step:'यात्रा शुरू करें',starting:'शुरू',view:'यात्रा देखें',inside:'अंदरूनी भाग',outside:'बाहरी दृश्य',arrival:'आगमन से देखभाल',number:'पाँच वाहन',ticket:'यात्रा विवरण',journey:'सऊदी अरब में यात्रा',route:'मार्ग चुनें',fare:'प्रति वाहन किराया',byCar:'चुना वाहन',allRoutes:'सभी मार्ग',allFleet:'सभी वाहन',facts:'आगमन से पहले',miqat:'योग्य मार्गों पर मुफ्त मीक़ात ठहराव',child:'अनुरोध पर बाल सीटें',pay:'यात्रा के बाद नकद भुगतान',readMore:'और पढ़ें',faq:'यात्रा से पहले',submit:'बुकिंग अनुरोध जारी रखें',guests:'यात्री',date:'तारीख',noFare:'किराए के लिए मार्ग चुनें',select:'वाहन चुनें',story:'आगमन से गंतव्य',ask:'कोई सवाल?',sections:'यात्रा के चरण'},
};
function FullArrow({rtl}:{rtl:boolean}){return rtl?<ArrowLeft size={18} aria-hidden="true"/>:<ArrowRight size={18} aria-hidden="true"/>;}
function carFare(route:string,car:string){const key=FARE_KEYS[car];const amount=key?AUTHORITATIVE_TRANSFER_RATES[route]?.[key]:undefined;return typeof amount==='number'&&Number.isFinite(amount)&&amount>0?amount:undefined;}
export function JourneyArchitectHomepage({locale,dict}:Props){
 const router=useRouter();const rtl=locale==='ar'||locale==='ur';const n=NOTES[locale];const c=DUYUF_HOME_LAYOUT[locale];const dec=HOMEPAGE_DECISION_COPY[locale];
 const [route,setRoute]=useState<string>('jeddah-airport-to-makkah');
 const [people,setPeople]=useState('2');const [date,setDate]=useState('');
 const [routeFocus,setRouteFocus]=useState(0);const [vehicleFocus,setVehicleFocus]=useState(0);
 const [interior,setInterior]=useState(false);const [chapter,setChapter]=useState(0);
 const [openFaq,setOpenFaq]=useState<number|null>(0);
 const video=useRef<HTMLVideoElement|null>(null);
 const currentRoute=SHOWCASED_ROUTES[routeFocus];
 const vehicle=APPROVED_5_FLEET[vehicleFocus];
 const selectedFare=carFare(currentRoute.slug,vehicle.bookingParam);
 const num=new Intl.NumberFormat(locale==='ar'?'ar-SA':'en-US');
 const faq=[{q:dict.faq.q2,a:dict.faq.a2},{q:dict.faq.q3,a:dict.faq.a3},{q:dict.faq.q5,a:dict.faq.a5},{q:dict.faq.q9,a:dict.faq.a9}];
 const scenes=[
  {title:c.arrivalTitle,desc:c.arrivalDesc,image:'/assets/homepage-v2/route-jeddah-makkah.jpg'},
  {title:c.familyTitle,desc:c.familyDesc,image:'/assets/homepage-v2/vehicle-interior-cta.jpg'},
  {title:c.miqatTitle,desc:c.miqatDesc,image:'/assets/homepage-v2/route-makkah-madinah.jpg'},
  {title:c.destinationTitle,desc:c.destinationDesc,image:'/assets/homepage-v2/route-madinah-hotel.jpg'},
 ];
 const minDate=useMemo(()=>{
  const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Riyadh',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const part=(type:string)=>parts.find(x=>x.type===type)?.value||'';
  return [part('year'),part('month'),part('day')].join('-');
 },[]);
 useEffect(()=>{
  const v=video.current;if(!v)return;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const toggle=()=>{if(motion.matches){v.pause();v.currentTime=0;}else void v.play().catch(()=>{});};
  toggle();motion.addEventListener('change',toggle);
  return()=>motion.removeEventListener('change',toggle);
 },[]);
 function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();
  if(!route)return;
  const p=new URLSearchParams({route,passengers:people,type:route.includes('ziyarat')?'ziyarat':'transfer'});
  if(date)p.set('date',date);
  router.push('/'+locale+'/booking?'+p.toString());
 }
 const heroFirst=locale==='ar'?'رحلتك تستحق':locale==='en'?'Your Journey,':dict.hero.titlePart1;
 const heroSecond=locale==='ar'?'عناية استثنائية.':locale==='en'?'Our Priority.':dict.hero.titlePart2;
 return <main className={styles.site} dir={rtl?'rtl':'ltr'}>
   {/* ACT 01: cinematic full-viewport arrival, not a card-based transport header */}
   <section className={styles.cinema} aria-labelledby="new-home-title">
    <video ref={video} className={styles.cinemaFilm} muted autoPlay loop playsInline preload="metadata"
      poster="/assets/homepage-v2/hero-poster.jpg" aria-hidden="true" tabIndex={-1}>
      <source media="(max-width:767px)" src="/assets/homepage-v2/hero-mobile.webm" type="video/webm"/>
      <source media="(max-width:767px)" src="/assets/homepage-v2/hero-mobile.mp4" type="video/mp4"/>
      <source src="/assets/homepage-v2/hero.webm" type="video/webm"/>
      <source src="/assets/homepage-v2/hero.mp4" type="video/mp4"/>
    </video>
    <div className={styles.cinemaShade}/>
    <div className={styles.cinemaTop}><span>DUYUF AL RAHMAN VIP</span><span>SAUDI ARABIA / PRIVATE JOURNEYS</span></div>
    <div className={styles.cinemaBody}>
      <div className={styles.cinemaLine}><span className={styles.cinemaIndex}>01 / ARRIVAL</span><span className={styles.cinemaRule}/></div>
      <p className={styles.cinemaKicker}>{dict.hero.eyebrow}</p>
      <h1 id="new-home-title">{heroFirst}<em>{heroSecond}</em></h1>
      <p className={styles.cinemaIntro}>{dict.hero.description}</p>
      <div className={styles.cinemaLinks}>
        <a href="#journey-ticket" className={styles.lightCta}>{n.step}<FullArrow rtl={rtl}/></a>
        <a href="#private-fleet" className={styles.ghostCta}>{dict.nav.fleet}<ArrowUpRight size={18} aria-hidden="true"/></a>
      </div>
    </div>
    <div className={styles.cinemaBottom}>
      <span><Plane size={16} aria-hidden="true"/>{n.airport}</span>
      <span><ShieldCheck size={16} aria-hidden="true"/>{n.pay}</span>
      <span className={styles.cinemaScroll}>SCROLL / 01—06</span>
    </div>
   </section>

   {/* ACT 02: a booking ticket, not another heading + floating card */}
   <section className={styles.ticketZone} id="journey-ticket" aria-label={n.ticket}>
    <div className={styles.ticketMeta}><span>BOOKING DESK / 02</span><span>{dict.booking_card.noPrepayNotice}</span></div>
    <form className={styles.ticket} onSubmit={submit}>
      <div className={styles.ticketIdentity}>
       <span className={styles.ticketStamp}><CarFront size={24} aria-hidden="true"/> VIP / TRANSFER</span>
       <strong>{n.ticket}</strong><small>{n.pay}</small>
      </div>
      <label className={styles.ticketField}><span><MapPin size={15} aria-hidden="true"/>{n.route}</span>
        <select value={route} onChange={e=>setRoute(e.target.value)} required>
          {ROUTES.map(x=><option key={x} value={x}>{LOCALIZED_ROUTE_NAMES[x]?.[locale]||x}</option>)}
        </select>
      </label>
      <label className={styles.ticketField}><span><CalendarDays size={15} aria-hidden="true"/>{n.date}</span>
       <input type="date" min={minDate} value={date} onChange={e=>setDate(e.target.value)}/>
      </label>
      <label className={styles.ticketField}><span><Users size={15} aria-hidden="true"/>{n.guests}</span>
       <select value={people} onChange={e=>setPeople(e.target.value)}>
        {Array.from({length:21},(_,i)=>i+1).map(i=><option key={i} value={i}>{i}</option>)}
       </select>
      </label>
      <button className={styles.ticketGo} type="submit"><span>{n.submit}</span><FullArrow rtl={rtl}/></button>
    </form>
   </section>

   {/* ACT 03: living photographic route atlas, with fares from authoritative source */}
   <section className={styles.routeAtlas} id="route-atlas" aria-labelledby="atlas-heading">
    <div className={styles.atlasHeading}><div><span className={styles.overline}>03 / THE ROUTE ATLAS</span><h2 id="atlas-heading">{n.journey}</h2></div>
      <Link href={'/'+locale+'/routes'} className={styles.textLink}>{n.allRoutes}<ArrowUpRight size={17} aria-hidden="true"/></Link>
    </div>
    <div className={styles.atlasStage}>
      <div className={styles.atlasImage}>
        <Image key={currentRoute.slug} src={currentRoute.image} fill alt="" sizes="(max-width:760px) 100vw, 60vw" className={styles.atlasPhoto}/>
        <span className={styles.photoSerial}>0{routeFocus+1} / 04</span>
        <div className={styles.atlasCaption}><span>{currentRoute.code}</span><strong>{LOCALIZED_ROUTE_NAMES[currentRoute.slug]?.[locale]}</strong></div>
      </div>
      <div className={styles.atlasLedger}>
       <div className={styles.atlasLedgerTop}><span>{n.route}</span><Compass size={21} aria-hidden="true"/></div>
       <div className={styles.routeOptions} role="group" aria-label={n.route}>
        {SHOWCASED_ROUTES.map((r,i)=><button type="button" key={r.slug}
          aria-pressed={routeFocus===i} onClick={()=>{setRouteFocus(i);setRoute(r.slug);}}>
          <span>0{i+1}</span><strong>{LOCALIZED_ROUTE_NAMES[r.slug]?.[locale]}</strong><ArrowUpRight size={16} aria-hidden="true"/>
        </button>)}
       </div>
       <div className={styles.atlasFare}>
         <div><span>{n.fare}</span><strong>{num.format(AUTHORITATIVE_TRANSFER_RATES[currentRoute.slug]?.camry||0)} <small>SAR</small></strong></div>
         <Link href={'/'+locale+'/booking?route='+currentRoute.slug+'&vehicle=toyota-camry'}>
          {n.view}<FullArrow rtl={rtl}/>
         </Link>
       </div>
      </div>
    </div>
   </section>

   {/* ACT 04: one monumental automotive showroom, not another vehicle card grid */}
   <section className={styles.fleetMuseum} id="private-fleet" aria-labelledby="museum-heading">
      <div className={styles.museumHead}><span className={styles.overline}>04 / THE PRIVATE FLEET</span>
       <h2 id="museum-heading">{c.interiorTitle}</h2><p>{c.interiorSubtitle}</p>
      </div>
      <div className={styles.museum}>
        <div className={styles.museumIndex}>
         <span className={styles.museumCounter}>0{vehicleFocus+1} <i>/ 05</i></span>
         <div className={styles.museumCarNames} role="group" aria-label={n.select}>
          {APPROVED_5_FLEET.map((car,i)=><button type="button" key={car.id} aria-pressed={i===vehicleFocus}
            onClick={()=>{setVehicleFocus(i);setInterior(false);}}>
            <span>0{i+1}</span><strong>{car.name[locale]||car.name.en}</strong>
          </button>)}
         </div>
        </div>
        <div className={styles.museumDisplay}>
          <div className={styles.museumImage}>
           <Image key={vehicle.id+(interior?'inside':'outside')}
             src={interior?vehicle.interiorImage:vehicle.exteriorImage} fill
             alt={(vehicle.name[locale]||vehicle.name.en)+' — '+(interior?n.inside:n.outside)}
             sizes="(max-width:780px) 100vw, 60vw" className={interior?styles.museumInterior:styles.museumExterior}/>
          </div>
          <div className={styles.museumSwitch} role="group" aria-label={n.select}>
           <button type="button" aria-pressed={!interior} onClick={()=>setInterior(false)}>{n.outside}</button>
           <button type="button" aria-pressed={interior} onClick={()=>setInterior(true)}>{n.inside}</button>
          </div>
        </div>
        <div className={styles.museumInfo}>
         <span className={styles.museumClass}>{vehicle.categoryBadge[locale]||vehicle.categoryBadge.en}</span>
         <h3>{vehicle.name[locale]||vehicle.name.en}</h3>
         <div className={styles.museumStats}><span><Users size={16} aria-hidden="true"/>{vehicle.passengers}</span><span><Luggage size={16} aria-hidden="true"/>{vehicle.luggage}</span></div>
         <p>{vehicle.summary[locale]||c.interiorSubtitle}</p>
         <div className={styles.museumCost}><span>{LOCALIZED_ROUTE_NAMES['jeddah-airport-to-makkah']?.[locale]}</span>
          <strong>{num.format(carFare('jeddah-airport-to-makkah',vehicle.bookingParam)||vehicle.startingPriceSAR)} <small>SAR</small></strong>
         </div>
         <div className={styles.museumActions}>
          <Link href={'/'+locale+'/booking?route=jeddah-airport-to-makkah&vehicle='+vehicle.bookingParam} className={styles.darkCta}>{n.submit}<FullArrow rtl={rtl}/></Link>
          <Link href={'/'+locale+'/fleet/'+vehicle.slug} className={styles.textLink}>{n.readMore}<ArrowUpRight size={17} aria-hidden="true"/></Link>
         </div>
        </div>
      </div>
      <Link href={'/'+locale+'/fleet'} className={styles.fleetEnd}>{n.allFleet}<ArrowUpRight size={17} aria-hidden="true"/></Link>
   </section>

   {/* ACT 05: one-image travel essay, not four similar hospitality cards */}
   <section className={styles.travelEssay} id="journey-story" aria-labelledby="essay-heading">
      <div className={styles.essayCaption}><span className={styles.overline}>05 / THE GUEST EXPERIENCE</span><h2 id="essay-heading">{n.story}</h2>
       <p>{c.interiorSubtitle}</p>
      </div>
      <div className={styles.essayBody}>
       <div className={styles.essayImage}>
         <Image key={chapter} src={scenes[chapter].image} fill alt="" sizes="(max-width:760px) 100vw, 56vw" className={styles.essayPhoto}/>
         <span>0{chapter+1} / 04</span>
       </div>
       <div className={styles.essayAside}>
         <div className={styles.essayChapters} role="group" aria-label={n.sections}>
         {scenes.map((x,i)=><button type="button" key={x.title} aria-pressed={chapter===i} onClick={()=>setChapter(i)}>
            <span>0{i+1}</span><strong>{x.title}</strong><ChevronDown size={17} aria-hidden="true"/>
           </button>)}
         </div>
         <div className={styles.essayNarrative}><span>0{chapter+1} / 04</span><h3>{scenes[chapter].title}</h3><p>{scenes[chapter].desc}</p>
           <Link href={'/'+locale+'/services'}>{dict.nav.services}<ArrowUpRight size={17} aria-hidden="true"/></Link>
         </div>
       </div>
      </div>
   </section>

   {/* ACT 06: transparent operational facts, typography not a row of cloned cards */}
   <section className={styles.truthStrip} aria-label={n.facts}>
      <div className={styles.truthHead}><span>06 / SERVICE PROMISE</span><h2>{n.facts}</h2></div>
      <div className={styles.truthCells}>
       <div><span className={styles.truthNumber}>60<span>MIN</span></span><p>{c.arrivalDesc}</p></div>
       <div><span className={styles.truthNumber}>24/7</span><p>{n.airport} · {dict.nav.contact}</p></div>
       <div><span className={styles.truthNumber}>30–45<span>MIN</span></span><p>{n.miqat}</p></div>
      </div>
      <p className={styles.truthNote}><ShieldCheck size={17} aria-hidden="true"/>{n.pay}</p>
   </section>

   {/* ACT 07: a quiet FAQ reading room, no decorative card forest */}
   <section className={styles.questionRoom} aria-labelledby="questions-heading">
      <div className={styles.questionIntro}><span className={styles.overline}>07 / PREPARE YOUR JOURNEY</span><h2 id="questions-heading">{n.faq}</h2>
       <p>{dict.faq.subtitle}</p>
       <Image src="/assets/homepage-v2/ziyarat-haram.jpg" alt="" width={530} height={430} className={styles.questionPhoto}/>
      </div>
      <div className={styles.questions}>
       {faq.map((item,i)=><div key={i} className={styles.question}>
         <button type="button" aria-expanded={openFaq===i} aria-controls={'architect-faq-'+i}
          onClick={()=>setOpenFaq(openFaq===i?null:i)}>
          <span>0{i+1}</span><strong>{item.q}</strong><ChevronDown size={18} aria-hidden="true"/></button>
         {openFaq===i&&<p id={'architect-faq-'+i}>{item.a}</p>}
       </div>)}
       <Link href={'/'+locale+'/faq'} className={styles.textLink}>{dict.nav.guides} / FAQ <ArrowUpRight size={16}/></Link>
      </div>
   </section>
   <div className={styles.endNote}><span>{dict.hero.eyebrow}</span><Link href={'/'+locale+'/booking'}>{n.step}<FullArrow rtl={rtl}/></Link></div>
 </main>;
}
