import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

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

const client = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
  const tables = [
    'prices',
    'site_settings',
    'seasonal_multipliers',
    'route_rates',
    'rates',
    'vehicles',
    'routes',
    'drivers',
    'bookings',
    'leads',
    'reviews',
    'user_profiles',
    'role_permissions',
    'audit_logs',
    'whatsapp_numbers'
  ];

  for (const t of tables) {
    const { data, error } = await client.from(t).select('*').limit(1);
    if (error) {
      console.log(`[${t}] ERROR: ${error.message}`);
    } else {
      console.log(`[${t}] SUCCESS (${data?.length || 0} rows) Columns:`, data && data[0] ? Object.keys(data[0]).join(', ') : 'Empty table');
    }
  }
}

check();
