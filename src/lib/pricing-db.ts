import { unstable_cache } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { AUTHORITATIVE_TRANSFER_RATES } from './pricing-constants';
import { hasPublishedFareAudit, type FarePublicationAudit } from './published-pricing';

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

      // Only explicitly published administrator changes may override the
      // company-approved fares. Old DB seed rows disagree with approved fares.
      const { data: publications, error: publicationError } = await supabase
        .from('audit_log')
        .select('action,entity_id,new_values,created_at')
        .in('action', ['price_published', 'route_prices_published'])
        .order('created_at', { ascending: false })
        .limit(2000);
      const authorizedEvents: FarePublicationAudit[] = publicationError ? [] : (publications || []);
      if (publicationError) console.warn('Fare publication lookup unavailable; retaining approved defaults');
      if (!error && data && data.length > 0) {
        for (const row of data) {
          const price = Number(row.price_sar);
          // A stored 0 explicitly makes a route/vehicle combination unavailable.
          // Only owner/admin endpoints may write these records (RLS + role checks).
          if (Number.isFinite(price) && price >= 0) {
            const approvedRoute = AUTHORITATIVE_TRANSFER_RATES[row.route_id];
            // Reject unknown vehicle IDs on approved routes; new custom routes
            // may carry their own published, admin-configured vehicle prices.
            if (approvedRoute) {
              if (!Object.prototype.hasOwnProperty.call(approvedRoute, row.vehicle_id)) continue;
              // Legacy unapproved DB prices do not supersede the owner-approved
              // rate matrix. New edits have a durable admin publication marker.
              if (!hasPublishedFareAudit(authorizedEvents, row.route_id, row.vehicle_id, price)) continue;
            }
            if (!rates[row.route_id]) rates[row.route_id] = {};
            rates[row.route_id][row.vehicle_id] = price;
          }
        }
      }
    } catch (err) {
      console.warn('Notice loading DB prices in cache:', err);
    }

    // Approved rates are safe defaults for absent or unapproved legacy rows.
    // Only explicitly published and audited admin price edits can override them.

    // The Riyadh Airport product is inactive, so it must not surface in public fare views.
    delete rates['riyadh-airport-transfer'];
    return rates;
  },
  ['site_prices_cache_tag'],
  { revalidate: 86400, tags: ['site_prices'] }
);
