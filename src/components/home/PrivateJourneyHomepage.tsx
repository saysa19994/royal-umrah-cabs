'use client';

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, Clock3, Luggage, MapPin, Plane, ShieldCheck, Users, Wallet, Navigation, Compass } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { APPROVED_5_FLEET } from '@/data/approved-fleet-homepage';
import { AUTHORITATIVE_TRANSFER_RATES, LOCALIZED_ROUTE_NAMES } from '@/lib/pricing-constants';
import { HOMEPAGE_DECISION_COPY } from '@/data/duyuf-homepage-decision-copy';
import { DUYUF_HOME_LAYOUT } from '@/data/duyuf-homepage-layout-copy';
import { DuyufSignature } from '@/components/brand/DuyufSignature';
import styles from './PrivateJourneyHomepage.module.css';

interface Props {
  locale: Locale;
  dict: Dictionary;
  settings?: SiteSettings;
  vehicles?: unknown[];
}

const COPY: Record<Locale, {
  heroA: string; heroB: string; heroC: string;
  feature: string; privateLabel: string; planJourney: string;
  routePlaceholder: string; routeLabel: string; chooseDate: string;
  guestsLabel: string; luggageLabel: string; discoverFares: string;
  explore: string; curated: string; destinations: string;
  servicesKicker: string; exploreRoutes: string; carGallery: string;
  openGallery: string; next: string; previous: string;
  servicePromise: string; howLabel: string;
  reviewRequest: string; faqNote: string;
  payment: string; flight: string; cancellation: string; allIncluded: string;
  stepDetails: string; stepChoose: string; stepReview: string;
}> = {
  en: { heroA: 'Your Journey,', heroB: 'Our', heroC: 'Priority.', feature: 'PRIVATE TRANSPORT · SAUDI ARABIA', privateLabel: 'Private journeys for pilgrims & families', planJourney: 'Book Your Private Ride', routePlaceholder: 'Choose your journey', routeLabel: 'Your route', chooseDate: 'Travel date', guestsLabel: 'Travelers', luggageLabel: 'Bags', discoverFares: 'Find your vehicle', explore: 'Discover the journey', curated: 'Places worth the journey', destinations: 'Destinations, thoughtfully connected.', servicesKicker: 'THE JOURNEY, REIMAGINED', exploreRoutes: 'Explore transfers', carGallery: 'A fleet for every kind of journey', openGallery: 'View vehicle', next: 'Next', previous: 'Previous', servicePromise: 'Thoughtful service from arrival to destination', howLabel: 'A SIMPLE JOURNEY', reviewRequest: 'Explore verified guest experiences', faqNote: 'Clear answers before you travel', payment: 'Cash paid after the completed journey', flight: 'Flight tracking for airport arrivals', cancellation: 'Free cancellation up to 24h before pickup', allIncluded: 'VAT, fuel, tolls & airport parking included', stepDetails: 'Add travel details', stepChoose: 'Choose a suitable vehicle', stepReview: 'Review & send a request' },
  ar: { heroA: 'رحلتك', heroB: 'تستحق عناية', heroC: 'استثنائية.', feature: 'نقل خاص · المملكة العربية السعودية', privateLabel: 'رحلات خاصة للمعتمرين والعائلات', planJourney: 'خطّط لرحلتك', routePlaceholder: 'اختر مسار الرحلة', routeLabel: 'مسار الرحلة', chooseDate: 'تاريخ الرحلة', guestsLabel: 'عدد المسافرين', luggageLabel: 'عدد الحقائب', discoverFares: 'اختر سيارتك', explore: 'اكتشف التجربة', curated: 'وجهات تستحق الزيارة', destinations: 'وجهات مباركة، ورحلات بعناية.', servicesKicker: 'تجربة نقل مختلفة', exploreRoutes: 'استكشف الرحلات', carGallery: 'أسطول يناسب كل رحلة', openGallery: 'تفاصيل السيارة', next: 'التالي', previous: 'السابق', servicePromise: 'نعتني بتفاصيل رحلتك من الاستقبال حتى الوصول', howLabel: 'حجز بسيط وواضح', reviewRequest: 'اطّلع على تجارب الضيوف الموثّقة', faqNote: 'إجابات واضحة قبل الانطلاق', payment: 'الدفع نقدًا للسائق بعد اكتمال الرحلة', flight: 'متابعة الرحلات الجوية عند الاستقبال', cancellation: 'إلغاء مجاني حتى 24 ساعة قبل الموعد', allIncluded: 'الضريبة والوقود والرسوم ومواقف المطار مشمولة', stepDetails: 'أضف تفاصيل الرحلة', stepChoose: 'اختر السيارة المناسبة', stepReview: 'راجع الطلب وأرسله' },
  ms: { heroA: 'Setiap perjalanan suci', heroB: 'berhak menerima', heroC: 'layanan istimewa.', feature: 'PENGANGKUTAN PERIBADI · ARAB SAUDI', privateLabel: 'Perjalanan peribadi untuk jemaah dan keluarga', planJourney: 'Rancang perjalanan', routePlaceholder: 'Pilih laluan', routeLabel: 'Laluan anda', chooseDate: 'Tarikh perjalanan', guestsLabel: 'Penumpang', luggageLabel: 'Beg', discoverFares: 'Cari kenderaan', explore: 'Terokai perjalanan', curated: 'Destinasi bermakna', destinations: 'Destinasi dihubungkan dengan teliti.', servicesKicker: 'PENGALAMAN PERJALANAN', exploreRoutes: 'Lihat laluan', carGallery: 'Armada untuk setiap perjalanan', openGallery: 'Lihat kenderaan', next: 'Seterusnya', previous: 'Sebelumnya', servicePromise: 'Layanan prihatin dari ketibaan hingga destinasi', howLabel: 'TEMPAHAN MUDAH', reviewRequest: 'Lihat pengalaman tetamu disahkan', faqNote: 'Jawapan jelas sebelum berlepas', payment: 'Tunai selepas perjalanan selesai', flight: 'Penjejakan penerbangan', cancellation: 'Pembatalan percuma sehingga 24 jam', allIncluded: 'Cukai, bahan api, tol dan parkir termasuk', stepDetails: 'Butiran perjalanan', stepChoose: 'Pilih kenderaan', stepReview: 'Semak dan hantar permintaan' },
  id: { heroA: 'Setiap perjalanan ibadah', heroB: 'layak mendapatkan', heroC: 'perhatian istimewa.', feature: 'TRANSPORTASI PRIVAT · ARAB SAUDI', privateLabel: 'Perjalanan privat untuk jamaah dan keluarga', planJourney: 'Rencanakan perjalanan', routePlaceholder: 'Pilih rute', routeLabel: 'Rute perjalanan', chooseDate: 'Tanggal perjalanan', guestsLabel: 'Penumpang', luggageLabel: 'Koper', discoverFares: 'Cari kendaraan', explore: 'Jelajahi perjalanan', curated: 'Destinasi penuh makna', destinations: 'Destinasi terhubung dengan penuh perhatian.', servicesKicker: 'PENGALAMAN PERJALANAN', exploreRoutes: 'Lihat rute', carGallery: 'Armada untuk setiap perjalanan', openGallery: 'Lihat kendaraan', next: 'Berikutnya', previous: 'Sebelumnya', servicePromise: 'Layanan penuh perhatian dari kedatangan hingga tujuan', howLabel: 'PEMESANAN MUDAH', reviewRequest: 'Lihat ulasan tamu terverifikasi', faqNote: 'Jawaban jelas sebelum berangkat', payment: 'Tunai setelah perjalanan selesai', flight: 'Pemantauan penerbangan', cancellation: 'Pembatalan gratis hingga 24 jam', allIncluded: 'Pajak, bahan bakar, tol, parkir termasuk', stepDetails: 'Detail perjalanan', stepChoose: 'Pilih kendaraan', stepReview: 'Tinjau dan kirim permintaan' },
  ur: { heroA: 'ہر مقدس سفر', heroB: 'غیر معمولی', heroC: 'توجہ کا مستحق ہے۔', feature: 'نجی ٹرانسپورٹ · سعودی عرب', privateLabel: 'زائرین اور خاندانوں کے لیے نجی سفر', planJourney: 'اپنا سفر ترتیب دیں', routePlaceholder: 'سفر کا راستہ منتخب کریں', routeLabel: 'سفر کا راستہ', chooseDate: 'تاریخ سفر', guestsLabel: 'مسافر', luggageLabel: 'بیگ', discoverFares: 'گاڑی منتخب کریں', explore: 'سفر دریافت کریں', curated: 'قابل دید مقامات', destinations: 'سوچ سمجھ کر منسلک مقدس مقامات۔', servicesKicker: 'خصوصی سفری تجربہ', exploreRoutes: 'راستے دیکھیں', carGallery: 'ہر سفر کے لیے گاڑیاں', openGallery: 'گاڑی کی تفصیل', next: 'اگلا', previous: 'پچھلا', servicePromise: 'آمد سے منزل تک خیال رکھنے والی خدمت', howLabel: 'آسان بکنگ', reviewRequest: 'تصدیق شدہ مہمانوں کے تجربات', faqNote: 'روانگی سے پہلے واضح جوابات', payment: 'سفر مکمل ہونے کے بعد نقد ادائیگی', flight: 'پرواز کی نگرانی', cancellation: '24 گھنٹے پہلے تک مفت منسوخی', allIncluded: 'ٹیکس، ایندھن اور ٹول شامل', stepDetails: 'سفر کی تفصیلات', stepChoose: 'مناسب گاڑی منتخب کریں', stepReview: 'جائزہ لیں اور درخواست بھیجیں' },
  fr: { heroA: 'Chaque voyage sacré', heroB: 'mérite une attention', heroC: 'exceptionnelle.', feature: 'TRANSPORT PRIVÉ · ARABIE SAOUDITE', privateLabel: 'Trajets privés pour pèlerins et familles', planJourney: 'Organiser votre trajet', routePlaceholder: 'Choisissez un trajet', routeLabel: 'Votre trajet', chooseDate: 'Date du voyage', guestsLabel: 'Voyageurs', luggageLabel: 'Bagages', discoverFares: 'Choisir un véhicule', explore: 'Découvrir le voyage', curated: 'Des lieux à découvrir', destinations: 'Des destinations reliées avec soin.', servicesKicker: 'UNE AUTRE FAÇON DE VOYAGER', exploreRoutes: 'Voir les transferts', carGallery: 'Une flotte adaptée à chaque voyage', openGallery: 'Voir le véhicule', next: 'Suivant', previous: 'Précédent', servicePromise: 'Un accompagnement attentionné du départ à l’arrivée', howLabel: 'RÉSERVATION SIMPLE', reviewRequest: 'Découvrir les avis vérifiés', faqNote: 'Des réponses claires avant de partir', payment: 'Paiement en espèces après le trajet', flight: 'Suivi des vols', cancellation: 'Annulation gratuite jusqu’à 24 h', allIncluded: 'TVA, carburant, péages et parking inclus', stepDetails: 'Renseignez votre trajet', stepChoose: 'Choisissez un véhicule', stepReview: 'Vérifiez et envoyez la demande' },
  es: { heroA: 'Cada viaje sagrado', heroB: 'merece un cuidado', heroC: 'excepcional.', feature: 'TRANSPORTE PRIVADO · ARABIA SAUDITA', privateLabel: 'Viajes privados para peregrinos y familias', planJourney: 'Planifica tu traslado', routePlaceholder: 'Elige una ruta', routeLabel: 'Tu ruta', chooseDate: 'Fecha de viaje', guestsLabel: 'Pasajeros', luggageLabel: 'Maletas', discoverFares: 'Buscar vehículo', explore: 'Descubre la experiencia', curated: 'Destinos especiales', destinations: 'Destinos conectados con atención.', servicesKicker: 'VIAJAR DE OTRA FORMA', exploreRoutes: 'Explorar rutas', carGallery: 'Una flota para cada viaje', openGallery: 'Ver vehículo', next: 'Siguiente', previous: 'Anterior', servicePromise: 'Atención desde la llegada hasta el destino', howLabel: 'RESERVA SENCILLA', reviewRequest: 'Ver experiencias verificadas', faqNote: 'Respuestas claras antes de viajar', payment: 'Pago en efectivo después del viaje', flight: 'Seguimiento del vuelo', cancellation: 'Cancelación gratuita hasta 24 horas', allIncluded: 'IVA, combustible, peajes y parking incluidos', stepDetails: 'Añade detalles', stepChoose: 'Elige vehículo', stepReview: 'Revisa y envía la solicitud' },
  de: { heroA: 'Jede besondere Reise', heroB: 'verdient besondere', heroC: 'Fürsorge.', feature: 'PRIVATER TRANSFER · SAUDI-ARABIEN', privateLabel: 'Private Fahrten für Pilger und Familien', planJourney: 'Transfer planen', routePlaceholder: 'Route auswählen', routeLabel: 'Ihre Route', chooseDate: 'Reisedatum', guestsLabel: 'Reisende', luggageLabel: 'Gepäck', discoverFares: 'Fahrzeug finden', explore: 'Reise entdecken', curated: 'Besondere Reiseziele', destinations: 'Reiseziele mit Sorgfalt verbunden.', servicesKicker: 'REISEN NEU GEDACHT', exploreRoutes: 'Routen entdecken', carGallery: 'Eine Flotte für jede Reise', openGallery: 'Fahrzeug ansehen', next: 'Weiter', previous: 'Zurück', servicePromise: 'Begleitung von der Ankunft bis zum Ziel', howLabel: 'EINFACHE BUCHUNG', reviewRequest: 'Verifizierte Gästebewertungen', faqNote: 'Klare Antworten vor der Fahrt', payment: 'Barzahlung nach Fahrtende', flight: 'Flugüberwachung', cancellation: 'Kostenlos stornieren bis 24 Std.', allIncluded: 'Steuern, Treibstoff, Maut und Parken inklusive', stepDetails: 'Reisedetails angeben', stepChoose: 'Fahrzeug wählen', stepReview: 'Prüfen und Anfrage senden' },
  tr: { heroA: 'Her kutsal yolculuk', heroB: 'özenli ve seçkin', heroC: 'hizmeti hak eder.', feature: 'ÖZEL ULAŞIM · SUUDİ ARABİSTAN', privateLabel: 'Umreciler ve aileler için özel yolculuklar', planJourney: 'Transfer planla', routePlaceholder: 'Rota seçin', routeLabel: 'Güzergâhınız', chooseDate: 'Seyahat tarihi', guestsLabel: 'Yolcu', luggageLabel: 'Valiz', discoverFares: 'Araçları gör', explore: 'Yolculuğu keşfet', curated: 'Anlamlı duraklar', destinations: 'Özenle birbirine bağlanan duraklar.', servicesKicker: 'FARKLI BİR YOLCULUK', exploreRoutes: 'Rotaları incele', carGallery: 'Her yolculuğa uygun araçlar', openGallery: 'Aracı incele', next: 'Sonraki', previous: 'Önceki', servicePromise: 'Varıştan varış noktanıza kadar özenli hizmet', howLabel: 'KOLAY REZERVASYON', reviewRequest: 'Doğrulanmış misafir yorumları', faqNote: 'Yola çıkmadan önce net yanıtlar', payment: 'Yolculuk sonunda nakit ödeme', flight: 'Uçuş takibi', cancellation: '24 saate kadar ücretsiz iptal', allIncluded: 'Vergi, yakıt, geçiş ve otopark dahil', stepDetails: 'Yolculuk ayrıntıları', stepChoose: 'Araç seçin', stepReview: 'İncele ve talep gönder' },
  hi: { heroA: 'हर पवित्र यात्रा', heroB: 'विशेष देखभाल', heroC: 'की हकदार है।', feature: 'निजी परिवहन · सऊदी अरब', privateLabel: 'तीर्थयात्रियों और परिवारों के लिए निजी यात्रा', planJourney: 'अपना सफर तय करें', routePlaceholder: 'मार्ग चुनें', routeLabel: 'आपका मार्ग', chooseDate: 'यात्रा तारीख', guestsLabel: 'यात्री', luggageLabel: 'बैग', discoverFares: 'वाहन खोजें', explore: 'यात्रा देखें', curated: 'खास गंतव्य', destinations: 'ध्यान से जुड़े हुए गंतव्य।', servicesKicker: 'एक बेहतर सफर', exploreRoutes: 'मार्ग देखें', carGallery: 'हर सफर के लिए वाहन', openGallery: 'वाहन देखें', next: 'अगला', previous: 'पिछला', servicePromise: 'आगमन से मंज़िल तक खास ख्याल', howLabel: 'आसान बुकिंग', reviewRequest: 'प्रमाणित अतिथि अनुभव', faqNote: 'रवाना होने से पहले स्पष्ट जवाब', payment: 'यात्रा पूरी होने पर नकद भुगतान', flight: 'फ्लाइट ट्रैकिंग', cancellation: '24 घंटे पहले तक मुफ्त रद्द', allIncluded: 'टैक्स, ईंधन, टोल और पार्किंग शामिल', stepDetails: 'यात्रा विवरण', stepChoose: 'वाहन चुनें', stepReview: 'जाँचें और अनुरोध भेजें' },
};


