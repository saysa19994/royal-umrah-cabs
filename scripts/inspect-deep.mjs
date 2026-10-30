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

async function inspectPricesAndVehicles() {
  const { data: prices } = await client.from('prices').select('*');
  console.log('Total prices rows in DB:', prices?.length);
  console.log('Sample prices:', prices?.slice(0, 5));

  const { data: vehicles } = await client.from('vehicles').select('*');
  console.log('Vehicles in DB:', vehicles?.length);
  vehicles?.forEach(v => {
    console.log(`- Vehicle [${v.id}] ${v.name} | Category: ${v.category} | Seats: ${v.seats} | Bags: ${v.bags} | Photos:`, v.photos);
  });

  const { data: routes } = await client.from('routes').select('*');
  console.log('Routes in DB:', routes?.length);
  routes?.forEach(r => {
    console.log(`- Route [${r.id}] ${r.origin_city} -> ${r.destination_city} | Miqat: ${r.miqat_stop_allowed}`);
  });
}

inspectPricesAndVehicles();
