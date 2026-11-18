import { readFileSync, writeFileSync } from 'fs';

let c = readFileSync('src/components/booking/BookingEngine.tsx', 'utf8');

// Replace the JSX from line 1240 downwards
// Let's find where Step 1 starts:
const step1StartMarker = '{/* ============================================================== */}\r\n        {/* STEP 1: ROUTE & SCHEDULE';
const altStep1StartMarker = '{/* ============================================================== */}\n        {/* STEP 1: ROUTE & SCHEDULE';

let step1Idx = c.indexOf(step1StartMarker);
if (step1Idx === -1) step1Idx = c.indexOf(altStep1StartMarker);

// Find where Step 3 ends (just before the Right Column or end of form)
const step3EndMarker = '{/* RIGHT COLUMN: STICKY BOOKING SUMMARY CARD';
let step3EndIdx = c.indexOf(step3EndMarker);

console.log('step1Idx:', step1Idx, 'step3EndIdx:', step3EndIdx);

if (step1Idx === -1 || step3EndIdx === -1) {
  console.error('Could not find markers for step replacement.');
  process.exit(1);
}

// Generate the 4-step JSX
const fourStepsJSX = `{/* ============================================================== */}
        {/* STEP 1: ROUTE & SERVICE                                        */}
        {/* ============================================================== */}
        {currentStep === 1 && (
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-8 shadow-xs space-y-6 text-start animate-fadeIn">
            <div className="border-b border-border pb-3">
              <h3 className="font-display font-bold text-xl text-ink">
                {t.step1Title}
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                {t.routeLabel} • {t.fixedFareLabel}
              </p>
            </div>

            {/* ROUTE SELECTOR (TRANSFER) */}
            {bookingType === 'transfer' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="highway-route-select" className="block text-xs font-bold text-ink mb-1.5">
                    {t.routeLabel} <span className="text-gold-dark">*</span>
                  </label>
                  <select
                    id="highway-route-select"
                    value={routeId}
                    onChange={(e) => setRouteId(e.target.value)}
                    className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-bg-alt text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  >
                    {availableRoutes.map(([rKey, rData]) => {
                      const localizedName = LOCALIZED_ROUTE_NAMES[rKey]?.[locale] || rData.label;
                      return (
                        <option key={rKey} value={rKey}>
                          {localizedName}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="custom-pickup-input" className="block text-xs font-bold text-ink mb-1.5">
                      {t.pickupLabel}
                    </label>
                    <div className="relative">
                      <input
                        id="custom-pickup-input"
                        type="text"
                        placeholder="e.g. Terminal 1, Gate 4"
                        value={customPickupLocation}
                        onChange={(e) => setCustomPickupLocation(e.target.value)}
                        className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                      <MapPin className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="custom-dropoff-input" className="block text-xs font-bold text-ink mb-1.5">
                      {t.dropoffLabel}
                    </label>
                    <div className="relative">
                      <input
                        id="custom-dropoff-input"
                        type="text"
                        placeholder="e.g. Fairmont Makkah Clock Royal"
                        value={customDropoffLocation}
                        onChange={(e) => setCustomDropoffLocation(e.target.value)}
                        className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                      />
                      <MapPin className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* HOURLY CHAUFFEUR DURATION */}
            {bookingType === 'hourly' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="duration-select" className="block text-xs font-bold text-ink mb-1.5">
                    {t.durationLabel} <span className="text-gold-dark">*</span>
                  </label>
                  <select
                    id="duration-select"
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-bg-alt text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  >
                    {[3, 4, 6, 8, 10, 12].map((hrs) => (
                      <option key={hrs} value={hrs}>
                        {hrs} {t.hoursSuffix}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="hourly-pickup-input" className="block text-xs font-bold text-ink mb-1.5">
                      {t.pickupLabel} <span className="text-gold-dark">*</span>
                    </label>
                    <input
                      id="hourly-pickup-input"
                      type="text"
                      placeholder="e.g. Jeddah Hotel / Airport"
                      value={customPickupLocation}
                      onChange={(e) => setCustomPickupLocation(e.target.value)}
                      className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="hourly-dest-input" className="block text-xs font-bold text-ink mb-1.5">
                      {t.dropoffLabel} <span className="text-gold-dark">*</span>
                    </label>
                    <input
                      id="hourly-dest-input"
                      type="text"
                      placeholder="e.g. As directed by passenger"
                      value={customDropoffLocation}
                      onChange={(e) => setCustomDropoffLocation(e.target.value)}
                      className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ZIYARAT DESTINATIONS */}
            {bookingType === 'ziyarat' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="ziyarat-pickup-input" className="block text-xs font-bold text-ink mb-1.5">
                    {t.pickupLabel} (Hotel / Area) <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    id="ziyarat-pickup-input"
                    type="text"
                    placeholder="e.g. Makkah Clock Tower or Madinah Central"
                    value={customPickupLocation}
                    onChange={(e) => setCustomPickupLocation(e.target.value)}
                    className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label htmlFor="ziyarat-dest-input" className="block text-xs font-bold text-ink mb-1.5">
                    {t.dropoffLabel} (Ziyarat Sites) <span className="text-gold-dark">*</span>
                  </label>
                  <input
                    id="ziyarat-dest-input"
                    type="text"
                    placeholder="e.g. Cave Hira, Jabal Thawr, Masjid Quba, Uhud"
                    value={customDropoffLocation}
                    onChange={(e) => setCustomDropoffLocation(e.target.value)}
                    className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                </div>
              </div>
            )}

            {/* GROUP BUS & COACH */}
            {bookingType === 'group_bus' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="group-route-select" className="block text-xs font-bold text-ink mb-1.5">
                    {t.routeLabel} <span className="text-gold-dark">*</span>
                  </label>
                  <select
                    id="group-route-select"
                    value={routeId}
                    onChange={(e) => setRouteId(e.target.value)}
                    className="w-full min-h-[48px] h-12 px-3 rounded-btn border border-border-strong bg-bg-alt text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  >
                    {Object.entries(ROUTES).map(([rKey, rData]) => (
                      <option key={rKey} value={rKey}>
                        {rData.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* PASSENGERS & LUGGAGE RECOMMENDATION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor="pax-select" className="block text-xs font-bold text-ink mb-1.5">
                  {t.passengersLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <select
                    id="pax-select"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25].map((num) => (
                      <option key={num} value={num}>
                        {num} {t.passengersLabel}
                      </option>
                    ))}
                  </select>
                  <Users className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="luggage-select" className="block text-xs font-bold text-ink mb-1.5">
                  {t.luggageLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <select
                    id="luggage-select"
                    value={luggage}
                    onChange={(e) => setLuggage(Number(e.target.value))}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold cursor-pointer"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {t.luggageLabel}
                      </option>
                    ))}
                  </select>
                  <Luggage className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="pt-4 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={handleProceedToStep2}
                className="w-full sm:w-auto min-h-[48px] h-12 px-8 rounded-btn bg-gold text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>{t.step1Btn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 2: CHOOSE VEHICLE & FARE SELECTION                        */}
        {/* ============================================================== */}
        {currentStep === 2 && (
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-8 shadow-xs space-y-6 text-start animate-fadeIn">
            {/* TRIP SUMMARY PILL */}
            <div className="bg-bg-alt p-3.5 rounded-xl border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <span className="font-bold text-ink flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold-dark" />
                  {activeItinerary}
                </span>
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gold-dark" />
                  {passengers} Pax • {luggage} Bags
                </span>
              </div>
              <button
                type="button"
                onClick={() => changeStep(1)}
                className="text-xs font-bold text-gold-dark hover:underline flex items-center gap-1 shrink-0 self-end sm:self-auto"
              >
                <Edit2 className="w-3 h-3" />
                <span>{t.stepBack}</span>
              </button>
            </div>

            <div className="border-b border-border pb-3">
              <h3 className="font-display font-bold text-xl text-ink">
                {t.step2Title}
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                {t.fixedFareLabel} — {t.summaryZeroAdvance}
              </p>
            </div>

            {/* DIRECT-BOOKING VEHICLES GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(VEHICLE_SPECS)
                .filter(([vId]) => (bookingType === 'group_bus' ? vId === 'hiace' || vId === 'coaster' : true))
                .map(([vId, vData]) => {
                  const isSelected = vehicleId === vId;
                  const vehicleEstimatedFare =
                    getEstimatedBasePriceSAR({
                      bookingType,
                      routeId: bookingType === 'transfer' ? routeId : null,
                      vehicleId: vId,
                      durationHours: bookingType === 'hourly' ? durationHours : undefined,
                      customRates: initialRates,
                    }) || 200;

                  const isOverSeats = passengers > vData.seats;
                  const isOverBags = luggage > vData.bags;

                  return (
                    <div
                      key={vId}
                      onClick={() => handleSelectVehicle(vId)}
                      className={\`rounded-2xl p-4 border-2 transition-all cursor-pointer relative flex flex-col justify-between overflow-hidden \${
                        isSelected
                          ? 'border-gold bg-gold-soft/35 shadow-md ring-2 ring-gold/40'
                          : 'border-border bg-surface hover:border-gold-line'
                      }\`}
                    >
                      {isSelected && (
                        <>
                          <BorderBeam size={180} duration={8} colorFrom="#D6A13A" colorTo="#F2C94C" />
                          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-gold text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-xs z-10">
                            <Check className="w-3 h-3" />
                            <span>{t.selectedBadge}</span>
                          </div>
                        </>
                      )}

                      <div>
                        <div className="relative w-full h-32 rounded-xl overflow-hidden bg-bg-alt mb-3 border border-border/60">
                          <Image
                            src={vData.img}
                            alt={vData.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>

                        <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block mb-1">
                          {vData.category}
                        </span>
                        <h4 className="font-display font-bold text-base sm:text-lg text-ink mb-2">
                          {vData.name}
                        </h4>

                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={\`text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 \${
                              isOverSeats
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-bg-alt text-ink border border-border'
                            }\`}
                          >
                            <Users className="w-3 h-3 text-gold-dark" />
                            <span>{vData.seats} {t.seatsLabel}</span>
                          </span>
                          <span
                            className={\`text-xs px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 \${
                              isOverBags
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-bg-alt text-ink border border-border'
                            }\`}
                          >
                            <Luggage className="w-3 h-3 text-gold-dark" />
                            <span>{vData.bags} {t.bagsLabel}</span>
                          </span>
                        </div>

                        {(isOverSeats || isOverBags) && (
                          <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg mb-3 font-medium">
                            {t.capacityNotice}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-ink-muted uppercase block">{t.authoritativeFare}</span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-display font-bold text-xl text-ink">
                              {formatPrice(vehicleEstimatedFare)}
                            </span>
                            <span className="text-[11px] text-ink-muted">({vehicleEstimatedFare} SAR)</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectVehicle(vId);
                          }}
                          className={\`min-h-[40px] px-4 rounded-btn text-xs font-bold transition-all \${
                            isSelected
                              ? 'bg-slate-950 text-gold shadow-xs'
                              : 'bg-bg-alt text-ink hover:bg-gold-soft border border-border'
                          }\`}
                        >
                          {isSelected ? t.selectedBadge : t.selectVehicleBtn}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* VIP CONCIERGE & DIPLOMATIC FLEET (Mercedes-Maybach & Hyundai H1) */}
            {bookingType !== 'group_bus' && (
              <div className="pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-dark" />
                  <h4 className="font-display font-bold text-sm sm:text-base text-ink">
                    {t.conciergeSectionTitle}
                  </h4>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {t.conciergeNotice}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {Object.entries(CONCIERGE_VEHICLES).map(([cvId, cvData]) => {
                    const waGreeting = \`Assalamu Alaikum Duyuf Al Rahman VIP, I would like to inquire about booking the \${cvData.name} for route: \${activeItinerary}.\`;
                    const waUrl = \`https://wa.me/966505316971?text=\${encodeURIComponent(waGreeting)}\`;

                    return (
                      <div
                        key={cvId}
                        className="rounded-2xl p-4 border border-gold/30 bg-gold/5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative w-full h-28 rounded-xl overflow-hidden bg-bg-alt mb-3 border border-border/60">
                            <Image
                              src={cvData.img}
                              alt={cvData.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover"
                            />
                            <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-slate-950/90 text-gold px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border border-gold/40">
                              {t.conciergeBadge}
                            </div>
                          </div>

                          <span className="text-[10px] font-bold text-gold-dark uppercase tracking-wider block mb-0.5">
                            {cvData.category}
                          </span>
                          <h5 className="font-display font-bold text-sm text-ink mb-2">
                            {cvData.name}
                          </h5>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[11px] px-2 py-0.5 rounded bg-bg-alt text-ink border border-border flex items-center gap-1 font-semibold">
                              <Users className="w-3 h-3 text-gold-dark" />
                              <span>{cvData.seats} {t.seatsLabel}</span>
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-bg-alt text-ink border border-border flex items-center gap-1 font-semibold">
                              <Luggage className="w-3 h-3 text-gold-dark" />
                              <span>{cvData.bags} {t.bagsLabel}</span>
                            </span>
                          </div>
                        </div>

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full min-h-[40px] px-3 py-2 rounded-btn bg-[#25D366] text-white hover:bg-[#1EB657] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{t.conciergeInquireBtn}</span>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => changeStep(1)}
                className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn border border-border text-ink text-xs font-semibold hover:bg-bg-alt transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{t.stepBack}</span>
              </button>

              <button
                type="button"
                onClick={handleProceedToStep3}
                className="w-full sm:w-auto min-h-[48px] h-12 px-8 rounded-btn bg-gold text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>{t.step2Btn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 3: SCHEDULE & TRIP DETAILS                                */}
        {/* ============================================================== */}
        {currentStep === 3 && (
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-8 shadow-xs space-y-6 text-start animate-fadeIn">
            {/* TRIP SUMMARY PILL */}
            <div className="bg-bg-alt p-3.5 rounded-xl border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <span className="font-bold text-ink flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold-dark" />
                  {activeItinerary}
                </span>
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-gold-dark" />
                  {VEHICLE_SPECS[vehicleId]?.name || vehicleId}
                </span>
                <span className="text-ink-muted font-bold text-gold-dark">
                  {formatPrice(currentPriceSAR)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => changeStep(2)}
                className="text-xs font-bold text-gold-dark hover:underline flex items-center gap-1 shrink-0 self-end sm:self-auto"
              >
                <Edit2 className="w-3 h-3" />
                <span>{t.stepBack}</span>
              </button>
            </div>

            <div className="border-b border-border pb-3">
              <h3 className="font-display font-bold text-xl text-ink">
                {t.step3Title}
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                {t.timeNotice}
              </p>
            </div>

            {/* DATE & TIME CONTROLS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor="pickup-date-input" className="block text-xs font-bold text-ink mb-1.5">
                  {t.dateLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="pickup-date-input"
                    type="date"
                    required
                    min={minDate}
                    value={pickupDate}
                    onChange={(e) => {
                      setPickupDate(e.target.value);
                      if (step1Error) setStep1Error(null);
                    }}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Calendar className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="pickup-time-input" className="block text-xs font-bold text-ink mb-1.5">
                  {t.timeLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="pickup-time-input"
                    type="time"
                    required
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Clock className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* FLIGHT NUMBER (OPTIONAL) */}
            <div>
              <label htmlFor="flight-input" className="block text-xs font-bold text-ink mb-1.5">
                {t.flightLabel}
              </label>
              <div className="relative">
                <input
                  id="flight-input"
                  type="text"
                  placeholder={t.flightPlaceholder}
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                  className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Plane className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {flightNumber && (
                <p className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.flightNotice}</span>
                </p>
              )}
            </div>

            {/* COMPLIMENTARY INCLUSIONS (NO Zamzam water per Prompt 11 rule) */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-ink mb-2">
                {t.addOnsTitle}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <label className="flex items-center gap-2.5 p-3 min-h-[48px] rounded-xl bg-bg-alt/60 border border-border cursor-pointer hover:border-gold-line transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.child_seat}
                    onChange={(e) => setAddOns({ ...addOns, child_seat: e.target.checked })}
                    className="rounded text-gold focus:ring-gold w-4 h-4"
                  />
                  <span className="font-medium text-ink">{t.addOnChildSeat}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 min-h-[48px] rounded-xl bg-bg-alt/60 border border-border cursor-pointer hover:border-gold-line transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.flight_tracking}
                    onChange={(e) => setAddOns({ ...addOns, flight_tracking: e.target.checked })}
                    className="rounded text-gold focus:ring-gold w-4 h-4"
                  />
                  <span className="font-medium text-ink">{t.addOnFlightTracking}</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 min-h-[48px] rounded-xl bg-bg-alt/60 border border-border cursor-pointer hover:border-gold-line transition-colors">
                  <input
                    type="checkbox"
                    checked={addOns.malay_driver}
                    onChange={(e) => setAddOns({ ...addOns, malay_driver: e.target.checked })}
                    className="rounded text-gold focus:ring-gold w-4 h-4"
                  />
                  <span className="font-medium text-ink">{t.addOnMalayDriver}</span>
                </label>
              </div>
            </div>

            {/* ERROR BANNER */}
            {step1Error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{step1Error}</span>
              </div>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => changeStep(2)}
                className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn border border-border text-ink text-xs font-semibold hover:bg-bg-alt transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{t.stepBack}</span>
              </button>

              <button
                type="button"
                onClick={handleProceedToStep4}
                className="w-full sm:w-auto min-h-[48px] h-12 px-8 rounded-btn bg-gold text-slate-950 font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-gold-hover hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span>{t.step3Btn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* STEP 4: PASSENGER DETAILS & MANDATORY PAYMENT POLICY           */}
        {/* ============================================================== */}
        {currentStep === 4 && (
          <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-5 sm:p-8 shadow-xs space-y-6 text-start animate-fadeIn">
            {/* TRIP SUMMARY PILL */}
            <div className="bg-bg-alt p-3.5 rounded-xl border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <span className="font-bold text-ink flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold-dark" />
                  {activeItinerary}
                </span>
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gold-dark" />
                  {pickupDate} • {pickupTime}
                </span>
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-gold-dark" />
                  {VEHICLE_SPECS[vehicleId]?.name || vehicleId}
                </span>
                <span className="text-gold-dark font-bold">
                  {formatPrice(currentPriceSAR)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => changeStep(3)}
                className="text-xs font-bold text-gold-dark hover:underline flex items-center gap-1 shrink-0 self-end sm:self-auto"
              >
                <Edit2 className="w-3 h-3" />
                <span>{t.stepBack}</span>
              </button>
            </div>

            <div className="border-b border-border pb-3">
              <h3 className="font-display font-bold text-xl text-ink">
                {t.step4Title}
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                {t.summaryZeroAdvance}
              </p>
            </div>

            {/* PASSENGER INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="customer-name-input" className="block text-xs font-bold text-ink mb-1.5">
                  {t.nameLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="customer-name-input"
                    type="text"
                    required
                    placeholder={t.namePlaceholder}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <User className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="customer-phone-input" className="block text-xs font-bold text-ink mb-1.5">
                  {t.phoneLabel} <span className="text-gold-dark">*</span>
                </label>
                <div className="relative">
                  <input
                    id="customer-phone-input"
                    type="tel"
                    inputMode="tel"
                    required
                    placeholder={t.phonePlaceholder}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Phone className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="customer-email-input" className="block text-xs font-bold text-ink mb-1.5">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <input
                    id="customer-email-input"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full min-h-[48px] h-12 pl-10 pr-3 rtl:pr-10 rtl:pl-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold"
                  />
                  <Mail className="w-4 h-4 text-gold-dark absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* SPECIAL NOTES */}
            <div>
              <label htmlFor="customer-notes-input" className="block text-xs font-bold text-ink mb-1.5">
                {t.specialNotesLabel}
              </label>
              <textarea
                id="customer-notes-input"
                rows={2}
                placeholder={t.specialNotesPlaceholder}
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full p-3 rounded-btn border border-border-strong bg-surface text-ink text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gold resize-none"
              />
            </div>

            {/* STRICT MANDATORY PAYMENT POLICY CARD */}
            <div className="pt-2">
              <div className="bg-gold-soft/50 rounded-2xl p-5 border-2 border-gold/70 shadow-xs relative overflow-hidden">
                <BorderBeam size={220} duration={12} colorFrom="#10B981" colorTo="#D6A13A" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gold text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                    <Banknote className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display font-bold text-base sm:text-lg text-ink">
                        {t.paymentTitle}
                      </h4>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950 text-gold text-[11px] font-extrabold uppercase tracking-wider shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.paymentBadge}</span>
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed font-light">
                      {t.paymentDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* TURNSTILE ANTI-BOT WIDGET */}
            <div className="pt-2 flex justify-center">
              <TurnstileWidget
                locale={locale}
                onVerify={(token) => setTurnstileToken(token)}
              />
            </div>

            {/* ERROR DISPLAY */}
            {errorMessage && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* SUBMIT AND BACK BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => changeStep(3)}
                disabled={isSubmitting}
                className="w-full sm:w-auto min-h-[48px] h-12 px-6 rounded-btn border border-border text-ink text-xs font-semibold hover:bg-bg-alt transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{t.stepBack}</span>
              </button>

              <ShimmerButton
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-h-[48px] h-12 px-8 rounded-btn"
                shimmerColor="#F2C94C"
                shimmerDuration="2.5s"
                background="linear-gradient(135deg, #D6A13A 0%, #B58428 100%)"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span className="font-bold text-slate-950 uppercase tracking-wider text-xs sm:text-sm">{t.submittingText}</span>
                  </>
                ) : (
                  <>
                    <span className="font-bold text-slate-950 uppercase tracking-wider text-xs sm:text-sm">{t.submitBtn}</span>
                    <ArrowRight className="w-4 h-4 text-slate-950 rtl:rotate-180" />
                  </>
                )}
              </ShimmerButton>
            </div>
          </form>
        )}
      </div>
`;

// Replace from step1Idx to step3EndIdx
const before = c.substring(0, step1Idx);
const after = c.substring(step3EndIdx);

const updatedContent = before + fourStepsJSX + after;
writeFileSync('src/components/booking/BookingEngine.tsx', updatedContent, 'utf8');
console.log('Successfully written 4-step JSX to BookingEngine.tsx');
