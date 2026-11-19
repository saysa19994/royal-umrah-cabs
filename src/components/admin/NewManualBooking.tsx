'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle, CalendarDays, CheckCircle2, Loader2, ShieldCheck, X,
} from 'lucide-react';

type Route = { id: string; origin_city: string; destination_city: string };
type Vehicle = { id: string; name: string; seats: number; bags: number };
type BasePrice = { route_id: string; vehicle_id: string; price_sar: number };
type Catalog = { routes: Route[]; vehicles: Vehicle[]; basePrices: BasePrice[] };
type FormData = {
  route_id: string; vehicle_id: string; customer_name: string; customer_phone: string;
  customer_email: string; pickup_local: string; pickup_location: string; dropoff_location: string;
  passengers_count: number; luggage_count: number; flight_number: string; special_notes: string;
};
const blank: FormData = {
  route_id: '', vehicle_id: '', customer_name: '', customer_phone: '', customer_email: '',
  pickup_local: '', pickup_location: '', dropoff_location: '',
  passengers_count: 1, luggage_count: 0, flight_number: '', special_notes: '',
};
export default function NewManualBooking({
  onClose, onCreated,
}: { onClose: () => void; onCreated: (reference: string) => void }) {
  const [form, setForm] = useState<FormData>(blank);
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState('');

  useEffect(() => {
    let live = true;
    fetch('/api/admin/bookings/catalog', { cache: 'no-store' })
      .then(async response => { const json = await response.json(); if (!response.ok) throw new Error(json.error || 'تعذر تحميل المسارات'); return json; })
      .then(result => { if (live) setCatalog(result as Catalog); })
      .catch(e => { if (live) setError(e instanceof Error ? e.message : 'تعذر تحميل بيانات الحجز'); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, []);

  const selectedVehicle = useMemo(() => catalog?.vehicles.find(v => v.id === form.vehicle_id), [catalog, form.vehicle_id]);
  const basePrice = useMemo(() => catalog?.basePrices.find(p => p.route_id === form.route_id && p.vehicle_id === form.vehicle_id)?.price_sar,
    [catalog, form.route_id, form.vehicle_id]);
  function setField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm(previous => ({ ...previous, [field]: value }));
  }
  function chooseRoute(id: string) {
    const route = catalog?.routes.find(r => r.id === id);
    setForm(previous => ({
      ...previous, route_id: id, pickup_location: route?.origin_city || '',
      dropoff_location: route?.destination_city || '',
    }));
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(''); setDone('');
    try {
      const res = await fetch('/api/admin/bookings/create', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.code === 'PREVIEW_READ_ONLY') {
          throw new Error('المعاينة للقراءة فقط لحماية بيانات الموقع. يمكن اختبار إنشاء الحجوزات بعد إعداد قاعدة بيانات تجريبية منفصلة.');
        }
        throw new Error(json.error || 'تعذر حفظ الحجز');
      }
      const reference = String(json.booking?.reference || '');
      setDone('تم تسجيل طلب الحجز: ' + reference);
      onCreated(reference);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'حدث خطأ في حفظ الحجز');
    } finally { setSaving(false); }
  }

  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A2339]/65 p-2 backdrop-blur-[2px] sm:p-5"
    onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section dir="rtl" role="dialog" aria-modal="true" aria-label="إضافة حجز يدوي"
      className="max-h-[96vh] w-full max-w-3xl overflow-y-auto rounded-[22px] bg-[#F9FBFC] p-4 text-[#142F43] shadow-2xl sm:p-6">
      <div className="flex items-start justify-between gap-3 border-b border-[#DCE6EA] pb-4">
        <div>
          <p className="text-xs font-bold text-[#238273]">DUYUF VIP · MANUAL RESERVATION</p>
          <h2 className="mt-2 text-xl font-black sm:text-2xl">حجز جديد من الهاتف أو الواتساب</h2>
          <p className="mt-1 text-xs text-[#667A88]">طلب حجز بانتظار التأكيد — السعر النهائي يُحسب في السيرفر، والدفع نقدًا للسائق بعد الوصول.</p>
        </div>
        <button type="button" onClick={onClose} aria-label="إغلاق إنشاء الحجز" className="rounded-xl border border-[#DEE7EB] bg-white p-2.5"><X className="h-5 w-5"/></button>
      </div>
      {error && <div role="alert" className="mt-4 flex gap-2 rounded-xl bg-rose-50 p-3 text-sm text-rose-800"><AlertCircle className="h-5 w-5 shrink-0"/>{error}</div>}
      {done && <div role="status" className="mt-4 flex gap-2 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800"><CheckCircle2 className="h-5 w-5 shrink-0"/>{done}</div>}
      {loading ? <p className="p-10 text-center text-sm text-[#708696]">جارٍ تحميل بيانات المسارات والسيارات...</p> :
        <form onSubmit={submit} className="mt-6 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-bold text-[#486173]">اسم العميل *
              <input required minLength={2} maxLength={120} value={form.customer_name} onChange={e => setField('customer_name', e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#D6E1E7] bg-white px-3 text-sm outline-none focus:border-[#258676]" placeholder="اسم العميل"/></label>
            <label className="block text-xs font-bold text-[#486173]">رقم الهاتف / واتساب *
              <input required dir="ltr" maxLength={25} value={form.customer_phone} onChange={e => setField('customer_phone', e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#D6E1E7] bg-white px-3 text-sm outline-none focus:border-[#258676]" placeholder="+9665xxxxxxxx"/></label>
            <label className="block text-xs font-bold text-[#486173]">البريد الإلكتروني (اختياري)
              <input type="email" dir="ltr" maxLength={200} value={form.customer_email} onChange={e => setField('customer_email', e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#D6E1E7] bg-white px-3 text-sm outline-none focus:border-[#258676]"/></label>
            <label className="block text-xs font-bold text-[#486173]">التاريخ والوقت (بتوقيت السعودية) *
              <input type="datetime-local" required value={form.pickup_local} onChange={e => setField('pickup_local', e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#D6E1E7] bg-white px-3 text-sm outline-none focus:border-[#258676]"/></label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-bold text-[#486173]">المسار *
              <select required value={form.route_id} onChange={e => chooseRoute(e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#D6E1E7] bg-white px-3 text-sm outline-none focus:border-[#258676]">
                <option value="">اختر المسار...</option>
                {catalog?.routes.map(route => <option key={route.id} value={route.id}>{route.origin_city} ← {route.destination_city}</option>)}
              </select></label>
            <label className="block text-xs font-bold text-[#486173]">السيارة *
              <select required value={form.vehicle_id} onChange={e => setField('vehicle_id', e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#D6E1E7] bg-white px-3 text-sm outline-none focus:border-[#258676]">
                <option value="">اختر السيارة...</option>
                {catalog?.vehicles.map(vehicle => <option key={vehicle.id} value={vehicle.id}>{vehicle.name} · {vehicle.seats} ركاب · {vehicle.bags} حقائب</option>)}
              </select></label>
            <label className="block text-xs font-bold text-[#486173]">موقع الاستلام *
              <input required minLength={3} maxLength={200} value={form.pickup_location} onChange={e => setField('pickup_location', e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#D6E1E7] bg-white px-3 text-sm outline-none focus:border-[#258676]"/></label>
            <label className="block text-xs font-bold text-[#486173]">موقع الوصول *
              <input required minLength={3} maxLength={200} value={form.dropoff_location} onChange={e => setField('dropoff_location', e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#D6E1E7] bg-white px-3 text-sm outline-none focus:border-[#258676]"/></label>
            <label className="block text-xs font-bold text-[#486173]">عدد الركاب *
              <input required type="number" min={1} max={selectedVehicle?.seats || 50} value={form.passengers_count} onChange={e => setField('passengers_count', Number(e.target.value))}
                className="mt-2 h-11 w-full rounded-xl border border-[#D6E1E7] bg-white px-3 text-sm outline-none focus:border-[#258676]"/></label>
            <label className="block text-xs font-bold text-[#486173]">عدد الحقائب *
              <input required type="number" min={0} max={selectedVehicle?.bags ?? 50} value={form.luggage_count} onChange={e => setField('luggage_count', Number(e.target.value))}
                className="mt-2 h-11 w-full rounded-xl border border-[#D6E1E7] bg-white px-3 text-sm outline-none focus:border-[#258676]"/></label>
            <label className="block text-xs font-bold text-[#486173]">رقم الطيران (إلزامي للاستلام من المطار)
              <input dir="ltr" maxLength={30} value={form.flight_number} onChange={e => setField('flight_number', e.target.value)}
                className="mt-2 h-11 w-full rounded-xl border border-[#D6E1E7] bg-white px-3 text-sm outline-none focus:border-[#258676]" placeholder="SV123"/></label>
          </div>
          <label className="block text-xs font-bold text-[#486173]">ملاحظات الطلب
            <textarea maxLength={2000} rows={3} value={form.special_notes} onChange={e => setField('special_notes', e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#D6E1E7] bg-white p-3 text-sm outline-none focus:border-[#258676]"/></label>
          <div className="flex flex-col gap-3 rounded-xl bg-[#E9F3F0] p-4 text-xs text-[#285D55] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 shrink-0"/> جميع الأسعار من قاعدة بيانات الموقع. لا مقدم ولا دفع إلكتروني.</div>
            <span className="font-bold">{basePrice === undefined ? 'اختر المسار والسيارة لعرض السعر الأساسي' : 'السعر الأساسي الاسترشادي: ' + Number(basePrice).toLocaleString('en-US') + ' ر.س'}</span>
          </div>
          <div className="flex justify-end gap-2 border-t border-[#E0E8EB] pt-4">
            <button type="button" onClick={onClose} className="rounded-xl border border-[#D5E2E6] bg-white px-5 py-3 text-sm font-bold">إغلاق</button>
            <button type="submit" disabled={saving || !!done || !catalog?.routes.length || !catalog?.vehicles.length}
              className="flex items-center gap-2 rounded-xl bg-[#1B6859] px-5 py-3 text-sm font-bold text-white disabled:opacity-40">
              {saving && <Loader2 className="h-4 w-4 animate-spin"/>} تسجيل طلب الحجز
            </button>
          </div>
        </form>}
    </section>
  </div>;
}
