'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCIES, CurrencyCode } from '@/i18n/config';
import {
  Compass,
  Plane,
  Building,
  Palmtree,
  Shield,
  Clock,
  Car,
  ShieldCheck,
  ArrowRight,
  Route as RouteIcon,
  Sparkles,
} from 'lucide-react';
import { LOCALIZED_ROUTE_NAMES } from '@/lib/pricing-constants';

interface PricingTableProps {
  locale: Locale;
  dict: Dictionary;
  initialRates?: Record<string, Record<string, number>>;
  taifEnabled?: boolean;
  riyadhEnabled?: boolean;
}

export interface PricingRouteMeta {
  id: string;
  region: 'western' | 'taif' | 'riyadh';
  cities: ('jeddah' | 'makkah' | 'madinah' | 'taif' | 'riyadh')[];
  defCamry: number;
  defStaria: number;
  defYukon: number;
  defHiace: number;
  defCoaster: number;
}

export const ALL_PRICING_ROUTES: PricingRouteMeta[] = [
  // Western Province
  {
    id: 'jeddah-airport-to-makkah',
    region: 'western',
    cities: ['jeddah', 'makkah'],
    defCamry: 200,
    defStaria: 260,
    defYukon: 380,
    defHiace: 340,
    defCoaster: 650,
  },
  {
    id: 'makkah-to-jeddah-airport',
    region: 'western',
    cities: ['makkah', 'jeddah'],
    defCamry: 200,
    defStaria: 260,
    defYukon: 380,
    defHiace: 340,
    defCoaster: 650,
  },
  {
    id: 'makkah-to-madinah',
    region: 'western',
    cities: ['makkah', 'madinah'],
    defCamry: 450,
    defStaria: 500,
    defYukon: 750,
    defHiace: 650,
    defCoaster: 1200,
  },
  {
    id: 'madinah-to-makkah',
    region: 'western',
    cities: ['madinah', 'makkah'],
    defCamry: 450,
    defStaria: 500,
    defYukon: 750,
    defHiace: 650,
    defCoaster: 1200,
  },
  {
    id: 'madinah-airport-to-hotel',
    region: 'western',
    cities: ['madinah'],
    defCamry: 150,
    defStaria: 190,
    defYukon: 280,
    defHiace: 250,
    defCoaster: 550,
  },
  {
    id: 'jeddah-to-madinah',
    region: 'western',
    cities: ['jeddah', 'madinah'],
    defCamry: 680,
    defStaria: 750,
    defYukon: 980,
    defHiace: 850,
    defCoaster: 1600,
  },

  // Taif Transfers
  {
    id: 'makkah-to-taif',
    region: 'taif',
    cities: ['makkah', 'taif'],
    defCamry: 350,
    defStaria: 450,
    defYukon: 600,
    defHiace: 550,
    defCoaster: 950,
  },
  {
    id: 'taif-to-makkah',
    region: 'taif',
    cities: ['taif', 'makkah'],
    defCamry: 350,
    defStaria: 450,
    defYukon: 600,
    defHiace: 550,
    defCoaster: 950,
  },
  {
    id: 'jeddah-to-taif',
    region: 'taif',
    cities: ['jeddah', 'taif'],
    defCamry: 550,
    defStaria: 650,
    defYukon: 850,
    defHiace: 800,
    defCoaster: 1400,
  },

  // Riyadh VIP Transfers
  {
    id: 'riyadh-airport-transfer',
    region: 'riyadh',
    cities: ['riyadh'],
    defCamry: 200,
    defStaria: 280,
    defYukon: 450,
    defHiace: 400,
    defCoaster: 750,
  },
  {
    id: 'riyadh-to-makkah',
    region: 'riyadh',
    cities: ['riyadh', 'makkah'],
    defCamry: 2200,
    defStaria: 2600,
    defYukon: 3500,
    defHiace: 3200,
    defCoaster: 5500,
  },
  {
    id: 'riyadh-to-madinah',
    region: 'riyadh',
    cities: ['riyadh', 'madinah'],
    defCamry: 2200,
    defStaria: 2600,
    defYukon: 3500,
    defHiace: 3200,
    defCoaster: 5500,
  },
];

// Complete 10-Language UI Dictionary
const I18N: Record<
  Locale,
  {
    heroTitle: string;
    heroSubtitle: string;
    calligraphy: string;
    colRoute: string;
    colAction: string;
    tabAll: string;
    tabJeddah: string;
    tabMakkah: string;
    tabMadinah: string;
    tabTaif: string;
    tabRiyadh: string;
    badgeWestern: string;
    badgeTaif: string;
    badgeRiyadh: string;
    bookNow: string;
    currencyLabel: string;
    trust1Title: string;
    trust1Sub: string;
    trust2Title: string;
    trust2Sub: string;
    trust3Title: string;
    trust3Sub: string;
    trust4Title: string;
    trust4Sub: string;
  }
