'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpLeft, Banknote, CalendarDays, CarFront, CheckCircle2,
  ClipboardList, Clock3, MapPin, Navigation2, RefreshCw,
  ShieldCheck, UsersRound,
} from 'lucide-react';

type Status = 'new' | 'confirmed' | 'driver_assigned' | 'en_route' | 'completed' | 'cancelled';
type Booking = {
  id:string; reference:string; customer_name:string; status:Status;
  pickup_datetime:string; pickup_location:string; dropoff_location:string;
  vehicle_id:string; passengers_count:number;
};
type Summary = {
  stages:Record<Status,number>; total:number; recent:Booking[];
  driversActive:number|null; leadsTotal:number|null; leadsNew:number|null;
};
const stages: Array<{status:Status; title:string; caption:string}> = [
  {status:'new',title:'جديد',caption:'طلبات تنتظر المراجعة'},
  {status:'confirmed',title:'مؤكد',caption:'تم تأكيد الرحلة'},
  {status:'driver_assigned',title:'السائق محدد',caption:'تم تكليف السائق'},
  {status:'en_route',title:'في الطريق',caption:'رحلات قيد التنفيذ'},
  {status:'completed',title:'مكتمل',caption:'رحلات تم إنهاؤها'},
  {status:'cancelled',title:'ملغي',caption:'حجوزات ملغاة'},
];
const n=(value:number|null|undefined)=>value===null||value===undefined ? '—' : value.toLocaleString('en-US');
const when=(iso:string)=>{
  const date=new Date(iso);
  return Number.isNaN(date.getTime())?'—':new Intl.DateTimeFormat('ar-SA',{
    timeZone:'Asia/Riyadh',day:'numeric',month:'short',hour:'numeric',minute:'2-digit',hour12:true,
  }).format(date);
};
function Tile({label,value,hint,icon}:{label:string;value:number|null|undefined;hint:string;icon:React.ReactNode}) {
  return <div className="vip-kpi flex min-h-[118px] items-start gap-3 p-4">
    <span className="vip-icon-tile shrink-0">{icon}</span>
    <div className="min-w-0"><p className="text-[11px] font-bold text-[#3f5460]">{label}</p>
      <p className="mt-1 text-[26px] font-black leading-none tabular-nums text-[#0b3140]">{n(value)}</p>
      <p className="mt-2 text-[10px] leading-4 text-[#77858b]">{hint}</p>
    </div>
  </div>;
}
export default function AdminCommandCenter() {
  const [summary,setSummary]=useState<Summary|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [dateLabel,setDateLabel]=useState('');
  const load=useCallback(async()=>{
    setLoading(true);setError('');
    const get=async(path:string)=>{
      const resp=await fetch(path,{cache:'no-store'});
      let body:Record<string,any>;
      try{body=await resp.json();}catch{throw new Error('تعذر قراءة بيانات لوحة العمليات');}
      if(!resp.ok)throw new Error(typeof body.error==='string'?body.error:'تعذر تحميل بيانات لوحة العمليات');
      return body;
    };
    try{
      // Legacy production APIs already enforce server-side owner/staff roles
      // and scope operator bookings to the assigned WhatsApp number.
      const results=await Promise.all(stages.map(s=>get('/api/admin/bookings?status='+s.status+'&limit=1')));
      const recent=await get('/api/admin/bookings?limit=8');
      const counts={} as Record<Status,number>;
      stages.forEach((stage,i)=>{
        const total=results[i].total;
        if(typeof total!=='number'||!Number.isFinite(total)||total<0)throw new Error('إحصائيات الحجوزات غير متاحة');
        counts[stage.status]=total;
      });
      if(!Array.isArray(recent.bookings))throw new Error('قائمة الحجوزات غير متاحة');
      const extras=await Promise.allSettled([
        get('/api/admin/drivers'),get('/api/admin/leads?limit=1'),get('/api/admin/leads?status=new&limit=1'),
      ]);
      const driverData=extras[0].status==='fulfilled'?extras[0].value:null;
      const leadData=extras[1].status==='fulfilled'?extras[1].value:null;
      const newLeadData=extras[2].status==='fulfilled'?extras[2].value:null;
      setSummary({
        stages:counts,total:stages.reduce((sum,s)=>sum+counts[s.status],0),
        recent:recent.bookings.slice(0,8),
        driversActive:Array.isArray(driverData?.drivers)?driverData.drivers.filter((x:{is_active:boolean})=>x.is_active).length:null,
        leadsTotal:typeof leadData?.total==='number'?leadData.total:null,
        leadsNew:typeof newLeadData?.total==='number'?newLeadData.total:null,
      });
    }catch(e){
      // Never show stale booking figures as current after an API failure.
      setSummary(null);setError(e instanceof Error?e.message:'تعذر تحميل بيانات الحجوزات');
    }finally{setLoading(false);}
  },[]);
  useEffect(()=>{
    setDateLabel(new Intl.DateTimeFormat('ar-SA',{
      timeZone:'Asia/Riyadh',weekday:'long',year:'numeric',month:'long',day:'numeric',
    }).format(new Date()));
    void load();
  },[load]);
  const recent=useMemo(()=>summary?.recent||[],[summary]);
  return <section dir="rtl" className="vip-command-center space-y-5 pb-7">
    <header className="vip-ops-workspace">
      <div className="min-w-0 flex-1">
        <div className="vip-workspace-eyebrow"><span className="vip-status-beacon" aria-hidden="true"/> DUYUF VIP · OPERATIONS</div>
        <h1 className="vip-brand-serif mt-2 text-[clamp(28px,3.1vw,44px)] font-bold leading-tight text-[#12303b]">مكتب تشغيل الرحلات</h1>
        <p className="mt-2 max-w-xl text-xs leading-6 text-[#5d7479] sm:text-sm">الحجوزات والسائقون واستفسارات ضيوف الرحمن VIP، وفق البيانات المسجلة في النظام.</p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <span className="vip-workspace-date"><CalendarDays className="h-4 w-4"/>{dateLabel||'—'}</span>
        <button type="button" className="vip-workspace-refresh" disabled={loading} onClick={()=>void load()}>
          <RefreshCw className={'h-4 w-4 '+(loading?'animate-spin':'')}/> تحديث البيانات
        </button>
      </div>
    </header>

    <nav aria-label="الوصول السريع إلى وظائف الإدارة" className="vip-workspace-shortcuts">
      <Link href="/admin/bookings" className="vip-workspace-shortcut"><ClipboardList className="h-5 w-5"/> الحجوزات <ArrowUpLeft className="ms-auto h-4 w-4"/></Link>
      <Link href="/admin/drivers" className="vip-workspace-shortcut"><CarFront className="h-5 w-5"/> السائقون <ArrowUpLeft className="ms-auto h-4 w-4"/></Link>
      <Link href="/admin/leads" className="vip-workspace-shortcut"><UsersRound className="h-5 w-5"/> الاستفسارات <ArrowUpLeft className="ms-auto h-4 w-4"/></Link>
    </nav>

    {error && <div role="alert" className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm text-rose-900">{error} — <button type="button" onClick={()=>void load()} className="underline">إعادة المحاولة</button></div>}

    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
      <Tile label="إجمالي الحجوزات" value={summary?.total} hint="وفق حالات الحجوزات المسجلة" icon={<ClipboardList className="h-5 w-5"/>}/>
      <Tile label="حجوزات جديدة" value={summary?.stages.new} hint="تحتاج مراجعة الفريق" icon={<Clock3 className="h-5 w-5"/>}/>
      <Tile label="سائقون نشطون" value={summary?.driversActive} hint="نشط بحسب سجل السائقين، ليس GPS" icon={<CarFront className="h-5 w-5"/>}/>
      <Tile label="الاستفسارات" value={summary?.leadsTotal} hint="إجمالي الاستفسارات المسجلة" icon={<UsersRound className="h-5 w-5"/>}/>
      <Tile label="استفسارات جديدة" value={summary?.leadsNew} hint="تحتاج ردًا من الفريق" icon={<Navigation2 className="h-5 w-5"/>}/>
    </div>

    <section className="vip-ops-board" aria-label="مراحل الحجوزات">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div><p className="vip-workspace-eyebrow">BOOKING FLOW · رحلة الطلب</p>
          <h2 className="vip-brand-serif mt-1 text-[21px] font-bold text-[#162f3b]">من الحجز إلى الوصول</h2>
          <p className="mt-1 text-xs text-[#6c7c83]">اختر أي مرحلة لفتح قائمة الحجوزات المفلترة. الأعداد الفعلية تأتي من API الحجوزات الحالي.</p>
        </div>
        <Link href="/admin/bookings" className="vip-soft-action">كل الحجوزات <ArrowUpLeft className="h-4 w-4"/></Link>
      </div>
      <div className="vip-stage-grid">
        {stages.map((st,i)=>{
          const count=summary?.stages[st.status];
          const share=summary&&summary.total?Math.min(100,Math.round((summary.stages[st.status]/summary.total)*100)):0;
          return <Link key={st.status} href={'/admin/bookings?status='+st.status} className="group vip-stage"
            aria-label={st.title+': '+n(count)+' حجز'}>
            <span className="flex justify-between text-xs text-[#80969b]"><span>{String(i+1).padStart(2,'0')}</span><ArrowUpLeft className="h-4 w-4"/></span>
            <strong className="mt-4 block text-[28px] font-extrabold tabular-nums text-[#17343b]">{n(count)}</strong>
            <span className="mt-2 text-xs font-bold text-[#284a54]">{st.title}</span>
            <span className="mt-1 block min-h-[30px] text-[10px] leading-4 text-[#77858b]">{st.caption}</span>
            <div className="vip-stage-track" aria-hidden="true"><div className={'vip-stage-bar vip-stage-bar--'+st.status} style={{width:share+'%'}}/></div>
          </Link>;
        })}
      </div>
    </section>

    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,.75fr)]">
      <section className="vip-section min-w-0 p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div><h2 className="vip-brand-serif text-[20px] font-bold text-[#183642]">أحدث الحجوزات</h2>
            <p className="mt-1 text-xs text-[#77858b]">آخر 8 حجوزات حسب تاريخ إنشاء الطلب — ليست رحلات اليوم بالضرورة</p>
          </div>
          <Link href="/admin/bookings" className="vip-soft-action">فتح القائمة <ArrowUpLeft className="h-4 w-4"/></Link>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="vip-dashboard-table min-w-[680px]">
            <thead><tr><th>رقم الحجز</th><th>العميل</th><th>خط الرحلة</th><th>السيارة</th><th>الاستلام</th><th>الحالة</th></tr></thead>
            <tbody>
              {recent.map(b=><tr key={b.id}>
                <td dir="ltr" className="font-bold">{b.reference||'—'}</td>
                <td>{b.customer_name||'—'}</td>
                <td>{b.pickup_location||'—'} ← {b.dropoff_location||'—'}</td>
                <td>{b.vehicle_id||'—'}</td>
                <td className="whitespace-nowrap">{when(b.pickup_datetime)}</td>
                <td><span className="text-xs font-bold">{stages.find(s=>s.status===b.status)?.title||b.status}</span></td>
              </tr>)}
              {!loading&&!error&&recent.length===0&&<tr><td colSpan={6} className="py-12 text-center text-sm text-[#74858b]">لا توجد حجوزات مسجلة بعد.</td></tr>}
            </tbody>
          </table>
          {loading&&<p className="px-3 py-5 text-sm text-[#70838b]">جاري تحميل الحجوزات…</p>}
        </div>
      </section>
      <section className="vip-section min-w-0 p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2"><MapPin className="h-5 w-5 text-[#a87d44]"/>
          <h2 className="vip-brand-serif text-[20px] font-bold text-[#183642]">إدارة الخدمات</h2></div>
        <div className="vip-route-illustration flex min-h-[164px] flex-col items-center justify-center gap-4 p-4 text-center text-[#f6e4be]">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold">
            <span>جدة</span><span className="h-px w-5 bg-[#d9b879]"/><span>مكة</span><span className="h-px w-5 bg-[#d9b879]"/><span>المدينة</span>
          </div>
          <p className="text-[11px] text-[#cfdfde]">خط خدمات توضيحي وليس تتبع GPS مباشر</p>
        </div>
        <div className="mt-4 space-y-3 text-xs text-[#65757c]">
          <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#156c68]"/> نظام الحجوزات يتطلب صلاحيات فريق العمل.</p>
          <p className="flex items-center gap-2"><Banknote className="h-4 w-4 text-[#156c68]"/> الدفع نقدًا للسائق بعد إتمام الرحلة؛ لا توجد دفعة مقدمة.</p>
          <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#156c68]"/> لا توجد أرقام تجريبية أو إيرادات مفترضة.</p>
        </div>
        <Link href="/admin/routes" className="vip-soft-action mt-4">إدارة المسارات <ArrowUpLeft className="h-4 w-4"/></Link>
      </section>
    </div>
  </section>;
}
