'use client';

/**
 * DUYUF — The Private Journey homepage.
 * Real Next.js component, replacing the former 1,600-line homepage presentation.
 * Business rates and fleet details come from the existing authoritative sources.
 * Booking is handed to the established booking wizard; this component does not
 * submit reservations, create vehicle availability, or invent fares.
 */
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays,
  Clock3, Luggage,
  MapPin, Plane, ShieldCheck, Users, Wallet,
  Navigation, Compass,
} from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { useCurrency } from '@/context/CurrencyContext';
import { APPROVED_5_FLEET } from '@/data/approved-fleet-homepage';
import { AUTHORITATIVE_TRANSFER_RATES, LOCALIZED_ROUTE_NAMES } from '@/lib/pricing-constants';
import styles from './PrivateJourneyHomepage.module.css';
import { DuyufSignature } from '@/components/brand/DuyufSignature';
import { DUYUF_HOME_LAYOUT } from '@/data/duyuf-homepage-layout-copy';

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

const FEATURED_ROUTES = [
  { slug: 'jeddah-airport-to-makkah', image: '/assets/homepage-v2/route-jeddah-makkah.jpg', category: 'airport' },
  { slug: 'makkah-to-madinah', image: '/assets/homepage-v2/route-makkah-madinah.jpg', category: 'intercity' },
  { slug: 'madinah-airport-to-hotel', image: '/assets/homepage-v2/route-madinah-hotel.jpg', category: 'airport' },
  { slug: 'makkah-to-taif', image: '/assets/images/routes/makkah-to-taif.jpg', category: 'intercity' },
] as const;


function safeLocalDate() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit' })
    .format(new Date());
}

