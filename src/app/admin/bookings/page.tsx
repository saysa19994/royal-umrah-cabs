import BookingBoard from '@/components/admin/BookingBoard';

export const dynamic='force-dynamic';
export const revalidate=0;
export const metadata={title:'إدارة الحجوزات | ضيوف الرحمن VIP',robots:{index:false,follow:false}};

export default function AdminBookingsPage(){return <BookingBoard/>;}
