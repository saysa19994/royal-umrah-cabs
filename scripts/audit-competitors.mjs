import https from 'node:https';
import http from 'node:http';
import { URL } from 'node:url';

const COMPETITORS = [
  { name: 'UmrahTransit', url: 'https://umrahtransit.com/' },
  { name: 'Umrah Taxi', url: 'https://umrahtaxi.net/' },
  { name: 'Umrah Car Rentals', url: 'https://umrahcarrentals.com/' },
  { name: 'Hujjaj Umrah Taxi', url: 'https://hujjajumrahtaxi.com/' },
  { name: 'Harmain Transport Service', url: 'https://harmaintransportservice.com/' },
  { name: 'Taxi Umrah', url: 'https://www.taxiumrah.com/' },
  { name: 'Harmain Transfer', url: 'https://www.harmaintransfer.com/en' },
];

async function fetchUrl(targetUrl, maxRedirects = 5) {
  return new Promise((resolve) => {
    if (maxRedirects < 0) {
      return resolve({ ok: false, error: 'Too many redirects', statusCode: null, body: '' });
    }

    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;

      const req = client.get(
        targetUrl,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
          },
          timeout: 12000,
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            const redirectUrl = new URL(res.headers.location, targetUrl).toString();
            return resolve(fetchUrl(redirectUrl, maxRedirects - 1));
          }

          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
            if (data.length > 500000) {
              res.destroy();
            }
          });
          res.on('end', () => {
            resolve({
              ok: res.statusCode >= 200 && res.statusCode < 300,
              statusCode: res.statusCode,
              headers: res.headers,
              body: data,
            });
          });
        }
      );

      req.on('error', (err) => {
        resolve({ ok: false, error: err.message, statusCode: null, body: '' });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ ok: false, error: 'Request timeout (12s)', statusCode: null, body: '' });
      });
    } catch (e) {
      resolve({ ok: false, error: e.message, statusCode: null, body: '' });
    }
  });
}

function analyzeHtml(html) {
  if (!html) return {};

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'N/A';

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const description = descMatch ? descMatch[1].trim() : 'N/A';

  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, '').trim()
  );
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, '').trim())
    .slice(0, 8);

  const hasWhatsApp = /wa\.me|api\.whatsapp\.com|whatsapp/i.test(html);
  const hasBookingForm = /<form[^>]*>/i.test(html);
  const mentionsFixedPrices = /fixed (price|rate|fare)|transparent/i.test(html);
  const mentionsFlightTracking = /flight (track|monitoring|delay)/i.test(html);
  const mentionsPayOnArrival = /pay (on|upon) arrival|cash|no (prepayment|deposit)/i.test(html);

  // Common vehicle mentions
  const mentionsStaria = /staria/i.test(html);
  const mentionsYukon = /yukon|gmc/i.test(html);
  const mentionsCamry = /camry|sedan/i.test(html);
  const mentionsHiace = /hiace|hi-ace/i.test(html);
  const mentionsCoaster = /coaster|bus/i.test(html);

  // Routes mentions
  const mentionsJeddahMakkah = /jeddah.*makkah|makkah.*jeddah/i.test(html);
  const mentionsMakkahMadinah = /makkah.*madinah|madinah.*makkah/i.test(html);
  const mentionsZiyarat = /ziyarat|ziarah/i.test(html);

  return {
    title,
    description,
    h1: h1Matches,
    h2: h2Matches,
    hasWhatsApp,
    hasBookingForm,
    mentionsFixedPrices,
    mentionsFlightTracking,
    mentionsPayOnArrival,
    vehicles: {
      staria: mentionsStaria,
      yukon: mentionsYukon,
      camry: mentionsCamry,
      hiace: mentionsHiace,
      coaster: mentionsCoaster,
    },
    routes: {
      jeddahMakkah: mentionsJeddahMakkah,
      makkahMadinah: mentionsMakkahMadinah,
      ziyarat: mentionsZiyarat,
    },
  };
}

async function run() {
  console.log('--- STARTING COMPETITOR AUDIT ---');
  for (const comp of COMPETITORS) {
    console.log(`\nInspecting ${comp.name} (${comp.url})...`);
    const res = await fetchUrl(comp.url);
    if (!res.ok) {
      console.log(`Status: FAILED (${res.statusCode || res.error})`);
      continue;
    }
    console.log(`Status: ${res.statusCode} OK (Body size: ${res.body.length} bytes)`);
    const analysis = analyzeHtml(res.body);
    console.log(`Title: ${analysis.title}`);
    console.log(`Meta Description: ${analysis.description}`);
    console.log(`H1s: ${JSON.stringify(analysis.h1)}`);
    console.log(`H2s (first 5): ${JSON.stringify(analysis.h2.slice(0, 5))}`);
    console.log(`Features: WhatsApp=${analysis.hasWhatsApp}, Form=${analysis.hasBookingForm}, FixedPrice=${analysis.mentionsFixedPrices}, FlightTracking=${analysis.mentionsFlightTracking}, PayOnArrival=${analysis.mentionsPayOnArrival}`);
    console.log(`Vehicles: ${JSON.stringify(analysis.vehicles)}`);
    console.log(`Routes: ${JSON.stringify(analysis.routes)}`);
  }
}

run();
