import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { ArrowUpRight, ArrowLeft, ArrowRight, MapPin, Compass, ShieldCheck, Car, Clock3 } from 'lucide-react';
import { RouteNetworkDesk } from '@/components/routes/RouteNetworkDesk';
import { getPublishedRoutes } from '@/lib/public-routes';
import { getDbPricesCached } from '@/lib/pricing-db';
import styles from './routes-overhaul.module.css';

interface RoutesPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const ROUTES_LOCALIZED_HEADER: Record<
  Locale,
  {
    badge: string;
    title: string;
    subtitle: string;
    trustCash: string;
    trustFixed: string;
    trustFlight: string;
    allRoutesCount: string;
  }
> = {
  ar: {
    badge: 'شبكة مسارات الحرمين الشريفين',
    title: 'مسارات الحرمين الشريفين والنقل بين المدن',
    subtitle:
      'خدمات انتقالات VIP خاصة ومباشرة بين مطار جدة، مكة المكرمة، المدينة المنورة، الطائف، والرياض بأسعار ثابتة للمركبة بالكامل ودفع نقدي 100% عند الوصول.',
    trustCash: 'سداد نقدي عند الوصول',
    trustFixed: 'أجرة ثابتة للمركبة بالكامل',
    trustFlight: 'تتبع راداري لمواعيد الرحلات',
    allRoutesCount: 'المسارات المعتمدة للرحلات',
  },
  en: {
    badge: 'Holy Harameyn & Intercity Network',
    title: 'Popular Umrah & Intercity VIP Routes',
    subtitle:
      'Private executive chauffeur transfers connecting Jeddah Airport, Makkah, Madinah, Taif, and Riyadh with fixed rates per vehicle and 100% cash payment on arrival.',
    trustCash: '100% Cash on Arrival',
    trustFixed: 'Fixed Price Per Vehicle',
    trustFlight: 'Live Flight Radar Tracking',
    allRoutesCount: 'Official Chauffeur Routes',
  },
  ms: {
    badge: 'Rangkaian Laluan Tanah Suci & Antara Bandar',
    title: 'Laluan Umrah & Antara Bandar VIP',
    subtitle:
      'Perkhidmatan pemandu peribadi VIP antara Lapangan Terbang Jeddah, Makkah, Madinah, Taif, dan Riyadh dengan kadar tetap setiap kenderaan dan bayaran tunai semasa tiba.',
    trustCash: 'Bayar Tunai Semasa Tiba',
    trustFixed: 'Harga Tetap Setiap Kenderaan',
    trustFlight: 'Penjejakan Radar Penerbangan',
    allRoutesCount: 'Laluan Rasmi Pemandu VIP',
  },
  id: {
    badge: 'Jaringan Rute Tanah Suci & Antarkota',
    title: 'Rute Umrah & Antarkota VIP Populer',
    subtitle:
      'Layanan transfer mobil pribadi VIP menghubungkan Bandara Jeddah, Makkah, Madinah, Taif, dan Riyadh dengan harga pasti per kendaraan dan bayar tunai saat tiba.',
    trustCash: 'Bayar Tunai Saat Tiba',
    trustFixed: 'Harga Pasti Per Kendaraan',
    trustFlight: 'Pelacakan Radar Pesawat',
    allRoutesCount: 'Daftar Rute Resmi VIP',
  },
  ur: {
    badge: 'حرمین شریفین اور بین الشہری روٹس',
    title: 'مقبول عمرہ اور انٹر سٹی وی آئی پی روٹس',
    subtitle:
      'جدہ ایئرپورٹ، مکہ مکرمہ، مدینہ منورہ، طائف اور ریاض کے درمیان مقررہ کرایوں اور منزل پر نقد ادائیگی کے ساتھ نجی پریمیم ڈرائیور سروس۔',
    trustCash: 'منزل پر نقد ادائیگی',
    trustFixed: 'مکمل گاڑی کا مقررہ کرایہ',
    trustFlight: 'پروازوں کی لائیو ٹریکنگ',
    allRoutesCount: 'مجوزہ سرکاری روٹس',
  },
  fr: {
    badge: 'Réseau Interurbain & Lieux Saints',
    title: 'Itinéraires VIP Omra & Transferts Interurbains',
    subtitle:
      'Transferts privés avec chauffeur reliant l’Aéroport de Djeddah, La Mecque, Médine, Taïf et Riyad avec prix fixe par véhicule et paiement en espèces à l’arrivée.',
    trustCash: 'Paiement en Espèces à l’Arrivée',
    trustFixed: 'Prix Fixe Par Véhicule',
    trustFlight: 'Suivi des Vols en Direct',
    allRoutesCount: 'Itinéraires Officiels VIP',
  },
  es: {
    badge: 'Red de Rutas Sagradas e Interurbanas',
    title: 'Rutas VIP para Umrah y Conexiones Interurbanas',
    subtitle:
      'Traslados privados de lujo que conectan el Aeropuerto de Yeda, La Meca, Medina, Taif y Riad con tarifas fijas por vehículo y pago en efectivo al llegar.',
    trustCash: 'Pago en Efectivo al Llegar',
    trustFixed: 'Precio Fijo Por Vehículo',
    trustFlight: 'Rastreo de Vuelos en Vivo',
    allRoutesCount: 'Rutas Oficiales de Chófer VIP',
  },
  de: {
    badge: 'Streckennetz der Heiligen Stätten & Städte',
    title: 'Beliebte Umrah- & VIP-Überlandstrecken',
    subtitle:
      'Private Chauffeurtransfers zwischen Flughafen Dschidda, Mekka, Medina, Taif und Riad zu garantierten Festpreisen pro Fahrzeug und Barzahlung bei Ankunft.',
    trustCash: 'Barzahlung bei Ankunft',
    trustFixed: 'Festpreis Pro Fahrzeug',
    trustFlight: 'Flugüberwachung in Echtzeit',
    allRoutesCount: 'Offizielle Chauffeur-Routen',
  },
  tr: {
    badge: 'Haremeyn & Şehirlerarası Güzergah Ağı',
    title: 'Popüler Umre ve Şehirlerarası VIP Güzergahlar',
    subtitle:
      'Cidde Havalimanı, Mekke, Medine, Taif ve Riyad arasında araç başına sabit fiyatlar ve varışta nakit ödeme ile özel VIP şoförlü transferler.',
    trustCash: 'Varışta Nakit Ödeme',
    trustFixed: 'Araç Başına Sabit Fiyat',
    trustFlight: 'Canlı Uçuş Radarı Takibi',
    allRoutesCount: 'Resmi VIP Güzergahlar',
  },
  hi: {
    badge: 'पवित्र हरमैन व अंतर-शहरी मार्ग नेटवर्क',
    title: 'लोकप्रिय उमराह एवं अंतर-शहरी वीआईपी मार्ग',
    subtitle:
      'जेद्दा हवाई अड्डे, मक्का, मदीना, ताइफ़ और रियाद के बीच प्रति वाहन निश्चित दरों और आगमन पर नकद भुगतान के साथ निजी वीआईपी चौफ़र सेवा।',
    trustCash: 'आगमन पर 100% नकद भुगतान',
    trustFixed: 'प्रति वाहन निश्चित किराया',
    trustFlight: 'लाइव फ्लाइट रडार ट्रैकिंग',
    allRoutesCount: 'आधिकारिक वीआईपी मार्ग',
  },
};

