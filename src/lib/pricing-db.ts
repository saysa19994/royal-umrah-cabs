import { unstable_cache } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { AUTHORITATIVE_TRANSFER_RATES } from './pricing-constants';

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
          // A stored 0 explicitly makes a route/vehicle combination unavailable.
          // Only owner/admin endpoints may write these records (RLS + role checks).
          if (Number.isFinite(price) && price >= 0) {
            const approvedRoute = AUTHORITATIVE_TRANSFER_RATES[row.route_id];
            // Reject unknown vehicle IDs on approved routes; new custom routes
            // may carry their own published, admin-configured vehicle prices.
            if (approvedRoute && !Object.prototype.hasOwnProperty.call(approvedRoute, row.vehicle_id)) {
              continue;
            }
            if (!rates[row.route_id]) rates[row.route_id] = {};
            rates[row.route_id][row.vehicle_id] = price;
          }
        }
      }
    } catch (err) {
      console.warn('Notice loading DB prices in cache:', err);
    }

    // Approved rates are safe defaults when the database is unavailable or
    // a particular fare has never been configured; persisted admin edits win.
    // This avoids showing stale hardcoded fares after an admin update.

    // The Riyadh Airport product is inactive, so it must not surface in public fare views.
    delete rates['riyadh-airport-transfer'];
    return rates;
  },
  ['site_prices_cache_tag'],
  { revalidate: 86400, tags: ['site_prices'] }
);
