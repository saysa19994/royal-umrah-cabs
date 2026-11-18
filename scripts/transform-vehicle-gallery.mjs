import fs from 'fs';
import path from 'path';

const projectRoot = 'D:/royal-umrah-cabs';
const filePath = path.join(projectRoot, 'src/components/fleet/VehicleGallery.tsx');
let code = fs.readFileSync(filePath, 'utf8');

// Tabs container
code = code.replace(
  'className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 w-fit"',
  'className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141D2C] border border-white/10 w-fit"'
);

// Tab button active/inactive
code = code.replaceAll(
  "activeFilter === 'all'\n                ? 'bg-[#101827] text-white shadow-xs'\n                : 'text-slate-600 hover:text-slate-900'",
  "activeFilter === 'all'\n                ? 'bg-[#D6A13A] text-[#090D15] shadow-xs'\n                : 'text-[#AEB7C4] hover:text-[#F6F3ED]'"
);
code = code.replaceAll(
  "activeFilter === 'exterior'\n                ? 'bg-[#101827] text-white shadow-xs'\n                : 'text-slate-600 hover:text-slate-900'",
  "activeFilter === 'exterior'\n                ? 'bg-[#D6A13A] text-[#090D15] shadow-xs'\n                : 'text-[#AEB7C4] hover:text-[#F6F3ED]'"
);
code = code.replaceAll(
  "activeFilter === 'interior'\n                ? 'bg-[#101827] text-white shadow-xs'\n                : 'text-slate-600 hover:text-slate-900'",
  "activeFilter === 'interior'\n                ? 'bg-[#D6A13A] text-[#090D15] shadow-xs'\n                : 'text-[#AEB7C4] hover:text-[#F6F3ED]'"
);

// Expand & Counter buttons
code = code.replace(
  'className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200/90 hover:border-[#C5A15D] text-xs font-bold text-slate-700 hover:text-[#C5A15D] transition-colors shadow-2xs cursor-pointer"',
  'className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141D2C] border border-white/10 hover:border-[#D6A13A] text-xs font-bold text-[#F6F3ED] hover:text-[#D6A13A] transition-colors shadow-2xs cursor-pointer"'
);
code = code.replace(
  'className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200/90 text-xs font-black text-slate-800 shadow-2xs"',
  'className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141D2C] border border-white/10 text-xs font-black text-[#F6F3ED] shadow-2xs"'
);
code = code.replaceAll('text-[#C5A15D]', 'text-[#D6A13A]');
code = code.replaceAll('border-[#C5A15D]', 'border-[#D6A13A]');
code = code.replaceAll('bg-[#C5A15D]', 'bg-[#D6A13A]');
code = code.replaceAll('ring-[#C5A15D]/40', 'ring-[#D6A13A]/40');

// Viewport border
code = code.replace(
  'border border-slate-200/90',
  'border border-white/10'
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('✓ src/components/fleet/VehicleGallery.tsx updated with royal dark luxury theme');
