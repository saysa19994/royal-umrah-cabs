'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

interface RouteAnalyticsTrackerProps {
  slug: string;
  locale: string;
}

/**
 * RouteAnalyticsTracker
 *
 * Dedicated client component wrapper for firing `route_page_viewed` analytics event.
 * Uses a ref guard to ensure the event fires strictly once per route page view,
 * eliminating duplicate triggers from React 18 Strict Mode and non-route re-renders.
 */
export function RouteAnalyticsTracker({ slug, locale }: RouteAnalyticsTrackerProps) {
  const trackedRef = useRef<string | null>(null);

  useEffect(() => {
    const key = `${locale}:${slug}`;
    if (trackedRef.current === key) return;
    trackedRef.current = key;

    trackEvent({
      event: 'route_page_viewed',
      route_slug: slug,
      locale,
    });
  }, [slug, locale]);

  return null;
}
