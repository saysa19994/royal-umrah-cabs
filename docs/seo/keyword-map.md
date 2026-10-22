# Strategic Keyword-to-Page Architecture Map
**Project:** Royal Umrah Cabs / Duyuf Alrahman VIP (`duyufalrahmanvip.com`)  
**Target Search Engine Strategy:** Google KSA, Google International (UK, US, ID, MY, TR, PK, IN, FR, DE, ES)

---

## 1. Core Architecture Principles (Zero Cannibalization)

1. **One Target Page per Search Intent:**
   - Transactional route queries (`Jeddah Airport to Makkah`, `Makkah to Madinah`, `Jeddah to Madinah`) route to dedicated `/[locale]/routes/[slug]` pages.
   - Broad Chauffeur & Driver queries (`Saudi Chauffeur`, `Private Driver Saudi Arabia`, `VIP Chauffeur Service`) route to `/[locale]/services`.
   - Price-focused queries (`Umrah Taxi Prices 2026`, `Makkah Taxi Fare List`) route to `/[locale]/pricing`.
   - Fleet inquiries (`GMC Yukon XL Umrah`, `Hyundai Staria VIP`) route to `/[locale]/fleet/[slug]`.
   - Informational guides (`Taxi vs Train`, `Terminal 1 Pickup Guide`) route to `/[locale]/guides/[slug]`.

2. **Full Reciprocal Hreflang & Canonical Protocol:**
   Every single URL exists symmetrically across all **10 supported locales** (`ar`, `en`, `ms`, `id`, `tr`, `fr`, `es`, `de`, `hi`, `ur`) with self-referencing canonicals and an `x-default` pointing to the English variant.

---

## 2. Intent-to-Page Mapping Directory

### Hub A: Services & Chauffeur Services (`/[locale]/services`)
* **Primary Search Intent:** Executive Chauffeur, Private Driver with Vehicle, VIP Hospitality Protocol.
* **Target Keywords:**
  - *EN:* "Saudi Chauffeur Service", "Private Chauffeur Saudi Arabia", "Luxury Chauffeur Service Jeddah Makkah"
  - *AR:* "خدمة سائق خاص في السعودية", "سيارة فارهة مع سائق للمعتمرين", "سائق خاص في مكة وجدة"
  - *TR:* "Suudi Arabistan'da şoförlü araç hizmeti", "Suudi Arabistan özel şoför", "VIP Umre şoförü"
  - *ID:* "layanan mobil dengan sopir di Arab Saudi", "sopir pribadi di Makkah dan Madinah"
  - *MS:* "perkhidmatan kereta dengan pemandu di Arab Saudi", "pemandu persendirian di Jeddah Makkah"
* **Page Value Proposition:** Professional licensed captains, English/Arabic/Urdu speaking, flight tracking, meet & greet, fixed SAR rates with zero meter anxiety.

### Hub B: Route Pages (`/[locale]/routes/[slug]`)
1. **`/[locale]/routes/jeddah-airport-to-makkah`**
   - *Target Intent:* High-intent arrival transfer from King Abdulaziz International Airport (JED) to Makkah hotels.
   - *Official Fares:* Camry (200 SAR), Staria VIP (250 SAR), Yukon XL VIP (350 SAR), HiAce (350 SAR), Coaster (600 SAR).
   - *Unique Value:* Terminal-by-terminal pickup instructions (Terminal 1 vs North Terminal), flight delay policy, Ihram preparation notes.
2. **`/[locale]/routes/makkah-to-madinah`**
   - *Target Intent:* Intercity pilgrim highway transfer (~430 km, 4.5 hours door-to-door).
   - *Official Fares:* Camry (450 SAR), Staria VIP (550 SAR), Yukon XL VIP (700 SAR), HiAce (700 SAR), Coaster (1100 SAR).
   - *Unique Value:* Private car vs Haramain train analysis (no luggage restrictions, door-to-hotel convenience, prayer/rest stop flex).
3. **`/[locale]/routes/jeddah-to-madinah`**
   - *Target Intent:* Direct highway transfer from Jeddah to Madinah.
   - *Official Fares:* Camry (680 SAR), Staria VIP (750 SAR), Yukon XL VIP (900 SAR), HiAce (900 SAR), Coaster (1400 SAR).
4. **`/[locale]/routes/madinah-airport-to-hotel`**
   - *Target Intent:* Prince Mohammad bin Abdulaziz Airport (MED) to Madinah Central Area hotels.
   - *Official Fares:* Camry (150 SAR), Staria VIP (200 SAR), Yukon XL VIP (250 SAR), HiAce (250 SAR), Coaster (450 SAR).

### Hub C: Authoritative Pricing (`/[locale]/pricing`)
* **Target Intent:** Price comparison, transparency, budget planning for families and groups.
* **Target Keywords:** "Umrah taxi prices 2026", "Makkah to Madinah taxi cost", "Jeddah airport taxi price in SAR".
* **Key Feature:** 100% authoritative pricing matrix in **SAR** with transparent season notes, zero hidden fees, child seat policy, and luggage capacities.

### Hub D: Fleet Architecture (`/[locale]/fleet/[slug]`)
* `/[locale]/fleet/hyundai-staria`: 6 Pax / 6 Bags — Executive VIP Van with reclining captain seats.
* `/[locale]/fleet/gmc-yukon-xl`: 7 Pax / 8 Bags — American Luxury SUV for VIP families.
* `/[locale]/fleet/toyota-camry`: 4 Pax / 2 Bags — Reliable economical transfer for couples/solos.
* `/[locale]/fleet/toyota-hiace`: 10 Pax / 10 Bags — Spacious family transport for extended households.
* `/[locale]/fleet/toyota-coaster`: 21 Pax / 20 Bags — Luxury group coach for private delegations and groups.
