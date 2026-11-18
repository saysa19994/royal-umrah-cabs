import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';

// 1. TRANSFORM PRICING PAGE
const pagePath = path.join(projectRoot, 'src/app/[locale]/pricing/page.tsx');
let pageCode = fs.readFileSync(pagePath, 'utf8');

pageCode = pageCode.replace(
  'className="bg-[#F7F5F0] min-h-screen text-start text-[#182235] w-full max-w-full overflow-x-clip"',
  'className="bg-[#090D15] min-h-screen text-start text-[#F6F3ED] w-full max-w-full overflow-x-clip"'
);

pageCode = pageCode.replace(
  'className="relative pt-8 sm:pt-12 md:pt-16 pb-8 md:pb-12 border-b border-[#E8E3DA] bg-gradient-to-b from-white/60 to-[#F7F5F0]"',
  'className="relative pt-8 sm:pt-12 md:pt-16 pb-8 md:pb-12 border-b border-white/10 bg-gradient-to-b from-[#101725] to-[#090D15]"'
);

pageCode = pageCode.replace(
  'className="flex items-center gap-2 text-xs text-[#687386] mb-5 sm:mb-6"',
  'className="flex items-center gap-2 text-xs text-[#AEB7C4] mb-5 sm:mb-6"'
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
  'bg-white border border-[#C5A15D]/50 text-xs font-bold text-[#8C6D2D]',
  'bg-[#141D2C] border border-[#D6A13A]/50 text-xs font-bold text-[#D6A13A]'
);

pageCode = pageCode.replace(
  'className="font-playfair font-serif text-2xl sm:text-4xl md:text-5xl text-[#101827] font-bold tracking-tight leading-tight sm:leading-[1.2] mb-4 break-words"',
  'className="font-playfair font-serif text-2xl sm:text-4xl md:text-5xl text-[#F6F3ED] font-bold tracking-tight leading-tight sm:leading-[1.2] mb-4 break-words"'
);

pageCode = pageCode.replace(
  'className="text-sm sm:text-base md:text-lg text-[#4B5565] font-light leading-relaxed mb-6"',
  'className="text-sm sm:text-base md:text-lg text-[#AEB7C4] font-light leading-relaxed mb-6"'
);

pageCode = pageCode.replaceAll(
  'className="flex items-center gap-2.5 p-3 sm:p-4 rounded-xl bg-white border border-[#E8E3DA] shadow-2xs"',
  'className="flex items-center gap-2.5 p-3 sm:p-4 rounded-xl bg-[#101725] border border-white/10 shadow-md"'
);

pageCode = pageCode.replaceAll(
  'className="w-8 h-8 rounded-lg bg-[#FAF7F0] border border-[#C5A15D]/30 flex items-center justify-center shrink-0"',
  'className="w-8 h-8 rounded-lg bg-[#141D2C] border border-white/10 flex items-center justify-center shrink-0"'
);

pageCode = pageCode.replaceAll(
  'className="text-xs font-bold text-[#101827] block truncate"',
  'className="text-xs font-bold text-[#F6F3ED] block truncate"'
);

pageCode = pageCode.replaceAll(
  'className="text-[10px] text-[#687386] block truncate"',
  'className="text-[10px] text-[#AEB7C4] block truncate"'
);

pageCode = pageCode.replaceAll('text-[#C5A15D]', 'text-[#D6A13A]');
pageCode = pageCode.replaceAll('border-[#C5A15D]', 'border-[#D6A13A]');

