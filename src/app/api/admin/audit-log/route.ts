import { NextResponse } from 'next/server';
import { getAuditLogs } from '@/lib/audit';

export async function GET(request: Request) {
  try {
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
        `"${l.created_at}"`,
        `"${l.user_email}"`,
        `"${l.user_role}"`,
        `"${l.action}"`,
        `"${l.resource}"`,
        `"${l.resource_id || ''}"`,
        `"${JSON.stringify(l.new_values || l.old_values || '').replace(/"/g, '""')}"`,
        `"${l.ip_address || ''}"`,
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
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
