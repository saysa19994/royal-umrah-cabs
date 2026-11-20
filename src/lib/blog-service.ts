import { createServiceClient } from '@/lib/supabase/service';
import { revalidateTag, revalidatePath, unstable_cache } from 'next/cache';
import { BLOG_POSTS } from '@/data/blog-posts';

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
  updated_at?: string | null;
  expected_updated_at?: string | null;
}

function staticPost(post: (typeof BLOG_POSTS)[number]): AdminBlogPost {
  return {
    slug: post.slug, title_en: post.title.en, title_ar: post.title.ar,
    excerpt_en: post.excerpt.en, excerpt_ar: post.excerpt.ar,
    category: post.category.en, featured_image: post.featuredImage,
    author: post.author.en, read_time_minutes: Number.parseInt(post.readTime.en) || 5,
    published_at: post.publishedAt, is_published: true,
    // Never replace an existing long-form article with its short excerpt.
    content_en: '', content_ar: '', updated_at: null,
  };
}

async function readManagedBlogOverridesFromDb(): Promise<AdminBlogPost[]> {
  const db = createServiceClient();
  const { data, error, count } = await db.from('page_content')
    .select('page_key,content_blocks,updated_at', { count: 'exact' })
    .like('page_key', 'blog_%').eq('language', 'en')
    .order('page_key').range(0, 999);
  if (error || count === null || count === undefined || count > (data?.length || 0)) {
    // A partial or unavailable registry could cause unpublished default posts to
    // reappear or make an administrator unintentionally overwrite saved content.
    console.error('Blog CMS registry read failed:', error?.message || 'Incomplete registry');
    throw new Error('Blog CMS registry unavailable or incomplete');
  }
  return (data || []).filter(row => row.page_key.startsWith('blog_') && row.page_key !== 'blog_post')
    .map(row => {
      const block = row.content_blocks;
      if (!block || typeof block !== 'object' || Array.isArray(block)) return null;
      const b = block as Record<string, unknown>;
      const slug = row.page_key.slice(5);
      if (!/^[a-z0-9-]{3,120}$/.test(slug)) return null;
      const baseline = BLOG_POSTS.find(post => post.slug === slug);
      return {
        ...(baseline ? staticPost(baseline) : {
          slug, title_en:'', title_ar:'', excerpt_en:'', excerpt_ar:'',
          category:'VIP Umrah Transport', featured_image:'', author:'Duyuf Al Rahman VIP',
          read_time_minutes:5, published_at:'', is_published:false, content_en:'', content_ar:'',
        }),
        ...b, slug, updated_at: row.updated_at,
      } as AdminBlogPost;
    }).filter((post):post is AdminBlogPost => Boolean(post));
}

export const getManagedBlogOverridesCached = unstable_cache(
  async (): Promise<AdminBlogPost[]> => readManagedBlogOverridesFromDb(),
  ['managed_blog_posts_v2'],
  { tags:['site_blog'], revalidate:86400 }
);

export async function getManagedBlogPost(slug: string):Promise<AdminBlogPost|null> {
  if (!/^[a-z0-9-]{3,120}$/.test(slug)) return null;
  const posts = await getManagedBlogOverridesCached();
  return posts.find(p => p.slug === slug) || null;
}

export async function getAllBlogPostsAdmin():Promise<AdminBlogPost[]> {
  // Always query the real registry: showing static defaults on a failed admin
  // read could overwrite an unpublished or edited article.
  const saved = await readManagedBlogOverridesFromDb();
  const known = new Map(BLOG_POSTS.map(p => [p.slug, staticPost(p)]));
  for(const p of saved) known.set(p.slug, p);
  return [...known.values()];
}

function validImage(url:string) {
  if(url.startsWith('/assets/') && !url.includes('..')) return true;
  try {
    const image=new URL(url), dbHost=new URL(process.env.NEXT_PUBLIC_SUPABASE_URL||'').host;
    return image.protocol==='https:' && image.host===dbHost &&
      image.pathname.startsWith('/storage/v1/object/public/media/');
  } catch {return false;}
}

