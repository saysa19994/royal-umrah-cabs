import { NextResponse } from 'next/server';
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
      .from('seasonal_multipliers')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) {
      console.error('Seasons DB error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to retrieve seasonal multipliers from database' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, seasons: data || [] });
  } catch (err: any) {
    console.error('Admin seasons GET error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const { name, multiplier, start_date, end_date } = await request.json();

    if (!name || multiplier === undefined || !start_date || !end_date) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const numMultiplier = Number(multiplier);
    if (isNaN(numMultiplier) || numMultiplier < 0.5 || numMultiplier > 5.0) {
      return NextResponse.json(
        { success: false, error: 'Multiplier must be a number between 0.5 and 5.0' },
        { status: 400 }
      );
    }

    const startDateObj = new Date(start_date);
    const endDateObj = new Date(end_date);
    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return NextResponse.json({ success: false, error: 'Invalid start_date or end_date format' }, { status: 400 });
    }

    if (startDateObj > endDateObj) {
      return NextResponse.json(
        { success: false, error: 'start_date must be before or equal to end_date' },
        { status: 400 }
      );
    }

    const serviceClient = createServiceClient();

    // Prevent overlapping active seasons
    const { data: activeSeasons, error: activeErr } = await serviceClient
      .from('seasonal_multipliers')
      .select('id, name, start_date, end_date')
      .eq('is_active', true);

    if (!activeErr && activeSeasons && activeSeasons.length > 0) {
      const newStart = startDateObj.getTime();
      const newEnd = endDateObj.getTime();
      const overlap = activeSeasons.find((s) => {
        const sStart = new Date(s.start_date).getTime();
        const sEnd = new Date(s.end_date).getTime();
        return newStart <= sEnd && newEnd >= sStart;
      });

      if (overlap) {
        return NextResponse.json(
          {
            success: false,
            error: `Date range overlaps with existing active season '${overlap.name}' (${overlap.start_date} to ${overlap.end_date})`,
          },
          { status: 400 }
        );
      }
    }

    const { data, error } = await serviceClient
      .from('seasonal_multipliers')
      .insert({
        name,
        multiplier: Math.round(numMultiplier * 100) / 100,
        start_date,
        end_date,
        is_active: true,
      })
      .select()
      .single();

    if (error || !data) {
      console.error('Failed to insert seasonal multiplier:', error);
      return NextResponse.json({ success: false, error: 'Failed to save season' }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'season_created',
      resource: 'pricing_seasons',
      resourceId: data.id,
      newValues: { name, multiplier: numMultiplier, start_date, end_date },
      ip: clientIp,
    });

    return NextResponse.json({ success: true, season: data });
  } catch (err: any) {
    console.error('Admin seasons POST error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const clientIp = getClientIp(request);
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { user: currentUser } = authResult;
    const { id, is_active, multiplier, start_date, end_date } = await request.json();
    if (!id) {
      return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
    }

    const serviceClient = createServiceClient();

    // Fetch existing season
    const { data: currentSeason, error: fetchErr } = await serviceClient
      .from('seasonal_multipliers')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (fetchErr || !currentSeason) {
      return NextResponse.json({ success: false, error: 'Season not found' }, { status: 404 });
    }

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (multiplier !== undefined) {
      const numMultiplier = Number(multiplier);
      if (isNaN(numMultiplier) || numMultiplier < 0.5 || numMultiplier > 5.0) {
        return NextResponse.json(
          { success: false, error: 'Multiplier must be a number between 0.5 and 5.0' },
          { status: 400 }
        );
      }
      updates.multiplier = Math.round(numMultiplier * 100) / 100;
    }

    const targetStartDate = start_date || currentSeason.start_date;
    const targetEndDate = end_date || currentSeason.end_date;

    if (start_date || end_date) {
      if (new Date(targetStartDate) > new Date(targetEndDate)) {
        return NextResponse.json(
          { success: false, error: 'start_date must be before or equal to end_date' },
          { status: 400 }
        );
      }
      if (start_date) updates.start_date = start_date;
      if (end_date) updates.end_date = end_date;
    }

    const targetIsActive = is_active !== undefined ? is_active : currentSeason.is_active;
    if (targetIsActive) {
      // Check for overlap against other active seasons
      const { data: otherActiveSeasons } = await serviceClient
        .from('seasonal_multipliers')
        .select('id, name, start_date, end_date')
        .eq('is_active', true)
        .neq('id', id);

      if (otherActiveSeasons && otherActiveSeasons.length > 0) {
        const curStart = new Date(targetStartDate).getTime();
        const curEnd = new Date(targetEndDate).getTime();
        const overlap = otherActiveSeasons.find((s) => {
          const sStart = new Date(s.start_date).getTime();
          const sEnd = new Date(s.end_date).getTime();
          return curStart <= sEnd && curEnd >= sStart;
        });

        if (overlap) {
          return NextResponse.json(
            {
              success: false,
              error: `Date range overlaps with active season '${overlap.name}' (${overlap.start_date} to ${overlap.end_date})`,
            },
            { status: 400 }
          );
        }
      }
    }

    if (is_active !== undefined) updates.is_active = is_active;

    const { data, error } = await serviceClient
      .from('seasonal_multipliers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      console.error('Failed to update seasonal multiplier:', error);
      return NextResponse.json({ success: false, error: 'Failed to update season' }, { status: 500 });
    }

    await logAuditEvent({
      userEmail: currentUser.email,
      userRole: currentUser.role,
      action: 'season_updated',
      resource: 'pricing_seasons',
      resourceId: id,
      newValues: updates,
      ip: clientIp,
    });

    return NextResponse.json({ success: true, season: data });
  } catch (err: any) {
    console.error('Admin seasons PATCH error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
