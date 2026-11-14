import { NextRequest, NextResponse } from 'next/server';
import { LOCALES, Locale } from '@/i18n/config';
import { BLOG_POSTS } from '@/data/blog-posts';
import { getBlogArticleContent } from '@/data/blog-content';

export const dynamic = 'force-dynamic';

/**
 * Public read-only endpoint returning localized article body content for
 * Progressive Enhancement article modal views without bloating client bundles.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug')?.trim() || '';
  const requestedLocale = (searchParams.get('locale')?.trim() || 'en') as Locale;

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json(
      { success: false, error: 'Invalid article slug' },
      { status: 400 }
    );
  }

  if (!LOCALES.includes(requestedLocale)) {
    return NextResponse.json(
      { success: false, error: 'Unsupported locale' },
      { status: 400 }
    );
  }

  const postExists = BLOG_POSTS.some((post) => post.slug === slug);
  if (!postExists) {
    return NextResponse.json(
      { success: false, error: 'Article not found' },
      { status: 404 }
    );
  }

  const content = getBlogArticleContent(slug, requestedLocale);

  return NextResponse.json(
    {
      success: true,
      slug,
      locale: requestedLocale,
      content,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        'X-Content-Type-Options': 'nosniff',
      },
    }
  );
}
