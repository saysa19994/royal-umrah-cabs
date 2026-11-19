import DispatchBoard from '@/components/admin/DispatchBoard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = {
  title: 'توزيع الرحلات | ضيوف الرحمن VIP',
  robots: { index: false, follow: false },
};

export default function AdminDispatchPage() {
  return <DispatchBoard />;
}
