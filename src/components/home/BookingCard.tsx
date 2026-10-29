'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Locale, CURRENCIES, CurrencyCode } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Luggage,
  Car,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Plane,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Edit2,
  Phone,
  User,
} from 'lucide-react';
import { TurnstileWidget } from '@/components/common/TurnstileWidget';
import { AUTHORITATIVE_TRANSFER_RATES } from '@/lib/pricing-constants';
import { trackEvent } from '@/lib/analytics';

interface BookingCardProps {
  locale: Locale;
  dict: Dictionary;
  initialRates?: Record<string, Record<string, number>>;
  settings?: {
    riyadh_enabled?: boolean;
    taif_enabled?: boolean;
  };
}

const BASE_RATES: Record<string, Record<string, number>> = AUTHORITATIVE_TRANSFER_RATES;

const TAIF_ROUTE_KEYS = new Set(['makkah-to-taif', 'taif-to-makkah', 'jeddah-to-taif']);
const RIYADH_ROUTE_KEYS = new Set(['riyadh-airport-transfer', 'riyadh-to-makkah', 'riyadh-to-madinah']);

const ROUTE_LABELS: Record<string, Record<Locale, string>> = {
  'jeddah-airport-to-makkah': {
    en: 'Jeddah Airport (KAIA) → Makkah Hotel',
    ar: 'مطار جدة (KAIA) ← فندق مكة المكرمة',
    ms: 'Lapangan Terbang Jeddah (KAIA) → Hotel Makkah',
    tr: 'Cidde Havalimanı (KAIA) → Mekke Oteli',
    id: 'Bandara Jeddah (KAIA) → Hotel Makkah',
    ur: 'جدہ ایئرپورٹ (KAIA) ← مکہ ہوٹل',
    fr: 'Aéroport de Djeddah (KAIA) → Hôtel La Mecque',
    es: 'Aeropuerto de Yeda (KAIA) → Hotel La Meca',
    de: 'Flughafen Dschidda (KAIA) → Hotel Mekka',
    hi: 'जेद्दा हवाई अड्डा (KAIA) → मक्का होटल',
  },
  'makkah-to-jeddah-airport': {
    en: 'Makkah Hotel → Jeddah Airport (KAIA)',
    ar: 'فندق مكة المكرمة ← مطار جدة (KAIA)',
    ms: 'Hotel Makkah → Lapangan Terbang Jeddah (KAIA)',
    tr: 'Mekke Oteli → Cidde Havalimanı (KAIA)',
    id: 'Hotel Makkah → Bandara Jeddah (KAIA)',
    ur: 'مکہ ہوٹل ← جدہ ایئرپورٹ (KAIA)',
    fr: 'Hôtel La Mecque → Aéroport de Djeddah (KAIA)',
    es: 'Hotel La Meca → Aeropuerto de Yeda (KAIA)',
    de: 'Hotel Mekka → Flughafen Dschidda (KAIA)',
    hi: 'मक्का होटल → जेद्दा हवाई अड्डा (KAIA)',
  },
  'makkah-to-madinah': {
    en: 'Makkah Hotel → Madinah Al-Munawwarah',
    ar: 'فندق مكة المكرمة ← المدينة المنورة',
    ms: 'Hotel Makkah → Madinah Al-Munawwarah',
    tr: 'Mekke Oteli → Medine-i Münevvere',
    id: 'Hotel Makkah → Madinah Al-Munawwarah',
    ur: 'مکہ ہوٹل ← مدینہ منورہ',
    fr: 'Hôtel La Mecque → Médine Al-Munawwarah',
    es: 'Hotel La Meca → Medina Al-Munawwarah',
    de: 'Hotel Mekka → Medina Al-Munawwarah',
    hi: 'मक्का होटल → मदीना अल-मुनव्वरह',
  },
  'madinah-to-makkah': {
    en: 'Madinah Hotel → Makkah (Via Miqat Bir Ali)',
    ar: 'المدينة المنورة ← مكة المكرمة (عبر ميقات آبار علي)',
    ms: 'Hotel Madinah → Makkah (Singgah Miqat Bir Ali)',
    tr: 'Medine Oteli → Mekke (Zülhuleyfe Mikat Noktası)',
    id: 'Hotel Madinah → Makkah (Via Miqat Bir Ali)',
    ur: 'مدینہ ہوٹل ← مکہ مکرمہ (براستہ میقات بئر علی)',
    fr: 'Hôtel Médine → La Mecque (Via Miqat Bir Ali)',
    es: 'Hotel Medina → La Meca (Vía Miqat Bir Ali)',
    de: 'Hotel Medina → Mekka (Über Miqat Bir Ali)',
    hi: 'मदीना होटल → मक्का (मीक़ात बीर अली होकर)',
  },
  'madinah-airport-to-hotel': {
    en: 'Madinah Airport (MED) → Madinah Hotel',
    ar: 'مطار المدينة (MED) ← فنادق الحرم بالمدينة',
    ms: 'Lapangan Terbang Madinah (MED) → Hotel Madinah',
    tr: 'Medine Havalimanı (MED) → Medine Oteli',
    id: 'Bandara Madinah (MED) → Hotel Madinah',
    ur: 'مدینہ ایئرپورٹ (MED) ← مدینہ ہوٹل',
    fr: 'Aéroport de Médine (MED) → Hôtel Médine',
    es: 'Aeropuerto de Medina (MED) → Hotel Medina',
    de: 'Flughafen Medina (MED) → Hotel Medina',
    hi: 'मदीना हवाई अड्डा (MED) → मदीना होटल',
  },
  'jeddah-to-madinah': {
    en: 'Jeddah City / Airport → Madinah Hotel',
    ar: 'مدينة أو مطار جدة ← المدينة المنورة',
    ms: 'Jeddah / Lapangan Terbang → Hotel Madinah',
    tr: 'Cidde Şehir / Havalimanı → Medine Oteli',
    id: 'Kota / Bandara Jeddah → Hotel Madinah',
    ur: 'جدہ شہر / ایئرپورٹ ← مدینہ ہوٹل',
    fr: 'Djeddah Ville / Aéroport → Hôtel Médine',
    es: 'Yeda Ciudad / Aeropuerto → Hotel Medina',
    de: 'Dschidda Stadt / Flughafen → Hotel Medina',
    hi: 'जेद्दा शहर / हवाई अड्डा → मदीना होटल',
  },
  'makkah-to-taif': {
    en: 'Makkah Hotel → Taif (Al Hada / City)',
    ar: 'فندق مكة المكرمة ← الطائف (الهدا / المدينة)',
    ms: 'Hotel Makkah → Taif (Al Hada / Bandar)',
    tr: 'Mekke Oteli → Taif (Al Hada / Şehir)',
    id: 'Hotel Makkah → Taif (Al Hada / Kota)',
    ur: 'مکہ ہوٹل ← طائف (الھدا / شہر)',
    fr: 'Hôtel La Mecque → Taïf (Al Hada / Ville)',
    es: 'Hotel La Meca → Taif (Al Hada / Ciudad)',
    de: 'Hotel Mekka → Taif (Al Hada / Stadt)',
    hi: 'मक्का होटल → ताइफ़ (अल हदा / शहर)',
  },
  'taif-to-makkah': {
    en: 'Taif → Makkah Hotel (Via Miqat Qarn al-Manazil)',
    ar: 'الطائف ← فندق مكة المكرمة (عبر ميقات قرن المنازل)',
    ms: 'Taif → Hotel Makkah (Singgah Miqat Qarnul Manazil)',
    tr: 'Taif → Mekke Oteli (Karnülmenazil Mikat Noktası)',
    id: 'Taif → Hotel Makkah (Via Miqat Qarnul Manazil)',
    ur: 'طائف ← مکہ ہوٹل (براستہ میقات قرن المنازل)',
    fr: 'Taïf → Hôtel La Mecque (Via Miqat Qarn al-Manazil)',
    es: 'Taif → Hotel La Meca (Vía Miqat Qarn al-Manazil)',
    de: 'Taif → Hotel Mekka (Über Miqat Qarn al-Manazil)',
    hi: 'ताइफ़ → मक्का होटल (मीक़ात क़र्न अल-मनाज़िल होकर)',
  },
  'jeddah-to-taif': {
    en: 'Jeddah Airport (KAIA) → Taif (Al Hada)',
    ar: 'مطار جدة (KAIA) ← الطائف (الهدا)',
    ms: 'Lapangan Terbang Jeddah (KAIA) → Taif (Al Hada)',
    tr: 'Cidde Havalimanı (KAIA) → Taif (Al Hada)',
    id: 'Bandara Jeddah (KAIA) → Taif (Al Hada)',
    ur: 'جدہ ایئرپورٹ (KAIA) ← طائف (الھدا)',
    fr: 'Aéroport de Djeddah (KAIA) → Taïf (Al Hada)',
    es: 'Aeropuerto de Yeda (KAIA) → Taif (Al Hada)',
    de: 'Flughafen Dschidda (KAIA) → Taif (Al Hada)',
    hi: 'जेद्दा हवाई अड्डा (KAIA) → ताइफ़ (अल हदा)',
  },
  'riyadh-airport-transfer': {
    en: 'Riyadh Airport (RUH) ⇄ Riyadh Hotels',
    ar: 'مطار الرياض (RUH) ⇄ فنادق الرياض',
    ms: 'Lapangan Terbang Riyadh (RUH) ⇄ Hotel Riyadh',
    tr: 'Riyad Havalimanı (RUH) ⇄ Riyad Otelleri',
    id: 'Bandara Riyadh (RUH) ⇄ Hotel Riyadh',
    ur: 'ریاض ایئرپورٹ (RUH) ⇄ ریاض ہوٹلز',
    fr: 'Aéroport de Riyad (RUH) ⇄ Hôtels de Riyad',
    es: 'Aeropuerto de Riad (RUH) ⇄ Hoteles de Riad',
    de: 'Flughafen Riad (RUH) ⇄ Hotels in Riad',
    hi: 'रियाद हवाई अड्डा (RUH) ⇄ रियाद होटल',
  },
  'riyadh-to-makkah': {
    en: 'Riyadh ⇄ Makkah Hotel (VIP Highway)',
    ar: 'الرياض ⇄ مكة المكرمة (طريق سريع VIP)',
    ms: 'Riyadh ⇄ Hotel Makkah (Lebuhraya VIP)',
    tr: 'Riyad ⇄ Mekke Oteli (VIP Otoyol)',
    id: 'Riyadh ⇄ Hotel Makkah (Jalan Tol VIP)',
    ur: 'ریاض ⇄ مکہ مکرمہ (ہائی وے وی آئی پی)',
    fr: 'Riyad ⇄ Hôtel La Mecque (Autoroute VIP)',
    es: 'Riad ⇄ Hotel La Meca (Autopista VIP)',
    de: 'Riad ⇄ Hotel Mekka (VIP-Fernstraße)',
    hi: 'रियाद ⇄ मक्का होटल (वीआईपी हाईवे)',
  },
  'riyadh-to-madinah': {
    en: 'Riyadh ⇄ Madinah Hotel (VIP Highway)',
    ar: 'الرياض ⇄ المدينة المنورة (طريق سريع VIP)',
    ms: 'Riyadh ⇄ Hotel Madinah (Lebuhraya VIP)',
    tr: 'Riyad ⇄ Medine Oteli (VIP Otoyol)',
    id: 'Riyadh ⇄ Hotel Madinah (Jalan Tol VIP)',
    ur: 'ریاض ⇄ مدینہ منورہ (ہائی وے وی آئی پی)',
    fr: 'Riyad ⇄ Hôtel Médine (Autoroute VIP)',
    es: 'Riad ⇄ Hotel Medina (Autopista VIP)',
    de: 'Riad ⇄ Hotel Medina (VIP-Fernstraße)',
    hi: 'रियाद ⇄ मदीना होटल (वीआईपी हाईवे)',
  },
};

