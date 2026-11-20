/**
 * Distinguishes explicitly published owner/admin fare changes from older
 * database seed rows. Legacy rows may conflict with approved commercial rates.
 * No database migration required; publication is evidenced by durable
 * audit_log events written only after authenticated price persistence.
 */
export type FarePublicationAudit = {
  action?: string | null;
  entity_id?: string | null;
  new_values?: unknown;
  created_at?: string | null;
};

export function hasPublishedFareAudit(
  audits: readonly FarePublicationAudit[],
  routeId: string,
  vehicleId: string,
  currentPrice: number,
): boolean {
  if (!Number.isFinite(currentPrice) || currentPrice < 0) return false;
  return audits.some((event) => {
    const values = event.new_values;
    if (!values || typeof values !== 'object' || Array.isArray(values)) return false;
    const obj = values as Record<string, unknown>;
    if (event.action === 'price_published' && event.entity_id === `${routeId}:${vehicleId}`) {
      const published = obj.price_sar;
      return published !== null && published !== undefined && Number(published) === currentPrice;
    }
    if (event.action === 'route_prices_published' && event.entity_id === routeId) {
      const rates = obj.rates;
      if (!rates || typeof rates !== 'object' || Array.isArray(rates)) return false;
      const published = (rates as Record<string, unknown>)[vehicleId];
      return published !== null && published !== undefined && Number(published) === currentPrice;
    }
    return false;
  });
}
