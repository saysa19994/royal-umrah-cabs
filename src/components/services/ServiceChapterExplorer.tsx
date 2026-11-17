'use client';

import {useRef,useState,type KeyboardEvent} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft,ArrowRight,ArrowUpRight,Check,MapPin,Plane,Landmark,Navigation,Building2,Users,Headphones} from 'lucide-react';
import type {Locale} from '@/i18n/config';
import {LOCALIZED_ROUTE_NAMES} from '@/lib/pricing-constants';
import styles from './ServiceChapterExplorer.module.css';

export type ServiceChapter = {
 id:string;title:string;desc:string;image:string;badge:string;locations:string;
 highlights:string[];relatedRoutes:{href:string;title:string}[];
};
type Copy={
 kicker:string;heading:string;subtitle:string;coverage:string;benefits:string;related:string;request:string;
 details:string;count:string;names:[string,string,string,string,string,string];descs:[string,string,string,string,string,string];
};
const TEXT:Record<Locale,Copy>={
 ar:{kicker:'خدمات رحلتك',heading:'خدمة واحدة. كل ما تحتاج معرفته.',subtitle:'اختر نوع الرحلة وشاهد تفاصيلها ومساراتها بدون عشرات البطاقات المتكررة.',coverage:'مناطق الخدمة',benefits:'ما الذي تتضمنه؟',related:'انتقل إلى التفاصيل',request:'اطلب هذه الخدمة',details:'المزيد عن الخدمة',count:'الخدمة',names:['استقبال المطارات','جولات المزارات','التنقل بين المدن','التوصيل للفنادق','نقل العائلات والمجموعات','المتابعة والدعم'],descs:['استقبال خاص من مطاري جدة والمدينة، ومتابعة رحلة الطيران والتوصيل إلى الفندق.','جولات خاصة لزيارة المواقع التاريخية في مكة والمدينة مع سائق ومركبة مناسبة للعائلة.','تنقلات بين مكة والمدينة وجدة والطائف والرياض بسيارة خاصة وسائق.','تنسيق الوصول إلى الفنادق ونقاط الالتقاء المناسبة مع المساعدة في الأمتعة.','سيارات عائلية وفانات وحافلات تناسب أعداد الركاب والأمتعة المختلفة.','التنسيق والاستفسارات وتحديثات ترتيبات الرحلات على مدار الساعة.']},
 en:{kicker:'YOUR PRIVATE TRANSFER',heading:'Choose a service. Explore it properly.',subtitle:'One focused journey at a time, with real route links and a clear booking request.',coverage:'Service coverage',benefits:'Service details',related:'Explore relevant pages',request:'Request this service',details:'More information',count:'Service',names:['Airport arrivals','Ziyarat visits','Intercity journeys','Hotel transfers','Families & groups','Travel assistance'],descs:['Private pickup at Jeddah and Madinah airports with flight monitoring and hotel transfers.','Private journeys to historic sites in Makkah and Madinah with a suitable vehicle and driver.','Private journeys between Makkah, Madinah, Jeddah, Taif and Riyadh.','Coordinated hotel arrivals and meeting points, with luggage assistance.','Family cars, spacious vans and buses selected for your group and luggage.','Travel arrangements, questions and updates coordinated around the clock.']},
 ms:{kicker:'PERJALANAN PERIBADI',heading:'Pilih perkhidmatan anda.',subtitle:'Satu pilihan pada satu masa, dengan pautan laluan dan permintaan tempahan yang jelas.',coverage:'Kawasan perkhidmatan',benefits:'Maklumat perkhidmatan',related:'Lihat laluan berkaitan',request:'Mohon perkhidmatan',details:'Maklumat lanjut',count:'Perkhidmatan',names:['Sambutan lapangan terbang','Lawatan ziarah','Perjalanan antara bandar','Pemindahan hotel','Keluarga dan kumpulan','Bantuan perjalanan'],descs:['Pengambilan peribadi di lapangan terbang Jeddah dan Madinah dengan pemantauan penerbangan.','Perjalanan peribadi ke tempat bersejarah di Makkah dan Madinah.','Perjalanan antara Makkah, Madinah, Jeddah, Taif dan Riyadh.','Ketibaan hotel dan tempat bertemu dengan bantuan bagasi.','Kereta, van dan bas untuk keluarga serta kumpulan.','Bantuan dan penyelarasan perjalanan sepanjang masa.']},
 id:{kicker:'PERJALANAN PRIVAT',heading:'Pilih layanan sesuai perjalanan.',subtitle:'Satu layanan setiap saat, dengan rute dan permintaan pemesanan yang jelas.',coverage:'Wilayah layanan',benefits:'Rincian layanan',related:'Lihat rute terkait',request:'Ajukan layanan ini',details:'Informasi lanjut',count:'Layanan',names:['Penjemputan bandara','Perjalanan ziarah','Antarkota','Transfer hotel','Keluarga dan rombongan','Bantuan perjalanan'],descs:['Penjemputan pribadi dari bandara Jeddah dan Madinah dengan pemantauan penerbangan.','Kunjungan pribadi ke tempat bersejarah di Makkah dan Madinah.','Perjalanan privat antara Makkah, Madinah, Jeddah, Taif, dan Riyadh.','Koordinasi penjemputan hotel dan bantuan bagasi.','Mobil keluarga, van, dan bus untuk rombongan.','Bantuan dan koordinasi perjalanan sepanjang waktu.']},
 ur:{kicker:'نجی سفر',heading:'اپنی خدمت منتخب کریں۔',subtitle:'ہر خدمت کی ضروری تفصیل، متعلقہ راستے اور واضح بکنگ درخواست۔',coverage:'سروس کے علاقے',benefits:'سروس کی تفصیلات',related:'متعلقہ راستے',request:'اس سروس کی درخواست',details:'مزید معلومات',count:'خدمت',names:['ہوائی اڈے سے استقبال','زیارات','شہروں کے درمیان سفر','ہوٹل ٹرانسفر','خاندان اور گروپ','سفری معاونت'],descs:['جدہ اور مدینہ ایئرپورٹ سے نجی استقبال، فلائٹ مانیٹرنگ اور ہوٹل تک سفر۔','مکہ اور مدینہ کے تاریخی مقامات کا نجی سفر۔','مکہ، مدینہ، جدہ، طائف اور ریاض کے درمیان نجی سفر۔','ہوٹل آمد اور سامان کی منتقلی میں تعاون۔','خاندانوں کے لیے کاریں، وین اور بسیں۔','ہر وقت سفر کی منصوبہ بندی اور معلومات میں معاونت۔']},
 fr:{kicker:'TRANSFERT PRIVÉ',heading:'Choisissez votre service.',subtitle:'Un service à la fois avec ses trajets et une demande de réservation claire.',coverage:'Zones desservies',benefits:'Détails du service',related:'Parcours associés',request:'Demander ce service',details:'En savoir plus',count:'Service',names:['Accueil aéroport','Visites Ziyarat','Trajets entre villes','Transferts hôteliers','Familles et groupes','Assistance voyage'],descs:['Accueil privé aux aéroports de Djeddah et Médine avec suivi des vols.','Visites privées de lieux historiques à La Mecque et Médine.','Trajets privés entre La Mecque, Médine, Djeddah, Taïf et Riyad.','Accueil à l’hôtel et aide aux bagages.','Voitures, vans et bus adaptés aux familles et groupes.','Assistance et coordination des trajets à toute heure.']},
 es:{kicker:'TRASLADO PRIVADO',heading:'Elige tu servicio.',subtitle:'Un servicio a la vez, con rutas reales y una solicitud de reserva clara.',coverage:'Zonas de servicio',benefits:'Detalles del servicio',related:'Rutas relacionadas',request:'Solicitar este servicio',details:'Más información',count:'Servicio',names:['Recogida en aeropuerto','Visitas Ziyarat','Viajes entre ciudades','Traslados a hoteles','Familias y grupos','Asistencia de viaje'],descs:['Recogida privada en aeropuertos de Yeda y Medina con seguimiento del vuelo.','Visitas privadas a lugares históricos de La Meca y Medina.','Viajes privados entre La Meca, Medina, Yeda, Taif y Riad.','Llegadas a hoteles coordinadas y ayuda con equipaje.','Coches, furgonetas y autobuses para grupos y familias.','Asistencia y coordinación de viajes a cualquier hora.']},
 de:{kicker:'PRIVATER TRANSFER',heading:'Wählen Sie Ihren Service.',subtitle:'Ein Service nach dem anderen, mit echten Routen und klarer Buchungsanfrage.',coverage:'Servicegebiete',benefits:'Servicedetails',related:'Passende Routen',request:'Service anfragen',details:'Mehr erfahren',count:'Service',names:['Flughafenabholung','Ziyarat-Besuche','Städteverbindungen','Hoteltransfers','Familien und Gruppen','Reisebetreuung'],descs:['Private Abholung an den Flughäfen Dschidda und Medina mit Flugüberwachung.','Private Fahrten zu historischen Orten in Mekka und Medina.','Privatfahrten zwischen Mekka, Medina, Dschidda, Taif und Riad.','Koordinierte Hotelabholung und Gepäckhilfe.','Autos, Vans und Busse für Familien und Gruppen.','Unterstützung und Organisation Ihrer Reise rund um die Uhr.']},
 tr:{kicker:'ÖZEL TRANSFER',heading:'Yolculuğunuza uygun hizmeti seçin.',subtitle:'Gerçek rota bağlantıları ve açık bir rezervasyon talebiyle her hizmeti ayrı keşfedin.',coverage:'Hizmet bölgeleri',benefits:'Hizmet ayrıntıları',related:'İlgili rotalar',request:'Hizmet talep et',details:'Daha fazla bilgi',count:'Hizmet',names:['Havalimanı karşılama','Ziyaret turları','Şehirler arası yolculuk','Otel transferleri','Aileler ve gruplar','Yolculuk desteği'],descs:['Cidde ve Medine havalimanlarından uçuş takibiyle özel karşılama.','Mekke ve Medine’de tarihi yerlere özel araçla ziyaret.','Mekke, Medine, Cidde, Taif ve Riyad arasında özel transfer.','Otel buluşma noktalarında koordinasyon ve bagaj yardımı.','Aileler ve gruplar için araçlar, vanlar ve otobüsler.','Günün her saati yolculuk koordinasyonu ve destek.']},
 hi:{kicker:'निजी यात्रा सेवाएँ',heading:'अपनी यात्रा की सेवा चुनें।',subtitle:'हर सेवा के रास्ते और बुकिंग अनुरोध एक ही जगह देखें।',coverage:'सेवा क्षेत्र',benefits:'सेवा विवरण',related:'संबंधित मार्ग',request:'इस सेवा का अनुरोध',details:'अधिक जानकारी',count:'सेवा',names:['हवाई अड्डा पिकअप','ज़ियारत यात्रा','शहरों के बीच यात्रा','होटल ट्रांसफर','परिवार और समूह','यात्रा सहायता'],descs:['जेद्दा और मदीना हवाई अड्डों से फ्लाइट निगरानी के साथ निजी पिकअप।','मक्का और मदीना के ऐतिहासिक स्थलों की निजी यात्रा।','मक्का, मदीना, जेद्दा, ताइफ़ और रियाद के बीच निजी सफर।','होटल पिकअप और सामान में सहायता।','परिवारों और समूहों के लिए कारें, वैन और बसें।','चौबीसों घंटे यात्रा में समन्वय और सहायता।']},
};
const ICONS=[Plane,Landmark,Navigation,Building2,Users,Headphones];
const BOOKING:Record<string,string>={
 'airport-transfer':'booking?route=jeddah-airport-to-makkah&type=transfer',
 'ziyarat-tour':'booking?route=makkah-ziyarat&type=ziyarat',
 'intercity-travel':'booking?route=makkah-to-madinah&type=transfer',
 'hotel-transfers':'booking?type=transfer',
 'group-travel':'booking?type=group_bus',
 '24-7-support':'contact',
};
function relatedName(href:string,fallback:string,locale:Locale){
 const match=href.match(/\/routes\/([^/?#]+)/);
 return match?LOCALIZED_ROUTE_NAMES[match[1]]?.[locale]||fallback:fallback;
}
export function ServiceChapterExplorer({locale,services}:{locale:Locale;services:ServiceChapter[]}){
 const t=TEXT[locale];const rtl=locale==='ar'||locale==='ur';
 const [active,setActive]=useState(0);
 const tabs=useRef<(HTMLButtonElement|null)[]>([]);
 const service=services[active]; const Icon=ICONS[active]||Plane;
 const Next=rtl?ArrowLeft:ArrowRight;
 function keyboard(e:KeyboardEvent<HTMLButtonElement>,index:number){
  let next:number|null=null;
  if(e.key==='ArrowRight')next=(index+(rtl?-1:1)+services.length)%services.length;
  if(e.key==='ArrowLeft')next=(index+(rtl?1:-1)+services.length)%services.length;
  if(e.key==='Home')next=0;
  if(e.key==='End')next=services.length-1;
  if(next!==null){e.preventDefault();setActive(next);tabs.current[next]?.focus();}
 }
 return <section className={styles.section} dir={rtl?'rtl':'ltr'} aria-labelledby="services-chapter-heading">
  <header className={styles.heading}>
   <div><span className={styles.eyebrow}>{t.kicker} / 06</span><h2 id="services-chapter-heading">{t.heading}</h2></div>
   <p>{t.subtitle}</p>
  </header>
  <div className={styles.shell}>
   <div className={styles.tabs} role="tablist" aria-label={t.heading}>
    {services.map((s,i)=>{
     const TabIcon=ICONS[i]||Plane;
     return <button key={s.id} type="button" role="tab" ref={el=>{tabs.current[i]=el;}}
      tabIndex={i===active?0:-1} id={'service-tab-'+i}
      aria-controls="service-chapter-panel" aria-selected={i===active}
      className={i===active?styles.selected:''}
      onClick={()=>setActive(i)} onKeyDown={e=>keyboard(e,i)}>
      <span className={styles.tabIndex}>{String(i+1).padStart(2,'0')}</span>
      <TabIcon size={18} aria-hidden="true"/><span>{t.names[i]}</span><Next className={styles.tabArrow} size={15} aria-hidden="true"/>
     </button>;
    })}
   </div>
   <article className={styles.stage} id="service-chapter-panel" role="tabpanel"
    aria-labelledby={'service-tab-'+active} tabIndex={0}>
    <div className={styles.media}>
     <Image key={service.image} src={service.image} alt={t.names[active]}
      fill sizes="(max-width:800px) 100vw, (max-width:1150px) 55vw, 710px" className={styles.photo}/>
     <span className={styles.photoNum}>{String(active+1).padStart(2,'0')} / 06</span>
     <span className={styles.photoCaption}><Icon size={16} aria-hidden="true"/>{t.names[active]}</span>
    </div>
    <div className={styles.body}>
     <span className={styles.small}>{t.count} {String(active+1).padStart(2,'0')} <span> / 06</span></span>
     <h3>{t.names[active]}</h3>
     <p>{t.descs[active]}</p>
     <div className={styles.coverage}><MapPin size={18} aria-hidden="true"/><div><strong>{t.coverage}</strong><span>{service.locations}</span></div></div>
     <details className={styles.details}>
      <summary>{t.benefits}<span>+</span></summary>
      <ul>{service.highlights.map((h,i)=><li key={i}><Check size={14} aria-hidden="true"/>{h}</li>)}</ul>
     </details>
     <div className={styles.links}>
      <Link className={styles.primary} href={'/'+locale+'/'+BOOKING[service.id]}>
       {t.request}<Next size={17} aria-hidden="true"/>
      </Link>
      {service.relatedRoutes?.length>0&&<div className={styles.related}>
       <span>{t.related}</span>
       {service.relatedRoutes.map((route,i)=><Link key={i} href={route.href}>{relatedName(route.href,route.title,locale)}<ArrowUpRight size={13} aria-hidden="true"/></Link>)}
      </div>}
     </div>
    </div>
   </article>
  </div>
 </section>;
}
