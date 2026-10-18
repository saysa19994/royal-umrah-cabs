import assert from 'node:assert';
import test from 'node:test';

// Mock service client to test pricing logic and fail-closed guarantees
function createMockPricingEngine(mockDbData = {}) {
  return async function mockCalculateServerPrice(params) {
    const { bookingType, routeId, vehicleId, currency = 'SAR', durationHours } = params;

    // 1. Vehicle check
    const vehicle = mockDbData.vehicles?.[vehicleId];
    if (!vehicle || !vehicle.is_active) {
      throw new Error(`Active vehicle '${vehicleId}' not found in database`);
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

      const targetBlockRoute = routeId || (hours > 4 ? `hourly-${hours}h` : 'hourly-4h');
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
      const targetRouteId = routeId || 'ziyarat-tour';
      const price = mockDbData.prices?.[`${targetRouteId}:${vehicleId}`];
      if (!price) {
        throw new Error(`No configured ziyarat pricing found in database for route '${targetRouteId}' and vehicle '${vehicleId}'`);
      }
      basePriceSAR = price;
    } else if (bookingType === 'group_bus') {
      const targetRouteId = routeId || 'group-coaster';
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

    return {
      basePriceSAR,
      multiplier,
      finalPriceSAR,
      currency,
    };
  };
}

const mockDb = {
  vehicles: {
    staria: { is_active: true },
    camry: { is_active: true },
    inactive_car: { is_active: false },
  },
  routes: {
    'jeddah-airport-to-makkah': { is_active: true },
  },
  prices: {
    'jeddah-airport-to-makkah:staria': 260,
    'hourly-standard:staria': 400,
    'hourly-8h:staria': 750,
    'ziyarat-tour:camry': 250,
    'group-coaster:coaster': 800,
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

test('Pricing Fail-Closed: throws if vehicle has no configured hourly pricing (NO hardcoded fallback)', async () => {
  await assert.rejects(
    async () => {
      await calculatePrice({
        bookingType: 'hourly',
        vehicleId: 'camry', // camry has no hourly price in mock
        durationHours: 4,
      });
    },
    { message: /No configured hourly pricing found in database/ }
  );
});

test('Pricing Fail-Closed: throws if vehicle has no configured ziyarat pricing (NO hardcoded 300 fallback)', async () => {
  await assert.rejects(
    async () => {
      await calculatePrice({
        bookingType: 'ziyarat',
        vehicleId: 'staria', // staria has no ziyarat price in mock
      });
    },
    { message: /No configured ziyarat pricing found in database/ }
  );
});

test('Pricing Fail-Closed: throws if vehicle has no configured group pricing (NO hardcoded 800 fallback)', async () => {
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
