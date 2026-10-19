import assert from 'node:assert';
import test from 'node:test';

const SUPPORTED_CURRENCIES = {
  SAR: { rateFromSAR: 1.0 },
  USD: { rateFromSAR: 0.266 },
  MYR: { rateFromSAR: 1.18 },
  GBP: { rateFromSAR: 0.21 },
  EUR: { rateFromSAR: 0.25 },
  IDR: { rateFromSAR: 4350.0 },
  INR: { rateFromSAR: 22.3 },
  PKR: { rateFromSAR: 74.5 },
  EGP: { rateFromSAR: 13.1 },
};

// Mock service client to test pricing logic and fail-closed guarantees
function createMockPricingEngine(mockDbData = {}) {
  return async function mockCalculateServerPrice(params) {
    const {
      bookingType,
      routeId,
      vehicleId,
      currency = 'SAR',
      durationHours,
      passengersCount,
      luggageCount,
    } = params;

    // 0. Currency check - strict without fallback
    const currConfig = SUPPORTED_CURRENCIES[currency];
    if (!currConfig) {
      throw new Error(`Unsupported currency '${currency}'`);
    }

    // 1. Vehicle check with capacity
    const vehicle = mockDbData.vehicles?.[vehicleId];
    if (!vehicle || !vehicle.is_active) {
      throw new Error(`Active vehicle '${vehicleId}' not found in database`);
    }

    if (passengersCount !== undefined && passengersCount !== null) {
      const seatsLimit = vehicle.seats ?? 4;
      if (passengersCount > seatsLimit) {
        throw new Error(`Passenger count (${passengersCount}) exceeds vehicle '${vehicleId}' capacity of ${seatsLimit} seats`);
      }
    }

    if (luggageCount !== undefined && luggageCount !== null) {
      const bagsLimit = vehicle.bags ?? 3;
      if (luggageCount > bagsLimit) {
        throw new Error(`Luggage count (${luggageCount}) exceeds vehicle '${vehicleId}' capacity of ${bagsLimit} bags`);
      }
    }

    let basePriceSAR = null;

    if (bookingType === 'transfer') {
      if (!routeId) {
        throw new Error('route_id is required for transfer bookings');
      }
      const route = mockDbData.routes?.[routeId];
      if (!route || !route.is_active) {
        throw new Error(`Active route '${routeId}' not found in database`);
      }
      const priceKey = `${routeId}:${vehicleId}`;
      const price = mockDbData.prices?.[priceKey];
      if (!price) {
        throw new Error(`Configured price not found for route '${routeId}' and vehicle '${vehicleId}'`);
      }
      basePriceSAR = price;
    } else if (bookingType === 'hourly') {
      const hours = durationHours !== undefined && durationHours !== null
        ? Number(durationHours)
        : 4;

      if (isNaN(hours) || hours < 2 || hours > 24) {
        throw new Error(`Invalid duration '${durationHours}'. Hourly bookings require between 2 and 24 hours.`);
      }

      // Ignore client routeId completely: derive block route from hours
      const targetBlockRoute = hours > 4 ? `hourly-${hours}h` : 'hourly-4h';
      const blockPrice = mockDbData.prices?.[`${targetBlockRoute}:${vehicleId}`];

      if (blockPrice) {
        basePriceSAR = blockPrice;
      } else {
        const standardPrice = mockDbData.prices?.[`hourly-standard:${vehicleId}`];
        if (standardPrice) {
          const blocks = Math.ceil(hours / 4);
          basePriceSAR = standardPrice * blocks;
        } else {
          throw new Error(`No configured hourly pricing found in database for vehicle '${vehicleId}'`);
        }
      }
    } else if (bookingType === 'ziyarat') {
      // Ignore client routeId completely: derive from booking type
      const targetRouteId = 'ziyarat-tour';
      const price = mockDbData.prices?.[`${targetRouteId}:${vehicleId}`];
      if (!price) {
        throw new Error(`No configured ziyarat pricing found in database for route '${targetRouteId}' and vehicle '${vehicleId}'`);
      }
      basePriceSAR = price;
    } else if (bookingType === 'group_bus') {
      // Ignore client routeId completely: derive from booking type
      const targetRouteId = 'group-coaster';
      const price = mockDbData.prices?.[`${targetRouteId}:${vehicleId}`];
      if (!price) {
        throw new Error(`No configured group transport pricing found in database for route '${targetRouteId}' and vehicle '${vehicleId}'`);
      }
      basePriceSAR = price;
    }

    if (basePriceSAR === null || isNaN(basePriceSAR) || basePriceSAR <= 0) {
      throw new Error('Price could not be computed from database records');
    }

    const multiplier = mockDbData.multiplier || 1.0;
    const finalPriceSAR = Math.round(basePriceSAR * multiplier);
    const finalPriceCurrency = Math.round(finalPriceSAR * currConfig.rateFromSAR);

    return {
      basePriceSAR,
      multiplier,
      finalPriceSAR,
      currency,
      finalPriceCurrency,
    };
  };
}

