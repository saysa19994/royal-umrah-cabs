import Link from 'next/link';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {DuyufSignature} from '@/components/brand/DuyufSignature';
export const metadata:Metadata={title:'Duyuf VIP — Three Signature Directions',robots:{index:false,follow:false,noarchive:true}};
const DESIGNS=[
 {slug:'desert',id:'01',en:'Desert Modernism',ar:'الحداثة الصحراوية',palette:['#F3EFE5','#34483B','#B77C4D','#292821'],arText:'عمارة سعودية دافئة، حجري عاجي، زيتوني، ونحاس معتّق',enText:'Limestone architecture, deep olive and copper'},
 {slug:'editorial',id:'02',en:'Royal Editorial',ar:'الفخامة التحريرية',palette:['#F8F4EC','#542E32','#B38B62','#302825'],arText:'تكوين تحريري يشبه مجلات الضيافة الفاخرة',enText:'Editorial hospitality, burgundy and antique bronze'},
 {slug:'cinematic',id:'03',en:'Cinematic Sandstone',ar:'الحجر الرملي السينمائي',palette:['#E8DCC9','#29251F','#B96746','#78806A'],arText:'سينما سفر دافئة وطابع درامي مع واجهة حجز مباشرة',enText:'Immersive desert film, espresso and terracotta'}
];
export default async function SignatureLabIndex({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(locale!=='ar'&&locale!=='en')notFound();const ar=locale==='ar';
 return <main dir={ar?'rtl':'ltr'} style={{minHeight:'100vh',background:'#f8f4ec',color:'#2a2b27',fontFamily:'Segoe UI,Tahoma,Arial,sans-serif',padding:'clamp(25px,5vw,85px)'}}>
  <div style={{maxWidth:1400,margin:'auto'}}>
   <div style={{display:'flex',alignItems:'center',gap:15,marginBottom:75}}><DuyufSignature className="h-12 w-12"/><div style={{fontWeight:800,fontSize:20}}>ضيوف الرحمن VIP<small style={{display:'block',fontSize:10,letterSpacing:'.11em'}}>DUYUF ALRAHMAN VIP</small></div></div>
   <span style={{fontWeight:800,color:'#ae855b',letterSpacing:'.11em',fontSize:11}}>THE SIGNATURE EXPERIENCE / PHASE 01</span>
   <h1 style={{fontSize:'clamp(40px,6vw,92px)',lineHeight:1.2,margin:'15px 0 20px'}}>{ar?'ثلاث تجارب. هوية واحدة.':'Three journeys. One identity.'}</h1>
   <p style={{maxWidth:790,color:'#6f716b',lineHeight:2,fontSize:14}}>{ar?'اختبر ثلاث اتجاهات مستقلة للرئيسية والأسطول وتفاصيل السيارة والحجز والأسعار. كلها تصورات على Vercel ولا تمس الموقع الرسمي ولا تنشئ حجزًا وهميًا.':'Compare three independent high-fidelity concepts for the homepage, fleet, vehicle detail, booking and pricing. These are previews only.'}</p>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(270px,1fr))',gap:17,marginTop:49}}>
    {DESIGNS.map(d=><Link href={'/signature-lab/'+locale+'/'+d.slug} key={d.slug} style={{textDecoration:'none',color:'#252b25',background:'#fffdfa',border:'1px solid #d6cab7',padding:'32px 27px',minHeight:375,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
     <div><span style={{fontSize:13,color:'#a48155'}}>{d.id} / {d.en.toUpperCase()}</span><h2 style={{fontSize:39,lineHeight:1.3,margin:'22px 0 12px'}}>{ar?d.ar:d.en}</h2><p style={{fontSize:13,lineHeight:1.9,color:'#77776e'}}>{ar?d.arText:d.enText}</p></div>
     <div><div style={{display:'flex',gap:8,marginBottom:19}}>{d.palette.map(x=><span key={x} style={{height:38,flex:1,background:x,border:'1px solid #ddd3c7'}}/>)}</div><span style={{fontWeight:850,fontSize:13,color:'#35634e'}}>{ar?'افتح التصميم الكامل':'Open the preview'} ↗</span></div>
    </Link>)}
   </div>
   <p style={{fontSize:11,color:'#6c7069',marginTop:29}}>{ar?'معاينة للاعتماد فقط — صور السيارات وأسعارها من بيانات المشروع.':'Design approval preview — authentic fleet photos and server-provided fares.'}</p>
  </div>
 </main>;
}
