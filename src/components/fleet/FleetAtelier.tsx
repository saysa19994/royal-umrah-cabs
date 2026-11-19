'use client';

import {useMemo,useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft,ArrowRight,ArrowUpRight,BriefcaseBusiness,Users,Camera,ShieldCheck,CarFront} from 'lucide-react';
import type {Locale} from '@/i18n/config';
import type {FleetShowcaseVehicle} from '@/data/fleet-showcase-data';
import {APPROVED_5_FLEET} from '@/data/approved-fleet-homepage';
import {LOCALIZED_ROUTE_NAMES} from '@/lib/pricing-constants';
import type {TransferRatesMap} from '@/lib/pricing-db';
import styles from './FleetAtelier.module.css';

type Props={locale:Locale;vehicles:FleetShowcaseVehicle[];rates:TransferRatesMap;heading?:string;intro?:string};
type UI={label:string;title:string;subtitle:string;viewInside:string;viewOutside:string;imageTitle:string;capacity:string;bags:string;price:string;route:string;book:string;details:string;comparison:string;compareIntro:string;vehicle:string;passengers:string;luggage:string;fare:string;more:string;concierge:string;conciergeDesc:string;contact:string;payment:string;index:string;conclusion:string;notForRoute:string};
const UI_COPY:Record<Locale,UI>={
 ar:{label:'مجموعة المركبات الخاصة',title:'كل رحلة تستحق السيارة المناسبة.',subtitle:'اختر مركبتك وشاهد المساحة الحقيقية المخصصة لك ولعائلتك، ثم اطلب حجزها بالسعر المعتمد للمسار.',viewInside:'المقصورة',viewOutside:'من الخارج',imageTitle:'الصور المتاحة',capacity:'الركاب',bags:'الحقائب',price:'السعر على المسار',route:'مطار جدة إلى مكة',book:'اطلب هذه السيارة',details:'تفاصيل وصور إضافية',comparison:'الأسطول في لمحة.',compareIntro:'كل سيارة تحمل ضيوفها وحقائبهم حسب سعتها؛ الأسعار أدناه لرحلة مطار جدة إلى مكة فقط.',vehicle:'المركبة',passengers:'الركاب',luggage:'الحقائب',fare:'السعر',more:'التفاصيل',concierge:'اختيارات كونسيرج خاصة.',conciergeDesc:'مرسيدس مايباخ وهيونداي H1 متاحتان بالطلب الخاص والتنسيق المسبق فقط، وليستا ضمن الحجز المباشر.',contact:'استفسر عن الكونسيرج',payment:'لا يوجد دفع مسبق؛ الدفع نقدًا للسائق بعد انتهاء الرحلة.',index:'المركبة',conclusion:'اختيار يليق برحلتك.',notForRoute:'استفسر عن السعر'},
 en:{label:'THE PRIVATE FLEET',title:'A different vehicle for every journey.',subtitle:'Explore genuine exterior and interior photographs, match your group and bags, and request the vehicle on your chosen route.',viewInside:'The cabin',viewOutside:'Exterior',imageTitle:'Available photographs',capacity:'Travelers',bags:'Luggage',price:'Fare on this route',route:'Jeddah Airport to Makkah',book:'Request this vehicle',details:'Vehicle details & images',comparison:'The collection, at a glance.',compareIntro:'Passenger and luggage capacities vary by vehicle; displayed fares are specifically for Jeddah Airport to Makkah.',vehicle:'Vehicle',passengers:'Travelers',luggage:'Bags',fare:'Fare',more:'Details',concierge:'A private concierge selection.',conciergeDesc:'Mercedes-Maybach and Hyundai H1 are available on personal enquiry only, not through direct booking.',contact:'Enquire about concierge',payment:'No prepayment; cash to driver after the completed trip.',index:'Vehicle',conclusion:'Travel with the right fit.',notForRoute:'Request fare'},
 ms:{label:'ARMADA PERIBADI',title:'Kenderaan tepat untuk setiap perjalanan.',subtitle:'Terokai gambar sebenar kenderaan, semak ruang untuk keluarga dan bagasi, kemudian mohon tempahan.',viewInside:'Kabin',viewOutside:'Luaran',imageTitle:'Foto tersedia',capacity:'Penumpang',bags:'Bagasi',price:'Tambang laluan ini',route:'Lapangan Terbang Jeddah ke Makkah',book:'Mohon kenderaan',details:'Butiran kenderaan',comparison:'Armada sekilas pandang.',compareIntro:'Tambang yang dipaparkan hanya untuk laluan Jeddah Airport ke Makkah.',vehicle:'Kenderaan',passengers:'Penumpang',luggage:'Bagasi',fare:'Tambang',more:'Butiran',concierge:'Pilihan concierge.',conciergeDesc:'Mercedes-Maybach dan Hyundai H1 disediakan melalui pertanyaan peribadi sahaja.',contact:'Hubungi concierge',payment:'Tiada bayaran awal; bayar tunai selepas perjalanan.',index:'Kenderaan',conclusion:'Pilihan tepat untuk perjalanan.',notForRoute:'Mohon harga'},
 id:{label:'ARMADA PRIVAT',title:'Kendaraan tepat untuk setiap perjalanan.',subtitle:'Lihat foto eksterior dan interior, sesuaikan dengan keluarga dan bagasi, lalu ajukan pemesanan.',viewInside:'Kabin',viewOutside:'Eksterior',imageTitle:'Foto tersedia',capacity:'Penumpang',bags:'Bagasi',price:'Tarif rute ini',route:'Bandara Jeddah ke Makkah',book:'Ajukan kendaraan ini',details:'Detail kendaraan',comparison:'Armada sekilas.',compareIntro:'Tarif hanya untuk perjalanan Bandara Jeddah ke Makkah.',vehicle:'Kendaraan',passengers:'Penumpang',luggage:'Bagasi',fare:'Tarif',more:'Detail',concierge:'Pilihan concierge khusus.',conciergeDesc:'Mercedes-Maybach dan Hyundai H1 hanya melalui permintaan concierge.',contact:'Hubungi concierge',payment:'Tanpa pembayaran di muka; tunai setelah perjalanan selesai.',index:'Kendaraan',conclusion:'Pilihan untuk perjalanan Anda.',notForRoute:'Minta tarif'},
 ur:{label:'نجی گاڑیوں کا مجموعہ',title:'ہر سفر کے لیے مناسب گاڑی۔',subtitle:'گاڑی کی اندرونی اور بیرونی تصاویر دیکھیں، مسافروں اور سامان کے مطابق گاڑی چنیں۔',viewInside:'اندرونی حصہ',viewOutside:'بیرونی حصہ',imageTitle:'دستیاب تصاویر',capacity:'مسافر',bags:'سامان',price:'اس راستے کا کرایہ',route:'جدہ ایئرپورٹ سے مکہ',book:'اس گاڑی کی درخواست',details:'گاڑی کی تفصیل',comparison:'گاڑیوں کا موازنہ۔',compareIntro:'یہ کرائے صرف جدہ ایئرپورٹ سے مکہ کے سفر کے ہیں۔',vehicle:'گاڑی',passengers:'مسافر',luggage:'بیگ',fare:'کرایہ',more:'تفصیل',concierge:'خصوصی کونسیرج انتخاب۔',conciergeDesc:'مرسڈیز میباخ اور ہنڈائی H1 صرف خصوصی درخواست پر دستیاب ہیں۔',contact:'کونسیرج سے رابطہ',payment:'پیشگی ادائیگی نہیں؛ سفر مکمل ہونے کے بعد نقد ادائیگی۔',index:'گاڑی',conclusion:'اپنے سفر کے لیے درست انتخاب۔',notForRoute:'کرایہ معلوم کریں'},
 fr:{label:'FLOTTE PRIVÉE',title:'Le véhicule adapté à chaque trajet.',subtitle:'Découvrez les photos réelles, les places et les bagages avant votre demande.',viewInside:'Habitacle',viewOutside:'Extérieur',imageTitle:'Photos disponibles',capacity:'Voyageurs',bags:'Bagages',price:'Tarif sur ce trajet',route:'Aéroport Djeddah – La Mecque',book:'Demander ce véhicule',details:'Détails du véhicule',comparison:'La flotte en un regard.',compareIntro:'Tarifs affichés uniquement pour Djeddah Aéroport vers La Mecque.',vehicle:'Véhicule',passengers:'Voyageurs',luggage:'Bagages',fare:'Tarif',more:'Détails',concierge:'Sélection concierge.',conciergeDesc:'Mercedes-Maybach et Hyundai H1 sont disponibles seulement sur demande personnalisée.',contact:'Contacter le concierge',payment:'Aucun acompte; paiement en espèces après le trajet.',index:'Véhicule',conclusion:'Le bon choix pour votre voyage.',notForRoute:'Demander le tarif'},
 es:{label:'FLOTA PRIVADA',title:'Un vehículo para cada viaje.',subtitle:'Descubre fotos reales del exterior y del interior y elige según viajeros y equipaje.',viewInside:'Interior',viewOutside:'Exterior',imageTitle:'Fotos disponibles',capacity:'Pasajeros',bags:'Equipaje',price:'Tarifa de la ruta',route:'Aeropuerto Yeda a La Meca',book:'Solicitar vehículo',details:'Detalles y fotos',comparison:'La flota de un vistazo.',compareIntro:'Las tarifas corresponden solo al traslado Aeropuerto Yeda a La Meca.',vehicle:'Vehículo',passengers:'Pasajeros',luggage:'Maletas',fare:'Tarifa',more:'Detalles',concierge:'Selección concierge.',conciergeDesc:'Mercedes-Maybach y Hyundai H1 solo por consulta personalizada.',contact:'Consultar concierge',payment:'Sin anticipo; efectivo al conductor al finalizar.',index:'Vehículo',conclusion:'Tu viaje, tu elección.',notForRoute:'Consultar tarifa'},
 de:{label:'PRIVATE FLOTTE',title:'Für jede Reise das passende Fahrzeug.',subtitle:'Sehen Sie echte Außen- und Innenaufnahmen und wählen Sie nach Personen und Gepäck.',viewInside:'Innenraum',viewOutside:'Außenansicht',imageTitle:'Verfügbare Fotos',capacity:'Reisende',bags:'Gepäck',price:'Preis auf dieser Route',route:'Flughafen Dschidda nach Mekka',book:'Fahrzeug anfragen',details:'Fahrzeugdetails',comparison:'Die Flotte im Überblick.',compareIntro:'Die Preise gelten ausschließlich für Flughafen Dschidda nach Mekka.',vehicle:'Fahrzeug',passengers:'Reisende',luggage:'Gepäck',fare:'Preis',more:'Details',concierge:'Persönlicher Concierge.',conciergeDesc:'Mercedes-Maybach und Hyundai H1 nur auf persönliche Anfrage, nicht direkt buchbar.',contact:'Concierge anfragen',payment:'Keine Vorauszahlung; Barzahlung nach der Fahrt.',index:'Fahrzeug',conclusion:'Die richtige Wahl für Ihre Fahrt.',notForRoute:'Preis anfragen'},
 tr:{label:'ÖZEL ARAÇ FİLOSU',title:'Her yolculuğa uygun bir araç.',subtitle:'Gerçek iç ve dış fotoğrafları inceleyin, yolcu ve bagaja uygun aracı seçin.',viewInside:'İç mekan',viewOutside:'Dış görünüm',imageTitle:'Araç fotoğrafları',capacity:'Yolcu',bags:'Bagaj',price:'Bu rotadaki ücret',route:'Cidde Havalimanı – Mekke',book:'Bu aracı talep et',details:'Araç ayrıntıları',comparison:'Filo, bir bakışta.',compareIntro:'Fiyatlar yalnızca Cidde Havalimanı – Mekke yolculuğu içindir.',vehicle:'Araç',passengers:'Yolcu',luggage:'Bagaj',fare:'Ücret',more:'Ayrıntılar',concierge:'Özel concierge seçimi.',conciergeDesc:'Mercedes-Maybach ve Hyundai H1 yalnızca özel danışmanlık ile sağlanır.',contact:'Concierge ile iletişim',payment:'Ön ödeme yok; yolculuk sonrası nakit ödeme.',index:'Araç',conclusion:'Yolculuğunuza uygun seçim.',notForRoute:'Fiyat sor'},
 hi:{label:'निजी वाहन संग्रह',title:'हर यात्रा के लिए सही वाहन।',subtitle:'वाहन की असली अंदरूनी और बाहरी तस्वीरें देखें, यात्रियों और सामान के अनुसार चुनें।',viewInside:'अंदर',viewOutside:'बाहर',imageTitle:'उपलब्ध फोटो',capacity:'यात्री',bags:'सामान',price:'इस मार्ग का किराया',route:'जेद्दा एयरपोर्ट से मक्का',book:'इस वाहन का अनुरोध',details:'वाहन विवरण',comparison:'सभी वाहन एक नज़र में।',compareIntro:'दिखाए किराए सिर्फ जेद्दा एयरपोर्ट से मक्का मार्ग के लिए हैं।',vehicle:'वाहन',passengers:'यात्री',luggage:'बैग',fare:'किराया',more:'विवरण',concierge:'विशेष कंसीयर्ज सेवा।',conciergeDesc:'मर्सिडीज़-मेबैक और हुंडई H1 केवल विशेष अनुरोध पर उपलब्ध हैं।',contact:'कंसीयर्ज से पूछें',payment:'कोई अग्रिम भुगतान नहीं; यात्रा के बाद नकद भुगतान।',index:'वाहन',conclusion:'अपनी यात्रा के लिए सही विकल्प।',notForRoute:'किराया पूछें'},
};
const FARE_IDS:Record<string,string>={'toyota-camry':'camry','hyundai-staria':'staria','gmc-yukon-xl':'yukon','toyota-hiace':'hiace','toyota-coaster':'coaster'};
const ROUTE='jeddah-airport-to-makkah';
function VehicleLinkArrow({rtl}:{rtl:boolean}){return rtl?<ArrowLeft size={17} aria-hidden="true"/>:<ArrowRight size={17} aria-hidden="true"/>;}

