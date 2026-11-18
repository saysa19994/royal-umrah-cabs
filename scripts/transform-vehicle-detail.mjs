import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';
const filePath = path.join(projectRoot, 'src/app/[locale]/fleet/[slug]/page.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// Replace outer wrapper
code = code.replace(
  'className="py-10 sm:py-16 md:py-20 bg-[#F7F5F0] min-h-screen text-start"',
  'className="py-10 sm:py-16 md:py-20 bg-[#090D15] min-h-screen text-start text-[#F6F3ED]"'
);

// Breadcrumbs
code = code.replace(
  'className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-6 sm:mb-8"',
  'className="flex items-center gap-2 text-xs text-[#AEB7C4] font-semibold mb-6 sm:mb-8"'
);
code = code.replace(
  'className="text-[#101827] font-bold truncate"',
  'className="text-[#D6A13A] font-bold truncate"'
);

// Title & subtitle
code = code.replace(
  'className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#101827] tracking-tight leading-tight mb-3"',
  'className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F6F3ED] tracking-tight leading-tight mb-3"'
);
code = code.replace(
  'className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl font-normal mb-6"',
  'className="text-base sm:text-lg text-[#AEB7C4] leading-relaxed max-w-3xl font-normal mb-6"'
);

// Buttons
code = code.replace(
  'className="h-12 px-7 rounded-xl bg-[#101827] hover:bg-[#111C30] text-[#C5A15D] hover:text-white border border-[#C5A15D]/40 font-extrabold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"',
  'className="h-12 px-7 rounded-xl bg-[#D6A13A] hover:bg-[#E5B14B] text-[#090D15] font-extrabold text-sm uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(214,161,58,0.25)] flex items-center justify-center gap-2 active:scale-95"'
);
code = code.replace(
  'className="h-12 px-6 rounded-xl bg-white border border-slate-300 hover:border-[#C5A15D] text-slate-800 hover:text-[#101827] font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-95"',
  'className="h-12 px-6 rounded-xl bg-[#101725] border border-white/10 hover:border-[#D6A13A] text-[#F6F3ED] hover:text-[#D6A13A] font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-95"'
);

// Spec cards
code = code.replaceAll(
  'className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8E3DA] shadow-2xs flex flex-col justify-between"',
  'className="bg-[#101725] rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-[#D6A13A]/40 transition-colors shadow-md flex flex-col justify-between"'
);
code = code.replaceAll(
  'className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-[#C5A15D] flex items-center justify-center mb-3"',
  'className="w-10 h-10 rounded-xl bg-[#141D2C] border border-white/10 text-[#D6A13A] flex items-center justify-center mb-3"'
);
code = code.replaceAll(
  'className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E8E3DA] text-sky-600 flex items-center justify-center mb-3"',
  'className="w-10 h-10 rounded-xl bg-[#141D2C] border border-white/10 text-[#D6A13A] flex items-center justify-center mb-3"'
);
code = code.replaceAll(
  'text-slate-400 block mb-0.5',
  'text-[#AEB7C4] block mb-0.5'
);
code = code.replaceAll(
  'text-[#101827] tracking-tight',
  'text-[#F6F3ED] tracking-tight'
);
code = code.replaceAll(
  'font-bold text-[#101827] leading-snug',
  'font-bold text-[#F6F3ED] leading-snug'
);

// Pricing card & tables
code = code.replace(
  'className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8E3DA] shadow-xs mb-8"',
  'className="bg-[#101725] rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-lg mb-8"'
);
code = code.replace(
  'className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#F7F5F0] border border-[#E8E3DA] text-[#C5A15D] mb-2"',
  'className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#141D2C] border border-white/10 text-[#D6A13A] mb-2"'
);
code = code.replace(
  'className="font-display font-extrabold text-2xl sm:text-3xl text-[#101827] tracking-tight mb-2"',
  'className="font-display font-extrabold text-2xl sm:text-3xl text-[#F6F3ED] tracking-tight mb-2"'
);
code = code.replace(
  'className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal"',
  'className="text-[#AEB7C4] text-xs sm:text-sm leading-relaxed font-normal"'
);
code = code.replace(
  'className="overflow-x-auto rounded-2xl border border-[#E8E3DA]"',
  'className="overflow-x-auto rounded-2xl border border-white/10"'
);
code = code.replace(
  'className="bg-[#101827] text-white text-xs font-bold uppercase tracking-wider border-b border-[#C5A15D]/30"',
  'className="bg-[#141D2C] text-[#D6A13A] text-xs font-bold uppercase tracking-wider border-b border-white/10"'
);
code = code.replace(
  'className="divide-y divide-[#E8E3DA] text-xs sm:text-sm text-slate-800"',
  'className="divide-y divide-white/5 text-xs sm:text-sm text-[#AEB7C4]"'
);
code = code.replace(
  "idx % 2 === 0 ? 'bg-white' : 'bg-[#F7F5F0]/60 hover:bg-[#F7F5F0]'",
  "idx % 2 === 0 ? 'bg-[#101725]' : 'bg-[#141D2C]/40 hover:bg-[#141D2C]/70'"
);
code = code.replaceAll(
  'font-semibold text-[#101827]',
  'font-semibold text-[#F6F3ED]'
);
code = code.replaceAll(
  'font-extrabold text-[#101827] whitespace-nowrap',
  'font-extrabold text-[#D6A13A] whitespace-nowrap'
);
code = code.replaceAll(
  'className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#101827] hover:bg-[#C5A15D] text-[#C5A15D] hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs"',
  'className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#141D2C] hover:bg-[#D6A13A] text-[#D6A13A] hover:text-[#090D15] border border-white/10 font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs"'
);

// Features container
code = code.replace(
  'className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8E3DA] shadow-xs mb-8"',
  'className="bg-[#101725] rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-lg mb-8"'
);
code = code.replace(
  'className="font-display font-extrabold text-2xl text-[#101827] mb-6 tracking-tight"',
  'className="font-display font-extrabold text-2xl text-[#F6F3ED] mb-6 tracking-tight"'
);
code = code.replaceAll(
  'className="p-4 rounded-2xl bg-[#F7F5F0]/70 border border-[#E8E3DA] flex items-start gap-3"',
  'className="p-4 rounded-2xl bg-[#141D2C] border border-white/10 flex items-start gap-3"'
);
code = code.replaceAll(
  'font-bold text-sm text-[#101827] mb-0.5',
  'font-bold text-sm text-[#F6F3ED] mb-0.5'
);
code = code.replaceAll(
  'text-xs text-slate-600 leading-relaxed font-normal',
  'text-xs text-[#AEB7C4] leading-relaxed font-normal'
);
code = code.replaceAll(
  'className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#E8E3DA] flex items-center gap-3"',
  'className="p-4 rounded-2xl bg-[#141D2C] border border-white/10 flex items-center gap-3"'
);
code = code.replaceAll(
  'text-[#C5A15D] shrink-0',
  'text-[#D6A13A] shrink-0'
);
code = code.replaceAll(
  'block text-xs font-bold text-[#101827]',
  'block text-xs font-bold text-[#F6F3ED]'
);
code = code.replaceAll(
  'text-[11px] text-slate-600',
  'text-[11px] text-[#AEB7C4]'
);

// Bottom CTA button
code = code.replace(
  'className="inline-flex items-center gap-2.5 h-14 px-9 rounded-2xl bg-[#101827] hover:bg-[#111C30] text-[#C5A15D] hover:text-white border border-[#C5A15D]/50 font-black text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95"',
  'className="inline-flex items-center gap-2.5 h-14 px-9 rounded-2xl bg-[#D6A13A] hover:bg-[#E5B14B] text-[#090D15] font-black text-sm uppercase tracking-wider transition-all shadow-[0_4px_24px_rgba(214,161,58,0.3)] active:scale-95"'
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('✓ src/app/[locale]/fleet/[slug]/page.tsx updated with royal dark luxury theme');
