import { NextRequest, NextResponse } from 'next/server';
import { LOCALES, Locale } from '@/i18n/config';
import { BLOG_POSTS } from '@/data/blog-posts';
import { getManagedBlogPost } from '@/lib/blog-service';
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

  const saved=await getManagedBlogPost(slug);
  const postExists = BLOG_POSTS.some((post) => post.slug === slug);
  if((saved && !saved.is_published) || (!postExists && (!saved || (requestedLocale!=='en'&&requestedLocale!=='ar')))) {
    return NextResponse.json(
      { success: false, error: 'Article not found' },
      { status: 404 }
    );
  }

  const edited=requestedLocale==='ar'?saved?.content_ar:requestedLocale==='en'?saved?.content_en:null;
  const isEdited=Boolean(saved && edited && edited.trim().length >= 300);
  const paragraphs = isEdited ? edited!.split(/\n\s*\n/).filter(Boolean) : [];
  const content = isEdited ? {
    intro:{ title:requestedLocale==='ar'?saved!.title_ar:saved!.title_en,
      paragraphs:[requestedLocale==='ar'?saved!.excerpt_ar:saved!.excerpt_en]},
    sections:[{title:requestedLocale==='ar'?saved!.title_ar:saved!.title_en,paragraphs}],
    faqTitle:'',faqSubtitle:'',
    cta:{
      title:requestedLocale==='ar'?'احجز رحلتك الخاصة':'Book your private journey',
      subtitle:requestedLocale==='ar'?'الدفع نقداً للسائق بعد الوصول':'Pay in cash to the driver after arrival',
      primaryBtn:requestedLocale==='ar'?'اطلب حجزاً':'Request booking',
      secondaryBtn:requestedLocale==='ar'?'تواصل معنا':'Contact us',
      badges:[],
    },
  } : getBlogArticleContent(slug, requestedLocale);

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
        'Cache-Control': 'public, max-age=0, s-maxage=300, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    }
  );
}
