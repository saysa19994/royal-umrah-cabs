import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { getAllBlogPostsAdmin, upsertBlogPostAdmin, deleteBlogPostAdmin, AdminBlogPost } from '@/lib/blog-service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin', 'operator', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const posts = await getAllBlogPostsAdmin();
    return NextResponse.json({ success: true, posts });
  } catch (err: any) {
    console.error('Blog GET error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error retrieving blog posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const body = (await req.json()) as AdminBlogPost;
    if (!body.title_en || !body.title_ar || !body.slug) {
      return NextResponse.json({ success: false, error: 'Title (EN/AR) and Slug are required' }, { status: 400 });
    }

    const result = await upsertBlogPostAdmin(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to save blog post: persistent database unavailable' },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true, post: result.post });
  } catch (err: any) {
    console.error('Blog POST error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error saving blog post' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug parameter is required' }, { status: 400 });
    }

    const result = await deleteBlogPostAdmin(slug);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to delete blog post: persistent database unavailable' },
        { status: 503 }
      );
    }
    return NextResponse.json({ success: true, deletedSlug: slug });
  } catch (err: any) {
    console.error('Blog DELETE error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error deleting blog post' }, { status: 500 });
  }
}
