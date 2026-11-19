'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Banknote, CheckCircle2, ChevronLeft, ChevronRight, Loader2, RefreshCw, ShieldCheck, AlertCircle } from 'lucide-react';

type CashRow = {
  id: string; reference: string; customer_name: string; pickup_datetime: string;
  final_price_sar: number; final_price_currency: number; currency_charged: string;
  payment_status: string; payment_method: string;
};
const fmt = (n: number) => Number(n || 0).toLocaleString('en-US', { maximumFractionDigits: 2 });
const day = (s: string) => {
  const d = new Date(s);
  return isNaN(d.getTime()) ? '—' : new Intl.DateTimeFormat('ar-SA', { timeZone: 'Asia/Riyadh', dateStyle: 'medium' }).format(d);
};

export default function CashCollectionsPanel() {
  const [rows, setRows] = useState<CashRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState('');
  const [confirmId, setConfirmId] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/collections?offset=' + String((page - 1) * 20) + '&limit=20', { cache: 'no-store' });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'تعذر تحميل تحصيل الرحلات');
      setRows(Array.isArray(result.bookings) ? result.bookings : []);
      setTotal(Number(result.total) || 0);
    } catch (e) { setError(e instanceof Error ? e.message : 'تعذر الاتصال بالخادم'); }
    finally { setLoading(false); }
  }, [page]);
  useEffect(() => { void load(); }, [load]);

  const record = async (row: CashRow) => {
    if (!accepted || confirmId !== row.id) return;
    setBusyId(row.id);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/admin/collections', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_id: row.id, received_cash: true, currency: row.currency_charged }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'تعذر تسجيل التحصيل');
      setSuccess('تم تسجيل استلام النقد في الحجز وسجل التدقيق.');
      setConfirmId(''); setAccepted(false);
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : 'تعذر تسجيل التحصيل'); }
    finally { setBusyId(''); }
  };

  return <section dir="rtl" className="min-h-[75vh] rounded-[26px] bg-[#F6F8F9] p-4 text-[#173145] sm:p-6 md:p-8">
    <header className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="mb-2 text-xs font-bold text-[#287C6B]">DUYUF VIP · FINANCE CONTROL</p>
        <h1 className="text-2xl font-black sm:text-3xl">التحصيل النقدي بعد الرحلة</h1>
        <p className="mt-2 text-sm text-[#607487]">إثبات التحصيل اليدوي فقط، بالريال أو الدولار وفق عملة الحجز. بدون عربون أو بطاقات أو بوابات دفع.</p>
      </div>
      <div className="flex gap-2">
        <Link href="/admin/bookings" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#1B4656]"><ArrowRight className="h-4 w-4"/>الحجوزات</Link>
        <button onClick={() => void load()} disabled={loading} className="rounded-xl border border-[#D9E3E8] bg-white px-4 py-3 text-sm font-bold"><RefreshCw className={'inline h-4 w-4 ' + (loading ? 'animate-spin' : '')}/> تحديث</button>
      </div>
    </header>
    <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[#D5E6E0] bg-[#EAF5F1] p-4 text-sm text-[#20574D]"><ShieldCheck className="h-6 w-6 shrink-0"/>تأكيد التحصيل إقرار من الموظف بأن المبلغ وصل نقدًا بعد الرحلة؛ لا يتم تحصيل أي مبلغ آليًا.</div>
    {error && <div role="alert" className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-800"><AlertCircle className="h-4 w-4"/>{error}</div>}
    {success && <div role="status" className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"><CheckCircle2 className="h-4 w-4"/>{success}</div>}
    <div className="overflow-hidden rounded-2xl border border-[#E1E8EC] bg-white">
      <div className="flex items-center justify-between border-b border-[#E1E8EC] p-5">
        <h2 className="text-lg font-black">سجل الرحلات المكتملة</h2><span className="text-xs text-[#728697]">{total} رحلة</span>
      </div>
      {loading && !rows.length ? <div className="flex min-h-[200px] items-center justify-center gap-2 text-sm text-[#697D8B]"><Loader2 className="h-5 w-5 animate-spin"/>تحميل...</div>
        : !rows.length ? <div className="p-16 text-center text-sm text-[#6A7A8B]"><Banknote className="mx-auto mb-3 h-10 w-10 text-[#A7C7BF]"/>لا توجد رحلات مكتملة لعرض التحصيل عنها.</div>
        : <div className="divide-y divide-[#E6ECEF]">{rows.map(row => <div key={row.id} className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
          <div><p className="font-bold" dir="ltr">{row.reference}</p><p className="mt-1 text-sm">{row.customer_name}</p><p className="mt-1 text-xs text-[#738396]">{day(row.pickup_datetime)}</p></div>
          <div className="flex flex-col gap-1"><span className="text-xs text-[#718294]">قيمة الحجز</span><strong className="text-lg" dir="ltr">{fmt(row.currency_charged === 'USD' ? row.final_price_currency : row.final_price_sar)} {row.currency_charged === 'USD' ? 'USD' : 'SAR'}</strong></div>
          <div>
            {row.payment_status === 'paid' ? <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700"><CheckCircle2 className="h-4 w-4"/>مسجّل كمحصّل</span>
              : row.payment_method !== 'pay_upon_arrival' ? <span className="text-xs text-amber-800">طريقة دفع غير متوافقة مع سياسة النقد؛ تحتاج مراجعة</span>
              : confirmId !== row.id ? <button onClick={() => { setConfirmId(row.id); setAccepted(false); }} className="rounded-lg bg-[#163E51] px-4 py-3 text-xs font-bold text-white">تأكيد استلام نقدي</button>
              : <div className="space-y-2 rounded-xl border border-[#DAE6E4] bg-[#F6FAF8] p-3">
                <label className="flex max-w-xs items-start gap-2 text-xs text-[#324D4A]"><input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)}/> أُقر باستلام مبلغ الرحلة نقدًا بعد الوصول وبعملة الحجز.</label>
                <div className="flex gap-2"><button disabled={!accepted || busyId === row.id} onClick={() => void record(row)} className="rounded-lg bg-[#186B59] px-3 py-2 text-xs font-bold text-white disabled:opacity-40">حفظ الإقرار</button><button onClick={() => setConfirmId('')} className="rounded-lg border px-3 py-2 text-xs">إلغاء</button></div>
              </div>}
          </div>
        </div>)}</div>}
      <div className="flex items-center justify-between border-t border-[#E5ECEF] p-4 text-xs text-[#677B8B]"><span>صفحة {page} من {Math.max(1, Math.ceil(total / 20))}</span><div className="flex gap-2"><button aria-label="السابق" disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="rounded-lg border p-2 disabled:opacity-30"><ChevronRight className="h-4 w-4"/></button><button aria-label="التالي" disabled={page * 20 >= total} onClick={() => setPage(p => p + 1)} className="rounded-lg border p-2 disabled:opacity-30"><ChevronLeft className="h-4 w-4"/></button></div></div>
    </div>
  </section>;
}
