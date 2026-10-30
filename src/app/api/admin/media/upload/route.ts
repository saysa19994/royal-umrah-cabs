import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';

export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
];

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin', 'operator', 'content_editor']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as string) || 'fleet';
    const vehicleId = formData.get('vehicleId') as string | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const mime = file.type.toLowerCase();
    if (!ALLOWED_MIME_TYPES.includes(mime)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported file type. Please upload JPG, PNG, or WebP.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File exceeds maximum limit of 15MB.' },
        { status: 400 }
      );
    }

    // Clean filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const ext = originalName.substring(originalName.lastIndexOf('.')) || '.webp';
    const baseName = originalName.substring(0, originalName.lastIndexOf('.')) || 'photo';
    const storagePath = `${category}/${vehicleId ? `${vehicleId}_` : ''}${Date.now()}_${baseName}${ext}`;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const supabase = createServiceClient();

    // Upload directly to Supabase Storage "media" bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('media')
      .upload(storagePath, buffer, {
        contentType: mime || 'image/webp',
        upsert: true,
      });

    if (uploadError) {
      console.error('Supabase storage upload error:', uploadError);
      throw new Error(`Failed to upload to storage: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from('media')
      .getPublicUrl(storagePath);

    const publicUrl = publicUrlData.publicUrl;

    // Also register in media_library table if table exists
    try {
      await supabase.from('media_library').insert({
        url: publicUrl,
        category,
        title: originalName,
        metadata: {
          size: file.size,
          mime: file.type,
          vehicleId: vehicleId || null,
          storagePath,
        },
        is_active: true,
      });
    } catch (dbErr) {
      console.warn('Optional media_library insert notice:', dbErr);
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: storagePath,
      sizeKb: Math.round(file.size / 1024),
      category,
      vehicleId,
    });
  } catch (err: any) {
    console.error('Media upload error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error uploading file' },
      { status: 500 }
    );
  }
}
