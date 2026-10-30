import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = fs.readFileSync('D:/royal-umrah-cabs/.env.vercel.tmp', 'utf8');
const parsed = {};
for (const line of env.split('\n')) {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let key = match[1];
    let val = (match[2] || '').trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    parsed[key] = val;
  }
}

const supabase = createClient(parsed.NEXT_PUBLIC_SUPABASE_URL, parsed.SUPABASE_SERVICE_ROLE_KEY);

async function findTables() {
  const testTables = [
    'reviews', 'bookings', 'vehicles', 'leads', 'inquiries', 'pricing', 'routes', 
    'rates', 'fleet', 'settings', 'user_profiles', 'audit_logs', 'faqs', 'media',
    'seasonal_rates', 'promo_codes', 'dispatches', 'whatsapp_numbers'
  ];

  for (const t of testTables) {
    const { data, error } = await supabase.from(t).select('*').limit(1);
    if (error) {
      console.log(`Table '${t}': ERROR ->`, error.message);
    } else {
      console.log(`Table '${t}': EXISTS! (columns: ${data && data[0] ? Object.keys(data[0]).join(', ') : 'empty'})`);
    }
  }
}

findTables();
