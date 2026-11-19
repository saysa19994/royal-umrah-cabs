import { unstable_cache } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { AUTHORITATIVE_TRANSFER_RATES } from './pricing-constants';
import { getPublishedFareOverridesCached } from './published-fares';

export type TransferRatesMap = Record<string, Record<string, number>>;

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
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
      if (!supabase) return rates;
      const { data, error } = await supabase.from('prices').select('route_id, vehicle_id, price_sar');

      if (!error && data && data.length > 0) {
        for (const row of data) {
          const price = Number(row.price_sar);
          if (Number.isFinite(price) && price > 0) {
            // Legacy seed rows are not owner approvals. Never replace company fares
            // without a deliberate publish action from the administrator.
            if (AUTHORITATIVE_TRANSFER_RATES[row.route_id]?.[row.vehicle_id] !== undefined) continue;
            if (!rates[row.route_id]) rates[row.route_id] = {};
            rates[row.route_id][row.vehicle_id] = price;
          }
        }
      }
    } catch (err) {
      console.warn('Notice loading DB prices in cache:', err);
    }

    // Explicit approvals, never the obsolete seed matrix, override official prices.
    const approved = await getPublishedFareOverridesCached();
    for (const [route,vehicles] of Object.entries(approved)) {
      for (const [vehicle,price] of Object.entries(vehicles)) {
        (rates[route] ??= {})[vehicle] = price;
      }
    }

    // The Riyadh Airport product is inactive, so it must not surface in public fare views.
    delete rates['riyadh-airport-transfer'];
    return rates;
  },
  ['site_prices_cache_tag'],
  { revalidate: 86400, tags: ['site_prices'] }
);
