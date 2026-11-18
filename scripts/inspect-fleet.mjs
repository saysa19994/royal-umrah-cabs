import { FLEET_SHOWCASE_VEHICLES } from '../src/data/fleet-showcase-data.ts';
import { AUTHORITATIVE_TRANSFER_RATES } from '../src/lib/pricing-constants.ts';

console.log('--- Total vehicles in FLEET_SHOWCASE_VEHICLES:', FLEET_SHOWCASE_VEHICLES.length);
FLEET_SHOWCASE_VEHICLES.forEach((v, idx) => {
  console.log(idx + ':', {
    id: v.id,
    slug: v.slug,
    bookingVehicleId: v.bookingVehicleId,
    name: v.name.en,
    passengers: v.passengers,
    luggage: v.luggage,
    startingPriceSAR: v.startingPriceSAR,
    galleryCount: v.gallery ? v.gallery.length : 0,
    primaryImage: v.gallery && v.gallery[0] ? v.gallery[0].src : 'NONE'
  });
});

console.log('\n--- Authoritative vehicle keys in AUTHORITATIVE_TRANSFER_RATES:');
const sampleRoute = AUTHORITATIVE_TRANSFER_RATES['jeddah-airport-to-makkah'];
console.log('jeddah-airport-to-makkah vehicles:', Object.keys(sampleRoute));
