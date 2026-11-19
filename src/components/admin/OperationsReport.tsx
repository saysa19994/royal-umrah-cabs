'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity, AlertCircle, ArrowUpLeft, Banknote, CalendarDays,
  CheckCircle2, ClipboardList, RefreshCw, TrendingUp, Users,
} from 'lucide-react';

type Daily = { day: string; bookings: number; inquiries: number };
type Report = {
  days: number; bookingCount: number; leadCount: number;
  completedValueSAR: number; recordedCashSAR: number; awaitingCashSAR: number;
  incomplete: boolean; byStatus: Record<string, number>; byLeadStatus: Record<string, number>;
  daily: Daily[]; topRoutes: { route: string; count: number }[];
};
const money = (n: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n);
const labels: Record<string, string> = {
  new: 'جديد', confirmed: 'مؤكد', driver_assigned: 'سائق معيّن',
  en_route: 'في الطريق', completed: 'مكتمل', cancelled: 'ملغي',
  replied: 'تم الرد', lost: 'لم يكتمل', custom: 'مسار خاص',
};
function ValueCard({ label, value, unit, icon, note }: {
  label: string; value: number | undefined; unit?: string;
  icon: React.ReactNode; note: string;
}) {
  return <div className="rounded-2xl border border-[#DCE6E8] bg-white p-4 shadow-[0_8px_25px_rgba(17,46,54,0.04)]">
    <div className="flex items-center justify-between"><span className="text-sm font-bold text-[#667A87]">{label}</span><span className="rounded-xl bg-[#EFF5F2] p-2.5 text-[#267665]">{icon}</span></div>
    <p className="mt-3 text-2xl font-black text-[#15364A]"><span dir="ltr">{value === undefined ? '—' : money(value)}</span> <span className="text-xs font-medium">{unit}</span></p>
    <p className="mt-1 text-xs text-[#758A95]">{note}</p>
  </div>;
}
export default function OperationsReport() {
  const [days, setDays] = useState<7 | 30 | 90>(30);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const r = await fetch('/api/admin/reports/operations?days=' + days, { cache: 'no-store' });
      const v = await r.json();
      if (!r.ok) throw new Error(v.error || 'تعذر عرض التقارير');
      setReport(v);
    } catch (e) { setReport(null); setError(e instanceof Error ? e.message : 'حدث خطأ'); }
    finally { setLoading(false); }
  }, [days]);
  useEffect(() => { void load(); }, [load]);

  const chart = useMemo(() => {
    const entries = report?.daily || [];
    const top = Math.max(1, ...entries.map(d => Math.max(d.bookings, d.inquiries)));
    return entries.map(d => ({ ...d, bookingHeight: Math.max(0, d.bookings / top * 100), inquiryHeight: Math.max(0, d.inquiries / top * 100) }));
  }, [report]);
  const statuses = Object.entries(report?.byStatus || {});
  return <section dir="rtl" className="min-h-[80vh] rounded-[24px] bg-[#F4F7F8] p-3 text-[#163248] sm:p-6 md:p-8">
    <header className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        <p className="mb-2 text-xs font-bold text-[#217365]">DUYUF VIP · OPERATIONS ANALYTICS</p>
        <h1 className="text-2xl font-black sm:text-3xl">تقارير الحجوزات والتشغيل</h1>
        <p className="mt-2 text-sm text-[#6B7D8C]">مؤشرات من قاعدة البيانات، مع فصل الرحلات المكتملة عن النقد المحصل فعلًا.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex rounded-xl border border-[#D5E1E5] bg-white p-1">
          {([7,30,90] as const).map(n => <button key={n} onClick={() => setDays(n)} className={'rounded-lg px-3 py-2 text-xs font-bold ' + (days === n ? 'bg-[#1B4D5F] text-white' : 'text-[#6B7B88]')}>{n} يوم</button>)}
        </div>
        <button type="button" onClick={() => void load()} disabled={loading} className="flex items-center gap-2 rounded-xl border border-[#D5E1E5] bg-white px-4 py-3 text-xs font-bold"><RefreshCw className={'h-4 w-4 ' + (loading ? 'animate-spin' : '')}/> تحديث</button>
      </div>
    </header>
    {error && <div role="alert" className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 p-4 text-sm text-rose-700"><AlertCircle className="h-5 w-5"/>{error}</div>}
    {report?.incomplete && <div className="mb-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">حجم السجلات أكبر من الحد المعروض؛ إجمالي الأعداد دقيق لكن مبالغ وتوزيعات الرسم جزئية. يلزم تحسين التجميع على مستوى قاعدة البيانات.</div>}
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
      <ValueCard label="الحجوزات" value={report?.bookingCount} icon={<ClipboardList className="h-5 w-5"/>} note="طلبات مسجلة في الفترة"/>
      <ValueCard label="الاستفسارات" value={report?.leadCount} icon={<Users className="h-5 w-5"/>} note="عملاء تواصلوا فعليًا"/>
      <ValueCard label="قيمة المكتمل" value={report?.completedValueSAR} unit="ر.س" icon={<CheckCircle2 className="h-5 w-5"/>} note="إجمالي قيمة الرحلات المكتملة"/>
      <ValueCard label="التحصيل المسجّل" value={report?.recordedCashSAR} unit="ر.س" icon={<Banknote className="h-5 w-5"/>} note="موسوم كمدفوع نقدًا"/>
      <ValueCard label="بانتظار التحصيل" value={report?.awaitingCashSAR} unit="ر.س" icon={<Activity className="h-5 w-5"/>} note="مكتمل لكن لم يسجّل دفعه"/>
    </div>
    <div className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
      <section className="rounded-2xl border border-[#E0E8EA] bg-white p-4 sm:p-6">
        <div className="flex items-center justify-between"><h2 className="font-black">اتجاه الاستفسارات والحجوزات</h2><CalendarDays className="h-5 w-5 text-[#5D887C]"/></div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#718494]"><span><span className="ml-1 inline-block h-2 w-2 rounded-full bg-[#276B67]"/>الحجوزات</span><span><span className="ml-1 inline-block h-2 w-2 rounded-full bg-[#9CB6D5]"/>الاستفسارات</span></div>
        {!report?.daily.length ? <p className="mt-10 p-8 text-center text-sm text-[#8C9BA7]">لا توجد أحداث لهذه الفترة.</p> :
        <div className="mt-6 flex h-52 items-end gap-1 overflow-x-auto border-b border-[#D4E0E5] pb-2" aria-label="رسم بياني للحجوزات والاستفسارات اليومية">
          {chart.map(d => <div key={d.day} className="flex h-full min-w-5 flex-1 items-end gap-[2px]" title={d.day + ': ' + d.bookings + ' حجز، ' + d.inquiries + ' استفسار'}>
            <div className="min-w-[4px] flex-1 rounded-t-sm bg-[#276B67]" style={{ height: Math.max(d.bookings ? 5 : 0, d.bookingHeight) + '%' }}/>
            <div className="min-w-[4px] flex-1 rounded-t-sm bg-[#9CB6D5]" style={{ height: Math.max(d.inquiries ? 5 : 0, d.inquiryHeight) + '%' }}/>
          </div>)}
        </div>}
        <p className="mt-3 text-xs text-[#7B8B99]">التجميع حسب تاريخ إنشاء الطلب بتوقيت السعودية، وليس تاريخ تنفيذ الرحلة.</p>
      </section>
      <section className="rounded-2xl border border-[#E0E8EA] bg-white p-4 sm:p-6">
        <h2 className="font-black">حالات الحجوزات</h2>
        <div className="mt-5 space-y-4">
          {statuses.length ? statuses.map(([key,count]) => <div key={key}>
            <div className="mb-1 flex items-center justify-between text-sm"><span className="font-semibold">{labels[key] || key}</span><strong>{count}</strong></div>
            <div className="h-2 overflow-hidden rounded-full bg-[#EFF2F4]"><div className="h-full rounded-full bg-[#2E786F]" style={{ width: (count / Math.max(1, report?.bookingCount || 1) * 100) + '%' }}/></div>
          </div>) : <p className="text-sm text-[#8295A0]">لا توجد حجوزات خلال الفترة.</p>}
        </div>
      </section>
    </div>
    <section className="mt-4 rounded-2xl border border-[#E0E8EA] bg-white p-4 sm:p-6">
      <h2 className="font-black">المسارات الأكثر طلبًا</h2>
      {report?.topRoutes.length ? <div className="mt-4 divide-y divide-[#E8EEF0]">
        {report.topRoutes.map((row,i) => <div key={row.route} className="flex items-center justify-between gap-3 py-3 text-sm">
          <span className="truncate"><span className="ml-2 text-[#7C909B]">{i+1}.</span>{labels[row.route] || row.route.replace(/-/g,' ')}</span>
          <strong>{row.count} حجوزات</strong>
        </div>)}
      </div> : <p className="mt-4 text-sm text-[#8295A0]">لا يوجد تصنيف مسارات لعرضه حاليًا.</p>}
    </section>
    <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#6D8291]">
      <p>تقرير داخلي. لا توجد معلومات عملاء شخصية أو أرقام مالية مُختلقة.</p>
      <Link href="/admin/bookings" className="inline-flex items-center gap-1 font-bold text-[#217165]">فتح جميع الحجوزات <ArrowUpLeft className="h-4 w-4"/></Link>
    </div>
  </section>;
}
