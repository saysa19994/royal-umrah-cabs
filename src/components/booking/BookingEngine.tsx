'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { SiteSettings } from '@/lib/settings';
import { useCurrency } from '@/context/CurrencyContext';
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  Users,
  Luggage,
  Plane,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Edit2,
  User,
  Phone,
  Mail,
  Sparkles,
  Banknote,
  Info,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { TurnstileWidget } from '@/components/common/TurnstileWidget';
import { getEstimatedBasePriceSAR, LOCALIZED_ROUTE_NAMES } from '@/lib/pricing-constants';
import { trackEvent } from '@/lib/analytics';

interface BookingEngineProps {
  locale: Locale;
  dict: Dictionary;
  settings: SiteSettings;
  initialRoute?: string;
  initialVehicle?: string;
  initialDate?: string;
  initialTime?: string;
  initialPassengers?: string;
  initialLuggage?: string;
  initialType?: 'transfer' | 'hourly' | 'ziyarat' | 'group_bus';
  initialDuration?: string;
  initialPickup?: string;
  initialDropoff?: string;
  initialRates?: Record<string, Record<string, number>>;
}

interface VehicleInfo {
  name: string;
  category: string;
  seats: number;
  bags: number;
  img: string;
}

const VEHICLE_SPECS: Record<string, VehicleInfo> = {
  camry: {
    name: 'Toyota Camry Executive',
    category: 'Executive Sedan',
    seats: 4,
    bags: 3,
    img: '/assets/images/camry_exterior.webp',
  },
  staria: {
    name: 'Hyundai Staria VIP',
    category: 'Executive VIP Van',
    seats: 7,
    bags: 6,
    img: '/assets/images/staria_exterior.webp',
  },
  yukon: {
    name: 'GMC Yukon XL VIP',
    category: 'American Luxury SUV',
    seats: 7,
    bags: 8,
    img: '/assets/images/yukon_exterior.webp',
  },
  hiace: {
    name: 'Toyota HiAce VIP',
    category: 'High-Roof Minibus',
    seats: 10,
    bags: 10,
    img: '/assets/images/hiace_exterior.webp',
  },
  coaster: {
    name: 'Toyota Coaster VIP Coach',
    category: 'Executive Coach',
    seats: 21,
    bags: 20,
    img: '/assets/images/coaster_exterior.webp',
  },
};

const ROUTES: Record<string, { label: string; baseSAR: number }> = {
  'jeddah-airport-to-makkah': { label: 'Jeddah Airport (KAIA) → Makkah Hotel', baseSAR: 200 },
  'makkah-to-jeddah-airport': { label: 'Makkah Hotel → Jeddah Airport (KAIA)', baseSAR: 200 },
  'makkah-to-madinah': { label: 'Makkah Hotel → Madinah Hotel (Via Bir Ali)', baseSAR: 450 },
  'madinah-to-makkah': { label: 'Madinah Hotel → Makkah Hotel (Via Miqat)', baseSAR: 450 },
  'madinah-airport-to-hotel': { label: 'Madinah Airport (MED) → Madinah Hotel', baseSAR: 150 },
  'jeddah-to-madinah': { label: 'Jeddah Airport / Hotel → Madinah Hotel', baseSAR: 680 },
  'makkah-to-taif': { label: 'Makkah Hotel → Taif (Al Hada / City)', baseSAR: 350 },
  'taif-to-makkah': { label: 'Taif → Makkah Hotel (Via Miqat Qarn al-Manazil)', baseSAR: 350 },
  'jeddah-to-taif': { label: 'Jeddah Airport (KAIA) → Taif (Al Hada)', baseSAR: 550 },
  'riyadh-airport-transfer': { label: 'Riyadh Airport (RUH) ⇄ Riyadh Hotels', baseSAR: 200 },
  'riyadh-to-makkah': { label: 'Riyadh ⇄ Makkah Hotel (VIP Highway)', baseSAR: 2200 },
  'riyadh-to-madinah': { label: 'Riyadh ⇄ Madinah Hotel (VIP Highway)', baseSAR: 2200 },
};

const TAIF_ROUTE_KEYS = new Set(['makkah-to-taif', 'taif-to-makkah', 'jeddah-to-taif']);
const RIYADH_ROUTE_KEYS = new Set(['riyadh-airport-transfer', 'riyadh-to-makkah', 'riyadh-to-madinah']);

interface BookingEngineTranslations {
  tabTransfer: string;
  tabHourly: string;
  tabZiyarat: string;
  tabGroup: string;
  step1Title: string;
  step2Title: string;
  step3Title: string;
  step1Btn: string;
  step2Btn: string;
  step3Btn: string;
  stepBack: string;
  routeLabel: string;
  selectRoute: string;
  pickupLabel: string;
  dropoffLabel: string;
  durationLabel: string;
  hoursSuffix: string;
  dateLabel: string;
  timeLabel: string;
  timeNotice: string;
  passengersLabel: string;
  luggageLabel: string;
  flightLabel: string;
  flightPlaceholder: string;
  flightNotice: string;
  seatsLabel: string;
  bagsLabel: string;
  selectedBadge: string;
  selectVehicleBtn: string;
  fixedFareLabel: string;
  authoritativeFare: string;
  capacityNotice: string;
  passengerInfoTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  addOnsTitle: string;
  addOnChildSeat: string;
  addOnFlightTracking: string;
  addOnMalayDriver: string;
  addOnZamzam: string;
  specialNotesLabel: string;
  specialNotesPlaceholder: string;
  paymentTitle: string;
  paymentBadge: string;
  paymentDesc: string;
  summaryTitle: string;
  summaryBadge: string;
  summaryItinerary: string;
  summarySchedule: string;
  summaryVehicle: string;
  summaryPaymentMethod: string;
  summaryPaymentValue: string;
  summaryTotalFare: string;
  summaryZeroAdvance: string;
  summaryTrust1: string;
  summaryTrust2: string;
  summaryTrust3: string;
  submittingText: string;
  submitBtn: string;
  dateRequiredError: string;
}

