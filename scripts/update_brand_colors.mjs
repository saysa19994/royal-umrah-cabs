import fs from 'fs';

// 1. Update Header.tsx
let header = fs.readFileSync('d:/royal-umrah-cabs/src/components/layout/Header.tsx', 'utf8');
header = header.replace('bg-[#354B3F] text-white text-[11px]', 'bg-[#101827] text-white text-[11px]');
header = header.replaceAll('bg-[#354B3F]', 'bg-[#A97B27]');
header = header.replaceAll('hover:bg-[#283930]', 'hover:bg-[#93671D]');
header = header.replaceAll('text-[#354B3F]', 'text-[#A97B27]');
header = header.replaceAll('after:bg-[#354B3F]', 'after:bg-[#A97B27]');
header = header.replaceAll('hover:text-[#354B3F]', 'hover:text-[#A97B27]');
header = header.replaceAll('focus-visible:ring-[#354B3F]', 'focus-visible:ring-[#A97B27]');
header = header.replaceAll('focus:ring-[#354B3F]', 'focus:ring-[#A97B27]');
header = header.replaceAll('hover:border-[#354B3F]', 'hover:border-[#A97B27]');
header = header.replaceAll('#26332E', '#101827');
header = header.replace('<Menu className="w-5 h-5 text-[#A97B27]" />', '<Menu className="w-5 h-5 text-[#101827]" />');
fs.writeFileSync('d:/royal-umrah-cabs/src/components/layout/Header.tsx', header, 'utf8');
console.log('Header.tsx updated!');