const mockDb = {
  vehicles: {
    staria: { is_active: true, seats: 7, bags: 6 },
    camry: { is_active: true, seats: 4, bags: 3 },
    inactive_car: { is_active: false, seats: 4, bags: 3 },
  },
  routes: {
    'jeddah-airport-to-makkah': { is_active: true },
    'fake-cheap-route': { is_active: true },
  },
  prices: {
    'jeddah-airport-to-makkah:staria': 260,
    'fake-cheap-route:staria': 50,
    'hourly-standard:staria': 400,
    'hourly-8h:staria': 750,
    'ziyarat-tour:camry': 250,
    'group-coaster:staria': 800,
  },
  multiplier: 1.1,
};

const calculatePrice = createMockPricingEngine(mockDb);

test('Transfer Pricing: computes correctly with seasonal multiplier', async () => {
  const result = await calculatePrice({
    bookingType: 'transfer',
    routeId: 'jeddah-airport-to-makkah',
    vehicleId: 'staria',
  });
  assert.strictEqual(result.basePriceSAR, 260);
  assert.strictEqual(result.multiplier, 1.1);
  assert.strictEqual(result.finalPriceSAR, Math.round(260 * 1.1)); // 286
});

test('Transfer Pricing: throws if routeId is missing', async () => {
  await assert.rejects(
    async () => {
      await calculatePrice({
        bookingType: 'transfer',
        vehicleId: 'staria',
      });
    },
    { message: /route_id is required/ }
  );
});

test('Hourly Pricing: validates durationHours minimum 2 hours', async () => {
  await assert.rejects(
    async () => {
      await calculatePrice({
        bookingType: 'hourly',
        vehicleId: 'staria',
        durationHours: 1, // too low
      });
    },
    { message: /Hourly bookings require between 2 and 24 hours/ }
  );
});

test('Hourly Pricing: validates durationHours maximum 24 hours', async () => {
  await assert.rejects(
    async () => {
      await calculatePrice({
        bookingType: 'hourly',
        vehicleId: 'staria',
        durationHours: 25, // too high
      });
    },
    { message: /Hourly bookings require between 2 and 24 hours/ }
  );
});

test('Hourly Pricing: matches exact block price if configured (8h block)', async () => {
  const result = await calculatePrice({
    bookingType: 'hourly',
    vehicleId: 'staria',
    durationHours: 8,
  });
  assert.strictEqual(result.basePriceSAR, 750);
});

test('Hourly Pricing: scales standard 4h block when exact block not configured', async () => {
  const result = await calculatePrice({
    bookingType: 'hourly',
    vehicleId: 'staria',
    durationHours: 4,
  });
  assert.strictEqual(result.basePriceSAR, 400);
});

