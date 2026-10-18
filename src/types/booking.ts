import { z } from 'zod';

export const BookingSchema = z.object({
  booking_type: z.enum(['transfer', 'hourly', 'ziyarat', 'group_bus']).default('transfer'),
  route_id: z.string().optional().nullable(),
  vehicle_id: z.string().min(1, 'Vehicle is required'),
  customer_name: z.string().min(2, 'Name must be at least 2 characters'),
  customer_phone: z.string().min(7, 'Please enter a valid phone number with country code'),
  customer_email: z.string().email().optional().or(z.literal('')),
  pickup_datetime: z.string().min(1, 'Pickup date and time is required'),
  pickup_location: z.string().min(2, 'Pickup location is required'),
  dropoff_location: z.string().min(2, 'Dropoff location is required'),
  passengers_count: z.number().int().min(1).max(50).default(2),
  luggage_count: z.number().int().min(0).max(50).default(2),
  flight_number: z.string().optional().nullable(),
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
  special_notes: z.string().optional().nullable(),
  currency: z.string().default('SAR'),
  language: z.string().default('en'),
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
  payment_method: string;
  payment_status: string;
  status: string;
  created_at: string;
}
