import { AUTHORITATIVE_TRANSFER_RATES } from '../src/lib/pricing-constants';
import { calculateServerPrice } from '../src/lib/pricing-server';

console.log('Testing Pricing Parity & Regression...');

const EXPECTED_APPROVED_PRICES = {
  'jeddah-airport-to-makkah': { camry: 200, staria: 250, hiace: 280, yukon: 450, coaster: 450 },
  'makkah-to-jeddah-airport': { camry: 200, staria: 250, hiace: 280, yukon: 450, coaster: 450 },
  'makkah-to-madinah': { camry: 400, staria: 500, hiace: 600, yukon: 1000 },
  'madinah-to-makkah': { camry: 400, staria: 500, hiace: 600, yukon: 1000 },
  'madinah-airport-to-hotel': { camry: 200, staria: 250, hiace: 300, yukon: 500, coaster: 600 },
  'jeddah-to-madinah': { camry: 400, staria: 500, hiace: 600, yukon: 1000, coaster: 1000 },
  'makkah-to-taif': { camry: 400, staria: 500, hiace: 600, yukon: 750, coaster: 900 },
  'taif-to-makkah': { camry: 400, staria: 500, hiace: 600, yukon: 750, coaster: 900 },
  'jeddah-to-taif': { camry: 500, staria: 600, hiace: 650, yukon: 800, coaster: 850 },
  'makkah-ziyarat': { camry: 250, staria: 300, hiace: 330, yukon: 450, coaster: 500 },
  'madinah-ziyarat': { camry: 250, staria: 300, hiace: 330, yukon: 450, coaster: 500 },
  'riyadh-to-makkah': { camry: 1800, staria: 2200, hiace: 2500, yukon: 2600 },
  'riyadh-to-madinah': { camry: 2000, staria: 2200, hiace: 2400, yukon: 2500 },
};

let errors = 0;
let passed = 0;

for (const [routeId, expectedVehicles] of Object.entries(EXPECTED_APPROVED_PRICES)) {
  const authRoute = AUTHORITATIVE_TRANSFER_RATES[routeId];
  if (!authRoute) {
    console.error(`❌ Missing route in AUTHORITATIVE_TRANSFER_RATES: ${routeId}`);
    errors++;
    continue;
  }

  for (const [vehicleId, expectedPrice] of Object.entries(expectedVehicles)) {
    const actualPrice = authRoute[vehicleId];
    if (actualPrice !== expectedPrice) {
      console.error(
        `❌ Price mismatch in matrix for ${routeId} x ${vehicleId}: expected ${expectedPrice}, got ${actualPrice}`
      );
      errors++;
    } else {
      passed++;
    }
  }
}

// Now test calculateServerPrice across standard transfer routes
async function testServerCalculations() {
  const sampleTestPoints = [
    { bookingType: 'transfer', routeId: 'jeddah-airport-to-makkah', vehicleId: 'camry', expectedSAR: 200 },
    { bookingType: 'transfer', routeId: 'makkah-to-madinah', vehicleId: 'staria', expectedSAR: 500 },
    { bookingType: 'transfer', routeId: 'madinah-airport-to-hotel', vehicleId: 'hiace', expectedSAR: 300 },
    { bookingType: 'transfer', routeId: 'jeddah-to-madinah', vehicleId: 'yukon', expectedSAR: 1000 },
    { bookingType: 'ziyarat', routeId: 'makkah-ziyarat', vehicleId: 'camry', expectedSAR: 250 },
    { bookingType: 'ziyarat', routeId: 'madinah-ziyarat', vehicleId: 'coaster', expectedSAR: 500 },
  ];

  for (const pt of sampleTestPoints) {
    try {
      const res = await calculateServerPrice({
        bookingType: pt.bookingType,
        routeId: pt.routeId,
        vehicleId: pt.vehicleId,
        currency: 'SAR',
      });
      if (res.basePriceSAR !== pt.expectedSAR) {
        console.error(
          `❌ Server price mismatch for ${pt.routeId || pt.bookingType} x ${pt.vehicleId}: expected ${pt.expectedSAR}, got ${res.basePriceSAR}`
        );
        errors++;
      } else {
        passed++;
      }
    } catch (err) {
      console.error(`❌ Error calculating server price for ${pt.routeId} x ${pt.vehicleId}:`, err);
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`\nFAILED: ${errors} pricing discrepancies detected!`);
    process.exit(1);
  } else {
    console.log(`\n✅ ALL TESTS PASSED: ${passed} parity checks verified with 0 discrepancies!`);
  }
}

testServerCalculations();