> = {
  ar: {
    heroTitle: 'باقات وأسعار التوصيل الفاخر',
    heroSubtitle: 'خدمات تنقل راقية بين مدن ومطارات المملكة العربية السعودية',
    calligraphy: 'رحلتكم... أولويتنا',
    colRoute: 'المسار / الرحلة',
    colAction: 'احجز الآن',
    tabAll: 'جميع المسارات',
    tabJeddah: 'جدة',
    tabMakkah: 'مكة المكرمة',
    tabMadinah: 'المدينة المنورة',
    tabTaif: 'الطائف',
    tabRiyadh: 'الرياض',
    badgeWestern: 'المنطقة الغربية',
    badgeTaif: 'الطائف',
    badgeRiyadh: 'الرياض',
    bookNow: 'احجز الآن',
    currencyLabel: 'عرض الأسعار بـ:',
    trust1Title: 'أسطول فاخر',
    trust1Sub: 'مركبات حديثة وفارهة',
    trust2Title: 'سائقون محترفون',
    trust2Sub: 'خبرة وتراخيص معتمدة',
    trust3Title: 'دعم 24/7',
    trust3Sub: 'متواجدون دائماً لخدمتكم',
    trust4Title: 'أمان وموثوقية',
    trust4Sub: 'سلامتكم أولويتنا',
  },
  en: {
    heroTitle: 'Premium Transfer Rates',
    heroSubtitle: 'Luxury transportation across Saudi Arabia',
    calligraphy: 'Your Journey, Our Priority',
    colRoute: 'Route / Journey',
    colAction: 'Book Now',
    tabAll: 'All Routes',
    tabJeddah: 'Jeddah',
    tabMakkah: 'Makkah',
    tabMadinah: 'Madinah',
    tabTaif: 'Taif',
    tabRiyadh: 'Riyadh',
    badgeWestern: 'WESTERN PROVINCE',
    badgeTaif: 'TAIF',
    badgeRiyadh: 'RIYADH',
    bookNow: 'Book Now',
    currencyLabel: 'Display Currency:',
    trust1Title: 'Luxury Fleet',
    trust1Sub: 'Premium Vehicles',
    trust2Title: 'Professional Drivers',
    trust2Sub: 'Experienced & Certified',
    trust3Title: '24/7 Support',
    trust3Sub: "We're Always Here",
    trust4Title: 'Safe & Reliable',
    trust4Sub: 'Your Safety Our Priority',
  },
  ms: {
    heroTitle: 'Kadar Pemindahan Premium',
    heroSubtitle: 'Pengangkutan mewah di seluruh Arab Saudi',
    calligraphy: 'Perjalanan Anda, Keutamaan Kami',
    colRoute: 'Laluan / Perjalanan',
    colAction: 'Tempah Sekarang',
    tabAll: 'Semua Laluan',
    tabJeddah: 'Jeddah',
    tabMakkah: 'Makkah',
    tabMadinah: 'Madinah',
    tabTaif: 'Taif',
    tabRiyadh: 'Riyadh',
    badgeWestern: 'WILAYAH BARAT',
    badgeTaif: 'TAIF',
    badgeRiyadh: 'RIYADH',
    bookNow: 'Tempah',
    currencyLabel: 'Mata Wang:',
    trust1Title: 'Armada Mewah',
    trust1Sub: 'Kenderaan Premium',
    trust2Title: 'Pemandu Profesional',
    trust2Sub: 'Berpengalaman & Disahkan',
    trust3Title: 'Sokongan 24/7',
    trust3Sub: 'Sentiasa Untuk Anda',
    trust4Title: 'Selamat & Dipercayai',
    trust4Sub: 'Keselamatan Anda Keutamaan Kami',
  },
  id: {
    heroTitle: 'Tarif Transfer Premium',
    heroSubtitle: 'Transportasi mewah di seluruh Arab Saudi',
    calligraphy: 'Perjalanan Anda, Prioritas Kami',
    colRoute: 'Rute / Perjalanan',
    colAction: 'Pesan Sekarang',
    tabAll: 'Semua Rute',
    tabJeddah: 'Jeddah',
    tabMakkah: 'Makkah',
    tabMadinah: 'Madinah',
    tabTaif: 'Taif',
    tabRiyadh: 'Riyadh',
    badgeWestern: 'WILAYAH BARAT',
    badgeTaif: 'TAIF',
    badgeRiyadh: 'RIYADH',
    bookNow: 'Pesan',
    currencyLabel: 'Mata Uang:',
    trust1Title: 'Armada Mewah',
    trust1Sub: 'Kendaraan Premium',
    trust2Title: 'Pengemudi Profesional',
    trust2Sub: 'Berpengalaman & Tersertifikasi',
    trust3Title: 'Dukungan 24/7',
    trust3Sub: 'Selalu Siap Membantu',
    trust4Title: 'Aman & Terpercaya',
    trust4Sub: 'Keselamatan Anda Prioritas Kami',
  },
  ur: {
    heroTitle: 'پریمیم ٹرانسفر ریٹس',
    heroSubtitle: 'سعودی عرب بھر میں پرتعیش نجی ٹرانسپورٹ',
    calligraphy: 'آپ کا سفر، ہماری اولین ترجیح',
    colRoute: 'راستہ / سفر',
    colAction: 'ابھی بک کریں',
    tabAll: 'تمام راستے',
    tabJeddah: 'جدہ',
    tabMakkah: 'مکہ مکرمہ',
    tabMadinah: 'مدینہ منورہ',
    tabTaif: 'طائف',
    tabRiyadh: 'ریاض',
    badgeWestern: 'مغربی خطہ',
    badgeTaif: 'طائف',
    badgeRiyadh: 'ریاض',
    bookNow: 'بک کریں',
    currencyLabel: 'کرنسی:',
    trust1Title: 'لگژری فلیٹ',
    trust1Sub: 'پریمیم گاڑیاں',
    trust2Title: 'پیشہ ور ڈرائیور',
    trust2Sub: 'تجربہ کار اور تصدیق شدہ',
    trust3Title: '24/7 سپورٹ',
    trust3Sub: 'ہم ہر وقت حاضر ہیں',
    trust4Title: 'محفوظ اور قابل اعتماد',
    trust4Sub: 'آپ کی حفاظت ہماری اولین ترجیح',
  },
  fr: {
    heroTitle: 'Tarifs de Transfert Premium',
    heroSubtitle: 'Transport haut de gamme à travers l’Arabie Saoudite',
    calligraphy: 'Votre Voyage, Notre Priorité',
    colRoute: 'Itinéraire / Trajet',
    colAction: 'Réserver',
    tabAll: 'Tous les itinéraires',
    tabJeddah: 'Djeddah',
    tabMakkah: 'La Mecque',
    tabMadinah: 'Médine',
    tabTaif: 'Taïf',
    tabRiyadh: 'Riyad',
    badgeWestern: 'PROVINCE OCCIDENTALE',
    badgeTaif: 'TAÏF',
    badgeRiyadh: 'RIYAD',
    bookNow: 'Réserver',
    currencyLabel: 'Devise:',
    trust1Title: 'Flotte de Luxe',
    trust1Sub: 'Véhicules Haut de Gamme',
    trust2Title: 'Chauffeurs Professionnels',
    trust2Sub: 'Expérimentés et Certifiés',
    trust3Title: 'Support 24/7',
    trust3Sub: 'Toujours à votre écoute',
    trust4Title: 'Sûr et Fiable',
    trust4Sub: 'Votre Sécurité Notre Priorité',
  },
  es: {
    heroTitle: 'Tarifas de Traslado Premium',
    heroSubtitle: 'Transporte de lujo en toda Arabia Saudita',
    calligraphy: 'Su Viaje, Nuestra Prioridad',
    colRoute: 'Ruta / Viaje',
    colAction: 'Reservar',
    tabAll: 'Todas las rutas',
    tabJeddah: 'Yeda',
    tabMakkah: 'La Meca',
    tabMadinah: 'Medina',
    tabTaif: 'Taif',
    tabRiyadh: 'Riad',
    badgeWestern: 'PROVINCIA OCCIDENTAL',
    badgeTaif: 'TAIF',
    badgeRiyadh: 'RIAD',
    bookNow: 'Reservar',
    currencyLabel: 'Moneda:',
    trust1Title: 'Flota de Lujo',
    trust1Sub: 'Vehículos Premium',
    trust2Title: 'Chóferes Profesionales',
    trust2Sub: 'Experimentados y Certificados',
    trust3Title: 'Soporte 24/7',
    trust3Sub: 'Siempre a su disposición',
    trust4Title: 'Seguro y Confiable',
    trust4Sub: 'Su Seguridad Nuestra Prioridad',
  },
  de: {
    heroTitle: 'Premium Transfertarife',
    heroSubtitle: 'Luxustransport in ganz Saudi-Arabien',
    calligraphy: 'Ihre Reise, Unsere Priorität',
    colRoute: 'Route / Fahrt',
    colAction: 'Buchen',
    tabAll: 'Alle Routen',
    tabJeddah: 'Dschidda',
    tabMakkah: 'Mekka',
    tabMadinah: 'Medina',
    tabTaif: 'Taif',
    tabRiyadh: 'Riad',
    badgeWestern: 'WESTPROVINZ',
    badgeTaif: 'TAIF',
    badgeRiyadh: 'RIAD',
    bookNow: 'Buchen',
    currencyLabel: 'Währung:',
    trust1Title: 'Luxusflotte',
    trust1Sub: 'Premiumfahrzeuge',
    trust2Title: 'Professionelle Fahrer',
    trust2Sub: 'Erfahren und Zertifiziert',
    trust3Title: '24/7 Kundendienst',
    trust3Sub: 'Immer für Sie da',
    trust4Title: 'Sicher & Zuverlässig',
    trust4Sub: 'Ihre Sicherheit Unsere Priorität',
  },
  tr: {
    heroTitle: 'Premium Transfer Fiyatları',
    heroSubtitle: 'Suudi Arabistan genelinde lüks ulaşım',
    calligraphy: 'Yolculuğunuz, Önceliğimiz',
    colRoute: 'Güzergah / Sefer',
    colAction: 'Rezerve Et',
    tabAll: 'Tüm Güzergahlar',
    tabJeddah: 'Cidde',
    tabMakkah: 'Mekke',
    tabMadinah: 'Medine',
    tabTaif: 'Taif',
    tabRiyadh: 'Riyad',
    badgeWestern: 'BATI BÖLGESİ',
    badgeTaif: 'TAİF',
    badgeRiyadh: 'RİYAD',
    bookNow: 'Rezerve Et',
    currencyLabel: 'Para Birimi:',
    trust1Title: 'Lüks Filo',
    trust1Sub: 'Premium Araçlar',
    trust2Title: 'Profesyonel Şoförler',
    trust2Sub: 'Deneyimli ve Sertifikalı',
    trust3Title: '7/24 Destek',
    trust3Sub: 'Her Zaman Yanınızdayız',
    trust4Title: 'Güvenli ve Güvenilir',
    trust4Sub: 'Güvenliğiniz Önceliğimizdir',
  },
  hi: {
    heroTitle: 'प्रीमियम ट्रांसफर दरें',
    heroSubtitle: 'सऊदी अरब भर में लक्जरी परिवहन सेवाएं',
    calligraphy: 'आपकी यात्रा, हमारी प्राथमिकता',
    colRoute: 'मार्ग / यात्रा',
    colAction: 'बुक करें',
    tabAll: 'सभी मार्ग',
    tabJeddah: 'जेद्दा',
    tabMakkah: 'मक्का',
    tabMadinah: 'मदीना',
    tabTaif: 'ताइफ़',
    tabRiyadh: 'रियाद',
    badgeWestern: 'पश्चिमी प्रांत',
    badgeTaif: 'ताइफ़',
    badgeRiyadh: 'रियाद',
    bookNow: 'बुक करें',
    currencyLabel: 'मुद्रा:',
    trust1Title: 'लक्जरी बेड़ा',
    trust1Sub: 'प्रीमियम वाहन',
    trust2Title: 'पेशेवर चालक',
    trust2Sub: 'अनुभवी एवं प्रमाणित',
    trust3Title: '24/7 सहायता',
    trust3Sub: 'हम सदैव तत्पर हैं',
    trust4Title: 'सुरक्षित एवं विश्वसनीय',
    trust4Sub: 'आपकी सुरक्षा हमारी प्राथमिकता',
  },
};

