import fs from 'fs';

let content = fs.readFileSync('src/components/home/BookingCard.tsx', 'utf8');

const oldBlock = `    if (!targetUrl) {
      // Seamless client-side fallback
      const fallbackRef = 'RUC-' + Math.floor(10000 + Math.random() * 90000);
      const fallbackMsg = \`Assalamu Alaikum Royal Umrah Cabs [Ref: \${fallbackRef}]\\nRoute: \${routeText}\\nVehicle: \${vehicleText}\\nDate: \${date || 'Flexible'}\\nPassengers: \${passengers}\\nFixed Price: \${baseSAR || 'Quote Needed'} SAR\`;
      targetUrl = \`https://wa.me/966567588261?text=\${encodeURIComponent(fallbackMsg)}\`;
    }`;

const newBlock = `    if (!targetUrl) {
      // Seamless client-side fallback with alternating numbers and REF-A / REF-B
      const isNumB = Math.random() > 0.5;
      const targetPhone = isNumB ? '966505316971' : '966567588261';
      const refPrefix = isNumB ? 'REF-B' : 'REF-A';
      const fallbackRef = \`\${refPrefix}-\` + Math.floor(10000 + Math.random() * 90000);
      const fallbackMsg = \`Assalamu Alaikum Royal Umrah Cabs [\${fallbackRef}]\\nRoute: \${routeText}\\nVehicle: \${vehicleText}\\nDate: \${date || 'Flexible'}\\nPassengers: \${passengers}\\nFixed Price: \${baseSAR || 'Quote Needed'} SAR\`;
      targetUrl = \`https://wa.me/\${targetPhone}?text=\${encodeURIComponent(fallbackMsg)}\`;
    }`;

content = content.replace(/\r\n/g, '\n');
const normalizedOld = oldBlock.replace(/\r\n/g, '\n');

if (content.includes(normalizedOld)) {
  content = content.replace(normalizedOld, newBlock);
  fs.writeFileSync('src/components/home/BookingCard.tsx', content, 'utf8');
  console.log('Successfully updated BookingCard.tsx with alternating WhatsApp numbers!');
} else {
  console.log('Could not find match in BookingCard.tsx');
}