// FAQ in pricing
pageCode = pageCode.replace(
  'className="font-playfair font-serif text-2xl sm:text-3xl text-[#101827] font-bold"',
  'className="font-playfair font-serif text-2xl sm:text-3xl text-[#F6F3ED] font-bold"'
);
pageCode = pageCode.replace(
  'className="text-xs sm:text-sm text-[#687386] mt-2"',
  'className="text-xs sm:text-sm text-[#AEB7C4] mt-2"'
);
pageCode = pageCode.replaceAll(
  'className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8E3DA] shadow-2xs hover:border-[#C5A15D]/50 transition-all"',
  'className="bg-[#101725] rounded-2xl p-5 sm:p-6 border border-white/10 shadow-md hover:border-[#D6A13A]/50 transition-all"'
);
pageCode = pageCode.replaceAll(
  'className="text-sm font-bold text-[#101827] mb-2 leading-snug"',
  'className="text-sm font-bold text-[#F6F3ED] mb-2 leading-snug"'
);
pageCode = pageCode.replaceAll(
  'className="text-xs text-[#687386] leading-relaxed font-normal"',
  'className="text-xs text-[#AEB7C4] leading-relaxed font-normal"'
);
pageCode = pageCode.replaceAll(
  'bg-white border border-[#C5A15D]/30 text-xs font-bold text-[#8C6D2D]',
  'bg-[#141D2C] border border-[#D6A13A]/30 text-xs font-bold text-[#D6A13A]'
);

fs.writeFileSync(pagePath, pageCode, 'utf8');
console.log('✓ src/app/[locale]/pricing/page.tsx updated with royal dark luxury theme');

// 2. TRANSFORM ROUTE-BASED PRICING EXPERIENCE
const compPath = path.join(projectRoot, 'src/components/pricing/RouteBasedPricingExperience.tsx');
let compCode = fs.readFileSync(compPath, 'utf8');

// Step numbers & titles
compCode = compCode.replaceAll(
  'bg-[#101827] text-[#C5A15D] text-xs font-bold flex items-center justify-center shrink-0',
  'bg-[#141D2C] text-[#D6A13A] border border-white/10 text-xs font-bold flex items-center justify-center shrink-0'
);
compCode = compCode.replaceAll(
  'font-playfair font-serif text-lg sm:text-2xl font-bold text-[#101827]',
  'font-playfair font-serif text-lg sm:text-2xl font-bold text-[#F6F3ED]'
);

// Category buttons
compCode = compCode.replace(
  "isActive\n                    ? 'bg-[#101827] text-white border-[#101827] shadow-md ring-2 ring-[#C5A15D]/30'\n                    : 'bg-white text-[#4B5565] border-[#E8E3DA] hover:border-[#C5A15D] hover:text-[#101827]'",
  "isActive\n                    ? 'bg-[#D6A13A] text-[#090D15] border-[#D6A13A] shadow-md ring-2 ring-[#D6A13A]/30'\n                    : 'bg-[#101725] text-[#AEB7C4] border-white/10 hover:border-[#D6A13A] hover:text-[#F6F3ED]'"
);
compCode = compCode.replace(
  "isActive ? 'bg-[#C5A15D] text-[#101827]' : 'bg-[#FAF7F0] text-[#C5A15D]'",
  "isActive ? 'bg-[#090D15] text-[#D6A13A]' : 'bg-[#141D2C] text-[#D6A13A]'"
);

// Route cards
compCode = compCode.replace(
  "isSelected\n                    ? 'bg-white border-[#C5A15D] shadow-md ring-2 ring-[#C5A15D]/30'\n                    : 'bg-white/80 border-[#E8E3DA] hover:border-[#C5A15D]/60 hover:bg-white'",
  "isSelected\n                    ? 'bg-[#101725] border-[#D6A13A] shadow-md ring-2 ring-[#D6A13A]/30'\n                    : 'bg-[#101725]/80 border-white/10 hover:border-[#D6A13A]/60 hover:bg-[#101725]'"
);
compCode = compCode.replaceAll(
  'bg-[#FAF7F0] px-2.5 py-0.5 rounded-full border border-[#C5A15D]/20',
  'bg-[#141D2C] px-2.5 py-0.5 rounded-full border border-white/10 text-[#D6A13A]'
);
compCode = compCode.replaceAll(
  'text-sm font-bold text-[#101827] leading-snug mb-1',
  'text-sm font-bold text-[#F6F3ED] leading-snug mb-1'
);
compCode = compCode.replaceAll(
  'text-xs text-[#687386]',
  'text-xs text-[#AEB7C4]'
);
compCode = compCode.replaceAll(
  'text-sm font-extrabold text-[#101827]',
  'text-sm font-extrabold text-[#D6A13A]'
);
compCode = compCode.replaceAll(
  'border-[#E8E3DA]',
  'border-white/10'
);

