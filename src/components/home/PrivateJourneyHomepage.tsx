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
  ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check,
  ChevronLeft, ChevronRight, Clock3, Headphones, Luggage,
  MapPin, Plane, ShieldCheck, Users, Wallet, BookOpen,
  Navigation, CarFront, Compass, Sparkles,
} from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { useCurrency } from '@/context/CurrencyContext';
import { APPROVED_5_FLEET } from '@/data/approved-fleet-homepage';
import { AUTHORITATIVE_TRANSFER_RATES, LOCALIZED_ROUTE_NAMES } from '@/lib/pricing-constants';
import styles from './PrivateJourneyHomepage.module.css';
import { DuyufSignature } from '@/components/brand/DuyufSignature';

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

const ARC_IMAGES = [
  { src: '/assets/homepage-v2/ziyarat-haram.jpg', alt: 'Makkah Masjid al-Haram' },
  { src: '/assets/homepage-v2/route-makkah-madinah.jpg', alt: 'Makkah and Madinah transfer' },
  { src: '/assets/homepage-v2/route-jeddah-makkah.jpg', alt: 'Jeddah airport transfer' },
  { src: '/assets/homepage-v2/service-madinah.jpg', alt: 'Madinah and private transportation' },
  { src: '/assets/images/routes/makkah-to-taif.jpg', alt: 'Taif mountains' },
  { src: '/assets/homepage-v2/chauffeur-welcome.jpg', alt: 'Saudi hospitality chauffeur welcome' },
  { src: '/assets/images/routes/makkah-ziyarat.jpg', alt: 'Makkah ziyarat visits' },
];

function safeLocalDate() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit' })
    .format(new Date());
}

