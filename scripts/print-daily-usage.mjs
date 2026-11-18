import fs from 'fs';

const data = JSON.parse(fs.readFileSync('D:/royal-umrah-cabs/scripts/vercel-usage-full.json', 'utf8'));

console.log('=== DATA CACHE BY DAY ===');
let totalSent = 0;
let totalReceived = 0;
for (const item of (data.data_cache?.data || [])) {
  totalSent += item.data_cache_total_sent_bytes || 0;
  totalReceived += item.data_cache_total_received_bytes || 0;
  const sentMB = (item.data_cache_total_sent_bytes / 1024 / 1024).toFixed(2);
  const recMB = (item.data_cache_total_received_bytes / 1024 / 1024).toFixed(2);
  console.log(`${item.date.slice(0, 10)} | Read (Sent): ${sentMB} MB | Write (Recv): ${recMB} MB | Revalidates: ${item.data_cache_total_revalidates}`);
}
console.log(`Total Received (Writes): ${(totalReceived / 1024 / 1024).toFixed(2)} MB`);

console.log('\n=== REQUESTS & FUNCTIONS BY DAY ===');
let totalHits = 0;
let totalMisses = 0;
let totalFunctions = 0;
for (const item of (data.requests?.data || [])) {
  totalHits += item.request_hit_count || 0;
  totalMisses += item.request_miss_count || 0;
  totalFunctions += item.function_invocation_successful_count || 0;
  console.log(`${item.date.slice(0, 10)} | Hits: ${item.request_hit_count} | Misses: ${item.request_miss_count} | Func Invocations: ${item.function_invocation_successful_count}`);
}
console.log(`Total Hits: ${totalHits} | Total Misses: ${totalMisses} | Total Func Invocations: ${totalFunctions}`);
