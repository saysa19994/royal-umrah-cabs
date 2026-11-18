import fs from 'fs';
import path from 'path';

const filePath = 'd:/royal-umrah-cabs/src/components/pricing/RouteBasedPricingExperience.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Replace all hardcoded dark styling tokens with dynamic theme tokens
code = code
  .replaceAll('text-[#AEB7C4]', 'text-ink-muted')
  .replaceAll('text-[#F6F3ED]', 'text-ink')
  .replaceAll('text-[#E2E8F0]', 'text-ink')
  .replaceAll('bg-[#101725]', 'bg-surface')
  .replaceAll('bg-[#141D2C]', 'bg-bg-alt')
  .replaceAll('border-white/10', 'border-border')
  .replaceAll('border-white/5', 'border-border/40')
  .replaceAll('text-[#D6A13A]', 'text-gold-dark')
  .replaceAll('border-[#D6A13A]', 'border-gold')
  .replaceAll('bg-[#D6A13A]', 'bg-gold-dark')
  .replaceAll('bg-[#101827]', 'bg-surface')
  .replaceAll('text-white', 'text-ink')
  .replaceAll('text-[#090D15]', 'text-white');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully patched pricing page theme!');
