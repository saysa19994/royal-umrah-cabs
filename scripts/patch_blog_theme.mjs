import fs from 'fs';
import path from 'path';

const filePath = 'd:/royal-umrah-cabs/src/components/blog/EditorialBlogExperience.tsx';
let code = fs.readFileSync(filePath, 'utf8');

code = code
  .replaceAll('bg-white/95', 'bg-surface/95')
  .replaceAll('bg-white/90', 'bg-surface/90')
  .replaceAll('bg-white/10', 'bg-surface')
  .replaceAll('bg-white', 'bg-surface')
  .replaceAll('bg-[#F7F5F0]', 'bg-bg')
  .replaceAll('border-[#E5E0D6]', 'border-border')
  .replaceAll('text-[#101827]', 'text-ink')
  .replaceAll('text-[#64748B]', 'text-ink-muted')
  .replaceAll('text-[#A77B3E]', 'text-gold-dark')
  .replaceAll('hover:border-[#A77B3E]', 'hover:border-gold')
  .replaceAll('text-[#8E672F]', 'text-gold-dark')
  .replaceAll('text-[#F6F3ED]', 'text-ink')
  .replaceAll('text-[#AEB7C4]', 'text-ink-muted')
  .replaceAll('bg-[#101725]', 'bg-surface')
  .replaceAll('bg-[#141D2C]', 'bg-bg-alt')
  .replaceAll('bg-[#0E1420]', 'bg-bg')
  .replaceAll('border-white/10', 'border-border')
  .replaceAll('border-white/5', 'border-border/40')
  .replaceAll('text-[#D6A13A]', 'text-gold-dark')
  .replaceAll('border-[#D6A13A]', 'border-gold');

// Fix modal background container
code = code.replace(
  'className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0E1420] border border-white/15 text-[#F6F3ED] shadow-2xl overflow-hidden"',
  'className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-bg border border-border text-ink shadow-2xl overflow-hidden"'
);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully patched EditorialBlogExperience theme!');
