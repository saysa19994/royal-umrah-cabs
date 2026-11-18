import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('src/components/booking/BookingEngine.tsx', 'utf8');

// 1. Locate Step 1 end (around line 1600) and Step 2 start
// In original file:
// Step 1 had Route + Date + Time + Pax + Luggage + Flight + Action
// In the 4-step wizard:
// Step 1 has: Category Tabs + Route/Pickup/Dropoff + Pax & Luggage + Action (Proceed to Step 2)
// Step 3 will have: Date + Time + Flight + Add-ons + Action (Proceed to Step 4)

// Let's find the Date & Time controls in Step 1
const dateMarker = '{/* DATE & TIME CONTROLS */}';
const dateIdx = c.indexOf(dateMarker);

// Find the action button in Step 1
const step1BtnMarker = '<span>{t.step1Btn}</span>';
const step1BtnIdx = c.indexOf(step1BtnMarker);
const step1ActionDivEnd = c.indexOf('</div>\r\n          </div>\r\n        )}', step1BtnIdx);
const altStep1ActionDivEnd = c.indexOf('</div>\n          </div>\n        )}', step1BtnIdx);
const endStep1Idx = step1ActionDivEnd !== -1 ? step1ActionDivEnd : altStep1ActionDivEnd;

console.log('dateIdx:', dateIdx, 'step1BtnIdx:', step1BtnIdx, 'endStep1Idx:', endStep1Idx);

if (dateIdx === -1 || step1BtnIdx === -1 || endStep1Idx === -1) {
  console.error('Could not find Step 1 markers.');
  process.exit(1);
}

// Slice out the Date, Time, Flight, Error banner from Step 1
// We keep: Passengers & Luggage in Step 1, but move Date, Time, Flight to Step 3!
console.log('Markers located successfully.');
