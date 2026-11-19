'use client';

import { useEffect, useState } from 'react';
import { ImageIcon, Upload, Save, ExternalLink, ShieldCheck } from 'lucide-react';

type SlotInfo = { label: string; fallback: string };
type ImageRegistry = { slots: Record<string, SlotInfo>; assets: Record<string, string> };
export default function SiteImageControl() {
  const [data, setData] = useState<ImageRegistry | null>(null);
  const [saving, setSaving] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/site-assets',{cache:'no-store'}).then(async r => {
      const j = await r.json(); if (!r.ok) throw new Error(j.error || 'Failed to load image settings'); return j;
    }).then(j => { if (!cancelled) setData(j); }).catch(e => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, []);
  async function upload(key: string, file: File) {
    setSaving(key);setError('');setMessage('');
    try {
      const fd = new FormData();fd.append('file', file);fd.append('category', 'site');
      const r = await fetch('/api/admin/media/upload', { method:'POST', body:fd });
      const j = await r.json();
      if (!r.ok || !j.url) throw new Error(j.error || 'Upload failed');
      setData(old => old ? { ...old, assets:{ ...old.assets,[key]:j.url } } : old);
      setMessage('تم رفع الصورة، اضغط حفظ لنشرها في القسم المحدد.');
    } catch (e) { setError(e instanceof Error?e.message:'تعذر الرفع'); }
    finally {setSaving('');}
  }
  async function save(key:string) {
    if (!data) return;
    setSaving(key);setError('');setMessage('');
    try {
      const r = await fetch('/api/admin/site-assets', { method:'PATCH', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({key,url:data.assets[key]}) });
      const j=await r.json();
      if(!r.ok)throw new Error(j.error || 'تعذر حفظ إعداد الصورة');
      setMessage('تم الحفظ بنجاح. افتح الصفحة العامة وحدّثها لرؤية الصورة الجديدة.');
    } catch (e) { setError(e instanceof Error ? e.message : 'تعذر الحفظ'); }
    finally {setSaving('');}
  }
  return <section dir="rtl" className="vip-internal-editorial space-y-5 rounded-2xl bg-[#f7efe5] p-4 text-[#193746] sm:p-7">
    <header><p className="text-xs font-bold text-[#17736d]">SITE-WIDE VISUAL CONTENT</p>
      <h1 className="mt-2 text-2xl font-black">صور الصفحة الرئيسية</h1>
      <p className="mt-2 text-sm text-[#637784]">غيّر صورة أي قسم معروض هنا ثم احفظ. فيديو الهيرو الأصلي لن يتم تغييره أو حذفه.</p>
    </header>
    <div className="flex items-center gap-2 rounded-xl bg-[#e4f1ec] p-3 text-sm text-[#1b6857]"><ShieldCheck className="h-5 w-5"/>الصور تحفظ في Supabase Storage، والاختيار يحفظ في إعدادات الموقع.</div>
    {error && <p role="alert" className="rounded-xl bg-rose-50 p-3 text-rose-700">{error}</p>}
    {message && <p role="status" className="rounded-xl bg-emerald-50 p-3 text-emerald-800">{message}</p>}
    {!data && !error && <p>جارٍ تحميل صور الموقع...</p>}
    <div className="grid gap-4 md:grid-cols-2">
      {data && Object.entries(data.slots).map(([key,slot]) => <article key={key} className="overflow-hidden rounded-2xl border border-[#e3d3bd] bg-white p-4">
        <h2 className="mb-3 font-black">{slot.label}</h2>
        <div className="relative h-44 overflow-hidden rounded-xl bg-[#e5e4df]"><img src={data.assets[key] || slot.fallback} alt={slot.label} className="h-full w-full object-cover"/></div>
        <label className="mt-4 block text-xs font-bold">رابط الصورة
          <input dir="ltr" value={data.assets[key]||''} onChange={e => setData(old=>old?{...old,assets:{...old.assets,[key]:e.target.value}}:old)}
            className="mt-1 w-full rounded-lg border border-[#d9cbb4] px-3 py-2 text-xs" />
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#ccb48c] px-3 py-2 text-xs font-bold">
            <Upload className="h-4 w-4"/> رفع صورة
            <input type="file" accept="image/png,image/jpeg,image/webp,image/avif,image/gif" className="sr-only" disabled={!!saving}
              onChange={e => { const file=e.target.files?.[0];if(file)void upload(key,file);e.currentTarget.value='';}} />
          </label>
          <button type="button" disabled={!!saving} onClick={() => void save(key)} className="inline-flex items-center gap-2 rounded-lg bg-[#07595b] px-4 py-2 text-xs font-bold text-white disabled:opacity-50"><Save className="h-4 w-4"/>{saving===key?'جارٍ الحفظ...':'حفظ الصورة'}</button>
          <a href="/ar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs"><ExternalLink className="h-4 w-4"/> عرض الموقع</a>
        </div>
      </article>)}
    </div>
  </section>;
