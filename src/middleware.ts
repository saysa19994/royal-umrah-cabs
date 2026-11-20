import { NextRequest, NextResponse } from 'next/server';
import { LOCALES, DEFAULT_LOCALE, Locale } from './i18n/config';

export const LOCALE_COOKIE_NAME = 'duyuf_locale_preference';

export function getPreferredLocale(request: NextRequest): Locale {
  // 1. Explicit user preference saved in cookie takes top priority
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as Locale;
  }

  // 2. Inspect browser Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const languages = acceptLanguage
    .split(',')
    .map((item) => {
      const [lang, qPart] = item.trim().split(';');
      const q = qPart && qPart.startsWith('q=') ? parseFloat(qPart.slice(2)) : 1.0;
      return { lang: lang.trim().toLowerCase(), q: isNaN(q) ? 1.0 : q };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of languages) {
    const primary = lang.split('-')[0];
    if ((LOCALES as readonly string[]).includes(primary)) {
      return primary as Locale;
    }
    if (primary === 'in' && (LOCALES as readonly string[]).includes('id')) {
      return 'id';
    }
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 0. Consolidate production aliases onto the one public canonical host.
  // Preview deployments stay available for QA, without competing in Search.
  // Only redirect safe read methods so booking/API POST requests are not rewritten.
  const host = (request.headers.get('host') || '').split(':')[0].toLowerCase();
  const isSafeRequest = request.method === 'GET' || request.method === 'HEAD';
  const isAlternateProductionHost =
    host === 'www.duyufalrahmanvip.com' || host.endsWith('.vercel.app');
  if (isSafeRequest && process.env.VERCEL_ENV === 'production' && isAlternateProductionHost) {
    const canonicalUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, 'https://duyufalrahmanvip.com');
    return NextResponse.redirect(canonicalUrl, { status: 308 });
  }


  // Phase-one signature previews, strictly nonindex and outside the public locale resolver.
  if (pathname.startsWith('/signature-lab/')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  }

  // 1. Explicit legacy redirects to eliminate old cached HTML files
  if (pathname === '/admin.html') {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    const res = NextResponse.redirect(url, { status: 301 });
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.headers.set('Clear-Site-Data', '"cache"');
    return res;
  }

  if (pathname === '/index.html') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    const res = NextResponse.redirect(url, { status: 301 });
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    return res;
  }

  // Pass x-pathname for admin routes so layouts can perform server-side path-aware auth redirection
  if (pathname.startsWith('/admin')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 2. Ignore static assets, api routes, and system files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/assets') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.startsWith('/sitemap') ||
    pathname === '/favicon.ico' ||
    pathname === '/llms.txt' ||
    pathname === '/llms-full.txt' ||
    (pathname.startsWith('/google') && pathname.endsWith('.html')) ||
    (pathname.includes('.') && !pathname.endsWith('.html'))
  ) {
    return NextResponse.next();
  }

  // 3. Check if pathname already starts with a supported locale (/ar, /en, /ms, /id, /ur, /fr, /es, /de, /tr, /hi)
  const matchedLocale = LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (matchedLocale) {
    // Do NOT redirect someone who explicitly opens a localized URL (e.g. /ar/ or /tr/).
    // Search engines and visitors can access every explicit locale URL independently.
    const response = NextResponse.next();
    // Staging should be accessible for QA, but should never compete with the
    // live ten-language site in search results.
    if (process.env.VERCEL_ENV === 'preview') {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    }
    return response;
  }

  // 4. First-time or root URL visitor without locale prefix:
  // Detect preferred locale from saved cookie or Accept-Language header, fallback to 'en',
  // and redirect to the explicit locale URL while preventing shared cache cross-contamination.
  const targetLocale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`;

  const response = NextResponse.redirect(url, { status: 307 });
  response.headers.set('Vary', 'Accept-Language, Cookie');
  response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
};
