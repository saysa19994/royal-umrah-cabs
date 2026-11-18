import { readFileSync } from 'fs';

let c = readFileSync('src/components/booking/BookingEngine.tsx', 'utf8');

const s2Marker = '{/* STEP 2: CHOOSE VEHICLE & FARE SELECTION';
const s2Idx = c.indexOf(s2Marker);

const s3Marker = '{/* STEP 3: PASSENGER DETAILS & MANDATORY PAYMENT POLICY';
const s3Idx = c.indexOf(s3Marker);

const s3BtnMarker = '<span>{t.step3Btn}</span>';
const s3BtnIdx = c.indexOf(s3BtnMarker);

console.log('s2Idx:', s2Idx, 's3Idx:', s3Idx, 's3BtnIdx:', s3BtnIdx);