const LOCALIZED_UI: Record<Locale, BookingEngineTranslations> = {
  en: {
    tabTransfer: '📍 Airport & City Transfer',
    tabHourly: '⏱️ Hourly Chauffeur',
    tabZiyarat: '🕌 Ziyarat Holy Sites',
    tabGroup: '👥 Group Coach & Bus',
    step1Title: '1. Trip & Schedule',
    step2Title: '2. Select Vehicle & Fare',
    step3Title: '3. Passenger & Confirmation',
    step1Btn: 'Continue to Select Vehicle',
    step2Btn: 'Continue to Passenger Details',
    step3Btn: 'Confirm Booking Request',
    stepBack: 'Back',
    routeLabel: 'Popular Highway Route',
    selectRoute: 'Select Route',
    pickupLabel: 'Exact Pickup Location',
    dropoffLabel: 'Exact Destination / Hotel',
    durationLabel: 'Chauffeur Duration',
    hoursSuffix: 'Hours',
    dateLabel: 'Pickup Date',
    timeLabel: 'Pickup Time',
    timeNotice: 'KSA Time (+03:00). Please book at least 1 hour in advance.',
    passengersLabel: 'Passengers',
    luggageLabel: 'Luggage Pieces',
    flightLabel: 'Flight Number (Optional)',
    flightPlaceholder: 'e.g. SV 1234 or EK 803',
    flightNotice: 'Live flight radar tracking synchronizes your driver if delayed.',
    seatsLabel: 'Seats',
    bagsLabel: 'Bags',
    selectedBadge: 'Selected',
    selectVehicleBtn: 'Select Vehicle',
    fixedFareLabel: 'Guaranteed Fixed Total Fare',
    authoritativeFare: 'Fixed Total Fare',
    capacityNotice: 'Party or luggage size exceeds this vehicle recommendation.',
    passengerInfoTitle: '3. Lead Passenger & Contact Information',
    nameLabel: 'Lead Pilgrim Full Name',
    namePlaceholder: 'e.g. Muhammad Al-Ahmad',
    phoneLabel: 'WhatsApp / Mobile (with Country Code)',
    phonePlaceholder: '+966 50 123 4567',
    emailLabel: 'Email Address (Optional)',
    emailPlaceholder: 'pilgrim@example.com',
    addOnsTitle: 'Trip Preferences & Complimentary Inclusions',
    addOnChildSeat: 'Child Safety Booster Seat (Complimentary)',
    addOnFlightTracking: 'Live Flight Delay Monitoring Included',
    addOnMalayDriver: 'Malay / English Speaking Chauffeur',
    addOnZamzam: 'Chilled Bottled Zamzam Water',
    specialNotesLabel: 'Special Requests or Route Instructions (Optional)',
    specialNotesPlaceholder: 'e.g. Traveling with elderly, need wheelchair assistance or extra stop...',
    paymentTitle: 'Payment Method: Pay the Driver',
    paymentBadge: '100% Zero Advance Fees',
    paymentDesc:
      'Payment is made directly to your private chauffeur upon arrival at your destination. You may pay in cash (SAR) or by bank card (Mada, Visa, Mastercard) directly via the driver onboard terminal. No credit card details or online prepayment are required to secure this booking.',
    summaryTitle: 'Booking Summary',
    summaryBadge: 'Guaranteed Fixed Fare',
    summaryItinerary: 'Itinerary',
    summarySchedule: 'Schedule (KSA Time)',
    summaryVehicle: 'Selected Vehicle',
    summaryPaymentMethod: 'Payment Method',
    summaryPaymentValue: 'Pay Directly to Driver (Cash / Card)',
    summaryTotalFare: 'Total Fare',
    summaryZeroAdvance: 'Zero advance payment • Pay upon arrival',
    summaryTrust1: 'Free cancellation up to 24 hours',
    summaryTrust2: '60-min complimentary airport waiting',
    summaryTrust3: '24/7 dedicated dispatch coordination',
    submittingText: 'Recording your booking...',
    submitBtn: 'Confirm Booking Request',
    dateRequiredError: 'Please select a valid future pickup date to proceed.',
  },
  ar: {
    tabTransfer: '📍 نقل مطار وبين المدن',
    tabHourly: '⏱️ سائق خاص بالساعة',
    tabZiyarat: '🕌 مزارات ومعالم دينية',
    tabGroup: '👥 حافلات ومجموعات',
    step1Title: '1. خط السير والجدول',
    step2Title: '2. اختيار السيارة والسعر',
    step3Title: '3. بيانات الراكب والتأكيد',
    step1Btn: 'المتابعة لاختيار السيارة',
    step2Btn: 'المتابعة لبيانات الراكب',
    step3Btn: 'تأكيد طلب الحجز',
    stepBack: 'رجوع',
    routeLabel: 'المسار الشائع المباشر',
    selectRoute: 'اختر المسار',
    pickupLabel: 'موقع الانطلاق بدقة',
    dropoffLabel: 'وجهة الوصول / الفندق',
    durationLabel: 'مدة السائق بالساعة',
    hoursSuffix: 'ساعات',
    dateLabel: 'تاريخ الرحلة',
    timeLabel: 'وقت الانطلاق',
    timeNotice: 'بتوقيت مكة المكرمة (+03:00). يرجى الحجز قبل ساعة على الأقل.',
    passengersLabel: 'عدد الركاب',
    luggageLabel: 'قطع الأمتعة',
    flightLabel: 'رقم الرحلة الجوية (اختياري)',
    flightPlaceholder: 'مثال: SV 1234 أو FZ 805',
    flightNotice: 'نظام تتبع الرحلات الراداري ينسق موعد السائق تلقائياً عند التأخير.',
    seatsLabel: 'مقاعد',
    bagsLabel: 'حقائب',
    selectedBadge: 'تم الاختيار',
    selectVehicleBtn: 'اختيار هذه السيارة',
    fixedFareLabel: 'السعر الإجمالي الثابت والمضمون',
    authoritativeFare: 'السعر الإجمالي الثابت',
    capacityNotice: 'عدد الركاب أو الحقائب يتجاوز السعة الموصى بها لهذه السيارة.',
    passengerInfoTitle: '3. بيانات المسافر الرئيسي والتواصل',
    nameLabel: 'اسم المسافر الرئيسي ثلاثي',
    namePlaceholder: 'مثال: عبد الرحمن محمد الأحمد',
    phoneLabel: 'رقم الجوال / واتساب (مع رمز الدولة)',
    phonePlaceholder: '+966 50 123 4567',
    emailLabel: 'البريد الإلكتروني (اختياري)',
    emailPlaceholder: 'pilgrim@example.com',
    addOnsTitle: 'تفضيلات الرحلة والخدمات المجانية المرفقة',
    addOnChildSeat: 'مقعد أمان للأطفال (مجاناً)',
    addOnFlightTracking: 'متابعة حية للرحلات الجوية متضمنة',
    addOnMalayDriver: 'سائق يتحدث الملايو أو الإنجليزية',
    addOnZamzam: 'ماء زمزم مبرد ومغلق',
    specialNotesLabel: 'ملاحظات أو طلبات خاصة (اختياري)',
    specialNotesPlaceholder: 'مثال: معنا مسن يحتاج مساعدة بكرسي متحرك، أو توقف للصلاة...',
    paymentTitle: 'طريقة الدفع: الدفع للسائق مباشرة',
    paymentBadge: '100% بدون أي دفع مسبق',
    paymentDesc:
      'يتم سداد المبلغ كاملاً مباشرة للسائق الخاص عند الوصول إلى وجهتك بأمان. يمكنك الدفع نقداً (بالريال السعودي) أو عبر بطاقات الدفع البنكية (مدى، فيزا، ماستركارد) من خلال جهاز نقاط البيع لدى السائق. لا يتطلب تأكيد الحجز إدخال أي بطاقة بنكية أو سداد أي عربون.',
    summaryTitle: 'ملخص الحجز',
    summaryBadge: 'سعر ثابت محدد',
    summaryItinerary: 'المسار',
    summarySchedule: 'الموعد (توقيت مكة)',
    summaryVehicle: 'السيارة المختارة',
    summaryPaymentMethod: 'طريقة الدفع',
    summaryPaymentValue: 'الدفع للسائق عند الوصول (نقداً / بطاقة)',
    summaryTotalFare: 'إجمالي السعر',
    summaryZeroAdvance: 'صفر ريال مقدماً • الدفع عند الوصول',
    summaryTrust1: 'إلغاء مجاني قبل الرحلة بـ 24 ساعة',
    summaryTrust2: '60 دقيقة انتظار مجاني في المطار',
    summaryTrust3: 'متابعة وتنسيق مباشر 24/7 عبر واتساب',
    submittingText: 'جاري تسجيل طلب الحجز...',
    submitBtn: 'تأكيد طلب الحجز',
    dateRequiredError: 'يرجى تحديد تاريخ الانطلاق للمتابعة.',
  },
  fr: {
    tabTransfer: '📍 Transfert Aéroport & Ville',
    tabHourly: '⏱️ Chauffeur à l’Heure',
    tabZiyarat: '🕌 Lieux Saints Ziyarat',
    tabGroup: '👥 Minibus & Autocar',
    step1Title: '1. Trajet & Horaires',
    step2Title: '2. Choix du Véhicule & Tarif',
    step3Title: '3. Passager & Confirmation',
    step1Btn: 'Continuer vers les Véhicules',
    step2Btn: 'Continuer vers les Coordonnées',
    step3Btn: 'Confirmer la Réservation',
    stepBack: 'Retour',
    routeLabel: 'Itinéraire Populaire',
    selectRoute: 'Choisir le trajet',
    pickupLabel: 'Lieu de prise en charge',
    dropoffLabel: 'Destination / Hôtel',
    durationLabel: 'Durée en heures',
    hoursSuffix: 'Heures',
    dateLabel: 'Date de prise en charge',
    timeLabel: 'Heure de départ',
    timeNotice: 'Heure KSA (+03:00). Merci de réserver au moins 1h à l’avance.',
    passengersLabel: 'Passagers',
    luggageLabel: 'Bagages',
    flightLabel: 'Numéro de Vol (Optionnel)',
    flightPlaceholder: 'ex. SV 1234',
    flightNotice: 'Suivi radar du vol inclus pour synchroniser votre chauffeur.',
    seatsLabel: 'Places',
    bagsLabel: 'Bagages',
    selectedBadge: 'Sélectionné',
    selectVehicleBtn: 'Choisir ce véhicule',
    fixedFareLabel: 'Tarif Total Fixe Garanti',
    authoritativeFare: 'Tarif Total Fixe',
    capacityNotice: 'Capacité recommandée dépassée pour ce véhicule.',
    passengerInfoTitle: '3. Informations du Passager Principal',
    nameLabel: 'Nom complet du passager',
    namePlaceholder: 'ex. Mohamed Diallo',
    phoneLabel: 'Téléphone / WhatsApp (avec indicatif)',
    phonePlaceholder: '+33 6 12 34 56 78',
    emailLabel: 'Adresse E-mail (Optionnel)',
    emailPlaceholder: 'pelerin@example.com',
    addOnsTitle: 'Options & Avantages Inclus',
    addOnChildSeat: 'Siège enfant sécurisé (Gratuit)',
    addOnFlightTracking: 'Suivi des retards de vol inclus',
    addOnMalayDriver: 'Chauffeur bilingue anglais',
    addOnZamzam: 'Eau de Zamzam fraîche',
    specialNotesLabel: 'Instructions particulières (Optionnel)',
    specialNotesPlaceholder: 'ex. Personne à mobilité réduite, arrêt prière...',
    paymentTitle: 'Mode de Paiement : Paiement au Chauffeur',
    paymentBadge: '100% Sans Avance',
    paymentDesc:
      'Le paiement est effectué directement auprès de votre chauffeur privé à votre arrivée à destination. Vous pouvez payer en espèces (SAR) ou par carte bancaire sur le terminal du chauffeur. Aucun paiement préalable ni carte bancaire en ligne ne sont requis pour confirmer.',
    summaryTitle: 'Récapitulatif de Réservation',
    summaryBadge: 'Tarif Fixe Garanti',
    summaryItinerary: 'Itinéraire',
    summarySchedule: 'Horaire (Heure KSA)',
    summaryVehicle: 'Véhicule Choisi',
    summaryPaymentMethod: 'Mode de Paiement',
    summaryPaymentValue: 'Paiement au chauffeur à l’arrivée (Espèces / Carte)',
    summaryTotalFare: 'Tarif Total',
    summaryZeroAdvance: '0 SAR d’avance • Paiement à l’arrivée',
    summaryTrust1: 'Annulation gratuite jusqu’à 24h avant',
    summaryTrust2: '60 min d’attente offerte à l’aéroport',
    summaryTrust3: 'Assistance 24/7 via WhatsApp',
    submittingText: 'Enregistrement de la réservation...',
    submitBtn: 'Confirmer la Réservation',
    dateRequiredError: 'Veuillez sélectionner une date future valide pour continuer.',
  },
  es: {
    tabTransfer: '📍 Traslado Aeropuerto y Ciudad',
    tabHourly: '⏱️ Chofer por Horas',
    tabZiyarat: '🕌 Lugares Sagrados Ziyarat',
    tabGroup: '👥 Autobuses y Grupos',
    step1Title: '1. Ruta y Horario',
    step2Title: '2. Selección de Vehículo y Tarifa',
    step3Title: '3. Pasajero y Confirmación',
    step1Btn: 'Continuar a Vehículos',
    step2Btn: 'Continuar a Datos del Pasajero',
    step3Btn: 'Confirmar Solicitud de Reserva',
    stepBack: 'Atrás',
    routeLabel: 'Ruta Frecuente',
    selectRoute: 'Seleccionar ruta',
    pickupLabel: 'Punto de recogida exacto',
    dropoffLabel: 'Destino / Hotel exacto',
    durationLabel: 'Duración del servicio',
    hoursSuffix: 'Horas',
    dateLabel: 'Fecha de recogida',
    timeLabel: 'Hora de recogida',
    timeNotice: 'Hora KSA (+03:00). Reserve al menos con 1 hora de anticipación.',
    passengersLabel: 'Pasajeros',
    luggageLabel: 'Piezas de Equipaje',
    flightLabel: 'Número de Vuelo (Opcional)',
    flightPlaceholder: 'ej. SV 1234',
    flightNotice: 'Rastreo de vuelo en vivo para sincronizar al chofer en caso de retraso.',
    seatsLabel: 'Asientos',
    bagsLabel: 'Maletas',
    selectedBadge: 'Seleccionado',
    selectVehicleBtn: 'Elegir Vehículo',
    fixedFareLabel: 'Tarifa Total Fija Garantizada',
    authoritativeFare: 'Tarifa Total Fija',
    capacityNotice: 'La cantidad de pasajeros o maletas excede lo recomendado.',
    passengerInfoTitle: '3. Información del Pasajero Principal',
    nameLabel: 'Nombre completo',
    namePlaceholder: 'ej. Juan Pérez',
    phoneLabel: 'WhatsApp / Teléfono (con código de país)',
    phonePlaceholder: '+34 600 000 000',
    emailLabel: 'Correo Electrónico (Opcional)',
    emailPlaceholder: 'peregrino@example.com',
    addOnsTitle: 'Preferencias y Servicios de Cortesía',
    addOnChildSeat: 'Asiento para niños (Gratis)',
    addOnFlightTracking: 'Monitoreo de vuelo incluido',
    addOnMalayDriver: 'Chofer que habla inglés',
    addOnZamzam: 'Agua de Zamzam fresca',
    specialNotesLabel: 'Instrucciones especiales (Opcional)',
    specialNotesPlaceholder: 'ej. Necesita asistencia en silla de ruedas...',
    paymentTitle: 'Método de Pago: Pagar al Chofer',
    paymentBadge: '100% Sin Pago Anticipado',
    paymentDesc:
      'El pago se realiza directamente a su chofer privado a la llegada a su destino. Puede pagar en efectivo (SAR) o con tarjeta bancaria en el terminal del chofer. No se requiere tarjeta de crédito en línea ni depósito para asegurar su reserva.',
    summaryTitle: 'Resumen de Reserva',
    summaryBadge: 'Tarifa Fija Garantizada',
    summaryItinerary: 'Itinerario',
    summarySchedule: 'Horario (Hora KSA)',
    summaryVehicle: 'Vehículo Seleccionado',
    summaryPaymentMethod: 'Método de Pago',
    summaryPaymentValue: 'Pago al chofer a la llegada (Efectivo / Tarjeta)',
    summaryTotalFare: 'Tarifa Total',
    summaryZeroAdvance: '0 SAR de anticipo • Pago a la llegada',
    summaryTrust1: 'Cancelación gratuita hasta 24 horas antes',
    summaryTrust2: '60 minutos de espera de cortesía en aeropuerto',
    summaryTrust3: 'Coordinación 24/7 vía WhatsApp',
    submittingText: 'Guardando su reserva...',
    submitBtn: 'Confirmar Solicitud de Reserva',
    dateRequiredError: 'Por favor seleccione una fecha futura válida para continuar.',
  },
  id: {
    tabTransfer: '📍 Antar Jemput Bandara & Kota',
    tabHourly: '⏱️ Sopir Sewa Per Jam',
    tabZiyarat: '🕌 Ziarah Tempat Bersejarah',
    tabGroup: '👥 Rombongan Bus & Minibus',
    step1Title: '1. Rute & Jadwal Perjalanan',
    step2Title: '2. Pilih Kendaraan & Tarif',
    step3Title: '3. Data Jamaah & Konfirmasi',
    step1Btn: 'Lanjut ke Pilihan Kendaraan',
    step2Btn: 'Lanjut ke Data Jamaah',
    step3Btn: 'Konfirmasi Pesanan',
    stepBack: 'Kembali',
    routeLabel: 'Rute Populer Langsung',
    selectRoute: 'Pilih Rute Perjalanan',
    pickupLabel: 'Lokasi Penjemputan Tepat',
    dropoffLabel: 'Hotel Tujuan / Lokasi',
    durationLabel: 'Durasi Layanan',
    hoursSuffix: 'Jam',
    dateLabel: 'Tanggal Penjemputan',
    timeLabel: 'Waktu Penjemputan',
    timeNotice: 'Waktu Arab Saudi (+03:00). Mohon pesan minimal 1 jam sebelumnya.',
    passengersLabel: 'Jumlah Jamaah',
    luggageLabel: 'Jumlah Koper',
    flightLabel: 'Nomor Penerbangan (Opsional)',
    flightPlaceholder: 'contoh: GA 980 atau SV 819',
    flightNotice: 'Pelacakan penerbangan langsung agar sopir menyesuaikan saat ada delay.',
    seatsLabel: 'Kursi',
    bagsLabel: 'Koper',
    selectedBadge: 'Dipilih',
    selectVehicleBtn: 'Pilih Mobil Ini',
    fixedFareLabel: 'Total Tarif Pasti Terjamin',
    authoritativeFare: 'Total Tarif Pasti',
    capacityNotice: 'Jumlah penumpang atau koper melebihi kapasitas mobil ini.',
    passengerInfoTitle: '3. Data Jamaah Utama & Kontak',
    nameLabel: 'Nama Lengkap Jamaah Utama',
    namePlaceholder: 'contoh: H. Ahmad Subagio',
    phoneLabel: 'Nomor WhatsApp / HP (dengan Kode Negara)',
    phonePlaceholder: '+62 812 3456 7890',
    emailLabel: 'Alamat Email (Opsional)',
    emailPlaceholder: 'jamaah@example.com',
    addOnsTitle: 'Preferensi Perjalanan & Fasilitas Gratis',
    addOnChildSeat: 'Kursi Anak / Balita (Gratis)',
    addOnFlightTracking: 'Pelacakan Status Penerbangan Gratis',
    addOnMalayDriver: 'Sopir Berbahasa Melayu / Indonesia',
    addOnZamzam: 'Air Zamzam Dingin & Bersih',
    specialNotesLabel: 'Catatan Khusus / Permintaan Khusus (Opsional)',
    specialNotesPlaceholder: 'contoh: Ada lansia dengan kursi roda, singgah sholat di masjid...',
    paymentTitle: 'Metode Pembayaran: Bayar Langsung ke Sopir',
    paymentBadge: '100% Tanpa Uang Muka (DP)',
    paymentDesc:
      'Pembayaran dilakukan langsung ke sopir privat Anda saat tiba di tujuan dengan aman. Anda dapat membayar tunai (Riyal Saudi - SAR) atau dengan kartu debit/kredit pada mesin EDC sopir. Tidak perlu memasukkan kartu online atau membayar DP apa pun untuk mengonfirmasi pesanan.',
    summaryTitle: 'Ringkasan Pesanan',
    summaryBadge: 'Tarif Pasti Tanpa Biaya Tersembunyi',
    summaryItinerary: 'Rute',
    summarySchedule: 'Jadwal (Waktu KSA)',
    summaryVehicle: 'Mobil Pilihan',
    summaryPaymentMethod: 'Metode Pembayaran',
    summaryPaymentValue: 'Bayar Langsung ke Sopir Saat Tiba (Tunai / Kartu)',
    summaryTotalFare: 'Total Tarif',
    summaryZeroAdvance: '0 SAR uang muka • Bayar saat tiba di tujuan',
    summaryTrust1: 'Gratis pembatalan hingga 24 jam sebelum jadwal',
    summaryTrust2: 'Gratis waktu tunggu 60 menit di bandara',
    summaryTrust3: 'Bantuan koordinasi WhatsApp 24 jam sehari',
    submittingText: 'Menyimpan pesanan Anda...',
    submitBtn: 'Konfirmasi Pesanan Sekarang',
    dateRequiredError: 'Silakan pilih tanggal penjemputan yang valid untuk melanjutkan.',
  },
  hi: {
    tabTransfer: '📍 हवाई अड्डा और शहर स्थानांतरण',
    tabHourly: '⏱️ प्रति घंटा चौफर',
    tabZiyarat: '🕌 पवित्र स्थल ज़ियारत',
    tabGroup: '👥 समूह बस और कोच',
    step1Title: '1. यात्रा और समय सारिणी',
    step2Title: '2. वाहन और किराया चुनें',
    step3Title: '3. यात्री और पुष्टि',
    step1Btn: 'वाहन चुनने के लिए आगे बढ़ें',
    step2Btn: 'यात्री विवरण के लिए आगे बढ़ें',
    step3Btn: 'बुकिंग अनुरोध की पुष्टि करें',
    stepBack: 'वापस',
    routeLabel: 'लोकप्रिय सीधा मार्ग',
    selectRoute: 'मार्ग चुनें',
    pickupLabel: 'सटीक पिक-अप स्थान',
    dropoffLabel: 'गंतव्य / होटल',
    durationLabel: 'सेवा अवधि',
    hoursSuffix: 'घंटे',
    dateLabel: 'पिक-अप तिथि',
    timeLabel: 'पिक-अप समय',
    timeNotice: 'सऊदी समय (+03:00)। कृपया कम से कम 1 घंटा पहले बुक करें।',
    passengersLabel: 'यात्री',
    luggageLabel: 'सामान के टुकड़े',
    flightLabel: 'उड़ान संख्या (वैकल्पिक)',
    flightPlaceholder: 'उदा. AI 965 या SV 750',
    flightNotice: 'उड़ान में देरी होने पर ड्राइवर का समय स्वतः समायोजित किया जाता है।',
    seatsLabel: 'सीटें',
    bagsLabel: 'बैग',
    selectedBadge: 'चयनित',
    selectVehicleBtn: 'यह वाहन चुनें',
    fixedFareLabel: 'निश्चित गारंटीकृत कुल किराया',
    authoritativeFare: 'कुल निश्चित किराया',
    capacityNotice: 'यात्रियों या सामान की संख्या इस वाहन की क्षमता से अधिक है।',
    passengerInfoTitle: '3. मुख्य यात्री और संपर्क विवरण',
    nameLabel: 'मुख्य यात्री का पूरा नाम',
    namePlaceholder: 'उदा. मोहम्मद अली',
    phoneLabel: 'व्हाट्सएप / मोबाइल (देश कोड सहित)',
    phonePlaceholder: '+91 98765 43210',
    emailLabel: 'ईमेल पता (वैकल्पिक)',
    emailPlaceholder: 'pilgrim@example.com',
    addOnsTitle: 'यात्रा प्राथमिकताएं और निःशुल्क सुविधाएं',
    addOnChildSeat: 'बाल सुरक्षा सीट (निःशुल्क)',
    addOnFlightTracking: 'उड़ान ट्रैकिंग सेवा शामिल',
    addOnMalayDriver: 'अंग्रेजी बोलने वाला चौफर',
    addOnZamzam: 'ठंडा ज़मज़म पानी',
    specialNotesLabel: 'विशेष निर्देश (वैकल्पिक)',
    specialNotesPlaceholder: 'उदा. व्हीलचेयर सहायता की आवश्यकता है...',
    paymentTitle: 'भुगतान का तरीका: सीधे ड्राइवर को भुगतान करें',
    paymentBadge: '100% कोई अग्रिम भुगतान नहीं',
    paymentDesc:
      'भुगतान सीधे आपके निजी ड्राइवर को गंतव्य पर पहुंचने पर किया जाता है। आप नकद (सऊदी रियाल - SAR) या कार्ड मशीन से भुगतान कर सकते हैं। बुकिंग सुरक्षित करने के लिए किसी ऑनलाइन कार्ड या अग्रिम राशि की आवश्यकता नहीं है।',
    summaryTitle: 'बुकिंग सारांश',
    summaryBadge: 'निश्चित गारंटीकृत किराया',
    summaryItinerary: 'मार्ग',
    summarySchedule: 'समय (सऊदी समय)',
    summaryVehicle: 'चयनित वाहन',
    summaryPaymentMethod: 'भुगतान का तरीका',
    summaryPaymentValue: 'पहुंचने पर ड्राइवर को सीधे भुगतान (नकद / कार्ड)',
    summaryTotalFare: 'कुल किराया',
    summaryZeroAdvance: '0 SAR अग्रिम • पहुंचने पर भुगतान',
    summaryTrust1: '24 घंटे पहले तक निःशुल्क रद्दीकरण',
    summaryTrust2: 'हवाई अड्डे पर 60 मिनट निःशुल्क प्रतीक्षा',
    summaryTrust3: '24/7 व्हाट्सएप सहायता',
    submittingText: 'बुकिंग दर्ज की जा रही है...',
    submitBtn: 'बुकिंग अनुरोध की पुष्टि करें',
    dateRequiredError: 'कृपया आगे बढ़ने के लिए मान्य तिथि चुनें।',
  },
  de: {
    tabTransfer: '📍 Flughafen- & Stadttransfer',
    tabHourly: '⏱️ Stundenweiser Chauffeur',
    tabZiyarat: '🕌 Ziyarat Heilige Stätten',
    tabGroup: '👥 Busse & Reisegruppen',
    step1Title: '1. Route & Fahrplan',
    step2Title: '2. Fahrzeug & Festpreis',
    step3Title: '3. Passagier & Bestätigung',
    step1Btn: 'Weiter zur Fahrzeugauswahl',
    step2Btn: 'Weiter zu den Passagierdaten',
    step3Btn: 'Buchungsanfrage bestätigen',
    stepBack: 'Zurück',
    routeLabel: 'Direkte Fahrtroute',
    selectRoute: 'Route wählen',
    pickupLabel: 'Genauer Abholort',
    dropoffLabel: 'Zielort / Hotel',
    durationLabel: 'Dauer der Buchung',
    hoursSuffix: 'Stunden',
    dateLabel: 'Abholdatum',
    timeLabel: 'Abholzeit',
    timeNotice: 'KSA-Zeit (+03:00). Bitte buchen Sie mindestens 1 Stunde im Voraus.',
    passengersLabel: 'Passagiere',
    luggageLabel: 'Gepäckstücke',
    flightLabel: 'Flugnummer (Optional)',
    flightPlaceholder: 'z.B. SV 123 oder LH 590',
    flightNotice: 'Live-Flugverfolgung synchronisiert Ihren Fahrer bei Flugverspätungen.',
    seatsLabel: 'Sitze',
    bagsLabel: 'Koffer',
    selectedBadge: 'Ausgewählt',
    selectVehicleBtn: 'Fahrzeug wählen',
    fixedFareLabel: 'Garantierter Festpreis',
    authoritativeFare: 'Gesamter Festpreis',
    capacityNotice: 'Personen- oder Gepäckanzahl übersteigt die Empfehlung.',
    passengerInfoTitle: '3. Hauptpassagier & Kontaktdaten',
    nameLabel: 'Vollständiger Name des Hauptpilgers',
    namePlaceholder: 'z.B. Tariq Müller',
    phoneLabel: 'WhatsApp / Mobilfunknummer (mit Ländervorwahl)',
    phonePlaceholder: '+49 170 1234567',
    emailLabel: 'E-Mail-Adresse (Optional)',
    emailPlaceholder: 'pilger@example.com',
    addOnsTitle: 'Reisepräferenzen & Kostenlose Extras',
    addOnChildSeat: 'Kindersitz (Kostenlos)',
    addOnFlightTracking: 'Flugüberwachung inklusive',
    addOnMalayDriver: 'Englischsprachiger Chauffeur',
    addOnZamzam: 'Gekühltes Zamzam-Wasser',
    specialNotesLabel: 'Besondere Wünsche oder Hinweise (Optional)',
    specialNotesPlaceholder: 'z.B. Rollstuhlassistenz benötigt, Gebetsstopp...',
    paymentTitle: 'Zahlungsart: Zahlung beim Fahrer',
    paymentBadge: '100% Keine Anzahlung',
    paymentDesc:
      'Die Zahlung erfolgt direkt bei Ihrem Chauffeur bei Ankunft am Zielort. Sie können in bar (Saudi-Riyal - SAR) oder bequem mit EC-/Kreditkarte am bordeigenen Terminal des Fahrers zahlen. Es sind keine Kreditkartendaten online oder Anzahlungen erforderlich.',
    summaryTitle: 'Buchungsübersicht',
    summaryBadge: 'Garantierter Festpreis',
    summaryItinerary: 'Fahrtroute',
    summarySchedule: 'Termin (KSA-Zeit)',
    summaryVehicle: 'Gewähltes Fahrzeug',
    summaryPaymentMethod: 'Zahlungsart',
    summaryPaymentValue: 'Zahlung beim Fahrer bei Ankunft (Bar / Karte)',
    summaryTotalFare: 'Gesamtpreis',
    summaryZeroAdvance: '0 SAR Anzahlung • Zahlung bei Ankunft',
    summaryTrust1: 'Kostenlose Stornierung bis 24 Std. vorher',
    summaryTrust2: '60 Min. kostenfreie Wartezeit am Flughafen',
    summaryTrust3: '24/7 WhatsApp-Betreuung',
    submittingText: 'Buchung wird übermittelt...',
    submitBtn: 'Buchungsanfrage bestätigen',
    dateRequiredError: 'Bitte wählen Sie ein gültiges Datum in der Zukunft.',
  },
  ur: {
    tabTransfer: '📍 ایئرپورٹ و بین الشہری ٹرانسفر',
    tabHourly: '⏱️ فی گھنٹہ پرائیویٹ ڈرائیور',
    tabZiyarat: '🕌 مقدس زیارات',
    tabGroup: '👥 بس و گروپس',
    step1Title: '1. سفر اور شیڈول',
    step2Title: '2. گاڑی اور کرایہ منتخب کریں',
    step3Title: '3. مسافر کی معلومات و تصدیق',
    step1Btn: 'گاڑی کے انتخاب کے لیے آگے بڑھیں',
    step2Btn: 'مسافر کی تفصیلات کے لیے آگے بڑھیں',
    step3Btn: 'بکنگ کی تصدیق کریں',
    stepBack: 'پیچھے',
    routeLabel: 'براہ راست مقبول روٹ',
    selectRoute: 'روٹ منتخب کریں',
    pickupLabel: 'روانگی کا درست مقام',
    dropoffLabel: 'منزل / ہوٹل کا نام',
    durationLabel: 'ڈرائیور کی مدت',
    hoursSuffix: 'گھنٹے',
    dateLabel: 'روانگی کی تاریخ',
    timeLabel: 'روانگی کا وقت',
    timeNotice: 'سعودی وقت (+03:00)۔ براہ کرم کم از کم 1 گھنٹہ پہلے بک کریں۔',
    passengersLabel: 'مسافروں کی تعداد',
    luggageLabel: 'سامان کے بیگز',
    flightLabel: 'فلائٹ نمبر (اختیاری)',
    flightPlaceholder: 'مثال: PK 741 یا SV 700',
    flightNotice: 'فلائٹ تاخیر کی صورت میں ڈرائیور کا وقت خود بخود ایڈجسٹ ہو جاتا ہے۔',
    seatsLabel: 'نشستیں',
    bagsLabel: 'بیگز',
    selectedBadge: 'منتخب شدہ',
    selectVehicleBtn: 'یہ گاڑی منتخب کریں',
    fixedFareLabel: 'طے شدہ و حتمی کرایہ',
    authoritativeFare: 'کل طے شدہ کرایہ',
    capacityNotice: 'مسافروں یا سامان کی تعداد اس گاڑی کی گنجائش سے زیادہ ہے۔',
    passengerInfoTitle: '3. مرکزی مسافر اور رابطے کی معلومات',
    nameLabel: 'مرکزی زائر کا مکمل نام',
    namePlaceholder: 'مثال: محمد احمد قریشی',
    phoneLabel: 'واٹس ایپ / موبائل نمبر (کنٹری کوڈ سمیت)',
    phonePlaceholder: '+92 300 1234567',
    emailLabel: 'ای میل ایڈریس (اختیاری)',
    emailPlaceholder: 'pilgrim@example.com',
    addOnsTitle: 'سفر کی ترجیحات اور مفت سہولیات',
    addOnChildSeat: 'بچوں کی حفاظتی نشست (مفت)',
    addOnFlightTracking: 'فلائٹ ٹریکنگ کی سہولت شامل',
    addOnMalayDriver: 'انگریزی یا اردو دان ڈرائیور',
    addOnZamzam: 'ٹھنڈا زمزم پانی',
    specialNotesLabel: 'خصوصی ہدایات یا درخواست (اختیاری)',
    specialNotesPlaceholder: 'مثال: بزرگ ساتھ ہیں، وہیل چیئر کی ضرورت ہے...',
    paymentTitle: 'طریقہ ادائیگی: آمد پر ڈرائیور کو براہ راست ادائیگی',
    paymentBadge: '100% بغیر کسی ایڈوانس ادائیگی کے',
    paymentDesc:
      'مکمل رقم منزل پر پہنچنے کے بعد براہ راست آپ کے پرائیویٹ ڈرائیور کو ادا کی جاتی ہے۔ آپ نقد (سعودی ریال) یا ڈرائیور کی کارڈ مشین کے ذریعے ادائیگی کر سکتے ہیں۔ بکنگ کے لیے آن لائن کارڈ یا ایڈوانس رقم درکار نہیں۔',
    summaryTitle: 'بکنگ کا خلاصہ',
    summaryBadge: 'طے شدہ یقینی کرایہ',
    summaryItinerary: 'سفری راستہ',
    summarySchedule: 'وقت (سعودی وقت)',
    summaryVehicle: 'منتخب گاڑی',
    summaryPaymentMethod: 'طریقہ ادائیگی',
    summaryPaymentValue: 'آمد پر ڈرائیور کو براہ راست ادائیگی (نقد / کارڈ)',
    summaryTotalFare: 'کل کرایہ',
    summaryZeroAdvance: '0 ریال ایڈوانس • آمد پر ادائیگی',
    summaryTrust1: '24 گھنٹے پہلے تک مفت منسوخی',
    summaryTrust2: 'ایئرپورٹ پر 60 منٹ مفت انتظار',
    summaryTrust3: 'واٹس ایپ پر 24/7 رہنمائی و معاونت',
    submittingText: 'بکنگ محفوظ ہو رہی ہے...',
    submitBtn: 'بکنگ کی تصدیق کریں',
    dateRequiredError: 'براہ کرم آگے بڑھنے کے لیے تاریخ منتخب کریں۔',
  },
  ms: {
    tabTransfer: '📍 Pemindahan Lapangan Terbang & Bandar',
    tabHourly: '⏱️ Pemandu Mengikut Jam',
    tabZiyarat: '🕌 Ziarah Tempat Bersejarah',
    tabGroup: '👥 Bas & Rombongan Kumpulan',
    step1Title: '1. Laluan & Jadual',
    step2Title: '2. Pilih Kenderaan & Tambang',
    step3Title: '3. Maklumat Jemaah & Pengesahan',
    step1Btn: 'Teruskan ke Pilihan Kenderaan',
    step2Btn: 'Teruskan ke Maklumat Jemaah',
    step3Btn: 'Sahkan Permintaan Tempahan',
    stepBack: 'Kembali',
    routeLabel: 'Laluan Lebuhraya Popular',
    selectRoute: 'Pilih Laluan',
    pickupLabel: 'Lokasi Pengambilan Tepat',
    dropoffLabel: 'Destinasi / Hotel Tepat',
    durationLabel: 'Tempoh Perkhidmatan',
    hoursSuffix: 'Jam',
    dateLabel: 'Tarikh Pengambilan',
    timeLabel: 'Masa Pengambilan',
    timeNotice: 'Waktu Arab Saudi (+03:00). Sila tempah sekurang-kurangnya 1 jam sebelum.',
    passengersLabel: 'Bilangan Penumpang',
    luggageLabel: 'Bilangan Bagasi',
    flightLabel: 'Nombor Penerbangan (Pilihan)',
    flightPlaceholder: 'cth. MH 156 atau SV 830',
    flightNotice: 'Penjejakan radar penerbangan langsung untuk menyelaraskan pemandu anda.',
    seatsLabel: 'Tempat Duduk',
    bagsLabel: 'Beg',
    selectedBadge: 'Dipilih',
    selectVehicleBtn: 'Pilih Kenderaan Ini',
    fixedFareLabel: 'Jumlah Tambang Tetap Terjamin',
    authoritativeFare: 'Jumlah Tambang Tetap',
    capacityNotice: 'Jumlah penumpang atau bagasi melebihi had kenderaan ini.',
    passengerInfoTitle: '3. Maklumat Jemaah Utama & Hubungan',
    nameLabel: 'Nama Penuh Jemaah Utama',
    namePlaceholder: 'cth. Haji Ismail bin Hassan',
    phoneLabel: 'Nombor WhatsApp / Telefon (dengan Kod Negara)',
    phonePlaceholder: '+60 12 345 6789',
    emailLabel: 'Alamat Emel (Pilihan)',
    emailPlaceholder: 'jemaah@example.com',
    addOnsTitle: 'Pilihan Tambahan & Keistimewaan Percuma',
    addOnChildSeat: 'Kerusi Keselamatan Kanak-kanak (Percuma)',
    addOnFlightTracking: 'Pemantauan Kelewatan Penerbangan Termasuk',
    addOnMalayDriver: 'Pemandu Fasih Bahasa Melayu / Inggeris',
    addOnZamzam: 'Air Zamzam Sejuk Disediakan',
    specialNotesLabel: 'Permintaan Khas (Pilihan)',
    specialNotesPlaceholder: 'cth. Memerlukan bantuan kerusi roda, singgah solat...',
    paymentTitle: 'Kaedah Pembayaran: Bayar Terus Kepada Pemandu',
    paymentBadge: '100% Tiada Bayaran Pendahuluan (Deposit)',
    paymentDesc:
      'Pembayaran dibuat sepenuhnya terus kepada pemandu peribadi anda semasa tiba di destinasi. Anda boleh membayar secara tunai (Riyal Saudi - SAR) atau kad bank melalui mesin terminal pemandu. Tiada kad kredit dalam talian atau wang pendahuluan diperlukan untuk mengesahkan tempahan.',
    summaryTitle: 'Ringkasan Tempahan',
    summaryBadge: 'Tambang Tetap Terjamin',
    summaryItinerary: 'Laluan',
    summarySchedule: 'Jadual (Waktu KSA)',
    summaryVehicle: 'Kenderaan Dipilih',
    summaryPaymentMethod: 'Kaedah Pembayaran',
    summaryPaymentValue: 'Bayar Terus kepada Pemandu Semasa Tiba (Tunai / Kad)',
    summaryTotalFare: 'Jumlah Tambang',
    summaryZeroAdvance: '0 SAR pendahuluan • Bayar semasa tiba',
    summaryTrust1: 'Pembatalan percuma sehingga 24 jam sebelum perjalanan',
    summaryTrust2: 'Menunggu percuma 60 minit di lapangan terbang',
    summaryTrust3: 'Bantuan khidmat sokongan 24/7 melalui WhatsApp',
    submittingText: 'Menyimpan tempahan anda...',
    submitBtn: 'Sahkan Permintaan Tempahan',
    dateRequiredError: 'Sila pilih tarikh perjalanan yang sah untuk meneruskan.',
  },
  tr: {
    tabTransfer: '📍 Havalimanı & Şehirlerarası Transfer',
    tabHourly: '⏱️ Saatlik Özel Şoför',
    tabZiyarat: '🕌 Kutsal Ziyaret Yerleri',
    tabGroup: '👥 Otobüs & Grup Turları',
    step1Title: '1. Güzergah & Zamanlama',
    step2Title: '2. Araç & Sabit Fiyat Seçimi',
    step3Title: '3. Yolcu Bilgileri & Onay',
    step1Btn: 'Araç Seçimine Devam Et',
    step2Btn: 'Yolcu Bilgilerine Devam Et',
    step3Btn: 'Rezervasyon Talebini Onayla',
    stepBack: 'Geri',
    routeLabel: 'Popüler Otoyol Güzergahı',
    selectRoute: 'Güzergah Seçin',
    pickupLabel: 'Tam Alış Noktası',
    dropoffLabel: 'Varış Noktası / Otel',
    durationLabel: 'Kiralama Süresi',
    hoursSuffix: 'Saat',
    dateLabel: 'Alış Tarihi',
    timeLabel: 'Alış Saati',
    timeNotice: 'Suudi Arabistan saati (+03:00). Lütfen en az 1 saat önceden ayırtın.',
    passengersLabel: 'Yolcu Sayısı',
    luggageLabel: 'Bagaj Sayısı',
    flightLabel: 'Uçuş Numarası (İsteğe Bağlı)',
    flightPlaceholder: 'örn. TK 92 or SV 260',
    flightNotice: 'Uçuşunuzdaki rötarlarda şoförünüz otomatik olarak bekletilir.',
    seatsLabel: 'Koltuk',
    bagsLabel: 'Bagaj',
    selectedBadge: 'Seçildi',
    selectVehicleBtn: 'Bu Aracı Seç',
    fixedFareLabel: 'Garantili Sabit Toplam Ücret',
    authoritativeFare: 'Sabit Toplam Ücret',
    capacityNotice: 'Kişi veya bagaj sayısı bu aracın kapasitesini aşıyor.',
    passengerInfoTitle: '3. Ana Yolcu Bilgileri ve İletişim',
    nameLabel: 'Ana Yolcunun Tam Adı',
    namePlaceholder: 'örn. Ahmet Yılmaz',
    phoneLabel: 'WhatsApp / Telefon (Ülke Koduyla)',
    phonePlaceholder: '+90 532 123 4567',
    emailLabel: 'E-posta Adresi (İsteğe Bağlı)',
    emailPlaceholder: 'yolcu@example.com',
    addOnsTitle: 'Ek Tercihler ve Ücretsiz Hizmetler',
    addOnChildSeat: 'Çocuk Güvenlik Koltuğu (Ücretsiz)',
    addOnFlightTracking: 'Canlı Uçuş Takip Hizmeti Dahil',
    addOnMalayDriver: 'İngilizce Bilen Şoför',
    addOnZamzam: 'Soğuk Zemzem Suyu',
    specialNotesLabel: 'Özel İstekler veya Notlar (İsteğe Bağlı)',
    specialNotesPlaceholder: 'örn. Tekerlekli sandalye desteği, namaz molası...',
    paymentTitle: 'Ödeme Yöntemi: Varışta Şoföre Ödeyin',
    paymentBadge: '%100 Ön Ödemesiz',
    paymentDesc:
      'Ödeme, varış noktanıza ulaştığınızda doğrudan özel şoförünüze yapılır. Nakit (SAR) veya şoförün araçtaki POS cihazından banka kartıyla ödeyebilirsiniz. Rezervasyon için online kredi kartı bilgisi veya kapora gerekmez.',
    summaryTitle: 'Rezervasyon Özeti',
    summaryBadge: 'Garantili Sabit Fiyat',
    summaryItinerary: 'Güzergah',
    summarySchedule: 'Tarih & Saat (KSA)',
    summaryVehicle: 'Seçilen Araç',
    summaryPaymentMethod: 'Ödeme Yöntemi',
    summaryPaymentValue: 'Varışta Şoföre Ödeme (Nakit / Kart)',
    summaryTotalFare: 'Toplam Ücret',
    summaryZeroAdvance: '0 SAR ön ödeme • Varışta ödeyin',
    summaryTrust1: '24 saat öncesine kadar ücretsiz iptal',
    summaryTrust2: 'Havalimanında 60 dakika ücretsiz bekleme',
    summaryTrust3: '7/24 WhatsApp üzerinden doğrudan destek',
    submittingText: 'Rezervasyon kaydediliyor...',
    submitBtn: 'Rezervasyon Talebini Onayla',
    dateRequiredError: 'Lütfen devam etmek için geçerli bir tarih seçin.',
  },
};

