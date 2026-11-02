import { calculateServerPrice } from '../src/lib/pricing-server';
import { AUTHORITATIVE_TRANSFER_RATES } from '../src/lib/pricing-constants';

console.log('================================================================');
console.log('   PHASE 04A ACCEPTANCE: REAL BOOKING FLOWS VERIFICATION        ');
console.log('================================================================\n');

const testCases = [
  // 1. Camry tests (Capacity: 4 seats, 3 bags)
  {
    category: 'Camry Executive',
    vehicleId: 'camry',
    routeId: 'jeddah-airport-to-makkah',
    bookingType: 'transfer',
    passengers: 3,
    luggage: 2,
    expectedSAR: 200,
  },
  {
    category: 'Camry Executive',
    vehicleId: 'camry',
    routeId: 'madinah-airport-to-hotel',
    bookingType: 'transfer',
    passengers: 2,
    luggage: 2,
    expectedSAR: 200,
  },
  {
    category: 'Camry Executive',
    vehicleId: 'camry',
    routeId: 'makkah-to-madinah',
    bookingType: 'transfer',
    passengers: 4,
    luggage: 3,
    expectedSAR: 400,
  },
  {
    category: 'Camry Executive',
    vehicleId: 'camry',
    routeId: 'makkah-ziyarat',
    bookingType: 'ziyarat',
    passengers: 4,
    luggage: 0,
    expectedSAR: 250,
  },

  // 2. Staria VIP tests (Capacity: 7 seats, 6 bags)
  {
    category: 'Staria VIP',
    vehicleId: 'staria',
    routeId: 'jeddah-airport-to-makkah',
    bookingType: 'transfer',
    passengers: 6,
    luggage: 5,
    expectedSAR: 250,
  },
  {
    category: 'Staria VIP',
    vehicleId: 'staria',
    routeId: 'makkah-to-madinah',
    bookingType: 'transfer',
    passengers: 7,
    luggage: 6,
    expectedSAR: 500,
  },
  {
    category: 'Staria VIP',
    vehicleId: 'staria',
    routeId: 'madinah-ziyarat',
    bookingType: 'ziyarat',
    passengers: 7,
    luggage: 2,
    expectedSAR: 300,
  },
  {
    category: 'Staria VIP',
    vehicleId: 'staria',
    routeId: 'makkah-to-taif',
    bookingType: 'transfer',
    passengers: 5,
    luggage: 4,
    expectedSAR: 500,
  },

  // 3. Yukon XL VIP tests (Capacity: 7 seats, 8 bags)
  {
    category: 'Yukon XL VIP',
    vehicleId: 'yukon',
    routeId: 'jeddah-airport-to-makkah',
    bookingType: 'transfer',
    passengers: 7,
    luggage: 8,
    expectedSAR: 450,
  },
  {
    category: 'Yukon XL VIP',
    vehicleId: 'yukon',
    routeId: 'madinah-airport-to-hotel',
    bookingType: 'transfer',
    passengers: 5,
    luggage: 6,
    expectedSAR: 500,
  },
  {
    category: 'Yukon XL VIP',
    vehicleId: 'yukon',
    routeId: 'makkah-to-madinah',
    bookingType: 'transfer',
    passengers: 7,
    luggage: 8,
    expectedSAR: 1000,
  },
  {
    category: 'Yukon XL VIP',
    vehicleId: 'yukon',
    routeId: 'riyadh-to-makkah',
    bookingType: 'transfer',
    passengers: 6,
    luggage: 7,
    expectedSAR: 2600,
  },

  // 4. HiAce VIP tests (Capacity: 10 seats, 10 bags)
  {
    category: 'HiAce VIP',
    vehicleId: 'hiace',
    routeId: 'jeddah-airport-to-makkah',
    bookingType: 'transfer',
    passengers: 10,
    luggage: 10,
    expectedSAR: 280,
  },
  {
    category: 'HiAce VIP',
    vehicleId: 'hiace',
    routeId: 'makkah-to-madinah',
    bookingType: 'transfer',
    passengers: 10,
    luggage: 10,
    expectedSAR: 600,
  },
  {
    category: 'HiAce VIP',
    vehicleId: 'hiace',
    routeId: 'makkah-ziyarat',
    bookingType: 'ziyarat',
    passengers: 10,
    luggage: 0,
    expectedSAR: 330,
  },

  // 5. Coaster VIP Bus tests (Capacity: 21 seats, 20 bags)
  {
    category: 'Coaster VIP Bus',
    vehicleId: 'coaster',
    routeId: 'jeddah-airport-to-makkah',
    bookingType: 'transfer',
    passengers: 21,
    luggage: 20,
    expectedSAR: 450,
  },
  {
    category: 'Coaster VIP Bus',
    vehicleId: 'coaster',
    routeId: 'madinah-airport-to-hotel',
    bookingType: 'transfer',
    passengers: 20,
    luggage: 18,
    expectedSAR: 600,
  },
  {
    category: 'Coaster VIP Bus',
    vehicleId: 'coaster',
    routeId: 'jeddah-to-madinah',
    bookingType: 'transfer',
    passengers: 21,
    luggage: 20,
    expectedSAR: 1000,
  },
  {
    category: 'Coaster VIP Bus',
    vehicleId: 'coaster',
    routeId: 'madinah-ziyarat',
    bookingType: 'ziyarat',
    passengers: 21,
    luggage: 0,
    expectedSAR: 500,
  },
];

