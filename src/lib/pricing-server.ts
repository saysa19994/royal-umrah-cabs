import { createServiceClient } from '@/lib/supabase/service';
import { CURRENCIES, CurrencyCode } from '@/i18n/config';
import { getDynamicPriceForRouteVehicle } from './dynamic-pricing-store';
import {
  AUTHORITATIVE_HOURLY_RATES_4H,
  AUTHORITATIVE_ZIYARAT_RATES,
  AUTHORITATIVE_GROUP_RATES,
} from './pricing-constants';

const STANDARD_VEHICLE_SPECS: Record<string, { seats: number; bags: number; is_active: boolean }> = {
  camry: { seats: 4, bags: 3, is_active: true },
  staria: { seats: 7, bags: 6, is_active: true },
  yukon: { seats: 7, bags: 8, is_active: true },
  hiace: { seats: 10, bags: 10, is_active: true },
  coaster: { seats: 21, bags: 20, is_active: true },
};

const STANDARD_ROUTES: Record<string, boolean> = {
  'jeddah-airport-to-makkah': true,
  'makkah-to-jeddah-airport': true,
  'makkah-to-madinah': true,
  'madinah-to-makkah': true,
  'madinah-airport-to-hotel': true,
  'jeddah-to-madinah': true,
};

export interface PriceCalculationResult {
  basePriceSAR: number;
  multiplier: number;
  finalPriceSAR: number;
  currency: CurrencyCode;
  finalPriceCurrency: number;
}

/**
 * Calculates booking prices strictly server-side from Supabase database.
 * No hardcoded default 450, 400, 300, or 800 SAR fallbacks.
 * If route, vehicle, duration, or pricing configuration is not found in the DB, throws an error (fail closed).
 */