export async function upsertBlogPostAdmin(raw:AdminBlogPost):Promise<{success:boolean;post?:AdminBlogPost;error?:string}> {
  if (!raw || typeof raw !== 'object' ||
      !Object.prototype.hasOwnProperty.call(raw,'expected_updated_at') ||
      !(raw.expected_updated_at===null ||
        (typeof raw.expected_updated_at==='string' && !Number.isNaN(Date.parse(raw.expected_updated_at))))) {
    return {success:false,error:'Article changed by another editor: reload current article version before saving'};
  }
  const slug=typeof raw.slug==='string'?raw.slug.trim().toLowerCase():'';
  if(!/^[a-z0-9-]{3,120}$/.test(slug)) return {success:false,error:'Slug must contain 3-120 lowercase letters, numbers or hyphens'};
  if(typeof raw.title_en!=='string'||!raw.title_en.trim()||
     typeof raw.title_ar!=='string'||!raw.title_ar.trim()) return {success:false,error:'Arabic and English titles are required'};
  const current=(await readManagedBlogOverridesFromDb()).find(post=>post.slug===slug) || null;
  if ((current?.updated_at || null)!==raw.expected_updated_at) {
    return {success:false,error:'Article changed by another editor: reload current article version before saving'};
  }
  const legacy=BLOG_POSTS.some(post=>post.slug===slug);
  if(!legacy && raw.is_published && ((raw.content_en||'').trim().length<300 || (raw.content_ar||'').trim().length<300)) {
    return {success:false,error:'New published articles require at least 300 characters of original content in Arabic and English'};
  }
  const featured=String(raw.featured_image||'');
  if(!validImage(featured))return {success:false,error:'Upload a supported featured image from the site media library'};
  const post:AdminBlogPost={
    slug,
    title_en:raw.title_en.slice(0,180),title_ar:raw.title_ar.slice(0,180),
    excerpt_en:String(raw.excerpt_en||'').slice(0,500),excerpt_ar:String(raw.excerpt_ar||'').slice(0,500),
    category:String(raw.category||'VIP Umrah Guide').slice(0,120),featured_image:featured,
    author:String(raw.author||'Duyuf Al Rahman VIP').slice(0,120),
    read_time_minutes:Math.max(1,Math.min(90,Number(raw.read_time_minutes)||5)),
    published_at:current?.published_at || String(raw.published_at || new Date().toISOString().slice(0,10)),
    is_published:raw.is_published===true,
    content_en:String(raw.content_en||'').slice(0,150000),
    content_ar:String(raw.content_ar||'').slice(0,150000),
  };
  const db=createServiceClient();
  // A strictly later updated_at prevents a same-millisecond edit from reusing
  // the previous version token and accidentally accepting another stale write.
  const now=Date.now();
  const previousTime=current?.updated_at ? Date.parse(current.updated_at) : 0;
  const updated_at=new Date(Math.max(now,Number.isFinite(previousTime)?previousTime+1:now)).toISOString();
  const payload={
    page_key:'blog_'+slug,language:'en',seo_title:post.title_en,seo_description:post.excerpt_en,
    h1:post.title_en,content_blocks:post,updated_at,
  };
  if(current) {
    const {data,error}=await db.from('page_content').update(payload)
      .eq('page_key','blog_'+slug).eq('language','en')
      .eq('updated_at',raw.expected_updated_at!)
      .select('updated_at').maybeSingle();
    if(error)return {success:false,error:'Unable to persist article edits: '+error.message};
    if(!data)return {success:false,error:'Article changed by another editor: reload current article version before saving'};
  } else {
    const {error}=await db.from('page_content').insert(payload);
    if(error?.code==='23505')return {success:false,error:'Article changed by another editor: reload current article version before saving'};
    if(error)return {success:false,error:'Unable to persist article edits: '+error.message};
  }
  revalidateTag('site_blog');
  revalidatePath('/[locale]/blog','page');
  revalidatePath('/[locale]/blog/[slug]','page');
  return {success:true,post:{...post,updated_at}};
}

export async function deleteBlogPostAdmin(
  slug:string, expected_updated_at:string|null
):Promise<{success:boolean;error?:string}> {
  const post=(await getAllBlogPostsAdmin()).find(p=>p.slug===slug);
  if(!post) return {success:false,error:'Article not found'};
  // Unpublish instead of deleting: preserve SEO and reject concurrent edits.
  const result=await upsertBlogPostAdmin({...post,expected_updated_at,is_published:false});
  if(!result.success)return result;
  return {success:true};
}
