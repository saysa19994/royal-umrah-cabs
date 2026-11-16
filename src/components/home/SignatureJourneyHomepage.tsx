'use client';

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, CarFront, Check,
  ChevronDown, Clock3, Compass, Luggage, MapPin, Plane, ShieldCheck, Users, Wallet,
} from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { APPROVED_5_FLEET } from '@/data/approved-fleet-homepage';
import { AUTHORITATIVE_TRANSFER_RATES, LOCALIZED_ROUTE_NAMES } from '@/lib/pricing-constants';
import { HOMEPAGE_DECISION_COPY } from '@/data/duyuf-homepage-decision-copy';
import { DUYUF_HOME_LAYOUT } from '@/data/duyuf-homepage-layout-copy';
import styles from './SignatureJourneyHomepage.module.css';

interface Props { locale: Locale; dict: Dictionary; }
interface PageLabels {
  kicker:string; heroLead:string; heroAccent:string; book:string; viewFleet:string;
  search:string; explore:string; routeIntro:string; routeTitle:string;
  fareEyebrow:string; fromFare:string; showroom:string; showroomIntro:string;
  experience:string; experienceIntro:string; reassurance:string; reassuranceIntro:string;
  quickRoute:string; date:string; travelers:string; bags:string; sar:string;
  payment:string; included:string; next:string; faqIntro:string;
}
const UI: Record<Locale, PageLabels> = {
  ar:{kicker:'نقل خاص · المملكة العربية السعودية',heroLead:'رحلتك تستحق',heroAccent:'عناية استثنائية.',book:'احجز رحلتك الخاصة',viewFleet:'اكتشف الأسطول',search:'اختر سيارتك',explore:'استكشف الرحلات',routeIntro:'وجهتك، على طريقتك',routeTitle:'رحلات صُممت حولك.',fareEyebrow:'أسعار المركبات لهذا المسار',fromFare:'السعر حسب المركبة',showroom:'السيارة المناسبة لكل رحلة.',showroomIntro:'اختر السيارة واستعرض مساحتها وتجهيزاتها قبل إرسال طلب الحجز.',experience:'كل رحلة قصة من العناية.',experienceIntro:'من لحظة الاستقبال حتى الوصول، تفاصيل مدروسة لتسافر براحة.',reassurance:'تفاصيل تمنحك راحة البال',reassuranceIntro:'خدمة واضحة قبل الرحلة وأثناءها، دون أي دفعة مقدمة.',quickRoute:'مسار الرحلة',date:'تاريخ الرحلة',travelers:'المسافرون',bags:'الحقائب',sar:'ر.س',payment:'تدفع نقدًا للسائق بعد إتمام الرحلة',included:'السعر يشمل الضريبة والوقود ورسوم الطريق والمطار',next:'اختر هذه المركبة',faqIntro:'إجابات مهمة قبل أن تبدأ رحلتك'},
  en:{kicker:'PRIVATE TRANSFERS · SAUDI ARABIA',heroLead:'Your Journey,',heroAccent:'Our Priority.',book:'Book Your Private Ride',viewFleet:'Explore the fleet',search:'Find your vehicle',explore:'Explore routes',routeIntro:'YOUR JOURNEY, YOUR WAY',routeTitle:'Journeys made around you.',fareEyebrow:'Vehicle fares for this route',fromFare:'Fare by vehicle',showroom:'The right vehicle for every journey.',showroomIntro:'Choose your vehicle and explore the cabin before sending a booking request.',experience:'Every journey deserves care.',experienceIntro:'From arrival to destination, thoughtful details make travel more comfortable.',reassurance:'Details that offer peace of mind',reassuranceIntro:'Clear service before and during your ride, with no advance payment.',quickRoute:'Your journey',date:'Travel date',travelers:'Travelers',bags:'Bags',sar:'SAR',payment:'Pay the driver in cash after your completed journey',included:'VAT, fuel, road fees and airport parking included',next:'Choose this vehicle',faqIntro:'Useful answers before you travel'},
  ms:{kicker:'PENGANGKUTAN PERIBADI · ARAB SAUDI',heroLead:'Perjalanan anda,',heroAccent:'keutamaan kami.',book:'Tempah perjalanan peribadi',viewFleet:'Lihat armada',search:'Cari kenderaan',explore:'Teroka laluan',routeIntro:'PERJALANAN ANDA',routeTitle:'Perjalanan mengikut keperluan anda.',fareEyebrow:'Tambang kenderaan bagi laluan ini',fromFare:'Tambang mengikut kenderaan',showroom:'Kenderaan sesuai untuk setiap perjalanan.',showroomIntro:'Pilih kenderaan dan teroka kabinnya sebelum menghantar permintaan.',experience:'Setiap perjalanan penuh perhatian.',experienceIntro:'Dari ketibaan hingga destinasi, kami menjaga keselesaan anda.',reassurance:'Butiran yang memberi ketenangan',reassuranceIntro:'Perkhidmatan jelas tanpa bayaran pendahuluan.',quickRoute:'Laluan',date:'Tarikh',travelers:'Penumpang',bags:'Bagasi',sar:'SAR',payment:'Bayar tunai kepada pemandu selepas perjalanan',included:'Cukai, bahan api, tol dan parkir lapangan terbang termasuk',next:'Pilih kenderaan',faqIntro:'Jawapan sebelum perjalanan'},
  id:{kicker:'TRANSPORTASI PRIVAT · ARAB SAUDI',heroLead:'Perjalanan Anda,',heroAccent:'prioritas kami.',book:'Pesan perjalanan privat',viewFleet:'Jelajahi armada',search:'Cari kendaraan',explore:'Jelajahi rute',routeIntro:'PERJALANAN ANDA',routeTitle:'Perjalanan sesuai kebutuhan Anda.',fareEyebrow:'Tarif kendaraan untuk rute ini',fromFare:'Tarif per kendaraan',showroom:'Kendaraan yang tepat untuk setiap perjalanan.',showroomIntro:'Pilih kendaraan dan lihat kabin sebelum mengirim permintaan.',experience:'Setiap perjalanan penuh perhatian.',experienceIntro:'Dari kedatangan hingga tujuan, kami menjaga kenyamanan Anda.',reassurance:'Detail yang menenangkan',reassuranceIntro:'Layanan jelas tanpa pembayaran di muka.',quickRoute:'Rute',date:'Tanggal',travelers:'Penumpang',bags:'Koper',sar:'SAR',payment:'Bayar tunai kepada pengemudi setelah perjalanan',included:'Pajak, bahan bakar, tol dan parkir bandara termasuk',next:'Pilih kendaraan ini',faqIntro:'Jawaban sebelum perjalanan'},
  ur:{kicker:'نجی ٹرانسفر · سعودی عرب',heroLead:'آپ کا سفر،',heroAccent:'ہماری ترجیح۔',book:'نجی سفر بک کریں',viewFleet:'گاڑیاں دیکھیں',search:'گاڑی منتخب کریں',explore:'راستے دیکھیں',routeIntro:'آپ کا سفر',routeTitle:'آپ کی ضرورت کے مطابق سفر۔',fareEyebrow:'اس راستے کے لیے گاڑی کا کرایہ',fromFare:'گاڑی کے مطابق کرایہ',showroom:'ہر سفر کے لیے مناسب گاڑی۔',showroomIntro:'درخواست بھیجنے سے پہلے گاڑی اور کیبن دیکھیں۔',experience:'ہر سفر میں خیال رکھا جاتا ہے۔',experienceIntro:'آمد سے منزل تک آرام اور توجہ۔',reassurance:'اطمینان کی تفصیلات',reassuranceIntro:'پیشگی ادائیگی کے بغیر واضح سروس۔',quickRoute:'سفر کا راستہ',date:'تاریخ سفر',travelers:'مسافر',bags:'سامان',sar:'SAR',payment:'سفر مکمل ہونے کے بعد ڈرائیور کو نقد ادائیگی',included:'ٹیکس، ایندھن، ٹول اور ایئرپورٹ پارکنگ شامل',next:'یہ گاڑی منتخب کریں',faqIntro:'سفر سے پہلے اہم جوابات'},
  fr:{kicker:'TRANSFERTS PRIVÉS · ARABIE SAOUDITE',heroLead:'Votre voyage,',heroAccent:'notre priorité.',book:'Réserver un trajet privé',viewFleet:'Découvrir la flotte',search:'Choisir un véhicule',explore:'Explorer les itinéraires',routeIntro:'VOTRE VOYAGE',routeTitle:'Des trajets pensés pour vous.',fareEyebrow:'Tarifs des véhicules pour ce trajet',fromFare:'Tarif par véhicule',showroom:'Le bon véhicule pour chaque trajet.',showroomIntro:'Choisissez votre véhicule et découvrez son intérieur avant votre demande.',experience:'Chaque trajet mérite de l’attention.',experienceIntro:'De l’arrivée à la destination, un voyage plus confortable.',reassurance:'Des détails rassurants',reassuranceIntro:'Un service clair, sans paiement anticipé.',quickRoute:'Votre trajet',date:'Date',travelers:'Voyageurs',bags:'Bagages',sar:'SAR',payment:'Payez le chauffeur en espèces après le trajet',included:'TVA, carburant, péages et parking aéroport inclus',next:'Choisir ce véhicule',faqIntro:'Réponses utiles avant de partir'},
  es:{kicker:'TRASLADOS PRIVADOS · ARABIA SAUDITA',heroLead:'Tu viaje,',heroAccent:'nuestra prioridad.',book:'Reserva tu traslado privado',viewFleet:'Ver flota',search:'Elegir vehículo',explore:'Explorar rutas',routeIntro:'TU VIAJE',routeTitle:'Viajes diseñados para ti.',fareEyebrow:'Tarifas por vehículo para esta ruta',fromFare:'Tarifa por vehículo',showroom:'El vehículo adecuado para cada viaje.',showroomIntro:'Elige tu vehículo y conoce su interior antes de solicitar la reserva.',experience:'Cada viaje merece atención.',experienceIntro:'Desde la llegada hasta tu destino, cuidamos cada detalle.',reassurance:'Detalles que dan tranquilidad',reassuranceIntro:'Servicio claro y sin pago anticipado.',quickRoute:'Ruta',date:'Fecha',travelers:'Pasajeros',bags:'Maletas',sar:'SAR',payment:'Paga en efectivo al conductor después del viaje',included:'IVA, combustible, peajes y estacionamiento incluidos',next:'Elegir este vehículo',faqIntro:'Respuestas antes de viajar'},
  de:{kicker:'PRIVATTRANSFER · SAUDI-ARABIEN',heroLead:'Ihre Reise,',heroAccent:'unsere Priorität.',book:'Private Fahrt anfragen',viewFleet:'Flotte entdecken',search:'Fahrzeug wählen',explore:'Routen entdecken',routeIntro:'IHRE REISE',routeTitle:'Fahrten nach Ihren Wünschen.',fareEyebrow:'Fahrzeugpreise für diese Route',fromFare:'Fahrpreis pro Fahrzeug',showroom:'Das richtige Fahrzeug für jede Fahrt.',showroomIntro:'Wählen Sie Ihr Fahrzeug und entdecken Sie den Innenraum vor Ihrer Anfrage.',experience:'Jede Reise verdient Aufmerksamkeit.',experienceIntro:'Von der Ankunft bis zum Ziel kümmern wir uns um Details.',reassurance:'Beruhigende Details',reassuranceIntro:'Klarer Service ohne Vorauszahlung.',quickRoute:'Route',date:'Reisedatum',travelers:'Reisende',bags:'Gepäck',sar:'SAR',payment:'Barzahlung beim Fahrer nach der Fahrt',included:'Steuern, Kraftstoff, Maut und Flughafenparkplatz inklusive',next:'Fahrzeug wählen',faqIntro:'Antworten vor der Reise'},
  tr:{kicker:'ÖZEL TRANSFER · SUUDİ ARABİSTAN',heroLead:'Yolculuğunuz,',heroAccent:'önceliğimiz.',book:'Özel yolculuk rezervasyonu',viewFleet:'Filoyu keşfet',search:'Araç seç',explore:'Rotaları keşfet',routeIntro:'YOLCULUĞUNUZ',routeTitle:'Size özel yolculuklar.',fareEyebrow:'Bu rotadaki araç ücretleri',fromFare:'Araca göre ücret',showroom:'Her yolculuk için doğru araç.',showroomIntro:'Rezervasyon isteğinden önce aracı ve iç mekanını inceleyin.',experience:'Her yolculuk özeni hak eder.',experienceIntro:'Varıştan hedefinize kadar her ayrıntı düşünülür.',reassurance:'İçinizi rahatlatan ayrıntılar',reassuranceIntro:'Ön ödeme olmadan açık ve net hizmet.',quickRoute:'Rota',date:'Tarih',travelers:'Yolcu',bags:'Valiz',sar:'SAR',payment:'Yolculuk sonrası sürücüye nakit ödeme',included:'Vergi, yakıt, geçiş ve havalimanı parkı dahil',next:'Bu aracı seç',faqIntro:'Yolculuk öncesi yanıtlar'},
  hi:{kicker:'निजी ट्रांसफ़र · सऊदी अरब',heroLead:'आपकी यात्रा,',heroAccent:'हमारी प्राथमिकता।',book:'निजी यात्रा बुक करें',viewFleet:'वाहन देखें',search:'वाहन चुनें',explore:'मार्ग देखें',routeIntro:'आपकी यात्रा',routeTitle:'आपके लिए तैयार यात्राएँ।',fareEyebrow:'इस मार्ग पर वाहन किराया',fromFare:'वाहन के अनुसार किराया',showroom:'हर यात्रा के लिए सही वाहन।',showroomIntro:'बुकिंग अनुरोध से पहले वाहन और उसका अंदरूनी भाग देखें।',experience:'हर यात्रा में विशेष ध्यान।',experienceIntro:'आगमन से गंतव्य तक आराम का ध्यान।',reassurance:'भरोसेमंद यात्रा विवरण',reassuranceIntro:'बिना अग्रिम भुगतान के स्पष्ट सेवा।',quickRoute:'मार्ग',date:'यात्रा तारीख',travelers:'यात्री',bags:'बैग',sar:'SAR',payment:'यात्रा पूरी होने पर चालक को नकद भुगतान',included:'टैक्स, ईंधन, टोल और एयरपोर्ट पार्किंग शामिल',next:'यह वाहन चुनें',faqIntro:'यात्रा से पहले जरूरी जवाब'},
};

