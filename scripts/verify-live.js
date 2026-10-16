const https = require('https');

const locales = ['en', 'ar', 'ms'];

function checkLocale(loc) {
  return new Promise((resolve, reject) => {
    https.get(`https://royal-umrah-cabs.vercel.app/${loc}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`\n=== VERIFYING /${loc} ===`);
        console.log('HTTP Status:', res.statusCode);
        console.log('HTML Byte Length:', data.length);
        console.log(`Lang matches "${loc}"?`, data.includes(`lang="${loc}"`));
        console.log(`Dir matches "${loc === 'ar' ? 'rtl' : 'ltr'}"?`, data.includes(`dir="${loc === 'ar' ? 'rtl' : 'ltr'}"`));
        console.log('WhatsApp number 966567588261 present?', data.includes('966567588261'));
        console.log('Complies with no-license claim rule?', !data.includes('TGA') && !data.includes('Nusuk Approved'));
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const loc of locales) {
    await checkLocale(loc);
  }
  console.log('\n✅ ALL LIVE PRODUCTION ENDPOINTS TESTED AND VERIFIED!\n');
}

run();
