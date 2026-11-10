import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Locale, getLocalizedAlternates } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { Plane, MapPin, Clock, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { AirportTransferExperience } from '@/components/routes/AirportTransferExperience';

interface GuidePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

interface GuideSectionData {
  title: string;
  content: string;
}

const GUIDE_LOCALIZED_SECTIONS: Record<Locale, { sections: GuideSectionData[]; ctaText: string }> = {
  ar: {
    sections: [
      {
        title: '1. صالة 1 الجديدة بمطار الملك عبدالعزيز مقابل الصالة الشمالية',
        content:
          'يضم مطار الملك عبدالعزيز الدولي بجدة (KAIA) صالتين دوليتين رئيسيتين للمسافرين. تستقبل الصالة 1 الجديدة (المميزة بحوض الأسماك الضخم بارتفاع 30 متراً) معظم شركات الطيران الوطنية والعالمية مثل الخطوط السعودية، والخطوط الماليزية، وطيران الإمارات، والخطوط القطرية، والخطوط التركية. بينما تستقبل الصالة الشمالية بعض الرحلات الاقتصادية والشارتر الموسمية. يرجى التأكد من صالة وصولك المذكورة على تذكرتك لتوجيه سائقك بدقة.',
      },
      {
        title: '2. إنهاء إجراءات الجوازات واستلام الأمتعة',
        content:
          'بعد خروجك من الطائرة وإنهاء إجراءات الدخول عبر كاونترات الجوازات، توجه مباشرة إلى صالة الأمتعة لاستلام حقائبك وفق رقم الرحلة الموضح على الشاشات الإلكترونية. تتوفر عربات نقل الأمتعة المجانية في كافة أرجاء صالة استلام العفش لتسهيل تحرك عائلتك دون أي عناء.',
      },
      {
        title: '3. نقطة لقاء واستقبال سائقك الخاص VIP',
        content:
          'بمجرد خروجك من بوابات الجمارك إلى صالة القدوم العامة، ستجد سائقك الخاص من «ضيوف الرحمن VIP» بانتظارك في منطقة الاستقبال المخصصة حاملاً لوحة ترحيبية أنيقة وواضحة تحمل اسم عائلتك الكريم. كما ستصلك على واتساب قبل هبوط الطائرة بيانات السائق المباشرة، وصورته الشخصية، ورقم لوحة المركبة لتسهيل التواصل الفوري.',
      },
      {
        title: '4. 60 دقيقة انتظار مجاني مع تتبع رادار الرحلة المباشر',
        content:
          'يقوم مركز العمليات لدينا بمزامنة تحرك السائق تلقائياً مع رادار رحلتك الجوية المباشر. لا تبدأ فترة الانتظار المجانية (60 دقيقة كاملة) إلا من لحظة ملامسة عجلات الطائرة لأرض المطار، مما يمنح عائلتك متسعاً تاماً من الوقت لإنهاء الجوازات واستلام الحقائب بكل طمأنينة ودون أي استعجال.',
      },
    ],
    ctaText: 'احجز سيارة وسائق VIP من مطار جدة إلى مكة الآن',
  },
  en: {
    sections: [
      {
        title: '1. KAIA Terminal 1 vs North Terminal',
        content:
          'King Abdulaziz International Airport (KAIA) has two primary international passenger facilities. Most national carriers and international airlines (such as Saudia, Malaysia Airlines, Emirates, Qatar Airways, Turkish Airlines) arrive at the new Terminal 1, known for its massive 30-meter aquarium. Certain seasonal charter flights and budget airlines use the North Terminal. Verify your arriving terminal on your flight ticket for seamless chauffeur dispatch.',
      },
      {
        title: '2. Immigration and Baggage Retrieval',
        content:
          'After clearing passport control, collect your checked luggage at the designated carousel indicated on digital flight displays. Free airport luggage trolleys are provided throughout the baggage claim area to ensure easy transit for your family.',
      },
      {
        title: '3. Where Your Chauffeur Meets You',
        content:
          'Once you walk out through the customs exit doors into the public arrival hall, your private Duyuf Alrahman VIP chauffeur will be standing in the designated reception area holding a clear welcome board bearing your family name. You will also receive your chauffeur\'s direct mobile number, photograph, and vehicle plate number on WhatsApp before landing.',
      },
      {
        title: '4. 60-Minute Complimentary Wait Time',
        content:
          'Our dispatch center automatically synchronizes your chauffeur\'s dispatch with your flight\'s live radar telemetry. The 60-minute complimentary waiting window begins only after your aircraft touches down, giving your family plenty of time to clear customs without rushing.',
      },
    ],
    ctaText: 'Book Jeddah Airport to Makkah Chauffeur',
  },
  tr: {
    sections: [
      {
        title: '1. Cidde KAIA Terminal 1 ve Kuzey Terminali Karşılaştırması',
        content:
          'Cidde Kral Abdülaziz Uluslararası Havalimanı (KAIA) iki ana yolcu terminaline sahiptir. Türk Hava Yolları, Saudia ve diğer büyük havayolları 30 metrelik dev akvaryumuyla ünlü modern Terminal 1\'e iner. Bazı charter ve ekonomik uçuşlar ise Kuzey Terminali\'ni kullanır.',
      },
      {
        title: '2. Pasaport Kontrolü ve Bagaj Alımı',
        content:
          'Pasaport kontrolünden geçtikten sonra, ekranlarda belirtilen banttan bagajlarınızı teslim alın. Ailenizin rahatı için bagaj alanında ücretsiz bagaj arabaları mevcuttur.',
      },
      {
        title: '3. Özel VIP Şoförünüzün Sizi Karşıladığı Nokta',
        content:
          'Gümrük kapısından genel gelen yolcu salonuna çıktığınızda, Duyuf Alrahman VIP şoförünüz ailenizin adının yazılı olduğu karşılama tabelasıyla sizi bekliyor olacaktır. İniş öncesinde şoförünüzün telefon numarası, fotoğrafı ve araç plakası WhatsApp üzerinden tarafınıza iletilir.',
      },
      {
        title: '4. Uçuş Radarı Takibi ve 60 Dakika Ücretsiz Bekleme',
        content:
          'Operasyon merkezimiz uçuşunuzu canlı radar ile takip eder. 60 dakikalık ücretsiz bekleme süresi uçağın tekerlekleri piste değdiği andan itibaren başlar; böylece pasaport ve bagaj işlemlerinizi telaşsızca tamamlarsınız.',
      },
    ],
    ctaText: 'Cidde Havalimanı - Mekke VIP Transferinizi Ayırtın',
  },
  ms: {
    sections: [
      {
        title: '1. KAIA Terminal 1 vs Terminal Utara',
        content:
          'Lapangan Terbang Antarabangsa King Abdulaziz (KAIA) mempunyai dua terminal utama. Kebanyakan syarikat penerbangan antarabangsa termasuk Malaysia Airlines dan Saudia mendarat di Terminal 1 baharu. Sesetengah penerbangan sewa khas menggunakan Terminal Utara.',
      },
      {
        title: '2. Pemeriksaan Imigresen dan Tuntutan Bagasi',
        content:
          'Selepas melepasi pemeriksaan pasport, ambil bagasi anda di karusel yang ditetapkan. Troli bagasi percuma disediakan di seluruh kawasan tuntutan bagasi.',
      },
      {
        title: '3. Lokasi Pertemuan Pemandu VIP Anda',
        content:
          'Sebaik sahaja keluar dari pintu kastam ke ruang ketibaan awam, pemandu peribadi Duyuf Alrahman VIP anda akan menunggu dengan papan tanda tertera nama keluarga anda. Butiran pemandu dan nombor plat kenderaan dihantar melalui WhatsApp sebelum ketibaan.',
      },
      {
        title: '4. 60 Minit Menunggu Percuma & Penjejakan Radar Penerbangan',
        content:
          'Pusat operasi kami menyegerakkan ketibaan pemandu dengan radar penerbangan langsung anda. Masa menunggu percuma 60 minit hanya bermula selepas pesawat mendarat, memberi masa secukupnya untuk keluarga anda.',
      },
    ],
    ctaText: 'Tempah Pemandu VIP Lapangan Terbang Jeddah ke Makkah',
  },
  id: {
    sections: [
      {
        title: '1. KAIA Terminal 1 vs Terminal Utara',
        content:
          'Bandara Internasional King Abdulaziz (KAIA) memiliki dua terminal kedatangan utama. Mayoritas maskapai seperti Garuda Indonesia dan Saudia tiba di Terminal 1 yang megah dengan akuarium raksasa. Penerbangan carter musiman mendarat di Terminal Utara.',
      },
      {
        title: '2. Pemeriksaan Imigrasi dan Pengambilan Bagasi',
        content:
          'Setelah menyelesaikan cap paspor di imigrasi, ambil koper Anda di konveyor bagasi sesuai nomor penerbangan. Troli bagasi bandara gratis tersedia di seluruh area kedatangan.',
      },
      {
        title: '3. Titik Temu dengan Sopir Pribadi VIP Anda',
        content:
          'Saat keluar melalui pintu bea cukai ke lobi penjemputan umum, sopir VIP Duyuf Alrahman Anda telah bersiap dengan papan nama keluarga Anda. Foto, nomor kontak, dan plat mobil dikirimkan via WhatsApp sebelum mendarat.',
      },
      {
        title: '4. Menunggu Gratis 60 Menit & Pelacakan Radar Penerbangan',
        content:
          'Waktu tunggu gratis selama 60 menit baru dihitung sejak pesawat mendarat di landasan pacu secara real-time melalui pelacakan radar, memastikan keluarga Anda memiliki waktu yang leluasa.',
      },
    ],
    ctaText: 'Pesan Sopir VIP Bandara Jeddah ke Makkah',
  },
  ur: {
    sections: [
      {
        title: '1. شاہ عبدالعزیز ایئرپورٹ ٹرمینل 1 بمقابلہ نارتھ ٹرمینل',
        content:
          'جدہ کا کنگ عبدالعزیز انٹرنیشنل ایئرپورٹ (KAIA) دو اہم بین الاقوامی ٹرمینلز پر مشتمل ہے۔ پی آئی اے، سعودی ایئرلائنز اور ایمریٹس سمیت بیشتر پروازیں نئے ٹرمینل 1 پر اترتی ہیں جبکہ بعض سیزنل چارٹر فلائٹس نارتھ ٹرمینل استعمال کرتی ہیں۔',
      },
      {
        title: '2. امیگریشن اور سامان کی وصولی',
        content:
          'پاسپورٹ کنٹرول سے فارغ ہونے کے بعد مخصوص کنویئر بیلٹ سے اپنا سامان حاصل کریں۔ مسافروں کی سہولت کے لیے سامان کی مفت ٹرالیاں دستیاب ہیں۔',
      },
      {
        title: '3. آپ کے خصوصی وی آئی پی ڈرائیور سے ملاقات کا مقام',
        content:
          'کسٹمز سے باہر نکلتے ہی پبلک ارائیول ہال میں ضیوف الرحمن VIP کا باحیا ڈرائیور آپ کے نام کا واضح ویلکم بورڈ تھامے منتظر ہوگا۔ فلائٹ لینڈ کرنے سے قبل ڈرائیور کا نمبر اور گاڑی کی تفصیلات واٹس ایپ پر ارسال کر دی جاتی ہیں۔',
      },
      {
        title: '4. 60 منٹ مفت انتظار اور فلائٹ ریڈار لائیو ٹریکنگ',
        content:
          'ہماری ڈسپیچ ٹیم آپ کی فلائٹ کے رڈار سے باخبر رہتی ہے۔ 60 منٹ کا مفت انتظار صرف فلائٹ کے رن وے پر اترنے کے بعد شروع ہوتا ہے تاکہ آپ کے اہل خانہ سکون سے بغیر کسی جلدی کے باہر آ سکیں۔',
      },
    ],
    ctaText: 'جدہ ایئرپورٹ تا مکہ وی آئی پی کار بک کریں',
  },
  fr: {
    sections: [
      {
        title: '1. KAIA Terminal 1 vs Terminal Nord',
        content:
          'L\'aéroport international Roi Abdulaziz (KAIA) dispose de deux terminaux principaux. Les vols réguliers atterrissent au Terminal 1 moderne. Vérifiez votre billet d\'avion pour le terminal exact.',
      },
      {
        title: '2. Contrôle des Passeports et Récupération des Bagages',
        content:
          'Après les formalités de police, récupérez vos bagages aux tapis roulants. Des chariots gratuits sont à votre entière disposition.',
      },
      {
        title: '3. Point de Rencontre avec Votre Chauffeur Privé VIP',
        content:
          'Dès votre sortie de la douane dans le hall des arrivées, votre chauffeur Duyuf Alrahman VIP vous attend avec un panneau d\'accueil personnalisé à votre nom.',
      },
      {
        title: '4. 60 Minutes d\'Attente Gratuite & Suivi Radar du Vol',
        content:
          'La télémétrie en direct synchronise l\'arrivée du chauffeur. Les 60 minutes gratuites débutent dès l\'atterrissage effectif de l\'avion.',
      },
    ],
    ctaText: 'Réservez Votre Chauffeur VIP Aéroport de Djeddah vers La Mecque',
  },
  de: {
    sections: [
      {
        title: '1. KAIA Terminal 1 vs. Nord-Terminal',
        content:
          'Der King Abdulaziz International Airport verfügt über zwei Hauptterminals. Internationale Linienflüge landen am modernen Terminal 1.',
      },
      {
        title: '2. Einreisekontrolle und Gepäckausgabe',
        content:
          'Nach der Passkontrolle holen Sie Ihr Gepäck ab. Kostenlose Gepäckwagen stehen bereit.',
      },
      {
        title: '3. Treffpunkt mit Ihrem privaten VIP-Chauffeur',
        content:
          'Ihr Chauffeur erwartet Sie in der Ankunftshalle mit einem Namensschild. Kontaktdaten erhalten Sie vorab per WhatsApp.',
      },
      {
        title: '4. 60 Minuten kostenlose Wartezeit mit Flugradar-Tracking',
        content:
          'Unser Leitsystem überwacht Ihren Flug in Echtzeit. Die 60-minütige Wartezeit beginnt erst nach der Landung.',
      },
    ],
    ctaText: 'VIP-Chauffeur Dschidda Flughafen nach Mekka buchen',
  },
  es: {
    sections: [
      {
        title: '1. KAIA Terminal 1 vs Terminal Norte',
        content:
          'El Aeropuerto Internacional Rey Abdulaziz cuenta con dos terminales principales. La mayoría de vuelos internacionales aterrizan en la Terminal 1.',
      },
      {
        title: '2. Inmigración y Recogida de Equipaje',
        content:
          'Tras el control de pasaportes, recoja su equipaje. Hay carritos portaequipajes gratuitos disponibles.',
      },
      {
        title: '3. Punto de Encuentro con Su Chofer Privado VIP',
        content:
          'Su chofer le esperará en la sala de llegadas con un cartel con su nombre de familia.',
      },
      {
        title: '4. 60 Minutos de Espera Gratuita y Rastreo de Vuelo por Radar',
        content:
          'El centro de despacho rastrea su vuelo en tiempo real. Los 60 minutos de espera comienzan tras el aterrizaje.',
      },
    ],
    ctaText: 'Reservar Chofer VIP del Aeropuerto de Yeda a La Meca',
  },
  hi: {
    sections: [
      {
        title: '1. केएआईए टर्मिनल 1 बनाम उत्तरी टर्मिनल',
        content:
          'किंग अब्दुलअज़ीज़ अंतर्राष्ट्रीय हवाई अड्डा (KAIA) में दो मुख्य टर्मिनल हैं। अधिकांश उड़ानें आधुनिक टर्मिनल 1 पर आती हैं।',
      },
      {
        title: '2. इमिग्रेशन और सामान की प्राप्ति',
        content:
          'पासपोर्ट नियंत्रण के बाद अपना सामान प्राप्त करें। निःशुल्क सामान ट्रॉली पूरे क्षेत्र में उपलब्ध हैं।',
      },
      {
        title: '3. आपके वीआईपी निजी ड्राइवर से मिलने का स्थान',
        content:
          'निकास द्वार पर आपका निजी ड्राइवर आपके नाम की पट्टिका लिए आपका स्वागत करेगा।',
      },
      {
        title: '4. 60 मिनट का निःशुल्क प्रतीक्षा समय और लाइव उड़ान रडار ट्रैकिंग',
        content:
          'हमारा सिस्टम आपकी उड़ान की लाइव ट्रैकिंग करता है। 60 मिनट का निःशुल्क समय विमान के उतरने के बाद शुरू होता है।',
      },
    ],
    ctaText: 'जेद्दा हवाई अड्डा से मक्का वीआईपी ड्राइवर बुक करें',
  },
};

export async function generateMetadata(props: GuidePageProps): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params;

  const dict = getDictionary(locale);
  return {
    title: dict.guides_section?.guide2Title || 'Jeddah Airport Arrival Guide | Duyuf Alrahman VIP',
    description: dict.guides_section?.guide2Desc || 'Complete arrival guide for King Abdulaziz International Airport (KAIA).',
    alternates: getLocalizedAlternates(locale, '/guides/jeddah-airport-arrival-guide'),
  };
}

