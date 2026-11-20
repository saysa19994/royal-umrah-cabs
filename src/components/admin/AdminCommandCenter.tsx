'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpLeft, Banknote, CalendarDays, CarFront, CheckCircle2,
  ClipboardList, Clock3, FileText, MapPin, Navigation2,
  RefreshCw, Route, ShieldCheck, UserRoundCheck, UsersRound,
} from 'lucide-react';

type Status = 'new' | 'confirmed' | 'driver_assigned' | 'en_route' | 'completed' | 'cancelled';
type Metrics = Record<'total' | Status | 'today' | 'leads_new' | 'leads_total', number>;
type Trip = {
  id: string; reference: string; customer_name: string; status: Status;
  pickup_datetime: string; pickup_location: string; dropoff_location: string;
  vehicle_id: string; passengers_count: number; driver_name: string | null;
  flight_number: string | null;
};
type Dispatch = { day: string; count: number; truncated: boolean; bookings: Trip[]; gpsAvailable: false };
type Report = { recordedCashSAR: number; awaitingCashSAR: number; completedValueSAR: number;
  topRoutes: Array<{ route: string; count: number }>; incomplete: boolean; };
type Driver = { is_active: boolean };

const statusNames: Record<Status, string> = {
  new: 'جديد', confirmed: 'مؤكد', driver_assigned: 'سائق مُعيّن',
  en_route: 'في الطريق', completed: 'مكتمل', cancelled: 'ملغي',
};
const operationStages: Array<{status: Status; caption: string; sequence: string}> = [
  {status:'new',caption:'تحتاج مراجعة الطلب',sequence:'01'},
  {status:'confirmed',caption:'جاهزة للتنسيق',sequence:'02'},
  {status:'driver_assigned',caption:'تم تكليف السائق',sequence:'03'},
  {status:'en_route',caption:'قيد التنفيذ الآن',sequence:'04'},
  {status:'completed',caption:'رحلات منتهية',sequence:'05'},
  {status:'cancelled',caption:'للمراجعة والأرشفة',sequence:'06'},
];

const statusClass: Record<Status,string> = {
  new:'vip-pill--new', confirmed:'vip-pill--confirmed', driver_assigned:'vip-pill--driver',
  en_route:'vip-pill--enroute', completed:'vip-pill--complete', cancelled:'vip-pill--cancelled',
};
const money = (value?: number) =>
  value === undefined ? '—' : Number(value).toLocaleString('en-US', {maximumFractionDigits: 2});
const time = (value: string) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '—' : new Intl.DateTimeFormat('ar-SA', {
    timeZone:'Asia/Riyadh',hour:'numeric',minute:'2-digit',hour12:true,
  }).format(d);
};
const today = () => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Riyadh',year:'numeric',month:'2-digit',day:'2-digit',
}).format(new Date());

function Kpi({ title, value, hint, icon }: {
  title:string; value:string;hint:string;icon:React.ReactNode;
}) {
  return <div className="vip-kpi flex min-h-[119px] items-start gap-3 p-3.5 sm:p-4">
    <span className="vip-icon-tile shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-[11px] font-bold text-[#384652] sm:text-xs">{title}</p>
      <p className="mt-1 text-[23px] font-black leading-none tabular-nums text-[#0c2636] sm:text-[28px]">{value}</p>
      <p className="mt-2 text-[10px] leading-4 text-[#768086]">{hint}</p>
    </div>
  </div>;
}

function RouteSketch() {
  return <div className="vip-route-illustration" role="img" aria-label="رسم توضيحي لاتصال جدة بمكة والمدينة وليس تتبعًا مباشرًا">
    <svg viewBox="0 0 300 180" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="routeGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e6c68a"/>
          <stop offset="100%" stopColor="#c28740"/>
        </linearGradient>
        <pattern id="routeGrid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0V25" stroke="#a1bdc1" strokeWidth=".6" opacity=".15" fill="none"/>
        </pattern>
      </defs>
      <rect width="300" height="180" fill="url(#routeGrid)"/>
      <path d="M40 12L72 37L56 62L81 94L71 121L100 171M148 10L121 41L140 65L126 104L155 143L139 180M252 4L236 43L251 77L228 108L242 158" fill="none" stroke="#557889" strokeWidth="1.2" opacity=".55"/>
      <path d="M87 140Q150 142 156 96Q178 54 192 24" fill="none" stroke="#f6d7a0" opacity=".20" strokeWidth="12" strokeLinecap="round"/>
      <path d="M87 140Q150 142 156 96Q178 54 192 24" fill="none" stroke="url(#routeGlow)" strokeWidth="3.5" strokeLinecap="round"/>
      {[{x:87,y:140,t:'جدة',tx:59,ty:156},{x:156,y:96,t:'مكة',tx:168,ty:93},{x:192,y:24,t:'المدينة',tx:204,ty:24}].map(p=>
        <g key={p.t}>
          <circle cx={p.x} cy={p.y} r="10" fill="#172e3c" stroke="#d6ad69" strokeWidth="2"/>
          <circle cx={p.x} cy={p.y} r="3.2" fill="#f4d49e"/>
          <text x={p.tx} y={p.ty} fontFamily="Arial,sans-serif" fill="#f4e5cb" fontSize="12">{p.t}</text>
        </g>
      )}
    </svg>
  </div>;
}

