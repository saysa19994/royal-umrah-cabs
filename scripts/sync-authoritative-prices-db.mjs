import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// Read environment
const envFile = fs.existsSync('.env.test.tmp') ? '.env.test.tmp' : '.env.local';
const raw = fs.readFileSync(envFile, 'utf8').replace(/\0/g, '');
const env = {};
for (const line of raw.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx !== -1) {
    env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
  }
}

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

// Authoritative rates
const AUTHORITATIVE_TRANSFER_RATES = {
  'jeddah-airport-to-makkah': { camry: 200, staria: 260, yukon: 380, hiace: 340, coaster: 650 },
  'makkah-to-jeddah-airport': { camry: 200, staria: 260, yukon: 380, hiace: 340, coaster: 650 },
  'makkah-to-madinah': { camry: 450, staria: 500, yukon: 750, hiace: 650, coaster: 1200 },
  'madinah-to-makkah': { camry: 450, staria: 500, yukon: 750, hiace: 650, coaster: 1200 },
  'madinah-airport-to-hotel': { camry: 150, staria: 190, yukon: 280, hiace: 250, coaster: 550 },
  'jeddah-to-madinah': { camry: 680, staria: 750, yukon: 980, hiace: 850, coaster: 1600 },
  'makkah-to-taif': { camry: 350, staria: 450, yukon: 600, hiace: 550, coaster: 950 },
  'taif-to-makkah': { camry: 350, staria: 450, yukon: 600, hiace: 550, coaster: 950 },
  'jeddah-to-taif': { camry: 550, staria: 650, yukon: 850, hiace: 800, coaster: 1400 },
  'riyadh-airport-transfer': { camry: 200, staria: 280, yukon: 450, hiace: 400, coaster: 750 },
  'riyadh-to-makkah': { camry: 2200, staria: 2600, yukon: 3500, hiace: 3200, coaster: 5500 },
  'riyadh-to-madinah': { camry: 2200, staria: 2600, yukon: 3500, hiace: 3200, coaster: 5500 },
};

const NEW_ROUTES = [
  {
    id: 'makkah-to-taif',
    origin_city: 'makkah',
    destination_city: 'taif',
    origin_code: 'MAK',
    destination_code: 'TIF',
    estimated_duration_minutes: 105,
    distance_km: 90,
    miqat_stop_allowed: true,
    is_active: true,
    display_order: 11,
  },
  {
    id: 'taif-to-makkah',
    origin_city: 'taif',
    destination_city: 'makkah',
    origin_code: 'TIF',
    destination_code: 'MAK',
    estimated_duration_minutes: 105,
    distance_km: 90,
    miqat_stop_allowed: true,
    is_active: true,
    display_order: 12,
  },
  {
    id: 'jeddah-to-taif',
    origin_city: 'jeddah',
    destination_city: 'taif',
    origin_code: 'JED',
    destination_code: 'TIF',
    estimated_duration_minutes: 150,
    distance_km: 170,
    miqat_stop_allowed: true,
    is_active: true,
    display_order: 13,
  },
  {
    id: 'riyadh-airport-transfer',
    origin_city: 'riyadh-airport',
    destination_city: 'riyadh',
    origin_code: 'RUH',
    destination_code: 'RUH',
    estimated_duration_minutes: 45,
    distance_km: 40,
    miqat_stop_allowed: false,
    is_active: true,
    display_order: 14,
  },
  {
    id: 'riyadh-to-makkah',
    origin_city: 'riyadh',
    destination_city: 'makkah',
    origin_code: 'RUH',
    destination_code: 'MAK',
    estimated_duration_minutes: 540,
    distance_km: 870,
    miqat_stop_allowed: true,
    is_active: true,
    display_order: 15,
  },
  {
    id: 'riyadh-to-madinah',
    origin_city: 'riyadh',
    destination_city: 'madinah',
    origin_code: 'RUH',
    destination_code: 'MED',
    estimated_duration_minutes: 510,
    distance_km: 840,
    miqat_stop_allowed: true,
    is_active: true,
    display_order: 16,
  },
];

async function main() {
  console.log('--- Step 1: Upsert New Routes into Supabase `routes` table ---');
  for (const route of NEW_ROUTES) {
    const { error: rErr } = await supabase.from('routes').upsert(route, { onConflict: 'id' });
    if (rErr) {
      console.error(`Failed to upsert route ${route.id}:`, rErr);
    } else {
      console.log(`✓ Route ${route.id} upserted successfully`);
    }
  }

  console.log('\n--- Step 2: Synchronize All 12 Routes in `prices` Table ---');
  const priceRows = [];
  for (const [routeId, vehicleMap] of Object.entries(AUTHORITATIVE_TRANSFER_RATES)) {
    for (const [vehicleId, priceSAR] of Object.entries(vehicleMap)) {
      priceRows.push({
        route_id: routeId,
        vehicle_id: vehicleId,
        price_sar: priceSAR,
        updated_at: new Date().toISOString(),
      });
    }
  }

  for (const row of priceRows) {
    // Check if row exists
    const { data: existing } = await supabase
      .from('prices')
      .select('id, price_sar')
      .eq('route_id', row.route_id)
      .eq('vehicle_id', row.vehicle_id)
      .maybeSingle();

    if (existing) {
      if (existing.price_sar !== row.price_sar) {
        console.log(`Updating ${row.route_id} [${row.vehicle_id}]: ${existing.price_sar} -> ${row.price_sar} SAR`);
        const { error: uErr } = await supabase
          .from('prices')
          .update({ price_sar: row.price_sar, updated_at: row.updated_at })
          .eq('id', existing.id);
        if (uErr) console.error(`Failed to update ${row.route_id}:`, uErr);
      }
    } else {
      console.log(`Inserting new price ${row.route_id} [${row.vehicle_id}]: ${row.price_sar} SAR`);
      const { error: iErr } = await supabase.from('prices').insert(row);
      if (iErr) console.error(`Failed to insert ${row.route_id}:`, iErr);
    }
  }

  console.log('\n--- Step 3: Verification of Database Prices ---');
  const { data: currentPrices } = await supabase
    .from('prices')
    .select('route_id, vehicle_id, price_sar')
    .order('route_id');

  const summary = {};
  for (const p of currentPrices || []) {
    if (!summary[p.route_id]) summary[p.route_id] = {};
    summary[p.route_id][p.vehicle_id] = p.price_sar;
  }
  console.table(summary);
  console.log('✓ Supabase database synchronization complete!');
}

main().catch(console.error);
