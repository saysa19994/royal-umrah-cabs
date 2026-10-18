import { NextRequest, NextResponse } from 'next/server';
import { LOCALES, DEFAULT_LOCALE } from './i18n/config';

function getPreferredLocale(request: NextRequest): string {
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
      return primary;
    }
    if (primary === 'in' && (LOCALES as readonly string[]).includes('id')) {
      return 'id';
    }
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
    (pathname.includes('.') && !pathname.endsWith('.html'))
  ) {
    return NextResponse.next();
  }

  // 3. Check if pathname starts with a supported locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const targetLocale = getPreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${targetLocale}${pathname === '/' ? '' : pathname}`;
    // Use 307 temporary redirect for locale detection to avoid cache poisoning / sticky redirects
    const res = NextResponse.redirect(url, { status: 307 });
    res.headers.set('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
    return res;
  }

  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
};
