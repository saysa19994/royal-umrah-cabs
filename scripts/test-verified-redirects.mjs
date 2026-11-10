import fs from 'fs';

async function testRedirects() {
  const nextConfigModule = await import('../next.config.mjs');
  const nextConfig = nextConfigModule.default;
  
  if (typeof nextConfig.redirects !== 'function') {
    throw new Error('nextConfig.redirects is not a function');
  }

  const redirects = await nextConfig.redirects();
  console.log(`Found ${redirects.length} configured redirects.`);

  const requiredSources = [
    '/admin.html',
    '/index.html',
    '/:locale(ar|en|ms|id|ur|fr|es|de|tr|hi)/fleet/camry',
    '/:locale(ar|en|ms|id|ur|fr|es|de|tr|hi)/fleet/yukon',
    '/:locale(ar|en|ms|id|ur|fr|es|de|tr|hi)/fleet/staria',
    '/:locale(ar|en|ms|id|ur|fr|es|de|tr|hi)/fleet/hiace',
    '/:locale(ar|en|ms|id|ur|fr|es|de|tr|hi)/fleet/coaster',
    '/fleet/camry',
    '/fleet/yukon',
    '/fleet/staria',
    '/fleet/hiace',
    '/fleet/coaster',
    '/:locale(ar|en|ms|id|ur|fr|es|de|tr|hi)/guides/vip-umrah-transport-jeddah-to-makkah',
    '/guides/vip-umrah-transport-jeddah-to-makkah',
  ];

  for (const src of requiredSources) {
    const r = redirects.find(item => item.source === src);
    if (!r) {
      throw new Error(`Missing expected redirect source: ${src}`);
    }
    if (r.permanent !== true) {
      throw new Error(`Redirect for ${src} is not permanent (301)`);
    }
    console.log(`✓ 301 Redirect verified: ${r.source} -> ${r.destination}`);
  }

  console.log('\nAll 14 required redirect rules are correctly configured and verified as permanent (301)!');
}

testRedirects().catch(err => {
  console.error('Redirect verification failed:', err);
  process.exit(1);
});
