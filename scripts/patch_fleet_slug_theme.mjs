import fs from 'fs';
import path from 'path';

const filePath = 'd:/royal-umrah-cabs/src/app/[locale]/fleet/[slug]/page.tsx';
let code = fs.readFileSync(filePath, 'utf8');

code = code.replace(
  'className="relative py-10 sm:py-16 md:py-20 bg-[#090D15] min-h-screen text-start text-[#F6F3ED] overflow-hidden"',
  'className="relative py-10 sm:py-16 md:py-20 bg-bg min-h-screen text-start text-ink overflow-hidden transition-colors duration-200"'
);

// Breadcrumb & Headings
code = code
  .replaceAll('text-[#AEB7C4]', 'text-ink-muted')
  .replaceAll('text-[#F6F3ED]', 'text-ink')
  .replaceAll('bg-[#101725]', 'bg-surface')
  .replaceAll('bg-[#141D2C]', 'bg-bg-alt')
  .replaceAll('border-white/10', 'border-border')
  .replaceAll('border-white/5', 'border-border/40')
  .replaceAll('divide-white/5', 'divide-border/40');

// Fix button styling
code = code.replace(
  `className="h-12 px-6 rounded-xl bg-surface border border-border hover:border-[#D6A13A] text-ink hover:text-[#D6A13A] font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-95"`,
  `className="h-12 px-6 rounded-xl bg-bg-alt border border-border hover:border-gold text-ink hover:text-gold font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-95"`
);

// Fix badge
code = code.replace(
  `bg-surface text-[#C5A15D] border border-[#C5A15D]/30`,
  `bg-gold-soft text-gold-dark border border-gold-line`
);

// Fix bespoke box & assurance card
code = code.replace(
  `className="p-6 rounded-2xl bg-[#101827] text-white border border-[#C5A15D]/40 flex flex-col md:flex-row items-center justify-between gap-6"`,
  `className="p-6 rounded-2xl bg-surface text-ink border border-gold/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"`
);

code = code.replace(
  `className="p-6 sm:p-8 rounded-3xl bg-[#101827] text-white border border-[#C5A15D]/30 shadow-md mb-10 flex flex-col md:flex-row items-center gap-6"`,
  `className="p-6 sm:p-8 rounded-3xl bg-surface text-ink border border-gold/30 shadow-md mb-10 flex flex-col md:flex-row items-center gap-6"`
);

code = code.replaceAll('text-slate-300', 'text-ink-muted');
code = code.replace('bg-[#111C30]', 'bg-gold-soft');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully patched fleet slug page theme!');