export function PrivateJourneyHomepage({ locale, dict }: Props) {
  const isRtl = locale === 'ar' || locale === 'ur';
  const L = COPY[locale];
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
  const [activeRoute, setActiveRoute] = useState(0);
  const [activeVehicle, setActiveVehicle] = useState(1);
  const [interior, setInterior] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const arrow = isRtl ? <ArrowLeft size={18} aria-hidden /> : <ArrowRight size={18} aria-hidden />;
  const minDate = useMemo(safeLocalDate, []);
  const selectedRoute = FEATURED_ROUTES[activeRoute];
  const selectedFleetVehicle = APPROVED_5_FLEET[activeVehicle];
  const selectedRoutePrice = AUTHORITATIVE_TRANSFER_RATES[selectedRoute.slug]?.camry;
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
              <p className={styles.underHero}><ShieldCheck size={16} aria-hidden /> {dict.booking_card.noPrepayNotice}</p>
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
          <div><Wallet size={24} aria-hidden /><span>{L.payment}</span></div>
          <div><Plane size={24} aria-hidden /><span>{L.flight}</span></div>
          <div><Clock3 size={24} aria-hidden /><span>{L.cancellation}</span></div>
          <div><ShieldCheck size={24} aria-hidden /><span>{L.allIncluded}</span></div>
        </div>
      </section>

      <section className={styles.destinationSection} aria-labelledby="pj-destinations">
        <div className={styles.wrap}>
          <div className={styles.centerHead}>
            <p className={styles.overline}>{L.curated}</p>
            <h2 id="pj-destinations">{L.destinations}</h2>
            <p>{dict.services.subtitle}</p>
          </div>
          <div className={styles.arcTrack} role="list" aria-label={L.curated}>
            {ARC_IMAGES.map((item,i)=>(
              <div className={styles.arcPhoto} role="listitem" key={item.src}>
                <img src={item.src} alt={item.alt} loading="lazy" />
                <span>{String(i+1).padStart(2,'0')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.editorialSection} id="services" aria-labelledby="pj-services">
        <div className={styles.wrap}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.overline}>{L.servicesKicker}</p><h2 id="pj-services">{dict.services.heading} <em>{dict.services.headingHighlight}</em></h2></div>
            <p>{dict.services.subtitle}</p>
          </div>
          <div className={styles.editorialGrid}>
            <Link href={`/${locale}/booking?route=jeddah-airport-to-makkah`} className={`${styles.editorialCard} ${styles.editorialMain}`}>
              <img src="/assets/homepage-v2/route-jeddah-makkah.jpg" alt={dict.services.airportTitle} loading="lazy" />
              <div className={styles.cardShade} />
              <div className={styles.editorialContent}><span>01 / {dict.nav.services}</span><h3>{dict.services.airportTitle}</h3><p>{dict.services.airportDesc}</p><span className={styles.edArrow}><ArrowUpRight size={24}/></span></div>
            </Link>
            <Link href={`/${locale}/routes`} className={styles.editorialCard}>
              <img src="/assets/homepage-v2/route-makkah-madinah.jpg" alt={dict.services.intercityTitle} loading="lazy" />
              <div className={styles.cardShade} />
              <div className={styles.editorialContent}><span>02 / {dict.nav.services}</span><h3>{dict.services.intercityTitle}</h3><span className={styles.edArrow}><ArrowUpRight size={21}/></span></div>
            </Link>
            <Link href={`/${locale}/ziyarat`} className={styles.editorialCard}>
              <img src="/assets/homepage-v2/service-madinah.jpg" alt={dict.services.ziyaratTitle} loading="lazy" />
              <div className={styles.cardShade} />
              <div className={styles.editorialContent}><span>03 / {dict.nav.services}</span><h3>{dict.services.ziyaratTitle}</h3><span className={styles.edArrow}><ArrowUpRight size={21}/></span></div>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.routesSection} id="routes" aria-labelledby="pj-routes">
        <div className={styles.wrap}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.overline}>{dict.popular_routes.sectionPill}</p><h2 id="pj-routes">{dict.popular_routes.heading} <em>{dict.popular_routes.headingHighlight}</em></h2></div>
            <Link className={styles.inlineLink} href={`/${locale}/routes`}>{L.exploreRoutes} {arrow}</Link>
          </div>
          <div className={styles.routeExplorer} tabIndex={0} onKeyDown={(e)=>{
            if (e.target !== e.currentTarget) return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
              e.preventDefault();
              const delta = (e.key === 'ArrowRight') !== isRtl ? 1 : -1;
              setActiveRoute(i => (i + delta + FEATURED_ROUTES.length) % FEATURED_ROUTES.length);
            }
          }} aria-label={dict.popular_routes.heading}>
            <div className={styles.routeText}>
              <span className={styles.routeCount}>0{activeRoute+1} <span>/ 0{FEATURED_ROUTES.length}</span></span>
              <h3>{LOCALIZED_ROUTE_NAMES[selectedRoute.slug]?.[locale]}</h3>
              <p>{selectedRoute.category === 'airport' ? dict.services.airportDesc : dict.services.intercityDesc}</p>
              <div className={styles.routeFare}>
                {typeof selectedRoutePrice === 'number' && <><span>{dict.popular_routes.fromPrice}</span><strong>{formatPrice(selectedRoutePrice)}</strong></>}
              </div>
              <div className={styles.routeFoot}>
                <Link className={styles.buttonPrimary} href={`/${locale}/booking?route=${selectedRoute.slug}`}>{dict.hero.ctaBook} {arrow}</Link>
                <div className={styles.carouselControls}>
                  <button type="button" aria-label={L.previous} onClick={()=>setActiveRoute(i=>(i+FEATURED_ROUTES.length-1)%FEATURED_ROUTES.length)}><ChevronLeft size={20}/></button>
                  <button type="button" aria-label={L.next} onClick={()=>setActiveRoute(i=>(i+1)%FEATURED_ROUTES.length)}><ChevronRight size={20}/></button>
                </div>
              </div>
            </div>
            <div className={styles.routeImage}>
              <img src={selectedRoute.image} alt={LOCALIZED_ROUTE_NAMES[selectedRoute.slug]?.[locale]} loading="lazy" />
              <div className={styles.routeImageMarker}><Compass size={19}/><span>{LOCALIZED_ROUTE_NAMES[selectedRoute.slug]?.[locale]}</span></div>
            </div>
          </div>
          <div className={styles.routeDots} role="group" aria-label={dict.popular_routes.heading}>
            {FEATURED_ROUTES.map((r,i)=><button key={r.slug} aria-label={LOCALIZED_ROUTE_NAMES[r.slug]?.[locale]} aria-pressed={i===activeRoute} className={i===activeRoute?styles.dotActive:''} onClick={()=>setActiveRoute(i)}><span/></button>)}
          </div>
        </div>
      </section>

      <section className={styles.fleetSection} id="fleet" aria-labelledby="pj-fleet">
        <div className={styles.wrap}>
          <div className={styles.sectionHeading}>
            <div><p className={styles.overline}>{dict.cinematic_fleet.eyebrow}</p><h2 id="pj-fleet">{L.carGallery}</h2></div>
            <Link className={styles.inlineLink} href={`/${locale}/fleet`}>{dict.hero.ctaFleet} {arrow}</Link>
          </div>
          <div className={styles.fleetSelector} role="group" aria-label={dict.cinematic_fleet.title}>
            {APPROVED_5_FLEET.map((car,i)=>(
              <button key={car.id} type="button" className={i===activeVehicle?styles.carSelected:''} aria-pressed={i===activeVehicle}
                onClick={()=>{setActiveVehicle(i);setInterior(false);}}>{car.name[locale]}</button>
            ))}
          </div>
          <div className={styles.fleetStage}>
            <div className={styles.fleetImage}>
              <img key={selectedFleetVehicle.id + (interior?'in':'out')} src={interior?selectedFleetVehicle.interiorImage:selectedFleetVehicle.exteriorImage} alt={selectedFleetVehicle.name[locale]} loading="lazy" />
              <div className={styles.fleetSignature} aria-hidden="true">
                <DuyufSignature className={styles.fleetSignatureGlyph} />
              </div>
              <div className={styles.imageToggle} role="group" aria-label={dict.fleet.viewExterior}>
                <button type="button" aria-pressed={!interior} className={!interior?styles.photoActive:''} onClick={()=>setInterior(false)}>{dict.fleet.viewExterior}</button>
                <button type="button" aria-pressed={interior} className={interior?styles.photoActive:''} onClick={()=>setInterior(true)}>{dict.fleet.viewInterior}</button>
              </div>
            </div>
            <div className={styles.fleetInfo}>
              <p className={styles.overline}>{selectedFleetVehicle.categoryBadge[locale]}</p>
              <h3>{selectedFleetVehicle.name[locale]}</h3>
              <p>{(selectedFleetVehicle.summary[locale] || L.servicePromise)}</p>
              <div className={styles.fleetSpecs}>
                <div><Users size={19}/><span><strong>{selectedFleetVehicle.passengers}</strong> {dict.cinematic_fleet.passengers}</span></div>
                <div><Luggage size={19}/><span><strong>{selectedFleetVehicle.luggage}</strong> {dict.cinematic_fleet.luggage}</span></div>
              </div>
              <ul className={styles.featureList}>{(selectedFleetVehicle.features[locale] ?? [L.servicePromise]).slice(0,3).map(f=><li key={f}><Check size={16}/>{f}</li>)}</ul>
              {typeof selectedFleetPrice==='number' && <p className={styles.fleetPrice}>{dict.cinematic_fleet.startingFrom} <strong>{formatPrice(selectedFleetPrice)}</strong><small>{LOCALIZED_ROUTE_NAMES['jeddah-airport-to-makkah'][locale]}</small></p>}
              <div className={styles.fleetActions}>
                <Link href={`/${locale}/fleet/${selectedFleetVehicle.slug}`} className={styles.buttonPrimary}>{L.openGallery} {arrow}</Link>
                <Link href={`/${locale}/booking?vehicle=${selectedFleetVehicle.bookingParam}`} className={styles.buttonText}>{dict.fleet.bookNowButton}<ArrowUpRight size={18}/></Link>
              </div>
            </div>
          </div>
          <p className={styles.fleetFootnote}>{dict.fleet.subtitle}</p>
        </div>
      </section>

      <section className={styles.processSection} id="how-it-works">
        <div className={styles.wrap}>
          <div className={styles.sectionHeading}><div><p className={styles.overline}>{L.howLabel}</p><h2>{L.privateLabel}</h2></div></div>
          <div className={styles.processGrid}>
            {[
              [dict.steps.step1Title, dict.steps.step1Desc],
              [L.stepDetails, dict.booking_card.subtitle],
              [L.stepChoose, dict.steps.step2Desc],
              [L.stepReview, L.payment],
            ].map(([title, desc],i)=><div className={styles.processStep} key={i}><span>0{i+1}</span><h3>{title}</h3><p>{desc}</p></div>)}
          </div>
        </div>
      </section>

      <section className={styles.guidesSection} id="guides">
        <div className={styles.wrap}>
          <div className={styles.sectionHeading}><div><p className={styles.overline}>{dict.guides_section.sectionPill}</p><h2>{dict.guides_section.heading} <em>{dict.guides_section.headingHighlight}</em></h2></div><Link className={styles.inlineLink} href={`/${locale}/guides`}>{dict.nav.guides} {arrow}</Link></div>
          <div className={styles.guideGrid}>
            {[
              {href:'jeddah-airport-arrival-guide', image:'/assets/images/jeddah-airport-pickup-umrah.webp', title:dict.guides_section.guide2Title, desc:dict.guides_section.guide2Desc},
              {href:'makkah-to-madinah-transport-comparison', image:'/assets/homepage-v2/route-makkah-madinah.jpg', title:dict.guides_section.guide3Title, desc:dict.guides_section.guide3Desc},
              {href:'malaysia-umrah-transport',image:'/assets/homepage-v2/ziyarat-haram.jpg',title:dict.guides_section.guide1Title,desc:dict.guides_section.guide1Desc}
            ].map((article,i)=><Link key={article.href} className={styles.guideCard} href={`/${locale}/guides/${article.href}`}>
              <div className={styles.guidePhoto}><img src={article.image} alt="" loading="lazy" /></div><div className={styles.guideBody}><span>{dict.nav.guides} / 0{i+1}</span><h3>{article.title}</h3><p>{article.desc}</p><span className={styles.guideRead}>{dict.guides_section.readGuide} <ArrowUpRight size={18}/></span></div>
            </Link>)}
          </div>
        </div>
      </section>

      <section className={styles.faqSection} id="faq">
        <div className={styles.wrap}>
          <div className={styles.faqGrid}>
            <div className={styles.faqIntro}>
              <p className={styles.overline}>{dict.faq.sectionPill}</p><h2>{dict.faq.heading}</h2><p>{L.faqNote}</p>
              <Link href={`/${locale}/reviews`} className={styles.inlineLink}><ShieldCheck size={17}/>{L.reviewRequest} {arrow}</Link>
              <div className={styles.faqImage}><img src="/assets/homepage-v2/chauffeur-welcome.jpg" alt="Private chauffeur greeting a guest" loading="lazy" /></div>
            </div>
            <div className={styles.faqItems}>
              {faqItems.map((item,i)=><div key={item.question} className={styles.faqItem}>
                <button aria-expanded={activeFaq===i} aria-controls={`pj-faq-${i}`} type="button" onClick={()=>setActiveFaq(activeFaq===i?null:i)}><span>{item.question}</span><span className={styles.faqSymbol}>{activeFaq===i?'−':'+'}</span></button>
                {activeFaq===i && <p id={`pj-faq-${i}`}>{item.answer}</p>}
              </div>)}
              <Link className={styles.buttonText} href={`/${locale}/faq`}>{dict.faq.heading} {arrow}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