// Currency buttons
compCode = compCode.replace(
  'className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-[#E8E3DA] shadow-2xs shrink-0 self-end sm:self-auto"',
  'className="flex items-center gap-2 bg-[#101725] p-1.5 rounded-xl border border-white/10 shadow-2xs shrink-0 self-end sm:self-auto"'
);
compCode = compCode.replaceAll(
  "currency === 'SAR'\n                  ? 'bg-[#101827] text-[#C5A15D] shadow-xs'\n                  : 'text-[#4B5565] hover:text-[#101827]'",
  "currency === 'SAR'\n                  ? 'bg-[#D6A13A] text-[#090D15] shadow-xs'\n                  : 'text-[#AEB7C4] hover:text-[#F6F3ED]'"
);
compCode = compCode.replaceAll(
  "currency === 'USD'\n                  ? 'bg-[#101827] text-[#C5A15D] shadow-xs'\n                  : 'text-[#4B5565] hover:text-[#101827]'",
  "currency === 'USD'\n                  ? 'bg-[#D6A13A] text-[#090D15] shadow-xs'\n                  : 'text-[#AEB7C4] hover:text-[#F6F3ED]'"
);

// Vehicle cards
compCode = compCode.replace(
  "isStaria\n                    ? 'border-[#C5A15D] ring-2 ring-[#C5A15D]/25 shadow-md'\n                    : 'border-[#E8E3DA] shadow-xs hover:border-[#C5A15D]/60 hover:shadow-sm'",
  "isStaria\n                    ? 'border-[#D6A13A] ring-2 ring-[#D6A13A]/25 shadow-md bg-[#101725]'\n                    : 'border-white/10 shadow-xs hover:border-[#D6A13A]/60 hover:shadow-sm bg-[#101725]'"
);
compCode = compCode.replace(
  'className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all bg-white border',
  'className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all bg-[#101725] border'
);

compCode = compCode.replaceAll(
  'bg-gradient-to-b from-[#FAF7F0] to-white border border-[#E8E3DA]/60',
  'bg-gradient-to-b from-[#141D2C] to-[#101725] border border-white/10'
);

compCode = compCode.replaceAll(
  'font-playfair font-serif text-lg sm:text-xl font-bold text-[#101827] mt-3 mb-2',
  'font-playfair font-serif text-lg sm:text-xl font-bold text-[#F6F3ED] mt-3 mb-2'
);

compCode = compCode.replaceAll(
  'text-xs text-[#4B5565] flex items-start gap-2',
  'text-xs text-[#AEB7C4] flex items-start gap-2'
);

compCode = compCode.replaceAll(
  'text-2xl sm:text-3xl font-extrabold text-[#101827] tracking-tight',
  'text-2xl sm:text-3xl font-extrabold text-[#D6A13A] tracking-tight'
);

compCode = compCode.replaceAll(
  'className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-[#101827] hover:bg-[#111C30] text-[#C5A15D] hover:text-white border border-[#C5A15D]/40 font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95"',
  'className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-[#D6A13A] hover:bg-[#E5B14B] text-[#090D15] font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"'
);

compCode = compCode.replaceAll('text-[#C5A15D]', 'text-[#D6A13A]');
compCode = compCode.replaceAll('border-[#C5A15D]', 'border-[#D6A13A]');
compCode = compCode.replaceAll('bg-[#C5A15D]', 'bg-[#D6A13A]');

fs.writeFileSync(compPath, compCode, 'utf8');
console.log('✓ src/components/pricing/RouteBasedPricingExperience.tsx updated with royal dark luxury theme');
