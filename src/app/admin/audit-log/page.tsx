'use client';

import React, { useState, useEffect } from 'react';
import {
  History,
  Download,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Calendar,
  User,
  Shield,
  FileText,
  Clock,
} from 'lucide-react';
import { AuditLogEntry } from '@/types/auth';

export default function AdminAuditLogPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userFilter, setUserFilter] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const [resourceFilter, setResourceFilter] = useState('');

  // Selected Log Details Modal
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (userFilter) params.append('user', userFilter);
      if (actionFilter) params.append('action', actionFilter);
      if (resourceFilter) params.append('resource', resourceFilter);

      const res = await fetch(`/api/admin/audit-log?${params.toString()}`);
      const data = await res.json();
      if (data.logs) {
        setLogs(data.logs);
      }
    } catch (err) {
      console.error('Failed to fetch audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [userFilter, actionFilter, resourceFilter]);

  const handleExportCsv = () => {
    const params = new URLSearchParams();
    if (userFilter) params.append('user', userFilter);
    if (actionFilter) params.append('action', actionFilter);
    if (resourceFilter) params.append('resource', resourceFilter);
    params.append('format', 'csv');

    window.open(`/api/admin/audit-log?${params.toString()}`, '_blank');
  };

  return (
    <div className="vip-internal-editorial space-y-6">
      {/* Header */}
      <div className="bg-[#FFF9F1] border border-[#E4D4BE] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A6364]/10 border border-[#C29B65]/30 text-xs font-bold text-[#92612D] uppercase tracking-wider mb-2">
            <History className="w-3.5 h-3.5" />
            <span>Accountability &amp; Tamper-Evident History</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-[#193746]">
            Immutable System Audit Log
          </h1>
          <p className="text-xs text-[#697984] mt-1 font-light">
            Every booking change, pricing adjustment, lead assignment, and permission update is logged with user identity and timestamp.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl bg-[#0A6364] text-[#14171C] font-bold text-xs uppercase tracking-wider hover:bg-[#065059] hover:text-white transition-all flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export to CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#FFF9F1] border border-[#E4D4BE] rounded-2xl p-4 flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            placeholder="Filter by user email..."
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="w-full h-10 pl-9 pr-3 text-xs rounded-xl border border-[#E4D4BE] bg-[#F6ECE0] text-[#193746] focus:border-[#C29B65] outline-none"
          />
          <Search className="w-3.5 h-3.5 text-[#79838A] absolute left-3 top-3.5" />
        </div>

        <select
          value={resourceFilter}
          onChange={(e) => setResourceFilter(e.target.value)}
          className="h-10 px-3 text-xs rounded-xl border border-[#E4D4BE] bg-[#F6ECE0] text-[#193746] focus:border-[#C29B65] outline-none"
        >
          <option value="">All Resources</option>
          <option value="bookings">Bookings</option>
          <option value="leads">Leads</option>
          <option value="pricing">Pricing</option>
          <option value="fleet">Fleet</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="users">Users</option>
          <option value="roles">Roles</option>
          <option value="auth">Auth &amp; 2FA</option>
          <option value="ownership">Ownership</option>
        </select>

        <button
          onClick={fetchLogs}
          className="h-10 px-4 rounded-xl border border-[#E4D4BE] hover:border-[#C29B65]/50 text-xs text-[#697984] hover:text-[#193746] flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Logs Table */}
      <div className="bg-[#FFF9F1] border border-[#E4D4BE] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs">
            <thead>
              <tr className="bg-[#F8EFE2] text-[#697984] border-b border-[#E4D4BE]">
                <th className="py-3 px-4 text-start font-semibold">Timestamp (UTC)</th>
                <th className="py-3 px-4 text-start font-semibold">Performed By</th>
                <th className="py-3 px-4 text-start font-semibold">Action</th>
                <th className="py-3 px-4 text-start font-semibold">Resource</th>
                <th className="py-3 px-4 text-end font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#20252D]">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#79838A]">
                    No audit records match the current filter criteria.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#F7EBDB] transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#697984]">
                      {new Date(log.created_at).toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#193746]">{log.user_email}</div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#0A6364]/15 text-[#92612D]">
                        {log.user_role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md text-[11px] font-semibold">
                        {log.action}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#193746] capitalize">{log.resource}</span>
                      {log.resource_id && (
                        <div className="font-mono text-[10px] text-[#697984]">ID: {log.resource_id}</div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-end">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="px-3 py-1.5 rounded-lg border border-[#DCC8AA] hover:border-[#C29B65]/50 text-xs text-[#193746] flex items-center gap-1.5 ml-auto transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#92612D]" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFF9F1] border border-[#E4D4BE] rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4D4BE] pb-3">
              <h3 className="font-display font-bold text-lg text-[#193746]">
                Audit Event Inspection
              </h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-xs text-[#697984] hover:text-[#193746]"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#F6ECE0] border border-[#20252D]">
                <div>
                  <span className="text-[#697984] block text-[10px]">Actor:</span>
                  <span className="font-bold text-[#193746]">{selectedLog.user_email}</span>
                </div>
                <div>
                  <span className="text-[#697984] block text-[10px]">Action:</span>
                  <span className="font-bold text-emerald-400 font-mono">{selectedLog.action}</span>
                </div>
                <div>
                  <span className="text-[#697984] block text-[10px]">Resource:</span>
                  <span className="font-bold text-[#193746]">{selectedLog.resource}</span>
                </div>
                <div>
                  <span className="text-[#697984] block text-[10px]">Timestamp:</span>
                  <span className="font-mono text-[#697984]">{selectedLog.created_at}</span>
                </div>
              </div>

              {selectedLog.old_values && (
                <div>
                  <span className="text-[#697984] block text-[11px] font-semibold mb-1">
                    Previous Values:
                  </span>
                  <pre className="p-3 rounded-xl bg-[#F6ECE0] border border-rose-500/20 text-rose-700 font-mono text-[11px] overflow-x-auto max-h-40">
                    {JSON.stringify(selectedLog.old_values, null, 2)}
                  </pre>
                </div>
              )}

              {selectedLog.new_values && (
                <div>
                  <span className="text-[#697984] block text-[11px] font-semibold mb-1">
                    New Values / Changes:
                  </span>
                  <pre className="p-3 rounded-xl bg-[#F6ECE0] border border-emerald-500/20 text-emerald-700 font-mono text-[11px] overflow-x-auto max-h-40">
                    {JSON.stringify(selectedLog.new_values, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-xl bg-[#F3E7D7] text-xs font-bold text-[#193746] hover:bg-[#F2E7D8]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
