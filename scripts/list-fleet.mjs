import { FLEET_SHOWCASE_VEHICLES } from '../src/data/fleet-showcase-data.ts';

console.log(`Total Vehicles: ${FLEET_SHOWCASE_VEHICLES.length}`);
for (const v of FLEET_SHOWCASE_VEHICLES) {
  console.log(`- ID: ${v.id} | Slug: ${v.slug} | Name: ${v.name.en} (${v.name.ar}) | Price: ${v.startingPriceSAR} SAR | Pax: ${v.passengers} | Luggage: ${v.luggage}`);
  console.log(`  Gallery count: ${v.gallery.length}`);
}
