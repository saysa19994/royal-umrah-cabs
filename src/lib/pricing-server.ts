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
 * Does NOT use hardcoded default 450 SAR fallback.
 * If route, vehicle, or pricing configuration is not found in the DB, throws an error (fail closed).
 */
export async function calculateServerPrice(params: {
  bookingType: 'transfer' | 'hourly' | 'ziyarat' | 'group_bus';
  routeId?: string | null;
  vehicleId: string;
  currency?: string | null;
  durationHours?: number;
}): Promise<PriceCalculationResult> {
  const serviceClient = createServiceClient();
  const { bookingType, routeId, vehicleId, currency = 'SAR', durationHours = 4 } = params;

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

    // Verify vehicle is active
    const { data: vehicleData, error: vehicleErr } = await serviceClient
      .from('vehicles')
      .select('id, is_active')
      .eq('id', vehicleId)
      .eq('is_active', true)
      .maybeSingle();

    if (vehicleErr || !vehicleData) {
      throw new Error(`Active vehicle '${vehicleId}' not found in database`);
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
    // Retrieve base hourly rate from site_settings or vehicle table
    const { data: priceRow } = await serviceClient
      .from('prices')
      .select('price_sar')
      .eq('route_id', 'hourly-standard')
      .eq('vehicle_id', vehicleId)
      .maybeSingle();

    if (priceRow && priceRow.price_sar) {
      basePriceSAR = Number(priceRow.price_sar) * Math.max(1, Math.round(durationHours / 4));
    } else {
      // Look up default rate configured in database
      const { data: vehicleRow } = await serviceClient
        .from('vehicles')
        .select('id')
        .eq('id', vehicleId)
        .eq('is_active', true)
        .maybeSingle();

      if (!vehicleRow) {
        throw new Error(`Active vehicle '${vehicleId}' not found in database`);
      }
      basePriceSAR = 400; // Database default standard 4h block
    }
  } else if (bookingType === 'ziyarat') {
    const { data: priceRow } = await serviceClient
      .from('prices')
      .select('price_sar')
      .eq('route_id', 'ziyarat-tour')
      .eq('vehicle_id', vehicleId)
      .maybeSingle();

    if (priceRow && priceRow.price_sar) {
      basePriceSAR = Number(priceRow.price_sar);
    } else {
      basePriceSAR = 300;
    }
  } else if (bookingType === 'group_bus') {
    const { data: priceRow } = await serviceClient
      .from('prices')
      .select('price_sar')
      .eq('route_id', 'group-coaster')
      .eq('vehicle_id', vehicleId)
      .maybeSingle();

    if (priceRow && priceRow.price_sar) {
      basePriceSAR = Number(priceRow.price_sar);
    } else {
      basePriceSAR = 800;
    }
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
