import { promises as fs } from 'fs';

async function inspectBenchmark() {
  const res = await fetch('https://kiswahumrahcab.com', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  const html = await res.text();
  console.log('--- KISWAH AUDIT ---');
  console.log('HTML Length:', html.length);
  
  // Extract hero text
  const heroMatch = html.match(/<section[^>]*hero[^>]*>([\s\S]*?)<\/section>/i) || html.match(/<header[^>]*>([\s\S]*?)<\/header>/i);
  console.log('Hero snippet:', (heroMatch ? heroMatch[0] : html.slice(0, 3000)).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 800));

  // Extract form inputs
  const inputs = [...html.matchAll(/<input[^>]+name=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
  const selects = [...html.matchAll(/<select[^>]+name=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
  console.log('Form inputs:', inputs);
  console.log('Form selects:', selects);

  // Extract pricing tables
  const prices = [...html.matchAll(/(?:SAR|SR|﷼)\s*([0-9]+)|([0-9]+)\s*(?:SAR|SR|﷼)/gi)].map(m => m[1] || m[2]);
  console.log('Sample prices found:', [...new Set(prices)].slice(0, 15));

  // Extract trust signals
  const trustMatches = [...html.matchAll(/(?:guarantee|tracking|deposit|cancel|reviews?|licensed?|tga|insurance|waiting)/gi)].map(m => m[0]);
  console.log('Trust keywords count:', trustMatches.length);
}

inspectBenchmark();