export default async function JeddahAirportGuidePage(props: GuidePageProps) {
  const params = await props.params;
  const { locale } = params;

  const dict = getDictionary(locale);
  const localizedData = GUIDE_LOCALIZED_SECTIONS[locale] || GUIDE_LOCALIZED_SECTIONS.en;

  return (
    <div className="py-16 md:py-24 bg-bg min-h-screen text-start">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-soft border border-gold-line text-xs font-bold text-gold-dark uppercase tracking-widest mb-3">
            <span>{dict.guides_section?.guide2Date || 'Updated 2026'}</span>
          </div>
          <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink tracking-tight">
            {dict.guides_section?.guide2Title || 'KAIA Airport Arrival Guide'}
          </h1>
          <p className="mt-3 text-sm md:text-base text-ink-muted font-light max-w-2xl mx-auto">
            {dict.guides_section?.guide2Desc || 'Step-by-step guidance for arriving at Jeddah Airport.'}
          </p>
        </div>

        <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border shadow-xs space-y-6 text-sm text-ink-light leading-relaxed font-light mb-12">
          {localizedData.sections.map((section, idx) => (
            <section key={idx} className="space-y-2">
              <h2 className="font-display text-xl font-bold text-ink">{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
        </div>

        {/* INTERACTIVE ROYAL AIRPORT TRANSFER EXPERIENCE */}
        <AirportTransferExperience locale={locale} slug="jeddah-airport-to-makkah" />

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/booking?route=jeddah-airport-to-makkah`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold-dark hover:bg-gold-hover text-surface font-bold text-sm shadow-md"
          >
            <span>{localizedData.ctaText}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
