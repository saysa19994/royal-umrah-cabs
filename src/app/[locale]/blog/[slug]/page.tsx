import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Locale, getLocalizedAlternates, LOCALES, LOCALE_CONFIG } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { BLOG_POSTS } from '@/data/blog-posts';
import { getBlogArticleContent } from '@/data/blog-content';
import { AUTHORITATIVE_TRANSFER_RATES } from '@/lib/pricing-constants';
import { getDbPricesCached } from '@/lib/pricing-db';
import {
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

interface BlogPostPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const post of BLOG_POSTS) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata(props: BlogPostPageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: 'Article Not Found' };
  }

  const title = post.seoTitle[locale] || post.seoTitle.en;
  const description = post.metaDescription[locale] || post.metaDescription.en;
  const alternates = getLocalizedAlternates(locale, `/blog/${slug}`);

  return {
    title: `${title} | Duyuf Alrahman VIP`,
    description,
    keywords: post.supportingKeywords[locale] || post.supportingKeywords.en,
    alternates,
    openGraph: {
      title,
      description,
      type: 'article',
      url: alternates.canonical,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ['Duyuf Alrahman VIP Editorial Team'],
      images: [
        {
          url: post.featuredImage,
          width: 1024,
          height: 571,
          alt: post.imageAlt[locale] || post.imageAlt.en,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.featuredImage],
    },
  };
}

