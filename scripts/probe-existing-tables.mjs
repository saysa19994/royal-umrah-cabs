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

async function inspectColumns() {
  const tables = ['drivers', 'bookings', 'leads', 'role_permissions', 'whatsapp_numbers', 'vehicles', 'routes', 'reviews'];
  for (const t of tables) {
    // Probe columns by selecting with dummy query or reading error
    const { data, error } = await client.from(t).select('*').limit(1);
    if (data && data.length > 0) {
      console.log(`[${t}] Columns:`, Object.keys(data[0]));
    } else {
      // Try an insert with invalid object to see column list or check migrations
      const probe = await client.from(t).insert({ __probe__: 1 });
      console.log(`[${t}] Schema hint from probe:`, probe.error?.message);
    }
  }
}

inspectColumns();
