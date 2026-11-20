import { createServiceClient } from '@/lib/supabase/service';
import { CURRENCIES, CurrencyCode } from '@/i18n/config';
import { getDynamicPriceForRouteVehicle } from './dynamic-pricing-store';
import { getMergedSiteSettings } from './dynamic-settings-store';
import {
  AUTHORITATIVE_HOURLY_RATES_4H,
  AUTHORITATIVE_ZIYARAT_RATES,
  AUTHORITATIVE_GROUP_RATES,
  AUTHORITATIVE_TRANSFER_RATES,
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
  'jeddah-airport-to-madinah': true,
};

export const TAIF_ROUTES: Record<string, boolean> = {
  'makkah-to-taif': true,
  'taif-to-makkah': true,
  'jeddah-to-taif': true,
};

export const RIYADH_ROUTES: Record<string, boolean> = {
  'riyadh-airport-transfer': false,
  'riyadh-to-makkah': true,
  'riyadh-to-madinah': true,
};

export interface PriceCalculationResult {
  basePriceSAR: number;
  multiplier: number;
  finalPriceSAR: number;
  currency: CurrencyCode;
  finalPriceCurrency: number;
}

/**
 * Calculates booking prices on the server from published administrator data.
 * The approved company matrix is a fallback for routes not yet configured in
 * the database. Explicitly disabled prices, vehicles and routes fail closed.
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
  const standardSpec = STANDARD_VEHICLE_SPECS[vehicleId];

  // An explicit admin-disabled vehicle must never be bookable just because
  // an older approved fallback record still exists in the source code.
  const { data: vehicleData, error: vehicleError } = await serviceClient
    .from('vehicles')
    .select('id, is_active, seats, bags')
    .eq('id', vehicleId)
    .maybeSingle();
  if (vehicleError) throw new Error('Vehicle availability could not be verified');
  if (vehicleData) {
    activeVehicle = vehicleData.is_active ? vehicleData : null;
  } else if (standardSpec?.is_active) {
    activeVehicle = standardSpec;
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
    if (routeId === 'riyadh-airport-transfer') {
      throw new Error('Riyadh Airport transfer service is not active. Request a manual quotation for another service.');
    }
    // Regional policy applies even if a route is still marked active in DB.
    if (TAIF_ROUTES[routeId] && !getMergedSiteSettings(null).taif_enabled) {
      throw new Error('Taif transportation routes are currently disabled');
    }
    if (RIYADH_ROUTES[routeId] && !getMergedSiteSettings(null).riyadh_enabled) {
      throw new Error('Riyadh transportation routes are currently disabled');
    }

    // Verify route is active
    let isRouteActive = false;
    const { data: routeData, error: routeError } = await serviceClient
      .from('routes')
      .select('id, is_active')
      .eq('id', routeId)
      .maybeSingle();
    if (routeError) throw new Error('Route availability could not be verified');
    if (routeData) {
      if (!routeData.is_active) throw new Error(`Route '${routeId}' is not active`);
      isRouteActive = true;
    } else if (STANDARD_ROUTES[routeId]) {
      isRouteActive = true;
    } else if (TAIF_ROUTES[routeId]) {
      const settings = getMergedSiteSettings(null);
      if (!settings.taif_enabled) {
        throw new Error(`Taif transportation routes are currently disabled. Please contact operations via WhatsApp for custom booking assistance.`);
      }
      isRouteActive = true;
    } else if (RIYADH_ROUTES[routeId]) {
      const settings = getMergedSiteSettings(null);
      if (!settings.riyadh_enabled) {
        throw new Error(`Riyadh transportation routes are currently disabled. Please contact operations via WhatsApp for custom booking assistance.`);
      }
      isRouteActive = true;
    }

    if (!isRouteActive) {
      throw new Error(`Active route '${routeId}' not found in database`);
    }

    // The published administrator price always wins over fallback defaults.
    // A persisted zero explicitly disables this route/vehicle combination.
    const approvedRoute = AUTHORITATIVE_TRANSFER_RATES[routeId];
    if (approvedRoute && !Object.prototype.hasOwnProperty.call(approvedRoute, vehicleId)) {
      throw new Error('This vehicle is not offered for the selected route');
    }
    const { data: priceRow, error: priceError } = await serviceClient
      .from('prices')
      .select('price_sar')
      .eq('route_id', routeId)
      .eq('vehicle_id', vehicleId)
      .maybeSingle();
    if (priceError) throw new Error('Published fare could not be verified');
    if (priceRow) {
      const configured = Number(priceRow.price_sar);
      if (!Number.isFinite(configured) || configured <= 0) {
        throw new Error('This route and vehicle combination is not available');
      }
      basePriceSAR = configured;
    } else if (approvedRoute) {
      basePriceSAR = approvedRoute[vehicleId] ?? null;
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

    // Standard 4h block base
    if (AUTHORITATIVE_HOURLY_RATES_4H[vehicleId]) {
      const blocks = Math.ceil(hours / 4);
      basePriceSAR = AUTHORITATIVE_HOURLY_RATES_4H[vehicleId] * blocks;
    } else {
      // Fall back to DB hourly block
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
        throw new Error(`No configured hourly pricing found in database for vehicle '${vehicleId}'`);
      }
    }
  } else if (bookingType === 'ziyarat') {
    // Route-specific Ziyarat prices are managed in the same prices table.
    const approvedZiyaratRoute = routeId && AUTHORITATIVE_TRANSFER_RATES[routeId]?.[vehicleId]
      ? routeId : null;
    const targetRouteId = approvedZiyaratRoute || 'ziyarat-tour';
    const { data: ziyaratRow, error: ziyaratError } = await serviceClient
      .from('prices')
      .select('price_sar')
      .eq('route_id', targetRouteId)
      .eq('vehicle_id', vehicleId)
      .maybeSingle();
    if (ziyaratError) throw new Error('Published Ziyarat fare could not be verified');
    if (ziyaratRow) {
      const configured = Number(ziyaratRow.price_sar);
      if (!Number.isFinite(configured) || configured <= 0) {
        throw new Error('This Ziyarat vehicle is not available');
      }
      basePriceSAR = configured;
    } else if (approvedZiyaratRoute) {
      basePriceSAR = AUTHORITATIVE_TRANSFER_RATES[approvedZiyaratRoute][vehicleId];
    } else {
      basePriceSAR = AUTHORITATIVE_ZIYARAT_RATES[vehicleId] ?? null;
    }
  } else if (bookingType === 'group_bus') {
    if (AUTHORITATIVE_GROUP_RATES[vehicleId]) {
      basePriceSAR = AUTHORITATIVE_GROUP_RATES[vehicleId];
    } else {
      const targetRouteId = 'group-coaster';
      const { data: priceRow } = await serviceClient
        .from('prices')
        .select('price_sar')
        .eq('route_id', targetRouteId)
        .eq('vehicle_id', vehicleId)
        .maybeSingle();

      if (priceRow?.price_sar) {
        basePriceSAR = Number(priceRow.price_sar);
      } else {
        throw new Error(`No configured group transport pricing found in database for route '${targetRouteId}' and vehicle '${vehicleId}'`);
      }
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
