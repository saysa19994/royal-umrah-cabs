import { readFileSync, writeFileSync } from 'fs';

const path = 'src/app/[locale]/booking/page.tsx';
let content = readFileSync(path, 'utf8');

// Replace BookingEngine component with BookingWizard (handle CRLF)
const idx = content.indexOf('<BookingEngine');
const endMarker = '/>';
// Find the closing /> of the BookingEngine component
let closeIdx = content.indexOf('/>', idx);
// Keep searching until we find the one that closes the component (after last prop)
// The component ends with initialRates={...}\r\n        />
const closeTag = '        />';
const closeTagIdx = content.indexOf(closeTag, idx);

if (closeTagIdx < 0) {
  console.log('Could not find closing tag');
  process.exit(1);
}

const before = content.substring(0, idx);
const after = content.substring(closeTagIdx + closeTag.length);

const newComponent = `<BookingWizard
          locale={locale}
          dict={dict}
          settings={settings}
          initialRoute={resolvedRoute}
          initialVehicle={resolvedVehicle}
          initialDate={resolvedDate}
          initialTime={resolvedTime}
          initialPassengers={resolvedPassengers}
          initialLuggage={resolvedLuggage}
          initialType={resolvedType}
          initialDuration={resolvedDuration}
          initialPickup={resolvedPickup}
          initialDropoff={resolvedDropoff}
          initialRates={await getDbPricesCached()}
        />`;

const newContent = before + newComponent + after;
writeFileSync(path, newContent, 'utf8');
console.log('SUCCESS: Replaced BookingEngine with BookingWizard');
console.log('chars replaced from', idx, 'to', closeTagIdx + closeTag.length);
// Also verify the import line
if (newContent.includes("import { BookingWizard }")) {
  console.log('Import line confirmed present');
} else {
  console.log('WARNING: Import line may be missing');
}
