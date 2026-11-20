import { revalidateSite } from '@/lib/cache-revalidate';
import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { getAllMediaItemsAdmin, upsertMediaItemAdmin, getFleetImagesCached } from '@/lib/media-service';
import { getClientIp } from '@/lib/rate-limit';
import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const type = searchParams.get('type');

    if (type === 'fleet') {
      const vehicleId = searchParams.get('vehicleId') || undefined;
      const images = await getFleetImagesCached(vehicleId);
      return NextResponse.json({ success: true, images });
    }

    const items = await getAllMediaItemsAdmin(category);
    return NextResponse.json({ success: true, items });
  } catch (err: any) {
    console.error('Media GET error:', err);
    return NextResponse.json({ success: false, error: 'Failed to retrieve media items' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireRole(req, ['owner', 'admin', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }
    const { user: currentUser } = authResult;
    const clientIp = getClientIp(req);

    const body = await req.json();
    const result = await upsertMediaItemAdmin(body, currentUser.email, currentUser.role, clientIp);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to save media item: persistent database unavailable' },
        { status: 503 }
      );
    }

    revalidateSite(['site_media', 'site_fleet']);
    return NextResponse.json({ success: true, item: result.item });
  } catch (err: any) {
    console.error('Media POST error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error saving media item' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Physically deleting media is restricted to an owner/admin and only when
    // the same image is no longer referenced anywhere in managed site data.
    const auth = await requireRole(req, ['owner', 'admin']);
    if (auth.errorResponse) return auth.errorResponse;

    const rawUrl = new URL(req.url).searchParams.get('url');
    if (!rawUrl) return NextResponse.json({
      success:false,error:'A Supabase media URL is required. Remove its associations first.',
    },{status:400});

    const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!base) return NextResponse.json({success:false,error:'Media storage is not configured'},{status:503});
    let pathToDelete:string;
    try {
      const expected=new URL(base),image=new URL(rawUrl);
      const prefix='/storage/v1/object/public/media/';
      if(image.protocol!=='https:'||image.origin!==expected.origin||
        !image.pathname.startsWith(prefix)||image.search||image.hash)throw new Error('untrusted media URL');
      pathToDelete=decodeURIComponent(image.pathname.slice(prefix.length));
      if(!/^(fleet|blog|site|cms|general|hubs|ziyarat)\/[a-zA-Z0-9_.-]+$/.test(pathToDelete) ||
        pathToDelete.includes('..'))throw new Error('invalid storage object key');
    } catch {
      return NextResponse.json({success:false,error:'Only existing media bucket objects may be deleted'},{status:400});
    }

    const db=createServiceClient();
    const [vehicles, content] = await Promise.all([
      db.from('vehicles').select('id,photos'),
      db.from('page_content').select('page_key,content_blocks',{count:'exact'}).range(0,999),
    ]);
    if(vehicles.error||content.error||content.count===null ||
      content.count === undefined || (content.count > (content.data?.length||0))) {
      return NextResponse.json({success:false,error:'Unable to verify image references. File was preserved.'},{status:503});
    }
    const referencedByVehicle=(vehicles.data||[]).some(item=>
      JSON.stringify(item.photos||{}).includes(rawUrl));
    const referencedByPage=(content.data||[]).some(item=>
      JSON.stringify(item.content_blocks||{}).includes(rawUrl));
    if(referencedByVehicle||referencedByPage) {
      return NextResponse.json({success:false,error:'Image is still referenced in a vehicle or public page. Remove that association before permanent deletion.'},{status:409});
    }

    const {data,error}=await db.storage.from('media').remove([pathToDelete]);
    if(error||!data) {
      console.error('Media object deletion rejected:',error?.message);
      return NextResponse.json({success:false,error:'Unable to delete the media object'},{status:503});
    }

    revalidateSite(['site_media','site_fleet']);
    return NextResponse.json({success:true,deleted:true,objectPath:pathToDelete});
  } catch (err) {
    console.error('Media delete error:',err);
    return NextResponse.json({success:false,error:'Media deletion failed safely'},{status:500});
  }
}
