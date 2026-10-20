import https from 'https';
import http from 'http';

const competitors = [
  { name: 'Kiswah Umrah Cab', url: 'https://kiswahumrahcab.com' },
  { name: 'Umrah Taxi Online', url: 'https://umrahtaxionline.com' },
  { name: 'Umrah Taxi SA', url: 'https://umrahtaxisa.com' },
  { name: 'UmrahTransit', url: 'https://umrahtransit.com' },
  { name: 'Umrah Car Rentals', url: 'https://umrahcarrentals.com' },
  { name: 'Umrah Taxi Net', url: 'https://umrahtaxi.net' },
  { name: 'Hujjaj Umrah Taxi', url: 'https://hujjajumrahtaxi.com' },
  { name: 'Umrah Taxi Service (Search)', url: 'https://umrahtaxiservice.com' }
];

async function checkSite(target) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(target.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    clearTimeout(timeout);
    const html = await res.text();
    const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() || 'No title';
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).slice(0, 3);
    const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).slice(0, 5);
    const hasWhatsApp = /wa\.me|api\.whatsapp\.com|whatsapp/i.test(html);
    const waNumbers = [...html.matchAll(/(?:wa\.me\/|whatsapp\.com\/send\?phone=)(\+?[0-9]{8,15})/gi)].map(m => m[1]);
    const hasForm = /<form/i.test(html);
    const hasPrices = /SAR|SR|﷼|\b[0-9]{3}\s*(?:SAR|SR)\b/i.test(html);
    const fleetCars = ['camry', 'staria', 'hiace', 'yukon', 'gmc', 'coaster', 'taurus', 'innova'].filter(car => new RegExp(car, 'i').test(html));

    return {
      name: target.name,
      url: target.url,
      status: res.status,
      title,
      h1s,
      h2s,
      hasWhatsApp,
      waNumbers: [...new Set(waNumbers)],
      hasForm,
      hasPrices,
      fleetCars,
      htmlLength: html.length,
      sampleSnippet: html.slice(0, 500).replace(/\s+/g, ' ')
    };
  } catch (err) {
    return {
      name: target.name,
      url: target.url,
      status: 'FAILED',
      error: err.message
    };
  }
}

async function run() {
  console.log('Auditing competitors...\n');
  const results = [];
  for (const c of competitors) {
    const res = await checkSite(c);
    console.log(`[${res.status}] ${res.name} (${res.url})`);
    if (res.status === 200) {
      console.log(`  Title: ${res.title}`);
      console.log(`  H1: ${res.h1s.join(' | ') || 'None'}`);
      console.log(`  Fleet found: ${res.fleetCars.join(', ') || 'None'}`);
      console.log(`  WhatsApp: ${res.hasWhatsApp ? res.waNumbers.join(', ') || 'Yes (generic)' : 'No'}`);
      console.log(`  Booking Form: ${res.hasForm ? 'Yes' : 'No'}`);
    } else {
      console.log(`  Error: ${res.error}`);
    }
    console.log('----------------------------------------------------');
    results.push(res);
  }
}

run();
