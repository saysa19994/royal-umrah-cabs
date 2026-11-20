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

    const body = await req.json().catch(() => null) as AdminBlogPost | null;
    if (!body || !body.title_en || !body.title_ar || !body.slug) {
      return NextResponse.json({ success: false, error: 'Title (EN/AR) and Slug are required' }, { status: 400 });
    }

    const result = await upsertBlogPostAdmin(body);
    if (!result.success) {
      const isConflict=result.error?.includes('changed by another editor');
      const isValidation=Boolean(result.error?.includes('required') || result.error?.includes('Slug must') ||
        result.error?.includes('supported featured image') || result.error?.includes('at least 300'));
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to save blog post: persistent database unavailable' },
        { status: isConflict?409:isValidation?400:503 }
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

    const expectedParam = searchParams.get('expected_updated_at');
    if (!expectedParam || (expectedParam !== 'none' && Number.isNaN(Date.parse(expectedParam)))) {
      return NextResponse.json({success:false,error:'An article version is required to safely unpublish'}, {status:409});
    }
    const result = await deleteBlogPostAdmin(slug, expectedParam === 'none' ? null : expectedParam);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to unpublish article' },
        { status: result.error?.includes('changed by another editor') ? 409 : 503 }
      );
    }
    return NextResponse.json({ success: true, deletedSlug: slug });
  } catch (err: any) {
    console.error('Blog DELETE error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error deleting blog post' }, { status: 500 });
  }
}