export default function AdminCommandCenter() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [dispatch, setDispatch] = useState<Dispatch | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [activeDrivers, setActiveDrivers] = useState<number | null>(null);
  const [dateLabel, setDateLabel] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);setError('');
    const read = async (path:string) => {
      const response = await fetch(path,{cache:'no-store'});
      const data = await response.json();
      if(!response.ok) throw new Error(data?.error || 'تعذر تحميل البيانات');
      return data;
    };
    try {
      const [kpi, daily, finance, drivers] = await Promise.allSettled([
        read('/api/admin/overview'),
        read('/api/admin/dispatch?day=' + today()),
        read('/api/admin/reports/operations?days=30'),
        read('/api/admin/drivers'),
      ]);
      if (kpi.status !== 'fulfilled' || daily.status !== 'fulfilled') {
        throw new Error('تعذر تحميل ملخص الحجوزات أو الرحلات');
      }
      setMetrics(kpi.value as Metrics);
      setDispatch(daily.value as Dispatch);
      setReport(finance.status === 'fulfilled' ? finance.value as Report : null);
      setActiveDrivers(drivers.status === 'fulfilled' && Array.isArray(drivers.value.drivers)
        ? drivers.value.drivers.filter((driver:Driver) => driver.is_active).length
        : null);
    } catch(e) {
      // On network/permission failure do not leave yesterday's figures styled
      // as a fresh live operations snapshot.
      setMetrics(null);
      setDispatch(null);
      setReport(null);
      setActiveDrivers(null);
      setError(e instanceof Error ? e.message : 'تعذر تحديث البيانات');
    } finally {setLoading(false);}
  }, []);
  useEffect(() => {
    setDateLabel(new Intl.DateTimeFormat('ar-SA',{
      timeZone:'Asia/Riyadh',weekday:'long',year:'numeric',month:'long',day:'numeric',
    }).format(new Date()));
    void load();
  },[load]);

  const trips = useMemo(() => (dispatch?.bookings || []).slice(0,6),[dispatch]);
  const timeline = useMemo(() => (dispatch?.bookings || []).slice(0,5),[dispatch]);
  const active = metrics ? metrics.driver_assigned + metrics.en_route : undefined;

  return <section dir="rtl" className="vip-command-center space-y-5 pb-6">
    <header className="vip-ops-workspace">
      <div className="min-w-0 flex-1">
        <div className="vip-workspace-eyebrow"><span className="vip-status-beacon" aria-hidden="true"/> DUYUF VIP · OPERATIONS</div>
        <h1 className="vip-brand-serif mt-2 text-[clamp(27px,3.1vw,45px)] font-bold leading-tight text-[#122f39]">مكتب تشغيل الرحلات</h1>
        <p className="mt-2 max-w-2xl text-xs leading-6 text-[#62737b] sm:text-sm">
          متابعة الحجوزات والسائقين والتحصيل النقدي في مساحة واحدة، بالأرقام المسجلة فعليًا.
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <span className="vip-workspace-date"><CalendarDays className="h-4 w-4"/>{dateLabel || '—'}</span>
        <button type="button" onClick={() => void load()} disabled={loading}
          className="vip-workspace-refresh" aria-label="تحديث بيانات لوحة العمليات">
          <RefreshCw className={'h-4 w-4 '+(loading?'animate-spin':'')}/><span>تحديث مباشر</span>
        </button>
      </div>
    </header>

    <nav aria-label="التنقل السريع بين أعمال الإدارة" className="vip-workspace-shortcuts">
      <Link href="/admin/bookings" className="vip-workspace-shortcut">
        <ClipboardList className="h-[18px] w-[18px]"/><span>إدارة الحجوزات</span><ArrowUpLeft className="ms-auto h-4 w-4"/>
      </Link>
      <Link href="/admin/dispatch" className="vip-workspace-shortcut">
        <Navigation2 className="h-[18px] w-[18px]"/><span>توزيع الرحلات</span><ArrowUpLeft className="ms-auto h-4 w-4"/>
      </Link>
      <Link href="/admin/leads" className="vip-workspace-shortcut">
        <UsersRound className="h-[18px] w-[18px]"/><span>الاستفسارات</span><ArrowUpLeft className="ms-auto h-4 w-4"/>
      </Link>
    </nav>

    {error && <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{error} — <button onClick={() => void load()} className="underline">إعادة المحاولة</button></div>}

    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 2xl:grid-cols-5">
      <Kpi title="إجمالي الحجوزات" value={metrics ? money(metrics.total) : '—'} hint="الطلبات المسجلة بالنظام" icon={<ClipboardList className="h-5 w-5"/>}/>
      <Kpi title="رحلات اليوم" value={metrics ? money(metrics.today) : '—'} hint="حسب موعد الاستلام بالسعودية" icon={<CalendarDays className="h-5 w-5"/>}/>
      <Kpi title="سائقون نشطون" value={activeDrivers === null ? '—' : money(activeDrivers)} hint="بحسب دليل السائقين، وليس GPS" icon={<CarFront className="h-5 w-5"/>}/>
      <Kpi title="تنتظر التحصيل" value={report ? money(report.awaitingCashSAR) + ' ر.س' : '—'} hint="رحلات مكتملة بحجوزات آخر 30 يومًا" icon={<Banknote className="h-5 w-5"/>}/>
      <Kpi title="استفسارات جديدة" value={metrics ? money(metrics.leads_new) : '—'} hint="عملاء يحتاجون ردًا من الفريق" icon={<UsersRound className="h-5 w-5"/>}/>
    </div>

    <section className="vip-ops-board" aria-label="مراحل الحجوزات المسجلة">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="vip-workspace-eyebrow">BOOKING FLOW · حالة الحجوزات</p>
          <h2 className="vip-brand-serif mt-1 text-[21px] font-bold text-[#172f3a] sm:text-[25px]">رحلة الحجز من الطلب إلى الوصول</h2>
          <p className="mt-1 text-xs text-[#71818a]">اضغط أي مرحلة لعرض الحجوزات الخاصة بها. الأعداد مأخوذة من قاعدة البيانات وليست بيانات تجريبية.</p>
        </div>
        <Link href="/admin/bookings" className="vip-soft-action">عرض كل الحجوزات <ArrowUpLeft className="h-4 w-4"/></Link>
      </div>
      <div className="vip-stage-grid">
        {operationStages.map(({status, caption, sequence}) => {
          const count=metrics?.[status];
          const share=count === undefined || !metrics?.total
            ? 0 : Math.min(100,Math.max(0,Math.round((count/metrics.total)*100)));
          return <Link key={status} href={'/admin/bookings?status='+encodeURIComponent(status)}
            className="group vip-stage" aria-label={statusNames[status]+': '+(count===undefined?'غير متاح':count)+' حجز'}>
            <div className="flex items-center justify-between gap-2">
              <span className="vip-stage-sequence">{sequence}</span>
              <ArrowUpLeft className="h-4 w-4 text-[#87969a] transition-transform group-hover:-translate-x-0.5"/>
            </div>
            <strong className="mt-4 block text-[27px] font-extrabold leading-none tabular-nums text-[#102e3a]">
              {count === undefined ? '—' : money(count)}
            </strong>
            <span className="mt-2 block text-[12px] font-bold text-[#234955]">{statusNames[status]}</span>
            <span className="mt-1 block min-h-[30px] text-[10px] leading-4 text-[#7d898b]">{caption}</span>
            <div className="vip-stage-track" aria-hidden="true">
              <div className={'vip-stage-bar vip-stage-bar--'+status} style={{width:share+'%'}}/>
            </div>
          </Link>;
        })}
      </div>
    </section>

    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(340px,.9fr)]">
      <section className="vip-section min-w-0 p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="vip-icon-tile"><CalendarDays className="h-5 w-5"/></span>
            <div><h2 className="vip-section-heading vip-brand-serif text-[20px] font-bold">حجوزات اليوم</h2>
              <p className="text-[11px] text-[#7d8182]">الرحلات المقررة وحالتها التشغيلية</p>
            </div>
          </div>
          <Link href="/admin/bookings" className="vip-soft-action">جميع الحجوزات <ArrowUpLeft className="h-4 w-4"/></Link>
        </div>
        <div className="hidden overflow-x-auto sm:block">
          <table className="vip-dashboard-table">
            <thead><tr>
              <th>رقم الحجز</th><th>العميل</th><th>المسار</th><th>السيارة</th><th>الاستلام</th><th>الحالة</th>
            </tr></thead>
            <tbody>
              {trips.map(t => <tr key={t.id}>
                <td className="font-bold" dir="ltr"><Link className="text-[#125e65] hover:underline" href={'/admin/bookings?q='+encodeURIComponent(t.reference)}>{t.reference}</Link></td>
                <td className="max-w-[140px] truncate">{t.customer_name}</td>
                <td className="max-w-[190px]"><span className="line-clamp-2 leading-5">{t.pickup_location} ← {t.dropoff_location}</span></td>
                <td className="whitespace-nowrap">{t.vehicle_id}</td>
                <td className="whitespace-nowrap">{time(t.pickup_datetime)}</td>
                <td><span className={'vip-pill '+statusClass[t.status]}>{statusNames[t.status]}</span></td>
              </tr>)}
              {!loading && trips.length === 0 && <tr><td colSpan={6} className="py-16 text-center text-sm text-[#71828b]">
                لا توجد رحلات تشغيلية مسجلة لهذا اليوم.
              </td></tr>}
            </tbody>
          </table>
        </div>
        <div className="space-y-2 sm:hidden">
          {trips.map(t => <Link key={t.id} href={'/admin/bookings?q='+encodeURIComponent(t.reference)}
            className="block rounded-xl border border-[#eadfce] bg-[#fffdf9] p-3">
            <div className="flex justify-between gap-2"><strong dir="ltr" className="text-sm text-[#17495c]">{t.reference}</strong><span className={'vip-pill '+statusClass[t.status]}>{statusNames[t.status]}</span></div>
            <p className="mt-1 text-sm font-semibold">{t.customer_name}</p>
            <p className="mt-2 text-xs text-[#77818a]">{t.pickup_location} ← {t.dropoff_location}</p>
            <p className="mt-1 text-xs text-[#497177]">{time(t.pickup_datetime)} · {t.vehicle_id}</p>
          </Link>)}
          {!loading && !trips.length && <p className="rounded-xl bg-[#f7efe2] px-4 py-10 text-center text-sm text-[#7d8790]">لا توجد رحلات اليوم.</p>}
        </div>
        {dispatch?.truncated && <p className="mt-3 text-xs text-amber-700">القائمة اليومية تحتوي نتائج إضافية. افتح مركز التوزيع للاطلاع على المزيد.</p>}
      </section>

      <section className="vip-section min-w-0 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="vip-icon-tile"><Navigation2 className="h-5 w-5"/></span>
            <div><h2 className="vip-section-heading vip-brand-serif text-[20px] font-bold">متابعة توزيع اليوم</h2>
              <p className="text-[11px] text-[#7d8182]">تسلسل الرحلات حسب موعد الاستلام</p>
            </div>
          </div>
          <Link href="/admin/dispatch" className="vip-soft-action">فتح <ArrowUpLeft className="h-4 w-4"/></Link>
        </div>
        <div className="relative space-y-1 before:absolute before:bottom-4 before:top-3 before:right-[7px] before:w-px before:bg-[#d0bfa7]">
          {timeline.map(t => <Link key={t.id} href={'/admin/bookings?q='+encodeURIComponent(t.reference)} className="relative flex gap-3 rounded-lg p-2 hover:bg-[#f8eddd]">
            <span className="relative z-10 mt-2 h-4 w-4 shrink-0 rounded-full border-2 border-[#ba9864] bg-[#faf5ed]"/>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-black text-[#163044]">{t.pickup_location} ← {t.dropoff_location}</p>
                <span className={'vip-pill '+statusClass[t.status]}>{statusNames[t.status]}</span>
              </div>
              <p className="mt-1 text-[11px] text-[#6a7780]">{time(t.pickup_datetime)} · {t.driver_name ? 'السائق: '+t.driver_name : 'لم يتم تعيين سائق'} </p>
            </div>
          </Link>)}
          {!loading && !timeline.length && <p className="py-12 text-center text-sm text-[#778791]">لا توجد رحلات نشطة في الجدول اليوم.</p>}
        </div>
        <p className="mt-3 border-t border-[#efe2d1] pt-3 text-[11px] text-[#7a8080]">الحالات تشغيلية وليست تتبع GPS مباشر.</p>
      </section>
    </div>

    <div className="grid gap-4 lg:grid-cols-3">
      <section className="vip-section p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-3">
          <span className="vip-icon-tile"><Banknote className="h-5 w-5"/></span>
          <div><h2 className="vip-brand-serif text-[18px] font-bold text-[#173241]">ملخص التحصيل النقدي</h2>
            <p className="text-[11px] text-[#768186]">حجوزات آخر 30 يومًا</p>
          </div>
        </div>
        <div className="rounded-xl bg-[#ecf0e8] p-4">
          <p className="text-[11px] font-semibold text-[#557168]">المسجل كمحصّل للرحلات المكتملة</p>
          <p className="mt-2 text-[27px] font-black tabular-nums text-[#173942]">{report ? money(report.recordedCashSAR) : '—'} <span className="text-xs">ر.س</span></p>
        </div>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-2 border-b border-[#eee2d1] py-2"><span>قيمة الرحلات المكتملة</span><strong>{report ? money(report.completedValueSAR) : '—'} ر.س</strong></div>
          <div className="flex justify-between gap-2 py-2"><span>بانتظار تسجيل التحصيل</span><strong className="text-[#996a25]">{report ? money(report.awaitingCashSAR) : '—'} ر.س</strong></div>
        </div>
        <Link href="/admin/collections" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#13676c] hover:underline">
          إدارة التحصيل النقدي <ArrowUpLeft className="h-4 w-4"/>
        </Link>
      </section>

      <section className="vip-section p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-3">
          <span className="vip-icon-tile"><Route className="h-5 w-5"/></span>
          <div><h2 className="vip-brand-serif text-[18px] font-bold text-[#173241]">المسارات الأكثر حجزًا</h2>
            <p className="text-[11px] text-[#768186]">خلال آخر 30 يومًا</p>
          </div>
        </div>
        <div className="space-y-4">
          {report?.topRoutes?.map((r,i) => {
            const max=report.topRoutes[0]?.count||1;
            return <div key={r.route}>
              <div className="flex justify-between gap-2 text-xs"><span className="max-w-[75%] truncate font-semibold">{i+1}. {r.route.replace(/-/g,' ')}</span><strong>{money(r.count)}</strong></div>
              <div className="mt-2 h-2 rounded-full bg-[#eee1cf]"><div className="h-2 rounded-full bg-gradient-to-l from-[#d4ab62] to-[#ab7c3f]" style={{width:(r.count/max*100)+'%'}}/></div>
            </div>;
          })}
          {!report?.topRoutes?.length && <p className="py-12 text-center text-sm text-[#7c8991]">لا توجد إحصائيات مسارات للفترة المحددة.</p>}
        </div>
        {report?.incomplete && <p className="mt-4 text-xs text-amber-800">التقرير يتضمن أكثر من 2000 سجل؛ بعض المجاميع جزئية.</p>}
      </section>

      <section className="vip-section p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="vip-icon-tile"><MapPin className="h-5 w-5"/></span>
            <div><h2 className="vip-brand-serif text-[18px] font-bold text-[#173241]">الأسطول والمسارات</h2>
              <p className="text-[11px] text-[#768186]">نطاق الخدمة التشغيلي</p>
            </div>
          </div>
          <Link href="/admin/routes" className="vip-soft-action">المسارات <ArrowUpLeft className="h-4 w-4"/></Link>
        </div>
        <RouteSketch />
        <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-[#f6eee2] p-3"><strong className="block text-xl text-[#183747]">{active === undefined ? '—' : money(active)}</strong><span className="text-[#6f7f86]">رحلات مُسندة أو جارية</span></div>
          <div className="rounded-xl bg-[#f6eee2] p-3"><strong className="block text-xl text-[#183747]">{metrics ? money(metrics.confirmed) : '—'}</strong><span className="text-[#6f7f86]">حجوزات مؤكدة</span></div>
        </div>
        <p className="mt-2 text-[10px] text-[#7a8587]">الخريطة توضيحية فقط؛ لا تمثل موقع سيارة مباشرًا.</p>
      </section>
    </div>

    <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-[#75818a]">
      <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#1b7161]"/> عرض من البيانات الفعلية فقط، دون أرقام تجريبية.</p>
      <button onClick={() => void load()} disabled={loading} className="flex items-center gap-2 rounded-lg px-3 py-2 font-bold text-[#1a6366] hover:bg-[#eadfcf]">
        <RefreshCw className={'h-4 w-4 '+(loading?'animate-spin':'')}/> تحديث المعلومات
      </button>
    </div>
  </section>;
}
