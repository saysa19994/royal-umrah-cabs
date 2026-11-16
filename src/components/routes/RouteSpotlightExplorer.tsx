'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, CarFront, Check, MapPin, Users, Luggage } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import { APPROVED_5_FLEET } from '@/data/approved-fleet-homepage';
import { AUTHORITATIVE_TRANSFER_RATES, LOCALIZED_ROUTE_NAMES } from '@/lib/pricing-constants';
import styles from './RouteSpotlightExplorer.module.css';

type Copy = { overline:string; title:string; subtitle:string; chooseCar:string; fare:string; booking:string; noFare:string; cash:string; includes:string; vehicle:string; route:string; };
const TEXT:Record<Locale,Copy>={
 ar:{overline:'استكشف طريقك',title:'اختر رحلتك قبل أن تحجز.',subtitle:'المسار والسيارة والسعر الحقيقي في مكان واحد، دون خطوات غير ضرورية.',chooseCar:'اختر السيارة',fare:'أجرة المركبة الكاملة',booking:'اطلب حجز هذه الرحلة',noFare:'غير متاحة على هذا المسار',cash:'الدفع نقدًا للسائق بعد انتهاء الرحلة',includes:'شامل الضريبة والوقود والرسوم',vehicle:'السيارة المختارة',route:'المسار المختار'},
 en:{overline:'THE ROUTE SPOTLIGHT',title:'See your journey before booking.',subtitle:'Explore each route, choose a vehicle and see the actual fare without extra steps.',chooseCar:'Choose a vehicle',fare:'Full-vehicle fare',booking:'Request this private ride',noFare:'Not available on this route',cash:'Pay your driver in cash after the journey',includes:'VAT, fuel and road fees included',vehicle:'Selected vehicle',route:'Selected route'},
 ms:{overline:'PILIH LALUAN',title:'Lihat perjalanan sebelum tempahan.',subtitle:'Pilih laluan, kenderaan dan lihat tambang sebenar dengan mudah.',chooseCar:'Pilih kenderaan',fare:'Tambang satu kenderaan',booking:'Mohon tempahan perjalanan',noFare:'Tidak tersedia untuk laluan ini',cash:'Bayar tunai kepada pemandu selepas perjalanan',includes:'Cukai, bahan api dan tol termasuk',vehicle:'Kenderaan pilihan',route:'Laluan pilihan'},
 id:{overline:'JELAJAHI RUTE',title:'Lihat perjalanan sebelum memesan.',subtitle:'Pilih rute dan kendaraan, lalu lihat tarif sebenarnya.',chooseCar:'Pilih kendaraan',fare:'Tarif satu kendaraan',booking:'Ajukan perjalanan privat',noFare:'Tidak tersedia pada rute ini',cash:'Bayar tunai kepada pengemudi setelah perjalanan',includes:'Pajak, bahan bakar dan tol termasuk',vehicle:'Kendaraan pilihan',route:'Rute pilihan'},
 ur:{overline:'راستے دریافت کریں',title:'بکنگ سے پہلے اپنا سفر دیکھیں۔',subtitle:'راستہ، گاڑی اور اصل کرایہ ایک جگہ منتخب کریں۔',chooseCar:'گاڑی منتخب کریں',fare:'مکمل گاڑی کا کرایہ',booking:'نجی سفر کی درخواست دیں',noFare:'اس راستے پر دستیاب نہیں',cash:'سفر مکمل ہونے کے بعد ڈرائیور کو نقد ادائیگی',includes:'ٹیکس، ایندھن اور ٹول شامل',vehicle:'منتخب گاڑی',route:'منتخب راستہ'},
 fr:{overline:'PARCOURS À LA UNE',title:'Découvrez votre trajet avant de réserver.',subtitle:'Choisissez un trajet et un véhicule pour voir le tarif réel.',chooseCar:'Choisir un véhicule',fare:'Tarif du véhicule complet',booking:'Demander ce transfert privé',noFare:'Non disponible sur ce trajet',cash:'Payez le chauffeur en espèces après le trajet',includes:'TVA, carburant et péages inclus',vehicle:'Véhicule sélectionné',route:'Trajet sélectionné'},
 es:{overline:'EXPLORA TU RUTA',title:'Conoce tu trayecto antes de reservar.',subtitle:'Elige el trayecto y vehículo para ver su tarifa real.',chooseCar:'Elegir vehículo',fare:'Tarifa del vehículo completo',booking:'Solicitar este traslado',noFare:'No disponible en esta ruta',cash:'Paga en efectivo al conductor al finalizar',includes:'IVA, combustible y peajes incluidos',vehicle:'Vehículo seleccionado',route:'Ruta seleccionada'},
 de:{overline:'ROUTEN ENTDECKEN',title:'Sehen Sie Ihre Reise vor der Buchung.',subtitle:'Route und Fahrzeug wählen und den tatsächlichen Preis erfahren.',chooseCar:'Fahrzeug wählen',fare:'Preis pro Fahrzeug',booking:'Privatfahrt anfragen',noFare:'Auf dieser Route nicht verfügbar',cash:'Barzahlung beim Fahrer nach der Fahrt',includes:'Steuern, Kraftstoff und Maut inklusive',vehicle:'Gewähltes Fahrzeug',route:'Gewählte Route'},
 tr:{overline:'ROTALARI KEŞFEDİN',title:'Rezervasyondan önce rotanızı görün.',subtitle:'Rota ve araç seçin, gerçek ücreti kolayca görün.',chooseCar:'Araç seçin',fare:'Araç başına ücret',booking:'Özel yolculuk talep et',noFare:'Bu rotada mevcut değil',cash:'Yolculuk sonunda sürücüye nakit ödeme',includes:'Vergi, yakıt ve geçiş dahil',vehicle:'Seçilen araç',route:'Seçilen rota'},
 hi:{overline:'मार्ग देखें',title:'बुकिंग से पहले अपनी यात्रा देखें।',subtitle:'रास्ता और वाहन चुनकर वास्तविक किराया देखें।',chooseCar:'वाहन चुनें',fare:'पूरी गाड़ी का किराया',booking:'निजी यात्रा अनुरोध',noFare:'इस मार्ग पर उपलब्ध नहीं',cash:'यात्रा पूरी होने पर ड्राइवर को नकद भुगतान',includes:'कर, ईंधन और टोल शामिल',vehicle:'चुना गया वाहन',route:'चुना गया मार्ग'},
};