// Localized City Subtitles (e.g. "Jeddah • Makkah")
const CITY_SUBTITLES: Record<string, Record<Locale, string>> = {
  'jeddah-airport-to-makkah': {
    en: 'Jeddah • Makkah',
    ar: 'جدة • مكة المكرمة',
    ms: 'Jeddah • Makkah',
    id: 'Jeddah • Makkah',
    ur: 'جدہ • مکہ مکرمہ',
    fr: 'Djeddah • La Mecque',
    es: 'Yeda • La Meca',
    de: 'Dschidda • Mekka',
    tr: 'Cidde • Mekke',
    hi: 'जेद्दा • मक्का',
  },
  'makkah-to-jeddah-airport': {
    en: 'Makkah • Jeddah',
    ar: 'مكة المكرمة • جدة',
    ms: 'Makkah • Jeddah',
    id: 'Makkah • Jeddah',
    ur: 'مکہ مکرمہ • جدہ',
    fr: 'La Mecque • Djeddah',
    es: 'La Meca • Yeda',
    de: 'Mekka • Dschidda',
    tr: 'Mekke • Cidde',
    hi: 'मक्का • जेद्दा',
  },
  'makkah-to-madinah': {
    en: 'Makkah • Madinah',
    ar: 'مكة المكرمة • المدينة المنورة',
    ms: 'Makkah • Madinah',
    id: 'Makkah • Madinah',
    ur: 'مکہ مکرمہ • مدینہ منورہ',
    fr: 'La Mecque • Médine',
    es: 'La Meca • Medina',
    de: 'Mekka • Medina',
    tr: 'Mekke • Medine',
    hi: 'मक्का • मदीना',
  },
  'madinah-to-makkah': {
    en: 'Madinah • Makkah',
    ar: 'المدينة المنورة • مكة المكرمة',
    ms: 'Madinah • Makkah',
    id: 'Madinah • Makkah',
    ur: 'مدینہ منورہ • مکہ مکرمہ',
    fr: 'Médine • La Mecque',
    es: 'Medina • La Meca',
    de: 'Medina • Mekka',
    tr: 'Medine • Mekke',
    hi: 'मदीना • मक्का',
  },
  'madinah-airport-to-hotel': {
    en: 'Madinah • Madinah',
    ar: 'المدينة المنورة • المدينة المنورة',
    ms: 'Madinah • Madinah',
    id: 'Madinah • Madinah',
    ur: 'مدینہ منورہ • مدینہ منورہ',
    fr: 'Médine • Médine',
    es: 'Medina • Medina',
    de: 'Medina • Medina',
    tr: 'Medine • Medine',
    hi: 'मदीना • मदीना',
  },
  'jeddah-to-madinah': {
    en: 'Jeddah • Madinah',
    ar: 'جدة • المدينة المنورة',
    ms: 'Jeddah • Madinah',
    id: 'Jeddah • Madinah',
    ur: 'جدہ • مدینہ منورہ',
    fr: 'Djeddah • Médine',
    es: 'Yeda • Medina',
    de: 'Dschidda • Medina',
    tr: 'Cidde • Medine',
    hi: 'जेद्दा • मदीना',
  },
  'makkah-to-taif': {
    en: 'Makkah • Taif',
    ar: 'مكة المكرمة • الطائف',
    ms: 'Makkah • Taif',
    id: 'Makkah • Taif',
    ur: 'مکہ مکرمہ • طائف',
    fr: 'La Mecque • Taïf',
    es: 'La Meca • Taif',
    de: 'Mekka • Taif',
    tr: 'Mekke • Taif',
    hi: 'मक्का • ताइफ़',
  },
  'taif-to-makkah': {
    en: 'Taif • Makkah',
    ar: 'الطائف • مكة المكرمة',
    ms: 'Taif • Makkah',
    id: 'Taif • Makkah',
    ur: 'طائف • مکہ مکرمہ',
    fr: 'Taïf • La Mecque',
    es: 'Taif • La Meca',
    de: 'Taif • Mekka',
    tr: 'Taif • Mekke',
    hi: 'ताइफ़ • मक्का',
  },
  'jeddah-to-taif': {
    en: 'Jeddah • Taif',
    ar: 'جدة • الطائف',
    ms: 'Jeddah • Taif',
    id: 'Jeddah • Taif',
    ur: 'جدہ • طائف',
    fr: 'Djeddah • Taïf',
    es: 'Yeda • Taif',
    de: 'Dschidda • Taif',
    tr: 'Cidde • Taif',
    hi: 'जेद्दा • ताइफ़',
  },
  'riyadh-airport-transfer': {
    en: 'Riyadh • Riyadh',
    ar: 'الرياض • الرياض',
    ms: 'Riyadh • Riyadh',
    id: 'Riyadh • Riyadh',
    ur: 'ریاض • ریاض',
    fr: 'Riyad • Riyad',
    es: 'Riad • Riad',
    de: 'Riad • Riad',
    tr: 'Riyad • Riyad',
    hi: 'रियाद • रियाद',
  },
  'riyadh-to-makkah': {
    en: 'Riyadh • Makkah',
    ar: 'الرياض • مكة المكرمة',
    ms: 'Riyadh • Makkah',
    id: 'Riyadh • Makkah',
    ur: 'ریاض • مکہ مکرمہ',
    fr: 'Riyad • La Mecque',
    es: 'Riad • La Meca',
    de: 'Riad • Mekka',
    tr: 'Riyad • Mekke',
    hi: 'रियाद • मक्का',
  },
  'riyadh-to-madinah': {
    en: 'Riyadh • Madinah',
    ar: 'الرياض • المدينة المنورة',
    ms: 'Riyadh • Madinah',
    id: 'Riyadh • Madinah',
    ur: 'ریاض • مدینہ منورہ',
    fr: 'Riyad • Médine',
    es: 'Riad • Medina',
    de: 'Riad • Medina',
    tr: 'Riyad • Medine',
    hi: 'रियाद • मदीना',
  },
};

