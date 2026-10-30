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

async function run() {
  // Try inserting a dummy review to see what columns are accepted/returned or inspect error
  const { data, error } = await supabase.from('reviews').insert({
    customer_name: '__temp_probe__',
    rating: 5,
    comment: 'probe',
    route: 'Jeddah to Makkah',
    is_approved: false
  }).select('*');

  console.log('Insert probe result:', data, 'error:', error);

  if (data && data[0]) {
    console.log('REVIEWS EXACT COLUMNS:', Object.keys(data[0]));
    // Clean up probe
    await supabase.from('reviews').delete().eq('id', data[0].id);
    console.log('Probe deleted successfully');
  }
}

run();
