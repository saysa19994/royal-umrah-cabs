import fs from 'fs';

const filePath = 'd:/royal-umrah-cabs/next.config.mjs';
let s = fs.readFileSync(filePath, 'utf8');

const target = `async redirects() {
    return [
      {
        source: '/admin.html',
        destination: '/admin/login',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
    ];
  },`;

const replacement = `async redirects() {
    return [
      {
        source: '/admin.html',
        destination: '/admin/login',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      // Verified legacy fleet short slug redirects (with locale prefix)
      {
        source: '/:locale(ar|en|ms|id|ur|fr|es|de|tr|hi)/fleet/camry',
        destination: '/:locale/fleet/toyota-camry',
        permanent: true,
      },
      {
        source: '/:locale(ar|en|ms|id|ur|fr|es|de|tr|hi)/fleet/yukon',
        destination: '/:locale/fleet/gmc-yukon-xl',
        permanent: true,
      },
      {
        source: '/:locale(ar|en|ms|id|ur|fr|es|de|tr|hi)/fleet/staria',
        destination: '/:locale/fleet/hyundai-staria',
        permanent: true,
      },
      {
        source: '/:locale(ar|en|ms|id|ur|fr|es|de|tr|hi)/fleet/hiace',
        destination: '/:locale/fleet/toyota-hiace',
        permanent: true,
      },
      {
        source: '/:locale(ar|en|ms|id|ur|fr|es|de|tr|hi)/fleet/coaster',
        destination: '/:locale/fleet/toyota-coaster',
        permanent: true,
      },
      // Verified legacy fleet short slug redirects (root level without locale)
      {
        source: '/fleet/camry',
        destination: '/en/fleet/toyota-camry',
        permanent: true,
      },
      {
        source: '/fleet/yukon',
        destination: '/en/fleet/gmc-yukon-xl',
        permanent: true,
      },
      {
        source: '/fleet/staria',
        destination: '/en/fleet/hyundai-staria',
        permanent: true,
      },
      {
        source: '/fleet/hiace',
        destination: '/en/fleet/toyota-hiace',
        permanent: true,
      },
      {
        source: '/fleet/coaster',
        destination: '/en/fleet/toyota-coaster',
        permanent: true,
      },
      // Moved legacy guide URL
      {
        source: '/:locale(ar|en|ms|id|ur|fr|es|de|tr|hi)/guides/vip-umrah-transport-jeddah-to-makkah',
        destination: '/:locale/blog/vip-umrah-transport-jeddah-to-makkah',
        permanent: true,
      },
      {
        source: '/guides/vip-umrah-transport-jeddah-to-makkah',
        destination: '/en/blog/vip-umrah-transport-jeddah-to-makkah',
        permanent: true,
      },
    ];
  },`;

s = s.replace(target, replacement);
if (!s.includes('toyota-camry')) {
  // If \r\n difference
  s = s.replace(target.replace(/\n/g, '\r\n'), replacement.replace(/\n/g, '\r\n'));
}

fs.writeFileSync(filePath, s, 'utf8');
console.log('Successfully updated next.config.mjs redirects');
