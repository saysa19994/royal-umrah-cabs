'use client';
import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {ArrowLeft,ArrowRight,ArrowUpRight,Clock3,MapPin,ShieldCheck,CarFront,Users,Route as RouteIcon} from 'lucide-react';
import type {Locale} from '@/i18n/config';
import {EXECUTIVE_ROUTES_DATA} from '@/data/executive-routes-data';
import {APPROVED_5_FLEET} from '@/data/approved-fleet-homepage';
import type {TransferRatesMap} from '@/lib/pricing-db';
import styles from './RouteNetworkDesk.module.css';
const ENDS:Record<string,[string,string]>={
 'jeddah-airport-to-makkah':['JED','MKK'],'makkah-to-madinah':['MKK','MED'],
 'jeddah-to-madinah':['JED','MED'],'makkah-ziyarat':['MKK','ZIY'],
 'madinah-airport-to-hotel':['MED','HOTEL'],'makkah-to-taif':['MKK','TIF'],
 'jeddah-to-taif':['JED','TIF'],'madinah-ziyarat':['MED','ZIY'],
 'riyadh-airport-transfer':['RUH','CITY'],'riyadh-to-makkah':['RUH','MKK'],
 'riyadh-to-madinah':['RUH','MED']
};
// The Riyadh airport transfer is inactive in server pricing; never present it as bookable.
const ACTIVE_ROUTES=EXECUTIVE_ROUTES_DATA.filter(item=>item.slug!=='riyadh-airport-transfer');
// Use only verified images shipped with the project. Never substitute an unrelated
// destination photograph when a particular route does not have its own image.
const ROUTE_PHOTOS:Partial<Record<string,string>>={
 'jeddah-airport-to-makkah':'/assets/images/routes/jeddah-airport-to-makkah.jpg',
 'makkah-to-madinah':'/assets/images/routes/makkah-to-madinah.jpg',
 'jeddah-to-madinah':'/assets/images/routes/jeddah-to-madinah.jpg',
 'makkah-ziyarat':'/assets/images/routes/makkah-ziyarat.jpg',
 'madinah-airport-to-hotel':'/assets/images/routes/madinah-airport.jpg',
 'makkah-to-taif':'/assets/images/routes/makkah-to-taif.jpg',
 'riyadh-to-makkah':'/assets/images/routes/riyadh-to-makkah.jpg',
};
const FARES:Record<string,string>={'toyota-camry':'camry','hyundai-staria':'staria','gmc-yukon-xl':'yukon','toyota-hiace':'hiace','toyota-coaster':'coaster'};
type Copy={heading:string;sub:string;choose:string;time:string;distance:string;fare:string;type:string;book:string;detail:string;cash:string;unavailable:string;diagram:string;step:string;routes:string;note:string;vehicle:string};
const L:Record<Locale,Copy>={
 ar:{heading:'رحلتك على الخريطة الذهنية.',sub:'اختر مسارًا من دليل الرحلات واعرف المدة التقريبية والمركبة والأجرة المعتمدة.',choose:'اختيار المسار',time:'المدة التقديرية',distance:'المسافة التقديرية',fare:'أجرة المركبة',type:'النقل الخاص',book:'اطلب هذه الرحلة',detail:'تفاصيل المسار',cash:'الدفع نقدًا للسائق بعد انتهاء الرحلة',unavailable:'غير متاحة لهذا المسار',diagram:'مخطط توضيحي للمسار، وليس خريطة جغرافية',step:'وجهة الرحلة',routes:'دليل الرحلات',note:'المدة والمسافة تقديريتان وتعتمدان على ظروف الطريق.',vehicle:'السيارة'},
 en:{heading:'The journey, mapped to your needs.',sub:'Pick a journey from the directory. See the indicative drive time, your vehicle and the published fare.',choose:'Choose a route',time:'Indicative duration',distance:'Approximate distance',fare:'Vehicle fare',type:'Private transfer',book:'Request this journey',detail:'Route details',cash:'Cash to driver after the journey',unavailable:'Not available for this route',diagram:'Schematic journey line, not a geographical map',step:'Your destination',routes:'Journey directory',note:'Journey times and distances are indicative and depend on road conditions.',vehicle:'Vehicle'},
 ms:{heading:'Perjalanan menurut keperluan anda.',sub:'Pilih laluan dan lihat masa anggaran, kenderaan serta tambang.',choose:'Pilih laluan',time:'Masa anggaran',distance:'Jarak anggaran',fare:'Tambang kenderaan',type:'Pengangkutan peribadi',book:'Mohon perjalanan ini',detail:'Butiran laluan',cash:'Bayar tunai selepas perjalanan',unavailable:'Tidak tersedia',diagram:'Garis perjalanan skematik, bukan peta geografi',step:'Destinasi',routes:'Senarai laluan',note:'Masa dan jarak perjalanan ialah anggaran.',vehicle:'Kenderaan'},
 id:{heading:'Perjalanan sesuai kebutuhan Anda.',sub:'Pilih rute dan lihat perkiraan waktu, kendaraan serta tarif resmi.',choose:'Pilih rute',time:'Perkiraan durasi',distance:'Perkiraan jarak',fare:'Tarif kendaraan',type:'Transfer privat',book:'Ajukan perjalanan ini',detail:'Detail rute',cash:'Tunai setelah perjalanan selesai',unavailable:'Tidak tersedia',diagram:'Diagram rute, bukan peta geografis',step:'Tujuan',routes:'Daftar rute',note:'Waktu dan jarak hanya perkiraan.',vehicle:'Kendaraan'},
 ur:{heading:'آپ کا سفر، واضح راستہ۔',sub:'راستہ منتخب کریں اور متوقع وقت، گاڑی اور مقررہ کرایہ دیکھیں۔',choose:'راستہ منتخب کریں',time:'متوقع مدت',distance:'متوقع فاصلہ',fare:'گاڑی کا کرایہ',type:'نجی سفر',book:'سفر کی درخواست',detail:'راستے کی تفصیل',cash:'سفر مکمل ہونے پر نقد ادائیگی',unavailable:'اس راستے پر دستیاب نہیں',diagram:'وضاحتی خاکہ، جغرافیائی نقشہ نہیں',step:'منزل',routes:'سفر کی فہرست',note:'وقت اور فاصلہ اندازاً ہیں۔',vehicle:'گاڑی'},
 fr:{heading:'Votre trajet, selon vos besoins.',sub:'Choisissez un trajet et consultez la durée estimée, le véhicule et le tarif.',choose:'Choisir un trajet',time:'Durée indicative',distance:'Distance estimée',fare:'Tarif du véhicule',type:'Transfert privé',book:'Demander ce trajet',detail:'Détails du parcours',cash:'Espèces après le trajet',unavailable:'Non disponible',diagram:'Schéma de trajet, pas une carte géographique',step:'Destination',routes:'Répertoire des trajets',note:'Durées et distances données à titre indicatif.',vehicle:'Véhicule'},
 es:{heading:'Tu trayecto, a tu medida.',sub:'Elige una ruta y consulta el tiempo estimado, el vehículo y el precio.',choose:'Elegir ruta',time:'Duración estimada',distance:'Distancia aproximada',fare:'Tarifa por vehículo',type:'Traslado privado',book:'Solicitar este viaje',detail:'Detalles de la ruta',cash:'Efectivo después del viaje',unavailable:'No disponible',diagram:'Diagrama orientativo, no mapa geográfico',step:'Destino',routes:'Directorio de rutas',note:'Los tiempos y distancias son aproximados.',vehicle:'Vehículo'},
 de:{heading:'Ihre Fahrt, klar geplant.',sub:'Route auswählen und ungefähre Dauer, Fahrzeug und Fahrpreis sehen.',choose:'Route auswählen',time:'Ungefähre Dauer',distance:'Ungefähre Entfernung',fare:'Fahrzeugpreis',type:'Privattransfer',book:'Fahrt anfragen',detail:'Routendetails',cash:'Barzahlung nach der Fahrt',unavailable:'Nicht verfügbar',diagram:'Schematische Route, keine geografische Karte',step:'Ihr Ziel',routes:'Routenverzeichnis',note:'Dauer und Entfernung sind Schätzwerte.',vehicle:'Fahrzeug'},
 tr:{heading:'Size özel yolculuk planı.',sub:'Rota seçin; tahmini süreyi, aracı ve geçerli ücreti görün.',choose:'Rota seçin',time:'Tahmini süre',distance:'Yaklaşık mesafe',fare:'Araç ücreti',type:'Özel transfer',book:'Yolculuk talep et',detail:'Rota ayrıntıları',cash:'Yolculuk sonrası nakit ödeme',unavailable:'Bu rotada yok',diagram:'Şematik çizgi, coğrafi harita değildir',step:'Varış noktası',routes:'Rota rehberi',note:'Süre ve mesafe tahminidir.',vehicle:'Araç'},
 hi:{heading:'अपनी यात्रा का स्पष्ट मार्ग।',sub:'मार्ग चुनें, अनुमानित समय, वाहन और किराया देखें।',choose:'मार्ग चुनें',time:'अनुमानित समय',distance:'लगभग दूरी',fare:'वाहन किराया',type:'निजी ट्रांसफर',book:'यात्रा अनुरोध करें',detail:'मार्ग विवरण',cash:'यात्रा के बाद नकद भुगतान',unavailable:'उपलब्ध नहीं',diagram:'मार्ग का चित्र, भौगोलिक नक्शा नहीं',step:'गंतव्य',routes:'मार्ग सूची',note:'समय और दूरी अनुमानित हैं।',vehicle:'वाहन'},
};
export function RouteNetworkDesk({locale,rates,routeStatus,routeImages}:{locale:Locale;rates:TransferRatesMap;routeStatus:Record<string,boolean>;routeImages:Record<string,string>}){
 const t=L[locale],rtl=locale==='ar'||locale==='ur';const [index,setIndex]=useState(0),[car,setCar]=useState(0);
 const visibleRoutes=ACTIVE_ROUTES.filter(item=>routeStatus[item.slug]!==false);
 const effectiveIndex=visibleRoutes[index]?index:0;
 const route=visibleRoutes[effectiveIndex],vehicle=APPROVED_5_FLEET[car];
 if(!route)return <section className={styles.network} dir={rtl?'rtl':'ltr'} role="status"><h2>{t.heading}</h2><p>{t.unavailable}</p></section>;
 const pair=ENDS[route.slug]||['START','END'];
 const fare=rates[route.slug]?.[FARES[vehicle.slug]];
 const photoSource=routeImages[route.slug] || ROUTE_PHOTOS[route.slug];
 const name=route.titles?.[locale]||route.titleEn;
 const fmt=new Intl.NumberFormat(locale==='ar'?'ar-SA':'en-US');
 const Arrow=rtl?ArrowLeft:ArrowRight;
 return <section className={styles.network} aria-label={t.heading} dir={rtl?'rtl':'ltr'}>
   <div className={styles.networkHeading}><div><span>ROUTE CONTROL / 01—{visibleRoutes.length}</span><h2>{t.heading}</h2></div><p>{t.sub}</p></div>
   <div className={styles.layout}>
    <div className={styles.directory}>
     <div className={styles.directoryHead}><span>{t.routes}</span><RouteIcon size={20} aria-hidden="true"/></div>
     <div className={styles.desktopRoutes} role="group" aria-label={t.choose}>
       {visibleRoutes.map((item,i)=><button type="button" key={item.slug}
         aria-pressed={i===effectiveIndex} onClick={()=>{setIndex(i);setCar(0);}}>
         <span>{String(i+1).padStart(2,'0')}</span>
         <strong>{item.titles?.[locale]||item.titleEn}</strong>
       </button>)}
     </div>
     <label className={styles.mobileRoutes}><span>{t.choose}</span>
       <select value={effectiveIndex} onChange={e=>{setIndex(Number(e.target.value));setCar(0);}}>
        {visibleRoutes.map((item,i)=><option key={item.slug} value={i}>{item.titles?.[locale]||item.titleEn}</option>)}
       </select>
     </label>
    </div>
    <div className={styles.schematic}>
     <div className={styles.schematicHead}><span>JOURNEY 0{effectiveIndex+1} / {visibleRoutes.length}</span><span><MapPin size={15} aria-hidden="true"/>{t.type}</span></div>
     <div className={styles.routeDrawing} role="img" aria-label={t.diagram+': '+name}>
       {photoSource && (
         <div className={styles.routePhoto} aria-hidden="true">
           <Image key={route.slug} src={photoSource} alt="" fill
             sizes="(max-width: 700px) 100vw, (max-width: 950px) 58vw, 35vw" />
         </div>
       )}
       <div className={styles.origin}><span>{pair[0]}</span><i/></div>
       <svg viewBox="0 0 500 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 5 64 C 135 64 120 16 250 62 S 370 110 495 62" stroke="currentColor" strokeWidth="2" strokeDasharray="6 9" fill="none"/>
        <circle cx="250" cy="62" r="7" fill="#bfa073" />
       </svg>
       <div className={styles.destination}><i/><span>{pair[1]}</span></div>
     </div>
     <div className={styles.routeTitle}><span>{t.step} / 0{effectiveIndex+1}</span><h3>{name}</h3><p>{t.note}</p></div>
     <dl className={styles.travellingFacts}>
       <div><dt><Clock3 size={15} aria-hidden="true"/>{t.time}</dt><dd>{route.times?.[locale]||route.timeEn}</dd></div>
       <div><dt><MapPin size={15} aria-hidden="true"/>{t.distance}</dt><dd>{route.distances?.[locale]||route.distanceEn}</dd></div>
     </dl>
     <Link href={'/'+locale+'/routes/'+route.slug} className={styles.details}>{t.detail}<ArrowUpRight size={17} aria-hidden="true"/></Link>
    </div>
    <aside className={styles.fareDesk}>
      <span className={styles.fareEyebrow}>02 / {t.fare}</span>
      <div className={styles.fareVehicleTitle}><CarFront size={20} aria-hidden="true"/><h3>{t.vehicle}</h3></div>
      <div className={styles.vehicles} role="group" aria-label={t.vehicle}>
       {APPROVED_5_FLEET.map((v,i)=><button type="button" key={v.slug} aria-pressed={car===i} onClick={()=>setCar(i)}>
         <span>{String(i+1).padStart(2,'0')}</span>
         <strong>{v.name[locale]||v.name.en}</strong>
         <span>{v.passengers}<Users size={12} aria-hidden="true"/></span>
       </button>)}
      </div>
      <div className={styles.selectedFare} aria-live="polite"><span>{t.fare}</span>
       {typeof fare==='number'&&Number.isFinite(fare)&&fare>0?<strong>{fmt.format(fare)} <small>SAR</small></strong>:<strong className={styles.unavailable}>{t.unavailable}</strong>}
      </div>
      {typeof fare==='number'&&Number.isFinite(fare)&&fare>0?<Link href={'/'+locale+'/booking?route='+route.slug+'&vehicle='+vehicle.slug+(route.slug.includes('ziyarat')?'&type=ziyarat':'&type=transfer')} className={styles.book}>{t.book}<Arrow size={18} aria-hidden="true"/></Link>:
       <p className={styles.noBook}>{t.unavailable}</p>}
      <p className={styles.cash}><ShieldCheck size={15} aria-hidden="true"/>{t.cash}</p>
    </aside>
   </div>
 </section>;
}