export function FleetAtelier({locale,vehicles,rates,heading,intro}:Props){
 const t=UI_COPY[locale],rtl=locale==='ar'||locale==='ur';
 const [active,setActive]=useState(0),[interior,setInterior]=useState(false);
 const [galleryPosition,setGalleryPosition]=useState<string|null>(null);
 const visibleFleet=APPROVED_5_FLEET.filter(v=>
   vehicles.some(m=>m.bookingVehicleId===FARE_IDS[v.slug]||m.slug===v.slug)
 ).map(v=>{
   const record=vehicles.find(m=>m.bookingVehicleId===FARE_IDS[v.slug]||m.slug===v.slug);
   return {...v,name:record?.name||v.name,passengers:record?.passengers??v.passengers,luggage:record?.luggage??v.luggage};
 });
 const approved=visibleFleet[Math.min(active,visibleFleet.length-1)];
 const dbVehicle=useMemo(()=>approved?vehicles.find(v=>v.slug===approved.slug||v.bookingVehicleId===FARE_IDS[approved.slug]):undefined,[vehicles,approved?.slug]);
 if(!approved)return <main dir={rtl?'rtl':'ltr'} className="mx-auto min-h-[60vh] max-w-4xl px-5 py-20 text-center">
    <h1 className="text-3xl font-bold">{heading || t.title}</h1>
    <p className="mx-auto mt-6 max-w-xl text-base">{t.notForRoute}</p>
    <Link href={'/'+locale+'/contact'} className="mt-8 inline-block rounded-xl border px-6 py-3">{t.contact}</Link>
 </main>;
 const extPhoto=dbVehicle?.gallery?.find(x=>x.type==='exterior')?.src||approved.exteriorImage;
 const cabinPhoto=dbVehicle?.gallery?.find(x=>x.type==='interior')?.src||approved.interiorImage;
 const selectedPhoto=galleryPosition||(interior?cabinPhoto:extPhoto);
 const fare=rates[ROUTE]?.[FARE_IDS[approved.slug]];
 const numberFormat=new Intl.NumberFormat(locale==='ar'?'ar-SA':'en-US');
 const select=(i:number)=>{setActive(i);setInterior(false);setGalleryPosition(null);};
 const morePhotos=dbVehicle?.gallery?.filter(x=>x.src!==selectedPhoto).slice(0,4)||[];
 return <div className={styles.page} dir={rtl?'rtl':'ltr'}>
  <section className={styles.hero} aria-labelledby="fleet-atelier-heading">
   <div className={styles.heroPoster}><Image src="/assets/homepage-v2/fleet-private.jpg" alt="" fill priority sizes="(max-width:700px) 100vw, 49vw" className={styles.heroImage}/><span className={styles.imageIndex}>01 / VEHICLES</span></div>
   <div className={styles.heroText}>
    <p className={styles.kicker}>{t.label} / DUYUF VIP</p>
    <h1 id="fleet-atelier-heading">{heading || t.title}</h1>
    <p>{intro || t.subtitle}</p>
    <a className={styles.heroLink} href="#fleet-atelier-selector">{t.viewOutside}<VehicleLinkArrow rtl={rtl}/></a>
   </div>
  </section>

  <section className={styles.atelier} id="fleet-atelier-selector" aria-label={t.label}>
   <div className={styles.atelierHead}>
     <div><span>02 / THE COLLECTION</span><h2>{t.conclusion}</h2></div>
     <span className={styles.collectionCount}>{visibleFleet.length} <small>/ 05</small></span>
   </div>
   <div className={styles.collection}>
    <nav className={styles.selector} aria-label={t.vehicle}>
      <span className={styles.railEyebrow}>{t.label}</span>
      {visibleFleet.map((v,i)=><button key={v.id} type="button" className={styles.pick}
         aria-pressed={active===i} onClick={()=>select(i)}>
        <span>{String(i+1).padStart(2,'0')}</span><strong>{v.name[locale]||v.name.en}</strong>
        <span className={styles.pickDot} aria-hidden="true"/>
      </button>)}
    </nav>
    <div className={styles.photoStudio}>
     <div className={styles.primaryPhoto}>
       <Image key={selectedPhoto} src={selectedPhoto} alt={(approved.name[locale]||approved.name.en)+' — '+(galleryPosition?dbVehicle?.gallery?.find(x=>x.src===galleryPosition)?.alt?.[locale]||t.imageTitle:(interior?t.viewInside:t.viewOutside))}
          fill sizes="(max-width:800px) 100vw, 54vw" className={interior||(galleryPosition&&dbVehicle?.gallery?.find(x=>x.src===galleryPosition)?.type!=='exterior')?styles.cabinPhoto:styles.exteriorPhoto}/>
       <span className={styles.photoEdition}>{String(active+1).padStart(2,'0')} / 05</span>
       <span className={styles.photoName}>{approved.name[locale]||approved.name.en}</span>
     </div>
     <div className={styles.photoControls} role="group" aria-label={t.imageTitle}>
      <button type="button" onClick={()=>{setInterior(false);setGalleryPosition(null);}} aria-pressed={!interior&&!galleryPosition}><Camera size={16} aria-hidden="true"/>{t.viewOutside}</button>
      <button type="button" onClick={()=>{setInterior(true);setGalleryPosition(null);}} aria-pressed={interior&&!galleryPosition}><Camera size={16} aria-hidden="true"/>{t.viewInside}</button>
     </div>
     {morePhotos.length>1&&<div className={styles.filmstrip} role="group" aria-label={t.imageTitle}>
       {morePhotos.map((photo,i)=><button type="button" key={photo.src} onClick={()=>setGalleryPosition(photo.src)}
         aria-label={photo.label[locale]||photo.label.en}><Image src={photo.src} alt="" fill sizes="104px"/></button>)}
     </div>}
    </div>
    <aside className={styles.specSheet}>
      <div className={styles.specTop}><span>{t.index} / 0{active+1}</span><CarFront size={23} aria-hidden="true"/></div>
      <span className={styles.category}>{approved.categoryBadge[locale]||approved.categoryBadge.en}</span>
      <h3>{approved.name[locale]||approved.name.en}</h3>
      <p>{dbVehicle?.desc?.[locale]||approved.summary[locale]||approved.summary.en||t.subtitle}</p>
      <dl className={styles.metrics}>
       <div><dt><Users size={16} aria-hidden="true"/>{t.capacity}</dt><dd>{approved.passengers}</dd></div>
       <div><dt><BriefcaseBusiness size={16} aria-hidden="true"/>{t.bags}</dt><dd>{approved.luggage}</dd></div>
      </dl>
      <div className={styles.fare}>
       <small>{t.price} — {t.route}</small>
       {typeof fare==='number'&&Number.isFinite(fare)?<strong>{numberFormat.format(fare)} <span>SAR</span></strong>:<strong>{t.notForRoute}</strong>}
      </div>
      <Link className={styles.book} href={'/'+locale+'/booking?route='+ROUTE+'&vehicle='+approved.slug}>
        {t.book}<VehicleLinkArrow rtl={rtl}/>
      </Link>
      <Link className={styles.readMore} href={'/'+locale+'/fleet/'+approved.slug}>{t.details}<ArrowUpRight size={16} aria-hidden="true"/></Link>
      <p className={styles.payment}><ShieldCheck size={15} aria-hidden="true"/>{t.payment}</p>
    </aside>
   </div>
  </section>

  <section className={styles.indexSection} aria-labelledby="fleet-index-heading">
    <div className={styles.indexHead}><span>03 / SPECIFICATION INDEX</span><h2 id="fleet-index-heading">{t.comparison}</h2><p>{t.compareIntro}</p></div>
    <div className={styles.tableScroll}>
    <table className={styles.table}>
      <thead><tr><th>{t.vehicle}</th><th>{t.passengers}</th><th>{t.luggage}</th><th>{t.fare} / SAR</th><th>{t.more}</th></tr></thead>
      <tbody>{visibleFleet.map(v=>{
        const f=rates[ROUTE]?.[FARE_IDS[v.slug]];
        return <tr key={v.slug}>
         <th scope="row">{v.name[locale]||v.name.en}</th>
         <td data-label={t.passengers}>{v.passengers}</td>
         <td data-label={t.luggage}>{v.luggage}</td>
         <td data-label={t.fare+' / SAR'}>{typeof f==='number'?numberFormat.format(f):t.notForRoute}</td>
         <td data-label={t.more}>
           <Link href={'/'+locale+'/fleet/'+v.slug}>
             <span className={styles.mobileDetailsText} aria-hidden="true">{t.more}</span>
             <ArrowUpRight size={18} aria-hidden="true"/>
             <span className={styles.srOnly}>{v.name[locale]||v.name.en}</span>
           </Link>
         </td>
        </tr>;
      })}</tbody>
    </table>
    </div>
  </section>

  <section className={styles.concierge} aria-labelledby="fleet-concierge-heading">
    <div className={styles.conciergeIntro}><span>04 / CONCIERGE ONLY</span><h2 id="fleet-concierge-heading">{t.concierge}</h2>
      <p>{t.conciergeDesc}</p><Link href={'/'+locale+'/contact'}>{t.contact}<VehicleLinkArrow rtl={rtl}/></Link></div>
    <div className={styles.conciergeGallery}>
       <Link href={'/'+locale+'/fleet/mercedes-maybach'} aria-label="Mercedes-Maybach S-Class">
        <Image src="/assets/images/vehicles/mercedes-maybach/exterior-studio.webp" alt="Mercedes-Maybach S-Class" fill sizes="(max-width:700px) 50vw, 28vw" className={styles.luxuryImage}/><span>Mercedes-Maybach</span></Link>
       <Link href={'/'+locale+'/fleet/hyundai-h1'} aria-label="Hyundai H1">
        <Image src="/assets/images/vehicles/hyundai-h1/exterior-studio.webp" alt="Hyundai H1" fill sizes="(max-width:700px) 50vw, 28vw" className={styles.luxuryImage}/><span>Hyundai H1</span></Link>
    </div>
  </section>
 </div>;
}