export function PrivateJourneyHomepage({ locale, dict }: Props) {
  const isRtl = locale === 'ar' || locale === 'ur';
  const L = COPY[locale];
  const E = DUYUF_HOME_LAYOUT[locale];
  const router = useRouter();
  const { formatPrice } = useCurrency();
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      if (motionPreference.matches) {
        video.pause();
        video.currentTime = 0;
      } else {
        void video.play().catch(() => {
          // Poster stays visible if autoplay is blocked by the browser.
        });
      }
    };
    syncMotion();
    motionPreference.addEventListener('change', syncMotion);
    return () => motionPreference.removeEventListener('change', syncMotion);
  }, []);
  const [route, setRoute] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [luggage, setLuggage] = useState('2');
  const [validation, setValidation] = useState(false);
  const [activeVehicle, setActiveVehicle] = useState(1);
  const [interior, setInterior] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const arrow = isRtl ? <ArrowLeft size={18} aria-hidden /> : <ArrowRight size={18} aria-hidden />;
  const minDate = useMemo(safeLocalDate, []);
  const selectedFleetVehicle = APPROVED_5_FLEET[activeVehicle];
  const selectedFleetPrice = AUTHORITATIVE_TRANSFER_RATES['jeddah-airport-to-makkah']?.[selectedFleetVehicle.bookingParam];
  const faqItems = [
    { question: dict.faq.q2, answer: dict.faq.a2 },
    { question: dict.faq.q3, answer: dict.faq.a3 },
    { question: dict.faq.q5, answer: dict.faq.a5 },
    { question: dict.faq.q9, answer: dict.faq.a9 },
  ];

  function submitQuickBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!route) { setValidation(true); return; }
    const query = new URLSearchParams({ route, type: 'transfer', passengers: travelers, luggage });
    if (date) query.set('date', date);
    router.push(`/${locale}/booking?${query.toString()}`);
  }

  return (
    <div className={styles.page} dir={isRtl ? 'rtl' : 'ltr'}>
      <section className={styles.hero} aria-labelledby="pj-title">
        <div className={styles.heroAura} aria-hidden />
        <div className={styles.wrap}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.overline}><span className={styles.overlineRule} />{L.feature}</p>
              <h1 id="pj-title" className={styles.heroTitle}>
                <span>{L.heroA}</span>
                <span>{L.heroB}</span>
                <em>{L.heroC}</em>
              </h1>
              <p className={styles.heroDescription}>{dict.hero.description}</p>
              <div className={styles.heroActions}>
                <a href="#plan" className={styles.buttonPrimary}>{L.planJourney} {arrow}</a>
                <a href="#fleet" className={styles.buttonText}>{dict.hero.ctaFleet} <ArrowUpRight size={18} aria-hidden /></a>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <video
                ref={heroVideoRef}
                className={styles.heroImage}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/homepage-v2/hero-poster.jpg"
                aria-hidden="true"
                tabIndex={-1}
              >
                <source media="(max-width: 767px)" src="/assets/homepage-v2/hero-mobile.webm" type="video/webm" />
                <source media="(max-width: 767px)" src="/assets/homepage-v2/hero-mobile.mp4" type="video/mp4" />
                <source src="/assets/homepage-v2/hero.webm" type="video/webm" />
                <source src="/assets/homepage-v2/hero.mp4" type="video/mp4" />
              </video>
              <div className={styles.imageVeil} aria-hidden />
              <div className={styles.heroSideCaption}>
                <div className={styles.captionLine} />
                <strong>{L.privateLabel}</strong>
                <span>JEDDAH · MAKKAH · MADINAH</span>
              </div>
              <div className={styles.cornerMark} aria-hidden="true">
                <DuyufSignature className={styles.heroBrandGlyph} />
                <span className={styles.heroBrandWord}>DUYUF <strong>VIP</strong></span>
              </div>
            </div>
          </div>

          <div className={styles.searchShell} id="plan">
            <div className={styles.searchHead}>
              <div className={styles.searchTitle}><Navigation size={20} aria-hidden /><span>{L.planJourney}</span></div>
              <div className={styles.searchHint}><span />{L.servicePromise}</div>
            </div>
            <form className={styles.searchFields} onSubmit={submitQuickBooking}>
              <label className={styles.searchField}>
                <span><MapPin size={15} aria-hidden /> {L.routeLabel}</span>
                <select value={route} onChange={(e) => {setRoute(e.target.value); setValidation(false);}} aria-invalid={validation} aria-label={L.routeLabel}>
                  <option value="">{L.routePlaceholder}</option>
                  {FEATURED_ROUTES.map(item => (
                    <option key={item.slug} value={item.slug}>{LOCALIZED_ROUTE_NAMES[item.slug]?.[locale] || item.slug}</option>
                  ))}
                </select>
              </label>
              <label className={styles.searchField}>
                <span><CalendarDays size={15} aria-hidden /> {L.chooseDate}</span>
                <input type="date" value={date} min={minDate} onChange={e => setDate(e.target.value)} aria-label={L.chooseDate} />
              </label>
              <label className={styles.searchField}>
                <span><Users size={15} aria-hidden /> {L.guestsLabel}</span>
                <select value={travelers} onChange={e => setTravelers(e.target.value)} aria-label={L.guestsLabel}>
                  {Array.from({length:21},(_,i)=>i+1).map(n=><option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <label className={styles.searchField}>
                <span><Luggage size={15} aria-hidden /> {L.luggageLabel}</span>
                <select value={luggage} onChange={e => setLuggage(e.target.value)} aria-label={L.luggageLabel}>
                  {Array.from({length:21},(_,i)=>i).map(n=><option key={n} value={n}>{n}</option>)}
                </select>
              </label>
              <button className={styles.searchButton} type="submit">{L.discoverFares} {arrow}</button>
            </form>
            {validation && <p role="alert" className={styles.validation}>{L.routePlaceholder}</p>}
          </div>
        </div>
      </section>


      <section className={styles.assurance} aria-label={L.servicePromise}>
        <div className={`${styles.wrap} ${styles.assuranceGrid}`}>
          <div><Wallet size={19} aria-hidden="true" /><span>{L.payment}</span></div>
          <div><Plane size={19} aria-hidden="true" /><span>{L.flight}</span></div>
          <div><Clock3 size={19} aria-hidden="true" /><span>{L.cancellation}</span></div>
          <div><ShieldCheck size={19} aria-hidden="true" /><span>{L.allIncluded}</span></div>
        </div>
      </section>

      {/* 3-step request flow — never promise instant confirmation. */}
      <section className={styles.stepsSection} aria-labelledby="pj-steps">
        <div className={styles.wrap}>
          <div className={styles.centerHeading}>
            <p className={styles.overline}>{L.howLabel}</p>
            <h2 id="pj-steps">{E.stepsTitle}</h2>
          </div>
          <ol className={styles.stepsGrid}>
            {[
              { title: dict.steps.step1Title, description: dict.steps.step1Desc },
              { title: L.stepChoose, description: dict.steps.step2Desc },
              { title: L.stepReview, description: L.faqNote },
            ].map((step, index) => (
              <li className={styles.stepItem} key={index}>
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cabin experience follows the journey steps; photograph stays contained. */}
      <section className={styles.fleetSection} id="fleet" aria-labelledby="pj-fleet">
        <div className={styles.wrap}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.overline}>{E.interiorEyebrow}</p>
              <h2 id="pj-fleet">{E.interiorTitle}</h2>
              <p className={styles.headingDescription}>{E.interiorSubtitle}</p>
            </div>
            <Link className={styles.inlineLink} href={`/${locale}/fleet`}>{dict.hero.ctaFleet} {arrow}</Link>
          </div>
          <div className={styles.fleetSelector} role="group" aria-label={dict.cinematic_fleet.title}>
            {APPROVED_5_FLEET.map((car,i)=>(
              <button key={car.id} type="button" className={i===activeVehicle?styles.carSelected:''} aria-pressed={i===activeVehicle}
                onClick={()=>{setActiveVehicle(i);setInterior(true);}}>{car.name[locale]}</button>
            ))}
          </div>
          <div className={styles.fleetStage}>
            <div className={styles.fleetImage}>
              <img key={selectedFleetVehicle.id + (interior?'in':'out')}
                src={interior?selectedFleetVehicle.interiorImage:selectedFleetVehicle.exteriorImage}
                alt={selectedFleetVehicle.name[locale]} loading="lazy" />
              <div className={styles.imageToggle} role="group" aria-label={dict.fleet.viewInterior}>
                <button type="button" aria-pressed={interior} className={interior?styles.photoActive:''} onClick={()=>setInterior(true)}>{dict.fleet.viewInterior}</button>
                <button type="button" aria-pressed={!interior} className={!interior?styles.photoActive:''} onClick={()=>setInterior(false)}>{dict.fleet.viewExterior}</button>
              </div>
            </div>
            <div className={styles.fleetInfo}>
              <span className={styles.overline}>{selectedFleetVehicle.categoryBadge[locale]}</span>
              <h3>{selectedFleetVehicle.name[locale]}</h3>
              <p>{selectedFleetVehicle.summary[locale] || E.interiorSubtitle}</p>
              <div className={styles.fleetSpecs}>
                <div><Users size={17} aria-hidden="true" /><strong>{selectedFleetVehicle.passengers}</strong> {dict.cinematic_fleet.passengers}</div>
                <div><Luggage size={17} aria-hidden="true" /><strong>{selectedFleetVehicle.luggage}</strong> {dict.cinematic_fleet.luggage}</div>
              </div>
              {typeof selectedFleetPrice==='number' && selectedFleetPrice>0 && (
                <p className={styles.fleetPrice}>
                  {dict.cinematic_fleet.startingFrom} <strong>{formatPrice(selectedFleetPrice)}</strong>
                  <small>{LOCALIZED_ROUTE_NAMES['jeddah-airport-to-makkah'][locale]}</small>
                </p>
              )}
              <div className={styles.fleetActions}>
                <Link href={`/${locale}/fleet/${selectedFleetVehicle.slug}`} className={styles.buttonPrimary}>{L.openGallery} {arrow}</Link>
                <Link href={`/${locale}/booking?vehicle=${selectedFleetVehicle.bookingParam}`} className={styles.buttonText}>{dict.fleet.bookNowButton} <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three service cards, not a huge second photo carousel. */}
      <section className={styles.servicesSection} id="services" aria-labelledby="pj-services">
        <div className={styles.wrap}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.overline}>{L.servicesKicker}</p><h2 id="pj-services">{E.servicesTitle}</h2></div>
            <Link className={styles.inlineLink} href={`/${locale}/services`}>{dict.nav.services} {arrow}</Link>
          </div>
          <div className={styles.serviceGrid}>
            {[
              { href:`/${locale}/booking?route=jeddah-airport-to-makkah`, src:'/assets/images/jeddah-airport-pickup-umrah.webp', title:dict.services.airportTitle, description:dict.services.airportDesc },
              { href:`/${locale}/routes`, src:'/assets/homepage-v2/service-intercity.jpg', title:dict.services.intercityTitle, description:dict.services.intercityDesc },
              { href:`/${locale}/ziyarat`, src:'/assets/homepage-v2/ziyarat-haram.jpg', title:dict.services.ziyaratTitle, description:dict.services.ziyaratDesc },
            ].map((service,index)=>(
              <Link key={service.href} href={service.href} className={styles.serviceCard}>
                <div className={styles.serviceImage}><img src={service.src} alt="" loading="lazy" /></div>
                <div className={styles.serviceContent}>
                  <span className={styles.serviceIndex}>{String(index+1).padStart(2,'0')} / {dict.nav.services}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className={styles.serviceArrow}>{L.exploreRoutes} {arrow}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.routesCompact} id="routes">
            <div className={styles.routesCompactHead}>
              <h3>{dict.popular_routes.heading}</h3>
              <Link href={`/${locale}/routes`} className={styles.inlineLink}>{L.exploreRoutes} {arrow}</Link>
            </div>
            <div className={styles.routeLinks}>
              {FEATURED_ROUTES.map((item)=> {
                const fare = AUTHORITATIVE_TRANSFER_RATES[item.slug]?.camry;
                return (
                  <Link href={`/${locale}/booking?route=${item.slug}`} key={item.slug} className={styles.routeLink}>
                    <span>{LOCALIZED_ROUTE_NAMES[item.slug]?.[locale] || item.slug}</span>
                    <span className={styles.routeLinkFare}>{typeof fare==='number' && fare>0 ? formatPrice(fare) : ''} {arrow}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Meaningful differences: facts not repeated in the top guarantee strip. */}
      <section className={styles.whySection} aria-labelledby="pj-why">
        <div className={styles.wrap}>
          <div className={styles.centerHeading}>
            <p className={styles.overline}>{E.whyEyebrow}</p>
            <h2 id="pj-why">{E.whyTitle}</h2>
          </div>
          <div className={styles.whyGrid}>
            {[
              { icon:<Plane size={24} aria-hidden="true" />, title:E.arrivalTitle, desc:E.arrivalDesc },
              { icon:<Compass size={24} aria-hidden="true" />, title:E.miqatTitle, desc:E.miqatDesc },
              { icon:<Users size={24} aria-hidden="true" />, title:E.familyTitle, desc:E.familyDesc },
            ].map(item => (
              <article key={item.title} className={styles.whyItem}>
                <span className={styles.whyIcon}>{item.icon}</span>
                <h3>{item.title}</h3><p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Link to actual published reviews; never invent review counts. */}
      <section className={styles.reviewsSection} aria-label={E.reviewTitle}>
        <div className={`${styles.wrap} ${styles.reviewPanel}`}>
          <div><p className={styles.overline}>{L.reviewRequest}</p><h2>{E.reviewTitle}</h2><p>{E.reviewSubtitle}</p></div>
          <Link href={`/${locale}/reviews`} className={styles.buttonPrimary}>{L.reviewRequest} {arrow}</Link>
        </div>
      </section>

      <section className={styles.faqSection} id="faq" aria-labelledby="pj-faq">
        <div className={styles.wrap}>
          <div className={styles.faqGrid}>
            <div className={styles.faqIntro}>
              <p className={styles.overline}>{dict.faq.sectionPill}</p>
              <h2 id="pj-faq">{dict.faq.heading}</h2>
              <p>{L.faqNote}</p>
              <div className={styles.faqLinks}>
                <Link href={`/${locale}/faq`} className={styles.inlineLink}>{dict.faq.heading} {arrow}</Link>
                <Link href={`/${locale}/guides`} className={styles.inlineLink}>{E.guideHeading} {arrow}</Link>
              </div>
            </div>
            <div className={styles.faqItems}>
              {faqItems.map((item,i)=>(
                <div key={item.question} className={styles.faqItem}>
                  <h3>
                    <button aria-expanded={activeFaq===i} aria-controls={`pj-faq-${i}`} type="button"
                      onClick={()=>setActiveFaq(activeFaq===i?null:i)}>
                      <span>{item.question}</span><span className={styles.faqSymbol} aria-hidden="true">{activeFaq===i?'−':'+'}</span>
                    </button>
                  </h3>
                  <p id={`pj-faq-${i}`} hidden={activeFaq!==i}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
