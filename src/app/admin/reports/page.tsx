import OperationsReport from '@/components/admin/OperationsReport';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = { title: 'تقارير التشغيل | ضيوف الرحمن VIP', robots: { index: false, follow: false } };
export default function AdminOperationsReportsPage() { return <OperationsReport />; }
