import { z } from 'zod';
import { CURRENCIES, CurrencyCode, LOCALES, Locale } from '@/i18n/config';

export const SUPPORTED_CURRENCY_CODES = Object.keys(CURRENCIES) as [CurrencyCode, ...CurrencyCode[]];

export const BookingSchema = z.object({
  booking_type: z.enum(['transfer', 'hourly', 'ziyarat', 'group_bus']).default('transfer'),
  route_id: z.string().optional().nullable(),
  vehicle_id: z.string().min(1, 'Vehicle is required'),
  customer_name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name cannot exceed 100 characters'),
  customer_phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{7,25}$/, 'Please enter a valid phone number with country code')
    .refine((val) => val.replace(/\D/g, '').length >= 8, {
      message: 'Phone number must contain at least 8 digits after normalization',
    }),
  customer_email: z.string().trim().email('Invalid email address').max(200, 'Email cannot exceed 200 characters').optional().or(z.literal('')),
  pickup_datetime: z.string().min(1, 'Pickup date and time is required'),
  pickup_location: z.string().trim().min(2, 'Pickup location is required').max(200, 'Pickup location cannot exceed 200 characters'),
  dropoff_location: z.string().trim().min(2, 'Dropoff location is required').max(200, 'Dropoff location cannot exceed 200 characters'),
  passengers_count: z.number().int().min(1).max(50).default(2),
  luggage_count: z.number().int().min(0).max(50).default(2),
  flight_number: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9\s]{0,20}$/, 'Flight number must be alphanumeric and max 20 characters')
    .optional()
    .nullable(),
  duration_hours: z.number().int().min(2, 'Duration must be at least 2 hours').max(24, 'Duration cannot exceed 24 hours').optional().nullable(),
  add_ons: z.object({
    child_seat: z.boolean().default(false),
    flight_tracking: z.boolean().default(true),
    malay_driver: z.boolean().default(false),
    zamzam_water: z.boolean().default(true),
  }).default({
    child_seat: false,
    flight_tracking: true,
    malay_driver: false,
    zamzam_water: true,
  }),
  special_notes: z.string().max(1000, 'Special notes cannot exceed 1000 characters').optional().nullable(),
  payment_method: z.enum(['pay_upon_arrival', 'online_card', 'bank_transfer']).default('pay_upon_arrival'),
  currency: z.enum(SUPPORTED_CURRENCY_CODES, {
    errorMap: () => ({ message: `Invalid currency. Supported: ${SUPPORTED_CURRENCY_CODES.join(', ')}` }),
  }).default('SAR'),
  language: z.enum(LOCALES).default('en'),
});

export type BookingInput = z.infer<typeof BookingSchema>;

export interface BookingRecord extends BookingInput {
  id: string;
  reference: string;
  base_price_sar: number;
  seasonal_multiplier: number;
  final_price_sar: number;
  currency_charged: string;
  final_price_currency: number;
  payment_status: string;
  status: string;
  created_at: string;
}
