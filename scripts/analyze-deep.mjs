async function analyzeSitesDeep() {
  const urls = [
    { name: 'Kiswah Umrah Cab', url: 'https://kiswahumrahcab.com' },
    { name: 'Umrah Taxi Online', url: 'https://umrahtaxionline.com' },
    { name: 'Umrah Car Rentals', url: 'https://umrahcarrentals.com' },
    { name: 'UmrahTransit', url: 'https://umrahtransit.com' },
    { name: 'Umrah Taxi Net', url: 'https://umrahtaxi.net' },
    { name: 'Hujjaj Umrah Taxi', url: 'https://hujjajumrahtaxi.com' },
    { name: 'Umrah Taxi SA', url: 'https://umrahtaxisa.com' },
    { name: 'Umrah Taxi Service', url: 'https://umrahtaxiservice.com' }
  ];

  for (const s of urls) {
    try {
      const res = await fetch(s.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      console.log(`\n================== ${s.name} ==================`);
      
      // Look for H1, H2
      const headings = [...html.matchAll(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).slice(0, 4);
      console.log('Headings:', headings);

      // Look for button texts
      const buttons = [...html.matchAll(/<(?:button|a)[^>]*class=["'][^"']*(?:btn|cta|book|whatsapp)[^"']*["'][^>]*>([\s\S]*?)<\/(?:button|a)>/gi)]
        .map(m => m[1].replace(/<[^>]+>/g, '').trim())
        .filter(t => t.length > 2 && t.length < 50)
        .slice(0, 5);
      console.log('Sample CTAs:', buttons);

      // Check routes mentioned
      const routes = ['jeddah to makkah', 'makkah to madinah', 'madinah to makkah', 'ziyarat', 'airport transfer']
        .filter(r => new RegExp(r, 'i').test(html));
      console.log('Routes mentioned:', routes);

      // Check prices mentioned in text
      const priceMatches = [...html.matchAll(/(?:SAR|SR|﷼)\s*([0-9]{2,4})|([0-9]{2,4})\s*(?:SAR|SR|﷼)/gi)].map(m => m[1] || m[2]);
      console.log('Price samples:', [...new Set(priceMatches)].slice(0, 6));

      // Check tech stack / framework
      const isNext = html.includes('__NEXT_DATA__') || html.includes('_next/');
      const isWP = html.includes('wp-content');
      console.log('Tech:', isNext ? 'Next.js' : isWP ? 'WordPress' : 'Custom');
    } catch (e) {
      console.log(`Failed ${s.name}: ${e.message}`);
    }
  }
}
analyzeSitesDeep();