const ROUTES = [
  { slug:'jeddah-airport-to-makkah', type:'airport' },
  { slug:'makkah-to-madinah', type:'intercity' },
  { slug:'madinah-airport-to-hotel', type:'airport' },
  { slug:'makkah-to-taif', type:'intercity' },
] as const;

function safeLocalDate() {
  return new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Riyadh',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
}

export function PrivateJourneyHomepage({locale,dict}:Props) {
  const rtl = locale === 'ar' || locale === 'ur';
  const L = COPY[locale];
  const E = DUYUF_HOME_LAYOUT[locale];
  const D = HOMEPAGE_DECISION_COPY[locale];
  const arrow = rtl ? <ArrowLeft size={16} aria-hidden /> : <ArrowRight size={16} aria-hidden />;
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [route,setRoute] = useState('');
  const [date,setDate] = useState('');
  const [travelers,setTravelers] = useState('2');
  const [luggage,setLuggage] = useState('2');
  const [validation,setValidation] = useState(false);
  const [activeFaq,setActiveFaq] = useState<number|null>(0);
  const minDate = useMemo(safeLocalDate,[]);

  useEffect(()=>{
    const video=videoRef.current;
    if(!video) return;
    const mq=window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>{
      if(mq.matches){video.pause();video.currentTime=0;}
      else void video.play().catch(()=>{});
    };
    sync();
    mq.addEventListener('change',sync);
    return()=>mq.removeEventListener('change',sync);
  },[]);

  function submitQuickBooking(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(!route){setValidation(true);return;}
    const query=new URLSearchParams({route,type:'transfer',passengers:travelers,luggage});
    if(date)query.set('date',date);
    router.push(`/${locale}/booking?${query.toString()}`);
  }

  const faqItems=[
    {question:dict.faq.q2,answer:dict.faq.a2},
    {question:dict.faq.q3,answer:dict.faq.a3},
    {question:dict.faq.q5,answer:dict.faq.a5},
    {question:dict.faq.q9,answer:dict.faq.a9},
  ];

  const chooseFeatures=[
    {title:D.doorway,desc:D.doorwayDesc,icon:<MapPin size={19} aria-hidden="true"/>},
    {title:E.arrivalTitle,desc:E.arrivalDesc,icon:<Clock3 size={19} aria-hidden="true"/>},
    {title:E.miqatTitle,desc:E.miqatDesc,icon:<Compass size={19} aria-hidden="true"/>},
    {title:E.familyTitle,desc:E.familyDesc,icon:<Users size={19} aria-hidden="true"/>},
  ];
  const trustFeatures=[
    {title:L.flight,desc:dict.services.airportDesc,icon:<Plane size={20} aria-hidden="true"/>},
    {title:L.payment,desc:dict.hero.payOnArrivalNotice,icon:<Wallet size={20} aria-hidden="true"/>},
    {title:L.cancellation,desc:dict.booking_card.microCancellation,icon:<Clock3 size={20} aria-hidden="true"/>},
    {title:L.allIncluded,desc:dict.booking_card.microAllTolls,icon:<ShieldCheck size={20} aria-hidden="true"/>},
  ];

  return (
    <div className={styles.page} dir={rtl?'rtl':'ltr'}>
      <section className={styles.hero} aria-labelledby="pj-title">
        <video ref={videoRef} className={styles.heroVideo} autoPlay muted loop playsInline preload="metadata"
          poster="/assets/homepage-v2/hero-poster.jpg" aria-hidden="true" tabIndex={-1}>
          <source media="(max-width: 767px)" src="/assets/homepage-v2/hero-mobile.webm" type="video/webm"/>
          <source media="(max-width: 767px)" src="/assets/homepage-v2/hero-mobile.mp4" type="video/mp4"/>
          <source src="/assets/homepage-v2/hero.webm" type="video/webm"/>
          <source src="/assets/homepage-v2/hero.mp4" type="video/mp4"/>
        </video>
        <div className={styles.heroVeil} aria-hidden="true"/>
        <div className={`${styles.wrap} ${styles.heroInside}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{L.feature}</p>
            <h1 id="pj-title">{L.heroA} <em>{L.heroB} {L.heroC}</em></h1>
            <p>{dict.hero.description}</p>
            <div className={styles.heroButtons}>
              <a href="#booking" className={styles.heroPrimary}>{L.planJourney} {arrow}</a>
              <Link href={`/${locale}/fleet`} className={styles.heroSecondary}>{dict.hero.ctaFleet} <ArrowUpRight size={16} aria-hidden="true"/></Link>
            </div>
          </div>
          <div className={styles.heroIdentity} aria-hidden="true">
            <DuyufSignature/>
            <span>DUYUF <b>VIP</b></span>
          </div>
        </div>
      </section>

      <section className={styles.bookingArea} id="booking" aria-label={L.planJourney}>
        <div className={`${styles.wrap} ${styles.bookingWidth}`}>
          <form onSubmit={submitQuickBooking} className={styles.bookingPanel}>
            <div className={styles.bookingTop}>
              <div><p className={styles.bookingEyebrow}>{L.feature}</p><h2>{L.planJourney}</h2></div>
              <span className={styles.bookingPromise}><ShieldCheck size={15} aria-hidden="true"/>{dict.booking_card.noPrepayNotice}</span>
            </div>
            <div className={styles.routeShortcuts} role="group" aria-label={L.routeLabel}>
              {ROUTES.slice(0,3).map(item=>(
                <button type="button" key={item.slug} aria-pressed={route===item.slug}
                  className={route===item.slug?styles.routeChosen:''}
                  onClick={()=>{setRoute(item.slug);setValidation(false);}}>
                  <MapPin size={12} aria-hidden="true"/>{LOCALIZED_ROUTE_NAMES[item.slug]?.[locale] || item.slug}
                </button>
              ))}
            </div>
            <div className={styles.bookingFields}>
              <label className={styles.bookingField}>
                <span><MapPin size={15} aria-hidden="true"/>{L.routeLabel}</span>
                <select value={route} onChange={e=>{setRoute(e.target.value);setValidation(false);}} aria-invalid={validation}>
                  <option value="">{L.routePlaceholder}</option>
                  {ROUTES.map(item=><option key={item.slug} value={item.slug}>{LOCALIZED_ROUTE_NAMES[item.slug]?.[locale] || item.slug}</option>)}
                </select>
              </label>
              <label className={styles.bookingField}>
                <span><CalendarDays size={15} aria-hidden="true"/>{L.chooseDate}</span>
                <input type="date" min={minDate} value={date} onChange={e=>setDate(e.target.value)}/>
              </label>
              <label className={styles.bookingField}>
                <span><Users size={15} aria-hidden="true"/>{L.guestsLabel}</span>
                <select value={travelers} onChange={e=>setTravelers(e.target.value)}>
                  {Array.from({length:21},(_,i)=>i+1).map(n=><option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <label className={styles.bookingField}>
                <span><Luggage size={15} aria-hidden="true"/>{L.luggageLabel}</span>
                <select value={luggage} onChange={e=>setLuggage(e.target.value)}>
                  {Array.from({length:21},(_,i)=>i).map(n=><option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <button type="submit" className={styles.bookingSubmit}>{L.discoverFares} {arrow}</button>
            </div>
            {validation&&<p className={styles.validation} role="alert">{L.routePlaceholder}</p>}
            <div className={styles.bookingBottom}>
              <span><Check size={13} aria-hidden="true"/>{L.payment}</span>
              <span><Check size={13} aria-hidden="true"/>{L.allIncluded}</span>
              <span><Check size={13} aria-hidden="true"/>{L.flight}</span>
            </div>
          </form>
        </div>
      </section>

      <section className={styles.whyChoose} aria-labelledby="pj-why">
        <div className={styles.wrap}>
          <div className={styles.centerHeading}>
            <p className={styles.sectionEyebrow}>{E.whyEyebrow}</p>
            <h2 id="pj-why">{D.whyTitle}</h2>
            <p>{D.whyDesc}</p>
          </div>
          <div className={styles.featureGrid}>
            {chooseFeatures.map(item=>(
              <article className={styles.featureCard} key={item.title}>
                <span className={styles.featureIcon}>{item.icon}</span>
                <h3>{item.title}</h3><p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.compareSection} aria-labelledby="pj-compare">
        <div className={styles.wrap}>
          <div className={styles.centerHeading}>
            <p className={styles.sectionEyebrow}>{E.whyEyebrow}</p>
            <h2 id="pj-compare">{D.compareTitle}</h2>
            <p>{D.compareDesc}</p>
          </div>
          <div className={styles.compareGrid}>
            <div className={`${styles.compareCard} ${styles.comparePrivate}`}>
              <div className={styles.compareTitle}><span><Navigation size={18} aria-hidden="true"/></span><h3>{D.ourTransfer}</h3></div>
              <ul>{D.comparisonPrivate.map(item=><li key={item}><Check size={15} aria-hidden="true"/>{item}</li>)}</ul>
            </div>
            <div className={styles.compareCard}>
              <div className={styles.compareTitle}><span><Navigation size={18} aria-hidden="true"/></span><h3>{D.trainOption}</h3></div>
              <ul>{D.comparisonTrain.map(item=><li key={item}><span className={styles.compareBullet} aria-hidden="true"/> {item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pricingSection} id="routes" aria-labelledby="pj-pricing">
        <div className={styles.wrap}>
          <div className={styles.centerHeading}>
            <p className={styles.sectionEyebrow}>{dict.popular_routes.sectionPill}</p>
            <h2 id="pj-pricing">{D.priceTitle}</h2>
            <p>{D.priceDesc}</p>
          </div>
          <div className={styles.pricingTableScroll} tabIndex={0} role="region" aria-label={D.priceTitle}>
            <table className={styles.pricingTable}>
              <thead><tr>
                <th scope="col">{D.fareRoute}</th>
                {APPROVED_5_FLEET.map(car=><th key={car.id} scope="col">{car.name[locale]}</th>)}
              </tr></thead>
              <tbody>
                {ROUTES.map(item=>(
                  <tr key={item.slug}>
                    <th scope="row"><Link href={`/${locale}/booking?route=${item.slug}`}>{LOCALIZED_ROUTE_NAMES[item.slug]?.[locale] || item.slug}</Link></th>
                    {APPROVED_5_FLEET.map(car=>{
                      const price=AUTHORITATIVE_TRANSFER_RATES[item.slug]?.[car.bookingParam];
                      return <td key={car.id}>
                        {typeof price==='number' && Number.isFinite(price) && price>0
                          ? <Link href={`/${locale}/booking?route=${item.slug}&vehicle=${car.bookingParam}`}>{price.toLocaleString(locale==='ar'?'ar-SA':'en-US')} <small>{D.sar}</small></Link>
                          : <span className={styles.noFare}>—</span>}
                      </td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.fareFooter}><p>{D.fareNote}</p><Link href={`/${locale}/pricing`}>{D.compareFares} {arrow}</Link></div>
        </div>
      </section>

      <section className={styles.fleetSection} id="fleet" aria-labelledby="pj-fleet">
        <div className={styles.wrap}>
          <div className={styles.centerHeading}>
            <p className={styles.sectionEyebrow}>{dict.cinematic_fleet.eyebrow}</p>
            <h2 id="pj-fleet">{D.chooseCar}</h2>
            <p>{dict.fleet.subtitle}</p>
          </div>
          <div className={styles.vehicleGrid}>
            {APPROVED_5_FLEET.map(car=>(
              <article className={styles.vehicleCard} key={car.id}>
                <Link href={`/${locale}/fleet/${car.slug}`} className={styles.vehiclePhoto} aria-label={car.name[locale]}>
                  <img src={car.exteriorImage} loading="lazy" alt={car.name[locale]}/>
                </Link>
                <div className={styles.vehicleBody}>
                  <span className={styles.vehicleCategory}>{car.categoryBadge[locale]}</span>
                  <h3>{car.name[locale]}</h3>
                  <div className={styles.vehicleCapacity}>
                    <span><Users size={13} aria-hidden="true"/>{car.passengers} {dict.cinematic_fleet.passengers}</span>
                    <span><Luggage size={13} aria-hidden="true"/>{car.luggage} {dict.cinematic_fleet.luggage}</span>
                  </div>
                  <Link href={`/${locale}/booking?vehicle=${car.bookingParam}`} className={styles.vehicleLink}>{dict.fleet.bookNowButton} {arrow}</Link>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.belowFleet}><Link href={`/${locale}/fleet`}>{dict.hero.ctaFleet} {arrow}</Link></div>
        </div>
      </section>

      <section className={styles.trustSection} aria-labelledby="pj-trust">
        <div className={styles.wrap}>
          <div className={styles.centerHeading}><p className={styles.sectionEyebrow}>{E.whyEyebrow}</p><h2 id="pj-trust">{E.whyTitle}</h2></div>
          <div className={styles.trustGrid}>
            {trustFeatures.map(item=><article key={item.title} className={styles.trustCard}>
              <span className={styles.trustIcon}>{item.icon}</span>
              <h3>{item.title}</h3><p>{item.desc}</p>
            </article>)}
          </div>
          <p className={styles.reviewLink}><Link href={`/${locale}/reviews`}>{E.reviewTitle} {arrow}</Link></p>
        </div>
      </section>

      <section className={styles.faqSection} id="faq" aria-labelledby="pj-faq">
        <div className={styles.wrap}>
          <div className={styles.centerHeading}>
            <p className={styles.sectionEyebrow}>{dict.faq.sectionPill}</p>
            <h2 id="pj-faq">{dict.faq.heading}</h2><p>{L.faqNote}</p>
          </div>
          <div className={styles.faqList}>
            {faqItems.map((item,i)=>(
              <div key={item.question} className={styles.faqItem}>
                <h3><button type="button" aria-expanded={activeFaq===i} aria-controls={`pj-faq-answer-${i}`} onClick={()=>setActiveFaq(activeFaq===i?null:i)}>
                  {item.question}<span aria-hidden="true">{activeFaq===i?'−':'+'}</span>
                </button></h3>
                <p id={`pj-faq-answer-${i}`} hidden={activeFaq!==i}>{item.answer}</p>
              </div>
            ))}
          </div>
          <div className={styles.faqMore}><Link href={`/${locale}/faq`}>{dict.faq.heading} {arrow}</Link><Link href={`/${locale}/guides`}>{E.guideHeading} {arrow}</Link></div>
        </div>
      </section>
    </div>
  );
}
