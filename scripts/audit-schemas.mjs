import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

// Read .env.local
const envContent = fs.readFileSync('D:/royal-umrah-cabs/.env.local', 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let val = (match[2] || '').trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    env[key] = val;
  }
}

console.log('Supabase URL:', env.NEXT_PUBLIC_SUPABASE_URL);

// Inspect tables list
const tablesToCheck = [
  'vehicles',
  'fleet_images',
  'media_library',
  'bookings',
  'leads',
  'routes',
  'pricing',
  'seasonal_rates',
  'drivers',
  'chauffeurs',
  'reviews',
  'faqs',
  'settings',
  'user_profiles',
  'role_permissions',
  'audit_logs',
  'whatsapp_numbers',
  'content_blocks',
  'invoices'
];

async function runAudit() {
  // Use anon key or service role if present
  const client = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  console.log('--- TABLE SCHEMA AUDIT ---');
  for (const tbl of tablesToCheck) {
    const { data, error } = await client.from(tbl).select('*').limit(1);
    if (error) {
      console.log(`[TABLE] ${tbl}: NOT ACCESSIBLE OR MISSING (${error.code}: ${error.message})`);
    } else {
      console.log(`[TABLE] ${tbl}: EXISTS | Sample row keys: ${data && data[0] ? Object.keys(data[0]).join(', ') : 'EMPTY (0 rows)'}`);
    }
  }
}

runAudit();
