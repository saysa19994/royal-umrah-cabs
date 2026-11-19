'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  AlertCircle, ArrowUpLeft, CalendarDays, CarFront, ClipboardList,
  Clock3, MapPin, Navigation2, RefreshCw, ShieldCheck,
} from 'lucide-react';

type Status = 'new' | 'confirmed' | 'driver_assigned' | 'en_route';
type Journey = {
  id: string; reference: string; customer_name: string; status: Status;
  pickup_datetime: string; pickup_location: string; dropoff_location: string;
  vehicle_id: string; passengers_count: number; driver_name: string | null;
  flight_number: string | null;
};
type ResponseData = { day: string; count: number; truncated: boolean; bookings: Journey[]; gpsAvailable: false };
const lanes: { id: Status; title: string; desc: string; border: string }[] = [
  { id: 'new', title: 'طلبات تحتاج تأكيد', desc: 'لم تتم مراجعة الحجز بعد', border: 'border-amber-300' },
  { id: 'confirmed', title: 'تنتظر السائق', desc: 'الحجز مؤكد بدون سائق', border: 'border-blue-300' },
  { id: 'driver_assigned', title: 'سائق مُعيّن', desc: 'التجهيز والاستقبال', border: 'border-violet-300' },
  { id: 'en_route', title: 'على الطريق', desc: 'تحديث يدوي للحالة', border: 'border-teal-400' },
];
function todayKsa() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
}
const when = (value: string) => new Intl.DateTimeFormat('ar-SA', {
  timeZone: 'Asia/Riyadh', hour: 'numeric', minute: '2-digit', hour12: true,
}).format(new Date(value));

export default function DispatchBoard() {
  const [day, setDay] = useState(todayKsa);
  const [result, setResult] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/admin/dispatch?day=' + encodeURIComponent(day), { cache: 'no-store' });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || 'تعذر تحميل الرحلات');
      setResult(json as ResponseData);
    } catch (e) {
      setResult(null);
      setError(e instanceof Error ? e.message : 'حدث خطأ في اتصال البيانات');
    } finally { setLoading(false); }
  }, [day]);
  useEffect(() => { void load(); }, [load]);

  const grouped = useMemo(() => {
    return Object.fromEntries(lanes.map(lane => [
      lane.id, (result?.bookings || []).filter(b => b.status === lane.id),
    ])) as Record<Status, Journey[]>;
  }, [result]);

  return (
    <section dir="rtl" className="min-h-[80vh] rounded-[24px] bg-[#F4F7F8] p-3 text-[#152E43] sm:p-6 lg:p-8">
      <header className="flex flex-col justify-between gap-4 border-b border-[#DBE4E8] pb-6 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold tracking-wide text-[#297B70]">DUYUF VIP · DAILY DISPATCH</p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">مركز توزيع الرحلات</h1>
          <p className="mt-2 text-sm text-[#64798A]">الرحلات الفعلية حسب توقيت السعودية — بدون مواقع GPS وهمية أو رحلات تجريبية.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 rounded-xl border border-[#D6E2E5] bg-white px-3 py-2 text-sm">
            <CalendarDays className="h-4 w-4 text-[#257365]"/>
            <span className="sr-only">اختر يوم التشغيل</span>
            <input type="date" aria-label="تاريخ التشغيل" value={day} onChange={e => setDay(e.target.value)} className="bg-transparent text-sm text-[#1D3B4D] outline-none"/>
          </label>
          <button type="button" onClick={() => void load()} disabled={loading} className="flex items-center gap-2 rounded-xl bg-[#183F51] px-4 py-3 text-xs font-bold text-white disabled:opacity-60">
            <RefreshCw className={'h-4 w-4 ' + (loading ? 'animate-spin' : '')}/> تحديث
          </button>
        </div>
      </header>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-[#D4E8E1] bg-[#E8F4EF] px-3 py-2 text-xs text-[#266658]">
          <ShieldCheck className="h-4 w-4"/> مصدر البيانات: الحجوزات الفعلية فقط
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-[#E8DFCC] bg-[#FFF8E9] px-3 py-2 text-xs text-[#855E23]">
          <Navigation2 className="h-4 w-4"/> GPS غير متصل — الحالة التشغيلية لا تعني موقعًا مباشرًا
        </div>
      </div>
      {error && <div role="alert" className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
        <AlertCircle className="h-5 w-5"/>{error}
      </div>}
      {result?.truncated && <p role="status" className="mt-4 text-sm text-amber-800">يُعرض أول 200 حجز لهذا اليوم فقط؛ راجع جدول الحجوزات لعرض البقية.</p>}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {lanes.map(lane => <section key={lane.id} aria-label={lane.title} className={'min-h-[300px] rounded-2xl border-t-4 bg-white p-3 shadow-[0_9px_28px_rgba(20,40,55,0.05)] sm:p-4 ' + lane.border}>
          <div className="flex items-start justify-between gap-3 border-b border-[#E7EDEF] pb-4">
            <div><h2 className="font-black">{lane.title}</h2><p className="mt-1 text-xs text-[#758695]">{lane.desc}</p></div>
            <span className="min-w-9 rounded-xl bg-[#EFF3F5] px-3 py-2 text-center text-sm font-extrabold text-[#214257]">{grouped[lane.id]?.length ?? 0}</span>
          </div>
          <div className="mt-3 space-y-3">
            {(grouped[lane.id] || []).map(b => <Link key={b.id} href={'/admin/bookings?q=' + encodeURIComponent(b.reference)}
              className="block rounded-xl border border-[#E2E9ED] bg-[#FCFDFD] p-3 transition hover:border-[#93C1B6] hover:bg-[#F4F9F7]">
              <div className="flex items-center justify-between gap-2"><span dir="ltr" className="text-sm font-extrabold">{b.reference}</span><ArrowUpLeft className="h-4 w-4 text-[#638579]"/></div>
              <p className="mt-2 text-xs text-[#617888]">{b.customer_name}</p>
              <div className="mt-3 flex items-center gap-2 text-xs font-bold text-[#2B5D69]">
                <Clock3 className="h-4 w-4"/>{when(b.pickup_datetime)}
              </div>
              <p className="mt-2 flex items-start gap-2 text-xs leading-5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#298271]"/>{b.pickup_location} ← {b.dropoff_location}</p>
              <p className="mt-2 flex items-center gap-2 text-xs text-[#607789]"><CarFront className="h-4 w-4"/>{b.vehicle_id} · {b.passengers_count} ركاب</p>
              {b.driver_name && <p className="mt-2 rounded-md bg-[#ECF3F2] px-2 py-1 text-xs text-[#2C655A]">السائق: {b.driver_name}</p>}
              {b.flight_number && <p dir="ltr" className="mt-2 text-xs text-[#647889]">Flight: {b.flight_number}</p>}
            </Link>)}
            {!loading && result && !(grouped[lane.id] || []).length && <div className="flex flex-col items-center justify-center gap-2 p-8 text-center text-[#95A7B2]">
              <ClipboardList className="h-7 w-7"/><p className="text-xs">لا توجد رحلات في هذه المرحلة اليوم</p>
            </div>}
            {loading && <p className="p-5 text-center text-xs text-[#738C9B]">جارٍ التحديث...</p>}
          </div>
        </section>)}
      </div>
      <p className="mt-5 text-xs text-[#6C8190]">الإسناد وتغيير الحالة يتمان من شاشة الحجز، مع فحص صلاحيات الموظف والتحقق من السائق على الخادم.</p>
    </section>
  );
}