const ROUTES = [
  { slug:'jeddah-airport-to-makkah', type:'airport' },
  { slug:'makkah-to-madinah', type:'intercity' },
  { slug:'madinah-airport-to-hotel', type:'airport' },
  { slug:'makkah-to-taif', type:'intercity' },
  { slug:'jeddah-airport-to-madinah', type:'airport' },
  { slug:'jeddah-to-taif', type:'intercity' },
  { slug:'riyadh-to-makkah', type:'intercity' },
  { slug:'riyadh-to-madinah', type:'intercity' },
  { slug:'makkah-ziyarat', type:'ziyarat' },
  { slug:'madinah-ziyarat', type:'ziyarat' },
] as const;
const FEATURED_ROUTES = ROUTES.slice(0,4);
const FARE_KEYS: Record<string, string> = {
  'toyota-camry':'camry',
  'hyundai-staria':'staria',
  'gmc-yukon-xl':'yukon',
  'toyota-hiace':'hiace',
  'toyota-coaster':'coaster',
};
function todayInSaudiArabia() {
  return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Riyadh',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
}

export function SignatureJourneyHomepage({ locale, dict }:Props) {
  const rtl = locale === 'ar' || locale === 'ur';
  const T = UI[locale];
  const D = HOMEPAGE_DECISION_COPY[locale];
  const E = DUYUF_HOME_LAYOUT[locale];
  const arrow = rtl ? <ArrowLeft size={18} aria-hidden="true"/> : <ArrowRight size={18} aria-hidden="true"/>;
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [route, setRoute] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [luggage, setLuggage] = useState('2');
  const [invalid, setInvalid] = useState(false);
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);
  const [selectedFleetIndex, setSelectedFleetIndex] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const minDate = useMemo(todayInSaudiArabia, []);
  const activeRoute = FEATURED_ROUTES[activeRouteIndex] ?? FEATURED_ROUTES[0];
  const activeCar = APPROVED_5_FLEET[selectedFleetIndex] ?? APPROVED_5_FLEET[0];
  const activeRouteLabel = LOCALIZED_ROUTE_NAMES[activeRoute.slug]?.[locale] || activeRoute.slug;
  const currentFare = AUTHORITATIVE_TRANSFER_RATES[activeRoute.slug]?.[FARE_KEYS[activeCar.bookingParam]];
  const formatter = new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US');

  useEffect(() => {
    const video=videoRef.current;
    if (!video) return;
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>{ if (motion.matches) {video.pause(); video.currentTime=0;} else void video.play().catch(()=>{}); };
    sync(); motion.addEventListener('change',sync);
    return ()=>motion.removeEventListener('change',sync);
  }, []);

  function submitBooking(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!route) { setInvalid(true); return; }
    const q=new URLSearchParams({route,type:'transfer',passengers:travelers,luggage});
    if (date) q.set('date',date);
    router.push('/'+locale+'/booking?'+q.toString());
  }

  const chapters=[
    {title:E.arrivalTitle,desc:E.arrivalDesc,image:'/assets/homepage-v2/route-jeddah-makkah.jpg'},
    {title:E.familyTitle,desc:E.familyDesc,image:'/assets/homepage-v2/service-group-interior.jpg'},
    {title:E.miqatTitle,desc:E.miqatDesc,image:'/assets/homepage-v2/fleet-private.jpg'},
  ];
  const faqItems=[
    {question:dict.faq.q2,answer:dict.faq.a2},
    {question:dict.faq.q3,answer:dict.faq.a3},
    {question:dict.faq.q5,answer:dict.faq.a5},
    {question:dict.faq.q9,answer:dict.faq.a9},
  ];
  const trustFacts=[
    {icon:<Plane size={19} aria-hidden="true"/>,title:dict.services.airportTitle,detail:E.arrivalDesc},
    {icon:<Compass size={19} aria-hidden="true"/>,title:E.miqatTitle,detail:E.miqatDesc},
    {icon:<Wallet size={19} aria-hidden="true"/>,title:T.payment,detail:dict.booking_card.noPrepayNotice},
    {icon:<ShieldCheck size={19} aria-hidden="true"/>,title:T.included,detail:dict.booking_card.microAllTolls},
  ];
  return (
    <div className={styles.page} dir={rtl?'rtl':'ltr'}>
      <section className={styles.hero} aria-labelledby="signature-hero-title">
        <video ref={videoRef} className={styles.heroVideo} muted autoPlay loop playsInline preload="metadata"
          poster="/assets/homepage-v2/hero-poster.jpg" aria-hidden="true" tabIndex={-1}>
          <source media="(max-width: 767px)" src="/assets/homepage-v2/hero-mobile.webm" type="video/webm"/>
          <source media="(max-width: 767px)" src="/assets/homepage-v2/hero-mobile.mp4" type="video/mp4"/>
          <source src="/assets/homepage-v2/hero.webm" type="video/webm"/>
          <source src="/assets/homepage-v2/hero.mp4" type="video/mp4"/>
        </video>
        <div className={styles.heroVeil} aria-hidden="true"/>
        <div className={styles.heroRule} aria-hidden="true"/>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.heroPosition}><span>01</span><span aria-hidden="true">/</span><span>DUYUF VIP</span></div>
            <div className={styles.heroTypography}>
              <p className={styles.eyebrow}>{T.kicker}</p>
              <h1 id="signature-hero-title">{T.heroLead}<span>{T.heroAccent}</span></h1>
              <p className={styles.heroDescription}>{dict.hero.description}</p>
              <div className={styles.heroActions}>
                <a href="#booking" className={styles.primaryAction}>{T.book}{arrow}</a>
                <a href="#fleet" className={styles.secondaryAction}>{T.viewFleet}<ArrowUpRight size={16} aria-hidden="true"/></a>
              </div>
            </div>
            <div className={styles.heroBaseline}><span><Check size={15} aria-hidden="true"/>{T.payment}</span><span><Clock3 size={15} aria-hidden="true"/>{dict.services.airportTitle}</span></div>
          </div>
        </div>
        <div className={styles.heroScrollMark} aria-hidden="true"><span>SCROLL</span><span/></div>
      </section>

      <section className={styles.bookingArea} id="booking" aria-labelledby="signature-booking-title">
        <div className={styles.container}>
          <div className={styles.bookingLayout}>
            <div className={styles.bookingIntroduction}>
              <span className={styles.micro}>02 / THE BOOKING DESK</span>
              <h2 id="signature-booking-title">{T.book}</h2>
              <p>{T.reassuranceIntro}</p>
              <div className={styles.bookingGuarantee}><ShieldCheck size={17} aria-hidden="true"/>{T.payment}</div>
            </div>
            <form className={styles.bookingPanel} onSubmit={submitBooking}>
              <div className={styles.bookingPanelHead}>
                <span><CarFront size={16} aria-hidden="true"/>{T.quickRoute}</span>
                <span>{T.included}</span>
              </div>
              <div className={styles.quickRoutes} role="group" aria-label={T.quickRoute}>
                {ROUTES.slice(0,3).map(item=>(
                  <button type="button" key={item.slug} aria-pressed={route===item.slug}
                    className={route===item.slug?styles.quickSelected:''}
                    onClick={()=>{setRoute(item.slug);setInvalid(false);}}>
                    {LOCALIZED_ROUTE_NAMES[item.slug]?.[locale] || item.slug}
                  </button>
                ))}
              </div>
              <div className={styles.bookingGrid}>
                <label className={styles.bookingField}>
                  <span><MapPin size={14} aria-hidden="true"/>{T.quickRoute}</span>
                  <select value={route} onChange={e=>{setRoute(e.target.value);setInvalid(false);}} aria-invalid={invalid}>
                    <option value="">{T.quickRoute}</option>
                    {ROUTES.map(item=><option key={item.slug} value={item.slug}>{LOCALIZED_ROUTE_NAMES[item.slug]?.[locale] || item.slug}</option>)}
                  </select>
                </label>
                <label className={styles.bookingField}>
                  <span><CalendarDays size={14} aria-hidden="true"/>{T.date}</span>
                  <input type="date" min={minDate} value={date} onChange={e=>setDate(e.target.value)}/>
                </label>
                <label className={styles.bookingField}>
                  <span><Users size={14} aria-hidden="true"/>{T.travelers}</span>
                  <select value={travelers} onChange={e=>setTravelers(e.target.value)}>
                    {Array.from({length:21},(_,i)=>i+1).map(n=><option key={n} value={n}>{n}</option>)}
                  </select>
                </label>
                <label className={styles.bookingField}>
                  <span><Luggage size={14} aria-hidden="true"/>{T.bags}</span>
                  <select value={luggage} onChange={e=>setLuggage(e.target.value)}>
                    {Array.from({length:22},(_,i)=>i).map(n=><option key={n} value={n}>{n}</option>)}
                  </select>
                </label>
              </div>
              {invalid&&<p className={styles.validation} role="alert">{T.quickRoute}</p>}
              <button type="submit" className={styles.bookingSubmit}>{T.search}{arrow}</button>
            </form>
          </div>
        </div>
      </section>

      <section className={styles.routesSection} id="routes" aria-labelledby="signature-route-title">
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <div><span className={styles.micro}>03 / ROUTE ATLAS</span><p className={styles.sectionEyebrow}>{T.routeIntro}</p><h2 id="signature-route-title">{T.routeTitle}</h2></div>
            <p>{D.priceDesc}</p>
          </div>
          <div className={styles.routeExplorer}>
            <div className={styles.routeRail} role="tablist" aria-label={T.explore}>
              {FEATURED_ROUTES.map((item,index)=>(
                <button type="button" role="tab" key={item.slug} id={'route-tab-'+index}
                  aria-selected={index===activeRouteIndex} aria-controls="signature-route-panel"
                  className={index===activeRouteIndex?styles.routeActive:''}
                  onClick={()=>{setActiveRouteIndex(index);setRoute(item.slug);}}>
                  <span className={styles.routeSerial}>{String(index+1).padStart(2,'0')}</span>
                  <span className={styles.routeName}>{LOCALIZED_ROUTE_NAMES[item.slug]?.[locale] || item.slug}</span>
                  {arrow}
                </button>
              ))}
              <Link href={'/'+locale+'/routes'} className={styles.routeAll}>{T.explore}<ArrowUpRight size={17} aria-hidden="true"/></Link>
            </div>
            <div className={styles.routeDisplay} id="signature-route-panel" role="tabpanel" aria-labelledby={'route-tab-'+activeRouteIndex} tabIndex={0}>
              <div className={styles.routeDrawing} aria-hidden="true">
                <div className={styles.routeOrb}><Plane size={18}/></div>
                <span className={styles.routeLine}/>
                <div className={styles.routeOrb}><MapPin size={18}/></div>
              </div>
              <span className={styles.routeDisplayLabel}>{T.fareEyebrow}</span>
              <h3>{activeRouteLabel}</h3>
              <p>{D.fareNote}</p>
              <div className={styles.fareList} aria-label={T.fromFare}>
                {APPROVED_5_FLEET.map(car=>{
                  const price=AUTHORITATIVE_TRANSFER_RATES[activeRoute.slug]?.[FARE_KEYS[car.bookingParam]];
                  return (
                    <div className={styles.fareRow} key={car.id}>
                      <span>{car.name[locale]}</span>
                      {typeof price==='number' && Number.isFinite(price) && price>0
                        ? <Link href={'/'+locale+'/booking?route='+activeRoute.slug+'&vehicle='+car.bookingParam}>{formatter.format(price)} <small>{T.sar}</small>{arrow}</Link>
                        : <span className={styles.unavailable}>—</span>}
                    </div>
                  );
                })}
              </div>
              <div className={styles.routeFoot}><Check size={15} aria-hidden="true"/>{T.included}</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.fleetSection} id="fleet" aria-labelledby="signature-fleet-title">
        <div className={styles.container}>
          <div className={styles.fleetHeading}>
            <span className={styles.micro}>04 / THE FLEET</span>
            <h2 id="signature-fleet-title">{T.showroom}</h2>
            <p>{T.showroomIntro}</p>
          </div>
          <div className={styles.fleetShowroom}>
            <div className={styles.fleetHeroVisual}>
              <div className={styles.fleetStudioLabel}>DUYUF <span>FLEET</span></div>
              <img className={styles.fleetExterior} src={activeCar.exteriorImage} alt={activeCar.name[locale]} loading="lazy"/>
              <div className={styles.fleetInterior}>
                <img src={activeCar.interiorImage} alt={activeCar.name[locale]+' — '+E.interiorTitle} loading="lazy"/>
                <span>{E.interiorEyebrow}</span>
              </div>
            </div>
            <div className={styles.fleetInfo}>
              <div className={styles.vehicleCounter}>0{selectedFleetIndex+1} <span>/ 05</span></div>
              <span className={styles.vehicleCategory}>{activeCar.categoryBadge[locale]}</span>
              <h3>{activeCar.name[locale]}</h3>
              <div className={styles.capacitySpecs}>
                <span><Users size={17} aria-hidden="true"/>{activeCar.passengers} {dict.cinematic_fleet.passengers}</span>
                <span><Luggage size={17} aria-hidden="true"/>{activeCar.luggage} {dict.cinematic_fleet.luggage}</span>
              </div>
              <p>{activeCar.summary[locale] || activeCar.categoryBadge[locale]}</p>
              {typeof currentFare==='number' && Number.isFinite(currentFare) && currentFare>0 &&
                <div className={styles.vehicleFare}><span>{activeRouteLabel}</span><strong>{formatter.format(currentFare)} <small>{T.sar}</small></strong></div>}
              <div className={styles.fleetActions}>
                <Link href={'/'+locale+'/booking?vehicle='+activeCar.bookingParam} className={styles.primaryDark}>{T.next}{arrow}</Link>
                <Link href={'/'+locale+'/fleet/'+activeCar.slug} className={styles.textLink}>{D.viewVehicle}<ArrowUpRight size={15} aria-hidden="true"/></Link>
              </div>
            </div>
          </div>
          <div className={styles.fleetSelector} role="group" aria-label={T.viewFleet}>
            {APPROVED_5_FLEET.map((car,index)=>(
              <button type="button" key={car.id} aria-pressed={selectedFleetIndex===index}
                className={selectedFleetIndex===index?styles.fleetSelected:''}
                onClick={()=>setSelectedFleetIndex(index)}>
                <span>0{index+1}</span><img src={car.exteriorImage} alt="" loading="lazy"/>
                <strong>{car.name[locale]}</strong>
                <ChevronDown size={15} aria-hidden="true"/>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.experienceSection} id="experience" aria-labelledby="signature-experience-title">
        <div className={styles.container}>
          <div className={styles.sectionIntro}>
            <div><span className={styles.micro}>05 / THE EXPERIENCE</span><h2 id="signature-experience-title">{T.experience}</h2></div>
            <p>{T.experienceIntro}</p>
          </div>
          <div className={styles.experienceLayout}>
            <div className={styles.experienceMedia}>
              <img src={chapters[activeChapterIndex].image} alt={chapters[activeChapterIndex].title} loading="lazy"/>
              <span>{String(activeChapterIndex+1).padStart(2,'0')} / 03</span>
            </div>
            <div className={styles.chapterList} role="group" aria-label={T.experience}>
              {chapters.map((chapter,index)=>(
                <button type="button" key={chapter.title} aria-pressed={activeChapterIndex===index}
                  className={activeChapterIndex===index?styles.chapterActive:''}
                  onClick={()=>setActiveChapterIndex(index)}>
                  <span className={styles.chapterNum}>{String(index+1).padStart(2,'0')}</span>
                  <span className={styles.chapterContent}><strong>{chapter.title}</strong><span>{chapter.desc}</span></span>
                  <ArrowUpRight size={18} aria-hidden="true"/>
                </button>
              ))}
              <Link href={'/'+locale+'/services'} className={styles.chapterLink}>{dict.nav.services}{arrow}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.trustSection} aria-labelledby="signature-trust-title">
        <div className={styles.container}>
          <div className={styles.trustHeading}>
            <span className={styles.micro}>THOUGHTFUL DETAILS</span>
            <h2 id="signature-trust-title">{T.reassurance}</h2>
            <p>{T.reassuranceIntro}</p>
          </div>
          <div className={styles.trustList}>
            {trustFacts.map(fact=>(
              <div key={fact.title} className={styles.trustFact}>
                <span className={styles.factIcon}>{fact.icon}</span>
                <strong>{fact.title}</strong>
                <p>{fact.detail}</p>
              </div>
            ))}
          </div>
          <Link href={'/'+locale+'/reviews'} className={styles.reviewLink}>{E.reviewTitle}{arrow}</Link>
        </div>
      </section>

      <section className={styles.faqSection} id="faq" aria-labelledby="signature-faq-title">
        <div className={styles.container}>
          <div className={styles.faqLayout}>
            <div className={styles.faqTitle}><span className={styles.micro}>BEFORE YOU TRAVEL</span><h2 id="signature-faq-title">{dict.faq.heading}</h2><p>{T.faqIntro}</p><Link href={'/'+locale+'/faq'}>{dict.faq.heading}{arrow}</Link></div>
            <div className={styles.faqList}>
              {faqItems.map((item,i)=>(
                <div key={item.question} className={styles.faqItem}>
                  <h3><button type="button" aria-expanded={activeFaq===i} aria-controls={'signature-faq-answer-'+i}
                    onClick={()=>setActiveFaq(activeFaq===i?null:i)}>
                    {item.question}<span aria-hidden="true">{activeFaq===i?'−':'+'}</span>
                  </button></h3>
                  <p id={'signature-faq-answer-'+i} hidden={activeFaq!==i}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finalBand} aria-label={T.book}>
        <div className={styles.container}>
          <div className={styles.finalInner}>
            <div><span className={styles.micro}>DUYUF AL RAHMAN VIP</span><h2>{T.heroLead} {T.heroAccent}</h2><p>{T.payment}</p></div>
            <Link href={'/'+locale+'/booking'} className={styles.finalLink}>{T.book}{arrow}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