interface FleetOption {
  id: string;
  name: string;
  category: string;
  seats: number;
  bags: number;
  img: string;
  features: string[];
}

const FLEET_OPTIONS: FleetOption[] = [
  {
    id: 'camry',
    name: 'Toyota Camry Executive',
    category: 'Executive Sedan',
    seats: 4,
    bags: 3,
    img: '/assets/images/camry_exterior.webp',
    features: ['Up to 4 Passengers', '3 Luggage Bags', 'Dual-Zone A/C', 'Economic & Smooth'],
  },
  {
    id: 'staria',
    name: 'Hyundai Staria VIP',
    category: 'Executive VIP Van',
    seats: 7,
    bags: 6,
    img: '/assets/images/staria_exterior.webp',
    features: ['Up to 7 Passengers', '6 Large Bags', 'Captain Seats', 'Panoramic Privacy Glass'],
  },
  {
    id: 'yukon',
    name: 'GMC Yukon XL VIP',
    category: 'American Luxury SUV',
    seats: 7,
    bags: 8,
    img: '/assets/images/yukon_exterior.webp',
    features: ['Up to 7 Passengers', '8 Large Bags', 'Extended Wheelbase', 'Acoustic Glass'],
  },
  {
    id: 'hiace',
    name: 'Toyota HiAce VIP',
    category: 'High-Roof Minibus',
    seats: 10,
    bags: 10,
    img: '/assets/images/hiace_exterior.webp',
    features: ['Up to 10 Passengers', '10 Large Bags', 'High-Roof Headroom', 'Rear Climate Controls'],
  },
  {
    id: 'coaster',
    name: 'Toyota Coaster VIP Coach',
    category: 'Executive VIP Coach',
    seats: 21,
    bags: 20,
    img: '/assets/images/coaster_exterior.webp',
    features: ['Up to 21 Passengers', '20 Large Bags', 'Executive Coach Seating', 'Individual Air Vents'],
  },
];


const BC_I18N: Record<
  Locale,
  {
    step1Error: string;
    pillTitle: string;
    pillSub: string;
    step1Tab: string;
    step2Tab: string;
    step3Tab: string;
    popularRoutes: string;
    flightLabel: string;
    flightOptional: string;
    continueVehicles: string;
    editTrip: string;
    selectedBadge: string;
    overCapacityWarning: string;
    fixedFareLabel: string;
    btnSelected: string;
    btnSelect: string;
    backToStep1: string;
    continueToStep3: string;
    summaryTitle: string;
    payNotice: string;
    tollsNotice: string;
    passengerNameLabel: string;
    passengerNamePlaceholder: string;
    whatsappLabel: string;
    specialRequestsLabel: string;
    specialRequestsPlaceholder: string;
    backToVehicles: string;
    continueWa: string;
    popupNotice: string;
    openWaNow: string;
  }