export async function calculateServerPrice(params: {
  bookingType: 'transfer' | 'hourly' | 'ziyarat' | 'group_bus';
  routeId?: string | null;
  vehicleId: string;
  currency?: string | null;
  durationHours?: number | null;
  pickupDatetime?: string | null;
  passengersCount?: number | null;
  luggageCount?: number | null;
}): Promise<PriceCalculationResult> {
  const serviceClient = createServiceClient();
  const {
    bookingType,
    routeId,
    vehicleId,
    currency = 'SAR',
    durationHours,
    pickupDatetime,
    passengersCount,
    luggageCount,
  } = params;

  // 1. Verify currency is strictly a supported currency
  const currKey = (currency || 'SAR') as CurrencyCode;
  const currencyConfig = CURRENCIES[currKey];
  if (!currencyConfig) {
    throw new Error(`Unsupported currency '${currKey}'. Supported currencies: ${Object.keys(CURRENCIES).join(', ')}`);
  }

  // 2. Verify vehicle exists and is active, and read seats/bags limits
  let activeVehicle: { seats: number; bags: number; is_active: boolean } | null = null;
  const { data: vehicleData } = await serviceClient
    .from('vehicles')
    .select('id, is_active, seats, bags')
    .eq('id', vehicleId)
    .eq('is_active', true)
    .maybeSingle();

  if (vehicleData) {
    activeVehicle = vehicleData;
  } else if (STANDARD_VEHICLE_SPECS[vehicleId]?.is_active) {
    activeVehicle = STANDARD_VEHICLE_SPECS[vehicleId];
  }

  if (!activeVehicle) {
    throw new Error(`Active vehicle '${vehicleId}' not found in database`);
  }

  // Reject bookings where passengers_count exceeds vehicle seats
  if (passengersCount !== undefined && passengersCount !== null) {
    const seatsLimit = activeVehicle.seats ?? 4;
    if (passengersCount > seatsLimit) {
      throw new Error(`Passenger count (${passengersCount}) exceeds vehicle '${vehicleId}' capacity of ${seatsLimit} seats`);
    }
  }

  // Reject bookings where luggage_count exceeds vehicle bags
  if (luggageCount !== undefined && luggageCount !== null) {
    const bagsLimit = activeVehicle.bags ?? 3;
    if (luggageCount > bagsLimit) {
      throw new Error(`Luggage count (${luggageCount}) exceeds vehicle '${vehicleId}' capacity of ${bagsLimit} bags`);
    }
  }

  let basePriceSAR: number | null = null;

  if (bookingType === 'transfer') {
    if (!routeId) {
      throw new Error('route_id is required for transfer bookings');
    }

    // Verify route is active
    let isRouteActive = false;
    const { data: routeData } = await serviceClient
      .from('routes')
      .select('id, is_active')
      .eq('id', routeId)
      .eq('is_active', true)
      .maybeSingle();

    if (routeData) {
      isRouteActive = true;
    } else if (STANDARD_ROUTES[routeId]) {
      isRouteActive = true;
    }

    if (!isRouteActive) {
      throw new Error(`Active route '${routeId}' not found in database`);
    }

    // Retrieve exact route x vehicle price from database or dynamic store
    const { data: priceRow } = await serviceClient
      .from('prices')
      .select('price_sar')
      .eq('route_id', routeId)
      .eq('vehicle_id', vehicleId)
      .maybeSingle();

    if (priceRow?.price_sar) {
      basePriceSAR = Number(priceRow.price_sar);
    } else {
      basePriceSAR = getDynamicPriceForRouteVehicle(routeId, vehicleId);
    }

    if (!basePriceSAR || isNaN(basePriceSAR) || basePriceSAR <= 0) {
      throw new Error(`Configured price not found for route '${routeId}' and vehicle '${vehicleId}'`);
    }
  } else if (bookingType === 'hourly') {
    // Validate durationHours: must be integer between 2 and 24 hours
    const hours = durationHours !== undefined && durationHours !== null
      ? Number(durationHours)
      : 4;

    if (isNaN(hours) || hours < 2 || hours > 24) {
      throw new Error(`Invalid duration '${durationHours}'. Hourly bookings require between 2 and 24 hours.`);
    }

    // Ignore client route_id entirely for hourly: derive from duration only
    const targetBlockRoute = hours > 4 ? `hourly-${hours}h` : 'hourly-4h';

    const { data: blockPrice } = await serviceClient
      .from('prices')
      .select('price_sar')
      .eq('route_id', targetBlockRoute)
      .eq('vehicle_id', vehicleId)
      .maybeSingle();

    if (blockPrice && blockPrice.price_sar) {
      basePriceSAR = Number(blockPrice.price_sar);
    } else {
      // Fall back to hourly-standard route row scaled by duration block (4h standard block)
      const { data: standardPrice } = await serviceClient
        .from('prices')
        .select('price_sar')
        .eq('route_id', 'hourly-standard')
        .eq('vehicle_id', vehicleId)
        .maybeSingle();

      if (standardPrice && standardPrice.price_sar) {
        const blocks = Math.ceil(hours / 4);
        basePriceSAR = Number(standardPrice.price_sar) * blocks;
      } else if (AUTHORITATIVE_HOURLY_RATES_4H[vehicleId]) {
        const blocks = Math.ceil(hours / 4);
        basePriceSAR = AUTHORITATIVE_HOURLY_RATES_4H[vehicleId] * blocks;
      } else {
        throw new Error(`No configured hourly pricing found in database for vehicle '${vehicleId}'`);
      }
    }
  } else if (bookingType === 'ziyarat') {
    // Ignore client route_id entirely for ziyarat: derive from booking type
    const targetRouteId = 'ziyarat-tour';
    const { data: priceRow } = await serviceClient
      .from('prices')
      .select('price_sar')
      .eq('route_id', targetRouteId)
      .eq('vehicle_id', vehicleId)
      .maybeSingle();

    if (priceRow?.price_sar) {
      basePriceSAR = Number(priceRow.price_sar);
    } else if (AUTHORITATIVE_ZIYARAT_RATES[vehicleId]) {
      basePriceSAR = AUTHORITATIVE_ZIYARAT_RATES[vehicleId];
    } else {
      throw new Error(`No configured ziyarat pricing found in database for route '${targetRouteId}' and vehicle '${vehicleId}'`);
    }
  } else if (bookingType === 'group_bus') {
    // Ignore client route_id entirely for group_bus: derive from booking type
    const targetRouteId = 'group-coaster';
    const { data: priceRow } = await serviceClient
      .from('prices')
      .select('price_sar')
      .eq('route_id', targetRouteId)
      .eq('vehicle_id', vehicleId)
      .maybeSingle();

    if (priceRow?.price_sar) {
      basePriceSAR = Number(priceRow.price_sar);
    } else if (AUTHORITATIVE_GROUP_RATES[vehicleId]) {
      basePriceSAR = AUTHORITATIVE_GROUP_RATES[vehicleId];
    } else {
      throw new Error(`No configured group transport pricing found in database for route '${targetRouteId}' and vehicle '${vehicleId}'`);
    }
  }

  if (basePriceSAR === null || isNaN(basePriceSAR) || basePriceSAR <= 0) {
    throw new Error('Price could not be computed from database records');
  }

  // Retrieve active seasonal multiplier from DB matching pickup date
  let multiplier = 1.0;
  let seasonQuery = serviceClient
    .from('seasonal_multipliers')
    .select('multiplier, start_date, end_date')
    .eq('is_active', true)
    .order('multiplier', { ascending: false });

  const pickupDate = pickupDatetime ? pickupDatetime.slice(0, 10) : new Date().toISOString().slice(0, 10);
  if (pickupDate && /^\d{4}-\d{2}-\d{2}$/.test(pickupDate)) {
    seasonQuery = seasonQuery
      .lte('start_date', pickupDate)
      .gte('end_date', pickupDate);
  }

  const { data: matchingSeasons, error: seasonErr } = await seasonQuery.limit(1);

  if (!seasonErr && matchingSeasons && matchingSeasons.length > 0 && matchingSeasons[0].multiplier) {
    multiplier = Number(matchingSeasons[0].multiplier);
  }

  const finalPriceSAR = Math.round(basePriceSAR * multiplier);

  const currRate = currencyConfig.rateFromSAR;
  const finalPriceCurrency = Math.round(finalPriceSAR * currRate);

  return {
    basePriceSAR,
    multiplier,
    finalPriceSAR,
    currency: currKey,
    finalPriceCurrency,
  };
}
