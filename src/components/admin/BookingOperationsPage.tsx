'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity, AlertCircle, ArrowUpLeft, CalendarDays, CarFront, CheckCircle2,
  ChevronLeft, ChevronRight, ClipboardList, Clock3, Download, Loader2,
  Mail, MapPin, Phone, RefreshCw, Search, ShieldCheck, UserRoundCheck, X,
} from 'lucide-react';

type Status = 'new' | 'confirmed' | 'driver_assigned' | 'en_route' | 'completed' | 'cancelled';
type Booking = {
  id: string; reference: string; customer_name: string; customer_phone: string;
  customer_email: string | null; status: Status; route_id: string | null;
  vehicle_id: string; pickup_location: string; dropoff_location: string;
  pickup_datetime: string; created_at: string; passengers_count: number;
  luggage_count: number; final_price_sar: number; payment_status: string;
  payment_method: string; flight_number: string | null;
  special_notes: string | null; driver_name: string | null;
  driver_phone: string | null; vehicle_plate: string | null; driver_id: string | null;
  whatsapp_number: string | null; language: string;
};
type Driver = { id: string; name: string; phone: string; vehicle_plate: string; vehicle_model: string; is_active: boolean };
type Totals = Record<'total' | Status | 'today', number>;

const statusLabels: Record<Status, string> = {
  new: 'حجز جديد', confirmed: 'مؤكد', driver_assigned: 'تم تعيين السائق',
  en_route: 'في الطريق', completed: 'مكتمل', cancelled: 'ملغي',
};
const statuses: Array<Status | 'all'> = ['all', 'new', 'confirmed', 'driver_assigned', 'en_route', 'completed', 'cancelled'];
const statusColors: Record<Status, string> = {
  new: 'bg-amber-50 text-amber-800 border-amber-200',
  confirmed: 'bg-blue-50 text-blue-800 border-blue-200',
  driver_assigned: 'bg-violet-50 text-violet-800 border-violet-200',
  en_route: 'bg-teal-50 text-teal-800 border-teal-200',
  completed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  cancelled: 'bg-rose-50 text-rose-800 border-rose-200',
};
const sar = (n: number | null | undefined) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(Number(n || 0));
const ksaTime = (value: string) => {
  if (!value) return '—';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '—' : new Intl.DateTimeFormat('ar-SA', {
    timeZone: 'Asia/Riyadh', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  }).format(d);
};
const digits = (value: string) => (value || '').replace(/\D/g, '');
const errorMessage = (payload: any, fallback: string) => typeof payload?.error === 'string' ? payload.error : fallback;

function Metric({ title, value, hint, icon }: { title: string; value?: number; hint: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#E3E8ED] bg-white p-4 md:p-5 shadow-[0_5px_24px_rgba(16,35,55,0.04)]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-[#566577]">{title}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4F3] text-[#1E6258]">{icon}</span>
      </div>
      <div className="mt-2 text-3xl font-extrabold tabular-nums text-[#102438]">{value === undefined ? '—' : value.toLocaleString('en-US')}</div>
      <p className="mt-1 text-xs text-[#66778A]">{hint}</p>
    </div>
  );
}

