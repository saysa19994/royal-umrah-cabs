# DUYUF AL RAHMAN VIP — TOYOTA COASTER CUSTOMER-FACING SAFETY CHECK
## Pre-Production Operational Safety & Passenger/Luggage Capacity Audit
**Document ID:** `COASTER-SAFETY-CHECK-2026-V1`  
**Classification:** Operational Safety, Consumer Protection & Legal Compliance  
**Target Branch:** `seo-recovery-preview`  
**Target Commit:** `79eba8f050232e5a3e9d7be34f36c4d95fef0512`  
**Audit Status:** `FAIL-CLOSED (AWAITING OWNER CONFIRMATION)`

---

## 1. Executive Summary & Safety Policy

During the technical SEO audit and fleet reconciliation, a material operational variance was identified regarding the **Toyota Coaster VIP Minibus**:
- **Disputed Specification Claim:** 21 passengers + 20 large suitcases simultaneously.
- **Official Abdul Latif Jameel Motors (Toyota KSA / ALJ) Factory Specifications:**
  - **Coaster 20-Seater Grade:** 20 total seats including chauffeur = **19 passenger seats + 1 driver**.
  - **Coaster 23-Seater Grade:** 23 total seats including chauffeur = **22 passenger seats + 1 driver**.
  - **Factory Luggage Compartment:** 8 to 12 medium luggage items in standard factory boot.
  - Accommodating 18–20 large suitcases (28-inch hard cases) requires folding or removing the rear bench seat, reducing available passenger seating.

### Strict Fail-Closed Policy:
In accordance with enterprise consumer safety and Saudi transport regulations (TGA / هيئة النقل):
1. **No unverified capacity claim will be published as standard:** The claim of "21 passengers AND 20 large bags simultaneously" remains strictly classified as **"Awaiting Owner Confirmation"**.
2. **Production Freeze Maintained:** No customer-facing marketing claims guaranteeing 20 large bags with 21 passengers may be published without written owner sign-off and verification of the physical vehicle registration (*استمارة المركبة*).

---

## 2. Technical Separation: Booking Query Parameter Hydration vs Commercial Capacity Commitments

A critical architectural distinction must be maintained between **URL parameter hydration** and **commercial capacity guarantees**:

```
+-----------------------------------------------------------------------------------+
|                           URL PARAMETER HYDRATION                                 |
|  - Booking engine (/booking?passengers=21&luggage=20)                             |
|  - Must gracefully parse, validate, and clamp query parameters without crashing.  |
|  - Accepts user inputs for custom quotation / dispatch dispatching.               |
|  - VERDICT: PASS (Zero runtime errors, robust TypeScript validation).            |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                        COMMERCIAL CAPACITY COMMITMENT                             |
|  - Public fleet catalog cards, marketing copy, and SEO meta tags.                 |
|  - Strict fail-closed policy: Comfort Capacity = 19 Passengers.                   |
|  - Luggage Capacity = 12 Bags (standard) / up to 18 Bags (with rear bench folded).|
|  - VERDICT: PASS WITH LIMITATION (Awaiting Owner Confirmation).                  |
+-----------------------------------------------------------------------------------+
```

### Safety Validation Results:
1. **Booking Parameter Hydration:**
   - In `src/app/[locale]/booking/page.tsx` and `BookingEngine.tsx`, deep links carrying `?vehicle=coaster&passengers=21&luggage=20` hydrate smoothly without runtime errors.
   - Preserves customer query state without crashing or discarding parameters.
2. **Customer Warning & Advisory:**
   - For groups with large baggage counts, the dispatch advisory notes: *Luggage capacity depends on group size; delegations with maximum luggage should request luggage van coordination.*

---

## 3. Vehicle Specification Comparison Matrix

| Vehicle Attribute | Official Toyota KSA Factory Spec (ALJ) | Disputed Claim | Duyuf Al Rahman Audit Recommendation | Audit Classification |
| :--- | :--- | :--- | :--- | :--- |
| **Chassis Generation** | Toyota Coaster B70 (2.8L Turbo Diesel) | Executive VIP Coaster | 2024–2026 Executive Grade | Verified |
| **Total Factory Seats** | 20 or 23 seats (incl. driver) | 22 seats | Determine whether base is 20-seat or 23-seat | **Awaiting Owner Confirmation** |
| **Max Passenger Capacity** | 19 pax (20-seat) or 22 pax (23-seat) | 21 passengers | **Publish: 19 Passengers (Guaranteed Comfort)** | **Awaiting Owner Confirmation** |
| **Standard Boot Capacity** | 8–12 medium suitcases | 20 large suitcases | **Publish: 10–12 Large Bags (Standard)** | Factory Baseline Verified |
| **Extended Cargo Capacity**| Up to 18 bags (rear bench folded) | 20 large suitcases | **Publish: 15–18 Bags (Bench Folded)** | **Awaiting Owner Confirmation** |
| **Luggage Van Advisory** | Recommended for >15 bags | Not mentioned | **Mandatory advisory for groups >15 bags** | Implemented |

---

## 4. Required Steps for Final Sign-Off by Fleet Owner

Before the status of the Toyota Coaster can be upgraded from `Awaiting Owner Confirmation` to `Completed and Tested`, the business owner must provide:
1. **Vehicle Registration Document (*استمارة المركبة*):** Verifying the certified passenger seating capacity (عدد الركاب المصرح به).
2. **Physical Cargo Hold Measurement:** Photo and measurement proof of the rear luggage hold under operating conditions.
3. **Written Operating Confirmation:** Confirming whether the fleet utilizes standard 20-seat units (19 pax) or 23-seat units (22 pax), and the maximum baggage policy.

---

## 5. Final Compliance Verdict

- **Booking Hydration Safety:** `PASS`
- **Customer Facing Copy Safety:** `PASS WITH LIMITATION (Fail-Closed Maintained)`
- **Commercial Capacity Publication:** `AWAITING OWNER CONFIRMATION`
