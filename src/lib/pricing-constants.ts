/**
 * Single Authoritative Pricing Matrix for Duyuf Alrahman VIP
 *
 * Guaranteed 100% consistency across:
 * - Supabase database prices table and seed data
 * - BookingCard.tsx (Homepage Quick Booking Widget)
 * - BookingEngine.tsx (Dedicated Booking Portal)
 * - pricing-server.ts (Authoritative Server-side Price Calculator)
 */

export const AUTHORITATIVE_TRANSFER_RATES: Record<string, Record<string, number>> = {
  'jeddah-airport-to-makkah': {
    camry: 200,
    staria: 260,
    yukon: 380,
    hiace: 340,
    coaster: 650,
  },
  'makkah-to-jeddah-airport': {
    camry: 200,
    staria: 260,
    yukon: 380,
    hiace: 340,
    coaster: 650,
  },
  'makkah-to-madinah': {
    camry: 450,
    staria: 500,
    yukon: 750,
    hiace: 650,
    coaster: 1200,
  },
  'madinah-to-makkah': {
    camry: 450,
    staria: 500,
    yukon: 750,
    hiace: 650,
    coaster: 1200,
  },
  'madinah-airport-to-hotel': {
    camry: 150,
    staria: 190,
    yukon: 280,
    hiace: 250,
    coaster: 550,
  },
  'jeddah-to-madinah': {
    camry: 680,
    staria: 750,
    yukon: 980,
    hiace: 850,
    coaster: 1600,
  },
  'makkah-to-taif': {
    camry: 350,
    staria: 450,
    yukon: 600,
    hiace: 550,
    coaster: 950,
  },
  'taif-to-makkah': {
    camry: 350,
    staria: 450,
    yukon: 600,
    hiace: 550,
    coaster: 950,
  },
  'jeddah-to-taif': {
    camry: 550,
    staria: 650,
    yukon: 850,
    hiace: 800,
    coaster: 1400,
  },
  'riyadh-airport-transfer': {
    camry: 200,
    staria: 280,
    yukon: 450,
    hiace: 400,
    coaster: 750,
  },
  'riyadh-to-makkah': {
    camry: 2200,
    staria: 2600,
    yukon: 3500,
    hiace: 3200,
    coaster: 5500,
  },
  'riyadh-to-madinah': {
    camry: 2200,
    staria: 2600,
    yukon: 3500,
    hiace: 3200,
    coaster: 5500,
  },
};

export const AUTHORITATIVE_HOURLY_RATES_4H: Record<string, number> = {
  camry: 350,
  staria: 400,
  yukon: 600,
  hiace: 500,
  coaster: 800,
};

export const AUTHORITATIVE_ZIYARAT_RATES: Record<string, number> = {
  camry: 250,
  staria: 300,
  yukon: 450,
  hiace: 400,
  coaster: 650,
};

export const AUTHORITATIVE_GROUP_RATES: Record<string, number> = {
  hiace: 600,
  coaster: 800,
};

/**
 * Helper to compute client-side display price consistent with database
 */
export function getEstimatedBasePriceSAR(params: {
  bookingType: 'transfer' | 'hourly' | 'ziyarat' | 'group_bus';
  routeId?: string | null;
  vehicleId: string;
  durationHours?: number | null;
  customRates?: Record<string, Record<string, number>>;
}): number | null {
  const { bookingType, routeId, vehicleId, durationHours, customRates } = params;

  if (bookingType === 'transfer') {
    if (!routeId) return null;
    if (customRates && customRates[routeId]?.[vehicleId]) {
      return customRates[routeId][vehicleId];
    }
    return AUTHORITATIVE_TRANSFER_RATES[routeId]?.[vehicleId] ?? null;
  }

  if (bookingType === 'hourly') {
    const base4h = AUTHORITATIVE_HOURLY_RATES_4H[vehicleId];
    if (!base4h) return null;
    const hours = durationHours && durationHours >= 2 && durationHours <= 24 ? durationHours : 4;
    const blocks = Math.ceil(hours / 4);
    return base4h * blocks;
  }

  if (bookingType === 'ziyarat') {
    return AUTHORITATIVE_ZIYARAT_RATES[vehicleId] ?? null;
  }

  if (bookingType === 'group_bus') {
    return AUTHORITATIVE_GROUP_RATES[vehicleId] ?? null;
  }

  return null;
}