const ROUTES=[
 {slug:'jeddah-airport-to-makkah',image:'/assets/homepage-v2/route-jeddah-makkah.jpg'},
 {slug:'makkah-to-madinah',image:'/assets/images/routes/makkah-to-madinah.jpg'},
 {slug:'makkah-to-taif',image:'/assets/images/routes/makkah-to-taif.jpg'},
] as const;

const FARE_KEYS:Record<string,string>={
 'toyota-camry':'camry','hyundai-staria':'staria','gmc-yukon-xl':'yukon','toyota-hiace':'hiace','toyota-coaster':'coaster',
};

export function RouteSpotlightExplorer({locale}:{locale:Locale}){
 const copy=TEXT[locale]; const rtl=locale==='ar'||locale==='ur';
 const [selectedRoute,setSelectedRoute]=useState(0);
 const [selectedCar,setSelectedCar]=useState(0);
 const route=ROUTES[selectedRoute];
 const car=APPROVED_5_FLEET[selectedCar];
 const routeLabel=LOCALIZED_ROUTE_NAMES[route.slug]?.[locale] || route.slug;
 const price=AUTHORITATIVE_TRANSFER_RATES[route.slug]?.[FARE_KEYS[car.bookingParam]];
 const available=typeof price==='number'&&Number.isFinite(price)&&price>0;
 const arrow=rtl?<ArrowLeft size={17} aria-hidden="true"/>:<ArrowRight size={17} aria-hidden="true"/>;
 const formatted=available?new Intl.NumberFormat(locale==='ar'?'ar-SA':'en-US').format(price):'';
 return <section className={styles.section} dir={rtl?'rtl':'ltr'} aria-labelledby="route-spotlight-heading">
   <div className={styles.shell}>
     <header className={styles.heading}>
       <div><span className={styles.eyebrow}>{copy.overline}</span><h2 id="route-spotlight-heading">{copy.title}</h2></div>
       <p>{copy.subtitle}</p>
     </header>
     <div className={styles.layout}>
       <div className={styles.routeTabs} role="tablist" aria-label={copy.route}>
         {ROUTES.map((item,i)=><button key={item.slug} type="button" role="tab"
            id={'route-spotlight-tab-'+i} aria-selected={selectedRoute===i}
            aria-controls="route-spotlight-panel" onClick={()=>setSelectedRoute(i)}
            className={selectedRoute===i?styles.active:''}>
            <span className={styles.index}>0{i+1}</span>
            <span>{LOCALIZED_ROUTE_NAMES[item.slug]?.[locale]||item.slug}</span>
            {arrow}
          </button>)}
       </div>
       <div className={styles.feature} id="route-spotlight-panel" role="tabpanel"
            aria-labelledby={'route-spotlight-tab-'+selectedRoute} tabIndex={0}>
          <div className={styles.photo}>
            <Image key={route.image} src={route.image} alt={routeLabel} fill
              sizes="(max-width: 850px) 100vw, 65vw" className={styles.image} />
            <div className={styles.photoOverlay}><MapPin size={16} aria-hidden="true"/><span>{routeLabel}</span></div>
          </div>
          <div className={styles.details}>
            <span className={styles.smallLabel}>{copy.chooseCar}</span>
            <div className={styles.cars} role="group" aria-label={copy.vehicle}>
              {APPROVED_5_FLEET.map((v,i)=><button type="button" key={v.id} aria-pressed={selectedCar===i}
                onClick={()=>setSelectedCar(i)} className={selectedCar===i?styles.chosen:''}>
                <span>{v.name[locale]}</span><small><Users size={12} aria-hidden="true"/>{v.passengers}</small>
              </button>)}
            </div>
            <div className={styles.checkout}>
              <div className={styles.price}>
                <small>{copy.fare}</small>
                {available?<strong>{formatted} <span>{locale==='ar'?'ر.س':'SAR'}</span></strong>:<strong className={styles.unavailable}>{copy.noFare}</strong>}
              </div>
              {available?<Link className={styles.book} href={'/'+locale+'/booking?route='+route.slug+'&vehicle='+car.bookingParam}>
                {copy.booking}{arrow}
              </Link>:<Link className={styles.fallback} href={'/'+locale+'/contact'}>{copy.booking}<ArrowUpRight size={16} aria-hidden="true"/></Link>}
            </div>
            <div className={styles.facts}><span><Check size={13} aria-hidden="true"/>{copy.cash}</span><span><Check size={13} aria-hidden="true"/>{copy.includes}</span></div>
          </div>
       </div>
     </div>
   </div>
 </section>;
}