export async function generateMetadata(props: RoutesPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;
  const meta = ROUTES_LOCALIZED_HEADER[locale] || ROUTES_LOCALIZED_HEADER.en;

  return {
    title: `${meta.title} | Duyuf Alrahman VIP`,
    description: meta.subtitle,
    alternates: getLocalizedAlternates(locale, '/routes'),
  };
}

export default async function RoutesPage(props: RoutesPageProps) {
  const { locale } = await props.params;
  const dict = getDictionary(locale);
  const [publicRoutes, liveRates] = await Promise.all([getPublishedRoutes(locale),getDbPricesCached()]);
  const rtl = locale === 'ar' || locale === 'ur';
  const header = ROUTES_LOCALIZED_HEADER[locale] || ROUTES_LOCALIZED_HEADER.en;
  const Arrow = rtl ? ArrowLeft : ArrowRight;
  const ui = {
    ar: { index:'دليل جميع المسارات', explore:'استكشف مساراتنا المعتمدة', full:'تفاصيل الرحلة', prices:'جدول الأسعار الكامل', book:'ابدأ طلب الحجز', fare:'سعر كامري لهذا المسار', cash:'الدفع نقدًا للسائق بعد الوصول', desk:'وجهات نخدمها', overline:'THE JOURNEY DIRECTORY' },
    en: { index:'All Routes', explore:'Explore our approved routes', full:'Route details', prices:'Complete fare list', book:'Request a private ride', fare:'Camry fare on this route', cash:'Pay the driver in cash after the journey', desk:'Destinations we serve', overline:'THE JOURNEY DIRECTORY' },
    ms: { index:'Semua Laluan', explore:'Terokai laluan kami', full:'Butiran perjalanan', prices:'Senarai tambang penuh', book:'Mohon perjalanan peribadi', fare:'Tambang Camry untuk laluan ini', cash:'Bayar tunai selepas perjalanan', desk:'Destinasi kami', overline:'DIREKTORI PERJALANAN' },
    id: { index:'Semua Rute', explore:'Jelajahi rute kami', full:'Detail rute', prices:'Daftar tarif lengkap', book:'Pesan perjalanan privat', fare:'Tarif Camry pada rute ini', cash:'Bayar tunai setelah perjalanan', desk:'Destinasi kami', overline:'DIREKTORI PERJALANAN' },
    ur: { index:'تمام راستے', explore:'ہمارے راستے دریافت کریں', full:'سفر کی تفصیل', prices:'مکمل کرایے', book:'نجی سفر کی درخواست', fare:'اس راستے پر کیمری کا کرایہ', cash:'سفر کے بعد نقد ادائیگی', desk:'ہماری منزلیں', overline:'راستوں کی فہرست' },
    fr: { index:'Tous les itinéraires', explore:'Découvrez nos itinéraires', full:'Détails du trajet', prices:'Tarifs complets', book:'Demander un transfert privé', fare:'Tarif Camry sur ce trajet', cash:'Paiement en espèces après le trajet', desk:'Nos destinations', overline:'RÉPERTOIRE DES TRAJETS' },
    es: { index:'Todas las rutas', explore:'Explora nuestras rutas', full:'Detalles del trayecto', prices:'Tarifas completas', book:'Solicitar traslado privado', fare:'Precio Camry en esta ruta', cash:'Paga en efectivo al terminar', desk:'Nuestros destinos', overline:'DIRECTORIO DE RUTAS' },
    de: { index:'Alle Routen', explore:'Entdecken Sie unsere Routen', full:'Routendetails', prices:'Vollständige Preise', book:'Privatfahrt anfragen', fare:'Camry-Preis für diese Route', cash:'Barzahlung nach der Fahrt', desk:'Unsere Reiseziele', overline:'ROUTENVERZEICHNIS' },
    tr: { index:'Tüm Rotalar', explore:'Rotalarımızı keşfedin', full:'Rota detayları', prices:'Tüm fiyatlar', book:'Özel transfer isteyin', fare:'Bu rota için Camry ücreti', cash:'Yolculuk sonrası nakit ödeme', desk:'Hizmet verdiğimiz yerler', overline:'GÜZERGAH REHBERİ' },
    hi: { index:'सभी मार्ग', explore:'हमारे मार्ग देखें', full:'यात्रा विवरण', prices:'पूरी किराया सूची', book:'निजी यात्रा बुक करें', fare:'इस मार्ग पर कैमरी किराया', cash:'यात्रा के बाद नकद भुगतान', desk:'हमारे गंतव्य', overline:'यात्रा मार्ग सूची' },
  }[locale];
  return (
    <main className={styles.page} dir={rtl ? 'rtl' : 'ltr'}>
      <section className={styles.hero} aria-labelledby="routes-overhaul-heading">
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label={dict.nav.routes}>
            <Link href={'/'+locale}>{dict.nav.home}</Link><span aria-hidden="true">/</span><span>{dict.nav.routes}</span>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <span className={styles.eyebrow}>DUYUF AL RAHMAN / 02</span>
              <h1 id="routes-overhaul-heading">{header.title}</h1>
              <p>{header.subtitle}</p>
              <div className={styles.heroActions}>
                <a href="#journey-explorer" className={styles.inkButton}>{ui.explore}<Arrow size={17} aria-hidden="true"/></a>
                <Link href={'/'+locale+'/booking'} className={styles.lineButton}>{ui.book}<ArrowUpRight size={17} aria-hidden="true"/></Link>
              </div>
            </div>
            <div className={styles.heroAside}>
              <span>{ui.desk}</span>
              <div className={styles.destinationLine}>JEDDAH <span>·</span> MAKKAH <span>·</span> MADINAH <span>·</span> TAIF <span>·</span> RIYADH</div>
              <p><ShieldCheck size={16} aria-hidden="true"/>{ui.cash}</p>
            </div>
          </div>
        </div>
      </section>
      <div id="journey-explorer" className={styles.explorer}><RouteNetworkDesk locale={locale} routes={publicRoutes} rates={liveRates} /></div>
      <section className={styles.directory} aria-labelledby="routes-all-heading">
        <div className={styles.container}>
          <div className={styles.directoryHeader}>
            <div><span className={styles.eyebrow}>{ui.overline}</span><h2 id="routes-all-heading">{ui.index}</h2></div>
            <Link className={styles.allPrices} href={'/'+locale+'/pricing'}>{ui.prices}<ArrowUpRight size={17} aria-hidden="true"/></Link>
          </div>
          <ol className={styles.list}>
            {publicRoutes.map((route,i)=>{
              const price=liveRates[route.slug]?.camry;
              const formatted=typeof price==='number'&&Number.isFinite(price)&&price>0
                ? new Intl.NumberFormat(locale==='ar'?'ar-SA':'en-US').format(price)+' SAR' : null;
              return (
                <li key={route.slug} className={styles.item}>
                  <Link href={'/'+locale+(route.hasDetails?'/routes/':'/booking?route=')+route.slug} aria-label={(route.titles?.[locale] || route.titleEn)+' — '+ui.full}>
                    <span className={styles.index}>{String(i+1).padStart(2,'0')}</span>
                    <span className={styles.name}>
                      <strong>{route.titles?.[locale] || route.titleEn}</strong>
                      <small><Clock3 size={13} aria-hidden="true"/>{route.times?.[locale] || route.timeEn}<span aria-hidden="true">·</span><MapPin size={13} aria-hidden="true"/>{route.distances?.[locale] || route.distanceEn}</small>
                    </span>
                    <span className={styles.fare}>{formatted && <><small>{ui.fare}</small><strong>{formatted}</strong></>}</span>
                    <span className={styles.open}><Arrow size={19} aria-hidden="true"/></span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className={styles.directoryFooter}><p>{ui.cash}</p><Link href={'/'+locale+'/pricing'}>{ui.prices}<ArrowUpRight size={17} aria-hidden="true"/></Link></div>
        </div>
      </section>
    </main>
  );
}