export function BookingEngine({
  locale,
  dict,
  settings,
  initialRoute = 'jeddah-airport-to-makkah',
  initialVehicle = 'staria',
  initialDate = '',
  initialTime = '14:00',
  initialPassengers = '2',
  initialLuggage = '2',
  initialType = 'transfer',
  initialDuration = '4',
  initialPickup = '',
  initialDropoff = '',
  initialRates,
}: BookingEngineProps) {
  const { currency, formatPrice } = useCurrency();
  const t = LOCALIZED_UI[locale] || LOCALIZED_UI.en;

  // Wizard Step: 1 = Journey Schedule, 2 = Vehicle & Fare Selection, 3 = Passenger & Confirmation
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Trip & Route Details
  const [bookingType, setBookingType] = useState<'transfer' | 'hourly' | 'ziyarat' | 'group_bus'>(initialType);
  const availableRoutes = React.useMemo(() => {
    return Object.entries(ROUTES).filter(([key]) => {
      if (TAIF_ROUTE_KEYS.has(key) && !settings.taif_enabled) return false;
      if (RIYADH_ROUTE_KEYS.has(key) && !settings.riyadh_enabled) return false;
      return true;
    });
  }, [settings.taif_enabled, settings.riyadh_enabled]);

  const initialRouteValid = (initialRoute in ROUTES) && (
    (!TAIF_ROUTE_KEYS.has(initialRoute) || settings.taif_enabled) &&
    (!RIYADH_ROUTE_KEYS.has(initialRoute) || settings.riyadh_enabled)
  );

  const [routeId, setRouteId] = useState(initialRouteValid ? initialRoute : 'jeddah-airport-to-makkah');
  const [vehicleId, setVehicleId] = useState(initialVehicle in VEHICLE_SPECS ? initialVehicle : 'staria');
  const [durationHours, setDurationHours] = useState<number>(Number(initialDuration) || 4);
  const [customPickupLocation, setCustomPickupLocation] = useState(initialPickup || 'Jeddah Airport (KAIA)');
  const [customDropoffLocation, setCustomDropoffLocation] = useState(initialDropoff || 'Makkah Hotel / Haram');
  const [pickupDate, setPickupDate] = useState(initialDate);
  const [pickupTime, setPickupTime] = useState(initialTime || '14:00');
  const [passengers, setPassengers] = useState(Number(initialPassengers) || 2);
  const [luggage, setLuggage] = useState(Number(initialLuggage) || 2);
  const [flightNumber, setFlightNumber] = useState('');
  const [step1Error, setStep1Error] = useState<string | null>(null);

  // Step 3: Passenger Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Add-ons
  const [addOns, setAddOns] = useState({
    child_seat: false,
    flight_tracking: true,
    malay_driver: false,
    zamzam_water: true,
  });

  // STRICT PAYMENT POLICY: Pay Upon Arrival to Chauffeur only
  const paymentMethod = 'pay_upon_arrival' as const;

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('verified_client');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);

  const minDate = new Date().toISOString().split('T')[0];

  const handleBookingTypeChange = (type: 'transfer' | 'hourly' | 'ziyarat' | 'group_bus') => {
    setBookingType(type);
    if (type === 'group_bus' && vehicleId !== 'hiace' && vehicleId !== 'coaster') {
      setVehicleId('coaster');
    }
  };

  const handleSelectVehicle = (id: string) => {
    setVehicleId(id);
    const spec = VEHICLE_SPECS[id];
    if (spec) {
      if (passengers > spec.seats) setPassengers(spec.seats);
      if (luggage > spec.bags) setLuggage(spec.bags);
    }
  };

  // Authoritative Price Calculation synced with database
  const calculateCurrentPriceSAR = () => {
    const calculated = getEstimatedBasePriceSAR({
      bookingType,
      routeId: bookingType === 'transfer' ? routeId : null,
      vehicleId,
      durationHours: bookingType === 'hourly' ? durationHours : undefined,
      customRates: initialRates,
    });
    return calculated || 200;
  };

  const currentPriceSAR = calculateCurrentPriceSAR();

  // Validate Step 1
  const handleProceedToStep2 = () => {
    if (!pickupDate) {
      setStep1Error(t.dateRequiredError);
      return;
    }
    setStep1Error(null);
    trackEvent({
      event: 'route_selected',
      service_type: bookingType,
      route: routeId,
      passengers,
      luggage,
    });
    setCurrentStep(2);
  };

  // Validate Step 2
  const handleProceedToStep3 = () => {
    trackEvent({
      event: 'quote_calculated',
      service_type: bookingType,
      route: routeId,
      vehicle_id: vehicleId,
      price_sar: currentPriceSAR,
      currency,
    });
    setCurrentStep(3);
  };

  // SUBMIT FINAL BOOKING
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const pickupLocation =
      bookingType === 'transfer'
        ? ROUTES[routeId]?.label.split('→')[0].trim() || 'Jeddah Airport (KAIA)'
        : (customPickupLocation || 'Jeddah Airport (KAIA)');
    const dropoffLocation =
      bookingType === 'transfer'
        ? ROUTES[routeId]?.label.split('→')[1]?.trim() || 'Makkah Hotel'
        : (customDropoffLocation || 'Makkah Hotel');

    const payload = {
      booking_type: bookingType,
      route_id: bookingType === 'transfer' ? routeId : null,
      vehicle_id: vehicleId,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail || undefined,
      pickup_datetime: `${pickupDate} ${pickupTime}`,
      pickup_location: pickupLocation,
      dropoff_location: dropoffLocation,
      passengers_count: passengers,
      luggage_count: luggage,
      flight_number: flightNumber || undefined,
      duration_hours: bookingType === 'hourly' ? durationHours : undefined,
      add_ons: addOns,
      special_notes: specialNotes || undefined,
      payment_method: 'pay_upon_arrival',
      currency: currency,
      language: locale,
      'cf-turnstile-response': turnstileToken,
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        trackEvent({
          event: 'booking_form_validation_failed',
          form: 'booking_engine',
          failed_fields: [data.error || 'submission_failed'],
        });
        throw new Error(data.error || 'Failed to submit booking');
      }

      trackEvent({
        event: 'booking_request_saved',
        booking_reference: data.booking?.reference,
        service_type: bookingType,
        payment_method: 'pay_upon_arrival',
      });
      trackEvent({
        event: 'booking_confirmed',
        booking_reference: data.booking?.reference || '',
        service_type: bookingType,
        payment_method: 'pay_upon_arrival',
        total_sar: data.booking?.finalPriceSAR || currentPriceSAR,
      });

      setConfirmedBooking(data.booking);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (confirmedBooking) {
    return (
      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 md:p-12 shadow-sm text-center max-w-2xl mx-auto animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-gold-soft border border-gold-line text-gold-dark flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink">
          {dict.booking_modal.title}
        </h2>
        <p className="text-xs text-ink-muted mt-1 uppercase tracking-widest font-semibold">
          {dict.booking_modal.referenceLabel}:{' '}
          <span className="text-gold-dark font-extrabold text-sm">{confirmedBooking.reference}</span>
        </p>

        {/* BOOKING DETAILS CARD */}
        <div className="bg-bg-alt/80 rounded-xl p-4 sm:p-5 border border-border my-6 text-start text-xs space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-ink-muted">{dict.booking_modal.routeLabel}:</span>
            <span className="font-bold text-ink">
              {confirmedBooking.pickup_location} → {confirmedBooking.dropoff_location}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ink-muted">{dict.booking_modal.vehicleLabel}:</span>
            <span className="font-bold text-ink capitalize">{confirmedBooking.vehicle_id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ink-muted">{dict.booking_modal.datetimeLabel}:</span>
            <span className="font-bold text-ink">{confirmedBooking.pickup_datetime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ink-muted">{dict.booking_card.passengersLabel} &amp; {dict.booking_card.luggageLabel}:</span>
            <span className="font-bold text-ink">
              {confirmedBooking.passengers_count || 1} {dict.booking_card.passengersLabel} • {confirmedBooking.luggage_count || 1} {dict.booking_card.luggageLabel}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border/60">
            <span className="text-ink-muted">{t.summaryPaymentMethod}:</span>
            <span className="font-semibold text-emerald-700 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>{t.summaryPaymentValue}</span>
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border text-sm">
            <span className="font-bold text-ink">{dict.booking_modal.totalFareLabel}:</span>
            <span className="font-display font-extrabold text-gold-dark text-lg sm:text-xl">
              {formatPrice(confirmedBooking.finalPriceSAR)} ({confirmedBooking.finalPriceSAR} SAR)
            </span>
          </div>
        </div>

        <p className="text-xs text-ink-muted leading-relaxed mb-6 font-light">
          {dict.booking_modal.messageSentNotice}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={confirmedBooking.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent({
                event: 'whatsapp_handoff_initiated',
                source: 'booking_engine',
                booking_reference: confirmedBooking.reference,
              });
            }}
            className="min-h-[48px] h-12 px-8 rounded-btn bg-whatsapp hover:bg-whatsapp-hover text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-whatsapp"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{dict.booking_modal.confirmWhatsAppBtn}</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setConfirmedBooking(null);
              setCurrentStep(1);
            }}
            className="min-h-[48px] h-12 px-6 rounded-btn border border-border-strong text-ink text-xs font-semibold hover:bg-bg-alt transition-colors focus-visible:ring-2 focus-visible:ring-gold"
          >
            {dict.booking_modal.closeBtn}
          </button>
        </div>
      </div>
    );
  }

  // Active labels
  const activeItinerary =
    bookingType === 'transfer'
      ? ROUTES[routeId]?.label || `${customPickupLocation} → ${customDropoffLocation}`
      : `${customPickupLocation} → ${customDropoffLocation}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* ============================================================== */}
      {/* LEFT COLUMN: 3-STEP BOOKING WIZARD FORM (lg:col-span-8)         */}
      {/* ============================================================== */}
      <div className="lg:col-span-8 space-y-6">
        {/* SERVICE CATEGORY TABS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface p-1.5 rounded-2xl border border-border shadow-xs">
          <button
            type="button"
            onClick={() => handleBookingTypeChange('transfer')}
            className={`min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-gold ${
              bookingType === 'transfer'
                ? 'bg-gold text-slate-950 shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-bg-alt'
            }`}
          >
            {t.tabTransfer}
          </button>
          <button
            type="button"
            onClick={() => handleBookingTypeChange('hourly')}
            className={`min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-gold ${
              bookingType === 'hourly'
                ? 'bg-gold text-slate-950 shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-bg-alt'
            }`}
          >
            {t.tabHourly}
          </button>
          <button
            type="button"
            onClick={() => handleBookingTypeChange('ziyarat')}
            className={`min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-gold ${
              bookingType === 'ziyarat'
                ? 'bg-gold text-slate-950 shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-bg-alt'
            }`}
          >
            {t.tabZiyarat}
          </button>
          <button
            type="button"
            onClick={() => handleBookingTypeChange('group_bus')}
            className={`min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-gold ${
              bookingType === 'group_bus'
                ? 'bg-gold text-slate-950 shadow-sm'
                : 'text-ink-muted hover:text-ink hover:bg-bg-alt'
            }`}
          >
            {t.tabGroup}
          </button>
        </div>

        {/* 3-STEP PROGRESS STEPPER */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-surface p-2 rounded-2xl border border-border shadow-xs">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`flex items-center justify-center sm:justify-start gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-start min-h-[48px] ${
              currentStep === 1
                ? 'bg-gold text-slate-950 border-gold shadow-xs'
                : 'bg-bg-alt/70 text-ink-muted hover:text-ink border-transparent'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                currentStep === 1 ? 'bg-slate-950 text-gold' : 'bg-surface border border-border text-ink-muted'
              }`}
            >
              {currentStep > 1 ? '✓' : '1'}
            </span>
            <span className="hidden sm:inline">{t.step1Title}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (pickupDate) setCurrentStep(2);
            }}
            className={`flex items-center justify-center sm:justify-start gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-start min-h-[48px] ${
              currentStep === 2
                ? 'bg-gold text-slate-950 border-gold shadow-xs'
                : 'bg-bg-alt/70 text-ink-muted hover:text-ink border-transparent'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                currentStep === 2 ? 'bg-slate-950 text-gold' : 'bg-surface border border-border text-ink-muted'
              }`}
            >
              {currentStep > 2 ? '✓' : '2'}
            </span>
            <span className="hidden sm:inline">{t.step2Title}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (pickupDate) setCurrentStep(3);
            }}
            className={`flex items-center justify-center sm:justify-start gap-2 p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all text-start min-h-[48px] ${
              currentStep === 3
                ? 'bg-gold text-slate-950 border-gold shadow-xs'
                : 'bg-bg-alt/70 text-ink-muted hover:text-ink border-transparent'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 font-bold ${
                currentStep === 3 ? 'bg-slate-950 text-gold' : 'bg-surface border border-border text-ink-muted'
              }`}
            >
              3
            </span>
            <span className="hidden sm:inline">{t.step3Title}</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* STEP 1: ROUTE & SCHEDULE                                       */}
        {/* ============================================================== */}
        {currentStep === 1 && (
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-8 shadow-xs space-y-6 text-start animate-fadeIn">
            <div className="border-b border-border pb-3">
              <h3 className="font-display font-bold text-xl text-ink">
                {t.step1Title}
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                {t.timeNotice}
              </p>
            </div>

            {/* ROUTE SELECTION */}
            {bookingType === 'transfer' ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="route-select" className="block text-xs font-bold text-ink mb-1.5">
                    {t.routeLabel} <span className="text-gold-dark">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="route-select"
                      value={routeId}
                      onChange={(e) => setRouteId(e.target.value)}
                      className="w-full min-h-[48px] h-12 pl-10 pr-4 rtl:pr-10 rtl:pl-4 rounded-btn border border-border-strong bg-bg-alt text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                    >
                      {Object.entries(ROUTES).map(([rKey, rData]) => (
                        <option key={rKey} value={rKey}>
                          {rData.label} — Fixed from {rData.baseSAR} SAR
                        </option>
                      ))}
                    </select>
                    <MapPin className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="pickup-custom" className="block text-xs font-bold text-ink mb-1.5">
                      {t.pickupLabel}
                    </label>
                    <input
                      id="pickup-custom"
                      type="text"
                      placeholder="e.g. KAIA Terminal 1 Arrivals or Hotel Name"
                      value={customPickupLocation}
                      onChange={(e) => setCustomPickupLocation(e.target.value)}
                      className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="dropoff-custom" className="block text-xs font-bold text-ink mb-1.5">
                      {t.dropoffLabel}
                    </label>
                    <input
                      id="dropoff-custom"
                      type="text"
                      placeholder="e.g. Clock Tower Hotel / Swissôtel Makkah"
                      value={customDropoffLocation}
                      onChange={(e) => setCustomDropoffLocation(e.target.value)}
                      className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
              </div>
            ) : bookingType === 'hourly' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hourly-pickup" className="block text-xs font-bold text-ink mb-1.5">
                      {t.pickupLabel} <span className="text-gold-dark">*</span>
                    </label>
                    <input
                      id="hourly-pickup"
                      type="text"
                      required
                      placeholder="e.g. Makkah Hotel / Haram Area"
                      value={customPickupLocation}
                      onChange={(e) => setCustomPickupLocation(e.target.value)}
                      className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>

                  <div>
                    <label htmlFor="duration-select" className="block text-xs font-bold text-ink mb-1.5">
                      {t.durationLabel} <span className="text-gold-dark">*</span>
                    </label>
                    <select
                      id="duration-select"
                      value={durationHours}
                      onChange={(e) => setDurationHours(Number(e.target.value))}
                      className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-bg-alt text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                    >
                      <option value="2">2 {t.hoursSuffix} (Minimum Block)</option>
                      <option value="4">4 {t.hoursSuffix} (Standard Half-Day)</option>
                      <option value="6">6 {t.hoursSuffix}</option>
                      <option value="8">8 {t.hoursSuffix} (Full-Day Service)</option>
                      <option value="12">12 {t.hoursSuffix} (Executive All-Day)</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : bookingType === 'ziyarat' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ziyarat-pickup" className="block text-xs font-bold text-ink mb-1.5">
                      {t.pickupLabel} <span className="text-gold-dark">*</span>
                    </label>
                    <input
                      id="ziyarat-pickup"
                      type="text"
                      required
                      placeholder="e.g. Makkah Hotel / Madinah Hotel"
                      value={customPickupLocation}
                      onChange={(e) => setCustomPickupLocation(e.target.value)}
                      className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="ziyarat-tour" className="block text-xs font-bold text-ink mb-1.5">
                      {t.dropoffLabel} <span className="text-gold-dark">*</span>
                    </label>
                    <select
                      id="ziyarat-tour"
                      value={customDropoffLocation}
                      onChange={(e) => setCustomDropoffLocation(e.target.value)}
                      className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-bg-alt text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                    >
                      <option value="Makkah Holy Sites (Jabal Thawr, Hira, Mina, Arafat)">
                        Makkah Holy Sites (Hira, Thawr, Mina, Arafat)
                      </option>
                      <option value="Madinah Holy Sites (Masjid Quba, Uhud, Qiblatayn)">
                        Madinah Holy Sites (Quba, Uhud, Qiblatayn)
                      </option>
                      <option value="Badr Historical Battlefield Tour">
                        Badr Historical Battlefield Tour
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="group-route-select" className="block text-xs font-bold text-ink mb-1.5">
                    {t.routeLabel} <span className="text-gold-dark">*</span>
                  </label>
                  <select
                    id="group-route-select"
                    value={routeId}
                    onChange={(e) => setRouteId(e.target.value)}
                    className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-bg-alt text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  >
                    {Object.entries(ROUTES).map(([rKey, rData]) => (
                      <option key={rKey} value={rKey}>
                        {rData.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* DATE & TIME CONTROLS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor="pickup-date-input" className="block text-xs font-bold text-ink mb-1.5">
                  {t.dateLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="pickup-date-input"
                    type="date"
                    required
                    min={minDate}
                    value={pickupDate}
                    onChange={(e) => {
                      setPickupDate(e.target.value);
                      if (step1Error) setStep1Error(null);
                    }}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Calendar className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="pickup-time-input" className="block text-xs font-bold text-ink mb-1.5">
                  {t.timeLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="pickup-time-input"
                    type="time"
                    required
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Clock className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* PASSENGERS, LUGGAGE & FLIGHT */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label htmlFor="pax-select" className="block text-xs font-bold text-ink mb-1.5">
                  {t.passengersLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <select
                    id="pax-select"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25].map((num) => (
                      <option key={num} value={num}>
                        {num} {t.passengersLabel}
                      </option>
                    ))}
                  </select>
                  <Users className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="luggage-select" className="block text-xs font-bold text-ink mb-1.5">
                  {t.luggageLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <select
                    id="luggage-select"
                    value={luggage}
                    onChange={(e) => setLuggage(Number(e.target.value))}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {t.luggageLabel}
                      </option>
                    ))}
                  </select>
                  <Luggage className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="flight-input" className="block text-xs font-bold text-ink mb-1.5">
                  {t.flightLabel}
                </label>
                <div className="relative">
                  <input
                    id="flight-input"
                    type="text"
                    placeholder={t.flightPlaceholder}
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Plane className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {flightNumber && (
              <p className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.flightNotice}</span>
              </p>
            )}

            {/* ERROR BANNER */}
            {step1Error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{step1Error}</span>
              </div>
            )}

            {/* ACTION BUTTON */}
            <div className="pt-4 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={handleProceedToStep2}
                className="w-full sm:w-auto min-h-[48px] h-12 px-8 rounded-btn bg-gold text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>{t.step1Btn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 2: CHOOSE VEHICLE & FARE SELECTION                        */}
        {/* ============================================================== */}
        {currentStep === 2 && (
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-8 shadow-xs space-y-6 text-start animate-fadeIn">
            {/* TRIP SUMMARY PILL */}
            <div className="bg-bg-alt p-3.5 rounded-xl border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <span className="font-bold text-ink flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold-dark" />
                  {activeItinerary}
                </span>
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                  {pickupDate} • {pickupTime}
                </span>
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gold-dark" />
                  {passengers} Pax • {luggage} Bags
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-gold-dark hover:underline flex items-center gap-1 shrink-0 self-end sm:self-auto"
              >
                <Edit2 className="w-3 h-3" />
                <span>{t.stepBack}</span>
              </button>
            </div>

            <div className="border-b border-border pb-3">
              <h3 className="font-display font-bold text-xl text-ink">
                {t.step2Title}
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                {t.fixedFareLabel} — {t.summaryZeroAdvance}
              </p>
            </div>

            {/* VEHICLES GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(VEHICLE_SPECS)
                .filter(([vId]) => (bookingType === 'group_bus' ? vId === 'hiace' || vId === 'coaster' : true))
                .map(([vId, vData]) => {
                  const isSelected = vehicleId === vId;
                  const vehicleEstimatedFare =
                    getEstimatedBasePriceSAR({
                      bookingType,
                      routeId: bookingType === 'transfer' ? routeId : null,
                      vehicleId: vId,
                      durationHours: bookingType === 'hourly' ? durationHours : undefined,
                      customRates: initialRates,
                    }) || 200;

                  const isOverSeats = passengers > vData.seats;
                  const isOverBags = luggage > vData.bags;

                  return (
                    <div
                      key={vId}
                      onClick={() => handleSelectVehicle(vId)}
                      className={`rounded-2xl p-4 border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-gold bg-gold-soft/35 shadow-md ring-2 ring-gold/40'
                          : 'border-border bg-surface hover:border-gold-line'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-gold text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-xs">
                          <Check className="w-3 h-3" />
                          <span>{t.selectedBadge}</span>
                        </div>
                      )}

                      <div>
                        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-bg-alt mb-3 border border-border/60">
                          <Image
                            src={vData.img}
                            alt={vData.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>

                        <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                          {vData.category}
                        </span>
                        <h4 className="font-display font-bold text-base sm:text-lg text-ink mb-2">
                          {vData.name}
                        </h4>

                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 ${
                              isOverSeats
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-bg-alt text-ink border border-border'
                            }`}
                          >
                            <Users className="w-3 h-3 text-gold-dark" />
                            <span>{vData.seats} {t.seatsLabel}</span>
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 ${
                              isOverBags
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-bg-alt text-ink border border-border'
                            }`}
                          >
                            <Luggage className="w-3 h-3 text-gold-dark" />
                            <span>{vData.bags} {t.bagsLabel}</span>
                          </span>
                        </div>

                        {(isOverSeats || isOverBags) && (
                          <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg mb-3 font-medium">
                            {t.capacityNotice}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-ink-muted uppercase block">{t.authoritativeFare}</span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-display font-bold text-xl text-ink">
                              {formatPrice(vehicleEstimatedFare)}
                            </span>
                            <span className="text-[11px] text-ink-muted">({vehicleEstimatedFare} SAR)</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectVehicle(vId);
                          }}
                          className={`min-h-[40px] px-4 rounded-btn text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-slate-950 text-gold shadow-xs'
                              : 'bg-bg-alt text-ink hover:bg-gold-soft border border-border'
                          }`}
                        >
                          {isSelected ? t.selectedBadge : t.selectVehicleBtn}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn border border-border text-ink text-xs font-semibold hover:bg-bg-alt transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{t.stepBack}</span>
              </button>

              <button
                type="button"
                onClick={handleProceedToStep3}
                className="w-full sm:w-auto min-h-[48px] h-12 px-8 rounded-btn bg-gold text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>{t.step2Btn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 3: PASSENGER DETAILS & MANDATORY PAYMENT POLICY (PAY DRIVER) */}
        {/* ============================================================== */}
        {currentStep === 3 && (
          <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-5 sm:p-8 shadow-xs space-y-6 text-start animate-fadeIn">
            <div className="border-b border-border pb-3">
              <h3 className="font-display font-bold text-xl text-ink">
                {t.passengerInfoTitle}
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                {t.summaryZeroAdvance}
              </p>
            </div>

            {/* PASSENGER INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="customer-name-input" className="block text-xs font-bold text-ink mb-1.5">
                  {t.nameLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="customer-name-input"
                    type="text"
                    required
                    placeholder={t.namePlaceholder}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <User className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="customer-phone-input" className="block text-xs font-bold text-ink mb-1.5">
                  {t.phoneLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="customer-phone-input"
                    type="tel"
                    inputMode="tel"
                    required
                    placeholder={t.phonePlaceholder}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Phone className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="customer-email-input" className="block text-xs font-bold text-ink mb-1.5">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <input
                    id="customer-email-input"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Mail className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* ADD-ONS CHECKBOXES */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-ink mb-2">
                {t.addOnsTitle}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="flex items-center gap-2.5 p-3 min-h-[48px] rounded-xl bg-bg-alt/60 border border-border cursor-pointer hover:border-gold-line transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.child_seat}
                    onChange={(e) => setAddOns({ ...addOns, child_seat: e.target.checked })}
                    className="rounded text-gold focus:ring-gold w-4 h-4"
                  />
                  <span className="font-medium text-ink">{t.addOnChildSeat}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 min-h-[48px] rounded-xl bg-bg-alt/60 border border-border cursor-pointer hover:border-gold-line transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.flight_tracking}
                    onChange={(e) => setAddOns({ ...addOns, flight_tracking: e.target.checked })}
                    className="rounded text-gold focus:ring-gold w-4 h-4"
                  />
                  <span className="font-medium text-ink">{t.addOnFlightTracking}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 min-h-[48px] rounded-xl bg-bg-alt/60 border border-border cursor-pointer hover:border-gold-line transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.malay_driver}
                    onChange={(e) => setAddOns({ ...addOns, malay_driver: e.target.checked })}
                    className="rounded text-gold focus:ring-gold w-4 h-4"
                  />
                  <span className="font-medium text-ink">{t.addOnMalayDriver}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 min-h-[48px] rounded-xl bg-bg-alt/60 border border-border cursor-pointer hover:border-gold-line transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.zamzam_water}
                    onChange={(e) => setAddOns({ ...addOns, zamzam_water: e.target.checked })}
                    className="rounded text-gold focus:ring-gold w-4 h-4"
                  />
                  <span className="font-medium text-ink">{t.addOnZamzam}</span>
                </label>
              </div>
            </div>

            {/* SPECIAL NOTES */}
            <div>
              <label htmlFor="customer-notes-input" className="block text-xs font-bold text-ink mb-1.5">
                {t.specialNotesLabel}
              </label>
              <textarea
                id="customer-notes-input"
                rows={2}
                placeholder={t.specialNotesPlaceholder}
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full p-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold resize-none"
              />
            </div>

            {/* ============================================================ */}
            {/* STRICT MANDATORY PAYMENT POLICY: PAY THE DRIVER ONLY CARD    */}
            {/* ============================================================ */}
            <div className="pt-2">
              <div className="bg-gold-soft/50 rounded-2xl p-5 border-2 border-gold/70 shadow-xs relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                    <Banknote className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display font-bold text-base sm:text-lg text-ink">
                        {t.paymentTitle}
                      </h4>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950 text-gold text-[11px] font-extrabold uppercase tracking-wider">
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.paymentBadge}</span>
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed font-light">
                      {t.paymentDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* TURNSTILE ANTI-BOT WIDGET */}
            <div className="pt-2 flex justify-center">
              <TurnstileWidget
                locale={locale}
                onVerify={(token) => setTurnstileToken(token)}
              />
            </div>

            {/* ERROR DISPLAY */}
            {errorMessage && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* SUBMIT AND BACK BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                disabled={isSubmitting}
                className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn border border-border text-ink text-xs font-semibold hover:bg-bg-alt transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{t.stepBack}</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-h-[48px] h-12 px-8 rounded-btn bg-gold hover:bg-gold-hover text-slate-950 hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>{t.submittingText}</span>
                  </>
                ) : (
                  <>
                    <span>{t.step3Btn}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ============================================================== */}
      {/* RIGHT COLUMN: STICKY BOOKING SUMMARY CARD (lg:col-span-4)       */}
      {/* ============================================================== */}
      <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
        <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-sm text-start space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <span className="text-[10px] font-bold text-gold-dark uppercase tracking-widest block">
                {t.summaryBadge}
              </span>
              <h3 className="font-display font-bold text-lg text-ink">
                {t.summaryTitle}
              </h3>
            </div>
            <ShieldCheck className="w-6 h-6 text-gold-dark" />
          </div>

          {/* ITINERARY */}
          <div className="space-y-1 text-xs">
            <span className="text-[10px] font-bold text-ink-muted uppercase block">
              {t.summaryItinerary}
            </span>
            <div className="flex items-start gap-2 font-semibold text-ink">
              <MapPin className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
              <span>{activeItinerary}</span>
            </div>
          </div>

          {/* SCHEDULE */}
          <div className="space-y-1 text-xs">
            <span className="text-[10px] font-bold text-ink-muted uppercase block">
              {t.summarySchedule}
            </span>
            <div className="flex items-center gap-2 text-ink font-medium">
              <Calendar className="w-4 h-4 text-gold-dark shrink-0" />
              <span>{pickupDate ? `${pickupDate} • ${pickupTime}` : 'Date & Time not set'}</span>
            </div>
          </div>

          {/* SELECTED VEHICLE */}
          <div className="space-y-2 text-xs pt-1 border-t border-border/60">
            <span className="text-[10px] font-bold text-ink-muted uppercase block">
              {t.summaryVehicle}
            </span>
            <div className="flex items-center gap-3 bg-bg-alt/70 p-2.5 rounded-xl border border-border">
              <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-surface shrink-0 border border-border">
                <Image
                  src={VEHICLE_SPECS[vehicleId]?.img || '/assets/images/staria_exterior.webp'}
                  alt={VEHICLE_SPECS[vehicleId]?.name || 'Vehicle'}
                  fill
                  sizes="60px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-ink text-xs truncate">
                  {VEHICLE_SPECS[vehicleId]?.name}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-ink-muted">
                  <span>{VEHICLE_SPECS[vehicleId]?.seats} {t.seatsLabel}</span>
                  <span>•</span>
                  <span>{VEHICLE_SPECS[vehicleId]?.bags} {t.bagsLabel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* PARTY SIZE */}
          <div className="flex items-center justify-between text-xs text-ink-muted pt-1">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-gold-dark" />
              <span>{passengers} {t.passengersLabel}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Luggage className="w-3.5 h-3.5 text-gold-dark" />
              <span>{luggage} {t.luggageLabel}</span>
            </span>
          </div>

          {/* PAYMENT METHOD */}
          <div className="bg-gold-soft/40 p-3 rounded-xl border border-gold-line text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider">
                {t.summaryPaymentMethod}
              </span>
              <span className="text-emerald-700 font-extrabold text-[11px] flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Zero Advance</span>
              </span>
            </div>
            <p className="font-bold text-ink text-xs">
              {t.summaryPaymentValue}
            </p>
          </div>

          {/* AUTHORITATIVE TOTAL PRICE */}
          <div className="pt-3 border-t border-border">
            <span className="text-[10px] text-ink-muted uppercase block mb-0.5">
              {t.summaryTotalFare}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-ink">
                {formatPrice(currentPriceSAR)}
              </span>
              <span className="text-xs text-ink-muted font-normal">
                ({currentPriceSAR} SAR)
              </span>
            </div>
            <p className="text-[11px] text-ink-muted mt-1">
              {t.summaryZeroAdvance}
            </p>
          </div>

          {/* TRUST BADGES LIST */}
          <div className="pt-3 border-t border-border/70 space-y-2 text-[11px] text-ink-muted">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.summaryTrust1}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.summaryTrust2}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{t.summaryTrust3}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
