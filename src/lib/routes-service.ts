import { createServiceClient } from '@/lib/supabase/service';
import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache';
import { AdminRouteData } from '@/types/content';
import { logAuditEvent } from '@/lib/audit';
import { AUTHORITATIVE_TRANSFER_RATES } from './pricing-constants';

// Initial default routes list with 100% Authoritative Company Fares
const INITIAL_ROUTES: AdminRouteData[] = [
  {
    id: 'jeddah-airport-to-makkah',
    origin_city: 'Jeddah Airport (KAIA)',
    destination_city: 'Makkah Hotel',
    title: 'Jeddah Airport (KAIA) → Makkah Hotel',
    origin_code: 'JED',
    destination_code: 'MAK',
    estimated_duration_minutes: 75,
    distance_km: 95,
    miqat_stop_allowed: false,
    is_active: true,
    display_order: 1,
    rates: { camry: 200, staria: 250, yukon: 450, hiace: 280, coaster: 450 },
    rates_usd: { camry: 53, staria: 67, yukon: 120, hiace: 74, coaster: 120 },
  },
  {
    id: 'makkah-to-jeddah-airport',
    origin_city: 'Makkah Hotel',
    destination_city: 'Jeddah Airport (KAIA)',
    title: 'Makkah Hotel → Jeddah Airport (KAIA)',
    origin_code: 'MAK',
    destination_code: 'JED',
    estimated_duration_minutes: 75,
    distance_km: 95,
    miqat_stop_allowed: false,
    is_active: true,
    display_order: 2,
    rates: { camry: 200, staria: 250, yukon: 450, hiace: 280, coaster: 450 },
    rates_usd: { camry: 53, staria: 67, yukon: 120, hiace: 74, coaster: 120 },
  },
  {
    id: 'makkah-to-madinah',
    origin_city: 'Makkah Hotel',
    destination_city: 'Madinah Hotel',
    title: 'Makkah → Madinah Al-Munawwarah',
    origin_code: 'MAK',
    destination_code: 'MED',
    estimated_duration_minutes: 270,
    distance_km: 440,
    miqat_stop_allowed: true,
    is_active: true,
    display_order: 3,
    rates: { camry: 400, staria: 500, yukon: 1000, hiace: 600, coaster: 1000 },
    rates_usd: { camry: 106, staria: 133, yukon: 266, hiace: 160, coaster: 266 },
  },
  {
    id: 'madinah-to-makkah',
    origin_city: 'Madinah Hotel',
    destination_city: 'Makkah Hotel',
    title: 'Madinah → Makkah (With Miqat Bir Ali Stop)',
    origin_code: 'MED',
    destination_code: 'MAK',
    estimated_duration_minutes: 270,
    distance_km: 440,
    miqat_stop_allowed: true,
    is_active: true,
    display_order: 4,
    rates: { camry: 400, staria: 500, yukon: 1000, hiace: 600, coaster: 1000 },
    rates_usd: { camry: 106, staria: 133, yukon: 266, hiace: 160, coaster: 266 },
  },
  {
    id: 'madinah-airport-to-hotel',
    origin_city: 'Madinah Airport (MED)',
    destination_city: 'Madinah Central Hotel',
    title: 'Madinah Airport (MED) → Central Hotel',
    origin_code: 'MED',
    destination_code: 'MED',
    estimated_duration_minutes: 30,
    distance_km: 25,
    miqat_stop_allowed: false,
    is_active: true,
    display_order: 5,
    rates: { camry: 200, staria: 250, yukon: 500, hiace: 300, coaster: 600 },
    rates_usd: { camry: 53, staria: 67, yukon: 133, hiace: 80, coaster: 160 },
  },
  {
    id: 'jeddah-to-madinah',
    origin_city: 'Jeddah City / Airport',
    destination_city: 'Madinah Hotel',
    title: 'Jeddah City / Airport → Madinah Hotel',
    origin_code: 'JED',
    destination_code: 'MED',
    estimated_duration_minutes: 250,
    distance_km: 410,
    miqat_stop_allowed: true,
    is_active: true,
    display_order: 6,
    rates: { camry: 400, staria: 500, yukon: 1000, hiace: 600, coaster: 1000 },
    rates_usd: { camry: 106, staria: 133, yukon: 266, hiace: 160, coaster: 266 },
  },
  {
    id: 'makkah-to-taif',
    origin_city: 'Makkah Hotel',
    destination_city: 'Taif City / Resorts',
    title: 'Makkah → Taif Hub',
    origin_code: 'MAK',
    destination_code: 'TIF',
    estimated_duration_minutes: 105,
    distance_km: 90,
    miqat_stop_allowed: true,
    is_active: true,
    display_order: 7,
    rates: { camry: 400, staria: 500, yukon: 750, hiace: 600, coaster: 900 },
    rates_usd: { camry: 106, staria: 133, yukon: 200, hiace: 160, coaster: 239 },
  },
  {
    id: 'taif-to-makkah',
    origin_city: 'Taif City / Resorts',
    destination_city: 'Makkah Hotel',
    title: 'Taif Hub → Makkah Hotel',
    origin_code: 'TIF',
    destination_code: 'MAK',
    estimated_duration_minutes: 105,
    distance_km: 90,
    miqat_stop_allowed: true,
    is_active: true,
    display_order: 8,
    rates: { camry: 400, staria: 500, yukon: 750, hiace: 600, coaster: 900 },
    rates_usd: { camry: 106, staria: 133, yukon: 200, hiace: 160, coaster: 239 },
  },
  {
    id: 'jeddah-to-taif',
    origin_city: 'Jeddah Airport (KAIA)',
    destination_city: 'Taif (Al Hada)',
    title: 'Jeddah → Taif',
    origin_code: 'JED',
    destination_code: 'TIF',
    estimated_duration_minutes: 135,
    distance_km: 165,
    miqat_stop_allowed: false,
    is_active: true,
    display_order: 9,
    rates: { camry: 500, staria: 600, yukon: 800, hiace: 650, coaster: 850 },
    rates_usd: { camry: 133, staria: 160, yukon: 213, hiace: 173, coaster: 226 },
  },
  {
    id: 'riyadh-airport-transfer',
    origin_city: 'Riyadh Airport (RUH)',
    destination_city: 'Riyadh City Hotel',
    title: 'Riyadh Airport Transfer',
    origin_code: 'RUH',
    destination_code: 'RUH',
    estimated_duration_minutes: 45,
    distance_km: 40,
    miqat_stop_allowed: false,
    is_active: false,
    display_order: 10,
    rates: { camry: 200, staria: 280, yukon: 450, hiace: 400, coaster: 750 },
    rates_usd: { camry: 53, staria: 74, yukon: 120, hiace: 106, coaster: 200 },
  },
  {
    id: 'riyadh-to-makkah',
    origin_city: 'Riyadh',
    destination_city: 'Makkah Hotel',
    title: 'Riyadh ⇄ Makkah Hotel',
    origin_code: 'RUH',
    destination_code: 'MAK',
    estimated_duration_minutes: 540,
    distance_km: 870,
    miqat_stop_allowed: true,
    is_active: false,
    display_order: 11,
    rates: { camry: 1800, staria: 2200, yukon: 2600, hiace: 2500, coaster: 0 },
    rates_usd: { camry: 479, staria: 585, yukon: 692, hiace: 665, coaster: 0 },
  },
  {
    id: 'riyadh-to-madinah',
    origin_city: 'Riyadh',
    destination_city: 'Madinah Hotel',
    title: 'Riyadh ⇄ Madinah Hotel',
    origin_code: 'RUH',
    destination_code: 'MED',
    estimated_duration_minutes: 510,
    distance_km: 840,
    miqat_stop_allowed: false,
    is_active: false,
    display_order: 12,
    rates: { camry: 2000, staria: 2200, yukon: 2500, hiace: 2400, coaster: 0 },
    rates_usd: { camry: 532, staria: 585, yukon: 665, hiace: 638, coaster: 0 },
  },
  {
    id: 'ziyarat-tour',
    origin_city: 'Historic Ziyarat Tour',
    destination_city: 'Holy Sites',
    title: 'Holy Sites Ziyarat Tour',
    origin_code: 'ZIY',
    destination_code: 'ZIY',
    estimated_duration_minutes: 150,
    distance_km: 80,
    miqat_stop_allowed: false,
    is_active: true,
    display_order: 13,
    rates: { camry: 250, staria: 300, yukon: 450, hiace: 330, coaster: 500 },
    rates_usd: { camry: 67, staria: 80, yukon: 120, hiace: 88, coaster: 133 },
  },
  {
    id: 'hourly-4h',
    origin_city: 'Hourly Rental (4h Block)',
    destination_city: 'City Flexible',
    title: 'Hourly Rental (4 Hours)',
    origin_code: 'HRL',
    destination_code: 'HRL',
    estimated_duration_minutes: 240,
    distance_km: 100,
    miqat_stop_allowed: false,
    is_active: true,
    display_order: 14,
    rates: { camry: 350, staria: 400, yukon: 600, hiace: 500, coaster: 800 },
    rates_usd: { camry: 93, staria: 106, yukon: 160, hiace: 133, coaster: 213 },
  },
];