export function PricingTable({
  locale,
  dict,
  initialRates,
  taifEnabled = true,
  riyadhEnabled = true,
}: PricingTableProps) {
  const { currency, setCurrency, formatPrice } = useCurrency();
  const [selectedCity, setSelectedCity] = useState<
    'all' | 'jeddah' | 'makkah' | 'madinah' | 'taif' | 'riyadh'
  >('all');
  const [activeMobileVehicle, setActiveMobileVehicle] = useState<
    'staria' | 'camry' | 'yukon' | 'hiace' | 'coaster'
  >('staria');

  const isAr = locale === 'ar';
  const isRtl = isAr || locale === 'ur';
  const t = I18N[locale] || I18N.en;

  // Filter routes based on site settings and active city tab
  const availableRoutes = ALL_PRICING_ROUTES.filter((r) => {
    if (r.region === 'taif' && !taifEnabled) return false;
    if (r.region === 'riyadh' && !riyadhEnabled) return false;
    if (selectedCity !== 'all' && !r.cities.includes(selectedCity)) return false;
    return true;
  });

  const cityTabs: {
    id: 'all' | 'jeddah' | 'makkah' | 'madinah' | 'taif' | 'riyadh';
    label: string;
    icon: React.ReactNode;
  }[] = [
    { id: 'all', label: t.tabAll, icon: <RouteIcon className="w-4 h-4" /> },
    { id: 'jeddah', label: t.tabJeddah, icon: <Plane className="w-4 h-4" /> },
    { id: 'makkah', label: t.tabMakkah, icon: <Building className="w-4 h-4" /> },
    { id: 'madinah', label: t.tabMadinah, icon: <Building className="w-4 h-4" /> },
  ];

  if (taifEnabled) {
    cityTabs.push({
      id: 'taif',
      label: t.tabTaif,
      icon: <Palmtree className="w-4 h-4" />,
    });
  }
  if (riyadhEnabled) {
    cityTabs.push({
      id: 'riyadh',
      label: t.tabRiyadh,
      icon: <Building className="w-4 h-4" />,
    });
  }

  const getRegionBadge = (region: 'western' | 'taif' | 'riyadh') => {
    if (region === 'western') return t.badgeWestern;
    if (region === 'taif') return t.badgeTaif;
    return t.badgeRiyadh;
  };

  return (
    <div className="w-full text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ========================================================================= */}
      {/* 1. HERO HEADER WITH ATMOSPHERIC SKYLINE & GOLD CALLIGRAPHY (Image 2)     */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#070B14] via-[#090E1A] to-[#0D1526] border border-[#C5A059]/30 p-6 sm:p-8 md:p-10 mb-8 sm:mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* Ambient Gold Radial Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Titles & City Filter Pills */}
          <div className="max-w-2xl">
            <h2 className="font-playfair font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight leading-tight mb-2">
              {t.heroTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
              {t.heroSubtitle}
            </p>

            {/* City Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {cityTabs.map((tab) => {
                const isActive = selectedCity === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCity(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 active:scale-95 ${
                      isActive
                        ? 'bg-[#151D2E] text-[#F4C84F] border border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.25)]'
                        : 'bg-[#0D1322]/80 text-slate-400 border border-white/10 hover:border-[#C5A059]/40 hover:text-white'
                    }`}
                  >
                    <span className={isActive ? 'text-[#F4C84F]' : 'text-slate-400'}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Signature Gold Script & Currency Controls */}
          <div className="flex flex-col lg:items-end justify-between gap-4">
            {/* Script Text: "Your Journey, Our Priority" */}
            <div className="hidden sm:block text-start lg:text-end">
              <span className="font-serif italic text-xl sm:text-2xl text-[#E5B23D] tracking-wide block drop-shadow-sm">
                &ldquo;{t.calligraphy}&rdquo;
              </span>
            </div>

            {/* Currency Switcher Buttons */}
            <div className="flex flex-col sm:flex-row items-start lg:items-end gap-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {t.currencyLabel}
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCurrency(c)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                      currency === c
                        ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-sm font-extrabold'
                        : 'bg-[#0D1322]/80 text-slate-400 border-white/10 hover:border-[#C5A059]/40 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN RATES TABLE CARD (Faithful to Image 2)                            */}
      {/* ========================================================================= */}
      <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#0A0E18] border border-[#C5A059]/40 shadow-[0_25px_60px_rgba(0,0,0,0.85),_0_0_30px_rgba(197,160,89,0.12)]">
        {/* --- DESKTOP & TABLET VIEW (TABLE) --- */}
        <div className="hidden md:block overflow-x-auto scrollbar-thin scrollbar-thumb-[#C5A059]/30">
          <table className="w-full text-start text-xs border-collapse min-w-[980px]">
            {/* TABLE HEADER WITH VEHICLE PHOTOGRAPHS (Image 2) */}
            <thead>
              <tr className="bg-[#0D1424] border-b border-[#C5A059]/25 text-white font-bold">
                {/* Column 1: Route / Journey */}
                <th className="py-6 px-6 text-start w-[280px]">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#E5B23D]">
                    <RouteIcon className="w-4 h-4 text-[#E5B23D]" />
                    <span>{t.colRoute}</span>
                  </div>
                </th>

                {/* Column 2: Toyota Camry */}
                <th className="py-5 px-3 text-center">
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-12 mb-1.5">
                      <Image
                        src="/assets/images/camry_studio.webp"
                        alt="Toyota Camry"
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                    <span className="text-xs font-bold text-white block">
                      {dict.page_pricing.colCamry}
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      (1-4 Pax)
                    </span>
                  </div>
                </th>

                {/* Column 3: Hyundai Staria (HIGHLIGHTED COLUMN in Image 2) */}
                <th className="py-5 px-3 text-center bg-[#151F33]/80 border-x border-[#C5A059]/30">
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-12 mb-1.5">
                      <Image
                        src="/assets/images/vehicles/hyundai-staria/exterior-studio.webp"
                        alt="Hyundai Staria"
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                    <span className="text-xs font-extrabold text-[#F4C84F] block">
                      {dict.page_pricing.colStaria}
                    </span>
                    <span className="text-[10px] text-[#F4C84F]/80 font-medium">
                      (1-7 Pax)
                    </span>
                  </div>
                </th>

                {/* Column 4: GMC Yukon XL */}
                <th className="py-5 px-3 text-center">
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-12 mb-1.5">
                      <Image
                        src="/assets/images/yukon_studio.webp"
                        alt="GMC Yukon XL"
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                    <span className="text-xs font-bold text-white block">
                      {dict.page_pricing.colYukon}
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      (VIP 1-7 Pax)
                    </span>
                  </div>
                </th>

                {/* Column 5: Toyota HiAce */}
                <th className="py-5 px-3 text-center">
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-12 mb-1.5">
                      <Image
                        src="/assets/images/hiace_studio.webp"
                        alt="Toyota HiAce"
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                    <span className="text-xs font-bold text-white block">
                      {dict.page_pricing.colHiace}
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      (1-10 Pax)
                    </span>
                  </div>
                </th>

                {/* Column 6: Toyota Coaster */}
                <th className="py-5 px-3 text-center">
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-12 mb-1.5">
                      <Image
                        src="/assets/images/coaster_studio.webp"
                        alt="Toyota Coaster"
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                    <span className="text-xs font-bold text-white block">
                      {dict.page_pricing.colCoaster}
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      (1-21 Pax)
                    </span>
                  </div>
                </th>

                {/* Column 7: Action */}
                <th className="py-5 px-5 text-center w-[120px]">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t.colAction}
                  </span>
                </th>
              </tr>
            </thead>

            {/* TABLE ROWS */}
            <tbody className="divide-y divide-[#C5A059]/15">
              {availableRoutes.map((row) => {
                const rates = initialRates?.[row.id];
                const localizedTitle =
                  LOCALIZED_ROUTE_NAMES[row.id]?.[locale] ||
                  LOCALIZED_ROUTE_NAMES[row.id]?.en ||
                  row.id;
                const citySubtitle =
                  CITY_SUBTITLES[row.id]?.[locale] ||
                  CITY_SUBTITLES[row.id]?.en ||
                  '';

                const camryFare = rates?.camry ?? row.defCamry;
                const stariaFare = rates?.staria ?? row.defStaria;
                const yukonFare = rates?.yukon ?? row.defYukon;
                const hiaceFare = rates?.hiace ?? row.defHiace;
                const coasterFare = rates?.coaster ?? row.defCoaster;

                return (
                  <tr
                    key={row.id}
                    className="hover:bg-[#121B2F]/60 transition-colors group"
                  >
                    {/* Route Details with Region Capsule & City Subtitle */}
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-2.5">
                        <span className="inline-block mt-0.5 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-[#C5A059]/40 text-[#D4AF37] bg-[#C5A059]/5 shrink-0 whitespace-nowrap">
                          {getRegionBadge(row.region)}
                        </span>
                        <div>
                          <span className="text-xs sm:text-sm font-semibold text-white block leading-snug group-hover:text-[#F4C84F] transition-colors">
                            {localizedTitle}
                          </span>
                          {citySubtitle && (
                            <span className="text-[10px] font-medium text-slate-400 block mt-0.5">
                              {citySubtitle}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Camry Price */}
                    <td className="py-4 px-3 text-center text-xs sm:text-sm font-bold text-slate-200">
                      {formatPrice(camryFare)}
                    </td>

                    {/* Staria Price (Highlighted Column) */}
                    <td className="py-4 px-3 text-center text-xs sm:text-sm font-black text-[#F4C84F] bg-[#151F33]/80 border-x border-[#C5A059]/30">
                      {formatPrice(stariaFare)}
                    </td>

                    {/* Yukon Price */}
                    <td className="py-4 px-3 text-center text-xs sm:text-sm font-bold text-slate-200">
                      {formatPrice(yukonFare)}
                    </td>

                    {/* HiAce Price */}
                    <td className="py-4 px-3 text-center text-xs sm:text-sm font-bold text-slate-200">
                      {formatPrice(hiaceFare)}
                    </td>

                    {/* Coaster Price */}
                    <td className="py-4 px-3 text-center text-xs sm:text-sm font-bold text-slate-200">
                      {formatPrice(coasterFare)}
                    </td>

                    {/* Book Now Button */}
                    <td className="py-4 px-5 text-center">
                      <Link
                        href={`/${locale}/booking?route=${row.id}`}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#d99f2b] via-[#e5b23d] to-[#f4c84f] hover:from-[#e5b23d] hover:to-[#d99f2b] text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_2px_8px_rgba(217,159,43,0.35)] hover:shadow-[0_4px_12px_rgba(217,159,43,0.5)] transition-all whitespace-nowrap active:scale-95"
                      >
                        <span>{t.bookNow}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* --- MOBILE RESPONSIVE VIEW (CARDS + QUICK VEHICLE SELECTOR) --- */}
        <div className="block md:hidden p-4 space-y-4">
          {/* Quick Vehicle Switcher for Mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'staria', name: 'Staria (7)', img: '/assets/images/vehicles/hyundai-staria/exterior-studio.webp' },
              { id: 'camry', name: 'Camry (4)', img: '/assets/images/camry_studio.webp' },
              { id: 'yukon', name: 'Yukon (VIP 7)', img: '/assets/images/yukon_studio.webp' },
              { id: 'hiace', name: 'HiAce (10)', img: '/assets/images/hiace_studio.webp' },
              { id: 'coaster', name: 'Coaster (21)', img: '/assets/images/coaster_studio.webp' },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveMobileVehicle(v.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                  activeMobileVehicle === v.id
                    ? 'bg-[#F4C84F] text-slate-950 shadow-sm font-extrabold'
                    : 'bg-[#131B2E] text-slate-300 border border-white/10'
                }`}
              >
                <span>{v.name}</span>
              </button>
            ))}
          </div>

          {/* Route Mobile Cards */}
          <div className="space-y-3">
            {availableRoutes.map((row) => {
              const rates = initialRates?.[row.id];
              const localizedTitle =
                LOCALIZED_ROUTE_NAMES[row.id]?.[locale] ||
                LOCALIZED_ROUTE_NAMES[row.id]?.en ||
                row.id;
              const citySubtitle =
                CITY_SUBTITLES[row.id]?.[locale] ||
                CITY_SUBTITLES[row.id]?.en ||
                '';

              const activePrice =
                activeMobileVehicle === 'staria'
                  ? (rates?.staria ?? row.defStaria)
                  : activeMobileVehicle === 'camry'
                  ? (rates?.camry ?? row.defCamry)
                  : activeMobileVehicle === 'yukon'
                  ? (rates?.yukon ?? row.defYukon)
                  : activeMobileVehicle === 'hiace'
                  ? (rates?.hiace ?? row.defHiace)
                  : (rates?.coaster ?? row.defCoaster);

              return (
                <div
                  key={row.id}
                  className="rounded-2xl p-4 bg-[#0F1626] border border-[#C5A059]/30 flex flex-col justify-between gap-3 shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-block text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-[#C5A059]/40 text-[#D4AF37] bg-[#C5A059]/5 mb-1.5">
                        {getRegionBadge(row.region)}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-snug">
                        {localizedTitle}
                      </h4>
                      {citySubtitle && (
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {citySubtitle}
                        </p>
                      )}
                    </div>

                    <div className="text-end shrink-0">
                      <span className="text-xs text-slate-400 block">
                        {activeMobileVehicle.toUpperCase()}
                      </span>
                      <span className="text-lg font-black text-[#F4C84F]">
                        {formatPrice(activePrice)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400">
                      {isAr ? 'شامل الرسوم وضريبة القيمة المضافة' : 'All tolls included'}
                    </span>
                    <Link
                      href={`/${locale}/booking?route=${row.id}`}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#d99f2b] to-[#f4c84f] text-slate-950 font-black text-xs uppercase flex items-center gap-1 active:scale-95 shadow-sm"
                    >
                      <span>{t.bookNow}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM TRUST BAR (Faithful to Image 2)                                 */}
        {/* ========================================================================= */}
        <div className="bg-[#080C16] border-t border-[#C5A059]/30 px-6 py-6 md:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Trust Item 1: Luxury Fleet */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#131B2E] border border-[#C5A059]/40 flex items-center justify-center shrink-0 shadow-xs">
                <Car className="w-5 h-5 text-[#E5B23D]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {t.trust1Title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {t.trust1Sub}
                </p>
              </div>
            </div>

            {/* Trust Item 2: Professional Drivers */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#131B2E] border border-[#C5A059]/40 flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#E5B23D]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {t.trust2Title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {t.trust2Sub}
                </p>
              </div>
            </div>

            {/* Trust Item 3: 24/7 Support */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#131B2E] border border-[#C5A059]/40 flex items-center justify-center shrink-0 shadow-xs">
                <Clock className="w-5 h-5 text-[#E5B23D]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {t.trust3Title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {t.trust3Sub}
                </p>
              </div>
            </div>

            {/* Trust Item 4: Safe & Reliable */}
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#131B2E] border border-[#C5A059]/40 flex items-center justify-center shrink-0 shadow-xs">
                <Shield className="w-5 h-5 text-[#E5B23D]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {t.trust4Title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {t.trust4Sub}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
