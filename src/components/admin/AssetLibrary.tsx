'use client';
import { useCallback, useEffect, useState } from 'react';
import { Copy, Upload, RefreshCw, ExternalLink } from 'lucide-react';

type Media = {
  id: string; file_url: string; file_name: string; file_size?: number;
  category: string; mime_type: string;
};
const filters = [
  {id:'all',label:'كل الصور'}, {id:'fleet',label:'السيارات'},
  {id:'blog',label:'المدونة'}, {id:'site',label:'الصفحات'},
  {id:'cms',label:'المحتوى'}, {id:'general',label:'عام'},
] as const;
export default function AssetLibrary() {
  const [category,setCategory]=useState('all');
  const [files,setFiles]=useState<Media[]>([]);
  const [loading,setLoading]=useState(true);
  const [uploading,setUploading]=useState(false);
  const [message,setMessage]=useState('');
  const [error,setError]=useState('');

  const refresh=useCallback(async()=>{
    setLoading(true);setError('');
    try{
      const r=await fetch('/api/admin/media?category='+encodeURIComponent(category),{cache:'no-store'});
      const j=await r.json();
      if(!r.ok||!Array.isArray(j.items))throw new Error(j.error||'Unable to read images');
      setFiles(j.items);
    }catch(e){setError(e instanceof Error?e.message:'تعذر تحميل الملفات');setFiles([]);}
    finally{setLoading(false);}
  },[category]);
  useEffect(()=>{void refresh();},[refresh]);

  async function upload(file:File){
    setUploading(true);setError('');setMessage('');
    try{
      const target=category==='all'?'site':category;
      const form=new FormData();form.append('file',file);form.append('category',target);
      const r=await fetch('/api/admin/media/upload',{method:'POST',body:form});
      const j=await r.json();
      if(!r.ok||!j.url)throw new Error(j.error||'تعذر رفع الصورة');
      setMessage('تم رفع الصورة. يمكنك نسخ الرابط واستخدامه في تحرير الصفحات أو المدونة.');
      await refresh();
    }catch(e){setError(e instanceof Error?e.message:'فشل رفع الصورة');}
    finally{setUploading(false);}
  }

  return <main dir="rtl" className="space-y-5 rounded-2xl bg-[#f9f3e9] p-4 text-[#183944] md:p-8">
    <div>
      <p className="text-xs font-bold tracking-wide text-[#0d786e]">MEDIA / STORAGE LIBRARY</p>
      <h1 className="mt-2 text-2xl font-black">مكتبة جميع صور الموقع</h1>
      <p className="mt-2 text-sm text-[#66757c]">هذه الصور مخزنة فعليًا في Supabase. انسخ الرابط لأي صورة واستخدمه في أداة صور الموقع أو محرر المدونة. لا تُحذف الصور المستخدمة تلقائيًا.</p>
    </div>
    <div className="flex flex-wrap items-center gap-3">
      <label className="text-xs font-bold">القسم
        <select className="ms-2 rounded-lg border border-[#d0b98c] bg-white px-3 py-2" value={category} onChange={e=>setCategory(e.target.value)}>
          {filters.map(f=><option key={f.id} value={f.id}>{f.label}</option>)}
        </select>
      </label>
      <button type="button" onClick={()=>void refresh()} disabled={loading||uploading}
        className="inline-flex items-center gap-2 rounded-lg border border-[#d0b98c] px-3 py-2 text-xs">
        <RefreshCw size={15}/>تحديث
      </button>
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#08605b] px-4 py-2 text-xs font-bold text-white">
        <Upload size={15}/> {uploading?'جارٍ الرفع':'رفع صورة'}
        <input type="file" className="sr-only" accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          disabled={uploading} onChange={e=>{const f=e.target.files?.[0];if(f)void upload(f);e.target.value='';}}/>
      </label>
    </div>
    {error&&<p role="alert" className="rounded-lg bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
    {message&&<p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p>}
    {loading?<p className="text-sm">جارٍ التحميل...</p>:!files.length?<p className="text-sm">لا توجد صور مرفوعة في هذا القسم بعد.</p>:
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {files.map(f=><article className="overflow-hidden rounded-xl border border-[#e1d1b6] bg-white" key={f.id}>
          <div className="aspect-video bg-[#dcd8d0]"><img alt={f.file_name} src={f.file_url} loading="lazy" className="h-full w-full object-contain"/></div>
          <div className="space-y-2 p-4">
            <p className="truncate text-sm font-bold" title={f.file_name}>{f.file_name}</p>
            <p className="text-xs text-[#6b7882]">{f.category} · {Math.round((f.file_size||0)/1024)} KB</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={()=>{void navigator.clipboard.writeText(f.file_url).then(()=>setMessage('تم نسخ رابط الصورة'),()=>setError('تعذر نسخ الرابط، افتحه وانسخه يدويًا'));}}
                className="inline-flex items-center gap-1 rounded-lg bg-[#0b5e62] px-3 py-2 text-xs text-white">
                <Copy size={14}/> نسخ الرابط
              </button>
              <a href={f.file_url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-[#d0b98c] px-3 py-2 text-xs">
                <ExternalLink size={14}/> فتح الصورة
              </a>
            </div>
          </div>
        </article>)}
      </div>}
  </main>;
}