let memoryRoutes: AdminRouteData[] = [...INITIAL_ROUTES];

/**
 * Admin: Get all routes with vehicle pricing matrix and active flags
 */
export async function getAllAdminRoutesWithPrices(): Promise<AdminRouteData[]> {
  try {
    const supabase = createServiceClient();
    const { data: dbRoutes, error: rErr } = await supabase
      .from('routes')
      .select('*')
      .order('display_order', { ascending: true });

    const { data: dbPrices, error: pErr } = await supabase.from('prices').select('*');

    if (!rErr && dbRoutes && dbRoutes.length > 0) {
      const priceMap: Record<string, Record<string, number>> = {};
      (dbPrices || []).forEach((p) => {
        if (!priceMap[p.route_id]) priceMap[p.route_id] = {};
        priceMap[p.route_id][p.vehicle_id] = Number(p.price_sar) || 0;
      });

      return dbRoutes.map((r, idx) => {
        const rPrices = priceMap[r.id] || {};
        const auth = AUTHORITATIVE_TRANSFER_RATES[r.id];

        // Authoritative rates take strict precedence for approved routes
        const camry = auth?.camry ?? rPrices['camry'] ?? 0;
        const staria = auth?.staria ?? rPrices['staria'] ?? 0;
        const yukon = auth?.yukon ?? rPrices['yukon'] ?? 0;
        const hiace = auth?.hiace ?? rPrices['hiace'] ?? 0;
        const coaster = auth?.coaster ?? rPrices['coaster'] ?? 0;

        const sarToUsd = 0.266;

        return {
          id: r.id,
          origin_city: r.origin_city,
          destination_city: r.destination_city,
          title: r.origin_city.includes('->') || r.origin_city.includes('→')
            ? r.origin_city
            : `${r.origin_city} → ${r.destination_city}`,
          origin_code: r.origin_code || '',
          destination_code: r.destination_code || '',
          distance_km: r.distance_km || 0,
          estimated_duration_minutes: r.estimated_duration_minutes || 0,
          miqat_stop_allowed: Boolean(r.miqat_stop_allowed),
          is_active: Boolean(r.is_active),
          display_order: r.display_order ?? (idx + 1),
          rates: { camry, staria, yukon, hiace, coaster },
          rates_usd: {
            camry: Math.round(camry * sarToUsd),
            staria: Math.round(staria * sarToUsd),
            yukon: Math.round(yukon * sarToUsd),
            hiace: Math.round(hiace * sarToUsd),
            coaster: Math.round(coaster * sarToUsd),
          },
        };
      });
    }
  } catch (err) {
    console.warn('Notice querying routes and prices from Supabase:', err);
  }

  return memoryRoutes;
}

