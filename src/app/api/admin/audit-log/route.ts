import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/auth/server-auth';
import { getAuditLogs } from '@/lib/audit';

function sanitizeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return '""';
  let str = typeof value === 'object' ? JSON.stringify(value) : String(value);
  // Neutralize CSV formula injection (=, +, -, @, \t, \r)
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  return `"${str.replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  try {
    const authResult = await requireRole(request, ['owner', 'admin']);
    if (authResult.errorResponse) {
      return authResult.errorResponse;
    }

    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('user') || undefined;
    const action = searchParams.get('action') || undefined;
    const resource = searchParams.get('resource') || undefined;
    const fromDate = searchParams.get('fromDate') || undefined;
    const toDate = searchParams.get('toDate') || undefined;
    const format = searchParams.get('format') || 'json';

    const logs = await getAuditLogs({
      userEmail,
      action,
      resource,
      fromDate,
      toDate,
      limit: 200,
    });

    if (format === 'csv') {
      const headers = ['Timestamp (UTC)', 'User Email', 'Role', 'Action', 'Resource', 'Resource ID', 'Details', 'IP Address'];
      const rows = logs.map((l) => [
        sanitizeCsvCell(l.created_at),
        sanitizeCsvCell(l.user_email),
        sanitizeCsvCell(l.user_role),
        sanitizeCsvCell(l.action),
        sanitizeCsvCell(l.resource),
        sanitizeCsvCell(l.resource_id || ''),
        sanitizeCsvCell(l.new_values || l.old_values || ''),
        sanitizeCsvCell(l.ip_address || ''),
      ]);

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="royal_umrah_audit_log_${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    return NextResponse.json({ logs });
  } catch (err: any) {
    console.error('Audit log GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
