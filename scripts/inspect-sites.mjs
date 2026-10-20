const COMPETITORS = [
  { name: 'UmrahTransit', url: 'https://umrahtransit.com/' },
  { name: 'Umrah Taxi', url: 'https://umrahtaxi.net/' },
  { name: 'Umrah Car Rentals', url: 'https://umrahcarrentals.com/' },
  { name: 'Hujjaj Umrah Taxi', url: 'https://hujjajumrahtaxi.com/' },
  { name: 'Harmain Transport Service', url: 'https://harmaintransportservice.com/' },
  { name: 'Taxi Umrah', url: 'https://www.taxiumrah.com/' },
  { name: 'Harmain Transfer', url: 'https://www.harmaintransfer.com/en' },
];

async function inspect(comp) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    const res = await fetch(comp.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return { name: comp.name, url: comp.url, status: res.status, error: `HTTP ${res.status}` };
    }

    const html = await res.text();
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'N/A';

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    const description = descMatch ? descMatch[1].trim() : 'N/A';

    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).slice(0, 3);
    const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).slice(0, 8);

    const hasWhatsApp = /wa\.me|api\.whatsapp\.com|whatsapp/i.test(html);
    const hasForm = /<form/i.test(html);
    const mentionsPackages = /package|ziyarat|ziarah|makkah.*madinah/i.test(html);
    const mentionsPricing = /SAR|riyal|fixed price|starting from|\$|price/i.test(html);

    return {
      name: comp.name,
      url: comp.url,
      status: res.status,
      title,
      description,
      h1s,
      h2s,
      hasWhatsApp,
      hasForm,
      mentionsPackages,
      mentionsPricing,
      size: html.length
    };
  } catch (err) {
    return { name: comp.name, url: comp.url, status: 'ERROR', error: err.message };
  }
}

async function main() {
  console.log('AUDITING ALL 7 COMPETITORS...\n');
  for (const c of COMPETITORS) {
    const result = await inspect(c);
    console.log(`=== ${result.name} (${result.url}) ===`);
    console.log(`Status: ${result.status} ${result.error ? '(' + result.error + ')' : ''}`);
    if (result.title) {
      console.log(`Title: ${result.title}`);
      console.log(`Description: ${result.description}`);
      console.log(`H1s: ${JSON.stringify(result.h1s)}`);
      console.log(`H2s: ${JSON.stringify(result.h2s)}`);
      console.log(`Signals: WhatsApp=${result.hasWhatsApp}, Form=${result.hasForm}, Packages=${result.mentionsPackages}, Pricing=${result.mentionsPricing}`);
    }
    console.log('\n----------------------------------------\n');
  }
}

main();
