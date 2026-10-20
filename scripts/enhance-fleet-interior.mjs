import fs from 'fs';

let content = fs.readFileSync('src/components/home/HomeSections.tsx', 'utf8');

// 1. Add fleetView state at top of HomeSections component
if (!content.includes('fleetView')) {
  content = content.replace(
    "const [routeTab, setRouteTab] = useState<'transfers' | 'packages'>('transfers');",
    `const [routeTab, setRouteTab] = useState<'transfers' | 'packages'>('transfers');\n  const [fleetView, setFleetView] = useState<Record<string, 'ext' | 'int'>>({});`
  );
}

// 2. Enhance the fleet card image container to have the Exterior / Interior toggle
const oldImgContainer = `<div className="relative aspect-[16/10] bg-bg-alt/50 p-4 flex items-center justify-center">
                    <Image
                      src={car.extImg}
                      alt={car.name}
                      width={400}
                      height={250}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                  </div>`;

const newImgContainer = `<div className="relative aspect-[16/10] bg-bg-alt/50 p-4 flex items-center justify-center overflow-hidden">
                    {/* Step Inside Interior / Exterior Toggle */}
                    <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 z-10 flex items-center bg-charcoal/85 backdrop-blur-sm p-0.5 rounded-lg border border-gold/30 text-[10px]">
                      <button
                        type="button"
                        onClick={() => setFleetView((prev) => ({ ...prev, [car.id]: 'ext' }))}
                        className={\`px-2 py-0.5 rounded font-medium transition-colors \${(fleetView[car.id] || 'ext') === 'ext' ? 'bg-gold text-ink font-bold shadow-xs' : 'text-white/80 hover:text-white'}\`}
                      >
                        {locale === 'ar' ? 'الخارج' : 'Exterior'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setFleetView((prev) => ({ ...prev, [car.id]: 'int' }))}
                        className={\`px-2 py-0.5 rounded font-medium transition-colors \${fleetView[car.id] === 'int' ? 'bg-gold text-ink font-bold shadow-xs' : 'text-white/80 hover:text-white'}\`}
                      >
                        {locale === 'ar' ? 'المقصورة VIP' : 'Inside VIP'}
                      </button>
                    </div>

                    <Image
                      src={fleetView[car.id] === 'int' ? car.intImg : car.extImg}
                      alt={\`\${car.name} \${fleetView[car.id] === 'int' ? 'Interior' : 'Exterior'}\`}
                      width={400}
                      height={250}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      loading="lazy"
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                    />
                  </div>`;

content = content.replace(/\r\n/g, '\n');
const normalizedOld = oldImgContainer.replace(/\r\n/g, '\n');
const normalizedNew = newImgContainer.replace(/\r\n/g, '\n');

if (content.includes(normalizedOld)) {
  content = content.replace(normalizedOld, normalizedNew);
  console.log('Successfully added Step Inside toggle to Fleet cards!');
} else {
  console.log('Could not find oldImgContainer');
}

fs.writeFileSync('src/components/home/HomeSections.tsx', content, 'utf8');
