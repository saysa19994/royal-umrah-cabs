'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/get-dictionary';
import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCIES, CurrencyCode } from '@/i18n/config';
import {
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
    hi: 'जेद्दा • मदीنا',
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
    { id: 'all', label: t.tabAll, icon: <RouteIcon className="w-3.5 h-3.5" /> },
    { id: 'jeddah', label: t.tabJeddah, icon: <Plane className="w-3.5 h-3.5" /> },
    { id: 'makkah', label: t.tabMakkah, icon: <Building className="w-3.5 h-3.5" /> },
    { id: 'madinah', label: t.tabMadinah, icon: <Building className="w-3.5 h-3.5" /> },
  ];

  if (taifEnabled) {
    cityTabs.push({
      id: 'taif',
      label: t.tabTaif,
      icon: <Palmtree className="w-3.5 h-3.5" />,
    });
  }
  if (riyadhEnabled) {
    cityTabs.push({
      id: 'riyadh',
      label: t.tabRiyadh,
      icon: <Building className="w-3.5 h-3.5" />,
    });
  }

  const getRegionBadge = (region: 'western' | 'taif' | 'riyadh') => {
    if (region === 'western') return t.badgeWestern;
    if (region === 'taif') return t.badgeTaif;
    return t.badgeRiyadh;
  };

  const calligraphyLines = useMemo(() => {
    const text = t.calligraphy || '';
    if (text.includes('...')) {
      const parts = text.split('...');
      return [parts[0] + '...', parts[1]?.trim() || ''];
    }
    if (text.includes(',')) {
      const parts = text.split(',');
      return [parts[0].trim(), parts[1]?.trim() || ''];
    }
    if (text.includes('،')) {
      const parts = text.split('،');
      return [parts[0].trim(), parts[1]?.trim() || ''];
    }
    const words = text.split(' ');
    if (words.length >= 2) {
      const mid = Math.ceil(words.length / 2);
      return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
    }
    return [text, ''];
  }, [t.calligraphy]);

  return (
    <div className="w-full text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ========================================================================= */}
      {/* 1. SPECTACULAR HERO ARTWORK MATCHING IMAGE 2 EXACTLY                      */}
      {/* ========================================================================= */}
      <div className="relative rounded-[28px] overflow-hidden mb-6 lg:mb-8 border border-[#C5A059]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] bg-[#070B14]">
        {/* Real Illuminated Makkah Clock Tower Skyline Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/haram_hero.webp"
            alt="Makkah Holy Mosque and Clock Tower Skyline"
            fill
            className="object-cover object-[center_35%] opacity-40 brightness-75 scale-105"
            priority
          />
          {/* Deep Navy/Black Luxury Gradients to match Image 2 */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#060A14] via-[#070B16]/90 to-[#0A1020]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-transparent to-black/50" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 px-6 sm:px-8 md:px-10 py-8 md:py-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8">
          {/* Left Side: Headline, Subtitle & 6 Filter Tabs */}
          <div className="max-w-2xl">
            <h1 className="font-playfair font-serif text-3xl sm:text-4xl md:text-[44px] text-white font-normal tracking-tight leading-[1.15] mb-2 drop-shadow-md">
              {t.heroTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
              {t.heroSubtitle}
            </p>

            {/* City Filter Tabs (Image 2) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {cityTabs.map((tab) => {
                const isActive = selectedCity === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCity(tab.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-95 ${
                      isActive
                        ? 'bg-[#151D2E] text-[#F4C84F] border border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                        : 'bg-[#0B101E]/80 text-slate-300 border border-white/10 hover:border-[#C5A059]/40 hover:text-white'
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

          {/* Right Side: Gold Script Calligraphy & VIP Van with Golden Road (Image 2) */}
          <div className="flex flex-col items-start lg:items-end justify-between gap-1 shrink-0 relative">
            {/* Script Text in Gold: "Your Journey Our Priority" (Image 2 Top Right) */}
            <div className="text-start lg:text-end mb-1">
              <span className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#F4C84F] tracking-wide font-normal leading-[1.15] block drop-shadow-[0_2px_12px_rgba(244,200,79,0.35)]">
                <span className="block">{calligraphyLines[0]}</span>
                {calligraphyLines[1] && <span className="block">{calligraphyLines[1]}</span>}
              </span>
            </div>

            {/* VIP Chauffeur Van Visual & Glowing Sweeping Golden Road */}
            <div className="relative w-64 sm:w-72 md:w-84 h-24 sm:h-28 md:h-32 -mt-1">
              {/* Sweeping Golden Road Glow SVG underneath van matching Image 2 */}
              <svg
                className="absolute bottom-1 -left-12 w-[130%] h-12 pointer-events-none opacity-85"
                viewBox="0 0 320 60"
                fill="none"
              >
                <path
                  d="M0 46 C 90 42, 180 22, 320 26"
                  stroke="url(#goldRoadGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10 50 C 100 46, 190 26, 320 29"
                  stroke="#E5B23D"
                  strokeWidth="1.2"
                  strokeOpacity="0.4"
                />
                <defs>
                  <linearGradient id="goldRoadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C5A059" stopOpacity="0" />
                    <stop offset="35%" stopColor="#F4C84F" stopOpacity="0.75" />
                    <stop offset="75%" stopColor="#FFF2B2" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#C5A059" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
              <Image
                src="/assets/images/luxury_studio.webp"
                alt="VIP Chauffeur Fleet"
                fill
                className="object-contain object-right drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]"
                priority
              />
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                {t.currencyLabel}
              </span>
              <div className="flex items-center gap-1">
                {(['SAR', 'USD', 'EUR', 'GBP', 'AED'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-0.5 text-[11px] font-bold rounded border transition-all ${
                      currency === c
                        ? 'bg-[#C5A059] text-black border-[#C5A059] font-extrabold shadow-2xs'
                        : 'bg-[#0D1322]/80 text-slate-300 border-white/10 hover:border-[#C5A059]/40'
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
      {/* 2. THE MASTER TRANSFER RATES TABLE CARD (Image 2)                         */}
      {/* ========================================================================= */}
      <div className="relative rounded-[22px] overflow-hidden bg-[#0A0F1D] border border-[#C5A059]/40 shadow-[0_25px_60px_rgba(0,0,0,0.9),_0_0_25px_rgba(197,160,89,0.15)]">
        {/* --- DESKTOP & TABLET VIEW (FULL MASTER TABLE) --- */}
        <div className="hidden md:block overflow-x-auto scrollbar-thin scrollbar-thumb-[#C5A059]/30">
          <table className="w-full text-start text-xs border-collapse min-w-[1020px]">
            {/* TABLE HEADER WITH 5 VEHICLE CARDS (Image 2) */}
            <thead>
              <tr className="bg-[#0C1222] border-b border-[#C5A059]/25 text-white">
                {/* Column 1: Route / Journey */}
                <th className="py-6 px-6 text-start w-[290px] align-middle">
                  <div className="flex items-center gap-2.5 text-sm font-bold text-[#F4C84F]">
                    <div className="w-7 h-7 rounded-lg bg-[#141E33] border border-[#C5A059]/40 flex items-center justify-center shrink-0">
                      <RouteIcon className="w-4 h-4 text-[#F4C84F]" />
                    </div>
                    <span className="tracking-wide">{t.colRoute}</span>
                  </div>
                </th>

                {/* Column 2: Toyota Camry Card */}
                <th className="py-4 px-2.5 text-center w-[140px] align-bottom">
                  <div className="rounded-xl bg-[#0D1527] border border-white/10 p-2.5 flex flex-col items-center">
                    <div className="relative w-24 h-12 mb-1">
                      <Image
                        src="/assets/images/camry_studio.webp"
                        alt="Toyota Camry"
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                    <span className="text-xs font-bold text-white block leading-tight">
                      Toyota Camry
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      (1-4 Pax)
                    </span>
                  </div>
                </th>

                {/* Column 3: Hyundai Staria Card (HIGHLIGHTED WITH GOLD BORDER in Image 2) */}
                <th className="py-4 px-2.5 text-center w-[145px] align-bottom bg-[#121C30]/70 border-x border-[#C5A059]/30">
                  <div className="rounded-xl bg-[#142038] border-2 border-[#C5A059] p-2.5 flex flex-col items-center shadow-[0_0_15px_rgba(197,160,89,0.35)]">
                    <div className="relative w-24 h-12 mb-1">
                      <Image
                        src="/assets/images/vehicles/hyundai-staria/exterior-studio.webp"
                        alt="Hyundai Staria"
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                    <span className="text-xs font-extrabold text-[#F4C84F] block leading-tight">
                      Hyundai Staria
                    </span>
                    <span className="text-[10px] text-[#F4C84F]/80 font-medium">
                      (1-7 Pax)
                    </span>
                  </div>
                </th>

                {/* Column 4: GMC Yukon XL Card */}
                <th className="py-4 px-2.5 text-center w-[140px] align-bottom">
                  <div className="rounded-xl bg-[#0D1527] border border-white/10 p-2.5 flex flex-col items-center">
                    <div className="relative w-24 h-12 mb-1">
                      <Image
                        src="/assets/images/yukon_studio.webp"
                        alt="GMC Yukon XL"
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                    <span className="text-xs font-bold text-white block leading-tight">
                      GMC Yukon XL
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      (VIP 1-7 Pax)
                    </span>
                  </div>
                </th>

                {/* Column 5: Toyota HiAce Card */}
                <th className="py-4 px-2.5 text-center w-[140px] align-bottom">
                  <div className="rounded-xl bg-[#0D1527] border border-white/10 p-2.5 flex flex-col items-center">
                    <div className="relative w-24 h-12 mb-1">
                      <Image
                        src="/assets/images/hiace_studio.webp"
                        alt="Toyota HiAce"
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                    <span className="text-xs font-bold text-white block leading-tight">
                      Toyota HiAce
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      (1-10 Pax)
                    </span>
                  </div>
                </th>

                {/* Column 6: Toyota Coaster Card */}
                <th className="py-4 px-2.5 text-center w-[140px] align-bottom">
                  <div className="rounded-xl bg-[#0D1527] border border-white/10 p-2.5 flex flex-col items-center">
                    <div className="relative w-24 h-12 mb-1">
                      <Image
                        src="/assets/images/coaster_studio.webp"
                        alt="Toyota Coaster"
                        fill
                        className="object-contain"
                        sizes="100px"
                      />
                    </div>
                    <span className="text-xs font-bold text-white block leading-tight">
                      Toyota Coaster
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      (1-21 Pax)
                    </span>
                  </div>
                </th>

                {/* Column 7: Action */}
                <th className="py-4 px-5 text-center w-[125px] align-middle">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t.colAction}
                  </span>
                </th>
              </tr>
            </thead>

            {/* TABLE ROWS (Exact Match to Image 2) */}
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
                    {/* Route Details with Region Pill & City Subtitle */}
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-3">
                        <span className="inline-block mt-0.5 text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-[#C5A059]/40 text-[#D4AF37] bg-[#C5A059]/5 shrink-0 whitespace-nowrap">
                          {getRegionBadge(row.region)}
                        </span>
                        <div>
                          <span className="text-xs sm:text-sm font-semibold text-white block leading-snug group-hover:text-[#F4C84F] transition-colors">
                            {localizedTitle}
                          </span>
                          {citySubtitle && (
                            <span className="text-[11px] font-medium text-slate-400 block mt-0.5">
                              {citySubtitle}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Camry Price (White) */}
                    <td className="py-4 px-3 text-center text-xs sm:text-sm font-bold text-slate-200">
                      {formatPrice(camryFare)}
                    </td>

                    {/* Staria Price (RADIANT GOLD in Image 2) */}
                    <td className="py-4 px-3 text-center text-xs sm:text-sm font-black text-[#F4C84F] bg-[#121C30]/70 border-x border-[#C5A059]/30">
                      {formatPrice(stariaFare)}
                    </td>

                    {/* Yukon Price (White) */}
                    <td className="py-4 px-3 text-center text-xs sm:text-sm font-bold text-slate-200">
                      {formatPrice(yukonFare)}
                    </td>

                    {/* HiAce Price (White) */}
                    <td className="py-4 px-3 text-center text-xs sm:text-sm font-bold text-slate-200">
                      {formatPrice(hiaceFare)}
                    </td>

                    {/* Coaster Price (White) */}
                    <td className="py-4 px-3 text-center text-xs sm:text-sm font-bold text-slate-200">
                      {formatPrice(coasterFare)}
                    </td>

                    {/* Golden Book Now Button (Image 2) */}
                    <td className="py-4 px-5 text-center">
                      <Link
                        href={`/${locale}/booking?route=${row.id}`}
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#d99f2b] via-[#e5b23d] to-[#f4c84f] hover:from-[#e5b23d] hover:to-[#d99f2b] text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_2px_8px_rgba(217,159,43,0.35)] hover:shadow-[0_4px_12px_rgba(217,159,43,0.5)] transition-all whitespace-nowrap active:scale-95"
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
        {/* 3. BOTTOM TRUST BAR (Faithful to Image 2 with Islamic Skyline Silhouette) */}
        {/* ========================================================================= */}
        <div className="relative bg-[#080C16] border-t border-[#C5A059]/30 px-6 py-6 md:py-8 overflow-hidden">
          {/* Subtle Ambient Gold Glow & Mosque Silhouette on Right (Image 2) */}
          <div className="absolute bottom-0 right-0 w-80 h-full pointer-events-none opacity-20 bg-gradient-to-l from-[#C5A059]/30 via-transparent to-transparent" />

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
