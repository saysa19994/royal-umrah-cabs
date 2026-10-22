'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Car,
  Clock,
  Search,
  DollarSign,
  HelpCircle,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { Locale } from '@/i18n/config';

interface AiChatWidgetProps {
  locale: Locale;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const I18N_STRINGS: Record<
  Locale,
  {
    botTitle: string;
    botSubtitle: string;
    online: string;
    welcomeMsg: string;
    placeholder: string;
    safetyNotice: string;
    errorMsg: string;
    quickActions: {
      bookTransfer: { label: string; prompt: string };
      hourlyDriver: { label: string; prompt: string };
      trackBooking: { label: string; prompt: string };
      getPrice: { label: string; prompt: string };
      talkAgent: { label: string; prompt: string };
      faq: { label: string; prompt: string };
    };
  }
> = {
  ar: {
    botTitle: 'رفيق ضيوف الرحمن',
    botSubtitle: 'مساعد الذكاء الاصطناعي لنقل العمرة والزيارة',
    online: 'متصل',
    welcomeMsg:
      'أهلاً ومرحباً بكم في ضيوف الرحمن VIP 🕋✨ أنا "رفيق"، مساعدكم الآلي الخاص. كيف يمكنني خدمتكم وتسهيل تنقلاتكم المباركة اليوم؟',
    placeholder: 'اكتب استفسارك هنا...',
    safetyNotice: 'مساعد آلي ذكي • لا نطلب أرقام بطاقات أو كلمات مرور • المحادثات مؤمنة',
    errorMsg:
      'عذراً، حدث انقطاع مؤقت في الاتصال. يمكنك التحدث مباشرة مع مشرف العمليات على الواتساب (+966567588261).',
    quickActions: {
      getPrice: { label: '💰 استعلام الأسعار', prompt: 'ما هي أسعار التوصيل المعتمدة من مطار جدة إلى مكة والمدينة؟' },
      bookTransfer: { label: '🚕 حجز مشوار', prompt: 'أريد حجز سيارة خاصة مع سائق من المطار إلى الفندق.' },
      hourlyDriver: { label: '⏱️ سائق بالساعة واليوم', prompt: 'هل تتوفر خدمة حجز سيارة وسائق خاص بالساعة أو لجولة يوم كامل؟' },
      trackBooking: { label: '🔍 تتبع الحجز', prompt: 'كيف يمكنني تتبع حالة وتأكيد حجزي السابق؟' },
      faq: { label: '🕋 ميقات آبار علي', prompt: 'هل التوقف في ميقات آبار علي مشمول مجاناً عند السفر من المدينة إلى مكة؟' },
      talkAgent: { label: '💬 تحدث مع المشرف', prompt: 'أريد التحدث مباشرة مع المشرف الميداني على الواتساب.' },
    },
  },
  en: {
    botTitle: 'Rafeeq AI Chauffeur',
    botSubtitle: 'Duyuf Alrahman VIP Smart Pilgrimage Assistant',
    online: 'Online',
    welcomeMsg:
      'Welcome to Duyuf Alrahman VIP 🕋✨ I am "Rafeeq", your private pilgrimage assistant. How may I assist your sacred journey across Makkah, Madinah, and Jeddah today?',
    placeholder: 'Ask Rafeeq anything...',
    safetyNotice: 'Smart AI Assistant • Card numbers & passwords are never requested • Encrypted',
    errorMsg:
      'Sorry, there was a temporary connection interruption. You can connect directly with our supervisor on WhatsApp (+966567588261).',
    quickActions: {
      getPrice: { label: '💰 Check Rates', prompt: 'What are your fixed rates from Jeddah Airport to Makkah and Madinah?' },
      bookTransfer: { label: '🚕 Book Transfer', prompt: 'I would like to book a private VIP transfer from the airport to our hotel.' },
      hourlyDriver: { label: '⏱️ Hourly / Day Driver', prompt: 'Do you offer an hourly chauffeur service or full-day private driver?' },
      trackBooking: { label: '🔍 Track Booking', prompt: 'How do I check the live status of my existing booking?' },
      faq: { label: '🕋 Miqat Stop', prompt: 'Is the stop at Miqat Bir Ali complimentary when traveling from Madinah to Makkah?' },
      talkAgent: { label: '💬 WhatsApp Agent', prompt: 'I want to speak directly with an on-duty supervisor on WhatsApp.' },
    },
  },
  ur: {
    botTitle: 'رفیق AI معاون',
    botSubtitle: 'ضیوف الرحمن VIP اسمارٹ اسسٹنٹ',
    online: 'آن لائن',
    welcomeMsg:
      'ضیوف الرحمن VIP میں خوش آمدید 🕋✨ میں "رفیق" ہوں، آپ کا نجی عمرہ معاون۔ آج میں آپ کے سفر میں کیا مدد کر سکتا ہوں؟',
    placeholder: 'اپنا سوال یہاں لکھیں...',
    safetyNotice: 'محفوظ AI معاون • ہم کبھی کارڈ کی معلومات طلب نہیں کرتے',
    errorMsg: 'معذرت، عارضی رابطہ مسئلہ ہے۔ براہ کرم واٹس ایپ پر رابطہ کریں۔',
    quickActions: {
      getPrice: { label: '💰 کرایہ معلوم کریں', prompt: 'جدہ ایئرپورٹ سے مکہ مکرمہ کا فکسڈ کرایہ کیا ہے؟' },
      bookTransfer: { label: '🚕 گاڑی بک کریں', prompt: 'مجھے ایئرپورٹ سے ہوٹل تک نجی گاڑی بک کرنی ہے۔' },
      hourlyDriver: { label: '⏱️ گھنٹوں کے حساب سے ڈرائیور', prompt: 'کیا گھنٹوں یا پورے دن کے لیے ڈرائیور کی سروس موجود ہے؟' },
      trackBooking: { label: '🔍 بکنگ ٹریک کریں', prompt: 'میں اپنی بکنگ کا اسٹیٹس کیسے چیک کر سکتا ہوں؟' },
      faq: { label: '🕋 میقات پر قیام', prompt: 'کیا مدینہ سے مکہ جاتے ہوئے میقات بیر علی پر رکنا شامل ہے؟' },
      talkAgent: { label: '💬 واٹس ایپ نمائندہ', prompt: 'میں واٹس ایپ پر سپروائزر سے بات کرنا چاہتا ہوں۔' },
    },
  },
  ms: {
    botTitle: 'Rafeeq Pembantu AI',
    botSubtitle: 'Pembantu Pintar Duyuf Alrahman VIP',
    online: 'Dalam Talian',
    welcomeMsg:
      'Selamat datang ke Duyuf Alrahman VIP 🕋✨ Saya "Rafeeq", pembantu peribadi pengangkutan Umrah anda. Bagaimana saya boleh membantu perjalanan anda hari ini?',
    placeholder: 'Taip pertanyaan anda di sini...',
    safetyNotice: 'Pembantu AI Pintar • Nombor kad & kata laluan tidak pernah diminta',
    errorMsg: 'Maaf, berlaku gangguan sambungan. Sila hubungi penyelia kami di WhatsApp.',
    quickActions: {
      getPrice: { label: '💰 Semak Harga', prompt: 'Berapakah harga tambang dari Lapangan Terbang Jeddah ke Makkah?' },
      bookTransfer: { label: '🚕 Tempah Pengangkutan', prompt: 'Saya ingin menempah kenderaan VIP peribadi ke hotel.' },
      hourlyDriver: { label: '⏱️ Pemandu Berjam/Seharian', prompt: 'Adakah anda menyediakan pemandu peribadi secara sewa berjam atau sehari suntuk?' },
      trackBooking: { label: '🔍 Semak Tempahan', prompt: 'Bagaimana cara untuk menyemak status tempahan saya?' },
      faq: { label: '🕋 Hentian Miqat', prompt: 'Adakah hentian di Miqat Bir Ali percuma untuk perjalanan Madinah ke Makkah?' },
      talkAgent: { label: '💬 Ejen WhatsApp', prompt: 'Saya ingin bercakap dengan penyelia operasi melalui WhatsApp.' },
    },
  },
  id: {
    botTitle: 'Rafeeq Asisten AI',
    botSubtitle: 'Asisten Pintar Duyuf Alrahman VIP',
    online: 'Online',
    welcomeMsg:
      'Selamat datang di Duyuf Alrahman VIP 🕋✨ Saya "Rafeeq", asisten perjalanan Umrah pribadi Anda. Ada yang bisa saya bantu untuk perjalanan ibadah Anda hari ini?',
    placeholder: 'Tulis pertanyaan Anda di sini...',
    safetyNotice: 'Asisten AI Cerdas • Data kartu kredit & kata sandi tidak pernah diminta',
    errorMsg: 'Maaf, terjadi gangguan koneksi sementara. Silakan hubungi via WhatsApp.',
    quickActions: {
      getPrice: { label: '💰 Cek Tarif', prompt: 'Berapa tarif pasti dari Bandara Jeddah ke Makkah dan Madinah?' },
      bookTransfer: { label: '🚕 Pesan Antar-Jemput', prompt: 'Saya ingin memesan mobil VIP pribadi dari bandara ke hotel.' },
      hourlyDriver: { label: '⏱️ Supir Per Jam/Harian', prompt: 'Apakah tersedia layanan supir per jam atau seharian penuh?' },
      trackBooking: { label: '🔍 Lacak Pesanan', prompt: 'Bagaimana cara mengecek status pemesanan saya?' },
      faq: { label: '🕋 Singgah Miqat', prompt: 'Apakah singgah di Miqat Bir Ali gratis dari Madinah ke Makkah?' },
      talkAgent: { label: '💬 Agen WhatsApp', prompt: 'Saya ingin berbicara langsung dengan supervisor di WhatsApp.' },
    },
  },
  fr: {
    botTitle: 'Rafeeq Assistant IA',
    botSubtitle: 'Assistant Pèlerinage Duyuf Alrahman VIP',
    online: 'En ligne',
    welcomeMsg:
      'Bienvenue chez Duyuf Alrahman VIP 🕋✨ Je suis "Rafeeq", votre assistant dédié pour votre Omra et transport privé. Comment puis-je vous aider aujourd\'hui?',
    placeholder: 'Posez votre question à Rafeeq...',
    safetyNotice: 'Assistant IA Sécurisé • Aucune coordonnée bancaire n\'est demandée',
    errorMsg: 'Connexion interrompue. Veuillez contacter notre superviseur sur WhatsApp.',
    quickActions: {
      getPrice: { label: '💰 Tarifs Fixes', prompt: 'Quels sont vos tarifs officiels de l\'aéroport de Djeddah à La Mecque?' },
      bookTransfer: { label: '🚕 Réserver Chauffeur', prompt: 'Je souhaite réserver un transfert privé VIP vers notre hôtel.' },
      hourlyDriver: { label: '⏱️ Chauffeur à l\'Heure', prompt: 'Proposez-vous un service de chauffeur à l\'heure ou à la journée?' },
      trackBooking: { label: '🔍 Suivi Réservation', prompt: 'Comment puis-je vérifier le statut de ma réservation?' },
      faq: { label: '🕋 Arrêt Miqat', prompt: 'L\'arrêt au Miqat Bir Ali est-il inclus gratuitement depuis Médine?' },
      talkAgent: { label: '💬 Agent WhatsApp', prompt: 'Je souhaite échanger directement avec un responsable sur WhatsApp.' },
    },
  },
  de: {
    botTitle: 'Rafeeq KI-Assistent',
    botSubtitle: 'Duyuf Alrahman VIP Pilger-Assistent',
    online: 'Online',
    welcomeMsg:
      'Willkommen bei Duyuf Alrahman VIP 🕋✨ Ich bin "Rafeeq", Ihr persönlicher Chauffeur- und Umrah-Assistent. Wie kann ich Ihnen heute behilflich sein?',
    placeholder: 'Fragen Sie Rafeeq...',
    safetyNotice: 'Sicherer KI-Assistent • Keine Kreditkartendaten werden abgefragt',
    errorMsg: 'Verbindungsfehler. Bitte kontaktieren Sie uns direkt über WhatsApp.',
    quickActions: {
      getPrice: { label: '💰 Festpreise', prompt: 'Was kostet der VIP-Transfer vom Flughafen Dschidda nach Mekka?' },
      bookTransfer: { label: '🚕 Fahrt buchen', prompt: 'Ich möchte einen privaten VIP-Chauffeur zum Hotel buchen.' },
      hourlyDriver: { label: '⏱️ Stundenfahrer', prompt: 'Bieten Sie Chauffeurservice auf Stunden- oder Tagesbasis an?' },
      trackBooking: { label: '🔍 Buchung verfolgen', prompt: 'Wie kann ich den Status meiner Buchung abfragen?' },
      faq: { label: '🕋 Miqat-Stopp', prompt: 'Ist der Halt am Miqat Bir Ali von Medina nach Mekka kostenlos inbegriffen?' },
      talkAgent: { label: '💬 WhatsApp-Support', prompt: 'Ich möchte direkt mit einem Chauffeur-Supervisor auf WhatsApp sprechen.' },
    },
  },
  es: {
    botTitle: 'Rafeeq Asistente IA',
    botSubtitle: 'Asistente de Peregrinación Duyuf Alrahman VIP',
    online: 'En línea',
    welcomeMsg:
      'Bienvenido a Duyuf Alrahman VIP 🕋✨ Soy "Rafeeq", su asistente personal de transporte para Umrah. ¿En qué puedo asistirle hoy?',
    placeholder: 'Escriba su consulta aquí...',
    safetyNotice: 'Asistente IA Seguro • Nunca solicitamos tarjetas ni contraseñas',
    errorMsg: 'Interrupción temporal. Puede contactar directamente por WhatsApp.',
    quickActions: {
      getPrice: { label: '💰 Consultar Tarifas', prompt: '¿Cuáles son las tarifas fijas desde el Aeropuerto de Yeda a La Meca?' },
      bookTransfer: { label: '🚕 Reservar Traslado', prompt: 'Deseo reservar un traslado VIP privado hasta el hotel.' },
      hourlyDriver: { label: '⏱️ Chofer por Horas', prompt: '¿Disponen de servicio de chofer privado por horas o por día?' },
      trackBooking: { label: '🔍 Rastrear Reserva', prompt: '¿Cómo puedo verificar el estado de mi reserva?' },
      faq: { label: '🕋 Parada Miqat', prompt: '¿La parada en Miqat Bir Ali está incluida de Medina a La Meca?' },
      talkAgent: { label: '💬 Agente WhatsApp', prompt: 'Quiero hablar directamente con un supervisor en WhatsApp.' },
    },
  },
  hi: {
    botTitle: 'रफ़ीक AI सहायक',
    botSubtitle: 'ज़ुयूफ़ अल-रहमान VIP स्मार्ट सहायक',
    online: 'ऑनलाइन',
    welcomeMsg:
      'ज़ुयूफ़ अल-रहमान VIP में आपका स्वागत है 🕋✨ मैं "रफ़ीक" हूँ, आपका निजी उमराह सहायक। आज मैं आपकी क्या सहायता कर सकता हूँ?',
    placeholder: 'अपना प्रश्न यहाँ लिखें...',
    safetyNotice: 'सुरक्षित AI सहायक • हम कभी कार्ड या पासवर्ड नहीं मांगते',
    errorMsg: 'संपर्क त्रुटि। कृपया सीधे व्हाट्सएप पर संपर्क करें।',
    quickActions: {
      getPrice: { label: '💰 किराया जांचें', prompt: 'जेद्दाह एयरपोर्ट से मक्का का निश्चित किराया क्या है?' },
      bookTransfer: { label: '🚕 गाड़ी बुक करें', prompt: 'मुझे एयरपोर्ट से होटल के लिए निजी VIP कार बुक करनी है।' },
      hourlyDriver: { label: '⏱️ प्रति घंटे ड्राइवर', prompt: 'क्या प्रति घंटे या पूरे दिन के लिए ड्राइवर सेवा उपलब्ध है?' },
      trackBooking: { label: '🔍 बुकिंग ट्रैक करें', prompt: 'मैं अपनी बुकिंग की स्थिति कैसे देख सकता हूँ?' },
      faq: { label: '🕋 मीक़ात ठहराव', prompt: 'क्या मदीना से मक्का जाते समय मीक़ात बीर अली पर रुकना शामिल है?' },
      talkAgent: { label: '💬 व्हाट्सएप संपर्क', prompt: 'मैं व्हाट्सएप पर सुपरवाइजर से बात करना चाहता हूँ।' },
    },
  },
  tr: {
    botTitle: 'Refik AI - Umre Asistanı',
    botSubtitle: '7/24 Duyuf Alrahman VIP Dijital Asistanı',
    online: 'Çevrimiçi',
    welcomeMsg:
      'Selamün Aleyküm! Ben Refik, Duyuf Alrahman VIP yapay zeka asistanıyım. Cidde, Mekke ve Medine VIP transferleri, araç kapasiteleri ve sabit fiyatlarımız hakkında size nasıl yardımcı olabilirim?',
    placeholder: 'Sorunuzu buraya yazın veya hızlı işlemlerden seçin...',
    safetyNotice: 'Rezervasyonlar resmi sistemimiz üzerinden doğrulanır. Kart veya şifre bilgisi talep edilmez.',
    errorMsg: 'Bağlantıda bir gecikme yaşandı. Lütfen WhatsApp üzerinden doğrudan bize ulaşın.',
    quickActions: {
      bookTransfer: { label: '🚗 Transfer Rezervasyonu', prompt: 'Cidde Havalimanı\'ndan Mekke\'ye transfer rezervasyonu yapmak istiyorum.' },
      hourlyDriver: { label: '⏱️ Şoförlü Özel Araç', prompt: 'Mekke ve Medine\'de saatlik özel şoförlü araç hizmetiniz hakkında bilgi verir misiniz?' },
      trackBooking: { label: '🔍 Rezervasyon Takibi', prompt: 'Mevcut rezervasyonumu nasıl sorgulayabilirim?' },
      getPrice: { label: '💰 Sabit Fiyat Tarifesi', prompt: 'Mekke - Medine ve Cidde transfer ücretleriniz ne kadardır?' },
      talkAgent: { label: '💬 WhatsApp Yetkilisi', prompt: 'Bir müşteri temsilcisiyle WhatsApp üzerinden görüşmek istiyorum.' },
      faq: { label: '❓ Sık Sorulan Sorular', prompt: 'Havalimanı karşılama ve iptal politikanız nasıldır?' },
    },
  },
};

export function AiChatWidget({ locale }: AiChatWidgetProps) {
  const isRtl = locale === 'ar' || locale === 'ur';
  const strings = I18N_STRINGS[locale] || I18N_STRINGS.en;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: strings.welcomeMsg,
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isStreaming) return;

