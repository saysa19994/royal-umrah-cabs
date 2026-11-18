import fs from 'fs';

const content = fs.readFileSync('D:/royal-umrah-cabs/src/data/fleet-showcase-data.ts', 'utf8');

const idMatches = content.match(/id:\s*['"]([^'"]+)['"]/g) || [];
const slugMatches = content.match(/slug:\s*['"]([^'"]+)['"]/g) || [];
const priceMatches = content.match(/startingPriceSAR:\s*(\d+)/g) || [];

console.log('Vehicles found:');
const lines = content.split('\n');
let currentVehicle = null;
const vehicles = [];

for (const line of lines) {
  const idM = line.match(/^\s*id:\s*['"]([^'"]+)['"],/);
  if (idM) {
    if (currentVehicle) vehicles.push(currentVehicle);
    currentVehicle = { id: idM[1] };
  }
  const slugM = line.match(/^\s*slug:\s*['"]([^'"]+)['"],/);
  if (slugM && currentVehicle) currentVehicle.slug = slugM[1];
  
  const priceM = line.match(/^\s*startingPriceSAR:\s*(\d+),/);
  if (priceM && currentVehicle) currentVehicle.price = priceM[1];

  const paxM = line.match(/^\s*passengers:\s*(\d+),/);
  if (paxM && currentVehicle) currentVehicle.passengers = paxM[1];

  const lugM = line.match(/^\s*luggage:\s*(\d+),/);
  if (lugM && currentVehicle) currentVehicle.luggage = lugM[1];
}
if (currentVehicle) vehicles.push(currentVehicle);

console.log(JSON.stringify(vehicles, null, 2));
