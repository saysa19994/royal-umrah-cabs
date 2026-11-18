import fs from 'fs';

const pagePath = 'src/app/[locale]/pricing/page.tsx';
let content = fs.readFileSync(pagePath, 'utf-8');

// 1. Add swipe cue above packages grid on mobile
content = content.replace(
  `<div className="packages-grid">`,
  `<div className="md:hidden text-center mb-2">
            <span className="text-[11px] text-[#D6A13A] bg-[#141D2C] px-3 py-1 rounded-full border border-[#D6A13A]/30">
              {isAr ? 'اسحب لعرض باقات السيارات ⟵' : 'Swipe to view packages ⟶'}
            </span>
          </div>
          <div className="packages-grid">`
);

// 2. Make Section 6 (Detailed calculator) collapsible on mobile so it doesn't inflate page height
content = content.replace(
  `<section className="py-12 border-t border-white/10 bg-[#090D15]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141D2C] border border-[#D6A13A]/40 text-xs font-bold text-[#D6A13A] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'حاسبة وتفاصيل جميع المسارات' : 'All Routes & Interactive Fares'}</span>
            </div>
            <h2 className="font-playfair font-serif text-2xl sm:text-3xl text-[#F6F3ED] font-bold">
              {isAr ? 'تصفح كافة المسارات والسيارات حسب طلبك' : 'Browse All Custom Routes & Vehicles'}
            </h2>
          </div>

          <RouteBasedPricingExperience
            locale={locale}
            dict={dict}
            initialRates={initialRates}
            taifEnabled={settings.taif_enabled !== false}
            riyadhEnabled={settings.riyadh_enabled !== false}
          />
        </div>
      </section>`,
  `<section className="py-8 sm:py-12 border-t border-white/10 bg-[#090D15]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Mobile Accordion Wrapper / Desktop Standard View */}
          <details className="group md:open" open>
            <summary className="md:hidden flex items-center justify-between p-4 rounded-xl bg-[#101725] border border-white/10 cursor-pointer list-none mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D6A13A]" />
                <span className="text-xs font-bold text-[#F6F3ED]">
                  {isAr ? 'حاسبة وتفاصيل جميع المسارات المخصصة' : 'All Custom Routes & Detailed Fares'}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#D6A13A] transition-transform group-open:rotate-90" />
            </summary>

            <div className="hidden md:block mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141D2C] border border-[#D6A13A]/40 text-xs font-bold text-[#D6A13A] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'حاسبة وتفاصيل جميع المسارات' : 'All Routes & Interactive Fares'}</span>
              </div>
              <h2 className="font-playfair font-serif text-2xl sm:text-3xl text-[#F6F3ED] font-bold">
                {isAr ? 'تصفح كافة المسارات والسيارات حسب طلبك' : 'Browse All Custom Routes & Vehicles'}
              </h2>
            </div>

            <div className="mt-2">
              <RouteBasedPricingExperience
                locale={locale}
                dict={dict}
                initialRates={initialRates}
                taifEnabled={settings.taif_enabled !== false}
                riyadhEnabled={settings.riyadh_enabled !== false}
              />
            </div>
          </details>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. STICKY MOBILE CONVERSION BAR (Matching Reference Mockup)
      ────────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-50 p-3 bg-[#101725]/95 backdrop-blur-xl border-t border-white/10 md:hidden flex items-center justify-between gap-3 shadow-2xl">
        <Link
          href={\`/\${locale}/booking\`}
          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#E5B14B] via-[#D6A13A] to-[#A97B27] text-[#090D15] font-extrabold text-xs text-center shadow-lg active:scale-95 transition-transform"
        >
          {isAr ? 'احجز رحلتك الآن' : 'Book Your Journey'}
        </Link>
        <a
          href="https://wa.me/966567588261"
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 rounded-xl bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] flex items-center justify-center gap-1.5 shrink-0 text-xs font-bold"
        >
          <span>WhatsApp</span>
        </a>
      </div>`
);

fs.writeFileSync(pagePath, content, 'utf-8');
console.log('Updated pricing/page.tsx with mobile swipe cues and sticky conversion bar!');
