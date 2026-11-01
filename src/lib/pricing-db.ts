import { unstable_cache } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { AUTHORITATIVE_TRANSFER_RATES } from './pricing-constants';

export type TransferRatesMap = Record<string, Record<string, number>>;

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://skyhpzdeapmttgmvcoeh.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const getDbPricesCached = unstable_cache(
  async (): Promise<TransferRatesMap> => {
    // Deep clone default authoritative rates as starting base
    const rates: TransferRatesMap = JSON.parse(JSON.stringify(AUTHORITATIVE_TRANSFER_RATES));

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.from('prices').select('route_id, vehicle_id, price_sar');

      if (!error && data && data.length > 0) {
        for (const row of data) {
          const price = Number(row.price_sar);
          if (!isNaN(price) && price > 0) {
            // Guard: Never allow obsolete or unapproved DB seed records to overwrite company-approved rates
            const isApprovedRoute = Boolean(AUTHORITATIVE_TRANSFER_RATES[row.route_id]);
            const isApprovedVehicle = isApprovedRoute && Boolean(AUTHORITATIVE_TRANSFER_RATES[row.route_id][row.vehicle_id]);

            if (isApprovedRoute && isApprovedVehicle) {
              // Preserve authoritative commercial fare - strictly inviolable
              rates[row.route_id][row.vehicle_id] = AUTHORITATIVE_TRANSFER_RATES[row.route_id][row.vehicle_id];
            } else {
              // Allow auxiliary custom routes from database
              if (!rates[row.route_id]) {
                rates[row.route_id] = {};
              }
              rates[row.route_id][row.vehicle_id] = price;
            }
          }
        }
      }
    } catch (err) {
      console.warn('Notice loading DB prices in cache:', err);
    }

    // Secondary enforcement: Guarantee 100% parity with authoritative transfer rates
    for (const [routeId, vehicleRates] of Object.entries(AUTHORITATIVE_TRANSFER_RATES)) {
      if (!rates[routeId]) {
        rates[routeId] = {};
      }
      for (const [vehicleId, price] of Object.entries(vehicleRates)) {
        rates[routeId][vehicleId] = price;
      }
    }

    return rates;
  },
  ['site_prices_cache_tag'],
  { revalidate: 86400, tags: ['site_prices'] }
);
