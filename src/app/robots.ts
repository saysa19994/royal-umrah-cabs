import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royal-umrah-cabs.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/api/*'],
      },
      {
        userAgent: ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Applebot-Extended', 'Google-Extended', 'bingbot'],
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/api/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