let passed = 0;
let failed = 0;

console.log('--- TEST 1: VEHICLE CATEGORY REAL PRICING FLOWS ---');
for (const tc of testCases) {
  try {
    const res = await calculateServerPrice({
      bookingType: tc.bookingType,
      routeId: tc.routeId,
      vehicleId: tc.vehicleId,
      currency: 'SAR',
      passengersCount: tc.passengers,
      luggageCount: tc.luggage,
    });

    const matchesExpected = res.basePriceSAR === tc.expectedSAR;
    if (matchesExpected) {
      console.log(`✓ [PASS] ${tc.category.padEnd(16)} | Route: ${tc.routeId.padEnd(25)} | Fare: ${res.basePriceSAR} SAR`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${tc.category} on ${tc.routeId}: expected ${tc.expectedSAR}, got ${res.basePriceSAR}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [ERROR] ${tc.category} on ${tc.routeId}:`, err.message);
    failed++;
  }
}

console.log('\n--- TEST 2: CAPACITY ENFORCEMENT & SAFETY GUARDS ---');

// Test 2A: Camry seat limit exceeded (5 passengers > 4 max)
try {
  await calculateServerPrice({
    bookingType: 'transfer',
    routeId: 'jeddah-airport-to-makkah',
    vehicleId: 'camry',
    passengersCount: 5,
    luggageCount: 2,
  });
  console.error('❌ [FAIL] Expected seat overflow error for Camry with 5 passengers');
  failed++;
} catch (err) {
  if (err.message.includes('exceeds vehicle \'camry\' capacity of 4 seats')) {
    console.log('✓ [PASS] Seat limit guard correctly rejected 5 passengers for Camry (max 4)');
    passed++;
  } else {
    console.error('❌ [FAIL] Unexpected error message:', err.message);
    failed++;
  }
}

// Test 2B: Camry luggage limit exceeded (5 bags > 3 max)
try {
  await calculateServerPrice({
    bookingType: 'transfer',
    routeId: 'jeddah-airport-to-makkah',
    vehicleId: 'camry',
    passengersCount: 3,
    luggageCount: 5,
  });
  console.error('❌ [FAIL] Expected luggage overflow error for Camry with 5 bags');
  failed++;
} catch (err) {
  if (err.message.includes('exceeds vehicle \'camry\' capacity of 3 bags')) {
    console.log('✓ [PASS] Luggage limit guard correctly rejected 5 bags for Camry (max 3)');
    passed++;
  } else {
    console.error('❌ [FAIL] Unexpected error message:', err.message);
    failed++;
  }
}

console.log('\n--- TEST 3: CONCIERGE-ONLY FLEET ENFORCEMENT (MAYBACH & H1) ---');

// Test 3A: Maybach rejected from fixed transfer pricing calculation (Fail-closed)
try {
  await calculateServerPrice({
    bookingType: 'transfer',
    routeId: 'jeddah-airport-to-makkah',
    vehicleId: 'maybach',
  });
  console.error('❌ [FAIL] Maybach should not have a fixed transfer price without concierge booking');
  failed++;
} catch (err) {
  console.log(`✓ [PASS] Maybach is strictly concierge-only: fail-closed with '${err.message}'`);
  passed++;
}

// Test 3B: Hyundai H1 rejected from fixed transfer pricing calculation (Fail-closed)
try {
  await calculateServerPrice({
    bookingType: 'transfer',
    routeId: 'jeddah-airport-to-makkah',
    vehicleId: 'h1',
  });
  console.error('❌ [FAIL] Hyundai H1 should not have a fixed transfer price without concierge booking');
  failed++;
} catch (err) {
  console.log(`✓ [PASS] Hyundai H1 is strictly concierge-only: fail-closed with '${err.message}'`);
  passed++;
}

console.log(`\n================================================================`);
if (failed > 0) {
  console.error(`FAILED: ${failed} booking verification tests failed!`);
  process.exit(1);
} else {
  console.log(`🎉 ALL ${passed} BOOKING VERIFICATION TESTS PASSED SUCCESSFULLY!`);
  process.exit(0);
}
