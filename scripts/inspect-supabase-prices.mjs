import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
env.split('\n').forEach((line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, '');
});

const url = envVars['NEXT_PUBLIC_SUPABASE_URL'] || 'https://skyhpzdeapmttgmvcoeh.supabase.co';
const key = envVars['SUPABASE_SERVICE_ROLE_KEY'] || envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function run() {
  const { data, error } = await supabase.from('prices').select('route_id, vehicle_id, price_sar');
  if (error) {
    console.error('Supabase query error:', error.message);
    return;
  }
  console.log('Total price rows in Supabase:', data.length);
  const byRoute = {};
  for (const row of data) {
    if (!byRoute[row.route_id]) byRoute[row.route_id] = {};
    byRoute[row.route_id][row.vehicle_id] = Number(row.price_sar);
  }
  console.log(JSON.stringify(byRoute, null, 2));
}

run();
