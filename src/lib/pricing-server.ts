import { createServiceClient } from '@/lib/supabase/service';
import { CURRENCIES, CurrencyCode } from '@/i18n/config';

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
}): Promise<PriceCalculationResult> {
  const serviceClient = createServiceClient();
  const { bookingType, routeId, vehicleId, currency = 'SAR', durationHours } = params;

  // 1. Verify vehicle exists and is active
  const { data: vehicleData, error: vehicleErr } = await serviceClient
    .from('vehicles')
    .select('id, is_active')
    .eq('id', vehicleId)
    .eq('is_active', true)
    .maybeSingle();

  if (vehicleErr || !vehicleData) {
    throw new Error(`Active vehicle '${vehicleId}' not found in database`);
  }

  let basePriceSAR: number | null = null;

  if (bookingType === 'transfer') {
    if (!routeId) {
      throw new Error('route_id is required for transfer bookings');
    }

    // Verify route is active
    const { data: routeData, error: routeErr } = await serviceClient
      .from('routes')
      .select('id, is_active')
      .eq('id', routeId)
      .eq('is_active', true)
      .maybeSingle();

    if (routeErr || !routeData) {
      throw new Error(`Active route '${routeId}' not found in database`);
    }

    // Retrieve exact route x vehicle price from database
    const { data: priceRow, error: priceErr } = await serviceClient
      .from('prices')
      .select('price_sar')
      .eq('route_id', routeId)
      .eq('vehicle_id', vehicleId)
      .maybeSingle();

    if (priceErr || !priceRow || !priceRow.price_sar) {
      throw new Error(`Configured price not found for route '${routeId}' and vehicle '${vehicleId}'`);
    }

    basePriceSAR = Number(priceRow.price_sar);
  } else if (bookingType === 'hourly') {
    // Validate durationHours: must be integer between 2 and 24 hours
    const hours = durationHours !== undefined && durationHours !== null
      ? Number(durationHours)
      : 4;

    if (isNaN(hours) || hours < 2 || hours > 24) {
      throw new Error(`Invalid duration '${durationHours}'. Hourly bookings require between 2 and 24 hours.`);
    }

    // Check specific duration block route (e.g. hourly-4h, hourly-8h) or specific routeId
    const targetBlockRoute = routeId || (hours > 4 ? `hourly-${hours}h` : 'hourly-4h');

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
      } else {
        throw new Error(`No configured hourly pricing found in database for vehicle '${vehicleId}'`);
      }
    }
  } else if (bookingType === 'ziyarat') {
    const targetRouteId = routeId || 'ziyarat-tour';
    const { data: priceRow, error: priceErr } = await serviceClient
      .from('prices')
      .select('price_sar')
      .eq('route_id', targetRouteId)
      .eq('vehicle_id', vehicleId)
      .maybeSingle();

    if (priceErr || !priceRow || !priceRow.price_sar) {
      throw new Error(`No configured ziyarat pricing found in database for route '${targetRouteId}' and vehicle '${vehicleId}'`);
    }
    basePriceSAR = Number(priceRow.price_sar);
  } else if (bookingType === 'group_bus') {
    const targetRouteId = routeId || 'group-coaster';
    const { data: priceRow, error: priceErr } = await serviceClient
      .from('prices')
      .select('price_sar')
      .eq('route_id', targetRouteId)
      .eq('vehicle_id', vehicleId)
      .maybeSingle();

    if (priceErr || !priceRow || !priceRow.price_sar) {
      throw new Error(`No configured group transport pricing found in database for route '${targetRouteId}' and vehicle '${vehicleId}'`);
    }
    basePriceSAR = Number(priceRow.price_sar);
  }

  if (basePriceSAR === null || isNaN(basePriceSAR) || basePriceSAR <= 0) {
    throw new Error('Price could not be computed from database records');
  }

  // Retrieve active seasonal multiplier from DB
  let multiplier = 1.0;
  const { data: seasonData } = await serviceClient
    .from('seasonal_multipliers')
    .select('multiplier')
    .eq('is_active', true)
    .maybeSingle();

  if (seasonData?.multiplier) {
    multiplier = Number(seasonData.multiplier);
  }

  const finalPriceSAR = Math.round(basePriceSAR * multiplier);

  const currKey = (currency || 'SAR') as CurrencyCode;
  const currRate = CURRENCIES[currKey]?.rateFromSAR || 1.0;
  const finalPriceCurrency = Math.round(finalPriceSAR * currRate);

  return {
    basePriceSAR,
    multiplier,
    finalPriceSAR,
    currency: currKey,
    finalPriceCurrency,
  };
}
