const fs = require('fs');
const filePath = 'D:/royal-umrah-cabs/src/components/booking/BookingEngine.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Update calculateCurrentPriceSAR
const calcRegex = /const calculateCurrentPriceSAR = \(overrideVehicleId\?: string\) => \{[\s\S]*?return calculated \|\| 200;\s*\};/;
const calcReplacement = `const calculateCurrentPriceSAR = (overrideVehicleId?: string) => {
    const vId = overrideVehicleId || vehicleId;
    if (!vId) return 0;
    const calculated = getEstimatedBasePriceSAR({
      bookingType,
      routeId: bookingType === 'transfer' ? routeId : null,
      vehicleId: vId,
      durationHours: bookingType === 'hourly' ? durationHours : undefined,
      customRates: initialRates,
    });
    return calculated || 200;
  };`;
code = code.replace(calcRegex, calcReplacement);

// 2. Update handleProceedToStep3 to require vehicleId
const step3Regex = /const handleProceedToStep3 = \(\) => \{[\s\S]*?changeStep\(3\);\s*\};/;
const step3Replacement = `const handleProceedToStep3 = () => {
    if (!vehicleId) {
      setStep1Error(locale === 'ar' ? 'يرجى اختيار مركبة من القائمة للمتابعة' : 'Please select a vehicle from the fleet to proceed.');
      return;
    }
    setStep1Error(null);
    trackEvent({
      event: 'quote_calculated',
      service_type: bookingType,
      route: routeId,
      vehicle_id: vehicleId,
      price_sar: currentPriceSAR,
      currency,
    });
    changeStep(3);
  };`;
code = code.replace(step3Regex, step3Replacement);

// 3. Update summary schedule
code = code.replace(
  "<span>{pickupDate ? `${pickupDate} • ${pickupTime}` : 'Date & Time not set'}</span>",
  "<span>{pickupDate ? `${pickupDate} • ${pickupTime}` : (locale === 'ar' ? 'بانتظار تحديد الموعد (الخطوة 3)' : 'Schedule: Set in Step 3')}</span>"
);

// 4. Update summary vehicle placeholder
const vehicleSummaryRegex = /\{\/\* SELECTED VEHICLE \*\/\}[\s\S]*?(?=\{\/\* PARTY SIZE \*\/})/;
const vehicleSummaryReplacement = `{/* SELECTED VEHICLE */}
          <div className="space-y-2 text-xs pt-1 border-t border-border/60">
            <span className="text-[10px] font-bold text-ink-muted uppercase block">
              {t.summaryVehicle}
            </span>
            {vehicleId && VEHICLE_SPECS[vehicleId] ? (
              <div className="flex items-center gap-3 bg-bg-alt/70 p-2.5 rounded-xl border border-border">
                <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-surface shrink-0 border border-border">
                  <Image
                    src={VEHICLE_SPECS[vehicleId]?.img || '/assets/images/staria_exterior.webp'}
                    alt={VEHICLE_SPECS[vehicleId]?.name || 'Vehicle'}
                    fill
                    sizes="60px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-ink text-xs truncate">
                    {VEHICLE_SPECS[vehicleId]?.name}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-ink-muted">
                    <span>{VEHICLE_SPECS[vehicleId]?.seats} {t.seatsLabel}</span>
                    <span>•</span>
                    <span>{VEHICLE_SPECS[vehicleId]?.bags} {t.bagsLabel}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-bg-alt/40 p-2.5 rounded-xl border border-dashed border-border-strong">
                <div className="w-10 h-8 rounded-lg bg-surface flex items-center justify-center text-ink-muted shrink-0 border border-border">
                  <Car className="w-4 h-4 text-gold-dark/70" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink text-xs">
                    {locale === 'ar' ? 'المركبة: بانتظار الاختيار' : 'Vehicle: Pending Selection'}
                  </p>
                  <p className="text-[10px] text-ink-muted">
                    {locale === 'ar' ? 'اختر مركبتك في الخطوة 2' : 'Select vehicle in Step 2'}
                  </p>
                </div>
              </div>
            )}
          </div>

          `;
code = code.replace(vehicleSummaryRegex, vehicleSummaryReplacement);

// 5. Update summary total fare placeholder
const fareSummaryRegex = /\{\/\* AUTHORITATIVE TOTAL PRICE \*\/\}[\s\S]*?(?=\{\/\* TRUST BADGES LIST \*\/})/;
const fareSummaryReplacement = `{/* AUTHORITATIVE TOTAL PRICE */}
          <div className="pt-3 border-t border-border">
            <span className="text-[10px] text-ink-muted uppercase block mb-0.5">
              {t.summaryTotalFare}
            </span>
            {vehicleId && currentPriceSAR > 0 ? (
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-3xl text-ink">
                  {formatPrice(currentPriceSAR)}
                </span>
                <span className="text-xs text-ink-muted font-normal">
                  ({currentPriceSAR} SAR)
                </span>
              </div>
            ) : (
              <div className="py-1">
                <span className="font-display font-bold text-base text-gold-dark block">
                  {locale === 'ar' ? 'بانتظار تحديد السيارة' : 'Pending Vehicle Selection'}
                </span>
                <span className="text-[10px] text-ink-muted block mt-0.5">
                  {locale === 'ar' ? 'تُحسب الأجرة تلقائياً في الخطوة 2' : 'Fare calculated accurately in Step 2'}
                </span>
              </div>
            )}
            <p className="text-[11px] text-ink-muted mt-1">
              {t.summaryZeroAdvance}
            </p>
          </div>

          `;
code = code.replace(fareSummaryRegex, fareSummaryReplacement);

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully patched BookingEngine.tsx');