> = {
  ar: {
    step1Error: 'يرجى اختيار تاريخ وموعد الرحلة للمتابعة',
    pillTitle: 'حاسبة الأسعار وحجز الرحلة الفوري',
    pillSub: 'ثلاث خطوات يسيرة: أدخل تفاصيل الرحلة • اختر السيارة والسعر الثابت • أكد حجزك مع السائق فوراً',
    step1Tab: '1. تفاصيل الرحلة',
    step2Tab: '2. اختيار السيارة والسعر',
    step3Tab: '3. تأكيد الحجز',
    popularRoutes: 'المسارات الشائعة السريعة:',
    flightLabel: 'رقم الرحلة الجوية (تتبع المطار)',
    flightOptional: 'اختياري',
    continueVehicles: 'متابعة لاختيار السيارة وعرض الأسعار',
    editTrip: 'تعديل الرحلة',
    selectedBadge: 'الخيار المحدد',
    overCapacityWarning: 'تنبيه: يتجاوز عدد الركاب/الحقائب المختار سعة هذه السيارة.',
    fixedFareLabel: 'السعر الثابت شامل الضريبة',
    btnSelected: 'تم الاختيار',
    btnSelect: 'اختيار',
    backToStep1: 'الرجوع لتعديل الرحلة',
    continueToStep3: 'متابعة لتفاصيل المسافر والتأكيد',
    summaryTitle: 'ملخص الرحلة المعتمد',
    payNotice: 'الدفع نقدًا للسائق بعد وصول العميل إلى وجهته المطلوبة وانتهاء الرحلة بالكامل 100%',
    tollsNotice: 'شامل رسوم الطرق السريعة ومواقف المطار والوقود • إلغاء مجاني',
    passengerNameLabel: 'اسم المسافر / المتواصل',
    passengerNamePlaceholder: 'الاسم بالكامل',
    whatsappLabel: 'رقم الواتساب مع مفتاح الدولة',
    specialRequestsLabel: 'ملاحظات خاصة (مقعد طفل، مساعدة حقائب، إلخ)',
    specialRequestsPlaceholder: 'أي متطلبات إضافية لرحلتك...',
    backToVehicles: 'الرجوع لاختيار سيارة أخرى',
    continueWa: 'تأكيد الحجز عبر واتساب',
    popupNotice: 'تم تجهيز بيانات حجزك بنجاح؛ انقر للمتابعة عبر واتساب مباشرة:',
    openWaNow: 'فتح محادثة واتساب الآن',
  },
  en: {
    step1Error: 'Please select your pickup date to view available vehicles',
    pillTitle: 'Instant Booking & Fixed-Fare Calculator',
    pillSub: '3 simple steps: enter trip details, choose your vehicle & fare, and confirm on WhatsApp.',
    step1Tab: '1. Enter Trip',
    step2Tab: '2. Select Vehicle & Fare',
    step3Tab: '3. Customer & Confirm',
    popularRoutes: 'Popular Routes:',
    flightLabel: 'Flight Number (Delay Tracking)',
    flightOptional: 'Optional',
    continueVehicles: 'Continue to Vehicles & Fares',
    editTrip: 'Edit Trip',
    selectedBadge: 'Selected',
    overCapacityWarning: "Note: Your group or bag count exceeds this car's recommended capacity.",
    fixedFareLabel: 'Fixed Total Fare',
    btnSelected: 'Selected',
    btnSelect: 'Select',
    backToStep1: 'Back to Trip Details',
    continueToStep3: 'Continue to Booking Details',
    summaryTitle: 'Confirmed Journey Summary',
    payNotice: '100% Cash paid to the driver after journey completion and destination reached',
    tollsNotice: 'Tolls, airport parking & fuel included • Free cancellation',
    passengerNameLabel: 'Passenger Full Name',
    passengerNamePlaceholder: 'e.g. Abdullah Rahman',
    whatsappLabel: 'WhatsApp Number (with country code)',
    specialRequestsLabel: 'Special Requests (Child seat, luggage assistance, etc.)',
    specialRequestsPlaceholder: 'Any additional requirements for your pilgrimage...',
    backToVehicles: 'Back to Vehicles',
    continueWa: 'Continue on WhatsApp',
    popupNotice: 'Your booking details are ready; click below to continue on WhatsApp:',
    openWaNow: 'Open WhatsApp Now',
  },
  ms: {
    step1Error: 'Sila pilih tarikh perjalanan untuk melihat kenderaan yang tersedia',
    pillTitle: 'Kalkulator Tambang Tetap & Tempahan Segera',
    pillSub: '3 langkah mudah: masukkan maklumat perjalanan, pilih kenderaan & tambang, dan sahkan di WhatsApp.',
    step1Tab: '1. Butiran Perjalanan',
    step2Tab: '2. Pilih Kenderaan & Tambang',
    step3Tab: '3. Butiran & Pengesahan',
    popularRoutes: 'Laluan Popular:',
    flightLabel: 'Nombor Penerbangan (Penjejakan Kelewatan)',
    flightOptional: 'Pilihan',
    continueVehicles: 'Teruskan ke Pilihan Kenderaan',
    editTrip: 'Ubah Perjalanan',
    selectedBadge: 'Dipilih',
    overCapacityWarning: 'Perhatian: Jumlah penumpang/bagasi melebihi kapasiti kenderaan ini.',
    fixedFareLabel: 'Tambang Tetap Termasuk Cukai',
    btnSelected: 'Dipilih',
    btnSelect: 'Pilih',
    backToStep1: 'Kembali ke Butiran Perjalanan',
    continueToStep3: 'Teruskan ke Butiran Penumpang',
    summaryTitle: 'Ringkasan Perjalanan Disahkan',
    payNotice: '100% Bayaran tunai kepada pemandu selepas perjalanan selesai dan tiba di destinasi',
    tollsNotice: 'Tol lebuh raya, tempat letak kereta lapangan terbang & bahan api termasuk • Pembatalan percuma',
    passengerNameLabel: 'Nama Penuh Penumpang',
    passengerNamePlaceholder: 'cth. Muhammad Ali',
    whatsappLabel: 'Nombor WhatsApp (dengan kod negara)',
    specialRequestsLabel: 'Permintaan Khas (Kerusi kanak-kanak, bantuan bagasi, dll.)',
    specialRequestsPlaceholder: 'Sebarang keperluan tambahan untuk perjalanan umrah anda...',
    backToVehicles: 'Kembali ke Pilihan Kenderaan',
    continueWa: 'Teruskan di WhatsApp',
    popupNotice: 'Butiran tempahan anda telah sedia; klik di bawah untuk terus ke WhatsApp:',
    openWaNow: 'Buka WhatsApp Sekarang',
  },
  id: {
    step1Error: 'Silakan pilih tanggal perjalanan untuk melihat kendaraan yang tersedia',
    pillTitle: 'Kalkulator Tarif Tetap & Pemesanan Instan',
    pillSub: '3 langkah mudah: isi rute, pilih armada & tarif pasti, konfirmasi via WhatsApp.',
    step1Tab: '1. Detail Perjalanan',
    step2Tab: '2. Pilih Mobil & Tarif',
    step3Tab: '3. Konfirmasi Pemesanan',
    popularRoutes: 'Rute Populer:',
    flightLabel: 'Nomor Penerbangan (Pelacakan Keterlambatan)',
    flightOptional: 'Opsional',
    continueVehicles: 'Lanjut ke Pilihan Kendaraan',
    editTrip: 'Ubah Rute',
    selectedBadge: 'Terpilih',
    overCapacityWarning: 'Perhatian: Jumlah penumpang/koper melebihi kapasitas mobil ini.',
    fixedFareLabel: 'Tarif Total Termasuk Pajak',
    btnSelected: 'Terpilih',
    btnSelect: 'Pilih',
    backToStep1: 'Kembali ke Detail Perjalanan',
    continueToStep3: 'Lanjut ke Data Penumpang',
    summaryTitle: 'Ringkasan Perjalanan Resmi',
    payNotice: '100% Pembayaran tunai kepada pengemudi setelah perjalanan selesai dan tiba di tujuan',
    tollsNotice: 'Tol jalan raya, parkir bandara & bbm sudah termasuk • Pembatalan gratis',
    passengerNameLabel: 'Nama Lengkap Penumpang',
    passengerNamePlaceholder: 'cth. Ahmad Fauzi',
    whatsappLabel: 'Nomor WhatsApp (dengan kode negara)',
    specialRequestsLabel: 'Permintaan Khusus (Kursi bayi, bantuan koper, dll.)',
    specialRequestsPlaceholder: 'Kebutuhan tambahan untuk perjalanan ziarah/umrah Anda...',
    backToVehicles: 'Kembali ke Pilihan Mobil',
    continueWa: 'Konfirmasi via WhatsApp',
    popupNotice: 'Detail pemesanan Anda sudah siap; klik tombol di bawah untuk lanjut ke WhatsApp:',
    openWaNow: 'Buka WhatsApp Sekarang',
  },
  ur: {
    step1Error: 'دستیاب گاڑیاں دیکھنے کے لیے برائے مہربانی سفر کی تاریخ منتخب کریں',
    pillTitle: 'فوری کرایہ کیلکولیٹر اور بکنگ',
    pillSub: 'تین آسان مراحل: سفر کی تفصیلات درج کریں • گاڑی اور متعین کرایہ منتخب کریں • واٹس ایپ پر تصدیق کریں',
    step1Tab: '1. سفر کی تفصیلات',
    step2Tab: '2. گاڑی اور کرایہ',
    step3Tab: '3. بکنگ تصدیق',
    popularRoutes: 'مشہور روٹس:',
    flightLabel: 'پرواز نمبر (فلائٹ ٹریکنگ)',
    flightOptional: 'اختیاری',
    continueVehicles: 'گاڑیوں اور کرایوں کا انتخاب',
    editTrip: 'سفر میں تبدیلی',
    selectedBadge: 'منتخب کردہ',
    overCapacityWarning: 'توجہ فرمائیں: مسافروں یا سامان کی تعداد اس گاڑی کی گنجائش سے زیادہ ہے۔',
    fixedFareLabel: 'مکمل متعین کرایہ بشمول ٹیکس',
    btnSelected: 'منتخب شدہ',
    btnSelect: 'منتخب کریں',
    backToStep1: 'سفر کی تفصیلات پر واپس',
    continueToStep3: 'مسافر کی تفصیلات اور تصدیق',
    summaryTitle: 'تصدیق شدہ سفر کا خلاصہ',
    payNotice: '100% سفر مکمل ہونے اور منزل پر پہنچنے کے بعد ڈرائیور کو نقد ادائیگی',
    tollsNotice: 'ٹول ٹیکس، ائیرپورٹ پارکنگ اور فیول شامل ہے • مفت منسوخی',
    passengerNameLabel: 'مسافر کا مکمل نام',
    passengerNamePlaceholder: 'مثلاً عبداللہ رحمن',
    whatsappLabel: 'واٹس ایپ نمبر (ملکی کوڈ کے ساتھ)',
    specialRequestsLabel: 'خصوصی درخواستیں (چائلڈ سیٹ، سامان میں مدد وغیرہ)',
    specialRequestsPlaceholder: 'اپنے عمرہ سفر کے لیے کوئی اضافی تقاضے...',
    backToVehicles: 'گاڑیوں کے انتخاب پر واپس',
    continueWa: 'واٹس ایپ پر تصدیق کریں',
    popupNotice: 'آپ کی بکنگ کی تفصیلات تیار ہیں، واٹس ایپ پر جاری رکھنے کے لیے نیچے کلک کریں:',
    openWaNow: 'ابھی واٹس ایپ کھولیں',
  },
  fr: {
    step1Error: 'Veuillez sélectionner votre date pour voir les véhicules disponibles',
    pillTitle: 'Calculateur de Tarif Fixe & Réservation Immédiate',
    pillSub: '3 étapes simples : saisissez le trajet, choisissez votre véhicule et confirmez sur WhatsApp.',
    step1Tab: '1. Trajet',
    step2Tab: '2. Véhicule & Tarif',
    step3Tab: '3. Confirmation',
    popularRoutes: 'Itinéraires Populaires :',
    flightLabel: 'Numéro de Vol (Suivi des Retards)',
    flightOptional: 'Facultatif',
    continueVehicles: 'Continuer vers les Véhicules',
    editTrip: 'Modifier le Trajet',
    selectedBadge: 'Sélectionné',
    overCapacityWarning: 'Attention : le nombre de passagers ou bagages dépasse la capacité recommandée.',
    fixedFareLabel: 'Tarif Fixe Tout Inclus',
    btnSelected: 'Sélectionné',
    btnSelect: 'Sélectionner',
    backToStep1: 'Retour aux Détails',
    continueToStep3: 'Continuer vers la Confirmation',
    summaryTitle: 'Récapitulatif de Trajet Confirmé',
    payNotice: '100% Paiement en espèces au chauffeur après l\'achèvement du trajet et l\'arrivée à destination',
    tollsNotice: 'Péages, parking aéroport et carburant inclus • Annulation gratuite',
    passengerNameLabel: 'Nom Complet du Passager',
    passengerNamePlaceholder: 'ex. Jean Dupont',
    whatsappLabel: 'Numéro WhatsApp (avec indicatif pays)',
    specialRequestsLabel: 'Demandes Spéciales (Siège enfant, aide bagages...)',
    specialRequestsPlaceholder: 'Précisions supplémentaires pour votre pèlerinage...',
    backToVehicles: 'Retour aux Véhicules',
    continueWa: 'Continuer sur WhatsApp',
    popupNotice: 'Vos coordonnées sont prêtes ; cliquez ci-dessous pour ouvrir WhatsApp :',
    openWaNow: 'Ouvrir WhatsApp',
  },
  es: {
    step1Error: 'Por favor seleccione la fecha de viaje para ver los vehículos disponibles',
    pillTitle: 'Calculadora de Tarifa Fija y Reserva Inmediata',
    pillSub: '3 sencillos pasos: ingrese el viaje, elija vehículo y tarifa, y confirme por WhatsApp.',
    step1Tab: '1. Detalles del Viaje',
    step2Tab: '2. Vehículo y Tarifa',
    step3Tab: '3. Confirmar Reserva',
    popularRoutes: 'Rutas Populares:',
    flightLabel: 'Número de Vuelo (Seguimiento de Retrasos)',
    flightOptional: 'Opcional',
    continueVehicles: 'Continuar a Vehículos y Tarifas',
    editTrip: 'Editar Viaje',
    selectedBadge: 'Seleccionado',
    overCapacityWarning: 'Atención: El número de pasajeros o maletas supera la capacidad recomendada.',
    fixedFareLabel: 'Tarifa Fija Todo Incluido',
    btnSelected: 'Seleccionado',
    btnSelect: 'Seleccionar',
    backToStep1: 'Volver a Detalles del Viaje',
    continueToStep3: 'Continuar a Datos del Pasajero',
    summaryTitle: 'Resumen de Viaje Confirmado',
    payNotice: '100% Pago en efectivo al conductor una vez finalizado el viaje y llegado al destino',
    tollsNotice: 'Peajes, estacionamiento de aeropuerto y combustible incluidos • Cancelación gratuita',
    passengerNameLabel: 'Nombre Completo del Pasajero',
    passengerNamePlaceholder: 'ej. Carlos Mendoza',
    whatsappLabel: 'Número de WhatsApp (con código de país)',
    specialRequestsLabel: 'Peticiones Especiales (Silla de bebé, asistencia con maletas...)',
    specialRequestsPlaceholder: 'Requisitos adicionales para su peregrinación...',
    backToVehicles: 'Volver a Vehículos',
    continueWa: 'Continuar por WhatsApp',
    popupNotice: 'Sus datos de reserva están listos; haga clic abajo para continuar en WhatsApp:',
    openWaNow: 'Abrir WhatsApp Ahora',
  },
  de: {
    step1Error: 'Bitte wählen Sie das Abholdatum, um verfügbare Fahrzeuge anzuzeigen',
    pillTitle: 'Festpreis-Rechner & Sofortbuchung',
    pillSub: '3 einfache Schritte: Reisedetails eingeben, Fahrzeug wählen & per WhatsApp bestätigen.',
    step1Tab: '1. Reisedetails',
    step2Tab: '2. Fahrzeug & Tarif',
    step3Tab: '3. Buchung Bestätigen',
    popularRoutes: 'Beliebte Routen:',
    flightLabel: 'Flugnummer (Verspätungs-Tracking)',
    flightOptional: 'Optional',
    continueVehicles: 'Weiter zu Fahrzeugen & Tarifen',
    editTrip: 'Fahrt Bearbeiten',
    selectedBadge: 'Ausgewählt',
    overCapacityWarning: 'Hinweis: Ihre Gruppen- oder Gepäckgröße übersteigt die empfohlene Kapazität.',
    fixedFareLabel: 'Fester Gesamtpreis inkl. Steuern',
    btnSelected: 'Ausgewählt',
    btnSelect: 'Auswählen',
    backToStep1: 'Zurück zu den Reisedetails',
    continueToStep3: 'Weiter zu den Passagierdaten',
    summaryTitle: 'Bestätigte Fahrtübersicht',
    payNotice: '100% Barzahlung an den Fahrer nach Beendigung der Fahrt und Ankunft am Zielort',
    tollsNotice: 'Mautgebühren, Flughafenparkgebühren & Kraftstoff inbegriffen • Kostenlose Stornierung',
    passengerNameLabel: 'Vollständiger Name des Passagiers',
    passengerNamePlaceholder: 'z.B. Thomas Müller',
    whatsappLabel: 'WhatsApp-Nummer (mit Ländervorwahl)',
    specialRequestsLabel: 'Besondere Wünsche (Kindersitz, Gepäckhilfe etc.)',
    specialRequestsPlaceholder: 'Zusätzliche Anforderungen für Ihre Pilgerreise...',
    backToVehicles: 'Zurück zu den Fahrzeugen',
    continueWa: 'Weiter auf WhatsApp',
    popupNotice: 'Ihre Buchungsdaten sind bereit; klicken Sie unten, um direkt auf WhatsApp fortzufahren:',
    openWaNow: 'Jetzt WhatsApp Öffnen',
  },
  tr: {
    step1Error: 'Müsait araçları görmek için lütfen alış tarihinizi seçin',
    pillTitle: 'Sabit Fiyat Hesaplayıcı ve Hızlı Rezervasyon',
    pillSub: '3 kolay adım: seyahat bilgilerini girin, aracı ve sabit fiyatı seçin, WhatsApp ile onaylayın.',
    step1Tab: '1. Seyahat Detayları',
    step2Tab: '2. Araç & Fiyat Seçimi',
    step3Tab: '3. Rezervasyon Onayı',
    popularRoutes: 'Popüler Güzergahlar:',
    flightLabel: 'Uçuş Numarası (Rötar Takibi)',
    flightOptional: 'İsteğe bağlı',
    continueVehicles: 'Araç Seçimine Devam Et',
    editTrip: 'Seyahati Düzenle',
    selectedBadge: 'Seçildi',
    overCapacityWarning: 'Dikkat: Yolcu veya bagaj sayısı bu aracın kapasitesini aşıyor.',
    fixedFareLabel: 'Sabit Toplam Ücret (Vergiler Dahil)',
    btnSelected: 'Seçildi',
    btnSelect: 'Seç',
    backToStep1: 'Seyahat Detaylarına Dön',
    continueToStep3: 'Yolcu Bilgilerine Devam Et',
    summaryTitle: 'Onaylanmış Seyahat Özeti',
    payNotice: '100% Yolculuk tamamlandıktan ve varış noktasına ulaştıktan sonra şoföre nakit ödeme',
    tollsNotice: 'Otoyol ücretleri, havalimanı otoparkı ve yakıt dahil • Ücretsiz iptal',
    passengerNameLabel: 'Yolcunun Adı ve Soyadı',
    passengerNamePlaceholder: 'örn. Mehmet Yılmaz',
    whatsappLabel: 'WhatsApp Numarası (Ülke kodu ile)',
    specialRequestsLabel: 'Özel İstekler (Çocuk koltuğu, bagaj yardımı vb.)',
    specialRequestsPlaceholder: 'Umre seyahatiniz için ek talepleriniz...',
    backToVehicles: 'Araç Seçimine Dön',
    continueWa: 'WhatsApp ile Devam Et',
    popupNotice: 'Rezervasyon bilgileriniz hazırlandı; WhatsApp üzerinden devam etmek için tıklayın:',
    openWaNow: 'Şimdi WhatsApp Aç',
  },
  hi: {
    step1Error: 'उपलब्ध वाहनों को देखने के लिए कृपया पिकअप तिथि चुनें',
    pillTitle: 'निश्चित किराया कैलकुलेटर और त्वरित बुकिंग',
    pillSub: '3 आसान चरण: यात्रा विवरण दर्ज करें, वाहन और निश्चित किराया चुनें, व्हाट्सएप पर पुष्टि करें।',
    step1Tab: '1. यात्रा विवरण',
    step2Tab: '2. वाहन और किराया',
    step3Tab: '3. बुकिंग पुष्टि',
    popularRoutes: 'लोकप्रिय मार्ग:',
    flightLabel: 'उड़ान संख्या (देरी ट्रैकिंग)',
    flightOptional: 'वैकल्पिक',
    continueVehicles: 'वाहनों और किरायों पर जाएं',
    editTrip: 'यात्रा बदलें',
    selectedBadge: 'चयनित',
    overCapacityWarning: 'सूचना: आपके समूह या बैग की संख्या इस कार की अनुशंसित क्षमता से अधिक है।',
    fixedFareLabel: 'कुल निश्चित किराया (कर सहित)',
    btnSelected: 'चयनित',
    btnSelect: 'चुनें',
    backToStep1: 'यात्रा विवरण पर वापस',
    continueToStep3: 'यात्री विवरण पर आगे बढ़ें',
    summaryTitle: 'पुष्ट यात्रा सारांश',
    payNotice: '100% यात्रा पूरी होने और गंतव्य पर पहुंचने के बाद ड्राइवर को नकद भुगतान',
    tollsNotice: 'टोल, हवाई अड्डा पार्किंग और ईंधन शामिल • नि:शुल्क रद्दीकरण',
    passengerNameLabel: 'यात्री का पूरा नाम',
    passengerNamePlaceholder: 'उदा. मोहम्मद खान',
    whatsappLabel: 'व्हाट्सएप नंबर (देश कोड सहित)',
    specialRequestsLabel: 'विशेष अनुरोध (बाल सीट, सामान सहायता आदि)',
    specialRequestsPlaceholder: 'आपकी तीर्थयात्रा के लिए कोई अतिरिक्त आवश्यकताएं...',
    backToVehicles: 'वाहनों के चयन पर वापस',
    continueWa: 'व्हाट्सएप पर जारी रखें',
    popupNotice: 'आपका बुकिंग विवरण तैयार है; व्हाट्सएप पर सीधे जारी रखने के लिए नीचे क्लिक करें:',
    openWaNow: 'अब व्हाट्सएप खोलें',
  },
};

