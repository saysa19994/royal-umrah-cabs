import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/comprehensive-guides.ts');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  `summary: loc(
      'جولة مزارات مكة تستغرق عادة من 3 إلى 4 ساعات تغطي أهم المعالم التاريخية والإسلامية. سائقنا الخاص يرافقك طوال الجولة وينتظرك عند كل معلم لالتقاط الصور والتدبر، مع تكييف كامل وراحة تامة لكبار السن.',
      'Our Makkah Ziyarat tour spans 3–4 hours covering Cave of Hira (Jabal al-Nour), Cave of Thawr, Mina, Muzdalifah, Mount Arafat, and Masjid Nimra. Your chauffeur waits patiently at each stop in an air-conditioned vehicle.'
    ),
    travelTime: loc('جولة 3 إلى 4 ساعات', '3–4 hours tour'),`,
  `summary: loc(
      'جولة مزارات مكة المكرمة المعتمدة تستغرق ساعتين ونصف (2.5 ساعة) تغطي أهم المعالم التاريخية والإسلامية. سائقنا الخاص يرافقك طوال الجولة وينتظرك عند كل معلم لالتقاط الصور والتدبر، مع تكييف كامل وراحة تامة لكبار السن.',
      'Our approved Makkah Ziyarat tour strictly spans 2.5 hours covering Cave of Hira (Jabal al-Nour), Cave of Thawr, Mina, Muzdalifah, Mount Arafat, and Masjid Nimra. Your private chauffeur waits patiently at each stop.'
    ),
    travelTime: loc('جولة ساعتان ونصف (2.5 ساعة)', '2.5 Hours Tour'),`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('comprehensive-guides.ts updated successfully');
