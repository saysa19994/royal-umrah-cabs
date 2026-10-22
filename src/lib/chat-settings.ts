export interface ChatBotSettings {
  enabled: boolean;
  botName: string;
  tone: 'warm_vip' | 'concise_executive' | 'hajj_umrah_focused';
  greetingAr: string;
  greetingEn: string;
  quickActions: {
    bookTransfer: boolean;
    hourlyDriver: boolean;
    trackBooking: boolean;
    getPrice: boolean;
    talkAgent: boolean;
    faq: boolean;
  };
  costCapMonthlyUsd: number;
  maxTokens: number;
}

export interface ChatSessionRecord {
  id: string;
  createdAt: string;
  locale: string;
  messagesCount: number;
  lastUserMessage: string;
  lastAssistantMessage: string;
  handoffOccurred: boolean;
  handoffRef?: string;
  ipMasked?: string;
}

export const DEFAULT_CHAT_SETTINGS: ChatBotSettings = {
  enabled: true,
  botName: 'رفيق ضيوف الرحمن / Rafeeq AI',
  tone: 'warm_vip',
  greetingAr: 'أهلاً بكم في ضيوف الرحمن VIP 🕋✨ أنا "رفيق"، مساعدكم الآلي الخاص لنقل العمرة والزيارة. كيف يمكنني خدمتكم في رحلتكم المباركة اليوم؟',
  greetingEn: 'Welcome to Duyuf Alrahman VIP 🕋✨ I am "Rafeeq", your dedicated pilgrimage chauffeur assistant. How may I assist you with your sacred journey today?',
  quickActions: {
    bookTransfer: true,
    hourlyDriver: true,
    trackBooking: true,
    getPrice: true,
    talkAgent: true,
    faq: true,
  },
  costCapMonthlyUsd: 50,
  maxTokens: 800,
};

const TMP_CHAT_SETTINGS = '/tmp/chat-bot-settings.json';
const TMP_CHAT_SESSIONS = '/tmp/chat-bot-sessions.json';

let memorySettings: ChatBotSettings = { ...DEFAULT_CHAT_SETTINGS };
let memorySessions: ChatSessionRecord[] = [];
let initialized = false;

function loadStoredChat(): void {
  if (typeof window !== 'undefined') return;
  try {
    const fs = require('fs');
    if (fs.existsSync(TMP_CHAT_SETTINGS)) {
      const data = JSON.parse(fs.readFileSync(TMP_CHAT_SETTINGS, 'utf8'));
      memorySettings = { ...DEFAULT_CHAT_SETTINGS, ...data };
    }
    if (fs.existsSync(TMP_CHAT_SESSIONS)) {
      memorySessions = JSON.parse(fs.readFileSync(TMP_CHAT_SESSIONS, 'utf8'));
    }
  } catch {}
}

function saveStoredChat(): void {
  if (typeof window !== 'undefined') return;
  try {
    const fs = require('fs');
    fs.writeFileSync(TMP_CHAT_SETTINGS, JSON.stringify(memorySettings, null, 2), 'utf8');
    fs.writeFileSync(TMP_CHAT_SESSIONS, JSON.stringify(memorySessions.slice(-100), null, 2), 'utf8');
  } catch {}
}

export function getChatSettings(): ChatBotSettings {
  if (!initialized) {
    loadStoredChat();
    initialized = true;
  }
  return memorySettings;
}

export function updateChatSettings(newSettings: Partial<ChatBotSettings>): ChatBotSettings {
  if (!initialized) {
    loadStoredChat();
    initialized = true;
  }
  memorySettings = {
    ...memorySettings,
    ...newSettings,
    quickActions: {
      ...memorySettings.quickActions,
      ...(newSettings.quickActions || {}),
    },
  };
  saveStoredChat();
  return memorySettings;
}

export function logChatSession(record: ChatSessionRecord): void {
  if (!initialized) {
    loadStoredChat();
    initialized = true;
  }
  const existingIdx = memorySessions.findIndex((s) => s.id === record.id);
  if (existingIdx >= 0) {
    memorySessions[existingIdx] = { ...memorySessions[existingIdx], ...record };
  } else {
    memorySessions.unshift(record);
  }
  saveStoredChat();
}

export function getChatSessions(): ChatSessionRecord[] {
  if (!initialized) {
    loadStoredChat();
    initialized = true;
  }
  // Provide sample sessions if empty so admin has rich preview
  if (memorySessions.length === 0) {
    return [
      {
        id: 'sess-84912',
        createdAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
        locale: 'ar',
        messagesCount: 4,
        lastUserMessage: 'ما هو سعر التوصيل من مطار جدة إلى فندق ساعة مكة بسيارة يوكون XL؟',
        lastAssistantMessage: 'سعر سيارة جي إم سي يوكون XL هو 380 ريال شامل الضريبة ورسوم المطار والدفع عند الوصول.',
        handoffOccurred: false,
        ipMasked: '51.36.***.***',
      },
      {
        id: 'sess-84908',
        createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
        locale: 'en',
        messagesCount: 6,
        lastUserMessage: 'Can we stop at Miqat Bir Ali on the way from Madinah to Makkah?',
        lastAssistantMessage: 'Yes, a 30-45 minute stop at Masjid Dhu al-Hulayfah (Miqat Bir Ali) is 100% complimentary.',
        handoffOccurred: true,
        handoffRef: 'VIP-71829',
        ipMasked: '82.178.***.***',
      },
      {
        id: 'sess-84882',
        createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        locale: 'ms',
        messagesCount: 3,
        lastUserMessage: 'Bolehkah bawa air zamzam 5 liter dalam bonet kereta Camry?',
        lastAssistantMessage: 'Boleh, semua kenderaan kami boleh memuatkan botol Zamzam 5L standard.',
        handoffOccurred: false,
        ipMasked: '175.139.***.***',
      },
    ];
  }
  return memorySessions;
}
