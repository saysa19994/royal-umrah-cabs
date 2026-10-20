import fs from 'fs';

const targets = {
  direct: [
    { name: 'UmrahTransit', url: 'https://umrahtransit.com/' },
    { name: 'Umrah Taxi SA', url: 'https://umrahtaxisa.com/' },
    { name: 'Umrah Car Rentals', url: 'https://umrahcarrentals.com/' },
    { name: 'UmrahTaxi.net', url: 'https://umrahtaxi.net/' },
    { name: 'Hujjaj Umrah Taxi', url: 'https://hujjajumrahtaxi.com/' },
    { name: 'Harmain Transport Service', url: 'https://harmaintransportservice.com/' },
    { name: 'Taxi Umrah', url: 'https://www.taxiumrah.com/' },
    { name: 'Harmain Transfer', url: 'https://www.harmaintransfer.com/en' },
  ],
  guides: [
    { name: 'UmrahTransit Guide', url: 'https://umrahtransit.com/umrah-transportation-guide' },
    { name: 'Umrah Online Taxi Blog', url: 'https://umrahonline.taxi/blog/' },
    { name: 'Jeddah Airport to Makkah Guide', url: 'https://umrahonline.taxi/guides/jeddah-airport-to-makkah/' },
    { name: 'Makkah to Madinah Train or Taxi', url: 'https://umrahonline.taxi/guides/makkah-to-madinah-train-or-taxi/' },
    { name: 'Sulalaa Transport Guide', url: 'https://sulalaa.com/umrah-transport-guide' },
    { name: 'Umrah Transportations Family Guide', url: 'https://umrahtransportations.com/blog/jeddah-airport-to-makkah-transport-guide.php' },
    { name: 'Taxi Bhai Pricing Guide', url: 'https://www.taxibhai.com/blog/umrah-taxi-prices-2026' },
  ],
  blogs: [
    { name: 'Umrah Taxi 24 Services', url: 'https://umrahtaxi24services.blogspot.com/' },
    { name: 'Hadiyya Taxi Service', url: 'https://hadiyataxiservice.blogspot.com/' },
    { name: 'Umrah Taxi VIP', url: 'https://umrah-taxi-vip.blogspot.com/' },
    { name: 'Flyer Umrah Taxi', url: 'https://flyerumrahtaxi.blogspot.com/' },
    { name: 'Miraaj Taxies', url: 'https://miraajtaxies.blogspot.com/' },
    { name: 'Al Habib Transport', url: 'https://alhabibtransport.blogspot.com/' },
    { name: 'Taxi Service in Saudi Arabia', url: 'https://taxiserviceinsaudiaarbia.blogspot.com/' },
  ]
};

async function auditUrl(item) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(item.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8'
      }
    });
    clearTimeout(timeout);
    const html = await res.text();
    const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() || 'No title';
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() || 'None';
    const hasTable = /<table/i.test(html);
    const hasFaq = /faq|frequently asked/i.test(html);
    const hasWhatsApp = /wa\.me|whatsapp\.com/i.test(html);
    const wordCount = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    
    return {
      name: item.name,
      url: item.url,
      status: res.status,
      title,
      h1,
      hasTable,
      hasFaq,
      hasWhatsApp,
      wordCount,
      snippet: html.slice(0, 300).replace(/\s+/g, ' ')
    };
  } catch (err) {
    return {
      name: item.name,
      url: item.url,
      status: 'FAILED',
      error: err.message
    };
  }
}

async function run() {
  const report = {};
  for (const [category, list] of Object.entries(targets)) {
    console.log(`Auditing category: ${category}...`);
    report[category] = [];
    for (const item of list) {
      const result = await auditUrl(item);
      console.log(`[${result.status}] ${result.name} - ${result.url}`);
      if (result.status === 200) {
        console.log(`   Title: ${result.title.slice(0, 60)}...`);
        console.log(`   H1: ${result.h1.slice(0, 60)}...`);
      } else {
        console.log(`   Error: ${result.error || result.status}`);
      }
      report[category].push(result);
    }
  }
  fs.writeFileSync('scripts/phase1-audit-results.json', JSON.stringify(report, null, 2), 'utf8');
  console.log('Results saved to scripts/phase1-audit-results.json');
}

run();
