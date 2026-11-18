import fs from 'fs';

let footer = fs.readFileSync('d:/royal-umrah-cabs/src/components/layout/Footer.tsx', 'utf8');

// 1. Add ChevronDown to imports if not already present
if (!footer.includes('ChevronDown,')) {
  footer = footer.replace('HandCoins,', 'HandCoins,\n  ChevronDown,');
}

// 2. Add openSections state
const stateCode = `  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    routes: false,
    fleet: false,
    guides: false,
    legal: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };
`;

if (!footer.includes('openSections')) {
  footer = footer.replace('const t = FOOTER_EXTRA_I18N[locale] || FOOTER_EXTRA_I18N.en;', 'const t = FOOTER_EXTRA_I18N[locale] || FOOTER_EXTRA_I18N.en;\n\n' + stateCode);
}

// 3. Replace background colors and borders
footer = footer.replace('bg-[#1F2B24] text-[#E7E2D9] border-t border-[#354B3F]/70', 'bg-[#101827] text-[#E7E2D9] border-t border-white/10');
footer = footer.replace('border-y border-[#354B3F]/60 bg-[#16201B]', 'border-y border-white/10 bg-[#0D1522]');
footer = footer.replaceAll('border-b border-[#354B3F]/60', 'border-b border-[#A97B27]/40');

// 4. Update Col 2 (Popular Routes) header with accordion
footer = footer.replace(
  `          {/* COL 2: POPULAR ROUTES */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#F7F5F0] mb-3.5 font-serif text-sm border-b border-[#A97B27]/40 pb-1.5">
              {dict.footer.popularRoutes}
            </h4>
            <ul className="space-y-2 text-xs text-[#C8BBA7]">`,
  `          {/* COL 2: POPULAR ROUTES */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('routes')}
              className="w-full flex items-center justify-between pb-1.5 border-b border-[#A97B27]/40 mb-3.5 text-start cursor-pointer md:cursor-default"
              aria-expanded={openSections.routes}
            >
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#F7F5F0] font-serif text-sm">
                {dict.footer.popularRoutes}
              </h4>
              <ChevronDown className={\`w-4 h-4 text-[#C5A15D] md:hidden transition-transform duration-200 \${openSections.routes ? 'rotate-180' : ''}\`} />
            </button>
            <ul className={\`space-y-2 text-xs text-[#C8BBA7] \${openSections.routes ? 'block' : 'hidden'} md:block\`}>`
);

// 5. Update Col 3 (Services & Fleet) header with accordion
footer = footer.replace(
  `          {/* COL 3: SERVICES & FLEET */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#F7F5F0] mb-3.5 font-serif text-sm border-b border-[#A97B27]/40 pb-1.5">
              {dict.footer.servicesFleet}
            </h4>
            <ul className="space-y-2 text-xs text-[#C8BBA7]">`,
  `          {/* COL 3: SERVICES & FLEET */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('fleet')}
              className="w-full flex items-center justify-between pb-1.5 border-b border-[#A97B27]/40 mb-3.5 text-start cursor-pointer md:cursor-default"
              aria-expanded={openSections.fleet}
            >
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#F7F5F0] font-serif text-sm">
                {dict.footer.servicesFleet}
              </h4>
              <ChevronDown className={\`w-4 h-4 text-[#C5A15D] md:hidden transition-transform duration-200 \${openSections.fleet ? 'rotate-180' : ''}\`} />
            </button>
            <ul className={\`space-y-2 text-xs text-[#C8BBA7] \${openSections.fleet ? 'block' : 'hidden'} md:block\`}>`
);

// 6. Update Col 4 (Guides) header with accordion
footer = footer.replace(
  `          {/* COL 4: PILGRIM GUIDES & TOOLS */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#F7F5F0] mb-3.5 font-serif text-sm border-b border-[#A97B27]/40 pb-1.5">
              {t.guidesHeader}
            </h4>
            <ul className="space-y-2 text-xs text-[#C8BBA7]">`,
  `          {/* COL 4: PILGRIM GUIDES & TOOLS */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('guides')}
              className="w-full flex items-center justify-between pb-1.5 border-b border-[#A97B27]/40 mb-3.5 text-start cursor-pointer md:cursor-default"
              aria-expanded={openSections.guides}
            >
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#F7F5F0] font-serif text-sm">
                {t.guidesHeader}
              </h4>
              <ChevronDown className={\`w-4 h-4 text-[#C5A15D] md:hidden transition-transform duration-200 \${openSections.guides ? 'rotate-180' : ''}\`} />
            </button>
            <ul className={\`space-y-2 text-xs text-[#C8BBA7] \${openSections.guides ? 'block' : 'hidden'} md:block\`}>`
);

// 7. Update Col 5 (Legal) header with accordion
footer = footer.replace(
  `          {/* COL 5: LEGAL & TRUST */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#F7F5F0] mb-3.5 font-serif text-sm border-b border-[#A97B27]/40 pb-1.5">
              {t.legalHeader}
            </h4>
            <ul className="space-y-2 text-xs text-[#C8BBA7]">`,
  `          {/* COL 5: LEGAL & TRUST */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection('legal')}
              className="w-full flex items-center justify-between pb-1.5 border-b border-[#A97B27]/40 mb-3.5 text-start cursor-pointer md:cursor-default"
              aria-expanded={openSections.legal}
            >
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#F7F5F0] font-serif text-sm">
                {t.legalHeader}
              </h4>
              <ChevronDown className={\`w-4 h-4 text-[#C5A15D] md:hidden transition-transform duration-200 \${openSections.legal ? 'rotate-180' : ''}\`} />
            </button>
            <ul className={\`space-y-2 text-xs text-[#C8BBA7] \${openSections.legal ? 'block' : 'hidden'} md:block\`}>`
);

fs.writeFileSync('d:/royal-umrah-cabs/src/components/layout/Footer.tsx', footer, 'utf8');
console.log('Footer.tsx updated with Deep Navy theme and mobile accordions!');
