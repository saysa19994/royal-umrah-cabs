import { DEFAULT_SETTINGS, SiteSettings } from './settings';

const TMP_FILE_PATH = '/tmp/settings-overrides.json';
const DATA_FILE_PATH = typeof process !== 'undefined' && process.cwd
  ? require('path').join(process.cwd(), 'src', 'data', 'settings-overrides.json')
  : '';

let memoryOverrides: Partial<SiteSettings> = {};
let isInitialized = false;

function loadStoredOverrides(): Partial<SiteSettings> {
  if (typeof window !== 'undefined') return {};
  try {
    const fs = require('fs');
    if (fs.existsSync(TMP_FILE_PATH)) {
      const content = fs.readFileSync(TMP_FILE_PATH, 'utf8');
      return JSON.parse(content);
    }
    if (DATA_FILE_PATH && fs.existsSync(DATA_FILE_PATH)) {
      const content = fs.readFileSync(DATA_FILE_PATH, 'utf8');
      return JSON.parse(content);
    }
  } catch {}
  return {};
}

function saveStoredOverrides(overrides: Partial<SiteSettings>): void {
  if (typeof window !== 'undefined') return;
  try {
    const fs = require('fs');
    const path = require('path');
    const json = JSON.stringify(overrides, null, 2);

    try {
      fs.writeFileSync(TMP_FILE_PATH, json, 'utf8');
    } catch {}

    if (DATA_FILE_PATH) {
      try {
        const dir = path.dirname(DATA_FILE_PATH);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DATA_FILE_PATH, json, 'utf8');
      } catch {}
    }
  } catch {}
}

export function getDynamicSettingsOverrides(): Partial<SiteSettings> {
  if (!isInitialized) {
    memoryOverrides = loadStoredOverrides();
    isInitialized = true;
  }
  return memoryOverrides;
}

export function setDynamicSettingsOverrides(newUpdates: Partial<SiteSettings>): Partial<SiteSettings> {
  const current = getDynamicSettingsOverrides();
  memoryOverrides = { ...current, ...newUpdates };
  saveStoredOverrides(memoryOverrides);
  return memoryOverrides;
}

export function getMergedSiteSettings(baseData?: Partial<SiteSettings> | null): SiteSettings {
  const overrides = getDynamicSettingsOverrides();
  return {
    ...DEFAULT_SETTINGS,
    ...(baseData || {}),
    ...overrides,
  };
}
