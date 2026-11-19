import { Locale } from '@/i18n/config';
import { BLOG_POSTS } from '@/data/blog-posts';
import { getManagedBlogOverridesCached } from '@/lib/blog-service';

export interface EditorialPostPreview {
  slug: string;
  title: string;
  featuredImage: string;
  imageAlt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: string;
  excerpt: string;
  faqs: { question: string; answer: string }[];
}

export function getEditorialPosts(locale: Locale, limit?: number): EditorialPostPreview[] {
  const list = limit ? BLOG_POSTS.slice(0, limit) : BLOG_POSTS;
  return list.map((post) => ({
    slug: post.slug,
    title: post.title[locale] || post.title.en,
    featuredImage: post.featuredImage,
    imageAlt: post.imageAlt[locale] || post.imageAlt.en,
    category: post.category[locale] || post.category.en,
    publishedAt: post.publishedAt,
    readTime: post.readTime[locale] || post.readTime.en,
    author: post.author[locale] || post.author.en,
    excerpt: post.excerpt[locale] || post.excerpt.en,
    faqs: (post.faqs || []).map((f) => ({
      question: f.question[locale] || f.question.en,
      answer: f.answer[locale] || f.answer.en,
    })),
  }));
}

/**
 * Live editorial cards. Existing 10-language guides retain their original localized
 * bodies; only Arabic/English editorial edits override copy. Image overrides are global.
 * New posts appear only in AR/EN until other languages are genuinely translated.
 */
export async function getManagedEditorialPosts(locale: Locale, limit?: number): Promise<EditorialPostPreview[]> {
  const saved = await getManagedBlogOverridesCached();
  const bySlug = new Map(saved.map(p => [p.slug,p]));
  const base = getEditorialPosts(locale).filter(p => bySlug.get(p.slug)?.is_published !== false)
    .map(p => {
      const edit=bySlug.get(p.slug);
      if(!edit)return p;
      const isArabic=locale==='ar', isEnglish=locale==='en';
      return {
        ...p,
        featuredImage:edit.featured_image||p.featuredImage,
        title:isArabic?edit.title_ar||p.title:isEnglish?edit.title_en||p.title:p.title,
        excerpt:isArabic?edit.excerpt_ar||p.excerpt:isEnglish?edit.excerpt_en||p.excerpt:p.excerpt,
        category:(isArabic||isEnglish)?edit.category||p.category:p.category,
        readTime:String(edit.read_time_minutes||5),
      };
    });
  if(locale==='ar'||locale==='en') {
    for(const edit of saved) {
      if(!edit.is_published || BLOG_POSTS.some(p=>p.slug===edit.slug))continue;
      const ar=locale==='ar';
      base.unshift({
        slug:edit.slug,title:ar?edit.title_ar:edit.title_en,
        featuredImage:edit.featured_image,
        imageAlt:ar?edit.title_ar:edit.title_en,
        category:edit.category,
        publishedAt:edit.published_at,
        readTime:String(edit.read_time_minutes),
        author:edit.author,
        excerpt:ar?edit.excerpt_ar:edit.excerpt_en,
        faqs:[],
      });
    }
  }
  return limit?base.slice(0,limit):base;
}
