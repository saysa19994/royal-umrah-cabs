export const ARRIVAL_AIRPORTS = ['JED', 'MED'] as const;
export type ArrivalAirport = (typeof ARRIVAL_AIRPORTS)[number];

const ARRIVAL_AIRPORT_BY_ROUTE: Record<string, ArrivalAirport> = {
  'jeddah-airport-to-makkah': 'JED',
  'jeddah-airport-to-madinah': 'JED',
  'jeddah-to-madinah': 'JED',
  'jeddah-to-taif': 'JED',
  'madinah-airport-to-hotel': 'MED',
};

export function getArrivalAirport(routeId?: string | null): ArrivalAirport | undefined {
  return routeId && Object.hasOwn(ARRIVAL_AIRPORT_BY_ROUTE, routeId)
    ? ARRIVAL_AIRPORT_BY_ROUTE[routeId] : undefined;
}

export function isBookingDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export const BOOKING_TIME_PATTERN = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
