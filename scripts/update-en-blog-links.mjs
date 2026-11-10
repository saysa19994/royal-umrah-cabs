import fs from 'fs';

const filePath = 'd:/royal-umrah-cabs/src/data/blog-content/transport-planning/en.ts';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add Riyadh-to-Makkah route link
const target1 = "'4. Highway Distances and Driving Times: Calculate highway spans accurately (Jeddah - Makkah: ~85 km, Makkah - Madinah: ~430 km, Madinah - Jeddah: ~420 km) along with realistic driving durations.',";
const replace1 = "'4. Highway Distances and Driving Times: Calculate highway spans accurately (Jeddah - Makkah: ~85 km, Makkah - Madinah: ~430 km, Madinah - Jeddah: ~420 km) along with realistic driving durations. For travelers arriving via the capital, our [Riyadh to Makkah VIP Chauffeur Route](/en/routes/riyadh-to-makkah) spans 870 km directly to your Makkah hotel doorstep.',";

if (content.includes(target1)) {
  content = content.replace(target1, replace1);
}

// 2. Add Makkah-to-Madinah route link
const target2 = "'Provides direct doorstep-to-doorstep transit from your Makkah hotel lobby to your Madinah hotel entrance with zero luggage transfers. Enjoy the freedom to depart at your preferred hour, take prayer and dining breaks at certified highway travel plazas, and maintain absolute family privacy. For comprehensive insights, consult our [Private Chauffeur Guide from Makkah to Madinah](/en/blog/private-transfer-makkah-to-madinah) and explore [VIP Car with Driver Options in Saudi Arabia](/en/blog/vip-car-with-driver-saudi-arabia).',";
const replace2 = "'Provides direct doorstep-to-doorstep transit from your Makkah hotel lobby to your Madinah hotel entrance with zero luggage transfers. Enjoy the freedom to depart at your preferred hour, take prayer and dining breaks at certified highway travel plazas, and maintain absolute family privacy. Explore our official [Mekkah to Madinah VIP Route Details](/en/routes/makkah-to-madinah) and consult our [Private Chauffeur Guide from Makkah to Madinah](/en/blog/private-transfer-makkah-to-madinah).',";

if (content.includes(target2)) {
  content = content.replace(target2, replace2);
}

// 3. Add Toyota HiAce and Toyota Coaster distinct links
const target3 = "'• Large Groups (10–14 passengers): The Toyota HiAce and Toyota Coaster minibuses allow extended families to travel together comfortably in a single vehicle.',";
const replace3 = "'• Large Groups (10–14 passengers): The [Toyota HiAce VIP](/en/fleet/toyota-hiace) is ideal for up to 10 passengers, while the [Toyota Coaster VIP](/en/fleet/toyota-coaster) comfortably accommodates delegations and groups of up to 18 passengers with ample luggage and roof cooling.',";

if (content.includes(target3)) {
  content = content.replace(target3, replace3);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated transport-planning en.ts internal links');