function renderFormattedText(text: string, locale: Locale): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('[')) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const anchor = linkMatch[1];
        const rawHref = linkMatch[2];
        const slugMatch = rawHref.match(/(?:blog\/)([a-z0-9-]+)/);
        const slug = slugMatch ? slugMatch[1] : '';
        const href = slug ? `/${locale}/blog/${slug}` : rawHref;
        parts.push(
          <Link
            key={`link-${key++}`}
            href={href}
            className="inline-flex items-center gap-1 font-semibold text-gold-dark hover:text-gold underline underline-offset-4 decoration-gold/60 transition-colors mx-1"
          >
            <span>{anchor}</span>
            <ArrowRight className="w-3.5 h-3.5 inline-block rtl:rotate-180" />
          </Link>
        );
      }
    } else if (token.startsWith('**')) {
      const boldText = token.slice(2, -2);
      parts.push(
        <strong key={`bold-${key++}`} className="font-semibold text-ink">
          {boldText}
        </strong>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function renderParagraphsOrTable(paragraphs: string[], locale: Locale): React.ReactNode {
  const elements: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  let elementIndex = 0;

  const flushTable = () => {
    if (tableBuffer.length === 0) return;
    const rows = tableBuffer.map((line) =>
      line
        .split('|')
        .map((cell) => cell.trim())
        .filter((cell, i, arr) => i > 0 && i < arr.length - 1)
    );
    tableBuffer = [];

    if (rows.length >= 2) {
      const headerRow = rows[0];
      const dataRows = rows.slice(1).filter((r) => !r.some((c) => c.includes('---')));

      elements.push(
        <div
          key={`table-${elementIndex++}`}
          className="overflow-x-auto my-6 rounded-2xl border border-border bg-bg/50 shadow-xs"
        >
          <table className="w-full text-sm text-start border-collapse">
            <thead className="bg-surface border-b border-border">
              <tr>
                {headerRow.map((cell, cIdx) => (
                  <th
                    key={cIdx}
                    className="p-3.5 text-xs md:text-sm font-bold text-ink whitespace-nowrap text-start bg-gold-soft/30"
                  >
                    {renderFormattedText(cell, locale)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {dataRows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className={
                    rIdx % 2 === 0
                      ? 'bg-surface/60 hover:bg-gold-soft/20 transition-colors'
                      : 'bg-surface hover:bg-gold-soft/20 transition-colors'
                  }
                >
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className="p-3.5 text-xs md:text-sm text-ink-muted leading-relaxed align-top text-start"
                    >
                      {renderFormattedText(cell, locale)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  for (let i = 0; i < paragraphs.length; i++) {
    const p = paragraphs[i];
    if (p.trim().startsWith('|')) {
      tableBuffer.push(p);
    } else {
      flushTable();
      elements.push(
        <p key={`p-${elementIndex++}`} className="text-ink-muted text-base leading-relaxed font-light mb-4 last:mb-0">
          {renderFormattedText(p, locale)}
        </p>
      );
    }
  }
  flushTable();

  return elements;
}

export default async function BlogPostDetailPage(props: BlogPostPageProps) {
  const params = await props.params;
  const { locale, slug } = params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  const dict = getDictionary(locale);
  const localeMeta = LOCALE_CONFIG[locale] || LOCALE_CONFIG.en;
  const isRtl = localeMeta.dir === 'rtl';

  const dbRates = await getDbPricesCached();
  const isMadinahRoute = slug.includes('makkah-to-madinah');
  const isMakkahToJeddah = slug.includes('makkah-to-jeddah');
  const isVipGuide = slug.includes('vip-car-with-driver');
  const isCapacityGuide = slug.includes('vehicle-capacity');
  const isPlanningGuide = slug.includes('transport-planning');
  const isAirportPickup = slug.includes('airport-pickup');
  const isHourlyGuide = slug.includes('hourly-vs-point-to-point');
  const isChecklistGuide = slug.includes('umrah-car-booking-checklist');
  const routeKey = isMadinahRoute
    ? 'makkah-to-madinah'
    : isMakkahToJeddah
    ? 'makkah-to-jeddah-airport'
    : isVipGuide
    ? 'vip-car-with-driver-saudi-arabia'
    : isCapacityGuide
    ? 'vehicle-capacity-passengers-luggage'
    : isPlanningGuide
    ? 'transport-planning-makkah-madinah-jeddah'
    : isAirportPickup
    ? 'jeddah-airport-pickup-umrah'
    : isHourlyGuide
    ? 'hourly-vs-point-to-point-car-booking'
    : isChecklistGuide
    ? 'umrah-car-booking-checklist'
    : 'jeddah-airport-to-makkah';
  const effectivePricingKey = (isVipGuide || isCapacityGuide || isPlanningGuide || isAirportPickup || isHourlyGuide || isChecklistGuide) ? 'jeddah-airport-to-makkah' : routeKey;
  const routePrices = dbRates[effectivePricingKey] || AUTHORITATIVE_TRANSFER_RATES[effectivePricingKey];
  const bookingHref = (isVipGuide || isCapacityGuide || isPlanningGuide || isHourlyGuide || isChecklistGuide) ? `/${locale}/booking` : isAirportPickup ? `/${locale}/booking?route=jeddah-airport-to-makkah` : `/${locale}/booking?route=${routeKey}`;

  const pricingCardContent: Record<
    string,
    {
      badge: Record<Locale, string>;
      title: Record<Locale, string>;
      desc: Record<Locale, string>;
      btn: Record<Locale, string>;
    }
  > = {
    'umrah-car-booking-checklist': {
      badge: {
        ar: 'الأسعار الرسمية المعتمدة لسيارات العمرة الشاملة',
        en: 'Official Guaranteed All-Inclusive Umrah Rates',
        ms: 'Kadar Rasmi Dijamin Termasuk Semua untuk Umrah',
        id: 'Tarif Resmi Dijamin Semua Termasuk untuk Umrah',
        ur: 'عمرہ ٹرانسپورٹ کے سرکاری حتمی کرایے',
        fr: 'Tarifs Officiels Garantis Tout Compris pour la Omra',
        es: 'Tarifas Oficiales Garantizadas Todo Incluido para la Umrah',
        de: 'Offizielle garantierte All-Inclusive-Tarife für die Umrah',
        hi: 'उमराह के लिए आधिकारिक गारंटीकृत ऑल-इनक्लूसिव दरें',
        tr: 'Umre İçin Resmi Garantili Her Şey Dahil Fiyatlar',
      },
      title: {
        ar: 'أسعار سيارات نقل المعتمرين: أسعار ثابتة بدون دفع مسبق',
        en: 'Umrah Transportation Vehicle Rates: Fixed Fares & Zero Prepayment',
        ms: 'Kadar Kenderaan Pengangkutan Umrah: Tambang Tetap & Tanpa Bayaran Awal',
        id: 'Tarif Kendaraan Transportasi Umrah: Harga Tetap & Tanpa Uang Muka',
        ur: 'عمرہ گاڑیوں کے کرایے: فکس ریٹ اور بغیر ایڈوانس ادائیگی',
        fr: 'Tarifs Véhicules Omra : Prix Fixes & Zéro Prépaiement',
        es: 'Tarifas de Vehículos para la Umrah: Precios Fijos y Cero Anticipo',
        de: 'Fahrzeugtarife für die Umrah: Feste Endpreise & Null Vorauszahlung',
        hi: 'उमराह वाहन दरें: निश्चित किराया और शून्य अग्रिम भुगतान',
        tr: 'Umre Araç Fiyatları: Sabit Fiyatlar ve Sıfır Ön Ödeme',
      },
      desc: {
        ar: 'السعر ثابت للمركبة بالكامل شامل السائق الخاص والوقود ورسوم الطرق والضرائب. لا دفع مسبق - الدفع للسائق عند الوصول بأمان.',
        en: 'Fixed rate per entire vehicle including private chauffeur, fuel, road tolls, and taxes. Zero prepayment — pay driver only upon safe arrival.',
        ms: 'Harga tetap bagi sebuah kenderaan termasuk pemandu peribadi, minyak, tol, dan cukai. Tiada bayaran pendahuluan — bayar pemandu semasa tiba.',
        id: 'Harga tetap per kendaraan termasuk sopir pribadi, bensin, tol, dan pajak. Tanpa uang muka — bayar sopir setelah tiba dengan selamat.',
        ur: 'گاڑی کا حتمی طے شدہ کرایہ، بمعہ نجی ڈرائیور، ایندھن، ٹول اور ٹیکس۔ کوئی ایڈوانس نہیں — صرف بخیر و عافیت پہنچنے پر ڈرائیور کو ادائیگی۔',
        fr: 'Tarif fixe par véhicule complet incluant chauffeur privé, carburant, péages et taxes. Aucun prépaiement — règlement au chauffeur à l’arrivée en sécurité.',
        es: 'Precio fijo por vehículo completo que incluye chofer privado, combustible, peajes e impuestos. Cero pago por adelantado: pague al chofer al llegar seguro.',
        de: 'Festpreis pro Fahrzeug inklusive privatem Chauffeur, Kraftstoff, Maut und Steuern. Keine Vorauszahlung — Zahlung erst nach sicherer Ankunft beim Fahrer.',
        hi: 'निजी ड्राइवर, ईंधन, टोल और करों सहित पूरे वाहन के लिए निश्चित दर। कोई अग्रिम भुगतान नहीं — सुरक्षित पहुँचने पर ही ड्राइवर को भुगतान।',
        tr: 'Özel şoför, yakıt, otoyol geçişleri ve vergiler dahil sabit fiyat. Ön ödeme yok — otele güvenle ulaştıktan sonra şoföre ödeme.',
      },
      btn: {
        ar: 'احجز سيارة العمرة الآن مع الدفع عند الوصول',
        en: 'Book Your Umrah Car Now with Pay on Arrival',
        ms: 'Tempah Kereta Umrah Sekarang dengan Bayaran Semasa Tiba',
        id: 'Pesan Mobil Umrah Sekarang dengan Bayar Saat Tiba',
        ur: 'منزل پر ادائیگی کے ساتھ عمرہ گاڑی ابھی بک کریں',
        fr: 'Réserver Votre Voiture Omra avec Paiement à l’Arrivée',
        es: 'Reserve su Coche para la Umrah con Pago a la Llegada',
        de: 'Umrah-Fahrzeug jetzt mit Bezahlung bei Ankunft buchen',
        hi: 'पहुँचने पर भुगतान के साथ अभी उमराह कार बुक करें',
        tr: 'Varışta Ödeme Güvencesiyle Umre Aracınızı Şimdi Ayırtın',
      },
    },
    'hourly-vs-point-to-point-car-booking': {
      badge: {
        ar: 'الأسعار الرسمية المعتمدة للرحلات المباشرة وباقات الساعات',
        en: 'Official Guaranteed Rates for Transfers & Hourly Chauffeur',
        ms: 'Kadar Rasmi Dijamin untuk Pemindahan & Pakej Jam',
        id: 'Tarif Resmi Dijamin Rute Langsung & Sewa Per Jam',
        ur: 'سنگل ٹرپ اور گھنٹوں کے پیکیجز کے سرکاری کرایے',
        fr: 'Tarifs Officiels Garantis Transferts & Forfaits Horaires',
        es: 'Tarifas Oficiales Garantizadas Traslados y Paquetes por Horas',
        de: 'Garantierte Tarife für Transfers & Stundenpakete',
        hi: 'सिंगल ट्रांसफर और घंटे के पैकेज के लिए आधिकारिक दरें',
        tr: 'Doğrudan Transfer ve Saatlik Paketler Resmi Sabit Fiyatları',
      },
      title: {
        ar: 'أسعار سيارات VIP: خيارات الرحلة الواحدة وباقات الساعات',
        en: 'VIP Vehicle Rates: Point-to-Point & Hourly Chauffeur Options',
        ms: 'Kadar Kenderaan VIP: Pilihan Pemindahan & Pakej Jam',
        id: 'Tarif Kendaraan VIP: Pilihan Rute Langsung & Sewa Per Jam',
        ur: 'وی آئی پی گاڑیوں کے کرایے: سنگل ٹرپ اور آورلی پیکیجز',
        fr: 'Tarifs Véhicules VIP : Formules Transferts & Chauffeur à l’Heure',
        es: 'Tarifas Vehículos VIP: Traslados y Opciones por Horas con Chófer',
        de: 'VIP-Fahrzeugpreise: Transfer- und Stundenoptionen',
        hi: 'वीआईपी वाहन दरें: सिंगल ट्रांसफर और प्रति घंटे विकल्प',
        tr: 'VIP Araç Fiyatları: Tek Yön Transfer ve Saatlik Seçenekler',
      },
      desc: {
        ar: 'السعر ثابت للمركبة بالكامل شامل السائق الخاص والوقود ورسوم الطرق والضرائب. لا دفع مسبق - الدفع للسائق عند الوصول',
        en: 'Fixed rate per entire vehicle including private chauffeur, fuel, road tolls, and taxes. Zero prepayment — pay driver upon arrival.',
        ms: 'Harga tetap bagi sebuah kenderaan termasuk pemandu peribadi, minyak, tol, dan cukai. Tiada bayaran pendahuluan — bayar pemandu semasa tiba.',
        id: 'Harga tetap per kendaraan termasuk sopir pribadi, bensin, tol, dan pajak. Tanpa uang muka — bayar sopir saat tiba.',
        ur: 'گاڑی کا حتمی طے شدہ کرایہ، بمعہ ڈرائیور، ایندھن، ٹول اور ٹیکس۔ کوئی ایڈوانس نہیں — ادائیگی منزل پر ڈرائیور کو۔',
        fr: 'Tarif fixe par véhicule complet incluant chauffeur privé, carburant, péages et taxes. Aucun prépaiement — règlement au chauffeur à l’arrivée.',
        es: 'Precio fijo por vehículo completo que incluye chofer privado, combustible, peajes e impuestos. Sin pago por adelantado: pague al chofer al llegar.',
        de: 'Festpreis pro Fahrzeug inklusive privatem Chauffeur, Kraftstoff, Maut und Steuern. Keine Vorauszahlung — Bezahlung beim Fahrer bei Ankunft.',
        hi: 'निजी ड्राइवर, ईंधन, टोल और करों सहित पूरे वाहन के लिए निश्चित दर। कोई अग्रिम भुगतान नहीं — आगमन पर ड्राइवर को भुगतान करें।',
        tr: 'Özel şoför, yakıt, otoyol geçişleri ve vergiler dahil sabit fiyat. Ön ödeme yok — varışta şoföre ödeme.',
      },
      btn: {
        ar: 'اختر سيارتك ونوع الحجز الآن',
        en: 'Choose Your Vehicle & Booking Type Now',
        ms: 'Pilih Kenderaan & Jenis Tempahan Sekarang',
        id: 'Pilih Mobil & Jenis Pemesanan Sekarang',
        ur: 'گاڑی اور بکنگ کی قسم منتخب کریں',
        fr: 'Choisir le Véhicule et le Type de Réservation',
        es: 'Elegir Vehículo y Tipo de Reserva Ahora',
        de: 'Fahrzeug und Buchungsart jetzt wählen',
        hi: 'वाहन और बुकिंग का प्रकार अभी चुनें',
        tr: 'Aracınızı ve Rezervasyon Türünü Şimdi Seçin',
      },
    },
    'jeddah-airport-pickup-umrah': {
      badge: {
        ar: 'الأسعار الرسمية المعتمدة لاستقبال مطار جدة للمعتمرين',
        en: 'Official Guaranteed Rates for Jeddah Airport Umrah Pickup',
        ms: 'Kadar Rasmi Dijamin untuk Sambutan Lapangan Terbang Jeddah Umrah',
        id: 'Tarif Resmi Dijamin Penjemputan Bandara Jeddah untuk Umrah',
        ur: 'جدہ ایئرپورٹ پر معتمرین کے استقبال کے سرکاری کرایے',
        fr: 'Tarifs Officiels Garantis Accueil Aéroport Djeddah Omra',
        es: 'Tarifas Oficiales Garantizadas Recepción Aeropuerto de Yeda Umrah',
        de: 'Garantierte Tarife für Abholung am Flughafen Dschidda für Umrah',
        hi: 'जेद्दा हवाई अड्डा उमरा पिकअप के लिए आधिकारिक निश्चित दरें',
        tr: 'Cidde Havalimanı Umre Karşılama Resmi Sabit Fiyatları',
      },
      title: {
        ar: 'أسعار سيارات الاستقبال الخاص من مطار جدة إلى فنادق مكة',
        en: 'VIP Pickup Vehicle Rates: Jeddah Airport to Makkah Hotels',
        ms: 'Kadar Kenderaan VIP Sambutan: Lapangan Terbang Jeddah ke Hotel Makkah',
        id: 'Tarif Kendaraan VIP Penjemputan: Bandara Jeddah ke Hotel Makkah',
        ur: 'جدہ ایئرپورٹ سے مکہ مکرمہ ہوٹلز تک وی آئی پی استقبالیہ گاڑیوں کے کرایے',
        fr: 'Tarifs Véhicules VIP d’Accueil : Aéroport de Djeddah vers Hôtels de La Mecque',
        es: 'Tarifas Vehículos VIP de Recepción: Aeropuerto de Yeda a Hoteles de La Meca',
        de: 'VIP-Abholfahrzeugpreise: Flughafen Dschidda zu Mekka-Hotels',
        hi: 'वीआईपी पिकअप वाहन दरें: जेद्दा हवाई अड्डा से मक्का होटल',
        tr: 'VIP Karşılama Araç Fiyatları: Cidde Havalimanı - Mekke Otelleri',
      },
      desc: {
        ar: 'السعر ثابت للمركبة بالكامل شامل تتبع الرحلة، الاستقبال والانتظار، السائق الخاص، الوقود ورسوم الطرق. لا دفع مسبق - الدفع للسائق عند الوصول',
        en: 'Fixed rate per entire vehicle including flight tracking, meet & greet, waiting time, private chauffeur, fuel, and tolls. Zero prepayment — pay driver upon arrival.',
        ms: 'Harga tetap satu kenderaan termasuk penjejakan penerbangan, sambutan, masa menunggu, pemandu peribadi, minyak, dan tol. Tiada bayaran pendahuluan — bayar pemandu semasa tiba.',
        id: 'Harga tetap per kendaraan termasuk pelacakan penerbangan, penjemputan, waktu tunggu, sopir pribadi, bensin, dan tol. Tanpa uang muka — bayar sopir saat tiba.',
        ur: 'گاڑی کا حتمی طے شدہ کرایہ بمعہ فلائٹ ٹریکنگ، استقبالیہ انتظار، نجی ڈرائیور، ایندھن اور ٹول۔ کوئی ایڈوانس نہیں — ادائیگی منزل پر ڈرائیور کو۔',
        fr: 'Tarif fixe par véhicule incluant suivi de vol, accueil, temps d’attente, chauffeur privé, carburant et péages. Aucun prépaiement — règlement au chauffeur à l’arrivée.',
        es: 'Precio fijo por vehículo completo que incluye seguimiento de vuelo, bienvenida, tiempo de espera, chofer privado, combustible y peajes. Sin pago por adelantado: pague al chofer al llegar.',
        de: 'Festpreis pro Fahrzeug inklusive Flugverfolgung, Empfang, Wartezeit, privatem Chauffeur, Kraftstoff und Maut. Keine Vorauszahlung — Bezahlung beim Fahrer bei Ankunft.',
        hi: 'फ्लाइट ट्रैकिंग, स्वागत, प्रतीक्षा समय, निजी ड्राइवर, ईंधन और टोल सहित निश्चित दर। कोई अग्रिम भुगतान नहीं — आगमन पर ड्राइवर को भुगतान करें।',
        tr: 'Uçuş takibi, karşılama, bekleme süresi, özel şoför, yakıt ve otoyol ücretleri dahil sabit fiyat. Ön ödeme yok — varışta şoföre ödeme.',
      },
      btn: {
        ar: 'احجز استقبال مطار جدة إلى مكة الآن',
        en: 'Book Jeddah Airport to Makkah Pickup Now',
        ms: 'Tempah Sambutan Lapangan Terbang Jeddah ke Makkah Sekarang',
        id: 'Pesan Penjemputan Bandara Jeddah ke Makkah Sekarang',
        ur: 'جدہ ایئرپورٹ سے مکہ استقبالیہ گاڑی ابھی بک کریں',
        fr: 'Réserver Votre Accueil Aéroport Djeddah vers La Mecque',
        es: 'Reservar Recepción de Yeda a La Meca Ahora',
        de: 'Jetzt Abholung am Flughafen Dschidda nach Mekka buchen',
        hi: 'जेद्दा हवाई अड्डा से मक्का पिकअप अभी बुक करें',
        tr: 'Cidde Havalimanı - Mekke Karşılama Rezervasyonu Yap',
      },
    },
    'transport-planning-makkah-madinah-jeddah': {
      badge: {
        ar: 'الأسعار الرسمية المعتمدة لرحلات مكة والمدينة وجدة',
        en: 'Guaranteed Official Intercity & Airport Rates',
        ms: 'Kadar Rasmi Dijamin Antara Makkah, Madinah & Jeddah',
        id: 'Tarif Resmi Dijamin Makkah, Madinah & Jeddah',
        ur: 'مکہ، مدینہ اور جدہ کے لیے سرکاری فکس کرایے',
        fr: 'Tarifs Officiels Garantis La Mecque, Médine et Djeddah',
        es: 'Tarifas Oficiales Garantizadas La Meca, Medina y Yeda',
        de: 'Garantierte Tarife für Mekka, Medina und Dschidda',
        hi: 'मक्का, मदीना और जेद्दा के लिए आधिकारिक निर्धारित दरें',
        tr: 'Mekke, Medine ve Cidde İçin Resmi Sabit Fiyatlar',
      },
      title: {
        ar: 'أسعار التنقل الخاص بين مكة المكرمة والمدينة المنورة وجدة',
        en: 'Private Transfer Rates: Makkah, Madinah & Jeddah Intercity Travel',
        ms: 'Kadar Pengangkutan Peribadi: Makkah, Madinah & Perjalanan Jeddah',
        id: 'Tarif Transportasi Privat: Perjalanan Makkah, Madinah & Jeddah',
        ur: 'مکہ مکرمہ، مدینہ منورہ اور جدہ کے مابین نجی ٹرانسپورٹ کے کرایے',
        fr: 'Tarifs des Transferts Privés : La Mecque, Médine et Djeddah',
        es: 'Tarifas de Traslado Privado: La Meca, Medina y Viajes en Yeda',
        de: 'Tarife für Privattransfers: Mekka, Medina und Dschidda',
        hi: 'निजी ट्रांसफर दरें: मक्का, मदीना और जेद्दा यात्रा',
        tr: 'Özel Transfer Fiyatları: Mekke, Medine ve Cidde Şehirlerarası Seyahat',
      },
      desc: {
        ar: 'السعر ثابت للمركبة بالكامل شامل السائق الخاص والوقود ورسوم الطرق السريعة والضرائب. لا دفع مسبق - الدفع للسائق عند الوصول',
        en: 'Fixed rate per entire vehicle including private chauffeur, fuel, expressway tolls, and taxes. Zero prepayment — pay driver upon arrival.',
        ms: 'Harga tetap bagi sebuah kenderaan termasuk pemandu peribadi, minyak, tol, dan cukai. Tiada bayaran pendahuluan — bayar pemandu semasa tiba.',
        id: 'Harga tetap per kendaraan termasuk sopir pribadi, bensin, tol, dan pajak. Tanpa uang muka — bayar sopir saat tiba.',
        ur: 'گاڑی کا حتمی طے شدہ کرایہ، بمعہ ڈرائیور، ایندھن، ٹول اور ٹیکس۔ کوئی ایڈوانس نہیں — ادائیگی منزل پر ڈرائیور کو۔',
        fr: 'Tarif fixe par véhicule complet incluant chauffeur privé, carburant, péages et taxes. Aucun prépaiement — règlement au chauffeur à l\'arrivée.',
        es: 'Precio fijo por vehículo completo que incluye chofer privado, combustible, peajes e impuestos. Sin pago por adelantado: pague al chofer al llegar.',
        de: 'Festpreis pro Fahrzeug inklusive privatem Chauffeur, Kraftstoff, Maut und Steuern. Keine Vorauszahlung — Bezahlung beim Fahrer bei Ankunft.',
        hi: 'निजी ड्राइवर, ईंधन, टोल और करों सहित पूरे वाहन के लिए निश्चित दर। कोई अग्रिम भुगतान नहीं — आगमन पर ड्राइवर को भुगतान करें।',
        tr: 'Özel şoför, yakıt, otoyol geçişleri ve vergiler dahil sabit fiyat. Ön ödeme yok — varışta şoföre ödeme.',
      },
      btn: {
        ar: 'خطط لرحلتك واحجز سيارتك الآن',
        en: 'Plan Your Route & Book Vehicle Now',
        ms: 'Rancang Perjalanan & Tempah Kenderaan Sekarang',
        id: 'Rencanakan Rute & Pesan Mobil Sekarang',
        ur: 'اپنے سفر کی منصوبہ بندی کریں اور گاڑی بک کریں',
        fr: 'Planifier Votre Trajet et Réserver',
        es: 'Planifique su Ruta y Reserve Ahora',
        de: 'Route planen und Fahrzeug jetzt buchen',
        hi: 'अपना रूट प्लान करें और अभी वाहन बुक करें',
        tr: 'Rotanızı Planlayın ve Şimdi Araç Ayırtın',
      },
    },
    'vehicle-capacity-passengers-luggage': {
      badge: {
        ar: 'الأسعار الرسمية المعتمدة لأسطول النقل الخاص',
        en: 'Official Guaranteed Fleet Rates',
        ms: 'Kadar Rasmi Dijamin Mengikut Kapasiti Armada',
        id: 'Tarif Resmi Dijamin Berdasarkan Kapasitas Armada',
        ur: 'گاڑیوں کی گنجائش کے مطابق سرکاری فکس ریٹس',
        fr: 'Tarifs Officiels Garantis Selon la Capacité de la Flotte',
        es: 'Tarifas Oficiales Garantizadas Según Capacidad de la Flota',
        de: 'Garantierte Flottentarife nach Passagier- und Gepäckkapazität',
        hi: 'यात्री एवं सामान क्षमता के अनुसार आधिकारिक दरें',
        tr: 'Yolcu ve Bagaj Kapasitesine Göre Resmi Sabit Fiyatlar',
      },
      title: {
        ar: 'أسعار فئات المركبات حسب سعة الركاب والحقائب',
        en: 'Vehicle Category Rates by Passenger & Luggage Capacity',
        ms: 'Kadar Kategori Kenderaan Mengikut Kapasiti Penumpang & Bagasi',
        id: 'Tarif Kategori Kendaraan Menurut Kapasitas Penumpang & Koper',
        ur: 'مسافروں اور سامان کی گنجائش کے مطابق گاڑیوں کے کرایے',
        fr: 'Tarifs des Catégories de Véhicules Selon Passagers et Bagages',
        es: 'Tarifas de Vehículos Según Capacidad de Pasajeros y Maletas',
        de: 'Fahrzeugtarife nach Personen- und Gepäckkapazität',
        hi: 'यात्री और सामान क्षमता के अनुसार वाहन श्रेणियों की दरें',
        tr: 'Yolcu ve Bagaj Kapasitesine Göre Araç Sınıfı Fiyatları',
      },
      desc: {
        ar: 'السعر ثابت للمركبة بالكامل شامل السائق الخاص والوقود ورسوم الطرق والضرائب. لا دفع مسبق - الدفع للسائق عند الوصول',
        en: 'Fixed rate per entire vehicle including private chauffeur, fuel, road tolls, and taxes. Zero prepayment — pay driver upon arrival.',
        ms: 'Harga tetap bagi sebuah kenderaan termasuk pemandu peribadi, minyak, tol, dan cukai. Tiada bayaran pendahuluan — bayar pemandu semasa tiba.',
        id: 'Harga tetap per kendaraan termasuk sopir pribadi, bensin, tol, dan pajak. Tanpa uang muka — bayar sopir saat tiba.',
        ur: 'گاڑی کا حتمی طے شدہ کرایہ، بمعہ ڈرائیور، ایندھن، ٹول اور ٹیکس۔ کوئی ایڈوانس نہیں — ادائیگی منزل پر ڈرائیور کو۔',
        fr: 'Tarif fixe par véhicule complet incluant chauffeur privé, carburant, péages et taxes. Aucun prépaiement — règlement au chauffeur à l\'arrivée.',
        es: 'Precio fijo por vehículo completo que incluye chofer privado, combustible, peajes e impuestos. Sin pago por adelantado: pague al chofer al llegar.',
        de: 'Festpreis pro Fahrzeug inklusive privatem Chauffeur, Kraftstoff, Maut und Steuern. Keine Vorauszahlung — Bezahlung beim Fahrer bei Ankunft.',
        hi: 'निजी ड्राइवर, ईंधन, टोल और करों सहित पूरे वाहन के लिए निश्चित दर। कोई अग्रिम भुगतान नहीं — आगमन पर ड्राइवर को भुगतान करें।',
        tr: 'Özel şoför, yakıt, otoyol geçişleri ve vergiler dahil sabit fiyat. Ön ödeme yok — varışta şoföre ödeme.',
      },
      btn: {
        ar: 'اختر المركبة واحجز الآن',
        en: 'Choose Vehicle & Book Now',
        ms: 'Pilih Kenderaan & Tempah Sekarang',
        id: 'Pilih Mobil & Pesan Sekarang',
        ur: 'گاڑی منتخب کریں اور ابھی بک کریں',
        fr: 'Choisir le Véhicule et Réserver',
        es: 'Elegir Vehículo y Reservar Ahora',
        de: 'Fahrzeug wählen und jetzt buchen',
        hi: 'वाहन चुनें और अभी बुक करें',
        tr: 'Aracınızı Seçin ve Şimdi Ayırtın',
      },
    },
    'vip-car-with-driver-saudi-arabia': {
      badge: {
        ar: 'الأسعار الرسمية المعتمدة لسيارات VIP في السعودية',
        en: 'Guaranteed VIP Chauffeur Rates in Saudi Arabia',
        ms: 'Kadar Rasmi Dijamin untuk Kenderaan VIP di Arab Saudi',
        id: 'Tarif Resmi Dijamin Layanan Mobil VIP di Arab Saudi',
        ur: 'سعودی عرب میں وی آئی پی گاڑیوں کے سرکاری کرایے',
        fr: 'Tarifs Officiels Garantis Voitures VIP en Arabie Saoudite',
        es: 'Tarifas Oficiales Garantizadas de Vehículos VIP en Arabia Saudita',
        de: 'Garantierte VIP-Chauffeurpreise in Saudi-Arabien',
        hi: 'सऊदी अरब में आधिकारिक वीआईपी वाहन दरें',
        tr: 'Suudi Arabistan VIP Şoförlü Araç Resmi Sabit Fiyatları',
      },
      title: {
        ar: 'أسعار خدمات سيارات VIP مع سائق في السعودية (جدة - مكة - المدينة)',
        en: 'VIP Chauffeur Service Rates in Saudi Arabia (Jeddah, Makkah, Madinah)',
        ms: 'Kadar Khidmat Pemandu VIP di Arab Saudi (Jeddah, Makkah, Madinah)',
        id: 'Tarif Layanan Sopir VIP di Arab Saudi (Jeddah, Makkah, Madinah)',
        ur: 'سعودی عرب میں نجی ڈرائیور کے ساتھ وی آئی پی گاڑیوں کے ریٹس',
        fr: 'Tarifs Service Chauffeur VIP en Arabie Saoudite (Djeddah, La Mecque, Médine)',
        es: 'Tarifas de Servicio de Chófer VIP en Arabia Saudita (Yeda, La Meca, Medina)',
        de: 'VIP-Chauffeurdienst-Tarife in Saudi-Arabien (Dschidda, Mekka, Medina)',
        hi: 'सऊदी अरब में वीआईपी चौफ़र सेवा दरें (जेद्दा, मक्का, मदीना)',
        tr: 'Suudi Arabistan VIP Özel Şoförlü Hizmet Fiyatları (Cidde, Mekke, Medine)',
      },
      desc: {
        ar: 'السعر ثابت للمركبة بالكامل شامل السائق الخاص والوقود ورسوم الطرق والضرائب. لا دفع مسبق - الدفع للسائق عند الوصول',
        en: 'Fixed rate per entire vehicle including private chauffeur, fuel, road tolls, and taxes. Zero prepayment — pay driver upon arrival.',
        ms: 'Harga tetap bagi sebuah kenderaan termasuk pemandu peribadi, minyak, tol, dan cukai. Tiada bayaran pendahuluan — bayar pemandu semasa tiba.',
        id: 'Harga tetap per kendaraan termasuk sopir pribadi, bensin, tol, dan pajak. Tanpa uang muka — bayar sopir saat tiba.',
        ur: 'گاڑی کا حتمی طے شدہ کرایہ، بمعہ ڈرائیور، ایندھن، ٹول اور ٹیکس۔ کوئی ایڈوانس نہیں — ادائیگی منزل پر ڈرائیور کو۔',
        fr: 'Tarif fixe par véhicule complet incluant chauffeur privé, carburant, péages et taxes. Aucun prépaiement — règlement au chauffeur à l\'arrivée.',
        es: 'Precio fijo por vehículo completo que incluye chofer privado, combustible, peajes e impuestos. Sin pago por adelantado: pague al chofer al llegar.',
        de: 'Festpreis pro Fahrzeug inklusive privatem Chauffeur, Kraftstoff, Maut und Steuern. Keine Vorauszahlung — Bezahlung beim Fahrer bei Ankunft.',
        hi: 'निजी ड्राइवर, ईंधन, टोल और करों सहित पूरे वाहन के लिए निश्चित दर। कोई अग्रिम भुगतान नहीं — आगमन पर ड्राइवर को भुगतान करें।',
        tr: 'Özel şoför, yakıt, otoyol geçişleri ve vergiler dahil sabit fiyat. Ön ödeme yok — varışta şoföre ödeme.',
      },
      btn: {
        ar: 'احجز سيارة VIP مع سائق الآن',
        en: 'Book VIP Chauffeur Car Now',
        ms: 'Tempah Kenderaan VIP Sekarang',
        id: 'Pesan Mobil VIP Sekarang',
        ur: 'ابھی وی آئی پی کار بک کریں',
        fr: 'Réserver Votre Voiture VIP Maintenant',
        es: 'Reservar Coche VIP con Chófer Ahora',
        de: 'Jetzt VIP-Fahrzeug mit Chauffeur buchen',
        hi: 'अभी वीआईपी कार बुक करें',
        tr: 'VIP Şoförlü Aracınızı Şimdi Ayırtın',
      },
    },
    'makkah-to-jeddah-airport': {
      badge: {
        ar: 'الأسعار الرسمية المعتمدة لرحلة العودة للمطار',
        en: 'Guaranteed Airport Return Rates',
        ms: 'Kadar Rasmi Dijamin ke Lapangan Terbang',
        id: 'Tarif Resmi Dijamin Menuju Bandara',
        ur: 'جدہ ایئرپورٹ واپسی کے سرکاری و حتمی کرایے',
        fr: 'Tarifs Officiels Garantis Vers l\'Aéroport',
        es: 'Tarifas Oficiales Garantizadas al Aeropuerto',
        de: 'Garantierte Feste Flughafentarife',
        hi: 'हवाई अड्डे के लिए आधिकारिक निर्धारित दरें',
        tr: 'Havalimanı Dönüşü Resmi Sabit Fiyatlar',
      },
      title: {
        ar: 'أسعار سيارات VIP من مكة المكرمة إلى مطار جدة',
        en: 'VIP Vehicle Rates: Makkah to Jeddah Airport',
        ms: 'Kadar Kenderaan VIP: Makkah ke Lapangan Terbang Jeddah',
        id: 'Tarif Kendaraan VIP: Makkah ke Bandara Jeddah',
        ur: 'مکہ مکرمہ سے جدہ ایئرپورٹ وی آئی پی گاڑیوں کے کرایے',
        fr: 'Tarifs Véhicules VIP : La Mecque vers Aéroport de Djeddah',
        es: 'Tarifas Véhicules VIP: La Meca al Aeropuerto de Yeda',
        de: 'VIP-Fahrzeugpreise: Mekka zum Flughafen Dschidda',
        hi: 'वीआईपी वाहन दरें: मक्का से जेद्दा हवाई अड्डा',
        tr: 'VIP Araç Fiyatları: Mekke\'den Cidde Havalimanı\'na',
      },
      desc: {
        ar: 'السعر ثابت للمركبة بالكامل شامل السائق الخاص والوقود ورسوم طريق الحرمين والضرائب. لا دفع مسبق - الدفع للسائق عند الوصول',
        en: 'Fixed rate per entire vehicle including private chauffeur, fuel, road tolls, and taxes. Zero prepayment — pay driver upon arrival.',
        ms: 'Harga tetap bagi sebuah kenderaan termasuk pemandu peribadi, minyak, tol, dan cukai. Tiada bayaran pendahuluan — bayar pemandu semasa tiba.',
        id: 'Harga tetap per kendaraan termasuk sopir pribadi, bensin, tol, dan pajak. Tanpa uang muka — bayar sopir saat tiba.',
        ur: 'گاڑی کا حتمی طے شدہ کرایہ، بمعہ ڈرائیور، ایندھن، ٹول اور ٹیکس۔ کوئی ایڈوانس نہیں — ادائیگی منزل پر ڈرائیور کو۔',
        fr: 'Tarif fixe par véhicule complet incluant chauffeur privé, carburant, péages et taxes. Aucun prépaiement — règlement au chauffeur à l\'arrivée.',
        es: 'Precio fijo por vehículo completo que incluye chofer privado, combustible, peajes e impuestos. Sin pago por adelantado: pague al chofer al llegar.',
        de: 'Festpreis pro Fahrzeug inklusive privatem Chauffeur, Kraftstoff, Maut und Steuern. Keine Vorauszahlung — Bezahlung beim Fahrer bei Ankunft.',
        hi: 'निजी ड्राइवर, ईंधन, टोल और करों सहित पूरे वाहन के लिए निश्चित दर। कोई अग्रिम भुगतान नहीं — आगमन पर ड्राइवर को भुगतान करें।',
        tr: 'Özel şoför, yakıt, otoyol geçişleri ve vergiler dahil sabit fiyat. Ön ödeme yok — varışta şoföre ödeme.',
      },
      btn: {
        ar: 'احجز سيارة من مكة إلى مطار جدة',
        en: 'Book Makkah to Jeddah Airport Car',
        ms: 'Tempah Kenderaan Makkah ke Lapangan Terbang Jeddah',
        id: 'Pesan Mobil Makkah ke Bandara Jeddah',
        ur: 'مکہ سے جدہ ایئرپورٹ کار بک کریں',
        fr: 'Réserver voiture La Mecque vers Aéroport Djeddah',
        es: 'Reservar coche de La Meca al Aeropuerto de Yeda',
        de: 'Auto von Mekka zum Flughafen Dschidda buchen',
        hi: 'मक्का से जेद्दा हवाई अड्डे के लिए कार बुक करें',
        tr: 'Mekke\'den Cidde Havalimanı\'na Araç Rezervasyonu Yap',
      },
    },
    'makkah-to-madinah': {
      badge: {
        ar: 'الأسعار الرسمية المعتمدة لنقل الحرمين',
        en: 'Guaranteed Fixed Intercity Rates',
        ms: 'Kadar Rasmi Dijamin Antara Dua Tanah Haram',
        id: 'Tarif Resmi Dijamin Antar Dua Kota Suci',
        ur: 'حرمین شریفین کے مابین سرکاری و حتمی کرایے',
        fr: 'Tarifs Officiels Garantis Intervilles',
        es: 'Tarifas Oficiales Garantizadas Entre Ciudades',
        de: 'Garantierte Feste Überlandpreise',
        hi: 'दो पवित्र शहरों के बीच आधिकारिक निर्धारित दरें',
        tr: 'İki Harem Arası Resmi Garantili Sabit Fiyatlar',
      },
      title: {
        ar: 'أسعار سيارات VIP من مكة المكرمة إلى المدينة المنورة',
        en: 'VIP Vehicle Rates: Makkah to Madinah Private Transfer',
        ms: 'Kadar Kenderaan VIP: Pemindahan Peribadi Makkah ke Madinah',
        id: 'Tarif Kendaraan VIP: Antar Jemput Pribadi Makkah ke Madinah',
        ur: 'مکہ مکرمہ سے مدینہ منورہ وی آئی پی گاڑیوں کے کرایے',
        fr: 'Tarifs Véhicules VIP : Transfert Privé La Mecque vers Médine',
        es: 'Tarifas Vehículos VIP: Traslado Privado de La Meca a Medina',
        de: 'VIP-Fahrzeugpreise: Privater Transfer von Mekka nach Medina',
        hi: 'वीआईपी वाहन दरें: मक्का से मदीना निजी स्थानांतरण',
        tr: 'VIP Araç Fiyatları: Mekke\'den Medine\'ye Özel Transfer',
      },
      desc: {
        ar: 'السعر ثابت للمركبة بالكامل شامل السائق الخاص والوقود ورسوم طريق الهجرة السريع والضرائب. لا دفع مسبق - الدفع للسائق عند الوصول',
        en: 'Fixed rate per entire vehicle including private chauffeur, fuel, expressway tolls, and taxes. Zero prepayment — pay driver upon arrival.',
        ms: 'Harga tetap bagi sebuah kenderaan termasuk pemandu peribadi, minyak, tol, dan cukai. Tiada bayaran pendahuluan — bayar pemandu semasa tiba.',
        id: 'Harga tetap per kendaraan termasuk sopir pribadi, bensin, tol, dan pajak. Tanpa uang muka — bayar sopir saat tiba.',
        ur: 'گاڑی کا حتمی طے شدہ کرایہ، بمعہ ڈرائیور، ایندھن، ٹول اور ٹیکس۔ کوئی ایڈوانس نہیں — ادائیگی منزل پر ڈرائیور کو۔',
        fr: 'Tarif fixe par véhicule complet incluant chauffeur privé, carburant, péages et taxes. Aucun prépaiement — règlement au chauffeur à l\'arrivée.',
        es: 'Precio fijo por vehículo completo que incluye chofer privado, combustible, peajes e impuestos. Sin pago por adelantado: pague al chofer al llegar.',
        de: 'Festpreis pro Fahrzeug inklusive privatem Chauffeur, Kraftstoff, Maut und Steuern. Keine Vorauszahlung — Bezahlung beim Fahrer bei Ankunft.',
        hi: 'निजी ड्राइवर, ईंधन, टोल और करों सहित पूरे वाहन के लिए निश्चित दर। कोई अग्रिम भुगतान नहीं — आगमन पर ड्राइवर को भुगतान करें।',
        tr: 'Özel şoför, yakıt, otoyol geçişleri ve vergiler dahil sabit fiyat. Ön ödeme yok — varışta şoföre ödeme.',
      },
      btn: {
        ar: 'احجز سيارة خاصة من مكة إلى المدينة',
        en: 'Book Makkah to Madinah Transfer',
        ms: 'Tempah Kenderaan Makkah ke Madinah',
        id: 'Pesan Antar Jemput Makkah ke Madinah',
        ur: 'مکہ سے مدینہ پرائیویٹ کار بک کریں',
        fr: 'Réserver le transfert La Mecque - Médine',
        es: 'Reservar traslado de La Meca a Medina',
        de: 'Transfer Mekka nach Medina buchen',
        hi: 'मक्का से मदीना स्थानांतरण बुक करें',
        tr: 'Mekke - Medine Transferi Rezervasyonu Yap',
      },
    },
    'jeddah-airport-to-makkah': {
      badge: {
        ar: 'الأسعار الرسمية المعتمدة',
        en: 'Guaranteed Fixed Rates',
        ms: 'Kadar Rasmi Dijamin',
        id: 'Tarif Resmi Dijamin',
        ur: 'سرکاری و حتمی منظور شدہ کرایے',
        fr: 'Tarifs Officiels Garantis',
        es: 'Tarifas Oficiales Garantizadas',
        de: 'Garantierte Feste Tarife',
        hi: 'गारंटीकृत निश्चित दरें',
        tr: 'Garantili Sabit Fiyatlar',
      },
      title: {
        ar: 'أسعار سيارات VIP من مطار جدة إلى مكة',
        en: 'VIP Vehicle Rates: Jeddah Airport to Makkah',
        ms: 'Kadar Kenderaan VIP: Lapangan Terbang Jeddah ke Makkah',
        id: 'Tarif Kendaraan VIP: Bandara Jeddah ke Makkah',
        ur: 'جدہ ایئرپورٹ سے مکہ مکرمہ وی آئی پی گاڑیوں کے کرایے',
        fr: 'Tarifs Véhicules VIP : Aéroport de Djeddah vers La Mecque',
        es: 'Tarifas Vehículos VIP: Aeropuerto de Yeda a La Meca',
        de: 'VIP-Fahrzeugpreise: Flughafen Dschidda nach Mekka',
        hi: 'वीआईपी वाहन दरें: जेद्दा हवाई अड्डा से मक्का',
        tr: 'VIP Araç Fiyatları: Cidde Havalimanı - Mekke',
      },
      desc: {
        ar: 'السعر ثابت للمركبة بالكامل شامل السائق الخاص والوقود ورسوم طريق الحرمين والضرائب. لا دفع مسبق - الدفع للسائق عند الوصول',
        en: 'Fixed rate per entire vehicle including private chauffeur, fuel, road tolls, and taxes. Zero prepayment — pay driver upon arrival.',
        ms: 'Harga tetap bagi sebuah kenderaan termasuk pemandu peribadi, minyak, tol, dan cukai. Tiada bayaran pendahuluan — bayar pemandu semasa tiba.',
        id: 'Harga tetap per kendaraan termasuk sopir pribadi, bensin, tol, dan pajak. Tanpa uang muka — bayar sopir saat tiba.',
        ur: 'گاڑی کا حتمی طے شدہ کرایہ، بمعہ ڈرائیور، ایندھن، ٹول اور ٹیکس۔ کوئی ایڈوانس نہیں — ادائیگی منزل پر ڈرائیور کو۔',
        fr: 'Tarif fixe par véhicule complet incluant chauffeur privé, carburant, péages et taxes. Aucun prépaiement — règlement au chauffeur à l\'arrivée.',
        es: 'Precio fijo por vehículo completo que incluye chofer privado, combustible, peajes e impuestos. Sin pago por adelantado: pague al chofer al llegar.',
        de: 'Festpreis pro Fahrzeug inklusive privatem Chauffeur, Kraftstoff, Maut und Steuern. Keine Vorauszahlung — Bezahlung beim Fahrer bei Ankunft.',
        hi: 'निजी ड्राइवर, ईंधन, टोल और करों सहित पूरे वाहन के लिए निश्चित दर। कोई अग्रिम भुगतान नहीं — आगमन पर ड्राइवर को भुगतान करें।',
        tr: 'Özel şoför, yakıt, otoyol geçişleri ve vergiler dahil sabit fiyat. Ön ödeme yok — varışta şoföre ödeme.',
      },
      btn: {
        ar: 'احجز سيارة من مطار جدة إلى مكة',
        en: 'Book Jeddah to Makkah Car',
        ms: 'Tempah Kenderaan Lapangan Terbang Jeddah ke Makkah',
        id: 'Pesan Mobil Bandara Jeddah ke Makkah',
        ur: 'جدہ ایئرپورٹ سے مکہ مکرمہ کار بک کریں',
        fr: 'Réserver voiture Aéroport Djeddah vers La Mecque',
        es: 'Reservar coche del Aeropuerto de Yeda a La Meca',
        de: 'Auto vom Flughafen Dschidda nach Mekka buchen',
        hi: 'जेद्दा हवाई अड्डे से मक्का के लिए कार बुक करें',
        tr: 'Cidde Havalimanı\'ndan Mekke\'ye Araç Rezervasyonu Yap',
      },
    },
  };

  const activePricingMeta = pricingCardContent[routeKey] || pricingCardContent['jeddah-airport-to-makkah'];

  const content = getBlogArticleContent(slug, locale);

  const mainWa = '966567588261';
  const greeting = encodeURIComponent(
    localeMeta.whatsappGreeting + ` ${post.title[locale] || post.title.en}`
  );
  const waUrl = `https://wa.me/${mainWa}?text=${greeting}`;

  // Structured Data JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://duyufalrahmanvip.com/${locale}/blog/${slug}`,
    },
    headline: post.title[locale] || post.title.en,
    description: post.metaDescription[locale] || post.metaDescription.en,
    image: [`https://duyufalrahmanvip.com${post.featuredImage}`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: post.author[locale] || post.author.en,
      url: 'https://duyufalrahmanvip.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Duyuf Alrahman VIP',
      logo: {
        '@type': 'ImageObject',
        url: 'https://duyufalrahmanvip.com/icon-192.png',
      },
    },
    inLanguage: locale,
    keywords: (post.supportingKeywords[locale] || []).join(', '),
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: dict.nav.home,
        item: `https://duyufalrahmanvip.com/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'ar' ? 'المدونة' : 'Blog',
        item: `https://duyufalrahmanvip.com/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title[locale] || post.title.en,
        item: `https://duyufalrahmanvip.com/${locale}/blog/${slug}`,
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question[locale] || faq.question.en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer[locale] || faq.answer.en,
      },
    })),
  };

  return (
    <div className="py-12 md:py-20 bg-bg min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Schema Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* BREADCRUMB */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-ink-muted mb-8 overflow-x-auto text-start"
        >
          <Link href={`/${locale}`} className="hover:text-gold-dark transition-colors">
            {dict.nav.home}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/blog`} className="hover:text-gold-dark transition-colors">
            {locale === 'ar' ? 'المدونة' : 'Blog'}
          </Link>
          <span>/</span>
          <span className="text-ink font-medium truncate max-w-xs md:max-w-md">
            {post.category[locale] || post.category.en}
          </span>
        </nav>

        {/* ARTICLE HEADER */}
        <header className="mb-10 text-start">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {post.category[locale] || post.category.en}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
              <Clock className="w-3.5 h-3.5 text-gold-dark" />
              {post.readTime[locale] || post.readTime.en}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
              <Calendar className="w-3.5 h-3.5 text-gold-dark" />
              {locale === 'ar' ? '24 أكتوبر 2026' : 'October 24, 2026'}
            </span>
          </div>

          <h1 className="font-display font-semibold text-2xl sm:text-3xl md:text-5xl text-ink tracking-tight leading-tight">
            {post.title[locale] || post.title.en}
          </h1>

          <p className="mt-4 text-base md:text-lg text-ink-muted font-light leading-relaxed">
            {post.metaDescription[locale] || post.metaDescription.en}
          </p>

          {/* FEATURED IMAGE */}
          <div className="relative w-full aspect-[1024/571] my-8 rounded-2xl overflow-hidden border border-border shadow-md bg-slate-900">
            <Image
              src={post.featuredImage}
              alt={post.imageAlt[locale] || post.imageAlt.en}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
          <p className="text-xs text-center text-ink-muted italic -mt-5 mb-8">
            {post.imageAlt[locale] || post.imageAlt.en}
          </p>

          {/* KEYWORDS PILL BADGES */}
          <div className="flex flex-wrap items-center gap-2 p-3.5 bg-surface rounded-xl border border-border text-xs mb-8">
            <span className="font-bold text-ink">
              {locale === 'ar' ? 'الكلمات المفتاحية:' : 'Topics:'}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-gold-soft text-gold-dark font-semibold">
              {post.primaryKeyword[locale] || post.primaryKeyword.en}
            </span>
            {(post.supportingKeywords[locale] || []).slice(0, 4).map((kw, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-md bg-bg text-ink-muted">
                {kw}
              </span>
            ))}
          </div>
        </header>

        {/* AUTHORITATIVE LIVE PRICING CARD & CTA */}
        <section className="bg-surface rounded-2xl p-6 md:p-8 border-2 border-gold-line shadow-xs mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-border border-b text-start">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-dark block mb-1">
                {activePricingMeta.badge[locale] || activePricingMeta.badge.en}
              </span>
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink">
                {activePricingMeta.title[locale] || activePricingMeta.title.en}
              </h2>
              <p className="text-xs text-ink-muted mt-1 font-light">
                {activePricingMeta.desc[locale] || activePricingMeta.desc.en}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={bookingHref}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold hover:bg-gold-dark text-ink font-bold text-sm shadow-xs transition-colors"
              >
                <span>{activePricingMeta.btn[locale] || activePricingMeta.btn.en}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{locale === 'ar' ? 'تأكيد عبر واتساب' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-bg border border-border text-center">
              <span className="text-xs font-semibold text-ink-muted block">
                {locale === 'ar' ? 'تويوتا كامري' : 'Camry Sedan'}
              </span>
              <span className="text-xs text-ink-muted block mb-1">
                {locale === 'ar' ? 'حتى 3 ركاب' : 'Up to 3 pax'}
              </span>
              <span className="text-xl font-bold text-ink">
                {routePrices.camry} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gold-soft/40 border-2 border-gold-line text-center relative">
              <span className="absolute -top-2.5 right-2 rtl:right-auto rtl:left-2 text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-gold text-ink">
                VIP
              </span>
              <span className="text-xs font-semibold text-ink block">
                {locale === 'ar' ? 'هيونداي ستاريا VIP' : 'Staria VIP'}
              </span>
              <span className="text-xs text-ink-muted block mb-1">
                {locale === 'ar' ? 'حتى 7 ركاب' : 'Up to 7 pax'}
              </span>
              <span className="text-xl font-bold text-gold-dark">
                {routePrices.staria} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-border text-center">
              <span className="text-xs font-semibold text-ink-muted block">
                {locale === 'ar' ? 'جي إم سي يوكون XL' : 'Yukon XL VIP'}
              </span>
              <span className="text-xs text-ink-muted block mb-1">
                {locale === 'ar' ? 'حتى 7 ركاب VIP' : 'Up to 7 VIP'}
              </span>
              <span className="text-xl font-bold text-ink">
                {routePrices.yukon} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-bg border border-border text-center">
              <span className="text-xs font-semibold text-ink-muted block">
                {locale === 'ar' ? 'تويوتا هايس' : 'HiAce Minibus'}
              </span>
              <span className="text-xs text-ink-muted block mb-1">
                {locale === 'ar' ? 'حتى 10 ركاب' : 'Up to 10 pax'}
              </span>
              <span className="text-xl font-bold text-ink">
                {routePrices.hiace} <span className="text-xs font-normal text-gold-dark">SAR</span>
              </span>
            </div>
          </div>
        </section>

        {/* FULL LOCALIZED ARTICLE BODY */}
        <article className="prose prose-lg max-w-none text-ink leading-relaxed space-y-10 text-start">
          {/* INTRODUCTION */}
          <div className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-4">
              {content.intro.title}
            </h2>
            {renderParagraphsOrTable(content.intro.paragraphs, locale)}
          </div>

          {/* DYNAMIC SECTIONS */}
          {content.sections.map((section, sIdx) => (
            <div key={sIdx} className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
              <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-4">
                {section.title}
              </h2>

              {section.lead && (
                <p className="text-ink-muted text-base leading-relaxed font-light mb-6">
                  {renderFormattedText(section.lead, locale)}
                </p>
              )}

              {renderParagraphsOrTable(section.paragraphs, locale)}

              {/* CALLOUT (IF PRESENT) */}
              {section.callout && (
                <div
                  className={`p-4 rounded-xl border mb-6 flex items-start gap-3 ${
                    section.callout.type === 'warning'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200'
                      : 'bg-gold-soft border-gold-line text-ink'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold mb-1">{section.callout.title}</strong>
                    <p className="text-xs sm:text-sm leading-relaxed">{renderFormattedText(section.callout.text, locale)}</p>
                  </div>
                </div>
              )}

              {/* SUBSECTIONS (WITH CHECK ICONS) */}
              {section.subsections && (
                <div className="space-y-6">
                  {section.subsections.map((sub, subIdx) => (
                    <div key={subIdx}>
                      <h3 className="font-display font-bold text-lg text-ink mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-gold-dark shrink-0" />
                        <span>{sub.title}</span>
                      </h3>
                      <p className="text-ink-muted text-sm md:text-base leading-relaxed font-light">
                        {renderFormattedText(sub.text, locale)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* BULLETS */}
              {section.bullets && (
                <div className="space-y-4 mt-4">
                  {section.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="p-4 rounded-xl bg-bg border border-border">
                      <h4 className="font-display font-bold text-base text-ink mb-1">
                        {b.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                        {renderFormattedText(b.text, locale)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* FAQS SECTION */}
          <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink mb-2 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-gold-dark" />
              <span>{content.faqTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mb-6 font-light">
              {content.faqSubtitle}
            </p>

            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-bg border border-border text-start">
                  <h3 className="font-display font-bold text-base md:text-lg text-ink mb-2">
                    {faq.question[locale] || faq.question.en}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                    {faq.answer[locale] || faq.answer.en}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* RELATED ARTICLES / GUIDES */}
          <section className="bg-surface rounded-2xl p-6 md:p-8 border border-border shadow-xs">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gold-dark block mb-1">
                  {locale === 'ar' ? 'أدلة إرشادية مقترحة' : 'Recommended Guides'}
                </span>
                <h2 className="font-display font-bold text-xl md:text-2xl text-ink">
                  {locale === 'ar' ? 'مقالات وأدلة ذات صلة لضيوف الرحمن' : 'Related Umrah Transport Guides'}
                </h2>
              </div>
              <Link
                href={`/${locale}/blog`}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gold-dark hover:text-gold transition-colors"
              >
                <span>{locale === 'ar' ? 'جميع المقالات' : 'All Articles'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BLOG_POSTS.filter((p) => p.slug !== slug)
                .slice(0, 6)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/${locale}/blog/${relatedPost.slug}`}
                    className="group flex flex-col rounded-xl border border-border bg-bg/50 hover:bg-gold-soft/20 hover:border-gold-line transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                      <Image
                        src={relatedPost.featuredImage}
                        alt={relatedPost.imageAlt[locale] || relatedPost.imageAlt.en}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1 justify-between text-start">
                      <div>
                        <span className="inline-block text-[10px] uppercase font-bold text-gold-dark mb-1">
                          {relatedPost.category[locale] || relatedPost.category.en}
                        </span>
                        <h3 className="font-display font-semibold text-sm text-ink group-hover:text-gold-dark transition-colors line-clamp-2 mb-2 leading-snug">
                          {relatedPost.title[locale] || relatedPost.title.en}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-ink-muted pt-2 border-t border-border/50">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gold-dark" />
                          {relatedPost.readTime[locale] || relatedPost.readTime.en}
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-gold-dark group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                          <span>{locale === 'ar' ? 'اقرأ الدليل' : 'Read Guide'}</span>
                          <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>

          {/* FINAL CTA CONCLUSION */}
          <section className="p-8 md:p-10 bg-charcoal text-cream rounded-2xl border border-gold-dark/40 shadow-lg text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-60 h-60 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-3 text-gold">
              {content.cta.title}
            </h2>
            <p className="text-sm md:text-base text-cream/90 max-w-2xl mx-auto mb-6 font-light leading-relaxed">
              {content.cta.subtitle}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
              {content.cta.badges.map((b, bIdx) => (
                <span
                  key={bIdx}
                  className="px-3 py-1 rounded-full bg-white/10 text-xs text-cream border border-white/15"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={bookingHref}
                className="px-8 py-3.5 rounded-full bg-gold hover:bg-gold-dark text-ink font-bold text-sm md:text-base shadow-md transition-all hover:scale-105"
              >
                <span>{content.cta.primaryBtn}</span>
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm md:text-base shadow-md transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{content.cta.secondaryBtn}</span>
              </a>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