/**
 * Admin: Upsert route and vehicle prices
 */
export async function upsertRouteWithPricesAdmin(
  routeData: AdminRouteData,
  userEmail: string,
  userRole: any,
  ip?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServiceClient();

    // 1. Upsert Route record
    const { error: routeErr } = await supabase.from('routes').upsert({
      id: routeData.id,
      origin_city: routeData.origin_city,
      destination_city: routeData.destination_city,
      origin_code: routeData.origin_code || null,
      destination_code: routeData.destination_code || null,
      distance_km: routeData.distance_km || 0,
      estimated_duration_minutes: routeData.estimated_duration_minutes || 0,
      miqat_stop_allowed: routeData.miqat_stop_allowed,
      is_active: routeData.is_active,
      display_order: routeData.display_order,
      updated_at: new Date().toISOString(),
    });

    if (routeErr) {
      console.warn('Notice upserting route in Supabase:', routeErr.message);
    }

    // 2. Upsert Prices for each vehicle class
    const vehicleIds = ['camry', 'staria', 'yukon', 'hiace', 'coaster'] as const;
    const priceUpserts = vehicleIds.map((vId) => ({
      route_id: routeData.id,
      vehicle_id: vId,
      price_sar: routeData.rates[vId] || 0,
      updated_at: new Date().toISOString(),
    }));

    const { error: priceErr } = await supabase
      .from('prices')
      .upsert(priceUpserts, { onConflict: 'route_id,vehicle_id' });

    if (priceErr) {
      console.warn('Notice upserting prices in Supabase:', priceErr.message);
    }
  } catch (err) {
    console.warn('Exception persisting route and prices:', err);
  }

  const existingIdx = memoryRoutes.findIndex((r) => r.id === routeData.id);
  if (existingIdx !== -1) memoryRoutes[existingIdx] = routeData;
  else memoryRoutes.push(routeData);

  await logAuditEvent({
    userEmail,
    userRole,
    action: 'route_and_prices_upsert',
    resource: 'pricing',
    resourceId: routeData.id,
    newValues: routeData,
    ip,
  });

  revalidateTag('site_prices');
  revalidateTag('site_routes');
  revalidatePath('/[locale]/routes', 'page');

  return { success: true };
}

/**
 * Admin: Toggle active state or delete a route
 */
export async function toggleOrDeleteRouteAdmin(
  routeId: string,
  action: 'toggle' | 'delete',
  userEmail: string,
  userRole: any,
  ip?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServiceClient();
    if (action === 'delete') {
      await supabase.from('prices').delete().eq('route_id', routeId);
      await supabase.from('routes').delete().eq('id', routeId);
      memoryRoutes = memoryRoutes.filter((r) => r.id !== routeId);
    } else {
      const route = memoryRoutes.find((r) => r.id === routeId);
      const newActive = route ? !route.is_active : false;
      await supabase.from('routes').update({ is_active: newActive }).eq('id', routeId);
      if (route) route.is_active = newActive;
    }
  } catch (err) {
    console.warn('Notice in toggleOrDeleteRouteAdmin:', err);
  }

  await logAuditEvent({
    userEmail,
    userRole,
    action: `route_${action}`,
    resource: 'pricing',
    resourceId: routeId,
    ip,
  });

  revalidateTag('site_prices');
  revalidateTag('site_routes');
  revalidatePath('/[locale]/routes', 'page');

  return { success: true };
}
