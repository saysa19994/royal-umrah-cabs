import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight,Users,Luggage} from 'lucide-react';
import styles from './RoyalCabinChapter.module.css';

export function RoyalCabinChapter({locale}:{locale:'ar'|'en'}){
 const ar=locale==='ar';
 return <section className={styles.chapter} aria-labelledby="royal-cabin-title">
  <div className={styles.copy}>
   <span className={styles.kicker}>{ar?'05 / داخل التجربة':'05 / THE COMFORT CHAPTER'}</span>
   <h2 id="royal-cabin-title">{ar?'الطريق جزء من الرحلة، وليس مجرد مسافة.':'Comfort is part of the journey.'}</h2>
   <p>{ar?'تختلف احتياجات الراكب الواحد عن العائلة والمجموعة. لذلك نعرض لك صور المقصورة والسعة المناسبة في كل مركبة قبل أن ترسل طلب الحجز، دون وعود بمزايا غير موثقة.':'A solo guest, a family and a larger group need different spaces. Explore interior photography and verified seating and luggage capacity before requesting a ride—without unverified luxury claims.'}</p>
   <div className={styles.specs}><span><Users size={18}/>{ar?'سعة مؤكدة لكل مركبة':'Verified vehicle seating'}</span><span><Luggage size={18}/>{ar?'اختيار حسب الحقائب':'Match your luggage'}</span></div>
   <Link href={'/'+locale+'/fleet'}>{ar?'تعرّف على المركبات':'Explore the fleet'}<ArrowUpRight size={18}/></Link>
  </div>
  <div className={styles.photo}><Image src="/assets/homepage-v2/vehicle-interior-cta.jpg" alt={ar?'صورة مقصورة مركبة من أصول الموقع':'Vehicle cabin photo from the approved project assets'} fill sizes="(max-width:800px) 100vw, 58vw"/><span>THE ART OF PRIVATE TRAVEL</span></div>
 </section>;
}
