import { Locale } from '@/i18n/config';
import { BLOG_POSTS } from '@/data/blog-posts';

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