    const userMessage: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsStreaming(true);

    const assistantIndex = updatedMessages.length;
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          locale,
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error('Chat service error');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const next = [...prev];
          next[assistantIndex] = { role: 'assistant', content: accumulated };
          return next;
        });
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[assistantIndex] = {
          role: 'assistant',
          content: strings.errorMsg,
        };
        return next;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const actionList = [
    strings.quickActions.getPrice,
    strings.quickActions.bookTransfer,
    strings.quickActions.hourlyDriver,
    strings.quickActions.trackBooking,
    strings.quickActions.faq,
    strings.quickActions.talkAgent,
  ];

  return (
    <>
      {/* Floating Trigger Button - Positioned opposite to WhatsApp button to avoid overlapping */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-20 sm:bottom-6 left-4 rtl:left-auto rtl:right-4 z-40 h-14 px-4 rounded-full bg-gradient-to-r from-[#D9A031] via-[#E5B24E] to-[#D9A031] text-[#0D0F12] font-bold shadow-2xl border-2 border-[#E5B24E]/80 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 group pointer-events-auto"
        aria-label="Open AI Chauffeur Assistant"
      >
        <div className="relative">
          <Bot className="w-6 h-6 text-[#0D0F12]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
        </div>
        <span className="text-xs tracking-wide hidden sm:inline-block font-bold">
          {strings.botTitle}
        </span>
      </button>

      {/* Chat Window Drawer / Modal */}
      {isOpen && (
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="fixed bottom-24 sm:bottom-22 left-4 rtl:left-auto rtl:right-4 z-50 w-[92vw] sm:w-[420px] h-[590px] max-h-[82vh] bg-[#14171C] text-[#FAF9F6] border border-[#262B33] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0D0F12] via-[#14171C] to-[#0D0F12] border-b border-[#262B33] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D9A031]/15 border border-[#D9A031]/30 flex items-center justify-center text-[#D9A031]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-sm text-[#FAF9F6]">
                    {strings.botTitle}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                    {strings.online}
                  </span>
                </div>
                <p className="text-[10px] text-[#A0A6B2]">
                  {strings.botSubtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-[#262B33] text-[#A0A6B2] hover:text-[#FAF9F6] transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions Carousel */}
          <div className="p-2.5 bg-[#0D0F12]/80 border-b border-[#262B33] overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            {actionList.map((action, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(action.prompt)}
                disabled={isStreaming}
                className="px-2.5 py-1 rounded-full bg-[#262B33]/80 hover:bg-[#D9A031]/20 hover:text-[#D9A031] text-[10px] font-medium text-[#FAF9F6] border border-[#343B47] whitespace-nowrap transition-colors shrink-0"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 ${
                  m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs ${
                    m.role === 'user'
                      ? 'bg-[#D9A031] text-[#0D0F12]'
                      : 'bg-white/10 text-[#D9A031]'
                  }`}
                >
                  {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#D9A031] text-[#0D0F12] font-semibold rounded-tr-xs rtl:rounded-tr-2xl rtl:rounded-tl-xs'
                      : 'bg-[#1C212B] text-[#FAF9F6] border border-[#262B33] rounded-tl-xs rtl:rounded-tl-2xl rtl:rounded-tr-xs font-light whitespace-pre-wrap'
                  }`}
                >
                  {m.content || (
                    <span className="inline-flex items-center gap-1 text-[#A0A6B2]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9A031] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9A031] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9A031] animate-bounce [animation-delay:0.4s]" />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Privacy & Safety Micro-Notice */}
          <div className="px-3 py-1.5 bg-[#0D0F12] text-[9px] text-[#6C7584] text-center border-t border-[#262B33]/60 shrink-0">
            {strings.safetyNotice}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#0D0F12] border-t border-[#262B33] flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={strings.placeholder}
              disabled={isStreaming}
              className="flex-1 h-10 px-3.5 rounded-xl bg-[#1C212B] border border-[#262B33] text-xs text-[#FAF9F6] placeholder-[#6C7584] focus:outline-none focus:border-[#D9A031] transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="w-10 h-10 rounded-xl bg-[#D9A031] hover:bg-[#E5B24E] disabled:opacity-40 text-[#0D0F12] flex items-center justify-center transition-colors shrink-0"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