export function BookingCard({ locale, dict, initialRates, settings }: BookingCardProps) {
  const router = useRouter();
  const t = BC_I18N[locale] || BC_I18N.en;
  const { currency, setCurrency, formatPrice } = useCurrency();

  // Wizard Step: 1 = Trip Details, 2 = Vehicle & Fare Selection, 3 = Confirmation & Contact
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Trip Info
  const [route, setRoute] = useState('jeddah-airport-to-makkah');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [flightNumber, setFlightNumber] = useState('');
  const [passengers, setPassengers] = useState(3);
  const [luggage, setLuggage] = useState(3);
  const [step1Error, setStep1Error] = useState<string | null>(null);

  // Step 2: Vehicle Selection
  const [vehicle, setVehicle] = useState('staria');

  const handleSelectVehicle = (vId: string) => {
    setVehicle(vId);
    const fareSAR = activeRates[route]?.[vId] ?? BASE_RATES[route]?.[vId] ?? 260;
    trackEvent({
      event: 'vehicle_selected',
      vehicle_id: vId,
      route_id: route,
      route,
      price: fareSAR,
      currency,
    });
  };

  // Step 3: Customer Details & Submission
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string>('verified_client');
  const [waPopupUrl, setWaPopupUrl] = useState<string | null>(null);
  const [isSubmittingWa, setIsSubmittingWa] = useState(false);

  // Helpers
  const minDate = new Date().toISOString().split('T')[0];
  const activeRates = initialRates || BASE_RATES;
  const currentVehicleSpec = FLEET_OPTIONS.find((v) => v.id === vehicle) || FLEET_OPTIONS[1];
  const baseSAR = activeRates[route]?.[vehicle] ?? BASE_RATES[route]?.[vehicle] ?? 260;

  const isAirportRoute = route.includes('airport');

  const availableRouteKeys = Object.keys(ROUTE_LABELS).filter((key) => {
    if (TAIF_ROUTE_KEYS.has(key) && !settings?.taif_enabled) return false;
    if (RIYADH_ROUTE_KEYS.has(key) && !settings?.riyadh_enabled) return false;
    return true;
  });

  // STEP 1 VALIDATION & PROCEED
  const handleProceedToVehicles = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setStep1Error(t.step1Error);
      return;
    }
    setStep1Error(null);
    trackEvent({
      event: 'route_selected',
      service_type: 'airport_transfer',
      route,
      passengers,
      luggage,
    });
    setCurrentStep(2);
  };

  // STEP 2 PROCEED TO REVIEW
  const handleProceedToReview = () => {
    trackEvent({
      event: 'quote_calculated',
      service_type: 'airport_transfer',
      route,
      vehicle_id: vehicle,
      price_sar: baseSAR || 0,
      currency,
    });
    setCurrentStep(3);
  };

  // STEP 3: WHATSAPP HANDOFF (KISWAH-INSPIRED INSTANT LEAD DISPATCH)
  const handleWhatsApp = async () => {
    if (isSubmittingWa) return;
    setIsSubmittingWa(true);
    setWaPopupUrl(null);

    trackEvent({
      event: 'whatsapp_handoff_initiated',
      source: 'booking_card',
    });

    const routeText = ROUTE_LABELS[route]?.[locale] || ROUTE_LABELS[route]?.en || route;
    const vehicleText = currentVehicleSpec.name;

    let targetUrl = '';

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: typeof window !== 'undefined' ? window.location.pathname : '/',
          language: locale,
          route_id: route,
          route_title: routeText,
          vehicle_id: vehicle,
          vehicle_name: vehicleText,
          pickup_date: date,
          passengers,
          luggage,
          customer_name: customerName || undefined,
          customer_phone: customerPhone || undefined,
          notes: customerNotes || undefined,
          'cf-turnstile-response': turnstileToken,
          source_utm: {
            referrer: typeof document !== 'undefined' ? document.referrer : '',
            url: typeof window !== 'undefined' ? window.location.href : '',
          },
        }),
      });

      const data = await res.json();
      if (data?.whatsapp_url) {
        targetUrl = data.whatsapp_url;
      }
    } catch (err) {
      console.error('Lead tracking error, continuing to WhatsApp fallback:', err);
    } finally {
      setIsSubmittingWa(false);
    }

    if (!targetUrl) {
      const isNumB = Math.random() > 0.5;
      const targetPhone = isNumB ? '966505316971' : '966567588261';
      const refPrefix = isNumB ? 'REF-B' : 'REF-A';
      const fallbackRef = `${refPrefix}-` + Math.floor(10000 + Math.random() * 90000);
      const formattedPrice = baseSAR ? `${baseSAR} SAR` : 'Quote';
      const isArLocale = locale === 'ar';
      const paymentRuleNotice = isArLocale
        ? 'الدفع نقدًا للسائق بعد وصول العميل إلى وجهته المطلوبة وانتهاء الرحلة بالكامل (ريال سعودي أو دولار أمريكي)'
        : 'Cash paid to the driver after the journey is completed and the customer reaches the requested destination (SAR or USD)';
      const fallbackMsg = isArLocale
        ? `السلام عليكم، أود حجز سيارة خاصة مع ضيوف الرحمن VIP [${fallbackRef}]:\n• المسار: ${routeText}\n• السيارة: ${vehicleText}\n• التاريخ: ${date || 'اليوم'}\n• الوقت: ${time}\n• رقم الرحلة: ${flightNumber || 'غير محدد'}\n• المسافر: ${customerName || 'غير مسجل'}\n• الركاب: ${passengers} | الأمتعة: ${luggage}\n• السعر الإجمالي: ${formattedPrice}\n• سياسة الدفع: ${paymentRuleNotice}`
        : `Salam, I would like to reserve private chauffeur transport with Duyuf Alrahman VIP [${fallbackRef}]:\n• Route: ${routeText}\n• Vehicle: ${vehicleText}\n• Date: ${date || 'Today'}\n• Time: ${time}\n• Flight: ${flightNumber || 'TBD'}\n• Passenger: ${customerName || 'Guest'}\n• Pax: ${passengers} | Luggage: ${luggage}\n• Total Fare: ${formattedPrice}\n• Payment Policy: ${paymentRuleNotice}`;
      targetUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(fallbackMsg)}`;
    }

    const popup = window.open(targetUrl, '_blank');
    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
      setWaPopupUrl(targetUrl);
    }
  };

  // STEP 3: DIRECT ONLINE BOOKING SUBMIT (NAVIGATES TO FULL ENGINE PREFILLED)
  const handleFullOnlineBooking = () => {
    const params = new URLSearchParams({
      route,
      vehicle,
      date,
      time,
      passengers: passengers.toString(),
      luggage: luggage.toString(),
      flight_number: flightNumber,
      name: customerName,
      phone: customerPhone,
    });
    router.push(`/${locale}/booking?${params.toString()}`);
  };

  const routeTitle = ROUTE_LABELS[route]?.[locale] || ROUTE_LABELS[route]?.en || route;

  return (
    <section
      id="booking-calculator"
      aria-label={dict.booking_card.title}
      className="relative z-30 px-3 sm:px-4 -mt-14 sm:-mt-24 md:-mt-32 max-w-6xl mx-auto w-full scroll-mt-24"
    >
      <div className="bg-surface rounded-3xl shadow-xl border-2 border-gold/40 p-4 sm:p-6 md:p-8 transition-shadow relative overflow-hidden">
        {/* Subtle decorative gold sheen */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

        {/* TOP HEADER: TITLE & CURRENCY SWITCHER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border text-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-gold-dark uppercase tracking-widest bg-gold-soft px-2.5 py-0.5 rounded-full border border-gold-line">
                {t.pillTitle}
              </span>
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-ink">
              {dict.booking_card.title}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-0.5 font-light">
              {t.pillSub}
            </p>
          </div>

          {/* Quick Currency Selector */}
          <div className="flex items-center gap-1 self-stretch sm:self-auto bg-bg-alt p-1 rounded-lg border border-border max-w-full overflow-x-auto scrollbar-none py-1 px-1">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                aria-label={`Switch currency to ${c}`}
                className={`min-h-[32px] px-2.5 py-1 text-xs font-bold rounded transition-all focus-visible:ring-1 focus-visible:ring-gold ${
                  currency === c
                    ? 'bg-gold-dark text-white shadow-xs'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 3-STEP PROGRESS STEPPER (KISWAH-INSPIRED CUSTOMER JOURNEY) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
          {/* STEP 1 TAB */}
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`flex items-center justify-center sm:justify-start gap-2 p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-start min-h-[48px] ${
              currentStep === 1
                ? 'bg-gold text-slate-950 border-gold shadow-xs'
                : 'bg-bg-alt text-ink-muted hover:text-ink border-border'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                currentStep === 1 ? 'bg-slate-950 text-gold' : 'bg-surface border border-border text-ink-muted'
              }`}
            >
              {currentStep > 1 ? '✓' : '1'}
            </span>
            <span className="hidden sm:inline">
              {t.step1Tab}
            </span>
          </button>

          {/* STEP 2 TAB */}
          <button
            type="button"
            onClick={() => {
              if (date) setCurrentStep(2);
            }}
            className={`flex items-center justify-center sm:justify-start gap-2 p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-start min-h-[48px] ${
              currentStep === 2
                ? 'bg-gold text-slate-950 border-gold shadow-xs'
                : 'bg-bg-alt text-ink-muted hover:text-ink border-border'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                currentStep === 2 ? 'bg-slate-950 text-gold' : 'bg-surface border border-border text-ink-muted'
              }`}
            >
              {currentStep > 2 ? '✓' : '2'}
            </span>
            <span className="hidden sm:inline">
              {t.step2Tab}
            </span>
          </button>

          {/* STEP 3 TAB */}
          <button
            type="button"
            onClick={() => {
              if (date) setCurrentStep(3);
            }}
            className={`flex items-center justify-center sm:justify-start gap-2 p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-start min-h-[48px] ${
              currentStep === 3
                ? 'bg-gold text-slate-950 border-gold shadow-xs'
                : 'bg-bg-alt text-ink-muted hover:text-ink border-border'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                currentStep === 3 ? 'bg-slate-950 text-gold' : 'bg-surface border border-border text-ink-muted'
              }`}
            >
              3
            </span>
            <span className="hidden sm:inline">
              {t.step3Tab}
            </span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* STEP 1: ENTER YOUR TRIP DETAILS                                */}
        {/* ============================================================== */}
        {currentStep === 1 && (
          <form onSubmit={handleProceedToVehicles} className="space-y-5 animate-fadeIn">
            {/* POPULAR ROUTE SHORTCUT PILLS */}
            <div className="flex flex-wrap items-center gap-2 pb-2 text-start">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                {t.popularRoutes}
              </span>
              <button
                type="button"
                onClick={() => setRoute('jeddah-airport-to-makkah')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  route === 'jeddah-airport-to-makkah'
                    ? 'bg-gold text-ink font-bold shadow-xs'
                    : 'bg-bg-alt text-ink hover:bg-gold-soft border border-border'
                }`}
              >
                `${ROUTE_LABELS['jeddah-airport-to-makkah']?.[locale] || 'Jeddah KAIA → Makkah'} (${formatPrice(200)})`
              </button>
              <button
                type="button"
                onClick={() => setRoute('makkah-to-madinah')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  route === 'makkah-to-madinah'
                    ? 'bg-gold text-ink font-bold shadow-xs'
                    : 'bg-bg-alt text-ink hover:bg-gold-soft border border-border'
                }`}
              >
                `${ROUTE_LABELS['makkah-to-madinah']?.[locale] || 'Makkah → Madinah'} (${formatPrice(450)})`
              </button>
              <button
                type="button"
                onClick={() => setRoute('madinah-airport-to-hotel')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  route === 'madinah-airport-to-hotel'
                    ? 'bg-gold text-ink font-bold shadow-xs'
                    : 'bg-bg-alt text-ink hover:bg-gold-soft border border-border'
                }`}
              >
                `${ROUTE_LABELS['madinah-airport-to-hotel']?.[locale] || 'Madinah Airport'} (${formatPrice(150)})`
              </button>
              <button
                type="button"
                onClick={() => setRoute('jeddah-to-madinah')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  route === 'jeddah-to-madinah'
                    ? 'bg-gold text-ink font-bold shadow-xs'
                    : 'bg-bg-alt text-ink hover:bg-gold-soft border border-border'
                }`}
              >
                `${ROUTE_LABELS['jeddah-to-madinah']?.[locale] || 'Jeddah → Madinah'} (${formatPrice(680)})`
              </button>
            </div>

            {/* ROUTE SELECTOR WITH DISTINCT PICKUP / DROPOFF VISUALS */}
            <div className="bg-bg-alt/60 p-4 rounded-2xl border border-border text-start">
              <label htmlFor="card-route-select" className="block text-xs font-bold text-ink mb-1.5">
                {dict.booking_card.pickupLabel} ↔ {dict.booking_card.dropoffLabel} <span className="text-gold-dark">*</span>
              </label>
              <div className="relative">
                <select
                  id="card-route-select"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="w-full min-h-[48px] h-12 pl-10 pr-8 rtl:pr-10 rtl:pl-8 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold appearance-none cursor-pointer"
                >
                  {Object.keys(ROUTE_LABELS).map((key) => (
                    <option key={key} value={key}>
                      {ROUTE_LABELS[key]?.[locale] || ROUTE_LABELS[key]?.en || key}
                    </option>
                  ))}
                </select>
                <MapPin className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <span className="pointer-events-none absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-[10px] text-ink-muted">▼</span>
              </div>
            </div>

            {/* SCHEDULE: DATE, TIME & FLIGHT NUMBER */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-start">
              {/* DATE */}
              <div>
                <label htmlFor="card-date-input" className="block text-xs font-bold text-ink mb-1.5">
                  {dict.booking_card.dateLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="card-date-input"
                    type="date"
                    required
                    min={minDate}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (step1Error) setStep1Error(null);
                    }}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  />
                  <Calendar className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* TIME */}
              <div>
                <label htmlFor="card-time-input" className="block text-xs font-bold text-ink mb-1.5">
                  {dict.booking_card.timeLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="card-time-input"
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  />
                  <Clock className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* FLIGHT NUMBER (FOR AIRPORT TRIPS) */}
              <div>
                <label htmlFor="card-flight-input" className="block text-xs font-bold text-ink mb-1.5">
                  {t.flightLabel}
                </label>
                <div className="relative">
                  <input
                    id="card-flight-input"
                    type="text"
                    placeholder={isAirportRoute ? 'e.g. SV 124 / MH 150' : t.flightOptional}
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium hover:border-gold-dark focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Plane className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* PASSENGERS & LUGGAGE STEPPERS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-start">
              {/* PASSENGERS STEPPER (- 3 +) */}
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  {dict.booking_card.passengersLabel}
                </label>
                <div className="flex items-center justify-between w-full min-h-[48px] h-12 rounded-btn border border-border-strong bg-surface px-2">
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    aria-label="Decrease Passengers"
                    className="min-w-[44px] min-h-[44px] rounded flex items-center justify-center text-ink hover:text-gold-dark hover:bg-bg-alt font-bold text-xl focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    −
                  </button>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                    <Users className="w-4 h-4 text-gold-dark" />
                    <span>{passengers} {dict.booking_card.passengersLabel}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.min(21, passengers + 1))}
                    aria-label="Increase Passengers"
                    className="min-w-[44px] min-h-[44px] rounded flex items-center justify-center text-ink hover:text-gold-dark hover:bg-bg-alt font-bold text-xl focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* LUGGAGE STEPPER (- 3 +) */}
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  {dict.booking_card.luggageLabel}
                </label>
                <div className="flex items-center justify-between w-full min-h-[48px] h-12 rounded-btn border border-border-strong bg-surface px-2">
                  <button
                    type="button"
                    onClick={() => setLuggage(Math.max(0, luggage - 1))}
                    aria-label="Decrease Luggage"
                    className="min-w-[44px] min-h-[44px] rounded flex items-center justify-center text-ink hover:text-gold-dark hover:bg-bg-alt font-bold text-xl focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    −
                  </button>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                    <Luggage className="w-4 h-4 text-gold-dark" />
                    <span>{luggage} {dict.booking_card.luggageLabel}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLuggage(Math.min(20, luggage + 1))}
                    aria-label="Increase Luggage"
                    className="min-w-[44px] min-h-[44px] rounded flex items-center justify-center text-ink hover:text-gold-dark hover:bg-bg-alt font-bold text-xl focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* ERROR FEEDBACK IF APPLICABLE */}
            {step1Error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{step1Error}</span>
              </div>
            )}

            {/* STEP 1 PRIMARY CTA */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto min-h-[48px] h-12 px-8 rounded-btn bg-gold text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-xs flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>{t.continueVehicles}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </form>
        )}

        {/* ============================================================== */}
        {/* STEP 2: SELECT YOUR VEHICLE & REVIEW THE FARE (KISWAH PATTERN) */}
        {/* ============================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            {/* TRIP SUMMARY BAR */}
            <div className="bg-bg-alt p-3.5 rounded-2xl border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-start">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-ink">
                  <MapPin className="w-4 h-4 text-gold-dark" />
                  <span>{routeTitle}</span>
                </div>
                <div className="flex items-center gap-1.5 text-ink-muted">
                  <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{date} • {time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-ink-muted">
                  <Users className="w-3.5 h-3.5 text-gold-dark" />
                  <span>{passengers} Pax • {luggage} Bags</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-gold-dark hover:underline flex items-center gap-1 shrink-0 self-end sm:self-auto"
              >
                <Edit2 className="w-3 h-3" />
                <span>{t.editTrip}</span>
              </button>
            </div>

            {/* VEHICLE SELECTION CARDS GRID (KISWAH-INSPIRED SIDE-BY-SIDE DISPLAY) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-start">
              {FLEET_OPTIONS.map((carOpt) => {
                const fareSAR = activeRates[route]?.[carOpt.id] ?? BASE_RATES[route]?.[carOpt.id] ?? 260;
                const isSelected = vehicle === carOpt.id;
                const isOverPax = passengers > carOpt.seats;
                const isOverBags = luggage > carOpt.bags;

                return (
                  <div
                    key={carOpt.id}
                    onClick={() => handleSelectVehicle(carOpt.id)}
                    className={`rounded-2xl p-4 border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-gold bg-gold-soft/50 shadow-md ring-2 ring-gold/30'
                        : 'border-border bg-surface hover:border-gold-line hover:shadow-xs'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-gold text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-xs">
                        <Check className="w-3 h-3" />
                        <span>{t.selectedBadge}</span>
                      </div>
                    )}

                    {/* PHOTO & BASIC SPECS */}
                    <div>
                      <div className="relative w-full h-32 rounded-xl overflow-hidden bg-bg-alt mb-3 border border-border/60">
                        <Image
                          src={carOpt.img}
                          alt={carOpt.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider">
                          {carOpt.category}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base sm:text-lg text-ink leading-tight mb-2">
                        {carOpt.name}
                      </h4>

                      {/* CAPACITY PILLS */}
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 ${
                            isOverPax
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-bg-alt text-ink border border-border'
                          }`}
                        >
                          <Users className="w-3 h-3 text-gold-dark" />
                          <span>{carOpt.seats} {dict.booking_card.passengersLabel}</span>
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 ${
                            isOverBags
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-bg-alt text-ink border border-border'
                          }`}
                        >
                          <Luggage className="w-3 h-3 text-gold-dark" />
                          <span>{carOpt.bags} {dict.booking_card.luggageLabel}</span>
                        </span>
                      </div>

                      {/* WARNING IF PASSENGERS EXCEED CAPACITY */}
                      {(isOverPax || isOverBags) && (
                        <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg mb-3 font-medium">
                          {t.overCapacityWarning}
                        </p>
                      )}
                    </div>

                    {/* PRICE & SELECT BUTTON */}
                    <div className="pt-3 border-t border-border mt-2 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-ink-muted uppercase block">
                          {t.fixedFareLabel}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-display font-bold text-xl sm:text-2xl text-ink">
                            {formatPrice(fareSAR)}
                          </span>
                          <span className="text-[11px] text-ink-muted font-normal">
                            ({fareSAR} SAR)
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectVehicle(carOpt.id);
                        }}
                        className={`min-h-[40px] px-4 rounded-btn text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-slate-950 text-gold shadow-xs'
                            : 'bg-bg-alt text-ink hover:bg-gold-soft border border-border'
                        }`}
                      >
                        {isSelected ? t.btnSelected : t.btnSelect}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* STEP 2 CONTROLS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn border border-border text-ink text-xs font-semibold hover:bg-bg-alt transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{t.backToStep1}</span>
              </button>

              <button
                type="button"
                onClick={handleProceedToReview}
                className="w-full sm:w-auto min-h-[48px] h-12 px-8 rounded-btn bg-gold text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-xs flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>{t.continueToStep3}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 3: CUSTOMER DETAILS & BOOKING CONFIRMATION                */}
        {/* ============================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn text-start">
            {/* COMPLETE REVIEW SUMMARY CARD */}
            <div className="bg-bg-alt/80 rounded-2xl p-5 border border-border grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-xs">
                <span className="text-[11px] font-bold text-gold-dark uppercase tracking-widest block">
                  {t.summaryTitle}
                </span>
                <div className="flex items-center gap-2 text-ink font-bold text-sm">
                  <MapPin className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>{routeTitle}</span>
                </div>
                <div className="flex items-center gap-2 text-ink-muted">
                  <Calendar className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>{date} • {time}</span>
                </div>
                <div className="flex items-center gap-2 text-ink-muted">
                  <Car className="w-4 h-4 text-gold-dark shrink-0" />
                  <span>{currentVehicleSpec.name} ({passengers} Pax • {luggage} Bags)</span>
                </div>
                {flightNumber && (
                  <div className="flex items-center gap-2 text-ink-muted">
                    <Plane className="w-4 h-4 text-gold-dark shrink-0" />
                    <span>Flight: {flightNumber} (Tracked)</span>
                  </div>
                )}
              </div>

              {/* CONFIRMED SAR PRICE BOX */}
              <div className="flex flex-col justify-between p-4 rounded-xl bg-surface border border-border">
                <div>
                  <span className="text-xs text-ink-muted block mb-0.5">
                    {dict.booking_card.totalFare}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-bold text-3xl sm:text-4xl text-ink">
                      {formatPrice(baseSAR)}
                    </span>
                    <span className="text-xs text-ink-muted font-normal">
                      ({baseSAR} SAR)
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.payNotice}</span>
                  </p>
                </div>
                <div className="text-[11px] text-ink-muted pt-2 border-t border-border/60 mt-2">
                  <span>{t.tollsNotice}</span>
                </div>
              </div>
            </div>

            {/* CUSTOMER INFORMATION INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="card-cust-name" className="block text-xs font-bold text-ink mb-1.5">
                  {t.passengerNameLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="card-cust-name"
                    type="text"
                    required
                    placeholder={t.passengerNamePlaceholder}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <User className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="card-cust-phone" className="block text-xs font-bold text-ink mb-1.5">
                  {t.whatsappLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="card-cust-phone"
                    type="tel"
                    required
                    placeholder="+966 50 123 4567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Phone className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="card-cust-notes" className="block text-xs font-bold text-ink mb-1.5">
                {t.specialRequestsLabel}
              </label>
              <textarea
                id="card-cust-notes"
                rows={2}
                placeholder={t.specialRequestsPlaceholder}
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full p-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold resize-none"
              />
            </div>

            {/* BOT PROTECTION */}
            <TurnstileWidget
              locale={locale}
              onSuccess={(t) => setTurnstileToken(t)}
              onExpire={() => setTurnstileToken('')}
            />

            {/* DUAL ACTION BUTTONS (WHATSAPP + ONLINE BOOKING) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn border border-border text-ink text-xs font-semibold hover:bg-bg-alt transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold order-3 sm:order-1"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{t.backToVehicles}</span>
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
                {/* WHATSAPP CTA */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  disabled={isSubmittingWa}
                  className="w-full sm:w-auto min-h-[48px] h-12 px-7 rounded-btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>
                    {isSubmittingWa
                      ? '...'
                      : t.continueWa}
                  </span>
                </button>

                {/* ONLINE PORTAL BOOKING OPTION */}
                <button
                  type="button"
                  onClick={handleFullOnlineBooking}
                  className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn bg-gold text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-xs flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <span>{dict.booking_card.bookOnline || 'Book Online'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>

            {/* FALLBACK BUTTON IF POPUP IS BLOCKED */}
            {waPopupUrl && (
              <div className="p-3 bg-gold-soft border border-gold-line rounded-lg text-center mt-2 animate-fadeIn">
                <p className="text-xs text-ink mb-1.5 font-medium">
                  {t.popupNotice}
                </p>
                <a
                  href={waPopupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded shadow-xs hover:bg-emerald-700"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t.openWaNow}</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
