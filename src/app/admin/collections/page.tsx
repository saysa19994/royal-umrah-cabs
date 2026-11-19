import CashCollectionsPanel from '@/components/admin/CashCollectionsPanel';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = {
  title: 'سجل التحصيل النقدي | ضيوف الرحمن VIP',
  robots: { index: false, follow: false },
};
export default function AdminCollectionsPage() {
  return <CashCollectionsPanel />;
}
