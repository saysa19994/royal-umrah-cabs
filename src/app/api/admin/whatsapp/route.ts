import { NextResponse } from 'next/server';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { requireRole } from '@/lib/auth/server-auth';
import { createServiceClient } from '@/lib/supabase/service';
import { logAuditEvent } from '@/lib/audit';
import { getClientIp } from '@/lib/rate-limit';

export async function GET(request: Request) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient
      .from('whatsapp_numbers')
      .select('*')
      .order('priority', { ascending: true });

    if (error) {
      console.error('Error fetching whatsapp_numbers:', error);
      return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, numbers: data || [] });
  } catch (err: any) {
    console.error('Admin whatsapp GET error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

const WhatsAppCreateSchema = z.object({
  label: z.string().trim().min(2).max(100),
  number: z.string().regex(/^\+?[0-9]{8,15}$/, 'Must be 8-15 digits'),
  priority: z.number().int().min(1).max(10).default(3),
  routing_rule: z.enum(['all_to_main', 'round_robin', 'by_language', 'by_working_hours', 'main_with_fallback']).default('main_with_fallback'),
  assigned_languages: z.array(z.string().max(10)).default(['en']),
});

const WhatsAppPatchSchema = z.object({
  id: z.string().uuid().optional(),
  is_active: z.boolean().optional(),
  label: z.string().trim().min(2).max(100).optional(),
  number: z.string().regex(/^\+?[0-9]{8,15}$/, 'Must be 8-15 digits').optional(),
  routing_rule: z.enum(['all_to_main', 'round_robin', 'by_language', 'by_working_hours', 'main_with_fallback']).optional(),
  priority: z.number().int().min(1).max(10).optional(),
  assigned_languages: z.array(z.string().max(10)).optional(),
});

export async function PATCH(request: Request) {
  try {
    const clientIp = getClientIp(request);
    // Owner-only guard for modifying operational WhatsApp configuration
    const authResult = await requireRole(request, ['owner']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const parseResult = WhatsAppPatchSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validated = parseResult.data;
    const { id, is_active, label, number, routing_rule, priority, assigned_languages } = validated;
    const serviceClient = createServiceClient();

    if (id) {
      const updates: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };
      if (is_active !== undefined) updates.is_active = is_active;
      if (label !== undefined) updates.label = label;
      if (number !== undefined) updates.number = number.replace(/[^0-9]/g, '');
      if (routing_rule !== undefined) updates.routing_rule = routing_rule;
      if (priority !== undefined) updates.priority = priority;
      if (assigned_languages !== undefined) updates.assigned_languages = assigned_languages;

      const { data, error } = await serviceClient
        .from('whatsapp_numbers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error || !data) {
        console.error('Error updating whatsapp_number:', error);
        return NextResponse.json({ success: false, error: 'Failed to update number' }, { status: 500 });
      }

      await logAuditEvent({
        userEmail: currentUser.email,
        userRole: currentUser.role,
        action: 'whatsapp_number_update',
        resource: 'whatsapp',
        resourceId: id,
        newValues: updates,
        ip: clientIp,
      });

      try {
        revalidatePath('/', 'layout');
      } catch (revalErr) {
        console.warn('Revalidation notice:', revalErr);
      }

      return NextResponse.json({ success: true, updated: data });
    } else if (routing_rule) {
      const { error } = await serviceClient
        .from('whatsapp_numbers')
        .update({ routing_rule, updated_at: new Date().toISOString() })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (error) {
        return NextResponse.json({ success: false, error: 'Failed to update routing rule' }, { status: 500 });
      }

      await logAuditEvent({
        userEmail: currentUser.email,
        userRole: currentUser.role,
        action: 'whatsapp_rule_change',
        resource: 'whatsapp',
        resourceId: 'global',
        newValues: { routing_rule },
        ip: clientIp,
      });

      try {
        revalidatePath('/', 'layout');
      } catch (revalErr) {
        console.warn('Revalidation notice:', revalErr);
      }

      return NextResponse.json({ success: true, message: `Routing rule updated to ${routing_rule}` });
    }

    return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
  } catch (err: any) {
    console.error('Admin whatsapp PATCH error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    // Owner-only guard for creating operational WhatsApp numbers
    const authResult = await requireRole(request, ['owner']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const body = await request.json();
    const parseResult = WhatsAppCreateSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { label, number, priority, routing_rule, assigned_languages } = parseResult.data;
    const cleanNumber = number.replace(/[^0-9]/g, '');
    const serviceClient = createServiceClient();

    const { data, error } = await serviceClient
      .from('whatsapp_numbers')
      .insert({
        label,
        number: cleanNumber,
        priority,
        routing_rule,
        assigned_languages,
        is_active: true,
      })
      .select()
      .single();

    if (error || !data) {
      return NextResponse.json({ success: false, error: 'Failed to create WhatsApp number' }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'whatsapp_number_created',
      resource: 'whatsapp',
      resourceId: data.id,
      newValues: { label, number: cleanNumber },
      ip: clientIp,
    });

    try {
      revalidatePath('/', 'layout');
    } catch (revalErr) {
      console.warn('Revalidation notice:', revalErr);
    }

    return NextResponse.json({ success: true, created: data });
  } catch (err: any) {
    console.error('Admin whatsapp POST error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
