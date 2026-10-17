import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { logAuditEvent } from '@/lib/audit';
import { createClient } from '@/lib/supabase/server';
import { OwnershipTransferRecord } from '@/types/auth';

let activeTransfers: OwnershipTransferRecord[] = [];

export async function POST(request: Request) {
  try {
    const { target_email } = await request.json();
    const cleanTarget = (target_email || '').trim().toLowerCase();

    if (!cleanTarget) {
      return NextResponse.json({ error: 'Target email is required' }, { status: 400 });
    }

    if (cleanTarget === 'owner@royalumrahcabs.com') {
      return NextResponse.json({ error: 'Target email is already the active owner' }, { status: 400 });
    }

    const token = crypto.randomBytes(24).toString('hex').toUpperCase();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const record: OwnershipTransferRecord = {
      id: `trans-${Date.now()}`,
      current_owner_email: 'owner@royalumrahcabs.com',
      target_owner_email: cleanTarget,
      confirmation_token: token,
      status: 'pending',
      expires_at: expiresAt,
      created_at: new Date().toISOString(),
    };

    activeTransfers.push(record);

    try {
      const supabase = createClient();
      await supabase.from('ownership_transfers').insert({
        current_owner_email: record.current_owner_email,
        target_owner_email: record.target_owner_email,
        confirmation_token: record.confirmation_token,
        status: record.status,
        expires_at: record.expires_at,
      });
    } catch (e) {
      console.warn('DB transfer fallback:', e);
    }

    await logAuditEvent({
      userEmail: 'owner@royalumrahcabs.com',
      userRole: 'owner',
      action: 'ownership_transfer_initiated',
      resource: 'ownership',
      resourceId: record.id,
      newValues: { target_email: cleanTarget, expires_at: expiresAt },
    });

    return NextResponse.json({
      success: true,
      transfer: {
        id: record.id,
        target_email: cleanTarget,
        confirmation_token: token,
        expires_at: expiresAt,
        message: 'Ownership transfer initiated. Keep this confirmation token safe to verify and complete the transfer.',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { confirmation_token } = await request.json();
    const cleanToken = (confirmation_token || '').trim().toUpperCase();

    const transfer = activeTransfers.find(
      (t) => t.confirmation_token === cleanToken && t.status === 'pending'
    );

    if (!transfer) {
      return NextResponse.json(
        { error: 'Invalid or expired confirmation token.' },
        { status: 400 }
      );
    }

    if (new Date(transfer.expires_at).getTime() < Date.now()) {
      transfer.status = 'expired';
      return NextResponse.json({ error: 'Transfer token has expired.' }, { status: 400 });
    }

    transfer.status = 'confirmed';

    try {
      const supabase = createClient();
      // Promote target
      await supabase
        .from('user_profiles')
        .update({ role: 'owner', updated_at: new Date().toISOString() })
        .eq('email', transfer.target_owner_email);

      // Demote current owner to admin
      await supabase
        .from('user_profiles')
        .update({ role: 'admin', updated_at: new Date().toISOString() })
        .eq('email', transfer.current_owner_email);

      await supabase
        .from('ownership_transfers')
        .update({ status: 'confirmed' })
        .eq('confirmation_token', cleanToken);
    } catch (e) {
      console.warn('Supabase DB ownership transfer fallback:', e);
    }

    await logAuditEvent({
      userEmail: transfer.current_owner_email,
      userRole: 'owner',
      action: 'ownership_transferred_successfully',
      resource: 'ownership',
      oldValues: { owner: transfer.current_owner_email },
      newValues: { owner: transfer.target_owner_email },
    });

    return NextResponse.json({
      success: true,
      message: `Ownership successfully transferred to ${transfer.target_owner_email}.`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