test('Pricing Security: hourly booking ignores client-supplied route_id', async () => {
  // Client maliciously sends routeId: 'fake-cheap-route' (50 SAR) for an hourly booking
  const result = await calculatePrice({
    bookingType: 'hourly',
    routeId: 'fake-cheap-route',
    vehicleId: 'staria',
    durationHours: 8,
  });
  // Must use hourly-8h (750 SAR) and ignore fake-cheap-route completely
  assert.strictEqual(result.basePriceSAR, 750);
});

test('Pricing Security: ziyarat booking ignores client-supplied route_id', async () => {
  // Client maliciously sends routeId: 'fake-cheap-route' for ziyarat
  const result = await calculatePrice({
    bookingType: 'ziyarat',
    routeId: 'fake-cheap-route',
    vehicleId: 'camry',
  });
  // Must derive price from ziyarat-tour:camry (250 SAR)
  assert.strictEqual(result.basePriceSAR, 250);
});

test('Pricing Security: group_bus booking ignores client-supplied route_id', async () => {
  const result = await calculatePrice({
    bookingType: 'group_bus',
    routeId: 'fake-cheap-route',
    vehicleId: 'staria',
  });
  // Must derive price from group-coaster:staria (800 SAR)
  assert.strictEqual(result.basePriceSAR, 800);
});

test('Currency Security: rejects unknown currency without fallback', async () => {
  await assert.rejects(
    async () => {
      await calculatePrice({
        bookingType: 'transfer',
        routeId: 'jeddah-airport-to-makkah',
        vehicleId: 'staria',
        currency: 'XYZ_HACK',
      });
    },
    { message: /Unsupported currency 'XYZ_HACK'/ }
  );
});

test('Capacity Enforcement: rejects passenger count exceeding vehicle seats', async () => {
  await assert.rejects(
    async () => {
      await calculatePrice({
        bookingType: 'transfer',
        routeId: 'jeddah-airport-to-makkah',
        vehicleId: 'camry', // seats: 4
        passengersCount: 6, // exceeds 4
      });
    },
    { message: /Passenger count \(6\) exceeds vehicle 'camry' capacity of 4 seats/ }
  );
});

test('Capacity Enforcement: rejects luggage count exceeding vehicle bags', async () => {
  await assert.rejects(
    async () => {
      await calculatePrice({
        bookingType: 'transfer',
        routeId: 'jeddah-airport-to-makkah',
        vehicleId: 'camry', // bags: 3
        luggageCount: 5, // exceeds 3
      });
    },
    { message: /Luggage count \(5\) exceeds vehicle 'camry' capacity of 3 bags/ }
  );
});

test('Pricing Fail-Closed: throws if vehicle has no configured hourly pricing', async () => {
  await assert.rejects(
    async () => {
      await calculatePrice({
        bookingType: 'hourly',
        vehicleId: 'camry',
        durationHours: 4,
      });
    },
    { message: /No configured hourly pricing found in database/ }
  );
});

test('Pricing Fail-Closed: throws if vehicle has no configured ziyarat pricing', async () => {
  await assert.rejects(
    async () => {
      await calculatePrice({
        bookingType: 'ziyarat',
        vehicleId: 'staria',
      });
    },
    { message: /No configured ziyarat pricing found in database/ }
  );
});

test('Pricing Fail-Closed: throws if vehicle has no configured group pricing', async () => {
  await assert.rejects(
    async () => {
      await calculatePrice({
        bookingType: 'group_bus',
        vehicleId: 'camry',
      });
    },
    { message: /No configured group transport pricing found in database/ }
  );
});

test('Pricing Fail-Closed: throws if vehicle is inactive', async () => {
  await assert.rejects(
    async () => {
      await calculatePrice({
        bookingType: 'transfer',
        routeId: 'jeddah-airport-to-makkah',
        vehicleId: 'inactive_car',
      });
    },
    { message: /Active vehicle 'inactive_car' not found in database/ }
  );
});

console.log('All pricing unit tests configured successfully.');
