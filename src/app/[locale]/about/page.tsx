import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, MapPin, ShieldCheck } from 'lucide-react';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import styles from './about-story.module.css';

interface AboutPageProps { params:Promise<{locale:Locale}> }

export async function generateMetadata({params}:AboutPageProps):Promise<Metadata>{
  const {locale}=await params;
  const dict=getDictionary(locale);
  return {title:dict.page_about.title,description:dict.page_about.subtitle,alternates:getLocalizedAlternates(locale,'/about')};
}

export default async function AboutPage({params}:AboutPageProps){
 const {locale}=await params;
 const dict=getDictionary(locale);
 const rtl=locale==='ar'||locale==='ur';
 const Arrow=rtl?ArrowLeft:ArrowRight;
 const values=[
  {title:dict.page_about.value1Title,desc:dict.page_about.value1Desc,icon:Clock3},
  {title:dict.page_about.value2Title,desc:dict.page_about.value2Desc,icon:ShieldCheck},
  {title:dict.page_about.value3Title,desc:dict.page_about.value3Desc,icon:Check},
 ];
 const labels:Record<Locale,{story:string;what:string;promise:string;direction:string;route:string;journey:string;book:string}>={
  ar:{story:'قصتنا',what:'القيم التي تقود كل رحلة',promise:'كيف نهتم بتفاصيل رحلتك',direction:'من أول استقبال إلى وجهتك',route:'بين الحرمين ومدن المملكة',journey:'رحلة خاصة تستحق العناية',book:'اطلب حجز رحلتك الخاصة'},
  en:{story:'OUR STORY',what:'The values behind every journey',promise:'How we care for every detail',direction:'From your arrival to your destination',route:'Across the Holy Cities and Saudi Arabia',journey:'A private journey worth caring for',book:'Request your private ride'},
  ms:{story:'KISAH KAMI',what:'Nilai di sebalik setiap perjalanan',promise:'Perhatian kepada setiap perincian',direction:'Dari ketibaan hingga destinasi',route:'Di seluruh kota suci dan Arab Saudi',journey:'Perjalanan peribadi yang istimewa',book:'Mohon perjalanan peribadi'},
  id:{story:'KISAH KAMI',what:'Nilai di setiap perjalanan',promise:'Perhatian pada setiap detail',direction:'Dari kedatangan hingga tujuan',route:'Kota suci dan Arab Saudi',journey:'Perjalanan privat penuh perhatian',book:'Pesan perjalanan privat'},
  ur:{story:'ہماری کہانی',what:'ہر سفر میں ہماری اقدار',promise:'آپ کے سفر کی ہر تفصیل',direction:'آمد سے منزل تک',route:'حرمین اور سعودی عرب کے شہر',journey:'خصوصی سفر، خاص خیال',book:'نجی سفر کی درخواست دیں'},
  fr:{story:'NOTRE HISTOIRE',what:'Les valeurs de chaque trajet',promise:'Notre attention aux détails',direction:'De votre arrivée à destination',route:'Les villes saintes et l’Arabie saoudite',journey:'Un trajet privé qui mérite le meilleur',book:'Demander votre transfert'},
  es:{story:'NUESTRA HISTORIA',what:'Valores que guían cada viaje',promise:'Cuidamos cada detalle',direction:'Desde tu llegada hasta tu destino',route:'Las ciudades santas y Arabia Saudita',journey:'Un viaje privado con atención',book:'Solicitar traslado privado'},
  de:{story:'UNSERE GESCHICHTE',what:'Werte für jede Reise',promise:'Jedes Detail zählt',direction:'Von der Ankunft bis zum Ziel',route:'In den heiligen Städten und Saudi-Arabien',journey:'Eine private Reise mit besonderer Betreuung',book:'Privatfahrt anfragen'},
  tr:{story:'HİKÂYEMİZ',what:'Her yolculuğumuzun değerleri',promise:'Her ayrıntıya özen',direction:'Varıştan hedefe kadar',route:'Kutsal şehirler ve Suudi Arabistan',journey:'Özenli bir özel yolculuk',book:'Özel transfer talep edin'},
  hi:{story:'हमारी कहानी',what:'हर यात्रा के हमारे मूल्य',promise:'हर विवरण का ध्यान',direction:'आगमन से गंतव्य तक',route:'पवित्र शहरों और सऊदी अरब में',journey:'एक खास निजी यात्रा',book:'निजी यात्रा अनुरोध करें'},
 };
 const t=labels[locale];
 const metrics=({
  ar:{wait:'دقيقة انتظار بالمطار',every:'خدمة ومتابعة',stop:'دقيقة توقف ميقات مؤهل'},
  en:{wait:'airport waiting minutes',every:'service & assistance',stop:'eligible Miqat stop, minutes'},
  ms:{wait:'minit menunggu di lapangan terbang',every:'khidmat & bantuan',stop:'minit di Miqat yang layak'},
  id:{wait:'menit menunggu di bandara',every:'layanan & bantuan',stop:'menit di Miqat yang memenuhi syarat'},
  ur:{wait:'ایئرپورٹ پر انتظار کے منٹ',every:'سروس اور مدد',stop:'اہل میقات قیام کے منٹ'},
  fr:{wait:'minutes d’attente à l’aéroport',every:'service et assistance',stop:'minutes au Miqat éligible'},
  es:{wait:'minutos de espera en aeropuerto',every:'servicio y asistencia',stop:'minutos en Miqat elegible'},
  de:{wait:'Minuten Wartezeit am Flughafen',every:'Service und Betreuung',stop:'Minuten Miqat-Halt (falls zutreffend)'},
  tr:{wait:'dakika havalimanı bekleme',every:'hizmet ve destek',stop:'dakika uygun Miqat molası'},
  hi:{wait:'मिनट एयरपोर्ट प्रतीक्षा',every:'सेवा और सहायता',stop:'मिनट योग्य मीक़ात ठहराव'},
 } as Record<Locale,{wait:string;every:string;stop:string}>)[locale];

 return (
 <main className={styles.page} dir={rtl?'rtl':'ltr'}>
   <section className={styles.hero}>
     <div className={styles.heroImage}>
       <Image src="/assets/homepage-v2/route-jeddah-makkah.jpg" fill priority alt={t.direction} sizes="(max-width:780px) 100vw, 48vw"/>
       <div className={styles.heroImageCaption}><MapPin size={15} aria-hidden="true"/>{t.route}</div>
     </div>
     <div className={styles.heroCopy}>
       <nav aria-label={dict.nav.about} className={styles.crumb}><Link href={'/'+locale}>{dict.nav.home}</Link><span aria-hidden="true">/</span><span>{dict.nav.about}</span></nav>
       <span className={styles.micro}>DUYUF AL RAHMAN VIP <b> / 01</b></span>
       <h1>{dict.page_about.title}</h1>
       <p>{dict.page_about.subtitle}</p>
       <Link href={'/'+locale+'/booking'} className={styles.heroCta}>{t.book}<Arrow size={17} aria-hidden="true"/></Link>
       <span className={styles.cornerMark} aria-hidden="true">01 — 04</span>
     </div>
   </section>

   <section className={styles.story} aria-labelledby="about-story-title">
     <div className={styles.container}>
       <div className={styles.storyGrid}>
         <div className={styles.storyAside}>
           <span className={styles.micro}>02 / {t.story}</span>
           <span className={styles.storyRule} aria-hidden="true"/>
           {/* Video 07's restrained service orbit + Video 08's VERIFIED facts;
               do not replace with fake satisfaction/customer numbers. */}
           <dl className={styles.serviceOrbit} aria-label={t.promise}>
             <div className={styles.orbitWait}><dt>60</dt><dd>{metrics.wait}</dd></div>
             <div className={styles.orbitSupport}><dt>24/7</dt><dd>{metrics.every}</dd></div>
             <div className={styles.orbitMiqat}><dt>30–45</dt><dd>{metrics.stop}</dd></div>
           </dl>
         </div>
         <div className={styles.storyContent}>
           <h2 id="about-story-title">{dict.page_about.storyTitle}</h2>
           <p className={styles.lead}>{dict.page_about.storyP1}</p>
           <p>{dict.page_about.storyP2}</p>
         </div>
       </div>
     </div>
   </section>

   <section className={styles.values} aria-labelledby="about-values-title">
     <div className={styles.container}>
       <div className={styles.valuesHeader}>
         <span className={styles.micro}>03 / OUR APPROACH</span>
         <h2 id="about-values-title">{t.what}</h2>
       </div>
       <div className={styles.valueLayout}>
         <div className={styles.valueImage}>
           <Image src="/assets/homepage-v2/service-group-interior.jpg" fill alt={t.promise} sizes="(max-width:820px) 100vw, 48vw"/>
           <span className={styles.imageLabel}>{t.direction}</span>
         </div>
         <div className={styles.valueList}>
           {values.map((value,i)=>{
             const Icon=value.icon;
             return <article key={value.title} className={styles.valueRow}>
               <div className={styles.valueNumber}>{String(i+1).padStart(2,'0')}</div>
               <div><h3>{value.title}</h3><p>{value.desc}</p></div>
               <Icon size={21} aria-hidden="true"/>
             </article>;
           })}
         </div>
       </div>
     </div>
   </section>

   <section className={styles.final}>
     <div className={styles.container}>
       <div className={styles.finalRule}><span>04 / DUYUF VIP</span><span>{t.promise}</span></div>
       <div className={styles.finalGrid}>
         <div><h2>{t.journey}</h2><p>{dict.booking_card.noPrepayNotice}</p></div>
         <div className={styles.finalActions}>
           <Link className={styles.primary} href={'/'+locale+'/booking'}>{t.book}<Arrow size={19} aria-hidden="true"/></Link>
           <Link className={styles.secondary} href={'/'+locale+'/fleet'}>{dict.nav.fleet}<ArrowUpRight size={17} aria-hidden="true"/></Link>
         </div>
       </div>
     </div>
   </section>
 </main>);
}