export default function BookingOperationsPage({ mode = 'bookings' }: { mode?: 'overview' | 'bookings' }) {
  const [rows, setRows] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState<Totals | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [status, setStatus] = useState<Status | 'all'>('all');
  const [search, setSearch] = useState('');
  const [term, setTerm] = useState('');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [driverId, setDriverId] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const id = window.setTimeout(() => { setPage(1); setTerm(search.trim()); }, 300);
    return () => window.clearTimeout(id);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ status, limit: '50', offset: String((page - 1) * 50) });
      if (term) params.set('q', term);
      const [bookRes, statsRes, driversRes] = await Promise.all([
        fetch('/api/admin/bookings?' + params, { cache: 'no-store' }),
        fetch('/api/admin/overview', { cache: 'no-store' }),
        fetch('/api/admin/drivers', { cache: 'no-store' }),
      ]);
      const bookJson = await bookRes.json();
      const statsJson = await statsRes.json();
      const driversJson = driversRes.ok ? await driversRes.json() : null;
      if (!bookRes.ok) throw new Error(errorMessage(bookJson, 'تعذر تحميل الحجوزات'));
      if (!statsRes.ok) throw new Error(errorMessage(statsJson, 'تعذر تحميل الإحصائيات'));
      setRows(Array.isArray(bookJson.bookings) ? bookJson.bookings : []);
      setTotal(Number(bookJson.total || 0));
      setStats(statsJson);
      setDrivers(Array.isArray(driversJson?.drivers) ? driversJson.drivers.filter((d: Driver) => d.is_active) : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'تعذر الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  }, [page, status, term]);

  useEffect(() => { void load(); }, [load]);

  const selected = useMemo(() => rows.find(b => b.id === selectedId) || null, [rows, selectedId]);
  useEffect(() => {
    setDriverId(selected?.driver_id || '');
    setNotes(selected?.special_notes || '');
  }, [selected?.id, selected?.driver_id, selected?.special_notes]);

  const applyUpdate = async (body: Record<string, unknown>, success: string, url = '/api/admin/bookings', method = 'PATCH') => {
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const response = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedId, ...body }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(errorMessage(json, 'تعذّر حفظ التعديلات'));
      setNotice(success);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'تعذّر حفظ التعديلات');
    } finally {
      setSaving(false);
    }
  };

  const nextActions: Record<Status, Array<{ label: string; to: Status; danger?: boolean }>> = {
    new: [{ label: 'تأكيد الحجز', to: 'confirmed' }, { label: 'إلغاء الحجز', to: 'cancelled', danger: true }],
    confirmed: [{ label: 'إلغاء الحجز', to: 'cancelled', danger: true }],
    driver_assigned: [{ label: 'السائق في الطريق', to: 'en_route' }, { label: 'إلغاء الحجز', to: 'cancelled', danger: true }],
    en_route: [{ label: 'اكتمال الرحلة', to: 'completed' }],
    completed: [], cancelled: [],
  };
  const allPages = Math.max(1, Math.ceil(total / 50));

  return (
    <section dir="rtl" className="min-h-[80vh] rounded-[26px] bg-[#F5F7F8] p-3 text-[#13273A] shadow-[0_12px_50px_rgba(0,0,0,0.1)] sm:p-5 md:p-8">
      <div className="mb-7 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-xs font-bold tracking-[0.1em] text-[#23776B]">DUYUF AL RAHMAN VIP · OPERATIONS</p>
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{mode === 'overview' ? 'مركز قيادة الحجوزات' : 'إدارة الحجوزات والرحلات'}</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#66778A]">البيانات مرتبطة بقاعدة Supabase الحقيقية. لا توجد حجوزات أو مؤشرات تجريبية.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {mode === 'overview' && <Link href="/admin/bookings" className="inline-flex items-center gap-2 rounded-xl bg-[#143E53] px-4 py-3 text-sm font-bold text-white hover:bg-[#1C536C]">فتح الحجوزات <ArrowUpLeft className="h-4 w-4"/></Link>}
          <button type="button" onClick={() => void load()} disabled={loading || saving} className="inline-flex items-center gap-2 rounded-xl border border-[#DCE3E7] bg-white px-4 py-3 text-sm font-bold text-[#1A3548] disabled:opacity-50"><RefreshCw className={'h-4 w-4 ' + (loading ? 'animate-spin' : '')}/> تحديث البيانات</button>
        </div>
      </div>

      <div className="mb-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Metric title="كل الحجوزات" value={stats?.total} hint="إجمالي مسجل في النظام" icon={<ClipboardList className="h-5 w-5"/>}/>
        <Metric title="تحتاج تأكيد" value={stats?.new} hint="طلبات جديدة" icon={<Clock3 className="h-5 w-5"/>}/>
        <Metric title="رحلات نشطة" value={stats ? stats.driver_assigned + stats.en_route : undefined} hint="مع سائق أو في الطريق" icon={<Activity className="h-5 w-5"/>}/>
        <Metric title="رحلات اليوم" value={stats?.today} hint="حسب توقيت السعودية" icon={<CalendarDays className="h-5 w-5"/>}/>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <Link href="/admin/drivers" className="rounded-xl border border-[#DFE6EA] bg-white px-4 py-2.5 text-xs font-bold text-[#244155] hover:border-[#23776B]">السائقون</Link>
        <Link href="/admin/fleet" className="rounded-xl border border-[#DFE6EA] bg-white px-4 py-2.5 text-xs font-bold text-[#244155] hover:border-[#23776B]">إدارة السيارات</Link>
        <Link href="/admin/routes" className="rounded-xl border border-[#DFE6EA] bg-white px-4 py-2.5 text-xs font-bold text-[#244155] hover:border-[#23776B]">المسارات</Link>
        <Link href="/admin/pricing" className="rounded-xl border border-[#DFE6EA] bg-white px-4 py-2.5 text-xs font-bold text-[#244155] hover:border-[#23776B]">الأسعار</Link>
        <span className="mr-auto rounded-xl bg-[#EAF3EF] px-4 py-2.5 text-xs font-semibold text-[#226A57]"><ShieldCheck className="ml-1 inline h-4 w-4"/>الدفع نقدًا للسائق بعد الوصول</span>
      </div>

      {error && <div role="alert" className="mb-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800"><AlertCircle className="h-5 w-5 shrink-0"/>{error}</div>}
      {notice && <div role="status" className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800"><CheckCircle2 className="h-4 w-4"/>{notice}</div>}

      <div className="overflow-hidden rounded-[22px] border border-[#E3E8ED] bg-white shadow-[0_10px_28px_rgba(18,44,57,0.04)]">
        <div className="border-b border-[#E8ECEF] p-4 sm:p-5">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-extrabold">سجل الحجوزات</h2>
              <p className="mt-1 text-xs text-[#63778B]">{total.toLocaleString('en-US')} نتيجة مطابقة للفلاتر الحالية</p>
            </div>
            <label className="relative block w-full md:max-w-sm">
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8393A4]"/>
              <input aria-label="ابحث في الحجوزات" value={search} onChange={e => setSearch(e.target.value)} placeholder="رقم الحجز، اسم العميل، الهاتف..." className="h-11 w-full rounded-xl border border-[#DDE4E9] bg-[#F8FAFB] pr-10 pl-3 text-sm outline-none focus:border-[#278575]"/>
            </label>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {statuses.map(s => <button key={s} type="button" onClick={() => { setStatus(s); setPage(1); setSelectedId(null); }} className={'whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ' + (status === s ? 'bg-[#163D4D] text-white' : 'bg-[#F2F5F7] text-[#536779] hover:bg-[#E8EFED]')}>{s === 'all' ? 'الكل' : statusLabels[s]}{stats && s !== 'all' ? ' · ' + stats[s] : ''}</button>)}
          </div>
        </div>

        {loading && rows.length === 0 ? (
          <div className="flex min-h-[240px] items-center justify-center gap-3 text-sm text-[#657486]"><Loader2 className="h-5 w-5 animate-spin"/>جارٍ تحميل الحجوزات...</div>
        ) : !loading && rows.length === 0 && !error ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center p-8 text-center">
            <ClipboardList className="h-11 w-11 text-[#A4BBC3]"/>
            <h3 className="mt-4 text-lg font-extrabold">لا توجد حجوزات مطابقة</h3>
            <p className="mt-2 text-sm text-[#7A8996]">عند تسجيل طلب فعلي في الموقع سيظهر هنا تلقائيًا. جرّب إزالة الفلاتر أو تحديث البيانات.</p>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[900px] text-right text-sm">
                <thead className="bg-[#F7F9FA] text-xs font-bold text-[#697B8B]">
                  <tr><th className="px-5 py-4">الحجز / العميل</th><th className="px-5 py-4">المسار</th><th className="px-5 py-4">موعد الاستلام</th><th className="px-5 py-4">السيارة</th><th className="px-5 py-4">السعر</th><th className="px-5 py-4">الحالة</th><th className="px-5 py-4">التفاصيل</th></tr>
                </thead>
                <tbody className="divide-y divide-[#EDF0F2]">
                  {rows.map(b => <tr key={b.id} className="hover:bg-[#FAFCFC]">
                    <td className="px-5 py-4"><div className="font-extrabold text-[#183D4F]" dir="ltr">{b.reference}</div><div className="mt-1 text-xs text-[#687989]">{b.customer_name}</div></td>
                    <td className="max-w-[230px] px-5 py-4"><div className="font-semibold">{b.pickup_location}</div><div className="mt-1 flex items-center gap-1 text-xs text-[#778797]"><MapPin className="h-3 w-3"/>{b.dropoff_location}</div></td>
                    <td className="px-5 py-4 text-xs font-semibold">{ksaTime(b.pickup_datetime)}</td>
                    <td className="px-5 py-4 text-xs">{b.vehicle_id || '—'}</td>
                    <td className="px-5 py-4 font-bold tabular-nums">{sar(b.final_price_sar)} <span className="text-[10px] font-normal">ر.س</span></td>
                    <td className="px-5 py-4"><span className={'inline-flex rounded-lg border px-2.5 py-1 text-xs font-bold ' + statusColors[b.status]}>{statusLabels[b.status]}</span></td>
                    <td className="px-5 py-4"><button onClick={() => setSelectedId(b.id)} className="rounded-lg bg-[#EAF3F1] px-3 py-2 text-xs font-bold text-[#1E6D5F] hover:bg-[#D5E9E4]">عرض وإدارة</button></td>
                  </tr>)}
                </tbody>
              </table>
            </div>
            <div className="divide-y divide-[#E9EEF0] md:hidden">
              {rows.map(b => <button type="button" onClick={() => setSelectedId(b.id)} key={b.id} className="block w-full p-4 text-right hover:bg-[#F8FAFB]">
                <div className="flex items-center justify-between gap-3"><strong dir="ltr" className="text-sm">{b.reference}</strong><span className={'rounded-lg border px-2 py-1 text-[11px] font-bold ' + statusColors[b.status]}>{statusLabels[b.status]}</span></div>
                <p className="mt-2 text-sm font-bold">{b.customer_name}</p>
                <p className="mt-1 text-xs text-[#66798B]">{b.pickup_location} ← {b.dropoff_location}</p>
                <div className="mt-3 flex justify-between text-xs text-[#536B7A]"><span>{ksaTime(b.pickup_datetime)}</span><strong>{sar(b.final_price_sar)} ر.س</strong></div>
              </button>)}
            </div>
            <div className="flex items-center justify-between border-t border-[#E7EDF0] p-4">
              <span className="text-xs text-[#687C8D]">صفحة {page} من {allPages} · {total} حجز</span>
              <div className="flex gap-2">
                <button aria-label="الصفحة السابقة" disabled={page <= 1 || loading} onClick={() => setPage(p => p - 1)} className="rounded-lg border p-2 disabled:opacity-30"><ChevronRight className="h-4 w-4"/></button>
                <button aria-label="الصفحة التالية" disabled={page >= allPages || loading} onClick={() => setPage(p => p + 1)} className="rounded-lg border p-2 disabled:opacity-30"><ChevronLeft className="h-4 w-4"/></button>
              </div>
            </div>
          </>
        )}
      </div>
      <p className="mt-4 text-xs text-[#7A8893]">ملاحظة: تأكيد التحصيل المالي منفصل عن اكتمال الرحلة. لا توجد مدفوعات إلكترونية أو مقدمات حجز.</p>

      {selected && <div className="fixed inset-0 z-[90] flex justify-end bg-[#10243B]/55 backdrop-blur-[2px]" onClick={() => setSelectedId(null)}>
        <aside role="dialog" aria-modal="true" aria-label="تفاصيل الحجز" onClick={e => e.stopPropagation()} className="flex h-full w-full max-w-2xl flex-col overflow-y-auto bg-[#F8FAFB] p-4 text-[#172A3D] shadow-2xl sm:p-6" dir="rtl">
          <div className="flex items-start justify-between border-b border-[#DEE6E9] pb-5">
            <div><p className="mb-1 text-xs font-bold text-[#26806F]">ملف حجز</p><h2 dir="ltr" className="text-xl font-extrabold">{selected.reference}</h2><p className="mt-1 text-sm text-[#718192]">{ksaTime(selected.created_at)}</p></div>
            <button type="button" aria-label="إغلاق التفاصيل" onClick={() => setSelectedId(null)} className="rounded-xl border border-[#DAE3E6] bg-white p-2.5"><X className="h-5 w-5"/></button>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white p-4"><span className="text-xs text-[#687B8A]">الحالة الحالية</span><p className="mt-1 font-extrabold">{statusLabels[selected.status]}</p></div>
            <div className="rounded-xl bg-white p-4"><span className="text-xs text-[#687B8A]">السعر الثابت</span><p className="mt-1 font-extrabold">{sar(selected.final_price_sar)} ر.س</p></div>
          </div>
          <div className="mt-4 space-y-3 rounded-xl border border-[#E1E9ED] bg-white p-4">
            <h3 className="font-extrabold">تفاصيل الرحلة</h3>
            <p className="text-sm"><MapPin className="ml-2 inline h-4 w-4 text-[#23816E]"/>من: {selected.pickup_location}</p>
            <p className="text-sm"><MapPin className="ml-2 inline h-4 w-4 text-[#23816E]"/>إلى: {selected.dropoff_location}</p>
            <p className="text-sm"><CalendarDays className="ml-2 inline h-4 w-4 text-[#23816E]"/>الموعد: {ksaTime(selected.pickup_datetime)}</p>
            <p className="text-sm"><CarFront className="ml-2 inline h-4 w-4 text-[#23816E]"/>السيارة: {selected.vehicle_id} · الركاب: {selected.passengers_count} · الحقائب: {selected.luggage_count}</p>
            {selected.flight_number && <p className="text-sm">رقم الرحلة الجوية: <span dir="ltr">{selected.flight_number}</span></p>}
          </div>
          <div className="mt-4 space-y-3 rounded-xl border border-[#E1E9ED] bg-white p-4">
            <h3 className="font-extrabold">بيانات العميل</h3>
            <p className="text-sm">{selected.customer_name}</p>
            <a className="flex items-center gap-2 text-sm text-[#247365]" href={'https://wa.me/' + digits(selected.customer_phone)} target="_blank" rel="noopener noreferrer"><Phone className="h-4 w-4"/><span dir="ltr">{selected.customer_phone}</span> · فتح واتساب</a>
            {selected.customer_email && <a className="flex items-center gap-2 text-sm text-[#247365]" href={'mailto:' + selected.customer_email}><Mail className="h-4 w-4"/>{selected.customer_email}</a>}
          </div>
          <div className="mt-4 space-y-3 rounded-xl border border-[#E1E9ED] bg-white p-4">
            <h3 className="font-extrabold">السائق والتشغيل</h3>
            <p className="text-sm text-[#647889]">{selected.driver_name ? selected.driver_name + ' · ' + (selected.vehicle_plate || '') : 'لم يتم تعيين سائق بعد'}</p>
            {selected.status === 'confirmed' && <div className="flex flex-col gap-2 sm:flex-row">
              <select aria-label="اختر السائق" value={driverId} onChange={e => setDriverId(e.target.value)} className="min-w-0 flex-1 rounded-lg border border-[#D7E2E5] bg-white px-3 py-3 text-sm"><option value="">اختر سائقًا متاحًا...</option>{drivers.map(d => <option key={d.id} value={d.id}>{d.name} · {d.vehicle_model} · {d.vehicle_plate}</option>)}</select>
              <button disabled={!driverId || saving} onClick={() => void applyUpdate({ driver_id: driverId }, 'تم تعيين السائق بنجاح', '/api/admin/bookings/assign', 'POST')} className="rounded-lg bg-[#1B655A] px-4 py-3 text-sm font-bold text-white disabled:opacity-40">إسناد الرحلة</button>
            </div>}
            {selected.status === 'confirmed' && drivers.length === 0 && <p className="text-xs text-amber-700">لا يوجد سائق نشط متاح في دليل السائقين، أو أن صلاحية عرضه محدودة.</p>}
          </div>
          <div className="mt-4 space-y-3 rounded-xl border border-[#E1E9ED] bg-white p-4">
            <h3 className="font-extrabold">ملاحظات التشغيل</h3>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} maxLength={2000} rows={3} className="w-full rounded-xl border border-[#D9E3E8] bg-[#FBFCFD] p-3 text-sm outline-none focus:border-[#278575]" placeholder="ملاحظات الطلب..."/>
            <button type="button" disabled={saving || notes === (selected.special_notes || '')} onClick={() => void applyUpdate({ special_notes: notes }, 'تم حفظ الملاحظات')} className="rounded-lg border border-[#B5CDC7] px-4 py-2 text-xs font-bold text-[#1B6659] disabled:opacity-40">حفظ الملاحظات</button>
          </div>
          <div className="mt-4 space-y-3 rounded-xl border border-[#E1E9ED] bg-white p-4">
            <h3 className="font-extrabold">تحديث حالة الرحلة</h3>
            {nextActions[selected.status].length ? <div className="flex flex-wrap gap-2">{nextActions[selected.status].map(action => <button type="button" disabled={saving} key={action.to} onClick={() => {
              if (action.danger && !window.confirm('هل أنت متأكد من إلغاء هذا الحجز؟')) return;
              void applyUpdate({ status: action.to }, 'تم تحديث حالة الحجز');
            }} className={'rounded-lg px-4 py-2.5 text-xs font-bold disabled:opacity-40 ' + (action.danger ? 'bg-rose-50 text-rose-800' : 'bg-[#153E53] text-white')}>{action.label}</button>)}</div> : <p className="text-xs text-[#7D8A96]">لا توجد إجراءات انتقال متاحة لهذه الحالة.</p>}
            {selected.status === 'completed' && <p className="rounded-lg bg-[#F2F6F7] p-3 text-xs text-[#5E7180]">حالة التحصيل: {selected.payment_status === 'paid' ? 'مسجّل كمحصّل' : 'لم يتم تسجيل تحصيل مؤكد'} · الدفع نقدًا للسائق بعد الوصول.</p>}
          </div>
          {saving && <div className="mt-3 flex items-center gap-2 text-xs text-[#44687B]"><Loader2 className="h-4 w-4 animate-spin"/>جارٍ حفظ التغييرات...</div>}
          <div className="mt-auto pt-6"><button type="button" onClick={() => setSelectedId(null)} className="w-full rounded-xl border border-[#D4DEE3] bg-white py-3 text-sm font-semibold">إغلاق</button></div>
        </aside>
      </div>}
    </section>
  );
}
