import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';

// 1. TRANSFORM ROUTES PAGE
const pagePath = path.join(projectRoot, 'src/app/[locale]/routes/page.tsx');
let pageCode = fs.readFileSync(pagePath, 'utf8');

pageCode = pageCode.replace(
  'className="bg-[#F7F5F0] min-h-screen text-start text-[#182235]"',
  'className="bg-[#090D15] min-h-screen text-start text-[#F6F3ED]"'
);
pageCode = pageCode.replace(
  'className="relative pt-10 sm:pt-14 md:pt-18 pb-8 md:pb-12 border-b border-[#E8E3DA]"',
  'className="relative pt-10 sm:pt-14 md:pt-18 pb-8 md:pb-12 border-b border-white/10 bg-gradient-to-b from-[#101725] to-[#090D15]"'
);
pageCode = pageCode.replace(
  'className="flex items-center gap-2 text-xs text-[#687386] mb-6"',
  'className="flex items-center gap-2 text-xs text-[#AEB7C4] mb-6"'
);
pageCode = pageCode.replace(
  'hover:text-[#101827] transition-colors',
  'hover:text-[#D6A13A] transition-colors'
);
pageCode = pageCode.replace(
  'className="text-[#101827] font-semibold"',
  'className="text-[#D6A13A] font-semibold"'
);
pageCode = pageCode.replace(
  'bg-[#FAF7F0] border border-[#C5A15D]/40 text-xs font-bold text-[#8C6D2D]',
  'bg-[#141D2C] border border-[#D6A13A]/40 text-xs font-bold text-[#D6A13A]'
);
pageCode = pageCode.replace(
  'className="font-playfair font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-[#101827] font-bold tracking-tight leading-[1.2] mb-4"',
  'className="font-playfair font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-[#F6F3ED] font-bold tracking-tight leading-[1.2] mb-4"'
);
pageCode = pageCode.replace(
  'className="text-sm sm:text-base md:text-lg text-[#4B5565] font-light leading-relaxed mb-6"',
  'className="text-sm sm:text-base md:text-lg text-[#AEB7C4] font-light leading-relaxed mb-6"'
);

// Trust pills
pageCode = pageCode.replace(
  'className="flex flex-wrap items-center gap-2.5 text-xs text-[#101827] font-semibold"',
  'className="flex flex-wrap items-center gap-2.5 text-xs text-[#F6F3ED] font-semibold"'
);
pageCode = pageCode.replaceAll(
  'px-3 py-1 rounded-full bg-white border border-[#E8E3DA] shadow-2xs',
  'px-3 py-1 rounded-full bg-[#101725] border border-white/10 shadow-2xs'
);
pageCode = pageCode.replace(
  'className="w-3.5 h-3.5 text-[#101827]"',
  'className="w-3.5 h-3.5 text-[#D6A13A]"'
);

// All routes count header
pageCode = pageCode.replace(
  'className="font-playfair font-serif text-2xl sm:text-3xl text-[#101827] font-bold"',
  'className="font-playfair font-serif text-2xl sm:text-3xl text-[#F6F3ED] font-bold"'
);
pageCode = pageCode.replace(
  'className="text-xs text-[#687386]"',
  'className="text-xs text-[#AEB7C4]"'
);
pageCode = pageCode.replace(
  'className="text-xs font-bold text-[#8C6D2D] hover:underline flex items-center gap-1"',
  'className="text-xs font-bold text-[#D6A13A] hover:underline flex items-center gap-1"'
);

pageCode = pageCode.replaceAll('text-[#C5A15D]', 'text-[#D6A13A]');

fs.writeFileSync(pagePath, pageCode, 'utf8');
console.log('✓ src/app/[locale]/routes/page.tsx updated with royal dark luxury theme');

// 2. TRANSFORM EXECUTIVE ROUTE CARD
const cardPath = path.join(projectRoot, 'src/components/routes/ExecutiveRouteCard.tsx');
let cardCode = fs.readFileSync(cardPath, 'utf8');

cardCode = cardCode.replace(
  'className="relative w-full rounded-2xl md:rounded-[22px] overflow-hidden bg-black border-2 border-[#b89355] shadow-2xl transition-all duration-300 text-start group"',
  'className="relative w-full rounded-2xl md:rounded-[22px] overflow-hidden bg-[#101725] border border-white/10 hover:border-[#D6A13A]/50 shadow-2xl transition-all duration-300 text-start group"'
);

cardCode = cardCode.replace(
  'className="bg-white px-4 sm:px-6 py-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-t border-slate-100"',
  'className="bg-[#101725] px-4 sm:px-6 py-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-t border-white/10"'
);

cardCode = cardCode.replaceAll(
  'px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-800 bg-white border border-slate-300 shadow-2xs',
  'px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold text-[#AEB7C4] bg-[#141D2C] border border-white/10 shadow-2xs'
);
cardCode = cardCode.replaceAll('text-slate-700 shrink-0', 'text-[#D6A13A] shrink-0');

cardCode = cardCode.replace(
  'text-[10px] uppercase font-bold tracking-wider text-slate-400 block leading-tight',
  'text-[10px] uppercase font-bold tracking-wider text-[#AEB7C4] block leading-tight'
);
cardCode = cardCode.replace(
  'font-sans text-xl sm:text-2xl font-black text-slate-900 tracking-tight',
  'font-sans text-xl sm:text-2xl font-black text-[#D6A13A] tracking-tight'
);
cardCode = cardCode.replace(
  'text-xs font-bold text-slate-500',
  'text-xs font-bold text-[#AEB7C4]'
);

cardCode = cardCode.replace(
  'className="flex-1 sm:flex-none border border-slate-900 hover:border-black hover:bg-slate-50 text-slate-900 text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-lg transition-all text-center whitespace-nowrap shadow-2xs active:scale-[0.98]"',
  'className="flex-1 sm:flex-none border border-white/20 hover:border-[#D6A13A] hover:bg-white/5 text-[#F6F3ED] text-xs sm:text-sm font-bold px-4 sm:px-5 py-2.5 rounded-lg transition-all text-center whitespace-nowrap shadow-2xs active:scale-[0.98]"'
);

cardCode = cardCode.replace(
  'bg-gradient-to-r from-[#d99f2b] via-[#e5b23d] to-[#f4c84f] hover:from-[#e5b23d] hover:to-[#d99f2b] text-slate-950',
  'bg-[#D6A13A] hover:bg-[#E5B14B] text-[#090D15]'
);

fs.writeFileSync(cardPath, cardCode, 'utf8');
console.log('✓ src/components/routes/ExecutiveRouteCard.tsx updated with royal dark luxury theme');
