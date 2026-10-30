import { createServiceClient } from '@/lib/supabase/service';
import { unstable_cache, revalidateTag, revalidatePath } from 'next/cache';
import { Locale } from '@/i18n/config';
import { BLOG_POSTS, BlogPost } from '@/data/blog-posts';
import fs from 'fs';
import path from 'path';

export interface AdminBlogPost {
  slug: string;
  title_en: string;
  title_ar: string;
  excerpt_en: string;
  excerpt_ar: string;
  category: string;
  featured_image: string;
  author: string;
  read_time_minutes: number;
  published_at: string;
  is_published: boolean;
  content_en?: string;
  content_ar?: string;
}

const RUNTIME_BLOG_FILE = path.join(process.cwd(), 'src', 'data', 'runtime-blog-posts.json');

function getInitialAdminPosts(): AdminBlogPost[] {
  return BLOG_POSTS.map((bp) => ({
    slug: bp.slug,
    title_en: bp.title.en,
    title_ar: bp.title.ar,
    excerpt_en: bp.excerpt.en,
    excerpt_ar: bp.excerpt.ar,
    category: bp.category.en,
    featured_image: bp.featuredImage,
    author: bp.author.en,
    read_time_minutes: parseInt(bp.readTime.en) || 5,
    published_at: bp.publishedAt,
    is_published: true,
    content_en: bp.excerpt.en,
    content_ar: bp.excerpt.ar,
  }));
}

function loadPostsFromDisk(): AdminBlogPost[] {
  try {
    if (fs.existsSync(RUNTIME_BLOG_FILE)) {
      const raw = fs.readFileSync(RUNTIME_BLOG_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return getInitialAdminPosts();
}

function savePostsToDisk(posts: AdminBlogPost[]) {
  try {
    fs.writeFileSync(RUNTIME_BLOG_FILE, JSON.stringify(posts, null, 2), 'utf8');
  } catch (e) {
    console.warn('Failed saving blog posts to disk:', e);
  }
}

let runtimeBlogStore: AdminBlogPost[] = loadPostsFromDisk();

export async function getAllBlogPostsAdmin(): Promise<AdminBlogPost[]> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_key', 'blog_post');

    if (!error && data && data.length > 0) {
      const dbPosts: AdminBlogPost[] = data.map((row) => {
        const b = row.content_blocks || {};
        return {
          slug: b.slug || row.section_key || 'post',
          title_en: b.title_en || row.h1 || '',
          title_ar: b.title_ar || row.h1 || '',
          excerpt_en: b.excerpt_en || row.seo_description || '',
          excerpt_ar: b.excerpt_ar || row.seo_description || '',
          category: b.category || 'Umrah VIP Guide',
          featured_image: b.featured_image || '/assets/images/haram_hero.webp',
          author: b.author || 'Duyuf Alrahman VIP Editorial Team',
          read_time_minutes: b.read_time_minutes || 5,
          published_at: b.published_at || row.updated_at,
          is_published: b.is_published !== false,
          content_en: b.content_en || '',
          content_ar: b.content_ar || '',
        };
      });

      if (dbPosts.length > 0) {
        runtimeBlogStore = dbPosts;
        savePostsToDisk(dbPosts);
        return dbPosts;
      }
    }
  } catch (err) {
    console.warn('Notice querying blog from Supabase:', err);
  }

  return runtimeBlogStore;
}

export async function upsertBlogPostAdmin(post: AdminBlogPost): Promise<{ success: boolean; post?: AdminBlogPost; error?: string }> {
  try {
    const supabase = createServiceClient();
    await supabase.from('page_content').upsert(
      {
        page_key: 'blog_post',
        language: 'en',
        seo_title: post.title_en,
        seo_description: post.excerpt_en,
        h1: post.title_en,
        content_blocks: post,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'page_key, language' }
    );
  } catch (err) {
    console.warn('Error saving blog to Supabase:', err);
  }

  const idx = runtimeBlogStore.findIndex((p) => p.slug === post.slug);
  if (idx !== -1) {
    runtimeBlogStore[idx] = { ...post };
  } else {
    runtimeBlogStore.unshift(post);
  }
  savePostsToDisk(runtimeBlogStore);

  revalidateTag('site_blog');
  revalidatePath('/[locale]/blog', 'page');

  return { success: true, post };
}

export async function deleteBlogPostAdmin(slug: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServiceClient();
    await supabase
      .from('page_content')
      .delete()
      .eq('page_key', 'blog_post')
      .contains('content_blocks', { slug });
  } catch (err) {
    console.warn('Error deleting blog from Supabase:', err);
  }

  runtimeBlogStore = runtimeBlogStore.filter((p) => p.slug !== slug);
  savePostsToDisk(runtimeBlogStore);

  revalidateTag('site_blog');
  revalidatePath('/[locale]/blog', 'page');

  return { success: true };
}
