import BookingOperationsPage from '@/components/admin/BookingOperationsPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminDashboardPage() {
  return <BookingOperationsPage mode="overview" />;
}
