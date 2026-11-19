import Link from 'next/link';
import { BookOpen, Camera, CarFront, MapPinned, Coins, FileText,
  Settings2, MessageSquareText, ClipboardList, ArrowUpRight, Globe2, ShieldCheck } from 'lucide-react';

export const metadata={
  title:'مركز التحكم في محتوى الموقع | ضيوف الرحمن VIP',
  robots:{index:false,follow:false},
};
export const dynamic='force-dynamic';

type Shortcut={label:string; description:string;href:string;icon:typeof FileText;kind:'content'|'business'|'operations'};
const shortcuts:Shortcut[]=[
 {label:'الصفحة الرئيسية',description:'النصوص والعناوين باللغات العشر',href:'/admin/home-copy',icon:FileText,kind:'content'},
 {label:'صور جميع الصفحات',description:'تغيير صور الهيرو والمحتوى ومن نحن والخدمات والحجز',href:'/admin/site-assets',icon:Camera,kind:'content'},
 {label:'مكتبة الصور',description:'رفع صور جديدة، تصفح الصور الموجودة ونسخ روابطها',href:'/admin/asset-library',icon:Camera,kind:'content'},
 {label:'صفحة من نحن',description:'العنوان والوصف والقصة وبيانات SEO لكل لغة',href:'/admin/cms?page=about&locale=ar',icon:FileText,kind:'content'},
 {label:'صفحة الخدمات',description:'العنوان والمقدمة وبيانات SEO وصور الأقسام',href:'/admin/cms?page=services&locale=ar',icon:FileText,kind:'content'},
 {label:'صفحة اتصل بنا',description:'العنوان والمقدمة والنموذج وبيانات SEO',href:'/admin/cms?page=contact&locale=ar',icon:MessageSquareText,kind:'content'},
 {label:'صفحة المزارات',description:'عنوان المزارات والمقدمة وبيانات SEO',href:'/admin/cms?page=ziyarat&locale=ar',icon:MapPinned,kind:'content'},
 {label:'المدونة والمقالات',description:'الصورة والموضوع والملخص ونشر المقالات',href:'/admin/blog',icon:BookOpen,kind:'content'},
 {label:'الأسطول والسيارات',description:'حالة السيارة والصور والسعة والترجمات',href:'/admin/fleet',icon:CarFront,kind:'business'},
 {label:'المسارات والمدن',description:'إضافة مدن ونقاط انطلاق ووجهات وترجماتها',href:'/admin/routes',icon:MapPinned,kind:'business'},
 {label:'أسعار الرحلات',description:'تعديل أجرة كل سيارة على كل مسار ونشر السعر المعتمد',href:'/admin/pricing',icon:Coins,kind:'business'},
 {label:'صفحة الحجز',description:'عنوان وتقديم الصفحة وصورها — دون تغيير سياسة الدفع',href:'/admin/cms?page=booking&locale=ar',icon:ClipboardList,kind:'business'},
 {label:'المراجعات',description:'التحقق من التقييمات والموافقة على نشرها',href:'/admin/reviews',icon:MessageSquareText,kind:'operations'},
 {label:'الأسئلة الشائعة',description:'إدارة الإجابات والأسئلة المتكررة',href:'/admin/faqs',icon:FileText,kind:'operations'},
 {label:'إعدادات الموقع',description:'بيانات التواصل والسياسات والإعدادات المتاحة',href:'/admin/settings',icon:Settings2,kind:'operations'},
 {label:'الحجوزات',description:'حالة الطلب، تعيين السائق والمتابعة التشغيلية',href:'/admin/bookings',icon:ClipboardList,kind:'operations'},
];
const categories=[
 {kind:'content' as const,title:'المحتوى والتصميم',desc:'الصور والعناوين والمقالات والتحرير المتعدد اللغات'},
 {kind:'business' as const,title:'السيارات والأسعار والرحلات',desc:'إدارة البيانات التي تظهر للزائر وتستخدمها شاشة الحجز'},
 {kind:'operations' as const,title:'التشغيل وخدمة العملاء',desc:'الحجوزات والمراجعات وإعدادات الخدمة'},
];

export default function SiteControlPage(){
 return <main dir="rtl" className="vip-internal-editorial mx-auto max-w-[1450px] space-y-7 rounded-2xl bg-[#f8f0e4] p-4 text-[#153845] sm:p-7">
   <header className="overflow-hidden rounded-2xl bg-[#113e49] p-6 text-white sm:p-9">
     <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#d9c49e]">
       <Globe2 size={17}/> WEBSITE CONTENT COMMAND
     </div>
     <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">مركز إدارة موقع ضيوف الرحمن VIP</h1>
     <p className="mt-3 max-w-3xl text-sm leading-7 text-[#d9e6e9]">
       من هنا تصل لكل أدوات تعديل صفحات الموقع، صور السيارات، أسعار الرحلات، المقالات ومحتوى اللغات العشر. التعديلات المحفوظة في Supabase تظهر بعد تحديث كاش الصفحات المرتبطة.
     </p>
     <div className="mt-5 inline-flex flex-wrap items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-xs text-white/90">
       <ShieldCheck size={17}/> سياسة الدفع النقدي بعد الرحلة، والحجوزات الحقيقية، محمية من محرر النصوص
     </div>
   </header>
   {categories.map(group=><section className="space-y-4" key={group.kind}>
     <div><h2 className="text-xl font-black">{group.title}</h2><p className="mt-1 text-sm text-[#627780]">{group.desc}</p></div>
     <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
       {shortcuts.filter(s=>s.kind===group.kind).map(item=>{
         const Icon=item.icon;
         return <Link key={item.href} href={item.href}
           className="group flex min-h-[142px] flex-col justify-between rounded-xl border border-[#dfcbb0] bg-[#fffcf7] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0c6c67] hover:shadow-lg">
           <div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e7f0eb] text-[#0d6862]"><Icon size={21}/></span>
             <ArrowUpRight className="text-[#7a8a8b] transition group-hover:text-[#0c6c67]"/></div>
           <div><h3 className="mt-3 font-extrabold">{item.label}</h3><p className="mt-1 text-xs leading-6 text-[#647784]">{item.description}</p></div>
         </Link>;
       })}
     </div>
   </section>)}
   <p className="border-t border-[#deccb6] pt-4 text-xs leading-6 text-[#657682]">
     ملاحظة: بعض أقسام الموقع ما زالت تحتاج ربطًا أوسع بين الحقول الداخلية وواجهات العرض. النجاح في البناء لا يغني عن اختبار الحفظ والظهور باستخدام حساب مدير وقاعدة تجريبية قبل اعتماد الإنتاج.
   </p>
 </main>;
}
