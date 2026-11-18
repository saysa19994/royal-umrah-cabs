import fs from 'fs';
import path from 'path';

const filePath = 'd:/royal-umrah-cabs/src/app/[locale]/pricing/page.tsx';
let code = fs.readFileSync(filePath, 'utf8');

code = code
  .replaceAll('bg-[#090D15]', 'bg-bg')
  .replaceAll('bg-[#0A0E18]', 'bg-bg-alt')
  .replaceAll('bg-[#101725]', 'bg-surface')
  .replaceAll('bg-[#141D2C]', 'bg-bg-alt')
  .replaceAll('text-[#F6F3ED]', 'text-ink')
  .replaceAll('text-[#AEB7C4]', 'text-ink-muted')
  .replaceAll('border-white/10', 'border-border')
  .replaceAll('border-white/5', 'border-border/40')
  .replaceAll('text-[#D6A13A]', 'text-gold-dark')
  .replaceAll('border-[#D6A13A]', 'border-gold')
  .replaceAll('border-border/30', 'border-gold/30')
  .replaceAll('from-[#090D15] via-[#090D15]/85 to-[#090D15]/95', 'from-bg via-bg/85 to-bg/95')
  .replaceAll('bg-gradient-to-b from-bg to-surface', 'bg-surface');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully patched pricing page wrapper!');
