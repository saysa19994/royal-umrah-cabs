import fs from 'fs';
import path from 'path';

const filePath = 'd:/royal-umrah-cabs/src/components/ziyarat/SacredZiyaratExperience.tsx';
let code = fs.readFileSync(filePath, 'utf8');

code = code
  .replaceAll('bg-[#F7F5F0]', 'bg-bg')
  .replaceAll('text-[#101827]', 'text-ink')
  .replaceAll('border-[#E5E0D6]', 'border-border')
  .replaceAll('text-[#64748B]', 'text-ink-muted')
  .replaceAll('text-[#334155]', 'text-ink')
  .replaceAll('bg-white', 'bg-surface')
  .replaceAll('text-[#A77B3E]', 'text-gold-dark')
  .replaceAll('border-[#A77B3E]', 'border-gold')
  .replaceAll('bg-[#A77B3E]', 'bg-gold-dark')
  .replaceAll('bg-[#FDFBF7]', 'bg-bg-alt');

// Fix toggle buttons for cities
code = code.replaceAll('bg-[#101827] text-white shadow-sm', 'bg-gold-dark text-white shadow-sm');
code = code.replaceAll('bg-[#101827] text-white flex items-center justify-center font-bold text-[11px] shrink-0', 'bg-gold-dark text-white flex items-center justify-center font-bold text-[11px] shrink-0');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully patched SacredZiyaratExperience theme!');
