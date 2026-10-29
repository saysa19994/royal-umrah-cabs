/**
 * Privacy-First Client Analytics Dispatcher
 * Pushes structured, strictly non-PII events to window.dataLayer.
 * Compatible with GTM, GA4, and server-side tagging.
 * NEVER transmits passenger names, phone numbers, emails, or card details.
 */

export type AnalyticsEvent =
  | {
      event: 'route_page_viewed';
      route_slug: string;
      locale: string;
    }
  | {
      event: 'vehicle_selected';
      vehicle_id: string;
      route_id: string;
      route?: string;
      price?: number;
      currency?: string;
    }
  | {
      event: 'route_selected';
      service_type: string;
      route?: string;
      vehicle_id?: string;
      passengers?: number;
      luggage?: number;
    }
  | {
      event: 'booking_form_started';
      source: 'booking_card' | 'booking_engine' | 'contact_form' | 'floating_ui';
    }
  | {
      event: 'booking_form_validation_failed';
      form: 'booking_card' | 'booking_engine' | 'contact_form' | 'track_form' | 'cancel_form';
      failed_fields: string[];
    }
  | {
      event: 'quote_calculated';
      service_type: string;
      route?: string;
      vehicle_id: string;
      price_sar: number;
      currency?: string;
    }
  | {
      event: 'booking_request_saved';
      booking_reference?: string;
      service_type: string;
      payment_method?: string;
      is_lead_only?: boolean;
    }
  | {
      event: 'whatsapp_handoff_initiated';
      source: 'booking_card' | 'booking_engine' | 'floating_ui' | 'contact_form' | 'header' | 'hero_cta';
      booking_reference?: string;
      assigned_number?: string;
    }
  | {
      event: 'booking_confirmed';
      booking_reference: string;
      service_type: string;
      payment_method: string;
      total_sar: number;
    }
  | {
      event: 'booking_cancelled';
      booking_reference: string;
      reason?: string;
    };

export function trackEvent(payload: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  try {
    const dataLayer = ((window as unknown as { dataLayer?: unknown[] }).dataLayer =
      (window as unknown as { dataLayer?: unknown[] }).dataLayer || []);
    dataLayer.push({
      ...payload,
      timestamp: new Date().toISOString(),
    });
  } catch {
    // Fail silently so analytics never degrades pilgrim UX
  }
}
