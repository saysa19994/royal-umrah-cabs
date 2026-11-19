import BookingOperationsPage from '@/components/admin/BookingOperationsPage';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = {
  title: 'إدارة الحجوزات والرحلات | ضيوف الرحمن VIP',
  robots: { index: false, follow: false },
};

export default function AdminBookingsPage() {
  return <BookingOperationsPage mode="bookings" />;
}
