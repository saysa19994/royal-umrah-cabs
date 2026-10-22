import { AUTHORITATIVE_TRANSFER_RATES } from './pricing-constants';

export type PricingMatrix = Record<string, Record<string, number>>;

// In-memory runtime cache initialized with authoritative rates
let memoryRates: PricingMatrix = JSON.parse(JSON.stringify(AUTHORITATIVE_TRANSFER_RATES));
let isInitialized = false;

function loadStoredOverrides(): PricingMatrix | null {
  if (typeof window !== 'undefined') return null;
  try {
    // Dynamic import to prevent bundlers from bringing 'fs' to client bundles
    const fs = require('fs');
    const path = require('path');
    const tmpPath = '/tmp/pricing-overrides.json';
    const dataPath = path.join(process.cwd(), 'src', 'data', 'pricing-overrides.json');

    if (fs.existsSync(tmpPath)) {
      const content = fs.readFileSync(tmpPath, 'utf8');
      return JSON.parse(content);
    }
    if (fs.existsSync(dataPath)) {
      const content = fs.readFileSync(dataPath, 'utf8');
      return JSON.parse(content);
    }
  } catch {
    // Graceful fallback to default in-memory rates
  }
  return null;
}

function saveStoredOverrides(matrix: PricingMatrix): void {
  if (typeof window !== 'undefined') return;
  try {
    const fs = require('fs');
    const path = require('path');
    const tmpPath = '/tmp/pricing-overrides.json';
    const dataPath = path.join(process.cwd(), 'src', 'data', 'pricing-overrides.json');
    const json = JSON.stringify(matrix, null, 2);

    try {
      fs.writeFileSync(tmpPath, json, 'utf8');
    } catch {}

    try {
      const dir = path.dirname(dataPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(dataPath, json, 'utf8');
    } catch {}
  } catch {}
}

export function getDynamicTransferRates(): PricingMatrix {
  if (!isInitialized) {
    const stored = loadStoredOverrides();
    if (stored) {
      for (const [routeId, vehicleMap] of Object.entries(stored)) {
        if (!memoryRates[routeId]) {
          memoryRates[routeId] = {};
        }
        for (const [vehicleId, price] of Object.entries(vehicleMap)) {
          memoryRates[routeId][vehicleId] = Number(price);
        }
      }
    }
    isInitialized = true;
  }
  return memoryRates;
}

export function setDynamicTransferRate(routeId: string, vehicleId: string, priceSAR: number): PricingMatrix {
  const current = getDynamicTransferRates();
  if (!current[routeId]) {
    current[routeId] = {};
  }
  current[routeId][vehicleId] = priceSAR;
  saveStoredOverrides(current);
  return current;
}

export function getDynamicPriceForRouteVehicle(routeId: string, vehicleId: string): number | null {
  const rates = getDynamicTransferRates();
  return rates[routeId]?.[vehicleId] ?? AUTHORITATIVE_TRANSFER_RATES[routeId]?.[vehicleId] ?? null;
}
