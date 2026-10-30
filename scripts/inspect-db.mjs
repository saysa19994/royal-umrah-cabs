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

console.log('URL:', parsed.NEXT_PUBLIC_SUPABASE_URL);
console.log('Key length:', parsed.SUPABASE_SERVICE_ROLE_KEY ? parsed.SUPABASE_SERVICE_ROLE_KEY.length : 0);

const supabase = createClient(parsed.NEXT_PUBLIC_SUPABASE_URL, parsed.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  const { data: revs, error: revErr } = await supabase.from('reviews').select('*').limit(5);
  console.log('REVIEWS sample columns:', revs && revs[0] ? Object.keys(revs[0]) : 'None');
  console.log('REVIEWS sample row:', revs && revs[0] ? revs[0] : 'None');
  console.log('REVIEWS error:', revErr);

  // Check bookings
  const { data: bks, error: bkErr } = await supabase.from('bookings').select('*').limit(3);
  console.log('BOOKINGS count:', bks ? bks.length : 0, 'error:', bkErr);

  // Check inquiries
  const { data: inq, error: inqErr } = await supabase.from('inquiries').select('*').limit(3);
  console.log('INQUIRIES count:', inq ? inq.length : 0, 'error:', inqErr);

  // Check vehicles
  const { data: veh, error: vehErr } = await supabase.from('vehicles').select('*');
  console.log('VEHICLES count:', veh ? veh.length : 0, 'names:', veh ? veh.map(v => v.name) : []);

  // Check pricing
  const { data: prc, error: prcErr } = await supabase.from('pricing').select('*').limit(3);
  console.log('PRICING count:', prc ? prc.length : 0, 'error:', prcErr);
}

check();
