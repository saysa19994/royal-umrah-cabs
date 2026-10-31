import crypto from 'crypto';
import { calculateServerPrice } from '@/lib/pricing-server';

export interface BookingDraft {
  id: string;
  createdAt: number;
  expiresAt: number;
  routeId: string;
  vehicleId: string;
  bookingType: 'transfer' | 'hourly' | 'ziyarat' | 'group_bus';
  pickupDate: string;
  pickupTime: string;
  passengers: number;
  luggage: number;
  pickupLocation: string;
  dropoffLocation: string;
  flightNumber?: string;
  durationHours?: number;
  basePriceSAR: number;
  finalPriceSAR: number;
  currency: string;
  finalPriceCurrency: number;
}

// In-memory serverless cache with automatic cleanup for drafts (TTL: 2 hours)
const draftsMemoryStore = new Map<string, BookingDraft>();

function cleanupExpiredDrafts() {
  const now = Date.now();
  for (const [id, draft] of draftsMemoryStore.entries()) {
    if (draft.expiresAt < now) {
      draftsMemoryStore.delete(id);
    }
  }
}

export async function createBookingDraft(params: {
  routeId: string;
  vehicleId: string;
  bookingType?: 'transfer' | 'hourly' | 'ziyarat' | 'group_bus';
  pickupDate: string;
  pickupTime: string;
  passengers: number;
  luggage: number;
  pickupLocation?: string;
  dropoffLocation?: string;
  flightNumber?: string;
  durationHours?: number;
  currency?: string;
}): Promise<BookingDraft> {
  cleanupExpiredDrafts();

  const bookingType = params.bookingType || 'transfer';
  const currency = params.currency || 'SAR';

  // Calculate authoritative server price
  const pricingResult = await calculateServerPrice({
    bookingType,
    routeId: params.routeId,
    vehicleId: params.vehicleId,
    durationHours: params.durationHours,
    pickupDatetime: `${params.pickupDate}T${params.pickupTime || '12:00'}:00`,
    passengersCount: params.passengers,
    luggageCount: params.luggage,
    currency,
  });

  const now = Date.now();
  const randomHex = crypto.randomBytes(6).toString('hex').toUpperCase();
  const id = `DFT-${now.toString(36).toUpperCase()}-${randomHex}`;

  const draft: BookingDraft = {
    id,
    createdAt: now,
    expiresAt: now + 2 * 60 * 60 * 1000, // 2 hours validity
    routeId: params.routeId,
    vehicleId: params.vehicleId,
    bookingType,
    pickupDate: params.pickupDate,
    pickupTime: params.pickupTime,
    passengers: params.passengers,
    luggage: params.luggage,
    pickupLocation: params.pickupLocation || '',
    dropoffLocation: params.dropoffLocation || '',
    flightNumber: params.flightNumber || '',
    durationHours: params.durationHours,
    basePriceSAR: pricingResult.basePriceSAR,
    finalPriceSAR: pricingResult.finalPriceSAR,
    currency: pricingResult.currency,
    finalPriceCurrency: pricingResult.finalPriceCurrency,
  };

  draftsMemoryStore.set(id, draft);
  return draft;
}

export function getBookingDraft(id: string): BookingDraft | null {
  cleanupExpiredDrafts();
  const draft = draftsMemoryStore.get(id);
  if (!draft) return null;
  if (draft.expiresAt < Date.now()) {
    draftsMemoryStore.delete(id);
    return null;
  }
  return draft;
}
