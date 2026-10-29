import { getDbPricesCached } from '@/lib/pricing-db';
import { MASTER_FAQS_INITIAL } from '@/data/faqs-master';
import { logLeadAndGenerateWhatsAppUrl } from '@/lib/whatsapp-routing';
import { createServiceClient } from '@/lib/supabase/service';
import { normalizePhoneNumber, verifyPhoneMatch } from '@/lib/phone';

export interface ToolDefinition {
  name: string;
  description: string;
  input_schema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

export const CHAT_TOOLS_DEFINITIONS: ToolDefinition[] = [
  {
    name: 'get_price',
    description: 'Get the exact guaranteed fare in SAR for a specific transfer route and vehicle class.',
    input_schema: {
      type: 'object',
      properties: {
        route_id: {
          type: 'string',
          description: 'Route ID, e.g., jeddah-airport-to-makkah, makkah-to-madinah, madinah-to-makkah, makkah-to-jeddah-airport, jeddah-to-madinah, madinah-airport-to-hotel',
        },
        vehicle_id: {
          type: 'string',
          description: 'Vehicle key: camry, staria, yukon, hiace, coaster',
        },
      },
      required: ['route_id', 'vehicle_id'],
    },
  },
  {
    name: 'search_faq',
    description: 'Search official verified pilgrimage FAQs regarding airport meeting points, Zamzam water rules, Miqat stops, or cancellations.',
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search keywords, e.g., Zamzam, flight delay, Miqat, cancellation, child seat',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'create_lead',
    description: 'Register a lead in the database and generate a WhatsApp handoff link with a unique reference code for a live human agent.',
    input_schema: {
      type: 'object',
      properties: {
        customer_name: { type: 'string' },
        route_title: { type: 'string' },
        vehicle_name: { type: 'string' },
        pickup_date: { type: 'string' },
        notes: { type: 'string' },
        language: { type: 'string' },
      },
    },
  },
  {
    name: 'track_booking',
    description: 'Check the live status of an existing reservation using the booking reference code and passenger phone number.',
    input_schema: {
      type: 'object',
      properties: {
        reference: { type: 'string', description: 'Booking reference, e.g., RUC-XXXXX' },
        phone: { type: 'string', description: 'Passenger phone number provided during booking' },
      },
      required: ['reference', 'phone'],
    },
  },
];

export async function executeChatTool(toolName: string, args: Record<string, any>): Promise<any> {
  switch (toolName) {
    case 'get_price': {
      const dbRates = await getDbPricesCached();
      const routeRates = dbRates[args.route_id];
      if (!routeRates) {
        return { error: `Route ${args.route_id} not found in database.` };
      }
      const price = routeRates[args.vehicle_id];
      if (price === undefined) {
        return { error: `Vehicle ${args.vehicle_id} not configured for this route.` };
      }
      return {
        route_id: args.route_id,
        vehicle_id: args.vehicle_id,
        price_sar: price,
        currency: 'SAR',
        payment_policy: 'Cash paid to the driver after the journey is completed and the customer reaches the requested destination. No advance deposit required.',
      };
    }

    case 'search_faq': {
      const q = (args.query || '').toLowerCase();
      const matches = MASTER_FAQS_INITIAL.filter(
        (f) =>
          f.questionEn.toLowerCase().includes(q) ||
          f.questionAr.includes(q) ||
          f.answerEn.toLowerCase().includes(q) ||
          f.answerAr.includes(q)
      ).slice(0, 3);

      return {
        query: args.query,
        results_count: matches.length,
        results: matches.map((m) => ({
          question_en: m.questionEn,
          question_ar: m.questionAr,
          answer_en: m.answerEn,
          answer_ar: m.answerAr,
        })),
      };
    }

    case 'create_lead': {
      const leadResult = await logLeadAndGenerateWhatsAppUrl({
        customer_name: args.customer_name,
        route_title: args.route_title,
        vehicle_name: args.vehicle_name,
        pickup_date: args.pickup_date,
        language: args.language || 'en',
        notes: args.notes,
      });

      return {
        success: true,
        reference_code: leadResult.ref_code,
        assigned_whatsapp_number: leadResult.whatsapp_number,
        whatsapp_url: leadResult.whatsapp_url,
        action: 'Present the WhatsApp link to the pilgrim so they can connect with dispatch with one click.',
      };
    }

    case 'track_booking': {
      try {
        const serviceClient = createServiceClient();
        const { data: booking, error } = await serviceClient
          .from('bookings')
          .select('id, reference, status, route_id, vehicle_id, pickup_datetime, customer_name, customer_phone')
          .eq('reference', args.reference?.toUpperCase()?.trim())
          .maybeSingle();

        if (error || !booking) {
          return { error: 'No reservation found matching this reference code.' };
        }

        if (!verifyPhoneMatch(args.phone, booking.customer_phone)) {
          return { error: 'Phone number does not match the passenger record on file.' };
        }

        return {
          reference: booking.reference,
          status: booking.status,
          route_id: booking.route_id,
          vehicle_id: booking.vehicle_id,
          pickup_datetime: booking.pickup_datetime,
          customer_name: booking.customer_name,
        };
      } catch (err: any) {
        return { error: 'Unable to query booking database at this moment.' };
      }
    }

    default:
      return { error: `Unknown tool: ${toolName}` };
  }
}
