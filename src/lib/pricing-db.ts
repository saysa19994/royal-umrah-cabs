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
          if (!rates[row.route_id]) {
            rates[row.route_id] = {};
          }
          rates[row.route_id][row.vehicle_id] = Number(row.price_sar);
        }
      }
    } catch (err) {
      console.warn('Notice loading DB prices in cache:', err);
    }

    return rates;
  },
  ['site_prices_cache_tag'],
  { revalidate: 300, tags: ['site_prices'] }
);
