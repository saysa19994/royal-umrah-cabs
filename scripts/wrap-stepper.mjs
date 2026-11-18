import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('src/components/booking/BookingEngine.tsx', 'utf8');

const target = `{/* 3-STEP PROGRESS STEPPER */}`;
const idx = c.indexOf(target);
if (idx !== -1) {
  const divStart = c.indexOf('<div className="grid grid-cols-3', idx);
  // Find the closing </div> of that grid
  const divEnd = c.indexOf('</div>', c.indexOf('</div>', divStart) + 1);
  const closingDiv = '</div>';
  const endOfStepper = c.indexOf(closingDiv, c.indexOf(closingDiv, divStart + 1) + 1) + closingDiv.length;

  const stepperHtml = c.substring(divStart, endOfStepper);
  const wrapped = `{!hideInternalStepper && (\n          ${stepperHtml}\n        )}`;

  c = c.substring(0, divStart) + wrapped + c.substring(endOfStepper);
  writeFileSync('src/components/booking/BookingEngine.tsx', c, 'utf8');
  console.log('Successfully wrapped internal stepper.');
} else {
  console.error('Target not found');
}
