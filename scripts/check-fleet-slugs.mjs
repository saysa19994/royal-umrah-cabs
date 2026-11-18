import { FLEET_SHOWCASE_VEHICLES } from "./src/data/fleet-showcase-data.js";
console.log(FLEET_SHOWCASE_VEHICLES.map(v => ({ id: v.id, slug: v.slug, pax: v.passengers, luggage: v.luggage })));
