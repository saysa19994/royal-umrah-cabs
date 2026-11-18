import { readFileSync, writeFileSync } from 'fs';

const filePath = 'src/components/booking/BookingEngine.tsx';
let content = readFileSync(filePath, 'utf8');

console.log('Original content length:', content.length);
// Backup original file before any modifications
writeFileSync('src/components/booking/BookingEngine.tsx.bak', content, 'utf8');
console.log('Backup created at src/components/booking/BookingEngine.tsx.bak');
