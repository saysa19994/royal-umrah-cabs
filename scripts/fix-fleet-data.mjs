import fs from 'fs';

const filePath = 'D:/royal-umrah-cabs/src/data/fleet-showcase-data.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Fix maybach bookingVehicleId
content = content.replace(
  /id:\s*'maybach',\s*slug:\s*'mercedes-maybach',\s*bookingVehicleId:\s*'camry'/,
  "id: 'maybach',\n    slug: 'mercedes-maybach',\n    bookingVehicleId: 'maybach'"
);

// Fix h1 bookingVehicleId
content = content.replace(
  /id:\s*'h1',\s*slug:\s*'hyundai-h1',\s*bookingVehicleId:\s*'staria'/,
  "id: 'h1',\n    slug: 'hyundai-h1',\n    bookingVehicleId: 'h1'"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated fleet-showcase-data.ts bookingVehicleIds');
