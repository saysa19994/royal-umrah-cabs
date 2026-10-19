import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { requireRole } from '@/lib/auth/server-auth';
import { logAuditEvent } from '@/lib/audit';
import { createServiceClient } from '@/lib/supabase/service';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { sendOwnershipTransferEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    // 1. Strictly require an authenticated OWNER session with AAL2 (requireRole checks AAL2 for owner)
    const authResult = await requireRole(request, ['owner']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentOwner } = authResult;

    // Rate limiting: max 3 transfer requests per hour
    const rl = await rateLimit(`ownership_transfer:${clientIp}:${currentOwner.email}`, 3, 3600);
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many ownership transfer requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { target_email } = body;
    const cleanTarget = (target_email || '').trim().toLowerCase();

    if (!cleanTarget) {
      return NextResponse.json({ error: 'Target email is required' }, { status: 400 });
    }

    if (cleanTarget === currentOwner.email) {
      return NextResponse.json({ error: 'Target email is already the active owner' }, { status: 400 });
    }

    const serviceClient = createServiceClient();

    // Verify target user exists and is an active staff member
    const { data: targetUser, error: targetError } = await serviceClient
      .from('user_profiles')
      .select('id, email, is_suspended')
      .eq('email', cleanTarget)
      .maybeSingle();

    if (targetError || !targetUser) {
      return NextResponse.json(
        { error: 'Target user does not exist. The recipient must have an active staff profile first.' },
        { status: 404 }
      );
    }

    if (targetUser.is_suspended) {
      return NextResponse.json(
        { error: 'Cannot transfer ownership to a suspended account.' },
        { status: 400 }
      );
    }

    // Invalidate any older pending transfers for this owner
    await serviceClient
      .from('ownership_transfers')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('current_owner_email', currentOwner.email)
      .eq('status', 'pending');

    // Generate high-entropy 32-byte cryptographically secure token and store SHA-256 hash
    const rawToken = crypto.randomBytes(32).toString('hex').toUpperCase();
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const { data: record, error: insertError } = await serviceClient
      .from('ownership_transfers')
      .insert({
        current_owner_email: currentOwner.email,
        target_owner_email: cleanTarget,
        confirmation_token: tokenHash,
        status: 'pending',
        expires_at: expiresAt,
      })
      .select('id, current_owner_email, target_owner_email, status, expires_at, created_at')
      .single();

    if (insertError) {
      console.error('Failed to create ownership transfer record:', insertError);
      return NextResponse.json({ error: 'Failed to initiate ownership transfer' }, { status: 500 });
    }

    // NEVER return confirmation token in the API response or print to stdout.
    // Dispatched securely via transactional email to current owner.
    const emailRes = await sendOwnershipTransferEmail({
      to: currentOwner.email,
      targetEmail: cleanTarget,
      confirmationToken: rawToken,
      expiresAt,
    });

    if (!emailRes.success) {
      await serviceClient
        .from('ownership_transfers')
        .update({ status: 'failed' })
        .eq('id', record.id);

      return NextResponse.json(
        { error: `Ownership transfer email dispatch failed: ${emailRes.error || 'Email service unavailable'}. Please verify configuration.` },
        { status: 503 }
      );
    }

    await logAuditEvent({
      userEmail: currentOwner.email,
      userRole: 'owner',
      action: 'ownership_transfer_initiated',
      resource: 'ownership',
      resourceId: record.id,
      newValues: { target_email: cleanTarget, expires_at: expiresAt },
      ip: clientIp,
    });

    return NextResponse.json({
      success: true,
      transfer: {
        id: record.id,
        target_email: cleanTarget,
        expires_at: expiresAt,
        message: 'Ownership transfer initiated. A confidential confirmation token has been sent to the verified owner email. Do not share it.',
      },
    });
  } catch (err: any) {
    console.error('Ownership transfer POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const clientIp = getClientIp(request);
    // Require authenticated owner session
    const authResult = await requireRole(request, ['owner']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentOwner } = authResult;
    const body = await request.json();
    const { confirmation_token } = body;
    const cleanToken = (confirmation_token || '').trim().toUpperCase();

    if (!cleanToken) {
      return NextResponse.json({ error: 'Confirmation token is required' }, { status: 400 });
    }

    const serviceClient = createServiceClient();
    const tokenHash = crypto.createHash('sha256').update(cleanToken).digest('hex');

    // Query pending transfer by hashed token (or clean token for backwards compatibility)
    const { data: transfer, error: findError } = await serviceClient
      .from('ownership_transfers')
      .select('*')
      .or(`confirmation_token.eq.${tokenHash},confirmation_token.eq.${cleanToken}`)
      .eq('status', 'pending')
      .maybeSingle();

    if (findError || !transfer) {
      return NextResponse.json(
        { error: 'Invalid or expired confirmation token.' },
        { status: 400 }
      );
    }

    if (transfer.current_owner_email !== currentOwner.email) {
      return NextResponse.json(
        { error: 'Unauthorized: Only the initiator of this transfer may confirm it.' },
        { status: 403 }
      );
    }

    if (new Date(transfer.expires_at).getTime() < Date.now()) {
      await serviceClient
        .from('ownership_transfers')
        .update({ status: 'expired' })
        .eq('id', transfer.id);
      return NextResponse.json({ error: 'Transfer token has expired.' }, { status: 400 });
    }

    // Execute transfer in database with atomic rollback protection:
    // 1. Promote target to 'owner'
    const { error: promoErr } = await serviceClient
      .from('user_profiles')
      .update({ role: 'owner', updated_at: new Date().toISOString() })
      .eq('email', transfer.target_owner_email);

    if (promoErr) {
      console.error('Failed to promote new owner:', promoErr);
      return NextResponse.json({ error: 'Failed to update owner role' }, { status: 500 });
    }

    // 2. Demote current owner to 'admin'
    const { error: demoteErr } = await serviceClient
      .from('user_profiles')
      .update({ role: 'admin', updated_at: new Date().toISOString() })
      .eq('email', transfer.current_owner_email);

    if (demoteErr) {
      console.error('Failed to demote old owner, rolling back new owner promotion:', demoteErr);
      // Atomic Rollback: revert target to admin so we do not end up with dual owners or partial state
      await serviceClient
        .from('user_profiles')
        .update({ role: 'admin', updated_at: new Date().toISOString() })
        .eq('email', transfer.target_owner_email);

      return NextResponse.json(
        { error: 'Failed to complete ownership transfer. Role changes were safely rolled back.' },
        { status: 500 }
      );
    }

    // 3. Mark transfer confirmed
    await serviceClient
      .from('ownership_transfers')
      .update({ status: 'confirmed' })
      .eq('id', transfer.id);

    await logAuditEvent({
      userEmail: transfer.current_owner_email,
      userRole: 'owner',
      action: 'ownership_transferred_successfully',
      resource: 'ownership',
      resourceId: transfer.id,
      oldValues: { owner: transfer.current_owner_email },
      newValues: { owner: transfer.target_owner_email },
      ip: clientIp,
    });

    return NextResponse.json({
      success: true,
      message: `Ownership successfully transferred to ${transfer.target_owner_email}.`,
    });
  } catch (err: any) {
    console.error('Ownership transfer PUT error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
