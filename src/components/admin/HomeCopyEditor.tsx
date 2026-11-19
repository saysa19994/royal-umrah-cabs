'use client';
import { useCallback, useEffect, useState } from 'react';
import { Save, Globe2, ExternalLink, RefreshCw } from 'lucide-react';

type ContentPayload={
  locale:string;fields:Record<string,string>;defaults:Record<string,string>;values:Record<string,string>;
};
const locales=['ar','en','ms','id','ur','fr','es','de','tr','hi'];
export default function HomeCopyEditor(){
  const [lang,setLang]=useState('ar');
  const [loaded,setLoaded]=useState<ContentPayload|null>(null);
  const [draft,setDraft]=useState<Record<string,string>>({});
  const [busy,setBusy]=useState(false);
  const [notice,setNotice]=useState('');
  const [error,setError]=useState('');
  const load=useCallback(async()=>{
    setBusy(true);setError('');setNotice('');
    try {
      const r=await fetch('/api/admin/home-copy?locale='+encodeURIComponent(lang),{cache:'no-store'});
      const j=await r.json();
      if(!r.ok)throw new Error(j.error||'تعذر تحميل النصوص');
      setLoaded(j);setDraft({...j.defaults,...j.values});
    }catch(e){setLoaded(null);setError(e instanceof Error?e.message:'تعذر تحميل النصوص');}
    finally{setBusy(false);}
  },[lang]);
  useEffect(()=>{void load();},[load]);
  async function save(){
    if(!loaded)return;
    setBusy(true);setNotice('');setError('');
    try{
      const r=await fetch('/api/admin/home-copy',{method:'PATCH',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({locale:lang,values:draft})});
      const j=await r.json();
      if(!r.ok)throw new Error(j.error||'تعذر الحفظ');
      setNotice('تم حفظ النصوص. افتح الصفحة باللغة المختارة وحدّثها لرؤية النتيجة.');
    }catch(e){setError(e instanceof Error?e.message:'تعذر الحفظ');}
    finally{setBusy(false);}
  }
  return <section dir="rtl" className="vip-internal-editorial space-y-5 rounded-2xl bg-[#f7efe5] p-4 text-[#193746] sm:p-7">
    <header>
      <p className="text-xs font-bold text-[#13736d]">SITE EDITOR / MULTILINGUAL</p>
      <h1 className="mt-2 text-2xl font-black">نصوص الصفحة الرئيسية</h1>
      <p className="mt-2 text-sm text-[#657780]">عدّل العناوين والأوصاف في كل لغة بدون لمس الكود. لا يتم نسخ نص لغة إلى لغة أخرى تلقائيًا.</p>
    </header>
    <div className="flex flex-wrap items-center gap-2">
      <Globe2 className="h-5 w-5 text-[#0e6863]"/>
      <label className="text-sm font-bold">لغة الصفحة
        <select value={lang} onChange={e=>setLang(e.target.value)} className="ms-2 rounded-lg border border-[#cdb896] bg-white px-3 py-2">
          {locales.map(x=><option key={x} value={x}>{x.toUpperCase()}</option>)}
        </select>
      </label>
      <button type="button" onClick={()=>void load()} disabled={busy} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs"><RefreshCw className="h-4 w-4"/> تحديث</button>
    </div>
    {error&&<div role="alert" className="rounded-xl bg-rose-50 p-3 text-rose-700">{error}</div>}
    {notice&&<div role="status" className="rounded-xl bg-emerald-50 p-3 text-emerald-800">{notice}</div>}
    <div className="grid gap-4 md:grid-cols-2">
      {loaded&&Object.entries(loaded.fields).map(([key,label])=>
        <label key={key} className="block rounded-xl border border-[#e2d3bb] bg-white p-4 text-sm font-bold">
          <span>{label}</span><span className="ms-2 font-mono text-[10px] text-[#74848c]">{key}</span>
          <textarea dir={lang==='ar'||lang==='ur'?'rtl':'ltr'} rows={key.includes('Description')?4:2}
            maxLength={1500} value={draft[key]||''}
            onChange={e=>setDraft(prev=>({...prev,[key]:e.target.value}))}
            className="mt-3 w-full rounded-lg border border-[#d6c3a5] bg-[#fffdf7] p-3 text-sm font-normal"/>
        </label>
      )}
    </div>
    <div className="flex flex-wrap gap-3">
      <button type="button" disabled={busy||!loaded} onClick={()=>void save()}
        className="inline-flex items-center gap-2 rounded-xl bg-[#085d61] px-5 py-3 text-sm font-black text-white disabled:opacity-50">
        <Save className="h-5 w-5"/>{busy?'جارٍ الحفظ...':'حفظ التعديلات'}
      </button>
      <a href={'/'+lang} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-[#b99c6b] px-5 py-3 text-sm font-bold">
        <ExternalLink className="h-4 w-4"/> معاينة الصفحة
      </a>
    </div>
  </section>;
}
