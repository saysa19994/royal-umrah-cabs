import Link from 'next/link';
import Image from 'next/image';
import {ArrowUpLeft,ArrowLeft,ShieldCheck,MonitorSmartphone,CarFront,CalendarCheck2} from 'lucide-react';
import styles from './StudioIndex.module.css';

const PANELS=[
 {slug:'desert-modernism',image:'/assets/homepage-v2/chauffeur-welcome.jpg',arabic:'حداثة الصحراء',english:'DESERT MODERNISM',number:'01',look:'مقترح أساسي',composition:'لقاء العمارة السعودية بالحجز المباشر',note:'تكوين معماري غير متماثل، زيتوني وحجر جيري، واستوديو سيارات بنظام تحريري.',tone:'a'},
 {slug:'royal-editorial',image:'/assets/homepage-v2/fleet-private.jpg',arabic:'التحرير الملكي',english:'ROYAL EDITORIAL',number:'02',look:'اختلاف جذري في التكوين',composition:'ملف رحلة بطابع مجلة ضيافة',note:'عنابي وبرونز، عناوين ضخمة، مقالات مصوّرة ودفتر حجز كصفحة من مجلة راقية.',tone:'b'},
 {slug:'cinematic-sandstone',image:'/assets/homepage-v2/hero-poster.jpg',arabic:'الحجر الرملي السينمائي',english:'CINEMATIC SANDSTONE',number:'03',look:'أجرأ اتجاه بصري',composition:'فيلم وصول ومعرض سيارات غامر',note:'إسبريسو وتيراكوتا، فيديو الهيرو الأصلي، مشاهد قصصية ومكتب رحلة داكن.',tone:'c'}
] as const;

export default function StudioIndex(){
 return <main dir="rtl" className={styles.index} data-design-studio>
  <div className={styles.banner}><span>DUYUF ALRAHMAN VIP / SIGNATURE DESIGN STUDIO</span><span>PREVIEW ONLY · NO PRODUCTION CHANGE</span></div>
  <div className={styles.head}><span className={styles.kicker}>THE SIGNATURE EXPERIENCE · PHASE 01</span>
   <h1>3 اتجاهات. <em>3 تجارب مختلفة.</em><br/>قرار واحد للهوية القادمة.</h1>
   <p>مش مجرد ألوان مختلفة. كل اتجاه مبني كتجربة ويب تفاعلية مستقلة باستخدام صور الأسطول المعتمدة وبيانات الرحلات الفعلية في مشروع ضيوف الرحمن VIP.</p>
   <div className={styles.hints}><span><MonitorSmartphone size={18}/> موبايل وكمبيوتر</span><span><CarFront size={18}/> 5 مركبات معتمدة</span><span><CalendarCheck2 size={18}/> تجربة حجز تفاعلية</span><span><ShieldCheck size={18}/> لا إرسال لقاعدة البيانات</span></div>
  </div>
  <section className={styles.collection} aria-label="اختر تصورًا بصريًا للمراجعة">
   {PANELS.map((x,i)=><article className={styles.panel+' '+styles[x.tone]} key={x.slug}>
    <div className={styles.panelImage}><Image src={x.image} alt={'مشهد من أصول المشروع لتصور '+x.arabic} fill priority={i===0} sizes="(max-width:880px) 100vw, 33vw"/>
     <span>{x.number} / 03</span>
    </div>
    <div className={styles.panelText}><small>{x.english}</small><h2>{x.arabic}</h2><p className={styles.composition}>{x.composition}</p><p className={styles.note}>{x.note}</p>
     <div className={styles.panelFoot}><span>{x.look}</span><Link href={'/studio/'+x.slug}>افتح التصميم التفاعلي <ArrowUpLeft size={18}/></Link></div>
    </div>
   </article>)}
  </section>
  <section className={styles.explain}><div><span>الترشيح المبدئي</span><h2>A — Desert Modernism</h2><p>الأقوى كبداية لهوية سعودية فاخرة طويلة الأمد وقابلة للتطبيق على الحجز والأسطول والمحتوى، لكن القرار النهائي بعد فتح الثلاثة على الموبايل والكمبيوتر.</p></div>
   <div className={styles.explainSide}><h3>حدود المعاينة</h3><p>دي نماذج تفاعلية للمقارنة، مش صفحات منشورة في الموقع الرسمي. الأسعار مأخوذة من مصفوفة المشروع ويجب مطابقتها بمحرك التسعير الفعلي عند التنفيذ. الصور هي أصول المشروع، وأي شعار هنا مجرد تصور قيد الاعتماد.</p><Link href="/studio/desert-modernism">ابدأ بالاتجاه A <ArrowLeft size={17}/></Link></div></section>
  <footer className={styles.footer}><span>ضيوف الرحمن VIP · تصميمات للمراجعة قبل الاعتماد</span><span>NOINDEX / NO BOOKING SUBMISSION / NO DATABASE WRITES</span></footer>
 </main>
}
