const fs = require('fs');
const filePath = 'D:/royal-umrah-cabs/src/components/booking/BookingWizard.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// Replace the return block in BookingWizard with the new horizontal stepper + full-width BookingEngine
const targetRegex = /return \([\s\S]*?export default BookingWizard;/;

const newImplementation = `return (
    <div
      className={\`w-full max-w-7xl mx-auto \${isRtl ? 'rtl' : 'ltr'}\`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ARIA LIVE REGION */}
      <div
        ref={liveRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* =====================================================================
          UNIFIED HORIZONTAL LUXURY STEPPER (Desktop & Tablet)
      ===================================================================== */}
      <div className="hidden md:block mb-8">
        <div className="bg-surface rounded-2xl border border-border p-4 sm:p-5 shadow-xs">
          <div className="grid grid-cols-4 gap-3 sm:gap-4" role="navigation" aria-label={ui.progressLabel}>
            {STEPS.map((step) => {
              const isActive = step.number === currentStep;
              const isDone = completedSteps.has(step.number);
              const isClickable = isDone && Boolean(goToStep);

              return (
                <button
                  key={step.number}
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && goToStep(step.number)}
                  className={\`
                    flex items-center gap-3 p-3 rounded-xl border text-start transition-all duration-200
                    \${
                      isActive
                        ? 'bg-gold-soft/50 border-gold shadow-xs'
                        : isDone
                        ? 'bg-surface border-border-strong hover:bg-bg-alt cursor-pointer'
                        : 'bg-bg-alt/40 border-border/60 opacity-65 cursor-default'
                    }
                  \`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <div
                    className={\`
                      w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold transition-all
                      \${
                        isActive
                          ? 'bg-gold-dark text-white shadow-xs'
                          : isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-surface text-ink-muted border border-border'
                      }
                    \`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : step.number}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={\`text-xs font-bold truncate \${isActive ? 'text-ink' : isDone ? 'text-ink' : 'text-ink-muted'}\`}>
                      {ui[step.titleKey]}
                    </p>
                    <p className="text-[10px] text-ink-muted truncate hidden lg:block">
                      {ui[step.descKey]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          MOBILE HEADER (< md)
      ===================================================================== */}
      <div className="md:hidden mb-6">
        <div
          className="rounded-2xl overflow-hidden border border-border bg-surface p-4 shadow-xs"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-[10px] text-gold-dark uppercase tracking-wider font-bold">
                {ui.stepOf} {currentStep} / {STEPS.length}
              </p>
              <h2 className="text-sm font-bold text-ink mt-0.5">
                {currentStepData ? ui[currentStepData.titleKey] : ''}
              </h2>
            </div>
            {/* WhatsApp quick-link */}
            <a
              href={buildWhatsappUrl(WA_PRIMARY, LOCALE_CONFIG[locale]?.whatsappGreeting || '')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/20 transition-colors"
              aria-label={ui.whatsappLabel}
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{ui.whatsappLabel}</span>
            </a>
          </div>

          {/* Horizontal progress dots */}
          <HorizontalDots
            totalSteps={STEPS.length}
            currentStep={currentStep}
            ui={ui}
            isRtl={isRtl}
          />
        </div>
      </div>

      {/* =====================================================================
          MAIN BOOKING WORKSPACE (2-Column Desktop: 65% Form / 35% Summary)
      ===================================================================== */}
      <div className={\`w-full transition-opacity duration-150 \${isTransitioning ? 'opacity-0' : 'opacity-100'}\`}>
        <BookingEngine
          locale={locale}
          dict={dict}
          settings={settings}
          initialRoute={initialRoute}
          initialVehicle={initialVehicle}
          initialDate={initialDate}
          initialTime={initialTime}
          initialPassengers={initialPassengers}
          initialLuggage={initialLuggage}
          initialType={initialType}
          initialDuration={initialDuration}
          initialPickup={initialPickup}
          initialDropoff={initialDropoff}
          initialRates={initialRates}
          hideInternalStepper={true}
          stepOverride={currentStep as 1 | 2 | 3 | 4}
          onStepChange={(s) => goToStep(s)}
        />
      </div>

      {/* =====================================================================
          VIP CONCIERGE BANNER (Discreet footer strip)
      ===================================================================== */}
      <div className="mt-8 p-4 sm:p-5 rounded-2xl border border-gold-line bg-gold-soft/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-soft border border-gold-line flex items-center justify-center text-gold-dark shrink-0">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-xs sm:text-sm text-ink">
              {ui.conciergeTitle}
            </p>
            <p className="text-[11px] text-ink-muted">
              {ui.conciergeDesc}
            </p>
          </div>
        </div>
        <a
          href={buildWhatsappUrl(WA_CONCIERGE, LOCALE_CONFIG[locale]?.whatsappGreeting || '')}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EB657] active:scale-95 transition-all shadow-xs"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{ui.conciergeBtn}</span>
        </a>
      </div>
    </div>
  );
}

export default BookingWizard;`;

code = code.replace(targetRegex, newImplementation);
fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated BookingWizard.tsx');
