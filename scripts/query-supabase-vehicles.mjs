import { createClient } from '@supabase/supabase-js';

const url = 'https://skyhpzdeapmttgmvcoeh.supabase.co';
// Read anon or service role key from .env.local if present
import fs from 'fs';
let envKey = '';
if (fs.existsSync('D:/royal-umrah-cabs/.env.local')) {
  const envContent = fs.readFileSync('D:/royal-umrah-cabs/.env.local', 'utf8');
  for (const line of envContent.split('\n')) {
    if (line.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) {
      envKey = line.split('=')[1].trim();
      break;
    }
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=') && !envKey) {
      envKey = line.split('=')[1].trim();
    }
  }
}

const supabase = createClient(url, envKey);
const { data, error } = await supabase.from('vehicles').select('*');
if (error) {
  console.error('Supabase error:', error);
} else {
  console.log('--- Supabase vehicles count:', data.length);
  data.forEach(v => {
    console.log(v.id, {
      name: v.name,
      is_active: v.is_active,
      seats: v.capacity_passengers || v.seats,
      bags: v.capacity_luggage || v.luggage,
      category: v.category,
      display_order: v.display_order
    });
  });
}
