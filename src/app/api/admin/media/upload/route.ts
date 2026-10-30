import { NextRequest, NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { getClientIp } from '@/lib/rate-limit';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/avif',
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

    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
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

    // Determine target upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'assets', 'images', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Clean filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const ext = path.extname(originalName) || '.webp';
    const baseName = path.basename(originalName, ext);
    const uniqueFileName = `${category}_${baseName}_${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    // Convert file buffer and save locally to public assets
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/assets/images/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
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
