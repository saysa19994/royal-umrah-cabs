'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpLeft, CalendarDays, ClipboardList, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

type Status = 'new'|'confirmed'|'driver_assigned'|'en_route'|'completed'|'cancelled';
type Filter = Status|'all';
type Booking = {id:string; reference:string; customer_name:string; status:Status;
  pickup_location:string;dropoff_location:string;pickup_datetime:string;vehicle_id:string;passengers_count:number};
const allowed:Filter[]=['all','new','confirmed','driver_assigned','en_route','completed','cancelled'];
const labels:Record<Filter,string>={all:'كل الحجوزات',new:'حجز جديد',confirmed:'مؤكد',driver_assigned:'سائق مُعيّن',
  en_route:'في الطريق',completed:'مكتمل',cancelled:'ملغي'};
const formatted=(date:string)=>{
  const d=new Date(date);
  return Number.isNaN(d.getTime())?'—':new Intl.DateTimeFormat('ar-SA',{
    timeZone:'Asia/Riyadh',day:'numeric',month:'short',year:'numeric',hour:'numeric',minute:'2-digit',
  }).format(d);
};
export default function BookingBoard() {
  const [filter,setFilter]=useState<Filter>('all');
  const [page,setPage]=useState(0);
  const [items,setItems]=useState<Booking[]>([]);
  const [total,setTotal]=useState<number|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState('');
  const [requested,setRequested]=useState(false);
  useEffect(()=>{
    const q=new URLSearchParams(window.location.search).get('status');
    if(q&&allowed.includes(q as Filter))setFilter(q as Filter);
    setRequested(true);
  },[]);
  const load=useCallback(async()=>{
    if(!requested)return;
    setLoading(true);setError('');
    try{
      const params=new URLSearchParams({status:filter,limit:'50',offset:String(page*50)});
      const res=await fetch('/api/admin/bookings?'+params,{cache:'no-store'});
      const data=await res.json().catch(()=>null);
      if(!res.ok||!Array.isArray(data?.bookings)||typeof data.total!=='number')
        throw new Error(data?.error||'تعذر قراءة الحجوزات من النظام');
      setItems(data.bookings);setTotal(data.total);
    }catch(e){setItems([]);setTotal(null);setError(e instanceof Error?e.message:'تعذر تحميل الحجوزات');}
    finally{setLoading(false);}
  },[filter,page,requested]);
  useEffect(()=>{void load();},[load]);
  const change=(value:Filter)=>{
    setFilter(value);setPage(0);
    const url=new URL(window.location.href);
    if(value==='all')url.searchParams.delete('status');else url.searchParams.set('status',value);
    window.history.replaceState(null,'',url.pathname+url.search);
  };
  return <section dir="rtl" className="space-y-5">
    <header className="vip-ops-workspace">
      <div className="min-w-0">
        <span className="vip-workspace-eyebrow">BOOKINGS · PRIVATE CHAUFFEUR</span>
        <h1 className="vip-brand-serif mt-2 text-[clamp(27px,3vw,42px)] font-bold text-[#173643]">إدارة الحجوزات</h1>
        <p className="mt-2 text-xs text-[#72818a]">عرض حقيقي لحجوزات الضيوف وحالاتها، مع الحفاظ على صلاحيات كل مستخدم.</p>
      </div>
      <div className="flex gap-2">
        <Link href="/admin" className="vip-soft-action">مركز العمليات <ArrowUpLeft className="h-4 w-4"/></Link>
        <button type="button" disabled={loading} onClick={()=>void load()} className="vip-workspace-refresh">
          <RefreshCw className={'h-4 w-4 '+(loading?'animate-spin':'')}/> تحديث
        </button>
      </div>
    </header>

    <div className="vip-ops-board">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2"><ClipboardList className="h-5 w-5 text-[#116b67]"/>
          <h2 className="text-base font-bold text-[#193a45]">قائمة الحجوزات</h2>
          <span className="rounded-full bg-[#e6eee7] px-3 py-1 text-xs font-bold tabular-nums text-[#135f5a]">
            {total===null?'—':total.toLocaleString('en-US')}
          </span>
        </div>
        <label className="flex items-center gap-2 text-xs font-bold text-[#37545c]">الحالة
          <select value={filter} onChange={e=>change(e.target.value as Filter)}
            className="min-h-[42px] rounded-xl border border-[#cbd4cc] bg-white px-4 py-2 text-xs text-[#183942]">
            {allowed.map(status=><option key={status} value={status}>{labels[status]}</option>)}
          </select>
        </label>
      </div>
      {error&&<p role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{error}</p>}
      <div className="mt-5 w-full overflow-x-auto">
        <table className="vip-dashboard-table min-w-[850px]">
          <thead><tr><th>رقم الحجز</th><th>اسم العميل</th><th>المسار</th><th>السيارة</th><th>الاستلام</th><th>الركاب</th><th>الحالة</th></tr></thead>
          <tbody>
            {items.map(item=><tr key={item.id}>
              <td dir="ltr" className="font-semibold">{item.reference||'—'}</td>
              <td>{item.customer_name||'—'}</td>
              <td>{item.pickup_location||'—'} ← {item.dropoff_location||'—'}</td>
              <td>{item.vehicle_id||'—'}</td>
              <td className="whitespace-nowrap"><CalendarDays className="ml-1 inline h-3 w-3"/>{formatted(item.pickup_datetime)}</td>
              <td className="tabular-nums">{item.passengers_count??'—'}</td>
              <td><span className="vip-pill vip-pill--confirmed">{labels[item.status]||item.status}</span></td>
            </tr>)}
            {!loading&&!error&&items.length===0&&<tr><td colSpan={7} className="py-14 text-center text-sm text-[#73818c]">لا توجد حجوزات في هذا التصنيف.</td></tr>}
          </tbody>
        </table>
        {loading&&<p className="py-6 text-sm text-[#5f737b]">جاري تحميل بيانات الحجوزات…</p>}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#e5dfd4] pt-4">
        <p className="text-[11px] text-[#71818a]">يُعرض حتى 50 حجزًا لكل صفحة؛ القيم لا تشمل حجوزات تجريبية.</p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={()=>setPage(v=>Math.max(0,v-1))} disabled={loading||page===0}
            className="rounded-lg border border-[#d4dcd5] px-3 py-2 text-xs font-bold text-[#23575b] disabled:opacity-40"><ChevronRight className="inline h-4 w-4"/> السابق</button>
          <span className="px-2 text-xs font-bold tabular-nums text-[#34535e]">{page+1}</span>
          <button type="button" onClick={()=>setPage(v=>v+1)} disabled={loading||total===null||(page+1)*50>=total}
            className="rounded-lg border border-[#d4dcd5] px-3 py-2 text-xs font-bold text-[#23575b] disabled:opacity-40">التالي <ChevronLeft className="inline h-4 w-4"/></button>
        </div>
      </div>
    </div>
  </section>;
}
