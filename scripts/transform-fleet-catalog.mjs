import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';
const filePath = path.join(projectRoot, 'src/components/fleet/FleetCatalog.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// Section 4 comparison matrix
code = code.replace(
  'className="section bg-white border-t border-[#DEDBD4]"',
  'className="section bg-[#090D15] border-t border-white/10"'
);
code = code.replace(
  'className="text-2xl sm:text-3xl font-serif text-[#101A27]"',
  'className="text-2xl sm:text-3xl font-serif text-[#F6F3ED]"'
);
code = code.replace(
  'className="overflow-x-auto rounded-lg border border-[#DEDBD4] shadow-xs"',
  'className="overflow-x-auto rounded-xl border border-white/10 shadow-lg"'
);
code = code.replace(
  'className="bg-[#101A27] text-white text-[11px] font-bold uppercase tracking-wider border-b border-[#C5A15D]/40"',
  'className="bg-[#141D2C] text-[#D6A13A] text-[11px] font-bold uppercase tracking-wider border-b border-white/10"'
);
code = code.replace(
  'className="divide-y divide-[#DEDBD4]"',
  'className="divide-y divide-white/5"'
);
code = code.replace(
  "idx % 2 === 0 ? 'bg-white' : 'bg-[#F7F5F0]/70 hover:bg-[#F7F5F0]'",
  "idx % 2 === 0 ? 'bg-[#101725]' : 'bg-[#141D2C]/40 hover:bg-[#141D2C]'"
);
code = code.replaceAll(
  'font-bold text-[#101A27]',
  'font-bold text-[#F6F3ED]'
);
code = code.replaceAll(
  'bg-[#EDEAE4] overflow-hidden shrink-0 flex items-center justify-center p-1',
  'bg-[#141D2C] border border-white/10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center p-1'
);
code = code.replaceAll(
  'className="object-contain mix-blend-multiply"',
  'className="object-contain"'
);
code = code.replaceAll(
  'className="py-3.5 px-3 text-slate-600"',
  'className="py-3.5 px-3 text-[#AEB7C4]"'
);
code = code.replaceAll(
  'className="py-3.5 px-4 text-slate-600 hidden md:table-cell"',
  'className="py-3.5 px-4 text-[#AEB7C4] hidden md:table-cell"'
);
code = code.replaceAll(
  'className="inline-flex items-center justify-center px-3 py-1.5 rounded bg-[#101A27] text-[#C5A15D] hover:text-white text-xs font-bold transition-colors"',
  'className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-[#D6A13A] hover:bg-[#E5B14B] text-[#090D15] text-xs font-bold transition-colors shadow-sm"'
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('✓ src/components/fleet/FleetCatalog.tsx comparison matrix updated with royal dark luxury theme');
