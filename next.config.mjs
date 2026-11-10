/** @type {import('next').NextConfig} */

// Strict Content Security Policy definition with analytics allowlist
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com https://static.cloudflareinsights.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https://*.supabase.co https://duyufalrahmanvip.com https://www.duyufalrahmanvip.com https://api.qrserver.com https://www.google-analytics.com https://www.googletagmanager.com;
  font-src 'self' data:;
  connect-src 'self' https://*.supabase.co https://challenges.cloudflare.com https://www.google-analytics.com https://analytics.google.com https://*.cloudflareinsights.com;
  frame-src 'self' https://challenges.cloudflare.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'duyufalrahmanvip.com',
      },
      {
        protocol: 'https',
        hostname: 'www.duyufalrahmanvip.com',
      },
      {
        protocol: 'https',
        hostname: 'skyhpzdeapmttgmvcoeh.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
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
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
      {
        source: '/(.*).html',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, max-age=0',
          },
          {
            key: 'Clear-Site-Data',
            value: '"cache"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
